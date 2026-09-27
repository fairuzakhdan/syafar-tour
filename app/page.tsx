"use client";

import { useState } from "react";
import type { BaseSyntheticEvent } from "react";

import { Container } from "@/components/layout/Container";
import { HotelResultsView } from "@/features/hotel-results/components/HotelResultsView";
import { useHotelResults } from "@/features/hotel-results/hooks/useHotelResults";
import { HotelSearchView } from "@/features/hotel-search/components/HotelSearchView";
import { useHotelSearch } from "@/features/hotel-search/hooks/useHotelSearch";
import { QuotationDrawer } from "@/features/quotation/components/QuotationDrawer";
import { useQuotation } from "@/features/quotation/hooks/useQuotation";
import { useDisclosure } from "@/hooks/useDisclosure";
import type { Hotel } from "@/types/common.types";

export default function HomePage() {
  const search = useHotelSearch();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const quotationPanel = useDisclosure(false);

  const meta = search.result?.meta ?? null;
  const hotels = search.result?.hotels ?? [];

  const results = useHotelResults(hotels, meta);
  const quotation = useQuotation({ hotel: selectedHotel, meta });

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    quotationPanel.open();
  };

  const handleSearch = (event?: BaseSyntheticEvent) => {
    quotationPanel.close();
    setSelectedHotel(null);
    return search.onSubmit(event);
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
      />
    </>
  );
}
