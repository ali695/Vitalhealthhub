/* Extracted from calculators/biological-age-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 120) { alert('Enter a valid adult age'); return; }
    var concerns = [];
    var exercise = parseFloat(document.getElementById('exercise').value); var sleep = parseFloat(document.getElementById('sleep').value); var stress = parseFloat(document.getElementById('stress').value); var diet = parseFloat(document.getElementById('diet').value);
    if (exercise < 2) concerns.push('low activity'); if (sleep < 7 || sleep > 9) concerns.push('sleep outside 7–9 hours'); if (document.getElementById('smoking').value === 'Yes') concerns.push('smoking'); if (stress >= 4) concerns.push('high stress'); if (diet <= 2) concerns.push('low diet rating');
    showResult('result', concerns.length + '/5 concerns', 'Healthy-aging habit summary', concerns.length ? 'Reported: ' + concerns.join(', ') + '. Lifestyle answers cannot calculate biological age; validated biomarker models require clinical measurements.' : 'No listed concerns were flagged. This checklist cannot determine biological age.', concerns.length >= 3 ? 'red' : concerns.length ? 'yellow' : 'green');
  };
