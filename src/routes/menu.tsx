import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { whatsappOrderUrl } from "@/lib/contact";

// Existing assets
import kitkat from "@/assets/cake-kitkat.jpg";
import nutella from "@/assets/cake-nutella.jpg";
import german from "@/assets/cake-german.jpg";
import ferrero from "@/assets/cake-ferrero.jpg";
import lotusCake from "@/assets/cake-lotus.jpg";
import sansebastian from "@/assets/cake-sansebastian.jpg";

// Generated menu assets
import bananaBread from "@/assets/menu/banana-bread.jpg";
import caramelThreeMilk from "@/assets/menu/caramel-three-milk.jpg";
import kunafa from "@/assets/menu/kunafa.jpg";
import chocoBliss from "@/assets/menu/choco-bliss-ball.jpg";
import oreoCupcake from "@/assets/menu/oreo-cupcake.jpg";
import lotusCupcake from "@/assets/menu/lotus-cupcake.jpg";
import nutellaCupcake from "@/assets/menu/nutella-cupcake.jpg";
import belgiumCupcake from "@/assets/menu/belgium-cupcake.jpg";
import threeMilkSundae from "@/assets/menu/three-milk-sundae.jpg";
import nutellaSundae from "@/assets/menu/nutella-sundae.jpg";
import pistachioSundae from "@/assets/menu/pistachio-sundae.jpg";
import lotusSundae from "@/assets/menu/lotus-sundae.jpg";
import nutellaPastry from "@/assets/menu/nutella-pastry.jpg";
import lotusPastry from "@/assets/menu/lotus-pastry.jpg";
import redVelvetPastry from "@/assets/menu/red-velvet-pastry.jpg";
import classicCookie from "@/assets/menu/classic-cookie.jpg";
import nutellaCookie from "@/assets/menu/nutella-cookie.jpg";
import lotusCookie from "@/assets/menu/lotus-cookie.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — L'ETO Bakeshop, Attock" },
      { name: "description", content: "Browse the L'ETO Bakeshop menu: cakes, cupcakes, sundaes, pastries, cookies, bread, dessert & kunafa. Order on WhatsApp." },
      { property: "og:title", content: "Menu — L'ETO Bakeshop" },
      { property: "og:description", content: "Cakes, cupcakes, sundaes, pastries & more — handcrafted in Attock." },
      { property: "og:image", content: nutella },
    ],
  }),
  component: Menu,
});

type Item = { name: string; desc: string; price: string; img: string };
type Category = { id: string; title: string; tagline: string; cover: string; items: Item[] };

