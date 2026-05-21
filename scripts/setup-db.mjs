/**
 * Database setup & seed script for ShaRiz Kreations
 * Run with: DATABASE_URL=mysql://... node scripts/setup-db.mjs
 */
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const DB_URL = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/webdev_db";

// Parse MySQL URL
function parseUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port) || 3306,
    user: u.username,
    password: u.password,
    database: u.pathname.slice(1),
  };
}

const conn = await mysql.createConnection(parseUrl(DB_URL));
console.log("✅ Connected to MySQL");

// ─── Create Tables ────────────────────────────────────────────────────────────
await conn.execute(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await conn.execute(`
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    subtitle VARCHAR(200),
    description TEXT,
    actual_price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    discount_percent INT DEFAULT 0,
    promo_code VARCHAR(50),
    promo_discount INT DEFAULT 0,
    tag VARCHAR(100),
    availability VARCHAR(50) DEFAULT 'Taking Orders',
    images TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);

await conn.execute(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    review TEXT NOT NULL,
    stars INT DEFAULT 5,
    product_name VARCHAR(200),
    is_approved BOOLEAN DEFAULT TRUE,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await conn.execute(`
  CREATE TABLE IF NOT EXISTS gallery_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url TEXT NOT NULL,
    caption VARCHAR(300),
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    is_sold BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await conn.execute(`
  CREATE TABLE IF NOT EXISTS promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_percent INT DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    description VARCHAR(300),
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

await conn.execute(`
  CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);

console.log("✅ Tables created");

// ─── Seed Admin User ──────────────────────────────────────────────────────────
const [adminRows] = await conn.execute("SELECT id FROM admin_users WHERE username = 'shaz'");
if (adminRows.length === 0) {
  const hash = await bcrypt.hash("shariz2026", 10);
  await conn.execute("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)", ["shaz", hash]);
  console.log("✅ Admin user 'shaz' created");
} else {
  console.log("ℹ️  Admin user already exists");
}

// ─── Seed Products ────────────────────────────────────────────────────────────
const [productRows] = await conn.execute("SELECT COUNT(*) as cnt FROM products");
if (productRows[0].cnt === 0) {
  const products = [
    {
      name: "Ocean Drift Tray",
      subtitle: "Serving Tray · Resin & Wood",
      description: "A stunning serving tray where ocean blues meet warm wood tones. Each piece captures the movement of water in layers of translucent resin, finished with a food-safe topcoat.",
      actual_price: 280, sale_price: 280, discount_percent: 0,
      tag: "BESTSELLER", availability: "Taking Orders",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
      ]),
      sort_order: 1
    },
    {
      name: "Midnight Forest Clock",
      subtitle: "Wall Clock · Epoxy Resin",
      description: "Deep emerald and black resin swirled with gold leaf creates a forest-at-midnight effect. Fitted with a silent quartz movement.",
      actual_price: 420, sale_price: 380, discount_percent: 10,
      tag: "NEW ARRIVAL", availability: "Taking Orders",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80"
      ]),
      sort_order: 2
    },
    {
      name: "Golden Horizon Coasters",
      subtitle: "Set of 4 · Resin Art",
      description: "A set of four coasters capturing a golden sunrise horizon. Each coaster is unique — poured separately so no two are identical.",
      actual_price: 160, sale_price: 160, discount_percent: 0,
      tag: "SET OF 4", availability: "Taking Orders",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"
      ]),
      sort_order: 3
    },
    {
      name: "Rose Quartz Geode Bowl",
      subtitle: "Decorative Bowl · Crystal Resin",
      description: "Inspired by natural geode formations, this bowl features crushed rose quartz crystals suspended in blush-pink resin with gold trim.",
      actual_price: 350, sale_price: 315, discount_percent: 10,
      tag: "SOLD OUT", availability: "Sold Out",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
      ]),
      sort_order: 4
    },
    {
      name: "Celestial Night Lamp",
      subtitle: "LED Lamp · Resin & Wood Base",
      description: "A galaxy of deep indigo, violet, and silver suspended in clear resin. Warm LED lighting from the wood base creates a celestial glow.",
      actual_price: 520, sale_price: 468, discount_percent: 10,
      tag: "LUXURY", availability: "Taking Orders",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
      ]),
      sort_order: 5
    },
    {
      name: "Terracotta Sunset Vase",
      subtitle: "Decorative Vase · Resin Art",
      description: "Warm terracotta, burnt orange, and gold capture the magic of a desert sunset. A statement piece for any shelf or dining table.",
      actual_price: 290, sale_price: 290, discount_percent: 0,
      tag: "CUSTOM AVAILABLE", availability: "Taking Orders",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
      ]),
      sort_order: 6
    }
  ];

  for (const p of products) {
    await conn.execute(
      `INSERT INTO products (name, subtitle, description, actual_price, sale_price, discount_percent, tag, availability, images, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.name, p.subtitle, p.description, p.actual_price, p.sale_price, p.discount_percent, p.tag, p.availability, p.images, p.sort_order]
    );
  }
  console.log("✅ Products seeded (6 products)");
} else {
  console.log("ℹ️  Products already exist");
}

// ─── Seed Reviews ─────────────────────────────────────────────────────────────
const [reviewRows] = await conn.execute("SELECT COUNT(*) as cnt FROM reviews");
if (reviewRows[0].cnt === 0) {
  const reviews = [
    { customer_name: "Aisha M.", review: "Absolutely breathtaking work! My Ocean Drift tray is the centrepiece of every dinner party. Shaz poured so much love into it — you can feel the craftsmanship.", stars: 5, product_name: "Ocean Drift Tray" },
    { customer_name: "Priya R.", review: "I ordered a custom piece for my mother's birthday and it arrived even more beautiful than I imagined. The colours were exactly what I asked for. Will definitely order again!", stars: 5, product_name: "Custom Order" },
    { customer_name: "Sara K.", review: "The geode bowl is pure art. I've received so many compliments. Shaz is incredibly talented and the packaging was gorgeous too.", stars: 5, product_name: "Rose Quartz Geode Bowl" },
    { customer_name: "Nadia F.", review: "My celestial lamp is magical. Every evening when I turn it on, it transforms the room. Worth every penny and more.", stars: 5, product_name: "Celestial Night Lamp" },
    { customer_name: "Hina T.", review: "Ordered the coaster set as a housewarming gift and the recipient was speechless. The quality is exceptional.", stars: 5, product_name: "Golden Horizon Coasters" },
    { customer_name: "Zara B.", review: "Shaz created a completely custom piece for my living room wall. She listened to every detail and delivered something beyond my expectations.", stars: 5, product_name: "Custom Order" }
  ];

  for (const r of reviews) {
    await conn.execute(
      `INSERT INTO reviews (customer_name, review, stars, product_name) VALUES (?, ?, ?, ?)`,
      [r.customer_name, r.review, r.stars, r.product_name]
    );
  }
  console.log("✅ Reviews seeded (6 reviews)");
} else {
  console.log("ℹ️  Reviews already exist");
}

// ─── Seed Gallery Photos ──────────────────────────────────────────────────────
const [galleryRows] = await conn.execute("SELECT COUNT(*) as cnt FROM gallery_photos");
if (galleryRows[0].cnt === 0) {
  const photos = [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80",
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=600&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
  ];
  for (let i = 0; i < photos.length; i++) {
    await conn.execute(
      `INSERT INTO gallery_photos (url, sort_order, is_sold, is_new) VALUES (?, ?, ?, ?)`,
      [photos[i], i, i === 3, i === 1 || i === 6]
    );
  }
  console.log("✅ Gallery seeded (12 photos)");
} else {
  console.log("ℹ️  Gallery already exists");
}

// ─── Seed Site Settings ───────────────────────────────────────────────────────
const defaultSettings = [
  ["hero_title", "Creating Colorful Dreams"],
  ["hero_subtitle", "Capturing imagination in resin."],
  ["whatsapp_number", "923001234567"],
  ["instagram_handle", "sharizkreations"],
  ["hero_video_url", ""],
];

for (const [key, value] of defaultSettings) {
  await conn.execute(
    `INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_key = setting_key`,
    [key, value]
  );
}
console.log("✅ Site settings seeded");

await conn.end();
console.log("\n🎉 Database setup complete!");
