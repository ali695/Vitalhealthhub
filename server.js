const express    = require('express');
const path       = require('path');
const session    = require('express-session');
const rateLimit  = require('express-rate-limit');

const app = express();

// ─── SECURITY HEADERS ────────────────────────────────────────────────────────
app.use((req, res, next) => {
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Allow iframes only from same origin (protects against clickjacking)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Referrer policy — passes origin on cross-origin requests (needed for analytics)
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict browser features we don't use
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // ── Balanced Content Security Policy ────────────────────────────────────────
  // Allows: self, Google (Analytics/GTM/AdSense/Fonts), Cloudflare, common CDNs
  // Does NOT block: inline scripts, SEO tools, AI crawlers, analytics pixels
  const csp = [
    // Default: only self (fallback for unspecified directives)
    "default-src 'self'",

    // Scripts: self + inline (needed for calc/quiz logic) + Google + CDNs
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
      "https://www.googletagmanager.com " +
      "https://www.google-analytics.com " +
      "https://ssl.google-analytics.com " +
      "https://analytics.google.com " +
      "https://pagead2.googlesyndication.com " +
      "https://adservice.google.com " +
      "https://cdn.jsdelivr.net " +
      "https://cdnjs.cloudflare.com " +
      "https://unpkg.com " +
      "https://static.cloudflareinsights.com",

    // Styles: self + inline (needed for dynamic styles) + Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

    // Fonts: self + Google Fonts CDN
    "font-src 'self' data: https://fonts.gstatic.com",

    // Images: self + data URIs + blobs + Unsplash + Pollinations AI + Google pixels
    "img-src 'self' data: blob: " +
      "https://images.unsplash.com " +
      "https://image.pollinations.ai " +
      "https://www.google-analytics.com " +
      "https://www.googletagmanager.com " +
      "https://pagead2.googlesyndication.com " +
      "https://ssl.gstatic.com " +
      "https://*.googleapis.com",

    // Connect: self + Google Analytics endpoints + Cloudflare
    "connect-src 'self' " +
      "https://www.google-analytics.com " +
      "https://analytics.google.com " +
      "https://ssl.google-analytics.com " +
      "https://www.googletagmanager.com " +
      "https://cloudflareinsights.com " +
      "https://static.cloudflareinsights.com",

    // Frames: allow Google AdSense and Tag Manager preview
    "frame-src 'self' " +
      "https://www.googletagmanager.com " +
      "https://td.doubleclick.net " +
      "https://googleads.g.doubleclick.net",

    // Workers: blob for web workers (used in some tools)
    "worker-src blob: 'self'",

    // Restrict base tag manipulation
    "base-uri 'self'",

    // Only allow self to embed this site as a frame
    "frame-ancestors 'self'"
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  next();
});

// ─── RATE LIMITING ────────────────────────────────────────────────────────────

// General rate limit for all routes: 300 requests per minute per IP
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests. Please slow down.',
  skip: (req) => {
    // Skip rate limiting for known good bots (SEO tools, AI crawlers)
    const ua = (req.headers['user-agent'] || '').toLowerCase();
    const goodBots = ['googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
      'yandexbot', 'facebot', 'ia_archiver', 'semrushbot', 'ahrefsbot',
      'mj12bot', 'dotbot', 'screaming frog', 'gptbot', 'chatgpt-user',
      'claude-web', 'anthropic-ai', 'ccbot', 'bytespider', 'petalbot'];
    return goodBots.some(bot => ua.includes(bot));
  }
});

// Strict rate limit for admin POST routes: 30 requests per minute per IP
const adminPostLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests. Please wait before trying again.'
});

app.use(generalLimiter);

// ─── SESSION ─────────────────────────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || 'vhh-admin-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' }
}));

// ─── BODY PARSING ─────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '2mb' }));

// ─── INPUT SANITIZATION MIDDLEWARE ───────────────────────────────────────────
// Strips dangerous characters from all incoming string fields
function sanitizeInput(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')  // strip script tags
    .replace(/javascript\s*:/gi, '')                        // strip js: protocol
    .replace(/on\w+\s*=/gi, '')                             // strip event handlers
    .trim();
}

function sanitizeBody(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      req.body[key] = sanitizeInput(req.body[key]);
    }
  }
  next();
}

// ─── STATIC FILES & ROUTES ───────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const adminRouter = require('./server/admin');
app.use('/admin', adminPostLimiter, sanitizeBody, adminRouter);

app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

app.get('/calculators/', (req, res) => {
  res.sendFile(path.join(__dirname, 'calculators', 'index.html'));
});

app.get('/quizzes/', (req, res) => {
  res.sendFile(path.join(__dirname, 'quizzes', 'index.html'));
});

// ─── 404 FALLBACK ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// ─── START ───────────────────────────────────────────────────────────────────
app.listen(5000, '0.0.0.0', () => {
  console.log('VitalHealth Hub running on port 5000');
  console.log('Admin dashboard: http://localhost:5000/admin');
});
