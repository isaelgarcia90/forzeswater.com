# forzecito-agents

Backend de Forzecito: FastAPI + Google ADK + Gemini, desplegado en Cloud Run.
Contrato con el sitio: `POST /v1/chat` (SSE: `session`, `delta`, `options`, `ui`, `done`, `error`) y `POST /v1/leads`.
El sitio lo usa solo si `VITE_AGENTS_URL` está definido; si no, sigue con la Edge Function `chat`.

## Variables de entorno

| Variable | Secreto | Qué es |
| --- | --- | --- |
| `DATABASE_URL` | sí | Postgres de Supabase, pooler en modo sesión (puerto 5432) |
| `SESSION_HMAC_KEY` | sí | Clave para firmar `session_token` (cualquier cadena aleatoria larga) |
| `GOOGLE_API_KEY` | sí | Llave de Gemini |
| `AGENT_MODEL` | no | Modelo, por defecto `gemini-3.5-flash` |

## Desarrollo

```bash
uv sync
DATABASE_URL=postgresql://... SESSION_HMAC_KEY=dev GOOGLE_API_KEY=... uv run uvicorn app.main:app --port 8081
# Pruebas (LLM simulado; requiere un Postgres con supabase/migrations y el seed aplicados)
DATABASE_URL=postgresql://... uv run pytest
```

Nunca lee precios: `privado.precios_lista` no se consulta desde este servicio.
