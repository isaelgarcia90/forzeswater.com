import { Pause, Volume2 } from "lucide-react";
import { toggleNarration, useNarration } from "@/hooks/useNarration";

// Botones "Escuchar": narración del sitio generada con ElevenLabs (MP3 estático).
// Los navegadores bloquean el audio automático, así que se reproduce con un clic.

/** Escritorio: botón junto al avatar de Forzecito. */
export const NarrationPill = ({ className = "" }: { className?: string }) => {
  const { available, playing, progress } = useNarration();
  if (!available) return null;
  return (
    <button
      type="button"
      onClick={toggleNarration}
      aria-pressed={playing}
      aria-label={playing ? "Pausar narración del sitio" : "Escuchar narración del sitio"}
      className={`relative h-11 items-center gap-2 overflow-hidden border border-[hsl(174_72%_56%/.4)] bg-fw-panel px-4 text-[13px] font-semibold uppercase tracking-[.08em] text-fw-text shadow-[0_16px_40px_-18px_rgba(0,0,0,.8)] transition-colors hover:border-fw-aqua ${className}`}
    >
      {playing ? <Pause className="h-4 w-4 text-fw-aqua" strokeWidth={1.5} /> : <Volume2 className="h-4 w-4 text-fw-aqua" strokeWidth={1.5} />}
      <span>{playing ? "Pausar" : "Escuchar"}</span>
      <span aria-hidden className="absolute bottom-0 left-0 h-[2px] bg-fw-aqua transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
    </button>
  );
};

/** Móvil: ícono en la barra superior, junto a "Mi cotización" y el menú. */
export const NarrationIcon = ({ className = "" }: { className?: string }) => {
  const { available, playing, progress } = useNarration();
  if (!available) return null;
  return (
    <button
      type="button"
      onClick={toggleNarration}
      aria-pressed={playing}
      aria-label={playing ? "Pausar narración del sitio" : "Escuchar narración del sitio"}
      className={`relative flex h-11 w-11 items-center justify-center overflow-hidden border border-[hsl(174_72%_56%/.45)] bg-transparent text-fw-aqua ${playing ? "bg-[hsl(174_72%_56%/.12)]" : ""} ${className}`}
    >
      {playing ? <Pause className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <Volume2 className="h-[18px] w-[18px]" strokeWidth={1.5} />}
      <span aria-hidden className="absolute bottom-0 left-0 h-[2px] bg-fw-aqua transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
    </button>
  );
};
