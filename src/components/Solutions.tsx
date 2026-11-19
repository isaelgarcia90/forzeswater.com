import { useState } from "react";
import {
  Waves,
  Factory,
  Filter,
  Droplets,
  Cpu,
  Package,
  FlaskConical,
  Ruler,
  Construction,
  Wrench,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WHATSAPP = "525518070867";

const steps = [
  { icon: FlaskConical, label: "Análisis" },
  { icon: Ruler, label: "Diseño" },
  { icon: Construction, label: "Instalación" },
  { icon: Wrench, label: "Mantenimiento" },
];

const systems = [
  {
    icon: Waves,
    title: "Ósmosis inversa y purificación",
    summary: "Agua pura para consumo, procesos y farmacéutica.",
    highlights: ["100 a 100,000 LPH", "Hasta 99.7% de rechazo de sales", "Limpieza CIP automática"],
    details:
      "Plantas completas con pretratamiento, bombas de alta presión en acero inoxidable, membranas de última generación e instrumentación digital.",
  },
  {
    icon: Factory,
    title: "Plantas de tratamiento (PTAR y potable)",
    summary: "Plantas llave en mano que cumplen la norma.",
    highlights: ["Potabilizadoras", "Aguas residuales e industriales", "Cumplimiento NOM"],
    details:
      "Pretratamiento, tratamiento primario, secundario y terciario, desinfección y manejo de lodos. Sistemas compactos o construidos en sitio.",
  },
  {
    icon: Filter,
    title: "Filtración y ablandamiento",
    summary: "Quitamos sarro, sólidos, cloro, olores y sabores.",
    highlights: ["Arena, carbón y microfiltración", "Suavizadores simples o dúplex", "Retrolavado automático"],
    details:
      "Sistemas multietapa de 1 a 500 m³/h y suavizadores por intercambio iónico con regeneración automática.",
  },
  {
    icon: Droplets,
    title: "Bombeo y presurización",
    summary: "Agua con presión constante, del hogar a la industria.",
    highlights: ["1 a 500 HP", "Sumergibles y centrífugas", "Variadores para ahorrar energía"],
    details:
      "Bombas de marcas reconocidas con protección contra marcha en seco, arranque suave y monitoreo remoto opcional.",
  },
  {
    icon: Cpu,
    title: "Automatización y control",
    summary: "Controla y monitorea tu sistema desde tu celular.",
    highlights: ["Tableros con PLC y pantalla táctil", "Alarmas por SMS o correo", "Integración SCADA"],
    details:
      "Tableros a la medida con marcas líderes (Siemens, Allen-Bradley, Schneider), cumpliendo NOM-001-SEDE.",
  },
  {
    icon: Package,
    title: "Refacciones e insumos",
    summary: "Todo para mantener tu equipo funcionando.",
    highlights: ["Membranas, resinas y cartuchos", "Válvulas, tanques y bombas", "Fleck, Clack, Pentair, Dow y más"],
    details:
      "Cartuchería, resinas, zeolita, carbón activado, arena filtrante, sal en pellet, dosificadoras, tarjetas electrónicas, tableros e insumos químicos.",
  },
];

const Solutions = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected !== null ? systems[selected] : null;

  const quote = (title: string) => {
    const text = encodeURIComponent(`Hola, me interesa una cotización de: ${title}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sistemas y proyectos
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige lo que necesitas. Nosotros nos encargamos de todo el proceso.
          </p>
        </div>

        <ol className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-14" aria-label="Qué incluye cada proyecto">
          {steps.map((step, i) => (
            <li key={step.label} className="flex items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground">
                <step.icon className="h-4 w-4 text-secondary" />
                {step.label}
              </span>
              {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden />}
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, index) => (
            <Card
              key={system.title}
              className="group p-6 bg-card border-border cursor-pointer transition-all duration-300 hover:shadow-large hover:-translate-y-1 flex flex-col"
              onClick={() => setSelected(index)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 shrink-0 rounded-lg bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <system.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">{system.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{system.summary}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                Ver detalles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Card>
          ))}
        </div>

        <Dialog open={current !== null} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl">
            {current && (
              <>
                <DialogHeader>
                  <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center mb-4">
                    <current.icon className="h-8 w-8 text-white" />
                  </div>
                  <DialogTitle className="text-2xl">{current.title}</DialogTitle>
                  <DialogDescription className="text-base">{current.summary}</DialogDescription>
                </DialogHeader>
                <ul className="space-y-2 mt-2">
                  {current.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground leading-relaxed">{current.details}</p>
                <p className="text-sm text-muted-foreground">
                  Incluye análisis, diseño, instalación y mantenimiento.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button className="bg-gradient-primary flex-1" onClick={() => quote(current.title)}>
                    <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelected(null);
                      window.dispatchEvent(new Event("open-forzecito"));
                    }}
                  >
                    Preguntar a Forzecito
                  </Button>
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
