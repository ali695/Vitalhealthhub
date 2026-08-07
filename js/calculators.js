document.addEventListener('DOMContentLoaded', function() {
  var calcFn = window._vhCalcFn;
  if (!calcFn) return;

  var fields = Array.from(document.querySelectorAll('.calc-input-card input, .calc-input-card select, .calc-input-card textarea'));
  fields.forEach(function(el) {
    el.dataset.vhInitialValue = el.value;
  });

  var runCalculator = function() {
    try {
      calcFn();
    } catch (error) {
      console.error('Calculator error:', error);
      alert('This calculator could not complete the calculation. Check the values and try again.');
    }
  };

  var submitBtn = document.querySelector('.calc-submit-btn');
  if (submitBtn) submitBtn.addEventListener('click', runCalculator);

  fields.forEach(function(el) {
    el.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && el.tagName !== 'TEXTAREA') {
        event.preventDefault();
        runCalculator();
      }
    });
  });

  var resetBtn = document.getElementById('vhResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      fields.forEach(function(el) { el.value = el.dataset.vhInitialValue || ''; });
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
      var result = document.getElementById(id);
      if (result) {
        result.setAttribute('role', 'status');
        result.setAttribute('aria-live', 'polite');
        result.setAttribute('tabindex', '-1');
        result.focus({ preventScroll: true });
      }
    };
  }
});
