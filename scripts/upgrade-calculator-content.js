const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const calculatorDir = path.join(root, 'calculators');

const sources = {
  cdcBmi: ['CDC: About BMI', 'https://www.cdc.gov/bmi/about/index.html'],
  cdcChildBmi: ['CDC: Child and teen BMI categories', 'https://www.cdc.gov/bmi/child-teen-calculator/bmi-categories.html'],
  cdcGrowth: ['CDC: Recommended growth charts', 'https://www.cdc.gov/growth-chart-training/hcp/overview/recommended.html'],
  whoWeight: ['WHO: Weight-for-age standards', 'https://www.who.int/tools/child-growth-standards/standards/weight-for-age'],
  cdcDiabetes: ['CDC: Prediabetes risk test', 'https://www.cdc.gov/prediabetes/risktest/'],
  ahaPrevent: ['American Heart Association: PREVENT calculator', 'https://professional.heart.org/en/guidelines-and-statements/about-prevent-calculator'],
  nimhDepression: ['NIMH: Depression', 'https://www.nimh.nih.gov/health/topics/depression'],
  nimhHelp: ['NIMH: Help for mental illnesses', 'https://www.nimh.nih.gov/health/find-help'],
  fdaMedicine: ['FDA: Use medicines wisely', 'https://www.fda.gov/consumers/womens-health/use-medicines-wisely'],
};

