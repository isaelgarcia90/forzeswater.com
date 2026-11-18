# Saludo de Forzecito en móvil: dos líneas y sin traslape

## Qué cambia
1. **Salto de línea en celular**: el globo mostrará
   - Hola, soy Forzecito.
   - ¿Tienes dudas?
   En computadora se mantiene en una sola línea.
2. **Globo compacto**: en celular el globo se ajusta al ancho del texto (ya no ocupa casi toda la pantalla), así tapa mucho menos contenido.
3. **Evitar traslape con el texto de la página**:
   - El globo tendrá fondo blanco sólido con sombra, para que nunca se mezclen sus letras con las de la página (se lee como una tarjeta encima, no como texto encimado).
   - En celular, el saludo se mostrará unos segundos al aparecer y luego se recogerá automáticamente, dejando solo el ícono con la bolita naranja. Al tocar el ícono se abre el chat normalmente.

## Detalles técnicos
- `ChatBot.tsx`: usar `<br className="sm:hidden" />` entre las frases; cambiar ancho fijo `w-[calc(100vw-7rem)]` por `w-max` en móvil.
- Temporizador (~6 s) solo en pantallas < 640px que oculta `showGreeting`; se limpia al desmontar.
- Verificar con Playwright a 390×844 que el globo sea legible y luego se recoja.
