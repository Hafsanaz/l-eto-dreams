import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import nutella from "@/assets/cake-nutella.jpg";
import kitkat from "@/assets/cake-kitkat.jpg";
import lotus from "@/assets/cake-lotus.jpg";
import sansebastian from "@/assets/cake-sansebastian.jpg";
import ferrero from "@/assets/cake-ferrero.jpg";
import german from "@/assets/cake-german.jpg";
import redvelvet from "@/assets/sundae-redvelvet.jpg";
import threemilk from "@/assets/cake-threemilk.jpg";
import cupcake from "@/assets/cupcake.jpg";
import pastries from "@/assets/pastries.jpg";
import croissant from "@/assets/pastry-croissant.jpg";
import { WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — L'ETO Bakeshop, Attock" },
      { name: "description", content: "Browse the L'ETO Bakeshop menu: signature cakes, cheesecakes, sundaes, cupcakes & pastries. Order on WhatsApp." },
      { property: "og:title", content: "Menu — L'ETO Bakeshop" },
      { property: "og:description", content: "Cakes, cheesecakes, sundaes, cupcakes & pastries — handcrafted in Attock." },
      { property: "og:image", content: nutella },
    ],
  }),
  component: Menu,
});

type Item = { name: string; desc: string; price: string; img: string };

const categories: { id: string; title: string; tagline: string; items: Item[] }[] = [
  {
    id: "cakes",
    title: "Cakes",
    tagline: "Layered, lavish, made to celebrate.",
    items: [
      { name: "Nutella Cake", desc: "Chocolate sponge layered with Nutella ganache & toasted hazelnuts.", price: "Rs 3,200", img: nutella },
      { name: "KitKat Cake", desc: "Whole KitKat bars wrapped around a chocolate truffle centre.", price: "Rs 3,500", img: kitkat },
      { name: "Ferrero Cake", desc: "Hazelnut praline cake topped with whole Ferrero Rocher.", price: "Rs 3,800", img: ferrero },
      { name: "German Fudge Cake", desc: "Dense chocolate fudge with coconut-pecan frosting.", price: "Rs 3,000", img: german },
      { name: "Three Milk Cake", desc: "Tres leches sponge soaked in three milks, cinnamon dust.", price: "Rs 2,600", img: threemilk },
    ],
  },
  {
    id: "cheesecakes",
    title: "Cheesecakes",
    tagline: "Silky, slow-baked, the L'ETO ritual.",
    items: [
      { name: "Lotus Cheesecake", desc: "Velvety cream cheese over Biscoff crust with caramel drizzle.", price: "Rs 2,800", img: lotus },
      { name: "San Sebastian", desc: "Caramelised burnt-top basque cheesecake with molten centre.", price: "Rs 3,000", img: sansebastian },
    ],
  },
  {
    id: "sundaes",
    title: "Sundaes",
    tagline: "Cold-spoon happiness.",
    items: [
      { name: "Red Velvet Sundae", desc: "Red velvet chunks, cream cheese drizzle & vanilla soft serve.", price: "Rs 750", img: redvelvet },
    ],
  },
  {
    id: "cupcakes",
    title: "Cupcakes",
    tagline: "A single bite of celebration.",
    items: [
      { name: "Vanilla Rose Cupcake", desc: "Vanilla sponge with rose-tinted buttercream & gold sugar.", price: "Rs 350", img: cupcake },
      { name: "Patisserie Box (6)", desc: "Six assorted buttercream cupcakes in our signature box.", price: "Rs 1,950", img: pastries },
    ],
  },
  {
    id: "pastries",
    title: "Pastries",
    tagline: "Buttery, flaky, fresh from the oven.",
    items: [
      { name: "Butter Croissant", desc: "Classic French croissant — laminated, golden, irresistible.", price: "Rs 420", img: croissant },
    ],
  },
];

function Menu() {
  return (
    <>
      {/* Header band */}
      <section className="bg-powder pb-16 pt-36 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
          <p className="eyebrow">The L'ETO Menu</p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl">
            A catalogue of <span className="italic text-gold">indulgence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-navy-soft">
            Every cake is baked to order. Prices are starting points — customizations welcome.
          </p>
          <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="text-[0.72rem] uppercase tracking-[0.22em] text-navy hover:text-gold">
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-powder pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28 py-16">
              <div className="mb-12 flex items-end justify-between gap-6">
                <div>
                  <p className="eyebrow">{cat.tagline}</p>
                  <h2 className="mt-3 font-display text-4xl md:text-5xl">{cat.title}</h2>
                </div>
                <span className="gold-rule hidden md:inline-block" style={{ width: "5rem" }} />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <article key={item.name} className="group flex flex-col bg-ivory shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]">
                    <div className="overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="aspect-[5/4] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-2xl">{item.name}</h3>
                        <span className="shrink-0 font-display text-lg text-gold">{item.price}</span>
                      </div>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-soft">{item.desc}</p>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-navy hover:text-gold"
                      >
                        Order on WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl text-ivory md:text-4xl">
            Something custom in mind?
          </h2>
          <p className="mt-4 text-ivory/75">Send us a reference and we'll bake it.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-gold mt-8">
            Message L'ETO on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
