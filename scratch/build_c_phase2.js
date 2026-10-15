const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 and Phase 2 (with multiple sub-chapters per phase!)
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
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Variables & Data Types',
    icon: '📦',
    desc: 'Variables ante enti?, RAM Memory Model & Addresses, Declaration vs Initialization vs Assignment, Naming Rules, Local vs Global Variables, Stack Scope & Lifetime, Constants (const vs #define), Primary Types (int, float, double, char, _Bool), Modifiers (short, long, signed, unsigned), Integer Ranges & 2\'s Complement, sizeof Operator, Format Specifiers Master Guide (%d, %u, %f, %lf, %c, %s, %p), and Implicit Coercion vs Explicit Type Casting.',
    lessons: [
      { num: 2, file: '02-c-variables-declaration-and-memory-model.html', title: '2. Variables, Memory Model & Scope', subtopics: 'Variables ante enti? · RAM Memory Model · Declaration, Initialization & Assignment · Naming Rules · Local vs Global Scope · Stack Lifetime · const vs #define' },
      { num: 3, file: '03-c-data-types-format-specifiers-and-type-casting.html', title: '3. Data Types, sizeof & Type Casting', subtopics: 'Primary Types (int, float, double, char, _Bool) · Modifiers (short, long, signed, unsigned) · Integer Ranges · sizeof Operator · Format Specifiers (%d, %u, %f, %lf, %p) · Type Casting' }
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
  <title>${title} — C Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c variables, c data types, c format specifiers, c sizeof, type casting in c" />
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
    .memory-diagram {
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
    .spec-table th {
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
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

// ── BUILD LESSON 2: Variables, Memory Model & Scope ──────────────────────
function buildLesson2() {
  const title = "C Variables, Memory Model, Scope & Constants (తెలుగులో)";
  const desc = "C Variables (Phase 2 Part 1): వేరియబుల్ డిక్లరేషన్, అసైన్‌మెంట్, RAM మెమరీ అడ్రస్‌లు (& ఆపరేటర్), నేమింగ్ రూల్స్, లోకల్ vs గ్లోబల్ స్కోప్, మరియు కాన్స్టాంట్స్ (const vs #define) గురించి తెలుగులో నేర్చుకుందాం.";
  const filename = "02-c-variables-declaration-and-memory-model.html";
  const subtopics = "Variables అంటే ఏంటి? · RAM Memory Model · Declaration, Initialization & Assignment · Naming Rules · Local vs Global Scope · Stack Lifetime · const vs #define";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 2 (Part 1): C Variables, Memory Model, Scope & Constants</strong> కు స్వాగతం! C లాంగ్వేజ్ లో వేరియబుల్స్ అనేవి గాల్లో ఉండే కాన్సెప్ట్స్ కావు — అవి <strong>మీ కంప్యూటర్ RAM మెమరీ లో ఒక ప్లేస్ ని (bytes) డైరెక్ట్ గా రిప్రజెంట్ చేస్తాయి</strong>. C లాంగ్వేజ్ మెమరీ ని ఎలా ఇస్తుంది, స్టాక్ ఫ్రేమ్స్ ఎలా పనిచేస్తాయి, వేరియబుల్స్ లైఫ్ టైం ఏంటి, మరియు కాన్స్టాంట్స్ ఎలా వాడాలి అనేది అర్థం చేసుకుంటే మీరు పాయింటర్స్ ని చాలా ఈజీగా నేర్చేసుకోవచ్చు. ఈ గైడ్ లో, వేరియబుల్ లైఫ్ సైకిల్, మెమరీ అడ్రస్ ఆపరేటర్ (<code>&</code>), లోకల్ vs గ్లోబల్ స్టోరేజ్, మరియు <code>const</code> కి <code>#define</code> కి మధ్య ఉన్న తేడాలని పూర్తిగా నేర్చుకుందాం.</p>
    </div>

    <!-- 1. Variables Ante Enti? RAM Memory Model -->
    <div class="section-title"><span class="num">1</span>Variables అంటే ఏంటి? RAM మెమరీ ఆర్కిటెక్చర్ & అడ్రస్‌లు</div>
    <div class="section-body">
      <p><strong>Variable</strong> ante computer RAM (Random Access Memory) lo data ni store cheyyadaniki allocate chesina <strong>Named Memory Location</strong>. 
      Prati variable ki 3 main attributes untayi:</p>
      <ol style="margin-left:22px; color:var(--text2); font-size:14.5px; line-height:1.8; margin-bottom:14px;">
        <li><strong>Name (Identifier):</strong> మనం కోడ్ లో పిలిచే పేరు (ఉదా: <code>age</code>).</li>
        <li><strong>Type & Size:</strong> ఆ వేరియబుల్ లో స్టోర్ చేసే డేటా రకం (ఉదా: <code>int</code> = RAM లో 4 బైట్స్ తీసుకుంటుంది).</li>
        <li><strong>Memory Address:</strong> RAM లో ఆ వేరియబుల్ ఎక్కడ సేవ్ అయిందో చెప్పే ఒక ఫిజికల్ హెక్సాడెసిమల్ అడ్రస్ (ఉదా: <code>0x7ffee4b1</code>). దీన్ని C లాంగ్వేజ్ లో <strong><code>&amp;variable</code></strong> ఆపరేటర్ తో డైరెక్ట్ గా చూడొచ్చు.</li>
      </ol>

      <div class="memory-diagram">
        <strong>RAM Memory Model — How Variables Live in RAM:</strong><br>
        int age = 21;    (Takes 4 Bytes on Stack Memory)<br>
        <br>
        RAM Address:     0x1000      0x1001      0x1002      0x1003<br>
                         ┌───────────┬───────────┬───────────┬───────────┐<br>
        Byte Data (Hex): │   0x15    │   0x00    │   0x00    │   0x00    │  = 21 in Decimal<br>
                         └───────────┴───────────┴───────────┴───────────┘<br>
                         └───────────────────┬───────────────────┘<br>
                                     Variable Name: "age"<br>
                                     Address (&age): 0x1000
      </div>
    </div>

    <!-- 2. Declaration vs Initialization vs Assignment -->
    <div class="section-title"><span class="num">2</span>Declaration, Initialization & Assignment లైఫ్‌సైకిల్</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్ లో వేరియబుల్స్ క్రియేషన్ అనేది 3 స్టెప్స్ లో జరుగుతుంది:</p>

      <div class="concept-box">
        <h4>1. Declaration (డిక్లరేషన్):</h4>
        <p>కంపైలర్ కి వేరియబుల్ పేరు మరియు దాని డేటా టైప్ చెప్పడం. ఈ స్టేజ్ లో మెమరీ దొరుకుతుంది కానీ మనం ఏ వాల్యూ పెట్టము: <code>int score;</code><br>
        ⚠️ <strong>Garbage Value Warning:</strong> C లో జస్ట్ డిక్లేర్ చేసి వదిలేసిన లోకల్ వేరియబుల్స్ లో RAM లో ముందే ఉన్న చెత్త డేటా (<strong>Garbage Value</strong>) ఉంటుంది! కాబట్టి కచ్చితంగా వాల్యూ ఇవ్వాలి.</p>
      </div>

      <div class="concept-box">
        <h4>2. Initialization (ఇనిషియలైజేషన్):</h4>
        <p>వేరియబుల్ ని క్రియేట్ చేస్తున్నప్పుడే ఫస్ట్ టైమ్ దానికి ఒక వాల్యూ ఇవ్వడం: <code>int score = 100;</code> (మెమరీ అలాకేషన్ + వాల్యూ ఒకేసారి జరుగుతాయి).</p>
      </div>

      <div class="concept-box">
        <h4>3. Assignment (అసైన్‌మెంట్):</h4>
        <p>ఆల్రెడీ క్రియేట్ అయిన వేరియబుల్ లో ఉన్న వాల్యూ ని పీకేసి కొత్త వాల్యూ ని పెట్టడం: <code>score = 250;</code>.</p>
      </div>
    </div>

    <!-- 3. Variable Naming Rules -->
    <div class="section-title"><span class="num">3</span>Variable Naming Rules (రూల్స్)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్ లో పేర్లు (Identifiers) క్రియేట్ చేయడానికి కంపైలర్ కొన్ని స్ట్రిక్ట్ రూల్స్ పెట్టింది:</p>
      <table class="tbl">
        <tr><th>రూల్ (Rule)</th><th>కరెక్ట్ (Valid)</th><th>తప్పు (Invalid)</th></tr>
        <tr><td>కచ్చితంగా ఆల్ఫాబెట్ (a-z, A-Z) లేదా అండర్ స్కోర్ (<code>_</code>) తో స్టార్ట్ అవ్వాలి</td><td><code>int age;</code>, <code>int _count;</code></td><td><code>int 2age;</code> (నంబర్ తో స్టార్ట్ అవ్వకూడదు!)</td></tr>
        <tr><td>అక్షరాలు, నంబర్లు, మరియు అండర్ స్కోర్లు మాత్రమే ఉండాలి</td><td><code>int total_marks1;</code></td><td><code>int total-marks;</code>, <code>int total$</code> (స్పెషల్ క్యారెక్టర్స్ వాడకూడదు!)</td></tr>
        <tr><td>Case Sensitive (<code>age</code> వేరు <code>Age</code> వేరు)</td><td><code>int age = 10; int Age = 20;</code></td><td>అనుకోకుండా కాపిటల్ లెటర్ పెడితే <code>undeclared identifier</code> వస్తుంది.</td></tr>
        <tr><td>C కీవర్డ్స్ ని పేర్లుగా వాడకూడదు (32 Keywords)</td><td><code>int my_return;</code></td><td><code>int return;</code>, <code>int while;</code>, <code>int int;</code> (Keyword error!)</td></tr>
        <tr><td>పేరు మధ్యలో స్పేసెస్ ఉండకూడదు</td><td><code>int student_roll_no;</code></td><td><code>int student roll no;</code> (Syntax Error!)</td></tr>
      </table>
    </div>

    <!-- 4. Local vs Global Variables, Scope & Lifetime -->
    <div class="section-title"><span class="num">4</span>Local vs Global Variables: స్కోప్ & లైఫ్ టైం ఆర్కిటెక్చర్</div>
    <div class="section-body">
      <p>C లో వేరియబుల్ ఎక్కడ డిక్లేర్ చేసాము అనే దాన్ని బట్టి దాని <strong>Scope (ఎక్కడి వరకు యాక్సెస్ చేయగలం)</strong> మరియు <strong>Lifetime (RAM లో ఎంతసేపు ఉంటుంది)</strong> డిసైడ్ అవుతుంది:</p>

      <table class="tbl">
        <tr><th>ప్రాపర్టీ</th><th>Local Variable (Stack Memory)</th><th>Global Variable (Data Segment)</th></tr>
        <tr><td><strong>ఎక్కడ రాస్తారు?</strong></td><td>ఫంక్షన్ లోపల లేదా బ్లాక్ <code>{ ... }</code> లోపల.</td><td>ఫంక్షన్స్ కి బయట (ఫైల్ స్టార్టింగ్ లో).</td></tr>
        <tr><td><strong>Scope (విజిబిలిటీ)</strong></td><td>ఏ బ్లాక్ లో రాసామో ఆ బ్లాక్ లోపల మాత్రమే పనిచేస్తుంది.</td><td>ప్రోగ్రామ్ లో ఎక్కడి నుంచైనా యాక్సెస్ చేయొచ్చు.</td></tr>
        <tr><td><strong>Default Value</strong></td><td><strong>Garbage Value (చెత్త డేటా!)</strong></td><td><strong>Zero (0)</strong> ఆటోమాటిక్ గా ఇనిషియలైజ్ అవుతుంది.</td></tr>
        <tr><td><strong>Lifetime in RAM</strong></td><td>ఫంక్షన్ కాల్ అయినప్పుడు క్రియేట్ అయ్యి; <strong>ఫంక్షన్ అయిపోగానే RAM నుంచి డిలీట్ అవుతుంది!</strong></td><td>ప్రోగ్రామ్ స్టార్ట్ అయినప్పుడు క్రియేట్ అయ్యి; <strong>ప్రోగ్రామ్ క్లోజ్ అయ్యేంత వరకు ఉంటుంది!</strong></td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Local vs Global Scope Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Global Variable (Stored in Data Segment, lives entire program)
int globalCounter = 500;

void testFunction(void) {
    // 2. Local Variable (Created in Stack frame of testFunction)
    int localVal = 10;
    printf("Inside testFunction: localVal = %d, globalCounter = %d\\n", localVal, globalCounter);
} // localVal is destroyed from Stack here!

int main(void) {
    int mainLocal = 100;

    testFunction();
    printf("Inside main: mainLocal = %d, globalCounter = %d\\n", mainLocal, globalCounter);

    // printf("%d", localVal); // ❌ Compile Error: 'localVal' is undeclared in main scope!
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 5. Constants: const vs #define -->
    <div class="section-title"><span class="num">5</span>Constants (కాన్స్టాంట్స్): const Keyword vs #define మ్యాక్రోస్</div>
    <div class="section-body">
      <p>ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు ఒక వేరియబుల్ వాల్యూ అస్సలు చేంజ్ అవ్వకుండా <strong>Read-Only</strong> గా ఉంచాలంటే <strong>Constants</strong> వాడతాము. C లో దీనికి 2 పద్ధతులు ఉన్నాయి:</p>

      <div class="concept-box">
        <h4>1. <code>const</code> Keyword (Type-Safe కంపైలర్ కాన్స్టాంట్)</h4>
        <p><code>const double PI = 3.14159;</code><br>
        • దీనికి కచ్చితమైన డేటా టైప్ ఉంటుంది (కంపైలర్ దాన్ని చెక్ చేస్తుంది).<br>
        • మళ్ళీ వేరే వాల్యూ ఇవ్వాలని ట్రై చేస్తే <code>error: assignment of read-only variable</code> వస్తుంది.</p>
      </div>

      <div class="concept-box">
        <h4>2. <code>#define</code> Preprocessor Macro (టెక్స్ట్ రీప్లేస్‌మెంట్)</h4>
        <p><code>#define MAX_USERS 100</code><br>
        • కంపైల్ అవ్వక ముందే (Preprocessor స్టేజ్ లో) ఆ పేరు ఎక్కడ ఉంటే అక్కడ వాల్యూ పేస్ట్ అయిపోతుంది (మెమరీ తీసుకోదు).<br>
        • దీని చివర్లో సెమికోలన్ <code>;</code> పెట్టకూడదు!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Constants in Action</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

#define APP_VERSION 2.5   // Preprocessor Constant
const int MAX_LIMIT = 500; // Type-Safe const Variable

int main(void) {
    printf("Application Version: %.1f\\n", APP_VERSION);
    printf("Maximum Limit: %d\\n", MAX_LIMIT);

    // MAX_LIMIT = 600; // ❌ Compile Error: Assignment of read-only variable!
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Variables & Memory in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this variable inspection and memory address print program:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int score = 95;
    printf("Score value: %d\\n", score);
    printf("RAM Address of score (&score): %p\\n", (void*)&score);

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

  const html = wrapCPage(title, desc, filename, 2, "Phase 02", "Variables & Data Types", subtopics, contentBody, '01-c-basics-and-program-structure.html', '1. C Fundamentals & Program Architecture', '03-c-data-types-format-specifiers-and-type-casting.html', '3. Data Types, sizeof & Type Casting');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 3: Data Types, Modifiers, sizeof & Type Casting ──────────
function buildLesson3() {
  const title = "C Data Types: Primary, Modifiers, sizeof, Format Specifiers & Type Casting (తెలుగులో)";
  const desc = "C Data Types (Phase 2 Part 2): ప్రైమరీ టైప్స్, మోడిఫైయర్స్ (short, long, signed, unsigned), sizeof ఆపరేటర్, ఫార్మాట్ స్పెసిఫైయర్స్ మరియు టైప్ కాస్టింగ్ గురించి తెలుగులో నేర్చుకుందాం.";
  const filename = "03-c-data-types-format-specifiers-and-type-casting.html";
  const subtopics = "Primary Types (int, float, double, char, _Bool) · Modifiers (short, long, signed, unsigned) · Integer Ranges · sizeof Operator · Format Specifiers (%d, %u, %f, %lf, %p) · Type Casting";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 2 (Part 2): C Data Types, Modifiers, sizeof, Format Specifiers & Type Casting Masterclass</strong> కు స్వాగతం! C అనేది <strong>statically typed language</strong>, అంటే ప్రతి వేరియబుల్ కి ఎంత మెమరీ ఇవ్వాలి ఏ డేటా టైప్ ఇవ్వాలి అనేది కంపైలర్ కి ముందే కచ్చితంగా తెలిసి ఉండాలి. ఈ గైడ్ లో 5 ప్రైమరీ డేటా టైప్స్ (<code>int</code>, <code>float</code>, <code>double</code>, <code>char</code>, <code>_Bool</code>), సైజు ని మార్చే మోడిఫైయర్స్ (<code>short</code>, <code>long</code>, <code>signed</code>, <code>unsigned</code>), <code>sizeof</code> ఆపరేటర్ వాడి మెమరీ కొలవడం, ప్రింట్ చేయడానికి కావలసిన ఫార్మాట్ స్పెసిఫైయర్స్, మరియు టైప్ కాస్టింగ్ (ఒక టైప్ నుంచి ఇంకో టైప్ కి మార్చడం) గురించి తెలుసుకుందాం.</p>
    </div>

    <!-- 1. The 5 Primary Data Types & Modifiers -->
    <div class="section-title"><span class="num">1</span>5 ప్రైమరీ డేటా టైప్స్ & టైప్ మోడిఫైయర్స్ (short, long, signed, unsigned)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్ లో 5 బేసిక్ డేటా టైప్స్ మరియు వాటి సైజులు/రేంజ్ మార్చుకోవడానికి 4 మోడిఫైయర్స్ ఉన్నాయి:</p>

      <table class="tbl spec-table">
        <tr><th>డేటా టైప్</th><th>RAM లో సైజు (సుమారుగా)</th><th>వాల్యూ రేంజ్ (64-bit OS లో)</th><th>Format Specifier</th></tr>
        <tr><td><strong><code>char</code></strong></td><td>1 Byte (8 bits)</td><td>-128 to +127 (or 0 to 255 if unsigned)</td><td><code>%c</code></td></tr>
        <tr><td><strong><code>int</code></strong></td><td>4 Bytes (32 bits)</td><td>-2,147,483,648 to +2,147,483,647</td><td><code>%d</code> or <code>%i</code></td></tr>
        <tr><td><strong><code>unsigned int</code></strong></td><td>4 Bytes (32 bits)</td><td>0 to 4,294,967,295 (Zero negatives, 2x positive!)</td><td><code>%u</code></td></tr>
        <tr><td><strong><code>short int</code></strong></td><td>2 Bytes (16 bits)</td><td>-32,768 to +32,767</td><td><code>%hd</code></td></tr>
        <tr><td><strong><code>long long int</code></strong></td><td>8 Bytes (64 bits)</td><td>$-2^{63}$ to $+2^{63}-1$ ($\approx \pm 9.22 \times 10^{18}$)</td><td><code>%lld</code></td></tr>
        <tr><td><strong><code>float</code></strong></td><td>4 Bytes (32 bits)</td><td>$\approx \pm 3.4 \times 10^{38}$ (6-7 decimal precision digits)</td><td><code>%f</code></td></tr>
        <tr><td><strong><code>double</code></strong></td><td>8 Bytes (64 bits)</td><td>$\approx \pm 1.7 \times 10^{308}$ (15-17 decimal precision digits)</td><td><code>%lf</code> (in scanf) / <code>%f</code> (printf)</td></tr>
        <tr><td><strong><code>_Bool</code></strong> (C99+)</td><td>1 Byte</td><td><code>0</code> (false) or <code>1</code> (true) (<code>&lt;stdbool.h&gt;</code>)</td><td><code>%d</code></td></tr>
      </table>

      <div class="concept-box">
        <h4>💡 signed vs unsigned తేడా ఏంటి?</h4>
        <p>• <strong><code>signed</code> (డిఫాల్ట్):</strong> ఫస్ట్ బిట్ ని ప్లస్/మైనస్ (Sign bit) గుర్తు పెట్టుకోవడానికి వాడుతుంది. కాబట్టి పాజిటివ్ మరియు నెగటివ్ నంబర్స్ రెండూ స్టోర్ చేయొచ్చు.<br>
        • <strong><code>unsigned</code>:</strong> ఇందులో అసలు మైనస్ వాల్యూస్ ఉండవు. ఫస్ట్ బిట్ ని కూడా నంబర్ కోసమే వాడుతుంది కాబట్టి, <strong>పాజిటివ్ రేంజ్ కి డబుల్ కెపాసిటీ వస్తుంది</strong>!</p>
      </div>
    </div>

    <!-- 2. The sizeof Operator -->
    <div class="section-title"><span class="num">2</span>The sizeof Operator (మెమరీ సైజు ని కొలవడం)</div>
    <div class="section-body">
      <p><strong><code>sizeof</code></strong> ఆపరేటర్ అనేది <strong>compile time</strong> లోనే రన్ అవుతుంది. ఏ డేటా టైప్ RAM లో ఎన్ని బైట్స్ స్పేస్ తీసుకుంటుందో ఇది కచ్చితంగా చెప్తుంది (దీన్ని ప్రింట్ చేయడానికి <code>%zu</code> లేదా <code>%lu</code> వాడాలి):</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — sizeof Inspection Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

int main(void) {
    printf("sizeof(char):        %zu byte\\n", sizeof(char));
    printf("sizeof(short):       %zu bytes\\n", sizeof(short));
    printf("sizeof(int):         %zu bytes\\n", sizeof(int));
    printf("sizeof(long long):   %zu bytes\\n", sizeof(long long));
    printf("sizeof(float):       %zu bytes\\n", sizeof(float));
    printf("sizeof(double):      %zu bytes\\n", sizeof(double));
    printf("sizeof(bool):        %zu byte\\n", sizeof(bool));

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Format Specifiers Master Guide -->
    <div class="section-title"><span class="num">3</span>Format Specifiers మాస్టర్ గైడ్ ⭐</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్ లో <code>printf()</code> మరియు <code>scanf()</code> వాడేటప్పుడు వేరియబుల్స్ ని కరెక్ట్ గా అర్థం చేసుకోవడానికి <strong>Format Specifiers (<code>%</code> తో మొదలయ్యేవి)</strong> వాడాలి:</p>

      <table class="tbl spec-table">
        <tr><th>Format Specifier</th><th>ఏ డేటా కి వాడుతారు?</th><th>ఉదాహరణ</th><th>అవుట్పుట్</th></tr>
        <tr><td><strong><code>%d</code></strong> or <strong><code>%i</code></strong></td><td>signed <code>int</code></td><td><code>printf("%d", 42);</code></td><td><code>42</code></td></tr>
        <tr><td><strong><code>%u</code></strong></td><td><code>unsigned int</code></td><td><code>printf("%u", 4000000000U);</code></td><td><code>4000000000</code></td></tr>
        <tr><td><strong><code>%c</code></strong></td><td>single <code>char</code></td><td><code>printf("%c", 'A');</code></td><td><code>A</code></td></tr>
        <tr><td><strong><code>%s</code></strong></td><td>String (character array)</td><td><code>printf("%s", "Hello");</code></td><td><code>Hello</code></td></tr>
        <tr><td><strong><code>%f</code></strong></td><td><code>float</code> (or <code>double</code> in printf)</td><td><code>printf("%.2f", 5.857f);</code></td><td><code>5.86</code> (Rounded to 2 decimals)</td></tr>
        <tr><td><strong><code>%lf</code></strong></td><td><code>double</code> (Compulsory in <code>scanf</code>)</td><td><code>scanf("%lf", &amp;price);</code></td><td>Reads 64-bit double</td></tr>
        <tr><td><strong><code>%p</code></strong></td><td>Pointer / Memory Address</td><td><code>printf("%p", (void*)&amp;age);</code></td><td><code>0x7ffee4b1a8</code> (Hex address)</td></tr>
        <tr><td><strong><code>%x</code> / <code>%X</code></strong></td><td>Hexadecimal integer</td><td><code>printf("%X", 255);</code></td><td><code>FF</code></td></tr>
        <tr><td><strong><code>%%</code></strong></td><td>Literal percent sign <code>%</code></td><td><code>printf("100%%");</code></td><td><code>100%</code></td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Example</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char grade = 'A';
    int age = 21;
    float height = 5.8f;
    double price = 99.99;

    printf("Grade: %c\\n", grade);
    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Price: %.2f\\n", price);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 4. Type Conversion vs Type Casting -->
    <div class="section-title"><span class="num">4</span>Type Conversion (ఆటోమాటిక్) vs Type Casting (మాన్యువల్)</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>1. Implicit Type Conversion (ఆటోమాటిక్ ప్రమోషన్)</h4>
        <p>ఒక ఫార్ములా లో వేర్వేరు సైజులు ఉన్న డేటా టైప్స్ కలిస్తే, కంపైలర్ ఆటోమాటిక్ గా చిన్న దాన్ని పెద్ద దాని లాగా ప్రమోట్ చేస్తుంది (Widening అంటారు):<br>
        <code>int a = 5; double b = 2.5; double result = a + b; // 'a' ఆటోమాటిక్ గా 5.0 గా మారిపోయి (result = 7.5) వస్తుంది.</code></p>
      </div>

      <div class="concept-box">
        <h4>2. Explicit Type Casting (<code>(type)value</code> వాడి మార్చడం)</h4>
        <p>ఒక డేటా టైప్ ని ఫోర్స్ చేసి ఇంకో లాగా మార్చడాన్ని టైప్ కాస్టింగ్ అంటారు:<br>
        ⚠️ <strong>Integer Division Trap:</strong> <code>int a = 5, b = 2; float div = a / b;</code> అని రాస్తే <code>2.0</code> వస్తుంది (ఎందుకంటే రెండు ఇంటీజర్స్ డివైడ్ అయితే డెసిమల్స్ కట్ అవుతాయి!).<br>
        ✅ <strong>Fixed with Cast:</strong> దీన్ని ఫిక్స్ చేయడానికి కనీసం ఒక దాన్ని ఫ్లోట్ లాగా మార్చాలి <code>float div = (float)a / b;</code> అప్పుడు కరెక్ట్ గా <code>2.5</code> వస్తుంది!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Type Casting Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int totalMarks = 475;
    int totalSubjects = 5;

    // Integer division trap vs Explicit Casting
    double wrongAvg = totalMarks / totalSubjects;        // 95.0
    double exactAvg = (double)totalMarks / totalSubjects; // 95.0

    int num1 = 7, num2 = 2;
    printf("7 / 2 without cast (Integer division): %d\\n", num1 / num2); // 3
    printf("7 / 2 WITH cast ((float)7 / 2):        %.2f\\n", (float)num1 / num2); // 3.50

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Data Types in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this complete data types and format specifiers program in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char grade = 'A';
    int age = 21;
    float height = 5.8f;
    double price = 99.99;

    printf("Grade: %c\\n", grade);
    printf("Age: %d\\n", age);
    printf("Height: %.1f\\n", height);
    printf("Price: %.2f\\n", price);

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

  const html = wrapCPage(title, desc, filename, 3, "Phase 02", "Variables & Data Types", subtopics, contentBody, '02-c-variables-declaration-and-memory-model.html', '2. Variables, Memory Model & Scope', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE LESSON 1 to link to Lesson 2 ───────────────────────────────────
function updateLesson1() {
  const file1 = path.join(cDir, '01-c-basics-and-program-structure.html');
  const title = "C Basics: History, Features, Compiler Architecture & First Program";
  const desc = "Comprehensive in-depth masterclass on C programming basics: C history (Dennis Ritchie), uses, C vs C++, C program structure, compiler mechanics, source code vs executable, the 4-stage GCC compilation pipeline, and 3 error types.";
  const subtopics = "C ante enti? · History & Uses · Features · C vs C++ · Program Structure · Compiler & 4-Stage Pipeline · First Program Breakdown · Comments, Semicolons & Braces · 3 Error Types";

  // Read original body
  const currentContent = fs.readFileSync(file1, 'utf8');
  const bodyMatch = currentContent.match(/<div class="intro-box">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="try-box">[\s\S]*?<\/div>\s*<div class="author">[\s\S]*?<\/div>/);
  
  // Extract body between breadcrumb/page-meta and nav-footer
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '01-c-basics-and-program-structure.html', 1, "Phase 01", "C Basics & Architecture", subtopics, contentBody, null, null, '02-c-variables-declaration-and-memory-model.html', '2. Variables, Memory Model & Scope');
  fs.writeFileSync(file1, html, 'utf8');
  console.log('✅ Updated 01-c-basics-and-program-structure.html next links!');
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
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Chapter${phase.lessons.length > 1 ? 's' : ''}</span>
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
      <span class="badge">🟢 3 In-Depth Sub-Chapters</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, memory models, variables, data types, format specifiers, and type casting:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables & Memory →</a>
        <a href="/blog-c/03-c-data-types-format-specifiers-and-type-casting.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Data Types & sizeof →</a>
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
  console.log('✅ Updated public/blog-c.html with Phase 1 and Phase 2 (3 Chapters)!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 2 (Multiple Sub-Chapters)...');
  buildLesson2();
  buildLesson3();
  updateLesson1();
  buildBlogCHome();
  console.log('🎉 C Phase 2 successfully created with sub-chapters!');
}

run();
