import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Factory,
  FlaskConical,
  Ruler,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import heroImage from "@/assets/hero-water-treatment.webp";
import { useAnalytics } from "@/hooks/useAnalytics";
import "./ScrollStory.css";

type StoryCard = {
  title: string;
  detail?: string;
  emoji?: string;
};

type StoryChapter = {
  label: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  description: string;
  icon: LucideIcon;
  panelClassName: string;
  cards: [StoryCard, StoryCard];
  chips?: string[];
};

const chapters: StoryChapter[] = [
  {
    label: "Analiza",
    titleStart: "Primero, conocemos ",
    titleAccent: "tu agua",
    titleEnd: ".",
    description: "Pruebas de calidad y consultoría para saber exactamente qué necesita tu sistema.",
    icon: FlaskConical,
    panelClassName: "scroll-story__panel--analysis",
    cards: [
      { title: "Análisis de agua", emoji: "🔬" },
      { title: "Consultoría especializada" },
    ],
  },
  {
    label: "Diseña",
    titleStart: "Ingeniería ",
    titleAccent: "a tu medida",
    titleEnd: ".",
    description: "Diseñamos y fabricamos sistemas de alta eficiencia para industria, comercio y casa.",
    icon: Ruler,
    panelClassName: "scroll-story__panel--design",
    cards: [
      { title: "Capacidad", detail: "100 a 100,000 LPH" },
      { title: "Proyectos llave en mano" },
    ],
  },
  {
    label: "Instala",
    titleStart: "Plantas y equipos ",
    titleAccent: "listos para operar",
    titleEnd: ".",
    description:
      "Ósmosis inversa, filtración, ablandamiento, bombeo y plantas de agua potable o residual.",
    icon: Factory,
    panelClassName: "scroll-story__panel--installation",
    cards: [
      { title: "Cumple estándares de la OMS" },
      { title: "Técnicos certificados" },
    ],
    chips: ["Ósmosis inversa", "Filtración", "Bombeo", "Ablandamiento", "Automatización PLC"],
  },
  {
    label: "Mantén",
    titleStart: "Siempre ",
    titleAccent: "funcionando",
    titleEnd: ".",
    description: "Mantenimiento preventivo, refacciones e insumos, y soporte técnico en sitio.",
    icon: Wrench,
    panelClassName: "scroll-story__panel--maintenance",
    cards: [
      { title: "Soporte 24/7", emoji: "📞" },
      { title: "Refacciones de las mejores marcas" },
    ],
  },
];

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const getTrackPosition = (progress: number) => {
  const lastChapterIndex = chapters.length - 1;
  const scaledProgress = clamp(progress) * lastChapterIndex;
  const baseChapter = Math.min(Math.floor(scaledProgress), lastChapterIndex - 1);
  const localProgress = scaledProgress - baseChapter;

  if (localProgress <= 0.25) return baseChapter;
  if (localProgress >= 0.75) return baseChapter + 1;

  const transitionProgress = (localProgress - 0.25) / 0.5;
  const smoothstep = transitionProgress * transitionProgress * (3 - 2 * transitionProgress);
  return baseChapter + smoothstep;
};

