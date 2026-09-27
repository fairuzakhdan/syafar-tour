import type { SavedQuotation } from "@/features/dashboard/types/quotation.types";

const STORAGE_KEY = "syafar.saved-quotations";
const MAX_ITEMS = 10;

/** Subset localStorage yang kita pakai; bisa dipasok tes (in-memory). */
export interface QuotationStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function browserStorage(): QuotationStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function parseItems(raw: string | null): SavedQuotation[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedQuotation[]) : [];
  } catch {
    return [];
  }
}

function write(storage: QuotationStorage, items: SavedQuotation[]): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Penyimpanan penuh atau diblokir browser: abaikan, daftar lama tetap ada.
  }
}

export function listSavedQuotations(
  storage: QuotationStorage | null = browserStorage(),
): SavedQuotation[] {
  if (!storage) return [];
  try {
    return parseItems(storage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

/** Kasus sama = hotel & konteks pencarian sama; beda kasus = entri terpisah. */
function isSameCase(
  saved: SavedQuotation,
  entry: Omit<SavedQuotation, "id" | "savedAt">,
): boolean {
  return (
    saved.hotelId === entry.hotelId &&
    saved.city === entry.city &&
    saved.checkIn === entry.checkIn &&
    saved.checkOut === entry.checkOut &&
    saved.pax === entry.pax &&
    saved.roomType === entry.roomType
  );
}

export function saveQuotation(
  entry: Omit<SavedQuotation, "id" | "savedAt">,
  storage: QuotationStorage | null = browserStorage(),
): SavedQuotation[] {
  if (!storage) return [];
  const item: SavedQuotation = {
    ...entry,
    id: createId(),
    savedAt: new Date().toISOString(),
  };
  const others = listSavedQuotations(storage).filter(
    (saved) => !isSameCase(saved, entry),
  );
  const next = [item, ...others].slice(0, MAX_ITEMS);
  write(storage, next);
  return next;
}

export function removeSavedQuotation(
  id: string,
  storage: QuotationStorage | null = browserStorage(),
): SavedQuotation[] {
  if (!storage) return [];
  const next = listSavedQuotations(storage).filter((item) => item.id !== id);
  write(storage, next);
  return next;
}

const listeners = new Set<() => void>();
let snapshot: SavedQuotation[] | null = null;

export function subscribeSavedQuotations(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSavedQuotationsSnapshot(): SavedQuotation[] {
  if (snapshot === null) snapshot = listSavedQuotations();
  return snapshot;
}

/** Perbarui cache lalu beri tahu komponen yang sedang membaca daftar. */
export function publishSavedQuotations(items: SavedQuotation[]): SavedQuotation[] {
  snapshot = items;
  for (const listener of listeners) listener();
  return items;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Handoff sekali pakai: history menulis entri, halaman utama membaca lalu menghapus. */
const PENDING_KEY = "syafar.pending-quotation";

export function stashPendingQuotation(item: SavedQuotation): void {
  try {
    window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(item));
  } catch {
    // sessionStorage tidak tersedia: muat dibatalkan, tidak merusak aplikasi.
  }
}

export function takePendingQuotation(): SavedQuotation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(PENDING_KEY);
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as SavedQuotation) : null;
  } catch {
    return null;
  }
}
