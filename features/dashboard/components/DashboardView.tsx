"use client";

import { Container } from "@/components/layout/Container";
import { useDashboard } from "../hooks/useDashboard";
import { QuotationDrawer } from "./quotation/QuotationDrawer";
import { HotelResultsView } from "./results/HotelResultsView";
import { HotelSearchView } from "./search/HotelSearchView";

/** Seluruh tampilan beranda: pencarian → hasil → drawer quotation. */
export function DashboardView() {
  const home = useDashboard();

  return (
    <>
      <div className="py-6 sm:py-8">
        <Container className="flex flex-col gap-6">
          <HotelSearchView search={home.search} onSubmit={home.handleSearch} />

          {home.search.status !== "idle" ? (
            <HotelResultsView
              search={home.search}
              results={home.results}
              onSelect={home.handleSelectHotel}
            />
          ) : null}
        </Container>
      </div>

      <QuotationDrawer
        panel={home.panel}
        hotel={home.hotel}
        meta={home.meta}
        quotation={home.quotation}
        onSave={home.handleSaveQuotation}
        savePulse={home.savePulse}
      />
    </>
  );
}
