import { mysqlTable, varchar, text, int, boolean, timestamp, decimal, serial } from "drizzle-orm/mysql-core";

// ─── Admin Users ──────────────────────────────────────────────────────────────
export const adminUsers = mysqlTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Products ─────────────────────────────────────────────────────────────────
export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 200 }),
  description: text("description"),
  actualPrice: decimal("actual_price", { precision: 10, scale: 2 }),
  salePrice: decimal("sale_price", { precision: 10, scale: 2 }),
  discountPercent: int("discount_percent").default(0),
  promoCode: varchar("promo_code", { length: 50 }),
  promoDiscount: int("promo_discount").default(0),
  tag: varchar("tag", { length: 100 }),
  availability: varchar("availability", { length: 50 }).default("Taking Orders"),
  images: text("images"), // JSON array of image URLs
  sortOrder: int("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// ─── Reviews ──────────────────────────────────────────────────────────────────
export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
  review: text("review").notNull(),
  stars: int("stars").default(5),
  productName: varchar("product_name", { length: 200 }),
  isApproved: boolean("is_approved").default(true),
  isVisible: boolean("is_visible").default(true),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Gallery ──────────────────────────────────────────────────────────────────
export const gallery = mysqlTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: varchar("caption", { length: 200 }),
  sortOrder: int("sort_order").default(0),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Promo Codes ──────────────────────────────────────────────────────────────
export const promoCodes = mysqlTable("promo_codes", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  discountPercent: int("discount_percent").notNull(),
  description: varchar("description", { length: 200 }),
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  usageCount: int("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// ─── Site Settings ────────────────────────────────────────────────────────────
export const siteSettings = mysqlTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
