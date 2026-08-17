const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

// JS Masterclass Curriculum Structure
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
    title: 'Conditional Statements',
    icon: '🔀',
    desc: 'if, else, else if ladders, nested conditions, multiple conditions with logical operators (&&, ||, !), ternary expressions, switch-case-break-default, guard clauses, truthy/falsy conditions, comparing values correctly with ===, and 6 practice programs.',
    lessons: [
      { num: 7, file: 'conditionals.html', title: '7. Conditional Statements (if & switch)', subtopics: 'if · else · else if · Nested Conditions · Logical Conditions · Ternary · switch, case, break, default · Guard Clauses · 6 Practice Programs' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Loops & Iterations',
    icon: '🔁',
    desc: 'Why loops are needed, for, while, do...while, for...of (iterables), for...in (object keys), nested loops, break, continue, infinite loops, looping through strings and arrays, number patterns, star patterns, loop performance, and 8 practice programs.',
    lessons: [
      { num: 8, file: 'loops.html', title: '8. Loops & Control Flow (Masterclass)', subtopics: 'Why Loops · for · while · do...while · for...of · for...in · Nested Loops · break & continue · Strings & Arrays · Star Patterns · 8 Practice Programs' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Strings Mastery',
    icon: '🧵',
    desc: 'Creating strings, single/double quotes, template literals, length, indexing, charAt, toUpperCase, toLowerCase, trim, includes, startsWith, endsWith, indexOf, slice vs substring, replace, replaceAll, split, repeat, escape chars, string interpolation, and 5 projects.',
    lessons: [
      { num: 9, file: 'strings.html', title: '9. Strings & Text Processing (Masterclass)', subtopics: 'String Methods · Template Literals · slice vs substring · replaceAll · split · Palindromes · 5 Mini Projects' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Arrays Masterclass',
    icon: '📊',
    desc: 'Array ante enti?, Creation, Indexes, Reading/Updating, length tricks, push, pop, shift, unshift, slice vs splice, includes, indexOf, join, reverse, sort with custom comparators, concat, Nested 2D matrices, Destructuring, Spread, Rest, and 5 practice algorithms.',
    lessons: [
      { num: 10, file: 'arrays.html', title: '10. Arrays Deep Dive & Methods', subtopics: 'Array ante enti? · Indexes & length · push/pop/shift/unshift · slice vs splice · sort() Quirks & Comparators · Nested 2D · Destructuring & Spread/Rest' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Objects & Functions',
    icon: '🧩',
    desc: 'Object literals, properties, methods, JSON, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 11, file: 'objects.html', title: '11. Objects & JSON Mastery', subtopics: 'Object Literals · Properties & Methods · JSON Parsing · Methods this' },
      { num: 12, file: 'functions.html', title: '12. Functions & Arrow Syntax', subtopics: 'Declaration vs Expression · Arrow Syntax · Default Params · Closures' }
    ]
  },
  {
    id: 'phase9',
    tag: 'Phase 09',
    title: 'Advanced ES6+ & OOP',
    icon: '🏗️',
    desc: 'Array & Object Destructuring, ES6 Classes, Prototypes, Inheritance, and this keyword binding.',
    lessons: [
      { num: 13, file: 'es6-features.html', title: '13. ES6+ Advanced Features', subtopics: 'Advanced Destructuring · Symbols · Maps & Sets' },
      { num: 14, file: 'closures.html', title: '14. Closures & Scope Chain', subtopics: 'Lexical Scope · Closures · Higher Order Functions' },
      { num: 15, file: 'oop.html', title: '15. OOP: Classes & Prototypes', subtopics: 'Prototypes · ES6 Classes · Getters/Setters · Static' }
    ]
  },
  {
    id: 'phase10',
    tag: 'Phase 10',
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
      <span class="badge">📂 Phase 07: Arrays Masterclass</span>
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
        <span class="title">Phase 8: Objects</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 10: Arrays Deep Dive (Phase 7 Masterclass) ────────────────
function buildLesson10() {
  const title = "Arrays Deep Dive, Methods, Sorting Quirks & ES6+ (Masterclass)";
  const desc = "Comprehensive JavaScript Arrays Masterclass: Array creation, indexing, length tricks, push/pop/shift/unshift, slice vs splice, includes, indexOf, join, reverse, sort() quirks with custom comparators, concat, nested 2D matrices, destructuring, spread, and rest operators.";
  const filename = "arrays.html";
  const subtopics = "Array ante enti? · Indexes & Updating · length tricks · push/pop/shift/unshift · slice vs splice · includes/indexOf · join · reverse · sort() Quirks & Comparators · concat · Nested 2D Matrices · Array Destructuring · Spread & Rest · 5 Practice Algorithms";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7: Arrays Masterclass</strong>! In JavaScript, an <strong>Array</strong> is an ordered, dynamically-sized collection of values stored sequentially in memory. Unlike strict typed languages (like C or Java) where arrays have fixed sizes and require uniform data types, JavaScript arrays can store heterogeneous data types (Numbers, Strings, Objects, Functions, and other Arrays) and expand or shrink dynamically on demand.</p>
    </div>

    <!-- 1. Array Ante Enti & Creation -->
    <div class="section-title"><span class="num">1</span>Array Ante Enti? & Creating Arrays</div>
    <div class="section-body">
      <p>JavaScript lo <strong>Array</strong> ante multiple values ni single variable name kinda store cheyagala data structure. Internally, JS Arrays are specialized Objects where numeric indexes serve as keys and elements are placed in Heap memory.</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:14px;">
          <strong style="color:#f7df1e;">1. Array Literal (Recommended ⭐)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Square brackets <code>[]</code> tho direct ga elements define cheyyadam: <code>const marks = [85, 90, 78, 92];</code></p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:14px;">
          <strong style="color:#58a6ff;">2. Array Constructor</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;"><code>new Array(5)</code> — ⚠️ Single number isthe 5 empty slots tho array create avthundhi, value kaadu!</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:14px;">
          <strong style="color:#3fb950;">3. Array.of() & Array.from()</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;"><code>Array.of(5)</code> creates <code>[5]</code>. <code>Array.from("JS")</code> creates <code>['J', 'S']</code>.</p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Array Basics Example</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const marks = [85, 90, 78, 92];

marks.push(88); // Adds 88 to the end

console.log("Marks Array:", marks);
console.log("First Element [0]:", marks[0]);
console.log("Total Count (length):", marks.length);</code></pre>
      </div>
    </div>

    <!-- 2. Indexing, Reading, Updating & Length Tricks -->
    <div class="section-title"><span class="num">2</span>Indexes, Reading, Updating & The length Mutation Trick</div>
    <div class="section-body">
      <p>Arrays zero-indexed (<code>0</code> to <code>length - 1</code>):</p>
      
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Reading Elements:</strong> <code>marks[0]</code> (first), <code>marks.at(-1)</code> (ES2022 last item). Out-of-bounds reading returns <code>undefined</code>.</li>
        <li><strong>Updating Elements:</strong> <code>marks[1] = 95;</code> updates index 1 in place.</li>
        <li><strong>Length Property & Truncation Trick:</strong> <code>length</code> property is writable! Setting <code>marks.length = 2</code> truncates the array down to 2 items! Setting <code>marks.length = 0</code> clears the entire array in memory!</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Length & Bounds Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

console.log("Last Fruit (.at(-1)):", fruits.at(-1)); // "Grapes"

// Truncating array using length
fruits.length = 3;
console.log("After fruits.length = 3:", fruits); // ["Apple", "Banana", "Mango"]

// Clearing array in memory
fruits.length = 0;
console.log("After fruits.length = 0 (Cleared):", fruits); // []</code></pre>
      </div>
    </div>

    <!-- 3. Mutator Methods (push, pop, unshift, shift) -->
    <div class="section-title"><span class="num">3</span>Mutator Methods: push(), pop(), unshift() & shift()</div>
    <div class="section-body">
      <p>Original array structure ni direct ga modify chese core four methods:</p>

      <table class="tbl">
        <tr><th>Method</th><th>Action Position</th><th>Return Value</th><th>Performance (Time Complexity)</th></tr>
        <tr>
          <td><strong><code>push(...items)</code></strong></td>
          <td>Adds elements to <strong>END</strong></td>
          <td>New array length</td>
          <td>$O(1)$ Constant Time ⚡</td>
        </tr>
        <tr>
          <td><strong><code>pop()</code></strong></td>
          <td>Removes element from <strong>END</strong></td>
          <td>Removed element</td>
          <td>$O(1)$ Constant Time ⚡</td>
        </tr>
        <tr>
          <td><strong><code>unshift(...items)</code></strong></td>
          <td>Adds elements to <strong>START</strong></td>
          <td>New array length</td>
          <td>$O(N)$ Linear Time (re-indexes all items)</td>
        </tr>
        <tr>
          <td><strong><code>shift()</code></strong></td>
          <td>Removes element from <strong>START</strong></td>
          <td>Removed element</td>
          <td>$O(N)$ Linear Time (shifts all items left)</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Stack & Queue Operations</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let stack = [10, 20];

// Push & Pop (End)
stack.push(30); // [10, 20, 30]
console.log("Pushed 30 ->", stack);

let popped = stack.pop(); // Removes 30
console.log("Popped item:", popped, "| Current Stack:", stack);

// Unshift & Shift (Start)
stack.unshift(5); // [5, 10, 20]
console.log("Unshifted 5 ->", stack);

let shifted = stack.shift(); // Removes 5
console.log("Shifted item:", shifted, "| Current Stack:", stack);</code></pre>
      </div>
    </div>

    <!-- 4. slice() vs splice() (Critical Interview Question) -->
    <div class="section-title"><span class="num">4</span>slice() vs splice() (The Crucial Interview Distinction)</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950;">1. slice(start, end) — IMMUTABLE (Safe)</strong>
          <ul style="font-size:13px; color:var(--text2); margin-top:6px; margin-left:16px; line-height:1.6;">
            <li>Original array ni <strong>modify cheyyadhu</strong>.</li>
            <li>Returns a <strong>new shallow copy</strong> of specified range.</li>
            <li>Negative indices support chesthundhi (e.g. <code>arr.slice(-2)</code>).</li>
          </ul>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:16px;">
          <strong style="color:#ff7b72;">2. splice(start, deleteCount, ...items) — MUTATING</strong>
          <ul style="font-size:13px; color:var(--text2); margin-top:6px; margin-left:16px; line-height:1.6;">
            <li>Original array ni <strong>in-place ga modify chesthundi</strong>.</li>
            <li>Items ni delete, replace, or insert cheyyadaniki vadathamu.</li>
            <li>Returns an array of <strong>deleted elements</strong>.</li>
          </ul>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — slice vs splice Code Comparison</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const original = ["A", "B", "C", "D", "E"];

// 1. slice() does NOT change original
const sliced = original.slice(1, 4);
console.log("Sliced (1 to 4):", sliced);       // ["B", "C", "D"]
console.log("Original untouched:", original);  // ["A", "B", "C", "D", "E"]

// 2. splice() modifies original array
// Syntax: splice(startIndex, deleteCount, insertItem1, insertItem2...)
const deleted = original.splice(2, 2, "NEW_C", "NEW_D");
console.log("Deleted by splice:", deleted);    // ["C", "D"]
console.log("Original mutated:", original);    // ["A", "B", "NEW_C", "NEW_D", "E"]</code></pre>
      </div>
    </div>

    <!-- 5. includes, indexOf, join, reverse, concat -->
    <div class="section-title"><span class="num">5</span>Search & Transform: includes, indexOf, join, reverse & concat</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong><code>includes(val)</code>:</strong> Returns <code>true</code> if element exists (handles <code>NaN</code> correctly).</li>
        <li><strong><code>indexOf(val)</code>:</strong> Returns first matching index or <code>-1</code>.</li>
        <li><strong><code>join(separator)</code>:</strong> Array elements ni custom string delimiter tho join chesthundi (e.g. <code>["a","b"].join("-") -> "a-b"</code>).</li>
        <li><strong><code>reverse()</code>:</strong> Reverses the array elements in place (mutates original).</li>
        <li><strong><code>concat(...arrays)</code>:</strong> Combines multiple arrays into a fresh new array without mutating originals.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Search & Transform Methods</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const fruits = ["Apple", "Mango", "Banana"];

console.log("Has 'Mango'?", fruits.includes("Mango")); // true
console.log("Index of 'Banana':", fruits.indexOf("Banana")); // 2
console.log("Joined:", fruits.join(" ➔ ")); // "Apple ➔ Mango ➔ Banana"

const reversed = fruits.reverse();
console.log("Reversed array:", reversed);

const numbers1 = [1, 2];
const numbers2 = [3, 4];
console.log("Concat:", numbers1.concat(numbers2, [5, 6])); // [1, 2, 3, 4, 5, 6]</code></pre>
      </div>
    </div>

    <!-- 6. sort() & The Famous Sorting Quirk -->
    <div class="section-title"><span class="num">6</span>The sort() Method & Numeric Sorting Quirk (Deep Dive)</div>
    <div class="section-body">
      <div class="callout">
        <div class="callout-title">⚠️ The Historic JavaScript Array sort() Quirk</div>
        <p>JavaScript default <code>sort()</code> numbers ni direct ga sort cheyyadhu! Elements ni <strong>Strings ga convert chesi UTF-16 lexicographical (ASCII alphabetic) order</strong> lo sort chesthundi. Andhuke <code>[10, 2, 30].sort()</code> output <code>[10, 2, 30]</code> (or <code>[10, 20, 2]</code>) ga vasthundi, because string <code>"10"</code> comes before <code>"2"</code>!</p>
      </div>

      <p>Numeric values ni accurate ga sort cheyyadaniki <strong>Comparator Function</strong> <code>(a, b) => a - b</code> pass cheyyali:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — sort() Comparator Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const numbers = [10, 2, 30];

// ❌ Default string sort (Buggy for numbers!)
// numbers.sort(); // Output: [10, 2, 30]

// ✅ Correct Numeric Ascending Sort: (a, b) => a - b
numbers.sort((a, b) => a - b);
console.log("Ascending Sorted:", numbers); // [2, 10, 30]

// ✅ Correct Numeric Descending Sort: (a, b) => b - a
numbers.sort((a, b) => b - a);
console.log("Descending Sorted:", numbers); // [30, 10, 2]</code></pre>
      </div>
    </div>

    <!-- 7. Nested Arrays (2D Matrices) -->
    <div class="section-title"><span class="num">7</span>Nested Arrays (Multi-Dimensional 2D Matrices)</div>
    <div class="section-body">
      <p>Oka array lopala maroka array unte dhaanni <strong>2D Array / Nested Array</strong> antaru. Matrix row and column format lo data access avthundi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — 2D Matrix Grid</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Row 0, Col 0:", matrix[0][0]); // 1
console.log("Row 1, Col 1 (Center):", matrix[1][1]); // 5
console.log("Row 2, Col 2:", matrix[2][2]); // 9

// Flattening nested arrays with .flat()
const nested = [1, [2, [3, 4]]];
console.log("Flattened (depth 2):", nested.flat(2)); // [1, 2, 3, 4]</code></pre>
      </div>
    </div>

    <!-- 8. Array Destructuring, Spread & Rest Operators -->
    <div class="section-title"><span class="num">8</span>Array Destructuring, Spread & Rest Operators</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Array Destructuring:</strong> Unpacking array elements into clean individual variables: <code>const [first, second] = arr;</code></li>
        <li><strong>Spread Operator (<code>...</code> Expanding):</strong> Unpacks array items into comma-separated elements (ideal for merging and shallow cloning).</li>
        <li><strong>Rest Operator (<code>...</code> Collecting):</strong> Gathers the remaining elements into a fresh array: <code>const [leader, ...members] = team;</code></li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Destructuring & Spread/Rest</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const scores = [95, 88, 76, 62, 55];

// 1. Destructuring with Rest (...)
const [topper, runnerUp, ...others] = scores;
console.log("Topper:", topper);       // 95
console.log("Runner Up:", runnerUp);   // 88
console.log("Others Array:", others);  // [76, 62, 55]

// 2. Swapping variables in 1 line
let x = 10, y = 20;
[x, y] = [y, x];
console.log("Swapped: x =", x, ", y =", y);

// 3. Spread operator merging
const batch1 = ["Ravi", "Kiran"];
const batch2 = ["Sneha", "Pooja"];
const allStudents = [...batch1, ...batch2, "Vijay"];
console.log("All Students:", allStudents);</code></pre>
      </div>
    </div>

    <!-- 5 PRACTICE ALGORITHMS -->
    <div class="section-title"><span class="num">9</span>5 Real-World Practice Algorithms</div>
    <div class="section-body">
      <p>Mastering arrays through 5 essential coding interview problems:</p>

      <!-- 1. Max and Min -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 1: Find Largest and Smallest in an Array</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const data = [45, 12, 89, 3, 99, 24];

const maxVal = Math.max(...data);
const minVal = Math.min(...data);

console.log("Array:", data);
console.log("Max:", maxVal, "| Min:", minVal);</code></pre>
        </div>
      </div>

      <!-- 2. Remove Duplicates -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 2: Remove Duplicates from an Array</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const duplicateNums = [1, 2, 2, 3, 4, 4, 5, 1];

// Clean 1-line solution using Set and Spread
const uniqueNums = [...new Set(duplicateNums)];

console.log("Original:", duplicateNums);
console.log("Unique:", uniqueNums); // [1, 2, 3, 4, 5]</code></pre>
        </div>
      </div>

      <!-- 3. Array Rotation -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 3: Rotate Array by K Positions</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function rotateRight(arr, k) {
    const n = arr.length;
    const effectiveK = k % n;
    // Slice last k items and put in front
    return [...arr.slice(n - effectiveK), ...arr.slice(0, n - effectiveK)];
}

console.log("Rotated [1,2,3,4,5] right by 2:", rotateRight([1, 2, 3, 4, 5], 2));
// Output: [4, 5, 1, 2, 3]</code></pre>
        </div>
      </div>

      <!-- 4. Frequency Counter -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 4: Element Frequency Counter</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const votes = ["Ravi", "Sneha", "Ravi", "Kiran", "Ravi", "Sneha"];
const counts = {};

for (const vote of votes) {
    counts[vote] = (counts[vote] || 0) + 1;
}

console.log("Vote Counts:", counts);
// { Ravi: 3, Sneha: 2, Kiran: 1 }</code></pre>
        </div>
      </div>

      <!-- 5. 2D Matrix Sum -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 5: Matrix Diagonal Sum</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let primaryDiagonalSum = 0;
for (let i = 0; i < grid.length; i++) {
    primaryDiagonalSum += grid[i][i]; // 1 + 5 + 9
}

console.log("Primary Diagonal Sum (1+5+9):", primaryDiagonalSum); // 15</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this marks array and sorting comparator snippet in our live compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Arrays & Sorting</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Part 1: Marks Array
const marks = [85, 90, 78, 92];
marks.push(88);

console.log("Marks:", marks);
console.log("First Element:", marks[0]);
console.log("Length:", marks.length);

// Part 2: Numeric Sorting with Comparator
const numbers = [10, 2, 30];
numbers.sort((a, b) => a - b);
console.log("Sorted Numbers:", numbers);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 10, subtopics, contentBody, 'strings.html', '9. Strings & Text Processing', 'objects.html', 'Phase 8: Objects');
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
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 10 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, arrays, methods, destructuring, spread rest, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
      <span class="badge">📂 Collapsible Interactive Roadmap (10 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions & branching, loops, strings mastery, arrays deep dive, functions, objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/05-operators-expressions-and-precedence.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-javascript/loops.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-javascript/strings.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Strings →</a>
        <a href="/blog-javascript/arrays.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Arrays →</a>
        <a href="/blog-javascript/objects.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Objects →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Async JS →</a>
        <a href="/blog-javascript/dom.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: DOM & Web APIs →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 7 (Arrays Deep Dive)...');
  buildLesson10();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 7: Arrays Deep Dive successfully created!');
}

run();
