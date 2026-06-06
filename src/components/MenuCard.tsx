import { useCart } from "@/store/cart";
import type { MenuItem } from "@/data/menu";
import { VegBadge } from "./VegBadge";
import { Plus, Minus } from "lucide-react";

export function MenuCard({ item }: { item: MenuItem }) {
  const { lines, add, setQty } = useCart();
  const line = lines.find((l) => l.item.id === item.id);

  return (
    <article
      className="flex items-center gap-3 rounded-2xl p-3 transition hover:brightness-105 active:scale-[0.99]"
      style={{
        background: "var(--card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Food image */}
      <div className="relative h-[76px] w-[76px] shrink-0 rounded-xl overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <VegBadge veg={item.veg} />
          <h3 className="font-semibold text-foreground text-sm leading-snug truncate">
            {item.name}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
          {item.description}
        </p>
        <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>
          ₹{item.price}
        </p>
      </div>

      {/* Add / Qty controls */}
      <div className="shrink-0">
        {line ? (
          <div
            className="flex items-center gap-0 rounded-full"
            style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
          >
            <button
              aria-label="Decrease"
              onClick={() => setQty(item.id, line.qty - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-foreground transition hover:bg-muted active:scale-90"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-5 text-center text-sm font-bold text-foreground">
              {line.qty}
            </span>
            <button
              aria-label="Increase"
              onClick={() => setQty(item.id, line.qty + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-foreground transition hover:bg-muted active:scale-90"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => add(item)}
            aria-label={`Add ${item.name}`}
            className="w-9 h-9 rounded-full flex items-center justify-center transition hover:brightness-110 active:scale-90"
            style={{
              background: "var(--secondary)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}
