import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ArrowLeft, SearchX } from "lucide-react";

/** 404 untuk semua URL yang tidak cocok; dirender di dalam root layout. */
export default function NotFound() {
  return (
    <div className="py-16 sm:py-24">
      <Container className="flex flex-col items-center text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
          <SearchX className="h-8 w-8" aria-hidden="true" />
        </div>

        <p className="mt-5 text-5xl font-black text-slate-900">404</p>

        <h1 className="mt-2 text-lg font-bold text-slate-800">
          Halaman tidak ditemukan
        </h1>

        <p className="mt-2 max-w-md text-sm text-slate-500">
          Halaman yang kamu tuju tidak ada atau sudah dipindahkan. Kembali ke
          beranda untuk mencari hotel di Makkah dan Madinah.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Beranda
        </Link>
      </Container>
    </div>
  );
}
