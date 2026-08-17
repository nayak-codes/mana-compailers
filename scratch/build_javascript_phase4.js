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
    title: 'Loops & Iteration',
    icon: '🔁',
    desc: 'for loops, while loops, do-while, for...of (iterables), for...in (object keys), nested loops, break, and continue.',
    lessons: [
      { num: 8, file: 'loops.html', title: '8. Loops & Control Flow', subtopics: 'for, while, do-while · for...of & for...in · Nested Matrices · break & continue' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Strings & Functions',
    icon: '🧩',
    desc: 'String manipulation, template literals, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 9, file: 'strings.html', title: '9. Strings & Template Literals', subtopics: 'String Methods · Template Literals · Slicing & Regex Search' },
      { num: 10, file: 'functions.html', title: '10. Functions & Arrow Syntax', subtopics: 'Function Declaration vs Expression · Arrow Functions · Default Parameters' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
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
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Advanced Functions & OOP',
    icon: '🏗️',
    desc: 'Lexical scope, closures, higher-order functions, Object-Oriented JS, prototypes, ES6 classes, and this keyword binding.',
    lessons: [
      { num: 14, file: 'closures.html', title: '14. Closures & Higher-Order Functions', subtopics: 'Lexical Scope · Closures · Currying · Callbacks' },
      { num: 15, file: 'oop.html', title: '15. OOP: Classes & Prototypes', subtopics: 'Prototypes & Inheritance · ES6 Classes · this Keyword Binding' }
    ]
  },
  {
    id: 'phase9',
    tag: 'Phase 09',
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
      <span class="badge">📂 Phase 04: Conditions</span>
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
        <span class="title">Phase 5: Loops</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 7: Conditionals (if-else & switch) ───────────────────────
function buildLesson7() {
  const title = "Conditional Statements (if, else if, switch & Guard Clauses)";
  const desc = "Comprehensive guide to JavaScript Conditions: if, else, else if ladders, nested conditions, multiple logical conditions (&&, ||), ternary expressions, switch-case-break-default, guard clauses, truthy/falsy condition evaluation, and 6 practice programs.";
  const filename = "conditionals.html";
  const subtopics = "if · else · else if · Nested Conditions · Multiple Conditions · Logical Conditions · Ternary · switch · case · break · default · Guard Clauses · Truthy/Falsy · 6 Practice Programs";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 4: Conditions</strong>! Conditional statements allow your JavaScript applications to make intelligent decisions based on changing data. In this masterclass guide, you will master single <code>if</code> branches, <code>else if</code> decision ladders, nested conditions, multi-condition logic with <code>&&</code> and <code>||</code>, ternary expressions, clean <code>switch-case</code> statements, modern <strong>Guard Clauses</strong>, and solve 6 real-world practice programs.</p>
    </div>

    <!-- 1. if, else, else if Ladders -->
    <div class="section-title"><span class="num">1</span>if, else, and else if Decision Ladders</div>
    <div class="section-body">
      <p>JavaScript lo code execution branching cheyyadaniki <code>if</code>, <code>else if</code>, mariyu <code>else</code> blocks vadathamu:</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:14px;">
          <strong style="color:#58a6ff;">1. if Statement</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Given condition <code>true</code> aythe mathrame block lopali code execute avthundhi.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f7df1e; border-radius:8px; padding:14px;">
          <strong style="color:#f7df1e;">2. else if Ladder</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Multiple conditions ni sequential ga step-by-step check cheyyadaniki vadathamu.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:14px;">
          <strong style="color:#3fb950;">3. else Fallback</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Painunna conditions anni <code>false</code> ayinappudu default ga execute avthundhi.</p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Marks Grading Example</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const marks = 78;

if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 60) {
    console.log("Grade B");
} else if (marks >= 40) {
    console.log("Grade C");
} else {
    console.log("Fail");
}</code></pre>
      </div>
    </div>

    <!-- 2. Nested & Multiple Logical Conditions -->
    <div class="section-title"><span class="num">2</span>Nested Conditions & Multiple Logical Conditions</div>
    <div class="section-body">
      <p>Oka <code>if</code> block lopala maroka <code>if</code> block rayadanni <strong>Nested Condition</strong> antaru. Rendunte ekkuva conditions ni combine cheyyadaniki logical <code>&&</code> (AND), <code>||</code> (OR), and <code>!</code> (NOT) vadathamu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Multiple & Nested Conditions</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let age = 22;
let hasVoterId = true;
let isCitizen = true;

// Multiple conditions combined with &&
if (age >= 18 && hasVoterId && isCitizen) {
    console.log("✅ Eligible to Vote in Elections!");
} else {
    // Nested inspection
    if (age < 18) {
        console.log("❌ Underage: You must be at least 18 years old.");
    } else {
        console.log("❌ Missing Voter ID or Citizenship documents.");
    }
}</code></pre>
      </div>
    </div>

    <!-- 3. Guard Clauses (Clean Code Pattern) -->
    <div class="section-title"><span class="num">3</span>Guard Clauses (Early Return Clean Code Pattern)</div>
    <div class="section-body">
      <p>Deep ga nested <code>if-else</code> blocks rayadam valla code readability padipothundi (called <em>Pyramid of Doom</em>). <strong>Guard Clauses</strong> tho invalid cases ni mundhugane check chesi early ga return chesi code ni clean ga unchavachu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Guard Clause Pattern</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

function processPayment(user, amount) {
    // Guard Clause 1: Invalid user check
    if (!user) {
        return "Error: User profile not found!";
    }

    // Guard Clause 2: Negative amount check
    if (amount <= 0) {
        return "Error: Payment amount must be greater than zero!";
    }

    // Guard Clause 3: Insufficient balance check
    if (user.balance < amount) {
        return "Error: Insufficient funds in account!";
    }

    // Happy Path — Clean and Flat!
    user.balance -= amount;
    return "Success: Transferred Rs." + amount + " | New Balance: Rs." + user.balance;
}

const account = { name: "Ravi", balance: 5000 };
console.log(processPayment(account, 1200));</code></pre>
      </div>
    </div>

    <!-- 4. switch-case-break-default Statements -->
    <div class="section-title"><span class="num">4</span>switch, case, break & default</div>
    <div class="section-body">
      <p>Oka variable value ni multiple fixed constants tho compare cheyyadaniki <code>switch</code> statement best choice. <code>break</code> statement lekunte execution kindha unna cases loki <strong>fall-through</strong> avthundhi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — switch Statement</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

let dayNumber = 3;
let dayName;

switch (dayNumber) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
    case 7:
        dayName = "Weekend (Saturday/Sunday) 🎉";
        break;
    default:
        dayName = "Invalid Day Number (1-7 allowed)";
}

console.log("Day " + dayNumber + " is: " + dayName);</code></pre>
      </div>
    </div>

    <!-- 5. Truthy/Falsy in Conditions & Strict === Comparing -->
    <div class="section-title"><span class="num">5</span>Truthy/Falsy in Conditions & Safe Comparisons</div>
    <div class="section-body">
      <p>Condition lo pure boolean kakunda string or object pettinappudu JS implicit truthiness evaluate chesthundi. Eppudu strict <code>===</code> vadatam dwara accidental string-to-number coercions ni prevent cheyyavachu:</p>

      <code style="display:block; padding:12px 16px; background:#0d1117; border-radius:8px; color:#7ee787; margin:10px 0; font-size:13px;">let username = "Ravi";<br>if (username) {<br>    console.log("Hello, " + username); // Executes because non-empty string is Truthy!<br>}</code>
    </div>

    <!-- 6 PRACTICE PROGRAMS -->
    <div class="section-title"><span class="num">6</span>Practice Programs (6 Complete Solutions)</div>
    <div class="section-body">
      <p>Mastering conditions through 6 practical algorithms:</p>

      <!-- Program 1: Even or Odd -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 1: Even or Odd Checker</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Even or Odd</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

let num = 47;
if (num % 2 === 0) {
    console.log(num + " is EVEN");
} else {
    console.log(num + " is ODD");
}</code></pre>
        </div>
      </div>

      <!-- Program 2: Largest of Three Numbers -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 2: Largest of Three Numbers</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Largest of Three</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

let a = 85, b = 92, c = 74;

if (a >= b && a >= c) {
    console.log("Largest Number is: " + a);
} else if (b >= a && b >= c) {
    console.log("Largest Number is: " + b);
} else {
    console.log("Largest Number is: " + c);
}</code></pre>
        </div>
      </div>

      <!-- Program 3: Voting Eligibility -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 3: Voting Eligibility Checker</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Voting Eligibility</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

let voterAge = 19;
let message = voterAge >= 18 
    ? "✅ Eligible to Vote!" 
    : "❌ Not Eligible (Wait " + (18 - voterAge) + " more years)";

console.log(message);</code></pre>
        </div>
      </div>

      <!-- Program 4: Grade Calculator -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 4: Full Grade Calculator</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Grade Calculator</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function calculateGrade(score) {
    if (score < 0 || score > 100) return "Invalid Score!";
    if (score >= 90) return "A+ (Outstanding)";
    if (score >= 80) return "A (Excellent)";
    if (score >= 70) return "B (Good)";
    if (score >= 60) return "C (Average)";
    if (score >= 40) return "D (Pass)";
    return "F (Fail)";
}

console.log("Score 95:", calculateGrade(95));
console.log("Score 78:", calculateGrade(78));
console.log("Score 35:", calculateGrade(35));</code></pre>
        </div>
      </div>

      <!-- Program 5: Leap Year Checker -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 5: Leap Year Checker</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Leap Year Checker</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function isLeapYear(year) {
    // Leap year rule: divisible by 4 AND not 100, OR divisible by 400
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return year + " is a LEAP YEAR 🗓️";
    }
    return year + " is NOT a leap year";
}

console.log(isLeapYear(2024)); // Leap year
console.log(isLeapYear(2026)); // Not leap year
console.log(isLeapYear(2000)); // Leap year (divisible by 400)
console.log(isLeapYear(1900)); // Not leap year (century not divisible by 400)</code></pre>
        </div>
      </div>

      <!-- Program 6: Simple Calculator with switch -->
      <div style="margin:18px 0;">
        <h4 style="color:#f7df1e;">Program 6: Simple Calculator using switch</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">JavaScript — Calculator using switch</span>
            <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
          </div>
          <pre><code>"use strict";

function calculate(n1, operator, n2) {
    let result;
    switch (operator) {
        case '+':
            result = n1 + n2;
            break;
        case '-':
            result = n1 - n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        case '/':
            result = n2 !== 0 ? n1 / n2 : "Error: Cannot divide by zero!";
            break;
        case '%':
            result = n1 % n2;
            break;
        default:
            result = "Error: Unknown operator!";
    }
    return n1 + " " + operator + " " + n2 + " = " + result;
}

console.log(calculate(10, '+', 5));
console.log(calculate(20, '*', 3));
console.log(calculate(15, '/', 4));
console.log(calculate(10, '/', 0));</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Complete Challenge</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run and inspect the combined grade evaluation program in our live compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript Conditions</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>"use strict";

const studentName = "Ravi";
const marks = 78;

let grade;
if (marks >= 90) {
    grade = "Grade A";
} else if (marks >= 60) {
    grade = "Grade B";
} else if (marks >= 40) {
    grade = "Grade C";
} else {
    grade = "Fail";
}

console.log("Student:", studentName);
console.log("Marks:", marks);
console.log("Result:", grade);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">Run Code in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for JavaScript ES2026+</div>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 7, subtopics, contentBody, '06-browser-input-and-number-parsing.html', '6. Input & Output (alert, prompt...)', 'loops.html', 'Phase 5: Loops');
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
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 9 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, conditionals, if else, switch, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
      <span class="badge">📂 Collapsible Interactive Roadmap (9 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions & branching, loops, functions, arrays & objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/05-operators-expressions-and-precedence.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-javascript/conditionals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-javascript/loops.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Functions →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Arrays & Objects →</a>
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
  console.log('🚀 Building JavaScript Masterclass Phase 4 (Conditions)...');
  buildLesson7();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 4: Conditions successfully created!');
}

run();
