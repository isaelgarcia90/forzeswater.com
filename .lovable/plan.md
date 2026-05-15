## Objetivo

Reducir el peso de la imagen hero (`src/assets/hero-water-treatment.jpg`, ~220 KB) convirtiéndola a WebP para acelerar el LCP en la home.

## Pasos

1. Generar `src/assets/hero-water-treatment.webp` a partir del JPG actual usando `cwebp` (calidad ~82, sin redimensionar para conservar nitidez en pantallas grandes). Esperado: 60–75% menos peso (~60–90 KB).
2. Actualizar el import en `src/components/Hero.tsx` para apuntar al nuevo `.webp`. Vite lo servirá con hash y cache largo. Se conservan los atributos ya añadidos (`width`, `height`, `fetchPriority="high"`, `decoding="async"`).
3. Eliminar el `.jpg` original para no inflar el repo (Vite solo bundlea lo importado, pero limpiamos el asset huérfano).
4. Verificar visualmente en preview que la imagen se ve idéntica y que no hay regresiones de layout.

## Notas técnicas

- WebP tiene soporte universal en navegadores modernos (>97%); no se requiere fallback `<picture>` para este caso.
- No se toca el sistema de diseño ni la animación p5.js de gotas que va encima.
- Tras aplicar, será necesario republicar para que el cambio impacte la versión live (donde se mide el SEO).

¿Procedo con la conversión?
