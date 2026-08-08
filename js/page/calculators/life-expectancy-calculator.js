/* Extracted from calculators/life-expectancy-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 120) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if (document.getElementById('smoking').value === 'Current') factors.push('current smoking');
    if (document.getElementById('exercise').value === 'None') factors.push('no regular exercise');
    if (document.getElementById('diet').value === 'Poor') factors.push('poor self-rated diet');
    if (document.getElementById('bmi').value === 'Obese') factors.push('BMI in the obesity category');
    showResult('result', factors.length + ' flagged factor' + (factors.length === 1 ? '' : 's'), 'Longevity habit summary', factors.length ? 'This checklist identified: ' + factors.join(', ') + '. It cannot calculate an individual lifespan. Population life tables and clinical risk models require country, health history, and other data.' : 'No listed factors were flagged, but this short checklist cannot predict lifespan or replace preventive care.', factors.length >= 3 ? 'red' : factors.length ? 'yellow' : 'green');
  };
