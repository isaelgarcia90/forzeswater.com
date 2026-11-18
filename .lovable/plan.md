# Ajustes de la portada horizontal (celular y computadora)

## Qué cambia
1. **"Desliza" visible en toda la historia**: el ícono del ratón con "Desliza" se queda junto al contador (01/04 … 04/04) en los cuatro capítulos, no solo en el primero. En el último cambia a "Sigue bajando".
2. **Tema oscuro en todo el sitio (celular y computadora)**: todas las secciones (Acerca de, Soluciones, Productos, Catálogo, FAQ, Contacto, pie de página, chat y ventanas de detalle) usan fondo azul marino oscuro con texto claro, siguiendo el tono de la portada. El menú superior es oscuro siempre: translúcido sobre la portada y negro/azul marino sólido al llegar a "Acerca de Forzes Water", con letras blancas. Se ignora el modo claro del teléfono o navegador.
3. **Sin traslape en celular**: los mensajes flotantes ("Análisis de agua", "Consultoría especializada", "Capacidad", etc.) se colocan arriba del ícono grande y a los lados, nunca sobre el título ni la descripción. En pantallas bajas se ocultará el segundo mensaje flotante para dejar espacio al texto.
4. **Sin brincos al empezar a deslizar**:
   - El menú ya no cambia de color al primer movimiento (ver punto 2), así que no hay salto visual.
   - El contador y "Desliza" quedan fijos en su lugar; ya no suben cuando aparece la barra de Cotización y WhatsApp. Se reserva su espacio desde el inicio.
   - En celular, la altura de la portada ya no cambia cuando se esconde la barra del navegador, para que no haya un pequeño movimiento vertical antes de avanzar a la derecha.
   - La barra de Cotización y WhatsApp sigue apareciendo como ahora.

## Detalles técnicos
- `ScrollStory.tsx`: render del hint siempre; texto según capítulo; quitar clase `is-scrolled`.
- `ScrollStory.css`: `.scroll-story__status` con `bottom` fijo (~84px, por encima de la barra); stage `height: 100svh`; en móvil reubicar `.mini-card--1/--2` en la fila del visual y `@media (max-height: 720px)` ocultar `--2`.
- Activar la clase `dark` fija en `<html>` (`index.html`) para usar los tokens `.dark` existentes en `index.css`; afinar sus valores al tono de la portada.
- Revisar componentes con colores claros fijos (`bg-white`, `text-primary` sobre blanco, tarjetas, formularios, píldora y encabezado del chat, `StickyCTABar`) y pasarlos a tokens.
- `Header.tsx`: texto siempre claro; fondo transparente/translúcido en la portada y `bg-background/95 backdrop-blur-md` sólido después. Menú hamburguesa oscuro.
- Actualizar memorias de identidad visual y comportamiento del menú (tema oscuro global).
- Verificar con Playwright en 390×844, 360×640 y 1014×927: sin traslapes, tema oscuro en todas las secciones y menú oscuro, contador fijo.
