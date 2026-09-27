import Link from "next/link";

import { Container } from "./Container";
import { Hotel, History } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between gap-3 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-white">
            <Hotel className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold leading-tight text-slate-900">
              Syafar Tour
            </span>
            <span className="block text-xs leading-tight text-slate-500">
              Hotel Rate Aggregator &amp; Quotation Engine
            </span>
          </span>
        </Link>

        <Link
          href="/history"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-emerald-700 hover:text-emerald-700"
          title="History quotation"
          aria-label="History quotation"
        >
          <History className="h-5 w-5" aria-hidden="true" />
        </Link>
      </Container>
    </header>
  );
}
