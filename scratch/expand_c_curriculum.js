const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Expanded with 3 to 4 detailed sub-chapters per phase!
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

// ── BUILD LESSON 10: Function Architecture, Prototypes & Lifecycle ────────
function buildLesson10() {
  const title = "C Functions: Architecture, Prototypes, Lifecycle & void";
  const desc = "Deep conceptual masterclass on C Functions (Phase 6 Part 1): What is a function?, modular programming principles, the 3-step function lifecycle (Declaration, Definition, Call), parameter lists vs arguments, why compiler prototypes are mandatory, void functions, and returning values.";
  const filename = "10-c-functions-declaration-definition-and-prototypes.html";
  const subtopics = "Function ante enti? · Modular Programming · 3-Step Lifecycle · Prototypes vs Definitions · Parameters vs Arguments · void Return Types";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 6 (Chapter 10): C Function Architecture, Prototypes & Execution Lifecycle Masterclass</strong>! In real-world software engineering, writing thousands of lines inside a monolithic <code>main()</code> function creates unmaintainable, bug-ridden code. <strong>Functions</strong> enable <em>Modular Programming</em> by decomposing complex algorithms into isolated, independently testable, and reusable logical blocks. In this comprehensive guide, you will master what functions are from a CPU execution standpoint, the 3 structural phases of C functions, why the C compiler demands function prototypes, and the exact difference between formal parameters and runtime arguments.</p>
    </div>

    <!-- 1. Function Fundamentals & Why They Exist -->
    <div class="section-title"><span class="num">1</span>Function Ante Enti? Modular Programming &amp; DRY Principle</div>
    <div class="section-body">
      <p><strong>Function</strong> ante specific task perform cheyyadaniki design chesina <strong>Named, Self-Contained Block of Instructions</strong>. 
      Functions valla programming lo 4 major advantages untayi:</p>

      <div class="concept-box">
        <h4>🌟 The 4 Pillars of Modular Code Design:</h4>
        <p>1. <strong>Reusability (DRY - Don't Repeat Yourself):</strong> Oka computation logic (e.g. Tax calculation, Matrix multiplication) ni single function ga rasi program lo 100 sarlu call cheyyavachu.<br>
        2. <strong>Decomposition &amp; Readability:</strong> Huge complex software ni chinna manageable sub-functions ga divide chesthamu.<br>
        3. <strong>Isolated Debugging &amp; Unit Testing:</strong> Function boundary isolated ga undatam valla logic bug ni ventane catch cheyyavachu.<br>
        4. <strong>Memory Optimization:</strong> Code duplication taggi binary executable file size chala lightweight ga untundhi.</p>
      </div>
    </div>

    <!-- 2. The 3-Step Function Lifecycle -->
    <div class="section-title"><span class="num">2</span>The 3-Step Lifecycle of Every C Function</div>
    <div class="section-body">
      <p>C language single-pass compiler architecture meedha operate avthundhi. Andhuke function use cheyyalante 3 distinct stages compulsory:</p>

      <table class="tbl spec-table">
        <tr><th>Stage</th><th>Syntax Blueprint</th><th>Technical Role in C</th></tr>
        <tr>
          <td><strong>1. Function Declaration (Prototype)</strong></td>
          <td><code>int add(int first, int second);</code></td>
          <td>Compiler ki <code>main()</code> function mundhe function peru, return type, mariyu arguments types ni theliyajesi type-safety verify chesthundi.</td>
        </tr>
        <tr>
          <td><strong>2. Function Call (Invocation)</strong></td>
          <td><code>int result = add(10, 20);</code></td>
          <td>CPU instruction pointer ('IP') ni function memory address ki jump cheyinchi, arguments pass chesi execute chesthundi.</td>
        </tr>
        <tr>
          <td><strong>3. Function Definition (Implementation)</strong></td>
          <td><code>int add(int a, int b) { return a + b; }</code></td>
          <td>Function actual executable instructions ni braces <code>{ ... }</code> lopala provide chesthundi.</td>
        </tr>
      </table>

      <div class="stack-diagram">
        <strong>The 3-Step Lifecycle Visual Pipeline:</strong><br>
        [ 1. Prototype Declaration ]  ---&gt;  int add(int a, int b);   (Tells Compiler: "add expects 2 ints and returns int")<br>
                    │<br>
        [ 2. Function Call in main ]  ---&gt;  int res = add(10, 20);    (Pushes 10, 20 to CPU Stack &amp; Jumps)<br>
                    │<br>
        [ 3. Function Definition ]    ---&gt;  int add(int a, int b) {   (Executes addition &amp; Returns result back to main)<br>
                                                return a + b;<br>
                                            }
      </div>
    </div>

    <!-- 3. Parameters vs Arguments & void Return Types -->
    <div class="section-title"><span class="num">3</span>Parameters vs Arguments &amp; void Return Types</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>🔍 Parameters vs Arguments in Detail</h4>
        <p>• <strong>Formal Parameters:</strong> Function definition header lo declare chesina placeholder variables (e.g. <code>first</code>, <code>second</code>). Function call ayinappudu Stack frame lo memory allocate avthundhi.<br>
        • <strong>Actual Arguments:</strong> Function call chesthunnapudu pass chese real values, expressions, or variables (e.g. <code>10</code>, <code>20</code> or <code>x + 5</code>).<br>
        • <strong><code>void</code> Functions:</strong> Oka function kevalam action perform chesi (e.g. printing to screen or writing to log) emi value return cheyyakapothe daani return type <strong><code>void</code></strong> ga mark chesthamu.</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Standard Example</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Function Prototype
int add(int first, int second);

int main(void) {
    // 2. Function Call
    int result = add(10, 20);
    printf("Sum: %d\\n", result);

    return 0;
}

// 3. Function Definition
int add(int first, int second) {
    return first + second;
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Functions in Online C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this modular arithmetic function in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

double calculateBMI(double weightKg, double heightMeters) {
    return weightKg / (heightMeters * heightMeters);
}

int main(void) {
    double bmi = calculateBMI(70.0, 1.75);
    printf("Calculated BMI: %.2f\\n", bmi);
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

  const html = wrapCPage(title, desc, filename, 10, "Phase 06", "Functions & Modular Architecture", subtopics, contentBody, '09-c-nested-loops-patterns-and-practice-programs.html', '9. Nested Loops, Patterns & 9 Core Programs', '11-c-variable-scope-lifetime-and-static-storage.html', '11. Scope, static Variables & Header Files');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 11: Scope, static Storage & Header Files ────────────────
function buildLesson11() {
  const title = "C Scope, Lifetime, static Storage Class & Header Files (.h)";
  const desc = "Deep architectural masterclass on C Memory Segments (Phase 6 Part 2): RAM layout (Code, Data, BSS, Stack, Heap), Local vs Global variables, the static storage class in C, variable shadowing, and structuring professional multi-file header libraries (.h).";
  const filename = "11-c-variable-scope-lifetime-and-static-storage.html";
  const subtopics = "RAM Memory Segments (Stack, Data, BSS) · Local vs Global Scope · static Local Variables · Variable Shadowing · Header Files (.h)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 6 (Chapter 11): C Memory Segments, Variable Scope, static Storage & Header Architecture Masterclass</strong>! In C, understanding where a variable lives in physical RAM memory is the key difference between novice code and high-performance system programming. In this comprehensive guide, you will master the 5 primary RAM memory segments, local variable stack allocation and destruction, global state lifecycle, the secret persistence of <strong><code>static</code> local variables</strong> in the Data Segment, variable shadowing, and how header files (<code>.h</code>) enable modular code reusability across large C projects.</p>
    </div>

    <!-- 1. The 5 RAM Memory Segments in C -->
    <div class="section-title"><span class="num">1</span>The 5 RAM Memory Segments in C Program Execution</div>
    <div class="section-body">
      <p>Compiled C executable binary RAM lo load ayinappudu 5 distinct memory segments lo organize avthundhi:</p>

      <div class="stack-diagram">
        <strong>RAM Memory Layout of a C Program:</strong><br>
        <br>
        ┌──────────────────────────────────────────────┐ High Memory (0xFFFFFFFF)<br>
        │              STACK SEGMENT                   │ (Grows DOWNWARDS: Local variables, Function call frames)<br>
        │                    ▼                         │<br>
        │                   ...                        │<br>
        │                    ▲                         │<br>
        │              HEAP SEGMENT                    │ (Grows UPWARDS: Dynamic memory malloc() / free())<br>
        ├──────────────────────────────────────────────┤<br>
        │              BSS SEGMENT                     │ (Uninitialized global &amp; static variables, zero-filled by OS)<br>
        ├──────────────────────────────────────────────┤<br>
        │              DATA SEGMENT                    │ (Initialized global &amp; static variables, lives entire program)<br>
        ├──────────────────────────────────────────────┤<br>
        │              TEXT (CODE) SEGMENT             │ (Read-only compiled CPU machine instructions &amp; string literals)<br>
        └──────────────────────────────────────────────┘ Low Memory (0x00000000)
      </div>
    </div>

    <!-- 2. Local vs Global vs static Local Variables -->
    <div class="section-title"><span class="num">2</span>Local vs Global vs static Local Variables (Memory &amp; Lifetime)</div>
    <div class="section-body">
      <table class="tbl spec-table">
        <tr><th>Storage Class</th><th>RAM Segment</th><th>Scope (Visibility)</th><th>Lifetime (Duration in RAM)</th><th>Default Value</th></tr>
        <tr>
          <td><strong>Local Variable (<code>auto</code>)</strong></td>
          <td><strong>Stack Frame</strong></td>
          <td>Only inside the declaring function/block <code>{ ... }</code></td>
          <td>Created on function call; <strong>Destroyed when function exits!</strong></td>
          <td><strong>Garbage junk value!</strong></td>
        </tr>
        <tr>
          <td><strong>Global Variable</strong></td>
          <td><strong>Data Segment</strong></td>
          <td>Accessible across the entire source file</td>
          <td>Created on program launch; <strong>persists until program termination</strong></td>
          <td><strong>Zero (0)</strong> initialized by runtime.</td>
        </tr>
        <tr>
          <td><strong><code>static</code> Local Variable</strong></td>
          <td><strong>Data Segment</strong></td>
          <td>Only inside declaring function (Protected Scope)</td>
          <td><strong>Persists across entire program runtime! Retains state!</strong></td>
          <td><strong>Zero (0)</strong> initialized once.</td>
        </tr>
      </table>

      <div class="concept-box">
        <h4>⚡ The Power of static Local Variables Explained:</h4>
        <p>Normal local variables function return avvagane Stack nunchi wipe out aypothayi. Kaani variable mundhu <code>static</code> pedithe, adhi Stack lo kakunda <strong>Data Segment</strong> lo store avthundhi. Function multiple times call ayina, daani previous value ni <strong>Memory lo gurthupettukuntundhi (State Persistence)</strong>!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — static Persistence Demonstration</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void transactionCounter(void) {
    int regularVar = 0;       // Allocated on Stack: reset to 0 EVERY call!
    static int persistentVar = 100; // Allocated in Data Segment: keeps state!

    regularVar++;
    persistentVar++;

    printf("regularVar = %d (Lost on exit) | persistentVar = %d (Preserved!)\\n", regularVar, persistentVar);
}

int main(void) {
    printf("1st Call: "); transactionCounter();
    printf("2nd Call: "); transactionCounter();
    printf("3rd Call: "); transactionCounter();
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Header Files & Multi-File Architecture -->
    <div class="section-title"><span class="num">3</span>Header Files (.h) &amp; Professional Reusable Architecture</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>📁 Structuring Reusable C Libraries (.h vs .c)</h4>
        <p>• <strong><code>my_library.h</code>:</strong> Function Prototypes, Struct definitions, and Constants (<code>#define</code>) untayi. Multiple files lo include chesinappudu duplicate errors raakunda <strong>Include Guards (<code>#ifndef MY_LIB_H</code>)</strong> vadathamu.<br>
        • <strong><code>my_library.c</code>:</strong> Actual executable function definitions untayi.<br>
        • <strong><code>main.c</code>:</strong> <code>#include "my_library.h"</code> tho functions ni clean ga call chesthundhi.</p>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test static State in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this auto-incrementing unique customer ID generator in our online GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int generateAccountNumber(void) {
    static int accountSeed = 50000;
    return ++accountSeed;
}

int main(void) {
    printf("New Account 1: ACC-%d\\n", generateAccountNumber());
    printf("New Account 2: ACC-%d\\n", generateAccountNumber());
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

  const html = wrapCPage(title, desc, filename, 11, "Phase 06", "Functions & Modular Architecture", subtopics, contentBody, '10-c-functions-declaration-definition-and-prototypes.html', '10. Function Architecture & Prototypes', '12-c-parameter-passing-value-vs-reference.html', '12. Pass-by-Value vs Pass-by-Address');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 12: Pass-by-Value vs Pass-by-Address ────────────────────
function buildLesson12() {
  const title = "C Parameter Passing: Pass-by-Value vs Pass-by-Address (Pointers)";
  const desc = "Deep memory masterclass on Parameter Passing in C (Phase 6 Part 3): Call by Value copy mechanics, Stack frame isolation, Pass by Address (Call by Reference) using pointers, in-place RAM mutation, and returning multiple values from a function.";
  const filename = "12-c-parameter-passing-value-vs-reference.html";
  const subtopics = "Call by Value Copying · Stack Frame Isolation · Pass by Address (&var) · Pointer Mutation (*ptr) · Returning Multiple Values via Pointers";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 6 (Chapter 12): C Parameter Passing — Pass-by-Value vs Pass-by-Address Masterclass</strong>! In C, understanding how arguments travel across RAM memory into function boundaries is the foundational secret to mastering pointers and memory management. In this comprehensive guide, you will master the difference between <strong>Call by Value</strong> (isolated copies in separate stack frames) and <strong>Call by Address / Reference</strong> (in-place memory mutation via pointers), how to swap variables, and how functions can return multiple values through memory addresses.</p>
    </div>

    <!-- 1. Pass-by-Value & Stack Frame Isolation -->
    <div class="section-title"><span class="num">1</span>Pass-by-Value (Default C Behavior) &amp; Stack Frame Isolation</div>
    <div class="section-body">
      <p>By default, C functions use <strong>Pass by Value</strong>. When you pass a variable into a function, CPU creates a <strong>completely independent copy</strong> of that value inside the called function's new Stack Frame:</p>

      <div class="stack-diagram">
        <strong>Stack Frame Isolation During Pass by Value:</strong><br>
        <br>
        [ main() Stack Frame ]       ---&gt; x = 10, y = 20<br>
                  │ (Copies values 10 and 20)<br>
                  ▼<br>
        [ wrongSwap() Stack Frame ]  ---&gt; a = 10, b = 20  (Swaps a and b locally)<br>
                  │<br>
                  ▼ (wrongSwap finishes and its Stack Frame is DESTROYED!)<br>
        [ main() Stack Frame ]       ---&gt; x is STILL 10, y is STILL 20! (NO change in main)
      </div>
    </div>

    <!-- 2. Pass-by-Address (Call by Reference using Pointers) -->
    <div class="section-title"><span class="num">2</span>Pass-by-Address (Call by Reference Using Pointers) ⭐</div>
    <div class="section-body">
      <p>Function caller's memory variables ni directly modify cheyyalante, value kakunda variable యొక్క <strong>RAM Memory Address (<code>&amp;x</code>)</strong> pass chesthamu. Function parameters lo pointer (<code>int* a</code>) tho aa address ni receive chesukuni, dereference operator (<code>*a</code>) tho direct ga main memory slot ni modify chesthundhi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pass-by-Value vs Pass-by-Address (Swapping Demo)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. Pass by Value (Fails to modify caller's variables)
void wrongSwap(int a, int b) {
    int temp = a; a = b; b = temp;
}

// 2. Pass by Address (Modifies caller's RAM memory directly!)
void realSwap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;

    wrongSwap(x, y);
    printf("After wrongSwap: x = %d, y = %d (Unchanged!)\\n", x, y);

    realSwap(&amp;x, &amp;y); // Passing memory addresses &x and &y
    printf("After realSwap:  x = %d, y = %d (Swapped!)\\n", x, y);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Returning Multiple Values via Pointers -->
    <div class="section-title"><span class="num">3</span>Returning Multiple Results from a Function via Pointers</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>💡 How to Return Multiple Values in C?</h4>
        <p>C functions can only return a single value via the <code>return</code> statement. Kaani Pass-by-Address use chesi, multiple variables addresses ni pass cheyyadam dwara, function single execution lo <strong>Multiple Outputs (e.g. Quotient and Remainder)</strong> ni caller ki return cheyyavachu!</p>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Pass-by-Address in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this multi-result computation function (calculating Area and Perimeter simultaneously):</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void getCircleMetrics(double radius, double* area, double* perimeter) {
    *area = 3.14159 * radius * radius;
    *perimeter = 2.0 * 3.14159 * radius;
}

int main(void) {
    double r = 5.0, a, p;
    getCircleMetrics(r, &amp;a, &amp;p);
    printf("Circle (r=%.1f): Area = %.2f, Perimeter = %.2f\\n", r, a, p);
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

  const html = wrapCPage(title, desc, filename, 12, "Phase 06", "Functions & Modular Architecture", subtopics, contentBody, '11-c-variable-scope-lifetime-and-static-storage.html', '11. Scope, static Variables & Header Files', '13-c-recursion-call-stack-and-modular-projects.html', '13. Recursion, Call Stack & 5 Projects');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 13: Recursion, Call Stack & 5 Projects ───────────────────
function buildLesson13() {
  const title = "C Recursion, Call Stack Mechanics & 5 Modular Software Projects";
  const desc = "Deep algorithmic masterclass on C Recursion (Phase 6 Part 4): Inductive mathematical model, base cases, CPU call stack frame pushing/unwinding, stack overflow prevention, and 5 complete modular software projects (Calculator, Student Grading, Number Utility Library, Unit Converter, Menu-driven app).";
  const filename = "13-c-recursion-call-stack-and-modular-projects.html";
  const subtopics = "Recursion Inductive Model · Base Cases · CPU Stack Frame Pushing/Unwinding · Stack Overflow Prevention · 5 Modular Projects (Calculator, Grading, Utilities)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 6 (Chapter 13): C Recursion, CPU Call Stack Mechanics & 5 Modular Projects Masterclass</strong>! Recursion is one of computer science's most elegant algorithmic paradigms, allowing elegant solutions to divide-and-conquer problems, tree traversals, and mathematical sequences. In this comprehensive guide, you will master the internal CPU <strong>Call Stack activation records</strong> during recursive self-invocations, base case boundary rules, preventing catastrophic stack overflows, and construct <strong>5 complete production-grade modular C libraries and projects</strong>.</p>
    </div>

    <!-- 1. Recursion & The Inductive Model -->
    <div class="section-title"><span class="num">1</span>Recursion Mechanics: Base Case &amp; The Inductive Step</div>
    <div class="section-body">
      <p><strong>Recursion</strong> ante oka function thanani thane smaller sub-problem tho call chesukovadam. 
      Every recursive function must strictly satisfy 2 fundamental laws:</p>

      <ol style="margin-left:22px; color:var(--text2); font-size:14.5px; line-height:1.8; margin-bottom:14px;">
        <li><strong>1. The Base Case (Stopping Condition):</strong> Recursion infinite loop lo vellakunda terminate chese boundary check (e.g. <code>if (n &lt;= 1) return 1;</code>). Missing base case causes a fatal <strong>Segmentation Fault / Stack Overflow Crash</strong>!</li>
        <li><strong>2. The Recursive Step:</strong> Problem size ni reduce chesthu smaller input tho self-call cheyyadam (e.g. <code>return n * factorial(n - 1);</code>).</li>
      </ol>

      <div class="stack-diagram">
        <strong>CPU Call Stack Frame Lifecycle for factorial(4):</strong><br>
        <br>
        [ 1. PUSHING FRAMES ON STACK ]            [ 2. UNWINDING &amp; MULTIPLYING ]<br>
        │ factorial(1) -&gt; returns 1 (Base Case)  │  returns 1<br>
        │ factorial(2) -&gt; 2 * factorial(1)       │  returns 2 * 1 = 2<br>
        │ factorial(3) -&gt; 3 * factorial(2)       │  returns 3 * 2 = 6<br>
        │ factorial(4) -&gt; 4 * factorial(3)       │  returns 4 * 6 = 24<br>
        │ main()                                 │  main() receives 24!
      </div>
    </div>

    <!-- 2. The 5 Complete Modular Projects -->
    <div class="section-title"><span class="num">2</span>5 Complete Modular Software Projects (Architecture &amp; Code)</div>
    <div class="section-body">
      <p>Modular software design across 5 practical real-world modules:</p>

      <!-- Project 1 & 2 -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">Projects 1 &amp; 2: Modular Calculator &amp; Student Marks Grading System</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C — Calculator & Student Grading Library</span>
            <a class="try-btn" href="/?lang=c">▶ Run Code</a>
          </div>
          <pre><code>#include &lt;stdio.h&gt;

// --- 1. Modular Calculator Library ---
double calculate(double a, double b, char op) {
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    if (op == '/') return (b != 0.0) ? (a / b) : 0.0;
    return 0.0;
}

// --- 2. Student Marks & Grading Engine ---
char assignGrade(double avg) {
    if (avg &gt;= 90.0) return 'A';
    if (avg &gt;= 75.0) return 'B';
    if (avg &gt;= 50.0) return 'C';
    return 'F';
}

int main(void) {
    printf("1. Calculator: 120 / 4 = %.2f\\n", calculate(120, 4, '/'));
    printf("2. Student Avg (88.5%%) -&gt; Grade: %c\\n", assignGrade(88.5));
    return 0;
}</code></pre>
        </div>
      </div>

      <!-- Project 3, 4, 5 -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">Projects 3, 4 &amp; 5: Number Utility Library, Unit Converter &amp; Recursion Suite</h4>
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

// Recursive Factorial
long long factorial(int n) {
    if (n &lt;= 1) return 1;
    return n * factorial(n - 1);
}

// --- 4. Unit Converter Library ---
double cToF(double c) { return (c * 9.0 / 5.0) + 32.0; }
double kmToMiles(double km) { return km * 0.621371; }

int main(void) {
    printf("3. Number Utility: Is 47 Prime? %s\\n", isPrime(47) ? "YES" : "NO");
    printf("4. Recursion: 5! = %lld\\n", factorial(5));
    printf("5. Converter: 100 km = %.2f Miles | 37°C = %.1f°F\\n", kmToMiles(100), cToF(37));
    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Recursive Fibonacci in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this recursive Fibonacci calculation program in our online GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int fibonacci(int n) {
    if (n &lt;= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main(void) {
    printf("Fibonacci term 7: %d\\n", fibonacci(7));
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

  const html = wrapCPage(title, desc, filename, 13, "Phase 06", "Functions & Modular Architecture", subtopics, contentBody, '12-c-parameter-passing-value-vs-reference.html', '12. Pass-by-Value vs Pass-by-Address', null, null);
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

  const html = wrapCPage(title, desc, '09-c-nested-loops-patterns-and-practice-programs.html', 9, "Phase 05", "Loops & Iterations", subtopics, contentBody, '08-c-loops-for-while-do-while-and-control-flow.html', '8. for, while, do-while, break & continue', '10-c-functions-declaration-definition-and-prototypes.html', '10. Function Architecture & Prototypes');
  fs.writeFileSync(file9, html, 'utf8');
  console.log('✅ Updated 09-c-nested-loops-patterns-and-practice-programs.html next links!');
}

// Update all sidebar links across all 13 C lesson files
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
    '13-c-recursion-call-stack-and-modular-projects.html'
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
      <span class="badge">🟢 13 In-Depth Sub-Chapters Across 6 Phases</span>
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
        <a href="/blog-c/10-c-functions-declaration-definition-and-prototypes.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 6: Functions & Recursion →</a>
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
  console.log('✅ Updated public/blog-c.html with 13 Chapters across 6 Phases!');
}

function run() {
  console.log('🚀 Building C Masterclass Granular Multi-Chapters (Phase 6 expanded to 4 Chapters)...');
  buildLesson10();
  buildLesson11();
  buildLesson12();
  buildLesson13();
  updateLesson9();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 6 successfully expanded with 4 granular, heavy-theory sub-chapters!');
}

run();
