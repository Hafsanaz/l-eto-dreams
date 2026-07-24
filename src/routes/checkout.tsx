import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowLeft, CreditCard, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { useCart, formatPKR } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { createSafepayCheckout } from "@/lib/safepay.functions";

const DELIVERY_FEE = 200;
type PayMethod = "cod" | "card";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — L'ETO Bakeshop" },
      { name: "description", content: "Confirm your order details and choose Cash on Delivery." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  customer_name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(25),
  address: z.string().trim().min(5, "Please enter your full delivery address").max(500),
  notes: z.string().trim().max(500).optional(),
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const startCardPayment = useServerFn(createSafepayCheckout);
  const [form, setForm] = useState({ customer_name: "", phone: "", address: "", notes: "" });
  const [payMethod, setPayMethod] = useState<PayMethod>("cod");
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const total = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (!data.session) {
        window.location.href = `/auth?next=${encodeURIComponent("/checkout")}`;
        return;
      }
      const user = data.session.user;
      const name =
        (user.user_metadata?.full_name as string | undefined) ||
        (user.user_metadata?.name as string | undefined) ||
        "";
      setForm((f) => ({
        ...f,
        customer_name: f.customer_name || name,
        phone: f.phone || ((user.user_metadata?.phone as string | undefined) ?? ""),
      }));
      setAuthChecked(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!authChecked) {
    return (
      <section className="bg-powder flex min-h-screen items-center justify-center pt-24">
        <Loader2 className="h-6 w-6 animate-spin text-navy" />
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-powder min-h-screen pt-36 md:pt-44">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-4 font-display text-4xl text-navy">Your cart is empty</h1>
          <p className="mt-3 text-navy-soft">Add a few sweet things and come back.</p>
          <Link to="/menu" className="btn-navy mt-8">Browse the Menu</Link>
        </div>
      </section>
    );
  }


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof typeof form, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof form;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const payloadItems = items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
      priceLabel: i.priceLabel,
    }));

    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: parsed.data.customer_name,
        phone: parsed.data.phone,
        address: parsed.data.address,
        notes: parsed.data.notes || null,
        items: payloadItems,
        subtotal,
        delivery_fee: DELIVERY_FEE,
        total,
        payment_method: payMethod,
        status: "new",
      })
      .select("id")
      .single();

    if (error || !data) {
      setSubmitting(false);
      setServerError("Sorry, we couldn't place your order. Please try again or WhatsApp us.");
      return;
    }

    // Card payment → mint Safepay checkout and redirect to hosted page.
    if (payMethod === "card") {
      try {
        const { checkoutUrl } = await startCardPayment({ data: { orderId: data.id } });
        clear();
        window.location.href = checkoutUrl;
        return;
      } catch (err) {
        setSubmitting(false);
        setServerError(
          err instanceof Error ? err.message : "Couldn't start card payment. Please try again.",
        );
        return;
      }
    }

    // COD → WhatsApp confirmation, then success page.
    const itemLines = items.map((i) => `• ${i.name} × ${i.qty} — ${formatPKR(i.price * i.qty)}`).join("\n");
    const msg =
      `Hey L'ETO, I've just placed order #${data.id.slice(0, 8).toUpperCase()}.\n\n` +
      `${itemLines}\n\n` +
      `Subtotal: ${formatPKR(subtotal)}\nDelivery: ${formatPKR(DELIVERY_FEE)}\nTotal: ${formatPKR(total)}\n\n` +
      `Name: ${parsed.data.customer_name}\nPhone: ${parsed.data.phone}\nAddress: ${parsed.data.address}\n` +
      (parsed.data.notes ? `Notes: ${parsed.data.notes}\n` : "") +
      `Payment: Cash on Delivery`;
    const waUrl = `https://wa.me/923356633668?text=${encodeURIComponent(msg)}`;

    clear();
    window.open(waUrl, "_blank", "noopener,noreferrer");
    navigate({ to: "/order-success", search: { id: data.id } });
  };

  return (
    <section className="bg-powder min-h-screen pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Link to="/menu" className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-navy hover:text-gold">
          <ArrowLeft className="h-3.5 w-3.5" /> Continue shopping
        </Link>
        <div className="mt-6">
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-navy">Complete your order</h1>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <form onSubmit={onSubmit} className="bg-ivory p-8 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-2xl text-navy">Delivery details</h2>
            <div className="mt-6 grid grid-cols-1 gap-5">
              <Field label="Full name" error={errors.customer_name}>
                <input
                  value={form.customer_name}
                  onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                  className="input"
                  autoComplete="name"
                  required
                />
              </Field>
              <Field label="Phone number" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+92 3XX XXXXXXX"
                  required
                />
              </Field>
              <Field label="Delivery address" error={errors.address}>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input min-h-24"
                  autoComplete="street-address"
                  placeholder="House, street, area, city…"
                  required
                />
              </Field>
              <Field label="Order notes (optional)" error={errors.notes}>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input min-h-20"
                  placeholder="Delivery timing, allergies, message on the cake…"
                />
              </Field>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg text-navy">Payment method</h3>
              <div className="mt-3 grid gap-3">
                <label className={`flex cursor-pointer items-start gap-3 border p-4 transition ${payMethod === "cod" ? "border-navy bg-powder" : "border-navy/20 hover:bg-powder/60"}`}>
                  <input
                    type="radio"
                    name="pay"
                    checked={payMethod === "cod"}
                    onChange={() => setPayMethod("cod")}
                    className="mt-1 accent-navy"
                  />
                  <div className="flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium text-navy">
                      <Wallet className="h-4 w-4" /> Cash on Delivery
                    </p>
                    <p className="text-xs text-navy-soft">Pay in cash when your order arrives at your door.</p>
                  </div>
                </label>
                <label className={`flex cursor-pointer items-start gap-3 border p-4 transition ${payMethod === "card" ? "border-navy bg-powder" : "border-navy/20 hover:bg-powder/60"}`}>
                  <input
                    type="radio"
                    name="pay"
                    checked={payMethod === "card"}
                    onChange={() => setPayMethod("card")}
                    className="mt-1 accent-navy"
                  />
                  <div className="flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium text-navy">
                      <CreditCard className="h-4 w-4" /> Debit / Credit Card
                      <span className="ml-1 rounded-sm bg-navy/10 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider text-navy">Safepay</span>
                    </p>
                    <p className="text-xs text-navy-soft">Secure card checkout via Safepay. You'll be redirected to complete payment.</p>
                  </div>
                </label>
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-navy-soft">
                <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                Payments are encrypted and processed securely.
              </p>
            </div>

            {serverError && (
              <p className="mt-5 text-sm text-red-600" role="alert">{serverError}</p>
            )}

            <button disabled={submitting} className="btn-navy mt-8 w-full justify-center disabled:opacity-60">
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> {payMethod === "card" ? "Redirecting to Safepay…" : "Placing order…"}</>
              ) : (
                payMethod === "card" ? `Pay ${formatPKR(total)} with card` : `Place order · ${formatPKR(total)}`
              )}
            </button>
          </form>

          {/* Summary */}
          <aside className="h-fit bg-ivory p-8 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-2xl text-navy">Order summary</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3">
                  <img src={i.img} alt={i.name} className="h-14 w-14 object-cover" />
                  <div className="flex flex-1 items-start justify-between gap-2">
                    <div>
                      <p className="text-sm text-navy">{i.name}</p>
                      <p className="text-xs text-navy-soft">Qty {i.qty}</p>
                    </div>
                    <span className="text-sm text-navy">{formatPKR(i.price * i.qty)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
              <Row label="Subtotal" value={formatPKR(subtotal)} />
              <Row label="Delivery fee" value={formatPKR(DELIVERY_FEE)} />
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-display text-lg text-navy">Total</span>
                <span className="font-display text-xl text-gold">{formatPKR(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.72rem] uppercase tracking-[0.22em] text-navy-soft">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-navy-soft">
      <span>{label}</span>
      <span className="text-navy">{value}</span>
    </div>
  );
}
