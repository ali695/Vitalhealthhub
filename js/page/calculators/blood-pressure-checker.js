/* Extracted from calculators/blood-pressure-checker.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var systolic = parseFloat(document.getElementById('systolic').value);
    var diastolic = parseFloat(document.getElementById('diastolic').value);
    if (!Number.isFinite(systolic) || !Number.isFinite(diastolic) || systolic < 40 || systolic > 300 || diastolic < 30 || diastolic > 200) {
      alert('Enter a valid systolic and diastolic reading');
      return;
    }
    var color = 'green';
    var label = 'Normal';
    var note = 'This single reading is in the normal category. Diagnosis requires properly taken readings over time.';
    if (systolic >= 180 || diastolic >= 120) {
      color = 'red'; label = 'Severely high reading';
      note = 'Wait at least 1 minute and measure again. If it remains this high, contact a healthcare professional immediately. Call emergency services now if you also have chest pain, shortness of breath, weakness, vision change, back pain, numbness, or difficulty speaking.';
    } else if (systolic >= 140 || diastolic >= 90) {
      color = 'red'; label = 'Stage 2 hypertension range'; note = 'Repeat the measurement correctly and arrange prompt clinical follow-up. One reading alone does not diagnose hypertension.';
    } else if (systolic >= 130 || diastolic >= 80) {
      color = 'yellow'; label = 'Stage 1 hypertension range'; note = 'Track correctly taken readings and discuss the pattern with a healthcare professional.';
    } else if (systolic >= 120 && diastolic < 80) {
      color = 'yellow'; label = 'Elevated range'; note = 'Your systolic reading is elevated. Monitor the pattern and discuss persistent elevation during routine care.';
    }
    showResult('result', systolic + '/' + diastolic + ' mmHg', label, note, color);
  };
