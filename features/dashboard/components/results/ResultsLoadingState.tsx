import { Skeleton } from "@/components/ui/Skeleton";

const SKELETON_COUNT = 6;

/** Placeholder seukuran HotelCard: nama, badge, ringkasan harga, tombol. */
function HotelCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
        <Skeleton className="h-6 w-14 rounded-lg" />
      </div>

      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-16 rounded-lg" />
        <Skeleton className="h-5 w-20 rounded-lg" />
        <Skeleton className="h-5 w-14 rounded-lg" />
      </div>

      <div className="space-y-2 rounded-xl bg-slate-50 p-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-1/2" />
      </div>

      <Skeleton className="mt-auto h-10 w-full" />
    </div>
  );
}

/** Area daftar selagi memuat — strip & filter digambar sendiri oleh parent. */
export function ResultsLoadingState() {
  return (
    <div aria-busy="true" aria-live="polite">
      <p className="sr-only">
        Mencari hotel yang tersedia untuk tanggal pilihan Anda...
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <HotelCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
