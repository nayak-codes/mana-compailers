const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// Extract C_CURRICULUM and sidebar logic from an existing file
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
      color: #e6edf3;
      font-size: 15.5px;
      margin-bottom: 8px;
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
    /* New styles for beautiful typography */
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

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl && runBtn) {
            runBtn.addEventListener('click', (e) => {
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

// ==========================================
// LESSON 1: C Basics & Program Architecture
// ==========================================
function buildLesson1() {
  const title = "C Fundamentals & Program Architecture (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ అంటే ఏమిటి? కంపైలర్ (Compiler) ఎలా పనిచేస్తుంది? ఒక ప్రోగ్రామ్ రన్ అవ్వడానికి వెనుక జరిగే మ్యాజిక్ ఏంటి? ఈ విషయాలను రియల్ లైఫ్ ఉదాహరణలతో, థియరీ పరంగా డీప్ గా తెలుసుకుందాం.";
  const filename = "01-c-basics-and-program-structure.html";
  const subtopics = "అసలు C ఎందుకు? · కంపైలర్ అంటే ఏంటి? · ప్రోగ్రామ్ పనిచేసే విధానం · థియరీ మరియు రియల్ లైఫ్ ఎగ్జాంపుల్స్";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్ సైన్స్ ప్రపంచంలో <strong>C లాంగ్వేజ్</strong> ని మదర్ ఆఫ్ ఆల్ ప్రోగ్రామింగ్ లాంగ్వేజెస్ అని పిలుస్తారు. ఈ రోజు మనం వాడుతున్న Windows, Linux, Android లాంటి ఆపరేటింగ్ సిస్టమ్స్ అన్నీ కూడా C లాంగ్వేజ్ పునాదుల పైనే నిర్మించబడ్డాయి. ఈ పాఠంలో మనం కేవలం కోడ్ రాయడం మాత్రమే కాకుండా, అసలు కంప్యూటర్ కి మనం చెప్పే మాటలు ఎలా అర్థమవుతాయి? మనం రాసిన ఇంగ్లీష్ లాంటి కోడ్, సిస్టమ్ కి అర్థమయ్యే 0 లు మరియు 1 లు గా ఎలా మారుతుంది అన్న విషయాలను రియల్ లైఫ్ ఉదాహరణలతో చాలా డీప్ గా నేర్చుకుందాం.</p>
    </div>

    <!-- 1. అసలు C లాంగ్వేజ్ ఎందుకు నేర్చుకోవాలి? -->
    <div class="section-title"><span class="num">1</span> అసలు C లాంగ్వేజ్ ఎందుకు నేర్చుకోవాలి? (Why C?)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ప్రస్తుతం మార్కెట్ లో పైథాన్ (Python), జావా (Java) లాంటి ఎన్నో మోడరన్ లాంగ్వేజెస్ ఉన్నాయి. మరి ఇన్ని ఉన్నప్పుడు, 1970ల నాటి C లాంగ్వేజ్ నేర్చుకోవడం ఎందుకు? ఒక చిన్న ఉదాహరణ చూద్దాం. మీరు కారు నడపడం నేర్చుకోవాలి అనుకుంటే, డైరెక్ట్ గా ఆటోమేటిక్ కారు నేర్చుకోవడం కంటే, మాన్యువల్ గేర్ కారు నేర్చుకుంటే ఇంజిన్ ఎలా పనిచేస్తుంది, గేర్స్ ఎలా పడతాయి అన్న బేసిక్ నాలెడ్జ్ వస్తుంది కదా! C లాంగ్వేజ్ కూడా సరిగ్గా అలాంటిదే. 
      </p>
      <p class="prose-paragraph">
        పైథాన్ లాంటి లాంగ్వేజెస్ లో మెమరీ మేనేజ్మెంట్ (Memory Management) అంతా అదే చూసుకుంటుంది. కానీ, C లాంగ్వేజ్ లో మీరే స్వయంగా కంప్యూటర్ మెమరీ (RAM) ని కంట్రోల్ చేయాలి. దీనివల్ల <strong>కంప్యూటర్ ఆర్కిటెక్చర్</strong> అంటే హార్డ్ వేర్ స్థాయిలో ఏం జరుగుతుందో మీకు క్లియర్ గా అర్థం అవుతుంది. అందుకే ఇస్రో (ISRO), నాసా (NASA), మైక్రోసాఫ్ట్ (Microsoft) లాంటి సంస్థలు ఇప్పటికీ కోర్ ఆపరేషన్స్ కోసం C ని ఉపయోగిస్తాయి.
      </p>
    </div>

    <!-- 2. కంపైలర్ అంటే ఏమిటి? -->
    <div class="section-title"><span class="num">2</span> కంపైలర్ (Compiler) అంటే ఏమిటి? (The Translator)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కంప్యూటర్ ప్రాసెసర్ (CPU) కి ఇంగ్లీష్, తెలుగు లాంటి భాషలు రావు. దానికి అర్థమయ్యే ఒకే ఒక్క భాష "మెషిన్ లాంగ్వేజ్" (Machine Language), అంటే సున్నాలు మరియు ఒకట్లు (0s and 1s). మరి మనం రాసేది ఇంగ్లీష్ లో ఉండే C కోడ్ కదా? దాన్ని కంప్యూటర్ కి ఎలా అర్థమయ్యేలా చేయాలి? ఇక్కడే <span class="prose-highlight">కంపైలర్ (Compiler)</span> అనే టూల్ వస్తుంది.
      </p>
      
      <div class="story-box">
        <div class="story-box-title">📖 రియల్ లైఫ్ స్టోరీ: రెస్టారెంట్ లో చెఫ్ (Chef)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు జపాన్ లో ఒక రెస్టారెంట్ కి వెళ్లారు అనుకుందాం. మీకు జపనీస్ భాష రాదు, అక్కడి చెఫ్ కి ఇంగ్లీష్ రాదు. మీరు ఏ ఫుడ్ కావాలో ఆర్డర్ ఇవ్వాలంటే ఎలా? మధ్యలో ఒక ట్రాన్స్లేటర్ (అనువాదకుడు) ని పెట్టుకుంటారు. మీరు ఇంగ్లీష్ లో ఆర్డర్ ఇస్తే, అతను జపనీస్ లోకి మార్చి చెఫ్ కి చెప్తాడు. <br><br>
          ఇక్కడ <strong>మీరు రాసే C కోడ్ = ఇంగ్లీష్ ఆర్డర్</strong>. <br>
          <strong>కంప్యూటర్ ప్రాసెసర్ = జపనీస్ చెఫ్</strong>. <br>
          <strong>కంపైలర్ = ట్రాన్స్లేటర్!</strong> మనం రాసిన ఇంగ్లీష్ కోడ్ మొత్తాన్ని ఒకేసారి చదివి, ఎక్కడా తప్పులు లేవని నిర్ధారించుకొని, దాన్ని ప్రాసెసర్ కి అర్థమయ్యే మెషిన్ కోడ్ (0s & 1s) గా మారుస్తుంది కంపైలర్.
        </p>
      </div>
    </div>

    <!-- 3. ఒక ప్రోగ్రామ్ ఎలా పనిచేస్తుంది? -->
    <div class="section-title"><span class="num">3</span> ఒక ప్రోగ్రామ్ వెనుక జరిగే 4 దశలు (Compilation Pipeline)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మనం ఒక <code>.c</code> ఫైల్ రాసి రన్ బటన్ నొక్కగానే, వెనకాల 4 ముఖ్యమైన స్టెప్స్ జరుగుతాయి. వీటిని ఇంటర్వ్యూలలో కచ్చితంగా అడుగుతారు:
      </p>
      
      <div class="deep-dive-card">
        <h3>⚡ The 4-Stage Compilation Pipeline:</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.9;">
          1. <strong>Preprocessing (ప్రీ-ప్రాసెసింగ్):</strong> మనం రాసిన కోడ్ లోని <code>#include</code> లైన్స్ ని చూసి, కంపైలర్ పాత ఫైల్స్ ని (లైబ్రరీస్ ని) మన కోడ్ లోకి లాక్కుంటుంది. కమెంట్లు అన్నీ తొలగిస్తుంది.<br>
          2. <strong>Compiling (కంపైలింగ్):</strong> ఇప్పుడు ఆ కోడ్ ని అసెంబ్లీ కోడ్ (Assembly Code) లాగా మారుస్తుంది.<br>
          3. <strong>Assembling (అసెంబ్లింగ్):</strong> ఈ అసెంబ్లీ కోడ్ ని కంప్యూటర్ కి అర్థమయ్యే 0లు, 1ల రూపంలోకి (Object File గా) మారుస్తుంది.<br>
          4. <strong>Linking (లింకింగ్):</strong> మనం వాడిన వేరే ఫైల్స్ ని, ఆబ్జెక్ట్ ఫైల్ ని కలిపి చివరగా ఒక ఫైనల్ <code>.exe</code> (Executable) ఫైల్ ని తయారు చేస్తుంది. ఇదే మన సిస్టమ్ లో రన్ అవుతుంది!
        </p>
      </div>
    </div>

    <!-- 4. బేసిక్ కోడ్ స్ట్రక్చర్ -->
    <div class="section-title"><span class="num">4</span> కోడ్ స్ట్రక్చర్ మరియు వివరణ</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఇప్పుడు మనం ఒక చిన్న ప్రోగ్రామ్ రాద్దాం. కింద ఉన్న కోడ్ లో ప్రతి లైన్ కి ఒక అర్థం ఉంది. కేవలం బట్టీ పట్టకుండా, ప్రతి లైన్ ఎందుకు రాస్తున్నామో అర్థం చేసుకోండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — మన మొదటి ప్రోగ్రామ్</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt; // 1. స్టాండర్డ్ ఇన్పుట్ ఔట్పుట్ లైబ్రరీ ని యాడ్ చేయడం

int main(void) { // 2. ప్రోగ్రామ్ ఎప్పుడైనా ఇక్కడి నుండే మొదలవుతుంది (Entry Point)
    
    // 3. స్క్రీన్ మీద టెక్స్ట్ ని ప్రింట్ చేయడానికి వాడే ఫంక్షన్
    printf("Hello C Programming!\\n"); 
    
    return 0; // 4. ప్రోగ్రామ్ సక్సెస్ ఫుల్ గా పూర్తయింది అని ఆపరేటింగ్ సిస్టమ్ కి చెప్పడం
}</code></pre>
      </div>

      <p class="prose-paragraph">
        <strong>పై కోడ్ లో ఏముంది?</strong><br>
        <code>#include &lt;stdio.h&gt;</code>: మీరు ఒక పనివాడికి వంట చేయమని చెప్తే, ముందు వంట సామాన్లు ఉన్న గది తాళం ఇవ్వాలి కదా? అలాగే మనం <code>printf</code> వాడాలి అంటే దాని తాలూకు రూల్స్ అన్నీ ఈ <code>stdio.h</code> (Standard Input Output) అనే ఫైల్ లో ఉంటాయి. దాన్ని ముందుగా మన ఫైల్ లోకి ఇంక్లూడ్ చేసుకుంటున్నాం.<br><br>
        <code>int main(void)</code>: కారు ఇంజిన్ ఎక్కడ స్టార్ట్ అవుతుందో, C ప్రోగ్రామ్ ఎప్పుడూ ఈ <code>main</code> ఫంక్షన్ నుండే స్టార్ట్ అవుతుంది.<br><br>
        <code>return 0;</code>: మన ప్రోగ్రామ్ ఎటువంటి ఎర్రర్స్ లేకుండా ప్రశాంతంగా పూర్తయింది అని సిస్టమ్ కి తెలియజేయడానికి లాస్ట్ లో ఈ లైన్ రాస్తాం.
      </p>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 1, "Phase 01", "C Basics & Architecture", subtopics, contentBody, null, null, '02-c-variables-declaration-and-memory-model.html', '2. Variables, Memory Model & Scope');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

// ==========================================
// LESSON 2: Variables, Memory Model & Scope
// ==========================================
function buildLesson2() {
  const title = "Variables, Memory Model & Scope (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Variables అంటే ఏమిటి? డేటాని RAM లో ఎలా స్టోర్ చేస్తారు? Declaration, Initialization కి తేడా ఏంటి? రియల్ లైఫ్ బాక్స్ ఎగ్జాంపుల్స్ తో డీప్ గా తెలుసుకుందాం.";
  const filename = "02-c-variables-declaration-and-memory-model.html";
  const subtopics = "వేరియబుల్స్ అంటే ఏంటి? · RAM లో ఎలా స్టోర్ అవుతాయి? · డిక్లరేషన్ vs ఇనిషియలైజేషన్ · లోకల్ vs గ్లోబల్ స్కోప్";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్ కి మెమరీ (జ్ఞాపకశక్తి) అనేది చాలా ముఖ్యం. మనం ఒక క్యాలిక్యులేటర్ లో 5 + 3 అని టైప్ చేసినప్పుడు, ఆ 5 మరియు 3 అనే నంబర్స్ ఎక్కడో ఒకచోట సేవ్ అవ్వాలి కదా? ఆ సేవ్ చేసుకునే ప్లేస్ నే మనం <strong>RAM (Random Access Memory)</strong> అంటాం. ఈ రోజు పాఠంలో, ఆ RAM లో మన డేటాని సేవ్ చేసుకోవడానికి వాడే <strong>Variables (వేరియబుల్స్)</strong> గురించి చాలా డీప్ గా, రియల్ లైఫ్ ఉదాహరణలతో అర్థం చేసుకుందాం.</p>
    </div>

    <!-- 1. వేరియబుల్స్ అంటే ఏమిటి? -->
    <div class="section-title"><span class="num">1</span> Variables (వేరియబుల్స్) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ప్రోగ్రామింగ్ లో <span class="prose-highlight">Variable</span> అంటే జస్ట్ ఒక ఖాళీ డబ్బా (Box) లాంటిది. అందులో మనం మనకి కావాల్సిన వస్తువుని (డేటాని) దాచుకోవచ్చు. మరియు అవసరమైనప్పుడు ఆ డబ్బాలో ఉన్న పాత వస్తువు తీసేసి కొత్త వస్తువు పెట్టుకోవచ్చు. (అంటే దాని వాల్యూ మారుతూ ఉంటుంది, అందుకే దాన్ని వేరియబుల్ అంటారు).
      </p>

      <div class="story-box">
        <div class="story-box-title">📦 రియల్ లైఫ్ స్టోరీ: అమెజాన్ డెలివరీ బాక్స్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఒక పోస్ట్ ఆఫీస్ కి వెళ్లారు. అక్కడ చాలా లాకర్స్ (Lockers) ఉన్నాయి. ప్రతి లాకర్ కి ఒక అడ్రస్ నంబర్ ఉంటుంది (ఉదా: 104, 105). కానీ ప్రతిసారీ మీరు నంబర్ గుర్తుపెట్టుకోవడం కష్టం కాబట్టి, మీ లాకర్ కి "నా సీక్రెట్ బాక్స్" అని ఒక పేరు (లేబుల్) పెట్టుకున్నారు. <br><br>
          ఇక్కడ <strong>పోస్ట్ ఆఫీస్ = కంప్యూటర్ RAM మెమరీ</strong><br>
          <strong>లాకర్ నంబర్ = మెమరీ అడ్రస్ (Memory Address)</strong><br>
          <strong>లాకర్ కి పెట్టిన పేరు = Variable Name (వేరియబుల్ పేరు)</strong><br>
          <strong>లాకర్ లోపల ఉన్న వస్తువు = Data (వాల్యూ)</strong><br>
          అంటే వేరియబుల్ అనేది మెమరీలో ఉన్న ఒక ప్లేస్ కి మనం పెట్టుకునే ముద్దు పేరు మాత్రమే!
        </p>
      </div>
    </div>

    <!-- 2. Declaration vs Initialization -->
    <div class="section-title"><span class="num">2</span> Declaration మరియు Initialization కి తేడా ఏంటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కంప్యూటర్ కి ముందే మనం ఏ బాక్స్ వాడుతున్నామో చెప్పాలి. డైరెక్ట్ గా వాడుకుంటే ఎర్రర్ వస్తుంది. ఇందులో రెండు స్టెప్స్ ఉంటాయి:
      </p>

      <div class="deep-dive-card">
        <h3>⚡ 1. Declaration (డిక్లరేషన్ - స్థలం బుక్ చేయడం):</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.9;">
          "కంప్యూటర్! నాకు ఒక ఖాళీ డబ్బా కావాలి, దాని పేరు 'age' అని పెడుతున్నాను" అని చెప్పడం. అప్పుడు RAM లో ఒక ఖాళీ జాగా బుక్ అవుతుంది. కానీ అందులో ఏముంటుంది? చెత్త డేటా (Garbage value) ఉంటుంది. <br>
          ఉదాహరణ: <code>int age;</code>
        </p>
        
        <h3 style="margin-top: 15px;">⚡ 2. Initialization (ఇనిషియలైజేషన్ - వస్తువు పెట్టడం):</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.9;">
          మనం బుక్ చేసుకున్న డబ్బాలో మన ఒరిజినల్ డేటా ని పెట్టడం. <br>
          ఉదాహరణ: <code>age = 25;</code>
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Variables Demo</span>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // ఒకేసారి డిక్లరేషన్ మరియు ఇనిషియలైజేషన్ చేయవచ్చు
    int score = 100; // score అనే బాక్స్ లో 100 పెట్టాం
    
    printf("Score: %d\\n", score);
    
    // వాల్యూ మార్చడం (Re-assignment)
    score = 150; // ఇప్పుడు పాత 100 పోయి కొత్త 150 వస్తుంది
    printf("Updated Score: %d\\n", score);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Local vs Global Variables -->
    <div class="section-title"><span class="num">3</span> Local vs Global Variables (స్కోప్ అంటే ఏంటి?)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        వేరియబుల్ ఎక్కడ రాస్తున్నాం అన్నదాన్ని బట్టి అది ఎంతసేపు బ్రతికి ఉంటుంది, దాన్ని ఎవరెవరు వాడుకోవచ్చు అనేది డిసైడ్ అవుతుంది. దీన్నే <strong>Scope (స్కోప్)</strong> అంటారు.
      </p>

      <ul style="color: var(--text); font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.9; margin-bottom: 20px;">
        <li><strong>Local Variable (లోకల్):</strong> ఒక ఫంక్షన్ <code>{}</code> లోపల క్రియేట్ చేసిన వేరియబుల్. ఇది ఆ ఫంక్షన్ వరకు మాత్రమే పరిమితం. ఫంక్షన్ అవ్వగానే ఇది చనిపోతుంది (మెమరీ నుండి డిలీట్ అయిపోతుంది). ఇది మీ ఇంట్లో ఉన్న TV లాంటిది. బయటి వాళ్ళు వచ్చి చూడలేరు.</li>
        <li><strong>Global Variable (గ్లోబల్):</strong> ఫంక్షన్స్ అన్నీటికీ పైన, బయట క్రియేట్ చేసే వేరియబుల్. దీన్ని ప్రోగ్రామ్ లో ఎవరైనా వాడుకోవచ్చు. ఇది వీధిలో ఉన్న పబ్లిక్ పార్క్ లాంటిది. ఎవరైనా వెళ్లొచ్చు.</li>
      </ul>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 2, "Phase 02", "Variables & Data Types", subtopics, contentBody, '01-c-basics-and-program-structure.html', '1. C Fundamentals & Program Architecture', '03-c-data-types-format-specifiers-and-type-casting.html', '3. Data Types, sizeof & Type Casting');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}


function run() {
  buildLesson1();
  buildLesson2();
}

run();
