#!/usr/bin/env node
/**
 * Converts inline onclick="fn(args)" attributes into data attributes plus one
 * delegated listener per page.
 *
 * CSP without 'unsafe-inline' blocks inline event handlers exactly as it blocks
 * inline <script>. Extracting the script blocks was not enough on its own: 23
 * onclick attributes were left on tools/image-generator.html and
 * tools/voice-studio.html, and every button on those two tools would have gone dead
 * the moment the stricter header shipped.
 *
 * While rewriting, the clickable <div class="example-card"> elements also gain
 * role="button", tabindex and Enter/Space handling. They were mouse-only before,
 * which is a WCAG 2.1.1 keyboard-access failure.
 *
 * Idempotent: a page with no onclick attributes left is skipped.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const PAGES = [
  { html: 'tools/image-generator.html', js: 'js/page/tools/image-generator.js' },
  { html: 'tools/voice-studio.html', js: 'js/page/tools/voice-studio.js' }
];

const DISPATCHER_MARK = 'data-vh-action dispatcher';

/** Split a JS argument list on commas that sit outside of string literals. */
function splitArguments(source) {
  const args = [];
  let current = '';
  let quote = null;
  let escaped = false;

  for (const char of source) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }
    if (char === '\\') {
      current += char;
      escaped = true;
      continue;
    }
    if (quote) {
      current += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === ',') {
      args.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  if (current.trim()) args.push(current.trim());
  return args;
}

/** Turn a JS string literal into its actual value. */
function literalValue(token) {
  const quote = token[0];
  if (quote !== '"' && quote !== "'") return null;
  if (token[token.length - 1] !== quote) return null;
  const inner = token.slice(1, -1);
  let out = '';
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '\\') {
      const next = inner[++i];
      if (next === 'n') out += '\n';
      else if (next === 't') out += '\t';
      else if (next === 'r') out += '\r';
      else out += next;
    } else {
      out += inner[i];
    }
  }
  return out;
}

function attributeEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const DISPATCHER = `

/* ${DISPATCHER_MARK}: replaces the inline onclick attributes this page used to
   carry, which a CSP without 'unsafe-inline' would refuse to run. Also gives the
   non-button triggers real keyboard support. */
(function () {
  function run(el) {
    var name = el.getAttribute('data-vh-action');
    var fn = window[name];
    if (typeof fn !== 'function') return;
    var args = [];
    for (var i = 0; el.hasAttribute('data-vh-arg' + i); i++) {
      args.push(el.getAttribute('data-vh-arg' + i));
    }
    fn.apply(null, args);
  }

  document.addEventListener('click', function (event) {
    var el = event.target.closest('[data-vh-action]');
    if (el) run(el);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    var el = event.target.closest('[data-vh-action]');
    if (!el || el.tagName === 'BUTTON') return;
    event.preventDefault();
    run(el);
  });
})();
`;

const report = [];
const problems = [];

for (const page of PAGES) {
  const htmlPath = path.join(ROOT, page.html.split('/').join(path.sep));
  const jsPath = path.join(ROOT, page.js.split('/').join(path.sep));

  if (!fs.existsSync(htmlPath) || !fs.existsSync(jsPath)) {
    problems.push(`missing file for ${page.html}`);
    continue;
  }

  const before = fs.readFileSync(htmlPath, 'utf8');
  let converted = 0;

  const after = before.replace(/<([a-z]+)(\s[^>]*?)onclick="([^"]*)"([^>]*)>/gi, (match, tag, pre, handler, post) => {
    const call = handler.trim().replace(/;$/, '').match(/^([A-Za-z_$][\w$]*)\s*\(([\s\S]*)\)$/);
    if (!call) {
      problems.push(`${page.html}: could not parse handler ${handler.slice(0, 60)}`);
      return match;
    }

    const fnName = call[1];
    const rawArgs = call[2].trim() ? splitArguments(call[2]) : [];
    const values = [];
    for (const token of rawArgs) {
      const value = literalValue(token);
      if (value === null) {
        problems.push(`${page.html}: non-literal argument in ${handler.slice(0, 60)}`);
        return match;
      }
      values.push(value);
    }

    let attrs = ` data-vh-action="${attributeEscape(fnName)}"`;
    values.forEach((value, index) => {
      attrs += ` data-vh-arg${index}="${attributeEscape(value)}"`;
    });

    // Non-button triggers were mouse-only; make them reachable and operable.
    let extra = '';
    if (tag.toLowerCase() !== 'button') {
      const rest = pre + post;
      if (!/\brole\s*=/i.test(rest)) extra += ' role="button"';
      if (!/\btabindex\s*=/i.test(rest)) extra += ' tabindex="0"';
    }

    converted++;
    return `<${tag}${pre.replace(/\s+$/, '')}${attrs}${extra}${post}>`;
  });

  if (converted) {
    fs.writeFileSync(htmlPath, after);
    const js = fs.readFileSync(jsPath, 'utf8');
    if (!js.includes(DISPATCHER_MARK)) {
      fs.writeFileSync(jsPath, js.replace(/\s*$/, '') + '\n' + DISPATCHER + '\n');
    }
  }

  report.push({ page: page.html, handlersConverted: converted });
}

console.log(JSON.stringify({ report, problems }, null, 2));
if (problems.length) process.exit(1);
