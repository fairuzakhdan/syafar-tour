import type { z } from "zod";

import type { quotationSchema } from "../schemas/quotation.schema";
import type { Hotel, RoomType, SearchMeta } from "@/types/common.types";

export type QuotationFormValues = z.infer<typeof quotationSchema>;

export interface QuotationInput {
  hotel: Pick<Hotel, "pricePerRoomPerNight" | "taxPercent">;
  meta: Pick<SearchMeta, "checkIn" | "checkOut" | "pax" | "roomType">;
  kurs: number;
  visaPerPax: number;
  transportTotal: number;
  tiketPerPax: number;
  marginPerPax: number;
  applyHotelTax: boolean;
}

export interface QuotationResult {
  valid: boolean;
  issues: string[];

  pax: number;
  roomType: RoomType;
  rooms: number;
  nights: number;
  checkIn: string;
  checkOut: string;

  pricePerRoomPerNight: number;
  taxPercent: number;
  hotelBaseSAR: number;
  hotelTaxSAR: number;
  hotelTotalSAR: number;
  hotelPerPaxSAR: number;

  visaPerPax: number;
  visaSAR: number;
  transportSAR: number;
  totalSAR: number;

  kurs: number;
  sarToIdr: number;
  tiketPerPax: number;
  tiketIdr: number;
  totalCostIdr: number;
  costPerPaxIdr: number;
  marginIdr: number;
  sellingPriceIdr: number;
}
