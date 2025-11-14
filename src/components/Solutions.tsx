import { Droplets, Filter, Gauge, Waves, Factory, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const Solutions = () => {
  const solutions = [
    {
      icon: Droplets,
      title: "Water Pumping Systems",
      description: "High-efficiency pumps for all water distribution needs",
    },
    {
      icon: Filter,
      title: "Filtration & Sedimentation",
      description: "Advanced multi-stage filtration for clean water",
    },
    {
      icon: Waves,
      title: "Reverse Osmosis Systems",
      description: "State-of-the-art RO technology for pure water",
    },
    {
      icon: Gauge,
      title: "Water Softening",
      description: "Complete water softening and desalination systems",
    },
    {
      icon: Factory,
      title: "Treatment Plants",
      description: "Industrial and commercial water treatment facilities",
    },
    {
      icon: Cpu,
      title: "Automation & Control",
      description: "Smart control panels and PLC integration",
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive water treatment solutions tailored to your specific needs
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
