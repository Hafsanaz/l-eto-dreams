// src/routes/api/chat.ts
// TanStack Start Server Route — this runs ONLY on the server (Nitro),
// never in the browser. This is what keeps your GROQ_API_KEY secret.
//
// Because this project uses @tanstack/react-start's file-based server
// routes, this file at src/routes/api/chat.ts automatically becomes
// a live endpoint at POST /api/chat — no extra config needed.
 
import { createFileRoute } from "@tanstack/react-router";
 
type ChatRole = "system" | "user" | "assistant";
interface ChatMessage {
  role: ChatRole;
  content: string;
}
 
// ---- 1. Your real menu (EDIT THIS to match your actual menu items/prices) ----
const MENU = `
CAKES:
- Nutella Cake — Rs. 2200 (6"), Rs. 3200 (8") — rich chocolate sponge, Nutella cream
- Lotus Biscoff Cake — Rs. 2400 (6"), Rs. 3400 (8") — Lotus cream, biscuit crumble
- Ferrero Rocher Cake — Rs. 2600 (6"), Rs. 3600 (8") — hazelnut chocolate, Ferrero topping
- San Sebastian Cheesecake — Rs. 2000 — baked Basque-style cheesecake
- Red Velvet Cake — Rs. 2000 (6"), Rs. 3000 (8") — cream cheese frosting
- Chocolate Fudge Cake — Rs. 1800 (6"), Rs. 2800 (8")
 
CUPCAKES (Rs. 250–350 each):
- Nutella Cupcake, Lotus Cupcake, Red Velvet Cupcake, Vanilla Bean Cupcake
 
SUNDAES (Rs. 500–700):
- Nutella Sundae, Lotus Sundae, Oreo Sundae, Brownie Sundae
 
PASTRIES (Rs. 300–450): Nutella Pastry, Lotus Pastry, Chocolate Pastry
 
COOKIES (Rs. 150–250 each): Chocolate Chip, Double Chocolate, Lotus Cookie
 
BREAD: Banana Bread — Rs. 600
 
DESSERT: Caramel Three Milk Cake — Rs. 900
 
KUNAFA: Classic Kunafa — Rs. 800
 
CHOCO BLISS BALL: Rs. 200 each
`.trim();
// TODO: replace the placeholder prices/sizes above with your real ones.
 
const SYSTEM_PROMPT = `You are the friendly ordering assistant for L'ETO Bakeshop, a premium cake and dessert shop in Attock, Pakistan.
 
Your job: help customers pick the right cake or dessert based on what they tell you (occasion, flavor preference, budget, number of people), using ONLY the menu below. Never invent items, flavors, or prices that are not on this menu.
 
MENU:
${MENU}
 
RULES:
- Always recommend specific real items from the menu above, with their price.
- If the customer's budget or preference doesn't match anything, say so honestly and suggest the closest real option.
- Keep replies short and warm — 2 to 4 sentences, like a helpful bakery staff member, not a wall of text.
- If they seem ready to order, tell them to tap "Order on WhatsApp" or call +92 335 6633668.
- Do not discuss anything unrelated to L'ETO Bakeshop, its menu, hours (Mon–Thu 11am–11pm, Fri–Sun 11am–12am), or location (Opposite Total Parco Petrol Pump, Near Teen Meela Chowk, Attock).
- Never make medical claims (e.g. about allergies) with certainty — tell the customer to confirm allergens by calling the shop directly.`;
 
interface GroqChoice {
  message?: { content?: string };
}
interface GroqResponseBody {
  choices?: GroqChoice[];
}
 
export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ChatMessage[] };
        try {
          body = await request.json();
        } catch {
          return new Response(
            JSON.stringify({ error: "Invalid JSON body" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
 
        const messages = body.messages;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response(
            JSON.stringify({ error: "messages array is required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
 
        // Basic guardrail: cap history length sent to the model
        const trimmedHistory = messages.slice(-10);
 
        try {
          const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              },
              body: JSON.stringify({
                // Free, fast Groq-hosted model. Swap if Groq renames/retires this model.
                model: "llama-3.1-8b-instant",
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  ...trimmedHistory,
                ],
                temperature: 0.6,
                max_tokens: 300,
              }),
            }
          );
 
          if (!groqResponse.ok) {
            const errText = await groqResponse.text();
            console.error("Groq API error:", errText);
            return new Response(
              JSON.stringify({ error: "AI service unavailable" }),
              { status: 502, headers: { "Content-Type": "application/json" } }
            );
          }
 
          const data = (await groqResponse.json()) as GroqResponseBody;
          const reply = data.choices?.[0]?.message?.content?.trim();
 
          if (!reply) {
            return new Response(
              JSON.stringify({ error: "Empty response from AI" }),
              { status: 502, headers: { "Content-Type": "application/json" } }
            );
          }
 
          return Response.json({ reply });
        } catch (err) {
          console.error("Chat handler error:", err);
          return new Response(
            JSON.stringify({ error: "Something went wrong" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
