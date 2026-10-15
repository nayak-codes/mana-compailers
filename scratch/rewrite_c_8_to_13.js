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

// 8
function buildLesson8() {
  const title = "Loops & Iterations: while, do-while, for (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Loops ఎందుకు వాడతాం? while, do-while మరియు for లూప్స్ మధ్య ఉన్న ప్రధానమైన తేడాలు ఏమిటి? రియల్ లైఫ్ ఎగ్జాంపుల్స్ తో డీప్ గా నేర్చుకుందాం.";
  const filename = "08-c-loops-and-iterations-while-do-while-for.html";
  const subtopics = "లూప్స్ అవసరం ఏంటి? · Entry Control vs Exit Control · for లూప్ నిర్మాణం";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్లకు ఉన్న అతి పెద్ద బలం ఏమిటంటే... ఒకే పనిని విసుగు లేకుండా వేలసార్లు, లక్షలసార్లు చేయగలగడం. మనుషులమైన మనం ఒకే మాటను వందసార్లు రాయాలంటే బోర్ గా ఫీల్ అవుతాం. కానీ సిస్టమ్ కి ఆ ప్రాబ్లెమ్ లేదు. ఒకే పనిని మళ్ళీ మళ్ళీ చేయడాన్ని ప్రోగ్రామింగ్ లో <strong>Looping (లూపింగ్)</strong> అంటారు. ఈ పాఠంలో లూప్స్ ఎన్ని రకాలు ఉన్నాయో, వాటిని ఎప్పుడు వాడాలో విశ్లేషిద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు లూప్స్ ఎందుకు?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక చిన్న ఉదాహరణ తీసుకుందాం. మీరు స్క్రీన్ పైన మీ పేరును 5 సార్లు ప్రింట్ చేయాలి. అప్పుడు మీరు <code>printf</code> ని 5 సార్లు రాస్తారు. ఒకవేళ 1000 సార్లు ప్రింట్ చేయాలంటే? 1000 లైన్ల కోడ్ రాయడం అసాధ్యం. దానికి టైమ్ వేస్ట్, ఎనర్జీ వేస్ట్. లూప్ వాడితే కేవలం 2 లైన్లతో ఆ పని అయిపోతుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🔄 రియల్ లైఫ్ స్టోరీ: రన్నింగ్ ట్రాక్ లో అథ్లెట్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక కోచ్ తన స్టూడెంట్ ని "ఈ గ్రౌండ్ చుట్టూ 10 రౌండ్లు కొట్టు" అని చెప్పాడు. స్టూడెంట్ ఏం చేస్తాడు? ప్రతి రౌండ్ పూర్తి అవ్వగానే "ఇది నా ఒకటో రౌండ్, ఇది రెండో రౌండ్..." అని మనసులో లెక్క పెట్టుకుంటాడు. 10 రౌండ్లు పూర్తవ్వగానే ఆగిపోతాడు. <br><br>
          ఇక్కడ <strong>రౌండ్ కొట్టడం = పని (Execution)</strong>. <br>
          <strong>లెక్క పెట్టుకోవడం = కండిషన్ చెక్ (Condition checking)</strong>. లూప్స్ సరిగ్గా ఇదే కాన్సెప్ట్ తో పనిచేస్తాయి!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> సింపుల్ ఫర్ లూప్ (For Loop)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద ఉన్న సింపుల్ కోడ్ ని చూడండి. ఇది కేవలం 1 నుండి 3 వరకు నంబర్స్ ని ప్రింట్ చేస్తుంది. ఇది చదివితే మీకు లూప్స్ ఎంత ఈజీనో అర్థమైపోతుంది.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Loop</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    for (int i = 1; i <= 3; i++) {
        printf("Count: %d\\n", i);
    }
    return 0;
}</code></pre>
      </div>
      <p class="prose-paragraph">
        ఇంతే! <code>int i = 1</code> అంటే 1 తో మొదలుపెట్టాం. <code>i <= 3</code> అంటే 3 వచ్చే వరకు మాత్రమే ఆగు అన్నాం. <code>i++</code> అంటే ఒక్కొక్కటి పెంచుకుంటూ వెళ్ళు అని అర్థం. ఈ ఒక్క చిన్న కోడ్ బ్లాక్ తో మొత్తం లూపింగ్ కాన్సెప్ట్ కవర్ అయిపోతుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: while లూప్ ఎప్పుడు వాడాలి?</h4>
          <p>మీకు ఒక పని ఎన్నిసార్లు చేయాలో ముందే తెలిస్తే 'for' లూప్ వాడాలి. ఎన్నిసార్లు చేయాలో తెలియదు, కానీ ఒక కండిషన్ ఫెయిల్ అయ్యేదాకా చేస్తూనే ఉండాలి అనుకుంటే 'while' లూప్ వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ఇన్ఫినిట్ లూప్ అంటే ఏమిటి?</h4>
          <p>కండిషన్ ఎప్పటికీ ఫెయిల్ అవ్వకుండా, లూప్ ఆగకుండా రన్ అవుతూనే ఉంటే దాన్ని ఇన్ఫినిట్ లూప్ అంటారు. కోడ్ లో కండిషన్ తప్పుగా రాస్తే మనకి తెలీకుండానే ఇవి క్రియేట్ అయిపోయి ప్రోగ్రామ్ ని హ్యాంగ్ చేస్తాయి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 8, "Phase 05", "Loops & Iterations", subtopics, contentBody, '07-c-switch-case-statement-and-menu-driven-logic.html', '7. Switch Case & Menu Logic', '09-c-break-and-continue-statements-in-loops.html', '9. Break & Continue');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 9
