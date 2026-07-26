// /api/chat.ts
// Vercel Serverless Function — runs on the server, never in the browser.
// Keeps your GROQ_API_KEY secret and gives the AI a fixed, controlled
// "menu" and personality so it can't invent items or go off-brand.
//
// Requires: npm install @vercel/node --save-dev
 
import type { VercelRequest, VercelResponse } from "@vercel/node";
 
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
 
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { messages } = (req.body ?? {}) as { messages?: ChatMessage[] };
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
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
      return res.status(502).json({ error: "AI service unavailable" });
    }
 
    const data = (await groqResponse.json()) as GroqResponseBody;
    const reply = data.choices?.[0]?.message?.content?.trim();
 
    if (!reply) {
      return res.status(502).json({ error: "Empty response from AI" });
    }
 
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
