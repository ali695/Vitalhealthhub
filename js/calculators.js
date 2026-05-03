document.addEventListener('DOMContentLoaded', function() {
  var calcFn = window._vhCalcFn;
  if (!calcFn) return;

  document.querySelectorAll('.calc-input-card input, .calc-input-card select').forEach(function(el) {
    el.addEventListener('change', calcFn);
  });

  var submitBtn = document.querySelector('.calc-submit-btn');
  if (submitBtn) submitBtn.addEventListener('click', calcFn);

  var resetBtn = document.getElementById('vhResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      document.querySelectorAll('.calc-input-card input, .calc-input-card select').forEach(function(el) { el.value = ''; });
      var r = document.getElementById('result');
      if (r) r.className = 'result-box';
      var ph = document.getElementById('calcPlaceholder');
      if (ph) ph.style.display = 'flex';
    });
  }

  document.addEventListener('click', function(e) {
    if (e.target.id === 'vhCopyBtn' || e.target.closest('#vhCopyBtn')) {
      var v = document.querySelector('#result .result-value');
      var l = document.querySelector('#result .result-label');
      var s = document.querySelector('#result .result-suggestion');
      var text = (v ? v.textContent : '') + (l && l.textContent ? ' - ' + l.textContent : '') + (s && s.textContent ? '\n' + s.textContent : '');
      if (navigator.clipboard && text.trim()) {
        navigator.clipboard.writeText(text).then(function() {
          var b = document.getElementById('vhCopyBtn');
          if (b) { b.textContent = 'Copied!'; setTimeout(function() { b.textContent = 'Copy'; }, 2000); }
        });
      }
    }
    if (e.target.closest('[data-share="1"]')) {
      var titleEl = document.querySelector('.calc-page-hero-title');
      var calcName = titleEl ? titleEl.textContent : 'Calculator Result';
      if (navigator.share) {
        navigator.share({ title: calcName, url: window.location.href });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(function() { alert('Link copied to clipboard!'); });
      }
    }
    if (e.target.closest('[data-print="1"]')) {
      window.print();
    }
  });

  var orig = window.showResult;
  if (orig) {
    window.showResult = function(id, val, label, sugg, color) {
      orig(id, val, label, sugg, color);
      var ph = document.getElementById('calcPlaceholder');
      if (ph) ph.style.display = 'none';
    };
  }
});
