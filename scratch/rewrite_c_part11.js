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

// 30
function buildLesson30() {
  const title = "Unions, Shared Memory & Variant Data Types (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Unions అంటే ఏమిటి? Structs కి మరియు Unions కి తేడా ఏంటి? మెమరీ తక్కువ ఉన్నప్పుడు (Shared Memory) ఒకే ప్లేస్ లో డేటాని ఎలా షేర్ చేసుకోవాలో డీప్ గా నేర్చుకుందాం.";
  const filename = "30-c-unions-shared-memory-and-variant-types.html";
  const subtopics = "Unions అంటే ఏంటి? · Struct vs Union · Shared Memory Concept";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు స్ట్రక్చర్స్ (Structs) గురించి నేర్చుకున్నాం. అందులో మనం ఎన్ని వేరియబుల్స్ పెడితే అన్నింటికీ విడివిడిగా గదులు (Memory) తయారవుతాయి. కానీ కొన్నిసార్లు మనకు అన్ని వేరియబుల్స్ ఒకేసారి అవసరం ఉండవు, ఏదో ఒకటే వాడతాము. అలాంటప్పుడు అందరికీ వేరువేరు గదులు ఇస్తే మెమరీ వేస్ట్ అవుతుంది కదా! అలాంటి మెమరీ ని ఆదా చేయడానికే <strong>Unions (యూనియన్స్)</strong> వాడుతాం. ఈ పాఠంలో ఈ "Shared Memory" కాన్సెప్ట్ ఏంటో క్లియర్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Struct vs Union</div>
    <div class="section-body">
      <p class="prose-paragraph">
        స్ట్రక్చర్ లో ప్రతి దానికి సపరేట్ రూమ్ ఉంటుంది (ఉదాహరణకు 3 గదుల ఇల్లు లాగా). కానీ యూనియన్ లో కేవలం ఒకే ఒక పెద్ద హాల్ ఉంటుంది, ఆ హాల్ నే అందరూ షేర్ చేసుకుంటారు. అంటే ఒకరు వాడుతున్నప్పుడు ఇంకొకరు వాడలేరు!
      </p>

      <div class="story-box">
        <div class="story-box-title">🛏️ రియల్ లైఫ్ స్టోరీ: హాస్టల్ లో ఒకే మంచం (Shared Bed)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక హాస్టల్ గదిలో ఒకే ఒక మంచం ఉంది. అక్కడ డే-షిఫ్ట్ చేసే కుర్రాడు, నైట్-షిఫ్ట్ చేసే కుర్రాడు ఇద్దరు ఉన్నారు అనుకోండి. <br><br>
          ఉదయం నైట్-షిఫ్ట్ వాడు ఆ మంచం మీద పడుకుంటాడు. రాత్రి డే-షిఫ్ట్ వాడు పడుకుంటాడు. ఇద్దరూ ఒకేసారి పడుకోలేరు, కానీ ఒకే మంచాన్ని <strong>షేర్ (Share)</strong> చేసుకుంటున్నారు. దీనివల్ల రెండు మంచాలు కొనాల్సిన అవసరం తప్పింది కదా (Space Saved). <br>
          మన C లో <strong>Union</strong> కూడా ఇదే! అందులో అతి పెద్ద సైజు ఉన్న వేరియబుల్ కి మాత్రమే మెమరీ ఇస్తుంది కంపైలర్. మిగతా వేరియబుల్స్ అన్నీ అదే మెమరీని షేర్ చేసుకుంటాయి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Union Demo)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో <code>union</code> కి ఒక ఇంటిజర్ (4 బైట్స్) మరియు క్యారెక్టర్ (1 బైట్) ఇచ్చాము. కానీ దాని సైజు 5 బైట్స్ అవ్వదు, కేవలం 4 బైట్స్ ఏ అవుతుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Union</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// యూనియన్ తయారు చేస్తున్నాం
