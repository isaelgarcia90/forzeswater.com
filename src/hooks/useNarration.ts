import { useEffect, useSyncExternalStore } from "react";

const SRC = "/audio/narracion-forzes.mp3";

type State = { available: boolean; playing: boolean; progress: number };

// Un solo <audio> compartido por los botones "Escuchar" del header (móvil) y junto a Forzecito (escritorio)
let state: State = { available: false, playing: false, progress: 0 };
let audio: HTMLAudioElement | null = null;
let checked = false;
const listeners = new Set<() => void>();

const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

function init() {
  if (checked || typeof window === "undefined") return;
  checked = true;
  // Solo se muestra si el MP3 existe (en Vercel una ruta inexistente responde index.html)
  fetch(SRC, { method: "HEAD" })
    .then((r) => set({ available: r.ok && (r.headers.get("content-type") ?? "").includes("audio") }))
    .catch(() => set({ available: false }));
}

function getAudio() {
  if (audio) return audio;
  audio = new Audio(SRC);
  audio.preload = "none";
  audio.addEventListener("play", () => set({ playing: true }));
  audio.addEventListener("pause", () => set({ playing: false }));
  audio.addEventListener("ended", () => set({ playing: false, progress: 0 }));
  audio.addEventListener("timeupdate", () => {
    const a = audio!;
    set({ progress: a.duration ? a.currentTime / a.duration : 0 });
  });
  return audio;
}

export function toggleNarration() {
  const a = getAudio();
  if (a.paused) void a.play().catch(() => set({ playing: false }));
  else a.pause();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useNarration() {
  useEffect(init, []);
  return useSyncExternalStore(subscribe, () => state, () => state);
}
