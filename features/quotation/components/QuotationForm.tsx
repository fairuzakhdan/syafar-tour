"use client";

import type { UseFormReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/field/Checkbox";
import { InputTextLabel } from "@/components/ui/field/InputTextLabel";
import type { QuotationFormValues } from "../types/quotation.types";

export interface QuotationFormProps {
  form: UseFormReturn<QuotationFormValues>;
}

export function QuotationForm({ form }: QuotationFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-bold text-slate-900">Parameter Quotation</h3>
      <p className="mt-0.5 text-xs text-slate-500">
        Hasil hitungan diperbarui otomatis setiap kali nilai berubah.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputTextLabel
          label="Kurs SAR ke IDR"
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          prefix="Rp"
          placeholder="4500"
          error={errors.kurs?.message}
          hint="Contoh: 4500 = Rp4.500 per 1 SAR"
          {...register("kurs", { valueAsNumber: true })}
        />

        <InputTextLabel
          label="Visa per pax (SAR)"
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          prefix="SAR"
          placeholder="500"
          error={errors.visaPerPax?.message}
          {...register("visaPerPax", { valueAsNumber: true })}
        />

        <InputTextLabel
          label="Transport total (SAR)"
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          prefix="SAR"
          placeholder="2000"
          error={errors.transportTotal?.message}
          {...register("transportTotal", { valueAsNumber: true })}
        />

        <InputTextLabel
          label="Tiket pesawat per pax (IDR)"
          type="number"
          inputMode="numeric"
          min={0}
          step={100000}
          prefix="Rp"
          placeholder="13000000"
          error={errors.tiketPerPax?.message}
          {...register("tiketPerPax", { valueAsNumber: true })}
        />

        <InputTextLabel
          label="Margin per pax (IDR)"
          type="number"
          inputMode="numeric"
          min={0}
          step={100000}
          prefix="Rp"
          placeholder="1000000"
          error={errors.marginPerPax?.message}
          {...register("marginPerPax", { valueAsNumber: true })}
        />

        <div className="self-end">
          <Checkbox
            label="Terapkan pajak hotel dari data API"
            error={errors.applyHotelTax?.message}
            {...register("applyHotelTax")}
          />
        </div>
      </div>
    </section>
  );
}
