"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  getSavedQuotationsSnapshot,
  publishSavedQuotations,
  removeSavedQuotation,
  saveQuotation,
  subscribeSavedQuotations,
} from "../lib/saved-quotations";
import type { SavedQuotation } from "@/features/dashboard/types/quotation.types";

const SERVER_ITEMS: SavedQuotation[] = [];

/** Daftar quotation tersimpan (localStorage) tanpa efek setState di effect. */
export function useSavedQuotations() {
  const items = useSyncExternalStore(
    subscribeSavedQuotations,
    getSavedQuotationsSnapshot,
    () => SERVER_ITEMS,
  );

  const save = useCallback((entry: Omit<SavedQuotation, "id" | "savedAt">) => {
    publishSavedQuotations(saveQuotation(entry));
  }, []);

  const remove = useCallback((id: string) => {
    publishSavedQuotations(removeSavedQuotation(id));
  }, []);

  return { items, save, remove };
}

export type UseSavedQuotationsReturn = ReturnType<typeof useSavedQuotations>;
