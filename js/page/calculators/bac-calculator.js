/* Extracted from calculators/bac-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var drinks = parseFloat(document.getElementById('drinks').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var sex = document.getElementById('gender').value;
    var hours = parseFloat(document.getElementById('hours').value);
    if (!Number.isFinite(drinks) || drinks < 0 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(hours) || hours < 0) { alert('Enter valid drinks, weight, and elapsed time'); return; }
    var ratio = sex === 'Male' ? 0.68 : 0.55;
    var estimate = drinks * 14 / (weight * 1000 * ratio) * 100 - 0.015 * hours;
    estimate = Math.max(0, estimate);
    var note = 'Widmark-style estimate only. Drink strength, timing, food, medications, physiology, and pour size can change actual BAC. Never use a calculator to decide whether to drive; use alternate transportation after drinking.';
    showResult('result', estimate.toFixed(3) + '%', 'Estimated BAC—not a measurement', note, estimate >= 0.08 ? 'red' : estimate > 0 ? 'yellow' : 'green');
  };
