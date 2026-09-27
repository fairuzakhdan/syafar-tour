"use client";

import { useRouter } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { SavedQuotationList } from "@/features/quotation/components/SavedQuotationList";
import { useSavedQuotations } from "@/features/quotation/hooks/useSavedQuotations";
import { stashPendingQuotation } from "@/features/quotation/lib/saved-quotations";
import type { SavedQuotation } from "@/features/quotation/types/quotation.types";

export default function HistoryPage() {
  const router = useRouter();
  const { items, remove } = useSavedQuotations();

  const handleLoad = (item: SavedQuotation) => {
    stashPendingQuotation(item);
    router.push("/");
  };

  return (
    <div className="py-6 sm:py-8">
      <Container className="flex flex-col gap-4">
        <header>
          <h1 className="text-xl font-black text-slate-900">History Quotation</h1>
          <p className="mt-1 text-sm text-slate-500">
            Quotation yang pernah disimpan. Tekan Muat untuk mengembalikan
            pengaturannya ke halaman pencarian.
          </p>
        </header>

        <SavedQuotationList items={items} onLoad={handleLoad} onRemove={remove} />
      </Container>
    </div>
  );
}
