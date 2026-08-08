/* Extracted from calculators/iron-intake-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var age = parseFloat(document.getElementById('age').value); var sex = document.getElementById('gender').value; var state = document.getElementById('pregnant').value;
    if (!Number.isFinite(age) || age < 1 || age > 120) { alert('Enter a valid age'); return; }
    var iron = age <= 3 ? 7 : age <= 8 ? 10 : age <= 13 ? 8 : age <= 18 ? (sex === 'Male' ? 11 : 15) : age <= 50 ? (sex === 'Male' ? 8 : 18) : 8;
    if (state === 'Pregnant') iron = 27; else if (state === 'Breastfeeding') iron = age <= 18 ? 10 : 9;
    showResult('result', iron + ' mg/day', 'Iron RDA', 'Reference amount for the selected age, sex, and life stage. Do not use this as an iron-supplement dose; excess iron can be harmful and suspected deficiency needs appropriate testing.', 'green');
  };
