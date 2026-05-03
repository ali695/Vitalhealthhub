document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const fadeElements = document.querySelectorAll('.fade-in');
  const faqItems = document.querySelectorAll('.faq-item');
  const readingProgress = document.querySelector('.reading-progress-fill');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  var ddWrap = document.querySelector('.nav-dropdown-wrap');
  var ddTrigger = document.querySelector('.nav-dropdown-trigger');
  if (ddWrap && ddTrigger) {
    var isMobile = function() { return window.innerWidth <= 768; };
    ddTrigger.addEventListener('click', function(e) {
      if (isMobile()) {
        e.preventDefault();
        ddWrap.classList.toggle('open');
      }
    });
    document.addEventListener('click', function(e) {
      if (!ddWrap.contains(e.target)) {
        ddWrap.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') ddWrap.classList.remove('open');
    });
    if (window.location.pathname.indexOf('/calculators/') !== -1) {
      ddTrigger.classList.add('active');
    }
  }

  window.addEventListener('scroll', function() {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }
    if (readingProgress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var s = (window.scrollY / h) * 100;
      readingProgress.style.width = Math.min(s, 100) + '%';
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(function(el) { observer.observe(el); });

  faqItems.forEach(function(item) {
    var q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', function() {
        var wasActive = item.classList.contains('active');
        faqItems.forEach(function(i) { i.classList.remove('active'); });
        if (!wasActive) item.classList.add('active');
      });
    }
  });

  var counterDone = false;
  var statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    var statsObserver = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !counterDone) {
        counterDone = true;
        document.querySelectorAll('.stat-number').forEach(function(el) {
          var target = parseInt(el.getAttribute('data-target'));
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 2000;
          var start = 0;
          var step = target / (duration / 16);
          var timer = setInterval(function() {
            start += step;
            if (start >= target) { start = target; clearInterval(timer); }
            el.textContent = Math.floor(start) + suffix;
          }, 16);
        });
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsBar);
  }
});

