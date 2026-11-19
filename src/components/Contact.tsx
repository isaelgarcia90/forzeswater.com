import { Clock, MessageCircle, Phone, Mail, MapPin, Bot, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

const WHATSAPP_URL = `https://wa.me/525518070867?text=${encodeURIComponent(
  "Hola, quiero asesoría para un sistema de tratamiento de agua."
)}`;
const ADDRESS = "Campeche 1723-111, Chalma de Guadalupe, Gustavo A. Madero, 07210, CDMX";

const Contact = () => {
  const { trackContactClick } = useAnalytics();

  const details = [
    { icon: Phone, label: "Teléfono", value: "+52 55 1807 0867", href: "tel:+525518070867", type: "Phone" },
    { icon: Mail, label: "Correo", value: "forzeswater@outlook.com", href: "mailto:forzeswater@outlook.com", type: "Email" },
    {
      icon: MapPin,
      label: "Oficina",
      value: ADDRESS,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
      type: "Map",
    },
    { icon: Clock, label: "Horario", value: "Lunes a Viernes, 9:00 a 18:00 hrs", href: undefined, type: "Hours" },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Hablemos de tu proyecto</h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Elige el canal que prefieras. Te respondemos rápido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
          <Card className="p-8 bg-gradient-primary border-0 text-white flex flex-col">
            <div className="w-14 h-14 rounded-lg bg-white/15 flex items-center justify-center mb-5">
              <MessageCircle className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold mb-2">WhatsApp</h3>
            <p className="text-white/85 mb-6">Habla directo con un asesor técnico y envía fotos de tu equipo o tu agua.</p>
            <Button asChild size="lg" className="mt-auto bg-white text-primary hover:bg-white/90 shadow-large">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick("WhatsApp")}>
                Escribir por WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </Card>

          <Card className="p-8 bg-card border-border flex flex-col">
            <div className="w-14 h-14 rounded-lg bg-gradient-accent flex items-center justify-center mb-5">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Forzecito</h3>
            <p className="text-muted-foreground mb-6">Resuelve tus dudas al instante y te ayuda a encontrar el sistema correcto.</p>
            <Button
              size="lg"
              variant="outline"
              className="mt-auto"
              onClick={() => {
                trackContactClick("Forzecito");
                window.dispatchEvent(new Event("open-forzecito"));
              }}
            >
              Preguntar a Forzecito <ArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {details.map((d) => {
            const Tag = d.href ? "a" : "div";
            return (
            <Tag
              key={d.label}
              href={d.href}
              target={d.type === "Map" ? "_blank" : undefined}
              rel={d.type === "Map" ? "noopener noreferrer" : undefined}
              onClick={d.href ? () => trackContactClick(d.type) : undefined}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:shadow-large hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-primary flex items-center justify-center">
                <d.icon className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">{d.label}</p>
                <p className="text-sm font-semibold text-foreground break-words">{d.value}</p>
              </div>
            </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
