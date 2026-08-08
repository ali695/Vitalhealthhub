/* Extracted from calculators/text-counter.html so the site can drop 'unsafe-inline' from script-src. Edit this file, not the HTML. */
window._vhCalcFn=function () {
    var text = document.getElementById('text').value; if (!text.trim()) { alert('Enter some text'); return; } var words = (text.trim().match(/\S+/g) || []).length; var characters = Array.from(text).length; var charactersNoSpace = Array.from(text.replace(/\s/gu, '')).length; var sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter(function (item) { return item.trim(); }).length; var paragraphs = text.split(/\n\s*\n|\n+/).filter(function (item) { return item.trim(); }).length;
    showResult('result', words + ' words', 'Text statistics', 'Characters: ' + characters + ' | Without whitespace: ' + charactersNoSpace + ' | Sentences: ' + sentences + ' | Paragraphs: ' + paragraphs + ' | Reading time at 200 wpm: ' + Math.max(1, Math.ceil(words / 200)) + ' min.', 'green');
  };
