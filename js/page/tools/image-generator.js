/* Extracted from tools/image-generator.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
var selectedStyle = 'realistic';
var selectedW = 1024;
var selectedH = 1024;
var currentImageUrl = '';
var isGenerating = false;

// Style buttons
document.getElementById('styleGrid').addEventListener('click', function(e) {
  var btn = e.target.closest('.style-btn');
  if (!btn) return;
  document.querySelectorAll('.style-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  selectedStyle = btn.dataset.style;
});

// Size buttons
document.getElementById('sizeGrid').addEventListener('click', function(e) {
  var btn = e.target.closest('.size-btn');
  if (!btn) return;
  document.querySelectorAll('.size-btn').forEach(function(b) {
    b.classList.remove('active');
    b.querySelector('svg rect,svg rect') && b.querySelectorAll('rect,rect').forEach(function(r){ r.setAttribute('stroke','#6b7280'); });
  });
  btn.classList.add('active');
  selectedW = parseInt(btn.dataset.w);
  selectedH = parseInt(btn.dataset.h);
});

// Char counter
document.getElementById('promptInput').addEventListener('input', function() {
  document.getElementById('charCount').textContent = this.value.length;
});

// Upload preview
document.getElementById('uploadInput').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    document.getElementById('uploadLabel').textContent = file.name;
    document.getElementById('outputPlaceholder').style.display = 'none';
    document.getElementById('outputImgWrap').style.display = 'block';
    document.getElementById('loadingOverlay').style.display = 'none';
    var img = document.getElementById('outputImg');
    img.src = ev.target.result;
    img.style.display = 'block';
    document.getElementById('outputActions').style.display = 'flex';
    document.getElementById('downloadBtn').disabled = true;
    currentImageUrl = '';
  };
  reader.readAsDataURL(file);
});

// Drag
var uploadZone = document.getElementById('uploadZone');
uploadZone.addEventListener('dragover', function(e) { e.preventDefault(); this.classList.add('drag'); });
uploadZone.addEventListener('dragleave', function() { this.classList.remove('drag'); });
uploadZone.addEventListener('drop', function(e) {
  e.preventDefault();
  this.classList.remove('drag');
  var file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    document.getElementById('uploadInput').files = e.dataTransfer.files;
    document.getElementById('uploadInput').dispatchEvent(new Event('change'));
  }
});

function showError(msg) {
  var el = document.getElementById('errorToast');
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(function() { el.style.display = 'none'; }, 5000);
}

function setGenerating(state) {
  isGenerating = state;
  var btn = document.getElementById('generateBtn');
  var spinner = document.getElementById('spinner');
  var btnText = document.getElementById('btnText');
  btn.disabled = state;
  spinner.style.display = state ? 'block' : 'none';
  btnText.textContent = state ? 'Generating...' : 'Generate Image';
}

var STYLE_CONFIG = {
  'realistic':    { model: 'flux-realism',  suffix: 'photorealistic, real photograph, DSLR, 8K, sharp focus, natural lighting' },
  'cinematic':    { model: 'flux-realism',  suffix: 'cinematic film still, movie photography, dramatic lighting, 8K, color graded' },
  'anime':        { model: 'flux-anime',    suffix: 'anime illustration, vibrant colors, detailed linework, manga style' },
  '3d-render':    { model: 'flux-3d',       suffix: '3D render, octane render, studio lighting, high poly, ray tracing' },
  'illustration': { model: 'flux',          suffix: 'digital illustration, concept art, vibrant colors, highly detailed' },
  'watercolor':   { model: 'flux',          suffix: 'watercolor painting, soft brushwork, artistic, transparent washes' },
  'digital-art':  { model: 'flux',          suffix: 'digital art, concept art, highly detailed, professional' },
  'oil-paint':    { model: 'flux',          suffix: 'oil painting, canvas texture, classical fine art, rich brushstrokes' },
  'cyberpunk':    { model: 'any-dark',      suffix: 'cyberpunk, neon lights, futuristic, rain reflections, dark atmosphere' }
};

var DEFAULT_NEGATIVE = 'blurry, low quality, distorted, deformed, bad anatomy, watermark, text overlay, signature, worst quality, low resolution, duplicate, mutilated, disfigured';

function generateImage() {
  if (isGenerating) return;
  var prompt = document.getElementById('promptInput').value.trim();
  var negative = document.getElementById('negativeInput').value.trim();
  if (!prompt) { showError('Please describe what you want to generate.'); document.getElementById('promptInput').focus(); return; }

  document.getElementById('errorToast').style.display = 'none';
  setGenerating(true);

  var config = STYLE_CONFIG[selectedStyle] || STYLE_CONFIG['realistic'];
  var finalPrompt = prompt + ', ' + config.suffix;
  var finalNegative = DEFAULT_NEGATIVE + (negative ? ', ' + negative : '');

  var url = 'https://image.pollinations.ai/prompt/' + encodeURIComponent(finalPrompt)
    + '?width=' + selectedW
    + '&height=' + selectedH
    + '&model=' + config.model
    + '&negative_prompt=' + encodeURIComponent(finalNegative)
    + '&nologo=true'
    + '&seed=' + Math.floor(Math.random() * 999999);
  currentImageUrl = url;

  document.getElementById('outputPlaceholder').style.display = 'none';
  document.getElementById('outputImgWrap').style.display = 'block';
  document.getElementById('loadingOverlay').style.display = 'flex';
  document.getElementById('outputActions').style.display = 'none';
  document.getElementById('outputMeta').style.display = 'none';

  var img = document.getElementById('outputImg');
  img.style.display = 'none';
  img.src = '';

  img.onload = function() {
    document.getElementById('loadingOverlay').style.display = 'none';
    img.style.display = 'block';
    document.getElementById('outputActions').style.display = 'flex';
    document.getElementById('downloadBtn').disabled = false;
    document.getElementById('outputMeta').style.display = 'block';
    document.getElementById('outputMeta').textContent = selectedW + ' × ' + selectedH + 'px  •  Style: ' + selectedStyle + '  •  Powered by Pollinations AI';
    setGenerating(false);
  };
  img.onerror = function() {
    document.getElementById('loadingOverlay').style.display = 'none';
    document.getElementById('outputImgWrap').style.display = 'none';
    document.getElementById('outputPlaceholder').style.display = 'flex';
    showError('Generation failed. The API may be busy — please try again in a moment.');
    setGenerating(false);
    currentImageUrl = '';
  };

  img.src = url;
}

function downloadImage() {
  if (!currentImageUrl) return;
  fetch(currentImageUrl)
    .then(function(r) { return r.blob(); })
    .then(function(blob) {
      var blobUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'ai-image-' + Date.now() + '.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(blobUrl); }, 1000);
    })
    .catch(function() {
      // Fallback: open in new tab
      window.open(currentImageUrl, '_blank');
    });
}

function openInTab() {
  if (currentImageUrl) window.open(currentImageUrl, '_blank');
}

function useExample(prompt, style) {
  document.getElementById('promptInput').value = prompt;
  document.getElementById('charCount').textContent = prompt.length;
  document.querySelectorAll('.style-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.style === style);
  });
  selectedStyle = style;
  document.getElementById('promptInput').scrollIntoView({ behavior: 'smooth', block: 'center' });
  generateImage();
}

// Keyboard shortcut: Ctrl+Enter to generate
document.getElementById('promptInput').addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') generateImage();
});


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