union Box {
    int weight;   // 4 బైట్స్ (పెద్దది కాబట్టి ఇదే మెయిన్ సైజు)
    char label;   // 1 బైట్
};

int main(void) {
    union Box b1;
    b1.weight = 500;
    
    // ఒకదాన్ని వాడినప్పుడు ఇంకో దాన్ని వాడకూడదు
    printf("Weight is: %d\\n", b1.weight);
    
    // సైజు చూడండి, కేవలం 4 బైట్స్ మాత్రమే వస్తుంది!
    printf("Size of union: %zu\\n", sizeof(b1));
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: ఒకేసారి <code>weight</code> మరియు <code>label</code> రెంటినీ ప్రింట్ చేస్తే ఏమవుతుంది?</h4>
          <p>మీరు లాస్ట్ లో దేనికైతే వాల్యూ ఇచ్చారో అది మాత్రమే కరెక్ట్ గా వస్తుంది. పాతది చెత్త (Garbage) లాగా మారిపోతుంది. ఎందుకంటే రెండూ ఒకే మెమరీ (మంచం) షేర్ చేసుకుంటున్నాయి కదా, ఒకరు వస్తే ఇంకొకరు లేచిపోవాల్సిందే!</p>
        </div>
        <div class="faq-item">
          <h4>Q: యూనియన్స్ ని ఎక్కువగా ఎక్కడ వాడతారు?</h4>
          <p>చాలా తక్కువ RAM ఉన్న ఎంబెడెడ్ సిస్టమ్స్ (మైక్రోకంట్రోలర్స్, ఐఓటి డివైసెస్) లో, హార్డ్ వేర్ రిజిస్టర్స్ తో మాట్లాడేటప్పుడు ప్రతి ఒక్క బైట్ ని ఆదా చేయడానికి వీటిని వాడతారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 30, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '29-c-self-referential-structures-file-io-and-5-projects.html', '29. Self-Referential Structs, Binary I/O & Projects', '31-c-enumerations-custom-values-and-switch-dispatch.html', '31. Enumerations (enum), Custom Values & Switch');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 31
