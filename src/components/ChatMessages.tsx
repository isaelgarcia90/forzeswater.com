import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, Mail, ChevronRight } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "email_form";
};

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onEmailSubmit?: (email: string) => void;
}

const EmailFormCard = ({ reason, onSubmit, disabled }: { reason: string; onSubmit: (email: string) => void; disabled: boolean }) => {
  const [email, setEmail] = useState("");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 space-y-3 w-full">
      <p className="text-sm leading-relaxed text-justify">{reason}</p>
      <div className="bg-card border border-border rounded-xl p-3 space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="text-xs font-medium">Te podemos avisar por correo electrónico</span>
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (valid && !disabled) onSubmit(email.trim());
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@ejemplo.com"
            disabled={disabled}
            className="flex-1 min-w-0 rounded-md border border-input bg-muted px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!valid || disabled}
            className="bg-gradient-primary text-white rounded-md px-3 flex items-center justify-center disabled:opacity-50"
            aria-label="Enviar correo"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

const ChatMessages = ({ messages, isLoading, onEmailSubmit }: ChatMessagesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastEmailFormIndex = messages.map((m) => m.type === "email_form").lastIndexOf(true);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.map((msg, i) => {
        if (msg.type === "email_form" && msg.role === "assistant") {
          return (
            <div key={i} className="flex justify-start">
              <div className="max-w-[85%] w-full">
                <EmailFormCard
                  reason={msg.content}
                  disabled={i !== lastEmailFormIndex}
                  onSubmit={(email) => onEmailSubmit?.(email)}
                />
              </div>
            </div>
          );
        }

        return (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-justify ${
                msg.role === "user"
                  ? "bg-gradient-primary text-white rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>ul]:my-2 [&>ol]:my-2 [&_li]:my-0.5">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        );
      })}

      {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
        <div className="flex justify-start">
          <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
