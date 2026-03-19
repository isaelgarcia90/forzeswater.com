

## Plan: Justificar texto en todas las tarjetas

Agregar `text-justify` a los párrafos descriptivos de todas las tarjetas en cada sección de la página.

### Archivos a modificar

1. **`src/components/About.tsx`** (línea ~67): Agregar `text-justify` al `<p>` de descripción en las tarjetas de beneficios.

2. **`src/components/Solutions.tsx`** (línea 77): Agregar `text-justify` al `<p>` de descripción en las tarjetas de soluciones. También en el detalle del dialog (línea 99).

3. **`src/components/Products.tsx`** (línea 179): Agregar `text-justify` al `<p>` de descripción en las tarjetas de productos. También en el detalle del dialog (línea 216).

4. **`src/components/Services.tsx`** (línea ~88): Agregar `text-justify` al `<p>` de descripción en las tarjetas de servicios. También en el detalle del dialog.

5. **`src/components/FAQ.tsx`** (línea ~97): Agregar `text-justify` al contenido de las respuestas del accordion.

### Detalle técnico

En cada caso se agrega la clase de Tailwind `text-justify` a los elementos `<p>` y `<AccordionContent>` que contienen texto descriptivo dentro de tarjetas. No se justifican títulos ni etiquetas cortas, solo párrafos de contenido.

