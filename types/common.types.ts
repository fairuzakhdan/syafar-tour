export type City = "Makkah" | "Madinah";

export type RoomType = "Double" | "Triple" | "Quad";

export type Currency = "SAR" | "IDR";

export interface Hotel {
  id: string;
  name: string;
  city: City;
  area: string;
  pricePerRoomPerNight: number;
  taxPercent: number;
  currency: Currency;
  rating: number;
  star: number;
  amenities: string[];
}

export interface SearchMeta {
  city: City;
  checkIn: string;
  checkOut: string;
  nights: number;
  pax: number;
  roomType: RoomType;
}

export interface HotelSearchPayload {
  meta: SearchMeta;
  hotels: Hotel[];
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type SearchStatus = "idle" | "loading" | "success" | "error";
