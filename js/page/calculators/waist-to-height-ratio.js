/* Extracted from calculators/waist-to-height-ratio.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var waist = parseFloat(document.getElementById('waist').value); var height = parseFloat(document.getElementById('height').value); if (!Number.isFinite(waist) || waist <= 0 || !Number.isFinite(height) || height <= 0 || waist > height * 1.5) { alert('Enter valid waist and height in the same unit'); return; } var ratio = waist / height; var color = ratio < 0.5 ? 'green' : ratio < 0.6 ? 'yellow' : 'red';
    showResult('result', ratio.toFixed(2), 'Waist-to-height ratio', 'A simple adult screening message is to keep waist below half of height. Ethnicity, age, pregnancy, body shape, and measurement technique affect interpretation; this is not a diagnosis.', color);
  };
