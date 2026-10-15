const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 5 (with multiple sub-chapters per phase!)
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
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Input & Operators',
    icon: '⚡',
    desc: 'User Input with scanf(), Address operator (&), Reading ints, floats, chars, and strings, Input buffer problems (newline pitfall) & fixes, fgets() for safe string reading, Input validation, Arithmetic, Relational, Logical (short-circuit), Increment/Decrement (prefix vs postfix), Bitwise operators, Ternary operator, Precedence & Associativity Table, Integer Division, and 6 Practice Programs.',
    lessons: [
      { num: 4, file: '04-c-user-input-scanf-and-buffer-handling.html', title: '4. User Input (scanf, fgets & Buffer Traps)', subtopics: 'scanf() Mechanics · Address Operator (&) · Reading Primitives & Strings · Stdin Buffer Pitfall (\\n) · fgets() Safe Text Input · Input Validation' },
      { num: 5, file: '05-c-operators-expressions-and-precedence.html', title: '5. Operators, Precedence & 6 Programs', subtopics: 'Arithmetic & Modulus · Relational & Logical · Prefix vs Postfix (++x/x++) · Bitwise · Ternary · Precedence Table · 6 Practice Programs' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Conditional Statements & Branching',
    icon: '🔀',
    desc: 'if, if-else, else-if ladders, nested if, multiple conditions with logical AND/OR/NOT, short-circuit evaluation, ternary expressions, switch-case-break-default, jump table mechanics, fall-through behavior, character comparisons, common condition mistakes (if (x = 5), dangling else), and 7 practice programs.',
    lessons: [
      { num: 6, file: '06-c-conditional-branching-if-else-and-logical-operators.html', title: '6. if-else Ladders, Nested if & Logical Logic', subtopics: 'Boolean Truth in C · if, if-else & else-if · Nested if & Guard Clauses · Logical Operators & Short-Circuit · Ternary · Comparing Chars · Common Traps' },
      { num: 7, file: '07-c-switch-case-and-decision-practice-programs.html', title: '7. switch-case, Fall-Through & 7 Programs', subtopics: 'switch-case Mechanics · Jump Tables · break & default · Fall-Through Behavior · if-else vs switch · 7 Practice Programs (Leap Year, Calculator, Largest of 3)' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Loops & Iterations',
    icon: '🔁',
    desc: 'Why loops are needed, The 3 Pillars (Init, Condition, Update), for loop, entry-controlled while loop, exit-controlled do-while loop, break and continue jump controls, infinite loop causes and fixes, nested loops & grid coordinates, array/string iteration, and 9 core practice algorithms (Factorial, Fibonacci, Prime, Armstrong, Reverse, Digits, Star & Number Patterns).',
    lessons: [
      { num: 8, file: '08-c-loops-for-while-do-while-and-control-flow.html', title: '8. for, while, do-while, break & continue', subtopics: 'Why Loops are Needed · 3 Pillars of a Loop · for Loop Mechanics · while vs do-while · break & continue · Infinite Loops · Array & String Traversal' },
      { num: 9, file: '09-c-nested-loops-patterns-and-practice-programs.html', title: '9. Nested Loops, Patterns & 9 Core Programs', subtopics: 'Nested Loops Architecture · Star Patterns (Triangles, Pyramids) · Number Patterns · 9 Practice Programs (Prime, Armstrong, Fibonacci, Factorial, Reverse)' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c for loop, c while loop, c do while, c prime number, c fibonacci, c star patterns" />
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
    .loop-diagram {
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

// ── BUILD LESSON 8: for, while, do-while, break & continue ───────────────
function buildLesson8() {
  const title = "C Loops: for, while, do-while, break, continue & Control Flow (తెలుగులో)";
  const desc = "C Loops (Phase 5 Part 1): C లో లూప్స్ ఎందుకు వాడాలి, for loop, while మరియు do-while లూప్స్ ఎలా పనిచేస్తాయి, వాటి మధ్య తేడాలు, break మరియు continue ఎప్పుడు వాడాలి, infinite loop ప్రాబ్లమ్స్ గురించి తెలుగులో నేర్చుకుందాం.";
  const filename = "08-c-loops-for-while-do-while-and-control-flow.html";
  const subtopics = "Why Loops are Needed · 3 Pillars of a Loop · for Loop Mechanics · while vs do-while · break & continue · Infinite Loops · Array & String Traversal";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 5 (Part 1): C Loops & Control Flow Masterclass</strong> కు స్వాగతం! ప్రోగ్రామింగ్ లో ఒకే పనిని మళ్ళీ మళ్ళీ రాయడాన్ని తప్పుగా భావిస్తారు (DRY - Don't Repeat Yourself). <strong>లూప్స్ (Loops)</strong> ని వాడితే, కంప్యూటర్ ఒకే పనిని ఏమాత్రం తప్పు లేకుండా లక్షల సార్లు చాలా ఫాస్ట్ గా చేయగలదు. ఈ గైడ్ లో, ప్రతి లూప్ కు ఉండే 3 ముఖ్యమైన పిల్లర్స్, <code>for</code> లూప్ ఎలా పనిచేస్తుంది, <code>while</code> కి <code>do-while</code> కి ఉన్న తేడా ఏంటి, లూప్ మధ్యలో ఆపడానికి వాడే <code>break</code> మరియు <code>continue</code>, అలాగే మన ప్రోగ్రామ్ ని హ్యాంగ్ చేసే infinite loop ప్రాబ్లం రాకుండా ఎలా చూసుకోవాలో తెలుగులో నేర్చుకుందాం.</p>
    </div>

    <!-- 1. The 3 Pillars of Every Loop -->
    <div class="section-title"><span class="num">1</span>లూప్స్ ఎందుకు కావాలి? &amp; ప్రతి లూప్ కి ఉండే 3 పిల్లర్స్</div>
    <div class="section-body">
      <p>ఒక పనిని వెయ్యి సార్లు మ్యాన్యువల్ గా కోడ్ రాయకుండా, ఆటోమేటిక్ గా ఒకే లైన్ తో రన్ చేయడానికే లూప్స్ వాడతాము. 
      ప్రపంచంలో ఏ ప్రోగ్రామింగ్ లాంగ్వేజ్ లో అయినా లూప్ రన్ అవ్వాలి అంటే ఈ <strong>3 రూల్స్ (పిల్లర్స్)</strong> కచ్చితంగా ఉండాలి:</p>

      <ol style="margin-left:22px; color:var(--text2); font-size:14.5px; line-height:1.8; margin-bottom:14px;">
        <li><strong>1. Initialization (స్టార్టింగ్ పాయింట్):</strong> లూప్ ఎక్కడ మొదలవ్వాలో చెప్పడం (ఉదాహరణకి <code>int i = 1;</code>).</li>
        <li><strong>2. Condition (ఎక్కడ ఆగాలో చెప్పడం):</strong> ప్రతిసారీ చెక్ చేసే కండిషన్ (ఉదాహరణకి <code>i &lt;= 10;</code>). ఇది నిజం అయినంత కాలం లూప్ రన్ అవుతూనే ఉంటుంది.</li>
        <li><strong>3. Update (ముందుకు వెళ్లడం):</strong> స్టార్టింగ్ పాయింట్ ని కండిషన్ వైపుకి జరపడం (ఉదాహరణకి <code>i++</code>). ఇది రాయకపోతే లూప్ ఎప్పటికీ ఆగిపోదు (Infinite Loop వస్తుంది)!</li>
      </ol>

      <div class="loop-diagram">
        <strong>for Loop రన్ అయ్యే 4 స్టెప్స్:</strong><br>
        for ( [1. స్టార్టింగ్] ; [2. కండిషన్ చెక్] ; [4. అప్డేట్] ) {<br>
             [3. లోపల ఉన్న కోడ్ రన్ అవుతుంది];<br>
        }<br>
        <br>
        ఎలా రన్ అవుతుంది: [1. స్టార్ట్] ──► [2. చెక్] (TRUE) ──► [3. లోపల కోడ్ రన్] ──► [4. అప్డేట్] ──► [మళ్ళీ 2. చెక్...]
      </div>
    </div>

    <!-- 2. for Loop & User Curriculum Example -->
    <div class="section-title"><span class="num">2</span>The for Loop (ఎన్ని సార్లు రన్ అవ్వాలో తెలిసినప్పుడు)</div>
    <div class="section-body">
      <p>ఒక పని కచ్చితంగా ఇన్ని సార్లు జరగాలి అని మనకు ముందే తెలిసినప్పుడు <code>for</code> లూప్ వాడటం బెస్ట్ చాయిస్. కౌంటర్ వేరియబుల్ (i) ని డైరెక్ట్ గా ఆ లూప్ లోనే క్రియేట్ చేయొచ్చు:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Example</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // Prints numbers from 1 to 5
    for (int number = 1; number &lt;= 5; number++) {
        printf("%d\\n", number);
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. while vs do-while Loops -->
    <div class="section-title"><span class="num">3</span>while మరియు do-while Loops మధ్య తేడా</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>లూప్ పేరు</th><th>కండిషన్ ఎప్పుడు చెక్ చేస్తుంది?</th><th>కనీసం ఎన్ని సార్లు రన్ అవుతుంది?</th><th>రియల్ టైం లో ఎప్పుడు వాడతారు?</th></tr>
        <tr>
          <td><strong><code>while</code> Loop</strong></td>
          <td><strong>ఫస్ట్ చెకింగ్:</strong> లోపల ఉన్న కోడ్ రన్ అవ్వక <em>ముందే</em> కండిషన్ చెక్ చేస్తుంది.</td>
          <td><strong>0 సార్లు</strong> (ఫస్ట్ టైమే కండిషన్ ఫెయిల్ అయితే అస్సలు రన్ అవ్వదు).</td>
          <td>ఫైల్స్ రీడ్ చేయడానికి, ఎన్ని సార్లు రన్ అవ్వాలో తెలియనప్పుడు వాడతారు.</td>
        </tr>
        <tr>
          <td><strong><code>do-while</code> Loop</strong></td>
          <td><strong>లాస్ట్ లో చెకింగ్:</strong> లోపల ఉన్న కోడ్ రన్ అయ్యాక <em>చివర్లో</em> కండిషన్ చెక్ చేస్తుంది.</td>
          <td><strong>కనీసం 1 సారి</strong> (కండిషన్ ముందే అబద్ధమైనా సరే ఒకసారైతే పక్కాగా రన్ అవుతుంది!).</td>
          <td>యూజర్ కి ఒకసారైనా మెనూ చూపించాల్సిన అవసరం ఉన్నప్పుడు (ATM మెనూ లాంటివి).</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — while vs do-while Comparison</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int count = 10;

    // while loop: condition is false (10 < 5), so body executes 0 times!
    while (count &lt; 5) {
        printf("This while loop will NEVER print.\\n");
        count++;
    }

    // do-while loop: body executes 1 time BEFORE checking condition!
    int val = 10;
    do {
        printf("do-while executes at least once! (val = %d)\\n", val);
        val++;
    } while (val &lt; 5); // ⚠️ Note the mandatory semicolon ';' at the end!

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 4. break, continue & Traversing Arrays/Strings -->
    <div class="section-title"><span class="num">4</span>break vs continue (లూప్ ని కంట్రోల్ చేయడం)</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⚡ break మరియు continue అంటే ఏంటి?</h4>
        <p>• <strong><code>break;</code> (బ్రేక్ వేయడం):</strong> లూప్ ని అక్కడికక్కడే ఆపేసి, మొత్తానికి లూప్ లోపలి నుండి బయటికి వచ్చేస్తుంది (కావాల్సిన ఆన్సర్ దొరికాక టైం వేస్ట్ కాకుండా బయటికి రావడానికి).<br>
        • <strong><code>continue;</code> (స్కిప్ చేయడం):</strong> దీని కింద ఉన్న కోడ్ ని రన్ చేయకుండా ఆపేసి, దాన్ని స్కిప్ చేసి డైరెక్ట్ గా నెక్స్ట్ రౌండ్ కి వెళ్ళిపోతుంది.</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — String & Array Traversal with Loops</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char message[] = "Hello C!";
    int scores[] = {85, 92, 40, 78, 95};
    int size = sizeof(scores) / sizeof(scores[0]);

    // 1. Looping through string until null-terminator '\\0'
    printf("Characters in message: ");
    for (int i = 0; message[i] != '\\0'; i++) {
        printf("[%c] ", message[i]);
    }
    printf("\\n");

    // 2. Looping through array with continue (skip failing grades < 50)
    printf("Passing Scores: ");
    for (int i = 0; i &lt; size; i++) {
        if (scores[i] &lt; 50) {
            continue; // Skip failing score
        }
        printf("%d ", scores[i]);
    }
    printf("\\n");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Loops in Live C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this 1 to 20 even number accumulator loop in our online C compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int sum = 0;
    for (int i = 1; i &lt;= 20; i++) {
        if (i % 2 == 0) {
            sum += i;
        }
    }
    printf("Sum of even numbers (1 to 20) = %d\\n", sum);
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

  const html = wrapCPage(title, desc, filename, 8, "Phase 05", "Loops & Iterations", subtopics, contentBody, '07-c-switch-case-and-decision-practice-programs.html', '7. switch-case, Fall-Through & 7 Programs', '09-c-nested-loops-patterns-and-practice-programs.html', '9. Nested Loops, Patterns & 9 Core Programs');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 9: Nested Loops, Patterns & 9 Core Practice Programs ─────
function buildLesson9() {
  const title = "C Nested Loops, Star Patterns & 9 Core Programs (తెలుగులో)";
  const desc = "C Nested Loops (Phase 5 Part 2): Nested Loops అంటే ఏంటి, Star Patterns ని ఎలా ప్రింట్ చేయాలి, Number Patterns లాజిక్, మరియు 9 ముఖ్యమైన ప్రాక్టికల్ అల్గారిథమ్స్ గురించి తెలుగులో నేర్చుకుందాం.";
  const filename = "09-c-nested-loops-patterns-and-practice-programs.html";
  const subtopics = "Nested Loops Architecture · Star Patterns (Triangles, Pyramids) · Number Patterns · 9 Practice Programs (Prime, Armstrong, Fibonacci, Factorial, Reverse)";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 5 (Part 2): C Nested Loops & Pattern Printing Masterclass</strong> కు స్వాగతం! ఒక లూప్ లోపల ఇంకో లూప్ ని రాయడాన్ని Nested Loops అంటారు. 2D మ్యాట్రిక్స్, ఇమేజ్ పిక్సెల్స్, గేమ్ బోర్డ్స్, లేదా డిజైన్స్ ని క్రియేట్ చేయడానికి ఇవి చాలా ముఖ్యం. ఈ గైడ్ లో, ఒక లూప్ లోపల ఇంకో లూప్ ఎలా తిరుగుతుంది $(i, j)$, స్టార్ డిజైన్స్ (Star Patterns) ని ఎలా ప్రింట్ చేయాలి, మరియు ఇంటర్వ్యూస్ లో ఎక్కువగా అడిగే <strong>9 ముఖ్యమైన రియల్-వరల్డ్ ప్రోగ్రామ్స్</strong> ని సొంతంగా ఎలా రాయాలో తెలుగులో నేర్చుకుందాం.</p>
    </div>

    <!-- 1. Nested Loops 2D Coordinate Mental Model -->
    <div class="section-title"><span class="num">1</span>Nested Loops ఎలా రన్ అవుతాయి? (2D మోడల్)</div>
    <div class="section-body">
      <p>Nested loop లో, <strong>బయట ఉన్న లూప్ (Outer Loop)</strong> అడ్డు వరుసలని (Rows) కంట్రోల్ చేస్తుంది, మరియు <strong>లోపల ఉన్న లూప్ (Inner Loop)</strong> నిలువు వరుసలని (Columns) కంట్రోల్ చేస్తుంది. బయటి లూప్ ఒకసారి రన్ అయితే, లోపలి లూప్ పూర్తిగా దాని సైకిల్ అంతా రన్ అవుతుంది:</p>

      <div class="loop-diagram">
        <strong>2D Matrix Coordinates (Outer Loop i = Rows, Inner Loop j = Columns):</strong><br>
        Row 0:  (0,0)   (0,1)   (0,2)   (0,3)<br>
        Row 1:  (1,0)   (1,1)   (1,2)   (1,3)<br>
        Row 2:  (2,0)   (2,1)   (2,2)   (2,3)<br>
        <br>
        Time Complexity: O(Rows * Cols)
      </div>
    </div>

    <!-- 2. Star & Number Patterns -->
    <div class="section-title"><span class="num">2</span>Star మరియు Number Patterns ని ప్రింట్ చేయడం</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⭐ పాటర్న్స్ ని ప్రింట్ చేయడానికి లాజిక్:</h4>
        <p>1. <strong>బయటి లూప్ <code>i</code>:</strong> మొత్తం ఎన్ని అడ్డు వరుసలు (Rows) ఉన్నాయో ట్రాక్ చేస్తుంది.<br>
        2. <strong>లోపలి లూప్ <code>j</code>:</strong> ఆ లైన్ లో ఎన్ని స్టార్స్ లేదా నంబర్స్ ప్రింట్ అవ్వాలో డిసైడ్ చేస్తుంది.<br>
        3. <strong><code>printf("\\n")</code>:</strong> లోపలి లూప్ ఆగిపోగానే (ఆ లైన్ అయిపోగానే) నెక్స్ట్ లైన్ కి రావడానికి ఇది వాడతాం.</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Star Triangle, Inverted Triangle & Number Pattern</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void printPatterns(int n) {
    // 1. Right-Angled Star Triangle
    printf("1. Right-Angled Star Triangle:\\n");
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    // 2. Inverted Star Triangle
    printf("\\n2. Inverted Star Triangle:\\n");
    for (int i = n; i &gt;= 1; i--) {
        for (int j = 1; j &lt;= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }

    // 3. Number Half-Pyramid
    printf("\\n3. Number Triangle:\\n");
    for (int i = 1; i &lt;= n; i++) {
        for (int j = 1; j &lt;= i; j++) {
            printf("%d ", j);
        }
        printf("\\n");
    }
}

int main(void) {
    printPatterns(4);
    return 0;
}</code></pre>
        </div>
    </div>

    <!-- 3. The 9 Core Practice Algorithms -->
    <div class="section-title"><span class="num">3</span>9 ముఖ్యమైన ప్రాక్టికల్ ప్రోగ్రామ్స్ (ఫార్ములాస్ తో పాటు)</div>
    <div class="section-body">
      <p>ప్రతి ప్రోగ్రామర్ కచ్చితంగా నేర్చుకోవాల్సిన 9 ముఖ్యమైన ప్రోగ్రామ్స్ అల్గారిథమ్స్ ఇక్కడ ఇచ్చాం:</p>

      <div class="concept-box">
        <h4>📌 ఈ ప్రోగ్రామ్స్ లో వాడే లాజిక్ ఫార్ములాస్:</h4>
        <p>• <strong>N నంబర్స్ మొత్తం:</strong> $Sum = \sum i$<br>
        • <strong>ఫ్యాక్టోరియల్ (Factorial):</strong> $N! = 1 \times 2 \times \dots \times N$ (సున్నా ఫ్యాక్టోరియల్ అంటే 1)<br>
        • <strong>నంబర్ రివర్స్ (Reverse Number):</strong> $rev = rev \times 10 + (n \pmod{10})$; $n /= 10$<br>
        • <strong>ప్రైమ్ నంబర్ (Prime Number):</strong> కేవలం 1 తో మరియు అదే నంబర్ తో భాగించబడేది.<br>
        • <strong>ఆర్మ్‌స్ట్రాంగ్ నంబర్ (Armstrong):</strong> $153 = 1^3 + 5^3 + 3^3 = 153$<br>
        • <strong>ఫిబోనాచీ సిరీస్ (Fibonacci):</strong> పక్కపక్కన ఉన్న రెండు నంబర్స్ ని కలిపితే వచ్చేది (0, 1, 1, 2, 3, 5, 8...)</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — The 9 Classical Algorithmic Suite</span>
          <a class="try-btn" href="/?lang=c">▶ Run Suite</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

int main(void) {
    // 1. Print 1 to 10 Numbers
    printf("1. Numbers (1-10): ");
    for (int i = 1; i &lt;= 10; i++) printf("%d ", i);
    printf("\\n");

    // 2. Multiplication Table (7 x i)
    printf("\\n2. Multiplication Table for 7:\\n");
    for (int i = 1; i &lt;= 5; i++) printf("   7 x %d = %d\\n", i, 7 * i);

    // 3. Sum of First 100 Numbers
    int sum = 0;
    for (int i = 1; i &lt;= 100; i++) sum += i;
    printf("\\n3. Sum of 1 to 100 = %d\\n", sum);

    // 4. Factorial of 5 (5! = 120)
    long long fact = 1;
    for (int i = 1; i &lt;= 5; i++) fact *= i;
    printf("4. Factorial of 5 = %lld\\n", fact);

    // 5. Reverse Number & 6. Count Digits (Num = 9845)
    int num = 9845, temp = num, rev = 0, digits = 0;
    while (temp &gt; 0) {
        rev = rev * 10 + (temp % 10);
        temp /= 10;
        digits++;
    }
    printf("5. Reverse of %d = %d\\n", num, rev);
    printf("6. Total digits in %d = %d\\n", num, digits);

    // 7. Prime Number Check (Num = 29)
    int checkPrime = 29;
    bool isPrime = (checkPrime &gt; 1);
    for (int i = 2; i * i &lt;= checkPrime; i++) {
        if (checkPrime % i == 0) { isPrime = false; break; }
    }
    printf("7. Is %d Prime? %s\\n", checkPrime, isPrime ? "YES (Prime)" : "NO");

    // 8. Armstrong Number Check (Num = 153 -> 1^3 + 5^3 + 3^3 = 153)
    int armNum = 153, armTemp = armNum, armSum = 0;
    while (armTemp &gt; 0) {
        int d = armTemp % 10;
        armSum += (d * d * d);
        armTemp /= 10;
    }
    printf("8. Is %d an Armstrong Number? %s\\n", armNum, (armSum == armNum) ? "YES" : "NO");

    // 9. Fibonacci Series (First 8 Terms)
    int t1 = 0, t2 = 1, nextTerm;
    printf("9. Fibonacci (8 terms): ");
    for (int i = 1; i &lt;= 8; i++) {
        printf("%d ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\\n");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Prime & Fibonacci in Live C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ ప్రోగ్రామ్స్ ని మన ఆన్‌లైన్ కంపైలర్ లో రన్ చేసి ఎలా పనిచేస్తున్నాయో చూడండి:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int n = 10, t1 = 0, t2 = 1;
    printf("First %d Fibonacci numbers:\\n", n);
    for (int i = 1; i &lt;= n; ++i) {
        printf("%d, ", t1);
        int next = t1 + t2;
        t1 = t2;
        t2 = next;
    }
    printf("\\n");
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

  const html = wrapCPage(title, desc, filename, 9, "Phase 05", "Loops & Iterations", subtopics, contentBody, '08-c-loops-for-while-do-while-and-control-flow.html', '8. for, while, do-while, break & continue', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE LESSON 7 to link to Lesson 8 ───────────────────────────────────
function updateLesson7() {
  const file7 = path.join(cDir, '07-c-switch-case-and-decision-practice-programs.html');
  const title = "C switch-case, Fall-Through Behavior & 7 Decision Practice Programs";
  const desc = "Master C switch-case Statements (Phase 4 Part 2): switch mechanics, jump table branch optimization, break and default rules, intentional fall-through, and 7 step-by-step practical programs.";
  const subtopics = "switch-case Mechanics · Jump Tables · break & default · Fall-Through Behavior · if-else vs switch · 7 Practice Programs (Leap Year, Calculator, Largest of 3)";

  const currentContent = fs.readFileSync(file7, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '07-c-switch-case-and-decision-practice-programs.html', 7, "Phase 04", "Conditions & Branching", subtopics, contentBody, '06-c-conditional-branching-if-else-and-logical-operators.html', '6. if-else Ladders, Nested if & Logical Logic', '08-c-loops-for-while-do-while-and-control-flow.html', '8. for, while, do-while, break & continue');
  fs.writeFileSync(file7, html, 'utf8');
  console.log('✅ Updated 07-c-switch-case-and-decision-practice-programs.html next links!');
}

// Update all sidebar links across all 9 C lesson files
function updateAllCSidebars() {
  const files = [
    '01-c-basics-and-program-structure.html',
    '02-c-variables-declaration-and-memory-model.html',
    '03-c-data-types-format-specifiers-and-type-casting.html',
    '04-c-user-input-scanf-and-buffer-handling.html',
    '05-c-operators-expressions-and-precedence.html',
    '06-c-conditional-branching-if-else-and-logical-operators.html',
    '07-c-switch-case-and-decision-practice-programs.html',
    '08-c-loops-for-while-do-while-and-control-flow.html',
    '09-c-nested-loops-patterns-and-practice-programs.html'
  ];
  
  files.forEach(file => {
    const filePath = path.join(cDir, file);
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    const accordionHtml = generateCAccordionSidebar(file);
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, `${accordionHtml}\n  </aside>`);

    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`✅ Updated sidebars across all ${files.length} C lesson files!`);
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, conditional branching, and loops with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c star patterns" />
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
      <span class="badge">🟢 9 In-Depth Sub-Chapters Across 5 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, variables, scanf user input, conditional branching, or loops & pattern printing:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-c/04-c-user-input-scanf-and-buffer-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: Input →</a>
        <a href="/blog-c/06-c-conditional-branching-if-else-and-logical-operators.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-c/08-c-loops-for-while-do-while-and-control-flow.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 5: Loops & Patterns →</a>
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
  console.log('✅ Updated public/blog-c.html with Phase 1, 2, 3, 4 & 5 (9 Chapters)!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 5 (Loops & Iteration)...');
  buildLesson8();
  buildLesson9();
  updateLesson7();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 5 successfully created with sub-chapters!');
}

run();
