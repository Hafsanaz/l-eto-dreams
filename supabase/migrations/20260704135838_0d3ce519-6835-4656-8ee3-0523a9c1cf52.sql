-- Lock down has_role EXECUTE
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

-- Replace permissive INSERT policy with a real validity check
DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;

CREATE POLICY "Anyone can place a valid order"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(customer_name) >= 2
    AND char_length(phone) >= 6
    AND char_length(address) >= 5
    AND jsonb_typeof(items) = 'array'
    AND jsonb_array_length(items) > 0
    AND total > 0
    AND status = 'new'
  );