import { Clock, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

const WHATSAPP_URL = `https://wa.me/525518070867?text=${encodeURIComponent(
  "Hola, quiero asesoría para un sistema de tratamiento de agua."
)}`;
const WhatsAppLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
          <Card className="p-8 bg-card border-primary/40 shadow-medium flex flex-col">
            <div className="w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center mb-5">
              <WhatsAppLogo className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">WhatsApp</h3>
            <p className="text-muted-foreground mb-6">Habla directo con un asesor técnico y envía fotos de tu equipo o tu agua.</p>
            <Button asChild size="lg" className="mt-auto bg-gradient-primary text-white hover:opacity-90 shadow-large">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick("WhatsApp")}>
                Escribir por WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </Card>

          <Card className="p-8 bg-card border-border flex flex-col">
            <img src="/forzecito-icon-no-dot.webp" alt="Forzecito" className="w-14 h-14 rounded-full object-cover mb-5" />
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
