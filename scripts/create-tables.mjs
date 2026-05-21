import mysql from 'mysql2/promise';

// Get DB URL from environment
const DB_URL = process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/webdev_db';
const url = new URL(DB_URL);

const config = {
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),
};

console.log(`Connecting to ${config.host}:${config.port}/${config.database}...`);

let conn;
try {
  conn = await mysql.createConnection(config);
  console.log('✅ Connected!');
} catch (e) {
  console.error('❌ Connection failed:', e.message);
  process.exit(1);
}

const tables = [
  `CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS products (
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
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    review TEXT NOT NULL,
    stars INT DEFAULT 5,
    product_name VARCHAR(200),
    is_approved TINYINT(1) DEFAULT 1,
    is_visible TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url TEXT NOT NULL,
    caption VARCHAR(200),
    sort_order INT DEFAULT 0,
    is_visible TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_percent INT NOT NULL,
    description VARCHAR(200),
    is_active TINYINT(1) DEFAULT 1,
    expires_at TIMESTAMP NULL,
    usage_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
];

for (const sql of tables) {
  const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1];
  try {
    await conn.execute(sql);
    console.log(`✅ Table '${tableName}' ready`);
  } catch (e) {
    console.error(`❌ Failed to create '${tableName}':`, e.message);
  }
}

// Insert default admin user (password: shaz2024)
const bcrypt = await import('bcryptjs');
const hash = await bcrypt.default.hash('shaz2024', 10);
try {
  await conn.execute(
    `INSERT IGNORE INTO admin_users (username, password_hash) VALUES (?, ?)`,
    ['shaz', hash]
  );
  console.log('✅ Default admin user created (username: shaz, password: shaz2024)');
} catch (e) {
  console.log('Admin user already exists or error:', e.message);
}

// Insert default site settings
const defaults = [
  ['hero_image', ''],
  ['hero_title', 'Creating Colorful Dreams'],
  ['hero_subtitle', 'Handcrafted Resin Art by Shaz'],
  ['whatsapp_number', '14039867064'],
];
for (const [key, val] of defaults) {
  try {
    await conn.execute(
      `INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)`,
      [key, val]
    );
  } catch (e) {}
}
console.log('✅ Default settings inserted');

await conn.end();
console.log('\n🎉 Database setup complete!');
