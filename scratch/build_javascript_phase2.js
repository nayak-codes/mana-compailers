const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

// Import JS Accordion sidebar helper & shell from Phase 1 script
const JS_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'JavaScript Fundamentals',
    icon: '🟨',
    desc: 'What is JavaScript?, History & Brendan Eich, Web uses, JS vs Java, Browser role & V8 engine, First program, 3 Methods to add JS to HTML (Inline, Internal, External), console.log(), Comments, Statements, Semicolons & ASI, Case sensitivity, Strict mode ("use strict"), and 3 Error types (Syntax, Runtime, Logical).',
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
    title: 'Operators & Control Flow',
    icon: '⚡',
    desc: 'Arithmetic, comparison (== vs ===), logical, ternary operator, short-circuiting, if-else, and switch statements.',
    lessons: [
      { num: 5, file: 'conditionals.html', title: '5. Conditionals (if-else & switch)', subtopics: 'Strict Equality (===) · Ternary · Short-circuiting · Switch Statements' },
      { num: 6, file: 'loops.html', title: '6. Loops & Control Flow', subtopics: 'for, while, do-while · for...of & for...in · break & continue' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Strings & Functions',
    icon: '🧩',
    desc: 'String manipulation, template literals, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 7, file: 'strings.html', title: '7. Strings & Template Literals', subtopics: 'String Methods · Template Literals · Slicing & Regex Search' },
      { num: 8, file: 'functions.html', title: '8. Functions & Arrow Syntax', subtopics: 'Function Declaration vs Expression · Arrow Functions · Default Parameters' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Arrays & Objects',
    icon: '📊',
    desc: 'Array manipulation, iteration methods (map, filter, reduce), object literals, JSON, and ES6 destructuring.',
    lessons: [
      { num: 9, file: 'arrays.html', title: '9. Arrays & Iteration Methods', subtopics: 'Mutating Methods · map, filter, reduce · Array Spread' },
      { num: 10, file: 'objects.html', title: '10. Objects & JSON', subtopics: 'Object Literals · Properties & Methods · JSON Parsing' },
      { num: 11, file: 'es6-features.html', title: '11. ES6+ Destructuring & Spread', subtopics: 'Array & Object Destructuring · Spread/Rest (...) · Nullish Coalescing (??)' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Advanced Functions & OOP',
    icon: '🏗️',
    desc: 'Lexical scope, closures, higher-order functions, Object-Oriented JS, prototypes, ES6 classes, and this keyword binding.',
    lessons: [
      { num: 12, file: 'closures.html', title: '12. Closures & Higher-Order Functions', subtopics: 'Lexical Scope · Closures · Currying · Callbacks' },
      { num: 13, file: 'oop.html', title: '13. OOP: Classes & Prototypes', subtopics: 'Prototypes & Inheritance · ES6 Classes · this Keyword Binding' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Asynchronous JavaScript',
    icon: '⏳',
    desc: 'Event Loop, Call Stack, Task Queue, Microtask Queue, Callbacks, Promises, async/await, and Fetch API.',
    lessons: [
      { num: 14, file: 'promises.html', title: '14. Promises & Async/Await', subtopics: 'Event Loop · Call Stack · Promise · async/await · Fetch API' },
      { num: 15, file: 'exceptions.html', title: '15. Error Handling & Debugging', subtopics: 'try...catch...finally · Custom Error Classes · Console Debugging' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'DOM & Web Browser APIs',
    icon: '🌐',
    desc: 'DOM Selection, manipulation, event handling, Event Delegation, LocalStorage, SessionStorage, and Web APIs.',
    lessons: [
      { num: 16, file: 'dom.html', title: '16. DOM Basics & Event Listeners', subtopics: 'querySelector · DOM Modification · addEventListener · LocalStorage' }
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
      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false'];
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
      <span class="badge">📂 Phase 02: Variables & Data Types</span>
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
        <span class="title">Phase 3: Conditionals</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 3: Variables (let, const & var) ───────────────────────────
function buildLesson3() {
  const title = "Variables (let, const & var) & Scopes";
  const desc = "Learn JavaScript variables: Variables ante enti?, let vs const vs var, reassigning values, variable naming rules, global vs function vs block scopes, and Temporal Dead Zone (TDZ).";
  const filename = "variables.html";
  const subtopics = "Variables ante enti? · let · const · var · Reassigning Values · Variable Naming Rules · Global vs Function vs Block Scope · TDZ";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to Lesson 3 of <strong>Phase 2: Variables & Data Types</strong>! In JavaScript, data is stored and manipulated through <strong>Variables</strong>. ES6 (2015) introduced modern <code>let</code> and <code>const</code> keywords to replace legacy <code>var</code>. In this comprehensive lesson, you will learn what variables are, the critical differences between <code>let</code>, <code>const</code>, and <code>var</code>, value mutation vs reference mutation, variable naming conventions, and JavaScript scope mechanics.</p>
    </div>

    <!-- 1. Variables ante enti? -->
    <div class="section-title"><span class="num">1</span>Variables Ante Enti? (What is a Variable?)</div>
    <div class="section-body">
      <p><strong>Variable</strong> anedhi JavaScript engine memory (RAM) lo values ni store chesukovadaniki allocate chesina oka <strong>Named Storage Box (Memory Container)</strong>. Program execution jarige time lo values ni retain cheyyadaniki mariyu mutate (vary) cheyyadaniki variables ni vadathamu.</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:16px; margin:16px 0;">
        <strong style="color:#f7df1e;">📌 Variable Syntax:</strong>
        <code style="display:block; margin-top:6px; font-size:14px;">keyword variableName = value;</code>
      </div>
    </div>

    <!-- 2. let vs const vs var -->
    <div class="section-title"><span class="num">2</span>The Big 3: let vs const vs var</div>
    <div class="section-body">
      <p>JavaScript lo variables declare cheyyadaniki 3 keywords unnaayi: <code>let</code>, <code>const</code>, and legacy <code>var</code>:</p>

      <table class="tbl">
        <tr><th>Feature</th><th><code>let</code> (Modern ES6)</th><th><code>const</code> (Modern ES6)</th><th><code>var</code> (Legacy ES5)</th></tr>
        <tr>
          <td><strong>Scope Type</strong></td>
          <td>Block Scope <code>{ }</code></td>
          <td>Block Scope <code>{ }</code></td>
          <td>Function / Global Scope</td>
        </tr>
        <tr>
          <td><strong>Re-assignable?</strong></td>
          <td>✅ <strong>Yes</strong></td>
          <td>❌ <strong>No</strong> (Read-only reference)</td>
          <td>✅ <strong>Yes</strong></td>
        </tr>
        <tr>
          <td><strong>Re-declarable?</strong></td>
          <td>❌ <strong>No</strong></td>
          <td>❌ <strong>No</strong></td>
          <td>✅ <strong>Yes</strong> (Dangerous!)</td>
        </tr>
        <tr>
          <td><strong>Hoisting & TDZ</strong></td>
          <td>Hoisted in <strong>Temporal Dead Zone</strong> (Cannot access before declaration)</td>
          <td>Hoisted in <strong>Temporal Dead Zone</strong> (Cannot access before declaration)</td>
          <td>Hoisted with <code>undefined</code> default value</td>
        </tr>
        <tr>
          <td><strong>Initial Value Required?</strong></td>
          <td>No (defaults to <code>undefined</code>)</td>
          <td>✅ <strong>Must initialize immediately</strong></td>
          <td>No (defaults to <code>undefined</code>)</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — let vs const vs var</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. let — Block-scoped & Reassignable
let age = 21;
age = 22; // Reassignment allowed!
console.log("Updated Age:", age);

// 2. const — Block-scoped Constant Reference
const name = "Ravi";
// name = "Kalyan"; // TypeError: Assignment to constant variable!
console.log("Name:", name);

// 3. var — Legacy function-scoped variable
var city = "Hyderabad";
var city = "Bangalore"; // Allowed re-declaration (Bad practice!)
console.log("City:", city);</code></pre>
      </div>
    </div>

    <!-- 3. Reassigning Values -->
    <div class="section-title"><span class="num">3</span>Reassigning Values vs Constant Objects</div>
    <div class="section-body">
      <p><code>const</code> primitive value ni re-assign cheyyanivvadu. Kani <code>const</code> tho declare chesina <strong>Object or Array properties ni mutate (change) cheyyavachu</strong>. Endhukante <code>const</code> memory address reference ni lock chesthundi, internal heap data ni kaadhu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — const Object Mutation</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const student = {
    name: "Ravi",
    age: 21
};

// Modifying object properties IS ALLOWED:
student.age = 22;
student.city = "Hyderabad";

console.log("Mutated Student:", student);

// RE-ASSIGNING THE ENTIRE OBJECT IS FORBIDDEN:
// student = { name: "Kalyan" }; // TypeError!</code></pre>
      </div>
    </div>

    <!-- 4. Variable Naming Rules -->
    <div class="section-title"><span class="num">4</span>JavaScript Variable Naming Rules</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Allowed Characters:</strong> Letters (<code>a-z, A-Z</code>), Digits (<code>0-9</code>), Dollar Sign (<code>$</code>), and Underscore (<code>_</code>).</li>
        <li><strong>Forbidden:</strong> Cannot start with a digit (e.g. <code>1stUser</code> is illegal, <code>user1</code> is legal).</li>
        <li><strong>Forbidden:</strong> Reserved JavaScript keywords (e.g. <code>let</code>, <code>class</code>, <code>function</code>, <code>if</code>).</li>
        <li><strong>Case Sensitivity:</strong> <code>userAge</code>, <code>UserAge</code>, <code>USERAGE</code> are 3 completely separate variables.</li>
        <li><strong>Industry Convention:</strong> Always use <strong>camelCase</strong> for variable and function names (e.g. <code>isStudent</code>, <code>accountBalance</code>).</li>
      </ul>
    </div>

    <!-- 5. Scope Basics -->
    <div class="section-title"><span class="num">5</span>Scope Basics (Global, Function & Block Scope)</div>
    <div class="section-body">
      <p>Scope defines the accessibility (visibility) of variables in your code:</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:14px;">
          <strong style="color:#f7df1e;">1. Global Scope</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Anywhere outside functions/blocks. Accessible everywhere in the file.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #38bdf8; border-radius:8px; padding:14px;">
          <strong style="color:#38bdf8;">2. Function Scope</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Declared inside a <code>function() { }</code>. Accessible only inside that function.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:14px;">
          <strong style="color:#3fb950;">3. Block Scope { }</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Declared inside <code>{ }</code> using <code>let</code> or <code>const</code>. Destroyed on block exit.</p>
        </div>
      </div>
    </div>

    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this variable profile example from the curriculum:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const name = "Ravi";
let age = 21;
const isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Type of Age:", typeof age);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 3, subtopics, contentBody, '02-javascript-syntax-and-errors.html', '2. Syntax & Errors', 'operators.html', '4. Data Types, typeof & Coercion');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 4: Data Types, typeof & Coercion (Phase 2 Part 2) ─────────
function buildLesson4() {
  const title = "Data Types, typeof & Type Coercion";
  const desc = "Exhaustive guide to JavaScript Data Types: 7 Primitives (String, Number, BigInt, Boolean, undefined, null, Symbol), Objects, typeof operator, typeof null bug, Dynamic typing, Explicit Type Conversion, Implicit Type Coercion, and Truthy vs Falsy values.";
  const filename = "operators.html";
  const subtopics = "7 Primitives (String, Number, BigInt, Boolean, undefined, null, Symbol) · Objects · typeof Operator · Historic typeof null Bug · Dynamic Typing · Explicit Conversion · Implicit Coercion · Truthy & Falsy Values";

  const contentBody = `
    <div class="intro-box">
      <p>JavaScript data types are divided into two main categories: <strong>7 Primitive Types</strong> (stored directly by value) and <strong>Reference Objects</strong> (stored by reference pointer). In this lesson, you will master all 7 primitives, object literals, the <code>typeof</code> operator and its historic <code>typeof null === "object"</code> quirk, dynamic typing, explicit type conversions vs implicit type coercions, and the 8 Falsy values in JavaScript.</p>
    </div>

    <!-- SECTION 1: 7 Primitives + Objects -->
    <div class="section-title"><span class="num">1</span>The 7 Primitive Data Types + Objects</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Data Type</th><th>Category</th><th>Description / Range</th><th>Example</th></tr>
        <tr><td><strong>String</strong></td><td>Primitive</td><td>Textual character data enclosed in <code>''</code>, <code>""</code>, or <code>\`...\`</code>.</td><td><code>"Ravi"</code></td></tr>
        <tr><td><strong>Number</strong></td><td>Primitive</td><td>64-bit IEEE 754 floating point (Integers & Decimals up to $2^{53}-1$).</td><td><code>21</code>, <code>99.99</code></td></tr>
        <tr><td><strong>BigInt</strong></td><td>Primitive</td><td>Arbitrary precision large integer ending with <code>n</code> suffix.</td><td><code>9007199254740991n</code></td></tr>
        <tr><td><strong>Boolean</strong></td><td>Primitive</td><td>Logical truth value: strictly <code>true</code> or <code>false</code>.</td><td><code>true</code></td></tr>
        <tr><td><strong>undefined</strong></td><td>Primitive</td><td>Automatically assigned to declared variables without a value.</td><td><code>let x; // undefined</code></td></tr>
        <tr><td><strong>null</strong></td><td>Primitive</td><td>Intentional absence of any value / empty pointer.</td><td><code>const user = null;</code></td></tr>
        <tr><td><strong>Symbol</strong></td><td>Primitive</td><td>Unique, immutable identifier created via <code>Symbol()</code>.</td><td><code>Symbol("id")</code></td></tr>
        <tr><td><strong>Object</strong></td><td>Reference</td><td>Collection of key-value pairs (Arrays, Functions, Objects).</td><td><code>{ name: "Ravi" }</code></td></tr>
      </table>
    </div>

    <!-- SECTION 2: typeof Operator & The Historic null Bug -->
    <div class="section-title"><span class="num">2</span>The typeof Operator & Historic "typeof null" Quirk</div>
    <div class="section-body">
      <p>Oka variable or expression yokka data type ni runtime lo check cheyyadaniki <code>typeof</code> operator vadathamu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — typeof Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

console.log(typeof "Ravi");        // "string"
console.log(typeof 21);            // "number"
console.log(typeof 90071992547n);   // "bigint"
console.log(typeof true);          // "boolean"
console.log(typeof undefined);     // "undefined"
console.log(typeof Symbol("id"));  // "symbol"
console.log(typeof { age: 21 });   // "object"
console.log(typeof function(){});  // "function"

// ⚠️ THE HISTORIC JAVASCRIPT BUG:
console.log(typeof null);          // "object" (Bug since JS 1.0 in 1995!)</code></pre>
      </div>

      <div class="callout">
        <div class="callout-title">💡 Why does 'typeof null' return "object"?</div>
        <p>1995 lo original JavaScript implementation lo values memory lo 32-bit units ga store aveyi. Type tags lowest 3 bits lo unte — <code>000</code> was the tag for <strong>Object</strong>. Null memory address <code>0x00</code> (all zeros) gaa read avvanivvadam dwara engine tag check lo <code>000</code> (Object) gaa return aindhi. Backward compatibility karanam ga eppatiki dhenini fix cheyyanivvaledhu!</p>
      </div>
    </div>

    <!-- SECTION 3: Dynamic Typing -->
    <div class="section-title"><span class="num">3</span>Dynamic Typing in JavaScript</div>
    <div class="section-body">
      <p>JavaScript is a <strong>dynamically-typed language</strong>. Variables variables data types ni bind cheskovavu; dynamically values change ayyetappudu type mari pothundi:</p>

      <code style="display:block; padding:12px 16px; background:#0d1117; border-radius:8px; color:#7ee787; margin:10px 0; font-size:13px;">let data = 100; // Type: number<br>data = "Hello World"; // Type: string (Valid in JS!)<br>data = true; // Type: boolean (Valid in JS!)</code>
    </div>

    <!-- SECTION 4: Type Conversion vs Type Coercion -->
    <div class="section-title"><span class="num">4</span>Type Conversion (Explicit) vs Type Coercion (Implicit)</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950;">1. Explicit Type Conversion</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Developer manually built-in functions (<code>Number()</code>, <code>String()</code>, <code>Boolean()</code>) dwara type change cheyyadam.</p>
          <code style="display:block; margin-top:6px;">Number("123") // 123<br>String(456) // "456"</code>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:16px;">
          <strong style="color:#f7df1e;">2. Implicit Type Coercion</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Operators execution appudu JS engine automatically type convert cheyadam.</p>
          <code style="display:block; margin-top:6px;">'5' + 2 // "52" (String concatenation)<br>'5' - 2 // 3 (Numeric subtraction)</code>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Coercion Examples</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

console.log("5" + 10);    // "510" (String + Operator converts 10 to string)
console.log("5" - 2);     // 3     (Minus operator coerces "5" to number)
console.log("5" * "2");   // 10    (Multiplication coerces strings to numbers)
console.log(true + 1);    // 2     (true coerces to 1)
console.log(false + 1);   // 1     (false coerces to 0)</code></pre>
      </div>
    </div>

    <!-- SECTION 5: Truthy and Falsy Values -->
    <div class="section-title"><span class="num">5</span>Truthy vs Falsy Values in JavaScript</div>
    <div class="section-body">
      <p>JavaScript lo Boolean context lo (like <code>if</code> conditions) evaluate ayye values ni Truthy or Falsy antaru. Exactly <strong>8 Falsy Values</strong> unnaayi — ivevi kaavu anukunte remaining PRAYETHNAM THOO UNNA VALUES ANNI <strong>TRUTHY</strong>:</p>

      <div style="background:#0d1117; border:1px solid #30363d; border-radius:10px; padding:18px; font-family:'JetBrains Mono',monospace; font-size:13.5px; line-height:1.7; color:#ff7b72; margin:16px 0;">
🚫 THE EXACT 8 FALSY VALUES IN JAVASCRIPT:
1. false
2. 0 (Integer zero)
3. -0 (Negative zero)
4. 0n (BigInt zero)
5. "" or '' or \`\` (Empty String)
6. null
7. undefined
8. NaN (Not a Number)
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px; margin:16px 0;">
        <strong style="color:#3fb950;">✅ Notable Truthy Values (Common Traps):</strong>
        <p style="font-size:13px; color:var(--text2); margin-top:4px;"><code>"0"</code> (Non-empty string), <code>"false"</code> (Non-empty string), <code>[]</code> (Empty array object), <code>{}</code> (Empty object), <code>function(){}</code> are ALL <strong>TRUTHY</strong>!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Truthy & Falsy Test</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

console.log("Boolean(''):", Boolean(""));           // false (Falsy)
console.log("Boolean(0):", Boolean(0));             // false (Falsy)
console.log("Boolean(null):", Boolean(null));       // false (Falsy)

console.log("Boolean('0'):", Boolean("0"));         // true (Truthy!)
console.log("Boolean([]):", Boolean([]));           // true (Truthy!)
console.log("Boolean({}):", Boolean({}));           // true (Truthy!)</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Curriculum Code Challenge</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this complete Phase 2 Variables and Data Types code snippet:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const name = "Ravi";
let age = 21;
const isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Type of Age:", typeof age);

// Coercion test
let output = "Age in 5 years: " + (age + 5);
console.log(output);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 4, subtopics, contentBody, 'variables.html', '3. Variables (let, const & var)', 'conditionals.html', 'Phase 3: Conditionals');
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
      <span class="badge">🟢 16 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (8 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, control flow, functions, arrays & objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Control Flow →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Functions →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Arrays & Objects →</a>
        <a href="/blog-javascript/closures.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: OOP & Closures →</a>
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

// Update all sidebars in blog-javascript folder
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
  console.log('🚀 Building JavaScript Masterclass Phase 2 (Variables & Data Types)...');
  buildLesson3();
  buildLesson4();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 2: Variables & Data Types successfully created!');
}

run();
