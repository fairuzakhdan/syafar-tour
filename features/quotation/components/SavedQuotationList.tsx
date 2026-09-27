"use client";

import { FolderOpen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { formatIDR, formatDateLabel } from "@/lib/utils";
import type { SavedQuotation } from "../types/quotation.types";

export interface SavedQuotationListProps {
  items: SavedQuotation[];
  onLoad: (item: SavedQuotation) => void;
  onRemove: (id: string) => void;
}

function formatSavedAt(iso: string): string {
  const time = Date.parse(iso);
  if (!Number.isFinite(time)) return "-";
  return new Date(time).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Daftar quotation tersimpan: muat kembali pengaturan lama atau hapus entri. */
export function SavedQuotationList({ items, onLoad, onRemove }: SavedQuotationListProps) {
  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-sm font-semibold text-slate-700">
          Belum ada quotation tersimpan.
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Pilih hotel lalu tekan Simpan di footer quotation.
        </p>
      </section>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">
              {item.hotelName}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {item.city} · {formatDateLabel(item.checkIn)} –{" "}
              {formatDateLabel(item.checkOut)} · {item.pax} jamaah · {item.roomType}
            </p>
            <p className="text-xs text-slate-400">Disimpan {formatSavedAt(item.savedAt)}</p>

            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs">
              <span className="text-slate-600">
                Total Cost{" "}
                <span className="font-semibold text-slate-800">
                  {formatIDR(item.summary.totalCostIdr)}
                </span>
              </span>
              <span className="text-slate-600">
                Harga Jual{" "}
                <span className="font-semibold text-emerald-700">
                  {formatIDR(item.summary.sellingPriceIdr)} / pax
                </span>
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => onLoad(item)}>
              <FolderOpen className="h-4 w-4" />
              Muat
            </Button>
            <Button
              size="sm"
              variant="ghost"
              aria-label={`Hapus quotation ${item.hotelName}`}
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
