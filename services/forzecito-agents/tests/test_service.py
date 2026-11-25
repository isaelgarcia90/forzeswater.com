"""Pruebas locales con un LLM falso (no llama a Gemini) contra un Postgres con las migraciones aplicadas.

Requiere DATABASE_URL apuntando a un Postgres de pruebas con supabase/migrations y el seed aplicados.
"""
import json
import os
from typing import AsyncGenerator

import pytest
from google.adk.models import BaseLlm, LlmRequest, LlmResponse
from google.genai import types

os.environ.setdefault("SESSION_HMAC_KEY", "test-key")
pytestmark = pytest.mark.skipif(not os.environ.get("DATABASE_URL"), reason="sin DATABASE_URL de pruebas")


class FakeLlm(BaseLlm):
    model: str = "fake"

    async def generate_content_async(self, llm_request: LlmRequest, stream: bool = False) -> AsyncGenerator[LlmResponse, None]:
        last = llm_request.contents[-1]
        part = last.parts[0]
        if part.function_response is not None:
            yield LlmResponse(content=types.Content(role="model", parts=[types.Part(text="Listo, déjame tus datos. [[OPCIONES: Tengo otra duda]]")]))
            return
        texto = part.text or ""
        if "cotizar" in texto:
            yield LlmResponse(content=types.Content(role="model", parts=[types.Part(function_call=types.FunctionCall(name="solicitar_contacto", args={"razon": "Te enviamos la cotización"}))]))
            return
        chunks = ["¡Hola! Manejamos ", "bombas sumergibles.", "\n\n¿Para qué sector? [", "[OPCIONES: Residencial | Comercial", " | Industrial]]"]
        acc = ""
        for c in chunks:
            acc += c
            yield LlmResponse(content=types.Content(role="model", parts=[types.Part(text=c)]), partial=True)
        yield LlmResponse(content=types.Content(role="model", parts=[types.Part(text=acc)]), partial=False)


def parse(body: str):
    out = []
    for block in body.strip().split("\n\n"):
        ev, data = block.split("\n", 1)
        out.append((ev.removeprefix("event: "), json.loads(data.removeprefix("data: "))))
    return out


@pytest.fixture
def client(monkeypatch):
    from fastapi.testclient import TestClient

    from app import agent as agent_mod
    from app import main

    real = agent_mod.build_agent
    monkeypatch.setattr(main, "build_agent", lambda model: real(FakeLlm()))
    with TestClient(main.app) as c:
        yield c


def test_chat_stream_options_y_sesion(client):
    r = client.post("/v1/chat", json={"message": "Hola"})
    assert r.status_code == 200
    evs = parse(r.text)
    assert evs[0][0] == "session"
    texto = "".join(d["text"] for e, d in evs if e == "delta")
    assert "[[" not in texto and texto.rstrip().endswith("¿Para qué sector?")
    assert ("options", {"items": ["Residencial", "Comercial", "Industrial"]}) in evs
    assert evs[-1][0] == "done"

    sid, tok = evs[0][1]["session_id"], evs[0][1]["session_token"]
    r2 = client.post("/v1/chat", json={"message": "Quiero cotizar", "session_id": sid, "session_token": tok})
    evs2 = parse(r2.text)
    assert evs2[0][0] != "session"
    assert ("ui", {"action": "email_form", "payload": {"reason": "Te enviamos la cotización"}}) in evs2

    r3 = client.post("/v1/leads", json={"session_id": sid, "session_token": tok, "name": "Ana Prueba", "email": "ana@example.com"})
    assert r3.status_code == 200 and r3.json()["lead_id"]


def test_token_invalido(client):
    r = client.post("/v1/chat", json={"message": "Hola", "session_id": "s_x", "session_token": "malo"})
    assert r.status_code == 401


async def test_buscar_catalogo_sin_precios():
    from app import db, tools

    await db.init_pool(os.environ["DATABASE_URL"])
    try:
        res = await tools.buscar_catalogo("generador de cloro")
        assert res["productos"] and all("precio" not in str(p) for p in res["productos"])
        res = await tools.buscar_catalogo("bomba sumergible 1hp", "SBO")
        assert all(p["lista"] == "SBO" for p in res["productos"])
    finally:
        await db.close_pool()
