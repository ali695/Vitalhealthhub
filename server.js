const express  = require('express');
const path     = require('path');
const session  = require('express-session');

const app = express();

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://cdn.jsdelivr.net https://unpkg.com https://cdnjs.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: blob: https://images.unsplash.com https://pagead2.googlesyndication.com; " +
    "connect-src 'self'; " +
    "worker-src blob:; " +
    "frame-ancestors 'self'; " +
    "base-uri 'self';"
  );
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'vhh-admin-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'lax' }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const adminRouter = require('./server/admin');
app.use('/admin', adminRouter);

app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

app.get('/calculators/', (req, res) => {
  res.sendFile(path.join(__dirname, 'calculators', 'index.html'));
});

app.get('/quizzes/', (req, res) => {
  res.sendFile(path.join(__dirname, 'quizzes', 'index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, '0.0.0.0', () => {
  console.log('VitalHealth Hub running on port 5000');
  console.log('Admin dashboard: http://localhost:5000/admin');
});
