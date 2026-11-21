import type { LucideIcon } from "lucide-react";
import { Award, Factory, FlaskConical, Headphones, Ruler, ShieldCheck, Wrench } from "lucide-react";

import bombaSumergible from "@/assets/products/bomba-sumergible.jpg";
import bombaCentrifuga from "@/assets/products/bomba-centrifuga.jpg";
import bombaPresurizadora from "@/assets/products/bomba-presurizadora.jpg";
import panelPlc from "@/assets/products/panel-plc.jpg";
import controladorBombas from "@/assets/products/controlador-bombas.jpg";
import panelAutomatizacion from "@/assets/products/panel-automatizacion.jpg";
import filtroArena from "@/assets/products/filtro-arena.jpg";
import filtroCarbon from "@/assets/products/filtro-carbon.jpg";
import filtroCartucho from "@/assets/products/filtro-cartucho.jpg";
import plantaOsmosis from "@/assets/products/planta-osmosis.jpg";
import plantaPotable from "@/assets/products/planta-potable.jpg";
import plantaResiduales from "@/assets/products/planta-residuales.jpg";

export const WA_NUMBER = "525518070867";
export const PHONE_DISPLAY = "+52 55 1807 0867";
export const PHONE_HREF = "tel:+525518070867";
export const EMAIL_ADDRESS = "forzeswater@outlook.com";
export const OFFICE_ADDRESS = "Campeche 1723-111, Chalma de Guadalupe, Gustavo A. Madero, 07210";
export const OFFICE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Campeche%201723-111%2C%20Chalma%20de%20Guadalupe%2C%20Gustavo%20A.%20Madero%2C%2007210%2C%20CDMX";

export const waUrl = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
export const WA_DEFAULT = waUrl("Hola, quiero asesoría para un sistema de tratamiento de agua.");

