"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatSAR } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";
import type { HotelResultItem } from "../types/hotel-results.types";
import type { Hotel } from "@/types/common.types";

export interface HotelCardProps {
  item: HotelResultItem;
  pax: number;
  onSelect: (hotel: Hotel) => void;
}

export function HotelCard({ item, pax, onSelect }: HotelCardProps) {
  const { hotel, rooms, nights, baseSAR, taxSAR, totalSAR, perPaxSAR } = item;

  return (
    <Card className="flex flex-col p-5 transition hover:border-emerald-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">{hotel.name}</h3>
          <p className="flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {hotel.city} · {hotel.area}
          </p>
        </div>
        <Badge tone="success">
          <Star className="h-3 w-3 fill-current" aria-hidden="true" />
          {hotel.rating.toFixed(1)}
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge tone="info">Bintang {hotel.star}</Badge>
        {hotel.amenities.slice(0, 3).map((amenity) => (
          <Badge key={amenity}>{amenity}</Badge>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-2xl font-black text-slate-900">
            {formatSAR(hotel.pricePerRoomPerNight)}
          </span>
          <span className="text-xs text-slate-500">/ room / night</span>
        </div>

        <dl className="mt-3 space-y-1 text-sm text-slate-600">
          <div className="flex justify-between gap-2">
            <dt>
              {rooms} kamar × {nights} malam × {formatSAR(hotel.pricePerRoomPerNight)}
            </dt>
            <dd className="font-medium text-slate-800">{formatSAR(baseSAR)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Pajak hotel {hotel.taxPercent}%</dt>
            <dd className="font-medium text-slate-800">{formatSAR(taxSAR)}</dd>
          </div>
          <div className="flex justify-between gap-2 border-t border-slate-200 pt-1">
            <dt className="font-semibold text-slate-800">Total hotel</dt>
            <dd className="font-bold text-emerald-700">{formatSAR(totalSAR)}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt>Per jamaah ({pax} pax)</dt>
            <dd className="font-medium text-slate-800">{formatSAR(perPaxSAR)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 flex-1" />

      <Button className="w-full" size="md" onClick={() => onSelect(hotel)}>
        PILIH HOTEL
      </Button>
    </Card>
  );
}
