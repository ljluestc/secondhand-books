"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={
        active
          ? "text-sm font-semibold text-zinc-900 dark:text-zinc-50"
          : "text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
      }
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Secondhand Books
          </Link>
          <span className="hidden text-xs text-zinc-500 dark:text-zinc-400 sm:inline">
            Buy used. Save stories.
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <NavLink href="/search" label="Search" />
          <Link
            href="/cart"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Cart
            <span className="ml-2 inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
              {totalItems}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
