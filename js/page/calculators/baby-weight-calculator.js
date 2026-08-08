/* Extracted from calculators/baby-weight-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 0 || age > 36 || !Number.isFinite(weight) || weight <= 0) {
      alert('Enter an age from 0 to 36 months and a valid weight');
      return;
    }
    showResult('result', weight.toFixed(2) + ' kg', 'Growth-chart measurement', 'A valid infant weight percentile requires an official WHO or CDC table for exact age and sex. Record this measurement for a clinician to plot for a ' + sex.toLowerCase() + ' child; a single measurement cannot establish a growth trend.', 'yellow');
  };
