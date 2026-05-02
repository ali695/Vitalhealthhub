const express  = require('express');
const path     = require('path');
const fs       = require('fs');
const ejs      = require('ejs');
const multer   = require('multer');
const db       = require('../database/db');
const { NAV, FOOTER, CHATBOT, BTT } = require('../shared/site-parts');

const router = express.Router();

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename:    (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-');
    cb(null, Date.now() + '-' + safe);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  }
});

const LAYOUT_PATH = path.join(__dirname, '..', 'admin', 'views', 'layout.ejs');

async function renderView(viewName, data = {}) {
  const viewPath = path.join(__dirname, '..', 'admin', 'views', viewName + '.ejs');
  const body = await ejs.renderFile(viewPath, { ...data, currentPage: viewName });
  return ejs.renderFile(LAYOUT_PATH, {
    body,
    currentPage:   viewName,
    pageTitle:     data.pageTitle     || viewName,
    topbarActions: data.topbarActions || ''
  });
}

function generateBlogHtml(post) {
  const tmplPath = path.join(__dirname, '..', 'templates', 'blog.ejs');
  return ejs.renderFile(tmplPath, {
    ...post,
    nav:     NAV,
    footer:  FOOTER,
    chatbot: CHATBOT,
    btt:     BTT
  });
}

