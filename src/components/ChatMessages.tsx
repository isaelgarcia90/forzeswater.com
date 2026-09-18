import { useState } from "react";
import { ChevronRight, Droplets, Mail, MessageCircle, PackageSearch, Send, Wrench } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "email_form";
};

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onEmailSubmit?: (email: string) => void;
  onQuickAction?: (message: string) => void;
}

const quickActions = [
  { label: "Cotizar un sistema", message: "Quiero cotizar un sistema de tratamiento de agua", icon: Droplets },
  { label: "Conocer productos", message: "Quiero conocer sus productos", icon: PackageSearch },
  { label: "Solicitar servicio", message: "Necesito solicitar un servicio", icon: Wrench },
];

const EmailFormCard = ({ reason, onSubmit, disabled }: { reason: string; onSubmit: (email: string) => void; disabled: boolean }) => {
  const [email, setEmail] = useState("");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  return (
    <div className="w-full space-y-3 rounded-lg border border-border bg-card px-4 py-3 shadow-soft">
      <p className="text-sm leading-relaxed">{reason}</p>
      <div className="space-y-2 rounded-md bg-muted p-3">
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
            className="min-w-0 flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
          />
          <Button
            type="submit"
            disabled={!valid || disabled}
            size="icon"
            className="h-9 w-9 shrink-0"
            aria-label="Enviar correo"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

const ChatMessages = ({ messages, isLoading, onEmailSubmit, onQuickAction }: ChatMessagesProps) => {
  const lastEmailFormIndex = messages.map((m) => m.type === "email_form").lastIndexOf(true);
  const showWelcome = messages.length === 0;

  return (
    <Conversation className="bg-muted/45">
      <ConversationContent className="gap-4 p-4">
        {showWelcome && (
          <div className="space-y-4 animate-fade-in">
            <Message from="assistant" className="max-w-[88%]">
              <MessageContent className="rounded-lg border border-border bg-card px-4 py-3 shadow-soft">
                <p className="text-sm leading-relaxed">
                  Hola, soy el asistente de Forzes Water. ¿En qué podemos ayudarte hoy?
                </p>
              </MessageContent>
            </Message>

            <div className="grid grid-cols-2 gap-2" aria-label="Accesos rápidos">
              {quickActions.map(({ label, message, icon: Icon }) => (
                <Button
                  key={label}
                  type="button"
                  variant="outline"
                  onClick={() => onQuickAction?.(message)}
                  className="h-[88px] min-w-0 flex-col gap-2 whitespace-normal rounded-lg border-border bg-card px-2 py-3 text-center text-xs leading-tight text-foreground shadow-soft hover:border-primary hover:bg-muted"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{label}</span>
                </Button>
              ))}
              <Button
                type="button"
                variant="outline"
                asChild
                className="h-[88px] min-w-0 flex-col gap-2 whitespace-normal rounded-lg border-border bg-card px-2 py-3 text-center text-xs leading-tight text-foreground shadow-soft hover:border-primary hover:bg-muted"
              >
                <a
                  href="https://wa.me/525518070867?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20de%20Forzes%20Water."
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-primary">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span>Hablar por WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
        if (msg.type === "email_form" && msg.role === "assistant") {
          return (
            <Message key={i} from="assistant" className="max-w-[90%]">
              <MessageContent className="w-full">
                <EmailFormCard
                  reason={msg.content}
                  disabled={i !== lastEmailFormIndex}
                  onSubmit={(email) => onEmailSubmit?.(email)}
                />
              </MessageContent>
            </Message>
          );
        }

        return (
          <Message key={i} from={msg.role} className="max-w-[88%]">
            <MessageContent
              className={msg.role === "user"
                ? "rounded-lg rounded-br-sm bg-primary px-4 py-3 text-primary-foreground shadow-soft"
                : "rounded-lg rounded-bl-sm border border-border bg-card px-4 py-3 shadow-soft"}
            >
              {msg.role === "assistant" ? (
                <MessageResponse className="text-sm leading-relaxed [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1">
                  {msg.content}
                </MessageResponse>
              ) : (
                <p className="text-sm leading-relaxed">{msg.content}</p>
              )}
            </MessageContent>
          </Message>
        );
      })}

      {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
        <Message from="assistant">
          <MessageContent className="rounded-lg border border-border bg-card px-4 py-3 shadow-soft">
            <Shimmer className="text-sm">Pensando...</Shimmer>
          </MessageContent>
        </Message>
      )}

      </ConversationContent>
      <ConversationScrollButton aria-label="Ir al mensaje más reciente" className="bottom-2 h-8 w-8" />
    </Conversation>
  );
};

export default ChatMessages;
