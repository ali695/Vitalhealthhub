/* Extracted from calculators/carb-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var calories = parseFloat(document.getElementById('calories').value); var goal = document.getElementById('goal').value;
    if (!Number.isFinite(calories) || calories < 800 || calories > 10000) { alert('Enter a valid calorie target'); return; }
    var ranges = {'Balanced': [0.45, 0.65], 'Low Carb': [0.20, 0.35], 'Keto': [0.05, 0.10], 'High Performance': [0.50, 0.65]}; var range = ranges[goal] || ranges.Balanced; var low = Math.round(calories * range[0] / 4); var high = Math.round(calories * range[1] / 4);
    showResult('result', low + '–' + high + ' g/day', 'Illustrative carbohydrate range', Math.round(range[0] * 100) + '–' + Math.round(range[1] * 100) + '% of entered calories. Medical conditions, training load, pregnancy, and medication can make restrictive patterns inappropriate.', 'green');
  };
