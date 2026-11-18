# Ajustes de portada en celular

## 1. Íconos centrados y más pequeños
- El cuadro del ícono (matraz, regla, etc.) quedará centrado exactamente dentro de la burbuja de agua animada.
- Burbuja e ícono más pequeños en celular (aprox. 30% menos), con espacio fijo debajo del menú superior para que nunca lo toquen.
- Separación garantizada entre la burbuja y el título del capítulo ("01 · ANALIZA"), sin traslape.
- La etiqueta flotante ("Análisis de agua") se acomoda junto a la burbuja sin encimarse.

## 2. Sin hueco al empezar a deslizar
- La barra de botones (Cotización / WhatsApp) ya no "empuja" ni deja un espacio vacío: su lugar queda reservado desde el inicio dentro de la parte baja de la portada.
- El contador 01/04 y el ícono de deslizar se colocan siempre por encima de esa franja reservada, así nunca se tapan con los botones.
- Mismo criterio en computadora.

## Detalles técnicos
- `ScrollStory.css` (móvil ≤759px): contenedor de la burbuja con `display:grid; place-items:center`, ícono y burbuja con tamaño por `clamp()` según alto de pantalla; `padding-top` del contenido = alto del header + margen; margen inferior antes del eyebrow.
- Stage con `padding-bottom` igual a la altura de la barra CTA (variable `--cta-bar-h` ≈ 72px + safe-area); status a `bottom: calc(var(--cta-bar-h) + 16px)` fijo, sin depender de si la barra está visible.
- Verificar con Playwright en 390×844 y 360×640 (y 1014×927) antes/después de la aparición de la barra.
