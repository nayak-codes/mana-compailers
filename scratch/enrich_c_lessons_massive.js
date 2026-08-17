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
      padding: 20px 24px;
      margin: 24px 0;
    }
    .concept-box h4 {
      color: #10b981;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 700;
    }
    .concept-box p {
      color: var(--text2);
      font-size: 14.5px;
      line-height: 1.75;
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
      font-size: 13px;
      color: #38bdf8;
      line-height: 1.85;
      margin: 24px 0;
      overflow-x: auto;
      white-space: pre;
    }
    .spec-table th {
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
    }
    .deep-dive-card {
      background: #141922;
      border: 1px solid #27303f;
      border-radius: 10px;
      padding: 22px;
      margin: 24px 0;
    }
    .deep-dive-card h3 {
      color: #10b981;
      font-size: 17px;
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
      padding: 18px 20px;
    }
    .faq-item h4 {
      color: #e6edf3;
      font-size: 15px;
      margin-bottom: 8px;
    }
    .faq-item p {
      color: var(--text2);
      font-size: 14px;
      line-height: 1.7;
      margin: 0;
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
      <span class="badge">📅 2026 Comprehensive Edition</span>
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

// ── BUILD MASSIVELY EXPANDED LESSON 14 ────────────────────────────────────
function buildMassiveLesson14() {
  const title = "C 1D Arrays: Memory Layout, Offset Mathematics & Indexing Deep Dive";
  const desc = "Comprehensive textbook-grade masterclass on C 1D Arrays (Phase 7 Part 1): Contiguous physical RAM layout, memory offset formulas, why C indexing starts at 0, sizeof compile-time length calculation, bounds checking vulnerabilities, and CPU cache line optimizations.";
  const filename = "14-c-arrays-fundamentals-memory-model-and-indexing.html";
  const subtopics = "Array ante enti? · Contiguous Memory Layout · Zero-Based Offset Formula · sizeof Length Idiom · Bounds Checking & Buffer Overflow · CPU Spatial Locality";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 14): C 1D Arrays, Contiguous RAM Memory Architecture & Indexing Deep Dive Masterclass</strong>! When software systems model large datasets—such as processing 10,000 student grades, analyzing audio frequency spectrums, or buffering network packets—creating independent variables like <code>score1, score2, score3...</code> is structurally impossible and unmaintainable. <strong>Arrays</strong> represent the most fundamental linear data structure in C. They allocate a fixed-size sequence of elements of the <em>exact same data type</em> in <strong>strictly contiguous, side-by-side physical memory bytes in your computer's RAM</strong>. In this extensive guide, you will explore the deep physical memory layout of arrays, the mathematical pointer arithmetic formula explaining why C indexing starts at zero, compile-time length deduction, and the severe security risks of out-of-bounds buffer overflows.</p>
    </div>

    <!-- 1. Array Fundamentals & Architectural Definition -->
    <div class="section-title"><span class="num">1</span>Array Ante Enti? Physical Contiguous RAM Memory Architecture</div>
    <div class="section-body">
      <p><strong>Array</strong> ante <strong>Same Data Type (Homogeneous)</strong> unna multiple data elements ni RAM memory lo <strong>Contiguous (Side-by-Side)</strong> memory slots lo store chese fixed-size linear data structure. 
      C lo array declare chesinappudu CPU Stack Memory lo contiguous block of bytes ni allocate chesthundhi.</p>

      <div class="concept-box">
        <h4>🌟 Key Architectural Characteristics of C Arrays:</h4>
        <p>• <strong>Homogeneous:</strong> Array loni prati element compulsory ga same data type ayi undali (e.g. all <code>int</code> or all <code>float</code> or all <code>char</code>).<br>
        • <strong>Contiguous Physical Allocation:</strong> Memory lo madhyalo elanti gaps lekunda side-by-side bytes allocate avthayi.<br>
        • <strong>Random Access in $O(1)$ Constant Time:</strong> Direct memory address calculation valla, array lo 1st element aina or 1,000,000th element aina access cheyyadaniki <strong>same $O(1)$ instant execution time</strong> paduthundhi!<br>
        • <strong>Static Sizing:</strong> Compile time lo allocate chesina array size program run avthunnappudu change cheyyalem (Static memory allocation).</p>
      </div>

      <div class="memory-diagram">
        <strong>RAM Contiguous Memory Architecture for: int marks[4] = {85, 90, 78, 92};</strong><br>
        (Assuming Base Memory Address = 0x2000, where sizeof(int) = 4 Bytes)<br>
        <br>
        RAM Address:       0x2000          0x2004          0x2008          0x200C<br>
                           ┌───────────────┬───────────────┬───────────────┬───────────────┐<br>
        Stored Value:      │      85       │      90       │      78       │      92       │<br>
                           └───────────────┴───────────────┴───────────────┴───────────────┘<br>
        Element Index:         marks[0]        marks[1]        marks[2]        marks[3]<br>
        Offset Math:        (Base + 0*4)    (Base + 1*4)    (Base + 2*4)    (Base + 3*4)<br>
        Hex Byte Size:       [4 Bytes]       [4 Bytes]       [4 Bytes]       [4 Bytes]
      </div>
    </div>

    <!-- 2. The Mathematical Zero-Based Offset Formula -->
    <div class="section-title"><span class="num">2</span>Why Does C Indexing Start at 0? (The Mathematical Offset Formula)</div>
    <div class="section-body">
      <p>Chaala mandhi beginners ki unna doubt: <em>"Counting 1 nunchi start avthundhi kadha, C lo array indexing 0 nunchi endhuku start avthundhi?"</em></p>
      
      <p>C language lo, <code>index</code> anedhi element position number kaadhu! <strong>Index anedhi Base Address nunchi memory lo unna Distance (Memory Offset)</strong>!</p>

      <div class="concept-box">
        <h4>📐 The Core Pointer Offset Formula:</h4>
        <p>$$\\text{Physical Address of } arr[i] = \\text{Base Address} + (i \\times \\text{sizeof(element)})$$<br>
        • <strong>For $i = 0$:</strong> $\\text{Address} = \\text{Base} + (0 \\times 4) = \\text{Base Address}$ (0 offset ante array ekkada start ayyindho akkadidhe first element!).<br>
        • <strong>For $i = 1$:</strong> $\\text{Address} = \\text{Base} + (1 \\times 4) = \\text{Base} + 4$ bytes away.<br>
        • <strong>For $i = 2$:</strong> $\\text{Address} = \\text{Base} + (2 \\times 4) = \\text{Base} + 8$ bytes away.<br>
        <br>
        💡 <em>Hardware Optimization:</em> Index <code>0</code> nunchi start cheyyadam valla CPU processor extra subtraction (<code>index - 1</code>) cheyyalsina avasaram lekunda direct hardware address calculation chesthundi!</p>
      </div>
    </div>

    <!-- 3. Declaration, Initialization & sizeof Length Idiom -->
    <div class="section-title"><span class="num">3</span>Declaration, Initialization Modes &amp; Compile-Time sizeof Length Idiom</div>
    <div class="section-body">
      <p>C provides 4 distinct initialization modes depending on your program's memory needs:</p>

      <table class="tbl spec-table">
        <tr><th>Initialization Syntax</th><th>Memory State in RAM</th><th>Example</th></tr>
        <tr>
          <td><strong>1. Explicit Full Initialization</strong></td>
          <td>Exact number of elements filled into allocated slots.</td>
          <td><code>int arr[4] = {10, 20, 30, 40};</code></td>
        </tr>
        <tr>
          <td><strong>2. Auto-Deduced Size</strong></td>
          <td>Compiler counts list elements and automatically fixes size.</td>
          <td><code>int arr[] = {10, 20, 30, 40};</code> (Size = 4)</td>
        </tr>
        <tr>
          <td><strong>3. Partial &amp; Zero Initialization</strong></td>
          <td>Specified slots filled; remaining unassigned slots are <strong>automatically zero-filled (0)</strong>!</td>
          <td><code>int arr[5] = {10, 20};</code> $\rightarrow$ <code>{10, 20, 0, 0, 0}</code><br><code>int allZero[100] = {0};</code></td>
        </tr>
        <tr>
          <td><strong>4. Uninitialized (Local Array)</strong></td>
          <td>⚠️ Contains random unallocated memory bytes (<strong>Garbage Values</strong>)!</td>
          <td><code>int raw[5];</code> (Do NOT read before writing!)</td>
        </tr>
      </table>

      <div class="deep-dive-card">
        <h3>📐 The Universal C Array Length Idiom</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.7;">
          C language arrays do not contain metadata fields like <code>arr.length</code> (found in Java or JavaScript). To calculate how many elements are present in a stack array, we use the compile-time <code>sizeof</code> ratio:
        </p>
        <div class="concept-box" style="margin:12px 0;">
          $$\\text{Array Length} = \\frac{\\text{sizeof(entire array in bytes)}}{\\text{sizeof(single element in bytes)}} = \\frac{\\text{sizeof(marks)}}{\\text{sizeof(marks[0])}}$$
        </div>
        <p style="color:var(--text2); font-size:13.5px;">
          For <code>int marks[4]</code>: Total bytes = $4 \\times 4 = 16$ bytes. Single element = 4 bytes. $\\frac{16}{4} = 4$ elements!
        </p>
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

    printf("Total elements in marks array: %d\\n", length);

    for (int index = 0; index &lt; length; index++) {
        printf("marks[%d] = %d (RAM Address: %p)\\n", index, marks[index], (void*)&amp;marks[index]);
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 4. Bounds Checking, Buffer Overflows & Security -->
    <div class="section-title"><span class="num">4</span>No Runtime Bounds Checking &amp; Buffer Overflow Dangers ⚠️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The Dangerous Out-of-Bounds Buffer Overflow Vulnerability:</h4>
        <p>Modern high-level languages like Java or Python check index limits at runtime and throw an <code>IndexOutOfBoundsException</code>. 
        Kaani C language lo <strong>Hardware Speed &amp; Zero Runtime Overhead</strong> kosam compiler bounds checking cheyyadhu!<br>
        <br>
        If you declare <code>int arr[4];</code> and write to <code>arr[6] = 999;</code>:<br>
        1. <strong>Memory Corruption:</strong> CPU calculate chesina address lo unna pakka variables or function return address ni overwrite chesthundhi.<br>
        2. <strong>Undefined Behavior (UB):</strong> Program silent ga wrong calculations ivvavachu or unexpected time lo crash avvavachu.<br>
        3. <strong>Segmentation Fault:</strong> OS protect chesina unauthorized memory area ni touch chesthe Operating System program ni kill chesthundi.<br>
        4. <strong>Security Exploits:</strong> World loni 70%+ cyber vulnerabilities (e.g. Stack Smashing) ee C buffer overflow valle jaruguthayi!</p>
      </div>
    </div>

    <!-- 5. Hardware Optimization: CPU Cache Lines & Spatial Locality -->
    <div class="section-title"><span class="num">5</span>Hardware Architecture: CPU Cache Lines &amp; Spatial Locality</div>
    <div class="section-body">
      <p>Arrays modern computer architecture lo fastest data structure endhuku ante <strong>CPU Cache Locality</strong>:</p>

      <div class="concept-box">
        <h4>⚡ Spatial Locality in CPU Caches (L1/L2/L3 Cache)</h4>
        <p>CPU RAM nunchi single variable ni load chesinappudu, kevalam 4 bytes mathrame theesukodhu. CPU memory bus nunchi oka full <strong>Cache Line (usually 64 Bytes)</strong> ni L1 Cache loki load chesthundhi.<br>
        Arrays contiguous ga undatam valla, <code>arr[0]</code> access cheyyagane <code>arr[1], arr[2], arr[3]...</code> already CPU Cache lo ready ga untayi (<strong>Cache Hit</strong>)! Linked Lists tho compare chesthe, Arrays are 10x to 50x faster in raw sequential processing!</p>
      </div>
    </div>

    <!-- 6. Comprehensive FAQ & Interview Section -->
    <div class="section-title"><span class="num">6</span>Frequently Asked Questions &amp; Interview Deep-Dive</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: What happens if an array is partially initialized?</h4>
          <p>If you write <code>int arr[10] = {1, 2};</code>, C standard guarantees that all remaining 8 elements are automatically initialized to zero (<code>0</code>). However, if an array is completely uninitialized (<code>int arr[10];</code>), all slots contain garbage junk values from RAM.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Can we change the size of an array in C after declaration?</h4>
          <p>No. Standard C arrays have fixed compile-time size allocated on the Stack. To resize collections dynamically during runtime, you must use dynamic heap memory allocation via <code>malloc()</code> and <code>realloc()</code>.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Why is <code>sizeof(arr) / sizeof(arr[0])</code> unsafe inside a function?</h4>
          <p>When an array is passed into a function, it automatically decays into a pointer (<code>int*</code>). Inside the function, <code>sizeof(arr)</code> evaluates to the size of the pointer (8 bytes on 64-bit OS), not the full array size, causing incorrect length calculations.</p>
        </div>
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
    int data[] = {12, 45, 78, 23, 56};
    int len = sizeof(data) / sizeof(data[0]);

    printf("Array length = %d\\n", len);
    for (int i = 0; i &lt; len; i++) {
        printf("Index %d: %d\\n", i, data[i]);
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
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD MASSIVELY EXPANDED LESSON 15 ────────────────────────────────────
function buildMassiveLesson15() {
  const title = "C 2D & Multi-Dimensional Arrays: Row-Major RAM Mapping & Matrix Mathematics";
  const desc = "Comprehensive textbook-grade masterclass on C Multi-Dimensional Arrays (Phase 7 Part 2): 2D/3D array abstractions, physical 1D Row-Major linear flattening in RAM, mathematical memory addressing formulas, Matrix Addition, Matrix Transposition, and Character Arrays vs C Strings.";
  const filename = "15-c-multidimensional-arrays-and-matrices.html";
  const subtopics = "2D/3D Array Architecture · Row-Major Memory Mapping Formula · Matrix Addition & Transpose · Array of Characters vs Strings · Multi-Dimensional Indexing";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 15): C 2D & Multi-Dimensional Arrays, Row-Major RAM Mapping & Matrix Mathematics Masterclass</strong>! When software systems model mathematical matrices, tabular spreadsheets, graphic coordinate maps, game boards (such as Chess, Go, or Tic-Tac-Toe), or multidimensional physics tensors, single-dimensional arrays are insufficient. <strong>Multi-Dimensional Arrays</strong> provide the architectural abstraction to organize data across rows and columns. In this comprehensive guide, you will master how physical computer hardware flattens multi-dimensional grids into <strong>linear 1D Row-Major RAM memory bytes</strong>, implement core linear algebra algorithms (Matrix Addition and Matrix Transposition), and compare character arrays with null-terminated C strings.</p>
    </div>

    <!-- 1. 2D Array Abstraction vs Physical Hardware Flattening -->
    <div class="section-title"><span class="num">1</span>2D Array Abstraction vs Physical Row-Major Order in RAM</div>
    <div class="section-body">
      <p>Programmer conceptualizes a 2D array as a Grid table with Rows and Columns (e.g. $2 \\times 3$ matrix). 
      <strong>Kaani physical computer RAM is strictly a single, continuous, linear 1D sequence of byte addresses!</strong></p>

      <p>C language compilers organize multi-dimensional arrays in RAM using <strong>Row-Major Order</strong>: 
      Row 0 is placed in memory first, followed immediately by Row 1, then Row 2, without any gaps.</p>

      <div class="memory-diagram">
        <strong>Physical RAM Flattening: int matrix[2][3] = {{10, 20, 30}, {40, 50, 60}};</strong><br>
        <br>
        Conceptual 2D Grid:               Physical 1D Linear RAM Memory Sequence:<br>
        Row 0: [ 10 ] [ 20 ] [ 30 ]  ───►  [ 10 ][ 20 ][ 30 ]  [ 40 ][ 50 ][ 60 ]<br>
        Row 1: [ 40 ] [ 50 ] [ 60 ]        └───────┬───────┘  └───────┬───────┘<br>
                                               Row 0 Bytes        Row 1 Bytes<br>
        <br>
        RAM Address:  0x3000   0x3004   0x3008   0x300C   0x3010   0x3014<br>
        Stored Value:   10       20       30       40       50       60
      </div>

      <div class="concept-box">
        <h4>📐 The Mathematical 2D Address Calculation Formula:</h4>
        <p>$$\\text{Address of } matrix[i][j] = \\text{Base Address} + \\Big( (i \\times \\text{Total Columns}) + j \\Big) \\times \\text{sizeof(element)}$$<br>
        • <code>i * Total Columns</code> skips all the previous full rows in memory.<br>
        • <code>+ j</code> moves to the target column offset within the current row.<br>
        • Multiplying by <code>sizeof(element)</code> converts the element count into exact physical RAM byte offsets!</p>
      </div>
    </div>

    <!-- 2. Matrix Mathematics & Linear Algebra -->
    <div class="section-title"><span class="num">2</span>Matrix Mathematics: Matrix Addition &amp; Matrix Transpose</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>📐 1. Matrix Addition ($C[i][j] = A[i][j] + B[i][j]$)</h4>
        <p>Rendu matrices ni add cheyyalante, vatiki exact same dimensions $(M \\times N)$ undali. Outer loop rows ni, inner loop columns ni iterate chesthu corresponding element values ni add chesthamu.</p>
      </div>

      <div class="concept-box">
        <h4>🔄 2. Matrix Transposition ($T[j][i] = M[i][j]$)</h4>
        <p>Matrix Transpose ante Rows ni Columns ga, Columns ni Rows ga convert cheyyadam. Original matrix dimension $(M \\times N)$ ayithe, transposed matrix dimension $(N \\times M)$ ga maruthundhi.</p>
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

    <!-- 3. Character Arrays vs C Strings -->
    <div class="section-title"><span class="num">3</span>Array of Characters vs Null-Terminated Strings</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>Attribute</th><th>Raw Character Array (<code>char arr[]</code>)</th><th>Null-Terminated C String (<code>char str[]</code>)</th></tr>
        <tr><td><strong>Null Terminator (<code>'\\0'</code>)</strong></td><td>❌ NOT guaranteed unless manually placed.</td><td>✅ Compulsory automatically appended at end.</td></tr>
        <tr><td><strong>Standard I/O Compatibility</strong></td><td>Cannot be safely printed with <code>%s</code>.</td><td>Fully compatible with <code>printf("%s")</code> &amp; <code>string.h</code>.</td></tr>
        <tr><td><strong>Memory Size</strong></td><td><code>char ch[2] = {'A', 'B'};</code> $\rightarrow$ Takes 2 Bytes.</td><td><code>char str[3] = "AB";</code> $\rightarrow$ Takes 3 Bytes ('A', 'B', '\\0').</td></tr>
      </table>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test 2D Arrays in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this 2D identity matrix generator in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int n = 3;
    for (int i = 0; i &lt; n; i++) {
        for (int j = 0; j &lt; n; j++) {
            printf("%d ", (i == j) ? 1 : 0);
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
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD MASSIVELY EXPANDED LESSON 16 ────────────────────────────────────
function buildMassiveLesson16() {
  const title = "C Passing Arrays to Functions: Pointer Decay & Architectural Limitations";
  const desc = "Deep memory masterclass on Passing Arrays to Functions in C (Phase 7 Part 3): The Pointer Decay mechanism, why sizeof(arr) evaluates to pointer size inside functions, explicit size parameter passing, const array protection, and core architectural limitations of C arrays.";
  const filename = "16-c-passing-arrays-to-functions-and-pointer-decay.html";
  const subtopics = "Pointer Decay Mechanics · Why sizeof(arr) Fails Inside Functions · Explicit Size Passing · const Read-Only Arrays · Array Limitations";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 16): Passing Arrays to Functions, Pointer Decay & Architectural Limitations Masterclass</strong>! In C programming, passing collections across function boundaries is one of the most critical concepts to master. In C, arrays are <em>never passed by value</em>. Instead, the array identifier instantly <strong>decays into a raw pointer pointing to its first memory element (<code>&amp;arr[0]</code>)</strong>. In this in-depth guide, you will master the Pointer Decay mechanism, understand why <code>sizeof</code> fails inside functions, learn how to enforce read-only safety with the <code>const</code> keyword, and explore the fundamental architectural limitations of static C arrays.</p>
    </div>

    <!-- 1. The Pointer Decay Mechanism -->
    <div class="section-title"><span class="num">1</span>The Pointer Decay Mechanism Explained in Depth ⭐</div>
    <div class="section-body">
      <p>When you pass an array name as an argument to a function in C, the entire array is NOT copied onto the function's stack frame. 
      Instead, compiler automatically converts (decays) the array into a <strong>Pointer to its initial element (<code>&amp;arr[0]</code>)</strong>:</p>

      <div class="memory-diagram">
        <strong>Pointer Decay Across Function Boundaries:</strong><br>
        <br>
        In main():       int buffer[1000];   (Occupies 4,000 Bytes on main's Stack Frame)<br>
        Function Call:   processData(buffer);<br>
        <br>
        In function:     void processData(int* ptr)   &lt;--- Receives only an 8-byte pointer address!<br>
        <br>
        • Massive Performance Boost: O(1) instantaneous argument passing (Zero byte-copying).<br>
        • Side-Effect: The function loses all metadata regarding the original array length!
      </div>

      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">⚠️ The Infamous sizeof(arr) Inside Functions Trap:</h4>
        <p>If you execute <code>sizeof(arr)</code> inside a receiving function, it does <strong>NOT</strong> return the size of the array! It returns the size of the pointer variable (<strong>8 bytes on a 64-bit OS</strong>).<br>
        ✅ <strong>The Mandatory C Standard:</strong> You must always pass the array size as an explicit separate parameter:<br>
        <code>void processArray(int arr[], int size);</code> or <code>void processArray(int* arr, int size);</code></p>
      </div>
    </div>

    <!-- 2. In-Place Mutation & const Safety -->
    <div class="section-title"><span class="num">2</span>In-Place Array Mutation &amp; const Read-Only Protection</div>
    <div class="section-body">
      <p>Because the function receives the actual memory address, modifying any element inside the function directly mutates the caller's array in RAM. To guarantee that a function only inspects data without altering it, always prefix the parameter with <strong><code>const</code></strong>:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Array Passing & const Protection Demo</span>
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

// 2. In-Place mutation function (Modifies caller's RAM memory!)
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

    <!-- 3. Architectural Limitations of C Arrays -->
    <div class="section-title"><span class="num">3</span>Architectural Limitations of C Arrays</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>Limitation</th><th>Technical Consequence in C</th><th>Modern Alternative Solution</th></tr>
        <tr><td><strong>Fixed Compile-Time Size</strong></td><td>Static arrays cannot grow or shrink dynamically during runtime.</td><td>Dynamic Heap Memory via <code>malloc()</code> and <code>realloc()</code>.</td></tr>
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
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

// ── BUILD MASSIVELY EXPANDED LESSON 17 ────────────────────────────────────
function buildMassiveLesson17() {
  const title = "C Array Algorithms: Linear Search, Bubble Sort, Min/Max & Manipulation";
  const desc = "Comprehensive algorithmic masterclass on C Array Processing (Phase 7 Part 4): Sum and Average without truncation, Single-pass Min/Max scan, Linear Search algorithm, Bubble Sort with early exit optimization, In-place two-pointer array reversal, and Merging arrays.";
  const filename = "17-c-array-algorithms-searching-sorting-and-manipulation.html";
  const subtopics = "Sum & Average · Min & Max in O(N) · Linear Search Algorithm · Bubble Sort Optimization · In-Place Array Reversal · Merging Arrays";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 7 (Chapter 17): Classical Array Algorithms, Searching, Sorting & Memory Manipulation Masterclass</strong>! Data structures exist to enable efficient algorithms. In this comprehensive guide, you will master the algorithmic architecture, step-by-step memory trace walkthroughs, and time complexities of <strong>6 foundational algorithmic operations</strong>: calculating Sum & Average without integer truncation bugs, single-pass Min/Max searching, Linear Searching, optimized Bubble Sorting with early-termination flags, two-pointer in-place array reversal, and merging arrays into unified memory buffers.</p>
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
  console.log(`✅ Generated MASSIVELY ENRICHED ${filename}`);
}

function run() {
  console.log('🚀 Massively enriching C Phase 7 with deep-dive textbook-grade content...');
  buildMassiveLesson14();
  buildMassiveLesson15();
  buildMassiveLesson16();
  buildMassiveLesson17();
  console.log('🎉 Successfully enriched all 4 chapters of Phase 7!');
}

run();

