import { useState, useRef, useEffect } from "react";
import { RefreshCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { useChatBot } from "@/hooks/useChatBot";
import ChatMessages from "./ChatMessages";


const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage, resetChat, submitContact, leadSaved } = useChatBot();
  const [showReturnPrompt, setShowReturnPrompt] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingOn, setGreetingOn] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const greetingState = useRef({ introduced: false, repeats: 0, shownAt: 0 });

  // Reinicia el saludo cuando Forzecito se oculta (regreso a la portada)
  useEffect(() => {
    if (!isVisible) {
      greetingState.current = { introduced: false, repeats: 0, shownAt: 0 };
      setGreetingOn(false);
    }
  }, [isVisible]);

  // Primera aparición al entrar en la zona del saludo; se esconde a los 6 s
  useEffect(() => {
    const st = greetingState.current;
    if (!showGreeting || st.introduced) return;
    st.introduced = true;
    st.shownAt = Date.now();
    setGreetingOn(true);
    const t = window.setTimeout(() => setGreetingOn(false), 6000);
    return () => window.clearTimeout(t);
  }, [showGreeting]);

  // Oculta al desplazarse y reaparece tras ~4 s de pausa (máx. 3 veces)
  useEffect(() => {
    if (!showGreeting) return;
    let idle = 0;
    let hide = 0;
    const onScroll = () => {
      const st = greetingState.current;
      if (Date.now() - st.shownAt > 800) setGreetingOn(false);
      window.clearTimeout(idle);
      window.clearTimeout(hide);
      idle = window.setTimeout(() => {
        if (st.repeats >= 3) return;
        st.repeats += 1;
        st.shownAt = Date.now();
        setGreetingOn(true);
        hide = window.setTimeout(() => setGreetingOn(false), 5000);
      }, 4000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
      window.clearTimeout(hide);
    };
  }, [showGreeting]);

  const greetingVisible = showGreeting && greetingOn;

  useEffect(() => {
    let animationFrame = 0;

    const updateLauncher = () => {
      animationFrame = 0;
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const aboutTop = aboutSection.getBoundingClientRect().top;
      setIsVisible(aboutTop <= window.innerHeight);
      setShowGreeting(aboutTop <= window.innerHeight * 0.7);
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateLauncher);
    };

    updateLauncher();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setShowReturnPrompt(messages.length > 0);
    setIsOpen(true);
  };

  const handleContinueConversation = () => {
    setShowReturnPrompt(false);
  };

  const handleStartNewConversation = () => {
    resetChat(true);
    setShowReturnPrompt(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className={`group fixed bottom-24 right-4 z-50 flex items-center transition-all duration-500 ease-out motion-reduce:transition-none sm:right-6 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "pointer-events-none invisible translate-y-4 opacity-0"
          }`}
          aria-label="Abrir Forzecito, asistente virtual de Forzes Water"
          aria-hidden={!isVisible}
          tabIndex={isVisible ? 0 : -1}
        >
          <span
            aria-hidden={!greetingVisible}
            className={`overflow-hidden transition-all duration-500 ease-out motion-reduce:transition-none ${
              greetingVisible
                ? "mr-3 max-w-[calc(100vw-7rem)] opacity-100 sm:max-w-[22rem]"
                : "mr-0 max-w-0 opacity-0"
            }`}
          >
            <span className="font-chat-heading block w-max rounded-2xl border border-border bg-card px-4 py-2.5 text-left text-sm font-semibold text-primary shadow-large sm:text-base">
              <span className="block whitespace-nowrap">Hola, soy Forzecito.</span>
              <span className="block whitespace-nowrap">¿Tienes dudas?</span>
            </span>
          </span>
          <img
            src="/forzecito-icon.png"
            alt="Forzecito"
            className="h-16 w-16 flex-shrink-0 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none sm:h-20 sm:w-20"
            loading="eager"
            decoding="async"
          />
        </button>
      )}



      {/* Chat Window */}
      {isOpen && (
        <section
          aria-label="Forzecito, asistente virtual de Forzes Water"
          className="font-chat fixed inset-x-2 bottom-3 z-50 flex h-[min(660px,calc(100dvh-1.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-large animate-scale-in sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[620px] sm:w-[400px]"
        >
          {/* Header */}
          <div className="bg-gradient-primary px-4 py-4 text-primary-foreground flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src="/forzecito-icon-no-dot.png"
                alt="Forzecito"
                className="h-10 w-10 flex-shrink-0 object-contain drop-shadow-soft"
                loading="eager"
                decoding="async"
              />
              <div>
                <p className="font-chat-heading text-base font-bold leading-tight">Forzecito</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-primary-foreground/90">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  Asistente virtual de Forzes Water
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleStartNewConversation}
                className="h-9 w-9 text-primary-foreground hover:bg-card/15 hover:text-primary-foreground"
                aria-label="Nueva conversación"
                title="Nueva conversación"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-9 w-9 text-primary-foreground hover:bg-card/15 hover:text-primary-foreground"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            onQuickAction={sendMessage}
            onContactSubmit={submitContact}
            contactSaved={leadSaved}
            showReturnPrompt={showReturnPrompt}
            onContinueConversation={handleContinueConversation}
            onStartNewConversation={handleStartNewConversation}
            onOtherQuestion={() => inputRef.current?.focus()}
          />

          {/* Input */}
          <div className="flex-shrink-0 border-t border-border bg-card p-3">
            <PromptInput
              onSubmit={({ text }) => {
                const nextMessage = text.trim();
                if (!nextMessage || isLoading) return;
                setInput("");
                sendMessage(nextMessage);
              }}
              className="rounded-lg border-border bg-muted/60 shadow-none"
            >
              <PromptInputTextarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="max-h-28 min-h-12 px-4 py-3 text-sm"
              disabled={isLoading}
              aria-label="Mensaje para el asistente"
              />
              <PromptInputFooter className="justify-end px-2 pb-2 pt-0">
                <PromptInputSubmit
                  aria-label="Enviar mensaje"
                  status={isLoading ? "submitted" : "ready"}
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </section>
      )}
    </>
  );
};

export default ChatBot;
