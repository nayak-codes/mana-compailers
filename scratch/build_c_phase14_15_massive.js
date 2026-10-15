const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

// C Masterclass Curriculum Structure
const C_CURRICULUM = [
  {
    id: 'phase14', tag: 'Phase 14', title: 'File I/O & Preprocessor', icon: '📁',
    lessons: [
      { num: 36, file: '36-c-file-handling-fopen-fclose-and-text-io.html', title: '36. File Handling, fopen() & I/O' },
      { num: 37, file: '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', title: '37. Binary File I/O & fseek()' },
      { num: 38, file: '38-c-file-error-handling-feof-ferror-and-errno.html', title: '38. File Errors & feof()' },
      { num: 39, file: '39-c-preprocessor-macros-define-and-conditional-compilation.html', title: '39. C Preprocessor, Macros & #define' },
      { num: 40, file: '40-c-header-files-h-and-multi-file-projects.html', title: '40. Header Files (.h) & Multi-file Projects' }
    ]
  },
  {
    id: 'phase15', tag: 'Phase 15', title: 'Advanced Pointers', icon: '🎯',
    lessons: [
      { num: 41, file: '41-c-double-pointers-and-memory-addresses.html', title: '41. Double Pointers (**) & Memory Addresses' },
      { num: 42, file: '42-c-function-pointers-and-callbacks.html', title: '42. Function Pointers & Callbacks' },
      { num: 43, file: '43-c-void-pointers-and-generic-programming.html', title: '43. Void Pointers & Generic Programming' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, file errors in c, feof, c preprocessor, c macros, header files in c, double pointers c, function pointers c" />
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

function buildLesson38() {
  const title = "File Errors, feof() & errno (తెలుగులో)";
  const desc = "C లో File తో పని చేసేటప్పుడు వచ్చే ఎర్రర్స్ ని హ్యాండిల్ చేయడం ఎలా? హార్డ్ డిస్క్ ఫుల్ అయినా, లేదా ఫైల్ దొరకకపోయినా ప్రోగ్రామ్ క్రాష్ అవ్వకుండా feof(), ferror() మరియు errno వాడి ఎలా కాపాడాలో డీప్ గా తెలుసుకుందాం.";
  const filename = "38-c-file-error-handling-feof-ferror-and-errno.html";
  const subtopics = "feof() · ferror() · perror() · errno codes · Bulletproof File I/O";

  const contentBody = `
    <div class="intro-box">
      <p>రియల్ వరల్డ్ యాప్స్ లో ఎప్పుడూ అన్ని పనులు సాఫీగా జరగవు. మీరు ఒక ఫైల్ సేవ్ చేద్దామనుకుంటే సడెన్ గా యూజర్ పెన్ డ్రైవ్ పీకేయొచ్చు, లేదా హార్డ్ డిస్క్ ఫుల్ అవ్వొచ్చు. అలాంటప్పుడు మీ ప్రోగ్రామ్ బ్లూ స్క్రీన్ ఇచ్చి క్రాష్ అయితే యూజర్ చాలా ఫ్రస్ట్రేట్ అవుతాడు. దాన్ని అడ్డుకోవడానికే C లాంగ్వేజ్ లో <strong>File Error Handling</strong> ఉంది. ఒక ఫైల్ చివరికి వచ్చిందా అని చెప్పే <code>feof()</code>, ఫైల్ చదివేటప్పుడు ఏమైనా ప్రాబ్లమ్ వస్తే వార్నింగ్ ఇచ్చే <code>ferror()</code>, అసలు ఆ ప్రాబ్లమ్ ఏంటో క్లియర్ గా ఇంగ్లీష్ లో చెప్పే <code>perror() / errno</code> గురించి ఈరోజు పోస్ట్‌మార్టం చేసి తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> feof() అంటే ఏంటి? (End of File)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక బుక్ చదువుకుంటూ వెళ్తున్నారు. లాస్ట్ పేజీ అయిపోయిన తర్వాత కూడా చదవడానికి ట్రై చేస్తే ఏమవుతుంది? ఏమీ ఉండదు! C లో ఫైల్ చదివేటప్పుడు <code>EOF</code> అనేది వస్తుంది. ఈ ఫైల్ నిజంగానే పూర్తిగా చదివేసామా లేదా అని చెక్ చేయడానికి <strong><code>feof(file_pointer)</code></strong> అనే ఫంక్షన్ వాడతాము.
      </p>
      <p class="text-prose">
        ఫైల్ చివరికి వస్తే <code>feof()</code> ట్రూ (1) పంపుతుంది, లేకపోతే ఫాల్స్ (0) పంపుతుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🚨 రియల్ లైఫ్ స్టోరీ: perror() మరియు errno (డిటెక్టివ్ లు)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు బ్యాంకు కి వెళ్లి లోన్ అడిగితే రిజెక్ట్ చేసారు అనుకోండి (అంటే <code>fopen</code> ఫెయిల్ అయ్యింది). కానీ ఎందుకు రిజెక్ట్ చేసారో రీజన్ చెప్పకపోతే మీకు ఎలా తెలుస్తుంది? C లాంగ్వేజ్ లో బ్యాక్ గ్రౌండ్ లో <strong><code>errno</code></strong> (Error Number) అనే ఒక హిడెన్ గ్లోబల్ నంబర్ ఉంటుంది. ఏదైనా ఫెయిల్ అయినప్పుడు, ఆపరేటింగ్ సిస్టమ్ ఆ నంబర్ ని ఒక ఎర్రర్ కోడ్ కి సెట్ చేస్తుంది (ఉదా: 2 అంటే "File Not Found", 13 అంటే "Permission Denied").<br><br>
          ఆ నంబర్ ని మనుషులకు అర్థమయ్యే ఇంగ్లీష్ లోకి మార్చి ప్రింట్ చేసే స్పెషల్ ఫంక్షనే <strong><code>perror()</code></strong>. ఇది మీ ఎర్రర్ మెసేజ్ పక్కన కరెక్ట్ రీజన్ ని అతుక్కుని స్క్రీన్ మీద చూపిస్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Bulletproof File Reading)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో కావాలని లేని ఫైల్ ని ఓపెన్ చేసి ఎర్రర్ ఎలా చూపిస్తుందో, అలాగే ఉంటే దాన్ని చదివి <code>feof</code> మరియు <code>ferror</code> తో ఎలా సేఫ్ గా ఆపుతుందో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — File Errors & errno</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;errno.h&gt; // errno వాడాలంటే ఇది కచ్చితంగా ఉండాలి

int main() {
    // 1. కావాలనే తప్పు పేరుతో (లేని ఫైల్ ని) ఓపెన్ చేద్దాం
    FILE* file = fopen("ghost_file.txt", "r");
    
    // ఒకవేళ ఫైల్ ఓపెన్ అవ్వకపోతే
    if (file == NULL) {
        // perror ఆటోమేటిక్ గా errno ని చదివి రీజన్ ప్రింట్ చేస్తుంది
        perror("Error Opening File");
        
        // గ్లోబల్ errno వాల్యూ ఎంత వచ్చిందో కూడా ప్రింట్ చేద్దాం
        printf("System Error Code (errno): %d\\n", errno);
        return 1; // యాప్ ని సేఫ్ గా ఆపేద్దాం
    }
    
    // 2. ఒకవేళ ఫైల్ ఉంటే (ఇక్కడ మనం dummy logic రాస్తున్నాం)
    int c;
    printf("--- File Contents ---\\n");
    
    // fgetc వాడి ఒక్కొక్క అక్షరం చదువుతున్నాం
    while (1) {
        c = fgetc(file);
        
        if (feof(file)) { // ఫైల్ పూర్తిగా అయిపోతే...
            printf("\\n[✓] Successfully reached End of File.\\n");
            break;
        }
        
        if (ferror(file)) { // మధ్యలో పెన్ డ్రైవ్ పీకేస్తే (Read Error)...
            printf("\\n[!] I/O Error: చదివేటప్పుడు ఎర్రర్ వచ్చింది!\\n");
            clearerr(file); // ఎర్రర్ ని క్లియర్ చేయడం
            break;
        }
        
        putchar(c); // అక్షరాన్ని ప్రింట్ చేయడం
    }
    
    fclose(file);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>errno.h</code>: సిస్టమ్ లో ఎర్రర్ నంబర్స్ ని ట్రాక్ చేసే గ్లోబల్ వేరియబుల్ ని వాడటానికి ఈ హెడ్డర్ కావాలి.</li>
        <li><code>perror("Error Opening File")</code>: ఇది మీ టెక్స్ట్ ని ప్రింట్ చేసి, పక్కన కోలన్ (:) పెట్టి, OS ఇచ్చిన ఒరిజినల్ రీజన్ ని అతుకుతుంది (ఉదా: <em>Error Opening File: No such file or directory</em>).</li>
        <li><code>feof(file)</code>: మనం లూప్ లో ఫైల్ చదువుతున్నప్పుడు, కరెక్ట్ గా లాస్ట్ క్యారెక్టర్ తర్వాత ఇది ఆగిపోయి బ్రేక్ చేస్తుంది.</li>
        <li><code>ferror(file)</code>: ఫైల్ ని రైట్ (Write) మోడ్ లో ఓపెన్ చేసి, రీడ్ (Read) చేయడానికి ట్రై చేస్తే, ఇది ఎర్రర్ అని కనిపెట్టి ప్రోగ్రామ్ క్రాష్ అవ్వకుండా ఆపుతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: while( !feof(file) ) అని డైరెక్ట్ గా రాయొచ్చా?</h4>
          <p>చాలా ట్యుటోరియల్స్ లో ఇలాగే చెప్తారు కానీ, ఇది ఒక <strong>మహా తప్పు (Anti-Pattern)!</strong> <code>feof</code> అనేది ముందే లాస్ట్ కి వచ్చిందా అని గెస్ చేయలేదు. లాస్ట్ అక్షరం చదివాక కూడా, ఇంకోసారి చదివితే అప్పుడు ఫెయిల్ అయ్యి <code>feof</code> ట్రూ అవుతుంది. అంటే మీరు లూప్ లో లాస్ట్ అక్షరాన్ని రెండుసార్లు ప్రింట్ చేసే (Duplicate Print) ఛాన్స్ ఉంటుంది! అందుకే లోపలే చెక్ చేసుకోవాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>clearerr(file)</code> ఎందుకు వాడాలి?</h4>
          <p>ఒక ఫైల్ లో ఎర్రర్ వచ్చాక (ferror = 1), మీరు దాన్ని క్లియర్ చేయకుండా మళ్ళీ చదవడానికి ట్రై చేస్తే సిస్టమ్ మిమ్మల్ని అనుమతించదు. ఆ ఫైల్ పాయింటర్ ఎర్రర్ స్టేట్ లోనే లాక్ అయిపోతుంది. దాన్ని రీసెట్ చేసి, మళ్ళీ నార్మల్ గా మార్చడానికే <code>clearerr()</code> వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: నెట్వర్క్ ఫైల్స్ లో (Cloud) కూడా errno పనిచేస్తుందా?</h4>
          <p>ఖచ్చితంగా! సాకెట్ ప్రోగ్రామింగ్ (Sockets) లో కూడా కనెక్షన్ కట్ అయినా, టైమ్ అవుట్ అయినా ఇదే <code>errno</code> లోకి నంబర్స్ వస్తాయి. ఉదాహరణకు errno 110 అంటే 'Connection Timed Out'. అందుకే C లో ఈ errno లాజిక్ ని అర్థం చేసుకోవడం సర్వర్ ప్రోగ్రామర్స్ కి చాలా ముఖ్యం.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 38, "Phase 14", "File I/O & Preprocessor", subtopics, contentBody, '37-c-binary-file-io-fwrite-fread-and-file-positioning.html', '37. Binary File I/O & fseek()', '39-c-preprocessor-macros-define-and-conditional-compilation.html', '39. C Preprocessor & Macros');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson39() {
  const title = "C Preprocessor, Macros & #define (తెలుగులో)";
  const desc = "C కంపైలర్ కోడ్ ని రన్ చేసే ముందే ఏం జరుగుతుంది? ప్రీప్రాసెసర్ (Preprocessor) అంటే ఏంటి? #define తో Macros ఎలా క్రియేట్ చేయాలి? కోడ్ లో మ్యాజిక్ నంబర్స్ ని ఆపడానికి కాన్స్టంట్స్ ఎలా వాడాలో డీప్ గా తెలుసుకుందాం.";
  const filename = "39-c-preprocessor-macros-define-and-conditional-compilation.html";
  const subtopics = "The Preprocessor Phase · #define Macros · Magic Numbers · #ifdef & #ifndef · Inline Functions";

  const contentBody = `
    <div class="intro-box">
      <p>మనం రాసిన C ప్రోగ్రామ్ డైరెక్ట్ గా కంపైల్ అవ్వదు. ముందుగా <strong>Preprocessor (ప్రీప్రాసెసర్)</strong> అనే ఒక చిన్న రోబోట్ వచ్చి మీ కోడ్ లో ఉన్న హాష్ సింబల్స్ (<code>#</code>) అన్నిటినీ చూసుకుంటుంది. అది కోడ్ ని క్లీన్ చేసి, కాపీ-పేస్ట్ చేసి అప్పుడు కంపైలర్ కి ఇస్తుంది. ఇందులో అత్యంత పవర్ ఫుల్ ఆయుధం <strong><code>#define</code> (Macros)</strong>. దీనితో మనం ఒక చిన్న వర్డ్ కి పెద్ద ఫార్ములాస్ లింక్ చేసి, కోడ్ ని సూపర్ ఫాస్ట్ గా మరియు సింపుల్ గా మార్చొచ్చు. గేమింగ్ ఇంజిన్స్ లో మరియు సిస్టమ్ డెవలప్మెంట్ లో అసలు ఇవి లేకుండా కోడ్ ఉండదు. అవెలా పనిచేస్తాయో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ప్రీప్రాసెసర్ అంటే ఏంటి? (The Invisible Robot)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు <code>#include &lt;stdio.h&gt;</code> అని రాసినప్పుడు, ప్రీప్రాసెసర్ వచ్చి నిజంగానే ఆ <code>stdio.h</code> ఫైల్ ని ఓపెన్ చేసి, అందులో ఉన్న వందల లైన్ల కోడ్ ని తీసుకొచ్చి మీ ప్రోగ్రామ్ పైభాగంలో (Top) సింపుల్ గా <strong>కాపీ-పేస్ట్</strong> చేస్తుంది. ఇది కంపైలర్ కి వెళ్లే ముందే జరిగే టెక్స్ట్ రీప్లేస్మెంట్ ప్రాసెస్!
      </p>

      <div class="deep-dive-card">
        <h3>✨ రియల్ లైఫ్ స్టోరీ: Find & Replace (మ్యాజిక్ నంబర్స్)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక గేమ్ కోడ్ రాస్తున్నారు. ఆ గేమ్ లో మొత్తం 100 మంది ఎనిమీస్ (Enemies) ఉంటారు. మీరు కోడ్ లో ప్రతిచోటా <code>for(i=0; i&lt;100; i++)</code> అని రాసుకుంటూ వెళ్లారు. దీన్నే <strong>Magic Numbers</strong> అంటారు (ఎందుకంటే ఆ 100 అంటే ఏంటో చూసే వాడికి తెలీదు).<br><br>
          రేపు పొద్దున బాస్ వచ్చి "ఎనిమీస్ ని 500 చేయి" అంటే... ఆ వేల లైన్ల కోడ్ లో వెతికి వెతికి ఎక్కడ 100 ఉందో మార్చాలి. అదే మీరు పైభాగంలో <code>#define MAX_ENEMIES 100</code> అని రాసుకుంటే... రోబోట్ వచ్చి కోడ్ మొత్తంలో ఎక్కడ MAX_ENEMIES ఉంటే అక్కడ 100 పెట్టి కంపైల్ చేస్తుంది. మార్చాలంటే జస్ట్ ఆ ఒక్కచోట మారిస్తే యాప్ అంతా ఆటోమేటిక్ గా అప్డేట్ అయిపోతుంది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> మ్యాక్రోస్ (Macros) vs ఫంక్షన్స్ (Functions)</div>
    <div class="section-body">
      <p class="text-prose">
        ఫంక్షన్ ని కాల్ చేసినప్పుడు ప్రోగ్రామ్ మెమరీ లో ఒక కొత్త బ్లాక్ (Stack frame) క్రియేట్ చేసి అక్కడికి దూకి పని చేసి వెనక్కి వస్తుంది. ఇది కొంచెం టైమ్ టేకింగ్. కానీ మీరు ఒక ఫార్ములాని మ్యాక్రో లాగా <code>#define SQUARE(x) (x*x)</code> అని రాస్తే, కంపైల్ అయ్యే ముందే ఆ టెక్స్ట్ మొత్తం అక్కడే డైరెక్ట్ గా పేస్ట్ అవుతుంది. దూకడం (Jumping) ఉండదు కాబట్టి ఎగ్జిక్యూషన్ ఫుల్ ఫాస్ట్!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Advanced Macros)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో పీ (PI) వాల్యూ ని, ఒక మ్యాక్రో ఫంక్షన్ ని మరియు కండిషనల్ కంపైలేషన్ (Conditional Compilation) ని ఎలా వాడామో క్లియర్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Preprocessor & Macros</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. సాధారణ మ్యాక్రో (కాన్స్టంట్)
#define PI 3.14159
#define GAME_NAME "Space Invaders 2026"

// 2. మ్యాక్రో ఫంక్షన్ (బ్రాకెట్లు చాలా ముఖ్యం!)
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// 3. కండిషనల్ కంపైలేషన్ (DEBUG మోడ్)
#define DEBUG_MODE 1

int main() {
    printf("Welcome to %s!\\n\\n", GAME_NAME);
    
    // మ్యాక్రో తో ఏరియా క్యాలిక్యులేషన్
    float radius = 5.0;
    float area = PI * radius * radius;
    printf("Circle Area: %.2f\\n", area);
    
    // మ్యాక్రో ఫంక్షన్ తో హైయెస్ట్ నంబర్ (ఇది టెక్స్ట్ లాగా పేస్ట్ అవుతుంది)
    int score1 = 450, score2 = 720;
    printf("Highest Score: %d\\n", MAX(score1, score2));
    
    // 4. ఇక్కడ మ్యాజిక్: DEBUG_MODE 1 ఉంటేనే ఈ లైన్ కంపైల్ అవుతుంది!
#if DEBUG_MODE
    printf("\\n[DEBUG]: Variables checking... radius=%.1f\\n", radius);
#endif

    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#define PI 3.14</code>: ఇక్కడ కచ్చితంగా గుర్తుపెట్టుకోవాల్సింది ఏంటంటే, చివర్లో సెమికోలన్ (<code>;</code>) పెట్టకూడదు! ఒకవేళ పెడితే, మీరు ఎక్కడ PI వాడితే అక్కడ సెమికోలన్ కూడా పేస్ట్ అయ్యి కోడ్ ఎర్రర్ వస్తుంది.</li>
        <li><code>#define MAX(a,b) ((a) &gt; (b) ? (a) : (b))</code>: బ్రాకెట్స్ ఎందుకు అన్నిసార్లు పెట్టామంటే... ఎవరైనా <code>MAX(2+3, 4)</code> అని పిలిస్తే, బ్రాకెట్స్ లేకపోతే బాడ్-మాస్ (BODMAS) రూల్స్ దెబ్బతిని రిజల్ట్ రాంగ్ వస్తుంది. సేఫ్ సైడ్ కి ఎప్పుడూ లోపల కూడా బ్రాకెట్స్ పెట్టాలి.</li>
        <li><code>#if DEBUG_MODE</code>: ఇది కంపైలర్ కి వెళ్లే ముందే, 1 ఉంటే ఆ కోడ్ ని ఉంచుతుంది, 0 ఉంటే ఆ కోడ్ ని పూర్తిగా డిలీట్ చేస్తుంది! మనం యాప్ ని రిలీజ్ (Playstore లోకి) చేసేటప్పుడు దీన్ని 0 చేస్తాం, అప్పుడు హ్యాకర్స్ కి మన డీబగ్ కోడ్ ఏమీ కనిపించదు (కనీసం ఫైల్ సైజు కూడా పెరగదు).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>const int PI = 3;</code> కి <code>#define PI 3</code> కి తేడా ఏంటి?</h4>
          <p>చాలా పెద్ద తేడా ఉంది! <code>const</code> వాడితే దానికి మెమరీ (RAM) లో ఒక అడ్రస్ క్రియేట్ అయ్యి 4 బైట్స్ తీసుకుంటుంది. దాని అడ్రస్ ని ఇంకెవరికైనా పాస్ చేయొచ్చు. కానీ <code>#define</code> కి మెమరీ అడ్రస్ ఉండదు, అది కేవలం టెక్స్ట్ ఫైండ్-రీప్లేస్ లాగా పనిచేస్తుంది. కాబట్టి ఎవరికైనా అడ్రస్ ఇవ్వాల్సిన పని లేనప్పుడు #define వాడటం స్పీడ్ అండ్ సేఫ్!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>#undef</code> అంటే ఏంటి?</h4>
          <p>మీరు పైన <code>#define MAX 100</code> అని ఇచ్చారు, కానీ కింద కొంత కోడ్ తర్వాత అది 200 అవ్వాలి అనుకోండి. అప్పుడు <code>#undef MAX</code> అని రాసి (అంటే దాన్ని చెరిపేసి), మళ్ళీ కొత్తగా <code>#define MAX 200</code> అని రాసుకోవచ్చు. ఒకే ఫైల్ లో వేరు వేరు లిమిట్స్ కావాల్సినప్పుడు ఇది బాగా వాడుతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>#ifndef</code> ఎందుకు వాడుతారు? (Header Guards)</h4>
          <p>పెద్ద ప్రాజెక్ట్స్ లో ఒకే <code>.h</code> ఫైల్ ని రెండు మూడు సార్లు ఇంక్లూడ్ చేస్తే కంపైలర్ కన్ఫ్యూజ్ అవుతుంది. అలా డూప్లికేట్ అవ్వకుండా ఉండటానికి, <strong>If Not Defined</strong> (<code>#ifndef</code>) వాడతాం. "ఒకవేళ ముందే ఇంక్లూడ్ అయి ఉంటే, మళ్ళీ చేయొద్దు" అని కంపైలర్ కి ఆర్డర్ వేయడమే ఈ కాన్సెప్ట్ (వీటినే Header Guards అంటారు).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 39, "Phase 14", "File I/O & Preprocessor", subtopics, contentBody, '38-c-file-error-handling-feof-ferror-and-errno.html', '38. File Errors & feof()', '40-c-header-files-h-and-multi-file-projects.html', '40. Header Files & Projects');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson40() {
  const title = "Header Files (.h) & Multi-file Projects (తెలుగులో)";
  const desc = "C లో పెద్ద ప్రాజెక్ట్స్ ని ఒకే ఫైల్ లో రాయకుండా 10 ఫైల్స్ గా ఎలా విడగొట్టాలి? Header Files (.h) ఎలా క్రియేట్ చేయాలి? Header Guards (#ifndef) ఎందుకు వాడతారో రియల్ వరల్డ్ ప్రాజెక్ట్ ఆర్కిటెక్చర్ తో నేర్చుకుందాం.";
  const filename = "40-c-header-files-h-and-multi-file-projects.html";
  const subtopics = "Multi-file Architecture · .c vs .h files · Header Guards (#ifndef) · extern keyword · Code Modularity";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంతవరకు మనం రాసిన చిన్న చిన్న ప్రోగ్రామ్స్ అన్నీ ఒకే <code>main.c</code> ఫైల్ లో రాసేసాం. కానీ విండోస్ ఆపరేటింగ్ సిస్టమ్ లాంటి వాటికి కోట్ల లైన్ల కోడ్ ఉంటుంది. అదంతా ఒకే ఫైల్ లో రాస్తే ఎవరైనా చదవగలరా? కంపైల్ చేయడానికి రోజులు పడుతుంది! అందుకే ఇండస్ట్రీలో ఒక ప్రాజెక్ట్ ని రకరకాల చిన్న ముక్కలుగా (Modules) విడగొడతారు. మ్యాథ్స్ కి ఒక ఫైల్, ఇంటర్ఫేస్ కి ఒక ఫైల్ ఇలా. అలా విడగొట్టిన ఫైల్స్ అన్నీ మళ్ళీ ఒకదానితో ఒకటి ఎలా మాట్లాడుకుంటాయి? దానికి మనం వాడే బ్రిడ్జి పేరే <strong>Header Files (హెడర్ ఫైల్స్ - <code>.h</code>)</strong>. మీ స్వంత హెడర్ ఫైల్స్ ని ఎలా సృష్టించాలో ఈరోజు డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> .h మరియు .c ఫైల్స్ మధ్య తేడా (The Architecture)</div>
    <div class="section-body">
      <p class="text-prose">
        ప్రొఫెషనల్ C డెవలపర్స్ ఎప్పుడూ ఒక రూల్ పాటిస్తారు: <strong>"హెడర్ ఫైల్స్ లో కేవలం ఇండెక్స్ (Titles) మాత్రమే ఉండాలి, ఒరిజినల్ స్టోరీ అంతా .c ఫైల్ లోనే ఉండాలి."</strong>
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>Header File (<code>math_utils.h</code>):</strong> ఇదొక మెనూ కార్డ్ లాంటిది. ఇందులో కేవలం ఫంక్షన్స్ పేర్లు, వాటి పరామిటర్స్ (Declarations) మాత్రమే ఉంటాయి. ఉదా: <code>int add(int a, int b);</code></li>
        <li><strong>Source File (<code>math_utils.c</code>):</strong> ఇదొక వంటగది (Kitchen). ఆ ఫంక్షన్స్ లోపల అసలు కోడ్ ఎలా పనిచేస్తుంది (Implementation) అని రాసి ఉంటుంది.</li>
        <li><strong>Main File (<code>main.c</code>):</strong> ఇక్కడ యూజర్ ఆర్డర్ ఇస్తాడు. ఇది <code>math_utils.h</code> ని ఇంక్లూడ్ చేసుకుని వాడుకుంటుంది.</li>
      </ul>

      <div class="deep-dive-card">
        <h3>🛡️ రియల్ లైఫ్ స్టోరీ: Header Guards (డబుల్ ఇంక్లూడ్ సమస్య)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          ఒక రెస్టారెంట్ లో ముగ్గురు మేనేజర్లు ఒకేసారి కిచెన్ కి వెళ్లి మెనూ కార్డ్ తీసుకురమ్మని ఆర్డర్ వేసారు అనుకోండి (అంటే ఒకే .h ఫైల్ ని మూడు .c ఫైల్స్ ఇంక్లూడ్ చేసుకుంటే). కంపైలర్ కి ఆ ఫంక్షన్ పేర్లు మూడు సార్లు పేస్ట్ అవుతాయి, దాంతో ఏది ఒరిజినల్ అని కన్ఫ్యూజ్ అయ్యి <em>"Redefinition Error"</em> ఇస్తుంది.<br><br>
          దీన్ని ఆపడానికే <strong>Header Guards</strong> వాడతారు. అంటే మెనూ కార్డ్ పైన ఒక తాళం వేస్తారు. "ఎవరైనా నన్ను ఆల్రెడీ చదివి ఉంటే (<code>#ifndef</code>), మళ్ళీ చదవొద్దు, వదిలేయండి" అని ప్రీప్రాసెసర్ కి చెప్తారు. దీనివల్ల వంద ఫైల్స్ ఉన్నా ఎర్రర్స్ రావు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> గ్లోబల్ వేరియబుల్స్ షేరింగ్ (extern keyword)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక ఫైల్ లో <code>int score = 0;</code> అని రాసి, దాన్ని వేరే ఫైల్ లో వాడాలి అనుకుంటే కుదరదు. కానీ మీరు <strong><code>extern int score;</code></strong> అని రాస్తే, కంపైలర్ కి "బాసు, ఈ వేరియబుల్ ఎక్కడో వేరే ఫైల్ లో ఉంది, నన్ను వాడనివ్వు" అని పర్మిషన్ అడిగినట్టు!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Multi-file Simulation)</div>
    <div class="section-body">
      <p class="text-prose">
        (ఈ క్రింది ఉదాహరణలో మూడు ఫైల్స్ ఉంటాయి. వాటిని కంపైల్ చేసేటప్పుడు <code>gcc main.c math_utils.c -o myapp</code> అని కలిపి కంపైల్ చేయాలి.)
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Header Files (.h)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>/* --------------------------------------
   1. math_utils.h (Header File)
-------------------------------------- */
// Header Guard: ఇవి డూప్లికేట్స్ ని ఆపుతాయి
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

// కస్టమ్ మ్యాక్రోస్
#define MAX_POWER 100

// ఫంక్షన్ డిక్లరేషన్ (కానీ లోపల కోడ్ ఉండదు)
int multiply(int a, int b);
int getSquare(int n);

#endif


/* --------------------------------------
   2. math_utils.c (Source File)
-------------------------------------- */
#include "math_utils.h" // స్వంత హెడర్ కాబట్టి డబుల్ కోట్స్ ""

// ఫంక్షన్స్ ఇక్కడ అమలు చేయబడతాయి (Implementation)
int multiply(int a, int b) {
    return a * b;
}

int getSquare(int n) {
    return multiply(n, n);
}


/* --------------------------------------
   3. main.c (Main Application)
-------------------------------------- */
#include &lt;stdio.h&gt;
#include "math_utils.h" // కిచెన్ మెనూ ని ఇక్కడ అడుగుతున్నాం

int main() {
    printf("--- Multi-File Calculator ---\\n");
    
    int result = getSquare(12); // వేరే ఫైల్ లో ఉన్న ఫంక్షన్ కాల్
    
    printf("Square of 12 is: %d\\n", result);
    printf("Max Power Allowed: %d\\n", MAX_POWER);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#ifndef MATH_UTILS_H</code>: కంపైలర్ ఫస్ట్ టైమ్ ఈ ఫైల్ ని చూసినప్పుడు ఈ పేరు (Macro) డిఫైన్ కాలేదు కాబట్టి, లోపలికి వెళ్లి డిఫైన్ (<code>#define</code>) చేస్తుంది. సెకండ్ టైమ్ ఎవరైనా మళ్ళీ పిలిస్తే, ఆల్రెడీ డిఫైన్ అయ్యింది కదా అని లోపల ఉన్న కోడ్ ని మొత్తం ఇగ్నోర్ చేస్తుంది.</li>
        <li><code>#include "math_utils.h"</code>: మీరు C లైబ్రరీస్ అయితే <code>&lt; &gt;</code> వాడాలి (అవి సిస్టమ్ ఫోల్డర్స్ లో ఉంటాయి). కానీ మీరు రాసిన ఫైల్ అయితే <code>" "</code> వాడాలి. అప్పుడే కంపైలర్ అదే ఫోల్డర్ లో వెతుకుతుంది.</li>
        <li><code>gcc main.c math_utils.c</code>: మీరు రెండు <code>.c</code> ఫైల్స్ ని కలిపి కంపైలర్ కి ఇవ్వాలి. అప్పుడు కంపైలర్ రెంటినీ కలిపి లింక్ చేసి ఒకే <code>.exe</code> ఫైల్ ని ఇస్తుంది. దీన్నే <strong>Linking Process (లింకింగ్)</strong> అంటారు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>#pragma once</code> కి మరియు <code>#ifndef</code> కి తేడా ఏంటి?</h4>
          <p>చాలా మోడరన్ కంపైలర్స్ లో ఆ మూడు లైన్ల ifndef లాజిక్ రాయకుండా టాప్ లో సింపుల్ గా <code>#pragma once</code> అని రాస్తారు. ఇది కూడా హెడర్ గార్డ్ లాగానే పనిచేస్తుంది. కానీ ఇది కొన్ని పాత (1990ల) కంపైలర్స్ లో పని చేయదు, అందుకే ఇండస్ట్రీలో అందరూ <code>#ifndef</code> వాడటానికే ప్రిఫర్ చేస్తారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: .h ఫైల్ లో ఫంక్షన్ కోడ్ రాస్తే ఏమవుతుంది?</h4>
          <p>మీరు .h లో డైరెక్ట్ గా కోడ్ (ఉదా: <code>printf</code> తో పాటు) రాసేస్తే, ఆ ఫైల్ ని ఎవరెవరు ఇంక్లూడ్ చేసుకుంటారో వాళ్ళందరికీ ఆ కోడ్ పేస్ట్ అవుతుంది. అప్పుడు ఫంక్షన్ చాలాసార్లు కాపీ అయ్యి <em>"Multiple Definition of function"</em> అనే పెద్ద ఎర్రర్ వచ్చి లింకింగ్ ఫెయిల్ అవుతుంది. అందుకే హెడర్ లో కేవలం ఇండెక్స్ (పేర్లు) మాత్రమే ఉండాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>static</code> ఫంక్షన్స్ అంటే ఏంటి?</h4>
          <p>మీరు ఒక వేరియబుల్ ముందు గాని లేదా ఫంక్షన్ ముందు గాని <code>static int score;</code> అని రాస్తే, ఆ ఫైల్ లో ఉన్న వాళ్ళు తప్ప బయట ఏ ఫైల్ వాళ్ళు (extern వాడినా కూడా) దాన్ని యాక్సెస్ చేయలేరు. ఇది పబ్లిక్ నుండి ప్రైవేట్ కి మార్చడానికి వాడే బెస్ట్ సెక్యూరిటీ ట్రిక్ (Encapsulation in C).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 40, "Phase 14", "File I/O & Preprocessor", subtopics, contentBody, '39-c-preprocessor-macros-define-and-conditional-compilation.html', '39. C Preprocessor & Macros', '41-c-double-pointers-and-memory-addresses.html', '41. Double Pointers (**)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson41() {
  const title = "Double Pointers (**) & Memory Addresses (తెలుగులో)";
  const desc = "C లో పాయింటర్స్ కీ పాయింటర్ అంటే ఏంటి? డబుల్ పాయింటర్ (**) ఎందుకు వాడాలి? ఒక ఫంక్షన్ ద్వారా పాయింటర్ అడ్రస్ ని ఎలా మార్చాలో యానిమేటెడ్ రియల్ లైఫ్ ఉదాహరణలతో డీప్ గా తెలుసుకుందాం.";
  const filename = "41-c-double-pointers-and-memory-addresses.html";
  const subtopics = "Double Pointers (**) · Pointer to Pointer · Changing Pointers in Functions · Dynamic 2D Arrays";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక వేరియబుల్ ఎక్కడుందో చెప్పేది పాయింటర్ (Pointer). మరి ఆ పాయింటర్ ఎక్కడుందో చెప్పేదే <strong>Double Pointer (డబుల్ పాయింటర్ <code>**</code>)</strong>! వినడానికి కొంచెం బ్రెయిన్ ఫ్రీజ్ లాగా అనిపిస్తుంది కానీ, రియల్ ప్రాజెక్ట్స్ లో ఒక ఫంక్షన్ కి మీ పాయింటర్ ని పాస్ చేసి, అందులో ఉన్న అడ్రస్ ని మార్చాలంటే దీనివల్లనే సాధ్యం. డేటా స్ట్రక్చర్స్ లో (Linked Lists లో నోడ్స్ డిలీట్ చేసేటప్పుడు) ఇది చాలా కీలకం. ఈరోజు డబుల్ పాయింటర్స్ వెనక ఉన్న మ్యాజిక్ ఏంటో పోస్ట్‌మార్టం చేద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> పాయింటర్ టు పాయింటర్ (Inception)</div>
    <div class="section-body">
      <p class="text-prose">
        సింపుల్ గా చెప్పాలంటే ఇది ఒక ట్రెజర్ హంట్ (Treasure Hunt) లాంటిది! మీరు ఒక బాక్స్ (<code>**ptr2</code>) ఓపెన్ చేస్తే అందులో ఇంకో బాక్స్ అడ్రస్ (<code>*ptr1</code>) ఉంటుంది, దాన్ని ఓపెన్ చేస్తే అసలు డేటా (<code>data</code>) దొరుకుతుంది.
      </p>
      
      <div class="deep-dive-card">
        <h3>📦 రియల్ లైఫ్ స్టోరీ: లాకర్ కి తాళం (The Double Lock)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక బ్యాంకు లో డబ్బు దాచారు (ఇదే ఒరిజినల్ వేరియబుల్ <code>a=100</code>). ఆ డబ్బు ఒక లాకర్ లో (Locker 501) ఉంది.<br><br>
          ఆ లాకర్ తాళం మీ ఫ్రెండ్ చేతిలో ఉంది (ఇదే సింగిల్ పాయింటర్ <code>int *ptr = &amp;a;</code>). ఇప్పుడు మీ ఫ్రెండ్ ఎక్కడున్నాడు? అతను ఇంకో రూమ్ లో (Room 902) కూర్చున్నాడు. మీరు మీ బాస్ కి "ఆ రూమ్ 902 కి వెళ్ళు, అక్కడ మా ఫ్రెండ్ ఉన్నాడు, వాడి దగ్గర లాకర్ కీ ఉంది, అందులో నా డబ్బు ఉంది" అని చెప్తారు (ఇదే డబుల్ పాయింటర్ <code>int **boss = &amp;ptr;</code>).<br><br>
          అంటే బాస్ డైరెక్ట్ గా డబ్బు దగ్గరికి వెళ్లలేడు, ముందు కీ (పాయింటర్) ఉన్నోడి దగ్గరికి వెళ్లి, వాడి ద్వారా డబ్బు తెచ్చుకుంటాడు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఫంక్షన్స్ లో అడ్రస్ మార్చడం (Pass by Reference for Pointers)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక ఫంక్షన్ కి నార్మల్ వేరియబుల్ ని పాస్ చేసి దాన్ని మార్చాలంటే అడ్రస్ (<code>&amp;a</code>) ని పాస్ చేస్తారు కదా! అదే విధంగా, ఒక ఫంక్షన్ కి <strong>పాయింటర్ ని పాస్ చేసి, ఆ పాయింటర్ నే మార్చాలంటే</strong> మీరు దాని అడ్రస్ ని (అంటే డబుల్ పాయింటర్ ని) పాస్ చేయాలి. 
      </p>
      <p class="text-prose">
        మెమరీని ఆన్ ది స్పాట్ లో (malloc) క్రియేట్ చేసి పంపే ఫంక్షన్స్ కి ఇవి చాలా చాలా అవసరం!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Pointer of Pointer Magic)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో డబుల్ పాయింటర్ వాడి, మూడు అంచెల్లో ఒక వాల్యూని ఎలా మార్చామో (Dereferencing) క్లియర్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Double Pointers (**)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఫంక్షన్ పాయింటర్ ని మారుస్తుంది (డబుల్ పాయింటర్ వాడి)
void changePointer(int **doublePtr, int *newAddress) {
    // లోపల ఉన్న సింగిల్ పాయింటర్ కి కొత్త అడ్రస్ ని ఇస్తున్నాం
    *doublePtr = newAddress;
}

int main() {
    int x = 10;
    int y = 99;
    
    // సింగిల్ పాయింటర్ (x ని పాయింట్ చేస్తుంది)
    int *ptr = &x;
    
    printf("--- Before Function Call ---\\n");
    printf("ptr points to value: %d\\n", *ptr); // అవుట్పుట్: 10
    
    // ఇప్పుడు ptr అనే పాయింటర్ అడ్రస్ నే మార్చేద్దాం!
    // ptr అడ్రస్ ని పంపుతున్నాం కాబట్టి ఫంక్షన్ కి (**) కావాలి
    changePointer(&ptr, &y);
    
    printf("\\n--- After Function Call ---\\n");
    printf("ptr now points to value: %d\\n", *ptr); // అవుట్పుట్: 99
    
    // అసలు డబుల్ పాయింటర్ వాల్యూని డైరెక్ట్ గా ప్రింట్ చేస్తే...
    int **dp = &ptr;
    printf("\\nUsing Double Pointer: **dp = %d\\n", **dp); // అవుట్పుట్: 99
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>int *ptr = &amp;x;</code>: ఇది నార్మల్. <code>x</code> ఉన్న మెమరీ లొకేషన్ ని <code>ptr</code> పట్టుకుంది.</li>
        <li><code>changePointer(&amp;ptr, &amp;y);</code>: మనం <code>ptr</code> యొక్క సొంత మెమరీ అడ్రస్ ని పంపుతున్నాం! అంటే ఆ బాక్స్ లోపలికి వెళ్లి దాన్ని చెరిపేసి కొత్తగా <code>y</code> అడ్రస్ ని పేస్ట్ చేయమని పర్మిషన్ ఇచ్చాం.</li>
        <li><code>**dp</code> (డబుల్ డీ-రిఫరెన్స్): స్టార్ స్టార్ (<code>**</code>) వాడితే, కంపైలర్ ఫస్ట్ టైమ్ ఒక జంప్ చేసి పాయింటర్ దగ్గరికి వెళ్తుంది, మళ్ళీ ఇంకో స్టార్ కి ఇంకో జంప్ చేసి అసలు వాల్యూ (99) దగ్గరికి వెళ్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>***ptr</code> (ట్రిపుల్ పాయింటర్) వాడొచ్చా? ఇది వాలిడ్ ఏనా?</h4>
          <p>సింటాక్స్ పరంగా మీరు ఎన్ని స్టార్స్ అయినా పెట్టుకోవచ్చు (<code>****ptr</code>). కానీ రియల్ వరల్డ్ లో డబుల్ పాయింటర్ (<code>**</code>) కి మించి వెళ్తే అది "Bad Design" కింద లెక్క. ఎందుకంటే బ్రెయిన్ కన్ఫ్యూజ్ అయ్యి బగ్స్ వస్తాయి. ట్రిపుల్ పాయింటర్స్ ని చాలా అరుదుగా, మల్టీ-డైమెన్షనల్ స్ట్రింగ్ అర్రేస్ (3D arrays) కోసం మాత్రమే వాడుతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Dynamic 2D Arrays లో డబుల్ పాయింటర్స్ ఎందుకు వాడతారు?</h4>
          <p>మీకు ఒక మ్యాట్రిక్స్ (రోస్ & కాలమ్స్) హీప్ లో కావాలంటే, ముందుగా రోస్ అడ్రస్ లు పెట్టుకోవడానికి ఒక <code>malloc</code> కావాలి (ఇదే <code>int **</code>). ఆ తర్వాత ప్రతి రో లో కాలమ్స్ కోసం మళ్ళీ లూప్ లోపల ఇంకో <code>malloc</code> వాడాలి (ఇవి సింగిల్ <code>int *</code>). ఇండస్ట్రీలో 2D అర్రేస్ ని ఇలాగే తయారు చేస్తారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: జావా, పైథాన్ లాంటి లాంగ్వేజెస్ లో ఈ డబుల్ పాయింటర్స్ ఉంటాయా?</h4>
          <p>ఉండవు! జావా లో పాయింటర్స్ నే పూర్తిగా తీసేశారు, అంతా రిఫరెన్సెస్ (References) ద్వారా ఆటోమేటిక్ గా జరుగుతుంది. అందుకే జావా నేర్చుకోవడం చాలా ఈజీ అంటారు. కానీ మెమరీ మీద ఫుల్ కంట్రోల్ ఉండదు. సి లాంగ్వేజ్ లో పాయింటర్స్ వల్లే అది హార్డ్వేర్ కి కింగ్ అయింది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 41, "Phase 15", "Advanced Pointers", subtopics, contentBody, '40-c-header-files-h-and-multi-file-projects.html', '40. Header Files & Projects', '42-c-function-pointers-and-callbacks.html', '42. Function Pointers & Callbacks');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson42() {
  const title = "Function Pointers & Callbacks (తెలుగులో)";
  const desc = "C లో Function Pointers అంటే ఏంటి? ఒక ఫంక్షన్ అడ్రస్ ని వేరే ఫంక్షన్ కి ఆర్గ్యుమెంట్ లాగా (Callback) ఎలా పాస్ చేయాలి? ఇండస్ట్రీలో ప్లగిన్స్ (Plugins) ని ఈ కాన్సెప్ట్ తోనే ఎలా డిజైన్ చేస్తారో డీప్ గా తెలుసుకుందాం.";
  const filename = "42-c-function-pointers-and-callbacks.html";
  const subtopics = "Function Pointers Syntax · Callbacks · Array of Functions · Plugins Architecture";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటిదాకా పాయింటర్స్ అంటే కేవలం డేటా (int, char, struct) ని మాత్రమే పాయింట్ చేస్తాయి అనుకున్నాం. కానీ మీ ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు, మీరు రాసిన ఫంక్షన్ కోడ్ అంతా (Instructions) కూడా RAM లో ఒక చోట స్టోర్ అవుతుంది. అంటే <strong>ఒక ఫంక్షన్ కి కూడా అడ్రస్ ఉంటుంది!</strong> ఆ అడ్రస్ ని పట్టుకునే స్పెషల్ పాయింటర్ నే <strong>Function Pointer (ఫంక్షన్ పాయింటర్)</strong> అంటారు. దీనివల్ల ఒక ఫంక్షన్ ని ఇంకో ఫంక్షన్ కి వేరియబుల్ లాగా పాస్ చేయొచ్చు. దీన్నే <em>Callbacks</em> అంటారు. ఈ కాన్సెప్ట్ వల్లే జావాస్క్రిప్ట్, C++ పుట్టాయి! ఇదేంటో డీప్ గా పోస్ట్‌మార్టం చేద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ఫంక్షన్ పాయింటర్ సింటాక్స్ (కొంచెం భయపెడుతుంది!)</div>
    <div class="section-body">
      <p class="text-prose">
        సింటాక్స్ చూడటానికి కొంచెం గందరగోళంగా ఉంటుంది: <code>రిటర్న్_టైప్ (*పాయింటర్_పేరు) (ఆర్గుమెంట్స్);</code>
      </p>
      <p class="text-prose">
        ఉదాహరణకు: <code>int (*mathOp)(int, int);</code><br>
        ఇది <code>mathOp</code> అనే పాయింటర్. ఇది ఏ ఫంక్షన్ నైనా పాయింట్ చేయగలదు, కానీ ఆ ఫంక్షన్ కచ్చితంగా రెండు ఇంటీజర్స్ తీసుకుని, ఒక ఇంటీజర్ ని రిటర్న్ చేయాలి.
      </p>

      <div class="deep-dive-card">
        <h3>🎮 రియల్ లైఫ్ స్టోరీ: స్విగ్గీ డెలివరీ & కాల్‌బ్యాక్స్ (Callbacks)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు స్విగ్గీ లో బిర్యాని ఆర్డర్ చేసారు (ఇదే మెయిన్ ఫంక్షన్). కానీ ఆర్డర్ రాగానే మీకు ఎలా తెలుస్తుంది? మీరు ఒక ఫోన్ నంబర్ ఇచ్చి "డెలివరీ అయ్యాక ఈ నంబర్ కి కాల్ చెయ్ బాసు" అని చెప్తారు (ఇదే మీ <strong>Callback Function</strong>).<br><br>
          అంటే స్విగ్గీ వాడికి ముందుగానే మీరేం చేస్తారో తెలీదు. ఆర్డర్ అవ్వగానే, మీరు ఇచ్చిన నంబర్ కి డైల్ చేస్తాడు (Calling the Pointer). ప్రోగ్రామింగ్ లో కూడా ఒక ఆపరేషన్ పూర్తయ్యాక, వేరే ఏదైనా లాజిక్ రన్ చేయాలంటే, ఆ సెకండ్ లాజిక్ తాలూకు అడ్రస్ ని ఫస్ట్ దానికి ఆర్గ్యుమెంట్ లాగా పంపుతారు. ఆపరేటింగ్ సిస్టమ్స్ లో బటన్ క్లిక్స్ (Events) అన్నీ ఇలానే పనిచేస్తాయి!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఫంక్షన్స్ యొక్క అర్రే (Array of Functions)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక క్యాలిక్యులేటర్ తయారు చేస్తున్నారు. అందులో +, -, *, / అని 4 ఆప్షన్స్ ఉన్నాయి. <code>switch case</code> రాసి 100 లైన్స్ రాసేబదులు, ఆ నాలుగు ఫంక్షన్స్ ని ఒక అర్రే లో పెట్టి <code>operations[choice](10, 5)</code> అని సింగిల్ లైన్ లో పని కానించేయొచ్చు! ఇది ఇండస్ట్రీలో వాడే సూపర్ ప్రొఫెషనల్ ట్రిక్.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Callbacks in Action)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో రెండు వేరు వేరు ఫంక్షన్స్ ని, ఒకే ఫంక్షన్ పాయింటర్ వాడి ఎలా కాల్ చేసామో, దాన్ని ఇంకో ఫంక్షన్ కి ఎలా పంపామో క్లియర్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Function Pointers & Callbacks</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. రెండు సింపుల్ ఫంక్షన్స్ (రెండూ ఒకే సిగ్నేచర్ తో ఉన్నాయి)
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

// 2. ఒక ఫంక్షన్ ఇంకో ఫంక్షన్ ని ఆర్గ్యుమెంట్ గా తీసుకుంటుంది (Callback)
// లోపల ఆ పాయింటర్ ని (operation) అని పిలుస్తున్నాం
void executeTask(int x, int y, int (*operation)(int, int)) {
    printf("Processing Data...\\n");
    // పాయింటర్ వాడి ఆ ఫంక్షన్ ని కాల్ చేస్తున్నాం!
    int result = operation(x, y); 
    printf("Result is: %d\\n\\n", result);
}

int main() {
    printf("--- Function Pointers Demo ---\\n");
    
    // డైరెక్ట్ గా పాయింటర్ క్రియేట్ చేయడం
    int (*ptr)(int, int) = add; 
    
    // పాయింటర్ ద్వారా యాడ్ ని పిలవడం
    printf("Direct Pointer Call: %d\\n\\n", ptr(10, 20)); // అవుట్పుట్: 30
    
    // ఇప్పుడు అసలు మ్యాజిక్: పాయింటర్స్ ని పాస్ చేయడం (Callbacks)
    printf("Passing 'add' function:\\n");
    executeTask(5, 5, add); // పేరే అడ్రస్! బ్రాకెట్స్ పెట్టకూడదు
    
    printf("Passing 'multiply' function:\\n");
    executeTask(5, 5, multiply); 
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>int (*ptr)(int, int) = add;</code>: C లాంగ్వేజ్ లో ఫంక్షన్ పేరు (పక్కన బ్రాకెట్లు లేకుండా రాస్తే) అది కచ్చితంగా ఆ ఫంక్షన్ ఉన్న మెమరీ అడ్రస్ నే ఇస్తుంది. (అర్రే పేరు లాగానే!). అందుకే డైరెక్ట్ గా <code>= add</code> అని రాసాము.</li>
        <li><code>executeTask(5, 5, add)</code>: ఫంక్షన్ ని పాస్ చేస్తున్నాము. లోపల అది ఏ లాజిక్ రన్ చేయాలో ముందుగానే ఫిక్స్ చేయలేదు. మనం పాస్ చేసిన దాన్ని బట్టి డైనమిక్ గా మారిపోతుంది. దీన్నే <strong>Polymorphism (పాలిమార్ఫిజం)</strong> లాంటిది అని చెప్పొచ్చు.</li>
        <li><code>operation(x, y)</code>: మన దగ్గర ఉన్నది జస్ట్ అడ్రస్. దానికి పక్కన బ్రాకెట్స్ పెడితే, అది ఆ అడ్రస్ లో ఉన్న కోడ్ ని రన్ చేసి రిజల్ట్ ఇస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఫంక్షన్ పాయింటర్ ని <code>qsort()</code> లాంటి ఇన్-బిల్ట్ ఫంక్షన్స్ కి ఎలా వాడతారు?</h4>
          <p>చాలా ఇంపార్టెంట్ ప్రశ్న! C లో <code>qsort</code> కి మీరు ఒక అర్రే ని ఇస్తే అది సార్ట్ చేస్తుంది. కానీ ఆ నంబర్స్ ని అసెండింగ్ లో చేయాలా, డిసెండింగ్ లో చేయాలా అని దానికి తెలీదు. అందుకే మీరు ఒక <code>compare()</code> అనే ఫంక్షన్ రాసి దాన్ని <code>qsort</code> కి ఆర్గ్యుమెంట్ లాగా (Callback) పాస్ చేస్తారు. అప్పుడు అది మీ లాజిక్ వాడి సార్ట్ చేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ప్లగిన్స్ (Plugins) ని ఫంక్షన్ పాయింటర్స్ తో ఎలా రాస్తారు?</h4>
          <p>ఒక మీడియా ప్లేయర్ (VLC) ఉంది. దానికి రేపు ఎవరైనా కొత్త MP4 కొడెక్ (Codec) రాస్తే, ఆ ఫైల్స్ ని (DLL/SO) లోడ్ చేసి, అందులో ఉన్న ఫంక్షన్స్ అడ్రస్ లని ఫంక్షన్ పాయింటర్స్ తో పట్టుకుని రన్ చేస్తారు. అంటే అసలు యాప్ కోడ్ ని మార్చకుండానే కొత్త ఫీచర్స్ డైనమిక్ గా ఇంజెక్ట్ చేయొచ్చు. ఇదే ప్లగిన్ ఆర్కిటెక్చర్ బేసిక్ సీక్రెట్!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>typedef</code> వాడి ఫంక్షన్ పాయింటర్ సింటాక్స్ ని సింపుల్ చేయొచ్చా?</h4>
          <p>ఖచ్చితంగా! ప్రతిసారి అంత పెద్ద సింటాక్స్ రాయడం కష్టం కాబట్టి, <code>typedef int (*MathFunc)(int, int);</code> అని పైన రాసుకుంటే... ఇకపై కింద సింపుల్ గా <code>MathFunc ptr = add;</code> అని నార్మల్ వేరియబుల్ లాగా చాలా నీట్ గా వాడుకోవచ్చు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 42, "Phase 15", "Advanced Pointers", subtopics, contentBody, '41-c-double-pointers-and-memory-addresses.html', '41. Double Pointers (**)', '43-c-void-pointers-and-generic-programming.html', '43. Void Pointers');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}


function run() {
  buildLesson38();
  buildLesson39();
  buildLesson40();
  buildLesson41();
  buildLesson42();
  console.log("✅ Generated C Lessons 38 to 42 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
