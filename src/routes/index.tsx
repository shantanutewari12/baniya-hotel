import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { CATEGORIES, MENU, HOTEL, type Category } from "@/data/menu";
import { HotelHeader } from "@/components/HotelHeader";
import { MenuCard } from "@/components/MenuCard";
import { useRoomParam } from "@/lib/useRoomParam";

const searchSchema = z.object({ room: z.string().optional() });

export const Route = createFileRoute("/")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Baniya Hotel \u2014 In-Room Dining Menu" },
      { name: "description", content: "Scan, browse and order authentic Indian food directly to your room at Baniya Hotel." },
      { property: "og:title", content: "Baniya Hotel \u2014 In-Room Dining" },
      { property: "og:description", content: "Order delicious meals to your room in seconds." },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#7A1F1F" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
  }),
  component: Index,
});

function Index() {
  const room = useRoomParam();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "All">("All");
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MENU.filter((m) => {
      if (cat !== "All" && m.category !== cat) return false;
      if (vegOnly && !m.veg) return false;
      if (needle && !m.name.toLowerCase().includes(needle) && !m.description.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [q, cat, vegOnly]);

  const grouped = useMemo(() => {
    const m: Record<string, typeof MENU> = {};
    for (const item of filtered) (m[item.category] ||= []).push(item);
    return m;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <HotelHeader room={room} />

      <section className="bg-[var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-2xl px-4 pb-6 pt-2">
          <p className="font-display text-2xl font-bold leading-tight">{HOTEL.tagline}</p>
          <p className="mt-1 text-sm text-primary-foreground/75">
            Freshly prepared by our chefs \u2014 delivered hot to your room.
          </p>
          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes..."
              maxLength={60}
              className="w-full rounded-full border-0 bg-background py-3 pl-10 pr-4 text-foreground shadow-[var(--shadow-warm)] outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </section>

      <div className="sticky top-[64px] z-20 -mt-3 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-4 py-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CatChip active={cat === "All"} onClick={() => setCat("All")}>All</CatChip>
            {CATEGORIES.map((c) => (
              <CatChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</CatChip>
            ))}
            <button
              onClick={() => setVegOnly((v) => !v)}
              className={`ml-auto shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${vegOnly ? "border-veg bg-veg/10 text-veg" : "border-border text-muted-foreground"}`}
            >
              {vegOnly ? "\u25CF Veg only" : "Veg only"}
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-2xl px-4 pt-4">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">No dishes match your search.</p>
        ) : (
          (cat === "All" ? CATEGORIES : [cat]).map((c) =>
            grouped[c]?.length ? (
              <section key={c} className="mb-6">
                <h2 className="mb-3 font-display text-xl font-bold text-foreground">{c}</h2>
                <div className="space-y-3">
                  {grouped[c].map((item) => <MenuCard key={item.id} item={item} />)}
                </div>
              </section>
            ) : null
          )
        )}
      </main>
    </div>
  );
}

function CatChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition ${active ? "bg-primary text-primary-foreground shadow-[var(--shadow-warm)]" : "bg-secondary text-secondary-foreground hover:bg-accent/30"}`}
    >
      {children}
    </button>
  );
}
