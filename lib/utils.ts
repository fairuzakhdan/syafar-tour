export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Angka aman: nilai tak hingga/NaN/null dikembalikan ke fallback. */
export function toNumber(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function isPositiveNumber(value: unknown): boolean {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}

const sarFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 2,
});

const idrFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatSAR(value: number): string {
  return `${sarFormatter.format(toNumber(value))} SAR`;
}

export function formatIDR(value: number): string {
  return `Rp${idrFormatter.format(Math.round(toNumber(value)))}`;
}

/** Angka Rupiah tanpa "Rp" — untuk tabel yang sudah punya header kolom. */
export function formatIdrNumber(value: number): string {
  return idrFormatter.format(Math.round(toNumber(value)));
}

export function formatNumber(value: number): string {
  return sarFormatter.format(toNumber(value));
}

export function formatDateLabel(isoDate: string): string {
  const time = Date.parse(`${isoDate}T00:00:00Z`);
  if (!Number.isFinite(time)) return "-";
  return dateFormatter.format(new Date(time));
}

/** Malam antara check-in dan check-out. 0 bila tanggal tidak valid. */
export function getNights(checkIn: string, checkOut: string): number {
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  const diff = end - start;
  if (diff <= 0) return 0;
  return Math.round(diff / 86_400_000);
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
