const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(baseDir, 'blog-javascript');

// Import JS Accordion sidebar helper & shell from Phase 1 script
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
      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false'];
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
      <span class="badge">📂 Phase 01: JavaScript Fundamentals & Basics</span>
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
        <span class="title">Phase 3: Conditionals</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 3: Variables (let, const & var) ───────────────────────────
function buildLesson3() {
  const title = "JavaScript Variables (let, const, var) in Telugu";
  const desc = "జావాస్క్రిప్ట్ లో డేటాని దాచుకోవడానికి Variables ఎలా వాడాలి? let, const, var మధ్య ఉన్న ముఖ్యమైన తేడాలు ఏమిటి అనేది తెలుగులో వివరంగా నేర్చుకోండి.";
  const filename = "variables.html";
  const subtopics = "Variables ante enti? · let · const · var · Reassigning Values · Variable Naming Rules · Global vs Function vs Block Scope · TDZ";

  const contentBody = `
    <div class="intro-box">
      <p>మీ ఫోన్లో కాంటాక్ట్స్ చూడండి. "అమ్మ" అని ఒక పేరు ఉంటుంది, దాని వెనుక ఒక ఫోన్ నంబర్ ఉంటుంది. ప్రతిసారీ పది అంకెల నంబర్ గుర్తుపెట్టుకోకుండా, "అమ్మ" అని పేరు చెబితే చాలు కదా? Programming లో <strong>variable</strong> కూడా అలాంటిదే. ఒక పేరు పెట్టి, దాని వెనుక ఒక విలువ (value) ని దాచిపెడతాం.</p>
      <p>Programming లో దాదాపు ప్రతి program కి variables అవసరం. అందుకే ఈ chapter చాలా ముఖ్యమైనది. మెల్లగా, ఉదాహరణలతో నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>Variable అంటే ఏమిటి, ఎందుకు అవసరం</li>
        <li><code>let</code>, <code>const</code>, <code>var</code> తో variables ని declare చేయడం</li>
        <li>ఈ మూడింటి మధ్య తేడాలు, ఏది ఎప్పుడు వాడాలి</li>
        <li>Variable పేర్లు పెట్టేటప్పుడు పాటించాల్సిన నియమాలు</li>
        <li>రెండు variables విలువలను swap చేయడం</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Variable అంటే ఏమిటి?</div>
    <div class="section-body">
      <p><strong>Variable</strong> అంటే data ని store చేసే ఒక <strong>డబ్బా (box)</strong>. ఆ డబ్బా మీద ఒక <strong>పేరు (label)</strong> అతికిస్తాం. ఆ పేరు చెబితే లోపల ఉన్న విలువ వస్తుంది.</p>
      <p>ఉదాహరణకు, వంటింట్లో "చక్కెర" అని రాసిన డబ్బా ఉంటుంది. లోపల ఏముందో తెరవకుండానే మనకు తెలుస్తుంది. అలాగే, <code>age</code> అనే variable లో <code>20</code> ఉంటే, <code>age</code> అని రాస్తే <code>20</code> వస్తుంది.</p>
      <p>"Variable" అనే పదానికి అర్థం "మారగలిగేది". అంటే డబ్బాలో విలువ తర్వాత మారొచ్చు (కొన్ని సందర్భాల్లో).</p>

      <h3 style="margin-top: 15px; margin-bottom: 10px; font-size: 16px;">మొదటి variable</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — First Variable</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let name = "రవి";
let age = 20;

console.log(name);
console.log(age);
console.log("పేరు:", name, "వయసు:", age);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">రవి
20
పేరు: రవి వయసు: 20</pre>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">Code అర్థం చేసుకుందాం</h3>
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>let</code> అనేది ఒక <strong>keyword</strong>. "ఇప్పుడు ఒక కొత్త variable తయారు చేస్తున్నాను" అని JavaScript కి చెబుతుంది.</li>
        <li><code>name</code> అనేది variable పేరు (డబ్బా మీద label).</li>
        <li><code>=</code> అంటే "సమానం" కాదు. ఇక్కడ దీని అర్థం "కుడివైపు ఉన్న విలువను ఎడమవైపు ఉన్న డబ్బాలో పెట్టు" (assignment).</li>
        <li><code>"రవి"</code> అనేది ఆ డబ్బాలో పెట్టిన విలువ.</li>
        <li><code>console.log("పేరు:", name, "వయసు:", age)</code> లో కామాలతో ఎన్ని విషయాలైనా కలిపి print చేయొచ్చు.</li>
      </ul>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">ఖాళీ variable</h3>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Uninitialized Variable</span>
        </div>
        <pre><code>let city;
console.log(city);
city = "హైదరాబాద్";
console.log(city);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">undefined
హైదరాబాద్</pre>
      <p>విలువ ఇవ్వనప్పుడు, variable లో <code>undefined</code> ఉంటుంది. అంటే "ఇంకా ఏ విలువా పెట్టలేదు".</p>
    </div>

    <div class="section-title"><span class="num">3</span>మూడు keywords: let, const, var</div>
    <div class="section-body">
      <p>JavaScript లో variable తయారు చేయడానికి మూడు keywords ఉన్నాయి. ఒక్కొక్కటి చూద్దాం.</p>
      
      <h3 style="margin-top: 15px; margin-bottom: 10px; font-size: 16px;">1. let: విలువ మారొచ్చు</h3>
      <p>తర్వాత విలువ మారే అవకాశం ఉన్నప్పుడు <code>let</code> వాడతాం. ఉదాహరణకు, ఆటలో score.</p>
      <div class="code-block">
        <pre><code>let score = 10;
console.log(score);

score = 25;
console.log(score);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong> <code>10</code>, <code>25</code>. (రెండోసారి <code>score</code> ముందు <code>let</code> రాయలేదు, ఎందుకంటే డబ్బా ముందే తయారైంది).</p>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">2. const: విలువ మారదు</h3>
      <p><strong>const</strong> అంటే constant (స్థిరంగా ఉండేది). ఒక్కసారి విలువ పెట్టాక, దాన్ని మార్చలేం. π విలువ లేదా వారంలో రోజుల సంఖ్య లాంటివి మారవు కదా, అలాంటి వాటికి <code>const</code> వాడతాం.</p>
      <div class="code-block">
        <pre><code>const pi = 3.14159;
console.log(pi);

// pi = 3.14; // ❌ TypeError: Assignment to constant variable.</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 10px; font-size: 16px;">3. var: పాత పద్ధతి</h3>
      <p><code>var</code> అనేది JavaScript లో పాత పద్ధతి. 2015 లో <code>let</code> మరియు <code>const</code> వచ్చాయి. <code>var</code> తో ఒకే పేరుతో రెండోసారి declare చేసినా error రాదు, కానీ దానికి సరైన స్కోప్ లేకపోవడం వల్ల బగ్స్ వస్తాయి.</p>

      <table class="tbl" style="margin-top:15px;">
        <tr><th>లక్షణం</th><th>var</th><th>let</th><th>const</th></tr>
        <tr><td>విలువ మార్చొచ్చా?</td><td>అవును</td><td>అవును</td><td><strong>కాదు</strong></td></tr>
        <tr><td>అదే పేరుతో మళ్ళీ declare చేయొచ్చా?</td><td>అవును</td><td><strong>కాదు</strong></td><td><strong>కాదు</strong></td></tr>
        <tr><td>Scope</td><td>Function scope</td><td>Block scope</td><td>Block scope</td></tr>
        <tr><td>ఈ రోజుల్లో వాడాలా?</td><td>వద్దు (పాత code లో మాత్రమే)</td><td>అవును</td><td>అవును</td></tr>
      </table>

      <div class="callout" style="margin-top:15px;">
        <div class="callout-title">💡 ఏది ఎప్పుడు వాడాలి? (సులభమైన నియమం):</div>
        <ol style="margin-left: 20px; color: var(--text2); font-size: 14px;">
          <li>ముందు ఎప్పుడూ <strong>const</strong> తో మొదలుపెట్టండి.</li>
          <li>తర్వాత విలువ మార్చాల్సి వస్తే మాత్రమే <strong>let</strong> కి మార్చండి.</li>
          <li><strong>var</strong> ని కొత్త code లో వాడకండి.</li>
        </ol>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span>Variable పేర్లు పెట్టే నియమాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>పేరులో అక్షరాలు, అంకెలు, <code>_</code> (underscore), <code>$</code> ఉండొచ్చు.</li>
        <li>పేరు <strong>అంకెతో మొదలవ్వకూడదు.</strong> (<code>1name</code> తప్పు, <code>name1</code> సరైనది).</li>
        <li>పేరులో <strong>space ఉండకూడదు.</strong> (<code>my name</code> తప్పు, <code>myName</code> సరైనది).</li>
        <li>పెద్ద అక్షరం, చిన్న అక్షరం తేడా ఉంటుంది. <code>age</code> మరియు <code>Age</code> వేరు వేరు variables.</li>
        <li>JavaScript Keywords (<code>let</code>, <code>const</code>, <code>if</code>, <code>function</code>) ని పేర్లుగా వాడకూడదు.</li>
      </ol>

      <h3 style="margin-top: 15px; margin-bottom: 10px; font-size: 16px;">Naming Convention: camelCase</h3>
      <div class="code-block">
        <pre><code>let studentName = "సీత";
let totalMarks = 450;
let isPassed = true;</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span>ఉదాహరణ: రెండు variables ని swap చేయడం</div>
    <div class="section-body">
      <p>ఇంటర్వ్యూలలో తరచూ అడిగే ప్రశ్న ఇది. రెండు గ్లాసుల్లో ఒకదానిలో పాలు, ఇంకోదానిలో టీ ఉన్నాయి. వాటిని ఒకదానిలోంచి ఒకదానికి మార్చాలంటే మూడో ఖాళీ గ్లాసు (<code>temp</code>) కావాలి కదా!</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Variable Swapping</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let a = 5;
let b = 10;

let temp = a;
a = b;
b = temp;

console.log("a =", a); // 10
console.log("b =", b); // 5</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul>
        <li><strong>Declare చేయకుండా variable వాడటం:</strong> <code>console.log(price)</code> ని declare చేయకుండా వాడితే <code>ReferenceError: price is not defined</code> వస్తుంది.</li>
        <li><strong>const విలువను మార్చడం:</strong> <code>const lang = "JS"; lang = "Py";</code> చేస్తే <code>TypeError: Assignment to constant variable</code> వస్తుంది.</li>
        <li><strong>const కి విలువ ఇవ్వకపోవడం:</strong> <code>const rate;</code> అని వదిలేస్తే <code>SyntaxError: Missing initializer in const declaration</code> వస్తుంది.</li>
        <li><strong>పేరు అంకెతో మొదలుపెట్టడం:</strong> <code>let 1stRank = "Ravi";</code> రాస్తే <code>SyntaxError</code> వస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">6</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li><code>studentName</code> అనే variable లో మీ పేరు, <code>studentAge</code> లో మీ వయసు పెట్టి print చేయండి.</li>
        <li>ఒక <code>let</code> variable <code>balance</code> లో <code>1000</code> పెట్టండి. తర్వాత దాన్ని <code>1500</code> గా మార్చి print చేయండి.</li>
        <li>మూడు సబ్జెక్టుల మార్కులను <code>const</code> లో పెట్టి, వాటి మొత్తాన్ని print చేయండి.</li>
        <li>ఈ పేర్లలో ఏవి తప్పు? <code>my-name</code>, <code>_count</code>, <code>2ndPlace</code>, <code>$price</code>, <code>total marks</code></li>
      </ol>
      
      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>let studentName = "రవి"; let studentAge = 20; console.log(studentName, studentAge);</code></p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>let balance = 1000; balance = 1500; console.log(balance);</code> (Output: 1500)</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>const s1 = 60, s2 = 70, s3 = 80; console.log(s1 + s2 + s3);</code> (Output: 210)</p>
          <p style="margin-top: 8px;"><strong>4.</strong> తప్పు పేర్లు: <code>my-name</code> (hyphen ఉంది), <code>2ndPlace</code> (నంబర్ తో మొదలైంది), <code>total marks</code> (space ఉంది). సరైనవి: <code>_count</code>, <code>$price</code>.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేయండి. తర్వాత విలువలు మార్చి మళ్ళీ run చేయండి:</p>
      <div class="code-block">
        <pre><code>const shopName = "Ravi Stores";
let itemPrice = 50;
let quantity = 3;

let totalBill = itemPrice * quantity;
console.log(shopName);
console.log("మొత్తం బిల్లు:", totalBill);

quantity = 5;
totalBill = itemPrice * quantity;
console.log("కొత్త బిల్లు:", totalBill);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li><strong>Variable</strong> అంటే పేరు ఉన్న ఒక డబ్బా, అందులో data ని store చేస్తాం.</li>
        <li><strong>let</strong>: విలువ మారొచ్చు. <strong>const</strong>: విలువ మారదు. <strong>var</strong>: పాత పద్ధతి, వాడకండి.</li>
        <li>ఎప్పుడూ <code>const</code> తో మొదలుపెట్టి, అవసరమైతేనే <code>let</code> కి మార్చండి.</li>
        <li>Variable పేరు నంబర్ తో మొదలవ్వకూడదు, space ఉండకూడదు, camelCase వాడండి.</li>
      </ul>
    </div>
`;
  const html = wrapJSLessonPage(title, desc, filename, 3, subtopics, contentBody, '02-javascript-syntax-and-errors.html', '2. Syntax & Errors', 'operators.html', '4. Data Types, typeof & Coercion');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 4: Data Types, typeof & Coercion (Phase 2 Part 2) ─────────
function buildLesson4() {
  const title = "JavaScript Data Types తెలుగులో | string, number, boolean, null, undefined";
  const desc = "JavaScript లో data types అంటే ఏమిటి, string, number, boolean, null, undefined మధ్య తేడాలు, typeof operator ని తెలుగులో ఉదాహరణలతో నేర్చుకోండి.";
  const filename = "operators.html";
  const subtopics = "string · number · boolean · null · undefined · typeof Operator · NaN · Infinity · \"5\" vs 5";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంట్లో వంటగదిలో చూడండి. బియ్యం, పప్పు, ఉప్పు, నూనె అన్నీ వేర్వేరు డబ్బాల్లో ఉంటాయి. ఎందుకంటే అవన్నీ వేర్వేరు రకాలు. బియ్యాన్ని కొలిచే విధానం వేరు, నూనెను కొలిచే విధానం వేరు కదా?</p>
      <p>Programming లో కూడా అంతే. Variable డబ్బాల్లో పెట్టే విలువలు వేర్వేరు <strong>రకాలు</strong> (types) గా ఉంటాయి. పేరు (text), సంఖ్య (number), అవును/కాదు (true/false) ఇలా. ఈ రకాలనే <strong>Data Types</strong> అంటారు.</p>
      <p>ఒక విలువ ఏ రకానికి చెందినదో తెలిస్తేనే, దానితో ఏం చేయొచ్చో, ఏం చేయలేమో తెలుస్తుంది. ఉదాహరణకు, రెండు సంఖ్యలను కూడొచ్చు, కానీ "పేరు" ను "పేరు" తో కూడితే ఏమవుతుంది? ఈ chapter లో అవన్నీ చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>JavaScript లోని ముఖ్యమైన data types: string, number, boolean, null, undefined</li>
        <li><code>typeof</code> operator తో ఒక విలువ ఏ రకమో తెలుసుకోవడం</li>
        <li><code>null</code> మరియు <code>undefined</code> మధ్య తేడా</li>
        <li><code>NaN</code> మరియు <code>Infinity</code> అంటే ఏమిటి</li>
        <li><code>"5"</code> మరియు <code>5</code> మధ్య తేడా</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>Primitive Data Types అంటే ఏమిటి?</div>
    <div class="section-body">
      <p>JavaScript లో సరళమైన, ప్రాథమిక రకాలను <strong>Primitive data types</strong> అంటారు. ఈ chapter లో మనం ముఖ్యమైన ఐదింటిని నేర్చుకుందాం:</p>

      <table class="tbl">
        <tr><th>Data Type</th><th>అర్థం</th><th>ఉదాహరణ</th></tr>
        <tr><td><strong>string</strong></td><td>అక్షరాల text</td><td><code>"రవి"</code>, <code>'Hello'</code></td></tr>
        <tr><td><strong>number</strong></td><td>సంఖ్యలు (పూర్ణ మరియు దశాంశ)</td><td><code>25</code>, <code>3.14</code>, <code>-7</code></td></tr>
        <tr><td><strong>boolean</strong></td><td>అవును లేదా కాదు</td><td><code>true</code>, <code>false</code></td></tr>
        <tr><td><strong>null</strong></td><td>"ఉద్దేశపూర్వకంగా ఖాళీ"</td><td><code>null</code></td></tr>
        <tr><td><strong>undefined</strong></td><td>"ఇంకా విలువ ఇవ్వలేదు"</td><td><code>undefined</code></td></tr>
      </table>
      <p style="margin-top:10px; color:var(--text2); font-size:13.5px;">(ఇవి కాకుండా <code>bigint</code>, <code>symbol</code> అనే మరో రెండు ఉన్నాయి. అవి చాలా అరుదుగా వాడతారు, కాబట్టి ప్రస్తుతానికి వదిలేద్దాం.)</p>
    </div>

    <div class="section-title"><span class="num">3</span>typeof operator: విలువ ఏ రకమో తెలుసుకోవడం</div>
    <div class="section-body">
      <p>ఏదైనా విలువ ఏ data type కి చెందినదో తెలుసుకోవడానికి <strong><code>typeof</code></strong> అనే operator వాడతాం.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — typeof Operator</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>console.log(typeof "Hello");
console.log(typeof 25);
console.log(typeof true);
console.log(typeof undefined);</code></pre>
      </div>
      <p style="margin-top:8px;"><strong>Output:</strong></p>
      <pre style="background: #1e1e1e; color: #fff; padding: 10px; border-radius: 8px; font-family: 'JetBrains Mono', monospace;">string
number
boolean
undefined</pre>
      <p><code>typeof</code> తర్వాత విలువ లేదా variable రాస్తే, దాని రకం text గా వస్తుంది. ఈ chapter అంతా దీన్ని వాడుతూనే ఉంటాం.</p>
    </div>

    <div class="section-title"><span class="num">4</span>1. String: Text డేటా</div>
    <div class="section-body">
      <p><strong>String</strong> అంటే అక్షరాల వరుస. పేరు, ఊరు, message, ఇలా text ఏదైనా string. String ని ఎప్పుడూ <strong>quotes</strong> మధ్యలో రాయాలి.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — String Creation</span>
        </div>
        <pre><code>let name1 = "రవి";
let name2 = 'సీత';
let message = &#96;నమస్కారం&#96;;

console.log(name1);
console.log(name2);
console.log(message);
console.log(typeof name1); // string</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">Quotes లోపల quotes రాయడం</h3>
      <div class="code-block">
        <pre><code>console.log("It's a nice day");
console.log('అతను "హాయ్" అన్నాడు');</code></pre>
      </div>

      <h3 style="margin-top: 15px; margin-bottom: 8px; font-size: 16px;">String పొడవు (.length)</h3>
      <div class="code-block">
        <pre><code>let language = "JavaScript";
console.log(language.length); // 10</code></pre>
      </div>
      <p><code>.length</code> తో string లో ఎన్ని అక్షరాలు ఉన్నాయో సులభంగా తెలుస్తుంది.</p>
    </div>

    <div class="section-title"><span class="num">5</span>2. Number: సంఖ్యలు, Infinity & NaN</div>
    <div class="section-body">
      <p>JavaScript లో <strong>number</strong> అనే ఒకే రకం ఉంటుంది. పూర్ణ సంఖ్యలు (<code>10</code>), దశాంశ సంఖ్యలు (<code>3.14</code>), రుణ సంఖ్యలు (<code>-5</code>) అన్నీ number లే.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Number Type</span>
        </div>
        <pre><code>let age = 25;
let price = 99.50;
let temperature = -4;

console.log(typeof age);   // number
console.log(typeof price); // number</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">ప్రత్యేక number విలువలు: Infinity మరియు NaN</h3>
      <p><strong>Infinity:</strong> ఒక సంఖ్యను సున్నాతో భాగిస్తే (గణితంలో ఇది కుదరదు), JavaScript <code>Infinity</code> ఇస్తుంది.</p>
      <div class="code-block">
        <pre><code>console.log(10 / 0);  // Infinity
console.log(-10 / 0); // -Infinity</code></pre>
      </div>

      <p style="margin-top: 10px;"><strong>NaN (Not a Number):</strong> సంఖ్య కాని దాన్ని సంఖ్యలా లెక్కించడానికి ప్రయత్నిస్తే <code>NaN</code> వస్తుంది. ఆశ్చర్యంగా <strong>NaN కూడా "number" రకమే!</strong></p>
      <div class="code-block">
        <pre><code>console.log("abc" * 2);  // NaN
console.log(typeof NaN); // number</code></pre>
      </div>

      <h3 style="margin-top: 20px; margin-bottom: 8px; font-size: 16px;">దశాంశ సంఖ్యల విచిత్రం (Floating Point Quirk)</h3>
      <div class="code-block">
        <pre><code>console.log(0.1 + 0.2); // 0.30000000000000004</code></pre>
      </div>
      <p><code>0.3</code> రావాలి కదా? కంప్యూటర్లు దశాంశ సంఖ్యలను binary లో store చేసే విధానం వల్ల చిన్న తేడా వస్తుంది. డబ్బు లెక్కల్లో దీని గురించి జాగ్రత్తగా ఉండాలి.</p>
    </div>

    <div class="section-title"><span class="num">6</span>3. Boolean: అవును లేదా కాదు (true / false)</div>
    <div class="section-body">
      <p><strong>Boolean</strong> కి కేవలం రెండే విలువలు ఉంటాయి: <code>true</code> (అవును) మరియు <code>false</code> (కాదు). ఇది లైట్ స్విచ్ లాంటిది — ఆన్ లేదా ఆఫ్.</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Boolean Comparisons</span>
        </div>
        <pre><code>let isStudent = true;
let isMarried = false;

console.log(typeof isStudent); // boolean
console.log(10 > 5);           // true
console.log(3 === 4);          // false</code></pre>
      </div>
      <p><strong>గుర్తుంచుకోండి:</strong> <code>true</code> మరియు <code>false</code> ని quotes లో రాయకూడదు. <code>"true"</code> అనేది కేవలం ఒక text (string).</p>
    </div>

    <div class="section-title"><span class="num">7</span>4. undefined vs 5. null</div>
    <div class="section-body">
      <div class="callout">
        <div class="callout-title">🎬 రియల్ లైఫ్ అనలాజీ: సినిమా హాల్ సీట్ బుకింగ్</div>
        <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">ఈ రెంటికి తేడా చాలా సులభం:</p>
        <ul style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">
          <li><strong>undefined:</strong> డబ్బా ఉంది కానీ ఏమీ పెట్టడం మర్చిపోయాం, లేదా ఇంకా పెట్టలేదు. (మీరు ఇంకా seat select చేయలేదు).</li>
          <li><strong>null:</strong> డబ్బా ఉంది, మరియు "ఇది ఖాళీ" అని మనమే ఉద్దేశపూర్వకంగా చెప్పాం. (మీరు "నాకు ఏ seat వద్దు" అని స్పష్టంగా చెప్పారు).</li>
        </ul>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — null vs undefined</span>
        </div>
        <pre><code>let phoneNumber;
console.log(phoneNumber);        // undefined
console.log(typeof phoneNumber); // undefined

let selectedSeat = null;
console.log(selectedSeat);        // null
console.log(typeof selectedSeat); // object (హిస్టారిక్ బగ్!)</code></pre>
      </div>

      <div class="callout callout-warning" style="margin-top:15px;">
        <div class="callout-title">⚠️ typeof null విచిత్రం:</div>
        <p><code>typeof null</code> ఎప్పుడూ <strong>"object"</strong> అని వస్తుంది! ఇది 1995 లో JavaScript మొదటి version లో జరిగిన ఒక పొరపాటు. పాత వెబ్సైట్లు పాడవ్వకూడదని దీన్ని అలాగే ఉంచేశారు.</p>
      </div>
    </div>

    <div class="section-title"><span class="num">8</span>"5" మరియు 5 మధ్య తేడా (కూడిక vs అతికింపు)</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — String Concatenation vs Number Addition</span>
        </div>
        <pre><code>console.log(5 + 3);   // 8 (నంబర్ల కూడిక)
console.log("5" + 3); // "53" (టెక్స్ట్ అతికింపు - Concatenation!)</code></pre>
      </div>
      <p><code>5 + 3</code> రెండూ number లు కాబట్టి సంకలనం జరిగింది. కానీ <code>"5" + 3</code> లో ఒకటి string కాబట్టి JavaScript వాటిని పక్కపక్కనే అతికించింది (Concatenation).</p>
    </div>

    <div class="section-title"><span class="num">9</span>అన్నీ కలిపి ఒక ఉదాహరణ: విద్యార్థి వివరాలు</div>
    <div class="section-body">
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — Full Data Types Example</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>let studentName = "సీత";
let marks = 87.5;
let isPassed = true;
let address = null;
let phoneNumber;

console.log(studentName, "->", typeof studentName); // string
console.log(marks, "->", typeof marks);             // number
console.log(isPassed, "->", typeof isPassed);       // boolean
console.log(address, "->", typeof address);         // object
console.log(phoneNumber, "->", typeof phoneNumber); // undefined</code></pre>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు</div>
      <ul>
        <li><strong>Number ని quotes లో రాయడం:</strong> <code>let age = "25"; age + 5;</code> అంటే <code>"255"</code> వస్తుంది కానీ <code>30</code> రాదు! సంఖ్యలకు quotes వాడకూడదు.</li>
        <li><strong>Boolean ని quotes లో రాయడం:</strong> <code>let isLoggedIn = "false";</code> అనేది boolean కాదు, string! దీన్ని <code>if</code> లో వాడితే <code>true</code> లా ప్రవర్తిస్తుంది!</li>
        <li><strong>NaN ని === తో పోల్చడం:</strong> <code>NaN === NaN</code> రిజల్ట్ <code>false</code>! NaN ని చెక్ చేయడానికి ఎప్పుడూ <code>Number.isNaN()</code> వాడాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">10</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>కింది విలువల data types చెప్పండి: <code>"hello"</code>, <code>42</code>, <code>3.14</code>, <code>true</code>, <code>null</code>, <code>undefined</code>, <code>"100"</code>, <code>false</code>.</li>
        <li>ఈ <code>typeof</code> లు ఏం print చేస్తాయి? <code>typeof "true"</code>, <code>typeof true</code>, <code>typeof (7 / 2)</code>, <code>typeof NaN</code>.</li>
        <li>ఒక variable లో మీ పేరు, వయసు, student అవునా కాదా (boolean) పెట్టి, ప్రతిదాని <code>typeof</code> print చేయండి.</li>
        <li><code>"10" + 5</code> మరియు <code>10 + 5</code> ఫలితాలు ఏమిటి? ఎందుకు వేర్వేరు?</li>
        <li><code>0.1 + 0.2 === 0.3</code> ఏం ఇస్తుంది?</li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2);">
          <p><strong>1.</strong> <code>"hello"</code> → string, <code>42</code> → number, <code>3.14</code> → number, <code>true</code> → boolean, <code>null</code> → null (కానీ typeof object), <code>undefined</code> → undefined, <code>"100"</code> → string, <code>false</code> → boolean.</p>
          <p style="margin-top: 8px;"><strong>2.</strong> <code>string</code>, <code>boolean</code>, <code>number</code>, <code>number</code> (NaN కూడా number రకమే!).</p>
          <p style="margin-top: 8px;"><strong>3.</strong> <code>let myName = "రవి"; let myAge = 20; let isStudent = true;</code> (Types: string, number, boolean).</p>
          <p style="margin-top: 8px;"><strong>4.</strong> <code>"10" + 5</code> → <code>"105"</code> (string concatenation). <code>10 + 5</code> → <code>15</code> (number addition).</p>
          <p style="margin-top: 8px;"><strong>5.</strong> <code>false</code>. ఎందుకంటే <code>0.1 + 0.2</code> ఫలితం <code>0.30000000000000004</code>.</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">ఈ code ని మన compiler లో run చేసి, విలువలు మార్చి ఫలితాలు చూడండి:</p>
      <div class="code-block">
        <pre><code>let productName = "Laptop";
let price = 45000;
let inStock = true;
let discount = null;
let rating;

console.log(productName, "->", typeof productName);
console.log(price, "->", typeof price);
console.log(inStock, "->", typeof inStock);
console.log(discount, "->", typeof discount);
console.log(rating, "->", typeof rating);</code></pre>
      </div>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript try చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary:</h3>
      <ul style="margin-left: 20px; color: var(--text2);">
        <li>Data type అంటే విలువ యొక్క రకం. <code>typeof</code> తో తెలుసుకోవచ్చు.</li>
        <li><strong>string</strong>: text. <strong>number</strong>: సంఖ్యలు (Infinity, NaN తో సహా). <strong>boolean</strong>: <code>true</code> / <code>false</code>.</li>
        <li><strong>undefined</strong>: విలువ ఇంకా ఇవ్వలేదు. <strong>null</strong>: ఉద్దేశపూర్వకంగా ఖాళీ.</li>
        <li><code>typeof null</code> ఎప్పుడూ <code>"object"</code> అని ఇస్తుంది (ఒక పాత quirk).</li>
        <li><code>"5"</code> (string) మరియు <code>5</code> (number) వేరు వేరు. <code>"5" + 3</code> ఫలితం <code>"53"</code>.</li>
      </ul>
    </div>
`;

  const html = wrapJSLessonPage(title, desc, filename, 4, subtopics, contentBody, 'variables.html', '3. Variables (let, const, var)', '05-operators-expressions-and-precedence.html', '5. Operators, Expressions & Precedence');
  fs.writeFileSync(path.join(jsDir, filename), html, 'utf8');
  fs.writeFileSync(path.join(jsDir, 'data-types.html'), html, 'utf8');
  console.log(`✅ Generated ${filename} and data-types.html`);
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
  <meta name="description" content="Master JavaScript from complete beginner to advanced full-stack level with our in-depth combined curriculum, collapsible roadmap across 8 phases, live code execution, Node.js, and interview prep." />
  <meta name="keywords" content="javascript tutorial, js course, learn javascript online, js basics, ES6, promises, async await, nodejs, dom, javascript interview questions" />
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
      <span class="badge">🟢 16 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (8 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's JavaScript Master Course</strong>. JavaScript is the programming language of the Web powering front-end client applications, full-stack backends with Node.js, mobile apps, and desktop platforms. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(247, 223, 30, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(247, 223, 30, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f7df1e; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning JavaScript?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore fundamentals, variables & types, control flow, functions, arrays & objects, closures, async Promises, or DOM manipulation:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-javascript/01-javascript-fundamentals.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-javascript/variables.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables →</a>
        <a href="/blog-javascript/conditionals.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Control Flow →</a>
        <a href="/blog-javascript/functions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Functions →</a>
        <a href="/blog-javascript/arrays.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Arrays & Objects →</a>
        <a href="/blog-javascript/closures.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: OOP & Closures →</a>
        <a href="/blog-javascript/promises.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Async JS →</a>
        <a href="/blog-javascript/dom.html" style="background:linear-gradient(135deg, #f7df1e, #eab308); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: DOM & Web APIs →</a>
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

// Update all sidebars in blog-javascript folder
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
  console.log('🚀 Building JavaScript Masterclass Phase 2 (Variables & Data Types)...');
  buildLesson3();
  buildLesson4();
  buildBlogJSHome();
  updateAllSidebars();
  console.log('🎉 JavaScript Phase 2: Variables & Data Types successfully created!');
}

run();
