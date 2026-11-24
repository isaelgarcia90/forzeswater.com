import { useMemo, useState } from "react";
import { ArrowRight, Check, Lock, Plus, Search } from "lucide-react";
import { CATS, PRICE_LISTS, PRODUCTS, catLabel, norm, type CategoryId } from "@/data/landing";
import { openForzecito, useLanding } from "@/context/LandingContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Eyebrow, Marks } from "./fw";
import { cn } from "@/lib/utils";

type CatFilter = "all" | CategoryId;

const Catalog = () => {
  const { quote, isInQuote, toggleQuote, setQuoteOpen, setFicha, openGate } = useLanding();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CatFilter>("all");
  const { trackEvent } = useAnalytics();

  const filtered = useMemo(() => {
    const q = norm(query);
    return PRODUCTS.filter(
      (p) =>
        (cat === "all" || p.cat === cat) &&
        (!q || norm([p.title, p.description, p.specs, p.application, p.brands ?? "", catLabel(p.cat)].join(" ")).includes(q))
    );
  }, [query, cat]);

  const chips: { id: CatFilter; label: string; count: number }[] = [
    { id: "all", label: "Todos", count: PRODUCTS.length },
    ...CATS.map((c) => ({ id: c.id, label: c.short, count: PRODUCTS.filter((p) => p.cat === c.id).length })),
  ];

  const onToggle = (id: string, title: string) => {
    trackEvent({ category: "cta_click", action: isInQuote(id) ? "quote_remove" : "quote_add", label: title });
    toggleQuote(id);
  };

  return (
    <section id="catalogo" className="scroll-mt-[68px] border-t border-[rgba(148,190,220,.1)]">
      <div className="fw-container fw-section flex flex-col gap-8">
        <div className="flex max-w-[720px] flex-col gap-[18px]">
          <Eyebrow>04 · Catálogo de equipos</Eyebrow>
          <h2 className="fw-h2">Encuentra el equipo, agrégalo a tu lista y solicita una sola cotización.</h2>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="sticky top-[68px] z-20 -mx-2 flex flex-wrap items-center gap-2.5 border border-[rgba(148,190,220,.16)] bg-[rgba(21,32,42,.94)] p-2.5 backdrop-blur-[10px] md:mx-0 md:gap-3 md:p-3.5">
          <label className="flex h-[46px] min-w-0 flex-[1_1_240px] items-center gap-2.5 border border-[rgba(148,190,220,.2)] bg-fw-input px-3.5 focus-within:border-fw-cyan">
            <Search className="h-[18px] w-[18px] flex-none text-fw-label" strokeWidth={1.5} />
            <span className="sr-only">Buscar en el catálogo</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar equipo, marca o aplicación"
              className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-fw-text outline-none"
            />
          </label>
          <div className="no-scrollbar flex w-full flex-nowrap gap-1.5 overflow-x-auto md:w-auto md:flex-wrap" role="group" aria-label="Filtrar por categoría">
            {chips.map((c) => {
              const on = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCat(c.id)}
                  className={cn(
                    "fw-btn h-10 flex-none border px-4 text-sm tracking-[.06em] hover:border-fw-cyan md:h-[46px]",
                    on ? "border-fw-cyan bg-[hsl(188_94%_43%/.14)] text-fw-text" : "border-[rgba(148,190,220,.2)] bg-transparent text-fw-ter"
                  )}
                >
                  {c.label} <span className="ml-1 opacity-60">{c.count}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className="fw-btn hidden h-[46px] gap-2 border border-[hsl(174_72%_56%/.5)] bg-transparent px-4 text-sm tracking-[.06em] text-fw-text hover:bg-[hsl(174_72%_56%/.1)] md:inline-flex"
          >
            Lista de cotización
            <span className="flex h-[22px] min-w-[22px] items-center justify-center bg-fw-aqua px-1.5 font-sans text-xs font-bold leading-none text-fw-ink">{quote.length}</span>
          </button>
        </div>
        <p className="-mt-3.5 mb-0 text-sm font-medium leading-none text-fw-label" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "equipo encontrado" : "equipos encontrados"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-[22px]">
            {filtered.map((p) => {
              const added = isInQuote(p.id);
              return (
                <article
                  key={p.id}
                  className={cn(
                    "fw-card flex flex-col transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-[3px] hover:border-[hsl(188_94%_43%/.6)] hover:shadow-card-hover",
                    added && "border-[hsl(174_72%_56%/.55)]"
                  )}
                >
                  <Marks opacity={0.55} />
                  <button
                    type="button"
                    onClick={() => setFicha(p.id)}
                    aria-label={`Ver ficha técnica de ${p.title}`}
                    className="relative block h-[176px] overflow-hidden border-0 border-b border-[rgba(148,190,220,.14)] bg-fw-input p-0"
                  >
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.1)_brightness(.9)]" />
                    <span className="fw-duotone-layer" />
                    <span className="absolute left-3 top-3 border border-[rgba(148,190,220,.2)] bg-[rgba(13,21,29,.85)] px-2 py-[5px] text-[11px] font-semibold leading-none tracking-[.16em] text-fw-aqua">
                      {p.code}
                    </span>
                    {added && (
                      <span className="absolute right-3 top-3 flex items-center gap-[5px] bg-fw-aqua px-2 py-[5px] text-[11px] font-bold uppercase leading-none tracking-[.1em] text-fw-ink">
                        <Check className="h-3 w-3" strokeWidth={2} />
                        En tu lista
                      </span>
                    )}
                  </button>
                  <div className="flex flex-1 flex-col gap-2.5 px-5 pb-5 pt-[18px]">
                    <span className="text-[11px] font-semibold uppercase leading-none tracking-[.16em] text-fw-label">{catLabel(p.cat)}</span>
                    <h3 className="m-0 font-display text-2xl font-semibold leading-[1.05]">{p.title}</h3>
                    <p className="m-0 text-sm leading-normal text-fw-ter">{p.description}</p>
                    <p className="m-0 border-y border-[rgba(148,190,220,.12)] py-2.5 text-[13px] font-medium leading-[1.4] text-fw-aquatext">{p.specs}</p>
                    <div className="flex items-center gap-2 text-[13px] font-medium leading-none text-fw-label">
                      <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Precio bajo cotización
                    </div>
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-1.5">
                      <button type="button" onClick={() => setFicha(p.id)} className="fw-btn-outline h-[42px] text-sm">
                        Ficha técnica
                      </button>
                      {added ? (
                        <button
                          type="button"
                          onClick={() => onToggle(p.id, p.title)}
                          aria-label={`Quitar ${p.title} de la lista`}
                          className="fw-btn h-[42px] gap-1.5 border border-fw-aqua bg-[hsl(174_72%_56%/.14)] text-sm text-fw-aquatext hover:bg-[hsl(174_72%_56%/.22)]"
                        >
                          <Check className="h-[15px] w-[15px]" strokeWidth={1.75} />
                          Agregado
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onToggle(p.id, p.title)}
                          aria-label={`Agregar ${p.title} a la lista`}
                          className="fw-btn h-[42px] gap-1.5 border border-fw-cyan bg-fw-cyan text-sm text-fw-ink hover:border-fw-aqua hover:bg-fw-aqua hover:shadow-[0_0_24px_-6px_hsl(174_72%_56%/.8)]"
                        >
                          <Plus className="h-[15px] w-[15px]" strokeWidth={1.75} />
                          Cotizar
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 border border-dashed border-[rgba(148,190,220,.25)] px-6 py-14 text-center">
            <span className="font-display text-[26px] font-semibold leading-none">No encontramos ese equipo</span>
            <span className="text-[15px] leading-normal text-fw-ter">Prueba con otra palabra o pregúntale a Forzecito.</span>
            <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">
              <button type="button" onClick={() => { setQuery(""); setCat("all"); }} className="fw-btn-outline h-[42px] px-[18px] text-sm">
                Ver todos
              </button>
              <button type="button" onClick={() => openForzecito(`No encontré: ${query}`)} className="fw-btn-cyan h-[42px] px-[18px] text-sm">
                Preguntar a Forzecito
              </button>
            </div>
          </div>
        )}

        {/* Listas de precios */}
        <div
          id="precios"
          className="relative mt-6 grid scroll-mt-[150px] grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] border border-[rgba(148,190,220,.2)] [background:linear-gradient(135deg,hsl(199_89%_32%/.18),transparent_60%),#121c25]"
        >
          <Marks opacity={0.8} />
          <div className="flex flex-col gap-3.5 p-[clamp(24px,3vw,40px)]">
            <span className="flex h-12 w-12 items-center justify-center border border-[hsl(174_72%_56%/.5)] text-fw-aqua">
              <Lock className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </span>
            <h3 className="m-0 font-display text-[34px] font-semibold leading-none">Listas de precios 2026</h3>
            <p className="m-0 max-w-[420px] text-base leading-[1.55] text-fw-sec">
              Elige una lista y recíbela al instante dejando tus datos. Para tu descuento personalizado, solicita una cotización directa.
            </p>
          </div>
          <div className="flex flex-col border-[rgba(148,190,220,.14)] md:border-l">
            {PRICE_LISTS.map((pl) => (
              <button
                key={pl.key}
                type="button"
                onClick={() => openGate(pl.key)}
                className="flex items-center gap-[18px] border-0 border-b border-[rgba(148,190,220,.14)] bg-transparent px-[clamp(18px,2.4vw,28px)] py-5 text-left text-fw-text transition-colors duration-200 hover:bg-[hsl(188_94%_43%/.07)]"
              >
                <span className="w-[52px] font-display text-[22px] font-bold leading-none tracking-[.06em] text-[hsl(188_94%_50%)]">{pl.key}</span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="font-display text-[19px] font-semibold leading-[1.1]">{pl.subtitle}</span>
                  <span className="text-[13px] leading-[1.3] text-fw-label">{pl.pages} · PDF · MXN + IVA</span>
                </span>
                <span className="flex items-center gap-1.5 text-[13px] font-semibold uppercase leading-none tracking-[.08em] text-fw-aqua">
                  Solicitar <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
