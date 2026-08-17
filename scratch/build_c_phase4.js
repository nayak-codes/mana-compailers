const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1 to Phase 4 (with multiple sub-chapters per phase!)
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c if else, c switch case, c conditions, c leap year program, c calculator switch" />
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
    .flow-diagram {
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

// ── BUILD LESSON 6: if-else Ladders, Nested if & Logical Logic ───────────
function buildLesson6() {
  const title = "C Conditional Branching: if, else-if Ladders, Nested if & Common Traps";
  const desc = "Master C Conditional Statements (Phase 4 Part 1): Boolean truth in C (0 vs non-zero), if, if-else, else-if ladders, nested if, guard clauses, multiple conditions with logical AND/OR/NOT, short-circuit evaluation, ternary operator, character comparisons, and critical compiler traps (if (x = 5), dangling else).";
  const filename = "06-c-conditional-branching-if-else-and-logical-operators.html";
  const subtopics = "Boolean Truth in C · if, if-else & else-if · Nested if & Guard Clauses · Logical Operators & Short-Circuit · Ternary · Comparing Chars · Common Traps";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 4 (Part 1): C Conditional Branching, if-else Ladders, Nested if & Logical Evaluation Masterclass</strong>! In real-world software, programs must make dynamic decisions based on runtime user input and system conditions. In C, decision-making is rooted in <strong>integer-based Boolean logic</strong>, where <code>0</code> represents <code>FALSE</code> and <strong>any non-zero value</strong> represents <code>TRUE</code>. In this comprehensive guide, you will master the mechanics of <code>if</code>, <code>if-else</code>, multi-branch <code>else-if</code> ladders, nested conditions, short-circuit logical operators, character comparisons, and critical traps like accidental assignment in condition statements.</p>
    </div>

    <!-- 1. Boolean Truth in C & if Syntax -->
    <div class="section-title"><span class="num">1</span>Boolean Truth in C &amp; The if / if-else Mechanics</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>💡 The Golden Rule of Boolean Truth in C:</h4>
        <p>• <strong><code>0</code> (Zero):</strong> Evaluates strictly to <strong><code>FALSE</code></strong>.<br>
        • <strong>Any Non-Zero Value (<code>1</code>, <code>-5</code>, <code>100</code>, <code>0.5</code>):</strong> Evaluates strictly to <strong><code>TRUE</code></strong>!</p>
      </div>

      <div class="flow-diagram">
        <strong>Control Flow Architecture — if-else:</strong><br>
        <br>
                 [ Start Condition: (marks &gt;= 40) ]<br>
                              │<br>
                  ┌───────────┴───────────┐<br>
                  ▼ (TRUE)                ▼ (FALSE)<br>
            [ Grade: PASS ]         [ Grade: FAIL ]<br>
                  │                       │<br>
                  └───────────┬───────────┘<br>
                              ▼<br>
                   [ Continue Execution ]
      </div>
    </div>

    <!-- 2. else-if Ladder (User Curriculum Standard) -->
    <div class="section-title"><span class="num">2</span>The else-if Ladder (Multi-Way Decision Making)</div>
    <div class="section-body">
      <p>Multiple mutually exclusive conditions unnapudu <strong><code>else-if</code> ladder</strong> sequential order lo top-to-bottom evaluate avthundhi. First match ayina block execute avvagane migilina conditions skip aypothayi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Grade Calculator</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int marks;

    printf("Enter marks: ");
    if (scanf("%d", &amp;marks) != 1) {
        printf("❌ Invalid input! Please enter an integer.\\n");
        return 1;
    }

    if (marks &gt;= 90) {
        printf("Grade A\\n");
    } else if (marks &gt;= 60) {
        printf("Grade B\\n");
    } else if (marks &gt;= 40) {
        printf("Grade C\\n");
    } else {
        printf("Fail\\n");
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. Nested if & Logical Operators with Short-Circuiting -->
    <div class="section-title"><span class="num">3</span>Nested if &amp; Logical Operators with Short-Circuit Evaluation ⭐</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⚡ Short-Circuit Evaluation in C</h4>
        <p>• <strong>Logical AND (<code>&amp;&amp;</code>):</strong> First expression <code>FALSE</code> ayithe, second expression ni compiler evaluate kuda cheyyadhu (because entire result will definitely be false).<br>
        • <strong>Logical OR (<code>||</code>):</strong> First expression <code>TRUE</code> ayithe, second expression ni evaluate cheyyadhu (because entire result is already true).<br>
        ⚡ <em>Performance Tip:</em> Inexpensive fast checks ni left side pettali!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Multiple Logical Conditions & Character Comparison</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char ch;
    printf("Enter any single character: ");
    scanf(" %c", &amp;ch);

    // Character comparison using ASCII integer values
    if (ch &gt;= 'A' &amp;&amp; ch &lt;= 'Z') {
        printf("'%c' is an UPPERCASE alphabet (ASCII: %d)\\n", ch, ch);
    } else if (ch &gt;= 'a' &amp;&amp; ch &lt;= 'z') {
        printf("'%c' is a LOWERCASE alphabet (ASCII: %d)\\n", ch, ch);
    } else if (ch &gt;= '0' &amp;&amp; ch &lt;= '9') {
        printf("'%c' is a numeric DIGIT.\\n", ch);
    } else {
        printf("'%c' is a SPECIAL symbol / punctuation.\\n", ch);
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 4. Common Condition Mistakes in C -->
    <div class="section-title"><span class="num">4</span>Critical Condition Mistakes in C Programming ⚠️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 The 3 Most Dangerous C Conditional Bugs:</h4>
        <p>1. <strong>Accidental Assignment (<code>=</code> instead of <code>==</code>):</strong><br>
        <code>if (x = 5)</code> — Idhi equality check kaadhu! <code>x</code> lo 5 assign ayyi non-zero number return avvadam tho condition <strong>Always TRUE</strong> aypothundhi!<br>
        💡 <em>Yoda Notation Defense:</em> <code>if (5 == x)</code> ani raste, accidental <code>if (5 = x)</code> compile error tho catch aypothundhi!<br>
        <br>
        2. <strong>Accidental Semicolon after if:</strong><br>
        <code>if (x &gt; 10); { printf("Positive"); }</code> — Semicolon <code>;</code> empty statement ga act chesi if condition ni terminate chesthundhi. Braces lopala unna code condition fail ayina compulsorily execute avthundhi!<br>
        <br>
        3. <strong>Floating-Point Equality Check:</strong><br>
        <code>float f = 0.1f + 0.2f; if (f == 0.3f)</code> is FALSE due to IEEE-754 precision rounding. Use <code>fabs(f - 0.3f) &lt; 0.0001</code> instead!</p>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Condition Branching in Live C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this positive/negative number and voting eligibility checker in our online C compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int age = 19;

    // Ternary operator expression
    const char* status = (age &gt;= 18) ? "ELIGIBLE to Vote" : "NOT Eligible to Vote";
    printf("Age %d: %s\\n", age, status);

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

  const html = wrapCPage(title, desc, filename, 6, "Phase 04", "Conditions & Branching", subtopics, contentBody, '05-c-operators-expressions-and-precedence.html', '5. Operators, Precedence & 6 Programs', '07-c-switch-case-and-decision-practice-programs.html', '7. switch-case, Fall-Through & 7 Programs');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 7: switch-case, Fall-Through & 7 Practice Programs ───────
function buildLesson7() {
  const title = "C switch-case, Fall-Through Behavior & 7 Decision Practice Programs";
  const desc = "Master C switch-case Statements (Phase 4 Part 2): switch mechanics, jump table branch optimization under the hood, break and default rules, intentional vs accidental fall-through, if-else vs switch performance comparison, and 7 step-by-step practical programs (Leap year, Multi-operation calculator, Even/odd, Largest of 3, Voting eligibility).";
  const filename = "07-c-switch-case-and-decision-practice-programs.html";
  const subtopics = "switch-case Mechanics · Jump Tables · break & default · Fall-Through Behavior · if-else vs switch · 7 Practice Programs (Leap Year, Calculator, Largest of 3)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 4 (Part 2): C switch-case, Fall-Through Mechanics & 7 Decision Programs Masterclass</strong>! When a program must branch across numerous fixed constant options (such as menu choices, state machines, or arithmetic operations), writing long <code>else-if</code> chains becomes verbose and slow. The C <strong><code>switch-case</code></strong> construct solves this by allowing compilers to generate ultra-fast <strong>$O(1)$ Jump Tables</strong>. In this comprehensive guide, you will master the internal architecture of <code>switch</code>, the critical role of <code>break</code>, intentional fall-through grouping, and construct <strong>7 complete production-grade practical decision algorithms</strong>.</p>
    </div>

    <!-- 1. switch-case Architecture & Jump Tables -->
    <div class="section-title"><span class="num">1</span>switch-case Mechanics &amp; Jump Table Optimization Under the Hood</div>
    <div class="section-body">
      <p>In C, <code>switch</code> operates exclusively on <strong>Integral Values (<code>int</code>, <code>char</code>, <code>enum</code>)</strong>. Floating-point numbers (<code>float</code>, <code>double</code>) and strings (<code>char[]</code>) are NOT allowed in C switch statements!</p>

      <div class="concept-box">
        <h4>⚙️ Why switch is Faster than else-if (Jump Tables)</h4>
        <p>• <strong><code>else-if</code> Chain:</strong> Checks conditions linearly one-by-one ($O(N)$ time complexity). If matching branch is at the 10th position, 10 comparisons are executed.<br>
        • <strong><code>switch-case</code>:</strong> GCC compiler case values ni array of jump memory addresses (<strong>Jump Table / Branch Table</strong>) ga compile chesthundi. CPU directly computes target branch address in <strong>$O(1)$ Instant Time</strong>!</p>
      </div>

      <div class="flow-diagram">
        <strong>switch-case Jump Table Execution:</strong><br>
        switch(choice) ──► JumpTable[choice] ──► Direct Jump to Case Block (No linear checks!)
      </div>
    </div>

    <!-- 2. Fall-Through Behavior & Case Grouping -->
    <div class="section-title"><span class="num">2</span>The break Statement &amp; Fall-Through Behavior</div>
    <div class="section-body">
      <p>In C, when a matching <code>case</code> is found, execution continues sequentially into subsequent cases until a <strong><code>break;</code></strong> is reached or switch block ends. This is called <strong>Fall-Through</strong>:</p>

      <div class="concept-box">
        <h4>💡 Deliberate Fall-Through for Grouping Cases</h4>
        <p>Multiple cases ki same execution logic unte, <code>break</code> omit chesi group cheyyavachu:</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Grouped Fall-Through Vowel Checker</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char ch = 'E';

    switch(ch) {
        case 'A': case 'a':
        case 'E': case 'e':
        case 'I': case 'i':
        case 'O': case 'o':
        case 'U': case 'u':
            printf("'%c' is a VOWEL.\\n", ch);
            break;
        default:
            printf("'%c' is a CONSONANT or non-alphabetic character.\\n", ch);
            break;
    }

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 3. 7 Real-World Decision Practice Programs -->
    <div class="section-title"><span class="num">3</span>7 Real-World Practical Decision Programs (Step-by-Step)</div>
    <div class="section-body">
      <p>Mastering conditions through 7 foundational programming algorithms:</p>

      <!-- Program 1 & 2: Even/Odd & Positive/Negative -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">Programs 1 &amp; 2: Even/Odd &amp; Positive/Negative/Zero Checker</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C — Number Classification</span>
            <a class="try-btn" href="/?lang=c">▶ Run Code</a>
          </div>
          <pre><code>#include &lt;stdio.h&gt;

void checkNumber(int n) {
    // 1. Even or Odd
    if (n % 2 == 0) {
        printf("%d is EVEN. ", n);
    } else {
        printf("%d is ODD. ", n);
    }

    // 2. Positive, Negative, or Zero
    if (n &gt; 0) {
        printf("State: POSITIVE\\n");
    } else if (n &lt; 0) {
        printf("State: NEGATIVE\\n");
    } else {
        printf("State: ZERO\\n");
    }
}

int main(void) {
    checkNumber(14);
    checkNumber(-7);
    checkNumber(0);
    return 0;
}</code></pre>
        </div>
      </div>

      <!-- Program 3 & 4: Largest of Three & Leap Year -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">Programs 3 &amp; 4: Largest of Three Numbers &amp; Leap Year Checker</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C — Advanced Decision Algorithms</span>
            <a class="try-btn" href="/?lang=c">▶ Run Code</a>
          </div>
          <pre><code>#include &lt;stdio.h&gt;

int findLargest(int a, int b, int c) {
    if (a &gt;= b &amp;&amp; a &gt;= c) return a;
    if (b &gt;= a &amp;&amp; b &gt;= c) return b;
    return c;
}

int isLeapYear(int year) {
    // Leap year rule: Divisible by 4 AND not 100, UNLESS divisible by 400!
    return (year % 4 == 0 &amp;&amp; year % 100 != 0) || (year % 400 == 0);
}

int main(void) {
    printf("Largest of (45, 92, 78): %d\\n", findLargest(45, 92, 78));
    printf("Is 2024 a Leap Year? %s\\n", isLeapYear(2024) ? "YES" : "NO");
    printf("Is 1900 a Leap Year? %s\\n", isLeapYear(1900) ? "YES" : "NO (Century exception)");
    printf("Is 2000 a Leap Year? %s\\n", isLeapYear(2000) ? "YES (400 rule)" : "NO");
    return 0;
}</code></pre>
        </div>
      </div>

      <!-- Program 5, 6, 7: Calculator with switch & Voting -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">Programs 5, 6 &amp; 7: Menu Calculator using switch &amp; Voting Eligibility</h4>
        <div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">C — Menu Calculator using switch</span>
            <a class="try-btn" href="/?lang=c">▶ Run Code</a>
          </div>
          <pre><code>#include &lt;stdio.h&gt;

void calculate(double a, double b, char op) {
    switch(op) {
        case '+':
            printf("%.2f + %.2f = %.2f\\n", a, b, a + b);
            break;
        case '-':
            printf("%.2f - %.2f = %.2f\\n", a, b, a - b);
            break;
        case '*':
            printf("%.2f * %.2f = %.2f\\n", a, b, a * b);
            break;
        case '/':
            if (b == 0.0) {
                printf("❌ Error: Division by zero is undefined!\\n");
            } else {
                printf("%.2f / %.2f = %.2f\\n", a, b, a / b);
            }
            break;
        default:
            printf("❌ Unknown Operator '%c'\\n", op);
            break;
    }
}

int main(void) {
    printf("--- Multi-Operation Switch Calculator ---\\n");
    calculate(120.0, 30.0, '+');
    calculate(120.0, 30.0, '/');
    calculate(50.0, 0.0, '/');

    // Voting Eligibility Check
    int age = 17;
    printf("\\nAge %d Voting Status: %s\\n", age, (age &gt;= 18) ? "Eligible" : "Underage");

    return 0;
}</code></pre>
        </div>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test the Calculator in Live C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this multi-operator switch calculator in our online GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int year = 2028;
    if ((year % 4 == 0 &amp;&amp; year % 100 != 0) || (year % 400 == 0)) {
        printf("Year %d is a LEAP YEAR (366 days).\\n", year);
    } else {
        printf("Year %d is a COMMON YEAR (365 days).\\n", year);
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

  const html = wrapCPage(title, desc, filename, 7, "Phase 04", "Conditions & Branching", subtopics, contentBody, '06-c-conditional-branching-if-else-and-logical-operators.html', '6. if-else Ladders, Nested if & Logical Logic', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE LESSON 5 to link to Lesson 6 ───────────────────────────────────
function updateLesson5() {
  const file5 = path.join(cDir, '05-c-operators-expressions-and-precedence.html');
  const title = "C Operators, Precedence & 6 Real-World Practice Programs";
  const desc = "Master C Operators (Phase 3 Part 2): Arithmetic, Relational, Logical (short-circuit evaluation), Prefix vs Postfix increment/decrement, Bitwise operators, Ternary operator, Precedence & Associativity Table, and 6 step-by-step practical programs.";
  const subtopics = "Arithmetic & Modulus · Relational & Logical · Prefix vs Postfix (++x/x++) · Bitwise · Ternary · Precedence Table · 6 Practice Programs";

  const currentContent = fs.readFileSync(file5, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '05-c-operators-expressions-and-precedence.html', 5, "Phase 03", "Input & Operators", subtopics, contentBody, '04-c-user-input-scanf-and-buffer-handling.html', '4. User Input (scanf, fgets & Buffer Traps)', '06-c-conditional-branching-if-else-and-logical-operators.html', '6. if-else Ladders, Nested if & Logical Logic');
  fs.writeFileSync(file5, html, 'utf8');
  console.log('✅ Updated 05-c-operators-expressions-and-precedence.html next links!');
}

// Update all sidebar links across all 7 C lesson files
function updateAllCSidebars() {
  const files = [
    '01-c-basics-and-program-structure.html',
    '02-c-variables-declaration-and-memory-model.html',
    '03-c-data-types-format-specifiers-and-type-casting.html',
    '04-c-user-input-scanf-and-buffer-handling.html',
    '05-c-operators-expressions-and-precedence.html',
    '06-c-conditional-branching-if-else-and-logical-operators.html',
    '07-c-switch-case-and-decision-practice-programs.html'
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, and conditional branching with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, c conditions, c switch case" />
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
      <span class="badge">🟢 7 In-Depth Sub-Chapters Across 4 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, memory models, variables, data types, scanf user input, operators, or conditional branching:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables & Scope →</a>
        <a href="/blog-c/03-c-data-types-format-specifiers-and-type-casting.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Types & sizeof →</a>
        <a href="/blog-c/04-c-user-input-scanf-and-buffer-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: scanf & Input →</a>
        <a href="/blog-c/05-c-operators-expressions-and-precedence.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: Operators & 6 Programs →</a>
        <a href="/blog-c/06-c-conditional-branching-if-else-and-logical-operators.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 4: if-else Ladders →</a>
        <a href="/blog-c/07-c-switch-case-and-decision-practice-programs.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 4: switch & 7 Programs →</a>
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
  console.log('✅ Updated public/blog-c.html with Phase 1, 2, 3 & 4 (7 Chapters)!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 4 (Conditional Statements)...');
  buildLesson6();
  buildLesson7();
  updateLesson5();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 4 successfully created with sub-chapters!');
}

run();
