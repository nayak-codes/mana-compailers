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

// 14
function buildLesson14() {
  const title = "Strings & Text Processing: The Secret of Text (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Strings అంటే ఏమిటి? అసలు అక్షరాలను (Text) సిస్టమ్ ఎలా స్టోర్ చేసుకుంటుంది? Null Terminator ప్రాముఖ్యత ఏంటి? చాలా డీప్ గా థియరీతో నేర్చుకుందాం.";
  const filename = "14-c-strings-character-arrays-and-null-terminator.html";
  const subtopics = "Strings అంటే ఏంటి? · Character Arrays · Null Terminator (\\0) సీక్రెట్";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్లకు అర్థమయ్యేది కేవలం సున్నాలు (0) మరియు ఒకట్లు (1). వాటికి మీరు రాసే 'A', 'B' లాంటి ఇంగ్లీష్ అక్షరాలు అసలు అర్థం కావు. కానీ మనం రోజువారీ చూసే వెబ్‌సైట్స్ లో, యాప్స్ లో అంతా టెక్స్ట్ (Text) ఏ ఉంటుంది. మరి కంప్యూటర్ ఆ అక్షరాలను ఎలా గుర్తుపెట్టుకుంటుంది? వాటిని ఒకదాని పక్కన ఒకటి పేర్చి పదాలుగా, వాక్యాలుగా ఎలా మారుస్తుంది? దీనికి సమాధానమే <strong>Strings (స్ట్రింగ్స్)</strong>. ఈ పాఠంలో స్ట్రింగ్స్ వెనక ఉన్న సీక్రెట్స్ ఏంటో డీప్ గా విశ్లేషిద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు String అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        సింపుల్ గా చెప్పాలంటే, చాలా అక్షరాలను (Characters) ఒక దారం (String) లాగా గుచ్చితే అదే ఒక పదం (Word). C లాంగ్వేజ్ లో స్ట్రింగ్స్ అంటే వేరే ఏదో కొత్త డేటా టైప్ కాదు. అవన్నీ కేవలం <strong>Character Arrays (క్యారెక్టర్ అర్రేస్)</strong> మాత్రమే!
      </p>

      <div class="story-box">
        <div class="story-box-title">📿 రియల్ లైఫ్ స్టోరీ: పూల మాల</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఒక దేవుడి కోసం పూల మాల కడుతున్నారు అనుకోండి. ఒక్కొక్క పువ్వు ని తీసి దారానికి గుచ్చుకుంటూ వెళ్తారు. <br><br>
          ఇక్కడ <strong>ఒక్క పువ్వు = ఒక Character (ఒక అక్షరం)</strong>. <br>
          <strong>ఆ మొత్తం పూల మాల = String (ఒక పదం లేదా వాక్యం)</strong>. <br><br>
          అంటే ఒక అర్రే (Array) ని తీసుకుని, మొదటి ఇండెక్స్ లో 'H', రెండో ఇండెక్స్ లో 'E', మూడో దాంట్లో 'L'.. ఇలా పెట్టుకుంటూ వెళ్తే "HELLO" అనే ఒక స్ట్రింగ్ తయారవుతుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> దారానికి ముడి (The Null Terminator)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మరి ఆ పూల మాల కుడుతున్నప్పుడు చివర్లో దారానికి ముడి వేయకపోతే ఏమవుతుంది? పువ్వులన్నీ జారిపోయి కింద పడిపోతాయి కదా! కంపైలర్ కి కూడా అంతే, ఒక పదం ఎక్కడ మొదలైందో తెలుస్తుంది, కానీ ఎక్కడ ఆగిపోయిందో దానికి తెలియదు. ఎందుకంటే మెమరీ అదొక పెద్ద సముద్రం లాంటిది.
      </p>
      <p class="prose-paragraph">
        అందుకే C లాంగ్వేజ్ లో ఒక రూల్ పెట్టారు. ప్రతి స్ట్రింగ్ (పదం) చివరలో కచ్చితంగా ఒక స్పెషల్ అక్షరం ఉండాలి. ఆ అక్షరమే <strong><code>\\0</code> (Null Terminator)</strong>. కంపైలర్ ఆ పదాన్ని చదువుకుంటూ వెళ్తున్నప్పుడు, ఎప్పుడైతే దానికి ఈ <code>\\0</code> కనిపిస్తుందో, వెంటనే ఓహో పదం అయిపోయింది అన్నమాట అని ఆగిపోతుంది. ఇది లేకపోతే కంపైలర్ ఆగకుండా మెమరీలో ఉన్న చెత్తనంతా (Garbage values) ప్రింట్ చేసేస్తుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద ఉన్న కోడ్ లో మనం ఒక చిన్న స్ట్రింగ్ ని ఎలా క్రియేట్ చేయాలో చూద్దాం. డబుల్ కోట్స్ (Double Quotes) వాడితే సిస్టమ్ ఆటోమేటిక్ గా చివర్లో <code>\\0</code> ని యాడ్ చేసేస్తుంది. మనం మ్యాన్యువల్ గా పెట్టాల్సిన అవసరం లేదు.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple String</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // పేరుని ఒక అర్రే లో స్టోర్ చేస్తున్నాం
    char name[] = "Hello";
    
    // %s అనేది స్ట్రింగ్ ని ప్రింట్ చేయడానికి వాడతారు
    printf("Message: %s\\n", name);
    
    return 0;
}</code></pre>
      </div>
      <p class="prose-paragraph">
        చూశారుగా! <code>char name[]</code> అని రాస్తే ఒక క్యారెక్టర్ అర్రే తయారయ్యింది. అందులో "Hello" అనే పదం సేవ్ అయ్యింది. <code>%s</code> వాడితే ఆ పదం మొత్తం కంపైలర్ ఒకేసారి స్క్రీన్ పై చూపిస్తుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">4</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: సింగిల్ కోట్స్ ('A') కి, డబుల్ కోట్స్ ("A") కి తేడా ఏంటి?</h4>
          <p>చాలా పెద్ద తేడా ఉంది! సింగిల్ కోట్స్ లో రాస్తే అది కేవలం ఒక అక్షరం (Character) మాత్రమే. కానీ డబుల్ కోట్స్ లో రాస్తే అది ఒక స్ట్రింగ్. అంటే "A" లోపల నిజానికి రెండు అక్షరాలు ఉంటాయి (ఒకటి A, ఇంకొకటి దారానికి వేసే ముడి \\0).</p>
        </div>
        <div class="faq-item">
          <h4>Q: స్ట్రింగ్స్ ని డైరెక్ట్ గా యాడ్ చేయవచ్చా? (ఉదా: name1 + name2)</h4>
          <p>జావా (Java) లాంటి వేరే లాంగ్వేజెస్ లో అలా డైరెక్ట్ గా యాడ్ చేయొచ్చు. కానీ C లాంగ్వేజ్ లో ప్లస్ (+) వాడి కలపలేం. దానికోసం <code>strcat()</code> అనే స్పెషల్ ఫంక్షన్స్ ఉంటాయి. అవే వాడాలి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 14, "Phase 08", "Strings & Pointers Intro", subtopics, contentBody, '13-c-multi-dimensional-arrays-and-matrices.html', '13. 2D Arrays & Matrices', '15-c-pointers-basics-memory-addresses-and-dereferencing.html', '15. Pointers Basics');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 15
