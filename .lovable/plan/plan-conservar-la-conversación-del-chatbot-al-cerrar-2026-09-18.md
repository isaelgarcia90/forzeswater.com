# Plan: conservar la conversación del chatbot al cerrar

## Objetivo
Modificar el chatbot flotante para que, al cerrar la ventana, la conversación se guarde en el navegador. Al volver a abrir, si hay una conversación previa, preguntar al usuario si desea continuar o empezar una nueva, siguiendo el patrón de la referencia compartida.

## Decisión de producto confirmada
- **Una sola conversación activa** (no historial de threads).
- **Persistencia en el navegador** (`localStorage`). Simple, sin login ni backend adicional.
- **Validez de 24 horas**: si la última interacción fue hace más de un día, se trata como nueva conversación.

## Cambios esperados en la experiencia
1. Cerrar el chatbot ahora solo lo oculta; no borra la conversación.
2. Al reabrir, el asistente muestra: "¡Gracias por regresar! Tienes una conversación reciente. ¿Deseas continuar donde la dejaste?" con botones **Sí, continuar** / **No, nueva conversación**.
3. Elegir "Sí" restaura la conversación exactamente como estaba.
4. Elegir "No" borra el historial y muestra la bienvenida inicial con accesos rápidos.
5. Se agrega un icono de "nueva conversación" en el encabezado del chat, junto a la X, para reiniciar manualmente.

## Detalle técnico

### 1. `src/hooks/useChatBot.ts`
- Agregar clave `forzes-chat-history` en `localStorage`.
- Inicializar el estado de mensajes leyendo `localStorage` de forma perezosa (`useState` con función).
- Guardar en `localStorage` el objeto: `{ messages, leadSaved, timestamp }`.
- Ignorar datos si `timestamp` tiene más de 24 horas.
- `sendMessage`: después de cada mensaje nuevo (usuario o asistente), persistir.
- `saveLead`: al guardar el lead, marcar `leadSaved: true` y persistir.
- `resetChat(clearStorage = true)`: limpia mensajes, `leadSaved` y, por defecto, el `localStorage`.
- Exponer helper o bandera para saber si existe conversación guardada y válida.

### 2. `src/components/ChatBot.tsx`
- `handleClose`: solo `setIsOpen(false)`, sin llamar `resetChat`.
- `handleOpen`: solo `setIsOpen(true)`.
- Agregar estado `showReturnPrompt` que se active en la primera apertura si existe historial válido.
- Conectar botones del prompt:
  - **Sí, continuar**: oculta el prompt y deja los mensajes cargados.
  - **No, nueva conversación**: llama `resetChat(true)`, oculta el prompt.
- Agregar en el header un botón "Nueva conversación" (icono `RefreshCcw` o `Trash2`) que llame `resetChat(true)`.
- Pasar props necesarias a `ChatMessages` para renderizar el prompt de retorno.

### 3. `src/components/ChatMessages.tsx`
- Renderizar el prompt de retorno como un mensaje del asistente cuando se indique.
- Botones de respuesta estilizados como los accesos rápidos existentes.
- Si se elige "No", limpiar el prompt y mostrar la bienvenida inicial.

### 4. Validación
- Correr build completo (`bun run build`) para verificar TypeScript y estilos.
- Probar en escritorio y móvil con Playwright:
  - Abrir chat, enviar mensaje, cerrar, reabrir, ver prompt.
  - Probar "Sí" restaura conversación.
  - Probar "No" inicia nueva conversación.
  - Probar icono de nueva conversación en header.

## Alcance
- Solo el chatbot flotante (`ChatBot.tsx`). No se modifica `ChatBotInContact.tsx` ni la sección de formulario de contacto.
- La persistencia es local al navegador; no se envía la conversación al backend excepto cuando el usuario acepta dejar sus datos como lead.
