import { Ruler, Construction, Calendar, Phone, FlaskConical, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Ruler,
      title: "Engineering & Design",
      description: "Custom water treatment system design and engineering services tailored to your requirements",
    },
    {
      icon: Construction,
      title: "Installation",
      description: "Professional installation services with certified technicians and quality assurance",
    },
    {
      icon: Calendar,
      title: "Preventive Maintenance",
      description: "Regular maintenance programs to ensure optimal system performance and longevity",
    },
    {
      icon: Phone,
      title: "Technical Support",
      description: "24/7 on-site technical support and emergency response services",
    },
    {
      icon: FlaskConical,
      title: "Water Analysis",
      description: "Comprehensive water quality testing and consulting services",
    },
    {
      icon: Settings,
      title: "Custom Manufacturing",
      description: "Bespoke water treatment equipment manufactured to your specifications",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete water treatment services from design to maintenance
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
