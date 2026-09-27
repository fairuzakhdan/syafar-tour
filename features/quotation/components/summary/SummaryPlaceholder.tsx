import { Card } from "@/components/ui/Card";

/** Belum ada hotel dipilih. */
export function SummaryPlaceholder() {
  return (
    <Card className="p-4 text-sm text-slate-500">
      Pilih hotel terlebih dahulu untuk melihat perhitungan quotation.
    </Card>
  );
}
