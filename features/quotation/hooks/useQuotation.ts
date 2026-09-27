"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { calculateQuotation } from "../actions/calculate-quotation";
import { quotationSchema } from "../schemas/quotation.schema";
import type { QuotationFormValues, QuotationResult } from "../types/quotation.types";
import {
  DEFAULT_KURS,
  DEFAULT_MARGIN_PER_PAX,
  DEFAULT_TIKET_PER_PAX,
  DEFAULT_TRANSPORT_TOTAL,
  DEFAULT_VISA_PER_PAX,
} from "@/lib/constants";
import type { Hotel, SearchMeta } from "@/types/common.types";

export interface UseQuotationArgs {
  hotel: Hotel | null;
  meta: SearchMeta | null;
  /** Nilai awal form; dipakai halaman utama mengisi ulang dari history. */
  initialValues?: Partial<QuotationFormValues>;
}

/** Satu-satunya sumber nilai awal: dipakai defaultValues form dan fallback kalkulasi. */
export const QUOTATION_DEFAULTS = {
  kurs: DEFAULT_KURS,
  visaPerPax: DEFAULT_VISA_PER_PAX,
  transportTotal: DEFAULT_TRANSPORT_TOTAL,
  tiketPerPax: DEFAULT_TIKET_PER_PAX,
  marginPerPax: DEFAULT_MARGIN_PER_PAX,
  // Default OFF agar hasil persis contoh di soal (12.000 → 18.000 SAR).
  // Checkbox di form menyalakan pajak 15% dari data API (butir technical test 13).
  applyHotelTax: false,
} satisfies QuotationFormValues;

/** Nilai user menang; field yang undefined tidak menimpa default. */
function withDefaults(values: Partial<QuotationFormValues>): QuotationFormValues {
  const defined = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  ) as Partial<QuotationFormValues>;

  return { ...QUOTATION_DEFAULTS, ...defined };
}

export function useQuotation({ hotel, meta, initialValues }: UseQuotationArgs) {
  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationSchema),
    defaultValues: { ...QUOTATION_DEFAULTS, ...initialValues },
    mode: "onChange",
  });

  const values = useWatch({ control: form.control });

  const result: QuotationResult | null =
    hotel && meta
      ? calculateQuotation({ hotel, meta, ...withDefaults(values) })
      : null;

  return { form, result };
}

export type UseQuotationReturn = ReturnType<typeof useQuotation>;
