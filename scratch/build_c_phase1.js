const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// Ensure public/blog-c directory exists
if (!fs.existsSync(cDir)) {
  fs.mkdirSync(cDir, { recursive: true });
}

// C Masterclass Curriculum Structure - ONLY Phase 1 for now (as user requested: define one by one)
const C_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'C Basics & Program Architecture',
    icon: '⚡',
    desc: 'What is C?, History (Dennis Ritchie) & Modern Uses, C Features, C vs C++, C Program Structure, What is a Compiler?, Source Code (.c) vs Executable (.exe), The 4-Stage Compilation Pipeline (Preprocessing, Compiling, Assembling, Linking), First C Program breakdown (#include <stdio.h>, int main(void), printf, \\n, return 0, semicolon, braces, comments), and 3 Error Types (Syntax, Runtime, Logical).',
    lessons: [
      { num: 1, file: '01-c-basics-and-program-structure.html', title: '1. C Fundamentals & Program Architecture', subtopics: 'C ante enti? · History & Uses · Features · C vs C++ · Program Structure · Compiler & 4-Stage Pipeline · First Program Breakdown · Comments, Semicolons & Braces · 3 Error Types' }
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

function wrapCPage(title, desc, filename, currentNum, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateCAccordionSidebar(filename);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — C Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c basics, c compiler, gcc compilation pipeline, main function, printf" />
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
      padding: 18px 22px;
      margin: 20px 0;
    }
    .concept-box h4 {
      color: #10b981;
      margin-bottom: 8px;
      font-size: 15.5px;
      font-weight: 700;
    }
    .concept-box p {
      color: var(--text2);
      font-size: 14.5px;
      line-height: 1.7;
      margin: 0 0 8px 0;
    }
    .concept-box p:last-child {
      margin-bottom: 0;
    }
    .pipeline-diagram {
      background: #0f141c;
      border: 1px solid #27303f;
      border-radius: 10px;
      padding: 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: #38bdf8;
      line-height: 1.8;
      margin: 22px 0;
      overflow-x: auto;
      white-space: pre;
    }
    .anatomy-table td:first-child {
      font-family: 'JetBrains Mono', monospace;
      color: #10b981;
      font-weight: 600;
      white-space: nowrap;
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
      <span class="badge">📂 Phase 01: C Basics & Architecture</span>
      <span class="badge">📅 2026 Edition</span>
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
        <span class="label">Next Topic →</span>
        <span class="title">Phase 2 Coming Next</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 1: C Basics & Architecture ──────────────────────────────
function buildLesson1() {
  const title = "C Basics: History, Features, Compiler Architecture & First Program (తెలుగులో)";
  const desc = "Comprehensive in-depth masterclass on C programming basics: C history (Dennis Ritchie), uses, C vs C++, C program structure, compiler mechanics, source code vs executable, the 4-stage GCC compilation pipeline (Preprocessing, Compiling, Assembling, Linking), step-by-step breakdown of first program (#include, main, printf, \\n, return 0, semicolon), and 3 error types.";
  const filename = "01-c-basics-and-program-structure.html";
  const subtopics = "C అంటే ఏంటి? · హిస్టరీ & ఉపయోగాలు · ఫీచర్స్ · C vs C++ · ప్రోగ్రామ్ స్ట్రక్చర్ · కంపైలర్ & 4-స్టేజ్ పైప్‌లైన్ · మొదటి ప్రోగ్రామ్ బ్రేక్ డౌన్ · కామెంట్స్, సెమికోలన్ & బ్రేసెస్ · 3 ఎర్రర్ రకాలు";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 1: C Language Basics & Program Architecture Masterclass</strong> కు స్వాగతం! 1972 లో Bell Laboratories లో <strong>Dennis Ritchie</strong> ద్వారా డెవలప్ చేయబడిన C లాంగ్వేజ్ ని <em>"మదర్ ఆఫ్ ఆల్ మోడ్రన్ ప్రోగ్రామింగ్ లాంగ్వేజెస్"</em> అంటారు. ఇది C++, Java, C#, JavaScript, PHP, Python మరియు Rust వంటి లాంగ్వేజెస్ కి దారి చూపింది. C లాంగ్వేజ్ స్ట్రక్చర్డ్ లాంగ్వేజ్ యొక్క హై-లెవెల్ రీడబిలిటీ మరియు అసెంబ్లీ లాంగ్వేజ్ యొక్క హార్డ్‌వేర్ కంట్రోల్ ని కలిపి ఇస్తుంది. ఈ గైడ్ లో C అంటే ఏంటి, కోడ్ ని కంపైలర్ ఎలా ఎక్జిక్యూట్ చేస్తుంది, 4-స్టేజ్ కంపైలర్ పైప్‌లైన్ మరియు మొదటి C ప్రోగ్రామ్ యొక్క డీటెయిల్డ్ బ్రేక్ డౌన్ చూద్దాం.</p>
    </div>

    <!-- 1. C Language Ante Enti? History & Uses -->
    <div class="section-title"><span class="num">1</span>C లాంగ్వేజ్ అంటే ఏంటి? హిస్టరీ & ఉపయోగాలు</div>
    <div class="section-body">
      <p><strong>C Language</strong> అనేది ఒక పవర్ఫుల్, జనరల్ పర్పస్, <strong>procedural (structured)</strong> ప్రోగ్రామింగ్ లాంగ్వేజ్. C లాంగ్వేజ్ కంప్యూటర్ హార్డ్వేర్ (CPU registers, RAM addresses) తో డైరెక్ట్ గా ఇంటరాక్ట్ అవ్వగలిగే కేపబిలిటీస్ ని ఇస్తుంది. దీని వల్ల సాఫ్ట్‌వేర్ ప్రపంచంలో C లాంగ్వేజ్ కి ఎవరూ మ్యాచ్ చేయలేని స్పీడ్ మరియు రిసోర్స్ ఎఫిషియెన్సీ ఉంటుంది.</p>

      <div class="concept-box">
        <h4>📜 C హిస్టరీ — Dennis Ritchie & Unix Revolution</h4>
        <p>1972 లో USA లోని Bell Laboratories లో <strong>Dennis Ritchie</strong> అనే లెజెండరీ కంప్యూటర్ సైంటిస్ట్ <strong>Unix Operating System</strong> ని డెవలప్ చేయడానికి C లాంగ్వేజ్ ని డిజైన్ చేసారు. దీనికి ముందు ఉన్న <em>B language</em> (Ken Thompson డిజైన్ చేసింది) మరియు <em>BCPL</em> నుంచి ఇన్స్పిరేషన్ తీసుకుని, కొత్తగా టైప్ సిస్టమ్ మరియు కంపైలర్ ఆప్టిమైజేషన్స్ యాడ్ చేసి దానికి "C" గా పేరు పెట్టారు.<br>
        1973 లో Unix Kernel మొత్తం C లాంగ్వేజ్ లోకి రీరైట్ చేసారు — ఇది కంప్యూటర్ హిస్టరీ లో మొట్టమొదటి పోర్టబుల్ ఆపరేటింగ్ సిస్టమ్ గా చరిత్ర సృష్టించింది!</p>
      </div>

      <div class="concept-box">
        <h4>🌐 2026 లో C లాంగ్వేజ్ ఎక్కడ వాడుతున్నారు?</h4>
        <p>• <strong>Operating System Kernels:</strong> Linux Kernel, Windows NT Kernel, macOS Kernel (XNU), మరియు Android కోర్.<br>
        • <strong>Language Runtimes & Interpreters:</strong> CPython (అఫీషియల్ Python రన్‌టైమ్), V8 Engine (Node.js/Chrome), JVM (Java Virtual Machine కోర్), మరియు Ruby VM.<br>
        • <strong>Databases:</strong> MySQL, PostgreSQL, SQLite, మరియు Redis లాంటి కోర్ డేటాబేస్ ఇంజిన్స్ C లో రాసారు.<br>
        • <strong>Embedded Systems & IoT:</strong> Smart TVs, కార్లలో వాడే ECUs, మెడికల్ డివైజెస్, Microcontrollers, మరియు విమానాల్లో వాడే ఏవియానిక్స్.<br>
        • <strong>Game Engines & Graphics Drivers:</strong> GPU డ్రైవర్స్ (NVIDIA/AMD), Unreal Engine కోర్ మ్యాథ్ లైబ్రరీలు.</p>
      </div>
    </div>

    <!-- 2. Core Features & C vs C++ -->
    <div class="section-title"><span class="num">2</span>C లాంగ్వేజ్ ఫీచర్స్ & C vs C++ తేడాలు</div>
    <div class="section-body">
      <p>50 ఏళ్ళు దాటినా ఇంకా టాప్ టెక్నాలజీ సిస్టమ్స్ లో C లాంగ్వేజ్ ని ఎందుకు వాడుతున్నారో కింద ఫీచర్స్ చూస్తే అర్థమవుతుంది:</p>

      <table class="tbl">
        <tr><th>ఫీచర్ (Feature)</th><th>టెక్నికల్ మీనింగ్ & అడ్వాంటేజ్</th></tr>
        <tr><td><strong>1. Procedural Paradigm</strong></td><td>ప్రోగ్రామ్ అంతా ఫంక్షన్స్ (procedures) గా డివైడ్ అవుతుంది. ఎక్జిక్యూషన్ పైనుంచి కిందికి సీక్వెన్షియల్ గా జరుగుతుంది.</td></tr>
        <tr><td><strong>2. బ్లేజింగ్ ఫాస్ట్ స్పీడ్ (Execution Speed)</strong></td><td>మిగతా లాంగ్వేజెస్ లాగా Garbage Collector పాజెస్ ఉండవు, డైరెక్ట్ గా CPU కి అర్థమయ్యే మెషిన్ కోడ్ కి కంపైల్ అవుతుంది.</td></tr>
        <tr><td><strong>3. లో-లెవెల్ మెమరీ యాక్సెస్ (Pointers)</strong></td><td>హార్డ్‌వేర్ మెమరీ ని డైరెక్ట్ గా పాయింటర్స్ తో కంట్రోల్ చేయొచ్చు, <code>malloc()</code>/<code>free()</code> వాడి డైనమిక్ గా హీప్ మెమరీ ని మేనేజ్ చేయొచ్చు.</td></tr>
        <tr><td><strong>4. హైలీ పోర్టబుల్ (Highly Portable)</strong></td><td>ఒకసారి రాసిన C కోడ్ ని డిఫరెంట్ కంపైలర్స్ ద్వారా ARM, x86, RISC-V లాంటి ఏ చిప్ మీదకైనా కంపైల్ చేసి రన్ చేయొచ్చు.</td></tr>
        <tr><td><strong>5. చిన్న ఫుట్ ప్రింట్ (Minimal Runtime)</strong></td><td>క్రియేట్ అయిన C బైనరీ ఫైల్స్ చాలా చిన్నవిగా ఉంటాయి (కొన్ని కిలోబైట్స్ మాత్రమే), కాబట్టి మైక్రోకంట్రోలర్స్ కి బెస్ట్ ఛాయిస్.</td></tr>
      </table>

      <div class="concept-box">
        <h4>⚔️ C vs C++ — ముఖ్యమైన తేడాలు</h4>
        <p>• <strong>Programming Model:</strong> C పూర్తిగా <strong>Procedural / Structured</strong> (ఫంక్షన్స్ మరియు డేటా వేరుగా ఉంటాయి). C++ అనేది <strong>Object-Oriented Programming (OOP)</strong> కాబట్టి ఇందులో Classes, Objects, Inheritance వాడుకోవచ్చు.<br>
        • <strong>Memory Management:</strong> C లో మెమరీ మేనేజ్ చేయడానికి <code>malloc()</code> మరియు <code>free()</code> వాడతారు. అదే C++ లో <code>new</code> మరియు <code>delete</code> వాడతారు.<br>
        • <strong>Complexity:</strong> C చాలా సింపుల్ లాంగ్వేజ్ (మీరు రాసిందే CPU ఎక్జిక్యూట్ చేస్తుంది). కానీ C++ లో Templates, Exception Handling లాంటి ఎన్నో ఫీచర్స్ ఉండటం వల్ల చాలా కాంప్లెక్స్ గా ఉంటుంది.</p>
      </div>
    </div>

    <!-- 3. C Program Structure & Compiler Pipeline -->
    <div class="section-title"><span class="num">3</span>C ప్రోగ్రామ్ స్ట్రక్చర్ & 4-స్టేజ్ కంపైలేషన్ పైప్‌లైన్</div>
    <div class="section-body">
      <p>ఒక స్టాండర్డ్ C సోర్స్ ఫైల్ స్ట్రక్చర్ 5 భాగాలుగా ఉంటుంది:</p>
      <ol style="margin-left:22px; color:var(--text2); font-size:14.5px; line-height:1.8; margin-bottom:18px;">
        <li><strong>Preprocessor Directives:</strong> <code>#include &lt;stdio.h&gt;</code>, <code>#define MAX 100</code> (కంపైలర్ రన్ అవ్వక ముందే హెడర్ ఫైల్స్ యాడ్ అవుతాయి).</li>
        <li><strong>Function Declarations (Prototypes):</strong> యూజర్ రాసే ఫంక్షన్స్ యొక్క సిగ్నేచర్స్.</li>
        <li><strong>Global Variable Declarations:</strong> ప్రోగ్రామ్ అంతా వాడుకునే వేరియబుల్స్.</li>
        <li><strong>The <code>main()</code> Function:</strong> ప్రతి C ప్రోగ్రామ్ ఇక్కడి నుండే ఎక్జిక్యూషన్ స్టార్ట్ చేస్తుంది.</li>
        <li><strong>User-Defined Function Definitions:</strong> పైన చెప్పిన ఫంక్షన్స్ యొక్క అసలు కోడ్ ఇక్కడ రాస్తాము.</li>
      </ol>

      <div class="concept-box">
        <h4>⚙️ కంపైలర్ అంటే ఏంటి? Source Code (.c) vs Executable (.exe)</h4>
        <p>కంప్యూటర్స్ కి కేవలం <strong>Binary Machine Code (0s and 1s)</strong> మాత్రమే అర్థమవుతుంది. మనం ఇంగ్లీష్ లో రాసే కోడ్ ని <strong>Source Code (<code>.c</code>)</strong> అంటాము. ఈ కోడ్ ని CPU రన్ చేయగలిగే బైనరీ ఫార్మాట్ లోకి <strong>Executable (<code>.exe</code> on Windows / binary on Linux)</strong> మార్చే సాఫ్ట్‌వేర్ నే <strong>Compiler (ఉదా: GCC, Clang, MSVC)</strong> అంటారు.</p>
      </div>

      <div class="pipeline-diagram">
        <strong>The 4-Stage GCC Compilation Pipeline Under the Hood:</strong><br>
        <br>
        [ 1. SOURCE CODE ]      hello.c (మనం రాసిన ఇంగ్లీష్ లాంటి కోడ్)<br>
               │<br>
               ▼ (Preprocessor: gcc -E)<br>
        [ 2. PREPROCESSED CODE ] hello.i (హెడర్స్ యాడ్ అయ్యి, కామెంట్స్ రిమూవ్ అవుతాయి)<br>
               │<br>
               ▼ (Compiler: gcc -S)<br>
        [ 3. ASSEMBLY CODE ]    hello.s (అసెంబ్లీ ఇన్స్ట్రక్షన్స్: mov, add, push)<br>
               │<br>
               ▼ (Assembler: gcc -c)<br>
        [ 4. OBJECT CODE ]      hello.o / hello.obj (కంప్యూటర్ కి అర్థమయ్యే 0s అండ్ 1s)<br>
               │<br>
               ▼ (Linker: gcc -o)<br>
        [ 5. EXECUTABLE BINARY ] hello.exe / ./a.out (రెడీ టు ఎక్జిక్యూట్ బైనరీ ఫైల్!)
      </div>
    </div>

    <!-- 4. First C Program & Line-by-Line Anatomy -->
    <div class="section-title"><span class="num">4</span>మొదటి C ప్రోగ్రామ్ & డీటెయిల్డ్ బ్రేక్ డౌన్</div>
    <div class="section-body">
      <p>ఇదే మీ మొదటి బేసిక్ C ప్రోగ్రామ్:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — First Program (Curriculum Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}</code></pre>
      </div>

      <p style="margin-top:18px;">ఇప్పుడు ఒక్కొక్క లైన్ లోపల టెక్నికల్ గా ఏం జరుగుతుందో చూద్దాం:</p>

      <table class="tbl anatomy-table">
        <tr><th>Syntax Component</th><th>టెక్నికల్ రోల్ & ఎక్స్ప్లనేషన్</th></tr>
        <tr>
          <td><code>#include &lt;stdio.h&gt;</code></td>
          <td>
            • <code>#</code> (Hash): <strong>Preprocessor Directive</strong>. కంపైలింగ్ స్టార్ట్ అవ్వక ముందే రన్ అవుతుంది.<br>
            • <code>include</code>: ఈ ఫైల్ లోపల ఉన్న కోడ్ ని మన ప్రోగ్రామ్ లో కాపీ పేస్ట్ చేయమని చెప్తుంది.<br>
            • <code>&lt;stdio.h&gt;</code>: <strong>Standard Input Output</strong> హెడర్ ఫైల్. ఇందులోనే <code>printf()</code>, <code>scanf()</code> లాంటి ఫంక్షన్స్ ఉంటాయి.<br>
            • Angle brackets <code>&lt; &gt;</code>: సిస్టమ్ లో ఉన్న స్టాండర్డ్ డైరెక్టరీస్ లో ఈ ఫైల్ ని వెతకమని చెప్తాయి.
          </td>
        </tr>
        <tr>
          <td><code>int main(void)</code></td>
          <td>
            • <code>main()</code>: ప్రతి C ప్రోగ్రామ్ ఇక్కడి నుంచే రన్ అవ్వడం స్టార్ట్ చేస్తుంది. OS కాల్ చేసే మొదటి ఫంక్షన్ ఇదే.<br>
            • <code>int</code>: Return type. ప్రోగ్రామ్ సక్సెస్ ఫుల్ గా కంప్లీట్ అయ్యాక OS కి ఒక నెంబర్ (స్టేటస్ కోడ్) రిటర్న్ చేస్తుంది.<br>
            • <code>void</code>: ఈ ఫంక్షన్ ఎటువంటి ఆర్గ్యుమెంట్స్ ని తీసుకోదు అని C స్టాండర్డ్ ప్రకారం కచ్చితంగా చెప్తుంది.
          </td>
        </tr>
        <tr>
          <td><code>printf(...)</code></td>
          <td>
            • <strong>Print Formatted:</strong> C Standard Library (<code>stdio.h</code>) లో ఉండే అవుట్పుట్ ఫంక్షన్.<br>
            • మనం డబుల్ కోట్స్ లో ఇచ్చిన టెక్స్ట్ ని స్క్రీన్ పైన (<code>stdout</code>) చూపిస్తుంది.
          </td>
        </tr>
        <tr>
          <td><code>\\n</code></td>
          <td>
            • <strong>Newline Escape Sequence:</strong> కర్సర్ ని నెక్స్ట్ లైన్ కి తీసుకెళ్తుంది.<br>
            • ⚡ <strong>Buffer Flushing:</strong> C లో అవుట్పుట్ లైన్-బఫర్డ్ గా ఉంటుంది. <code>\\n</code> తగలగానే లోపల ఉన్న డేటా మొత్తం స్క్రీన్ పైన వెంటనే ఫ్లష్ అవుతుంది!
          </td>
        </tr>
        <tr>
          <td><code>return 0;</code></td>
          <td>
            • <strong>Exit Status Code:</strong> ఆపరేటింగ్ సిస్టమ్ కి ప్రోగ్రామ్ సక్సెస్ అయిందా ఫెయిల్ అయిందా అని రిపోర్ట్ ఇస్తుంది.<br>
            • <code>0</code> అంటే <strong>EXIT_SUCCESS</strong> (ఎలాంటి ఎర్రర్ లేకుండా కంప్లీట్ అయ్యింది).<br>
            • వేరే నెంబర్ (ఉదా: <code>1</code>, <code>-1</code>) అయితే ఏదో ప్రాబ్లం వచ్చి ప్రోగ్రామ్ క్రాష్ అయినట్టు OS కి అర్థమవుతుంది.
          </td>
        </tr>
        <tr>
          <td><code>Semicolon ;</code></td>
          <td>
            • <strong>Statement Terminator:</strong> C లాంగ్వేజ్ లో ప్రతి లైన్ (ఇన్స్ట్రక్షన్) చివర్లో కచ్చితంగా సెమికోలన్ <code>;</code> ఉండాలి. లేకపోతే <code>Syntax Error</code> వస్తుంది!
          </td>
        </tr>
        <tr>
          <td><code>Braces { }</code></td>
          <td>
            • <strong>Block Delimiters:</strong> ఫంక్షన్ ఎక్కడి నుండి ఎక్కడి వరకు ఉంది అనేది ఇవి డిసైడ్ చేస్తాయి (దీన్నే Scope అంటారు).
          </td>
        </tr>
      </table>
    </div>

    <!-- 5. Comments & The 3 Error Types -->
    <div class="section-title"><span class="num">5</span>కామెంట్స్ & ముఖ్యమైన 3 ఎర్రర్ రకాలు</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>📝 Comments in C (కామెంట్స్)</h4>
        <p>కోడ్ మనకు ఈజీగా అర్థం కావడానికి కామెంట్స్ వాడుతాం. కంపైల్ చేసేటప్పుడు కంపైలర్ ఈ కామెంట్స్ ని డిలీట్ చేసేస్తుంది కాబట్టి ఎక్జిక్యూషన్ లో ఎలాంటి తేడా ఉండదు:<br>
        • <strong>సింగిల్ లైన్ కామెంట్:</strong> <code>// దిస్ ఈజ్ ఎ సింగిల్ లైన్ కామెంట్</code> (C99+ standard)<br>
        • <strong>మల్టీ లైన్ కామెంట్:</strong> <code>/* దిస్ ఈజ్ ఎ మల్టీ లైన్ కామెంట్ */</code></p>
      </div>

      <div class="concept-box">
        <h4>🛑 The 3 Fundamental Error Types in C</h4>
        <table class="tbl" style="margin-top:10px;">
          <tr><th>ఎర్రర్ రకం (Error Type)</th><th>ఎప్పుడు వస్తుంది?</th><th>ఉదాహరణ (Example)</th><th>ఎలా ఫిక్స్ చేయాలి?</th></tr>
          <tr>
            <td><strong>1. Syntax / Compile-time Error</strong></td>
            <td>C లాంగ్వేజ్ రూల్స్ బ్రేక్ చేసినప్పుడు. కంపైలర్ పసిగట్టి కంపైలేషన్ ఆపేస్తుంది.</td>
            <td>సెమికోలన్ (<code>;</code>) మర్చిపోవడం, బ్రాకెట్ క్లోజ్ చేయకపోవడం, స్పెల్లింగ్ మిస్టేక్స్ (<code>int</code> బదులు <code>intr</code>).</td>
            <td>కంపైలర్ ఇచ్చే లైన్ నంబర్ చూసి కరెక్ట్ చేయాలి.</td>
          </tr>
          <tr>
            <td><strong>2. Runtime Error</strong></td>
            <td>ప్రోగ్రామ్ సక్సెస్ ఫుల్ గా కంపైల్ అయ్యాక రన్ అవుతున్నప్పుడు వస్తుంది.</td>
            <td>జీరో తో డివైడ్ చేయడం (<code>10 / 0</code>), సంబంధం లేని మెమరీ కి యాక్సెస్ చేయడం (Segmentation Fault).</td>
            <td>ప్రోగ్రామ్ లాజిక్ చెక్ చేయాలి, పాయింటర్స్ కరెక్ట్ గా ఉన్నాయా లేదా అని సేఫ్టీ చెక్స్ పెట్టుకోవాలి.</td>
          </tr>
          <tr>
            <td><strong>3. Logical Error (Bug)</strong></td>
            <td>ప్రోగ్రామ్ బాగానే కంపైల్ అయ్యి రన్ అవుతుంది, కానీ <strong>తప్పు (Incorrect) ఆన్సర్</strong> వస్తుంది.</td>
            <td>కలపడానికి బదులు మల్టిప్లై చేయడం <code>total = a * b</code>.</td>
            <td>కోడ్ ఎలా రన్ అవుతుందో పేపర్ మీద డ్రై-రన్ చేసి లేదా ప్రింట్ స్టేట్మెంట్స్ వాడి ఫిక్స్ చేయాలి.</td>
          </tr>
        </table>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Comments & Multiple Output Lines</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

/*
 * C Masterclass - Lesson 01
 * Multi-line program demonstration
 */
int main(void) {
    // Printing welcome banners
    printf("==============================\\n");
    printf("  Welcome to C Masterclass!   \\n");
    printf("  Fast. Low-level. Powerful.  \\n");
    printf("==============================\\n");

    return 0; // Successful exit
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge Box -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Live C Compiler Execution</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ ప్రోగ్రామ్ ని మన ఆన్‌లైన్ హై-పెర్ఫార్మెన్స్ GCC కంపైలర్ లో రన్ చేసి చూడండి:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for C17 / C23 Standard</div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 1, subtopics, contentBody, null, null, null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE blog-c.html HOME PAGE ──────────────────────────────────────────
function buildBlogCHome() {
  const cHomePath = path.join(baseDir, 'blog-c.html');

  let roadmapCardsHtml = '';
  C_CURRICULUM.forEach(phase => {
    roadmapCardsHtml += `
    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">${phase.icon}</span>
          <div>
            <div class="phase-roadmap-tag">${phase.tag}</div>
            <h3 class="phase-roadmap-title">${phase.title}</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Lesson</span>
      </div>
      <p class="phase-roadmap-desc">${phase.desc}</p>
      <div class="phase-lessons-list">
`;

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += `        <a href="/blog-c/${l.file}" class="curriculum-lesson-row">
          <div class="lesson-row-left">
            <span class="lesson-idx">${padIdx}</span>
            <div class="lesson-info">
              <span class="lesson-title">${l.title}</span>
              <span class="lesson-subtopics">${l.subtopics}</span>
            </div>
          </div>
          <div class="lesson-row-right">
            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
          </div>
        </a>\n`;
    });

    roadmapCardsHtml += `      </div>
    </div>\n`;
  });

  const accordionSidebar = generateCAccordionSidebar(null);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, memory management, pointers, and data structures with live runnable code examples." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, pointers in c, c memory management, c programming language" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Accordion Toggle & Theme Script -->
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
      });
    })();
  </script>
