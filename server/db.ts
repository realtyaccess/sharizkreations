import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store the DB file in the project root (persistent across restarts)
const DB_PATH = path.resolve(__dirname, "..", "shariz.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    // Enable WAL mode for better performance
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    console.log(`[DB] SQLite database opened at: ${DB_PATH}`);
  }
  return _db;
}
