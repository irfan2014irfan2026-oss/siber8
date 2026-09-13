INSERT INTO categories (name, slug) VALUES
  ('Pengereman', 'pengereman'), ('Oli & Mesin', 'oli-mesin'), ('Kelistrikan', 'kelistrikan'), ('Kaki-kaki', 'kaki-kaki'), ('Filter', 'filter')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, slug, brand, description, price, stock, image_url, vehicle_info, rating, is_featured)
SELECT c.id, x.name, x.slug, x.brand, x.description, x.price, x.stock, x.image_url, x.vehicle_info, x.rating, x.is_featured
FROM categories c JOIN (VALUES
 ('Kampas Rem Depan Avanza / Xenia', 'kampas-rem-avanza', 'Brembo', 'Pengereman lebih pakem dan minim suara untuk pemakaian harian.', 395000, 24, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80', 'Toyota Avanza, Xenia 2012-2021', 4.9, true, 'pengereman'),
 ('Oli Mesin 10W-40 Shell Helix HX7', 'oli-shell-hx7', 'Shell', 'Perlindungan mesin yang stabil untuk perjalanan jauh dan macet.', 385000, 38, 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=700&q=80', 'Mobil bensin 1.3L - 2.0L', 4.8, true, 'oli-mesin'),
 ('Busi Iridium NGK Spark Plug', 'busi-ngk-iridium', 'NGK', 'Respons akselerasi konsisten dengan usia pakai lebih panjang.', 135000, 52, 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=700&q=80', 'Honda, Toyota, Suzuki', 4.9, false, 'kelistrikan'),
 ('Filter Oli Original Astra Daihatsu', 'filter-oli-daihatsu', 'Daihatsu', 'Filter oli original untuk menjaga sirkulasi pelumas tetap bersih.', 45000, 70, 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=700&q=80', 'Daihatsu Xenia, Terios', 4.7, false, 'filter'),
 ('Aki Kering GS Astra MF 42Ah', 'aki-gs-astra-mf', 'GS Astra', 'Aki bebas perawatan dengan performa start yang andal.', 820000, 18, 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=700&q=80', 'Toyota, Honda, Suzuki', 4.8, true, 'kelistrikan'),
 ('Lampu Bohlam Osram H4 Night Breaker', 'lampu-osram-h4', 'Osram', 'Cahaya lebih terang untuk visibilitas berkendara malam.', 210000, 30, 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80', 'Universal soket H4', 4.8, false, 'kelistrikan'),
 ('Kampas Rem Belakang Honda Brio Jazz', 'kampas-rem-honda', 'Brembo', 'Komponen rem belakang dengan material tahan panas.', 280000, 21, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=700&q=80', 'Honda Brio, Jazz 2014-2020', 4.9, false, 'pengereman'),
 ('Filter Udara Ferrox Stainless Steel', 'filter-udara-ferrox', 'Ferrox', 'Filter udara reusable untuk aliran udara mesin lebih optimal.', 450000, 14, 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=700&q=80', 'Toyota Innova, Fortuner', 4.7, false, 'filter')
) AS x(name, slug, brand, description, price, stock, image_url, vehicle_info, rating, is_featured, category_slug) ON c.slug = x.category_slug
ON CONFLICT (slug) DO NOTHING;

INSERT INTO users (name, email, password_hash, role) VALUES
  ('PartCraft Admin', 'admin@partcraft.id', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin')
ON CONFLICT (email) DO NOTHING;