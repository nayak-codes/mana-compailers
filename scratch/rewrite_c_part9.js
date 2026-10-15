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

// 22
function buildLesson22() {
  const title = "Pointer Arithmetic, Arrays & const Qualifiers (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Pointer Arithmetic ఎలా పనిచేస్తుంది? పాయింటర్ కి +1 చేస్తే అసలు ఏమవుతుంది? const పాయింటర్స్ ని ఎందుకు వాడాలో రియల్ లైఫ్ ఉదాహరణలతో నేర్చుకుందాం.";
  const filename = "22-c-pointer-arithmetic-arrays-and-const-qualifiers.html";
  const subtopics = "Pointer Arithmetic (+, -) · Pointers & Arrays · const Pointers · Generic void*";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు పాఠంలో పాయింటర్స్ అంటే కేవలం అడ్రస్ లు స్టోర్ చేసే కాగితాలు అని నేర్చుకున్నాం. కానీ ఈ పాయింటర్స్ తో మనం లెక్కలు (Maths) కూడా చేయొచ్చు. ఉదాహరణకి పాయింటర్ కి <code>+1</code> లేదా <code>-1</code> కలపొచ్చు. దీన్నే <strong>Pointer Arithmetic</strong> అంటారు. అయితే మామూలు మ్యాథ్స్ కి, పాయింటర్ మ్యాథ్స్ కి చాలా తేడా ఉంటుంది. దాన్ని మనం ఈ పాఠంలో డీప్ గా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> పాయింటర్ కి +1 చేస్తే ఏమవుతుంది?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక మామూలు నంబర్ కి పక్కన <code>+1</code> చేస్తే ఆ నంబర్ 1 పెరుగుతుంది. (ఉదా: 10 + 1 = 11). కానీ పాయింటర్ కి <code>+1</code> చేస్తే, అది స్టోర్ చేస్తున్న డేటా టైప్ సైజు ని బట్టి జంప్ అవుతుంది!
      </p>

      <div class="story-box">
        <div class="story-box-title">🐸 రియల్ లైఫ్ స్టోరీ: కప్పల జంపింగ్ రేస్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఇద్దరు పిల్లలు ఒక ఆట ఆడుతున్నారు. ఒకరి దగ్గర ఒక చిన్న కప్ప (char) ఉంది, ఇంకొకరి దగ్గర ఒక పెద్ద కంగారు (int) ఉంది. <br><br>
          చిన్న కప్ప కి "ఒక స్టెప్ దూకు (Jump +1)" అని చెప్తే అది కేవలం <strong>1 ఫీట్</strong> మాత్రమే దూకుతుంది. <br>
          కానీ పెద్ద కంగారు కి "ఒక స్టెప్ దూకు (Jump +1)" అని చెప్తే అది ఏకంగా <strong>4 ఫీట్స్</strong> దూకుతుంది. <br><br>
          మన C లో పాయింటర్స్ కూడా ఇంతే! <code>char *</code> పాయింటర్ కి <code>+1</code> చేస్తే అది మెమరీలో 1 బైట్ జంప్ అవుతుంది. అదే <code>int *</code> పాయింటర్ కి <code>+1</code> చేస్తే అది మెమరీలో ఏకంగా 4 బైట్స్ జంప్ అయి నెక్స్ట్ గదికి వెళ్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Pointer Math)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం ఒక అర్రే తీసుకొని, పాయింటర్ కి <code>+1</code> కలపడం ద్వారా నెక్స్ట్ నంబర్ ని ఎలా చదవాలో చూద్దాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointer Arithmetic</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int arr[] = {10, 20, 30};
    
    // పాయింటర్ కి మొదటి గది అడ్రస్ ఇచ్చాం
    int *ptr = arr;
    
    // ఇప్పుడు ptr మొదటి గదిలో ఉంది కాబట్టి 10 వస్తుంది
    printf("First number: %d\\n", *ptr);
    
    // కంగారు జంప్! (4 బైట్స్ ముందుకు వెళ్తుంది)
    ptr = ptr + 1;
    
    // ఇప్పుడు నెక్స్ట్ గదిలో ఉన్న 20 వస్తుంది
    printf("Second number: %d\\n", *ptr);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: పాయింటర్స్ తో మల్టిప్లికేషన్ (*) చేయొచ్చా?</h4>
          <p>చేయకూడదు! ఒక అడ్రస్ ని ఇంకో అడ్రస్ తో మల్టిప్లై చేస్తే వచ్చే రిజల్ట్ కి అర్థం ఉండదు. అందుకే కంపైలర్ ఒప్పుకోదు. కేవలం అడిషన్ (+), సబ్ట్రాక్షన్ (-) మాత్రమే చేయొచ్చు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: <code>void *</code> అంటే ఏంటి?</h4>
          <p>అది ఏ టైప్ పాయింటరో దానికి తెలీదు. అది కేవలం రా మెమరీ అడ్రస్ ని మాత్రమే పట్టుకుంటుంది. కాబట్టి <code>void *</code> కి <code>+1</code> చేస్తే ఎన్ని బైట్స్ జంప్ అవ్వాలో దానికి అర్థం కాదు, అందుకే దానికి Pointer Arithmetic పనిచేయదు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 22, "Phase 09", "Pointers & Memory Architecture", subtopics, contentBody, '21-c-pointers-memory-addresses-and-dereferencing.html', '21. Pointers, Addresses & Dereferencing', '23-c-double-pointers-function-pointers-and-safety.html', '23. Double Pointers & Function Pointers');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 23