function buildLesson9() {
  const title = "Break & Continue in C Loops (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లూప్స్ లో break మరియు continue కీవర్డ్స్ అంటే ఏమిటి? లూప్ ని మధ్యలో ఆపేయాలన్నా, ఒక స్టెప్ ని వదిలేయాలన్నా వీటిని ఎలా వాడాలో నేర్చుకుందాం.";
  const filename = "09-c-break-and-continue-statements-in-loops.html";
  const subtopics = "Break స్టేట్‌మెంట్ · Continue కీవర్డ్ · రియల్ వరల్డ్ యూజ్ కేసులు";

  const contentBody = `
    <div class="intro-box">
      <p>లూప్ స్టార్ట్ అయిన తర్వాత కండిషన్ ఫాల్స్ అయ్యేదాకా అది ఆగదు అని తెలుసుకున్నాం. కానీ రియల్ లైఫ్ లో ఒక పర్టికులర్ పరిస్థితి రాగానే మొత్తం లూప్ ని క్యాన్సిల్ చేయాల్సి రావచ్చు, లేదా ఆ ఒక్క రౌండ్ ని స్కిప్ చేయాల్సి రావచ్చు. ఇందుకోసం C లో <strong>break</strong> మరియు <strong>continue</strong> ఉన్నాయి.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Break అంటే ఎమర్జెన్సీ స్టాప్!</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <strong>break</strong> అంటే బద్దలుకొట్టుకుని బయటకు రావడం. లూప్ రన్ అవుతున్నప్పుడు ఎక్కడైనా <code>break;</code> కనిపిస్తే, అప్పటి వరకు లూప్ లో ఏం జరుగుతున్నా సరే, లూప్ మొత్తాన్ని చంపేసి బయటకు వచ్చేస్తుంది. 
      </p>

      <div class="story-box">
        <div class="story-box-title">🛑 రియల్ లైఫ్ స్టోరీ: దొంగల వేట</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          పోలీసులు ఒక వీధిలో 100 ఇళ్లలో దొంగ కోసం వెతుకుతున్నారు. ఇది 1 నుండి 100 వరకు ఉన్న లూప్ అనుకుందాం. <br><br>
          3వ ఇంట్లో దొంగ దొరికాడు. అప్పుడు మిగతా 97 ఇళ్లను కూడా వెతుకుతారా? వెతకరు కదా! దొంగ దొరికాడు కాబట్టి "ఆపరేషన్ <strong>break</strong>" చేసి వెళ్లిపోతారు. సెర్చ్ అల్గారిథమ్స్ లో ఇది చాలా ముఖ్యం.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద ఉన్న కోడ్ లో మనం ఒకేసారి రెండు కీవర్డ్స్ ని చూద్దాం. మనకు నచ్చని నంబర్ వస్తే <code>continue</code> తో వదిలేస్తాం, ఫైనల్ టార్గెట్ రాగానే <code>break</code> తో లూప్ ని ఆపేస్తాం. ఇంతే సింపుల్!
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Break & Continue</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    for (int i = 1; i <= 5; i++) {
        if (i == 2) {
            continue; // 2 ని స్కిప్ చెయ్
        }
        if (i == 4) {
            break; // 4 రాగానే మొత్తం ఆపేయ్
        }
        printf("Value: %d\\n", i);
    }
    return 0;
}</code></pre>
      </div>
      <p class="prose-paragraph">
        పై కోడ్ లో 1 ప్రింట్ అవుతుంది. 2 స్కిప్ అవుతుంది (continue వల్ల). 3 ప్రింట్ అవుతుంది. 4 రాగానే <code>break</code> అవుతుంది కాబట్టి 5 అసలు చెక్ అవ్వదు. అవుట్పుట్ కేవలం 1 మరియు 3 మాత్రమే వస్తుంది!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: Switch case లో వాడే break కి, loop లో వాడే break కి తేడా ఉందా?</h4>
          <p>రెండూ చేసే పని ఒకటే! తమ చుట్టూ ఉన్న స్ట్రక్చర్ (switch లేదా loop) లో నుండి బయటకు తీసుకురావడమే బ్రేక్ పని.</p>
        </div>
        <div class="faq-item">
          <h4>Q: నెస్టెడ్ లూప్స్ లో break వాడితే ఏమవుతుంది?</h4>
          <p>నెస్టెడ్ లూప్ లో <code>break</code> వాడితే, అది ఏ లూప్ లోపల ఉందో, కేవలం ఆ ఒక్క ఇన్నర్ లూప్ ని మాత్రమే ఆపుతుంది. బయట ఉన్న మెయిన్ లూప్ మళ్ళీ మామూలుగానే నడుస్తుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 9, "Phase 05", "Loops & Iterations", subtopics, contentBody, '08-c-loops-and-iterations-while-do-while-for.html', '8. Loops & Iterations', '10-c-functions-modular-programming-and-reusability.html', '10. Functions Basics');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 10
function buildLesson10() {
  const title = "Functions Basics: Modular Programming (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Functions ఎందుకు అవసరం? పెద్ద కోడ్ ని చిన్న చిన్న ముక్కలుగా (Modules) ఎలా విడగొట్టాలి? కాఫీ మిషన్ స్టోరీ తో డీప్ గా నేర్చుకుందాం.";
  const filename = "10-c-functions-modular-programming-and-reusability.html";
  const subtopics = "Functions ఎందుకు వాడాలి? · Function Declaration & Definition · Arguments";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక ఇల్లు కట్టాలంటే ఒక్కడే కూలీ మొత్తం పని చేయలేడు కదా! ఒకడు ఇటుకలు పేర్చాలి, ఇంకొకడు సిమెంట్ కలపాలి. సాఫ్ట్‌వేర్ డెవలప్‌మెంట్ కూడా అంతే! ఒక లక్ష లైన్ల కోడ్ ని ఒకే దగ్గర రాస్తే ఎర్రర్ వస్తే వెతుక్కోవడం కష్టం. అందుకే పెద్ద కోడ్ ని చిన్న ముక్కలుగా విడగొడతాం. ఆ ముక్కలనే <strong>Functions (ఫంక్షన్స్)</strong> అంటారు.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ఫంక్షన్స్ అంటే ఏమిటి? ఎందుకు వాడాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఫంక్షన్ అనేది ఒక చిన్న "మిషన్ (Machine)" లాంటిది. మీరు దానికి కొంత ఇన్పుట్ ఇస్తారు. అది దాన్ని ప్రాసెస్ చేసి, రిజల్ట్ ని ఇస్తుంది. 
      </p>

      <div class="story-box">
        <div class="story-box-title">☕ రియల్ లైఫ్ స్టోరీ: కాఫీ మిషన్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఆఫీస్ లో ఉన్న కాఫీ మిషన్ ఊహించుకోండి. <br><br>
          <strong>Input:</strong> కాఫీ పౌడర్, వేడి పాలు వేస్తారు. ఇవే మన <strong>Arguments</strong>. <br>
          <strong>Processing:</strong> లోపల అంతా మిక్స్ అవుతుంది. ఇదే మన <strong>Function Body</strong>. <br>
          <strong>Output:</strong> కాఫీ బయటకు వస్తుంది. ఇదే మన <strong>Return value</strong>. <br><br>
          మీరు బటన్ నొక్కితే చాలు (Function Call), కాఫీ వస్తుంది. ఇది కోడ్ ని <em>Re-usable</em> చేస్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> సింపుల్ ఫంక్షన్ ఎలా రాయాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక కొత్త ఫంక్షన్ ని క్రియేట్ చేయడానికి కింద ఉన్న సింపుల్ కోడ్ ని చూడండి. ఇందులో మనం కేవలం ఒకే ఒక ఫంక్షన్ ని రాసి, దాన్ని <code>main()</code> లోపల నుండి పిలుస్తున్నాం.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Function</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఇది మన కాఫీ మిషన్ లాంటి ఫంక్షన్
void say_hello() {
    printf("Hello User, Welcome!\\n");
}

int main(void) {
    // బటన్ నొక్కడం (Calling the function)
    say_hello(); 
    return 0;
}</code></pre>
      </div>
      <p class="prose-paragraph">
        చూశారుగా! <code>say_hello()</code> అనే ఒక చిన్న ఫంక్షన్ రాసి, దాన్ని <code>main()</code> నుండి పిలిచాం. ఇంతే సింపుల్ ఫంక్షన్స్ అంటే. ఈ ఫంక్షన్ ఏమీ తిరిగి పంపట్లేదు కాబట్టి దానికి <code>void</code> అని పేరు పెట్టాం.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఒక ఫంక్షన్ ఏమీ రిటర్న్ చేయకపోతే ఏమంటారు?</h4>
          <p>ఏమీ రిటర్న్ చేయని ఫంక్షన్స్ కి ముందు <code>void</code> (వాయిడ్) అని పెడతాం. అంటే ఈ మిషన్ ఏ అవుట్పుట్ ని బయటకు ఇవ్వదు, జస్ట్ లోపలపని చేసుకుని ఆగిపోతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: <code>main()</code> కూడా ఒక ఫంక్షనేనా?</h4>
          <p>అవును! C లాంగ్వేజ్ లో <code>main()</code> అనేది బాస్ ఫంక్షన్. ప్రోగ్రామ్ ని రన్ చేసినప్పుడు సిస్టమ్ మొదట వెతికే ఫంక్షన్ ఇదే. అది లేకపోతే ప్రోగ్రామ్ స్టార్ట్ అవ్వదు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 10, "Phase 06", "Functions & Modular Programming", subtopics, contentBody, '09-c-break-and-continue-statements-in-loops.html', '9. Break & Continue', '11-c-function-parameters-return-values-and-scope.html', '11. Scope & Lifecycle');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 11
function buildLesson11() {
  const title = "Variables Scope & Lifecycle in C (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Local Variables మరియు Global Variables మధ్య తేడా ఏంటి? ఒక ఫంక్షన్ లో క్రియేట్ చేసిన వేరియబుల్ ఇంకో ఫంక్షన్ కి ఎందుకు కనిపించదు?";
  const filename = "11-c-function-parameters-return-values-and-scope.html";
  const subtopics = "Local Scope · Global Scope · Block Scope · Variable Lifecycle";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక వేరియబుల్ ని క్రియేట్ చేసిన తర్వాత అది ఎంతసేపు బ్రతికి ఉంటుంది? దాన్ని సిస్టమ్ లో ఎవరెవరు చూడగలరు? ఈ కాన్సెప్ట్ నే ప్రోగ్రామింగ్ లో <strong>Scope (స్కోప్)</strong> అంటారు. బగ్స్ లేకుండా కోడ్ రాయాలంటే ఈ కాన్సెప్ట్ చాలా ముఖ్యం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> లోకల్ స్కోప్ vs గ్లోబల్ స్కోప్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక <code>{}</code> బ్రాకెట్స్ (Block) లోపల క్రియేట్ చేసిన వేరియబుల్ ని <strong>Local Variable</strong> అంటారు. బయట వాళ్ళకు అసలు అలాంటి ఒక వేరియబుల్ ఉందన్న విషయం కూడా తెలియదు. ఫంక్షన్స్ అన్నీటికీ పైన క్రియేట్ చేసే వేరియబుల్స్ ని <strong>Global Variables</strong> అంటారు. వీటిని ఎవరైనా వాడుకోవచ్చు.
      </p>

      <div class="story-box">
        <div class="story-box-title">🏠 రియల్ లైఫ్ స్టోరీ: ఇంట్లో టీవీ vs పబ్లిక్ పార్క్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీ ఇంట్లో ఉన్న టీవీ కేవలం మీ ఇంట్లో (లోకల్ గా) ఉన్నవాళ్లు మాత్రమే చూడగలరు. ఇది <strong>Local Variable</strong>. <br><br>
          అదే మీ వీధిలో ఉన్న పబ్లిక్ పార్క్ కి ఎవరైనా వెళ్లొచ్చు. ఇది <strong>Global Variable</strong>. గ్లోబల్ వేరియబుల్స్ ని ఏ ఫంక్షన్ అయినా మార్చేయొచ్చు కాబట్టి వీటిని తక్కువగా వాడాలి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో చూడండి, <code>x</code> అనే వేరియబుల్ గ్లోబల్ గా ఉంది కాబట్టి ఎవరైనా వాడొచ్చు. కానీ <code>y</code> అనేది కేవలం మెయిన్ ఫంక్షన్ లో మాత్రమే ఉంది కాబట్టి అది లోకల్.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Scope</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఇది గ్లోబల్ వేరియబుల్ (అందరికీ కనిపిస్తుంది)
int x = 100; 

int main(void) {
    // ఇది లోకల్ వేరియబుల్ (కేవలం ఇక్కడ మాత్రమే)
    int y = 50; 
    
    printf("Global: %d, Local: %d\\n", x, y);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఒకే పేరుతో Local మరియు Global వేరియబుల్స్ ఉండొచ్చా?</h4>
          <p>ఉండొచ్చు! అప్పుడు సిస్టమ్ ఎప్పుడూ లోకల్ వేరియబుల్ కే మొదటి ప్రాధాన్యత ఇస్తుంది. దీన్నే <strong>Variable Shadowing</strong> అంటారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: Static Variables అంటే ఏమిటి?</h4>
          <p>ఇవి లోకల్ గా ఒక ఫంక్షన్ లోనే ఉంటాయి, కానీ ఫంక్షన్ అవ్వగానే చనిపోవు! నెక్స్ట్ టైం ఫంక్షన్ ని మళ్ళీ పిలిచినప్పుడు పాత వాల్యూ ని అలాగే గుర్తుపెట్టుకుంటాయి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 11, "Phase 06", "Functions & Modular Programming", subtopics, contentBody, '10-c-functions-modular-programming-and-reusability.html', '10. Functions Basics', '12-c-arrays-declaration-memory-and-traversal.html', '12. Arrays Basics');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 12
function buildLesson12() {
  const title = "Arrays Basics: Declaration, Memory & Traversal (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Arrays ఎందుకు అవసరం? ఒకే రకమైన డేటాని వందల కొద్దీ స్టోర్ చేయాలంటే ఒకే పేరుతో ఎలా స్టోర్ చేయాలో తెలుసుకుందాం.";
  const filename = "12-c-arrays-declaration-memory-and-traversal.html";
  const subtopics = "Array అంటే ఏంటి? · Contiguous Memory ఆల్లోకేషన్ · Indexing (0-based)";

  const contentBody = `
    <div class="intro-box">
      <p>క్లాస్ లో 100 మంది స్టూడెంట్స్ ఉంటే 100 వేరియబుల్స్ క్రియేట్ చేయడం అసాధ్యం కదా! ఇలా ఒకే రకమైన డేటాని ఒకే పేరుతో స్టోర్ చేసుకోవడానికి కనుగొన్న కాన్సెప్ట్ పేరే <strong>Array (అర్రే)</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Array ని ఎలా ఊహించుకోవాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        అర్రే క్రియేట్ చేసే పద్ధతి: <code>int marks[5];</code> అంటే 5 ఇంటిజర్లకు సరిపడే మెమరీ. ఇండెక్స్ ఎప్పుడూ <strong>0</strong> తోనే మొదలవుతుంది!
      </p>

      <div class="story-box">
        <div class="story-box-title">🏢 రియల్ లైఫ్ స్టోరీ: అపార్ట్‌మెంట్ బిల్డింగ్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక అపార్ట్‌మెంట్ బిల్డింగ్ ఊహించుకోండి. ఎవరైనా కొరియర్ బాయ్ వస్తే, వాడు బిల్డింగ్ పేరుతో పాటు "ఫ్లాట్ నంబర్ 0", "ఫ్లాట్ నంబర్ 1" అని అడుగుతాడు. <br><br>
          ప్రోగ్రామింగ్ లో కూడా ఇంతే! బిల్డింగ్ పేరు = <strong>Array Name</strong>. ఫ్లాట్ నంబర్స్ = <strong>Index Numbers (0, 1, 2...)</strong>. 
        </p>
      </div>
      <p class="prose-paragraph">
        ఇంకో ముఖ్యమైన విషయం <strong>Contiguous Memory Allocation</strong>. అర్రే కి సంబంధించిన మెమరీ మొత్తం RAM లో పక్కపక్కనే ఉంటుంది. దీనివల్ల డేటాని వెతకడం చాలా ఫాస్ట్ గా జరుగుతుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఇక్కడ మనం చాలా సింపుల్ గా 3 నంబర్స్ ని ఒక అర్రే లో పెట్టి ప్రింట్ చేస్తున్నాం. అంతే!
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Array</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 3 ఎలిమెంట్స్ తో అర్రే
    int arr[3] = {10, 20, 30};
    
    // మొదటి ఎలిమెంట్ ఇండెక్స్ 0 అవుతుంది
    printf("First number is: %d\\n", arr[0]);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఇండెక్స్ ఎందుకు 0 తోనే మొదలవుతుంది?</h4>
          <p>ఇండెక్స్ అనేది బేస్ అడ్రస్ నుండి "ఎంత దూరంలో" ఉన్నాం (Offset) అని చెప్తుంది. మొదటి ఎలిమెంట్ బేస్ అడ్రస్ దగ్గరే ఉంటుంది కాబట్టి దాని దూరం 0. అందుకే 0 తో మొదలవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: 5 సైజు ఉన్న అర్రే లో 6వ ఎలిమెంట్ ని స్టోర్ చేయొచ్చా?</h4>
          <p>చేయకూడదు! దీన్నే Array Out of Bounds అంటారు. ఇది మెమరీ లో వేరే డేటాని పాడు చేస్తుంది, దీనివల్ల ప్రోగ్రామ్ క్రాష్ అవుతుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 12, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '11-c-function-parameters-return-values-and-scope.html', '11. Scope & Lifecycle', '13-c-multi-dimensional-arrays-and-matrices.html', '13. 2D Arrays & Matrices');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 13
