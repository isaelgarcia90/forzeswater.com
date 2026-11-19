import { useState } from "react";
import { Award, Shield, Wrench, HeadphonesIcon, ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const benefits = [
  {
    icon: Award,
    title: "Experiencia comprobada",
    description: "Soluciones a la medida, del hogar a la industria.",
    details: [
      "Más de una década en tratamiento de agua.",
      "Experiencia en proyectos residenciales, comerciales e industriales.",
      "Cada sistema se adapta a las necesidades del proyecto.",
    ],
  },
  {
    icon: Shield,
    title: "Equipos confiables",
    description: "Componentes durables para un rendimiento consistente.",
    details: [
      "Equipos de grado ingenieril seleccionados por calidad y eficiencia.",
      "Sistemas preparados para condiciones de operación exigentes.",
      "Componentes de marcas reconocidas según cada aplicación.",
    ],
  },
  {
    icon: Wrench,
    title: "Proyecto llave en mano",
    description: "Diseño, instalación y puesta en marcha en un solo lugar.",
    details: [
      "Acompañamiento desde la evaluación inicial hasta la entrega.",
      "Instalación, puesta en marcha y capacitación para operar el sistema.",
      "Automatización y monitoreo según las necesidades del proyecto.",
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte que continúa",
    description: "Atención técnica y mantenimiento después de instalar.",
    details: [
      "Soporte técnico 24/7 para incidencias y consultas.",
      "Mantenimiento preventivo para prolongar la vida útil de los equipos.",
      "Acompañamiento para mantener la continuidad de tu operación.",
    ],
  },
];

const About = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);
  const currentBenefit = selectedBenefit !== null ? benefits[selectedBenefit] : null;

  return (
    <section id="about" className="py-20 sm:py-24 bg-muted">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
              Acerca de Forzes Water
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
              Ingeniería que simplifica tu proyecto de agua.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Combinamos experiencia técnica y atención cercana para que encuentres la solución correcta sin complicaciones.
            </p>

            <dl className="grid grid-cols-2 gap-5 mb-8">
              <div className="border-l-2 border-secondary pl-4">
                <dt className="text-3xl sm:text-4xl font-bold text-foreground">10+</dt>
                <dd className="text-sm text-muted-foreground mt-1">años de experiencia</dd>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <dt className="text-3xl sm:text-4xl font-bold text-foreground">24/7</dt>
                <dd className="text-sm text-muted-foreground mt-1">soporte técnico</dd>
              </div>
            </dl>

            <a
              href="#solutions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
            >
              Explora nuestros sistemas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="bg-card border-border overflow-hidden transition-all duration-300 hover:shadow-large hover:-translate-y-1">
                <button
                  type="button"
                  className="group w-full h-full p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  onClick={() => setSelectedBenefit(index)}
                  aria-label={`Conocer más sobre ${benefit.title}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5">
                    <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{benefit.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Conocer más
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </button>
              </Card>
            ))}
          </div>
        </div>

        <Dialog open={currentBenefit !== null} onOpenChange={() => setSelectedBenefit(null)}>
          <DialogContent className="max-w-xl">
            {currentBenefit && (
              <>
                <DialogHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <currentBenefit.icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <DialogTitle className="text-2xl">{currentBenefit.title}</DialogTitle>
                  <DialogDescription className="text-base pt-1">
                    {currentBenefit.description}
                  </DialogDescription>
                </DialogHeader>
                <ul className="space-y-3 mt-2">
                  {currentBenefit.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default About;
