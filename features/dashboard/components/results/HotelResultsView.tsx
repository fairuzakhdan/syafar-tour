"use client";

import { HotelCard } from "./HotelCard";
import { HotelListItem } from "./HotelListItem";
import { HotelResultsHeader } from "./HotelResultsHeader";
import { ResultsEmptyState } from "./ResultsEmptyState";
import { ResultsErrorState } from "./ResultsErrorState";
import { ResultsLoadingState } from "./ResultsLoadingState";
import { SearchMetaStrip } from "./SearchMetaStrip";
import type { UseHotelResultsReturn } from "../../hooks/useHotelResults";
import type { UseHotelSearchReturn } from "@/features/dashboard/hooks/useHotelSearch";
import type { Hotel } from "@/types/common.types";

export interface HotelResultsViewProps {
  search: UseHotelSearchReturn;
  results: UseHotelResultsReturn;
  onSelect: (hotel: Hotel) => void;
}

export function HotelResultsView({
  search,
  results,
  onSelect,
}: HotelResultsViewProps) {
  const { status, error, retry } = search;
  const meta = search.result?.meta ?? null;

  if (status === "error") return <ResultsErrorState error={error} onRetry={retry} />;

  // Pencarian pertama: belum ada meta, langsung tampilkan skeleton
  if (!meta) return status === "loading" ? <ResultsLoadingState /> : null;

  return (
    <div>
      {/* Strip + filter selalu dirender: yang boleh berubah hanya daftarnya */}
      <SearchMetaStrip meta={meta} />

      <HotelResultsHeader
        title={`Hotel ${meta.city}`}
        loading={status === "loading"}
        results={results}
      />

      {status === "loading" ? (
        <ResultsLoadingState />
      ) : results.items.length === 0 ? (
        <ResultsEmptyState meta={meta} totalHotels={results.totalHotels} />
      ) : (
        <>
          {/* Desktop: grid kartu */}
          <div className="hidden grid-cols-1 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {results.items.map((item) => (
              <HotelCard
                key={item.hotel.id}
                item={item}
                pax={meta.pax}
                onSelect={onSelect}
              />
            ))}
          </div>

          {/* Mobile: daftar ringkas */}
          <div className="flex flex-col gap-3 md:hidden">
            {results.items.map((item) => (
              <HotelListItem key={item.hotel.id} item={item} onSelect={onSelect} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
