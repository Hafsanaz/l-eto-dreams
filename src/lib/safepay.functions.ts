import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Safepay endpoints
// Sandbox: https://sandbox.api.getsafepay.com
// Live:    https://api.getsafepay.com
// Hosted checkout redirect: {base}/embedded/?tracker=TRK&env=sandbox|production

function safepayBase(env: string) {
  return env === "production"
    ? "https://api.getsafepay.com"
    : "https://sandbox.api.getsafepay.com";
}

export const createSafepayCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: { orderId: string }) =>
    z.object({ orderId: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.SAFEPAY_API_KEY;
    const env = process.env.SAFEPAY_ENVIRONMENT || "sandbox";
    if (!apiKey) {
      throw new Error("Safepay is not configured. Missing SAFEPAY_API_KEY.");
    }

    // Read the order using server publishable client (order row must exist).
    // We use a server-side supabase client keyed by SUPABASE_URL/PUBLISHABLE key;
    // for reading our just-created order we need a query that doesn't require auth.
    // Since RLS on orders only allows admins/staff to SELECT, we use the admin
    // client here to look up the total server-side. This is a trusted server fn.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id,total,customer_name,phone")
      .eq("id", data.orderId)
      .single();

    if (error || !order) {
      throw new Error("Order not found");
    }

    const base = safepayBase(env);

    // Initialise a Safepay payment session
    const initRes = await fetch(`${base}/order/payments/v3.1/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sfpy-merchant-secret": apiKey,
      },
      body: JSON.stringify({
        client: "sfpy_merchant",
        environment: env,
        amount: Math.round(Number(order.total) * 100), // paisa
        currency: "PKR",
        order_id: order.id,
      }),
    });

    if (!initRes.ok) {
      const body = await initRes.text().catch(() => "");
      console.error("Safepay init failed", initRes.status, body);
      throw new Error("Payment gateway is unavailable. Please try again.");
    }

    const initJson = (await initRes.json()) as {
      data?: { tracker?: { token?: string } | string };
      tracker?: string;
    };

    const tracker =
      typeof initJson?.data?.tracker === "string"
        ? initJson.data.tracker
        : initJson?.data?.tracker?.token ?? initJson?.tracker;

    if (!tracker) {
      console.error("Safepay init returned no tracker", initJson);
      throw new Error("Payment gateway returned an invalid response.");
    }

    // Persist tracker on the order for webhook reconciliation
    await supabaseAdmin
      .from("orders")
      .update({ payment_reference: tracker, payment_status: "pending" })
      .eq("id", order.id);

    const checkoutUrl = `${base}/embedded/?tracker=${encodeURIComponent(
      tracker,
    )}&env=${env}&source=custom`;

    return { checkoutUrl, tracker };
  });

// Public read for order-success page (post-payment). Returns only safe fields.
export const getOrderPaymentStatus = createServerFn({ method: "GET" })
  .inputValidator((data: { orderId: string }) =>
    z.object({ orderId: z.string().uuid() }).parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id,payment_status,payment_method,total")
      .eq("id", data.orderId)
      .single();
    if (error || !order) return null;
    return order;
  });
