import { Award, Shield, Wrench, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const benefits = [
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Over a decade of expertise in water treatment solutions",
    },
    {
      icon: Shield,
      title: "Engineering-Grade Equipment",
      description: "Industrial-strength systems built to last",
    },
    {
      icon: Wrench,
      title: "Turnkey Installation",
      description: "Complete automation and installation services",
    },
    {
      icon: HeadphonesIcon,
      title: "Technical Support",
      description: "Maintenance and 24/7 support for your systems",
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About AquaTech Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading provider of comprehensive water treatment systems with a commitment to quality,
            innovation, and environmental sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <benefit.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
