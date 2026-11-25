"""Servicio de Forzecito: FastAPI + Google ADK. Contrato documentado en el plan (sección 3)."""
import logging
import re
from contextlib import asynccontextmanager
from datetime import datetime, timezone

import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from google.adk.agents.run_config import RunConfig, StreamingMode
from google.adk.runners import Runner
from google.adk.sessions import DatabaseSessionService
from google.genai import types
from pydantic import BaseModel, Field

from . import db
from .agent import build_agent
from .config import get_settings
from .security import RateLimiter, new_session_id, sign, verify
from .streaming import OptionsStripper, sse
from .tools import UI_KEY

log = logging.getLogger("forzecito")
APP_NAME = "forzecito"
USER_ID = "web"  # el visitante es anónimo; la identidad vive en session_id + leads

state: dict = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    s = get_settings()
    await db.init_pool(s.database_url)
    url = s.database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    sessions = DatabaseSessionService(
        db_url=url,
        # Tablas de ADK en su propio esquema (no expuesto por el Data API de Supabase).
        connect_args={"server_settings": {"search_path": "adk"}, "statement_cache_size": 0},
    )
    state["sessions"] = sessions
    state["runner"] = Runner(app_name=APP_NAME, agent=build_agent(s.agent_model), session_service=sessions)
    state["limiter"] = RateLimiter(s.rate_limit_per_10min)
    yield
    await db.close_pool()


app = FastAPI(title="Forzecito", lifespan=lifespan, docs_url=None, redoc_url=None)
_s = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _s.allowed_origins.split(",") if o.strip()],
    allow_origin_regex=_s.allowed_origin_regex,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["content-type"],
)


class ChatContext(BaseModel):
    page: str | None = Field(default=None, max_length=200)
    quote_items: list[str] = Field(default_factory=list, max_length=30)


class ChatRequest(BaseModel):
    session_id: str | None = Field(default=None, max_length=64)
    session_token: str | None = Field(default=None, max_length=128)
    message: str = Field(min_length=1, max_length=2000)
    context: ChatContext | None = None


class LeadRequest(BaseModel):
    session_id: str = Field(max_length=64)
    session_token: str = Field(max_length=128)
    name: str = Field(min_length=2, max_length=100)
    email: str = Field(max_length=255, pattern=r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")
    phone: str | None = Field(default=None, max_length=30)
    company: str | None = Field(default=None, max_length=150)
    privacy_accepted: bool = True


@app.get("/healthz")
async def healthz():
    return {"ok": True}


async def _session_for(req: ChatRequest, key: str) -> tuple[str, str, bool]:
    """Devuelve (session_id, token, es_nueva). Rechaza tokens inválidos."""
    sessions: DatabaseSessionService = state["sessions"]
    if req.session_id:
        if not verify(req.session_id, req.session_token or "", key):
            raise HTTPException(401, "Sesión inválida")
        existing = await sessions.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=req.session_id)
        if existing:
            return req.session_id, req.session_token or "", False
    sid = new_session_id()
    await sessions.create_session(app_name=APP_NAME, user_id=USER_ID, session_id=sid)
    return sid, sign(sid, key), True


@app.post("/v1/chat")
async def chat(req: ChatRequest, request: Request):
    s = get_settings()
    ip = (request.headers.get("x-forwarded-for") or "").split(",")[0].strip() or "?"
    if not state["limiter"].allow(f"ip:{ip}"):
        raise HTTPException(429, "Demasiados mensajes, intenta de nuevo en unos minutos.")
    sid, token, is_new = await _session_for(req, s.session_hmac_key)

    contacto = await db.pool().fetchval("select exists(select 1 from public.leads where session_id = $1 and email is not null)", sid)
    texto = req.message.strip()
    if req.context and req.context.quote_items:
        texto += f"\n\n[Contexto: el visitante tiene en su lista de cotización: {', '.join(req.context.quote_items[:10])}]"

    async def stream():
        if is_new:
            yield sse("session", {"session_id": sid, "session_token": token})
        stripper = OptionsStripper()
        sent_ui = 0
        streamed_text = False
        try:
            async for ev in state["runner"].run_async(
                user_id=USER_ID,
                session_id=sid,
                new_message=types.Content(role="user", parts=[types.Part(text=texto)]),
                state_delta={UI_KEY: [], "contacto_guardado": bool(contacto)},
                run_config=RunConfig(streaming_mode=StreamingMode.SSE),
            ):
                delta = (ev.actions.state_delta or {}) if ev.actions else {}
                acciones = delta.get(UI_KEY)
                if acciones and len(acciones) > sent_ui:
                    for a in acciones[sent_ui:]:
                        yield sse("ui", a)
                    sent_ui = len(acciones)
                if not ev.content or not ev.content.parts:
                    continue
                text = "".join(p.text or "" for p in ev.content.parts if not getattr(p, "thought", False))
                if not text:
                    continue
                if ev.partial:
                    streamed_text = True
                elif streamed_text:
                    continue  # evento final que repite lo ya transmitido
                visible = stripper.feed(text)
                if visible:
                    yield sse("delta", {"text": visible})
            rest, options = stripper.finish()
            if rest:
                yield sse("delta", {"text": rest})
            if options:
                yield sse("options", {"items": options})
            yield sse("done", {})
        except Exception:  # noqa: BLE001
            log.exception("chat error")
            yield sse("error", {"code": "internal", "message": "Error al procesar tu mensaje."})

    return StreamingResponse(stream(), media_type="text/event-stream", headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


async def _resumen(sid: str) -> str:
    sess = await state["sessions"].get_session(app_name=APP_NAME, user_id=USER_ID, session_id=sid)
    partes = []
    for ev in (sess.events if sess else []):
        if ev.author == "user" and ev.content and ev.content.parts:
            t = "".join(p.text or "" for p in ev.content.parts)
            partes.append(re.sub(r"\n\n\[Contexto:.*\]$", "", t, flags=re.S))
    return " | ".join(partes)[:1000] or "Solicitud desde el chat"


@app.post("/v1/leads")
async def leads(req: LeadRequest):
    s = get_settings()
    if not verify(req.session_id, req.session_token, s.session_hmac_key):
        raise HTTPException(401, "Sesión inválida")
    resumen = await _resumen(req.session_id)
    lead_id = await db.pool().fetchval(
        """
        insert into public.leads (session_id, name, email, phone, company, resumen, origen, privacy_accepted_at)
        values ($1, $2, $3, nullif($4, ''), nullif($5, ''), $6, 'web-chat', $7)
        on conflict (session_id) do update set
          name = excluded.name, email = excluded.email,
          phone = coalesce(excluded.phone, leads.phone), company = coalesce(excluded.company, leads.company),
          resumen = excluded.resumen, updated_at = now()
        returning id
        """,
        req.session_id, req.name.strip(), req.email.strip().lower(), (req.phone or "").strip(),
        (req.company or "").strip(), resumen, datetime.now(timezone.utc) if req.privacy_accepted else None,
    )
    if s.formspree_url:  # respaldo por correo mientras no exista n8n
        try:
            async with httpx.AsyncClient(timeout=8) as c:
                await c.post(s.formspree_url, headers={"Accept": "application/json"}, json={
                    "Nombre": req.name, "Correo Electrónico": req.email,
                    "Teléfono": req.phone or "No proporcionado", "Mensaje": f"[Forzecito] {resumen}",
                })
        except httpx.HTTPError:
            log.warning("Formspree no respondió")
    return {"lead_id": str(lead_id)}
