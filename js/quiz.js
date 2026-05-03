document.addEventListener('DOMContentLoaded', function() {
  var QD = window.vhQuizData;
  if (!QD) return;

  var COUNTS = { easy: 5, medium: 8, hard: Math.min(QD.questions.length, 10) };
  var qs = [], ci = 0, sc = 0, done = false, mode = '';
  var selectedDiff = '';

  function gi(id) { return document.getElementById(id); }

  function showScreen(s) {
    gi('quiz-diff-screen').style.display = s === 'diff' ? 'block' : 'none';
    gi('quiz-q-screen').style.display = s === 'q' ? 'block' : 'none';
    gi('quiz-result-screen').style.display = s === 'res' ? 'block' : 'none';
    var funnel = gi('quiz-funnel');
    if (funnel) funnel.style.display = s === 'res' ? 'block' : 'none';
  }

  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }

  function renderQ() {
    var q = qs[ci]; var total = qs.length;
    var pct = Math.round(ci / total * 100);
    gi('quiz-prog-fill').style.width = pct + '%';
    gi('quiz-prog-txt').textContent = 'Question ' + (ci + 1) + ' of ' + total;
    gi('quiz-score-live').textContent = 'Score: ' + sc;
    var numEl = gi('quiz-q-num');
    if (numEl) numEl.textContent = 'Question ' + (ci + 1) + ' of ' + total;
    gi('quiz-q-text').textContent = q.q;
    gi('quiz-opts').innerHTML = q.opts.map(function(o, i) {
      return '<button class="quiz-opt" data-ans="' + i + '">' + o + '</button>';
    }).join('');
    gi('quiz-exp').style.display = 'none';
    gi('quiz-exp').className = 'quiz-explanation';
    gi('quiz-exp').textContent = '';
    gi('quiz-next-btn').style.display = 'none';
    done = false;
  }

  function animateRing(pct) {
    var ring = gi('res-ring');
    if (!ring) return;
    var circumference = 326.7;
    var offset = circumference - (pct / 100) * circumference;
    setTimeout(function() { ring.style.strokeDashoffset = offset; }, 120);
  }

  function showResult() {
    var pct = Math.round(sc / qs.length * 100);
    var range = QD.scoring[0];
    for (var i = 0; i < QD.scoring.length; i++) {
      if (pct >= QD.scoring[i].min && pct <= QD.scoring[i].max) { range = QD.scoring[i]; break; }
    }
    gi('res-pct').textContent = pct + '%';
    gi('res-label').textContent = range.icon + ' ' + range.label;
    gi('res-correct').textContent = sc + ' out of ' + qs.length + ' correct';
    gi('res-feedback').textContent = range.feedback;
    try {
      var h = JSON.parse(localStorage.getItem('vhh_quiz_hist') || '[]');
      h.unshift({ slug: QD.slug, name: QD.name, pct: pct, mode: mode, date: new Date().toISOString() });
      if (h.length > 20) h = h.slice(0, 20);
      localStorage.setItem('vhh_quiz_hist', JSON.stringify(h));
    } catch(e) {}
    var ring = gi('res-ring');
    if (ring) ring.style.strokeDashoffset = '326.7';
    showScreen('res');
    animateRing(pct);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.selectDiff = function(d) {
    selectedDiff = d;
    document.querySelectorAll('.quiz-diff-card').forEach(function(c) { c.className = 'quiz-diff-card'; });
    var card = document.querySelector('[data-diff="' + d + '"]');
    if (card) card.className = 'quiz-diff-card diff-selected-' + d;
    var btn = gi('quiz-start-btn');
    var labels = { easy: 'Start Easy \u2014 5 Questions \u2192', medium: 'Start Medium \u2014 8 Questions \u2192', hard: 'Start Hard \u2014 10 Questions \u2192' };
    btn.textContent = labels[d] || 'Start Quiz \u2192';
    btn.disabled = false;
  };

  window.startQuiz = function() {
    if (!selectedDiff) return;
    mode = selectedDiff; sc = 0; ci = 0; done = false;
    qs = shuffle(QD.questions).slice(0, COUNTS[mode]);
    showScreen('q');
    renderQ();
  };

  window.quizAns = function(idx) {
    if (done) return; done = true;
    var q = qs[ci]; var ok = idx === q.ans; if (ok) sc++;
    document.querySelectorAll('.quiz-opt').forEach(function(b, i) {
      b.disabled = true;
      if (i === q.ans) b.classList.add('correct');
      else if (i === idx && !ok) b.classList.add('wrong');
    });
    var ex = gi('quiz-exp');
    ex.textContent = (ok ? '\u2713 Correct! ' : '\u2717 Incorrect. ') + q.exp;
    ex.className = 'quiz-explanation' + (ok ? '' : ' wrong-exp');
    ex.style.display = 'block';
    gi('quiz-next-btn').style.display = 'block';
    gi('quiz-next-btn').textContent = ci >= qs.length - 1 ? 'See My Results \u2192' : 'Next Question \u2192';
  };

  window.quizNext = function() { ci++; if (ci >= qs.length) { showResult(); return; } renderQ(); };

  window.quizRetry = function() { selectedDiff = ''; showScreen('diff'); };

  window.quizShare = function() {
    var txt = 'I scored ' + gi('res-pct').textContent + ' on the ' + QD.name + ' quiz at VitalHealth Hub! ' + window.location.href;
    if (navigator.share) { navigator.share({ title: QD.name, text: txt, url: window.location.href }); }
    else if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(function() { alert('Result copied to clipboard!'); }); }
    else { alert(txt); }
  };

  window.quizEmailSubmit = function() {
    var inp = gi('quiz-email-input');
    var suc = gi('quiz-email-success');
    if (!inp || !inp.value || !inp.value.includes('@')) return;
    inp.style.display = 'none';
    var subBtn = document.querySelector('.quiz-email-submit');
    if (subBtn) subBtn.style.display = 'none';
    if (suc) suc.style.display = 'block';
    try { localStorage.setItem('vhh_email_sub', inp.value); } catch(e) {}
  };

  document.addEventListener('click', function(e) {
    var opt = e.target.closest('.quiz-opt');
    if (opt) {
      var optsEl = gi('quiz-opts');
      if (optsEl && optsEl.contains(opt)) { window.quizAns(parseInt(opt.dataset.ans)); return; }
    }

    var diffCard = e.target.closest('.quiz-diff-card');
    if (diffCard && diffCard.dataset.diff) { window.selectDiff(diffCard.dataset.diff); return; }

    var startBtn = e.target.closest('#quiz-start-btn');
    if (startBtn && !startBtn.disabled) { window.startQuiz(); return; }

    var nextBtn = e.target.closest('#quiz-next-btn');
    if (nextBtn) { window.quizNext(); return; }

    var retryBtn = e.target.closest('.quiz-retry-btn');
    if (retryBtn) { window.quizRetry(); return; }

    var shareBtn = e.target.closest('.quiz-share-btn');
    if (shareBtn) { window.quizShare(); return; }

    var emailBtn = e.target.closest('.quiz-email-submit');
    if (emailBtn) { window.quizEmailSubmit(); return; }
  });

  showScreen('diff');
});
