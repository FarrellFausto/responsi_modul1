# API Cuci Sepatu

REST API sederhana untuk mengelola layanan daftar barang cuci sepatu menggunakan Node.js, Express.js, dan Supabase.

## Deskripsi Proyek

API ini dibuat untuk mengelola data sepatu yang sedang dalam proses pencucian. API menyediakan fitur CRUD (Create, Read, Update, Delete) lengkap dan mendukung filter berdasarkan status pencucian seperti "Proses", "Selesai", atau "Pending".

## Fitur Utama

- Create - Menambah data sepatu baru ke dalam sistem
- Read - Melihat semua data sepatu atau detail spesifik berdasarkan ID
- Update - Mengubah informasi sepatu yang sudah ada
- Delete - Menghapus data sepatu dari sistem
- Filter - Mencari sepatu berdasarkan status pencucian
- RESTful API design dengan response JSON
- Error handling yang proper
- Validasi input data untuk mencegah data tidak valid

## Struktur Data

Setiap item sepatu dalam database memiliki struktur data sebagai berikut:

| Field | Tipe | Deskripsi | Required |
|-------|------|-----------|----------|
| id | integer | ID unik untuk setiap sepatu (auto-generated) | Auto |
| nama_pelanggan | string | Nama pemilik sepatu | Ya |
| jenis_sepatu | string | Jenis atau tipe sepatu (misal: Nike Air Max) | Ya |
| layanan | string | Jenis layanan yang dipilih (Deep Clean, Fast Clean, dll) | Ya |
| status | string | Status proses pencucian (Proses, Selesai, Pending) | Ya |
| harga | integer | Harga layanan dalam Rupiah | Ya |
| tanggal_masuk | timestamp | Tanggal dan waktu sepatu masuk | Auto |
| created_at | timestamp | Waktu data dibuat di database | Auto |

### SQL untuk Membuat Tabel di Supabase

```sql
-- Membuat tabel sepatu
CREATE TABLE sepatu (
  id BIGSERIAL PRIMARY KEY,
  nama_pelanggan VARCHAR(255) NOT NULL,
  jenis_sepatu VARCHAR(255) NOT NULL,
  layanan VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  harga INTEGER NOT NULL,
  tanggal_masuk TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert data sample untuk testing
INSERT INTO sepatu (nama_pelanggan, jenis_sepatu, layanan, status, harga) VALUES
('Budi Santoso', 'Nike Air Max', 'Deep Clean', 'Selesai', 50000),
('Ani Wijaya', 'Adidas Ultraboost', 'Fast Clean', 'Proses', 35000),
('Doni Pratama', 'Converse Chuck Taylor', 'Deep Clean', 'Pending', 45000);
```

## Dokumentasi API Endpoints

### 1. Mengambil Semua Data Sepatu

Endpoint untuk mengambil semua data sepatu yang ada dalam database.

**Request:**
```http
GET https://responsi-modul1.vercel.app/items
```

**Response Sukses (200 OK):**
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": 1,
            "nama_pelanggan": "Budi Santoso",
            "jenis_sepatu": "Nike Air Max",
            "layanan": "Deep Clean",
            "status": "Selesai",
            "harga": 50000,
            "tanggal_masuk": "2025-10-23T04:36:25.788606",
            "created_at": "2025-10-23T04:36:25.788606"
        },
        {
            "id": 2,
            "nama_pelanggan": "Ani Wijaya",
            "jenis_sepatu": "Adidas Ultraboost",
            "layanan": "Fast Clean",
            "status": "Proses",
            "harga": 35000,
            "tanggal_masuk": "2025-10-23T04:36:25.788606",
            "created_at": "2025-10-23T04:36:25.788606"
        },
        {
            "id": 3,
            "nama_pelanggan": "Doni Pratama",
            "jenis_sepatu": "Converse Chuck Taylor",
            "layanan": "Deep Clean",
            "status": "Pending",
            "harga": 45000,
            "tanggal_masuk": "2025-10-23T04:36:25.788606",
            "created_at": "2025-10-23T04:36:25.788606"
        }
    ]
