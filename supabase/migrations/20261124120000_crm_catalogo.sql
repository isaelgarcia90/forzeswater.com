-- CRM semántico y catálogo de Forzes Water (proyecto Supabase propio, fuera de Lovable).
-- Solo el backend (service role) lee y escribe estas tablas: RLS activado y sin políticas para anon/authenticated.

create extension if not exists vector with schema extensions;
create extension if not exists pg_trgm with schema extensions;

-- ---------- Catálogo (sin precios) ----------
create table public.catalogo_items (
  id bigint generated always as identity primary key,
  lista text not null check (lista in ('SBO', 'TDA', 'PIQ')),
  codigo text not null,
  descripcion text not null,
  seccion_pagina text,
  seccion text,
  subseccion text,
  desc_clase text,
  pagina int,
  sobre_pedido boolean not null default false,
  hp text, voltaje text, fases text, gpm text, micras text,
  activo boolean not null default true,
  embedding extensions.vector(768),
  tsv tsvector generated always as (
    to_tsvector('spanish', coalesce(codigo, '') || ' ' || coalesce(descripcion, '') || ' ' || coalesce(seccion, '') || ' ' || coalesce(subseccion, ''))
  ) stored,
  updated_at timestamptz not null default now(),
  unique (lista, codigo)
);
create index catalogo_items_tsv_idx on public.catalogo_items using gin (tsv);
create index catalogo_items_codigo_trgm_idx on public.catalogo_items using gin (codigo extensions.gin_trgm_ops);
create index catalogo_items_embedding_idx on public.catalogo_items using hnsw (embedding extensions.vector_cosine_ops);

-- ---------- Precios de lista (Forzecito NO tiene acceso) ----------
create schema if not exists privado;
revoke all on schema privado from anon, authenticated;
create table privado.precios_lista (
  lista text not null,
  codigo text not null,
  precio_mxn numeric(12, 2),          -- null = sobre pedido
  vigencia date not null,
  primary key (lista, codigo, vigencia),
  foreign key (lista, codigo) references public.catalogo_items (lista, codigo) on delete cascade
);

-- ---------- Clientes / leads ----------
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  session_id text unique,
  name text, email text, phone text, company text,
  sector text, industria text, volumen_m3_dia numeric,
  presupuesto_rango text, urgencia text, intencion text,
  productos_interes text[] not null default '{}',
  resumen text,
  resumen_embedding extensions.vector(768),   -- para "¿quién preguntó por purificadores el mes pasado?"
  score int not null default 0,
  estado text not null default 'nuevo'
    check (estado in ('nuevo', 'caliente', 'contactado', 'cotizado', 'ganado', 'perdido')),
  origen text not null default 'web',
  privacy_accepted_at timestamptz,
  utm jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index leads_email_idx on public.leads (lower(email));
create index leads_phone_idx on public.leads (phone);
create index leads_resumen_embedding_idx on public.leads using hnsw (resumen_embedding extensions.vector_cosine_ops);

-- ---------- Cotizaciones ----------
create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads on delete set null,
  items jsonb not null,                 -- [{lista, codigo, cantidad}]
  notas text,
  estado text not null default 'abierta',
  created_at timestamptz not null default now()
);

-- ---------- Descargas de listas: registrar la entrega ----------
alter table public.catalog_downloads
  add column if not exists lead_id uuid references public.leads on delete set null,
  add column if not exists delivered_at timestamptz;

alter table public.catalogo_items enable row level security;
alter table privado.precios_lista enable row level security;
alter table public.leads enable row level security;
alter table public.quotes enable row level security;

-- ---------- Bucket privado para los PDF de listas de precios ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('listas-precios', 'listas-precios', false, 20971520, array['application/pdf'])
on conflict (id) do nothing;
-- Sin políticas en storage.objects para este bucket: solo se descarga con URL firmada emitida por el backend.

-- El proyecto se creó con "Grant API access to new tables automatically": quitamos explícitamente
-- el acceso del Data API a estas tablas. Solo el backend (service role) las usa.
revoke all on public.catalogo_items, public.leads, public.quotes from anon, authenticated;
revoke all on all tables in schema privado from anon, authenticated;
