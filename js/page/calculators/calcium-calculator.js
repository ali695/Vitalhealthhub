/* Extracted from calculators/calcium-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value;
    if (!Number.isFinite(age) || age < 1 || age > 120) { alert('Enter a valid age'); return; }
    var calcium = age <= 3 ? 700 : age <= 8 ? 1000 : age <= 18 ? 1300 : age <= 50 ? 1000 : age <= 70 ? (sex === 'Female' ? 1200 : 1000) : 1200;
    showResult('result', calcium + ' mg/day', 'Calcium RDA', 'Reference amount for age ' + age + ' and ' + sex.toLowerCase() + ' sex. This is total intake from food and supplements; medical conditions and medications can change advice.', 'green');
  };
