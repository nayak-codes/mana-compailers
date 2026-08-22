// Rich lesson section builders — Python-style deep CSS lessons
function codeBlock(lang, code, tryEditor = true) {
  const tryBtn = tryEditor ? '<a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a>' : '';
  return `<div class="code-block">
    <div class="code-block-header"><span class="lang-tag">${lang}</span>${tryBtn}</div>
    <pre><code>${code}</code></pre>
  </div>`;
}

function propTable(rows) {
  const trs = rows.map(([prop, desc]) => `<tr><td><code>${prop}</code></td><td>${desc}</td></tr>`).join('\n');
  return `<table class="tbl spec-table"><thead><tr><th>Property / Selector</th><th>Explanation</th></tr></thead><tbody>${trs}</tbody></table>`;
}

function learnBox(items) {
  return `<div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:16px 20px;margin-bottom:24px;">
    <strong style="color:#3b82f6;display:block;margin-bottom:10px;">📚 What You Will Learn</strong>
    <ul style="margin:0 0 0 20px;line-height:1.8;">${items.map(i => `<li>${i}</li>`).join('')}</ul>
  </div>`;
}

function whyBox(text) {
  return `<div class="callout" style="margin-bottom:24px;">
    <div class="callout-title">💡 Why This Matters</div>
    <p>${text}</p>
  </div>`;
}

function mistakes(items) {
  return `<div class="callout">
    <div class="callout-title">⚠️ Common Mistakes</div>
    <ul style="margin:8px 0 0 18px;line-height:1.7;">${items.map(i => `<li>${i}</li>`).join('')}</ul>
  </div>`;
}

function challenge(title, html, css, hint) {
  return `<div class="try-box">
    <div class="try-title">💻 Coding Challenge — ${title}</div>
    <p>${hint}</p>
    ${codeBlock('HTML', html)}
    ${codeBlock('CSS', css)}
    <a class="run-btn" href="/online-html-editor.html">Open in HTML/CSS Editor →</a>
  </div>`;
}

function quiz(questions) {
  const cards = questions.map((q, i) => `
    <div class="faq-card">
      <h4><span style="background:rgba(59,130,246,0.15);color:#3b82f6;padding:2px 8px;border-radius:4px;font-size:12px;margin-right:6px;">Q${i + 1}</span> ${q.q}</h4>
      <p>${q.a}</p>
    </div>`).join('\n');
  return `<div class="section-title"><span class="num">❓</span> Mini Quiz</div>
    <div class="section-body">${cards}</div>`;
}

function recap(items) {
  return `<div class="section-title"><span class="num">✅</span> Quick Recap</div>
    <div class="section-body">
      <ul style="line-height:1.8;margin-left:20px;">${items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>`;
}

function outputBox(text) {
  return `<div class="card" style="background:var(--bg2);padding:16px;border-radius:8px;margin:16px 0;font-size:13.5px;border-left:4px solid #3b82f6;">
    <strong style="color:#3b82f6;">🖥️ Expected Browser Output:</strong>
    <p style="margin-top:8px;color:var(--text2);">${text}</p>
  </div>`;
}

module.exports = { codeBlock, propTable, learnBox, whyBox, mistakes, challenge, quiz, recap, outputBox };
