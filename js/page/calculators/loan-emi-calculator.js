/* Extracted from calculators/loan-emi-calculator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var principal = parseFloat(document.getElementById('principal').value);
    var annualRate = parseFloat(document.getElementById('rate').value);
    var months = parseInt(document.getElementById('tenure').value, 10);
    if (!Number.isFinite(principal) || principal <= 0 || !Number.isFinite(annualRate) || annualRate < 0 || !Number.isInteger(months) || months <= 0) { alert('Enter a valid principal, non-negative rate, and loan term'); return; }
    var monthlyRate = annualRate / 100 / 12;
    var payment = monthlyRate === 0 ? principal / months : principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    var total = payment * months;
    showResult('result', '$' + payment.toFixed(2) + '/mo', 'Monthly payment', 'Total repayment: $' + total.toFixed(2) + ' | Total interest: $' + (total - principal).toFixed(2) + '. Excludes fees, taxes, insurance, and rate changes.', 'green');
  };
