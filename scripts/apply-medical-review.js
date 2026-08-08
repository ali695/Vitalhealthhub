#!/usr/bin/env node
/**
 * Applies "Medically reviewed by" bylines and schema.org reviewedBy, driven entirely
 * by content/medical-reviewers.json.
 *
 * This is the second half of M7 from the August 2026 audit. The first half -- an
 * author page, a stated editorial process, a linked byline -- is done. This half
 * cannot be: it needs a real licensed clinician to actually read the articles.
 *
 * So the plumbing ships empty. With no reviewers configured the script is a no-op and
 * no page claims review. Add a reviewer and the pages they signed off, re-run, and the
 * badge plus structured data appear on exactly those pages. Remove an entry and re-run
 * and it comes back off. Nothing here ever invents a reviewer.
 *
 * Idempotent, and safe to add to the build once reviewers exist.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG = path.join(ROOT, 'content', 'medical-reviewers.json');

const BADGE_START = '<!-- medical-review:start -->';
const BADGE_END = '<!-- medical-review:end -->';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(iso) {
  const date = new Date(iso + 'T00:00:00Z');
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid review date: ${iso}`);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Remove any previously applied badge and reviewedBy so re-runs stay clean. */
function stripExisting(html) {
  return html
    .replace(new RegExp(`\\s*${BADGE_START}[\\s\\S]*?${BADGE_END}`, 'g'), '')
    .replace(/,"reviewedBy":\{"@type":"Person"[^}]*\}/g, '');
}

function badgeFor(reviewer, date) {
  const label = reviewer.credential
    ? `${escapeHtml(reviewer.name)}, ${escapeHtml(reviewer.credential)}`
    : escapeHtml(reviewer.name);
  const name = reviewer.url
    ? `<a href="${escapeHtml(reviewer.url)}" rel="author">${label}</a>`
    : label;
  return (
    `${BADGE_START}<span class="medical-review-badge">&#9877;&nbsp;Medically reviewed by ` +
    `${name} &middot; ${escapeHtml(formatDate(date))}</span>${BADGE_END}`
  );
}

function reviewedBySchema(reviewer, date) {
  const person = { '@type': 'Person', name: reviewer.name };
  if (reviewer.credential) person.honorificSuffix = reviewer.credential;
  if (reviewer.jobTitle) person.jobTitle = reviewer.jobTitle;
  if (reviewer.url) person.url = reviewer.url;
  if (Array.isArray(reviewer.sameAs) && reviewer.sameAs.length) person.sameAs = reviewer.sameAs;
  return { person, date };
}

function main() {
  if (!fs.existsSync(CONFIG)) {
    throw new Error(`Missing ${path.relative(ROOT, CONFIG)}`);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG, 'utf8'));
  const reviewers = config.reviewers || {};
  const reviews = config.reviews || {};
  const entries = Object.entries(reviews);

  if (!entries.length) {
    console.log(
      JSON.stringify(
        {
          reviewedPages: 0,
          note:
            'No reviewers configured. No page claims medical review. See content/medical-reviewers.json.'
        },
        null,
        2
      )
    );
    return;
  }

  const applied = [];
  const problems = [];

  for (const [relative, entry] of entries) {
    const reviewer = reviewers[entry.reviewer];
    if (!reviewer) {
      problems.push(`${relative}: unknown reviewer "${entry.reviewer}"`);
      continue;
    }
    if (!entry.date) {
      problems.push(`${relative}: missing review date`);
      continue;
    }

    const file = path.join(ROOT, relative.split('/').join(path.sep));
    if (!fs.existsSync(file)) {
      problems.push(`${relative}: file not found`);
      continue;
    }

    let html = stripExisting(fs.readFileSync(file, 'utf8'));

    // Visible badge, immediately after the author byline in the article meta row.
    const bylinePattern = /(<span>&#9998;&nbsp;<a href="\/author\/[^"]*" rel="author">[^<]*<\/a><\/span>)/;
    if (!bylinePattern.test(html)) {
      problems.push(`${relative}: could not find the author byline to anchor the badge`);
      continue;
    }
    html = html.replace(bylinePattern, `$1${badgeFor(reviewer, entry.date)}`);

    // Structured data, appended to the BlogPosting author object.
    const { person, date } = reviewedBySchema(reviewer, entry.date);
    const schemaPattern = /("author":\{"@type":"Person","name":"[^"]*"[^}]*\})/;
    if (!schemaPattern.test(html)) {
      problems.push(`${relative}: could not find the author schema to extend`);
      continue;
    }
    html = html.replace(
      schemaPattern,
      `$1,"reviewedBy":${JSON.stringify(person)},"lastReviewed":${JSON.stringify(date)}`
    );

    fs.writeFileSync(file, html);
    applied.push(relative);
  }

  console.log(JSON.stringify({ reviewedPages: applied.length, applied, problems }, null, 2));
  if (problems.length) process.exit(1);
}

main();
