"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatSAR } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";
import type { HotelResultItem } from "../types/hotel-results.types";
import type { Hotel } from "@/types/common.types";

export interface HotelListItemProps {
  item: HotelResultItem;
  onSelect: (hotel: Hotel) => void;
}

/** Versi ringkas untuk layar kecil. */
export function HotelListItem({ item, onSelect }: HotelListItemProps) {
  const { hotel, rooms, nights, totalSAR } = item;

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{hotel.name}</h3>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {hotel.city}
          </p>
        </div>
        <Badge tone="success">
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          {hotel.rating.toFixed(1)}
        </Badge>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-lg font-black text-slate-900">
            {formatSAR(hotel.pricePerRoomPerNight)}
          </p>
          <p className="text-xs text-slate-500">
            / room / night · {rooms} kamar × {nights} malam
          </p>
          <p className="text-xs font-semibold text-emerald-700">
            Total {formatSAR(totalSAR)}
          </p>
        </div>

        <Button size="sm" onClick={() => onSelect(hotel)}>
          PILIH HOTEL
        </Button>
      </div>
    </Card>
  );
}
