import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResultsLoadingState } from "@/features/dashboard/components/results/ResultsLoadingState";

export default function Loading() {
  return (
    <div className="py-6 sm:py-8">
      <Container className="flex flex-col gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="mt-2 h-4 w-80 max-w-full" />

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-[74px] w-full" />
            ))}
          </div>

          <Skeleton className="mt-5 h-12 w-full" />
        </section>

        <ResultsLoadingState />
      </Container>
    </div>
  );
}
