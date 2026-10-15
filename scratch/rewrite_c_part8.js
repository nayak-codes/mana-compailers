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

// 17
function buildLesson17() {
  const title = "Dynamic Memory Allocation: malloc, calloc, free (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Dynamic Memory అంటే ఏమిటి? malloc, calloc, realloc మరియు free ఫంక్షన్స్ ని వాడి మెమరీ ని ఎందుకు కంట్రోల్ చేయాలో డీప్ ఎక్స్‌ప్లనేషన్ తో తెలుసుకుందాం.";
  const filename = "17-c-dynamic-memory-allocation-malloc-calloc-free.html";
  const subtopics = "Static vs Dynamic Memory · malloc() vs calloc() · free() తో మెమరీ లీక్ (Memory Leak) నివారణ";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలుగా మనం <code>int arr[10];</code> అని రాస్తే, కంపైలర్ ప్రోగ్రామ్ రన్ అవ్వకముందే 10 గదుల మెమరీని ఫిక్స్ చేసేస్తుంది. ఒకవేళ మీరు ఆ ప్రోగ్రామ్ రన్ చేస్తున్నప్పుడు కేవలం 2 గదులే వాడితే... మిగతా 8 గదుల మెమరీ వేస్ట్ అయిపోతుంది కదా! ఒకవేళ మీకు సడన్ గా 15 గదులు కావాలంటే, అప్పటికప్పుడు పెంచుకోలేరు. ఇలాంటి మెమరీ వేస్టేజ్ ని, షార్టేజ్ ని అరికట్టడానికి C లాంగ్వేజ్ లో తీసుకొచ్చిన ఒక బ్రహ్మాస్త్రమే <strong>Dynamic Memory Allocation (డైనమిక్ మెమరీ అలొకేషన్)</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Static Memory vs Dynamic Memory</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ముందుగానే సైజు ఫిక్స్ చేసి ఇస్తే దాన్ని "స్టాటిక్ మెమరీ" అంటారు. ఇది పెరగదు, తగ్గదు. కానీ ప్రోగ్రామ్ రన్ అవుతున్నప్పుడు (Runtime లో) మీ అవసరానికి తగ్గట్టు అప్పటికప్పుడు RAM ని అడిగి మెమరీ తీసుకుంటే దాన్ని "డైనమిక్ మెమరీ" అంటారు.
      </p>

      <div class="story-box">
        <div class="story-box-title">🏨 రియల్ లైఫ్ స్టోరీ: పెళ్లి భోజనాలు vs రెస్టారెంట్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక పెళ్లిలో 1000 మంది వస్తారని ముందే ఫిక్స్ అయ్యి 1000 మందికి వంట చేస్తారు. ఒకవేళ 500 మందే వస్తే సగం ఫుడ్ వేస్ట్ అవుతుంది (Static Allocation). <br><br>
          కానీ అదే రెస్టారెంట్ లో అలా కాదు. కస్టమర్ వచ్చి ఆర్డర్ ఇచ్చిన తర్వాతే వంట చేస్తారు. ఎంతమంది వస్తే అంతమందే అప్పటికప్పుడు ఆర్డర్ ఇస్తారు, ఒక్క మెతుకు కూడా వేస్ట్ అవ్వదు. సరిగ్గా <strong>Dynamic Memory</strong> అనేది మన రెస్టారెంట్ లాంటిది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (malloc వాడకం)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        దీనికోసం మనం <code>malloc()</code> అనే ఫంక్షన్ వాడతాం (అంటే Memory Allocation). ఇది మనకు కావాల్సిన మెమరీ ఇచ్చి దాని అడ్రస్ ని పాయింటర్ కి ఇస్తుంది. వాడకం అయిపోయాక <code>free()</code> తో ఆ మెమరీ ని క్లీన్ చేసేయాలి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Dynamic Memory (malloc)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt; // malloc కోసం ఇది రాయాలి

int main(void) {
    // 1 ఇంటిజర్ కి సరిపడా మెమరీ అడుగుతున్నాం
    int *ptr = malloc(sizeof(int)); 
    
    // ఆ అడ్రస్ లో 50 అనే నంబర్ పెడుతున్నాం
    *ptr = 50;
    
    printf("Dynamic Value: %d\\n", *ptr);
    
    // వాడకం అయిపోయాక ఆ మెమరీ ని డిలీట్ చేసేయాలి
    free(ptr);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: malloc కి మరియు calloc కి తేడా ఏంటి?</h4>
          <p>రెండు మెమరీ ఇవ్వడానికే. కానీ <code>malloc</code> లోపల ఉన్న చెత్త వాల్యూస్ ని (Garbage) క్లీన్ చేయదు. <code>calloc</code> మాత్రం మెమరీ ఇవ్వడంతో పాటు మొత్తం గదులన్నీ '0' తో క్లీన్ చేసి ఇస్తుంది. అందుకే calloc కొంచెం స్లో గా పనిచేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ఒకవేళ free() రాయడం మర్చిపోతే ఏమవుతుంది?</h4>
          <p>దీన్నే ప్రోగ్రామింగ్ లో భయంకరమైన <strong>Memory Leak (మెమరీ లీక్)</strong> అంటారు. ఆ మెమరీ వాడుకోకుండా లాక్ అయిపోయి ఉంటుంది. ప్రోగ్రామ్ రన్ అవుతూ ఉంటే RAM మొత్తం ఫుల్ అయిపోయి, సిస్టమ్ క్రాష్ అయిపోతుంది (హ్యాంగ్ అవుతుంది).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 17, "Phase 09", "Advanced Memory Management", subtopics, contentBody, '16-c-pointers-and-arrays-relationship.html', '16. Pointers & Arrays', '18-c-structures-unions-and-custom-data-types.html', '18. Structs & Unions Basics');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 18
function buildLesson18() {
  const title = "Structures (struct) & Unions Basics in C (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Structures ఎందుకు వాడాలి? వేర్వేరు డేటా టైప్స్ ని కలిపి ఒకే ప్యాకెట్ లాగా ఎలా చేయాలి? Structs మరియు Unions మధ్య తేడా ఏంటో డీప్ గా నేర్చుకుందాం.";
  const filename = "18-c-structures-unions-and-custom-data-types.html";
  const subtopics = "Struct ఎందుకు కావాలి? · Struct Declaration · Union అంటే ఏంటి?";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు Arrays గురించి నేర్చుకున్నాం. అర్రేస్ లో ఒకే రకమైన డేటా ని మాత్రమే స్టోర్ చేయగలం (అన్నీ ఇంటిజర్లు లేదా అన్నీ క్యారెక్టర్లు). కానీ ఒక స్టూడెంట్ డేటా స్టోర్ చేయాలంటే... వాడికి ఒక పేరు (String) ఉంటుంది, ఒక రోల్ నంబర్ (Integer) ఉంటుంది, ఒక పర్సెంటేజ్ (Float) ఉంటుంది. ఇలా వేర్వేరు రకాల డేటాని కలిపి ఒకే ప్యాకెట్ లాగా చేయడానికే C లాంగ్వేజ్ లో <strong>Structures (స్ట్రక్చర్స్)</strong> అనే కాన్సెప్ట్ ఉంది.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Structure (struct) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        స్ట్రక్చర్ అనేది మనకు కావలసినట్టుగా మనం క్రియేట్ చేసుకునే ఒక సొంత డేటా టైప్ (Custom Data Type). దీనిలోపల మనం ఎన్నైనా రకాల వేరియబుల్స్ ని పెట్టుకోవచ్చు.
      </p>

      <div class="story-box">
        <div class="story-box-title">🎒 రియల్ లైఫ్ స్టోరీ: స్కూల్ బ్యాగ్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు స్కూల్ కి వెళ్లేటప్పుడు కేవలం పుస్తకాలు మాత్రమే తీసుకువెళ్లరు కదా. ఒక బాక్స్ లో పుస్తకాలు, ఇంకో దాంట్లో లంచ్ బాక్స్, ఇంకో దాంట్లో పెన్సిల్ బాక్స్... ఇవన్నీ వేర్వేరు రకాల ఐటమ్స్. <br><br>
          కానీ ఆ పది వస్తువులను విడివిడిగా పట్టుకుని నడిస్తే కిందపడిపోతాయి. కాబట్టి వాటన్నింటినీ కలిపి ఒకే <strong>"స్కూల్ బ్యాగ్"</strong> లో పెట్టుకుంటారు. <br>
          మన C లాంగ్వేజ్ లో ఉన్న <strong>Structure</strong> అనేది కరెక్ట్ గా ఈ స్కూల్ బ్యాగ్ లాంటిదే! వేర్వేరు డేటాని ఒకే బ్యాగ్ లో సేవ్ చేస్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్</div>
    <div class="section-body">
      <p class="prose-paragraph">
        స్ట్రక్చర్ ని క్రియేట్ చేయడానికి <code>struct</code> అనే కీవర్డ్ వాడతాం. లోపల ఉన్న డేటాని వాడాలంటే డాట్ (<code>.</code>) ని వాడుతాం. కింద కోడ్ లో స్టూడెంట్ బ్యాగ్ ని ఎలా క్రియేట్ చేశానో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Struct</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// స్టూడెంట్ అనే ఒక కొత్త బ్యాగ్ (Structure) తయారీ
struct Student {
    int id;
    float marks;
};

int main(void) {
    // 's1' అనే పేరుతో ఒక బ్యాగ్ తీసుకున్నాం
    struct Student s1;
    
    // బ్యాగ్ లోపల ఉన్న ఐటమ్స్ కి డాట్(.) వాడి వాల్యూస్ ఇస్తున్నాం
    s1.id = 101;
    s1.marks = 95.5;
    
    printf("ID: %d, Marks: %.1f\\n", s1.id, s1.marks);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: Struct కి, Union కి ఉన్న తేడా ఏంటి?</h4>
          <p>రెండూ బ్యాగ్స్ లాంటివే. కానీ Struct లోపల ఎన్ని ఐటమ్స్ ఉంటే అంత మెమరీ క్రియేట్ అవుతుంది (అందరికీ సపరేట్ గా). కానీ <code>union</code> లో మాత్రం అందులో ఏది పెద్ద ఐటమో, దానికి మాత్రమే మెమరీ క్రియేట్ అయ్యి... మిగతావన్నీ అదే మెమరీని షేర్ చేసుకుంటాయి. మెమరీ తక్కువ ఉన్న మైక్రోకంట్రోలర్స్ లో Unions ని వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q: స్ట్రక్చర్ లోపల ఇంకో స్ట్రక్చర్ ఉండొచ్చా?</h4>
          <p>ఖచ్చితంగా ఉండొచ్చు! దీన్నే Nested Structures అంటారు. ఉదాహరణకు ఒక 'Company' స్ట్రక్చర్ లోపల 'Employee' అనే ఇంకో స్ట్రక్చర్ ని పెట్టుకోవచ్చు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 18, "Phase 10", "User-Defined Data Types", subtopics, contentBody, '17-c-dynamic-memory-allocation-malloc-calloc-free.html', '17. Dynamic Memory (malloc, free)', '19-c-advanced-structures-typedef-and-struct-pointers.html', '19. Advanced Structures & Typedef');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 19
function buildLesson19() {
  const title = "Advanced Structures & Typedef in C (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Typedef ఎందుకు వాడాలి? పెద్ద పెద్ద పేర్లను షార్ట్ కట్ లో ఎలా మార్చాలి? Structs తో పాయింటర్స్ ని వాడేటప్పుడు ఆరో (->) ఆపరేటర్ ఎందుకు వాడాలో తెలుసుకుందాం.";
  const filename = "19-c-advanced-structures-typedef-and-struct-pointers.html";
  const subtopics = "typedef ఉపయోగాలు · Struct Pointers · ఆరో (->) ఆపరేటర్";

  const contentBody = `
    <div class="intro-box">
      <p>మనం పాత పాఠంలో <code>struct</code> ఎలా వాడాలో చూశాం. అయితే మీరు గమనించారో లేదో, ప్రతిసారి వేరియబుల్ క్రియేట్ చేసినప్పుడల్లా <code>struct Student s1;</code> అని ఆ <code>struct</code> అనే పదాన్ని పదే పదే రాయాల్సి వస్తోంది. ఇది చూడటానికి చాలా చిరాకుగా ఉంటుంది కదా! ఈ సమస్యను తీర్చడానికి, పేర్లకు ముద్దు పేర్లు (Shortcuts) పెట్టుకోవడానికి C లో ఉన్న ఒక పవర్ఫుల్ కీవర్డ్ పేరే <strong><code>typedef</code></strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span> typedef అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>typedef</code> అంటే టైప్ డెఫినిషన్ (Type Definition). ఇది ఒక డేటా టైప్ కి మనం ఇచ్చే కొత్త పేరు (Alias) లాంటిది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🏷️ రియల్ లైఫ్ స్టోరీ: స్కూల్లో నిక్ నేమ్ (Nickname)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక అబ్బాయి పేరు "వెంకట సత్య సాయి శ్రీనివాస్". వాడిని స్కూల్లో అందరూ పిలవాలంటే టైమ్ పడుతుంది కదా. అందుకే వాడికి <strong>"వాసు"</strong> అని ఒక నిక్ నేమ్ పెట్టారు. ఇప్పుడు ఎవరైనా "వాసు" అని పిలిస్తే వాడు పలుకుతాడు. <br><br>
          ప్రోగ్రామింగ్ లో కూడా పెద్ద డేటా టైప్ పేరు ఉంటే (ఉదా: <code>unsigned long long int</code>), దాన్ని మనం <code>typedef</code> వాడి <code>ulong</code> అని చిన్న పేరుగా మార్చేసుకోవచ్చు!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (typedef మరియు ఆరో -> ఆపరేటర్)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        స్ట్రక్చర్ ని పాయింటర్ ద్వారా యాక్సెస్ చేయాలి అంటే మామూలు డాట్ (<code>.</code>) పనికిరాదు. పాయింటర్ నుండి స్ట్రక్చర్ లోపలికి వెళ్లాలంటే ఒక స్పెషల్ బాణం గుర్తు, అంటే ఆరో <strong>(<code>-></code>)</strong> ఆపరేటర్ వాడాలి! కింద కోడ్ చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Typedef & Arrow</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// struct Car అనే పెద్ద పేరుకి Car అని షార్ట్ కట్ పెట్టాం
typedef struct {
    int speed;
} Car;

int main(void) {
    // ఇప్పుడు మళ్ళీ struct అని రాయాల్సిన అవసరం లేదు
    Car myCar;
    myCar.speed = 100;
    
    // పాయింటర్ కి అడ్రస్ ఇస్తున్నాం
    Car *ptr = &myCar;
    
    // పాయింటర్ వాడేటప్పుడు డాట్(.) బదులు ఆరో (->) వాడాలి
    printf("Car Speed: %d\\n", ptr->speed);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: పాయింటర్ కి ఆరో (->) ఆపరేటర్ ఎందుకు వాడాలి? డాట్ (.) ఎందుకు వాడకూడదు?</h4>
          <p>ఎందుకంటే పాయింటర్ దగ్గర డేటా ఉండదు, కేవలం అడ్రస్ ఉంటుంది. ఆ అడ్రస్ లోపలికి వెళ్లి (Dereference చేసి) అప్పుడు డాట్ వాడాలి. అంటే <code>(*ptr).speed</code> అని రాయాలి. దానికి బదులు C లాంగ్వేజ్ మనకి <code>ptr->speed</code> అనే షార్ట్ కట్ ఇచ్చింది. రెండు ఒకటే!</p>
        </div>
        <div class="faq-item">
          <h4>Q: typedef ని కేవలం structs కే వాడతారా?</h4>
          <p>లేదు! మీరు <code>int</code> ని కూడా మార్చుకోవచ్చు. <code>typedef int NUMBER;</code> అని రాస్తే, ఇకమీదట మీరు ఎక్కడైనా <code>NUMBER x = 5;</code> అని వాడుకోవచ్చు. పెద్ద ప్రాజెక్ట్స్ లో క్లారిటీ కోసం ఇలా వాడతారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 19, "Phase 10", "User-Defined Data Types", subtopics, contentBody, '18-c-structures-unions-and-custom-data-types.html', '18. Structs & Unions Basics', '20-c-file-handling-reading-writing-and-modes.html', '20. File Handling: Reading & Writing');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 20
function buildLesson20() {
  const title = "File Handling: Reading & Writing Files in C (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో ఒక టెక్స్ట్ ఫైల్ (txt) ని ఎలా క్రియేట్ చేయాలి? అందులో డేటాని ఎలా రాయాలి? File Pointer అంటే ఏమిటి? రియల్ లైఫ్ ఎగ్జాంపుల్స్ తో ఫైల్ హ్యాండ్లింగ్ నేర్చుకుందాం.";
  const filename = "20-c-file-handling-reading-writing-and-modes.html";
  const subtopics = "File Pointer (FILE *) · fopen మరియు fclose · 'w', 'r', 'a' మోడ్స్ అంటే ఏంటి?";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు మనం రాసిన ప్రోగ్రామ్స్ లో ఒక పెద్ద సమస్య ఉంది. మీరు ఒక కోడ్ రాసి అందులో డేటా ఇచ్చారు, అవుట్పుట్ వచ్చింది. కానీ ప్రోగ్రామ్ క్లోజ్ చేయగానే ఆ డేటా అంతా గాలిలో (RAM లో) ఆవిరైపోతుంది కదా! రేపు వచ్చి చూస్తే డేటా ఉండదు. ఆ డేటా శాశ్వతంగా హార్డ్ డిస్క్ లో స్టోర్ అవ్వాలంటే మనం దాన్ని ఒక <strong>File (ఫైల్)</strong> లోపల రాయాలి. దీన్నే ప్రోగ్రామింగ్ లో <strong>File Handling (ఫైల్ హ్యాండ్లింగ్)</strong> అంటారు.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ఫైల్ ఆపరేషన్స్ (File Operations)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఫైల్ తో పని చేసేటప్పుడు ఎప్పుడూ మూడు స్టెప్స్ ఉంటాయి: 1) ఫైల్ ని ఓపెన్ చేయడం, 2) అందులో రాయడం లేదా చదవడం, 3) ఫైల్ ని క్లోజ్ చేయడం.
      </p>

      <div class="story-box">
        <div class="story-box-title">📓 రియల్ లైఫ్ స్టోరీ: ఒక డైరీ రాయడం</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఒక సీక్రెట్ డైరీ రాస్తున్నారు అనుకోండి. <br><br>
          ముందు డైరీ తాళం తీసి ఓపెన్ చేస్తారు (ఇదే <code>fopen</code>). <br>
          తర్వాత పెన్ పెట్టి కొత్త పేజీలో ఏమైనా రాస్తారు (ఇదే <code>fprintf</code>). <br>
          అయిపోయాక ఆ డైరీ మూసేసి తాళం వేస్తారు కదా, ఎందుకంటే వేరేవాళ్ళు చూడకూడదని. (ఇదే <code>fclose</code>). <br><br>
          కంప్యూటర్ లో ఫైల్ కూడా అంతే. దాన్ని క్లోజ్ చేయకపోతే డేటా సేవ్ అవ్వదు మరియు వేరే ప్రోగ్రామ్స్ దాన్ని వాడలేవు!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (ఫైల్ లోకి రాయడం)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం "w" (అంటే Write) మోడ్ లో ఒక ఫైల్ ని ఓపెన్ చేసి అందులో ఒక చిన్న టెక్స్ట్ రాస్తున్నాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple File Write</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    // 1. ఫైల్ ని Write మోడ్ ('w') లో ఓపెన్ చేస్తున్నాం
    FILE *fptr = fopen("hello.txt", "w");
    
    // ఫైల్ ఓపెన్ అయ్యిందో లేదో చెక్ చేస్తున్నాం
    if (fptr != NULL) {
        // 2. అందులోకి డేటా రాస్తున్నాం (printf బదులు fprintf వాడాలి)
        fprintf(fptr, "Hello, this is my first file!");
        
        // 3. కచ్చితంగా క్లోజ్ చేయాలి
        fclose(fptr);
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: 'w' (Write) మోడ్ కి, 'a' (Append) మోడ్ కి తేడా ఏంటి?</h4>
          <p>మీరు 'w' (Write) మోడ్ లో ఫైల్ ఓపెన్ చేస్తే, అందులో పాత డేటా ఏమైనా ఉంటే అది మొత్తం డిలీట్ అయిపోయి కొత్త డేటా మాత్రమే ఉంటుంది. కానీ 'a' (Append) మోడ్ లో ఓపెన్ చేస్తే, పాత డేటా అలాగే ఉంటుంది, కొత్త డేటా దాని కింద యాడ్ అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q: ఫైల్ చదవడానికి (Reading) ఏ మోడ్ వాడాలి?</h4>
          <p>దానికి 'r' (Read) మోడ్ వాడాలి. అప్పుడు సిస్టమ్ ఆ ఫైల్ లో ఉన్న డేటాని తీసుకొచ్చి మన ప్రోగ్రామ్ కి ఇస్తుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 20, "Phase 11", "File Handling", subtopics, contentBody, '19-c-advanced-structures-typedef-and-struct-pointers.html', '19. Advanced Structures & Typedef', '21-c-preprocessor-directives-and-macros.html', '21. Preprocessor & Macros');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// 21
function buildLesson21() {
  const title = "Preprocessor Directives & Macros in C (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో కంపైల్ అవ్వడానికి ముందు ఏం జరుగుతుంది? #define మరియు #include అంటే ఏమిటి? మ్యాక్రోస్ (Macros) ని వాడి కోడ్ ని ఎలా కంట్రోల్ చేయాలో నేర్చుకుందాం.";
  const filename = "21-c-preprocessor-directives-and-macros.html";
  const subtopics = "Preprocessor అంటే ఏంటి? · #include · #define మ్యాక్రోస్";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఎప్పుడూ C ప్రోగ్రామ్ పైన <code>#include &lt;stdio.h&gt;</code> అని రాస్తూ ఉంటాం కదా. అసలు ఆ హాష్ (<code>#</code>) సింబల్ ఎందుకు వాడతాం? కంపైలర్ కి ఆ లైన్ అంటే ఎందుకంత భయం? ఈ హాష్ సింబల్ తో మొదలయ్యే లైన్స్ ని <strong>Preprocessor Directives</strong> అంటారు. అసలు ఈ ప్రీ-ప్రాసెసర్ అంటే ఏంటో, అది ఎలా పనిచేస్తుందో ఈ ఫైనల్ పాఠంలో నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Preprocessor (ప్రీ-ప్రాసెసర్) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మీ కోడ్ ని కంపైలర్ (ఆంగ్ల అక్షరాలని సున్నాలు, ఒకట్లుగా మార్చేది) చదవడానికి ముందే, ఒక చిన్న అసిస్టెంట్ వచ్చి మీ కోడ్ ని రెడీ చేస్తాడు. వాడి పేరే ప్రీ-ప్రాసెసర్. వాడు కేవలం <code>#</code> సింబల్ తో ఉన్న లైన్స్ ని మాత్రమే వెతికి వాటిని మార్చేస్తాడు.
      </p>

      <div class="story-box">
        <div class="story-box-title">🎬 రియల్ లైఫ్ స్టోరీ: సినిమా డైరెక్టర్ మరియు అసిస్టెంట్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక సినిమా షూటింగ్ జరుగుతోంది. డైరెక్టర్ (కంపైలర్) సీన్ తీయడానికి వచ్చే ముందే, అసిస్టెంట్ డైరెక్టర్ (ప్రీ-ప్రాసెసర్) వచ్చి లైట్స్ అన్నీ ఆన్ చేసి, కెమెరా సెట్ చేసి, యాక్టర్స్ కి డైలాగ్స్ ఇచ్చి అంతా రెడీ చేస్తాడు. డైరెక్టర్ రాగానే డైరెక్ట్ గా ఆక్షన్ చెప్తాడు. <br><br>
          కోడ్ లో కూడా కంపైలర్ వచ్చే ముందే, <code>#include</code> లైన్స్ ని చూసి ఆ ఫైల్స్ లో ఉన్న కోడ్ మొత్తాన్ని తీసుకొచ్చి మన ఫైల్ లో అతికించేవాడే ఈ ప్రీ-ప్రాసెసర్.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (#define మ్యాక్రోస్)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>#define</code> వాడి మనం మ్యాక్రోస్ (Macros) క్రియేట్ చేయొచ్చు. అంటే కోడ్ లో ఎక్కడైనా ఒక పదం ఉంటే, కంపైల్ అయ్యేముందు ఆ పదాన్ని వేరే వాల్యూ తో ఫైండ్ & రీప్లేస్ (Find and Replace) చేసేయొచ్చు.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — #define Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// PI అనే పదం ఎక్కడ ఉన్నా 3.14 కి మార్చేయ్ అని చెప్తున్నాం
#define PI 3.14

int main(void) {
    // ఇక్కడ కంపైలర్ కి PI బదులు 3.14 మాత్రమే వెళ్తుంది
    printf("Value of PI is: %.2f\\n", PI);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఫ్రీక్వెంట్ గా అడిగే ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q: <code>const float PI = 3.14;</code> కి మరియు <code>#define PI 3.14</code> కి తేడా ఏంటి?</h4>
          <p>చాలా పెద్ద తేడా ఉంది. <code>const</code> వాడితే దానికి మెమరీ లో ఒక ప్లేస్ (డబ్బా) దొరుకుతుంది, అది కంపైలర్ చూసుకుంటుంది. కానీ <code>#define</code> వాడితే దానికి మెమరీ ఉండదు, అది కేవలం టెక్స్ట్ ని కాపీ-పేస్ట్ చేయడం లాంటిది (ప్రీ-ప్రాసెసర్ చూసుకుంటుంది).</p>
        </div>
        <div class="faq-item">
          <h4>Q: ప్రీ-ప్రాసెసర్ లో ఇంకేమైనా ఉంటాయా?</h4>
          <p>అవును! <code>#ifdef</code>, <code>#ifndef</code> లాంటివి ఉంటాయి. ఇవి కోడ్ ని కండిషన్స్ బట్టి కంపైల్ చేయాలా వద్దా అని డిసైడ్ చేస్తాయి (దీన్నే Conditional Compilation అంటారు). విండోస్ కి ఒక కోడ్, మ్యాక్ కి ఇంకో కోడ్ రన్ అయ్యేలా చేయొచ్చు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 21, "Phase 12", "Preprocessor Directives", subtopics, contentBody, '20-c-file-handling-reading-writing-and-modes.html', '20. File Handling: Reading & Writing', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson17();
  buildLesson18();
  buildLesson19();
  buildLesson20();
  buildLesson21();
  console.log("✅ Generated Lessons 17 to 21 with Massive Text and ONLY ONE VERY SHORT Code Block!");
}
run();
