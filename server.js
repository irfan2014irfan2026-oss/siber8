const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;
const sessions = new Map();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const asyncRoute = (handler) => (req, res) => Promise.resolve(handler(req, res)).catch((error) => {
  console.error(error);
  res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
});

const hashPassword = (password) => crypto.createHash('sha256').update(String(password)).digest('hex');
const getUser = (req) => sessions.get(req.headers['x-auth-token']);
const imageProxyUrl = (url) => url?.startsWith('https://images.unsplash.com/') ? `/media/${Buffer.from(url).toString('base64url')}` : (url || '/assets/part.svg');

const categories = [
  { id: 1, name: 'Pengereman', slug: 'pengereman' },
  { id: 2, name: 'Oli & Mesin', slug: 'oli-mesin' },
  { id: 3, name: 'Kelistrikan', slug: 'kelistrikan' },
  { id: 4, name: 'Kaki-kaki', slug: 'kaki-kaki' },
  { id: 5, name: 'Filter', slug: 'filter' }
];

const products = [
  { id: 1, category_id: 1, category_name: 'Pengereman', category_slug: 'pengereman', name: 'Kampas Rem Depan Avanza / Xenia', slug: 'kampas-rem-avanza', brand: 'Brembo', description: 'Pengereman lebih pakem dan minim suara untuk pemakaian harian.', price: 395000, stock: 24, image_url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Toyota Avanza, Xenia 2012-2021', rating: 4.9, is_featured: true, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, category_id: 2, category_name: 'Oli & Mesin', category_slug: 'oli-mesin', name: 'Oli Mesin 10W-40 Shell Helix HX7', slug: 'oli-shell-hx7', brand: 'Shell', description: 'Perlindungan mesin yang stabil untuk perjalanan jauh dan macet.', price: 385000, stock: 38, image_url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Mobil bensin 1.3L - 2.0L', rating: 4.8, is_featured: true, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, category_id: 3, category_name: 'Kelistrikan', category_slug: 'kelistrikan', name: 'Busi Iridium NGK Spark Plug', slug: 'busi-ngk-iridium', brand: 'NGK', description: 'Respons akselerasi konsisten dengan usia pakai lebih panjang.', price: 135000, stock: 52, image_url: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Honda, Toyota, Suzuki', rating: 4.9, is_featured: false, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, category_id: 5, category_name: 'Filter', category_slug: 'filter', name: 'Filter Oli Original Astra Daihatsu', slug: 'filter-oli-daihatsu', brand: 'Daihatsu', description: 'Filter oli original untuk menjaga sirkulasi pelumas tetap bersih.', price: 45000, stock: 70, image_url: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Daihatsu Xenia, Terios', rating: 4.7, is_featured: false, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 5, category_id: 3, category_name: 'Kelistrikan', category_slug: 'kelistrikan', name: 'Aki Kering GS Astra MF 42Ah', slug: 'aki-gs-astra-mf', brand: 'GS Astra', description: 'Aki bebas perawatan dengan performa start yang andal.', price: 820000, stock: 18, image_url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Toyota, Honda, Suzuki', rating: 4.8, is_featured: true, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 6, category_id: 3, category_name: 'Kelistrikan', category_slug: 'kelistrikan', name: 'Lampu Bohlam Osram H4 Night Breaker', slug: 'lampu-osram-h4', brand: 'Osram', description: 'Cahaya lebih terang untuk visibilitas berkendara malam.', price: 210000, stock: 30, image_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Universal soket H4', rating: 4.8, is_featured: false, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 7, category_id: 1, category_name: 'Pengereman', category_slug: 'pengereman', name: 'Kampas Rem Belakang Honda Brio Jazz', slug: 'kampas-rem-honda', brand: 'Brembo', description: 'Komponen rem belakang dengan material tahan panas.', price: 280000, stock: 21, image_url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Honda Brio, Jazz 2014-2020', rating: 4.9, is_featured: false, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 8, category_id: 5, category_name: 'Filter', category_slug: 'filter', name: 'Filter Udara Ferrox Stainless Steel', slug: 'filter-udara-ferrox', brand: 'Ferrox', description: 'Filter udara reusable untuk aliran udara mesin lebih optimal.', price: 450000, stock: 14, image_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=700&q=80', vehicle_info: 'Toyota Innova, Fortuner', rating: 4.7, is_featured: false, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

const users = [
  { id: '9f4c7d0f-9a72-40d8-bdce-367f097ae9cf', name: 'PartCraft Admin', email: 'admin@partcraft.id', role: 'admin', password_hash: hashPassword('admin123'), created_at: new Date().toISOString() }
];

const orders = [];
let nextOrderId = 1;

const makeOrderNumber = () => `PC-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

const serializeProduct = (product) => ({
  ...product,
  image_url: imageProxyUrl(product.image_url),
  category_name: product.category_name,
  category_slug: product.category_slug,
  price: Number(product.price)
});

const requireAdmin = (req, res, next) => {
  const user = getUser(req);
  if (!user || user.role !== 'admin') return res.status(401).json({ error: 'Akses admin diperlukan.' });
  req.user = user;
  next();
};

app.get('/media/:encoded', asyncRoute(async (req, res) => {
  const source = Buffer.from(req.params.encoded, 'base64url').toString();
  if (!source.startsWith('https://images.unsplash.com/')) return res.status(400).end();
  const response = await fetch(source);
  if (!response.ok) return res.status(response.status).end();
  res.set('Content-Type', response.headers.get('content-type') || 'image/jpeg');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(Buffer.from(await response.arrayBuffer()));
}));

app.post('/api/auth/register', asyncRoute(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ error: 'Nama, email, dan password minimal 6 karakter wajib diisi.' });
  const normalizedEmail = String(email).toLowerCase();
  if (users.some((user) => user.email === normalizedEmail)) return res.status(409).json({ error: 'Email sudah terdaftar.' });
  const user = { id: crypto.randomUUID(), name, email: normalizedEmail, role: 'customer', password_hash: hashPassword(password), created_at: new Date().toISOString() };
  users.push(user);
  res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
}));

app.post('/api/auth/login', asyncRoute(async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((entry) => entry.email === String(email || '').toLowerCase() && entry.password_hash === hashPassword(password || ''));
  if (!user) return res.status(401).json({ error: 'Email atau password salah.' });
  const publicUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, publicUser);
  res.json({ user: publicUser, token });
}));

app.post('/api/auth/logout', (req, res) => {
  sessions.delete(req.headers['x-auth-token']);
  res.status(204).end();
});

app.post('/api/auth/reset-password', asyncRoute(async (req, res) => {
  const { email, new_password } = req.body;
  if (!email || !new_password || String(new_password).length < 6) return res.status(400).json({ error: 'Email dan password baru minimal 6 karakter wajib diisi.' });
  const normalizedEmail = String(email).toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);
  if (!user) return res.status(404).json({ error: 'Email belum terdaftar.' });
  user.password_hash = hashPassword(new_password);
  for (const [token, sessionUser] of sessions.entries()) if (sessionUser.id === user.id) sessions.delete(token);
  res.json({ message: 'Password berhasil diubah.' });
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok', mode: 'memory' }));

app.get('/api/categories', (req, res) => { res.json(categories); });

app.get('/api/products', (req, res) => {
  const { search = '', category = '', featured = '' } = req.query;
  const searchText = String(search).toLowerCase();
  const categorySlug = String(category || '');
  const filtered = products.filter((product) => {
    if (!product.is_active) return false;
    if (searchText && !`${product.name} ${product.brand} ${product.vehicle_info}`.toLowerCase().includes(searchText)) return false;
    if (categorySlug && product.category_slug !== categorySlug) return false;
    if (featured === 'true' && !product.is_featured) return false;
    return true;
  });
  res.json(filtered.sort((a, b) => Number(b.is_featured) - Number(a.is_featured)).map(serializeProduct));
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((entry) => entry.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produk tidak ditemukan.' });
  res.json(serializeProduct(product));
});

app.get('/api/admin/summary', requireAdmin, (req, res) => {
  const totalProducts = products.filter((p) => p.is_active).length;
  const pendingOrders = orders.filter((order) => order.status === 'Menunggu pembayaran').length;
  const totalCustomers = users.filter((user) => user.role === 'customer').length;
  const lowStock = products.filter((p) => p.is_active && p.stock <= 5).length;
  res.json({
    total_products: totalProducts,
    total_orders: orders.length,
    pending_orders: pendingOrders,
    total_customers: totalCustomers,
    low_stock: lowStock
  });
});

app.get('/api/admin/users', requireAdmin, (req, res) => { res.json(users.map(({ id, name, email, role, created_at }) => ({ id, name, email, role, created_at }))); });

app.get('/api/admin/products', requireAdmin, (req, res) => {
  res.json(products.map((product) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: Number(product.price),
    stock: product.stock,
    is_active: product.is_active,
    category_name: product.category_name
  })));
});

app.patch('/api/admin/users/:id', requireAdmin, (req, res) => {
  if (!['customer', 'admin'].includes(req.body.role)) return res.status(400).json({ error: 'Role tidak valid.' });
  const user = users.find((entry) => entry.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User tidak ditemukan.' });
  user.role = req.body.role;
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

app.get('/api/admin/sales', requireAdmin, (req, res) => {
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const label = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const revenue = orders.filter((order) => order.status !== 'Dibatalkan' && new Date(order.created_at) >= dayStart && new Date(order.created_at) < dayEnd).reduce((sum, order) => sum + Number(order.total_amount), 0);
    const count = orders.filter((order) => new Date(order.created_at) >= dayStart && new Date(order.created_at) < dayEnd).length;
    days.push({ label, revenue, orders: count });
  }
  res.json(days);
});

app.get('/api/admin/cart', requireAdmin, (req, res) => {
  const summary = {};
  for (const order of orders) {
    if (order.status === 'Dibatalkan') continue;
    for (const item of order.items) {
      summary[item.product_name] = (summary[item.product_name] || { product_name: item.product_name, quantity: 0, value: 0 });
      summary[item.product_name].quantity += Number(item.quantity);
      summary[item.product_name].value += Number(item.quantity) * Number(item.unit_price);
    }
  }
  res.json(Object.values(summary).sort((a, b) => b.quantity - a.quantity));
});

app.post('/api/orders', asyncRoute(async (req, res) => {
  const { customer, items, payment_method = 'Transfer bank' } = req.body;
  if (!customer?.name || !customer?.phone || !customer?.address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Data checkout belum lengkap.' });
  }

  const hydratedItems = [];
  let total = 0;

  for (const item of items) {
    const product = products.find((entry) => entry.id === Number(item.product_id) && entry.is_active);
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) {
      throw new Error(`Stok ${product?.name || 'produk'} tidak mencukupi.`);
    }
    total += Number(product.price) * quantity;
    hydratedItems.push({ product_id: product.id, product_name: product.name, quantity, unit_price: Number(product.price) });
    product.stock -= quantity;
    product.updated_at = new Date().toISOString();
  }

  const newOrder = {
    id: nextOrderId++,
    order_number: makeOrderNumber(),
    customer_name: customer.name,
    phone: customer.phone,
    address: customer.address,
    payment_method,
    total_amount: Number(total),
    status: 'Menunggu pembayaran',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: hydratedItems
  };
  orders.unshift(newOrder);
  res.status(201).json({ id: newOrder.id, order_number: newOrder.order_number, status: newOrder.status, total_amount: newOrder.total_amount });
}));

app.get('/api/orders', (req, res) => {
  res.json(orders.map((order) => ({
    id: order.id,
    order_number: order.order_number,
    customer_name: order.customer_name,
    phone: order.phone,
    address: order.address,
    payment_method: order.payment_method,
    total_amount: Number(order.total_amount),
    status: order.status,
    created_at: order.created_at,
    items: order.items.map((item) => ({ product_name: item.product_name, quantity: item.quantity, unit_price: Number(item.unit_price) }))
  })));
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((entry) => entry.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
  res.json({
    ...order,
    total_amount: Number(order.total_amount),
    items: order.items.map((item) => ({ ...item, unit_price: Number(item.unit_price) }))
  });
});

app.patch('/api/orders/:id/status', requireAdmin, (req, res) => {
  const allowed = ['Menunggu pembayaran', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Status tidak valid.' });
  const order = orders.find((entry) => entry.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });
  order.status = req.body.status;
  order.updated_at = new Date().toISOString();
  res.json({ id: order.id, status: order.status });
});

app.post('/api/products', requireAdmin, asyncRoute(async (req, res) => {
  const { category_id, name, brand, description = '', price, stock, image_url = '', vehicle_info = '' } = req.body;
  if (!category_id || !name || price === undefined || stock === undefined) return res.status(400).json({ error: 'Nama, kategori, harga, dan stok wajib diisi.' });
  const category = categories.find((entry) => entry.id === Number(category_id));
  if (!category) return res.status(400).json({ error: 'Kategori tidak valid.' });
  const product = {
    id: products.length ? Math.max(...products.map((entry) => entry.id)) + 1 : 1,
    category_id: Number(category_id),
    category_name: category.name,
    category_slug: category.slug,
    name,
    slug: `${String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
    brand: brand || 'PartCraft',
    description,
    price: Number(price),
    stock: Number(stock),
    image_url: image_url || '',
    vehicle_info: vehicle_info || '',
    rating: 4.8,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  products.push(product);
  res.status(201).json(serializeProduct(product));
}));

app.patch('/api/products/:id', requireAdmin, asyncRoute(async (req, res) => {
  const product = products.find((entry) => entry.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produk tidak ditemukan.' });
  const fields = ['name', 'brand', 'description', 'price', 'stock', 'image_url', 'vehicle_info', 'is_active'];
  const updates = fields.filter((field) => req.body[field] !== undefined);
  if (!updates.length) return res.status(400).json({ error: 'Tidak ada data yang diubah.' });
  for (const field of updates) product[field] = req.body[field];
  product.updated_at = new Date().toISOString();
  res.json(serializeProduct(product));
}));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/shop', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => console.log(`PartCraft running on port ${port} in memory mode`));