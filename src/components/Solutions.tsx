import { SYSTEMS, waUrl } from "@/data/landing";
import { openForzecito } from "@/context/LandingContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Eyebrow } from "./fw";

const STEPS = ["Análisis", "Diseño", "Instalación", "Mantenimiento"];

const Solutions = () => {
  const { trackContactClick } = useAnalytics();

  return (
    <section id="sistemas" className="scroll-mt-[68px] border-t border-[rgba(148,190,220,.1)] bg-fw-alt">
      <div className="fw-container fw-section flex flex-col gap-11">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-[18px]">
            <Eyebrow>03 · Sistemas y proyectos</Eyebrow>
            <h2 className="fw-h2">Elige lo que necesitas. Nosotros nos encargamos de todo el proceso.</h2>
          </div>
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm font-medium leading-none text-fw-nav">
            {STEPS.map((s, i) => (
              <li key={s} className="contents">
                <span className="border border-[rgba(148,190,220,.2)] px-3 py-2">{s}</span>
                {i < STEPS.length - 1 && <span aria-hidden className="text-fw-cyan">→</span>}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-[18px]">
          {SYSTEMS.map((s) => (
            <article
              key={s.code}
              className="fw-card flex flex-col transition-all duration-300 hover:border-[hsl(174_72%_56%/.55)] hover:shadow-[0_0_0_1px_hsl(174_72%_56%/.2),0_24px_60px_-24px_hsl(174_72%_56%/.5)]"
            >
              <div className="relative h-[190px] overflow-hidden border-b border-[rgba(148,190,220,.14)]">
                <img src={s.img} alt={s.title} loading="lazy" className="fw-duotone h-full w-full object-cover [filter:grayscale(1)_contrast(1.1)_brightness(.85)]" />
                <div className="fw-duotone-layer" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,#17232e_0%,rgba(23,35,46,0)_60%)]" />
                <span className="absolute left-3.5 top-3.5 border border-[rgba(148,190,220,.2)] bg-[rgba(13,21,29,.85)] px-2 py-[5px] text-[11px] font-semibold leading-none tracking-[.16em] text-fw-aqua">
                  {s.code}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3.5 px-[22px] pb-6 pt-[22px]">
                <h3 className="m-0 font-display text-[26px] font-semibold leading-[1.05]">{s.title}</h3>
                <p className="m-0 text-[15px] leading-normal text-fw-ter">{s.summary}</p>
                <ul className="m-0 flex list-none flex-col border-t border-[rgba(148,190,220,.12)] p-0">
                  {s.specs.map((sp) => (
                    <li key={sp} className="flex items-center gap-2.5 border-b border-[rgba(148,190,220,.12)] py-[9px] text-sm font-medium leading-[1.3] text-fw-spec">
                      <span aria-hidden className="h-[5px] w-[5px] flex-none bg-fw-aqua" />
                      {sp}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-2 pt-1.5">
                  <a
                    href={waUrl(`Hola, me interesa una cotización de: ${s.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactClick(`WhatsApp - Sistema ${s.code}`)}
                    className="fw-btn-cyan h-[42px] flex-1 text-sm"
                  >
                    Cotizar
                  </a>
                  <button
                    type="button"
                    onClick={() => openForzecito(`¿Me explicas el sistema de ${s.title.toLowerCase()}?`)}
                    className="fw-btn-outline h-[42px] flex-1 text-sm"
                  >
                    Preguntar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
