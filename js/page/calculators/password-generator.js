/* Extracted from calculators/password-generator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var length = Math.max(8, Math.min(64, parseInt(document.getElementById('length').value, 10) || 16));
    var groups = ['abcdefghijklmnopqrstuvwxyz'];
    if (document.getElementById('upper').value === 'Yes') groups.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (document.getElementById('nums').value === 'Yes') groups.push('0123456789');
    if (document.getElementById('sym').value === 'Yes') groups.push('!@#$%^&*_+-=?');
    if (!window.crypto || !window.crypto.getRandomValues) { alert('Secure randomness is unavailable in this browser'); return; }
    var all = groups.join('');
    var randomIndex = function (limit) { var value = new Uint32Array(1); var ceiling = Math.floor(4294967296 / limit) * limit; do { window.crypto.getRandomValues(value); } while (value[0] >= ceiling); return value[0] % limit; };
    var characters = groups.map(function (group) { return group[randomIndex(group.length)]; });
    while (characters.length < length) characters.push(all[randomIndex(all.length)]);
    for (var index = characters.length - 1; index > 0; index -= 1) { var swap = randomIndex(index + 1); var temp = characters[index]; characters[index] = characters[swap]; characters[swap] = temp; }
    var password = characters.join('');
    showResult('result', password, 'Cryptographically generated password', 'Generated with the browser Web Crypto API and includes at least one character from every selected group. Store it in a password manager and do not reuse it.', 'green');
  };
