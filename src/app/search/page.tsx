"use client";

import { books, searchBooks, type SearchFilters } from "@/lib/catalog";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const condition = searchParams.get("condition") || undefined;
  const sort = searchParams.get("sort") || "relevance";

  const filters: SearchFilters = {
    q: query,
    condition: condition as any,
    sort: sort as any,
  };

  const results = searchBooks(books, filters);

  const updateParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value === "Any" || value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
    window.location.href = url.toString();
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            {query ? `Search: "${query}"` : "Browse All Books"}
          </h1>
          <SearchBar defaultValue={query} />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">Condition:</label>
            <select
              value={condition || "Any"}
              onChange={(e) => updateParam("condition", e.target.value)}
              className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <option value="Any">Any</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Very Good">Very Good</option>
              <option value="Good">Good</option>
              <option value="Acceptable">Acceptable</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Year: Newest First</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          {results.length} {results.length === 1 ? "result" : "results"}
        </div>

        {results.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              No books found. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="group rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-3 aspect-[3/4] rounded bg-zinc-100 dark:bg-zinc-800" />
                <h3 className="mb-1 font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
                  {book.title}
                </h3>
                <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {book.author}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    ${(book.priceCents / 100).toFixed(2)}
                  </span>
                  <span className="text-xs text-zinc-500">
                    + ${(book.shippingCents / 100).toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  {book.condition} · {book.format}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
