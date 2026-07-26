import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/order-success")({
  validateSearch: (s) => z.object({ id: z.string().optional() }).parse(s),
  head: () => ({
    meta: [
      { title: "Order placed — L'ETO Bakeshop" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useSearch();
  const shortId = id ? id.slice(0, 8).toUpperCase() : "";
  return (
    <section className="bg-powder min-h-screen pt-36 md:pt-44">
      <div className="mx-auto max-w-xl px-6 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <p className="eyebrow mt-6">Order received</p>
        <h1 className="mt-4 font-display text-4xl text-navy">Thank you</h1>
        <p className="mt-4 text-navy-soft">
          Your order {shortId && <span className="font-medium text-navy">#{shortId}</span>} has been placed. We've opened WhatsApp so you can confirm the details with us directly.
        </p>
        <p className="mt-3 text-sm text-navy-soft">
          Our team will call you shortly to confirm. Payment is Cash on Delivery.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/menu" className="btn-ghost">Order more</Link>
          <Link to="/" className="btn-navy">Back home</Link>
        </div>
      </div>
    </section>
  );
}
