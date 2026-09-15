# Mejorar el chatbot de Forzes Water

## Objetivo
Aplicar la dirección **Corporate Fluidity**: una ventana más clara, profesional y útil desde el primer momento, con identidad propia de Forzes Water y accesos rápidos relacionados con el negocio.

## Cambios visibles
1. **Encabezado más sólido**
   - Mantener el ícono actual de la gota dentro del círculo blanco con contorno azul.
   - Usar azul corporativo, nombre “Forzes Water”, estado “Asistente virtual” y un indicador discreto de disponibilidad.
   - Conservar un botón de cierre claro y accesible.

2. **Bienvenida inmediata**
   - Eliminar el inicio actual que envía “Hola” como si fuera un mensaje del visitante.
   - Mostrar directamente un saludo corto del asistente: “Hola, soy el asistente de Forzes Water. ¿En qué podemos ayudarte hoy?”.
   - Mantener las respuestas breves, con separación entre párrafos, listas legibles y sin bloques extensos.

3. **Accesos rápidos útiles**
   - Agregar cuatro opciones al inicio:
     - Cotizar un sistema
     - Conocer productos
     - Solicitar servicio
     - Hablar por WhatsApp
   - Las primeras tres iniciarán una consulta real en el chat; WhatsApp abrirá el canal de contacto existente.
   - Ocultar los accesos rápidos después de iniciar la conversación para dejar espacio a los mensajes.

4. **Conversación y campo de escritura**
   - Aplicar burbujas limpias con alto contraste: asistente sobre blanco y visitante en azul corporativo.
   - Mejorar márgenes, ancho de lectura y jerarquía de listas y enlaces.
   - Mantener el campo de escritura fijo abajo, con botón de envío compacto y estados claros de carga y desactivado.
   - Conectar el mini formulario de correo que ya existe para completar el flujo de “correo primero”.

5. **Adaptación móvil**
   - Ajustar alto, ancho y espaciado para aprovechar la pantalla sin tapar controles del sitio.
   - Usar objetivos táctiles cómodos y una cuadrícula de dos columnas que mantenga los textos completos.
   - Verificar que el teclado móvil no oculte el campo para escribir.

## Sistema visual elegido
- **Paleta:** azul corporativo `#0A5475`, azul principal `#0877A8`, azul muy claro `#E7F5F8` y blanco.
- **Tipografía del chatbot:** Outfit para títulos y Figtree para mensajes y controles.
- **Estilo:** superficies claras, bordes discretos, sombra contenida y movimiento suave al abrir y mostrar opciones.

## Detalles técnicos
- Componer la conversación, mensajes, carga y entrada sobre los componentes AI Elements disponibles, conservando la integración actual del asistente.
- Usar componentes de interfaz existentes para todos los botones y controles.
- Mantener el historial completo en cada consulta y el flujo actual de captura de prospectos.
- Adaptar los accesos rápidos a acciones reales; no copiar opciones ni textos comerciales de Telmex.
- Desplegar la función actualizada del chat para que el formulario de correo funcione de extremo a extremo.

## Validación
- Probar apertura, cierre, escritura, envío, accesos rápidos, WhatsApp y formulario de correo.
- Revisar visualmente en escritorio y móvil.
- Confirmar contraste, lectura, foco con teclado, desplazamiento automático y ausencia de traslapes.
- Ejecutar las comprobaciones completas del proyecto antes de finalizar.
