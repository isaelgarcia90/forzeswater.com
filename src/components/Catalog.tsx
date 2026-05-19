import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, CheckCircle, XCircle, Loader2, MessageCircle, Phone as PhoneIcon, FileSearch, Droplets, FlaskConical } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { COUNTRY_CODES } from "@/lib/country-codes";
import { supabase } from "@/integrations/supabase/client";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[\d\s\-()]{6,20}$/;

type CatalogKey = "sbo" | "piq" | "tda";

const CATALOGS: Record<CatalogKey, {
  key: CatalogKey;
  title: string;
  subtitle: string;
  pages: string;
  edition: string;
  pdf: string;
  filename: string;
  icon: typeof FileText;
  gradient: string;
  lines: string[];
}> = {
  sbo: {
    key: "sbo",
    title: "Lista de Precios SBO",
    subtitle: "Sistemas de Bombeo · Edición 2026",
    pages: "40 páginas",
    edition: "2026",
    pdf: "/lista-precios-forzes-water-2026.pdf",
    filename: "Lista-Precios-SBO-Forzes-Water-2026.pdf",
    icon: FileText,
    gradient: "bg-gradient-primary",
    lines: [
      "Tanques Presurizados",
      "Línea DAB",
      "Línea Pentair",
      "Línea Leo",
      "Línea Aquex",
      "Línea Arenka",
      "Centrífugas Comerciales",
      "Bombas Solares",
      "Aplicaciones Específicas",
      "Automatización Eléctrica",
      "Accesorios",
    ],
  },
  piq: {
    key: "piq",
    title: "Lista de Precios PIQ",
    subtitle: "Piscinas y Químicos · Edición 2025",
    pages: "+50 páginas",
    edition: "2025",
    pdf: "/lista-precios-piscinas-quimicos-2026.pdf",
    filename: "Lista-Precios-PIQ-Forzes-Water.pdf",
    icon: Droplets,
    gradient: "bg-gradient-accent",
    lines: [
      "Filtración",
      "Motobombas",
      "Calentamiento",
      "Empotrables",
      "Iluminación",
      "Automatización",
      "Hidromasaje",
      "Mantenimiento",
      "Fuentes y Cascadas",
      "Seguridad",
      "Recubrimientos",
      "Generadores de Vapor y Saunas",
      "Válvulas y Accesorios PVC",
      "Productos Químicos",
      "Equipos Comerciales",
      "Refacciones",
    ],
  },
  tda: {
    key: "tda",
    title: "Lista de Precios TDA",
    subtitle: "Tratamiento de Agua · Edición 2025",
    pages: "+50 páginas",
    edition: "2025",
    pdf: "/lista-precios-tratamiento-agua-2026.pdf",
    filename: "Lista-Precios-TDA-Forzes-Water.pdf",
    icon: FlaskConical,
    gradient: "bg-gradient-primary",
    lines: [
      "Tanques y Componentes",
      "Materiales Filtrantes y Acondicionadores",
      "Válvulas y Controles",
      "Equipos Especializados para OEM",
      "Equipos de Filtración y Suavización",
      "Portacartuchos y Cartuchos",
      "Food Service",
      "Línea Everpure",
      "Ósmosis Inversa y Ultrafiltración",
      "Equipos Desinfectantes",
      "Refacciones y Accesorios",
    ],
  },
};

