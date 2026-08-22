const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// Helper to escape HTML special characters inside text
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Complete 22 Phases Curriculum definition for Accordion Sidebar
const C_CURRICULUM = [
  { id: 'phase1', tag: 'Phase 01', title: 'C Basics & Architecture', icon: '⚡', lessons: [{ num: 1, file: '01-c-basics-and-program-structure.html', title: '1. C Fundamentals & Program Architecture' }] },
  { id: 'phase2', tag: 'Phase 02', title: 'Variables & Data Types', icon: '📦', lessons: [{ num: 2, file: '02-c-variables-declaration-and-memory-model.html', title: '2. Variables, Memory Model & Scope' }, { num: 3, file: '03-c-data-types-format-specifiers-and-type-casting.html', title: '3. Data Types, sizeof & Type Casting' }] },
  { id: 'phase3', tag: 'Phase 03', title: 'Input & Operators', icon: '⚡', lessons: [{ num: 4, file: '04-c-user-input-scanf-and-buffer-handling.html', title: '4. User Input (scanf, fgets & Buffer Traps)' }, { num: 5, file: '05-c-operators-expressions-and-precedence.html', title: '5. Operators, Precedence & 6 Programs' }] },
  { id: 'phase4', tag: 'Phase 04', title: 'Conditional Statements & Branching', icon: '🔀', lessons: [{ num: 6, file: '06-c-conditional-branching-if-else-and-logical-operators.html', title: '6. if-else Ladders, Nested if & Logical Logic' }, { num: 7, file: '07-c-switch-case-and-decision-practice-programs.html', title: '7. switch-case, Fall-Through & 7 Programs' }] },
  { id: 'phase5', tag: 'Phase 05', title: 'Loops & Iterations', icon: '🔁', lessons: [{ num: 8, file: '08-c-loops-for-while-do-while-and-control-flow.html', title: '8. for, while, do-while, break & continue' }, { num: 9, file: '09-c-nested-loops-patterns-and-practice-programs.html', title: '9. Nested Loops, Patterns & 9 Core Programs' }] },
  { id: 'phase6', tag: 'Phase 06', title: 'Functions & Modular Architecture', icon: '🧩', lessons: [{ num: 10, file: '10-c-functions-declaration-definition-and-prototypes.html', title: '10. Function Architecture & Prototypes' }, { num: 11, file: '11-c-variable-scope-lifetime-and-static-storage.html', title: '11. Scope, static Variables & Header Files' }, { num: 12, file: '12-c-parameter-passing-value-vs-reference.html', title: '12. Pass-by-Value vs Pass-by-Address' }, { num: 13, file: '13-c-recursion-call-stack-and-modular-projects.html', title: '13. Recursion, Call Stack & 5 Projects' }] },
  { id: 'phase7', tag: 'Phase 07', title: 'Arrays & Memory Organization', icon: '📊', lessons: [{ num: 14, file: '14-c-arrays-fundamentals-memory-model-and-indexing.html', title: '14. 1D Arrays, RAM Architecture & Indexing' }, { num: 15, file: '15-c-multidimensional-arrays-and-matrices.html', title: '15. 2D/3D Arrays, Row-Major & Matrices' }, { num: 16, file: '16-c-passing-arrays-to-functions-and-pointer-decay.html', title: '16. Passing Arrays to Functions & Pointer Decay' }, { num: 17, file: '17-c-array-algorithms-searching-sorting-and-manipulation.html', title: '17. Array Algorithms (Search, Sort & Reverse)' }] },
  { id: 'phase8', tag: 'Phase 08', title: 'Strings & Text Processing', icon: '🔤', lessons: [{ num: 18, file: '18-c-strings-null-terminator-and-safe-io.html', title: '18. Strings, Null Terminator & Safe I/O' }, { num: 19, file: '19-c-string-library-functions-and-security.html', title: '19. <string.h> Functions & Buffer Security' }, { num: 20, file: '20-c-string-algorithms-and-text-processing-projects.html', title: '20. String Algorithms & 6 Text Projects' }] },
  { id: 'phase9', tag: 'Phase 09', title: 'Pointers & Memory Architecture', icon: '🎯', lessons: [{ num: 21, file: '21-c-pointers-memory-addresses-and-dereferencing.html', title: '21. Pointers, RAM Addresses & Dereferencing' }, { num: 22, file: '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html', title: '22. Pointer Arithmetic, Arrays & const Qualifiers' }, { num: 23, file: '23-c-double-pointers-function-pointers-and-safety.html', title: '23. Double Pointers, Function Pointers & Safety' }] },
  { id: 'phase10', tag: 'Phase 10', title: 'Pointers and Functions', icon: '⚙️', lessons: [{ num: 24, file: '24-c-pointers-and-functions-call-by-reference.html', title: '24. Passing Addresses, Swapping & Returning Pointers' }, { num: 25, file: '25-c-pointer-parameters-arrays-and-const-protection.html', title: '25. Array/String Pointer Parameters & const Safety' }, { num: 26, file: '26-c-function-pointers-callbacks-and-event-systems.html', title: '26. Function Pointers, Callbacks & Event Systems' }] },
  { id: 'phase11', tag: 'Phase 11', title: 'Structures & Data Packing', icon: '🏗️', lessons: [{ num: 27, file: '27-c-structures-declaration-memory-model-and-padding.html', title: '27. Structures, RAM Memory Model & Padding Holes' }, { num: 28, file: '28-c-structure-arrays-pointers-and-arrow-operator.html', title: '28. Structure Arrays, Pointers & Arrow Operator (->)' }, { num: 29, file: '29-c-self-referential-structures-file-io-and-5-projects.html', title: '29. Self-Referential Structs, Binary I/O & 5 Projects' }] },
  { id: 'phase12', tag: 'Phase 12', title: 'Unions, Enums & Typedef', icon: '🔀', lessons: [{ num: 30, file: '30-c-unions-shared-memory-and-variant-types.html', title: '30. Unions, Shared Memory & Variant Data Types' }, { num: 31, file: '31-c-enumerations-custom-values-and-switch-dispatch.html', title: '31. Enumerations (enum), Custom Values & Switch' }, { num: 32, file: '32-c-typedef-type-aliases-and-readable-architecture.html', title: '32. typedef, Type Aliases & Expressive Architecture' }] },
  { id: 'phase13', tag: 'Phase 13', title: 'Dynamic Memory Management', icon: '💾', lessons: [{ num: 33, file: '33-c-stack-vs-heap-malloc-and-calloc.html', title: '33. Stack vs Heap, malloc(), calloc() & NULL Guards' }, { num: 34, file: '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', title: '34. realloc(), free() & The 4 Deadly Heap Bugs' }, { num: 35, file: '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', title: '35. Dynamic Collections, Ownership & Valgrind Debugging' }] },
  { id: 'phase14', tag: 'Phase 14', title: 'File Handling & I/O Streams', icon: '📁', lessons: [{ num: 36, file: '36-c-file-handling-fopen-fclose-and-text-io.html', title: '36. File Streams, fopen(), fclose() & Text I/O' }, { num: 37, file: '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', title: '37. Binary File I/O, Struct Serialization & fseek()' }, { num: 38, file: '38-c-file-error-handling-feof-ferror-and-errno.html', title: '38. File Error Handling, EOF, ferror() & errno' }] },
  { id: 'phase15', tag: 'Phase 15', title: 'Preprocessor & Header Files', icon: '⚙️', lessons: [{ num: 39, file: '39-c-preprocessor-directives-and-macro-pitfalls.html', title: '39. Preprocessor Directives & Macro Pitfalls' }, { num: 40, file: '40-c-conditional-compilation-and-include-guards.html', title: '40. Conditional Compilation & Include Guards' }, { num: 41, file: '41-c-modular-architecture-headers-linkage-and-compilation-units.html', title: '41. Modular Architecture, Headers & Linkage' }] },
  { id: 'phase16', tag: 'Phase 16', title: 'Command-Line Arguments', icon: '💻', lessons: [{ num: 42, file: '42-c-command-line-arguments-argc-argv-and-parsing.html', title: '42. Command-Line Arguments (argc, argv & Parsing)' }, { num: 43, file: '43-c-cli-tool-building-exit-codes-and-environment-variables.html', title: '43. Building CLI Tools, Exit Codes & Environment' }] },
  { id: 'phase17', tag: 'Phase 17', title: 'Standard Library Deep-Dive', icon: '📚', lessons: [{ num: 44, file: '44-c-standard-library-io-utility-math-and-strings.html', title: '44. Standard Library: I/O, Utilities, Math & Strings' }, { num: 45, file: '45-c-standard-library-time-booleans-and-fixed-width-integers.html', title: '45. Standard Library: Time, Booleans & Integers' }, { num: 46, file: '46-c-standard-library-assertions-error-handling-and-stddef.html', title: '46. Standard Library: Assertions & Error Handling' }] },
  { id: 'phase18', tag: 'Phase 18', title: 'Data Structures in C', icon: '🌳', lessons: [{ num: 47, file: '47-c-data-structures-singly-doubly-and-circular-linked-lists.html', title: '47. Linked Lists: Singly, Doubly & Circular' }, { num: 48, file: '48-c-data-structures-stacks-and-queues-arrays-vs-linked-lists.html', title: '48. Stacks & Queues: Arrays vs Linked Lists' }, { num: 49, file: '49-c-data-structures-binary-trees-and-binary-search-trees.html', title: '49. Binary Trees & Binary Search Trees (BST)' }, { num: 50, file: '50-c-data-structures-graph-representations-and-traversals.html', title: '50. Graph Representations & BFS/DFS Traversals' }, { num: 51, file: '51-c-data-structures-hash-tables-and-collision-resolution.html', title: '51. Hash Tables & Collision Resolution' }] },
  { id: 'phase19', tag: 'Phase 19', title: 'Algorithms & Big-O Complexity', icon: '⚡', lessons: [{ num: 52, file: '52-c-algorithms-big-o-complexity-searching-and-sorting.html', title: '52. Big-O Complexity, Searching & Sorting' }, { num: 53, file: '53-c-algorithms-recursion-divide-and-conquer-and-greedy-strategies.html', title: '53. Divide-and-Conquer & Greedy Strategies' }, { num: 54, file: '54-c-algorithms-dynamic-programming-backtracking-and-graph-search.html', title: '54. Dynamic Programming, Backtracking & Search' }] },
  { id: 'phase20', tag: 'Phase 20', title: 'Debugging & Safe C Programming', icon: '🛡️', lessons: [{ num: 55, file: '55-c-debugging-compiler-warnings-and-gdb-debugger.html', title: '55. Compiler Warning Flags (-Wall) & GDB Debugger' }, { num: 56, file: '56-c-security-vulnerabilities-buffer-overflows-and-undefined-behavior.html', title: '56. Security Vulnerabilities & Undefined Behavior' }, { num: 57, file: '57-c-defensive-c-programming-sanitizers-and-static-analysis.html', title: '57. Defensive Programming, Sanitizers & Static Analysis' }] },
  { id: 'phase21', tag: 'Phase 21', title: 'Build Systems, Makefiles & CMake', icon: '🛠️', lessons: [{ num: 58, file: '58-c-multi-file-projects-compilation-pipeline-and-linking.html', title: '58. Multi-File Projects & Compilation Pipeline' }, { num: 59, file: '59-c-libraries-static-lib-vs-shared-so-dll-libraries.html', title: '59. Static (.a) vs Dynamic Shared (.so / .dll) Libraries' }, { num: 60, file: '60-c-build-tools-makefiles-cmake-and-git-ci-cd.html', title: '60. Build Automation: Makefiles, CMake & Git CI/CD' }] },
  { id: 'phase22', tag: 'Phase 22', title: 'System Programming & Embedded C', icon: '🚀', lessons: [{ num: 61, file: '61-c-system-programming-posix-system-calls-processes-and-ipc.html', title: '61. POSIX System Calls, Processes & IPC' }, { num: 62, file: '62-c-concurrency-pthreads-mutexes-and-race-conditions.html', title: '62. POSIX Threads (pthreads), Mutexes & Concurrency' }, { num: 63, file: '63-c-network-programming-bsd-sockets-and-tcp-udp-client-server.html', title: '63. Network Programming: BSD Sockets & TCP/UDP' }, { num: 64, file: '64-c-embedded-c-hardware-registers-bit manipulation-and-microcontrollers.html', title: '64. Embedded C, Hardware Registers & Microcontrollers' }, { num: 65, file: '65-c-master-project-roadmap-and-systems-portfolio.html', title: '65. C Master Project Roadmap & Systems Portfolio' }] }
];

