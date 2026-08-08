/* Extracted from calculators/visceral-fat-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var waist = parseFloat(document.getElementById('waist').value);
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    if (!Number.isFinite(waist) || waist <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(weight) || weight <= 0) { alert('Enter valid waist, height, and weight'); return; }
    var ratio = waist / height;
    var bmi = weight / Math.pow(height / 100, 2);
    var color = ratio < 0.5 ? 'green' : ratio < 0.6 ? 'yellow' : 'red';
    showResult('result', ratio.toFixed(2), 'Waist-to-height ratio', 'BMI: ' + bmi.toFixed(1) + '. Tape measurements can screen central size, but they cannot measure visceral-fat mass or assign a CT-style visceral-fat level. Medical imaging is required for direct assessment.', color);
  };
