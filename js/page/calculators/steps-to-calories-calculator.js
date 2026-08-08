/* Extracted from calculators/steps-to-calories-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var steps = parseFloat(document.getElementById('steps').value); var weight = parseFloat(document.getElementById('weight').value); if (!Number.isFinite(steps) || steps < 0 || !Number.isFinite(weight) || weight <= 0) { alert('Enter valid steps and weight'); return; } var low = steps * 0.03 * weight / 70; var high = steps * 0.06 * weight / 70; var distance = steps * 0.000762;
    showResult('result', '~' + Math.round(low) + '–' + Math.round(high) + ' kcal', 'Broad step-based estimate', 'Approximate distance using a 0.762 m step: ' + distance.toFixed(1) + ' km. Without pace, incline, stride, and duration, calories cannot be calculated precisely.', 'green');
  };
