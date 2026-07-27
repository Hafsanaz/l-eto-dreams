# 🍰 L'ETO Bakeshop

**A full-stack e-commerce website built for a real, expanding bakery business.**

L'ETO Bakeshop is a family bakery based in Attock, Pakistan, currently expanding with a new branch near Attock. This project replaces their informal, message-based ordering process (customers messaging on WhatsApp or calling to figure out what's available, prices, and how to order) with a proper online storefront: browsable menu, cart, checkout, order tracking for staff, and an AI assistant to help indecisive customers choose what to order — all built to also improve the bakery's discoverability through basic SEO.

**Built for:** L'ETO Bakeshop's owners and customers in Attock, Pakistan.
**Problem solved:** slow, informal, back-and-forth ordering (texting photos of a menu, asking prices one item at a time) replaced with a self-serve, always-available ordering experience — plus real search visibility instead of relying purely on word of mouth.

---

## 🔗 Live Site

### **[https://l-eto-dreams.vercel.app/](https://l-eto-dreams.vercel.app/)**

Repository: [github.com/Hafsanaz/l-eto-dreams](https://github.com/Hafsanaz/l-eto-dreams)

---

## ✨ Features

**Storefront**
- Elegant, branded landing page with hero section, category highlights, and clear calls to action
- Full menu browsing organized by category (Cakes, Cupcakes, Sundae, Pastry, Cookies, Bread, Kunafa, Dessert, Choco Bliss Balls)
- Product cards with images, descriptions, and pricing
- Add-to-cart with live cart drawer (quantity adjustment, item removal, running subtotal)
- Reviews page for social proof
- Contact page

**Ordering & Checkout**
- Full checkout flow: delivery details (name, phone, address), optional order notes, payment method selection
- Cash on Delivery payment method, with card payment clearly marked "coming soon"
- Server-side order validation (name/phone/address length checks, non-empty cart, positive total) enforced at the database level via Postgres Row Level Security — not just the frontend form
- Order confirmation page showing a real order ID, with an automatic WhatsApp handoff so the bakery can confirm details directly with the customer
- "Order on WhatsApp" quick-order shortcut available directly from product cards, for customers who prefer messaging over checkout

**AI Ordering Assistant**
- "Ask L'ETO" floating chat assistant that recommends real menu items based on a customer's occasion, flavor preference, or budget (see full details below)

**Staff / Admin**
- Authenticated admin area for managing incoming orders
- Role-based access control (admin/staff roles), enforced via database-level security policies, not just page-level checks

**SEO & Technical**
- Dynamically generated `sitemap.xml` for search engine indexing
- Structured meta tags (Open Graph, Twitter Card, page titles/descriptions) for better link previews and search ranking
- Fully responsive, fast-loading, server-rendered pages via TanStack Start

---

## 🤖 The AI Feature: "Ask L'ETO"

A floating chat assistant (bottom-right of every page) that helps customers pick a cake or dessert in seconds, instead of scrolling the whole menu or messaging the bakery to ask "what do you recommend?"

**What it does:**
- Takes a customer's occasion, flavor mood, or budget in plain language (e.g. *"I have 3000 rupees, what should I get for a birthday?"*)
- Recommends **only real items from L'ETO's actual menu**, with correct prices — it cannot invent products or prices that don't exist
- Points customers toward WhatsApp ordering or the shop's phone number once they're ready to order
- Stays on-topic: politely declines to discuss anything unrelated to the bakery

**How it works technically:**
A message from the customer is sent to a server-side endpoint (`/api/chat`), which calls Groq's hosted **Llama 3.1 8B Instant** model together with a fixed system prompt and the bakery's real menu. The AI's response is streamed back to the chat widget. The API key never reaches the browser — all model calls happen server-side.

**The exact system prompt used:**

```
You are the friendly ordering assistant for L'ETO Bakeshop, a premium cake
and dessert shop in Attock, Pakistan.

Your job: help customers pick the right cake or dessert based on what they
tell you (occasion, flavor preference, budget, number of people), using
ONLY the menu below. Never invent items, flavors, or prices that are not
on this menu.

MENU:
[full current menu with items and prices is inserted here]

RULES:
- Always recommend specific real items from the menu above, with their price.
- If the customer's budget or preference doesn't match anything, say so
  honestly and suggest the closest real option.
- Keep replies short and warm — 2 to 4 sentences, like a helpful bakery
  staff member, not a wall of text.
- If they seem ready to order, tell them to tap "Order on WhatsApp" or
  call +92 335 6633668.
- Do not discuss anything unrelated to L'ETO Bakeshop, its menu, hours
  (Mon–Thu 11am–11pm, Fri–Sun 11am–12am), or location (Opposite Total
  Parco Petrol Pump, Near Teen Meela Chowk, Attock).
- Never make medical claims (e.g. about allergies) with certainty — tell
  the customer to confirm allergens by calling the shop directly.
```

This prompt design deliberately constrains the assistant to the shop's real inventory (preventing hallucinated products), keeps replies short and human, and redirects toward the existing WhatsApp/phone ordering channels rather than trying to replace them.

**It in action:**
![Ask L'ETO assistant recommending a cake based on budget](./screenshots/00-ai-assistant.png)
*A customer mentions a birthday and a Rs. 3000 budget — the assistant recommends the KitKat Cake (Rs. 2500), a real menu item within budget.*

---

## 🛠️ Tools, Services & Models Used

**Frontend**
- [TanStack Start](https://tanstack.com/start) (React 19) — full-stack React framework with file-based routing and server routes
- [TanStack Router](https://tanstack.com/router) & [TanStack Query](https://tanstack.com/query) — routing and data-fetching
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [Radix UI](https://www.radix-ui.com/) primitives + [shadcn/ui](https://ui.shadcn.com/)-style components — accessible UI building blocks
- [Lucide React](https://lucide.dev/) — icon set (used for the AI assistant's Bot icon, send button, etc.)

**Backend / Infrastructure**
- [Lovable Cloud](https://lovable.dev/) (Supabase-based) — managed Postgres database, authentication, and Row Level Security policies
- [Vercel](https://vercel.com/) — hosting and deployment
- Nitro (via TanStack Start) — server runtime for API/server routes

**AI**
- [Groq](https://groq.com/) API — fast inference hosting
- **Llama 3.1 8B Instant** — the language model powering the "Ask L'ETO" assistant

**Build Tooling**
- Vite 8, TypeScript, ESLint, Prettier
- Built and iterated with the help of [Lovable](https://lovable.dev/) (AI-assisted development) and [Claude](https://claude.ai/) (feature scoping, debugging, and this documentation)

---

## 📸 Screenshots

**AI Assistant — "Ask L'ETO" in action**
![Ask L'ETO assistant conversation](./screenshots/00-ai-assistant.png)

**Home page**
![Home page](./screenshots/01-home.png)

**Menu — category browsing**
![Menu categories](./screenshots/02-menu.png)

**Menu — product listing**
![Cupcake listing](./screenshots/03-cupcakes.png)

**Cart**
![Cart drawer](./screenshots/04-cart.png)

**Checkout**
![Checkout delivery details](./screenshots/05-checkout-details.png)
![Checkout payment method](./screenshots/06-checkout-payment.png)

**Order confirmation**
![Order success page](./screenshots/07-order-success.png)

---

## 🚀 How to Run This Project

### Prerequisites
- Node.js (v18+ recommended)
- A [Groq API key](https://console.groq.com/keys) (free tier available)
- Access to the project's Lovable Cloud / Supabase instance (for database features — checkout, orders, admin panel)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Hafsanaz/l-eto-dreams.git
cd l-eto-dreams

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file in the project root with:
```

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
GROQ_API_KEY=your_groq_api_key
```

```bash
# 4. Run the development server
npm run dev
```

The app will be available at `http://localhost:3000` (or the port shown in your terminal).

### Building for production

```bash
npm run build
npm run preview
```

### Deployment

This project is deployed on **Vercel**, connected directly to the GitHub repository for automatic deployments on every push to `main`. Environment variables (`GROQ_API_KEY`, Supabase credentials) are configured in Vercel's **Settings → Environment Variables**, applied across Production, Preview, and Development environments.

---

## 📄 License

This project was built as an academic exercise for a real small business (L'ETO Bakeshop, Attock). All bakery branding, product names, and imagery belong to L'ETO Bakeshop.
