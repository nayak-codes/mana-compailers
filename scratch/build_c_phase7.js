const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 7 (with 4 granular sub-chapters per phase!)
const C_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'C Basics & Architecture',
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
    desc: 'Deep-dive 4-chapter masterclass on Functions: declaration & prototypes, memory segments & static local variables, pass-by-value vs pass-by-reference pointers, CPU call stack frames, recursion theory, and 5 modular software projects.',
    lessons: [
      { num: 10, file: '10-c-functions-declaration-definition-and-prototypes.html', title: '10. Function Architecture & Prototypes', subtopics: 'Function ante enti? · Modular Programming · 3-Step Lifecycle · Prototypes vs Definitions · Parameters vs Arguments · void Return Types' },
      { num: 11, file: '11-c-variable-scope-lifetime-and-static-storage.html', title: '11. Scope, static Variables & Header Files', subtopics: 'RAM Memory Segments (Stack, Data, BSS) · Local vs Global Scope · static Local Variables · Variable Shadowing · Header Files (.h)' },
      { num: 12, file: '12-c-parameter-passing-value-vs-reference.html', title: '12. Pass-by-Value vs Pass-by-Address', subtopics: 'Call by Value Copying · Stack Frame Isolation · Pass by Address (&var) · Pointer Mutation (*ptr) · Returning Multiple Values via Pointers' },
      { num: 13, file: '13-c-recursion-call-stack-and-modular-projects.html', title: '13. Recursion, Call Stack & 5 Projects', subtopics: 'Recursion Inductive Model · Base Cases · CPU Stack Frame Pushing/Unwinding · Stack Overflow Prevention · 5 Modular Projects (Calculator, Grading, Utilities)' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Arrays & Memory Organization',
    icon: '📊',
    desc: 'Comprehensive 4-chapter masterclass on Arrays: 1D contiguous RAM memory models, zero-based offset formulas, 2D/3D Row-Major matrices, matrix addition/transposition, passing arrays to functions & pointer decay, and 6 core algorithmic operations (Search, Bubble Sort, Min/Max, Reverse, Merge).',
    lessons: [
      { num: 14, file: '14-c-arrays-fundamentals-memory-model-and-indexing.html', title: '14. 1D Arrays, RAM Architecture & Indexing', subtopics: 'Array ante enti? · Contiguous Memory Layout · Zero-Based Offset Formula · sizeof Length Idiom · Bounds Checking & Buffer Overflow' },
      { num: 15, file: '15-c-multidimensional-arrays-and-matrices.html', title: '15. 2D/3D Arrays, Row-Major & Matrices', subtopics: '2D/3D Array Architecture · Row-Major Memory Mapping Formula · Matrix Addition & Transpose · Array of Characters vs Strings' },
      { num: 16, file: '16-c-passing-arrays-to-functions-and-pointer-decay.html', title: '16. Passing Arrays to Functions & Pointer Decay', subtopics: 'Pointer Decay Mechanics · Why sizeof(arr) Fails Inside Functions · Explicit Size Passing · const Read-Only Arrays · Array Limitations' },
      { num: 17, file: '17-c-array-algorithms-searching-sorting-and-manipulation.html', title: '17. Array Algorithms (Search, Sort & Reverse)', subtopics: 'Sum & Average · Min & Max in O(N) · Linear Search Algorithm · Bubble Sort Optimization · In-Place Array Reversal · Merging Arrays' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c arrays, c memory model, 2d arrays c, pointer decay c, bubble sort c, matrix c" />
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
    .memory-diagram {
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

// ── BUILD LESSON 14: 1D Arrays, RAM Architecture & Indexing ───────────────
function buildLesson14() {
  const title = "C 1D Arrays: Contiguous RAM Memory Architecture & Indexing";
  const desc = "Deep architectural masterclass on C 1D Arrays (Phase 7 Part 1): What is an array?, contiguous physical RAM layout, why arrays are needed, declaration vs initialization, the mathematical zero-based offset formula, sizeof length calculation, updating elements, and buffer overflow dangers.";
  const filename = "14-c-arrays-fundamentals-memory-model-and-indexing.html";
  const subtopics = "Array ante enti? · Contiguous Memory Layout · Zero-Based Offset Formula · sizeof Length Idiom · Bounds Checking & Buffer Overflow";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 14): C 1D Arrays, Contiguous RAM Memory Architecture & Indexing Masterclass</strong>! When managing collections of related data (such as 1,000 student test scores or audio waveform samples), declaring individual variables like <code>score1, score2...</code> is impossible. <strong>Arrays</strong> provide the fundamental data structure in C for storing a fixed-size sequence of elements of the <em>same data type</em> in <strong>strictly contiguous (side-by-side) physical RAM memory bytes</strong>. In this in-depth guide, you will master array memory allocation, the mathematical address offset formula explaining why C starts counting at index 0, calculating array lengths safely at compile time, and avoiding catastrophic out-of-bounds buffer overflow crashes.</p>
    </div>

    <!-- 1. Array Fundamentals & Contiguous RAM Architecture -->
    <div class="section-title"><span class="num">1</span>Array Ante Enti? Physical Contiguous RAM Memory Layout</div>
    <div class="section-body">
      <p><strong>Array</strong> ante <strong>Same Data Type (Homogeneous)</strong> unna multiple values ni RAM memory lo <strong>Contiguous (Pakkana pakkana)</strong> ga store chese linear data structure.</p>

      <div class="memory-diagram">
        <strong>RAM Contiguous Memory Architecture for: int marks[4] = {85, 90, 78, 92};</strong><br>
        (Assuming Base Memory Address = 0x2000, where each int = 4 Bytes)<br>
        <br>
        RAM Address:       0x2000          0x2004          0x2008          0x200C<br>
                           ┌───────────────┬───────────────┬───────────────┬───────────────┐<br>
        Stored Value:      │      85       │      90       │      78       │      92       │<br>
                           └───────────────┴───────────────┴───────────────┴───────────────┘<br>
        Element Index:         marks[0]        marks[1]        marks[2]        marks[3]<br>
        Offset Calculation: (Base + 0*4)    (Base + 1*4)    (Base + 2*4)    (Base + 3*4)
      </div>

      <div class="concept-box">
        <h4>⚡ Why Does C Indexing Start at 0? (The Mathematical Offset Formula)</h4>
        <p>In high-level languages, index represents position (1st, 2nd). Kaani C language lo, <code>index</code> anedhi **Memory Offset from the Base Address**!<br>
        $$\\text{Target Address} = \\text{Base Address} + (\\text{Index} \\times \\text{sizeof(element)})$$<br>
        • First element base address deggare untundhi, so offset is <code>0</code> (<code>Base + 0 * 4 = Base</code>)!<br>
        • Second element is <code>1</code> element away (<code>Base + 1 * 4</code>). This is why C indexing strictly starts at 0 for maximum CPU calculation speed!</p>
      </div>
    </div>

    <!-- 2. Declaration, Initialization & sizeof Length Idiom -->
    <div class="section-title"><span class="num">2</span>Declaration, Initialization &amp; Compile-Time sizeof Length Idiom</div>
    <div class="section-body">
      <p>C provides multiple flexible initialization syntaxes for 1D arrays:</p>

      <div class="concept-box">
        <h4>📝 Initialization Methods in C:</h4>
        <p>1. <strong>Explicit Size &amp; List:</strong> <code>int marks[4] = {85, 90, 78, 92};</code><br>
        2. <strong>Auto-Size Deducing (Compiler counts elements):</strong> <code>int marks[] = {85, 90, 78, 92};</code><br>
        3. <strong>Zero-Initialization:</strong> <code>int zeros[10] = {0};</code> (All 10 slots filled with 0).<br>
        4. <strong>Uninitialized (Garbage Warning!):</strong> <code>int temp[5];</code> (Contains random unallocated junk bytes from RAM!).</p>
      </div>

      <div class="concept-box">
        <h4>📐 Calculating Array Length with sizeof</h4>
        <p>Because C does not store array length properties (like Java or Python's <code>.length</code>), we use the universal compile-time idiom:<br>
        $$\\text{Length} = \\frac{\\text{sizeof(entire array in bytes)}}{\\text{sizeof(single element in bytes)}} = \\frac{\\text{sizeof(marks)}}{\\text{sizeof(marks[0])}}$$</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Standard Example</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int marks[] = {85, 90, 78, 92};
    int length = sizeof(marks) / sizeof(marks[0]);

    for (int index = 0; index &lt; length; index++) {
        printf("marks[%d] = %d\\n", index, marks[index]);
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Bounds Checking & Buffer Overflow Dangers -->
    <div class="section-title"><span class="num">3</span>No Runtime Bounds Checking &amp; Buffer Overflow Dangers ⚠️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The Critical "Out-of-Bounds" Vulnerability in C:</h4>
        <p>C language does **ZERO Runtime Bounds Checking** for ultra-fast raw hardware execution speed.<br>
        If you declare <code>int arr[4];</code> and attempt to write <code>arr[10] = 500;</code>:<br>
        • C compiler will NOT throw any error during compilation!<br>
        • Execution time lo CPU RAM lo unna adjacent data or return address ni overwrite chesthundhi (<strong>Buffer Overflow</strong>).<br>
        • This causes corrupted program states, security vulnerabilities, or immediate <strong>Segmentation Fault crashes</strong>!</p>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Array Traversals in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this array inspection and element updating program in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int temperatures[5] = {32, 35, 30, 28, 33};

    // Updating element at index 2
    temperatures[2] = 31;

    for (int i = 0; i &lt; 5; i++) {
        printf("Day %d: %d°C\\n", i + 1, temperatures[i]);
    }
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

  const html = wrapCPage(title, desc, filename, 14, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '13-c-recursion-call-stack-and-modular-projects.html', '13. Recursion, Call Stack & 5 Projects', '15-c-multidimensional-arrays-and-matrices.html', '15. 2D/3D Arrays, Row-Major & Matrices');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 15: 2D/3D Arrays, Row-Major & Matrices ───────────────────
function buildLesson15() {
  const title = "C 2D/3D Arrays, Row-Major Order & Matrix Mathematics";
  const desc = "Deep mathematical masterclass on C Multi-Dimensional Arrays (Phase 7 Part 2): 2D grid architecture, physical 1D Row-Major Order mapping in RAM, address calculation formula, Matrix Addition, Matrix Transposition, and Array of Characters vs Strings.";
  const filename = "15-c-multidimensional-arrays-and-matrices.html";
  const subtopics = "2D/3D Array Architecture · Row-Major Memory Mapping Formula · Matrix Addition & Transpose · Array of Characters vs Strings";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 15): C 2D & Multi-Dimensional Arrays, Row-Major Order & Matrix Mathematics Masterclass</strong>! When software models tabular spreadsheets, game grids (like Chess or Tic-Tac-Toe), image pixel color channels, or physics simulation tensors, single-dimensional arrays are insufficient. <strong>Multi-Dimensional Arrays</strong> represent data organized across rows and columns. In this comprehensive guide, you will master the 2D grid abstraction, understand how physical computer hardware flattens 2D matrices into <strong>1D Row-Major Memory bytes</strong>, implement core linear algebra algorithms (Matrix Addition and Matrix Transposition), and compare character arrays with null-terminated strings.</p>
    </div>

    <!-- 1. 2D Arrays & Row-Major Order in RAM -->
    <div class="section-title"><span class="num">1</span>2D Array Abstraction vs Physical Row-Major Order in RAM</div>
    <div class="section-body">
      <p>While programmer mind models a 2D array as a Grid table with Rows and Columns, <strong>Computer RAM is strictly a single flat 1D sequence of linear addresses</strong>. 
      C compiles 2D arrays using <strong>Row-Major Order</strong> (Row 0 is placed first, immediately followed by Row 1, then Row 2):</p>

      <div class="memory-diagram">
        <strong>Physical RAM Flattening: int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};</strong><br>
        <br>
        Conceptual 2D Grid:             Physical 1D RAM Linear Sequence:<br>
        Row 0: [ 1 ] [ 2 ] [ 3 ]   ───►  [ 1 ][ 2 ][ 3 ] [ 4 ][ 5 ][ 6 ]<br>
        Row 1: [ 4 ] [ 5 ] [ 6 ]         └──────┬──────┘ └──────┬──────┘<br>
                                            Row 0 Bytes      Row 1 Bytes<br>
        <br>
        Memory Address Formula:<br>
        Address(matrix[i][j]) = Base_Address + (i * Total_Cols + j) * sizeof(element)
      </div>
    </div>

    <!-- 2. Matrix Addition & Matrix Transpose -->
    <div class="section-title"><span class="num">2</span>Matrix Mathematics: Matrix Addition &amp; Matrix Transpose</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>📐 1. Matrix Addition ($C[i][j] = A[i][j] + B[i][j]$)</h4>
        <p>Two matrices must have the exact same dimensions $(M \times N)$. Element-by-element addition is performed across nested loops.</p>
      </div>

      <div class="concept-box">
        <h4>🔄 2. Matrix Transpose ($T[j][i] = M[i][j]$)</h4>
        <p>Transposing a matrix flips it over its main diagonal, converting its Rows into Columns: an $(M \times N)$ matrix becomes an $(N \times M)$ transposed matrix.</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — 2D Matrix Addition & Transpose Algorithms</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

#define ROWS 2
#define COLS 3

int main(void) {
    int A[ROWS][COLS] = {{1, 2, 3}, {4, 5, 6}};
    int B[ROWS][COLS] = {{7, 8, 9}, {1, 2, 3}};
    int Sum[ROWS][COLS];
    int Transpose[COLS][ROWS];

    // 1. Matrix Addition
    for (int i = 0; i &lt; ROWS; i++) {
        for (int j = 0; j &lt; COLS; j++) {
            Sum[i][j] = A[i][j] + B[i][j];
        }
    }

    // 2. Matrix Transposition of A (2x3 -> 3x2)
    for (int i = 0; i &lt; ROWS; i++) {
        for (int j = 0; j &lt; COLS; j++) {
            Transpose[j][i] = A[i][j];
        }
    }

    printf("--- Matrix Sum (A + B) ---\\n");
    for (int i = 0; i &lt; ROWS; i++) {
        for (int j = 0; j &lt; COLS; j++) printf("%3d ", Sum[i][j]);
        printf("\\n");
    }

    printf("\\n--- Transpose of Matrix A (3x2) ---\\n");
    for (int i = 0; i &lt; COLS; i++) {
        for (int j = 0; j &lt; ROWS; j++) printf("%3d ", Transpose[i][j]);
        printf("\\n");
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Array of Characters vs Strings -->
    <div class="section-title"><span class="num">3</span>Array of Characters vs Null-Terminated Strings</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>Feature</th><th>Raw Character Array (<code>char arr[]</code>)</th><th>C String (<code>char str[]</code>)</th></tr>
        <tr><td><strong>Null-Terminator (<code>'\\0'</code>)</strong></td><td><strong>NOT present</strong> unless explicitly added.</td><td><strong>Automatically added at the end</strong> by compiler.</td></tr>
        <tr><td><strong>Printing with <code>%s</code></strong></td><td>❌ <strong>Dangerous!</strong> Will read past array causing buffer overflow.</td><td>✅ <strong>Safe!</strong> <code>printf("%s", str)</code> stops exactly at <code>'\\0'</code>.</td></tr>
        <tr><td><strong>Example</strong></td><td><code>char ch[] = {'H', 'i'};</code> (Takes 2 Bytes)</td><td><code>char str[] = "Hi";</code> (Takes 3 Bytes: 'H', 'i', '\\0')</td></tr>
      </table>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Matrix Operations in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this 2D grid matrix scalar multiplication program in our online GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int grid[2][2] = {{5, 10}, {15, 20}};
    int scalar = 3;

    for (int i = 0; i &lt; 2; i++) {
        for (int j = 0; j &lt; 2; j++) {
            grid[i][j] *= scalar;
            printf("%d ", grid[i][j]);
        }
        printf("\\n");
    }
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

  const html = wrapCPage(title, desc, filename, 15, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '14-c-arrays-fundamentals-memory-model-and-indexing.html', '14. 1D Arrays, RAM Architecture & Indexing', '16-c-passing-arrays-to-functions-and-pointer-decay.html', '16. Passing Arrays to Functions & Pointer Decay');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 16: Passing Arrays to Functions & Pointer Decay ──────────
function buildLesson16() {
  const title = "C Passing Arrays to Functions, Pointer Decay & Limitations";
  const desc = "Deep memory masterclass on Passing Arrays in C (Phase 7 Part 3): The Pointer Decay mechanism, why sizeof(arr) fails inside functions, passing array size explicitly, const array protection, and core architectural limitations of C arrays.";
  const filename = "16-c-passing-arrays-to-functions-and-pointer-decay.html";
  const subtopics = "Pointer Decay Mechanics · Why sizeof(arr) Fails Inside Functions · Explicit Size Passing · const Read-Only Arrays · Array Limitations";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 16): Passing Arrays to Functions, Pointer Decay & Architectural Limitations Masterclass</strong>! One of the most infamous stumbling blocks for C developers is understanding what happens when an array is passed across a function boundary. In C, arrays are <em>never copied by value</em>. Instead, the array instantly <strong>decays into a raw pointer to its first memory element</strong>. In this comprehensive guide, you will master the mechanics of Pointer Decay, understand why <code>sizeof</code> fails inside functions, learn how to enforce read-only safety with <code>const</code>, and analyze the fundamental architectural limitations of static C arrays.</p>
    </div>

    <!-- 1. Pointer Decay Mechanics -->
    <div class="section-title"><span class="num">1</span>The Pointer Decay Mechanism Explained ⭐</div>
    <div class="section-body">
      <p>When you pass an array into a function in C, the entire array is NOT copied. 
      Instead, compiler automatically converts (decays) the array name into a <strong>Pointer to its first element (<code>&amp;arr[0]</code>)</strong>:</p>

      <div class="memory-diagram">
        <strong>Pointer Decay Across Function Boundary:</strong><br>
        <br>
        In main():       int numbers[1000];  (Occupies 4,000 Bytes in RAM)<br>
        Function Call:   processArray(numbers);<br>
        <br>
        Inside Function: void processArray(int* ptr)  &lt;--- Receives only an 8-byte pointer address!<br>
        <br>
        Advantage:  Zero memory copying overhead! Blazing fast O(1) performance.<br>
        Side-effect: Function loses all metadata about how many elements are in the array!
      </div>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">⚠️ The Infamous sizeof(arr) Inside Functions Trap:</h4>
        <p>If you call <code>sizeof(arr)</code> inside a function, it does <strong>NOT</strong> return the array size! It returns the size of the pointer (<strong>8 bytes on 64-bit CPU</strong>).<br>
        ✅ <strong>The Golden Rule:</strong> Always pass array size as an explicit second argument: <code>void process(int arr[], int size);</code></p>
      </div>
    </div>

    <!-- 2. In-Place Mutation & const Safety -->
    <div class="section-title"><span class="num">2</span>In-Place Array Mutation &amp; const Read-Only Protection</div>
    <div class="section-body">
      <p>Because the function receives the actual memory address, any element modified inside the function will <strong>directly alter the caller's original array in RAM</strong>. 
      If you want to prevent accidental modification, use the <strong><code>const</code></strong> modifier:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Passing Arrays & const Protection Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Read-Only display function (Protected with const)
void printArray(const int arr[], int size) {
    printf("Array elements: ");
    for (int i = 0; i &lt; size; i++) {
        printf("%d ", arr[i]);
        // arr[i] = 0; // ❌ Compile Error: Assignment of read-only location!
    }
    printf("\\n");
}

// 2. In-Place doubling function (Modifies caller's RAM memory!)
void doubleElements(int arr[], int size) {
    for (int i = 0; i &lt; size; i++) {
        arr[i] *= 2;
    }
}

int main(void) {
    int data[] = {10, 20, 30, 40};
    int size = sizeof(data) / sizeof(data[0]);

    printArray(data, size);
    doubleElements(data, size);
    printf("After Doubling: ");
    printArray(data, size);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Array Limitations in C -->
    <div class="section-title"><span class="num">3</span>Architectural Limitations of C Arrays</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>Limitation</th><th>Technical Consequence in C</th><th>Modern Alternative Solution</th></tr>
        <tr><td><strong>Fixed Compile-Time Size</strong></td><td>Static arrays cannot grow or shrink dynamically during program runtime.</td><td>Dynamic Heap Memory via <code>malloc()</code> and <code>realloc()</code>.</td></tr>
        <tr><td><strong>Homogeneous Types Only</strong></td><td>Cannot mix different types (e.g. integer and string in same array).</td><td>Structures (<code>struct</code>).</td></tr>
        <tr><td><strong>No Self-Aware Length</strong></td><td>Array does not carry length metadata; developer must manually track size.</td><td>Custom Struct with array pointer + size field.</td></tr>
        <tr><td><strong>No Memory Bounds Checks</strong></td><td>Index out of bounds causes buffer overflow crashes or security breaches.</td><td>Explicit loop boundary conditions.</td></tr>
      </table>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Array Functions in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this array scalar addition function in our online GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void addBonus(int scores[], int size, int bonus) {
    for (int i = 0; i &lt; size; i++) scores[i] += bonus;
}

int main(void) {
    int scores[] = {75, 82, 90};
    addBonus(scores, 3, 5);
    for (int i = 0; i &lt; 3; i++) printf("%d ", scores[i]);
    printf("\\n");
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

  const html = wrapCPage(title, desc, filename, 16, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '15-c-multidimensional-arrays-and-matrices.html', '15. 2D/3D Arrays, Row-Major & Matrices', '17-c-array-algorithms-searching-sorting-and-manipulation.html', '17. Array Algorithms (Search, Sort & Reverse)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 17: Array Algorithms (Search, Sort & Manipulation) ───────
function buildLesson17() {
  const title = "C Array Algorithms: Linear Search, Bubble Sort, Min/Max & Manipulation";
  const desc = "Deep algorithmic masterclass on C Array Processing (Phase 7 Part 4): Computing Sum and Average, Single-pass Min/Max search, Linear Search algorithm, Bubble Sort with early exit optimization, In-place array reversal (two-pointer technique), and Merging arrays.";
  const filename = "17-c-array-algorithms-searching-sorting-and-manipulation.html";
  const subtopics = "Sum & Average · Min & Max in O(N) · Linear Search Algorithm · Bubble Sort Optimization · In-Place Array Reversal · Merging Arrays";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 17): Classical Array Algorithms, Searching, Sorting & Memory Manipulation Masterclass</strong>! Arrays are the bedrock upon which computer science algorithms operate. In this comprehensive guide, you will master the mathematical and programmatic implementations of <strong>6 foundational algorithmic operations</strong>: calculating Sum & Average without precision loss, finding Minimum and Maximum values in a single $O(N)$ pass, Linear Searching, optimized Bubble Sorting, two-pointer in-place array reversal, and merging arrays into unified memory buffers.</p>
    </div>

    <!-- 1. Sum, Average & Min/Max Analysis -->
    <div class="section-title"><span class="num">1</span>Sum, Average &amp; Single-Pass Min/Max Search Algorithms</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>1. Sum &amp; Average ($O(N)$ Time, $O(1)$ Space)</h4>
        <p>Loop through the array with an accumulator variable. To avoid integer truncation bug during division, cast count to <code>(double)</code>:<br>
        <code>double avg = (double)sum / size;</code></p>
      </div>

      <div class="concept-box">
        <h4>2. Minimum &amp; Maximum Search ($O(N)$ Time)</h4>
        <p>Initialize <code>min = arr[0]</code> and <code>max = arr[0]</code>. Compare each subsequent element from index 1 to $N-1$ in a single sequential linear scan.</p>
      </div>
    </div>

    <!-- 2. Searching & Sorting: Linear Search vs Bubble Sort -->
    <div class="section-title"><span class="num">2</span>Searching &amp; Sorting: Linear Search vs Optimized Bubble Sort</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>Algorithm</th><th>Time Complexity (Worst / Best)</th><th>Auxiliary Space</th><th>Core Mechanism</th></tr>
        <tr>
          <td><strong>Linear Search</strong></td>
          <td><strong>$O(N)$</strong> / $O(1)$</td>
          <td>$O(1)$</td>
          <td>Target element dorike varaku elements ni sequentially index 0 nunchi compare chesthundhi.</td>
        </tr>
        <tr>
          <td><strong>Optimized Bubble Sort</strong></td>
          <td><strong>$O(N^2)$</strong> / <strong>$O(N)$</strong> (with flag)</td>
          <td>$O(1)$ In-Place</td>
          <td>Pakkana pakkana unna elements ni compare chesi larger value ni right side ki bubble chesthundhi.</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Comprehensive Algorithmic Suite</span>
          <a class="try-btn" href="/?lang=c">▶ Run Algorithms</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

// 1. Linear Search: returns index if found, -1 if not found
int linearSearch(const int arr[], int size, int target) {
    for (int i = 0; i &lt; size; i++) {
        if (arr[i] == target) return i; // Found!
    }
    return -1; // Not found
}

// 2. Optimized Bubble Sort (Early exit if already sorted)
void bubbleSort(int arr[], int size) {
    for (int i = 0; i &lt; size - 1; i++) {
        bool swapped = false;
        for (int j = 0; j &lt; size - i - 1; j++) {
            if (arr[j] &gt; arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // Optimized: Array is already sorted!
    }
}

// 3. In-Place Array Reversal (Two-Pointer Technique)
void reverseArray(int arr[], int size) {
    int start = 0, end = size - 1;
    while (start &lt; end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

int main(void) {
    int numbers[] = {64, 25, 12, 22, 11};
    int size = 5;

    // Linear Search Demo
    int target = 22;
    int foundIdx = linearSearch(numbers, size, target);
    printf("1. Linear Search: Element %d found at index %d\\n", target, foundIdx);

    // Bubble Sort Demo
    bubbleSort(numbers, size);
    printf("2. Sorted Array: ");
    for (int i = 0; i &lt; size; i++) printf("%d ", numbers[i]);
    printf("\\n");

    // Reverse Array Demo
    reverseArray(numbers, size);
    printf("3. Reversed Array: ");
    for (int i = 0; i &lt; size; i++) printf("%d ", numbers[i]);
    printf("\\n");

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Array Merging -->
    <div class="section-title"><span class="num">3</span>Merging Two Arrays into a Unified Array</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>📦 Merging Logic Explained:</h4>
        <p>Rendu arrays (Size $N_1$ and $N_2$) ni kalipi third array (Size $N_1 + N_2$) create cheyyadaniki:<br>
        1. First array elements ni 0 to $N_1-1$ copy chesthamu.<br>
        2. Second array elements ni index $N_1$ nunchi start chesi $N_1 + N_2 - 1$ daka append chesthamu.</p>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Array Algorithms in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this Min/Max single pass search in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int data[] = {45, 12, 89, 34, 99, 23};
    int size = sizeof(data) / sizeof(data[0]);

    int min = data[0], max = data[0];
    for (int i = 1; i &lt; size; i++) {
        if (data[i] &lt; min) min = data[i];
        if (data[i] &gt; max) max = data[i];
    }
    printf("Min = %d | Max = %d\\n", min, max);
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

  const html = wrapCPage(title, desc, filename, 17, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '16-c-passing-arrays-to-functions-and-pointer-decay.html', '16. Passing Arrays to Functions & Pointer Decay', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE LESSON 13 to link to Lesson 14 ─────────────────────────────────
function updateLesson13() {
  const file13 = path.join(cDir, '13-c-recursion-call-stack-and-modular-projects.html');
  const title = "C Recursion, Call Stack Mechanics & 5 Modular Software Projects";
  const desc = "Deep algorithmic masterclass on C Recursion (Phase 6 Part 4): Inductive mathematical model, base cases, CPU call stack frame pushing/unwinding, stack overflow prevention, and 5 complete modular software projects.";
  const subtopics = "Recursion Inductive Model · Base Cases · CPU Stack Frame Pushing/Unwinding · Stack Overflow Prevention · 5 Modular Projects (Calculator, Grading, Utilities)";

  const currentContent = fs.readFileSync(file13, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '13-c-recursion-call-stack-and-modular-projects.html', 13, "Phase 06", "Functions & Modular Architecture", subtopics, contentBody, '12-c-parameter-passing-value-vs-reference.html', '12. Pass-by-Value vs Pass-by-Address', '14-c-arrays-fundamentals-memory-model-and-indexing.html', '14. 1D Arrays, RAM Architecture & Indexing');
  fs.writeFileSync(file13, html, 'utf8');
  console.log('✅ Updated 13-c-recursion-call-stack-and-modular-projects.html next links!');
}

// Update all sidebar links across all 17 C lesson files
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
    '17-c-array-algorithms-searching-sorting-and-manipulation.html'
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, loops, modular functions, and arrays with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c functions, c arrays" />
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
      <span class="badge">🟢 17 In-Depth Sub-Chapters Across 7 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, variables, scanf input, conditions, loops, functions, or arrays & memory layouts:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-c/04-c-user-input-scanf-and-buffer-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: Input →</a>
        <a href="/blog-c/06-c-conditional-branching-if-else-and-logical-operators.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-c/08-c-loops-for-while-do-while-and-control-flow.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-c/10-c-functions-declaration-definition-and-prototypes.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 6: Functions →</a>
        <a href="/blog-c/14-c-arrays-fundamentals-memory-model-and-indexing.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 7: Arrays & Memory →</a>
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
  console.log('✅ Updated public/blog-c.html with 17 Chapters across 7 Phases!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 7 (Arrays & Memory Organization - 4 Granular Chapters)...');
  buildLesson14();
  buildLesson15();
  buildLesson16();
  buildLesson17();
  updateLesson13();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 7 successfully created with 4 granular, heavy-theory sub-chapters!');
}

run();
