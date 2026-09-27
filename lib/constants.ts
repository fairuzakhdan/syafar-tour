import type { City, RoomType } from "@/types/common.types";

/** Kapasitas orang per kamar. Jumlah kamar selalu dibulatkan ke atas. */
export const ROOM_TYPES: Record<RoomType, number> = {
  Double: 2,
  Triple: 3,
  Quad: 4,
};

export const ROOM_TYPE_OPTIONS: { value: RoomType; label: string }[] = [
  { value: "Double", label: "Double (2 orang)" },
  { value: "Triple", label: "Triple (3 orang)" },
  { value: "Quad", label: "Quad (4 orang)" },
];

export const CITY_OPTIONS: { value: City; label: string }[] = [
  { value: "Makkah", label: "Makkah" },
  { value: "Madinah", label: "Madinah" },
];

export const MIN_PAX = 1;
export const MAX_PAX = 100;

/** Nilai awal menyesuaikan contoh perhitungan pada brief technical test. */
export const DEFAULT_KURS = 4_500;
export const DEFAULT_VISA_PER_PAX = 500;
export const DEFAULT_TRANSPORT_TOTAL = 2_000;
export const DEFAULT_TIKET_PER_PAX = 13_000_000;
export const DEFAULT_MARGIN_PER_PAX = 1_000_000;

/** Delay mock Trip.com API (ms) supaya loading state terlihat. */
export const MOCK_API_DELAY_MS = 700;
