"use client";

import { Card } from "@/components/ui/Card";
import { SearchForm } from "./SearchForm";
import type { UseHotelSearchReturn } from "../../hooks/useHotelSearch";

export interface HotelSearchViewProps {
  search: UseHotelSearchReturn;
  /** Override submit karena page punya side effect (tutup drawer, reset hotel). */
  onSubmit: UseHotelSearchReturn["onSubmit"];
}

export function HotelSearchView({ search, onSubmit }: HotelSearchViewProps) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5">
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
          Cari Hotel Makkah / Madinah
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Cari hotel terbaik di Makkah dan Madinah untuk keberangkatan Anda.
          Bandingkan rate kamar per malam, lalu hitung estimasi biaya per jamaah.
        </p>
      </div>

      <SearchForm search={search} onSubmit={onSubmit} />
    </Card>
  );
}
