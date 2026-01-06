export type BookCondition = "New" | "Like New" | "Very Good" | "Good" | "Acceptable";

export type Seller = {
  id: string;
  name: string;
  rating: number;
  shipsFrom: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  format: "Hardcover" | "Paperback" | "Mass Market Paperback" | "First Edition";
  condition: BookCondition;
  priceCents: number;
  shippingCents: number;
  year?: number;
  isbn13?: string;
  description: string;
  seller: Seller;
  tags: string[];
};

const sellers: Seller[] = [
  { id: "s1", name: "Oak & Ink Books", rating: 4.8, shipsFrom: "Portland, OR" },
  { id: "s2", name: "Bluebird Used Books", rating: 4.6, shipsFrom: "Austin, TX" },
  { id: "s3", name: "Second Chapter", rating: 4.9, shipsFrom: "Boston, MA" },
  { id: "s4", name: "Desert Paperback Co.", rating: 4.5, shipsFrom: "Phoenix, AZ" },
];

export const books: Book[] = [
  {
    id: "bk_the_hobbit_1937_1",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    format: "Hardcover",
    condition: "Very Good",
    priceCents: 1799,
    shippingCents: 399,
    year: 1937,
    isbn13: "9780345339683",
    description:
      "A classic fantasy adventure following Bilbo Baggins on an unexpected journey.",
    seller: sellers[2],
    tags: ["Fantasy", "Classic"],
  },
  {
    id: "bk_pride_prejudice_1813_1",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    format: "Paperback",
    condition: "Good",
    priceCents: 799,
    shippingCents: 399,
    year: 1813,
    isbn13: "9780141439518",
    description:
      "A witty comedy of manners, love, and social expectations in Regency England.",
    seller: sellers[0],
    tags: ["Classic", "Romance"],
  },
  {
    id: "bk_dune_1965_1",
    title: "Dune",
    author: "Frank Herbert",
    format: "Paperback",
    condition: "Like New",
    priceCents: 1299,
    shippingCents: 399,
    year: 1965,
    isbn13: "9780441172719",
    description:
      "Epic science fiction about politics, prophecy, and ecology on Arrakis.",
    seller: sellers[1],
    tags: ["Sci-Fi", "Epic"],
  },
  {
    id: "bk_1984_1949_1",
    title: "1984",
    author: "George Orwell",
    format: "Mass Market Paperback",
    condition: "Acceptable",
    priceCents: 599,
    shippingCents: 399,
    year: 1949,
    isbn13: "9780451524935",
    description:
      "A haunting dystopia of surveillance, propaganda, and the fragility of truth.",
    seller: sellers[3],
    tags: ["Classic", "Dystopian"],
  },
  {
    id: "bk_foundation_1951_1",
    title: "Foundation",
    author: "Isaac Asimov",
    format: "Paperback",
    condition: "Very Good",
    priceCents: 999,
    shippingCents: 399,
    year: 1951,
    isbn13: "9780553293357",
    description:
      "A far-future saga of psychohistory and the fall and rebirth of empires.",
    seller: sellers[2],
    tags: ["Sci-Fi", "Classic"],
  },
  {
    id: "bk_educated_2018_1",
    title: "Educated",
    author: "Tara Westover",
    format: "Hardcover",
    condition: "Like New",
    priceCents: 1499,
    shippingCents: 399,
    year: 2018,
    isbn13: "9780399590504",
    description:
      "A memoir about growing up off-grid and the transformative power of education.",
    seller: sellers[0],
    tags: ["Memoir", "Nonfiction"],
  },
  {
    id: "bk_sapiens_2011_1",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    format: "Paperback",
    condition: "Very Good",
    priceCents: 1399,
    shippingCents: 399,
    year: 2011,
    isbn13: "9780062316110",
    description:
      "A sweeping narrative of human history from hunter-gatherers to the present.",
    seller: sellers[1],
    tags: ["History", "Nonfiction"],
  },
  {
    id: "bk_handmaids_tale_1985_1",
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    format: "Paperback",
    condition: "Good",
    priceCents: 899,
    shippingCents: 399,
    year: 1985,
    isbn13: "9780385490818",
    description:
      "A chilling speculative tale about autonomy, power, and resistance.",
    seller: sellers[3],
    tags: ["Dystopian", "Speculative"],
  },
];

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export type SearchFilters = {
  q?: string;
  condition?: BookCondition | "Any";
  minPriceCents?: number;
  maxPriceCents?: number;
  sort?: "relevance" | "price_asc" | "price_desc" | "year_desc";
};

function includesQuery(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function searchBooks(all: Book[], filters: SearchFilters): Book[] {
  const q = (filters.q ?? "").trim();

  let filtered = all;

  if (q) {
    filtered = filtered.filter((b) => {
      const blob = [b.title, b.author, b.isbn13 ?? "", b.tags.join(" ")].join(" ");
      return includesQuery(blob, q);
    });
  }

  if (filters.condition && filters.condition !== "Any") {
    filtered = filtered.filter((b) => b.condition === filters.condition);
  }

  if (typeof filters.minPriceCents === "number") {
    filtered = filtered.filter((b) => b.priceCents >= filters.minPriceCents!);
  }

  if (typeof filters.maxPriceCents === "number") {
    filtered = filtered.filter((b) => b.priceCents <= filters.maxPriceCents!);
  }

  switch (filters.sort) {
    case "price_asc":
      return [...filtered].sort((a, b) => a.priceCents - b.priceCents);
    case "price_desc":
      return [...filtered].sort((a, b) => b.priceCents - a.priceCents);
    case "year_desc":
      return [...filtered].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    case "relevance":
    default:
      return filtered;
  }
}
