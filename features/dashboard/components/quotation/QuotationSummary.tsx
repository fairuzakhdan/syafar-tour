"use client";

import { Calculator } from "lucide-react";

import { CostTable } from "./summary/CostTable";
import { SummaryIssues } from "./summary/SummaryIssues";
import { SummaryPlaceholder } from "./summary/SummaryPlaceholder";
import type { QuotationResult } from "@/features/dashboard/types/quotation.types";

export interface QuotationSummaryProps {
  result: QuotationResult | null;
}

/** Ringkasan quotation: pilih state → render blok yang sesuai. */
export function QuotationSummary({ result }: QuotationSummaryProps) {
  if (!result) return <SummaryPlaceholder />;
  if (!result.valid) return <SummaryIssues issues={result.issues} />;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
        <Calculator className="h-4 w-4 text-emerald-700" />
        Rincian Biaya
      </h3>

      <div className="mt-2">
        <CostTable result={result} />
      </div>
    </section>
  );
}
