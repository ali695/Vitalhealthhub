/* Extracted from calculators/diet-comparison-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var calories = parseFloat(document.getElementById('calories').value);
    var diet = document.getElementById('diet').value;
    if (!Number.isFinite(calories) || calories < 800 || calories > 10000) { alert('Enter a valid daily calorie amount'); return; }
    var profiles = {
      'Standard Western': [0.15, 0.55, 0.30], 'Mediterranean': [0.20, 0.50, 0.30], 'Ketogenic': [0.20, 0.05, 0.75],
      'High Protein': [0.35, 0.40, 0.25], 'Plant-Based': [0.15, 0.60, 0.25], 'Paleo': [0.30, 0.35, 0.35],
      'Low Carb': [0.30, 0.20, 0.50], 'Intermittent Fasting (16:8)': [0.25, 0.45, 0.30]
    };
    var profile = profiles[diet];
    if (!profile) { alert('Choose a diet pattern'); return; }
    var protein = Math.round(calories * profile[0] / 4);
    var carbs = Math.round(calories * profile[1] / 4);
    var fat = Math.round(calories * profile[2] / 9);
    showResult('result', diet, 'Illustrative macro profile', 'At ' + calories + ' kcal: approximately ' + protein + ' g protein, ' + carbs + ' g carbohydrate, and ' + fat + ' g fat. These are example ratios, not an evidence ranking or personalized prescription.', 'green');
  };
