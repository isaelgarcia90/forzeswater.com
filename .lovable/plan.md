## Objetivo

Agregar una nueva sección **"Catálogo y Precios"** entre Productos y Servicios que permita al cliente descargar el PDF de la lista de precios 2026, capturando primero sus datos de contacto como lead calificado.

## Cambios

### 1. Asset: PDF en `/public/`

- Copiar `LISTA_DE_PRECIOS_BOMBEO_2026.pdf` a `public/lista-precios-forzes-water-2026.pdf`
- Servible directamente como `/lista-precios-forzes-water-2026.pdf`

### 2. Nueva tabla en backend: `catalog_downloads`

Captura cada solicitud de descarga del catálogo:

```
- id (uuid)
- name (text)
- email (text)
- company (text, opcional)
- phone (text, opcional)
- line_of_interest (text, opcional) — qué línea les interesa
- created_at (timestamp)
```

RLS: solo `service_role` con acceso total (mismo patrón que `chat_leads`).

### 3. Nuevo componente: `src/components/Catalog.tsx`

Estructura visual (siguiendo el design system existente):

- **Section header centrado**: "Catálogo y Lista de Precios 2026" + subtítulo
- **Grid de 2 columnas (lg:grid-cols-2)**:
  - **Columna izquierda**: Tarjeta visual mostrando portada del catálogo (preview con icono de PDF + título "Lista de Precios SBO – Febrero 2025" + badge "40 páginas · 10 líneas de productos") con efecto hover. Lista de las 10 líneas de productos como chips/badges:
    - Tanques Presurizados, Línea DAB, Línea Pentair, Línea Leo, Línea Aquex, Línea Arenka, Centrífugas Comerciales, Bombas Solares, Aplicaciones Específicas, Automatización Eléctrica, Accesorios
  - **Columna derecha**: Formulario de captura con campos:
    - Nombre completo *
    - Email *
    - Empresa (opcional)
    - Teléfono con dropdown de lada (reutilizar el componente del formulario de contacto)
    - Línea de interés (Select con las 10 categorías + "Todas")
    - Botón "Descargar Lista de Precios" con `bg-gradient-primary`
    - Nota pequeña: "Los precios son de lista. Solicite descuento personalizado a nuestro equipo de ventas."
- **3 CTAs alternativos abajo** (cards horizontales):
  - "Solicitar Cotización Personalizada" → ancla a #contact con valor pre-llenado
  - "Hablar por WhatsApp" → wa.me directo
  - "Llamar al asesor" → tel: directo

### 4. Lógica del formulario

1. Validación con Zod (igual al patrón existente de Contact.tsx): nombre min 2, email válido, teléfono opcional pero validado si presente.
2. Al enviar:
   - Insertar en `catalog_downloads` (Supabase)
   - Enviar copia a Formspree (mismo endpoint `xblnyzay`) con tag "catalog_download" para notificación al equipo
   - Track evento GA4 `catalog_download_requested` vía `useAnalytics`
3. Al éxito:
   - Mostrar overlay de éxito (mismo patrón de Contact.tsx)
   - Disparar descarga automática del PDF (`<a href="..." download>` programático)
   - Mensaje: "¡Descarga iniciada! También recibirás el catálogo por email pronto."
4. Al error: overlay rojo con opción de reintentar.

### 5. Integración en `src/pages/Index.tsx`

Importar `Catalog` y colocarlo entre `<Products />` y `<Services />`.

### 6. Navegación en Header

Agregar link "Catálogo" en `src/components/Header.tsx` (desktop + mobile menu) que haga scroll a `#catalog`. Insertar entre "Productos" y "Servicios".

### 7. Memoria del proyecto

Crear `mem://features/catalog-pricing` documentando:
- PDF se sirve desde `/public/lista-precios-forzes-water-2026.pdf`
- Descarga gated por formulario que guarda en `catalog_downloads`
- Precios NO se exponen públicamente en el sitio (decisión de negocio)
- Para actualizar precios: reemplazar el archivo PDF en `/public/`

Actualizar `mem://index.md` con la nueva entrada.

## Notas técnicas

- **Migración primero**: La tabla `catalog_downloads` se crea vía `supabase--migration` antes del código del componente.
- **Reutilizar patrones**: El formulario y dropdown de lada copian la lógica ya existente en `Contact.tsx` para mantener consistencia (no duplicar código del array `COUNTRY_CODES` — extraerlo a `src/lib/country-codes.ts` para reutilizar entre Contact.tsx y Catalog.tsx).
- **Sin email transaccional automático** en esta primera versión: el lead llega por Supabase + Formspree y el equipo de ventas envía el PDF/cotización personalizada manualmente. Si más adelante se quiere envío automático del PDF por email, se puede agregar después con la infraestructura de "app emails" de Lovable Cloud.
- **Tracking GA4**: nuevos eventos `catalog_download_requested`, `catalog_download_completed`, `catalog_form_started`.

## Fuera de alcance (futuras iteraciones)

- Versionado del PDF (v2026, v2027) en una tabla `catalog_versions`
- Envío automático del PDF al email del lead vía app emails
- Dashboard interno para ver leads de descarga
- Catálogo interactivo con búsqueda de producto específico
