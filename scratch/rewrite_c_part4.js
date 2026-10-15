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
// LESSON 8: Loops & Iterations
// ==========================================
function buildLesson8() {
  const title = "Loops & Iterations: while, do-while, for (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Loops ఎందుకు వాడతాం? while, do-while మరియు for లూప్స్ మధ్య ఉన్న ప్రధానమైన తేడాలు ఏమిటి? రియల్ లైఫ్ ఎగ్జాంపుల్స్ మరియు ఎనాలిసిస్ తో డీప్ గా నేర్చుకుందాం.";
  const filename = "08-c-loops-and-iterations-while-do-while-for.html";
  const subtopics = "లూప్స్ అవసరం ఏంటి? · Entry Control vs Exit Control · for లూప్ నిర్మాణం";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్లకు ఉన్న అతి పెద్ద బలం ఏమిటంటే... ఒకే పనిని విసుగు లేకుండా వేలసార్లు, లక్షలసార్లు చేయగలగడం. మనుషులమైన మనం ఒకే మాటను వందసార్లు రాయాలంటే బోర్ గా ఫీల్ అవుతాం. కానీ సిస్టమ్ కి ఆ ప్రాబ్లెమ్ లేదు. ఈ విధంగా ఒకే పనిని మళ్ళీ మళ్ళీ చేయడాన్ని ప్రోగ్రామింగ్ లో <strong>Looping (లూపింగ్)</strong> లేదా <strong>Iteration (ఇటరేషన్)</strong> అంటారు. ఈ పాఠంలో లూప్స్ ఎన్ని రకాలు ఉన్నాయి, వాటిని రియల్ టైం ప్రాజెక్ట్స్ లో ఎప్పుడు, ఎక్కడ వాడాలో చాలా లోతుగా విశ్లేషిద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు లూప్స్ ఎందుకు? (Why do we need Loops?)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక చిన్న ఉదాహరణ తీసుకుందాం. మీరు స్క్రీన్ పైన మీ పేరును 5 సార్లు ప్రింట్ చేయాలి. అప్పుడు మీరు <code>printf</code> ని 5 సార్లు రాస్తారు. ఒకవేళ 1000 సార్లు ప్రింట్ చేయాలంటే? 1000 లైన్ల కోడ్ రాసుకుంటూ కూర్చోవడం అసాధ్యం. దానికి టైమ్ వేస్ట్, ఎనర్జీ వేస్ట్, మెమరీ వేస్ట్. 
      </p>
      <p class="prose-paragraph">
        ఈ సమస్యను పరిష్కరించడానికే C లాంగ్వేజ్ మనకి లూప్స్ ని పరిచయం చేసింది. లూప్ అంటే ఒక వృత్తం. మీరు కండిషన్ పెట్టి "నా పేరుని 1000 సార్లు తిప్పు" అని చెప్తే, సిస్టమ్ ఒకే లైన్ ని 1000 సార్లు ఎగ్జిక్యూట్ చేసి ఆ తర్వాతే బయటకు వస్తుంది. 
      </p>

      <div class="story-box">
        <div class="story-box-title">🔄 రియల్ లైఫ్ స్టోరీ: రన్నింగ్ ట్రాక్ లో అథ్లెట్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక కోచ్ తన స్టూడెంట్ ని "ఈ గ్రౌండ్ చుట్టూ 10 రౌండ్లు కొట్టు" అని చెప్పాడు. స్టూడెంట్ ఏం చేస్తాడు? ప్రతి రౌండ్ పూర్తి అవ్వగానే "ఇది నా ఒకటో రౌండ్, ఇది రెండో రౌండ్..." అని మనసులో లెక్క పెట్టుకుంటూ ఉంటాడు. ఎప్పుడైతే 10 రౌండ్లు పూర్తవుతాయో, అప్పుడు ఆగిపోతాడు. <br><br>
          ఇక్కడ <strong>రౌండ్ కొట్టడం = పని (Execution)</strong>. <br>
          <strong>లెక్క పెట్టుకోవడం = కండిషన్ (Condition checking)</strong>. <br>
          <strong>10 అవ్వగానే ఆగడం = టర్మినేషన్ (Termination)</strong>. లూప్స్ సరిగ్గా ఇదే కాన్సెప్ట్ తో పనిచేస్తాయి!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Entry Control vs Exit Control Loops</div>
    <div class="section-body">
      <p class="prose-paragraph">
        C లాంగ్వేజ్ లో లూప్స్ ని ప్రధానంగా రెండు రకాలుగా వర్గీకరిస్తారు. ఒకటి గేట్ ముందే చెక్ చేసేవి, ఇంకొకటి గేట్ దాటిన తర్వాత చెక్ చేసేవి.
      </p>
      
      <p class="prose-paragraph">
        <strong>1. while లూప్ (Entry Control):</strong> ఇది థియేటర్ లోకి వెళ్లేటప్పుడు టికెట్ చెక్ చేసినట్టు. కండిషన్ నిజమైతేనే (True అయితేనే) అసలు లూప్ లోపలికి వెళ్తుంది. కండిషన్ ఫాల్స్ అయితే ఒక్కసారి కూడా రన్ అవ్వదు.
      </p>
      <p class="prose-paragraph">
        <strong>2. do-while లూప్ (Exit Control):</strong> ఇది రెస్టారెంట్ లో భోజనం చేసినట్టు. ముందు లోపలికి వెళ్లి కోడ్ రన్ చేసేస్తుంది (తింటుంది), ఆ తర్వాత బయటికి వచ్చేటప్పుడు కండిషన్ చెక్ చేస్తుంది (బిల్లు కడుతుంది). అంటే కండిషన్ ఫాల్స్ అయినా కూడా కనీసం ఒక్కసారైనా కోడ్ పక్కాగా రన్ అవుతుంది!
      </p>
      <p class="prose-paragraph">
        <strong>3. for లూప్:</strong> ఇది అడ్వాన్స్డ్ <code>while</code> లూప్ లాంటిది. ఒక పనిని కచ్చితంగా "ఇన్ని సార్లు" (ఉదాహరణకు కచ్చితంగా 10 సార్లు) చేయాలని మీకు ముందుగానే తెలిస్తే, <code>for</code> లూప్ ని వాడటం బెస్ట్ ప్రాక్టీస్. 
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒక చిన్న ఉదాహరణ: 1 నుండి 5 వరకు ప్రింట్ చేయడం</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మనం <code>for</code> లూప్ వాడి నంబర్స్ ని ప్రింట్ చేద్దాం. ఇందులో మూడు భాగాలు ఉంటాయి: 1) ఇనిషియలైజేషన్ (ఎక్కడి నుండి మొదలవ్వాలి?), 2) కండిషన్ (ఎంత వరకు వెళ్ళాలి?), 3) ఇంక్రిమెంట్ (ఒక్కో అడుగు ఎలా వెయ్యాలి?).
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — for loop Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 1 నుండి మొదలు, 5 కంటే తక్కువ లేదా సమానం అయ్యేంత వరకు, 1 పెంచుకుంటూ వెళ్ళు
    for (int i = 1; i <= 5; i++) {
        printf("Current number is: %d\\n", i);
    }
    
    printf("Loop completed successfully!\\n");
    return 0;
}</code></pre>
      </div>
      <p class="prose-paragraph">
        మీరు పై కోడ్ చూస్తే, <code>i</code> అనే వేరియబుల్ 1 తో మొదలైంది. లూప్ లోపల ప్రింట్ అయ్యింది. ఆ తర్వాత <code>i++</code> వల్ల అది 2 అవుతుంది. మళ్ళీ కండిషన్ చెక్ చేస్తుంది (2 <= 5 కరెక్టే కదా). మళ్ళీ ప్రింట్ చేస్తుంది. అలా 5 అయిన తర్వాత, 6 అవ్వగానే కండిషన్ ఫెయిల్ అయ్యి బయటకు వచ్చేస్తుంది.
      </p>
    </div>

    <!-- FAQ Section for Extra Content and SEO -->
    <div class="section-title"><span class="num">4</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: do-while ని నిజ జీవిత ప్రాజెక్టులలో ఎక్కడ వాడతారు?</h4>
          <p>చాలాసార్లు మెనూ-బేస్డ్ ప్రోగ్రామ్స్ లో దీన్ని వాడుతారు. ఉదాహరణకు, ఒక గేమ్ లో ముందు యూజర్ కి "Play" ఆప్షన్ ఇస్తాం. గేమ్ ఆడిన తర్వాత "డూ యు వాంట్ టు ప్లే అగైన్ (Do you want to play again?)" అని అడుగుతాం. అంటే ముందు గేమ్ రన్ అవ్వాలి, ఆ తర్వాతే యూజర్ ని కండిషన్ అడగాలి. ఇలాంటి చోట్ల do-while అద్భుతంగా సెట్ అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ఇన్ఫినిట్ లూప్ (Infinite Loop) అంటే ఏమిటి?</h4>
          <p>లూప్ అనేది ఎప్పటికీ ఆగకుండా (కండిషన్ ఎప్పుడూ True అవుతూనే ఉంటే) రన్ అవుతూనే ఉంటే దాన్ని ఇన్ఫినిట్ లూప్ అంటారు. ఉదాహరణకు కండిషన్ ప్లేస్ లో <code>while(1)</code> అని రాస్తే అది ఎప్పటికీ ఆగదు. సర్వర్లు ఎప్పటికీ రన్ అవ్వడానికి, విండోస్ లో క్లాక్ (Clock) ఎప్పుడూ నడవడానికి ఇలాంటి ఇన్ఫినిట్ లూప్స్ నే వాడతారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 8, "Phase 05", "Loops & Iterations", subtopics, contentBody, '07-c-switch-case-statement-and-menu-driven-logic.html', '7. Switch Case & Menu Logic', '09-c-break-and-continue-statements-in-loops.html', '9. Break & Continue');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

