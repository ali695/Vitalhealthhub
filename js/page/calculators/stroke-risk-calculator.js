/* Extracted from calculators/stroke-risk-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 120) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if (age >= 65) factors.push('age 65 or older');
    if (document.getElementById('bp').value === 'Yes') factors.push('high blood pressure');
    if (document.getElementById('smoking').value === 'Yes') factors.push('smoking');
    if (document.getElementById('diabetes').value === 'Yes') factors.push('diabetes');
    if (document.getElementById('afib').value === 'Yes') factors.push('atrial fibrillation');
    showResult('result', factors.length + ' factor' + (factors.length === 1 ? '' : 's'), 'Stroke risk-factor summary', factors.length ? 'Reported: ' + factors.join(', ') + '. This is not a percentage or validated stroke-risk score. Atrial fibrillation requires a specific clinician-assessed model, and sudden stroke symptoms require emergency services.' : 'No listed factors were reported, but this short checklist cannot calculate or rule out stroke risk.', factors.length >= 3 ? 'red' : factors.length ? 'yellow' : 'green');
  };