const categories: Category[] = [
  {
    id: "cakes",
    title: "Cakes",
    tagline: "Layered, lavish, made to celebrate.",
    cover: nutella,
    items: [
      { name: "Kit Kat Cake", desc: "Rich chocolate cake topped with KitKat bars.", price: "Rs 2,500", img: kitkat },
      { name: "Nutella Cake", desc: "Decadent chocolate sponge with creamy Nutella filling.", price: "Rs 2,500", img: nutella },
      { name: "German Fudge Cake", desc: "Light vanilla sponge layered with caramel & coconut.", price: "Rs 2,200", img: german },
      { name: "Ferrero Classic Cake", desc: "Loaded with chocolate & almonds — pure indulgence.", price: "Rs 2,500", img: ferrero },
      { name: "Lotus Cheese Cake", desc: "Creamy cheesecake topped with Lotus Biscoff drizzle.", price: "Rs 850 / slice", img: lotusCake },
      { name: "San Sebastian Cake", desc: "Burnt-top basque cheesecake — caramelised & creamy.", price: "Rs 1,100 / slice", img: sansebastian },
    ],
  },
  {
    id: "cupcakes",
    title: "Cupcake",
    tagline: "A single bite of celebration.",
    cover: nutellaCupcake,
    items: [
      { name: "Oreo Cupcake", desc: "Oreo cookies with cream cheese & chocolate base.", price: "Rs 250", img: oreoCupcake },
      { name: "Lotus Cupcake", desc: "Creamy, delight topped with a Lotus biscuit.", price: "Rs 230", img: lotusCupcake },
      { name: "Nutella Cupcake", desc: "Hazelnut frosting and Nutella heart inside.", price: "Rs 250", img: nutellaCupcake },
      { name: "Belgium Cupcake", desc: "Rich chocolate cupcake with frosted ganache.", price: "Rs 230", img: belgiumCupcake },
    ],
  },
  {
    id: "sundae",
    title: "Sundae",
    tagline: "Cold-spoon happiness.",
    cover: nutellaSundae,
    items: [
      { name: "Three Milk Sundae", desc: "Vanilla sponge soaked in three milks, topped with cream.", price: "Rs 400", img: threeMilkSundae },
      { name: "Nutella Sundae", desc: "Roasted nuts with Nutella mousse & creamy layers.", price: "Rs 450", img: nutellaSundae },
      { name: "Pistachio Sundae", desc: "Crunchy, creamy pistachio sundae fest.", price: "Rs 500", img: pistachioSundae },
      { name: "Lotus Biscoff Sundae", desc: "Crunchy lotus with creamy stack.", price: "Rs 440", img: lotusSundae },
    ],
  },
  {
    id: "pastry",
    title: "Pastry",
    tagline: "Buttery, flaky, fresh from the oven.",
    cover: nutellaPastry,
    items: [
      { name: "Nutella Pastry", desc: "Rich chocolate filled with creamy Nutella centre.", price: "Rs 250", img: nutellaPastry },
      { name: "Lotus Biscoff Pastry", desc: "Crunchy biscoff swirl with velvety cheesecake delight.", price: "Rs 250", img: lotusPastry },
      { name: "Red Velvet Pastry", desc: "Red velvet sponge with smooth cream cheese frosting.", price: "Rs 250", img: redVelvetPastry },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    tagline: "Warm, gooey & freshly baked.",
    cover: nutellaCookie,
    items: [
      { name: "Classic Cookie", desc: "Buttery cookie loaded with chocolate chips.", price: "Rs 350", img: classicCookie },
      { name: "Nutella Cookie", desc: "Soft cookie with molten Nutella centre.", price: "Rs 380", img: nutellaCookie },
      { name: "Lotus Cookie", desc: "Caramelised lotus filling in a soft cookie.", price: "Rs 380", img: lotusCookie },
    ],
  },
  {
    id: "bread",
    title: "Bread",
    tagline: "Soft, sweet & made fresh daily.",
    cover: bananaBread,
    items: [
      { name: "Banana Bread", desc: "Soft, sweet & moist loaf made fresh daily.", price: "Rs 450", img: bananaBread },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    tagline: "Sweet endings, slow indulgence.",
    cover: caramelThreeMilk,
    items: [
      { name: "Caramel Three Milk", desc: "Milk-soaked sponge squares layered with silky caramel.", price: "Rs 350", img: caramelThreeMilk },
    ],
  },
  {
    id: "kunafa",
    title: "Kunafa",
    tagline: "Crisp pastry, melting centre.",
    cover: kunafa,
    items: [
      { name: "Kunafa Chocolate Bliss", desc: "Chocolate-wrapped square layered with pistachio & crushed almonds.", price: "Rs 550", img: kunafa },
    ],
  },
  {
    id: "bliss",
    title: "Choco Bliss Ball",
    tagline: "A single bite of bliss.",
    cover: chocoBliss,
    items: [
      { name: "Chocolate Ball", desc: "A truffle ball with a rich chocolate centre.", price: "Rs 90", img: chocoBliss },
    ],
  },
];

function Menu() {
  const [active, setActive] = useState<Category | null>(null);

  return (
    <section className="bg-powder min-h-screen pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {!active ? (
          <>
            <div className="text-center">
              <p className="eyebrow">The L'ETO Menu</p>
              <h1 className="mt-5 font-display text-5xl md:text-7xl">
                A catalogue of <span className="italic text-gold">indulgence</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-navy-soft">
                Choose a category to explore our handcrafted creations.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat)}
                  className="group relative aspect-[5/4] overflow-hidden bg-ivory text-left shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
                >
                  <img
                    src={cat.cover}
                    alt={cat.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold">{cat.items.length} item{cat.items.length > 1 ? "s" : ""}</p>
                    <h3 className="mt-2 font-display text-3xl text-ivory">{cat.title}</h3>
                    <p className="mt-1 text-sm text-ivory/75">{cat.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-ivory">
                      View Menu <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setActive(null)}
              className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-navy hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Categories
            </button>

            <div className="mt-8 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">{active.tagline}</p>
                <h2 className="mt-3 font-display text-4xl md:text-6xl">{active.title}</h2>
              </div>
              <span className="gold-rule hidden md:inline-block" style={{ width: "5rem" }} />
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {active.items.map((item) => (
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
                      href={whatsappOrderUrl(item.name)}
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
          </>
        )}
      </div>
    </section>
  );
}
