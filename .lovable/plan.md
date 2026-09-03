# Actualizar tooltips de WhatsApp y chatbot

## Resumen
Cambiar los mensajes que aparecen al hacer hover en los botones flotantes de WhatsApp y chatbot, de acuerdo con la función de cada canal.

## Cambios
1. **WhatsApp (src/components/WhatsAppButton.tsx)**
   - Reemplazar el tooltip "¿Necesitas ayuda?" por **"Habla con nosotros"**.
   - Este botón abre WhatsApp con un mensaje prellenado listo para chatear directamente.

2. **Chatbot (src/components/ChatBot.tsx)**
   - Reemplazar el tooltip "Chat con IA" por **"¿Dudas? Te asesoramos"**.
   - El chatbot actúa como asesor virtual para información de servicios, productos y solicitud de datos de contacto.

## Validación
- Verificar que ambos tooltips muestren el texto nuevo en la vista previa.
- Confirmar que no queden referencias al texto anterior en ninguno de los dos componentes.
