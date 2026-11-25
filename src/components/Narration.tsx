import { useEffect, useRef, useState } from "react";
import { Pause, Volume2 } from "lucide-react";
import { useLanding } from "@/context/LandingContext";

const SRC = "/audio/narracion-forzes.mp3";

// Botón "Escuchar": narración del sitio generada con ElevenLabs (MP3 estático).
// Los navegadores bloquean el audio automático, así que se reproduce con un clic.
const Narration = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hint, setHint] = useState(false);
  const { quoteOpen, ficha, gate, menuOpen } = useLanding();
  const overlayOpen = quoteOpen || !!ficha || gate.open || menuOpen;

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.src = SRC;
    audioRef.current = audio;
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    // Solo se muestra si el MP3 existe
    fetch(SRC, { method: "HEAD" })
      .then((r) => setAvailable(r.ok && (r.headers.get("content-type") ?? "").includes("audio")))
      .catch(() => setAvailable(false));

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  // Invitación breve al entrar
  useEffect(() => {
    if (!available) return;
    const show = window.setTimeout(() => setHint(true), 1800);
    const hide = window.setTimeout(() => setHint(false), 9000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [available]);

  if (!available || overlayOpen) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHint(false);
    if (audio.paused) void audio.play().catch(() => setPlaying(false));
    else audio.pause();
  };

  return (
    <div className="fixed bottom-[clamp(14px,2.4vw,28px)] left-[clamp(14px,2.4vw,28px)] z-[94] flex items-center gap-2.5">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pausar narración del sitio" : "Escuchar narración del sitio"}
        className="relative flex h-12 items-center gap-2 overflow-hidden border border-[hsl(174_72%_56%/.4)] bg-fw-panel px-4 text-sm font-semibold uppercase tracking-[.08em] text-fw-text shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)] transition-colors hover:border-fw-aqua"
      >
        {playing ? (
          <Pause className="h-4 w-4 text-fw-aqua" strokeWidth={1.5} />
        ) : (
          <Volume2 className="h-4 w-4 text-fw-aqua" strokeWidth={1.5} />
        )}
        <span>{playing ? "Pausar" : "Escuchar"}</span>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] bg-fw-aqua transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </button>
      {hint && !playing && (
        <span className="hidden border border-[rgba(148,190,220,.18)] bg-fw-panel px-3 py-2 text-[13px] leading-snug text-fw-sec animate-fade-in sm:block">
          ¿Prefieres escuchar? Te contamos el sitio en 1 minuto.
        </span>
      )}
    </div>
  );
};

export default Narration;
