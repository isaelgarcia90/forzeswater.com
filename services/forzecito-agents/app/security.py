"""Token de sesión firmado y límite de mensajes."""
import hashlib
import hmac
import secrets
import time
from collections import defaultdict, deque


def new_session_id() -> str:
    return "s_" + secrets.token_urlsafe(16)


def sign(session_id: str, key: str) -> str:
    return hmac.new(key.encode(), session_id.encode(), hashlib.sha256).hexdigest()


def verify(session_id: str, token: str, key: str) -> bool:
    return bool(session_id and token) and hmac.compare_digest(sign(session_id, key), token)


class RateLimiter:
    """Ventana deslizante en memoria, por instancia de Cloud Run (se complementa con --max-instances)."""

    def __init__(self, limit: int, window_s: int = 600) -> None:
        self.limit, self.window = limit, window_s
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        q = self._hits[key]
        while q and now - q[0] > self.window:
            q.popleft()
        if len(q) >= self.limit:
            return False
        q.append(now)
        return True
