import Link from "next/link";

export default function SearchBar({
  defaultValue,
  placeholder = "Search by title, author, ISBN...",
}: {
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <form action="/search" method="get" className="w-full">
      <div className="flex w-full items-stretch gap-2">
        <input
          name="q"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Search
        </button>
        <Link
          href="/search"
          className="hidden items-center rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:flex"
        >
          Browse
        </Link>
      </div>
    </form>
  );
}
