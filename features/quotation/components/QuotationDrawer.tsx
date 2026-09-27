"use client";

import { Save } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { QuotationView } from "./QuotationView";
import { SellingPrice } from "./summary/SellingPrice";
import type { UseQuotationReturn } from "../hooks/useQuotation";
import type { DisclosureReturn } from "@/hooks/useDisclosure";
import type { Hotel, SearchMeta } from "@/types/common.types";

export interface QuotationDrawerProps {
  panel: DisclosureReturn;
  hotel: Hotel | null;
  meta: SearchMeta | null;
  quotation: UseQuotationReturn;
  onSave: () => void;
}

export function QuotationDrawer({
  panel,
  hotel,
  meta,
  quotation,
  onSave,
}: QuotationDrawerProps) {
  const canRender = panel.isOpen && hotel !== null && meta !== null;
  const result = quotation.result;
  const showPrice = canRender && result !== null && result.valid;

  return (
    <Drawer
      open={canRender}
      onClose={panel.close}
      title="Quotation"
      description="Estimasi biaya per jamaah"
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
