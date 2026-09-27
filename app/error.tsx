"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function Error({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-6 sm:py-8">
      <Container>
        <Card className="mx-auto max-w-lg border-rose-200 p-6">
          <div className="flex flex-col items-start gap-3">
            <h1 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <TriangleAlert className="h-5 w-5 text-rose-500" aria-hidden="true" />
              Terjadi kesalahan
            </h1>

            <p className="text-sm text-slate-600">
              Halaman ini gagal dimuat. Coba lagi, atau muat ulang beberapa saat
              kemudian.
            </p>

            <pre className="w-full overflow-x-auto rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
              {error.message || "Tanpa detail error."}
              {error.digest ? `\ndigest: ${error.digest}` : ""}
            </pre>

            <Button variant="outline" className="w-full" onClick={() => retry()}>
              Coba lagi
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