```

### 2. Filter Data Berdasarkan Status

Endpoint untuk mencari sepatu dengan status tertentu menggunakan query parameter.

**Request:**
```http
GET https://responsi-modul1.vercel.app/items?status=Selesai
```

**Response Sukses (200 OK):**
```json
{
    "success": true,
    "count": 1,
    "data": [
        {
            "id": 1,
            "nama_pelanggan": "Budi Santoso",
            "jenis_sepatu": "Nike Air Max",
            "layanan": "Deep Clean",
            "status": "Selesai",
            "harga": 50000,
            "tanggal_masuk": "2025-10-23T04:36:25.788606",
            "created_at": "2025-10-23T04:36:25.788606"
        }
    ]
}
```

**Contoh Status yang Bisa Digunakan:**
- `Proses` - Sepatu sedang dalam proses pencucian
- `Selesai` - Sepatu sudah selesai dicuci
- `Pending` - Sepatu menunggu untuk diproses

### 3. Mengambil Detail Sepatu Berdasarkan ID

Endpoint untuk mendapatkan informasi detail satu sepatu berdasarkan ID-nya.

**Request:**
```http
GET /items/:id
```

**Contoh:**
```http
GET https://responsi-modul1.vercel.app/items/2
```

**Response Sukses (200 OK):**
```json
{
    "success": true,
    "data": {
        "id": 2,
        "nama_pelanggan": "Ani Wijaya",
        "jenis_sepatu": "Adidas Ultraboost",
        "layanan": "Fast Clean",
        "status": "Proses",
        "harga": 35000,
        "tanggal_masuk": "2025-10-23T04:36:25.788606",
        "created_at": "2025-10-23T04:36:25.788606"
    }
}
```

**Response Error - Data Tidak Ditemukan (404 Not Found):**
```json
{
  "success": false,
  "error": "Data tidak ditemukan"
}
```

### 4. Menambah Data Sepatu Baru

Endpoint untuk menambahkan data sepatu baru ke dalam sistem.

**Request:**
```http
POST https://responsi-modul1.vercel.app/items
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama_pelanggan": "Andi Wijaya",
  "jenis_sepatu": "Adidas Ultraboost",
  "layanan": "Fast Clean",
  "status": "Proses",
  "harga": 35000
}
```

**Response Sukses (201 Created):**
```json
{
    "success": true,
    "message": "Data sepatu berhasil ditambahkan",
    "data": {
        "id": 4,
        "nama_pelanggan": "Andi Wijaya",
        "jenis_sepatu": "Adidas Ultraboost",
        "layanan": "Fast Clean",
        "status": "Proses",
        "harga": 35000,
        "tanggal_masuk": "2025-10-23T05:25:35.208",
        "created_at": "2025-10-23T05:25:35.862295"
    }
}
```

**Response Error - Data Tidak Lengkap (400 Bad Request):**
```json
{
  "error": "Data tidak lengkap",
  "required": [
    "nama_pelanggan",
    "jenis_sepatu",
    "layanan",
    "status",
    "harga"
  ]
}
```

### 5. Mengupdate Data Sepatu

Endpoint untuk mengubah informasi sepatu yang sudah ada. Anda bisa mengupdate sebagian field saja tanpa harus mengirim semua field.

**Request:**
```http
PUT /items/:id
Content-Type: application/json
```

**Contoh:**
```http
PUT https://responsi-modul1.vercel.app/items/3
```

**Request Body (bisa update beberapa field saja):**
```json
{
  "status": "Selesai",
  "harga": 45000
}
```

**Response Sukses (200 OK):**
```json
{
    "success": true,
    "message": "Data sepatu berhasil diupdate",
    "data": {
        "id": 3,
        "nama_pelanggan": "Doni Pratama",
        "jenis_sepatu": "Converse Chuck Taylor",
        "layanan": "Deep Clean",
        "status": "Selesai",
        "harga": 45000,
        "tanggal_masuk": "2025-10-23T04:36:25.788606",
        "created_at": "2025-10-23T04:36:25.788606"
    }
}
```

**Response Error - Data Tidak Ditemukan (404 Not Found):**
```json
{
  "success": false,
  "error": "Data tidak ditemukan"
}
```

### 6. Menghapus Data Sepatu

Endpoint untuk menghapus data sepatu dari sistem.

**Request:**
```http
DELETE /items/:id
```

**Contoh:**
```http
DELETE /items/2
```

**Response Sukses (200 OK):**
```json
{{
    "success": true,
    "message": "Data sepatu berhasil dihapus",
    "data": {
        "id": 3,
        "nama_pelanggan": "Doni Pratama",
        "jenis_sepatu": "Converse Chuck Taylor",
        "layanan": "Deep Clean",
        "status": "Selesai",
        "harga": 45000,
        "tanggal_masuk": "2025-10-23T04:36:25.788606",
        "created_at": "2025-10-23T04:36:25.788606"
    }
}
```

**Response Error - Data Tidak Ditemukan (404 Not Found):**
```json
{
  "success": false,
  "error": "Data tidak ditemukan"
}
```

## Cara Instalasi dan Menjalankan Project

### Kebutuhan Sistem

Sebelum memulai, pastikan sudah terinstall:
- Node.js versi 18 atau lebih baru
- npm 
- Git untuk version control
- Akun Supabase 
- Akun Vercel 

### Langkah-langkah Instalasi

**1. Clone repository ini**
```bash
git clone https://github.com/username/api-cuci-sepatu.git
cd api-cuci-sepatu
```

**2. Install dependencies**
```bash
npm install
```

Ini akan menginstall semua package yang dibutuhkan seperti Express, Supabase client, dotenv, dan lainnya.

**3. Setup Database Supabase**

a. Buat project baru di [Supabase](https://supabase.com)

b. Buat tabel menggunakan SQL Editor dengan menjalankan query berikut:
```sql
-- Membuat tabel sepatu
CREATE TABLE sepatu (
  id BIGSERIAL PRIMARY KEY,
  nama_pelanggan VARCHAR(255) NOT NULL,
  jenis_sepatu VARCHAR(255) NOT NULL,
  layanan VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  harga INTEGER NOT NULL,
  tanggal_masuk TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert data sample untuk testing
INSERT INTO sepatu (nama_pelanggan, jenis_sepatu, layanan, status, harga) VALUES
('Budi Santoso', 'Nike Air Max', 'Deep Clean', 'Selesai', 50000),
('Ani Wijaya', 'Adidas Ultraboost', 'Fast Clean', 'Proses', 35000),
('Doni Pratama', 'Converse Chuck Taylor', 'Deep Clean', 'Pending', 45000);
```

c. Copy URL Project dan Anon Key dari Settings → API

**4. Konfigurasi Environment Variables**

Buat file `.env` di root folder project:
```bash
cp .env.example .env
```

Edit file `.env` dan isi dengan credentials Supabase:
```env
SUPABASE_URL=https://aquiieekkgwsemmrudii.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdWlpZWVra2d3c2VtbXJ1ZGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExOTAyMDEsImV4cCI6MjA3Njc2NjIwMX0.2CGM1aB6mqO3leknkcTLB841Z1GwpHMODcLPYZNJ7f0
PORT=3000
NODE_ENV=development
```

Ganti `your-project.supabase.co` dan `your-anon-key-here` dengan kredensial dari Supabase Anda.

**5. Jalankan server development**
```bash
npm run dev
```

Jika berhasil, akan muncul pesan:
```
Server berjalan di http://localhost:3000
```

**6. Test API**

Buka browser dan akses:
- `http://localhost:3000` - untuk melihat welcome message
- `http://localhost:3000/items` - untuk melihat semua data sepatu

## Deploy ke Vercel

### Persiapan Deploy

**1. Push code ke GitHub**

Pastikan code sudah di-push ke GitHub repository.

**2. Login ke Vercel**

Buka [vercel.com](https://vercel.com) dan login menggunakan akun GitHub.

**3. Import Project**

- Klik "Add New..." → "Project"
- Pilih repository `responsi_modul1`
- Klik "Import"

**4. Configure Project**

Di halaman konfigurasi:
- Framework Preset: pilih "Other"
- Root Directory: biarkan default `./`
- Build Settings: biarkan default

**5. Tambahkan Environment Variables**

Klik "Environment Variables" dan tambahkan:
- `SUPABASE_URL` → URL project Supabase 
- `SUPABASE_KEY` → Anon key dari Supabase
- `NODE_ENV` → `production`

**6. Deploy**

Klik tombol "Deploy" dan tunggu proses selesai (sekitar 1-2 menit).

Setelah selesai, Anda akan mendapatkan URL production seperti:
```
https://responsi-modul1.vercel.app/
```

### Verifikasi Deployment

Test API production dengan mengakses:
```
https://responsi-modul1.vercel.app/items
```

Jika berhasil, akan menampilkan data sepatu dari database.

## Testing API

### Menggunakan postman

**Get All Items:**
```bash
https://responsi-modul1.vercel.app/items
```

**Get Items by Status:**
```bash
https://responsi-modul1.vercel.app/items?status=Selesai
```

**Create New Item:**
```bash
curl -X POST https://responsi-modul1.vercel.app/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_pelanggan": "Test User",
    "jenis_sepatu": "Converse",
    "layanan": "Deep Clean",
    "status": "Proses",
    "harga": 45000
  }'
```

**Update Item:**
```bash
curl -X PUT https://responsi-modul1.vercel.app/items/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "Selesai"}'
```

**Delete Item:**
```bash
curl -X DELETE https://responsi-modul1.vercel.app/items/1
```

## Struktur Folder Project

```
api-cuci-sepatu/
├── api/
│   └── index.js          # File utama API dengan semua endpoint
├── node_modules/         # Dependencies (auto-generated, tidak di-commit)
├── .env                  # Template environment variables
├── .gitignore           # File yang diabaikan oleh Git
├── package.json         # Konfigurasi project dan dependencies
├── package-lock.json    # Lock file untuk dependencies (auto-generated)
├── vercel.json          # Konfigurasi deployment Vercel
└── README.md            # Dokumentasi project (file ini)
```

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: Express.js untuk membuat REST API
- **Database**: Supabase (PostgreSQL) untuk menyimpan data
- **Deployment**: Vercel untuk hosting API
- **Version Control**: Git dan GitHub

## Link Project

- **GitHub Repository**: https://github.com/FarrellFausto/responsi_modul1
- **Live API**: https://responsi-modul1.vercel.app/

## Author

**Dibuat Oleh**
- Nama: Farrell Farros Fausto
- Kelompok: 42 Prak PPB
   
