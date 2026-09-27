"use client";

import { useState } from "react";
import type { BaseSyntheticEvent } from "react";

import { useSavedQuotations } from "@/features/dashboard/hooks/useSavedQuotations";
import { takePendingQuotation } from "@/features/dashboard/lib/saved-quotations";
import { useQuotation } from "@/features/dashboard/hooks/useQuotation";
import { useDisclosure } from "@/hooks/useDisclosure";
import type { Hotel } from "@/types/common.types";
import { useHotelResults } from "./useHotelResults";
import { useHotelSearch } from "./useHotelSearch";

/** Seluruh alur beranda: pencarian → hasil → quotation → simpan. */
export function useDashboard() {
  // Dibaca saat mount: history menulis entri lalu navigasi ke halaman ini.
  const [pending] = useState(() => takePendingQuotation());
  const search = useHotelSearch({
    initialValues: pending
      ? {
          city: pending.city,
          checkIn: pending.checkIn,
          checkOut: pending.checkOut,
          pax: pending.pax,
          roomType: pending.roomType,
        }
      : undefined,
  });
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const quotationPanel = useDisclosure(false);
  const savedQuotations = useSavedQuotations();
  const [savePulse, setSavePulse] = useState(0);

  const meta = search.result?.meta ?? null;
  const hotels = search.result?.hotels ?? [];

  const results = useHotelResults(hotels, meta);
  const quotation = useQuotation({
    hotel: selectedHotel,
    meta,
    initialValues: pending?.values,
  });

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    quotationPanel.open();
  };

  const handleSearch = (event?: BaseSyntheticEvent) => {
    quotationPanel.close();
    setSelectedHotel(null);
    return search.onSubmit(event);
  };

  const handleSaveQuotation = () => {
    const result = quotation.result;
    if (!selectedHotel || !meta || !result || !result.valid) return;

    savedQuotations.save({
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      city: meta.city,
      checkIn: meta.checkIn,
      checkOut: meta.checkOut,
      pax: meta.pax,
      roomType: meta.roomType,
      values: quotation.form.getValues(),
      summary: {
        totalCostIdr: result.totalCostIdr,
        sellingPriceIdr: result.sellingPriceIdr,
      },
    });
    setSavePulse((tick) => tick + 1);
  };

  return {
    search,
    results,
    quotation,
    panel: quotationPanel,
    hotel: selectedHotel,
    meta,
    savePulse,
    handleSelectHotel,
    handleSearch,
    handleSaveQuotation,
  };
}

export type UseDashboardReturn = ReturnType<typeof useDashboard>;