const Catalog = () => {
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogKey>("sbo");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    countryCode: "+52",
    phone: "",
    lineOfInterest: "Todas",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [showPopup, setShowPopup] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { trackEvent, trackContactClick } = useAnalytics();

  const current = CATALOGS[selectedCatalog];

  // Reset line of interest when switching catalog
  useEffect(() => {
    setFormData(prev => ({ ...prev, lineOfInterest: "Todas" }));
  }, [selectedCatalog]);

  useEffect(() => {
    if (status === "success" || status === "error") {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        if (status === "success") setStatus("idle");
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validate = (data: typeof formData) => {
    const errs: Record<string, string> = {};
    if (!data.name.trim()) errs.name = "Campo obligatorio";
    if (!data.email.trim()) errs.email = "Campo obligatorio";
    else if (!EMAIL_REGEX.test(data.email.trim())) errs.email = "Correo electrónico no válido";
    if (data.phone.trim() && !PHONE_REGEX.test(data.phone.trim())) {
      errs.phone = "Número telefónico no válido";
    }
    return errs;
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = current.pdf;
    link.download = current.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackEvent({
      category: "cta_click",
      action: "catalog_download_completed",
      label: `${current.key.toUpperCase()} - ${formData.lineOfInterest}`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    const fullPhone = formData.phone.trim() ? `${formData.countryCode} ${formData.phone}`.trim() : "";
    const tagged = `[${current.key.toUpperCase()}] ${formData.lineOfInterest}`;

    try {
      const { error: dbError } = await supabase.from("catalog_downloads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim() || null,
        phone: fullPhone || null,
        line_of_interest: tagged,
      });

      await fetch("https://formspree.io/f/xblnyzay", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nueva descarga de catálogo ${current.key.toUpperCase()} · Forzes Water`,
          Tipo: `Descarga de Catálogo ${current.key.toUpperCase()}`,
          Catálogo: current.title,
          Nombre: formData.name,
          "Correo Electrónico": formData.email,
          Empresa: formData.company || "(no proporcionada)",
          Teléfono: fullPhone || "(no proporcionado)",
          "Línea de Interés": formData.lineOfInterest,
        }),
      }).catch(() => { /* non-blocking */ });

      if (dbError) throw dbError;

      setStatus("success");
      trackEvent({
        category: "form_submit",
        action: "catalog_download_requested",
        label: tagged,
      });
      triggerDownload();
      setFormData({ name: "", email: "", company: "", countryCode: "+52", phone: "", lineOfInterest: "Todas" });
      setAttempted(false);
      setErrors({});
    } catch {
      setStatus("error");
      trackEvent({
        category: "form_submit",
        action: "catalog_download_error",
        label: `Catalog Download ${current.key.toUpperCase()}`,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    if (e.target.name === "email") {
      const val = e.target.value.trim();
      if (val && !EMAIL_REGEX.test(val)) {
        setErrors(prev => ({ ...prev, email: "Correo electrónico no válido" }));
      } else if (val) {
        setErrors(prev => { const { email, ...rest } = prev; return rest; });
      }
    }
    if (attempted) setErrors(validate(newData));
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    trackEvent({ category: "cta_click", action: "click", label: "Catalog → Cotización" });
  };

  return (
    <section id="catalog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Catálogos y Listas de Precios
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Selecciona el catálogo que deseas descargar. Contamos con líneas especializadas para sistemas de bombeo y para piscinas y químicos.
          </p>
        </div>

        {/* Catalog selector cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          {(Object.values(CATALOGS) as typeof CATALOGS[CatalogKey][]).map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCatalog === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setSelectedCatalog(cat.key);
                  trackEvent({ category: "cta_click", action: "catalog_select", label: cat.key.toUpperCase() });
                }}
                className={`text-left rounded-xl border-2 p-6 transition-all duration-300 ${
                  isActive
                    ? "border-primary shadow-large bg-card -translate-y-1"
                    : "border-border bg-card hover:border-primary/40 hover:shadow-medium"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 rounded-lg ${cat.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{cat.subtitle}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {cat.pages}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">
                        PDF · MXN + IVA
                      </span>
                    </div>
                  </div>
                </div>
                {isActive && (
                  <div className="mt-4 text-xs font-semibold text-primary flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1.5" /> Catálogo seleccionado
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Catálogo preview detalle */}
          <Card className="p-8 bg-card border-border hover:shadow-large transition-all duration-300">
            <div className="flex items-start space-x-4 mb-6">
              <div className={`w-16 h-16 rounded-xl ${current.gradient} flex items-center justify-center flex-shrink-0`}>
                <current.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {current.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {current.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {current.pages}
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                    PDF · Español
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-accent-foreground">
                    Precios en MXN + IVA
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="font-semibold text-foreground mb-3">Líneas incluidas:</h4>
              <div className="flex flex-wrap gap-2">
                {current.lines.map((line) => (
                  <span
                    key={line}
                    className="text-xs px-3 py-1.5 rounded-md bg-muted text-muted-foreground border border-border"
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Nota importante:</strong> Los precios mostrados son de lista. 
                Para obtener tu descuento personalizado y condiciones especiales, solicita una cotización 
                directa con nuestro equipo de ventas.
              </p>
            </div>
          </Card>

          {/* Form */}
          <Card className="p-8 bg-card border-border">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Descarga el catálogo
              </h3>
              <p className="text-sm text-muted-foreground">
                Completa tus datos para acceder a <strong className="text-foreground">{current.title}</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre completo {errors.name && <span className="text-red-500">*</span>}
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                  placeholder="Tu nombre completo"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Correo electrónico {errors.email && <span className="text-red-500">*</span>}
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                  placeholder="tu.correo@empresa.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Empresa <span className="text-muted-foreground font-normal">(opcional)</span>
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teléfono <span className="text-muted-foreground font-normal">(opcional)</span>
                </label>
                <div className="flex gap-2">
                  <Select
                    value={`${formData.countryCode}-${COUNTRY_CODES.find(c => c.code === formData.countryCode)?.country ?? "MX"}`}
                    onValueChange={(val) => {
                      const code = val.split("-")[0];
                      setFormData(prev => ({ ...prev, countryCode: code }));
                    }}
                  >
                    <SelectTrigger className="w-[170px] flex-shrink-0 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 bg-card z-50">
                      {COUNTRY_CODES.map((c) => (
                        <SelectItem key={`${c.code}-${c.country}`} value={`${c.code}-${c.country}`} className="text-xs">
                          {c.name} ({c.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="55 1807 0867"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Línea de interés
                </label>
                <Select
                  value={formData.lineOfInterest}
                  onValueChange={(val) => setFormData(prev => ({ ...prev, lineOfInterest: val }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card z-50 max-h-72">
                    <SelectItem value="Todas">Todas las líneas</SelectItem>
                    {current.lines.map((line) => (
                      <SelectItem key={line} value={line}>{line}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    Procesando...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar {current.title}
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Al descargar aceptas que un asesor te contacte para ofrecerte 
                descuentos y cotizaciones personalizadas.
              </p>
            </form>
          </Card>
        </div>

        {/* CTAs alternativos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="p-6 bg-card border-border hover:shadow-large hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={scrollToContact}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <FileSearch className="h-6 w-6 text-white" />
            </div>
            <h4 className="font-bold text-lg text-foreground mb-2">Solicitar cotización</h4>
            <p className="text-sm text-muted-foreground">
              Recibe una propuesta personalizada con descuento especial para tu proyecto.
            </p>
          </Card>

          <a
            href="https://wa.me/525539487283?text=Hola%2C%20me%20interesa%20la%20lista%20de%20precios%20de%20Forzes%20Water"
            target="_blank"
            rel="noopener noreferrer nofollow"
            onClick={() => trackContactClick("WhatsApp - Catalog")}
          >
            <Card className="p-6 bg-card border-border hover:shadow-large hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2">WhatsApp directo</h4>
              <p className="text-sm text-muted-foreground">
                Consulta el precio de un producto específico al instante con un asesor.
              </p>
            </Card>
          </a>

          <a
            href="tel:+525539487283"
            onClick={() => trackContactClick("Phone - Catalog")}
          >
            <Card className="p-6 bg-card border-border hover:shadow-large hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <PhoneIcon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold text-lg text-foreground mb-2">Llamar al asesor</h4>
              <p className="text-sm text-muted-foreground">
                Habla directamente con nuestro equipo de ventas: +52 55 3948 7283
              </p>
            </Card>
          </a>
        </div>
      </div>

      {/* Animated Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
          role="alert"
          aria-live="assertive"
        >
          <div className={`mx-4 max-w-md w-full p-6 rounded-xl shadow-2xl animate-scale-in ${
            status === "success"
              ? "bg-gradient-to-br from-green-500 to-emerald-600"
              : "bg-gradient-to-br from-red-500 to-rose-600"
          }`}>
            <div className="flex flex-col items-center text-center text-white">
              {status === "success" ? (
                <CheckCircle className="h-16 w-16 mb-4 animate-bounce" />
              ) : (
                <XCircle className="h-16 w-16 mb-4 animate-bounce" />
              )}
              <h3 className="text-xl font-bold mb-2">
                {status === "success" ? "¡Descarga iniciada!" : "¡Lo sentimos!"}
              </h3>
              <p className="text-white/90">
                {status === "success"
                  ? "Tu catálogo se está descargando. Un asesor te contactará pronto para ofrecerte tu descuento personalizado."
                  : "No pudimos procesar tu solicitud. Por favor intenta de nuevo o contáctanos directamente por WhatsApp."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalog;
