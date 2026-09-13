# MVP WEBSITE PENJUALAN SPAREPART

**Versi:** 1.0 MVP  
**Jenis Sistem:** E-Commerce Penjualan Sparepart  
**Platform:** Web Application  
**Tujuan Dokumen:** Menjadi dasar pembangunan versi pertama sistem yang dapat digunakan dan diuji.

---

# 1. Tujuan MVP

MVP (Minimum Viable Product) dibuat untuk menghasilkan versi awal website penjualan sparepart yang sudah dapat menjalankan proses utama bisnis:

```text
Customer melihat produk
        ↓
Mencari produk
        ↓
Melihat detail
        ↓
Menambahkan ke keranjang
        ↓
Checkout
        ↓
Membuat pesanan
        ↓
Admin memproses pesanan
```

MVP tidak perlu langsung memiliki seluruh fitur e-commerce lengkap.

Target utama MVP adalah:

- Website dapat digunakan oleh customer.
- Produk dapat ditampilkan dari database.
- Customer dapat mencari sparepart.
- Customer dapat memasukkan produk ke keranjang.
- Customer dapat checkout.
- Pesanan tersimpan.
- Admin dapat melihat pesanan.
- Admin dapat menambah dan mengubah produk.
- Admin dapat mengatur stok.

---

# 2. Scope MVP

## 2.1 Fitur yang masuk MVP

### Customer

- Register.
- Login.
- Logout.
- Melihat daftar produk.
- Mencari produk.
- Filter berdasarkan kategori.
- Melihat detail produk.
- Menambahkan produk ke keranjang.
- Mengubah jumlah barang.
- Menghapus barang dari keranjang.
- Checkout.
- Memasukkan alamat pengiriman.
- Memilih metode pembayaran manual.
- Membuat pesanan.
- Melihat status pesanan.
- Melihat riwayat pesanan.

### Admin

- Login admin.
- Dashboard sederhana.
- Tambah produk.
- Edit produk.
- Hapus/nonaktifkan produk.
- Update stok.
- Melihat daftar pesanan.
- Mengubah status pesanan.

---

# 3. Fitur yang belum masuk MVP

Fitur berikut ditunda ke versi selanjutnya:

- Payment Gateway otomatis.
- QRIS otomatis.
- Virtual Account.
- Integrasi API kurir.
- Tracking resi otomatis.
- Voucher dan promo.
- Review produk.
- Wishlist.
- Chat customer service.
- Multi warehouse.
- Supplier management.
- Advanced analytics.
- Sistem refund otomatis.
- Mobile application.
- Recommendation engine.
- Vehicle compatibility engine lengkap.

---

# 4. Aktor MVP

## 4.1 Customer

Customer merupakan pengguna yang melakukan pembelian.

Customer dapat:

```text
Register
   ↓
Login
   ↓
Browse Product
   ↓
Add to Cart
   ↓
Checkout
   ↓
Create Order
   ↓
View Order
```

---

## 4.2 Admin

Admin mengelola sistem.

Admin dapat:

```text
Login
   ↓
Dashboard
   ↓
Product Management
   ↓
Stock Management
   ↓
Order Management
```

---

# 5. Arsitektur MVP

Arsitektur awal:

```text
                  CUSTOMER / ADMIN
                         |
                         |
                       HTTPS
                         |
                         v
                  +-------------+
                  |    NGINX    |
                  +-------------+
                         |
                         v
                +------------------+
                | FRONTEND WEBSITE |
                | HTML/CSS/JS      |
                +------------------+
                         |
                         | REST API
                         v
                +------------------+
                | BACKEND API      |
                | Node.js/Express  |
                +------------------+
                         |
                         v
                +------------------+
                | DATABASE         |
                | SQLite/PostgreSQL|
                +------------------+
```

Untuk tahap pengembangan lokal:

```text
Browser
   |
   v
localhost:3000
   |
   v
Node.js + Express
   |
   v
SQLite
```

Untuk deployment:

```text
Internet
   |
   v
NGINX
   |
   v
Node.js
   |
   v
PostgreSQL
```

---

# 6. Teknologi MVP

## Frontend

