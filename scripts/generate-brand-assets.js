#!/usr/bin/env node
/**
 * Regenerates every raster brand asset from favicon.svg and images/logo.png.
 *
 * Fixes M1 from the August 2026 audit:
 *   - favicon.svg was a 650 KB SVG with a 1000x1000 raster embedded in it; it is now
 *     a 646-byte vector and everything below is derived from it.
 *   - images/og-default.jpg was byte-identical to logo.png: a 946x283 PNG with a .jpg
 *     extension, so every social preview was broken or letterboxed. Now a real
 *     1200x630 JPEG.
 *   - logo.png was a 231 KB unoptimised export.
 *   - the manifest declares its icons purpose:"maskable", which requires the mark to
 *     sit inside the central 80% safe zone over a full-bleed background.
 *
 * Requires sharp: npm install --no-save sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const MARK = path.join(ROOT, 'favicon.svg');
const LOGO = path.join(ROOT, 'images', 'logo.png');

const BRAND_GREEN = '#176B43';
const BRAND_ORANGE = '#F5943D';
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const results = [];

function record(file, bytes, note) {
  results.push({ file: path.relative(ROOT, file).split(path.sep).join('/'), bytes, note });
}

/** Render the vector mark at a given size, optionally over a full-bleed background. */
function renderMark(size, { background = null, inset = 0 } = {}) {
  const inner = Math.round(size * (1 - inset * 2));
  const pad = Math.round((size - inner) / 2);
  const mark = sharp(MARK, { density: 1200 }).resize(inner, inner);

  if (!background) {
    return mark.png({ compressionLevel: 9, effort: 10 }).toBuffer();
  }

  return mark
    .toBuffer()
    .then((buffer) =>
      sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background
        }
      })
        .composite([{ input: buffer, top: pad, left: pad }])
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer()
    );
}

/**
 * Minimal ICO writer. ICO has allowed PNG-compressed entries since Vista, so each
 * directory entry can simply point at a complete PNG payload.
 */
function buildIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngBuffers.length, 4);

  const entries = [];
  let offset = 6 + pngBuffers.length * 16;

  for (const { size, data } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette colours
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.data)]);
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The 1200x630 Open Graph card: brand panel, real logo, headline, domain. */
async function buildOpenGraphCard() {
  const headline = 'Free Health Calculators';
  const subhead = 'Evidence-based guides, tools and quizzes';
  const domain = 'vitalhealthhub.org';

  const backdrop = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#EAF7EF"/>
        </linearGradient>
      </defs>
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg)"/>
      <circle cx="${OG_WIDTH - 60}" cy="70" r="220" fill="${BRAND_GREEN}" opacity="0.05"/>
      <circle cx="70" cy="${OG_HEIGHT - 40}" r="180" fill="${BRAND_ORANGE}" opacity="0.06"/>
      <rect x="0" y="${OG_HEIGHT - 14}" width="${OG_WIDTH}" height="14" fill="${BRAND_GREEN}"/>
      <rect x="0" y="${OG_HEIGHT - 14}" width="${OG_WIDTH * 0.32}" height="14" fill="${BRAND_ORANGE}"/>
    </svg>`
  );

  const text = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
      <text x="100" y="396" font-family="Georgia, 'Times New Roman', serif" font-size="76"
            font-weight="700" fill="${BRAND_GREEN}">${escapeXml(headline)}</text>
      <text x="100" y="462" font-family="Arial, Helvetica, sans-serif" font-size="36"
            fill="#3F5A4C">${escapeXml(subhead)}</text>
      <text x="100" y="546" font-family="Arial, Helvetica, sans-serif" font-size="30"
            font-weight="700" fill="${BRAND_ORANGE}">${escapeXml(domain)}</text>
    </svg>`
  );

  const logo = await sharp(LOGO).resize({ width: 620 }).toBuffer();

  return sharp(backdrop)
    .composite([
      { input: logo, top: 92, left: 100 },
      { input: text, top: 0, left: 0 }
    ])
    .jpeg({ quality: 86, progressive: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
}

async function main() {
  // ---- logo: recompress in place, plus a WebP for modern clients ----
  const logoPng = await sharp(LOGO)
    .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
    .toBuffer();
  fs.writeFileSync(LOGO, logoPng);
  record(LOGO, logoPng.length, 'recompressed, dimensions unchanged');

  const logoWebp = await sharp(LOGO).webp({ quality: 88, effort: 6 }).toBuffer();
  const logoWebpPath = path.join(ROOT, 'images', 'logo.webp');
  fs.writeFileSync(logoWebpPath, logoWebp);
  record(logoWebpPath, logoWebp.length, 'new');

  // ---- Open Graph / Twitter card ----
  const og = await buildOpenGraphCard();
  const ogPath = path.join(ROOT, 'images', 'og-default.jpg');
  fs.writeFileSync(ogPath, og);
  record(ogPath, og.length, `real JPEG at ${OG_WIDTH}x${OG_HEIGHT}`);

  // ---- transparent favicons ----
  for (const size of [16, 32, 96]) {
    const buffer = await renderMark(size);
    const file = path.join(ROOT, `favicon-${size}x${size}.png`);
    fs.writeFileSync(file, buffer);
    record(file, buffer.length);
  }

  // ---- ICO bundle ----
  const icoSources = [];
  for (const size of [16, 32, 48]) {
    icoSources.push({ size, data: await renderMark(size) });
  }
  const ico = buildIco(icoSources);
  const icoPath = path.join(ROOT, 'favicon.ico');
  fs.writeFileSync(icoPath, ico);
  record(icoPath, ico.length, '16/32/48 PNG-in-ICO');

  // ---- Apple touch icon: iOS composites onto its own rounded rect, so no alpha ----
  const apple = await renderMark(180, { background: '#FFFFFF', inset: 0.06 });
  const applePath = path.join(ROOT, 'apple-touch-icon.png');
  fs.writeFileSync(applePath, apple);
  record(applePath, apple.length, 'opaque white background');

  // ---- Android / manifest icons, maskable-safe (mark inside the central 80%) ----
  for (const size of [192, 512]) {
    const buffer = await renderMark(size, { background: '#FFFFFF', inset: 0.14 });
    for (const prefix of ['android-chrome', 'web-app-manifest']) {
      const file = path.join(ROOT, `${prefix}-${size}x${size}.png`);
      fs.writeFileSync(file, buffer);
      record(file, buffer.length, 'maskable safe zone');
    }
  }

  const total = results.reduce((sum, r) => sum + r.bytes, 0);
  console.log(JSON.stringify({ assets: results, totalBytes: total }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
