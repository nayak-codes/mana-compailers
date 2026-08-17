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
    title: 'Objects Mastery',
    icon: '📦',
    desc: 'Object ante enti?, Creating objects, Properties, Methods, Dot vs Bracket notation, Adding/Updating/Deleting, Nested objects, Destructuring, Spread & Rest, Object.keys/values/entries, Object.assign, Property shorthand, Computed properties, this binding, and Optional chaining (?.).',
    lessons: [
      { num: 12, file: 'objects.html', title: '12. Objects & Key-Value Mastery', subtopics: 'Object ante enti? · Dot vs Bracket · Methods & this · Nested Objects · Destructuring · Object.keys/values/entries · Computed Props · Optional Chaining' }
    ]
  },
  {
    id: 'phase10',
    tag: 'Phase 10',
    title: 'Functions Mastery',
    icon: '🧩',
    desc: 'Function declaration vs expression, Arrow functions, Parameters vs Arguments, Return values, Default params, Rest params, Callbacks, Higher-order functions, Scopes, Closures, Recursion, Pure functions, Hoisting, this context, call(), apply(), and bind().',
    lessons: [
      { num: 13, file: 'functions.html', title: '13. Functions, Closures & this (Masterclass)', subtopics: 'Declaration vs Expression · Arrow Syntax · Default & Rest · Callbacks & HOF · Scopes & Closures · Recursion · Pure Functions · call, apply, bind' }
    ]
  },
  {
    id: 'phase11',
    tag: 'Phase 11',
    title: 'DOM Manipulation',
    icon: '🌐',
    desc: 'DOM ante enti?, Selecting elements (getElementById, querySelector, querySelectorAll), textContent vs innerHTML, changing styles, classList (add, remove, toggle), reading input values, creating & appending elements, removing elements, data attributes, DOM traversal (parent, children, closest), dynamic lists, and 4 interactive projects.',
    lessons: [
      { num: 14, file: 'dom.html', title: '14. DOM Manipulation & Web Interactivity', subtopics: 'DOM ante enti? · Selecting Elements · textContent vs innerHTML · Styles & classList · createElement & append · Data Attributes · DOM Traversal & closest · 4 Interactive Projects' }
    ]
  },
  {
    id: 'phase12',
    tag: 'Phase 12',
    title: 'Asynchronous JavaScript & APIs',
    icon: '⏳',
    desc: 'Event Loop, Call Stack, Task Queue, Microtask Queue, Promises, async/await, Fetch API, Error Handling with try-catch-finally, and LocalStorage.',
    lessons: [
      { num: 15, file: 'promises.html', title: '15. Promises & Async/Await (Masterclass)', subtopics: 'Event Loop · Call Stack · Promises · async/await · Fetch API' },
      { num: 16, file: 'exceptions.html', title: '16. Error Handling & Debugging', subtopics: 'try...catch...finally · Custom Error Classes · Console Debugging' }
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
      <span class="badge">📂 Phase 11: DOM Manipulation</span>
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
        <span class="title">Phase 12: Async JS & APIs</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 14: DOM Manipulation Masterclass (Phase 11) ──────────────
function buildLesson14() {
  const title = "DOM Manipulation & Web Interactivity (Selecting, Modifying, Events & Dynamic Lists)";
  const desc = "Master DOM Manipulation in JavaScript: DOM architecture, selecting elements with getElementById & querySelector/querySelectorAll, textContent vs innerHTML, styles, classList, reading inputs, createElement, append/remove, dataset attributes, DOM traversal, and 4 interactive mini projects.";
  const filename = "dom.html";
  const subtopics = "DOM Architecture · Selecting Elements · textContent vs innerHTML · Styles & classList · Reading Inputs · createElement & append · dataset Attributes · Traversal & closest() · Dynamic Lists · 4 Interactive Projects";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 11: DOM Manipulation</strong>! <strong>DOM (Document Object Model)</strong> webpage structure ni JavaScript interact cheyagalige <em>in-memory tree representation</em> ga provide chesthundhi. HTML document browser lo load avvagane, browser static HTML tags ni JavaScript Objects ga convert chesi <strong>Node Tree Hierarchy</strong> ni construct chesthundhi. In this comprehensive masterclass guide, you will master element selectors (<code>getElementById</code>, <code>querySelector</code>, <code>querySelectorAll</code>), changing text, HTML, styles and classes (<code>classList</code>), reading form inputs, dynamic element creation (<code>createElement</code>, <code>append</code>, <code>remove</code>), data attributes (<code>dataset</code>), DOM traversal (<code>parentElement</code>, <code>closest</code>), dynamic list rendering, and build 4 interactive browser UI projects.</p>
    </div>

    <!-- 1. DOM Ante Enti? -->
    <div class="section-title"><span class="num">1</span>DOM Ante Enti? (Tree Architecture & In-Memory Representation)</div>
    <div class="section-body">
      <p>Browser HTML document ni parse chesi memory lo create chese hierarchical tree structure ni <strong>DOM (Document Object Model)</strong> antaru. Dheenilo prati HTML tag, attribute, text oka <strong>Node Object</strong> ga untundhi. JavaScript ee DOM nodes ni access chesi webpage content, layout, mariyu styles ni dynamically live ga update cheyyagaladhu:</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:18px; margin:16px 0; font-family:'JetBrains Mono', monospace; font-size:13px; color:#58a6ff; line-height:1.8;">
        window<br>
        └── document (Document Object)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;└── &lt;html&gt;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── &lt;head&gt; (title, meta, links)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── &lt;body&gt;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── &lt;h1 id="title"&gt;Old Title&lt;/h1&gt;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── &lt;button id="changeButton"&gt;Change Title&lt;/button&gt;
      </div>
    </div>

    <!-- 2. Selecting Elements -->
    <div class="section-title"><span class="num">2</span>Selecting Elements (getElementById vs querySelector vs querySelectorAll)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Method</th><th>Selector Syntax</th><th>Return Type</th><th>Description</th></tr>
        <tr>
          <td><strong><code>document.getElementById('id')</code></strong></td>
          <td>Only ID string: <code>'title'</code></td>
          <td>Single <code>Element</code> or <code>null</code></td>
          <td>Fastest selector by unique ID.</td>
        </tr>
        <tr>
          <td><strong><code>document.querySelector('css')</code></strong> ⭐ Recommended</td>
          <td>CSS Selector: <code>'#title'</code>, <code>'.btn'</code>, <code>'div &gt; p'</code></td>
          <td><strong>FIRST matching Element</strong> or <code>null</code></td>
          <td>Modern universal selector for any CSS query.</td>
        </tr>
        <tr>
          <td><strong><code>document.querySelectorAll('css')</code></strong></td>
          <td>CSS Selector: <code>'.item'</code></td>
          <td><strong>Static <code>NodeList</code></strong> (all matches)</td>
          <td>Returns collection of all matches. Supports <code>.forEach()</code>.</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML & JavaScript — Title Changer Example</span>
          <a class="try-btn" href="/online-html-editor.html">▶ Try in HTML/JS Editor</a>
        </div>
        <pre><code>&lt;!-- HTML Structure --&gt;
&lt;h1 id="title"&gt;Old Title&lt;/h1&gt;
&lt;button id="changeButton"&gt;Change Title&lt;/button&gt;

&lt;script&gt;
// Select elements
const title = document.querySelector("#title");
const button = document.querySelector("#changeButton");

// Attach click event listener
button.addEventListener("click", () => {
    title.textContent = "New Title";
    title.style.color = "#f7df1e";
});
&lt;/script&gt;</code></pre>
      </div>
    </div>

    <!-- 3. Changing Text, HTML & Security -->
    <div class="section-title"><span class="num">3</span>Changing Text & HTML: textContent vs innerHTML</div>
    <div class="section-body">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950;">1. textContent (⭐ Safe & Fast)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Element lopali raw plain text ni update chesthundi. HTML tags ni text gane treat chesthundi, preventing <strong>XSS (Cross-Site Scripting)</strong> attacks!</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:16px;">
          <strong style="color:#ff7b72;">2. innerHTML (⚠️ Use with Caution)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">HTML tags ni parse chesi render chesthundi (e.g. <code>&lt;strong&gt;Bold&lt;/strong&gt;</code>). User input ni direct ga innerHTML lo inject cheyyakudadhu!</p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — textContent vs innerHTML</span>
        </div>
        <pre><code>"use strict";

const box = document.querySelector("#box");

// 1. Safe plain text
box.textContent = "Welcome to JavaScript 2026!";

// 2. Rich HTML Rendering
box.innerHTML = "&lt;span style='color: #f7df1e;'&gt;Welcome&lt;/span&gt; to &lt;strong&gt;Our Compiler&lt;/strong&gt;!";</code></pre>
      </div>
    </div>

    <!-- 4. Changing Styles & classList -->
    <div class="section-title"><span class="num">4</span>Changing Styles & classList (add, remove, toggle, contains)</div>
    <div class="section-body">
      <p>Inline styles rayadam badhulu CSS classes ni <strong><code>classList</code></strong> API tho manage cheyyadam best industry practice:</p>

      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><code>element.classList.add("active", "highlight")</code> — Adds classes.</li>
        <li><code>element.classList.remove("hidden")</code> — Removes class.</li>
        <li><code>element.classList.toggle("dark-mode")</code> — Adds if missing, removes if present (perfect for theme switchers!).</li>
        <li><code>element.classList.contains("active")</code> — Returns boolean <code>true</code>/<code>false</code>.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — classList in Action</span>
        </div>
        <pre><code>"use strict";

const card = document.querySelector(".card");

// Toggle card expansion
card.classList.toggle("expanded");

if (card.classList.contains("expanded")) {
    console.log("Card is currently open!");
}</code></pre>
      </div>
    </div>

    <!-- 5. Creating, Appending & Removing Elements -->
    <div class="section-title"><span class="num">5</span>Creating, Appending & Removing Elements (DOM Tree Mutations)</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Method</th><th>Description</th><th>Example</th></tr>
        <tr><td><strong><code>document.createElement(tag)</code></strong></td><td>Creates new unattached DOM element node</td><td><code>const div = document.createElement('div');</code></td></tr>
        <tr><td><strong><code>parent.append(...nodes)</code></strong></td><td>Inserts nodes/text at <strong>END</strong> of parent (ES6 ⭐)</td><td><code>list.append(newLi);</code></td></tr>
        <tr><td><strong><code>parent.prepend(...nodes)</code></strong></td><td>Inserts nodes at <strong>START</strong> of parent</td><td><code>list.prepend(newLi);</code></td></tr>
        <tr><td><strong><code>element.remove()</code></strong></td><td>Removes the element directly from DOM tree</td><td><code>item.remove();</code></td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Dynamic Element Creation</span>
        </div>
        <pre><code>"use strict";

const container = document.querySelector("#list-container");

// 1. Create element
const newCard = document.createElement("div");
newCard.className = "item-card";
newCard.textContent = "New Dynamic Module";

// 2. Set dataset attribute
newCard.dataset.moduleId = "mod_42";

// 3. Append to parent
container.append(newCard);

// 4. Delete after 5 seconds
// newCard.remove();</code></pre>
      </div>
    </div>

    <!-- 6. Attributes, Data Attributes & DOM Traversal -->
    <div class="section-title"><span class="num">6</span>Data Attributes (dataset) & DOM Traversal (closest)</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Data Attributes (<code>data-*</code>):</strong> Custom metadata stored on HTML tags: <code>&lt;button data-user-id="101" data-action="delete"&gt;</code> $\rightarrow$ read with <code>button.dataset.userId</code> and <code>button.dataset.action</code>.</li>
        <li><strong>DOM Traversal:</strong>
          <ul>
            <li><code>el.parentElement</code> — Immediate parent element.</li>
            <li><code>el.children</code> — Direct child elements.</li>
            <li><code>el.closest('.target-selector')</code> ⭐ — Traverses UPwards from current element to find closest matching ancestor (ideal for event delegation!).</li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 4 REAL-WORLD PRACTICE PROJECTS -->
    <div class="section-title"><span class="num">7</span>4 Interactive Real-World Browser Projects</div>
    <div class="section-body">
      <p>Mastering DOM manipulation through 4 complete production components:</p>

      <!-- Project 1: Dynamic Todo / Task Manager -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 1: Dynamic Task Manager (Create, Toggle, Delete)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">HTML + JavaScript — Interactive Todo List</span>
            <a class="try-btn" href="/online-html-editor.html">▶ Try in Editor</a>
          </div>
          <pre><code>&lt;!-- HTML --&gt;
&lt;input type="text" id="taskInput" placeholder="Enter new task..."&gt;
&lt;button id="addTaskBtn"&gt;Add Task&lt;/button&gt;
&lt;ul id="taskList"&gt;&lt;/ul&gt;

&lt;script&gt;
const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return alert("Please enter task name!");

    // 1. Create LI element
    const li = document.createElement("li");
    li.textContent = text;
    li.style.cursor = "pointer";

    // 2. Create Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = " ❌";
    delBtn.style.marginLeft = "10px";

    // Toggle complete
    li.addEventListener("click", (e) => {
        if (e.target !== delBtn) li.style.textDecoration = li.style.textDecoration === "line-through" ? "none" : "line-through";
    });

    // Delete item
    delBtn.addEventListener("click", () => li.remove());

    li.append(delBtn);
    taskList.append(li);
    taskInput.value = ""; // Clear input
});
&lt;/script&gt;</code></pre>
        </div>
      </div>

      <!-- Project 2: Dark/Light Mode Theme Switcher -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 2: Dark/Light Mode Switcher with classList.toggle</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Theme Toggle</span>
          </div>
          <pre><code>const themeToggleBtn = document.querySelector("#themeToggle");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    themeToggleBtn.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
    localStorage.setItem("user-theme", isLight ? "light" : "dark");
});</code></pre>
        </div>
      </div>

      <!-- Project 3: Live Character & Word Counter -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 3: Live Character & Word Counter for Textarea</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Live Input Analytics</span>
          </div>
          <pre><code>const textarea = document.querySelector("#editor");
