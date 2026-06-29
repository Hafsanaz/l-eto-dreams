import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Instagram, ArrowRight, Sparkles, Leaf, Cake, ShieldCheck, Heart, Flower2 } from "lucide-react";
import heroCake from "@/assets/hero-cake.jpg";
import nutella from "@/assets/cake-nutella.jpg";
import kitkat from "@/assets/cake-kitkat.jpg";
import lotus from "@/assets/cake-lotus.jpg";
import sansebastian from "@/assets/cake-sansebastian.jpg";
import ferrero from "@/assets/cake-ferrero.jpg";
import german from "@/assets/cake-german.jpg";
import redvelvet from "@/assets/sundae-redvelvet.jpg";
import threemilk from "@/assets/cake-threemilk.jpg";
import storefront from "@/assets/storefront.jpg";
import pastries from "@/assets/pastries.jpg";
import cupcake from "@/assets/cupcake.jpg";
import { PHONE_DISPLAY, PHONE_TEL, SOCIAL, WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L'ETO Bakeshop — Premium Cakes & Desserts in Attock" },
      {
        name: "description",
        content:
          "Freshly baked happiness — handcrafted Nutella, Lotus, Ferrero & San Sebastian cakes in Attock. Order on WhatsApp.",
      },
      { property: "og:title", content: "L'ETO Bakeshop — Premium Cakes in Attock" },
      { property: "og:description", content: "Your Imagination, Our Creation." },
      { property: "og:image", content: heroCake },
    ],
  }),
  component: Home,
});

const featured = [
  { name: "Nutella Cake", desc: "Rich chocolate sponge layered with Nutella ganache and toasted hazelnuts.", price: "Rs 3,200", img: nutella },
  { name: "KitKat Cake", desc: "A celebration cake wrapped in KitKat with chocolate truffle filling.", price: "Rs 3,500", img: kitkat },
  { name: "Lotus Cheesecake", desc: "Velvety cream cheese over Biscoff crust, finished with caramel drizzle.", price: "Rs 2,800", img: lotus },
  { name: "San Sebastian Cheesecake", desc: "Burnt-top basque cheesecake with a custardy molten centre.", price: "Rs 3,000", img: sansebastian },
  { name: "Ferrero Cake", desc: "Hazelnut chocolate layers crowned with whole Ferrero Rocher.", price: "Rs 3,800", img: ferrero },
  { name: "German Fudge Cake", desc: "Dense chocolate fudge with coconut-pecan frosting.", price: "Rs 3,000", img: german },
];

const features = [
  { icon: Sparkles, t: "Freshly Baked Daily", d: "Every cake is baked the morning of your celebration." },
  { icon: Leaf, t: "Premium Ingredients", d: "Belgian chocolate, French cream, real fruit — no compromises." },
  { icon: Cake, t: "Customized Cakes", d: "Bespoke designs for weddings, birthdays and corporate events." },
  { icon: ShieldCheck, t: "Hygienic Environment", d: "An immaculate kitchen you would happily eat in." },
  { icon: Flower2, t: "Beautiful Presentation", d: "Every box leaves the shop styled like a gift." },
  { icon: Heart, t: "Made With Love", d: "A family bakery treating every order like it's our own." },
];

const favourites = [
  { name: "Nutella Cake", img: nutella },
  { name: "Lotus Cheesecake", img: lotus },
  { name: "Red Velvet Sundae", img: redvelvet },
  { name: "Three Milk Cake", img: threemilk },
];

const instaTiles = [nutella, lotus, ferrero, redvelvet, sansebastian, pastries, threemilk, kitkat];

