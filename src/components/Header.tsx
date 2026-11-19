import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LogoDialog from "@/components/LogoDialog";
import { useAnalytics } from "@/hooks/useAnalytics";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { trackCTAClick, trackNavigation } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const hero = document.getElementById("hero");
      setInHero(hero ? hero.getBoundingClientRect().bottom > 80 : false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, label: string) => {
    trackNavigation(label);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleQuoteClick = () => {
    trackCTAClick("Solicitar Cotización", "Header");
    scrollToSection("contact", "Contacto");
  };

  const navItems = [
    { label: "Inicio", id: "hero" },
    { label: "Nosotros", id: "about" },
    { label: "Sistemas", id: "solutions" },
    { label: "Productos", id: "products" },
    { label: "Catálogo", id: "catalog" },
    { label: "FAQ", id: "faq" },
    { label: "Contacto", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        inHero ? "bg-background/40 backdrop-blur-md" : "bg-background/95 backdrop-blur-md shadow-medium"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LogoDialog />
          <span className={`text-xl font-bold transition-colors ${
            "text-foreground"
          }`}>Forzes Water</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id, item.label)}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                "text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Button onClick={handleQuoteClick} className="bg-gradient-primary">
            Solicitar Cotización
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${
            "text-foreground"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id, item.label)}
                className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={handleQuoteClick} className="bg-gradient-primary w-full">
              Solicitar Cotización
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
