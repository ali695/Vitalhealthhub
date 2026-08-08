/* Extracted from calculators/child-bmi-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value) / 100;
    var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 2 || age >= 20 || !Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) {
      alert('Enter age 2 to 19, sex, weight, and height');
      return;
    }
    var bmi = weight / (height * height);
    showResult('result', bmi.toFixed(1), 'BMI needs an age-and-sex percentile', 'For children, BMI categories cannot be determined from BMI alone. Use this BMI with an official CDC or WHO chart for exact age and sex, or ask a pediatric clinician to interpret it for a ' + sex.toLowerCase() + ' child.', 'yellow');
  };
