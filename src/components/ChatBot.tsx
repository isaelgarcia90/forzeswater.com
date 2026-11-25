import { useEffect, useRef, useState } from "react";
import { RefreshCcw, X } from "lucide-react";
import forzecito from "@/assets/forzecito.webp";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { useChatBot } from "@/hooks/useChatBot";
import { useLanding } from "@/context/LandingContext";
import ChatMessages from "./ChatMessages";
import { NarrationPill } from "./Narration";

const LAUNCHER_DELAY_MS = 3000; // Forzecito aparece a los 3 s
const FIRST_GREETING_DELAY_MS = 2000; // el saludo, 2 s después
const GREETING_VISIBLE_MS = 5000; // dura 5 s
const WELCOME_VISIBLE_MS = 6000; // la bienvenida inicial dura 6 s
const AFTER_WELCOME_MS = 2000; // pausa antes del saludo normal
const IDLE_GREETING_MS = 3000; // reaparece tras 3 s sin scroll
const MAX_GREETINGS = 3; // por visita (se reinicia al volver al inicio)
const QUICK_REPLIES = ["Quiero cotizar", "¿Qué sistema necesito?", "Tiempos de entrega", "Lista de precios", "Hablar con un asesor"];

/** Forzecito: asistente flotante. La conversación real vive en useChatBot (Supabase + IA). */
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage, resetChat, submitContact, leadSaved } = useChatBot();
  const [showReturnPrompt, setShowReturnPrompt] = useState(false);
  const [launcherVisible, setLauncherVisible] = useState(false);
  const [greetOn, setGreetOn] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pendingRef = useRef<string | null>(null);
  const { quoteOpen, ficha, gate, menuOpen } = useLanding();
  // Se oculta mientras hay un modal, la lista de cotización o el menú móvil abiertos
  const overlayOpen = quoteOpen || !!ficha || gate.open || menuOpen;

  // Estado del saludo que leen los listeners sin volver a registrarse
  const greetState = useRef({ count: 0, introduced: false, hideTimer: 0, blocked: false });
  greetState.current.blocked = isOpen || overlayOpen;

  const hideGreeting = () => {
    window.clearTimeout(greetState.current.hideTimer);
    greetState.current.introduced = true;
    setGreetOn(false);
    setWelcome(false);
  };

  /** Muestra el saludo 5 s (máximo 3 veces por visita). */
  const tryGreet = () => {
    const st = greetState.current;
    if (st.blocked || st.count >= MAX_GREETINGS) return;
    st.count += 1;
    setWelcome(false);
    setGreetOn(true);
    window.clearTimeout(st.hideTimer);
    st.hideTimer = window.setTimeout(() => setGreetOn(false), GREETING_VISIBLE_MS);
  };
  const tryGreetRef = useRef(tryGreet);
  tryGreetRef.current = tryGreet;

  // Forzecito aparece a los 3 s; 2 s después dice "¡Hola!, Bienvenido a Forzes Water" (6 s),
  // desaparece y, tras 2 s, muestra el saludo normal.
  // Luego reaparece tras 3 s sin scroll; el contador se reinicia al volver al inicio.
  useEffect(() => {
    const st = greetState.current;
    let idle = 0;
    const tLauncher = window.setTimeout(() => setLauncherVisible(true), LAUNCHER_DELAY_MS);
    let tAfter = 0;
    const tFirst = window.setTimeout(() => {
      if (st.blocked) {
        st.introduced = true;
        return;
      }
      setWelcome(true);
      setGreetOn(true);
      st.hideTimer = window.setTimeout(() => {
        setGreetOn(false);
        tAfter = window.setTimeout(() => {
          st.introduced = true;
          tryGreetRef.current();
        }, AFTER_WELCOME_MS);
      }, WELCOME_VISIBLE_MS);
    }, LAUNCHER_DELAY_MS + FIRST_GREETING_DELAY_MS);

    const onScroll = () => {
      window.clearTimeout(idle);
      if (window.scrollY <= 2) st.count = 0;
      if (!st.introduced) return;
      idle = window.setTimeout(() => tryGreetRef.current(), IDLE_GREETING_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(tLauncher);
      window.clearTimeout(tFirst);
      window.clearTimeout(tAfter);
      window.clearTimeout(idle);
      window.clearTimeout(st.hideTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus({ preventScroll: true });
  }, [isOpen, isLoading]);

  // Envía una pregunta que llegó mientras el asistente estaba ocupado
  useEffect(() => {
    if (!isLoading && pendingRef.current) {
      const q = pendingRef.current;
      pendingRef.current = null;
      sendMessage(q);
    }
  }, [isLoading, sendMessage]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setShowReturnPrompt(false);
    if (isLoading) {
      pendingRef.current = t;
      return;
    }
    setInput("");
    sendMessage(t);
  };

  const open = () => {
    setShowReturnPrompt(messages.length > 0);
    hideGreeting();
    setIsOpen(true);
  };

  // Otras secciones abren a Forzecito con window.dispatchEvent(new CustomEvent("open-forzecito", { detail }))
  useEffect(() => {
    const onOpenRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string; send?: boolean } | undefined>).detail;
      const message = detail?.message?.trim();
      hideGreeting();
      setLauncherVisible(true);
      setIsOpen(true);
      if (message && detail?.send) {
        send(message);
      } else if (message) {
        setShowReturnPrompt(false);
        setInput(message);
      } else {
        setShowReturnPrompt(messages.length > 0);
      }
    };
    window.addEventListener("open-forzecito", onOpenRequest);
    return () => window.removeEventListener("open-forzecito", onOpenRequest);
  });

  const startNew = () => {
    resetChat(true);
    setShowReturnPrompt(false);
  };

  const showGreeting = greetOn && launcherVisible && !isOpen;

  // Con un modal, la lista de cotización o el menú móvil abiertos, Forzecito se oculta
  if (overlayOpen && !isOpen) return null;

  return (
    <div className="fixed bottom-[clamp(14px,2.4vw,28px)] right-[clamp(14px,2.4vw,28px)] z-[95] flex flex-col items-end gap-2.5">
      {isOpen && (
        <section
          aria-label="Forzecito, asistente técnico de Forzes Water"
          className="flex h-[min(calc(100dvh-140px),580px)] w-[min(calc(100vw-28px),390px)] flex-col overflow-hidden border border-[hsl(174_72%_56%/.4)] bg-fw-panel shadow-[0_40px_100px_-30px_rgba(0,0,0,.8),0_0_70px_-30px_hsl(174_72%_56%/.7)] animate-scale-in [transform-origin:bottom_right]"
        >
          <div className="flex flex-none items-center gap-3 border-b border-[rgba(148,190,220,.16)] px-4 py-3.5 [background:linear-gradient(120deg,hsl(199_89%_32%/.55),hsl(174_72%_56%/.18))]">
            <span className="relative flex-none">
              <img src={forzecito} alt="" className="block h-11 w-11 rounded-full" />
              <span aria-hidden className="absolute bottom-px right-0 h-[11px] w-[11px] rounded-full border-2 border-[#16303f] bg-fw-online" />
            </span>
            <span className="flex flex-1 flex-col gap-[3px]">
              <span className="font-display text-xl font-semibold leading-none">Forzecito</span>
              <span className="text-xs leading-none text-fw-nav">Asistente técnico de Forzes Water</span>
            </span>
            <button
              type="button"
              onClick={startNew}
              aria-label="Nueva conversación"
              title="Nueva conversación"
              className="flex h-[34px] w-[34px] items-center justify-center border border-[rgba(243,239,230,.25)] bg-transparent text-fw-text transition-colors hover:border-fw-aqua"
            >
              <RefreshCcw className="h-[15px] w-[15px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
              className="flex h-[34px] w-[34px] items-center justify-center border border-[rgba(243,239,230,.25)] bg-transparent text-fw-text transition-colors hover:border-fw-aqua"
            >
              <X className="h-[15px] w-[15px]" strokeWidth={1.5} />
            </button>
          </div>

          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            onQuickAction={send}
            onContactSubmit={submitContact}
            contactSaved={leadSaved}
            showReturnPrompt={showReturnPrompt}
            onContinueConversation={() => setShowReturnPrompt(false)}
            onStartNewConversation={startNew}
            onOtherQuestion={() => inputRef.current?.focus()}
          />

          <div className="no-scrollbar flex flex-none gap-1.5 overflow-x-auto border-t border-[rgba(148,190,220,.12)] px-3 pt-2.5" aria-label="Respuestas rápidas">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="flex-none whitespace-nowrap border border-[rgba(148,190,220,.2)] bg-fw-bubble px-[11px] py-[7px] text-[13px] font-medium leading-[1.2] text-fw-spec transition-colors hover:border-fw-aqua"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex-none p-3">
            <PromptInput
              onSubmit={({ text }) => send(text)}
              className="rounded-none border-[rgba(148,190,220,.22)] bg-fw-input shadow-none"
            >
              <PromptInputTextarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Escribe tu duda técnica…"
                className="max-h-28 min-h-11 px-3 py-2.5 text-[15px]"
                aria-label="Mensaje para Forzecito"
              />
              <PromptInputFooter className="justify-end px-2 pb-2 pt-0">
                <PromptInputSubmit
                  aria-label="Enviar mensaje"
                  status={isLoading ? "submitted" : "ready"}
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 rounded-none bg-fw-aqua text-fw-ink hover:bg-[hsl(188_94%_50%)]"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </section>
      )}

      {/* Saludo compacto sobre el avatar, como en la versión original */}
      {showGreeting && (
        <div
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
          className="relative cursor-pointer border border-[hsl(174_72%_56%/.45)] bg-fw-card py-2 pl-3 pr-7 text-left shadow-[0_16px_40px_-18px_rgba(0,0,0,.8),0_0_30px_-14px_hsl(174_72%_56%/.7)] animate-rise-in"
        >
          {welcome ? (
            <span className="block whitespace-nowrap font-display text-[15px] font-semibold leading-tight">¡Hola!, Bienvenido a Forzes Water</span>
          ) : (
            <>
              <span className="block whitespace-nowrap font-display text-[15px] font-semibold leading-tight">Hola, soy Forzecito.</span>
              <span className="block whitespace-nowrap text-[13px] leading-snug text-fw-aqua">¿Tienes dudas?</span>
            </>
          )}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); hideGreeting(); }}
            aria-label="Cerrar saludo"
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center border-0 bg-transparent text-fw-label hover:text-fw-text"
          >
            <X className="h-3 w-3" strokeWidth={1.5} />
          </button>
          {/* Pico apuntando al avatar */}
          <span aria-hidden className="absolute -bottom-[6px] right-6 h-2.5 w-2.5 rotate-45 border-b border-r border-[hsl(174_72%_56%/.45)] bg-fw-card" />
        </div>
      )}

      <div className="flex items-center gap-3">
      {/* Escritorio: "Escuchar" junto al avatar; en móvil vive en la barra superior */}
      {launcherVisible && !isOpen && <NarrationPill className="hidden animate-fade-in nav:flex" />}
      <button
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        aria-label={isOpen ? "Cerrar Forzecito" : "Abrir Forzecito, asistente técnico de Forzes Water"}
        aria-expanded={isOpen}
        aria-hidden={!launcherVisible}
        tabIndex={launcherVisible ? 0 : -1}
        className={`relative h-[60px] w-[60px] rounded-full border-2 border-fw-aqua bg-fw-card p-0 shadow-[0_0_0_6px_hsl(174_72%_56%/.12),0_16px_40px_-10px_hsl(174_72%_56%/.7)] transition-all duration-500 hover:scale-[1.06] motion-reduce:transition-none md:h-[66px] md:w-[66px] ${
          launcherVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <img src={forzecito} alt="" width={66} height={66} className="block h-full w-full rounded-full" />
        <span aria-hidden className="absolute bottom-1 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-fw-bg bg-fw-online" />
      </button>
      </div>
    </div>
  );
};

export default ChatBot;
