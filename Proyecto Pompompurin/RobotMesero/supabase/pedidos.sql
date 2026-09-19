-- Ejecuta este script en Supabase Dashboard > SQL Editor.
-- Crea la tabla que usa la app para guardar y consultar pedidos.

create table if not exists public.pedidos (
  id text primary key,
  fecha timestamptz not null,
  items jsonb not null,
  subtotal numeric not null,
  impuestos numeric not null,
  total numeric not null,
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'preparando', 'listo', 'entregado'))
);

alter table public.pedidos enable row level security;

-- La app usa la publishable/anon key y no tiene autenticación de Supabase.
-- Estas políticas permiten que el prototipo guarde, lea y actualice pedidos.
drop policy if exists "pedidos_select_public" on public.pedidos;
drop policy if exists "pedidos_insert_public" on public.pedidos;
drop policy if exists "pedidos_update_public" on public.pedidos;

create policy "pedidos_select_public"
  on public.pedidos for select
  to anon, authenticated
  using (true);

create policy "pedidos_insert_public"
  on public.pedidos for insert
  to anon, authenticated
  with check (true);

create policy "pedidos_update_public"
  on public.pedidos for update
  to anon, authenticated
  using (true)
  with check (true);
