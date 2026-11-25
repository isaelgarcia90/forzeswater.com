"""Herramientas de Forzecito. Ninguna lee precios: el esquema `privado` no se consulta aquí."""
from google.adk.tools import ToolContext

from . import db

UI_KEY = "ui_actions"  # acciones de interfaz que el endpoint convierte en eventos SSE


def solicitar_contacto(razon: str, tool_context: ToolContext) -> dict:
    """Muestra dentro del chat un formulario para que el visitante deje correo, nombre y teléfono opcional.

    Úsala en cuanto haya interés real (precio, cotización, asesoría, detalles de un equipo). Llámala una sola vez.

    Args:
        razon: Frase corta que explica para qué se piden los datos, por ejemplo "Te enviamos la información de suavizadores".
    """
    if tool_context.state.get("contacto_guardado"):
        return {"mostrado": False, "nota": "El visitante ya dejó sus datos; no los vuelvas a pedir."}
    acciones = list(tool_context.state.get(UI_KEY, []))
    acciones.append({"action": "email_form", "payload": {"reason": razon.strip()[:200]}})
    tool_context.state[UI_KEY] = acciones
    return {"mostrado": True}


async def buscar_catalogo(consulta: str, lista: str | None = None) -> dict:
    """Busca productos en el catálogo de Forzes Water (sin precios).

    Args:
        consulta: Qué busca el visitante: tipo de equipo, marca, modelo, código o especificación, por ejemplo "bomba sumergible 1 hp 127v".
        lista: Opcional. "SBO" (bombeo), "TDA" (tratamiento de agua) o "PIQ" (piscinas y químicos).
    """
    q = (consulta or "").strip()[:200]
    if not q:
        return {"productos": []}
    lista = lista.upper() if lista and lista.upper() in ("SBO", "TDA", "PIQ") else None
    sql = """
        with q as (select websearch_to_tsquery('spanish', $1) as tq)
        select lista, codigo, descripcion, seccion, subseccion, hp, voltaje, fases, gpm, micras, sobre_pedido,
               ts_rank(tsv, q.tq) + case when codigo ilike $1 then 1 else 0 end as score
        from public.catalogo_items, q
        where activo and ($2::text is null or lista = $2)
          and (tsv @@ q.tq or codigo ilike $1 || '%')
        order by score desc
        limit 8
    """
    rows = await db.pool().fetch(sql, q, lista)
    if not rows:
        # Segundo intento: cualquiera de las palabras (OR) para consultas largas.
        palabras = [w for w in q.replace(",", " ").split() if len(w) > 2][:6]
        if palabras:
            rows = await db.pool().fetch(
                sql.replace("websearch_to_tsquery('spanish', $1)", "to_tsquery('spanish', $3)"),
                q, lista, " | ".join(palabras),
            )
    productos = [
        {k: v for k, v in dict(r).items() if v not in (None, "") and k != "score"} for r in rows
    ]
    return {"productos": productos, "nota": "Datos técnicos sin precios. No inventes datos que no estén aquí."}
