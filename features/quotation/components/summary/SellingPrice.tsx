import { Wallet } from "lucide-react";

import { formatIDR } from "@/lib/utils";
import type { QuotationResult } from "../../types/quotation.types";

export interface SellingPriceProps {
  result: QuotationResult;
}

/** Angka final: harga jual per pax. Teks informasi, bukan tombol. */
export function SellingPrice({ result }: SellingPriceProps) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Wallet className="h-3.5 w-3.5" />
        Harga Jual per pax
      </p>
      <p className="text-xl font-black tabular-nums text-emerald-700">
        {formatIDR(result.sellingPriceIdr)}
      </p>
    </div>
  );
}
