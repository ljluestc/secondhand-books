import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { books } from "@/lib/catalog";

export default function Home() {
  const featured = books.slice(0, 4);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
            Buy Used Books Online
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Discover great reads from trusted sellers. Every book has a story—give it a second chapter.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar placeholder="Search by title, author, ISBN..." />
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Featured Books
          </h2>
          <Link
            href="/search"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((book) => (
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
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  + ${(book.shippingCents / 100).toFixed(2)} shipping
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                {book.condition} · {book.format}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Why Shop With Us
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl">📚</div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                Huge Selection
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Thousands of titles from trusted independent sellers
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">💰</div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                Great Prices
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Save up to 80% compared to new books
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">🌱</div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                Eco-Friendly
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Give books a second life and reduce waste
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
