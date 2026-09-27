"use client";

import { useState } from "react";
import type { BaseSyntheticEvent } from "react";
import { CheckCircle2, X } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { HotelResultsView } from "@/features/hotel-results/components/HotelResultsView";
import { useHotelResults } from "@/features/hotel-results/hooks/useHotelResults";
import { HotelSearchView } from "@/features/hotel-search/components/HotelSearchView";
import { useHotelSearch } from "@/features/hotel-search/hooks/useHotelSearch";
import { QuotationDrawer } from "@/features/quotation/components/QuotationDrawer";
import { useQuotation } from "@/features/quotation/hooks/useQuotation";
import { useSavedQuotations } from "@/features/quotation/hooks/useSavedQuotations";
import { takePendingQuotation } from "@/features/quotation/lib/saved-quotations";
import { useDisclosure } from "@/hooks/useDisclosure";
import type { Hotel } from "@/types/common.types";

export default function HomePage() {
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
  const [toastDismissed, setToastDismissed] = useState(false);

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
    setToastDismissed(false);
  };


  return (
    <>
      <div className="py-6 sm:py-8">
        <Container className="flex flex-col gap-6">
          <HotelSearchView search={search} onSubmit={handleSearch} />

          {search.status !== "idle" ? (
            <HotelResultsView
              search={search}
              results={results}
              onSelect={handleSelectHotel}
            />
          ) : null}
        </Container>
      </div>

      <QuotationDrawer
        panel={quotationPanel}
        hotel={selectedHotel}
        meta={meta}
        quotation={quotation}
        onSave={handleSaveQuotation}
      />

      {savePulse > 0 && !toastDismissed ? (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <div
            key={savePulse}
            className="pointer-events-auto flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg animate-[toast-out_2.8s_ease_forwards] motion-reduce:animate-none"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Quotation tersimpan.</span>
            <span className="font-normal text-emerald-100">
              Lihat menu History di pojok kanan atas.
            </span>
            <button
              type="button"
              aria-label="Tutup notifikasi"
              className="ml-1 rounded p-0.5 transition-colors hover:bg-emerald-800"
              onClick={() => setToastDismissed(true)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
