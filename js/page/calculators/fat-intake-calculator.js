/* Extracted from calculators/fat-intake-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var calories = parseFloat(document.getElementById('calories').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(calories) || calories < 800 || calories > 10000) { alert('Enter a valid calorie target'); return; } var ranges = {'Standard': [0.20, 0.35], 'Low Fat': [0.20, 0.25], 'Moderate': [0.25, 0.35], 'High Fat/Keto': [0.60, 0.75]}; var range = ranges[goal] || ranges.Standard; var low = Math.round(calories * range[0] / 9); var high = Math.round(calories * range[1] / 9);
    showResult('result', low + '–' + high + ' g/day', 'Illustrative dietary-fat range', Math.round(range[0] * 100) + '–' + Math.round(range[1] * 100) + '% of calories. Prioritize unsaturated fats; restrictive diets require attention to total nutrition and individual medical needs.', 'green');
  };
