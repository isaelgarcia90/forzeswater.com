"""Agente Forzecito (fase 1: un solo agente; el router y los especialistas llegan en la fase 4)."""
from pathlib import Path

from google.adk.agents import LlmAgent

from .tools import buscar_catalogo, solicitar_contacto

PROMPT = (Path(__file__).parent / "prompts" / "forzecito.md").read_text(encoding="utf-8")


def build_agent(model) -> LlmAgent:
    return LlmAgent(
        name="forzecito",
        model=model,
        instruction=PROMPT,
        tools=[solicitar_contacto, buscar_catalogo],
    )
