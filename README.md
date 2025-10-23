# 👟 API Cuci Sepatu

REST API sederhana untuk mengelola layanan daftar barang cuci sepatu menggunakan Node.js, Express.js, dan Supabase.

## 📋 Deskripsi Proyek

API ini dibuat untuk mengelola data sepatu yang sedang dalam proses pencucian. API menyediakan fitur CRUD (Create, Read, Update, Delete) lengkap dan mendukung filter berdasarkan status pencucian.

## ✨ Fitur Utama

- ✅ Create - Menambah data sepatu baru
- ✅ Read - Melihat semua data atau detail spesifik
- ✅ Update - Mengubah data sepatu yang ada
- ✅ Delete - Menghapus data sepatu
- ✅ Filter - Mencari sepatu berdasarkan status (Proses, Selesai, dll)
- ✅ RESTful API design
- ✅ Error handling yang baik
- ✅ Validasi input data

## 🗄️ Struktur Data

Setiap item sepatu memiliki struktur data sebagai berikut:

| Field | Tipe | Deskripsi | Required |
|-------|------|-----------|----------|
| id | integer | ID unik (auto-generated) | Auto |
| nama_pelanggan | string | Nama pemilik sepatu | Ya |
| jenis_sepatu | string | Jenis/tipe sepatu | Ya |
| layanan | string | Jenis layanan (Deep Clean, Fast Clean, dll) | Ya |
| status | string | Status pencucian (Proses, Selesai, Pending) | Ya |
| harga | integer | Harga layanan dalam Rupiah | Ya |
| tanggal_masuk | timestamp | Tanggal sepatu masuk | Auto |
| created_at | timestamp | Waktu data dibuat | Auto |

### Contoh Struktur Tabel Supabase (SQL):

```sql
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
```

## 🔌 Endpoints API

### 1. Get All Items
```http
GET /items
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "nama_pelanggan": "Budi Santoso",
      "jenis_sepatu": "Nike Air Max",
      "layanan": "Deep Clean",
      "status": "Selesai",
      "harga": 50000,
      "tanggal_masuk": "2025-10-20T10:00:00Z",
      "created_at": "2025-10-20T10:00:00Z"
    }
  ]
}
```

### 2. Get Items by Status (Filter)
```http
GET /items?status=Selesai
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "nama_pelanggan": "Budi Santoso",
      "status": "Selesai",
      ...
    }
  ]
}
```

### 3. Get Item by ID
```http
GET /items/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama_pelanggan": "Budi Santoso",
    "jenis_sepatu": "Nike Air Max",
    ...
  }
}
```

### 4. Create New Item
```http
POST /items
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

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil ditambahkan",
  "data": {
    "id": 2,
    "nama_pelanggan": "Andi Wijaya",
    ...
  }
}
```

### 5. Update Item
```http
PUT /items/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "Selesai",
  "harga": 40000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil diupdate",
  "data": {
    "id": 2,
    "status": "Selesai",
    ...
  }
}
```

### 6. Delete Item
```http
DELETE /items/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Data sepatu berhasil dihapus",
  "data": {
    "id": 2,
    ...
  }
}
```

## 🚀 Instalasi dan Cara Menjalankan

### Prerequisites
- Node.js (v18 atau lebih baru)
- Akun Supabase
- Akun Vercel (untuk deploy)

### Langkah-langkah:

1. **Clone repository**
```bash
git clone https://github.com/username/api-cuci-sepatu.git
cd api-cuci-sepatu
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Supabase**
   - Buat project baru di [Supabase](https://supabase.com)
   - Buat tabel `sepatu` menggunakan SQL di atas
   - Copy URL dan Anon Key dari Settings > API

4. **Setup Environment Variables**
```bash
cp .env.example .env
```

Edit file `.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
PORT=3000
```

5. **Jalankan di Local**
```bash
# Development mode (dengan auto-reload)
npm run dev

# Production mode
npm start
```

API akan berjalan di `http://localhost:3000`

## 🌐 Deploy ke Vercel

### Cara 1: Via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login ke Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Setup Environment Variables di Vercel**
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_KEY
```

### Cara 2: Via GitHub Integration

1. Push code ke GitHub
2. Import project di [Vercel Dashboard](https://vercel.com/dashboard)
3. Tambahkan environment variables di Settings > Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
4. Deploy!

## 🧪 Testing API

### Menggunakan cURL:

```bash
# Create
curl -X POST https://your-api.vercel.app/items \
  -H "Content-Type: application/json" \
  -d '{
    "nama_pelanggan": "Test User",
    "jenis_sepatu": "Converse",
    "layanan": "Deep Clean",
    "status": "Proses",
    "harga": 45000
  }'

# Read All
curl https://your-api.vercel.app/items

# Read with Filter
curl https://your-api.vercel.app/items?status=Selesai

# Update
curl -X PUT https://your-api.vercel.app/items/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "Selesai"}'

# Delete
curl -X DELETE https://your-api.vercel.app/items/1
```

### Menggunakan Postman atau Thunder Client:
Import collection dan test semua endpoints dengan mudah.

## 📦 Struktur Folder

```
api-cuci-sepatu/
├── api/
│   └── index.js          # Main API file
├── .env                  # Environment variables (jangan di-commit!)
├── .env.example          # Template environment variables
├── .gitignore           # File yang diabaikan Git
├── package.json         # Dependencies dan scripts
├── vercel.json          # Konfigurasi Vercel
└── README.md            # Dokumentasi ini
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Version Control**: Git & GitHub

## 📚 Referensi

- [Express.js Documentation](https://expressjs.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Contoh Implementasi Responsi](https://github.com/princeofverry/responsi-ppb)

## 🔗 Links

- **GitHub Repository**: [https://github.com/username/api-cuci-sepatu](https://github.com/username/api-cuci-sepatu)
- **Live API**: [https://api-cuci-sepatu.vercel.app](https://api-cuci-sepatu.vercel.app)

## 👨‍💻 Author

**Your Name**
- GitHub: [@username](https://github.com/username)

## 📝 License

MIT License - bebas digunakan untuk keperluan belajar dan komersial.

---

⭐ Jangan lupa berikan star jika project ini membantu!