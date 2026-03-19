import { Droplets, Filter, Gauge, Waves, Factory, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const Solutions = () => {
  const [selectedSolution, setSelectedSolution] = useState<number | null>(null);
  
  const solutions = [
    {
      icon: Droplets,
      title: "Sistemas de Bombeo de Agua",
      description: "Bombas de alta eficiencia para todas las necesidades de distribución de agua",
      details: "Ofrecemos una amplia gama de sistemas de bombeo incluyendo bombas sumergibles, centrífugas y presurizadoras de las marcas más reconocidas. Nuestras soluciones están diseñadas para aplicaciones residenciales, comerciales e industriales, con capacidades desde 1 HP hasta 500 HP. Todos los sistemas incluyen protección contra marcha en seco, arranque suave, variadores de frecuencia para ahorro de energía y monitoreo remoto opcional.",
    },
    {
      icon: Filter,
      title: "Filtración y Sedimentación",
      description: "Filtración avanzada de múltiples etapas para agua limpia",
      details: "Nuestros sistemas de filtración multi-etapa combinan sedimentación, filtración de arena, carbón activado y microfiltración para eliminar sólidos suspendidos, cloro, sabores, olores y contaminantes orgánicos. Diseñamos sistemas desde 1 hasta 500 m³/h con retrolavado automático programable, válvulas de control electrónicas y tanques en fibra de vidrio o acero inoxidable según la aplicación.",
    },
    {
      icon: Waves,
      title: "Sistemas de Ósmosis Inversa",
      description: "Tecnología RO de última generación para agua pura",
      details: "Suministramos e instalamos plantas de ósmosis inversa desde 100 litros por hora hasta 100,000 litros por hora. Utilizamos membranas de última generación con hasta 99.7% de rechazo de sales. Los sistemas incluyen pretratamiento completo, bombas de alta presión en acero inoxidable, instrumentación digital, limpieza CIP automática, y recuperación de energía en sistemas grandes. Ideal para agua potable, procesos industriales y aplicaciones farmacéuticas.",
    },
    {
      icon: Gauge,
      title: "Ablandamiento de Agua",
      description: "Sistemas completos de ablandamiento y desalinización de agua",
      details: "Diseñamos sistemas de ablandamiento por intercambio iónico para eliminar dureza (calcio y magnesio) del agua. Nuestros equipos utilizan resinas de alta calidad con regeneración automática eficiente. Disponibles en configuraciones simples, dúplex o triples para operación continua. Incluyen válvulas de control automáticas, tanques de salmuera, dosificadores de químicos y bypass de dureza residual programable. Capacidades desde 1 hasta 200 m³/h.",
    },
    {
      icon: Factory,
      title: "Plantas de Tratamiento",
      description: "Instalaciones de tratamiento de agua industrial y comercial",
      details: "Diseñamos, fabricamos e instalamos plantas de tratamiento completas llave en mano incluyendo: plantas potabilizadoras, tratamiento de aguas residuales (sistemas aerobios y anaerobios), tratamiento de efluentes industriales, y sistemas de reciclaje de agua. Cada planta incluye todos los procesos necesarios: pretratamiento, tratamiento primario, secundario y terciario, desinfección, y manejo de lodos. Cumplimos con todas las normas mexicanas (NOM) y estándares internacionales.",
    },
    {
      icon: Cpu,
      title: "Automatización y Control",
      description: "Paneles de control inteligentes e integración PLC",
      details: "Fabricamos tableros de control y automatización personalizados con PLC de marcas líderes (Siemens, Allen-Bradley, Schneider). Incluyen pantallas HMI touch screen, variadores de frecuencia, arrancadores suaves, protecciones eléctricas y comunicación industrial. Ofrecemos integración con SCADA, monitoreo remoto vía internet, registro de datos históricos, alarmas por SMS/email y control desde smartphone. Todos los tableros cumplen con NOM-001-SEDE y certificaciones UL.",
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
              className="p-8 hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-border group cursor-pointer"
              onClick={() => setSelectedSolution(index)}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <solution.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{solution.title}</h3>
              <p className="text-muted-foreground text-lg text-justify">{solution.description}</p>
            </Card>
          ))}
        </div>

        <Dialog open={selectedSolution !== null} onOpenChange={() => setSelectedSolution(null)}>
          <DialogContent className="max-w-2xl">
            {selectedSolution !== null && (
              <>
                <DialogHeader>
                  <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center mb-4">
                    {(() => {
                      const SolutionIcon = solutions[selectedSolution].icon;
                      return <SolutionIcon className="h-8 w-8 text-white" />;
                    })()}
                  </div>
                  <DialogTitle className="text-2xl">{solutions[selectedSolution].title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {solutions[selectedSolution].description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {solutions[selectedSolution].details}
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

export default Solutions;
