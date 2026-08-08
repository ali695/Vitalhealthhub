#!/usr/bin/env node
/**
 * One-off metadata repairs from the August 2026 audit (M9).
 *
 *  - Five meta descriptions were cut mid-clause by a truncation script and left with
 *    a dangling comma before the full stop ("...every job, step, workout,."). Google
 *    shows that verbatim.
 *  - Eleven titles were under 30 characters, leaving SERP width unused and giving no
 *    brand signal. Each now carries the brand and stays under the 60-char limit that
 *    validate-all-content.js enforces.
 *  - The calculators index claimed "50+" while 103 calculators exist and the nav on
 *    every page says "100+".
 *
 * Titles are kept in sync with og:title and twitter:title so the three never drift.
 * Idempotent: entries whose target text is already in place are skipped.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const DESCRIPTIONS = {
  'blog/activity-level-affects-calorie-needs.html':
    'Activity changes total daily energy expenditure through exercise and everyday movement. Learn what each activity multiplier means and how to pick yours.',
  'blog/cycling-calories-and-benefits.html':
    'Cycling builds aerobic fitness and leg endurance with low joint impact. See how calorie burn shifts with body size, speed, resistance and terrain.',
  'blog/fiber-why-not-getting-enough.html':
    'Most diets fall short on fibre when meals lean on refined grains and snacks. Learn the daily target and the simple swaps that close the gap.',
  'blog/sleep-affects-mental-health.html':
    'Sleep and mental health shape each other. See how poor sleep affects mood, focus and anxiety, and which habits break the cycle in both directions.',
  'blog/swimming-calories-and-fitness.html':
    'Swimming trains aerobic fitness and muscular endurance with almost no joint impact. See how calorie burn changes with stroke, pace and skill level.'
};

const TITLES = {
  'about.html': 'About VitalHealth Hub | Our Mission and Editorial Standards',
  'contact.html': 'Contact VitalHealth Hub | Questions and Feedback',
  'faq.html': 'Frequently Asked Questions | VitalHealth Hub',
  'privacy.html': 'Privacy Policy | VitalHealth Hub',
  'terms.html': 'Terms of Service | VitalHealth Hub',
  'disclaimer.html': 'Medical Disclaimer | VitalHealth Hub',
  'sitemap.html': 'Sitemap: Every Page on VitalHealth Hub',
  'calculators/index.html': '100+ Free Health Calculators | VitalHealth Hub',
  'calculators/heart-age-calculator.html': 'Heart Health Factor Checklist | VitalHealth Hub',
  'quizzes/gut-health-quiz.html': 'Gut Health and Microbiome Quiz | VitalHealth Hub',
  'tools/image-generator.html': 'Free AI Image Generator Tool | VitalHealth Hub'
};

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

function attributeSafe(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

const changes = [];
const problems = [];

function edit(relative, apply) {
  const file = path.join(ROOT, relative.split('/').join(path.sep));
  if (!fs.existsSync(file)) {
    problems.push(`missing file: ${relative}`);
    return;
  }
  const before = fs.readFileSync(file, 'utf8');
  const after = apply(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changes.push(relative);
  }
}

for (const [relative, description] of Object.entries(DESCRIPTIONS)) {
  if (description.length > MAX_DESCRIPTION) {
    problems.push(`description too long (${description.length}): ${relative}`);
    continue;
  }
  const safe = attributeSafe(description);
  edit(relative, (html) =>
    html
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${safe}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${safe}$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${safe}$2`)
  );
}

for (const [relative, title] of Object.entries(TITLES)) {
  if (title.length > MAX_TITLE) {
    problems.push(`title too long (${title.length}): ${relative}`);
    continue;
  }
  const safe = attributeSafe(title);
  edit(relative, (html) =>
    html
      .replace(/(<title>)[\s\S]*?(<\/title>)/, `$1${title}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${safe}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${safe}$2`)
  );
}

console.log(JSON.stringify({ filesChanged: changes.length, changes, problems }, null, 2));
if (problems.length) process.exit(1);