function buildLesson31() {
  const title = "Enumerations (enum), Custom Values & Switch (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Enums అంటే ఏమిటి? నంబర్స్ ని డైరెక్ట్ గా వాడే బదులు ఇంగ్లీష్ పేర్లను వాడి కోడ్ ని ఎలా ఈజీగా అర్థమయ్యేలా చేయాలో (Readability) నేర్చుకుందాం.";
  const filename = "31-c-enumerations-custom-values-and-switch-dispatch.html";
  const subtopics = "Enum అంటే ఏంటి? · Auto-Increment · Switch & State Machines";

  const contentBody = `
    <div class="intro-box">
      <p>కోడ్ రాస్తున్నప్పుడు మధ్యలో 0, 1, 2 లాంటి నంబర్స్ వాడితే, వేరే వాళ్ళకి అవి దేనికి వాడారో అర్థం కాదు. (ఉదాహరణకు 0 అంటే ఫెయిల్ అని, 1 అంటే పాస్ అని మీరు అనుకుంటారు, కానీ వేరే వాడికి తెలీదు కదా). ఇలాంటి మ్యాజిక్ నంబర్స్ ని తీసేసి, వాటి ప్లేస్ లో చక్కగా ఇంగ్లీష్ పదాలు (PASS, FAIL) వాడడానికి C లాంగ్వేజ్ మనకి ఇచ్చిన ఫీచరే <strong>Enumerations (ఎనమ్స్)</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Enum అంటే ఏమిటి? (Meaning of enum)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>enum</code> అంటే మనం నంబర్స్ కి పెట్టుకునే పేర్లు (Constants). మీరు <code>enum</code> క్రియేట్ చేస్తే కంపైలర్ ఆటోమేటిక్ గా మొదటి దానికి 0, రెండో దానికి 1, మూడో దానికి 2 అలా ఇచ్చుకుంటూ వెళ్లిపోతుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🚦 రియల్ లైఫ్ స్టోరీ: ట్రాఫిక్ సిగ్నల్స్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక ట్రాఫిక్ సిగ్నల్ మెషిన్ కి RED, YELLOW, GREEN అనే కలర్స్ అర్థం కావు. దానికి 0, 1, 2 మాత్రమే తెలుసు. <br><br>
          మీరు కోడ్ లో <code>if (light == 0)</code> అని రాస్తే ఒక ఐదేళ్ల తర్వాత ఆ 0 అంటే రెడ్ డా, గ్రీన్ డా అని కన్ఫ్యూజ్ అవుతారు. <br>
          అదే <code>enum { RED, YELLOW, GREEN };</code> అని క్రియేట్ చేసి... <code>if (light == RED)</code> అని రాస్తే ఎంత బాగుంటుంది? చదివేవాడికి కథ లాగా అర్థమైపోతుంది కదా. ఆ పని చేసేదే <strong>enum</strong>.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Enum వాడకం)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో రోజులను <code>enum</code> వాడి ఎలా క్రియేట్ చేసామో చూడండి. మనం ఏ నంబర్ ఇవ్వకపోయినా కంపైలర్ ఆటోమేటిక్ గా 0, 1, 2 లు తీసుకుంటుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Enum</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// వారం రోజులు (0 నుండి స్టార్ట్ అవుతాయి)
enum Day { SUNDAY, MONDAY, TUESDAY };

int main(void) {
    // వాల్యూ MONDAY కి సెట్ చేస్తున్నాం (అంటే 1 అన్నమాట)
    enum Day today = MONDAY;
    
    // డైరెక్ట్ గా 1 కాకుండా MONDAY అని వాడితే క్లారిటీ ఉంటుంది
    if (today == MONDAY) {
        printf("I hate Mondays!\\n");
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: 0 తో కాకుండా 10 తో స్టార్ట్ చేయొచ్చా?</h4>
          <p>ఖచ్చితంగా! మీరు <code>enum { SUNDAY = 10, MONDAY, TUESDAY };</code> అని ఇస్తే, సండే 10 అవుతుంది, ఆ తర్వాత వచ్చేవి ఆటోమేటిక్ గా 11, 12 అవుతాయి.</p>
        </div>
        <div class="faq-item">
          <h4>Q: <code>#define MONDAY 1</code> కి మరియు <code>enum</code> కి తేడా ఏంటి?</h4>
          <p><code>#define</code> వాడితే మీరు వందలకొద్దీ పేర్లు రాయాలి మరియు గ్రూప్ చేయడం కష్టం. <code>enum</code> వాడితే అన్నీ ఒకే గ్రూప్ లో ఉంటాయి మరియు డీబగ్గింగ్ లో డైరెక్ట్ గా పేర్లు కనిపిస్తాయి (నంబర్స్ కి బదులు).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 31, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '30-c-unions-shared-memory-and-variant-types.html', '30. Unions, Shared Memory & Variant Data Types', '32-c-typedef-type-aliases-and-readable-architecture.html', '32. typedef, Type Aliases & Architecture');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 32
function buildLesson32() {
  const title = "typedef, Type Aliases & Expressive Architecture (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో typedef అంటే ఏమిటి? పెద్ద పెద్ద డేటా టైప్స్ కి ముద్దు పేర్లు (Aliases) పెట్టి కోడ్ ని ఈజీగా ఎలా చదవాలో (Readability) డీప్ ఎక్స్‌ప్లనేషన్ తో చూద్దాం.";
  const filename = "32-c-typedef-type-aliases-and-readable-architecture.html";
  const subtopics = "typedef ఉపయోగాలు · Type Aliases · Clean API Design";

  const contentBody = `
    <div class="intro-box">
      <p>ఇది మన **C Master Course** లో చివరి పాఠం! ఒక ప్రొఫెషనల్ ప్రోగ్రామర్ కి, బిగినర్ కి ఉన్న తేడా కోడ్ రన్ అవ్వడంలో కాదు, ఆ కోడ్ చదవడానికి ఎంత ఈజీగా (Readable) ఉంది అనే దాని మీద ఆధారపడి ఉంటుంది. పెద్ద పెద్ద పేర్లతో, కన్ఫ్యూజ్ చేసే సింటాక్స్ తో కోడ్ రాస్తే రేపు మీరే దాన్ని అర్థం చేసుకోలేరు. దాన్ని సాల్వ్ చేయడానికి, పెద్ద పేర్లకు ముద్దు పేర్లు పెట్టుకునే ఒక అద్భుతమైన ఫీచరే <strong><code>typedef</code></strong> (టైప్ డెఫినిషన్).</p>
    </div>

    <div class="section-title"><span class="num">1</span> typedef అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>typedef</code> అంటే కేవలం ఒక "టైప్" కి కొత్త "పేరు" ఇవ్వడం (Type Alias). ఇది కొత్త డేటా టైప్ ని క్రియేట్ చేయదు, ఉన్న దానికే ఒక షార్ట్ కట్ పేరు పెడుతుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🏷️ రియల్ లైఫ్ స్టోరీ: స్కూల్లో నిక్ నేమ్ (Nickname)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక అబ్బాయి అసలు పేరు "వెంకట సత్య సాయి శ్రీనివాస్". వాడిని పిలవాలంటే టైమ్ పడుతుంది కదా. అందుకే వాడికి <strong>"వాసు"</strong> అని ఒక నిక్ నేమ్ పెట్టారు. ఇప్పుడు "వాసు" అని పిలిచినా వాడే వస్తాడు. <br><br>
          ప్రోగ్రామింగ్ లో కూడా <code>unsigned long long int</code> అని పదే పదే రాయలేము కాబట్టి, <code>typedef</code> వాడి దాన్ని <code>ulong</code> అని చిన్న పేరుగా మార్చేసుకోవచ్చు!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (typedef Demo)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం ఇంటిజర్ (int) కి ఒక కొత్త పేరు (AGE) ని ఎలా పెడుతున్నామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple typedef</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 'int' అనే పదాన్ని ఇక మీదట 'AGE' అని పిలుస్తాం
typedef int AGE;

int main(void) {
    // ఇప్పుడు int అనక్కర్లేదు, డైరెక్ట్ గా AGE వాడొచ్చు
    AGE myAge = 25;
    
    printf("My age is: %d\\n", myAge);
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: <code>typedef</code> ఎక్కువగా ఎక్కడ వాడతారు?</h4>
          <p>దీన్ని ఎక్కువగా Structures లో వాడతారు. ప్రతిసారి <code>struct Student s1;</code> అని రాయడం కష్టం కాబట్టి, <code>typedef struct { ... } Student;</code> అని వాడి డైరెక్ట్ గా <code>Student s1;</code> అని రాయడానికి వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: <code>#define</code> మరియు <code>typedef</code> రెండు ఒకటేనా?</h4>
          <p>కాదు! <code>#define</code> అనేది కేవలం ఫైండ్ అండ్ రీప్లేస్ (Copy-Paste). అది కంపైలర్ కి తెలీదు. కానీ <code>typedef</code> అనేది అఫీషియల్ గా కంపైలర్ కి తెలిసేలా పెట్టే అసలైన సిస్టమ్ నిక్ నేమ్ (Alias).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 32, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '31-c-enumerations-custom-values-and-switch-dispatch.html', '31. Enumerations (enum), Custom Values & Switch', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson30();
  buildLesson31();
  buildLesson32();
  console.log("✅ Generated Lessons 30 to 32 with Massive Text and ONLY ONE VERY SHORT Code Block!");
}
run();