function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={heroCake}
          alt="L'ETO signature chocolate cake with gold leaf"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/40 via-transparent to-navy/80" />

        {/* floating decorations */}
        <div className="float-slow pointer-events-none absolute left-[8%] top-[22%] hidden h-16 w-16 rounded-full bg-gold/30 blur-2xl md:block" />
        <div className="float-slow pointer-events-none absolute right-[12%] top-[34%] hidden h-24 w-24 rounded-full bg-powder/40 blur-3xl md:block" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pb-32 md:pt-48">
          <div className="max-w-2xl fade-up">
            <p className="eyebrow text-gold">Patisserie · Attock, Pakistan</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ivory md:text-7xl lg:text-[5.5rem]">
              <span className="italic">L'</span>ETO
              <span className="block text-gold">Bakeshop</span>
            </h1>
            <p className="mt-6 font-display text-xl italic text-ivory/90 md:text-2xl">
              Freshly baked happiness.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory/80">
              Premium handcrafted cakes and desserts, made by hand in small batches —
              your imagination, our creation.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-gold">View Menu</Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-ghost border-ivory/60 text-ivory hover:bg-ivory hover:text-navy">
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ivory/85">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" /> Teen Meela Chowk, Attock
              </span>
              <a href={PHONE_TEL} className="inline-flex items-center gap-2 hover:text-gold">
                <Phone className="h-4 w-4 text-gold" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Signature Selection</p>
            <h2 className="mt-5 font-display text-4xl md:text-5xl">
              The L'ETO catalogue
            </h2>
            <p className="mt-5 text-navy-soft">
              Six bestsellers, handcrafted daily in our Attock kitchen.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <article key={p.name} className="group">
                <div className="relative overflow-hidden bg-powder">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl">{p.name}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-soft">{p.desc}</p>
                  </div>
                  <span className="shrink-0 font-display text-lg text-gold">{p.price}</span>
                </div>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-navy hover:text-gold"
                >
                  Order on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/menu" className="btn-navy">Explore Full Menu</Link>
          </div>
        </div>
      </section>

      {/* ============ ABOUT / IMAGE FADE ============ */}
      <section className="relative isolate overflow-hidden">
        <img
          src={storefront}
          alt="L'ETO Bakeshop interior"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ivory via-ivory/85 to-ivory/20 md:via-ivory/70" />

        <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
          <div className="max-w-xl">
            <p className="eyebrow">Why L'ETO</p>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
              A little bit of Paris, in the heart of Attock.
            </h2>
            <p className="mt-6 text-navy-soft">
              Inspired by the great European patisseries, we obsess over every detail —
              from the temperature of the cream to the curve of a chocolate shard.
            </p>

            <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg">{f.t}</h3>
                    <p className="mt-1 text-sm text-navy-soft">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CUSTOMER FAVOURITES ============ */}
      <section className="bg-powder py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-baseline justify-between gap-4 md:flex-row">
            <div>
              <p className="eyebrow">Customer favourites</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">Most loved this season</h2>
            </div>
            <Link to="/reviews" className="text-[0.78rem] uppercase tracking-[0.22em] text-navy hover:text-gold">
              Read reviews →
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
            {favourites.map((f) => (
              <figure key={f.name} className="group">
                <div className="overflow-hidden rounded-sm bg-ivory">
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-4 font-display text-lg">{f.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INSTAGRAM ============ */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">@letobakeshop</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">From our kitchen to your feed</h2>
            <p className="mt-4 text-navy-soft">Follow us for daily bakes, behind-the-scenes and custom creations.</p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
            {instaTiles.map((src, i) => (
              <a key={i} href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="group relative block overflow-hidden">
                <img
                  src={src}
                  alt="L'ETO Bakeshop instagram"
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition group-hover:bg-navy/40">
                  <Instagram className="h-6 w-6 -translate-y-2 text-ivory opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="btn-navy">
              <Instagram className="h-4 w-4" /> Follow Us on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative isolate overflow-hidden bg-navy py-24 md:py-32">
        <img src={cupcake} alt="" aria-hidden="true" loading="lazy"
          className="absolute -right-20 top-1/2 hidden h-[480px] w-[480px] -translate-y-1/2 rounded-full object-cover opacity-30 mix-blend-luminosity md:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy to-navy/30" />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="eyebrow">Ready to celebrate?</p>
          <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl">
            Order your <span className="italic text-gold">dream cake</span> today.
          </h2>
          <p className="mt-6 text-ivory/75">
            Tell us what you're imagining — we'll bake it into something unforgettable.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-gold">WhatsApp Us</a>
            <a href={PHONE_TEL} className="btn-ghost border-ivory/60 text-ivory hover:bg-ivory hover:text-navy">
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
