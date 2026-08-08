/* Extracted from calculators/random-number-generator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var min = parseInt(document.getElementById('min').value, 10); var max = parseInt(document.getElementById('max').value, 10); var count = Math.max(1, Math.min(20, parseInt(document.getElementById('count').value, 10) || 1));
    if (!Number.isInteger(min) || !Number.isInteger(max) || min > max || max - min >= 4294967296) { alert('Enter a valid integer range smaller than 2^32'); return; }
    if (!window.crypto || !window.crypto.getRandomValues) { alert('Secure random generation is unavailable'); return; }
    var size = max - min + 1; var ceiling = Math.floor(4294967296 / size) * size; var values = [];
    while (values.length < count) { var buffer = new Uint32Array(1); window.crypto.getRandomValues(buffer); if (buffer[0] < ceiling) values.push(min + buffer[0] % size); }
    showResult('result', values.join(', '), 'Random integers', 'Generated with the browser Web Crypto API. Repeats are allowed.', 'green');
  };
