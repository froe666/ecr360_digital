-- Migration: project_requests table + logos storage bucket
-- No auth required - public form submission

CREATE TABLE IF NOT EXISTS public.project_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone TEXT,
    nom_entreprise TEXT,
    url_souhaitee TEXT,
    type_site TEXT NOT NULL,
    pack_choisi TEXT NOT NULL,
    description TEXT NOT NULL,
    logo_url TEXT,
    needs_logo_created BOOLEAN DEFAULT false,
    deadline_souhaitee DATE,
    message_supplementaire TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_project_requests_email ON public.project_requests(email);
CREATE INDEX IF NOT EXISTS idx_project_requests_created_at ON public.project_requests(created_at);

ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_project_requests" ON public.project_requests;
CREATE POLICY "public_insert_project_requests"
ON public.project_requests
FOR INSERT
TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_project_requests" ON public.project_requests;
CREATE POLICY "public_select_project_requests"
ON public.project_requests
FOR SELECT
TO public
USING (true);
