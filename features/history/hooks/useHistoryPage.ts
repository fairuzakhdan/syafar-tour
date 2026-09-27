"use client";

import { useRouter } from "next/navigation";

import type { SavedQuotation } from "@/features/dashboard/types/quotation.types";
import { stashPendingQuotation } from "@/features/dashboard/lib/saved-quotations";
import { useSavedQuotations } from "@/features/dashboard/hooks/useSavedQuotations";

/** Alur halaman history: daftar entri + muat/hapus. */
export function useHistoryPage() {
  const router = useRouter();
  const { items, remove } = useSavedQuotations();

  const handleLoad = (item: SavedQuotation) => {
    stashPendingQuotation(item);
    router.push("/");
  };

  return { items, handleLoad, handleRemove: remove };
}

export type UseHistoryPageReturn = ReturnType<typeof useHistoryPage>;
