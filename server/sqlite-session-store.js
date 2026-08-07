const fs = require('fs');
const path = require('path');
const session = require('express-session');
const Database = require('better-sqlite3');

class SQLiteSessionStore extends session.Store {
  constructor(options = {}) {
    super();
    if (!options.filename) throw new Error('A session database filename is required');
    fs.mkdirSync(path.dirname(options.filename), { recursive: true });
    this.db = new Database(options.filename);
    this.db.pragma('journal_mode = WAL');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        sid TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        expires INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS sessions_expires_idx ON sessions(expires);
    `);
    this.prune = this.db.prepare('DELETE FROM sessions WHERE expires <= ?');
    this.timer = setInterval(() => this.prune.run(Date.now()), options.pruneIntervalMs || 15 * 60 * 1000);
    this.timer.unref();
  }

  get(sid, callback) {
    try {
      const row = this.db.prepare('SELECT data, expires FROM sessions WHERE sid = ?').get(sid);
      if (!row || row.expires <= Date.now()) {
        if (row) this.db.prepare('DELETE FROM sessions WHERE sid = ?').run(sid);
        return callback(null, null);
      }
      callback(null, JSON.parse(row.data));
    } catch (error) {
      callback(error);
    }
  }

  set(sid, value, callback = () => {}) {
    try {
      const cookieExpiry = value?.cookie?.expires ? new Date(value.cookie.expires).getTime() : NaN;
      const expires = Number.isFinite(cookieExpiry) ? cookieExpiry : Date.now() + 8 * 60 * 60 * 1000;
      this.db.prepare(`
        INSERT INTO sessions (sid, data, expires) VALUES (?, ?, ?)
        ON CONFLICT(sid) DO UPDATE SET data = excluded.data, expires = excluded.expires
      `).run(sid, JSON.stringify(value), expires);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  destroy(sid, callback = () => {}) {
    try {
      this.db.prepare('DELETE FROM sessions WHERE sid = ?').run(sid);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  touch(sid, value, callback = () => {}) {
    try {
      const cookieExpiry = value?.cookie?.expires ? new Date(value.cookie.expires).getTime() : NaN;
      const expires = Number.isFinite(cookieExpiry) ? cookieExpiry : Date.now() + 8 * 60 * 60 * 1000;
      this.db.prepare('UPDATE sessions SET expires = ? WHERE sid = ?').run(expires, sid);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = SQLiteSessionStore;
