import { Droplets, Filter, Gauge, Waves, Factory, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const Solutions = () => {
  const solutions = [
    {
      icon: Droplets,
      title: "Sistemas de Bombeo de Agua",
      description: "Bombas de alta eficiencia para todas las necesidades de distribución de agua",
    },
    {
      icon: Filter,
      title: "Filtración y Sedimentación",
      description: "Filtración avanzada de múltiples etapas para agua limpia",
    },
    {
      icon: Waves,
      title: "Sistemas de Ósmosis Inversa",
      description: "Tecnología RO de última generación para agua pura",
    },
    {
      icon: Gauge,
      title: "Ablandamiento de Agua",
      description: "Sistemas completos de ablandamiento y desalinización de agua",
    },
    {
      icon: Factory,
      title: "Plantas de Tratamiento",
      description: "Instalaciones de tratamiento de agua industrial y comercial",
    },
    {
      icon: Cpu,
      title: "Automatización y Control",
      description: "Paneles de control inteligentes e integración PLC",
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestras Soluciones
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluciones integrales de tratamiento de agua adaptadas a sus necesidades específicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <solution.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{solution.title}</h3>
              <p className="text-muted-foreground text-lg">{solution.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
