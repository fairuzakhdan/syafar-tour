export interface HotelCostInput {
  rooms: number;
  nights: number;
  pricePerRoomPerNight: number;
  /** 0–100. Kirim 0 jika pajak tidak diterapkan. */
  taxPercent: number;
}

/**
 * Biaya hotel: kamar × malam × rate, ditambah pajak dari data supplier.
 * Satu-satunya rumus — dipakai quotation maupun kartu hasil pencarian.
 */
export function calculateHotelCost({
  rooms,
  nights,
  pricePerRoomPerNight,
  taxPercent,
}: HotelCostInput) {
  const baseSAR = rooms * nights * pricePerRoomPerNight;
  const taxSAR = baseSAR * (taxPercent / 100);

  return { baseSAR, taxSAR, totalSAR: baseSAR + taxSAR };
}