```text
HTML5
CSS3
JavaScript
Bootstrap
```

Bootstrap dipilih agar pengembangan UI lebih cepat.

## Backend

```text
Node.js
Express.js
```

## Database Development

```text
SQLite
```

## Database Production

```text
PostgreSQL
```

## Web Server

```text
NGINX
```

## Version Control

```text
Git
GitHub
```

---

# 7. Struktur Folder MVP

```text
sparepart-mvp/
│
├── app.js
├── package.json
├── .env
├── README.md
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│   └── OrderItem.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── product-detail.html
│   ├── cart.html
│   ├── checkout.html
│   ├── orders.html
│   └── admin/
│       ├── dashboard.html
│       ├── products.html
│       └── orders.html
│
└── database/
    └── sparepart.db
```

---

# 8. Database MVP

Database MVP cukup menggunakan tabel:

```text
USERS
PRODUCTS
CATEGORIES
CARTS
ORDERS
ORDER_ITEMS
```

---

# 9. Tabel Users

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(20) DEFAULT 'customer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Role:

```text
customer
admin
```

---

# 10. Tabel Categories

```sql
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);
```

Contoh kategori:

```text
Oli
Busi
Kampas Rem
Aki
Filter
Lampu
Ban
Aksesoris
```

---

# 11. Tabel Products

```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name VARCHAR(150) NOT NULL,
    part_number VARCHAR(100),
    brand VARCHAR(100),
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    image VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

---

# 12. Tabel Cart

```sql
CREATE TABLE carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

---

# 13. Tabel Orders

```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    order_number VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(150),
    phone VARCHAR(30),
    address TEXT,
    total DECIMAL(12,2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(30) DEFAULT 'pending',
    order_status VARCHAR(30) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

# 14. Tabel Order Items

```sql
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(12,2),
    subtotal DECIMAL(12,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

---

# 15. Relasi Database

```text
USERS
  |
  | 1
  |
  | N
ORDERS
  |
  | 1
  |
  | N
ORDER_ITEMS
  |
  | N
  |
  | 1
PRODUCTS
  |
  | N
  |
  | 1
CATEGORIES
```

Customer dengan cart:

```text
USERS
  |
  | 1
  |
  | N
CARTS
  |
  | N
  |
  | 1
PRODUCTS
```

---

# 16. Halaman MVP

## Public

```text
/
```

Homepage.

Menampilkan:

- Hero/banner.
- Produk terbaru.
- Kategori.
- Pencarian.

---

## Login

```text
/login
```

---

## Register

```text
/register
```

---

## Produk

```text
/products
```

Fitur:

- List produk.
- Search.
- Filter kategori.
- Pagination sederhana.

---

## Detail Produk

```text
/products/:id
```

Informasi:

- Foto.
- Nama.
- Brand.
- Part number.
- Harga.
- Stok.
- Deskripsi.
- Tombol Add to Cart.

---

## Cart

```text
/cart
```

Menampilkan:

```text
Produk
Harga
Quantity
Subtotal
Total
```

---

## Checkout

```text
/checkout
```

Input:

```text
Nama
No HP
Alamat
Metode Pembayaran
```

Metode pembayaran MVP:

```text
Transfer Bank
COD
```

---

## Pesanan

```text
/orders
```

Menampilkan:

```text
Order Number
Tanggal
Total
Payment Status
Order Status
```

---

# 17. Admin Pages

## Dashboard

```text
/admin
```

Informasi:

```text
Total Produk
Total Order
Order Pending
Total Customer
Stok Rendah
```

---

## Product Management

```text
/admin/products
```

Fitur:

```text
Add Product
Edit Product
Update Stock
Delete / Disable Product
```

---

## Order Management

```text
/admin/orders
```

Admin dapat mengubah status:

```text
PENDING
    ↓
PROCESSING
    ↓
PACKING
    ↓
SHIPPED
    ↓
COMPLETED
```

Tambahan:

```text
CANCELLED
```

---

# 18. API MVP

Base URL:

```text
/api
```

---

## Authentication API

### Register

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Ahmad",
  "email": "ahmad@example.com",
  "password": "password123"
}
```

---

### Login

```http
POST /api/auth/login
```

---

### Logout

```http
POST /api/auth/logout
```

---

# 19. Product API

### List Product

```http
GET /api/products
```

---

### Product Detail

```http
GET /api/products/:id
```

---

### Search

```http
GET /api/products?search=kampas
```

---

### Filter

```http
GET /api/products?category=1
```

---

### Admin Create Product

```http
POST /api/products
```

---

### Admin Update Product

```http
PUT /api/products/:id
```

---

### Admin Delete Product

```http
DELETE /api/products/:id
```

---

# 20. Cart API

### Get Cart

```http
GET /api/cart
```

### Add Cart

```http
POST /api/cart
```

Body:

```json
{
  "product_id": 10,
  "quantity": 2
}
```

### Update Quantity

```http
PUT /api/cart/:id
```

### Delete Item

```http
DELETE /api/cart/:id
```

---

# 21. Order API

### Checkout

```http
POST /api/orders
```

Body:

```json
{
  "name": "Ahmad",
  "phone": "08123456789",
  "address": "Jakarta",
  "payment_method": "bank_transfer"
}
```

---

### Order History

```http
GET /api/orders
```

---

### Detail Order

```http
GET /api/orders/:id
```

---

### Admin Order List

```http
GET /api/admin/orders
```

---

### Update Status

```http
PUT /api/admin/orders/:id/status
```

Body:

```json
{
  "status": "processing"
}
```

---

# 22. Authentication

MVP menggunakan:

```text
Email
+
Password
```

Password wajib disimpan sebagai hash.

Gunakan:

```text
bcrypt
```

Flow:

```text
Login
  ↓