const safetyProfiles = {
  'baby-weight-calculator': {
    heading: 'Important limitation: this is not a clinical growth percentile',
    summary: 'The current tool uses a simplified age-based estimate. It does not apply the sex- and age-specific LMS data required to calculate a recognised WHO or CDC weight-for-age percentile.',
    method: 'A real growth assessment plots repeated, accurately measured weight and length values on the appropriate chart. In the United States, CDC recommends WHO standards from birth to age 2 and CDC charts from age 2 onward.',
    limit: 'Do not use this output to decide feeding, supplementation, or whether a baby is growing normally. A single weight also cannot show growth velocity.',
    action: 'Use your child’s clinician or an official growth-chart tool. Seek prompt care for poor feeding, marked sleepiness, dehydration, breathing difficulty, or concern about weight loss.',
    sourceIds: ['cdcGrowth', 'whoWeight'],
  },
  'body-fat-calculator': {
    heading: 'How to interpret this body-fat estimate',
    summary: 'Circumference equations estimate body composition; they do not directly measure fat tissue. Results can change with tape placement, posture, hydration, recent food, and the population used to develop the equation.',
    method: 'The male calculation uses waist, neck, and height. The current female calculation does not collect a hip measurement and therefore is not a complete U.S. Navy circumference calculation.',
    limit: 'Do not treat the result or colour category as a diagnosis. It may be unsuitable during pregnancy, for children, or when fluid balance or body proportions differ substantially from the source population.',
    action: 'Measure consistently and focus on trends. Use a clinician or qualified body-composition service when the number will affect medical, nutrition, or sport decisions.',
    sourceIds: ['cdcBmi'],
  },
  'child-bmi-calculator': {
    heading: 'Important limitation: child BMI requires official growth-chart data',
    summary: 'For ages 2–19, BMI must be interpreted by exact age and sex using BMI-for-age percentiles. Adult BMI categories are not appropriate for children and teenagers.',
    method: 'A valid percentile calculation uses the relevant CDC growth-chart parameters or another recognised national standard, along with accurate height, weight, birth date, measurement date, and sex.',
    limit: 'If this tool does not reproduce an official growth-chart percentile, use it only for the raw BMI calculation. It cannot diagnose underweight, overweight, obesity, or a growth problem.',
    action: 'Use the CDC child and teen calculator or discuss the child’s growth pattern with a paediatric professional. Do not start a restrictive diet from an online score.',
    sourceIds: ['cdcChildBmi', 'cdcGrowth'],
  },
  'child-growth-calculator': {
    heading: 'Important limitation: growth is a pattern, not one generated category',
    summary: 'Child growth assessment compares accurate measurements over time with age- and sex-specific reference charts. Height, weight, BMI, head circumference, development, health history, and growth velocity can all matter.',
    method: 'CDC recommends WHO standards for children from birth to age 2 and CDC charts from age 2 onward in the United States. Other countries may use their own recognised standards.',
    limit: 'This simplified result is not a diagnosis and should not be used to change feeding or treatment. One point cannot establish whether growth is healthy.',
    action: 'Record measurements and review the trend with a paediatric professional, especially after weight loss, poor feeding, persistent symptoms, or a major percentile change.',
    sourceIds: ['cdcGrowth', 'whoWeight'],
  },
  'depression-screening-calculator': {
    heading: 'This wellness score is not a diagnostic depression screen',
    summary: 'Depression can affect mood, interest, sleep, appetite, energy, concentration, movement, and thoughts of death or self-harm. Diagnosis requires an appropriate clinical assessment.',
    method: 'The current questionnaire is an educational self-check and should not be described as a validated clinical instrument unless its wording, scoring, population, and interpretation match the published instrument exactly.',
    limit: 'A low score cannot rule out depression, and a high score does not establish a diagnosis. Never delay help because of an online result.',
    action: 'Contact a qualified mental-health professional when symptoms persist or impair daily life. If you may act on thoughts of self-harm or are in immediate danger, contact local emergency services or a crisis line now.',
    sourceIds: ['nimhDepression', 'nimhHelp'],
  },
  'diabetes-risk-calculator': {
    heading: 'This score is not a diabetes diagnosis',
    summary: 'Type 2 diabetes risk depends on factors such as age, family history, activity, weight, pregnancy history, and blood glucose. Diagnosis requires appropriate laboratory testing.',
    method: 'Validated risk tests use a specified question set and scoring model. A locally created point score should not be presented as a percentage or clinical risk category unless it has been validated for that purpose.',
    limit: 'A low online score cannot rule out prediabetes or diabetes, particularly when symptoms or previous abnormal tests are present.',
    action: 'Use the official CDC risk test and discuss screening with a clinician. Seek prompt medical advice for marked thirst, frequent urination, unexplained weight loss, vomiting, or confusion.',
    sourceIds: ['cdcDiabetes'],
  },
  'heart-age-calculator': {
    heading: 'Heart age requires a validated cardiovascular-risk model',
    summary: 'Heart age translates a validated cardiovascular-risk estimate into an age comparison. It is not calculated reliably by simply adding or subtracting points for a few lifestyle answers.',
    method: 'The AHA PREVENT equations use clinical cardiovascular, kidney, and metabolic information and are intended to support clinician–patient discussions for eligible adults.',
    limit: 'The result on this page is a simplified educational score, not PREVENT-Age and not a prediction of heart attack or stroke.',
    action: 'Review blood pressure, cholesterol, diabetes, smoking, kidney health, medicines, and family history with a clinician. Seek emergency care for chest pain, stroke signs, fainting, or severe breathlessness.',
    sourceIds: ['ahaPrevent'],
  },
  'medication-dosage-calculator': {
    heading: 'Do not use this tool to choose or administer a medicine dose',
    summary: 'Weight-based arithmetic is only one part of medication dosing. The correct dose also depends on the exact drug, indication, concentration, route, age, kidney and liver function, interactions, allergies, maximum dose, and the prescriber’s instructions.',
    method: 'This tool merely divides a user-entered total milligrams-per-kilogram amount across a user-entered frequency. It does not verify that any input is appropriate for a particular medicine or patient.',
    limit: 'A mathematically correct result can still be medically dangerous. Decimal, unit, concentration, and frequency errors can cause serious harm.',
    action: 'Use only the prescription label and directions from a doctor or pharmacist. If a dose may have been taken incorrectly, contact a pharmacist, poison service, or emergency service immediately as appropriate.',
    sourceIds: ['fdaMedicine'],
  },
  'stroke-risk-calculator': {
    heading: 'This simplified score does not calculate validated stroke risk',
    summary: 'Stroke risk prediction requires a defined, validated model with the correct clinical inputs and intended population. A short point checklist cannot produce an individual probability reliably.',
    method: 'Modern cardiovascular models such as AHA PREVENT use clinical measures including blood pressure, cholesterol, kidney and metabolic factors, age, smoking, and treatment information for eligible adults.',
    limit: 'Do not interpret this page’s colour or score as a 10-year stroke probability, a diagnosis, or reassurance that symptoms are safe.',
    action: 'Discuss prevention and validated risk assessment with a clinician. Sudden facial droop, arm weakness, speech difficulty, severe imbalance, or vision loss requires emergency help immediately.',
    sourceIds: ['ahaPrevent'],
  },
};

function sourceList(ids) {
  return `<ul>${ids.map((id) => {
    const [label, url] = sources[id];
    return `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`;
  }).join('')}</ul>`;
}

