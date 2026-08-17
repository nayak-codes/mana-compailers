const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// Helper to generate the accordion sidebar
function generateCAccordionSidebar(currentFile = null) {
  const C_CURRICULUM = [
    {
      id: 'phase1', tag: 'Phase 01', title: 'C Basics & Architecture', icon: '⚡',
      lessons: [ { num: 1, file: '01-c-basics-and-program-structure.html', title: '1. C Fundamentals & Program Architecture' } ]
    },
    {
      id: 'phase2', tag: 'Phase 02', title: 'Variables & Data Types', icon: '📦',
      lessons: [
        { num: 2, file: '02-c-variables-declaration-and-memory-model.html', title: '2. Variables, Memory Model & Scope' },
        { num: 3, file: '03-c-data-types-format-specifiers-and-type-casting.html', title: '3. Data Types, sizeof & Type Casting' }
      ]
    },
    {
      id: 'phase3', tag: 'Phase 03', title: 'Input & Operators', icon: '⚡',
      lessons: [
        { num: 4, file: '04-c-user-input-scanf-and-buffer-handling.html', title: '4. User Input (scanf, fgets & Buffer Traps)' },
        { num: 5, file: '05-c-operators-expressions-and-precedence.html', title: '5. Operators, Precedence & 6 Programs' }
      ]
    },
    {
      id: 'phase4', tag: 'Phase 04', title: 'Conditional Statements & Branching', icon: '🔀',
      lessons: [
        { num: 6, file: '06-c-conditional-branching-if-else-and-logical-operators.html', title: '6. if-else Ladders, Nested if & Logical Logic' },
        { num: 7, file: '07-c-switch-case-and-decision-practice-programs.html', title: '7. switch-case, Fall-Through & 7 Programs' }
      ]
    },
    {
      id: 'phase5', tag: 'Phase 05', title: 'Loops & Iterations', icon: '🔁',
      lessons: [
        { num: 8, file: '08-c-loops-for-while-do-while-and-control-flow.html', title: '8. for, while, do-while, break & continue' },
        { num: 9, file: '09-c-nested-loops-patterns-and-practice-programs.html', title: '9. Nested Loops, Patterns & 9 Core Programs' }
      ]
    },
    {
      id: 'phase6', tag: 'Phase 06', title: 'Functions & Modular Architecture', icon: '🧩',
      lessons: [
        { num: 10, file: '10-c-functions-declaration-definition-and-prototypes.html', title: '10. Function Architecture & Prototypes' },
        { num: 11, file: '11-c-variable-scope-lifetime-and-static-storage.html', title: '11. Scope, static Variables & Header Files' },
        { num: 12, file: '12-c-parameter-passing-value-vs-reference.html', title: '12. Pass-by-Value vs Pass-by-Address' },
        { num: 13, file: '13-c-recursion-call-stack-and-modular-projects.html', title: '13. Recursion, Call Stack & 5 Projects' }
      ]
    },
    {
      id: 'phase7', tag: 'Phase 07', title: 'Arrays & Memory Organization', icon: '📊',
      lessons: [
        { num: 14, file: '14-c-arrays-fundamentals-memory-model-and-indexing.html', title: '14. 1D Arrays, RAM Architecture & Indexing' },
        { num: 15, file: '15-c-multidimensional-arrays-and-matrices.html', title: '15. 2D/3D Arrays, Row-Major & Matrices' },
        { num: 16, file: '16-c-passing-arrays-to-functions-and-pointer-decay.html', title: '16. Passing Arrays to Functions & Pointer Decay' },
        { num: 17, file: '17-c-array-algorithms-searching-sorting-and-manipulation.html', title: '17. Array Algorithms (Search, Sort & Reverse)' }
      ]
    }
  ];

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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c arrays, c memory model, pointers in c, c data structures" />
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

// ── BUILD SUPER MASSIVE LESSON 16: Passing Arrays to Functions & Pointer Decay ────────
function buildSuperMassiveLesson16() {
  const title = "C Passing Arrays to Functions, Pointer Decay & Memory Architecture Masterclass";
  const desc = "Exhaustive textbook-grade masterclass on Passing Arrays to Functions in C (Phase 7 Part 3): The Pointer Decay mechanism, why sizeof fails inside functions, mandatory explicit size passing, const read-only protection, returning arrays and dangling stack pointer traps, multi-dimensional array parameter rules, and enterprise production best practices.";
  const filename = "16-c-passing-arrays-to-functions-and-pointer-decay.html";
  const subtopics = "Pointer Decay Mechanics · Why sizeof(arr) Fails Inside Functions · Explicit Size Passing · const Read-Only Safety · Returning Arrays & Dangling Pointer Pitfall · Multi-Dimensional Function Passing · 6 Production Scenarios";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 16): Passing Arrays to Functions, Pointer Decay & Memory Architecture Masterclass</strong>! In C system programming, mastering how arrays travel across function boundaries is the single most critical bridge between basic syntax and advanced pointer manipulation. In C, arrays are <em>never passed by value</em>. Instead, the array identifier instantly <strong>decays into a raw pointer pointing directly to its first memory element in RAM</strong>. In this exhaustive textbook-grade guide, you will master the deep hardware mechanics of Pointer Decay, understand why <code>sizeof</code> yields pointer sizes inside functions, learn why explicit size parameters are mandatory, explore <code>const</code> read-only memory protection, dissect the fatal dangling stack pointer trap when returning arrays, and examine enterprise production architectures.</p>
    </div>

    <!-- 1. The Philosophy of C's Zero-Copy Memory Model -->
    <div class="section-title"><span class="num">1</span>The Philosophy of C's Zero-Copy Memory Model</div>
    <div class="section-body">
      <p class="text-prose">
        When Dennis Ritchie designed the C programming language at Bell Labs in 1972, hardware memory and CPU processing cycles were extraordinarily precious. 
        If C had adopted a <em>Pass-by-Value</em> model for arrays—where calling a function with a 100,000-element audio buffer would require copying 400,000 bytes of memory onto a new stack frame—programs would crawl to a halt, wasting valuable CPU time and risking immediate <strong>Stack Overflow crashes</strong>.
      </p>

      <div class="concept-box">
        <h4>⚡ Why Zero-Copy Pointer Passing Was Chosen:</h4>
        <p>1. <strong>$O(1)$ Instantaneous Argument Passing:</strong> Passing an array of 1 element or 10,000,000 elements takes the <em>exact same single machine instruction cycle</em> because only a single 64-bit memory address (8 bytes) is placed into a CPU register (like <code>%rdi</code> or <code>%rcx</code>).<br>
        2. <strong>Stack Frame Conservation:</strong> The called function consumes almost zero extra stack space.<br>
        3. <strong>Direct In-Place Mutation:</strong> Functions can filter, sort, and manipulate massive datasets directly in caller memory without expensive round-trip copying!</p>
      </div>
    </div>

    <!-- 2. The Pointer Decay Mechanism Explained in Depth -->
    <div class="section-title"><span class="num">2</span>The Pointer Decay Mechanism Explained in Depth ⭐</div>
    <div class="section-body">
      <p class="text-prose">
        In C, whenever an array identifier is used in an expression—including passing it as a function argument—it automatically <strong>"decays" (converts) into a pointer to its first element (<code>&amp;arr[0]</code>)</strong>. 
        The only exceptions where array decay does NOT happen are when using the <code>sizeof</code> operator on the original declaration or with the address-of operator <code>&amp;arr</code>.
      </p>

      <div class="memory-diagram">
        <strong>Hardware Memory Architecture: Pointer Decay Across Function Stack Frames:</strong><br>
        <br>
        [ main() Stack Frame (RAM Address: 0x7FFF0000) ]<br>
        ┌────────────────────────────────────────────────────────────────────────┐<br>
        │ int dataset[4] = {10, 20, 30, 40};                                     │<br>
        │   0x7FFF0000: [ 10 ]  (dataset[0])  &lt;───┐                              │<br>
        │   0x7FFF0004: [ 20 ]  (dataset[1])      │                              │<br>
        │   0x7FFF0008: [ 30 ]  (dataset[2])      │                              │<br>
        │   0x7FFF000C: [ 40 ]  (dataset[3])      │                              │<br>
        └─────────────────────────────────────────┼──────────────────────────────┘<br>
                                                  │ (Passes Memory Address 0x7FFF0000)<br>
                                                  ▼<br>
        [ processArray() Stack Frame (RAM Address: 0x7FFEFFF0) ]<br>
        ┌────────────────────────────────────────────────────────────────────────┐<br>
        │ int* ptr = 0x7FFF0000; (Contains 8-byte pointer to dataset[0])        │<br>
        │ int size = 4;                                                          │<br>
        └────────────────────────────────────────────────────────────────────────┘
      </div>

      <div class="concept-box">
        <h4>🔍 The 3 Syntactic Forms of Array Parameters (All Are 100% Identical!):</h4>
        <p>In C, the following 3 function signatures look different, but the compiler generates the <strong>exact same assembly machine code</strong> for all three:</p>
        <p>
          • <strong>Form 1 (Pointer notation):</strong> <code>void process(int* arr, int size);</code><br>
          • <strong>Form 2 (Unsized bracket notation):</strong> <code>void process(int arr[], int size);</code><br>
          • <strong>Form 3 (Sized bracket notation):</strong> <code>void process(int arr[100], int size);</code><br>
          <br>
          ⚠️ <em>Note on Form 3:</em> Even if you write <code>arr[100]</code>, the C compiler completely ignores the number <code>100</code>! It is treated purely as <code>int* arr</code>.
        </p>
      </div>
    </div>

    <!-- 3. The Infamous sizeof(arr) Inside Functions Trap -->
    <div class="section-title"><span class="num">3</span>The Infamous sizeof(arr) Inside Functions Trap ⚠️</div>
    <div class="section-body">
      <p class="text-prose">
        One of the most frequent bugs in C programming occurs when developers attempt to compute the length of an array inside a receiving function using the classic <code>sizeof(arr) / sizeof(arr[0])</code> idiom.
      </p>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The Fatal Pointer Size Bug:</h4>
        <p>
          Inside a function, <code>arr</code> is no longer an array—it is a <strong>Pointer Variable</strong>!<br>
          • On a 64-bit operating system (x86_64 / ARM64), all pointers are exactly <strong>8 Bytes</strong>.<br>
          • Therefore, <code>sizeof(arr)</code> evaluates to <code>8</code>.<br>
          • <code>sizeof(arr[0])</code> for an integer evaluates to <code>4</code>.<br>
          • The formula computes: $\\frac{8}{4} = 2$ elements, regardless of whether your original array had 4 elements or 4,000,000 elements!<br>
          <br>
          ✅ <strong>The Golden C Rule:</strong> Always pass the array length as an explicit, separate parameter: <code>void process(int arr[], int size);</code>
        </p>
      </div>
    </div>

    <!-- 4. Modifying Caller Memory vs const Safety -->
    <div class="section-title"><span class="num">4</span>In-Place RAM Mutation vs const Read-Only Protection</div>
    <div class="section-body">
      <p class="text-prose">
        Because the function receives the actual memory address pointing back to the caller's stack frame, any write operation performed via the pointer directly mutates the original data in physical RAM. 
        When designing reusable library functions, you must strictly specify whether a function is an <em>inspector</em> (read-only) or a <em>mutator</em> (write).
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — In-Place Mutation & const Safety Architecture</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Read-Only Function (Enforced by const)
// Guaranteed by the compiler never to alter the caller's RAM memory!
void printArray(const int arr[], int size) {
    printf("Array: [ ");
    for (int i = 0; i &lt; size; i++) {
        printf("%d ", arr[i]);
        // arr[i] = 99; // ❌ COMPILE ERROR: assignment of read-only location '*arr'!
    }
    printf("]\\n");
}

// 2. In-Place Mutator Function (Zero-copy RAM transformation)
void squareElements(int arr[], int size) {
    for (int i = 0; i &lt; size; i++) {
        arr[i] = arr[i] * arr[i]; // Directly mutates main's memory!
    }
}

int main(void) {
    int numbers[] = {2, 4, 6, 8};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original: ");
    printArray(numbers, size);

    // Transforming data in-place
    squareElements(numbers, size);

    printf("After Squaring: ");
    printArray(numbers, size);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 5. Returning Arrays from Functions: The Dangling Stack Pointer Trap -->
    <div class="section-title"><span class="num">5</span>Returning Arrays: The Fatal Dangling Stack Pointer Trap ☠️</div>
    <div class="section-body">
      <p class="text-prose">
        Beginner developers often attempt to create an array inside a helper function and return it like this: <code>int* createArray() { int local[5]; return local; }</code>. 
        <strong>This is a catastrophic memory bug that leads to immediate crashes or silent data corruption!</strong>
      </p>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">☠️ Why Returning Local Array Pointers Fails:</h4>
        <p>
          Local variables live inside the function's <strong>Stack Frame</strong>. 
          When the function returns, its stack frame is instantly <strong>popped and destroyed</strong>! 
          The returned pointer now points to "dead" deallocated memory (<strong>Dangling Pointer</strong>). 
          The next function call will overwrite that exact memory location with new stack data, corrupting your program!
        </p>
      </div>

      <div class="deep-dive-card">
        <h3>✅ The 3 Professional Ways to Return Array Data in C:</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.75;">
          1. <strong>Caller-Allocated Destination Buffer (Most Common &amp; Safest):</strong> Caller passes an output array buffer for the function to populate: <code>void generateData(int outputBuffer[], int size);</code><br>
          2. <strong>Dynamic Heap Memory (<code>malloc</code>):</strong> Allocate memory on the Heap which persists across function returns until explicitly freed: <code>int* arr = malloc(size * sizeof(int));</code><br>
          3. <strong>Static Local Array (Specialized):</strong> Declare the array as <code>static int arr[10];</code> so it resides in the permanent Data Segment rather than the ephemeral stack.
        </p>
      </div>
    </div>

    <!-- 6. Passing Multi-Dimensional (2D) Arrays to Functions -->
    <div class="section-title"><span class="num">6</span>Passing Multi-Dimensional (2D) Arrays to Functions</div>
    <div class="section-body">
      <p class="text-prose">
        When passing a 2D array (e.g. a $3 \\times 4$ matrix) to a function, you <strong>MUST explicitly declare the column dimension in the parameter</strong>:
      </p>

      <div class="concept-box">
        <h4>📐 Why is the Column Size Mandatory in Parameter Declarations?</h4>
        <p>
          Recall the 2D Row-Major memory offset calculation formula:<br>
          $$\\text{Address} = \\text{Base} + (i \\times \\text{COLS} + j) \\times \\text{sizeof(element)}$$<br>
          To compute where Row $i$ begins in physical RAM, the compiler <strong>MUST know how many columns are in each row</strong>! 
          Therefore, <code>void processMatrix(int mat[][4], int rows);</code> is valid, but <code>void processMatrix(int mat[][], int rows);</code> will trigger a fatal compilation error!
        </p>
      </div>
    </div>

    <!-- 7. Comprehensive Architecture Comparison Table -->
    <div class="section-title"><span class="num">7</span>Comprehensive Memory Model Comparison Table</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>Passing Mechanism</th><th>Memory Overhead</th><th>Execution Speed</th><th>Caller Data Safety</th><th>Use Case</th></tr>
        <tr>
          <td><strong>Pass by Value (Primitives)</strong></td>
          <td>Copies 4 to 8 bytes to stack.</td>
          <td>Ultra-fast ($O(1)$)</td>
          <td>✅ 100% Isolated &amp; Safe</td>
          <td>Single numbers, flags, characters.</td>
        </tr>
        <tr>
          <td><strong>Pass by Pointer Decay (Arrays)</strong></td>
          <td>Only 8-byte pointer address.</td>
          <td>Blazing fast ($O(1)$)</td>
          <td>⚠️ Mutates caller RAM directly!</td>
          <td>Sorting, filtering large datasets.</td>
        </tr>
        <tr>
          <td><strong><code>const</code> Array Passing</strong></td>
          <td>Only 8-byte pointer address.</td>
          <td>Blazing fast ($O(1)$)</td>
          <td>✅ Compiler-enforced Read-Only</td>
          <td>Printing, searching, computing metrics.</td>
        </tr>
        <tr>
          <td><strong>Pass by Struct Wrap</strong></td>
          <td>Copies entire struct bytes.</td>
          <td>Slow for large sizes ($O(N)$)</td>
          <td>✅ Copies full data</td>
          <td>Fixed coordinate points (e.g. <code>Point2D</code>).</td>
        </tr>
      </table>
    </div>

    <!-- 8. Real-World Production Case Studies -->
    <div class="section-title"><span class="num">8</span>Real-World Enterprise Production Scenarios</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>🏢 Where Array Pointer Passing Powers Real Systems:</h4>
        <p>• <strong>Linux Kernel Device Drivers:</strong> Network cards pass raw packet byte buffers (<code>char buffer[], int len</code>) directly into kernel ring buffers without memory copying.<br>
        • <strong>Database Storage Engines (Redis / SQLite):</strong> Page cache managers read 4KB disk blocks into in-memory arrays and pass them to indexing functions.<br>
        • <strong>Audio &amp; DSP Processing:</strong> Real-time audio engines process 512-sample PCM audio frames in-place using SIMD vectorized pointer arithmetic.</p>
      </div>
    </div>

    <!-- 9. Comprehensive FAQ & Interview Deep-Dive -->
    <div class="section-title"><span class="num">9</span>Frequently Asked Questions &amp; Technical Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What is the exact difference between <code>int* arr</code> and <code>int arr[]</code> in a function parameter?</h4>
          <p>There is absolutely zero difference. Under the C standard (C17 §6.7.6.3), any parameter declared with array type is automatically adjusted to a pointer to the element type. <code>int arr[]</code> is purely syntactic sugar for <code>int* arr</code>.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Can we use pointer arithmetic on array parameters inside a function?</h4>
          <p>Yes! Because <code>arr</code> is a real pointer variable on the function's stack frame, you can perform operations like <code>arr++</code> to advance through elements. Note that on the original array in <code>main()</code>, writing <code>numbers++</code> is illegal because an array name is a constant pointer r-value.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Why can't we determine the size of a dynamically passed array inside a function?</h4>
          <p>Arrays in C are raw memory buffers with zero metadata headers. When decay occurs, the compiler retains only the memory address of the first element. The length information is completely erased, necessitating explicit size arguments.</p>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Array Passing in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this array scalar addition function in our online GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void addBonus(int scores[], int size, int bonus) {
    for (int i = 0; i &lt; size; i++) {
        scores[i] += bonus;
    }
}

int main(void) {
    int scores[] = {75, 82, 90};
    int n = sizeof(scores) / sizeof(scores[0]);

    addBonus(scores, n, 5);

    printf("Updated Scores: ");
    for (int i = 0; i &lt; n; i++) printf("%d ", scores[i]);
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
  console.log(`✅ Generated SUPER MASSIVELY ENRICHED ${filename}`);
}

function run() {
  console.log('🚀 Super-Enriching C Phase 7 Lesson 16 with exhaustive textbook-grade depth...');
  buildSuperMassiveLesson16();
  console.log('🎉 Successfully super-enriched Lesson 16!');
}

run();
