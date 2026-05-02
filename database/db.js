const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'vitalhealth.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    slug        TEXT UNIQUE NOT NULL,
    content     TEXT DEFAULT '',
    meta_title  TEXT DEFAULT '',
    meta_desc   TEXT DEFAULT '',
    image       TEXT DEFAULT '',
    alt_text    TEXT DEFAULT '',
    category    TEXT DEFAULT 'General',
    status      TEXT DEFAULT 'published',
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS calculators (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    slug        TEXT UNIQUE NOT NULL,
    category    TEXT DEFAULT 'General',
    description TEXT DEFAULT '',
    meta_title  TEXT DEFAULT '',
    meta_desc   TEXT DEFAULT '',
    canonical   TEXT DEFAULT '',
    schema_json TEXT DEFAULT '',
    status      TEXT DEFAULT 'published',
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS media (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    filename      TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_size     INTEGER DEFAULT 0,
    mime_type     TEXT DEFAULT '',
    alt_text      TEXT DEFAULT '',
    uploaded_at   TEXT DEFAULT (datetime('now'))
  );
`);

module.exports = db;