export const NAV_LINKS = [
  { href: "#inicio", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#sistemas", label: "Sistemas" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#faq", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

export type Chapter = {
  n: string;
  label: string;
  step: string;
  t1: string;
  acc: string;
  t2: string;
  desc: string;
  icon: LucideIcon;
  chips: string[];
  cards: { k: string; v: string }[];
};

export const CHAPTERS: Chapter[] = [
  {
    n: "01", label: "Analiza", step: "Análisis de agua en laboratorio",
    t1: "Primero, conocemos ", acc: "tu agua", t2: ".",
    desc: "Pruebas de calidad y consultoría para saber exactamente qué necesita tu sistema.",
    icon: FlaskConical, chips: [],
    cards: [{ k: "Laboratorio", v: "Análisis de agua" }, { k: "Diagnóstico", v: "Consultoría especializada" }],
  },
  {
    n: "02", label: "Diseña", step: "Diseño y dimensionamiento",
    t1: "Ingeniería ", acc: "a tu medida", t2: ".",
    desc: "Diseñamos y fabricamos sistemas de alta eficiencia para industria, comercio y casa.",
    icon: Ruler, chips: [],
    cards: [{ k: "Capacidad", v: "100 a 100,000 LPH" }, { k: "Alcance", v: "Proyectos llave en mano" }],
  },
  {
    n: "03", label: "Instala", step: "Instalación llave en mano",
    t1: "Plantas y equipos ", acc: "listos para operar", t2: ".",
    desc: "Ósmosis inversa, filtración, ablandamiento, bombeo y plantas de agua potable o residual.",
    icon: Factory, chips: ["Ósmosis inversa", "Filtración", "Bombeo", "Ablandamiento", "Automatización PLC"],
    cards: [{ k: "Calidad", v: "Cumple estándares de la OMS" }, { k: "Equipo", v: "Técnicos certificados" }],
  },
  {
    n: "04", label: "Mantén", step: "Mantenimiento y monitoreo",
    t1: "Siempre ", acc: "funcionando", t2: ".",
    desc: "Mantenimiento preventivo, refacciones e insumos, y soporte técnico en sitio.",
    icon: Wrench, chips: [],
    cards: [{ k: "Soporte", v: "24/7" }, { k: "Refacciones", v: "De las mejores marcas" }],
  },
];

export type Benefit = { icon: LucideIcon; title: string; description: string; details: string[] };

export const BENEFITS: Benefit[] = [
  {
    icon: Award, title: "Experiencia comprobada", description: "Soluciones a la medida, del hogar a la industria.",
    details: [
      "Más de una década en tratamiento de agua.",
      "Experiencia en proyectos residenciales, comerciales e industriales.",
      "Cada sistema se adapta a las necesidades del proyecto.",
    ],
  },
  {
    icon: ShieldCheck, title: "Equipos confiables", description: "Componentes durables para un rendimiento consistente.",
    details: [
      "Equipos de grado ingenieril seleccionados por calidad y eficiencia.",
      "Sistemas preparados para condiciones de operación exigentes.",
      "Componentes de marcas reconocidas según cada aplicación.",
    ],
  },
  {
    icon: Wrench, title: "Proyecto llave en mano", description: "Diseño, instalación y puesta en marcha en un solo lugar.",
    details: [
      "Acompañamiento desde la evaluación inicial hasta la entrega.",
      "Instalación, puesta en marcha y capacitación para operar el sistema.",
      "Automatización y monitoreo según las necesidades del proyecto.",
    ],
  },
  {
    icon: Headphones, title: "Soporte que continúa", description: "Atención técnica y mantenimiento después de instalar.",
    details: [
      "Soporte técnico 24/7 para incidencias y consultas.",
      "Mantenimiento preventivo para prolongar la vida útil de los equipos.",
      "Acompañamiento para mantener la continuidad de tu operación.",
    ],
  },
];

export const SYSTEMS = [
  {
    code: "SYS-01", title: "Ósmosis inversa", img: plantaOsmosis,
    summary: "Agua pura para consumo, procesos y farmacéutica.",
    specs: ["100 a 100,000 LPH", "Hasta 99.7% de rechazo de sales", "Limpieza CIP automática"],
  },
  {
    // Foto temporal: falta una imagen de suavizador
    code: "SYS-02", title: "Suavización", img: plantaPotable,
    summary: "Quitamos la dureza y el sarro que dañan calderas, tuberías y equipos.",
    specs: ["Suavizadores simples o dúplex", "Intercambio iónico", "Regeneración automática"],
  },
  {
    code: "SYS-03", title: "Filtración industrial", img: filtroArena,
    summary: "Quitamos sólidos, turbidez, cloro, olores y sabores.",
    specs: ["Arena, carbón y microfiltración", "Sistemas de 1 a 500 m³/h", "Retrolavado automático"],
  },
  {
    code: "SYS-04", title: "Aguas residuales", img: plantaResiduales,
    summary: "Plantas de tratamiento (PTAR) llave en mano que cumplen la norma.",
    specs: ["Tratamiento primario a terciario", "Desinfección y manejo de lodos", "Cumplimiento NOM"],
  },
];

export type CategoryId = "pumps" | "panels" | "filters";

export const CATS: { id: CategoryId; label: string; short: string }[] = [
  { id: "pumps", label: "Bombas de agua", short: "Bombas" },
  { id: "panels", label: "Paneles y tableros de control", short: "Tableros" },
  { id: "filters", label: "Filtros y medios filtrantes", short: "Filtros" },
];

export type PriceListKey = "SBO" | "PIQ" | "TDA";

export type Product = {
  id: string;
  code: string;
  cat: CategoryId;
  application: string;
  catalog: PriceListKey;
  title: string;
  img: string;
  description: string;
  specs: string;
  brands?: string;
  details: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "bombas-sumergibles", code: "BOM-01", cat: "pumps", application: "Extracción de agua", catalog: "SBO",
    title: "Bombas Sumergibles", img: bombaSumergible,
    description: "Alto rendimiento para pozos profundos y extracción de agua subterránea.",
    specs: "Hasta 500 m de profundidad · 5 a 500 HP",
    details: "Diseñadas para pozos profundos y extracción de agua subterránea. Fabricadas en acero inoxidable 304/316. Incluyen motor sumergible refrigerado por agua, impulsor multietapa balanceado, cable sumergible certificado, válvula check integrada y sensor de nivel. Disponibles en 4, 6 y 8 pulgadas, de 5 a 500 HP. Eficiencia energética superior al 85%.",
  },
  {
    id: "bombas-centrifugas", code: "BOM-02", cat: "pumps", application: "Distribución y presión", catalog: "SBO",
    title: "Bombas Centrífugas", img: bombaCentrifuga,
    description: "Transferencia y distribución de agua para aplicaciones comerciales e industriales.",
    specs: "Caudales de 10 a 5000 m³/h · Alturas hasta 150 m",
    details: "Bombas centrífugas horizontales y verticales en hierro fundido, bronce o acero inoxidable según aplicación. Impulsor cerrado, sello mecánico de carburo de silicio y acoplamiento flexible con guarda. Para riego, abastecimiento municipal, torres de enfriamiento y circulación industrial.",
  },
  {
    id: "bombas-presurizadoras", code: "BOM-03", cat: "pumps", application: "Distribución y presión", catalog: "SBO",
    title: "Bombas Presurizadoras", img: bombaPresurizadora,
    description: "Presión constante para edificios residenciales, comerciales e industriales.",
    specs: "Velocidad variable · Presión de 2 a 10 bar",
    details: "Sistemas de presurización constante con bombas en paralelo, variadores de frecuencia, tanque hidroneumático, sensores de presión y flujo, y tablero de control automático. Rotación de bombas para desgaste uniforme.",
  },
  {
    id: "sistemas-control-plc", code: "TAB-01", cat: "panels", application: "Automatización y control", catalog: "SBO",
    title: "Sistemas de Control PLC", img: panelPlc,
    description: "Automatización de procesos de tratamiento de agua con control y monitoreo.",
    specs: "Pantalla HMI · Ethernet, Profinet y Modbus",
    brands: "Siemens, Allen-Bradley, Schneider Modicon",
    details: "Tableros con PLC para automatización completa de procesos de tratamiento de agua. Pantalla HMI a color, programación a la medida, registro histórico, alarmas configurables y acceso remoto seguro. Gabinete NEMA 4X en acero inoxidable o policarbonato. Marcas: Siemens, Allen-Bradley, Schneider Modicon.",
  },
  {
    id: "controladores-bombas", code: "TAB-02", cat: "panels", application: "Automatización y control", catalog: "SBO",
    title: "Controladores de Bombas", img: controladorBombas,
    description: "Operación automática, protección y monitoreo de una o varias bombas.",
    specs: "Monitoreo remoto · Control de velocidad variable",
    details: "Controladores para operación automática de una o múltiples bombas, con protecciones eléctricas y monitoreo en tiempo real de presión, flujo, nivel, temperatura y consumo. Modos manual, automático, alternado y emergencia. Conectividad 4G/WiFi.",
  },
  {
    id: "paneles-automatizacion", code: "TAB-03", cat: "panels", application: "Automatización y control", catalog: "SBO",
    title: "Paneles de Automatización", img: panelAutomatizacion,
    description: "Tableros diseñados a la medida para integrar el control de tu sistema de agua.",
    specs: "Ingeniería personalizada · Planos eléctricos incluidos",
    details: "Tableros diseñados y fabricados a la medida. Pueden integrar PLC, HMI, variadores de frecuencia, arrancadores, protecciones, medidores de energía y UPS. Cableado numerado e identificado y planos eléctricos finales.",
  },
  {
    id: "filtros-arena", code: "FIL-01", cat: "filters", application: "Tratamiento y filtración", catalog: "TDA",
    title: "Filtros de Arena", img: filtroArena,
    description: "Remoción de sólidos suspendidos y turbidez mediante filtración multimedia.",
    specs: "Flujos de 5 a 200 GPM · Retrolavado automático",
    details: "Filtros multimedia con capas de antracita, arena sílica y grava clasificada en tanques de fibra de vidrio o acero al carbón epóxico. Válvula multipuerto automática y manómetros diferenciales.",
  },
  {
    id: "filtros-carbon", code: "FIL-02", cat: "filters", application: "Tratamiento y filtración", catalog: "TDA",
    title: "Filtros de Carbón Activado", img: filtroCarbon,
    description: "Reducción de cloro, olores, sabores y compuestos orgánicos del agua.",
    specs: "Carbón activado granular · Válvula automática",
    details: "Carbón activado de coco en tanques de fibra de vidrio con válvula automática de retrolavado. Funcionan como pretratamiento para ósmosis inversa o como pulimento final.",
  },
  {
    id: "filtros-cartucho", code: "FIL-03", cat: "filters", application: "Tratamiento y filtración", catalog: "TDA",
    title: "Filtros de Cartucho", img: filtroCartucho,
    description: "Filtración de partículas finas con cartuchos reemplazables.",
    specs: "De 1 a 100 micras · Configuraciones modulares",
    details: "Portafiltros en acero inoxidable 304/316 o polipropileno reforzado, de 1 a 60 cartuchos y distintos medios filtrantes. Ideales para prefiltración de ósmosis inversa y agua de proceso.",
  },
];

export const PRICE_LISTS: { key: PriceListKey; short: string; subtitle: string; pages: string }[] = [
  { key: "SBO", short: "Bombeo", subtitle: "Sistemas de Bombeo · Edición 2026", pages: "40 páginas" },
  { key: "PIQ", short: "Piscinas", subtitle: "Piscinas y Químicos · Edición 2025", pages: "+50 páginas" },
  { key: "TDA", short: "Tratamiento", subtitle: "Tratamiento de Agua · Edición 2025", pages: "+50 páginas" },
];

export const FAQS = [
  { q: "¿Cuánto tiempo toma la instalación?", a: "En proyectos residenciales suele tomar de 1 a 3 días; en industriales, de 1 a 4 semanas. Confirmamos el cronograma al cotizar." },
  { q: "¿Ofrecen mantenimiento después de la instalación?", a: "Sí. Damos mantenimiento preventivo y correctivo, revisiones, cambio de consumibles y análisis del agua según las necesidades de tu sistema." },
  { q: "¿Qué garantía tienen los equipos?", a: "La garantía de fábrica varía de 1 a 5 años según el producto. La instalación y mano de obra cuentan con 12 meses de garantía." },
  { q: "¿Cómo solicito una cotización?", a: "Escríbenos por WhatsApp o a Forzecito. Cuéntanos el uso, la capacidad que necesitas y las características de tu agua para orientarte." },
  { q: "¿Realizan análisis de agua gratuitos?", a: "Sí, el análisis básico no tiene costo dentro de la cotización de proyectos mayores. Los resultados nos ayudan a definir el tratamiento adecuado." },
  { q: "¿Dónde tienen cobertura?", a: "Atendemos proyectos en toda la República Mexicana, principalmente en CDMX y zona metropolitana. Para otras ubicaciones, confirmamos la cobertura al revisar tu proyecto." },
];

/** Normaliza texto para búsqueda sin acentos ni mayúsculas. */
export const norm = (s: string) =>
  (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export const catLabel = (id: CategoryId) => CATS.find((c) => c.id === id)?.label ?? "";

export const quoteMessage = (items: Product[]) =>
  `Hola, quiero cotizar estos equipos de Forzes Water:\n\n${items.map((p) => `• ${p.title}`).join("\n")}\n\n¿Me apoyan con disponibilidad y una cotización?`;
