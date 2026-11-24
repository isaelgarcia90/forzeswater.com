import { useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, FileDown, Loader2, X } from "lucide-react";
import { PRICE_LISTS, PRODUCTS, catLabel, quoteMessage, waUrl } from "@/data/landing";
import { openForzecito, useLanding } from "@/context/LandingContext";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CloseButton, Modal } from "./fw";
import { cn } from "@/lib/utils";

/* ---------------- Lista de cotización (drawer) ---------------- */

export const QuoteDrawer = () => {
  const { quoteOpen, setQuoteOpen, quoteItems, toggleQuote } = useLanding();
  const { trackContactClick } = useAnalytics();
  const empty = quoteItems.length === 0;
  const message = quoteMessage(quoteItems);

  return (
    <DialogPrimitive.Root open={quoteOpen} onOpenChange={setQuoteOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-[rgba(6,10,14,.65)] backdrop-blur-[3px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-[80] flex h-full w-full max-w-[420px] flex-col border-l border-[hsl(188_94%_43%/.35)] bg-fw-modal text-fw-text shadow-[-30px_0_80px_-20px_rgba(0,0,0,.6)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=open]:duration-300">
          <div className="flex items-start gap-3 border-b border-[rgba(148,190,220,.14)] px-6 pb-[18px] pt-6">
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase leading-none tracking-[.18em] text-fw-aqua">{quoteItems.length} equipos</span>
              <DialogPrimitive.Title className="m-0 font-display text-[30px] font-semibold leading-none">Tu lista de cotización</DialogPrimitive.Title>
              <DialogPrimitive.Description className="m-0 text-sm leading-[1.45] text-fw-ter">
                Revisa los equipos y envíalos juntos por WhatsApp o Forzecito.
              </DialogPrimitive.Description>
            </div>
            <CloseButton />
          </div>

          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-6 py-[18px]">
            {quoteItems.map((q) => (
              <div key={q.id} className="flex items-center gap-3 border border-[rgba(148,190,220,.14)] bg-fw-card p-2.5">
                <span className="relative h-14 w-14 flex-none overflow-hidden">
                  <img src={q.img} alt="" className="h-full w-full object-cover grayscale" />
                  <span className="fw-duotone-layer" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-display text-lg font-semibold leading-[1.1]">{q.title}</span>
                  <span className="text-xs leading-[1.3] text-fw-label">{q.code} · {catLabel(q.cat)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => toggleQuote(q.id)}
                  aria-label={`Quitar ${q.title}`}
                  className="flex h-[34px] w-[34px] flex-none items-center justify-center border-0 bg-transparent text-fw-label transition-colors hover:text-fw-error"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            ))}
            {empty && (
              <div className="flex flex-col items-center gap-2.5 px-3 py-12 text-center">
                <span className="font-display text-[22px] font-semibold leading-none">Tu lista está vacía</span>
                <span className="text-sm leading-normal text-fw-ter">Agrega equipos desde el catálogo para cotizarlos juntos.</span>
                <a
                  href="#catalogo"
                  onClick={() => setQuoteOpen(false)}
                  className="mt-2 text-[13px] font-semibold uppercase leading-none tracking-[.08em] text-fw-aqua hover:text-fw-text"
                >
                  Ir al catálogo
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5 border-t border-[rgba(148,190,220,.14)] px-6 pb-6 pt-[18px]">
            <a
              href={empty ? undefined : waUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={empty}
              onClick={() => !empty && trackContactClick("WhatsApp - Lista de cotización")}
              className={cn("fw-btn-cyan h-[50px] text-base", empty && "pointer-events-none opacity-40")}
            >
              Enviar por WhatsApp
            </a>
            <button
              type="button"
              disabled={empty}
              onClick={() => { setQuoteOpen(false); openForzecito(message); }}
              className="fw-btn h-[50px] border border-[hsl(174_72%_56%/.6)] bg-transparent text-base text-fw-text hover:bg-[hsl(174_72%_56%/.1)]"
            >
              Continuar con Forzecito
            </button>
            <p className="m-0 mt-0.5 text-center text-xs leading-[1.4] text-fw-dim">Los precios se envían en tu cotización personalizada.</p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

/* ---------------- Ficha técnica ---------------- */

export const ProductSheet = () => {
  const { ficha, setFicha, isInQuote, toggleQuote, openGate } = useLanding();
  const p = ficha ? PRODUCTS.find((x) => x.id === ficha) : null;
  const added = p ? isInQuote(p.id) : false;

  return (
    <Modal
      open={!!p}
      onOpenChange={(o) => !o && setFicha(null)}
      title={p ? `Ficha técnica: ${p.title}` : "Ficha técnica"}
      description={p?.description}
      className="max-w-[760px]"
    >
      {p && (
        <>
          <div className="relative h-[220px] overflow-hidden">
            <img src={p.img} alt={p.title} className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.1)]" />
            <div className="fw-duotone-layer" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#131e27,rgba(19,30,39,0)_70%)]" />
            <CloseButton className="absolute right-3.5 top-3.5 h-[38px] w-[38px] border-[rgba(148,190,220,.3)] bg-[rgba(13,21,29,.85)]" />
          </div>
          <div className="flex flex-col gap-[18px] px-8 pb-8 pt-1 max-md:px-5">
            <span className="text-[11px] font-semibold uppercase leading-[1.4] tracking-[.18em] text-fw-aqua">
              {p.code} · {catLabel(p.cat)} · {p.application}
            </span>
            <h3 className="m-0 font-display text-[40px] font-semibold leading-none">{p.title}</h3>
            <p className="m-0 text-[17px] leading-normal text-fw-sec">{p.description}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border border-[rgba(148,190,220,.16)]">
              <div className="flex flex-col gap-1.5 p-4">
                <span className="text-[11px] font-semibold uppercase leading-none tracking-[.16em] text-fw-label">Especificaciones</span>
                <span className="text-[15px] font-medium leading-[1.4] text-fw-aquatext">{p.specs}</span>
              </div>
              <div className="flex flex-col gap-1.5 border-[rgba(148,190,220,.16)] p-4 min-[456px]:border-l">
                <span className="text-[11px] font-semibold uppercase leading-none tracking-[.16em] text-fw-label">Precio</span>
                <span className="text-[15px] font-medium leading-[1.4]">Bajo cotización · Lista {p.catalog}</span>
              </div>
            </div>
            <p className="m-0 text-[15px] leading-[1.65] text-fw-ter">{p.details}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2.5">
              <button type="button" onClick={() => toggleQuote(p.id)} className="fw-btn-cyan h-12 text-[15px]">
                {added ? "Quitar de mi lista" : "Agregar a cotización"}
              </button>
              <button
                type="button"
                onClick={() => { setFicha(null); openForzecito(`Tengo dudas sobre: ${p.title}`); }}
                className="fw-btn h-12 border border-[rgba(148,190,220,.3)] bg-transparent text-[15px] text-fw-text hover:border-fw-aqua"
              >
                Preguntar a Forzecito
              </button>
              <button
                type="button"
                onClick={() => openGate(p.catalog)}
                className="fw-btn h-12 border border-[rgba(148,190,220,.3)] bg-transparent text-[15px] text-fw-text hover:border-fw-aqua"
              >
                Solicitar lista de precios
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

/* ---------------- Gate de listas de precios ---------------- */

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
type GateForm = { name: string; email: string; company: string; phone: string };
const EMPTY: GateForm = { name: "", email: "", company: "", phone: "" };

export const PriceGate = () => {
  const { gate, openGate, closeGate } = useLanding();
  const [form, setForm] = useState<GateForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof GateForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [sentTo, setSentTo] = useState({ name: "", email: "" });
  const { trackEvent } = useAnalytics();
  const list = PRICE_LISTS.find((x) => x.key === gate.key) ?? PRICE_LISTS[0];

  // Cada vez que se abre, regresa al formulario
  useEffect(() => {
    if (gate.open) {
      setStatus("idle");
      setErrors({});
      trackEvent({ category: "modal_open", action: "price_gate_open", label: gate.key });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gate.open]);

  const set = (k: keyof GateForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Partial<Record<keyof GateForm, string>> = {};
    if (!form.name.trim()) err.name = "Campo obligatorio";
    if (!form.email.trim()) err.email = "Campo obligatorio";
    else if (!EMAIL_RE.test(form.email.trim())) err.email = "Correo electrónico no válido";
    if (Object.keys(err).length) return setErrors(err);

    setStatus("sending");
    try {
      const { error } = await supabase.from("catalog_downloads").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        phone: form.phone.trim() || null,
        line_of_interest: `[${list.key}] Todas`,
      });
      fetch("https://formspree.io/f/xblnyzay", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Nueva solicitud de lista ${list.key} · Forzes Water`,
          Tipo: `Solicitud de lista de precios ${list.key}`,
          Lista: list.subtitle,
          Nombre: form.name,
          "Correo Electrónico": form.email,
          Empresa: form.company || "(no proporcionada)",
          Teléfono: form.phone || "(no proporcionado)",
        }),
      }).catch(() => undefined);
      if (error) throw error;
      trackEvent({ category: "form_submit", action: "price_list_requested", label: list.key });
      setSentTo({ name: form.name.trim().split(" ")[0], email: form.email.trim() });
      setForm(EMPTY);
      setStatus("done");
    } catch {
      trackEvent({ category: "form_submit", action: "price_list_error", label: list.key });
      setStatus("error");
    }
  };

  const fieldCls = (bad?: string) => cn("fw-input", bad ? "border-[hsl(0_80%_65%)]" : "border-[rgba(148,190,220,.2)]");
  const labelCls = "flex flex-col gap-1.5 text-[13px] font-medium leading-none text-fw-nav";

  return (
    <Modal
      open={gate.open}
      onOpenChange={(o) => !o && closeGate()}
      title="Solicitar lista de precios"
      description="Deja tus datos para recibir la lista de precios."
      className="max-h-[92vh] max-w-[520px] p-[30px] max-md:p-6"
      zIndex="z-[90]"
    >
      <CloseButton className="absolute right-4 top-4" />
      {status !== "done" ? (
        <form onSubmit={submit} noValidate className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-2 pr-10">
            <span className="text-[11px] font-semibold uppercase leading-none tracking-[.18em] text-fw-aqua">Acceso a lista de precios</span>
            <h3 className="m-0 font-display text-[32px] font-semibold leading-none">Descarga el catálogo</h3>
          </div>
          <div className="grid grid-cols-3 border border-[rgba(148,190,220,.2)]" role="radiogroup" aria-label="Lista de precios">
            {PRICE_LISTS.map((x, i) => {
              const on = x.key === gate.key;
              return (
                <button
                  key={x.key}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => openGate(x.key)}
                  className={cn(
                    "flex flex-col items-center gap-1 border-0 px-2 py-3 transition-colors",
                    i < 2 && "border-r border-[rgba(148,190,220,.14)]",
                    on ? "bg-[hsl(188_94%_43%/.16)] text-fw-text" : "bg-transparent text-fw-label hover:text-fw-text"
                  )}
                >
                  <span className="font-display text-lg font-bold leading-none tracking-[.06em]">{x.key}</span>
                  <span className="text-[11px] leading-[1.2] opacity-80">{x.short}</span>
                </button>
              );
            })}
          </div>
          <label className={labelCls}>
            Nombre completo
            <input value={form.name} onChange={set("name")} autoComplete="name" maxLength={100} placeholder="Tu nombre completo" className={fieldCls(errors.name)} aria-invalid={!!errors.name} />
            <span className="min-h-3 text-xs font-medium leading-none text-fw-error">{errors.name}</span>
          </label>
          <label className={labelCls}>
            Correo electrónico
            <input type="email" value={form.email} onChange={set("email")} autoComplete="email" maxLength={255} placeholder="tu.correo@empresa.com" className={fieldCls(errors.email)} aria-invalid={!!errors.email} />
            <span className="min-h-3 text-xs font-medium leading-none text-fw-error">{errors.email}</span>
          </label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className={labelCls}>
              Empresa (opcional)
              <input value={form.company} onChange={set("company")} autoComplete="organization" maxLength={120} placeholder="Nombre de tu empresa" className={fieldCls()} />
            </label>
            <label className={labelCls}>
              Teléfono (opcional)
              <input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" maxLength={20} placeholder="55 1807 0867" className={fieldCls()} />
            </label>
          </div>
          {status === "error" && (
            <p className="m-0 text-sm text-fw-error">No pudimos registrar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.</p>
          )}
          <button type="submit" disabled={status === "sending"} className="fw-btn-cyan h-[52px] gap-2.5 text-base hover:shadow-[0_14px_40px_-12px_hsl(174_72%_56%/.8)]">
            {status === "sending" ? <Loader2 className="h-[18px] w-[18px] animate-spin" /> : <FileDown className="h-[18px] w-[18px]" strokeWidth={1.5} />}
            Solicitar lista {gate.key}
          </button>
          <p className="m-0 text-center text-xs leading-[1.45] text-fw-dim">
            Al enviar tus datos aceptas que un asesor te contacte para ofrecerte descuentos y cotizaciones personalizadas.
            Consulta nuestro{" "}
            <a href="/aviso-de-privacidad" target="_blank" rel="noopener" className="text-fw-aqua underline-offset-2 hover:underline">
              aviso de privacidad
            </a>
            .
          </p>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-3.5 pb-1.5 pt-5 text-center">
          <span className="flex h-16 w-16 items-center justify-center border border-fw-aqua bg-[hsl(174_72%_56%/.12)] shadow-[0_0_40px_-8px_hsl(174_72%_56%/.7)]">
            <Check className="h-[30px] w-[30px] text-fw-aqua" strokeWidth={1.75} />
          </span>
          <h3 className="m-0 font-display text-[32px] font-semibold leading-none">¡Solicitud recibida!</h3>
          <p className="m-0 max-w-[380px] text-base leading-[1.55] text-fw-sec">
            Listo{sentTo.name ? `, ${sentTo.name}` : ""}. Te enviaremos la lista {list.subtitle} a {sentTo.email}. Un asesor te contactará con tu descuento personalizado.
          </p>
          <DialogPrimitive.Close className="fw-btn-outline mt-1.5 h-[46px] border-[rgba(148,190,220,.3)] px-[22px] text-[15px]">
            Listo
          </DialogPrimitive.Close>
        </div>
      )}
    </Modal>
  );
};
