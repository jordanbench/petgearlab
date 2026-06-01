-- Shared schema for Pet Gear Lab. Safe to run once for all three affiliate sites.
create table if not exists public.affiliate_products (
  site_id text not null,
  asin text not null,
  name text not null,
  category text,
  positioning text,
  created_at timestamptz default now(),
  primary key (site_id, asin)
);

create table if not exists public.affiliate_subscribers (
  site_id text not null,
  email text not null,
  source_path text,
  created_at timestamptz default now(),
  primary key (site_id, email)
);

create table if not exists public.affiliate_clicks (
  id bigserial primary key,
  site_id text not null,
  asin text,
  page_path text,
  created_at timestamptz default now()
);

alter table public.affiliate_products enable row level security;
alter table public.affiliate_subscribers enable row level security;
alter table public.affiliate_clicks enable row level security;

grant select on public.affiliate_products to anon, authenticated;
grant insert on public.affiliate_subscribers to anon, authenticated;
grant insert on public.affiliate_clicks to anon, authenticated;

drop policy if exists "Public can read affiliate products" on public.affiliate_products;
create policy "Public can read affiliate products" on public.affiliate_products for select using (true);

drop policy if exists "Public can subscribe" on public.affiliate_subscribers;
create policy "Public can subscribe" on public.affiliate_subscribers for insert with check (email like '%@%');

drop policy if exists "Public can log affiliate clicks" on public.affiliate_clicks;
create policy "Public can log affiliate clicks" on public.affiliate_clicks for insert with check (site_id <> '');
