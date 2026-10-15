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

// ==========================================
// LESSON 12: Arrays Basics
// ==========================================
function buildLesson12() {
  const title = "Arrays Basics: Declaration, Memory & Traversal (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Arrays ఎందుకు అవసరం? ఒకే రకమైన డేటాని వందల కొద్దీ స్టోర్ చేయాలంటే ఒకే పేరుతో ఎలా స్టోర్ చేయాలి? మెమరీ లో అర్రేస్ ఎలా సేవ్ అవుతాయి? డీప్ గా తెలుసుకుందాం.";
  const filename = "12-c-arrays-declaration-memory-and-traversal.html";
  const subtopics = "Array అంటే ఏంటి? · Contiguous Memory ఆల్లోకేషన్ · Indexing (0-based) · Traversal (లూప్ వాడకం)";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలుగా మనం ఒక స్టూడెంట్ మార్కులు స్టోర్ చేయాలంటే <code>int marks1 = 80;</code> అని ఒక వేరియబుల్ తీసుకుంటాం. ఇద్దరివి అయితే <code>marks2 = 90;</code> అని ఇంకోటి తీసుకుంటాం. కానీ ఒకవేళ క్లాస్ లో 100 మంది స్టూడెంట్స్ ఉంటే? 100 వేరియబుల్స్ క్రియేట్ చేయడం అసాధ్యం కదా! ఇలా ఒకే రకమైన (Same Data Type) వందల కొద్దీ డేటాని ఒకే పేరుతో (Single Name) స్టోర్ చేసుకోవడానికి కనుగొన్న కాన్సెప్ట్ పేరే <strong>Array (అర్రే)</strong>. ఈ పాఠంలో Arrays అసలు RAM లో ఎలా ఉంటాయి, వాటిని లూప్స్ వాడి ఎలా యాక్సెస్ చేయాలో నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Array ని ఎలా క్రియేట్ చేయాలి? (Declaration)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక Array ని క్రియేట్ చేయాలంటే మూడు విషయాలు చెప్పాలి: 1) అందులో ఏ రకమైన డేటా పెడుతున్నాం (int / float), 2) దానికి ఏ పేరు పెడుతున్నాం, 3) దాని సైజు ఎంత (ఎంతమంది డేటా పెడుతున్నాం).
      </p>

      <div class="story-box">
        <div class="story-box-title">🏢 రియల్ లైఫ్ స్టోరీ: అపార్ట్‌మెంట్ బిల్డింగ్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక అపార్ట్‌మెంట్ బిల్డింగ్ ని ఊహించుకోండి. అందులో మొత్తం 10 ఫ్లాట్స్ ఉన్నాయి. ఆ బిల్డింగ్ పేరు "హిల్ వ్యూ అపార్ట్‌మెంట్స్". ఎవరైనా ఒక కొరియర్ బాయ్ వస్తే, వాడు బిల్డింగ్ పేరుతో పాటు "ఫ్లాట్ నంబర్ 0" (గ్రౌండ్ ఫ్లోర్), "ఫ్లాట్ నంబర్ 1" అని పర్టికులర్ నంబర్ అడుగుతాడు. <br><br>
          ప్రోగ్రామింగ్ లో కూడా ఇంతే! బిల్డింగ్ పేరు = <strong>Array Name</strong>. ఫ్లాట్ నంబర్స్ = <strong>Index Numbers (0, 1, 2...)</strong>. ఒకే పేరు కింద మనం చాలా గదులను (మెమరీ బ్లాక్స్ ని) క్రియేట్ చేస్తున్నాం.
        </p>
      </div>

      <p class="prose-paragraph">
        అర్రే క్రియేట్ చేసే పద్ధతి: <code>int marks[5];</code> <br>
        అంటే ఇక్కడ కంపైలర్ 5 ఇంటిజర్లకు సరిపడే మెమరీ ని క్రియేట్ చేస్తుంది. మనం ఆ మెమరీ ని వాడాలంటే బ్రాకెట్స్ లో ఇండెక్స్ నంబర్ రాయాలి (ఉదా: <code>marks[0] = 50;</code>). C లాంగ్వేజ్ లో ఇండెక్స్ ఎప్పుడూ <strong>0</strong> తోనే మొదలవుతుంది!
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> Contiguous Memory Allocation (పక్కపక్కనే)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఇది ఇంటర్వ్యూలలో అడిగే చాలా ముఖ్యమైన పాయింట్. మామూలుగా మనం వేర్వేరు వేరియబుల్స్ (a, b, c) క్రియేట్ చేస్తే కంపైలర్ వాటికి RAM లో ఎక్కడో ఒక దగ్గర (చెల్లాచెదురుగా) స్పేస్ ఇస్తుంది. కానీ ఒక Array ని క్రియేట్ చేస్తే మాత్రం, దానికి సంబంధించిన <strong>మెమరీ మొత్తం వరుసగా (పక్కపక్కనే) ఇస్తుంది</strong>. దీన్నే <span class="prose-highlight">Contiguous Memory Allocation</span> అంటారు. దీనివల్ల డేటాని వెతకడం చాలా ఫాస్ట్ గా జరుగుతుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> లూప్స్ వాడి Array లోని డేటాని చూడటం (Traversal)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        Array లో 100 ఎలిమెంట్స్ ఉంటే, వాటన్నిటినీ 100 సార్లు <code>printf</code> రాయకుండా, ఒక చిన్న <code>for</code> లూప్ తో మొత్తం డేటాని ప్రింట్ చేయవచ్చు. దీన్నే <strong>Array Traversal</strong> అంటారు.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Arrays Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 5 ఎలిమెంట్స్ తో ఒక అర్రే క్రియేట్ చేశాం
    int scores[5] = {80, 95, 72, 88, 91};
    
    // 0 ఇండెక్స్ నుండి 4 ఇండెక్స్ వరకు లూప్ తిరుగుతుంది
    for (int i = 0; i < 5; i++) {
        printf("Score of student %d is: %d\\n", i, scores[i]);
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="section-title"><span class="num">4</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఇండెక్స్ ఎందుకు 0 తోనే మొదలవుతుంది? (Why 0-based indexing?)</h4>
          <p>దీనికి కారణం మెమరీ అడ్రస్ లెక్కింపు. ఇండెక్స్ అనేది బేస్ అడ్రస్ (మొదటి ఎలిమెంట్ అడ్రస్) నుండి "ఎంత దూరంలో" ఉన్నాం (Offset) అని చెప్తుంది. మొదటి ఎలిమెంట్ బేస్ అడ్రస్ దగ్గరే ఉంటుంది కాబట్టి దాని దూరం 0 (Zero offset). అందుకే 0 తో మొదలవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: 5 సైజు ఉన్న అర్రే లో 6వ ఎలిమెంట్ ని స్టోర్ చేయొచ్చా?</h4>
          <p>చేయకూడదు! దీన్నే Array Out of Bounds అంటారు. C లాంగ్వేజ్ మిమ్మల్ని ఆపదు (ఎర్రర్ చూపించదు), కానీ ఇది మెమరీ లో వేరే వేరియబుల్ స్పేస్ ని పాడు చేస్తుంది, దీనివల్ల ప్రోగ్రామ్ క్రాష్ అవుతుంది (Segmentation Fault వస్తుంది).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 12, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '11-c-function-parameters-return-values-and-scope.html', '11. Scope & Lifecycle', '13-c-multi-dimensional-arrays-and-matrices.html', '13. 2D Arrays & Matrices');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