function buildLesson15() {
  const title = "Pointers Basics: The Core of C Language (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Pointers అంటే ఏమిటి? అసలు మెమరీ అడ్రస్ లు ఎలా పనిచేస్తాయి? పాయింటర్స్ ని చాలా మంది ఎందుకు కష్టం అనుకుంటారు? మనం రియల్ లైఫ్ ఎగ్జాంపుల్ తో ఈజీగా నేర్చుకుందాం.";
  const filename = "15-c-pointers-basics-memory-addresses-and-dereferencing.html";
  const subtopics = "Memory Addresses · Pointer Declaration · Dereferencing (*) · అడ్రస్ ఆపరేటర్ (&)";

  const contentBody = `
    <div class="intro-box">
      <p>చాలామంది స్టూడెంట్స్ C లాంగ్వేజ్ నేర్చుకునేటప్పుడు కంగారుపడే టాపిక్ ఏదైనా ఉందంటే అది <strong>Pointers (పాయింటర్స్)</strong> మాత్రమే. కానీ నిజానికి పాయింటర్స్ అంత కష్టం కాదు, అవి కేవలం కొన్ని రియల్ లైఫ్ లాజిక్స్ మీద ఆధారపడి ఉంటాయి. C లాంగ్వేజ్ కి అంత స్పీడ్, అంత పవర్ ఎక్కడి నుండి వస్తుంది అంటే అది కేవలం ఈ పాయింటర్స్ వల్లే! ఆపరేటింగ్ సిస్టమ్స్ ని, గేమ్ ఇంజిన్స్ ని, కంపైలర్స్ ని రాయడానికి పాయింటర్స్ వాడకం కచ్చితంగా ఉండాలి. ఈ పాఠంలో ఆ భయాన్ని పూర్తిగా పోగొట్టి, పాయింటర్స్ అంటే ఏంటో డీప్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు పాయింటర్ అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        సాధారణంగా ఒక వేరియబుల్ (ఉదాహరణకు <code>int age = 20;</code>) అంటే, ఆ డబ్బా లోపల 20 అనే నంబర్ దాగి ఉంటుంది. అంటే ఒక మామూలు వేరియబుల్ కేవలం "డేటా" ని మాత్రమే స్టోర్ చేసుకుంటుంది. 
      </p>
      <p class="prose-paragraph">
        కానీ <strong>పాయింటర్</strong> కూడా ఒక వేరియబుల్ లాంటిదే కాకపోతే అది డేటాని స్టోర్ చేయదు. దానికి బదులుగా ఇంకొక వేరియబుల్ యొక్క <strong>అడ్రస్ (Address)</strong> ని స్టోర్ చేసుకుంటుంది. అంటే ఒక డబ్బా ఎక్కడ ఉందో చెప్పే అడ్రస్ మాత్రమే అందులో ఉంటుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🗺️ రియల్ లైఫ్ స్టోరీ: మీ స్నేహితుడి ఇల్లు</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు మీ స్నేహితుడి (Friend) ని కలవాలి అనుకున్నారు. వాడి ఇల్లు మీకు తెలీదు. కానీ మీ చేతిలో ఒక కాగితం ఉంది. ఆ కాగితం మీద వాడి ఇంటి <strong>అడ్రస్ (Address)</strong> రాసి ఉంది. (ఉదా: ప్లాట్ నంబర్ 45, బంజారా హిల్స్). <br><br>
          ఇప్పుడు ఆ కాగితం మీ ఫ్రెండ్ కాదు! కానీ ఆ కాగితం మీ ఫ్రెండ్ దగ్గరికి మిమ్మల్ని తీసుకువెళ్లగలదు (Point చేస్తుంది). <br>
          <strong>మీ ఫ్రెండ్ = Data (వేరియబుల్).</strong> <br>
          <strong>మీ చేతిలో ఉన్న కాగితం = Pointer (పాయింటర్).</strong> <br><br>
          అందుకే దాని పేరు పాయింటర్. అది ఇంకొక దాని వైపు వేలు చూపిస్తూ (పాయింట్ చేస్తూ) ఉంటుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> అడ్రస్ ఎలా తెలుసుకోవాలి? (& మరియు *)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక వేరియబుల్ యొక్క అడ్రస్ తెలుసుకోవాలంటే దాని ముందు <strong><code>&</code> (ఆంపర్సాండ్)</strong> పెట్టాలి. దీన్నే "Address of" ఆపరేటర్ అంటారు. <br>
        ఒక పాయింటర్ దగ్గర అడ్రస్ ఉంది కదా, ఆ అడ్రస్ లోపలికి వెళ్లి అక్కడ ఉన్న డేటాని చూడాలంటే <strong><code>*</code> (స్టార్)</strong> వాడాలి. దీన్నే "Dereference" ఆపరేటర్ అంటారు. అంటే కాగితంలో ఉన్న అడ్రస్ దగ్గరికి వెళ్లి తలుపు తట్టడం లాంటిది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో చూడండి, <code>age</code> అనే డబ్బా ఉంది. <code>ptr</code> అనే కాగితం (పాయింటర్) మీద ఆ డబ్బా అడ్రస్ రాసుకున్నాం. చివర్లో ఆ కాగితం వాడి ఆ డబ్బా లోపల ఉన్న వాల్యూ ని ప్రింట్ చేస్తున్నాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Pointer</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int age = 20;
    
    // పాయింటర్ ని క్రియేట్ చేసి దాంట్లో అడ్రస్ దాస్తున్నాం
    int *ptr = &age; 
    
    // పాయింటర్ సాయంతో ఆ అడ్రస్ లోపల ఏముందో చూస్తున్నాం (*)
    printf("Value is: %d\\n", *ptr); // 20 వస్తుంది
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: అసలు డైరెక్ట్ గా డేటాని వాడొచ్చు కదా, అడ్రస్ లతో పని ఏముంది?</h4>
          <p>డైరెక్ట్ గా వాడితే ఒక ఫంక్షన్ నుండి ఇంకో ఫంక్షన్ కి డేటా పంపినపుడు మొత్తం డేటా జిరాక్స్ (Copy) అవుతుంది. దానికి చాలా మెమరీ వేస్ట్ అవుతుంది. అడ్రస్ ఇస్తే జిరాక్స్ తీయక్కర్లేదు, డైరెక్ట్ గా ఒరిజినల్ కాగితాన్ని (Memory) ఎడిట్ చేయొచ్చు. స్పీడ్ విపరీతంగా పెరుగుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: నల్ పాయింటర్ (Null Pointer) అంటే ఏమిటి?</h4>
          <p>పాయింటర్ క్రియేట్ చేసి అందులో ఏ అడ్రస్ వేయకపోతే అది గాలిలో ఏదో ఒక అడ్రస్ కి పాయింట్ చేస్తుంది. దానివల్ల సిస్టమ్ క్రాష్ అవుతుంది. అందుకే అందులో <code>NULL</code> అని రాస్తారు. అంటే ఆ కాగితం ఖాళీగా ఉంది, ఎవరి అడ్రస్ లేదు అని అర్థం.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 15, "Phase 08", "Strings & Pointers Intro", subtopics, contentBody, '14-c-strings-character-arrays-and-null-terminator.html', '14. Strings & Text Processing', '16-c-pointers-and-arrays-relationship.html', '16. Pointers & Arrays');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 16
function buildLesson16() {
  const title = "Pointers & Arrays Relationship (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Arrays కి మరియు Pointers కి మధ్య ఉన్న స్నేహం ఏంటి? ఒక అర్రే పేరునే పాయింటర్ లా ఎలా వాడుకోవాలో చాలా ఇంట్రెస్టింగ్ లాజిక్స్ తో నేర్చుకుందాం.";
  const filename = "16-c-pointers-and-arrays-relationship.html";
  const subtopics = "Array Decay · Pointer Arithmetic · Arrays as Pointers";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు పాఠాల్లో అర్రేస్ (Arrays) గురించి నేర్చుకున్నాం, ఆ తర్వాత పాయింటర్స్ (Pointers) గురించి నేర్చుకున్నాం. కానీ C లాంగ్వేజ్ లో ఒక అద్భుతమైన సీక్రెట్ ఏంటంటే... ఈ రెండు దాదాపు ఒకటే! అవును, తెర వెనుక (Behind the scenes) అర్రేస్ అన్నీ కూడా పాయింటర్స్ లాగానే పనిచేస్తాయి. అందుకే ఆ రెండిటి మధ్య ఉన్న బంధం (Relationship) గురించి తెలుసుకోవడం చాలా అవసరం. దీన్ని అర్థం చేసుకుంటే C లాంగ్వేజ్ మీ గుప్పెట్లో ఉన్నట్టే!</p>
    </div>

    <div class="section-title"><span class="num">1</span> అర్రే పేరు కూడా ఒక పాయింటరే! (Array Name as Pointer)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మీరు <code>int arr[5];</code> అని రాసినప్పుడు 5 గదులు తయారవుతాయి అని తెలుసుకున్నాం. అయితే కంపైలర్ ఆ గదులను ట్రాక్ చేయడానికి ఆ అర్రే పేరుని (అంటే <code>arr</code> అనే పదాన్ని) మొదటి గది యొక్క అడ్రస్ గా మార్చేస్తుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🚂 రియల్ లైఫ్ స్టోరీ: ట్రైన్ ఇంజిన్ మరియు బోగీలు</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక పొడవైన రైలుని ఊహించుకోండి. దానికి 10 బోగీలు (Compartments) ఉన్నాయి అనుకుందాం. మీరు స్టేషన్ లో ఉన్నప్పుడు "గోదావరి ఎక్స్ప్రెస్ ఎక్కడ ఉంది?" అని అడిగితే, వాళ్ళు "ప్లాట్‌ఫామ్ 1 మీద ఇంజిన్ ఉంది" అని చెప్తారు. <br><br>
          రైలు మొత్తం ఎక్కడుందో వాళ్ళు చెప్పరు. కేవలం <strong>ఇంజిన్ ఎక్కడుందో (మొదటి భాగం)</strong> మాత్రమే చెప్తారు. ఇంజిన్ దొరికితే దాని వెనకాల వరుసగా అన్నీ బోగీలు ఉన్నట్టే కదా! <br><br>
          C లాంగ్వేజ్ లో కూడా ఇంతే. అర్రే అనేది ఒక రైలు అయితే, అర్రే పేరు <code>arr</code> అనేది ఇంజిన్ యొక్క అడ్రస్ (మొదటి ఎలిమెంట్ అడ్రస్). దాన్నే బేస్ అడ్రస్ అంటారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఇది చాలా ఆశ్చర్యంగా ఉంటుంది! కింద కోడ్ చూడండి. మనం <code>arr[0]</code> అని పిలవకుండా డైరెక్ట్ గా అర్రే పేరు ముందు స్టార్ (<code>*arr</code>) పెట్టినా కూడా మనకి సేమ్ ఆన్సర్ వస్తుంది. ఎందుకంటే అర్రే పేరే ఒక పాయింటర్ కాబట్టి!
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Arrays & Pointers</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int arr[3] = {10, 20, 30};
    
    // మామూలుగా ఇలా వాడతాం
    printf("Normal index: %d\\n", arr[0]);
    
    // అర్రే పేరుని పాయింటర్ లా వాడినా సేమ్ వస్తుంది!
    printf("Pointer way: %d\\n", *arr);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: పాయింటర్ కి +1 చేస్తే ఏమవుతుంది?</h4>
          <p>దీన్నే Pointer Arithmetic అంటారు. పాయింటర్ కి +1 చేస్తే అది నెక్స్ట్ నంబర్ కి వెళ్లదు, నెక్స్ట్ గదికి జంప్ అవుతుంది. అంటే ట్రైన్ లో ఒక బోగీ నుండి పక్క బోగీకి జంప్ చేసినట్టు అన్నమాట.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ఫంక్షన్స్ కి అర్రే ని పంపినప్పుడు సైజు ఎందుకు తెలియదు? (Array Decay)</h4>
          <p>చాలా ఇంట్రెస్టింగ్ డౌట్! ఒక ఫంక్షన్ కి మనం అర్రే ని పంపితే, మొత్తం అర్రే ని కాకుండా కేవలం ఆ మొదటి గది అడ్రస్ (పాయింటర్) ని మాత్రమే సిస్టమ్ పంపిస్తుంది. అంటే సైజు ఇన్ఫర్మేషన్ గాలిలో కలిసిపోతుంది. దీన్నే Array Decay అంటారు. అందుకే అర్రే తో పాటు ఎప్పుడూ సైజు ని కూడా విడిగా పంపాలి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 16, "Phase 08", "Strings & Pointers Intro", subtopics, contentBody, '15-c-pointers-basics-memory-addresses-and-dereferencing.html', '15. Pointers Basics', '17-c-dynamic-memory-allocation-malloc-calloc-free.html', '17. Dynamic Memory (malloc, free)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson14();
  buildLesson15();
  buildLesson16();
  console.log("✅ Generated Lessons 14, 15, 16 with Massive Text and ONLY ONE VERY SHORT Code Block!");
}
run();
