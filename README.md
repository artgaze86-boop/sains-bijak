# Sains Tahun 1–6 Bijak

Aplikasi pembelajaran Sains KSSR yang menyeronokkan untuk murid Tahun 1 hingga Tahun 6 di Malaysia. Dibangunkan dengan **Expo (iOS & Android)**, **Node.js API**, dan **Panel Admin** web.

## Ciri Utama

- **6 Tahun Persekolahan** — 63 topik Sains KSSR (Tahun 1–6)
- **Nota Ringkas** — Penjelasan mudah, perkataan penting, fakta menarik
- **Kuiz Interaktif** — 630 soalan (10 per topik), 7 jenis soalan, sistem bintang
- **Eksperimen Mudah** — Aktiviti selamat dengan pengawasan dewasa
- **Permainan Sains** — Padankan Haiwan, Susun Planet, Kuiz Pantas, dan lain-lain
- **Kad Imbas** — Perbendaharaan kata & fakta dengan audio
- **Kemajuan & Lencana** — Penjejakan topik, skor, bintang, lencana pencapaian
- **Ibu Bapa & Guru** — Dashboard kemajuan murid, kelas, tugasan
- **Panel Admin** — CRUD kandungan, pengguna, analitik
- **Luar Talian** — Nota, kad imbas & kuiz tersimpan secara tempatan
- **Aksesibiliti** — Teks besar, kontras tinggi, fon mesra disleksia, audio

## Struktur Projek

```
sains-tahun-1-6-bijak/
├── mobile/     # Aplikasi Expo (iOS + Android)
├── backend/    # API Express + Prisma + SQLite
├── admin/      # Panel pentadbir (Vite + React)
└── README.md
```

## Keperluan Sistem

- Node.js 20+ (LTS)
- npm
- Untuk Android: Android Studio / Expo Go
- Untuk iOS: Xcode / Expo Go (macOS)

## Persediaan Pantas

### 1. Pasang semua kebergantungan

```bash
cd sains-tahun-1-6-bijak
npm run install:all
```

### 2. Sediakan pangkalan data

```bash
cd backend
cp .env.example .env
npm run db:push
npm run db:seed
```

### 3. Jalankan pelayan API

```bash
npm run dev
# API: http://localhost:3001
```

### 4. Jalankan panel admin

```bash
cd ../admin
npm run dev
# Admin: http://localhost:5173
```

### 5. Jalankan aplikasi mudah alih

```bash
cd ../mobile
npx expo start
```

Imbas kod QR dengan **Expo Go** (Android/iOS) atau tekan `a` untuk emulator Android.

> **Nota:** Untuk peranti fizikal, tukar `API_BASE_URL` dalam `mobile/src/services/api.ts` kepada alamat IP komputer anda (contoh: `http://192.168.1.10:3001/api`).

## Akaun Lalai

| Peranan | E-mel | Kata Laluan |
|---------|-------|-------------|
| Admin | admin@sainsbijak.my | admin123 |
| Murid | murid@sainsbijak.my | murid123 |
| Guru | guru@sainsbijak.my | guru123 |
| Ibu Bapa | ibu@sainsbijak.my | ibu123 |

## API Utama

| Endpoint | Keterangan |
|----------|------------|
| `GET /api/health` | Status pelayan |
| `POST /api/auth/login` | Log masuk |
| `GET /api/content/year-levels` | Senarai tahun |
| `GET /api/content/topics?year=1` | Topik mengikut tahun |
| `GET /api/content/topics/:slug/notes` | Nota topik |
| `GET /api/content/quizzes/:id` | Soalan kuiz |
| `POST /api/progress/quiz-attempts` | Hantar jawapan kuiz |
| `GET /api/admin/analytics` | Analitik (admin) |

## Sistem Bintang Kuiz

| Bintang | Skor |
|---------|------|
| ⭐ | 40% ke atas |
| ⭐⭐ | 70% ke atas |
| ⭐⭐⭐ | 90% ke atas |

## Monetisasi (Pilihan)

- Topik sampel percuma (`isFreeSample: true`)
- Langganan premium ibu bapa / lesen sekolah melalui medan `isPremium`
- Tiada iklan mengganggu untuk kanak-kanak

## Penerbitan Production

### Android (Google Play)

```bash
cd mobile
npx expo prebuild
eas build --platform android
```

### iOS (App Store)

```bash
cd mobile
eas build --platform ios
```

### Backend

Gunakan PostgreSQL (tukar `provider` dalam `prisma/schema.prisma`) dan deploy ke Railway, Render, atau VPS.

## Keselamatan Eksperimen

Semua eksperimen direka untuk kanak-kanak dengan bahan selamat. Setiap eksperimen termasuk:

> *"Lakukan aktiviti ini dengan pengawasan ibu bapa atau guru."*

## Lesen

MIT — Kandungan pendidikan asal, diilhamkan oleh silibus KSSR Malaysia.