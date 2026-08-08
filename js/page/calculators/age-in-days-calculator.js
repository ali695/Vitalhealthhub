/* Extracted from calculators/age-in-days-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var raw = document.getElementById('dob').value;
    if (!raw) { alert('Enter date of birth'); return; }
    var birth = new Date(raw + 'T00:00:00'); var today = new Date();
    if (Number.isNaN(birth.getTime()) || birth > today) { alert('Enter a valid past date'); return; }
    var days = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(birth.getFullYear(), birth.getMonth(), birth.getDate())) / 86400000);
    var unit = document.getElementById('unit').value; var value; var label;
    if (unit === 'Hours') { value = (days * 24).toLocaleString(); label = 'Complete calendar-day hours'; }
    else if (unit === 'Minutes') { value = (days * 1440).toLocaleString(); label = 'Complete calendar-day minutes'; }
    else if (unit === 'Weeks + Days') { value = Math.floor(days / 7).toLocaleString() + ' wk ' + (days % 7) + 'd'; label = 'Weeks and days'; }
    else { value = days.toLocaleString(); label = 'Complete days'; }
    showResult('result', value, label, 'Calculated from calendar dates at midnight, avoiding daylight-saving-hour errors. Hours and minutes are derived from complete calendar days, not a birth time.', 'green');
  };
