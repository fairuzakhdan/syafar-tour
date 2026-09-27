import { z } from "zod";

/**
 * Input quotation. Semua angka wajib diisi dan tidak boleh negatif.
 * Kurs juga tidak boleh 0 karena membagi nol pada konversi SAR → IDR.
 */
export const quotationSchema = z.object({
  kurs: z
    .number({ error: "Kurs wajib diisi." })
    .min(0, "Kurs tidak boleh negatif.")
    .refine((value) => value > 0, "Kurs tidak boleh 0."),
  visaPerPax: z
    .number({ error: "Visa per pax wajib diisi." })
    .min(0, "Harga tidak boleh negatif."),
  transportTotal: z
    .number({ error: "Transport total wajib diisi." })
    .min(0, "Harga tidak boleh negatif."),
  tiketPerPax: z
    .number({ error: "Tiket pesawat wajib diisi." })
    .min(0, "Harga tidak boleh negatif."),
  marginPerPax: z
    .number({ error: "Margin wajib diisi." })
    .min(0, "Margin tidak boleh negatif."),
  applyHotelTax: z.boolean(),
});
