# Portada: sin hueco en los 4 capítulos y barra de cotización dinámica

## Qué cambia
1. **Sin brinco en ningún capítulo (01 a 04)**: en celular, al deslizar, la barra del navegador (donde va la dirección web) se esconde y la pantalla crece. Hoy la portada mide lo que mide la pantalla *con* esa barra, así que abajo queda un hueco y todo parece bajar un poco. La portada va a ocupar siempre el alto completo, así que ya no quedará ese espacio vacío en ningún capítulo.
2. **Barra de Cotización/WhatsApp con entrada dinámica**: ya no aparecerá de entrada. Va a subir con su animación en cuanto la persona empiece a interactuar (deslizar con el dedo, girar la rueda del mouse o usar las teclas).
3. **Su espacio queda apartado desde el inicio**: el contador 01/04 y el ícono de deslizar siempre quedan arriba de donde aparecerá la barra. Así, cuando entra, no tapa nada ni mueve nada.
4. **Si la cierras con la X, vuelve**: al regresar a la portada (inicio), la barra se reinicia. Volverá a subir en cuanto empieces a deslizar de nuevo.
5. Igual en celular y computadora.

## Detalles técnicos
- `ScrollStory.css`: el stage cambia de `100svh` a `100lvh`, y si el navegador no lo soporta usa `100dvh`. Los elementos de abajo se acomodan contra el borde inferior real. Así, al colapsarse la barra del navegador, el fondo y el contenido siguen pegados abajo. El status queda en `bottom: calc(var(--cta-bar-h) + safe-area + 14px)`, igual que ahora.
- `StickyCTABar.tsx`: empieza con `isVisible=false`. Se activa una sola vez con el primer `scroll`, `wheel`, `touchmove` o `keydown` y se queda visible. Se sigue ocultando en Contacto. Cerrarla con la ✕ solo la quita hasta que vuelvas a la portada: ya no se recuerda durante toda la visita (se quita el uso de `sessionStorage`). Cuando la persona regresa a la portada (`scrollY` cerca de 0), la barra se reinicia y vuelve a esperar el primer gesto.
- Se revisa con Playwright en 390×844, 360×640 y 1014×927: cada capítulo de 01 a 04, la barra oculta al cargar, que aparezca al primer gesto y que el contador no se mueva. Además se simula el crecimiento de la pantalla para reproducir lo que pasa cuando se esconde la barra del navegador.
