import type { z } from "zod";

import type { hotelSearchSchema } from "../schemas/hotel-search.schema";

export type HotelSearchFormValues = z.infer<typeof hotelSearchSchema>;

export type HotelSearchFieldErrors = Partial<
  Record<keyof HotelSearchFormValues, string>
>;
