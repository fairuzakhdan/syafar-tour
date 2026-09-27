"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatSAR } from "@/lib/utils";
import type { Hotel, SearchMeta } from "@/types/common.types";
import { Building2, Star } from "lucide-react";

export interface SelectedHotelProps {
  hotel: Hotel;
  meta: SearchMeta;
  rooms: number;
}

export function SelectedHotel({ hotel, meta, rooms }: SelectedHotelProps) {
  return (
    <Card className="border-emerald-200 bg-emerald-50/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            <Building2 className="h-3.5 w-3.5" />
            Hotel dipilih
          </p>
          <h3 className="mt-1 text-base font-bold text-slate-900">{hotel.name}</h3>
          <p className="text-sm text-slate-500">
            {hotel.city} · {hotel.area}
          </p>
        </div>
        <Badge tone="success">
          <Star className="h-3 w-3 fill-current" />
          {hotel.rating.toFixed(1)}
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <div className="rounded-lg bg-white p-2 text-center">
          <p className="text-xs text-slate-500">Rate</p>
          <p className="font-semibold text-slate-900">
            {formatSAR(hotel.pricePerRoomPerNight)}
          </p>
        </div>
        <div className="rounded-lg bg-white p-2 text-center">
          <p className="text-xs text-slate-500">Kamar</p>
          <p className="font-semibold text-slate-900">{rooms}</p>
        </div>
        <div className="rounded-lg bg-white p-2 text-center">
          <p className="text-xs text-slate-500">Malam</p>
          <p className="font-semibold text-slate-900">{meta.nights}</p>
        </div>
        <div className="rounded-lg bg-white p-2 text-center">
          <p className="text-xs text-slate-500">Jamaah</p>
          <p className="font-semibold text-slate-900">{meta.pax}</p>
        </div>
      </div>
    </Card>
  );
}
