"use client";

import { useCart } from "@/lib/cart";
import { getBookById } from "@/lib/catalog";
import Link from "next/link";

export default function CartPage() {
  const { lines, remove, setQuantity, clear, totalItems } = useCart();

  const itemsWithDetails = lines.map((line) => ({
    line,
    book: getBookById(line.bookId),
  }));

  const subtotal = itemsWithDetails.reduce((sum, { line, book }) => {
    if (!book) return sum;
    return sum + book.priceCents * line.quantity;
  }, 0);

  const shipping = itemsWithDetails.reduce((sum, { line, book }) => {
    if (!book) return sum;
    return sum + book.shippingCents;
  }, 0);

  const total = subtotal + shipping;

  if (totalItems === 0) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Your Cart is Empty
          </h1>
          <p className="mb-8 text-zinc-600 dark:text-zinc-400">
            Start browsing to find great deals on used books!
          </p>
          <Link
            href="/search"
            className="inline-flex items-center rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Browse Books
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Shopping Cart
          </h1>
          <button
            onClick={clear}
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {itemsWithDetails.map(({ line, book }) => {
              if (!book) return null;

              return (
                <div
                  key={line.bookId}
                  className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="h-32 w-24 flex-shrink-0 rounded bg-zinc-100 dark:bg-zinc-800" />

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/book/${book.id}`}
                          className="font-semibold text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-200"
                        >
                          {book.title}
                        </Link>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {book.author}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {book.condition} · {book.format}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(line.bookId)}
                        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-zinc-600 dark:text-zinc-400">
                          Qty:
                        </label>
                        <select
                          value={line.quantity}
                          onChange={(e) =>
                            setQuantity(line.bookId, parseInt(e.target.value))
                          }
                          className="rounded border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                          ${((book.priceCents * line.quantity) / 100).toFixed(2)}
                        </div>
                        <div className="text-xs text-zinc-500">
                          + ${(book.shippingCents / 100).toFixed(2)} shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Order Summary
            </h2>

            <div className="space-y-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
                <span className="text-zinc-900 dark:text-zinc-50">
                  ${(subtotal / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Shipping</span>
                <span className="text-zinc-900 dark:text-zinc-50">
                  ${(shipping / 100).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between py-4 text-lg font-semibold">
              <span className="text-zinc-900 dark:text-zinc-50">Total</span>
              <span className="text-zinc-900 dark:text-zinc-50">
                ${(total / 100).toFixed(2)}
              </span>
            </div>

            <button className="w-full rounded-md bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Proceed to Checkout
            </button>

            <p className="mt-4 text-center text-xs text-zinc-500">
              Checkout is a placeholder for demo purposes
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
