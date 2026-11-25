# syntax=docker/dockerfile:1.7
# ---------- etapa 1: dependencias ----------
FROM python:3.12-slim AS builder
COPY --from=ghcr.io/astral-sh/uv:0.11.32 /uv /usr/local/bin/uv
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy UV_PYTHON_DOWNLOADS=never
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv uv sync --frozen --no-dev --no-install-project
COPY app ./app

# ---------- etapa 2: ejecución ----------
FROM python:3.12-slim
ENV PATH="/app/.venv/bin:$PATH" PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1 PORT=8080
RUN useradd --uid 10001 --no-create-home appuser
WORKDIR /app
COPY --from=builder --chown=appuser /app /app
USER appuser
EXPOSE 8080
# 1 worker: Cloud Run escala por instancias; la concurrencia la da asyncio.
CMD ["sh", "-c", "exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT} --workers 1 --timeout-keep-alive 75 --no-access-log"]
