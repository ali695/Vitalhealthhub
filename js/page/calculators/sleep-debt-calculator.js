/* Extracted from calculators/sleep-debt-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var needed = parseFloat(document.getElementById('needed').value); var actual = parseFloat(document.getElementById('actual').value); var days = parseInt(document.getElementById('days').value, 10);
    if (!Number.isFinite(needed) || needed <= 0 || needed > 16 || !Number.isFinite(actual) || actual < 0 || actual > 24 || !Number.isInteger(days) || days <= 0 || days > 365) { alert('Enter valid sleep hours and number of days'); return; }
    var shortfall = Math.max(0, (needed - actual) * days);
    showResult('result', shortfall.toFixed(1) + ' hours', 'Cumulative reported sleep shortfall', shortfall ? 'This is arithmetic, not a clinical “debt” that can be repaid hour for hour. Aim for a consistent opportunity to sleep and seek care for persistent insomnia, excessive sleepiness, or breathing symptoms.' : 'Reported sleep meets or exceeds the selected need. Sleep quality and symptoms still matter.', shortfall > 14 ? 'red' : shortfall > 0 ? 'yellow' : 'green');
  };
