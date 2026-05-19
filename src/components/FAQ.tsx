import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

const faqItems = [
  {
    question: "¿Qué tipos de sistemas de tratamiento de agua ofrecen?",
    answer:
      "Ofrecemos una amplia gama de sistemas incluyendo plantas de ósmosis inversa, filtros de arena y carbón activado, sistemas de ablandamiento, plantas potabilizadoras, tratamiento de aguas residuales, y sistemas de purificación para aplicaciones industriales, comerciales y residenciales.",
  },
  {
    question: "¿Cuánto tiempo toma la instalación de un sistema?",
    answer:
      "El tiempo de instalación varía según el tipo y tamaño del sistema. Los sistemas residenciales pueden instalarse en 1-3 días, mientras que los sistemas industriales pueden tomar de 1-4 semanas. Durante la cotización, proporcionamos un cronograma detallado del proyecto.",
  },
  {
    question: "¿Ofrecen mantenimiento después de la instalación?",
    answer:
      "Sí, ofrecemos planes de mantenimiento preventivo y correctivo para todos nuestros sistemas. Incluimos revisiones periódicas, reemplazo de consumibles, análisis de calidad de agua, y soporte técnico 24/7 para emergencias.",
  },
  {
    question: "¿Qué garantía tienen sus equipos?",
    answer:
      "Todos nuestros equipos cuentan con garantía de fábrica que varía de 1 a 5 años según el producto. Además, ofrecemos garantía extendida en nuestros servicios de instalación y mano de obra por 12 meses.",
  },
  {
    question: "¿Trabajan con proyectos residenciales e industriales?",
    answer:
      "Sí, atendemos proyectos de todos los tamaños. Desde sistemas de filtración para hogares hasta plantas completas de tratamiento para industrias, hoteles, hospitales, plantas de alimentos y bebidas, y municipios.",
  },
  {
    question: "¿Cómo puedo solicitar una cotización?",
    answer:
      "Puedes solicitar una cotización de tres formas: llenando el formulario de contacto en nuestra página, llamando al +52 55 1807 0867, o enviándonos un mensaje por WhatsApp. Responderemos en menos de 24 horas hábiles.",
  },
  {
    question: "¿Realizan análisis de agua gratuitos?",
    answer:
      "Sí, ofrecemos análisis básicos de agua sin costo como parte de nuestro proceso de cotización para proyectos mayores. Esto nos permite recomendar la solución más adecuada para las características específicas de tu agua.",
  },
  {
    question: "¿Cuáles son sus áreas de cobertura?",
    answer:
      "Tenemos cobertura en toda la República Mexicana, con presencia principal en la Zona Metropolitana del Valle de México. Para proyectos fuera de CDMX, contamos con una red de instaladores certificados.",
  },
];

const FAQ = () => {
  const { trackModalOpen } = useAnalytics();

  const handleAccordionChange = (value: string) => {
    if (value) {
      trackModalOpen(`FAQ: ${value}`);
    }
  };

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y productos de tratamiento de agua
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            onValueChange={handleAccordionChange}
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                  <span className="font-semibold pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-justify">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA after FAQ */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿No encontraste la respuesta que buscabas?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-primary font-medium hover:underline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contáctanos directamente
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