Check Email
  ↓
Compare Password Hash
  ↓
Create Session
  ↓
Login Success
```

---

# 23. Session

Untuk MVP gunakan:

```text
express-session
```

Session menyimpan:

```text
user_id
name
role
```

---

# 24. Authorization

Middleware:

```text
authMiddleware
```

digunakan untuk halaman customer yang membutuhkan login.

Middleware:

```text
adminMiddleware
```

digunakan untuk:

```text
/admin/*
```

---

# 25. Flow Customer

```text
HOME
 |
 v
PRODUCT LIST
 |
 v
PRODUCT DETAIL
 |
 v
ADD TO CART
 |
 v
CART
 |
 v
CHECKOUT
 |
 v
CREATE ORDER
 |
 v
ORDER SUCCESS
 |
 v
ORDER HISTORY
```

---

# 26. Flow Admin

```text
ADMIN LOGIN
    |
    v
DASHBOARD
    |
    +---------------------+
    |                     |
    v                     v
PRODUCTS                ORDERS
    |                     |
    v                     v
ADD / EDIT             UPDATE STATUS
    |
    v
UPDATE STOCK
```

---

# 27. Checkout Logic

Ketika customer checkout:

```text
Check Login
    ↓
Load Cart
    ↓
Validate Stock
    ↓
Calculate Total
    ↓
Create Order
    ↓
Create Order Items
    ↓
Reduce Product Stock
    ↓
Clear Cart
    ↓
Order Success
```

---

# 28. Perhitungan Total

```text
Subtotal = Harga × Quantity

Total = Σ Subtotal
```

MVP belum menggunakan:

```text
Voucher
Tax Engine
Automatic Shipping Cost
```

Ongkir dapat menggunakan:

```text
Flat Shipping
```

Contoh:

```text
Ongkir = Rp20.000
```

---

# 29. Stock Validation

Sebelum order dibuat:

```text
Requested Quantity <= Product Stock
```

Jika tidak:

```text
Checkout ditolak.
```

Contoh:

```text
Stock = 5

Customer Order = 8

Result:

FAILED
Insufficient Stock
```

---

# 30. Security Minimum MVP

MVP wajib menerapkan:

- Password hashing.
- Session authentication.
- Role validation.
- Input validation.
- Prepared SQL query / ORM.
- CSRF protection untuk form penting.
- XSS escaping.
- Rate limiting pada login.
- Secure HTTP headers.
- Environment variable untuk secret.
- HTTPS pada production.

---

# 31. Environment Variables

Contoh `.env`:

```env
PORT=3000

SESSION_SECRET=change-this-secret

DATABASE_URL=./database/sparepart.db

ADMIN_EMAIL=admin@sparepart.local
```

File `.env` tidak boleh dimasukkan ke repository publik.

---

# 32. Seed Admin

Admin pertama:

```text
Name     : Administrator
Email    : admin@sparepart.local
Role     : admin
```

Password dibuat melalui seed dan disimpan sebagai hash.

---

# 33. Seed Product

Contoh:

```text
1. Kampas Rem Avanza
2. Oli Mesin 10W-40
3. Busi NGK
4. Filter Oli
5. Aki 12V
```

---

# 34. UI MVP

Navigasi customer:

```text
LOGO

Home
Products
Cart
Orders
Login/Profile
```

Navigasi admin:

```text
Dashboard
Products
Orders
Logout
```

---

# 35. Homepage Wireframe

```text
+------------------------------------------------------+
| LOGO        PRODUCTS       CART       LOGIN          |
+------------------------------------------------------+
|                                                      |
|             SPAREPART ONLINE STORE                   |
|                                                      |
|        [ Search sparepart................ ]          |
|                                                      |
+------------------------------------------------------+

POPULAR PRODUCTS

+------------+ +------------+ +------------+
|   IMAGE    | |   IMAGE    | |   IMAGE    |
| Product A  | | Product B  | | Product C  |
| Rp100.000  | | Rp150.000  | | Rp200.000  |
| [DETAIL]   | | [DETAIL]   | | [DETAIL]   |
+------------+ +------------+ +------------+
```

---

# 36. Product Detail Wireframe

```text
+------------------------------------------------------+
|                     PRODUCT                          |
+------------------------------------------------------+

+-------------------+      Kampas Rem Avanza
|                   |
|       IMAGE       |      Brand: XYZ
|                   |
+-------------------+      Part Number: BR001

                           Harga: Rp350.000

                           Stock: 12

                           Quantity:

                           [-] 1 [+]

                           [ ADD TO CART ]
```

---

# 37. Cart Wireframe

```text
+------------------------------------------------------+
| CART                                                 |
+------------------------------------------------------+

Product          Price       Qty       Subtotal

Kampas Rem       350.000      2         700.000

Oli Mesin        100.000      1         100.000

--------------------------------------------------------

TOTAL                                   800.000

                           [ CHECKOUT ]
```

---

# 38. Admin Dashboard Wireframe

```text
+------------------------------------------------------+
| ADMIN DASHBOARD                                      |
+------------------------------------------------------+

+-------------+ +-------------+ +-------------+
| PRODUCTS    | | ORDERS      | | CUSTOMERS   |
|     50      | |     25      | |     18      |
+-------------+ +-------------+ +-------------+

LATEST ORDER

ORD-001       Pending

ORD-002       Processing

ORD-003       Completed
```

---

# 39. User Stories

## US-001

Sebagai customer, saya ingin melihat produk agar saya mengetahui sparepart yang dijual.

### Acceptance Criteria

```text
Produk tampil.
Nama tampil.
Harga tampil.
Stok tampil.
Foto tampil.
```

---

## US-002

Sebagai customer, saya ingin mencari produk berdasarkan nama.

### Acceptance Criteria

```text
Search menerima keyword.
Produk relevan ditampilkan.
```

---

## US-003

Sebagai customer, saya ingin memasukkan produk ke cart.

### Acceptance Criteria

```text
Produk masuk cart.
Quantity dapat diubah.
Subtotal dihitung otomatis.
```

---

## US-004

Sebagai customer, saya ingin checkout.

### Acceptance Criteria

```text
Customer harus login.
Cart tidak boleh kosong.
Stock harus tersedia.
Order berhasil tersimpan.
```

---

## US-005

Sebagai admin, saya ingin menambahkan produk.

### Acceptance Criteria

```text
Admin login.
Form produk tersedia.
Produk tersimpan ke database.
Produk tampil di website.
```

---

## US-006

Sebagai admin, saya ingin memperbarui stok.

### Acceptance Criteria

```text
Admin dapat mengubah jumlah stok.
Perubahan langsung tersimpan.
```

---

## US-007

Sebagai admin, saya ingin melihat pesanan.

### Acceptance Criteria

```text
Order list tampil.
Order detail dapat dibuka.
Status order dapat diubah.
```

---

# 40. MVP Acceptance Criteria

MVP dianggap selesai jika:

```text
[ ] Register bekerja

[ ] Login bekerja

[ ] Logout bekerja

[ ] Produk tampil dari database

[ ] Search produk bekerja

[ ] Detail produk bekerja

[ ] Add to Cart bekerja

[ ] Update Cart bekerja

[ ] Delete Cart bekerja

[ ] Checkout bekerja

[ ] Order tersimpan

[ ] Stock berkurang

[ ] Order History tampil

[ ] Admin login bekerja

[ ] Admin dapat menambah produk

[ ] Admin dapat edit produk

[ ] Admin dapat update stok

[ ] Admin dapat melihat order

[ ] Admin dapat update status order
```

---

# 41. Tahapan Pembangunan

## Sprint 1 — Foundation

Membangun:

```text
Project Structure
Database
Express Server
Homepage
Product List
```

---

## Sprint 2 — Authentication

Membangun:

```text
Register
Login
Logout
Session
Role
```

---

## Sprint 3 — Product

Membangun:

```text
Product List
Product Detail
Search
Category
```

---

## Sprint 4 — Cart

Membangun:

```text
Add Cart
Update Cart
Delete Cart
Calculate Total
```

---

## Sprint 5 — Checkout

Membangun:

```text
Checkout
Order
Order Items
Stock Reduction
Order History
```

---

## Sprint 6 — Admin

Membangun:

```text
Dashboard
Product Management
Stock Management
Order Management
```

---

## Sprint 7 — Testing

Testing:

```text
Authentication Test

Cart Test

Checkout Test

Stock Test

Admin Authorization Test

Input Validation Test
```

---

# 42. MVP Development Priority

Prioritas pertama:

```text
1. Database
2. Product
3. Authentication
4. Cart
5. Checkout
6. Order
7. Admin
8. Security
9. Testing
10. Deployment
```

---

# 43. Definition of Done

Sebuah fitur dianggap selesai jika:

- Fitur berjalan sesuai user story.
- Data tersimpan dengan benar.
- Tidak ada error kritis.
- Validasi input tersedia.
- Authorization berjalan.
- Tampilan dapat digunakan pada desktop/mobile.
- Fitur telah diuji.
- Kode sudah masuk Git.

---

# 44. Target MVP

Versi pertama menghasilkan website dengan alur:

```text
CUSTOMER

Register
   ↓
Login
   ↓
Browse Product
   ↓
Search
   ↓
Product Detail
   ↓
Add Cart
   ↓
Checkout
   ↓
Order Created
   ↓
Order History
```

dan:

```text
ADMIN

Login
   ↓
Dashboard
   ↓
Manage Product
   ↓
Manage Stock
   ↓
Manage Order
```

---

# 45. Roadmap Setelah MVP

## Version 1.1

```text
Payment Gateway
```

## Version 1.2

```text
Shipping API
Tracking Number
```

## Version 1.3

```text
Vehicle Compatibility
```

## Version 1.4

```text
Promo
Voucher
Review
Wishlist
```

## Version 2.0

```text
Multi Warehouse
Supplier Management
Advanced Dashboard
Analytics
Mobile Application
```

---

# 46. Kesimpulan

MVP website penjualan sparepart dibangun dengan arsitektur sederhana:

```text
Browser
   ↓
NGINX
   ↓
Node.js / Express
   ↓
SQLite / PostgreSQL
```

Fokus utama MVP:

```text
PRODUCT
   +
AUTH
   +
CART
   +
CHECKOUT
   +
ORDER
   +
ADMIN
```

Dengan ruang lingkup ini sistem sudah cukup untuk:

- Menampilkan produk.
- Melakukan transaksi sederhana.
- Menyimpan pesanan.
- Mengelola stok.
- Mengelola produk.
- Mengelola status pesanan.

Dokumen ini menjadi baseline pembangunan aplikasi sebelum penambahan fitur e-commerce yang lebih kompleks.
