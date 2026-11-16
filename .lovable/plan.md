# Nombrar al chatbot "Forzecito"

## Cómo funciona hoy el chatbot
- **Botón flotante:** píldora con el logo de la gota, el texto "Asistente Virtual" y un punto rojo.
- **Al abrir:** encabezado "Forzes Water · Asistente virtual" y saludo fijo: "Hola, soy el asistente de Forzes Water. ¿En qué podemos ayudarte hoy?", con cuatro accesos rápidos: Cotizar un sistema, Conocer productos, Solicitar servicio y Hablar por WhatsApp.
- **Recorridos guiados (sin IA):** cada acceso rápido sigue preguntas fijas con botones (sector, tipo de producto o sistema, servicio, urgencia) y termina en un formulario único: correo y nombre obligatorios, teléfono opcional con lada.
- **Preguntas libres (con IA):** si la persona escribe algo propio, responde la IA en español de México, con mensajes cortos y opciones para hacer clic; si detecta interés, muestra el mismo formulario.
- **Datos guardados:** el contacto y la conversación se guardan en la base de datos del sitio (prospectos del chat) y se envían por correo.
- **Memoria:** la conversación se conserva 24 horas en el navegador; al reabrir pregunta si quieres continuar o empezar de nuevo.

## Cambios propuestos (estilo "Soy Clarito, de Llantera El Rayo")
1. **Saludo inicial:** "¡Hola! Soy Forzecito. ¿En qué podemos ayudarte hoy?"
2. **Encabezado de la ventana:** el nombre principal pasa a "Forzecito" y debajo "Asistente virtual de Forzes Water".
3. **Botón flotante:** se conserva "Asistente Virtual" (es más claro para quien no conoce los chatbots); la descripción para lectores de pantalla dirá "Abrir Forzecito, asistente virtual de Forzes Water".
4. **Respuestas con IA:** la IA se presentará como Forzecito, solo cuando salude o le pregunten quién es (sin repetir el nombre en cada mensaje).
5. **Mensaje al regresar:** "¡Gracias por regresar! Soy Forzecito. Tienes una conversación reciente…"
6. Se guarda "Forzecito" como nombre oficial del asistente en la memoria del proyecto.

## Detalles técnicos
- `src/components/ChatMessages.tsx`: textos de bienvenida y de regreso.
- `src/components/ChatBot.tsx`: encabezado y aria-labels.
- `supabase/functions/chat/index.ts`: indicaciones del sistema con la identidad de Forzecito; redesplegar la función.
- Verificar en computadora y celular con Playwright.
