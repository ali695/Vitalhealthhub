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

const replacements = [
  [/Evidence-Based Tools and Insights/g, 'Practical Tools and Clear Guides'],
  [/Designed for Accuracy and Simplicity/g, 'Designed for Clarity and Simplicity'],
  [/Science-backed tools, free forever/g, 'Practical tools, free forever'],
  [/&bull; Expert reviewed/g, '&bull; Educational guide'],
  [/Get precise results tailored to your body and goals\. Understand key health metrics, track performance, and make smarter decisions[^<]*/g, 'Use this free calculator for a quick starting estimate, then interpret the result with the limits explained in the guide.'],
  [/Trusted by thousands of users for smarter health decisions\./g, 'Free to use, with no sign-up required.'],
  [/Ready to get your personalized result\?/g, 'Ready to get a starting estimate?'],
  [/instant, science-based, no sign-up needed/g, 'instant and no sign-up needed']
];

let changed = 0;
for (const file of walk(root).filter((file) => file.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/<meta name="robots" content="index, follow">/i.test(html)) continue;
  const original = html;
  for (const [pattern, replacement] of replacements) html = html.replace(pattern, replacement);
  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    changed += 1;
  }
}

console.log(`Cleaned unsupported marketing claims on ${changed} indexable pages.`);
