const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure - Phase 1, Phase 2, and Phase 3 (with sub-chapters!)
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, learn c programming, c scanf, c operators, c input buffer, c fgets, c precedence" />
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

// ── BUILD LESSON 4: User Input (scanf, fgets & Buffer Traps) ──────────────
function buildLesson4() {
  const title = "C User Input: scanf(), Address Operator (&), Buffer Pitfalls & fgets()";
  const desc = "Master C User Input (Phase 3 Part 1): scanf() mechanics, why the address-of operator (&) is required, reading ints, floats, chars, and strings, the infamous input buffer newline pitfall and how to clear it, safe text reading with fgets(), and robust input validation.";
  const filename = "04-c-user-input-scanf-and-buffer-handling.html";
  const subtopics = "scanf() Mechanics · Address Operator (&) · Reading Primitives & Strings · Stdin Buffer Pitfall (\\n) · fgets() Safe Text Input · Input Validation";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 3 (Part 1): C User Input, scanf(), Buffer Mechanics & fgets() Masterclass</strong>! Writing interactive software requires receiving runtime input from users via the keyboard (Standard Input: <code>stdin</code>). In C, the standard input function is <strong><code>scanf()</code> (Scan Formatted)</strong>. However, because C operates directly with memory addresses, using <code>scanf()</code> requires understanding pointers, the address-of operator (<code>&</code>), and the notorious <strong>stdin input buffer trap</strong> where leftover newline characters corrupt subsequent reads. In this comprehensive guide, you will master reading all data types, solving the buffer newline glitch, reading multi-word strings safely with <code>fgets()</code>, and validating user inputs.</p>
    </div>

    <!-- 1. scanf() & The Address Operator & -->
    <div class="section-title"><span class="num">1</span>scanf() Mechanics & Why the Address Operator (&amp;) is Required</div>
    <div class="section-body">
      <p>In C, functions receive arguments by value (copy). Kani <code>scanf()</code> function user enter chesina value ni manam declare chesina variable lo <strong>Direct ga RAM Memory Address lo write cheyyali</strong>. Andhuke variable peru mundhu <strong>Address-of Operator (<code>&amp;</code>)</strong> pass chesthamu:</p>

      <div class="memory-diagram">
        <strong>How scanf() writes directly into RAM:</strong><br>
        int age;                   // Allocated at RAM address 0x2000 (currently Garbage value)<br>
        scanf("%d", &amp;age);         // User enters "21"<br>
        <br>
        1. scanf() parses text "21" -&gt; binary 21<br>
        2. scanf() takes address 0x2000 and writes 21 directly into that RAM slot!<br>
        <br>
        RAM Address 0x2000: [  21  ]  &lt;--- age is now safely updated!
      </div>

      <div class="concept-box">
        <h4>⚠️ When is &amp; NOT needed in scanf()?</h4>
        <p>Strings (character arrays, e.g. <code>char name[50];</code>) lo <code>&amp;</code> pettakkarledu: <code>scanf("%s", name);</code>.<br>
        <strong>Why?</strong> C lo array name automatically memory lo unna first element address (<code>&amp;name[0]</code>) ni represent chesthundi!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — User Curriculum Example</span>
          <a class="try-btn" href="/?lang=c">▶ Run in C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int age;

    printf("Enter your age: ");
    scanf("%d", &amp;age);

    printf("Your age is %d\\n", age);
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- 2. Reading Primitives & Format Specifiers in scanf -->
    <div class="section-title"><span class="num">2</span>Reading Different Data Types with scanf()</div>
    <div class="section-body">
      <p><code>scanf()</code> requires the matching format specifier for each data type:</p>

      <table class="tbl spec-table">
        <tr><th>Data Type</th><th>scanf Format Specifier</th><th>Syntax Example</th><th>Crucial Notes</th></tr>
        <tr><td><code>int</code></td><td><code>%d</code></td><td><code>scanf("%d", &amp;num);</code></td><td>Skips leading whitespaces/newlines automatically.</td></tr>
        <tr><td><code>float</code></td><td><code>%f</code></td><td><code>scanf("%f", &amp;gpa);</code></td><td>Reads 32-bit single precision float.</td></tr>
        <tr><td><code>double</code></td><td><strong><code>%lf</code></strong> (Long Float)</td><td><code>scanf("%lf", &amp;price);</code></td><td>⚠️ Must use <code>%lf</code> in <code>scanf</code> (using <code>%f</code> will corrupt memory!).</td></tr>
        <tr><td><code>char</code></td><td><code>%c</code></td><td><code>scanf(" %c", &amp;grade);</code></td><td>⚠️ Does NOT skip whitespace; leading space in <code>" %c"</code> is mandatory!</td></tr>
        <tr><td><code>char[]</code> (Word)</td><td><code>%s</code></td><td><code>scanf("%s", name);</code></td><td>Reads single word; <strong>stops at first space</strong> or newline.</td></tr>
      </table>
    </div>

    <!-- 3. The Dangerous Input Buffer Trap (\n) & How to Fix It -->
    <div class="section-title"><span class="num">3</span>The Dangerous Input Buffer Trap (\n) &amp; How to Fix It ⚠️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">⚠️ Why Does scanf("%c") Skip Input After scanf("%d")?</h4>
        <p>User keyboard meedha <code>25</code> type chesi <code>ENTER</code> press chesinappudu, <code>stdin</code> input buffer lo <code>'2', '5', '\\n'</code> store avthayi.<br>
        1. <code>scanf("%d", &amp;age)</code> కేవలం <code>25</code> ని read chesi <code>'\\n'</code> ని buffer lo వదిలేస్తుంది.<br>
        2. Next line lo <code>scanf("%c", &amp;grade)</code> call ayinappudu, adhi user input kosam wait cheyyakunda, buffer lo unna leftover <code>'\\n'</code> ని read chesi skip aypothundhi!<br>
        <br>
        ✅ <strong>Solution 1:</strong> <code>scanf(" %c", &amp;grade);</code> (Leading space pedithe whitespace/newline ignore avthundhi).<br>
        ✅ <strong>Solution 2:</strong> Clear remaining buffer characters with: <code>while((c = getchar()) != '\\n' &amp;&amp; c != EOF);</code></p>
      </div>
    </div>

    <!-- 4. Safe Multi-Word String Reading with fgets() -->
    <div class="section-title"><span class="num">4</span>Safe Multi-Word Text Input with fgets() (Preventing Buffer Overflow)</div>
    <div class="section-body">
      <p><code>scanf("%s", str)</code> is dangerous because it stops at spaces and causes <strong>Buffer Overflow crashes</strong> if input exceeds array size. Professional C developers use <strong><code>fgets()</code></strong>:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Safe String Input with fgets() & Input Validation</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main(void) {
    char fullName[50];
    int rollNumber;

    // 1. Reading multi-word line safely with fgets
    printf("Enter your Full Name (with spaces): ");
    fgets(fullName, sizeof(fullName), stdin);

    // Remove trailing newline captured by fgets
    fullName[strcspn(fullName, "\\n")] = 0;

    // 2. Robust Input Validation with scanf return value
    printf("Enter your Roll Number: ");
    if (scanf("%d", &amp;rollNumber) != 1) {
        printf("❌ Invalid Input! You must enter a numeric integer.\\n");
        return 1; // Exit with error code
    }

    printf("\\n--- Student Card ---\\n");
    printf("Name: %s\\n", fullName);
    printf("Roll No: %d\\n", rollNumber);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test Interactive Input in C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this interactive user greeting program in our online C compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    char name[30];
    int luckyNumber;

    printf("Enter your name: ");
    scanf("%29s", name); // %29s limits max characters to prevent overflow

    printf("Enter your lucky number: ");
    scanf("%d", &amp;luckyNumber);

    printf("Namaste, %s! Your lucky number squared is %d.\\n", name, luckyNumber * luckyNumber);
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

  const html = wrapCPage(title, desc, filename, 4, "Phase 03", "Input & Operators", subtopics, contentBody, '03-c-data-types-format-specifiers-and-type-casting.html', '3. Data Types, sizeof & Type Casting', '05-c-operators-expressions-and-precedence.html', '5. Operators, Precedence & 6 Programs');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 5: Operators, Precedence & 6 Practice Programs ───────────
function buildLesson5() {
  const title = "C Operators, Precedence & 6 Real-World Practice Programs";
  const desc = "Master C Operators (Phase 3 Part 2): Arithmetic, Relational, Logical (short-circuit evaluation), Prefix vs Postfix increment/decrement, Bitwise operators (&, |, ^, ~, <<, >>), Ternary operator, Precedence & Associativity Table, Integer Division, and 6 step-by-step practical programs.";
  const filename = "05-c-operators-expressions-and-precedence.html";
  const subtopics = "Arithmetic & Modulus · Relational & Logical · Prefix vs Postfix (++x/x++) · Bitwise · Ternary · Precedence Table · 6 Practice Programs";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 3 (Part 2): C Operators, Expression Evaluation & 6 Practice Programs Masterclass</strong>! Operators are the fundamental building blocks that allow you to perform computations, make logical decisions, and manipulate raw binary bits in memory. In this comprehensive guide, you will master all C operator categories (Arithmetic, Relational, Logical, Bitwise, Ternary), prefix vs postfix increment/decrement mechanics, operator precedence & associativity rules, and construct <strong>6 real-world practical computation programs</strong>.</p>
    </div>

    <!-- 1. All Operator Categories -->
    <div class="section-title"><span class="num">1</span>Complete C Operators Classification</div>
    <div class="section-body">
      <p>C language provides 6 major families of operators:</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #10b981; border-radius:8px; padding:16px;">
          <strong style="color:#10b981;">1. Arithmetic Operators</strong>
          <ul style="margin:8px 0 0 16px; font-size:13px; color:var(--text2); line-height:1.6;">
            <li><code>+</code> (Addition), <code>-</code> (Subtraction)</li>
            <li><code>*</code> (Multiplication), <code>/</code> (Division)</li>
            <li><code>%</code> (Modulus / Remainder) ⚠️ <em>Integers only!</em></li>
          </ul>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #38bdf8; border-radius:8px; padding:16px;">
          <strong style="color:#38bdf8;">2. Relational (Comparison)</strong>
          <ul style="margin:8px 0 0 16px; font-size:13px; color:var(--text2); line-height:1.6;">
            <li><code>==</code> (Equal to), <code>!=</code> (Not equal)</li>
            <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
            <li>Returns <code>1</code> for True, <code>0</code> for False</li>
          </ul>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #a855f7; border-radius:8px; padding:16px;">
          <strong style="color:#a855f7;">3. Logical Operators</strong>
          <ul style="margin:8px 0 0 16px; font-size:13px; color:var(--text2); line-height:1.6;">
            <li><code>&amp;&amp;</code> (Logical AND — Short-circuit!)</li>
            <li><code>||</code> (Logical OR — Short-circuit!)</li>
            <li><code>!</code> (Logical NOT / Inversion)</li>
          </ul>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #eab308; border-radius:8px; padding:16px;">
          <strong style="color:#eab308;">4. Bitwise Operators</strong>
          <ul style="margin:8px 0 0 16px; font-size:13px; color:var(--text2); line-height:1.6;">
            <li><code>&amp;</code> (Bitwise AND), <code>|</code> (Bitwise OR)</li>
            <li><code>^</code> (XOR), <code>~</code> (NOT / Invert bits)</li>
            <li><code>&lt;&lt;</code> (Left Shift), <code>&gt;&gt;</code> (Right Shift)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 2. Prefix vs Postfix & Ternary Operator -->
    <div class="section-title"><span class="num">2</span>Prefix vs Postfix (++x / x++) &amp; Ternary Operator</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⚡ Prefix (++x) vs Postfix (x++) Mechanics</h4>
        <p>• <strong>Prefix (<code>++x</code>):</strong> Value ni <strong>First increment chesi</strong>, tharvatha current expression lo use chesthundhi ("Increment first, use later").<br>
        • <strong>Postfix (<code>x++</code>):</strong> Current expression lo <strong>Original value ni use chesi</strong>, tharvatha increment chesthundhi ("Use first, increment later").</p>
      </div>

      <div class="concept-box">
        <h4>Conditional (Ternary) Operator: <code>condition ? expr1 : expr2</code></h4>
        <p>Simple <code>if-else</code> conditions ni single-line expression ga rayadaniki vadathamu:<br>
        <code>int max = (a &gt; b) ? a : b;</code></p>
      </div>
    </div>

    <!-- 3. Precedence & Associativity Table -->
    <div class="section-title"><span class="num">3</span>Operator Precedence &amp; Associativity Master Table ⭐</div>
    <div class="section-body">
      <p>Complex expressions lo eeh operator mundhu evaluate avvali anedhi <strong>Precedence</strong> decide chesthundhi:</p>

      <table class="tbl spec-table">
        <tr><th>Priority</th><th>Operators</th><th>Description</th><th>Associativity</th></tr>
        <tr><td><strong>1 (Highest)</strong></td><td><code>()</code>, <code>[]</code>, <code>-&gt;</code>, <code>.</code></td><td>Parentheses, Array Subscript, Member Access</td><td>Left to Right</td></tr>
        <tr><td><strong>2</strong></td><td><code>++</code>, <code>--</code>, <code>!</code>, <code>~</code>, <code>+</code>, <code>-</code>, <code>(type)</code>, <code>*</code>, <code>&amp;</code>, <code>sizeof</code></td><td>Unary operators, Type cast, Address, Dereference</td><td><strong>Right to Left</strong></td></tr>
        <tr><td><strong>3</strong></td><td><code>*</code>, <code>/</code>, <code>%</code></td><td>Multiplication, Division, Modulus</td><td>Left to Right</td></tr>
        <tr><td><strong>4</strong></td><td><code>+</code>, <code>-</code></td><td>Addition, Subtraction</td><td>Left to Right</td></tr>
        <tr><td><strong>5</strong></td><td><code>&lt;&lt;</code>, <code>&gt;&gt;</code></td><td>Bitwise Left and Right Shifts</td><td>Left to Right</td></tr>
        <tr><td><strong>6</strong></td><td><code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code></td><td>Relational Comparisons</td><td>Left to Right</td></tr>
        <tr><td><strong>7</strong></td><td><code>==</code>, <code>!=</code></td><td>Equality / Inequality</td><td>Left to Right</td></tr>
        <tr><td><strong>8</strong></td><td><code>&amp;</code></td><td>Bitwise AND</td><td>Left to Right</td></tr>
        <tr><td><strong>9</strong></td><td><code>^</code></td><td>Bitwise XOR</td><td>Left to Right</td></tr>
        <tr><td><strong>10</strong></td><td><code>|</code></td><td>Bitwise OR</td><td>Left to Right</td></tr>
        <tr><td><strong>11</strong></td><td><code>&amp;&amp;</code></td><td>Logical AND</td><td>Left to Right</td></tr>
        <tr><td><strong>12</strong></td><td><code>||</code></td><td>Logical OR</td><td>Left to Right</td></tr>
        <tr><td><strong>13</strong></td><td><code>?:</code></td><td>Ternary Conditional</td><td><strong>Right to Left</strong></td></tr>
        <tr><td><strong>14 (Lowest)</strong></td><td><code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code></td><td>Assignment &amp; Compound Assignments</td><td><strong>Right to Left</strong></td></tr>
      </table>
    </div>

    <!-- 4. 6 Real-World Practice Programs -->
    <div class="section-title"><span class="num">4</span>6 Real-World Practice Programs (Formulas &amp; Walkthroughs)</div>
    <div class="section-body">
      <p>Practical implementation of arithmetic and operator logic across 6 essential algorithms:</p>

      <div class="concept-box">
        <h4>📌 Formulas Used in the 6 Programs:</h4>
        <p>1. <strong>Add Two Numbers:</strong> $Sum = a + b$<br>
        2. <strong>Simple Interest:</strong> $SI = \frac{P \times T \times R}{100}$<br>
        3. <strong>Rectangle Area & Perimeter:</strong> $Area = L \times W$, $Perimeter = 2(L + W)$<br>
        4. <strong>Celsius to Fahrenheit:</strong> $F = (C \times \frac{9.0}{5.0}) + 32.0$<br>
        5. <strong>Student Average:</strong> $Avg = \frac{M_1 + M_2 + M_3}{3.0}$<br>
        6. <strong>Bill Calculator:</strong> $Final = Subtotal + (Subtotal \times \frac{GST\%}{100})$</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — All 6 Practice Programs in One Comprehensive Suite</span>
          <a class="try-btn" href="/?lang=c">▶ Run Programs</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 1. Add Two Numbers
    int num1 = 45, num2 = 30;
    printf("1. Sum of %d + %d = %d\\n", num1, num2, num1 + num2);

    // 2. Simple Interest: P = 10000, T = 2 years, R = 7.5%
    double P = 10000.0, T = 2.0, R = 7.5;
    double SI = (P * T * R) / 100.0;
    printf("2. Simple Interest on Rs.%.0f: Rs.%.2f\\n", P, SI);

    // 3. Rectangle Area & Perimeter (L = 12.5, W = 6.0)
    double length = 12.5, width = 6.0;
    double area = length * width;
    double perimeter = 2.0 * (length + width);
    printf("3. Rectangle Area = %.2f sq.units | Perimeter = %.2f units\\n", area, perimeter);

    // 4. Celsius to Fahrenheit (37°C normal body temp)
    double celsius = 37.0;
    double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;
    printf("4. 37°C in Fahrenheit = %.1f°F\\n", fahrenheit);

    // 5. Student Average Marks (85, 92, 78)
    int m1 = 85, m2 = 92, m3 = 78;
    double average = (m1 + m2 + m3) / 3.0; // Using 3.0 avoids integer division!
    printf("5. Student Average: %.2f%%\\n", average);

    // 6. Supermarket Bill Calculator with 18% GST
    double itemPrice = 1250.0;
    int quantity = 3;
    double subtotal = itemPrice * quantity;
    double finalBill = subtotal + (subtotal * 0.18);
    printf("6. Bill: Subtotal = Rs.%.2f | With 18%% GST = Rs.%.2f\\n", subtotal, finalBill);

    return 0;
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Run Arithmetic Suite in Live C Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Test arithmetic operations, Celsius conversion, and student average in our live GCC compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C (GCC Standard)</span>
          <a class="try-btn" href="/?lang=c">▶ Open C Compiler</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    double celsius = 100.0; // Boiling point of water
    double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;

    printf("%.1f°C = %.1f°F\\n", celsius, fahrenheit);
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

  const html = wrapCPage(title, desc, filename, 5, "Phase 03", "Input & Operators", subtopics, contentBody, '04-c-user-input-scanf-and-buffer-handling.html', '4. User Input (scanf, fgets & Buffer Traps)', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE LESSON 3 to link to Lesson 4 ───────────────────────────────────
function updateLesson3() {
  const file3 = path.join(cDir, '03-c-data-types-format-specifiers-and-type-casting.html');
  const title = "C Data Types: Primary, Modifiers, sizeof, Format Specifiers & Type Casting";
  const desc = "Master C Data Types (Phase 2 Part 2): Primary types (int, float, double, char, _Bool), modifiers (short, long, signed, unsigned), 2's complement ranges, the sizeof operator, Format Specifiers Master Guide (%d, %u, %f, %lf, %c, %s, %p), and Implicit Coercion vs Explicit Type Casting.";
  const subtopics = "Primary Types (int, float, double, char, _Bool) · Modifiers (short, long, signed, unsigned) · Integer Ranges · sizeof Operator · Format Specifiers (%d, %u, %f, %lf, %p) · Type Casting";

  const currentContent = fs.readFileSync(file3, 'utf8');
  const startIdx = currentContent.indexOf('<div class="intro-box">');
  const endIdx = currentContent.indexOf('<div class="nav-footer">');
  const contentBody = currentContent.substring(startIdx, endIdx);

  const html = wrapCPage(title, desc, '03-c-data-types-format-specifiers-and-type-casting.html', 3, "Phase 02", "Variables & Data Types", subtopics, contentBody, '02-c-variables-declaration-and-memory-model.html', '2. Variables, Memory Model & Scope', '04-c-user-input-scanf-and-buffer-handling.html', '4. User Input (scanf, fgets & Buffer Traps)');
  fs.writeFileSync(file3, html, 'utf8');
  console.log('✅ Updated 03-c-data-types-format-specifiers-and-type-casting.html next links!');
}

// Update all sidebar links across all 5 C lesson files
function updateAllCSidebars() {
  const files = ['01-c-basics-and-program-structure.html', '02-c-variables-declaration-and-memory-model.html', '03-c-data-types-format-specifiers-and-type-casting.html', '04-c-user-input-scanf-and-buffer-handling.html', '05-c-operators-expressions-and-precedence.html'];
  
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
  <meta name="description" content="Master C Programming from fundamental architecture, GCC compilation pipeline, variables, data types, scanf user input, operators, and memory management with live runnable code." />
  <meta name="keywords" content="c tutorial, c course, learn c online, c basics, gcc compiler, c scanf, c operators, pointers in c, c memory management" />
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
      <span class="badge">🟢 5 In-Depth Sub-Chapters Across 3 Phases</span>
      <span class="badge">📂 Unified Emerald Green Theme</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's C Programming Master Course</strong>. Designed by Dennis Ritchie at Bell Labs, C is the mother of modern computing powering operating system kernels (Linux, Windows, macOS), database engines (MySQL, PostgreSQL, Redis), embedded microcontrollers, and language runtimes. Each phase provides in-depth, hands-on architectural breakdowns with live runnable code.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning C?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore C architecture, memory models, variables, data types, scanf user input, or operators:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-c/01-c-basics-and-program-structure.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-c/02-c-variables-declaration-and-memory-model.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Variables & Scope →</a>
        <a href="/blog-c/03-c-data-types-format-specifiers-and-type-casting.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 2: Types & sizeof →</a>
        <a href="/blog-c/04-c-user-input-scanf-and-buffer-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: scanf & Input →</a>
        <a href="/blog-c/05-c-operators-expressions-and-precedence.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 18px; border-radius:8px; text-decoration:none;">Phase 3: Operators & 6 Programs →</a>
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
  console.log('✅ Updated public/blog-c.html with Phase 1, 2 & 3!');
}

function run() {
  console.log('🚀 Building C Masterclass Phase 3 (User Input & Operators)...');
  buildLesson4();
  buildLesson5();
  updateLesson3();
  updateAllCSidebars();
  buildBlogCHome();
  console.log('🎉 C Phase 3 successfully created with sub-chapters!');
}

run();
