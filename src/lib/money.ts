export function formatCents(cents: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function parseDollarsToCents(input?: string | string[]): number | undefined {
  const raw = Array.isArray(input) ? input[0] : input;
  if (!raw) return undefined;
  const normalized = raw.trim();
  if (!normalized) return undefined;

  const n = Number(normalized);
  if (!Number.isFinite(n)) return undefined;

  return Math.round(n * 100);
}
