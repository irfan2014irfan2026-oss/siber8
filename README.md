# PartCraft Sparepart Store

MVP e-commerce sparepart kendaraan berdasarkan `MVP_Website_Penjualan_Sparepart.md`.

## Jalankan dengan Docker

Prasyarat: Docker Desktop aktif.

```bash
docker compose up --build
```

Buka `http://localhost:8080`. Database PostgreSQL akan membuat tabel dan seed produk otomatis pada volume baru.

Halaman khusus:

- Login admin: `http://localhost:8080/login`
- Dashboard admin: `http://localhost:8080/admin`

Dashboard admin memiliki menu Dashboard, Add Produk, Kelola User, Cart, dan Grafik Penjualan.

Akun admin demo:

- Email: `admin@partcraft.id`
- Password: `admin123`

Klik `Admin` pada katalog setelah login untuk melihat dashboard, mengubah status order, menambah produk, mengubah stok, atau menonaktifkan produk.

Untuk menghapus database dan mengulang seed:

```bash
docker compose down -v
docker compose up --build
```

## Endpoint utama

- `GET /api/products` katalog dengan query `search`, `category`, dan `featured`.
- `GET /api/categories` kategori produk.
- `POST /api/orders` membuat pesanan dan mengurangi stok dalam satu transaksi.
- `GET /api/orders` daftar pesanan untuk panel operasional.
- `PATCH /api/orders/:id/status` mengubah status pesanan.
- `POST /api/products` menambah produk dari panel admin.
- `PATCH /api/products/:id` mengubah stok/detail produk.
- `POST /api/auth/register` dan `POST /api/auth/login` autentikasi dasar.
- `POST /api/auth/logout` menghapus sesi aktif.
- `GET /api/admin/summary` ringkasan operasional admin.
- `GET /api/admin/users` dan `PATCH /api/admin/users/:id` kelola user dan role.
- `GET /api/admin/cart` ringkasan item pesanan.
- `GET /api/admin/sales` data grafik penjualan tujuh hari.
- `GET /api/orders/:id` detail pesanan.

Struktur data ada di `db/schema.sql`, seed katalog ada di `db/seed.sql`.