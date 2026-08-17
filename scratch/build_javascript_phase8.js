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
      { num: 10, file: 'arrays.html', title: '10. Arrays Deep Dive & Core Operations', subtopics: 'Array ante enti? · Indexes & length · push/pop/shift/unshift · slice vs splice · sort() Quirks & Comparators · Nested 2D · Destructuring & Spread/Rest' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Higher-Order Array Methods',
    icon: '⚡',
    desc: 'forEach, map, filter, find, findIndex, some, every, reduce, flat, flatMap, Method Chaining pipelines, ES2023 Immutable methods (toSorted, toReversed, toSpliced, with), Data transformation, Search decision tree, and Grouping with Object.groupBy.',
    lessons: [
      { num: 11, file: 'array-methods.html', title: '11. Array Methods (map, filter, reduce & ES2024)', subtopics: 'forEach · map · filter · find/findIndex · some/every · reduce Accumulator · flat/flatMap · Method Chaining · Immutable Methods · Object.groupBy' }
    ]
  },
  {
    id: 'phase9',
    tag: 'Phase 09',
    title: 'Objects & JSON',
    icon: '📦',
    desc: 'Object literals, dot vs bracket notation, methods, this binding, Object.keys/values/entries, JSON serialization, and cloning.',
    lessons: [
      { num: 12, file: 'objects.html', title: '12. Objects & JSON Mastery', subtopics: 'Object Literals · Properties & Methods · JSON Parsing · Object static methods' }
    ]
  },
  {
    id: 'phase10',
    tag: 'Phase 10',
    title: 'Functions & Arrow Syntax',
    icon: '🧩',
    desc: 'Function declarations, expressions, arrow functions, default params, rest params, callback functions, and pure functions.',
    lessons: [
      { num: 13, file: 'functions.html', title: '13. Functions & Arrow Syntax', subtopics: 'Declaration vs Expression · Arrow Syntax · Default Params · Closures' }
    ]
  },
  {
    id: 'phase11',
    tag: 'Phase 11',
    title: 'Advanced ES6+ & OOP',
    icon: '🏗️',
    desc: 'Array & Object Destructuring, ES6 Classes, Prototypes, Inheritance, and this keyword binding.',
    lessons: [
      { num: 14, file: 'es6-features.html', title: '14. ES6+ Advanced Features', subtopics: 'Advanced Destructuring · Symbols · Maps & Sets' },
      { num: 15, file: 'closures.html', title: '15. Closures & Scope Chain', subtopics: 'Lexical Scope · Closures · Higher Order Functions' },
      { num: 16, file: 'oop.html', title: '16. OOP: Classes & Prototypes', subtopics: 'Prototypes · ES6 Classes · Getters/Setters · Static' }
    ]
  },
  {
    id: 'phase12',
    tag: 'Phase 12',
    title: 'Asynchronous JavaScript & DOM',
    icon: '⏳',
    desc: 'Event Loop, Call Stack, Task Queue, Microtask Queue, Promises, async/await, Fetch API, DOM manipulation, and LocalStorage.',
    lessons: [
      { num: 17, file: 'promises.html', title: '17. Promises & Async/Await', subtopics: 'Event Loop · Call Stack · Promise · async/await · Fetch API' },
      { num: 18, file: 'exceptions.html', title: '18. Error Handling & Debugging', subtopics: 'try...catch...finally · Custom Error Classes · Console Debugging' },
      { num: 19, file: 'dom.html', title: '19. DOM Basics & Event Listeners', subtopics: 'querySelector · DOM Modification · addEventListener · LocalStorage' }
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
      <p>Welcome to <strong>Phase 8: Higher-Order Array Methods</strong>! In modern full-stack JavaScript (React, Node.js, Next.js, and TypeScript), traditional <code>for</code> loops are often replaced by expressive, declarative <strong>Higher-Order Array Methods</strong>. A Higher-Order Method is a function that takes a callback function as an argument to process elements. In this comprehensive masterclass guide, you will master <code>map()</code>, <code>filter()</code>, <code>reduce()</code>, <code>find()</code>, <code>findIndex()</code>, <code>some()</code>, <code>every()</code>, <code>flatMap()</code>, multi-step <strong>Method Chaining Pipelines</strong>, modern <strong>ES2023 Immutable Array Methods</strong> (<code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code>, <code>with</code>), and ES2024 <code>Object.groupBy()</code>.</p>
    </div>

    <!-- 1. The Core Functional Trio: forEach, map, filter -->
    <div class="section-title"><span class="num">1</span>The Core Functional Trio: forEach(), map() & filter()</div>
    <div class="section-body">
      <p>Understanding the exact difference between these three methods is fundamental to writing clean JavaScript:</p>

      <table class="tbl">
        <tr><th>Method</th><th>Purpose</th><th>Returns</th><th>Mutates Original?</th></tr>
        <tr>
          <td><strong><code>forEach(callback)</code></strong></td>
          <td>Side-effects iteration (e.g. logging, DOM updates). Cannot break/return early.</td>
          <td><code>undefined</code></td>
          <td>No</td>
        </tr>
        <tr>
          <td><strong><code>map(callback)</code></strong></td>
          <td>Transforms every element into a new value. Length of new array is <strong>always identical</strong>.</td>
          <td><strong>New transformed array</strong></td>
          <td>No (Immutable ⭐)</td>
        </tr>
        <tr>
          <td><strong><code>filter(callback)</code></strong></td>
          <td>Evaluates predicate condition (<code>true</code>/<code>false</code>). Keeps only matching items.</td>
          <td><strong>New filtered array</strong></td>
          <td>No (Immutable ⭐)</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — map & filter Pipeline</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const numbers = [10, 15, 20, 25, 30];

// Filter even numbers, then double them
const evenNumbers = numbers
    .filter(number => number % 2 === 0)
    .map(number => number * 2);

console.log("Original Numbers:", numbers);
console.log("Filtered & Doubled:", evenNumbers); // [20, 40, 60]</code></pre>
      </div>
    </div>

    <!-- 2. Searching Data: find, findIndex, some, every -->
    <div class="section-title"><span class="num">2</span>Searching & Testing: find(), findIndex(), some() & every()</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:14px;">
          <strong style="color:#58a6ff;">1. find() vs findIndex()</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;"><code>find()</code> returns the <strong>first matching element value</strong> (or <code>undefined</code>). <code>findIndex()</code> returns the <strong>first matching index</strong> (or <code>-1</code>).</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:14px;">
          <strong style="color:#3fb950;">2. some() vs every()</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;"><code>some()</code> returns <code>true</code> if <strong>at least ONE</strong> element matches. <code>every()</code> returns <code>true</code> only if <strong>ALL</strong> elements match.</p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Search & Test Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const users = [
    { id: 101, name: "Ravi", age: 21, isVerified: true },
    { id: 102, name: "Sneha", age: 17, isVerified: true },
    { id: 103, name: "Kiran", age: 25, isVerified: false }
];

// 1. find & findIndex
const userRavi = users.find(u => u.name === "Ravi");
console.log("Found User:", userRavi);

const underageIndex = users.findIndex(u => u.age < 18);
console.log("First Underage Index:", underageIndex); // 1 (Sneha)

// 2. some & every
const hasUnderage = users.some(u => u.age < 18);
console.log("Has any underage user?", hasUnderage); // true

const areAllVerified = users.every(u => u.isVerified);
console.log("Are all users verified?", areAllVerified); // false</code></pre>
      </div>
    </div>

    <!-- 3. The Power of reduce() -->
    <div class="section-title"><span class="num">3</span>The Swiss Army Knife: reduce() (Deep Dive)</div>
    <div class="section-body">
      <p><code>reduce()</code> array lo unna anni elements ni process chesi <strong>single accumulator value</strong> (Number, Object, String, or Array) ga condense chesthundhi. Dheeni signature:</p>
      
      <code style="display:block; padding:12px 16px; background:#0d1117; border-radius:8px; color:#7ee787; margin:10px 0; font-size:13px;">array.reduce((accumulator, currentValue, index, array) => {<br>    return nextAccumulatorValue;<br>}, initialValue);</code>

      <div class="callout">
        <div class="callout-title">⚠️ Always Provide an Initial Value!</div>
        <p>Meeru <code>initialValue</code> ivvakapothe, array lo first element accumulator ga set avthundhi mariyu loop index 1 nunchi start avthundhi. Empty arrays meedha initial value lekunda <code>reduce()</code> call chesthe <code>TypeError: Reduce of empty array with no initial value</code> throw chesthundhi!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — reduce() Master Examples</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const cart = [
    { item: "Laptop", price: 65000, qty: 1 },
    { item: "Mouse", price: 800, qty: 2 },
    { item: "Monitor", price: 14000, qty: 1 }
];

// 1. Calculate Total Cart Price
const totalPrice = cart.reduce((acc, product) => {
    return acc + (product.price * product.qty);
}, 0);

console.log("Total Cart Price: Rs.", totalPrice); // 80600

// 2. Count Occurrences using reduce
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const countMap = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

console.log("Fruit Counts:", countMap); // { apple: 3, banana: 2, orange: 1 }</code></pre>
      </div>
    </div>

    <!-- 4. flat() and flatMap() -->
    <div class="section-title"><span class="num">4</span>Flattening Nested Structures: flat() & flatMap()</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><code>arr.flat(depth)</code> — Multi-level nested arrays ni single level array ga flatten chesthundhi (default depth is <code>1</code>). Pass <code>Infinity</code> to flatten all depths!</li>
        <li><code>arr.flatMap(callback)</code> — First <code>map()</code> function execute chesi, result ni 1-level <code>flat()</code> chesthundhi (more performant than calling <code>.map().flat()</code> separately).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — flat & flatMap</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// flat() with Infinity
const deepArray = [1, [2, [3, [4, 5]]]];
console.log("Fully Flattened:", deepArray.flat(Infinity)); // [1, 2, 3, 4, 5]

// flatMap() split sentences into words
const sentences = ["Hello World", "JavaScript ES2026", "Master Course"];
const allWords = sentences.flatMap(s => s.split(" "));
console.log("All Words (flatMap):", allWords);
// ["Hello", "World", "JavaScript", "ES2026", "Master", "Course"]</code></pre>
      </div>
    </div>

    <!-- 5. Modern ES2023 Immutable Array Methods -->
    <div class="section-title"><span class="num">5</span>Modern ES2023+ Immutable Array Methods ⭐</div>
    <div class="section-body">
      <p>Historically, <code>sort()</code>, <code>reverse()</code>, and <code>splice()</code> modified the original array in-place, causing state management bugs in React. <strong>ES2023 introduced safe, non-mutating immutable alternatives</strong>:</p>

      <table class="tbl">
        <tr><th>Mutating (Old)</th><th>Immutable (ES2023 ⭐)</th><th>Behavior</th></tr>
        <tr><td><code>arr.sort()</code></td><td><strong><code>arr.toSorted()</code></strong></td><td>Returns new sorted array without mutating original.</td></tr>
        <tr><td><code>arr.reverse()</code></td><td><strong><code>arr.toReversed()</code></strong></td><td>Returns new reversed array without mutating original.</td></tr>
        <tr><td><code>arr.splice()</code></td><td><strong><code>arr.toSpliced()</code></strong></td><td>Returns new array with deleted/added items without mutating original.</td></tr>
        <tr><td><code>arr[i] = val</code></td><td><strong><code>arr.with(i, val)</code></strong></td><td>Returns new array with updated item at index <code>i</code> without mutating original.</td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — ES2023 toSorted & with Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const scores = [80, 20, 95, 40];

// Safe sorting with toSorted()
const sortedScores = scores.toSorted((a, b) => a - b);
console.log("Original scores (Untouched!):", scores); // [80, 20, 95, 40]
console.log("New sorted scores:", sortedScores);       // [20, 40, 80, 95]

// Safe element replacement with .with()
const updatedScores = scores.with(1, 99); // Replace index 1 with 99
console.log("After with(1, 99):", updatedScores);     // [80, 99, 95, 40]</code></pre>
      </div>
    </div>

    <!-- 6. Grouping Data with Object.groupBy() (ES2024) -->
    <div class="section-title"><span class="num">6</span>Grouping Data: Object.groupBy() (ES2024 Standard)</div>
    <div class="section-body">
      <p>ES2024 introduced the built-in <strong><code>Object.groupBy()</code></strong> method to group array elements by a categorical key without writing complex custom reducers:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Grouping Data Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const inventory = [
    { name: "iPhone 15", category: "Electronics", price: 80000 },
    { name: "T-Shirt", category: "Apparel", price: 1200 },
    { name: "MacBook Pro", category: "Electronics", price: 150000 },
    { name: "Jeans", category: "Apparel", price: 2500 }
];

// ES2024 Object.groupBy (or reduce fallback)
const grouped = inventory.reduce((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item.name);
    return acc;
}, {});

