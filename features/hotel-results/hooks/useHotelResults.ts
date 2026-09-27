"use client";

import { useMemo, useState } from "react";

import { calculateRooms } from "@/features/quotation/actions/calculate-rooms";
import { calculateNights } from "@/features/quotation/actions/calculate-nights";
import { calculateHotelCost } from "@/features/quotation/actions/calculate-hotel-cost";
import { applyResultsFilter, isFilterActive } from "../actions/sort-hotels";
import type {
  HotelResultItem,
  ResultsFilter,
} from "../types/hotel-results.types";
import type { Hotel, SearchMeta } from "@/types/common.types";
import { toNumber } from "@/lib/utils";

const INITIAL_FILTER: ResultsFilter = {
  query: "",
  minPrice: "",
  maxPrice: "",
  sort: "default",
};

export function buildHotelResult(
  hotel: Hotel,
  rooms: number,
  nights: number,
  pax: number,
): HotelResultItem {
  const { baseSAR, taxSAR, totalSAR } = calculateHotelCost({
    rooms,
    nights,
    pricePerRoomPerNight: toNumber(hotel.pricePerRoomPerNight),
    taxPercent: toNumber(hotel.taxPercent),
  });

  return {
    hotel,
    rooms,
    nights,
    baseSAR,
    taxSAR,
    totalSAR,
    perPaxSAR: pax > 0 ? totalSAR / pax : 0,
  };
}

export function useHotelResults(hotels: Hotel[], meta: SearchMeta | null) {
  const [filter, setFilter] = useState<ResultsFilter>(INITIAL_FILTER);

  const rooms = meta ? calculateRooms(meta.pax, meta.roomType) : 0;
  const nights = meta ? calculateNights(meta.checkIn, meta.checkOut) : 0;

  const items = useMemo(() => {
    const source = hotels ?? [];
    const visible = applyResultsFilter(source, filter);

    return visible.map((hotel) =>
      buildHotelResult(hotel, rooms, nights, meta?.pax ?? 0),
    );
  }, [hotels, filter, rooms, nights, meta?.pax]);

  const updateFilter = (patch: Partial<ResultsFilter>) => {
    setFilter((current) => ({ ...current, ...patch }));
  };

  const resetFilter = () => setFilter(INITIAL_FILTER);

  return {
    items,
    filter,
    updateFilter,
    resetFilter,
    filtered: isFilterActive(filter),
    totalHotels: hotels?.length ?? 0,
  };
}

export type UseHotelResultsReturn = ReturnType<typeof useHotelResults>;
