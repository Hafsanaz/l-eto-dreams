import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_order_status",
  title: "Update order status",
  description:
    "Change the fulfilment status of a L'ETO Bakeshop order (admin/staff only). Common values: pending, confirmed, preparing, out_for_delivery, delivered, cancelled.",
  inputSchema: {
    id: z.string().uuid().describe("Order id (UUID)."),
    status: z.string().min(1).describe("New status string."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const sb = supabaseForUser(ctx);
    const { data, error } = await sb
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: `Order ${id} not found or access denied.` }], isError: true };
    return {
      content: [{ type: "text", text: `Order ${id} status set to '${status}'.` }],
      structuredContent: { order: data },
    };
  },
});
