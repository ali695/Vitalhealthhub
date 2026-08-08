/* Extracted from calculators/smoking-cost-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var perDay = parseFloat(document.getElementById('perday').value); var packPrice = parseFloat(document.getElementById('price').value); var years = parseFloat(document.getElementById('years').value); if (!Number.isFinite(perDay) || perDay < 0 || !Number.isFinite(packPrice) || packPrice < 0 || !Number.isFinite(years) || years < 0) { alert('Enter non-negative cigarettes, price, and years'); return; } var daily = perDay / 20 * packPrice; var annual = daily * 365; var total = annual * years;
    showResult('result', '$' + annual.toFixed(2) + '/year', 'Estimated cigarette cost', '$' + daily.toFixed(2) + '/day | $' + (daily * 30.4375).toFixed(2) + '/average month | $' + total.toFixed(2) + ' over ' + years + ' years. Excludes price changes and health-related costs.', perDay > 0 ? 'red' : 'green');
  };
