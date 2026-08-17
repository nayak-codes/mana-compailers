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
    title: 'JSON & Fetch API',
    icon: '🌐',
    desc: 'What is JSON?, Objects & Arrays, JSON.stringify & parse, HTTP basics (GET, POST, PUT, DELETE), Headers, Body, response.ok, Status codes, Error handling, Loading states, Query params, Authentication, and 5 full projects.',
    lessons: [
      { num: 17, file: 'json-and-fetch-api.html', title: '17. JSON, Fetch API & REST Integration', subtopics: 'JSON.stringify & parse · HTTP GET/POST/PUT/DELETE · Headers & Body · response.ok & Status · Loading States · Auth & Tokens · 5 Projects' }
    ]
  },
  {
    id: 'phase15',
    tag: 'Phase 15',
    title: 'Asynchronous JavaScript & Promises',
    icon: '⏳',
    desc: 'Sync vs Async, Call Stack, Web APIs, Event Loop & Microtasks priority, Callbacks & Callback Hell, Promises & 3 states, .then/.catch/.finally, Promise Chaining, Promise combinators (all, allSettled, race, any), async/await, and Sequential vs Parallel execution.',
    lessons: [
      { num: 18, file: 'promises.html', title: '18. Asynchronous JavaScript, Promises & async/await', subtopics: 'Sync vs Async · Event Loop & Microtasks · Callbacks & Hell · Promise States · all/allSettled/race/any · async/await · Sequential vs Parallel' }
    ]
  },
  {
    id: 'phase16',
    tag: 'Phase 16',
    title: 'Object-Oriented JavaScript (OOP)',
    icon: '🏗️',
    desc: 'OOP in JavaScript, Constructor functions, Prototypes & Prototype Chain, ES6 Classes, constructor(), instance vs static methods, getters & setters, Inheritance (extends, super), Polymorphism, #private fields, Composition vs Inheritance, Factory functions, and this binding.',
    lessons: [
      { num: 19, file: 'oop.html', title: '19. Object-Oriented JavaScript (Classes & Prototypes)', subtopics: 'Prototypes & Chain · ES6 Classes · constructor & Methods · static & Getters/Setters · extends & super · Polymorphism · #private Fields · 4 Projects' }
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
      const kwList = ['const','let','var','function','return','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','new','this','class','extends','super','import','export','async','await','yield','of','in','typeof','instanceof','delete','void','static','get','set'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 4. Built-in Classes & Objects
      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false','alert','prompt','confirm','parseInt','parseFloat','isNaN','localStorage','sessionStorage','Notification','navigator','history','URL','fetch','Response','Request','Headers'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('vr', m));

      // 5. Functions & Methods
      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => {
        if (['if','for','while','switch','catch','constructor'].includes(fnName)) return m;
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
      <span class="badge">📂 Phase 16: Object-Oriented JavaScript</span>
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
        <span class="label">Course Completed 🎉</span>
        <span class="title">JavaScript Master Index</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 19: Object-Oriented JavaScript (Phase 16 Masterclass) ──────
function buildLesson19() {
  const title = "Object-Oriented JavaScript: Prototypes, ES6 Classes, Inheritance & #Private Fields";
  const desc = "Master Object-Oriented JavaScript (OOP): Prototypal inheritance under the hood, constructor functions, Prototype Chain, ES6 Classes, constructor(), instance vs static methods, getters/setters, inheritance with extends & super, polymorphism, #private fields, composition, and this binding.";
  const filename = "oop.html";
  const subtopics = "Prototypes & Chain · ES6 Classes · constructor & Methods · static & Getters/Setters · extends & super · Polymorphism · #private Fields · Composition · 4 Projects";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 16: Object-Oriented JavaScript (OOP)</strong>! JavaScript uses a unique and powerful <strong>Prototypal Inheritance model</strong>. With the introduction of <strong>ES6 Classes</strong>, JavaScript provides a clean, syntactic standard for implementing the 4 core pillars of OOP: <strong>Encapsulation</strong>, <strong>Abstraction</strong>, <strong>Inheritance</strong>, and <strong>Polymorphism</strong>. In this comprehensive masterclass guide, you will master constructor functions, the prototype chain, ES6 class syntax, instance vs static methods, getters and setters, inheritance with <code>extends</code> and <code>super</code>, method overriding, private fields (<code>#privateField</code>), composition patterns, and construct 4 enterprise object-oriented applications.</p>
    </div>

    <!-- 1. Prototypal Inheritance Under the Hood -->
    <div class="section-title"><span class="num">1</span>Prototypes & The Prototype Chain Under the Hood</div>
    <div class="section-body">
      <p>JavaScript lo prati Object ki hidden link <code>[[Prototype]]</code> untundhi. Methods ni prototype meedha define chesthe, 1000 instances create chesina memory lo <strong>single method definition</strong> mathrame share avthundhi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Prototype Inheritance Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// 1. Constructor Function
function User(name, role) {
    this.name = name;
    this.role = role;
}

// 2. Attach shared method to Prototype
User.prototype.getRole = function() {
    return this.name + " is a " + this.role;
};

const user1 = new User("Ravi", "Admin");
console.log(user1.getRole()); // "Ravi is a Admin"
console.log(Object.getPrototypeOf(user1) === User.prototype); // true</code></pre>
      </div>
    </div>

    <!-- 2. ES6 Classes & Constructors -->
    <div class="section-title"><span class="num">2</span>ES6 Classes, Constructors & Instance Methods</div>
    <div class="section-body">
      <p>ES6 <code>class</code> syntax prototypal inheritance paina clean modern wrapper ga pani chesthundhi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — User Curriculum Example</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // Instance Method
    displayDetails() {
        console.log(this.name + " is " + this.age + " years old");
    }
}

const student = new Student("Ravi", 20);
student.displayDetails(); // "Ravi is 20 years old"</code></pre>
      </div>
    </div>

    <!-- 3. Static Methods & Getters/Setters -->
    <div class="section-title"><span class="num">3</span>Static Methods, Getters & Setters</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong><code>static</code> Methods:</strong> Instance meedha kaakunda Class constructor meedha mathrame call avthayi (Utility helper methods e.g. <code>Student.compare()</code>).</li>
        <li><strong>Getters (<code>get</code>) & Setters (<code>set</code>):</strong> Computed properties ni access cheyyadaniki mariyu data assignment appudu automatic validation run cheyyadaniki use avthayi.</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Static & Getters/Setters</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

class Temperature {
    constructor(celsius) {
        this._celsius = celsius;
    }

    // Getter
    get fahrenheit() {
        return (this._celsius * 9) / 5 + 32;
    }

    // Setter with validation
    set celsius(val) {
        if (val < -273.15) throw new Error("Temperature below absolute zero!");
        this._celsius = val;
    }

    // Static Utility Method
    static convertToKelvin(c) {
        return c + 273.15;
    }
}

const temp = new Temperature(25);
console.log("25°C in Fahrenheit:", temp.fahrenheit); // 77
console.log("25°C in Kelvin:", Temperature.convertToKelvin(25)); // 298.15</code></pre>
      </div>
    </div>

    <!-- 4. Inheritance with extends, super & Polymorphism -->
    <div class="section-title"><span class="num">4</span>Inheritance (extends & super) & Polymorphism</div>
    <div class="section-body">
      <p>Child classes parent properties ni inherit chesukovadaniki <strong><code>extends</code></strong> mariyu <strong><code>super()</code></strong> vadathamu. Child class parent method ni override chesi specialized behavior chupinchadanni <strong>Polymorphism</strong> antaru:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Inheritance & Polymorphism</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Parent Class
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }

    calculateBonus() {
        return this.salary * 0.10; // Standard 10% bonus
    }
}

// Child Class extending Employee
class Manager extends Employee {
    constructor(name, salary, teamSize) {
        super(name, salary); // Call parent constructor
        this.teamSize = teamSize;
    }

    // Polymorphism: Overriding parent method with specialized logic!
    calculateBonus() {
        return super.calculateBonus() + (this.teamSize * 500);
    }
}

const dev = new Employee("Ravi", 60000);
const mgr = new Manager("Sneha", 100000, 8);

console.log(dev.name + " Bonus: Rs." + dev.calculateBonus()); // Rs. 6000
console.log(mgr.name + " Bonus: Rs." + mgr.calculateBonus()); // Rs. 14000 (10k + 4k team bonus)</code></pre>
      </div>
    </div>

    <!-- 5. Private Fields (#privateField) -->
    <div class="section-title"><span class="num">5</span>Encapsulation with #Private Fields & Methods (ES2022 ⭐)</div>
    <div class="section-body">
      <div class="callout">
        <div class="callout-title">🔒 True Language-Level Private State</div>
        <p>JavaScript lo property name mundhu hash <strong><code>#</code></strong> pedithe adhi strictly <strong>Private</strong> avthundhi. Class bahata nunchi access cheyyadaniki try chesthe <code>SyntaxError</code> throw avthundhi!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — #Private Bank Account</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

class BankAccount {
    #balance = 0; // True Private Field!
    #pin;

    constructor(owner, initialDeposit, pin) {
        this.owner = owner;
        this.#balance = initialDeposit;
        this.#pin = pin;
    }

    deposit(amount) {
        if (amount <= 0) throw new Error("Invalid deposit amount!");
        this.#balance += amount;
        return "Deposited Rs." + amount;
    }

    getBalance(enteredPin) {
        if (enteredPin !== this.#pin) throw new Error("❌ Unauthorized: Invalid PIN!");
        return "Rs." + this.#balance;
    }
}

const myAcc = new BankAccount("Ravi", 10000, 1234);
myAcc.deposit(5000);
console.log("Balance:", myAcc.getBalance(1234)); // Rs.15000
// console.log(myAcc.#balance); // ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class!</code></pre>
      </div>
    </div>

    <!-- 4 REAL-WORLD PRACTICE PROJECTS -->
    <div class="section-title"><span class="num">6</span>4 Real-World OOP Practice Projects</div>
    <div class="section-body">
      <p>Mastering Object-Oriented design patterns through 4 production-grade systems:</p>

      <!-- Project 1: Banking Vault -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 1: Secure Bank Account Engine with Encapsulation</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Banking System</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

class SecureVault {
    #funds = 0;
    #auditLogs = [];

    constructor(initialFunds) {
        this.#funds = initialFunds;
        this.#log("Account opened with Rs." + initialFunds);
    }

    #log(action) {
        this.#auditLogs.push({ action, timestamp: new Date().toISOString() });
    }

    withdraw(amount) {
        if (amount > this.#funds) return "❌ Insufficient funds!";
        this.#funds -= amount;
        this.#log("Withdrew Rs." + amount);
        return "✅ Withdrew Rs." + amount + " | Remaining: Rs." + this.#funds;
    }

    getAuditHistory() {
        return [...this.#auditLogs]; // Return clone to prevent mutation
    }
}

const vault = new SecureVault(50000);
console.log(vault.withdraw(15000));
console.log("Audit Logs Count:", vault.getAuditHistory().length);</code></pre>
        </div>
      </div>

      <!-- Project 2: E-Commerce Hierarchy -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 2: E-Commerce Product Hierarchy (Inheritance & Polymorphism)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Product Hierarchy</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

class Product {
    constructor(id, title, basePrice) {
        this.id = id;
        this.title = title;
        this.basePrice = basePrice;
    }

    getFinalPrice() {
        return this.basePrice; // Standard product has no discount
    }
}

class DigitalProduct extends Product {
    constructor(id, title, basePrice, downloadLink) {
        super(id, title, basePrice);
        this.downloadLink = downloadLink;
    }

    getFinalPrice() {
        return this.basePrice * 0.90; // 10% off for instant digital downloads!
    }
}

const book = new Product(1, "Clean Code Physical Book", 1000);
const ebook = new DigitalProduct(2, "Clean Code PDF", 1000, "https://download.io/pdf");

console.log(book.title + ": Rs." + book.getFinalPrice());   // Rs.1000
console.log(ebook.title + ": Rs." + ebook.getFinalPrice()); // Rs.900</code></pre>
        </div>
      </div>

      <!-- Project 3: Vehicle Simulator -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 3: Vehicle Fleet Simulator (Polymorphic Engine)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Fleet Engine</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

class Vehicle {
    constructor(brand) { this.brand = brand; }
    startEngine() { return this.brand + " engine started (Standard Gas)."; }
}

class ElectricVehicle extends Vehicle {
    startEngine() { return this.brand + " silently powered ON (Dual Motors Electric)."; }
}

const fleet = [new Vehicle("Toyota Corolla"), new ElectricVehicle("Tesla Model 3")];
fleet.forEach(v => console.log(v.startEngine()));</code></pre>
        </div>
      </div>

      <!-- Project 4: Composition over Inheritance -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 4: User Permission Engine (Composition over Inheritance)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Composition Pattern</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

// Modular feature behaviors
const canRead = state => ({
    read: () => console.log(state.name + " is reading article.")
});

const canWrite = state => ({
    write: () => console.log(state.name + " published a new article.")
});

// Factory function composing features
function createAdminUser(name) {
    const user = { name };
    return Object.assign(user, canRead(user), canWrite(user));
}

const admin = createAdminUser("Ravi");
admin.read();
admin.write();</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this ES6 Student class instance in our live Node.js / JavaScript compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Classes</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    displayDetails() {
        console.log(this.name + " is " + this.age + " years old");
    }
}

const student = new Student("Ravi", 20);
student.displayDetails();</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 19, subtopics, contentBody, 'promises.html', '18. Promises & Async/Await', null, null);
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
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 16 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, OOP in javascript, prototypes, ES6 classes, inheritance extends super, private fields, async await, nodejs, dom, javascript interview questions" />
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
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, DOM manipulation, Events, Forms, Browser APIs, JSON, Fetch API, Promises, async/await, Event Loop, Object-Oriented JS, Classes, Prototypes, Node.js, and technical interview preparation with live runnable code examples.",
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
      <span class="badge">📂 Collapsible Interactive Roadmap (16 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions, loops, strings, arrays, array methods, objects, functions, DOM manipulation, events & forms, browser storage, JSON & Fetch API, Promises & async/await, or Object-Oriented JS:</p>
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
        <a href="/blog-javascript/browser-apis-and-storage.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 13: Storage & APIs →</a>
        <a href="/blog-javascript/json-and-fetch-api.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 14: JSON & Fetch API →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 15: Promises & Async →</a>
        <a href="/blog-javascript/oop.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 16: OOP & Classes →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 16 (Object-Oriented JavaScript)...');
  buildLesson19();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 16: Object-Oriented JavaScript successfully created!');
}

run();