// ==========================================
// LESSON 9: Break & Continue
// ==========================================
function buildLesson9() {
  const title = "Break & Continue in C Loops (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లూప్స్ లో వాడుకునే break మరియు continue కీవర్డ్స్ అంటే ఏమిటి? లూప్ ని మధ్యలో ఆపేయాలన్నా, ఒక స్టెప్ ని వదిలేయాలన్నా వీటిని ఎలా వాడాలో ఉదాహరణలతో నేర్చుకుందాం.";
  const filename = "09-c-break-and-continue-statements-in-loops.html";
  const subtopics = "Break స్టేట్‌మెంట్ · Continue కీవర్డ్ · రియల్ వరల్డ్ యూజ్ కేసులు";

  const contentBody = `
    <div class="intro-box">
      <p>మనం పాత పాఠంలో లూప్స్ ఎలా పనిచేస్తాయో, ఎందుకు వాడాలో చూశాం. అయితే లూప్ స్టార్ట్ అయిన తర్వాత కండిషన్ ఫాల్స్ అయ్యేదాకా అది ఆగదు అని తెలుసుకున్నాం. కానీ రియల్ లైఫ్ లో మనకి మధ్యలోనే కొన్ని స్పెషల్ పరిస్థితులు ఎదురవ్వొచ్చు. ఒక పర్టికులర్ పరిస్థితి రాగానే మొత్తం లూప్ ని క్యాన్సిల్ చేయాల్సి రావచ్చు, లేదా ఆ ఒక్క రౌండ్ ని స్కిప్ చేయాల్సి రావచ్చు. ఇందుకోసం C లాంగ్వేజ్ మనకి రెండు ఆయుధాలను ఇచ్చింది: <strong>break</strong> మరియు <strong>continue</strong>. వీటి గురించి డీప్ గా చర్చిద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Break (బ్రేక్): ఎమర్జెన్సీ స్టాప్!</div>
    <div class="section-body">
      <p class="prose-paragraph">
        పేరులోనే ఉన్నట్టు <strong>break</strong> అంటే బద్దలుకొట్టుకుని బయటకు రావడం. లూప్ రన్ అవుతున్నప్పుడు, కంపైలర్ కి ఎక్కడైనా <code>break;</code> కనిపిస్తే, అప్పటి వరకు లూప్ లో ఏం జరుగుతున్నా సరే, కండిషన్ తో సంబంధం లేకుండా లూప్ మొత్తాన్ని చంపేసి (కిల్ చేసి) బయటకు వచ్చేస్తుంది. 
      </p>

      <div class="story-box">
        <div class="story-box-title">🛑 రియల్ లైఫ్ స్టోరీ: దొంగల వేట</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          పోలీసులు ఒక వీధిలో ఉన్న 100 ఇళ్లలో ఒక దొంగ దాక్కున్నాడు అని వెతకడం మొదలుపెట్టారు. ఇది ఒక <code>for</code> లూప్ అనుకుందాం (1 నుండి 100 వరకు). <br><br>
          వాళ్ళు 1వ ఇల్లు వెతికారు దొంగ లేడు. 2వ ఇల్లు వెతికారు లేడు. 3వ ఇంట్లో దొంగ దొరికాడు అనుకుందాం. అప్పుడు వాళ్ళు మిగతా 97 ఇళ్లను కూడా వెతుకుతారా? వెతకరు కదా! దొంగ దొరికాడు కాబట్టి <strong>"ఆపరేషన్ బ్రేక్"</strong> చేసి స్టేషన్ కి వెళ్ళిపోతారు. ప్రోగ్రామింగ్ లో సెర్చ్ అల్గారిథమ్స్ (Search Algorithms) లో ఒక డేటా దొరికిన వెంటనే లూప్ ని క్యాన్సిల్ చేయడానికి ఈ <code>break</code> నే వాడతారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Continue (కంటిన్యూ): దీన్ని వదిలేయ్!</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఇది <code>break</code> కి పూర్తి వ్యతిరేకం. <code>break</code> లూప్ నే చంపేస్తే, <strong>continue</strong> మాత్రం కేవలం "ఆ ఒక్క రౌండ్ (Iteration)" ని మాత్రమే స్కిప్ చేసి, మళ్ళీ నెక్స్ట్ రౌండ్ కి లూప్ ని పంపిస్తుంది.
      </p>
      
      <p class="prose-paragraph">
        ఉదాహరణకు, మీరు 1 నుండి 10 వరకు నంబర్స్ ని ప్రింట్ చేస్తున్నారు. కానీ అందులో 5 అనే నంబర్ మీకు నచ్చదు. కాబట్టి ఎప్పుడైతే 5 వస్తుందో అప్పుడు <code>continue</code> అనేస్తే, 5 ని ప్రింట్ చేయకుండా డైరెక్ట్ గా 6 కి జంప్ అయిపోతుంది. కింద కోడ్ చూడండి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Continue Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            // ఎప్పుడైతే i వాల్యూ 3 అవుతుందో అప్పుడు కిందికి వెళ్లకుండా 
            // మళ్ళీ పైకి లూప్ లోకి వెళ్లిపోతుంది. (అంటే 3 స్కిప్ అవుతుంది)
            continue; 
        }
        printf("Number is: %d\\n", i);
    }
    return 0;
}
/* అవుట్పుట్:
Number is: 1
Number is: 2
Number is: 4
Number is: 5
*/</code></pre>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: Switch case లో వాడే break కి, loop లో వాడే break కి తేడా ఉందా?</h4>
          <p>రెండూ చేసే పని ఒకటే! తమ చుట్టూ ఉన్న ఆ స్ట్రక్చర్ (switch లేదా loop) లో నుండి బయటకు తీసుకురావడమే బ్రేక్ పని. అయితే switch లో default గా break వాడతాం, కానీ loop లో ఒక కండిషన్ (if) వస్తేనే వాడతాం.</p>
        </div>
        <div class="faq-item">
          <h4>Q: నెస్టెడ్ లూప్స్ (లూప్ లోపల లూప్) లో break వాడితే ఏమవుతుంది?</h4>
          <p>ఇది చాలా ముఖ్యమైన పాయింట్. నెస్టెడ్ లూప్ లో <code>break</code> వాడితే, అది ఏ లూప్ లోపల ఉందో, కేవలం ఆ ఒక్క ఇన్నర్ లూప్ (Inner loop) ని మాత్రమే ఆపుతుంది. బయట ఉన్న మెయిన్ లూప్ మళ్ళీ మామూలుగానే నడుస్తుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 9, "Phase 05", "Loops & Iterations", subtopics, contentBody, '08-c-loops-and-iterations-while-do-while-for.html', '8. Loops & Iterations', '10-c-functions-modular-programming-and-reusability.html', '10. Functions Basics');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

function run() {
  buildLesson8();
  buildLesson9();
}

run();
