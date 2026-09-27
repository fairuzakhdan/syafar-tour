import type {
  ApiResponse,
  ApiSuccess,
  City,
  HotelSearchPayload,
  RoomType,
} from "@/types/common.types";

export interface HotelSearchParams {
  city: City;
  checkIn: string;
  checkOut: string;
  pax: number;
  roomType: RoomType;
}

export class HotelApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HotelApiError";
    this.status = status;
  }
}

export function buildHotelsUrl(params: HotelSearchParams): string {
  const query = new URLSearchParams({
    city: params.city,
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    pax: String(params.pax),
    roomType: params.roomType,
  });
  return `/api/hotels?${query.toString()}`;
}

export async function getJson<T>(
  url: string,
  signal?: AbortSignal,
): Promise<ApiSuccess<T>> {
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  let body: ApiResponse<T> | null = null;
  try {
    body = (await response.json()) as ApiResponse<T>;
  } catch {
    body = null;
  }

  if (!body) {
    throw new HotelApiError(
      `Respons API tidak valid (HTTP ${response.status}).`,
      response.status,
    );
  }

  if (!response.ok || !body.success) {
    const message =
      !body.success && body.error
        ? body.error
        : `Permintaan gagal (HTTP ${response.status}).`;
    throw new HotelApiError(message, response.status);
  }

  return body;
}

export type HotelSearchResponse = ApiResponse<HotelSearchPayload>;
