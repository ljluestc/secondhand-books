"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = {
  bookId: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  add: (bookId: string, quantity?: number) => void;
  remove: (bookId: string) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "secondhand_books_cart_v1";

function clampQuantity(qty: number) {
  if (!Number.isFinite(qty)) return 1;
  return Math.max(1, Math.min(99, Math.floor(qty)));
}

function loadFromStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    const lines: CartLine[] = [];
    for (const v of parsed) {
      if (!v || typeof v !== "object") continue;
      const o = v as { bookId?: unknown; quantity?: unknown };
      if (typeof o.bookId !== "string") continue;
      const q = typeof o.quantity === "number" ? o.quantity : 1;
      lines.push({ bookId: o.bookId, quantity: clampQuantity(q) });
    }
    return lines;
  } catch {
    return [];
  }
}

function saveToStorage(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    return;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    setLines(loadFromStorage());
  }, []);

  useEffect(() => {
    saveToStorage(lines);
  }, [lines]);

  const api = useMemo<CartContextValue>(() => {
    return {
      lines,
      add: (bookId, quantity = 1) => {
        const q = clampQuantity(quantity);
        setLines((prev) => {
          const existing = prev.find((l) => l.bookId === bookId);
          if (!existing) return [...prev, { bookId, quantity: q }];
          return prev.map((l) =>
            l.bookId === bookId ? { ...l, quantity: clampQuantity(l.quantity + q) } : l,
          );
        });
      },
      remove: (bookId) => {
        setLines((prev) => prev.filter((l) => l.bookId !== bookId));
      },
      setQuantity: (bookId, quantity) => {
        const q = clampQuantity(quantity);
        setLines((prev) => prev.map((l) => (l.bookId === bookId ? { ...l, quantity: q } : l)));
      },
      clear: () => setLines([]),
      totalItems: lines.reduce((sum, l) => sum + l.quantity, 0),
    };
  }, [lines]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const v = useContext(CartContext);
  if (!v) {
    throw new Error("useCart must be used within CartProvider");
  }
  return v;
}
