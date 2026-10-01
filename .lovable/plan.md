# Chatbot guiado con opciones para hacer clic

## Objetivo
Que el visitante pueda avanzar casi toda la conversación con clics, como en Telmex, y que aun así pueda escribir una duda libre cuando quiera.

## Cómo funcionará
1. **Menú inicial** (ya existe): Cotizar un sistema, Conocer productos, Solicitar servicio, Hablar por WhatsApp.
2. **Opciones en cada respuesta**: después de cada mensaje del asistente aparece una lista de 2 a 6 opciones (estilo lista de Telmex, una por renglón, con flecha). Al hacer clic, la opción se envía como respuesta del visitante.
3. **Opciones fijas para las preguntas clave** del flujo, para que las respuestas sean siempre las mismas:
   - Sector: Residencial / Comercial / Industrial
   - Tipo de sistema: Planta potabilizadora / Ósmosis inversa / Suavizador o filtros / Aguas residuales / No estoy seguro
   - Productos: Bombas / Filtros / Plantas de tratamiento / Tableros y control / Químicos para piscina
   - Servicio: Instalación / Mantenimiento / Reparación / Análisis de agua
   - Urgencia: Lo antes posible / Este mes / Solo estoy cotizando
4. **Siempre disponible**: "Tengo otra duda" (enfoca el campo para escribir), "Volver al menú principal" y "Hablar por WhatsApp".
5. **Campo de escritura** se conserva abajo para dudas que no estén en las opciones.
6. **Respuestas más cortas**: el asistente hará una sola pregunta por mensaje y dejará los detalles largos para cuando el visitante los pida.
7. Las opciones de mensajes anteriores quedan desactivadas para evitar respuestas fuera de orden; solo la última lista es clicable.
8. Las opciones se guardan con la conversación, así que al "Sí, continuar" reaparecen igual.

## Diseño
- Lista blanca con bordes finos y separadores, texto en azul corporativo, efecto suave al pasar el cursor, objetivos táctiles cómodos en móvil.
- Se mantiene el estilo Corporate Fluidity actual (Outfit + Figtree, azules de la marca).

## Detalles técnicos
- Función del chat: agregar una herramienta `suggest_options` (lista de etiquetas) que el modelo debe llamar al final de cada respuesta; el prompt del sistema incluye los catálogos fijos de opciones de arriba y la regla de una pregunta por mensaje. Se conservan `request_email` y `save_lead`.
- Hook `useChatBot`: leer los argumentos de `suggest_options` del stream y guardarlos en el mensaje del asistente (`options?: string[]`), persistidos en localStorage.
- `ChatMessages`: nuevo bloque de lista de opciones debajo del último mensaje del asistente, más las acciones fijas (otra duda, menú principal, WhatsApp). "Volver al menú principal" reenvía al menú inicial sin borrar historial.
- Si el modelo no envía opciones, se muestran solo las acciones fijas.
- Desplegar la función del chat actualizada.

## Validación
- Recorrer con clics los flujos de cotización, productos y servicio hasta la captura de correo, sin escribir.
- Probar escribir una duda libre a mitad del flujo.
- Verificar en escritorio y móvil, y que las opciones se restauren al continuar la conversación.
