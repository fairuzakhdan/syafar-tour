import type { Hotel } from "@/types/common.types";

/**
 * Mock data Trip.com (dummy supplier).
 * `taxPercent` disimpan per hotel supaya tingkat pajak datang dari data API,
 * bukan dari hardcode di sisi kalkulasi.
 */
export const HOTELS: Hotel[] = [
  {
    id: "fairmont-makkah",
    name: "Fairmont Makkah",
    city: "Makkah",
    area: "King Abdul Aziz Road",
    pricePerRoomPerNight: 1500,
    taxPercent: 15,
    currency: "SAR",
    rating: 9.2,
    star: 5,
    amenities: ["Haram view", "Sarapan", "Wi-Fi", "Kolam renang"],
  },
  {
    id: "pullman-zamzam-makkah",
    name: "Pullman Zamzam Makkah",
    city: "Makkah",
    area: "Ibrahim Al Khalil Street",
    pricePerRoomPerNight: 1100,
    taxPercent: 15,
    currency: "SAR",
    rating: 8.8,
    star: 5,
    amenities: ["Dekat Haram", "Sarapan", "Wi-Fi", "Gym"],
  },
  {
    id: "movenpick-makkah",
    name: "Movenpick Makkah",
    city: "Makkah",
    area: "Ajyad Street",
    pricePerRoomPerNight: 1250,
    taxPercent: 15,
    currency: "SAR",
    rating: 8.6,
    star: 5,
    amenities: ["Haram view", "Sarapan", "Wi-Fi", "Restoran"],
  },
  {
    id: "anwar-al-madinah-movenpick",
    name: "Anwar Al Madinah Movenpick",
    city: "Madinah",
    area: "Prince Mohammad Bin Abdulaziz Road",
    pricePerRoomPerNight: 900,
    taxPercent: 15,
    currency: "SAR",
    rating: 8.7,
    star: 5,
    amenities: ["Dekat Nabawi", "Sarapan", "Wi-Fi", "Business center"],
  },
  {
    id: "emaar-royal-madinah",
    name: "Emaar Royal Madinah",
    city: "Madinah",
    area: "Package 3, Madinah",
    pricePerRoomPerNight: 650,
    taxPercent: 15,
    currency: "SAR",
    rating: 8.3,
    star: 4,
    amenities: ["Dekat Nabawi", "Sarapan", "Wi-Fi", "Parkir"],
  },
];
