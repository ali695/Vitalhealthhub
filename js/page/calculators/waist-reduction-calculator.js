/* Extracted from calculators/waist-reduction-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var current = parseFloat(document.getElementById('current').value);
    var target = parseFloat(document.getElementById('target').value);
    if (!Number.isFinite(current) || current <= 0 || !Number.isFinite(target) || target <= 0) { alert('Enter valid current and target waist measurements'); return; }
    var difference = current - target;
    showResult('result', Math.abs(difference).toFixed(1) + ' cm', difference > 0 ? 'Difference to target' : difference < 0 ? 'Current measurement is below target' : 'Target reached', 'Waist change cannot be converted reliably into a number of weeks from calorie deficit and exercise inputs. Measure under consistent conditions and track the observed trend rather than using a fabricated centimetres-per-week formula.', difference > 0 ? 'green' : 'yellow');
  };
