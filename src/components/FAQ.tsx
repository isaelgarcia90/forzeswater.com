import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import forzecito from "@/assets/forzecito.webp";
import { FAQS } from "@/data/landing";
import { openForzecito } from "@/context/LandingContext";
import { Eyebrow } from "./fw";

const FAQ = () => (
  <section id="faq" className="scroll-mt-[68px] border-t border-[rgba(148,190,220,.1)] bg-fw-alt">
    <div className="fw-container fw-section grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(36px,6vw,80px)]">
      <div className="flex flex-col gap-[18px] md:sticky md:top-[110px]">
        <Eyebrow lineClass="w-20">05 · Preguntas frecuentes</Eyebrow>
        <h2 className="fw-h2">Lo esencial antes de elegir tu sistema.</h2>
        <p className="m-0 text-[17px] leading-[1.55] text-fw-sec">Para revisar tu caso, pregunta a Forzecito.</p>
        <button
          type="button"
          onClick={() => openForzecito()}
          className="mt-2 flex max-w-[420px] items-center gap-3.5 border border-[rgba(148,190,220,.16)] bg-fw-card py-3.5 pl-3.5 pr-[18px] text-left text-fw-text transition-all duration-300 hover:border-[hsl(174_72%_56%/.6)] hover:shadow-[0_18px_44px_-20px_hsl(174_72%_56%/.6)]"
        >
          <img src={forzecito} alt="Forzecito" className="h-[52px] w-[52px] flex-none rounded-full" />
          <span className="flex flex-1 flex-col gap-[3px]">
            <span className="font-display text-[19px] font-semibold leading-[1.1]">¿Tienes otra duda?</span>
            <span className="text-sm leading-[1.3] text-fw-ter">Forzecito responde al instante</span>
          </span>
          <ArrowRight className="h-[18px] w-[18px] text-fw-aqua" strokeWidth={1.5} />
        </button>
      </div>

      <AccordionPrimitive.Root type="single" collapsible defaultValue="0" className="flex flex-col border-t border-[rgba(148,190,220,.16)]">
        {FAQS.map((f, i) => (
          <AccordionPrimitive.Item
            key={f.q}
            value={String(i)}
            className="border-b border-[rgba(148,190,220,.16)] transition-colors duration-300 data-[state=open]:bg-[hsl(188_94%_43%/.04)]"
          >
            <AccordionPrimitive.Header className="m-0">
              <AccordionPrimitive.Trigger className="group flex w-full items-center gap-[18px] border-0 bg-transparent px-1.5 py-[22px] text-left text-fw-text transition-colors hover:text-fw-aqua">
                <span className="w-[22px] font-display text-[13px] font-semibold leading-none tracking-[.1em] text-[#5f7488]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-[21px] font-semibold leading-[1.2]">{f.q}</span>
                <span className="flex h-8 w-8 flex-none items-center justify-center border border-[rgba(148,190,220,.25)] transition-transform duration-300 group-data-[state=open]:rotate-180">
                  <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="flex flex-col gap-3.5 pb-6 pl-[46px] pr-[56px] max-md:pr-4">
                <p className="m-0 text-base leading-[1.6] text-fw-sec">{f.a}</p>
                <button
                  type="button"
                  onClick={() => openForzecito(f.q)}
                  className="flex items-center gap-2 self-start border-0 bg-transparent p-0 text-[13px] font-semibold uppercase leading-none tracking-[.08em] text-fw-aqua hover:text-fw-text"
                >
                  <MessageCircle className="h-[15px] w-[15px]" strokeWidth={1.5} />
                  Preguntar a Forzecito
                </button>
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  </section>
);

export default FAQ;
