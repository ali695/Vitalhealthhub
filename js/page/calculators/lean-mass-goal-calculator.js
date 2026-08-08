/* Extracted from calculators/lean-mass-goal-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var bodyFat = parseFloat(document.getElementById('bodyfat').value);
    var targetBodyFat = parseFloat(document.getElementById('targetbf').value);
    var goal = document.getElementById('goal').value;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(bodyFat) || bodyFat <= 0 || bodyFat >= 70 || !Number.isFinite(targetBodyFat) || targetBodyFat <= 0 || targetBodyFat >= 70) { alert('Enter valid weight and body-fat percentages'); return; }
    var leanMass = weight * (1 - bodyFat / 100);
    if (goal === 'Lose Fat (maintain muscle)') {
      var targetWeight = leanMass / (1 - targetBodyFat / 100);
      var change = weight - targetWeight;
      showResult('result', change > 0 ? change.toFixed(1) + ' kg' : 'Target is not below current fat level', 'Theoretical fat-mass change', 'If lean mass stayed exactly constant, target weight would be ' + targetWeight.toFixed(1) + ' kg. Real changes are not perfectly linear, and body-fat estimates contain measurement error.', change > 0 ? 'green' : 'yellow');
    } else {
      showResult('result', leanMass.toFixed(1) + ' kg', 'Current estimated lean mass', 'Current estimated fat mass: ' + (weight - leanMass).toFixed(1) + ' kg. Muscle-gain speed and resulting body-fat percentage cannot be predicted accurately from these inputs; track repeated measurements instead.', 'green');
    }
  };