function safetyArticle(profile) {
  return `<div class="ccs-article fade-in"><h2>${profile.heading}</h2><p>${profile.summary}</p><h3>Method and intended use</h3><p>${profile.method}</p><h3>Limits you should understand</h3><p>${profile.limit}</p><h3>Safer next step</h3><p>${profile.action}</p><h3>Authoritative references</h3>${sourceList(profile.sourceIds)}</div>`;
}

function generalArticle(name, description, labels, variant) {
  const inputText = labels.length ? labels.join(', ') : 'the requested inputs';
  const intros = [
    `${name} turns the information you enter into a quick educational result.`,
    `${name} is designed to make a calculation easier to repeat and understand.`,
    `${name} provides a starting estimate from the values supplied in the form.`,
  ];
  return `<div class="ccs-article fade-in"><h2>Understanding the ${name}</h2><p>${intros[variant % intros.length]} ${description}</p><h3>What the result uses</h3><p>The calculation uses ${inputText}. Check units and entries before calculating, because an incorrect input produces an incorrect output.</p><h3>How to interpret it</h3><p>Treat the result as an estimate or planning aid, not as a measurement made by a laboratory or clinician. Read the surrounding explanation to understand the intended population and what the number can—and cannot—tell you.</p><h3>Important limitations</h3><p>Equations simplify real-world variation. Results can differ from measured values because of rounding, assumptions, individual differences, and changes in circumstances. Do not use an online calculator alone to diagnose a condition, change medication, restrict a child’s diet, or ignore concerning symptoms.</p><h3>A practical next step</h3><p>Save the inputs with the result, repeat the calculation only when those inputs change, and use the trend rather than chasing small differences. Confirm high-stakes decisions with the responsible qualified professional.</p></div>`;
}

function hash(value) {
  return [...value].reduce((total, char) => ((total * 31) + char.charCodeAt(0)) >>> 0, 7);
}

const files = fs.readdirSync(calculatorDir).filter((name) => name.endsWith('.html') && name !== 'index.html');
if (files.length !== 103) throw new Error(`Expected 103 calculator pages, found ${files.length}`);

let genericUpdated = 0;
let safetyUpdated = 0;
const outputs = [];
for (const file of files) {
  const slug = file.slice(0, -5);
  const fullPath = path.join(calculatorDir, file);
  let html = fs.readFileSync(fullPath, 'utf8');
  const robots = html.match(/<meta name="robots" content="([^"]+)">/i)?.[1];
  const name = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim();
  const description = html.match(/<meta name="description" content="([^"]*)">/i)?.[1]?.trim();
  if (!robots || !name || !description) throw new Error(`${file}: missing required page metadata`);

  const firstArticle = html.match(/<div class="ccs-article fade-in"><h2>[\s\S]*?<\/div>/)?.[0];
  if (!firstArticle) throw new Error(`${file}: main explanatory article not found`);
  const safety = safetyProfiles[slug];
  if (safety) {
    html = html.replace(firstArticle, safetyArticle(safety));
    safetyUpdated += 1;
  } else if (/valuable health tool/i.test(firstArticle)) {
    const labels = [...html.matchAll(/<label for="[^"]+">([^<]+)<\/label>/g)].map((match) => match[1].trim());
    html = html.replace(firstArticle, generalArticle(name, description, labels, hash(slug)));
    genericUpdated += 1;
  }

  html = html.replace(/<p>The ([^<]+) is built for [\s\S]*?<\/p>/, '<p>This tool is intended as an educational estimate for people who understand the inputs and limitations described on this page. Whether it is appropriate depends on the calculation, your circumstances, and the decision you are trying to make.</p>');
  html = html.replace(/<p>This calculator is appropriate for adults aged 18 and above\.[\s\S]*?<\/p>/, '<p>Check the stated intended population before using the result. Children, pregnancy, diagnosed conditions, medicines, and unusual symptoms often require a different method or professional interpretation.</p>');

  const robotsAfter = html.match(/<meta name="robots" content="([^"]+)">/i)?.[1];
  if (robotsAfter !== robots) throw new Error(`${file}: robots directive changed`);
  outputs.push({ fullPath, html });
}

for (const output of outputs) fs.writeFileSync(output.fullPath, output.html, 'utf8');
console.log(`Replaced ${genericUpdated} weak calculator introductions and added ${safetyUpdated} calculator-specific safety reviews; robots directives were preserved.`);
