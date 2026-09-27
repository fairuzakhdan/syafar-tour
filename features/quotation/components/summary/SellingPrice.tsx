import { Wallet } from "lucide-react";

import { formatIDR } from "@/lib/utils";
import type { QuotationResult } from "../../types/quotation.types";

export interface SellingPriceProps {
  result: QuotationResult;
}

/** Angka final: harga jual per pax. */
export function SellingPrice({ result }: SellingPriceProps) {
  return (
    <div className="rounded-xl bg-emerald-700 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-100">
            <Wallet className="h-3.5 w-3.5" />
            Harga Jual
          </p>
          <p className="text-xs text-emerald-100">per pax</p>
        </div>

        <p className="text-xl font-black tabular-nums text-white">
          {formatIDR(result.sellingPriceIdr)}
        </p>
      </div>
    </div>
  );
}
