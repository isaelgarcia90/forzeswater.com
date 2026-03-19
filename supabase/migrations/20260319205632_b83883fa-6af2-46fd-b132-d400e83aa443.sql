CREATE TABLE public.chat_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  message TEXT,
  conversation_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.chat_leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON public.chat_leads
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);