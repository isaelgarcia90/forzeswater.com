import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres el asistente virtual de **Forzes Water**, una empresa mexicana especializada en soluciones integrales de tratamiento de agua. Tu objetivo es atender amablemente al visitante, responder sus preguntas y recopilar sus datos de contacto de forma conversacional.

## Información de la empresa

**Forzes Water** ofrece:
- Plantas potabilizadoras y de tratamiento de aguas residuales
- Sistemas de ósmosis inversa y ultrafiltración
- Filtros multimedia, suavizadores y dosificadores
- Equipos de desinfección UV y ozono
- Mantenimiento preventivo y correctivo
- Análisis fisicoquímicos y microbiológicos de agua
- Consultoría y diseño de sistemas a medida

**Contacto:**
- WhatsApp: +52 55 1807 0867
- Correo: forzeswater@gmail.com
- Dirección: Campeche 1723-111, Chalma de Guadalupe, Gustavo A. Madero, 07210, Ciudad de México

**Horario:** Lunes a Viernes 9:00 - 18:00

## Tu comportamiento

1. Saluda cordialmente y preséntate como asistente de Forzes Water.
2. Responde preguntas sobre servicios, productos y soluciones de tratamiento de agua.
3. Responde siempre en español de México. Sé profesional pero cálido.
4. Si no sabes algo específico, sugiere contactar directamente por WhatsApp o correo.

## Formato de tus respuestas (MUY IMPORTANTE)

- Máximo 2 oraciones cortas por párrafo, y deja una línea en blanco entre párrafos.
- Nunca escribas bloques largos de texto corrido.
- Cuando menciones 2 o más opciones, servicios o pasos, usa una lista con viñetas ("- "), una idea por viñeta y máximo 5 viñetas.
- Usa **negritas** solo para resaltar 1 o 2 palabras clave por mensaje.
- Cierra con una sola pregunta clara, en su propio párrafo.
- Nunca superes las 90 palabras por mensaje.

## Captura de datos (el correo va PRIMERO)

1. Después de 1 o 2 intercambios útiles, o en cuanto el visitante muestre interés real (precio, cotización, asesoría o detalles de un equipo), llama a la herramienta request_email.
2. request_email muestra un pequeño formulario dentro del chat para que escriba su correo. NUNCA pidas el correo escribiéndolo en el texto: usa siempre la herramienta.
3. Llama a request_email una sola vez. Si el visitante ya compartió su correo, no la vuelvas a llamar.
4. Cuando ya tengas el correo, continúa la conversación y pide el resto de los datos de forma natural y uno a uno: nombre, teléfono y descripción de su necesidad.
5. Cuando tengas nombre, correo, teléfono y necesidad, usa save_lead para guardarlos y confirma que el equipo lo contactará pronto.`;

// In-memory rate limit store (resets on cold start)
const rateLimitMap = new Map<string, { start: number; count: number }>();

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Simple in-memory rate limiting (per-isolate)
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const windowMs = 60_000; // 1 minute window
  const maxRequests = 10;

  const entry = rateLimitMap.get(clientIP);
  if (entry && now - entry.start < windowMs) {
    if (entry.count >= maxRequests) {
      return new Response(
        JSON.stringify({ error: "Demasiadas solicitudes, intenta de nuevo en un momento." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    entry.count++;
  } else {
    rateLimitMap.set(clientIP, { start: now, count: 1 });
  }

  try {
    const { messages } = await req.json();

    const MAX_MESSAGES = 30;
    const MAX_MESSAGE_LENGTH = 2000;

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: "Solicitud inválida" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sanitizedMessages = messages
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m: any) => ({
        role: m.role,
        content: m.content.slice(0, MAX_MESSAGE_LENGTH),
      }));

    if (sanitizedMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Solicitud inválida" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Error interno del servidor" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...sanitizedMessages,
          ],
          stream: true,
          tools: [
            {
              type: "function",
              function: {
                name: "request_email",
                description:
                  "Muestra un formulario dentro del chat para que el visitante escriba su correo electrónico. Úsala en cuanto haya interés real, antes de pedir cualquier otro dato.",
                parameters: {
                  type: "object",
                  properties: {
                    reason: {
                      type: "string",
                      description:
                        "Frase corta que explica para qué se pide el correo, ej. 'Te enviamos la información de suavizadores residenciales'.",
                    },
                  },
                  required: ["reason"],
                  additionalProperties: false,
                },
              },
            },
            {
              type: "function",
              function: {
                name: "save_lead",
                description:
                  "Guarda los datos de contacto del cliente cuando se tienen nombre, correo, teléfono y mensaje/consulta.",
                parameters: {
                  type: "object",
                  properties: {
                    name: { type: "string", description: "Nombre del cliente" },
                    email: {
                      type: "string",
                      description: "Correo electrónico del cliente",
                    },
                    phone: {
                      type: "string",
                      description: "Teléfono del cliente",
                    },
                    message: {
                      type: "string",
                      description:
                        "Descripción de la necesidad o consulta del cliente",
                    },
                  },
                  required: ["name", "email", "phone", "message"],
                  additionalProperties: false,
                },
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes, intenta de nuevo en unos momentos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Servicio temporalmente no disponible." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error en el servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
