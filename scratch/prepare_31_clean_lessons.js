const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const jsDir = path.join(publicDir, 'blog-javascript');

// Master JavaScript Curriculum - 5 Parts, 31 Chapters
const JS_CURRICULUM = [
  {
    id: 'part1',
    tag: 'Part 01',
    title: 'Basics',
    icon: '🟨',
    desc: 'JavaScript introduction, browser environment, setup, variables (let, const, var), data types, operators, type conversion, template literals, and input/output.',
    lessons: [
      { num: 1, file: '01-javascript-fundamentals.html', title: '1. JavaScript ante enti?', subtopics: 'Intro · Ekkada use avtundi · Browser role · First program' },
      { num: 2, file: '02-javascript-syntax-and-errors.html', title: '2. Setup & Environment', subtopics: 'Browser console · script tag · External JS · Comments · VS Code' },
      { num: 3, file: 'variables.html', title: '3. Variables: var, let, const', subtopics: 'var vs let vs const · Scope · Re-assignment · Naming Rules' },
      { num: 4, file: 'data-types.html', title: '4. Data Types', subtopics: 'string · number · boolean · null · undefined · typeof · NaN' },
      { num: 5, file: 'operators.html', title: '5. Operators', subtopics: 'Arithmetic · Comparison (== vs ===) · Logical (&&, ||, !)' },
      { num: 6, file: 'type-conversion.html', title: '6. Type Conversion & Template Literals', subtopics: 'Number() · parseInt() · String() · Boolean() · Backticks · Truthy & Falsy' },
      { num: 7, file: 'input-output.html', title: '7. Input/Output (I/O)', subtopics: 'console.log · alert() · prompt() · confirm() · DOM output' }
    ]
  },
  {
    id: 'part2',
    tag: 'Part 02',
    title: 'Control Flow',
    icon: '🔀',
    desc: 'Decision making and iterations: if, else if, else conditions, ternary operator, switch statements, for, while, do-while loops, break, and continue.',
    lessons: [
      { num: 8, file: 'conditionals.html', title: '8. if, else if, else', subtopics: 'if statement · else if chains · else block · Nested if · Ternary (? :)' },
      { num: 9, file: 'switch.html', title: '9. switch statement', subtopics: 'switch · case · break keyword · default case · Multi-case grouping' },
      { num: 10, file: 'loops.html', title: '10. Loops: for, while, do-while', subtopics: 'for loop · while loop · do-while loop · Loop variables · Infinite loops' },
      { num: 11, file: 'break-continue.html', title: '11. break & continue', subtopics: 'break keyword · continue keyword · Loop control · Nested loops' }
    ]
  },
  {
    id: 'part3',
    tag: 'Part 03',
    title: 'Functions & Data',
    icon: '🧩',
    desc: 'Modular reusable code and collections: function declarations, arrow functions, arrays, array methods (map, filter, reduce), objects, strings, Math, and Date.',
    lessons: [
      { num: 12, file: 'functions.html', title: '12. Functions: declaration, parameters, return', subtopics: 'Function declaration · Parameters & arguments · return keyword · Default params' },
      { num: 13, file: 'arrow-functions.html', title: '13. Arrow Functions', subtopics: '() => syntax · Concise body · Implicit return · lexical this' },
      { num: 14, file: 'arrays.html', title: '14. Arrays: create, access, push/pop', subtopics: 'Array creation · Indexing · length · push/pop · shift/unshift · splice' },
      { num: 15, file: 'array-methods.html', title: '15. Array Methods: map, filter, reduce, forEach', subtopics: 'map() · filter() · reduce() · forEach() · find() · some() · every()' },
      { num: 16, file: 'objects.html', title: '16. Objects: properties, methods', subtopics: 'Object literals · Key-value pairs · Dot vs bracket notation · Methods · this' },
      { num: 17, file: 'strings.html', title: '17. Strings: common methods', subtopics: 'length · toUpperCase/toLowerCase · slice · substring · replace · split · trim' },
      { num: 18, file: 'math-date.html', title: '18. Math & Date objects', subtopics: 'Math.floor/ceil/round · Math.random · Date constructor · getFullYear · Timestamps' }
    ]
  },
  {
    id: 'part4',
    tag: 'Part 04',
    title: 'DOM (Document Object Model)',
    icon: '🌐',
    desc: 'Interactive web page programming: DOM tree selection, content & style modification, event handling (click, input, submit), form validation, and mini To-Do project.',
    lessons: [
      { num: 19, file: 'dom.html', title: '19. DOM ante enti? Elements select cheyyadam', subtopics: 'DOM Tree · getElementById · querySelector · querySelectorAll · Elements collection' },
      { num: 20, file: 'dom-manipulation.html', title: '20. Content & style marchadam', subtopics: 'innerText · textContent · innerHTML · style object · classList.add/toggle' },
      { num: 21, file: 'events.html', title: '21. Events: click, input, submit', subtopics: 'addEventListener · click event · input event · submit & preventDefault · Event object' },
      { num: 22, file: 'form-validation.html', title: '22. Form validation', subtopics: 'Input validation · Required fields · Email & password format · Error messages' },
      { num: 23, file: 'todo-list-project.html', title: '23. Mini project: To-Do List', subtopics: 'Complete To-Do List app · Add items · Delete items · Mark done · Local state' }
    ]
  },
  {
    id: 'part5',
    tag: 'Part 05',
    title: 'Intermediate JavaScript',
    icon: '🚀',
    desc: 'Professional modern JS: scope & hoisting, destructuring, spread/rest, closures, callbacks, Promises, async/await, fetch API, try-catch, ES6 modules, and localStorage.',
    lessons: [
      { num: 24, file: 'scope-hoisting.html', title: '24. Scope & Hoisting', subtopics: 'Global scope · Function scope · Block scope · Variable & function hoisting · TDZ' },
      { num: 25, file: 'destructuring-spread.html', title: '25. Destructuring, Spread, Rest', subtopics: 'Array destructuring · Object destructuring · Spread operator (...) · Rest parameters' },
      { num: 26, file: 'closures.html', title: '26. Closures', subtopics: 'Lexical scope · Inner functions remembering outer scope · Private state · Counter example' },
      { num: 27, file: 'promises.html', title: '27. Callbacks, Promises', subtopics: 'Asynchronous JS · Callback hell · Promise states (pending, resolved, rejected) · .then/.catch' },
      { num: 28, file: 'async-await-fetch.html', title: '28. async / await & fetch API', subtopics: 'async functions · await keyword · fetch API · Response json() · API requests' },
      { num: 29, file: 'error-handling.html', title: '29. Error Handling: try-catch', subtopics: 'try block · catch block · finally block · throw new Error() · Graceful degradation' },
      { num: 30, file: 'modules.html', title: '30. ES6 Modules', subtopics: 'export · export default · import · type="module" in HTML · Modular architecture' },
      { num: 31, file: 'localstorage.html', title: '31. localStorage', subtopics: 'localStorage API · setItem · getItem · removeItem · clear · JSON persistence' }
    ]
  }
];

