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
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot, FileDown } from "lucide-react";

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

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<{categoryId: string, productIndex: number} | null>(null);
  
  const productCategories = [
    {
      id: "pumps",
      catalog: "sbo",
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
      catalog: "sbo",
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
      catalog: "tda",
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
    <section id="products" className="pt-24 pb-8 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Catálogo de equipos
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Bombas, automatización y filtración. Abre cualquier equipo para cotizarlo o descarga la lista de precios.
          </p>
        </div>

        <Tabs defaultValue="pumps" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 h-auto">
            {productCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-base whitespace-normal py-2">
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
                      <p className="text-muted-foreground mb-3">{product.description}</p>
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
                    <DialogDescription className="text-xs sm:text-base whitespace-normal py-2">
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
                      <p className="text-muted-foreground leading-relaxed">
                        {product.details}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button asChild className="flex-1 bg-gradient-primary">
                      <a href={`https://wa.me/525518070867?text=${encodeURIComponent(`Hola, quiero cotizar: ${product.title}`)}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" /> Cotizar por WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => { setSelectedProduct(null); window.dispatchEvent(new Event("open-forzecito")); }}>
                      <Bot className="h-4 w-4 mr-2" /> Preguntar a Forzecito
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => {
                      setSelectedProduct(null);
                      window.dispatchEvent(new CustomEvent("select-catalog", { detail: category?.catalog }));
                      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                      <FileDown className="h-4 w-4 mr-2" /> Ver precios
                    </Button>
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
