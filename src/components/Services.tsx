import { Ruler, Construction, Calendar, Phone, FlaskConical, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Ruler,
      title: "Ingeniería y Diseño",
      description: "Diseño personalizado de sistemas de tratamiento de agua e ingeniería adaptada a sus requisitos",
    },
    {
      icon: Construction,
      title: "Instalación",
      description: "Servicios de instalación profesional con técnicos certificados y garantía de calidad",
    },
    {
      icon: Calendar,
      title: "Mantenimiento Preventivo",
      description: "Programas de mantenimiento regular para garantizar el rendimiento óptimo y la longevidad del sistema",
    },
    {
      icon: Phone,
      title: "Soporte Técnico",
      description: "Soporte técnico en sitio 24/7 y servicios de respuesta de emergencia",
    },
    {
      icon: FlaskConical,
      title: "Análisis de Agua",
      description: "Pruebas exhaustivas de calidad del agua y servicios de consultoría",
    },
    {
      icon: Settings,
      title: "Fabricación Personalizada",
      description: "Equipos de tratamiento de agua personalizados fabricados según sus especificaciones",
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
              className="p-8 hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
