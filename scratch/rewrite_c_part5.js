const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');
const existingScript = fs.readFileSync(path.join(__dirname, 'build_c_phase11_12_massive.js'), 'utf8');

const curriculumMatch = existingScript.match(/const C_CURRICULUM = (\[[\s\S]*?\]);\n\nfunction generateCAccordionSidebar/);
let C_CURRICULUM;
if (curriculumMatch) {
    C_CURRICULUM = eval(curriculumMatch[1]);
}

function generateCAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;
  C_CURRICULUM.forEach(phase => {
    const hasActive = phase.lessons.some(l => l.file === currentFile);
    const isOpen = hasActive || (currentFile === null && phase.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';

    html += `      <!-- ${phase.tag}: ${phase.title} -->\n`;
    html += `      <button class="accordion-header${activeHeaderClass}" onclick="toggleAccordion(this)">\n`;
    html += `        <div class="accordion-header-main">\n`;
    html += `          <span class="phase-icon-box">${phase.icon}</span>\n`;
    html += `          <div class="phase-info">\n`;
    html += `            <span class="phase-tag">${phase.tag}</span>\n`;
    html += `            <span class="phase-title">${phase.title}</span>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `        <div class="accordion-header-meta">\n`;
    html += `          <span class="phase-count-badge">${phase.lessons.length} Ch</span>\n`;
    html += `          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n`;
    html += `            <polyline points="9 18 15 12 9 6"></polyline>\n`;
    html += `          </svg>\n`;
    html += `        </div>\n`;
    html += `      </button>\n`;
    html += `      <div class="accordion-content${openContentClass}">\n`;

    phase.lessons.forEach(l => {
      const isActive = l.file === currentFile ? ' class="active"' : '';
      html += `        <a href="/blog-c/${l.file}"${isActive}>${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });
  html += `    </div>\n`;
  return html;
}

function wrapCPage(title, desc, filename, currentNum, phaseTag, phaseTitle, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateCAccordionSidebar(filename);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — C Master Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  <style>
    .prose-paragraph {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      line-height: 1.9;
      color: var(--text);
      margin-bottom: 20px;
      text-align: justify;
    }
    .prose-highlight {
      color: #10b981;
      font-weight: 600;
    }
    .story-box {
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border-radius: 12px;
      padding: 24px;
      border-left: 5px solid #3b82f6;
      margin: 30px 0;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .story-box-title {
      font-family: 'Sora', sans-serif;
      font-size: 18px;
      color: #60a5fa;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .faq-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin: 24px 0;
    }
    .faq-item {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-left: 4px solid #f59e0b;
      border-radius: 8px;
      padding: 20px 22px;
    }
    .faq-item h4 {
      color: var(--text);
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .faq-item p {
      color: var(--text2);
      font-size: 15px;
      line-height: 1.8;
      margin: 0;
    }
  </style>
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'light';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          const updateText = () => {
            const isLight = document.body.classList.contains('light-theme');
            toggleBtn.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
          };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;
          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);
          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_c', codeEl.textContent);
              window.location.href = '/?lang=c';
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-c">
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html" class="active">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>
<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">C Master Course</div>
    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>
${accordionSidebar}
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Programming</a><span class="sep">›</span>
      <span class="current">Lesson ${currentNum}: ${title}</span>
    </div>
    <h1 class="page-title">${title}</h1>
    <div class="page-meta">
      <span class="badge">⚡ C (C17 / C23 Standard)</span>
      <span class="badge">🟢 Lesson ${currentNum}</span>
      <span class="badge">📂 ${phaseTag}: ${phaseTitle}</span>
      <span class="badge">📅 2026 Comprehensive Master Edition</span>
    </div>
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this in-depth guide:</span>
      <span>${subtopics}</span>
    </div>
${contentBody}
    <div class="nav-footer">
      ${prevFile ? `
      <a href="${prevFile}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevTitle}</span>
      </a>` : `
      <a href="/blog-c.html" class="nav-btn">
        <span class="label">← C Course Overview</span>
        <span class="title">Course Home & Index</span>
      </a>`}
      ${nextFile ? `
      <a href="${nextFile}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextTitle}</span>
      </a>` : `
      <a href="/blog-c.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Index →</span>
        <span class="title">C Master Index</span>
      </a>`}
    </div>
  </main>
</div>
  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ==========================================
// LESSON 10: Functions Basics
// ==========================================
function buildLesson10() {
  const title = "Functions Basics: Modular Programming (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Functions ఎందుకు అవసరం? ఒక పెద్ద ప్రోగ్రామ్ ని చిన్న చిన్న ముక్కలుగా (Modules) ఎలా విడగొట్టాలి? రియల్ లైఫ్ ఎగ్జాంపుల్స్ తో ఫంక్షన్స్ ని చాలా డీప్ గా నేర్చుకుందాం.";
  const filename = "10-c-functions-modular-programming-and-reusability.html";
  const subtopics = "Functions ఎందుకు వాడాలి? · Function Declaration & Definition · Arguments మరియు Return Type";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక ఇల్లు కట్టాలంటే ఒక్కడే కూలీ మొత్తం పని చేయలేడు కదా! ఒకడు ఇటుకలు పేర్చాలి, ఇంకొకడు సిమెంట్ కలపాలి, మరొకడు ఎలక్ట్రిక్ పనులు చేయాలి. ఎవరి పని వాళ్ళు కరెక్ట్ గా చేస్తేనే ఒక ఇల్లు తయారవుతుంది. సాఫ్ట్‌వేర్ డెవలప్‌మెంట్ కూడా సేమ్ టు సేమ్! ఒక లక్ష లైన్ల కోడ్ ని <code>main()</code> ఫంక్షన్ లోనే రాస్తే, రేపు ఏదైనా ఎర్రర్ వస్తే ఎక్కడ వచ్చిందో వెతుక్కోవడం నరకంగా మారుతుంది. అందుకే మనం పెద్ద కోడ్ ని చిన్న చిన్న ముక్కలుగా విడగొడతాం. ఆ ముక్కలనే <strong>Functions (ఫంక్షన్స్)</strong> అంటారు.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ఫంక్షన్స్ అంటే ఏమిటి? ఎందుకు వాడాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఫంక్షన్ అనేది ఒక చిన్న "మిషన్ (Machine)" లాంటిది. మీరు దానికి కొంత ముడిసరుకు (Inputs) ఇస్తారు. అది ఆ ముడిసరుకుని ప్రాసెస్ చేసి, మీకు కావాల్సిన అవుట్పుట్ (Result) ని ఇస్తుంది. 
      </p>

      <div class="story-box">
        <div class="story-box-title">☕ రియల్ లైఫ్ స్టోరీ: కాఫీ మిషన్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఆఫీస్ లో ఉన్న కాఫీ మిషన్ ని ఊహించుకోండి. <br><br>
          <strong>Input (ఆప్షన్స్):</strong> మీరు కాఫీ పౌడర్, వేడి పాలు, పంచదార వేస్తారు. ఇవే మన ప్రోగ్రామింగ్ పరిభాషలో <strong>Arguments (ఆర్గుమెంట్స్)</strong>. <br>
          <strong>Processing (పని):</strong> ఆ మిషన్ లోపల అదంతా కలిసి ఒక ఫార్ములా ప్రకారం మిక్స్ అవుతుంది. ఇదే మన <strong>Function Body</strong>. <br>
          <strong>Output (ఫలితం):</strong> చివరికి మీకు వేడి వేడి కాఫీ కప్పులో వస్తుంది. ఇదే మన <strong>Return value</strong>. <br><br>
          మీరు కాఫీ తాగాలి అనుకున్న ప్రతిసారి ఆ మిషన్ ఎలా పనిచేస్తుందో మీరు తెలుసుకోవాల్సిన అవసరం లేదు. జస్ట్ బటన్ నొక్కితే చాలు (Function Call). ఇది కోడ్ ని <em>Re-usable</em> (మళ్ళీ మళ్ళీ వాడుకునేలా) చేస్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఫంక్షన్ ని రాయడం ఎలా? (Syntax)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక కొత్త ఫంక్షన్ ని క్రియేట్ చేయడానికి మూడు స్టెప్స్ ఉంటాయి:
      </p>
      <ul style="color: var(--text); font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.9; margin-bottom: 20px;">
        <li><strong>Declaration (డిక్లరేషన్):</strong> కంపైలర్ కి "నేను ఒక కొత్త ఫంక్షన్ క్రియేట్ చేయబోతున్నాను" అని ముందుగా చెప్పడం.</li>
        <li><strong>Definition (డెఫినిషన్):</strong> ఆ ఫంక్షన్ లోపల ఏం జరగాలో అసలు కోడ్ రాయడం.</li>
        <li><strong>Call (కాలింగ్):</strong> మన <code>main()</code> లోపల నుండి ఆ ఫంక్షన్ ని పిలవడం (వాడుకోవడం).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Function Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Function Definition (ఇక్కడ రెండు నంబర్స్ ని ఇన్పుట్ గా తీసుకుంటున్నాం)
int add_numbers(int a, int b) {
    int sum = a + b;
    return sum; // ఆన్సర్ ని వెనక్కి పంపిస్తున్నాం
}

int main(void) {
    // 2. Function Call (మిషన్ బటన్ నొక్కడం)
    int result = add_numbers(5, 10);
    
    printf("The sum is: %d\\n", result);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఒక ఫంక్షన్ ఏమీ రిటర్న్ చేయకపోతే ఏమంటారు?</h4>
          <p>ఏమీ రిటర్న్ చేయని ఫంక్షన్స్ కి ముందు <code>void</code> (వాయిడ్) అనే కీవర్డ్ పెడతాం. అంటే ఈ మిషన్ ఏ అవుట్పుట్ ని బయటకు ఇవ్వదు, జస్ట్ లోపలపని చేసుకుని ఆగిపోతుంది (ఉదాహరణకి స్క్రీన్ పై ప్రింట్ చేసి ఆగిపోయే ఫంక్షన్స్).</p>
        </div>
        <div class="faq-item">
          <h4>Q: <code>main()</code> కూడా ఒక ఫంక్షనేనా?</h4>
          <p>అవును! C లాంగ్వేజ్ లో <code>main()</code> అనేది బాస్ ఫంక్షన్. ఆపరేటింగ్ సిస్టమ్ మన ప్రోగ్రామ్ ని రన్ చేసినప్పుడు, అది వెతికే మొదటి ఫంక్షన్ <code>main()</code> మాత్రమే. అది లేకపోతే ప్రోగ్రామ్ స్టార్ట్ అవ్వదు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 10, "Phase 06", "Functions & Modular Programming", subtopics, contentBody, '09-c-break-and-continue-statements-in-loops.html', '9. Break & Continue', '11-c-function-parameters-return-values-and-scope.html', '11. Scope & Lifecycle');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

// ==========================================
// LESSON 11: Scope & Lifecycle
// ==========================================
function buildLesson11() {
  const title = "Variables Scope & Lifecycle in C (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Local Variables మరియు Global Variables మధ్య తేడా ఏంటి? ఒక ఫంక్షన్ లో క్రియేట్ చేసిన వేరియబుల్ ఇంకో ఫంక్షన్ కి ఎందుకు కనిపించదు? డీప్ థియరీతో నేర్చుకుందాం.";
  const filename = "11-c-function-parameters-return-values-and-scope.html";
  const subtopics = "Local Scope · Global Scope · Block Scope · Variable Lifecycle";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు వేరియబుల్స్ అంటే డేటా దాచుకునే డబ్బాలు (Boxes) అని నేర్చుకున్నాం. అయితే మీరు ఎప్పుడైనా ఆలోచించారా? ఒక వేరియబుల్ ని క్రియేట్ చేసిన తర్వాత అది ఎంతసేపు బ్రతికి ఉంటుంది? దాన్ని సిస్టమ్ లో ఎవరెవరు చూడగలరు? ఎవరెవరు మోడిఫై చేయగలరు? ఈ కాన్సెప్ట్ నే ప్రోగ్రామింగ్ లో <strong>Scope (స్కోప్)</strong> మరియు <strong>Lifecycle (జీవితకాలం)</strong> అంటారు. బగ్స్ లేకుండా కోడ్ రాయాలంటే ఈ కాన్సెప్ట్ పై మీకు అద్భుతమైన పట్టు ఉండాలి.</p>
    </div>

    <div class="section-title"><span class="num">1</span> లోకల్ స్కోప్ (Local Scope) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక <code>{}</code> బ్రాకెట్స్ (Block) లోపల క్రియేట్ చేసిన వేరియబుల్ ని <strong>Local Variable</strong> అంటారు. దానికి ఆ బ్రాకెట్స్ లోపల మాత్రమే పవర్ ఉంటుంది. బయట వాళ్ళకు అసలు అలాంటి ఒక వేరియబుల్ ఉందన్న విషయం కూడా తెలియదు.
      </p>

      <div class="story-box">
        <div class="story-box-title">🏠 రియల్ లైఫ్ స్టోరీ: ఇంట్లో ఉన్న టీవీ (TV)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీ ఇంట్లో ఒక కొత్త టీవీ కొన్నారు. ఆ టీవీ ని ఎవరు చూడగలరు? కేవలం మీ ఇంట్లో (లోకల్ గా) ఉన్నవాళ్లు మాత్రమే చూడగలరు. పక్కింటి వాళ్ళు వచ్చి మీ టీవీ ఛానల్ మార్చలేరు కదా! <br><br>
          ప్రోగ్రామింగ్ లో కూడా అంతే. మీరు <code>calculate_tax()</code> అనే ఫంక్షన్ లోపల <code>int tax = 10;</code> అని రాస్తే, దాన్ని <code>main()</code> ఫంక్షన్ లో ఉన్న కోడ్ వాడలేరు. అది కేవలం ఆ ఫంక్షన్ వరకు మాత్రమే పరిమితం. ఫంక్షన్ పని పూర్తి అవ్వగానే ఆ వేరియబుల్ మెమరీ లోంచి డిలీట్ అయిపోతుంది (చనిపోతుంది).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> గ్లోబల్ స్కోప్ (Global Scope) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఫంక్షన్స్ అన్నీటికీ పైన (అంటే ప్రోగ్రామ్ స్టార్టింగ్ లో) క్రియేట్ చేసే వేరియబుల్స్ ని <strong>Global Variables</strong> అంటారు. వీటికి ప్రోగ్రామ్ ఎండ్ అయ్యేంత వరకు జీవితకాలం (Lifecycle) ఉంటుంది. వీటిని ఏ ఫంక్షన్ అయినా చూడొచ్చు, వాడుకోవచ్చు, మోడిఫై చేయొచ్చు.
      </p>
      
      <p class="prose-paragraph">
        ఇది అచ్చం మీ వీధిలో ఉన్న <strong>పబ్లిక్ పార్క్ (Public Park)</strong> లాంటిది. వీధిలో ఉన్న ఎవరైనా సరే ఆ పార్క్ లోకి వెళ్లొచ్చు, ఆడుకోవచ్చు. కానీ గ్లోబల్ వేరియబుల్స్ ని ఎక్కువగా వాడకూడదు అని సీనియర్ డెవలపర్స్ చెప్తారు. ఎందుకంటే, ఏ ఫంక్షన్ వచ్చి ఎప్పుడు ఆ డేటాని మారుస్తుందో ట్రాక్ చేయడం కష్టం అవుతుంది (దీనివల్ల బగ్స్ వస్తాయి).
      </p>
    </div>

    <!-- FAQ Section -->
    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఒకే పేరుతో Local మరియు Global వేరియబుల్స్ ఉండొచ్చా?</h4>
          <p>ఉండొచ్చు! ఒకవేళ <code>int x = 10;</code> అనే గ్లోబల్ వేరియబుల్ ఉండి, మీ ఫంక్షన్ లో కూడా <code>int x = 20;</code> అని లోకల్ గా ఉంటే, అప్పుడు సిస్టమ్ ఎప్పుడూ లోకల్ వేరియబుల్ కే (20 కే) మొదటి ప్రాధాన్యత ఇస్తుంది. దీన్నే <strong>Variable Shadowing</strong> అంటారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: Static Variables అంటే ఏమిటి?</h4>
          <p>ఇది ఒక స్పెషల్ రకం. ఇవి లోకల్ గా ఒక ఫంక్షన్ లోనే ఉంటాయి, కానీ ఫంక్షన్ అవ్వగానే చనిపోవు! నెక్స్ట్ టైం ఫంక్షన్ ని మళ్ళీ పిలిచినప్పుడు పాత వాల్యూ ని అలాగే గుర్తుపెట్టుకుంటాయి. ఉదాహరణకు ఒక వెబ్సైట్ లో విజిటర్ కౌంటర్ (ఎంతమంది చూశారు) అని ట్రాక్ చేయడానికి ఇవి వాడతారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 11, "Phase 06", "Functions & Modular Programming", subtopics, contentBody, '10-c-functions-modular-programming-and-reusability.html', '10. Functions Basics', '12-c-arrays-declaration-memory-and-traversal.html', '12. Arrays Basics');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

function run() {
  buildLesson10();
  buildLesson11();
}
run();
