import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const productCategories = [
    {
      id: "pumps",
      label: "Bombas de Agua",
      products: [
        {
          title: "Bombas Sumergibles",
          description: "Bombas sumergibles de alto rendimiento para pozos profundos",
          specs: "Hasta 500m de profundidad, 5-500 HP",
        },
        {
          title: "Bombas Centrífugas",
          description: "Bombas centrífugas eficientes para distribución de agua",
          specs: "Caudales de hasta 5000 m³/h",
        },
        {
          title: "Bombas Presurizadoras",
          description: "Sistemas de presurización para suministro de agua en edificios",
          specs: "Velocidad variable, eficientes en energía",
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
        },
        {
          title: "Controladores de Bombas",
          description: "Sistemas inteligentes de control y monitoreo de bombas",
          specs: "Capacidad de monitoreo remoto",
        },
        {
          title: "Paneles de Automatización",
          description: "Soluciones completas de automatización para sistemas de agua",
          specs: "Construido a medida, certificado UL",
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
        },
        {
          title: "Filtros de Carbón Activado",
          description: "Elimina cloro, olores y compuestos orgánicos",
          specs: "Carbón activado de alto grado",
        },
        {
          title: "Filtros de Cartucho",
          description: "Filtración de precisión con cartuchos reemplazables",
          specs: "Opciones de 1-100 micras",
        },
      ],
    },
    {
      id: "plants",
      label: "Plantas de Tratamiento",
      products: [
        {
          title: "Plantas de Ósmosis Inversa",
          description: "Sistemas completos de purificación de agua por ósmosis inversa",
          specs: "Capacidad de 100 LPH a 100,000 LPH",
        },
        {
          title: "Tratamiento de Aguas Residuales",
          description: "Tratamiento de aguas residuales industriales y municipales",
          specs: "Tratamiento biológico y químico",
        },
        {
          title: "Plantas de Agua Potable",
          description: "Instalaciones llave en mano para producción de agua potable",
          specs: "Cumplimiento con estándares de la OMS",
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

        <Tabs defaultValue="pumps" className="w-full">
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
                  <Card key={index} className="p-6 hover:shadow-large transition-all duration-300 bg-card border-border">
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-6xl opacity-20">🔧</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-3">{product.description}</p>
                    <p className="text-sm text-primary font-semibold mb-4">{product.specs}</p>
                    <Button variant="outline" className="w-full group">
                      Más Detalles
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Products;
