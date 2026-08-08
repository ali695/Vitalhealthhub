/* Extracted from calculators/body-surface-area-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value); var height = parseFloat(document.getElementById('height').value);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(height) || height <= 0) { alert('Enter valid weight and height'); return; }
    var bsa = Math.sqrt(height * weight / 3600);
    showResult('result', bsa.toFixed(2) + ' m²', 'Mosteller body surface area', 'Formula: √(height in cm × weight in kg ÷ 3600). Clinical dosing or treatment decisions require professional verification and drug-specific protocols.', 'green');
  };
