const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 10 (26 Chapters!)
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
  },
  {
    id: 'phase10', tag: 'Phase 10', title: 'Pointers and Functions', icon: '⚙️',
    desc: 'Exhaustive 3-chapter masterclass on Pointers and Functions in C: Passing normal values vs passing addresses, mutating caller variables in RAM, the canonical swap algorithm, returning pointers safely (Heap vs Stack pitfall), passing arrays and strings with const pointer safety, function pointer parameters, and callback architectures.',
    lessons: [
      { num: 24, file: '24-c-pointers-and-functions-call-by-reference.html', title: '24. Passing Addresses, Swapping & Returning Pointers', subtopics: 'Pass-by-Value vs Pass-by-Address · Mutating Caller Memory · Swap Algorithm & Stack Lifecycle · Returning Pointers Safely · Dangling Stack Traps' },
      { num: 25, file: '25-c-pointer-parameters-arrays-and-const-protection.html', title: '25. Array/String Pointer Parameters & const Safety', subtopics: 'Passing 1D/2D Arrays to Functions · Passing Strings (char* vs const char*) · const Pointer Parameters · Returning Multiple Values via Output Pointers' },
      { num: 26, file: '26-c-function-pointers-callbacks-and-event-systems.html', title: '26. Function Pointers, Callbacks & Event Systems', subtopics: 'Function Pointer Parameters · Callback Architecture · Custom Sorting Comparators · Predicate Filters · Jump Tables & State Machines' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, c pointers and functions, swap in c, passing addresses c, callbacks c, function pointers c" />
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
      const currentTheme = localStorage.getItem('theme') || 'light';
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

// ── BUILD LESSON 24: Passing Addresses, Swapping & Returning Pointers ──────
function buildLesson24() {
  const title = "C Pointers & Functions: Passing Addresses, Mutating Caller RAM (తెలుగులో)";
  const desc = "C Pointers & Functions (Phase 10 Part 1): ఫంక్షన్స్ కి మామూలుగా వేరియబుల్స్ కి బదులు అడ్రస్ లు ఎందుకు పంపిస్తారు, Swap ఫంక్షన్ అసలు ఎలా పనిచేస్తుంది, మరియు ఫంక్షన్ నుండి పాయింటర్స్ ని ఎలా సేఫ్ గా రిటర్న్ చేయాలో తెలుగులో నేర్చుకుందాం.";
  const filename = "24-c-pointers-and-functions-call-by-reference.html";
  const subtopics = "Pass-by-Value vs Pass-by-Address · Mutating Caller Memory · Swap Algorithm & Stack Lifecycle · Returning Pointers Safely · Dangling Stack Traps";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 10 (Chapter 24): C Pointers & Functions Masterclass</strong> కు స్వాగతం! C లో మామూలుగా ఒక ఫంక్షన్ కి వాల్యూస్ పంపిస్తే (Pass-by-Value), అది ఒరిజినల్ వాల్యూస్ ని టచ్ చేయలేదు, కేవలం వాటి డూప్లికేట్ కాపీలతో మాత్రమే పనిచేస్తుంది. కానీ <strong>పాయింటర్స్ వాడితే మనం ఒరిజినల్ డేటా నే డైరెక్ట్ గా మార్చేయొచ్చు!</strong> ఈ గైడ్ లో, ఫంక్షన్స్ కి వాల్యూ కి బదులు అడ్రస్ పంపిస్తే (Pass-by-Address) లోపల ఏం జరుగుతుంది, రెండు వాల్యూస్ ని మార్చే Swap లాజిక్ RAM లో ఎలా రన్ అవుతుంది, మరియు ఒక ఫంక్షన్ లోపల క్రియేట్ చేసిన పాయింటర్ ని బయటకి రిటర్న్ చేస్తే వచ్చే డేంజర్ ఏంటి, దాన్ని సేఫ్ గా ఎలా రిటర్న్ చేయాలో తెలుగులో నేర్చుకుందాం.</p>
    </div>

    <!-- 1. Pass-by-Value vs Pass-by-Address Architecture -->
    <div class="section-title"><span class="num">1</span>Pass-by-Value vs Pass-by-Address అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        C కంపైలర్ లో ప్రతి ఫంక్షన్ కి దాని సొంత ప్రైవేట్ మెమరీ (Stack Frame) ఉంటుంది. ఒక ఫంక్షన్ మెమరీని ఇంకో ఫంక్షన్ టచ్ చేయలేదు:
      </p>

      <table class="tbl spec-table">
        <tr><th>పద్ధతి (Mechanism)</th><th>ఫంక్షన్ లోపలికి ఏం వెళ్తుంది?</th><th>మెమరీలో ఏం జరుగుతుంది?</th><th>ఒరిజినల్ డేటా మారుతుందా?</th></tr>
        <tr>
          <td><strong>Pass by Value</strong></td>
          <td>కేవలం డేటా యొక్క <strong>డూప్లికేట్ కాపీ</strong> మాత్రమే వెళ్తుంది.</td>
          <td>కొత్త వేరియబుల్ క్రియేట్ అవుతుంది, ఫంక్షన్ అవ్వగానే డిలీట్ అవుతుంది.</td>
          <td>❌ <strong>మారదు.</strong> ఒరిజినల్ వేరియబుల్స్ కి ఏమీ కాదు.</td>
        </tr>
        <tr>
          <td><strong>Pass by Address</strong></td>
          <td>ఒరిజినల్ వేరియబుల్ యొక్క <strong>అడ్రస్ (<code>&amp;var</code>)</strong> వెళ్తుంది.</td>
          <td>ఆ ఫంక్షన్ పాయింటర్, మన ఒరిజినల్ వేరియబుల్ అడ్రస్ నే పాయింట్ చేస్తుంది.</td>
          <td>✅ <strong>ఎస్ మారుతుంది!</strong> <code>*ptr</code> వాడి డైరెక్ట్ గా మన ఒరిజినల్ డేటాని మార్చేయొచ్చు!</td>
        </tr>
      </table>
    </div>

    <!-- 2. The Canonical Swap Algorithm & CPU Call Stack Walkthrough -->
    <div class="section-title"><span class="num">2</span>Swap ప్రోగ్రామ్ అసలు RAM లో ఎలా రన్ అవుతుంది? ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        అందరూ రాసే <code>swap(&amp;first, &amp;second)</code> రన్ అయినప్పుడు, అసలు RAM లోపల సీక్రెట్ గా ఏం జరుగుతుందో చూద్దాం:
      </p>

      <div class="memory-diagram">
        <strong>CPU Call Stack Lifecycle During swap(&amp;first, &amp;second):</strong><br>
        <br>
        1. [ main() Stack Frame (Base: 0x7FFF0000) ]<br>
           int first  = 10;  (RAM Address: 0x7FFF0000)<br>
           int second = 20;  (RAM Address: 0x7FFF0004)<br>
           │<br>
           │ Calls swap(&amp;first, &amp;second) -&gt; Passes 0x7FFF0000 and 0x7FFF0004<br>
           ▼<br>
        2. [ swap() Stack Frame (Base: 0x7FFEFFF0) ]<br>
           int* first  = 0x7FFF0000; (Pointer to main's first)<br>
           int* second = 0x7FFF0004; (Pointer to main's second)<br>
           int temporary = *first;   (temporary gets 10)<br>
           *first = *second;         (RAM at 0x7FFF0000 overwritten with 20!)<br>
           *second = temporary;      (RAM at 0x7FFF0004 overwritten with 10!)<br>
           │<br>
           ▼ swap() finishes and its Stack Frame is POPPED &amp; DESTROYED!<br>
        3. [ Back in main() ]<br>
           first is now 20 | second is now 10! (Successful In-Place Swap!)
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Standard Example (In-Place Swap)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Canonical In-Place Pointer Swap Function
void swap(int *first, int *second) {
    int temporary = *first;
    *first = *second;
    *second = temporary;
}

int main(void) {
    int first = 10;
    int second = 20;

    printf("Before swap: first = %d, second = %d\\n", first, second);

    // Passing physical RAM addresses of first and second
    swap(&amp;first, &amp;second);

    printf("After swap:  first = %d, second = %d\\n", first, second);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Returning Pointers Safely from Functions -->
    <div class="section-title"><span class="num">3</span>ఫంక్షన్ నుండి పాయింటర్ రిటర్న్ చేసేటప్పుడు డేంజర్ ☠️</div>
    <div class="section-body">
      <p class="text-prose">
        When a function returns a pointer (<code>Type* myFunc()</code>), what memory address is it returning?
      </p>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The Fatal Local Stack Pointer Return Trap:</h4>
        <p>
          <code>int* getBadPointer() { int localVal = 50; return &amp;localVal; }</code><br>
          • <code>localVal</code> lives on <code>getBadPointer()</code>'s Stack Frame.<br>
          • When the function returns, its stack frame is instantly <strong>deallocated</strong>!<br>
          • The returned pointer points to dead, reclaimed memory (<strong>Dangling Pointer</strong>). Calling any other function will overwrite that memory, corrupting your program!
        </p>
      </div>

      <div class="deep-dive-card">
        <h3>✅ పాయింటర్స్ ని సేఫ్ గా రిటర్న్ చేయడానికి 3 పద్ధతులు:</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          1. <strong>Caller-Provided Buffer (Safest &amp; Most Common):</strong> Caller allocates the memory and passes the pointer to the function to populate: <code>void fillData(int *outBuf, int size);</code><br>
          2. <strong>Dynamic Heap Memory (<code>malloc</code>):</strong> Heap memory allocated via <code>malloc()</code> persists across function returns until explicitly released via <code>free()</code>.<br>
          3. <strong>Static Local Variable (<code>static</code>):</strong> Declaring <code>static int data[10];</code> places the buffer in the permanent Data Segment which lives for the entire program runtime.
        </p>
      </div>
    </div>

    <!-- 4. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">4</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Why does C not have true Pass-by-Reference like C++?</h4>
          <p>C strictly supports only Pass-by-Value. In C, "Pass-by-Reference" is simulated by passing the <em>value of a memory address</em> (pointer). The pointer variable itself is copied by value onto the callee's stack frame!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Can a function return a pointer passed to it as an argument?</h4>
          <p>Yes! If the memory was allocated by the caller or exists on the heap, returning that same pointer (or an offset like <code>return ptr + 5;</code>) is 100% safe because the underlying memory lifetime exceeds the helper function.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test In-Place Swapping in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this floating-point coordinate swapper in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void swapDouble(double *a, double *b) {
    double temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    double x = 3.14, y = 9.99;
    swapDouble(&amp;x, &amp;y);
    printf("x = %.2f, y = %.2f\\n", x, y);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 24, "Phase 10", "Pointers and Functions", subtopics, contentBody, '23-c-double-pointers-function-pointers-and-safety.html', '23. Double Pointers, Function Pointers & Safety', '25-c-pointer-parameters-arrays-and-const-protection.html', '25. Array/String Pointer Parameters & const Safety');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 25: Array/String Pointer Parameters & const Safety ───────
function buildLesson25() {
  const title = "C Pointer Parameters: Passing Arrays, Strings & const (తెలుగులో)";
  const desc = "C Pointer Parameters (Phase 10 Part 2): Arrays మరియు Strings ని ఫంక్షన్స్ కి ఎలా పాస్ చేయాలి, const వాడి మన డేటాని వేరే వాళ్ళు మార్చకుండా ఎలా కాపాడుకోవాలి, ఒక ఫంక్షన్ నుండి 2, 3 ఆన్సర్స్ ఒకేసారి ఎలా రిటర్న్ చేయాలో తెలుగులో నేర్చుకుందాం.";
  const filename = "25-c-pointer-parameters-arrays-and-const-protection.html";
  const subtopics = "Passing 1D/2D Arrays to Functions · Passing Strings (char* vs const char*) · const Pointer Parameters · Returning Multiple Values via Output Pointers";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 10 (Chapter 25): Arrays, Strings & const Pointers Masterclass</strong> కు స్వాగతం! ఒక లక్ష నంబర్స్ ఉన్న Array ని ఫంక్షన్ కి పంపించాలంటే, పాయింటర్స్ లేకపోతే కంపైలర్ ఆ లక్ష నంబర్స్ ని డూప్లికేట్ చేసి టైం మరియు మెమరీ వేస్ట్ చేస్తుంది. కానీ పాయింటర్స్ వాడితే, జస్ట్ ఆ Array అడ్రస్ ఇస్తే సరిపోతుంది. కానీ ఇలా అడ్రస్ ఇవ్వడం వల్ల వాళ్ళు మన డేటాని మార్చే ఛాన్స్ ఉంది. ఈ గైడ్ లో, మన డేటాని సేఫ్ గా <code>const</code> వాడి ఎలా పంపించాలి, మరియు మామూలుగా ఫంక్షన్ ఒకే వాల్యూ రిటర్న్ చేస్తుంది కదా.. అలా కాకుండా పాయింటర్స్ వాడి ఒకేసారి 3, 4 వాల్యూస్ ఎలా రిటర్న్ చేయాలో (Output Parameters) తెలుగులో నేర్చుకుందాం.</p>
    </div>

    <!-- 1. Passing Strings: Mutable char* vs Read-Only const char* -->
    <div class="section-title"><span class="num">1</span>Strings ని పంపించడం: char* కి const char* కి తేడా?</div>
    <div class="section-body">
      <p class="text-prose">
        ఒక పదాన్ని (String ని) ఫంక్షన్ కి పంపించేటప్పుడు, మనం <code>const</code> వాడాలా వద్దా అనేది ఈ క్రింది విధంగా డిసైడ్ చేసుకోవాలి:
      </p>

      <table class="tbl spec-table">
        <tr><th>ఫంక్షన్ లో ఎలా రాస్తాం?</th><th>దీని పర్పస్ ఏంటి?</th><th>మనం పంపిన పదాన్ని మార్చగలదా?</th><th>ఎప్పుడు వాడతారు?</th></tr>
        <tr>
          <td><code>void process(char* str)</code></td>
          <td><strong>మార్చడానికి:</strong> పదాన్ని మోడిఫై చేస్తుంది.</td>
          <td>✅ <strong>ఎస్ మార్చగలదు</strong></td>
          <td>పదాన్ని రివర్స్ చేయడానికి, కాపిటల్ లెటర్స్ లోకి మార్చడానికి</td>
        </tr>
        <tr>
          <td><code>void inspect(const char* str)</code></td>
          <td><strong>Inspector:</strong> Read-only parsing/searching.</td>
          <td>❌ <strong>NO (Compiler Protected)</strong></td>
          <td><code>strlen()</code>, <code>strcmp()</code>, <code>print()</code></td>
        </tr>
      </table>
    </div>

    <!-- 2. Returning Multiple Values via Output Pointers -->
    <div class="section-title"><span class="num">2</span>ఫంక్షన్ నుండి ఒకేసారి 3, 4 ఆన్సర్స్ ఎలా రిటర్న్ చేయాలి? ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        In C, the <code>return</code> statement can only send back a single primitive value. 
        How can a function compute and return <strong>Minimum, Maximum, and Average</strong> in a single execution pass? 
        By using <strong>Output Pointer Parameters</strong>:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Output Pointer Parameters (Multiple Return Values)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Function returns 3 outputs simultaneously via pointer parameters!
void getArrayStats(const int *arr, int size, int *minOut, int *maxOut, double *avgOut) {
    int min = arr[0], max = arr[0], sum = 0;

    for (int i = 0; i &lt; size; i++) {
        if (arr[i] &lt; min) min = arr[i];
        if (arr[i] &gt; max) max = arr[i];
        sum += arr[i];
    }

    // Populating caller's RAM memory slots via pointer dereferencing!
    *minOut = min;
    *maxOut = max;
    *avgOut = (double)sum / size;
}

int main(void) {
    int grades[] = {88, 92, 79, 95, 84};
    int size = sizeof(grades) / sizeof(grades[0]);

    int minGrade, maxGrade;
    double avgGrade;

    // Passing addresses &minGrade, &maxGrade, &avgGrade
    getArrayStats(grades, size, &amp;minGrade, &amp;maxGrade, &amp;avgGrade);

    printf("Minimum: %d | Maximum: %d | Average: %.2f\\n", minGrade, maxGrade, avgGrade);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">3</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Why should all read-only pointer parameters use <code>const</code>?</h4>
          <p>1. <strong>Memory Safety:</strong> It prevents accidental assignment bugs.<br>2. <strong>Compatibility:</strong> It allows passing string literals (which live in read-only memory) without compiler warnings.<br>3. <strong>Compiler Optimization:</strong> It enables the compiler to optimize register caching knowing the underlying memory will not mutate.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: What is the difference between <code>const int *p</code> and <code>int * const p</code> as function parameters?</h4>
          <p><code>const int *p</code> protects the <em>caller's data</em> from being modified. <code>int * const p</code> prevents the local pointer variable from being reassigned to another address inside the function.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Output Pointers in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this quotient and remainder calculator in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void divide(int dividend, int divisor, int *quotient, int *remainder) {
    if (divisor != 0) {
        *quotient = dividend / divisor;
        *remainder = dividend % divisor;
    }
}

int main(void) {
    int q, r;
    divide(29, 5, &amp;q, &amp;r);
    printf("29 / 5 = %d (Remainder: %d)\\n", q, r);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 25, "Phase 10", "Pointers and Functions", subtopics, contentBody, '24-c-pointers-and-functions-call-by-reference.html', '24. Passing Addresses, Swapping & Returning Pointers', '26-c-function-pointers-callbacks-and-event-systems.html', '26. Function Pointers, Callbacks & Event Systems');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 26: Function Pointers, Callbacks & Event Systems ──────────
function buildLesson26() {
  const title = "C Function Pointers, Callbacks & Event-Driven (తెలుగులో)";
  const desc = "C Function Pointers & Callbacks (Phase 10 Part 3): ఫంక్షన్ కి వేరియబుల్ లాగే ఇంకో ఫంక్షన్ ని ఆర్గ్యుమెంట్ గా ఎలా పంపాలి (Callbacks), qsort లో కస్టమ్ సార్టింగ్ ఎలా చేయాలి, మరియు Jump Tables వాడి ప్రోగ్రామ్ ని సూపర్ ఫాస్ట్ గా ఎలా రన్ చేయాలో తెలుగులో నేర్చుకుందాం.";
  const filename = "26-c-function-pointers-callbacks-and-event-systems.html";
  const subtopics = "Function Pointer Parameters · Callback Architecture · Custom Sorting Comparators · Predicate Filters · Jump Tables & State Machines";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 10 (Chapter 26): Function Callbacks & Architecture Masterclass</strong> కు స్వాగతం! జావాస్క్రిప్ట్ లాంటి అడ్వాన్స్డ్ లాంగ్వేజెస్ లో బటన్ నొక్కగానే ఒక ఫంక్షన్ ఆటోమేటిక్ గా రన్ అవుతుంది కదా (దాన్నే Callbacks అంటారు). మరి C లాంటి బేసిక్ లాంగ్వేజ్ లో అలా ఎలా చేస్తారు? అక్కడే మనకు <strong>Function Pointers</strong> వస్తాయి! ఒక ఫంక్షన్ కి వేరియబుల్ ని కాకుండా ఇంకో ఫంక్షన్ అడ్రస్ నే ఆర్గ్యుమెంట్ గా పంపించొచ్చు. ఈ గైడ్ లో, ఈ Callbacks ఎలా రన్ అవుతాయి, C లైబ్రరీలో ఉన్న <code>qsort</code> కి మన సొంత లాజిక్ ఎలా ఇవ్వాలి, మరియు పెద్ద పెద్ద <code>if-else</code> లు వాడకుండా Jump Tables వాడి సిస్టమ్స్ ని ఎలా ఫాస్ట్ చేయాలో తెలుగులో డీటెయిల్ గా నేర్చుకుందాం.</p>
    </div>

    <!-- 1. What is a Callback Function in C? -->
    <div class="section-title"><span class="num">1</span>Callback అంటే ఏంటి? ఇది ఎలా పనిచేస్తుంది?</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>Callback</strong> అంటే ఏం లేదు, ఒక ఫంక్షన్ లోకి ఇంకొక ఫంక్షన్ ని ఆర్గ్యుమెంట్ గా పంపించడం. ఆ మొదటి ఫంక్షన్ కి ఎప్పుడు అవసరమైతే అప్పుడు ఆ రెండో ఫంక్షన్ ని రన్ చేసుకుంటుంది (Call బ్యాక్ చేస్తుంది):
      </p>

      <div class="memory-diagram">
        <strong>Callback Execution Flow in RAM:</strong><br>
        <br>
        1. [ main() ] ── Passes Pointer to isEven() Function ──► [ filterArray() ]<br>
                                                                     │<br>
        2. [ filterArray() Loop ] ── Calls isEven(element) ─────────┘<br>
                                 ◄── Returns true/false<br>
        3. [ filterArray() ] ────── If true: Appends element to output buffer!
      </div>
    </div>

    <!-- 2. Generic Callback Filtering Engine -->
    <div class="section-title"><span class="num">2</span>మన సొంత Callback ఫిల్టర్ ని తయారు చేద్దాం ⭐</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Higher-Order Callback Engine Implementation</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

// Predicate Callbacks
bool isEven(int n) { return n % 2 == 0; }
bool isPositive(int n) { return n &gt; 0; }

// Generic Higher-Order Filter: accepts function pointer predicate!
void filterAndPrint(const int arr[], int size, bool (*predicate)(int), const char* label) {
    printf("%s: [ ", label);
    for (int i = 0; i &lt; size; i++) {
        if (predicate(arr[i])) {
            printf("%d ", arr[i]);
        }
    }
    printf("]\\n");
}

int main(void) {
    int numbers[] = {-10, 15, 22, -3, 40, 7, -8, 50};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    // Passing isEven callback
    filterAndPrint(numbers, size, isEven, "Even Numbers");

    // Passing isPositive callback
    filterAndPrint(numbers, size, isPositive, "Positive Numbers");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Jump Tables & Dispatchers -->
    <div class="section-title"><span class="num">3</span>Jump Tables: if-else కన్నా సూపర్ ఫాస్ట్!</div>
    <div class="section-body">
      <p class="text-prose">
        100 కండిషన్స్ ఉన్నప్పుడు <code>if-else</code> లేదా <code>switch</code> వాడితే చెక్ చేయడానికి చాలా టైం పడుతుంది. అందుకే ఆపరేటింగ్ సిస్టమ్స్ (OS) లో ఫంక్షన్ పాయింటర్స్ ని ఒక <strong>Array లో పెట్టి డైరెక్ట్ గా కాల్ చేస్తారు (దీన్నే Jump Table అంటారు)</strong>. దీనివల్ల 1 మిల్లీ సెకండ్ లోపే పని అయిపోతుంది:
      </p>

      <div class="concept-box">
        <h4>⚡ Jump Table Blueprint:</h4>
        <p><code>int (*operationTable[4])(int, int) = {add, subtract, multiply, divide};</code><br>
        Calling <code>operationTable[opcode](a, b)</code> jumps directly to the target CPU instruction address in a single clock cycle!</p>
      </div>
    </div>

    <!-- 4. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">4</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: How do we simplify complex function pointer syntax using <code>typedef</code>?</h4>
          <p>You can create a clean alias using: <code>typedef bool (*Predicate)(int);</code>. Now your function parameter simply becomes: <code>void filter(const int arr[], int size, Predicate pred);</code>, drastically improving code readability!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: How does the standard C <code>qsort()</code> function use callbacks?</h4>
          <p><code>qsort</code> is completely agnostic of what data type it sorts. It accepts a generic comparator callback: <code>int (*compar)(const void*, const void*)</code>. By returning negative, zero, or positive integers, your callback tells <code>qsort</code> how to order custom structs, strings, or numbers.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Callbacks in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this callback math engine in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int doubleVal(int x) { return x * 2; }
int tripleVal(int x) { return x * 3; }

void transform(int *arr, int size, int (*func)(int)) {
    for (int i = 0; i &lt; size; i++) arr[i] = func(arr[i]);
}

int main(void) {
    int data[] = {1, 2, 3, 4};
    transform(data, 4, doubleVal);
    for (int i = 0; i &lt; 4; i++) printf("%d ", data[i]);
    printf("\\n");
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 26, "Phase 10", "Pointers and Functions", subtopics, contentBody, '25-c-pointer-parameters-arrays-and-const-protection.html', '25. Array/String Pointer Parameters & const Safety', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── UPDATE LESSON 23 to link to Lesson 24 ─────────────────────────────────
function updateLesson23() {
  const file23 = path.join(cDir, '23-c-double-pointers-function-pointers-and-safety.html');
  const title = "C Double Pointers (int**), Function Pointers (Callbacks) & Pointer Safety";
  const desc = "Comprehensive textbook-grade masterclass on Advanced C Pointers (Phase 9 Part 3): Pointer to Pointer (int**) architecture, modifying pointer addresses across functions, Function Pointers syntax and callback systems, the 5 Golden Pointer Safety Commandments, and common pointer pitfalls.";
  const subtopics = "Double Pointers (int**) · Dynamic Pointer Reallocation · Function Pointers & Callbacks · 5 Golden Pointer Safety Commandments · Common Traps";

  const currentContent = fs.readFileSync(file23, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '23-c-double-pointers-function-pointers-and-safety.html', 23, "Phase 09", "Pointers & Memory Architecture", subtopics, contentBody, '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html', '22. Pointer Arithmetic, Arrays & const Qualifiers', '24-c-pointers-and-functions-call-by-reference.html', '24. Passing Addresses, Swapping & Returning Pointers');
  fs.writeFileSync(file23, html, 'utf8');
  console.log('✅ Updated 23-c-double-pointers-function-pointers-and-safety.html next links!');
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
  console.log(`✅ Cleaned author blocks across all ${files.length} C files!`);
}

// Update all sidebar links across all 26 C lesson files
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
    '23-c-double-pointers-function-pointers-and-safety.html',
    '24-c-pointers-and-functions-call-by-reference.html',
    '25-c-pointer-parameters-arrays-and-const-protection.html',
    '26-c-function-pointers-callbacks-and-event-systems.html'
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, loops, modular functions, arrays, strings, pointers, and function callbacks with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c functions, c arrays, c strings, c pointers, c callbacks" />
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
      const currentTheme = localStorage.getItem('theme') || 'light';
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
      <span class="badge">🟢 26 Comprehensive Master Chapters Across 10 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Comprehensive Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, variables, scanf input, conditions, loops, functions, arrays, strings, pointers, or function callbacks:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-c/04-c-user-input-scanf-and-buffer-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: Input →</a>
        <a href="/blog-c/06-c-conditional-branching-if-else-and-logical-operators.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-c/08-c-loops-for-while-do-while-and-control-flow.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-c/10-c-functions-declaration-definition-and-prototypes.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 6: Functions →</a>
        <a href="/blog-c/14-c-arrays-fundamentals-memory-model-and-indexing.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 7: Arrays →</a>
        <a href="/blog-c/18-c-strings-null-terminator-and-safe-io.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 8: Strings →</a>
        <a href="/blog-c/21-c-pointers-memory-addresses-and-dereferencing.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 9: Pointers →</a>
        <a href="/blog-c/24-c-pointers-and-functions-call-by-reference.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 10: Pointers & Functions →</a>
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
  console.log('✅ Updated public/blog-c.html with 26 Chapters across 10 Phases!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 10 (Pointers and Functions - Massive Content)...');
  buildLesson24();
  buildLesson25();
  buildLesson26();
  updateLesson23();
  cleanAuthorBlockFromAllFiles();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 10 successfully created with massive textbook-grade content density!');
}

run();