// ==========================================
// LESSON 13: 2D Arrays & Matrices
// ==========================================
function buildLesson13() {
  const title = "2D Arrays & Matrices (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో 2D Arrays అంటే ఏమిటి? మ్యాట్రిక్స్ (Matrix) డేటాని, అంటే అడ్డు వరుసలు (Rows) మరియు నిలువు వరుసలు (Columns) రూపంలో డేటాని ప్రోగ్రామ్ లో ఎలా స్టోర్ చేయాలో నేర్చుకుందాం.";
  const filename = "13-c-multi-dimensional-arrays-and-matrices.html";
  const subtopics = "2D Array అంటే ఏంటి? · Rows మరియు Columns · Nested Loops వాడకం";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు నేర్చుకున్న Arrays ఒక సింగిల్ లైన్ (అంటే 1 డైమెన్షనల్) లో డేటాని సేవ్ చేస్తాయి. కానీ నిజ జీవితంలో డేటా అంతా అలా లైన్ గా ఉండదు కదా. ఒక స్కూల్ టైమ్‌టేబుల్ కానీ, లేదా మూవీ థియేటర్ లోని సీటింగ్ అరేంజ్మెంట్ కానీ అడ్డు వరుసలు (Rows) మరియు నిలువు వరుసలు (Columns) గా గ్రిడ్ (Grid) ఆకారంలో ఉంటుంది. ఆ విధంగా ఉండే డేటాని ప్రోగ్రామింగ్ లో స్టోర్ చేయడానికి వాడే కాన్సెప్ట్ పేరే <strong>Multi-Dimensional Arrays (2D Arrays)</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span> 2D Array ని ఎలా ఊహించుకోవాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక 2D Array ని సింపుల్ గా "అర్రేస్ తో చేసిన అర్రే (Array of Arrays)" అని చెప్పొచ్చు. 
      </p>

      <div class="story-box">
        <div class="story-box-title">🎬 రియల్ లైఫ్ స్టోరీ: థియేటర్ సీట్లు</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు సినిమాకి వెళ్లారు. మీ టికెట్ పైన "H-12" అని రాసి ఉంది. అంటే ఏంటి? <br><br>
          "H" అనేది ఏ అడ్డు వరుస (Row) అని చెప్తుంది. <br>
          "12" అనేది ఆ వరుసలో ఏ సీట్ నంబర్ (Column) అని చెప్తుంది. <br><br>
          అంటే ఒక సీట్ ని కనిపెట్టాలంటే మనకు కచ్చితంగా <strong>రెండు నంబర్లు</strong> కావాలి. 2D అర్రే కూడా కరెక్ట్ గా ఇదే లాజిక్ తో పనిచేస్తుంది. ఒక డేటాని స్టోర్ చేయాలంటే <code>[Row][Column]</code> అని రెండు ఇండెక్స్ లు వాడాలి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> 2D Array క్రియేషన్ (Declaration)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        దీన్ని క్రియేట్ చేయడానికి మనం రెండు సైజులు ఇవ్వాలి: <code>int matrix[3][4];</code> <br>
        దీని అర్థం: ఇందులో 3 అడ్డు వరుసలు (Rows) ఉన్నాయి, ఒక్కో వరుసలో 4 గదులు (Columns) ఉన్నాయి. అంటే మొత్తంగా <code>3 x 4 = 12</code> ఎలిమెంట్స్ స్టోర్ అవుతాయి.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> Nested Loops తో 2D అర్రేని చదవడం</div>
    <div class="section-body">
      <p class="prose-paragraph">
        1D అర్రేని చదవడానికి ఒకే ఒక <code>for</code> లూప్ పట్టింది. కానీ ఇక్కడ Rows, Columns రెండు ఉన్నాయి కదా, కాబట్టి లూప్ లోపల ఇంకో లూప్ <strong>(Nested Loop)</strong> వాడాలి. బయటి లూప్ ఏమో Rows ని కంట్రోల్ చేస్తుంది, లోపలి లూప్ ఏమో ఆ పర్టికులర్ Row లో ఉన్న Columns ని ప్రింట్ చేస్తుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — 2D Array Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 2 Rows, 3 Columns ఉన్న మ్యాట్రిక్స్
    int grid[2][3] = {
        {10, 20, 30}, // Row 0
        {40, 50, 60}  // Row 1
    };
    
    // బయటి లూప్ (Rows కోసం)
    for (int r = 0; r < 2; r++) {
        // లోపలి లూప్ (Columns కోసం)
        for (int c = 0; c < 3; c++) {
            // పక్కపక్కనే ప్రింట్ చేయడానికి
            printf("%d ", grid[r][c]); 
        }
        // ఒక Row అయిపోగానే కింద లైన్ కి వెళ్ళాలి (Matrix ల్లా కనపడటానికి)
        printf("\\n");
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="section-title"><span class="num">4</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: కంప్యూటర్ RAM లో 2D Array కూడా గ్రిడ్ లాగే స్టోర్ అవుతుందా?</h4>
          <p>లేదు! ఇది చాలామందికి తెలియని సీక్రెట్. కంప్యూటర్ RAM కి రోస్, కాలమ్స్ ఉండవు. అదొక పెద్ద స్ట్రెయిట్ లైన్. కాబట్టి 2D అర్రేని కూడా సిస్టమ్ ఒక సింగిల్ లైన్ లోనే పక్కపక్కన సేవ్ చేస్తుంది (దీన్నే Row-major order అంటారు). మన కంపైలర్ లోపల మ్యాథ్స్ వాడి దాన్ని 2D లాగా ఫీల్ అయ్యేలా చేస్తుంది అంతే!</p>
        </div>
        <div class="faq-item">
          <h4>Q: 3D Arrays కూడా ఉంటాయా? వాటిని ఎప్పుడు వాడుతారు?</h4>
          <p>ఖచ్చితంగా ఉంటాయి! <code>int array[3][4][5];</code> లాంటివి 3D అర్రేస్. వీటిని గేమ్స్ డెవలప్‌మెంట్ లో స్పేస్ లో ఒక ఆబ్జెక్ట్ (x, y, z) అక్షాంశాలను చెప్పడానికి, లేదా కలర్స్ లో (RGB) డేటా మార్చడానికి వాడుతుంటారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 13, "Phase 07", "Arrays & Memory Organization", subtopics, contentBody, '12-c-arrays-declaration-memory-and-traversal.html', '12. Arrays Basics', '14-c-strings-character-arrays-and-null-terminator.html', '14. Strings & Text Processing');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

function run() {
  buildLesson12();
  buildLesson13();
}
run();
