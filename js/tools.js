document.addEventListener('DOMContentLoaded', function() {

  // ── Tool page tracker (replaces TOOL_TRACKER_JS inline) ──────────────────
  (function() {
    var sl = window.location.pathname.split('/').pop().replace('.html', '');
    try {
      var r = JSON.parse(localStorage.getItem('vhh_recent_tools') || '[]');
      r = r.filter(function(s) { return s !== sl; });
      r.unshift(sl);
      if (r.length > 5) r = r.slice(0, 5);
      localStorage.setItem('vhh_recent_tools', JSON.stringify(r));
    } catch(e) {}
  })();

  var ws = document.querySelector('.saas-workspace[data-tool-type]');
  if (!ws) return;
  var toolType = ws.dataset.toolType;

  // ── HABIT TRACKER ─────────────────────────────────────────────────────────
  if (toolType === 'habit-tracker') {
    var TODAY_H = new Date().toISOString().split('T')[0];
    var dateLabel = document.getElementById('habitDateLabel');
    if (dateLabel) dateLabel.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

    function loadData() { return JSON.parse(localStorage.getItem('vhh_habits') || '{"habits":[]}'); }
    function saveData(d) { localStorage.setItem('vhh_habits', JSON.stringify(d)); }
    function getStreak(hist) {
      var s = 0; var d = new Date();
      for (var i = 0; i < 365; i++) {
        var k = new Date(d); k.setDate(k.getDate() - i);
        var ks = k.toISOString().split('T')[0];
        if (hist[ks]) { s++; } else if (i > 0) { break; }
      }
      return s;
    }
    function getLast7() {
      var days = [];
      for (var i = 6; i >= 0; i--) { var d = new Date(); d.setDate(d.getDate() - i); days.push(d.toISOString().split('T')[0]); }
      return days;
    }
    function addHabit() {
      var inp = document.getElementById('habitInput'); var name = inp.value.trim(); if (!name) return;
      var d = loadData(); d.habits.push({ id: Date.now().toString(), name: name, history: {} }); saveData(d); inp.value = ''; renderHabits();
    }
    function toggleHabit(id) {
      var d = loadData(); var h = d.habits.find(function(h) { return h.id === id; }); if (!h) return;
      if (h.history[TODAY_H]) { delete h.history[TODAY_H]; } else { h.history[TODAY_H] = true; } saveData(d); renderHabits();
    }
    function deleteHabit(id) {
      var d = loadData(); d.habits = d.habits.filter(function(h) { return h.id !== id; }); saveData(d); renderHabits();
    }
    function renderHabits() {
      var d = loadData(); var list = document.getElementById('habitList'); var empty = document.getElementById('habitEmpty');
      if (!d.habits.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
      empty.style.display = 'none';
      list.innerHTML = d.habits.map(function(h) {
        var done = !!h.history[TODAY_H]; var streak = getStreak(h.history);
        var dots = getLast7().map(function(dk) { return '<div class="habit-dot' + (h.history[dk] ? ' done' : '') + '"></div>'; }).join('');
        var hotClass = streak >= 3 ? ' hot' : '';
        return '<div class="habit-item' + (done ? ' done-today' : '') + '" id="hi-' + h.id + '">' +
          '<div class="habit-checkbox" data-tool-action="toggle-habit" data-id="' + h.id + '" title="Mark as done">' + (done ? '✓' : '') + '</div>' +
          '<span class="habit-name">' + h.name + '</span>' +
          '<div class="habit-weekly">' + dots + '</div>' +
          '<span class="habit-streak-badge' + hotClass + '">' + (streak >= 3 ? '🔥' : '') + streak + ' day' + (streak === 1 ? '' : 's') + '</span>' +
          '<button class="habit-del-btn" data-tool-action="del-habit" data-id="' + h.id + '" title="Delete habit">✕</button>' +
          '</div>';
      }).join('');
    }
    var habitInp = document.getElementById('habitInput');
    if (habitInp) habitInp.addEventListener('keydown', function(e) { if (e.key === 'Enter') addHabit(); });
    renderHabits();

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (!el) return;
      var action = el.dataset.toolAction; var id = el.dataset.id;
      if (action === 'add-habit') addHabit();
      else if (action === 'toggle-habit') toggleHabit(id);
      else if (action === 'del-habit') deleteHabit(id);
    });
  }

  // ── SLEEP TRACKER ─────────────────────────────────────────────────────────
  if (toolType === 'sleep-tracker') {
    var selQ = 4;
    function setQ(q) {
      selQ = q;
      document.querySelectorAll('#qualityBtns button').forEach(function(b) {
        b.classList.toggle('saas-btn-primary', parseInt(b.dataset.q) === q);
        b.classList.toggle('saas-btn-secondary', parseInt(b.dataset.q) !== q);
      });
    }
    setQ(4);
    function loadSleep() { return JSON.parse(localStorage.getItem('vhh_sleep') || '[]'); }
    function saveSleep(d) { localStorage.setItem('vhh_sleep', JSON.stringify(d)); }
    function calcScore(hrs, q) { var durScore = Math.min(100, Math.max(0, (hrs / 8) * 60 + (hrs >= 7 && hrs <= 9 ? 20 : 0))); var qScore = (q / 5) * 40; return Math.round(Math.min(100, durScore + qScore)); }
    function scoreGrade(s) { return s >= 80 ? ['Excellent', 'saas-badge-green'] : s >= 60 ? ['Good', 'saas-badge-blue'] : s >= 40 ? ['Fair', 'saas-badge-yellow'] : ['Poor', 'saas-badge-red']; }
    function timeToMins(t) { var p = t.split(':'); return parseInt(p[0]) * 60 + parseInt(p[1]); }
    function logSleep() {
      var bed = document.getElementById('sleepBed').value; var wake = document.getElementById('sleepWake').value; var note = document.getElementById('sleepNote').value.trim();
      if (!bed || !wake) { alert('Please enter bedtime and wake time.'); return; }
      var bm = timeToMins(bed); var wm = timeToMins(wake); var dur = wm > bm ? wm - bm : wm + (24 * 60 - bm); var hrs = dur / 60;
      var score = calcScore(hrs, selQ); var g = scoreGrade(score);
      var entry = { date: new Date().toISOString().split('T')[0], bed: bed, wake: wake, hrs: hrs.toFixed(1), quality: selQ, score: score, note: note };
      var data = loadSleep(); data.unshift(entry); if (data.length > 14) data = data.slice(0, 14); saveSleep(data);
      var res = document.getElementById('sleepResult');
      res.classList.remove('hidden');
      res.innerHTML = '<div class="saas-result-header"><span class="saas-result-check">✅</span><span class="saas-result-title">Sleep logged successfully!</span></div>' +
        '<div class="saas-stat-grid" style="grid-template-columns:repeat(3,1fr)">' +
        '<div class="saas-stat-card"><div class="saas-stat-value">' + hrs.toFixed(1) + 'h</div><div class="saas-stat-label">Duration</div></div>' +
        '<div class="saas-stat-card"><div class="saas-stat-value">' + score + '</div><div class="saas-stat-label">Score</div></div>' +
        '<div class="saas-stat-card"><div class="saas-stat-value"><span class="saas-badge ' + g[1] + '">' + g[0] + '</span></div><div class="saas-stat-label">Quality</div></div>' +
        '</div>';
      renderSleepHistory();
    }
    function renderSleepHistory() {
      var data = loadSleep(); var el = document.getElementById('sleepHistory');
      if (!data.length) { el.innerHTML = '<div class="saas-empty-state"><div class="saas-empty-icon">📋</div><p class="saas-empty-text">No sleep entries yet. Log your first night above!</p></div>'; return; }
      var html = '<table class="sleep-history-table"><thead><tr><th>Date</th><th>Hours</th><th>Quality</th><th>Score</th><th>Notes</th></tr></thead><tbody>';
      data.forEach(function(e) { var g = scoreGrade(e.score); html += '<tr><td>' + e.date + '</td><td>' + e.hrs + 'h</td><td>' + (['', '😞', '😕', '😐', '😊', '😄'][e.quality] || '-') + '</td><td><span class="saas-badge ' + g[1] + '">' + e.score + '</span></td><td style="color:#9ca3af;font-size:0.8rem">' + e.note + '</td></tr>'; });
      html += '</tbody></table>'; el.innerHTML = html;
    }
    renderSleepHistory();

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (el && el.dataset.toolAction === 'log-sleep') { logSleep(); return; }
      var qBtn = e.target.closest('[data-q]');
      if (qBtn && document.getElementById('qualityBtns') && document.getElementById('qualityBtns').contains(qBtn)) setQ(parseInt(qBtn.dataset.q));
    });
  }

  // ── MOOD TRACKER ──────────────────────────────────────────────────────────
  if (toolType === 'mood-tracker') {
    var selMood = 0;
    function selectMood(m) {
      selMood = m;
      document.querySelectorAll('#moodSelector .mood-btn').forEach(function(b) { b.classList.toggle('active', parseInt(b.dataset.m) === m); });
    }
    function loadMoods() { return JSON.parse(localStorage.getItem('vhh_mood') || '{}'); }
    function saveMoods(d) { localStorage.setItem('vhh_mood', JSON.stringify(d)); }
    function logMood() {
      if (!selMood) { alert('Please select a mood first.'); return; }
      var today = new Date().toISOString().split('T')[0];
      var data = loadMoods(); data[today] = { mood: selMood, note: document.getElementById('moodNote').value.trim() }; saveMoods(data);
      var conf = document.getElementById('moodConfirm');
      conf.style.display = 'block'; conf.textContent = '✅ Mood logged for today!';
      setTimeout(function() { conf.style.display = 'none'; }, 3000);
      renderCalendar();
    }
    function renderCalendar() {
      var data = loadMoods(); var cal = document.getElementById('moodCal'); var cells = ''; var total = 0; var count = 0;
      for (var i = 34; i >= 0; i--) {
        var d = new Date(); d.setDate(d.getDate() - i); var k = d.toISOString().split('T')[0];
        var ev = data[k]; var m = ev ? ev.mood : 0;
        if (m) { total += m; count++; }
        var title = k + (ev ? (' — ' + (ev.note || ['', 'Low', 'Down', 'OK', 'Good', 'Great'][m])) : '');
        cells += '<div class="mood-cal-cell" data-mood="' + m + '" title="' + title + '"></div>';
      }
      cal.innerHTML = cells;
      var avgEl = document.getElementById('moodAvg');
      if (count > 0 && avgEl) { avgEl.textContent = '7-day avg: ' + (['', '😞', '😟', '😐', '😊', '😄'][Math.round(total / count)] + ' ' + ['', 'Low', 'Down', 'OK', 'Good', 'Great'][Math.round(total / count)]); }
    }
    renderCalendar();

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (el && el.dataset.toolAction === 'log-mood') { logMood(); return; }
      var mBtn = e.target.closest('.mood-btn[data-m]');
      if (mBtn) selectMood(parseInt(mBtn.dataset.m));
    });
  }

  // ── STEP TRACKER ──────────────────────────────────────────────────────────
  if (toolType === 'step-tracker') {
    var C_STEP = 2 * Math.PI * 68;
    var stepCircle = document.getElementById('stepCircle');
    if (stepCircle) { stepCircle.style.strokeDasharray = C_STEP; stepCircle.style.strokeDashoffset = C_STEP; }
    function setRing(pct) { if (stepCircle) stepCircle.style.strokeDashoffset = C_STEP - (pct / 100) * C_STEP; }
    function loadSteps() { return JSON.parse(localStorage.getItem('vhh_steps') || '[]'); }
    function saveSteps(d) { localStorage.setItem('vhh_steps', JSON.stringify(d)); }
    function logSteps() {
      var steps = parseInt(document.getElementById('stepInput').value);
      var goal = parseInt(document.getElementById('stepGoal').value) || 10000;
      if (!steps || steps < 0) { alert('Please enter a valid step count.'); return; }
      var today = new Date().toISOString().split('T')[0];
      var data = loadSteps();
      data = data.filter(function(e) { return e.date !== today; });
      data.unshift({ date: today, steps: steps, goal: goal });
      if (data.length > 14) data = data.slice(0, 14); saveSteps(data);
      var pct = Math.min(100, Math.round((steps / goal) * 100));
      document.getElementById('stepRingWrap').style.display = 'flex';
      document.getElementById('stepPct').textContent = pct + '%';
      document.getElementById('stepCount').textContent = steps.toLocaleString() + ' / ' + goal.toLocaleString() + ' steps';
      setTimeout(function() { setRing(pct); }, 50);
      renderStepChart();
    }
    function renderStepChart() {
      var data = loadSteps().slice(0, 7).reverse(); var el = document.getElementById('stepChart');
      if (!data.length) { el.innerHTML = '<div class="saas-empty-state"><div class="saas-empty-icon">👣</div><p class="saas-empty-text">Log steps to see your weekly chart!</p></div>'; return; }
      var maxS = Math.max.apply(null, data.map(function(e) { return e.steps; }));
      var today = new Date().toISOString().split('T')[0];
      var bars = data.map(function(e) {
        var pct = maxS > 0 ? Math.max(8, Math.round((e.steps / maxS) * 100)) : 8;
        var isToday = e.date === today;
        var day = new Date(e.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short' });
        return '<div class="step-bar-col"><div class="step-bar' + (isToday ? ' active' : '') + '" style="height:' + pct + 'px" title="' + e.steps.toLocaleString() + ' steps"></div><div class="step-bar-label">' + day + '</div></div>';
      }).join('');
      el.innerHTML = '<div class="step-bar-chart">' + bars + '</div>';
    }
    renderStepChart();

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (el && el.dataset.toolAction === 'log-steps') logSteps();
    });
  }

  // ── HEALTH DASHBOARD ──────────────────────────────────────────────────────
  if (toolType === 'health-dashboard') {
    var dashDate = document.getElementById('dashDate');
    if (dashDate) dashDate.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    function buildDash() {
      var sleepData = JSON.parse(localStorage.getItem('vhh_sleep') || '[]');
      var moodData = JSON.parse(localStorage.getItem('vhh_mood') || '{}');
      var stepData = JSON.parse(localStorage.getItem('vhh_steps') || '[]');
      var habitData = JSON.parse(localStorage.getItem('vhh_habits') || '{"habits":[]}');
      var today = new Date().toISOString().split('T')[0]; var metrics = [];
      var ls = sleepData[0];
      metrics.push({ icon: '😴', label: 'Last Sleep', val: ls ? ls.hrs + 'h (score ' + ls.score + ')' : 'Not logged yet', sub: ls ? ls.date : '', href: '/tools/sleep-tracker', empty: !ls });
      var todayMood = moodData[today]; var moodLabels = ['', '😞 Low', '😟 Down', '😐 OK', '😊 Good', '😄 Great'];
      metrics.push({ icon: '🌈', label: "Today's Mood", val: todayMood ? moodLabels[todayMood.mood] : 'Not logged yet', sub: todayMood ? todayMood.note : '', href: '/tools/mood-tracker', empty: !todayMood });
      var ts = stepData.find(function(e) { return e.date === today; });
      metrics.push({ icon: '👟', label: "Today's Steps", val: ts ? ts.steps.toLocaleString() + ' / ' + ts.goal.toLocaleString() : 'Not logged yet', sub: ts ? Math.round((ts.steps / ts.goal) * 100) + '% of goal' : '', href: '/tools/step-tracker', empty: !ts });
      var total = habitData.habits.length; var done = habitData.habits.filter(function(h) { return h.history && h.history[today]; }).length;
      metrics.push({ icon: '🔥', label: 'Habits Today', val: total ? done + ' / ' + total + ' done' : 'No habits set', sub: total ? Math.round((done / total) * 100) + '% completion' : '', href: '/tools/habit-tracker', empty: !total });
      var grid = document.getElementById('dashGrid');
      grid.innerHTML = metrics.map(function(m) {
        return '<a href="' + m.href + '" class="dashboard-metric-card' + (m.empty ? ' empty-metric' : '') + '">' +
          '<div class="dashboard-metric-icon">' + m.icon + '</div>' +
          '<div class="dashboard-metric-label">' + m.label + '</div>' +
          '<div class="dashboard-metric-value">' + m.val + '</div>' +
          (m.sub ? '<div class="dashboard-metric-sub">' + m.sub + '</div>' : '') + '</a>';
      }).join('');
      var hasAny = sleepData.length || Object.keys(moodData).length || stepData.length || habitData.habits.length;
      document.getElementById('dashNotice').style.display = hasAny ? 'none' : 'flex';
    }
    buildDash();
  }

  // ── DAILY PLANNER ─────────────────────────────────────────────────────────
  if (toolType === 'daily-planner') {
    var TODAY_P = new Date().toISOString().split('T')[0];
    var PKEY = 'vhh_planner_' + TODAY_P;
    var PLABELS = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' };
    var pdEl = document.getElementById('plannerDate');
    if (pdEl) pdEl.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    function loadTasks() { return JSON.parse(localStorage.getItem(PKEY) || '[]'); }
    function saveTasks(d) { localStorage.setItem(PKEY, JSON.stringify(d)); }
    function addTask() {
      var name = document.getElementById('plannerTask').value.trim(); if (!name) return;
      var time = document.getElementById('plannerTime').value; var pri = document.getElementById('plannerPriority').value;
      var tasks = loadTasks();
      tasks.push({ id: Date.now().toString(), name: name, time: time, priority: pri, done: false });
      tasks.sort(function(a, b) { var o = { high: 0, medium: 1, low: 2 }; return o[a.priority] - o[b.priority]; });
      saveTasks(tasks); document.getElementById('plannerTask').value = ''; renderTasks();
    }
    function toggleTask(id) { var t = loadTasks(); var tk = t.find(function(x) { return x.id === id; }); if (tk) tk.done = !tk.done; saveTasks(t); renderTasks(); }
    function deleteTask(id) { var t = loadTasks().filter(function(x) { return x.id !== id; }); saveTasks(t); renderTasks(); }
    function clearDone() { var t = loadTasks().filter(function(x) { return !x.done; }); saveTasks(t); renderTasks(); }
    function renderTasks() {
      var tasks = loadTasks(); var list = document.getElementById('plannerList'); var empty = document.getElementById('plannerEmpty');
      if (!tasks.length) { list.innerHTML = ''; empty.style.display = 'block'; document.getElementById('plannerStats').innerHTML = ''; return; }
      empty.style.display = 'none';
      list.innerHTML = tasks.map(function(tk) {
        var badgeMap = { high: 'saas-badge-red', medium: 'saas-badge-yellow', low: 'saas-badge-green' };
        return '<div class="planner-task' + (tk.done ? ' done-task' : '') + '">' +
          '<input type="checkbox" class="planner-task-cb"' + (tk.done ? ' checked' : '') + ' data-tool-action="toggle-task" data-id="' + tk.id + '">' +
          '<span class="planner-task-time">' + tk.time + '</span>' +
          '<span class="planner-task-name">' + tk.name + '</span>' +
          '<span class="planner-priority"><span class="saas-badge ' + badgeMap[tk.priority] + '">' + PLABELS[tk.priority] + '</span></span>' +
          '<button class="planner-task-del" data-tool-action="del-task" data-id="' + tk.id + '">✕</button>' +
          '</div>';
      }).join('');
      var done = tasks.filter(function(t) { return t.done; }).length;
      document.getElementById('plannerStats').innerHTML = '<span class="planner-stat"><strong>' + tasks.length + '</strong> total</span><span class="planner-stat"><strong>' + done + '</strong> done</span><span class="planner-stat"><strong>' + (tasks.length - done) + '</strong> remaining</span>';
    }
    var ptInp = document.getElementById('plannerTask');
    if (ptInp) ptInp.addEventListener('keydown', function(e) { if (e.key === 'Enter') addTask(); });
    renderTasks();

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (!el) return;
      var action = el.dataset.toolAction; var id = el.dataset.id;
      if (action === 'add-task') addTask();
      else if (action === 'clear-done') clearDone();
      else if (action === 'toggle-task') toggleTask(id);
      else if (action === 'del-task') deleteTask(id);
    });
  }

  // ── FOCUS TIMER ───────────────────────────────────────────────────────────
  if (toolType === 'focus-timer') {
    var timerInterval = null; var isRunning = false; var isBreak = false; var sessionsCompleted = 0;
    var totalSecs = 25 * 60; var secsLeft = totalSecs;
    var C_T = 2 * Math.PI * 88; var tc = document.getElementById('timerCircle');
    if (tc) { tc.style.strokeDasharray = C_T; tc.style.strokeDashoffset = 0; }
    function getWorkSecs() { return parseInt(document.getElementById('workMin').value || 25) * 60; }
    function getBreakSecs() { return parseInt(document.getElementById('breakMin').value || 5) * 60; }
    function getLongBreakSecs() { return parseInt(document.getElementById('longBreakMin').value || 20) * 60; }
    function getSessToLong() { return parseInt(document.getElementById('sessionsToLong').value || 4); }
    function updateDisplay() {
      var m = Math.floor(secsLeft / 60); var s = secsLeft % 60;
      document.getElementById('timerDisplay').textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      document.title = document.getElementById('timerDisplay').textContent + ' — ' + (isBreak ? 'Break' : 'Focus');
      var pct = 1 - (secsLeft / totalSecs); if (tc) tc.style.strokeDashoffset = C_T * pct;
    }
    function timerToggle() {
      if (isRunning) { clearInterval(timerInterval); isRunning = false; document.getElementById('timerStartBtn').textContent = '▶ Start'; }
      else { isRunning = true; document.getElementById('timerStartBtn').textContent = '⏸ Pause'; timerInterval = setInterval(tick, 1000); }
    }
    function tick() {
      if (secsLeft <= 0) {
        clearInterval(timerInterval); isRunning = false;
        if (!isBreak) { sessionsCompleted++; document.getElementById('timerSessions').innerHTML = 'Sessions completed: <strong>' + sessionsCompleted + '</strong>'; }
        timerSkip();
        try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA').play().catch(function() {}); } catch(e) {}
        alert(isBreak ? 'Break time! Back to work.' : 'Great work! Time for a break.');
        return;
      }
      secsLeft--; updateDisplay();
    }
    function timerReset() {
      clearInterval(timerInterval); isRunning = false;
      isBreak = false; totalSecs = getWorkSecs(); secsLeft = totalSecs;
      document.getElementById('timerStartBtn').textContent = '▶ Start';
      document.getElementById('timerModeBadge').textContent = 'Work Session';
      document.getElementById('timerModeBadge').className = 'timer-mode-badge timer-work';
      if (tc) tc.style.strokeDashoffset = 0; document.title = 'Focus Timer';
      updateDisplay();
    }
    function timerSkip() {
      clearInterval(timerInterval); isRunning = false;
      if (isBreak) { isBreak = false; totalSecs = getWorkSecs(); document.getElementById('timerModeBadge').textContent = 'Work Session'; document.getElementById('timerModeBadge').className = 'timer-mode-badge timer-work'; }
      else { isBreak = true; var isLong = (sessionsCompleted % getSessToLong() === 0 && sessionsCompleted > 0); totalSecs = isLong ? getLongBreakSecs() : getBreakSecs(); document.getElementById('timerModeBadge').textContent = isLong ? 'Long Break' : 'Short Break'; document.getElementById('timerModeBadge').className = 'timer-mode-badge timer-break'; }
      secsLeft = totalSecs; document.getElementById('timerStartBtn').textContent = '▶ Start'; if (tc) tc.style.strokeDashoffset = 0; updateDisplay();
    }
    updateDisplay();

    document.querySelectorAll('.timer-setting-input').forEach(function(inp) {
      inp.addEventListener('change', function() { if (!isRunning) timerReset(); });
    });

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (!el) return;
      var action = el.dataset.toolAction;
      if (action === 'timer-toggle') timerToggle();
      else if (action === 'timer-reset') timerReset();
      else if (action === 'timer-skip') timerSkip();
    });
  }

  // ── GOAL TRACKER ──────────────────────────────────────────────────────────
  if (toolType === 'goal-tracker') {
    function loadGoals() { return JSON.parse(localStorage.getItem('vhh_goals') || '[]'); }
    function saveGoals(d) { localStorage.setItem('vhh_goals', JSON.stringify(d)); }
    function calcPct(c, t) { if (t === 0) return 0; var p = Math.round((c / t) * 100); return Math.min(100, Math.max(0, p)); }
    function addGoal() {
      var name = document.getElementById('goalName').value.trim(); var unit = document.getElementById('goalUnit').value.trim() || 'units';
      var cur = parseFloat(document.getElementById('goalCurrent').value); var tgt = parseFloat(document.getElementById('goalTarget').value);
      if (!name || isNaN(cur) || isNaN(tgt)) { alert('Please fill in all goal fields.'); return; }
      var goals = loadGoals(); goals.push({ id: Date.now().toString(), name: name, unit: unit, current: cur, target: tgt }); saveGoals(goals);
      ['goalName', 'goalUnit', 'goalCurrent', 'goalTarget'].forEach(function(id) { document.getElementById(id).value = ''; });
      renderGoals();
    }
    function deleteGoal(id) { saveGoals(loadGoals().filter(function(g) { return g.id !== id; })); renderGoals(); }
    function updateGoal(id) {
      var inp = document.getElementById('gupd-' + id); if (!inp) return;
      var val = parseFloat(inp.value); if (isNaN(val)) { alert('Please enter a valid number.'); return; }
      var goals = loadGoals(); var g = goals.find(function(g) { return g.id === id; }); if (g) g.current = val; saveGoals(goals); renderGoals();
    }
    function renderGoals() {
      var goals = loadGoals(); var list = document.getElementById('goalList'); var empty = document.getElementById('goalEmpty');
      if (!goals.length) { list.innerHTML = ''; empty.style.display = 'block'; return; }
      empty.style.display = 'none';
      list.innerHTML = goals.map(function(g) {
        var pct = calcPct(g.current, g.target); var fillClass = pct >= 80 ? '' : pct >= 50 ? '' : pct < 30 ? 'danger' : 'warn'; var complete = pct >= 100;
        return '<div class="goal-card">' +
          '<div class="goal-card-header">' +
            '<div><div class="goal-name">' + g.name + '</div><div class="goal-target-info">' + g.current + ' / ' + g.target + ' ' + g.unit + '</div></div>' +
            '<div class="goal-card-actions">' +
              '<span class="saas-badge ' + (pct >= 100 ? 'saas-badge-green' : pct >= 70 ? 'saas-badge-blue' : pct >= 40 ? 'saas-badge-yellow' : 'saas-badge-red') + '">' + pct + '%</span>' +
              '<button class="saas-btn saas-btn-danger saas-btn-sm" data-tool-action="del-goal" data-id="' + g.id + '">Delete</button>' +
            '</div>' +
          '</div>' +
          '<div class="saas-progress-wrap"><div class="saas-progress-bar"><div class="saas-progress-fill ' + fillClass + '" style="width:' + pct + '%"></div></div></div>' +
          (complete ? '<div class="goal-complete-badge">🎉 Goal achieved!</div>' :
            '<div class="goal-update-form"><span style="font-size:0.85rem;color:#6b7280">Update:</span><input class="goal-update-input" id="gupd-' + g.id + '" type="number" placeholder="New value"><button class="saas-btn saas-btn-ghost saas-btn-sm" data-tool-action="update-goal" data-id="' + g.id + '">Save</button></div>') +
        '</div>';
      }).join('');
    }
    renderGoals();

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (!el) return;
      var action = el.dataset.toolAction; var id = el.dataset.id;
      if (action === 'add-goal') addGoal();
      else if (action === 'del-goal') deleteGoal(id);
      else if (action === 'update-goal') updateGoal(id);
    });
  }

  // ── ADVANCED TEXT ANALYZER ────────────────────────────────────────────────
  if (toolType === 'advanced-text-analyzer') {
    var STOP = ['the','a','an','and','or','but','in','on','at','to','for','of','with','is','it','this','that','are','was','as','by','be','from','they','we','our','you','he','she','his','her','their','have','had','has','do','did','not','if','its','my','i','me','your','we','us','all','can','will','would','could','should','more','so','up','also','about','into','what','which','when','where','who','been'];
    function countSyllables(w) { w = w.toLowerCase().replace(/[^a-z]/g, ''); var c = 0; var m = w.match(/[aeiou]+/g); if (m) c = m.length; if (w.endsWith('e') && c > 1) c--; return Math.max(1, c); }
    function analyzeText() {
      var text = document.getElementById('textInput').value;
      var words = text.trim() ? text.trim().split(/\s+/).filter(function(w) { return w.length > 0; }) : [];
      var chars = text.length; var sents = text.split(/[.!?]+/).filter(function(s) { return s.trim().length > 1; }).length;
      var paras = text.split(/\n\s*\n/).filter(function(p) { return p.trim().length > 0; }).length;
      var readMins = Math.ceil(words.length / 200);
      document.getElementById('statWords').textContent = words.length.toLocaleString();
      document.getElementById('statChars').textContent = chars.toLocaleString();
      document.getElementById('statSents').textContent = sents;
      document.getElementById('statParas').textContent = paras || 0;
      document.getElementById('statRead').textContent = (readMins || 0) + ' min';
      if (words.length > 10 && sents > 0) {
        var sylls = words.reduce(function(t, w) { return t + countSyllables(w); }, 0);
        var asl = words.length / sents; var asw = sylls / words.length;
        var flesch = Math.round(206.835 - 1.015 * asl - 84.6 * asw); flesch = Math.max(0, Math.min(100, flesch));
        document.getElementById('statFlesch').textContent = flesch;
        var grade = flesch >= 90 ? '5th' : flesch >= 80 ? '6th' : flesch >= 70 ? '7th' : flesch >= 60 ? '8-9th' : flesch >= 50 ? '10-12th' : flesch >= 30 ? 'College' : 'Professional';
        var gradeClass = flesch >= 70 ? 'saas-badge-green' : flesch >= 50 ? 'saas-badge-yellow' : 'saas-badge-red';
        document.getElementById('statGrade').textContent = 'Grade: ' + grade;
        document.getElementById('statGrade').className = 'readability-grade saas-badge ' + gradeClass;
      } else {
        document.getElementById('statFlesch').textContent = '—';
        document.getElementById('statGrade').textContent = 'Grade: —';
        document.getElementById('statGrade').className = 'readability-grade saas-badge saas-badge-gray';
      }
      if (words.length > 0) {
        var freq = {}; words.forEach(function(w) { var k = w.toLowerCase().replace(/[^a-z]/g, ''); if (k.length > 2 && STOP.indexOf(k) === -1) freq[k] = (freq[k] || 0) + 1; });
        var sorted = Object.keys(freq).sort(function(a, b) { return freq[b] - freq[a]; }).slice(0, 10);
        var maxF = sorted.length ? freq[sorted[0]] : 1;
        var rows = sorted.map(function(w) { var pct = Math.round((freq[w] / words.length) * 100); var barPct = Math.round((freq[w] / maxF) * 100); return '<tr><td>' + w + '</td><td>' + freq[w] + '</td><td>' + pct + '%</td><td class="keyword-bar-cell"><div class="keyword-mini-bar"><div class="keyword-mini-fill" style="width:' + barPct + '%"></div></div></td></tr>'; }).join('');
        document.getElementById('kwBody').innerHTML = rows || '<tr><td colspan="4" style="color:#9ca3af;text-align:center">No meaningful keywords found</td></tr>';
      }
    }
    function cleanAction(type) {
      var el = document.getElementById('textInput'); var t = el.value;
      if (type === 'trim') t = t.replace(/[ \t]+/g, ' ').trim();
      else if (type === 'breaks') t = t.replace(/\n{3,}/g, '\n\n').trim();
      else if (type === 'special') t = t.replace(/[^a-zA-Z0-9\s.,!?;:'"()-]/g, '');
      else if (type === 'html') t = t.replace(/<[^>]+>/g, '');
      else if (type === 'lower') t = t.toLowerCase();
      el.value = t; analyzeText();
    }
    var textInp = document.getElementById('textInput');
    if (textInp) textInp.addEventListener('input', analyzeText);

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (!el) return;
      var action = el.dataset.toolAction;
      if (action === 'copy-text') { navigator.clipboard.writeText(document.getElementById('textInput').value).then(function() { alert('Text copied to clipboard!'); }); }
      var cleanEl = e.target.closest('[data-clean]');
      if (cleanEl) cleanAction(cleanEl.dataset.clean);
    });
  }

  // ── HEADLINE ANALYZER ─────────────────────────────────────────────────────
  if (toolType === 'headline-analyzer') {
    var HL_POWER = ['proven','secret','exclusive','ultimate','powerful','effective','guaranteed','transform','discover','instantly','best','free','new','amazing','breakthrough','critical','essential','hidden','revealed','simple','easy','fast','quick','boost','master','expert','complete','definitive','shocking','surprising','warning','important','hurry','limited','now','today','last','urgent','never','always','stop','start','save','earn','lose','gain'];
    var HL_C = 2 * Math.PI * 50;
    var hlCircle = document.getElementById('hlCircle');
    if (hlCircle) { hlCircle.style.strokeDasharray = HL_C; hlCircle.style.strokeDashoffset = HL_C; }
    function analyzeHeadline() {
      var h = document.getElementById('headlineInput').value.trim();
      document.getElementById('headlineLen').textContent = h.length;
      if (h.length < 3) { document.getElementById('headlineResults').style.display = 'none'; return; }
      document.getElementById('headlineResults').style.display = 'block';
      var words = h.split(/\s+/).filter(function(w) { return w.length > 0; }); var wCount = words.length;
      var lenScore = 0; if (h.length >= 55 && h.length <= 70) lenScore = 100; else if (h.length >= 40 && h.length < 55) lenScore = 70; else if (h.length > 70 && h.length <= 90) lenScore = 60; else if (h.length < 40) lenScore = Math.round((h.length / 40) * 60); else lenScore = Math.max(20, 60 - Math.round((h.length - 90) / 3) * 5);
      var lowerWords = words.map(function(w) { return w.toLowerCase().replace(/[^a-z]/g, ''); });
      var foundPw = HL_POWER.filter(function(pw) { return lowerWords.indexOf(pw) !== -1; }); var pwScore = Math.min(100, foundPw.length * 25);
      var hasNum = /\d/.test(h); var numScore = hasNum ? 100 : 0;
      var wcScore = wCount >= 6 && wCount <= 12 ? 100 : wCount >= 4 && wCount < 6 ? 70 : wCount > 12 && wCount <= 16 ? 75 : Math.max(0, 50 - (Math.abs(wCount - 9) * 8));
      var emotWords = ['amazing','incredible','shocking','surprising','life-changing','revolutionary','game-changer','powerful','essential','critical','never','always','every','guaranteed','simple','easy','faster'];
      var hasEmot = emotWords.some(function(w) { return h.toLowerCase().indexOf(w) !== -1; }); var emotScore = hasEmot ? 80 : foundPw.length > 0 ? 50 : 20;
      var total = Math.round(lenScore * 0.25 + pwScore * 0.30 + numScore * 0.20 + wcScore * 0.15 + emotScore * 0.10);
      var pct = total / 100; if (hlCircle) hlCircle.style.strokeDashoffset = HL_C - (pct * HL_C);
      document.getElementById('hlScoreVal').textContent = total;
      var grade = total >= 70 ? ['Excellent!', 'saas-badge-green'] : total >= 50 ? ['Good', 'saas-badge-blue'] : total >= 35 ? ['Needs Work', 'saas-badge-yellow'] : ['Weak', 'saas-badge-red'];
      document.getElementById('hlGradeBadge').textContent = grade[0]; document.getElementById('hlGradeBadge').className = 'headline-grade-badge saas-badge ' + grade[1];
      var breakdown = [
        { label: 'Length', score: lenScore, color: '#52b788' }, { label: 'Power Words', score: pwScore, color: '#2d6a4f' },
        { label: 'Has Number', score: numScore, color: '#40916c' }, { label: 'Word Count', score: wcScore, color: '#74c69d' },
        { label: 'Emotion', score: emotScore, color: '#95d5b2' }
      ];
      document.getElementById('hlBreakdown').innerHTML = breakdown.map(function(b) {
        return '<div class="headline-breakdown-row"><span class="headline-breakdown-label">' + b.label + '</span>' +
          '<div class="headline-breakdown-bar"><div class="headline-breakdown-fill" style="width:' + b.score + '%;background:' + b.color + '"></div></div>' +
          '<span class="headline-breakdown-score">' + b.score + '</span></div>';
      }).join('');
      var suggs = [];
      if (h.length < 55) suggs.push({ icon: '📏', text: 'Your headline is too short. Aim for 55–70 characters for best SEO performance.' });
      if (h.length > 70) suggs.push({ icon: '✂️', text: 'Your headline is long. Google may truncate it in search results. Try to keep under 70 characters.' });
      if (!hasNum) suggs.push({ icon: '🔢', text: 'Add a specific number to your headline (e.g. "7 Ways...", "3 Proven..."). Headlines with numbers get significantly more clicks.' });
      if (foundPw.length === 0) suggs.push({ icon: '⚡', text: 'Add a power word to trigger an emotional response. Try: proven, secret, ultimate, transform, discover, boost.' });
      if (wCount < 6) suggs.push({ icon: '➕', text: 'Your headline is too short — add more detail. Aim for 8–12 words for optimal engagement.' });
      if (wCount > 16) suggs.push({ icon: '✂️', text: 'Your headline is quite long. Consider trimming to 8–12 words for better impact.' });
      if (total >= 70) suggs.push({ icon: '🎉', text: 'Great headline! It has strong length, power words, and structure. Test it against an alternative for best results.' });
      document.getElementById('hlSuggestions').innerHTML = '<div class="saas-section-heading">💡 Suggestions</div>' + suggs.map(function(s) { return '<div class="headline-suggestion-item"><span class="headline-suggestion-icon">' + s.icon + '</span>' + s.text + '</div>'; }).join('');
      if (foundPw.length > 0) { document.getElementById('hlPowerWords').style.display = 'block'; document.getElementById('hlPwList').innerHTML = foundPw.map(function(w) { return '<span class="headline-pw-chip">' + w + '</span>'; }).join(''); }
      else { document.getElementById('hlPowerWords').style.display = 'none'; }
    }
    var hlInp = document.getElementById('headlineInput');
    if (hlInp) hlInp.addEventListener('input', analyzeHeadline);
  }

  // ── CONTENT IDEA GENERATOR ────────────────────────────────────────────────
  if (toolType === 'content-idea-generator') {
    var FRAMEWORKS = {
      blog: ['The Definitive Guide to {topic} for {audience}','How {topic} Changed My Life (And How It Can Change Yours)','X Things Nobody Tells You About {topic}','Is {topic} Right for You? A Complete Breakdown','The Science Behind {topic}: What Research Actually Says','Common {topic} Myths Debunked by Health Experts','How to Get Started with {topic} This Week','The Beginner\'s Roadmap to {topic}: Step by Step','Why {topic} Is the Health Habit You\'ve Been Missing','Top {topic} Mistakes and How to Avoid Them','How to Build a {topic} Routine That Actually Sticks','The {audience}\'s Complete Guide to {topic}'],
      social: ['Swipe to see why {topic} could transform your health 👉','Hot take: {topic} is more important than you think 🔥','I tried {topic} for 30 days — here\'s what happened','3 {topic} tips I wish I knew sooner (save this!)','Myth vs. Fact: Everything you think you know about {topic}','Tag someone who needs this {topic} tip 👇','The one {topic} habit that changed everything for me','Your weekly reminder to prioritise your {topic} journey'],
      faq: ['What is {topic} and is it right for me?','How does {topic} actually work?','What are the benefits of {topic}?','Are there any risks or side effects to {topic}?','How long does it take to see results from {topic}?','Can beginners start {topic} right away?','What does the science say about {topic}?','How is {topic} different from similar approaches?'],
      action: ['Create a free {topic} checklist for beginners','Build a 30-day {topic} challenge for your audience','Design a {topic} tracker template for download','Write a {topic} quiz to assess reader knowledge','Produce a step-by-step {topic} infographic']
    };
    function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
    function fillTemplate(t, topic, audience) { return t.replace(/\{topic\}/g, topic).replace(/\{audience\}/g, audience).replace(/X /, '7 '); }
    function generateIdeas() {
      var topic = document.getElementById('ideaTopic').value.trim();
      if (!topic) { alert('Please enter a health topic first.'); return; }
      var audEl = document.getElementById('ideaAudience');
      var audience = audEl.options[audEl.selectedIndex].text;
      var output = document.getElementById('ideaOutput');
      output.innerHTML = '<div class="idea-gen-generating">⚡ Generating ideas for "<strong>' + topic + '</strong>"…</div>';
      setTimeout(function() {
        var sections = [
          { label: '📝 Blog Post Ideas', key: 'blog', icon: '📝' }, { label: '📲 Social Media Angles', key: 'social', icon: '📲' },
          { label: '❓ FAQs to Answer', key: 'faq', icon: '❓' }, { label: '⚡ Action Content', key: 'action', icon: '⚡' }
        ];
        var html = sections.map(function(s) {
          var ideas = FRAMEWORKS[s.key].slice(0, s.key === 'action' ? 4 : 6).map(function(t) { return fillTemplate(t, topic, audience); });
          var cards = ideas.map(function(idea) {
            var safeIdea = idea.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
            return '<div class="idea-card"><span class="idea-card-text">' + cap(idea) + '</span><button class="idea-copy-btn" data-tool-action="copy-idea" data-idea="' + safeIdea + '">Copy</button></div>';
          }).join('');
          return '<div class="idea-category-block"><div class="idea-category-title">' + s.icon + ' ' + s.label + '</div><div class="idea-cards">' + cards + '</div></div>';
        }).join('');
        output.innerHTML = html;
      }, 600);
    }
    var ideaInp = document.getElementById('ideaTopic');
    if (ideaInp) ideaInp.addEventListener('keydown', function(e) { if (e.key === 'Enter') generateIdeas(); });

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (!el) return;
      var action = el.dataset.toolAction;
      if (action === 'generate-ideas') generateIdeas();
      else if (action === 'copy-idea') {
        var text = el.dataset.idea || '';
        navigator.clipboard.writeText(text).then(function() { el.textContent = '✓ Copied!'; setTimeout(function() { el.textContent = 'Copy'; }, 2000); });
      }
    });
  }

  // ── IMAGE COMPRESSOR ──────────────────────────────────────────────────────
  if (toolType === 'image-compressor') {
    var cFile = null; var cOrigSize = 0;
    var drop = document.getElementById('toolDrop'); var fileInp = document.getElementById('toolFile');
    if (drop) {
      drop.addEventListener('dragover', function(e) { e.preventDefault(); drop.classList.add('drag-over'); });
      drop.addEventListener('dragleave', function() { drop.classList.remove('drag-over'); });
      drop.addEventListener('drop', function(e) { e.preventDefault(); drop.classList.remove('drag-over'); if (e.dataTransfer.files[0]) loadImgFile(e.dataTransfer.files[0]); });
      drop.addEventListener('click', function() { if (fileInp) fileInp.click(); });
    }
    if (fileInp) fileInp.addEventListener('change', function() { if (this.files[0]) loadImgFile(this.files[0]); });
    var qualSlider = document.getElementById('qualSlider');
    if (qualSlider) qualSlider.addEventListener('input', function() { var qv = document.getElementById('qualVal'); if (qv) qv.textContent = this.value; });
    function loadImgFile(f) {
      if (!f.type.startsWith('image/')) { alert('Please upload an image file.'); return; }
      cFile = f; cOrigSize = f.size;
      drop.querySelector('h3').textContent = f.name;
      drop.querySelector('p').textContent = 'Loaded (' + Math.round(f.size / 1024) + 'KB) — ready to compress';
      document.getElementById('compressBtn').disabled = false;
    }
    function doCompress() {
      if (!cFile) return; var q = parseInt(qualSlider.value) / 100;
      var btn = document.getElementById('compressBtn'); btn.textContent = 'Compressing…'; btn.disabled = true;
      var img = new Image(); var url = URL.createObjectURL(cFile);
      img.onload = function() {
        var c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
        var ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0);
        c.toBlob(function(blob) {
          var oUrl = URL.createObjectURL(blob); var dl = document.getElementById('compDl'); dl.href = oUrl; dl.download = 'compressed.jpg';
          var saved = Math.round((1 - blob.size / cOrigSize) * 100);
          document.getElementById('compInfo').textContent = 'Original: ' + Math.round(cOrigSize / 1024) + 'KB → ' + Math.round(blob.size / 1024) + 'KB (saved ' + saved + '%)';
          var prev = document.getElementById('compPreview'); prev.src = oUrl; prev.style.display = 'block';
          document.getElementById('compResult').classList.add('visible');
          btn.textContent = 'Compress Again'; btn.disabled = false; URL.revokeObjectURL(url);
        }, 'image/jpeg', q);
      };
      img.src = url;
    }
    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (el && el.dataset.toolAction === 'compress') doCompress();
    });
  }

  // ── IMAGE CONVERTER ───────────────────────────────────────────────────────
  if (toolType === 'image-converter') {
    var convFile = null; var fmtMime = 'image/jpeg'; var fmtExt = 'jpg';
    var convDrop = document.getElementById('convDrop'); var convFileInp = document.getElementById('convFile');
    if (convDrop) {
      convDrop.addEventListener('dragover', function(e) { e.preventDefault(); convDrop.classList.add('drag-over'); });
      convDrop.addEventListener('dragleave', function() { convDrop.classList.remove('drag-over'); });
      convDrop.addEventListener('drop', function(e) { e.preventDefault(); convDrop.classList.remove('drag-over'); if (e.dataTransfer.files[0]) loadConvFile(e.dataTransfer.files[0]); });
      convDrop.addEventListener('click', function() { if (convFileInp) convFileInp.click(); });
    }
    if (convFileInp) convFileInp.addEventListener('change', function() { if (this.files[0]) loadConvFile(this.files[0]); });
    function loadConvFile(f) {
      if (!f.type.startsWith('image/')) { alert('Please upload an image file.'); return; }
      convFile = f; convDrop.querySelector('h3').textContent = f.name;
      convDrop.querySelector('p').textContent = 'Loaded (' + Math.round(f.size / 1024) + 'KB) — select format and convert';
      document.getElementById('convBtn').disabled = false;
    }
    function setFmt(mime, ext, btn) {
      fmtMime = mime; fmtExt = ext;
      document.querySelectorAll('.util-format-tab').forEach(function(b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
    }
    function doConvert() {
      if (!convFile) return; var btn = document.getElementById('convBtn'); btn.textContent = 'Converting…'; btn.disabled = true;
      var img = new Image(); var url = URL.createObjectURL(convFile);
      img.onload = function() {
        var c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; var ctx = c.getContext('2d');
        if (fmtMime === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); } ctx.drawImage(img, 0, 0);
        c.toBlob(function(blob) {
          var oUrl = URL.createObjectURL(blob); var dl = document.getElementById('convDl'); dl.href = oUrl; dl.download = 'converted.' + fmtExt;
          document.getElementById('convInfo').textContent = 'Converted to ' + fmtExt.toUpperCase() + ' (' + Math.round(blob.size / 1024) + 'KB)';
          var prev = document.getElementById('convPreview'); prev.src = oUrl; prev.style.display = 'block';
          document.getElementById('convResult').classList.add('visible'); btn.textContent = 'Convert Another'; btn.disabled = false; URL.revokeObjectURL(url);
        }, fmtMime, fmtMime === 'image/jpeg' ? 0.92 : 1);
      };
      img.src = url;
    }
    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (el && el.dataset.toolAction === 'convert') { doConvert(); return; }
      var fmtBtn = e.target.closest('[data-fmt-mime]');
      if (fmtBtn) setFmt(fmtBtn.dataset.fmtMime, fmtBtn.dataset.fmtExt, fmtBtn);
    });
  }

  // ── PDF MERGE ─────────────────────────────────────────────────────────────
  if (toolType === 'pdf-merge') {
    var mFiles = [];
    var mDrop = document.getElementById('mergeDrop'); var mFileInp = document.getElementById('mergeFile');
    if (mDrop) {
      mDrop.addEventListener('dragover', function(e) { e.preventDefault(); mDrop.classList.add('drag-over'); });
      mDrop.addEventListener('dragleave', function() { mDrop.classList.remove('drag-over'); });
      mDrop.addEventListener('drop', function(e) { e.preventDefault(); mDrop.classList.remove('drag-over'); addMFiles(Array.from(e.dataTransfer.files)); });
      mDrop.addEventListener('click', function(e) {
        if (e.target === mDrop || (['H3','P','DIV'].indexOf(e.target.tagName) !== -1 && !e.target.classList.contains('saas-btn'))) {
          if (mFileInp) mFileInp.click();
        }
      });
    }
    if (mFileInp) mFileInp.addEventListener('change', function() { addMFiles(Array.from(this.files)); this.value = ''; });
    function addMFiles(files) { files.forEach(function(f) { if (f.type === 'application/pdf') mFiles.push(f); }); renderMFiles(); }
    function renderMFiles() {
      var el = document.getElementById('mergeFileList');
      el.innerHTML = mFiles.map(function(f, i) {
        return '<div class="util-file-item"><span>📄</span><span class="util-file-name">' + f.name + '</span><span class="util-file-size">' + Math.round(f.size / 1024) + 'KB</span><button class="util-file-del" data-tool-action="remove-merge-file" data-idx="' + i + '">✕</button></div>';
      }).join('');
      document.getElementById('mergeBtn').disabled = mFiles.length < 2;
    }
    async function doMerge() {
      if (mFiles.length < 2) return; var btn = document.getElementById('mergeBtn'); btn.textContent = 'Merging…'; btn.disabled = true;
      try {
        var merged = await PDFLib.PDFDocument.create();
        for (var f of mFiles) { var buf = await f.arrayBuffer(); var src = await PDFLib.PDFDocument.load(buf); var pages = await merged.copyPages(src, src.getPageIndices()); pages.forEach(function(p) { merged.addPage(p); }); }
        var bytes = await merged.save(); var blob = new Blob([bytes], { type: 'application/pdf' }); var url = URL.createObjectURL(blob);
        var dl = document.getElementById('mergeDl'); dl.href = url; dl.download = 'merged.pdf';
        document.getElementById('mergeInfo').textContent = mFiles.length + ' PDFs merged successfully';
        document.getElementById('mergeResult').classList.add('visible');
        btn.textContent = 'Merge Again'; btn.disabled = false;
      } catch(e) { alert('Error merging PDFs: ' + e.message); btn.textContent = 'Merge PDFs'; btn.disabled = false; }
    }
    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (!el) return;
      var action = el.dataset.toolAction;
      if (action === 'merge') doMerge();
      else if (action === 'browse-merge') { e.stopPropagation(); if (mFileInp) mFileInp.click(); }
      else if (action === 'remove-merge-file') { mFiles.splice(parseInt(el.dataset.idx), 1); renderMFiles(); }
    });
  }

  // ── PDF SPLIT ─────────────────────────────────────────────────────────────
  if (toolType === 'pdf-split') {
    var splitPdfFile = null;
    var sDrop = document.getElementById('splitDrop'); var sSplitInp = document.getElementById('splitFile');
    if (sDrop) {
      sDrop.addEventListener('dragover', function(e) { e.preventDefault(); sDrop.classList.add('drag-over'); });
      sDrop.addEventListener('dragleave', function() { sDrop.classList.remove('drag-over'); });
      sDrop.addEventListener('drop', function(e) { e.preventDefault(); sDrop.classList.remove('drag-over'); if (e.dataTransfer.files[0]) loadSplitFile(e.dataTransfer.files[0]); });
      sDrop.addEventListener('click', function() { if (sSplitInp) sSplitInp.click(); });
    }
    if (sSplitInp) sSplitInp.addEventListener('change', function() { if (this.files[0]) loadSplitFile(this.files[0]); });
    function loadSplitFile(f) {
      if (f.type !== 'application/pdf') { alert('Please upload a PDF file.'); return; }
      splitPdfFile = f; sDrop.querySelector('h3').textContent = f.name; sDrop.querySelector('p').textContent = 'Loaded (' + Math.round(f.size / 1024) + 'KB)';
      PDFLib.PDFDocument.load(f.arrayBuffer()).then(function(doc) {
        var n = doc.getPageCount(); var info = document.getElementById('splitPageInfo');
        info.style.display = 'block'; info.textContent = 'PDF has ' + n + ' page' + (n === 1 ? '' : 's') + '. Enter the page range you want to extract.';
        document.getElementById('splitBtn').disabled = false;
      });
    }
    function parseRange(str, total) {
      var pages = new Set();
      str.split(',').forEach(function(part) {
        part = part.trim();
        if (part.indexOf('-') !== -1) { var pts = part.split('-'); var a = parseInt(pts[0]); var b = parseInt(pts[1]); for (var i = a; i <= b && i <= total; i++) if (i >= 1) pages.add(i - 1); }
        else { var p = parseInt(part); if (p >= 1 && p <= total) pages.add(p - 1); }
      });
      return Array.from(pages).sort(function(a, b) { return a - b; });
    }
    async function doSplit() {
      if (!splitPdfFile) return; var rangeStr = document.getElementById('splitRange').value.trim();
      if (!rangeStr) { alert('Please enter a page range.'); return; }
      var btn = document.getElementById('splitBtn'); btn.textContent = 'Extracting…'; btn.disabled = true;
      try {
        var buf = await splitPdfFile.arrayBuffer(); var src = await PDFLib.PDFDocument.load(buf); var total = src.getPageCount();
        var indices = parseRange(rangeStr, total);
        if (!indices.length) { alert('No valid pages found. Check your range and try again.'); btn.textContent = 'Extract Pages'; btn.disabled = false; return; }
        var out = await PDFLib.PDFDocument.create(); var pages = await out.copyPages(src, indices); pages.forEach(function(p) { out.addPage(p); });
        var bytes = await out.save(); var blob = new Blob([bytes], { type: 'application/pdf' }); var url = URL.createObjectURL(blob);
        document.getElementById('splitDl').href = url; document.getElementById('splitDl').download = 'extracted_pages.pdf';
        document.getElementById('splitInfo').textContent = 'Extracted ' + indices.length + ' page' + (indices.length === 1 ? '' : 's') + ' from ' + total + '-page PDF';
        document.getElementById('splitResult').classList.add('visible'); btn.textContent = 'Extract Again'; btn.disabled = false;
      } catch(e) { alert('Error processing PDF: ' + e.message); btn.textContent = 'Extract Pages'; btn.disabled = false; }
    }
    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-tool-action]');
      if (el && el.dataset.toolAction === 'split') doSplit();
    });
  }

});
