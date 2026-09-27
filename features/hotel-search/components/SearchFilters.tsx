"use client";

import { BedDouble, CalendarDays, MapPin, Users } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { DatePicker } from "@/components/ui/DatePicker";
import { InputTextLabel } from "@/components/ui/field/InputTextLabel";
import { Select } from "@/components/ui/field/Select";
import { CITY_OPTIONS, ROOM_TYPE_OPTIONS } from "@/lib/constants";
import type { HotelSearchFormValues } from "../types/hotel-search.types";

/**
 * Field pencarian. Mengambil form dari context (FormProvider) milik SearchForm.
 */
export function SearchFilters() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelSearchFormValues>();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <div className="lg:col-span-1">
        <Select
          label="Kota"
          options={CITY_OPTIONS}
          icon={<MapPin className="h-4 w-4" />}
          error={errors.city?.message}
          {...register("city")}
        />
      </div>

      <div className="lg:col-span-1">
        <DatePicker
          label="Check-in"
          icon={<CalendarDays className="h-4 w-4" />}
          error={errors.checkIn?.message}
          {...register("checkIn")}
        />
      </div>

      <div className="lg:col-span-1">
        <DatePicker
          label="Check-out"
          icon={<CalendarDays className="h-4 w-4" />}
          error={errors.checkOut?.message}
          {...register("checkOut")}
        />
      </div>

      <div className="lg:col-span-1">
        <InputTextLabel
          label="Jumlah Jamaah"
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          placeholder="8"
          icon={<Users className="h-4 w-4" />}
          error={errors.pax?.message}
          {...register("pax", { valueAsNumber: true })}
        />
      </div>

      <div className="lg:col-span-2">
        <Select
          label="Tipe Kamar"
          options={ROOM_TYPE_OPTIONS}
          icon={<BedDouble className="h-4 w-4" />}
          error={errors.roomType?.message}
          {...register("roomType")}
        />
      </div>
    </div>
  );
}
