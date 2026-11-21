import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-water-treatment.webp";
import { CHAPTERS } from "@/data/landing";
import { Marks } from "./fw";
import { cn } from "@/lib/utils";

const HEADER_H = 68;

/** Hero "scroll story": 4 capítulos que avanzan con el scroll dentro de una sección de 420vh. */
const ScrollStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      // El bloque fijo queda debajo del header: recorre de (top - 68) a (top + alto - innerHeight)
      const start = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
      const dist = Math.max(1, el.offsetHeight - window.innerHeight + HEADER_H);
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / dist));
      if (Math.abs(p - progressRef.current) > 0.002 || p === 0 || p === 1) {
        progressRef.current = p;
        setProgress(p);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(3, Math.max(0, Math.round(progress * 3)));
  const current = CHAPTERS[active];
  const Icon = current.icon;

  const goChapter = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
    const dist = el.offsetHeight - window.innerHeight + HEADER_H;
    window.scrollTo({ top: start + dist * (i / 3) + 2, behavior: "smooth" });
  };

  return (
    <section id="inicio" ref={sectionRef} aria-label="Nuestro proceso" className="relative h-[420vh]">
      {/* Se fija debajo del header (68px) para que el rail de progreso quede visible desde el inicio */}
      <div className="sticky top-[68px] flex h-[calc(100svh-68px)] min-h-0 flex-col overflow-hidden">
        {/* Fondo */}
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <img
            src={heroImg}
            alt=""
            className="absolute -inset-[4%] h-[108%] w-[108%] max-w-none object-cover opacity-[.32] [filter:grayscale(1)_brightness(.55)_contrast(1.15)]"
            style={{ transform: `translate3d(${(-progress * 3).toFixed(2)}%,0,0) scale(1.04)` }}
          />
          <div className="absolute inset-0 bg-fw-deep opacity-90 mix-blend-color" />
          <div className="absolute inset-0 [background:linear-gradient(90deg,#111a22_0%,rgba(17,26,34,.92)_38%,rgba(17,26,34,.55)_100%),linear-gradient(0deg,#111a22_0%,rgba(17,26,34,0)_30%)]" />
          <div className="absolute inset-0 [background:radial-gradient(circle_at_78%_42%,hsl(188_94%_43%/.20)_0%,transparent_42%),radial-gradient(circle_at_6%_100%,hsl(199_89%_32%/.35)_0%,transparent_46%)]" />
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(148,190,220,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,190,220,.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(90deg,transparent_0%,#000_45%,#000_100%)]" />
        </div>

        <div className="fw-container relative grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] items-center gap-[clamp(20px,4vw,64px)] pt-[clamp(12px,4vh,56px)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
          <div className="flex flex-col gap-[clamp(10px,2.4vh,22px)]">
            <h1 className="m-0 flex items-center gap-3 text-xs font-semibold uppercase leading-none tracking-[.2em] text-fw-ter">
              <span aria-hidden className="h-px w-7 bg-fw-cyan" />
              Ingeniería en tratamiento de agua · CDMX
            </h1>

            <div className="relative min-h-[clamp(250px,44vh,330px)] md:min-h-[clamp(200px,40vh,330px)]">
              {CHAPTERS.map((ch, i) => (
                <article
                  key={ch.n}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 flex flex-col gap-[18px] motion-reduce:!transition-none",
                    i === active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                  )}
                  style={{
                    transform: `translateY(${(i - active) * 28}px)`,
                    transition: "opacity .55s ease, transform .7s cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  <p className="m-0 text-[13px] font-semibold uppercase leading-none tracking-[.18em] text-fw-aqua">
                    {ch.n} / 04 · {ch.label}
                  </p>
                  <h2 className="m-0 font-display text-[clamp(32px,min(6.2vw,8.5vh),84px)] font-semibold leading-[.95] tracking-[-.015em] [text-wrap:balance]">
                    {ch.t1}
                    <span className="bg-[linear-gradient(100deg,hsl(188_94%_43%),hsl(174_72%_56%))] bg-clip-text text-transparent">{ch.acc}</span>
                    {ch.t2}
                  </h2>
                  <p className="m-0 max-w-[480px] text-[clamp(15px,2.4vh,18px)] leading-normal text-fw-sec [text-wrap:pretty]">{ch.desc}</p>
                  {ch.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {ch.chips.map((chip) => (
                        <span key={chip} className="border border-[hsl(188_94%_43%/.35)] bg-[hsl(188_94%_43%/.08)] px-2.5 py-1.5 text-[13px] font-medium leading-none text-[#d9f5f8]">
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Mini-tarjetas en móvil */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              {current.cards.map((c) => (
                <div key={c.k} className="flex flex-col gap-[5px] border border-[rgba(148,190,220,.18)] bg-[rgba(13,21,29,.82)] px-3 py-2.5">
                  <span className="text-[10px] font-semibold uppercase leading-none tracking-[.18em] text-fw-label">{c.k}</span>
                  <span className="font-display text-[15px] font-semibold leading-[1.15] text-fw-text">{c.v}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              <a href="#contacto" className="fw-btn-cyan relative h-[clamp(44px,6.5vh,52px)] flex-[1_1_140px] gap-2.5 px-6 text-base duration-[250ms] hover:shadow-cta-hover md:flex-none">
                <Marks corners="diagonal" />
                Cotiza tu proyecto
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
              <a href="#sistemas" className="fw-btn-outline h-[clamp(44px,6.5vh,52px)] flex-[1_1_140px] border-[rgba(148,190,220,.28)] px-[22px] text-base md:flex-none">
                Ver sistemas
              </a>
            </div>
          </div>

          {/* Panel esquemático (escritorio) */}
          <div aria-hidden className="relative hidden aspect-square w-[min(100%,58vh,500px)] justify-self-center border border-[rgba(148,190,220,.18)] bg-[rgba(17,28,38,.55)] backdrop-blur-[6px] [container-type:inline-size] md:block">
            <Marks opacity={0.8} />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(148,190,220,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,190,220,.07)_1px,transparent_1px)] [background-size:25%_25%]" />
            <div className="absolute left-[18px] right-[18px] top-4 flex justify-between text-[11px] font-semibold uppercase leading-none tracking-[.18em] text-fw-label">
              <span>Fase {current.n} / 04</span>
              <span className="text-fw-aqua">Progreso {String(Math.round(progress * 100)).padStart(2, "0")}%</span>
            </div>
            <div className="absolute inset-x-0 bottom-[34%] top-0 flex items-center justify-center">
              <span className="absolute font-display text-[60cqw] font-bold leading-none tracking-[-.04em] text-transparent [-webkit-text-stroke:1px_hsl(188_94%_43%/.28)]">
                {current.n}
              </span>
              <div className="relative flex h-[26cqw] w-[26cqw] items-center justify-center bg-gradient-brand shadow-[0_0_0_1px_hsl(174_72%_56%/.4),0_30px_80px_-14px_hsl(188_94%_43%/.75)] transition-transform duration-500">
                <Icon className="h-[46%] w-[46%] text-fw-text" strokeWidth={1.25} />
              </div>
            </div>
            <div className="absolute bottom-[4cqw] left-[4cqw] right-[4cqw] grid grid-cols-2 gap-[2cqw]">
              {current.cards.map((c) => (
                <div key={c.k} className="flex flex-col gap-[5px] border border-[rgba(148,190,220,.18)] bg-[rgba(13,21,29,.88)] px-[clamp(10px,3cqw,14px)] py-[clamp(8px,2.6cqw,14px)]">
                  <span className="text-[10px] font-semibold uppercase leading-none tracking-[.18em] text-fw-label">{c.k}</span>
                  <span className="font-display text-[clamp(13px,4cqw,17px)] font-semibold leading-[1.15] text-fw-text">{c.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rail de progreso */}
        <div className="fw-container relative pb-[clamp(12px,2.6vh,26px)] pt-[clamp(10px,2.4vh,22px)]">
          <div className="relative mb-3 h-px bg-[rgba(148,190,220,.18)]">
            <div
              className="absolute left-0 top-0 h-px bg-[linear-gradient(90deg,hsl(199_89%_32%),hsl(188_94%_43%),hsl(174_72%_56%))] shadow-[0_0_12px_hsl(188_94%_43%)]"
              style={{ width: `${(progress * 100).toFixed(1)}%` }}
            />
          </div>
          <div className="grid grid-cols-[auto_auto_auto_minmax(0,1fr)] gap-3 md:grid-cols-4">
            {CHAPTERS.map((ch, i) => (
              <button
                key={ch.n}
                type="button"
                onClick={() => goChapter(i)}
                aria-label={`Ir a ${ch.label}`}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "flex items-baseline gap-2.5 border-0 bg-transparent p-0 text-left transition-colors duration-300 hover:text-fw-text",
                  i <= active ? "text-fw-text" : "text-fw-dim2"
                )}
              >
                <span className="font-display text-[13px] font-semibold leading-none tracking-[.1em]">{ch.n}</span>
                <span className={cn("text-[13px] font-medium leading-[1.25]", i === active ? "inline" : "hidden md:inline")}>{ch.step}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStory;
