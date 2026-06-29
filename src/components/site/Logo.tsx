import { Link } from "@tanstack/react-router";

export function Logo({ tone = "navy" }: { tone?: "navy" | "ivory" }) {
  const color = tone === "ivory" ? "text-ivory" : "text-navy";
  const sub = tone === "ivory" ? "text-ivory/70" : "text-navy-soft";
  return (
    <Link to="/" className="group inline-flex flex-col leading-none">
      <span className={`font-display text-2xl tracking-tight ${color}`}>
        <span className="italic">L'</span>ETO
        <span className="ml-1 text-gold">·</span>
      </span>
      <span className={`mt-1 text-[0.6rem] uppercase tracking-[0.4em] ${sub}`}>
        Bakeshop
      </span>
    </Link>
  );
}
