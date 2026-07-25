import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { SOCIAL, useSelectedCity } from "@/lib/contact";


function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.5 6.8a5.6 5.6 0 0 1-3.4-1.2v9.2a5.8 5.8 0 1 1-5.8-5.8c.3 0 .5 0 .8.1V12a2.9 2.9 0 1 0 2 2.8V2.5h2.8a5.6 5.6 0 0 0 3.6 4.3v0z" />
    </svg>
  );
}

export function Footer() {
  const city = useSelectedCity();
  const { addressLines: ADDRESS_LINES, hours: HOURS, phoneDisplay: PHONE_DISPLAY, phoneTel: PHONE_TEL } = city;
  return (
    <footer className="relative mt-24 border-t border-border bg-navy text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 md:px-10">

        <div className="md:col-span-1">
          <Logo tone="ivory" />
          <p className="mt-6 font-display text-lg italic text-gold">
            Your Imagination, Our Creation.
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
            Premium handcrafted cakes & desserts, freshly baked daily in Attock.
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-gold">Visit</h4>
          <p className="mt-5 flex items-start gap-3 text-sm text-ivory/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              {ADDRESS_LINES.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </span>
          </p>
          <a href={PHONE_TEL} className="mt-4 flex items-center gap-3 text-sm text-ivory/80 hover:text-gold">
            <Phone className="h-4 w-4 text-gold" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div>
          <h4 className="eyebrow text-gold">Hours</h4>
          <ul className="mt-5 space-y-2 text-sm text-ivory/80">
            {HOURS.map((h) => (
              <li key={h.d}>
                <span className="block text-ivory">{h.d}</span>
                <span className="text-ivory/60">{h.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-gold">Explore</h4>
          <ul className="mt-5 space-y-2 text-sm">
            {[
              { to: "/", l: "Home" },
              { to: "/menu", l: "Menu" },
              { to: "/reviews", l: "Reviews" },
              { to: "/contact", l: "Contact" },
            ].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="text-ivory/80 hover:text-gold">{i.l}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-gold hover:text-gold">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-gold hover:text-gold">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={SOCIAL.tiktok} target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory transition hover:border-gold hover:text-gold">
              <TikTok className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs uppercase tracking-[0.2em] text-ivory/50 md:flex-row md:px-10">
          <span>© {new Date().getFullYear()} L'ETO Bakeshop. All rights reserved.</span>
          <span>Crafted with love in Attock.</span>
        </div>
      </div>
    </footer>
  );
}
