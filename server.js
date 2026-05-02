const express  = require('express');
const path     = require('path');
const session  = require('express-session');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'vhh-admin-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
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

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, '0.0.0.0', () => {
  console.log('VitalHealth Hub running on port 5000');
  console.log('Admin dashboard: http://localhost:5000/admin');
});
