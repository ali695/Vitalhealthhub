/* Extracted from calculators/bmi-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value) / 100;
    if (!Number.isFinite(weight) || weight <= 0 || weight > 700 || !Number.isFinite(height) || height < 0.5 || height > 2.8) { alert('Enter valid weight and height'); return; }
    var bmi = weight / (height * height); var label = bmi < 18.5 ? 'Underweight range' : bmi < 25 ? 'Healthy-weight range' : bmi < 30 ? 'Overweight range' : 'Obesity range'; var color = bmi < 18.5 ? 'yellow' : bmi < 25 ? 'green' : bmi < 30 ? 'yellow' : 'red';
    showResult('result', bmi.toFixed(1), label, 'Adult BMI screening category. BMI does not directly measure body fat or diagnose health and should be interpreted with clinical context.', color);
  };
