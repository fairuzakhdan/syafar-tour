import { NextRequest, NextResponse } from "next/server";

import { HOTELS } from "@/data/hotels";
import { MOCK_API_DELAY_MS } from "@/lib/constants";
import { parseSearchQuery } from "./search-query";
import type { ApiFailure, HotelSearchPayload } from "@/types/common.types";

function failure(error: string, status: number) {
  const body: ApiFailure = { success: false, error };
  return NextResponse.json(body, { status });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock Trip.com API.
 * GET /api/hotels?city=Makkah&checkIn=2026-11-10&checkOut=2026-11-14&pax=8&roomType=Quad
 * Tambahkan ?fail=1 untuk mensimulasikan kegagalan API (demo error handling).
 */
export async function GET(request: NextRequest) {
  await sleep(MOCK_API_DELAY_MS);

  const params = request.nextUrl.searchParams;

  if (params.get("fail") === "1") {
    return failure("Mock Trip.com API sedang tidak tersedia.", 500);
  }

  const parsed = parseSearchQuery(params);
  if (!parsed.ok) return failure(parsed.error, parsed.status);

  const payload: HotelSearchPayload = {
    meta: parsed.meta,
    hotels: HOTELS.filter((hotel) => hotel.city === parsed.meta.city),
  };

  return NextResponse.json({ success: true, data: payload }, { status: 200 });
}