// ─── VitalHealth Premium Chatbot ──────────────────────────────────────────────
const vhChat = (function() {

  // ── Resource card builders ────────────────────────────────────────────────
  function rc(type, name, slug, note) {
    var base = type === 'calc' ? '/calculators/' : type === 'tool' ? '/tools/' : '/quizzes/';
    var label = type === 'calc' ? 'Calculator' : type === 'tool' ? 'Free Tool' : 'Health Quiz';
    var cls   = 'vh-rc vh-rc-' + type;
    return '<a href="' + base + slug + '.html" class="' + cls + '">' +
      '<span class="vh-rc-label">' + label + '</span>' +
      '<span class="vh-rc-name">' + name + '</span>' +
      (note ? '<span class="vh-rc-note">' + note + '</span>' : '') +
      '<svg class="vh-rc-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
      '</a>';
  }

  function cards(html, items) {
    return '<p class="vh-r-intro">' + html + '</p><div class="vh-rc-list">' + items.join('') + '</div>';
  }

  // ── Knowledge base ────────────────────────────────────────────────────────
  var kb = [
    {
      id: 'greet',
      triggers: ['hello','hi','hey','good morning','good evening','howdy','sup','greetings','start'],
      response: '<p class="vh-r-intro">Hi there! I\'m your <strong>VitalHealth Assistant</strong> — ask me about any health topic or use the quick actions below to get started.</p>' +
        '<div class="vh-rc-list">' +
        rc('calc','BMI Calculator','bmi-calculator','Weight vs height') +
        rc('calc','Calorie Calculator','calorie-calculator','Daily energy needs') +
        rc('quiz','Lifestyle Health Quiz','lifestyle-health-score-quiz','How healthy are you?') +
        rc('tool','Habit Tracker','habit-tracker','Build better habits') +
        '</div>'
    },
    {
      id: 'bmi',
      triggers: ['bmi','body mass index','am i overweight','am i obese','healthy weight','weight category','underweight'],
      response: cards(
        'BMI measures weight relative to height. The healthy range is <strong>18.5–24.9</strong>. Note: BMI doesn\'t account for muscle mass or body composition.',
        [
          rc('calc','BMI Calculator','bmi-calculator','Get your exact BMI score'),
          rc('calc','Body Fat Calculator','body-fat-calculator','More accurate than BMI'),
          rc('calc','Ideal Weight Calculator','ideal-weight-calculator','Your target weight range'),
          rc('quiz','Body Fat & Composition Quiz','body-fat-and-composition-quiz','Assess your body type')
        ]
      )
    },
    {
      id: 'calories',
      triggers: ['calories','calorie','how many calories','caloric intake','daily calories','kcal','energy needs','how much should i eat'],
      response: cards(
        'Your daily calorie needs depend on age, sex, height, weight, and activity level. A deficit of 300–500 kcal/day produces safe, sustainable weight loss.',
        [
          rc('calc','Calorie Calculator','calorie-calculator','Personalised daily intake'),
          rc('calc','TDEE Calculator','tdee-calculator','Total daily energy expenditure'),
          rc('calc','BMR Calculator','bmr-calculator','Basal metabolic rate'),
          rc('quiz','Calorie & Metabolism Quiz','calorie-and-metabolism-quiz','Test your knowledge')
        ]
      )
    },
    {
      id: 'protein',
      triggers: ['protein','how much protein','protein intake','protein per day','daily protein','protein for muscle','amino acids'],
      response: cards(
        'Protein needs: <strong>0.8g/kg</strong> for sedentary adults, <strong>1.2–1.6g/kg</strong> for active people, <strong>1.6–2.2g/kg</strong> for athletes building muscle.',
        [
          rc('calc','Protein Calculator','protein-intake-calculator','Your exact daily target'),
          rc('calc','Macro Calculator','macro-calculator','Full macro breakdown'),
          rc('quiz','Nutrition Knowledge Quiz','nutrition-knowledge-quiz','How much do you know?'),
          rc('tool','Habit Tracker','habit-tracker','Track your protein goals')
        ]
      )
    },
    {
      id: 'water',
      triggers: ['water','hydration','drink water','how much water','daily water','water intake','dehydrated','thirsty'],
      response: cards(
        'A reliable guideline: <strong>35ml per kg</strong> of bodyweight daily — more in heat or during exercise. Pale yellow urine indicates good hydration.',
        [
          rc('calc','Water Intake Calculator','water-intake-calculator','Personalised daily target'),
          rc('calc','Electrolyte Calculator','electrolyte-calculator','Replace what you lose'),
          rc('tool','Health Dashboard','health-dashboard','Track hydration daily')
        ]
      )
    },
    {
      id: 'sleep',
      triggers: ['sleep','how much sleep','sleep hours','insomnia','cant sleep','tired','fatigue','sleep deprivation','bedtime'],
      response: cards(
        'Adults need <strong>7–9 hours</strong> of sleep per night. Consistent sleep timing matters as much as duration — irregular schedules disrupt your circadian rhythm.',
        [
          rc('calc','Sleep Calculator','sleep-calculator','Ideal wake-up times'),
          rc('calc','Sleep Debt Calculator','sleep-debt-calculator','How much have you lost?'),
          rc('quiz','Sleep Quality Quiz','sleep-quality-quiz','Rate your sleep health'),
          rc('tool','Sleep Tracker','sleep-tracker','Log and track your sleep')
        ]
      )
    },
    {
      id: 'weightloss',
      triggers: ['lose weight','weight loss','fat loss','how to lose','losing weight','reduce weight','slim down','burn fat','diet'],
      response: cards(
        'Sustainable weight loss requires a <strong>calorie deficit</strong>, adequate protein to preserve muscle, and regular exercise. Aim for 0.5–1kg per week — faster loss typically means muscle loss.',
        [
          rc('calc','Calorie Calculator','calorie-calculator','Find your deficit target'),
          rc('calc','TDEE Calculator','tdee-calculator','Calories you burn daily'),
          rc('calc','BMI Calculator','bmi-calculator','Track your progress'),
          rc('quiz','Diet Type Quiz','diet-type-quiz','Find the right diet for you')
        ]
      )
    },
    {
      id: 'heartrate',
      triggers: ['heart rate','pulse','bpm','resting heart','heartbeat','normal heart rate','target heart rate','max heart rate'],
      response: cards(
        'A healthy resting heart rate is <strong>60–100 BPM</strong> for adults. During exercise, target <strong>50–85% of your maximum</strong> (220 minus your age) depending on intensity.',
        [
          rc('calc','Heart Rate Calculator','heart-rate-calculator','Training zones & targets'),
          rc('calc','Blood Pressure Checker','blood-pressure-checker','Full cardiovascular check'),
          rc('quiz','Heart Health Quiz','heart-health-quiz','Assess your heart risk'),
          rc('tool','Health Dashboard','health-dashboard','Monitor your vitals')
        ]
      )
    },
    {
      id: 'heartHealth',
      triggers: ['heart health','cardiovascular','cardio health','heart disease','heart attack','cardiac'],
      response: cards(
        'Cardiovascular health depends on blood pressure, cholesterol, blood sugar, weight, activity, smoking, and stress — all modifiable factors.',
        [
          rc('calc','Blood Pressure Checker','blood-pressure-checker','Check your BP risk'),
          rc('calc','Cholesterol Risk Calculator','cholesterol-risk-calculator','Lipid health score'),
          rc('calc','Heart Age Calculator','heart-age-calculator','Is your heart older than you?'),
          rc('quiz','Heart Health Quiz','heart-health-quiz','Full cardiac risk quiz')
        ]
      )
    },
    {
      id: 'stress',
      triggers: ['stress','stressed','anxiety','anxious','worry','overwhelmed','mental health','burnout','panic'],
      response: cards(
        'Chronic stress raises cortisol, disrupts sleep, and increases heart disease risk. Box breathing (4s in / 4s hold / 4s out / 4s hold) provides immediate relief.',
        [
          rc('calc','Stress Level Calculator','stress-level-calculator','Measure your stress score'),
          rc('calc','Anxiety Score Calculator','anxiety-score-calculator','GAD-based assessment'),
          rc('quiz','Burnout Risk Quiz','burnout-risk-quiz','Are you heading for burnout?'),
          rc('quiz','Stress Awareness Quiz','stress-awareness-quiz','Know your stress triggers')
        ]
      )
    },
    {
      id: 'bloodpressure',
      triggers: ['blood pressure','bp','hypertension','high blood pressure','systolic','diastolic','normal bp','low blood pressure'],
      response: cards(
        'Ideal blood pressure is <strong>below 120/80 mmHg</strong>. Readings above 130/80 are considered high. A single reading is rarely definitive — track trends over time.',
        [
          rc('calc','Blood Pressure Checker','blood-pressure-checker','Risk assessment tool'),
          rc('calc','Stroke Risk Calculator','stroke-risk-calculator','Long-term risk score'),
          rc('calc','Cholesterol Risk Calculator','cholesterol-risk-calculator','Combined heart risk'),
          rc('quiz','Heart Health Quiz','heart-health-quiz','Full cardiovascular quiz')
        ]
      )
    },
    {
      id: 'diabetes',
      triggers: ['diabetes','blood sugar','glucose','diabetic','prediabetes','insulin','type 2','sugar levels'],
      response: cards(
        'Normal fasting blood glucose is <strong>70–99 mg/dL</strong>. Between 100–125 indicates prediabetes. Lifestyle changes — diet, exercise, weight loss — can prevent or delay Type 2 diabetes.',
        [
          rc('calc','Diabetes Risk Calculator','diabetes-risk-calculator','Your 10-year risk score'),
          rc('calc','BMI Calculator','bmi-calculator','Weight is a key risk factor'),
          rc('calc','HOMA-IR Calculator','homa-ir-calculator','Insulin resistance score'),
          rc('quiz','Lifestyle Health Score Quiz','lifestyle-health-score-quiz','Overall health check')
        ]
      )
    },
    {
      id: 'cholesterol',
      triggers: ['cholesterol','ldl','hdl','high cholesterol','triglycerides','lipids','cholesterol levels'],
      response: cards(
        'Total cholesterol should be <strong>below 200 mg/dL</strong>. LDL ("bad") below 100 is optimal. HDL ("good") above 60 is protective. Omega-3s, fiber, and exercise all improve your profile.',
        [
          rc('calc','Cholesterol Risk Calculator','cholesterol-risk-calculator','Full lipid risk score'),
          rc('calc','Blood Pressure Checker','blood-pressure-checker','Combined heart risk'),
          rc('calc','Omega-3 Calculator','omega-3-calculator','Anti-inflammatory fats'),
          rc('quiz','Heart Health Quiz','heart-health-quiz','Cardiovascular risk quiz')
        ]
      )
    },
    {
      id: 'macros',
      triggers: ['macros','macronutrients','macro split','macro ratio','carbs fat protein','macronutrient'],
      response: cards(
        'A balanced macro split is roughly <strong>30% protein / 40% carbs / 30% fat</strong>. Adjust based on your goal: higher protein and lower carbs for fat loss, more carbs for performance.',
        [
          rc('calc','Macro Calculator','macro-calculator','Exact gram targets for you'),
          rc('calc','Calorie Calculator','calorie-calculator','Total calories first'),
          rc('calc','Protein Calculator','protein-intake-calculator','Protein needs'),
          rc('quiz','Nutrition Knowledge Quiz','nutrition-knowledge-quiz','Test your nutrition IQ')
        ]
      )
    },
    {
      id: 'fitness',
      triggers: ['exercise','workout','gym','training','fitness','hiit','cardio','strength training','running','vo2','one rep','lift'],
      response: cards(
        'WHO guidelines: <strong>150–300 min</strong> of moderate cardio plus <strong>2+ strength sessions</strong> per week. Beginners: start with 3×30 min sessions — consistency beats intensity.',
        [
          rc('calc','TDEE Calculator','tdee-calculator','Calories burned daily'),
          rc('calc','VO2 Max Calculator','vo2-max-calculator','Cardio fitness score'),
          rc('calc','One Rep Max Calculator','one-rep-max-calculator','Strength benchmarks'),
          rc('quiz','Fitness Level Quiz','fitness-level-quiz','Where do you stand?')
        ]
      )
    },
    {
      id: 'bodyfat',
      triggers: ['body fat','body fat percentage','fat percentage','lean mass','fat vs muscle','body composition'],
      response: cards(
        'Healthy body fat ranges: women <strong>20–32%</strong>, men <strong>8–24%</strong>. Athletic ranges are lower. Measuring body fat alongside BMI gives a much more complete health picture.',
        [
          rc('calc','Body Fat Calculator','body-fat-calculator','Estimate your body fat %'),
          rc('calc','Lean Body Mass Calculator','lean-body-mass-calculator','Muscle mass estimate'),
          rc('calc','BMI Calculator','bmi-calculator','Weight-based screening'),
          rc('quiz','Body Fat & Composition Quiz','body-fat-and-composition-quiz','Know your body type')
        ]
      )
    },
    {
      id: 'pregnancy',
      triggers: ['pregnancy','pregnant','due date','baby','trimester','conception','prenatal','ovulation','fertility'],
      response: cards(
        'Key prenatal nutrients: folic acid, iron, calcium, omega-3, and vitamin D. Always consult your healthcare provider for personalised guidance during pregnancy.',
        [
          rc('calc','Pregnancy Due Date Calculator','pregnancy-due-date-calculator','When is your due date?'),
          rc('calc','Pregnancy Weight Gain Calculator','pregnancy-weight-gain-calculator','Safe gain targets'),
          rc('calc','Ovulation Calculator','ovulation-calculator','Track fertile window'),
          rc('calc','Breastfeeding Calorie Calculator','breastfeeding-calorie-calculator','Nutrition needs')
        ]
      )
    },
    {
      id: 'keto',
      triggers: ['keto','ketosis','ketogenic','low carb','keto diet'],
      response: cards(
        'Keto macros: <strong>70% fat / 25% protein / 5% carbs</strong> (20–50g net carbs/day). Benefits include fat loss and improved insulin sensitivity. Consult a doctor if you have a medical condition.',
        [
          rc('calc','Keto Calculator','keto-calculator','Your keto macro targets'),
          rc('calc','Macro Calculator','macro-calculator','Alternative diet splits'),
          rc('calc','Calorie Calculator','calorie-calculator','Calorie baseline'),
          rc('quiz','Diet Type Quiz','diet-type-quiz','Find the right diet')
        ]
      )
    },
    {
      id: 'intermittentfasting',
      triggers: ['intermittent fasting','fasting','16:8','18:6','omad','eating window','fasting window','if diet'],
      response: cards(
        'Popular IF schedules: <strong>16:8</strong> (fast 16 hrs, eat in 8), <strong>18:6</strong>, and <strong>5:2</strong>. Benefits include improved insulin sensitivity, fat loss, and cellular repair (autophagy).',
        [
          rc('calc','Intermittent Fasting Calculator','intermittent-fasting-calculator','Plan your schedule'),
          rc('calc','Calorie Calculator','calorie-calculator','Eating-window nutrition'),
          rc('quiz','Diet Type Quiz','diet-type-quiz','Is IF right for you?')
        ]
      )
    },
    {
      id: 'tools',
      triggers: ['tools','tracker','habit','mood','planner','dashboard','productivity','health tools','free tools'],
      response: cards(
        'Our free health tools help you track, plan, and optimize daily — no sign-up needed, all data stays on your device.',
        [
          rc('tool','Health Dashboard','health-dashboard','All metrics in one place'),
          rc('tool','Habit Tracker','habit-tracker','Build lasting habits'),
          rc('tool','Sleep Tracker','sleep-tracker','Log & improve sleep'),
          rc('tool','Mood Tracker','mood-tracker','Monitor emotional health')
        ]
      )
    },
    {
      id: 'quiz',
      triggers: ['quiz','test','health quiz','take a quiz','health test','knowledge test','score','assessment'],
      response: cards(
        'Our interactive quizzes use science-based questions to assess your health risks and knowledge. Results are instant and personalised.',
        [
          rc('quiz','Lifestyle Health Score Quiz','lifestyle-health-score-quiz','Overall health check'),
          rc('quiz','Nutrition Knowledge Quiz','nutrition-knowledge-quiz','Test your diet IQ'),
          rc('quiz','Fitness Level Quiz','fitness-level-quiz','Where do you stand?'),
          rc('quiz','Burnout Risk Quiz','burnout-risk-quiz','Spot early warning signs')
        ]
      )
    },
    {
      id: 'calculator',
      triggers: ['calculator','calculate','which calculator','what calculator','all calculators','browse calculators'],
      response: cards(
        'We have <strong>103 free health calculators</strong> across 10 categories — body metrics, nutrition, heart health, fitness, women\'s health, mental wellness, and more.',
        [
          rc('calc','BMI Calculator','bmi-calculator','Most popular'),
          rc('calc','Calorie Calculator','calorie-calculator','Daily intake target'),
          rc('calc','TDEE Calculator','tdee-calculator','Calories you burn'),
          rc('calc','Macro Calculator','macro-calculator','Protein/carbs/fat split')
        ]
      )
    },
    {
      id: 'aging',
      triggers: ['aging','ageing','anti aging','longevity','life expectancy','live longer','healthy aging','biological age'],
      response: cards(
        'The strongest evidence-based longevity factors: regular exercise, plant-rich diet, quality sleep, strong social connections, and never smoking.',
        [
          rc('calc','Life Expectancy Calculator','life-expectancy-calculator','Estimated lifespan'),
          rc('calc','Biological Age Calculator','biological-age-calculator','Your functional age'),
          rc('quiz','Biological Age Quiz','biological-age-quiz','How old are you really?'),
          rc('tool','Health Dashboard','health-dashboard','Track longevity metrics')
        ]
      )
    },
    {
      id: 'vitamin',
      triggers: ['vitamin','vitamin d','vitamin c','supplements','deficiency','minerals','micronutrients'],
      response: cards(
        'Vitamin D deficiency affects over 1 billion people globally. Adequate levels (30–60 ng/mL) support immunity, bone health, mood, and muscle function.',
        [
          rc('calc','Vitamin D Calculator','vitamin-d-calculator','Optimal supplementation'),
          rc('calc','Omega-3 Calculator','omega-3-calculator','Anti-inflammatory support'),
          rc('quiz','Nutrition Knowledge Quiz','nutrition-knowledge-quiz','Micronutrient quiz')
        ]
      )
    }
  ];

  var fallbackResponses = [
    cards(
      'I don\'t have specific information on that, but here are our most popular health tools to explore:',
      [
        rc('calc','BMI Calculator','bmi-calculator','Body weight assessment'),
        rc('calc','Calorie Calculator','calorie-calculator','Daily intake target'),
        rc('quiz','Lifestyle Health Score Quiz','lifestyle-health-score-quiz','Overall health check')
      ]
    ),
    cards(
      'For detailed medical advice, please consult a healthcare professional. In the meantime, explore our evidence-based tools:',
      [
        rc('calc','TDEE Calculator','tdee-calculator','Calories you burn daily'),
        rc('quiz','Fitness Level Quiz','fitness-level-quiz','Where do you stand?'),
        rc('tool','Health Dashboard','health-dashboard','Track your health metrics')
      ]
    )
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  var isOpen = false;

  // ── Response engine ────────────────────────────────────────────────────────
  function getResponse(input) {
    var q = input.toLowerCase();
    for (var i = 0; i < kb.length; i++) {
      if (kb[i].triggers.some(function(t) { return q.indexOf(t) !== -1; })) {
        return kb[i].response;
      }
    }
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  // ── DOM helpers ────────────────────────────────────────────────────────────
  function addMessage(type, html) {
    var msgs = document.getElementById('vh-chat-messages');
    var wrap = document.createElement('div');
    wrap.className = 'vh-msg-wrap vh-msg-wrap-' + type;
    var bubble = document.createElement('div');
    bubble.className = 'vh-msg vh-msg-' + type;
    bubble.innerHTML = html;
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    requestAnimationFrame(function() { msgs.scrollTop = msgs.scrollHeight; });
  }

  function showTyping() {
    var msgs = document.getElementById('vh-chat-messages');
    var wrap = document.createElement('div');
    wrap.className = 'vh-msg-wrap vh-msg-wrap-bot';
    wrap.id = 'vh-typing-wrap';
    var dot = document.createElement('div');
    dot.className = 'vh-typing';
    dot.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(dot);
    msgs.appendChild(wrap);
    requestAnimationFrame(function() { msgs.scrollTop = msgs.scrollHeight; });
  }

  function removeTyping() {
    var t = document.getElementById('vh-typing-wrap');
    if (t) t.remove();
  }

  // ── Core actions ───────────────────────────────────────────────────────────
  function send() {
    var input = document.getElementById('vh-chat-input');
    var text = input.value.trim();
    if (!text) return;
    addMessage('user', text);
    input.value = '';
    hideActions();
    showTyping();
    setTimeout(function() {
      removeTyping();
      addMessage('bot', getResponse(text));
    }, 700 + Math.random() * 500);
  }

  function quickAsk(topic) {
    var input = document.getElementById('vh-chat-input');
    input.value = topic;
    send();
  }

  function hideActions() {
    var qt = document.getElementById('vh-quick-topics');
    if (qt) qt.style.display = 'none';
  }

  function toggle() {
    isOpen = !isOpen;
    var win    = document.getElementById('vh-chat-window');
    var ci     = document.getElementById('vh-chat-icon');
    var xi     = document.getElementById('vh-close-icon');
    var badge  = document.getElementById('vh-chat-badge');
    var toggle = document.getElementById('vh-chat-toggle');
    if (isOpen) {
      win.classList.add('vh-open');
      ci.style.display = 'none';
      xi.style.display = 'block';
      if (badge) badge.style.display = 'none';
      toggle.classList.add('vh-active');
      setTimeout(function() {
        var inp = document.getElementById('vh-chat-input');
        if (inp) inp.focus();
      }, 320);
    } else {
      win.classList.remove('vh-open');
      ci.style.display = 'block';
      xi.style.display = 'none';
      toggle.classList.remove('vh-active');
    }
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    // Bind minimize/close button
    var min = document.getElementById('vh-chat-minimize');
    if (min) min.addEventListener('click', toggle);

    // Bind send button
    var sendBtn = document.getElementById('vh-chat-send');
    if (sendBtn) sendBtn.addEventListener('click', send);

    // Bind Enter key on input
    var inp = document.getElementById('vh-chat-input');
    if (inp) {
      inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); send(); }
      });
    }

    // Mobile keyboard: keep input visible
    if (inp && 'visualViewport' in window) {
      window.visualViewport.addEventListener('resize', function() {
        var win = document.getElementById('vh-chat-window');
        if (win && isOpen) {
          var vh = window.visualViewport.height;
          win.style.maxHeight = vh + 'px';
        }
      });
    }

    // Welcome message
    setTimeout(function() {
      addMessage('bot',
        '<p class="vh-r-intro">Hi! I\'m your <strong>VitalHealth Assistant</strong>. Ask me about any health topic, or use the quick actions below to get started.</p>'
      );
    }, 400);
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return { init: init, toggle: toggle, quickAsk: quickAsk };

}());

