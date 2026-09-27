export interface SummaryIssuesProps {
  issues: string[];
}

/** Input belum valid — daftar hal yang harus diperbaiki. */
export function SummaryIssues({ issues }: SummaryIssuesProps) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
      <h3 className="text-sm font-bold text-amber-800">
        Quotation belum bisa dihitung
      </h3>

      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-700">
        {issues.map((issue) => (
          <li key={issue}>{issue}</li>
        ))}
      </ul>
    </section>
  );
}
