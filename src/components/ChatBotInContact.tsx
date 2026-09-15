import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useChatBot } from "@/hooks/useChatBot";
import ChatMessages from "./ChatMessages";

const ChatBotInContact = () => {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useChatBot();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialized = useRef(false);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (hasInteracted.current && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!initialized.current && messages.length === 0) {
      initialized.current = true;
      sendMessage("Hola");
    }
  }, []);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    hasInteracted.current = true;
    setInput("");
    sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="p-0 bg-card border-border overflow-hidden flex flex-col h-[480px]">
      {/* Header */}
      <div className="bg-gradient-primary text-white px-4 py-3 flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm font-bold">
          FW
        </div>
        <div>
          <p className="font-bold text-sm">Asistente IA de Forzes Water</p>
          <p className="text-xs text-white/80">Respuestas en tiempo real</p>
        </div>
      </div>

      {/* Messages */}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        onQuickAction={sendMessage}
        onEmailSubmit={(email) => sendMessage(`Mi correo electrónico es: ${email}`)}
      />

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
    </Card>
  );
};

export default ChatBotInContact;
