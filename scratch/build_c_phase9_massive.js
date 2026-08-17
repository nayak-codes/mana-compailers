const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 9 (23 Chapters!)
const C_CURRICULUM = [
  {
    id: 'phase1', tag: 'Phase 01', title: 'C Basics & Architecture', icon: '⚡',
    desc: 'What is C?, History (Dennis Ritchie) & Modern Uses, C Features, C vs C++, C Program Structure, What is a Compiler?, Source Code (.c) vs Executable (.exe), The 4-Stage Compilation Pipeline (Preprocessing, Compiling, Assembling, Linking), First C Program breakdown (#include <stdio.h>, int main(void), printf, \\n, return 0, semicolon, braces, comments), and 3 Error Types (Syntax, Runtime, Logical).',
    lessons: [
      { num: 1, file: '01-c-basics-and-program-structure.html', title: '1. C Fundamentals & Program Architecture', subtopics: 'C ante enti? · History & Uses · Features · C vs C++ · Program Structure · Compiler & 4-Stage Pipeline · First Program Breakdown · Comments, Semicolons & Braces · 3 Error Types' }
    ]
  },
  {
    id: 'phase2', tag: 'Phase 02', title: 'Variables & Data Types', icon: '📦',
    desc: 'Variables ante enti?, RAM Memory Model & Addresses, Declaration vs Initialization vs Assignment, Naming Rules, Local vs Global Variables, Stack Scope & Lifetime, Constants (const vs #define), Primary Types (int, float, double, char, _Bool), Modifiers (short, long, signed, unsigned), Integer Ranges & 2\'s Complement, sizeof Operator, Format Specifiers Master Guide (%d, %u, %f, %lf, %c, %s, %p), and Implicit Coercion vs Explicit Type Casting.',
    lessons: [
      { num: 2, file: '02-c-variables-declaration-and-memory-model.html', title: '2. Variables, Memory Model & Scope', subtopics: 'Variables ante enti? · RAM Memory Model · Declaration, Initialization & Assignment · Naming Rules · Local vs Global Scope · Stack Lifetime · const vs #define' },
      { num: 3, file: '03-c-data-types-format-specifiers-and-type-casting.html', title: '3. Data Types, sizeof & Type Casting', subtopics: 'Primary Types (int, float, double, char, _Bool) · Modifiers (short, long, signed, unsigned) · Integer Ranges · sizeof Operator · Format Specifiers (%d, %u, %f, %lf, %p) · Type Casting' }
    ]
  },
  {
    id: 'phase3', tag: 'Phase 03', title: 'Input & Operators', icon: '⚡',
    desc: 'User Input with scanf(), Address operator (&), Reading ints, floats, chars, and strings, Input buffer problems (newline pitfall) & fixes, fgets() for safe string reading, Input validation, Arithmetic, Relational, Logical (short-circuit), Increment/Decrement (prefix vs postfix), Bitwise operators, Ternary operator, Precedence & Associativity Table, Integer Division, and 6 Practice Programs.',
    lessons: [
      { num: 4, file: '04-c-user-input-scanf-and-buffer-handling.html', title: '4. User Input (scanf, fgets & Buffer Traps)', subtopics: 'scanf() Mechanics · Address Operator (&) · Reading Primitives & Strings · Stdin Buffer Pitfall (\\n) · fgets() Safe Text Input · Input Validation' },
      { num: 5, file: '05-c-operators-expressions-and-precedence.html', title: '5. Operators, Precedence & 6 Programs', subtopics: 'Arithmetic & Modulus · Relational & Logical · Prefix vs Postfix (++x/x++) · Bitwise · Ternary · Precedence Table · 6 Practice Programs' }
    ]
  },
  {
    id: 'phase4', tag: 'Phase 04', title: 'Conditional Statements & Branching', icon: '🔀',
    desc: 'if, if-else, else-if ladders, nested if, multiple conditions with logical AND/OR/NOT, short-circuit evaluation, ternary expressions, switch-case-break-default, jump table mechanics, fall-through behavior, character comparisons, common condition mistakes (if (x = 5), dangling else), and 7 practice programs.',
    lessons: [
      { num: 6, file: '06-c-conditional-branching-if-else-and-logical-operators.html', title: '6. if-else Ladders, Nested if & Logical Logic', subtopics: 'Boolean Truth in C · if, if-else & else-if · Nested if & Guard Clauses · Logical Operators & Short-Circuit · Ternary · Comparing Chars · Common Traps' },
      { num: 7, file: '07-c-switch-case-and-decision-practice-programs.html', title: '7. switch-case, Fall-Through & 7 Programs', subtopics: 'switch-case Mechanics · Jump Tables · break & default · Fall-Through Behavior · if-else vs switch · 7 Practice Programs (Leap Year, Calculator, Largest of 3)' }
    ]
  },
  {
    id: 'phase5', tag: 'Phase 05', title: 'Loops & Iterations', icon: '🔁',
    desc: 'Why loops are needed, The 3 Pillars (Init, Condition, Update), for loop, entry-controlled while loop, exit-controlled do-while loop, break and continue jump controls, infinite loop causes and fixes, nested loops & grid coordinates, array/string iteration, and 9 core practice algorithms (Factorial, Fibonacci, Prime, Armstrong, Reverse, Digits, Star & Number Patterns).',
    lessons: [
      { num: 8, file: '08-c-loops-for-while-do-while-and-control-flow.html', title: '8. for, while, do-while, break & continue', subtopics: 'Why Loops are Needed · 3 Pillars of a Loop · for Loop Mechanics · while vs do-while · break & continue · Infinite Loops · Array & String Traversal' },
      { num: 9, file: '09-c-nested-loops-patterns-and-practice-programs.html', title: '9. Nested Loops, Patterns & 9 Core Programs', subtopics: 'Nested Loops Architecture · Star Patterns (Triangles, Pyramids) · Number Patterns · 9 Practice Programs (Prime, Armstrong, Fibonacci, Factorial, Reverse)' }
    ]
  },
  {
    id: 'phase6', tag: 'Phase 06', title: 'Functions & Modular Architecture', icon: '🧩',
    desc: 'Deep-dive 4-chapter masterclass on Functions: declaration & prototypes, memory segments & static local variables, pass-by-value vs pass-by-reference pointers, CPU call stack frames, recursion theory, and 5 modular software projects.',
    lessons: [
      { num: 10, file: '10-c-functions-declaration-definition-and-prototypes.html', title: '10. Function Architecture & Prototypes', subtopics: 'Function ante enti? · Modular Programming · 3-Step Lifecycle · Prototypes vs Definitions · Parameters vs Arguments · void Return Types' },
      { num: 11, file: '11-c-variable-scope-lifetime-and-static-storage.html', title: '11. Scope, static Variables & Header Files', subtopics: 'RAM Memory Segments (Stack, Data, BSS) · Local vs Global Scope · static Local Variables · Variable Shadowing · Header Files (.h)' },
      { num: 12, file: '12-c-parameter-passing-value-vs-reference.html', title: '12. Pass-by-Value vs Pass-by-Address', subtopics: 'Call by Value Copying · Stack Frame Isolation · Pass by Address (&var) · Pointer Mutation (*ptr) · Returning Multiple Values via Pointers' },
      { num: 13, file: '13-c-recursion-call-stack-and-modular-projects.html', title: '13. Recursion, Call Stack & 5 Projects', subtopics: 'Recursion Inductive Model · Base Cases · CPU Stack Frame Pushing/Unwinding · Stack Overflow Prevention · 5 Modular Projects (Calculator, Grading, Utilities)' }
    ]
  },
  {
    id: 'phase7', tag: 'Phase 07', title: 'Arrays & Memory Organization', icon: '📊',
    desc: 'Comprehensive 4-chapter masterclass on Arrays: 1D contiguous RAM memory models, zero-based offset formulas, 2D/3D Row-Major matrices, matrix addition/transposition, passing arrays to functions & pointer decay, and 6 core algorithmic operations (Search, Bubble Sort, Min/Max, Reverse, Merge).',
    lessons: [
      { num: 14, file: '14-c-arrays-fundamentals-memory-model-and-indexing.html', title: '14. 1D Arrays, RAM Architecture & Indexing', subtopics: 'Array ante enti? · Contiguous Memory Layout · Zero-Based Offset Formula · sizeof Length Idiom · Bounds Checking & Buffer Overflow' },
      { num: 15, file: '15-c-multidimensional-arrays-and-matrices.html', title: '15. 2D/3D Arrays, Row-Major & Matrices', subtopics: '2D/3D Array Architecture · Row-Major Memory Mapping Formula · Matrix Addition & Transpose · Array of Characters vs Strings' },
      { num: 16, file: '16-c-passing-arrays-to-functions-and-pointer-decay.html', title: '16. Passing Arrays to Functions & Pointer Decay', subtopics: 'Pointer Decay Mechanics · Why sizeof(arr) Fails Inside Functions · Explicit Size Passing · const Read-Only Arrays · Array Limitations' },
      { num: 17, file: '17-c-array-algorithms-searching-sorting-and-manipulation.html', title: '17. Array Algorithms (Search, Sort & Reverse)', subtopics: 'Sum & Average · Min & Max in O(N) · Linear Search Algorithm · Bubble Sort Optimization · In-Place Array Reversal · Merging Arrays' }
    ]
  },
  {
    id: 'phase8', tag: 'Phase 08', title: 'Strings & Text Processing', icon: '🔤',
    desc: 'Exhaustive 3-chapter masterclass on C Strings: null-terminator sentinel (\'\\0\') architecture, stack arrays vs read-only string literals, safe text input with fgets() and strcspn(), the complete <string.h> suite (strlen, strcpy, strncpy, strcat, strcmp, strchr, strstr), buffer overflow security, manual re-implementations, and 6 text processing projects.',
    lessons: [
      { num: 18, file: '18-c-strings-null-terminator-and-safe-io.html', title: '18. Strings, Null Terminator & Safe I/O', subtopics: 'Strings ante enti? · Null Terminator (\\0) Sentinel · Stack Array vs Read-Only Literal · scanf() Traps vs fgets() · strcspn() Newline Removal · String Arrays' },
      { num: 19, file: '19-c-string-library-functions-and-security.html', title: '19. <string.h> Functions & Buffer Security', subtopics: 'strlen() Complexity · strcpy vs strncpy · strcat vs strncat · strcmp & strncmp · strchr & strstr · Buffer Overflow CVEs · Manual Reimplementations' },
      { num: 20, file: '20-c-string-algorithms-and-text-processing-projects.html', title: '20. String Algorithms & 6 Text Projects', subtopics: 'Two-Pointer String Reversal · Palindrome Checker · State Machine Word Counter · ASCII Frequency Array · Username Validator · Text Analyzer' }
    ]
  },
  {
    id: 'phase9', tag: 'Phase 09', title: 'Pointers & Memory Architecture', icon: '🎯',
    desc: 'Exhaustive 3-chapter masterclass on C Pointers: physical RAM memory addressing, address-of (&) and dereference (*) operators, null/wild/dangling pointer traps, pointer arithmetic scaling, pointers & arrays/strings, const qualifiers (pointer to const vs const pointer), generic void* pointers, double pointers (int**), function pointers (callbacks), and the 5 golden safety rules.',
    lessons: [
      { num: 21, file: '21-c-pointers-memory-addresses-and-dereferencing.html', title: '21. Pointers, RAM Addresses & Dereferencing', subtopics: 'Memory Addresses & & Operator · Pointer Declaration & Dereferencing (*) · Pointer Types & Byte Sizes · Null, Wild & Dangling Pointers · (void*) Casting in %p' },
      { num: 22, file: '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html', title: '22. Pointer Arithmetic, Arrays & const Qualifiers', subtopics: 'Pointer Arithmetic & Scaling Rule · Pointers and 1D/2D Arrays · Pointers & String Iteration · 3 Degrees of const with Pointers · Generic void* Pointers' },
      { num: 23, file: '23-c-double-pointers-function-pointers-and-safety.html', title: '23. Double Pointers, Function Pointers & Safety', subtopics: 'Double Pointers (int**) · Dynamic Pointer Reallocation · Function Pointers & Callbacks · 5 Golden Pointer Safety Commandments · Common Traps' }
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
  <title>${title} — C Master Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, c pointers, dereferencing c, pointer arithmetic c, double pointer c, function pointer c" />
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
      padding: 22px 26px;
      margin: 24px 0;
    }
    .concept-box h4 {
      color: #10b981;
      margin-bottom: 10px;
      font-size: 16.5px;
      font-weight: 700;
    }
    .concept-box p {
      color: var(--text2);
      font-size: 15px;
      line-height: 1.8;
      margin: 0 0 10px 0;
    }
    .concept-box p:last-child {
      margin-bottom: 0;
    }
    .memory-diagram {
      background: #0f141c;
      border: 1px solid #27303f;
      border-radius: 10px;
      padding: 22px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13.5px;
      color: #38bdf8;
      line-height: 1.85;
      margin: 24px 0;
      overflow-x: auto;
      white-space: pre;
    }
    .spec-table th {
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
      font-size: 14.5px;
    }
    .deep-dive-card {
      background: #141922;
      border: 1px solid #27303f;
      border-radius: 10px;
      padding: 24px;
      margin: 26px 0;
    }
    .deep-dive-card h3 {
      color: #10b981;
      font-size: 17.5px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .faq-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin: 24px 0;
    }
    .faq-item {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-left: 4px solid #10b981;
      border-radius: 8px;
      padding: 20px 22px;
    }
    .faq-item h4 {
      color: #e6edf3;
      font-size: 15.5px;
      margin-bottom: 8px;
    }
    .faq-item p {
      color: var(--text2);
      font-size: 14.5px;
      line-height: 1.75;
      margin: 0;
    }
    .text-prose {
      font-size: 15.5px;
      line-height: 1.85;
      color: var(--text);
      margin-bottom: 18px;
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
      <span class="badge">📅 2026 Comprehensive Master Edition</span>
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

// ── BUILD LESSON 21: Pointers, RAM Addresses & Dereferencing ──────────────
function buildLesson21() {
  const title = "C Pointers: RAM Memory Architecture, Addresses & Dereferencing Masterclass";
  const desc = "Comprehensive textbook-grade masterclass on C Pointers (Phase 9 Part 1): Physical RAM addressing, address-of operator (&), pointer declaration and dereferencing (*), why typed pointers exist, 64-bit address size, Null pointers vs Wild pointers vs Dangling pointers, and printing pointers safely with (void*) in %p.";
  const filename = "21-c-pointers-memory-addresses-and-dereferencing.html";
  const subtopics = "Memory Addresses & & Operator · Pointer Declaration & Dereferencing (*) · Pointer Types & Byte Sizes · Null, Wild & Dangling Pointers · (void*) Casting in %p";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 9 (Chapter 21): C Pointers, RAM Memory Architecture & Dereferencing Masterclass</strong>! Pointers are the undisputed soul and super-power of the C programming language. Without pointers, direct hardware access, operating system kernels, device drivers, dynamic data structures (trees, graphs, linked lists), and high-performance zero-copy memory manipulation would be impossible. In this exhaustive textbook-grade guide, you will master physical RAM memory addressing in hexadecimal, understand the profound mathematical difference between variable contents and memory addresses, learn how the address-of operator (<code>&amp;</code>) and dereference operator (<code>*</code>) work at the CPU assembly level, analyze the deadly trinity of pointer bugs (Null, Wild, and Dangling pointers), and understand why casting to <code>(void*)</code> is mandatory when printing addresses.</p>
    </div>

    <!-- 1. Physical RAM Memory Architecture -->
    <div class="section-title"><span class="num">1</span>Physical RAM Memory Architecture &amp; Hexadecimal Addresses</div>
    <div class="section-body">
      <p class="text-prose">
        Computer RAM anedhi billions of individual <strong>1-Byte (8-bit) Memory Cells</strong> యొక్క continuous linear grid. 
        Prati single byte memory cell ki hardware level lo unique <strong>Numerical Address</strong> untundhi (usually expressed in Hexadecimal e.g. <code>0x7FFF5FBFF8AC</code>).
      </p>

      <div class="concept-box">
        <h4>🌟 Variables vs Memory Addresses Explained:</h4>
        <p>• <strong>Variable:</strong> Oka human-readable nickname (alias) given to a specific memory slot (e.g. <code>int number = 42;</code>).<br>
        • <strong>Memory Address (<code>&amp;number</code>):</strong> Aa variable RAM lo physical ga ekkada store ayyi undo cheppe exact byte location!<br>
        • <strong>Pointer Variable (<code>int* ptr = &amp;number;</code>):</strong> Data values (like 42 or 99) kakunda, <strong>Inko variable యొక్క Memory Address ni thanalo store chesukune special variable!</strong></p>
      </div>

      <div class="memory-diagram">
        <strong>RAM Memory Model for: int number = 42; int* pointer = &amp;number;</strong><br>
        <br>
        RAM Address:       0x1000                          0x2000 (Takes 8 Bytes on 64-bit CPU)<br>
                           ┌───────────────┐               ┌──────────────────────────────┐<br>
        Stored Content:    │      42       │ &lt;──────────── │          0x1000              │<br>
                           └───────────────┘  (Points to)  └──────────────────────────────┘<br>
        Variable Name:          number                          pointer<br>
        Variable Type:           int                             int*<br>
        Value Type:        Integer Data (4 Bytes)          RAM Memory Address (8 Bytes)
      </div>
    </div>

    <!-- 2. The Two Magical Operators: & and * -->
    <div class="section-title"><span class="num">2</span>The Address-Of Operator (&amp;) vs Dereferencing Operator (*) ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        C language lo pointers tho work cheyyadaniki 2 fundamental unary operators untayi:
      </p>

      <table class="tbl spec-table">
        <tr><th>Operator</th><th>Technical Name</th><th>Role &amp; Mechanism</th><th>Visual Analogy</th></tr>
        <tr>
          <td><strong><code>&amp;</code></strong></td>
          <td><strong>Address-Of Operator</strong></td>
          <td>Oka variable యొక్క physical RAM memory address ni extract chesthundhi.</td>
          <td>Finding the GPS location / House Address of a person.</td>
        </tr>
        <tr>
          <td><strong><code>*</code></strong></td>
          <td><strong>Dereference (Indirection) Operator</strong></td>
          <td>Pointer lo unna memory address ki velli, akkada unna <strong>Actual Value ni Read or Write (Modify)</strong> chesthundhi!</td>
          <td>Opening the front door of that house and accessing whatever is inside!</td>
        </tr>
      </table>

      <div class="deep-dive-card">
        <h3>📐 Why Do Typed Pointers Exist? (int* vs char* vs double*)</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.75;">
          All pointers on a 64-bit operating system occupy the exact same size: <strong>8 Bytes</strong> (because memory addresses are 64 bits wide). 
          <em>Why then do we declare <code>int*</code>, <code>char*</code>, or <code>double*</code> instead of just <code>pointer ptr;</code>?</em><br><br>
          ✅ <strong>The Dereference Byte-Stride Rule:</strong> Pointer type anedhi dereference (<code>*ptr</code>) chesinappudu CPU <strong>Enni bytes read cheyyalo</strong> theliyajesthundhi!<br>
          • <code>char*</code> dereference chesthe CPU <strong>1 Byte</strong> fetch chesthundhi.<br>
          • <code>int*</code> dereference chesthe CPU <strong>4 Bytes</strong> fetch chesthundhi.<br>
          • <code>double*</code> dereference chesthe CPU <strong>8 Bytes</strong> fetch chesthundhi!
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Standard Example</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int number = 42;
    int *pointer = &amp;number;

    printf("Value of number:        %d\\n", number);
    printf("Address of number (&amp;):  %p\\n", (void *)&amp;number);
    printf("Address in pointer:     %p\\n", (void *)pointer);
    printf("Value through *pointer: %d\\n", *pointer);

    // In-place mutation via pointer dereferencing
    *pointer = 99;
    printf("\\nAfter (*pointer = 99):\\n");
    printf("Original number is now: %d\\n", number);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. The Deadly Trinity of Pointers -->
    <div class="section-title"><span class="num">3</span>The Deadly Trinity: Null, Wild &amp; Dangling Pointers ⚠️</div>
    <div class="section-body">
      <p class="text-prose">
        Software history loni million-dollar security crashes and memory corruption bugs ee 3 pointer types valla jaruguthayi:
      </p>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">1. Wild Pointer (Uninitialized Pointer)</h4>
        <p>Oka pointer declare chesi elanti address assign cheyyakapothe (<code>int* ptr;</code>), daanilo RAM loni random garbage memory address untundhi. Daanini dereference chesthe (<code>*ptr = 10;</code>) random OS memory overwrite aypoyi system crash avthundhi!</p>
      </div>

      <div class="concept-box" style="border-left-color:#38bdf8; background:rgba(56, 189, 248, 0.06);">
        <h4 style="color:#38bdf8;">2. Null Pointer (<code>NULL</code> / <code>nullptr</code>)</h4>
        <p>Pointer currently e memory address ki point cheyyatledhu ani theliyajeyyadaniki <strong><code>NULL</code></strong> (Address <code>0x0</code>) assign chesthamu. Attempting to dereference a NULL pointer triggers an immediate <strong>Segmentation Fault</strong> by OS hardware memory protection!<br>
        ✅ <strong>Defensive Rule:</strong> Always check <code>if (ptr != NULL)</code> before dereferencing!</p>
      </div>

      <div class="concept-box" style="border-left-color:#f59e0b; background:rgba(245, 158, 11, 0.06);">
        <h4 style="color:#f59e0b;">3. Dangling Pointer (Dead Memory Reference)</h4>
        <p>Oka pointer point chesthunna memory block deallocate (e.g. <code>free(ptr)</code>) ayina taruvatha or function stack frame pop ayina taruvatha, aa pointer inka aa dead memory address ne hold chesthe daanini <strong>Dangling Pointer</strong> antamu.<br>
        ✅ <strong>Fix:</strong> Set <code>ptr = NULL;</code> immediately after calling <code>free(ptr)</code>!</p>
      </div>
    </div>

    <!-- 4. Why Cast to (void*) When Printing with %p -->
    <div class="section-title"><span class="num">4</span>Why Must We Cast to (void*) When Printing With %p?</div>
    <div class="section-body">
      <p class="text-prose">
        Standard C (ISO C99 / C11 / C17 §7.21.6.1) specifies that the <code>%p</code> format specifier expects an argument of type <strong><code>void*</code></strong>. 
        On some specialized hardware CPU architectures (like segmented memory DSPs or non-flat memory address spaces), different pointer types (e.g. function pointers vs data pointers) might have different binary representations. 
        Casting explicitly via <code>(void*)&amp;variable</code> guarantees 100% standard compliance and eliminates compiler warnings across all platforms.
      </p>
    </div>

    <!-- 5. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">5</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What is the difference between <code>int *p</code> and <code>int* p</code>?</h4>
          <p>There is absolutely zero difference to the compiler. However, beware of multiple declarations: <code>int* p1, p2;</code> creates <code>p1</code> as a pointer (<code>int*</code>) and <code>p2</code> as a regular integer (<code>int</code>)! To make both pointers, write <code>int *p1, *p2;</code>.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: What is the size of a pointer in C?</h4>
          <p>Pointer size depends strictly on the computer architecture: <strong>4 Bytes on 32-bit CPU systems</strong> (address space up to 4GB) and <strong>8 Bytes on 64-bit CPU systems</strong> (address space up to 16 Exabytes), regardless of the underlying data type it points to.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Why does dereferencing NULL crash the program?</h4>
          <p>Virtual memory page 0 (Address <code>0x00000000</code>) is deliberately mapped as an unallocated, protected page by the Operating System kernel. Any attempt to read/write to page 0 triggers a CPU hardware memory interrupt trap, instantly terminating the process with a Segmentation Fault.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Pointer Dereferencing in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this pointer address tracking demo in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    double price = 199.99;
    double *pPrice = &amp;price;

    printf("Original: %.2f\\n", *pPrice);
    *pPrice += 50.0;
    printf("Updated:  %.2f (RAM Addr: %p)\\n", price, (void*)pPrice);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 21, "Phase 09", "Pointers & Memory Architecture", subtopics, contentBody, '20-c-string-algorithms-and-text-processing-projects.html', '20. String Algorithms & 6 Text Projects', '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html', '22. Pointer Arithmetic, Arrays & const Qualifiers');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 22: Pointer Arithmetic, Arrays & const Qualifiers ────────
function buildLesson22() {
  const title = "C Pointer Arithmetic, Arrays, String Iteration & const Qualifiers";
  const desc = "Comprehensive textbook-grade masterclass on C Pointer Manipulation (Phase 9 Part 2): The Pointer Arithmetic Scaling Rule (sizeof stride), pointer subtraction (ptrdiff_t), pointers and 1D/2D arrays, string pointer traversal, the 3 degrees of const with pointers, and generic void* pointers.";
  const filename = "22-c-pointer-arithmetic-arrays-and-const-qualifiers.html";
  const subtopics = "Pointer Arithmetic & Scaling Rule · Pointers and 1D/2D Arrays · Pointers & String Iteration · 3 Degrees of const with Pointers · Generic void* Pointers";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 9 (Chapter 22): C Pointer Arithmetic, Arrays, String Traversal & const Qualifiers Masterclass</strong>! Once you understand that pointers hold memory addresses, the real engineering power comes from performing mathematical arithmetic directly on those addresses. Unlike standard integer math where <code>100 + 1 = 101</code>, <strong>Pointer Arithmetic is automatically scaled by the size of the underlying data type in physical RAM</strong>. In this exhaustive textbook-grade guide, you will master the Pointer Scaling Rule, explore the deep architectural equivalence between arrays and pointers, learn how pointers traverse strings at lightning speed, master the 3 degrees of <code>const</code> pointer qualifiers, and understand generic <code>void*</code> pointers.</p>
    </div>

    <!-- 1. Pointer Arithmetic & The Scaling Rule -->
    <div class="section-title"><span class="num">1</span>Pointer Arithmetic &amp; The Hardware Scaling Rule ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        When you add an integer $N$ to a pointer (<code>ptr + N</code>), the CPU does NOT add $N$ raw bytes. 
        Instead, it adds <strong>$N \\times \\text{sizeof(*ptr)}$ Bytes</strong>:
      </p>

      <div class="concept-box">
        <h4>📐 The Core Pointer Arithmetic Formula:</h4>
        <p>$$\\text{New Address} = \\text{Current Address} + (N \\times \\text{sizeof(Type)})$$<br>
        • For <code>char*</code> (1 Byte): <code>0x1000 + 1</code> $\\rightarrow$ <strong>0x1001</strong> (jumps 1 byte).<br>
        • For <code>int*</code> (4 Bytes): <code>0x1000 + 1</code> $\\rightarrow$ <strong>0x1004</strong> (jumps 4 bytes).<br>
        • For <code>double*</code> (8 Bytes): <code>0x1000 + 1</code> $\\rightarrow$ <strong>0x1008</strong> (jumps 8 bytes)!<br>
        <br>
        💡 <em>Pointer Subtraction:</em> Subtracting two pointers of the same type (<code>ptr2 - ptr1</code>) yields the <strong>Exact number of elements between them</strong> (type <code>ptrdiff_t</code>), NOT the raw byte count!</p>
      </div>

      <div class="memory-diagram">
        <strong>Hardware Pointer Arithmetic Scaling for: int arr[3] = {10, 20, 30}; int* p = arr;</strong><br>
        <br>
        p:          0x5000 (Points to arr[0] = 10)<br>
        p + 1:      0x5000 + (1 * 4) = 0x5004 (Points to arr[1] = 20)<br>
        p + 2:      0x5000 + (2 * 4) = 0x5008 (Points to arr[2] = 30)<br>
        <br>
        *(p + 1) dereferences value at 0x5004 -&gt; yields 20!
      </div>
    </div>

    <!-- 2. Deep Equivalence: Pointers and Arrays -->
    <div class="section-title"><span class="num">2</span>Deep Equivalence: Pointers and Arrays in C</div>
    <div class="section-body">
      <p class="text-prose">
        In C, array bracket notation is purely syntactic sugar for pointer arithmetic! Under the hood:
      </p>

      <div class="deep-dive-card">
        <h3>🔍 The Universal Array-Pointer Identity</h3>
        <p style="color:var(--text2); font-size:15px; line-height:1.8;">
          $$\\mathbf{arr[i] \\equiv *(arr + i) \\equiv *(i + arr) \\equiv i[arr]}$$<br>
          Because addition is commutative ($a + b = b + a$), in C writing <code>3[arr]</code> is 100% valid syntax and produces the exact same result as <code>arr[3]</code>!
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointer Arithmetic & String Traversal Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Lightning-fast string length using pointer subtraction
size_t fastStrLen(const char *s) {
    const char *p = s;
    while (*p) p++; // Advances pointer until null terminator '\0'
    return p - s;   // Pointer subtraction yields character count!
}

int main(void) {
    int numbers[] = {10, 20, 30, 40, 50};
    int *ptr = numbers;

    printf("First element via *ptr:     %d\\n", *ptr);
    printf("Third element via *(ptr+2): %d\\n", *(ptr + 2));

    const char message[] = "Dennis Ritchie";
    printf("Length of '%s' = %zu chars\\n", message, fastStrLen(message));

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. The 3 Degrees of const with Pointers -->
    <div class="section-title"><span class="num">3</span>The 3 Degrees of const with Pointers ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        Placing the <code>const</code> keyword relative to the asterisk <code>*</code> creates 3 fundamentally different memory safety rules:
      </p>

      <table class="tbl spec-table">
        <tr><th>Declaration Syntax</th><th>What is Constant?</th><th>Can Modify Value (<code>*ptr = x</code>)?</th><th>Can Redirect Pointer (<code>ptr = &amp;y</code>)?</th></tr>
        <tr>
          <td><code>const int* ptr;</code></td>
          <td><strong>Data Pointed To</strong></td>
          <td>❌ <strong>NO (Read-Only Data)</strong></td>
          <td>✅ <strong>YES</strong></td>
        </tr>
        <tr>
          <td><code>int* const ptr;</code></td>
          <td><strong>Pointer Address Itself</strong></td>
          <td>✅ <strong>YES</strong></td>
          <td>❌ <strong>NO (Locked Address)</strong></td>
        </tr>
        <tr>
          <td><code>const int* const ptr;</code></td>
          <td><strong>Both Data and Address</strong></td>
          <td>❌ <strong>NO</strong></td>
          <td>❌ <strong>NO (Completely Locked)</strong></td>
        </tr>
      </table>

      <div class="concept-box">
        <h4>💡 The Clockwise/Spiral Reading Rule:</h4>
        <p>• <code>const int *p</code> $\rightarrow$ Read right-to-left: "<code>p</code> is a pointer to an <code>int</code> that is <code>const</code>".<br>
        • <code>int * const p</code> $\rightarrow$ "<code>p</code> is a <code>const</code> pointer to an <code>int</code>".</p>
      </div>
    </div>

    <!-- 4. Generic Pointers: void* -->
    <div class="section-title"><span class="num">4</span>Generic Pointers: void* &amp; Type Erasure</div>
    <div class="section-body">
      <p class="text-prose">
        A <strong><code>void*</code></strong> pointer (Generic Pointer) can hold the memory address of <em>any data type</em> (int, float, struct, array) without explicit type casting. 
        It powers generic system functions like <code>malloc()</code>, <code>memcpy()</code>, and <code>qsort()</code>.
      </p>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The Two Rules of void* Pointers:</h4>
        <p>1. <strong>Cannot Dereference Directly:</strong> <code>*voidPtr</code> is a compile error because the compiler does not know whether to fetch 1, 4, or 8 bytes!<br>
        2. <strong>Cannot Perform Pointer Arithmetic:</strong> <code>voidPtr + 1</code> is undefined in ISO C (though GCC allows it as an extension treating it as 1 byte).<br>
        ✅ <strong>Solution:</strong> Always cast to a concrete type first: <code>*(int*)voidPtr</code>.</p>
      </div>
    </div>

    <!-- 5. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">5</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Why is <code>*p++</code> different from <code>(*p)++</code>?</h4>
          <p>Postfix <code>++</code> has higher precedence than dereference <code>*</code>. <code>*p++</code> yields the current value and then advances the pointer to the next memory address. <code>(*p)++</code> increments the value stored at the current memory address without moving the pointer.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Can we add two pointers together (<code>ptr1 + ptr2</code>)?</h4>
          <p>No! Adding two memory addresses is mathematically meaningless in computer architecture and is strictly illegal in C. You can only subtract two pointers (to find the distance between them) or add an integer offset to a pointer.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test const Pointers in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this generic byte inspection demo in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void printHexBytes(const void *ptr, size_t numBytes) {
    const unsigned char *bytePtr = (const unsigned char*)ptr;
    for (size_t i = 0; i &lt; numBytes; i++) {
        printf("0x%02X ", bytePtr[i]);
    }
    printf("\\n");
}

int main(void) {
    int val = 0x12345678;
    printf("Raw RAM bytes of 0x12345678 (Little Endian):\\n");
    printHexBytes(&amp;val, sizeof(val));
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 22, "Phase 09", "Pointers & Memory Architecture", subtopics, contentBody, '21-c-pointers-memory-addresses-and-dereferencing.html', '21. Pointers, RAM Addresses & Dereferencing', '23-c-double-pointers-function-pointers-and-safety.html', '23. Double Pointers, Function Pointers & Safety');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 23: Double Pointers, Function Pointers & Safety ──────────
function buildLesson23() {
  const title = "C Double Pointers (int**), Function Pointers (Callbacks) & Pointer Safety";
  const desc = "Comprehensive textbook-grade masterclass on Advanced C Pointers (Phase 9 Part 3): Pointer to Pointer (int**) architecture, modifying pointer addresses across functions, Function Pointers syntax and callback systems, the 5 Golden Pointer Safety Commandments, and common pointer pitfalls.";
  const filename = "23-c-double-pointers-function-pointers-and-safety.html";
  const subtopics = "Double Pointers (int**) · Dynamic Pointer Reallocation · Function Pointers & Callbacks · 5 Golden Pointer Safety Commandments · Common Traps";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 9 (Chapter 23): Advanced C Pointers — Double Pointers, Function Pointers & Pointer Safety Masterclass</strong>! Once you have mastered single pointers, advanced systems software engineering requires manipulating pointers themselves and treating executable code instructions as first-class memory addresses. <strong>Double Pointers (<code>Type**</code>)</strong> allow functions to modify caller pointer addresses and construct dynamic 2D matrices, while <strong>Function Pointers</strong> enable event-driven callback architectures, pluggable algorithm strategies, and object-oriented polymorphism in pure C. In this comprehensive textbook-grade guide, you will master multi-level indirection, explore callback architecture, and memorize the 5 Golden Commandments of pointer safety.</p>
    </div>

    <!-- 1. Pointer to Pointer (Double Pointers) -->
    <div class="section-title"><span class="num">1</span>Pointer to Pointer (Double Pointers: int**) Explained</div>
    <div class="section-body">
      <p class="text-prose">
        A <strong>Double Pointer</strong> is a variable that stores the <strong>Memory Address of another Pointer Variable</strong>:
      </p>

      <div class="memory-diagram">
        <strong>Two-Level Indirection RAM Architecture:</strong><br>
        <br>
        RAM Address:       0x1000                0x2000                0x3000<br>
                           ┌──────────────┐      ┌──────────────┐      ┌──────────────┐<br>
        Stored Content:    │     100      │ &lt;─── │    0x1000    │ &lt;─── │    0x2000    │<br>
                           └──────────────┘      └──────────────┘      └──────────────┘<br>
        Variable:                val                   ptr                 ptrToPtr<br>
        Type:                    int                  int*                  int**<br>
        <br>
        • *ptrToPtr  yields 0x1000 (the address of val).<br>
        • **ptrToPtr yields 100 (the actual value of val)!
      </div>

      <div class="concept-box">
        <h4>⚡ Why Do We Need Double Pointers in Real Software?</h4>
        <p>1. <strong>Modifying Pointer Addresses in Functions:</strong> If a function needs to allocate or redirect a caller's pointer (e.g. <code>allocateBuffer(&amp;ptr, size)</code>), passing <code>int*</code> by value only copies the address. Passing <code>int**</code> allows mutating the caller's pointer directly!<br>
        2. <strong>Dynamic 2D Matrices:</strong> Array of pointers to dynamically allocated row buffers (<code>int** matrix</code>).</p>
      </div>
    </div>

    <!-- 2. Function Pointers & Callbacks -->
    <div class="section-title"><span class="num">2</span>Function Pointers &amp; Event-Driven Callbacks ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        In compiled C binaries, functions reside in the <strong>Code (Text) Segment</strong> of RAM. 
        Just like variables, <strong>Every Function Has an Exact RAM Memory Address</strong> (the entry point of its machine instructions)!
      </p>

      <div class="concept-box">
        <h4>📐 Function Pointer Syntax Blueprint:</h4>
        <p>$$\\mathbf{Return\\_Type\\; (*Pointer\\_Name)(Param\\_Types);}$$<br>
        • <em>Example:</em> <code>int (*operation)(int, int);</code> declares a function pointer that can point to any function accepting two <code>int</code>s and returning an <code>int</code> (like <code>add</code> or <code>multiply</code>)!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Double Pointers & Function Pointer Callbacks</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Mathematical Operations
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

// Higher-Order Callback Function: accepts a function pointer!
void executeMath(int x, int y, int (*operation)(int, int)) {
    int result = operation(x, y);
    printf("Computed Result: %d\\n", result);
}

// Double pointer memory modification demo
void redirectPointer(int **pp, int *newTarget) {
    *pp = newTarget; // Modifies the caller's pointer address!
}

int main(void) {
    int a = 10, b = 20;

    printf("1. Calling with add callback:      ");
    executeMath(a, b, add);

    printf("2. Calling with multiply callback: ");
    executeMath(a, b, multiply);

    // Double Pointer Demonstration
    int val1 = 50, val2 = 999;
    int *p = &amp;val1;
    printf("\\nBefore redirect: *p = %d (points to val1)\\n", *p);

    redirectPointer(&amp;p, &amp;val2);
    printf("After redirect:  *p = %d (points to val2!)\\n", *p);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. The 5 Golden Commandments of Pointer Safety -->
    <div class="section-title"><span class="num">3</span>The 5 Golden Commandments of C Pointer Safety 🛡️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#10b981;">
        <h4 style="color:#10b981;">📜 The 5 Absolute Rules Every C Developer Must Follow:</h4>
        <p>
          1. <strong>Initialize Every Pointer Immediately:</strong> Never leave a pointer uninitialized (Wild Pointer). If you don't have an address yet, assign <code>int *ptr = NULL;</code>.<br>
          2. <strong>Always Validate Before Dereference:</strong> Guard every pointer access with <code>if (ptr != NULL)</code>.<br>
          3. <strong>Never Dereference Freed Memory:</strong> Once you call <code>free(ptr)</code>, immediately set <code>ptr = NULL;</code> to eliminate dangling pointers.<br>
          4. <strong>Never Return Addresses of Local Stack Variables:</strong> Returning a pointer to a stack-allocated variable triggers fatal memory corruption.<br>
          5. <strong>Cast to <code>(void*)</code> When Printing Addresses:</strong> Always use <code>printf("%p", (void*)ptr);</code> for standard compliance.
        </p>
      </div>
    </div>

    <!-- 4. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">4</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Why are parentheses mandatory in <code>int (*fp)(int)</code>?</h4>
          <p>Without parentheses, <code>int *fp(int);</code> declares a function named <code>fp</code> that returns a pointer to an integer (<code>int*</code>). The parentheses <code>(*fp)</code> bind the asterisk to the identifier, declaring a pointer to a function.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: How do function pointers enable Object-Oriented Programming (OOP) in C?</h4>
          <p>In C structures, you can embed function pointers as "methods" (e.g. <code>struct Button { void (*onClick)(void); };</code>). This is the exact mechanism used by the Linux Kernel (VFS file operations) and the COM/GTK architectures to achieve polymorphism.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Function Pointers in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this modular math dispatcher in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int square(int x) { return x * x; }
int cube(int x) { return x * x * x; }

int main(void) {
    int (*dispatcher[2])(int) = {square, cube};
    printf("Square of 5 = %d\\n", dispatcher[0](5));
    printf("Cube of 5   = %d\\n", dispatcher[1](5));
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 23, "Phase 09", "Pointers & Memory Architecture", subtopics, contentBody, '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html', '22. Pointer Arithmetic, Arrays & const Qualifiers', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── UPDATE LESSON 20 to link to Lesson 21 ─────────────────────────────────
function updateLesson20() {
  const file20 = path.join(cDir, '20-c-string-algorithms-and-text-processing-projects.html');
  const title = "C String Algorithms & 6 Production Text Processing Projects";
  const desc = "Comprehensive algorithmic masterclass on C String Processing (Phase 8 Part 3): In-place two-pointer string reversal, Case-insensitive Palindrome checker, Finite State Machine Word Counter, ASCII 256 Character Frequency Map, Production Username Validator, and Full Text Analyzer Engine.";
  const subtopics = "Two-Pointer String Reversal · Palindrome Checker · State Machine Word Counter · ASCII Frequency Array · Username Validator · Text Analyzer";

  const currentContent = fs.readFileSync(file20, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '20-c-string-algorithms-and-text-processing-projects.html', 20, "Phase 08", "Strings & Text Processing", subtopics, contentBody, '19-c-string-library-functions-and-security.html', '19. <string.h> Functions & Buffer Security', '21-c-pointers-memory-addresses-and-dereferencing.html', '21. Pointers, RAM Addresses & Dereferencing');
  fs.writeFileSync(file20, html, 'utf8');
  console.log('✅ Updated 20-c-string-algorithms-and-text-processing-projects.html next links!');
}

// Clean author block from all C HTML files
function cleanAuthorBlockFromAllFiles() {
  const files = fs.readdirSync(cDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(cDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    html = html.replace(/<div class="author">[\s\S]*?<\/div>\s*<\/div>/gi, '');
    html = html.replace(/<div class="author">[\s\S]*?<\/div>/gi, '');
    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`✅ Removed author block from all ${files.length} C lesson files!`);
}

// Update all sidebar links across all 23 C lesson files
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
    '10-c-functions-declaration-definition-and-prototypes.html',
    '11-c-variable-scope-lifetime-and-static-storage.html',
    '12-c-parameter-passing-value-vs-reference.html',
    '13-c-recursion-call-stack-and-modular-projects.html',
    '14-c-arrays-fundamentals-memory-model-and-indexing.html',
    '15-c-multidimensional-arrays-and-matrices.html',
    '16-c-passing-arrays-to-functions-and-pointer-decay.html',
    '17-c-array-algorithms-searching-sorting-and-manipulation.html',
    '18-c-strings-null-terminator-and-safe-io.html',
    '19-c-string-library-functions-and-security.html',
    '20-c-string-algorithms-and-text-processing-projects.html',
    '21-c-pointers-memory-addresses-and-dereferencing.html',
    '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html',
    '23-c-double-pointers-function-pointers-and-safety.html'
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, loops, modular functions, arrays, strings, and pointers with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c functions, c arrays, c strings, c pointers" />
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
      <span class="badge">🟢 23 Comprehensive Master Chapters Across 9 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Comprehensive Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, variables, scanf input, conditions, loops, functions, arrays, strings, or pointers:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-c/04-c-user-input-scanf-and-buffer-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: Input →</a>
        <a href="/blog-c/06-c-conditional-branching-if-else-and-logical-operators.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-c/08-c-loops-for-while-do-while-and-control-flow.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-c/10-c-functions-declaration-definition-and-prototypes.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 6: Functions →</a>
        <a href="/blog-c/14-c-arrays-fundamentals-memory-model-and-indexing.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 7: Arrays →</a>
        <a href="/blog-c/18-c-strings-null-terminator-and-safe-io.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 8: Strings →</a>
        <a href="/blog-c/21-c-pointers-memory-addresses-and-dereferencing.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 9: Pointers →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> Master Course Curriculum Roadmap</div>
    <div class="curriculum-roadmap-container">
${roadmapCardsHtml}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(cHomePath, html, 'utf8');
  console.log('✅ Updated public/blog-c.html with 23 Chapters across 9 Phases!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 9 (Pointers & Memory Architecture - Massive Content)...');
  buildLesson21();
  buildLesson22();
  buildLesson23();
  updateLesson20();
  cleanAuthorBlockFromAllFiles();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 9 successfully created with massive textbook-grade content density!');
}

run();
