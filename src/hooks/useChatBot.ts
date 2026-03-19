import { useState, useCallback, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const SAVE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-chat-lead`;

export function useChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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
        if (isToolCall && toolCallArgs) {
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

  const resetChat = useCallback(() => {
    setMessages([]);
    setLeadSaved(false);
    abortRef.current?.abort();
  }, []);

  return { messages, isLoading, leadSaved, sendMessage, resetChat };
}
