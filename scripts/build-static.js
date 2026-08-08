const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const DEPLOYMENT = path.join(ROOT, 'deployment');

const PUBLIC_DIRECTORIES = [
  'author',
  'blog',
  'calculators',
  'css',
  'fonts',
  'images',
  'js',
  'quizzes',
  'sitemaps',
  'tools',
];

const ROOT_PUBLIC_EXTENSIONS = new Set([
  '.html', '.ico', '.jpg', '.jpeg', '.png', '.svg', '.webp', '.xml', '.txt', '.webmanifest',
]);

const ROOT_PUBLIC_FILES = new Set([
  'ads.txt',
  'robots.txt',
  'site.webmanifest',
  'sitemap.xml',
]);

function assertSafeDist() {
  const relative = path.relative(ROOT, DIST);
  if (relative !== 'dist' || path.dirname(DIST) !== ROOT) {
    throw new Error(`Refusing to operate on unexpected output path: ${DIST}`);
  }
}

function copyDirectory(name) {
  const source = path.join(ROOT, name);
  if (!fs.existsSync(source)) return;
  fs.cpSync(source, path.join(DIST, name), { recursive: true, force: true });
}

function copyRootAssets() {
  for (const entry of fs.readdirSync(ROOT, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const extension = path.extname(entry.name).toLowerCase();
    if (!ROOT_PUBLIC_FILES.has(entry.name) && !ROOT_PUBLIC_EXTENSIONS.has(extension)) continue;
    fs.copyFileSync(path.join(ROOT, entry.name), path.join(DIST, entry.name));
  }
}

function copyDeploymentControls() {
  for (const name of ['404.html', '_headers', '_redirects']) {
    fs.copyFileSync(path.join(DEPLOYMENT, name), path.join(DIST, name));
  }
}

function countFiles(directory) {
  let count = 0;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    count += entry.isDirectory() ? countFiles(fullPath) : 1;
  }
  return count;
}

assertSafeDist();
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

copyRootAssets();
PUBLIC_DIRECTORIES.forEach(copyDirectory);
copyDeploymentControls();

console.log(JSON.stringify({ output: DIST, files: countFiles(DIST), publicDirectories: PUBLIC_DIRECTORIES }, null, 2));
