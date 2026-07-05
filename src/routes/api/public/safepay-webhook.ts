import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

// Safepay webhook — configure this URL in your Safepay dashboard.
// URL: https://<your-domain>/api/public/safepay-webhook

type SafepayEvent = {
  type?: string;
  data?: {
    tracker?: string;
    state?: string; // e.g. "TRACKER_ENDED"
    metadata?: { order_id?: string };
    order?: { id?: string };
  };
};

export const Route = createFileRoute("/api/public/safepay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.SAFEPAY_WEBHOOK_SECRET;
        if (!secret) {
          console.error("SAFEPAY_WEBHOOK_SECRET is not configured");
          return new Response("Webhook not configured", { status: 500 });
        }

        const rawBody = await request.text();
        const signature =
          request.headers.get("x-sfpy-signature") ||
          request.headers.get("x-safepay-signature") ||
          "";

        const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
        const sig = Buffer.from(signature);
        const exp = Buffer.from(expected);
        if (sig.length !== exp.length || !timingSafeEqual(sig, exp)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let event: SafepayEvent;
        try {
          event = JSON.parse(rawBody);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const tracker = event.data?.tracker;
        const orderId = event.data?.metadata?.order_id || event.data?.order?.id;
        const state = event.data?.state || event.type || "";

        if (!tracker && !orderId) {
          return new Response("ok", { status: 200 });
        }

        // Map Safepay state → our internal status
        const paid = /succeed|ended|paid|completed|tracker_ended/i.test(state);
        const failed = /fail|cancel|declined|error/i.test(state);
        const nextStatus = paid ? "paid" : failed ? "failed" : "pending";

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const query = supabaseAdmin.from("orders").update({ payment_status: nextStatus });
        const { error } = orderId
          ? await query.eq("id", orderId)
          : await query.eq("payment_reference", tracker!);

        if (error) {
          console.error("Failed to update order payment_status", error);
          return new Response("db error", { status: 500 });
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
