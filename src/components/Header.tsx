import { useEffect } from "react";
import { ClipboardList, Menu, X } from "lucide-react";
import logo from "@/assets/forzes-water-logo.jpeg";
import forzecito from "@/assets/forzecito.webp";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF, WA_DEFAULT } from "@/data/landing";
import { openForzecito, useLanding } from "@/context/LandingContext";
import { WhatsAppIcon } from "./fw";
import { useAnalytics } from "@/hooks/useAnalytics";

const Header = () => {
  const { quote, setQuoteOpen, menuOpen, setMenuOpen } = useLanding();
  const { trackContactClick } = useAnalytics();

  // Cierra el menú al pasar a escritorio y con Escape; bloquea el scroll mientras está abierto
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, setMenuOpen]);

  const count = quote.length;

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-[rgba(148,190,220,.12)] bg-[rgba(14,22,30,.82)] backdrop-blur-[14px]">
        <div className="fw-container flex h-[68px] items-center gap-7">
          <a href="#inicio" className="flex flex-none items-center gap-3 text-fw-text hover:text-fw-text" onClick={() => setMenuOpen(false)}>
            <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden bg-white">
              <img src={logo} alt="Forzes Water" width={46} height={46} className="h-[46px] w-[46px] max-w-none object-cover [object-position:50%_30%]" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold leading-none tracking-[.08em]">FORZES</span>
              <span className="text-[10px] font-semibold leading-[1.4] tracking-[.42em] text-fw-cyan">WATER</span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden h-5 min-w-0 flex-1 flex-wrap justify-center gap-x-[26px] gap-y-1 overflow-hidden text-sm font-medium leading-5 nav:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-fw-nav transition-colors hover:text-fw-aqua">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden flex-none items-center gap-2.5 nav:flex">
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="fw-btn h-10 gap-2 border border-[rgba(148,190,220,.22)] bg-transparent px-3.5 text-sm tracking-[.06em] text-fw-text hover:border-fw-cyan hover:shadow-[0_0_22px_-6px_hsl(188_94%_43%/.6)]"
            >
              <ClipboardList className="h-4 w-4" strokeWidth={1.5} />
              Mi cotización
              <span className="flex h-5 min-w-5 items-center justify-center bg-fw-cyan px-1.5 font-sans text-xs font-bold leading-none text-fw-ink">{count}</span>
            </button>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("WhatsApp - Header")}
              className="fw-btn-cyan h-10 px-4 text-sm tracking-[.06em]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="ml-auto flex flex-none items-center gap-2 nav:hidden">
            <button
              type="button"
              onClick={() => { setMenuOpen(false); setQuoteOpen(true); }}
              aria-label={`Mi cotización, ${count} equipos`}
              className="relative flex h-11 w-11 items-center justify-center border border-[rgba(148,190,220,.22)] bg-transparent text-fw-text"
            >
              <ClipboardList className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <span className="absolute -right-[7px] -top-[7px] flex h-5 min-w-5 items-center justify-center bg-fw-cyan px-[5px] text-[11px] font-bold leading-none text-fw-ink">{count}</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              className={`flex h-11 w-11 items-center justify-center border border-[hsl(188_94%_43%/.6)] text-fw-text ${menuOpen ? "bg-[hsl(188_94%_43%/.16)]" : "bg-transparent"}`}
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="menu-movil"
          className="fixed inset-x-0 bottom-0 top-[68px] z-[70] flex flex-col overflow-y-auto border-t border-[hsl(188_94%_43%/.35)] bg-fw-alt animate-fade-in nav:hidden"
        >
          <nav aria-label="Menú móvil" className="flex flex-col px-[18px] py-2">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-3.5 border-b border-[rgba(148,190,220,.12)] py-4 text-fw-text hover:text-fw-aqua"
              >
                <span className="font-display text-[13px] font-semibold leading-none tracking-[.1em] text-fw-aqua">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[30px] font-semibold leading-none">{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2.5 border-t border-[rgba(148,190,220,.12)] p-[18px]">
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" onClick={() => trackContactClick("WhatsApp - Menú móvil")} className="fw-btn-cyan h-[52px] text-base">
              Escribir por WhatsApp
            </a>
            <button type="button" onClick={() => { setMenuOpen(false); openForzecito(); }} className="fw-btn-aqua h-[52px] gap-2.5 text-base">
              <img src={forzecito} alt="" className="h-7 w-7 rounded-full" />
              Preguntar a Forzecito
            </button>
            <a href={PHONE_HREF} className="pb-0.5 pt-2 text-center text-[15px] font-medium leading-none text-fw-nav">
              {PHONE_DISPLAY} · L–V 9:00–18:00
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
