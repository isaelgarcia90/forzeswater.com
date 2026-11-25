"""Configuración por variables de entorno (Cloud Run / .env local)."""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Postgres de Supabase (pooler en modo sesión, puerto 5432). Secreto.
    database_url: str
    # Clave HMAC para firmar session_token. Secreto.
    session_hmac_key: str
    # Modelo de Gemini (la API key va en GOOGLE_API_KEY o GEMINI_API_KEY).
    agent_model: str = "gemini-3.5-flash"
    formspree_url: str | None = "https://formspree.io/f/xblnyzay"
    allowed_origins: str = (
        "https://forzeswater.com,https://www.forzeswater.com,"
        "https://forzeswater.lovable.app,http://localhost:8080"
    )
    # Vistas previas de Vercel de este proyecto.
    allowed_origin_regex: str = r"https://forzeswater-com-[a-z0-9-]+-isaels-projects-af560b54\.vercel\.app"
    max_message_chars: int = 2000
    rate_limit_per_10min: int = 20


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
