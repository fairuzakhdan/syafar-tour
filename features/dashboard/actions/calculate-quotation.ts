import { calculateHotelCost } from "./calculate-hotel-cost";
import { calculateNights } from "./calculate-nights";
import { calculateRooms } from "./calculate-rooms";
import type { QuotationInput, QuotationResult } from "@/features/dashboard/types/quotation.types";
import { toNumber } from "@/lib/utils";
import type { RoomType } from "@/types/common.types";

/** Semua nilai sudah dinormalkan menjadi angka sebelum dihitung. */
interface NormalizedInput {
  pax: number;
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  rooms: number;
  nights: number;
  pricePerRoomPerNight: number;
  taxPercent: number;
  kurs: number;
  visaPerPax: number;
  transportTotal: number;
  tiketPerPax: number;
  marginPerPax: number;
}

function roundSAR(value: number): number {
  return Math.round(value * 100) / 100;
}

function roundIDR(value: number): number {
  return Math.round(value);
}

function normalizeInput(input: QuotationInput): NormalizedInput {
  const { hotel, meta } = input;
  const pax = toNumber(meta.pax);

  return {
    pax,
    roomType: meta.roomType,
    checkIn: meta.checkIn,
    checkOut: meta.checkOut,
    rooms: calculateRooms(pax, meta.roomType),
    nights: calculateNights(meta.checkIn, meta.checkOut),
    pricePerRoomPerNight: toNumber(hotel.pricePerRoomPerNight),
    taxPercent: input.applyHotelTax ? toNumber(hotel.taxPercent) : 0,
    kurs: toNumber(input.kurs),
    visaPerPax: toNumber(input.visaPerPax),
    transportTotal: toNumber(input.transportTotal),
    tiketPerPax: toNumber(input.tiketPerPax),
    marginPerPax: toNumber(input.marginPerPax),
  };
}

function validateQuotation(values: NormalizedInput): string[] {
  const issues: string[] = [];

  if (values.pax <= 0) issues.push("Jumlah jamaah minimal 1 orang.");
  if (values.rooms <= 0) {
    issues.push("Jumlah kamar tidak valid untuk jumlah jamaah ini.");
  }
  if (values.nights <= 0) issues.push("Check-out harus setelah check-in.");
  if (values.kurs <= 0) issues.push("Kurs SAR ke IDR harus lebih dari 0.");

  const rawValues = [
    values.pricePerRoomPerNight,
    values.taxPercent,
    values.kurs,
    values.visaPerPax,
    values.transportTotal,
    values.tiketPerPax,
    values.marginPerPax,
  ];

  if (rawValues.some((value) => !Number.isFinite(value))) {
    issues.push("Ada input angka yang tidak valid.");
  }

  return issues;
}

/** Total dalam SAR: hotel + visa + transport. */
function calculateTotalSAR(values: NormalizedInput, hotelTotalSAR: number) {
  const visaSAR = values.pax * values.visaPerPax;
  const transportSAR = values.transportTotal;

  return {
    visaSAR,
    transportSAR,
    totalSAR: hotelTotalSAR + visaSAR + transportSAR,
  };
}

/** Konversi SAR → IDR, lalu turun ke cost per pax dan harga jual. */
function calculateIDR(values: NormalizedInput, totalSAR: number) {
  const sarToIdr = totalSAR * values.kurs;
  const tiketIdr = values.pax * values.tiketPerPax;
  const totalCostIdr = sarToIdr + tiketIdr;
  const costPerPaxIdr = values.pax > 0 ? totalCostIdr / values.pax : 0;

  return {
    sarToIdr,
    tiketIdr,
    totalCostIdr,
    costPerPaxIdr,
    sellingPriceIdr: costPerPaxIdr + values.marginPerPax,
  };
}

/**
 * Kalkulasi quotation lengkap (hotel → total SAR → IDR → harga jual per pax).
 * Urutan baca: normalisasi → validasi → hotel → SAR → IDR.
 * Pure function: tidak bergantung pada React sehingga mudah diuji.
 */
export function calculateQuotation(input: QuotationInput): QuotationResult {
  const values = normalizeInput(input);

  const issues = validateQuotation(values);
  const hotel = calculateHotelCost({
    rooms: values.rooms,
    nights: values.nights,
    pricePerRoomPerNight: values.pricePerRoomPerNight,
    taxPercent: values.taxPercent,
  });
  const sar = calculateTotalSAR(values, hotel.totalSAR);
  const idr = calculateIDR(values, sar.totalSAR);

  return {
    valid: issues.length === 0,
    issues,

    pax: values.pax,
    roomType: values.roomType,
    rooms: values.rooms,
    nights: values.nights,
    checkIn: values.checkIn,
    checkOut: values.checkOut,

    pricePerRoomPerNight: values.pricePerRoomPerNight,
    taxPercent: values.taxPercent,
    hotelBaseSAR: roundSAR(hotel.baseSAR),
    hotelTaxSAR: roundSAR(hotel.taxSAR),
    hotelTotalSAR: roundSAR(hotel.totalSAR),
    hotelPerPaxSAR:
      values.pax > 0 ? roundSAR(hotel.totalSAR / values.pax) : 0,

    visaPerPax: roundSAR(values.visaPerPax),
    visaSAR: roundSAR(sar.visaSAR),
    transportSAR: roundSAR(sar.transportSAR),
    totalSAR: roundSAR(sar.totalSAR),

    kurs: values.kurs,
    sarToIdr: roundIDR(idr.sarToIdr),
    tiketPerPax: roundIDR(values.tiketPerPax),
    tiketIdr: roundIDR(idr.tiketIdr),
    totalCostIdr: roundIDR(idr.totalCostIdr),
    costPerPaxIdr: roundIDR(idr.costPerPaxIdr),
    marginIdr: roundIDR(values.marginPerPax),
    sellingPriceIdr: roundIDR(idr.sellingPriceIdr),
  };
}
