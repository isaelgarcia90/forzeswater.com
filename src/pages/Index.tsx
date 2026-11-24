import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import ScrollStory from "@/components/ScrollStory";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Catalog from "@/components/Catalog";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { PriceGate, ProductSheet, QuoteDrawer } from "@/components/Overlays";
import { LandingProvider } from "@/context/LandingContext";
import { useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  const { trackScrollDepth } = useAnalytics();

  // Inicia arriba al cargar, salvo que se llegue con un ancla (#catalogo, etc.)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set<number>();
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.round((window.scrollY / scrollHeight) * 100);
      thresholds.forEach((t) => {
        if (pct >= t && !tracked.has(t)) {
          tracked.add(t);
          trackScrollDepth(t);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackScrollDepth]);

  return (
    <LandingProvider>
      <div className="min-h-screen bg-fw-bg pb-[var(--dock-h)] text-fw-text">
        <Helmet>
          <link rel="canonical" href="https://forzeswater.lovable.app/" />
        </Helmet>
        <Header />
        <main>
          <ScrollStory />
          <About />
          <Solutions />
          <Catalog />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <QuoteDrawer />
        <ProductSheet />
        <PriceGate />
        <ChatBot />
      </div>
    </LandingProvider>
  );
};

export default Index;
