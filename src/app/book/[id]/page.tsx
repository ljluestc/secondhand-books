"use client";

import { useCart } from "@/lib/cart";
import { getBookById } from "@/lib/catalog";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = typeof params.id === "string" ? params.id : "";
  const book = getBookById(bookId);
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!book) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Book Not Found
          </h1>
          <p className="mb-8 text-zinc-600 dark:text-zinc-400">
            The book you're looking for doesn't exist.
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

  const handleAddToCart = () => {
    add(book.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/search"
          className="mb-6 inline-flex items-center text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back to search
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Book Image */}
          <div className="aspect-[3/4] rounded-lg bg-zinc-100 dark:bg-zinc-800 lg:col-span-1" />

          {/* Book Details */}
          <div className="lg:col-span-2">
            <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              {book.title}
            </h1>
            <p className="mb-6 text-xl text-zinc-600 dark:text-zinc-400">
              by {book.author}
            </p>

            {/* Price and Condition */}
            <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                  ${(book.priceCents / 100).toFixed(2)}
                </span>
                <span className="text-sm text-zinc-500">
                  + ${(book.shippingCents / 100).toFixed(2)} shipping
                </span>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
                <div>
                  <span className="text-zinc-600 dark:text-zinc-400">Condition:</span>
                  <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-50">
                    {book.condition}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-600 dark:text-zinc-400">Format:</span>
                  <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-50">
                    {book.format}
                  </span>
                </div>
                {book.year && (
                  <div>
                    <span className="text-zinc-600 dark:text-zinc-400">Year:</span>
                    <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-50">
                      {book.year}
                    </span>
                  </div>
                )}
                {book.isbn13 && (
                  <div>
                    <span className="text-zinc-600 dark:text-zinc-400">ISBN-13:</span>
                    <span className="ml-2 font-medium text-zinc-900 dark:text-zinc-50">
                      {book.isbn13}
                    </span>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="flex items-center gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-zinc-600 dark:text-zinc-400">Qty:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="rounded border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {added ? "Added to Cart! ✓" : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Seller Info */}
            <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Sold By
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {book.seller.name}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Ships from {book.seller.shipsFrom}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-xl">⭐</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {book.seller.rating}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">seller rating</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Description
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">{book.description}</p>
            </div>

            {/* Tags */}
            {book.tags.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Categories
                </h2>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
