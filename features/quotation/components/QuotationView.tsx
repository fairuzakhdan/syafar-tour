"use client";

import { QuotationForm } from "./QuotationForm";
import { QuotationSummary } from "./QuotationSummary";
import { SelectedHotel } from "./SelectedHotel";
import { calculateRooms } from "../actions/calculate-rooms";
import type { UseQuotationReturn } from "../hooks/useQuotation";
import type { Hotel, SearchMeta } from "@/types/common.types";

export interface QuotationViewProps {
  hotel: Hotel;
  meta: SearchMeta;
  quotation: UseQuotationReturn;
}

export function QuotationView({ hotel, meta, quotation }: QuotationViewProps) {
  const rooms = calculateRooms(meta.pax, meta.roomType);

  return (
    <div className="flex flex-col gap-4">
      <SelectedHotel hotel={hotel} meta={meta} rooms={rooms} />
      <QuotationForm form={quotation.form} />
      <QuotationSummary result={quotation.result} />
    </div>
  );
}
