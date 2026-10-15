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
// LESSON 6: Conditional Branching
// ==========================================
function buildLesson6() {
  const title = "Conditional Branching (if-else) (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో if, else ఎలా పనిచేస్తాయి? నిర్ణయాలు ఎలా తీసుకోవాలి? టోల్ గేట్ ఉదాహరణతో if-else ని డీప్ గా అర్థం చేసుకుందాం.";
  const filename = "06-c-conditional-branching-if-else-and-logical-operators.html";
  const subtopics = "if, else, else if బ్లాక్స్ · నెస్టెడ్ (Nested) If · లాజికల్ నిర్ణయాలు";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు మన ప్రోగ్రామ్ పై నుండి కిందికి లైన్ బై లైన్ గుడ్డిగా ఎగ్జిక్యూట్ చేసుకుంటూ వచ్చింది. కానీ మన నిజ జీవితం అలా ఉండదు కదా? మనం చాలా నిర్ణయాలు (Decisions) తీసుకుంటాం. ఉదాహరణకి వాన పడితే గొడుగు తీసుకెళ్తాం, లేకపోతే తీసుకెళ్లం. అలాగే మన ప్రోగ్రామ్ కూడా పరిస్థితిని బట్టి ఒక పని చేయాలా వద్దా అని నిర్ణయించుకోవాలి. దీనికోసమే మనం <strong>if-else (ఇఫ్-ఎల్స్)</strong> వాడుతాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> if-else అసలు ఎలా పనిచేస్తుంది?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>if</code> అంటే తెలుగులో "ఒకవేళ". <code>else</code> అంటే "లేకపోతే". మనం <code>if</code> పక్కన ఒక కండిషన్ రాస్తాం. ఆ కండిషన్ నిజమైతే (True) అందులో ఉన్న కోడ్ రన్ అవుతుంది. ఒకవేళ అది అబద్ధం (False) అయితే, <code>else</code> లో ఉన్న కోడ్ రన్ అవుతుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🛣️ రియల్ లైఫ్ స్టోరీ: హైవే టోల్ గేట్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఒక హైవే మీద వెళ్తున్నారు. ముందు ఒక టోల్ గేట్ వచ్చింది. అక్కడ ఒక నియమం ఉంది: <br><br>
          <strong>if (మీ దగ్గర FASTag ఉంటే) {</strong> <br>
          &nbsp;&nbsp;&nbsp;&nbsp;గేట్ ఆటోమేటిక్ గా ఓపెన్ అవుతుంది. మీరు వెళ్లిపోవచ్చు. <br>
          <strong>} else {</strong> <br>
          &nbsp;&nbsp;&nbsp;&nbsp;క్యాష్ కౌంటర్ దగ్గర ఆగి, ఫైన్ కట్టి వెళ్ళాలి. <br>
          <strong>}</strong> <br><br>
          అంటే ఒకటే కారుకి రెండు పనులు జరగవు. ఏదో ఒకటే జరుగుతుంది. ప్రోగ్రామింగ్ లో కూడా అంతే! <code>if</code> బ్లాక్ గాని, లేదా <code>else</code> బ్లాక్ గాని ఏదో ఒకటే రన్ అవుతుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> else if (చాలా ఆప్షన్స్ ఉన్నప్పుడు)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒకవేళ మీ దగ్గర రెండు కన్నా ఎక్కువ ఆప్షన్స్ ఉంటే, అప్పుడు <strong><code>else if</code></strong> వాడతాం. ఉదాహరణకు, మీరు ఒక స్టూడెంట్ గ్రేడ్ ని కాలిక్యులేట్ చేస్తున్నారు అనుకోండి. 90 వస్తే A గ్రేడ్, 80 వస్తే B గ్రేడ్, 70 వస్తే C గ్రేడ్. ఇలా కంటిన్యూ గా చెక్ చేయడానికి <code>else if</code> హెల్ప్ చేస్తుంది.
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — if-else Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int marks = 85;
    
    if (marks >= 90) {
        printf("Grade: A\\n");
    } else if (marks >= 80) {
        printf("Grade: B\\n");
    } else if (marks >= 70) {
        printf("Grade: C\\n");
    } else {
        printf("Grade: Fail\\n");
    }
    
    return 0;
}</code></pre>
      </div>
      <p class="prose-paragraph">
        పై కోడ్ లో కంపైలర్ పైనుండి వస్తుంది. <code>marks >= 90</code> అనేది False కాబట్టి కిందికి వస్తుంది. <code>marks >= 80</code> అనేది <strong>True</strong> (ఎందుకంటే 85 అనేది 80 కంటే పెద్దది). వెంటనే "Grade: B" ప్రింట్ చేసి, ఇంకా కిందికి వెళ్లకుండా మొత్తం బ్లాక్ నుండి బయటకు వచ్చేస్తుంది!
      </p>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 6, "Phase 04", "Conditional Statements", subtopics, contentBody, '05-c-operators-expressions-and-precedence.html', '5. Operators, Expressions & Precedence', '07-c-switch-case-statement-and-menu-driven-logic.html', '7. Switch Case & Menu Logic');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

