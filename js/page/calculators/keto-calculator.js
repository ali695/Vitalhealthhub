/* Extracted from calculators/keto-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var calories = parseFloat(document.getElementById('calories').value); var weight = parseFloat(document.getElementById('weight').value); var proteinMultiplier = parseFloat(document.getElementById('protein').value);
    if (!Number.isFinite(calories) || calories < 800 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(proteinMultiplier) || proteinMultiplier <= 0) { alert('Enter valid calories, weight, and protein target'); return; }
    var protein = Math.round(weight * proteinMultiplier); var carbs = 25; var fatCalories = calories - protein * 4 - carbs * 4;
    if (fatCalories <= 0) { alert('The calorie target is too low for the selected protein and carbohydrate amounts'); return; }
    var fat = Math.round(fatCalories / 9);
    showResult('result', 'P ' + protein + 'g | C ' + carbs + 'g | F ' + fat + 'g', 'Illustrative ketogenic macro split', 'This arithmetic fills remaining calories with fat after the selected protein target and 25 g net carbohydrate. It does not confirm ketosis or medical suitability.', 'yellow');
  };
