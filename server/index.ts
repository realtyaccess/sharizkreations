import express from "express";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import { getDb } from "./db";
import { setupVite, serveStatic } from "./vite";

const JWT_SECRET = process.env.JWT_SECRET || "shariz_secret_2026";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shariz2026";

// ─── Multer (memory storage) ──────────────────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// ─── Auth middleware ──────────────────────────────────────────────────────────
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ─── DB init & seed ───────────────────────────────────────────────────────────
function initDb() {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      actual_price REAL,
      sale_price REAL,
      discount_percent INTEGER DEFAULT 0,
      promo_code TEXT,
      promo_discount INTEGER DEFAULT 0,
      tag TEXT,
      availability TEXT DEFAULT 'Taking Orders',
      images TEXT DEFAULT '[]',
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      review TEXT NOT NULL,
      stars INTEGER DEFAULT 5,
      product_name TEXT,
      is_approved INTEGER DEFAULT 1,
      is_visible INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url TEXT NOT NULL,
      caption TEXT,
      sort_order INTEGER DEFAULT 0,
      is_visible INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS promo_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      discount_percent INTEGER NOT NULL,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      expires_at TEXT,
      usage_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log("[DB] Tables ready");

  // Seed admin user
  const adminExists = db.prepare("SELECT id FROM admin_users WHERE username = 'shaz' LIMIT 1").get();
  if (!adminExists) {
    const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
    db.prepare("INSERT INTO admin_users (username, password_hash) VALUES ('shaz', ?)").run(hash);
    console.log("[DB] Admin user seeded");
  }

  // Seed products
  const prodCount = (db.prepare("SELECT COUNT(*) as cnt FROM products").get() as any).cnt;
  if (prodCount === 0) {
    const BASE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/";
    const photos = [
      "ERFeIfkLvqNXPzdq","jIdbpQhEiRCMnLjd","areGqXWMJcJCOHbY","nOBQneVaAhbNRRBb","jNpuejdVzDLQoaPg",
      "IdjZjYpQOKdRozym","OGgCqtNnqqPLIBLl","XgFJSNOMUBZPRcRI","aNoBbUDBEVXblsyX","NOWsIDbYmEWrHIuL",
      "UFEuhpnODsKwgfhb","xKkEntzJljLGFDZy","AtbbqUHZHLKxpuYX","CukTUKTSIBywqWoA","JRsbyBGqwJeSrQNk",
      "hRBtOgqiJFtuPzga","UeKwYcLmufNAGbYt","VzMrUvdCdDyChrkP","UOgJdeFDNWDkJBDc","clpIuyxNROGmmoMk",
      "lcvOXxEwwJhaUFOD","QEDLqDZsLluendoo","jgvCZOIsNMfpYjMt","XceRbpbnhagFxSlc","uFyqaYlvNDkgKuSZ","chDMHvMOxHgRHkUp",
    ].map(n => `${BASE}${n}.jpeg`);

    const insertProduct = db.prepare(
      "INSERT INTO products (name, subtitle, description, actual_price, tag, availability, images, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    const seedProducts = [
      { name: "Resin Coasters", subtitle: "Set of 4 — Handcrafted", description: "Pressed flowers, gold leaf, and crystal-clear resin. Each set is unique — no two are ever the same. Perfect for gifting or elevating your own space.", price: 50, tag: "Bestseller", avail: "Taking Orders", imgs: [photos[1],photos[2],photos[3],photos[4]], order: 1 },
      { name: "Canvas Wall Art", subtitle: "Statement Pieces", description: "Large-scale resin canvas art with swirling pigments, gold leaf, and deep ocean colors. Each piece transforms any room into a gallery.", price: 200, tag: "Statement Piece", avail: "Sold Out", imgs: [photos[5],photos[6],photos[7],photos[8]], order: 2 },
      { name: "Serving Trays", subtitle: "Luxury Home Decor", description: "Resin serving trays with marble effects, gold veining, and scalloped edges. Functional art that elevates every surface it graces.", price: 110, tag: "Luxury", avail: "Taking Orders", imgs: [photos[9],photos[10],photos[11],photos[12]], order: 3 },
      { name: "Islamic Calligraphy Art", subtitle: "Faith · Framed in Resin", description: "White marble resin base with gold Arabic calligraphy. A statement of faith and elegance, handcrafted with love and calm.", price: 150, tag: "Spiritual", avail: "Taking Orders", imgs: [photos[13],photos[14],photos[15],photos[17]], order: 4 },
      { name: "Piggy Banks & Decor", subtitle: "Whimsical Collection", description: "Galaxy resin piggy banks, bookends, and desk decor with colorful swirling patterns and gold flakes. A whimsical yet luxurious addition.", price: 60, tag: "Fan Favourite", avail: "Sold Out", imgs: [photos[18],photos[19],photos[20],photos[21]], order: 5 },
      { name: "Custom Orders", subtitle: "Your Vision, Our Craft", description: "Fully bespoke resin pieces for weddings, events, corporate gifting, and personal spaces. Share your vision and Shaz will bring it to life.", price: 0, tag: "Bespoke", avail: "Always Available", imgs: [photos[22],photos[23],photos[24],photos[25]], order: 6 },
    ];
    for (const p of seedProducts) {
      insertProduct.run(p.name, p.subtitle, p.description, p.price, p.tag, p.avail, JSON.stringify(p.imgs), p.order);
    }
    console.log("[DB] Products seeded");
  }

  // Seed reviews
  const revCount = (db.prepare("SELECT COUNT(*) as cnt FROM reviews").get() as any).cnt;
  if (revCount === 0) {
    const insertReview = db.prepare(
      "INSERT INTO reviews (customer_name, review, stars, product_name) VALUES (?, ?, ?, ?)"
    );
    insertReview.run("Neha H.", "My mom made our wedding entrance sign — sharizkreations. It was absolutely stunning and everyone was asking about it!", 5, "Custom Orders");
    insertReview.run("Yusra S.", "We're absolutely thrilled with our resin art pieces. Your support and kind words mean everything. Truly one-of-a-kind!", 5, "Canvas Wall Art");
    insertReview.run("Ree S.", "Stop scrolling! These White & Gold Floral Resin Coasters are the definition of chic elegance. Obsessed!", 5, "Resin Coasters");
    console.log("[DB] Reviews seeded");
  }

  // Seed gallery
  const galCount = (db.prepare("SELECT COUNT(*) as cnt FROM gallery").get() as any).cnt;
  if (galCount === 0) {
    const BASE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663621968227/";
    const galleryPhotos = [
      "WjduVgoEiOSCrLtq","tpgkDNcDcwRzZRkr","ROvkakjyXawoKcYM","DwNpcksYVpqmFEnX","rkrIEEvoipueWldT",
      "tkwDAwBEAZhnipTD","aHvxucdmyfjclnBU","aKgnunfDjIWLJxuN","FyWGWLQBtLQfJxkU","vJZUuAywAIQHlSPL",
      "uFTbrtEXuLaLnqNX","ePxMqCMxYlDIyZzX","pMKFlXNCUsArFhfX","xvkzrWfatDPqKpTk","XPpIrZAKvGRXHXYf",
      "AfdcKoUQQVkkcYWe","nHytsviQDJthNGgC","UPyfeUDjhWIKQuQa","uERuWSVAvqwohntt","HrvjDsdNybxizoJQ",
      "TjBltxbrliMxXJDb","rgxDWGQCsgTBUecz","cqaOIXQMMyoNtxoP","cVUPPGMCuMsSTkVC",
    ];
    const insertGallery = db.prepare("INSERT INTO gallery (image_url, sort_order) VALUES (?, ?)");
    galleryPhotos.forEach((n, i) => insertGallery.run(`${BASE}${n}.jpeg`, i + 1));
    console.log("[DB] Gallery seeded");
  }

  // Seed settings
  const settingsCount = (db.prepare("SELECT COUNT(*) as cnt FROM site_settings").get() as any).cnt;
  if (settingsCount === 0) {
    const insertSetting = db.prepare("INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)");
    insertSetting.run("heroTitle", "Handcrafted Resin Art");
    insertSetting.run("heroSubtitle", "Each piece is a one-of-a-kind creation — made with love, resin, and a little magic.");
    insertSetting.run("whatsapp", "+14039867064");
    insertSetting.run("instagram", "https://www.instagram.com/sharizkreations");
    insertSetting.run("email", "sharizkreations@gmail.com");
    insertSetting.run("footerText", "© 2026 ShaRiz Kreations. All Rights Reserved. Future Eye");
    console.log("[DB] Settings seeded");
  }

  console.log("[DB] Initialization complete");
}