// ─── Chatbot: Lazy Init + Persistent Toggle ──────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  var chatToggle = document.getElementById('vh-chat-toggle');
  if (!chatToggle) return;
  var chatInitialized = false;
  chatToggle.addEventListener('click', function() {
    if (!chatInitialized) {
      chatInitialized = true;
      vhChat.init();
    }
    vhChat.toggle();
  });
});

// ─── NAV: Mega Menu Functions ─────────────────────────────────────────────────
function vhhDdSearch(q) {
  var grid = document.getElementById('ddGrid');
  var res  = document.getElementById('ddResults');
  if (!q || !q.trim()) {
    grid.style.display = '';
    res.innerHTML = '';
    res.style.display = 'none';
    return;
  }
  var links   = document.querySelectorAll('#ddGrid .mega-col a');
  var matches = Array.from(links).filter(function(a) {
    return a.textContent.toLowerCase().includes(q.toLowerCase());
  });
  grid.style.display = 'none';
  res.style.display  = '';
  res.innerHTML = matches.length
    ? matches.map(function(a) {
        return '<a href="' + a.getAttribute('href') + '" class="dd-result-item">' + a.textContent + '</a>';
      }).join('')
    : '<p class="dd-no-result">No results found — <a href="/calculators/">browse all calculators</a></p>';
}

