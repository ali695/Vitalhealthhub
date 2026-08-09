/**
 * BMI calculator page content, written to content/CONTENT-STANDARD.md.
 *
 * Replaces boilerplate that was identical across all 103 calculators, plus a factual
 * error (the old copy claimed BMI "estimates body fat" -- it does not, it is a
 * weight-for-height ratio) and a link that pointed the BMI page at itself.
 *
 * Every citation below was checked to resolve and supports a specific threshold in
 * the sentence it sits next to.
 */
module.exports = {
  slug: 'bmi-calculator',
  faqHeading: 'Frequently Asked Questions About BMI',

  // Featured-snippet target. Answer first, context second.
  answer: `Body mass index is your weight in kilograms divided by the square of your
    height in metres. For most adults, a BMI between 18.5 and 24.9 sits in the healthy
    range, 25 to 29.9 counts as overweight, and 30 or above is classified as obesity.
    It is a screening number, not a diagnosis: it tells you how your weight compares
    with your height, and nothing about how much of that weight is muscle, bone or
    fat.`,

  sections: [
    {
      h2: 'BMI ranges for adults',
      html: `<p>These cut-offs come from the <a href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noopener noreferrer">World Health Organization</a> and are used by the <a href="https://www.nhlbi.nih.gov/health/overweight-and-obesity" target="_blank" rel="noopener noreferrer">NIH</a> and the <a href="https://www.nhs.uk/conditions/obesity/" target="_blank" rel="noopener noreferrer">NHS</a> alike. They apply to adults aged 20 and over.</p>
<table class="data-table">
<caption>Adult BMI categories (kg/m&sup2;)</caption>
<thead><tr><th scope="col">BMI</th><th scope="col">Category</th></tr></thead>
<tbody>
<tr><td>Below 18.5</td><td>Underweight</td></tr>
<tr><td>18.5 &ndash; 24.9</td><td>Healthy weight</td></tr>
<tr><td>25.0 &ndash; 29.9</td><td>Overweight</td></tr>
<tr><td>30.0 &ndash; 34.9</td><td>Obesity, class I</td></tr>
<tr><td>35.0 &ndash; 39.9</td><td>Obesity, class II</td></tr>
<tr><td>40.0 and above</td><td>Obesity, class III</td></tr>
</tbody></table>
<p><strong>These thresholds change if you are of South Asian, Chinese, or other Asian background.</strong> A WHO expert consultation found that health risk rises at a lower body weight in these populations, and the <a href="https://www.nhs.uk/conditions/obesity/" target="_blank" rel="noopener noreferrer">NHS</a> now advises a threshold of 23 for overweight and 27.5 for obesity rather than 25 and 30. If that applies to you, read your result against the lower figures.</p>`
    },
    {
      h2: 'The formula, and what it actually measures',
      html: `<p>BMI = weight (kg) &divide; height (m)&sup2;. At 70&nbsp;kg and 1.75&nbsp;m: 70 &divide; (1.75 &times; 1.75) = 22.9.</p>
<p>Working in pounds and inches, the same calculation is weight (lb) &divide; height (in)&sup2; &times; 703. The 703 exists purely to convert imperial units into the metric ratio, which is why the number you get is identical either way. This page does that conversion for you when you switch to imperial.</p>
<p>Notice what is not in the equation: age, sex, muscle mass, bone density, and where you carry weight. The index was devised in the 1830s by Adolphe Quetelet as a way to describe populations, and Ancel Keys gave it the name "body mass index" in 1972 while recommending it for exactly that &mdash; comparing groups, not diagnosing individuals.</p>`
    },
    {
      h2: 'Reading your own number',
      html: `<p><strong>Below 18.5.</strong> Being underweight carries its own risks, including reduced bone density and weakened immune response. Unintentional weight loss is the part worth acting on: if you have lost weight without trying, that is a reason to see a doctor regardless of what the number says.</p>
<p><strong>18.5 to 24.9.</strong> Your weight is proportionate to your height. This says nothing about your blood pressure, blood glucose, or cholesterol, all of which can be unhealthy at any BMI. A normal BMI is not a clean bill of health.</p>
<p><strong>25 to 29.9.</strong> Risk of type 2 diabetes, high blood pressure and cardiovascular disease begins to rise across this band, but the rise is gradual and heavily modified by fitness, waist measurement and family history. A fit, active person at 27 is in a different position from an inactive person at the same number.</p>
<p><strong>30 and above.</strong> The association with type 2 diabetes, cardiovascular disease and several cancers is strongest here, and it is worth a conversation with a clinician rather than a self-directed plan. Losing 5 to 10&nbsp;per&nbsp;cent of body weight measurably improves blood pressure and blood glucose, which is a far more achievable target than reaching a "normal" BMI.</p>`
    },
    {
      h2: 'Where BMI gets it wrong',
      html: `<p>BMI cannot distinguish muscle from fat. A rugby player and a sedentary person of the same height and weight get the same score, and for the athlete that score is meaningless. This is the index's best-known failure and it is real, though it affects fewer people than it is usually invoked for.</p>
<p>It also misreads older adults in the opposite direction. Muscle mass falls with age while fat increases, so someone can hold a "healthy" BMI into their seventies while carrying more fat than the number suggests.</p>
<p><strong>It ignores where you carry weight, which matters more than the total.</strong> Fat around the abdomen carries higher metabolic risk than fat on the hips and thighs. This is why waist circumference is the useful companion measurement: NHS guidance puts raised risk at over 94&nbsp;cm (37&nbsp;in) for men and over 80&nbsp;cm (31.5&nbsp;in) for women, whatever the BMI says.</p>
<p><strong>It does not apply to children, teenagers, or pregnancy.</strong> Under 20, BMI is read against age-and-sex percentile charts rather than fixed cut-offs, because healthy body composition changes throughout growth &mdash; use the <a href="https://www.cdc.gov/bmi/child-teen-calculator/index.html" target="_blank" rel="noopener noreferrer">CDC child and teen calculator</a> instead. During pregnancy the number is not interpretable at all.</p>`
    },
    {
      h2: 'What to do with the result',
      html: `<p>Measure your waist. Take it at the midpoint between your lowest rib and the top of your hip bone, breathing out normally. Paired with BMI it tells you considerably more than either does alone.</p>
<p>Track the direction, not the decimal. A BMI moving from 29 to 27 over six months is the meaningful signal; the difference between 24.6 and 24.9 is measurement noise.</p>
<p>Get the numbers BMI cannot see. Blood pressure, fasting glucose and a lipid panel describe metabolic health directly, and any of them can be abnormal at a perfectly ordinary BMI.</p>`
    }
  ],

  faqs: [
    {
      q: 'Is BMI accurate for athletes?',
      a: 'Often not. Muscle is denser than fat, so a well-muscled athlete can score in the overweight or obese range while carrying very little body fat. If you train seriously with weights, body fat percentage and waist circumference describe you far better than BMI does.'
    },
    {
      q: 'What is a healthy BMI for women compared with men?',
      a: 'The same: 18.5 to 24.9 for both. Women typically carry a higher percentage of body fat at an identical BMI, which is normal and healthy, but the categories themselves are not adjusted by sex for adults.'
    },
    {
      q: 'Why does the NHS use different BMI thresholds for some ethnic groups?',
      a: 'Because risk of type 2 diabetes and heart disease rises at a lower body weight in people of South Asian, Chinese and some other Asian backgrounds. The NHS therefore uses 23 as the overweight threshold and 27.5 for obesity, rather than 25 and 30.'
    },
    {
      q: 'Does BMI measure body fat?',
      a: 'No. It is a ratio of weight to height and contains no measurement of fat at all. It correlates with body fat across large populations, which is why it works as a screening tool, but for any individual it can be wrong in either direction.'
    },
    {
      q: 'Can I use this BMI calculator for my child?',
      a: 'No. Children and teenagers are assessed on age-and-sex percentile charts, because healthy body composition shifts throughout growth. Use the CDC child and teen calculator, and discuss the result with a paediatrician rather than acting on it directly.'
    },
    {
      q: 'How much weight do I need to lose to improve my health?',
      a: 'Less than most people assume. Losing 5 to 10 per cent of your body weight produces measurable improvements in blood pressure, blood glucose and cholesterol, and those benefits appear well before your BMI reaches the healthy range.'
    }
  ],

  sources: [
    { name: 'World Health Organization — Obesity and overweight', url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight' },
    { name: 'NIH NHLBI — Overweight and obesity', url: 'https://www.nhlbi.nih.gov/health/overweight-and-obesity' },
    { name: 'NHS — Obesity', url: 'https://www.nhs.uk/conditions/obesity/' },
    { name: 'CDC — Child and teen BMI calculator', url: 'https://www.cdc.gov/bmi/child-teen-calculator/index.html' }
  ]
};
