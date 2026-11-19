import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Bot,
  Check,
  ClipboardList,
  FileDown,
  MessageCircle,
  Plus,
  Search,
  SearchX,
  Trash2,
} from "lucide-react";

import bombaSumergible from "@/assets/products/bomba-sumergible.jpg";
import bombaCentrifuga from "@/assets/products/bomba-centrifuga.jpg";
import bombaPresurizadora from "@/assets/products/bomba-presurizadora.jpg";
import panelPlc from "@/assets/products/panel-plc.jpg";
import controladorBombas from "@/assets/products/controlador-bombas.jpg";
import panelAutomatizacion from "@/assets/products/panel-automatizacion.jpg";
import filtroArena from "@/assets/products/filtro-arena.jpg";
import filtroCarbon from "@/assets/products/filtro-carbon.jpg";
import filtroCartucho from "@/assets/products/filtro-cartucho.jpg";

type CatalogKey = "sbo" | "piq" | "tda";
type CategoryId = "pumps" | "panels" | "filters";

type Product = {
  id: string;
  categoryId: CategoryId;
  categoryLabel: string;
  application: string;
  catalog: CatalogKey;
  title: string;
  description: string;
  specs: string;
  details: string;
  image: string;
  brands?: string[];
};

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "pumps", label: "Bombas de agua" },
  { id: "panels", label: "Paneles de control" },
  { id: "filters", label: "Filtros" },
];

const APPLICATIONS = [
  "Extracción de agua",
  "Distribución y presión",
  "Automatización y control",
  "Tratamiento y filtración",
];

