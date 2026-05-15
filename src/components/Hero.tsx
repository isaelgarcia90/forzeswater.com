import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroImage from "@/assets/hero-water-treatment.webp";
import WaterDropsBackground from "./WaterDropsBackground";
import { useAnalytics } from "@/hooks/useAnalytics";

const Hero = () => {
  const { trackCTAClick } = useAnalytics();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuoteClick = () => {
    trackCTAClick("Solicitar Cotización", "Hero");
    scrollToSection("contact");
  };

  const handleProductsClick = () => {
    trackCTAClick("Explorar Productos", "Hero");
    scrollToSection("products");
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional water treatment facility"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>
      
      {/* Water Drops Animation */}
      <WaterDropsBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Soluciones Profesionales de Tratamiento de Agua
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed text-justify">
            Diseñamos, fabricamos e instalamos sistemas de tratamiento de agua de alta eficiencia, bombas,
            unidades de filtración y plantas de purificación para industria, comercio y sistemas residenciales,
            así como proyectos llave en mano, mantenimiento y venta de refacciones e insumos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={handleQuoteClick}
              className="bg-white text-primary hover:bg-white/90 shadow-large group"
            >
              Solicitar Cotización
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleProductsClick}
              className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Explorar Productos
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
