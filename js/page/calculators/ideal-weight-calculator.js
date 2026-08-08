/* Extracted from calculators/ideal-weight-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var height = parseFloat(document.getElementById('height').value); var sex = document.getElementById('gender').value;
    if (!Number.isFinite(height) || height < 152.4 || height > 250) { alert('The Devine formula is intended for heights of at least 152.4 cm (5 ft)'); return; }
    var inches = height / 2.54; var estimate = (sex === 'Male' ? 50 : 45.5) + 2.3 * (inches - 60);
    showResult('result', estimate.toFixed(1) + ' kg', 'Devine formula estimate', 'This historical formula gives one reference value, not a medically ideal weight or a 10% “ideal range.” Body composition, health, and individual context are not included.', 'green');
  };
