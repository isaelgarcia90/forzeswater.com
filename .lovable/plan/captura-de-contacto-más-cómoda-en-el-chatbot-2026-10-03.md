# Captura de contacto más cómoda en el chatbot

## Resultado esperado
- Mantener la conversación guiada con opciones para hacer clic y mostrar una sola tarjeta de contacto **después de ofrecer información útil**, cuando el visitante solicite cotización, ficha técnica o seguimiento.
- En esa tarjeta, pedir **correo primero**, después **nombre**, y dejar el **teléfono como opcional**. Incluir una línea breve que explique que los datos se usarán para responder la consulta; permitir completar todo sin escribir datos en las burbujas del chat.
- Usar un botón claro, **Enviar mis datos**, con validación junto a cada campo, estado de envío, confirmación únicamente si se guardaron los datos y opción de volver a intentar si falla. Conservar la posibilidad de hacer otra pregunta o abrir WhatsApp sin completar la tarjeta.
- No añadir una casilla de consentimiento ni un enlace a un aviso de privacidad inexistente. Si se proporciona un aviso real, enlazarlo junto al envío.

## Detalles técnicos
- Sustituir la tarjeta exclusiva de correo por una tarjeta compacta de correo, nombre y teléfono opcional dentro de `ChatMessages`. Usar el selector de lada existente del formulario principal o una variante compacta equivalente; validar longitudes y formatos.
- Adaptar el flujo del chatbot para solicitar la tarjeta una sola vez y continuar la charla tras enviarla, sin pasar los datos personales al modelo como mensajes de conversación. Mantener el historial actual del navegador y los accesos rápidos; evitar que el asistente vuelva a pedir nombre o teléfono una vez enviados.
- Guardar desde la función de recepción actual con validación y limitación de solicitudes del lado del servidor. Confirmar el guardado real antes de indicar éxito; si falla, mostrar un error recuperable sin perder lo escrito. Revisar la entrega al propietario por el canal que ya utiliza esa función, sin prometer una notificación que no se haya comprobado.
- Verificar en computadora y móvil los caminos de envío válido, errores de formato, teléfono omitido, fallo de guardado y reapertura de una conversación guardada.
