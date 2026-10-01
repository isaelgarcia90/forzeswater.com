import { useState, useCallback, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "email_form";
  options?: string[];
};

const OPTIONS_RE = /\[\[\s*OPCIONES\s*:([\s\S]*?)\]\]/i;

/** Splits visible text from the trailing [[OPCIONES: a | b]] marker (also hides partial markers while streaming). */
function parseOptions(raw: string): { text: string; options?: string[] } {
  const match = raw.match(OPTIONS_RE);
  let text = raw;
  let options: string[] | undefined;
  if (match) {
    options = match[1]
      .split("|")
      .map((o) => o.trim())
      .filter(Boolean)
      .slice(0, 6);
    text = raw.replace(OPTIONS_RE, "");
  } else {
    const idx = raw.lastIndexOf("[[");
    if (idx !== -1) text = raw.slice(0, idx);
    else if (raw.endsWith("[")) text = raw.slice(0, -1);
  }
  return { text: text.trim(), options: options?.length ? options : undefined };
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const SAVE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-chat-lead`;

const STORAGE_KEY = "forzes-chat-history";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

type StoredChat = {
  messages: Message[];
  leadSaved: boolean;
  timestamp: number;
};

function loadStoredChat(): StoredChat | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredChat;
    if (!Array.isArray(parsed?.messages) || typeof parsed?.timestamp !== "number") return null;
    if (Date.now() - parsed.timestamp > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useChatBot() {
  const [messages, setMessages] = useState<Message[]>(() => loadStoredChat()?.messages ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(() => loadStoredChat()?.leadSaved ?? false);
  const [hasStoredConversation] = useState(() => (loadStoredChat()?.messages.length ?? 0) > 0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (messages.length === 0) {
        window.localStorage.removeItem(STORAGE_KEY);
        return;
      }
      const payload: StoredChat = { messages, leadSaved, timestamp: Date.now() };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors (private mode / quota)
    }
  }, [messages, leadSaved]);

  const saveLead = useCallback(
    async (args: { name: string; email: string; phone: string; message: string }) => {
      try {
        await fetch(SAVE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            ...args,
            conversation_history: messages,
          }),
        });
        setLeadSaved(true);
      } catch (e) {
        console.error("Error saving lead:", e);
      }
    },
    [messages]
  );

  const sendMessage = useCallback(
    async (input: string) => {
      const userMsg: Message = { role: "user", content: input };
      const allMessages = [...messages, userMsg];
      setMessages(allMessages);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      let assistantSoFar = "";
      let toolCallArgs = "";
      let toolCallName = "";
      let isToolCall = false;

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: allMessages }),
          signal: controller.signal,
        });

        if (!resp.ok || !resp.body) {
          const errData = await resp.json().catch(() => ({}));
          throw new Error(errData.error || "Error al conectar con el asistente");
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";
        let streamDone = false;

        const upsertAssistant = (text: string) => {
          assistantSoFar = text;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") {
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
              );
            }
            return [...prev, { role: "assistant", content: assistantSoFar }];
          });
        };

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") {
              streamDone = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              const delta = parsed.choices?.[0]?.delta;

              // Handle tool calls
              if (delta?.tool_calls) {
                isToolCall = true;
                for (const tc of delta.tool_calls) {
                  if (tc.function?.name) {
                    toolCallName = tc.function.name;
                  }
                  if (tc.function?.arguments) {
                    toolCallArgs += tc.function.arguments;
                  }
                }
              }

              // Handle content
              const content = delta?.content as string | undefined;
              if (content) {
                upsertAssistant(assistantSoFar + content);
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }

        // Process tool call if detected
        if (isToolCall && toolCallName === "request_email") {
          let reason = "Déjanos tu correo electrónico para enviarte la información:";
          try {
            const args = toolCallArgs ? JSON.parse(toolCallArgs) : {};
            if (typeof args.reason === "string" && args.reason.trim()) {
              reason = args.reason.trim();
            }
          } catch {
            // keep default reason
          }
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: reason, type: "email_form" },
          ]);
        } else if (isToolCall && toolCallArgs) {
          try {
            const args = JSON.parse(toolCallArgs);
            await saveLead(args);
            // Add confirmation message after saving
            const confirmMsg =
              "✅ ¡Listo! He registrado tus datos correctamente. Nuestro equipo de Forzes Water se pondrá en contacto contigo a la brevedad. ¿Hay algo más en lo que pueda ayudarte?";
            if (!assistantSoFar) {
              upsertAssistant(confirmMsg);
            }
          } catch (e) {
            console.error("Error parsing tool call:", e);
          }
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          console.error("Chat error:", e);
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp al +52 55 1807 0867.",
            },
          ]);
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, saveLead]
  );

  const resetChat = useCallback((clearStorage = true) => {
    setMessages([]);
    setLeadSaved(false);
    abortRef.current?.abort();
    if (clearStorage && typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  return { messages, isLoading, leadSaved, sendMessage, resetChat, hasStoredConversation };
}