function generateCAccordionSidebar(currentFile) {
  let html = '    <div class="sidebar-accordion">\n';
  C_CURRICULUM.forEach(phase => {
    const hasActive = phase.lessons.some(l => l.file === currentFile);
    const isOpen = hasActive || (currentFile === null && phase.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';

    html += '      <button class="accordion-header' + activeHeaderClass + '" onclick="toggleAccordion(this)">\n';
    html += '        <div class="accordion-header-main">\n';
    html += '          <span class="phase-icon-box">' + phase.icon + '</span>\n';
    html += '          <div class="phase-info">\n';
    html += '            <span class="phase-tag">' + phase.tag + '</span>\n';
    html += '            <span class="phase-title">' + phase.title + '</span>\n';
    html += '          </div>\n';
    html += '        </div>\n';
    html += '        <div class="accordion-header-meta">\n';
    html += '          <span class="phase-count-badge">' + phase.lessons.length + ' Ch</span>\n';
    html += '          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>\n';
    html += '        </div>\n';
    html += '      </button>\n';
    html += '      <div class="accordion-content' + openContentClass + '">\n';
    phase.lessons.forEach(l => {
      const isActive = l.file === currentFile ? ' class="active"' : '';
      html += '        <a href="/blog-c/' + l.file + '"' + isActive + '>' + l.title + '</a>\n';
    });
    html += '      </div>\n\n';
  });
  html += '    </div>\n';
  return html;
}

function wrapCPage(title, desc, filename, currentNum, phaseTag, phaseTitle, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateCAccordionSidebar(filename);

  let navFooterHtml = '<div class="nav-footer">\n';
  if (prevFile) {
    navFooterHtml += '  <a href="' + prevFile + '" class="nav-btn">\n    <span class="label">← Previous Lesson</span>\n    <span class="title">' + prevTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-c.html" class="nav-btn">\n    <span class="label">← C Course Overview</span>\n    <span class="title">Course Home & Index</span>\n  </a>\n';
  }
  if (nextFile) {
    navFooterHtml += '  <a href="' + nextFile + '" class="nav-btn" style="text-align:right;">\n    <span class="label">Next Lesson →</span>\n    <span class="title">' + nextTitle + '</span>\n  </a>\n';
  } else {
    navFooterHtml += '  <a href="/blog-c.html" class="nav-btn" style="text-align:right;">\n    <span class="label">Course Index →</span>\n    <span class="title">C Master Index</span>\n  </a>\n';
  }
  navFooterHtml += '</div>';

  return '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + title + ' — C Master Tutorial | Our Compiler</title>\n' +
'  <meta name="description" content="' + desc + '" />\n' +
'  <meta name="keywords" content="c tutorial, ' + title.toLowerCase() + ', c programming, gcc, c data structures, c algorithms, c system programming" />\n' +
'  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />\n' +
'  <link rel="icon" type="image/png" href="/logo.png" />\n' +
'  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/' + filename + '" />\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
'  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />\n' +
'  <link rel="stylesheet" href="/blog-style.css" />\n' +
'  <link rel="stylesheet" href="/blog-c/style.css" />\n' +
'  <link rel="stylesheet" href="/site-nav.css" />\n' +
'  <style>\n' +
'    .concept-box { background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.25); border-left: 4px solid #10b981; border-radius: 8px; padding: 22px 26px; margin: 24px 0; }\n' +
'    .concept-box h4 { color: #10b981; margin-bottom: 10px; font-size: 16.5px; font-weight: 700; }\n' +
'    .concept-box p { color: var(--text2); font-size: 15px; line-height: 1.8; margin: 0 0 10px 0; }\n' +
'    .memory-diagram { background: #0f141c; border: 1px solid #27303f; border-radius: 10px; padding: 22px; font-family: "JetBrains Mono", monospace; font-size: 13.5px; color: #38bdf8; line-height: 1.85; margin: 24px 0; overflow-x: auto; white-space: pre; }\n' +
'    .spec-table th { background: rgba(16, 185, 129, 0.12); color: #10b981; font-size: 14.5px; }\n' +
'    .deep-dive-card { background: #141922; border: 1px solid #27303f; border-radius: 10px; padding: 24px; margin: 26px 0; }\n' +
'    .deep-dive-card h3 { color: #10b981; font-size: 17.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }\n' +
'    .faq-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 24px 0; }\n' +
'    .faq-item { background: var(--bg2); border: 1px solid var(--border); border-left: 4px solid #10b981; border-radius: 8px; padding: 20px 22px; }\n' +
'    .faq-item h4 { color: #e6edf3; font-size: 15.5px; margin-bottom: 8px; }\n' +
'    .faq-item p { color: var(--text2); font-size: 14.5px; line-height: 1.75; margin: 0; }\n' +
'    .text-prose { font-size: 15.5px; line-height: 1.85; color: var(--text); margin-bottom: 18px; }\n' +
'  </style>\n' +
'  <script>\n' +
'    function toggleAccordion(btn) {\n' +
'      const content = btn.nextElementSibling;\n' +
'      const isOpen = content.classList.contains("open");\n' +
'      if (isOpen) {\n' +
'        content.classList.remove("open");\n' +
'        btn.classList.remove("active");\n' +
'      } else {\n' +
'        content.classList.add("open");\n' +
'        btn.classList.add("active");\n' +
'      }\n' +
'    }\n' +
'    window.addEventListener("DOMContentLoaded", () => {\n' +
'      document.querySelectorAll(".code-block").forEach(block => {\n' +
'        const header = block.querySelector(".code-block-header");\n' +
'        const codeEl = block.querySelector("pre code");\n' +
'        if (!header || !codeEl) return;\n' +
'        let actionsContainer = header.querySelector(".code-actions");\n' +
'        if (!actionsContainer) {\n' +
'          actionsContainer = document.createElement("div");\n' +
'          actionsContainer.className = "code-actions";\n' +
'          actionsContainer.style.cssText = "display: flex; gap: 8px; align-items: center; margin-left: auto;";\n' +
'          const tryBtn = header.querySelector(".try-btn");\n' +
'          if (tryBtn) actionsContainer.appendChild(tryBtn);\n' +
'          header.appendChild(actionsContainer);\n' +
'        }\n' +
'        const copyBtn = document.createElement("button");\n' +
'        copyBtn.className = "copy-btn";\n' +
'        copyBtn.innerHTML = "📋 Copy";\n' +
'        copyBtn.style.cssText = "background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; font-family: Inter, sans-serif; white-space: nowrap;";\n' +
'        copyBtn.addEventListener("click", () => {\n' +
'          navigator.clipboard.writeText(codeEl.textContent).then(() => {\n' +
'            copyBtn.innerHTML = "✅ Copied!";\n' +
'            setTimeout(() => { copyBtn.innerHTML = "📋 Copy"; }, 2000);\n' +
'          });\n' +
'        });\n' +
'        actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);\n' +
'      });\n' +
'    });\n' +
'  </script>\n' +
'</head>\n' +
'<body class="lang-c">\n' +
'<nav class="topnav">\n' +
'  <a href="/" class="brand">🖥️ Our Compiler</a>\n' +
'  <a href="/blog-python.html">Python</a>\n' +
'  <a href="/blog-java.html">Java</a>\n' +
'  <a href="/blog-javascript.html">JavaScript</a>\n' +
'  <a href="/blog-c.html" class="active">C</a>\n' +
'  <a href="/blog-cpp.html">C++</a>\n' +
'  <a href="/?lang=csharp">C#</a>\n' +
'  <a href="/blog-go.html">Go</a>\n' +
'  <a href="/blog-ruby.html">Ruby</a>\n' +
'  <a href="/blog-rust.html">Rust</a>\n' +
'  <a href="/blog-php.html">PHP</a>\n' +
'  <a href="/online-html-editor.html">HTML/CSS/JS</a>\n' +
'</nav>\n' +
'<div class="layout">\n' +
'  <aside class="sidebar">\n' +
'    <div class="sidebar-heading">C Master Course</div>\n' +
'    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>\n' +
accordionSidebar +
'    <div class="sidebar-heading">Interactive IDE</div>\n' +
'    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>\n' +
'    <a href="/blog.html">📚 All Tutorials</a>\n' +
'  </aside>\n' +
'  <main class="content">\n' +
'    <div class="breadcrumb">\n' +
'      <a href="/">Home</a><span class="sep">›</span>\n' +
'      <a href="/blog.html">Tutorials</a><span class="sep">›</span>\n' +
'      <a href="/blog-c.html">C Programming</a><span class="sep">›</span>\n' +
'      <span class="current">Lesson ' + currentNum + ': ' + title + '</span>\n' +
'    </div>\n' +
'    <h1 class="page-title">' + title + '</h1>\n' +
'    <div class="page-meta">\n' +
'      <span class="badge">⚡ C (C17 / C23 Standard)</span>\n' +
'      <span class="badge">🟢 Lesson ' + currentNum + '</span>\n' +
'      <span class="badge">📂 ' + phaseTag + ': ' + phaseTitle + '</span>\n' +
'      <span class="badge">📅 2026 Comprehensive Master Edition</span>\n' +
'    </div>\n' +
'    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">\n' +
'      <span style="color:#10b981; font-weight:700;">📌 Covered in this in-depth guide:</span>\n' +
'      <span>' + subtopics + '</span>\n' +
'    </div>\n' +
contentBody + '\n' +
navFooterHtml + '\n' +
'  </main>\n' +
'</div>\n' +
'  <script src="/site-nav.js" defer></script>\n' +
'</body>\n' +
'</html>';
}

console.log('Script template ready. Building MASSIVE textbook content...');
