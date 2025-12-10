import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Solutions from "@/components/Solutions";
import Products from "@/components/Products";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyCTABar from "@/components/StickyCTABar";
import { useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  const { trackScrollDepth } = useAnalytics();

  // Track scroll depth
  useEffect(() => {
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      scrollThresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackScrollDepth]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Solutions />
        <Products />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyCTABar />
    </div>
  );
};

export default Index;
