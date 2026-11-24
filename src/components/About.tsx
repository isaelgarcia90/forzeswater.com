import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { BENEFITS } from "@/data/landing";
import { CloseButton, Eyebrow, Marks, Modal } from "./fw";

const METRICS = [
  { value: "10+", label: "años de experiencia", accent: false },
  { value: "24/7", label: "soporte técnico", accent: true },
  { value: "CDMX", label: "y zona metropolitana, con proyectos en todo México", accent: false },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const benefit = openIndex != null ? BENEFITS[openIndex] : null;
  const BenefitIcon = benefit?.icon;

  return (
    <section id="nosotros" className="scroll-mt-[68px] border-t border-[rgba(148,190,220,.1)]">
      <div className="fw-container fw-section grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-[clamp(40px,6vw,80px)]">
        <div className="flex flex-col gap-[22px]">
          <Eyebrow lineClass="w-auto max-w-[120px] flex-1">02 · Nosotros</Eyebrow>
          <h2 className="fw-h2">Ingeniería que simplifica tu proyecto de agua.</h2>
          <p className="m-0 max-w-[500px] text-lg leading-[1.6] text-fw-sec [text-wrap:pretty]">
            Combinamos experiencia técnica y atención cercana para que encuentres la solución correcta sin complicaciones.
          </p>
          <div className="relative mt-3.5 grid grid-cols-3 border border-[rgba(148,190,220,.18)]">
            <Marks />
            {METRICS.map((m, i) => (
              <div key={m.value} className={`flex flex-col gap-2 px-5 py-[22px] ${i > 0 ? "border-l border-[rgba(148,190,220,.18)]" : ""}`}>
                <span className={`font-display text-[clamp(40px,4.4vw,56px)] font-semibold leading-none ${m.accent ? "text-fw-aqua" : "text-fw-text"}`}>
                  {m.value}
                </span>
                <span className="text-sm font-medium leading-[1.35] text-fw-ter">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <button
                key={b.title}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="fw-card fw-card-hover flex flex-col gap-3.5 px-6 py-[26px] text-left text-fw-text"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-[linear-gradient(135deg,hsl(199_89%_32%),hsl(188_94%_43%))] shadow-[0_10px_28px_-10px_hsl(188_94%_43%/.8)]">
                  <Icon className="h-6 w-6 text-fw-text" strokeWidth={1.5} />
                </span>
                <span className="font-display text-[23px] font-semibold leading-[1.1]">{b.title}</span>
                <span className="text-[15px] leading-normal text-fw-ter">{b.description}</span>
                <span className="mt-auto flex items-center gap-1.5 text-[13px] font-semibold uppercase leading-none tracking-[.08em] text-fw-aqua">
                  Conocer más <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Modal
        open={!!benefit}
        onOpenChange={(o) => !o && setOpenIndex(null)}
        title={benefit?.title ?? "Beneficio"}
        description={benefit?.description}
        className="flex max-w-[560px] flex-col gap-4 overflow-visible p-8"
      >
        {benefit && BenefitIcon && (
          <>
            <Marks opacity={1} />
            <CloseButton className="absolute right-4 top-4" />
            <span className="flex h-14 w-14 items-center justify-center bg-[linear-gradient(135deg,hsl(199_89%_32%),hsl(188_94%_43%))] shadow-[0_12px_32px_-10px_hsl(188_94%_43%/.8)]">
              <BenefitIcon className="h-7 w-7 text-fw-text" strokeWidth={1.5} />
            </span>
            <h3 className="m-0 pr-10 font-display text-[34px] font-semibold leading-none">{benefit.title}</h3>
            <p className="m-0 text-[17px] leading-normal text-fw-sec">{benefit.description}</p>
            <ul className="m-0 flex list-none flex-col border-t border-[rgba(148,190,220,.14)] p-0">
              {benefit.details.map((d) => (
                <li key={d} className="flex items-start gap-3 border-b border-[rgba(148,190,220,.14)] py-3 text-[15px] leading-normal text-fw-spec">
                  <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-fw-aqua" strokeWidth={1.75} />
                  {d}
                </li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </section>
  );
};

export default About;
