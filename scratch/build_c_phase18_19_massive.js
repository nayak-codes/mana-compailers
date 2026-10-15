const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

const C_CURRICULUM = [
  {
    id: 'phase18', tag: 'Phase 18', title: 'Data Structures - 1', icon: '🧱',
    lessons: [
      { num: 51, file: '51-c-linked-lists-singly-creation-traversal.html', title: '51. Singly Linked Lists - Basics' },
      { num: 52, file: '52-c-linked-lists-insertion-deletion.html', title: '52. Linked Lists - Insert & Delete' },
      { num: 53, file: '53-c-doubly-and-circular-linked-lists.html', title: '53. Doubly & Circular Linked Lists' },
      { num: 54, file: '54-c-stack-implementation-array-linkedlist.html', title: '54. Stack Implementation' },
      { num: 55, file: '55-c-queue-implementation-linear-circular.html', title: '55. Queue Implementation' }
    ]
  },
  {
    id: 'phase19', tag: 'Phase 19', title: 'Data Structures - 2', icon: '🌳',
    lessons: [
      { num: 56, file: '56-c-trees-basics-and-binary-search-tree-bst.html', title: '56. Trees Basics & BST' },
      { num: 57, file: '57-c-tree-traversals-inorder-preorder-postorder.html', title: '57. Tree Traversals (In/Pre/Post)' },
      { num: 58, file: '58-c-hashing-and-collision-handling.html', title: '58. Hashing & Collision Handling' },
      { num: 59, file: '59-c-graphs-basics-adjacency-matrix-list.html', title: '59. Graphs (Matrix & List)' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, doubly linked list c, circular linked list, stack in c, queue in c, binary search tree c, tree traversals c" />
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

function buildLesson53() {
  const title = "Doubly & Circular Linked Lists (తెలుగులో)";
  const desc = "C లో సింగిల్ లింక్డ్ లిస్ట్ వల్ల వెనక్కి రాలేం! దానికి సొల్యూషన్ ఏంటి? బ్రౌజర్ లో Back & Forward బటన్స్ లాగా రెండు వైపులా కదిలే Doubly Linked List మరియు రౌండ్ గా తిరిగే Circular List ఎలా పనిచేస్తాయో చూద్దాం.";
  const filename = "53-c-doubly-and-circular-linked-lists.html";
  const subtopics = "Doubly Linked List (prev & next) · Circular Linked List · Reverse Traversal · Real-world usage";

  const contentBody = `
    <div class="intro-box">
      <p>మామూలు లింక్డ్ లిస్ట్ (Singly) లో ఒక ప్రాబ్లమ్ ఉంది. అది వన్-వే ట్రాఫిక్ లాంటిది. మీరు ముందుకి వెళ్ళగలరే తప్ప వెనక్కి రాలేరు. మీరు క్రోమ్ బ్రౌజర్ లో హిస్టరీ చూస్తుంటే <strong>Back</strong> మరియు <strong>Forward</strong> రెండు బటన్స్ నొక్కుతారు కదా! ఆ ఫీచర్ కావాలంటే ఒక నోడ్ కి ముందు నోడ్ ఎవరో, వెనక నోడ్ ఎవరో రెండు అడ్రస్ లు తెలియాలి. దాన్నే <strong>Doubly Linked List (డబుల్ లింక్డ్ లిస్ట్)</strong> అంటారు. అలాగే లాస్ట్ నోడ్ కి నల్ (NULL) ఇవ్వకుండా దాన్ని తీసుకొచ్చి మళ్ళీ ఫస్ట్ నోడ్ (Head) కి తగిలిస్తే అదొక చక్రం లాగా తిరుగుతుంది, దాన్నే <strong>Circular List (సర్క్యులర్ లిస్ట్)</strong> అంటారు. ఇవెలా పనిచేస్తాయో డీప్ గా పోస్ట్‌మార్టం చేద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Doubly Linked List అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        సింగిల్ లిస్ట్ లో ప్రతి డబ్బా కి ఒకటే చైన్ (next) ఉంటుంది. డబుల్ లిస్ట్ లో ప్రతి డబ్బా కి రెండు చైన్స్ (prev మరియు next) ఉంటాయి.
      </p>
      <div class="memory-diagram">
[ NULL | Data: 10 | Next ] <====> [ Prev | Data: 20 | Next ] <====> [ Prev | Data: 30 | NULL ]</div>
      <p class="text-prose">
        దీనివల్ల మనం హెడ్ (Head) నుండి చివరి దాకా వెళ్ళచ్చు, మళ్ళీ లాస్ట్ (Tail) పట్టుకుని మొదటి వరకు వెనక్కి (Reverse) రావచ్చు. మ్యూజిక్ ప్లేయర్ లో "Next Song", "Previous Song" బటన్స్ అన్నీ బ్యాక్ గ్రౌండ్ లో ఈ డబుల్ లిస్ట్ మీదే పనిచేస్తాయి.
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> Circular Linked List (చక్రం)</div>
    <div class="section-body">
      <p class="text-prose">
        సర్క్యులర్ లిస్ట్ లో <code>NULL</code> అనే కాన్సెప్టే ఉండదు! లాస్ట్ డబ్బా యొక్క <code>next</code> పాయింటర్ ని తీసుకొచ్చి మొదటి డబ్బాకి (Head) కనెక్ట్ చేస్తారు.
      </p>
      
      <div class="deep-dive-card">
        <h3>🔁 రియల్ లైఫ్ స్టోరీ: విండోస్ లో ఆల్ట్+ట్యాబ్ (Alt+Tab)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          మీరు కంప్యూటర్ లో 5 యాప్స్ ఓపెన్ చేసారు. ఆల్ట్ పట్టుకుని ట్యాబ్ నొక్కుతూ ఉంటే ఒకదాని తర్వాత ఒకటి హైలైట్ అవుతూ, లాస్ట్ యాప్ దాటాక మళ్ళీ ఫస్ట్ యాప్ కి వస్తుంది కదా! అదొక సర్క్యులర్ లిస్ట్! <br><br>
          ఆపరేటింగ్ సిస్టమ్ (OS) లో ఒక ప్రాసెసర్ వంద యాప్స్ కి టైమ్ ఇస్తున్నప్పుడు (Round Robin Scheduling), లాస్ట్ యాప్ కి టైమ్ ఇచ్చాక మళ్ళీ లూప్ తిరిగి ఫస్ట్ యాప్ కి రావాలి. ఆ ప్రాసెస్ మొత్తాన్ని హ్యాండిల్ చేసేది ఈ సర్క్యులర్ లింక్డ్ లిస్టే.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Doubly Linked List)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో డబుల్ పాయింటర్స్ (prev, next) వాడి ఒక లిస్ట్ ని ఎలా తయారు చేసామో, దాన్ని ముందుకి మరియు వెనక్కి ఎలా ప్రింట్ (Forward & Reverse) చేసామో క్రియేటివ్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Doubly Linked List</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

// 1. డబుల్ లిస్ట్ కోసం నోడ్ బ్లూప్రింట్ (రెండు పాయింటర్స్ ఉంటాయి)
struct Node {
    int data;
    struct Node* prev; // వెనక డబ్బా అడ్రస్
    struct Node* next; // ముందు డబ్బా అడ్రస్
};

// కొత్త బాక్స్ క్రియేట్ చేసి చివర్లో యాడ్ చేయడానికి ఫంక్షన్
void append(struct Node** head_ref, int new_data) {
    // కొత్త బాక్స్ కి మెమరీ ఇద్దాం
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = NULL; // ఇది లాస్ట్ కాబట్టి next నల్ అవుతుంది
    
    struct Node* last = *head_ref;
    
    // ఒకవేళ లిస్ట్ ఖాళీగా ఉంటే, ఇదే ఫస్ట్ (Head) అవుతుంది
    if (*head_ref == NULL) {
        new_node->prev = NULL; // ఫస్ట్ కాబట్టి prev కూడా నల్
        *head_ref = new_node;
        return;
    }
    
    // ఖాళీ లేకపోతే, లాస్ట్ డబ్బా దాకా వెతుక్కుంటూ వెళ్దాం
    while (last->next != NULL) {
        last = last->next;
    }
    
    // లాస్ట్ డబ్బా దొరికింది! దానికి ఈ కొత్త బాక్స్ ని కనెక్ట్ చేద్దాం
    last->next = new_node;
    new_node->prev = last; // కొత్త బాక్స్ కి వెనకాల ఈ పాత డబ్బా ఉంటుందని చెప్పాలి!
}

// లిస్ట్ ని ముందుకి, వెనక్కి ప్రింట్ చేసే ఫంక్షన్
void printList(struct Node* node) {
    struct Node* last;
    
    printf("Forward Traversal (Head to Tail):\\n");
    while (node != NULL) {
        printf("%d -> ", node->data);
        last = node; // వెనక్కి రావడానికి లాస్ట్ డబ్బా ని పట్టుకుంటున్నాం
        node = node->next;
    }
    printf("NULL\\n\\n");
    
    printf("Reverse Traversal (Tail to Head):\\n");
    while (last != NULL) {
        printf("%d -> ", last->data);
        last = last->prev; // చైన్ పట్టుకుని వెనక్కి (prev) నడుస్తున్నాం!
    }
    printf("NULL\\n");
}

int main() {
    struct Node* head = NULL;
    
    printf("--- Doubly Linked List Demo ---\\n\\n");
    
    // కొన్ని నోడ్స్ ని యాడ్ చేద్దాం
    append(&head, 10);
    append(&head, 20);
    append(&head, 30);
    append(&head, 40);
    
    // ముందుకి వెనక్కి ప్రింట్ చేద్దాం
    printList(head);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>struct Node* prev;</code>: ఇదే మనకి వెనక్కి వెళ్లడానికి ఉపయోగపడే టైమ్ మెషిన్. మనం కొత్త డబ్బా క్రియేట్ చేసిన ప్రతిసారీ, <code>new_node-&gt;prev = last;</code> అని కనెక్ట్ చేస్తేనే ఆ లింక్ అతుక్కుంటుంది.</li>
        <li><code>last = node;</code>: ఫార్వర్డ్ లూప్ లో మనం లాస్ట్ కి వెళ్ళిపోతే <code>node</code> నల్ (NULL) అయిపోతుంది. కానీ రివర్స్ రావాలంటే లాస్ట్ డబ్బా అడ్రస్ కావాలి కదా! అందుకే లూప్ లోపలే <code>last</code> అనే పాయింటర్ లో దాన్ని సేవ్ చేసుకుంటూ వెళ్ళాం.</li>
        <li><code>last = last-&gt;prev;</code>: రివర్స్ లూప్ లో <code>next</code> కాకుండా <code>prev</code> వాడాం. అంటే 40 నుండి 30, 30 నుండి 20 కి రివర్స్ గేర్ లో వస్తుంది!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Doubly Linked List లో మెమరీ వేస్ట్ అవుతుందా?</h4>
          <p>అవును! సింగిల్ లిస్ట్ తో పోలిస్తే ఇందులో ప్రతి డబ్బాలో ఎక్స్ట్రా ఒక పాయింటర్ (prev) ఉంటుంది. ఒక పాయింటర్ కి 8 బైట్స్ (64-bit సిస్టమ్ లో) పడుతుంది. లక్ష డబ్బాలు ఉంటే లక్ష ఎక్స్ట్రా పాయింటర్స్ కి మెమరీ పోతుంది. అందుకే వెనక్కి రావలసిన అవసరం ఉంటేనే దీన్ని వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: డబుల్ లిస్ట్ లో ఇన్సర్ట్ (Insert) చేయడం కష్టమా?</h4>
          <p>లాజిక్ కొంచెం కష్టం! మీరు మధ్యలో కొత్త నోడ్ దూర్చాలంటే సింగిల్ లిస్ట్ లో 2 చైన్స్ అతుకుతారు. కానీ ఇందులో 4 చైన్స్ మార్చాలి! (కొత్త దాని prev, next కి కనెక్ట్ చేయాలి, అలాగే అటు ఇటు ఉన్న డబ్బాల prev, next లని కూడా కొత్త దానికి మార్చాలి). ఏ ఒక్కటి మర్చిపోయినా లిస్ట్ విరిగిపోతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: బ్రౌజర్ హిస్టరీ లో Doubly List ఎందుకు బెస్ట్? Array వాడొచ్చు కదా?</h4>
          <p>బ్రౌజర్ హిస్టరీ లో మీరు 10 పేజీలు ముందుకెళ్లి, 5 పేజీలు వెనక్కి (Back) వచ్చి, అక్కడ నుండి కొత్త లింక్ క్లిక్ చేస్తే... పాత ఫార్వర్డ్ హిస్టరీ మొత్తం డిలీట్ అయిపోవాలి! లింక్డ్ లిస్ట్ లో అయితే చైన్ కట్ చేస్తే ఆటోమేటిక్ గా కట్ అయిపోతుంది (O(1)). అదే అర్రే లో అయితే అన్నిటినీ వెతుక్కుంటూ డిలీట్ చేయాలి (స్లో). అందుకే డబుల్ లిస్ట్ బెస్ట్!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 53, "Phase 18", "Data Structures - 1", subtopics, contentBody, '52-c-linked-lists-insertion-deletion.html', '52. Insert & Delete', '54-c-stack-implementation-array-linkedlist.html', '54. Stack Implementation');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson54() {
  const title = "Stack Implementation (Array & LinkedList) (తెలుగులో)";
  const desc = "C లో Stack (స్టాక్) అనే డేటా స్ట్రక్చర్ అంటే ఏంటి? LIFO (Last In First Out) కాన్సెప్ట్ తో ఒక ప్లేట్ల దొంతర లాగా దీన్ని Array వాడి లేదా Linked List వాడి ఎలా కోడ్ చేయాలో పక్కా యానిమేటెడ్ రియల్ లైఫ్ ఎగ్జాంపుల్స్ తో నేర్చుకుందాం.";
  const filename = "54-c-stack-implementation-array-linkedlist.html";
  const subtopics = "LIFO Concept · Push and Pop · Stack Overflow/Underflow · Undo Feature";

  const contentBody = `
    <div class="intro-box">
      <p>డేటా స్ట్రక్చర్స్ లో అత్యంత సింపుల్ మరియు ఫేమస్ కాన్సెప్ట్ <strong>Stack (స్టాక్)</strong>. దీన్ని LIFO (Last In, First Out) అంటారు. అంటే చివరగా పెట్టిందే ముందుగా బయటికి వస్తుంది. మీరు ఎప్పుడైనా ఎంఎస్ వర్డ్ (MS Word) లో ఏదైనా తప్పు టైప్ చేసి <strong>Undo (Ctrl+Z)</strong> నొక్కితే కరెక్ట్ గా లాస్ట్ చేసిన యాక్షనే వెనక్కి వెళ్తుంది కదా! అలాగే బ్రౌజర్ లో బ్యాక్ బటన్ నొక్కినా, ఫంక్షన్స్ కాల్ అయ్యి వెనక్కి రావాలన్నా ఈ స్టాక్ పద్ధతే వాడుతారు. దీన్ని C లాంగ్వేజ్ లో ఎలా డిజైన్ చేయాలో ఈరోజు ఒక ఆటలాగా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> స్టాక్ (Stack) అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు ఒక బుఫే (Buffet) భోజనానికి వెళ్లారు అనుకోండి. అక్కడ ఖాళీ ప్లేట్లు అన్నీ ఒకదాని మీద ఒకటి పేర్చి ఉంటాయి. ఎవరైనా ప్లేట్ కావాలంటే ఎక్కడి నుండి తీసుకుంటారు? కచ్చితంగా పైనుండే తీసుకుంటారు! అలాగే సర్వర్ కొత్త ప్లేట్ కడిగి తెస్తే ఎక్కడ పెడతాడు? పైన మాత్రమే పెడతాడు. దీన్నే LIFO అంటారు. కింద ఉన్న ప్లేట్ తీయాలంటే పైన ఉన్నవన్నీ తీశాకే కుదురుతుంది.
      </p>

      <div class="deep-dive-card">
        <h3>📚 రియల్ లైఫ్ స్టోరీ: పుస్తకాల దొంతర (Push & Pop)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          స్టాక్ లో మెయిన్ గా రెండు ఆపరేషన్స్ ఉంటాయి:<br><br>
          <strong>1. Push (పుష్ - లోపలికి తోయడం):</strong> మీరు చదివిన బుక్ ని ఒక బాక్స్ లోపల పైనుండి పడేయడాన్ని పుష్ అంటారు. మీరు ఎన్ని వేసినా, ఎప్పుడూ 'Top' లోనే పడుతుంది.<br><br>
          <strong>2. Pop (పాప్ - బయటికి తీయడం):</strong> బాక్స్ లోపల పైన ఉన్న బుక్ ని బయటికి తీయడాన్ని పాప్ అంటారు. మీరు 3వ బుక్ తీయాలంటే, ముందు 1, 2 బుక్స్ ని పాప్ చేయాల్సిందే!<br><br>
          ఒకవేళ బాక్స్ మొత్తం ఫుల్ అయ్యి బయటికి పడిపోతే దాన్ని <em>Stack Overflow</em> అంటారు. అసలు బాక్స్ లో ఏమీ లేకపోయినా చేయి పెట్టి వెతికితే దాన్ని <em>Stack Underflow</em> అంటారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> స్టాక్ ని ఎలా తయారు చేయొచ్చు?</div>
    <div class="section-body">
      <p class="text-prose">
        స్టాక్ అనేది కేవలం ఒక "రూల్" మాత్రమే (LIFO రూల్). ఆ రూల్ ని మీరు Array వాడి అయినా రాయొచ్చు, లేదా Linked List వాడి అయినా రాయొచ్చు.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>Array తో:</strong> సైజు ముందుగానే ఫిక్స్ అయిపోతుంది. కానీ చాలా ఫాస్ట్ గా పనిచేస్తుంది.</li>
        <li><strong>Linked List తో:</strong> సైజు లిమిట్ ఉండదు (డైనమిక్). ఎప్పుడు కావాలంటే అప్పుడు కొత్త బాక్స్ తయారు చేసి (Head కి) తగిలిస్తారు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Array Stack Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో సింపుల్ గా ఒక 5 సైజు ఉన్న Array వాడి, <code>Top</code> అనే ఒక పాయింటర్ తో Push మరియు Pop ఆపరేషన్స్ ఎలా రాశామో క్లియర్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Stack (Array Implementation)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

#define MAX 5 // బాక్స్ సైజు 5 పుస్తకాలు మాత్రమే పడుతుంది

int stack[MAX];
int top = -1; // బాక్స్ ఖాళీగా ఉందని చెప్పడానికి (Ground floor)

// 1. పుష్ ఆపరేషన్ (పైన పెట్టడం)
void push(int data) {
    if (top == MAX - 1) { // 4వ ఇండెక్స్ కి వస్తే ఫుల్ అయినట్టు!
        printf("[Error] Stack Overflow! బాక్స్ ఫుల్ అయిపోయింది.\\n");
        return;
    }
    top++; // ముందు టేబుల్ హైట్ (Top) పెంచుతాం
    stack[top] = data; // ఆ హైట్ లో బుక్ పెడతాం
    printf("Pushed -> %d\\n", data);
}

// 2. పాప్ ఆపరేషన్ (పైనుండి తీయడం)
void pop() {
    if (top == -1) { // అసలు బాక్స్ ఖాళీగా ఉంటే...
        printf("[Error] Stack Underflow! బాక్స్ లో ఏమీ లేవు.\\n");
        return;
    }
    printf("Popped <- %d\\n", stack[top]); // పైన ఉన్నది బయటికి ఇచ్చేస్తాం
    top--; // టేబుల్ హైట్ తగ్గిస్తాం
}

// 3. లాస్ట్ బుక్ ఏంటో చూడటం (తీయకుండా జస్ట్ తొంగి చూడటం)
void peek() {
    if (top == -1) {
        printf("Stack is Empty!\\n");
    } else {
        printf("Top element is : %d\\n", stack[top]);
    }
}

int main() {
    printf("--- Stack Operations (LIFO) ---\\n\\n");
    
    // బాక్స్ లో 3 బుక్స్ వేద్దాం
    push(10);
    push(20);
    push(30);
    
    printf("\\n");
    peek(); // పైన ఏముందో చూద్దాం (30 ఉండాలి)
    printf("\\n");
    
    // ఇప్పుడు రెండు బుక్స్ బయటికి తీద్దాం (పాప్)
    pop(); // ముందు 30 వస్తుంది
    pop(); // ఆ తర్వాత 20 వస్తుంది
    
    printf("\\n");
    peek(); // ఇప్పుడు 10 మిగలాలి
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>int top = -1;</code>: అర్రే ఇండెక్స్ 0 తో స్టార్ట్ అవుతుంది. అందుకే 0 కంటే కింద (అంటే నేల మీద) ఉన్నాం అని చెప్పడానికి <code>-1</code> తీసుకున్నాం. ఖాళీ స్టాక్ కి ఇదే గుర్తు.</li>
        <li><code>push()</code>: పుష్ చేసిన ప్రతిసారీ ఫస్ట్ <code>top</code> ఇంక్రిమెంట్ అవుతుంది (0 కి వస్తుంది), ఆ 0 ఇండెక్స్ లోకి డేటా కూర్చుంటుంది. మళ్ళీ పుష్ చేస్తే 1 కి వెళ్తుంది.</li>
        <li><code>pop()</code>: పాప్ చేసినప్పుడు డేటా ని నిజంగా డిలీట్ చేయక్కర్లేదు! జస్ట్ <code>top--</code> అని కిందకు వచ్చేస్తే చాలు. మళ్ళీ రేపు పుష్ చేసినప్పుడు ఆ పాత డేటా మీదనే కొత్త డేటా ఓవర్-రైట్ అవుతుంది. చాలా ఫాస్ట్ ట్రిక్ ఇది!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ప్రోగ్రామ్ రన్ అయ్యే మెమరీ "Stack" కి, ఈ డేటా స్ట్రక్చర్ "Stack" కి తేడా ఏంటి?</h4>
          <p>చాలా పెద్ద కన్ఫ్యూజన్ ఇది! మీ CPU లో ఉండే స్టాక్ మెమరీ (లోకల్ వేరియబుల్స్ కి వాడేది) కూడా సేమ్ ఈ LIFO కాన్సెప్ట్ తోనే (ఆటోమేటిక్ గా) రన్ అవుతుంది కాబట్టి దానికి ఆ పేరు వచ్చింది. కానీ మనం పైన కోడ్ తో రాసిన స్టాక్ అనేది ఒక కస్టమ్ డేటా స్ట్రక్చర్. ఇది (మనం అర్రే కి malloc వాడితే) హీప్ లో కూడా రన్ అవ్వగలదు!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Linked List తో స్టాక్ రాస్తే పుష్/పాప్ ఎక్కడ చేయాలి?</h4>
          <p>లింక్డ్ లిస్ట్ వాడినప్పుడు మీరు పుష్ ని ఎప్పుడూ మొదటి డబ్బాకి (Insert at Head) మాత్రమే చేయాలి. పాప్ కూడా అక్కడే (Delete at Head) చేయాలి. ఎందుకంటే లాస్ట్ లో చేస్తే (O(N) టైమ్ పడుతుంది). హెడ్ దగ్గర అయితే 1 సెకనులో (O(1)) అయిపోతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: బ్రాకెట్స్ మ్యాచింగ్ (Balanced Parenthesis) క్వశ్చన్ ఏంటి?</h4>
          <p>ఇది ప్రాబ్లమ్ సాల్వింగ్ లో టాప్ క్వశ్చన్. ఒక కోడ్ లో <code>{ [ ( ) ] }</code> ఇలా బ్రాకెట్స్ అన్నీ కరెక్ట్ గా క్లోజ్ అయ్యాయా లేదా అని కంపైలర్ ఎలా చెక్ చేస్తుంది? ఓపెన్ బ్రాకెట్ వస్తే స్టాక్ లోకి పుష్ చేస్తుంది, క్లోజ్ బ్రాకెట్ వస్తే పాప్ చేసి రెండూ మ్యాచ్ అయ్యాయా అని చూస్తుంది. లాస్ట్ కి స్టాక్ ఖాళీ అయితే కోడ్ కరెక్ట్ అని అర్థం!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 54, "Phase 18", "Data Structures - 1", subtopics, contentBody, '53-c-doubly-and-circular-linked-lists.html', '53. Doubly & Circular Linked Lists', '55-c-queue-implementation-linear-circular.html', '55. Queue Implementation');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson55() {
  const title = "Queue Implementation (Linear & Circular) (తెలుగులో)";
  const desc = "C లో Queue (క్యూ) అనే డేటా స్ట్రక్చర్ అంటే ఏంటి? FIFO (First In First Out) కాన్సెప్ట్ తో సినిమా టికెట్ క్యూ లాగా దీన్ని ఎలా డిజైన్ చేయాలి? మెమరీ వేస్ట్ అవ్వకుండా Circular Queue ఎలా పని చేస్తుందో డీప్ గా నేర్చుకుందాం.";
  const filename = "55-c-queue-implementation-linear-circular.html";
  const subtopics = "FIFO Concept · Enqueue and Dequeue · Front & Rear Pointers · Circular Queue Magic";

  const contentBody = `
    <div class="intro-box">
      <p>లాస్ట్ లెసన్ లో మనం ప్లేట్ల దొంతర లాంటి స్టాక్ (LIFO) గురించి నేర్చుకున్నాం కదా. కానీ రియల్ లైఫ్ లో ఎవరైనా సినిమా టికెట్స్ కోసం లైన్ లో నిలబడితే, ముందు వచ్చిన వాడికే ముందు టికెట్ ఇస్తారు కానీ లాస్ట్ వచ్చిన వాడికి ఇవ్వరు కదా! ఈ లాజిక్ ని కంప్యూటర్ లో డిజైన్ చేయడాన్నే <strong>Queue (క్యూ)</strong> అంటారు. దీన్ని FIFO (First In, First Out) అంటారు. మీరు ప్రింటర్ కి 10 ఫైల్స్ ఇస్తే ఏది ముందు ప్రింట్ అవ్వాలి? కస్టమర్ కేర్ కాల్స్ లో ఎవరితో ముందు మాట్లాడాలి? ఇలాంటి సర్వీస్ లాజిక్స్ అన్నీ ఈ Queue స్ట్రక్చర్ మీదే రన్ అవుతాయి. ఇదెలాగో ఈరోజు అద్భుతంగా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> క్యూ (Queue) లో రెండు పాయింటర్స్!</div>
    <div class="section-body">
      <p class="text-prose">
        స్టాక్ లో కేవలం ఒకటే టాప్ (Top) ఉంటుంది. కానీ క్యూ లో ఇద్దరు ఉంటారు. ఒకటి ముందు (Front), రెండు వెనక (Rear).
      </p>
      
      <div class="deep-dive-card">
        <h3>🎟️ రియల్ లైఫ్ స్టోరీ: సినిమా థియేటర్ లైన్ (Enqueue & Dequeue)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          ఒక థియేటర్ ముందు క్యూ లైన్ ఉంది.<br><br>
          <strong>1. Enqueue (లోపలికి వెళ్లడం):</strong> కొత్తగా ఒకడు వస్తే ఎక్కడ నిలబడతాడు? క్యూ వెనకాల (Rear) నిలబడతాడు. అంటే మనం డేటా యాడ్ చేయాలంటే ఎప్పుడూ Rear దగ్గరే యాడ్ చేయాలి. ఆ తర్వాత Rear ఒక స్టెప్ వెనక్కి జరుగుతుంది.<br><br>
          <strong>2. Dequeue (బయటికి రావడం):</strong> కౌంటర్ లో ఉన్నవాడు ఎవరికి టికెట్ ఇస్తాడు? లైన్ లో ముందు (Front) ఉన్నోడికే! వాడు టికెట్ తీసుకుని వెళ్ళిపోగానే, Front ఒక స్టెప్ వెనక్కి వస్తుంది.<br><br>
          క్యూ పూర్తిగా ఫుల్ అయితే <em>Overflow</em>, అసలు ఎవరూ లేకపోతే <em>Underflow</em> అంటారు.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> మామూలు క్యూ లో ప్రాబ్లమ్ ఏంటి? (Linear Waste)</div>
    <div class="section-body">
      <p class="text-prose">
        మీ దగ్గర 5 కుర్చీలు ఉన్న ఒక క్యూ ఉంది అనుకోండి (Array Size 5). ఐదుగురు వచ్చి కూర్చున్నారు (ఫుల్). ఇప్పుడు ముందు ఉన్న ఇద్దరు టికెట్ తీసుకుని వెళ్లిపోయారు. వాళ్ళ కుర్చీలు (Index 0, 1) ఖాళీ అయ్యాయి! కానీ కొత్త వాళ్లు రావాలంటే అటు వెనకాలే రావాలి, వెనకాల కుర్చీలు లేవు! ముందు రెండు కుర్చీలు ఖాళీ ఉన్నా వాడలేము. దీన్నే <strong>Linear Queue Waste</strong> అంటారు.
      </p>
      <p class="text-prose">
        దీన్ని సాల్వ్ చేయడానికే <strong>Circular Queue (చక్రాకార క్యూ)</strong> కనిపెట్టారు. ఇందులో లాస్ట్ కుర్చీ తర్వాత మళ్ళీ డైరెక్ట్ గా ఫస్ట్ కుర్చీ కి లింక్ ఉంటుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Linear Queue Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో అర్రే వాడి ఒక సింపుల్ క్యూ ని ఎలా తయారు చేసామో, Front మరియు Rear పాయింటర్స్ ని ఎలా మార్చామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Linear Queue (FIFO)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

#define MAX 5 // క్యూ సైజు 5 

int queue[MAX];
int front = -1; // ముందు పాయింటర్
int rear = -1;  // వెనక పాయింటర్

// 1. ఎన్-క్యూ (లైన్ లోకి వెళ్లడం)
void enqueue(int data) {
    if (rear == MAX - 1) { // క్యూ మొత్తం నిండిపోయింది
        printf("[Error] Queue is FULL! (Overflow)\\n");
        return;
    }
    
    // ఒకవేళ ఇదే ఫస్ట్ ఎంట్రీ అయితే ఫ్రంట్ ని కూడా జీరోకి తేవాలి
    if (front == -1) {
        front = 0;
    }
    
    rear++; // వెనక ఒక స్టెప్ జరిపి
    queue[rear] = data; // అక్కడ కూర్చోపెడదాం
    printf("Enqueued: %d\\n", data);
}

// 2. డి-క్యూ (టికెట్ తీసుకుని వెళ్ళిపోవడం)
void dequeue() {
    // అసలు క్యూ లో ఎవరూ లేకపోతే...
    if (front == -1 || front > rear) {
        printf("[Error] Queue is EMPTY! (Underflow)\\n");
        return;
    }
    
    printf("Dequeued: %d (He got the ticket!)\\n", queue[front]);
    front++; // నెక్స్ట్ వాడికి ఫ్రంట్ ని జరుపుదాం
}

// క్యూ లో ఉన్న వాళ్ళందరినీ ప్రింట్ చేద్దాం
void display() {
    if (front == -1 || front > rear) {
        printf("Queue is Empty.\\n");
        return;
    }
    
    printf("Current Queue: ");
    for (int i = front; i <= rear; i++) {
        printf("%d ", queue[i]);
    }
    printf("\\n");
}

int main() {
    printf("--- Queue Operations (FIFO) ---\\n\\n");
    
    // ముగ్గురిని లైన్ లో పెడదాం
    enqueue(10);
    enqueue(20);
    enqueue(30);
    
    display(); // 10 20 30
    
    // ఇద్దరికి టికెట్ ఇద్దాం
    printf("\\nIssueing tickets...\\n");
    dequeue(); // 10 వెళ్ళిపోతాడు
    dequeue(); // 20 వెళ్ళిపోతాడు
    
    display(); // ఇప్పుడు కేవలం 30 మాత్రమే లైన్ లో ఉంటాడు
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>front = -1, rear = -1</code>: మొదట్లో ఇద్దరూ గ్రౌండ్ లో ఉంటారు. ఫస్ట్ వాడు వచ్చినప్పుడు ఇద్దరూ ఒకేసారి 0 దగ్గరికి వస్తారు.</li>
        <li><code>rear++</code>: కొత్త వాడు వస్తే వెనక ఉన్నోడు (Rear) జరిగి జరిగి వాల్యూ పెరుగుతూ వెళ్తుంది.</li>
        <li><code>front++</code>: ముందున్నోడు వెళ్ళిపోగానే, ఫ్రంట్ పాయింటర్ వాల్యూ పెరుగుతూ వెళ్తుంది. ఒకవేళ ఫ్రంట్ వాల్యూ, రియర్ ని దాటి ముందుకు వెళ్లిపోయిందంటే లైన్ ఖాళీ అయినట్టే లెక్క (<code>front &gt; rear</code>)!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Circular Queue లాజిక్ ని (<code>%</code>) వాడి ఎలా రాస్తారు?</h4>
          <p>సింపుల్! నార్మల్ క్యూ లో <code>rear++</code> రాస్తాం కదా, సర్క్యులర్ క్యూ లో <code>rear = (rear + 1) % MAX</code> అని రాస్తాం. ఒకవేళ MAX 5 అయితే, లాస్ట్ ఇండెక్స్ (4+1)%5 చేస్తే ఆన్సర్ 0 వస్తుంది. అంటే 4వ కుర్చీ నుండి డైరెక్ట్ గా మళ్ళీ 0వ కుర్చీకి రౌండ్ తిరిగి వెళ్ళిపోతుంది. ఇదే సర్క్యులర్ క్యూ మ్యాజిక్!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Priority Queue (ప్రియారిటీ క్యూ) అంటే ఏంటి?</h4>
          <p>ఇది ఒక స్పెషల్ క్యూ! ఆసుపత్రి ఎమర్జెన్సీ వార్డ్ లాంటిది. ఒక నార్మల్ పేషెంట్ వెళ్తే లైన్ లో నిలబడతాడు. కానీ ఎవరికైనా హార్ట్ ఎటాక్ వస్తే, వాడిని లైన్ వెనకాల కాకుండా డైరెక్ట్ గా ఫ్రంట్ కి (Priority) పంపిస్తారు. ఆపరేటింగ్ సిస్టమ్ లో VIP టాస్క్ లకి ముందు ర్యామ్ ఇవ్వడానికి ఈ డేటా స్ట్రక్చరే వాడుతారు (Heaps వాడి రాస్తారు).</p>
        </div>
        <div class="faq-item">
          <h4>Q3: 2 Stacks వాడి ఒక Queue ని తయారు చేయొచ్చా?</h4>
          <p>ఎస్! ఇది ఇంటర్వ్యూలలో కచ్చితంగా అడిగే పజిల్. స్టాక్ అనేది రివర్స్ చేస్తుంది కదా. ఒక బాక్స్ లో వేసి, మళ్ళీ ఆ బాక్స్ ని రివర్స్ చేసి ఇంకో బాక్స్ లో వేస్తే... రివర్స్ కి రివర్స్ ఒరిజినల్ అవుతుంది కదా! ఈ లాజిక్ తో రెండు స్టాక్స్ వాడి ఒక పర్ఫెక్ట్ క్యూ ని సిమ్యులేట్ చేయొచ్చు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 55, "Phase 18", "Data Structures - 1", subtopics, contentBody, '54-c-stack-implementation-array-linkedlist.html', '54. Stack Implementation', '56-c-trees-basics-and-binary-search-tree-bst.html', '56. Trees Basics & BST');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson56() {
  const title = "Trees Basics & Binary Search Tree (BST) (తెలుగులో)";
  const desc = "C లో Non-linear Data Structures ప్రపంచం! Tree (చెట్టు) అంటే ఏంటి? రూట్, ఆకులు (Leafs) ఎలా ఉంటాయి? గూగుల్ లో వెతికినట్టు లక్ష డేటాని ఒకే సెకనులో వెతికే Binary Search Tree (BST) మ్యాజిక్ ఏంటో డీప్ గా చూద్దాం.";
  const filename = "56-c-trees-basics-and-binary-search-tree-bst.html";
  const subtopics = "Tree Terminology · Root & Leaves · Binary Tree · Binary Search Tree (BST) Logic";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంతవరకు మనం నేర్చుకున్న Array, Linked List అన్నీ ఒక సరళ రేఖలో (Linear) ఉంటాయి. అంటే డేటా వెతకాలంటే ఒకదాని తర్వాత ఒకటి వెతుక్కుంటూ వెళ్లాలి. ఒకవేళ 1 కోటి రికార్డ్స్ ఉంటే, లాస్ట్ రికార్డ్ వెతకడానికి ఒక కోటి సెకన్లు పడుతుంది! కానీ గూగుల్ లాంటి వాళ్ళు మీరు టైప్ చేయగానే ఆన్సర్ ఎలా ఇస్తున్నారు? దానికి వాడే బ్రహ్మాస్త్రమే <strong>Trees (చెట్లు)</strong>. ఇవి Non-linear డేటా స్ట్రక్చర్స్. మన ఫ్యామిలీ ట్రీ లాగా, లేదా కంప్యూటర్ ఫోల్డర్ల లాగా డేటాని ఒక చెట్టు కొమ్మల్లాగా విడగొట్టి కనెక్ట్ చేస్తాయి. ఇందులో <strong>Binary Search Tree (BST)</strong> అయితే డేటాని వెతకడంలో స్పీడ్ కి రారాజు! అదెలాగో ఈరోజు అద్భుతంగా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> ట్రీ (Tree) లో ఉండే పదాలు (Terminology)</div>
    <div class="section-body">
      <p class="text-prose">
        ప్రోగ్రామింగ్ లో చెట్టు తలకిందులుగా ఉంటుంది! అంటే వేర్లు పైన ఉంటాయి, ఆకులు కింద ఉంటాయి.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>Root (రూట్):</strong> చెట్టు పైభాగంలో ఉండే మొట్టమొదటి బాక్స్. (హెడ్ లాగా అన్నమాట).</li>
        <li><strong>Parent & Child (తల్లి - పిల్లలు):</strong> ఒక బాక్స్ కింద ఇంకో బాక్స్ కి లింక్ ఉంటే, పైనున్న దాన్ని పేరెంట్ అని, కింద దాన్ని చైల్డ్ అని అంటారు.</li>
        <li><strong>Leaf (ఆకు):</strong> కింద ఇంకా ఎవరికీ కనెక్ట్ అవ్వని బాక్స్ ని (చివరి వాటిని) లీఫ్ నోడ్స్ అంటారు.</li>
      </ul>
      <p class="text-prose">
        <strong>Binary Tree (బైనరీ ట్రీ) అంటే ఏంటి?</strong> ఏ చెట్టులో అయితే ప్రతి పేరెంట్ కి కేవలం మాక్సిమం <strong>ఇద్దరు పిల్లలే</strong> (Left Child, Right Child) ఉంటారో, దాన్నే బైనరీ ట్రీ అంటారు. (అంటే 0, 1, లేదా 2 పిల్లలు మాత్రమే ఉండాలి).
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> Binary Search Tree (BST) లాజిక్</div>
    <div class="section-body">
      <p class="text-prose">
        బైనరీ ట్రీ కి ఒక పవర్ఫుల్ కండిషన్ (రూల్) పెడితే, అది బైనరీ సెర్చ్ ట్రీ (BST) అవుతుంది! ఆ రూల్ ఏంటంటే:
      </p>
      
      <div class="deep-dive-card">
        <h3>🔍 రియల్ లైఫ్ స్టోరీ: స్కూల్ అసెంబ్లీ లైన్ (The Left-Right Rule)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          ఒక బాస్ (Root = 50) నిలబడ్డాడు. కొత్తగా ఒక పిల్లాడు (30) వచ్చాడు. బాస్ కన్నా తక్కువ ఉన్నాడు కాబట్టి, కచ్చితంగా <strong>ఎడమ వైపు (Left)</strong> నిలబడాలి. ఇంకో పిల్లాడు (70) వచ్చాడు. బాస్ కన్నా ఎక్కువ ఉన్నాడు కాబట్టి <strong>కుడి వైపు (Right)</strong> నిలబడాలి.<br><br>
          ఇప్పుడు మీరు 25 కోసం వెతకాలి. బాస్ ని అడుగుతారు. బాస్ ఏమంటాడు? "నేను 50, నువ్వు వెతుకుతున్నది నాకన్నా చిన్నది కదా, కాబట్టి నా కుడి వైపు అసలు వెళ్ళకు, అందులో లక్ష మంది ఉన్నా వాళ్ళంతా నాకన్నా పెద్దోళ్ళే. డైరెక్ట్ గా నా ఎడమ వైపు వెళ్లి వెతుక్కో" అంటాడు.<br>
          దీనివల్ల సగం డేటా వెతకాల్సిన అవసరమే లేకుండా డిలీట్ అయిపోతుంది! ఇదే BST స్పీడ్ మ్యాజిక్ (O(log N)).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Creating a BST Node)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో డబుల్ లింక్డ్ లిస్ట్ లాగానే రెండు పాయింటర్స్ తీసుకుని, కానీ ఈసారి వాటిని left మరియు right గా పెట్టి ఒక సింపుల్ BST ని ఎలా డిజైన్ చేసామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Binary Search Tree (BST)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

// ట్రీ నోడ్ బ్లూప్రింట్ (ఒక డేటా, రెండు చేతులు)
struct Node {
    int data;
    struct Node* left;  // ఎడమ చేయి
    struct Node* right; // కుడి చేయి
};

// కొత్త నోడ్ ని తయారుచేసే ఫంక్షన్
struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// BST లోకి కొత్త వాల్యూ ని దూర్చడం (Insert)
struct Node* insertNode(struct Node* root, int value) {
    // చెట్టు ఖాళీగా ఉంటే, వీడే రూట్ (బాస్) అవుతాడు
    if (root == NULL) {
        return createNode(value);
    }
    
    // వాల్యూ బాస్ కన్నా చిన్నది అయితే ఎడమ వైపు వెళ్ళు
    if (value < root->data) {
        root->left = insertNode(root->left, value);
    }
    // వాల్యూ బాస్ కన్నా పెద్దది అయితే కుడి వైపు వెళ్ళు
    else if (value > root->data) {
        root->right = insertNode(root->right, value);
    }
    
    // బాస్ కి పర్మిషన్ ఇచ్చి రిటర్న్ చేయి
    return root;
}

int main() {
    printf("--- Binary Search Tree (BST) ---\\n\\n");
    
    struct Node* root = NULL; // మొదట్లో చెట్టు లేదు
    
    // 50 ని యాడ్ చేద్దాం (ఇది రూట్ అవుతుంది)
    root = insertNode(root, 50);
    printf("Inserted 50 (Root)\\n");
    
    // చిన్నవి యాడ్ చేద్దాం (ఇవి ఎడమ వైపుకి వెళ్తాయి)
    insertNode(root, 30);
    insertNode(root, 20);
    printf("Inserted 30, 20 (Went Left)\\n");
    
    // పెద్దవి యాడ్ చేద్దాం (ఇవి కుడి వైపుకి వెళ్తాయి)
    insertNode(root, 70);
    insertNode(root, 90);
    printf("Inserted 70, 90 (Went Right)\\n");
    
    printf("\\n[+] Tree successfully created in RAM!\\n");
    
    // (నెక్స్ట్ లెసన్ లో వీటిని ఎలా ప్రింట్ చేయాలో చూద్దాం)
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>struct Node* left, *right;</code>: డబుల్ లింక్డ్ లిస్ట్ లో లాగా ఇక్కడ వెనక్కి వెళ్లే దారి ఉండదు! పేరెంట్ నుండి చైల్డ్ కి, ఎడమ కొమ్మ లేదా కుడి కొమ్మ గా రెండు దారులు చీలుతాయి.</li>
        <li><code>insertNode(...)</code>: ఇది ఒక <strong>రికర్సివ్ (Recursive) ఫంక్షన్</strong>. అంటే తనని తనే కాల్ చేసుకుంటుంది. బాస్ కన్నా చిన్నది వస్తే, <code>insertNode(root-&gt;left, value)</code> అని పిలిచి, ఎడమ పక్కన ఉన్నవాడిని అడగమని కిందికి పంపుతుంది. ఖాళీ దొరికేదాకా ఆ వాల్యూ కిందికి దిగుతూనే ఉంటుంది!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఒకవేళ వాల్యూ బాస్ తో సమానం అయితే (Duplicate) ఎటు వెళ్ళాలి?</h4>
          <p>చాలా ఇంపార్టెంట్ క్వశ్చన్! స్టాండర్డ్ బైనరీ సెర్చ్ ట్రీ లో డూప్లికేట్స్ ని అసలు ఒప్పుకోరు. కానీ కొన్ని సిస్టమ్స్ లో కావాలనుకుంటే, వాటిని ఎప్పుడూ కుడి వైపు (Right side) కి వెళ్లేలా రూల్ రాసుకుంటారు. (<code>&gt;=</code> అని వాడతారు).</p>
        </div>
        <div class="faq-item">
          <h4>Q2: BST లో డేటా వెతకడానికి ఎంత టైమ్ పడుతుంది?</h4>
          <p>ఆవరేజ్ గా <strong>O(log N)</strong> పడుతుంది. అంటే మీరు ప్రతిసారి సగం చెట్టుని ఇగ్నోర్ చేస్తారు. 1024 రికార్డ్స్ ఉంటే కేవలం 10 సార్లు జంప్ చేస్తే చాలు డేటా దొరుకుతుంది. అర్రే లో అయితే 1024 సార్లు వెతకాలి. అదీ పవర్ ఆఫ్ ట్రీ!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: వరస్ట్ కేస్ (Worst case) లో BST ఎలా బిహేవ్ చేస్తుంది?</h4>
          <p>మీరు డేటాని ఒక ఆర్డర్ లో (10, 20, 30, 40) ఇస్తే, అన్నీ బాస్ కి కుడివైపే వెళ్తాయి. అప్పుడు ఆ చెట్టు కాస్తా ఒక సరళ రేఖ (Linked List లాగా) అయిపోతుంది! దాన్ని Skewed Tree అంటారు. అప్పుడు దాని స్పీడ్ కాస్తా స్లో (O(N)) అయిపోతుంది. దీన్ని సాల్వ్ చేయడానికే AVL Trees, Red-Black Trees అని డిజైన్ చేశారు (వాటంతట అవే బ్యాలెన్స్ చేసుకుంటాయి).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 56, "Phase 19", "Data Structures - 2", subtopics, contentBody, '55-c-queue-implementation-linear-circular.html', '55. Queue Implementation', '57-c-tree-traversals-inorder-preorder-postorder.html', '57. Tree Traversals');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson57() {
  const title = "Tree Traversals (Inorder, Preorder, Postorder) (తెలుగులో)";
  const desc = "C లో ట్రీ (Tree) ని ప్రింట్ చేయడం అంత సులభం కాదు! దానికి లూప్స్ పనిచేయవు. Inorder, Preorder, Postorder అనే మూడు రకాల Recursion టెక్నిక్స్ తో చెట్టు మీద ప్రతి ఆకునీ ఎలా టచ్ చేసి రావాలో యానిమేషన్ లాంటి థియరీతో నేర్చుకుందాం.";
  const filename = "57-c-tree-traversals-inorder-preorder-postorder.html";
  const subtopics = "Tree Traversal · Inorder (L N R) · Preorder (N L R) · Postorder (L R N) · Recursion Magic";

  const contentBody = `
    <div class="intro-box">
      <p>లాస్ట్ లెసన్ లో మనం చెట్టుని క్రియేట్ చేసాం కదా! కానీ అందులో ఉన్న డేటా ని ప్రింట్ చేయాలంటే అర్రే లాగా <code>for</code> లూప్ రాస్తే కుదరదు. ఎందుకంటే ఎక్కడికి వెళ్ళాలో రెండు దారులు ఉంటాయి (Left, Right). మరి చెట్టు మొత్తాన్ని మిస్ అవ్వకుండా ఎలా కవర్ చేయాలి? దానికి ఉన్న దారే <strong>Tree Traversals (ట్రావర్సల్స్)</strong>. ఇందులో Inorder, Preorder, Postorder అని మూడు ఫేమస్ పద్ధతులు ఉన్నాయి. ఈ మూడు పద్ధతులు Recursion (రికర్షన్) అనే మ్యాజిక్ వాడి 10 లైన్ల కోడ్ తోనే 10 వేల నోడ్స్ ని ఎలా ప్రింట్ చేస్తాయో ఈరోజు అద్భుతంగా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> మూడు పద్ధతులు ఏంటి? (The Golden Rules)</div>
    <div class="section-body">
      <p class="text-prose">
        ప్రతి నోడ్ దగ్గరికి వెళ్ళినప్పుడు మనం మూడు పనులు చేయాలి: 1. ఎడమవైపు (<strong>L</strong>) కి వెళ్ళడం, 2. కుడివైపు (<strong>R</strong>) కి వెళ్ళడం, 3. అసలు డేటాని ప్రింట్ (<strong>N</strong> - Node) చేయడం. ఈ మూడు పనుల ఆర్డర్ బట్టే పేర్లు మారాయి!
      </p>
      
      <div class="deep-dive-card">
        <h3>🚶‍♂️ రియల్ లైఫ్ స్టోరీ: అడవిలో ఫొటోగ్రాఫర్</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          <strong>1. Inorder (L-N-R) - "మధ్యలో దేవుడు":</strong> ఫొటోగ్రాఫర్ ముందు ఎడమ పక్కకెళ్లి అంతా ఫోటోలు తీసి, ఆ తర్వాత మెయిన్ బాస్ (N) ఫోటో తీసి, లాస్ట్ లో కుడి పక్కకి వెళ్తాడు. BST లో ఇలా ప్రింట్ చేస్తే, <strong>మొత్తం డేటా అసెండింగ్ ఆర్డర్ (చిన్న నుండి పెద్ద) లో</strong> నీట్ గా సార్ట్ అయ్యి బయటికి వస్తుంది!<br><br>
          <strong>2. Preorder (N-L-R) - "ముందే సెల్ఫీ":</strong> ఒక కొత్త చెట్టు దగ్గరికి వెళ్ళగానే ముందే వాడు సెల్ఫీ (N) తీసేసుకుంటాడు. ఆ తర్వాతే ఎడమకి, కుడికి వెళ్తాడు. ఒక చెట్టుని యాజ్-ఇట్-ఈజ్ గా జిరాక్స్ కాపీ (Clone) కొట్టాలంటే ఈ పద్ధతి బెస్ట్.<br><br>
          <strong>3. Postorder (L-R-N) - "లాస్ట్ లో బ్రేక్":</strong> ముందు ఎడమ మొత్తం, తర్వాత కుడి మొత్తం చూసేసాక, లాస్ట్ లో ఆ బాస్ (N) ఫోటో తీస్తాడు. ఒక చెట్టుని సేఫ్ గా కిందినుండి డిలీట్ (Delete tree) చేయాలంటే ఇదే వాడాలి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> రికర్షన్ (Recursion) మ్యాజిక్ ఎలా పనిచేస్తుంది?</div>
    <div class="section-body">
      <p class="text-prose">
        మీరు <code>Inorder(root-&gt;left)</code> అని రాస్తే, కంపైలర్ ప్రస్తుతం ప్రింట్ చేసే పనిని స్టాక్ (Stack Memory) లో హోల్డ్ లో పెట్టి, కిందికి దూకి దాని ఎడమ కొమ్మ పని పూర్తిచేస్తుంది. అది పూర్తిగా అయ్యాకే పైకి వచ్చి అప్పుడు ప్రింట్ చేస్తుంది. ఇది అర్ధం చేసుకోవడానికి కష్టం గానీ, రన్ అయితే భలే మ్యాజిక్ లాగా ఉంటుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (3 Traversals Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో మూడు ఫంక్షన్స్ చాలా చిన్నవిగా ఉంటాయి, కానీ అవుట్పుట్ లో వాటి ఆర్డర్ ఎలా మారుతుందో లైవ్ గా చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Tree Traversals</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

struct Node {
    int data;
    struct Node *left, *right;
};

// కొత్త నోడ్ క్రియేట్ చేయడానికి హెల్పర్
struct Node* create(int v) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    n->data = v; n->left = NULL; n->right = NULL;
    return n;
}

// ------------------------------------
// 1. Inorder (L - N - R)
// ------------------------------------
void inorder(struct Node* root) {
    if (root == NULL) return; // చెట్టు ఎండ్ అయితే ఆగిపో
    
    inorder(root->left);           // 1. ముందు మొత్తం ఎడమకి వెళ్ళు
    printf("%d ", root->data);     // 2. డేటాని ప్రింట్ చేయి
    inorder(root->right);          // 3. ఆ తర్వాత కుడికి వెళ్ళు
}

// ------------------------------------
// 2. Preorder (N - L - R)
// ------------------------------------
void preorder(struct Node* root) {
    if (root == NULL) return;
    
    printf("%d ", root->data);     // 1. ముందే ప్రింట్ చేసేయ్
    preorder(root->left);          // 2. ఎడమకి వెళ్ళు
    preorder(root->right);         // 3. కుడికి వెళ్ళు
}

// ------------------------------------
// 3. Postorder (L - R - N)
// ------------------------------------
void postorder(struct Node* root) {
    if (root == NULL) return;
    
    postorder(root->left);         // 1. ఎడమకి వెళ్ళు
    postorder(root->right);        // 2. కుడికి వెళ్ళు
    printf("%d ", root->data);     // 3. అంతా అయ్యాక లాస్ట్ లో ప్రింట్ చేయి
}

int main() {
    printf("--- Tree Traversals Magic ---\\n\\n");
    
    // ఒక సింపుల్ చెట్టుని మాన్యువల్ గా క్రియేట్ చేద్దాం
    //       50
    //     /    \\
    //   30      70
    //  /  \\    /  \\
    // 20  40  60   80
    
    struct Node* root = create(50);
    root->left = create(30);
    root->right = create(70);
    root->left->left = create(20);
    root->left->right = create(40);
    root->right->left = create(60);
    root->right->right = create(80);
    
    printf("1. Inorder (Sorted output) : ");
    inorder(root); // అవుట్పుట్: 20 30 40 50 60 70 80
    
    printf("\\n2. Preorder (Top-down)     : ");
    preorder(root); // అవుట్పుట్: 50 30 20 40 70 60 80
    
    printf("\\n3. Postorder (Bottom-up)   : ");
    postorder(root); // అవుట్పుట్: 20 40 30 60 80 70 50
    
    printf("\\n");
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>if (root == NULL) return;</code>: ఇది రికర్షన్ కి బ్రేక్ (Base condition). ఇది లేకపోతే మీ లూప్ గాలిలోకి వెళ్లి ఇన్ఫినిట్ అయిపోయి స్టాక్ ఓవర్ ఫ్లో (Stack Overflow) వచ్చి క్రాష్ అవుతుంది! ఆకు (Leaf) దాటాక కింద ఏమీ ఉండదు కాబట్టి, ఇది అక్కడి నుండి వెనక్కి పంపుతుంది.</li>
        <li><code>printf</code> లైన్ మార్చడమే మ్యాజిక్! ఆ <code>printf</code> లైన్ ఎక్కడ ఉందో దాన్ని బట్టే ప్రింట్ అయ్యే ఆర్డర్ మారిపోతుంది. రికర్షన్ స్టాక్ (Stack Memory) లో హోల్డ్ అవుతుంది కాబట్టి, కింది ఫంక్షన్స్ పూర్తయ్యాకే పై ఫంక్షన్స్ <code>printf</code> ఎగ్జిక్యూట్ అవుతాయి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఇవి కాకుండా Level Order (లెవెల్ ఆర్డర్) అని ఒకటి ఉంటుందా?</h4>
          <p>అవును! పై మూడు పద్ధతులు నిలువుగా (Depth-first) వెళ్తాయి. లెవెల్ ఆర్డర్ అనేది ఒక ఫ్లోర్ తర్వాత ఇంకో ఫ్లోర్ అడ్డంగా (Breadth-first) ప్రింట్ చేస్తుంది. ఇది రాయాలంటే కేవలం రికర్షన్ సరిపోదు, అదనంగా ఒక <strong>Queue (క్యూ)</strong> అనే డేటా స్ట్రక్చర్ ని వాడి కోడ్ చేయాలి. ఇంటర్వ్యూస్ లో ఇది చాలా ఫేమస్!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ఒక చెట్టుని పూర్తిగా డిలీట్ చేయాలంటే ఏ పద్ధతి వాడాలి?</h4>
          <p><strong>Postorder</strong> నే వాడాలి! ఎందుకంటే, ముందు పిల్లల్ని (ఎడమ, కుడి) <code>free()</code> చేసి డిలీట్ చేసాకే పేరెంట్ ని డిలీట్ చేయాలి. ఒకవేళ ముందే పేరెంట్ ని (Inorder లాగా) డిలీట్ చేస్తే పిల్లల దగ్గరికి వెళ్ళే దారి (Address) పోయి మెమరీ లీక్ అయిపోతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Recursion కాకుండా Loops వాడి ఇవి రాయొచ్చా?</h4>
          <p>ఖచ్చితంగా రాయొచ్చు. దాన్నే <strong>Iterative Traversal</strong> అంటారు. కానీ దానికి మీరు సొంతంగా ఒక <strong>Stack</strong> డేటా స్ట్రక్చర్ ని కోడ్ లో మెయింటైన్ చేయాలి. రికర్షన్ వాడితే ఆ స్టాక్ ని ఆపరేటింగ్ సిస్టమే ఆటోమేటిక్ గా ఇస్తుంది కాబట్టి 3 లైన్ల కోడ్ లో పని అయిపోయింది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 57, "Phase 19", "Data Structures - 2", subtopics, contentBody, '56-c-trees-basics-and-binary-search-tree-bst.html', '56. Trees Basics & BST', '58-c-hashing-and-collision-handling.html', '58. Hashing & Collisions');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}


function run() {
  buildLesson53();
  buildLesson54();
  buildLesson55();
  buildLesson56();
  buildLesson57();
  console.log("✅ Generated C Lessons 53 to 57 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
