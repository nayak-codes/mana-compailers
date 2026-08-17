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
      { num: 13, file: 'functions.html', title: '13. Functions, Closures & this (Masterclass)', subtopics: 'Declaration vs Expression · Arrow Functions · Default & Rest · Callbacks & HOF · Scopes & Closures · Recursion · Pure Functions · call, apply, bind' }
    ]
  },
  {
    id: 'phase11',
    tag: 'Phase 11',
    title: 'Advanced ES6+ & OOP',
    icon: '🏗️',
    desc: 'Advanced Destructuring, ES6 Classes, Prototypes, Inheritance, Getters/Setters, Static methods, and OOP principles.',
    lessons: [
      { num: 14, file: 'es6-features.html', title: '14. ES6+ Advanced Features', subtopics: 'Advanced Destructuring · Symbols · Maps & Sets' },
      { num: 15, file: 'closures.html', title: '15. Advanced Scope Chain & Currying', subtopics: 'Lexical Scope · Closures · Currying · Factory Functions' },
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
      <span class="badge">📂 Phase 10: Functions Mastery</span>
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
        <span class="title">Phase 11: Advanced ES6+</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 13: Functions Mastery (Phase 10 Masterclass) ──────────────
function buildLesson13() {
  const title = "Functions Mastery: Declarations, Arrow Syntax, Closures, Recursion & call/apply/bind";
  const desc = "Comprehensive JavaScript Functions Masterclass: Function declarations vs expressions, Arrow functions, Parameters vs arguments, Return values, Default & Rest params, Callbacks, Higher-Order Functions, Scopes, Closures, Recursion, Pure functions, Hoisting, this binding, and call/apply/bind.";
  const filename = "functions.html";
  const subtopics = "Function Declaration vs Expression · Arrow Syntax · Parameters & Returns · Default & Rest · Callbacks & HOF · Scopes & Closures · Recursion · Pure Functions · Hoisting · this Context · call, apply, bind · 4 Projects";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 10: Functions Mastery</strong>! In JavaScript, <strong>Functions</strong> are <em>First-Class Citizens</em>. This means functions can be assigned to variables, passed as arguments to other functions, and returned from functions just like any other data value. In this exhaustive masterclass guide, you will master the 3 ways to define functions (Declarations, Expressions, Arrow Syntax), Parameters vs Arguments, Default & Rest parameters, Higher-Order Functions, Lexical Scopes, the superpower of <strong>Closures</strong>, Recursion, Pure Functions, Function Hoisting mechanics, and explicit context binding with <strong><code>call()</code>, <code>apply()</code>, and <code>bind()</code></strong>.</p>
    </div>

    <!-- 1. Function Declarations, Expressions & Arrow Functions -->
    <div class="section-title"><span class="num">1</span>The 3 Ways to Define Functions</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Type</th><th>Syntax</th><th>Hoisting Behavior</th><th><code>this</code> Context</th></tr>
        <tr>
          <td><strong>1. Function Declaration</strong></td>
          <td><code>function calculateTotal(price, tax = 0.18) { ... }</code></td>
          <td><strong>Fully Hoisted</strong> to the top of scope! Can be called before definition.</td>
          <td>Dynamic (bound at call-time)</td>
        </tr>
        <tr>
          <td><strong>2. Function Expression</strong></td>
          <td><code>const calculateTotal = function(price, tax = 0.18) { ... };</code></td>
          <td><strong>Not hoisted</strong> before assignment (Temporal Dead Zone).</td>
          <td>Dynamic (bound at call-time)</td>
        </tr>
        <tr>
          <td><strong>3. Arrow Function (ES6)</strong></td>
          <td><code>const calculateTotal = (price, tax = 0.18) => price + price * tax;</code></td>
          <td><strong>Not hoisted</strong> before assignment.</td>
          <td><strong>Lexical <code>this</code></strong> (inherits from outer scope ⭐)</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Default Parameters Example</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

function calculateTotal(price, tax = 0.18) {
    return price + price * tax;
}

console.log("Price with Default Tax (18%):", calculateTotal(100)); // 118
console.log("Price with Custom Tax (5%):", calculateTotal(100, 0.05)); // 105</code></pre>
      </div>
    </div>

    <!-- 2. Parameters, Arguments, Default & Rest Parameters -->
    <div class="section-title"><span class="num">2</span>Parameters, Arguments, Default Values & Rest Parameters</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Parameters vs Arguments:</strong> Function definition lo declare chesina variables ni <em>Parameters</em> antaru. Function call chesinappudu pass chesina real values ni <em>Arguments</em> antaru.</li>
        <li><strong>Default Parameters (ES6):</strong> Argument pass cheyyakapothe or <code>undefined</code> isthe fallback value evaluate avthundhi: <code>function greet(name = "Guest")</code>.</li>
        <li><strong>Rest Parameters (<code>...args</code>):</strong> Any number of arguments ni single genuine Array ga collect chesthundhi (replaces legacy <code>arguments</code> keyword).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Rest Parameters Sum Function</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Rest parameter gathers indefinite arguments into an array
function sumAll(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

console.log("Sum 3 items:", sumAll(10, 20, 30));         // 60
console.log("Sum 6 items:", sumAll(1, 2, 3, 4, 5, 6));    // 21</code></pre>
      </div>
    </div>

    <!-- 3. Callback Functions & Higher-Order Functions -->
    <div class="section-title"><span class="num">3</span>Callbacks & Higher-Order Functions (HOF)</div>
    <div class="section-body">
      <p>Oka function ni maroka function ki argument ga pass chesthe dhaanni <strong>Callback Function</strong> antaru. Functions ni parameters ga teesukune or functions ni return chese function ni <strong>Higher-Order Function</strong> antaru:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Higher-Order Function & Callback</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Higher-Order Function that accepts a callback
function executeOperation(a, b, operationCallback) {
    return operationCallback(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log("Addition Callback:", executeOperation(5, 4, add));        // 9
console.log("Multiply Callback:", executeOperation(5, 4, multiply));  // 20</code></pre>
      </div>
    </div>

    <!-- 4. Scopes & Closures (The Golden JavaScript Superpower) -->
    <div class="section-title"><span class="num">4</span>Scopes & Closures (The Golden Concept) ⭐</div>
    <div class="section-body">
      <div class="callout">
        <div class="callout-title">💡 What is a Closure?</div>
        <p>A <strong>Closure</strong> is a function that <strong>remembers and retains access to its outer lexical scope variables</strong> even AFTER the outer parent function has finished executing and returned from the Call Stack!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Closure Counter & State Encapsulation</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

function createCounter(initialValue = 0) {
    let count = initialValue; // Private variable encapsulated in closure

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter1 = createCounter(10);
console.log("Increment:", counter1.increment()); // 11
console.log("Increment:", counter1.increment()); // 12
console.log("Decrement:", counter1.decrement()); // 11
console.log("Current Value:", counter1.getCount()); // 11
// 'count' variable direct ga access cheyyaleru (Private & Secure!)</code></pre>
      </div>
    </div>

    <!-- 5. Recursion & Pure Functions -->
    <div class="section-title"><span class="num">5</span>Recursion & Pure Functions</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Recursion:</strong> A function calling itself until a <strong>Base Condition</strong> is met. Base condition lekunte Call Stack overflow avthundhi!</li>
        <li><strong>Pure Function:</strong> Given identical arguments, always returns the <strong>exact same result</strong> with <strong>zero side-effects</strong> (does not modify global variables, mutate external arrays, or trigger DOM/network mutations).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Recursive Factorial & Pure Function</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

// Recursive Factorial Function
function factorial(n) {
    if (n <= 1) return 1; // Base condition!
    return n * factorial(n - 1); // Recursive step
}

console.log("5! =", factorial(5)); // 120
console.log("6! =", factorial(6)); // 720</code></pre>
      </div>
    </div>

    <!-- 6. Explicit Binding: call(), apply(), bind() -->
    <div class="section-title"><span class="num">6</span>Explicit Context Binding: call(), apply() & bind() (Crucial Interview Topic)</div>
    <div class="section-body">
      <p>JavaScript allows you to manually force what <code>this</code> points to using <code>call</code>, <code>apply</code>, and <code>bind</code>:</p>

      <table class="tbl">
        <tr><th>Method</th><th>Execution Time</th><th>Arguments Format</th><th>Use Case</th></tr>
        <tr>
          <td><strong><code>call(thisArg, arg1, arg2...)</code></strong></td>
          <td><strong>Immediately executes</strong></td>
          <td>Comma-separated arguments</td>
          <td>Borrowing methods with individual parameters.</td>
        </tr>
        <tr>
          <td><strong><code>apply(thisArg, [argsArray])</code></strong></td>
          <td><strong>Immediately executes</strong></td>
          <td>Single array of arguments</td>
          <td>Borrowing methods with an array of values.</td>
        </tr>
        <tr>
          <td><strong><code>bind(thisArg, arg1, arg2...)</code></strong></td>
          <td><strong>Does NOT execute immediately</strong></td>
          <td>Returns a <strong>new permanently bound function</strong></td>
          <td>Event listeners, timer callbacks, preserving <code>this</code>.</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — call, apply & bind Demo</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const person1 = { name: "Ravi", role: "Frontend Dev" };
const person2 = { name: "Sneha", role: "Backend Architect" };

function introduce(greeting, location) {
    return \`\${greeting}! I am \${this.name}, working as \${this.role} in \${location}.\`;
}

// 1. call() - Comma separated arguments
console.log(introduce.call(person1, "Hello", "Hyderabad"));

// 2. apply() - Array of arguments
console.log(introduce.apply(person2, ["Namaste", "Bengaluru"]));

// 3. bind() - Returns new function bound to person1
const boundRavi = introduce.bind(person1, "Hi");
console.log(boundRavi("Remote Hub"));</code></pre>
      </div>
    </div>

    <!-- 4 REAL-WORLD PRACTICE PROJECTS -->
    <div class="section-title"><span class="num">7</span>4 Real-World Practice Projects</div>
    <div class="section-body">
      <p>Mastering functions through 4 production-grade engineering patterns:</p>

      <!-- Project 1: Bank Vault Closure -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 1: Secure Bank Account Vault (Closures)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Bank Vault Closure</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function createBankAccount(initialDeposit, pin) {
    let balance = initialDeposit; // Protected private state

    return {
        checkBalance(enteredPin) {
            if (enteredPin !== pin) return "❌ Invalid PIN!";
            return "✅ Balance: Rs." + balance;
        },
        deposit(amount) {
            if (amount <= 0) return "Invalid amount!";
            balance += amount;
            return "✅ Deposited Rs." + amount + " | New Balance: Rs." + balance;
        }
    };
}

const myAccount = createBankAccount(10000, 1234);
console.log(myAccount.checkBalance(9999)); // Invalid PIN
console.log(myAccount.checkBalance(1234)); // Rs. 10000
console.log(myAccount.deposit(2500));     // Rs. 12500</code></pre>
        </div>
      </div>

      <!-- Project 2: Currying Function -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 2: Function Currying (Discount Engine)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Currying</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

// Curried discount function
const applyDiscount = discountRate => price => price - (price * discountRate);

const tenPercentDiscount = applyDiscount(0.10);
const festiveThirtyPercent = applyDiscount(0.30);

console.log("Laptop 10% Off:", tenPercentDiscount(50000));   // 45000
console.log("Laptop 30% Off:", festiveThirtyPercent(50000)); // 35000</code></pre>
        </div>
      </div>

      <!-- Project 3: Recursive Deep Flattening -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 3: Recursive Deep Array Flattening</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Recursive Flatten</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function deepFlatten(arr) {
    let result = [];
    for (const item of arr) {
        if (Array.isArray(item)) {
            result = result.concat(deepFlatten(item)); // Recursive step
        } else {
            result.push(item);
        }
    }
    return result;
}

const multiLevel = [1, [2, [3, [4, 5]], 6], 7];
console.log("Deep Flattened:", deepFlatten(multiLevel)); // [1, 2, 3, 4, 5, 6, 7]</code></pre>
        </div>
      </div>

      <!-- Project 4: Method Borrowing with call -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 4: Reusable Logger with call() Binding</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Method Borrowing</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

const apiResponse = {
    status: 200,
    endpoint: "/api/v1/users",
    timestamp: "2026-08-17"
};

function formatLog(level) {
    return \`[\${level.toUpperCase()}] \${this.endpoint} returned \${this.status} at \${this.timestamp}\`;
}

console.log(formatLog.call(apiResponse, "info"));
// [INFO] /api/v1/users returned 200 at 2026-08-17</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this total tax calculation function in our live compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Functions</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

function calculateTotal(price, tax = 0.18) {
    return price + price * tax;
}

console.log("Total (with 18% default tax):", calculateTotal(100));
console.log("Total (with 5% custom tax):", calculateTotal(200, 0.05));</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 13, subtopics, contentBody, 'objects.html', '12. Objects & Key-Value Mastery', 'es6-features.html', 'Phase 11: Advanced ES6+');
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
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, functions, arrow functions, closures, call apply bind, recursion, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, Functions, Arrow Syntax, Closures, Recursion, call/apply/bind, Async/Await, Promises, Closures, DOM manipulation, Node.js, and technical interview preparation with live runnable code examples.",
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
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions, loops, strings, arrays deep dive, higher-order array methods, objects, functions, closures, or async:</p>
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
        <a href="/blog-javascript/functions.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: Functions →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 10 (Functions Mastery)...');
  buildLesson13();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 10: Functions Mastery successfully created!');
}

run();
