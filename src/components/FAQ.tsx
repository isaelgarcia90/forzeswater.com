import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

const faqItems = [
  {
    question: "¿Cuánto tiempo toma la instalación?",
    answer:
      "En proyectos residenciales suele tomar de 1 a 3 días; en industriales, de 1 a 4 semanas. Confirmamos el cronograma al cotizar.",
  },
  {
    question: "¿Ofrecen mantenimiento después de la instalación?",
    answer:
      "Sí. Damos mantenimiento preventivo y correctivo, revisiones, cambio de consumibles y análisis del agua según las necesidades de tu sistema.",
  },
  {
    question: "¿Qué garantía tienen los equipos?",
    answer:
      "La garantía de fábrica varía de 1 a 5 años según el producto. La instalación y mano de obra cuentan con 12 meses de garantía.",
  },
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Escríbenos por WhatsApp o a Forzecito. Cuéntanos el uso, la capacidad que necesitas y las características de tu agua para orientarte.",
  },
  {
    question: "¿Realizan análisis de agua gratuitos?",
    answer:
      "Sí, el análisis básico no tiene costo dentro de la cotización de proyectos mayores. Los resultados nos ayudan a definir el tratamiento adecuado.",
  },
  {
    question: "¿Dónde tienen cobertura?",
    answer:
      "Atendemos proyectos en toda la República Mexicana, principalmente en CDMX y zona metropolitana. Para otras ubicaciones, confirmamos la cobertura al revisar tu proyecto.",
  },
];

const FAQ = () => {
  const { trackModalOpen, trackCTAClick } = useAnalytics();

  const handleAccordionChange = (value: string) => {
    if (value) {
      trackModalOpen(`FAQ: ${value}`);
    }
  };

  const openForzecito = (question: string) => {
    trackCTAClick("Preguntar a Forzecito", `FAQ: ${question}`);
    window.dispatchEvent(new Event("open-forzecito"));
  };

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-5">
            <HelpCircle className="h-4 w-4" />
            Respuestas rápidas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Lo esencial antes de elegir tu sistema. Para revisar tu caso, pregunta a Forzecito.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            onValueChange={handleAccordionChange}
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-5 sm:px-6 data-[state=open]:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  <span className="font-semibold pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  <p>{item.answer}</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-3 h-auto px-0"
                    onClick={() => openForzecito(item.question)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Preguntar a Forzecito
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">¿Tienes otra duda?</p>
          <Button onClick={() => openForzecito("Duda adicional")}>
            <MessageCircle className="h-4 w-4" />
            Hablar con Forzecito
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
