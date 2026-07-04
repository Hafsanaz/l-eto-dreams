import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogOut, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatPKR } from "@/lib/cart";

type OrderItem = { id: string; name: string; price: number; qty: number; priceLabel: string };
type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  notes: string | null;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "preparing", "out_for_delivery", "delivered", "cancelled"] as const;

export const Route = createFileRoute("/_authenticated/admin/orders")({
  head: () => ({
    meta: [
      { title: "Orders — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrders,
});

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message === "" ? "You don't have permission to view orders." : error.message);
      setOrders([]);
    } else {
      setOrders((data ?? []) as unknown as Order[]);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (!error) {
      setOrders((prev) => prev?.map((o) => (o.id === id ? { ...o, status } : o)) ?? null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <section className="bg-powder min-h-screen pb-16 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="mt-3 font-display text-4xl text-navy">Orders</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={load} className="btn-ghost">
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
            <button onClick={signOut} className="btn-ghost">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        {loading && (
          <div className="mt-16 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-navy" />
          </div>
        )}
        {error && (
          <div className="mt-10 bg-ivory p-6 text-sm text-red-600 shadow-[var(--shadow-soft)]">
            {error}
          </div>
        )}
        {!loading && !error && orders && orders.length === 0 && (
          <p className="mt-10 text-navy-soft">No orders yet.</p>
        )}

        {orders && orders.length > 0 && (
          <div className="mt-10 flex flex-col gap-5">
            {orders.map((o) => (
              <article key={o.id} className="bg-ivory p-6 shadow-[var(--shadow-soft)]">
                <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="font-mono text-xs text-navy-soft">
                      #{o.id.slice(0, 8).toUpperCase()} · {new Date(o.created_at).toLocaleString()}
                    </p>
                    <h2 className="mt-1 font-display text-xl text-navy">{o.customer_name}</h2>
                    <p className="text-sm text-navy-soft">{o.phone}</p>
                    <p className="mt-1 text-sm text-navy">{o.address}</p>
                    {o.notes && <p className="mt-2 text-sm italic text-navy-soft">"{o.notes}"</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-display text-2xl text-gold">{formatPKR(Number(o.total))}</span>
                    <span className="text-xs text-navy-soft">
                      {o.payment_method === "cod" ? "Cash on Delivery" : "Card"}
                    </span>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="input py-1.5 text-sm"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </header>
                <ul className="mt-4 flex flex-col gap-1 text-sm text-navy">
                  {o.items.map((it, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{it.name} × {it.qty}</span>
                      <span className="text-navy-soft">{formatPKR(it.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm text-navy-soft">
                  <span>Subtotal {formatPKR(Number(o.subtotal))} · Delivery {formatPKR(Number(o.delivery_fee))}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
