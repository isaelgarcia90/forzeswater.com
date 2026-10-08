# Hacer legible el flujo guiado del chatbot

## Recomendación
No reducir la letra ni depender de una ventana más alta. En móvil el chat ya ocupa casi toda la pantalla y una tipografía menor perjudicaría la lectura.

La mejor solución es un enfoque combinado:
- Respuestas precargadas, breves y consistentes para los recorridos guiados.
- Posicionar cada respuesta nueva desde su primera línea.
- Mantener las respuestas amplias de la IA únicamente para preguntas escritas libremente.

## Cambios
- Sustituir las introducciones variables y repetitivas de los accesos rápidos por mensajes fijos de una pregunta breve.
- Para “Conocer productos”, mostrar directamente: “¿Para qué sector necesitas productos o equipos de tratamiento de agua?” seguido de las opciones Residencial, Comercial e Industrial.
- Aplicar el mismo patrón a “Cotizar un sistema” y “Solicitar servicio”: contexto mínimo, una sola pregunta y opciones clicables.
- Limitar cada paso guiado a aproximadamente 25–40 palabras, sin volver a saludar ni enumerar productos que aparecerán en pasos posteriores.
- Mantener el tamaño actual de letra y la altura actual del chat; conservar el campo para preguntas libres.
- Corregir el desplazamiento para que, al terminar una respuesta, el área interna del chat muestre el inicio del mensaje nuevo y permita bajar naturalmente hacia sus opciones.
- Evitar que el seguimiento automático al final vuelva a mover la vista después de posicionarla.

## Ejemplo del resultado
```text
¿Para qué sector necesitas productos o equipos de tratamiento de agua?

[ Residencial ]
[ Comercial ]
[ Industrial ]
[ Tengo otra duda ]
```

Después de elegir un sector, el siguiente mensaje también será breve y mostrará las categorías de producto disponibles.

## Validación
- Iniciar conversaciones nuevas varias veces y confirmar que los accesos rápidos producen el mismo texto breve.
- Recorrer cotización, productos y servicio únicamente mediante opciones clicables.
- Confirmar en computadora y celular que cada respuesta aparece desde su primera línea y que sus opciones quedan visibles o inmediatamente accesibles al bajar.
- Probar una pregunta libre larga para verificar que la IA conserva flexibilidad sin afectar los recorridos guiados.
- Reabrir una conversación guardada con “Sí, continuar” y comprobar que no se desplaza al final de forma incorrecta.

## Detalle técnico
Los recorridos iniciados por accesos rápidos tendrán respuestas guiadas deterministas, separadas de la conversación libre. El control de desplazamiento se ajustará para ejecutarse después del render final y desactivar el anclaje automático al fondo durante esa lectura.
