import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type PriceListKey, type Product } from "@/data/landing";

const QUOTE_KEY = "forzes-quote-list";

type LandingState = {
  quote: string[];
  quoteItems: Product[];
  isInQuote: (id: string) => boolean;
  toggleQuote: (id: string) => void;
  quoteOpen: boolean;
  setQuoteOpen: (open: boolean) => void;
  ficha: string | null;
  setFicha: (id: string | null) => void;
  gate: { open: boolean; key: PriceListKey };
  openGate: (key?: PriceListKey) => void;
  closeGate: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean | ((o: boolean) => boolean)) => void;
};

const LandingContext = createContext<LandingState | null>(null);

function loadQuote(): string[] {
  try {
    const raw = window.localStorage.getItem(QUOTE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => PRODUCTS.some((p) => p.id === id)) : [];
  } catch {
    return [];
  }
}

/** Abre a Forzecito; si hay pregunta, la envía directamente al asistente. */
export function openForzecito(message?: string) {
  window.dispatchEvent(
    new CustomEvent("open-forzecito", { detail: message ? { message, send: true } : undefined })
  );
}

export function LandingProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<string[]>(() => (typeof window === "undefined" ? [] : loadQuote()));
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [ficha, setFicha] = useState<string | null>(null);
  const [gate, setGate] = useState<{ open: boolean; key: PriceListKey }>({ open: false, key: "SBO" });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(QUOTE_KEY, JSON.stringify(quote));
    } catch {
      // sin almacenamiento disponible
    }
  }, [quote]);

  const toggleQuote = useCallback((id: string) => {
    setQuote((q) => (q.includes(id) ? q.filter((x) => x !== id) : [...q, id]));
  }, []);

  const openGate = useCallback((key?: PriceListKey) => {
    setFicha(null);
    setGate((g) => ({ open: true, key: key ?? g.key }));
  }, []);
  const closeGate = useCallback(() => setGate((g) => ({ ...g, open: false })), []);

  const value = useMemo<LandingState>(
    () => ({
      quote,
      quoteItems: PRODUCTS.filter((p) => quote.includes(p.id)),
      isInQuote: (id) => quote.includes(id),
      toggleQuote,
      quoteOpen,
      setQuoteOpen,
      ficha,
      setFicha,
      gate,
      openGate,
      closeGate,
      menuOpen,
      setMenuOpen,
    }),
    [quote, toggleQuote, quoteOpen, ficha, gate, openGate, closeGate, menuOpen]
  );

  return <LandingContext.Provider value={value}>{children}</LandingContext.Provider>;
}

export function useLanding() {
  const ctx = useContext(LandingContext);
  if (!ctx) throw new Error("useLanding debe usarse dentro de LandingProvider");
  return ctx;
}
