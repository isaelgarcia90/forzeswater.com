import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

const StickyCTABar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInContactSection, setIsInContactSection] = useState(false);
  const { trackCTAClick } = useAnalytics();

  useEffect(() => {
    // Check if user already dismissed in this session
    const dismissed = sessionStorage.getItem("stickyCTADismissed");
    if (dismissed) {
      setIsDismissed(true);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactSection = document.getElementById("contact");
      
      // Show after scrolling 300px
      setIsVisible(true);

      // Hide when in contact section
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        setIsInContactSection(contactRect.top < window.innerHeight && contactRect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("stickyCTADismissed", "true");
  };

  const scrollToContact = () => {
    trackCTAClick("Solicitar Cotización", "Sticky CTA Bar");
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppClick = () => {
    trackCTAClick("WhatsApp", "Sticky CTA Bar");
  };

  if (!isVisible || isDismissed || isInContactSection) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 transform transition-transform duration-300 ease-out animate-slide-up"
      role="complementary"
      aria-label="Barra de acción"
    >
      <div className="bg-card/95 backdrop-blur-md border-t border-border shadow-large">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Text - Hidden on very small screens */}
            <p className="hidden sm:block text-sm md:text-base font-medium text-foreground">
              ¿Necesitas una cotización para tu proyecto?
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none justify-center sm:justify-end">
              <Button
                onClick={scrollToContact}
                size="sm"
                className="bg-gradient-primary text-primary-foreground group"
              >
                <span className="hidden xs:inline">Solicitar Cotización</span>
                <span className="xs:hidden">Cotización</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <a
                href="https://wa.me/525518070867?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20tratamiento%20de%20agua."
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={handleWhatsAppClick}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-[#25D366] hover:border-[#20BA5A]"
                >
                  <MessageCircle className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </a>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar barra"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTABar;
