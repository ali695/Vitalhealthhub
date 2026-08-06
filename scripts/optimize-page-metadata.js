const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === 'node_modules' || entry.name === '.git') return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function shorten(value, limit) {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= limit) return clean;
  const clipped = clean.slice(0, limit - 1).replace(/\s+\S*$/, '').replace(/[,:;\s–—-]+$/, '');
  return `${clipped}.`;
}

function titleFor(original, h1) {
  let title = original
    .replace(/\s*[|–—-]\s*VitalHealth Hub\s*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!title || title.length > 60) title = h1 || title;
  return shorten(title, 60);
}

const files = walk(root).filter((file) => file.endsWith('.html'));
if (files.length !== 309) throw new Error(`Expected 309 HTML pages, found ${files.length}`);

const outputs = [];
const titles = new Map();
const descriptions = new Map();
let changed = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const originalHtml = html;
  const robots = html.match(/<meta name="robots" content="([^"]+)">/i)?.[1] || '';
  const oldTitle = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const oldDescription = html.match(/<meta name="description" content="([^"]*)">/i)?.[1]?.trim();
  const h1Raw = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '';
  const h1 = h1Raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!robots || !oldTitle || !oldDescription || !h1) throw new Error(`${path.relative(root, file)}: incomplete metadata`);

  const newTitle = titleFor(oldTitle, h1);
  const newDescription = shorten(oldDescription, 155);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${newTitle}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${newDescription}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${newTitle}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${newDescription}">`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${newTitle}">`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${newDescription}">`);
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (block, value) => {
    try {
      const data = JSON.parse(value);
      if (data.description === oldDescription) data.description = newDescription;
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    } catch {
      return block;
    }
  });

  const robotsAfter = html.match(/<meta name="robots" content="([^"]+)">/i)?.[1] || '';
  if (robotsAfter !== robots) throw new Error(`${path.relative(root, file)}: robots changed`);
  const relative = path.relative(root, file).replace(/\\/g, '/');
  if (titles.has(newTitle)) throw new Error(`Duplicate optimized title: ${newTitle} (${titles.get(newTitle)}, ${relative})`);
  if (descriptions.has(newDescription)) throw new Error(`Duplicate optimized description: ${newDescription} (${descriptions.get(newDescription)}, ${relative})`);
  titles.set(newTitle, relative);
  descriptions.set(newDescription, relative);
  if (html !== originalHtml) changed += 1;
  outputs.push({ file, html });
}

for (const output of outputs) fs.writeFileSync(output.file, output.html, 'utf8');
console.log(`Optimized unique title and description metadata on ${changed} pages; robots directives were preserved.`);
