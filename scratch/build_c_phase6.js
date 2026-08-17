const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 6 (with multiple sub-chapters per phase!)
const C_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'C Basics & Program Architecture',
    icon: '⚡',
    desc: 'What is C?, History (Dennis Ritchie) & Modern Uses, C Features, C vs C++, C Program Structure, What is a Compiler?, Source Code (.c) vs Executable (.exe), The 4-Stage Compilation Pipeline (Preprocessing, Compiling, Assembling, Linking), First C Program breakdown (#include <stdio.h>, int main(void), printf, \\n, return 0, semicolon, braces, comments), and 3 Error Types (Syntax, Runtime, Logical).',
    lessons: [
      { num: 1, file: '01-c-basics-and-program-structure.html', title: '1. C Fundamentals & Program Architecture', subtopics: 'C ante enti? · History & Uses · Features · C vs C++ · Program Structure · Compiler & 4-Stage Pipeline · First Program Breakdown · Comments, Semicolons & Braces · 3 Error Types' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Variables & Data Types',
    icon: '📦',
    desc: 'Variables ante enti?, RAM Memory Model & Addresses, Declaration vs Initialization vs Assignment, Naming Rules, Local vs Global Variables, Stack Scope & Lifetime, Constants (const vs #define), Primary Types (int, float, double, char, _Bool), Modifiers (short, long, signed, unsigned), Integer Ranges & 2\'s Complement, sizeof Operator, Format Specifiers Master Guide (%d, %u, %f, %lf, %c, %s, %p), and Implicit Coercion vs Explicit Type Casting.',
    lessons: [
      { num: 2, file: '02-c-variables-declaration-and-memory-model.html', title: '2. Variables, Memory Model & Scope', subtopics: 'Variables ante enti? · RAM Memory Model · Declaration, Initialization & Assignment · Naming Rules · Local vs Global Scope · Stack Lifetime · const vs #define' },
      { num: 3, file: '03-c-data-types-format-specifiers-and-type-casting.html', title: '3. Data Types, sizeof & Type Casting', subtopics: 'Primary Types (int, float, double, char, _Bool) · Modifiers (short, long, signed, unsigned) · Integer Ranges · sizeof Operator · Format Specifiers (%d, %u, %f, %lf, %p) · Type Casting' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Input & Operators',
    icon: '⚡',
    desc: 'User Input with scanf(), Address operator (&), Reading ints, floats, chars, and strings, Input buffer problems (newline pitfall) & fixes, fgets() for safe string reading, Input validation, Arithmetic, Relational, Logical (short-circuit), Increment/Decrement (prefix vs postfix), Bitwise operators, Ternary operator, Precedence & Associativity Table, Integer Division, and 6 Practice Programs.',
    lessons: [
      { num: 4, file: '04-c-user-input-scanf-and-buffer-handling.html', title: '4. User Input (scanf, fgets & Buffer Traps)', subtopics: 'scanf() Mechanics · Address Operator (&) · Reading Primitives & Strings · Stdin Buffer Pitfall (\\n) · fgets() Safe Text Input · Input Validation' },
      { num: 5, file: '05-c-operators-expressions-and-precedence.html', title: '5. Operators, Precedence & 6 Programs', subtopics: 'Arithmetic & Modulus · Relational & Logical · Prefix vs Postfix (++x/x++) · Bitwise · Ternary · Precedence Table · 6 Practice Programs' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Conditional Statements & Branching',
    icon: '🔀',
    desc: 'if, if-else, else-if ladders, nested if, multiple conditions with logical AND/OR/NOT, short-circuit evaluation, ternary expressions, switch-case-break-default, jump table mechanics, fall-through behavior, character comparisons, common condition mistakes (if (x = 5), dangling else), and 7 practice programs.',
    lessons: [
      { num: 6, file: '06-c-conditional-branching-if-else-and-logical-operators.html', title: '6. if-else Ladders, Nested if & Logical Logic', subtopics: 'Boolean Truth in C · if, if-else & else-if · Nested if & Guard Clauses · Logical Operators & Short-Circuit · Ternary · Comparing Chars · Common Traps' },
      { num: 7, file: '07-c-switch-case-and-decision-practice-programs.html', title: '7. switch-case, Fall-Through & 7 Programs', subtopics: 'switch-case Mechanics · Jump Tables · break & default · Fall-Through Behavior · if-else vs switch · 7 Practice Programs (Leap Year, Calculator, Largest of 3)' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Loops & Iterations',
    icon: '🔁',
    desc: 'Why loops are needed, The 3 Pillars (Init, Condition, Update), for loop, entry-controlled while loop, exit-controlled do-while loop, break and continue jump controls, infinite loop causes and fixes, nested loops & grid coordinates, array/string iteration, and 9 core practice algorithms (Factorial, Fibonacci, Prime, Armstrong, Reverse, Digits, Star & Number Patterns).',
    lessons: [
      { num: 8, file: '08-c-loops-for-while-do-while-and-control-flow.html', title: '8. for, while, do-while, break & continue', subtopics: 'Why Loops are Needed · 3 Pillars of a Loop · for Loop Mechanics · while vs do-while · break & continue · Infinite Loops · Array & String Traversal' },
      { num: 9, file: '09-c-nested-loops-patterns-and-practice-programs.html', title: '9. Nested Loops, Patterns & 9 Core Programs', subtopics: 'Nested Loops Architecture · Star Patterns (Triangles, Pyramids) · Number Patterns · 9 Practice Programs (Prime, Armstrong, Fibonacci, Factorial, Reverse)' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Functions & Modular Architecture',
    icon: '🧩',
    desc: 'Function declaration, prototypes, definitions, calls, parameters vs arguments, return types, void, local vs global variables, static local variables in data segment, header files (.h), pass-by-value vs pass-by-reference (pointers), recursion call stack frames, stack overflow prevention, and 5 modular projects (Calculator, Student Grading, Number Utilities, Unit Converter, Menu-driven app).',
    lessons: [
      { num: 10, file: '10-c-functions-prototypes-and-storage-classes.html', title: '10. Functions, Prototypes, Scope & static', subtopics: 'Function Architecture · Prototypes · Parameters vs Arguments · void Return · Local vs Global · static Local Variables · Header Files (.h)' },
      { num: 11, file: '11-c-pass-by-value-pass-by-reference-and-recursion.html', title: '11. Pass-by-Value/Address, Recursion & 5 Projects', subtopics: 'Pass-by-Value vs Pass-by-Reference · Stack Frame Lifecycle · Recursion & Base Cases · 5 Modular Projects (Calculator, Grading, Number Utility)' }
    ]
  }
];

function generateCAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  C_CURRICULUM.forEach(phase => {
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
      html += `        <a href="/blog-c/${l.file}"${isActive}>${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

function wrapCPage(title, desc, filename, currentNum, phaseTag, phaseTitle, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateCAccordionSidebar(filename);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — C Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c functions, c prototypes, c recursion, pass by reference in c, c static variables" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <style>
    .concept-box {
      background: rgba(16, 185, 129, 0.05);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-left: 4px solid #10b981;
      border-radius: 8px;
      padding: 18px 22px;
      margin: 20px 0;
    }
    .concept-box h4 {
      color: #10b981;
      margin-bottom: 8px;
      font-size: 15.5px;
      font-weight: 700;
    }
    .concept-box p {
      color: var(--text2);
      font-size: 14.5px;
      line-height: 1.7;
      margin: 0 0 8px 0;
    }
    .concept-box p:last-child {
      margin-bottom: 0;
    }
    .stack-diagram {
      background: #0f141c;
      border: 1px solid #27303f;
      border-radius: 10px;
      padding: 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: #38bdf8;
      line-height: 1.8;
      margin: 22px 0;
      overflow-x: auto;
      white-space: pre;
    }
    .spec-table th {
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
    }
  </style>

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

        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

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
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_c', codeEl.textContent);
              window.location.href = '/?lang=c';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl && runBtn) {
            runBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_c', codeEl.textContent);
              window.location.href = '/?lang=c';
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-c">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html" class="active">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">C Master Course</div>
    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (51 Lessons)</a>
    <a href="/blog-javascript.html">JavaScript Course (19 Lessons)</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-c.html">C Programming</a><span class="sep">›</span>
      <span class="current">Lesson ${currentNum}: ${title}</span>
    </div>

    <h1 class="page-title">${title}</h1>

    <div class="page-meta">
      <span class="badge">⚡ C (C17 / C23 Standard)</span>
      <span class="badge">🟢 Lesson ${currentNum}</span>
      <span class="badge">📂 ${phaseTag}: ${phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#10b981; font-weight:700;">📌 Covered in this in-depth guide:</span>
      <span>${subtopics}</span>
    </div>

${contentBody}

    <div class="nav-footer">
      ${prevFile ? `
      <a href="${prevFile}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevTitle}</span>
      </a>` : `
      <a href="/blog-c.html" class="nav-btn">
        <span class="label">← C Course Overview</span>
        <span class="title">Course Home & Index</span>
      </a>`}

      ${nextFile ? `
      <a href="${nextFile}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextTitle}</span>
      </a>` : `
      <a href="/blog-c.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Index →</span>
        <span class="title">C Master Index</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 10: Functions, Prototypes, Scope & static ────────────────
function buildLesson10() {
  const title = "C Functions, Prototypes, Scope & static Local Variables";
  const desc = "Master C Functions (Phase 6 Part 1): Function declaration (prototypes), definitions, function calls, parameters vs arguments, return types, void, local vs global scope, static local variables in data segment, and header files (.h) for modular code reuse.";
  const filename = "10-c-functions-prototypes-and-storage-classes.html";
  const subtopics = "Function Architecture · Prototypes · Parameters vs Arguments · void Return · Local vs Global · static Local Variables · Header Files (.h)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 6 (Part 1): C Functions, Prototypes, Storage Classes & Modular Architecture Masterclass</strong>! Writing all code inside a monolithic <code>main()</code> function leads to spaghetti code, difficult debugging, and zero reusability. <strong>Functions</strong> enable <em>Modular Programming</em> by breaking complex systems into isolated, testable, and reusable building blocks. In this comprehensive guide, you will master the 3 structural phases of C functions, compiler function prototypes, parameter passing semantics, <code>void</code> return types, the powerful persistence of <code>static</code> local variables, and structuring professional multi-file header libraries.</p>
    </div>

    <!-- 1. Function Architecture & The 3 Pillars -->
    <div class="section-title"><span class="num">1</span>Function Architecture &amp; The 3 Pillars of C Functions</div>
    <div class="section-body">
      <p><strong>Function</strong> ante specific task perform chese self-contained block of instructions. 
      C lo function use cheyyadaniki <strong>3 Mandatory Stages</strong> untayi:</p>

      <ol style="margin-left:22px; color:var(--text2); font-size:14.5px; line-height:1.8; margin-bottom:14px;">
        <li><strong>1. Function Declaration (Prototype):</strong> <code>int add(int first, int second);</code><br>
        Compiler ki function return type, function name, mariyu parameter types ni <code>main()</code> mundhe theliyajeyyadam.</li>
        <li><strong>2. Function Call (Invocation):</strong> <code>int result = add(10, 20);</code><br>
        Function ni execute cheyyadaniki arguments pass chesi call cheyyadam.</li>
        <li><strong>3. Function Definition (Implementation):</strong> <code>int add(int first, int second) { return first + second; }</code><br>
        Function actual execution logic ni braces <code>{ ... }</code> lo implement cheyyadam.</li>
      </ol>

      <div class="concept-box">
        <h4>💡 Parameters vs Arguments Explained</h4>
        <p>• <strong>Parameters (Formal Parameters):</strong> Function definition/prototype lo declare chesina variables (e.g. <code>int first, int second</code>).<br>
        • <strong>Arguments (Actual Parameters):</strong> Function call chesthunnapudu pass chese real values or variables (e.g. <code>10, 20</code>).</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Standard Example</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Function Prototype (Declaration)
int add(int first, int second);

int main(void) {
    // 2. Function Call (Passing arguments 10 and 20)
    int result = add(10, 20);
    printf("Result: %d\\n", result);

    return 0;
}

// 3. Function Definition
int add(int first, int second) {
    return first + second;
}</code></pre>
      </div>
    </div>

    <!-- 2. Return Types & void Functions -->
    <div class="section-title"><span class="num">2</span>Return Types, Multiple Parameters &amp; void Functions</div>
    <div class="section-body">
      <p>C functions can return any primitive type (<code>int</code>, <code>float</code>, <code>double</code>, <code>char</code>) or pointers. 
      Oka function emi value return cheyyakapothe daani return type <strong><code>void</code></strong> ga declare chesthamu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — void & Multi-Parameter Functions</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// void function: takes parameters, displays output, returns nothing
void printReceipt(const char* item, int qty, double unitPrice) {
    double total = qty * unitPrice;
    printf("Item: %-12s | Qty: %2d | Total: Rs.%.2f\\n", item, qty, total);
}

int main(void) {
    printReceipt("Coffee Mug", 2, 149.50);
    printReceipt("Notebook",   5,  45.00);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Local vs Global vs static Local Variables -->
    <div class="section-title"><span class="num">3</span>Local vs Global vs static Local Variables in C ⭐</div>
    <div class="section-body">
      <p>In C, variable storage classes determine memory segment placement and lifetime:</p>

      <table class="tbl spec-table">
        <tr><th>Variable Type</th><th>Memory Location in RAM</th><th>Lifetime in Memory</th><th>Value Persistence</th></tr>
        <tr><td><strong>Standard Local Variable</strong></td><td>Stack Frame</td><td>Created on call; <strong>Destroyed when function exits</strong></td><td>Re-initialized every function call.</td></tr>
        <tr><td><strong><code>static</code> Local Variable</strong></td><td><strong>Data Segment</strong></td><td><strong>Persists across entire program runtime!</strong></td><td><strong>Retains its previous value</strong> across function calls!</td></tr>
        <tr><td><strong>Global Variable</strong></td><td>Data Segment</td><td>Entire program runtime</td><td>Accessible everywhere across file.</td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — static Local Variable Persistence Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void generateID(void) {
    int normalCounter = 0;       // Re-created as 0 every time on Stack!
    static int persistentID = 1000; // Initialized ONCE in Data Segment!

    normalCounter++;
    persistentID++;

    printf("normalCounter = %d | persistentID = %d\\n", normalCounter, persistentID);
}

int main(void) {
    printf("Call 1: "); generateID();
    printf("Call 2: "); generateID();
    printf("Call 3: "); generateID();
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 4. Header Files & Modular Reusable Architecture -->
    <div class="section-title"><span class="num">4</span>Header Files (.h) &amp; Reusable Code Architecture</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>📁 Professional C Project Organization (.h vs .c)</h4>
        <p>• <strong><code>my_math.h</code> (Header File):</strong> Contains function prototypes, constant macros (<code>#define</code>), and struct declarations.<br>
        • <strong><code>my_math.c</code> (Source File):</strong> Contains actual function definitions/code implementation.<br>
        • <strong><code>main.c</code>:</strong> Includes the header <code>#include "my_math.h"</code> and uses the library functions cleanly!</p>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Functions in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this multi-parameter arithmetic function program in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int multiply(int a, int b) {
    return a * b;
}

int main(void) {
    int prod = multiply(12, 8);
    printf("12 * 8 = %d\\n", prod);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for C17 / C23 Standard</div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 10, "Phase 06", "Functions & Modular Architecture", subtopics, contentBody, '09-c-nested-loops-patterns-and-practice-programs.html', '9. Nested Loops, Patterns & 9 Core Programs', '11-c-pass-by-value-pass-by-reference-and-recursion.html', '11. Pass-by-Value/Address, Recursion & 5 Projects');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 11: Pass-by-Value/Address, Recursion & 5 Projects ─────────
function buildLesson11() {
  const title = "C Pass-by-Value vs Address, Recursion & 5 Modular Projects";
  const desc = "Master Advanced C Functions (Phase 6 Part 2): Pass-by-value vs pass-by-reference (address pointers), stack frame execution lifecycle, recursion base cases, call stack mechanics, avoiding stack overflow, and 5 complete modular projects (Calculator, Student Grading, Number Utility Library, Unit Converter, Menu-driven app).";
  const filename = "11-c-pass-by-value-pass-by-reference-and-recursion.html";
  const subtopics = "Pass-by-Value vs Pass-by-Reference · Stack Frame Lifecycle · Recursion & Base Cases · 5 Modular Projects (Calculator, Grading, Number Utility)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 6 (Part 2): C Parameter Passing, Stack Frames, Recursion & 5 Modular Projects Masterclass</strong>! Understanding how arguments travel across RAM memory into function boundaries is the defining bridge between intermediate and advanced C programming. In this comprehensive guide, you will master the difference between <strong>Call by Value</strong> (safe isolated copies) and <strong>Call by Address / Reference</strong> (in-place memory mutation via pointers), analyze the internal CPU <strong>Call Stack lifecycle</strong> during recursive self-invocations, and engineer <strong>5 complete real-world modular applications</strong>.</p>
    </div>

    <!-- 1. Pass-by-Value vs Pass-by-Address -->
    <div class="section-title"><span class="num">1</span>Pass-by-Value vs Pass-by-Address (Call by Reference) ⭐</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>1. Pass by Value (Default in C)</h4>
        <p>Function ki variable copy mathrame velthundhi. Function lopala variable ni change chesina, <code>main()</code> lo unna original variable value change avvadhu!</p>
      </div>

      <div class="concept-box">
        <h4>2. Pass by Address / Pointer (Call by Reference)</h4>
        <p>Function ki variable యొక్క **RAM Memory Address (<code>&amp;var</code>)** pass chesthamu. Function pointer <code>*ptr</code> tho direct ga caller memory slot ni modify chesthundhi (e.g. Swapping two numbers)!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pass-by-Value vs Pass-by-Address (Swap Demo)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Pass by Value (Fails to swap in main!)
void wrongSwap(int a, int b) {
    int temp = a; a = b; b = temp;
}

// 2. Pass by Address (Successfully swaps caller's RAM memory!)
void realSwap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;

    wrongSwap(x, y);
    printf("After wrongSwap: x = %d, y = %d (NO change!)\\n", x, y);

    realSwap(&amp;x, &amp;y); // Passing memory addresses &x and &y
    printf("After realSwap:  x = %d, y = %d (Swapped!)\\n", x, y);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 2. Recursion & Stack Frame Architecture -->
    <div class="section-title"><span class="num">2</span>Recursion Mechanics &amp; The CPU Call Stack Architecture</div>
    <div class="section-body">
      <p><strong>Recursion</strong> ante oka function thanani thane direct ga or indirect ga call chesukovadam. 
      Every recursive function must have 2 mandatory parts:</p>

      <ol style="margin-left:22px; color:var(--text2); font-size:14.5px; line-height:1.8; margin-bottom:14px;">
        <li><strong>1. Base Case (Stopping Condition):</strong> Recursion infinite loop lo vellakunda terminate chese condition (e.g. <code>if (n &lt;= 1) return 1;</code>). Missing base case causes a <strong>Stack Overflow Crash</strong>!</li>
        <li><strong>2. Recursive Step:</strong> Problem size ni reduce chesthu smaller input tho self-call cheyyadam (e.g. <code>return n * factorial(n - 1);</code>).</li>
      </ol>

      <div class="stack-diagram">
        <strong>CPU Call Stack Frame Lifecycle for factorial(3):</strong><br>
        <br>
        [ PUSHING STACK FRAMES ]                  [ UNWINDING &amp; RETURNING ]<br>
        │ factorial(1) -&gt; returns 1 (Base Case)  │  returns 1<br>
        │ factorial(2) -&gt; 2 * factorial(1)       │  returns 2 * 1 = 2<br>
        │ factorial(3) -&gt; 3 * factorial(2)       │  returns 3 * 2 = 6<br>
        │ main()                                 │  main() receives 6!
      </div>
    </div>

    <!-- 3. The 5 Complete Modular Projects -->
    <div class="section-title"><span class="num">3</span>5 Complete Modular Software Projects</div>
    <div class="section-body">
      <p>Practical implementation of production-style modular functions across 5 distinct domains:</p>

      <!-- Project 1 & 2: Calculator & Student System -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">Projects 1 &amp; 2: Modular Calculator &amp; Student Grading System</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C — Modular Calculator & Grading Library</span>
            <a class="try-btn" href="/?lang=c">▶ Run Code</a>
          </div>
          <pre><code>#include &lt;stdio.h&gt;

// --- 1. Modular Calculator Library ---
double calculate(double a, double b, char op) {
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    if (op == '/') return (b != 0) ? (a / b) : 0.0;
    return 0.0;
}

// --- 2. Student Grading System ---
char calculateGrade(double avg) {
    if (avg &gt;= 90.0) return 'A';
    if (avg &gt;= 75.0) return 'B';
    if (avg &gt;= 50.0) return 'C';
    return 'F';
}

int main(void) {
    printf("1. Calculator: 50 * 4 = %.2f\\n", calculate(50, 4, '*'));
    printf("2. Student Avg 82.5%% -&gt; Grade: %c\\n", calculateGrade(82.5));
    return 0;
}</code></pre>
        </div>
      </div>

      <!-- Project 3, 4, 5: Number Utility & Unit Converter -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">Projects 3, 4 &amp; 5: Number Utility Library, Unit Converter &amp; Recursion</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C — Number Utility & Unit Converter Suite</span>
            <a class="try-btn" href="/?lang=c">▶ Run Suite</a>
          </div>
          <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

// --- 3. Number Utility Library ---
bool isPrime(int n) {
    if (n &lt;= 1) return false;
    for (int i = 2; i * i &lt;= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

long long factorialRecursive(int n) {
    if (n &lt;= 1) return 1; // Base case
    return n * factorialRecursive(n - 1); // Recursive step
}

// --- 4. Unit Converter Library ---
double celsiusToFahrenheit(double c) {
    return (c * 9.0 / 5.0) + 32.0;
}

double kilometersToMiles(double km) {
    return km * 0.621371;
}

int main(void) {
    printf("3. Number Utility: Is 31 Prime? %s\\n", isPrime(31) ? "YES" : "NO");
    printf("4. Recursion: Factorial of 6 = %lld\\n", factorialRecursive(6));
    printf("5. Unit Converter: 100 km = %.2f Miles | 100°C = %.1f°F\\n", kilometersToMiles(100), celsiusToFahrenheit(100));
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Recursion in Live C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this recursive countdown and power calculation program in our online GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Recursive power: base^exp
long long power(int base, int exp) {
    if (exp == 0) return 1;
    return base * power(base, exp - 1);
}

int main(void) {
    printf("2^8 = %lld\\n", power(2, 8));
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for C17 / C23 Standard</div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 11, "Phase 06", "Functions & Modular Architecture", subtopics, contentBody, '10-c-functions-prototypes-and-storage-classes.html', '10. Functions, Prototypes, Scope & static', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE LESSON 9 to link to Lesson 10 ──────────────────────────────────
function updateLesson9() {
  const file9 = path.join(cDir, '09-c-nested-loops-patterns-and-practice-programs.html');
  const title = "C Nested Loops, Star Patterns & 9 Core Practice Algorithms";
  const desc = "Master C Nested Loops & Classical Algorithms (Phase 5 Part 2): 2D Grid coordinate iteration, Star Patterns, Number Patterns, and 9 complete practical algorithms.";
  const subtopics = "Nested Loops Architecture · Star Patterns (Triangles, Pyramids) · Number Patterns · 9 Practice Programs (Prime, Armstrong, Fibonacci, Factorial, Reverse)";

  const currentContent = fs.readFileSync(file9, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '09-c-nested-loops-patterns-and-practice-programs.html', 9, "Phase 05", "Loops & Iterations", subtopics, contentBody, '08-c-loops-for-while-do-while-and-control-flow.html', '8. for, while, do-while, break & continue', '10-c-functions-prototypes-and-storage-classes.html', '10. Functions, Prototypes, Scope & static');
  fs.writeFileSync(file9, html, 'utf8');
  console.log('✅ Updated 09-c-nested-loops-patterns-and-practice-programs.html next links!');
}

// Update all sidebar links across all 11 C lesson files
function updateAllCSidebars() {
  const files = [
    '01-c-basics-and-program-structure.html',
    '02-c-variables-declaration-and-memory-model.html',
    '03-c-data-types-format-specifiers-and-type-casting.html',
    '04-c-user-input-scanf-and-buffer-handling.html',
    '05-c-operators-expressions-and-precedence.html',
    '06-c-conditional-branching-if-else-and-logical-operators.html',
    '07-c-switch-case-and-decision-practice-programs.html',
    '08-c-loops-for-while-do-while-and-control-flow.html',
    '09-c-nested-loops-patterns-and-practice-programs.html',
    '10-c-functions-prototypes-and-storage-classes.html',
    '11-c-pass-by-value-pass-by-reference-and-recursion.html'
  ];
  
  files.forEach(file => {
    const filePath = path.join(cDir, file);
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    const accordionHtml = generateCAccordionSidebar(file);
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, `${accordionHtml}\n  </aside>`);

    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`✅ Updated sidebars across all ${files.length} C lesson files!`);
}

// ── UPDATE blog-c.html HOME PAGE ──────────────────────────────────────────
function buildBlogCHome() {
  const cHomePath = path.join(baseDir, 'blog-c.html');

  let roadmapCardsHtml = '';
  C_CURRICULUM.forEach(phase => {
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
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Chapter${phase.lessons.length > 1 ? 's' : ''}</span>
      </div>
      <p class="phase-roadmap-desc">${phase.desc}</p>
      <div class="phase-lessons-list">
`;

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += `        <a href="/blog-c/${l.file}" class="curriculum-lesson-row">
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

  const accordionSidebar = generateCAccordionSidebar(null);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, loops, and modular functions with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c functions, c recursion" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

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
<body class="lang-c">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html" class="active">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">C Master Course</div>
    <a href="/blog-c.html" class="sidebar-home-link active">⚡ C Course HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (51 Lessons)</a>
    <a href="/blog-javascript.html">JavaScript Course (19 Lessons)</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">C Programming Masterclass</span>
    </div>

    <h1 class="page-title">C Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">⚡ C (C17 / C23 Standard)</span>
      <span class="badge">🟢 11 In-Depth Sub-Chapters Across 6 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, variables, scanf input, conditions, loops, or modular functions & recursion:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-c/04-c-user-input-scanf-and-buffer-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: Input →</a>
        <a href="/blog-c/06-c-conditional-branching-if-else-and-logical-operators.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-c/08-c-loops-for-while-do-while-and-control-flow.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-c/10-c-functions-prototypes-and-storage-classes.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 6: Functions & Recursion →</a>
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
        <span>Reviewed for accuracy & tested on GCC / Clang C17 runtimes · Last updated August 2026</span>
      </div>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(cHomePath, html, 'utf8');
  console.log('✅ Updated public/blog-c.html with Phase 1 to 6 (11 Chapters)!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 6 (Functions & Modular Programming)...');
  buildLesson10();
  buildLesson11();
  updateLesson9();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 6 successfully created with sub-chapters!');
}

run();
