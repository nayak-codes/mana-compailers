const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 13 (35 Chapters!)
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
  },
  {
    id: 'phase13', tag: 'Phase 13', title: 'Dynamic Memory Management', icon: '💾',
    desc: 'Exhaustive 3-chapter masterclass on Dynamic Memory Management in C: Stack vs Heap architecture, malloc() raw uninitialized heap allocation, calloc() zero-initialization, realloc() buffer resizing and safe temp pointers, free() deallocation mechanics, NULL guards, memory leaks, dangling pointers, double free, use-after-free (UAF), dynamic arrays/strings/structs, memory ownership, and Valgrind debugging.',
    lessons: [
      { num: 33, file: '33-c-stack-vs-heap-malloc-and-calloc.html', title: '33. Stack vs Heap, malloc(), calloc() & NULL Guards', subtopics: 'Stack vs Heap RAM Architecture · Dynamic Memory ante enti? · malloc() Mechanics · calloc() Zero-Initialization · sizeof(*ptr) Idiom · Defensive NULL Guards' },
      { num: 34, file: '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', title: '34. realloc(), free() & The 4 Deadly Heap Bugs', subtopics: 'realloc() Buffer Expansion · Safe Temp Pointer Pattern · free() Deallocation · Memory Leaks · Dangling Pointers · Double Free · Use-After-Free (UAF)' },
      { num: 35, file: '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', title: '35. Dynamic Collections, Ownership & Valgrind Debugging', subtopics: 'Dynamic 1D/2D Arrays · Dynamic Strings (+1 Rule) · Dynamic Structs · Memory Ownership Architecture · Valgrind Memcheck · AddressSanitizer' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, c malloc, c calloc, c realloc, c free, c heap allocation, c memory leaks, valgrind" />
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

// ── BUILD LESSON 33: Stack vs Heap, malloc(), calloc() & NULL Guards ───────
function buildLesson33() {
  const title = "C Dynamic Memory: Stack vs Heap Architecture, malloc(), calloc() & Defensive NULL Guards";
  const desc = "Comprehensive textbook-grade masterclass on C Dynamic Memory Management (Phase 13 Part 1): Physical Stack vs Heap RAM segment comparison, dynamic memory allocation mechanics, malloc() raw bytes, calloc() zero-initialization, the sizeof(*ptr) idiomatic rule, and defensive NULL pointer guards.";
  const filename = "33-c-stack-vs-heap-malloc-and-calloc.html";
  const subtopics = "Stack vs Heap RAM Architecture · Dynamic Memory ante enti? · malloc() Mechanics · calloc() Zero-Initialization · sizeof(*ptr) Idiom · Defensive NULL Guards";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 13 (Chapter 33): C Dynamic Memory Management — Stack vs Heap Architecture, malloc(), calloc() &amp; Defensive NULL Guards Masterclass</strong>! Up to this point in our C Masterclass, all variables and arrays (such as <code>int arr[100];</code>) were allocated on the <strong>CPU Stack Frame</strong> at compile time with fixed sizes. However, real-world high-performance software (like database engines, web servers, and operating systems) does not know how much data a user will input until runtime. <strong>Dynamic Memory Allocation allows requesting arbitrary blocks of RAM memory directly from the Operating System Heap at runtime</strong>. In this exhaustive textbook-grade guide, you will master the fundamental architectural differences between Stack and Heap RAM segments, learn the precise mechanics of <code>malloc()</code> and <code>calloc()</code>, explore the <code>sizeof(*ptr)</code> safety idiom, and master defensive <code>NULL</code> memory guards.</p>
    </div>

    <!-- 1. Stack vs Heap Architecture -->
    <div class="section-title"><span class="num">1</span>Stack Memory vs Heap Memory Architecture</div>
    <div class="section-body">
      <p class="text-prose">
        Computer RAM allocated to a C process is partitioned into distinct functional segments:
      </p>

      <table class="tbl spec-table">
        <tr><th>Memory Segment</th><th>Allocation Trigger</th><th>Deallocation Mechanism</th><th>Size Flexibility</th><th>Speed &amp; Overhead</th></tr>
        <tr>
          <td><strong>Stack Memory</strong></td>
          <td>Automatic on function call.</td>
          <td>Automatic stack pop on function return.</td>
          <td>Fixed at compile-time (Limited ~1-8MB).</td>
          <td>⚡ Extremely Fast (Single CPU register pointer change).</td>
        </tr>
        <tr>
          <td><strong>Heap Memory</strong></td>
          <td>Explicit via <code>malloc()</code> / <code>calloc()</code>.</td>
          <td>Explicit via <code>free()</code> by developer.</td>
          <td>Dynamic at runtime (Gigabytes up to system RAM limits).</td>
          <td>🐢 Slower (OS kernel system call &amp; fragment management).</td>
        </tr>
      </table>

      <div class="memory-diagram">
        <strong>Process Memory Layout in Physical RAM:</strong><br>
        <br>
        High Address  ┌─────────────────────────────────────────┐<br>
                      │              STACK SEGMENT              │ (Grows DOWNWARD on function calls)<br>
                      │  [ local variables, stack frames ]     │  ▼<br>
                      ├─────────────────────────────────────────┤<br>
                      │                 ┆┆┆                     │<br>
                      │          UNALLOCATED RAM SPACE          │<br>
                      │                 ┆┆┆                     │<br>
                      ├─────────────────────────────────────────┤<br>
                      │  ▲                                      │<br>
                      │  HEAP SEGMENT (Grows UPWARD via malloc) │ (Managed by OS Heap Allocator)<br>
                      ├─────────────────────────────────────────┤<br>
                      │          BSS / DATA SEGMENTS            │ (Global &amp; Static Variables)<br>
                      ├─────────────────────────────────────────┤<br>
        Low Address   │          TEXT / CODE SEGMENT            │ (Read-Only Machine Instructions)<br>
                      └─────────────────────────────────────────┘
      </div>
    </div>

    <!-- 2. malloc() vs calloc() Mechanics & Defensive NULL Guards -->
    <div class="section-title"><span class="num">2</span>malloc() vs calloc() Mechanics &amp; Defensive NULL Guards ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        C standard library (<code>&lt;stdlib.h&gt;</code>) provides two primary functions to allocate heap memory:
      </p>

      <div class="concept-box">
        <h4>📐 malloc() vs calloc() Syntax Comparison:</h4>
        <p>
          • <strong><code>void* malloc(size_t totalBytes);</code></strong><br>
          Allocates a contiguous block of <code>totalBytes</code> in Heap RAM. Contains <strong>uninitialized garbage data</strong>!<br>
          <em>Idiomatic Syntax:</em> <code>int *p = malloc(count * sizeof(*p));</code><br><br>
          • <strong><code>void* calloc(size_t numElements, size_t elementSize);</code></strong><br>
          Allocates a contiguous block and <strong>clears every single byte to zero (0)</strong>!<br>
          <em>Idiomatic Syntax:</em> <code>int *p = calloc(count, sizeof(*p));</code>
        </p>
      </div>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The Defensive NULL Check Mandate:</h4>
        <p>
          If the operating system runs out of physical RAM memory, <code>malloc()</code> and <code>calloc()</code> will fail and return <strong><code>NULL</code> (Address 0x0)</strong>.<br>
          Attempting to write to a returned pointer without checking for <code>NULL</code> will instantly crash your program with a fatal <strong>Segmentation Fault</strong>!<br>
          ✅ <strong>Always check:</strong> <code>if (ptr == NULL) { handleOOMError(); }</code>
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Standard Example (Safe Heap Allocation)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    int count = 5;

    // 1. Dynamic Allocation on Heap using malloc & sizeof(*numbers) idiom
    int *numbers = malloc(count * sizeof(*numbers));

    // 2. Mandatory Defensive NULL Check for Out-Of-Memory (OOM) Protection
    if (numbers == NULL) {
        printf("Memory allocation failed\\n");
        return 1; // Exit with error status
    }

    // 3. Populating Dynamic Heap Array
    for (int index = 0; index &lt; count; index++) {
        numbers[index] = index + 1;
    }

    // 4. Print values from Heap RAM
    printf("Allocated Heap Array Values: ");
    for (int index = 0; index &lt; count; index++) {
        printf("%d ", numbers[index]);
    }
    printf("\\n");

    // 5. Deallocating Heap Memory & Grounding Pointer to NULL
    free(numbers);
    numbers = NULL; // Prevents Dangling Pointer!

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">3</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Why is <code>sizeof(*numbers)</code> safer than <code>sizeof(int)</code> in malloc calls?</h4>
          <p>If you later change the pointer type from <code>int *numbers;</code> to <code>double *numbers;</code>, <code>malloc(count * sizeof(*numbers))</code> automatically adjusts its calculation to 8 bytes per element, preventing disastrous buffer truncation bugs!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Should we typecast the return value of malloc (e.g. <code>(int*)malloc(...)</code>)?</h4>
          <p>In standard C (C99 / C11 / C17), explicit casting is not required because <code>void*</code> automatically coercibly converts to any pointer type. Explicit casting was required in C++ and ancient C89. Avoiding the cast in C allows compiler warnings if you forget to include <code>&lt;stdlib.h&gt;</code>.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test calloc Zero-Initialization in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this zero-initialization test in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    int *arr = calloc(5, sizeof(*arr));
    if (arr != NULL) {
        printf("calloc auto-zeroed element 0: %d\\n", arr[0]);
        printf("calloc auto-zeroed element 4: %d\\n", arr[4]);
        free(arr);
        arr = NULL;
    }
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 33, "Phase 13", "Dynamic Memory Management", subtopics, contentBody, '32-c-typedef-type-aliases-and-readable-architecture.html', '32. typedef, Type Aliases & Expressive Architecture', '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', '34. realloc(), free() & The 4 Deadly Heap Bugs');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 34: realloc(), free() & The 4 Deadly Heap Bugs ────────────
function buildLesson34() {
  const title = "C realloc(), free() & The 4 Deadly Heap Bugs Masterclass";
  const desc = "Comprehensive textbook-grade masterclass on C Memory Resizing & Security (Phase 13 Part 2): realloc() buffer growth mechanics, the safe temp pointer pattern, free() deallocation, and the 4 deadly heap security bugs (Memory Leaks, Dangling Pointers, Double Free, Use-After-Free UAF).";
  const filename = "34-c-realloc-free-and-the-4-deadly-heap-bugs.html";
  const subtopics = "realloc() Buffer Expansion · Safe Temp Pointer Pattern · free() Deallocation · Memory Leaks · Dangling Pointers · Double Free · Use-After-Free (UAF)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 13 (Chapter 34): C realloc(), free() &amp; The 4 Deadly Heap Bugs Masterclass</strong>! Allocating memory is only half the battle. As applications run, dynamic buffers must grow or shrink to fit incoming user data using <strong><code>realloc()</code></strong>, and finished memory blocks must be returned cleanly to the Operating System using <strong><code>free()</code></strong>. However, improper heap management causes the 4 most devastating security vulnerabilities in software history: <strong>Memory Leaks, Dangling Pointers, Double Free crashes, and Use-After-Free (UAF) exploits</strong>. In this exhaustive textbook-grade guide, you will master safe buffer expansion algorithms, analyze the safe temporary pointer pattern, and learn how to write iron-clad memory-safe code.</p>
    </div>

    <!-- 1. realloc() Mechanics & The Safe Temp Pointer Pattern -->
    <div class="section-title"><span class="num">1</span>realloc() Mechanics &amp; The Safe Temp Pointer Pattern ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        <strong><code>void* realloc(void *ptr, size_t newSize);</code></strong> resizes an existing heap allocation block without losing its existing data.
        Under the hood, the OS heap manager attempts 2 strategies:
        <br><br>
        1. <strong>In-Place Expansion:</strong> If adjacent RAM bytes after the block are free, it simply expands the boundary.<br>
        2. <strong>Relocation Copy:</strong> If adjacent RAM bytes are occupied, it allocates a <em>new larger memory block elsewhere in RAM</em>, copies the old data over, automatically frees the old block, and returns the new memory address!
      </p>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The Fatal realloc() NULL Overwrite Trap:</h4>
        <p>
          <code>ptr = realloc(ptr, newSize); // DANGEROUS CODE!</code><br>
          If <code>realloc()</code> fails (returns <code>NULL</code>), assigning <code>NULL</code> directly to <code>ptr</code> overwrites your only pointer reference to the original memory block! 
          The original memory block remains allocated on the heap, but you have lost its address—creating an unrecoverable <strong>Memory Leak</strong>!<br><br>
          ✅ <strong>The Safe Temp Pointer Blueprint:</strong><br>
          <code>void *temp = realloc(ptr, newSize);</code><br>
          <code>if (temp != NULL) { ptr = temp; } else { /* handle error, ptr still valid! */ }</code>
        </p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Safe realloc() Buffer Growth Implementation</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    int size = 3;
    int *arr = malloc(size * sizeof(*arr));
    if (arr == NULL) return 1;

    arr[0] = 10; arr[1] = 20; arr[2] = 30;

    // Resizing array from 3 to 5 elements using Safe Temp Pointer Pattern
    int newSize = 5;
    int *temp = realloc(arr, newSize * sizeof(*temp));

    if (temp == NULL) {
        printf("realloc failed! Original buffer preserved.\\n");
        free(arr); // Clean up original buffer on exit
        return 1;
    }

    // Success! Update primary pointer reference
    arr = temp;
    arr[3] = 40; arr[4] = 50;

    printf("Resized Array Values: ");
    for (int i = 0; i &lt; newSize; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    free(arr);
    arr = NULL;
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 2. The 4 Deadly Heap Security Bugs -->
    <div class="section-title"><span class="num">2</span>The 4 Deadly Heap Security Bugs &amp; Exploits ⚠️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">1. Memory Leak (Unreferenced Heap Bloat)</h4>
        <p>Allocating heap memory with <code>malloc()</code> but losing the pointer reference without calling <code>free()</code>. Over hours or days, the process consumes all available system RAM until OS kills the process.</p>
      </div>

      <div class="concept-box" style="border-left-color:#f59e0b; background:rgba(245, 158, 11, 0.06);">
        <h4 style="color:#f59e0b;">2. Dangling Pointer (Stale Reference)</h4>
        <p>Calling <code>free(ptr)</code> deallocates the memory, but <code>ptr</code> still holds the stale address. Accessing <code>*ptr</code> reads unpredictable garbage memory.<br>
        ✅ <strong>Remedy:</strong> Always set <code>ptr = NULL;</code> immediately after <code>free(ptr);</code>!</p>
      </div>

      <div class="concept-box" style="border-left-color:#a855f7; background:rgba(168, 85, 247, 0.06);">
        <h4 style="color:#a855f7;">3. Double Free (Heap Corruption Crash)</h4>
        <p>Calling <code>free(ptr)</code> twice on the exact same non-NULL memory address corrupts the OS heap allocator's internal free-list data structure, triggering an immediate security abort (e.g. <code>free(): double free detected</code>).</p>
      </div>

      <div class="concept-box" style="border-left-color:#ef4444; background:rgba(239, 68, 68, 0.06);">
        <h4 style="color:#ef4444;">4. Use-After-Free / UAF (Critical Security Vulnerability)</h4>
        <p>Attacker exploits a dangling pointer to execute malicious machine code after the original heap block was freed and re-allocated for another purpose (responsible for major CVE exploits in browsers and OS kernels).</p>
      </div>
    </div>

    <!-- 3. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">3</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What happens if you call <code>free(NULL)</code>?</h4>
          <p>Standard C specifies that <code>free(NULL)</code> is a safe no-op (does nothing and returns immediately). Grounding pointers to <code>NULL</code> after freeing them prevents accidental Double Free crashes!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: What happens if you call <code>realloc(NULL, size)</code>?</h4>
          <p>Calling <code>realloc(NULL, size)</code> is 100% equivalent to calling <code>malloc(size)</code>!</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test realloc Growth in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this dynamic array expander in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    int *buf = malloc(2 * sizeof(*buf));
    if (!buf) return 1;

    buf[0] = 100; buf[1] = 200;

    int *temp = realloc(buf, 4 * sizeof(*buf));
    if (temp) {
        buf = temp;
        buf[2] = 300; buf[3] = 400;
        printf("Expanded Element 3: %d\\n", buf[3]);
        free(buf);
        buf = NULL;
    }
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 34, "Phase 13", "Dynamic Memory Management", subtopics, contentBody, '33-c-stack-vs-heap-malloc-and-calloc.html', '33. Stack vs Heap, malloc(), calloc() & NULL Guards', '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', '35. Dynamic Collections, Ownership & Valgrind Debugging');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD LESSON 35: Dynamic Collections, Ownership & Valgrind Debugging ───
function buildLesson35() {
  const title = "C Dynamic Collections, Memory Ownership Architecture & Valgrind Debugging";
  const desc = "Comprehensive textbook-grade masterclass on Advanced Dynamic Collections (Phase 13 Part 3): Dynamic 1D/2D arrays, dynamic string allocation (+1 null terminator rule), dynamic structures, memory ownership architecture, Valgrind Memcheck, and AddressSanitizer debugging.";
  const filename = "35-c-dynamic-arrays-strings-structures-and-memory-debugging.html";
  const subtopics = "Dynamic 1D/2D Arrays · Dynamic Strings (+1 Rule) · Dynamic Structs · Memory Ownership Architecture · Valgrind Memcheck · AddressSanitizer";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 13 (Chapter 35): C Dynamic Collections, Memory Ownership Architecture &amp; Valgrind Debugging Masterclass</strong>! Now that you understand <code>malloc</code>, <code>calloc</code>, <code>realloc</code>, and <code>free</code>, you are ready to construct complex dynamic data collections—such as runtime 2D matrices, dynamic strings, and dynamically allocated structure objects. Furthermore, as software architecture grows, you must define strict <strong>Memory Ownership Rules</strong> (who owns the buffer and who is responsible for freeing it). In this final masterclass of Phase 13, you will build dynamic 2D arrays, master string heap allocation, explore ownership design patterns, and learn how to use professional memory diagnostic tools like <strong>Valgrind Memcheck</strong> and <strong>GCC AddressSanitizer</strong>.</p>
    </div>

    <!-- 1. Dynamic 2D Arrays & Dynamic Structs -->
    <div class="section-title"><span class="num">1</span>Dynamic 2D Matrices &amp; Dynamic Struct Allocations</div>
    <div class="section-body">
      <p class="text-prose">
        A dynamic 2D matrix is constructed using an array of pointers (<code>int** matrix</code>):
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Dynamic 2D Matrix Allocation & Deallocation</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main(void) {
    int rows = 3, cols = 4;

    // 1. Allocate array of row pointers
    int **matrix = malloc(rows * sizeof(*matrix));
    if (matrix == NULL) return 1;

    // 2. Allocate each row buffer
    for (int r = 0; r &lt; rows; r++) {
        matrix[r] = malloc(cols * sizeof(*matrix[r]));
    }

    // Populate matrix
    for (int r = 0; r &lt; rows; r++) {
        for (int c = 0; c &lt; cols; c++) {
            matrix[r][c] = (r + 1) * 10 + c;
        }
    }

    printf("Dynamic Matrix[1][2] = %d\\n", matrix[1][2]);

    // Deallocation in REVERSE order!
    for (int r = 0; r &lt; rows; r++) {
        free(matrix[r]); // Free row buffers
    }
    free(matrix); // Free row pointer array
    matrix = NULL;

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 2. Dynamic Strings & The +1 Null Terminator Rule -->
    <div class="section-title"><span class="num">2</span>Dynamic String Allocation &amp; The +1 Null Terminator Rule ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        When allocating heap memory for text strings, <strong>Always allocate <code>(length + 1)</code> Bytes</strong> to accommodate the essential Sentinel Null Terminator (<code>'\0'</code>)!
      </p>

      <div class="concept-box">
        <h4>📐 Dynamic String Allocation Formula:</h4>
        <p><code>char *heapStr = malloc((strlen(sourceStr) + 1) * sizeof(char));</code><br>
        <code>strcpy(heapStr, sourceStr);</code></p>
      </div>
    </div>

    <!-- 3. Professional Memory Debugging Tools: Valgrind & AddressSanitizer -->
    <div class="section-title"><span class="num">3</span>Memory Debugging Tools: Valgrind Memcheck &amp; AddressSanitizer 🛠️</div>
    <div class="section-body">
      <p class="text-prose">
        Never guess if your application has memory leaks! Use industry-standard memory checkers:
      </p>

      <div class="deep-dive-card">
        <h3>🔍 1. Valgrind Memcheck (Linux / macOS)</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          Compile with debug symbols (<code>gcc -g main.c -o main</code>) and run under Valgrind:<br>
          <code>valgrind --leak-check=full --show-leak-kinds=all ./main</code><br>
          Valgrind will intercept every <code>malloc</code> and <code>free</code>, pin-pointing the exact line number of any un-freed memory leak!
        </p>
      </div>

      <div class="deep-dive-card">
        <h3>⚡ 2. GCC / Clang AddressSanitizer (ASan)</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.8;">
          Compile with ASan instrumentation flags:<br>
          <code>gcc -fsanitize=address -g main.c -o main</code><br>
          Running <code>./main</code> will instantly halt and print a full stack trace upon encountering any buffer overflow, dangling pointer read, or use-after-free!
        </p>
      </div>
    </div>

    <!-- 4. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">4</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Who owns heap memory in C modular design?</h4>
          <p>By convention, the module or function that calls <code>malloc()</code> owns the memory and is responsible for calling <code>free()</code> unless ownership is explicitly transferred via documentation or function return types (e.g. factory functions like <code>createStudent()</code> transferring ownership to caller).</p>
        </div>
        <div class="faq-item">
          <h4>Q2: What is the overhead of malloc in system RAM?</h4>
          <p>Every heap block allocated by <code>malloc</code> incurs 8 to 16 bytes of hidden metadata header overhead stored just before the returned address (storing block size and allocation flags). Allocating millions of tiny 4-byte integers individually wastes more RAM in headers than in data!</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Dynamic Struct Allocation in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this dynamic student allocation demo in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

typedef struct {
    char *name;
    int age;
} Person;

int main(void) {
    Person *p = malloc(sizeof(*p));
    if (p != NULL) {
        p-&gt;name = malloc(20 * sizeof(char));
        strcpy(p-&gt;name, "Dennis Ritchie");
        p-&gt;age = 70;

        printf("Name: %s | Age: %d\\n", p-&gt;name, p-&gt;age);

        // Deallocate inside-out!
        free(p-&gt;name);
        free(p);
        p = NULL;
    }
    return 0;
}</code></pre>
      </div>
      <a class="run-btn" href="/?lang=c">Open in Online C Compiler →</a>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 35, "Phase 13", "Dynamic Memory Management", subtopics, contentBody, '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', '34. realloc(), free() & The 4 Deadly Heap Bugs', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── UPDATE LESSON 32 to link to Lesson 33 ─────────────────────────────────
function updateLesson32() {
  const file32 = path.join(cDir, '32-c-typedef-type-aliases-and-readable-architecture.html');
  const title = "C typedef: Type Aliases, Function Pointer Aliasing & Clean API Design";
  const desc = "Comprehensive textbook-grade masterclass on C typedef (Phase 12 Part 3): Creating expressive domain-specific type aliases, typedef struct and typedef union idioms, aliasing complex function pointers, clean API design, and comprehensive technical FAQs.";
  const subtopics = "typedef ante enti? · Expressive Type Aliases · typedef struct & union · typedef with Function Pointers · Clean API Design · Technical FAQs";

  const currentContent = fs.readFileSync(file32, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '32-c-typedef-type-aliases-and-readable-architecture.html', 32, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '31-c-enumerations-custom-values-and-switch-dispatch.html', '31. Enumerations (enum), Custom Values & Switch', '33-c-stack-vs-heap-malloc-and-calloc.html', '33. Stack vs Heap, malloc(), calloc() & NULL Guards');
  fs.writeFileSync(file32, html, 'utf8');
  console.log('✅ Updated 32-c-typedef-type-aliases-and-readable-architecture.html next links!');
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

// Update all sidebar links across all 35 C lesson files
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
    '32-c-typedef-type-aliases-and-readable-architecture.html',
    '33-c-stack-vs-heap-malloc-and-calloc.html',
    '34-c-realloc-free-and-the-4-deadly-heap-bugs.html',
    '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html'
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, loops, modular functions, arrays, strings, pointers, structures, unions, enums, and dynamic memory allocation (malloc, calloc, realloc, free) with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c loops, c functions, c arrays, c strings, c pointers, c structures, c malloc, c calloc, c realloc, c free" />
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
      <span class="badge">🟢 35 Comprehensive Master Chapters Across 13 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Comprehensive Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, variables, scanf input, conditions, loops, functions, arrays, strings, pointers, structures, unions, enums, or dynamic memory:</p>
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
        <a href="/blog-c/27-c-structures-declaration-memory-model-and-padding.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 11: Structures →</a>
        <a href="/blog-c/30-c-unions-shared-memory-and-variant-types.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 12: Unions & Enums →</a>
        <a href="/blog-c/33-c-stack-vs-heap-malloc-and-calloc.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 13: Dynamic Memory →</a>
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
  console.log('✅ Updated public/blog-c.html with 35 Chapters across 13 Phases!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 13 (Dynamic Memory Management - Massive Content)...');
  buildLesson33();
  buildLesson34();
  buildLesson35();
  updateLesson32();
  cleanAuthorBlockFromAllFiles();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 13 successfully created with massive textbook-grade content density!');
}

run();
