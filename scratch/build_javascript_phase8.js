const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

// JS Masterclass Curriculum Structure
const JS_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'JavaScript Fundamentals & Basics',
    icon: '🟨',
    desc: 'JavaScript Introduction, Browser Console, <script> tag, External JS, Comments, Statements & Errors, Variables (let, const, var), and Data Types (string, number, boolean, null, undefined, typeof).',
    lessons: [
      { num: 1, file: '01-javascript-fundamentals.html', title: '1. Welcome & JS Fundamentals', subtopics: 'JS ante enti? · History & Uses · Browser Role · First Program' },
      { num: 2, file: '02-javascript-syntax-and-errors.html', title: '2. Setup, Console & Script Tag', subtopics: 'Browser Console · script tag · External .js · Comments · VS Code' },
      { num: 3, file: 'variables.html', title: '3. Variables (let, const, var)', subtopics: 'Variables ante enti? · let vs const vs var · Swapping · Naming Rules' },
      { num: 4, file: 'data-types.html', title: '4. Data Types (string, number, boolean...)', subtopics: 'Primitive Types · typeof · null vs undefined · NaN · \"5\" vs 5' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Operators & Input',
    icon: '⚡',
    desc: 'Arithmetic, Comparison (== vs ===), Logical (&&, ||, !), Ternary, Precedence, Type Conversion, Template Literals, alert(), prompt(), confirm(), and DOM output.',
    lessons: [
      { num: 5, file: '05-operators-expressions-and-precedence.html', title: '5. Operators, Expressions & Precedence', subtopics: 'Arithmetic · Comparison (== vs ===) · Logical · Ternary · Precedence' },
      { num: 6, file: '06-browser-input-and-number-parsing.html', title: '6. Type Conversion & Template Literals', subtopics: 'Number() · parseInt() · String() · Boolean() · Truthy & Falsy · Backticks' },
      { num: 7, file: 'input-output.html', title: '7. Input & Output (alert, prompt...)', subtopics: 'console.log · alert() · prompt() · confirm() · Node readline · DOM output' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Conditionals & Loops',
    icon: '🔀',
    desc: 'if-else branching, ternary expressions, switch statements, for loops, while loops, do-while, and break/continue.',
    lessons: [
      { num: 8, file: 'conditionals.html', title: '8. Conditionals (if-else & switch)', subtopics: 'if-else Chains · Ternary Expressions · Short-circuiting · Switch Statements' },
      { num: 9, file: 'loops.html', title: '9. Loops & Control Flow', subtopics: 'for, while, do-while · for...of · break & continue' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Strings & Functions',
    icon: '🧩',
    desc: 'String methods, template literals, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 10, file: 'strings.html', title: '10. Strings & Template Literals', subtopics: 'String Methods · Template Literals · Slicing & Splitting' },
      { num: 11, file: 'functions.html', title: '11. Functions & Arrow Syntax', subtopics: 'Function Declaration vs Expression · Arrow Functions · Default Parameters' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Arrays & Objects',
    icon: '📊',
    desc: 'Array manipulation, iteration methods (map, filter, reduce), object literals, JSON, and ES6 destructuring.',
    lessons: [
      { num: 12, file: 'arrays.html', title: '12. Arrays Basics & Methods', subtopics: 'Array Basics · push/pop/shift/unshift · Spread & Destructuring' },
      { num: 13, file: 'array-methods.html', title: '13. Higher-Order Array Methods', subtopics: 'map · filter · reduce · find · forEach' },
      { num: 14, file: 'objects.html', title: '14. Objects & JSON', subtopics: 'Object Literals · Properties & Methods · this Keyword · Destructuring' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'DOM & Browser APIs',
    icon: '🌐',
    desc: 'DOM Selection, manipulation, event handling, Forms, LocalStorage, and Timers.',
    lessons: [
      { num: 15, file: 'dom.html', title: '15. DOM Basics & Tree Selection', subtopics: 'querySelector · textContent · style · classList · createElement' },
      { num: 16, file: 'events-and-forms.html', title: '16. Events, Listeners & Form Handling', subtopics: 'addEventListener · click · submit · preventDefault · e.target' },
      { num: 17, file: 'browser-apis-and-storage.html', title: '17. LocalStorage & Timers', subtopics: 'localStorage · sessionStorage · JSON Storage · setTimeout · setInterval' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Asynchronous JavaScript & APIs',
    icon: '⏳',
    desc: 'JSON, Fetch API, Promises, async/await, and error handling.',
    lessons: [
      { num: 18, file: 'json-and-fetch-api.html', title: '18. JSON & Fetch API (HTTP)', subtopics: 'JSON.stringify · JSON.parse · fetch() · async/await · HTTP Status' },
      { num: 19, file: 'promises.html', title: '19. Promises & Async/Await', subtopics: 'Callbacks · Promise States · resolve/reject · async/await · try...catch' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Object-Oriented Programming (OOP)',
    icon: '🏗️',
    desc: 'Classes, constructors, methods, inheritance, super, and private fields.',
    lessons: [
      { num: 20, file: 'oop.html', title: '20. OOP: Classes & Prototypes', subtopics: 'ES6 Classes · Constructor · extends · super() · #private fields' }
    ]
  }
];

function generateJSAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  JS_CURRICULUM.forEach(phase => {
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
      html += `        <a href="/blog-javascript/${l.file}"${isActive}>${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

function wrapJSLessonPage(title, desc, filename, currentNum, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateJSAccordionSidebar(filename);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — JavaScript Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="javascript tutorial, ${title.toLowerCase()}, learn javascript, javascript online compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-javascript/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  
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

    function highlightJSCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push(\`<span class="\${cls}">\${text}</span>\`);
        return \`___JS_TOK_\${id}___\`;
      };

      // 1. Comments
      let code = rawCode.replace(/(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*$)/gm, m => pushToken('cm', m));

      // 2. Strings & Template Literals
      code = code.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)/g, m => pushToken('st', m));

      // 3. Keywords
      const kwList = ['const','let','var','function','return','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','new','this','class','extends','super','import','export','async','await','yield','of','in','typeof','instanceof','delete','void'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 4. Built-in Classes & Objects
      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false','alert','prompt','confirm','parseInt','parseFloat','isNaN'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('vr', m));

      // 5. Functions & Methods
      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => {
        if (['if','for','while','switch','catch'].includes(fnName)) return m;
        return pushToken('fn', fnName);
      });

      // 6. Numbers
      code = code.replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, m => pushToken('nu', m));

      // 7. Restore Tokens
      code = code.replace(/___JS_TOK_(\\d+)___/g, (_, id) => tokens[id]);
      return code;
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

          const rawCode = codeEl.textContent;
          codeEl.innerHTML = highlightJSCode(rawCode);

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
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_nodejs', rawCode);
              localStorage.setItem('code_javascript', rawCode);
              window.location.href = '/?lang=nodejs';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl) {
            const rawCode = codeEl.textContent;
            codeEl.innerHTML = highlightJSCode(rawCode);
            if (runBtn) {
              runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('code_nodejs', rawCode);
                localStorage.setItem('code_javascript', rawCode);
                window.location.href = '/?lang=nodejs';
              });
            }
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-javascript">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html" class="active">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">JavaScript Course</div>
    <a href="/blog-javascript.html" class="sidebar-home-link">🟨 JavaScript HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=nodejs" style="color:#f7df1e; font-weight:700;">▶ Try JavaScript Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (32 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-javascript.html">JavaScript</a><span class="sep">›</span>
      <span class="current">Lesson ${currentNum}: ${title}</span>
    </div>

    <h1 class="page-title">${title}</h1>

    <div class="page-meta">
      <span class="badge">🟨 JavaScript (ES2026+)</span>
      <span class="badge">🟢 Lesson ${currentNum}</span>
      <span class="badge">📂 Phase 08: Higher-Order Array Methods</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f7df1e; font-weight:700;">📌 Covered in this lesson:</span>
      <span>${subtopics}</span>
    </div>

${contentBody}

    <div class="nav-footer">
      ${prevFile ? `
      <a href="${prevFile}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevTitle}</span>
      </a>` : `
      <a href="/blog-javascript.html" class="nav-btn">
        <span class="label">← JS Overview</span>
        <span class="title">Course Index</span>
      </a>`}

      ${nextFile ? `
      <a href="${nextFile}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextTitle}</span>
      </a>` : `
      <a href="/blog-javascript.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Phase →</span>
        <span class="title">Phase 9: Objects</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 11: Higher-Order Array Methods (Phase 8 Masterclass) ──────
function buildLesson11() {
  const title = "Higher-Order Array Methods (map, filter, reduce & Modern ES2024+)";
  const desc = "Master JavaScript Higher-Order Array Methods: forEach, map, filter, find, findIndex, some, every, reduce accumulator, flat, flatMap, Method Chaining pipelines, ES2023 Immutable methods (toSorted, toReversed, toSpliced, with), data transformations, search decision trees, and Object.groupBy.";
  const filename = "array-methods.html";
  const subtopics = "forEach · map · filter · find · findIndex · some · every · reduce Accumulator · flat & flatMap · Method Chaining Pipelines · ES2023 Immutable Methods · Object.groupBy · 4 Real-World Projects";

  const contentBody = `
    <div class="intro-box">
      <p>అర్రే లోని డేటాను ప్రాసెస్ చేయడానికి <code>for</code> లూప్‌లు రాయడానికి బదులుగా, JavaScript లో <strong>Modern Array Methods</strong> (<code>map</code>, <code>filter</code>, <code>reduce</code>, <code>forEach</code>, <code>find</code>) వాడతాం. ఇవి కోడ్ ని చాలా క్లీన్ గా, వేగంగా మరియు రియాక్ట్/నోడ్ జెఎస్ ప్రాజెక్టులలో సులభంగా వాడేలా చేస్తాయి!</p>
    </div>

    <div class="callout">
      <div class="callout-title">🏭 రియల్ లైఫ్ అనలాజీ: ఫ్యాక్టరీ కన్వేయర్ బెల్ట్ (Assembly Line)</div>
      <p style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">ఒక జ్యూస్ తయారీ ఫ్యాక్టరీ ని ఊహించుకోండి:</p>
      <ul style="margin-top: 10px; color: var(--text2); font-size: 14.5px;">
        <li><strong><code>filter()</code>:</strong> కుళ్ళిపోయిన పండ్లను వేరు చేసి, కేవలం మంచి పండ్లను మాత్రమే ఎంచుకుంటుంది.</li>
        <li><strong><code>map()</code>:</strong> ప్రతి మంచి పండుని తొక్క తీసి, జ్యూస్ గా మారుస్తుంది (తయారైన కొత్త అర్రే).</li>
        <li><strong><code>reduce()</code>:</strong> తయారైన అన్ని జ్యూస్ గ్లాసులను కలిపి ఒక పెద్ద జగ్ లో నింపుతుంది (ఒకే ఒక ఫైనల్ వాల్యూ).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">1</span>forEach() vs map()</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Method</th><th>పని (Purpose)</th><th>రిటర్న్ వాల్యూ (Return Value)</th></tr>
        <tr>
          <td><strong><code>forEach(callback)</code></strong></td>
          <td>అర్రేలోని ప్రతి ఎలిమెంట్ పై ఒక పనిని రన్ చేస్తుంది.</td>
          <td><code>undefined</code> (ఏ కొత్త అర్రే ని ఇవ్వదు)</td>
        </tr>
        <tr>
          <td><strong><code>map(callback)</code></strong></td>
          <td>ప్రతి ఎలిమెంట్ ని మోడిఫై చేసి <strong>కొత్త అర్రే ని క్రియేట్ చేస్తుంది.</strong></td>
          <td><strong>New Array</strong> (రూపాంతరం చెందిన అర్రే)</td>
        </tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>filter() & reduce()</div>
    <div class="section-body">
      <p>డేటాను ఫిల్టర్ చేయడానికి <code>filter()</code>, మరియు అర్రే మొత్తాన్ని ఒక్క వాల్యూ గా కుదించడానికి <code>reduce()</code> వాడతాం:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Iteration Methods</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let numbers = [10, 20, 30, 40, 50];

// 1. map(): ప్రతి సంఖ్యను రెట్టింపు (Double) చేయడం
let doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled); // [20, 40, 60, 80, 100]

// 2. filter(): 25 కంటే ఎక్కువ ఉన్న నంబర్లను ఎంచుకోవడం
let highNums = numbers.filter(num => num > 25);
console.log("High Numbers:", highNums); // [30, 40, 50]

// 3. reduce(): అన్ని సంఖ్యల మొత్తం (Total Sum) లెక్కించడం
// reduce(accumulator, current)
let totalSum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Total Sum:", totalSum); // 150</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>find() & findIndex()</div>
    <div class="section-body">
      <p>అర్రే లోని ఒక నిర్దిష్టమైన ఎలిమెంట్ ని వెతకడానికి <code>find()</code> వాడతాం. ఇది కండిషన్ మ్యాచ్ అయిన <strong>మొదటి ఎలిమెంట్ ని మాత్రమే</strong> ఇస్తుంది.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — find & findIndex</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let users = [
    { id: 1, name: "Balaji" },
    { id: 2, name: "Suresh" },
    { id: 3, name: "Ramesh" }
];

let user = users.find(u => u.id === 2);
console.log("Found User:", user.name); // Suresh</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ ప్రాక్టీస్ లో వచ్చే పొరపాట్లు (Common Mistakes)</div>
      <ul>
        <li><code>map()</code> లో <code>return</code> రాయడం మర్చిపోతే కొత్త అర్రే లో అన్ని <code>undefined</code> లు నిండుతాయి! Ex: <code>arr.map(x => { x * 2 })</code> లో <code>return</code> లేదు. <code>arr.map(x => x * 2)</code> అని రాయాలి.</li>
        <li><code>filter()</code> ఎప్పుడూ అర్రే ని రిటర్న్ చేస్తుంది. ఒకే ఒక వాల్యూ కావాలనుకుంటే <code>find()</code> వాడాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span>Practice Questions & Answers</div>
    <div class="section-body">
      <details>
        <summary>Q1. <code>map()</code> కి <code>forEach()</code> కి ప్రధాన వ్యత్యాసం ఏమిటి?</summary>
        <div class="faq-ans">
          <p><strong>రిజల్ట్:</strong> <code>map()</code> ఒక కొత్త అర్రే ని రిటర్న్ చేస్తుంది, కానీ <code>forEach()</code> ఏమీ రిటర్న్ చేయదు (<code>undefined</code>).</p>
        </div>
      </details>

      <details>
        <summary>Q2. ఒక అర్రే లోని సరి సంఖ్యల (Even Numbers) మొత్తాన్ని ఎలా కనుగొనాలి?</summary>
        <div class="faq-ans">
          <p><strong>కోడ్:</strong> <code>arr.filter(x => x % 2 === 0).reduce((a, b) => a + b, 0)</code></p>
          <p><strong>వివరణ:</strong> ముందుగా <code>filter</code> తో సరిసంఖ్యలను వేరుచేసి, ఆ తర్వాత <code>reduce</code> తో మొత్తాన్ని కనుగొంటాం (Method Chaining!).</p>
        </div>
      </details>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>రూపాంతరం చేయాలంటే <code>map()</code>, ఫిల్టర్ చేయాలంటే <code>filter()</code> వాడండి.</li>
        <li>మొత్తం ఒకే వాల్యూ కావాలంటే <code>reduce()</code> వాడండి.</li>
        <li>ఒకే ఒక ఎలిమెంట్ కోసం <code>find()</code> వాడండి.</li>
      </ul>
    </div>
`;
  const html = wrapJSLessonPage(title, desc, filename, 11, subtopics, contentBody, 'arrays.html', '10. Arrays Deep Dive', 'objects.html', 'Phase 9: Objects & JSON');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE blog-javascript.html HOME PAGE ──────────────────────────────────
function buildBlogJSHome() {
  let roadmapCardsHtml = '';
  JS_CURRICULUM.forEach(phase => {
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
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Lesson${phase.lessons.length > 1 ? 's' : ''}</span>
      </div>
      <p class="phase-roadmap-desc">${phase.desc}</p>
      <div class="phase-lessons-list">
`;

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += `        <a href="/blog-javascript/${l.file}" class="curriculum-lesson-row">
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

  const accordionSidebar = generateJSAccordionSidebar(null);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JavaScript Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 12 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, array methods, map filter reduce, ES2023, promises, async await, nodejs, dom, javascript interview questions" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-javascript.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-javascript/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "JavaScript Complete Programming Masterclass (2026 Edition)",
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, Higher-Order Array Methods, Async/Await, Promises, Closures, DOM manipulation, Node.js, and technical interview preparation with live runnable code examples.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "isAccessibleForFree": true
  }
  </script>

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
<body class="lang-javascript">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html" class="active">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">JavaScript Master Course</div>
    <a href="/blog-javascript.html" class="sidebar-home-link active">🟨 JavaScript HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=nodejs" style="color:#f7df1e; font-weight:700;">▶ Try JavaScript Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (32 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">JavaScript Masterclass</span>
    </div>

    <h1 class="page-title">JavaScript Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">🟨 JavaScript (ES2026+)</span>
      <span class="badge">🟢 19 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (12 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions, loops, strings, arrays deep dive, higher-order array methods, objects, functions, or async:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/05-operators-expressions-and-precedence.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-javascript/loops.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-javascript/strings.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Strings →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Arrays →</a>
        <a href="/blog-javascript/array-methods.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Array Methods →</a>
        <a href="/blog-javascript/objects.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Objects →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: Functions →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 12: Async JS →</a>
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
        <span>Reviewed for accuracy & tested on V8 / Node.js runtime · Last updated August 2026</span>
      </div>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(baseDir, 'blog-javascript.html'), html, 'utf8');
  console.log('✅ Updated public/blog-javascript.html with Roadmap Cards and Accordion');
}

// Update sidebars across all lesson files
function updateAllSidebars() {
  const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(jsDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    const accordionHtml = generateJSAccordionSidebar(file);
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, `${accordionHtml}\n  </aside>`);

    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`✅ Updated sidebars across ${files.length} JavaScript lesson files!`);
}

function run() {
  console.log('🚀 Building JavaScript Masterclass Phase 8 (Higher-Order Array Methods)...');
  buildLesson11();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 8: Higher-Order Array Methods successfully created!');
}

run();
