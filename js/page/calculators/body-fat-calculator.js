/* Extracted from calculators/body-fat-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var sex = document.getElementById('gender').value;
    var waist = parseFloat(document.getElementById('waist').value);
    var neck = parseFloat(document.getElementById('neck').value);
    var height = parseFloat(document.getElementById('height').value);
    var hip = parseFloat(document.getElementById('hip').value);
    if (!Number.isFinite(waist) || !Number.isFinite(neck) || !Number.isFinite(height) || waist <= neck || height <= 0 || (sex === 'Female' && (!Number.isFinite(hip) || hip <= 0))) {
      alert(sex === 'Female' ? 'Enter valid waist, hip, neck, and height measurements' : 'Enter valid waist, neck, and height measurements');
      return;
    }
    var denominator = sex === 'Male'
      ? 1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)
      : 1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height);
    var bodyFat = 495 / denominator - 450;
    if (!Number.isFinite(bodyFat) || bodyFat <= 0 || bodyFat >= 75) { alert('These measurements cannot produce a valid estimate; check the tape measurements'); return; }
    showResult('result', bodyFat.toFixed(1) + '%', 'U.S. Navy circumference estimate', 'This estimate uses measured waist, neck, height' + (sex === 'Female' ? ', and hip' : '') + '. Tape placement and body shape affect accuracy; it is not a clinical measurement.', 'green');
  };
