const express  = require('express');
const path     = require('path');
const fs       = require('fs');
const ejs      = require('ejs');
const multer   = require('multer');
const db       = require('../database/db');
const { NAV, FOOTER, CHATBOT, BTT } = require('../shared/site-parts');

const router = express.Router();
const SITE   = 'https://vitalhealthhub.com';

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

/* ── HTML generators ── */
async function generateBlogHtml(post) {
  const tags = (post.tags || '').split(',').map(t => t.trim()).filter(Boolean);
  const dateStr = post.date || (post.created_at || '').split('T')[0] || (post.created_at || '').split(' ')[0] || '';
  return ejs.renderFile(path.join(__dirname, '..', 'templates', 'blog.ejs'), {
    ...post, tags, dateStr,
    metaTitle: post.meta_title, metaDesc: post.meta_desc,
    altText: post.alt_text, createdAt: dateStr, updatedAt: post.updated_at || dateStr,
    nav: NAV, footer: FOOTER, chatbot: CHATBOT, btt: BTT
  });
}

async function generateCalculatorHtml(calc) {
  return ejs.renderFile(path.join(__dirname, '..', 'templates', 'calculator.ejs'), {
    ...calc,
    metaTitle: calc.meta_title, metaDesc: calc.meta_desc, schemaJson: calc.schema_json,
    nav: NAV, footer: FOOTER, chatbot: CHATBOT, btt: BTT
  });
}

async function generateToolHtml(tool) {
  return ejs.renderFile(path.join(__dirname, '..', 'templates', 'tool.ejs'), {
    ...tool,
    meta_title: tool.meta_title, meta_desc: tool.meta_desc,
    nav: NAV, footer: FOOTER, chatbot: CHATBOT, btt: BTT
  });
}

async function generateQuizHtml(quiz) {
  let questions = [];
  let results   = { low: {}, mid: {}, high: {} };
  try { questions = JSON.parse(quiz.questions || '[]'); } catch(e) {}
  try { results   = JSON.parse(quiz.results_json || '{}'); } catch(e) {}
  return ejs.renderFile(path.join(__dirname, '..', 'templates', 'quiz.ejs'), {
    ...quiz,
    meta_title: quiz.meta_title, meta_desc: quiz.meta_desc,
    questionsJson: JSON.stringify(questions),
    resultsJson:   JSON.stringify(results),
    nav: NAV, footer: FOOTER, chatbot: CHATBOT, btt: BTT
  });
}

