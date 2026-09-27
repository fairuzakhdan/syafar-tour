import type { Hotel } from "@/types/common.types";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc";

export interface ResultsFilter {
  query: string;
  minPrice: string;
  maxPrice: string;
  sort: SortOption;
}

export interface HotelResultItem {
  hotel: Hotel;
  rooms: number;
  nights: number;
  baseSAR: number;
  taxSAR: number;
  totalSAR: number;
  perPaxSAR: number;
}