// Flatten lessons list
const ALL_LESSONS = [];
JS_CURRICULUM.forEach(part => {
  part.lessons.forEach(l => {
    ALL_LESSONS.push({
      ...l,
      partId: part.id,
      partTag: part.tag,
      partTitle: part.title
    });
  });
});

function generateJSAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  JS_CURRICULUM.forEach(phase => {
    const hasActive = phase.lessons.some(l => l.file === currentFile);
    const isOpen = hasActive || (currentFile === null && phase.id === 'part1');
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

function wrapJSLessonPage(title, desc, filename, currentNum, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle, partTag) {
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

      let code = rawCode.replace(/(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*$)/gm, m => pushToken('cm', m));
      code = code.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|\`(?:[^\`\\\\]|\\\\.)*\`)/g, m => pushToken('st', m));
      const kwList = ['const','let','var','function','return','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','new','this','class','extends','super','import','export','async','await','yield','of','in','typeof','instanceof','delete','void'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      const typeList = ['console','document','window','Math','Array','Object','String','Number','Boolean','Promise','JSON','Set','Map','Date','Error','RegExp','Symbol','BigInt','undefined','null','true','false','alert','prompt','confirm','parseInt','parseFloat','isNaN','localStorage'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('vr', m));

      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => {
        if (['if','for','while','switch','catch'].includes(fnName)) return m;
        return pushToken('fn', fnName);
      });

      code = code.replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, m => pushToken('nu', m));
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
      <span class="badge">📂 ${partTag}</span>
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
        <span class="label">Course Completed! 🎉</span>
        <span class="title">Back to Roadmap</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// Generate a clean, editable template body for chapters 8 to 31
function getCleanEditableTemplateBody(l) {
  const topicsList = l.subtopics.split('·').map(s => s.trim());
  const bulletItems = topicsList.map(t => `        <li><code>${t}</code> గురించి అవగాహన</li>`).join('\n');

  return `
    <!-- ====================================================================
         👇 CHAPTER CONTENT START (ఇక్కడ నుండి మీ పాఠం కంటెంట్ రాయండి) 👇
         ==================================================================== -->

    <div class="intro-box">
      <p>ఈ పాఠంలో మనం JavaScript లోని ముఖ్యమైన <strong>${l.title}</strong> గురించి స్పష్టంగా, సులభమైన ఉదాహరణలతో నేర్చుకుందాం.</p>
      <p>రియల్ వరల్డ్ ప్రాజెక్టులలో మరియు ఇంటర్వ్యూలలో ఈ కాన్సెప్ట్ చాలా కీలకం.</p>
    </div>

    <div class="section-title"><span class="num">1</span>ఈ chapter లో మీరు నేర్చుకునేవి</div>
    <div class="section-body">
      <ul style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
${bulletItems}
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span>సిద్ధాంతం & ప్రాథమిక కాన్సెప్ట్</div>
    <div class="section-body">
      <p>ఇక్కడ కాన్సెప్ట్ గురించిన పూర్తి వివరణ రాయండి...</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">JavaScript — ఉదాహరణ 1</span>
          <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
        </div>
        <pre><code>// ${l.title} కోడ్ ఉదాహరణ
console.log("${l.title} మొదలైంది");
</code></pre>
      </div>

      <div class="code-output" style="background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:12px 16px; margin-top:10px; font-family:monospace; color:#38bdf8; font-size:13.5px;">
        <span style="color:#64748b;">Output:</span><br>
        ${l.title} మొదలైంది
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>రియల్-లైఫ్ ఉదాహరణ & ప్రాక్టీస్</div>
    <div class="section-body">
      <p>రెండో ఉదాహరణ లేదా వాస్తవ ప్రపంచంలో దీని ఉపయోగం ఇక్కడ రాయండి...</p>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Beginners చేసే సాధారణ తప్పులు (Common Mistakes)</div>
      <p style="margin-top: 8px; color: var(--text2); font-size: 14.5px;">ఈ టాపిక్ నేర్చుకునేటప్పుడు విద్యార్థులు తరచుగా చేసే తప్పులు మరియు వాటిని ఎలా సరిచేయాలో ఇక్కడ పేర్కొనండి.</p>
    </div>

    <div class="section-title"><span class="num">4</span>ప్రాక్టీస్ ప్రశ్నలు & సమాధానాలు</div>
    <div class="section-body">
      <ol style="margin-left: 20px; color: var(--text2); font-size: 14.5px; line-height: 1.6;">
        <li>మొదటి ప్రాక్టీస్ ప్రశ్న?</li>
        <li>రెండో ప్రాక్టీస్ ప్రశ్న?</li>
      </ol>

      <details style="margin-top: 15px; background: var(--bg2); border: 1px solid var(--border); padding: 12px; border-radius: 8px; cursor: pointer;">
        <summary style="font-weight: bold; color: var(--text);">👉 సమాధానాలు చూడండి</summary>
        <div style="margin-top: 10px; font-size: 14px; color: var(--text2); line-height: 1.6;">
          <p>సమాధానం వివరణ ఇక్కడ రాయండి...</p>
        </div>
      </details>
    </div>

    <div class="try-box">
      <div class="try-title">🚀 మీరే try చేయండి</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">మన ఆన్‌లైన్ కంపైలర్ లో ఈ కోడ్‌ను ఎడిట్ చేసి రన్ చేయండి:</p>
      <a class="run-btn" href="/?lang=nodejs">👉 Our Compiler లో JavaScript రన్ చేయండి</a>
    </div>

    <div class="intro-box" style="background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); margin-top:30px;">
      <h3 style="color:#22c55e; margin-bottom:8px;">📌 Quick Summary (సారాంశం):</h3>
      <ul style="margin-left: 20px; color: var(--text2); line-height: 1.6;">
        <li><strong>${l.title}:</strong> ${l.subtopics}</li>
      </ul>
    </div>

    <!-- ====================================================================
         👆 CHAPTER CONTENT END (ఇక్కడితో మీ కంటెంట్ పూర్తవుతుంది) 👆
         ==================================================================== -->
`;
}

function run() {
  console.log('🚀 Preparing all 31 clean, connected JavaScript lesson files...');

  for (let i = 0; i < ALL_LESSONS.length; i++) {
    const current = ALL_LESSONS[i];
    const prev = i > 0 ? ALL_LESSONS[i - 1] : null;
    const next = i < ALL_LESSONS.length - 1 ? ALL_LESSONS[i + 1] : null;

    const prevFile = prev ? prev.file : null;
    const prevTitle = prev ? prev.title : null;
    const nextFile = next ? next.file : null;
    const nextTitle = next ? next.title : null;

    const filePath = path.join(jsDir, current.file);

    if (current.num <= 7 && fs.existsSync(filePath)) {
      // Chapters 1 to 7: PRESERVE rich completed content, only update sidebar & footer
      let html = fs.readFileSync(filePath, 'utf8');

      // Update sidebar
      const newAccordion = generateJSAccordionSidebar(current.file);
      html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, `${newAccordion}\n  </aside>`);

      // Update footer
      const newNavFooter = `    <div class="nav-footer">
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
        <span class="label">Course Completed! 🎉</span>
        <span class="title">Back to Roadmap</span>
      </a>`}
    </div>`;

      html = html.replace(/<div class="nav-footer">[\s\S]*?<\/div>/i, newNavFooter);
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`[Kept rich content] Lesson ${current.num}: ${current.file}`);
    } else {
      // Chapters 8 to 31: Generate clean, editable template ready to fill
      const contentBody = getCleanEditableTemplateBody(current);
      const html = wrapJSLessonPage(
        current.title,
        `Learn ${current.title} in JavaScript with clear Telugu explanations and live runnable code.`,
        current.file,
        current.num,
        current.subtopics,
        contentBody,
        prevFile,
        prevTitle,
        nextFile,
        nextTitle,
        `${current.partTag}: ${current.partTitle}`
      );
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`[Created clean template] Lesson ${current.num}: ${current.file}`);
    }
  }

  console.log('🎉 All 31 files prepared and connected successfully!');
}

run();