console.log("Grouped Products by Category:", grouped);
// { Electronics: ["iPhone 15", "MacBook Pro"], Apparel: ["T-Shirt", "Jeans"] }</code></pre>
      </div>
    </div>

    <!-- 4 REAL-WORLD PRACTICE PROJECTS -->
    <div class="section-title"><span class="num">7</span>4 Real-World Data Processing Projects</div>
    <div class="section-body">
      <p>Mastering Higher-Order Array pipelines through 4 production-grade projects:</p>

      <!-- Project 1: E-Commerce Cart Engine -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 1: E-Commerce Checkout Engine (filter + map + reduce)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — E-Commerce Cart</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const cartItems = [
    { id: 1, name: "Keyboard", price: 2500, inStock: true, taxRate: 0.18 },
    { id: 2, name: "Webcam", price: 4000, inStock: false, taxRate: 0.18 }, // Out of stock
    { id: 3, name: "Desk Mat", price: 800, inStock: true, taxRate: 0.12 }
];

// Calculate final payable amount for in-stock items including tax
const grandTotal = cartItems
    .filter(item => item.inStock) // 1. Keep only available items
    .map(item => item.price * (1 + item.taxRate)) // 2. Add GST tax
    .reduce((sum, itemTotal) => sum + itemTotal, 0); // 3. Accumulate sum