/* ── Sitemap helper ── */
function updateSitemap(urlPath, action = 'add') {
  const sitemapFile = path.join(__dirname, '..', 'sitemap.xml');
  if (!fs.existsSync(sitemapFile)) return;
  let xml  = fs.readFileSync(sitemapFile, 'utf8');
  const today = new Date().toISOString().split('T')[0];
  const fullUrl = SITE + urlPath;
  if (action === 'add') {
    if (xml.includes('<loc>' + fullUrl + '</loc>')) return;
    const entry = `\n  <url>\n    <loc>${fullUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    xml = xml.replace('</urlset>', entry + '\n</urlset>');
  } else {
    const escaped = fullUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    xml = xml.replace(new RegExp(`\\s*<url>[\\s\\S]*?<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>`, 'g'), '');
  }
  fs.writeFileSync(sitemapFile, xml);
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

/* ══════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════ */
router.get('/', async (req, res) => {
  try {
    const totalPages   = db.prepare('SELECT COUNT(*) as c FROM pages').get().c;
    const totalBlogs   = db.prepare('SELECT COUNT(*) as c FROM blogs').get().c;
    const totalCalcs   = db.prepare('SELECT COUNT(*) as c FROM calculators').get().c;
    const totalTools   = db.prepare('SELECT COUNT(*) as c FROM tools').get().c;
    const totalQuizzes = db.prepare('SELECT COUNT(*) as c FROM quizzes').get().c;
    const totalMedia   = db.prepare('SELECT COUNT(*) as c FROM media').get().c;
    const missingMeta  = db.prepare("SELECT COUNT(*) as c FROM blogs WHERE meta_title='' OR meta_desc=''").get().c;
    const missingAlt   = db.prepare("SELECT COUNT(*) as c FROM blogs WHERE (image!='' AND alt_text='')").get().c;
    const recentBlogs   = db.prepare('SELECT * FROM blogs ORDER BY created_at DESC LIMIT 5').all();
    const recentCalcs   = db.prepare('SELECT * FROM calculators ORDER BY created_at DESC LIMIT 5').all();
    const recentTools   = db.prepare('SELECT * FROM tools ORDER BY created_at DESC LIMIT 5').all();
    const recentQuizzes = db.prepare('SELECT * FROM quizzes ORDER BY created_at DESC LIMIT 5').all();
    const flash = getFlash(req);
    const html = await renderView('overview', {
      totalPages, totalBlogs, totalCalcs, totalTools, totalQuizzes, totalMedia, missingMeta, missingAlt,
      recentBlogs, recentCalcs, recentTools, recentQuizzes, flash,
      pageTitle: 'Overview', topbarActions: ''
    });
    res.send(html);
  } catch (e) {
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

/* ══════════════════════════════════════════════════
   BLOGS
══════════════════════════════════════════════════ */
router.get('/blogs', async (req, res) => {
  try {
    const q   = req.query.q || '';
    const cat = req.query.cat || '';
    let stmt  = 'SELECT * FROM blogs';
    const params = [], conds = [];
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
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.get('/blogs/new', async (req, res) => {
  try {
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const html = await renderView('blog-form', { blog: null, mediaFiles, flash: null, pageTitle: 'New Blog Post', topbarActions: '' });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/blogs/new', async (req, res) => {
  try {
    const { title, slug: rawSlug, content, meta_title, meta_desc, image, alt_text, category, tags, date } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!title || !slug) return res.status(400).send('Title and slug are required');
    const today = new Date().toISOString().split('T')[0];
    db.prepare(`INSERT INTO blogs (title,slug,content,meta_title,meta_desc,image,alt_text,category,tags,date)
                VALUES (?,?,?,?,?,?,?,?,?,?)`)
      .run(title, slug, content||'', meta_title||'', meta_desc||'', image||'', alt_text||'', category||'General', tags||'', date||today);
    const post = db.prepare('SELECT * FROM blogs WHERE slug=?').get(slug);
    const htmlContent = await generateBlogHtml(post);
    const outDir = path.join(__dirname, '..', 'blog');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    updateSitemap('/blog/' + slug + '.html', 'add');
    flashMsg(req, 'success', `Blog "${title}" created and published to /blog/${slug}.html`);
    res.redirect('/admin/blogs');
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).send('A blog with that slug already exists.');
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

router.get('/blogs/:id/edit', async (req, res) => {
  try {
    const blog = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const html = await renderView('blog-form', { blog, mediaFiles, flash: null, pageTitle: 'Edit Post: ' + blog.title, topbarActions: `<a href="/blog/${blog.slug}.html" target="_blank" class="btn btn-secondary btn-sm">View Post ↗</a>` });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/blogs/:id/edit', async (req, res) => {
  try {
    const { title, slug: rawSlug, content, meta_title, meta_desc, image, alt_text, category, tags, date } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const old  = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    if (!old) return res.status(404).send('Blog not found');
    db.prepare(`UPDATE blogs SET title=?,slug=?,content=?,meta_title=?,meta_desc=?,image=?,alt_text=?,category=?,tags=?,date=?,updated_at=datetime('now') WHERE id=?`)
      .run(title, slug, content||'', meta_title||'', meta_desc||'', image||'', alt_text||'', category||'General', tags||'', date||'', req.params.id);
    const post = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    const htmlContent = await generateBlogHtml(post);
    const outDir = path.join(__dirname, '..', 'blog');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    if (old.slug !== slug) {
      if (fs.existsSync(path.join(outDir, old.slug + '.html'))) fs.unlinkSync(path.join(outDir, old.slug + '.html'));
      updateSitemap('/blog/' + old.slug + '.html', 'remove');
      updateSitemap('/blog/' + slug + '.html', 'add');
    }
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    flashMsg(req, 'success', `Blog updated and regenerated at /blog/${slug}.html`);
    res.redirect('/admin/blogs');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/blogs/:id/delete', (req, res) => {
  try {
    const post = db.prepare('SELECT * FROM blogs WHERE id=?').get(req.params.id);
    if (!post) return res.status(404).send('Not found');
    db.prepare('DELETE FROM blogs WHERE id=?').run(req.params.id);
    const htmlPath = path.join(__dirname, '..', 'blog', post.slug + '.html');
    if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
    updateSitemap('/blog/' + post.slug + '.html', 'remove');
    flashMsg(req, 'info', `Blog "${post.title}" deleted.`);
    res.redirect('/admin/blogs');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

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
    flashMsg(req, 'success', `Regenerated ${count} blog pages.`);
    res.redirect('/admin/blogs');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

/* ══════════════════════════════════════════════════
   CALCULATORS
══════════════════════════════════════════════════ */
router.get('/calculators', async (req, res) => {
  try {
    const calculators = db.prepare('SELECT * FROM calculators ORDER BY created_at DESC').all();
    const categories  = db.prepare('SELECT DISTINCT category FROM calculators ORDER BY category').all().map(r => r.category);
    const flash       = getFlash(req);
    const calcTopbar = `<a href="/admin/calculators/new" class="btn btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Calculator</a>`;
    const html = await renderView('calculators', { calculators, categories, flash, pageTitle: 'Calculator Manager', topbarActions: calcTopbar });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.get('/calculators/new', async (req, res) => {
  try {
    const html = await renderView('calculator-form', { calc: null, flash: null, pageTitle: 'New Calculator', topbarActions: '' });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/calculators/new', async (req, res) => {
  try {
    const { title, slug: rawSlug, category, description, meta_title, meta_desc, canonical, schema_json } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!title || !slug) return res.status(400).send('Title required');
    db.prepare(`INSERT INTO calculators (title,slug,category,description,meta_title,meta_desc,canonical,schema_json)
                VALUES (?,?,?,?,?,?,?,?)`)
      .run(title, slug, category||'General', description||'', meta_title||'', meta_desc||'', canonical||'', schema_json||'');
    const calc = db.prepare('SELECT * FROM calculators WHERE slug=?').get(slug);
    const htmlContent = await generateCalculatorHtml(calc);
    const outDir = path.join(__dirname, '..', 'calculators');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    updateSitemap('/calculators/' + slug + '.html', 'add');
    flashMsg(req, 'success', `Calculator "${title}" created at /calculators/${slug}.html`);
    res.redirect('/admin/calculators');
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).send('A calculator with that slug already exists.');
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

router.get('/calculators/:id/edit', async (req, res) => {
  try {
    const calc = db.prepare('SELECT * FROM calculators WHERE id=?').get(req.params.id);
    if (!calc) return res.status(404).send('Not found');
    const html = await renderView('calculator-form', { calc, flash: null, pageTitle: 'Edit: ' + calc.title, topbarActions: '' });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

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
    if (old.slug !== slug) {
      if (fs.existsSync(path.join(outDir, old.slug + '.html'))) fs.unlinkSync(path.join(outDir, old.slug + '.html'));
      updateSitemap('/calculators/' + old.slug + '.html', 'remove');
      updateSitemap('/calculators/' + slug + '.html', 'add');
    }
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    flashMsg(req, 'success', `Calculator updated at /calculators/${slug}.html`);
    res.redirect('/admin/calculators');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/calculators/:id/delete', (req, res) => {
  try {
    const calc = db.prepare('SELECT * FROM calculators WHERE id=?').get(req.params.id);
    if (!calc) return res.status(404).send('Not found');
    db.prepare('DELETE FROM calculators WHERE id=?').run(req.params.id);
    const htmlPath = path.join(__dirname, '..', 'calculators', calc.slug + '.html');
    if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
    updateSitemap('/calculators/' + calc.slug + '.html', 'remove');
    flashMsg(req, 'info', `Calculator "${calc.title}" deleted.`);
    res.redirect('/admin/calculators');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

/* ══════════════════════════════════════════════════
   TOOLS
══════════════════════════════════════════════════ */
router.get('/tools', async (req, res) => {
  try {
    const q   = req.query.q || '';
    const cat = req.query.cat || '';
    let stmt  = 'SELECT * FROM tools';
    const params = [], conds = [];
    if (q)   { conds.push("(title LIKE ? OR slug LIKE ?)"); params.push('%'+q+'%','%'+q+'%'); }
    if (cat) { conds.push("category=?"); params.push(cat); }
    if (conds.length) stmt += ' WHERE ' + conds.join(' AND ');
    stmt += ' ORDER BY created_at DESC';
    const tools      = db.prepare(stmt).all(...params);
    const categories = db.prepare('SELECT DISTINCT category FROM tools ORDER BY category').all().map(r => r.category);
    const flash      = getFlash(req);
    const topbarActions = `<a href="/admin/tools/new" class="btn btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Tool</a>`;
    const html = await renderView('tools', { tools, categories, q, cat, flash, pageTitle: 'Tools Manager', topbarActions });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.get('/tools/new', async (req, res) => {
  try {
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const html = await renderView('tool-form', { tool: null, mediaFiles, flash: null, pageTitle: 'New Tool', topbarActions: '' });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/tools/new', async (req, res) => {
  try {
    const { title, slug: rawSlug, description, category, tool_type, link, meta_title, meta_desc, image } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!title || !slug) return res.status(400).send('Title required');
    db.prepare(`INSERT INTO tools (title,slug,description,category,tool_type,link,meta_title,meta_desc,image)
                VALUES (?,?,?,?,?,?,?,?,?)`)
      .run(title, slug, description||'', category||'General', tool_type||'web', link||'', meta_title||'', meta_desc||'', image||'');
    const tool = db.prepare('SELECT * FROM tools WHERE slug=?').get(slug);
    const htmlContent = await generateToolHtml(tool);
    const outDir = path.join(__dirname, '..', 'tools');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    updateSitemap('/tools/' + slug + '.html', 'add');
    flashMsg(req, 'success', `Tool "${title}" created at /tools/${slug}.html`);
    res.redirect('/admin/tools');
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).send('A tool with that slug already exists.');
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

router.get('/tools/:id/edit', async (req, res) => {
  try {
    const tool = db.prepare('SELECT * FROM tools WHERE id=?').get(req.params.id);
    if (!tool) return res.status(404).send('Not found');
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const html = await renderView('tool-form', { tool, mediaFiles, flash: null, pageTitle: 'Edit: ' + tool.title, topbarActions: `<a href="/tools/${tool.slug}.html" target="_blank" class="btn btn-secondary btn-sm">View Tool ↗</a>` });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/tools/:id/edit', async (req, res) => {
  try {
    const { title, slug: rawSlug, description, category, tool_type, link, meta_title, meta_desc, image } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const old  = db.prepare('SELECT * FROM tools WHERE id=?').get(req.params.id);
    if (!old) return res.status(404).send('Not found');
    db.prepare(`UPDATE tools SET title=?,slug=?,description=?,category=?,tool_type=?,link=?,meta_title=?,meta_desc=?,image=?,updated_at=datetime('now') WHERE id=?`)
      .run(title, slug, description||'', category||'General', tool_type||'web', link||'', meta_title||'', meta_desc||'', image||'', req.params.id);
    const tool = db.prepare('SELECT * FROM tools WHERE id=?').get(req.params.id);
    const htmlContent = await generateToolHtml(tool);
    const outDir = path.join(__dirname, '..', 'tools');
    if (old.slug !== slug) {
      if (fs.existsSync(path.join(outDir, old.slug + '.html'))) fs.unlinkSync(path.join(outDir, old.slug + '.html'));
      updateSitemap('/tools/' + old.slug + '.html', 'remove');
      updateSitemap('/tools/' + slug + '.html', 'add');
    }
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    flashMsg(req, 'success', `Tool updated at /tools/${slug}.html`);
    res.redirect('/admin/tools');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/tools/:id/delete', (req, res) => {
  try {
    const tool = db.prepare('SELECT * FROM tools WHERE id=?').get(req.params.id);
    if (!tool) return res.status(404).send('Not found');
    db.prepare('DELETE FROM tools WHERE id=?').run(req.params.id);
    const htmlPath = path.join(__dirname, '..', 'tools', tool.slug + '.html');
    if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
    updateSitemap('/tools/' + tool.slug + '.html', 'remove');
    flashMsg(req, 'info', `Tool "${tool.title}" deleted.`);
    res.redirect('/admin/tools');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

/* ══════════════════════════════════════════════════
   QUIZZES
══════════════════════════════════════════════════ */
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = db.prepare('SELECT * FROM quizzes ORDER BY created_at DESC').all();
    const flash   = getFlash(req);
    const topbarActions = `<a href="/admin/quizzes/new" class="btn btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Quiz</a>`;
    const html = await renderView('quizzes', { quizzes, flash, pageTitle: 'Quiz Manager', topbarActions });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.get('/quizzes/new', async (req, res) => {
  try {
    const html = await renderView('quiz-form', { quiz: null, flash: null, pageTitle: 'New Quiz', topbarActions: '' });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/quizzes/new', async (req, res) => {
  try {
    const { title, slug: rawSlug, description, category, meta_title, meta_desc, questions_json, results_json } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!title || !slug) return res.status(400).send('Title required');
    let questionsStr = '[]', resultsStr = '{}';
    try { questionsStr = JSON.stringify(JSON.parse(questions_json || '[]')); } catch(e) {}
    try { resultsStr   = JSON.stringify(JSON.parse(results_json   || '{}')); } catch(e) {}
    db.prepare(`INSERT INTO quizzes (title,slug,description,category,meta_title,meta_desc,questions,results_json)
                VALUES (?,?,?,?,?,?,?,?)`)
      .run(title, slug, description||'', category||'General', meta_title||'', meta_desc||'', questionsStr, resultsStr);
    const quiz = db.prepare('SELECT * FROM quizzes WHERE slug=?').get(slug);
    const htmlContent = await generateQuizHtml(quiz);
    const outDir = path.join(__dirname, '..', 'quizzes');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    updateSitemap('/quizzes/' + slug + '.html', 'add');
    flashMsg(req, 'success', `Quiz "${title}" created at /quizzes/${slug}.html`);
    res.redirect('/admin/quizzes');
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).send('A quiz with that slug already exists.');
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

router.get('/quizzes/:id/edit', async (req, res) => {
  try {
    const quiz = db.prepare('SELECT * FROM quizzes WHERE id=?').get(req.params.id);
    if (!quiz) return res.status(404).send('Not found');
    const html = await renderView('quiz-form', { quiz, flash: null, pageTitle: 'Edit Quiz: ' + quiz.title, topbarActions: `<a href="/quizzes/${quiz.slug}.html" target="_blank" class="btn btn-secondary btn-sm">View Quiz ↗</a>` });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/quizzes/:id/edit', async (req, res) => {
  try {
    const { title, slug: rawSlug, description, category, meta_title, meta_desc, questions_json, results_json } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    const old  = db.prepare('SELECT * FROM quizzes WHERE id=?').get(req.params.id);
    if (!old) return res.status(404).send('Not found');
    let questionsStr = '[]', resultsStr = '{}';
    try { questionsStr = JSON.stringify(JSON.parse(questions_json || '[]')); } catch(e) {}
    try { resultsStr   = JSON.stringify(JSON.parse(results_json   || '{}')); } catch(e) {}
    db.prepare(`UPDATE quizzes SET title=?,slug=?,description=?,category=?,meta_title=?,meta_desc=?,questions=?,results_json=?,updated_at=datetime('now') WHERE id=?`)
      .run(title, slug, description||'', category||'General', meta_title||'', meta_desc||'', questionsStr, resultsStr, req.params.id);
    const quiz = db.prepare('SELECT * FROM quizzes WHERE id=?').get(req.params.id);
    const htmlContent = await generateQuizHtml(quiz);
    const outDir = path.join(__dirname, '..', 'quizzes');
    if (old.slug !== slug) {
      if (fs.existsSync(path.join(outDir, old.slug + '.html'))) fs.unlinkSync(path.join(outDir, old.slug + '.html'));
      updateSitemap('/quizzes/' + old.slug + '.html', 'remove');
      updateSitemap('/quizzes/' + slug + '.html', 'add');
    }
    fs.writeFileSync(path.join(outDir, slug + '.html'), htmlContent);
    flashMsg(req, 'success', `Quiz updated at /quizzes/${slug}.html`);
    res.redirect('/admin/quizzes');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/quizzes/:id/delete', (req, res) => {
  try {
    const quiz = db.prepare('SELECT * FROM quizzes WHERE id=?').get(req.params.id);
    if (!quiz) return res.status(404).send('Not found');
    db.prepare('DELETE FROM quizzes WHERE id=?').run(req.params.id);
    const htmlPath = path.join(__dirname, '..', 'quizzes', quiz.slug + '.html');
    if (fs.existsSync(htmlPath)) fs.unlinkSync(htmlPath);
    updateSitemap('/quizzes/' + quiz.slug + '.html', 'remove');
    flashMsg(req, 'info', `Quiz "${quiz.title}" deleted.`);
    res.redirect('/admin/quizzes');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

/* ══════════════════════════════════════════════════
   SEO AUDIT
══════════════════════════════════════════════════ */
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
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

/* ══════════════════════════════════════════════════
   MEDIA
══════════════════════════════════════════════════ */
router.get('/media', async (req, res) => {
  try {
    const mediaFiles = db.prepare('SELECT * FROM media ORDER BY uploaded_at DESC').all();
    const flash      = getFlash(req);
    const html = await renderView('media', { mediaFiles, flash, pageTitle: 'Media Library', topbarActions: '' });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

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
    flashMsg(req, 'success', `"${originalname}" uploaded successfully.`);
    res.redirect('/admin/media');
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/media/:id/delete', (req, res) => {
  try {
    const file = db.prepare('SELECT * FROM media WHERE id=?').get(req.params.id);
    if (!file) return res.status(404).send('Not found');
    db.prepare('DELETE FROM media WHERE id=?').run(req.params.id);
    const fp = path.join(UPLOADS_DIR, file.filename);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    flashMsg(req, 'info', `"${file.original_name}" deleted.`);
    res.redirect('/admin/media');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

/* ══════════════════════════════════════════════════
   PAGES
══════════════════════════════════════════════════ */

const PROTECTED_SLUGS = ['home','about','contact','faq','privacy','terms'];
const ROOT_DIR = path.join(__dirname, '..');

async function generatePageHtml(page) {
  return ejs.renderFile(path.join(__dirname, '..', 'templates', 'page.ejs'), {
    ...page,
    nav: NAV, footer: FOOTER, chatbot: CHATBOT, btt: BTT
  });
}

function pageOutputPath(slug) {
  if (slug === 'home') return path.join(ROOT_DIR, 'index.html');
  return path.join(ROOT_DIR, slug + '.html');
}

function pageSitemapUrl(slug) {
  return slug === 'home' ? '/' : '/' + slug + '.html';
}

router.get('/pages', async (req, res) => {
  try {
    const q            = req.query.q || '';
    const statusFilter = req.query.status || '';
    let stmt = 'SELECT * FROM pages';
    const params = [], conds = [];
    if (q)            { conds.push("(title LIKE ? OR slug LIKE ?)"); params.push('%'+q+'%','%'+q+'%'); }
    if (statusFilter) { conds.push("status=?"); params.push(statusFilter); }
    if (conds.length) stmt += ' WHERE ' + conds.join(' AND ');
    stmt += " ORDER BY CASE slug WHEN 'home' THEN 0 ELSE 1 END, title ASC";
    const pages = db.prepare(stmt).all(...params);
    const flash = getFlash(req);
    const topbarActions = `<a href="/admin/pages/new" class="btn btn-primary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> New Page</a>
      <form method="POST" action="/admin/pages/regenerate-all" style="display:inline"><button type="submit" class="btn btn-secondary"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg> Regenerate All</button></form>`;
    const html = await renderView('pages', { pages, q, statusFilter, flash, pageTitle: 'Pages Manager', topbarActions });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.get('/pages/new', async (req, res) => {
  try {
    const html = await renderView('page-form', { page: null, flash: null, pageTitle: 'New Page', topbarActions: '' });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/pages/new', async (req, res) => {
  try {
    const { title, slug: rawSlug, content, meta_title, meta_desc, canonical, page_type, status, in_nav, in_footer } = req.body;
    const slug = rawSlug ? slugify(rawSlug) : slugify(title);
    if (!title || !slug) return res.status(400).send('Title and slug are required');
    db.prepare(`INSERT INTO pages (title,slug,content,meta_title,meta_desc,canonical,page_type,status,in_nav,in_footer)
                VALUES (?,?,?,?,?,?,?,?,?,?)`)
      .run(title, slug, content||'', meta_title||'', meta_desc||'', canonical||'', page_type||'general', status||'published', in_nav?1:0, in_footer?1:0);
    const page = db.prepare('SELECT * FROM pages WHERE slug=?').get(slug);
    if (page.status === 'published') {
      const htmlContent = await generatePageHtml(page);
      fs.writeFileSync(pageOutputPath(slug), htmlContent);
      updateSitemap(pageSitemapUrl(slug), 'add');
    }
    flashMsg(req, 'success', `Page "${title}" created${page.status==='published'?' and published to '+pageSitemapUrl(slug):' as draft'}.`);
    res.redirect('/admin/pages');
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).send('A page with that slug already exists.');
    res.status(500).send(`<pre>Error: ${e.message}</pre>`);
  }
});

router.get('/pages/:id/edit', async (req, res) => {
  try {
    const page = db.prepare('SELECT * FROM pages WHERE id=?').get(req.params.id);
    if (!page) return res.status(404).send('Page not found');
    const viewUrl = pageSitemapUrl(page.slug);
    const topbarActions = `<a href="${viewUrl}" target="_blank" class="btn btn-secondary btn-sm">View Page ↗</a>`;
    const html = await renderView('page-form', { page, flash: null, pageTitle: 'Edit: ' + page.title, topbarActions });
    res.send(html);
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/pages/:id/edit', async (req, res) => {
  try {
    const { title, slug: rawSlug, content, meta_title, meta_desc, canonical, page_type, status, in_nav, in_footer } = req.body;
    const old = db.prepare('SELECT * FROM pages WHERE id=?').get(req.params.id);
    if (!old) return res.status(404).send('Page not found');
    const slug = PROTECTED_SLUGS.includes(old.slug) ? old.slug : (rawSlug ? slugify(rawSlug) : slugify(title));
    db.prepare(`UPDATE pages SET title=?,slug=?,content=?,meta_title=?,meta_desc=?,canonical=?,page_type=?,status=?,in_nav=?,in_footer=?,updated_at=datetime('now') WHERE id=?`)
      .run(title, slug, content||'', meta_title||'', meta_desc||'', canonical||'', page_type||'general', status||'published', in_nav?1:0, in_footer?1:0, req.params.id);
    const page = db.prepare('SELECT * FROM pages WHERE id=?').get(req.params.id);
    if (old.slug !== slug) {
      const oldPath = pageOutputPath(old.slug);
      if (fs.existsSync(oldPath) && old.slug !== 'home') fs.unlinkSync(oldPath);
      updateSitemap(pageSitemapUrl(old.slug), 'remove');
    }
    if (page.status === 'published') {
      const htmlContent = await generatePageHtml(page);
      fs.writeFileSync(pageOutputPath(slug), htmlContent);
      updateSitemap(pageSitemapUrl(slug), 'add');
    } else {
      updateSitemap(pageSitemapUrl(slug), 'remove');
    }
    flashMsg(req, 'success', `Page "${title}" saved${page.status==='published'?' and published':' as draft'}.`);
    res.redirect('/admin/pages');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/pages/:id/toggle-status', async (req, res) => {
  try {
    const page = db.prepare('SELECT * FROM pages WHERE id=?').get(req.params.id);
    if (!page) return res.status(404).send('Not found');
    const newStatus = page.status === 'published' ? 'draft' : 'published';
    db.prepare(`UPDATE pages SET status=?,updated_at=datetime('now') WHERE id=?`).run(newStatus, req.params.id);
    const updated = db.prepare('SELECT * FROM pages WHERE id=?').get(req.params.id);
    if (newStatus === 'published') {
      const htmlContent = await generatePageHtml(updated);
      fs.writeFileSync(pageOutputPath(page.slug), htmlContent);
      updateSitemap(pageSitemapUrl(page.slug), 'add');
      flashMsg(req, 'success', `"${page.title}" published.`);
    } else {
      updateSitemap(pageSitemapUrl(page.slug), 'remove');
      flashMsg(req, 'info', `"${page.title}" set to draft.`);
    }
    res.redirect('/admin/pages');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/pages/:id/delete', (req, res) => {
  try {
    const page = db.prepare('SELECT * FROM pages WHERE id=?').get(req.params.id);
    if (!page) return res.status(404).send('Not found');
    if (PROTECTED_SLUGS.includes(page.slug)) {
      flashMsg(req, 'error', `"${page.title}" is a core page and cannot be deleted.`);
      return res.redirect('/admin/pages');
    }
    db.prepare('DELETE FROM pages WHERE id=?').run(req.params.id);
    const outPath = pageOutputPath(page.slug);
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    updateSitemap(pageSitemapUrl(page.slug), 'remove');
    flashMsg(req, 'info', `Page "${page.title}" deleted.`);
    res.redirect('/admin/pages');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

router.post('/pages/regenerate-all', async (req, res) => {
  try {
    const pages = db.prepare("SELECT * FROM pages WHERE status='published'").all();
    let count = 0;
    for (const page of pages) {
      const htmlContent = await generatePageHtml(page);
      fs.writeFileSync(pageOutputPath(page.slug), htmlContent);
      updateSitemap(pageSitemapUrl(page.slug), 'add');
      count++;
    }
    flashMsg(req, 'success', `Regenerated ${count} page${count!==1?'s':''}.`);
    res.redirect('/admin/pages');
  } catch (e) { res.status(500).send(`<pre>Error: ${e.message}</pre>`); }
});

module.exports = router;
