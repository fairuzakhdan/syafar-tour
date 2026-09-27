# Syafar Tour — Hotel Rate Aggregator & Quotation Engine

Mini aplikasi untuk mencari harga hotel **Makkah/Madinah** dari mock Trip.com API, lalu menghitung estimasi biaya hotel per jamaah (quotation). Dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS — tanpa database.

**Alur utama:** Search Hotel → Pilih Hotel → Hitung Quotation → Simpan (History)

## Fitur

- **Pencarian hotel** — kota (Makkah/Madinah), check-in & check-out, jumlah jamaah, tipe kamar (Double/Triple/Quad)
- **Hasil pencarian** — filter harga, cari nama hotel, urutkan (termurah/termahal/rating), loading skeleton, error state dengan tombol coba lagi
- **Quotation otomatis** — jumlah kamar selalu dibulatkan ke atas, pajak hotel 15% dari data API (opsional via checkbox), konversi SAR → IDR, total cost & harga jual per pax
- **History quotation** — simpan ke browser (localStorage), halaman History untuk memuat/menghapus; satu entri per hotel & periode
- **UX** — responsif desktop & mobile, drawer transisi halus, notifikasi "tersimpan", halaman 404 kustom

## Cara Menjalankan

Prasyarat: **Node.js 20+** dan npm.

```bash
npm install
npm run dev
```

Buka **http://localhost:3000**

Perintah lain:

```bash
npm run build   # build produksi
npm start       # jalankan hasil build
npm run lint    # periksa kode dengan ESLint
```

> Tidak perlu environment variable, API key, atau database.

## Mock API

```
GET /api/hotels?city=Makkah&checkIn=2026-11-10&checkOut=2026-11-14&pax=8&roomType=Quad
```

- Mengembalikan 5 hotel dummy: Fairmont Makkah (1.500 SAR), Pullman Zamzam (1.100), Movenpick (1.250), Anwar Al Madinah Movenpick (900), Emaar Royal Madinah (650)
- Respons ±700 ms (`MOCK_API_DELAY_MS`) untuk mensimulasikan jaringan
- Input tidak valid → `400` dengan pesan error; tambahkan **`&fail=1`** untuk mensimulasikan API gagal (`500`)

## Struktur Proyek

```
app/                     # routing: / , /history , /api/hotels
                         # loading.tsx, error.tsx, not-found.tsx
features/
├── dashboard/           # seluruh alur utama
│   ├── components/      # DashboardView + search/ results/ quotation/
│   ├── hooks/           # useDashboard, useHotelSearch, useQuotation, ...
│   ├── actions/         # pencarian & kalkulasi (kamar, quotation, biaya)
│   ├── schemas/         # validasi Zod (form pencarian & quotation)
│   └── types/  lib/
└── history/             # daftar quotation tersimpan (muat/hapus)
components/layout/       # Header, Footer, Container
data/hotels.ts           # dummy data hotel + persentase pajak
```

`app/page.tsx` hanya merender `<DashboardView />` — logika berada di `useDashboard()`.

## Kalkulasi (contoh sesuai soal)

8 jamaah · Quad · 10–14 Nov 2026 (4 malam) · Fairmont 1.500 SAR:

```
Hotel       2 kamar × 4 malam × 1.500 SAR = 12.000 SAR
Visa        8 × 500 SAR                     =  4.000 SAR
Transport                                     =  2.000 SAR
Total SAR                                    = 18.000 SAR
Kurs Rp4.500 → Rp81.000.000
Tiket 8 × Rp13.000.000                      = Rp104.000.000
Total Cost                                  = Rp185.000.000
Cost/pax Rp23.125.000 + Margin Rp1.000.000
HARGA JUAL                                  = Rp24.125.000 / pax
```

Validasi: jamaah ≥ 1 · check-out setelah check-in · kurs > 0 · harga tidak negatif · hotel sesuai kota.

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · react-hook-form + Zod · lucide-react
