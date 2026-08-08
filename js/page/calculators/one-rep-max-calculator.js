/* Extracted from calculators/one-rep-max-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var reps = parseInt(document.getElementById('reps').value, 10);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isInteger(reps) || reps < 1 || reps > 12) { alert('Enter a lifted weight and 1 to 12 repetitions'); return; }
    var estimate = weight * (1 + reps / 30);
    showResult('result', Math.round(estimate) + ' kg', 'Epley estimated 1RM', 'Estimate based on ' + weight + ' kg for ' + reps + ' reps. Accuracy decreases at higher repetitions and varies by exercise, technique, fatigue, and athlete.', 'green');
  };
