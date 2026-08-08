/* Extracted from calculators/tip-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var bill = parseFloat(document.getElementById('bill').value); var tipPercent = parseFloat(document.getElementById('tip').value); var people = parseInt(document.getElementById('people').value, 10); if (!Number.isFinite(bill) || bill < 0 || !Number.isFinite(tipPercent) || tipPercent < 0 || !Number.isInteger(people) || people < 1) { alert('Enter valid bill, tip percentage, and number of people'); return; } var tip = bill * tipPercent / 100; var total = bill + tip;
    showResult('result', '$' + tip.toFixed(2) + ' tip', 'Bill split', 'Total: $' + total.toFixed(2) + ' | Per person: $' + (total / people).toFixed(2) + ' | Tip per person: $' + (tip / people).toFixed(2) + '.', 'green');
  };
