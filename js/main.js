document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const fadeElements = document.querySelectorAll('.fade-in');
  const faqItems = document.querySelectorAll('.faq-item');
  const readingProgress = document.querySelector('.reading-progress-fill');

  function closeNav() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = navLinks.classList.contains('active');
      if (isOpen) {
        closeNav();
      } else {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        document.body.classList.add('nav-open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    navLinks.querySelectorAll('a:not(.nav-dropdown-trigger)').forEach(function(link) {
      link.addEventListener('click', function() {
        closeNav();
      });
    });

    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') &&
          !hamburger.contains(e.target) &&
          !navLinks.contains(e.target)) {
        closeNav();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeNav();
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
        ddTrigger.setAttribute('aria-expanded', ddWrap.classList.contains('open') ? 'true' : 'false');
      }
    });
    document.addEventListener('click', function(e) {
      if (!ddWrap.contains(e.target)) {
        ddWrap.classList.remove('open');
        ddTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        ddWrap.classList.remove('open');
        ddTrigger.setAttribute('aria-expanded', 'false');
      }
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
        faqItems.forEach(function(i) {
          i.classList.remove('active');
          var other = i.querySelector('.faq-question');
          if (other) other.setAttribute('aria-expanded', 'false');
        });
        if (!wasActive) {
          item.classList.add('active');
          q.setAttribute('aria-expanded', 'true');
        }
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

// ─── VitalHealth Premium Chatbot v2 ───────────────────────────────────────────
const vhChat = (function() {

  // ── Card builders ────────────────────────────────────────────────────────
  function rc(type, name, slug, note) {
    var base  = type==='calc'?'/calculators/':type==='tool'?'/tools/':'/quizzes/';
    var label = type==='calc'?'Calculator':type==='tool'?'Free Tool':'Health Quiz';
    return '<a href="'+base+slug+'" class="vh-rc vh-rc-'+type+'">' +
      '<span class="vh-rc-label">'+label+'</span>' +
      '<span class="vh-rc-name">'+name+'</span>' +
      (note?'<span class="vh-rc-note">'+note+'</span>':'') +
      '<svg class="vh-rc-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
      '</a>';
  }
  function cards(html, items) {
    return '<p class="vh-r-intro">'+html+'</p><div class="vh-rc-list">'+items.join('')+'</div>';
  }
  function liveGrid(title, rows, source) {
    return '<p class="vh-r-intro">'+title+'</p><div class="vh-live-grid">'+rows+'</div>'+
      '<p class="vh-live-src">'+source+'</p>';
  }
  function liveRow(label, val, sub) {
    return '<div class="vh-live-row"><span class="vh-live-label">'+label+'</span>'+
      '<span class="vh-live-val">'+val+(sub?'<span class="vh-live-sub"> '+sub+'</span>':'')+'</span></div>';
  }

  // ── Full site index (103 calcs + 22 quizzes + 15 tools) ──────────────────
  var SI = [
    // ─ CALCULATORS: Weight & Body
    {t:'calc',n:'BMI Calculator',s:'bmi-calculator',k:'bmi body mass index weight height overweight obese underweight healthy weight category'},
    {t:'calc',n:'Body Fat Calculator',s:'body-fat-calculator',k:'body fat percentage lean mass fat muscle composition'},
    {t:'calc',n:'Ideal Weight Calculator',s:'ideal-weight-calculator',k:'ideal weight target healthy goal height frame'},
    {t:'calc',n:'Lean Body Mass Calculator',s:'lean-body-mass-calculator',k:'lean body mass muscle fat free'},
    {t:'calc',n:'Waist to Hip Ratio',s:'waist-to-hip-calculator',k:'waist hip ratio belly abdominal fat'},
    {t:'calc',n:'Waist to Height Ratio',s:'waist-to-height-ratio',k:'waist height ratio central obesity risk'},
    {t:'calc',n:'Visceral Fat Estimator',s:'visceral-fat-calculator',k:'visceral fat belly organ abdominal'},
    {t:'calc',n:'BMI Prime Calculator',s:'bmi-prime-calculator',k:'bmi prime ratio healthy range'},
    {t:'calc',n:'Lean Mass Goal Calculator',s:'lean-mass-goal-calculator',k:'lean mass goal muscle building target'},
    {t:'calc',n:'Waist Reduction Calculator',s:'waist-reduction-calculator',k:'waist reduction lose belly size'},
    {t:'calc',n:'Body Recomposition Calculator',s:'body-recomposition-calculator',k:'body recomposition fat loss muscle gain simultaneously'},
    // ─ CALCULATORS: Nutrition & Diet
    {t:'calc',n:'Calorie Calculator',s:'calorie-calculator',k:'calories calorie daily intake how many eat diet'},
    {t:'calc',n:'Macro Calculator',s:'macro-calculator',k:'macros macronutrients protein carbs fat split ratio'},
    {t:'calc',n:'TDEE Calculator',s:'tdee-calculator',k:'tdee total daily energy expenditure burn maintenance'},
    {t:'calc',n:'BMR Calculator',s:'bmr-calculator',k:'bmr basal metabolic rate metabolism calories rest'},
    {t:'calc',n:'Protein Calculator',s:'protein-intake-calculator',k:'protein intake daily grams muscle building amino'},
    {t:'calc',n:'Water Intake Calculator',s:'water-intake-calculator',k:'water hydration daily intake drink how much'},
    {t:'calc',n:'Vitamin D Calculator',s:'vitamin-d-calculator',k:'vitamin d supplement deficiency sunshine iu'},
    {t:'calc',n:'Keto Calculator',s:'keto-calculator',k:'keto ketogenic low carb fat protein ketosis diet'},
    {t:'calc',n:'Intermittent Fasting Calculator',s:'intermittent-fasting-calculator',k:'intermittent fasting 16 8 schedule window eating'},
    {t:'calc',n:'Sugar Intake Calculator',s:'sugar-intake-calculator',k:'sugar intake daily limit added sugar'},
    {t:'calc',n:'Electrolyte Calculator',s:'electrolyte-calculator',k:'electrolytes sodium potassium magnesium hydration sport'},
    {t:'calc',n:'Omega-3 Calculator',s:'omega3-calculator',k:'omega 3 fish oil supplement anti inflammatory'},
    {t:'calc',n:'Diet Comparison Tool',s:'diet-comparison-calculator',k:'diet comparison keto paleo vegan mediterranean'},
    {t:'calc',n:'Fiber Intake Score',s:'fiber-score-calculator',k:'fiber intake daily gut health digestive'},
    {t:'calc',n:'Sodium Intake Calculator',s:'sodium-intake-calculator',k:'sodium salt intake daily limit blood pressure'},
    {t:'calc',n:'Macro Timing Calculator',s:'macro-timing-calculator',k:'macro timing pre post workout meal timing nutrition'},
    {t:'calc',n:'Anti-Inflammatory Diet Score',s:'anti-inflammatory-score',k:'anti inflammatory diet score foods omega'},
    {t:'calc',n:'Hydration Level Calculator',s:'hydration-level-calculator',k:'hydration level water body percentage dehydration'},
    {t:'calc',n:'Protein Timing Calculator',s:'protein-timing-calculator',k:'protein timing meal pre post workout synthesis'},
    {t:'calc',n:'Water Reminder Calculator',s:'hydration-reminder-calculator',k:'water reminder hydration schedule drink times'},
    {t:'calc',n:'Fasting Window Calculator',s:'intermittent-fasting-window',k:'fasting window eating schedule hours'},
    // ─ CALCULATORS: Heart & Vitals
    {t:'calc',n:'Heart Rate Calculator',s:'heart-rate-calculator',k:'heart rate bpm target zone max resting pulse'},
    {t:'calc',n:'Blood Pressure Checker',s:'blood-pressure-checker',k:'blood pressure bp hypertension systolic diastolic normal high'},
    {t:'calc',n:'Cholesterol Risk Calculator',s:'cholesterol-risk-calculator',k:'cholesterol ldl hdl triglycerides lipid risk'},
    {t:'calc',n:'Diabetes Risk Calculator',s:'diabetes-risk-calculator',k:'diabetes risk blood sugar glucose type 2 prediabetes'},
    {t:'calc',n:'Stroke Risk Calculator',s:'stroke-risk-calculator',k:'stroke risk cardiovascular cerebral brain'},
    {t:'calc',n:'Life Expectancy Calculator',s:'life-expectancy-calculator',k:'life expectancy longevity how long live years'},
    {t:'calc',n:'Biological Age Calculator',s:'biological-age-calculator',k:'biological age real functional health age'},
    {t:'calc',n:'Heart Age Calculator',s:'heart-age-calculator',k:'heart age cardiovascular older younger risk'},
    {t:'calc',n:'Metabolic Age Calculator',s:'metabolic-age-calculator',k:'metabolic age metabolism fitness biological'},
    {t:'calc',n:'HOMA-IR Calculator',s:'homa-ir-calculator',k:'homa ir insulin resistance fasting glucose'},
    {t:'calc',n:'Thyroid Risk Calculator',s:'thyroid-risk-calculator',k:'thyroid risk hypothyroid hyperthyroid tsh'},
    {t:'calc',n:'Testosterone Level Estimator',s:'testosterone-estimator',k:'testosterone level male hormone low estimate'},
    // ─ CALCULATORS: Women\'s Health
    {t:'calc',n:'Pregnancy Due Date Calculator',s:'pregnancy-due-date-calculator',k:'pregnancy due date baby birth lmp weeks'},
    {t:'calc',n:'Pregnancy Week Calculator',s:'pregnancy-week-calculator',k:'pregnancy week trimester stage how many weeks'},
    {t:'calc',n:'Pregnancy Weight Gain Calculator',s:'pregnancy-weight-gain-calculator',k:'pregnancy weight gain safe healthy guidelines'},
    {t:'calc',n:'Breastfeeding Calorie Calculator',s:'breastfeeding-calorie-calculator',k:'breastfeeding calories nursing lactation extra needs'},
    {t:'calc',n:'Ovulation Calculator',s:'ovulation-calculator',k:'ovulation fertile window cycle conception period'},
    {t:'calc',n:'Menstrual Cycle Calculator',s:'menstrual-cycle-calculator',k:'menstrual cycle period next date tracking'},
    {t:'calc',n:'Fertility Calculator',s:'fertility-calculator',k:'fertility fertile window conception best days ovulation'},
    {t:'calc',n:'PCOS Risk Calculator',s:'pcos-risk-calculator',k:'pcos polycystic ovary syndrome risk hormones'},
    {t:'calc',n:'Menopause Symptom Calculator',s:'menopause-symptom-calculator',k:'menopause symptoms perimenopause hot flashes age'},
    {t:'calc',n:'Child Growth Calculator',s:'child-growth-calculator',k:'child growth height weight percentile pediatric'},
    // ─ CALCULATORS: Fitness
    {t:'calc',n:'One Rep Max Calculator',s:'one-rep-max-calculator',k:'one rep max 1rm strength powerlifting bench squat deadlift'},
    {t:'calc',n:'VO2 Max Calculator',s:'vo2-max-calculator',k:'vo2 max cardio fitness aerobic capacity oxygen'},
    {t:'calc',n:'Running Pace Calculator',s:'running-pace-calculator',k:'running pace speed km mile marathon half 5k 10k'},
    {t:'calc',n:'Steps to Calories Calculator',s:'steps-to-calories-calculator',k:'steps calories burned walking 10000 daily'},
    {t:'calc',n:'Strength Level Calculator',s:'strength-level-calculator',k:'strength level beginner intermediate advanced powerlifting'},
    {t:'calc',n:'Marathon Time Predictor',s:'marathon-time-predictor',k:'marathon finish time predictor race pace training'},
    {t:'calc',n:'HIIT Calorie Calculator',s:'hiit-calories-calculator',k:'hiit high intensity interval training calories burn'},
    {t:'calc',n:'Activity Calorie Burn Calculator',s:'calorie-burn-calculator',k:'activity calories burn exercise specific sport'},
    {t:'calc',n:'Step Goal Calculator',s:'step-goal-calculator',k:'step goal daily 10000 walking active target'},
    {t:'calc',n:'Injury Risk Calculator',s:'injury-risk-calculator',k:'injury risk overtraining sport assessment prevention'},
    // ─ CALCULATORS: Mental Health
    {t:'calc',n:'Stress Level Calculator',s:'stress-level-calculator',k:'stress level score anxiety mental health burnout'},
    {t:'calc',n:'Anxiety Score Calculator',s:'anxiety-score-calculator',k:'anxiety score gad assessment mental test'},
    {t:'calc',n:'Sleep Calculator',s:'sleep-calculator',k:'sleep calculator bedtime wake up schedule cycle hours'},
    {t:'calc',n:'Sleep Debt Calculator',s:'sleep-debt-calculator',k:'sleep debt deficit how much lost catch up'},
    {t:'calc',n:'Sleep Hygiene Score',s:'sleep-hygiene-calculator',k:'sleep hygiene score habits quality improvement'},
    {t:'calc',n:'Burnout Risk Calculator',s:'burnout-risk-calculator',k:'burnout risk work stress exhaustion emotional'},
    {t:'calc',n:'Focus Score Calculator',s:'focus-score-calculator',k:'focus concentration score productivity mental clarity'},
    {t:'calc',n:'Productivity Score Calculator',s:'productivity-score-calculator',k:'productivity score work output efficiency performance'},
    {t:'calc',n:'Digital Detox Calculator',s:'digital-detox-calculator',k:'digital detox screen time phone addiction reset'},
    {t:'calc',n:'Work-Life Balance Calculator',s:'work-life-balance-calculator',k:'work life balance score assessment burnout stress'},
    // ─ CALCULATORS: General Tools
    {t:'calc',n:'Age Calculator',s:'age-calculator',k:'age calculator years old how many birthday date'},
    {t:'calc',n:'Birthday Calculator',s:'birthday-calculator',k:'birthday calculator days until next upcoming'},
    {t:'calc',n:'Date Difference Calculator',s:'date-difference-calculator',k:'date difference calculator days weeks months between'},
    {t:'calc',n:'Percentage Calculator',s:'percentage-calculator',k:'percentage calculator percent of number increase decrease'},
    {t:'calc',n:'Loan EMI Calculator',s:'loan-emi-calculator',k:'loan emi calculator mortgage payment monthly installment'},
    {t:'calc',n:'Tip Calculator',s:'tip-calculator',k:'tip calculator restaurant gratuity bill split'},
    {t:'calc',n:'Countdown Timer',s:'countdown-timer',k:'countdown timer event days hours until'},
    {t:'calc',n:'Age in Days Calculator',s:'age-in-days-calculator',k:'age days total lived born count'},
    {t:'calc',n:'Pomodoro Calculator',s:'pomodoro-calculator',k:'pomodoro productivity timer work session break focus'},

    // ─ CALCULATORS: Additional (filling full 103)
    {t:'calc',n:'Password Generator',s:'password-generator',k:'password generator random secure strong create'},
    {t:'calc',n:'Random Number Generator',s:'random-number-generator',k:'random number generator pick dice lottery'},
    {t:'calc',n:'Text Counter',s:'text-counter',k:'text counter word count characters sentences paragraphs'},
    {t:'calc',n:'Baby Weight Percentile Calculator',s:'baby-weight-calculator',k:'baby weight percentile newborn infant growth who'},
    {t:'calc',n:'Child BMI Calculator',s:'child-bmi-calculator',k:'child bmi kids pediatric healthy weight percentile'},
    {t:'calc',n:'Carb Intake Calculator',s:'carb-calculator',k:'carb carbohydrate intake daily grams low carb'},
    {t:'calc',n:'Fat Intake Calculator',s:'fat-intake-calculator',k:'fat intake daily healthy saturated unsaturated'},
    {t:'calc',n:'Fiber Intake Calculator',s:'fiber-intake-calculator',k:'fiber intake daily dietary roughage gut health'},
    {t:'calc',n:'Iron Intake Calculator',s:'iron-intake-calculator',k:'iron intake anemia supplement deficiency women'},
    {t:'calc',n:'Calcium Calculator',s:'calcium-calculator',k:'calcium intake bone health osteoporosis supplement'},
    {t:'calc',n:'Waist-to-Hip Ratio Calculator',s:'waist-to-hip-ratio',k:'waist hip ratio belly abdominal fat shape'},
    {t:'calc',n:'Body Surface Area Calculator',s:'body-surface-area-calculator',k:'body surface area bsa medication dose skin'},
    {t:'calc',n:'Cycling Calories Calculator',s:'cycling-calories-calculator',k:'cycling calories burn bike ride exercise'},
    {t:'calc',n:'Swimming Calories Calculator',s:'swimming-calories-calculator',k:'swimming calories burn pool laps exercise'},
    {t:'calc',n:'Yoga Calories Calculator',s:'yoga-calories-calculator',k:'yoga calories burn session mindfulness exercise'},
    {t:'calc',n:'Alcohol Unit Calculator',s:'alcohol-unit-calculator',k:'alcohol unit calculator drinks beer wine limit safe'},
    {t:'calc',n:'Caffeine Intake Calculator',s:'caffeine-intake-calculator',k:'caffeine intake daily limit coffee tea safe dose'},
    {t:'calc',n:'Smoking Cost Calculator',s:'smoking-cost-calculator',k:'smoking cost calculator cigarettes money savings quit'},
    {t:'calc',n:'Depression Screening Calculator',s:'depression-screening-calculator',k:'depression screening phq assessment mental health'},
    {t:'calc',n:'Medication Dosage Calculator',s:'medication-dosage-calculator',k:'medication dosage calculator drug weight body'},
    {t:'calc',n:'BAC Calculator',s:'bac-calculator',k:'bac blood alcohol content calculator drunk level'},
    // ─ QUIZZES (22)
    {t:'quiz',n:'Nutrition Knowledge Quiz',s:'nutrition-knowledge-quiz',k:'nutrition diet food knowledge vitamins minerals quiz test'},
    {t:'quiz',n:'Hydration Health Quiz',s:'hydration-health-quiz',k:'hydration water drink health habits quiz'},
    {t:'quiz',n:'Fitness Level Quiz',s:'fitness-level-quiz',k:'fitness level assessment where stand exercise quiz'},
    {t:'quiz',n:'Lifestyle Health Score Quiz',s:'lifestyle-health-score-quiz',k:'lifestyle health score overall wellness habits quiz'},
    {t:'quiz',n:'Stress Awareness Quiz',s:'stress-awareness-quiz',k:'stress awareness triggers management coping quiz'},
    {t:'quiz',n:'Burnout Knowledge Quiz',s:'burnout-risk-quiz',k:'burnout risk signs work exhaustion quiz'},
    {t:'quiz',n:'Sleep Quality Quiz',s:'sleep-quality-quiz',k:'sleep quality habits insomnia rest quiz'},
    {t:'quiz',n:'Anxiety Awareness Quiz',s:'anxiety-awareness-quiz',k:'anxiety awareness symptoms mental health quiz'},
    {t:'quiz',n:'Women\'s Hormone Balance Quiz',s:'hormone-balance-quiz',k:'hormone balance women estrogen progesterone quiz'},
    {t:'quiz',n:'Menstrual Health Quiz',s:'menstrual-health-quiz',k:'menstrual health period knowledge women quiz'},
    {t:'quiz',n:'Exercise Science Quiz',s:'workout-type-quiz',k:'exercise science workout training knowledge quiz'},
    {t:'quiz',n:'Diet Types Quiz',s:'diet-type-quiz',k:'diet types keto paleo mediterranean vegan quiz'},
    {t:'quiz',n:'Biological Age Quiz',s:'biological-age-quiz',k:'biological age ageing longevity quiz'},
    {t:'quiz',n:'Human Body Trivia Quiz',s:'health-trivia-quiz',k:'human body trivia facts health general knowledge quiz'},
    {t:'quiz',n:'Brain Health Quiz',s:'brain-health-quiz',k:'brain health neuroplasticity cognitive memory quiz'},
    {t:'quiz',n:'Body Composition Quiz',s:'body-fat-and-composition-quiz',k:'body composition fat muscle mass quiz'},
    {t:'quiz',n:'Calories & Metabolism Quiz',s:'calorie-and-metabolism-quiz',k:'calories metabolism bmr tdee quiz knowledge'},
    {t:'quiz',n:'Heart Health Quiz',s:'heart-health-quiz',k:'heart health cardiovascular risk disease quiz'},
    {t:'quiz',n:'Nutrient Deficiency Quiz',s:'nutrient-deficiency-quiz',k:'nutrient vitamin deficiency mineral knowledge quiz'},
    {t:'quiz',n:'Weight Loss Science Quiz',s:'weight-loss-science-quiz',k:'weight loss science fat burning quiz'},
    {t:'quiz',n:'Diabetes & Blood Sugar Quiz',s:'diabetes-and-blood-sugar-quiz',k:'diabetes blood sugar glucose type 2 knowledge quiz'},
    {t:'quiz',n:'Gut Health Quiz',s:'gut-health-quiz',k:'gut health microbiome digestion probiotic quiz'},
    // ─ TOOLS (15)
    {t:'tool',n:'Habit Tracker',s:'habit-tracker',k:'habit tracker daily routine streak build consistency'},
    {t:'tool',n:'Sleep Tracker',s:'sleep-tracker',k:'sleep tracker log monitor quality record hours'},
    {t:'tool',n:'Mood Tracker',s:'mood-tracker',k:'mood tracker emotional health log mental daily'},
    {t:'tool',n:'Step Tracker',s:'step-tracker',k:'step tracker daily steps walking activity count'},
    {t:'tool',n:'Health Dashboard',s:'health-dashboard',k:'health dashboard overview metrics vitals track all'},
    {t:'tool',n:'Daily Planner',s:'daily-planner',k:'daily planner schedule plan tasks productivity'},
    {t:'tool',n:'Focus Timer',s:'focus-timer',k:'focus timer pomodoro work session concentration productivity'},
    {t:'tool',n:'Goal Tracker',s:'goal-tracker',k:'goal tracker set achieve monitor progress targets'},
    {t:'tool',n:'Advanced Text Analyzer',s:'advanced-text-analyzer',k:'text analyzer readability word count sentences'},
    {t:'tool',n:'Headline Analyzer',s:'headline-analyzer',k:'headline analyzer seo score title blog'},
    {t:'tool',n:'Content Idea Generator',s:'content-idea-generator',k:'content idea generator blog topic writing'},
    {t:'tool',n:'Image Compressor',s:'image-compressor',k:'image compress reduce size file kb optimize'},
    {t:'tool',n:'Image Converter',s:'image-converter',k:'image convert format jpg png webp'},
    {t:'tool',n:'PDF Merge Tool',s:'pdf-merge',k:'pdf merge combine join multiple files'},
    {t:'tool',n:'PDF Splitter',s:'pdf-split',k:'pdf split extract pages separate document'}
  ];

  // ── Smart search across full site ─────────────────────────────────────────
  function searchSite(query) {
    var words = query.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(function(w){return w.length>2;});
    if (!words.length) return [];
    var scored = [];
    for (var i=0; i<SI.length; i++) {
      var item = SI[i];
      var fullText = item.n.toLowerCase()+' '+item.k;
      var score = 0;
      for (var j=0; j<words.length; j++) {
        var w = words[j];
        if (item.n.toLowerCase().indexOf(w) !== -1) score += 5;
        else if (item.k.indexOf(w) !== -1) score += 2;
      }
      if (score > 0) scored.push({item:item, score:score});
    }
    return scored.sort(function(a,b){return b.score-a.score;}).slice(0,5).map(function(x){return x.item;});
  }

  // ── Financial keyword detection ───────────────────────────────────────────
  var FIN = {
    currency: ['exchange rate','usd','dollar','euro','pound','yen','rupee','pkr','inr','aed','sar','gbp','eur','jpy','cad','aud','chf','cny','currency','forex','convert money','conversion rate','how much is','rate today'],
    gold:     ['gold','gold rate','gold price','gold today','xau','gold per gram','gold per ounce','gold oz'],
    silver:   ['silver','silver rate','silver price','silver today','xag','silver per gram'],
    crypto:   ['bitcoin','btc','ethereum','eth','crypto','cryptocurrency','bnb','binance','solana','sol','usdt','coin price']
  };

  function detectFin(q) {
    var ql = q.toLowerCase();
    for (var type in FIN) {
      if (FIN[type].some(function(kw){return ql.indexOf(kw)!==-1;})) return type;
    }
    return null;
  }

  // ── Live API fetchers ─────────────────────────────────────────────────────
  function apiFetch(url, cb) {
    fetch(url)
      .then(function(r){ return r.json(); })
      .then(function(d){ cb(null, d); })
      .catch(function(e){ cb(e); });
  }

  function fetchCurrency(cb) {
    apiFetch('https://api.frankfurter.app/latest?base=USD&symbols=EUR,GBP,JPY,PKR,INR,AED,SAR,CAD,AUD,CHF,CNY,MYR,SGD,BDT', cb);
  }

  function fetchMetals(cb) {
    apiFetch('https://metals.live/api/v1/spot', cb);
  }

  function fetchCrypto(cb) {
    apiFetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple&vs_currencies=usd&include_24hr_change=true', cb);
  }

  // ── Live data renderers ───────────────────────────────────────────────────
  var CURRENCY_NAMES = {EUR:'Euro',GBP:'British Pound',JPY:'Japanese Yen',PKR:'Pakistani Rupee',INR:'Indian Rupee',AED:'UAE Dirham',SAR:'Saudi Riyal',CAD:'Canadian Dollar',AUD:'Australian Dollar',CHF:'Swiss Franc',CNY:'Chinese Yuan',MYR:'Malaysian Ringgit',SGD:'Singapore Dollar',BDT:'Bangladeshi Taka'};

  function renderCurrency(data) {
    if (!data || !data.rates) return '<p class="vh-r-intro">Unable to load live rates right now. Try again shortly.</p>';
    var rows = '';
    var rates = data.rates;
    var keys = Object.keys(rates);
    for (var i=0; i<keys.length; i++) {
      var code = keys[i];
      var val  = rates[code];
      var display = val >= 100 ? Math.round(val).toLocaleString() : val.toFixed(4);
      rows += liveRow(code+' – '+(CURRENCY_NAMES[code]||code), display, 'per $1 USD');
    }
    return liveGrid(
      'Live exchange rates for <strong>1 USD</strong> (updated daily):',
      rows,
      'Source: Frankfurter API &mdash; rates refresh daily &middot; <a href="/calculators/loan-emi-calculator">Loan EMI Calculator &rarr;</a>'
    );
  }

  function renderMetals(data, type) {
    if (!data || !Array.isArray(data)) {
      return '<p class="vh-r-intro">Live metal prices unavailable. Check <a href="https://goldprice.org" target="_blank" rel="noopener">GoldPrice.org</a> for real-time rates.</p>';
    }
    var goldEntry  = data.find(function(d){ return d.symbol==='XAU' || d.metal==='gold'; });
    var silverEntry= data.find(function(d){ return d.symbol==='XAG' || d.metal==='silver'; });
    var rows = '';
    if (goldEntry) {
      var gp = goldEntry.price || goldEntry.ask || goldEntry.bid || 0;
      var gpg = (gp/31.1035).toFixed(2);
      rows += liveRow('Gold (XAU) — per troy oz','$'+Number(gp.toFixed(2)).toLocaleString());
      rows += liveRow('Gold — per gram','$'+gpg);
    }
    if (silverEntry) {
      var sp  = silverEntry.price || silverEntry.ask || silverEntry.bid || 0;
      var spg = (sp/31.1035).toFixed(4);
      rows += liveRow('Silver (XAG) — per troy oz','$'+Number(sp.toFixed(2)).toLocaleString());
      rows += liveRow('Silver — per gram','$'+spg);
    }
    if (!rows) return '<p class="vh-r-intro">Metal price data unavailable. Check <a href="https://goldprice.org" target="_blank" rel="noopener">GoldPrice.org</a>.</p>';
    return liveGrid('Live precious metal spot prices (USD):', rows, 'Spot price per troy oz &middot; Prices update in real-time');
  }

  function renderCrypto(data) {
    if (!data) return '<p class="vh-r-intro">Crypto prices unavailable right now. Check <a href="https://coinmarketcap.com" target="_blank" rel="noopener">CoinMarketCap</a>.</p>';
    var map = {bitcoin:'Bitcoin (BTC)', ethereum:'Ethereum (ETH)', binancecoin:'BNB', solana:'Solana (SOL)', ripple:'XRP'};
    var rows = '';
    for (var id in map) {
      if (data[id] && data[id].usd) {
        var price  = data[id].usd;
        var change = data[id].usd_24h_change;
        var ps = price >= 1 ? '$'+Number(price.toFixed(2)).toLocaleString() : '$'+price.toFixed(6);
        var cs = change ? (change >= 0 ? '+'+change.toFixed(2) : change.toFixed(2))+'% 24h' : '';
        rows += liveRow(map[id], ps, cs);
      }
    }
    if (!rows) return '<p class="vh-r-intro">Crypto data unavailable. Check <a href="https://coinmarketcap.com" target="_blank" rel="noopener">CoinMarketCap</a>.</p>';
    return liveGrid('Live cryptocurrency prices (USD):', rows, 'Source: CoinGecko API &middot; For investment decisions always do your own research');
  }

  // ── Health knowledge base ─────────────────────────────────────────────────
  var kb = [
    {
      id:'greet',
      triggers:['hello','hi','hey','good morning','good evening','howdy','sup','greetings','start','help'],
      resp: '<p class="vh-r-intro">Hi! I\'m your <strong>VitalHealth Assistant</strong>. I can recommend calculators, tools, and quizzes — or fetch live currency, gold, and crypto prices. Just ask!</p>' +
        '<div class="vh-rc-list">'+
        rc('calc','BMI Calculator','bmi-calculator','Body weight assessment')+
        rc('calc','Calorie Calculator','calorie-calculator','Daily intake target')+
        rc('quiz','Lifestyle Health Quiz','lifestyle-health-score-quiz','Overall health score')+
        rc('tool','Health Dashboard','health-dashboard','Track all your metrics')+
        '</div>'
    },
    {id:'bmi',triggers:['bmi','body mass index','am i overweight','am i obese','healthy weight','weight category','underweight'],
      resp: cards('BMI measures weight relative to height. Healthy range is <strong>18.5–24.9</strong>. Note: it doesn\'t account for muscle mass.',
        [rc('calc','BMI Calculator','bmi-calculator','Your exact BMI score'),rc('calc','Body Fat Calculator','body-fat-calculator','More accurate than BMI'),rc('calc','Ideal Weight Calculator','ideal-weight-calculator','Target weight range'),rc('quiz','Body Composition Quiz','body-fat-and-composition-quiz','Know your body type')])},
    {id:'calories',triggers:['calories','calorie','how many calories','caloric intake','daily calories','kcal','how much should i eat','energy needs'],
      resp: cards('Daily calorie needs depend on age, sex, height, weight, and activity. A 300–500 kcal/day deficit produces safe weight loss.',
        [rc('calc','Calorie Calculator','calorie-calculator','Personalised daily intake'),rc('calc','TDEE Calculator','tdee-calculator','Calories you burn daily'),rc('calc','BMR Calculator','bmr-calculator','Resting metabolism'),rc('quiz','Calories & Metabolism Quiz','calorie-and-metabolism-quiz','Test your knowledge')])},
    {id:'protein',triggers:['protein','how much protein','protein intake','protein per day','protein for muscle','amino'],
      resp: cards('Protein needs: <strong>0.8g/kg</strong> for sedentary adults, <strong>1.2–1.6g/kg</strong> active, <strong>1.6–2.2g/kg</strong> for athletes.',
        [rc('calc','Protein Calculator','protein-intake-calculator','Your exact daily target'),rc('calc','Macro Calculator','macro-calculator','Full macro breakdown'),rc('quiz','Nutrition Knowledge Quiz','nutrition-knowledge-quiz','Nutrition IQ test')])},
    {id:'water',triggers:['water','hydration','drink water','how much water','daily water','water intake','dehydrated','thirsty'],
      resp: cards('Rule: <strong>35ml per kg</strong> of bodyweight daily — more in heat or during exercise. Pale yellow urine = well hydrated.',
        [rc('calc','Water Intake Calculator','water-intake-calculator','Personalised target'),rc('calc','Electrolyte Calculator','electrolyte-calculator','Replace what you lose'),rc('quiz','Hydration Health Quiz','hydration-health-quiz','Hydration IQ test')])},
    {id:'sleep',triggers:['sleep','how much sleep','sleep hours','insomnia','cant sleep','tired','fatigue','bedtime','sleep deprivation'],
      resp: cards('Adults need <strong>7–9 hours</strong>. Consistent sleep timing matters as much as duration — irregular schedules disrupt your circadian rhythm.',
        [rc('calc','Sleep Calculator','sleep-calculator','Ideal wake-up times'),rc('calc','Sleep Debt Calculator','sleep-debt-calculator','How much have you lost?'),rc('quiz','Sleep Quality Quiz','sleep-quality-quiz','Rate your sleep health'),rc('tool','Sleep Tracker','sleep-tracker','Log your sleep')])},
    {id:'weightloss',triggers:['lose weight','weight loss','fat loss','how to lose','losing weight','reduce weight','slim down','burn fat','diet plan'],
      resp: cards('Sustainable weight loss: <strong>calorie deficit</strong> + adequate protein + exercise. Aim for 0.5–1kg/week — faster usually means muscle loss.',
        [rc('calc','Calorie Calculator','calorie-calculator','Find your deficit'),rc('calc','TDEE Calculator','tdee-calculator','Calories burned daily'),rc('quiz','Weight Loss Science Quiz','weight-loss-science-quiz','Weight loss science'),rc('quiz','Diet Types Quiz','diet-type-quiz','Find the right diet')])},
    {id:'heart',triggers:['heart rate','pulse','bpm','resting heart','heartbeat','heart health','cardiovascular','blood pressure','hypertension','systolic','diastolic'],
      resp: cards('Healthy resting HR: <strong>60–100 BPM</strong>. Healthy BP: <strong>below 120/80 mmHg</strong>. Both are strong markers of cardiovascular health.',
        [rc('calc','Heart Rate Calculator','heart-rate-calculator','Training zones & targets'),rc('calc','Blood Pressure Checker','blood-pressure-checker','BP risk score'),rc('calc','Heart Age Calculator','heart-age-calculator','Is your heart older?'),rc('quiz','Heart Health Quiz','heart-health-quiz','Cardiac risk quiz')])},
    {id:'stress',triggers:['stress','stressed','anxiety','anxious','worry','overwhelmed','mental health','burnout','panic','depression'],
      resp: cards('Chronic stress raises cortisol, disrupts sleep, and raises heart disease risk. Box breathing (4s in / 4s hold / 4s out) provides immediate relief.',
        [rc('calc','Stress Level Calculator','stress-level-calculator','Your stress score'),rc('calc','Anxiety Score Calculator','anxiety-score-calculator','GAD-based assessment'),rc('quiz','Burnout Knowledge Quiz','burnout-risk-quiz','Are you burning out?'),rc('quiz','Stress Awareness Quiz','stress-awareness-quiz','Know your triggers')])},
    {id:'macros',triggers:['macros','macronutrients','macro split','macro ratio','carbs fat protein','macronutrient'],
      resp: cards('Balanced split: <strong>30% protein / 40% carbs / 30% fat</strong>. Adjust for your goal — higher protein for fat loss, more carbs for performance.',
        [rc('calc','Macro Calculator','macro-calculator','Exact gram targets'),rc('calc','Calorie Calculator','calorie-calculator','Total calories first'),rc('calc','Protein Calculator','protein-intake-calculator','Protein needs')])},
    {id:'fitness',triggers:['exercise','workout','gym','training','fitness','hiit','cardio','running','strength','vo2','one rep'],
      resp: cards('WHO guidelines: <strong>150–300 min</strong> moderate cardio + <strong>2+ strength sessions</strong> per week. Consistency beats intensity.',
        [rc('calc','TDEE Calculator','tdee-calculator','Calories burned daily'),rc('calc','VO2 Max Calculator','vo2-max-calculator','Cardio fitness score'),rc('calc','One Rep Max Calculator','one-rep-max-calculator','Strength benchmarks'),rc('quiz','Fitness Level Quiz','fitness-level-quiz','Your fitness level')])},
    {id:'pregnancy',triggers:['pregnancy','pregnant','due date','baby','trimester','prenatal','ovulation','fertility','breastfeeding'],
      resp: cards('Key prenatal nutrients: folic acid, iron, calcium, omega-3, vitamin D. Always consult your healthcare provider for personalised guidance.',
        [rc('calc','Pregnancy Due Date Calculator','pregnancy-due-date-calculator','When is your due date?'),rc('calc','Ovulation Calculator','ovulation-calculator','Fertile window'),rc('calc','Pregnancy Weight Gain Calculator','pregnancy-weight-gain-calculator','Safe weight gain')])},
    {id:'diabetes',triggers:['diabetes','blood sugar','glucose','diabetic','prediabetes','insulin','type 2','sugar levels'],
      resp: cards('Normal fasting glucose: <strong>70–99 mg/dL</strong>. 100–125 = prediabetes. Lifestyle changes can prevent or delay Type 2 diabetes.',
        [rc('calc','Diabetes Risk Calculator','diabetes-risk-calculator','10-year risk score'),rc('calc','HOMA-IR Calculator','homa-ir-calculator','Insulin resistance'),rc('quiz','Diabetes & Blood Sugar Quiz','diabetes-and-blood-sugar-quiz','Knowledge quiz')])},
    {id:'cholesterol',triggers:['cholesterol','ldl','hdl','high cholesterol','triglycerides','lipids'],
      resp: cards('Total cholesterol should be <strong>below 200 mg/dL</strong>. LDL below 100 is optimal. HDL above 60 is protective.',
        [rc('calc','Cholesterol Risk Calculator','cholesterol-risk-calculator','Lipid risk score'),rc('calc','Blood Pressure Checker','blood-pressure-checker','Combined heart risk'),rc('quiz','Heart Health Quiz','heart-health-quiz','Cardiovascular quiz')])},
    {id:'tools',triggers:['tools','tracker','habit','mood','planner','dashboard','productivity','health tools','free tools','goal'],
      resp: cards('Our free tools help you track, plan, and optimise daily — no sign-up, all data stays on your device.',
        [rc('tool','Health Dashboard','health-dashboard','All metrics in one place'),rc('tool','Habit Tracker','habit-tracker','Build lasting habits'),rc('tool','Sleep Tracker','sleep-tracker','Log your sleep'),rc('tool','Mood Tracker','mood-tracker','Emotional health')])},
    {id:'quiz',triggers:['quiz','test','health quiz','take a quiz','health test','assessment','knowledge test'],
      resp: cards('Our interactive quizzes give instant, personalised results using science-based questions.',
        [rc('quiz','Lifestyle Health Quiz','lifestyle-health-score-quiz','Overall health'),rc('quiz','Nutrition Knowledge Quiz','nutrition-knowledge-quiz','Diet IQ'),rc('quiz','Fitness Level Quiz','fitness-level-quiz','Fitness level'),rc('quiz','Burnout Knowledge Quiz','burnout-risk-quiz','Burnout risk')])},
    {id:'calc',triggers:['calculator','calculate','which calculator','all calculators','browse calculators'],
      resp: cards('We have <strong>103 free health calculators</strong> across 10 categories — body, nutrition, heart, fitness, women\'s health, mental wellness, and more.',
        [rc('calc','BMI Calculator','bmi-calculator','Most popular'),rc('calc','Calorie Calculator','calorie-calculator','Daily intake'),rc('calc','TDEE Calculator','tdee-calculator','Energy expenditure'),rc('calc','Macro Calculator','macro-calculator','Protein/carbs/fat')])}
  ];

  var fallback = [
    cards('I searched the site for that — here are our most popular tools to explore:',
      [rc('calc','BMI Calculator','bmi-calculator','Body weight screening'),rc('calc','Calorie Calculator','calorie-calculator','Daily intake'),rc('quiz','Lifestyle Health Quiz','lifestyle-health-score-quiz','Health score'),rc('tool','Health Dashboard','health-dashboard','Track your metrics')]),
    '<p class="vh-r-intro">For medical advice, consult a healthcare professional. Try asking me about <strong>BMI, calories, sleep, stress, heart health</strong> — or type any currency, gold, or crypto name for live prices.</p>'
  ];

  // ── Response engine (async-aware) ─────────────────────────────────────────
  function getResponse(text, cb) {
    var q = text.toLowerCase();

    // 1. Check financial keywords → async API
    var finType = detectFin(q);
    if (finType === 'currency') {
      fetchCurrency(function(err, data) {
        cb(err ? '<p class="vh-r-intro">Unable to load rates right now. Try <a href="https://www.xe.com" target="_blank" rel="noopener">XE.com</a>.</p>' : renderCurrency(data));
      });
      return;
    }
    if (finType === 'gold' || finType === 'silver') {
      fetchMetals(function(err, data) {
        cb(err ? '<p class="vh-r-intro">Metal prices unavailable. Check <a href="https://goldprice.org" target="_blank" rel="noopener">GoldPrice.org</a>.</p>' : renderMetals(data, finType));
      });
      return;
    }
    if (finType === 'crypto') {
      fetchCrypto(function(err, data) {
        cb(err ? '<p class="vh-r-intro">Crypto prices unavailable. Check <a href="https://coinmarketcap.com" target="_blank" rel="noopener">CoinMarketCap</a>.</p>' : renderCrypto(data));
      });
      return;
    }

    // 2. Health knowledge base
    for (var i=0; i<kb.length; i++) {
      if (kb[i].triggers.some(function(t){return q.indexOf(t)!==-1;})) {
        setTimeout(function(resp){return function(){cb(resp);};}(kb[i].resp), 600+Math.random()*400);
        return;
      }
    }

    // 3. Full site search
    var results = searchSite(text);
    if (results.length > 0) {
      var rcs = results.map(function(item){ return rc(item.t, item.n, item.s, item.cat||''); });
      setTimeout(function(){
        var escapedText = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        cb(cards('Here\'s what I found for &ldquo;<strong>'+escapedText+'</strong>&rdquo; on VitalHealth Hub:', rcs));
      }, 500);
      return;
    }

    // 4. Fallback
    setTimeout(function(){ cb(fallback[Math.floor(Math.random()*fallback.length)]); }, 400);
  }

  // ── State ─────────────────────────────────────────────────────────────────
  var isOpen = false;

  // ── DOM helpers ───────────────────────────────────────────────────────────
  function safeBotFragment(html) {
    var template = document.createElement('template');
    template.innerHTML = String(html || '');
    var allowedTags = new Set(['A','BR','DIV','EM','LI','P','SPAN','STRONG','UL']);
    Array.from(template.content.querySelectorAll('*')).forEach(function(el) {
      if (!allowedTags.has(el.tagName)) {
        el.replaceWith(document.createTextNode(el.textContent || ''));
        return;
      }
      Array.from(el.attributes).forEach(function(attr) {
        var keepClass = attr.name === 'class';
        var keepHref = el.tagName === 'A' && attr.name === 'href';
        var keepTarget = el.tagName === 'A' && attr.name === 'target' && attr.value === '_blank';
        var keepRel = el.tagName === 'A' && attr.name === 'rel';
        if (!keepClass && !keepHref && !keepTarget && !keepRel) el.removeAttribute(attr.name);
      });
      if (el.tagName === 'A') {
        var href = el.getAttribute('href') || '';
        if (!/^\/(?!\/)/.test(href) && !/^https:\/\/(?:goldprice\.org|coinmarketcap\.com|www\.xe\.com)(?:\/|$)/i.test(href)) {
          el.removeAttribute('href');
        }
        if (el.getAttribute('target') === '_blank') el.setAttribute('rel', 'noopener noreferrer');
      }
    });
    return template.content;
  }

  function addMessage(type, content) {
    var msgs = document.getElementById('vh-chat-messages');
    if (!msgs) return;
    var wrap = document.createElement('div');
    wrap.className = 'vh-msg-wrap vh-msg-wrap-'+type;
    var bubble = document.createElement('div');
    bubble.className = 'vh-msg vh-msg-'+type;
    if (type === 'user') bubble.textContent = String(content || '');
    else bubble.appendChild(safeBotFragment(content));
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    requestAnimationFrame(function(){ msgs.scrollTop = msgs.scrollHeight; });
  }

  function showTyping() {
    var msgs = document.getElementById('vh-chat-messages');
    if (!msgs) return;
    var wrap = document.createElement('div');
    wrap.className = 'vh-msg-wrap vh-msg-wrap-bot';
    wrap.id = 'vh-typing-wrap';
    var dot = document.createElement('div');
    dot.className = 'vh-typing';
    dot.innerHTML = '<span></span><span></span><span></span>';
    wrap.appendChild(dot);
    msgs.appendChild(wrap);
    requestAnimationFrame(function(){ msgs.scrollTop = msgs.scrollHeight; });
  }

  function removeTyping() {
    var t = document.getElementById('vh-typing-wrap');
    if (t) t.remove();
  }

  function hideActions() {
    var qt = document.getElementById('vh-quick-topics');
    if (qt) qt.style.display = 'none';
  }

  // ── Send ──────────────────────────────────────────────────────────────────
  function send() {
    var input = document.getElementById('vh-chat-input');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    addMessage('user', text);
    input.value = '';
    hideActions();
    showTyping();
    getResponse(text, function(html) {
      removeTyping();
      addMessage('bot', html);
    });
  }

  function quickAsk(topic) {
    var input = document.getElementById('vh-chat-input');
    if (input) { input.value = topic; send(); }
  }

  // ── Toggle ────────────────────────────────────────────────────────────────
  function toggle() {
    isOpen = !isOpen;
    var win       = document.getElementById('vh-chat-window');
    var toggleBtn = document.getElementById('vh-chat-toggle');
    if (isOpen) {
      if (win) win.classList.add('vh-open');
      if (toggleBtn) toggleBtn.classList.add('vh-active');
      setTimeout(function(){ var inp=document.getElementById('vh-chat-input'); if(inp) inp.focus(); }, 320);
    } else {
      if (win) win.classList.remove('vh-open');
      if (toggleBtn) toggleBtn.classList.remove('vh-active');
    }
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    var min = document.getElementById('vh-chat-minimize');
    if (min) min.addEventListener('click', toggle);
    var sendBtn = document.getElementById('vh-chat-send');
    if (sendBtn) sendBtn.addEventListener('click', send);
    var inp = document.getElementById('vh-chat-input');
    if (inp) {
      inp.addEventListener('keydown', function(e){ if(e.key==='Enter'){e.preventDefault();send();} });
    }
    if (inp && 'visualViewport' in window) {
      window.visualViewport.addEventListener('resize', function(){
        var win = document.getElementById('vh-chat-window');
        if (win && isOpen) win.style.maxHeight = window.visualViewport.height+'px';
      });
    }
    setTimeout(function(){
      addMessage('bot','<p class="vh-r-intro">Hi! I\'m your <strong>VitalHealth Assistant</strong>. Ask me about any health topic — or type <em>gold price</em>, <em>USD to PKR</em>, <em>bitcoin price</em> for live rates.</p>');
    }, 400);
  }

  return { init:init, toggle:toggle, quickAsk:quickAsk };

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
    var chatWindow = document.getElementById('vh-chat-window');
    chatToggle.setAttribute('aria-expanded', chatWindow && chatWindow.style.display !== 'none' ? 'true' : 'false');
  });
});