const PRODUCTS: Product[] = [
  {
    id: "bombas-sumergibles",
    categoryId: "pumps",
    categoryLabel: "Bombas de agua",
    application: "Extracción de agua",
    catalog: "sbo",
    title: "Bombas Sumergibles",
    description: "Alto rendimiento para pozos profundos y extracción de agua subterránea.",
    specs: "Hasta 500 m de profundidad · 5 a 500 HP",
    details: "Nuestras bombas sumergibles están diseñadas para pozos profundos y aplicaciones de extracción de agua subterránea. Fabricadas con materiales resistentes a la corrosión como acero inoxidable 304/316. Incluyen motor sumergible refrigerado por agua, impulsor multi-etapa balanceado, cable sumergible certificado, válvula check integrada y sensor de nivel. Disponibles en 4, 6 y 8 pulgadas de diámetro con potencias de 5 a 500 HP. Eficiencia energética superior al 85%.",
    image: bombaSumergible,
  },
  {
    id: "bombas-centrifugas",
    categoryId: "pumps",
    categoryLabel: "Bombas de agua",
    application: "Distribución y presión",
    catalog: "sbo",
    title: "Bombas Centrífugas",
    description: "Transferencia y distribución de agua para aplicaciones comerciales e industriales.",
    specs: "Caudales de 10 a 5000 m³/h · Alturas hasta 150 m",
    details: "Bombas centrífugas horizontales y verticales para transferencia y distribución de agua. Construcción en hierro fundido, bronce o acero inoxidable según aplicación. Diseño de impulsor cerrado para máxima eficiencia. Sello mecánico de carburo de silicio. Acoplamiento flexible con guarda de seguridad. Aplicaciones: sistemas de riego, abastecimiento municipal, torres de enfriamiento y circulación industrial.",
    image: bombaCentrifuga,
  },
  {
    id: "bombas-presurizadoras",
    categoryId: "pumps",
    categoryLabel: "Bombas de agua",
    application: "Distribución y presión",
    catalog: "sbo",
    title: "Bombas Presurizadoras",
    description: "Presión constante para edificios residenciales, comerciales e industriales.",
    specs: "Velocidad variable · Presión de 2 a 10 bar",
    details: "Sistemas completos de presurización constante para edificios residenciales, comerciales e industriales. Incluyen múltiples bombas en paralelo, variadores de frecuencia, tanque hidroneumático, válvulas de seccionamiento, sensores de presión y flujo, y tablero de control automático. Operación automática con rotación de bombas para desgaste uniforme.",
    image: bombaPresurizadora,
  },
  {
    id: "sistemas-control-plc",
    categoryId: "panels",
    categoryLabel: "Paneles de control",
    application: "Automatización y control",
    catalog: "sbo",
    title: "Sistemas de Control PLC",
    description: "Automatización de procesos de tratamiento de agua con control y monitoreo.",
    specs: "Pantalla HMI · Comunicación Ethernet, Profinet y Modbus",
    details: "Tableros de control con PLC para automatización completa de procesos de tratamiento de agua. Incluyen pantalla HMI a color, programación personalizada según proceso, registro de datos históricos, sistema de alarmas configurable y acceso remoto seguro. Gabinete NEMA 4X en acero inoxidable o policarbonato.",
    image: panelPlc,
    brands: ["Siemens", "Allen-Bradley", "Schneider Modicon"],
  },
  {
    id: "controladores-bombas",
    categoryId: "panels",
    categoryLabel: "Paneles de control",
    application: "Automatización y control",
    catalog: "sbo",
    title: "Controladores de Bombas",
    description: "Operación automática, protección y monitoreo de una o varias bombas.",
    specs: "Monitoreo remoto · Control de velocidad variable",
    details: "Controladores dedicados para operación automática de una o múltiples bombas. Incluyen protecciones eléctricas y monitoreo en tiempo real de presión, flujo, nivel, temperatura y consumo eléctrico. Modos de operación manual, automático, alternado y emergencia. Conectividad 4G/WiFi para monitoreo remoto y registro de eventos y alarmas.",
    image: controladorBombas,
  },
  {
    id: "paneles-automatizacion",
    categoryId: "panels",
    categoryLabel: "Paneles de control",
    application: "Automatización y control",
    catalog: "sbo",
    title: "Paneles de Automatización",
    description: "Tableros diseñados a la medida para integrar el control de tu sistema de agua.",
    specs: "Ingeniería personalizada · Planos eléctricos incluidos",
    details: "Tableros de automatización diseñados y fabricados a la medida del proyecto. Ingeniería eléctrica e instrumentación personalizada. Pueden integrar PLC, HMI, variadores de frecuencia, arrancadores, protecciones eléctricas, medidores de energía y UPS. Incluyen cableado numerado e identificado y planos eléctricos finales.",
    image: panelAutomatizacion,
  },
  {
    id: "filtros-arena",
    categoryId: "filters",
    categoryLabel: "Filtros",
    application: "Tratamiento y filtración",
    catalog: "tda",
    title: "Filtros de Arena",
    description: "Remoción de sólidos suspendidos y turbidez mediante filtración multimedia.",
    specs: "Flujos de 5 a 200 GPM · Retrolavado automático",
    details: "Filtros de arena multimedia para remoción de sólidos suspendidos y turbidez. Utilizan capas de antracita, arena sílica y grava clasificada en tanques de fibra de vidrio o acero al carbón epóxico. Incluyen válvula multipuerto automática para retrolavado programable y manómetros diferenciales para monitoreo de pérdida de carga.",
    image: filtroArena,
  },
  {
    id: "filtros-carbon",
    categoryId: "filters",
    categoryLabel: "Filtros",
    application: "Tratamiento y filtración",
    catalog: "tda",
    title: "Filtros de Carbón Activado",
    description: "Reducción de cloro, olores, sabores y compuestos orgánicos del agua.",
    specs: "Carbón activado granular · Válvula automática",
    details: "Filtros de carbón activado granular para eliminación de cloro, sabores, olores y compuestos orgánicos. Utilizan carbón activado de coco con tanques en fibra de vidrio y válvula automática de retrolavado. Pueden funcionar como pretratamiento para ósmosis inversa o como pulimento final.",
    image: filtroCarbon,
  },
  {
    id: "filtros-cartucho",
    categoryId: "filters",
    categoryLabel: "Filtros",
    application: "Tratamiento y filtración",
    catalog: "tda",
    title: "Filtros de Cartucho",
    description: "Filtración de partículas finas con cartuchos reemplazables.",
    specs: "Opciones de 1 a 100 micras · Configuraciones modulares",
    details: "Sistemas de filtración de cartucho para remoción de partículas finas. Portafiltros en acero inoxidable 304/316 o polipropileno reforzado. Disponibles en configuraciones de 1 hasta 60 cartuchos y distintos medios filtrantes. Ideales para prefiltración de ósmosis inversa, protección de equipos y agua de proceso.",
    image: filtroCartucho,
  },
];

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [application, setApplication] = useState("all");
  const [quoteIds, setQuoteIds] = useState<string[]>([]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { trackCTAClick } = useAnalytics();

  const filteredProducts = useMemo(() => {
    const search = normalize(query);
    return PRODUCTS.filter((product) => {
      const matchesCategory = category === "all" || product.categoryId === category;
      const matchesApplication = application === "all" || product.application === application;
      const searchable = normalize([
        product.title,
        product.description,
        product.specs,
        product.categoryLabel,
        product.application,
        ...(product.brands ?? []),
      ].join(" "));
      return matchesCategory && matchesApplication && (!search || searchable.includes(search));
    });
  }, [query, category, application]);

  const quoteProducts = PRODUCTS.filter((product) => quoteIds.includes(product.id));
  const hasFilters = Boolean(query || category !== "all" || application !== "all");
  const quoteMessage = `Hola, quiero cotizar estos equipos de Forzes Water:\n\n${quoteProducts.map((product) => `• ${product.title}`).join("\n")}\n\n¿Me apoyan con disponibilidad y una cotización?`;

  const addToQuote = (product: Product) => {
    if (quoteIds.includes(product.id)) return;
    setQuoteIds((current) => [...current, product.id]);
    trackCTAClick("Agregar a cotización", product.title);
  };

  const removeFromQuote = (product: Product) => {
    setQuoteIds((current) => current.filter((id) => id !== product.id));
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setApplication("all");
  };

  const openForzecito = (message?: string) => {
    window.dispatchEvent(new CustomEvent("open-forzecito", { detail: message ? { message } : undefined }));
  };

  return (
    <section id="products" className="pt-24 pb-8 bg-muted scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Catálogo de equipos
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Encuentra el equipo, agrégalo a tu lista y solicita una sola cotización.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-6 rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar equipo, marca o aplicación"
                aria-label="Buscar equipos"
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger aria-label="Filtrar por categoría">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {CATEGORIES.map((item) => (
                  <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={application} onValueChange={setApplication}>
              <SelectTrigger aria-label="Filtrar por aplicación">
                <SelectValue placeholder="Aplicación" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">Todas las aplicaciones</SelectItem>
                {APPLICATIONS.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setQuoteOpen(true)} className="relative">
              <ClipboardList className="h-4 w-4" />
              Mi cotización
              {quoteProducts.length > 0 && (
                <Badge className="ml-1 px-2">{quoteProducts.length}</Badge>
              )}
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <p aria-live="polite">
              {filteredProducts.length} {filteredProducts.length === 1 ? "equipo encontrado" : "equipos encontrados"}
            </p>
            {hasFilters && (
              <Button variant="link" size="sm" className="h-auto px-0" onClick={clearFilters}>
                Limpiar búsqueda y filtros
              </Button>
            )}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProducts.map((product) => {
              const isAdded = quoteIds.includes(product.id);
              return (
                <Card key={product.id} className="flex flex-col overflow-hidden bg-card border-border hover:shadow-large transition-shadow">
                  <button
                    type="button"
                    className="h-44 overflow-hidden text-left"
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`Ver detalles de ${product.title}`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge variant="outline">{product.categoryLabel}</Badge>
                      <Badge variant="secondary">{product.application}</Badge>
                    </div>
                    <button type="button" className="text-left" onClick={() => setSelectedProduct(product)}>
                      <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary">{product.title}</h3>
                    </button>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <p className="text-sm text-primary font-semibold mb-5">{product.specs}</p>
                    <div className="mt-auto grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product)}>
                        Ver detalles
                      </Button>
                      <Button
                        size="sm"
                        variant={isAdded ? "secondary" : "default"}
                        onClick={() => isAdded ? removeFromQuote(product) : addToQuote(product)}
                        aria-label={isAdded ? `Quitar ${product.title} de la cotización` : `Agregar ${product.title} a la cotización`}
                      >
                        {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {isAdded ? "Agregado" : "Agregar"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xl mx-auto rounded-xl border border-border bg-card px-6 py-12 text-center">
            <SearchX className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No encontramos ese equipo</h3>
            <p className="text-muted-foreground mb-5">Prueba con otra palabra o limpia los filtros.</p>
            <Button variant="outline" onClick={clearFilters}>Ver todos los equipos</Button>
          </div>
        )}

        <Dialog open={selectedProduct !== null} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90dvh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                    <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
                  </div>
                  <DialogTitle className="text-2xl">{selectedProduct.title}</DialogTitle>
                  <DialogDescription>{selectedProduct.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Especificaciones principales</h4>
                    <p className="text-sm text-muted-foreground">{selectedProduct.specs}</p>
                  </div>
                  {selectedProduct.brands && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Marcas compatibles</h4>
                      <p className="text-sm text-muted-foreground">{selectedProduct.brands.join(" · ")}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Detalles</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedProduct.details}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <Button
                    className="bg-gradient-primary"
                    disabled={quoteIds.includes(selectedProduct.id)}
                    onClick={() => addToQuote(selectedProduct)}
                  >
                    {quoteIds.includes(selectedProduct.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {quoteIds.includes(selectedProduct.id) ? "En tu lista" : "Agregar a cotización"}
                  </Button>
                  <Button variant="outline" onClick={() => { setSelectedProduct(null); openForzecito(); }}>
                    <Bot className="h-4 w-4" /> Preguntar a Forzecito
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setSelectedProduct(null);
                    window.dispatchEvent(new CustomEvent("select-catalog", { detail: selectedProduct.catalog }));
                    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                  }}>
                    <FileDown className="h-4 w-4" /> Ver precios
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Sheet open={quoteOpen} onOpenChange={setQuoteOpen}>
          <SheetContent className="flex w-full flex-col sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-2xl">Tu lista de cotización</SheetTitle>
              <SheetDescription>
                Revisa los equipos y envíalos juntos por WhatsApp o Forzecito.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-4">
              {quoteProducts.length > 0 ? (
                <div className="space-y-3">
                  {quoteProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                      <img src={product.image} alt="" className="h-14 w-14 rounded-md object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-foreground">{product.title}</p>
                        <p className="text-xs text-muted-foreground">{product.categoryLabel}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromQuote(product)}
                        aria-label={`Quitar ${product.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="link" size="sm" className="px-0" onClick={() => setQuoteIds([])}>
                    Vaciar lista
                  </Button>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <ClipboardList className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-semibold mb-2">Tu lista está vacía</p>
                  <p className="text-sm text-muted-foreground">Agrega equipos desde el catálogo para cotizarlos juntos.</p>
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              {quoteProducts.length > 0 ? (
                <Button asChild className="w-full bg-gradient-primary">
                  <a
                    href={`https://wa.me/525518070867?text=${encodeURIComponent(quoteMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    onClick={() => trackCTAClick("WhatsApp", "Lista de cotización")}
                  >
                    <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
                  </a>
                </Button>
              ) : (
                <Button className="w-full bg-gradient-primary" disabled>
                  <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full"
                disabled={quoteProducts.length === 0}
                onClick={() => {
                  trackCTAClick("Forzecito", "Lista de cotización");
                  setQuoteOpen(false);
                  openForzecito(quoteMessage);
                }}
              >
                <Bot className="h-4 w-4" /> Continuar con Forzecito
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                En Forzecito podrás revisar el mensaje antes de enviarlo.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export default Products;
