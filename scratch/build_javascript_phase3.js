const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

// JS Masterclass Curriculum Structure with updated Phase 3 chapters
const JS_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'JavaScript Fundamentals',
    icon: '🟨',
    desc: 'What is JavaScript?, History & Brendan Eich, Web uses, JS vs Java, Browser role & V8 engine, First program, 3 Methods to add JS to HTML, console.log(), Comments, Statements, Semicolons & ASI, Case sensitivity, Strict mode ("use strict"), and 3 Error types.',
    lessons: [
      { num: 1, file: '01-javascript-fundamentals.html', title: '1. Welcome & JS Fundamentals', subtopics: 'JS ante enti? · History & Uses · JS vs Java · Browser Role · First Program · Adding to HTML · console.log() · Strict Mode' },
      { num: 2, file: '02-javascript-syntax-and-errors.html', title: '2. Syntax, Statements & Errors', subtopics: 'Comments · Statements · Semicolons & ASI · Case Sensitivity · 3 Error Types' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Variables & Data Types',
    icon: '📦',
    desc: 'Variables ante enti?, let vs const vs var, Reassigning values, Variable naming rules, Scope basics (Global, Function, Block), 7 Primitives (String, Number, BigInt, Boolean, undefined, null, Symbol), Objects, typeof operator, Historic typeof null bug, Dynamic typing, Explicit Type Conversion, Implicit Type Coercion, and Truthy vs Falsy values.',
    lessons: [
      { num: 3, file: 'variables.html', title: '3. Variables (let, const & var)', subtopics: 'Variables ante enti? · let vs const vs var · Reassigning Values · Naming Rules · Global vs Function vs Block Scope' },
      { num: 4, file: 'operators.html', title: '4. Data Types, typeof & Coercion', subtopics: '7 Primitives · Objects · typeof Operator · Dynamic Typing · Explicit Conversion · Implicit Coercion · Truthy & Falsy' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Operators & Input',
    icon: '⚡',
    desc: 'Arithmetic, assignment, comparison (== vs ===, != vs !==), logical (&&, ||, !), increment/decrement, ternary operator, nullish coalescing (??), optional chaining (?.), bitwise operators, operator precedence, alert(), prompt(), confirm(), Number(), parseInt(), parseFloat(), invalid input handling (isNaN), and HTML Form Input.',
    lessons: [
      { num: 5, file: '05-operators-expressions-and-precedence.html', title: '5. Operators, Expressions & Precedence', subtopics: 'Arithmetic · Assignment · == vs === · != vs !== · Logical &&/||/! · Increment/Decrement · Ternary · ?? & ?. · Bitwise · Precedence' },
      { num: 6, file: '06-browser-input-and-number-parsing.html', title: '6. Input & Output (alert, prompt...)', subtopics: 'alert() · prompt() · confirm() · Number() vs parseInt() vs parseFloat() · isNaN() Handling · HTML Form Input' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Control Flow & Loops',
    icon: '🔀',
    desc: 'if-else branching, nested conditions, classic switch statements, for loops, while loops, do-while, for...of, for...in, break, and continue.',
    lessons: [
      { num: 7, file: 'conditionals.html', title: '7. Conditionals (if-else & switch)', subtopics: 'if-else Chains · Ternary Expressions · Short-circuiting · Switch Statements' },
      { num: 8, file: 'loops.html', title: '8. Loops & Control Flow', subtopics: 'for, while, do-while · for...of & for...in · break & continue' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Strings & Functions',
    icon: '🧩',
    desc: 'String manipulation, template literals, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 9, file: 'strings.html', title: '9. Strings & Template Literals', subtopics: 'String Methods · Template Literals · Slicing & Regex Search' },
      { num: 10, file: 'functions.html', title: '10. Functions & Arrow Syntax', subtopics: 'Function Declaration vs Expression · Arrow Functions · Default Parameters' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Arrays & Objects',
    icon: '📊',
    desc: 'Array manipulation, iteration methods (map, filter, reduce), object literals, JSON, and ES6 destructuring.',
    lessons: [
      { num: 11, file: 'arrays.html', title: '11. Arrays & Iteration Methods', subtopics: 'Mutating Methods · map, filter, reduce · Array Spread' },
      { num: 12, file: 'objects.html', title: '12. Objects & JSON', subtopics: 'Object Literals · Properties & Methods · JSON Parsing' },
      { num: 13, file: 'es6-features.html', title: '13. ES6+ Destructuring & Spread', subtopics: 'Array & Object Destructuring · Spread/Rest (...) · Nullish Coalescing (??)' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Advanced Functions & OOP',
    icon: '🏗️',
    desc: 'Lexical scope, closures, higher-order functions, Object-Oriented JS, prototypes, ES6 classes, and this keyword binding.',
    lessons: [
      { num: 14, file: 'closures.html', title: '14. Closures & Higher-Order Functions', subtopics: 'Lexical Scope · Closures · Currying · Callbacks' },
      { num: 15, file: 'oop.html', title: '15. OOP: Classes & Prototypes', subtopics: 'Prototypes & Inheritance · ES6 Classes · this Keyword Binding' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Asynchronous JavaScript & DOM',
    icon: '⏳',
    desc: 'Event Loop, Call Stack, Task Queue, Microtask Queue, Promises, async/await, Fetch API, DOM manipulation, and LocalStorage.',
    lessons: [
      { num: 16, file: 'promises.html', title: '16. Promises & Async/Await', subtopics: 'Event Loop · Call Stack · Promise · async/await · Fetch API' },
      { num: 17, file: 'exceptions.html', title: '17. Error Handling & Debugging', subtopics: 'try...catch...finally · Custom Error Classes · Console Debugging' },
      { num: 18, file: 'dom.html', title: '18. DOM Basics & Event Listeners', subtopics: 'querySelector · DOM Modification · addEventListener · LocalStorage' }
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
      const currentTheme = localStorage.getItem('theme') || 'dark';
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
  const title = "Operators, Expressions & Precedence";
  const desc = "Master JavaScript Operators: Arithmetic, Assignment, Comparison (== vs ===, != vs !==), Logical (&&, ||, !), Increment/Decrement, Ternary, Nullish Coalescing (??), Optional Chaining (?.), Bitwise, and Operator Precedence.";
  const filename = "05-operators-expressions-and-precedence.html";
  const subtopics = "Arithmetic · Assignment · Comparison (== vs ===) · Inequality (!= vs !==) · Logical (&&, ||, !) · ++ / -- · Ternary Operator · Nullish Coalescing (??) · Optional Chaining (?.) · Bitwise · Operator Precedence";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to Lesson 5 of <strong>Phase 3: Operators & Input</strong>! An <strong>Operator</strong> is a special symbol used to perform calculations, compare values, assign variables, or evaluate logical decisions. In this masterclass chapter, we cover all 15 operator categories in JavaScript — including strict equality (<code>===</code> vs <code>==</code>), short-circuit logical evaluation, modern <code>??</code> (Nullish Coalescing) & <code>?.</code> (Optional Chaining), and Operator Precedence hierarchy.</p>
    </div>

    <!-- 1. Arithmetic Operators -->
    <div class="section-title"><span class="num">1</span>Arithmetic Operators</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Operator</th><th>Name</th><th>Description</th><th>Code Example</th></tr>
        <tr><td><code>+</code></td><td>Addition</td><td>Calculates sum of two numbers or concatenates strings.</td><td><code>10 + 5 // 15</code></td></tr>
        <tr><td><code>-</code></td><td>Subtraction</td><td>Calculates difference between two numbers.</td><td><code>10 - 5 // 5</code></td></tr>
        <tr><td><code>*</code></td><td>Multiplication</td><td>Multiplies two numeric values.</td><td><code>10 * 5 // 50</code></td></tr>
        <tr><td><code>/</code></td><td>Division</td><td>Divides numerator by denominator.</td><td><code>10 / 4 // 2.5</code></td></tr>
        <tr><td><code>%</code></td><td>Modulus (Remainder)</td><td>Returns remainder after integer division.</td><td><code>10 % 3 // 1</code></td></tr>
        <tr><td><code>**</code></td><td>Exponentiation (Power)</td><td>Raises base to exponent power (ES2016).</td><td><code>2 ** 3 // 8</code></td></tr>
      </table>
    </div>

    <!-- 2. Assignment Operators -->
    <div class="section-title"><span class="num">2</span>Assignment Operators</div>
    <div class="section-body">
      <p>Assignment operators assign values to variables with optional compound arithmetic shortcutting:</p>
      <ul style="margin-left:18px; color:var(--text2); line-height:1.7; font-size:14px;">
        <li><code>x = 10</code> — Simple Assignment</li>
        <li><code>x += 5</code> — Compound Addition (equivalent to <code>x = x + 5</code>)</li>
        <li><code>x -= 3</code> — Compound Subtraction (equivalent to <code>x = x - 3</code>)</li>
        <li><code>x *= 2</code> — Compound Multiplication (equivalent to <code>x = x * 2</code>)</li>
        <li><code>x /= 4</code> — Compound Division (equivalent to <code>x = x / 4</code>)</li>
      </ul>
    </div>

    <!-- 3. Comparison & Equality (== vs ===, != vs !==) -->
    <div class="section-title"><span class="num">3</span>Comparison Operators (== vs ===, != vs !==)</div>
    <div class="section-body">
      <p>JavaScript has two types of equality operators: <strong>Abstract Equality (<code>==</code>)</strong> and <strong>Strict Equality (<code>===</code>)</strong>. Understanding this distinction is crucial to avoiding bugs!</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:16px;">
          <strong style="color:#ff7b72;">1. Abstract Equality (==) — DANGEROUS!</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Compares values <strong>AFTER performing implicit type coercion</strong>. String <code>"5" == 5</code> evaluates to <code>true</code>!</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950;">2. Strict Equality (===) — RECOMMENDED ⭐</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Compares <strong>BOTH Data Type and Value</strong> without coercion. String <code>"5" === 5</code> evaluates to <code>false</code>!</p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Equality Comparison</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

console.log('5' == 5);     // true (Coerces string "5" to number 5)
console.log('5' === 5);    // false (Different Data Types!)

console.log('5' != 5);     // false
console.log('5' !== 5);    // true (Strict Inequality)

console.log(null == undefined);  // true
console.log(null === undefined); // false</code></pre>
      </div>
    </div>

    <!-- 4. Logical Operators (&&, ||, !) & Short-Circuiting -->
    <div class="section-title"><span class="num">4</span>Logical Operators (&&, ||, !) & Short-Circuiting</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Logical AND (<code>&&</code>):</strong> Returns the first <strong>Falsy</strong> value, or the last value if all are truthy.</li>
        <li><strong>Logical OR (<code>||</code>):</strong> Returns the first <strong>Truthy</strong> value, or the last value if all are falsy.</li>
        <li><strong>Logical NOT (<code>!</code>):</strong> Inverts the boolean truthiness of a value. <code>!!value</code> converts any value to its boolean equivalent.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Short Circuit Logic</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let loggedInUser = "Ravi";
let displayName = loggedInUser || "Guest"; // Evaluates first truthy "Ravi"
console.log("Display Name:", displayName);

let emptyUser = "";
let fallbackName = emptyUser || "Guest User"; // Empty string is falsy -> "Guest User"
console.log("Fallback Name:", fallbackName);

let isMember = true;
let hasDiscount = isMember && "20% OFF"; // Evaluates second value if first is truthy
console.log("Discount:", hasDiscount);</code></pre>
      </div>
    </div>

    <!-- 5. Modern Operators: Nullish Coalescing (??) & Optional Chaining (?.) -->
    <div class="section-title"><span class="num">5</span>Modern Operators: Nullish Coalescing (??) & Optional Chaining (?.)</div>
    <div class="section-body">
      <p>ES2020 introduced two powerful operators to simplify null checks:</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:16px;">
          <strong style="color:#f7df1e;">1. Nullish Coalescing (??)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Returns right side ONLY if left side is <code>null</code> or <code>undefined</code>. Unlike <code>||</code>, values like <code>0</code> or <code>""</code> are NOT overwritten!</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #38bdf8; border-radius:8px; padding:16px;">
          <strong style="color:#38bdf8;">2. Optional Chaining (?.)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Safely accesses nested object properties without throwing <code>TypeError</code> if object reference is nullish.</p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — ?? and ?. Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Nullish Coalescing (??) vs Logical OR (||)
let count = 0;
let val1 = count || 100; // 100 (because 0 is falsy for ||)
let val2 = count ?? 100; // 0 (because 0 is NOT nullish!)
console.log("val1 (OR):", val1, "| val2 (Nullish):", val2);

// Optional Chaining (?.)
const user = {
    name: "Ravi",
    profile: {
        city: "Hyderabad"
    }
};

console.log("City:", user?.profile?.city); // "Hyderabad"
console.log("ZipCode:", user?.address?.zipCode); // undefined (No TypeError crash!)</code></pre>
      </div>
    </div>

    <!-- 6. Increment, Decrement, Ternary, Bitwise & Precedence -->
    <div class="section-title"><span class="num">6</span>Increment, Ternary, Bitwise & Operator Precedence</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Increment/Decrement:</strong> <code>++x</code> (Pre-increment: adds 1 before evaluating) vs <code>x++</code> (Post-increment: adds 1 after returning current value).</li>
        <li><strong>Ternary Operator:</strong> <code>condition ? valueIfTrue : valueIfFalse</code> (Inline shorthand for simple if-else).</li>
        <li><strong>Bitwise Operators:</strong> <code>&</code> (AND), <code>|</code> (OR), <code>^</code> (XOR), <code>~</code> (NOT), <code><<</code> (Left Shift), <code>>></code> (Right Shift). Operations performed on 32-bit binary representation.</li>
        <li><strong>Operator Precedence Hierarchy:</strong> Grouping <code>()</code> $\rightarrow$ Member Access <code>.</code> $\rightarrow$ Exponentiation <code>**</code> $\rightarrow$ Multiply/Divide <code>* / %</code> $\rightarrow$ Add/Subtract <code>+ -</code> $\rightarrow$ Comparison $\rightarrow$ Equality $\rightarrow$ Logical $\rightarrow$ Assignment.</li>
      </ul>
    </div>

    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Challenge</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Test ternary operators and strict equality logic:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let score = 85;
let result = score >= 50 ? "PASS ✅" : "FAIL ❌";
console.log("Score:", score, "| Result:", result);

let inputVal = "100";
let targetVal = 100;

console.log("Strict Check (===):", inputVal === targetVal ? "Equal" : "Not Equal");</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 5, subtopics, contentBody, 'operators.html', '4. Data Types & typeof', '06-browser-input-and-number-parsing.html', '6. Input & Output (alert, prompt...)');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 6: Browser Input & Output ─────────────────────────────────
function buildLesson6() {
  const title = "Browser Input & Output (alert, prompt, confirm & Number Parsing)";
  const desc = "Master browser input and output: alert(), prompt(), confirm(), converting input to number with Number(), parseInt(), parseFloat(), handling invalid NaN input, HTML Form Input, and interactive code examples.";
  const filename = "06-browser-input-and-number-parsing.html";
  const subtopics = "alert() · prompt() · confirm() · Converting Input to Number · Number() · parseInt() · parseFloat() · Invalid Input Handling (isNaN) · HTML Form Input";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to Lesson 6 of <strong>Phase 3: Operators & Input</strong>! Client-side JavaScript interacts with users through browser dialogs, DOM inputs, and dynamic forms. In this lesson, you will learn how to capture user input using <code>prompt()</code>, display dialogs with <code>alert()</code> and <code>confirm()</code>, safely convert string inputs into numbers using <code>Number()</code>, <code>parseInt()</code>, and <code>parseFloat()</code>, handle <code>NaN</code> invalid input, and process HTML form input.</p>
    </div>

    <!-- 1. alert(), prompt(), confirm() -->
    <div class="section-title"><span class="num">1</span>Browser Dialog Methods (alert, prompt, confirm)</div>
    <div class="section-body">
      <p>Browser environments provide 3 modal pop-up methods in the <code>window</code> object:</p>

      <table class="tbl">
        <tr><th>Dialog Method</th><th>Return Type</th><th>Description</th><th>Example Syntax</th></tr>
        <tr>
          <td><strong><code>alert(message)</code></strong></td>
          <td><code>undefined</code></td>
          <td>Displays an informational alert box with an OK button. Blocks execution until dismissed.</td>
          <td><code>alert("Welcome to Our Compiler!");</code></td>
        </tr>
        <tr>
          <td><strong><code>prompt(text, default)</code></strong></td>
          <td><code>String</code> or <code>null</code></td>
          <td>Displays an input dialog box asking user for text input. Returns input string or <code>null</code> if Cancel clicked.</td>
          <td><code>let name = prompt("Enter your name:");</code></td>
        </tr>
        <tr>
          <td><strong><code>confirm(message)</code></strong></td>
          <td><code>Boolean</code></td>
          <td>Displays a confirmation box with OK and Cancel buttons. Returns <code>true</code> (OK) or <code>false</code> (Cancel).</td>
          <td><code>let isSure = confirm("Are you sure?");</code></td>
        </tr>
      </table>
    </div>

    <!-- 2. Converting Input to Number (Number vs parseInt vs parseFloat) -->
    <div class="section-title"><span class="num">2</span>Converting Input to Number (Number vs parseInt vs parseFloat)</div>
    <div class="section-body">
      <p><strong>Crucial Rule:</strong> <code>prompt()</code> eppudu return chesina data <strong>String type</strong> lo untundhi! Meeru numeric addition cheyyalante string ni Number ga convert cheyyali. Otherwise <code>"10" + "20"</code> result <code>"1020"</code> ga string concatenation avthundi!</p>

      <table class="tbl">
        <tr><th>Conversion Function</th><th>Behavior</th><th>Example</th><th>Result</th></tr>
        <tr>
          <td><strong><code>Number(str)</code></strong></td>
          <td>Converts entire string to number. If non-numeric characters exist, returns <code>NaN</code>.</td>
          <td><code>Number("123.45")</code></td>
          <td><code>123.45</code></td>
        </tr>
        <tr>
          <td><strong><code>parseInt(str, radix)</code></strong></td>
          <td>Parses leading integer digits up to first non-digit character. Ignores trailing text!</td>
          <td><code>parseInt("100px")</code></td>
          <td><code>100</code></td>
        </tr>
        <tr>
          <td><strong><code>parseFloat(str)</code></strong></td>
          <td>Parses leading floating-point decimal digits up to first invalid character.</td>
          <td><code>parseFloat("99.99USD")</code></td>
          <td><code>99.99</code></td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Number Parsing Comparison</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. Strict Conversion with Number()
console.log(Number("42"));         // 42
console.log(Number("42.85"));      // 42.85
console.log(Number("42px"));       // NaN (Strict failure!)

// 2. Loose Parsing with parseInt() & parseFloat()
console.log(parseInt("42px"));     // 42 (Strips "px")
console.log(parseInt("42.85"));    // 42 (Truncates decimals)
console.log(parseFloat("42.85em"));// 42.85 (Parses decimal float)</code></pre>
      </div>
    </div>

    <!-- 3. Handling Invalid Input (isNaN) -->
    <div class="section-title"><span class="num">3</span>Handling Invalid Input (isNaN & Number.isNaN)</div>
    <div class="section-body">
      <p>User invalid string type chesinappudu conversion <code>NaN</code> (Not a Number) ga vasthundhi. Dheenini validate cheyyadaniki <code>isNaN()</code> or strict <code>Number.isNaN()</code> vadali:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Input Validation</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let userInput = "abc";
let parsedNum = Number(userInput);

if (Number.isNaN(parsedNum)) {
    console.log("❌ Invalid Number Input! Please enter numeric digits.");
} else {
    console.log("✅ Valid Number:", parsedNum);
}</code></pre>
      </div>
    </div>

    <!-- 4. HTML Form Input via DOM -->
    <div class="section-title"><span class="num">4</span>Reading HTML Form Input via DOM</div>
    <div class="section-body">
      <p>Modern Web Development lo <code>prompt()</code> badhulu HTML <code>&lt;input&gt;</code> elements ni DOM dwara read chesthamu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML + JavaScript Form Input</span>
        </div>
        <pre><code>&lt;!-- HTML Layout --&gt;
&lt;input type="number" id="ageInput" placeholder="Enter Age"&gt;
&lt;button id="submitBtn"&gt;Submit&lt;/button&gt;

&lt;script&gt;
document.getElementById("submitBtn").addEventListener("click", function() {
    // Read input string value from DOM element
    let ageStr = document.getElementById("ageInput").value;
    let age = Number(ageStr);

    if (!age || age &lt; 0) {
        alert("Please enter a valid age!");
    } else {
        alert("Your age next year will be: " + (age + 1));
    }
});
&lt;/script&gt;</code></pre>
      </div>
    </div>

    <!-- Practice Challenge with prompt addition -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this number addition logic using input conversion:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Prompt Addition</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Simulated input values (Equivalent to prompt("Enter number"))
const input1 = "25";
const input2 = "75";

const firstNumber = Number(input1);
const secondNumber = Number(input2);

console.log("First Number:", firstNumber);
console.log("Second Number:", secondNumber);
console.log("Sum Result:", firstNumber + secondNumber);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 6, subtopics, contentBody, '05-operators-expressions-and-precedence.html', '5. Operators & Precedence', 'conditionals.html', 'Phase 4: Conditionals');
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
      const currentTheme = localStorage.getItem('theme') || 'dark';
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
