ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'unpaid',
  ADD COLUMN IF NOT EXISTS payment_reference text;

CREATE INDEX IF NOT EXISTS orders_payment_reference_idx ON public.orders (payment_reference);