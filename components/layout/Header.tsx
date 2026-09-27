import { Container } from "./Container";
import { Hotel } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex items-center gap-3 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-white">
          <Hotel className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-slate-900">
            Syafar Tour
          </p>
          <p className="text-xs leading-tight text-slate-500">
            Hotel Rate Aggregator &amp; Quotation Engine
          </p>
        </div>
      </Container>
    </header>
  );
}
