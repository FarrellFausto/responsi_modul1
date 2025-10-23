const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'API Cuci Sepatu - Selamat Datang!',
    endpoints: {
      'GET /items': 'Dapatkan semua data sepatu',
      'GET /items?status=Selesai': 'Filter sepatu berdasarkan status',
      'GET /items/:id': 'Dapatkan detail sepatu berdasarkan ID',
      'POST /items': 'Tambah data sepatu baru',
      'PUT /items/:id': 'Update data sepatu',
      'DELETE /items/:id': 'Hapus data sepatu'
    }
  });
});

// CREATE - Tambah sepatu baru
app.post('/items', async (req, res) => {
  try {
    const { nama_pelanggan, jenis_sepatu, layanan, status, harga, tanggal_masuk } = req.body;

    // Validasi input
    if (!nama_pelanggan || !jenis_sepatu || !layanan || !status || !harga) {
      return res.status(400).json({
        error: 'Data tidak lengkap',
        required: ['nama_pelanggan', 'jenis_sepatu', 'layanan', 'status', 'harga']
      });
    }

    const { data, error } = await supabase
      .from('sepatu')
      .insert([{
        nama_pelanggan,
        jenis_sepatu,
        layanan,
        status,
        harga,
        tanggal_masuk: tanggal_masuk || new Date().toISOString()
      }])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Data sepatu berhasil ditambahkan',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// READ - Dapatkan semua data atau filter berdasarkan status
app.get('/items', async (req, res) => {
  try {
    const { status } = req.query;

    let query = supabase.from('sepatu').select('*').order('created_at', { ascending: false });

    // Filter berdasarkan status jika ada
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// READ - Dapatkan detail sepatu berdasarkan ID
app.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('sepatu')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Data tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// UPDATE - Update data sepatu
app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_pelanggan, jenis_sepatu, layanan, status, harga, tanggal_masuk } = req.body;

    const updateData = {};
    if (nama_pelanggan) updateData.nama_pelanggan = nama_pelanggan;
    if (jenis_sepatu) updateData.jenis_sepatu = jenis_sepatu;
    if (layanan) updateData.layanan = layanan;
    if (status) updateData.status = status;
    if (harga) updateData.harga = harga;
    if (tanggal_masuk) updateData.tanggal_masuk = tanggal_masuk;

    const { data, error } = await supabase
      .from('sepatu')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Data tidak ditemukan'
      });
    }

    res.json({
      success: true,
      message: 'Data sepatu berhasil diupdate',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE - Hapus data sepatu
app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('sepatu')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Data tidak ditemukan'
      });
    }

    res.json({
      success: true,
      message: 'Data sepatu berhasil dihapus',
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint tidak ditemukan'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Terjadi kesalahan pada server'
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;