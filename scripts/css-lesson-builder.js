/** Builds rich CSS lesson HTML matching Python-style lesson format */
const ACCENT = '#3b82f6';

function codeBlock(lang, code, tryEditor = true) {
  const tryBtn = tryEditor ? `<a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a>` : '';
  return `<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang}</span>${tryBtn}</div><pre><code>${code}</code></pre></div>`;
}

function propCard(props) {
  const items = props.map(p => `<li><code>${p.prop}</code> — ${p.desc}</li>`).join('\n            ');
  return `<div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin-top:12px;font-size:13.5px;">
    <strong style="color:${ACCENT};">🔍 Property-by-Property Explanation:</strong>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">${items}</ul>
  </div>`;
}

function mistakesList(items) {
  return `<div class="callout"><div class="callout-title">⚠️ Common Mistakes</div><ul style="margin:8px 0 0 18px;line-height:1.7;">${items.map(m => `<li>${m}</li>`).join('')}</ul></div>`;
}

function quizCards(questions) {
  return questions.map((q, i) => `<div class="faq-card"><h4>Q${i + 1}: ${q.q}</h4><p>${q.a}</p></div>`).join('\n    ');
}

function richLesson(o) {
  return `
<div class="section-title"><span class="num">1</span>Introduction</div>
<div class="section-body"><p>${o.intro}</p></div>

<div class="section-title"><span class="num">2</span>What You Will Learn</div>
<div class="section-body"><ul>${o.learn.map(l => `<li>${l}</li>`).join('')}</ul></div>

<div class="section-title"><span class="num">3</span>Why This Concept Is Useful</div>
<div class="section-body"><p>${o.why}</p>${o.whyExtra || ''}</div>

<div class="section-title"><span class="num">4</span>Required HTML Structure</div>
<div class="section-body">${codeBlock('HTML', o.html)}</div>

<div class="section-title"><span class="num">5</span>CSS Syntax Overview</div>
<div class="section-body"><p>${o.syntaxIntro || 'Below is the core CSS for this lesson. Copy into your stylesheet or HTML editor.'}</p>${o.syntaxExtra ? codeBlock('CSS', o.syntaxExtra) : ''}</div>

<div class="section-title"><span class="num">6</span>Basic Example</div>
<div class="section-body">${codeBlock('CSS', o.css)}</div>

<div class="section-title"><span class="num">7</span>Expected Browser Output</div>
<div class="section-body"><p>${o.output}</p></div>

<div class="section-title"><span class="num">8</span>Property-by-Property Explanation</div>
<div class="section-body">${propCard(o.properties)}</div>

<div class="section-title"><span class="num">9</span>Responsive Example</div>
<div class="section-body"><p>${o.responsiveIntro || 'Adapt styles for smaller screens using media queries or fluid values.'}</p>${codeBlock('CSS', o.responsiveCss)}</div>

<div class="section-title"><span class="num">10</span>Practical UI Example</div>
<div class="section-body"><p>${o.practicalIntro || 'Complete real-world snippet combining HTML structure and CSS styling.'}</p>${o.practicalHtml ? codeBlock('HTML', o.practicalHtml) : ''}${codeBlock('CSS', o.practicalCss)}</div>

<div class="section-title"><span class="num">11</span>Common Mistakes</div>
<div class="section-body">${mistakesList(o.mistakes)}</div>

<div class="section-title"><span class="num">12</span>Coding Challenge</div>
<div class="section-body">
  <div class="try-box"><div class="try-title">💻 Hands-on Challenge</div><p>${o.challenge}</p>${codeBlock('CSS — Starter', o.challengeStarter || '/* Your styles here */')}</div>
</div>

<div class="section-title"><span class="num">13</span>Mini Quiz</div>
<div class="section-body">${quizCards(o.quiz)}</div>

<div class="section-title"><span class="num">14</span>Quick Recap</div>
<div class="section-body"><ul>${o.recap.map(r => `<li>${r}</li>`).join('')}</ul></div>`;
}

module.exports = { richLesson, codeBlock, ACCENT };
