"use client";

import { Container } from "@/components/layout/Container";
import { SavedQuotationList } from "@/features/history/components/SavedQuotationList";
import { useHistoryPage } from "@/features/history/hooks/useHistoryPage";

export function HistoryView() {
  const history = useHistoryPage();

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

        <SavedQuotationList
          items={history.items}
          onLoad={history.handleLoad}
          onRemove={history.handleRemove}
        />
      </Container>
    </div>
  );
}
