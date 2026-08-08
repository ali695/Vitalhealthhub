/* Extracted from calculators/waist-to-hip-ratio.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var waist = parseFloat(document.getElementById('waist').value); var hip = parseFloat(document.getElementById('hip').value); var sex = document.getElementById('gender').value; if (!Number.isFinite(waist) || waist <= 0 || !Number.isFinite(hip) || hip <= 0) { alert('Enter valid waist and hip measurements in the same unit'); return; } var ratio = waist / hip; var threshold = sex === 'Male' ? 0.9 : 0.85;
    showResult('result', ratio.toFixed(2), ratio > threshold ? 'Above common WHO risk threshold' : 'At or below common WHO risk threshold', 'Common adult thresholds are above 0.90 for men and above 0.85 for women. Measurement technique, ethnicity, age, pregnancy, and clinical context matter; exercise cannot selectively reduce waist fat.', ratio > threshold ? 'yellow' : 'green');
  };