function buildLesson13() {
  const title = "2D Arrays & Matrices (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో 2D Arrays అంటే ఏమిటి? మ్యాట్రిక్స్ (Matrix) డేటాని, అంటే అడ్డు వరుసలు (Rows) మరియు నిలువు వరుసలు (Columns) ని ఎలా వాడాలో నేర్చుకుందాం.";
  const filename = "13-c-multi-dimensional-arrays-and-matrices.html";
  const subtopics = "2D Array అంటే ఏంటి? · Rows మరియు Columns · Nested Loops";

  const contentBody = `
    <div class="intro-box">
      <p>డేటా అంతా సింగిల్ లైన్ లో ఉండదు కదా. టైమ్‌టేబుల్ కానీ, థియేటర్ లోని సీట్లు కానీ అడ్డు వరుసలు (Rows) మరియు నిలువు వరుసలు (Columns) గా ఉంటాయి. ఆ విధంగా ఉండే డేటాని ప్రోగ్రామింగ్ లో స్టోర్ చేయడానికి వాడేదే <strong>2D Arrays</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span> 2D Array అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక 2D Array ని సింపుల్ గా "అర్రేస్ తో చేసిన అర్రే (Array of Arrays)" అని చెప్పొచ్చు. దీన్ని క్రియేట్ చేయడానికి మనం రెండు సైజులు ఇవ్వాలి: <code>int matrix[3][4];</code>
      </p>

      <div class="story-box">
        <div class="story-box-title">🎬 రియల్ లైఫ్ స్టోరీ: థియేటర్ సీట్లు</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీ సినిమా టికెట్ పైన "H-12" అని రాసి ఉంది. <br>
          "H" అనేది ఏ అడ్డు వరుస (Row) అని చెప్తుంది. <br>
          "12" అనేది ఆ వరుసలో ఏ సీట్ నంబర్ (Column) అని చెప్తుంది. <br><br>
          అంటే ఒక సీట్ ని కనిపెట్టాలంటే మనకు కచ్చితంగా <strong>రెండు నంబర్లు</strong> కావాలి. 2D అర్రే కూడా కరెక్ట్ గా ఇదే లాజిక్ తో పనిచేస్తుంది. డేటాని స్టోర్ చేయాలంటే <code>[Row][Column]</code> కావాలి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మనం ఒకే ఒక చిన్న 2D అర్రే క్రియేట్ చేసి అందులో ఒక ఎలిమెంట్ ని ఎలా యాక్సెస్ చేయాలో కింద కోడ్ లో చూద్దాం. ఇది చాలా సింపుల్!
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple 2D Array</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 2 Rows, 2 Columns ఉన్న చిన్న గ్రిడ్
    int grid[2][2] = {
        {10, 20}, 
        {30, 40}
    };
    
    // మొదటి రో(0) లో రెండో కాలమ్(1) లో ఉన్న నంబర్
    printf("Value: %d\\n", grid[0][1]); // 20 ప్రింట్ అవుతుంది
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: కంప్యూటర్ RAM లో 2D Array గ్రిడ్ లాగే ఉంటుందా?</h4>
          <p>లేదు! కంప్యూటర్ RAM అదొక పెద్ద స్ట్రెయిట్ లైన్. కాబట్టి 2D అర్రేని కూడా సిస్టమ్ ఒక సింగిల్ లైన్ లోనే పక్కపక్కన సేవ్ చేస్తుంది. మన కంపైలర్ లోపల మ్యాథ్స్ వాడి దాన్ని 2D లాగా చూపిస్తుంది అంతే!</p>
        </div>
        <div class="faq-item">
          <h4>Q: 3D Arrays కూడా ఉంటాయా?</h4>
          <p>ఉంటాయి! గేమ్స్ డెవలప్‌మెంట్ లో స్పేస్ లో ఒక ఆబ్జెక్ట్ (x, y, z) అక్షాంశాలను చెప్పడానికి వీటిని వాడుతుంటారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 13, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '12-c-arrays-declaration-memory-and-traversal.html', '12. Arrays Basics', '14-c-strings-character-arrays-and-null-terminator.html', '14. Strings & Text Processing');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson8();
  buildLesson9();
  buildLesson10();
  buildLesson11();
  buildLesson12();
  buildLesson13();
  console.log("✅ Rewrote Chapters 8-13 with STRICTLY ONLY ONE VERY SIMPLE CODE BLOCK PER PAGE!");
}
run();
