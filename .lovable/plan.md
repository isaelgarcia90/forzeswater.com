# Portada: deslizar a los lados en celular y nuevo ícono

## Qué cambia
1. **Quitar las frases**: ya no se muestran "Desliza" ni "Sigue bajando"; solo queda el ícono junto al contador (01/04).
2. **Deslizar a los lados en celular**: además de deslizar hacia arriba/abajo, en celular podrás pasar el dedo de derecha a izquierda para ir al siguiente capítulo y de izquierda a derecha para regresar. El cambio se hace con el mismo movimiento suave de ahora.
   - Desde el capítulo 4, deslizar a la izquierda continúa a "Acerca de Forzes Water".
   - En el capítulo 1, deslizar a la derecha no hace nada.
   - El movimiento vertical sigue funcionando igual.
3. **Nuevo ícono en celular (vertical y horizontal)**: una mano con el dedo índice dentro de una pequeña cruz de flechas suaves (arriba, abajo, izquierda, derecha). El dedo se mueve lentamente en "L": primero a un lado, luego hacia abajo, en ciclo, para mostrar que ambos gestos funcionan. En computadora se queda el ícono del ratón actual (sin texto), porque ahí se usa la rueda.
   - Al llegar al último capítulo, el ícono muestra solo la flecha hacia abajo, para invitar a seguir bajando.
   - Se respeta "movimiento reducido": el ícono queda quieto.

## Detalles técnicos
- `ScrollStory.tsx`: quitar texto del hint y dejar `aria-label` ("Desliza hacia los lados o hacia abajo"). Agregar `onTouchStart/onTouchEnd` en el stage solo para `pointer: coarse`: si |dx| > 50px y |dx| > 1.5·|dy|, llamar `scrollToChapter(active ± 1)` (o hacer scroll a `#about` desde el último). Agregar CSS `touch-action: pan-y` para no bloquear el scroll vertical nativo.
- Ícono móvil: SVG inline con flechas de lucide (`ChevronUp/Down/Left/Right`) alrededor de `Pointer`/`Hand`, con animación CSS `story-swipe-l`; mostrar con `@media (pointer: coarse)` y el ratón con `(pointer: fine)`.
- Verificar con Playwright (contexto táctil 390×844): gesto horizontal avanza y retrocede capítulos, vertical sigue funcionando, sin texto en el hint.
