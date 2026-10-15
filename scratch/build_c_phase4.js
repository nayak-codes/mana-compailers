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
  const title = "C Conditional Branching: if, else-if Ladders, Nested if & Common Traps (తెలుగులో)";
  const desc = "C Conditional Statements (Phase 4 Part 1): C లో Boolean లాజిక్, if, if-else, else-if లాడర్, nested if, లాజికల్ ఆపరేటర్స్ వాడి మల్టిపుల్ కండిషన్స్ చెక్ చేయడం, కామన్ గా చేసే తప్పులు గురించి తెలుగులో నేర్చుకుందాం.";
  const filename = "06-c-conditional-branching-if-else-and-logical-operators.html";
  const subtopics = "Boolean Truth in C · if, if-else & else-if · Nested if & Guard Clauses · Logical Operators & Short-Circuit · Ternary · Comparing Chars · Common Traps";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 4 (Part 1): C Conditional Branching, if-else Ladders, Nested if Masterclass</strong> కు స్వాగతం! రియల్ వరల్డ్ సాఫ్ట్‌వేర్లలో, యూజర్ ఇచ్చే డేటాని బట్టి ప్రోగ్రామ్ దానంతట అదే నిర్ణయాలు (decisions) తీసుకోవాలి. C లాంగ్వేజ్ లో డెసిషన్స్ అన్నీ <strong>నెంబర్-బేస్డ్ బూలియన్ లాజిక్</strong> మీద ఆధారపడి ఉంటాయి. అంటే, <code>0</code> వస్తే <code>FALSE</code> అని, <strong>జీరో కాని ఏ నెంబర్ అయినా</strong> <code>TRUE</code> అని అర్థం. ఈ గైడ్ లో, <code>if</code>, <code>if-else</code>, మల్టిపుల్ కండిషన్స్ చెక్ చేసే <code>else-if</code> లాడర్, కండిషన్ లోపల కండిషన్ రాసే nested-if, క్యారెక్టర్లను పోల్చడం, మరియు కండిషన్స్ రాసేటప్పుడు చేసే కామన్ తప్పుల గురించి తెలుగులో నేర్చుకుందాం.</p>
    </div>

    <!-- 1. Boolean Truth in C & if Syntax -->
    <div class="section-title"><span class="num">1</span>C లో Boolean Truth (నిజం/అబద్ధం) &amp; if / if-else ఎలా పనిచేస్తాయి?</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>💡 C లో Boolean లాజిక్ గోల్డెన్ రూల్:</h4>
        <p>• <strong><code>0</code> (సున్నా):</strong> కచ్చితంగా <strong><code>FALSE</code> (అబద్ధం)</strong> అని అర్థం.<br>
        • <strong>సున్నా కాని ఏ నెంబర్ అయినా (<code>1</code>, <code>-5</code>, <code>100</code>, <code>0.5</code> వగైరా):</strong> కచ్చితంగా <strong><code>TRUE</code> (నిజం)</strong> కిందకే వస్తుంది!</p>
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
    <div class="section-title"><span class="num">2</span>The else-if Ladder (ఒకటి కంటే ఎక్కువ కండిషన్స్)</div>
    <div class="section-body">
      <p>మనకు ఒకదానికొకటి సంబంధం లేని మల్టిపుల్ కండిషన్స్ ఉన్నప్పుడు <strong><code>else-if</code> ladder</strong> ని వాడతాము. ఇది పైనుండి కిందకు చెక్ చేసుకుంటూ వస్తుంది. ఏ కండిషన్ ఫస్ట్ నిజమైతే ఆ బ్లాక్ లో ఉన్న కోడ్ రన్ అయ్యి, కింద ఉన్న కండిషన్స్ అన్నింటినీ స్కిప్ చేసేస్తుంది:</p>

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
    <div class="section-title"><span class="num">3</span>Nested if &amp; Logical Operators (Short-Circuit) ⭐</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⚡ C లో Short-Circuit Evaluation (సమయం ఆదా)</h4>
        <p>• <strong>Logical AND (<code>&amp;&amp;</code>):</strong> ఫస్ట్ రాసిన కండిషన్ <code>FALSE</code> అయితే, కంపైలర్ అసలు సెకండ్ కండిషన్ ని చెక్ కూడా చేయదు (ఎందుకంటే AND లో ఒకటి ఫెయిల్ అయినా మొత్తం ఫెయిల్ కాబట్టి).<br>
        • <strong>Logical OR (<code>||</code>):</strong> ఫస్ట్ రాసిన కండిషన్ <code>TRUE</code> అయితే, సెకండ్ కండిషన్ ని చెక్ చేయదు (ఎందుకంటే OR లో కనీసం ఒకటి నిజమైనా మొత్తం నిజమే కాబట్టి).<br>
        ⚡ <em>టిప్:</em> త్వరగా రన్ అయ్యే చిన్న కండిషన్స్ ని ఎప్పుడూ ఎడమ వైపు (ఫస్ట్) రాయాలి!</p>
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
    <div class="section-title"><span class="num">4</span>C ప్రోగ్రామింగ్ లో కండిషన్స్ రాసేటప్పుడు చేసే పెద్ద తప్పులు ⚠️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">🛑 C లో ఎక్కువగా చేసే 3 డేంజరస్ తప్పులు:</h4>
        <p>1. <strong>డబల్ ఈక్వల్స్ కి బదులు సింగిల్ ఈక్వల్ టు రాయడం (<code>=</code> బదులు <code>==</code> వాడకపోవడం):</strong><br>
        <code>if (x = 5)</code> — ఇది రెండు సమానమా అని చెక్ చేయదు! <code>x</code> లోకి 5 ని అసైన్ చేసి, అది సున్నా కాదు కాబట్టి కండిషన్ <strong>ఎప్పటికీ TRUE</strong> అయ్యేలా చేస్తుంది!<br>
        💡 <em>దీనికి సొల్యూషన్:</em> ఎప్పుడూ <code>if (5 == x)</code> అని రాయడం అలవాటు చేసుకోండి. పొరపాటున <code>if (5 = x)</code> అని రాస్తే వెంటనే కంపైల్ ఎర్రర్ వస్తుంది!<br>
        <br>
        2. <strong>if చివర్లో పొరపాటున Semicolon (;) పెట్టడం:</strong><br>
        <code>if (x &gt; 10); { printf("Positive"); }</code> — చివర్లో <code>;</code> పెడితే అక్కడితో ఆ కండిషన్ ముగిసిపోతుంది. దాంతో ఆ కింది బ్రాకెట్స్ లో ఉన్న కోడ్ ఆ కండిషన్ తో సంబంధం లేకుండా ఎప్పుడూ రన్ అవుతూనే ఉంటుంది!<br>
        <br>
        3. <strong>పాయింట్ నంబర్స్ ని డైరెక్ట్ గా ఈక్వల్ (==) తో చెక్ చేయడం:</strong><br>
        <code>float f = 0.1f + 0.2f; if (f == 0.3f)</code> అని రాస్తే కంప్యూటర్ రౌండింగ్ ప్రాబ్లమ్స్ వల్ల అది FALSE అని చెప్తుంది. అందుకని ఎప్పుడూ డిఫరెన్స్ (<code>fabs(f - 0.3f) &lt; 0.0001</code>) ని బట్టి చెక్ చేయాలి!</p>
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
  const title = "C switch-case, Fall-Through Behavior & 7 Decision Programs (తెలుగులో)";
  const desc = "C switch-case Statements (Phase 4 Part 2): switch-case ఎలా పనిచేస్తుంది, Jump tables అంటే ఏంటి, break మరియు default ఎందుకు వాడాలి, fall-through ప్రాబ్లం, if-else కి switch కి తేడా ఏంటి, మరియు 7 ప్రాక్టికల్ ప్రోగ్రామ్స్ గురించి తెలుగులో నేర్చుకుందాం.";
  const filename = "07-c-switch-case-and-decision-practice-programs.html";
  const subtopics = "switch-case Mechanics · Jump Tables · break & default · Fall-Through Behavior · if-else vs switch · 7 Practice Programs (Leap Year, Calculator, Largest of 3)";

  const contentBody = `
    <div class="intro-box">
      <p><strong>Phase 4 (Part 2): C switch-case, Fall-Through Mechanics & 7 Decision Programs Masterclass</strong> కు స్వాగతం! ఒకే వేరియబుల్ కి చాలా ఆప్షన్స్ ఉన్నప్పుడు (ఉదాహరణకి మెనూ ఆప్షన్స్ లో 1, 2, 3 అని ఉన్నప్పుడు), పెద్ద పెద్ద <code>else-if</code> కండిషన్స్ రాస్తే కోడ్ అర్థం చేసుకోవడం కష్టంగా ఉంటుంది మరియు రన్ అవ్వడానికి కూడా టైం పడుతుంది. దీనికి సొల్యూషనే C లో ఉన్న <strong><code>switch-case</code></strong>. ఇది <strong>$O(1)$ Jump Tables</strong> ని క్రియేట్ చేసి కోడ్ ని చాలా ఫాస్ట్ గా రన్ అయ్యేలా చేస్తుంది. ఈ గైడ్ లో, <code>switch</code> ఇంటర్నల్ గా ఎలా పనిచేస్తుంది, <code>break</code> రాయకపోతే ఏమవుతుంది (Fall-Through), మరియు దాన్ని వాడుకొని <strong>7 రియల్ వరల్డ్ ప్రాక్టికల్ ప్రోగ్రామ్స్</strong> ఎలా రాయాలో తెలుగులో నేర్చుకుందాం.</p>
    </div>

    <!-- 1. switch-case Architecture & Jump Tables -->
    <div class="section-title"><span class="num">1</span>switch-case ఎలా పనిచేస్తుంది? (Jump Table Optimization)</div>
    <div class="section-body">
      <p>C లాంగ్వేజ్ లో <code>switch</code> కండిషన్ లోపల కేవలం <strong>ఇంటీజర్స్, క్యారెక్టర్స్ (<code>int</code>, <code>char</code>, <code>enum</code>)</strong> మాత్రమే పాస్ చేయాలి. పాయింట్ నంబర్స్ (<code>float</code>, <code>double</code>) లేదా పేర్లని (strings) <code>switch</code> లో వాడకూడదు!</p>

      <div class="concept-box">
        <h4>⚙️ else-if కంటే switch ఎందుకు చాలా ఫాస్ట్ గా ఉంటుంది?</h4>
        <p>• <strong><code>else-if</code> అయితే:</strong> పైనుండి కిందకు లైన్ గా ఒక్కొక్క కండిషన్ ని చెక్ చేసుకుంటూ వస్తుంది ($O(N)$ టైం). ఒకవేళ కరెక్ట్ ఆన్సర్ 10వ స్థానంలో ఉంటే, అది 10 సార్లు చెక్ చేసాకే రన్ అవుతుంది.<br>
        • <strong><code>switch-case</code> అయితే:</strong> C కంపైలర్ వీటన్నింటికీ <strong>Jump Table (జంప్ టేబుల్)</strong> అనే దాన్ని ముందే క్రియేట్ చేసి పెట్టుకుంటుంది. సో, అది ఫస్ట్ నుండి చెక్ చేయకుండా, డైరెక్ట్ గా కరెక్ట్ ఆన్సర్ ఎక్కడుందో అక్కడికి <strong>$O(1)$ Instant టైం</strong> లో జంప్ చేసి రన్ చేస్తుంది!</p>
      </div>

      <div class="flow-diagram">
        <strong>switch-case Jump Table Execution:</strong><br>
        switch(choice) ──► JumpTable[choice] ──► Direct Jump to Case Block (No linear checks!)
      </div>
    </div>

    <!-- 2. Fall-Through Behavior & Case Grouping -->
    <div class="section-title"><span class="num">2</span>break వాడకం &amp; Fall-Through (బ్రేక్ వేయకపోతే ఏమవుతుంది?)</div>
    <div class="section-body">
      <p>C లో, <code>switch</code> లోపల కరెక్ట్ <code>case</code> దొరికినప్పుడు, దానికి చివర్లో <strong><code>break;</code></strong> లేకపోతే ఆ కింది cases అన్నీ కూడా వరసగా రన్ అయిపోతాయి! దీన్నే <strong>Fall-Through</strong> అంటారు:</p>

      <div class="concept-box">
        <h4>💡 ఒకే ఆన్సర్ ఉన్నప్పుడు Fall-Through ని వాడుకోవడం</h4>
        <p>ఒకవేళ చాలా cases కి ఒకే లాజిక్ రన్ అవ్వాలి అనుకుంటే, మధ్యలో <code>break</code> ని కావాలనే తీసేసి గ్రూప్ గా రాయొచ్చు:</p>
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
    <div class="section-title"><span class="num">3</span>7 రియల్-వరల్డ్ ప్రాక్టికల్ ప్రోగ్రామ్స్ (Step-by-Step)</div>
    <div class="section-body">
      <p>ఇప్పటివరకు నేర్చుకున్న కండిషన్స్ తో 7 ముఖ్యమైన ప్రాక్టికల్ ప్రోగ్రామ్స్ రాద్దాం:</p>

      <!-- Program 1 & 2: Even/Odd & Positive/Negative -->
      <div style="margin:18px 0;">
        <h4 style="color:#10b981;">ప్రోగ్రామ్స్ 1 &amp; 2: నంబర్ సరిసంఖ్య (Even) / బేసిసంఖ్య (Odd) &amp; Positive / Negative</h4>
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
        <h4 style="color:#10b981;">ప్రోగ్రామ్స్ 3 &amp; 4: మూడిట్లో పెద్ద సంఖ్య &amp; లీప్ ఇయర్ (Leap Year) కనుక్కోవడం</h4>
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
        <h4 style="color:#10b981;">ప్రోగ్రామ్స్ 5, 6 &amp; 7: Switch క్యాలిక్యులేటర్ &amp; ఓటు వేయడానికి అర్హత ఉందా?</h4>
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
