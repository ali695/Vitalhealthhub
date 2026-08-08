/* Extracted from calculators/vo2-max-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value); var resting = parseFloat(document.getElementById('rhr').value);
    if (!Number.isFinite(age) || age < 18 || age > 100 || !Number.isFinite(resting) || resting < 30 || resting > 220) { alert('Enter valid adult age and resting heart rate'); return; }
    var maxHeartRate = 208 - 0.7 * age; var estimate = 15.3 * maxHeartRate / resting;
    showResult('result', estimate.toFixed(1) + ' mL/kg/min', 'Non-exercise VO₂ max estimate', 'Uses estimated maximum heart rate (208 − 0.7 × age) and resting heart rate. It is not a measured exercise-test result, and age/sex fitness categories are intentionally not assigned from this limited estimate.', 'green');
  };
