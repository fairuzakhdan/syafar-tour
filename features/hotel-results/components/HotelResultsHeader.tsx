"use client";

import { InputTextLabel } from "@/components/ui/field/InputTextLabel";
import { Select } from "@/components/ui/field/Select";
import { Button } from "@/components/ui/Button";
import type { UseHotelResultsReturn } from "../hooks/useHotelResults";
import type { SortOption } from "../types/hotel-results.types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Urutan asli" },
  { value: "price-asc", label: "Harga termurah" },
  { value: "price-desc", label: "Harga termahal" },
  { value: "rating-desc", label: "Rating tertinggi" },
];

export interface HotelResultsHeaderProps {
  title: string;
  /** Saat true, hitungan diganti indikator memuat (data masih basi). */
  loading: boolean;
  results: UseHotelResultsReturn;
}

export function HotelResultsHeader({
  title,
  loading,
  results,
}: HotelResultsHeaderProps) {
  const { filter, filtered, totalHotels, updateFilter, resetFilter } = results;
  const count = results.items.length;

  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500" aria-live="polite">
            {loading ? (
              "Mencari hotel terbaru..."
            ) : (
              <>
                Menampilkan{" "}
                <span className="font-semibold text-slate-700">{count}</span>{" "}
                dari {totalHotels} hotel
              </>
            )}
          </p>
        </div>

        {filtered ? (
          <Button variant="ghost" size="sm" onClick={resetFilter}>
            Reset filter
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputTextLabel
          label="Cari nama hotel"
          placeholder="Contoh: Fairmont"
          value={filter.query}
          onChange={(event) => updateFilter({ query: event.target.value })}
        />

        <InputTextLabel
          label="Harga minimum (SAR)"
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="0"
          value={filter.minPrice}
          onChange={(event) => updateFilter({ minPrice: event.target.value })}
        />

        <InputTextLabel
          label="Harga maksimum (SAR)"
          type="number"
          inputMode="numeric"
          min={0}
          placeholder="1500"
          value={filter.maxPrice}
          onChange={(event) => updateFilter({ maxPrice: event.target.value })}
        />

        <Select
          label="Urutkan"
          options={SORT_OPTIONS}
          value={filter.sort}
          onChange={(event) => updateFilter({ sort: event.target.value as SortOption })}
        />
      </div>
    </div>
  );
}