function generateCalculatorHtml(calc) {
  const tmplPath = path.join(__dirname, '..', 'templates', 'calculator.ejs');
  return ejs.renderFile(tmplPath, {
    ...calc,
    nav:     NAV,
    footer:  FOOTER,
    chatbot: CHATBOT,
    btt:     BTT
  });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function flashMsg(req, type, msg) {
  req.session = req.session || {};
  req.session._flash = { type, msg };
}

function getFlash(req) {
  const f = (req.session || {})._flash;
  if (f) delete req.session._flash;
  return f || null;
}

/* ─── OVERVIEW ─── */
router.get('/', async (req, res) => {
  try {
    const totalBlogs    = db.prepare('SELECT COUNT(*) as c FROM blogs').get().c;
    const totalCalcs    = db.prepare('SELECT COUNT(*) as c FROM calculators').get().c;
    const totalMedia    = db.prepare('SELECT COUNT(*) as c FROM media').get().c;
    const missingMeta   = db.prepare("SELECT COUNT(*) as c FROM blogs WHERE meta_title='' OR meta_desc=''").get().c;
    const missingAlt    = db.prepare("SELECT COUNT(*) as c FROM blogs WHERE (image!='' AND alt_text='')").get().c;
    const recentBlogs   = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC LIMIT 5').all();
    const recentCalcs   = db.prepare('SELECT * FROM calculators ORDER BY created_at DESC LIMIT 5').all();
    const flash         = getFlash(req);
    const html = await renderView('overview', {
      totalBlogs, totalCalcs, totalMedia, missingMeta, missingAlt,
      recentBlogs, recentCalcs, flash,
      pageTitle: 'Overview', topbarActions: ''
    });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── BLOGS LIST ─── */
router.get('/blogs', async (req, res) => {
  try {
    const q     = req.query.q || '';
    const cat   = req.query.cat || '';
    let stmt    = 'SELECT * FROM blogs';
    const params = [];
    const conds  = [];
    if (q)   { conds.push("(title LIKE ? OR slug LIKE ?)"); params.push('%'+q+'%','%'+q+'%'); }
    if (cat) { conds.push("category=?"); params.push(cat); }
    if (conds.length) stmt += ' WHERE ' + conds.join(' AND ');
    stmt += ' ORDER BY created_at DESC';
    const blogs      = db.prepare(stmt).all(...params);
    const categories = db.prepare('SELECT DISTINCT category FROM blogs ORDER BY category').all().map(r => r.category);
    const flash      = getFlash(req);
    const topbarActions = `<a href="/admin/blogs/new" class="btn btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Post</a>
      <form method="POST" action="/admin/regenerate-blogs" style="display:inline"><button type="submit" class="btn btn-secondary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg> Regenerate All</button></form>`;
    const html = await renderView('blogs', { blogs, categories, q, cat, flash, pageTitle: 'Blog Manager', topbarActions });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── NEW BLOG FORM ─── */
router.get('/blogs/new', async (req, res) => {
  try {
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const html = await renderView('blog-form', { blog: null, mediaFiles, flash: null, pageTitle: 'New Blog Post', topbarActions: '' });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── CREATE BLOG ─── */
router.post('/blogs/new', async (req, res) => {
  try {
    const { title, slug: rawSlug, content, meta_title, meta_desc, image, alt_text, category } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!title || !slug) return res.status(400).send('Title and slug are required');
    db.prepare(`INSERT INTO blogs (title,slug,content,meta_title,meta_desc,image,alt_text,category)
                VALUES (?,?,?,?,?,?,?,?)`).run(title, slug, content||'', meta_title||'', meta_desc||'', image||'', alt_text||'', category||'General');
    const post = db.prepare('SELECT * FROM blogs WHERE slug=?').get(slug);
    const htmlContent = await generateBlogHtml(post);
    const outDir = path.join(__dirname, '..', 'blog');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    req.session._flash = { type: 'success', msg: `Blog "${title}" created and published to /blog/${slug}.html` };
    res.redirect('/admin/blogs');
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).send('A blog with that slug already exists.');
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── EDIT BLOG FORM ─── */
router.get('/blogs/:id/edit', async (req, res) => {
  try {
    const blog = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const html = await renderView('blog-form', { blog, mediaFiles, flash: null, pageTitle: 'Edit Post: ' + blog.title, topbarActions: `<a href="/blog/${blog.slug}.html" target="_blank" class="btn btn-secondary btn-sm">View Post ↗</a>` });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── UPDATE BLOG ─── */
router.post('/blogs/:id/edit', async (req, res) => {
  try {
    const { title, slug: rawSlug, content, meta_title, meta_desc, image, alt_text, category } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const old  = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    if (!old) return res.status(404).send('Blog not found');
    db.prepare(`UPDATE blogs SET title=?,slug=?,content=?,meta_title=?,meta_desc=?,image=?,alt_text=?,category=?,updated_at=datetime('now') WHERE id=?`)
      .run(title, slug, content||'', meta_title||'', meta_desc||'', image||'', alt_text||'', category||'General', req.params.id);
    const post = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    const htmlContent = await generateBlogHtml(post);
    const outDir = path.join(__dirname, '..', 'blog');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    if (old.slug !== slug && fs.existsSync(path.join(outDir, old.slug + '.html'))) {
      fs.unlinkSync(path.join(outDir, old.slug + '.html'));
    }
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    req.session._flash = { type: 'success', msg: `Blog updated and regenerated at /blog/${slug}.html` };
    res.redirect('/admin/blogs');
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── DELETE BLOG ─── */
router.post('/blogs/:id/delete', (req, res) => {
  try {
    const post = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    if (!post) return res.status(404).send('Not found');
    db.prepare('DELETE FROM blogs WHERE id=?').run(req.params.id);
    const htmlPath = path.join(__dirname, '..', 'blog', post.slug + '.html');
    if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
    req.session._flash = { type: 'info', msg: `Blog "${post.title}" deleted.` };
    res.redirect('/admin/blogs');
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── CALCULATORS LIST ─── */
router.get('/calculators', async (req, res) => {
  try {
    const calculators = db.prepare('SELECT * FROM calculators ORDER BY created_at DESC').all();
    const categories  = db.prepare('SELECT DISTINCT category FROM calculators ORDER BY category').all().map(r => r.category);
    const flash       = getFlash(req);
    const calcTopbar = `<a href="/admin/calculators/new" class="btn btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Calculator</a>`;
    const html = await renderView('calculators', { calculators, categories, flash, pageTitle: 'Calculator Manager', topbarActions: calcTopbar });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── NEW CALCULATOR FORM ─── */
router.get('/calculators/new', async (req, res) => {
  try {
    const html = await renderView('calculator-form', { calc: null, flash: null, pageTitle: 'New Calculator', topbarActions: '' });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── CREATE CALCULATOR ─── */
router.post('/calculators/new', async (req, res) => {
  try {
    const { title, slug: rawSlug, category, description, meta_title, meta_desc, canonical, schema_json } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!title || !slug) return res.status(400).send('Title required');
    db.prepare(`INSERT INTO calculators (title,slug,category,description,meta_title,meta_desc,canonical,schema_json)
                VALUES (?,?,?,?,?,?,?,?)`).run(title, slug, category||'General', description||'', meta_title||'', meta_desc||'', canonical||'', schema_json||'');
    const calc = db.prepare('SELECT * FROM calculators WHERE slug=?').get(slug);
    const htmlContent = await generateCalculatorHtml(calc);
    const outDir = path.join(__dirname, '..', 'calculators');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    req.session._flash = { type: 'success', msg: `Calculator "${title}" created at /calculators/${slug}.html` };
    res.redirect('/admin/calculators');
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).send('A calculator with that slug already exists.');
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── EDIT CALCULATOR FORM ─── */
router.get('/calculators/:id/edit', async (req, res) => {
  try {
    const calc = db.prepare('SELECT * FROM calculators WHERE id=?').get(req.params.id);
    if (!calc) return res.status(404).send('Not found');
    const html = await renderView('calculator-form', { calc, flash: null, pageTitle: 'Edit: ' + calc.title, topbarActions: '' });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── UPDATE CALCULATOR ─── */
router.post('/calculators/:id/edit', async (req, res) => {
  try {
    const { title, slug: rawSlug, category, description, meta_title, meta_desc, canonical, schema_json } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const old  = db.prepare('SELECT * FROM calculators WHERE id=?').get(req.params.id);
    if (!old) return res.status(404).send('Not found');
    db.prepare(`UPDATE calculators SET title=?,slug=?,category=?,description=?,meta_title=?,meta_desc=?,canonical=?,schema_json=?,updated_at=datetime('now') WHERE id=?`)
      .run(title, slug, category||'General', description||'', meta_title||'', meta_desc||'', canonical||'', schema_json||'', req.params.id);
    const calc = db.prepare('SELECT * FROM calculators WHERE id=?').get(req.params.id);
    const htmlContent = await generateCalculatorHtml(calc);
    const outDir = path.join(__dirname, '..', 'calculators');
    if (old.slug !== slug && fs.existsSync(path.join(outDir, old.slug + '.html'))) {
      fs.unlinkSync(path.join(outDir, old.slug + '.html'));
    }
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    req.session._flash = { type: 'success', msg: `Calculator updated at /calculators/${slug}.html` };
    res.redirect('/admin/calculators');
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── DELETE CALCULATOR ─── */
router.post('/calculators/:id/delete', (req, res) => {
  try {
    const calc = db.prepare('SELECT * FROM calculators WHERE id=?').get(req.params.id);
    if (!calc) return res.status(404).send('Not found');
    db.prepare('DELETE FROM calculators WHERE id=?').run(req.params.id);
    const htmlPath = path.join(__dirname, '..', 'calculators', calc.slug + '.html');
    if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
    req.session._flash = { type: 'info', msg: `Calculator "${calc.title}" deleted.` };
    res.redirect('/admin/calculators');
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── SEO AUDIT ─── */
router.get('/seo-audit', async (req, res) => {
  try {
    const ROOT = path.join(__dirname, '..');
    const issues = [];

    function scanDir(dir, urlBase) {
      if (!fs.existsSync(dir)) return;
      for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          if (!['node_modules','uploads','.git','admin','server','database','shared','templates','.agents','.cache','.local','.upm','.pythonlibs'].includes(f)) {
            scanDir(full, urlBase + '/' + f);
          }
        } else if (f.endsWith('.html')) {
          const url  = urlBase + '/' + f;
          const html = fs.readFileSync(full, 'utf8');
          const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
          const descMatch  = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
          const h1Match    = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
          const imgNoAlt   = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
          const issue = { url, file: full.replace(ROOT, ''), title: titleMatch?.[1]||'', desc: descMatch?.[1]||'', h1: h1Match?.[1]?.replace(/<[^>]+>/g,'')||'', imgNoAlt };
          if (!issue.title || !issue.desc || !issue.h1 || issue.imgNoAlt > 0) issues.push(issue);
        }
      }
    }
    scanDir(ROOT, '');
    const html = await renderView('seo-audit', { issues, flash: null, pageTitle: 'SEO Audit', topbarActions: '' });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── MEDIA LIBRARY ─── */
router.get('/media', async (req, res) => {
  try {
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const flash      = getFlash(req);
    const html = await renderView('media', { mediaFiles, flash, pageTitle: 'Media Library', topbarActions: '' });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── UPLOAD MEDIA ─── */
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { originalname, filename, size, mimetype } = req.file;
    const altText = req.body.alt_text || '';
    db.prepare('INSERT INTO media (filename, original_name, file_size, mime_type, alt_text) VALUES (?,?,?,?,?)')
      .run(filename, originalname, size, mimetype, altText);
    if (req.xhr || req.headers.accept?.includes('json')) {
      return res.json({ url: '/uploads/' + filename, filename });
    }
    req.session._flash = { type: 'success', msg: `"${originalname}" uploaded successfully.` };
    res.redirect('/admin/media');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* ─── DELETE MEDIA ─── */
router.post('/media/:id/delete', (req, res) => {
  try {
    const file = db.prepare('SELECT * FROM media WHERE id=?').get(req.params.id);
    if (!file) return res.status(404).send('Not found');
    db.prepare('DELETE FROM media WHERE id=?').run(req.params.id);
    const fp = path.join(UPLOADS_DIR, file.filename);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    req.session._flash = { type: 'info', msg: `"${file.original_name}" deleted.` };
    res.redirect('/admin/media');
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ─── REGENERATE ALL BLOG HTML ─── */
router.post('/regenerate-blogs', async (req, res) => {
  try {
    const blogs = db.prepare('SELECT * FROM blogs').all();
    let count = 0;
    for (const post of blogs) {
      const htmlContent = await generateBlogHtml(post);
      const outDir = path.join(__dirname, '..', 'blog');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, post.slug + '.html'), htmlContent);
      count++;
    }
    req.session._flash = { type: 'success', msg: `Regenerated ${count} blog pages.` };
    res.redirect('/admin/blogs');
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

module.exports = router;
