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
  [/115\+ Free Health Calculators/g, '100+ Free Health Calculators'],
  [/View All 115\+ Calculators/g, 'View All 100+ Calculators'],
  [/50\+ Interactive Quizzes/g, '20+ Interactive Quizzes'],
  [/155\+ Expert Health Articles/g, '155 Health Articles'],
  [/Evidence-Based Tools and Insights/g, 'Practical Tools and Clear Guides'],
  [/Designed for Accuracy and Simplicity/g, 'Designed for Clarity and Simplicity'],
  [/Science-backed tools, free forever/g, 'Practical tools, free forever'],
  [/&bull; Expert reviewed/g, '&bull; Educational guide'],
  [/Get precise results tailored to your body and goals\. Understand key health metrics, track performance, and make smarter decisions[^<]*/g, 'Use this free calculator for a quick starting estimate, then interpret the result with the limits explained in the guide.'],
  [/Trusted by thousands of users for smarter health decisions\./g, 'Free to use, with no sign-up required.'],
  [/Ready to get your personalized result\?/g, 'Ready to get a starting estimate?'],
  [/instant, science-based, no sign-up needed/g, 'instant and no sign-up needed'],
  [/Free tools, science-backed insights/g, 'Free tools and clear guides'],
  [/Powerful health calculators, smart tools, and expert insights/g, 'Practical health calculators, useful tools, and clear guides'],
  [/tools trusted by millions worldwide/g, 'tools designed for everyday use'],
  [/wellness tools trusted by millions/g, 'wellness tools for everyday use'],
  [/A growing platform trusted by health-conscious users around the world\./g, 'A growing platform for people looking for practical health information and tools.'],
  [/Built with structured, evidence-based logic validated against medical guidelines\./g, 'Built to show the inputs, assumptions, and limitations behind each educational result.'],
  [/The heart beats about 100,000 times per day\. Multiply your day count by 100,000 for an approximate lifetime count\./g, 'Heart rate changes throughout the day, so a lifetime beat count based on one daily average is only a rough illustration.'],
  [/This calculator provides estimates based on established formulas\. For medical decisions, always consult a healthcare professional\./g, 'This calculator provides an educational estimate. Its usefulness depends on the stated method, the quality of the inputs, and whether it was designed for your situation.'],
  [/For tracking purposes, using the calculator monthly provides useful trend data\. More frequent use is fine for awareness\./g, 'Repeat a calculation only when the underlying inputs have changed or when a qualified professional recommends monitoring.'],
  [/Green indicates healthy\/optimal, yellow means caution\/borderline, and red suggests you should consult a healthcare professional\./g, 'Colors are interface prompts, not a diagnosis. Read the written explanation and discuss concerning results or symptoms with a qualified professional.'],
  [/Yes, improvements in diet, exercise, sleep, and stress management can positively impact most health metrics over time\./g, 'The useful next step depends on what the calculator measures. Avoid changing treatment, medication, or a child’s care based only on an online result.'],
  [/Our calculators use peer-reviewed, established medical and scientific formulas that are widely used by healthcare professionals\./g, 'Methods differ between calculators. Use a result only when the page clearly identifies the method, intended population, required inputs, and limitations.'],
  [/provides a reliable, evidence-based starting point/g, 'provides an educational starting estimate'],
  [/calculators provide evidence-based guidance, not clinical diagnosis/g, 'calculators provide general estimates, not clinical diagnosis'],
  [/Instant Accurate Results/g, 'Free Online Estimate'],
  [/instant, science-based results/g, 'an educational estimate'],
  [/Get personalized insights with healthy range guidance\./g, 'Read the result together with its assumptions and limitations.'],
  [/\/tools\/text-analyzer\.html/g, '/tools/advanced-text-analyzer.html'],
  [/\/calculators\/menopause-symptoms-calculator\.html/g, '/calculators/menopause-symptom-calculator.html'],
  [/\/calculators\/breastfeeding-calories-calculator\.html/g, '/calculators/breastfeeding-calorie-calculator.html'],
  [/\/calculators\/omega-3-calculator\.html/g, '/calculators/omega3-calculator.html'],
  [/\/calculators\/anti-inflammatory-score-calculator\.html/g, '/calculators/anti-inflammatory-score.html'],
];

let changed = 0;
for (const file of walk(root).filter((file) => file.endsWith('.html'))) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;
  for (const [pattern, replacement] of replacements) html = html.replace(pattern, replacement);
  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    changed += 1;
  }
}

console.log(`Cleaned unsupported or overstated claims on ${changed} HTML pages.`);
