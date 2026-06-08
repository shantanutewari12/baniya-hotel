import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/store/cart";
import { HotelHeader } from "@/components/HotelHeader";
import { VegBadge } from "@/components/VegBadge";
import { HOTEL } from "@/data/menu";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, MessageCircle } from "lucide-react";

const searchSchema = z.object({
  room: z.union([z.string(), z.number()]).transform(String).optional(),
});

export const Route = createFileRoute("/cart")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Your Cart — Hotel PrideIN" },
      { name: "description", content: "Review your order and send it to reception via WhatsApp." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

/* ─── Floating label input ─── */
function FloatingInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  inputMode,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none font-medium transition-all duration-200 ${
          active
            ? "top-2 text-[10px] text-accent"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? placeholder : ""}
        inputMode={inputMode}
        maxLength={maxLength}
        className={`w-full rounded-2xl border bg-background px-4 pb-3 pt-6 text-foreground text-sm outline-none transition-all duration-200 ${
          focused ? "border-accent ring-2 ring-accent/20" : "border-input hover:border-border"
        }`}
      />
    </div>
  );
}

/* ─── Floating label textarea ─── */
function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none font-medium transition-all duration-200 ${
          active ? "top-2 text-[10px] text-accent" : "top-4 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={active ? placeholder : ""}
        rows={3}
        maxLength={maxLength}
        className={`w-full resize-none rounded-2xl border bg-background px-4 pb-3 pt-6 text-foreground text-sm outline-none transition-all duration-200 ${
          focused ? "border-accent ring-2 ring-accent/20" : "border-input hover:border-border"
        }`}
      />
      {maxLength && (
        <span className="absolute bottom-2.5 right-3 text-[10px] text-muted-foreground">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  );
}

/* ─── Main Cart Page ─── */
function CartPage() {
  const { room } = Route.useSearch();
  const { lines, setQty, remove, total, clear } = useCart();
  const [name, setName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  function placeOrder() {
    if (!name.trim()) return setErr("Please enter your name.");
    if (!roomNo.trim()) return setErr("Please enter your room number.");
    if (lines.length === 0) return setErr("Your cart is empty.");
    setErr(null);

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dateStr = now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const itemsText = lines
      .map((l) => `  • ${l.item.name} × ${l.qty}  —  ₹${l.qty * l.item.price}`)
      .join("\n");

    const msg =
      `🏨 *HOTEL PRIDEIN — ROOM SERVICE*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Guest Name:*  ${name}\n` +
      `🚪 *Room No.:*  ${roomNo}\n` +
      `⏰ *Time:*  ${timeStr},  ${dateStr}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🧾  *ORDER DETAILS*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `${itemsText}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰  *TOTAL AMOUNT:  ₹${total}*\n\n` +
      (notes.trim()
        ? `📝  *Special Instructions:*\n${notes.trim()}\n\n`
        : `📝  *Special Instructions:*  None\n\n`) +
      `✅  Kindly confirm this order. Thank you!`;

    const url = `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    clear();
    navigate({ to: "/confirm", search: { name, room: roomNo } });
  }

  return (
    <div className="min-h-screen bg-background">
      <HotelHeader room={room} />

      <main className="mx-auto max-w-md px-4 pb-40 pt-4">
        {/* Back link */}
        <Link
          to="/"
          search={room ? { room } : undefined}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>

        <h2 className="font-display text-3xl font-bold text-foreground mb-1">Your Cart</h2>
        <p className="text-sm text-muted-foreground mb-5">
          {lines.length > 0
            ? `${lines.reduce((s, l) => s + l.qty, 0)} item${lines.reduce((s, l) => s + l.qty, 0) !== 1 ? "s" : ""} · ₹${total}`
            : "Nothing added yet"}
        </p>

        {lines.length === 0 ? (
          /* Empty cart */
          <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="font-semibold text-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1 mb-6">Browse the menu and add items</p>
            <Link
              to="/"
              search={room ? { room } : undefined}
              className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-warm)] hover:brightness-110 transition"
            >
              Browse menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <ul className="space-y-3 mb-6">
              {lines.map((l) => (
                <li
                  key={l.item.id}
                  className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-[var(--shadow-card)] ring-1 ring-border/60"
                >
                  <img
                    src={l.item.image}
                    alt={l.item.name}
                    className="h-16 w-16 rounded-xl object-cover shrink-0 bg-muted"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <VegBadge veg={l.item.veg} />
                      <p className="font-semibold text-foreground text-sm truncate">
                        {l.item.name}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ₹{l.item.price} ×{" "}
                      <span className="font-semibold text-foreground">{l.qty}</span>
                      {" = "}
                      <span className="font-bold text-primary">₹{l.item.price * l.qty}</span>
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1 rounded-full bg-secondary px-1 py-1 shrink-0">
                    <button
                      aria-label="Decrease"
                      onClick={() => setQty(l.item.id, l.qty - 1)}
                      className="grid h-8 w-8 place-items-center rounded-full text-foreground hover:bg-background transition active:scale-90"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-5 text-center text-sm font-bold">{l.qty}</span>
                    <button
                      aria-label="Increase"
                      onClick={() => setQty(l.item.id, l.qty + 1)}
                      className="grid h-8 w-8 place-items-center rounded-full text-foreground hover:bg-background transition active:scale-90"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    aria-label="Remove"
                    onClick={() => remove(l.item.id)}
                    className="grid h-8 w-8 place-items-center rounded-full text-destructive hover:bg-destructive/10 transition active:scale-90 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Guest details form */}
            <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/50 space-y-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-0.5">
                  Guest details
                </h3>
                <p className="text-xs text-muted-foreground">Required for delivering your order</p>
              </div>

              <FloatingInput
                id="guest-name"
                label="Your name *"
                value={name}
                onChange={setName}
                placeholder="e.g. Ananya Sharma"
                maxLength={80}
              />
              <FloatingInput
                id="room-number"
                label="Room number *"
                value={roomNo}
                onChange={setRoomNo}
                placeholder="e.g. 101"
                inputMode="numeric"
                maxLength={10}
              />
              <FloatingTextarea
                id="special-instructions"
                label="Special instructions (optional)"
                value={notes}
                onChange={setNotes}
                placeholder="Less spicy, no onion, extra napkins…"
                maxLength={300}
              />

              {err && (
                <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3">
                  <span className="text-destructive text-lg">⚠</span>
                  <p className="text-sm text-destructive font-medium">{err}</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Sticky bottom order bar */}
      {lines.length > 0 && (
        <div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
        >
          <div className="mx-auto max-w-md px-4 pt-3 pb-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {lines.reduce((s, l) => s + l.qty, 0)} items
              </span>
              <span className="font-display text-xl font-bold text-primary">₹{total}</span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground shadow-[var(--shadow-warm)] transition hover:brightness-110 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              Place Order via WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