// ─── NAV: Mega Menu Functions ─────────────────────────────────────────────────
function vhhDdSearch(q) {
  var grid = document.getElementById('ddGrid');
  var res  = document.getElementById('ddResults');
  if (!q || !q.trim()) {
    grid.style.display = '';
    res.replaceChildren();
    res.style.display = 'none';
    return;
  }
  var links   = document.querySelectorAll('#ddGrid .mega-col a');
  var matches = Array.from(links).filter(function(a) {
    return a.textContent.toLowerCase().includes(q.toLowerCase());
  });
  grid.style.display = 'none';
  res.style.display  = '';
  res.replaceChildren();
  if (matches.length) {
    matches.forEach(function(a) {
      var link = document.createElement('a');
      link.href = a.getAttribute('href');
      link.className = 'dd-result-item';
      link.textContent = a.textContent;
      res.appendChild(link);
    });
  } else {
    var message = document.createElement('p');
    message.className = 'dd-no-result';
    message.appendChild(document.createTextNode('No results found — '));
    var browse = document.createElement('a');
    browse.href = '/calculators/';
    browse.textContent = 'browse all calculators';
    message.appendChild(browse);
    res.appendChild(message);
  }
}

function vhhToggleCol(h4) {
  if (window.innerWidth > 768) return;
  var col = h4.closest('.mega-col');
  col.classList.toggle('open');
  h4.setAttribute('aria-expanded', col.classList.contains('open') ? 'true' : 'false');
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
  document.addEventListener('keydown', function(e) {
    var h = e.target.closest && e.target.closest('.mega-col-title');
    if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); vhhToggleCol(h); }
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

  // Tool FAQ: toggle open/close (data-faq-id)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-faq-id]');
    if (!btn) return;
    var id = btn.getAttribute('data-faq-id');
    var el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  });

  // Home page: category filter pills (.home-cat-btn)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.home-cat-btn[data-cat]');
    if (btn && typeof window.homeFilterCat === 'function') window.homeFilterCat(btn.getAttribute('data-cat'), btn);
  });

  // Blog hero suggestion: close on outside click
  document.addEventListener('click', function(e) {
    var wrap = document.getElementById('blogHeroSugg');
    var inp = document.getElementById('blogHeroInput');
    if (wrap && inp && !wrap.contains(e.target) && e.target !== inp) wrap.classList.remove('active');
  });

  // Blog/tools search: close overlay on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && typeof window.closeBlogSearch === 'function') window.closeBlogSearch();
  });

  // Blog: initialize items-per-page from initially visible cards
  var blogGridEl = document.getElementById('blogGrid');
  if (blogGridEl) {
    window._blogItemsPerPage = blogGridEl.querySelectorAll('.blog-card:not([style*="display:none"])').length || 12;
  }

  // Blog post TOC: scroll spy
  (function() {
    var links = document.querySelectorAll('.bp-toc-link');
    if (!links.length) return;
    var ids = Array.from(links).map(function(l) { return l.dataset.target; });
    var sections = ids.map(function(id) { return document.getElementById(id); }).filter(Boolean);
    function onScroll() {
      var scrollY = window.scrollY + 120;
      var current = sections[0] && sections[0].id;
      sections.forEach(function(s) { if (s.offsetTop <= scrollY) current = s.id; });
      links.forEach(function(l) { l.classList.toggle('active', l.dataset.target === current); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // Tools hub: recent activity panel
  (function() {
    var panel = document.getElementById('activityPanel');
    var list = document.getElementById('activityList');
    if (!panel || !list) return;
    try {
      var toolNames = {};
      document.querySelectorAll('.tool-premium-card, .utility-minimal-card').forEach(function(card) {
        var href = card.getAttribute('href') || '';
        var slug = href.replace('/tools/', '').replace('.html', '');
        if (!slug) return;
        var iconEl = card.querySelector('.tool-premium-icon, .utility-minimal-icon');
        var nameEl = card.querySelector('.tool-premium-name');
        if (iconEl && nameEl) {
          toolNames[slug] = { name: nameEl.textContent.trim(), icon: iconEl.textContent.trim() };
        } else if (iconEl) {
          var text = card.textContent.replace(iconEl.textContent, '').trim();
          toolNames[slug] = { name: text, icon: iconEl.textContent.trim() };
        }
      });
      var recent = JSON.parse(localStorage.getItem('vhh_recent_tools') || '[]');
      if (recent.length) {
        var pills = recent.filter(function(s) { return toolNames[s]; }).map(function(s) {
          var t = toolNames[s];
          return '<a href="/tools/' + s + '" class="tools-activity-pill">' + t.icon + ' ' + t.name + '</a>';
        }).join('');
        if (pills) { panel.classList.add('has-activity'); list.innerHTML = pills; }
      }
    } catch (e) {}
  })();

});

window._currentCalcCat = 'all';

window.filterCat = function(cat, btn) {
  if (document.getElementById('calcGrid')) {
    window._currentCalcCat = cat;
    document.querySelectorAll('#calcFilterBtns .filter-btn').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    if (typeof window.filterCalcs === 'function') window.filterCalcs();
  } else {
    document.querySelectorAll('.tools-cat-tab').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    document.querySelectorAll('[data-section]').forEach(function(s) { s.style.display = (cat === 'all' || s.dataset.section === cat) ? '' : 'none'; });
    document.querySelectorAll('[data-cat]').forEach(function(c) { c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none'; });
  }
};

window.filterCalcs = function() {
  var q = document.getElementById('calcSearch') ? document.getElementById('calcSearch').value.toLowerCase() : '';
  var currentCat = window._currentCalcCat || 'all';
  document.querySelectorAll('#calcGrid .card').forEach(function(card) {
    var title = card.getAttribute('data-title') || '';
    var cat = card.getAttribute('data-category') || '';
    var matchQ = !q || title.indexOf(q) !== -1;
    var matchC = currentCat === 'all' || cat === currentCat;
    card.style.display = (matchQ && matchC) ? '' : 'none';
  });
};

window.faqFilterCat = function(filter, btn) {
  document.querySelectorAll('.faq-pill').forEach(function(p) { p.classList.remove('faq-pill-active'); });
  if (btn) btn.classList.add('faq-pill-active');
  document.querySelectorAll('.faq-cat-section').forEach(function(s) {
    s.style.display = (filter === 'all' || s.dataset.cat === filter) ? '' : 'none';
  });
  var searchVal = document.getElementById('faqHeroInput') ? document.getElementById('faqHeroInput').value : '';
  if (searchVal) window.faqHeroSearch(searchVal);
};

window.faqHeroSearch = function(q) {
  q = (q || '').toLowerCase().trim();
  var notice = document.getElementById('faqSearchNotice');
  var msg = document.getElementById('faqSearchMsg');
  var count = 0;
  if (q) {
    document.querySelectorAll('.faq-cat-section').forEach(function(s) { s.style.display = ''; });
    document.querySelectorAll('.faq-pill').forEach(function(p) { p.classList.remove('faq-pill-active'); });
  }
  document.querySelectorAll('.faq-item').forEach(function(item) {
    var match = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
    item.style.display = match ? '' : 'none';
    if (match) count++;
  });
  document.querySelectorAll('.faq-cat-section').forEach(function(s) {
    var hasVisible = Array.from(s.querySelectorAll('.faq-item')).some(function(i) { return i.style.display !== 'none'; });
    s.style.display = (!q || hasVisible) ? '' : 'none';
  });
  if (notice && msg) {
    notice.style.display = q ? '' : 'none';
    msg.textContent = q ? 'Found ' + count + ' result' + (count !== 1 ? 's' : '') + ' for "' + q + '"' : '';
  }
};

var _allBlogData = null;

function _getBlogData() {
  if (_allBlogData) return _allBlogData;
  _allBlogData = [];
  document.querySelectorAll('#blogGrid .blog-card').forEach(function(card) {
    _allBlogData.push({
      slug: card.getAttribute('data-slug') || '',
      title: card.getAttribute('data-title-display') || card.getAttribute('data-title') || '',
      category: card.getAttribute('data-category') || '',
      date: card.getAttribute('data-date') || ''
    });
  });
  return _allBlogData;
}

var _blogCurrentCat = 'all';
var _blogCurrentPage = 1;
var _blogViewAllMode = false;

window.blogFilterCat = function(cat, btn) {
  _blogCurrentCat = cat;
  _blogViewAllMode = false;
  document.querySelectorAll('.blog-category-pill').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  _blogCurrentPage = 1;
  var vab = document.querySelector('.blog-view-all-btn');
  if (vab) vab.textContent = 'View All Articles';
  var titleEl = document.getElementById('blogSectionTitle');
  if (titleEl) {
    titleEl.textContent = cat === 'all' ? 'All Health Articles' : cat + ' Articles';
  }
  window.applyBlogFilters();
  var arts = document.querySelector('.blog-articles-section');
  if (arts) window.scrollTo({ top: arts.offsetTop - 140, behavior: 'smooth' });
};

window.applyBlogFilters = function() {
  var cards = document.querySelectorAll('#blogGrid .blog-card');
  var shown = 0; var total = 0; var newlyShown = [];
  var perPage = window._blogItemsPerPage || 12;
  cards.forEach(function(card) {
    var cat = card.getAttribute('data-category');
    var matchC = _blogCurrentCat === 'all' || cat === _blogCurrentCat;
    if (matchC) {
      total++;
      if (_blogViewAllMode || total <= _blogCurrentPage * perPage) {
        var wasHidden = card.style.display === 'none';
        card.style.display = '';
        if (wasHidden) newlyShown.push(card);
        shown++;
      } else { card.style.display = 'none'; }
    } else { card.style.display = 'none'; }
  });
  newlyShown.forEach(function(c) {
    c.classList.add('blog-card-reveal');
    setTimeout(function() { c.classList.remove('blog-card-reveal'); }, 600);
  });
  var counter = document.getElementById('blogCounter');
  if (counter) counter.textContent = 'Showing ' + shown + ' of ' + total;
  var pf = document.getElementById('blogProgressFill');
  if (pf) pf.style.width = (total > 0 ? Math.round(shown / total * 100) : 0) + '%';
  var loadBtn = document.getElementById('blogLoadMore');
  if (loadBtn) loadBtn.style.display = (shown < total && !_blogViewAllMode) ? 'flex' : 'none';
};

window.loadMoreBlog = function() {
  _blogCurrentPage++;
  window.applyBlogFilters();
  var grid = document.getElementById('blogGrid');
  if (grid) window.scrollTo({ top: grid.scrollHeight + grid.offsetTop - 300, behavior: 'smooth' });
};

window.blogViewAll = function() {
  _blogViewAllMode = true;
  window.applyBlogFilters();
  var btn = document.querySelector('.blog-view-all-btn');
  if (btn) btn.textContent = '\u2713 Showing All Articles';
};

window.blogSort = function(val) {
  var grid = document.getElementById('blogGrid');
  if (!grid) return;
  var cards = Array.from(grid.querySelectorAll('.blog-card'));
  cards.sort(function(a, b) {
    if (val === 'az') return (a.getAttribute('data-title') || '').localeCompare(b.getAttribute('data-title') || '');
    if (val === 'zt') return (b.getAttribute('data-title') || '').localeCompare(a.getAttribute('data-title') || '');
    if (val === 'oldest') return (a.getAttribute('data-date') || '').localeCompare(b.getAttribute('data-date') || '');
    return (b.getAttribute('data-date') || '').localeCompare(a.getAttribute('data-date') || '');
  });
  cards.forEach(function(c) { grid.appendChild(c); });
  _blogCurrentPage = 1;
  window.applyBlogFilters();
};

window.blogHeroSearch = function(q) {
  var sugg = document.getElementById('blogHeroSugg');
  if (!sugg) return;
  q = (q || '').toLowerCase().trim();
  if (!q) { sugg.classList.remove('active'); sugg.replaceChildren(); return; }
  var data = _getBlogData();
  var matches = data.filter(function(p) {
    return p.title.toLowerCase().indexOf(q) !== -1 || p.category.toLowerCase().indexOf(q) !== -1;
  }).slice(0, 6);
  if (!matches.length) { sugg.classList.remove('active'); return; }
  sugg.replaceChildren();
  matches.forEach(function(p) {
    var link = document.createElement('a');
    link.href = '/blog/' + encodeURIComponent(p.slug);
    link.className = 'blog-hero-sugg-item';
    var category = document.createElement('span');
    category.className = 'blog-hero-sugg-cat';
    category.textContent = p.category;
    var title = document.createElement('span');
    title.className = 'blog-hero-sugg-title';
    title.textContent = p.title;
    link.append(category, title);
    sugg.appendChild(link);
  });
  sugg.classList.add('active');
};

window.openBlogSearch = function(q) {
  var overlay = document.getElementById('blogSearchOverlay');
  var inp = document.getElementById('blogSearchInput');
  if (overlay) overlay._returnFocus = document.activeElement;
  if (overlay) overlay.classList.add('active');
  if (overlay) overlay.setAttribute('aria-hidden', 'false');
  if (inp) { inp.focus(); if (q) { inp.value = q; window.liveSearchBlog(); } }
  document.body.style.overflow = 'hidden';
};

window.closeBlogSearch = function() {
  var overlay = document.getElementById('blogSearchOverlay');
  var inp = document.getElementById('blogSearchInput');
  var results = document.getElementById('blogSearchResults');
  if (overlay) overlay.classList.remove('active');
  if (overlay) overlay.setAttribute('aria-hidden', 'true');
  if (inp) inp.value = '';
  if (results) results.replaceChildren();
  document.body.style.overflow = '';
  if (overlay && overlay._returnFocus && typeof overlay._returnFocus.focus === 'function') overlay._returnFocus.focus();
};

document.addEventListener('keydown', function(e) {
  var overlay = document.getElementById('blogSearchOverlay');
  if (!overlay || !overlay.classList.contains('active')) return;
  if (e.key === 'Escape') { e.preventDefault(); window.closeBlogSearch(); return; }
  if (e.key !== 'Tab') return;
  var focusable = Array.from(overlay.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])'))
    .filter(function(el) { return !el.disabled && el.offsetParent !== null; });
  if (!focusable.length) return;
  var first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

window.liveSearchBlog = function() {
  var inp = document.getElementById('blogSearchInput');
  var results = document.getElementById('blogSearchResults');
  if (!inp || !results) return;
  var q = inp.value.toLowerCase().trim();
  if (!q) { results.replaceChildren(); return; }
  var data = _getBlogData();
  var matches = data.filter(function(p) {
    return p.title.toLowerCase().indexOf(q) !== -1 || p.category.toLowerCase().indexOf(q) !== -1;
  }).slice(0, 12);
  if (!matches.length) {
    var empty = document.createElement('span');
    empty.style.cssText = 'pointer-events:none;color:var(--gray-500);';
    empty.textContent = 'No articles found for "' + q + '"';
    results.replaceChildren(empty);
    return;
  }
  results.replaceChildren();
  matches.forEach(function(p) {
    var link = document.createElement('a');
    link.href = '/blog/' + encodeURIComponent(p.slug);
    var category = document.createElement('span');
    category.className = 'search-result-category';
    category.textContent = p.category;
    link.append(category, document.createTextNode(' ' + p.title));
    results.appendChild(link);
  });
};

window.blogTagClick = function(tag) {
  if (typeof window.closeBlogSearch === 'function') window.closeBlogSearch();
  var catMap = {'Weight Loss':'Body Metrics','BMI':'Body Metrics','Calories':'Nutrition','Protein':'Nutrition','Sleep':'Sleep','Hydration':'Nutrition','Heart Health':'Heart Health','Diabetes':'Disease Prevention','Keto':'Nutrition','Intermittent Fasting':'Nutrition','Mental Health':'Mental Health','Anxiety':'Mental Health','Depression':'Mental Health','Meditation':'Mental Health','Yoga':'Fitness','Running':'Fitness','HIIT':'Fitness','Cholesterol':'Heart Health','Blood Pressure':'Heart Health','Pregnancy':"Women's Health","Women's Health":"Women's Health","Men's Health":'Wellness','Aging':'Wellness','Vitamins':'Nutrition','Gut Health':'Wellness','Immunity':'Nutrition','Stress':'Mental Health','Inflammation':'Nutrition','Hormones':'Wellness','Cancer Prevention':'Disease Prevention'};
  var matchedCat = catMap[tag] || 'all';
  var pill = null;
  document.querySelectorAll('.blog-category-pill').forEach(function(b) { if (b.textContent === matchedCat) pill = b; });
  window.blogFilterCat(matchedCat, pill || document.querySelector('.blog-category-pill'));
};

window.filterHub = function(q) {
  q = (q || '').toLowerCase().trim();
  document.querySelectorAll('[data-name]').forEach(function(card) { card.style.display = (q && card.dataset.name.indexOf(q) === -1) ? 'none' : ''; });
  document.querySelectorAll('[data-section]').forEach(function(sec) {
    var vis = Array.from(sec.querySelectorAll('[data-name]')).filter(function(c) { return c.style.display !== 'none'; }).length;
    sec.style.display = (vis === 0 && q) ? 'none' : '';
  });
};

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

/* ── Responsive data-table: auto-add data-label to every td ── */
(function() {
  function labelDataTables() {
    document.querySelectorAll('table.data-table').forEach(function(tbl) {
      var headers = Array.from(tbl.querySelectorAll('thead th')).map(function(th) {
        return th.textContent.trim();
      });
      if (!headers.length) return;
      tbl.querySelectorAll('tbody tr').forEach(function(row) {
        Array.from(row.querySelectorAll('td')).forEach(function(td, i) {
          if (headers[i]) td.setAttribute('data-label', headers[i]);
        });
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', labelDataTables);
  } else {
    labelDataTables();
  }
})();
