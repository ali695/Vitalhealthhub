/* Extracted from calculators/ovulation-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var raw = document.getElementById('lmp').value;
    var cycle = parseFloat(document.getElementById('cycle').value);
    if (!raw || !Number.isFinite(cycle) || cycle < 21 || cycle > 45) { alert('Enter a period start date and a typical cycle length from 21 to 45 days'); return; }
    var start = new Date(raw + 'T00:00:00');
    var ovulation = new Date(start); ovulation.setDate(ovulation.getDate() + cycle - 14);
    var fertileStart = new Date(ovulation); fertileStart.setDate(fertileStart.getDate() - 5);
    var fertileEnd = new Date(ovulation); fertileEnd.setDate(fertileEnd.getDate() + 1);
    var format = function (date) { return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(); };
    showResult('result', format(ovulation), 'Estimated ovulation date', 'Estimated fertile window: ' + format(fertileStart) + ' to ' + format(fertileEnd) + '. Calendar estimates are unreliable with irregular cycles and cannot prevent or confirm pregnancy.', 'yellow');
  };
