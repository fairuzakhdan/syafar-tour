import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TriangleAlert } from "lucide-react";

export interface ResultsErrorStateProps {
  error: string | null;
  onRetry: () => void;
}

export function ResultsErrorState({ error, onRetry }: ResultsErrorStateProps) {
  return (
    <Card className="border-rose-200 p-6">
      <div className="flex flex-col items-start gap-3">
        <Badge tone="warning">
          <TriangleAlert className="h-3 w-3" />
          API Error
        </Badge>

        <h2 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <TriangleAlert className="h-5 w-5 text-rose-500" aria-hidden="true" />
          Gagal memuat daftar hotel
        </h2>

        <p className="text-sm text-slate-600">{error ?? "Terjadi kesalahan."}</p>

        <Button variant="outline" onClick={onRetry}>
          Coba lagi
        </Button>
      </div>
    </Card>
  );
}
