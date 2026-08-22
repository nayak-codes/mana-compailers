const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 12 (32 Chapters!)
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
  },
  {
    id: 'phase11', tag: 'Phase 11', title: 'Structures & Data Packing', icon: '🏗️',
    desc: 'Exhaustive 3-chapter masterclass on C Structures: User-defined heterogeneous types, member access (.), memory layout & Structure Padding / Data Alignment, #pragma pack, structure comparison, structure arrays, nested structures, pointer to struct & arrow operator (->), typedef struct, self-referential structures (linked lists), structure binary file I/O (fwrite/fread), and 5 production software projects.',
    lessons: [
      { num: 27, file: '27-c-structures-declaration-memory-model-and-padding.html', title: '27. Structures, RAM Memory Model & Padding Holes', subtopics: 'struct ante enti? · Declaration & Initialization · Dot Operator (.) · RAM Memory Alignment & Padding Holes · #pragma pack(1) · Structure Comparison' },
      { num: 28, file: '28-c-structure-arrays-pointers-and-arrow-operator.html', title: '28. Structure Arrays, Pointers & Arrow Operator (->)', subtopics: 'Structure Arrays · Nested Structures · Passing Structs to Functions · Pointer to Struct & Arrow Operator (->) · typedef struct · Anonymous Structs' },
      { num: 29, file: '29-c-self-referential-structures-file-io-and-5-projects.html', title: '29. Self-Referential Structs, Binary I/O & 5 Projects', subtopics: 'Self-Referential Structs (Node*) · Binary File Serialization (fwrite/fread) · 5 Projects (Student, Employee, Inventory, Library, Contacts)' }
    ]
  },
  {
    id: 'phase12', tag: 'Phase 12', title: 'Unions, Enums & Typedef', icon: '🔀',
    desc: 'Exhaustive 3-chapter masterclass on Unions, Enums, and Typedef: Shared memory overlapping architecture (Unions vs Structs), practical variant types & hardware register bitfields, Enumerations (enum) for type-safe state machines, custom enum values, switch-case dispatchers, and expressive type aliasing with typedef.',
    lessons: [
      { num: 30, file: '30-c-unions-shared-memory-and-variant-types.html', title: '30. Unions, Shared Memory & Variant Data Types', subtopics: 'union ante enti? · Shared Overlapping RAM Layout · Struct vs Union Memory Matrix · Tagged Unions · Hardware Register Bitfields · Pointers to Unions' },
      { num: 31, file: '31-c-enumerations-custom-values-and-switch-dispatch.html', title: '31. Enumerations (enum), Custom Values & Switch', subtopics: 'enum ante enti? · Auto-Increment Constants · Custom Enum Values (HTTP Statuses) · Enum State Machines with switch · Naming Conventions' },
      { num: 32, file: '32-c-typedef-type-aliases-and-readable-architecture.html', title: '32. typedef, Type Aliases & Expressive Architecture', subtopics: 'typedef ante enti? · Expressive Type Aliases · typedef struct & union · typedef with Function Pointers · Clean API Design · Technical FAQs' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, c structures, struct padding c, arrow operator c, c unions, c enums, c typedef" />
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

// ── BUILD LESSON 27: Structures, RAM Memory Model & Padding Holes ──────────
function buildLesson27() {
  const title = "C Structures: RAM Memory Layout, Member Access & Structure Padding Holes";
  const desc = "Comprehensive textbook-grade masterclass on C Structures (Phase 11 Part 1): Heterogeneous data grouping, struct declaration and designated initialization, dot operator (.), physical RAM alignment, CPU word boundary padding holes, #pragma pack(1), and why direct struct == comparison fails.";
  const filename = "27-c-structures-declaration-memory-model-and-padding.html";
  const subtopics = "struct ante enti? · Declaration & Initialization · Dot Operator (.) · RAM Memory Alignment & Padding Holes · #pragma pack(1) · Structure Comparison";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 11 (Chapter 27): C Structures — RAM Memory Architecture, Member Access & Structure Padding Holes Masterclass</strong>! Arrays allow grouping multiple elements of the <em>same data type</em>. However, real-world entities—such as a Student (Name string, Age integer, Marks float) or a Bank Account (Account Number, Balance, Owner Name)—require grouping multiple <strong>heterogeneous data types into a single unified programmer-defined type</strong>. In C, this is accomplished using the <strong><code>struct</code></strong> keyword. In this exhaustive textbook-grade guide, you will master structure declarations, member access using the dot operator (<code>.</code>), designated initializers, explore the complex physical RAM architecture of <strong>Structure Padding &amp; Data Alignment</strong>, learn how <code>#pragma pack(1)</code> eliminates byte holes, and understand why comparing structs using <code>==</code> is illegal in standard C.</p>
    </div>

    <!-- 1. What is a Structure? Architecture & Definition -->
    <div class="section-title"><span class="num">1</span>struct Ante Enti? Heterogeneous Data Grouping Architecture</div>
    <div class="section-body">
      <p class="text-prose">
        C language lo <code>struct</code> anedhi <strong>User-Defined Composite Data Type</strong>. 
        Different primitive types (<code>char</code>, <code>int</code>, <code>float</code>, pointers) ni aggregate chesi single memory record ga bind chesthundhi.
      </p>

      <div class="concept-box">
        <h4>🌟 Declaring and Creating Structure Variables:</h4>
        <p>
          <code>struct Student { char name[50]; int age; float marks; };</code><br>
          • <code>struct Student</code> becomes the blueprint type.<br>
          • <code>struct Student s1 = {"Ravi", 20, 87.5f};</code> creates an actual variable instance in RAM memory!
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Standard Example (struct Student)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

struct Student {
    char name[50];
    int age;
    float marks;
};

int main(void) {
    // Initializing structure variable using initializer list
    struct Student student = {"Ravi", 20, 87.5f};

    // Accessing members using the dot (.) operator
    printf("Name:  %s\\n", student.name);
    printf("Age:   %d\\n", student.age);
    printf("Marks: %.1f\\n", student.marks);

    // Member-by-member updating
    student.marks = 92.0f;
    printf("Updated Marks: %.1f\\n", student.marks);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 2. Structure Padding & Physical RAM Data Alignment -->
    <div class="section-title"><span class="num">2</span>Structure Padding &amp; Physical RAM Alignment Holes ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        Consider this structure declaration:
        <code>struct Example { char a; int b; char c; };</code><br>
        Calculate its memory size: $1 + 4 + 1 = 6 \text{ Bytes}$? <strong>WRONG! <code>sizeof(struct Example)</code> returns 12 Bytes!</strong> <em>Where did 6 extra bytes come from?</em>
      </p>

      <div class="concept-box" style="border-left-color:#38bdf8;">
        <h4>📐 CPU Word Alignment Rule:</h4>
        <p>
          Modern 32-bit and 64-bit CPUs read RAM memory in <strong>4-Byte or 8-Byte Word Blocks</strong> (natural hardware alignment boundaries). 
          If a 4-byte integer starts at an odd memory address (e.g. <code>0x1001</code>), the CPU would need <strong>2 separate memory bus cycles</strong> to read a single integer!<br>
          To prevent performance drops, the C compiler automatically inserts unallocated <strong>Padding Bytes (Byte Holes)</strong> to align variables on natural word boundaries!
        </p>
      </div>

      <div class="memory-diagram">
        <strong>RAM Memory Layout for struct Example { char a; int b; char c; };</strong><br>
        <br>
        Offset:     0x00      0x01   0x02   0x03      0x04..0x07      0x08      0x09   0x0A   0x0B<br>
                  ┌─────────┬───────────────────┬───────────────┬─────────┬───────────────────┐<br>
        Content:  │ char a  │   3 PADDING HOLES │     int b     │ char c  │   3 PADDING HOLES │<br>
                  └─────────┴───────────────────┴───────────────┴─────────┴───────────────────┘<br>
        Bytes:       1 Byte        3 Bytes           4 Bytes       1 Byte        3 Bytes<br>
        Total Size = 12 Bytes (50% Overhead due to Padding Holes!)
      </div>

      <div class="deep-dive-card">
        <h3>⚡ How to Minimize Padding &amp; Control Alignment:</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          1. <strong>Re-order Members by Size (Largest to Smallest):</strong> Placing <code>double</code> and <code>int</code> fields before <code>char</code> fields reduces padding holes dramatically!<br>
          2. <strong>Use <code>#pragma pack(1)</code>:</strong> Disables all structure padding, packing members tightly byte-by-byte (ideal for network packet headers and file formats).
        </p>
      </div>
    </div>

    <!-- 3. Structure Comparison: Why s1 == s2 Fails -->
    <div class="section-title"><span class="num">3</span>Structure Comparison: Why struct1 == struct2 is Illegal in C</div>
    <div class="section-body">
      <p class="text-prose">
        In C, attempting to write <code>if (student1 == student2)</code> results in a compile error. 
        Even using <code>memcmp(&amp;student1, &amp;student2, sizeof(struct Student))</code> is dangerous because <strong>padding byte holes contain uninitialized random garbage RAM data</strong>! 
        Two structures with identical field values might fail <code>memcmp</code> because their padding holes differ.
        <br><br>
        ✅ <strong>Correct Rule:</strong> Always compare structures field-by-field (e.g. <code>if (s1.age == s2.age &amp;&amp; strcmp(s1.name, s2.name) == 0)</code>).
      </p>
    </div>

    <!-- 4. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">4</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What is a Designated Initializer in C structures?</h4>
          <p>Introduced in C99, designated initializers allow initializing struct fields by name in any order: <code>struct Student s = {.marks = 95.0f, .name = "Anita", .age = 21};</code>. Unspecified fields are automatically zero-initialized!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: What is the difference between a structure definition and a structure variable?</h4>
          <p>A structure definition (type declaration) consumes 0 bytes of RAM memory—it is purely a design blueprint. Memory is allocated only when a structure variable instance is instantiated.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Structure Memory Size in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this structure padding inspector in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

struct Unpacked { char a; int b; char c; };
#pragma pack(push, 1)
struct Packed   { char a; int b; char c; };
#pragma pack(pop)

int main(void) {
    printf("Size of Unpacked struct (Padding enabled):  %zu bytes\\n", sizeof(struct Unpacked));
    printf("Size of Packed struct (#pragma pack(1)):   %zu bytes\\n", sizeof(struct Packed));
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 27, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '26-c-function-pointers-callbacks-and-event-systems.html', '26. Function Pointers, Callbacks & Event Systems', '28-c-structure-arrays-pointers-and-arrow-operator.html', '28. Structure Arrays, Pointers & Arrow Operator (->)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 28: Structure Arrays, Pointers & Arrow Operator ─────────
function buildLesson28() {
  const title = "C Structure Arrays, Pointers & The Arrow Operator (->) Masterclass";
  const desc = "Comprehensive textbook-grade masterclass on Advanced C Structure Operations (Phase 11 Part 2): Structure arrays, nested structures, passing structures to functions, pointer to struct, the arrow operator (->), typedef struct, and anonymous structures.";
  const filename = "28-c-structure-arrays-pointers-and-arrow-operator.html";
  const subtopics = "Structure Arrays · Nested Structures · Passing Structs to Functions · Pointer to Struct & Arrow Operator (->) · typedef struct · Anonymous Structs";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 11 (Chapter 28): C Structure Arrays, Pointers &amp; The Arrow Operator (-&gt;) Masterclass</strong>! Managing single structure variables is only the beginning. Professional applications manage collections of thousands of records using <strong>Structure Arrays</strong>, model hierarchical real-world relationships using <strong>Nested Structures</strong>, and eliminate high-cost memory copying when passing structures to functions using <strong>Pointers to Structures and the Arrow Operator (<code>-&gt;</code>)</strong>. In this exhaustive textbook-grade guide, you will master multi-record array manipulation, analyze pointer dereferencing syntax shortcuts, explore <code>typedef struct</code> aliases, and understand anonymous structures.</p>
    </div>

    <!-- 1. Structure Arrays & Nested Structures -->
    <div class="section-title"><span class="num">1</span>Structure Arrays &amp; Nested Structure Architecture</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>Structure Array:</strong> Contiguous sequence of structure instances stored back-to-back in RAM (e.g. <code>struct Student database[100];</code>).<br>
        <strong>Nested Structure:</strong> Embedding a structure variable as a member inside another structure type!
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Nested Structures & Structure Array Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

struct Address {
    char city[30];
    int pinCode;
};

struct Employee {
    int empId;
    char name[40];
    struct Address location; // Nested Structure!
};

int main(void) {
    struct Employee staff[2] = {
        {101, "Kiran", {"Hyderabad", 500081}},
        {102, "Suresh", {"Bengaluru", 560001}}
    };

    for (int i = 0; i &lt; 2; i++) {
        printf("ID: %d | Name: %s | City: %s | Pin: %d\\n",
               staff[i].empId, staff[i].name,
               staff[i].location.city, staff[i].location.pinCode);
    }
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 2. Pointers to Structures & The Arrow Operator (->) -->
    <div class="section-title"><span class="num">2</span>Pointers to Structures &amp; The Arrow Operator (-&gt;) ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        Passing a large structure (e.g. 200 bytes) by value into a function forces the CPU to copy all 200 bytes onto the stack frame. 
        <strong>Passing a pointer to the structure (<code>const struct Student* ptr</code>) copies only 8 bytes!</strong>
      </p>

      <div class="concept-box">
        <h4>📐 Pointer Member Access Syntax Equivalence:</h4>
        <p>$$\\mathbf{ptr-&gt;member \\equiv (*ptr).member}$$<br>
        • <code>(*ptr).name</code> dereferences the pointer first, then accesses the member.<br>
        • <code>ptr-&gt;name</code> (Arrow Operator) is the clean, idiomatic syntactic shorthand used by all C engineers!</p>
      </div>
    </div>

    <!-- 3. typedef struct & Anonymous Structures -->
    <div class="section-title"><span class="num">3</span>typedef struct &amp; Anonymous Structures</div>
    <div class="section-body">
      <p class="text-prose">
        Without <code>typedef</code>, every variable declaration requires repeating the <code>struct</code> keyword: <code>struct Student s1;</code>.<br>
        Using <code>typedef struct</code> creates a clean type alias:
      </p>

      <div class="concept-box" style="border-left-color:#10b981;">
        <h4>Clean typedef struct Blueprint:</h4>
        <p><code>typedef struct { char name[50]; int age; } Student;</code><br>
        Now you can declare variables cleanly: <code>Student s1 = {"Anita", 22};</code>!</p>
      </div>
    </div>

    <!-- 4. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">4</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Why are parentheses required in <code>(*ptr).member</code>?</h4>
          <p>Dot operator <code>.</code> has higher precedence than dereference operator <code>*</code>. Writing <code>*ptr.member</code> is parsed as <code>*(ptr.member)</code>, which tries to dereference a non-pointer member resulting in a compilation error.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: What is an Anonymous Structure?</h4>
          <p>An anonymous structure is an unnamed struct embedded inside a union or another struct, allowing direct access to its fields without an intermediate instance name.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Arrow Operator in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this structure pointer mutation demo in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

typedef struct {
    char model[30];
    double price;
} Laptop;

void applyDiscount(Laptop *laptop, double percent) {
    laptop-&gt;price -= (laptop-&gt;price * (percent / 100.0));
}

int main(void) {
    Laptop myLaptop = {"Dell XPS 15", 1500.00};
    applyDiscount(&amp;myLaptop, 10.0);
    printf("Model: %s | Discounted Price: $%.2f\\n", myLaptop.model, myLaptop.price);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 28, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '27-c-structures-declaration-memory-model-and-padding.html', '27. Structures, RAM Memory Model & Padding Holes', '29-c-self-referential-structures-file-io-and-5-projects.html', '29. Self-Referential Structs, Binary I/O & 5 Projects');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 29: Self-Referential Structs, Binary I/O & 5 Projects ─────
function buildLesson29() {
  const title = "C Self-Referential Structures, Binary File I/O & 5 Production Projects";
  const desc = "Comprehensive textbook-grade masterclass on Advanced Structure Architecture (Phase 11 Part 3): Self-referential structures (Linked List Nodes), binary structure serialization using fwrite() and fread(), and 5 full production projects (Student Management, Employee Records, Inventory, Library & Contact Book).";
  const filename = "29-c-self-referential-structures-file-io-and-5-projects.html";
  const subtopics = "Self-Referential Structs (Node*) · Binary File Serialization (fwrite/fread) · 5 Projects (Student, Employee, Inventory, Library, Contacts)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 11 (Chapter 29): C Self-Referential Structures, Binary File I/O &amp; 5 Production Projects Masterclass</strong>! Beyond basic data grouping, structures are the foundation for complex dynamic data structures (Linked Lists, Binary Trees, Graphs) and persistent file databases. In this exhaustive textbook-grade guide, you will master <strong>Self-Referential Structures</strong> containing pointers to their own type, learn how to serialize entire structure records directly to disk using <strong>Binary File I/O (<code>fwrite</code> / <code>fread</code>)</strong>, and build <strong>5 complete production-ready software systems</strong>.</p>
    </div>

    <!-- 1. Self-Referential Structures (Gateway to Data Structures) -->
    <div class="section-title"><span class="num">1</span>Self-Referential Structures (Gateway to Linked Lists) ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        A <strong>Self-Referential Structure</strong> contains a pointer member that points to an instance of the <em>same structure type</em>:
      </p>

      <div class="memory-diagram">
        <strong>Self-Referential Structure RAM Architecture (Singly Linked List):</strong><br>
        <br>
        Node 1 (Address: 0x1000)        Node 2 (Address: 0x2000)        Node 3 (Address: 0x3000)<br>
        ┌──────────┬───────────┐        ┌──────────┬───────────┐        ┌──────────┬───────────┐<br>
        │ Data: 10 │ Next:0x200│ ────►  │ Data: 20 │ Next:0x300│ ────►  │ Data: 30 │ Next: NULL│<br>
        └──────────┴───────────┘        └──────────┴───────────┘        └──────────┴───────────┘
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Self-Referential Struct Definition</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>struct Node {
    int data;
    struct Node* next; // Self-referential pointer!
};</code></pre>
      </div>
    </div>

    <!-- 2. Binary File I/O with Structures (fwrite / fread) -->
    <div class="section-title"><span class="num">2</span>Binary File Serialization: Writing &amp; Reading Structs directly to Disk</div>
    <div class="section-body">
      <p class="text-prose">
        Instead of formatting structures into text using <code>fprintf</code>, C allows writing raw RAM memory bytes of a structure directly to a binary file (<code>.dat</code>) using <code>fwrite()</code> and reading them back instantly using <code>fread()</code>:
      </p>

      <div class="concept-box">
        <h4>⚡ Binary Struct Serialization Commands:</h4>
        <p>• Write: <code>fwrite(&amp;student, sizeof(struct Student), 1, filePtr);</code><br>
        • Read:  <code>fread(&amp;student, sizeof(struct Student), 1, filePtr);</code></p>
      </div>
    </div>

    <!-- 3. 5 Production Software Projects -->
    <div class="section-title"><span class="num">3</span>5 Full Software Projects Architecture</div>
    <div class="section-body">
      <div class="deep-dive-card">
        <h3>📂 Overview of Included Production Systems:</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          1. <strong>Student Management System:</strong> Add, search by Roll No, update marks, and calculate CGPA.<br>
          2. <strong>Employee Records Database:</strong> Track ID, Department, Salary, and filter by salary range.<br>
          3. <strong>Product Inventory Manager:</strong> Stock tracking, unit price calculation, and re-order alerts.<br>
          4. <strong>Library Management System:</strong> Book ISBN search, issue/return status, and author filtering.<br>
          5. <strong>Contact Book Engine:</strong> Name, Phone Number, Email lookup with file persistence.
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Student Management System Project Snippet</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int rollNo;
    char name[40];
    float gpa;
} StudentRecord;

void printStudent(const StudentRecord *s) {
    printf("Roll: %d | Name: %s | GPA: %.2f\\n", s-&gt;rollNo, s-&gt;name, s-&gt;gpa);
}

int main(void) {
    StudentRecord classRoster[3] = {
        {101, "Ravi Kumar", 3.85f},
        {102, "Anita Roy",   3.92f},
        {103, "Suresh P",   3.65f}
    };

    printf("=== STUDENT MANAGEMENT SYSTEM ROSTER ===\\n");
    for (int i = 0; i &lt; 3; i++) {
        printStudent(&amp;classRoster[i]);
    }
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 4. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">4</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Why must self-referential structures use pointer members (struct Node* next) instead of direct instances (struct Node next)?</h4>
          <p>If a struct contained a direct instance of itself, its size would be infinite (recursive memory embedding), causing a compilation error. A pointer member has a fixed size (8 bytes on 64-bit OS), making the struct size finite and well-defined!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Is binary struct file I/O portable across different computers?</h4>
          <p>Not always! Binary files written on a Little-Endian system (x86/ARM) or systems with different compiler padding alignment might not read back correctly on Big-Endian systems or systems compiled with different <code>#pragma pack</code> rules.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Contact Book Struct in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this contact record manager in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

typedef struct {
    char name[30];
    char phone[15];
} Contact;

int main(void) {
    Contact c = {"Balanju Support", "+91-9876543210"};
    printf("Contact: %s (%s)\\n", c.name, c.phone);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 29, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '28-c-structure-arrays-pointers-and-arrow-operator.html', '28. Structure Arrays, Pointers & Arrow Operator (->)', '30-c-unions-shared-memory-and-variant-types.html', '30. Unions, Shared Memory & Variant Data Types');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 30: Unions, Shared Memory & Variant Data Types ────────────
function buildLesson30() {
  const title = "C Unions: Shared Memory Architecture, Overlapping Layouts & Variant Types";
  const desc = "Comprehensive textbook-grade masterclass on C Unions (Phase 12 Part 1): Shared overlapping RAM memory architecture, union declaration, member access, side-by-side Struct vs Union memory matrix, Tagged Unions, hardware register bitfields, and pointers to unions.";
  const filename = "30-c-unions-shared-memory-and-variant-types.html";
  const subtopics = "union ante enti? · Shared Overlapping RAM Layout · Struct vs Union Memory Matrix · Tagged Unions · Hardware Register Bitfields · Pointers to Unions";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 12 (Chapter 30): C Unions — Shared Memory Architecture, Overlapping Layouts &amp; Variant Types Masterclass</strong>! While a <code>struct</code> allocates separate, independent memory locations for every member, a <strong><code>union</code> forces all its members to share the exact same physical RAM memory location</strong>. The total size of a union is determined solely by its single largest member. In this exhaustive textbook-grade guide, you will master the mechanics of shared memory overlapping, analyze a side-by-side visual memory breakdown of Structs vs Unions, discover how <strong>Tagged Unions</strong> implement type-safe variant variables, explore low-level hardware register bitfields, and master pointer access to unions.</p>
    </div>

    <!-- 1. What is a Union? Shared Memory Architecture -->
    <div class="section-title"><span class="num">1</span>union Ante Enti? Shared Memory Overlapping Architecture</div>
    <div class="section-body">
      <p class="text-prose">
        A <strong>Union</strong> is a user-defined data type in C where <strong>All members share the starting RAM address (Offset 0x0)</strong>. 
        Only one member can hold a valid value at any given point in time! Writing to one member overwrites the shared memory of all other members.
      </p>

      <div class="memory-diagram">
        <strong>Side-by-Side Physical RAM Memory Matrix: Struct vs Union</strong><br>
        <br>
        1. STRUCT Layout: struct Data { int i; float f; char str[20]; };<br>
        RAM Address:  0x1000        0x1004        0x1008...0x101C<br>
                      ┌─────────────┬─────────────┬──────────────────────────┐<br>
        Memory:       │  int i (4B) │ float f(4B) │      char str[20] (20B)  │<br>
                      └─────────────┴─────────────┴──────────────────────────┘<br>
        Total Size = 4 + 4 + 20 = 28 Bytes (Independent Slots)<br>
        <br>
        2. UNION Layout: union Data { int i; float f; char str[20]; };<br>
        RAM Address:  0x2000...0x2014 (All members START at address 0x2000!)<br>
                      ┌──────────────────────────────────────────────────────┐<br>
        Memory:       │ int i (4B) / float f (4B) / char str[20] (20B) Shared│<br>
                      └──────────────────────────────────────────────────────┘<br>
        Total Size = 20 Bytes (Size of Largest Member: char str[20])
      </div>
    </div>

    <!-- 2. Code Demonstration & Tagged Union Pattern -->
    <div class="section-title"><span class="num">2</span>Code Demonstration &amp; The Tagged Union Pattern ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        To safely know which union member currently holds a valid value, C engineers combine an <code>enum</code> tag with a <code>union</code> inside a structure (<strong>Tagged Union / Variant Type</strong>):
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Tagged Union Variant Type Implementation</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

typedef enum { TYPE_INT, TYPE_FLOAT, TYPE_STRING } DataType;

typedef struct {
    DataType type;
    union {
        int iVal;
        float fVal;
        char sVal[30];
    } payload; // Shared memory union payload!
} Variant;

void printVariant(const Variant *v) {
    switch (v-&gt;type) {
        case TYPE_INT:
            printf("Integer Value: %d\\n", v-&gt;payload.iVal);
            break;
        case TYPE_FLOAT:
            printf("Float Value:   %.2f\\n", v-&gt;payload.fVal);
            break;
        case TYPE_STRING:
            printf("String Value:  %s\\n", v-&gt;payload.sVal);
            break;
    }
}

int main(void) {
    Variant v1, v2;

    v1.type = TYPE_INT;
    v1.payload.iVal = 42;

    v2.type = TYPE_FLOAT;
    v2.payload.fVal = 99.99f;

    printVariant(&amp;v1);
    printVariant(&amp;v2);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">3</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What happens if you read a union member different from the one last written?</h4>
          <p>This is known as Type Punning. The CPU will re-interpret the binary bits of the last written value as if they belonged to the requested type (e.g. reading raw IEEE-754 float bits as an integer), which is widely used in graphics and fast math hacks!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Why are unions heavily used in Embedded Systems and Microcontrollers?</h4>
          <p>Microcontrollers have extremely limited RAM (sometimes only a few kilobytes). Unions allow sharing memory buffers between mutually exclusive peripherals (e.g. sharing a 512-byte RAM buffer between UART RX and SPI TX).</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Union Memory Size in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this union size inspector in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

union Packet {
    int header;
    double timestamp;
    char payload[64];
};

int main(void) {
    union Packet p;
    printf("Size of union Packet: %zu bytes\\n", sizeof(p));
    printf("Address of header:    %p\\n", (void*)&amp;p.header);
    printf("Address of payload:   %p (Same Address!)\\n", (void*)&amp;p.payload);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 30, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '29-c-self-referential-structures-file-io-and-5-projects.html', '29. Self-Referential Structs, Binary I/O & 5 Projects', '31-c-enumerations-custom-values-and-switch-dispatch.html', '31. Enumerations (enum), Custom Values & Switch');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 31: Enumerations (enum), Custom Values & Switch ───────────
function buildLesson31() {
  const title = "C Enumerations (enum): Custom Values, Type Safety & Switch State Machines";
  const desc = "Comprehensive textbook-grade masterclass on C Enumerations (Phase 12 Part 2): Named integer constants, auto-increment mechanics, custom enum values (HTTP status codes), enum state machines with switch-case, and professional enum naming conventions.";
  const filename = "31-c-enumerations-custom-values-and-switch-dispatch.html";
  const subtopics = "enum ante enti? · Auto-Increment Constants · Custom Enum Values (HTTP Statuses) · Enum State Machines with switch · Naming Conventions";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 12 (Chapter 31): C Enumerations (enum) — Custom Values, Type Safety &amp; Switch State Machines Masterclass</strong>! Writing raw numbers like <code>0, 1, 2, 3</code> in code to represent states (e.g. PENDING, PROCESSING, COMPLETED, FAILED) leads to cryptic, unreadable, and error-prone code ("Magic Numbers"). In C, <strong>Enumerations (<code>enum</code>) allow creating human-readable named integer constants that improve code clarity and type safety</strong>. In this exhaustive textbook-grade guide, you will master enum declarations, auto-increment rules, custom explicit integer values (like HTTP status codes <code>200, 404, 500</code>), enum state machine dispatchers using <code>switch-case</code>, and industry-standard naming conventions.</p>
    </div>

    <!-- 1. What is an Enumeration? Architecture -->
    <div class="section-title"><span class="num">1</span>enum Ante Enti? Named Integer Constants Architecture</div>
    <div class="section-body">
      <p class="text-prose">
        An <strong>Enumeration</strong> is a user-defined type consisting of a set of named integer constants. 
        By default, the C compiler assigns integer values starting from <strong>0</strong> and auto-increments each subsequent symbol by 1:
      </p>

      <div class="concept-box">
        <h4>🌟 Auto-Increment Default Rule:</h4>
        <p><code>enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };</code><br>
        • <code>MON = 0</code>, <code>TUE = 1</code>, <code>WED = 2</code>, ..., <code>SUN = 6</code>.</p>
      </div>
    </div>

    <!-- 2. Custom Explicit Values & Switch State Machines -->
    <div class="section-title"><span class="num">2</span>Custom Explicit Enum Values &amp; Switch State Machine ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        You can assign custom integer values to enum constants (e.g. HTTP status codes or hardware error flags):
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Custom Enums & Switch State Machine Implementation</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Custom Enum Explicit Values
typedef enum {
    HTTP_OK           = 200,
    HTTP_CREATED      = 201,
    HTTP_BAD_REQUEST  = 400,
    HTTP_NOT_FOUND    = 404,
    HTTP_SERVER_ERROR = 500
} HttpStatus;

void handleResponse(HttpStatus status) {
    switch (status) {
        case HTTP_OK:
            printf("[200 OK] Request succeeded!\\n");
            break;
        case HTTP_CREATED:
            printf("[201 CREATED] Resource created successfully!\\n");
            break;
        case HTTP_BAD_REQUEST:
            printf("[400 BAD REQUEST] Invalid client payload!\\n");
            break;
        case HTTP_NOT_FOUND:
            printf("[404 NOT FOUND] Requested URL does not exist!\\n");
            break;
        case HTTP_SERVER_ERROR:
            printf("[500 INTERNAL ERROR] Server crashed!\\n");
            break;
        default:
            printf("Unknown status code (%d)\\n", status);
            break;
    }
}

int main(void) {
    HttpStatus code1 = HTTP_OK;
    HttpStatus code2 = HTTP_NOT_FOUND;

    handleResponse(code1);
    handleResponse(code2);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">3</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What is the underlying memory size of an enum variable in C?</h4>
          <p>In standard C, enum variables are stored as <code>signed int</code> (typically 4 bytes). Some compilers (GCC/Clang with <code>-fshort-enums</code>) optimize enum size to 1 or 2 bytes if all enum values fit in smaller integer ranges.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Can two enum constants share the exact same integer value?</h4>
          <p>Yes! Writing <code>enum Status { FALSE = 0, NO = 0, TRUE = 1, YES = 1 };</code> is 100% valid in C. Both <code>FALSE</code> and <code>NO</code> map to integer 0.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Enums in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this traffic light state machine in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

typedef enum { RED, YELLOW, GREEN } TrafficLight;

int main(void) {
    TrafficLight light = RED;
    if (light == RED) {
        printf("STOP! Light is RED (%d)\\n", light);
    }
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 31, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '30-c-unions-shared-memory-and-variant-types.html', '30. Unions, Shared Memory & Variant Data Types', '32-c-typedef-type-aliases-and-readable-architecture.html', '32. typedef, Type Aliases & Expressive Architecture');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 32: typedef, Type Aliases & Expressive Architecture ──────
function buildLesson32() {
  const title = "C typedef: Type Aliases, Function Pointer Aliasing & Clean API Design";
  const desc = "Comprehensive textbook-grade masterclass on C typedef (Phase 12 Part 3): Creating expressive domain-specific type aliases, typedef struct and typedef union idioms, aliasing complex function pointers, clean API design, and comprehensive technical FAQs.";
  const filename = "32-c-typedef-type-aliases-and-readable-architecture.html";
  const subtopics = "typedef ante enti? · Expressive Type Aliases · typedef struct & union · typedef with Function Pointers · Clean API Design · Technical FAQs";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 12 (Chapter 32): C typedef — Type Aliases, Function Pointer Aliasing &amp; Clean API Design Masterclass</strong>! As C software codebases scale to hundreds of thousands of lines (such as Linux, Redis, or SQLite), repeating long complex types like <code>unsigned long long int</code> or <code>struct NetworkHeaderNode*</code> degrades readability and creates maintenance headaches. The <strong><code>typedef</code></strong> keyword allows software engineers to define **expressive, domain-specific type aliases** that make code self-documenting, portable across 32-bit/64-bit architectures, and elegant. In this final exhaustive textbook-grade guide of Phase 12, you will master primitive aliasing, struct/union aliasing, function pointer simplification, and clean API design.</p>
    </div>

    <!-- 1. What is typedef? Architecture -->
    <div class="section-title"><span class="num">1</span>typedef Ante Enti? Type Aliasing Architecture</div>
    <div class="section-body">
      <p class="text-prose">
        <code>typedef</code> does NOT create a new data type—it creates a <strong>New Name (Alias) for an Existing Data Type</strong>.
      </p>

      <div class="concept-box">
        <h4>🌟 Expressive Type Aliasing Blueprint:</h4>
        <p>• <code>typedef unsigned long long uint64;</code> $\rightarrow$ Now <code>uint64 bytes = 1048576;</code> is readable!<br>
        • <code>typedef char* String;</code> $\rightarrow$ <code>String name = "Dennis Ritchie";</code></p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Function Pointer Aliasing with typedef</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// Complex Function Pointer Syntax simplified with typedef!
typedef int (*MathOperation)(int, int);

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }

void runMath(int x, int y, MathOperation op) {
    printf("Result: %d\\n", op(x, y));
}

int main(void) {
    MathOperation op1 = add;
    MathOperation op2 = subtract;

    runMath(50, 20, op1);
    runMath(50, 20, op2);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 2. Comprehensive FAQ & Interview Section Across Phases 11 & 12 -->
    <div class="section-title"><span class="num">2</span>Comprehensive Technical Interview FAQs (Phases 11 &amp; 12)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What is the difference between <code>#define</code> and <code>typedef</code>?</h4>
          <p><code>#define</code> is a text-substitution macro performed by the Preprocessor (Phase 1 of compilation) with zero type checking. <code>typedef</code> is evaluated by the Compiler with full syntax and type safety verification!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: How does <code>typedef</code> make C code portable across 32-bit and 64-bit platforms?</h4>
          <p>Standard headers like <code>&lt;stdint.h&gt;</code> use <code>typedef</code> to define fixed-width types like <code>int32_t</code> and <code>int64_t</code>. On 32-bit OS, <code>int64_t</code> maps to <code>long long</code>, while on 64-bit Linux it maps to <code>long</code>, guaranteeing exact byte sizes on any platform!</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test typedef in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this typedef demonstration in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

typedef unsigned int u32;

int main(void) {
    u32 count = 1000;
    printf("Typedef uint count: %u\\n", count);
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 32, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '31-c-enumerations-custom-values-and-switch-dispatch.html', '31. Enumerations (enum), Custom Values & Switch', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── UPDATE LESSON 26 to link to Lesson 27 ─────────────────────────────────
function updateLesson26() {
  const file26 = path.join(cDir, '26-c-function-pointers-callbacks-and-event-systems.html');
  const title = "C Function Pointers, Callbacks & Event-Driven Architecture Masterclass";
  const desc = "Comprehensive textbook-grade masterclass on Function Pointers and Callbacks in C (Phase 10 Part 3): Passing function pointers into functions, callback design patterns, custom sorting with qsort comparators, predicate filtering pipelines, jump table dispatchers, and state machine architectures.";
  const subtopics = "Function Pointer Parameters · Callback Architecture · Custom Sorting Comparators · Predicate Filters · Jump Tables & State Machines";

  const currentContent = fs.readFileSync(file26, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '26-c-function-pointers-callbacks-and-event-systems.html', 26, "Phase 10", "Pointers and Functions", subtopics, contentBody, '25-c-pointer-parameters-arrays-and-const-protection.html', '25. Array/String Pointer Parameters & const Safety', '27-c-structures-declaration-memory-model-and-padding.html', '27. Structures, RAM Memory Model & Padding Holes');
  fs.writeFileSync(file26, html, 'utf8');
  console.log('✅ Updated 26-c-function-pointers-callbacks-and-event-systems.html next links!');
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

// Update all sidebar links across all 32 C lesson files
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
    '26-c-function-pointers-callbacks-and-event-systems.html',
    '27-c-structures-declaration-memory-model-and-padding.html',
    '28-c-structure-arrays-pointers-and-arrow-operator.html',
    '29-c-self-referential-structures-file-io-and-5-projects.html',
    '30-c-unions-shared-memory-and-variant-types.html',
    '31-c-enumerations-custom-values-and-switch-dispatch.html',
    '32-c-typedef-type-aliases-and-readable-architecture.html'
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, loops, modular functions, arrays, strings, pointers, structures, unions, enums, and typedef with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c functions, c arrays, c strings, c pointers, c structures, c unions, c enums, c typedef" />
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
      <span class="badge">🟢 32 Comprehensive Master Chapters Across 12 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Comprehensive Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, variables, scanf input, conditions, loops, functions, arrays, strings, pointers, structures, unions, or enums:</p>
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
        <a href="/blog-c/24-c-pointers-and-functions-call-by-reference.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 10: Pointers & Functions →</a>
        <a href="/blog-c/27-c-structures-declaration-memory-model-and-padding.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 11: Structures →</a>
        <a href="/blog-c/30-c-unions-shared-memory-and-variant-types.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 12: Unions & Enums →</a>
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
  console.log('✅ Updated public/blog-c.html with 32 Chapters across 12 Phases!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 11 & 12 (Structures, Unions, Enums, Typedef - Massive Content)...');
  buildLesson27();
  buildLesson28();
  buildLesson29();
  buildLesson30();
  buildLesson31();
  buildLesson32();
  updateLesson26();
  cleanAuthorBlockFromAllFiles();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 11 & 12 successfully created with massive textbook-grade content density!');
}

run();
