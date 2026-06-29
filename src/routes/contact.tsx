import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram, Facebook, Send } from "lucide-react";
import { useState } from "react";
import { ADDRESS_LINES, HOURS, PHONE_DISPLAY, PHONE_TEL, SOCIAL, WHATSAPP_URL } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — L'ETO Bakeshop, Attock" },
      { name: "description", content: "Visit L'ETO Bakeshop opposite Total Parco Petrol Pump, Teen Meela Chowk, Attock. Call +92 335 6633668 or WhatsApp to order." },
      { property: "og:title", content: "Contact L'ETO Bakeshop" },
      { property: "og:description", content: "Find us in Attock. Order via WhatsApp or call directly." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = encodeURIComponent(
      `Hi L'ETO Bakeshop,\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`,
    );
    window.open(`https://wa.me/923356633668?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <>
      <section className="bg-powder pb-16 pt-36 md:pt-44">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <p className="eyebrow">Say hello</p>
          <h1 className="mt-5 font-display text-5xl md:text-7xl">Visit the bakeshop</h1>
          <p className="mx-auto mt-5 max-w-xl text-navy-soft">
            Come say hi, pick up a cake, or send us a custom request — we'd love to bake for you.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10 lg:gap-20">
          {/* Info */}
          <div>
            <div className="space-y-10">
              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="eyebrow">Address</p>
                  <p className="mt-2 leading-relaxed text-navy">
                    {ADDRESS_LINES.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="eyebrow">Phone & WhatsApp</p>
                  <a href={PHONE_TEL} className="mt-2 block text-navy hover:text-gold">{PHONE_DISPLAY}</a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                    className="btn-navy mt-4">Message on WhatsApp</a>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="eyebrow">Opening hours</p>
                  <ul className="mt-2 space-y-1 text-navy">
                    {HOURS.map((h) => (
                      <li key={h.d} className="flex flex-col">
                        <span>{h.d}</span>
                        <span className="text-sm text-navy-soft">{h.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <p className="eyebrow">Follow</p>
                <div className="mt-4 flex gap-3">
                  <a href={SOCIAL.instagram} target="_blank" rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy hover:border-gold hover:text-gold">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href={SOCIAL.facebook} target="_blank" rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy hover:border-gold hover:text-gold">
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="border border-border bg-powder p-8 md:p-12">
            <p className="eyebrow">Custom enquiry</p>
            <h2 className="mt-3 font-display text-3xl">Tell us about your cake</h2>
            {sent ? (
              <p className="mt-8 rounded-sm bg-ivory p-6 text-sm text-navy">
                Thanks! Your message is ready in WhatsApp — just press send.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="eyebrow text-navy-soft" htmlFor="name">Name</label>
                  <input id="name" name="name" required
                    className="mt-2 w-full border-0 border-b border-navy/30 bg-transparent py-3 text-navy outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="eyebrow text-navy-soft" htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" required type="tel"
                    className="mt-2 w-full border-0 border-b border-navy/30 bg-transparent py-3 text-navy outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="eyebrow text-navy-soft" htmlFor="message">Your dream cake</label>
                  <textarea id="message" name="message" required rows={4}
                    className="mt-2 w-full border-0 border-b border-navy/30 bg-transparent py-3 text-navy outline-none focus:border-gold" />
                </div>
                <button type="submit" className="btn-navy w-full">
                  <Send className="h-4 w-4" /> Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ivory pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="overflow-hidden border border-border">
            <iframe
              title="L'ETO Bakeshop location"
              src="https://www.google.com/maps?q=Teen+Meela+Chowk+Attock+Pakistan&output=embed"
              className="h-[440px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
