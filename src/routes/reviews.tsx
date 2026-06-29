import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — L'ETO Bakeshop, Attock" },
      { name: "description", content: "100+ Google reviews. See why L'ETO Bakeshop is rated 4.3 stars by customers in Attock." },
      { property: "og:title", content: "Reviews — L'ETO Bakeshop" },
      { property: "og:description", content: "4.3 stars on Google · 100+ reviews from happy customers in Attock." },
    ],
  }),
  component: Reviews,
});

const reviews = [
  { name: "Ahmed K.", role: "Local Guide", stars: 5, text: "Best bakery in Attock. Their Nutella pastry is my favourite every weekend." },
  { name: "Sara M.", stars: 5, text: "Lotus cheesecake is absolutely amazing. Perfect texture, perfect sweetness." },
  { name: "Bilal R.", stars: 4, text: "Fresh cakes and excellent ambiance. Staff are very welcoming." },
  { name: "Hina J.", stars: 5, text: "One of the best bakeshops in Attock. Their customized birthday cakes are stunning." },
  { name: "Usman A.", stars: 5, text: "Wonderful customized cakes — got a Ferrero cake for my anniversary and it blew everyone away." },
  { name: "Mariam S.", stars: 4, text: "San Sebastian cheesecake tastes exactly like the ones I had in Spain. Worth every rupee." },
];

function Reviews() {
  return (
    <>
      <section className="bg-powder pb-16 pt-36 md:pt-44">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="eyebrow">Loved in Attock</p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl">What our guests say</h1>

          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-7 w-7 fill-gold text-gold" />
              ))}
              <Star className="h-7 w-7 fill-gold/50 text-gold" />
            </div>
            <p className="font-display text-3xl">
              <span className="text-gold">4.3</span>
              <span className="text-navy-soft"> / 5</span>
            </p>
            <p className="text-sm uppercase tracking-[0.22em] text-navy-soft">100+ Google Reviews</p>
            <a
              href="https://www.google.com/search?q=L%27ETO+Bakeshop+Attock"
              target="_blank"
              rel="noreferrer"
              className="btn-navy mt-4"
            >
              View on Google
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <article
                key={i}
                className="relative flex flex-col border border-border bg-ivory p-8 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
              >
                <Quote className="absolute right-6 top-6 h-8 w-8 text-gold/30" />
                <div className="flex gap-1">
                  {Array.from({ length: r.stars }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                  {Array.from({ length: 5 - r.stars }).map((_, idx) => (
                    <Star key={`e${idx}`} className="h-4 w-4 text-gold/30" />
                  ))}
                </div>
                <p className="mt-6 flex-1 font-display text-lg italic leading-relaxed text-navy">
                  "{r.text}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-sm text-ivory">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy">{r.name}</p>
                    {r.role && <p className="text-xs text-navy-soft">{r.role}</p>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl text-ivory md:text-4xl">
            Tasted L'ETO? <span className="italic text-gold">Tell the world.</span>
          </h2>
          <p className="mt-4 text-ivory/75">Your review helps other Attock dessert-lovers find us.</p>
          <a
            href="https://www.google.com/search?q=L%27ETO+Bakeshop+Attock"
            target="_blank"
            rel="noreferrer"
            className="btn-gold mt-8"
          >
            Leave a Google Review
          </a>
        </div>
      </section>
    </>
  );
}
