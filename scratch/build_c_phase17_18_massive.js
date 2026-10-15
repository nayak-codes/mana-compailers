const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

const C_CURRICULUM = [
  {
    id: 'phase17', tag: 'Phase 17', title: 'Advanced Concepts', icon: '🧠',
    lessons: [
      { num: 48, file: '48-c-error-handling-setjmp-longjmp.html', title: '48. Error Handling (setjmp, longjmp)' },
      { num: 49, file: '49-c-variable-arguments-stdarg-h.html', title: '49. Variable Arguments (stdarg.h)' },
      { num: 50, file: '50-c-multi-threading-pthreads-basics.html', title: '50. Multi-threading in C (pthreads)' }
    ]
  },
  {
    id: 'phase18', tag: 'Phase 18', title: 'Data Structures - 1', icon: '🧱',
    lessons: [
      { num: 51, file: '51-c-linked-lists-singly-creation-traversal.html', title: '51. Singly Linked Lists - Basics' },
      { num: 52, file: '52-c-linked-lists-insertion-deletion.html', title: '52. Linked Lists - Insert & Delete' },
      { num: 53, file: '53-c-doubly-and-circular-linked-lists.html', title: '53. Doubly & Circular Linked Lists' },
      { num: 54, file: '54-c-stack-implementation-array-linkedlist.html', title: '54. Stack Implementation' },
      { num: 55, file: '55-c-queue-implementation-linear-circular.html', title: '55. Queue Implementation' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, setjmp longjmp c, variable arguments c, pthreads c, linked lists c, insert delete linked list" />
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

function buildLesson48() {
  const title = "Error Handling (setjmp, longjmp) (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Java/Python లాగా try-catch బ్లాక్స్ ఎందుకు లేవు? పెద్ద ప్రాజెక్ట్స్ లో ఎర్రర్ వస్తే ఒక ఫంక్షన్ నుండి ఇంకో ఫంక్షన్ కి డైరెక్ట్ గా ఎలా జంప్ చేయాలో setjmp మరియు longjmp వాడి డీప్ గా నేర్చుకుందాం.";
  const filename = "48-c-error-handling-setjmp-longjmp.html";
  const subtopics = "Exception Handling in C · setjmp() · longjmp() · Stack Unwinding · Goto vs Longjmp";

  const contentBody = `
    <div class="intro-box">
      <p>జావా (Java) లేదా పైథాన్ (Python) లాంటి మోడరన్ లాంగ్వేజెస్ లో ఏదైనా ఎర్రర్ వస్తే దాన్ని <code>try-catch</code> బ్లాక్ తో చాలా ఈజీగా హ్యాండిల్ చేస్తారు. కానీ మన C లాంగ్వేజ్ ఏమో 1970లలో పుట్టింది. అప్పట్లో ఈ <code>try-catch</code> లాంటి ఫ్యాన్సీ ఫీచర్స్ ఏమీ లేవు. మరి ఒక పెద్ద ప్రోగ్రామ్ లో ఎక్కడో లోపల (3వ లెవల్ ఫంక్షన్ లో) ఎర్రర్ వస్తే, అక్కడ నుండి డైరెక్ట్ గా మెయిన్ ఫంక్షన్ కి (బయటకి) ఎలా దూకాలి? దానికి C ఇచ్చిన రెండు మాయా అస్త్రాలే <strong><code>setjmp()</code> మరియు <code>longjmp()</code></strong>. ఇవి అచ్చం టైమ్-మెషిన్ లాగా పనిచేస్తాయి. అదెలాగో ఈరోజు డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> నార్మల్ గా ఎర్రర్స్ ఎలా హ్యాండిల్ చేస్తారు?</div>
    <div class="section-body">
      <p class="text-prose">
        సాధారణంగా C లో ఫంక్షన్స్ రిటర్న్ చేసే నంబర్స్ (<code>0</code> అంటే సక్సెస్, <code>-1</code> అంటే ఫెయిల్) ని చెక్ చేస్తూ <code>if...else</code> రాసుకుంటూ వెళ్తాము. కానీ ఒక ఫంక్షన్ ఇంకో ఫంక్షన్ ని కాల్ చేసి, అది ఇంకో ఫంక్షన్ ని కాల్ చేసినప్పుడు (A -> B -> C), C లో ఎర్రర్ వస్తే B కి చెప్పి, ఆ B వెళ్లి A కి చెప్పి... ఇదంతా చాలా పెద్ద ప్రాసెస్ అయిపోతుంది.
      </p>
      
      <div class="deep-dive-card">
        <h3>⏳ రియల్ లైఫ్ స్టోరీ: వీడియో గేమ్ లో సేవ్ పాయింట్ (Save Point)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక వీడియో గేమ్ ఆడుతున్నారు. ఒక సేఫ్ ప్లేస్ లో ఆటని సేవ్ చేసుకుంటారు (ఇదే <strong><code>setjmp</code></strong>). ఆ తర్వాత మీరు గేమ్ లో ముందుకు వెళ్లి, అడవిలోకి వెళ్లి, ఒక రాక్షసుడితో ఫైట్ చేసి (అదే ఫంక్షన్ కాల్స్) చనిపోతారు (Error).<br><br>
          చనిపోగానే మీరు మళ్ళీ నడుచుకుంటూ వెనక్కి రారు కదా! డైరెక్ట్ గా ఎక్కడ సేవ్ చేసారో అక్కడికే టెలిపోర్ట్ (Teleport) అయిపోతారు. ఆ టెలిపోర్ట్ చేసే పవరే <strong><code>longjmp</code></strong>. C ప్రోగ్రామ్ లో కూడా మీరు <code>longjmp</code> వాడితే, కంపైలర్ డైరెక్ట్ గా పాత <code>setjmp</code> దగ్గరికి దూకేస్తుంది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> goto వర్సెస్ longjmp</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు <code>goto</code> వాడి కూడా వేరే లైన్ కి దూకవచ్చు కదా అనుకోవచ్చు. కానీ <code>goto</code> కేవలం అదే ఫంక్షన్ లోపల (Local) మాత్రమే దూకగలదు. మీరు వేరే ఫంక్షన్ లో ఉండి, మెయిన్ ఫంక్షన్ కి దూకాలంటే <code>goto</code> పనిచేయదు. <strong><code>longjmp</code></strong> అనేది ఫంక్షన్స్ మధ్య బోర్డర్స్ ని దాటి (Non-local jump) దూకగలదు!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Try-Catch Simulation)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో డివిజన్ బై జీరో (Division by Zero) ఎర్రర్ వచ్చినప్పుడు, లోపలి ఫంక్షన్ నుండి డైరెక్ట్ గా బయటికి ఎలా దూకామో యానిమేటెడ్ లాగా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — setjmp & longjmp</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;setjmp.h&gt; // ఈ హెడ్డర్ ఫైల్ కచ్చితంగా ఉండాలి

// సేవ్ పాయింట్ ని స్టోర్ చేసుకోవడానికి ఒక గ్లోబల్ బఫర్
jmp_buf save_point;

// ఒక ప్రమాదకరమైన ఫంక్షన్ (B)
void divide_numbers(int a, int b) {
    printf("  [Inside Function] Trying to divide %d by %d...\\n", a, b);
    
    if (b == 0) {
        printf("  [Error!] Division by Zero detected! Jumping back!\\n");
        // ఎర్రర్ వస్తే డైరెక్ట్ గా బేస్ క్యాంప్ (save_point) కి దూకేయ్!
        // 1 అనే కోడ్ తో దూకుతున్నాం (ఇది క్యాచ్ బ్లాక్ కి సిగ్నల్)
        longjmp(save_point, 1);
    }
    
    // ఒకవేళ ఎర్రర్ రాకపోతే నార్మల్ గా రిజల్ట్ ఇస్తుంది
    printf("  [Success] Result is: %d\\n", a / b);
}

// మెయిన్ ఫంక్షన్ (A)
int main() {
    printf("--- Try-Catch in C (Simulation) ---\\n\\n");
    
    // 1. ఆటని సేవ్ చేయడం (Try Block లాగా)
    // ఫస్ట్ టైమ్ సేవ్ చేసినప్పుడు setjmp 0 ని రిటర్న్ చేస్తుంది.
    int status = setjmp(save_point);
    
    if (status == 0) {
        // ఇదంతా Try Block లోపల అన్నమాట
        printf("Save Point Created. Let's run the risky code.\\n");
        divide_numbers(10, 2); // ఇది సక్సెస్ అవుతుంది
        
        printf("\\nNow running risky code again...\\n");
        divide_numbers(10, 0); // ఇది ఫెయిల్ అయ్యి దూకేస్తుంది
        
        // ఈ లైన్ ఎప్పటికీ ప్రింట్ అవ్వదు, ఎందుకంటే పైనే దూకేసింది
        printf("This line will never print!\\n"); 
    } 
    else if (status == 1) {
        // ఇది Catch Block లాగా అన్నమాట (longjmp 1 తో దూకినప్పుడు)
        printf("\\n[Caught Exception] We safely landed back in main()!\\n");
        printf("Error Code received: %d\\n", status);
    }
    
    printf("\\nProgram safely finished.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>jmp_buf save_point;</code>: ఇది కంపైలర్ కోసం ఒక స్పెషల్ బాక్స్. మీరు ఏ ఫంక్షన్ లో ఉన్నారు, మీ CPU రిజిస్టర్స్ (Registers) ఏంటి అని మొత్తం మీ కరెంట్ స్టేట్ ని (టైమ్ మెషిన్ లాగా) ఇందులో దాచుకుంటుంది.</li>
        <li><code>setjmp(save_point)</code>: ఇది మొదట రన్ అయినప్పుడు అదంతా దాచుకుని <strong>0</strong> ని ఇస్తుంది. అందుకే మనం ఫస్ట్ హాఫ్ కోడ్ రన్ చేస్తాం.</li>
        <li><code>longjmp(save_point, 1)</code>: ఇది రన్ అవ్వగానే, CPU డైరెక్ట్ గా పాత <code>setjmp</code> లైన్ కి వెళ్లిపోతుంది. కానీ ఈసారి <code>setjmp</code> కి 0 బదులు <strong>1</strong> వస్తుంది (మనం 1 పాస్ చేసాం కాబట్టి). అప్పుడు కంపైలర్ కింద ఉన్న ఎల్స్-ఇఫ్ (Catch block) లోకి వెళ్తుంది. ఇది అచ్చం మ్యాజిక్ లాంటి కాన్సెప్ట్!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఇది అంత పవర్ ఫుల్ అయితే, అందరూ ఎందుకు వాడరు?</h4>
          <p>దీనికి ఒక పెద్ద సైడ్ ఎఫెక్ట్ ఉంది. దీనివల్ల <strong>Memory Leaks</strong> వస్తాయి! మీరు ఒక ఫంక్షన్ లోపల <code>malloc</code> వాడి మెమరీ క్రియేట్ చేసి, దాన్ని <code>free</code> చేయకుండానే <code>longjmp</code> తో బయటికి దూకేస్తే... ఆ మెమరీ అలా లాక్ అయ్యి ఉండిపోతుంది (Stack Unwinding జరగదు). అందుకే C++ లో ఈ సమస్య రాకుండా <code>try-catch</code> కనిపెట్టారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ఒకవేళ <code>setjmp</code> రాసిన ఫంక్షన్ క్లోజ్ అయ్యాక <code>longjmp</code> వాడితే?</h4>
          <p>ఇది ప్రోగ్రామ్ ని వెంటనే క్రాష్ చేస్తుంది (Undefined Behavior)! మీరు సేవ్ పాయింట్ పెట్టిన ఫంక్షన్ ఇంకా బతికి ఉంటేనే (Stack లో ఉంటేనే) అక్కడికి దూకగలరు. ఆ ఫంక్షన్ ఎండ్ అయిపోయి, వేరే ఫంక్షన్ కి వెళ్లి దూకమని చెప్తే దానికి దారి తెలీక బ్లూ స్క్రీన్ వచ్చేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: గేమ్ ఇంజిన్స్ లో దీన్ని ఇంకా వాడుతున్నారా?</h4>
          <p>అవును! క్వేక్ (Quake) లాంటి పాత గేమ్ ఇంజిన్స్ లో సిస్టమ్ క్రాష్ అవ్వకుండా ఆపడానికి (Fatal Errors) దీన్నే వాడేవాళ్ళు. ఇప్పటికీ రొబోటిక్స్ లో హార్డ్వేర్ ఫెయిల్ అయినప్పుడు మెయిన్ లూప్ కి సేఫ్ గా రావడానికి ఈ కాన్సెప్ట్ నే వాడతారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 48, "Phase 17", "Advanced Concepts", subtopics, contentBody, '47-c-bit-fields-and-struct-packing.html', '47. Bit Fields & Struct Packing', '49-c-variable-arguments-stdarg-h.html', '49. Variable Arguments (stdarg.h)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson49() {
  const title = "Variable Arguments (stdarg.h) (తెలుగులో)";
  const desc = "C లో printf ఫంక్షన్ కి మనం ఎన్ని కామాలు పెట్టి ఆర్గ్యుమెంట్స్ ఇచ్చినా ఎలా తీసుకుంటుంది? మన స్వంత ఫంక్షన్స్ కి ఇష్టం వచ్చినన్ని ఆర్గ్యుమెంట్స్ (Variadic Functions) పంపాలంటే stdarg.h ని ఎలా వాడాలో డీప్ గా తెలుసుకుందాం.";
  const filename = "49-c-variable-arguments-stdarg-h.html";
  const subtopics = "Variadic Functions · stdarg.h · va_list · va_start & va_arg · printf internals";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలుగా మనం ఒక C ఫంక్షన్ రాస్తే <code>int add(int a, int b)</code> అని దానికి రెండే ఆర్గ్యుమెంట్స్ ఇస్తాం. మీరు మూడోది ఇస్తే కంపైలర్ ఒప్పుకోదు. కానీ ఎప్పుడైనా ఆలోచించారా? <code>printf("%d %d %d", a, b, c)</code> లో మీరు ఎన్ని వేరియబుల్స్ ఇచ్చినా అది తీసుకుంటుంది. అది ఎలా సాధ్యం? దానికి కారణం <strong>Variadic Functions (వేరియబుల్ ఆర్గ్యుమెంట్స్)</strong>. మనకు ముందుగానే యూజర్ ఎన్ని నంబర్స్ పంపుతాడో తెలియనప్పుడు (అన్-లిమిటెడ్), మన స్వంత ఫంక్షన్ కి కూడా ఈ సూపర్ పవర్ ని ఎలా ఇవ్వాలో ఈరోజు <code>stdarg.h</code> హెడ్డర్ ఫైల్ ద్వారా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> 3 డాట్స్ (Ellipsis <code>...</code>) మ్యాజిక్</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఫంక్షన్ రాసేటప్పుడు లాస్ట్ లో మూడు డాట్స్ (<code>...</code>) పెడితే, కంపైలర్ కి "బాబు, ఇక్కడ నుండి ఎన్ని వాల్యూస్ వచ్చినా సరే ఒక సంచి (Bag) లో వేసుకో" అని చెప్పినట్లు లెక్క! 
      </p>
      
      <div class="deep-dive-card">
        <h3>🛍️ రియల్ లైఫ్ స్టోరీ: కౌంటర్ దగ్గర సంచి (The Magic Bag)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు ఒక బట్టల షాప్ కి వెళ్లారు. మీరు ఎన్ని షర్ట్స్ కొంటారో క్యాషియర్ కి ముందే తెలీదు. కానీ అతను ఒక ఖాళీ సంచి (దీన్నే <strong><code>va_list</code></strong> అంటారు) పట్టుకుని ఉంటాడు.<br><br>
          ముందుగా మీరు "నేను 4 షర్ట్స్ కొంటున్నా" అని చెప్తారు (ఇదే మొదటి ఫిక్సెడ్ ఆర్గ్యుమెంట్). దాన్ని బట్టి అతను సంచి ఓపెన్ చేస్తాడు (<strong><code>va_start</code></strong>). ఆ తర్వాత ఒక్కో షర్ట్ ని సంచిలో నుండి తీసుకుని బిల్ వేస్తాడు (<strong><code>va_arg</code></strong>). మొత్తం 4 అయిపోగానే సంచిని క్లోజ్ చేస్తాడు (<strong><code>va_end</code></strong>). ప్రోగ్రామింగ్ లో కూడా వేరియబుల్ ఆర్గ్యుమెంట్స్ అచ్చం ఇలాగే పనిచేస్తాయి!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> తప్పనిసరిగా వాడాల్సిన ఫంక్షన్స్</div>
    <div class="section-body">
      <p class="text-prose">
        ఈ మ్యాజిక్ చేయాలంటే మనకి నాలుగు స్పెషల్ మాక్రోస్ కావాలి:
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong><code>va_list</code>:</strong> సంచి తయారు చేయడం (ఆర్గ్యుమెంట్స్ దాచుకోవడానికి ఒక పాయింటర్).</li>
        <li><strong><code>va_start</code>:</strong> సంచి ఓపెన్ చేయడం (దీనికి ఆర్గ్యుమెంట్స్ ఎక్కడ నుండి స్టార్ట్ అవుతున్నాయో చెప్పాలి).</li>
        <li><strong><code>va_arg</code>:</strong> సంచిలో నుండి ఒక్కో ఐటమ్ ని బయటికి తీయడం (దాని టైప్ <code>int</code> ఆ, <code>float</code> ఆ చెప్పాలి).</li>
        <li><strong><code>va_end</code>:</strong> పని అయ్యాక సంచిని క్లీన్ చేసి మూసేయడం (మెమరీ సేఫ్టీ).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Unlimited Add Function)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో మనం ఒక <code>sum</code> అనే ఫంక్షన్ రాసి, దానికి ఒకసారి 3 నంబర్స్, ఇంకోసారి 5 నంబర్స్ పంపి రిజల్ట్ ఎలా తెప్పించామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Variadic Functions (stdarg.h)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt; // వేరియబుల్ ఆర్గ్యుమెంట్స్ కి ఇది అవసరం

// ఫస్ట్ ఆర్గ్యుమెంట్ ఎప్పుడూ ఫిక్స్డ్ ఉండాలి (ఎన్ని వస్తున్నాయో చెప్పడానికి)
// ఆ తర్వాత ఎన్ని కావాలంటే అన్ని ఇవ్వొచ్చు (...)
int calculateSum(int count, ...) {
    int total = 0;
    
    // 1. సంచి (లిస్ట్) ని క్రియేట్ చేస్తున్నాం
    va_list args;
    
    // 2. సంచి ఓపెన్ చేద్దాం. 'count' తర్వాత నుండే ఐటమ్స్ ఉన్నాయి అని చెప్తున్నాం
    va_start(args, count);
    
    // 3. ఒక్కొక్కటిగా బయటికి తీద్దాం
    for (int i = 0; i < count; i++) {
        // va_arg వాడి నెక్స్ట్ ఐటమ్ ని int లాగా బయటికి లాగుతున్నాం
        int currentNum = va_arg(args, int);
        total += currentNum;
    }
    
    // 4. సంచిని క్లోజ్ చేద్దాం
    va_end(args);
    
    return total;
}

int main() {
    printf("--- Variadic Functions Demo ---\\n\\n");
    
    // ఫస్ట్ నంబర్ 3 (అంటే తర్వాత 3 నంబర్స్ వస్తున్నాయి అని అర్థం)
    int result1 = calculateSum(3, 10, 20, 30);
    printf("Sum of 3 numbers (10,20,30) : %d\\n", result1);
    
    // ఫస్ట్ నంబర్ 5 (అంటే తర్వాత 5 నంబర్స్ వస్తున్నాయి)
    int result2 = calculateSum(5, 1, 2, 3, 4, 5);
    printf("Sum of 5 numbers (1..5)     : %d\\n", result2);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>int calculateSum(int count, ...)</code>: మీరు కనీసం ఒక ఫిక్సెడ్ ఆర్గ్యుమెంట్ (count) ఇవ్వకపోతే, లోపల ఉన్న డాట్స్ (<code>...</code>) ఎక్కడ స్టార్ట్ అవుతున్నాయో కంపైలర్ కి అసలు తెలీదు. కనీసం ఒక్కటి అయినా ఉండాల్సిందే.</li>
        <li><code>va_arg(args, int)</code>: ఇక్కడ మ్యాజిక్ ఏంటంటే, సంచిలో చేయి పెట్టి బయటికి తీసిన ప్రతీసారి, పాయింటర్ ఆటోమేటిక్ గా నెక్స్ట్ నంబర్ కి వెళ్ళిపోతుంది. మీరు <code>ptr++</code> చేయక్కర్లేదు. దానికి ఏ టైప్ కావాలో పక్కన <code>int</code>, <code>double</code> అని చెప్తే చాలు.</li>
        <li><code>va_end(args)</code>: ఇది రాయకపోయినా కొన్నిసార్లు ప్రోగ్రామ్ పనిచేస్తుంది, కానీ కొన్ని ప్లాట్ఫామ్స్ (ARM ప్రాసెసర్స్) లో రాకపోతే మెమరీ కరప్ట్ అయి యాప్ క్రాష్ అవుతుంది. ఇది బెస్ట్ ప్రాక్టీస్!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: మనం పంపే కౌంట్ కన్నా (ఉదా: 3 అని చెప్పి) ఎక్కువ నంబర్స్ (5) పంపితే ఏమవుతుంది?</h4>
          <p>కంపైలర్ ఎర్రర్ ఇవ్వదు! కానీ ఫంక్షన్ లోపల లూప్ 3 సార్లు మాత్రమే తిరిగి, మొదటి 3 నంబర్స్ ని మాత్రమే యాడ్ చేసుకుని ఆగిపోతుంది. మిగతా రెండు నంబర్స్ ని పూర్తిగా ఇగ్నోర్ చేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: కౌంట్ ఎక్కువ చెప్పి (ఉదా: 5 అని చెప్పి) తక్కువ నంబర్స్ (3) పంపితే?</h4>
          <p>ఇది చాలా డేంజర్! లూప్ 5 సార్లు తిరుగుతుంది, సంచిలో 3 ఐటమ్స్ ఏ ఉంటాయి. నాలుగో సారి ఖాళీ సంచిలో చేయి పెట్టినప్పుడు, మెమరీ లో పక్కన ఉన్న ఎవరిదో గార్బేజ్ వాల్యూ (Garbage Value) ని తీసుకుని యాడ్ చేస్తుంది. దీనివల్ల రాంగ్ రిజల్ట్స్ వస్తాయి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>printf</code> కి మనం కౌంట్ పంపం కదా, మరి దానికి ఎలా తెలుస్తుంది?</h4>
          <p>సూపర్ లాజిక్! మనం పంపే టెక్స్ట్ లో ఎన్ని పర్సంటేజ్ సింబల్స్ (<code>%d</code>, <code>%s</code>) ఉన్నాయో <code>printf</code> లోపల ముందు కౌంట్ చేసుకుంటుంది. దాన్ని బట్టి అది అన్-లిమిటెడ్ గా ఆర్గ్యుమెంట్స్ ని తీస్తుంది. అందుకే మీరు <code>%d</code> లు ఎక్కువ పెట్టి, పక్కన వేరియబుల్స్ తక్కువ ఇస్తే గార్బేజ్ వాల్యూస్ వస్తాయి!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 49, "Phase 17", "Advanced Concepts", subtopics, contentBody, '48-c-error-handling-setjmp-longjmp.html', '48. Error Handling', '50-c-multi-threading-pthreads-basics.html', '50. Multi-threading in C (pthreads)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson50() {
  const title = "Multi-threading in C (pthreads basics) (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో ఒకేసారి రెండు పనులు (Multi-threading) ఎలా చేయాలి? pthreads (POSIX threads) లైబ్రరీ వాడి మీ CPU లో ఉన్న మల్టీ-కోర్స్ ని వాడుకుంటూ ప్రోగ్రామ్ స్పీడ్ ని ఎలా పెంచాలో డీప్ గా తెలుసుకుందాం.";
  const filename = "50-c-multi-threading-pthreads-basics.html";
  const subtopics = "Concurrency vs Parallelism · pthreads Library · pthread_create() · pthread_join() · Multi-Core Usage";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలుగా మనం రాసే C ప్రోగ్రామ్స్ అన్నీ పైన లైన్ రన్ అయ్యాకే కింద లైన్ కి వెళ్తాయి (Single Threaded). అంటే మీరు ఒక పెద్ద ఫైల్ డౌన్లోడ్ చేస్తూ, అదే టైమ్ లో మ్యూజిక్ ప్లే చేయాలంటే కుదరదు! కానీ మన కంప్యూటర్ కి 8 కోర్స్ (Cores) ఉంటాయి కదా? వాటన్నిటినీ ఒకేసారి వాడుకుని ప్యారలల్ (Parallel) గా పనులు చేయించడాన్నే <strong>Multi-threading (మల్టీ-త్రెడ్డింగ్)</strong> అంటారు. విండోస్ మరియు లైనక్స్ లో <code>&lt;pthread.h&gt;</code> అనే లైబ్రరీ వాడి రెండు ఫంక్షన్స్ ని ఒకే సెకనులో ఎలా రన్ చేయాలో ఈరోజు డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> త్రెడ్ (Thread) అంటే ఏంటి? (The Workers)</div>
    <div class="section-body">
      <p class="text-prose">
        మీ ప్రోగ్రామ్ ని ఒక ఫ్యాక్టరీ (Process) అనుకోండి. ఫ్యాక్టరీలో పని చేసే వర్కర్స్ ని త్రెడ్స్ అంటారు. సింగిల్ త్రెడ్ అంటే ఒకే వర్కర్ మొత్తం పని అంతా ఒకడి తర్వాత ఒకటి చేయడం. మల్టీ-త్రెడ్డింగ్ అంటే నలుగురు వర్కర్స్ కి పనిని పంచడం, అందరూ ఒకేసారి (parallel గా) పని పూర్తి చేయడం.
      </p>

      <div class="deep-dive-card">
        <h3>⚡ రియల్ లైఫ్ స్టోరీ: హోటల్ వంటగది (Multi-threading vs Single-threading)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          <strong>Single-threading:</strong> ఒక హోటల్ లో ఒకే చెఫ్ (Cook) ఉన్నాడు. వాడు ముందు బిర్యానీ చేసాడు (10 నిమిషాలు), ఆ తర్వాత ఫ్రైడ్ రైస్ చేసాడు (10 నిమిషాలు), ఆ తర్వాత సూప్ చేసాడు (5 నిమిషాలు). మొత్తం 25 నిమిషాలు పట్టింది. ఇది పాత కాలం C ప్రోగ్రామింగ్.<br><br>
          <strong>Multi-threading:</strong> ఇప్పుడు ముగ్గురు చెఫ్ లు ఉన్నారు. ముగ్గురు ఒకేసారి స్టార్ట్ చేసారు. బిర్యానీ అవ్వడానికి 10 నిమిషాలు పట్టింది. ఆ టైమ్ లోపే ఫ్రైడ్ రైస్, సూప్ కూడా అయిపోయాయి! అంటే టోటల్ టైమ్ కేవలం 10 నిమిషాలే! CPU కోర్స్ ని ఇలా ఎఫెక్టివ్ గా వాడటానికి <code>pthread_create()</code> అద్భుతంగా పనిచేస్తుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> Pthreads సింటాక్స్ (ఎలా వాడుతారు?)</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>1. <code>pthread_create()</code>:</strong> ఇది కొత్త వర్కర్ ని (Thread) నిద్రలేపుతుంది. మీరు ఏ ఫంక్షన్ ని రన్ చేయాలో ఆ ఫంక్షన్ అడ్రస్ (Callback) దీనికి ఇవ్వాలి. ఫంక్షన్ బ్యాక్ గ్రౌండ్ లో రన్ అవ్వడం స్టార్ట్ అవుతుంది.<br>
        <strong>2. <code>pthread_join()</code>:</strong> ఇది చాలా ఇంపార్టెంట్! మీరు ముగ్గురు వర్కర్స్ ని పనికి పంపాక, బాస్ (మెయిన్ ఫంక్షన్) వాళ్ళు తిరిగొచ్చే దాకా వెయిట్ చేయాలి. వెయిట్ చేయకుండా ఫ్యాక్టరీ (యాప్) మూసేస్తే వర్కర్స్ కూడా చనిపోతారు! ఈ వెయిట్ చేసే లైనే join.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Parallel Functions)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో టాస్క్ 1 మరియు టాస్క్ 2 ఒకదాని తర్వాత ఒకటి కాకుండా, <strong>ఒకేసారి (Parallel)</strong> ఎలా రన్ అవుతాయో సిమ్యులేట్ చేసాం చూడండి. <em>(గమనిక: ఈ కోడ్ లైనక్స్ లో <code>-lpthread</code> ఫ్లాగ్ తో కంపైల్ చేయాలి, లేదా ఆన్లైన్ కంపైలర్స్ లో పని చేస్తుంది)</em>.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Multi-Threading (pthreads)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;pthread.h&gt; // త్రెడ్స్ కోసం హెడ్డర్
#include &lt;unistd.h&gt;  // sleep వాడటానికి (Linux)

// త్రెడ్ లో రన్ అయ్యే ఫంక్షన్ కచ్చితంగా (void *) తీసుకోవాలి
void* downloadFile(void* arg) {
    char* fileName = (char*)arg; // వచ్చిన ఆర్గుమెంట్ ని మార్చుకోవడం
    
    printf("[Thread] Downloading: %s started...\\n", fileName);
    sleep(2); // 2 సెకన్లు టైమ్ పడుతుంది అనుకుందాం (Simulating delay)
    printf("[Thread] %s Download Complete!\\n", fileName);
    
    return NULL;
}

int main() {
    printf("--- Multi-Threading Masterclass ---\\n\\n");
    
    // 1. త్రెడ్స్ ని పట్టుకోవడానికి రెండు ఐడీలు (IDs) కావాలి
    pthread_t thread1, thread2;
    
    // 2. రెండు త్రెడ్స్ ని ఒకే సెకనులో స్టార్ట్ చేద్దాం (Parallel)
    // (అడ్రస్, attributes, ఫంక్షన్ పేరు, దానికి పంపే డేటా)
    printf("[Main] Starting Task 1 & Task 2 simultaneously...\\n");
    pthread_create(&thread1, NULL, downloadFile, "Movie.mp4");
    pthread_create(&thread2, NULL, downloadFile, "Song.mp3");
    
    // మెయిన్ ఫంక్షన్ కూడా తన పని తాను చేసుకుంటుంది
    printf("[Main] Boss is doing some other UI work...\\n");
    
    // 3. ఆ రెండు త్రెడ్స్ పని పూర్తయ్యేదాకా (join అయ్యేదాకా) వెయిట్ చేయాలి
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
    
    // వాళ్ళు వచ్చేసాక యాప్ ఎండ్ అవుతుంది
    printf("\\n[Main] All downloads finished. App closing.\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>pthread_create()</code>: ఇది కాల్ చేసిన మరుక్షణం మీ కోడ్ రెండు పాయలుగా విడిపోతుంది. ఒక పాయ (Thread) <code>downloadFile</code> ని రన్ చేసుకుంటూ వెళ్తుంది, ఒరిజినల్ మెయిన్ ఫంక్షన్ దాన్ని వదిలేసి కింద లైన్ కి వెళ్ళిపోతుంది. దీనివల్లే ప్యారలలిజం వస్తుంది.</li>
        <li><code>void* (*start_routine)(void*)</code>: పీ-త్రెడ్స్ కి మనం పంపే ఫంక్షన్ ఎప్పుడూ కులం లేని <code>void *</code> డేటాని మాత్రమే తీసుకుంటుంది, అలాగే <code>void *</code> నే రిటర్న్ చేస్తుంది. అందుకే ఫంక్షన్ లోపల మనం మళ్ళీ దాన్ని <code>(char*)</code> కింద కన్వర్ట్ (Typecast) చేసుకున్నాం.</li>
        <li><code>pthread_join()</code>: మీరు ఇది రాయకపోతే, మెయిన్ ఫంక్షన్ వెంటనే ఎండ్ అయిపోయి, గేమ్ క్లోజ్ అయిపోతుంది. అప్పుడు బ్యాక్ గ్రౌండ్ లో డౌన్లోడ్ అవుతున్న మూవీ మధ్యలోనే చనిపోతుంది (Thread Cancellation). అందుకే బాస్ ఎప్పుడూ వర్కర్స్ కోసం వెయిట్ చేయాలి!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: విండోస్ లో <code>&lt;pthread.h&gt;</code> పనిచేస్తుందా?</h4>
          <p>డైరెక్ట్ గా పనిచేయదు! pthreads అనేది POSIX (Linux/Mac) స్టాండర్డ్. విండోస్ లో నేటివ్ గా <code>&lt;windows.h&gt;</code> లో ఉండే <code>CreateThread()</code> ఫంక్షన్ వాడతారు. అయితే, MinGW కంపైలర్ వాడితే విండోస్ లో కూడా pthreads పనిచేసేలా వాళ్ళు ఒక పోర్ట్ (Port) రాసి ఉంచారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: రెండు త్రెడ్స్ ఒకేసారి ఒకే వేరియబుల్ ని మారిస్తే ఏమవుతుంది? (Race Condition)</h4>
          <p>ఇది మల్టీ-త్రెడ్డింగ్ లో వచ్చే అత్యంత డేంజరస్ బగ్! ఇద్దరు ఒకేసారి ఒకే బ్యాంక్ అకౌంట్ లోకి డబ్బులు వేస్తే, అప్డేట్ అయ్యేటప్పుడు ఓవర్-రైట్ అయ్యి ఒకరి డబ్బులు మాయం అవుతాయి (Race Condition). దీన్ని ఆపడానికే <strong>Mutex (Locks)</strong> వాడతారు. ఒకరు వాడుతున్నప్పుడు ఇంకొకరికి తాళం వేస్తారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: త్రెడ్స్ ఎక్కువ క్రియేట్ చేస్తే ఫాస్ట్ అయిపోతుందా? (1000 త్రెడ్స్ చేస్తే?)</h4>
          <p>అస్సలు అవ్వదు! మీ CPU కి 8 కోర్స్ ఉంటే, 8 త్రెడ్స్ మాత్రమే ఒకేసారి రియల్ గా (Parallel) రన్ అవుతాయి. మీరు 1000 త్రెడ్స్ క్రియేట్ చేస్తే, CPU ఒక్కోదానికి టైమ్ ఇస్తూ స్విచ్ (Context Switching) చేసుకోవడానికే దాని టైమ్ అంతా వేస్ట్ అవుతుంది. అప్పుడు యాప్ ఫాస్ట్ అవ్వకపోగా ఇంకా స్లో (ల్యాగ్) అవుతుంది!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 50, "Phase 17", "Advanced Concepts", subtopics, contentBody, '49-c-variable-arguments-stdarg-h.html', '49. Variable Arguments', '51-c-linked-lists-singly-creation-traversal.html', '51. Linked Lists Basics');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson51() {
  const title = "Linked Lists (Singly) - Basics (తెలుగులో)";
  const desc = "C లో Data Structures (డేటా స్ట్రక్చర్స్) ప్రపంచంలోకి అడుగుపెడదాం! Array కి లిమిట్ ఉంటుంది, కానీ అన్-లిమిటెడ్ గా డేటా స్టోర్ చేసే Linked List అంటే ఏంటి? Nodes (నోడ్స్) ఎలా తయారుచేయాలి? ఒక ట్రైన్ లాగా దాన్ని ఎలా కనెక్ట్ చేయాలో డీప్ గా చూద్దాం.";
  const filename = "51-c-linked-lists-singly-creation-traversal.html";
  const subtopics = "Arrays vs Linked Lists · Nodes (Data & Next) · Linked List Creation · Traversal (Printing)";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంతవరకు మనం చాలా కాన్సెప్ట్స్ నేర్చుకున్నాం, కానీ ఇప్పుడు <strong>Data Structures (డేటా స్ట్రక్చర్స్)</strong> అనే అసలైన ప్రోగ్రామింగ్ ప్రపంచంలోకి అడుగుపెడుతున్నాం! మామూలుగా ఒక అర్రే (Array) వాడితే దాని సైజు ముందే ఫిక్స్ చేయాలి, దాన్ని పెంచడం కష్టం. ఆ ప్రాబ్లమ్ కి సొల్యూషన్ ఏంటంటే, ఎప్పుడు డేటా వస్తే అప్పుడు ఆన్ ది స్పాట్ లో ఒక బాక్స్ తయారుచేసి, దాన్ని పాత బాక్స్ కి లింక్ చేయడం! దీన్నే <strong>Linked List (లింక్డ్ లిస్ట్)</strong> అంటారు. ఇది అచ్చం ట్రైన్ డబ్బాల్లా పనిచేస్తుంది. ఒక డబ్బా ఇంకో డబ్బాకి చైన్ తో కనెక్ట్ అయ్యి ఉంటుంది. దాన్ని C లో డైనమిక్ మెమరీ (malloc) తో ఎలా సృష్టిస్తారో ఈరోజు నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Array వర్సెస్ Linked List (తేడా ఏంటి?)</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>Array:</strong> మీ దగ్గర ఒక పెద్ద బెంచ్ ఉంది. అందరూ పక్కపక్కనే (Contiguous memory) కూర్చోవాలి. మధ్యలో ఎవడైనా కొత్తవాడు రావాలంటే, మిగతా అందరూ పక్కకి జరగాలి (Shift). ఇది చాలా టైమ్ వేస్ట్!
      </p>
      <p class="text-prose">
        <strong>Linked List:</strong> ఒక థియేటర్ లో ఎవరికి ఎక్కడ ఖాళీ దొరికితే అక్కడ కూర్చుంటారు (Random memory). కానీ మొదటివాడి చేతిలో రెండో వాడి అడ్రస్ స్లిప్ ఉంటుంది, రెండో వాడి చేతిలో మూడో వాడి అడ్రస్ ఉంటుంది. ఇలా ఒకరి తర్వాత ఒకరు కనెక్ట్ అవుతారు!
      </p>

      <div class="deep-dive-card">
        <h3>🚂 రియల్ లైఫ్ స్టోరీ: ట్రైన్ డబ్బాలు (Nodes)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          లింక్డ్ లిస్ట్ లో ప్రతి బాక్స్ ని <strong>Node (నోడ్)</strong> అంటారు. ఒక ట్రైన్ డబ్బాలో ఏముంటాయి? ప్యాసింజర్స్ కూర్చునే సీట్స్ (Data), మరియు వెనక డబ్బాకి కనెక్ట్ చేసే ఇనుప చైన్ (Pointer).<br><br>
          C లో ఒక స్ట్రక్చర్ రాసి అందులో ఒక వేరియబుల్ (Data), మరియు దాని స్వంత స్ట్రక్చర్ కే పాయింట్ చేసే ఒక అడ్రస్ <code>struct Node* next;</code> ని పెడతాము. దీన్నే <strong>Self-referential Structure</strong> అంటారు. లాస్ట్ డబ్బాకి ఇంకేమీ కనెక్ట్ అవ్వదు కాబట్టి దాని చైన్ ని తెంపేస్తాం (అదే నల్ పాయింటర్ - <code>NULL</code>).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> లింక్డ్ లిస్ట్ పార్ట్స్ (Head & NULL)</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>Head (హెడ్):</strong> ఇది ట్రైన్ ఇంజిన్ లాంటిది. ఇది లిస్ట్ లో మొదటి నోడ్ యొక్క అడ్రస్ ని మాత్రమే పట్టుకుని ఉంటుంది. హెడ్ దొరికితే చాలు, చైన్ పట్టుకుని లాస్ట్ వరకు వెళ్లిపోవచ్చు. హెడ్ మిస్సయితే మీ డేటా మొత్తం లాస్ట్ (Memory Leak)!
      </p>
      <div class="memory-diagram">
[HEAD] ---> [ Data: 10 | Next ] ---> [ Data: 20 | Next ] ---> [ Data: 30 | NULL ]</div>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Creating a Linked List)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో 3 నోడ్స్ ని <code>malloc</code> తో ఎలా తయారు చేసామో, వాటిని చైన్ లాగా ఒకదానికొకటి ఎలా లింక్ చేసామో, ఆ తర్వాత లూప్ లో ఎలా ప్రింట్ (Traversal) చేసామో క్రియేటివ్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Singly Linked List</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

// 1. ఒక నోడ్ బ్లూప్రింట్ (ట్రైన్ డబ్బా)
struct Node {
    int data;           // డేటా దాచుకోవడానికి
    struct Node* next;  // నెక్స్ట్ డబ్బా అడ్రస్ దాచుకోవడానికి (చైన్)
};

// లిస్ట్ ని ప్రింట్ చేయడానికి ఒక స్పెషల్ ఫంక్షన్ (Traversal)
void printList(struct Node* head) {
    struct Node* temp = head; // హెడ్ ని కదపకుండా ఒక టెంప్ పాయింటర్ వాడాలి
    
    printf("Linked List: ");
    while (temp != NULL) {
        printf("[%d] -> ", temp->data); // డేటా ప్రింట్ చేయి
        temp = temp->next;              // చైన్ పట్టుకుని నెక్స్ట్ డబ్బాకి వెళ్ళు!
    }
    printf("NULL\\n"); // లాస్ట్ కి వచ్చేశాం
}

int main() {
    printf("--- Building a Linked List ---\\n\\n");
    
    // 2. మూడు ఖాళీ డబ్బాలను Heap లో తయారు చేద్దాం
    struct Node* head = (struct Node*)malloc(sizeof(struct Node));
    struct Node* second = (struct Node*)malloc(sizeof(struct Node));
    struct Node* third = (struct Node*)malloc(sizeof(struct Node));
    
    // 3. వాటిలో డేటా పెట్టి చైన్ కనెక్ట్ చేద్దాం
    
    // మొదటి డబ్బా
    head->data = 10;       // డేటా 10
    head->next = second;   // రెండో డబ్బాకి లింక్
    
    // రెండో డబ్బా
    second->data = 20;
    second->next = third;  // మూడో డబ్బాకి లింక్
    
    // మూడో డబ్బా (లాస్ట్ డబ్బా)
    third->data = 30;
    third->next = NULL;    // ట్రైన్ ఎండ్ అయింది కాబట్టి NULL
    
    // 4. ప్రింట్ చేద్దాం
    printList(head);
    
    // (రియల్ ప్రోగ్రామ్స్ లో వాడేసాక free() చేయాలి)
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>struct Node* next;</code>: ఒక స్ట్రక్చర్ లోపల అదే స్ట్రక్చర్ క్రియేట్ చేయలేము (అది అన్-లిమిటెడ్ సైజ్ అవుతుంది). కానీ పాయింటర్ (అడ్రస్) మాత్రం స్టోర్ చేసుకోవచ్చు! ఎందుకంటే పాయింటర్ సైజ్ ఎప్పుడూ 4 లేదా 8 బైట్స్ గా ఫిక్స్ అయి ఉంటుంది.</li>
        <li><code>temp = temp-&gt;next;</code>: ఇది లింక్డ్ లిస్ట్ కి గుండెకాయ లాంటిది. <code>temp</code> ఉన్న చోట ప్రింట్ చేసి, దాని చేతిలో ఉన్న నెక్స్ట్ అడ్రస్ (<code>next</code>) ని తీసుకుని <code>temp</code> లో పెట్టుకుంటుంది. అంటే జంప్ అవుతుంది! నల్ (NULL) వచ్చేదాకా ఈ జంపింగ్ లూప్ జరుగుతుంది.</li>
        <li><code>struct Node* temp = head;</code>: మనం ప్రింట్ చేసేటప్పుడు ఒరిజినల్ <code>head</code> ని ఎప్పుడూ మార్చకూడదు! ఒకవేళ మార్చేసి లాస్ట్ కి వెళ్ళిపోతే, లిస్ట్ ముందు డేటా అంతా పోతుంది (Memory Leak). అందుకే దానికి డూప్లికేట్ <code>temp</code> వాడాం.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Array వాడటం మానేసి అందరూ లింక్డ్ లిస్ట్ వాడొచ్చు కదా?</h4>
          <p>దీనికి కొన్ని మైనస్ పాయింట్స్ ఉన్నాయి! అర్రే లో మీరు డైరెక్ట్ గా <code>arr[5]</code> అంటే ఐదో ఐటమ్ సెకనులో వచ్చేస్తుంది (O(1)). కానీ లింక్డ్ లిస్ట్ లో 5వ ఐటమ్ కావాలంటే హెడ్ దగ్గరి నుండి ఒకటి, రెండు అని గుడ్డిగా చైన్ పట్టుకుని వెతుక్కుంటూ వెళ్ళాలి (O(N)). సెర్చ్ చేయడానికి ఇది చాలా స్లో!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ఎక్కడ Array వాడాలి? ఎక్కడ Linked List వాడాలి?</h4>
          <p>మీకు సైజు ముందే తెలుసు, అండ్ మీరు డేటాని ఫాస్ట్ గా చదవాలి (Read Heavy) అనుకుంటే Array బెస్ట్. కానీ మీకు సైజు తెలీదు, మీరు మధ్యలో కొత్త డేటాని దూర్చడం (Insert) లేదా తీసేయడం (Delete) ఎక్కువగా చేస్తారు అంటే అప్పుడు Linked List కచ్చితంగా వాడాలి. ఎందుకంటే ఇందులో షిఫ్టింగ్ (Shifting) అవసరం లేదు, చైన్ మార్చితే చాలు!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: లింక్డ్ లిస్ట్ లో లాస్ట్ నోడ్ ని కనుక్కోవాలంటే ఏంటి కండిషన్?</h4>
          <p>ట్రావర్సల్ (Traversal) చేసేటప్పుడు <code>temp != NULL</code> వాడతాం (అది మొత్తం ప్రింట్ చేయడానికి). కానీ మీరు ఎగ్జాక్ట్ గా లాస్ట్ డబ్బా దగ్గర ఆగిపోవాలంటే <code>temp-&gt;next != NULL</code> అని వాడాలి. ఇది లాస్ట్ డబ్బా కి ఉన్న చైన్ 0 అవ్వగానే ఆగిపోతుంది!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 51, "Phase 18", "Data Structures - 1", subtopics, contentBody, '50-c-multi-threading-pthreads-basics.html', '50. Multi-threading in C (pthreads)', '52-c-linked-lists-insertion-deletion.html', '52. Insert & Delete (Linked List)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson52() {
  const title = "Linked Lists - Insertion & Deletion (తెలుగులో)";
  const desc = "C లో Linked List మధ్యలో కొత్త నోడ్ ని ఎలా దూర్చాలి (Insert)? పాత నోడ్ ని ఎలా తీసేయాలి (Delete)? డేటా స్ట్రక్చర్స్ లో అత్యంత ముఖ్యమైన చైన్ లింకింగ్ టెక్నిక్స్ ని యానిమేషన్ లెవెల్ ఎక్స్‌ప్లనేషన్ తో డీప్ గా చూద్దాం.";
  const filename = "52-c-linked-lists-insertion-deletion.html";
  const subtopics = "Insert at Head · Insert at Tail · Insert at Position · Deletion · Memory Management (free)";

  const contentBody = `
    <div class="intro-box">
      <p>లాస్ట్ లెసన్ లో మనం లింక్డ్ లిస్ట్ (ట్రైన్ డబ్బాలు) క్రియేట్ చేయడం నేర్చుకున్నాం కదా. కానీ ఒక ప్యాసింజర్ వచ్చి "నన్ను కరెక్ట్ గా రెండో డబ్బాకి, మూడో డబ్బాకి మధ్యలో ఎక్కించండి" అంటే ఎలా? ఆ చైన్ ని ఎలా విడదీసి మధ్యలో కొత్త బాక్స్ ని ఎలా <strong>Insert</strong> చేయాలో, అలాగే వద్దు అనుకున్న బాక్స్ ని <strong>Delete (free)</strong> చేసి చైన్ ని మళ్ళీ ఎలా అతకాలో ఈరోజు నేర్చుకుందాం. ఇంటర్వ్యూస్ లో వైట్ బోర్డ్ మీద కోడింగ్ అడిగే క్వశ్చన్స్ అన్నీ దీనిమీదనే ఉంటాయి!</p>
    </div>

    <div class="section-title"><span class="num">1</span> ఇన్సర్షన్ టెక్నిక్ (చైన్ మార్చడం)</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>Insert at Beginning (ముందు యాడ్ చేయడం):</strong> కొత్త ఇంజిన్ వచ్చింది. సింపుల్ గా కొత్త డబ్బా చైన్ ని పాత ఇంజిన్ (హెడ్) కి కనెక్ట్ చేసి, హెడ్ అనే కిరీటాన్ని కొత్త దానికి ఇచ్చేయడమే!
      </p>
      
      <div class="deep-dive-card">
        <h3>🔗 రియల్ లైఫ్ స్టోరీ: మధ్యలో దూర్చడం (Insert at Position)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          అనుకోండి A, B, C అనే ముగ్గురు వ్యక్తులు చేతులు పట్టుకుని నిలబడ్డారు (A->B->C). ఇప్పుడు కొత్తగా X అనేవాడు వచ్చి B మరియు C మధ్యలో దూరాలి.<br><br>
          అత్యంత <strong>డేంజరస్ రూల్:</strong> B తన చేయి వదిలేసి ముందు X ని పట్టుకోకూడదు! అలా వదిలేస్తే C ఎక్కడికి పోయాడో అడ్రస్ దొరకదు (మెమరీ లీక్). దానికి కరెక్ట్ పద్ధతి ఏంటంటే: ముందు X అనేవాడు తన చేత్తో C ని పట్టుకుంటాడు. ఆ తర్వాతే B తన పాత చేయి (C) ని వదిలేసి X ని పట్టుకుంటాడు! అంటే చైన్ తెగకుండా లింక్ మారుతుంది.<br>
          కోడ్ లో దీన్ని: <code>newNode-&gt;next = temp-&gt;next;</code> ఆ తర్వాత <code>temp-&gt;next = newNode;</code> అంటారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> డిలీషన్ టెక్నిక్ (చైన్ అతకడం)</div>
    <div class="section-body">
      <p class="text-prose">
        మధ్యలో B అనే డబ్బాని తీసేయాలి. అప్పుడు A డబ్బా వాడికి, డైరెక్ట్ గా C అడ్రస్ ఇస్తే చాలు (<code>A-&gt;next = B-&gt;next;</code>). చైన్ అతుక్కుపోతుంది. కానీ ఆ తర్వాత కచ్చితంగా ఆ కట్ అయిన B డబ్బాని ఆపరేటింగ్ సిస్టమ్ కి తిరిగి ఇచ్చేయాలి (<code>free(B)</code>). లేదంటే మెమరీ లీక్ కన్ఫార్మ్!
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Insert at Front & End)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో హెడ్ ద్వారా ముందు, వెనక నోడ్స్ ని ఎలా డైనమిక్ గా ఇన్సర్ట్ చేసామో ఒక ప్రొఫెషనల్ పద్ధతిలో రాసిన ఫంక్షన్స్ ని చూడండి. డబుల్ పాయింటర్స్ (<code>**</code>) ఎందుకు వాడుతున్నామో గమనించండి!
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Insert at Head & Tail</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

struct Node {
    int data;
    struct Node* next;
};

// 1. ముందు యాడ్ చేయడం (Insert at Head)
// హెడ్ అడ్రస్ ని మార్చాలి కాబట్టి (**) డబుల్ పాయింటర్ తీసుకుంటున్నాం
void push(struct Node** head_ref, int new_data) {
    // కొత్త బాక్స్ క్రియేట్ చేద్దాం
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    
    // కొత్త దాని చైన్ ని పాత హెడ్ కి ఇద్దాం
    new_node->next = *head_ref;
    
    // ఇప్పుడు కొత్త బాక్స్ ని హెడ్ కింద మారుద్దాం!
    *head_ref = new_node;
}

// 2. చివర్లో యాడ్ చేయడం (Insert at Tail)
void append(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    struct Node* last = *head_ref;
    
    new_node->data = new_data;
    new_node->next = NULL; // ఇది లాస్ట్ కాబట్టి NULL
    
    // ఒకవేళ లిస్ట్ పూర్తిగా ఖాళీగా ఉంటే... ఇదే ఫస్ట్ (హెడ్) అవుతుంది
    if (*head_ref == NULL) {
        *head_ref = new_node;
        return;
    }
    
    // ఖాళీ లేకపోతే, నడుచుకుంటూ లాస్ట్ డబ్బా దాకా వెతుకుదాం
    while (last->next != NULL) {
        last = last->next;
    }
    
    // లాస్ట్ డబ్బా దొరికింది! దానికి ఈ కొత్త డబ్బాని చైన్ వేద్దాం
    last->next = new_node;
}

// లిస్ట్ ప్రింట్ చేసే ఫంక్షన్
void printList(struct Node* node) {
    while (node != NULL) {
        printf("%d -> ", node->data);
        node = node->next;
    }
    printf("NULL\\n");
}

int main() {
    // లిస్ట్ మొదట్లో ఖాళీగా ఉంది (హెడ్ లేదు)
    struct Node* head = NULL;
    
    printf("--- Linked List Insertion ---\\n\\n");
    
    // చివర్లో 10 యాడ్ చేద్దాం (ఖాళీ కాబట్టి ఇదే హెడ్ అవుతుంది)
    append(&head, 10);
    
    // ముందు 5 యాడ్ చేద్దాం (5 -> 10)
    push(&head, 5);
    
    // చివర్లో 20 యాడ్ చేద్దాం (5 -> 10 -> 20)
    append(&head, 20);
    
    // ముందు 1 యాడ్ చేద్దాం (1 -> 5 -> 10 -> 20)
    push(&head, 1);
    
    printf("Final List is:\\n");
    printList(head);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>struct Node** head_ref</code>: ఇది చాలా మందికి కన్ఫ్యూజ్ అవుతుంది! మనం ఒక ఫంక్షన్ ద్వారా మెయిన్ లో ఉన్న <code>head</code> పాయింటర్ వేల్యూ ని మార్చాలి (అంటే ఒక బాక్స్ ని హెడ్ కింద డిక్లేర్ చేయాలి). పాయింటర్ వాల్యూ ని ఫంక్షన్ లో మార్చాలంటే దాని అడ్రస్ ని (అంటే డబుల్ పాయింటర్) పంపాలి అని మనం పాత లెసన్స్ లో నేర్చుకున్నాం!</li>
        <li><code>*head_ref = new_node;</code>: పాత ఇంజిన్ పోయి, కొత్తగా వచ్చిన <code>new_node</code> కి హెడ్ (కిరీటం) దక్కింది.</li>
        <li><code>while (last-&gt;next != NULL)</code>: అపెండ్ (Append) చేసేటప్పుడు, మనకు లాస్ట్ డబ్బా అడ్రస్ డైరెక్ట్ గా తెలీదు. కాబట్టి ఫస్ట్ నుండి ఒకటొకటి చెక్ చేసుకుంటూ వెళ్లి కరెక్ట్ గా లాస్ట్ డబ్బా దగ్గర ఆగి (నెక్స్ట్ చైన్ 0 అవ్వగానే) దానికి లింక్ కనెక్ట్ చేసాము (O(N) time).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Append చేయడానికి ఎప్పుడూ O(N) టైమ్ పడుతుందా? ఫాస్ట్ చేయలేమా?</h4>
          <p>సపోజ్ మీ దగ్గర లక్ష డబ్బాలు ఉంటే, చివర్లో ఇంకో డబ్బా యాడ్ చేయడానికి ప్రతిసారి మొదటి నుండి లక్ష సార్లు నడుచుకుంటూ వెళ్ళాలి. ఇది చాలా స్లో! దీన్ని సాల్వ్ చేయడానికి ప్రోగ్రామర్స్ <code>head</code> తో పాటు, లాస్ట్ డబ్బా అడ్రస్ ని పట్టుకునే <code>tail</code> అనే ఇంకో పాయింటర్ ని కూడా మెయింటైన్ చేస్తారు. దానివల్ల సెకనులో లాస్ట్ కి కనెక్ట్ చేయొచ్చు (O(1)).</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Head ని డిలీట్ చేయాలంటే ఎలా?</h4>
          <p>సింపుల్! హెడ్ కి కిరీటం తీసేసి, దాని నెక్స్ట్ ఉన్న డబ్బాకి కిరీటం పెడతాం. (<code>*head = (*head)-&gt;next;</code>). కానీ ఆ పాత హెడ్ ని మర్చిపోకుండా ఒక టెంపరరీ పాయింటర్ లో పట్టుకుని <code>free(temp)</code> చేయాలి, లేదంటే అది గాలిలో అలాగే ఉండిపోయి మెమరీ లీక్ అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Garbage Collector ఉన్న లాంగ్వేజెస్ లో ఇదంతా చేయాలా?</h4>
          <p>జావా (Java) లేదా పైథాన్ (Python) లో మీరు <code>free()</code> చేయక్కర్లేదు. మీరు ఒక లింక్ ని కట్ చేస్తే (అంటే అడ్రస్ ని నల్ చేస్తే), ఆ కట్ అయిపోయిన డబ్బా దగ్గరికి బ్యాక్ గ్రౌండ్ లో గార్బేజ్ కలెక్టర్ వచ్చి దానంతట అదే క్లీన్ చేసేస్తుంది. కానీ C లో మీరే దేవుడు కాబట్టి అంతా మీరే మ్యాన్యువల్ గా డిలీట్ చేయాలి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 52, "Phase 18", "Data Structures - 1", subtopics, contentBody, '51-c-linked-lists-singly-creation-traversal.html', '51. Linked Lists Basics', '53-c-doubly-and-circular-linked-lists.html', '53. Doubly & Circular Linked Lists');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}


function run() {
  buildLesson48();
  buildLesson49();
  buildLesson50();
  buildLesson51();
  buildLesson52();
  console.log("✅ Generated C Lessons 48 to 52 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
