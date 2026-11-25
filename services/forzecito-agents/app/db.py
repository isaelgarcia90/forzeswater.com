"""Pool de asyncpg compartido. El servicio usa el rol postgres (service) del pooler."""
import asyncpg

_pool: asyncpg.Pool | None = None


def _asyncpg_dsn(url: str) -> str:
    # SQLAlchemy usa "postgresql+asyncpg://"; asyncpg solo "postgresql://".
    return url.replace("postgresql+asyncpg://", "postgresql://", 1)


async def init_pool(database_url: str) -> asyncpg.Pool:
    global _pool
    _pool = await asyncpg.create_pool(_asyncpg_dsn(database_url), min_size=0, max_size=5, statement_cache_size=0)
    return _pool


def pool() -> asyncpg.Pool:
    if _pool is None:
        raise RuntimeError("Pool de BD no inicializado")
    return _pool


async def close_pool() -> None:
    if _pool is not None:
        await _pool.close()
