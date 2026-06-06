import { useCart } from "@/store/cart";
import type { MenuItem } from "@/data/menu";
import { VegBadge } from "./VegBadge";
import { Plus, Minus } from "lucide-react";

export function MenuCard({ item }: { item: MenuItem }) {
  const { lines, add, setQty } = useCart();
  const line = lines.find((l) => l.item.id === item.id);

  return (
    <article className="flex gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-card)] ring-1 ring-border/60">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <VegBadge veg={item.veg} />
          <h3 className="font-display text-base font-semibold leading-tight text-foreground">
            {item.name}
          </h3>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-bold text-primary">{"\u20B9"}{item.price}</span>
          {line ? (
            <div className="flex items-center gap-2 rounded-full bg-primary px-1 py-1 text-primary-foreground shadow-[var(--shadow-warm)]">
              <button aria-label="Decrease" onClick={() => setQty(item.id, line.qty - 1)}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-5 text-center text-sm font-semibold">{line.qty}</span>
              <button aria-label="Increase" onClick={() => setQty(item.id, line.qty + 1)}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/10">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button onClick={() => add(item)}
              className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-warm)] transition hover:brightness-105 active:scale-95">
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}