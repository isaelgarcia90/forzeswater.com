"""Utilidades del stream: formato SSE y extracción del marcador [[OPCIONES: a | b]]."""
import json
import re

OPTIONS_RE = re.compile(r"\[\[\s*OPCIONES\s*:([\s\S]*?)\]\]", re.IGNORECASE)


def sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


class OptionsStripper:
    """Deja pasar el texto visible y retiene todo lo que viene a partir de "[[" (el marcador de opciones)."""

    def __init__(self) -> None:
        self._held = ""
        self._holding = False

    def feed(self, chunk: str) -> str:
        if self._holding:
            self._held += chunk
            return ""
        idx = chunk.find("[[")
        if idx == -1:
            if chunk.endswith("["):  # posible inicio de marcador partido entre fragmentos
                self._held, self._holding = "[", True
                return chunk[:-1]
            return chunk
        self._held, self._holding = chunk[idx:], True
        return chunk[:idx]

    def finish(self) -> tuple[str, list[str]]:
        """Devuelve (texto que faltaba mostrar, opciones)."""
        held, self._held, self._holding = self._held, "", False
        m = OPTIONS_RE.search(held)
        if not m:
            # No era un marcador: se muestra tal cual (sin corchetes sueltos al final).
            return (held if not held.strip() in ("[", "[[") else ""), []
        options = [o.strip() for o in m.group(1).split("|") if o.strip()][:6]
        rest = OPTIONS_RE.sub("", held)
        return rest.strip(), options
