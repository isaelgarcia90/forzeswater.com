# Saludo de 5 s fijo y etiquetas flotantes sin tapar el ícono (celular)

## Qué cambia
1. **El saludo siempre dura 5 segundos**: cuando aparece "Hola, soy Forzecito. ¿Tienes dudas?", se queda 5 segundos completos y después se oculta, también la primera vez (antes duraba 6). Ya no se oculta antes de tiempo aunque sigas deslizando. Todo lo demás sigue igual: espera 3 segundos al salir de la portada, vuelve tras una pausa (hasta 3 veces) y se reinicia al regresar al inicio.
2. **Etiquetas flotantes en celular** ("Análisis de agua", "Consultoría especializada", "Capacidad", etc.): se acomodan en el borde de la burbuja de agua, una arriba a la izquierda y otra abajo a la derecha. Pueden encimarse con el contorno de la burbuja, pero nunca con el cuadro del ícono. Aplica a los 4 capítulos.

## Detalles técnicos
- `ChatBot.tsx`: primer saludo con `setTimeout(..., 5000)` en lugar de 6000. Se quita el ocultado por `scroll` (la regla de "800 ms"). El scroll solo reinicia el contador de inactividad, que sigue en 4 s para volver a mostrar el saludo durante 5 s, hasta 3 veces.
- `ScrollStory.css` (≤759px): las etiquetas se posicionan respecto al centro del área visual. La 1 queda pegada al borde superior izquierdo (`bottom: calc(50% + mitad del ícono + 6px)`, `right: calc(50% + mitad del ícono*0.2)`). La 2 queda pegada al borde inferior derecho (`top: calc(50% + mitad del ícono + 6px)`, `left: calc(50% - mitad del ícono*0.2)`). Se usa una variable `--icon-size` con el mismo `min(22vw,12svh,88px)` para que la separación con el ícono se mantenga en cualquier alto de pantalla. En pantallas bajas se sigue ocultando la etiqueta 2.
- Revisar con Playwright en 390×844, 360×640 y 412×915, en los 4 capítulos, comprobando que los rectángulos de las etiquetas y del ícono no se crucen. También medir que el saludo dure 5 s aunque se esté deslizando.
