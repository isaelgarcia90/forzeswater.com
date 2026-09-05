import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatBot } from "@/hooks/useChatBot";
import ChatMessages from "./ChatMessages";


const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage, resetChat } = useChatBot();
  const inputRef = useRef<HTMLInputElement>(null);

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
    setIsOpen(true);
    if (messages.length === 0) {
      sendMessage("Hola");
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-36 right-6 z-50 w-14 h-14 bg-white border-2 border-primary rounded-full shadow-large flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Abrir chat con asistente IA"
        >
          <img
            src="/chatbot-icon.png"
            alt="Forzes Water"
            className="h-8 w-8 object-contain"
            loading="eager"
            decoding="async"
          />
          <span className="absolute right-full mr-3 bg-card text-foreground px-3 py-2 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm border border-border hidden md:block">
            ¿Dudas? Te asesoramos
          </span>
        </button>
      )}


      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-12rem)] bg-card border border-border rounded-2xl shadow-large flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-primary text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <img
                src="/chatbot-icon.png"
                alt="Forzes Water"
                className="h-8 w-8 object-contain rounded-lg bg-white/20"
                loading="eager"
                decoding="async"
              />
              <div>
                <p className="font-bold text-sm">Forzes Water</p>
                <p className="text-xs text-white/80">Resolvemos tus dudas</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { resetChat(); handleClose(); }}
                className="h-8 w-8 text-white hover:bg-white/20"
                aria-label="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ChatMessages messages={messages} isLoading={isLoading} />

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2 flex-shrink-0">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="bg-gradient-primary flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
