import { ROOM_TYPES } from "@/lib/constants";
import { getNights } from "@/lib/utils";
import type { City, RoomType, SearchMeta } from "@/types/common.types";

const CITIES: City[] = ["Makkah", "Madinah"];
const ROOM_TYPE_KEYS = Object.keys(ROOM_TYPES) as RoomType[];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export type SearchQueryResult =
  | { ok: true; meta: SearchMeta }
  | { ok: false; error: string; status: 400 };

function invalid(error: string): SearchQueryResult {
  return { ok: false, error, status: 400 };
}

function isValidDate(value: string): boolean {
  return ISO_DATE.test(value) && Number.isFinite(Date.parse(value));
}

/**
 * Baca + validasi query string GET /api/hotels.
 *
 * Pemeriksaan berurutan: kota → tipe kamar → check-in → check-out →
 * rentang tanggal → jumlah jamaah. Urutan ini yang menentukan pesan
 * error pertama jika ada lebih dari satu input bermasalah.
 */
export function parseSearchQuery(params: URLSearchParams): SearchQueryResult {
  const city = params.get("city") ?? "";
  const checkIn = params.get("checkIn") ?? "";
  const checkOut = params.get("checkOut") ?? "";
  const paxRaw = params.get("pax") ?? "";
  const roomType = params.get("roomType") ?? "";

  if (!CITIES.includes(city as City)) {
    return invalid("Kota harus Makkah atau Madinah.");
  }

  if (!ROOM_TYPE_KEYS.includes(roomType as RoomType)) {
    return invalid("Tipe kamar harus Double, Triple, atau Quad.");
  }

  if (!isValidDate(checkIn)) {
    return invalid("Check-in wajib diisi dengan format tanggal yang valid.");
  }

  if (!isValidDate(checkOut)) {
    return invalid("Check-out wajib diisi dengan format tanggal yang valid.");
  }

  const nights = getNights(checkIn, checkOut);
  if (nights <= 0) {
    return invalid("Check-out harus setelah check-in.");
  }

  const pax = Number(paxRaw);
  if (!Number.isInteger(pax) || pax < 1) {
    return invalid("Jumlah jamaah minimal 1 orang.");
  }

  return {
    ok: true,
    meta: {
      city: city as City,
      checkIn,
      checkOut,
      nights,
      pax,
      roomType: roomType as RoomType,
    },
  };
}
