import { useState } from "react";
import { COUNTRY_CODES } from "@/lib/country-codes";
import { ChevronRight, Droplets, Home, Loader2, Mail, MessageCircle, PackageSearch, PenLine, Wrench } from "lucide-react";

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
  options?: string[];
};

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onContactSubmit?: (data: ContactData) => Promise<boolean>;
  contactSaved?: boolean;
  onQuickAction?: (message: string) => void;
  showReturnPrompt?: boolean;
  onContinueConversation?: () => void;
  onStartNewConversation?: () => void;
  onOtherQuestion?: () => void;
}

const quickActions = [
  { label: "Cotizar un sistema", message: "Quiero cotizar un sistema de tratamiento de agua", icon: Droplets },
  { label: "Conocer productos", message: "Quiero conocer sus productos", icon: PackageSearch },
  { label: "Solicitar servicio", message: "Necesito solicitar un servicio", icon: Wrench },
];

export type ContactData = { name: string; email: string; phone: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ContactFormCard = ({
  reason,
  onSubmit,
  disabled,
}: {
  reason: string;
  onSubmit: (data: ContactData) => Promise<boolean>;
  disabled: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lada, setLada] = useState("+52|MX");
  const [phone, setPhone] = useState("");
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const digits = phone.replace(/\D/g, "");
  const errors = {
    email: !email.trim() ? "Escribe tu correo" : !EMAIL_RE.test(email.trim()) ? "Revisa el formato del correo" : "",
    name: name.trim().length < 2 ? "Escribe tu nombre" : "",
    phone: digits.length > 0 && (digits.length < 8 || digits.length > 15) ? "Revisa el número (8 a 15 dígitos)" : "",
  };
  const hasErrors = Boolean(errors.email || errors.name || errors.phone);
  const locked = disabled || sending;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (hasErrors || locked) return;
    setSending(true);
    setFailed(false);
    const ok = await onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: digits ? `${lada.split("|")[0]} ${phone.trim()}` : "",
    });
    setSending(false);
    if (!ok) setFailed(true);
  };

  const field =
    "w-full min-w-0 rounded-md border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:opacity-60";
  const err = (msg: string) => tried && msg ? <p className="mt-1 text-xs text-destructive">{msg}</p> : null;

  return (
    <div className="w-full space-y-3 rounded-lg border border-border bg-card px-4 py-3 shadow-soft">
      <div className="flex items-start gap-2">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed">{reason}</p>
      </div>
      <form className="space-y-3 rounded-md bg-muted p-3" onSubmit={submit} noValidate aria-label="Datos de contacto">
        <div>
          <label htmlFor="chat-email" className="mb-1 block text-xs font-medium text-foreground">
            Correo electrónico <span className="text-destructive">*</span>
          </label>
          <input id="chat-email" type="email" autoComplete="email" maxLength={255} value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="email@ejemplo.com" disabled={locked}
            className={`${field} ${tried && errors.email ? "border-destructive" : "border-input"}`} />
          {err(errors.email)}
        </div>
        <div>
          <label htmlFor="chat-name" className="mb-1 block text-xs font-medium text-foreground">
            Nombre <span className="text-destructive">*</span>
          </label>
          <input id="chat-name" type="text" autoComplete="name" maxLength={100} value={name}
            onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" disabled={locked}
            className={`${field} ${tried && errors.name ? "border-destructive" : "border-input"}`} />
          {err(errors.name)}
        </div>
        <div>
          <label htmlFor="chat-phone" className="mb-1 block text-xs font-medium text-foreground">
            Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
          </label>
          <div className="flex gap-2">
            <select aria-label="Lada" value={lada} onChange={(e) => setLada(e.target.value)} disabled={locked}
              className="w-[84px] shrink-0 rounded-md border border-input bg-card px-1 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
              {COUNTRY_CODES.map((c) => (
                <option key={`${c.code}|${c.country}`} value={`${c.code}|${c.country}`}>
                  {c.country} {c.code}
                </option>
              ))}
            </select>
            <input id="chat-phone" type="tel" inputMode="tel" autoComplete="tel-national" maxLength={15} value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d\s()-]/g, ""))} placeholder="55 1234 5678" disabled={locked}
              className={`${field} ${tried && errors.phone ? "border-destructive" : "border-input"}`} />
          </div>
          {err(errors.phone)}
        </div>
        {failed && (
          <p className="text-xs text-destructive">No pudimos guardar tus datos. Intenta de nuevo o escríbenos por WhatsApp.</p>
        )}
        <Button type="submit" disabled={locked} className="w-full bg-gradient-primary">
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : disabled ? "Datos enviados" : "Enviar mis datos"}
        </Button>
      </form>
    </div>
  );
};

