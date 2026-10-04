import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, conversation_history } = await req.json();

    const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str(email, 255));
    if (str(name, 100).length < 2 || !validEmail || !str(message, 1000)) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("chat_leads").insert({
      name: str(name, 100),
      email: str(email, 255),
      phone: str(phone, 25) || null,
      message: str(message, 1000),
      conversation_history: conversation_history || [],
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "No se pudo guardar" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send to Formspree
    try {
      const formspreeRes = await fetch("https://formspree.io/f/xblnyzay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nombre: name,
          "Correo Electrónico": email,
          Teléfono: str(phone, 25) || "No proporcionado",
          Mensaje: `[Chatbot IA] ${message}`,
        }),
      });

      if (!formspreeRes.ok) {
        console.error("Formspree error:", await formspreeRes.text());
      }
    } catch (formspreeErr) {
      console.error("Formspree fetch error:", formspreeErr);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("save-chat-lead error:", e);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
