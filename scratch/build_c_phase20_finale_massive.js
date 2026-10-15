const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

const C_CURRICULUM = [
  {
    id: 'phase20', tag: 'Phase 20', title: 'Algorithms & Final', icon: '🚀',
    lessons: [
      { num: 60, file: '60-c-searching-linear-and-binary-search.html', title: '60. Linear & Binary Search' },
      { num: 61, file: '61-c-sorting-1-bubble-selection-insertion.html', title: '61. Sorting (Bubble, Selection, Insertion)' },
      { num: 62, file: '62-c-sorting-2-merge-sort-quick-sort.html', title: '62. Sorting (Merge & Quick Sort)' },
      { num: 63, file: '63-c-dynamic-programming-basics.html', title: '63. Dynamic Programming Basics' },
      { num: 64, file: '64-c-system-calls-basics-fork-exec-wait.html', title: '64. System Calls (fork, exec, wait)' },
      { num: 65, file: '65-c-building-a-mini-c-project.html', title: '65. C Master Project & Conclusion' }
    ]
  }
];

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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, dynamic programming c, system calls c, fork exec wait, final project c" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <style>
    .concept-box {
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-left: 4px solid #10b981;
      border-radius: 8px;
      padding: 22px 26px;
      margin: 24px 0;
    }
    .concept-box h4 {
      color: #10b981;
      margin-bottom: 10px;
      font-size: 16.5px;
      font-weight: 700;
    }
    .concept-box p {
      color: var(--text2);
      font-size: 15px;
      line-height: 1.8;
      margin: 0 0 10px 0;
    }
    .concept-box p:last-child {
      margin-bottom: 0;
    }
    .memory-diagram {
      background: #0f141c;
      border: 1px solid #27303f;
      border-radius: 10px;
      padding: 22px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13.5px;
      color: #38bdf8;
      line-height: 1.85;
      margin: 24px 0;
      overflow-x: auto;
      white-space: pre;
    }
    .spec-table th {
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
      font-size: 14.5px;
    }
    .deep-dive-card {
      background: #141922;
      border: 1px solid #27303f;
      border-radius: 10px;
      padding: 24px;
      margin: 26px 0;
    }
    .deep-dive-card h3 {
      color: #10b981;
      font-size: 17.5px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
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
      border-left: 4px solid #10b981;
      border-radius: 8px;
      padding: 20px 22px;
    }
    .faq-item h4 {
      color: var(--text);
      font-size: 15.5px;
      margin-bottom: 8px;
      font-weight: 700;
    }
    .faq-item p {
      color: var(--text2);
      font-size: 14.5px;
      line-height: 1.75;
      margin: 0;
    }
    .text-prose {
      font-size: 15.5px;
      line-height: 1.85;
      color: var(--text);
      margin-bottom: 18px;
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

<!-- TOP LANGUAGE BAR -->
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
  <!-- LEFT SIDEBAR WITH ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">C Master Course</div>
    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (51 Lessons)</a>
    <a href="/blog-javascript.html">JavaScript Course (19 Lessons)</a>
  </aside>

  <!-- MAIN CONTENT -->
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

    <!-- Subtopics Pill Bar -->
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

function buildLesson63() {
  const title = "Dynamic Programming (DP) Basics (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో పెద్ద పెద్ద ప్రాబ్లమ్స్ ని సాల్వ్ చేసే బ్రహ్మాస్త్రం! Dynamic Programming (డైనమిక్ ప్రోగ్రామింగ్) అంటే ఏంటి? ఇప్పటికే చేసిన పనిని మళ్ళీ చేయకుండా ఎలా గుర్తుపెట్టుకోవాలో (Memoization) పక్కా రియల్ లైఫ్ ఎగ్జాంపుల్ తో చూద్దాం.";
  const filename = "63-c-dynamic-programming-basics.html";
  const subtopics = "Recursion vs DP · Memoization (Top-down) · Tabulation (Bottom-up) · Fibonacci DP";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలుగా మనం Recursion (రికర్షన్) వాడి ప్రాబ్లమ్స్ సాల్వ్ చేస్తాం. కానీ రికర్షన్ లో ఒక పెద్ద ప్రాబ్లమ్ ఉంది! ఒకసారి చేసిన లెక్కనే, అది పిచ్చోడిలాగా మళ్ళీ మళ్ళీ చేస్తూనే ఉంటుంది. దీనివల్ల టైమ్ వేస్ట్ అయిపోయి 40వ నంబర్ కనుక్కోవడానికే గంటల టైమ్ పడుతుంది. ఇక్కడే <strong>Dynamic Programming (DP)</strong> అనే అద్భుతమైన కాన్సెప్ట్ వస్తుంది. "ఒకసారి ఆన్సర్ కనుక్కున్నాక, దాన్ని ఒక బుక్ లో రాసుకుని గుర్తుపెట్టుకో, మళ్ళీ చేయొద్దు" అని చెప్పేదే డైనమిక్ ప్రోగ్రామింగ్. గూగుల్ మ్యాప్స్ లో రూట్స్ కనుక్కోవాలన్నా ఈ DP నే వాడతారు. అదెలాగో ఈరోజు ఫిబొనాచీ (Fibonacci) సిరీస్ తో చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> రికర్షన్ లో ఉన్న పిచ్చితనం (Overlapping Subproblems)</div>
    <div class="section-body">
      <p class="text-prose">
        ఫిబొనాచీ (Fibonacci) అంటే ముందు రెండు నంబర్స్ ని కలిపితే నెక్స్ట్ నంబర్ వస్తుంది (0, 1, 1, 2, 3, 5, 8...). దీనికి <code>fib(n) = fib(n-1) + fib(n-2)</code> అని ఫార్ములా వాడి రికర్షన్ రాస్తాం.
      </p>
      
      <div class="deep-dive-card">
        <h3>🧠 రియల్ లైఫ్ స్టోరీ: ఒకే లెక్క మళ్ళీ మళ్ళీ...</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక చిన్న పిల్లాడిని పిలిచి "బాబు 2+2 ఎంత?" అని అడిగారు. వాడు వేళ్ల మీద లెక్కపెట్టి "4" అని చెప్పాడు. ఆ తర్వాత వెంటనే "బాబు 2+2+1 ఎంత?" అని అడిగారు. వాడు ఏం చేయాలి? "ఇందాకే 4 అన్నావు కదా, దానికి 1 కలిపితే 5" అని టక్కున చెప్పాలి (ఇదే <strong>Dynamic Programming</strong>).<br><br>
          కానీ ఆ పిల్లాడు పిచ్చోడైతే ఏం చేస్తాడు? మళ్ళీ మొదటినుండి "1, 2, 3, 4.. దానికి ఇంకో 1 కలిపితే 5" అని మొత్తం లెక్క పెడతాడు! (ఇదే నార్మల్ <strong>Recursion</strong>). రికర్షన్ ట్రీ లో పాత లెక్కలని మర్చిపోయి మళ్ళీ చేయడం వల్ల <code>fib(50)</code> కనుక్కోవడానికి సంవత్సరాల టైమ్ పడుతుంది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> DP లో రెండు పద్ధతులు (Memoization & Tabulation)</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>1. మెమోయిజేషన్ (Memoization / Top-Down):</strong> ఇది రికర్షన్ కి ఒక మెమరీ (అర్రే) ని తగిలిస్తుంది. ఒకసారి లెక్క కనుక్కోగానే దాన్ని నోట్ బుక్ (Array) లో రాసుకుంటాం. మళ్ళీ ఆ లెక్క వచ్చినప్పుడు, ఆన్సర్ నోట్ బుక్ లో ఉంటే డైరెక్ట్ గా ఇచ్చేస్తాం, లేకపోతేనే లెక్క చేస్తాం!
      </p>
      <p class="text-prose">
        <strong>2. ట్యాబులేషన్ (Tabulation / Bottom-Up):</strong> ఇది అసలు రికర్షన్ కే పోదు. డైరెక్ట్ గా ఒక ఫర్ లూప్ (for loop) వేసుకుని, కింద నుండి (0 నుండి) లెక్క చేసుకుంటూ పైకి వస్తుంది. ఇది ఇంకా చాలా ఫాస్ట్!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Fibonacci with DP)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో నార్మల్ రికర్షన్ కి, DP కి మధ్య స్పీడ్ డిఫరెన్స్ ఎలా ఉందో చూడండి. <code>memo</code> అనే ఒక చిన్న అర్రే యాడ్ చేస్తే చాలు, కోడ్ రాకెట్ లాగా దూసుకెళ్తుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Dynamic Programming (Memoization)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// మనం ఒక నోట్ బుక్ (అర్రే) తయారుచేద్దాం (మ్యాక్స్ 100 దాకా)
// మొదట్లో అన్నీ -1 తో నింపుదాం (అంటే ఏ ఆన్సర్ తెలీదని అర్థం)
int memo[100];

// మామూలు రికర్షన్ (స్లో) - అర్థం చేసుకోవడానికి మాత్రమే!
int fibSlow(int n) {
    if (n <= 1) return n;
    return fibSlow(n - 1) + fibSlow(n - 2);
}

// డైనమిక్ ప్రోగ్రామింగ్ రికర్షన్ (సూపర్ ఫాస్ట్!)
long long fibDP(int n) {
    if (n <= 1) return n;
    
    // ఆన్సర్ కోసం నోట్ బుక్ చెక్ చేద్దాం! 
    // -1 కాకుండా వేరే నంబర్ ఉందంటే, ఆన్సర్ ఆల్రెడీ చేసేసినట్టే!
    if (memo[n] != -1) {
        return memo[n]; // డైరెక్ట్ గా ఆన్సర్ ఇచ్చేయ్ (టైమ్ సేవ్)
    }
    
    // ఒకవేళ ఆన్సర్ లేకపోతే, అప్పుడు లెక్క చేసి నోట్ బుక్ లో రాయి
    memo[n] = fibDP(n - 1) + fibDP(n - 2);
    
    return memo[n]; // రాసిన దాన్ని రిటర్న్ చేయి
}

int main() {
    printf("--- Dynamic Programming (DP) ---\\n\\n");
    
    // నోట్ బుక్ అంతా -1 (ఖాళీ) చేద్దాం
    for (int i = 0; i < 100; i++) {
        memo[i] = -1;
    }
    
    int num = 45; // 45 వ నంబర్ కనుక్కోవాలి
    
    // [గమనిక: fibSlow(45) రన్ చేస్తే మీ కంప్యూటర్ దాదాపు 10 సెకన్లు ఫ్రీజ్ అవుతుంది]
    // printf("Slow Recursive Answer: %d\\n", fibSlow(num)); 
    
    // కానీ DP వాడితే... 0.0001 సెకనులో ఆన్సర్ వస్తుంది!
    printf("DP Fast Answer for fib(%d) : %lld\\n", num, fibDP(num));
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>memo[100]</code>: ఇది గ్లోబల్ అర్రే. ఇందులో ఇండెక్స్ అంటే <code>n</code>. (ఉదాహరణకు 5వ ఫిబొనాచీ నంబర్ వాల్యూ 5 అనుకుంటే, అది <code>memo[5] = 5</code> అని సేవ్ అవుతుంది).</li>
        <li><code>if (memo[n] != -1) return memo[n];</code>: ఇదే DP కి గుండెకాయ! రికర్షన్ కిందికి వెళ్లేముందు ఇక్కడ బ్రేక్ పడుతుంది. ఆన్సర్ దొరికితే వెంటనే వెనక్కి వచ్చేస్తుంది (O(1) టైమ్). దీనివల్ల <code>fib(40)</code> లాంటివి మళ్ళీ క్యాలిక్యులేట్ అయ్యే పనే లేదు!</li>
        <li><code>memo[n] = ...</code>: ఆన్సర్ కనుక్కున్నాక, దాన్ని నెక్స్ట్ టైమ్ కోసం సేవ్ చేసి పెట్టుకుంటుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: DP కి Time Complexity (టైమ్) ఎంత?</h4>
          <p>నార్మల్ రికర్షన్ కి O(2^N) పడుతుంది (అంటే n=50 ఇస్తే కోట్లు టైమ్ పడుతుంది). కానీ DP కి కేవలం <strong>O(N)</strong> పడుతుంది! అంటే మీరు n=50 ఇస్తే కేవలం 50 సార్లు మాత్రమే లెక్క చేసి పడేస్తుంది. దట్స్ ద పవర్ ఆఫ్ DP!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: DP ఎక్కడ పడితే అక్కడ వాడొచ్చా?</h4>
          <p>వాడలేం! దీనికి రెండు రూల్స్ ఉన్నాయి. 1. <strong>Overlapping Subproblems:</strong> పాత లెక్కలే మళ్ళీ మళ్ళీ రిపీట్ అవ్వాలి (ఇప్పుడు చూసింది). 2. <strong>Optimal Substructure:</strong> ఒక పెద్ద ప్రాబ్లమ్ ని చిన్న ముక్కలుగా చేసి, ఆ చిన్న ఆన్సర్స్ కలిపితే పెద్ద ఆన్సర్ రావాలి. ఈ రెండు ఉంటేనే DP పనిచేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Knapsack Problem (బ్యాగ్ లో వస్తువులు నింపడం) ఏంటి?</h4>
          <p>అది ప్రపంచంలో అత్యంత ఫేమస్ DP క్వశ్చన్! ఒక దొంగ దగ్గర 10 కేజీలు పట్టే సంచి ఉంది. ఇంట్లో 5 వస్తువులు ఉన్నాయి (వాటి బరువు, రేటు వేరువేరుగా ఉంటాయి). ఏయే వస్తువులు పెట్టుకుంటే వాడికి ఎక్కువ డబ్బులు వస్తాయి? దీన్ని కూడా ఒక 2D అర్రే (Tabulation DP) వాడి సెకనులో సాల్వ్ చేసేస్తారు. గూగుల్ ఇంటర్వ్యూస్ లో ఇవి పక్కా అడుగుతారు!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 63, "Phase 20", "Algorithms & Final", subtopics, contentBody, '62-c-sorting-2-merge-sort-quick-sort.html', '62. Sorting (Merge/Quick)', '64-c-system-calls-basics-fork-exec-wait.html', '64. System Calls');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson64() {
  const title = "System Calls (fork, exec, wait) (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ తో డైరెక్ట్ గా ఆపరేటింగ్ సిస్టమ్ (OS) తో ఎలా మాట్లాడాలి? ఒక యాప్ రన్ అవుతుండగానే దాన్ని డూప్లికేట్ (fork) చేసి, అందులో నుండి ఇంకో యాప్ ని (exec) ఎలా ఓపెన్ చేయాలో ఈ సిస్టమ్ ప్రోగ్రామింగ్ బేసిక్స్ లో చూద్దాం.";
  const filename = "64-c-system-calls-basics-fork-exec-wait.html";
  const subtopics = "System Calls Basics · fork() for Child Process · exec() Family · wait() Status";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలుగా మనం రాసే <code>printf</code>, <code>scanf</code> ఇవన్నీ ఒక లైబ్రరీ లో ఉన్న ఫంక్షన్స్ మాత్రమే. కానీ అవి మీ కీబోర్డ్ నుండి డేటా ఎలా తెస్తున్నాయి? డైరెక్ట్ గా ఆపరేటింగ్ సిస్టమ్ (OS - విండోస్ లేదా లైనక్స్) ని పర్మిషన్ అడుగుతాయి. దాన్నే <strong>System Call (సిస్టమ్ కాల్)</strong> అంటారు. C లాంగ్వేజ్ అనేది సిస్టమ్ ప్రోగ్రామింగ్ కి రారాజు! ఒక ప్రాసెస్ (App) రన్ అవుతుండగానే దాన్ని రెండుగా చీల్చడం (fork), లేదా ఒక ప్రాసెస్ ని చంపి ఆ ప్లేస్ లో ఇంకో యాప్ ని ఓపెన్ చేయడం (exec) లాంటివి C తో ఎలా చేయాలో ఈరోజు డీప్ గా నేర్చుకుందాం. <em>గమనిక: ఈ ఫంక్షన్స్ అన్నీ POSIX (Linux/Mac) సిస్టమ్స్ కే బాగా పనిచేస్తాయి.</em></p>
    </div>

    <div class="section-title"><span class="num">1</span> సిస్టమ్ కాల్ అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        మీ కోడ్ (User Mode) లో రన్ అవుతుంది. కానీ RAM, హార్డ్ డిస్క్, ప్రాసెసర్స్ అన్నీ OS (Kernel Mode) కంట్రోల్ లో ఉంటాయి. మీరు ఒక ఫైల్ ఓపెన్ చేయాలన్నా, ఇంటర్నెట్ కి కనెక్ట్ అవ్వాలన్నా, డైరెక్ట్ గా వెళ్ళలేరు. ఒక గేట్ (System Call) గుండా పర్మిషన్ అడిగి వెళ్ళాలి.
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> మాయా అస్త్రాలు: <code>fork()</code> మరియు <code>exec()</code></div>
    <div class="section-body">
      <div class="deep-dive-card">
        <h3>🧬 రియల్ లైఫ్ స్టోరీ: ఒక మనిషి రెండు అవ్వడం (Amoeba)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          <strong>1. <code>fork()</code> - క్లోనింగ్ మ్యాజిక్:</strong> ఒక ప్రోగ్రామ్ రన్ అవుతుండగా <code>fork()</code> అని పిలవగానే, అమీబా లాగా ఆ ప్రోగ్రామ్ రెండు ముక్కలు అయిపోతుంది! ఒరిజినల్ దాన్ని <strong>Parent Process</strong> అని, కొత్తదాన్ని <strong>Child Process</strong> అని అంటారు. రెండూ ఒకే కోడ్ ని ఒకేసారి (ప్యారలల్ గా) నెక్స్ట్ లైన్ నుండి రన్ చేస్తాయి!<br><br>
          <strong>2. <code>exec()</code> - ఆత్మ మారడం:</strong> ఆ పుట్టిన చైల్డ్ ప్రాసెస్ ఏం చేస్తుందంటే, "నాకు ఈ పాత కోడ్ వద్దు" అని చెప్పి, ఆ ప్లేస్ లోకి వేరే ప్రోగ్రామ్ (ఉదా: క్రోమ్ బ్రౌజర్) ని లోడ్ చేస్తుంది (<code>exec</code>). అంటే కోడ్ ఆత్మ మారుతుందన్నమాట!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Fork Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>fork()</code> వాడి ఒకే కోడ్ ని రెండుగా విడగొట్టి, ఎవరు పేరెంట్, ఎవరు చైల్డ్ అని ఎలా కనుక్కున్నామో చూడండి. (విండోస్ లో ఇది నేటివ్ గా పనిచేయదు, Linux ఆన్లైన్ కంపైలర్ వాడండి).
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — fork() System Call (Linux)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;   // fork() కోసం
#include &lt;sys/wait.h&gt; // wait() కోసం

int main() {
    printf("--- Welcome to System Calls ---\\n");
    printf("[Main] I am the single parent process.\\n\\n");
    
    // 1. మ్యాజిక్! ఇక్కడ కోడ్ రెండుగా చీలిపోతుంది
    pid_t pid = fork();
    
    if (pid < 0) {
        printf("Fork Failed!\\n");
    } 
    else if (pid == 0) {
        // ఇది కేవలం చైల్డ్ (కొత్త ప్రాసెస్) లో మాత్రమే రన్ అవుతుంది!
        // ఎందుకంటే చైల్డ్ కి ఎప్పుడూ pid = 0 ఇస్తుంది OS.
        printf("  -> [Child] Hello! I was just born! (My PID is 0)\\n");
        printf("  -> [Child] I am doing my homework...\\n");
        // చైల్డ్ పని అయిపోయాక ఎగ్జిట్ అవుతుంది
    } 
    else {
        // ఇది కేవలం పేరెంట్ (పాత ప్రాసెస్) లో మాత్రమే రన్ అవుతుంది!
        // పేరెంట్ కి తన చైల్డ్ యొక్క ఒరిజినల్ ఐడీ వస్తుంది.
        printf("[Parent] I just created a child! (Child ID: %d)\\n", pid);
        
        // 2. చైల్డ్ పని పూర్తయ్యేదాకా పేరెంట్ వెయిట్ చేయాలి
        printf("[Parent] Waiting for child to finish...\\n");
        wait(NULL); // చైల్డ్ ఆత్మహత్య (exit) చేసుకునే దాకా హోల్డ్!
        
        printf("[Parent] Child finished its job. Now I can exit.\\n");
    }
    
    // గమనిక: ఇక్కడ ఉన్న లాస్ట్ లైన్ ఇద్దరికీ కామన్ గా రన్ అవుతుంది
    printf("--- Code execution finished! ---\\n");
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>fork()</code>: ఈ లైన్ పిలవగానే, OS ఈ మొత్తం యాప్ కి ఒక డూప్లికేట్ క్లోన్ (Clone) ని సృష్టిస్తుంది. ఇప్పటినుండి పేరెంట్, చైల్డ్ ఇద్దరూ విడివిడిగా (Parallel గా) కింద లైన్స్ ని ఎగ్జిక్యూట్ చేస్తారు.</li>
        <li><code>if (pid == 0)</code>: మరి ఆ రన్ అయ్యేది నేనా లేక నా క్లోన్ ఆ అని తెలుసుకోవడం ఎలా? OS ఒక ట్రిక్ పెట్టింది. చైల్డ్ లో <code>pid</code> వాల్యూ 0 ఉంటుంది. పేరెంట్ లో <code>pid</code> వాల్యూ చైల్డ్ యొక్క రియల్ ఐడీ (ఉదా: 3456) ఉంటుంది. దీన్ని బట్టి ఇఫ్-ఎల్స్ (if-else) లో రెండు వేరువేరు పనులు చేస్తాం!</li>
        <li><code>wait(NULL)</code>: ఒకవేళ పేరెంట్ వెయిట్ చేయకుండా చనిపోతే (exit), అప్పుడు ఆ చైల్డ్ అనాధ అయిపోతాడు! దాన్నే <strong>Orphan Process</strong> అంటారు. అలా కాకుండా చైల్డ్ చనిపోయాక పేరెంట్ దాన్ని క్లీన్ చేయకపోతే దాన్ని <strong>Zombie Process</strong> అంటారు! అందుకే వెయిట్ కచ్చితంగా వాడాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>fork()</code> కి, Threads (pthreads) కి తేడా ఏంటి?</h4>
          <p>చాలా డిఫరెన్స్ ఉంది! త్రెడ్స్ అంటే ఒకే ఇంట్లో ఉన్న ఇద్దరు మనుషులు లాంటి వాళ్ళు (వాళ్ళిద్దరూ ఒకే మెమరీ ని షేర్ చేసుకుంటారు, ఒకడు వేరియబుల్ మారిస్తే ఇంకొకడికి కనబడుతుంది). కానీ <code>fork</code> అంటే పక్కిల్లు! చైల్డ్ కి సపరేట్ మెమరీ కాపీ వస్తుంది. వాడు వేరియబుల్ మారిస్తే పేరెంట్ కి అసలు కనబడదు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: టెర్మినల్ (Command Prompt) ఎలా పనిచేస్తుంది?</h4>
          <p>మీరు టెర్మినల్ లో <code>ls</code> అని కమాండ్ టైప్ చేయగానే ఏం జరుగుతుందో తెలుసా? టెర్మినల్ యాప్ తనని తాను <code>fork()</code> చేసుకుని ఒక చైల్డ్ ని పుట్టిస్తుంది. ఆ చైల్డ్ ఏం చేస్తుందంటే <code>exec("ls")</code> అని పిలుస్తుంది. అప్పుడు ఆ చైల్డ్ కాస్తా <code>ls</code> ప్రోగ్రామ్ గా మారిపోయి అవుట్పుట్ ఇస్తుంది. పేరెంట్ అయిన టెర్మినల్ <code>wait()</code> చేస్తూ ఉంటుంది. అదీ మ్యాజిక్!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>fork()</code> ని ఒక లూప్ లో 3 సార్లు (<code>for(i=0;i<3) fork();</code>) పిలిస్తే ఏమవుతుంది?</h4>
          <p>ఇది ఒక క్లాసిక్ C పజిల్! ఫస్ట్ ఒక పేరెంట్ ఉంటుంది, వాడు ఒక చైల్డ్ ని కంటాడు (మొత్తం 2). నెక్స్ట్ లూప్ లో ఆ ఇద్దరూ తలా ఒకరిని కంటారు (మొత్తం 4). మూడో లూప్ లో ఆ నలుగురూ తలా ఒకరిని కంటారు (మొత్తం 8). సో టోటల్ ప్రాసెస్ లు 2^3 = 8 రన్ అవుతాయి (ఒక పేరెంట్ + 7 చిల్డ్రన్)!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 64, "Phase 20", "Algorithms & Final", subtopics, contentBody, '63-c-dynamic-programming-basics.html', '63. Dynamic Programming', '65-c-building-a-mini-c-project.html', '65. C Master Conclusion');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson65() {
  const title = "C Master Project & Conclusion (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ కోర్సు (C Master Class) ముగింపు! ఇప్పటివరకు మనం నేర్చుకున్న కాన్సెప్ట్స్ (File Handling, Pointers, Structs, Date) అన్నిటిని కలిపి ఒక రియల్ వరల్డ్ ప్రాజెక్ట్ (Bank Management System) ని ఎలా డిజైన్ చేయాలో చూద్దాం. ఇక మీ పయనం ఎటు?";
  const filename = "65-c-building-a-mini-c-project.html";
  const subtopics = "Bank Management System · Full Project Code · What's Next? · Course Conclusion";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు మనం 64 లెసన్స్ లో C లాంగ్వేజ్ యొక్క బేసిక్స్, పాయింటర్స్, ఫైల్స్ నుండి మొదలుకుని... కంపైలర్ ఎలా పనిచేస్తుంది, డేటా స్ట్రక్చర్స్, సిస్టమ్ కాల్స్ వరకు అన్నీ విపరీతమైన డెప్త్ లో నేర్చుకున్నాం! కానీ ఇవన్నీ వేరువేరు ముక్కలు (Lego blocks). ఈ ముక్కలన్నీ కలిపి ఒక ప్రాజెక్ట్ గట్టితే గానీ మీకు అసలైన కిక్ రాదు. అందుకే ఈ లాస్ట్ లెసన్ లో మనం <strong>Bank Management System (బ్యాంక్ మేనేజ్మెంట్ సిస్టమ్)</strong> అనే ఒక సింపుల్ కన్సోల్ (Terminal) అప్లికేషన్ ని ఎలా తయారు చేయాలో నేర్చుకుందాం. దీంట్లో Structs తో డేటాని దాచడం, File Handling తో డేటాని సేవ్ చేయడం లాంటివన్నీ వాడతాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ప్రాజెక్ట్ లో ఏమేమి ఉంటాయి? (Features)</div>
    <div class="section-body">
      <p class="text-prose">
        ఈ చిన్న బ్యాంకు సాఫ్ట్వేర్ లో కింది ఫీచర్స్ ఉంటాయి:
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>క్రొత్త అకౌంట్ ఓపెన్ చేయడం:</strong> కస్టమర్ పేరు, డిపాజిట్ అమౌంట్ అడగడం.</li>
        <li><strong>బ్యాలెన్స్ చెక్ చేయడం:</strong> అకౌంట్ నంబర్ ఇస్తే, సిస్టమ్ లో వెతికి చెప్పడం.</li>
        <li><strong>డేటాని హార్డ్-డిస్క్ లో సేవ్ చేయడం:</strong> యాప్ క్లోజ్ చేసినా కూడా డేటా పోకుండా ఒక Text File (<code>bank_data.txt</code>) లో సేవ్ అయ్యుండాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span> ప్రాజెక్ట్ ఫుల్ కోడ్ (Bank Management in C)</div>
    <div class="section-body">
      <p class="text-prose">
        ఈ కోడ్ ని మీ లోకల్ VS Code లో కాపీ చేసి రన్ చేయండి. ఆన్లైన్ కంపైలర్స్ లో ఫైల్ సిస్టమ్ పని చేయకపోవచ్చు కాబట్టి లోకల్ గా రన్ చేయడం బెస్ట్.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Final Project (Bank System)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

// 1. కస్టమర్ డేటా స్టోర్ చేసుకోవడానికి బ్లూప్రింట్
struct Account {
    int acc_no;
    char name[50];
    float balance;
};

// క్రొత్త అకౌంట్ క్రియేట్ చేసి ఫైల్ లో రాసే ఫంక్షన్
void createAccount() {
    struct Account acc;
    FILE *file;
    
    // a+ (Append Mode) లో ఫైల్ ఓపెన్ చేద్దాం
    file = fopen("bank_data.txt", "a+");
    if (file == NULL) {
        printf("Error: Cannot open database file!\\n");
        return;
    }
    
    printf("\\n--- Open New Account ---\\n");
    printf("Enter Account Number : ");
    scanf("%d", &acc.acc_no);
    
    // స్పేస్ లతో సహా పేరు తీసుకోవడానికి ట్రిక్
    printf("Enter Customer Name  : ");
    getchar(); // పాత enter (newline) ని క్లియర్ చేయడానికి
    fgets(acc.name, sizeof(acc.name), stdin);
    acc.name[strcspn(acc.name, "\\n")] = 0; // లాస్ట్ లో పడే ఎంటర్ కీ ని తీసేయడం
    
    printf("Enter Initial Deposit: ₹");
    scanf("%f", &acc.balance);
    
    // డేటాని ఫైల్ లోకి రైట్ చేద్దాం (ఫార్మాట్ గా)
    fprintf(file, "%d,%s,%.2f\\n", acc.acc_no, acc.name, acc.balance);
    fclose(file);
    
    printf("[Success] Account Created Successfully!\\n");
}

// అకౌంట్ నంబర్ తో వెతికే ఫంక్షన్
void searchAccount() {
    struct Account acc;
    FILE *file;
    int search_acc, found = 0;
    
    file = fopen("bank_data.txt", "r");
    if (file == NULL) {
        printf("Database is Empty! Create an account first.\\n");
        return;
    }
    
    printf("\\n--- Search Account ---\\n");
    printf("Enter Account Number to Search: ");
    scanf("%d", &search_acc);
    
    // ఫైల్ లో ప్రతి లైన్ ని చదివి అందులో మన అకౌంట్ ఉందా అని చూద్దాం
    // "%d,%49[^,],%f" అనే ఫార్మాట్ వాడి కామా (,) తో డేటాని విడదీసి చదువుతాం
    while (fscanf(file, "%d,%49[^,],%f", &acc.acc_no, acc.name, &acc.balance) == 3) {
        if (acc.acc_no == search_acc) {
            printf("\\n--- Account Details ---\\n");
            printf("A/C No  : %d\\n", acc.acc_no);
            printf("Name    : %s\\n", acc.name);
            printf("Balance : ₹%.2f\\n", acc.balance);
            found = 1;
            break;
        }
    }
    
    if (found == 0) {
        printf("Error: Account Number not found!\\n");
    }
    fclose(file);
}

// మెయిన్ మెనూ లూప్
int main() {
    int choice;
    
    printf("=========================================\\n");
    printf("       WELCOME TO OUR COMPILER BANK      \\n");
    printf("=========================================\\n");
    
    while (1) {
        printf("\\n[1]. Create New Account\\n");
        printf("[2]. Check Balance\\n");
        printf("[3]. Exit System\\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1: createAccount(); break;
            case 2: searchAccount(); break;
            case 3: 
                printf("Thank you for using our Bank. Goodbye!\\n");
                return 0; // ప్రోగ్రామ్ క్లోజ్
            default:
                printf("Invalid Choice! Please enter 1, 2 or 3.\\n");
        }
    }
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (The Architecture)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>while(1) (ఇన్ఫినిట్ లూప్):</strong> మెయిన్ ఫంక్షన్ లో యాప్ వెంటనే క్లోజ్ అవ్వకుండా, మనం కీబోర్డ్ లో <code>3 (Exit)</code> నొక్కేదాకా మెనూ చూపిస్తూనే ఉండాలి కదా! అందుకే ఈ లూప్ వాడాం.</li>
        <li><strong>File Operations:</strong> <code>fopen(..., "a+")</code> అంటే అపెండ్ (Append) మోడ్. అంటే పాత కస్టమర్స్ డేటా డిలీట్ అవ్వదు, ఆ ఫైల్ కిందనే కొత్త లైన్ లో నెక్స్ట్ కస్టమర్ డేటా సేవ్ అవుతుంది. డేటాబేస్ (MySQL) లేనప్పుడు ఇలా టెక్స్ట్ ఫైల్స్ నే డేటాబేస్ లాగా వాడొచ్చు.</li>
        <li><strong>fscanf Regex:</strong> <code>%49[^,]</code> అంటే ఏంటి? కామా (,) వచ్చేంత వరకు అక్షరాలని చదువు (Scan) అని కంపైలర్ కి స్పెషల్ లాజిక్ చెప్తున్నాం. (అంటే కస్టమర్ పేరు ని సపరేట్ చేయడానికి వాడే ట్రిక్ ఇది).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> వాట్ నెక్స్ట్? (ఇక మీ పయనం ఎటు?)</div>
    <div class="section-body">
      <div class="deep-dive-card">
        <h3>🚀 C నేర్చుకున్నాక నెక్స్ట్ ఏం నేర్చుకోవాలి?</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          C లాంగ్వేజ్ అనేది అన్ని మోడరన్ లాంగ్వేజెస్ కి అమ్మ లాంటిది. మీకు C లో పాయింటర్స్, మెమరీ మేనేజ్మెంట్ అర్థమైతే, ఇక ప్రపంచంలో ఏ లాంగ్వేజ్ అయినా 10 రోజుల్లో నేర్చేసుకోవచ్చు. <br><br>
          <strong>1. ఆబ్జెక్ట్ ఓరియెంటెడ్ (OOP):</strong> C++ లేదా Java నేర్చుకోండి. C లో ఉన్న Structs కి ఫంక్షన్స్ కూడా కలిపితే అదే Class (క్లాస్) అవుతుంది. పెద్ద ప్రాజెక్ట్స్ కి అది వాడుతారు.<br>
          <strong>2. ఎంబెడెడ్ సిస్టమ్స్ (Hardware):</strong> ఎలక్ట్రానిక్స్ (Arduino, Raspberry Pi, IoT) మీద ఆసక్తి ఉంటే <em>Embedded C</em> వైపు వెళ్లండి.<br>
          <strong>3. ఆపరేటింగ్ సిస్టమ్స్:</strong> లైనక్స్ కెర్నల్ (Linux Kernel) సోర్స్ కోడ్ ని డౌన్లోడ్ చేసి చదవడం అలవాటు చేసుకోండి. సిస్టమ్ ప్రోగ్రామింగ్ కి మీరే దేవుడు అవుతారు.
        </p>
      </div>
    </div>
    
    <div style="background:#10b981; color:#000; padding:20px; border-radius:10px; text-align:center; margin-top:40px;">
        <h2 style="margin:0; font-size:24px; font-weight:800;">🎉 కంగ్రాచ్యులేషన్స్! 🎉</h2>
        <p style="margin:10px 0 0 0; font-weight:600; font-size:16px;">మీరు విజయవంతంగా "C మాస్టర్" కోర్సును పూర్తి చేసారు! ఈ జర్నీ మీకు ఎంతో నాలెడ్జ్ ఇచ్చిందని ఆశిస్తున్నాం. - From "Our Compiler" Team.</p>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 65, "Phase 20", "Algorithms & Final", subtopics, contentBody, '64-c-system-calls-basics-fork-exec-wait.html', '64. System Calls', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}


function run() {
  buildLesson63();
  buildLesson64();
  buildLesson65();
  console.log("✅ Generated C Lessons 63 to 65 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
  console.log("🎉 C MASTER COURSE IS COMPLETELY FINISHED! 🎉");
}
run();
