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
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
          className="group fixed bottom-36 right-4 z-50 flex items-center gap-3 sm:right-6"
          aria-label="Abrir Forzecito, asistente virtual de Forzes Water"
        >
          <span className="font-chat-heading max-w-[60vw] rounded-2xl border border-border bg-card px-4 py-2.5 text-left text-sm font-semibold text-primary shadow-large sm:text-base">
            Hola, soy Forzecito. ¿Te ayudo con tus dudas?
          </span>
          <img
            src="/forzecito-icon.png"
            alt="Forzecito"
            className="h-16 w-16 flex-shrink-0 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
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
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-card bg-card shadow-soft">
                <img
                  src="/forzecito-avatar.jpg"
                  alt="Forzecito"
                  className="h-full w-full rounded-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
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