</head>
<body class="lang-c">

<!-- TOP NAVIGATION -->
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
    <a href="/blog-c.html" class="sidebar-home-link active">⚡ C Course HOME</a>

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
      <span class="current">C Programming Masterclass</span>
    </div>

    <h1 class="page-title">C Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">⚡ C (C17 / C23 Standard)</span>
      <span class="badge">🟢 Phase-by-Phase Master Curriculum</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Start from the absolute beginning with Phase 1: explore C history, the 4-stage compiler pipeline, program structure, and line-by-line first program anatomy:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Start Phase 1: C Basics & Architecture →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> Master Course Curriculum Roadmap</div>
    <div class="curriculum-roadmap-container">
${roadmapCardsHtml}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on GCC / Clang C17 runtimes · Last updated August 2026</span>
      </div>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(cHomePath, html, 'utf8');
  console.log('✅ Updated public/blog-c.html with Phase 1!');
}

function updateCStyle() {
  const pythonStylePath = path.join(baseDir, 'blog-python', 'style.css');
  const pythonStyle = fs.readFileSync(pythonStylePath, 'utf8');
  const cStylePath = path.join(cDir, 'style.css');
  fs.writeFileSync(cStylePath, pythonStyle, 'utf8');
  console.log('✅ Updated public/blog-c/style.css with unified Emerald Green theme!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 1...');
  updateCStyle();
  buildLesson1();
  buildBlogCHome();
  console.log('🎉 C Phase 1 successfully created!');
}

run();
