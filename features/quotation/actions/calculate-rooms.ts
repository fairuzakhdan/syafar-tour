import { ROOM_TYPES } from "@/lib/constants";
import type { RoomType } from "@/types/common.types";

export function getRoomCapacity(roomType: RoomType): number {
  return ROOM_TYPES[roomType] ?? 0;
}

/**
 * Jumlah kamar selalu dibulatkan ke atas (ceil), tidak pernah pecahan.
 * 8 pax Quad = 2 kamar, 9 pax Quad = 3 kamar, 5 pax Double = 3 kamar.
 */
export function calculateRooms(pax: number, roomType: RoomType): number {
  const safePax = Number.isFinite(pax) ? Math.floor(pax) : 0;
  const capacity = getRoomCapacity(roomType);

  if (safePax <= 0 || capacity <= 0) return 0;

  return Math.ceil(safePax / capacity);
}