function vhhToggleCol(h4) {
  if (window.innerWidth > 768) return;
  h4.closest('.mega-col').classList.toggle('open');
}

// ─── Global Event Delegation ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {

  // NAV: mega dropdown search (debounced)
  var ddInput = document.getElementById('ddSearchInput');
  if (ddInput) {
    var _ddT;
    ddInput.addEventListener('input', function() {
      clearTimeout(_ddT);
      var v = this.value;
      _ddT = setTimeout(function() { vhhDdSearch(v); }, 150);
    });
  }

  // NAV: mega column toggle on mobile (event delegation)
  document.addEventListener('click', function(e) {
    var h = e.target.closest('.mega-col-title');
    if (h) vhhToggleCol(h);
  });

  // Chatbot: quick topic buttons (data-vh-ask)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-vh-ask]');
    if (btn && window.vhChat) vhChat.quickAsk(btn.getAttribute('data-vh-ask'));
  });

  // Calculator: submit (calls vhAutoCalc defined per-page)
  document.addEventListener('click', function(e) {
    if (e.target.closest('.calc-submit-btn') && typeof window.vhAutoCalc === 'function') window.vhAutoCalc();
  });

  // Calculator: reset
  document.addEventListener('click', function(e) {
    if (e.target.closest('.calc-reset-btn') && typeof window.vhReset === 'function') window.vhReset();
  });

  // Calculator: copy result
  document.addEventListener('click', function(e) {
    if (e.target.closest('#vhCopyBtn') && typeof window.vhCopyResult === 'function') window.vhCopyResult();
  });

  // Calculator: print (data-print)
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-print]')) window.print();
  });

  // Calculator: share (data-share)
  document.addEventListener('click', function(e) {
    if (e.target.closest('[data-share]') && typeof window.vhShareResult === 'function') window.vhShareResult();
  });

  // Calc index: search input (debounced)
  var calcSrch = document.getElementById('calcSearch');
  if (calcSrch) {
    var _csT;
    calcSrch.addEventListener('input', function() {
      clearTimeout(_csT);
      _csT = setTimeout(function() { if (typeof window.filterCalcs === 'function') window.filterCalcs(); }, 200);
    });
  }

  // Calc index: filter category buttons (data-filter-cat)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-filter-cat]');
    if (btn && typeof window.filterCat === 'function') window.filterCat(btn.getAttribute('data-filter-cat'), btn);
  });

  // Blog: category filter pills (data-blog-cat)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-blog-cat]');
    if (btn && typeof window.blogFilterCat === 'function') window.blogFilterCat(btn.getAttribute('data-blog-cat'), btn);
  });

  // Blog: sort select
  var blogSortSel = document.getElementById('blogSortSelect');
  if (blogSortSel) {
    blogSortSel.addEventListener('change', function() {
      if (typeof window.blogSort === 'function') window.blogSort(this.value);
    });
  }

  // Blog: open search button
  document.addEventListener('click', function(e) {
    if (e.target.closest('.blog-search-btn') && typeof window.openBlogSearch === 'function') window.openBlogSearch();
  });

  // Blog: close search overlay
  document.addEventListener('click', function(e) {
    if (e.target.closest('.blog-search-overlay-close') && typeof window.closeBlogSearch === 'function') window.closeBlogSearch();
  });

  // Blog: live search input (debounced)
  var blogSrchInp = document.getElementById('blogSearchInput');
  if (blogSrchInp) {
    var _blT;
    blogSrchInp.addEventListener('input', function() {
      clearTimeout(_blT);
      _blT = setTimeout(function() { if (typeof window.liveSearchBlog === 'function') window.liveSearchBlog(); }, 200);
    });
  }

  // Blog: view all
  document.addEventListener('click', function(e) {
    if (e.target.closest('.blog-view-all-btn') && typeof window.blogViewAll === 'function') window.blogViewAll();
  });

  // Blog: load more (has persistent id)
  var blLoadMore = document.getElementById('blogLoadMoreBtn');
  if (blLoadMore) {
    blLoadMore.addEventListener('click', function() { if (typeof window.loadMoreBlog === 'function') window.loadMoreBlog(); });
  }

  // Blog: tag cloud (data-blog-tag)
  document.addEventListener('click', function(e) {
    var tag = e.target.closest('[data-blog-tag]');
    if (tag && typeof window.blogTagClick === 'function') window.blogTagClick(tag.getAttribute('data-blog-tag'), tag);
  });

  // Blog hero: search input (debounced) + enter key
  var blogHeroInp = document.getElementById('blogHeroInput');
  if (blogHeroInp) {
    var _bhT;
    blogHeroInp.addEventListener('input', function() {
      clearTimeout(_bhT);
      var v = this.value;
      _bhT = setTimeout(function() { if (typeof window.blogHeroSearch === 'function') window.blogHeroSearch(v); }, 200);
    });
    blogHeroInp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && typeof window.openBlogSearch === 'function') window.openBlogSearch(this.value);
    });
  }

  // Blog hero: search button
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.blog-hero-search-wrap .calc-index-btn-primary');
    if (btn) {
      var inp = document.getElementById('blogHeroInput');
      if (inp && typeof window.openBlogSearch === 'function') window.openBlogSearch(inp.value);
    }
  });

  // FAQ: filter pills (data-faq-cat)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-faq-cat]');
    if (btn && typeof window.faqFilterCat === 'function') window.faqFilterCat(btn.getAttribute('data-faq-cat'), btn);
  });

  // FAQ hero: search input (debounced)
  var faqHeroInp = document.getElementById('faqHeroInput');
  if (faqHeroInp) {
    var _fhT;
    faqHeroInp.addEventListener('input', function() {
      clearTimeout(_fhT);
      var v = this.value;
      _fhT = setTimeout(function() { if (typeof window.faqHeroSearch === 'function') window.faqHeroSearch(v); }, 200);
    });
  }

  // Quiz page: difficulty card selection (data-quiz-diff)
  document.addEventListener('click', function(e) {
    var card = e.target.closest('[data-quiz-diff]');
    if (card && typeof window.selectDiff === 'function') window.selectDiff(card.getAttribute('data-quiz-diff'));
  });

  // Quiz page: start button (has persistent id)
  var quizStartBtn = document.getElementById('quiz-start-btn');
  if (quizStartBtn) {
    quizStartBtn.addEventListener('click', function() { if (typeof window.startQuiz === 'function') window.startQuiz(); });
  }

  // Quiz page: next question (has persistent id)
  var quizNextBtn = document.getElementById('quiz-next-btn');
  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', function() { if (typeof window.quizNext === 'function') window.quizNext(); });
  }

  // Quiz page: retry + share + email subscribe
  document.addEventListener('click', function(e) {
    if (e.target.closest('.quiz-retry-btn') && typeof window.quizRetry === 'function') window.quizRetry();
  });
  document.addEventListener('click', function(e) {
    if (e.target.closest('.quiz-share-btn') && typeof window.quizShare === 'function') window.quizShare();
  });
  document.addEventListener('click', function(e) {
    if (e.target.closest('.quiz-email-submit') && typeof window.quizEmailSubmit === 'function') window.quizEmailSubmit();
  });

  // Quiz index: category filter pills (data-quiz-filter)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-quiz-filter]');
    if (btn && typeof window.quizFilter === 'function') window.quizFilter(btn.getAttribute('data-quiz-filter'), btn);
  });

  // Quiz index: hero search input (debounced)
  var quizHeroInp = document.getElementById('quizHeroInput');
  if (quizHeroInp) {
    var _qhT;
    quizHeroInp.addEventListener('input', function() {
      clearTimeout(_qhT);
      var v = this.value;
      _qhT = setTimeout(function() { if (typeof window.quizHeroSearch === 'function') window.quizHeroSearch(v); }, 200);
    });
  }

  // Tools hub: search input (debounced)
  var toolsSearchInp = document.getElementById('toolsSearch');
  if (toolsSearchInp) {
    var _tsT;
    toolsSearchInp.addEventListener('input', function() {
      clearTimeout(_tsT);
      var v = this.value;
      _tsT = setTimeout(function() { if (typeof window.filterHub === 'function') window.filterHub(v); }, 200);
    });
  }

});

function showResult(boxId, value, label, suggestion, color) {
  var box = document.getElementById(boxId);
  if (!box) return;
  box.className = 'result-box show ' + color;
  box.querySelector('.result-value').textContent = value;
  box.querySelector('.result-label').textContent = label;
  box.querySelector('.result-suggestion').textContent = suggestion;
  var pf = box.querySelector('.progress-fill');
  if (pf) {
    pf.className = 'progress-fill ' + color;
    var pct = Math.min(parseFloat(value) / 50 * 100, 100);
    pf.style.width = pct + '%';
  }
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
