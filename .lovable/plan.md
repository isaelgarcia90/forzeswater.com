# Mejorar la lectura de cada respuesta del chatbot

## Objetivo
Cuando el visitante elija una opción precargada y llegue la siguiente respuesta, posicionar automáticamente la conversación al inicio de esa nueva respuesta. Así podrá leer primero el texto completo y después bajar naturalmente hacia las opciones, sin tener que desplazarse hacia arriba.

## Cambios
- Identificar visualmente el mensaje más reciente del asistente dentro del área desplazable del chat.
- Al terminar de recibirse una respuesta, desplazar únicamente el contenido interno del chatbot hasta el inicio de ese mensaje.
- Ejecutar el movimiento una sola vez por respuesta terminada, evitando saltos durante la escritura progresiva del asistente.
- Mantener el comportamiento actual mientras se espera la respuesta y conservar el botón para ir al mensaje más reciente cuando el visitante se desplace manualmente.
- Aplicar el mismo comportamiento a respuestas iniciadas con opciones precargadas y con texto libre, para que la lectura sea consistente.
- Respetar la preferencia de movimiento reducido del dispositivo.

## Validación
- Probar varias selecciones consecutivas con respuestas largas y listas de opciones.
- Confirmar que cada respuesta nueva comienza visible desde su primera línea y que sus opciones permanecen accesibles al desplazarse hacia abajo.
- Verificar que el encabezado y el campo para escribir permanecen fijos, sin desplazar la página completa.
- Probar en computadora y en celular, incluyendo una conversación restaurada con “Sí, continuar”.

## Detalle técnico
El ajuste se concentrará en la vista de mensajes del chatbot. Se usará una referencia al último mensaje del asistente y una transición de carga finalizada para controlar el desplazamiento, en lugar de depender únicamente del seguimiento automático al final de la conversación.
