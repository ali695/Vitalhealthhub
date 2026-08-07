const crypto = require('crypto');
const express = require('express');
const path = require('path');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const SQLiteSessionStore = require('./server/sqlite-session-store');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.SESSION_SECRET || '';
const adminUsername = process.env.ADMIN_USERNAME || '';
const adminPassword = process.env.ADMIN_PASSWORD || '';

if (sessionSecret.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters');
if (!adminUsername || adminPassword.length < 12) throw new Error('ADMIN_USERNAME and an ADMIN_PASSWORD of at least 12 characters are required');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const UPLOADS = path.join(ROOT, 'uploads');
const sessionDbPath = path.resolve(ROOT, process.env.SESSION_DB_PATH || '.runtime/sessions.db');

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use((req, res, next) => {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://analytics.google.com https://pagead2.googlesyndication.com https://adservice.google.com https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://image.pollinations.ai https://www.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://ssl.gstatic.com https://*.googleapis.com",
    "connect-src 'self' https://api.frankfurter.app https://api.coingecko.com https://metals.live https://image.pollinations.ai https://www.google-analytics.com https://analytics.google.com https://ssl.google-analytics.com https://www.googletagmanager.com https://cloudflareinsights.com https://static.cloudflareinsights.com",
    "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://googleads.g.doubleclick.net",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    'upgrade-insecure-requests',
    'block-all-mixed-content',
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  if (isProduction) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many requests. Please slow down.',
});
const adminPostLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many requests. Please wait before trying again.',
});
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many login attempts. Please try again later.',
});

app.use(generalLimiter);
app.use(express.urlencoded({ extended: false, limit: '256kb', parameterLimit: 1000 }));
app.use(express.json({ limit: '256kb' }));
app.use(session({
  name: isProduction ? '__Host-vhh_admin' : 'vhh_admin_dev',
  secret: sessionSecret,
  store: new SQLiteSessionStore({ filename: sessionDbPath }),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    path: '/',
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: isProduction,
  },
}));

function safeEqual(actual, expected) {
  const actualHash = crypto.createHash('sha256').update(String(actual)).digest();
  const expectedHash = crypto.createHash('sha256').update(String(expected)).digest();
  return crypto.timingSafeEqual(actualHash, expectedHash);
}

function csrfToken(req) {
  if (!req.session.csrfToken) req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  return req.session.csrfToken;
}

function sameOrigin(req) {
  const origin = req.get('origin');
  const fetchSite = req.get('sec-fetch-site');
  if (origin) return origin === `${req.protocol}://${req.get('host')}`;
  return !fetchSite || ['same-origin', 'same-site', 'none'].includes(fetchSite);
}

function validCsrf(req) {
  const supplied = String(req.body?._csrf || req.get('x-csrf-token') || '');
  return Boolean(supplied && req.session.csrfToken && safeEqual(supplied, req.session.csrfToken));
}

function requireAdmin(req, res, next) {
  if (req.session.adminAuthenticated === true) return next();
  return res.redirect(303, '/admin/login');
}

function loginPage(token, error = '') {
  const safeError = error ? '<p role="alert" style="color:#b91c1c">Invalid username or password.</p>' : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Admin sign in | VitalHealth Hub</title><style>body{font-family:system-ui;background:#f0faf4;display:grid;place-items:center;min-height:100vh;margin:0}.card{background:#fff;padding:2rem;border-radius:16px;box-shadow:0 16px 45px #163b2d1a;width:min(360px,calc(100% - 3rem))}label{display:block;margin-top:1rem;font-weight:600}input{box-sizing:border-box;width:100%;padding:.75rem;margin-top:.35rem;border:1px solid #cbd5e1;border-radius:8px}button{width:100%;margin-top:1.25rem;padding:.8rem;border:0;border-radius:8px;background:#1b4332;color:#fff;font-weight:700}</style></head><body><main class="card"><h1>Admin sign in</h1>${safeError}<form method="post" action="/admin/login"><input type="hidden" name="_csrf" value="${token}"><label for="username">Username</label><input id="username" name="username" autocomplete="username" required><label for="password">Password</label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Sign in</button></form></main></body></html>`;
}

app.get('/admin/login', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.send(loginPage(csrfToken(req)));
});

app.post('/admin/login', loginLimiter, (req, res, next) => {
  if (!sameOrigin(req) || !validCsrf(req)) return res.status(403).send('Request verification failed.');
  if (!safeEqual(req.body.username, adminUsername) || !safeEqual(req.body.password, adminPassword)) {
    return res.status(401).send(loginPage(csrfToken(req), 'invalid'));
  }
  req.session.regenerate((error) => {
    if (error) return next(error);
    req.session.adminAuthenticated = true;
    csrfToken(req);
    res.redirect(303, '/admin');
  });
});

app.use('/admin', requireAdmin);
app.use('/admin', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  const token = csrfToken(req);
  req.verifyCsrf = () => sameOrigin(req) && validCsrf(req);

  const originalSend = res.send.bind(res);
  res.send = (body) => {
    if (res.statusCode >= 500 && typeof body === 'string' && /<pre>Error:/i.test(body)) {
      const reference = crypto.randomUUID();
      console.error(`[admin-response:${reference}] Internal admin error response suppressed`);
      body = `The operation could not be completed. Reference: ${reference}`;
    }
    if (typeof body === 'string' && /<form\b/i.test(body)) {
      const hidden = `<input type="hidden" name="_csrf" value="${token}">`;
      body = body.replace(/(<form\b[^>]*\bmethod=["']POST["'][^>]*>)/gi, `$1${hidden}`);
    }
    return originalSend(body);
  };

  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    if (!sameOrigin(req)) return res.status(403).send('Request verification failed.');
    if (req.is('multipart/form-data')) return next();
    if (!validCsrf(req)) return res.status(403).send('Request verification failed.');
  }
  next();
});
app.use('/admin', (req, res, next) => req.method === 'POST' ? adminPostLimiter(req, res, next) : next());

app.post('/admin/logout', (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie(isProduction ? '__Host-vhh_admin' : 'vhh_admin_dev', { path: '/' });
    res.redirect(303, '/admin/login');
  });
});

const adminRouter = require('./server/admin');
app.use('/admin', adminRouter);

app.use('/uploads', express.static(UPLOADS, { fallthrough: false, dotfiles: 'deny', index: false, maxAge: '1h' }));
app.use(express.static(DIST, { extensions: ['html'], dotfiles: 'deny', index: 'index.html', redirect: true }));

app.use((req, res) => {
  const notFound = path.join(DIST, '404.html');
  res.status(404);
  if (require('fs').existsSync(notFound)) return res.sendFile(notFound);
  return res.send('Page not found.');
});

app.use((error, req, res, next) => {
  const reference = crypto.randomUUID();
  console.error(`[${reference}]`, error);
  if (res.headersSent) return next(error);
  return res.status(500).send(`An unexpected error occurred. Reference: ${reference}`);
});

if (require.main === module) {
  const port = Number(process.env.PORT || 5000);
  app.listen(port, '0.0.0.0', () => console.log(`VitalHealth Hub backend listening on port ${port}`));
}

module.exports = app;
