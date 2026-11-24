DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.catalog_downloads;
CREATE POLICY "Anyone can submit valid catalog requests" ON public.catalog_downloads
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 100
  AND length(email) <= 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (company IS NULL OR length(company) <= 150)
  AND (phone IS NULL OR length(phone) <= 30)
  AND (line_of_interest IS NULL OR length(line_of_interest) <= 100)
);
GRANT INSERT ON public.catalog_downloads TO anon, authenticated;