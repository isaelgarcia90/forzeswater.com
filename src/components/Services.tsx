import { Ruler, Construction, Calendar, Phone, FlaskConical, Settings, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  const services = [
    {
      icon: Package,
      title: "Venta de Refacciones e Insumos",
      description: "Refacciones, consumibles e insumos para sistemas de tratamiento de agua con las mejores marcas del mercado",
      details: "Contamos con un extenso catálogo de refacciones y consumibles para mantener sus sistemas operando al máximo rendimiento. Nuestra oferta incluye: cartuchería, membranas para ósmosis inversa, refacciones para cualquier tipo de válvula, tarjetas electrónicas, pistones, sellos, resina catiónica, resina para suavizador, resina aniónica, tanques en fibra de vidrio, tanques en acero al carbón, tanques en acero inoxidable, zeolita, carbón activado, arena filtrante, sal en pellet, dosificadoras, rotámetros, manómetros, refacciones para cualquier tipo de bomba, bombas superficiales, bombas sumergibles, bombas para R.O., tableros de control e insumos químicos para plantas. Marcas que manejamos: Fleck, Clack, Pentair, Dow, Aquatrol, Hydronix, Canature, Aquex, Hydranautics, Purolite y America Water, entre otras.",
    },
    {
      icon: Ruler,
      title: "Ingeniería y Diseño",
      description: "Diseño personalizado de sistemas de tratamiento de agua e ingeniería adaptada a sus requisitos",
      details: "Nuestro equipo de ingenieros especializados trabaja en estrecha colaboración con usted para diseñar sistemas de tratamiento de agua que se ajusten perfectamente a sus necesidades específicas. Realizamos estudios de viabilidad, análisis de costo-beneficio y creamos soluciones eficientes que optimizan el uso de recursos. Incluye diseño CAD 3D, cálculos hidráulicos, selección de equipos, y documentación técnica completa.",
    },
    {
      icon: Construction,
      title: "Instalación",
      description: "Servicios de instalación profesional con técnicos certificados y garantía de calidad",
      details: "Contamos con un equipo de técnicos certificados y capacitados que garantizan una instalación profesional de todos nuestros sistemas. Manejamos todo el proceso desde la preparación del sitio hasta las pruebas finales y la puesta en marcha. Todos nuestros servicios de instalación incluyen garantía de calidad, documentación de instalación, capacitación del personal y certificados de cumplimiento normativo.",
    },
    {
      icon: Calendar,
      title: "Mantenimiento Preventivo",
      description: "Programas de mantenimiento regular para garantizar el rendimiento óptimo y la longevidad del sistema",
      details: "Ofrecemos contratos de mantenimiento preventivo personalizados que incluyen inspecciones programadas, limpieza de equipos, reemplazo de consumibles, calibración de instrumentos y análisis de rendimiento. Nuestros programas de mantenimiento están diseñados para maximizar la vida útil de sus equipos, prevenir fallas costosas y mantener la eficiencia operativa al más alto nivel.",
    },
    {
      icon: Phone,
      title: "Soporte Técnico",
      description: "Soporte técnico en sitio 24/7 y servicios de respuesta de emergencia",
      details: "Nuestro equipo de soporte técnico está disponible las 24 horas del día, los 7 días de la semana para atender cualquier emergencia o consulta técnica. Ofrecemos diagnóstico remoto, soporte telefónico inmediato, servicio en sitio de emergencia, y acceso a un inventario de refacciones críticas. Contamos con tiempos de respuesta garantizados y técnicos especializados en todas nuestras líneas de productos.",
    },
    {
      icon: FlaskConical,
      title: "Análisis de Agua",
      description: "Pruebas exhaustivas de calidad del agua y servicios de consultoría",
      details: "Nuestro laboratorio certificado realiza análisis completos de calidad de agua incluyendo parámetros físicos, químicos y microbiológicos. Ofrecemos pruebas de potabilidad, análisis industrial, estudios de corrosión, monitoreo de contaminantes y evaluaciones de cumplimiento normativo. Cada análisis incluye un reporte detallado con recomendaciones técnicas y soluciones de tratamiento específicas.",
    },
    {
      icon: Settings,
      title: "Fabricación Personalizada",
      description: "Equipos de tratamiento de agua personalizados fabricados según sus especificaciones",
      details: "Diseñamos y fabricamos equipos de tratamiento de agua completamente personalizados para aplicaciones especiales. Nuestras instalaciones cuentan con tecnología de fabricación de última generación y cumplimos con todos los estándares internacionales de calidad. Fabricamos desde pequeños sistemas residenciales hasta grandes plantas industriales, con materiales de primera calidad como acero inoxidable 304/316, fibra de vidrio y polímeros especializados.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Servicios completos de tratamiento de agua desde el diseño hasta el mantenimiento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-border cursor-pointer"
              onClick={() => setSelectedService(index)}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed text-justify">{service.description}</p>
            </Card>
          ))}
        </div>

        <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-2xl">
            {selectedService !== null && (
              <>
                <DialogHeader>
                  <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                    {(() => {
                      const ServiceIcon = services[selectedService].icon;
                      return <ServiceIcon className="h-8 w-8 text-white" />;
                    })()}
                  </div>
                  <DialogTitle className="text-2xl">{services[selectedService].title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {services[selectedService].description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    {services[selectedService].details}
                  </p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Services;
