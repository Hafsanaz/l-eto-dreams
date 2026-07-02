import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Bike } from "lucide-react";
import heroCake from "@/assets/hero-cake.jpg";
import { WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L'ETO Bakeshop — Premium Cakes & Desserts in Attock" },
      {
        name: "description",
        content:
          "Freshly baked happiness — handcrafted Nutella, Lotus, Ferrero & San Sebastian cakes in Attock. Takeaway or delivery.",
      },
      { property: "og:title", content: "L'ETO Bakeshop — Premium Cakes in Attock" },
      { property: "og:description", content: "Your Imagination, Our Creation." },
      { property: "og:image", content: heroCake },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy">
      {/* Background image + gradients */}
      <img
        src={heroCake}
        alt="L'ETO signature chocolate cake with gold leaf"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        width={1920}
        height={1280}
      />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/55 via-navy/30 to-navy/85" />

      {/* floating decorations */}
      <div className="float-slow pointer-events-none absolute left-[8%] top-[22%] hidden h-16 w-16 rounded-full bg-gold/30 blur-2xl md:block" />
      <div
        className="float-slow pointer-events-none absolute right-[12%] top-[28%] hidden h-24 w-24 rounded-full bg-powder/40 blur-3xl md:block"
        style={{ animationDelay: "2s" }}
      />

      {/* Centred brand block */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 text-center md:px-10 md:pt-36">
        <div className="fade-up max-w-3xl">
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-ivory md:text-7xl lg:text-[5.5rem]">
            <span className="italic">L'</span>ETO
            <span className="block text-gold">Bakeshop</span>
          </h1>
          <p className="mt-5 font-display text-xl italic text-ivory/90 md:text-2xl">
            Freshly baked happiness.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ivory/75 md:text-base">
            Premium handcrafted cakes and desserts — your imagination, our creation.
          </p>
        </div>
      </div>

      {/* Two-portion choice — Takeaway / Delivery */}
      <div className="relative z-10 mx-auto grid w-full max-w-3xl grid-cols-1 gap-3 px-6 pb-10 pt-6 sm:grid-cols-2 md:gap-4 md:px-10 md:pb-14">
        <ChoiceCard
          href="/contact"
          internal
          icon={ShoppingBag}
          eyebrow="Visit the bakeshop"
          title="Takeaway"
          sub="Walk in, pick up freshly baked cakes & pastries."
        />
        <ChoiceCard
          href={WHATSAPP_URL}
          icon={Bike}
          eyebrow="Order on WhatsApp"
          title="Delivery"
          sub="We'll bring the celebration to your door."
        />
      </div>
    </section>
  );
}

function ChoiceCard({
  href,
  internal,
  icon: Icon,
  eyebrow,
  title,
  sub,
}: {
  href: string;
  internal?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  sub: string;
}) {
  const inner = (
    <>
      <div className="absolute inset-0 bg-navy/20 transition group-hover:bg-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-navy/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
        <div>
          <p className="eyebrow text-[10px] text-gold md:text-xs">{eyebrow}</p>
          <h2 className="mt-1 font-display text-xl text-ivory md:text-2xl">{title}</h2>
          <p className="mt-1 max-w-[14rem] text-[11px] text-ivory/75 md:text-xs">{sub}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/30 text-ivory transition group-hover:border-gold group-hover:bg-gold group-hover:text-navy md:h-10 md:w-10">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <span className="absolute right-4 top-4 text-ivory/0 transition group-hover:text-ivory">
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );

  const className =
    "group relative block aspect-[16/9] overflow-hidden rounded-2xl border border-ivory/30 bg-ivory/5 shadow-[var(--shadow-card)] backdrop-blur-md sm:aspect-[4/3] md:rounded-3xl";

  return internal ? (
    <Link to={href} className={className}>
      {inner}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  );
}
