/* Extracted from calculators/age-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var raw = document.getElementById('dob').value;
    if (!raw) { alert('Enter your date of birth'); return; }
    var birth = new Date(raw + 'T00:00:00');
    var today = new Date();
    if (Number.isNaN(birth.getTime()) || birth > today) { alert('Enter a valid past date'); return; }
    var years = today.getFullYear() - birth.getFullYear();
    var months = today.getMonth() - birth.getMonth();
    var days = today.getDate() - birth.getDate();
    if (days < 0) { months -= 1; var previousMonth = new Date(today.getFullYear(), today.getMonth(), 0); days += previousMonth.getDate(); }
    if (months < 0) { years -= 1; months += 12; }
    var totalDays = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(birth.getFullYear(), birth.getMonth(), birth.getDate())) / 86400000);
    var next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (next < today || next.toDateString() === today.toDateString()) next.setFullYear(today.getFullYear() + 1);
    var daysLeft = Math.ceil((Date.UTC(next.getFullYear(), next.getMonth(), next.getDate()) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000);
    showResult('result', years + ' years ' + months + 'mo ' + days + 'd', 'Calendar age', totalDays.toLocaleString() + ' complete days since birth. Next birthday in ' + daysLeft + ' days.', 'green');
  };
