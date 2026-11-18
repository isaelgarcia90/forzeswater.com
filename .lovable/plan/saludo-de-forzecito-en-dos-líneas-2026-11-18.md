# Saludo de Forzecito en dos líneas

## Qué cambia
- El globo del saludo mostrará siempre el texto en dos líneas, en celular y computadora:
  - Hola, soy Forzecito.
  - ¿Tienes dudas?
- El globo se ajustará al ancho del texto, así ocupa menos espacio y tapa menos contenido de la página.
- Para que sus letras no se crucen con las de la página, el globo tendrá fondo blanco sólido con sombra. En celular, el saludo se recogerá solo después de unos segundos y quedará únicamente el ícono con la bolita naranja.

## Detalles técnicos
- `ChatBot.tsx`: poner `<br />` entre las dos frases y cambiar el ancho fijo por `w-max` con `whitespace-nowrap` en cada línea.
- Temporizador de unos 6 s, solo en pantallas de menos de 640px, que oculta `showGreeting`; se limpia al desmontar.
- Revisar con Playwright en 390×844 y 1014×927.
