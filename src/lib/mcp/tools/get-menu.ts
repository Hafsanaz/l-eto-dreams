import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

type Item = { name: string; price: number; unit?: string; description?: string };
const MENU: Record<string, Item[]> = {
  Cakes: [
    { name: "Kit Kat Cake", price: 2500 },
    { name: "Nutella Cake", price: 2500 },
    { name: "German Fudge Cake", price: 2200 },
    { name: "Ferrero Classic Cake", price: 2500 },
    { name: "Lotus Cheesecake", price: 850, unit: "slice" },
    { name: "San Sebastian Cheesecake", price: 1100, unit: "slice" },
  ],
  Cupcakes: [
    { name: "Oreo Cupcake", price: 250 },
    { name: "Lotus Cupcake", price: 230 },
    { name: "Nutella Cupcake", price: 250 },
    { name: "Belgium Cupcake", price: 230 },
  ],
  Sundaes: [
    { name: "Three Milk Sundae", price: 400 },
    { name: "Nutella Sundae", price: 450 },
    { name: "Pistachio Sundae", price: 500 },
    { name: "Lotus Biscoff Sundae", price: 440 },
  ],
  Pastries: [
    { name: "Nutella Pastry", price: 250 },
    { name: "Lotus Biscoff Pastry", price: 250 },
    { name: "Red Velvet Pastry", price: 250 },
  ],
  Cookies: [
    { name: "Classic Cookie", price: 350 },
    { name: "Nutella Cookie", price: 380 },
    { name: "Lotus Cookie", price: 380 },
  ],
  Others: [
    { name: "Banana Bread", price: 450 },
    { name: "Caramel Three Milk", price: 350 },
    { name: "Kunafa Chocolate Bliss", price: 550 },
    { name: "Chocolate Ball", price: 90 },
  ],
};

export default defineTool({
  name: "get_menu",
  title: "Get menu",
  description:
    "Return the full L'ETO Bakeshop menu with categories, item names, and prices in PKR. Optional category filter.",
  inputSchema: {
    category: z.string().optional().describe("Optional category name (e.g. 'Cakes', 'Cupcakes')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const filtered = category
      ? { [category]: MENU[category] ?? [] }
      : MENU;
    return {
      content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }],
      structuredContent: { menu: filtered, currency: "PKR" },
    };
  },
});
