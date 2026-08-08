/* Extracted from tools/voice-studio.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
// ── Voice Data (expanded: 10+ per category) ──
var VOICE_CATEGORIES = [
  { name:'Narration', icon:'🎙', voices:[
    { name:'Deep Documentary', api:'Brian', desc:'Rich, authoritative voice for documentaries and audiobooks.' },
    { name:'Warm Female Narrator', api:'Amy', desc:'Warm British female — ideal for documentaries and guides.' },
    { name:'News Anchor', api:'Matthew', desc:'Clear, confident broadcast tone for news and reports.' },
    { name:'Educational Explainer', api:'Joanna', desc:'Clear and articulate — perfect for tutorials and courses.' },
    { name:'Podcast Voice', api:'Emma', desc:'Conversational and engaging — built for podcast narration.' },
    { name:'Clear Instructor', api:'Salli', desc:'Friendly, structured voice for online lessons.' },
    { name:'Story Narrator Male', api:'Russell', desc:'Warm and expressive male narrator for stories.' },
    { name:'Story Narrator Female', api:'Kimberly', desc:'Soft and engaging female narrator for storytelling.' },
    { name:'Professional Voice', api:'Joey', desc:'Confident, neutral voice for corporate content.' },
    { name:'Neutral Explainer', api:'Justin', desc:'Young, clear voice ideal for explainer videos.' }
  ]},
  { name:'Storytelling', icon:'📖', voices:[
    { name:'Fantasy Story Voice', api:'Russell', desc:'Dramatic and immersive — perfect for fantasy worlds.' },
    { name:'Adventure Narrator', api:'Brian', desc:'Bold and energetic for action-packed adventures.' },
    { name:'Emotional Story Voice', api:'Amy', desc:'Warm and emotive — great for heartfelt narratives.' },
    { name:'Kids Story Voice', api:'Ivy', desc:'Bright and cheerful voice for children\'s bedtime stories.' },
    { name:'Dramatic Voice', api:'Matthew', desc:'Deep and theatrical for dramatic monologues.' },
    { name:'Calm Storytelling', api:'Joanna', desc:'Smooth, relaxed pacing for gentle stories.' },
    { name:'Bedtime Story Voice', api:'Kendra', desc:'Soft and soothing — designed to lull listeners to sleep.' },
    { name:'Female Story Narrator', api:'Emma', desc:'Clear, warm British female for engaging narratives.' },
    { name:'Male Deep Story', api:'Joey', desc:'Gravelly, commanding tone for gripping tales.' },
    { name:'Creative Narration', api:'Kimberly', desc:'Versatile female voice for creative storytelling.' }
  ]},
  { name:'Female Voices', icon:'🎀', voices:[
    { name:'Warm Female Voice', api:'Amy', desc:'Warm, refined British female — universally versatile.' },
    { name:'Soft Calm Female', api:'Joanna', desc:'Gentle and serene American female voice.' },
    { name:'Professional Female', api:'Emma', desc:'Clear, polished British female for professional use.' },
    { name:'Emotional Female', api:'Salli', desc:'Expressive and warm — great for emotive content.' },
    { name:'Storytelling Female', api:'Kimberly', desc:'Engaging and vivid female for story narration.' },
    { name:'Relaxation Female', api:'Kendra', desc:'Slow, soothing female voice for relaxation.' },
    { name:'Confident Female', api:'Nicole', desc:'Confident Australian female with natural tone.' },
    { name:'Friendly Female', api:'Ivy', desc:'Light and approachable for casual content.' },
    { name:'Meditation Female', api:'Raveena', desc:'Soft Indian English accent — serene and calming.' },
    { name:'Educational Female', api:'Salli', desc:'Clear and structured female voice for learning.' }
  ]},
  { name:'Social Media', icon:'📱', voices:[
    { name:'Fast TikTok Voice', api:'Justin', desc:'Quick, punchy voice that works great for short clips.' },
    { name:'YouTube Narrator', api:'Matthew', desc:'Warm and measured — ideal for YouTube videos.' },
    { name:'Energetic Promo', api:'Joey', desc:'Upbeat and persuasive for product promos.' },
    { name:'Reels Voice', api:'Ivy', desc:'Light and engaging for Instagram Reels content.' },
    { name:'Influencer Voice', api:'Emma', desc:'Conversational British female for influencer content.' },
    { name:'Casual Friendly', api:'Salli', desc:'Warm and relatable for everyday social content.' },
    { name:'Modern AI Voice', api:'Brian', desc:'Deep, polished voice for tech and AI content.' },
    { name:'Short Form Voice', api:'Justin', desc:'Sharp and direct — optimised for under 60 seconds.' },
    { name:'Trendy Voice', api:'Kimberly', desc:'Fresh and modern female for trending topics.' },
    { name:'Marketing Voice', api:'Russell', desc:'Confident and compelling for ads and promotions.' }
  ]},
  { name:'ASMR & Soft Voice', icon:'🌊', voices:[
    { name:'Soft Whisper Female', api:'Ivy', desc:'Light, breathy female voice — ideal for ASMR.' },
    { name:'Calm ASMR Male', api:'Brian', desc:'Deep, soft male voice with relaxing delivery.' },
    { name:'Close Mic Soft', api:'Kendra', desc:'Intimate, close-sounding soft female voice.' },
    { name:'Slow Relaxing Voice', api:'Joanna', desc:'Unhurried and gentle — perfect for relaxation audio.' },
    { name:'Sleep Whisper', api:'Amy', desc:'Soft British female — soothing for sleep content.' },
    { name:'Soft Guided Relax', api:'Kimberly', desc:'Warm and gentle for guided relaxation sessions.' },
    { name:'Light Ambient Voice', api:'Salli', desc:'Airy and calm — works well over ambient music.' },
    { name:'Calm Narration Soft', api:'Emma', desc:'Soft British narration for mindful listening.' },
    { name:'Deep Relax Voice', api:'Russell', desc:'Low, steady male voice for deep relaxation.' },
    { name:'Gentle Breathing', api:'Nicole', desc:'Very soft Australian female for breathing exercises.' }
  ]},
  { name:'Sleep & Meditation', icon:'🌙', voices:[
    { name:'Sleep Narrator', api:'Joanna', desc:'Serene, slow female voice designed for sleep stories.' },
    { name:'Meditation Guide', api:'Kimberly', desc:'Tranquil and measured — perfect for guided meditation.' },
    { name:'Body Scan Guide', api:'Amy', desc:'Gentle British female for body scan meditations.' },
    { name:'Mindfulness Voice', api:'Salli', desc:'Clear and calm for mindfulness and breathing sessions.' },
    { name:'Night Calm Voice', api:'Ivy', desc:'Soft and hushed — ideal for late-night listening.' },
    { name:'Deep Sleep Male', api:'Brian', desc:'Low, steady voice to ease listeners toward sleep.' },
    { name:'Yoga Guide Female', api:'Raveena', desc:'Gentle Indian English female for yoga classes.' },
    { name:'Breathing Coach', api:'Emma', desc:'Steady and calm British female for breath work.' },
    { name:'Relaxation Script', api:'Kendra', desc:'Slow, deliberate voice for relaxation scripts.' },
    { name:'Dream Guide', api:'Russell', desc:'Warm male voice for creative visualisation.' }
  ]},
  { name:'Quranic & Recitation', icon:'☪️', voices:[
    { name:'Slow Tajweed Style', api:'Brian', desc:'Deep, measured tone suited for slow, clear recitation practice.' },
    { name:'Deep Recitation', api:'Matthew', desc:'Rich and resonant — respectful tone for Arabic text.' },
    { name:'Soft Recitation', api:'Joey', desc:'Gentle and clear for verse memorisation practice.' },
    { name:'Memorisation Mode', api:'Russell', desc:'Structured, repetitive pace for learning verses.' },
    { name:'Clear Learning Voice', api:'Justin', desc:'Neutral and articulate for educational recitation.' },
    { name:'Calm Recitation', api:'Joanna', desc:'Calm, measured pace — soft and easy to follow along.' },
    { name:'Structured Recitation', api:'Matthew', desc:'Steady rhythm ideal for structured recitation lessons.' },
    { name:'Deep Echo Voice', api:'Brian', desc:'Full-bodied, deep voice for impactful delivery.' },
    { name:'Soft Male Qari', api:'Joey', desc:'Soft male voice for quiet, contemplative recitation.' },
    { name:'Neutral Practice', api:'Russell', desc:'Clear and even-paced for Arabic pronunciation practice.' }
  ]},
  { name:'News & Professional', icon:'📰', voices:[
    { name:'Breaking News Male', api:'Matthew', desc:'Authoritative and urgent for breaking news delivery.' },
    { name:'Anchor Female', api:'Joanna', desc:'Polished and confident American female anchor.' },
    { name:'Corporate Presenter', api:'Brian', desc:'Professional and measured for boardroom presentations.' },
    { name:'Legal Narrator', api:'Russell', desc:'Serious and precise tone for legal or formal content.' },
    { name:'Finance Explainer', api:'Joey', desc:'Clear and trustworthy for financial reports.' },
    { name:'Tech Narrator', api:'Matthew', desc:'Crisp and modern for technology product videos.' },
    { name:'Report Voice', api:'Emma', desc:'Neutral British female for formal reports.' },
    { name:'Training Voice', api:'Salli', desc:'Clear instructor voice for workplace training.' },
    { name:'Executive Voice', api:'Brian', desc:'Deep and confident for C-suite communications.' },
    { name:'Documentary Pro', api:'Russell', desc:'Rich, seasoned voice for long-form documentary.' }
  ]},
  { name:'Characters & Fun', icon:'🎭', voices:[
    { name:'AI Robot Voice', api:'Matthew', desc:'Clipped and mechanical — great for sci-fi robot characters.' },
    { name:'Friendly Assistant', api:'Salli', desc:'Warm and helpful — perfect for AI assistant personas.' },
    { name:'Cartoon Voice', api:'Justin', desc:'Bright and playful for animated cartoon characters.' },
    { name:'Young Female', api:'Ivy', desc:'Light, youthful female voice for young characters.' },
    { name:'Mature Male Voice', api:'Brian', desc:'Deep and wise — ideal for elder or mentor characters.' },
    { name:'Sci-Fi Voice', api:'Matthew', desc:'Futuristic and measured for science fiction content.' },
    { name:'Fantasy Character', api:'Russell', desc:'Dramatic and rich for fantasy game characters.' },
    { name:'Villain Voice', api:'Joey', desc:'Dark and commanding for antagonist characters.' },
    { name:'Hero Voice', api:'Brian', desc:'Confident and strong for heroic protagonists.' },
    { name:'Soft Companion', api:'Amy', desc:'Warm and reassuring for companion character roles.' }
  ]},
  { name:'Cinematic & Trailer', icon:'🎬', voices:[
    { name:'Epic Trailer Voice', api:'Brian', desc:'Massive and dramatic — built for movie trailers.' },
    { name:'Intense Promo', api:'Joey', desc:'High-energy and punchy for short promos.' },
    { name:'Cinematic Female', api:'Amy', desc:'Powerful British female for cinematic intros.' },
    { name:'Action Trailer', api:'Matthew', desc:'Fast-paced and intense for action movie trailers.' },
    { name:'Sci-Fi Trailer', api:'Russell', desc:'Deep and otherworldly for science fiction trailers.' },
    { name:'Horror Narrator', api:'Brian', desc:'Slow and ominous — spine-chilling narration.' },
    { name:'Drama Narrator', api:'Joanna', desc:'Emotional and measured for drama series intros.' },
    { name:'Game Trailer Voice', api:'Joey', desc:'Bold and commanding for video game announcements.' },
    { name:'Documentary Opener', api:'Matthew', desc:'Resonant and calm for documentary openings.' },
    { name:'Cinematic Closer', api:'Russell', desc:'Warm and conclusive for cinematic endings.' }
  ]}
];

// ── Voice speech params: rate & pitch per category ──
var CAT_PARAMS = {
  'Narration':            { rate:0.95, pitch:0.85 },
  'Storytelling':         { rate:1.0,  pitch:1.0  },
  'Female Voices':        { rate:1.0,  pitch:1.35, female:true },
  'Social Media':         { rate:1.2,  pitch:1.1  },
  'ASMR & Soft Voice':    { rate:0.75, pitch:1.05, female:true },
  'Sleep & Meditation':   { rate:0.7,  pitch:0.9  },
  'Quranic & Recitation': { rate:0.65, pitch:0.85 },
  'News & Professional':  { rate:1.0,  pitch:0.9  },
  'Characters & Fun':     { rate:1.1,  pitch:1.2  },
  'Cinematic & Trailer':  { rate:0.85, pitch:0.7  }
};

// Per-voice pitch overrides (relative to category)
var VOICE_PITCH_OVERRIDE = {
  'Deep Documentary':0.7,'Epic Trailer Voice':0.65,'Horror Narrator':0.65,
  'Hero Voice':0.75,'Villain Voice':0.6,'Mature Male Voice':0.7,
  'Warm Female Voice':1.4,'Emotional Female':1.45,'Soft Calm Female':1.3,
  'Soft Whisper Female':1.1,'Kids Story Voice':1.5,'Young Female':1.5,
  'Cartoon Voice':1.4,'AI Robot Voice':0.6,'Sci-Fi Voice':0.65,
  'Fast TikTok Voice':1.2,'Upbeat Promo':1.2
};

var selectedVoice = VOICE_CATEGORIES[0].voices[0];
var isGenerating = false;
var isHighPitch = false;
var currentUtterance = null;
var synth = window.speechSynthesis;
var allVoices = [];

function loadVoices(){
  allVoices = synth.getVoices();
}
loadVoices();
if(synth.onvoiceschanged !== undefined){ synth.onvoiceschanged = loadVoices; }

// ── Build Visualizer ──
(function(){
  var viz = document.getElementById('visualizer');
  for(var i=0;i<18;i++){
    var b=document.createElement('div');
    b.className='vs-bar';
    var h=Math.floor(Math.random()*20)+8;
    b.style.cssText='height:'+h+'px;--h:'+Math.floor(Math.random()*40+15)+'px;--d:'+(Math.random()*0.4+0.3)+'s';
    viz.appendChild(b);
  }
})();

// ── Build Sidebar ──
(function(){
  var list=document.getElementById('catList');
  VOICE_CATEGORIES.forEach(function(cat,ci){
    var catDiv=document.createElement('div');
    catDiv.className='vs-cat';

    var hdr=document.createElement('div');
    hdr.className='vs-cat-header'+(ci===0?' open active':'');
    hdr.innerHTML='<span class="vs-cat-icon">'+cat.icon+'</span>'
      +'<span class="vs-cat-name">'+cat.name+'</span>'
      +'<span class="vs-cat-count">'+cat.voices.length+'</span>'
      +'<span class="vs-cat-arrow">›</span>';

    var voices=document.createElement('div');
    voices.className='vs-cat-voices'+(ci===0?' open':'');

    cat.voices.forEach(function(v,vi){
      var btn=document.createElement('button');
      btn.className='vs-voice-btn'+(ci===0&&vi===0?' selected':'');
      btn.dataset.api=v.api;
      btn.dataset.name=v.name;
      btn.dataset.desc=v.desc;
      btn.dataset.cat=cat.name;
      btn.innerHTML='<span class="vs-voice-name">'+v.name+'</span><span class="vs-voice-sub">'+v.api+' · '+cat.name+'</span>';
      btn.addEventListener('click',function(){ selectVoice(this); });
      voices.appendChild(btn);
    });

    hdr.addEventListener('click',function(){
      var isOpen=voices.classList.contains('open');
      voices.classList.toggle('open',!isOpen);
      hdr.classList.toggle('open',!isOpen);
      hdr.classList.toggle('active',!isOpen);
    });

    catDiv.appendChild(hdr);
    catDiv.appendChild(voices);
    list.appendChild(catDiv);
  });

  // Update total voice count in header
  var total=0;
  VOICE_CATEGORIES.forEach(function(c){ total+=c.voices.length; });
  var countEl=document.querySelector('.vs-sidebar-head span');
  if(countEl) countEl.textContent=total+' voices';
  var statEl=document.querySelector('.vs-stat strong');
  if(statEl) statEl.textContent=total+'+';
})();

function selectVoice(btn){
  document.querySelectorAll('.vs-voice-btn').forEach(function(b){ b.classList.remove('selected'); });
  btn.classList.add('selected');
  selectedVoice={ name:btn.dataset.name, api:btn.dataset.api, desc:btn.dataset.desc, cat:btn.dataset.cat };
  document.getElementById('selectedBadge').textContent=selectedVoice.name;
  document.getElementById('voiceDescTitle').textContent=selectedVoice.name;
  document.getElementById('voiceDescText').textContent=selectedVoice.desc;
}

function useQuickPrompt(text){
  var ta=document.getElementById('scriptInput');
  ta.value=text;
  updateCharCount(text.length);
  ta.focus();
}

function updateCharCount(n){
  var el=document.getElementById('charCount');
  el.textContent=n;
  el.style.color=n>450?'#f4a261':n>350?'#fbbf24':'rgba(255,255,255,.3)';
}

document.getElementById('scriptInput').addEventListener('input',function(){
  updateCharCount(this.value.length);
});

function showError(msg){
  var el=document.getElementById('vsError');
  el.textContent='⚠ '+msg;
  el.style.display='block';
  clearTimeout(el._t);
  el._t=setTimeout(function(){ el.style.display='none'; },6000);
}

function hideError(){ document.getElementById('vsError').style.display='none'; }

function stopBars(){ document.querySelectorAll('.vs-bar').forEach(function(b){ b.classList.remove('playing'); }); }
function startBars(){ document.querySelectorAll('.vs-bar').forEach(function(b){ b.classList.add('playing'); }); }

function setGenerating(state){
  isGenerating=state;
  var btn=document.getElementById('generateBtn');
  var sp=document.getElementById('spinner');
  var txt=document.getElementById('btnText');
  btn.disabled=state;
  sp.style.display=state?'block':'none';
  txt.textContent=state?'Speaking...':'Generate Audio';
  document.getElementById('statusDot').className='vs-status-dot'+(state?' loading':' ready');
  if(state) startBars(); else stopBars();
}

// ── Pick best browser voice ──
function getBrowserVoice(catName, voiceName){
  if(!allVoices.length) allVoices=synth.getVoices();
  var params=CAT_PARAMS[catName]||{ rate:1.0,pitch:1.0 };
  var wantFemale=!!params.female;

  // Known female name patterns
  var femaleNames=['female','woman','girl','zira','hazel','susan','kate','karen',
    'samantha','victoria','alice','nicky','fiona','moira','veena','raveena',
    'joanna','salli','kimberly','kendra','ivy','amy','emma','nicole'];

  var enVoices=allVoices.filter(function(v){ return v.lang.startsWith('en'); });
  if(!enVoices.length) enVoices=allVoices;

  var gendered=enVoices.filter(function(v){
    var n=v.name.toLowerCase();
    var isFem=femaleNames.some(function(f){ return n.indexOf(f)!==-1; });
    return wantFemale?isFem:!isFem;
  });

  return gendered[0]||enVoices[0]||allVoices[0]||null;
}

function speak(text, catName, voiceName, speedMultiplier){
  synth.cancel();

  var params=CAT_PARAMS[catName]||{ rate:1.0,pitch:1.0 };
  var basePitch=VOICE_PITCH_OVERRIDE[voiceName]||params.pitch;
  var rate=params.rate*(speedMultiplier||1.0);
  var pitch=isHighPitch?Math.min(basePitch+0.4,2.0):basePitch;

  var utt=new SpeechSynthesisUtterance(text);
  utt.rate=Math.max(0.1,Math.min(rate,10));
  utt.pitch=Math.max(0,Math.min(pitch,2));
  utt.volume=1;

  var bv=getBrowserVoice(catName,voiceName);
  if(bv) utt.voice=bv;

  utt.onstart=function(){
    setGenerating(false);
    document.getElementById('audioPlaceholder').style.display='none';
    document.getElementById('audioPlayer').style.display='block';
    document.getElementById('infoCard').style.display='block';
    document.getElementById('outControls').style.display='grid';
    document.getElementById('speakingLabel').textContent='Speaking…';
    document.getElementById('speakingText').textContent=text.substring(0,60)+(text.length>60?'…':'');
    document.getElementById('infoVoice').textContent=selectedVoice.name;
    document.getElementById('infoCat').textContent=catName;
    document.getElementById('infoLen').textContent=text.length+' chars';
    document.getElementById('infoSpeed').textContent=rate.toFixed(1)+'x'+(isHighPitch?' · High':'');
    startBars();
  };
  utt.onend=function(){
    stopBars();
    document.getElementById('speakingLabel').textContent='Done ✓';
    document.getElementById('statusDot').className='vs-status-dot ready';
  };
  utt.onerror=function(e){
    stopBars();
    setGenerating(false);
    if(e.error!=='interrupted') showError('Speech failed. Try shorter text or a different browser.');
  };

  currentUtterance=utt;
  synth.speak(utt);
}

function generateAudio(){
  if(isGenerating) return;

  var text=document.getElementById('scriptInput').value.trim();
  if(!text){ showError('Please enter some text to convert to speech.'); return; }
  if(text.length<3){ showError('Please enter at least a few words.'); return; }
  if(text.length>1000){ showError('Please keep text under 1000 characters for best results.'); return; }

  if(!window.speechSynthesis){
    showError('Your browser does not support speech synthesis. Please try Chrome or Edge.');
    return;
  }

  hideError();
  setGenerating(true);

  var speed=parseFloat(document.getElementById('speedSelect').value)||1.0;
  speak(text, selectedVoice.cat||'Narration', selectedVoice.name, speed);
}

function generateVariation(){
  if(isGenerating) return;
  var text=document.getElementById('scriptInput').value.trim();
  if(!text){ showError('Enter some text first.'); return; }

  hideError();
  setGenerating(true);

  var speed=(parseFloat(document.getElementById('speedSelect').value)||1.0)+(Math.random()*0.3-0.15);
  speed=Math.max(0.6,Math.min(1.8,speed));
  speak(text, selectedVoice.cat||'Narration', selectedVoice.name, speed);
}

function toggleHighPitch(){
  isHighPitch=!isHighPitch;
  var btn=document.getElementById('pitchBtn');
  btn.style.background=isHighPitch?'rgba(82,183,136,.15)':'';
  btn.style.borderColor=isHighPitch?'rgba(82,183,136,.4)':'';
  btn.style.color=isHighPitch?'#52b788':'';
}

function playAudio(){
  if(synth.paused) synth.resume();
  else if(currentUtterance){
    synth.cancel();
    var text=document.getElementById('scriptInput').value.trim();
    var speed=parseFloat(document.getElementById('speedSelect').value)||1.0;
    if(text) speak(text,selectedVoice.cat||'Narration',selectedVoice.name,speed);
  }
}
function pauseAudio(){ synth.pause(); stopBars(); }
function stopAudio(){ synth.cancel(); stopBars(); document.getElementById('speakingLabel').textContent='Stopped'; }
function downloadAudio(){ showError('Download is not available with the browser speech engine. Use Play/Pause controls to listen.'); }


/* data-vh-action dispatcher: replaces the inline onclick attributes this page used to
   carry, which a CSP without 'unsafe-inline' would refuse to run. Also gives the
   non-button triggers real keyboard support. */
(function () {
  function run(el) {
    var name = el.getAttribute('data-vh-action');
    var fn = window[name];
    if (typeof fn !== 'function') return;
    var args = [];
    for (var i = 0; el.hasAttribute('data-vh-arg' + i); i++) {
      args.push(el.getAttribute('data-vh-arg' + i));
    }
    fn.apply(null, args);
  }

  document.addEventListener('click', function (event) {
    var el = event.target.closest('[data-vh-action]');
    if (el) run(el);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    var el = event.target.closest('[data-vh-action]');
    if (!el || el.tagName === 'BUTTON') return;
    event.preventDefault();
    run(el);
  });
})();