const charCountDisplay = document.querySelector("#charCount");
const wordCountDisplay = document.querySelector("#wordCount");

textarea.addEventListener("input", () => {
    const text = textarea.value;
    charCountDisplay.textContent = text.length;

    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
    wordCountDisplay.textContent = words;
});</code></pre>
        </div>
      </div>

      <!-- Project 4: Filterable Product Catalog Grid -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 4: Filterable Product Catalog via data-* attributes</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Catalog Filter</span>
          </div>
          <pre><code>function filterProducts(category) {
    const allProducts = document.querySelectorAll(".product-card");

    allProducts.forEach(card => {
        const itemCategory = card.dataset.category;
        if (category === "all" || itemCategory === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Test dynamic element selection and event handling in our online HTML/JS Editor:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML + JavaScript</span>
          <a class="try-btn" href="/online-html-editor.html">▶ Open HTML/JS Editor</a>
        </div>
        <pre><code>&lt;h1 id="title"&gt;Old Title&lt;/h1&gt;
&lt;button id="changeButton"&gt;Change Title&lt;/button&gt;

&lt;script&gt;
const title = document.querySelector("#title");
const button = document.querySelector("#changeButton");

button.addEventListener("click", () => {
    title.textContent = "New Title";
});
&lt;/script&gt;</code></pre>
      </div>
      <a class="run-btn" href="/online-html-editor.html">Open in HTML/CSS/JS Editor →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 14, subtopics, contentBody, 'functions.html', '13. Functions & Closures', 'promises.html', 'Phase 12: Promises & Async/Await');
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
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, DOM manipulation, querySelector, createElement, classList, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, DOM manipulation, querySelector, classList, Async/Await, Promises, Closures, Node.js, and technical interview preparation with live runnable code examples.",
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
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions, loops, strings, arrays deep dive, higher-order array methods, objects, functions, DOM manipulation, or async APIs:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/05-operators-expressions-and-precedence.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-javascript/loops.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-javascript/strings.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Strings →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Arrays →</a>
        <a href="/blog-javascript/array-methods.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Array Methods →</a>
        <a href="/blog-javascript/objects.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Objects →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: Functions →</a>
        <a href="/blog-javascript/dom.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 11: DOM Manipulation →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 11 (DOM Manipulation)...');
  buildLesson14();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 11: DOM Manipulation successfully created!');
}

run();
