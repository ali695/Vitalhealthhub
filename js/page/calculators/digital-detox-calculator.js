/* Extracted from calculators/digital-detox-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var phone = parseFloat(document.getElementById('phone').value) || 0; var computer = parseFloat(document.getElementById('computer').value) || 0; var tv = parseFloat(document.getElementById('tv').value) || 0; var social = parseFloat(document.getElementById('social').value) || 0;
    if ([phone, computer, tv, social].some(function (value) { return value < 0 || value > 24; })) { alert('Enter daily hours from 0 to 24'); return; }
    var total = phone + computer + tv; if (total > 24) { alert('Combined daily screen time cannot exceed 24 hours unless activities overlap'); return; }
    var wakingShare = Math.min(100, Math.round(total / 16 * 100));
    showResult('result', total.toFixed(1) + ' h/day', 'Screen-time summary', Math.round(total * 7) + ' hours/week, about ' + wakingShare + '% of a 16-hour waking day. Social media entered: ' + social + ' h/day. This is a time summary, not a diagnosis or universal healthy limit.', total > 8 ? 'red' : total > 4 ? 'yellow' : 'green');
  };
