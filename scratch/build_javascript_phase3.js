const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

// JS Masterclass Curriculum Structure with updated Phase 3 chapters
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
      <span class="badge">📂 Phase 03: Operators & Input</span>
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
        <span class="title">Phase 4: Conditionals</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 5: Operators, Expressions & Precedence ────────────────────
function buildLesson5() {
  const title = "JavaScript Operators తెలుగులో | Arithmetic, Comparison, Logical Operators";
  const desc = "JavaScript లో operators అంటే ఏమిటి, arithmetic (+ - * / %), comparison (== vs ===), logical (&& || !) operators మరియు ternary operator ని తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "05-operators-expressions-and-precedence.html";
  const subtopics = "Arithmetic (+ - * / % **) · ++ / -- · += -= · Comparison (== vs ===) · Logical (&& || !) · Ternary Operator";

  const contentBody = `
    <div class="intro-box">
      <p>కాలిక్యులేటర్ లో <code>+</code>, <code>-</code>, <code>×</code>, <code>÷</code> బటన్లు చూశారు కదా? వాటి పని సంఖ్యలతో ఏదో ఒక చర్య (operation) చేయడం. Programming లో ఇలాంటి చిహ్నాలనే <strong>Operators</strong> అంటారు.</p>
      <p>ఒక చర్య చేయడానికి కావాల్సినవి రెండు: చర్యను సూచించే చిహ్నం (operator) మరియు ఆ చర్య జరిగే విలువలు (<strong>operands</strong>). ఉదాహరణకు <code>5 + 3</code> లో <code>+</code> అనేది operator, <code>5</code> మరియు <code>3</code> అనేవి operands.</p>
      <p>ఈ chapter లో ముఖ్యమైన మూడు రకాల operators నేర్చుకుందాం: లెక్కలకు (arithmetic), పోలికలకు (comparison), నిర్ణయాలకు (logical).</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Arithmetic operators: <code>+ - * / % **</code></li>
        <li>Increment, decrement (<code>++</code>, <code>--</code>) మరియు assignment operators (<code>+=</code>, <code>-=</code>)</li>
        <li>Comparison operators: <code>==</code> మరియు <code>===</code> మధ్య తేడా</li>
        <li>Logical operators: <code>&&</code>, <code>||</code>, <code>!</code></li>
        <li>Ternary operator (చిన్న if-else)</li>
        <li>Operator precedence (ఏ చర్య ముందు జరుగుతుంది)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>1. Arithmetic Operators (లెక్కల operators)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Operator</th><th>పని</th><th>ఉదాహరణ</th><th>ఫలితం</th></tr>
        <tr><td><code>+</code></td><td>కూడిక</td><td><code>10 + 3</code></td><td><code>13</code></td></tr>
        <tr><td><code>-</code></td><td>తీసివేత</td><td><code>10 - 3</code></td><td><code>7</code></td></tr>
        <tr><td><code>*</code></td><td>గుణకారం</td><td><code>10 * 3</code></td><td><code>30</code></td></tr>
        <tr><td><code>/</code></td><td>భాగహారం</td><td><code>10 / 3</code></td><td><code>3.3333333333333335</code></td></tr>
        <tr><td><code>%</code></td><td>శేషం (Modulus)</td><td><code>10 % 3</code></td><td><code>1</code></td></tr>
        <tr><td><code>**</code></td><td>ఘాతం (Power)</td><td><code>10 ** 3</code></td><td><code>1000</code></td></tr>
      </table>

      <div class="code-block" style="margin-top:15px;">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Arithmetic Operators</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let a = 10;
let b = 3;

console.log(a + b);   // 13
console.log(a - b);   // 7
console.log(a * b);   // 30
console.log(a / b);   // 3.3333333333333335
console.log(a % b);   // 1
console.log(a ** b);  // 1000</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">% (Modulus) ని అర్థం చేసుకుందాం</h3>
      <div class="callout">
        <div class="callout-title">🍬 రియల్ లైఫ్ అనలాజీ: లడ్డూల పంపకం</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">17 లడ్డూలను 5 మంది పిల్లలకు సమానంగా పంచారనుకోండి. ప్రతి ఒక్కరికి 3 లడ్డూలు వస్తాయి, 2 లడ్డూలు మిగులుతాయి. ఆ మిగిలిన 2 యే <code>17 % 5</code>.</p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">% తో సరి/బేసి సంఖ్యలు తెలుసుకోవడం</h3>
      <p>ఒక సంఖ్యను 2 తో భాగిస్తే శేషం <code>0</code> వస్తే అది <strong>సరి సంఖ్య (even)</strong>, <code>1</code> వస్తే <strong>బేసి సంఖ్య (odd)</strong>.</p>
      <div class="code-block">
        <pre><code>console.log(10 % 2); // 0 (Even)
console.log(7 % 2);  // 1 (Odd)
console.log(10 % 2 === 0); // true</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: షాప్ బిల్లు లెక్కించడం</h3>
      <div class="code-block">
        <pre><code>const price = 250;
const quantity = 3;

const subtotal = price * quantity;
const gst = subtotal * 18 / 100;
const total = subtotal + gst;

console.log("Subtotal:", subtotal); // 750
console.log("GST (18%):", gst);     // 135
console.log("మొత్తం బిల్లు:", total); // 885</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Operator precedence: ఏ చర్య ముందు జరుగుతుంది?</h3>
      <div class="code-block">
        <pre><code>console.log(2 + 3 * 4);   // 14 (గుణకారం ముందు జరిగింది: 3 * 4 = 12 + 2)
console.log((2 + 3) * 4); // 20 (Brackets ముందు జరిగాయి: 5 * 4)</code></pre>
      </div>
      <p>గణితంలో లాగే, JavaScript లో కూడా గుణకారం, భాగహారం కూడిక, తీసివేత కంటే ముందు జరుగుతాయి. ఎటువంటి సందేహం ఉన్నా Brackets <code>( )</code> వాడండి.</p>
    </div>

    <div class="section-title"><span class="num">3</span>2. Increment (++) మరియు Decrement (--)</div>
    <div class="section-body">
      <p>ఒక విలువను 1 పెంచడానికి <code>++</code>, 1 తగ్గించడానికి <code>--</code> వాడతాం.</p>
      <div class="code-block">
        <pre><code>let count = 5;

count++;
console.log(count); // 6

count--;
console.log(count); // 5</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">x++ మరియు ++x మధ్య తేడా</h3>
      <div class="code-block">
        <pre><code>let x = 5;

console.log(x++); // 5 (ముందు పాత విలువ ఇచ్చి, తర్వాత పెంచుతుంది)
console.log(x);   // 6
console.log(++x); // 7 (ముందు పెంచి, తర్వాత కొత్త విలువ ఇస్తుంది)</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>3. Assignment Operators (విలువ పెట్టే operators)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Operator</th><th>అర్థం</th><th>సమానమైన రూపం</th></tr>
        <tr><td><code>+=</code></td><td>కూడి పెట్టు</td><td><code>x = x + 5</code></td></tr>
        <tr><td><code>-=</code></td><td>తీసివేసి పెట్టు</td><td><code>x = x - 5</code></td></tr>
        <tr><td><code>*=</code></td><td>గుణించి పెట్టు</td><td><code>x = x * 5</code></td></tr>
        <tr><td><code>/=</code></td><td>భాగించి పెట్టు</td><td><code>x = x / 5</code></td></tr>
      </table>

      <div class="code-block" style="margin-top:15px;">
        <pre><code>let total = 100;

total += 50;
console.log(total); // 150 (జమ)

total -= 30;
console.log(total); // 120 (ఖర్చు)

total *= 2;
console.log(total); // 240 (రెట్టింపు)

total /= 4;
console.log(total); // 60  (నాల్గవ వంతు)</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span>4. Comparison Operators (పోలిక operators)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Operator</th><th>అర్థం</th><th>ఉదాహరణ</th><th>ఫలితం</th></tr>
        <tr><td><code>></code></td><td>కంటే ఎక్కువ</td><td><code>5 > 3</code></td><td><code>true</code></td></tr>
        <tr><td><code><</code></td><td>కంటే తక్కువ</td><td><code>5 < 3</code></td><td><code>false</code></td></tr>
        <tr><td><code>>=</code></td><td>ఎక్కువ లేదా సమానం</td><td><code>5 >= 5</code></td><td><code>true</code></td></tr>
        <tr><td><code><=</code></td><td>తక్కువ లేదా సమానం</td><td><code>5 <= 4</code></td><td><code>false</code></td></tr>
        <tr><td><code>===</code></td><td>సమానమా (type తో సహా)</td><td><code>5 === 5</code></td><td><code>true</code></td></tr>
        <tr><td><code>!==</code></td><td>సమానం కాదా (type తో సహా)</td><td><code>5 !== 6</code></td><td><code>true</code></td></tr>
      </table>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">== మరియు === మధ్య ముఖ్యమైన తేడా</h3>
      <div class="code-block">
        <pre><code>console.log(5 == "5");   // true  (Types వేరైనా ఆటోమేటిక్ గా మార్చి పోల్చింది)
console.log(5 === "5");  // false (విలువ మరియు type రెండూ పోల్చింది - Strict!)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true</code></pre>
      </div>

      <div class="callout callout-warning">
        <div class="callout-title">⚠️ బంగారు నియమం:</div>
        <p>ఎప్పుడూ <strong><code>===</code></strong> మరియు <strong><code>!==</code></strong> వాడండి. <code>==</code> మరియు <code>!=</code> ని వాడకండి. దీనివల్ల ఊహించని bugs రావు.</p>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Strings పోలిక</h3>
      <div class="code-block">
        <pre><code>console.log("apple" < "banana"); // true  (అక్షరక్రమం ప్రకారం 'a' ముందు వస్తుంది)
console.log("apple" === "Apple"); // false (చిన్న, పెద్ద అక్షరాలు వేరు)</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>5. Logical Operators (&&, ||, !)</div>
    <div class="section-body">
      <div class="callout">
        <div class="callout-title">💡 రియల్ లైఫ్ అనలాజీ:</div>
        <ul style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">
          <li><strong>&& (AND):</strong> ATM లో డబ్బు రావాలంటే కార్డ్ <strong>మరియు</strong> PIN రెండూ సరిగ్గా ఉండాలి.</li>
          <li><strong>|| (OR):</strong> షాప్ లో బిల్లు కట్టడానికి Cash <strong>లేదా</strong> UPI, ఏదైనా ఒకటి ఉంటే చాలు.</li>
          <li><strong>! (NOT):</strong> స్విచ్ ఆన్ ని ఆఫ్ గా, <code>true</code> ని <code>false</code> గా మారుస్తుంది.</li>
        </ul>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Truth Table</h3>
      <table class="tbl">
        <tr><th>A</th><th>B</th><th>A && B</th><th>A || B</th><th>!A</th></tr>
        <tr><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td><td><code>true</code></td><td><code>false</code></td></tr>
        <tr><td><code>true</code></td><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td><td><code>false</code></td></tr>
        <tr><td><code>false</code></td><td><code>true</code></td><td><code>false</code></td><td><code>true</code></td><td><code>true</code></td></tr>
        <tr><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td><td><code>false</code></td><td><code>true</code></td></tr>
      </table>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: ఓటు అర్హత & సెలవు రోజు</h3>
      <div class="code-block">
        <pre><code>const age = 20;
const isCitizen = true;
console.log("ఓటు వేయొచ్చా?", age >= 18 && isCitizen); // true

const isSunday = false;
const isFestival = true;
console.log("ఈ రోజు సెలవా?", isSunday || isFestival);        // true
console.log("ఈ రోజు పని దినమా?", !(isSunday || isFestival)); // false</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">7</span>6. Ternary Operator: చిన్న if-else</div>
    <div class="section-body">
      <p>ఒక షరతు ఆధారంగా రెండు విలువల్లో ఒకదాన్ని ఎంచుకోవడానికి Ternary Operator వాడతాం:</p>
      <div class="code-block">
        <pre><code>const marks = 60;
const result = marks >= 35 ? "Pass" : "Fail";
console.log(result); // Pass</code></pre>
      </div>
      <p><code>marks >= 35</code> నిజం కాబట్టి <code>?</code> తర్వాత ఉన్న <code>"Pass"</code> ఎంపిక అయ్యింది. False అయితే <code>:</code> తర్వాత ఉన్న <code>"Fail"</code> వచ్చేది.</p>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul>
        <li><strong>=== బదులు = వాడటం:</strong> <code>if (x = 5)</code> అని రాస్తే అది విలువ పెట్టేస్తుంది (Assignment), పోల్చదు! పోల్చడానికి ఎప్పుడూ <code>===</code> వాడండి.</li>
        <li><strong>String మరియు number ని కూడటం:</strong> <code>"2" + 3</code> ఫలితం <code>"23"</code> అవుతుంది. కానీ <code>"2" * 3</code> ఫలితం <code>6</code> మరియు <code>"10" - 5</code> ఫలితం <code>5</code> అవుతాయి.</li>
        <li><strong>Number strings ని పోల్చడం:</strong> <code>"10" < "9"</code> ఫలితం <code>true</code>! ఎందుకంటే strings ని అక్షరక్రమం ప్రకారం పోలుస్తుంది. సంఖ్యలుగా పోల్చాలంటే నంబర్ టైప్ లో ఉండాలి.</li>
        <li><strong>వరుసగా పోలికలు రాయడం:</strong> <code>1 < 5 < 3</code> ఇస్తుంది <code>true</code>! ఎందుకంటే <code>1 < 5</code> (true/1) అయి <code>1 < 3</code> అవుతుంది. సరైన మార్గం: <code>5 > 1 && 5 < 3</code>.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">8</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>a = 20</code>, <code>b = 6</code> అయితే <code>a + b</code>, <code>a - b</code>, <code>a * b</code>, <code>a / b</code>, <code>a % b</code> విలువలు కనుక్కోండి.</li>
        <li>ఒక సంఖ్య సరి సంఖ్యా కాదా చెక్ చేసే expression రాయండి. (సంఖ్య <code>42</code>)</li>
        <li><code>P = 1000</code>, <code>R = 5</code>, <code>T = 2</code> అయితే సాధారణ వడ్డీ (Simple Interest = P × R × T / 100) లెక్కించి print చేయండి.</li>
        <li>ఈ ఫలితాలు ఏమిటి? <code>10 == "10"</code>, <code>10 === "10"</code>, <code>true && false</code>, <code>true || false</code>, <code>!true</code>.</li>
        <li>ఒక సంవత్సరం leap year అవునా కాదా తెలుసుకునే code రాయండి (2024 మరియు 1900 లతో).</li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>26</code>, <code>14</code>, <code>120</code>, <code>3.3333333333333335</code>, <code>2</code>.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>42 % 2 === 0</code> (Output: <code>true</code>).</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>const simpleInterest = 1000 * 5 * 2 / 100; console.log(simpleInterest);</code> (Output: <code>100</code>).</p>
          <p style="margin-top: 8px;"><strong>4.</strong> <code>true</code>, <code>false</code>, <code>false</code>, <code>true</code>, <code>false</code>.</p>
          <p style="margin-top: 8px;"><strong>5.</strong><br>
          <code>const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;</code><br>
          2024: <code>true</code> (Leap year), 1900: <code>false</code> (Leap year కాదు).</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేసి, విలువలు మార్చి ఫలితాలు చూడండి:</p>
      <div class="code-block">
        <pre><code>const itemPrice = 120;
const quantity = 4;
const discountPercent = 10;

const subtotal = itemPrice * quantity;
const discount = subtotal * discountPercent / 100;
const finalAmount = subtotal - discount;

console.log("Subtotal:", subtotal);
console.log("Discount:", discount);
console.log("చెల్లించాల్సిన మొత్తం:", finalAmount);
console.log("ఉచిత డెలివరీ అర్హత (₹400 పైన)?", finalAmount > 400);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li><strong>Operator</strong> అంటే సంఖ్యలు/విలువలతో చర్య చేసే చిహ్నం. విలువలను <strong>operands</strong> అంటారు.</li>
        <li><strong>Arithmetic:</strong> <code>+ - * / % **</code>. <code>%</code> శేషాన్ని ఇస్తుంది, సరి/బేసి చెక్ చేయడానికి వాడతాం.</li>
        <li><code>++</code> / <code>--</code> విలువను 1 పెంచుతాయి/తగ్గిస్తాయి. <code>+=</code>, <code>-=</code> సంక్షిప్త రూపాలు.</li>
        <li><strong>Comparison:</strong> <code>> < >= <= === !==</code> ఫలితంగా boolean ఇస్తాయి. ఎప్పుడూ <code>===</code> వాడండి.</li>
        <li><strong>Logical:</strong> <code>&&</code> (రెండు నిజం), <code>||</code> (ఏదైనా ఒకటి నిజం), <code>!</code> (వ్యతిరేకం).</li>
        <li><strong>Ternary:</strong> <code>షరతు ? విలువ1 : విలువ2</code>.</li>
      </ul>
    </div>
`;

  const html = wrapJSLessonPage(title, desc, filename, 5, subtopics, contentBody, 'operators.html', '4. Data Types (string, number...)', '06-browser-input-and-number-parsing.html', '6. Input & Output (alert, prompt...)');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

function buildLesson6() {
  const title = "JavaScript Type Conversion తెలుగులో | Number(), parseInt(), Template Literals";
  const desc = "JavaScript లో string ని number గా మార్చడం, Number(), parseInt(), String(), Boolean(), truthy falsy విలువలు మరియు template literals (backticks) ని తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "06-browser-input-and-number-parsing.html";
  const subtopics = "Implicit vs Explicit · Number() · parseInt() · parseFloat() · String() · Boolean() · Truthy & Falsy · Template Literals (Backticks)";

  const contentBody = String.raw`
    <div class="intro-box">
      <p>కరెంట్ ప్లగ్ లో మన ఫోన్ ఛార్జర్ పెట్టాలంటే, కొన్నిసార్లు అడాప్టర్ కావాలి కదా? ఒక రకం ప్లగ్ ని ఇంకో రకం సాకెట్ కి సరిపోయేలా మార్చడమే అడాప్టర్ పని. Programming లో కూడా ఒక data type ని ఇంకో data type గా మార్చాల్సిన సందర్భాలు చాలా వస్తాయి. దీన్నే <strong>Type Conversion</strong> అంటారు.</p>
      <p>గత chapters లో <code>"5" + 3</code> ఫలితం <code>"53"</code> అవ్వడం చూశాం. ఇలాంటి గందరగోళాలు రాకుండా, విలువలను సరైన type కి ఎలా మార్చాలో ఈ chapter లో నేర్చుకుందాం. తర్వాత, text ని అందంగా, సులభంగా రాయడానికి <strong>Template Literals</strong> కూడా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Implicit మరియు Explicit type conversion అంటే ఏమిటి</li>
        <li><code>Number()</code>, <code>parseInt()</code>, <code>parseFloat()</code>, <code>String()</code>, <code>Boolean()</code> ఎలా వాడాలి</li>
        <li>Truthy మరియు Falsy విలువలు</li>
        <li>Template literals (backticks) తో text రాయడం</li>
        <li>Multi-line strings</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Type Conversion అంటే ఏమిటి?</div>
    <div class="section-body">
      <p>ఒక విలువ యొక్క data type ని మార్చడమే type conversion. ఇది రెండు రకాలుగా జరుగుతుంది:</p>
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Implicit conversion</strong> (అంతర్గత మార్పు): JavaScript తనంతట తాను, మనకు చెప్పకుండానే type మార్చేస్తుంది.</li>
        <li><strong>Explicit conversion</strong> (స్పష్టమైన మార్పు): మనం ఉద్దేశపూర్వకంగా, function వాడి type మారుస్తాం.</li>
      </ol>
    </div>

    <div class="section-title"><span class="num">3</span>1. Implicit Conversion (JavaScript తనంతట తానే మార్చేది)</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Implicit Conversion</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log("5" + 2);
console.log("5" - 2);
console.log(true + 1);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        52<br>
        3<br>
        2
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 12px;">
        <li><code>"5" + 2</code> → <code>+</code> string తో వస్తే అతికిస్తుంది, కాబట్టి <code>"52"</code>.</li>
        <li><code>"5" - 2</code> → <code>-</code> కి అతికించడం అనే పని లేదు, కాబట్టి <code>"5"</code> ని సంఖ్యగా మార్చి లెక్కించింది: <code>3</code>.</li>
        <li><code>true + 1</code> → <code>true</code> ని <code>1</code> గా మార్చి కూడింది: <code>2</code>.</li>
      </ul>
      <p style="margin-top: 10px;">ఈ ఆటోమేటిక్ మార్పులు ఎప్పుడు ఎలా జరుగుతాయో గుర్తుంచుకోవడం కష్టం, పైగా పొరపాట్లకు దారి తీస్తాయి. అందుకే <strong>మనమే స్పష్టంగా (explicitly) మార్చడం</strong> మంచి అలవాటు.</p>
    </div>

    <div class="section-title"><span class="num">4</span>2. Explicit Conversion: మనమే మార్చడం</div>
    <div class="section-body">
      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;"><code>Number()</code>: ఏదైనా విలువను number గా మార్చడం</h3>
      <div class="code-block">
        <pre><code>console.log(Number("42"));
console.log(Number("3.14"));
console.log(Number("abc"));
console.log(Number(true));
console.log(Number(false));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        42<br>
        3.14<br>
        NaN<br>
        1<br>
        0
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>"42"</code> మరియు <code>"3.14"</code> సరైన సంఖ్యల్లా ఉన్నాయి కాబట్టి మారాయి.</li>
        <li><code>"abc"</code> ని సంఖ్యగా మార్చలేం కాబట్టి <code>NaN</code> వచ్చింది.</li>
        <li><code>true</code> → <code>1</code>, <code>false</code> → <code>0</code>.</li>
      </ul>

      <p style="margin-top: 15px;">మరికొన్ని ఉదాహరణలు:</p>
      <div class="code-block">
        <pre><code>console.log(Number(" 12 "));
console.log(Number(""));
console.log(Number("12px"));
console.log(Number(null));
console.log(Number(undefined));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        12<br>
        0<br>
        NaN<br>
        0<br>
        NaN
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li>రెండు వైపులా ఉన్న ఖాళీలు (spaces) ని పట్టించుకోదు: <code>12</code>.</li>
        <li>ఖాళీ string <code>""</code> → <code>0</code> వస్తుంది. ఇది జాగ్రత్తగా గమనించాల్సిన విషయం.</li>
        <li><code>"12px"</code> లో అక్షరాలు ఉన్నాయి కాబట్టి <code>NaN</code>.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: రెండు సంఖ్యలను కూడటం</h3>
      <p>Website లో user టైప్ చేసే ప్రతిదీ <strong>string</strong> గా వస్తుంది. అది సంఖ్యలా కనిపించినా. అందుకే లెక్కలు చేసే ముందు మార్చాలి.</p>
      <div class="code-block">
        <pre><code>const input1 = "25";
const input2 = "15";

console.log(input1 + input2);
console.log(Number(input1) + Number(input2));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        2515<br>
        40
      </div>
      <p style="margin-top: 8px;">మార్చకపోతే <code>"2515"</code> వచ్చింది (అతికింపు), మార్చాక సరైన కూడిక <code>40</code> వచ్చింది.</p>
      <div class="callout">
        <div class="callout-title">💡 చిట్కా:</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">string ముందు <code>+</code> పెట్టడం కూడా ఒక చిన్న మార్గం: <code>+"25"</code> అంటే <code>25</code>. కానీ కొత్తవారికి <code>Number()</code> చదవడానికి సులభం.</p>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>parseInt()</code> మరియు <code>parseFloat()</code>: string నుంచి సంఖ్యను తీయడం</h3>
      <p><code>parseInt()</code> string ని ఎడమ నుంచి కుడికి చదివి, పూర్ణ సంఖ్య (integer) ని తీసుకుంటుంది. అక్షరం కనిపించగానే ఆగిపోతుంది.</p>
      <div class="code-block">
        <pre><code>console.log(parseInt("42px"));
console.log(parseInt("3.99"));
console.log(parseInt("abc"));
console.log(parseInt("px42"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        42<br>
        3<br>
        NaN<br>
        NaN
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>"42px"</code> → <code>42</code> (<code>p</code> దగ్గర ఆగింది).</li>
        <li><code>"3.99"</code> → <code>3</code> (దశాంశం తీసేసింది, <strong>round చేయదు</strong>, కేవలం కత్తిరిస్తుంది).</li>
        <li><code>"px42"</code> → మొదటి అక్షరమే సంఖ్య కాదు, కాబట్టి <code>NaN</code>.</li>
      </ul>

      <p style="margin-top: 15px;"><code>parseFloat()</code> దశాంశాలను కూడా తీసుకుంటుంది:</p>
      <div class="code-block">
        <pre><code>console.log(parseFloat("3.14abc"));
console.log(parseFloat("2.5"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        3.14<br>
        2.5
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>Number()</code> మరియు <code>parseInt()</code> మధ్య తేడా</h3>
      <div class="code-block">
        <pre><code>console.log(Number("42px"));
console.log(parseInt("42px"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        NaN<br>
        42
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>Number()</code> కఠినంగా ఉంటుంది: మొత్తం string సరైన సంఖ్య అయితేనే మారుస్తుంది.</li>
        <li><code>parseInt()</code> / <code>parseFloat()</code> ఉదారంగా ఉంటాయి: ముందు ఉన్న సంఖ్య భాగాన్ని తీసుకుంటాయి.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>String()</code>: ఏదైనా విలువను string గా మార్చడం</h3>
      <div class="code-block">
        <pre><code>console.log(String(123));
console.log(String(true));
console.log(String(null));
console.log(String(undefined));
console.log(typeof String(123));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        123<br>
        true<br>
        null<br>
        undefined<br>
        string
      </div>
      <p style="margin-top: 8px;">Screen మీద చూస్తే <code>123</code> అలాగే కనిపిస్తుంది, కానీ <code>typeof</code> చూస్తే <code>string</code> అని వస్తుంది.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>Boolean()</code>: ఏదైనా విలువను true/false గా మార్చడం</h3>
      <div class="code-block">
        <pre><code>console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean("hello"));
console.log(Boolean(""));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        true<br>
        false<br>
        true<br>
        false
      </div>
      <p style="margin-top: 8px;">ఏ విలువ <code>true</code> గా, ఏది <code>false</code> గా మారుతుందో తెలుసుకోవడమే తర్వాతి భాగం.</p>
    </div>

    <div class="section-title"><span class="num">5</span>Truthy మరియు Falsy విలువలు</div>
    <div class="section-body">
      <p>JavaScript లో <strong>ప్రతి విలువ</strong> ని boolean గా చూస్తే, అది <code>true</code> లేదా <code>false</code> గా పరిగణించబడుతుంది.</p>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><strong>Truthy:</strong> boolean గా మారినప్పుడు <code>true</code> అయ్యే విలువలు.</li>
        <li><strong>Falsy:</strong> boolean గా మారినప్పుడు <code>false</code> అయ్యే విలువలు.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Falsy విలువలు (ఇవి కేవలం 6 మాత్రమే గుర్తుంచుకోండి)</h3>
      <table class="tbl">
        <tr><th>Falsy విలువ</th><th>వివరణ</th></tr>
        <tr><td><code>false</code></td><td>boolean false</td></tr>
        <tr><td><code>0</code></td><td>సున్నా</td></tr>
        <tr><td><code>""</code></td><td>ఖాళీ string</td></tr>
        <tr><td><code>null</code></td><td>ఉద్దేశపూర్వకంగా ఖాళీ</td></tr>
        <tr><td><code>undefined</code></td><td>విలువ ఇవ్వలేదు</td></tr>
        <tr><td><code>NaN</code></td><td>Not a Number</td></tr>
      </table>
      <p style="margin-top: 8px; font-size: 13.5px; color: var(--text3);">(మరో రెండు అరుదైనవి ఉన్నాయి: <code>-0</code> మరియు <code>0n</code>. వాటిని ఇప్పుడు పట్టించుకోవక్కర్లేదు.)</p>
      <p style="margin-top: 10px;"><strong>ఇవి తప్ప మిగతావన్నీ Truthy!</strong> ఇది చాలా సులభమైన నియమం.</p>

      <div class="code-block" style="margin-top:15px;">
        <pre><code>console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        false<br>
        false<br>
        false<br>
        false<br>
        false
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఇప్పుడు ఆశ్చర్యపరిచే truthy విలువలు చూడండి:</h3>
      <div class="code-block">
        <pre><code>console.log(Boolean("0"));
console.log(Boolean("false"));
console.log(Boolean(" "));
console.log(Boolean(-1));
console.log(Boolean("hello"));</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        true<br>
        true<br>
        true<br>
        true<br>
        true
      </div>

      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>"0"</code> అనేది సున్నా కాదు, అది <code>0</code> అనే అక్షరం ఉన్న string, కాబట్టి truthy.</li>
        <li><code>"false"</code> అనేది కేవలం text, boolean <code>false</code> కాదు. అందుకే truthy. (Chapter 4 లో మనం చెప్పిన bug ఇదే!)</li>
        <li><code>" "</code> (ఒక space ఉన్న string) ఖాళీ string కాదు కాబట్టి truthy.</li>
        <li><code>-1</code> సున్నా కాదు, కాబట్టి truthy.</li>
      </ul>
      <p style="margin-top: 8px; font-size: 13.5px; color: var(--text3);">(ఖాళీ array <code>[]</code> మరియు ఖాళీ object <code>{}</code> కూడా truthy. Arrays, objects ని తర్వాత chapters లో నేర్చుకుంటాం.)</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Truthy/Falsy ఎందుకు ముఖ్యం?</h3>
      <p>Condition లో boolean ఆశించే చోట ఏ విలువ ఉన్నా, JavaScript దాన్ని truthy లేదా falsy గా చూస్తుంది.</p>
      <div class="code-block">
        <pre><code>const userName = "";
console.log(userName ? "పేరు ఉంది" : "పేరు ఖాళీగా ఉంది");

const city = "హైదరాబాద్";
console.log(city ? "ఊరు ఉంది" : "ఊరు ఖాళీగా ఉంది");</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        పేరు ఖాళీగా ఉంది<br>
        ఊరు ఉంది
      </div>
      <p style="margin-top: 8px;">Form లో user ఏదైనా టైప్ చేశాడా లేదా అని చెక్ చేయడానికి ఈ పద్ధతి చాలా ఉపయోగపడుతుంది.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>!!</code> ట్రిక్</h3>
      <p>ఏ విలువనైనా నేరుగా <code>true</code>/<code>false</code> గా మార్చడానికి <code>!!</code> (double not) వాడతారు:</p>
      <div class="code-block">
        <pre><code>console.log(!!"hello");
console.log(!!0);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        true<br>
        false
      </div>
      <p style="margin-top: 8px;"><code>Boolean()</code> తో సమానమైన ఫలితం. ఇది code లో కనిపిస్తే భయపడకండి, అర్థం ఇదే.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">పోలిక పట్టిక: ఒకే విలువ, మూడు రకాల మార్పులు</h3>
      <table class="tbl">
        <tr><th>విలువ</th><th><code>Number()</code></th><th><code>String()</code></th><th><code>Boolean()</code></th></tr>
        <tr><td><code>""</code></td><td><code>0</code></td><td><code>""</code></td><td><code>false</code></td></tr>
        <tr><td><code>"42"</code></td><td><code>42</code></td><td><code>"42"</code></td><td><code>true</code></td></tr>
        <tr><td><code>"abc"</code></td><td><code>NaN</code></td><td><code>"abc"</code></td><td><code>true</code></td></tr>
        <tr><td><code>0</code></td><td><code>0</code></td><td><code>"0"</code></td><td><code>false</code></td></tr>
        <tr><td><code>true</code></td><td><code>1</code></td><td><code>"true"</code></td><td><code>true</code></td></tr>
        <tr><td><code>null</code></td><td><code>0</code></td><td><code>"null"</code></td><td><code>false</code></td></tr>
        <tr><td><code>undefined</code></td><td><code>NaN</code></td><td><code>"undefined"</code></td><td><code>false</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">6</span>Template Literals: text ని సులభంగా రాయడం</div>
    <div class="section-body">
      <p>ఇప్పటివరకు variables తో text ని కలపాలంటే <code>+</code> వాడాం. ఉదాహరణకు:</p>
      <div class="code-block">
        <pre><code>const name = "రవి";
const age = 20;

console.log("నా పేరు " + name + ", నా వయసు " + age);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నా పేరు రవి, నా వయసు 20
      </div>
      <p style="margin-top: 8px;">పని చేస్తుంది, కానీ quotes, <code>+</code> గుర్తులు, ఖాళీలు, అన్నీ చూసుకోవడం కష్టం. పెద్ద వాక్యాల్లో పొరపాట్లు తప్పవు. దీనికి సులభమైన మార్గమే <strong>Template Literals</strong>.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Backticks మరియు <code>&#36;{}</code></h3>
      <p>Template literal ని <code>" "</code> బదులు <strong>backticks</strong> <code>&#96; &#96;</code> తో రాస్తాం. (Keyboard లో <code>1</code> పక్కన, <code>Tab</code> పైన ఉన్న key.) లోపల variable విలువ చేర్చాలంటే <code>&#36;{variableName}</code> అని రాస్తాం.</p>
      <div class="code-block">
        <pre><code>const name = "రవి";
const age = 20;

console.log(&#96;నా పేరు &#36;{name}, నా వయసు &#36;{age}&#96;);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నా పేరు రవి, నా వయసు 20
      </div>
      <p style="margin-top: 8px;">ఫలితం ఒకటే, కానీ ఎంత శుభ్రంగా, చదవడానికి సులభంగా ఉందో చూడండి! <code>+</code> మరియు quotes గందరగోళం లేదు.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>&#36;{}</code> లోపల expressions కూడా రాయొచ్చు</h3>
      <p><code>&#36;{ }</code> లోపల కేవలం variable పేరు మాత్రమే కాదు, లెక్కలు, పోలికలు, ternary కూడా రాయొచ్చు.</p>
      <div class="code-block">
        <pre><code>const price = 250;
const quantity = 3;
const marks = 60;

console.log(&#96;2 + 3 = &#36;{2 + 3}&#96;);
console.log(&#96;మొత్తం బిల్లు: ₹&#36;{price * quantity}&#96;);
console.log(&#96;ఫలితం: &#36;{marks >= 35 ? "Pass" : "Fail"}&#96;);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        2 + 3 = 5<br>
        మొత్తం బిల్లు: ₹750<br>
        ఫలితం: Pass
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Multi-line strings (ఎక్కువ లైన్ల text)</h3>
      <p>పాత పద్ధతిలో ఎక్కువ లైన్లు కావాలంటే <code>\n</code> (కొత్త లైన్ గుర్తు) వాడాలి:</p>
      <div class="code-block">
        <pre><code>console.log("మొదటి లైన్\nరెండో లైన్");</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        మొదటి లైన్<br>
        రెండో లైన్
      </div>

      <p style="margin-top: 15px;">Template literal తో, Enter నొక్కి కొత్త లైన్ లో రాస్తే చాలు:</p>
      <div class="code-block">
        <pre><code>const message = &#96;నమస్కారం,
ఇది రెండో లైన్,
ఇది మూడో లైన్&#96;;

console.log(message);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        నమస్కారం,<br>
        ఇది రెండో లైన్,<br>
        ఇది మూడో లైన్
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: విద్యార్థి Report</h3>
      <div class="code-block">
        <pre><code>const studentName = "సీత";
const maths = 80;
const science = 70;
const english = 90;

const total = maths + science + english;
const average = total / 3;

console.log(&#96;విద్యార్థి: &#36;{studentName}
Maths: &#36;{maths}
Science: &#36;{science}
English: &#36;{english}
మొత్తం: &#36;{total}
సగటు: &#36;{average}
ఫలితం: &#36;{average >= 35 ? "Pass" : "Fail"}&#96;);</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        విద్యార్థి: సీత<br>
        Maths: 80<br>
        Science: 70<br>
        English: 90<br>
        మొత్తం: 240<br>
        సగటు: 80<br>
        ఫలితం: Pass
      </div>
      <p style="margin-top: 8px;">ఒకే template లో variables, లెక్కలు, ternary, multi-line అన్నీ కలిపి వాడాం. ఇదే Template Literals శక్తి.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఎప్పుడు ఏది వాడాలి?</h3>
      <table class="tbl">
        <tr><th>సందర్భం</th><th>వాడాల్సినది</th></tr>
        <tr><td>Variables లేని సాధారణ text</td><td><code>"..."</code> లేదా <code>'...'</code></td></tr>
        <tr><td>Variables తో కలిపిన text</td><td><code>&#96;...&#36;{variable}...&#96;</code></td></tr>
        <tr><td>ఎక్కువ లైన్ల text</td><td><code>&#96;...&#96;</code></td></tr>
      </table>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>
          <strong>1. లెక్కలకు ముందు string ని number గా మార్చకపోవడం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>console.log("10" + 5);         // "105"
console.log(Number("10") + 5); // 15</code></pre>
        </li>
        <li style="margin-top:10px;">
          <strong>2. <code>parseInt("abc")</code> <code>NaN</code> ఇస్తుందని మర్చిపోవడం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const value = parseInt("abc");
console.log(value);                // NaN
console.log(value + 10);           // NaN
console.log(Number.isNaN(value));  // true</code></pre>
          <code>NaN</code> తో ఏ లెక్క చేసినా <code>NaN</code> నే వస్తుంది. మార్చిన తర్వాత <code>Number.isNaN()</code> తో సరైన సంఖ్య వచ్చిందో లేదో చెక్ చేయండి. (<code>value === NaN</code> అని రాస్తే ఎప్పుడూ <code>false</code> వస్తుంది, Chapter 4 లో చూశాం.)
        </li>
        <li style="margin-top:10px;">
          <strong>3. ఖాళీ string <code>Number("")</code> తో <code>0</code> అవుతుందని మర్చిపోవడం:</strong>
          User ఏమీ టైప్ చేయకపోతే <code>""</code> వస్తుంది. <code>Number("")</code> అది <code>0</code> గా మారుస్తుంది, <code>NaN</code> కాదు. కాబట్టి "user సంఖ్య ఇవ్వలేదు" అని గుర్తించడానికి ముందు, string ఖాళీనా కాదా అని చెక్ చేయాలి.
        </li>
        <li style="margin-top:10px;">
          <strong>4. <code>parseInt</code> దశాంశాన్ని round చేస్తుందనుకోవడం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>console.log(parseInt("3.99")); // 3</code></pre>
          ఇది <code>4</code> కాదు. కేవలం దశాంశ భాగాన్ని కత్తిరిస్తుంది.
        </li>
        <li style="margin-top:10px;">
          <strong>5. <code>"0"</code> మరియు <code>"false"</code> ని falsy అనుకోవడం:</strong>
          ఇవి రెండూ <strong>truthy</strong>. ఖాళీ కాని ఏ string అయినా truthy.
        </li>
        <li style="margin-top:10px;">
          <strong>6. Template literal లో backticks కి బదులు సాధారణ quotes వాడటం:</strong>
          <pre style="margin-top:5px; background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>// తప్పు:
console.log("నా పేరు &#36;{name}"); // Output: నా పేరు &#36;{name}</code></pre>
          సాధారణ quotes లో <code>&#36;{}</code> పని చేయదు, అది కేవలం text లాగే కనిపిస్తుంది. <code>&#36;{}</code> వాడాలంటే <strong>backticks</strong> (<code>&#96;</code>) తప్పనిసరి.
        </li>
      </ul>
    </div>

    <div class="section-title"><span class="num">7</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>"100"</code> మరియు <code>"50"</code> అనే రెండు strings ని number లుగా మార్చి కూడండి.</li>
        <li>ఈ ఫలితాలు ఏమిటి? <code>Number("abc")</code>, <code>parseInt("25kg")</code>, <code>parseFloat("2.5m")</code>, <code>Number(true)</code>, <code>String(99) + 1</code>.</li>
        <li>కింది విలువలు Truthy నా Falsy నా చెప్పండి: <code>0</code>, <code>"hello"</code>, <code>""</code>, <code>" "</code>, <code>null</code>, <code>"0"</code>, <code>NaN</code>, <code>5</code>.</li>
        <li><code>name</code>, <code>city</code>, <code>age</code> variables తీసుకుని, template literal తో "నా పేరు ..., నేను ... లో ఉంటాను, నా వయసు ..." అనే వాక్యం print చేయండి.</li>
        <li>ఈ code <code>30</code> print చేసేలా సరిచేయండి: <code>let a = "10"; let b = "20"; console.log(a + b);</code></li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2); line-height: 1.6;">
          <p><strong>1.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const a = "100";
const b = "50";
console.log(Number(a) + Number(b));</code></pre>
          <p>Output: <code>150</code></p>

          <p style="margin-top: 12px;"><strong>2.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>NaN
25
2.5
1
991</code></pre>
          <p><code>String(99) + 1</code> లో <code>String(99)</code> అనేది <code>"99"</code>, దానికి <code>1</code> అతికింది కాబట్టి <code>"991"</code>.</p>

          <p style="margin-top: 12px;"><strong>3.</strong> <code>0</code> → Falsy, <code>"hello"</code> → Truthy, <code>""</code> → Falsy, <code>" "</code> → Truthy (space ఉంది), <code>null</code> → Falsy, <code>"0"</code> → Truthy, <code>NaN</code> → Falsy, <code>5</code> → Truthy.</p>

          <p style="margin-top: 12px;"><strong>4.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const name = "రవి";
const city = "హైదరాబాద్";
const age = 20;

console.log(&#96;నా పేరు &#36;{name}, నేను &#36;{city} లో ఉంటాను, నా వయసు &#36;{age}&#96;);</code></pre>
          <p>Output: <code>నా పేరు రవి, నేను హైదరాబాద్ లో ఉంటాను, నా వయసు 20</code></p>

          <p style="margin-top: 12px;"><strong>5.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>let a = "10";
let b = "20";
console.log(Number(a) + Number(b));</code></pre>
          <p>Output: <code>30</code></p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేయండి. Strings లో ఉన్న విలువలను number గా మార్చి, template literal తో బిల్లు తయారు చేస్తుంది. విలువలు మార్చి ఫలితం చూడండి:</p>
      <div class="code-block">
        <pre><code>const pricePerKg = "45.50";
const kilos = "3";

const total = parseFloat(pricePerKg) * Number(kilos);

console.log(&#96;ధర: ₹&#36;{pricePerKg} per kg&#96;);
console.log(&#96;పరిమాణం: &#36;{kilos} kg&#96;);
console.log(&#96;మొత్తం బిల్లు: ₹&#36;{total}&#96;);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary (సారాంశం):</h3>
      <ul style="margin-left: 20px; color: var(--text2); line-height: 1.6;">
        <li><strong>Type conversion</strong> అంటే ఒక data type ని ఇంకో దాని గా మార్చడం. <strong>Implicit</strong> (JavaScript తనంతట తానే) మరియు <strong>Explicit</strong> (మనమే) అని రెండు రకాలు.</li>
        <li><code>Number()</code> ఏదైనా విలువను number గా మారుస్తుంది. సరిపోకపోతే <code>NaN</code>.</li>
        <li><code>parseInt()</code> / <code>parseFloat()</code> string ముందు భాగంలో ఉన్న సంఖ్యను తీసుకుంటాయి.</li>
        <li><code>String()</code> ఏదైనా విలువను string గా, <code>Boolean()</code> true/false గా మారుస్తుంది.</li>
        <li><strong>6 Falsy విలువలు:</strong> <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. మిగతావన్నీ Truthy (<code>"0"</code>, <code>"false"</code>, <code>" "</code> కూడా).</li>
        <li><strong>Template literals:</strong> backticks <code>&#96; &#96;</code> తో రాసి, <code>&#36;{}</code> లో variables/expressions పెట్టొచ్చు. Multi-line text కూడా సులభంగా రాయొచ్చు.</li>
        <li>User ఇచ్చే input ఎప్పుడూ string గా వస్తుంది. లెక్కలకు ముందు <code>Number()</code> తో మార్చండి.</li>
      </ul>
    </div>
`;

  const html = wrapJSLessonPage(title, desc, filename, 6, subtopics, contentBody, '05-operators-expressions-and-precedence.html', '5. Operators & Precedence', 'conditionals.html', '7. Conditionals (if-else & switch)');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');

  // Also write type-conversion.html mirror for direct slug routing if visited
  const slugFilename = "type-conversion.html";
  const slugHtml = wrapJSLessonPage(title, desc, slugFilename, 6, subtopics, contentBody, '05-operators-expressions-and-precedence.html', '5. Operators & Precedence', 'conditionals.html', '7. Conditionals (if-else & switch)');
  fs.writeFileSync(path.join(jsDir, slugFilename), slugHtml, 'utf8');

  console.log(`✅ Generated ${filename} and ${slugFilename}`);
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
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 8 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, Async/Await, Promises, Closures, DOM manipulation, Node.js, and technical interview preparation with live runnable code examples.",
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
      <span class="badge">🟢 18 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (8 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, control flow, functions, arrays & objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/05-operators-expressions-and-precedence.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Control Flow →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Functions →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Arrays & Objects →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Async JS →</a>
        <a href="/blog-javascript/dom.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: DOM & Web APIs →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 3 (Operators & Input)...');
  buildLesson5();
  buildLesson6();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 3: Operators & Input successfully created!');
}

run();
