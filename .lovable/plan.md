# Ajustes de la portada horizontal (celular y computadora)

## Qué cambia
1. **"Desliza" visible en toda la historia**: el ícono del ratón con "Desliza" se queda junto al contador (01/04 … 04/04) en los cuatro capítulos, no solo en el primero. En el último cambia a "Sigue bajando".
2. **Menú superior oscuro durante la portada**: mientras estés en la historia horizontal, el menú tendrá fondo oscuro translúcido con letras blancas, igual al tono de la portada. Se vuelve blanco hasta llegar a "Acerca de Forzes Water". Aplica igual en celular y computadora.
3. **Sin traslape en celular**: los mensajes flotantes ("Análisis de agua", "Consultoría especializada", "Capacidad", etc.) se colocan arriba del ícono grande y a los lados, nunca sobre el título ni la descripción. En pantallas bajas se ocultará el segundo mensaje flotante para dejar espacio al texto.
4. **Sin brincos al empezar a deslizar**:
   - El menú ya no cambia de color al primer movimiento (ver punto 2), así que no hay salto visual.
   - El contador y "Desliza" quedan fijos en su lugar; ya no suben cuando aparece la barra de Cotización y WhatsApp. Se reserva su espacio desde el inicio.
   - En celular, la altura de la portada ya no cambia cuando se esconde la barra del navegador, para que no haya un pequeño movimiento vertical antes de avanzar a la derecha.
   - La barra de Cotización y WhatsApp sigue apareciendo como ahora.

## Detalles técnicos
- `ScrollStory.tsx`: render del hint siempre; texto según capítulo; quitar clase `is-scrolled`.
- `ScrollStory.css`: `.scroll-story__status` con `bottom` fijo (~84px, por encima de la barra); stage `height: 100svh`; en móvil reubicar `.mini-card--1/--2` en la fila del visual y `@media (max-height: 720px)` ocultar `--2`.
- `Header.tsx`: calcular `inHero` (scroll < fin de `#hero` − altura del menú). Si `inHero`: `bg-[hsl(var(--story-background))]/80 backdrop-blur-md` + texto blanco; si no, comportamiento actual. Menú hamburguesa sin cambios.
- Actualizar `mem://header/scroll-text-color-change`.
- Verificar con Playwright en 390×844, 360×640 y 1014×927: sin traslapes, menú oscuro en la portada, contador fijo.