// ─── Server ───────────────────────────────────────────────────────────────────
async function startServer() {
  // Initialize DB synchronously before starting server
  initDb();

  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // CORS
  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (_req.method === "OPTIONS") { res.sendStatus(200); return; }
    next();
  });

  // ── Admin Auth ────────────────────────────────────────────────────────────
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (!password) { res.status(400).json({ error: "Password required" }); return; }

    const db = getDb();

    // Check plain password first
    if (password === ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin", user: "shaz" }, JWT_SECRET, { expiresIn: "30d" });
      res.json({ token, user: "shaz" });
      return;
    }

    // Check DB
    const user = db.prepare("SELECT * FROM admin_users WHERE username = 'shaz' LIMIT 1").get() as any;
    if (user && bcrypt.compareSync(password, user.password_hash)) {
      const token = jwt.sign({ role: "admin", user: "shaz" }, JWT_SECRET, { expiresIn: "30d" });
      res.json({ token, user: "shaz" });
      return;
    }

    res.status(401).json({ error: "Invalid password" });
  });

  // ── Public endpoints ──────────────────────────────────────────────────────
  app.get("/api/public/products", (_req, res) => {
    try {
      const db = getDb();
      const rows = db.prepare("SELECT * FROM products WHERE is_active = 1 ORDER BY sort_order ASC, id ASC").all() as any[];
      res.json(rows.map(p => ({ ...p, images: tryParseJson(p.images, []) })));
    } catch (err) {
      console.error("[API] GET /public/products:", err);
      res.json([]);
    }
  });

  app.get("/api/public/reviews", (_req, res) => {
    try {
      const db = getDb();
      const rows = db.prepare("SELECT * FROM reviews WHERE is_approved = 1 AND is_visible = 1 ORDER BY sort_order ASC, id DESC").all();
      res.json(rows);
    } catch (err) {
      console.error("[API] GET /public/reviews:", err);
      res.json([]);
    }
  });

  app.get("/api/public/gallery", (_req, res) => {
    try {
      const db = getDb();
      const rows = db.prepare("SELECT * FROM gallery WHERE is_visible = 1 ORDER BY sort_order ASC, id ASC").all();
      res.json(rows);
    } catch (err) {
      console.error("[API] GET /public/gallery:", err);
      res.json([]);
    }
  });

  app.get("/api/public/settings", (_req, res) => {
    try {
      const db = getDb();
      const rows = db.prepare("SELECT key, value FROM site_settings").all() as any[];
      const settings: Record<string, string> = {};
      for (const row of rows) settings[row.key] = row.value;
      res.json(settings);
    } catch (err) {
      console.error("[API] GET /public/settings:", err);
      res.json({});
    }
  });

  // ── Admin: Products ───────────────────────────────────────────────────────
  app.get("/api/admin/products", requireAdmin, (_req, res) => {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM products ORDER BY sort_order ASC, id ASC").all() as any[];
    res.json(rows.map(p => ({ ...p, images: tryParseJson(p.images, []) })));
  });

  app.post("/api/admin/products", requireAdmin, (req, res) => {
    const db = getDb();
    const { name, subtitle, description, actual_price, sale_price, discount_percent, tag, availability, images, sort_order } = req.body;
    const result = db.prepare(
      "INSERT INTO products (name, subtitle, description, actual_price, sale_price, discount_percent, tag, availability, images, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(name, subtitle || null, description || null, actual_price || null, sale_price || null, discount_percent || 0, tag || null, availability || "Taking Orders", JSON.stringify(images || []), sort_order || 0);
    res.json({ id: result.lastInsertRowid, message: "Product created" });
  });

  app.put("/api/admin/products/:id", requireAdmin, (req, res) => {
    const db = getDb();
    const { name, subtitle, description, actual_price, sale_price, discount_percent, tag, availability, images, sort_order, is_active } = req.body;
    db.prepare(
      "UPDATE products SET name=?, subtitle=?, description=?, actual_price=?, sale_price=?, discount_percent=?, tag=?, availability=?, images=?, sort_order=?, is_active=?, updated_at=datetime('now') WHERE id=?"
    ).run(name, subtitle || null, description || null, actual_price || null, sale_price || null, discount_percent || 0, tag || null, availability, JSON.stringify(images || []), sort_order || 0, is_active !== false ? 1 : 0, req.params.id);
    res.json({ message: "Product updated" });
  });

  app.delete("/api/admin/products/:id", requireAdmin, (req, res) => {
    const db = getDb();
    db.prepare("DELETE FROM products WHERE id=?").run(req.params.id);
    res.json({ message: "Product deleted" });
  });

  // ── Admin: Reviews ────────────────────────────────────────────────────────
  app.get("/api/admin/reviews", requireAdmin, (_req, res) => {
    const db = getDb();
    res.json(db.prepare("SELECT * FROM reviews ORDER BY sort_order ASC, id DESC").all());
  });

  // POST /api/admin/reviews is also public (for customer submissions)
  app.post("/api/admin/reviews", (req, res) => {
    const db = getDb();
    const { customer_name, review, stars, product_name } = req.body;
    if (!customer_name || !review) { res.status(400).json({ error: "Name and review required" }); return; }

    // Auto-approve if admin token present
    const auth = req.headers.authorization;
    let isApproved = 0;
    if (auth?.startsWith("Bearer ")) {
      try { jwt.verify(auth.slice(7), JWT_SECRET); isApproved = 1; } catch {}
    }

    const result = db.prepare(
      "INSERT INTO reviews (customer_name, review, stars, product_name, is_approved) VALUES (?, ?, ?, ?, ?)"
    ).run(customer_name, review, stars || 5, product_name || null, isApproved);
    res.json({ id: result.lastInsertRowid, message: "Review submitted" });
  });

  app.put("/api/admin/reviews/:id", requireAdmin, (req, res) => {
    const db = getDb();
    const { customer_name, review, stars, product_name, is_approved, is_visible, sort_order } = req.body;
    db.prepare(
      "UPDATE reviews SET customer_name=?, review=?, stars=?, product_name=?, is_approved=?, is_visible=?, sort_order=? WHERE id=?"
    ).run(customer_name, review, stars || 5, product_name || null, is_approved !== false ? 1 : 0, is_visible !== false ? 1 : 0, sort_order || 0, req.params.id);
    res.json({ message: "Review updated" });
  });

  app.delete("/api/admin/reviews/:id", requireAdmin, (req, res) => {
    const db = getDb();
    db.prepare("DELETE FROM reviews WHERE id=?").run(req.params.id);
    res.json({ message: "Review deleted" });
  });

  // ── Admin: Gallery ────────────────────────────────────────────────────────
  app.get("/api/admin/gallery", requireAdmin, (_req, res) => {
    const db = getDb();
    res.json(db.prepare("SELECT * FROM gallery ORDER BY sort_order ASC, id ASC").all());
  });

  app.post("/api/admin/gallery", requireAdmin, (req, res) => {
    const db = getDb();
    const { image_url, caption, sort_order } = req.body;
    if (!image_url) { res.status(400).json({ error: "image_url required" }); return; }
    const result = db.prepare("INSERT INTO gallery (image_url, caption, sort_order) VALUES (?, ?, ?)").run(image_url, caption || null, sort_order || 0);
    res.json({ id: result.lastInsertRowid, message: "Gallery item added" });
  });

  app.put("/api/admin/gallery/:id", requireAdmin, (req, res) => {
    const db = getDb();
    const { image_url, caption, sort_order, is_visible } = req.body;
    db.prepare("UPDATE gallery SET image_url=?, caption=?, sort_order=?, is_visible=? WHERE id=?").run(image_url, caption || null, sort_order || 0, is_visible !== false ? 1 : 0, req.params.id);
    res.json({ message: "Gallery item updated" });
  });

  app.delete("/api/admin/gallery/:id", requireAdmin, (req, res) => {
    const db = getDb();
    db.prepare("DELETE FROM gallery WHERE id=?").run(req.params.id);
    res.json({ message: "Gallery item deleted" });
  });

  // ── Admin: Promo Codes ────────────────────────────────────────────────────
  app.get("/api/admin/promo-codes", requireAdmin, (_req, res) => {
    const db = getDb();
    res.json(db.prepare("SELECT * FROM promo_codes ORDER BY id DESC").all());
  });

  app.post("/api/admin/promo-codes", requireAdmin, (req, res) => {
    const db = getDb();
    const { code, discount_percent, description, is_active } = req.body;
    const result = db.prepare("INSERT INTO promo_codes (code, discount_percent, description, is_active) VALUES (?, ?, ?, ?)").run(code.toUpperCase(), discount_percent, description || null, is_active !== false ? 1 : 0);
    res.json({ id: result.lastInsertRowid, message: "Promo code created" });
  });

  app.put("/api/admin/promo-codes/:id", requireAdmin, (req, res) => {
    const db = getDb();
    const { code, discount_percent, description, is_active } = req.body;
    db.prepare("UPDATE promo_codes SET code=?, discount_percent=?, description=?, is_active=? WHERE id=?").run(code.toUpperCase(), discount_percent, description || null, is_active !== false ? 1 : 0, req.params.id);
    res.json({ message: "Promo code updated" });
  });

  app.delete("/api/admin/promo-codes/:id", requireAdmin, (req, res) => {
    const db = getDb();
    db.prepare("DELETE FROM promo_codes WHERE id=?").run(req.params.id);
    res.json({ message: "Promo code deleted" });
  });

  // ── Admin: Settings ───────────────────────────────────────────────────────
  app.get("/api/admin/settings", requireAdmin, (_req, res) => {
    const db = getDb();
    const rows = db.prepare("SELECT key, value FROM site_settings").all() as any[];
    const settings: Record<string, string> = {};
    for (const row of rows) settings[row.key] = row.value;
    res.json(settings);
  });

  app.put("/api/admin/settings", requireAdmin, (req, res) => {
    const db = getDb();
    const settings = req.body as Record<string, string>;
    const upsert = db.prepare("INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))");
    const upsertMany = db.transaction((entries: [string, string][]) => {
      for (const [key, value] of entries) upsert.run(key, value);
    });
    upsertMany(Object.entries(settings));
    res.json({ message: "Settings saved" });
  });

  // ── Image Upload ──────────────────────────────────────────────────────────
  app.post("/api/admin/upload", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) { res.status(400).json({ error: "No file uploaded" }); return; }

      const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
      const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

      if (!forgeBaseUrl || !forgeKey) {
        // Fallback: return base64 data URL
        const base64 = req.file.buffer.toString("base64");
        res.json({ url: `data:${req.file.mimetype};base64,${base64}` });
        return;
      }

      const ext = req.file.originalname.split(".").pop() || "jpg";
      const filename = `admin-uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const presignUrl = new URL("v1/storage/presign/put", forgeBaseUrl + "/");
      presignUrl.searchParams.set("path", filename);
      presignUrl.searchParams.set("content_type", req.file.mimetype);

      const presignResp = await fetch(presignUrl.toString(), {
        headers: { Authorization: `Bearer ${forgeKey}` },
      });

      if (!presignResp.ok) {
        const base64 = req.file.buffer.toString("base64");
        res.json({ url: `data:${req.file.mimetype};base64,${base64}` });
        return;
      }

      const { url: uploadUrl } = await presignResp.json() as { url: string };
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": req.file.mimetype },
        body: req.file.buffer,
      });

      res.json({ url: `/manus-storage/${filename}` });
    } catch (err) {
      console.error("[Upload] Error:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // ── Health check ──────────────────────────────────────────────────────────
  app.get("/api/health", (_req, res) => {
    const db = getDb();
    const count = (db.prepare("SELECT COUNT(*) as cnt FROM products").get() as any).cnt;
    res.json({ status: "ok", db: "sqlite", products: count });
  });

  // ── Vite / Static ─────────────────────────────────────────────────────────
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "3000");
  server.listen(port, () => {
    console.log(`[Server] Running on http://localhost:${port}/`);
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function tryParseJson(val: any, fallback: any) {
  if (!val) return fallback;
  try { return JSON.parse(val); } catch { return fallback; }
}

startServer().catch(console.error);
