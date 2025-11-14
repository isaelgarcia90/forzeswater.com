import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Industrial Water Treatment Plant",
      location: "Manufacturing Complex, Industrial Zone",
      description: "Complete water treatment facility for a major manufacturing plant with 50,000 LPH capacity",
      technologies: ["RO System", "Pre-filtration", "PLC Control", "Storage Tanks"],
    },
    {
      title: "Municipal Pumping Station",
      location: "City Water Authority",
      description: "High-capacity pumping station upgrade with automation and remote monitoring",
      technologies: ["Submersible Pumps", "SCADA System", "Variable Frequency Drives"],
    },
    {
      title: "RO Purification System",
      location: "Commercial Building",
      description: "Drinking water purification system for a 20-story commercial tower",
      technologies: ["Multi-stage RO", "UV Disinfection", "Automated Backwash"],
    },
    {
      title: "Control Panel Integration",
      location: "Water Distribution Network",
      description: "Smart automation panels for city-wide water distribution control",
      technologies: ["PLC Systems", "IoT Monitoring", "Energy Optimization"],
    },
    {
      title: "Wastewater Treatment Facility",
      location: "Food Processing Plant",
      description: "Complete wastewater treatment with biological and chemical processing",
      technologies: ["Biological Treatment", "Chemical Dosing", "Sludge Management"],
    },
    {
      title: "Desalination Plant",
      location: "Coastal Region",
      description: "Seawater desalination facility producing 10,000 m³/day of potable water",
      technologies: ["Reverse Osmosis", "Pre-treatment", "Post-treatment", "Brine Disposal"],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Completed Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing our expertise in water treatment installations worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-large transition-all duration-300 bg-card border-border">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-7xl opacity-30">⚙️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="bg-primary/10 text-primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
