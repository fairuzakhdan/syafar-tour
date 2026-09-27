import type { Hotel } from "@/types/common.types";
import type { ResultsFilter, SortOption } from "../types/hotel-results.types";

/** Filter nama hotel + range harga per kamar per malam (SAR). */
export function filterHotels(
  hotels: Hotel[],
  { query, minPrice, maxPrice }: Pick<ResultsFilter, "query" | "minPrice" | "maxPrice">,
): Hotel[] {
  const keyword = query.trim().toLowerCase();
  const min = Number(minPrice);
  const max = Number(maxPrice);
  const hasMin = minPrice.trim() !== "" && Number.isFinite(min);
  const hasMax = maxPrice.trim() !== "" && Number.isFinite(max);

  return hotels.filter((hotel) => {
    if (keyword && !hotel.name.toLowerCase().includes(keyword)) return false;
    if (hasMin && hotel.pricePerRoomPerNight < min) return false;
    if (hasMax && hotel.pricePerRoomPerNight > max) return false;
    return true;
  });
}

export function sortHotels(hotels: Hotel[], sort: SortOption): Hotel[] {
  const list = [...hotels];

  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.pricePerRoomPerNight - b.pricePerRoomPerNight);
    case "price-desc":
      return list.sort((a, b) => b.pricePerRoomPerNight - a.pricePerRoomPerNight);
    case "rating-desc":
      return list.sort((a, b) => b.rating - a.rating);
    case "default":
    default:
      return list;
  }
}

export function applyResultsFilter(
  hotels: Hotel[],
  filter: ResultsFilter,
): Hotel[] {
  return sortHotels(filterHotels(hotels, filter), filter.sort);
}

export function isFilterActive(filter: ResultsFilter): boolean {
  return (
    filter.query.trim() !== "" ||
    filter.minPrice.trim() !== "" ||
    filter.maxPrice.trim() !== "" ||
    filter.sort !== "default"
  );
}
