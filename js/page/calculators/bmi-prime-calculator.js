/* Extracted from calculators/bmi-prime-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value) / 100;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid weight and height'); return; }
    var bmi = weight / (height * height);
    var prime = bmi / 25;
    var color = prime < 0.74 ? 'yellow' : prime <= 1 ? 'green' : prime <= 1.2 ? 'yellow' : 'red';
    var label = bmi < 18.5 ? 'Below adult healthy range' : bmi < 25 ? 'Within adult healthy range' : bmi < 30 ? 'Above adult healthy range' : 'Obesity range';
    showResult('result', prime.toFixed(2), 'BMI Prime: ' + label, 'BMI ' + bmi.toFixed(1) + ' divided by 25 equals ' + prime.toFixed(2) + '. This screening measure is for adults and does not diagnose health status.', color);
  };
