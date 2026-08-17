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
    title: 'Events & Forms',
    icon: '🎯',
    desc: 'Browser events, addEventListener, click, dblclick, mouse events, keyboard events, input & change, submit event, focus & blur, event object, event bubbling vs capturing, event delegation, preventDefault, form validation, error messages, and 6 full projects.',
    lessons: [
      { num: 15, file: 'events-and-forms.html', title: '15. Browser Events, Forms & Event Delegation', subtopics: 'addEventListener · Click, Mouse & Keyboard · Input vs Change · Submit & preventDefault() · Bubbling & Delegation · Form Validation · 6 Complete Projects' }
    ]
  },
  {
    id: 'phase13',
    tag: 'Phase 13',
    title: 'Browser APIs & Storage',
    icon: '💾',
    desc: 'window, document, console utilities, setTimeout, setInterval, clearTimeout, clearInterval, localStorage, sessionStorage, Cookies, URL & URLSearchParams, History API, Clipboard API, Geolocation API, Notifications, and Permissions.',
    lessons: [
      { num: 16, file: 'browser-apis-and-storage.html', title: '16. Browser APIs, Storage & Timers', subtopics: 'window & document · Timers (setTimeout/setInterval) · localStorage vs sessionStorage vs Cookies · URL API · History · Clipboard · Geolocation · Notifications' }
    ]
  },
  {
    id: 'phase14',
    tag: 'Phase 14',
    title: 'Asynchronous JavaScript & APIs',
    icon: '⏳',
    desc: 'Event Loop, Call Stack, Task Queue, Microtask Queue, Promises, async/await, Fetch API, Error Handling with try-catch-finally, and Network requests.',
    lessons: [
      { num: 17, file: 'promises.html', title: '17. Promises & Async/Await (Masterclass)', subtopics: 'Event Loop · Call Stack · Promises · async/await · Fetch API' },
      { num: 18, file: 'exceptions.html', title: '18. Error Handling & Debugging', subtopics: 'try...catch...finally · Custom Error Classes · Console Debugging' }
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
      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false','alert','prompt','confirm','parseInt','parseFloat','isNaN','localStorage','sessionStorage','Notification','navigator','history','URL'];
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
      <span class="badge">📂 Phase 13: Browser APIs & Storage</span>
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
        <span class="title">Phase 14: Promises & Async</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 16: Browser APIs & Storage (Phase 13 Masterclass) ─────────
function buildLesson16() {
  const title = "Browser APIs, Web Storage & Timers (The Complete Masterclass)";
  const desc = "Master Browser APIs & Client Storage: window, document, console, setTimeout, setInterval, clearTimeout, clearInterval, localStorage vs sessionStorage vs Cookies, URL API, History API, Clipboard API, Geolocation API, Notifications, and Permissions.";
  const filename = "browser-apis-and-storage.html";
  const subtopics = "window & document · Timers (setTimeout/setInterval) · localStorage vs sessionStorage vs Cookies · URL API · History API · Clipboard API · Geolocation · Notifications & Permissions · 4 Projects";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 13: Browser APIs and Storage</strong>! While core JavaScript provides language syntax and data structures, modern web browsers equip developers with a powerful suite of <strong>Web APIs (Browser Object Model)</strong> and <strong>Client-Side Storage Engines</strong>. In this comprehensive masterclass guide, you will master the global <code>window</code> environment, scheduling with <code>setTimeout</code> & <code>setInterval</code>, persistent client storage with <strong><code>localStorage</code></strong>, session-based storage with <strong><code>sessionStorage</code></strong>, HTTP Cookies, dynamic routing with the <strong>URL & History APIs</strong>, seamless clipboard copying with the <strong>Clipboard API</strong>, user coordinates with the <strong>Geolocation API</strong>, and desktop alerts with the <strong>Notifications API</strong>.</p>
    </div>

    <!-- 1. The Global BOM Environment -->
    <div class="section-title"><span class="num">1</span>The Global Browser Environment: window, document & console</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong><code>window</code>:</strong> The global execution root object in web browsers. All global variables, BOM APIs, and viewport metrics (<code>window.innerWidth</code>, <code>window.innerHeight</code>) belong to <code>window</code>.</li>
        <li><strong><code>document</code>:</strong> The DOM root node representing the HTML page content currently loaded inside the window.</li>
        <li><strong><code>console</code>:</strong> Rich developer diagnostics (<code>console.log()</code>, <code>console.warn()</code>, <code>console.error()</code>, <code>console.table()</code>, and performance timers <code>console.time()</code> / <code>console.timeEnd()</code>).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Console Diagnostics</span>
        </div>
        <pre><code>"use strict";

const students = [
    { name: "Ravi", role: "Frontend Dev", score: 95 },
    { name: "Sneha", role: "Backend Dev", score: 92 }
];

console.table(students); // Prints formatted interactive table in DevTools!

console.time("ArrayProcess");
const filtered = students.filter(s => s.score > 90);
console.timeEnd("ArrayProcess"); // Prints exact execution time in milliseconds</code></pre>
      </div>
    </div>

    <!-- 2. Timers & Scheduling -->
    <div class="section-title"><span class="num">2</span>Timers & Scheduling: setTimeout vs setInterval</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Timer API</th><th>Execution Pattern</th><th>Cancellation Method</th></tr>
        <tr>
          <td><strong><code>setTimeout(callback, delayMs)</code></strong></td>
          <td>Runs <strong>ONCE</strong> after delay milliseconds.</td>
          <td><code>clearTimeout(timerId)</code></td>
        </tr>
        <tr>
          <td><strong><code>setInterval(callback, intervalMs)</code></strong></td>
          <td>Repeats <strong>CONTINUOUSLY</strong> every interval milliseconds.</td>
          <td><code>clearInterval(intervalId)</code> ⭐ Crucial to avoid memory leaks!</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Countdown Timer with setInterval</span>
        </div>
        <pre><code>"use strict";

let count = 5;

const countdownTimer = setInterval(() => {
    console.log("Countdown:", count);
    count--;

    if (count < 0) {
        clearInterval(countdownTimer); // Stop timer!
        console.log("🚀 Blast Off! Mission Started.");
    }
}, 1000);</code></pre>
      </div>
    </div>

    <!-- 3. Client-Side Storage -->
    <div class="section-title"><span class="num">3</span>Client Storage: localStorage vs sessionStorage vs Cookies</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Feature</th><th>localStorage ⭐</th><th>sessionStorage</th><th>Cookies (document.cookie)</th></tr>
        <tr><td><strong>Persistence</strong></td><td><strong>Permanent</strong> (survives tab & browser close)</td><td>Tab Session Only (cleared on tab close)</td><td>Expires based on Max-Age / Expiry date</td></tr>
        <tr><td><strong>Storage Capacity</strong></td><td><strong>~5MB - 10MB</strong></td><td>~5MB</td><td>~4KB (very small)</td></tr>
        <tr><td><strong>Server Sent?</strong></td><td>❌ No (Pure Client-side)</td><td>❌ No</td><td>✅ Yes (Sent with every HTTP header)</td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — localStorage CRUD Operations</span>
        </div>
        <pre><code>// 1. Store single string
localStorage.setItem("username", "Ravi");

// 2. Read single string
const username = localStorage.getItem("username");
console.log("Retrieved Username:", username); // "Ravi"

// 3. Storing Objects & Arrays with JSON
const userPreferences = { theme: "dark", fontSize: 16 };
localStorage.setItem("userPrefs", JSON.stringify(userPreferences));

// 4. Reading & Parsing JSON
const savedPrefs = JSON.parse(localStorage.getItem("userPrefs"));
console.log("Saved Theme:", savedPrefs?.theme);

// 5. Deleting item
localStorage.removeItem("username");
// localStorage.clear(); // Clears all keys for current origin</code></pre>
      </div>
    </div>

    <!-- 4. URL API & History API -->
    <div class="section-title"><span class="num">4</span>URL API & History API (Single Page Application Routing)</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong><code>URL & URLSearchParams</code>:</strong> Effortlessly parsing URL queries without messy string splits: <code>const params = new URLSearchParams(window.location.search); const id = params.get("id");</code></li>
        <li><strong><code>History API</code>:</strong> Updating browser URL without triggering a page reload (used by React Router / Next.js): <code>history.pushState({ page: 2 }, "Page 2", "/page-2");</code></li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — URLSearchParams Demo</span>
        </div>
        <pre><code>"use strict";

const sampleUrl = new URL("https://www.ourcompiler.com/blog-javascript/index.html?lang=nodejs&theme=dark&page=3");

console.log("Host:", sampleUrl.hostname); // "www.ourcompiler.com"
console.log("Path:", sampleUrl.pathname); // "/blog-javascript/index.html"

// Access query params easily
const params = sampleUrl.searchParams;
console.log("Language Param:", params.get("lang"));   // "nodejs"
console.log("Page Param:", params.get("page"));       // "3"
console.log("Has Theme?", params.has("theme"));       // true</code></pre>
      </div>
    </div>

    <!-- 5. Clipboard, Geolocation & Notifications -->
    <div class="section-title"><span class="num">5</span>Modern Web APIs: Clipboard, Geolocation & Notifications</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Clipboard API:</strong> Asynchronously write/read clipboard data: <code>await navigator.clipboard.writeText("Code snippet");</code></li>
        <li><strong>Geolocation API:</strong> Access device GPS coordinates: <code>navigator.geolocation.getCurrentPosition(pos => console.log(pos.coords.latitude));</code></li>
        <li><strong>Notifications API & Permissions:</strong> Request permission and dispatch native operating system desktop alerts: <code>Notification.requestPermission()</code>.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Async Clipboard & Notification APIs</span>
        </div>
        <pre><code>// 1. One-click Copy Function
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log("✅ Copied to clipboard successfully!");
    } catch (err) {
        console.error("Failed to copy:", err);
    }
}

// 2. Desktop Notification
function triggerNotification() {
    if (Notification.permission === "granted") {
        new Notification("Code Executed!", {
            body: "Your JavaScript code executed successfully on Our Compiler.",
            icon: "/logo.png"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}</code></pre>
      </div>
    </div>

    <!-- 4 REAL-WORLD PRACTICE PROJECTS -->
    <div class="section-title"><span class="num">6</span>4 Real-World Practice Projects</div>
    <div class="section-body">
      <p>Mastering browser APIs and storage through 4 real-world production components:</p>

      <!-- Project 1: User Theme Store -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 1: Persistent Theme Store with localStorage</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Theme Store</span>
          </div>
          <pre><code>const ThemeManager = {
    KEY: "app_theme_preference",

    saveTheme(themeName) {
        localStorage.setItem(this.KEY, themeName);
        document.body.className = themeName + "-theme";
    },

    loadTheme() {
        const saved = localStorage.getItem(this.KEY) || "dark";
        document.body.className = saved + "-theme";
        return saved;
    }
};

ThemeManager.loadTheme();</code></pre>
        </div>
      </div>

      <!-- Project 2: Stopwatch Component -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 2: Interactive Stopwatch with setInterval</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Stopwatch Engine</span>
          </div>
          <pre><code>class Stopwatch {
    constructor() {
        this.seconds = 0;
        this.intervalId = null;
    }

    start() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => {
            this.seconds++;
            console.log("Elapsed Time:", this.seconds, "seconds");
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        console.log("Stopwatch Paused at:", this.seconds, "seconds");
    }

    reset() {
        this.stop();
        this.seconds = 0;
        console.log("Stopwatch Reset to 0.");
    }
}

const timer = new Stopwatch();
timer.start();</code></pre>
        </div>
      </div>

      <!-- Project 3: Clipboard One-Click Copier -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 3: One-Click Code Snippet Copier</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Clipboard Copier</span>
          </div>
          <pre><code>function setupCopyButton(buttonSelector, codeSelector) {
    const btn = document.querySelector(buttonSelector);
    const codeBlock = document.querySelector(codeSelector);

    btn?.addEventListener("click", async () => {
        const text = codeBlock.textContent;
        await navigator.clipboard.writeText(text);
        btn.textContent = "✅ Copied!";
        setTimeout(() => { btn.textContent = "📋 Copy Code"; }, 2000);
    });
}</code></pre>
        </div>
      </div>

      <!-- Project 4: Geolocation Coordinates Finder -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 4: Geolocation GPS Coordinates Finder</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Geolocation API</span>
          </div>
          <pre><code>function findUserLocation() {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by your browser!");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
            console.log("Accuracy within:", accuracy, "meters");
        },
        (error) => {
            console.warn("Location Access Denied or Unavailable:", error.message);
        },
        { enableHighAccuracy: true, timeout: 5000 }
    );
}</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Test localStorage item storage and retrieval in our browser live compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Storage</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// Store item in browser storage
localStorage.setItem("username", "Ravi");

// Retrieve item
const username = localStorage.getItem("username");
console.log("Retrieved Username:", username);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 16, subtopics, contentBody, 'events-and-forms.html', '15. Events & Forms', 'promises.html', 'Phase 14: Promises & Async/Await');
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
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 14 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, browser APIs, localStorage, sessionStorage, timers, setTimeout, setInterval, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, DOM manipulation, Events, Forms, Browser APIs, localStorage, Timers, Async/Await, Promises, Closures, Node.js, and technical interview preparation with live runnable code examples.",
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
      <span class="badge">🟢 21 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (14 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions, loops, strings, arrays, array methods, objects, functions, DOM manipulation, events & forms, browser storage, or async APIs:</p>
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
        <a href="/blog-javascript/dom.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 11: DOM Manipulation →</a>
        <a href="/blog-javascript/events-and-forms.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 12: Events & Forms →</a>
        <a href="/blog-javascript/browser-apis-and-storage.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 13: Storage & APIs →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 14: Async JS →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 13 (Browser APIs & Storage)...');
  buildLesson16();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 13: Browser APIs & Storage successfully created!');
}

run();
