/* Extracted from calculators/step-goal-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var height = parseFloat(document.getElementById('height').value); var current = parseFloat(document.getElementById('current').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(height) || height <= 0 || !Number.isFinite(current) || current < 0) { alert('Enter valid height and current steps'); return; }
    var increase = current < 5000 ? 500 : current < 10000 ? 1000 : Math.round(current * 0.1); var target = Math.round((current + increase) / 100) * 100; var distance = target * (height * 0.413 / 100) / 1000;
    showResult('result', target.toLocaleString() + ' steps/day', 'Gradual next target', 'Current: ' + current.toLocaleString() + '; suggested initial increase: ' + increase.toLocaleString() + ' steps. Approximate distance: ' + distance.toFixed(1) + ' km. There is no universal goal for ' + goal.toLowerCase() + '; adjust for ability, symptoms, and clinical advice.', 'green');
  };
