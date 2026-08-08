/* Extracted from calculators/testosterone-estimator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 18 || age > 100) { alert('Enter a valid adult age'); return; }
    var factors = [];
    if ((parseFloat(document.getElementById('sleep').value) || 0) < 7) factors.push('short sleep');
    if ((parseFloat(document.getElementById('exercise').value) || 0) < 2) factors.push('low activity');
    if ((parseFloat(document.getElementById('stress').value) || 0) >= 4) factors.push('high stress');
    if (document.getElementById('bmi').value === 'Obese') factors.push('obesity category');
    if (document.getElementById('alcohol').value === 'Heavy (8+ drinks/week)') factors.push('higher alcohol intake');
    showResult('result', factors.length + ' relevant factor' + (factors.length === 1 ? '' : 's'), 'Hormone-health checklist', factors.length ? 'Reported: ' + factors.join(', ') + '. Testosterone concentration cannot be calculated from lifestyle answers. Diagnosis requires symptoms plus properly timed laboratory testing interpreted by a clinician.' : 'No listed lifestyle factors were flagged. This cannot estimate a testosterone level; only appropriate laboratory testing can do that.', factors.length >= 3 ? 'yellow' : 'green');
  };
