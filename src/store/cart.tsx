import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MenuItem } from "@/data/menu";

export interface CartLine {
  item: MenuItem;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "baniya-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines]);

  const add = (item: MenuItem) =>
    setLines((p) => {
      const idx = p.findIndex((l) => l.item.id === item.id);
      if (idx >= 0) {
        const next = [...p];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...p, { item, qty: 1 }];
    });

  const remove = (id: string) => setLines((p) => p.filter((l) => l.item.id !== id));

  const setQty = (id: string, qty: number) =>
    setLines((p) =>
      qty <= 0
        ? p.filter((l) => l.item.id !== id)
        : p.map((l) => (l.item.id === id ? { ...l, qty } : l)),
    );

  const clear = () => setLines([]);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.item.price, 0);

  return (
    <Ctx.Provider value={{ lines, add, remove, setQty, clear, count, total }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}