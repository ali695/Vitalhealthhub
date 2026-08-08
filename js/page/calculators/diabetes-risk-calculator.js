/* Extracted from calculators/diabetes-risk-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    var bmi = parseFloat(document.getElementById('bmi').value);
    var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 18 || age > 120 || !Number.isFinite(bmi) || bmi < 10 || bmi > 80) { alert('Enter a valid adult age and BMI'); return; }
    var score = age >= 60 ? 3 : age >= 50 ? 2 : age >= 40 ? 1 : 0;
    if (sex === 'Male') score += 1;
    if (sex === 'Female' && document.getElementById('gestational').value === 'Yes') score += 1;
    if (document.getElementById('family').value === 'Yes') score += 1;
    if (document.getElementById('bloodpressure').value === 'Yes') score += 1;
    if (document.getElementById('activity').value === 'No') score += 1;
    score += bmi >= 40 ? 3 : bmi >= 30 ? 2 : bmi >= 25 ? 1 : 0;
    var high = score >= 5;
    showResult('result', score + '/10', high ? 'Increased prediabetes risk' : 'Below the test threshold', high ? 'This matches the CDC/ADA screening threshold. Only a blood test can diagnose prediabetes or diabetes; arrange testing with a healthcare professional.' : 'This CDC/ADA screening score is below 5, but it cannot rule out prediabetes. Ask about blood testing if you have symptoms, previous abnormal results, or clinical concerns.', high ? 'red' : 'green');
  };
