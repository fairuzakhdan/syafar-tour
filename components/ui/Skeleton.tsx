import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
}

/** Blok abu-abu berdenyut sebagai placeholder konten yang belum dimuat. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <span
      className={cn("block animate-pulse rounded-xl bg-slate-200", className)}
      aria-hidden="true"
    />
  );
}
