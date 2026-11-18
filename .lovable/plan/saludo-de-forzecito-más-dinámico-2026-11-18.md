# Saludo de Forzecito más dinámico

## Qué cambia
- **Vuelve a aparecer al regresar**: cada vez que subas a la portada horizontal (Forzecito se oculta) y luego bajes otra vez a "Acerca de Forzes Water", el saludo se mostrará de nuevo.
- **Reaparece al dejar de desplazarte (celular y computadora)**: mientras recorres la página, el saludo se queda oculto para no tapar el texto. Si te detienes unos 4 segundos, vuelve a salir unos segundos y luego se esconde otra vez. Así llama la atención en los momentos de pausa sin estorbar la lectura.
- **Límite para no cansar**: en cada visita, el saludo saldrá como máximo 3 veces por pausa. Se reinicia al volver a la portada.
- Al aparecer por primera vez, el saludo se esconde solo después de unos 6 segundos, también en computadora.

## Detalles técnicos
- `ChatBot.tsx`: reiniciar `greetingDismissed` y el contador cuando `isVisible` pase a `false`.
- En todos los tamaños de pantalla, quitar la condición de solo celular (`max-width: 639px`); al hacer scroll se oculta el saludo y se reinicia un temporizador de inactividad de unos 4 s. Al vencer, se muestra 5 s si el contador es menor a 3. Limpiar los temporizadores al desmontar.
- Revisar con Playwright en 390×844 y 1014×927: aparece, se oculta, reaparece tras una pausa y también al volver de la portada.
