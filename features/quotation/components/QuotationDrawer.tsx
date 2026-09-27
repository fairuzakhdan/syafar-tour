"use client";

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
}

export function QuotationDrawer({
  panel,
  hotel,
  meta,
  quotation,
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
      footer={showPrice ? <SellingPrice result={result} /> : null}
    >
      {canRender && hotel && meta ? (
        <QuotationView hotel={hotel} meta={meta} quotation={quotation} />
      ) : null}
    </Drawer>
  );
}
