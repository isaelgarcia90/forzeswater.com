CREATE TABLE public.catalog_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  line_of_interest text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.catalog_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role full access"
ON public.catalog_downloads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts"
ON public.catalog_downloads
FOR INSERT
TO anon
WITH CHECK (true);