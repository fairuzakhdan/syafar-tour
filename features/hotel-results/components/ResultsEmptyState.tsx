import { EmptyState } from "@/components/ui/EmptyState";
import { Search } from "lucide-react";
import type { SearchMeta } from "@/types/common.types";

export interface ResultsEmptyStateProps {
  meta: SearchMeta;
  /** Jumlah hotel sebelum difilter. 0 berarti kota tidak punya hotel. */
  totalHotels: number;
}

/**
 * Konten di bawah filter saat hasil kosong.
 * Filter tetap dirender di atasnya agar bisa langsung dikoreksi.
 */
export function ResultsEmptyState({ meta, totalHotels }: ResultsEmptyStateProps) {
  if (totalHotels === 0) {
    return (
      <EmptyState
        title={`Tidak ada hotel di kota ${meta.city}`}
        description="Coba pilih kota lain pada form pencarian."
      />
    );
  }

  return (
    <EmptyState
      icon={<Search className="h-8 w-8" />}
      title="Tidak ada hotel yang cocok dengan filter"
      description="Ubah kata kunci, range harga, atau urutan pencarian di atas."
    />
  );
}
