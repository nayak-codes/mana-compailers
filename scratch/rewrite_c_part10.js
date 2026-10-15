const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');
const existingScript = fs.readFileSync(path.join(__dirname, 'build_c_phase11_12_massive.js'), 'utf8');

const curriculumMatch = existingScript.match(/const C_CURRICULUM = (\[[\s\S]*?\]);\n\nfunction generateCAccordionSidebar/);
let C_CURRICULUM;
if (curriculumMatch) {
    C_CURRICULUM = eval(curriculumMatch[1]);
}

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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-c/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-c/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  <style>
    .prose-paragraph {
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      line-height: 1.9;
      color: var(--text);
      margin-bottom: 20px;
      text-align: justify;
    }
    .prose-highlight {
      color: #10b981;
      font-weight: 600;
    }
    .story-box {
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border-radius: 12px;
      padding: 24px;
      border-left: 5px solid #3b82f6;
      margin: 30px 0;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .story-box-title {
      font-family: 'Sora', sans-serif;
      font-size: 18px;
      color: #60a5fa;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
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
      border-left: 4px solid #f59e0b;
      border-radius: 8px;
      padding: 20px 22px;
    }
    .faq-item h4 {
      color: var(--text);
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .faq-item p {
      color: var(--text2);
      font-size: 15px;
      line-height: 1.8;
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
  <aside class="sidebar">
    <div class="sidebar-heading">C Master Course</div>
    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>
${accordionSidebar}
    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/?lang=c" style="color:#10b981; font-weight:700;">▶ Try C Online Compiler</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>
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

// 24
function buildLesson24() {
  const title = "Passing Addresses, Swapping & Returning Pointers (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Call by Value మరియు Call by Reference కి ఉన్న తేడా ఏంటి? ఒక ఫంక్షన్ లో మార్చిన వాల్యూ ఇంకో ఫంక్షన్ కి ఎలా చేరాలో రియల్ లైఫ్ ఉదాహరణలతో నేర్చుకుందాం.";
  const filename = "24-c-pointers-and-functions-call-by-reference.html";
  const subtopics = "Pass-by-Value vs Pass-by-Address · Swapping Logic · Returning Pointers";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక ఫంక్షన్ నుండి ఇంకో ఫంక్షన్ కి డేటా పంపించినప్పుడు, అసలు ఒరిజినల్ డేటా పంపుతున్నామా లేక కేవలం కాపీ (జిరాక్స్) పంపుతున్నామా అనేది చాలా ముఖ్యం. మనం ఏమైనా మార్పులు చేస్తే అవి ఒరిజినల్ డేటా కి అప్లై అవ్వాలంటే <strong>Call by Reference (పాస్ బై అడ్రస్)</strong> వాడాలి. ఈ పాఠంలో ఈ కాన్సెప్ట్ ని చాలా డీప్ గా అర్థం చేసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Call by Value vs Call by Reference</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మామూలుగా డేటా పంపిస్తే దాన్ని Call by Value అంటారు. ఇందులో ఒరిజినల్ డేటాకి ఎలాంటి నష్టం జరగదు, కేవలం కాపీ మాత్రమే వెళ్తుంది. కానీ అడ్రస్ పంపిస్తే దాన్ని Call by Reference అంటారు, అప్పుడు కాపీ వెళ్లదు, డైరెక్ట్ గా ఒరిజినల్ డేటా నే ఎడిట్ చేయొచ్చు.
      </p>

      <div class="story-box">
        <div class="story-box-title">📑 రియల్ లైఫ్ స్టోరీ: హోంవర్క్ నోట్స్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీ ఫ్రెండ్ మీ హోంవర్క్ నోట్స్ అడిగాడు. <br><br>
          <strong>Call by Value:</strong> మీరు ఒక జిరాక్స్ (Copy) తీసి వాడికి ఇచ్చారు. వాడు అందులో ఏమైనా గీతలు గీసినా మీ ఒరిజినల్ నోట్స్ కి ఏమీ కాదు. ఇది చాలా సేఫ్. <br>
          <strong>Call by Reference:</strong> మీరు మీ ఒరిజినల్ నోట్స్ (Address) వాడికి ఇచ్చేసారు. ఇప్పుడు వాడు అందులో ఒక పేజీ చించేస్తే... మీ ఒరిజినల్ నోట్స్ లో కూడా ఆ పేజీ పోయినట్టే! కదా? C లాంగ్వేజ్ లో పాయింటర్స్ పంపించడం కూడా సేమ్ టూ సేమ్ ఇదే!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Swapping)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం ఇద్దరు వ్యక్తుల వయసు మార్చడానికి (Swap) వాళ్ళ ఒరిజినల్ అడ్రస్ లను పంపుతున్నాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pass by Reference</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఇక్కడ అడ్రస్ లు (Pointers) తీసుకుంటున్నాం
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;
    
    // జిరాక్స్ కాకుండా డైరెక్ట్ అడ్రస్ పంపుతున్నాం (&)
    swap(&x, &y);
    
    printf("X: %d, Y: %d\\n", x, y); // x=20, y=10 వస్తుంది!
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఒక ఫంక్షన్ నుండి పాయింటర్ రిటర్న్ చేయొచ్చా?</h4>
          <p>చేయొచ్చు. కానీ గుర్తుపెట్టుకోండి, లోకల్ వేరియబుల్స్ యొక్క పాయింటర్ రిటర్న్ చేయకూడదు! ఫంక్షన్ అవ్వగానే లోకల్ వేరియబుల్స్ చనిపోతాయి కాబట్టి, వాటి అడ్రస్ పంపితే అది 'Dangling Pointer' అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: C లో నిజంగా "Call by Reference" ఉందా?</h4>
          <p>టెక్నికల్ గా మాట్లాడితే C లో ఎప్పుడూ కాపీ మాత్రమే జరుగుతుంది (Call by Value). మనం అడ్రస్ పంపినప్పుడు, ఆ అడ్రస్ కూడా జిరాక్స్ అయ్యే వెళ్తుంది! దాన్ని C++ లో లాగా అఫీషియల్ 'Reference' అని అనలేం, కాకపోతే వాడుక భాషలో అలా పిలుస్తాం.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 24, "Phase 10", "Pointers and Functions", subtopics, contentBody, '23-c-double-pointers-function-pointers-and-safety.html', '23. Double Pointers & Function Pointers', '25-c-pointer-parameters-arrays-and-const-protection.html', '25. Array Pointer Parameters & const Safety');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 25
function buildLesson25() {
  const title = "Array Pointer Parameters & const Protection (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Arrays ని ఫంక్షన్స్ కి పంపించేటప్పుడు const వాడి మన డేటాని ఎలా కాపాడుకోవాలో (Protection) డీప్ గా నేర్చుకుందాం.";
  const filename = "25-c-pointer-parameters-arrays-and-const-protection.html";
  const subtopics = "Arrays as Parameters · const Protection · Read-Only Data";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు తెలుసుకున్నట్టు అర్రే ని ఫంక్షన్ కి పంపితే కేవలం బేస్ అడ్రస్ మాత్రమే వెళ్తుంది కదా. అంటే ఆ ఫంక్షన్ మన అర్రే లో ఉన్న డేటాని చాలా ఈజీగా మార్చేయగలదు! మరి అలాంటప్పుడు, "నువ్వు కేవలం చదువుకో అంతే, మార్చడానికి వీల్లేదు!" అని చెప్పడానికి C లాంగ్వేజ్ లో <strong>const</strong> కీవర్డ్ ని పాయింటర్స్ కి ముందు ఎలా వాడాలో చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> const తో ప్రొటెక్షన్ (Protection)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        సాధారణంగా ఒక పెద్ద అర్రే ని ఫంక్షన్ కి పంపినప్పుడు అది పొరపాటున డేటా మార్చేస్తే మన ఒరిజినల్ డేటా పాడైపోతుంది. ఇది జరగకుండా ఉండాలంటే పారామీటర్ ముందు <code>const</code> అని రాయాలి.
      </p>

      <div class="story-box">
        <div class="story-box-title">🛡️ రియల్ లైఫ్ స్టోరీ: మ్యూజియం లో పురాతన వస్తువులు</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఒక మ్యూజియం కి వెళ్లారు. అక్కడ 1000 ఏళ్ళ నాటి ఒక కత్తి ఉంది. వాళ్ళు దాన్ని అద్దాల పెట్టెలో పెట్టారు. <br><br>
          మీరు దాన్ని చూడగలరు (Read-only), కానీ టచ్ చేయలేరు, తీసుకెళ్లలేరు (Cannot Edit). <br>
          ప్రోగ్రామింగ్ లో ఈ <strong>"అద్దాల పెట్టె" నే <code>const</code> కీవర్డ్</strong>. పాయింటర్ ముందు <code>const</code> పెడితే ఎవరూ మీ డేటా ని ఎడిట్ చేయలేరు, పొరపాటున ఎడిట్ చేసే కోడ్ రాస్తే కంపైలర్ తిడుతుంది (Error).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (const Pointer)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో <code>const int *arr</code> అని రాసాము, కాబట్టి ఆ ఫంక్షన్ ఆ అర్రే లోని డేటాని కేవలం ప్రింట్ చేయగలదు తప్ప మార్చలేదు.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — const Pointer</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// const వాడాము కాబట్టి ఫంక్షన్ కి మార్చే హక్కు లేదు
void printArray(const int *arr, int size) {
    for (int i = 0; i < size; i++) {
        // ఇక్కడ అర్రే వాల్యూస్ ని కేవలం చదువుతున్నాం
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};
    printArray(nums, 5);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: <code>const int *ptr</code> కి మరియు <code>int *const ptr</code> కి తేడా ఏంటి?</h4>
          <p>చాలా పెద్ద తేడా ఉంది! మొదటి దాంట్లో (Pointer to const) డేటాని మార్చలేము కానీ పాయింటర్ ని వేరే అడ్రస్ కి జంప్ చేయించవచ్చు. రెండో దాంట్లో (const Pointer) పాయింటర్ జంప్ అవ్వలేదు కానీ అక్కడున్న డేటాని మార్చొచ్చు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: String Literals (ఉదా: "Hello") కి const ఎందుకు వాడాలి?</h4>
          <p>ఎందుకంటే String Literals అన్నీ కూడా కంపైలర్ ఒక Read-Only మెమరీ లో పెడుతుంది. వాటిని పాయింటర్ తో మార్చాలని ట్రై చేస్తే సెగ్మెంటేషన్ ఫాల్ట్ (క్రాష్) వస్తుంది. అందుకే <code>const char *s = "Hello";</code> అని రాయడం ఎప్పుడూ సేఫ్.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 25, "Phase 10", "Pointers and Functions", subtopics, contentBody, '24-c-pointers-and-functions-call-by-reference.html', '24. Passing Addresses & Returning Pointers', '26-c-function-pointers-callbacks-and-event-systems.html', '26. Function Pointers, Callbacks & Event Systems');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 26
function buildLesson26() {
  const title = "Function Pointers, Callbacks & Event Systems (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Function Pointers అంటే ఏమిటి? Callbacks అంటే ఏంటి? ఒక ఫంక్షన్ కే ఇంకో ఫంక్షన్ ని ఆర్గ్యూమెంట్ లా ఎలా పంపాలో డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "26-c-function-pointers-callbacks-and-event-systems.html";
  const subtopics = "Function Pointers · Callbacks · Event Driven Architecture";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటి వరకు మనం వేరియబుల్స్ కి (int, char) పాయింటర్స్ ఎలా రాయాలో చూసాం. మరి ఫంక్షన్స్ కూడా RAM లో ఎక్కడో ఒక దగ్గర స్టోర్ అయి ఉంటాయి కదా? అంటే ఫంక్షన్స్ కి కూడా అడ్రస్ ఉంటుంది కదా? అవును! ఫంక్షన్స్ యొక్క అడ్రస్ ని స్టోర్ చేసుకునే పాయింటర్ నే <strong>Function Pointer</strong> అంటారు. గేమ్స్ డెవలప్‌మెంట్ లో మరియు విండోస్ ఆపరేటింగ్ సిస్టమ్ లో బటన్స్ నొక్కినప్పుడు ఏం జరగాలి (Events) అని డిసైడ్ చేసేది ఇవే!</p>
    </div>

    <div class="section-title"><span class="num">1</span> Callbacks అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మనం ఒక ఫంక్షన్ కి నంబర్స్, స్ట్రింగ్స్ మాత్రమే కాకుండా ఇంకో ఫంక్షన్ యొక్క అడ్రస్ ని కూడా పంపొచ్చు. ఇలా పంపబడిన ఫంక్షన్ ని <strong>Callback Function</strong> అంటారు.
      </p>

      <div class="story-box">
        <div class="story-box-title">📞 రియల్ లైఫ్ స్టోరీ: కస్టమర్ కేర్ కాల్ బ్యాక్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఒక కస్టమర్ కేర్ కి కాల్ చేశారు, వాళ్ళు బిజీ గా ఉండి "మీ నంబర్ ఇస్తే, మా వాళ్ళు ఫ్రీ అయ్యాక మీకు మళ్ళీ ఫోన్ చేస్తారు (Call back)" అని చెప్పారు. మీరు మీ ఫోన్ నంబర్ వాళ్లకు ఇచ్చారు. <br><br>
          ఇక్కడ <strong>కస్టమర్ కేర్ వాళ్ళు = Main Function</strong>. <br>
          <strong>మీ ఫోన్ నంబర్ = Function Pointer (అడ్రస్)</strong>. <br>
          వాళ్ళు ఫ్రీ అవ్వగానే మీ నంబర్ ని డైల్ (Call) చేస్తారు. కోడ్ లో కూడా ఒక పని పూర్తవ్వగానే ఇంకో ఫంక్షన్ ని రన్ చేయడానికి వాడే కాన్సెప్టే Callbacks!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Function Pointer)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కొంచెం సింటాక్స్ (Syntax) వింతగా ఉంటుంది కానీ, కింద కోడ్ చూస్తే ఒక ఫంక్షన్ అడ్రస్ ని పాయింటర్ కి ఇచ్చి ఎలా కాల్ చేసామో క్లియర్ గా అర్థం అవుతుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Function Pointers</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

void say_hello() {
    printf("Hello User, Welcome!\\n");
}

int main(void) {
    // 1. ఇది ఫంక్షన్ పాయింటర్ క్రియేషన్
    void (*func_ptr)() = say_hello;
    
    // 2. పాయింటర్ వాడి ఫంక్షన్ ని కాల్ చేయడం!
    func_ptr();
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: <code>qsort()</code> ఫంక్షన్ లో Function Pointers ఎందుకు వాడుతారు?</h4>
          <p>C లో ముందుగానే ఉన్న <code>qsort()</code> (క్విక్ సార్ట్) కి మీరు డేటాని చిన్న నుండి పెద్దకు (Ascending) సార్ట్ చేయాలా లేక పెద్ద నుండి చిన్నకి (Descending) సార్ట్ చేయాలా అని చెప్పడానికి ఒక చిన్న కంపారిజన్ (Comparison) ఫంక్షన్ రాసి దాన్ని పాయింటర్ లా ఇస్తారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ఫంక్షన్ పేరు వాడినా అడ్రస్ వస్తుందా?</h4>
          <p>అవును. అర్రే లాగానే, ఫంక్షన్ పేరు వాడితే (బ్రాకెట్స్ లేకుండా) కంపైలర్ దాన్ని అడ్రస్ లాగానే ట్రీట్ చేస్తుంది. అందుకే పైన కోడ్ లో <code>&say_hello</code> బదులు డైరెక్ట్ గా <code>say_hello</code> అని ఇచ్చేయొచ్చు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 26, "Phase 10", "Pointers and Functions", subtopics, contentBody, '25-c-pointer-parameters-arrays-and-const-protection.html', '25. Array Pointer Parameters & const Safety', '27-c-structures-declaration-memory-model-and-padding.html', '27. Structures, RAM Memory Model & Padding Holes');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 27 (Overwriting previous one with MASSIVE text + ONE SHORT CODE)
function buildLesson27() {
  const title = "Structures, RAM Memory Model & Padding Holes (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Structures అంటే ఏమిటి? Memory Padding Holes అంటే ఏంటి? #pragma pack(1) ఎందుకు వాడాలి? రియల్ లైఫ్ ఉదాహరణలతో నేర్చుకుందాం.";
  const filename = "27-c-structures-declaration-memory-model-and-padding.html";
  const subtopics = "Struct ante enti? · Padding Holes · #pragma pack(1)";

  const contentBody = `
    <div class="intro-box">
      <p>ఒక స్టూడెంట్ రికార్డ్ తీసుకోవాలంటే.. పేరు (string), వయసు (int), మార్క్స్ (float) అన్నీ కలిపి ఒకేచోట ఉండాలి కదా? ఇలా వేర్వేరు టైప్స్ ని కలిపి ఒకే కొత్త డేటా టైప్ గా క్రియేట్ చేయడానికి వాడేదే <strong><code>struct</code></strong>. ఈ గైడ్ లో, స్ట్రక్చర్స్ లో డేటా ఎలా నిల్వ అవుతుంది, మరియు కంపైలర్ స్పీడ్ కోసం మనకు తెలియకుండానే మధ్యలో కొన్ని ఖాళీ బైట్స్ (Padding Holes) ని ఎందుకు వదిలేస్తుందో తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Memory Padding (మెమరీ ప్యాడింగ్) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఉదాహరణకు ఒక స్ట్రక్చర్ లో <code>char</code> (1 బైట్) మరియు <code>int</code> (4 బైట్స్) ఉన్నాయి అనుకోండి. మీరు దాని సైజు 5 బైట్స్ అనుకుంటారు కదా! కానీ సిస్టమ్ లో చూస్తే అది 8 బైట్స్ చూపిస్తుంది. ఆ ఎక్స్ట్రా 3 బైట్స్ ఎక్కడినుండి వచ్చాయి?
      </p>

      <div class="story-box">
        <div class="story-box-title">🛒 రియల్ లైఫ్ స్టోరీ: సూపర్ మార్కెట్ షెల్ఫ్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          సూపర్ మార్కెట్ లో అన్నీ ఒకే సైజు ఉన్న అల్మారాలు (Shelves) ఉంటాయి. ఒక అల్మారాలో 4 చిన్న బాటిల్స్ పడతాయి. <br><br>
          మీరు ఒక చిన్న సోప్, దాని తర్వాత ఒక పెద్ద వాటర్ బాటిల్ పెట్టాలి. సోప్ పెట్టిన తర్వాత వాటర్ బాటిల్ కి ప్లేస్ సరిపోకపోతే, ఆ అల్మారాలో మిగతా ప్లేస్ ని ఖాళీగా వదిలేసి... నెక్స్ట్ అల్మారాలో వాటర్ బాటిల్ పెడతారు. <br>
          కంప్యూటర్ ప్రాసెసర్ (CPU) కూడా ఫాస్ట్ గా చదవడానికి మెమరీ ని ఇలాగే అల్మారాలు (4-Byte Words) గా విడగొడుతుంది. ఆ ఖాళీగా వదిలేసిన ప్లేస్ నే <strong>Padding Holes (ప్యాడింగ్ హోల్స్)</strong> అంటారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Padding ఎలా ఆపాలి?)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఈ మెమరీ వేస్టేజ్ వద్దు అనుకుంటే, కంపైలర్ కి మనం స్పెషల్ ఆర్డర్ పాస్ చేయొచ్చు. అదే <code>#pragma pack(1)</code>. కింద కోడ్ లో దాని పవర్ చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — #pragma pack(1) Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఇది వేస్ట్ చేయకుండా టైట్ గా ప్యాక్ చేయమని చెప్తుంది
#pragma pack(1)

struct Packed {
    char a;  // 1 బైట్
    int b;   // 4 బైట్స్
};

int main(void) {
    // మామూలుగా అయితే 8 బైట్స్ వస్తుంది, ఇప్పుడు కరెక్ట్ గా 5 వస్తుంది!
    printf("Size is: %zu bytes\\n", sizeof(struct Packed));
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: <code>#pragma pack(1)</code> వాడుతుంటే అందరూ ఎందుకు వద్దంటారు?</h4>
          <p>మెమరీ వేస్ట్ అవ్వకుండా ఉంటుంది కానీ, CPU ఆ డేటాని చదవడానికి ఎక్కువ కష్టపడాల్సి వస్తుంది. దానివల్ల మీ ప్రోగ్రామ్ స్పీడ్ తగ్గిపోతుంది. అందుకే దీన్ని కేవలం హార్డ్ వేర్ కంట్రోలర్స్ లో, నెట్‌వర్క్ ప్యాకెట్స్ లో మాత్రమే వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ప్యాడింగ్ హోల్స్ లో ఏముంటుంది?</h4>
          <p>ఖాళీ ప్లేస్ లో ముందు నుండి సిస్టమ్ లో ఉన్న చెత్త (Garbage values) ఉంటుంది. అందుకే రెండు వేర్వేరు స్ట్రక్చర్స్ ని <code>memcmp()</code> వాడి కంపేర్ చేయకూడదు. ఆ చెత్త వాల్యూస్ మ్యాచ్ అవ్వక ఫెయిల్ అవుతుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 27, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '26-c-function-pointers-callbacks-and-event-systems.html', '26. Function Pointers, Callbacks & Event Systems', '28-c-structure-arrays-pointers-and-arrow-operator.html', '28. Structure Arrays, Pointers & Arrow Operator (->)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 28 (Overwriting previous one with MASSIVE text + ONE SHORT CODE)
function buildLesson28() {
  const title = "Structure Arrays, Pointers & Arrow Operator (->) (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో పాయింటర్స్ ని Structures తో ఎలా వాడాలి? డాట్ (.) బదులు ఆరో (->) ఆపరేటర్ ఎందుకు వాడాలో డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "28-c-structure-arrays-pointers-and-arrow-operator.html";
  const subtopics = "Structure Arrays · Nested Structures · Pointer to Struct & Arrow Operator (->)";

  const contentBody = `
    <div class="intro-box">
      <p>క్లాస్ లోని 100 మందికీ స్ట్రక్చర్ రాయాలంటే <strong>Structure Arrays</strong> వాడాలి. అలాగే ఒక ఎంప్లాయ్ అడ్రస్ కోసం స్ట్రక్చర్ లోపల ఇంకో స్ట్రక్చర్ రాయాల్సి ఉంటుంది (Nested Structures). అన్నిటికంటే ముఖ్యంగా, పెద్ద స్ట్రక్చర్స్ ని ఫంక్షన్స్ కి పంపించేటప్పుడు మామూలుగా పంపిస్తే మొత్తం కాపీ అవుతుంది, దానివల్ల టైం వేస్ట్! అందుకే పాయింటర్స్ వాడి పంపిస్తాం. అప్పుడు డాట్ (<code>.</code>) బదులు <strong>Arrow ఆపరేటర్ (<code>-&gt;</code>)</strong> వాడి ఆ డేటాని ఎలా చదవాలో ఈ గైడ్ లో తెలుగులో డీప్ గా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ఆరో (->) ఆపరేటర్ ఎందుకు వాడాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        సాధారణంగా స్ట్రక్చర్ లో ఉన్న డేటాని యాక్సెస్ చేయడానికి డాట్ (<code>.</code>) వాడతాం (ఉదా: <code>s1.name</code>). కానీ మీ దగ్గర ఉన్నది స్ట్రక్చర్ కాదు, ఆ స్ట్రక్చర్ యొక్క <strong>అడ్రస్ (పాయింటర్)</strong> అయినప్పుడు డాట్ పనిచేయదు!
      </p>

      <div class="story-box">
        <div class="story-box-title">🎯 రియల్ లైఫ్ స్టోరీ: టీవీ మరియు రిమోట్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          టీవీకి డైరెక్ట్ గా దగ్గరికి వెళ్లి ఛానల్ మార్చడాన్ని <strong>డాట్ (<code>.</code>) ఆపరేటర్</strong> అనొచ్చు. మీరు నేరుగా టచ్ చేస్తున్నారు. <br><br>
          కానీ మీరు సోఫాలో దూరంగా కూర్చున్నారు. మీ దగ్గర కేవలం <strong>రిమోట్ (Pointer)</strong> మాత్రమే ఉంది. ఇప్పుడు ఛానల్ మార్చాలంటే రిమోట్ నుండి ఒక లేజర్ కిరణం (Arrow) వెళ్ళాలి కదా! <br>
          ఈ రిమోట్ లాజిక్ లాగానే, పాయింటర్ ఉన్నప్పుడు డేటాని డైరెక్ట్ గా ముట్టుకోలేం కాబట్టి ఒక బాణం గుర్తు <strong>ఆరో (<code>-&gt;</code>)</strong> ని వాడుతాం.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Arrow Operator Demo)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో పాయింటర్ క్రియేట్ చేశాక మనం డాట్ కి బదులు ఆరో ఎలా వాడుతున్నామో చూడండి. ఇది చాలా క్లీన్ గా ఉంటుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Arrow Operator (->)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

struct Device {
    int battery;
};

int main(void) {
    struct Device mobile = {85};
    
    // మొబైల్ అడ్రస్ ని పాయింటర్ కి ఇస్తున్నాం
    struct Device *ptr = &mobile;
    
    // పాయింటర్ దగ్గర డాట్ బదులు యారో (->) వాడాలి
    printf("Battery is: %d%%\\n", ptr->battery);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: <code>(*ptr).battery</code> అని రాస్తే వర్క్ అవుతుందా?</h4>
          <p>అవుతుంది! నిజానికి <code>ptr->battery</code> అనేది దానికి షార్ట్ కట్ మాత్రమే. ముందు డోర్ తట్టి (<code>*</code>), తర్వాత డాట్ (<code>.</code>) వాడే ప్రాసెస్ కన్ఫ్యూజన్ లేకుండా ఉండటానికి C భాష లో డైరెక్ట్ గా <code>-></code> ని కనిపెట్టారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ఫంక్షన్స్ కి పెద్ద స్ట్రక్చర్స్ ని డైరెక్ట్ గా పంపవచ్చా?</h4>
          <p>పంపొచ్చు కానీ పంపకూడదు. ఒక స్ట్రక్చర్ 1000 బైట్స్ ఉందనుకోండి. దాన్ని మామూలుగా పంపితే సిస్టమ్ 1000 బైట్స్ ని జిరాక్స్ తీసి టైమ్ వేస్ట్ చేస్తుంది. అదే పాయింటర్ పంపితే కేవలం 8 బైట్స్ జిరాక్స్ అవుతుంది. స్పీడ్ పదింతలు పెరుగుతుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 28, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '27-c-structures-declaration-memory-model-and-padding.html', '27. Structures, RAM Memory Model & Padding Holes', '29-c-self-referential-structures-file-io-and-5-projects.html', '29. Self-Referential Structs, Binary I/O & Projects');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 29
function buildLesson29() {
  const title = "Self-Referential Structures & Linked Lists (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Self-Referential Structures అంటే ఏమిటి? ఒక స్ట్రక్చర్ లోపల అదే స్ట్రక్చర్ అడ్రస్ ఎందుకు పెట్టుకోవాలి? Linked Lists పునాది ఇక్కడే పడుతుంది!";
  const filename = "29-c-self-referential-structures-file-io-and-5-projects.html";
  const subtopics = "Self-Referential Structs · Nodes & Links · Data Structures Intro";

  const contentBody = `
    <div class="intro-box">
      <p>డేటా స్ట్రక్చర్స్ (Data Structures) అనగానే అందరికీ గుర్తొచ్చే మొదటి టాపిక్ <strong>Linked Lists (లింక్డ్ లిస్ట్స్)</strong>. అర్రేస్ లో ఉన్న అతిపెద్ద సమస్య ఏంటంటే, వాటి సైజు ముందే ఫిక్స్ చేయాలి, దాన్ని మార్చలేం. కానీ మనకు డేటా ఎప్పుడొస్తుందో తెలియనప్పుడు, ఒకదాని వెనకాల ఒకటి చైన్ (Chain) లాగా కలుపుకుంటూ పోవాల్సి వస్తుంది. అలా ఒకదాని గురించి ఇంకొక దానికి చెప్పడానికే మనకు <strong>Self-Referential Structures (సెల్ఫ్-రిఫరెన్షియల్ స్ట్రక్చర్స్)</strong> వాడుతారు. ఈ పాఠంలో ఆ బేసిక్స్ నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Self-Referential Structure అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక స్ట్రక్చర్ లోపల, డేటాతో పాటు... తన లాంటిదే ఉన్న ఇంకొక స్ట్రక్చర్ యొక్క అడ్రస్ (Pointer) కూడా ఉంటే, దాన్నే సెల్ఫ్-రిఫరెన్షియల్ స్ట్రక్చర్ అంటారు. 
      </p>

      <div class="story-box">
        <div class="story-box-title">🚂 రియల్ లైఫ్ స్టోరీ: ట్రైన్ బోగీల చైన్ లింక్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక ట్రైన్ బోగీలో జనాలు (Data) ఉంటారు. కానీ ఆ బోగీ వెనకాల ఇంకో బోగీని కలపడానికి ఒక పెద్ద ఇనుప చైన్ (Link / Pointer) ఉంటుంది కదా! <br><br>
          మొదటి బోగీ ఆ చైన్ సహాయంతో రెండో బోగీ ఎక్కడ ఉందో గుర్తుపట్టి లాక్కుంటూ వెళ్తుంది. రెండో బోగీ మూడో బోగీని లాగుతుంది. ఇలా ఒకదాని వెనక ఒకటి లింక్ అవుతాయి. <br>
          ప్రోగ్రామింగ్ లో ఈ చైన్ నే మనం <strong>Pointer to Next Node</strong> అని అంటాం. దీన్ని క్రియేట్ చేయడానికి స్ట్రక్చర్ లోపల అదే స్ట్రక్చర్ కి పాయింటర్ రాస్తాం.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Node Creation)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం ఒక బోగీ (Node) ని ఎలా క్రియేట్ చేయాలో చూద్దాం. దీనిలో డేటా తో పాటుగా <code>next</code> అనే చైన్ (పాయింటర్) కూడా ఉంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Self-Referential Struct</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఇది ఒక బోగీ (Node)
struct Node {
    int data;            // జనాలు (డేటా)
    struct Node *next;   // నెక్స్ట్ బోగీకి ఇనుప చైన్ (లింక్)
};

int main(void) {
    struct Node node1 = {100, NULL}; // ప్రస్తుతం దీనికి చైన్ లేదు కాబట్టి NULL
    
    printf("Node data is: %d\\n", node1.data);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: <code>next</code> లో NULL ఎందుకు పెడతారు?</h4>
          <p>NULL అంటే ఆ ఇనుప చైన్ దేనికీ కనెక్ట్ అయ్యి లేదు అని అర్థం. అంటే ఆ ట్రైన్ కి అదే లాస్ట్ బోగీ అని సిస్టమ్ కి అర్థమవుతుంది. ప్రతి Linked List చివర్లో కచ్చితంగా NULL ఉండాలి, లేకపోతే కంపైలర్ గాలిలో వెతుకుతూ క్రాష్ అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: స్ట్రక్చర్ లోపల పాయింటర్ కాకుండా డైరెక్ట్ గా స్ట్రక్చర్ రాయొచ్చా?</h4>
          <p>రాయకూడదు! ఒక స్ట్రక్చర్ లోపల అదే స్ట్రక్చర్ డైరెక్ట్ గా రాస్తే కంపైలర్ కి దాని సైజు ఎంత క్రియేట్ చేయాలో అర్థం కాక <strong>Infinite Loop</strong> లో ఇరుక్కుపోతుంది (చనిపోతుంది). పాయింటర్ అయితే సైజు ఎప్పుడూ 8 బైట్స్ కాబట్టి ప్రాబ్లెమ్ ఉండదు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 29, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '28-c-structure-arrays-pointers-and-arrow-operator.html', '28. Structure Arrays, Pointers & Arrow Operator (->)', '30-c-unions-shared-memory-and-variant-types.html', '30. Unions, Shared Memory & Variant Data Types');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson24();
  buildLesson25();
  buildLesson26();
  buildLesson27();
  buildLesson28();
  buildLesson29();
  console.log("✅ Generated Lessons 24 to 29 with Massive Text and ONLY ONE VERY SHORT Code Block!");
}
run();
