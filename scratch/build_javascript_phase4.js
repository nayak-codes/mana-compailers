const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

// JS Masterclass Curriculum Structure
const JS_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'JavaScript Fundamentals & Basics',
    icon: '🟨',
    desc: 'JavaScript Introduction, Browser Console, <script> tag, External JS, Comments, Statements & Errors, Variables (let, const, var), and Data Types (string, number, boolean, null, undefined, typeof).',
    lessons: [
      { num: 1, file: '01-javascript-fundamentals.html', title: '1. Welcome & JS Fundamentals', subtopics: 'JS ante enti? · History & Uses · Browser Role · First Program' },
      { num: 2, file: '02-javascript-syntax-and-errors.html', title: '2. Setup, Console & Script Tag', subtopics: 'Browser Console · script tag · External .js · Comments · VS Code' },
      { num: 3, file: 'variables.html', title: '3. Variables (let, const, var)', subtopics: 'Variables ante enti? · let vs const vs var · Swapping · Naming Rules' },
      { num: 4, file: 'data-types.html', title: '4. Data Types (string, number, boolean...)', subtopics: 'Primitive Types · typeof · null vs undefined · NaN · \"5\" vs 5' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Operators & Input',
    icon: '⚡',
    desc: 'Arithmetic, Comparison (== vs ===), Logical (&&, ||, !), Ternary, Precedence, Type Conversion, Template Literals, alert(), prompt(), confirm(), and DOM output.',
    lessons: [
      { num: 5, file: '05-operators-expressions-and-precedence.html', title: '5. Operators, Expressions & Precedence', subtopics: 'Arithmetic · Comparison (== vs ===) · Logical · Ternary · Precedence' },
      { num: 6, file: '06-browser-input-and-number-parsing.html', title: '6. Type Conversion & Template Literals', subtopics: 'Number() · parseInt() · String() · Boolean() · Truthy & Falsy · Backticks' },
      { num: 7, file: 'input-output.html', title: '7. Input & Output (alert, prompt...)', subtopics: 'console.log · alert() · prompt() · confirm() · Node readline · DOM output' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Conditionals & Loops',
    icon: '🔀',
    desc: 'if-else branching, ternary expressions, switch statements, for loops, while loops, do-while, and break/continue.',
    lessons: [
      { num: 8, file: 'conditionals.html', title: '8. Conditionals (if-else & switch)', subtopics: 'if-else Chains · Ternary Expressions · Short-circuiting · Switch Statements' },
      { num: 9, file: 'loops.html', title: '9. Loops & Control Flow', subtopics: 'for, while, do-while · for...of · break & continue' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Strings & Functions',
    icon: '🧩',
    desc: 'String methods, template literals, function declarations, function expressions, arrow functions, and default parameters.',
    lessons: [
      { num: 10, file: 'strings.html', title: '10. Strings & Template Literals', subtopics: 'String Methods · Template Literals · Slicing & Splitting' },
      { num: 11, file: 'functions.html', title: '11. Functions & Arrow Syntax', subtopics: 'Function Declaration vs Expression · Arrow Functions · Default Parameters' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Arrays & Objects',
    icon: '📊',
    desc: 'Array manipulation, iteration methods (map, filter, reduce), object literals, JSON, and ES6 destructuring.',
    lessons: [
      { num: 12, file: 'arrays.html', title: '12. Arrays Basics & Methods', subtopics: 'Array Basics · push/pop/shift/unshift · Spread & Destructuring' },
      { num: 13, file: 'array-methods.html', title: '13. Higher-Order Array Methods', subtopics: 'map · filter · reduce · find · forEach' },
      { num: 14, file: 'objects.html', title: '14. Objects & JSON', subtopics: 'Object Literals · Properties & Methods · this Keyword · Destructuring' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'DOM & Browser APIs',
    icon: '🌐',
    desc: 'DOM Selection, manipulation, event handling, Forms, LocalStorage, and Timers.',
    lessons: [
      { num: 15, file: 'dom.html', title: '15. DOM Basics & Tree Selection', subtopics: 'querySelector · textContent · style · classList · createElement' },
      { num: 16, file: 'events-and-forms.html', title: '16. Events, Listeners & Form Handling', subtopics: 'addEventListener · click · submit · preventDefault · e.target' },
      { num: 17, file: 'browser-apis-and-storage.html', title: '17. LocalStorage & Timers', subtopics: 'localStorage · sessionStorage · JSON Storage · setTimeout · setInterval' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Asynchronous JavaScript & APIs',
    icon: '⏳',
    desc: 'JSON, Fetch API, Promises, async/await, and error handling.',
    lessons: [
      { num: 18, file: 'json-and-fetch-api.html', title: '18. JSON & Fetch API (HTTP)', subtopics: 'JSON.stringify · JSON.parse · fetch() · async/await · HTTP Status' },
      { num: 19, file: 'promises.html', title: '19. Promises & Async/Await', subtopics: 'Callbacks · Promise States · resolve/reject · async/await · try...catch' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Object-Oriented Programming (OOP)',
    icon: '🏗️',
    desc: 'Classes, constructors, methods, inheritance, super, and private fields.',
    lessons: [
      { num: 20, file: 'oop.html', title: '20. OOP: Classes & Prototypes', subtopics: 'ES6 Classes · Constructor · extends · super() · #private fields' }
    ]
  }
];

function generateJSAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  JS_CURRICULUM.forEach(phase => {
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
      html += `        <a href="/blog-javascript/${l.file}"${isActive}>${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

function wrapJSLessonPage(title, desc, filename, currentNum, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateJSAccordionSidebar(filename);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — JavaScript Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="javascript tutorial, ${title.toLowerCase()}, learn javascript, javascript online compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-javascript/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  
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

    function highlightJSCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push(\`<span class="\${cls}">\${text}</span>\`);
        return \`___JS_TOK_\${id}___\`;
      };

      // 1. Comments
      let code = rawCode.replace(/(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*$)/gm, m => pushToken('cm', m));

      // 2. Strings & Template Literals
      code = code.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)/g, m => pushToken('st', m));

      // 3. Keywords
      const kwList = ['const','let','var','function','return','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','new','this','class','extends','super','import','export','async','await','yield','of','in','typeof','instanceof','delete','void'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 4. Built-in Classes & Objects
      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false','alert','prompt','confirm','parseInt','parseFloat','isNaN'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('vr', m));

      // 5. Functions & Methods
      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => {
        if (['if','for','while','switch','catch'].includes(fnName)) return m;
        return pushToken('fn', fnName);
      });

      // 6. Numbers
      code = code.replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, m => pushToken('nu', m));

      // 7. Restore Tokens
      code = code.replace(/___JS_TOK_(\\d+)___/g, (_, id) => tokens[id]);
      return code;
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

          const rawCode = codeEl.textContent;
          codeEl.innerHTML = highlightJSCode(rawCode);

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
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_nodejs', rawCode);
              localStorage.setItem('code_javascript', rawCode);
              window.location.href = '/?lang=nodejs';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl) {
            const rawCode = codeEl.textContent;
            codeEl.innerHTML = highlightJSCode(rawCode);
            if (runBtn) {
              runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('code_nodejs', rawCode);
                localStorage.setItem('code_javascript', rawCode);
                window.location.href = '/?lang=nodejs';
              });
            }
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-javascript">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html" class="active">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">JavaScript Course</div>
    <a href="/blog-javascript.html" class="sidebar-home-link">🟨 JavaScript HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=nodejs" style="color:#f7df1e; font-weight:700;">▶ Try JavaScript Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (32 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-javascript.html">JavaScript</a><span class="sep">›</span>
      <span class="current">Lesson ${currentNum}: ${title}</span>
    </div>

    <h1 class="page-title">${title}</h1>

    <div class="page-meta">
      <span class="badge">🟨 JavaScript (ES2026+)</span>
      <span class="badge">🟢 Lesson ${currentNum}</span>
      <span class="badge">📂 Phase 04: Conditions</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f7df1e; font-weight:700;">📌 Covered in this lesson:</span>
      <span>${subtopics}</span>
    </div>

${contentBody}

    <div class="nav-footer">
      ${prevFile ? `
      <a href="${prevFile}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevTitle}</span>
      </a>` : `
      <a href="/blog-javascript.html" class="nav-btn">
        <span class="label">← JS Overview</span>
        <span class="title">Course Index</span>
      </a>`}

      ${nextFile ? `
      <a href="${nextFile}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextTitle}</span>
      </a>` : `
      <a href="/blog-javascript.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Phase →</span>
        <span class="title">Phase 5: Loops</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 7: Input & Output ────────────────────────────────────────
function buildLesson7() {
  const title = "JavaScript Input & Output తెలుగులో | console.log, alert, prompt, confirm";
  const desc = "JavaScript లో console.log, console.table, alert(), prompt(), confirm() ఎలా వాడాలి, user నుంచి input ఎలా తీసుకోవాలి అనేది తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "input-output.html";
  const subtopics = "console.log · console.error · console.warn · console.table · alert() · prompt() · confirm() · Node.js readline · DOM innerText";

  const contentBody = String.raw`
    <div class="intro-box">
      <p>ఒక హోటల్ కి వెళ్ళినప్పుడు ఏం జరుగుతుంది? మీరు వెయిటర్ కి ఆర్డర్ చెబుతారు (<strong>input</strong>). వంటగది ఆ ఆర్డర్ తయారు చేసి, మీ టేబుల్ కి భోజనం తెస్తారు (<strong>output</strong>). Programs కూడా అలాగే పని చేస్తాయి: user నుంచి ఏదైనా తీసుకుంటాయి, లెక్కించి, ఫలితం చూపిస్తాయి.</p>
      <p>ఇప్పటివరకు మనం <code>console.log()</code> తో output చూపించాం. ఈ chapter లో output చూపించే మరిన్ని మార్గాలు, మరియు user నుంచి <strong>input</strong> తీసుకునే విధానం నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>console.log</code>, <code>console.error</code>, <code>console.warn</code>, <code>console.table</code></li>
        <li><code>alert()</code> తో popup message చూపించడం</li>
        <li><code>prompt()</code> తో user నుంచి input తీసుకోవడం</li>
        <li><code>confirm()</code> తో అవును/కాదు అడగడం</li>
        <li>Node.js లో input తీసుకునే పద్ధతి (చిన్న పరిచయం)</li>
        <li>Page లో output చూపించడం (DOM పరిచయం)</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Output: ఫలితం చూపించే మార్గాలు</div>
    <div class="section-body">
      <h3 style="margin-bottom: 8px; font-size: 16px;">1. <code>console.log()</code>: ఇప్పటికే తెలిసినదే</h3>
      <p>ఒకేసారి ఎన్ని విషయాలైనా కామాలతో వేరు చేసి print చేయొచ్చు:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log("పేరు:", "రవి", "వయసు:", 20);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        పేరు: రవి వయసు: 20
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">2. <code>console.error()</code> మరియు <code>console.warn()</code></h3>
      <p>ఇవి print చేస్తాయి, కానీ browser console లో <strong>ఎరుపు (error)</strong> లేదా <strong>పసుపు (warning)</strong> రంగులో కనిపిస్తాయి.</p>
      <div class="code-block">
        <pre><code>console.log("ఇది సాధారణ message");
console.warn("ఇది హెచ్చరిక");
console.error("ఇది error message");</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output (browser console లో):</span><br>
        ఇది సాధారణ message<br>
        <span style="color:#eab308;">ఇది హెచ్చరిక &nbsp;&nbsp;&nbsp;(పసుపు రంగులో)</span><br>
        <span style="color:#ef4444;">ఇది error message &nbsp;(ఎరుపు రంగులో)</span>
      </div>
      <p style="margin-top: 8px; font-size: 13.5px; color: var(--text3);">రంగులు browser console లో మాత్రమే కనిపిస్తాయి. Text అయితే అన్నీ ఒకేలా ఉంటుంది.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">3. <code>console.table()</code>: పట్టిక రూపంలో చూపించడం</h3>
      <p>ఎక్కువ డేటా ఉన్నప్పుడు, <code>console.table()</code> దాన్ని చక్కని పట్టికగా చూపిస్తుంది:</p>
      <div class="code-block">
        <pre><code>const students = [
  { name: "Ravi", marks: 80 },
  { name: "Sita", marks: 90 },
  { name: "Kiran", marks: 75 }
];

console.table(students);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output (సుమారుగా ఇలా కనిపిస్తుంది):</span><br>
        (index) &nbsp; name &nbsp;&nbsp;&nbsp; marks<br>
        0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Ravi" &nbsp;&nbsp; 80<br>
        1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Sita" &nbsp;&nbsp; 90<br>
        2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Kiran" &nbsp; 75
      </div>
      <div class="callout" style="margin-top: 12px;">
        <div class="callout-title">📌 గమనిక</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">Arrays మరియు objects ని ముందు chapters లో వివరంగా నేర్చుకుంటాం. ఇప్పటికి కేవలం <code>console.table()</code> ఎంత చక్కగా డేటాని చూపిస్తుందో గమనించండి. పట్టిక రూపం browser ని బట్టి, Node.js ని బట్టి కొద్దిగా మారొచ్చు.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span><code>alert()</code>: Popup message చూపించడం</div>
    <div class="section-body">
      <p><code>alert()</code> browser లో ఒక చిన్న popup box చూపిస్తుంది. User <strong>OK</strong> నొక్కేవరకు page లో ఏమీ చేయలేరు:</p>
      <div class="code-block">
        <pre><code>alert("స్వాగతం! JavaScript నేర్చుకుందాం");</code></pre>
      </div>
      <p style="margin-top: 8px;"><strong>ఫలితం:</strong> Browser లో ఒక popup వస్తుంది, అందులో ఆ message మరియు OK బటన్ ఉంటాయి.</p>

      <div class="callout callout-warning" style="margin-top: 15px;">
        <div class="callout-title">⚠️ ముఖ్యమైన విషయం</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;"><code>alert()</code>, <code>prompt()</code>, <code>confirm()</code> <strong>browser లో మాత్రమే</strong> పని చేస్తాయి. Node.js లో లేదా online compilers లో ఇవి పని చేయవు, ఇలా error వస్తుంది:</p>
        <pre style="background:rgba(0,0,0,0.3); padding:8px; border-radius:6px; margin-top:8px;"><code>ReferenceError: alert is not defined</code></pre>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">ఈ examples ని పరీక్షించడానికి browser console (<code>F12</code>) లేదా <code>index.html</code> file వాడండి.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span><code>prompt()</code>: User నుంచి input తీసుకోవడం</div>
    <div class="section-body">
      <p><code>prompt()</code> ఒక popup తో user ని ఏదైనా అడుగుతుంది. User టైప్ చేసిన దాన్ని program కి తిరిగి ఇస్తుంది:</p>
      <div class="code-block">
        <pre><code>const name = prompt("మీ పేరు ఏమిటి?");
alert(&#96;నమస్కారం &#36;{name}!&#96;);</code></pre>
      </div>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li>"మీ పేరు ఏమిటి?" అని ఒక popup వస్తుంది, దానిలో టైప్ చేయడానికి ఒక box ఉంటుంది.</li>
        <li>User "రవి" అని టైప్ చేసి OK నొక్కితే, <code>name</code> లో <code>"రవి"</code> నిల్వ అవుతుంది.</li>
        <li>తర్వాత "నమస్కారం రవి!" అనే alert వస్తుంది.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Default విలువ ఇవ్వడం</h3>
      <p><code>prompt()</code> కి రెండో విలువ ఇస్తే, అది box లో ముందే నింపి ఉంటుంది:</p>
      <div class="code-block">
        <pre><code>const city = prompt("మీ ఊరు ఏది?", "హైదరాబాద్");
console.log(city);</code></pre>
      </div>
      <p style="margin-top: 8px;">User ఏమీ మార్చకుండా OK నొక్కితే <code>"హైదరాబాద్"</code> వస్తుంది.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;"><code>prompt()</code> ఎప్పుడూ string ఇస్తుంది!</h3>
      <div class="callout">
        <div class="callout-title">💡 Chapter 6 గుర్తుందా?</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">User <code>25</code> అని టైప్ చేసినా, <code>prompt()</code> ఇచ్చేది <code>"25"</code> అనే <strong>string</strong>. అందుకే లెక్కలు చేసే ముందు <code>Number()</code> వాడాలి.</p>
      </div>
      <div class="code-block" style="margin-top:12px;">
        <pre><code>const age = prompt("మీ వయసు ఎంత?");
console.log(typeof age);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output (user 25 టైప్ చేస్తే):</span><br>
        string
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ఉదాహరణ: రెండు సంఖ్యల మొత్తం</h3>
      <div class="code-block">
        <pre><code>const a = Number(prompt("మొదటి సంఖ్య:"));
const b = Number(prompt("రెండో సంఖ్య:"));

alert(&#96;మొత్తం: &#36;{a + b}&#96;);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">User 10 మరియు 20 ఇస్తే alert:</span><br>
        మొత్తం: 30
      </div>
      <p style="margin-top: 8px;"><code>Number()</code> వాడకపోతే <code>"10" + "20"</code> అతికించబడి <code>"1020"</code> వచ్చేది.</p>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">Cancel నొక్కితే ఏం జరుగుతుంది?</h3>
      <table class="tbl">
        <tr><th>User చేసేది</th><th><code>prompt()</code> ఇచ్చేది</th></tr>
        <tr><td>Cancel నొక్కుతే</td><td><code>null</code></td></tr>
        <tr><td>ఖాళీగా OK నొక్కుతే</td><td><code>""</code> (ఖాళీ string)</td></tr>
        <tr><td><code>hello</code> టైప్ చేస్తే</td><td><code>"hello"</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">5</span><code>confirm()</code>: అవును / కాదు అడగడం</div>
    <div class="section-body">
      <p><code>confirm()</code> ఒక popup తో రెండు బటన్లు (<strong>OK</strong> మరియు <strong>Cancel</strong>) చూపిస్తుంది. OK నొక్కితే <code>true</code>, Cancel నొక్కితే <code>false</code> ఇస్తుంది:</p>
      <div class="code-block">
        <pre><code>const wantsDelete = confirm("ఈ file ని delete చేయాలా?");

console.log(wantsDelete ? "Delete అయ్యింది" : "Cancel చేశారు");</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">OK నొక్కితే:</span><br>
        Delete అయ్యింది<br><br>
        <span style="color:#64748b;">Cancel నొక్కితే:</span><br>
        Cancel చేశారు
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">మూడింటి పోలిక</h3>
      <table class="tbl">
        <tr><th>Function</th><th>పని</th><th>ఏమి తిరిగి ఇస్తుంది</th></tr>
        <tr><td><code>alert()</code></td><td>message చూపిస్తుంది</td><td><code>undefined</code></td></tr>
        <tr><td><code>prompt()</code></td><td>text తీసుకుంటుంది</td><td>string లేదా <code>null</code></td></tr>
        <tr><td><code>confirm()</code></td><td>అవును/కాదు అడుగుతుంది</td><td><code>true</code> లేదా <code>false</code></td></tr>
      </table>

      <div class="callout" style="margin-top: 15px;">
        <div class="callout-title">💡 నిజ జీవితంలో</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">ఈ రోజుల్లో నిజమైన వెబ్సైట్లలో <code>alert</code> మరియు <code>prompt</code> లను దాదాపు ఎవరూ వాడరు, ఎందుకంటే అవి page ని ఆపేస్తాయి. కానీ నేర్చుకోవడానికి, చిన్న tests కి అవి చాలా సులభం. నిజమైన sites లో HTML forms వాడతాం.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">6</span>Node.js లో input తీసుకోవడం (చిన్న పరిచయం)</div>
    <div class="section-body">
      <p>మీరు browser కాకుండా Node.js లో JavaScript run చేస్తే, <code>prompt()</code> ఉండదు. అక్కడ <code>readline</code> అనే built-in module వాడతాం:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript (Node.js)</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("మీ పేరు ఏమిటి? ", (name) => {
  console.log(&#96;నమస్కారం &#36;{name}!&#96;);
  rl.close();
});</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">user Ravi అని టైప్ చేస్తే:</span><br>
        మీ పేరు ఏమిటి? Ravi<br>
        నమస్కారం Ravi!
      </div>
      <p style="margin-top: 8px; font-size: 13.5px; color: var(--text3);">ఇందులో <code>(name) =&gt; { ... }</code> అనేది ఒక <strong>arrow function</strong>. Functions ని తర్వాత chapters లో నేర్చుకుంటాం. ఇప్పుడు "Node.js లో input ఇలా తీసుకుంటారు" అని మాత్రం తెలుసుకోండి.</p>
      <p style="margin-top: 8px; font-size: 13.5px; color: var(--text2);">Online compiler లో user input ఇవ్వడానికి "Input" box వాడండి. అలా కాకపోతే, విలువలను code లోనే variables గా రాసి practice చేయొచ్చు.</p>
    </div>

    <div class="section-title"><span class="num">7</span>Page లో Output చూపించడం (DOM పరిచయం)</div>
    <div class="section-body">
      <p><code>console.log()</code> output page లో కనిపించదు, అది developer కి మాత్రమే (console లో). వెబ్సైట్ visitors కి ఫలితం page లోనే చూపించాలి:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">HTML + JavaScript</span>
        </div>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
  &lt;h2 id="greeting"&gt;&lt;/h2&gt;
  &lt;script&gt;
    const name = prompt("మీ పేరు ఏమిటి?");
    document.getElementById("greeting").innerText = &#96;నమస్కారం &#36;{name}!&#96;;
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </div>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6; margin-top: 10px;">
        <li><code>&lt;h2 id="greeting"&gt;</code> ఒక ఖాళీ heading, దానికి <code>greeting</code> అనే పేరు (id) పెట్టాం.</li>
        <li><code>document.getElementById("greeting")</code> ఆ heading ని "వెతికి పట్టుకుంటుంది".</li>
        <li><code>.innerText = ...</code> ఆ heading లో text ని పెడుతుంది.</li>
      </ul>
      <p style="margin-top: 8px;">ఇదే <strong>DOM</strong> యొక్క మొదటి రుచి. DOM గురించి తర్వాతి chapters లో వివరంగా నేర్చుకుంటాం.</p>
    </div>

    <div class="section-title"><span class="num">8</span>ఉదాహరణ: ఉష్ణోగ్రత Converter</div>
    <div class="section-body">
      <p>Celsius ని Fahrenheit గా మార్చే సూత్రం: <code>F = C × 9 / 5 + 32</code>:</p>
      <div class="code-block">
        <pre><code>const celsius = Number(prompt("Celsius లో ఉష్ణోగ్రత ఎంత?"));
const fahrenheit = celsius * 9 / 5 + 32;

alert(&#96;&#36;{celsius}°C = &#36;{fahrenheit}°F&#96;);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">User 100 ఇస్తే alert:</span><br>
        100°C = 212°F<br><br>
        <span style="color:#64748b;">User 25 ఇస్తే:</span> 25°C = 77°F<br>
        <span style="color:#64748b;">User 0 ఇస్తే:</span> 0°C = 32°F
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li style="margin-bottom: 10px;">
          <strong>1. <code>prompt()</code> ఫలితం string అని మర్చిపోవడం:</strong>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; margin-top:5px;"><code>const a = prompt("సంఖ్య 1:");
const b = prompt("సంఖ్య 2:");
console.log(a + b); // "1020" వస్తుంది, 30 కాదు!</code></pre>
          సరిచేయడం: <code>Number(a) + Number(b)</code>
        </li>
        <li style="margin-bottom: 10px;">
          <strong>2. Cancel నొక్కితే <code>null</code> వస్తుందని మర్చిపోవడం:</strong>
          <code>Number(null)</code> అనేది <code>0</code> అవుతుంది, <code>NaN</code> కాదు. Cancel ని ముందే చెక్ చేయాలి.
        </li>
        <li style="margin-bottom: 10px;">
          <strong>3. Browser functions ని Node.js లో వాడటం:</strong>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; margin-top:5px;"><code>alert("Hello"); // Node.js లో: ReferenceError: alert is not defined</code></pre>
        </li>
        <li style="margin-bottom: 10px;">
          <strong>4. <code>console.log()</code> page లో కనిపిస్తుందనుకోవడం:</strong>
          <code>console.log()</code> browser console లో మాత్రమే కనిపిస్తుంది. Page visitors కి చూపించాలంటే <code>innerText</code> వాడాలి.
        </li>
        <li>
          <strong>5. <code>alert</code> ని ఎక్కువగా వాడటం:</strong>
          ప్రతి చిన్న విషయానికి <code>alert</code> వాడితే user కి చిరాకు వస్తుంది. Debug చేయడానికి <code>console.log</code> వాడండి.
        </li>
      </ul>
    </div>

    <div class="section-title"><span class="num">9</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>prompt()</code> తో user పేరు మరియు ఊరు అడిగి, <code>alert</code> లో "నమస్కారం ___, మీరు ___ నుంచి వచ్చారు" అని చూపించండి.</li>
        <li>రెండు సంఖ్యలు అడిగి, వాటి <strong>గుణకారం</strong> alert లో చూపించండి.</li>
        <li>ఒక దీర్ఘచతురస్రం యొక్క పొడవు, వెడల్పు అడిగి, దాని <strong>వైశాల్యం</strong> (area = పొడవు × వెడల్పు) చూపించండి.</li>
        <li>Celsius ఇస్తే Fahrenheit చూపించే converter రాయండి. (<code>F = C × 9 / 5 + 32</code>)</li>
        <li><code>confirm("మీకు 18 ఏళ్లు నిండాయా?")</code> అడిగి, OK అయితే "మీరు ఓటు వేయొచ్చు", Cancel అయితే "ఇంకా కొన్ని సంవత్సరాలు వేచి చూడండి" అని చూపించండి.</li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2); line-height: 1.6;">
          <p><strong>1.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const name = prompt("మీ పేరు ఏమిటి?");
const city = prompt("మీ ఊరు ఏది?");
alert(&#96;నమస్కారం &#36;{name}, మీరు &#36;{city} నుంచి వచ్చారు&#96;);</code></pre>

          <p style="margin-top: 12px;"><strong>2.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const x = Number(prompt("మొదటి సంఖ్య:"));
const y = Number(prompt("రెండో సంఖ్య:"));
alert(&#96;గుణకారం: &#36;{x * y}&#96;);</code></pre>

          <p style="margin-top: 12px;"><strong>3.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const length = Number(prompt("పొడవు ఎంత?"));
const breadth = Number(prompt("వెడల్పు ఎంత?"));
alert(&#96;వైశాల్యం: &#36;{length * breadth}&#96;);</code></pre>
          <p>పొడవు 5, వెడల్పు 4 ఇస్తే: వైశాల్యం: 20</p>

          <p style="margin-top: 12px;"><strong>4.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const c = Number(prompt("Celsius లో ఉష్ణోగ్రత:"));
const f = c * 9 / 5 + 32;
alert(&#96;&#36;{c}°C = &#36;{f}°F&#96;);</code></pre>
          <p>100 ఇస్తే: 100°C = 212°F</p>

          <p style="margin-top: 12px;"><strong>5.</strong></p>
          <pre style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px;"><code>const isAdult = confirm("మీకు 18 ఏళ్లు నిండాయా?");
console.log(isAdult ? "మీరు ఓటు వేయొచ్చు" : "ఇంకా కొన్ని సంవత్సరాలు వేచి చూడండి");</code></pre>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Browser లేనప్పుడు కూడా పని చేసే విధంగా, విలువలను variables లో పెట్టి చక్కని output చూపించే ఈ code ని run చేయండి:</p>
      <div class="code-block">
        <pre><code>const shopName = "Ravi Stores";

const ricePrice = 60;
const riceQty = 2;
const dalPrice = 120;
const dalQty = 1;
const oilPrice = 150;
const oilQty = 1;

const total = ricePrice * riceQty + dalPrice * dalQty + oilPrice * oilQty;

console.log(&#96;--- &#36;{shopName} ---&#96;);
console.log(&#96;Rice: ₹&#36;{ricePrice} x &#36;{riceQty} = ₹&#36;{ricePrice * riceQty}&#96;);
console.log(&#96;Dal:  ₹&#36;{dalPrice} x &#36;{dalQty} = ₹&#36;{dalPrice * dalQty}&#96;);
console.log(&#96;Oil:  ₹&#36;{oilPrice} x &#36;{oilQty} = ₹&#36;{oilPrice * oilQty}&#96;);
console.log(&#96;మొత్తం బిల్లు: ₹&#36;{total}&#96;);</code></pre>
      </div>
      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        --- Ravi Stores ---<br>
        Rice: ₹60 x 2 = ₹120<br>
        Dal:  ₹120 x 1 = ₹120<br>
        Oil:  ₹150 x 1 = ₹150<br>
        మొత్తం బిల్లు: ₹390
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2); line-height: 1.6;">
        <li><strong>Output</strong> కోసం: <code>console.log()</code> (సాధారణం), <code>console.warn()</code> (హెచ్చరిక), <code>console.error()</code> (తప్పు), <code>console.table()</code> (పట్టిక).</li>
        <li><code>alert()</code> popup తో message చూపిస్తుంది.</li>
        <li><code>prompt()</code> user నుంచి text తీసుకుంటుంది, ఎప్పుడూ <strong>string</strong> గా ఇస్తుంది (Cancel అయితే <code>null</code>). లెక్కలకు <code>Number()</code> తప్పనిసరి.</li>
        <li><code>confirm()</code> OK అయితే <code>true</code>, Cancel అయితే <code>false</code> ఇస్తుంది.</li>
        <li><code>alert</code>, <code>prompt</code>, <code>confirm</code> <strong>browser లో మాత్రమే</strong> పని చేస్తాయి. Node.js లో <code>readline</code> వాడతాం.</li>
        <li>Page లో ఫలితం చూపించాలంటే <code>document.getElementById("id").innerText = ...</code> వాడతాం.</li>
      </ul>
    </div>

    <div class="intro-box" style="background: linear-gradient(135deg, rgba(247,223,30,0.1), rgba(20,24,32,0.6)); border-color: rgba(247,223,30,0.3); margin-top:24px;">
      <h3 style="color:#f7df1e; margin-bottom:10px;">🎉 Part 1 పూర్తి అయ్యింది!</h3>
      <p style="color: var(--text2);">అభినందనలు! మీరు JavaScript <strong>Basics</strong> అన్నీ పూర్తి చేశారు:</p>
      <ol style="margin-left: 20px; color: var(--text2); line-height: 1.8; margin-top: 8px;">
        <li>JavaScript పరిచయం</li>
        <li>Setup (console, script tag, external file)</li>
        <li>Variables (<code>let</code>, <code>const</code>, <code>var</code>)</li>
        <li>Data Types</li>
        <li>Operators</li>
        <li>Type Conversion & Template Literals</li>
        <li><strong>Input & Output ✅</strong></li>
      </ol>
      <p style="color: var(--text2); margin-top: 10px;"><strong>తర్వాత Part 2: Control Flow</strong> — ఇక్కడ మీ programs నిర్ణయాలు తీసుకోవడం (if-else) మరియు పనులను పునరావృతం చేయడం (loops) నేర్చుకుంటాయి.</p>
    </div>
  `;

  const html = wrapJSLessonPage(title, desc, filename, 7, subtopics, contentBody, '06-browser-input-and-number-parsing.html', '6. Type Conversion & Template Literals', 'conditionals.html', '8. Conditionals (if-else & switch)');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE blog-javascript.html HOME PAGE ──────────────────────────────────
function buildBlogJSHome() {
  let roadmapCardsHtml = '';
  JS_CURRICULUM.forEach(phase => {
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
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Lesson${phase.lessons.length > 1 ? 's' : ''}</span>
      </div>
      <p class="phase-roadmap-desc">${phase.desc}</p>
      <div class="phase-lessons-list">
`;

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += `        <a href="/blog-javascript/${l.file}" class="curriculum-lesson-row">
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

  const accordionSidebar = generateJSAccordionSidebar(null);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>JavaScript Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 9 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, conditionals, if else, switch, ES6, promises, async await, nodejs, dom, javascript interview questions" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-javascript.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-javascript/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "JavaScript Complete Programming Masterclass (2026 Edition)",
    "description": "Comprehensive JavaScript course covering syntax, V8 engine, ES6+, Async/Await, Promises, Closures, DOM manipulation, Node.js, and technical interview preparation with live runnable code examples.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "isAccessibleForFree": true
  }
  </script>

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
<body class="lang-javascript">

<!-- TOP NAVIGATION -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html" class="active">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">JavaScript Master Course</div>
    <a href="/blog-javascript.html" class="sidebar-home-link active">🟨 JavaScript HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=nodejs" style="color:#f7df1e; font-weight:700;">▶ Try JavaScript Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-java.html">Java Course (32 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">JavaScript Masterclass</span>
    </div>

    <h1 class="page-title">JavaScript Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">🟨 JavaScript (ES2026+)</span>
      <span class="badge">🟢 18 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (9 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, operators & input, conditions & branching, loops, functions, arrays & objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/05-operators-expressions-and-precedence.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-javascript/conditionals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Conditions →</a>
        <a href="/blog-javascript/loops.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Loops →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: Functions →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Arrays & Objects →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Async JS →</a>
        <a href="/blog-javascript/dom.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: DOM & Web APIs →</a>
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
        <span>Reviewed for accuracy & tested on V8 / Node.js runtime · Last updated August 2026</span>
      </div>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(baseDir, 'blog-javascript.html'), html, 'utf8');
  console.log('✅ Updated public/blog-javascript.html with Roadmap Cards and Accordion');
}

// Update sidebars across all lesson files
function updateAllSidebars() {
  const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(jsDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    const accordionHtml = generateJSAccordionSidebar(file);
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, `${accordionHtml}\n  </aside>`);

    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`✅ Updated sidebars across ${files.length} JavaScript lesson files!`);
}

function run() {
  console.log('🚀 Building JavaScript Masterclass Phase 4 (Conditions)...');
  buildLesson7();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 4: Conditions successfully created!');
}

run();
