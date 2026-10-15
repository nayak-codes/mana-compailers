const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure
const C_CURRICULUM = [
  {
    id: 'phase11', tag: 'Phase 11', title: 'Structures & Data Packing', icon: '🏗️',
    lessons: [
      { num: 27, file: '27-c-structures-declaration-memory-model-and-padding.html', title: '27. Structures, RAM Memory Model & Padding Holes' },
      { num: 28, file: '28-c-structure-arrays-pointers-and-arrow-operator.html', title: '28. Structure Arrays, Pointers & Arrow Operator (->)' },
      { num: 29, file: '29-c-self-referential-structures-file-io-and-5-projects.html', title: '29. Self-Referential Structs, Binary I/O & 5 Projects' }
    ]
  },
  {
    id: 'phase12', tag: 'Phase 12', title: 'Unions, Enums & Typedef', icon: '🔀',
    lessons: [
      { num: 30, file: '30-c-unions-shared-memory-and-variant-types.html', title: '30. Unions, Shared Memory & Variant Data Types' },
      { num: 31, file: '31-c-enumerations-custom-values-and-switch-dispatch.html', title: '31. Enumerations (enum), Custom Values & Switch' },
      { num: 32, file: '32-c-typedef-type-aliases-and-readable-architecture.html', title: '32. typedef, Type Aliases & Expressive Architecture' }
    ]
  },
  {
    id: 'phase13', tag: 'Phase 13', title: 'Dynamic Memory Management', icon: '💾', 
    lessons: [
      { num: 33, file: '33-c-stack-vs-heap-malloc-and-calloc.html', title: '33. Stack vs Heap, malloc(), calloc() & NULL Guards' }, 
      { num: 34, file: '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', title: '34. realloc(), free() & The 4 Deadly Heap Bugs' }, 
      { num: 35, file: '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', title: '35. Dynamic Collections, Ownership & Valgrind Debugging' }
    ] 
  },
  {
    id: 'phase14', tag: 'Phase 14', title: 'File I/O & Preprocessor', icon: '📁',
    lessons: [
      { num: 36, file: '36-c-file-handling-fopen-fclose-and-text-io.html', title: '36. File Handling, fopen() & I/O' },
      { num: 37, file: '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', title: '37. Binary File I/O & fseek()' },
      { num: 38, file: '38-c-file-error-handling-feof-ferror-and-errno.html', title: '38. File Errors & feof()' }
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
  <title>${title} — C Master Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, c structures, struct padding c, arrow operator c, c unions, c enums, c typedef" />
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
      color: var(--text);
      font-size: 15.5px;
      margin-bottom: 8px;
      font-weight: 700;
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

function buildLesson33() {
  const title = "Stack vs Heap, malloc(), calloc() (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Dynamic Memory Allocation అంటే ఏంటి? Stack కి Heap కి తేడా ఏంటి? malloc() మరియు calloc() వాడి రన్-టైమ్ లో మెమరీని ఎలా సృష్టించాలో డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "33-c-stack-vs-heap-malloc-and-calloc.html";
  const subtopics = "Stack vs Heap RAM · Dynamic Memory Allocation · malloc() · calloc() · NULL Pointers";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు మనం రాసిన ప్రోగ్రామ్స్ లో <code>int a;</code> లేదా <code>int arr[10];</code> అని ముందే సైజు చెప్పేవాళ్ళం. దీన్ని <strong>Static Memory Allocation</strong> అంటారు. కానీ రియల్ వరల్డ్ యాప్స్ లో (ఉదాహరణకు ఫేస్బుక్ లో) యూజర్ ఎన్ని ఫోటోలు అప్లోడ్ చేస్తాడో ముందే మనకు తెలీదు కదా! ముందే లక్ష ఫోటోలకి సైజు ఇస్తే మెమరీ వేస్ట్ అవుతుంది. అప్పుకప్పుడు అవసరమైనంత మెమరీని ఆన్ ది స్పాట్ లో (Run-time లో) తీసుకోవడాన్నే <strong>Dynamic Memory Allocation (డైనమిక్ మెమరీ అలోకేషన్)</strong> అంటారు. C లాంగ్వేజ్ లో ఈ అద్భుతం జరగాలంటే మనం "Heap" అనే ఒక స్పెషల్ మెమరీ ఏరియాని వాడుకోవాలి. దానికి <code>malloc()</code> మరియు <code>calloc()</code> అనేవి రెండు తాళం చెవుల్లా పనిచేస్తాయి. ఇవి ఎలా పనిచేస్తాయో డీప్ గా పోస్ట్‌మార్టం చేసి తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Stack మెమరీ vs Heap మెమరీ (అసలు తేడా ఏంటి?)</div>
    <div class="section-body">
      <p class="text-prose">
        మన ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు RAM (మెమరీ) ప్రధానంగా రెండు భాగాలుగా విడిపోతుంది. ఒకటి స్టాక్ (Stack), రెండు హీప్ (Heap).
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>Stack (స్టాక్):</strong> ఇదొక సిస్టమాటిక్ షెల్ఫ్ లాంటిది. ఏ ఫంక్షన్ కి ఎంత జాగా కావాలో (int, char) కంపైల్ అయ్యేటప్పుడే ముందే డిసైడ్ అవుతుంది. ఫంక్షన్ అవ్వగానే ఆ జాగా దానంతట అదే (Automatic) ఖాళీ అవుతుంది. ఇది చాలా ఫాస్ట్ కానీ, దీని సైజు చాలా లిమిటెడ్ (మాక్సిమం 1MB నుండి 8MB).</li>
        <li><strong>Heap (హీప్):</strong> ఇదొక పెద్ద గోడౌన్ (Godown) లాంటిది. ఇందులో జిబిల కొద్దీ (GBs) ఫ్రీ స్పేస్ ఉంటుంది. కానీ ఇక్కడ మీరు ఏదైనా పెట్టుకోవాలంటే, మీరే మ్యాన్యువల్ గా వెళ్లి ఆపరేటింగ్ సిస్టమ్ ని "నాకు 100 బైట్స్ కావాలి" అని అడగాలి. అదే డైనమిక్ మెమరీ.</li>
      </ul>

      <div class="deep-dive-card">
        <h3>🏢 రియల్ లైఫ్ స్టోరీ: హోటల్ రూమ్ vs ఖాళీ స్థలం (Plot)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          <strong>Stack (హోటల్ రూమ్):</strong> మీరు ఒక హోటల్ కి వెళ్లారు. అక్కడ రూమ్ సైజు ఫిక్స్ అయి ఉంటుంది. మీరు వెళ్ళగానే ఆటోమేటిక్ గా కీ ఇస్తారు, మీరు చెక్-అవుట్ చేయగానే ఆటోమేటిక్ గా క్లీన్ చేస్తారు. దీన్నే స్టాక్ మెమరీ అంటారు (ఆటోమేటిక్ వేరియబుల్స్).<br><br>
          <strong>Heap (ఖాళీ స్థలం):</strong> మీరు ఒక ఎకరం స్థలం లీజుకి తీసుకున్నారు అనుకోండి. అక్కడ మీరు గుడిసె వేసుకుంటారా లేక పెద్ద బిల్డింగ్ కట్టుకుంటారా అనేది మీ ఇష్టం. కానీ మున్సిపాలిటీ (OS) వాళ్ళకి అప్లికేషన్ పెట్టుకుని (అదే <code>malloc</code>) పర్మిషన్ తెచ్చుకోవాలి. బిల్డింగ్ కట్టాక, మీరే స్వయంగా దాన్ని కూల్చి క్లీన్ చేయాలి (అదే <code>free</code>). ఇదంతా మ్యాన్యువల్ గా జరగాలి. పెద్ద డేటాని (లక్షల రికార్డ్స్) స్టోర్ చేయడానికి ఎప్పుడూ హీప్ మెమరీ నే వాడాలి!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> malloc() మరియు calloc() తో స్థలం కొనడం</div>
    <div class="section-body">
      <p class="text-prose">
        హీప్ లో మీకు మెమరీ కావాలంటే <code>&lt;stdlib.h&gt;</code> అనే లైబ్రరీలో రెండు ఫంక్షన్స్ ఉంటాయి:
      </p>
      <p class="text-prose">
        <strong>1. <code>malloc(size)</code> (Memory Allocation):</strong> ఇది మీకు కావలసిన బైట్స్ ని ఇస్తుంది, కానీ ఆ ప్లేస్ ని క్లీన్ చేయదు. పాత గార్బేజ్ వాల్యూస్ అలానే ఉండిపోతాయి. ఇది చాలా ఫాస్ట్.<br>
        <strong>2. <code>calloc(count, size)</code> (Contiguous Allocation):</strong> ఇది కూడా మెమరీ ఇస్తుంది, కానీ ఇచ్చే ముందే ఆ ప్లేస్ అంతా శుభ్రంగా కడిగేసి (అన్నిటిలో 0 పెట్టి) క్లీన్ గా ఇస్తుంది. కాబట్టి గార్బేజ్ వాల్యూస్ ఉండవు, కానీ కొంచెం టైమ్ తీసుకుంటుంది.
      </p>
      <p class="text-prose">
        <strong>ముఖ్యమైన రూల్:</strong> ఈ ఫంక్షన్స్ మీకు "నార్మల్ మెమరీ" కాకుండా, ఒక పాయింటర్ (Address) ని మాత్రమే తిరిగి ఇస్తాయి. అది కూడా "Void Pointer". కాబట్టి మనం దాన్ని (int*) కింద మార్చుకుని వాడుకోవాలి. దీన్నే Typecasting అంటారు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Dynamic Array with malloc)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో యూజర్ అడిగినన్ని నంబర్స్ కి మాత్రమే ఆన్ ది స్పాట్ లో <code>malloc()</code> వాడి ఒక అర్రే ని ఎలా తయారు చేశామో, దాన్ని ఎలా వాడుకున్నామో క్లియర్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — malloc() & Dynamic Memory</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt; // malloc, free వాడాలంటే ఇది కచ్చితంగా ఉండాలి

int main() {
    int userSize;
    printf("ఎన్ని నంబర్స్ స్టోర్ చేయాలి? (ఉదా: 5): ");
    scanf("%d", &userSize);
    
    // 1. Heap లో డైనమిక్ గా మెమరీ అడగడం
    // (int*) తో Void Pointer ని ఇంట్ పాయింటర్ కింద మార్చాం
    int* myArray = (int*)malloc(userSize * sizeof(int));
    
    // 2. NULL Guard (చాలా ఇంపార్టెంట్: మెమరీ దొరికిందా లేదా అని చెకింగ్)
    if (myArray == NULL) {
        printf("Error: Memory allocation failed! RAM full అయిపోయిందేమో!\\n");
        return 1; // యాప్ క్రాష్ అవ్వకుండా సేఫ్ గా ఆపేస్తున్నాం
    }
    
    // 3. ఆ మెమరీలో డేటా రాయడం (నార్మల్ అర్రే లాగానే వాడుకోవచ్చు)
    printf("\\nదయచేసి %d నంబర్స్ ఎంటర్ చేయండి:\\n", userSize);
    for (int i = 0; i < userSize; i++) {
        myArray[i] = (i + 1) * 10; // 10, 20, 30... అని స్టోర్ చేస్తున్నాం
    }
    
    // 4. డేటాని ప్రింట్ చేయడం
    printf("మీరు స్టోర్ చేసిన నంబర్స్:\\n");
    for (int i = 0; i < userSize; i++) {
        printf("myArray[%d] = %d\\n", i, myArray[i]);
    }
    
    // 5. వాడేసుకున్నాక ఖచ్చితంగా క్లీన్ చేయాలి! (Memory Leak రాకుండా)
    free(myArray);
    printf("\\n[+] Memory freed successfully!\\n");
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>malloc(userSize * sizeof(int))</code>: ఒకవేళ యూజర్ 5 ఇస్తే, ఒక్కో int కి 4 బైట్స్ కాబట్టి మొత్తం 5 * 4 = 20 బైట్స్ మెమరీ కావాలని OS ని అడిగాము. ఆ 20 బైట్స్ లో మొదటి బైట్ అడ్రస్ ని <code>myArray</code> అనే పాయింటర్ పట్టుకుంటుంది.</li>
        <li><code>if (myArray == NULL)</code>: ఒకవేళ మీ కంప్యూటర్ లో RAM పూర్తిగా నిండిపోతే, malloc మీకు మెమరీ ఇవ్వలేదు, ఒక 0 (NULL) ని పంపుతుంది. దాన్ని మనం చెక్ చేయకుండా వాడేస్తే (Null Pointer Dereference) వెంటనే బ్లూ స్క్రీన్ (Segfault) వచ్చి ప్రోగ్రామ్ క్రాష్ అవుతుంది. అందుకే ఈ NULL చెకింగ్ కచ్చితంగా ఉండాలి.</li>
        <li><code>free(myArray)</code>: స్టాక్ మెమరీ లాగా హీప్ మెమరీ దానంతట అదే డిలీట్ అవ్వదు. మనం పని పూర్తయ్యాక <code>free()</code> అని పిలిస్తేనే ఆ 20 బైట్స్ మళ్ళీ వేరేవాళ్లు వాడుకోవడానికి ఫ్రీ అవుతాయి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: C లో <code>malloc()</code> వాడితే పక్కన <code>(int*)</code> అని ఎందుకు క్యాస్టింగ్ చేయాలి?</h4>
          <p>malloc ఫంక్షన్ కి మీరు అందులో నంబర్స్ పెడుతున్నారో లేక అక్షరాలు పెడుతున్నారో తెలీదు, అది జస్ట్ రా (Raw) మెమరీ ఇచ్చి ఒక పాయింటర్ (<code>void*</code>) పంపుతుంది. C లాంగ్వేజ్ లో డైరెక్ట్ గా వాయిడ్ పాయింటర్ ని వాడొచ్చు కానీ, కొన్ని C++ కంపైలర్స్ దాన్ని ఒప్పుకోవు. అందుకే దాన్ని <code>(int*)</code> అని ఇంటీజర్ పాయింటర్ కింద మార్చుకుంటే టైప్-సేఫ్ గా ఉంటుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>malloc</code> కి <code>calloc</code> కి పెర్ఫార్మెన్స్ పరంగా ఏది ఫాస్ట్?</h4>
          <p>ఎప్పుడూ <strong><code>malloc</code></strong> నే ఫాస్ట్! ఎందుకంటే calloc మీరు అడిగిన మెమరీ తీసుకున్నాక, దాన్ని బ్లాక్ బై బ్లాక్ 0 లతో నింపుకుంటూ వెళ్తుంది (Zero-ing). దానికి సిపియు సైకిల్స్ పడతాయి. మీకు ఎలాగూ వేరే డేటా రాసుకునే ప్లాన్ ఉంటే, జీరోలతో నింపడం అనవసరం కదా? కాబట్టి ఎప్పుడూ malloc నే వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>sizeof(*ptr)</code> అని రాయడం వల్ల లాభం ఏంటి?</h4>
          <p>చాలామంది <code>malloc(5 * sizeof(int))</code> అని రాస్తారు. రేపు ఆ పాయింటర్ ని float కింద మారిస్తే, అప్పుడు బ్రాకెట్ లో ఉన్న sizeof(int) ని కూడా float కి మార్చడం మర్చిపోతారు (బగ్ వస్తుంది). అందుకే ప్రొఫెషనల్స్ <code>malloc(5 * sizeof(*myArray))</code> అని రాస్తారు. అప్పుడు myArray ఏ టైప్ లో ఉంటే ఆటోమేటిక్ గా అదే సైజు తీసుకుంటుంది. ఇది బెస్ట్ ప్రాక్టీస్!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 33, "Phase 13", "Dynamic Memory Management", subtopics, contentBody, '32-c-typedef-type-aliases-and-readable-architecture.html', '32. Typedef & Aliases', '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', '34. realloc(), free() & Heap Bugs');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson34() {
  const title = "realloc(), free() & Heap Bugs (తెలుగులో)";
  const desc = "C లో Dynamic Memory ని పెంచడానికి లేదా తగ్గించడానికి realloc() ఎలా వాడుతారు? free() చేయకపోతే వచ్చే Memory Leaks, Dangling Pointers లాంటి 4 భయంకరమైన బగ్స్ ఏంటో డీప్ గా నేర్చుకుందాం.";
  const filename = "34-c-realloc-free-and-the-4-deadly-heap-bugs.html";
  const subtopics = "realloc() · Memory Leaks · Dangling Pointers · Double Free · Segmentation Faults";

  const contentBody = `
    <div class="intro-box">
      <p>కార్పెంటర్ ఒక టేబుల్ చేసాక, అది సరిపోకపోతే దాన్ని పగలగొట్టకుండానే సైజు పెంచగలిగితే ఎంత బాగుంటుంది? అలాగే ప్రోగ్రామింగ్ లో మనం <code>malloc</code> వాడి 5 నంబర్స్ కి మెమరీ తీసుకున్నాక, సడెన్ గా మరో 10 నంబర్స్ ఎక్స్ట్రా వచ్చాయనుకోండి, అప్పుడు ఆ పాత మెమరీని కోల్పోకుండానే సైజు పెంచుకునే ఆయుధమే <strong><code>realloc()</code> (Re-allocation)</strong>. దీనితో పాటు, మనం తీసుకున్న మెమరీని <code>free()</code> తో సరిగ్గా క్లీన్ చేయకపోతే ప్రోగ్రామ్ కి వచ్చే 4 రకాల భయంకరమైన బగ్స్ (Bugs) గురించి ఈ రోజు డీప్ గా పోస్ట్‌మార్టం చేసి తెలుసుకుందాం. సర్వర్లు ఎందుకు హ్యాంగ్ అవుతాయో మీకు ఈరోజు క్లారిటీ వచ్చేస్తుంది!</p>
    </div>

    <div class="section-title"><span class="num">1</span> realloc() ఎలా పనిచేస్తుంది? (మ్యాజిక్ ట్రిక్)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు <code>ptr = realloc(ptr, కొత్త సైజు)</code> అని అడిగినప్పుడు, కంపైలర్ బ్యాక్ గ్రౌండ్ లో చాలా తెలివిగా వ్యవహరిస్తుంది.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li>ముందుగా పాత మెమరీ పక్కనే ఇంకా ఖాళీ జాగా ఉందేమో చూస్తుంది. ఉంటే సింపుల్ గా అదే రూమ్ ని పెద్దది చేసి (Extended) మీ పాత అడ్రస్ నే ఇస్తుంది. ఫుల్ ఫాస్ట్!</li>
        <li>ఒకవేళ పక్కన వేరే ఎవరో ఉంటే, అప్పుడు ఇంకో పెద్ద కొత్త రూమ్ వెతికి, మీ పాత డేటా మొత్తం అక్కడికి కాపీ చేసి, పాత రూమ్ ని డిలీట్ చేసి, మీకు ఆ కొత్త అడ్రస్ ఇస్తుంది.</li>
      </ul>

      <div class="deep-dive-card">
        <h3>🐛 రియల్ లైఫ్ స్టోరీ: 4 Deadly Heap Bugs (నాలుగు రాక్షస బగ్స్)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          <strong>1. Memory Leak (మెమరీ లీక్ - దొంగ బగ్):</strong> మీరు హోటల్ లో రూమ్ తీసుకున్నారు, కానీ కీ తిరిగి ఇవ్వకుండా వెళ్ళిపోయారు (అంటే <code>free()</code> వాడలేదు). ఆ రూమ్ ఎవరికీ పనికిరాకుండా లాక్ అయిపోతుంది. ఇలా మీ యాప్ లో ఒక లూప్ ఉండి మెమరీ అడుగుతూనే ఉండి, ఫ్రీ చేయకపోతే కొద్దిసేపటికి RAM ఫుల్ అయ్యి సిస్టమ్ క్రాష్ అవుతుంది.<br><br>
          <strong>2. Dangling Pointer (దెయ్యం పాయింటర్):</strong> మీరు రూమ్ కీ (free) ఇచ్చేసారు, కానీ ఆ కీ డూప్లికేట్ మీ జేబులో ఉండిపోయింది. తర్వాత దాన్ని వాడి రూమ్ లోకి వెళ్తే అక్కడ వేరే ఎవరో ఉంటారు! అంటే <code>free(ptr)</code> చేసాక కూడా ఆ పాయింటర్ ని మళ్ళీ వాడితే గార్బేజ్ వాల్యూస్ వచ్చి ప్రోగ్రామ్ విచిత్రంగా బిహేవ్ చేస్తుంది.<br><br>
          <strong>3. Double Free (డబుల్ ఫ్రీ):</strong> మీరు మున్సిపాలిటీ కి వెళ్లి ఒకే బిల్డింగ్ ని రెండుసార్లు కూల్చమని అప్లికేషన్ ఇస్తే ఏమవుతుంది? వాళ్ళకి పిచ్చెక్కి సిస్టమ్ ఆపేస్తారు. ప్రోగ్రామ్ లో కూడా <code>free(ptr)</code> ని ఒకసారి కంటే ఎక్కువ కాల్ చేస్తే యాప్ వెంటనే టెర్మినేట్ అవుతుంది.<br><br>
          <strong>4. Buffer Overflow (బౌండరీ దాటడం):</strong> మీరు కొన్నది ఒక ఎకరం స్థలం, కానీ మీరు పక్క వాడి ప్లేస్ లోకి వెళ్లి గుడిసె వేస్తే? (ఉదాహరణకు 5 సైజు ఉన్న అర్రే లో 10వ ఇండెక్స్ లో డేటా రాయడం). అప్పుడు సిస్టమ్ మీ యాప్ ని వెంటనే చంపేస్తుంది (Segmentation Fault).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Dangling Pointers ని ఎలా ఆపాలి?</div>
    <div class="section-body">
      <p class="text-prose">
        దీనికి ఒకేఒక సింపుల్ సొల్యూషన్ ఉంది. మీరు ఎప్పుడైనా <code>free(ptr);</code> రాసిన వెంటనే, కళ్ళు మూసుకుని నెక్స్ట్ లైన్ లో <strong><code>ptr = NULL;</code></strong> అని రాయండి. ఆ దెయ్యం కీ ని (అడ్రస్) తుడిపేసి అక్కడ సున్నా పెట్టేస్తే, పొరపాటున మళ్ళీ ఎప్పుడైనా వాడినా అప్పుడు అది అడ్రస్ లేదు కాబట్టి ముందుగానే ఆగిపోతుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (realloc & Safe Freeing)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ముందుగా 2 నంబర్స్ కోసం మెమరీ తీసుకుని, తర్వాత దాన్ని 4 నంబర్స్ కి ఎలా పెంచామో (realloc), మరియు సేఫ్ గా ఎలా ఫ్రీ చేశామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — realloc() & Pointer Safety</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    // 1. ముందుగా 2 నంబర్స్ కి మెమరీ తీసుకుందాం
    int* ptr = (int*)malloc(2 * sizeof(int));
    if (ptr == NULL) return 1;
    
    ptr[0] = 100;
    ptr[1] = 200;
    printf("--- Before realloc ---\\n");
    printf("ptr[0] = %d, ptr[1] = %d\\n", ptr[0], ptr[1]);
    
    // 2. సైజు సరిపోలేదు, ఇప్పుడు 4 నంబర్స్ కి పెంచుదాం!
    // realloc వాడినప్పుడు ఎప్పుడూ ఒక టెంపరరీ పాయింటర్ వాడటం బెస్ట్ ప్రాక్టీస్
    int* temp = (int*)realloc(ptr, 4 * sizeof(int));
    
    if (temp == NULL) {
        printf("Realloc failed! పాత డేటా అలాగే ఉంటుంది.\\n");
        // realloc ఫెయిల్ అయినా పాత మెమరీ సేఫ్ గా ఉంటుంది
        free(ptr); 
        return 1;
    }
    
    // ఇప్పుడు కొత్తగా వచ్చిన అడ్రస్ ని మన పాత పాయింటర్ కి ఇద్దాం
    ptr = temp;
    
    // 3. కొత్త జాగాలో ఎక్స్ట్రా డేటా రాద్దాం
    ptr[2] = 300;
    ptr[3] = 400;
    
    printf("\\n--- After realloc ---\\n");
    for (int i = 0; i < 4; i++) {
        printf("ptr[%d] = %d\\n", i, ptr[i]);
    }
    
    // 4. సేఫ్ గా క్లీన్ చేయడం (Memory Leak & Dangling Pointer ని ఆపడం)
    free(ptr);
    ptr = NULL; // దెయ్యం పాయింటర్ కి చెక్!
    
    printf("\\n[+] Memory cleaned securely.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>realloc(ptr, 4 * sizeof(int))</code>: ఇది పాత పాయింటర్ ని తీసుకుని, అందులో ఉన్న 100, 200 ని కొత్త ప్లేస్ కి కాపీ చేసి మనకు ఏ ఇబ్బంది లేకుండా 4 జాగాలు ఉన్న కొత్త అడ్రస్ ని ఇస్తుంది.</li>
        <li><code>int* temp = realloc(...)</code>: ఇది చాలా చాలా ఇంపార్టెంట్! మీరు డైరెక్ట్ గా <code>ptr = realloc(ptr, size)</code> అని రాస్తే, ఒకవేళ సిస్టమ్ లో ఖాళీ లేక ఫెయిల్ అయితే అది NULL పంపుతుంది. అప్పుడు మీ పాత <code>ptr</code> లో ఉన్న ఒరిజినల్ డేటా అడ్రస్ కూడా పోతుంది (మెమరీ లీక్ అయిపోతుంది). అందుకే ముందు టెంపరరీ దాంట్లో పట్టుకుని, సక్సెస్ అయితేనే ఒరిజినల్ దానికి ఇవ్వాలి.</li>
        <li><code>ptr = NULL;</code>: చివర్లో మనం ఫ్రీ చేసాక ఆ పాయింటర్ ని వాడకుండా ఉండటానికి ఒకవేళ వాడితే వెంటనే ఎర్రర్ చూపించి ఆపడానికి నల్ గా మార్చాం.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>realloc()</code> వాడి సైజు తగ్గించవచ్చా? (Shrinking Memory)</h4>
          <p>ఖచ్చితంగా! మీరు 10 ఐటమ్స్ ఉన్న అర్రే ని <code>realloc(ptr, 5 * sizeof(int))</code> అని ఇస్తే, కంపైలర్ లాస్ట్ 5 ఐటమ్స్ ని కట్ చేసి OS కి ఇచ్చేస్తుంది. కేవలం మొదటి 5 ఐటమ్స్ మాత్రమే మీకు ఉంచుతుంది. ఇది మెమరీని ఆదా చేయడానికి బాగా వాడుతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: నేను <code>malloc</code> వాడిన పాయింటర్ కి, ఒక ఇంట్ వాల్యూ (ఉదా: ptr+2) కి ఫ్రీ చేయొచ్చా?</h4>
          <p>అస్సలు చేయకూడదు! మీరు ఎప్పుడైనా <code>free()</code> వాడేటప్పుడు, malloc మీకు ఏ స్టార్టింగ్ అడ్రస్ ని ఇచ్చిందో కచ్చితంగా ఆ అడ్రస్ నే ఫ్రీ కి పంపాలి. మధ్యలో ఉన్న అడ్రస్ ని (<code>free(ptr + 2)</code>) అని పంపితే కంపైలర్ కి అర్థం కాక ప్రోగ్రామ్ ని క్రాష్ చేస్తుంది (Invalid Pointer Error).</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Garbage Collector (గార్బేజ్ కలెక్టర్) అంటే ఏంటి? C లో ఎందుకు లేదు?</h4>
          <p>జావా, పైథాన్ లాంటి లాంగ్వేజెస్ లో మీరు <code>free()</code> రాయక్కర్లేదు. బ్యాక్ గ్రౌండ్ లో గార్బేజ్ కలెక్టర్ అనే ప్రోగ్రామ్ రన్ అయ్యి, వాడని మెమరీ ని దానంతట అదే క్లీన్ చేస్తుంది. కానీ దీనివల్ల గేమ్స్ లో సడెన్ గా లాగ్ (Stutter) వస్తుంది. C లాంగ్వేజ్ ముఖ్య ఉద్దేశ్యం సూపర్ స్పీడ్ (High Performance). అందుకే ఆ బాధ్యత (క్లీన్ చేసే పవర్) డైరెక్ట్ గా డెవలపర్ కే ఇచ్చారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 34, "Phase 13", "Dynamic Memory Management", subtopics, contentBody, '33-c-stack-vs-heap-malloc-and-calloc.html', '33. Stack vs Heap, malloc()', '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', '35. Dynamic Collections & Valgrind');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson35() {
  const title = "Dynamic Arrays, Structs & Valgrind (తెలుగులో)";
  const desc = "C లో స్ట్రక్చర్స్ ని మరియు స్ట్రింగ్స్ ని డైనమిక్ గా ఎలా స్టోర్ చేయాలి? ఇండస్ట్రీలో మెమరీ లీక్స్ ని కనిపెట్టే ఫేమస్ టూల్ Valgrind (వాల్‌గ్రిండ్) ఎలా పనిచేస్తుందో డీప్ గా తెలుసుకుందాం.";
  const filename = "35-c-dynamic-arrays-strings-structures-and-memory-debugging.html";
  const subtopics = "Dynamic Structs · Array of Pointers · Memory Ownership · Valgrind Debugger · Best Practices";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు మనం కేవలం ఇంటీజర్స్ (నంబర్స్) ని మాత్రమే <code>malloc</code> వాడి హీప్ లో పెట్టాం. కానీ రియల్ ప్రాజెక్ట్స్ లో ఒక స్టూడెంట్ రికార్డ్ (Structure) ని లేదా ఒక పెద్ద పేరాగ్రాఫ్ ని (String) ఆన్ ది స్పాట్ లో స్టోర్ చేయాల్సి వస్తుంది. అలాంటప్పుడు డైనమిక్ మెమరీ ఎలా వాడాలో ఈరోజు చూద్దాం. అంతకంటే ముఖ్యంగా, మీరు ఎంత పెద్ద ప్రోగ్రామర్ అయినా సరే వేల లైన్ల కోడ్ లో ఎక్కడో ఒకచోట <code>free()</code> చేయడం మర్చిపోతారు (Memory Leak). అలాంటి టైమ్ లో ఇండస్ట్రీ మొత్తం వాడే సంజీవని లాంటి టూల్ <strong>Valgrind (వాల్‌గ్రిండ్)</strong>. ఇది మీ కోడ్ ని ఎలా పోస్ట్‌మార్టం చేసి మీ తప్పులు చూపిస్తుందో డీప్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Dynamic Structures (స్ట్రక్చర్స్ కి మెమరీ ఎలా ఇవ్వాలి?)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక బుక్ స్టోర్ యాప్ రాస్తున్నారు. ఒక కొత్త బుక్ వచ్చినప్పుడు దానికి మెమరీ కావాలి. అప్పుడు ఒక స్ట్రక్చర్ (struct Book) క్రియేట్ చేసి, దానికి ఎంత సైజు పడుతుందో క్యాలిక్యులేట్ చేసి ఆపరేటింగ్ సిస్టమ్ ని అడగాలి.
      </p>
      <p class="text-prose">
        <strong>ట్రిక్:</strong> ఒకసారి స్ట్రక్చర్ పాయింటర్ తో వస్తే, దాని లోపల ఉన్న వేరియబుల్స్ ని వాడటానికి మనం డాట్ (<code>.</code>) ఆపరేటర్ వాడలేము. దాని బదులు మనం ఆరో (<code>-&gt;</code>) ఆపరేటర్ వాడాలి. (ఉదా: <code>myBook-&gt;price = 200;</code>).
      </p>

      <div class="deep-dive-card">
        <h3>🔍 రియల్ లైఫ్ స్టోరీ: Valgrind అనే డిటెక్టివ్ (Detective)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక పెద్ద బ్యాంకు నడుపుతున్నారు. రోజూ ఎంతో మంది కస్టమర్స్ వచ్చి లాకర్స్ తీసుకుంటారు (ఇదే <code>malloc</code>), పని అయ్యాక కీస్ ఇచ్చేస్తారు (ఇదే <code>free</code>). కానీ నెల చివర్లో చూస్తే 5 లాకర్స్ కి కీస్ రాలేదు! ఎవరు మర్చిపోయారో మీకు తెలీదు.<br><br>
          అలాంటప్పుడు మీరు <strong>Valgrind</strong> అనే ఒక డిటెక్టివ్ ని పెట్టుకుంటారు. వాడు మీరు రాసిన C ప్రోగ్రామ్ ని స్లో-మోషన్ లో రన్ చేసి (Virtual CPU లో), ప్రతి <code>malloc</code> ని ఒక బుక్ లో రాసుకుంటాడు. ప్రోగ్రామ్ అవ్వగానే బుక్ ఓపెన్ చేసి, "చూడు బాసు... 45వ లైన్ లో నువ్వు 100 బైట్స్ తీసుకున్నావ్, కానీ దాన్ని ఫ్రీ చేయడం మర్చిపోయావ్" అని కచ్చితంగా ఏ లైన్ లో మెమరీ లీక్ అయిందో పట్టుకుని చూపిస్తాడు. ఇండస్ట్రీలో Valgrind తో 0 errors ఉంటేనే మీ కోడ్ ని ఒప్పుకుంటారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Memory Ownership (మెమరీకి ఓనర్ ఎవరు?)</div>
    <div class="section-body">
      <p class="text-prose">
        పెద్ద ప్రాజెక్ట్స్ రాసేటప్పుడు ఒక ఫంక్షన్ మెమరీని తీసుకుంటుంది, దాన్ని ఇంకో ఫంక్షన్ కి పాస్ చేస్తుంది. అప్పుడు దాన్ని ఎవరు ఫ్రీ చేయాలి? అసలు ఫ్రీ చేశారా లేదా? ఈ కన్ఫ్యూజన్ ని <strong>Ownership (ఓనర్షిప్)</strong> అంటారు.
      </p>
      <p class="text-prose">
        దీనికి C లాంగ్వేజ్ లో ఒక రూల్ ఉంది: "ఎవరు క్రియేట్ (malloc) చేస్తారో, వాళ్ళే దాన్ని క్లీన్ (free) చేయాలి." లేదా, మీరు ఒక అడ్రస్ ని వేరే ఫంక్షన్ కి ఇస్తున్నారంటే డాక్యుమెంటేషన్ లో క్లియర్ గా "బాసు, నేను నీకు ఓనర్షిప్ ఇస్తున్నా, దీన్ని ఫ్రీ చేసే బాధ్యత నీదే" అని కామెంట్స్ లో రాసి పెట్టుకుంటారు. (దీన్నే మోడరన్ C++ లో Smart Pointers ఆటోమేటిక్ గా చేస్తాయి).
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Dynamic Structs)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఒక స్టూడెంట్ స్ట్రక్చర్ కి ఆన్ ది స్పాట్ లో <code>malloc</code> వాడి మెమరీ ఇచ్చి, అందులోకి డేటాని ఎలా రాస్తున్నామో, స్ట్రింగ్స్ ని ఎలా కాపీ (<code>strcpy</code>) చేస్తున్నామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Dynamic Structures & Pointers</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt; // strcpy కోసం 

// ఒక స్ట్రక్చర్ బ్లూప్రింట్ (మెమరీ ఏమీ తీసుకోదు)
struct Student {
    int id;
    float marks;
    char name[50];
};

int main() {
    // 1. Heap లో స్టూడెంట్ కి ఒక ఫుల్ బాక్స్ (మెమరీ) కావాలని అడుగుతున్నాం
    // sizeof(struct Student) అంటే దానికి పడే బైట్స్ ని ఆటోమేటిక్ గా లెక్కేస్తుంది
    struct Student* s1 = (struct Student*)malloc(sizeof(struct Student));
    
    // NULL Guard
    if (s1 == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    
    // 2. పాయింటర్ నుండి స్ట్రక్చర్ లోపలికి వెళ్లాలంటే (->) ఆరో వాడాలి
    s1->id = 101;
    s1->marks = 92.5;
    
    // అర్రే లోకి డైరెక్ట్ గా పేరు వేయలేము కాబట్టి strcpy వాడుతున్నాం
    strcpy(s1->name, "Billa"); 
    
    // 3. డేటాని చదవడం 
    printf("--- Student Details ---\\n");
    printf("Name  : %s\\n", s1->name);
    printf("ID    : %d\\n", s1->id);
    printf("Marks : %.1f\\n", s1->marks);
    
    // 4. సేఫ్ గా క్లీన్ చేయడం
    free(s1);
    s1 = NULL;
    
    printf("\\n[+] Student Memory Freed!\\n");
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>sizeof(struct Student)</code>: కంపైలర్ లోపల ఉన్న int కి 4, float కి 4, char అర్రే కి 50 (మొత్తం 58 బైట్స్) అని క్యాలిక్యులేట్ చేసి ఆపరేటింగ్ సిస్టమ్ ని అడుగుతుంది.</li>
        <li><code>s1-&gt;id = 101</code>: ఇది చాలా ఇంపార్టెంట్. మామూలుగా మనం పాయింటర్ లో ఉన్న వాల్యూ మార్చాలంటే <code>(*s1).id = 101</code> అని రాయాలి. కానీ ఆ బ్రాకెట్లు చూస్తే కన్ఫ్యూజింగ్ గా ఉంటుందని C కనిపెట్టిన వాళ్ళు <code>-&gt;</code> అనే ఒక షార్ట్ కట్ ని ఇచ్చారు. పాయింటర్స్ అయితే <code>-&gt;</code> వాడాలి, నార్మల్ వేరియబుల్స్ అయితే <code>.</code> వాడాలి.</li>
        <li><code>strcpy(...)</code>: మీరు డైనమిక్ మెమరీ లో ఒక అక్షరాల గుంపు (స్ట్రింగ్) ని పెట్టాలంటే మాన్యువల్ గా దాన్ని కాపీ చేయాల్సిందే. లేదంటే స్ట్రింగ్ లాజిక్ పని చేయదు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Valgrind టూల్ ని ఎలా వాడాలి? విండోస్ లో పనిచేస్తుందా?</h4>
          <p>దీన్ని లైనక్స్ (Linux) లో ఎక్కువగా వాడతారు. విండోస్ లో వాడాలంటే WSL (Windows Subsystem for Linux) ఇన్స్టాల్ చేసుకోవాలి. టెర్మినల్ లో <code>valgrind --leak-check=full ./my_program</code> అని రన్ చేస్తే, మీ యాప్ ఎండ్ అయ్యేటప్పుడు మెమరీ ఎక్కడైనా వదిలేస్తే (Leaked bytes), అది ఏ లైన్ లో జరిగిందో రెడ్ కలర్ లో రిపోర్ట్ ఇస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: స్ట్రక్చర్ లోపల ఇంకో పాయింటర్ ఉంటే దాన్ని ఎలా ఫ్రీ చేయాలి?</h4>
          <p>దీన్నే <strong>Deep Copy & Deep Free</strong> అంటారు. స్ట్రక్చర్ లోపల ఒక <code>char* name</code> అనే పాయింటర్ ఉండి, దానికి కూడా లోపల <code>malloc</code> ఇస్తే... మీరు క్లీన్ చేసేటప్పుడు, ముందు లోపల ఉన్న పేరుని <code>free(s1-&gt;name);</code> చేసి, ఆ తర్వాతే బయట ఉన్న స్ట్రక్చర్ ని <code>free(s1);</code> చేయాలి. బయటది ముందు కూల్చేస్తే లోపలికి వెళ్లడానికి దారి ఉండదు (Memory Leak).</p>
        </div>
        <div class="faq-item">
          <h4>Q3: C లో అర్రే ఆఫ్ పాయింటర్స్ (Array of Pointers) ఎందుకు వాడతారు?</h4>
          <p>మీరు ఒక కాలేజీలో 1000 మంది స్టూడెంట్స్ డేటా స్టోర్ చేయాలి. 1000 మందికి ఒకేసారి పెద్ద అర్రే తీసుకుంటే మధ్యలో ఎవరైనా జాయిన్ అవ్వకపోయినా మెమరీ వేస్ట్. అందుకే 1000 <strong>పాయింటర్స్ ని మాత్రమే</strong> తీసుకుని (చిన్న సైజు), ఎప్పుడైతే ఒక స్టూడెంట్ జాయిన్ అవుతాడో అప్పుడు వాడికి మాత్రమే <code>malloc</code> వాడి ఒక బాక్స్ తయారు చేసి ఆ అడ్రస్ ని పాయింటర్ కి ఇస్తారు. దీన్ని Jagged Arrays అని కూడా అంటారు. పెద్ద డేటాబేస్ లు ఇలాగే పనిచేస్తాయి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 35, "Phase 13", "Dynamic Memory Management", subtopics, contentBody, '34-c-realloc-free-and-the-4-deadly-heap-bugs.html', '34. realloc(), free() & Heap Bugs', '36-c-file-handling-fopen-fclose-and-text-io.html', '36. File Handling, fopen() & I/O');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson36() {
  const title = "File Handling, fopen() & fclose() (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో హార్డ్ డిస్క్ లో ఉన్న టెక్స్ట్ ఫైల్స్ ని (Files) ఎలా క్రియేట్ చేయాలి, ఓపెన్ చేయాలి మరియు అందులో డేటా ఎలా రాయాలో డీప్ ఎక్స్‌ప్లనేషన్ తో చూద్దాం.";
  const filename = "36-c-file-handling-fopen-fclose-and-text-io.html";
  const subtopics = "File I/O Basics · fopen() & fclose() · File Modes (r, w, a) · fprintf() & fscanf() · End of File (EOF)";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు మనం రాసిన ప్రోగ్రామ్స్ అన్నీ పవర్ కట్ అయితే లేదా యాప్ క్లోజ్ చేస్తే అందులో డేటా మొత్తం మాయం అయిపోతుంది (ఎందుకంటే అదంతా RAM లో ఉంటుంది). కానీ యూజర్ సేవ్ చేసిన ఒక గేమ్ స్కోర్ గాని, లేదా పాస్వర్డ్ గాని లైఫ్ టైమ్ ఉండాలంటే దాన్ని పర్మనెంట్ గా హార్డ్ డిస్క్ (HDD / SSD) లో ఉన్న ఒక ఫైల్ లో దాచాలి. దాన్నే <strong>File Handling (ఫైల్ హ్యాండ్లింగ్)</strong> అంటారు. C లాంగ్వేజ్ లో ఫైల్స్ తో మాట్లాడటానికి ఆపరేటింగ్ సిస్టమ్ మనకు <code>FILE</code> అనే ఒక స్పెషల్ పాయింటర్ ని ఇస్తుంది. <code>fopen()</code> తో ఫైల్స్ ఓపెన్ చేసి, <code>fprintf()</code> తో ఫైల్ లోపలికి డేటా ఎలా ప్రింట్ చేయాలో ఈరోజు ఒక రియల్ వరల్డ్ ప్రాజెక్ట్ లాగా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ఫైల్స్ ఎలా పనిచేస్తాయి? (The File Pointer)</div>
    <div class="section-body">
      <p class="text-prose">
        మన ప్రోగ్రామ్ కి హార్డ్ డిస్క్ లో ఉన్న ఫైల్ కి డైరెక్ట్ కనెక్షన్ ఉండదు. మధ్యలో ఆపరేటింగ్ సిస్టమ్ (OS) ఒక దళారి (Broker) లాగా పనిచేస్తుంది. మీరు ఒక ఫైల్ అడిగితే, OS దాన్ని ఓపెన్ చేసి, దాని అడ్రస్ ని ఒక <strong><code>FILE*</code> (ఫైల్ పాయింటర్)</strong> రూపంలో మీకు ఇస్తుంది. ఆ పాయింటర్ నే పట్టుకుని మీరు డేటా రాయడం, చదవడం చేస్తారు.
      </p>

      <div class="deep-dive-card">
        <h3>📝 రియల్ లైఫ్ స్టోరీ: లైబ్రరీలో బుక్ చదవడం (File Modes)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక లైబ్రరీ కి వెళ్లి ఒక బుక్ అడిగినప్పుడు, లైబ్రేరియన్ (Operating System) మిమ్మల్ని ఒక ప్రశ్న అడుగుతుంది: "బాబు, నువ్వు ఈ బుక్ ఎందుకు తీసుకుంటున్నావ్?"<br><br>
          <strong>Read Mode (<code>"r"</code>):</strong> "నేను కేవలం చదువుతాను, పెన్ తో ఏమీ రాయను" (రీడ్ మోడ్). ఒకవేళ ఆ బుక్ లేకపోతే ఎర్రర్ ఇస్తుంది.<br>
          <strong>Write Mode (<code>"w"</code>):</strong> "నేను ఒక కొత్త బుక్ రాస్తాను." (ఒకవేళ పాత బుక్ ఉంటే, దాన్ని చింపేసి / డిలీట్ చేసి కొత్త పేజీలు ఇస్తుంది! ఇది కొంచెం డేంజర్).<br>
          <strong>Append Mode (<code>"a"</code>):</strong> "ముందు ఉన్న బుక్ ని డిలీట్ చేయొద్దు, దానికి చివర్లో నా స్టోరీ కంటిన్యూ చేస్తాను" (యాడ్ చేయడం).<br><br>
          ఈ మోడ్స్ బట్టి ఫైల్ సేఫ్ గా ఉంటుందా, డిలీట్ అవుతుందా అనేది డిసైడ్ అవుతుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఫైల్ లోపల రాయడం మరియు చదవడం</div>
    <div class="section-body">
      <p class="text-prose">
        మనం కన్సోల్ (స్క్రీన్) మీద ప్రింట్ చేయడానికి <code>printf</code> వాడతాం కదా. ఫైల్ లోపలికి ప్రింట్ చేయడానికి సింపుల్ గా దానికి ముందు ఒక 'f' తగిలించి <strong><code>fprintf(filePointer, "text")</code></strong> అని వాడతాం! 
      </p>
      <p class="text-prose">
        అలాగే చదవడానికి <code>scanf</code> బదులు <strong><code>fscanf()</code></strong> లేదా <strong><code>fgets()</code></strong> వాడతాం. <code>fgets</code> అనేది ఒకేసారి ఒక లైన్ మొత్తాన్ని సేఫ్ గా చదువుతుంది (బెస్ట్ ఆప్షన్). ఫైల్ అంతా చదివేసాక చివరకి వచ్చేసరికి <code>EOF</code> (End Of File) అనే సిగ్నల్ వస్తుంది, అప్పుడు మనం చదవడం ఆపేయాలి.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Text File I/O)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఒక ఫైల్ క్రియేట్ చేసి అందులో రెండు లైన్ల డేటా ఎలా రాశామో (Write), ఆ తర్వాత మళ్ళీ అదే ఫైల్ ఓపెన్ చేసి లైన్ బై లైన్ ఎలా చదివామో (Read) ఒకే కోడ్ లో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — File Handling (Text Mode)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    // ------------------------------------
    // 1. ఫైల్ లో రాయడం (Write Mode 'w')
    // ------------------------------------
    // my_diary.txt ని రైట్ మోడ్ లో అడుగుతున్నాం
    FILE* filePtr = fopen("my_diary.txt", "w");
    
    // ఒకవేళ హార్డ్ డిస్క్ ఫుల్ అయితే ఫైల్ ఓపెన్ అవ్వదు!
    if (filePtr == NULL) {
        printf("Error: ఫైల్ క్రియేట్ అవ్వలేదు!\\n");
        return 1;
    }
    
    // ఫైల్ లోపలికి ప్రింట్ చేస్తున్నాం (fprintf)
    fprintf(filePtr, "Hello, this is my first file!\\n");
    fprintf(filePtr, "C Language file handling is awesome.\\n");
    
    // పని అయ్యాక కచ్చితంగా క్లోజ్ చేయాలి (లేకపోతే డేటా సేవ్ అవ్వదు)
    fclose(filePtr);
    printf("[+] ఫైల్ లోకి డేటా సక్సెస్ గా రాసాము.\\n\\n");
    
    // ------------------------------------
    // 2. ఫైల్ ని చదవడం (Read Mode 'r')
    // ------------------------------------
    filePtr = fopen("my_diary.txt", "r"); // ఇప్పుడు రీడ్ మోడ్
    
    if (filePtr == NULL) {
        printf("Error: ఫైల్ దొరకలేదు!\\n");
        return 1;
    }
    
    char buffer[100]; // చదివిన డేటా దాచుకోవడానికి ఒక బాక్స్
    
    printf("--- ఫైల్ లోపల ఉన్న డేటా ---\\n");
    // fgets వాడి లైన్ బై లైన్ (max 100 chars) చదువుతున్నాం
    // ఫైల్ చివరకి (NULL) వచ్చేదాకా ఈ లూప్ తిరుగుతుంది
    while (fgets(buffer, sizeof(buffer), filePtr) != NULL) {
        printf("%s", buffer); // చదివింది స్క్రీన్ పై ప్రింట్ చేయడం
    }
    printf("---------------------------\\n");
    
    // చదవడం అయ్యాక క్లోజ్ చేయాలి
    fclose(filePtr);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>fopen("my_diary.txt", "w")</code>: విండోస్ ఈ పేరుతో ఒక టెక్స్ట్ ఫైల్ క్రియేట్ చేస్తుంది (మీ C ప్రోగ్రామ్ ఏ ఫోల్డర్ లో ఉందో అక్కడే వస్తుంది). దానికి ఒక అడ్రస్ ఇస్తుంది.</li>
        <li><code>fclose(filePtr)</code>: మీరు ఫైల్ లో రైట్ చేసిన డేటా వెంటనే హార్డ్ డిస్క్ కి వెళ్ళదు, RAM లో ఉన్న బఫర్ లో వెయిట్ చేస్తుంది. మీరు <code>fclose()</code> అని పిలిస్తేనే, OS ఆ బఫర్ లో ఉన్నదాన్ని తీసుకెళ్లి ఫైల్ లో ముద్రించి, లాక్ చేస్తుంది. ఇది మర్చిపోతే సగం డేటా మాయం అవుతుంది!</li>
        <li><code>fgets(buffer, 100, filePtr)</code>: ఇది చాలా సేఫ్ ఫంక్షన్. ఫైల్ లోపలికి వెళ్లి గరిష్టంగా 100 అక్షరాలు లేదా ఒక 'ఎంటర్' (newline) వచ్చేదాకా చదివి, దాన్ని మన <code>buffer</code> అనే అర్రే లోకి కాపీ చేస్తుంది. ఆ అర్రే ని మనం ప్రింట్ చేస్తున్నాం.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఫైల్ మోడ్స్ లో <code>"r+"</code>, <code>"w+"</code>, <code>"a+"</code> అంటే ఏంటి?</h4>
          <p>ప్లస్ (<code>+</code>) ఉంటే రెండు పనులూ చేయొచ్చు అని అర్థం. <code>"r+"</code> అంటే రీడ్ అండ్ రైట్ (ఉన్న ఫైల్ డిలీట్ అవ్వదు). <code>"w+"</code> అంటే రైట్ అండ్ రీడ్ (కానీ పాత ఫైల్ ఉంటే దాన్ని పీకేసి కొత్తది ఇస్తుంది). <code>"a+"</code> అంటే చివర్లో యాడ్ చేయొచ్చు, ఎక్కడైనా చదవొచ్చు. చాలా కేర్ఫుల్ గా వీటిని వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>fscanf()</code> ఎందుకు వాడకూడదు అంటారు?</h4>
          <p><code>fscanf</code> అనేది <code>scanf</code> లాగానే స్పేస్ (Space) రాగానే చదవడం ఆపేస్తుంది. అంటే ఒక ఫైల్ లో "Hello World" అని ఉంటే, అది కేవలం "Hello" మాత్రమే చదివి ఆగిపోతుంది. మనకు సాధారణంగా ఒక లైన్ మొత్తం చదవాలి కాబట్టి ఎప్పుడూ <code>fgets()</code> వాడటమే ప్రొఫెషనల్ పద్ధతి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: ఫైల్ పేరు "C:\\data\\file.txt" అని ఇస్తే ఫెయిల్ అవుతుందా?</h4>
          <p>సాధారణంగా అవుతుంది! C లాంగ్వేజ్ స్ట్రింగ్స్ లో సింగిల్ స్లాష్ <code>\\</code> అనేది ఎస్కేప్ క్యారెక్టర్ (ఉదా: <code>\\n</code>, <code>\\t</code>). కాబట్టి మీరు విండోస్ పాత్ ఇవ్వాలంటే ఖచ్చితంగా డబుల్ స్లాషెస్ వాడాలి. అంటే <code>"C:\\\\data\\\\file.txt"</code> లాగా ఇస్తేనే సిస్టమ్ కి పాత్ కరెక్ట్ గా అర్థమవుతుంది. లేదంటే లైనక్స్ లాగా ఫార్వర్డ్ స్లాష్ <code>"C:/data/file.txt"</code> వాడినా పనిచేస్తుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 36, "Phase 14", "File I/O & Preprocessor", subtopics, contentBody, '35-c-dynamic-arrays-strings-structures-and-memory-debugging.html', '35. Dynamic Collections & Valgrind', '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', '37. Binary File I/O & fseek()');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson37() {
  const title = "Binary File I/O & fseek() (తెలుగులో)";
  const desc = "C లో ఇమేజెస్, ఆడియోస్ లాంటి బైనరీ (Binary) ఫైల్స్ ని ఎలా హ్యాండిల్ చేయాలి? fwrite() మరియు fread() వాడి వేలాది స్ట్రక్చర్స్ ని ఒకే సెకనులో ఫైల్ లోకి ఎలా సేవ్ చేయాలో మరియు fseek() తో ఫైల్ లో ఎక్కడికైనా ఎలా జంప్ చేయాలో నేర్చుకుందాం.";
  const filename = "37-c-binary-file-io-fwrite-fread-and-file-positioning.html";
  const subtopics = "Binary Files (wb, rb) · fwrite() & fread() · Struct Serialization · fseek() & ftell() · Fast I/O";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంతకుముందు మనం రాసిన ఫైల్స్ అన్నీ టెక్స్ట్ (Text) ఫైల్స్. అంటే వాటిని నోట్ ప్యాడ్ (Notepad) తో ఓపెన్ చేస్తే ఇంగ్లీష్ అక్షరాలు కళ్ళకు కనిపిస్తాయి. కానీ ఒక MP3 సాంగ్ ని గాని, ఒక .JPG ఇమేజ్ ని గాని నోట్ ప్యాడ్ లో ఓపెన్ చేస్తే విచిత్రమైన గార్బేజ్ సింబల్స్ కనిపిస్తాయి కదా! అవే <strong>Binary Files (బైనరీ ఫైల్స్)</strong>. రియల్ వరల్డ్ యాప్స్ లో ఒక గేమ్ సేవ్ ఫైల్ ని ఎవరూ చదవకుండా లాక్ చేయాలన్నా, లేదా లక్షల మంది స్టూడెంట్స్ డేటాని మిల్లీ-సెకన్లలో హార్డ్ డిస్క్ లోకి సేవ్ చేయాలన్నా ఈ బైనరీ ఫైల్స్ (0s and 1s) వాడాల్సిందే. ఈరోజు <code>fwrite()</code>, <code>fread()</code> మరియు ఫైల్ లో వీడియో ప్లేయర్ లాగా జంప్ చేసే <code>fseek()</code> మ్యాజిక్ ఏంటో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Text మోడ్ vs Binary మోడ్ (అసలు తేడా ఏంటి?)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు టెక్స్ట్ మోడ్ లో (<code>"w"</code>) ఎంటర్ (Newline - <code>\\n</code>) రాస్తే, విండోస్ ఆపరేటింగ్ సిస్టమ్ దాన్ని బ్యాక్ గ్రౌండ్ లో <code>\\r\\n</code> (క్యారేజ్ రిటర్న్ + న్యూలైన్) కింద మారుస్తుంది. ఆ మార్పుల వల్ల ఫైల్ సైజు పెరగడం, డేటా చదవడం స్లో అవ్వడం జరుగుతుంది. 
      </p>
      <p class="text-prose">
        కానీ బైనరీ మోడ్ లో (<code>"wb"</code> - Write Binary) మీరు RAM లో ఉన్న డేటాని (0s & 1s) <strong>ఎలా ఉందో అలాగ (Raw Copy)</strong> విసిరేస్తారు. మధ్యలో OS ఎలాంటి ఫార్మాటింగ్ చేయదు! కాబట్టి ఇది సూపర్ ఫాస్ట్ గా ఉంటుంది. పైగా డేటా సెక్యూరిటీ కూడా ఉంటుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🚀 రియల్ లైఫ్ స్టోరీ: ఒక ట్రక్ లో ఇటుకలు వేయడం (fwrite vs fprintf)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          <strong>fprintf (Text Mode):</strong> మీ దగ్గర 10,000 ఇటుకలు ఉన్నాయి. మీరు ఒక్కో ఇటుకని తీసుకుని, దాన్ని శుభ్రంగా కడిగి, ఒక పేపర్ చుట్టి (ఫార్మాటింగ్) ఆ తర్వాతే ట్రక్ లో వేస్తున్నారు అనుకోండి. దీనికి రెండు రోజులు పడుతుంది కదా! ఇది <code>fprintf</code> చేసే పని (స్లో).<br><br>
          <strong>fwrite (Binary Mode):</strong> మీరు డైరెక్ట్ గా ఒక జేసీబీ (JCB) తో ఆ 10,000 ఇటుకలని (Memory Block) ఒకేసారి ఎత్తి, ఒక్క సెకనులో ఆ ట్రక్ (File) లో పడేస్తారు! ఏ ఫార్మాటింగ్ లేదు, పేపర్స్ లేవు. RAM లో ఉన్న మెమరీ బ్లాక్ ని ఒకే షాట్ లో హార్డ్ డిస్క్ లోకి కాపీ చేయడాన్నే <code>fwrite()</code> అంటారు. డేటాబేస్ ఇంజిన్స్, గేమ్ సేవ్ ఇంజిన్స్ అన్నీ ఇదే వాడుతాయి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> fwrite() మరియు fread() సింటాక్స్</div>
    <div class="section-body">
      <p class="text-prose">
        వీటి సింటాక్స్ చూడటానికి కొంచెం భయపెట్టేలా ఉంటుంది కానీ, అర్థమైతే చాలా సింపుల్:<br>
        <code>fwrite(డేటా_అడ్రస్, ఒక్కో_సైజు, ఎన్ని_ఐటమ్స్, ఫైల్_పాయింటర్);</code>
      </p>
      <p class="text-prose">
        మీరు ఒక స్ట్రక్చర్ ని (ఉదా: ప్లేయర్ ఇన్వెంటరీ) సేవ్ చేయాలంటే <code>fwrite(&amp;player, sizeof(Player), 1, file)</code> అని రాస్తే, ఆ స్ట్రక్చర్ లోపల వంద ఐటమ్స్ ఉన్నా సరే సింగిల్ లైన్ లో సేవ్ అయిపోతుంది!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Struct Serialization)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఒక గేమ్ లో ఉన్న ప్లేయర్ స్ట్రక్చర్ ని బైనరీ ఫైల్ (<code>.dat</code>) లోకి రాసి, మళ్ళీ దాన్ని ఎలా ఫాస్ట్ గా చదివి లోడ్ చేసామో చూడండి. 
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Binary File I/O (fwrite/fread)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

// ఒక కాంప్లెక్స్ గేమ్ స్ట్రక్చర్
struct Player {
    char name[50];
    int level;
    float health;
};

int main() {
    // 1. మనం సేవ్ చేయాల్సిన డేటా క్రియేట్ చేద్దాం
    struct Player p1 = {"DragonSlayer", 45, 89.5f};
    
    // --- BRAY FILE WRITE (Save Game) ---
    // "wb" అంటే Write Binary (నార్మల్ టెక్స్ట్ కాదు)
    FILE* file = fopen("savegame.dat", "wb");
    if (file == NULL) return 1;
    
    // మ్యాజిక్ ఇక్కడే: RAM లో ఉన్న p1 ని ఒకేసారి ఫైల్ లోకి జేసీబీ తో వేస్తున్నాం
    // (అడ్రస్, సైజు, ఎన్ని బ్లాక్స్, ఫైల్)
    fwrite(&p1, sizeof(struct Player), 1, file);
    
    fclose(file);
    printf("[+] Game State Saved Securely (Binary).\\n\\n");
    
    // ------------------------------------
    // --- BINARY FILE READ (Load Game) ---
    // ------------------------------------
    struct Player loadedPlayer; // కొత్త ఖాళీ బాక్స్ 
    
    // "rb" అంటే Read Binary
    FILE* loadFile = fopen("savegame.dat", "rb");
    if (loadFile == NULL) return 1;
    
    // ఫైల్ లో ఉన్న బైనరీ డేటాని డైరెక్ట్ గా మన ఖాళీ స్ట్రక్చర్ లోకి కాపీ కొడుతున్నాం!
    fread(&loadedPlayer, sizeof(struct Player), 1, loadFile);
    
    fclose(loadFile);
    
    // లోడ్ అయిన డేటాని చెక్ చేద్దాం
    printf("--- Loaded Game State ---\\n");
    printf("Player Name : %s\\n", loadedPlayer.name);
    printf("Level       : %d\\n", loadedPlayer.level);
    printf("Health      : %.1f\\n", loadedPlayer.health);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>fopen("savegame.dat", "wb")</code>: డాట్ టెక్స్ట్ (.txt) బదులు .dat అని ఇచ్చాము (బైనరీ ఫైల్ అని గుర్తుకోసం). 'wb' అంటే OS కి మనం చెప్తున్నాం ఎటువంటి క్యారెక్టర్ ఎన్కోడింగ్ చేయకని.</li>
        <li><code>fwrite(&amp;p1, ...)</code>: ఇది చాలా డేంజరస్ అండ్ పవర్ ఫుల్! <code>p1</code> లోపల స్ట్రింగ్స్ ఉన్నా, ఫ్లోట్స్ ఉన్నా దానికి అనవసరం. అది కేవలం ఆ 58 బైట్స్ ఆఫ్ RAM ని కట్ చేసి హార్డ్ డిస్క్ మీద ముద్రిస్తుంది (Serialization). దీనివల్ల స్పీడ్ 100x పెరుగుతుంది.</li>
        <li><code>fread(&amp;loadedPlayer, ...)</code>: ఆ బైనరీ డేటాని చదివి, మనకి కావాల్సిన స్ట్రక్చర్ రూల్స్ ప్రకారం మళ్ళీ C కోడ్ లోకి ఒకే లైన్ లో లోడ్ చేసేస్తుంది. No parsing needed!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఫైల్ లో వీడియో ప్లేయర్ లాగా స్కిప్ చేయాలంటే (Seek) ఎలా?</h4>
          <p>ఒక పెద్ద ఫైల్ లో 1000 రికార్డ్స్ ఉంటే, మధ్యలో 500వ రికార్డ్ చదవాలంటే మొదటి నుండి చదువుకుంటూ వెళ్లక్కర్లేదు. C లో <strong><code>fseek(file, offset, POSITION)</code></strong> అనే ఫంక్షన్ వాడొచ్చు. ఉదాహరణకు <code>fseek(file, 100, SEEK_SET)</code> అంటే స్టార్టింగ్ నుండి 100 బైట్స్ ముందుకు జంప్ అవ్వు అని అర్థం. ఇది డేటాబేస్ అల్గారిథమ్స్ కి ప్రాణం లాంటిది!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>ftell()</code> అంటే ఏంటి? ఫైల్ సైజు ఎలా కనుక్కోవాలి?</h4>
          <p>మీరు ఫైల్ లోపల ప్రస్తుతం ఎన్నో బైట్ దగ్గర ఉన్నారో ఆ నంబర్ ని <code>ftell(file)</code> చెప్తుంది. ఒక ఫైల్ సైజు కనుక్కోవాలంటే బెస్ట్ ట్రిక్: ముందు <code>fseek(file, 0, SEEK_END)</code> వాడి ఫైల్ చివరికి జంప్ చేయండి. ఆ తర్వాత <code>ftell()</code> వాడి ఆ పొజిషన్ నంబర్ తెచ్చుకోండి. ఆ నంబరే మీ ఫైల్ సైజు (In Bytes)!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: బైనరీ ఫైల్స్ అన్ని సిస్టమ్స్ లో ఒకేలా పనిచేస్తాయా? (Portability Issue)</h4>
          <p>ఇది చాలా పెద్ద బగ్! ఒక ఇంటెల్ (Little Endian) సిస్టమ్ లో బైనరీ రైట్ చేసి, ఆ ఫైల్ ని మ్యాక్ బుక్ (ARM / Big Endian పాత మోడల్స్) సిస్టమ్ లో చదివితే డేటా మొత్తం ఉల్టా అయిపోతుంది (ఉదాహరణకు లెవల్ 45 కాస్తా 7549747 అవుతుంది). దానికి తోడు స్ట్రక్చర్ ప్యాడింగ్ (Struct Padding) వల్ల సిస్టమ్ కి సిస్టమ్ కి సైజు మారిపోతుంది. బైనరీ ఫైల్స్ ఫాస్ట్ అయినా, అవి పోర్టబుల్ కాదు!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 37, "Phase 14", "File I/O & Preprocessor", subtopics, contentBody, '36-c-file-handling-fopen-fclose-and-text-io.html', '36. File Handling, fopen() & I/O', '38-c-file-error-handling-feof-ferror-and-errno.html', '38. File Errors & feof()');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}


function run() {
  buildLesson33();
  buildLesson34();
  buildLesson35();
  buildLesson36();
  buildLesson37();
  console.log("✅ Generated C Lessons 33 to 37 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
