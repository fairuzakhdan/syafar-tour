import { z } from "zod";

import { MAX_PAX, MIN_PAX } from "@/lib/constants";

export const hotelSearchSchema = z
  .object({
    city: z.enum(["Makkah", "Madinah"], { error: "Pilih kota Makkah atau Madinah." }),
    checkIn: z
      .string({ error: "Check-in wajib diisi." })
      .refine((value) => Number.isFinite(Date.parse(value)), "Tanggal check-in tidak valid."),
    checkOut: z
      .string({ error: "Check-out wajib diisi." })
      .refine((value) => Number.isFinite(Date.parse(value)), "Tanggal check-out tidak valid."),
    pax: z
      .number({ error: "Jumlah jamaah wajib diisi." })
      .int("Jumlah jamaah harus bilangan bulat.")
      .min(MIN_PAX, `Jumlah jamaah minimal ${MIN_PAX} orang.`)
      .max(MAX_PAX, `Jumlah jamaah maksimal ${MAX_PAX} orang.`),
    roomType: z.enum(["Double", "Triple", "Quad"], {
      error: "Pilih tipe kamar Double, Triple, atau Quad.",
    }),
  })
  .refine((values) => Date.parse(values.checkOut) > Date.parse(values.checkIn), {
    error: "Check-out harus setelah check-in.",
    path: ["checkOut"],
  });
