/* Extracted from calculators/child-growth-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    var sex = document.getElementById('gender').value;
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    if (!Number.isFinite(age) || age < 2 || age >= 20 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(weight) || weight <= 0) {
      alert('Enter valid measurements for age 2 to 19'); return;
    }
    var bmi = weight / Math.pow(height / 100, 2);
    showResult('result', 'BMI ' + bmi.toFixed(1), 'Measurements recorded', 'Height: ' + height.toFixed(1) + ' cm | Weight: ' + weight.toFixed(1) + ' kg | Sex: ' + sex + '. Accurate height, weight, and BMI percentiles require official age-in-months and sex-specific growth-chart data; this tool no longer fabricates percentiles.', 'yellow');
  };
