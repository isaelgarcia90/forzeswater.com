import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

// Import product images
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
import plantaResiduales from "@/assets/products/planta-residuales.jpg";
import plantaPotable from "@/assets/products/planta-potable.jpg";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<{categoryId: string, productIndex: number} | null>(null);
  
  const productCategories = [
    {
      id: "plants",
      label: "Plantas de Tratamiento",
      products: [
        {
          title: "Plantas de Ósmosis Inversa",
          description: "Sistemas completos de purificación de agua por ósmosis inversa",
          specs: "Capacidad de 100 LPH a 100,000 LPH",
          details: "Plantas de ósmosis inversa completas llave en mano. Incluyen pretratamiento con filtros multimedia y carbón activado, dosificación de antiincrustante, filtros de cartucho 5 micras, bombas de alta presión en acero inoxidable, membranas de última generación (Dow, Hydranautics o Toray), portamembranas en fibra de vidrio, instrumentación digital (TDS, pH, flujo, presión), sistema CIP de limpieza química, panel de control con PLC y HMI. Recuperación de 50-75%. Rechazo de sales >98%. Incluye skid estructural, tubería CPVC/acero inoxidable, válvulas y accesorios.",
          image: plantaOsmosis,
        },
        {
          title: "Tratamiento de Aguas Residuales",
          description: "Tratamiento de aguas residuales industriales y municipales",
          specs: "Tratamiento biológico y químico",
          details: "Plantas de tratamiento de aguas residuales (PTAR) diseñadas según características del efluente y normativa aplicable. Procesos disponibles: tratamiento primario (cribado, desarenado, sedimentación), secundario biológico (lodos activados, SBR, MBBR, filtros percoladores), terciario (filtración, desinfección UV/cloro). Tratamiento físico-químico para efluentes industriales. Manejo de lodos con espesamiento y deshidratación. Sistemas compactos prefabricados o construcción en sitio. Cumplimiento de NOM-001-SEMARNAT, NOM-002 y NOM-003. Capacidades de 1 a 500 m³/día.",
          image: plantaResiduales,
        },
        {
          title: "Plantas de Agua Potable",
          description: "Instalaciones llave en mano para producción de agua potable",
          specs: "Cumplimiento con estándares de la OMS",
          details: "Plantas potabilizadoras completas para producción de agua de consumo humano. Tren de tratamiento personalizado según análisis de agua cruda: coagulación-floculación, sedimentación, filtración multimedia, desinfección (cloro, UV, ozono), ajuste de pH, fluoruración. Sistemas de dosificación automática de químicos. Tanques de contacto de cloro. Instrumentación y control automático. Almacenamiento de agua tratada. Sistema de distribución. Cumplimiento total con NOM-127-SSA1 y estándares OMS para agua potable. Desde 5 hasta 500 m³/h. Incluye laboratorio de análisis básico.",
          image: plantaPotable,
        },
      ],
    },
    {
      id: "pumps",
      label: "Bombas de Agua",
      products: [
        {
          title: "Bombas Sumergibles",
          description: "Bombas sumergibles de alto rendimiento para pozos profundos",
          specs: "Hasta 500m de profundidad, 5-500 HP",
          details: "Nuestras bombas sumergibles están diseñadas para pozos profundos y aplicaciones de extracción de agua subterránea. Fabricadas con materiales resistentes a la corrosión como acero inoxidable 304/316. Incluyen motor sumergible refrigerado por agua, impulsor multi-etapa balanceado, cable sumergible certificado, válvula check integrada y sensor de nivel. Disponibles en 4, 6 y 8 pulgadas de diámetro con potencias de 5 a 500 HP. Eficiencia energética superior al 85%.",
          image: bombaSumergible,
        },
        {
          title: "Bombas Centrífugas",
          description: "Bombas centrífugas eficientes para distribución de agua",
          specs: "Caudales de hasta 5000 m³/h",
          details: "Bombas centrífugas horizontales y verticales para transferencia y distribución de agua. Construcción en hierro fundido, bronce o acero inoxidable según aplicación. Diseño de impulsor cerrado para máxima eficiencia. Sello mecánico de carburo de silicio. Acoplamiento flexible con guarda de seguridad. Aplicaciones: sistemas de riego, abastecimiento municipal, torres de enfriamiento, circulación industrial. Caudales de 10 a 5000 m³/h con alturas hasta 150 metros.",
          image: bombaCentrifuga,
        },
        {
          title: "Bombas Presurizadoras",
          description: "Sistemas de presurización para suministro de agua en edificios",
          specs: "Velocidad variable, eficientes en energía",
          details: "Sistemas completos de presurización constante para edificios residenciales, comerciales e industriales. Incluyen múltiples bombas en paralelo (dúplex, triplex o cuádruplex), variadores de frecuencia, tanque hidroneumático, válvulas de seccionamiento, sensores de presión y flujo, tablero de control automático con PLC y pantalla touch. Operación automática con rotación de bombas para desgaste uniforme. Presión constante de 2 a 10 bar. Ahorro de energía de hasta 50% vs sistemas convencionales.",
          image: bombaPresurizadora,
        },
      ],
    },
    {
      id: "panels",
      label: "Paneles de Control",
      products: [
        {
          title: "Sistemas de Control PLC",
          description: "Controladores lógicos programables avanzados para automatización",
          specs: "Compatible con Siemens/Allen-Bradley",
          details: "Tableros de control con PLC para automatización completa de procesos de tratamiento de agua. Utilizamos PLC de marcas líderes: Siemens S7-1200/1500, Allen-Bradley CompactLogix, o Schneider Modicon. Incluyen pantalla HMI touch screen a color de 7 a 15 pulgadas, programación personalizada según proceso, comunicación Ethernet/Profinet/Modbus, registro de datos históricos, sistema de alarmas configurable y acceso remoto seguro. Gabinete NEMA 4X en acero inoxidable o policarbonato.",
          image: panelPlc,
        },
        {
          title: "Controladores de Bombas",
          description: "Sistemas inteligentes de control y monitoreo de bombas",
          specs: "Capacidad de monitoreo remoto",
          details: "Controladores dedicados para operación automática de una o múltiples bombas. Incluyen protecciones de sobre corriente, bajo voltaje, falla de fase, sobrecarga térmica y falla de sensor. Monitoreo en tiempo real de presión, flujo, nivel, temperatura y consumo eléctrico. Modos de operación: manual, automático, alternado y emergencia. Control de velocidad por variador de frecuencia. Interface HMI para configuración local. Conectividad 4G/WiFi para monitoreo remoto vía plataforma web o app móvil. Registro de eventos y alarmas.",
          image: controladorBombas,
        },
        {
          title: "Paneles de Automatización",
          description: "Soluciones completas de automatización para sistemas de agua",
          specs: "Construido a medida, certificado UL",
          details: "Tableros de automatización diseñados y fabricados completamente a la medida de su proyecto. Ingeniería eléctrica e instrumentación personalizada. Incluyen: PLC, HMI, variadores de frecuencia, arrancadores, protecciones eléctricas, medidores de energía, UPS integrado, sistema de ventilación/climatización. Cumplimiento total con NOM-001-SEDE. Certificación UL508A opcional. Construcción en lámina calibre 14 con pintura electrostática. Cableado numerado e identificado. Planos eléctricos as-built incluidos. Garantía de 2 años.",
          image: panelAutomatizacion,
        },
      ],
    },
    {
      id: "filters",
      label: "Filtros",
      products: [
        {
          title: "Filtros de Arena",
          description: "Sistemas de filtración de arena multi-medios",
          specs: "Varios tamaños, retrolavado automático",
          details: "Filtros de arena multi-medios para remoción de sólidos suspendidos y turbidez. Utilizan capas de antracita, arena sílica y grava clasificada en tanques de fibra de vidrio o acero al carbón epóxico. Válvula multipuerto automática para retrolavado programable. Sistema distribuidor inferior tipo domo o boquillas. Manómetros diferenciales para monitoreo de pérdida de carga. Flujos de operación de 5 a 200 GPM por unidad. Reducen turbidez hasta <1 NTU. Retrolavado eficiente con recuperación rápida. Vida útil del medio filtrante: 5-7 años.",
          image: filtroArena,
        },
        {
          title: "Filtros de Carbón Activado",
          description: "Elimina cloro, olores y compuestos orgánicos",
          specs: "Carbón activado de alto grado",
          details: "Filtros de carbón activado granular (GAC) para eliminación de cloro, sabores, olores, compuestos orgánicos y químicos disueltos. Utilizamos carbón activado de coco de alta calidad con área superficial >1000 m²/g. Tanques en fibra de vidrio con válvula automática de retrolavado. Elimina >95% de cloro libre y compuestos orgánicos volátiles (VOCs). Mejora dramáticamente sabor y olor del agua. Ideal como pretratamiento para ósmosis inversa o como pulimento final. Recarga de carbón recomendada cada 12-24 meses según uso.",
          image: filtroCarbon,
        },
        {
          title: "Filtros de Cartucho",
          description: "Filtración de precisión con cartuchos reemplazables",
          specs: "Opciones de 1-100 micras",
          details: "Sistemas de filtración de cartucho para remoción de partículas finas. Portafiltros en acero inoxidable 304/316 o polipropileno reforzado. Disponibles en configuraciones de 1 hasta 60 cartuchos. Cartuchos de 10, 20, 30 o 40 pulgadas de longitud. Medios filtrantes: polipropileno plisado, celulosa, fibra de vidrio o poliéster lavable. Micronajes de 1, 5, 10, 20, 50 o 100 micras. Conexiones de 1/2 hasta 4 pulgadas. Presión de trabajo hasta 150 PSI. Ideal para prefiltración de ósmosis inversa, protección de equipos y agua de proceso.",
          image: filtroCartucho,
        },
      ],
    },
  ];

  return (
    <section id="products" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Productos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Equipos y sistemas de tratamiento de agua de alta calidad
          </p>
        </div>

        <Tabs defaultValue="plants" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
            {productCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-base">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {productCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden hover:shadow-large transition-all duration-300 bg-card border-border cursor-pointer"
                    onClick={() => setSelectedProduct({ categoryId: category.id, productIndex: index })}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                      <p className="text-muted-foreground mb-3 text-justify">{product.description}</p>
                      <p className="text-sm text-primary font-semibold">{product.specs}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl">
            {selectedProduct !== null && (() => {
              const category = productCategories.find(c => c.id === selectedProduct.categoryId);
              const product = category?.products[selectedProduct.productIndex];
              return product ? (
                <>
                  <DialogHeader>
                    <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <DialogTitle className="text-2xl">{product.title}</DialogTitle>
                    <DialogDescription className="text-base">
                      {product.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Especificaciones:</h4>
                      <p className="text-sm text-muted-foreground">{product.specs}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Detalles:</h4>
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        {product.details}
                      </p>
                    </div>
                  </div>
                </>
              ) : null;
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Products;
