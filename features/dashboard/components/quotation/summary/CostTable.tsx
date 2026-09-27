import { formatIDR, formatIdrNumber, formatNumber } from "@/lib/utils";
import type { QuotationResult } from "@/features/dashboard/types/quotation.types";

export interface CostTableProps {
  result: QuotationResult;
}

interface Row {
  label: string;
  /** null = komponen tidak dibayar dalam SAR (misal tiket). */
  sar: number | null;
  idr: number;
  /** Subtotal SAR → IDR, ditampilkan sebagai pemisah sebelum biaya IDR. */
  subtotal?: boolean;
}

const HEAD_CELL = "pb-1 text-left text-xs font-medium uppercase tracking-wide text-slate-400";
const HEAD_CELL_RIGHT = `${HEAD_CELL} text-right`;
const BODY_CELL = "py-1.5 text-sm text-slate-700";
const BODY_CELL_RIGHT = `${BODY_CELL} text-right tabular-nums`;
const SUBTOTAL_CELL = `${BODY_CELL} border-t border-slate-200 font-medium text-slate-900`;
const SUBTOTAL_CELL_RIGHT = `${BODY_CELL_RIGHT} border-t border-slate-200 font-medium text-slate-900`;

/** Rincian biaya: satu tabel, tiap komponen punya nilai SAR dan IDR. */
export function CostTable({ result }: CostTableProps) {
  const rows: Row[] = [
    {
      label: "Hotel",
      sar: result.hotelBaseSAR,
      idr: Math.round(result.hotelBaseSAR * result.kurs),
    },
    ...(result.taxPercent > 0
      ? [
          {
            label: `Pajak hotel ${result.taxPercent}%`,
            sar: result.hotelTaxSAR,
            idr: Math.round(result.hotelTaxSAR * result.kurs),
          },
        ]
      : []),
    {
      label: "Visa",
      sar: result.visaSAR,
      idr: Math.round(result.visaSAR * result.kurs),
    },
    {
      label: "Transport",
      sar: result.transportSAR,
      idr: Math.round(result.transportSAR * result.kurs),
    },
    {
      label: "Total biaya SAR dalam IDR",
      sar: result.totalSAR,
      idr: Math.round(result.totalSAR * result.kurs),
      subtotal: true,
    },
    { label: "Tiket pesawat", sar: null, idr: result.tiketIdr },
  ];

  const totals: Row[] = [
    { label: "Total", sar: result.totalSAR, idr: result.totalCostIdr },
    { label: "Cost per jamaah", sar: null, idr: result.costPerPaxIdr },
    { label: "Margin per jamaah", sar: null, idr: result.marginIdr },
  ];

  return (
    <div>
      <p className="mb-2 text-xs text-slate-400">
        1 SAR = {formatIDR(result.kurs)} · {result.pax} jamaah ·{" "}
        {result.nights} malam
      </p>

      <table className="w-full">
        <thead>
          <tr>
            <th className={HEAD_CELL}>Komponen</th>
            <th className={HEAD_CELL_RIGHT}>SAR</th>
            <th className={HEAD_CELL_RIGHT}>IDR</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className={row.subtotal ? SUBTOTAL_CELL : BODY_CELL}>
                {row.label}
              </td>
              <td className={row.subtotal ? SUBTOTAL_CELL_RIGHT : BODY_CELL_RIGHT}>
                {row.sar === null ? "—" : formatNumber(row.sar)}
              </td>
              <td className={row.subtotal ? SUBTOTAL_CELL_RIGHT : BODY_CELL_RIGHT}>
                {formatIdrNumber(row.idr)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t border-slate-200">
            <td className={`${BODY_CELL} font-semibold text-slate-900`}>
              {totals[0].label}
            </td>
            <td className={`${BODY_CELL_RIGHT} font-semibold text-slate-900`}>
              {formatNumber(totals[0].sar ?? 0)}
            </td>
            <td className={`${BODY_CELL_RIGHT} font-semibold text-slate-900`}>
              {formatIdrNumber(totals[0].idr)}
            </td>
          </tr>

          {totals.slice(1).map((row) => (
            <tr key={row.label}>
              <td className={BODY_CELL}>{row.label}</td>
              <td className={BODY_CELL_RIGHT}>—</td>
              <td className={BODY_CELL_RIGHT}>{formatIdrNumber(row.idr)}</td>
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
