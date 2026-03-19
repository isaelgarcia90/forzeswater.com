

## Plan: Chatbot conversacional con IA para recopilación de datos

Crear un chatbot con IA que converse naturalmente con los visitantes, responda preguntas sobre Forzes Water y recopile los datos del cliente (nombre, correo, teléfono, mensaje). Los datos se envían a Formspree y se guardan en base de datos.

### Componentes a crear/modificar

#### 1. Tabla en base de datos: `chat_leads`
- Migración SQL para crear tabla con campos: `id`, `name`, `email`, `phone`, `message`, `conversation_history` (jsonb), `created_at`
- RLS policy para permitir inserts anónimos (público, sin auth requerido)

#### 2. Edge Function: `chat` 
- Usa Lovable AI (Gemini) con system prompt que instruye al bot a:
  - Presentarse como asistente de Forzes Water
  - Responder preguntas sobre servicios de tratamiento de agua
  - Recopilar nombre, correo, teléfono y consulta de forma conversacional
  - Retornar un JSON estructurado cuando tenga todos los datos (via tool calling)
- Streaming SSE para respuestas en tiempo real

#### 3. Edge Function: `save-chat-lead`
- Recibe los datos recopilados por el chatbot
- Guarda en tabla `chat_leads`
- Envía a Formspree (mismo endpoint `xblnyzay`)

#### 4. Componente: `ChatBot.tsx`
- Botón flotante (icono de chat) en esquina inferior derecha, encima del botón de WhatsApp
- Ventana de chat con:
  - Header con logo/nombre Forzes Water y botón cerrar
  - Área de mensajes con burbujas estilizadas (gradientes del sistema de diseño)
  - Input de texto con botón enviar
  - Indicador de "escribiendo..."
  - Streaming token por token
- Estilos consistentes: `bg-card`, `border-border`, gradientes `gradient-primary`

#### 5. Componente: `ChatBotInContact.tsx`
- Versión embebida del chatbot para la sección de contacto
- Card al lado del formulario existente o como tab alternativa
- Misma lógica, diferente layout (más ancho, sin botón flotante)

#### 6. Modificar `Contact.tsx`
- Agregar tabs o toggle: "Formulario" / "Chat con IA"
- Integrar `ChatBotInContact` como opción alternativa

#### 7. Modificar `Index.tsx`
- Agregar componente `ChatBot` flotante

### Detalle técnico

- **Modelo IA**: `google/gemini-3-flash-preview` (default, rápido y conversacional)
- **System prompt**: Contextualizado con info de Forzes Water (servicios, productos, dirección, contacto)
- **Detección de datos completos**: El bot usa tool calling para extraer datos estructurados cuando detecta que tiene nombre, correo, teléfono y mensaje
- **Streaming**: SSE desde edge function, renderizado token por token en el frontend
- **Markdown**: Respuestas renderizadas con `react-markdown`
- **Formspree + DB**: Al completar la recopilación, se llama `save-chat-lead` que guarda en ambos destinos
- **Posición flotante**: `bottom-36 right-6` (encima del botón WhatsApp que está en `bottom-20`)

