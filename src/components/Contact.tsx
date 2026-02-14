import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [showPopup, setShowPopup] = useState(false);
  const { trackFormSubmit, trackContactClick } = useAnalytics();

  useEffect(() => {
    if (status === "success" || status === "error") {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        if (status === "success") {
          setStatus("idle");
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xblnyzay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nombre: formData.name,
          "Correo Electrónico": formData.email,
          Teléfono: formData.phone,
          Mensaje: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        trackFormSubmit("Contact Form", true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        trackFormSubmit("Contact Form", false);
      }
    } catch {
      setStatus("error");
      trackFormSubmit("Contact Form", false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneClick = () => {
    trackContactClick("Phone");
  };

  const handleWhatsAppClick = () => {
    trackContactClick("WhatsApp");
  };

  const handleEmailClick = () => {
    trackContactClick("Email");
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contáctanos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solicita una cotización o contáctanos para cualquier consulta sobre nuestras soluciones de tratamiento de agua
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="p-8 bg-card border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nombre <span className="text-red-500">*</span></label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico <span className="text-red-500">*</span></label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="tu.correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Teléfono <span className="text-red-500">*</span></label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="+52 55 1807 0867"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mensaje <span className="text-red-500">*</span></label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full"
                    placeholder="Cuéntanos sobre los requerimientos de tu proyecto..."
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary"
                  disabled={status === "loading"}
                  aria-busy={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-border flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Teléfono</h3>
                <p className="text-muted-foreground">
                  <a href="https://wa.me/525518070867" target="_blank" rel="noopener noreferrer nofollow" onClick={handleWhatsAppClick} className="hover:text-primary transition-colors">
                    WhatsApp: +52 55 1807 0867
                  </a>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Correo Electrónico</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:forzeswater@outlook.com" onClick={handleEmailClick} className="hover:text-primary transition-colors">
                    forzeswater@outlook.com
                  </a>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Dirección</h3>
                <p className="text-muted-foreground">Forzes Water</p>
                <p className="text-muted-foreground">Campeche 1723-111, Chalma de Guadalupe</p>
                <p className="text-muted-foreground">Gustavo A. Madero, 07210</p>
                <p className="text-muted-foreground">Ciudad de México, CDMX</p>
              </div>
            </Card>

            <div className="h-64 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d234.9787687500776!2d-99.15236263258704!3d19.55619245314375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1764695401983!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Forzes Water"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Popup */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
          role="alert"
          aria-live="assertive"
        >
          <div className={`
            mx-4 max-w-md w-full p-6 rounded-xl shadow-2xl animate-scale-in
            ${status === "success" 
              ? "bg-gradient-to-br from-green-500 to-emerald-600" 
              : "bg-gradient-to-br from-red-500 to-rose-600"
            }
          `}>
            <div className="flex flex-col items-center text-center text-white">
              {status === "success" ? (
                <CheckCircle className="h-16 w-16 mb-4 animate-bounce" />
              ) : (
                <XCircle className="h-16 w-16 mb-4 animate-bounce" />
              )}
              <h3 className="text-xl font-bold mb-2">
                {status === "success" ? "¡Excelente!" : "¡Lo sentimos!"}
              </h3>
              <p className="text-white/90">
                {status === "success"
                  ? "Tu mensaje ha sido enviado satisfactoriamente. Nos pondremos en contacto a la brevedad."
                  : "Algo salió mal. Por favor intenta de nuevo más tarde. Si el problema persiste contacta directamente a soporte técnico."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