console.log("Grand Total Payable: Rs.", Math.round(grandTotal)); // Rs. 3846</code></pre>
        </div>
      </div>

      <!-- Project 2: Student Grade Analytics -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 2: Student Class Analytics & Rank List</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Student Analytics</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const students = [
    { name: "Ravi", marks: [85, 90, 78] },
    { name: "Sneha", marks: [95, 92, 98] },
    { name: "Kiran", marks: [50, 45, 55] }
];

// Transform to compute average, assign grade, and sort top scorers
const classLeaderboard = students
    .map(s => {
        const total = s.marks.reduce((a, b) => a + b, 0);
        const avg = Math.round(total / s.marks.length);
        return { name: s.name, average: avg, status: avg >= 60 ? "PASS" : "FAIL" };
    })
    .sort((a, b) => b.average - a.average);

console.log("Class Leaderboard:", classLeaderboard);</code></pre>
        </div>
      </div>

      <!-- Project 3: Data Sanitization Pipeline -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 3: Raw API Data Sanitization & Deduplication</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — API Data Sanitizer</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const rawTags = ["  JavaScript  ", "React.JS ", "JAVASCRIPT", "  node.js", "REACT.js", " python "];

const cleanTags = [...new Set(
    rawTags
        .map(tag => tag.trim().toLowerCase()) // Trim whitespace and normalize case
        .filter(tag => tag.length > 0)
)];

