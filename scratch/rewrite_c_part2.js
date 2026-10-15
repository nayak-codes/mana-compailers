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
      color: #e6edf3;
      font-size: 15.5px;
      margin-bottom: 8px;
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
    /* New styles for beautiful typography */
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

// ==========================================
// LESSON 3: Data Types & Type Casting
// ==========================================
function buildLesson3() {
  const title = "Data Types, sizeof & Type Casting (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో int, float, char డేటా టైప్స్ కి ఎంత మెమరీ అవసరం? ఒక టైప్ నుండి ఇంకో టైప్ కి (Type Casting) డేటాని ఎందుకు మార్చాలి? డీప్ గా థియరీ పరంగా నేర్చుకుందాం.";
  const filename = "03-c-data-types-format-specifiers-and-type-casting.html";
  const subtopics = "డేటా టైప్స్ అంటే ఏంటి? · sizeof ఆపరేటర్ · Format Specifiers (%d, %f, %c) · Type Casting";

  const contentBody = `
    <div class="intro-box">
      <p>మనం పాత పాఠంలో Variables అంటే డబ్బాలు (Boxes) అని నేర్చుకున్నాం కదా? అయితే మనం స్టోర్ చేయాల్సిన వస్తువుని బట్టి ఆ డబ్బా సైజు మరియు రకం మారాలి. ఉదాహరణకు, మీరు ఒక ఉంగరం దాచుకోవాలంటే చిన్న బాక్స్ సరిపోతుంది, అదే మీ బట్టలు పెట్టుకోవాలంటే ఒక పెద్ద సూట్‌కేస్ కావాలి. ప్రోగ్రామింగ్ లో ఈ "బాక్స్ సైజులనే" <strong>Data Types (డేటా టైప్స్)</strong> అంటారు. ఈ పాఠంలో ఈ టైప్స్ ఎందుకు, వాటికి RAM లో ఎంత స్పేస్ కావాలి అన్నది క్లియర్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Data Types (డేటా టైప్స్) అవసరం ఏంటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        C లాంగ్వేజ్ చాలా స్మార్ట్ మరియు స్ట్రిక్ట్. మీరు కంప్యూటర్ కి ఒక నంబర్ ని ఇవ్వబోతున్నారా? లేక ఒక అక్షరాన్ని (Letter) ఇవ్వబోతున్నారా? అన్నది ముందుగానే దానికి చెప్పాలి. ఎందుకంటే దాన్ని బట్టి అది RAM లో మీకు ఎంత స్పేస్ ఇవ్వాలో డిసైడ్ చేసుకుంటుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">📦 రియల్ లైఫ్ స్టోరీ: కంటైనర్ సైజులు</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు నీళ్లు తాగడానికి గ్లాస్ (Glass) వాడతారు. అదే ఇంట్లో వాటర్ స్టోర్ చేయడానికి బిందె (Bucket) వాడతారు. ఒకవేళ మీరు బిందె అంత సైజు ఉన్న గ్లాస్ లో కేవలం ఒక చుక్క నీరు తాగితే, మిగతా డబ్బా అంతా వెస్ట్ కదా! <br><br>
          అలాగే, మీరు జస్ట్ మీ వయసు (Age: 25) స్టోర్ చేయడానికి చాలా పెద్ద మెమరీ బ్లాక్ అడిగితే RAM వేస్ట్ అయిపోతుంది. అందుకే <strong>int, float, char</strong> అనే వేర్వేరు డేటా టైప్స్ ని C లాంగ్వేజ్ మనకి ఇచ్చింది. దేనికి ఎంత స్పేస్ కావాలో అంతే అడగాలి!
        </p>
      </div>

      <ul style="color: var(--text); font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.9; margin-bottom: 20px;">
        <li><strong>int (Integer):</strong> పాయింట్లు లేని నంబర్స్ (ఉదా: 10, -5). వీటికి 4 బైట్స్ (32 bits) మెమరీ అవసరం.</li>
        <li><strong>float (Floating point):</strong> పాయింట్లు ఉన్న నంబర్స్ (ఉదా: 3.14, 99.9). వీటికి కూడా 4 బైట్స్ మెమరీ పడుతుంది.</li>
        <li><strong>char (Character):</strong> ఒకే ఒక్క అక్షరం (ఉదా: 'A', 'z'). దీనికి కేవలం 1 బైట్ (8 bits) మెమరీ చాలు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">2</span> Format Specifiers (ఫార్మాట్ స్పెసిఫైయర్స్) అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మనం ఒక వేరియబుల్ లో ఉన్న డేటాని <code>printf</code> ద్వారా స్క్రీన్ పై ప్రింట్ చేయాలంటే, కంప్యూటర్ కి అక్కడ ఏ రకమైన డేటా ప్రింట్ అవ్వబోతుందో చెప్పాలి. ఆ చెప్పే టెక్నిక్ నే <strong>Format Specifiers</strong> అంటారు.
      </p>
      <ul style="color: var(--text); font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.9; margin-bottom: 20px;">
        <li><code>%d</code> - ఇది Decimal (Integer) కోసం వాడతారు.</li>
        <li><code>%f</code> - ఇది Float నంబర్స్ కోసం వాడతారు.</li>
        <li><code>%c</code> - ఇది Character కోసం వాడతారు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> Type Casting (టైప్ కాస్టింగ్): ఒక టైప్ నుండి మరొక టైప్ కి మార్చడం</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కొన్నిసార్లు మనం ఇంటీజర్స్ (int) తో మ్యాథ్స్ చేస్తున్నప్పుడు, ఆన్సర్ పాయింట్లలో (float) రావచ్చు. కానీ రెండు int నంబర్స్ ని భాగిస్తే (divide), C కంపైలర్ మనకి ఆన్సర్ కూడా పాయింట్ లేకుండానే (int) ఇస్తుంది. ఇది లాజిక్ తప్పు కదా?
      </p>
      <p class="prose-paragraph">
        ఉదాహరణకి <code>5 / 2</code> చేస్తే నిజానికి ఆన్సర్ <code>2.5</code> రావాలి. కానీ C లాంగ్వేజ్ లో 5 అనేది int, 2 అనేది int. కాబట్టి ఆన్సర్ <code>2</code> మాత్రమే ఇస్తుంది. ఆ మిగిలిన <code>.5</code> ని కోసేస్తుంది. దీన్ని సాల్వ్ చేయడానికి మనం బలావంతంగా ఒక నంబర్ ని float గా మార్చాలి. దీన్నే <span class="prose-highlight">Type Casting</span> అంటారు. కింద కోడ్ లో చూడండి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Type Casting Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int total_marks = 420;
    int subjects = 5;
    
    // (float) అని రాయడం వల్ల total_marks టెంపరరీగా float గా మారుతుంది
    // అప్పుడు ఆన్సర్ కూడా పాయింట్లతో కరెక్ట్ గా వస్తుంది.
    float average = (float)total_marks / subjects;
    
    printf("Average marks: %.2f\\n", average);
    return 0;
}</code></pre>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 3, "Phase 02", "Variables & Data Types", subtopics, contentBody, '02-c-variables-declaration-and-memory-model.html', '2. Variables, Memory Model & Scope', '04-c-user-input-scanf-and-buffer-handling.html', '4. User Input (scanf) & Buffers');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

// ==========================================
// LESSON 4: User Input & Scanf
// ==========================================
function buildLesson4() {
  const title = "User Input (scanf) & Buffer Handling (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో scanf వాడి యూజర్ నుండి డేటాని ఎలా అడగాలి? scanf లో & ఎందుకు వాడుతాం? కీబోర్డ్ బఫర్ (Keyboard Buffer) అంటే ఏంటి? డీప్ థియరీతో నేర్చుకుందాం.";
  const filename = "04-c-user-input-scanf-and-buffer-handling.html";
  const subtopics = "scanf ఎలా పనిచేస్తుంది? · Ampersand (&) అవసరం · కీబోర్డ్ బఫర్ (Buffer) కాన్సెప్ట్";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు మనం మన వేరియబుల్స్ లో వాల్యూస్ ని డైరెక్ట్ గా కోడ్ లోనే రాశాము (ఉదా: <code>int a = 10;</code>). దీన్ని Hardcoding అంటారు. కానీ రియల్ సాఫ్ట్‌వేర్ అలా ఉండదు కదా! సాఫ్ట్‌వేర్ వాడుతున్న యూజర్ ఏ నంబర్ ఇస్తే దాని మీద క్యాలిక్యులేషన్ జరగాలి. ఇలా యూజర్ కీబోర్డ్ ద్వారా టైప్ చేసిన డేటాని మన C ప్రోగ్రామ్ లోపలికి తీసుకోవడానికి వాడే టూల్ పేరే <strong><code>scanf</code></strong> (Scan Format). ఈ పాఠంలో scanf ఎలా పనిచేస్తుంది, దాని వెనుక ఉన్న "అడ్రస్" కాన్సెప్ట్ ఏంటో క్లియర్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> scanf లో & (Ampersand) ఎందుకు వాడాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>printf</code> వాడేటప్పుడు మనం జస్ట్ వేరియబుల్ పేరు ఇస్తే సరిపోతుంది. కానీ <code>scanf</code> వాడేటప్పుడు మాత్రం వేరియబుల్ పేరుకు ముందు కచ్చితంగా <strong><code>&amp;</code></strong> (ఆంపర్సాండ్) సింబల్ పెట్టాలి. ఇది చాలామంది చేసే పెద్ద పొరపాటు. అసలు ఈ &amp; ఎందుకు పెట్టాలి?
      </p>

      <div class="story-box">
        <div class="story-box-title">🚚 రియల్ లైఫ్ స్టోరీ: అమెజాన్ డెలివరీ అడ్రస్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు అమెజాన్ లో ఒక లాప్ టాప్ ఆర్డర్ చేశారు. ఆర్డర్ ఇచ్చేటప్పుడు మీరు జస్ట్ "మా ఊరు హైదరాబాద్" అని చెప్తే అమెజాన్ వాడు లాప్ టాప్ ని మీ చేతికి ఇవ్వగలడా? ఇవ్వలేడు! మీ ఇంటి కచ్చితమైన అడ్రస్ (డోర్ నంబర్, పిన్ కోడ్) ఇస్తేనే వాడు కరెక్ట్ గా వచ్చి మీకు డెలివరీ చేస్తాడు. <br><br>
          ఇక్కడ <strong>అమెజాన్ డెలివరీ బాయ్ = scanf</strong>. <br>
          మీరు కీబోర్డ్ లో టైప్ చేసిన డేటాని వాడు తీసుకొని, దాన్ని ఏ మెమరీ బాక్స్ లో (వేరియబుల్ లో) పెట్టాలో వాడికి తెలియాలి. అందుకే వేరియబుల్ ముందు <code>&amp;</code> పెడతాం. ఇక్కడ <code>&amp;</code> అంటే <strong>"Address of"</strong>. అంటే "ఈ డేటాని తీసుకెళ్లి ఈ అడ్రస్ లో పెట్టు" అని కంపైలర్ కి చెప్తున్నామన్నమాట!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> కీబోర్డ్ బఫర్ (Keyboard Buffer) అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఇది ఇంటర్వ్యూలలో ఎక్కువగా అడిగే కాన్సెప్ట్. మీరు కీబోర్డ్ పై <code>25</code> అని టైప్ చేసి Enter (ఎంటర్) నొక్కుతారు. ఈ 25 డైరెక్ట్ గా మీ ప్రోగ్రామ్ లోకి వెళ్ళదు. మధ్యలో <span class="prose-highlight">Buffer (బఫర్)</span> అనే ఒక వెయిటింగ్ రూమ్ ఉంటుంది. మీరు కొట్టిన 25, మరియు ఆ Enter బటన్ (అంటే <code>\\n</code>) రెండూ ఆ వెయిటింగ్ రూమ్ లో నిలబడతాయి.
      </p>
      <p class="prose-paragraph">
        అప్పుడు <code>scanf</code> వచ్చి అందులో ఉన్న 25 ని మాత్రమే తీసుకొని వేరియబుల్ లో పెడుతుంది. కానీ ఆ Enter బటన్ (<code>\\n</code>) ఇంకా అక్కడే ఉండిపోతుంది! దీనివల్ల నెక్స్ట్ టైం మీరు ఏదైనా అక్షరాన్ని (char) అడిగినప్పుడు, యూజర్ కి కీబోర్డ్ రాకుండానే, సిస్టమ్ ఆ పాత Enter బటన్ ని తీసుకుంటుంది. దీన్నే <strong>Buffer Problem</strong> అంటారు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒక చిన్న ఉదాహరణ</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఇప్పుడు <code>scanf</code> వాడి యూజర్ వయసు (Age) అడిగి, దాన్ని మళ్ళీ ఎలా ప్రింట్ చేయాలో చూద్దాం.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — scanf Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int age;
    
    // యూజర్ కి అర్థం కావడానికి ప్రింట్ చేస్తున్నాం
    printf("Enter your age: "); 
    
    // యూజర్ ఇచ్చిన వాల్యూ ని తీసుకొని 'age' అడ్రస్ లో పెడుతున్నాం
    scanf("%d", &age); 
    
    // దాన్ని మళ్ళీ ప్రింట్ చేస్తున్నాం (ఇక్కడ & అవసరం లేదు, ఎందుకంటే మనం బాక్స్ ఓపెన్ చేసి చదువుతున్నాం)
    printf("Wow, you are %d years old!\\n", age);
    
    return 0;
}</code></pre>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 4, "Phase 03", "Input & Operators", subtopics, contentBody, '03-c-data-types-format-specifiers-and-type-casting.html', '3. Data Types, sizeof & Type Casting', '05-c-operators-expressions-and-precedence.html', '5. Operators, Expressions & Precedence');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

// ==========================================
// LESSON 5: Operators & Precedence
// ==========================================
function buildLesson5() {
  const title = "Operators, Expressions & Precedence (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో మ్యాథమెటికల్ మరియు లాజికల్ ఆపరేటర్స్ ఎలా పనిచేస్తాయి? BODMAS రూల్ ని కంపైలర్ ఎలా ఫాలో అవుతుంది? Short-circuit లాజిక్ అంటే ఏంటో డీప్ గా తెలుసుకుందాం.";
  const filename = "05-c-operators-expressions-and-precedence.html";
  const subtopics = "Arithmetic Operators · Logical Operators (&&, ||) · Operator Precedence (BODMAS) · Short-circuit Evaluation";

  const contentBody = `
    <div class="intro-box">
      <p>డేటాని బాక్సుల్లో (Variables) పెట్టుకోవడం, యూజర్ నుండి ఇన్పుట్ తీసుకోవడం ఎలాగో నేర్చుకున్నాం. కానీ ఈ డేటాతో కంప్యూటర్ ఏం చేయాలి? ఎడిషన్లు (Additions), కండిషన్స్ చెక్ చేయడం లాంటివి చేయాలి. ఇందుకోసం C లాంగ్వేజ్ లో మనకు పనిముట్లు (Tools) కావాలి. ఆ పనిముట్లనే <strong>Operators (ఆపరేటర్స్)</strong> అంటారు. ఈ పాఠంలో ఆపరేటర్స్ రకాలు, అలాగే ఒకే ఈక్వేషన్ లో చాలా ఆపరేటర్స్ ఉంటే కంపైలర్ దేన్ని ముందు సాల్వ్ చేస్తుందో (Precedence) లాజికల్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Operators రకాలు</div>
    <div class="section-body">
      <p class="prose-paragraph">
        C లాంగ్వేజ్ లో చాలా రకాల ఆపరేటర్స్ ఉన్నాయి. వాటిలో ముఖ్యంగా రోజువారీ వాడేవి మూడు రకాలు:
      </p>

      <div class="deep-dive-card">
        <h3>⚡ 1. Arithmetic Operators (మ్యాథ్స్ కోసం):</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.9;">
          కూడికలు, తీసివేతలు చేయడానికి వాడేవి. <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> ఇవి అందరికీ తెలిసినవే. కానీ C లో <strong><code>%</code> (Modulo)</strong> అనే స్పెషల్ ఆపరేటర్ ఉంది. ఇది ఒక నంబర్ ని ఇంకో నంబర్ తో భాగించినప్పుడు వచ్చే "శేషం" (Remainder) ని ఇస్తుంది. <br>
          ఉదాహరణ: <code>10 % 3</code> చేస్తే ఆన్సర్ <code>1</code> వస్తుంది. (ఒక నంబర్ సరి సంఖ్య (Even) కాదా అని చెక్ చేయడానికి ఇది చాలా బాగా ఉపయోగపడుతుంది).
        </p>

        <h3 style="margin-top: 15px;">⚡ 2. Relational Operators (పోల్చడానికి):</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.9;">
          రెండు నంబర్స్ లో ఏది పెద్దది, ఏది చిన్నది, లేక రెండు సమానమా అని అడగడానికి ఇవి వాడతారు. <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, మరియు సమానం అని చెక్ చేయడానికి <strong><code>==</code></strong> (రెండు ఈక్వల్ టు లు) వాడతారు.
        </p>

        <h3 style="margin-top: 15px;">⚡ 3. Logical Operators (కండిషన్స్ కలపడానికి):</h3>
        <p style="color:var(--text2); font-size:14.5px; line-height:1.9;">
          ఒకటి కంటే ఎక్కువ కండిషన్స్ చెక్ చేయాల్సి వచ్చినప్పుడు వీటిని వాడతారు. <br>
          <strong><code>&amp;&amp;</code> (AND):</strong> మీరు పాస్ అవ్వాలంటే ఇంగ్లీష్ లో పాస్ అవ్వాలి <strong>మరియు</strong> మ్యాథ్స్ లో పాస్ అవ్వాలి. (రెండు కండిషన్స్ True అవ్వాలి).<br>
          <strong><code>||</code> (OR):</strong> ఆధార్ కార్డు <strong>లేదా</strong> పాన్ కార్డు ఏది ఉన్నా సరే సిమ్ కార్డ్ ఇస్తారు. (ఏదో ఒక్కటి True అయినా చాలు).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Operator Precedence (ఆపరేటర్ల ప్రాధాన్యత - C లో BODMAS)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మ్యాథ్స్ లో మనకు <code>BODMAS</code> రూల్ ఎలాగో, C లాంగ్వేజ్ లో <span class="prose-highlight">Operator Precedence</span> రూల్ ఉంటుంది. కంపైలర్ ఒక పెద్ద లైన్ ని చదివినప్పుడు దేన్ని ముందు క్యాలిక్యులేట్ చేయాలో దీన్ని బట్టే డిసైడ్ చేస్తుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🧠 లాజిక్ టెస్ట్: దీని ఆన్సర్ ఏంటి?</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          <code>int ans = 5 + 2 * 3;</code> <br><br>
          ఎవరైనా దీన్ని ఎడమ నుండి కుడికి చదివితే.. ముందుగా 5 + 2 = 7, ఆ తర్వాత 7 * 3 = 21 అని అనుకుంటారు. కానీ అది తప్పు! <br><br>
          C లాంగ్వేజ్ లో గుణకారం (<code>*</code>) కి ప్లస్ (<code>+</code>) కంటే ఎక్కువ పవర్ ఉంటుంది. కాబట్టి కంపైలర్ ముందుగా 2 * 3 = 6 చేస్తుంది. ఆ తర్వాత ఆ 6 కి 5 ని కలుపుతుంది. కాబట్టి ఫైనల్ ఆన్సర్ <strong>11</strong>. ఒకవేళ మీరు మీ రూల్ ని ఫోర్స్ చేయాలి అనుకుంటే బ్రాకెట్స్ <code>( )</code> వాడాలి. అప్పుడు బ్రాకెట్స్ లోపల ఉన్నదే ముందు సాల్వ్ అవుతుంది.
        </p>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 5, "Phase 03", "Input & Operators", subtopics, contentBody, '04-c-user-input-scanf-and-buffer-handling.html', '4. User Input (scanf) & Buffers', '06-c-conditional-branching-if-else-and-logical-operators.html', '6. Conditional Branching (if-else)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

function run() {
  buildLesson3();
  buildLesson4();
  buildLesson5();
}

run();