const WHATSAPP_URL =
  "https://wa.me/525518070867?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20de%20Forzes%20Water.";

const ChatMessages = ({
  messages,
  isLoading,
  onContactSubmit,
  contactSaved = false,
  onQuickAction,
  showReturnPrompt = false,
  onContinueConversation,
  onStartNewConversation,
  onOtherQuestion,
}: ChatMessagesProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const lastEmailFormIndex = messages.map((m) => m.type === "email_form").lastIndexOf(true);
  const showWelcome = messages.length === 0 && !showReturnPrompt;
  const lastMsg = messages[messages.length - 1];
  const showOptions =
    !showReturnPrompt && !isLoading && lastMsg?.role === "assistant" && lastMsg.type !== "email_form";
  const pick = (text: string) => {
    setShowMenu(false);
    onQuickAction?.(text);
  };

  return (
    <Conversation className="bg-muted/45">
      <ConversationContent className="gap-4 p-4">
        {showReturnPrompt && (
          <div className="space-y-3 animate-fade-in">
            <Message from="assistant" className="max-w-[88%]">
              <MessageContent className="rounded-lg border border-border bg-card px-4 py-3 shadow-soft">
                <p className="text-sm leading-relaxed">
                  ¡Gracias por regresar! Tienes una conversación reciente. ¿Deseas continuar donde la dejaste?
                </p>
              </MessageContent>
            </Message>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => onContinueConversation?.()}
                className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sí, continuar
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onStartNewConversation?.()}
                className="rounded-lg border-border bg-card text-foreground hover:border-primary hover:bg-muted"
              >
                No, nueva conversación
              </Button>
            </div>
          </div>
        )}

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

        {!showReturnPrompt && messages.map((msg, i) => {
        if (msg.type === "email_form" && msg.role === "assistant") {
          return (
            <Message key={i} from="assistant" className="max-w-[90%]">
              <MessageContent className="w-full">
                <ContactFormCard
                  reason={msg.content}
                  disabled={i !== lastEmailFormIndex || contactSaved}
                  onSubmit={(data) => onContactSubmit?.(data) ?? Promise.resolve(false)}
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

      {showOptions && (
        <div className="w-full space-y-2 animate-fade-in">
          {lastMsg.options && lastMsg.options.length > 0 && (
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft" aria-label="Opciones sugeridas">
              {lastMsg.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pick(opt)}
                  className="flex min-h-11 w-full items-center justify-between gap-2 border-b border-border px-4 py-2.5 text-left text-sm font-medium text-primary transition-colors last:border-b-0 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                >
                  <span>{opt}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => { setShowMenu(false); onOtherQuestion?.(); }} className="h-8 rounded-full border-border bg-card text-xs">
              <PenLine className="h-3.5 w-3.5" /> Tengo otra duda
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setShowMenu((v) => !v)} className="h-8 rounded-full border-border bg-card text-xs">
              <Home className="h-3.5 w-3.5" /> Menú principal
            </Button>
            <Button type="button" variant="outline" size="sm" asChild className="h-8 rounded-full border-border bg-card text-xs">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer nofollow">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </Button>
          </div>
          {showMenu && (
            <div className="grid grid-cols-1 gap-2 animate-fade-in">
              {quickActions.map(({ label, message, icon: Icon }) => (
                <Button key={label} type="button" variant="outline" onClick={() => pick(message)} className="h-10 justify-start gap-2 rounded-lg border-border bg-card text-sm text-foreground hover:border-primary hover:bg-muted">
                  <Icon className="h-4 w-4 text-primary" /> {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

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
