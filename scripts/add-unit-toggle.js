#!/usr/bin/env node
/**
 * Adds a Metric / Imperial toggle to every calculator that takes a unit-bearing input.
 *
 * WHY THIS IS THE HIGHEST-VALUE SEO FIX ON THE CALCULATORS
 * Every calculator asked for kilograms and centimetres only. The United States is the
 * largest search market for "BMI calculator" and similar queries, and it runs on
 * pounds and feet/inches; the UK largely runs on stones and pounds. A visitor from
 * either market landed on a metric-only form and left, and that bounce is exactly the
 * signal that stops a calculator page holding a ranking.
 *
 * HOW IT WORKS WITHOUT TOUCHING 103 FORMULAS
 * Each unit-bearing input is annotated with data-unit (the metric unit the formula
 * expects). js/unit-toggle.js renders the switch, converts what the visitor sees, and
 * immediately before the page's _vhCalcFn runs it writes the metric equivalent back
 * into the field, then restores the display value afterwards.
 *
 * That means all 103 calculator functions keep receiving kg and cm exactly as before,
 * so none of them change and the 22 formula assertions keep passing unmodified.
 *
 * Idempotent.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CALC_DIR = path.join(ROOT, 'calculators');

// Metric unit in the label -> the unit the formula expects.
const UNIT_PATTERNS = [
  { match: /\(kg\)/i, unit: 'kg' },
  { match: /\(cm\)/i, unit: 'cm' },
  { match: /\(km\)/i, unit: 'km' },
  { match: /\(ml\)/i, unit: 'ml' },
  { match: /\(l\)/i, unit: 'l' }
];

const TOGGLE_MARKUP =
  '<div class="unit-toggle" role="group" aria-label="Measurement units">' +
  '<span class="unit-toggle-label">Units</span>' +
  '<div class="unit-toggle-btns">' +
  '<button type="button" class="unit-btn is-active" data-unit-system="metric" aria-pressed="true">Metric</button>' +
  '<button type="button" class="unit-btn" data-unit-system="imperial" aria-pressed="false">Imperial</button>' +
  '</div></div>';

let pagesChanged = 0;
let inputsAnnotated = 0;
let togglesAdded = 0;
let scriptsWired = 0;
const problems = [];

const files = fs
  .readdirSync(CALC_DIR)
  .filter((name) => name.endsWith('.html') && name !== 'index.html');

for (const name of files) {
  const file = path.join(CALC_DIR, name);
  const before = fs.readFileSync(file, 'utf8');
  const eol = before.includes('\r\n') ? '\r\n' : '\n';
  let html = before;
  let pageHasUnits = false;

  // Annotate each input whose label carries a metric unit.
  html = html.replace(
    /<label for="([^"]+)">([^<]*)<\/label>(\s*)<input([^>]*id="\1"[^>]*)>/gi,
    (match, id, labelText, gap, inputAttrs) => {
      const rule = UNIT_PATTERNS.find((candidate) => candidate.match.test(labelText));
      if (!rule) return match;
      pageHasUnits = true;
      if (/data-unit=/.test(inputAttrs)) return match;
      inputsAnnotated++;
      const label = labelText.replace(/\s*\([^)]*\)\s*$/, '').trim();
      return (
        `<label for="${id}">${labelText}</label>${gap}` +
        `<input${inputAttrs} data-unit="${rule.unit}" data-unit-label="${label}">`
      );
    }
  );

  if (!pageHasUnits) continue;

  // Drop the switch in just above the first field.
  if (!html.includes('class="unit-toggle"')) {
    const anchor = html.indexOf('<div class="form-group">');
    if (anchor === -1) {
      problems.push(`${name}: no .form-group to anchor the toggle`);
      continue;
    }
    html = html.slice(0, anchor) + TOGGLE_MARKUP + eol + html.slice(anchor);
    togglesAdded++;
  }

  // unit-toggle.js must run before calculators.js, which reads the fields.
  if (!html.includes('/js/unit-toggle.js')) {
    const target = '<script src="/js/calculators.js" defer></script>';
    if (!html.includes(target)) {
      problems.push(`${name}: calculators.js tag not found`);
      continue;
    }
    html = html.replace(target, `<script src="/js/unit-toggle.js" defer></script>${eol}${target}`);
    scriptsWired++;
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    pagesChanged++;
  }
}

console.log(
  JSON.stringify({ calculatorsScanned: files.length, pagesChanged, inputsAnnotated, togglesAdded, scriptsWired, problems }, null, 2)
);
if (problems.length) process.exit(1);
