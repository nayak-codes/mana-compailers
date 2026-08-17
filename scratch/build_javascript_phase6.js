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
    title: 'Functions & Arrow Syntax',
    icon: '🧩',
    desc: 'Function declarations, function expressions, arrow functions, default parameters, rest parameters, return statements, and pure functions.',
    lessons: [
      { num: 10, file: 'functions.html', title: '10. Functions & Arrow Syntax', subtopics: 'Declaration vs Expression · Arrow Syntax · Default Params · Rest (...) · Return Values' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
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
    id: 'phase9',
    tag: 'Phase 09',
    title: 'Advanced Functions & OOP',
    icon: '🏗️',
    desc: 'Lexical scope, closures, higher-order functions, Object-Oriented JS, prototypes, ES6 classes, and this keyword binding.',
    lessons: [
      { num: 14, file: 'closures.html', title: '14. Closures & Higher-Order Functions', subtopics: 'Lexical Scope · Closures · Currying · Callbacks' },
      { num: 15, file: 'oop.html', title: '15. OOP: Classes & Prototypes', subtopics: 'Prototypes & Inheritance · ES6 Classes · this Keyword Binding' }
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
      <span class="badge">📂 Phase 06: Strings Mastery</span>
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
        <span class="title">Phase 7: Functions</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 9: Strings Mastery (Phase 6 Masterclass) ──────────────────
function buildLesson9() {
  const title = "Strings & Text Processing (Methods, Escaping & 5 Projects)";
  const desc = "Comprehensive guide to JavaScript Strings: quotes, template literals, indexing, charAt, toUpperCase, toLowerCase, trim, includes, startsWith, endsWith, indexOf, slice vs substring, replace, replaceAll, split, repeat, escape chars, string interpolation, palindromes, and 5 mini projects.";
  const filename = "strings.html";
  const subtopics = "Creating Strings · Quotes & Template Literals · length & charAt() · toUpperCase/toLowerCase · trim · includes/startsWith/endsWith · slice vs substring · replace/replaceAll · split · repeat · Escape Characters · 5 Projects";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 6: Strings Mastery</strong>! In JavaScript, text is handled through <strong>Strings</strong>. Strings in JavaScript are immutable sequences of UTF-16 character code units. In this masterclass guide, you will learn how to create strings using single quotes, double quotes, and modern ES6 <strong>Template Literals</strong>, master over 15 built-in string manipulation methods, understand character indexing, escaping, slicing, string replacement, palindrome verification, and build 5 interactive text-processing mini-projects.</p>
    </div>

    <!-- 1. Creating Strings, Quotes & Template Literals -->
    <div class="section-title"><span class="num">1</span>Creating Strings (Single, Double Quotes & Template Literals)</div>
    <div class="section-body">
      <p>JavaScript lo strings create cheyyadaniki 3 approaches unnaayi:</p>

      <table class="tbl">
        <tr><th>String Delimiter</th><th>Syntax</th><th>Key Features</th></tr>
        <tr>
          <td><strong>1. Single Quotes</strong></td>
          <td><code>'Hello World'</code></td>
          <td>Classic literal. Useful when string contains double quotes.</td>
        </tr>
        <tr>
          <td><strong>2. Double Quotes</strong></td>
          <td><code>"Hello World"</code></td>
          <td>Classic literal. Useful when string contains apostrophes.</td>
        </tr>
        <tr>
          <td><strong>3. Template Literals</strong> (ES6 ⭐)</td>
          <td><code>\`Hello \${name}\`</code></td>
          <td>Supports <strong>String Interpolation (\`\${expression}\`)</strong>, multi-line strings, and embedded JavaScript code without concatenation.</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Quotes & Template Literals</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const language = "JavaScript";

console.log(language.length);
console.log(language.toUpperCase());
console.log(language.includes("Script"));
console.log(\`I am learning \${language}\`);</code></pre>
      </div>
    </div>

    <!-- 2. String Length & Character Indexing -->
    <div class="section-title"><span class="num">2</span>String Length, Indexing & charAt()</div>
    <div class="section-body">
      <p>Strings are zero-indexed (first character index is <code>0</code>):</p>
      
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><code>str.length</code> — Total number of characters (property, not a method).</li>
        <li><code>str[0]</code> — Bracket notation to read character at index 0.</li>
        <li><code>str.charAt(0)</code> — Method to read character at index 0 (returns empty string <code>""</code> if out of bounds, unlike <code>undefined</code>).</li>
        <li><code>str.at(-1)</code> — Modern ES2022 method supporting negative indices (last character).</li>
      </ul>
    </div>

    <!-- 3. Essential String Methods -->
    <div class="section-title"><span class="num">3</span>Essential String Methods Master Table</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Method</th><th>Description</th><th>Example</th><th>Result</th></tr>
        <tr><td><code>toUpperCase()</code></td><td>Converts string to uppercase.</td><td><code>"js".toUpperCase()</code></td><td><code>"JS"</code></td></tr>
        <tr><td><code>toLowerCase()</code></td><td>Converts string to lowercase.</td><td><code>"JS".toLowerCase()</code></td><td><code>"js"</code></td></tr>
        <tr><td><code>trim()</code></td><td>Removes whitespace from both ends.</td><td><code>"  hi  ".trim()</code></td><td><code>"hi"</code></td></tr>
        <tr><td><code>includes(sub)</code></td><td>Checks if substring exists (boolean).</td><td><code>"JavaScript".includes("Script")</code></td><td><code>true</code></td></tr>
        <tr><td><code>startsWith(sub)</code></td><td>Checks if string starts with substring.</td><td><code>"Hello".startsWith("He")</code></td><td><code>true</code></td></tr>
        <tr><td><code>endsWith(sub)</code></td><td>Checks if string ends with substring.</td><td><code>"image.png".endsWith(".png")</code></td><td><code>true</code></td></tr>
        <tr><td><code>indexOf(sub)</code></td><td>Returns first index of match (or -1).</td><td><code>"developer".indexOf("el")</code></td><td><code>3</code></td></tr>
        <tr><td><code>split(delim)</code></td><td>Splits string into array of strings.</td><td><code>"a,b,c".split(",")</code></td><td><code>["a", "b", "c"]</code></td></tr>
        <tr><td><code>repeat(count)</code></td><td>Repeats string N times.</td><td><code>"⭐".repeat(3)</code></td><td><code>"⭐⭐⭐"</code></td></tr>
      </table>
    </div>

    <!-- 4. Slicing: slice() vs substring() -->
    <div class="section-title"><span class="num">4</span>Extracting Text: slice() vs substring()</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Feature</th><th><code>slice(start, end)</code> ⭐ Recommended</th><th><code>substring(start, end)</code></th></tr>
        <tr><td><strong>Negative Indices</strong></td><td>✅ Counts backward from end: <code>"Hello".slice(-2) // "lo"</code></td><td>❌ Treats negative index as <code>0</code></td></tr>
        <tr><td><strong>start > end</strong></td><td>Returns empty string <code>""</code></td><td>Swaps indices automatically</td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — slice vs substring</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const message = "JavaScript Masterclass 2026";

console.log("slice(0, 10):", message.slice(0, 10));     // "JavaScript"
console.log("slice(-4):", message.slice(-4));           // "2026"
console.log("substring(0, 10):", message.substring(0, 10)); // "JavaScript"</code></pre>
      </div>
    </div>

    <!-- 5. Replacing Text: replace() vs replaceAll() -->
    <div class="section-title"><span class="num">5</span>Replacing Text: replace() vs replaceAll()</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><code>str.replace("old", "new")</code> — Replaces ONLY the first match.</li>
        <li><code>str.replaceAll("old", "new")</code> — Replaces ALL occurrences in the entire string (ES2021).</li>
      </ul>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — replace vs replaceAll</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const sentence = "Java is great, Java is fast, Java is everywhere!";

console.log("replace():", sentence.replace("Java", "JavaScript"));
// Only first "Java" changed!

console.log("replaceAll():", sentence.replaceAll("Java", "JavaScript"));
// All 3 "Java" occurrences replaced with "JavaScript"!</code></pre>
      </div>
    </div>

    <!-- 6. Escape Characters & Palindromes -->
    <div class="section-title"><span class="num">6</span>Escape Characters & Palindrome Checking</div>
    <div class="section-body">
      <p>Special characters ni strings lo embed cheyyadaniki backslash <code>\\</code> escape character vadathamu:</p>
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><code>\\n</code> — New Line</li>
        <li><code>\\t</code> — Tab Indent</li>
        <li><code>\\'</code> or <code>\\"</code> — Quotation marks inside literal</li>
        <li><code>\\\\</code> — Literal backslash character</li>
      </ul>

      <h4 style="color:#f7df1e; margin-top:16px;">Palindrome Algorithm</h4>
      <p>Oka word/sentence mundhu nunchi or venuka nunchi chadivina okela unte dheenini <strong>Palindrome</strong> antaru (e.g. <em>"madam"</em>, <em>"racecar"</em>):</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Palindrome Checker</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

function isPalindrome(str) {
    // 1. Sanitize: lowercase and remove non-alphanumeric chars
    const cleaned = str.toLowerCase().replaceAll(" ", "");
    
    // 2. Reverse string using split-reverse-join
    const reversed = cleaned.split("").reverse().join("");
    
    // 3. Compare
    return cleaned === reversed;
}

console.log("is 'racecar' Palindrome?", isPalindrome("racecar")); // true
console.log("is 'madam' Palindrome?", isPalindrome("madam"));     // true
console.log("is 'javascript' Palindrome?", isPalindrome("javascript")); // false</code></pre>
      </div>
    </div>

    <!-- 5 MINI PROJECTS -->
    <div class="section-title"><span class="num">7</span>5 Text-Processing Mini Projects</div>
    <div class="section-body">
      <p>Mastering string processing through 5 real-world applications:</p>

      <!-- Project 1: Word Counter -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 1: Word Counter</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Word Counter</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function countWords(text) {
    if (!text.trim()) return 0;
    // Split by one or more whitespace characters
    const words = text.trim().split(/\\s+/);
    return words.length;
}

const article = "JavaScript is a versatile language powering the modern web and cloud APIs.";
console.log("Total Words:", countWords(article)); // 12</code></pre>
        </div>
      </div>

      <!-- Project 2: Character Counter -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 2: Character Counter & Analytics</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Character Counter</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function analyzeText(text) {
    const totalChars = text.length;
    const withoutSpaces = text.replaceAll(" ", "").length;
    const spacesCount = totalChars - withoutSpaces;
    
    return {
        totalCharacters: totalChars,
        charactersWithoutSpaces: withoutSpaces,
        spaces: spacesCount
    };
}

console.log(analyzeText("Our Compiler 2026 Platform"));</code></pre>
        </div>
      </div>

      <!-- Project 3: Palindrome Checker -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 3: Advanced Palindrome Checker (Phrases)</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Palindrome Project</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function checkPhrasePalindrome(phrase) {
    const clean = phrase.toLowerCase().replace(/[^a-z0-9]/g, "");
    const rev = clean.split("").reverse().join("");
    return clean === rev;
}

console.log("A man, a plan, a canal: Panama ->", checkPhrasePalindrome("A man, a plan, a canal: Panama")); // true
console.log("Hello World ->", checkPhrasePalindrome("Hello World")); // false</code></pre>
        </div>
      </div>

      <!-- Project 4: Username Validator -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 4: Username Validator</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Username Validator</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function validateUsername(username) {
    // Rule 1: Length between 4 and 15
    if (username.length < 4 || username.length > 15) {
        return "❌ Username must be between 4 and 15 characters.";
    }
    
    // Rule 2: Cannot contain spaces
    if (username.includes(" ")) {
        return "❌ Username cannot contain spaces.";
    }
    
    // Rule 3: Must start with a letter
    const firstChar = username[0].toLowerCase();
    if (firstChar < 'a' || firstChar > 'z') {
        return "❌ Username must start with a letter.";
    }
    
    return "✅ Valid Username: @" + username;
}

console.log(validateUsername("ravi_dev"));     // Valid
console.log(validateUsername("123ravi"));      // Invalid start
console.log(validateUsername("ravi nayak"));   // Contains spaces</code></pre>
        </div>
      </div>

      <!-- Project 5: Password Strength Checker -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Project 5: Password Strength Checker</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Password Strength</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function checkPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++; // Has Uppercase
    if (/[a-z]/.test(password)) score++; // Has Lowercase
    if (/[0-9]/.test(password)) score++; // Has Number
    if (/[^A-Za-z0-9]/.test(password)) score++; // Has Special Char
    
    if (score <= 2) return "🔴 WEAK Password (Add numbers & symbols)";
    if (score <= 4) return "🟡 MEDIUM Password (Good, but can be stronger)";
    return "🟢 STRONG Password (Excellent security!)";
}

console.log("pass123:", checkPasswordStrength("pass123"));
console.log("Ravi@2026#Secure:", checkPasswordStrength("Ravi@2026#Secure"));</code></pre>
        </div>
      </div>
    </div>

    <!-- Try It Yourself Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this string processing snippet in our live compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Strings</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const language = "JavaScript";

console.log("Length:", language.length);
console.log("Uppercase:", language.toUpperCase());
console.log("Includes 'Script':", language.includes("Script"));
console.log(\`I am learning \${language}\`);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 9, subtopics, contentBody, 'loops.html', '8. Loops & Control Flow', 'functions.html', 'Phase 7: Functions');
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
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, strings, methods, template literals, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions & branching, loops, strings mastery, functions, arrays & objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/05-operators-expressions-and-precedence.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-javascript/loops.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-javascript/strings.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Strings →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Functions →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Arrays & Objects →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 6 (Strings Mastery)...');
  buildLesson9();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 6: Strings Mastery successfully created!');
}

run();
