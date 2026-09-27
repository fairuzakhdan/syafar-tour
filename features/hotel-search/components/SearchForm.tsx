"use client";

import { Search } from "lucide-react";
import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import {
  calculateRooms,
  getRoomCapacity,
} from "@/features/quotation/actions/calculate-rooms";
import { SearchFilters } from "./SearchFilters";
import type { UseHotelSearchReturn } from "../hooks/useHotelSearch";

export interface SearchFormProps {
  search: UseHotelSearchReturn;
  onSubmit: UseHotelSearchReturn["onSubmit"];
}

export function SearchForm({ search, onSubmit }: SearchFormProps) {
  const { form, isLoading } = search;

  const pax = form.watch("pax");
  const roomType = form.watch("roomType");
  const capacity = getRoomCapacity(roomType);
  const rooms = calculateRooms(pax, roomType);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <SearchFilters />

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Perkiraan kamar:{" "}
            <span className="font-semibold text-slate-800">
              {rooms > 0 ? `${rooms} kamar (${pax} jamaah / ${capacity} per kamar)` : "-"}
            </span>
          </p>

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            className="sm:w-auto w-full"
          >
            {isLoading ? (
              "MENCARI..."
            ) : (
              <>
                <Search className="h-4 w-4" aria-hidden="true" />
                CARI HOTEL
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
