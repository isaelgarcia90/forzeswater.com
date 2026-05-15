import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const PHONE_REGEX = /^[\d\s\-()]{6,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const COUNTRY_CODES = [
  { code: "+52", country: "MX", name: "México" },
  { code: "+1", country: "US", name: "Estados Unidos" },
  { code: "+1", country: "CA", name: "Canadá" },
  { code: "+54", country: "AR", name: "Argentina" },
  { code: "+591", country: "BO", name: "Bolivia" },
  { code: "+55", country: "BR", name: "Brasil" },
  { code: "+56", country: "CL", name: "Chile" },
  { code: "+57", country: "CO", name: "Colombia" },
  { code: "+506", country: "CR", name: "Costa Rica" },
  { code: "+53", country: "CU", name: "Cuba" },
  { code: "+593", country: "EC", name: "Ecuador" },
  { code: "+503", country: "SV", name: "El Salvador" },
  { code: "+34", country: "ES", name: "España" },
  { code: "+502", country: "GT", name: "Guatemala" },
  { code: "+504", country: "HN", name: "Honduras" },
  { code: "+505", country: "NI", name: "Nicaragua" },
  { code: "+507", country: "PA", name: "Panamá" },
  { code: "+595", country: "PY", name: "Paraguay" },
  { code: "+51", country: "PE", name: "Perú" },
  { code: "+1", country: "PR", name: "Puerto Rico" },
  { code: "+1", country: "DO", name: "Rep. Dominicana" },
  { code: "+598", country: "UY", name: "Uruguay" },
  { code: "+58", country: "VE", name: "Venezuela" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [showPopup, setShowPopup] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validate = (data: typeof formData) => {
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = "Campo obligatorio";
    if (!data.email.trim()) errs.email = "Campo obligatorio";
    else if (!EMAIL_REGEX.test(data.email.trim())) errs.email = "Correo electrónico no válido";
    if (!data.phone.trim()) errs.phone = "Campo obligatorio";
    else if (!PHONE_REGEX.test(data.phone.trim())) errs.phone = "Número telefónico no válido";
    if (!data.message.trim()) errs.message = "Campo obligatorio";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

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
        setAttempted(false);
        setErrors({});
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
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    // Always validate email in real-time as user types
    if (e.target.name === "email") {
      const val = e.target.value.trim();
      if (val && !EMAIL_REGEX.test(val)) {
        setErrors(prev => ({ ...prev, email: "Correo electrónico no válido" }));
      } else if (val) {
        setErrors(prev => { const { email, ...rest } = prev; return rest; });
      }
    }
    if (attempted) {
      const errs = validate(newData);
      setErrors(errs);
    }
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre {errors.name && <span className="text-red-500">*</span>}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full ${errors.name ? "border-red-500" : ""}`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Correo Electrónico {errors.email && <span className="text-red-500">*</span>}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full ${errors.email ? "border-red-500" : ""}`}
                    placeholder="tu.correo@ejemplo.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono {errors.phone && <span className="text-red-500">*</span>}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="+52 55 1807 0867"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensaje {errors.message && <span className="text-red-500">*</span>}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full ${errors.message ? "border-red-500" : ""}`}
                    placeholder="Cuéntanos sobre los requerimientos de tu proyecto..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
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
                  <a href="https://wa.me/525539487283" target="_blank" rel="noopener noreferrer nofollow" onClick={handleWhatsAppClick} className="hover:text-primary transition-colors">
                    WhatsApp: +52 55 3948 7283
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
                  <a href="mailto:forzeswater@gmail.com" onClick={handleEmailClick} className="hover:text-primary transition-colors">
                    forzeswater@gmail.com
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
