import { getNights } from "@/lib/utils";

/** Jumlah malam menginap. 0 bila tanggal tidak valid atau check-out <= check-in. */
export function calculateNights(checkIn: string, checkOut: string): number {
  return getNights(checkIn, checkOut);
}
