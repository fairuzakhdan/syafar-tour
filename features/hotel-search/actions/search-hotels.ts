import { buildHotelsUrl, getJson } from "@/lib/api";
import type { HotelSearchParams } from "@/lib/api";
import type { HotelSearchPayload } from "@/types/common.types";

/**
 * Action pencarian hotel: memanggil mock Trip.com API (GET /api/hotels).
 * Berjalan di sisi client karena tidak ada proses mutasi data.
 */
export async function searchHotels(
  params: HotelSearchParams,
  signal?: AbortSignal,
): Promise<HotelSearchPayload> {
  const response = await getJson<HotelSearchPayload>(
    buildHotelsUrl(params),
    signal,
  );
  return response.data;
}
