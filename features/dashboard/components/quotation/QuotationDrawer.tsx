"use client";

import { useState } from "react";
import { CheckCircle2, Save, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { QuotationView } from "@/features/dashboard/components/quotation/QuotationView";
import { SellingPrice } from "@/features/dashboard/components/quotation/summary/SellingPrice";
import type { UseQuotationReturn } from "@/features/dashboard/hooks/useQuotation";
import type { DisclosureReturn } from "@/hooks/useDisclosure";
import type { Hotel, SearchMeta } from "@/types/common.types";

export interface QuotationDrawerProps {
  panel: DisclosureReturn;
  hotel: Hotel | null;
  meta: SearchMeta | null;
  quotation: UseQuotationReturn;
  onSave: () => void;
  /** Bertambah tiap Simpan ditekan; dipakai memicu ulang animasi notifikasi. */
  savePulse: number;
}

export function QuotationDrawer({
  panel,
  hotel,
  meta,
  quotation,
  onSave,
  savePulse,
}: QuotationDrawerProps) {
  const [dismissedFor, setDismissedFor] = useState<number | null>(null);
  const canRender = panel.isOpen && hotel !== null && meta !== null;
  const result = quotation.result;
  const showPrice = canRender && result !== null && result.valid;
  const showNotice = savePulse > 0 && dismissedFor !== savePulse;

  const notice = showNotice ? (
    <div
      key={savePulse}
      role="status"
      aria-live="polite"
      className="pointer-events-auto flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg animate-[toast-out_2.8s_ease_forwards] motion-reduce:animate-none"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Quotation tersimpan.</span>
      <span className="font-normal text-emerald-100">
        Lihat menu History di pojok kanan atas.
      </span>
      <button
        type="button"
        aria-label="Tutup notifikasi"
        className="ml-1 rounded p-0.5 transition-colors hover:bg-emerald-800"
        onClick={() => setDismissedFor(savePulse)}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  ) : null;

  return (
    <Drawer
      open={canRender}
      onClose={panel.close}
      title="Quotation"
      description="Estimasi biaya per jamaah"
      notice={notice}
      footer={
        showPrice ? (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <SellingPrice result={result} />
            </div>
            <Button onClick={onSave}>
              <Save className="h-4 w-4" />
              Simpan
            </Button>
          </div>
        ) : null
      }
    >
      {canRender && hotel && meta ? (
        <QuotationView hotel={hotel} meta={meta} quotation={quotation} />
      ) : null}
    </Drawer>
  );
}
