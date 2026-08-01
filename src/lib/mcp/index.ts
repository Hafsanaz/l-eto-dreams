import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMenuTool from "./tools/get-menu";
import listOrdersTool from "./tools/list-orders";
import getOrderTool from "./tools/get-order";
import updateOrderStatusTool from "./tools/update-order-status";

// The OAuth issuer must be the direct Supabase host (not the .lovable.cloud proxy).
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "leto-bakeshop-mcp",
  title: "L'ETO Bakeshop",
  version: "0.1.0",
  instructions:
    "Tools for L'ETO Bakeshop in Attock, Pakistan. Use `get_menu` to see items and prices. Admin/staff tools `list_orders`, `get_order`, and `update_order_status` operate on the signed-in user's account under RLS.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMenuTool, listOrdersTool, getOrderTool, updateOrderStatusTool],
});
