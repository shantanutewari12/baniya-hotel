import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/store/cart";
import { HotelHeader } from "@/components/HotelHeader";
import { VegBadge } from "@/components/VegBadge";
import { HOTEL } from "@/data/menu";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

const searchSchema = z.object({
  room: z.union([z.string(), z.number()]).transform(String).optional(),
});

export const Route = createFileRoute("/cart")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Your Cart \u2014 Baniya Hotel" },
      { name: "description", content: "Review your order and send it to reception via WhatsApp." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { room } = Route.useSearch();
  const { lines, setQty, remove, total, clear } = useCart();
  const [name, setName] = useState("");
  const [roomNo, setRoomNo] = useState(room ?? "");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  function placeOrder() {
    if (!name.trim()) return setErr("Please enter your name.");
    if (!roomNo.trim()) return setErr("Please enter your room number.");
    if (lines.length === 0) return setErr("Your cart is empty.");
    setErr(null);

    const itemsText = lines
      .map((l) => `\u2022 ${l.item.name} x ${l.qty} - \u20B9${l.qty * l.item.price}`)
      .join("\n");

    const msg =
      `\uD83C\uDF7D\uFE0F *New Order - ${HOTEL.name}*\n\n` +
      `*Guest Name:* ${name}\n` +
      `*Room Number:* ${roomNo}\n\n` +
      `*Ordered Items:*\n${itemsText}\n\n` +
      `*Total Amount:* \u20B9${total}\n\n` +
      `*Special Instructions:*\n${notes.trim() || "\u2014"}\n\n` +
      `Please confirm this order.`;

    const url = `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    clear();
    navigate({ to: "/confirm", search: { name, room: roomNo } });
  }

  return (
    <div className="min-h-screen bg-background">
      <HotelHeader room={room} />
      <main className="mx-auto max-w-2xl px-4 pb-32 pt-4">
        <Link to="/" search={room ? { room } : undefined}
          className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>
        <h2 className="font-display text-2xl font-bold text-foreground">Your Cart</h2>

        {lines.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/" search={room ? { room } : undefined}
              className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-warm)]">
              Browse menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-4 space-y-2">
              {lines.map((l) => (
                <li key={l.item.id}
                  className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-card)] ring-1 ring-border/60">
                  <img src={l.item.image} alt="" className="h-14 w-14 rounded-lg object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <VegBadge veg={l.item.veg} />
                      <p className="truncate font-semibold text-foreground">{l.item.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {"\u20B9"}{l.item.price} \u00D7 {l.qty} ={" "}
                      <span className="font-semibold text-foreground">{"\u20B9"}{l.item.price * l.qty}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-secondary px-1 py-1">
                    <button aria-label="Decrease" onClick={() => setQty(l.item.id, l.qty - 1)}
                      className="grid h-7 w-7 place-items-center rounded-full text-foreground hover:bg-background">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-5 text-center text-sm font-semibold">{l.qty}</span>
                    <button aria-label="Increase" onClick={() => setQty(l.item.id, l.qty + 1)}
                      className="grid h-7 w-7 place-items-center rounded-full text-foreground hover:bg-background">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button aria-label="Remove" onClick={() => remove(l.item.id)}
                    className="grid h-8 w-8 place-items-center rounded-full text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <section className="mt-6 space-y-3 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)] ring-1 ring-border/60">
              <h3 className="font-display text-lg font-semibold">Guest details</h3>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Your name</label>
                <input value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sharma" maxLength={80}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Room number</label>
                <input value={roomNo} onChange={(e) => setRoomNo(e.target.value)}
                  inputMode="numeric" placeholder="e.g. 101" maxLength={10}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Special instructions (optional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                  rows={3} maxLength={400} placeholder="Less spicy, no onion, extra napkins\u2026"
                  className="mt-1 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-ring" />
              </div>
              {err && <p className="text-sm text-destructive">{err}</p>}
            </section>
          </>
        )}
      </main>

      {lines.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-display text-xl font-bold text-primary">{"\u20B9"}{total}</p>
            </div>
            <button onClick={placeOrder}
              className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-warm)] transition hover:brightness-110 active:scale-[0.98]">
              Place Order via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}