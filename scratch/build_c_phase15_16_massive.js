const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

const C_CURRICULUM = [
  {
    id: 'phase15', tag: 'Phase 15', title: 'Advanced Pointers', icon: '🎯',
    lessons: [
      { num: 41, file: '41-c-double-pointers-and-memory-addresses.html', title: '41. Double Pointers (**) & Memory Addresses' },
      { num: 42, file: '42-c-function-pointers-and-callbacks.html', title: '42. Function Pointers & Callbacks' },
      { num: 43, file: '43-c-void-pointers-and-generic-programming.html', title: '43. Void Pointers & Generic Programming' }
    ]
  },
  {
    id: 'phase16', tag: 'Phase 16', title: 'Bitwise & Low-Level', icon: '⚙️',
    lessons: [
      { num: 44, file: '44-c-bitwise-and-or-xor-not-operators.html', title: '44. Bitwise AND, OR, XOR, NOT' },
      { num: 45, file: '45-c-shift-operators-and-fast-math.html', title: '45. Shift Operators (<<, >>) & Fast Math' },
      { num: 46, file: '46-c-bit-masking-flags-and-hardware-registers.html', title: '46. Bit Masking, Flags & Hardware Registers' },
      { num: 47, file: '47-c-bit-fields-and-struct-packing.html', title: '47. Bit Fields & Struct Packing' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, void pointers, bitwise operators c, left shift right shift, bit masking c, bit fields c" />
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

function buildLesson43() {
  const title = "Void Pointers & Generic Programming (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Void Pointers (void *) అంటే ఏంటి? కంపైలర్ కి టైప్ (int, float) చెప్పకుండా Generic గా డేటాని ఎలా హ్యాండిల్ చేయాలో రియల్ వరల్డ్ ఉదాహరణలతో నేర్చుకుందాం.";
  const filename = "43-c-void-pointers-and-generic-programming.html";
  const subtopics = "Void Pointers · Generic Programming · Typecasting · Generic Swap Function";

  const contentBody = `
    <div class="intro-box">
      <p>C లాంగ్వేజ్ లో ప్రతీ వేరియబుల్ కి ఒక క్యాస్ట్ (Type) ఉంటుంది (అది int, float, లేదా char అని). ఒకవేళ మీరు ఒక ఫంక్షన్ రాసి, అది ఏ టైప్ డేటా ఇచ్చినా సరే తీసుకోవాలి అనుకుంటే? ఉదాహరణకు <code>printf</code> ఫంక్షన్ కి మీరు నంబర్ ఇచ్చినా, స్ట్రింగ్ ఇచ్చినా ఎలా ప్రింట్ చేయగలుగుతోంది? దీని వెనక ఉన్న సీక్రెట్ ఆయుధమే <strong>Void Pointers (<code>void *</code>)</strong>. అంటే ఇవి "కులమతాలు లేని పాయింటర్స్" లాంటివి! దేన్నైనా పాయింట్ చేయగలవు కానీ, వాడేటప్పుడు మాత్రం ఒరిజినల్ క్యాస్ట్ లోకి మారాలి. ఇదెలా పనిచేస్తుందో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Void Pointer అంటే ఏంటి? (The Chameleon)</div>
    <div class="section-body">
      <p class="text-prose">
        నార్మల్ గా <code>int *ptr;</code> అంటే అది కేవలం ఇంటీజర్ ఉన్న అడ్రస్ ని మాత్రమే పాయింట్ చేయగలదు. ఒకవేళ <code>float</code> అడ్రస్ ఇస్తే కంపైలర్ ఎర్రర్ ఇస్తుంది.
      </p>
      <p class="text-prose">
        కానీ <strong><code>void *ptr;</code></strong> రాస్తే, అది ఏ అడ్రస్ ని అయినా తనలో స్టోర్ చేసుకోగలదు. ఇది ఒక ఊసరవెల్లి (Chameleon) లాంటిది! <code>malloc()</code> ఫంక్షన్ కి మీరు అందులో నంబర్స్ పెడతారో, స్ట్రింగ్స్ పెడతారో తెలీదు కాబట్టే అది ఎప్పుడూ ఒక <code>void *</code> ని రిటర్న్ చేస్తుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🛡️ రియల్ లైఫ్ స్టోరీ: హోటల్ లో బ్లాంక్ కీ (Blank Key)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక హోటల్ లో ఒక గది బుక్ చేసుకున్నారు. రిసెప్షనిస్ట్ మీకు ఒక "బ్లాంక్ కీ" (Blank Key) ఇచ్చాడు. ఆ కీ మీద ఏ రూమ్ నంబర్ అని రాసి లేదు (ఇదే <code>void *</code>). ఆ కీ మీ జేబులో పెట్టుకోవడం ఈజీనే, కానీ దాన్ని పట్టుకుని డైరెక్ట్ గా ఏ రూమ్ ని ఓపెన్ చేయలేరు కదా! (దాన్నే డీ-రిఫరెన్సింగ్ <code>*ptr</code> అంటారు).<br><br>
          మరి ఆ కీ వాడాలంటే ఏం చేయాలి? ఆ కీ ని తీసుకుని మేనేజర్ దగ్గరికి వెళ్లి "బాబు, దీన్ని నా 302 రూమ్ కీ లాగా మార్చు" అని అడగాలి. దాన్నే <strong>Typecasting</strong> <code>(int *)ptr</code> అంటారు. ఒకసారి ఆ స్టిక్కర్ వేశాక అప్పుడు మీరు రూమ్ ని ఓపెన్ చేసి వాడుకోవచ్చు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> జెనెరిక్ ప్రోగ్రామింగ్ (Generic Programming)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు రెండు ఇంటీజర్స్ ని మార్చడానికి (Swap) ఒక ఫంక్షన్ రాసారు. రేపు పొద్దున రెండు ఫ్లోట్స్ ని మార్చాలంటే? మళ్ళీ ఇంకో ఫంక్షన్ రాయాలి. అలా 10 టైప్స్ కి 10 ఫంక్షన్స్ రాయకుండా, ఒకే ఒక ఫంక్షన్ రాసి దానికి <code>void *</code> పాస్ చేస్తే, అది ఏ టైప్ డేటానైనా మార్చేస్తుంది. C++ లో లాగా <code>Templates</code> లేకపోయినా, C లో <code>void *</code> వాడి అదే మ్యాజిక్ చేయొచ్చు!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Generic Print Function)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఒకే ఫంక్షన్ కి ఒకసారి int, ఒకసారి float అడ్రస్ ని పంపి ఎలా హ్యాండిల్ చేశామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Void Pointers</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఒకే ఫంక్షన్, కానీ ఏ టైప్ డేటా అయినా తీసుకుంటుంది (void * ద్వారా)
// టైప్ ఏంటో చెప్పడానికి typeChar అనే క్యారెక్టర్ కూడా పంపుతున్నాం
void printAnything(void *ptr, char typeChar) {
    if (typeChar == 'i') {
        // ముందు (int*) గా మార్చి, ఆ తర్వాత లాక్ ఓపెన్ (*) చేస్తున్నాం
        printf("Integer Value: %d\\n", *(int*)ptr);
    } 
    else if (typeChar == 'f') {
        // (float*) గా మార్చి లాక్ ఓపెన్ (*) చేస్తున్నాం
        printf("Float Value: %.2f\\n", *(float*)ptr);
    } 
    else if (typeChar == 'c') {
        // (char*) గా మార్చి లాక్ ఓపెన్ (*) చేస్తున్నాం
        printf("Character Value: %c\\n", *(char*)ptr);
    }
}

int main() {
    int age = 25;
    float salary = 50000.50;
    char grade = 'A';
    
    // ఒకే void పాయింటర్ తో వేర్వేరు అడ్రస్ లని పట్టుకుందాం
    void *genericPtr;
    
    printf("--- Generic Programming in C ---\\n");
    
    // 1. Integer పాయింట్ చేయడం
    genericPtr = &age;
    printAnything(genericPtr, 'i');
    
    // 2. Float పాయింట్ చేయడం
    genericPtr = &salary;
    printAnything(genericPtr, 'f');
    
    // 3. Char పాయింట్ చేయడం
    genericPtr = &grade;
    printAnything(genericPtr, 'c');
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>void *genericPtr = &amp;age;</code>: కంపైలర్ ఇక్కడ ఎటువంటి ఎర్రర్ ఇవ్వదు. ఎందుకంటే void పాయింటర్ కి ఏ అడ్రస్ నైనా అతుక్కునే పవర్ ఉంది.</li>
        <li><code>*(int*)ptr</code>: ఇది రెండు పనులు చేస్తుంది. ఫస్ట్, ఆ బ్లాంక్ కీ ని ఇంటీజర్ కీ <code>(int*)</code> లాగా మారుస్తుంది (Typecast). సెకండ్, ఆ కీ కి ముందు స్టార్ <code>*</code> పెట్టి ఆ మెమరీ లోపల ఉన్న వాల్యూ (25) ని బయటికి లాగుతుంది.</li>
        <li><code>typeChar == 'i'</code>: మనం జెనెరిక్ గా పంపినప్పుడు, ఆ ఫంక్షన్ కి అది int అని ఎలా తెలుస్తుంది? తెలియదు! అందుకే మనం మ్యాన్యువల్ గా ఒక ఫ్లాగ్ (i, f, c) ని పంపి దానికి దారి చూపిస్తున్నాం.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: డైరెక్ట్ గా <code>*ptr</code> అని డీ-రిఫరెన్స్ ఎందుకు చేయకూడదు?</h4>
          <p>మీరు ఒక బాక్స్ ని ఓపెన్ చేయాలంటే అది ఎంత సైజు ఉందో కంపైలర్ కి తెలియాలి. <code>int</code> అయితే 4 బైట్స్ చదవాలి, <code>char</code> అయితే 1 బైట్ చదవాలి. కానీ <code>void</code> కి అసలు సైజు (Size) ఉండదు! అందుకే <code>*ptr</code> అని డైరెక్ట్ గా రాస్తే <em>"incomplete type"</em> అని కంపైలర్ క్రాష్ అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Void పాయింటర్ కి <code>ptr++</code> (Pointer Arithmetic) చేయొచ్చా?</h4>
          <p>స్టాండర్డ్ C (ISO C) ప్రకారం చేయకూడదు! ఎందుకంటే దానికి బైట్ సైజు తెలీదు కాబట్టి నెక్స్ట్ ఐటమ్ కి ఎంత దూరం జంప్ చేయాలో కంపైలర్ కి అర్థం కాదు. కానీ GCC కంపైలర్ (Linux లో వాడేది) దాన్ని 1-బైట్ జంప్ లాగా ట్రీట్ చేసి అలోవ్ చేస్తుంది. అయినా ఇది వాడకపోవడమే బెస్ట్ ప్రాక్టీస్.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>NULL</code> పాయింటర్ కి, <code>void</code> పాయింటర్ కి తేడా ఏంటి?</h4>
          <p><code>NULL</code> అంటే ఆ పాయింటర్ లో ఏ అడ్రస్ లేదు (అంటే అది గాలిలో ఉంది, ఒక వేల్యూ లాంటిది). కానీ <code>void *</code> అనేది ఒక పాయింటర్ కి కులం (Type) లేదు అని చెప్తుంది. ఒక <code>void *ptr = NULL;</code> అని రాస్తే, కులం లేని పాయింటర్ లో అడ్రస్ కూడా లేదు అని అర్థం.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 43, "Phase 15", "Advanced Pointers", subtopics, contentBody, '42-c-function-pointers-and-callbacks.html', '42. Function Pointers & Callbacks', '44-c-bitwise-and-or-xor-not-operators.html', '44. Bitwise Operators');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson44() {
  const title = "Bitwise AND, OR, XOR, NOT (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో హార్డ్వేర్ తో డైరెక్ట్ గా మాట్లాడాలంటే Bitwise ఆపరేటర్స్ ఎలా వాడాలి? 0s మరియు 1s (బైనరీ లెవల్) లో AND (&), OR (|), XOR (^), NOT (~) ఎలా పనిచేస్తాయో రియల్ యానిమేటెడ్ ఎగ్జాంపుల్స్ తో చూద్దాం.";
  const filename = "44-c-bitwise-and-or-xor-not-operators.html";
  const subtopics = "Binary Number System · Bitwise AND (&) · OR (|) · XOR (^) · NOT (~) · Hardware Control";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంతవరకు మనం రాసిన మ్యాథ్స్ (<code>+</code>, <code>-</code>) అంతా డెసిమల్ (మనుషులు వాడే 10, 20) నంబర్స్ మీదే జరిగింది. కానీ కంప్యూటర్ లోపల సిపియు కి తెలిసింది కేవలం కరెంట్ ఆన్ (1) లేదా కరెంట్ ఆఫ్ (0) మాత్రమే! మీరు హార్డ్వేర్ చిప్స్ ప్రోగ్రామింగ్ చేయాలన్నా (Embedded C), లేదా మైక్రోకంట్రోలర్ లో ఒక సెన్సార్ ని ఆన్ చేయాలన్నా <strong>Bitwise Operators</strong> వాడాల్సిందే! ఇవి డైరెక్ట్ గా RAM లో ఉన్న బిట్స్ (0s & 1s) లోపలికి చొచ్చుకుని వెళ్లి ఆపరేషన్స్ చేస్తాయి. ఇవి ఎలా పనిచేస్తాయో ఈరోజు క్రిస్టల్ క్లియర్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> బిట్స్ (Bits) అంటే ఏంటి? (The Matrix)</div>
    <div class="section-body">
      <p class="text-prose">
        ఒక నంబర్ 5 ని మీరు కంప్యూటర్ కి ఇస్తే, అది బైనరీ లోకి <code>0101</code> గా మారుతుంది. 3 ని ఇస్తే <code>0011</code> గా మారుతుంది. బిట్ వైజ్ ఆపరేటర్స్ డైరెక్ట్ గా ఆ బైనరీ డిజిట్స్ ని (వరుసగా నిలబెట్టి) క్యాలిక్యులేట్ చేస్తాయి.
      </p>
      
      <div class="deep-dive-card">
        <h3>🔌 రియల్ లైఫ్ స్టోరీ: స్విచ్ బోర్డ్ & బల్బ్స్ (The Logic Gates)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          ఒక రూమ్ లో రెండు స్విచ్ లు ఉన్నాయి. ఆ రెండూ ఒకే బల్బ్ కి కనెక్ట్ అయ్యి ఉన్నాయి అనుకోండి.<br><br>
          <strong>AND (<code>&amp;</code>) - స్ట్రిక్ట్ మేనేజర్:</strong> రెండు స్విచ్ లు (1 మరియు 1) ఆన్ లో ఉంటేనే బల్బ్ వెలుగుతుంది. ఏ ఒక్కటి ఆఫ్ (0) అయినా బల్బ్ వెలగదు. (ఉదాహరణ: యూజర్ నేమ్ అండ్ పాస్వర్డ్ రెండు కరెక్ట్ అయితేనే లాగిన్).<br><br>
          <strong>OR (<code>|</code>) - ఫ్రెండ్లీ మేనేజర్:</strong> ఏ ఒక్క స్విచ్ ఆన్ (1) అయినా చాలు బల్బ్ వెలుగుతుంది. రెండూ ఆఫ్ అయితేనే వెలగదు.<br><br>
          <strong>XOR (<code>^</code>) - ఆడ్ మ్యాన్ అవుట్:</strong> రెండు స్విచ్ లు వేర్వేరుగా (ఒకటి ఆన్, ఇంకోటి ఆఫ్) ఉంటేనే బల్బ్ వెలుగుతుంది. రెండు ఆన్ ఉన్నా ఆఫ్ అయిపోతుంది! ఇది ఎన్క్రిప్షన్ (పాస్వర్డ్స్ హైడ్ చేయడం) లో ఎక్కువగా వాడతారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> మ్యాథ్స్ వర్సెస్ బిట్ వైజ్ (The Magic)</div>
    <div class="section-body">
      <div class="memory-diagram">
ఉదాహరణకు 5 & 3 (AND) చేద్దాం:

  5  బైనరీ లో ->  0 1 0 1
  3  బైనరీ లో ->  0 0 1 1
  -----------------------
  AND (&) రిజల్ట్->  0 0 0 1  (రెండూ 1 ఉంటేనే 1 వస్తుంది)
  
అంటే 5 & 3 రిజల్ట్ = 1 అన్నమాట!</div>
      <p class="text-prose">
        <strong>NOT (<code>~</code>) ఆపరేటర్:</strong> ఇది సింగిల్ స్విచ్ ని ఫ్లిప్ చేస్తుంది. అంటే 1 ఉంటే 0 చేస్తుంది, 0 ఉంటే 1 చేస్తుంది (Invert).
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Bitwise in Action)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో 5 మరియు 3 కి AND, OR, XOR లు అప్లై చేసినప్పుడు ఫైనల్ అవుట్పుట్ ఏమొస్తుందో కంపైలర్ ద్వారా లైవ్ గా చూద్దాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Bitwise Operators</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int a = 5;  // బైనరీ: 0000 0101
    int b = 3;  // బైనరీ: 0000 0011
    
    printf("--- Bitwise Operations ---\\n");
    printf("a = %d (0101), b = %d (0011)\\n\\n", a, b);
    
    // 1. Bitwise AND (&)
    int and_result = a & b; 
    printf("a & b (AND) = %d  -> [0001]\\n", and_result); // 1
    
    // 2. Bitwise OR (|)
    int or_result = a | b;
    printf("a | b (OR)  = %d  -> [0111]\\n", or_result);  // 7
    
    // 3. Bitwise XOR (^)
    int xor_result = a ^ b;
    printf("a ^ b (XOR) = %d  -> [0110]\\n", xor_result); // 6
    
    // 4. Bitwise NOT (~)
    // నెగటివ్ నంబర్స్ ని 2's Complement లో రిప్రజెంట్ చేస్తారు కాబట్టి -6 వస్తుంది
    int not_result = ~a;
    printf("~a    (NOT) = %d -> [1111 1010]\\n", not_result); // -6
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>a | b</code>: 0101 మరియు 0011 కి మధ్య <code>OR</code>. ఏ ఒక్కటి 1 ఉన్నా ఆన్సర్ 1 కాబట్టి, <code>0111</code> వస్తుంది. బైనరీ లో 0111 అంటే డెసిమల్ లో 7.</li>
        <li><code>a ^ b</code>: XOR ఆపరేటర్. 0101 మరియు 0011 లో సేమ్ ఉన్నవి 0 అయిపోతాయి, డిఫరెంట్ ఉన్నవి 1 అవుతాయి. కాబట్టి <code>0110</code> వస్తుంది. దాన్ని ప్రింట్ చేస్తే 6 వచ్చింది.</li>
        <li><code>~a</code>: NOT ఆపరేటర్. 5 అంటే <code>0000 0101</code> (32-bit లో). దాన్ని అంతా ఫ్లిప్ చేస్తే <code>1111...1010</code> అవుతుంది. C కంపైలర్ ఫస్ట్ బిట్ 1 ఉంటే దాన్ని మైనస్ (Negative) వాల్యూ గా తీసుకుంటుంది (2's complement ప్రకారం). కాబట్టి అది -6 అవుతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: లాజికల్ <code>&amp;&amp;</code> కి, బిట్ వైజ్ <code>&amp;</code> కి తేడా ఏంటి?</h4>
          <p>చాలా మంది కన్ఫ్యూజ్ అవుతారు! లాజికల్ <code>&amp;&amp;</code> (డబుల్) అనేది ఒక కండిషన్ (if) ట్రూ నా ఫాల్స్ నా అని మాత్రమే చెక్ చేస్తుంది. కానీ సింగిల్ <code>&amp;</code> అనేది లోపల ఉన్న బైనరీ 0s అండ్ 1s లోకి దూరి ఒక కొత్త నంబర్ ని జనరేట్ చేస్తుంది. <code>if(5 &amp;&amp; 3)</code> అంటే ట్రూ, కానీ <code>5 &amp; 3</code> అంటే 1 అనే నంబర్ వస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ఒక నంబర్ ఈవెన్ (Even) ఆ ఆడ్ (Odd) ఆ అని మోడ్యులో (%) లేకుండా ఎలా చెప్పాలి?</h4>
          <p>దీనికి బిట్ వైజ్ అండ్ (<code>&amp;</code>) సూపర్ ట్రిక్! <code>if (num &amp; 1)</code> అని రాస్తే చాలు. ఏ నంబర్ కి అయినా లాస్ట్ బైనరీ బిట్ 1 ఉంటే అది ఆడ్ నంబర్, 0 ఉంటే ఈవెన్ నంబర్. మోడ్యులో (<code>%2</code>) వాడటం కన్నా ఇది 10 రెట్లు ఫాస్ట్ గా కంపైల్ అవుతుంది!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: మూడో వేరియబుల్ లేకుండా రెండు నంబర్స్ ని మార్చడం (Swap) ఎలా?</h4>
          <p>ఇది ఇంటర్వ్యూలలో ఫేమస్ క్వశ్చన్. మీరు XOR (<code>^</code>) ఆపరేటర్ వాడి మ్యాజిక్ చేయొచ్చు! <code>a = a ^ b; b = a ^ b; a = a ^ b;</code> అని రాస్తే <code>a</code> లోకి <code>b</code> వాల్యూ, <code>b</code> లోకి <code>a</code> వాల్యూ ఆటోమేటిక్ గా స్వాప్ అయిపోతాయి (ఎక్స్ట్రా మెమరీ అవసరం లేకుండా).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 44, "Phase 16", "Bitwise & Low-Level", subtopics, contentBody, '43-c-void-pointers-and-generic-programming.html', '43. Void Pointers', '45-c-shift-operators-and-fast-math.html', '45. Shift Operators & Fast Math');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson45() {
  const title = "Shift Operators (<<, >>) & Fast Math (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో క్యాలిక్యులేటర్ లేకుండా 2 తో గుణకారం (Multiply) లేదా భాగారం (Divide) 100 రెట్లు ఫాస్ట్ గా ఎలా చేయాలి? Left Shift (<<) మరియు Right Shift (>>) ఆపరేటర్స్ ఎలా పనిచేస్తాయో యానిమేషన్ లెవెల్ ఎక్స్‌ప్లనేషన్ తో చూద్దాం.";
  const filename = "45-c-shift-operators-and-fast-math.html";
  const subtopics = "Left Shift (<<) · Right Shift (>>) · Fast Multiplication · Fast Division · Bit Overflow";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్ సీపీయూ (CPU) కి కూడిక (Addition) చేయడం చాలా ఈజీ. కానీ గుణకారం (Multiplication) మరియు భాగహారం (Division) చేయాలంటే దానికి చాలా టైమ్ (CPU Cycles) పడుతుంది. మీరు ఒక 3D గేమ్ ఆడుతున్నప్పుడు ఫ్రేమ్-రేట్ (FPS) పడిపోకుండా ఉండాలంటే, అందులో వాడే మ్యాథ్స్ సూపర్ ఫాస్ట్ గా జరగాలి. అప్పుడు ప్రోగ్రామర్స్ నార్మల్ <code>*</code> లేదా <code>/</code> వాడకుండా, <strong>Shift Operators (<code>&lt;&lt;</code>, <code>&gt;&gt;</code>)</strong> ని ఆయుధాలుగా వాడతారు. ఇవి అసలు క్యాలిక్యులేషన్ చేయకుండానే, కేవలం బిట్స్ ని జరపడం ద్వారా మ్యాథ్స్ ఎలా చేస్తాయో ఈరోజు అద్భుతంగా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Left Shift (<code>&lt;&lt;</code>) అంటే ఏంటి? (Fast Multiply)</div>
    <div class="section-body">
      <p class="text-prose">
        డెసిమల్ (నార్మల్ నంబర్స్) లో ఒక నంబర్ పక్కన సున్నా (0) యాడ్ చేస్తే ఏమవుతుంది? 5 కాస్తా 50 అవుతుంది (అంటే 10 తో గుణించినట్లు). అలాగే బైనరీ సిస్టమ్ లో ఒక నంబర్ పక్కన సున్నా యాడ్ చేస్తే, అది <strong>2 తో గుణించినట్లు (Multiplied by 2)!</strong>
      </p>
      
      <div class="memory-diagram">
ఒక బైనరీ నంబర్ ని పక్కకి జరుపుదాం (Left Shift):

నార్మల్ 5        -> 0000 0101
Left Shift (5 << 1) -> 0000 1010  (ఇది బైనరీ లో 10 కి సమానం)
Left Shift (5 << 2) -> 0001 0100  (ఇది బైనరీ లో 20 కి సమానం)</div>
      
      <p class="text-prose">
        <strong>రూల్:</strong> <code>x &lt;&lt; n</code> అంటే ఆ నంబర్ ని (2 పవర్ n) తో గుణించడం. (ఉదా: <code>x &lt;&lt; 3</code> అంటే <code>x * 8</code> అన్నమాట). ఇది CPU లో ఒకే ఒక క్లాక్ సైకిల్ లో అయిపోయే అత్యంత ఫాస్ట్ క్యాలిక్యులేషన్!
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> Right Shift (<code>&gt;&gt;</code>) అంటే ఏంటి? (Fast Divide)</div>
    <div class="section-body">
      <p class="text-prose">
        ఇది లెఫ్ట్ షిఫ్ట్ కి రివర్స్. ఒక నంబర్ కి కుడి వైపున (Right side) ఉన్న లాస్ట్ బిట్ ని చెరిపేసి (కట్ చేసి), నంబర్ ని కిందకు జరుపుతుంది. ఇది <strong>2 తో భాగాహారం (Divided by 2)</strong> చేసినట్లు రిజల్ట్ ఇస్తుంది.
      </p>
      <p class="text-prose">
        <strong>రూల్:</strong> <code>20 &gt;&gt; 1</code> చేస్తే లాస్ట్ లో ఉన్న ఒక బిట్ పోయి అది 10 అవుతుంది. <code>20 &gt;&gt; 2</code> చేస్తే (4 తో డివైడ్ అయ్యి) 5 వస్తుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Shift Math Magic)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో నార్మల్ ఆపరేటర్స్ బదులు, షిఫ్ట్ ఆపరేటర్స్ వాడి ఒక నంబర్ ని పెంచడం (Multiply) మరియు తగ్గించడం (Divide) ఎలా చేసామో చూద్దాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Shift Operators</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main() {
    int num = 10;
    
    printf("--- Fast Math with Shifts ---\\n");
    printf("Original Number : %d\\n\\n", num);
    
    // ------------------------------------
    // Left Shift (<<) - Multiplication
    // ------------------------------------
    // 10 ని లెఫ్ట్ వైపుకి 1 స్టెప్ జరుపుతాం (అంటే 10 * 2^1)
    int mul2 = num << 1; 
    printf("num << 1 (x 2)  : %d\\n", mul2);
    
    // 10 ని లెఫ్ట్ వైపుకి 3 స్టెప్స్ జరుపుతాం (అంటే 10 * 2^3 = 10 * 8)
    int mul8 = num << 3;
    printf("num << 3 (x 8)  : %d\\n\\n", mul8);
    
    // ------------------------------------
    // Right Shift (>>) - Division
    // ------------------------------------
    int highNum = 40;
    printf("High Number     : %d\\n", highNum);
    
    // 40 ని రైట్ వైపుకి 1 స్టెప్ జరుపుతాం (అంటే 40 / 2^1)
    int div2 = highNum >> 1;
    printf("highNum >> 1 (/ 2): %d\\n", div2);
    
    // 40 ని రైట్ వైపుకి 2 స్టెప్స్ జరుపుతాం (అంటే 40 / 2^2 = 40 / 4)
    int div4 = highNum >> 2;
    printf("highNum >> 2 (/ 4): %d\\n", div4);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>num &lt;&lt; 1</code>: 10 యొక్క బైనరీ <code>0000 1010</code>. దాన్ని ఒక అడుగు ఎడమకు (Left) జరిపితే, కుడివైపు ఖాళీ అయిన ప్లేస్ లో <code>0</code> వస్తుంది. అప్పుడు అది <code>0001 0100</code> అవుతుంది. దీని డెసిమల్ వాల్యూ 20!</li>
        <li><code>highNum &gt;&gt; 2</code>: 40 యొక్క బైనరీ <code>0010 1000</code>. దాన్ని రెండు అడుగులు కుడికి (Right) జరిపితే, లాస్ట్ ఉన్న రెండు సున్నాలు బయటకి పడిపోయి డిలీట్ అవుతాయి. అప్పుడు <code>0000 1010</code> (అంటే 10) మిగులుతుంది.</li>
        <li><strong>గమనిక:</strong> ఇవి కేవలం పవర్ ఆఫ్ 2 (2, 4, 8, 16) తో గుణించడానికి లేదా భాగించడానికి మాత్రమే పనికొస్తాయి. మీరు 3 తో గుణించాలంటే ఇది పనిచేయదు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: పెద్ద నంబర్ (ఉదా: 250) ని <code>&lt;&lt;</code> చేస్తే ఏమవుతుంది?</h4>
          <p>C లాంగ్వేజ్ లో ఒక <code>char</code> సైజు 8 బిట్స్ (గరిష్టంగా 255). మీరు 250 ని షిఫ్ట్ చేస్తే ఆ బిట్స్ కింద పడిపోయి (Overflow అయ్యి) మీకు గార్బేజ్ రిజల్ట్ లేదా రాంగ్ వాల్యూస్ వస్తాయి. దీన్నే <strong>Bit Overflow</strong> అంటారు. డేటా టైప్ లిమిట్ దాటకుండా జాగ్రత్త పడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: నెగటివ్ నంబర్స్ (ఉదా: -10) ని రైట్ షిఫ్ట్ (<code>&gt;&gt;</code>) చేస్తే ఏమవుతుంది?</h4>
          <p>ఇది కంపైలర్ మీద ఆధారపడి ఉంటుంది. నెగటివ్ నంబర్స్ ని షిఫ్ట్ చేసినప్పుడు, ఖాళీ అయిన ప్లేస్ లో 1 యాడ్ అవుతుందా లేక 0 యాడ్ అవుతుందా (Arithmetic Shift vs Logical Shift) అనేది ఆపరేటింగ్ సిస్టమ్ ని బట్టి మారుతుంది. అందుకే ప్రొఫెషనల్స్ ఎప్పుడూ <code>unsigned int</code> వాడినప్పుడే షిఫ్ట్ ఆపరేటర్స్ వాడుతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>1 &lt;&lt; n</code> అంటే ఏంటి? ఎందుకు ఎక్కువగా వాడతారు?</h4>
          <p>దీన్ని <strong>Setting a Bit</strong> అంటారు! మీరు <code>1 &lt;&lt; 3</code> అని రాస్తే బైనరీ లో <code>0000 1000</code> వస్తుంది. హార్డ్వేర్ లో (ఉదా: LED లైట్ లేదా మోటార్) 3వ పిన్ ని మాత్రమే ఆన్ చేయడానికి సిస్టమ్ ప్రోగ్రామర్స్ ఈ ట్రిక్ ని విపరీతంగా వాడతారు. దీన్నే Bit Masking అంటారు (తర్వాతి లెసన్ లో నేర్చుకుందాం).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 45, "Phase 16", "Bitwise & Low-Level", subtopics, contentBody, '44-c-bitwise-and-or-xor-not-operators.html', '44. Bitwise Operators', '46-c-bit-masking-flags-and-hardware-registers.html', '46. Bit Masking & Hardware');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson46() {
  const title = "Bit Masking, Flags & Hardware (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ తో హార్డ్వేర్ ని ఎలా కంట్రోల్ చేస్తారు? Bit Masking (బిట్ మాస్కింగ్) అంటే ఏంటి? ఎక్స్ట్రా మెమరీ వాడకుండా ఒకే వేరియబుల్ లో 8 రకాల ఆప్షన్స్ ని (Flags) ఆన్ లేదా ఆఫ్ ఎలా చేయాలో డీప్ గా చూద్దాం.";
  const filename = "46-c-bit-masking-flags-and-hardware-registers.html";
  const subtopics = "Bit Masking · Setting a Bit · Clearing a Bit · Toggling a Bit · Checking a Bit";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటిదాకా మనం నంబర్స్ ని అటూ ఇటూ జరిపాం. కానీ రియల్ వరల్డ్ లో, ఎంబెడెడ్ సిస్టమ్స్ (Embedded Systems) లేదా రోబోటిక్స్ ప్రోగ్రామింగ్ చేసేటప్పుడు, మీరు ఒక 8-బిట్ రిజిస్టర్ (Hardware Box) లో 3వ పిన్ కి కనెక్ట్ అయిన LED లైట్ ని మాత్రమే ఆన్ చేయాలి, మిగతావి టచ్ చేయకూడదు అనుకుంటే ఎలా? డైరెక్ట్ గా <code>num = 1;</code> అంటే మొత్తం అన్నీ ఆరిపోతాయి. ఇలాంటప్పుడు పర్టిక్యులర్ గా ఒకే ఒక్క బిట్ (Bit) మీద స్నిపర్ షాట్ లాగా ఆపరేషన్ చేయడాన్నే <strong>Bit Masking (బిట్ మాస్కింగ్)</strong> అంటారు. Set, Clear, Toggle అనే మూడు బ్రహ్మాస్త్రాలు ఎలా పనిచేస్తాయో ఈరోజు నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> బిట్ మాస్క్ (Bit Mask) అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        మాస్క్ (Mask) అంటే ఏంటి? మన ఫేస్ లో కళ్లు తప్ప మిగతా అంతా కవర్ చేస్తుంది. అలాగే కంప్యూటర్ లో మనకు కావాల్సిన బిట్ ని మాత్రమే ఓపెన్ చేసి, మిగతా వాటిని (సున్నాలతో) కవర్ చేసే ఒక స్పెషల్ నంబర్ ని <strong>Bit Mask</strong> అంటారు. దీన్ని జనరేట్ చేయడానికి మనం లాస్ట్ లెసన్ లో నేర్చుకున్న షిఫ్ట్ (<code>1 &lt;&lt; n</code>) వాడతాం.
      </p>

      <div class="deep-dive-card">
        <h3>🎯 4 మ్యాజిక్ ఫార్ములాస్ (The Cheat Sheet)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక లైట్ ని (<code>n</code>th బిట్) కంట్రోల్ చేయాలి అనుకుంటే, ముందు మాస్క్ <code>(1 &lt;&lt; n)</code> తయారుచేసుకోవాలి. ఆ తర్వాత:<br><br>
          <strong>1. Set a Bit (ఆన్ చేయడం):</strong> <code>REG = REG | (1 &lt;&lt; n);</code> (ఉన్నదాన్ని కదిలించకుండా, n వ బిట్ ని 1 చేస్తుంది).<br>
          <strong>2. Clear a Bit (ఆఫ్ చేయడం):</strong> <code>REG = REG &amp; ~(1 &lt;&lt; n);</code> (మాస్క్ ని రివర్స్ చేసి అండ్ చేస్తుంది, n వ బిట్ 0 అవుతుంది).<br>
          <strong>3. Toggle a Bit (స్విచ్ వేయడం):</strong> <code>REG = REG ^ (1 &lt;&lt; n);</code> (XOR వాడితే ఆన్ ఉంటే ఆఫ్, ఆఫ్ ఉంటే ఆన్ అవుతుంది).<br>
          <strong>4. Check a Bit (చెక్ చేయడం):</strong> <code>if (REG &amp; (1 &lt;&lt; n))</code> (ఆ బిట్ ఆన్ లో ఉందా లేదా అని చెప్తుంది).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (LED Control Simulator)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో మనం ఒక హార్డ్వేర్ రిజిస్టర్ లాంటి 8-bit వేరియబుల్ తీసుకుని, అందులో కరెక్ట్ గా 3వ లైట్ ని ఆన్, ఆఫ్ ఎలా చేస్తున్నామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Bit Masking (Flags)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// సులువు కోసం ఒక మాక్రో రాసుకుందాం (n వ బిట్ కోసం మాస్క్)
#define BIT_MASK(n) (1 << (n))

// బైనరీ ని మనుషుల కోసం డిస్ప్లే చేసే సింపుల్ ఫంక్షన్
void printBinary(unsigned char num) {
    for (int i = 7; i >= 0; i--) {
        printf("%d", (num & BIT_MASK(i)) ? 1 : 0);
    }
    printf("\\n");
}

int main() {
    // మన హార్డ్వేర్ స్టేటస్ (అన్ని లైట్స్ ఆఫ్ లో ఉన్నాయి)
    unsigned char PORT = 0; // 00000000
    
    printf("Initial PORT status: ");
    printBinary(PORT);
    
    // ------------------------------------
    // 1. SET (ఆన్ చేద్దాం): 3వ లైట్ ని ఆన్ చేయాలి
    // ------------------------------------
    PORT = PORT | BIT_MASK(3); 
    printf("After Setting bit 3: ");
    printBinary(PORT); // అవుట్పుట్: 00001000
    
    // ఇంకో లైట్ (1వ లైట్) కూడా ఆన్ చేద్దాం (పాతది పోదు)
    PORT = PORT | BIT_MASK(1);
    printf("After Setting bit 1: ");
    printBinary(PORT); // అవుట్పుట్: 00001010
    
    // ------------------------------------
    // 2. TOGGLE (రివర్స్ చేద్దాం): 1వ లైట్ ని టోగుల్ చేద్దాం
    // ------------------------------------
    PORT = PORT ^ BIT_MASK(1);
    printf("After Toggle bit 1 : ");
    printBinary(PORT); // అవుట్పుట్: 00001000 (ఆఫ్ అయింది)
    
    // ------------------------------------
    // 3. CLEAR (ఆఫ్ చేద్దాం): 3వ లైట్ ని ఆఫ్ చేద్దాం
    // ------------------------------------
    PORT = PORT & ~(BIT_MASK(3));
    printf("After Clear bit 3  : ");
    printBinary(PORT); // అవుట్పుట్: 00000000 (మొత్తం ఆఫ్)
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>BIT_MASK(3)</code>: ఇది బ్యాక్ గ్రౌండ్ లో <code>1 &lt;&lt; 3</code> అవుతుంది. బైనరీ లో ఇది <code>0000 1000</code> కి సమానం. దీన్నే మాస్క్ అంటారు.</li>
        <li><code>PORT | BIT_MASK(3)</code>: OR (<code>|</code>) ఆపరేటర్ ప్రాపర్టీ ఏంటంటే, ఎక్కడైనా 1 ఉంటే రిజల్ట్ లో 1 పెడుతుంది, 0 ఉంటే పాత వాల్యూ (పోర్ట్ లో ముందు ఉన్న వాల్యూ) నే ఉంచుతుంది. అందుకే కేవలం 3వ బిట్ మాత్రమే ఆన్ అవుతుంది!</li>
        <li><code>PORT &amp; ~(BIT_MASK(3))</code>: ముందు మాస్క్ ని NOT (<code>~</code>) చేసాం. అప్పుడు <code>0000 1000</code> కాస్తా <code>1111 0111</code> అయ్యింది. దాన్ని అండ్ (<code>&amp;</code>) చేస్తే, ఆ ఒక్క బిట్ దగ్గర 0 ఉంది కాబట్టి అది 0 అయిపోయి ఆఫ్ అవుతుంది, మిగతావన్నీ 1 తో అండ్ అయ్యి ఎలా ఉన్నాయో అలానే ఉంటాయి!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఈ బిట్ మాస్కింగ్ కేవలం ఎంబెడెడ్ హార్డ్వేర్ లోనే వాడతారా? సాఫ్ట్వేర్ లో వాడరా?</h4>
          <p>సాఫ్ట్వేర్ లో కూడా విపరీతంగా వాడతారు! ఒక యూజర్ కి 8 రకాల పర్మిషన్స్ (Read, Write, Delete etc) ఇవ్వాలంటే, 8 వేరియబుల్స్ (8 బైట్స్) తీసుకునే బదులు, ఒకేఒక్క <code>char</code> వేరియబుల్ (1 బైట్) తీసుకుని అందులో 8 బిట్స్ ని 8 ఫ్లాగ్స్ లాగా వాడతారు (దీన్నే Flags అంటారు). విండోస్ API మొత్తం ఇలానే పనిచేస్తుంది (ఉదా: <code>MB_OK | MB_ICONERROR</code>).</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>num &amp; (num - 1)</code> అనే ఫేమస్ ఇంటర్వ్యూ క్వశ్చన్ ఏంటి?</h4>
          <p>చాలా కంపెనీస్ లో అడిగే బెస్ట్ ట్రిక్ ఇది! ఈ ఆపరేషన్ ఒక నంబర్ లో చివరగా ఉన్న '1' (Rightmost set bit) ని సున్నా (0) చేస్తుంది. ఒక నంబర్ ని పవర్ ఆఫ్ 2 (అంటే 2, 4, 8, 16 లాగా) అవునా కాదా అని కనుక్కోవడానికి <code>if ((num &amp; (num - 1)) == 0)</code> అని సింగిల్ లైన్ లో చెక్ చేయొచ్చు!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>1 &lt;&lt; 32</code> చేస్తే ఏమవుతుంది?</h4>
          <p>ఒక స్టాండర్డ్ ఇంట్ (int) 32-bits మాత్రమే ఉంటుంది. దాన్ని 32 సార్లు షిఫ్ట్ చేస్తే అది ఓవర్ ఫ్లో అయ్యి కంపైలర్ వార్నింగ్ ఇస్తుంది (Undefined Behavior). ఒకవేళ మీకు 64-బిట్ నంబర్స్ కావాలంటే <code>1ULL &lt;&lt; 40</code> (Unsigned Long Long) అని స్పెసిఫై చేయాలి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 46, "Phase 16", "Bitwise & Low-Level", subtopics, contentBody, '45-c-shift-operators-and-fast-math.html', '45. Shift Operators & Fast Math', '47-c-bit-fields-and-struct-packing.html', '47. Bit Fields & Struct Packing');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson47() {
  const title = "Bit Fields & Struct Packing (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో స్ట్రక్చర్స్ వాడినప్పుడు మెమరీ ఎలా వేస్ట్ అవుతుంది? Bit Fields (బిట్ ఫీల్డ్స్) వాడి ఒక్కో వేరియబుల్ కి కేవలం కొన్ని బిట్స్ మాత్రమే ఎలా అలకేట్ చేయాలి? ప్యాకింగ్ (Struct Packing) గురించి డీప్ గా తెలుసుకుందాం.";
  const filename = "47-c-bit-fields-and-struct-packing.html";
  const subtopics = "Struct Padding Waste · Bit Fields Syntax · Custom Bit Sizes · Hardware Structs";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంతకుముందు లెసన్ లో మనం 8 ఆప్షన్స్ ని ఒకే బైట్ లో పెట్టడానికి మ్యాన్యువల్ గా (మాస్కింగ్) వాడి కోడ్ రాసాం కదా! అది కొంచెం తలనొప్పి పని. దాన్ని సింపుల్ చేయడానికి, C లాంగ్వేజ్ కంపైలర్ ఒక అద్భుతమైన ఫీచర్ ఇచ్చింది. అదే <strong>Bit Fields (బిట్ ఫీల్డ్స్)</strong>. దీని ద్వారా మీరు ఒక స్ట్రక్చర్ (Structure) లోపల ఉన్న వేరియబుల్ కి "నాకు 4 బైట్స్ వద్దు, కేవలం 3 బిట్స్ మాత్రమే ఇవ్వు" అని డైరెక్ట్ గా ఆర్డర్ వేయొచ్చు! స్పేస్ సాటిలైట్స్, IoT డివైజెస్ లో మెమరీని ఒక్క బైట్ కూడా వేస్ట్ కాకుండా ఎలా ప్యాక్ (Pack) చేస్తారో ఈరోజు చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు ప్రాబ్లమ్ ఏంటి? (The Memory Waste)</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక కారు ఇంజిన్ స్టేటస్ గురించి కోడ్ రాస్తున్నారు. కార్ స్టార్ట్ అయిందా (0 లేదా 1), గేర్ నంబర్ ఎంత (1 నుండి 5 వరకు). దీన్ని స్ట్రక్చర్ లో రాస్తే:
      </p>
      <pre style="background:#0f141c; padding:15px; border-radius:8px; color:#38bdf8; font-family:'JetBrains Mono', monospace; font-size:14px;">
struct Car {
    unsigned int isStarted; // 1 ఆన్, 0 ఆఫ్
    unsigned int gear;      // 1 నుండి 5
};</pre>
      <p class="text-prose">
        మామూలుగా ఒక <code>int</code> కి 4 బైట్స్ (32 bits) పడుతుంది. రెండు ఇంట్స్ కి 8 బైట్స్ (64 bits) పడుతుంది! కానీ ఆన్/ఆఫ్ చెప్పడానికి మనకు 1 బిట్ చాలు (మిగతా 31 బిట్స్ గాలికి వదిలేసినట్లే). అలాగే గేర్ చెప్పడానికి 3 బిట్స్ చాలు (2^3 = 8). ఇంత మెమరీ వేస్ట్ కాకుండా అడ్డుకునేదే <strong>Bit Fields</strong>.
      </p>

      <div class="deep-dive-card">
        <h3>🧳 రియల్ లైఫ్ స్టోరీ: సూట్ కేసు సర్దడం (Struct Packing)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు టూర్ కి వెళ్తూ ఒక పెద్ద సూట్ కేసు కొన్నారు (ఇదే 4 బైట్స్ మెమరీ). అందులో ఒక చిన్న టూత్ బ్రష్ (1 బిట్ డేటా) వేశారు. కానీ రూల్ ఏంటంటే, టూత్ బ్రష్ పక్కన ఇంకేమీ పెట్టకూడదు, మరో వస్తువు కావాలంటే ఇంకో పెద్ద సూట్ కేసు కొనాల్సిందే అంటాడు కంపైలర్ (దీన్నే Padding అంటారు).<br><br>
          ఇలా అయితే ప్లేన్ లో స్థలం సరిపోదు కదా! అప్పుడు మీరు "Bit Fields" అనే జిప్ కవర్ వాడతారు. "ఒకే సూట్ కేసు లో, ఈ మూల టూత్ బ్రష్ (1 bit), పక్కన పేస్ట్ (3 bits), ఆ పక్కన ఇంకోటి ప్యాక్ చేయి" అని కంపైలర్ కి చెప్తారు. దాంతో ఒకే 4 బైట్స్ లో వంద రకాల డేటా ప్యాక్ అయిపోయి మెమరీ ఆదా అవుతుంది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> బిట్ ఫీల్డ్స్ సింటాక్స్ (Syntax)</div>
    <div class="section-body">
      <p class="text-prose">
        సింటాక్స్ చాలా సింపుల్. వేరియబుల్ డిక్లేర్ చేసాక పక్కన కోలన్ (<code>:</code>) పెట్టి మీకు ఎన్ని బిట్స్ కావాలో ఆ నంబర్ రాయాలి. 
      </p>
      <p class="text-prose">
        <code>unsigned int isStarted : 1;</code> (అంటే దీనికి ఒక్క బిట్ మాత్రమే ఇవ్వు అని అర్థం).
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Bit Field Packing)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో నార్మల్ స్ట్రక్చర్ కి మరియు బిట్ ఫీల్డ్ స్ట్రక్చర్ కి మధ్య ఎంత మెమరీ ఆదా అయ్యిందో (sizeof) లైవ్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Bit Fields</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 1. నార్మల్ స్ట్రక్చర్ (మెమరీ వేస్ట్)
struct NormalCar {
    unsigned int isStarted; // 32 bits
    unsigned int gear;      // 32 bits
    unsigned int hasAC;     // 32 bits
};

// 2. బిట్ ఫీల్డ్ స్ట్రక్చర్ (మెమరీ ప్యాకింగ్)
struct SmartCar {
    unsigned int isStarted : 1; // 1 bit (0 లేదా 1)
    unsigned int gear      : 3; // 3 bits (0 నుండి 7 వరకు పడుతుంది)
    unsigned int hasAC     : 1; // 1 bit
};

int main() {
    struct NormalCar car1;
    struct SmartCar car2;
    
    printf("--- Memory Size Comparison ---\\n");
    // NormalCar 3 ఇంటీజర్స్ కాబట్టి 12 Bytes తీసుకుంటుంది!
    printf("Normal Struct Size : %zu Bytes\\n", sizeof(car1));
    
    // SmartCar కేవలం 5 బిట్స్ మాత్రమే అడిగింది, కానీ కంపైలర్ మినిమం 1 ఇంటీజర్ (4 Bytes) ఇస్తుంది.
    // అయినా 12 బైట్స్ నుండి 4 బైట్స్ కి తగ్గింది!
    printf("Bit-Field Size     : %zu Bytes\\n\\n", sizeof(car2));
    
    // వాడుకునే విధానం సేమ్ నార్మల్ లాగానే ఉంటుంది!
    car2.isStarted = 1;
    car2.gear = 4;
    car2.hasAC = 0;
    
    printf("--- Car Status ---\\n");
    printf("Engine : %s\\n", car2.isStarted ? "ON" : "OFF");
    printf("Gear   : %d\\n", car2.gear);
    printf("AC     : %s\\n", car2.hasAC ? "ON" : "OFF");
    
    // ఒకవేళ లిమిట్ దాటి వాల్యూ ఇస్తే ఏమవుతుంది? (ఉదా: 3 bits అంటే మ్యాక్స్ 7)
    car2.gear = 9; // 9 బైనరీలో 1001 (4 bits). కానీ మనం 3 bits ఇచ్చాం కాబట్టి ఫస్ట్ బిట్ కట్ అవుతుంది.
    printf("\\n[!] Overflow Test (Gear=9) -> Saved as: %d\\n", car2.gear); // ఇది 1 వస్తుంది!
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>sizeof(NormalCar)</code>: ప్రతి వేరియబుల్ 4 బైట్స్, మొత్తం 3 ఉన్నాయి కాబట్టి 12 బైట్స్ (అంటే 96 బిట్స్) ఆక్రమించింది.</li>
        <li><code>sizeof(SmartCar)</code>: మనం అడిగింది కేవలం (1+3+1 = 5 బిట్స్). కంపైలర్ ఒక మెమరీ బ్లాక్ (4 బైట్స్ = 32 బిట్స్) తీసుకుని ఆ 5 బిట్స్ ని అందులోనే ప్యాక్ చేస్తుంది. మిగతా 27 బిట్స్ ఖాళీగా ఉంటాయి. సైజు 4 బైట్స్ మాత్రమే! (66% మెమరీ ఆదా).</li>
        <li><code>Overflow</code>: మీరు 3 బిట్స్ అడిగి అందులో 9 (<code>1001</code>) పెడితే, కంపైలర్ కుడివైపు ఉన్న 3 బిట్స్ (<code>001</code>) మాత్రమే ఉంచుకుని, ఎడమ వైపు ఉన్నది కట్ చేస్తుంది. అందుకే రిజల్ట్ 1 వచ్చింది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: బిట్ ఫీల్డ్స్ కి పాయింటర్స్ లేదా అడ్రస్ లు (<code>&amp;car2.gear</code>) వాడొచ్చా?</h4>
          <p>అస్సలు వాడలేరు! కంప్యూటర్ లో మెమరీ అడ్రస్ ఎప్పుడూ కనీసం 1 బైట్ (8 బిట్స్) కి ఒక అడ్రస్ ఉంటుంది. కానీ బిట్ ఫీల్డ్ అనేది 1 బిట్ లేదా 3 బిట్స్ కదా! దానికి అడ్రస్ అసలు ఉండదు. అందుకే <code>scanf("%d", &amp;car2.gear);</code> అని రాయడానికి ట్రై చేస్తే కంపైలర్ వెంటనే ఎర్రర్ ఇస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: నేను 33 బిట్స్ కావాలని <code>int size : 33;</code> అని అడగొచ్చా?</h4>
          <p>కుదరదు! మీరు బేస్ ఏ టైప్ ఇస్తారో దాని లిమిట్ దాటకూడదు. <code>int</code> కి మ్యాక్స్ 32 బిట్స్ మాత్రమే. అంతకంటే ఎక్కువ కావాలంటే దాన్ని పక్కన నార్మల్ వేరియబుల్ లాగా పెట్టుకోవాల్సిందే.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: నెట్వర్క్ ప్యాకెట్స్ (TCP/IP) లో బిట్ ఫీల్డ్స్ వాడతారా?</h4>
          <p>C లాంగ్వేజ్ ని నెట్వర్కింగ్ లో వాడటానికి అసలు కారణమే ఇది! ఒక నెట్వర్క్ ప్యాకెట్ లో హెడర్ సైజు చాలా చిన్నదిగా ఉండాలి (20 బైట్స్). అందులో 4 బిట్స్ IP వెర్షన్ కి, 4 బిట్స్ లెంగ్త్ కి ఇలా ప్రతి బిట్ ని లెక్కపెట్టి ప్యాక్ చేస్తారు. దానికి బిట్ ఫీల్డ్స్ పర్ఫెక్ట్ గా సూట్ అవుతాయి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 47, "Phase 16", "Bitwise & Low-Level", subtopics, contentBody, '46-c-bit-masking-flags-and-hardware-registers.html', '46. Bit Masking & Hardware', '48-c-error-handling-setjmp-longjmp.html', '48. Advanced Error Handling');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}


function run() {
  buildLesson43();
  buildLesson44();
  buildLesson45();
  buildLesson46();
  buildLesson47();
  console.log("✅ Generated C Lessons 43 to 47 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
