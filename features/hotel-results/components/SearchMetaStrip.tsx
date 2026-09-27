import { Badge } from "@/components/ui/Badge";
import { BedDouble, CalendarDays, MapPin, Moon, Users } from "lucide-react";

import { ROOM_TYPES } from "@/lib/constants";
import { formatDateLabel } from "@/lib/utils";
import type { SearchMeta } from "@/types/common.types";

export interface SearchMetaStripProps {
  meta: SearchMeta;
}

/** Ringkasan parameter pencarian di atas daftar hotel. */
export function SearchMetaStrip({ meta }: SearchMetaStripProps) {
  const capacity = ROOM_TYPES[meta.roomType];

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Badge tone="accent">
        <MapPin className="h-3 w-3" />
        {meta.city}
      </Badge>
      <Badge>
        <CalendarDays className="h-3 w-3" />
        {formatDateLabel(meta.checkIn)} → {formatDateLabel(meta.checkOut)}
      </Badge>
      <Badge>
        <Moon className="h-3 w-3" />
        {meta.nights} malam
      </Badge>
      <Badge>
        <Users className="h-3 w-3" />
        {meta.pax} jamaah
      </Badge>
      <Badge>
        <BedDouble className="h-3 w-3" />
        {meta.roomType} ({capacity} / kamar)
      </Badge>
    </div>
  );
}
