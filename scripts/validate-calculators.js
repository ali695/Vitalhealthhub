const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'calculators');
const files = fs.readdirSync(directory)
  .filter((name) => name.endsWith('.html') && name !== 'index.html')
  .sort();
const failures = [];
const report = [];

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w-]+)=(?:"([^"]*)"|'([^']*)')/g)) {
    result[match[1].toLowerCase()] = match[2] ?? match[3] ?? '';
  }
  return result;
}

function sampleValue(id, tag, html) {
  const attr = attributes(tag);
  if (tag.startsWith('<select')) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const body = html.match(new RegExp(`<select[^>]+id=["']${escaped}["'][^>]*>([\\s\\S]*?)<\\/select>`, 'i'))?.[1] || '';
    const options = [...body.matchAll(/<option(?:\s+[^>]*)?value=(?:"([^"]*)"|'([^']*)')[^>]*>/gi)]
      .map((match) => match[1] ?? match[2] ?? '')
      .filter(Boolean);
    return options[0] || 'Yes';
  }
  if (tag.startsWith('<textarea')) return 'Sample text for calculator validation.';
  if (attr.value) return attr.value;
  if (attr.type === 'date') {
    if (/date2|end/i.test(id)) return '2026-01-01';
    if (/lmp/i.test(id)) return '2026-01-01';
    return '1990-01-01';
  }
  if (attr.type === 'time') return /bed/i.test(id) ? '23:00' : '08:00';
  if (attr.type === 'number' || attr.inputmode === 'decimal' || attr.inputmode === 'numeric') {
    const placeholder = Number.parseFloat(attr.placeholder);
    if (Number.isFinite(placeholder)) return String(placeholder);
    const min = Number.parseFloat(attr.min);
    const max = Number.parseFloat(attr.max);
    if (Number.isFinite(min) && Number.isFinite(max)) return String((min + max) / 2);
    if (Number.isFinite(min)) return String(Math.max(min, 1));
    return '10';
  }
  if (/name/i.test(id)) return 'Alex';
  return 'Sample';
}

function elementMap(html) {
  const map = new Map();
  for (const match of html.matchAll(/<(input|select|textarea)\b[^>]*\bid=(?:"([^"]+)"|'([^']+)')[^>]*>/gi)) {
    const id = match[2] ?? match[3];
    map.set(id, {
      value: sampleValue(id, match[0].toLowerCase(), html),
      dataset: {},
      style: {},
      className: '',
      textContent: '',
      querySelector() { return { className: '', style: {}, textContent: '' }; },
      scrollIntoView() {},
    });
  }
  const resultChildren = new Map();
  const result = {
    className: 'result-box',
    style: {},
    textContent: '',
    querySelector(selector) {
      if (!resultChildren.has(selector)) resultChildren.set(selector, { className: '', style: {}, textContent: '' });
      return resultChildren.get(selector);
    },
    scrollIntoView() {},
  };
  map.set('result', result);
  map.set('calcPlaceholder', { style: {}, className: '', textContent: '' });
  return { map, resultChildren };
}

/**
 * The calculator function used to be an inline <script> in the page. It now lives in
 * js/page/calculators/<slug>.js so the site can run a CSP without 'unsafe-inline'.
 * Read the external file first and fall back to the inline form, so this validator
 * works against either layout.
 */
function readCalculatorSource(directory, name, html) {
  const slug = path.basename(name, '.html');
  const external = path.resolve(directory, '..', 'js', 'page', 'calculators', `${slug}.js`);
  if (fs.existsSync(external)) {
    const code = fs.readFileSync(external, 'utf8');
    const start = code.indexOf('window._vhCalcFn');
    // Slice to end of file rather than regex to the first "};" -- several calculators
    // declare an object literal (var multipliers = {...};) inside the function, and a
    // lazy match stops there and hands back a truncated, unparseable body.
    if (start !== -1) return code.slice(start);
  }
  return html.match(/<script>\s*(window\._vhCalcFn\s*=\s*function\s*\(\)\s*\{[\s\S]*?\};)\s*<\/script>/i)?.[1] || null;
}

for (const name of files) {
  const html = fs.readFileSync(path.join(directory, name), 'utf8');
  const source = readCalculatorSource(directory, name, html);
  if (!source) {
    failures.push(`${name}: calculator function not found`);
    continue;
  }

  const referencedIds = [...source.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map((match) => match[1]);
  const allPageIds = [...html.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/gi)].map((match) => match[1] ?? match[2]);
  const pageIds = new Set(allPageIds);
  const duplicateIds = [...new Set(allPageIds.filter((id, index) => allPageIds.indexOf(id) !== index))];
  if (duplicateIds.length) failures.push(`${name}: duplicate ids: ${duplicateIds.join(', ')}`);
  for (const field of html.matchAll(/<(input|select|textarea)\b[^>]*\bid=(?:"([^"]+)"|'([^']+)')[^>]*>/gi)) {
    const id = field[2] ?? field[3];
    if (id === 'ddSearchInput' || id === 'vh-chat-input') continue;
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`<label[^>]+for=["']${escaped}["']`, 'i').test(html) && !/aria-label=/i.test(field[0])) {
      failures.push(`${name}: #${id} has no programmatic label`);
    }
  }
  for (const id of referencedIds) {
    if (!pageIds.has(id)) failures.push(`${name}: formula references missing #${id}`);
  }

  const { map, resultChildren } = elementMap(html);
  let rendered = null;
  let alerted = null;
  const context = {
    window: {},
    document: {
      getElementById(id) { return map.get(id) || null; },
      querySelector() { return null; },
      querySelectorAll() { return []; },
    },
    alert(message) { alerted = String(message); },
    showResult(id, value, label, suggestion, color) {
      rendered = { id, value: String(value), label: String(label), suggestion: String(suggestion), color: String(color) };
    },
    Date,
    Math,
    crypto: {
      getRandomValues(array) {
        for (let index = 0; index < array.length; index += 1) array[index] = (index * 2654435761 + 1013904223) >>> 0;
        return array;
      },
    },
    Number,
    parseFloat,
    parseInt,
    isNaN,
    setInterval(callback) { callback(); return 1; },
    clearInterval() {},
  };
  context.window = context;
  vm.createContext(context);

  try {
    new vm.Script(source, { filename: name }).runInContext(context, { timeout: 500 });
    if (typeof context.window._vhCalcFn !== 'function') throw new Error('did not define a function');
    context.window._vhCalcFn();
    const directResult = resultChildren.get('.result-value')?.textContent;
    if (!rendered && !directResult && !alerted) throw new Error('produced no result or validation message');
    if (rendered && /(?:\bNaN\b|\bInfinity\b|\bundefined\b|\bnull\b)/i.test(`${rendered.value} ${rendered.label} ${rendered.suggestion}`)) {
      throw new Error(`produced an invalid result: ${rendered.value}`);
    }
    report.push({ name, outcome: rendered ? 'result' : directResult ? 'direct-result' : 'validation' });
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

const summary = {
  calculatorPages: files.length,
  resultSmokeTests: report.filter((item) => item.outcome !== 'validation').length,
  validationOnlyTests: report.filter((item) => item.outcome === 'validation').length,
  failures,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length) process.exit(1);
