import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";
import { WHATSAPP_URL, PHONE_TEL } from "@/lib/contact";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-xl border-b border-border shadow-[0_1px_0_0_var(--gold-soft)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Logo />

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.78rem] uppercase tracking-[0.22em] text-navy/80 transition hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={PHONE_TEL} className="btn-ghost">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-navy">
            Order on WhatsApp
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-navy/20 p-2.5 lg:hidden"
        >
          {open ? <X className="h-5 w-5 text-navy" /> : <Menu className="h-5 w-5 text-navy" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-border bg-ivory lg:hidden ${
          open ? "max-h-[480px]" : "max-h-0"
        } transition-[max-height] duration-500`}
      >
        <div className="flex flex-col gap-6 px-6 py-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="text-base uppercase tracking-[0.22em] text-navy"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3">
            <a href={PHONE_TEL} className="btn-ghost">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-navy">
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
