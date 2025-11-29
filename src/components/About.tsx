import { useState } from "react";
import { Award, Shield, Wrench, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const About = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);

  const benefits = [
    {
      icon: Award,
      title: "Más de 10 Años de Experiencia",
      description: "Más de una década de experiencia en soluciones de tratamiento de agua",
      detailedDescription: "Con más de 10 años en la industria del tratamiento de agua, hemos perfeccionado nuestras técnicas y métodos para ofrecer las mejores soluciones a nuestros clientes. Nuestra experiencia abarca desde pequeñas instalaciones residenciales hasta grandes proyectos industriales, garantizando la calidad del agua en cada etapa del proceso. Hemos trabajado con cientos de clientes satisfechos, desarrollando soluciones personalizadas que se adaptan a las necesidades específicas de cada proyecto.",
    },
    {
      icon: Shield,
      title: "Equipos de Grado Ingenieril",
      description: "Sistemas de resistencia industrial construidos para durar",
      detailedDescription: "Utilizamos únicamente equipos de grado ingenieril fabricados con los más altos estándares de calidad. Nuestros sistemas están diseñados y construidos para soportar las condiciones más exigentes, garantizando una vida útil prolongada y un rendimiento óptimo. Cada componente es cuidadosamente seleccionado y probado para asegurar la máxima eficiencia y confiabilidad. Trabajamos con las marcas más reconocidas del mercado para ofrecer equipos que realmente marcan la diferencia.",
    },
    {
      icon: Wrench,
      title: "Instalación Llave en Mano",
      description: "Automatización completa y servicios de instalación",
      detailedDescription: "Ofrecemos un servicio completo de instalación llave en mano que incluye diseño, instalación, puesta en marcha y capacitación. Nuestro equipo de ingenieros y técnicos especializados se encarga de cada detalle del proyecto, desde la evaluación inicial hasta la entrega final. Implementamos sistemas de automatización avanzados que permiten el monitoreo y control remoto de sus equipos, optimizando el consumo de energía y recursos mientras maximizan la eficiencia operativa.",
    },
    {
      icon: HeadphonesIcon,
      title: "Soporte Técnico",
      description: "Mantenimiento y soporte 24/7 para sus sistemas",
      detailedDescription: "Nuestro compromiso no termina con la instalación. Ofrecemos soporte técnico 24/7 para garantizar el funcionamiento continuo de sus sistemas de tratamiento de agua. Contamos con un equipo de técnicos especializados disponibles para responder a cualquier emergencia o consulta. Además, proporcionamos programas de mantenimiento preventivo diseñados para maximizar la vida útil de sus equipos y minimizar el tiempo de inactividad. Su tranquilidad es nuestra prioridad.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Acerca de Forses Water
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proveedor líder de sistemas integrales de tratamiento de agua con un compromiso con la calidad,
            innovación y sostenibilidad ambiental.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-border cursor-pointer"
              onClick={() => setSelectedBenefit(index)}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <benefit.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>

        <Dialog open={selectedBenefit !== null} onOpenChange={() => setSelectedBenefit(null)}>
          <DialogContent className="max-w-2xl">
            {selectedBenefit !== null && (
              <>
                <DialogHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    {(() => {
                      const Icon = benefits[selectedBenefit].icon;
                      return <Icon className="h-7 w-7 text-white" />;
                    })()}
                  </div>
                  <DialogTitle className="text-2xl">{benefits[selectedBenefit].title}</DialogTitle>
                  <DialogDescription className="text-base leading-relaxed pt-4">
                    {benefits[selectedBenefit].detailedDescription}
                  </DialogDescription>
                </DialogHeader>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default About;