const ScrollStory = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { trackCTAClick } = useAnalytics();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (reducedMotion) {
      track.style.transform = "none";
      return;
    }

    let animationFrame = 0;
    let sectionStart = 0;
    let scrollableDistance = 1;

    const render = () => {
      animationFrame = 0;
      const progress = clamp((window.scrollY - sectionStart) / scrollableDistance);
      const trackPosition = getTrackPosition(progress);
      const nextActiveChapter = clamp(Math.round(trackPosition), 0, chapters.length - 1);

      track.style.transform = `translate3d(${-trackPosition * 100}vw, 0, 0)`;
      setActiveChapter((current) => (current === nextActiveChapter ? current : nextActiveChapter));
    };

    const scheduleRender = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      sectionStart = section.getBoundingClientRect().top + window.scrollY;
      scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      scheduleRender();
    };

    measure();
    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", measure);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [reducedMotion]);

  const scrollToChapter = (chapterIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionStart = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight);
    const targetProgress = chapterIndex / (chapters.length - 1);

    window.scrollTo({
      top: sectionStart + scrollableDistance * targetProgress,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const scrollToSection = (sectionId: string, ctaName: string) => {
    trackCTAClick(ctaName, "Scroll Story");
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="hero" ref={sectionRef} className="scroll-story" aria-label="Cómo trabajamos">
      <h1 className="sr-only">Soluciones Profesionales de Tratamiento de Agua</h1>
      <div className="scroll-story__stage">
        <div className="scroll-story__background" aria-hidden="true">
          <img
            src={heroImage}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
          />
        </div>
        <div className="scroll-story__overlay" aria-hidden="true" />
        <div className="scroll-story__glow" aria-hidden="true" />

        <div ref={trackRef} className="scroll-story__track">
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;
            const isLastChapter = index === chapters.length - 1;

            return (
              <article
                key={chapter.label}
                id={`story-chapter-${index + 1}`}
                className={`scroll-story__panel ${chapter.panelClassName}${
                  index % 2 === 1 ? " scroll-story__panel--reversed" : ""
                }`}
                aria-labelledby={`story-title-${index + 1}`}
              >
                <div className="scroll-story__visual">
                  <div className="scroll-story__blob" aria-hidden="true" />
                  <div className="scroll-story__icon-box" aria-hidden="true">
                    <Icon className="scroll-story__icon" strokeWidth={1.75} />
                  </div>
                  {chapter.cards.map((card, cardIndex) => (
                    <div
                      key={card.title}
                      className={`scroll-story__mini-card scroll-story__mini-card--${cardIndex + 1}`}
                    >
                      <p className="scroll-story__mini-card-title">
                        {card.emoji && <span aria-hidden="true">{card.emoji} </span>}
                        {card.title}
                      </p>
                      {card.detail && <p className="scroll-story__mini-card-detail">{card.detail}</p>}
                    </div>
                  ))}
                </div>

                <div className="scroll-story__content">
                  <p className="scroll-story__eyebrow">
                    {String(index + 1).padStart(2, "0")} · {chapter.label}
                  </p>
                  <h2 id={`story-title-${index + 1}`} className="scroll-story__title">
                    {chapter.titleStart}
                    <em>{chapter.titleAccent}</em>
                    {chapter.titleEnd}
                  </h2>
                  <p className="scroll-story__description">{chapter.description}</p>

                  {chapter.chips && (
                    <ul className="scroll-story__chips" aria-label="Soluciones de instalación">
                      {chapter.chips.map((chip) => (
                        <li key={chip}>{chip}</li>
                      ))}
                    </ul>
                  )}

                  {isLastChapter && (
                    <div className="scroll-story__actions">
                      <button
                        type="button"
                        className="scroll-story__button scroll-story__button--primary"
                        onClick={() => scrollToSection("contact", "Cotiza tu proyecto")}
                      >
                        Cotiza tu proyecto
                        <ArrowRight aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="scroll-story__button scroll-story__button--outline"
                        onClick={() => scrollToSection("solutions", "Ver soluciones")}
                      >
                        Ver soluciones
                        <ArrowDown aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {!reducedMotion && (
          <nav className="scroll-story__indicator" aria-label="Capítulos de la historia">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.label}
                type="button"
                className={activeChapter === index ? "is-active" : undefined}
                onClick={() => scrollToChapter(index)}
                aria-label={`Capítulo ${index + 1}`}
                aria-current={activeChapter === index ? "step" : undefined}
              />
            ))}
          </nav>
        )}

        {!reducedMotion && (
          <div className="scroll-story__status">
            <span className="scroll-story__counter" aria-label={`Capítulo ${activeChapter + 1} de ${chapters.length}`}>
              {String(activeChapter + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </span>
            {(
              <span className="scroll-story__scroll-hint">
                <span className="scroll-story__mouse" aria-hidden="true">
                  <span />
                </span>
                {activeChapter === chapters.length - 1 ? "Sigue bajando" : "Desliza"}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollStory;