// ==========================================
// LESSON 7: Switch Case
// ==========================================
function buildLesson7() {
  const title = "Switch Case & Menu Logic (తెలుగులో డీప్ ఎక్స్‌ప్లనేషన్)";
  const desc = "C లాంగ్వేజ్ లో Switch Case ఎందుకు వాడాలి? break కీవర్డ్ ఎలా పనిచేస్తుంది? రెస్టారెంట్ మెనూ ఉదాహరణతో డీప్ గా తెలుసుకుందాం.";
  const filename = "07-c-switch-case-statement-and-menu-driven-logic.html";
  const subtopics = "Switch Case నిర్మాణం · break మరియు default ప్రాముఖ్యత · if-else కి దీంట్లో తేడా ఏమిటి?";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు పాఠంలో <code>if-else</code> గురించి నేర్చుకున్నాం కదా. కానీ ఒకవేళ యూజర్ కి 10 ఆప్షన్స్ ఇవ్వాలంటే, 10 సార్లు <code>else if</code> రాసుకుంటూ వెళ్తే కోడ్ చదవడానికి చాలా కష్టంగా ఉంటుంది. ఇలాంటి "Multiple Choice" ఆప్షన్స్ ఉన్నప్పుడు, కోడ్ ని క్లీన్ గా రాయడానికి వచ్చిన బెస్ట్ టూల్ <strong>Switch Case (స్విచ్ కేస్)</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Switch Case ఎప్పుడు వాడాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక వేరియబుల్ వాల్యూ ని కేవలం "సమానమా కాదా (Equality)" అని చెక్ చేయడానికి మాత్రమే <code>switch</code> వాడతాం. (ఉదా: <code>x == 1</code>, <code>x == 2</code>). కానీ <code>x > 10</code> లాంటి పెద్ద చిన్న కండిషన్స్ కి switch పనికిరాదు.
      </p>

      <div class="story-box">
        <div class="story-box-title">🍔 రియల్ లైఫ్ స్టోరీ: రెస్టారెంట్ మెనూ</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          మీరు ఒక రెస్టారెంట్ కి వెళ్లారు. వెయిటర్ మీకు ఒక మెనూ కార్డు ఇచ్చాడు: <br>
          1 - బిర్యానీ <br>
          2 - ఫ్రైడ్ రైస్ <br>
          3 - నూడుల్స్ <br><br>
          మీరు "ఆప్షన్ 2" అని చెప్తే, వెయిటర్ డైరెక్ట్ గా ఆప్షన్ 2 కి సంబంధించిన ఫ్రైడ్ రైస్ మాత్రమే తెస్తాడు. అంతే కానీ వాడు బిర్యానీ ని కూడా చెక్ చేయడు కదా? <code>switch</code> కూడా అచ్చం ఇలాగే పనిచేస్తుంది! కంపైలర్ డైరెక్ట్ గా మీరు అడిగిన ఆప్షన్ <strong>(Case)</strong> దగ్గరికి మాత్రమే వెళ్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> 'break' మర్చిపోతే ఏమవుతుంది?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>switch</code> లోపల ప్రతి <code>case</code> చివర్లో కచ్చితంగా <strong><code>break;</code></strong> అని రాయాలి. ఒకవేళ రాయకపోతే, కంపైలర్ ఆ ఆప్షన్ కింద ఉన్న మిగతా ఆప్షన్స్ అన్నీ కూడా రన్ చేసుకుంటూ వెళ్లిపోతుంది! దీన్నే ప్రోగ్రామింగ్ పరిభాషలో <strong>Fall-through</strong> అంటారు. కింద కోడ్ లో చూడండి:
      </p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — switch case Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

int main(void) {
    int choice = 2;
    
    switch(choice) {
        case 1:
            printf("You ordered Biryani\\n");
            break;
        case 2:
            printf("You ordered Fried Rice\\n");
            break; // ఇది లేకపోతే కింది నూడుల్స్ కూడా ప్రింట్ అయిపోతుంది!
        case 3:
            printf("You ordered Noodles\\n");
            break;
        default:
            // మెనూ లో లేని నంబర్ ఇస్తే ఇది రన్ అవుతుంది
            printf("Invalid Option, please check the menu!\\n");
    }
    
    return 0;
}</code></pre>
      </div>
      <p class="prose-paragraph">
        ఇందులో ఉన్న <code>default</code> అనేది <code>if-else</code> లో ఉన్న <code>else</code> లాంటిది. యూజర్ పిచ్చి పిచ్చి నంబర్స్ ఇస్తే, వాడికి తప్పు అని చెప్పడానికి ఇది వాడతాం.
      </p>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 7, "Phase 04", "Conditional Statements", subtopics, contentBody, '06-c-conditional-branching-if-else-and-logical-operators.html', '6. Conditional Branching (if-else)', '08-c-loops-and-iterations-while-do-while-for.html', '8. Loops & Iterations');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
  console.log(`✅ Generated HIGH-VALUE SEO ${filename}`);
}

function run() {
  buildLesson6();
  buildLesson7();
}
run();
