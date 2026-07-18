import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_orders",
  title: "List orders",
  description:
    "List recent L'ETO Bakeshop orders (admin/staff only). Returns customer name, phone, address, items, total, and status.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).optional().describe("Max orders to return. Default 20."),
    status: z
      .string()
      .optional()
      .describe("Optional order status filter (e.g. 'pending', 'confirmed', 'delivered', 'cancelled')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const sb = supabaseForUser(ctx);
    let q = sb
      .from("orders")
      .select("id, created_at, customer_name, phone, address, items, subtotal, delivery_fee, total, status, payment_method, payment_status, notes")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) q = q.eq("status", status);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { orders: data ?? [] },
    };
  },
});
