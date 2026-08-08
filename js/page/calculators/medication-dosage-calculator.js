/* Extracted from calculators/medication-dosage-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var weight = parseFloat(document.getElementById('weight').value);
    var dosePerKgPerDay = parseFloat(document.getElementById('dose').value);
    var frequency = parseInt(document.getElementById('frequency').value, 10);
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(dosePerKgPerDay) || dosePerKgPerDay <= 0 || !Number.isInteger(frequency) || frequency < 1 || frequency > 24) { alert('Enter valid values from a written clinician or pharmacist instruction'); return; }
    var totalDaily = weight * dosePerKgPerDay;
    var perDose = totalDaily / frequency;
    showResult('result', perDose.toFixed(2) + ' mg', 'Arithmetic result—not a dose recommendation', 'Math only: ' + weight + ' kg × ' + dosePerKgPerDay + ' mg/kg/day = ' + totalDaily.toFixed(2) + ' mg/day; divided into ' + frequency + ' doses = ' + perDose.toFixed(2) + ' mg each. Do not administer from this result. Drug-specific maximums, route, concentration, age, organ function, interactions, and rounding must be checked by a pharmacist or prescriber.', 'red');
  };
