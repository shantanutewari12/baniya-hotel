import { Link } from "@tanstack/react-router";
import { useCart } from "@/store/cart";
import { ShoppingBag, Phone } from "lucide-react";
import { HOTEL } from "@/data/menu";

export function HotelHeader({ room }: { room?: string | null }) {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-warm)]">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-gold)] font-display text-lg font-black text-primary shadow-inner">
            B
          </div>
          <div className="leading-tight">
            <h1 className="font-display text-lg font-bold tracking-wide">{HOTEL.name}</h1>
            <p className="text-[11px] text-primary-foreground/70">
              {room ? `Room ${room} \u00B7 In-room dining` : "In-room dining menu"}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <a href={`tel:${HOTEL.phone}`} aria-label="Call reception"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-white/20">
            <Phone className="h-4 w-4" />
          </a>
          <Link to="/cart" search={room ? { room } : undefined} aria-label="View cart"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-gold)] text-primary shadow">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground ring-2 ring-background">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}