console.log("Clean Unique Tags:", cleanTags);
// ["javascript", "react.js", "node.js", "python"]</code></pre>
        </div>
      </div>

      <!-- Project 4: Financial Transaction Ledger -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 4: Bank Account Balance & Expense Breakdown</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Banking Ledger</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const transactions = [
    { type: "credit", amount: 50000, desc: "Salary" },
    { type: "debit", amount: 15000, desc: "Rent" },
    { type: "debit", amount: 4500, desc: "Groceries" },
    { type: "credit", amount: 8000, desc: "Freelancing" }
];

const ledgerSummary = transactions.reduce((acc, t) => {
    if (t.type === "credit") {
        acc.totalCredits += t.amount;
        acc.balance += t.amount;
    } else {
        acc.totalDebits += t.amount;
        acc.balance -= t.amount;
    }
    return acc;
}, { totalCredits: 0, totalDebits: 0, balance: 0 });

console.log("Ledger Statement:", ledgerSummary);
// { totalCredits: 58000, totalDebits: 19500, balance: 38500 }</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this filter-map pipeline snippet in our live compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Array Methods</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const numbers = [10, 15, 20, 25, 30];

const evenNumbers = numbers
    .filter(number => number % 2 === 0)
    .map(number => number * 2);

console.log("Original Numbers:", numbers);
console.log("Even Numbers Doubled:", evenNumbers);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
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
