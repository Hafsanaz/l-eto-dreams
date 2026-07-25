import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, MapPin, Search, Store } from "lucide-react";
import heroCake from "@/assets/hero-cake.jpg";
import { CITY_LIST, setSelectedCity, type CityId } from "@/lib/contact";

const CITIES = CITY_LIST;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L'ETO Bakeshop — Choose Your City" },
      {
        name: "description",
        content:
          "Select your city to explore L'ETO Bakeshop outlets — now in Attock and Hazro.",
      },
      { property: "og:title", content: "L'ETO Bakeshop — Choose Your City" },
      { property: "og:description", content: "Now serving Attock & Hazro." },
      { property: "og:image", content: heroCake },
    ],
  }),
  component: CityPicker,
});

function CityPicker() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      CITIES.filter((c) =>
        c.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  const totalOutlets = CITIES.reduce((n, c) => n + c.outlets, 0);

  const select = (id: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("leto:city", id);
    }
    navigate({ to: "/home" });
  };

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy">
      {/* Background */}
      <img
        src={heroCake}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/60 to-navy/90" />
      <div className="hero-overlay absolute inset-0 -z-10" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col px-5 pb-16 pt-28 md:px-10 md:pt-32">
        {/* Top brand line */}
        <div className="fade-up text-center">
          <p className="eyebrow text-gold">Welcome to</p>
          <h1 className="mt-3 font-display text-4xl text-ivory md:text-6xl">
            <span className="italic">L'</span>ETO Bakeshop
          </h1>
          <p className="mt-3 text-sm text-ivory/75 md:text-base">
            Select your city to get started
          </p>
        </div>

        {/* Card */}
        <div className="fade-up mx-auto mt-10 w-full max-w-3xl rounded-3xl border border-ivory/15 bg-navy/40 p-6 shadow-[var(--shadow-card)] backdrop-blur-xl md:mt-14 md:p-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-ivory/80">
            Choose Your City
          </span>

          <h2 className="mt-5 font-display text-3xl text-ivory md:text-5xl">
            Pick a City
          </h2>
          <p className="mt-3 max-w-lg text-sm text-ivory/70 md:text-base">
            Explore available outlets by city and continue to your order.
          </p>

          {/* Meta pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            <MetaPill icon={<MapPin className="h-3.5 w-3.5" />}>
              {CITIES.length} cities
            </MetaPill>
            <MetaPill icon={<Store className="h-3.5 w-3.5" />}>
              {totalOutlets} outlets
            </MetaPill>
          </div>

          {/* Search */}
          <label className="mt-6 flex items-center gap-3 rounded-full border border-ivory/20 bg-ivory/5 px-5 py-3 focus-within:border-gold">
            <Search className="h-4 w-4 text-ivory/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your city"
              className="w-full bg-transparent text-sm text-ivory placeholder:text-ivory/50 focus:outline-none"
            />
          </label>

          {/* City list */}
          <div className="mt-6 flex flex-col gap-3">
            {filtered.length === 0 && (
              <p className="rounded-2xl border border-ivory/15 bg-ivory/5 px-5 py-6 text-center text-sm text-ivory/70">
                No cities match "{query}".
              </p>
            )}
            {filtered.map((city, i) => (
              <button
                key={city.id}
                onClick={() => select(city.id)}
                className="group flex w-full items-center gap-4 rounded-2xl border border-ivory/15 bg-ivory/5 px-4 py-4 text-left transition hover:border-gold/60 hover:bg-ivory/10 md:px-6 md:py-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ivory text-navy">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl text-ivory md:text-2xl">
                      {city.name}
                    </h3>
                    <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.6rem] font-semibold text-gold">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ivory/70 md:text-sm">
                    <span className="rounded-full bg-ivory/10 px-2 py-0.5 text-[0.65rem] text-ivory/80">
                      {city.outlets} outlet
                    </span>{" "}
                    <span className="ml-2">{city.note}</span>
                  </p>
                </div>
                <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.22em] text-ivory/70 sm:flex">
                  Continue
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-navy transition group-hover:bg-gold">
                  <ChevronRight className="h-5 w-5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaPill({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1 text-[0.7rem] text-ivory/80">
      {icon}
      {children}
    </span>
  );
}
