import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getOrderPaymentStatus } from "@/lib/safepay.functions";

export const Route = createFileRoute("/order-success")({
  validateSearch: (s) =>
    z
      .object({
        id: z.string().optional(),
        tracker: z.string().optional(),
        status: z.string().optional(),
      })
      .parse(s),
  head: () => ({
    meta: [
      { title: "Order placed — L'ETO Bakeshop" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id, tracker } = Route.useSearch();
  const shortId = id ? id.slice(0, 8).toUpperCase() : "";
  const fetchStatus = useServerFn(getOrderPaymentStatus);

  // Poll the order for a few seconds after Safepay redirect so the webhook has time to land.
  const { data: order } = useQuery({
    queryKey: ["order-status", id],
    queryFn: () => (id ? fetchStatus({ data: { orderId: id } }) : Promise.resolve(null)),
    enabled: !!id,
    refetchInterval: (q) => {
      const d = q.state.data;
      if (!d) return 2000;
      if (d.payment_method === "card" && d.payment_status === "pending") return 2000;
      return false;
    },
  });

  const isCard = order?.payment_method === "card" || !!tracker;
  const paid = order?.payment_status === "paid";
  const failed = order?.payment_status === "failed";

  const Icon = failed ? XCircle : isCard && !paid ? Clock : CheckCircle2;
  const iconClass = failed ? "text-red-500" : "text-gold";

  const heading = failed
    ? "Payment failed"
    : isCard && !paid
    ? "Confirming payment…"
    : "Thank you";

  return (
    <section className="bg-powder min-h-screen pt-36 md:pt-44">
      <div className="mx-auto max-w-xl px-6 text-center">
        <Icon className={`mx-auto h-14 w-14 ${iconClass}`} />
        <p className="eyebrow mt-6">Order {failed ? "unpaid" : "received"}</p>
        <h1 className="mt-4 font-display text-4xl text-navy">{heading}</h1>
        <p className="mt-4 text-navy-soft">
          {shortId && (
            <>
              Order <span className="font-medium text-navy">#{shortId}</span>{" "}
            </>
          )}
          {failed
            ? "was placed but the card payment didn't go through. You can retry from your cart or reach out on WhatsApp."
            : isCard && !paid
            ? "has been placed. We're confirming your card payment with Safepay — this usually takes a few seconds."
            : isCard && paid
            ? "has been placed and your card payment is confirmed. Our team will start preparing it shortly."
            : "has been placed. We've opened WhatsApp so you can confirm the details with us directly."}
        </p>
        {!isCard && (
          <p className="mt-3 text-sm text-navy-soft">
            Our team will call you shortly to confirm. Payment is Cash on Delivery.
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/menu" className="btn-ghost">Order more</Link>
          <Link to="/" className="btn-navy">Back home</Link>
        </div>
      </div>
    </section>
  );
}
