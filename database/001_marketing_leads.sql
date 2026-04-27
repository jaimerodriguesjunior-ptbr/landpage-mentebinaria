create extension if not exists pgcrypto;

create table if not exists public.marketing_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  message text,
  product_interest text not null default 'autoeletrica-pro',
  source text not null default 'landing-page',
  source_url text,
  status text not null default 'new',
  notes text
);

create index if not exists marketing_leads_created_at_idx
  on public.marketing_leads (created_at desc);

alter table public.marketing_leads enable row level security;

drop policy if exists marketing_leads_insert_public on public.marketing_leads;
create policy marketing_leads_insert_public
on public.marketing_leads
for insert
to anon, authenticated
with check (true);

drop policy if exists marketing_leads_select_block_public on public.marketing_leads;
create policy marketing_leads_select_block_public
on public.marketing_leads
for select
to anon, authenticated
using (false);

