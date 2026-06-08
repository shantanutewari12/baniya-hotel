import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { z } from "zod";
import { ShoppingBag, Phone, Search } from "lucide-react";
import { CATEGORIES, MENU, HOTEL, type Category } from "@/data/menu";
import { MenuCard } from "@/components/MenuCard";
import { useRoomParam } from "@/lib/useRoomParam";
import { useCart } from "@/store/cart";

const CATEGORY_ICONS: Record<Category, string> = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Dinner: "🌙",
  Bread: "🍞",
  Snacks: "⚡",
  Beverages: "☕",
  Desserts: "🍮",
};

const searchSchema = z.object({
  room: z.union([z.string(), z.number()]).transform(String).optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Hotel PrideIN — In-Room Dining Menu" },
      {
        name: "description",
        content:
          "Scan, browse and order authentic Indian food directly to your room.",
      },
      { property: "og:title", content: "Hotel PrideIN — In-Room Dining" },
      { property: "og:description", content: "Order delicious meals to your room in seconds." },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#1A1208" },
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
  const { count } = useCart();
  const [cat, setCat] = useState<Category>("Breakfast");
  const [vegOnly, setVegOnly] = useState(false);
  const [q, setQ] = useState("");

  const items = useMemo(
    () =>
      MENU.filter((m) => {
        if (m.category !== cat) return false;
        if (vegOnly && !m.veg) return false;
        if (
          q &&
          !m.name.toLowerCase().includes(q.toLowerCase()) &&
          !m.description.toLowerCase().includes(q.toLowerCase())
        )
          return false;
        return true;
      }),
    [cat, vegOnly, q],
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Minimal Header ── */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Logo */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "var(--gradient-gold)" }}
          >
            <span className="font-display text-lg font-black text-primary-foreground">B</span>
          </div>
          <div>
            <h1 className="font-display text-base font-bold text-foreground leading-tight">
              {HOTEL.name}
            </h1>
            <p className="text-[11px] text-muted-foreground leading-none">In-room dining</p>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${HOTEL.phone}`}
            aria-label="Call reception"
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center border border-border transition hover:bg-muted active:scale-95"
          >
            <Phone className="h-4 w-4 text-muted-foreground" />
          </a>
          <Link
            to="/cart"
            search={room ? { room } : undefined}
            aria-label="Cart"
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-border bg-secondary transition hover:bg-muted active:scale-95"
          >
            <ShoppingBag className="h-4 w-4 text-foreground" />
            {count > 0 && (
              <span
                className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full flex items-center justify-center text-[10px] font-bold px-1"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              >
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* ── Search + VEG MODE row ── */}
      <div className="sticky top-[61.5px] z-20 bg-background/95 backdrop-blur border-b border-border py-3 px-4 flex items-center gap-3 max-w-md mx-auto w-full">
        {/* Search bar */}
        <div
          className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5 border border-border"
          style={{ background: "var(--card)" }}
        >
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search in ${cat}...`}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="text-muted-foreground hover:text-foreground text-lg leading-none transition"
            >
              ×
            </button>
          )}
        </div>

        {/* VEG MODE card */}
        <button
          onClick={() => setVegOnly((v) => !v)}
          className={`shrink-0 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl border transition active:scale-95 ${
            vegOnly ? "border-veg" : "border-border"
          }`}
          style={{ background: vegOnly ? "oklch(0.65 0.18 145 / 0.12)" : "var(--card)" }}
        >
          <span
            className={`text-[9px] font-bold tracking-widest leading-none ${
              vegOnly ? "text-veg" : "text-muted-foreground"
            }`}
          >
            VEG
          </span>
          <span
            className={`text-[9px] font-bold tracking-widest leading-none ${
              vegOnly ? "text-veg" : "text-muted-foreground"
            }`}
          >
            MODE
          </span>
          {/* Toggle switch */}
          <div
            className="relative w-8 h-4 rounded-full mt-0.5 transition-colors duration-200"
            style={{
              background: vegOnly ? "var(--veg)" : "var(--secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-200"
              style={{ left: vegOnly ? "calc(100% - 14px)" : "2px" }}
            />
          </div>
        </button>
      </div>

      {/* ── Menu Items ── */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-24 space-y-3">
        {/* Section heading */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display text-lg font-bold text-foreground">
            {CATEGORY_ICONS[cat]} {cat}
          </h2>
          <span className="text-xs text-muted-foreground">{items.length} items</span>
        </div>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-muted-foreground text-sm">No items found.</p>
          </div>
        ) : (
          items.map((item) => <MenuCard key={item.id} item={item} />)
        )}
      </main>

      {/* ── Category Tabs (Sticky Bottom) ── */}
      <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur border-t border-border pb-safe-bottom">
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-md mx-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
                cat === c
                  ? "text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              style={cat === c ? { background: "var(--gradient-gold)" } : {}}
            >
              <span className="text-base leading-none">{CATEGORY_ICONS[c]}</span>
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
