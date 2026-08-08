/* Extracted from calculators/vitamin-d-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value);
    if (!Number.isFinite(age) || age < 1 || age > 120) { alert('Enter a valid age'); return; }
    var amount = age > 70 ? 800 : 600;
    showResult('result', amount + ' IU (15' + (age > 70 ? '–20' : '') + ' mcg)', 'General daily reference amount', 'The adult reference amount is 600 IU through age 70 and 800 IU after 70. Sun exposure and skin tone do not translate into a safe supplement dose; testing, diet, medications, and medical history should guide individualized advice.', 'green');
  };