function buildLesson23() {
  const title = "Double Pointers, Function Pointers & Safety (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో డబుల్ పాయింటర్స్ (**) అంటే ఏమిటి? ఒక ఫంక్షన్ కే ఇంకో ఫంక్షన్ ని పాయింటర్ లా ఎలా పంపించాలి? మరియు పాయింటర్స్ సేఫ్టీ రూల్స్ ఏంటో తెలుసుకుందాం.";
  const filename = "23-c-double-pointers-function-pointers-and-safety.html";
  const subtopics = "Double Pointers (**) · Function Pointers (Callbacks) · 5 Golden Safety Rules";

  const contentBody = `
    <div class="intro-box">
      <p>పాయింటర్స్ అనే కాన్సెప్ట్ అర్థమయ్యాక, ఇంకా అడ్వాన్స్డ్ గా వెళ్తే మనకు కనిపించేవి <strong>Double Pointers (డబుల్ పాయింటర్స్)</strong> మరియు <strong>Function Pointers</strong>. వినడానికి చాలా కాంప్లెక్స్ గా అనిపించినా, వెనకాల ఉన్న లాజిక్ చాలా సింపుల్. అసలు ఒక పాయింటర్ అడ్రస్ నే ఇంకో పాయింటర్ లో స్టోర్ చేస్తే ఏమవుతుంది? ఒక ఫంక్షన్ ని కాల్ చేయడానికి పాయింటర్ ఎందుకు వాడాలి? ఈ విషయాలు డీప్ గా అర్థం చేసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> డబుల్ పాయింటర్ (**) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మామూలు పాయింటర్ ఒక వేరియబుల్ యొక్క అడ్రస్ ని స్టోర్ చేసుకుంటుంది. కానీ ఆ పాయింటర్ కూడా ఒక కాగితమే కదా! దానికి కూడా ఒక అడ్రస్ ఉంటుంది. ఆ పాయింటర్ యొక్క అడ్రస్ ని స్టోర్ చేసుకోవాలంటే మనకు <strong>"పాయింటర్ టు పాయింటర్" (**)</strong> కావాలి.
      </p>

      <div class="story-box">
        <div class="story-box-title">🕵️‍♂️ రియల్ లైఫ్ స్టోరీ: సీక్రెట్ లాకర్ కీ (Key)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక బ్యాంకు లో మీకు ఒక లాకర్ ఉంది. ఆ లాకర్ ని తెరిస్తే అందులో డబ్బులు (Data) ఉంటాయి. మీ చేతిలో ఉన్న ఆ లాకర్ తాళంచెవి ఒక పాయింటర్ అనుకుందాం. <code>(Pointer -> Data)</code>. <br><br>
          కానీ ఆ తాళంచెవి చాలా సేఫ్ గా ఉండాలని, దాన్ని తీసుకెళ్లి ఇంకొక సేఫ్ బాక్స్ లో పెట్టి, ఆ సేఫ్ బాక్స్ తాళంచెవిని ఇంకొకరికి ఇచ్చారు అనుకోండి. అప్పుడు ఏమవుతుంది? <br>
          మొదటి వ్యక్తి దగ్గరికెళ్తే వాడు రెండో తాళం ఇస్తాడు, ఆ రెండో తాళం తీసుకుని వెళ్తే అప్పుడు డబ్బులు (Data) దొరుకుతాయి. <br>
          దీన్నే C లాంగ్వేజ్ లో <strong>Double Pointer (**)</strong> అంటారు. <code>(Pointer -> Pointer -> Data)</code>.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Double Pointer)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం ఒక వాల్యూ తీసుకొని, దానికోసం ఒక పాయింటర్ క్రియేట్ చేసి, మళ్ళీ ఆ పాయింటర్ కోసం డబుల్ పాయింటర్ ని ఎలా క్రియేట్ చేయాలో చూద్దాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Double Pointer</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int num = 100;
    
    // 1. ఇది సింగిల్ పాయింటర్ (num అడ్రస్ ఉంటుంది)
    int *ptr1 = &num;
    
    // 2. ఇది డబుల్ పాయింటర్ (ptr1 అడ్రస్ ఉంటుంది)
    int **ptr2 = &ptr1;
    
    // రెండు సార్లు డోర్ (**) కొడితేనే వాల్యూ వస్తుంది
    printf("Value using Double Pointer: %d\\n", **ptr2);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ట్రిపుల్ పాయింటర్ (***) కూడా రాయొచ్చా?</h4>
          <p>ఖచ్చితంగా రాయొచ్చు! మీరు ఎన్ని నక్షత్రాలు (Stars) పెడితే అన్ని లెవెల్స్ లోపలికి వెళ్లొచ్చు. కానీ రియల్ టైం ప్రాజెక్ట్స్ లో డబుల్ పాయింటర్ కన్నా ఎక్కువ వాడితే కోడ్ అర్థం చేసుకోవడం చాలా కష్టంగా మారిపోతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: Function Pointers ఎందుకు వాడుతారు?</h4>
          <p>GUI అప్లికేషన్స్ లో బటన్ నొక్కినప్పుడు ఏం జరగాలి అని చెప్పడానికి <strong>Callbacks</strong> వాడుతారు. అప్పుడు ఒక ఫంక్షన్ ని పాయింటర్ లాగా పంపిస్తారు. ఆ సిచువేషన్స్ లో Function Pointers చాలా అవసరం.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 23, "Phase 09", "Pointers & Memory Architecture", subtopics, contentBody, '22-c-pointer-arithmetic-arrays-and-const-qualifiers.html', '22. Pointer Arithmetic, Arrays & const Qualifiers', '24-c-pointers-and-functions-call-by-reference.html', '24. Passing Addresses, Swapping & Returning Pointers');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson22();
  buildLesson23();
  console.log("✅ Generated Lessons 22 and 23 with Massive Text and ONLY ONE VERY SHORT Code Block!");
}
run();
