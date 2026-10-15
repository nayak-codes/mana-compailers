const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const cDir = path.join(baseDir, 'blog-c');

const C_CURRICULUM = [
  {
    id: 'phase19', tag: 'Phase 19', title: 'Data Structures - 2', icon: '🌳',
    lessons: [
      { num: 56, file: '56-c-trees-basics-and-binary-search-tree-bst.html', title: '56. Trees Basics & BST' },
      { num: 57, file: '57-c-tree-traversals-inorder-preorder-postorder.html', title: '57. Tree Traversals (In/Pre/Post)' },
      { num: 58, file: '58-c-hashing-and-collision-handling.html', title: '58. Hashing & Collision Handling' },
      { num: 59, file: '59-c-graphs-basics-adjacency-matrix-list.html', title: '59. Graphs (Matrix & List)' }
    ]
  },
  {
    id: 'phase20', tag: 'Phase 20', title: 'Algorithms & Final', icon: '🚀',
    lessons: [
      { num: 60, file: '60-c-searching-linear-and-binary-search.html', title: '60. Linear & Binary Search' },
      { num: 61, file: '61-c-sorting-1-bubble-selection-insertion.html', title: '61. Sorting (Bubble, Selection, Insertion)' },
      { num: 62, file: '62-c-sorting-2-merge-sort-quick-sort.html', title: '62. Sorting (Merge & Quick Sort)' },
      { num: 63, file: '63-c-dynamic-programming-basics.html', title: '63. Dynamic Programming Basics' },
      { num: 64, file: '64-c-system-calls-basics-fork-exec-wait.html', title: '64. System Calls (fork, exec, wait)' },
      { num: 65, file: '65-c-building-a-mini-c-project.html', title: '65. C Master Project & Conclusion' }
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
  <meta name="keywords" content="c tutorial, ${title.toLowerCase()}, hashing c, collision handling, graphs c, binary search c, sorting algorithms c" />
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

function buildLesson58() {
  const title = "Hashing & Collision Handling (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో లక్ష మంది యూజర్స్ డేటా నుండి ఒకడి పాస్వర్డ్ ని కేవలం 1 సెకనులో ఎలా కనిపెట్టాలి? Hashing (హ్యాషింగ్) అంటే ఏంటి? ఒకవేళ ఇద్దరికి ఒకే హ్యాష్ (Collision) వస్తే Chaining మరియు Probing తో దాన్ని ఎలా సాల్వ్ చేయాలో డీప్ గా చూద్దాం.";
  const filename = "58-c-hashing-and-collision-handling.html";
  const subtopics = "Hash Function · Hash Table · Collisions · Chaining · Linear Probing";

  const contentBody = `
    <div class="intro-box">
      <p>ఇంతవరకు మనం అర్రేలో (Array) వెతకాలంటే O(N) టైమ్ పడుతుందని, ట్రీ (BST) లో అయితే సగం టైమ్ O(log N) పడుతుందని చూసాం. కానీ వంద కోట్ల మంది యూజర్స్ ఉన్న సిస్టమ్ లో, ఒకడి పేరు కొట్టగానే వాడి అకౌంట్ వివరాలు <strong>కరెక్ట్ గా ఒకే సెకనులో (O(1) టైమ్ లో)</strong> ఎలా వస్తాయి? ఈ అద్భుతమైన మ్యాజిక్ చేసే టెక్నిక్ పేరే <strong>Hashing (హ్యాషింగ్)</strong>. ఒక పెద్ద పేరుకి ఒక చిన్న నంబర్ (ఇండెక్స్) ని జనరేట్ చేసి, అక్కడే డేటాని దాచడం. మరి ఇద్దరికి ఒకే నంబర్ వస్తే ఏం చేస్తారు? దీన్నే Collision అంటారు. ఇవన్నీ ఎలా జరుగుతాయో యానిమేషన్ లాగా నేర్చుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> హ్యాషింగ్ (Hashing) అంటే ఏంటి?</div>
    <div class="section-body">
      <p class="text-prose">
        హ్యాషింగ్ లో రెండు మెయిన్ పార్ట్స్ ఉంటాయి: 1. <strong>Hash Table (హ్యాష్ టేబుల్)</strong>: ఇది నార్మల్ అర్రే (Array). 2. <strong>Hash Function (హ్యాష్ ఫంక్షన్)</strong>: ఇది ఒక మిక్సీ (Mixer) లాంటిది. మీరు ఏ పేరు (String/Data) ఇచ్చినా, అది క్యాలిక్యులేట్ చేసి ఒక నంబర్ (Index) ని ఇస్తుంది.
      </p>

      <div class="deep-dive-card">
        <h3>🗄️ రియల్ లైఫ్ స్టోరీ: హోటల్ రూమ్ లాకర్స్</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          ఒక ఫేమస్ క్లబ్ లో వంద లాకర్స్ (Hash Table) ఉన్నాయి. కస్టమర్ వచ్చి తన వస్తువులు ఇవ్వగానే, రిసెప్షనిస్ట్ లాకర్ నంబర్ వెతకడు. వాడి పేరులో ఉన్న అక్షరాలని తీసుకుని ఒక లెక్క వేస్తాడు (ఉదా: <em>A=1, B=2 కాబట్టి 'CAB' అంటే 3+1+2 = 6</em>). డైరెక్ట్ గా వెళ్లి 6వ లాకర్ లో వస్తువులు పెట్టేస్తాడు (ఇదే Hash Function).<br><br>
          రేపు వాడు వచ్చి "నా పేరు CAB" అనగానే, మళ్ళీ లెక్కేసి డైరెక్ట్ గా 6వ లాకర్ తీసి ఇస్తాడు! అంటే లక్ష మంది ఉన్నా సరే, వెతకడానికి పట్టే టైమ్ O(1) (కేవలం ఒక్క సెకను) మాత్రమే.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> గొడవలు (Collisions) ఎందుకు వస్తాయి?</div>
    <div class="section-body">
      <p class="text-prose">
        మన ఫంక్షన్ లో 'CAB' కి 6 వచ్చింది. రేపు 'BCA' అనేవాడు వచ్చాడు. దానికి లెక్కేస్తే (2+3+1 = 6) వాడికీ అదే లాకర్ నంబర్ వచ్చింది! ఆల్రెడీ అందులో వేరే వాడి వస్తువులు ఉన్నాయి. ఇద్దరికి ఒకే లాకర్ ఎలా ఇస్తాం? దీన్నే <strong>Collision (కలయిక/గొడవ)</strong> అంటారు.
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>సొల్యూషన్ 1 (Linear Probing):</strong> 6 ఫుల్ అయితే, పక్కనే ఉన్న 7వ లాకర్ ఖాళీ ఉందేమో చూసి అక్కడ పెట్టడం (ఓపెన్ అడ్రెస్సింగ్).</li>
        <li><strong>సొల్యూషన్ 2 (Chaining):</strong> 6వ లాకర్ లోనే ఒక సంచి తగిలించి, వాడి వస్తువులు, వీడి వస్తువులు రెండూ ఒకదాని కింద ఒకటి (Linked List లాగా) అందులోనే పెట్టడం!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Hash Table with Chaining)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో మనం 10 సైజు ఉన్న అర్రే ని హ్యాష్ టేబుల్ గా తీసుకుని, మోడ్యులో (<code>%</code>) ఆపరేటర్ వాడి హ్యాష్ కనుక్కుని, కలయిక (Collision) వచ్చినప్పుడు లింక్డ్ లిస్ట్ వాడి ఎలా చైనింగ్ చేసామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Hashing (Chaining)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

#define TABLE_SIZE 10

// చైనింగ్ కోసం ఒక లింక్డ్ లిస్ట్ నోడ్
struct Node {
    int key;
    struct Node* next;
};

// మన హ్యాష్ టేబుల్ (నోడ్ పాయింటర్స్ ఉన్న అర్రే)
struct Node* hashTable[TABLE_SIZE];

// 1. అతి సింపుల్ హ్యాష్ ఫంక్షన్ (మిక్సీ)
int hashFunction(int key) {
    return key % TABLE_SIZE; // 10 తో డివైడ్ చేస్తే 0 నుండి 9 వరకు ఇండెక్స్ వస్తుంది!
}

// 2. డేటాని టేబుల్ లో దూర్చడం (Insert)
void insert(int key) {
    int index = hashFunction(key); // ఇండెక్స్ కనుక్కోవడం
    
    // కొత్త బాక్స్ క్రియేట్ చేద్దాం
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->key = key;
    
    // ఆ ఇండెక్స్ లో ఆల్రెడీ ఎవరైనా ఉన్నా (Collision), దాన్ని ముందుకి నెట్టి ఇది హెడ్ అవుతుంది (Chaining)
    newNode->next = hashTable[index];
    hashTable[index] = newNode;
    
    printf("Inserted %d at index %d\\n", key, index);
}

// 3. హ్యాష్ టేబుల్ ని ప్రింట్ చేయడం
void displayTable() {
    printf("\\n--- Current Hash Table ---\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        printf("[%d]: ", i);
        struct Node* temp = hashTable[i];
        
        if (temp == NULL) {
            printf("Empty\\n");
        } else {
            // ఆ లాకర్ లో ఎంతమంది ఉన్నారో లింక్డ్ లిస్ట్ లూప్
            while (temp != NULL) {
                printf("%d -> ", temp->key);
                temp = temp->next;
            }
            printf("NULL\\n");
        }
    }
}

int main() {
    // టేబుల్ మొత్తం ఖాళీ (NULL) చేద్దాం
    for (int i = 0; i < TABLE_SIZE; i++) {
        hashTable[i] = NULL;
    }
    
    // డేటా యాడ్ చేద్దాం
    insert(15); // 15 % 10 = ఇండెక్స్ 5
    insert(25); // 25 % 10 = ఇండెక్స్ 5 (కొలిజన్ వస్తుంది, ఇద్దరూ అక్కడే ఉంటారు!)
    insert(7);  // 7 % 10  = ఇండెక్స్ 7
    insert(42); // 42 % 10 = ఇండెక్స్ 2
    
    // టేబుల్ ఎలా ఉందో చూద్దాం
    displayTable();
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>hashFunction(key)</code>: మనం 15 పంపితే (15 % 10 = 5) వస్తుంది. 25 పంపినా (25 % 10 = 5) వస్తుంది. ఇక్కడ ఇండెక్స్ 5 దగ్గర కొలిజన్ (Collision) వచ్చింది.</li>
        <li><code>newNode-&gt;next = hashTable[index];</code>: ఇది లింక్డ్ లిస్ట్ లో (Insert at Head) లాజిక్. 25 వచ్చినప్పుడు, 5వ లాకర్ లో ఆల్రెడీ ఉన్న 15 ని <code>next</code> తో కనెక్ట్ చేసుకుని, 25 ముందుకు వస్తుంది (<code>25 -&gt; 15 -&gt; NULL</code>). దీన్నే <strong>Chaining (చైనింగ్)</strong> అంటారు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Linear Probing కన్నా Chaining ఎందుకు బెస్ట్?</h4>
          <p>Linear Probing లో ఇండెక్స్ ఫుల్ అయితే పక్క ఇండెక్స్ లో దూరుస్తాం కదా. ఒకవేళ పక్కది కూడా ఫుల్ అయితే ఆ పక్కకి... ఇలా వెళ్తూ ఉంటే మొత్తం లాకర్లు ఫుల్ అయ్యి <em>Clustering</em> అనే సమస్య వస్తుంది. వెతకడానికి మళ్ళీ అర్రే లాగా O(N) టైమ్ పడుతుంది. కానీ Chaining లో లిస్ట్ బయటికి పెరుగుతుంది కాబట్టి పక్క లాకర్లు ఖాళీగానే ఉంటాయి.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: ఒక పర్ఫెక్ట్ Hash Function కి రూల్స్ ఏంటి?</h4>
          <p>1. అది క్యాలిక్యులేట్ చేయడానికి చాలా ఫాస్ట్ గా ఉండాలి (Cryptographic hash లాగా స్లో ఉండకూడదు). <br> 2. వచ్చిన ఇండెక్స్ లు అన్ని లాకర్లకి సమానంగా పంచాలి (Uniform distribution). ఒకటే లాకర్ లోకి అందరినీ పంపకూడదు. Prime numbers (ప్రైమ్ నంబర్స్) తో మోడ్యులో చేస్తే బెస్ట్ రిజల్ట్స్ వస్తాయి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: పాస్వర్డ్ హ్యాషింగ్ (SHA-256) కి, ఈ డేటా స్ట్రక్చర్ హ్యాషింగ్ కి తేడా ఏంటి?</h4>
          <p>చాలా డిఫరెన్స్ ఉంది! మనం వాడేది డేటా ని ఫాస్ట్ గా వెతకడానికి వాడే "Data Structure Hashing" (O(1) స్పీడ్ కోసం). కానీ పాస్వర్డ్స్ కి వాడేది "Cryptographic Hashing". అందులో స్పీడ్ కాదు, సెక్యూరిటీ ముఖ్యం. రివర్స్ చేయడానికి వీల్లేకుండా దాన్ని డిజైన్ చేస్తారు (One-way hash).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 58, "Phase 19", "Data Structures - 2", subtopics, contentBody, '57-c-tree-traversals-inorder-preorder-postorder.html', '57. Tree Traversals', '59-c-graphs-basics-adjacency-matrix-list.html', '59. Graphs (Matrix & List)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson59() {
  const title = "Graphs (Adjacency Matrix & List) (తెలుగులో)";
  const desc = "C లో డేటా స్ట్రక్చర్స్ కి బాస్ లాంటి Graphs (గ్రాఫ్స్) అంటే ఏంటి? ఫేస్బుక్ లో మ్యూచువల్ ఫ్రెండ్స్ ని, గూగుల్ మ్యాప్స్ లో షార్టెస్ట్ రూట్ ని గ్రాఫ్స్ వాడి ఎలా కనుక్కుంటారు? Matrix మరియు List రెండింటిలో తేడా ఏంటో డీప్ గా చూద్దాం.";
  const filename = "59-c-graphs-basics-adjacency-matrix-list.html";
  const subtopics = "Nodes & Edges · Directed vs Undirected · Adjacency Matrix · Adjacency List";

  const contentBody = `
    <div class="intro-box">
      <p>డేటా స్ట్రక్చర్స్ లో అత్యంత కాంప్లెక్స్ మరియు రియల్ లైఫ్ లో అత్యంత ఎక్కువగా వాడే కాన్సెప్ట్ <strong>Graphs (గ్రాఫ్స్)</strong>. ఫేస్బుక్ లో ఫ్రెండ్స్ నెట్వర్క్ అయినా, గూగుల్ మ్యాప్స్ లో ట్రాఫిక్ దారులు అయినా అన్నీ ఈ గ్రాఫ్స్ మీదే పనిచేస్తాయి! ట్రీ (Tree) లో కేవలం పైనుండి కిందికే (Parent-Child) లింక్స్ ఉంటాయి. కానీ గ్రాఫ్స్ లో ఎవరైనా ఎవరికైనా కనెక్ట్ అవ్వచ్చు (లూప్స్ కూడా ఉంటాయి). అసలు దీన్ని C లాంగ్వేజ్ లో ఎలా మెమరీ లో స్టోర్ చేయాలో (Adjacency Matrix వర్సెస్ Adjacency List) ఈరోజు డీప్ గా పోస్ట్‌మార్టం చేద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> గ్రాఫ్స్ (Graphs) అంటే ఏంటి? (Vertices & Edges)</div>
    <div class="section-body">
      <p class="text-prose">
        గ్రాఫ్ లో రెండు మెయిన్ పార్ట్స్ ఉంటాయి:<br>
        1. <strong>Vertices (నోడ్స్/సిటీస్):</strong> అంటే ఒక మనిషి లేదా ఒక సిటీ (ఉదా: హైదరాబాద్, బెంగళూరు).<br>
        2. <strong>Edges (లింక్స్/రోడ్లు):</strong> అంటే ఆ రెండు సిటీస్ మధ్య ఉన్న దారి. ఈ దారి వన్-వే (Directed) ఉండొచ్చు, లేదా టూ-వే (Undirected) ఉండొచ్చు.
      </p>

      <div class="deep-dive-card">
        <h3>🌍 రియల్ లైఫ్ స్టోరీ: ఫేస్బుక్ (Facebook) వర్సెస్ ఇన్‌స్టాగ్రామ్ (Instagram)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          <strong>Undirected Graph (ఫేస్బుక్):</strong> మీరు ఒకరికి ఫ్రెండ్ రిక్వెస్ట్ పంపి వాళ్ళు యాక్సెప్ట్ చేస్తే, వాడు మీకు ఫ్రెండ్, మీరు వాడికి ఫ్రెండ్! ఇద్దరి మధ్య టూ-వే (Two-way) కనెక్షన్ వస్తుంది. రోడ్డు కి రెండు వైపులా వెళ్ళొచ్చు.<br><br>
          <strong>Directed Graph (ఇన్‌స్టాగ్రామ్ / ట్విట్టర్):</strong> మీరు ఒక సెలబ్రిటీ ని ఫాలో (Follow) అవుతారు (అంటే మీ నుండి వాడికి వన్-వే కనెక్షన్ వెళ్ళింది). కానీ వాడు మిమ్మల్ని తిరిగి ఫాలో అవ్వాల్సిన రూల్ లేదు కదా! ఇది వన్-వే (One-way) రోడ్డు లాంటిది. గ్రాఫ్స్ లో దారిని (Arrow) బట్టి లాజిక్ మారిపోతుంది.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> గ్రాఫ్ ని కంప్యూటర్ లో ఎలా దాచాలి? (2 Methods)</div>
    <div class="section-body">
      <p class="text-prose">
        మనం డ్రాయింగ్ వేయడానికి బానే ఉంటుంది, కానీ కంపైలర్ కి ఆ రోడ్లు ఎలా చెప్పాలి?
      </p>
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><strong>1. Adjacency Matrix (మ్యాట్రిక్స్):</strong> ఇదొక 2D Array (టేబుల్). అడ్డు వరుసలు, నిలువు వరుసలు వేసుకుని దారి ఉంటే 1 అని, లేకపోతే 0 అని నింపుతాం. చాలా ఫాస్ట్, కానీ ఖాళీ రోడ్లు లేకపోయినా మెమరీ ఎక్కువ తీసుకుంటుంది.</li>
        <li><strong>2. Adjacency List (లిస్ట్):</strong> ప్రతి సిటీ కి ఒక లింక్డ్ లిస్ట్ (Linked List) క్రియేట్ చేసి, దానికి కనెక్ట్ అయిన ఊర్ల పేర్లు మాత్రమే ఆ చైన్ లో కనెక్ట్ చేస్తాం. ఇది రియల్ ప్రాజెక్ట్స్ లో బెస్ట్ పద్ధతి (మెమరీ సేవింగ్)!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Adjacency Matrix Demo)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో ఒక 4 సిటీస్ (0, 1, 2, 3) తీసుకుని, వాటి మధ్య 2D Array వాడి రోడ్లు (1 or 0) ఎలా వేసామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Graphs (Adjacency Matrix)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

#define V 4 // టోటల్ 4 సిటీస్ ఉన్నాయి (Vertices)

// గ్రాఫ్ కి మొదట్లో ఏ రోడ్లు లేవని (0) సెట్ చేసే ఫంక్షన్
void initGraph(int matrix[V][V]) {
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            matrix[i][j] = 0;
        }
    }
}

// సిటీ 'src' నుండి సిటీ 'dest' కి రోడ్డు వేసే ఫంక్షన్
void addEdge(int matrix[V][V], int src, int dest) {
    // ఇది Undirected Graph (టూ-వే రోడ్డు)
    matrix[src][dest] = 1; // వెళ్ళడానికి దారి
    matrix[dest][src] = 1; // తిరిగి రావడానికి కూడా దారి (Facebook లాగా)
}

// మ్యాట్రిక్స్ టేబుల్ ని ప్రింట్ చేసే ఫంక్షన్
void printMatrix(int matrix[V][V]) {
    printf("   0 1 2 3\\n");
    printf("   --------\\n");
    for (int i = 0; i < V; i++) {
        printf("%d| ", i);
        for (int j = 0; j < V; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    // 2D అర్రే నే మన గ్రాఫ్ (4x4 = 16 బాక్సులు)
    int graphMatrix[V][V];
    
    // మొదట అన్నీ జీరోస్ చేద్దాం
    initGraph(graphMatrix);
    
    printf("--- Facebook Friends Graph ---\\n\\n");
    // సిటీ 0: హైదరాబాద్
    // సిటీ 1: బెంగళూరు
    // సిటీ 2: ముంబై
    // సిటీ 3: ఢిల్లీ
    
    // రోడ్లు (Friends) వేద్దాం
    addEdge(graphMatrix, 0, 1); // 0 కి 1 ఫ్రెండ్
    addEdge(graphMatrix, 0, 2); // 0 కి 2 ఫ్రెండ్
    addEdge(graphMatrix, 1, 2); // 1 కి 2 కూడా ఫ్రెండ్ (Mutual!)
    addEdge(graphMatrix, 2, 3); // 2 కి 3 ఫ్రెండ్
    
    // ఫైనల్ రిపోర్ట్ ప్రింట్ చేద్దాం
    printf("Adjacency Matrix (1 means Connected):\\n");
    printMatrix(graphMatrix);
    
    // ఒకవేళ 0 కి 3 కి కనెక్షన్ ఉందో లేదో వెతకాలంటే?
    printf("\\nCheck: Are 0 and 3 friends? => %s\\n", 
            (graphMatrix[0][3] == 1) ? "Yes" : "No");
            
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>matrix[src][dest] = 1;</code>: అర్రే ఇండెక్స్ వాడటం వల్ల, ఒకరిద్దరు కనెక్ట్ అయ్యున్నారా లేదా అని చెక్ చేయడానికి కేవలం 1 సెకను (O(1)) పడుతుంది. ఇది దీని సూపర్ పవర్.</li>
        <li><code>matrix[dest][src] = 1;</code>: ఇది రాయకపోతే, కేవలం <code>src</code> నుండి <code>dest</code> కి వన్-వే రోడ్డు (Directed Graph) ఉన్నట్టు లెక్క. రెండు రాస్తే అది టూ-వే రోడ్డు అవుతుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఫేస్బుక్ వాళ్లు Adjacency Matrix వాడతారా?</h4>
          <p>అస్సలు వాడరు! ఫేస్బుక్ లో 200 కోట్ల మంది యూజర్స్ (V = 2 బిలియన్) ఉన్నారు. ఒకవేళ 2D అర్రే క్రియేట్ చేయాలంటే (2 బిలియన్ x 2 బిలియన్) బాక్సులు మెమరీ కావాలి! ఆ అర్రే లో ఒక యూజర్ కి సగటున 500 మందే ఫ్రెండ్స్ ఉంటారు, మిగతా వందల కోట్ల బాక్సులు అన్నీ 0 తోనే నిండిపోయి దారుణంగా మెమరీ వేస్ట్ అవుతుంది. అందుకే వాళ్ళు <strong>Adjacency List</strong> వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Adjacency List అంటే ఏంటి? అది ఎలా బెటర్?</h4>
          <p>దీనిలో 200 కోట్ల మందికి కేవలం ఒకటే పెద్ద అర్రే తీసుకుంటారు. అందులో మీ బాక్స్ దగ్గర ఒక లింక్డ్ లిస్ట్ (Linked List) ని అటాచ్ చేస్తారు. మీకు ఎంతమంది ఫ్రెండ్స్ ఉంటే, ఆ చైన్ లో అన్ని డబ్బాలు మాత్రమే యాడ్ చేస్తారు. లేని వాళ్ళ కోసం 0 లు పెట్టాల్సిన పనేలేదు! మెమరీ సూపర్ సేవ్ అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: గ్రాఫ్ లో Weighted Edge అంటే ఏంటి?</h4>
          <p>గూగుల్ మ్యాప్స్ లో రెండు సిటీల మధ్య దారి ఉండటమే కాదు, ఆ దారి పొడవు ఎంత (కిలోమీటర్లు) లేదా ట్రాఫిక్ ఎంత అనేది కూడా ఉంటుంది కదా! ఆ వాల్యూ నే Weight అంటారు. అప్పుడు మ్యాట్రిక్స్ లో 1 బదులు డైరెక్ట్ గా ఆ వాల్యూ (ఉదా: 50 km) ని పెట్టి సార్టెస్ట్ పాత్ అల్గారిథమ్స్ (Dijkstra) రన్ చేస్తారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 59, "Phase 19", "Data Structures - 2", subtopics, contentBody, '58-c-hashing-and-collision-handling.html', '58. Hashing & Collisions', '60-c-searching-linear-and-binary-search.html', '60. Linear & Binary Search');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson60() {
  const title = "Linear & Binary Search (తెలుగులో)";
  const desc = "C లో అల్గారిథమ్స్ (Algorithms) అంటే ఏంటి? ఒక డేటాని అర్రే లో ఫాస్ట్ గా వెతకాలంటే Linear Search వాడాలా లేక సగం చేస్తూ వెళ్లే Binary Search మ్యాజిక్ వాడాలా? రియల్ లైఫ్ డిక్షనరీ ఎగ్జాంపుల్ తో డీప్ గా నేర్చుకుందాం.";
  const filename = "60-c-searching-linear-and-binary-search.html";
  const subtopics = "Algorithms Basics · Linear Search (O(N)) · Binary Search (O(log N)) · Time Complexity";

  const contentBody = `
    <div class="intro-box">
      <p>ఇప్పటివరకు డేటాని (Array, List, Tree, Graph) ఎలా స్టోర్ చేయాలో నేర్చుకున్నాం (ఇవే డేటా స్ట్రక్చర్స్). ఇప్పుడు అసలు ఆట మొదలవుతుంది! ఆ స్టోర్ చేసిన డేటా లోపలికి వెళ్లి మనకు కావాల్సింది లాక్కుని రావడం (దీన్నే <strong>Algorithms</strong> అంటారు). ఒక లక్ష నంబర్స్ ఉన్న అర్రే లో 99 వ నంబర్ కోసం వెతకాలి. గుడ్డిగా మొదటి నుండి వెతుక్కుంటూ వెళ్తామా? లేదా ఒక స్మార్ట్ టెక్నిక్ వాడి కేవలం 10 స్టెప్స్ లో ఆన్సర్ లాగేస్తామా? ఈరోజు Searching (సెర్చింగ్) ప్రపంచంలో ఉన్న రెండు బ్రహ్మాస్త్రాలు <strong>Linear Search మరియు Binary Search</strong> ఎలా పనిచేస్తాయో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> లీనియర్ సెర్చ్ (Linear Search) - కష్టజీవి</div>
    <div class="section-body">
      <p class="text-prose">
        లీనియర్ సెర్చ్ అంటే గుడ్డిగా మొదటి బాక్స్ నుండి స్టార్ట్ చేసి, ప్రతి బాక్స్ లోపల తొంగి చూస్తూ వెతుక్కుంటూ వెళ్లడం.
      </p>
      
      <div class="deep-dive-card">
        <h3>📖 రియల్ లైఫ్ స్టోరీ: డిక్షనరీ లో వెతకడం (Part 1)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          ఒక వెయ్యి పేజీలు ఉన్న ఇంగ్లీష్ డిక్షనరీ లో మీరు "Zebra" అనే పదం వెతకాలి. లీనియర్ సెర్చ్ వాడేవాడు ఏం చేస్తాడు? పేజీ నంబర్ 1 ఓపెన్ చేస్తాడు, అందులో ఉందా? లేదు! పేజీ 2, పేజీ 3... ఇలా వెయ్యి పేజీలు తిప్పిన తర్వాత ఆ లాస్ట్ లో వాడికి కనబడుతుంది. దీనికి పట్టే టైమ్ O(N) (అంటే వెయ్యి వస్తువులు ఉంటే వెయ్యి సార్లు వెతకాల్సిందే).
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> బైనరీ సెర్చ్ (Binary Search) - స్మార్ట్ వర్కర్</div>
    <div class="section-body">
      <p class="text-prose">
        బైనరీ సెర్చ్ వాడాలంటే ఒక పక్కా <strong>రూల్</strong> ఉంది: డేటా ముందే ఒక ఆర్డర్ లో (సార్ట్ అయ్యి) ఉండాలి. (అంటే డిక్షనరీ లాగా A, B, C ఆర్డర్ లో ఉండాలి).
      </p>

      <div class="deep-dive-card">
        <h3>📖 రియల్ లైఫ్ స్టోరీ: డిక్షనరీ లో వెతకడం (Part 2)</h3>
        <p style="color:#e2e8f0; font-size:14.5px; line-height:1.8;">
          బైనరీ సెర్చ్ వాడేవాడు డిక్షనరీ ని డైరెక్ట్ గా కరెక్ట్ గా <strong>సగానికి (Middle)</strong> ఓపెన్ చేస్తాడు! (పేజీ నంబర్ 500). అక్కడ 'M' లెటర్ ఉందనుకుందాం.<br><br>
          వాడు వెతుకుతున్నది "Zebra". 'M' కన్నా 'Z' పెద్దది (కుడి వైపు ఉంటుంది) అని వాడికి తెలుసు. కాబట్టి 1 నుండి 500 పేజీలను పూర్తిగా <strong>చింపేసి డస్ట్ బిన్ లో పడేస్తాడు</strong> (సగం డేటా గల్లంతు!). ఇప్పుడు 501 నుండి 1000 మధ్యలో మళ్ళీ సగానికి ఓపెన్ చేస్తాడు. ఇలా సగం చేసుకుంటూ వెళ్తే కేవలం 10 సార్లు (O(log N)) పుస్తకం ఓపెన్ చేసేసరికి ఆన్సర్ దొరికేస్తుంది!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Binary Search in C)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో <code>low</code>, <code>high</code>, <code>mid</code> అనే మూడు పాయింటర్స్ వాడి బైనరీ సెర్చ్ తో ఒక నంబర్ ని ఫాస్ట్ గా ఎలా పట్టుకున్నామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Binary Search (Fast Search)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// బైనరీ సెర్చ్ ఫంక్షన్
// (అర్రే కచ్చితంగా సార్ట్ అయ్యి ఉండాలి)
int binarySearch(int arr[], int size, int target) {
    int low = 0;             // మొదలు (పేజీ 1)
    int high = size - 1;     // చివర (లాస్ట్ పేజీ)
    int steps = 0;           // ఎన్ని సార్లు తిరిగామో కౌంట్
    
    while (low <= high) {
        steps++;
        int mid = (low + high) / 2; // కరెక్ట్ గా సగానికి ఓపెన్ చేసాం
        
        printf("Step %d: Checking middle index %d (value = %d)\\n", steps, mid, arr[mid]);
        
        // సగం ఓపెన్ చేయగానే జాక్ పాట్! దొరికేస్తే...
        if (arr[mid] == target) {
            printf("\\n-> Found in %d steps!\\n", steps);
            return mid; // ఇండెక్స్ రిటర్న్ చేయి
        }
        
        // మన టార్గెట్ సగం వాల్యూ కన్నా పెద్దది అయితే... (కుడి వైపు వెళ్ళు)
        if (target > arr[mid]) {
            low = mid + 1; // ఎడమ పక్క పేజీలన్నీ ఇగ్నోర్ (చింపేసాం)
        } 
        // మన టార్గెట్ చిన్నది అయితే... (ఎడమ వైపు వెళ్ళు)
        else {
            high = mid - 1; // కుడి పక్క పేజీలన్నీ ఇగ్నోర్
        }
    }
    
    return -1; // అసలు బుక్ లో ఆ పదం లేకపోతే -1 ఇస్తాం
}

int main() {
    printf("--- Binary Search Algorithm ---\\n\\n");
    
    // సార్ట్ చేసిన (చిన్న నుండి పెద్ద) ఒక అర్రే
    int numbers[] = {10, 25, 34, 56, 78, 89, 92, 105, 120};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    int target = 92; // మనం వెతకాల్సిన దొంగ
    printf("Searching for %d...\\n\\n", target);
    
    int resultIndex = binarySearch(numbers, size, target);
    
    if (resultIndex != -1) {
        printf("Success! Number %d found at index [%d].\\n", target, resultIndex);
    } else {
        printf("Failed! Number not found.\\n");
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>mid = (low + high) / 2;</code>: ఇది అసలైన మ్యాజిక్. మీరు 0 నుండి 8 మధ్యలో ఉంటే, <code>(0+8)/2 = 4</code> ఇండెక్స్ వస్తుంది. 4 దగ్గర ఉన్న వాల్యూ ని టార్గెట్ తో చెక్ చేస్తుంది.</li>
        <li><code>low = mid + 1;</code>: ఒకవేళ టార్గెట్ 92, కానీ మిడ్ వాల్యూ 78 అయితే... మన టార్గెట్ కుడివైపు (Right Side) ఉందన్నమాట! అప్పుడు మనం లెఫ్ట్ పాయింటర్ (low) ని తీసుకొచ్చి <code>mid + 1</code> (అంటే 5) దగ్గర పెడతాం. అప్పుడు లెఫ్ట్ లో ఉన్న 0,1,2,3,4 ఇండెక్స్ లు పర్మినెంట్ గా డిలీట్ అయిపోయినట్టే! సగం పని తగ్గింది.</li>
        <li><code>low &lt;= high</code>: ఈ లూప్ ఎంతవరకు తిరుగుతుంది? ఆ రెండు పాయింటర్స్ ఒకదానికొకటి ఎదురుపడి, క్రాస్ అయ్యిపోయేవరకు తిరుగుతుంది. క్రాస్ అయిపోయాయి అంటే ఆ పుస్తకంలో ఆ పేజీ లేనట్టే! అప్పుడు లూప్ బ్రేక్ అయ్యి -1 కి వస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: డేటా సార్ట్ అవ్వకపోతే (జంబుల్ గా ఉంటే) బైనరీ సెర్చ్ పనిచేస్తుందా?</h4>
          <p>అస్సలు పనిచేయదు! డిక్షనరీ లో పదాలు అన్నీ కలగాపులగంగా ఉంటే, సగానికి ఓపెన్ చేసినప్పుడు ఎటు వెళ్ళాలో మీకు ఎలా తెలుస్తుంది? కాబట్టి డేటా సార్ట్ (Sort) అయ్యి ఉంటే మాత్రమే బైనరీ సెర్చ్ వాడాలి, లేదంటే లీనియర్ సెర్చ్ కి వెళ్ళిపోవాల్సిందే.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: చాలా పెద్ద అర్రే లో (Integer Overflow) ఒక బగ్ వస్తుందట కదా?</h4>
          <p>చాలా పెద్ద ప్రాజెక్ట్స్ లో (ఉదా: గూగుల్ లో) అర్రే సైజు బిలియన్స్ లో ఉంటే, <code>low + high</code> యాడ్ చేసినప్పుడు ఆ వాల్యూ కంపైలర్ <code>int</code> లిమిట్ దాటేసి మైనస్ వాల్యూ వస్తుంది (దీన్నే Integer Overflow బగ్ అంటారు). అందుకే ప్రొఫెషనల్స్ <code>mid = low + (high - low) / 2;</code> అని రాస్తారు. ఇంటర్వ్యూలో ఇది చెబితే మీకు కచ్చితంగా జాబ్ వస్తుంది!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Linked List మీద Binary Search వాడొచ్చా?</h4>
          <p>వాడలేము! బైనరీ సెర్చ్ కి ఫస్ట్ సగానికి (Middle index) దూకాలి కదా. లింక్డ్ లిస్ట్ లో డైరెక్ట్ గా మధ్యలోకి జంప్ చేయలేం (O(1) యాక్సెస్ ఉండదు). మొదటి నుండి నడుచుకుంటూ వెళ్ళాలి. కాబట్టి ఆ జంప్ చేయడానికి పట్టే టైమ్ వేస్ట్ అయిపోయి, అది లీనియర్ సెర్చ్ కన్నా స్లో అయిపోతుంది.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 60, "Phase 20", "Algorithms & Final", subtopics, contentBody, '59-c-graphs-basics-adjacency-matrix-list.html', '59. Graphs (Matrix & List)', '61-c-sorting-1-bubble-selection-insertion.html', '61. Sorting (Bubble, Selection)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson61() {
  const title = "Sorting (Bubble, Selection, Insertion) (తెలుగులో)";
  const desc = "C లో నంబర్స్ ని ఒక ఆర్డర్ లో (చిన్న నుండి పెద్దకి) ఎలా సర్దుతారు? Sorting (సార్టింగ్) ప్రపంచంలో బేసిక్ టెక్నిక్స్ అయిన Bubble Sort, Selection Sort మరియు Insertion Sort ఎలా పనిచేస్తాయో కార్డ్స్ ఆట ఎగ్జాంపుల్ తో నేర్చుకుందాం.";
  const filename = "61-c-sorting-1-bubble-selection-insertion.html";
  const subtopics = "Sorting Algorithms · Bubble Sort Logic · Selection Sort · Insertion Sort · O(N^2) Time Complexity";

  const contentBody = `
    <div class="intro-box">
      <p>లాస్ట్ లెసన్ లో బైనరీ సెర్చ్ వాడాలంటే డేటా ఒక ఆర్డర్ లో సార్ట్ (Sort) అయ్యి ఉండాలని నేర్చుకున్నాం కదా. మరి పిచ్చిపిచ్చిగా (Random) ఉన్న డేటాని అసలు ఎలా సార్ట్ చేస్తారు? అమెజాన్ లో మీరు "Price: Low to High" నొక్కగానే ప్రొడక్ట్స్ అన్నీ ఒక క్యూ లో ఎలా నిలబడతాయి? దానికి వాడే అల్గారిథమ్స్ ని <strong>Sorting Algorithms</strong> అంటారు. ఇందులో బేసిక్స్ అయిన Bubble, Selection మరియు Insertion అనే మూడు పద్ధతులు O(N²) టైమ్ తో ఎలా పనిచేస్తాయో ఈరోజు పేకముక్కల (Cards) ఆటతో డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> 1. బబుల్ సార్ట్ (Bubble Sort) - పక్కోడితో పోరు</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>లాజిక్:</strong> అర్రే లో మొదటి నుండి వెళ్తూ, పక్కపక్కనే ఉన్న ఇద్దరినీ కంపేర్ చేస్తాం. పెద్దోడు లెఫ్ట్ లో ఉంటే, వాళ్ళిద్దరినీ స్వాప్ (Swap) చేస్తాం. ఇలా ఒక రౌండ్ అయ్యేసరికి క్లాస్ లో ఉన్న <strong>అతి పెద్దోడు (గాలి బుడగ లాగా) లాస్ట్ కి వెళ్లి సెటిల్ అయిపోతాడు!</strong> మళ్ళీ ఇంకో రౌండ్ వేస్తాం, సెకండ్ పెద్దోడు సెటిల్ అవుతాడు.
      </p>
      
      <div class="memory-diagram">
ఉదాహరణకు ( 5, 1, 4, 2 ):
1. 5 > 1 కాబట్టి స్వాప్: ( 1, 5, 4, 2 )
2. 5 > 4 కాబట్టి స్వాప్: ( 1, 4, 5, 2 )
3. 5 > 2 కాబట్టి స్వాప్: ( 1, 4, 2, [5] ) -> 5 లాస్ట్ కి వెళ్లి ఫిక్స్ అయిపోయింది!</div>
    </div>

    <div class="section-title"><span class="num">2</span> 2. సెలెక్షన్ సార్ట్ (Selection Sort) - వెతుకులాట</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>లాజిక్:</strong> దీని స్టైల్ వేరు! ఇందులో క్లాస్ మొత్తం వెతికి (Scan చేసి) <strong>అతి చిన్న వాడిని (Minimum)</strong> పట్టుకుని తీసుకొచ్చి ఫస్ట్ ప్లేస్ లో కూర్చోపెడతాం! ఆ తర్వాత మిగిలిన వాళ్ళలో చిన్న వాడిని పట్టుకుని సెకండ్ ప్లేస్ లో కూర్చోపెడతాం.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> 3. ఇన్సర్షన్ సార్ట్ (Insertion Sort) - పేకముక్కలు</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>లాజిక్:</strong> మీరు రమ్మీ (Rummy) ఆడేటప్పుడు చేతిలో పేకముక్కలు ఎలా సర్దుకుంటారు? కింద నుండి ఒక ముక్క తీసి, మీ చేతిలో ఆల్రెడీ ఉన్న ముక్కలలో కరెక్ట్ ప్లేస్ చూసుకుని మధ్యలో దూరుస్తారు కదా! ఇది అచ్చం అలాగే పనిచేస్తుంది. చేతిలో ఉన్నవి ఎప్పుడూ సార్ట్ అయ్యే ఉంటాయి.
      </p>
    </div>

    <div class="section-title"><span class="num">4</span> ఒకే ఒక సింపుల్ కోడ్ (Bubble Sort in Action)</div>
    <div class="section-body">
      <p class="text-prose">
        కింద కోడ్ లో బబుల్ సార్ట్ వాడి ఒక జంబుల్ అయిన అర్రే ని రెండు ఫర్-లూప్స్ (Nested loops) ద్వారా ఎలా సార్ట్ చేసామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Bubble Sort Algorithm</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// స్వాప్ (Swap) చేయడానికి సింపుల్ ఫంక్షన్ (పాయింటర్స్ వాడి)
void swap(int* xp, int* yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

// బబుల్ సార్ట్ ఫంక్షన్
void bubbleSort(int arr[], int n) {
    // ఔటర్ లూప్: ఎన్ని రౌండ్స్ వేయాలి? (N-1 రౌండ్స్ వేస్తే చాలు)
    for (int i = 0; i < n - 1; i++) {
        
        int swapped = 0; // ఈ రౌండ్ లో అసలు స్వాప్ జరిగిందా లేదా అని చెక్ చేయడానికి
        
        // ఇన్నర్ లూప్: పక్కపక్కనోళ్లని కంపేర్ చేస్తూ ముందుకు వెళ్లడం
        // లాస్ట్ కి వెళ్ళిన పెద్దోళ్లని (i) మళ్ళీ చెక్ చేయక్కర్లేదు కాబట్టి 'n - i - 1' 
        for (int j = 0; j < n - i - 1; j++) {
            
            // ఎడమ వాడి కన్నా కుడి వాడు చిన్న ఉంటే... ప్లేస్ మార్చు!
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = 1; // స్వాప్ జరిగింది
            }
        }
        
        // ఒకవేళ ఈ రౌండ్ లో అసలు ఒక్క స్వాప్ కూడా జరగలేదంటే...
        // దాని అర్థం డేటా అంతా సార్ట్ అయిపోయిందని! లూప్ ఆపేయొచ్చు.
        if (swapped == 0) {
            break; // (Optimized Bubble Sort)
        }
    }
}

// అర్రే ని ప్రింట్ చేసే ఫంక్షన్
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("--- Bubble Sort Demo ---\\n\\n");
    
    printf("Original Array : ");
    printArray(arr, n);
    
    // సార్టింగ్ ఫంక్షన్ ని పిలుద్దాం
    bubbleSort(arr, n);
    
    printf("Sorted Array   : ");
    printArray(arr, n);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">5</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>for(i=0... n-1)</code>: ఔటర్ లూప్ ఎప్పుడూ రౌండ్స్ కౌంట్ చేస్తుంది. 7 నంబర్స్ ఉంటే 6 రౌండ్స్ (లార్లు) వేస్తే చాలు, లాస్ట్ వాడు వాడికదే సెటిల్ అయిపోతాడు.</li>
        <li><code>for(j=0... n-i-1)</code>: ఇన్నర్ లూప్ యాక్షన్ చేస్తుంది (కంపేర్ అండ్ స్వాప్). ఇక్కడ <code>-i</code> ఎందుకు రాశామంటే, ఫస్ట్ రౌండ్ (i=0) లో అతి పెద్దోడు లాస్ట్ కి వెళ్లి లాక్ అయిపోతాడు. సెకండ్ రౌండ్ (i=1) లో మళ్ళీ ఆ లాస్ట్ వాడి దగ్గరికి వెళ్లి చెక్ చేయడం టైమ్ వేస్ట్ కదా!</li>
        <li><code>swapped = 0</code> ఫ్లాగ్ మ్యాజిక్ ఏంటంటే, ఒకవేళ మీకు ఇచ్చిన డేటా ఆల్రెడీ సార్ట్ అయ్యి (1,2,3,4,5) ఉంటే, ఫస్ట్ రౌండ్ లో ఒక్క స్వాప్ కూడా జరగదు. అప్పుడు పిచ్చోడిలాగా మళ్ళీ 6 రౌండ్స్ ఎందుకు వేయడం? డైరెక్ట్ గా <code>break</code> తో బయటికి వచ్చేసి CPU టైమ్ ని సేవ్ చేస్తుంది! (దీన్నే Optimized Bubble Sort అంటారు).</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">6</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఈ మూడు సార్ట్స్ లో ఏది వాడాలి?</h4>
          <p>రియల్ ప్రాజెక్ట్స్ లో ఎవరూ ఈ మూడూ వాడరు! ఎందుకంటే వీటికి రెండు <code>for</code> లూప్స్ (Nested) ఉంటాయి. 10 వేల రికార్డ్స్ ఇస్తే (10000 x 10000) అంటే పది కోట్ల సార్లు లూప్ తిరిగి మీ ప్రోగ్రామ్ ఫ్రీజ్ అయిపోతుంది (దీన్నే Time Complexity O(N²) అంటారు). ఇవి కేవలం కాలేజీలో నేర్చుకోవడానికి మాత్రమే.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Insertion Sort కి ఒక అడ్వాంటేజ్ ఉందట కదా?</h4>
          <p>అవును! ఒకవేళ మీకు ఇచ్చిన డేటా దాదాపుగా సార్ట్ అయ్యి ఉండి, ఒకటో రెండో నంబర్స్ మాత్రమే తేడా ఉంటే, Insertion Sort చాలా అంటే చాలా ఫాస్ట్ గా (దాదాపు O(N) స్పీడ్ తో) పనిచేస్తుంది. అందుకే దీన్ని చిన్నచిన్న పనులకి వాడుతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: స్థిరమైన (Stable) సార్ట్ అంటే ఏంటి?</h4>
          <p>సపోజ్ ఇద్దరు స్టూడెంట్స్ కి 90 మార్క్స్ వచ్చాయి (A కన్నా B ముందు ఉన్నాడు). సార్ట్ చేసిన తర్వాత కూడా ఆ ఇద్దరి మార్క్స్ పక్కపక్కనే ఉండి, B ముందే ఉంటే దాన్ని Stable (స్థిరమైనది) అంటారు. బబుల్ మరియు ఇన్సర్షన్ సార్ట్స్ Stable. కానీ సెలెక్షన్ సార్ట్ అలా కాదు, అది జంప్స్ చేస్తుంది కాబట్టి Unstable అంటారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 61, "Phase 20", "Algorithms & Final", subtopics, contentBody, '60-c-searching-linear-and-binary-search.html', '60. Linear & Binary Search', '62-c-sorting-2-merge-sort-quick-sort.html', '62. Sorting (Merge & Quick Sort)');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function buildLesson62() {
  const title = "Sorting 2 (Merge Sort, Quick Sort) (తెలుగులో)";
  const desc = "C లో లక్షల డేటాని సెకనులో సార్ట్ చేయాలంటే పాత లూప్స్ పనికిరావు! పెద్ద డేటాని సగానికి కోసి (Divide and Conquer), ప్యారలల్ గా రికర్షన్ తో (Recursion) సార్ట్ చేసి అతకబెట్టే అడ్వాన్స్‌డ్ అల్గారిథమ్స్ అయిన Merge Sort మరియు Quick Sort ఎలా పనిచేస్తాయో డీప్ గా చూద్దాం.";
  const filename = "62-c-sorting-2-merge-sort-quick-sort.html";
  const subtopics = "Divide and Conquer · Merge Sort Logic · Quick Sort & Pivot · O(N log N) Magic";

  const contentBody = `
    <div class="intro-box">
      <p>లాస్ట్ లెసన్ లో నేర్చుకున్న బబుల్ సార్ట్ (Bubble Sort) వాడి మీరు ఒక లక్ష నంబర్స్ ని సార్ట్ చేయాలంటే 1000 కోట్ల రౌండ్స్ వేయాలి, సిస్టమ్ క్రాష్ అవుతుంది! రియల్ వరల్డ్ ప్రాజెక్ట్స్ (జావా లో Arrays.sort() లాంటివి) ఆ స్లో టెక్నిక్ వాడవు. వాళ్ళు వాడే సూపర్‌మెన్ టెక్నిక్ పేరే <strong>Divide and Conquer (విడగొట్టి జయించు)</strong>. ఒక పెద్ద కొండని ఒకేసారి మోయకుండా, దాన్ని సగం చేసి, ఆ సగాన్ని ఇంకో సగం చేసి విడగొట్టి మళ్ళీ అతుకుతారు. ఇలా చేసే ఫేమస్ అల్గారిథమ్స్ అయిన <strong>Merge Sort (మెర్జ్ సార్ట్)</strong> మరియు <strong>Quick Sort (క్విక్ సార్ట్)</strong> ఎలా పనిచేస్తాయో, రికర్షన్ తో ఎలా మ్యాజిక్ చేస్తాయో చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> మెర్జ్ సార్ట్ (Merge Sort) - విడగొట్టి అతకడం</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>లాజిక్:</strong> మీ చేతిలో 8 కార్డులు ఉన్నాయి. ముందు దాన్ని కత్తితో సగానికి కట్ చేసి 4, 4 చేయండి. ఆ 4 ని మళ్ళీ 2, 2 చేయండి. లాస్ట్ కి అన్ని కార్డులు విడిపోయి 1, 1 (సింగిల్) మిగులుతాయి. సింగిల్ గా ఉన్నది ఎప్పుడూ సార్ట్ అయ్యే ఉన్నట్టు లెక్క కదా! ఇప్పుడు ఆ సింగిల్ ముక్కలని కంపేర్ చేసి (చిన్నది ముందు, పెద్దది వెనక) రెండేసి చొప్పున అతుకుతారు (Merge). లాస్ట్ కి మొత్తం సార్ట్ అయ్యి అతుక్కుంటుంది!
      </p>
      
      <div class="memory-diagram">
[38, 27, 43, 3]  (Divide)
[38, 27] & [43, 3] (Divide)
[38] [27]  [43] [3] (Base Case - సింగిల్స్ అయ్యాయి)

ఇప్పుడు అతుకుదాం (Merge & Sort):
[27, 38] & [3, 43]
ఫైనల్ గా: [3, 27, 38, 43] </div>
    </div>

    <div class="section-title"><span class="num">2</span> క్విక్ సార్ట్ (Quick Sort) - లీడర్ ని ఎన్నుకోవడం</div>
    <div class="section-body">
      <p class="text-prose">
        <strong>లాజిక్:</strong> ఇందులో ముందే కట్ చేయరు! అర్రే లో లాస్ట్ లో ఉన్న ఒక నంబర్ ని బాస్ (Pivot) గా తీసుకుంటారు. వాడికి ఒక రూల్ పెడతారు: "బాస్ కన్నా చిన్నోళ్లు అంతా లెఫ్ట్ కి వెళ్ళాలి, పెద్దోళ్లు అంతా రైట్ కి వెళ్ళాలి". వాళ్ళు అటు ఇటు వెళ్ళాక, కరెక్ట్ గా ఆ మధ్యలో ఉన్న ఖాళీ ప్లేస్ లో ఈ బాస్ వెళ్లి కూర్చుంటాడు (ఈ బాస్ జీవితంలో ఇంక వాడి ప్లేస్ మారడు!). ఇప్పుడు లెఫ్ట్ గ్రూప్ కి, రైట్ గ్రూప్ కి మళ్ళీ కొత్త లీడర్స్ ని పెట్టి ఇదే ప్రాసెస్ ని రికర్షన్ చేస్తారు.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Merge Sort in Action)</div>
    <div class="section-body">
      <p class="text-prose">
        మెర్జ్ సార్ట్ అనేది ఇంటర్వ్యూస్ లో అత్యంత కచ్చితంగా అడిగే కోడ్. విడగొట్టడానికి రికర్షన్, అతకడానికి ఇంకో కొత్త అర్రే ఎలా వాడతామో చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Merge Sort (Divide & Conquer)</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 2. విడిపోయిన రెండు ముక్కలని (Left & Right) సార్ట్ చేస్తూ అతికే ఫంక్షన్
void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int n1 = mid - left + 1; // లెఫ్ట్ ముక్క సైజు
    int n2 = right - mid;    // రైట్ ముక్క సైజు
    
    // టెంపరరీ అర్రేలు క్రియేట్ చేద్దాం
    int L[n1], R[n2];
    
    // ఒరిజినల్ డేటాని ఈ టెంపరరీ బాక్సుల్లోకి కాపీ చేద్దాం
    for (i = 0; i < n1; i++) L[i] = arr[left + i];
    for (j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    
    // ఇప్పుడు ఆ రెండింటిని చూస్తూ చిన్న దాన్ని ఒరిజినల్ అర్రే లోకి వేద్దాం
    i = 0; j = 0; k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i]; // ఎడమ వాడు చిన్న అయితే వాడు వెళ్తాడు
            i++;
        } else {
            arr[k] = R[j]; // కుడి వాడు చిన్న అయితే వాడు వెళ్తాడు
            j++;
        }
        k++;
    }
    
    // ఒకవేళ ఎవరైనా మిగిలిపోతే (Extra గా) వాళ్ళని కూడా లాస్ట్ లో యాడ్ చేద్దాం
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

// 1. రికర్షన్ తో సగానికి కట్ చేసే మెయిన్ ఫంక్షన్
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2; // కరెక్ట్ గా సగం
        
        // సగం అయిన దాన్ని మళ్ళీ సగం చేయమని రికర్షన్ పిలుద్దాం (ఎడమ ముక్క)
        mergeSort(arr, left, mid);
        // అలాగే కుడి ముక్క
        mergeSort(arr, mid + 1, right);
        
        // లాస్ట్ కి విడిపోయిన ఆ రెండు ముక్కలని అతుకుదాం!
        merge(arr, left, mid, right);
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("--- Merge Sort Magic ---\\n\\n");
    printf("Original Array : ");
    printArray(arr, n);
    
    // సార్ట్ చేద్దాం (0 ఇండెక్స్ నుండి లాస్ట్ ఇండెక్స్ దాకా పంపుతున్నాం)
    mergeSort(arr, 0, n - 1);
    
    printf("Sorted Array   : ");
    printArray(arr, n);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>mergeSort(arr, left, mid);</code>: ఇది రికర్షన్! ముందు ఎడమ పక్కనే కట్ చేసుకుంటూ సింగిల్ అయ్యేదాకా కిందికి వెళ్ళిపోతుంది. ఎడమ పక్క సింగిల్ అయ్యాకే, అప్పుడు కుడి ముక్కని కట్ చేయడానికి వెళ్తుంది.</li>
        <li><code>int L[n1], R[n2];</code>: మెర్జ్ సార్ట్ లో ఉన్న మెయిన్ ప్రాబ్లమ్ ఇదే. అతకబెట్టేటప్పుడు మీకు కొత్త అర్రే (ఎక్స్ట్రా మెమరీ) కచ్చితంగా కావాలి. ఆ రెండు ముక్కలని ఆ ఎక్స్ట్రా బాక్సుల్లో కాపీ చేసుకునే ఆ తర్వాత వాటిని పోల్చుకుంటూ ఒరిజినల్ దాంట్లో కలుపుతాము.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: వీటికి ఎంత టైమ్ పడుతుంది? (Time Complexity)</h4>
          <p>సగానికి కట్ చేస్తుంది కాబట్టి <code>log N</code>, అతుకుతూ చెక్ చేస్తుంది కాబట్టి <code>N</code>. టోటల్ గా <strong>O(N log N)</strong> టైమ్ పడుతుంది. ఇది బబుల్ సార్ట్ (O(N²)) కన్నా 100 రెట్లు ఫాస్ట్! లక్ష డేటా ని కూడా సెకనులోపలే సార్ట్ చేసేస్తుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: Merge Sort కి Quick Sort కి తేడా ఏంటి? ఏది వాడాలి?</h4>
          <p>మెర్జ్ సార్ట్ లో ప్రాబ్లమ్ ఏంటంటే, సార్ట్ చేసేటప్పుడు కొత్త అర్రేలు (Extra Space: O(N)) కావాలి! కానీ క్విక్ సార్ట్ లో ఉన్న అర్రే లోనే ప్లేస్ లు మారుస్తారు కాబట్టి ఎక్స్ట్రా మెమరీ అక్కర్లేదు (Space: O(1)). అందుకే 90% లాంగ్వేజెస్ లో (C యొక్క <code>qsort()</code> లాగా) <strong>Quick Sort</strong> నే మెయిన్ గా వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Quick Sort వరస్ట్ కేస్ (Worst Case) ఎప్పుడు వస్తుంది?</h4>
          <p>క్విక్ సార్ట్ లో లాస్ట్ వాడిని బాస్ (Pivot) గా తీసుకున్నాం కదా. ఒకవేళ ఆ అర్రే ఆల్రెడీ సార్ట్ అయ్యి (1,2,3,4,5) ఉంటే, ఆ బాస్ ఎప్పుడూ లాస్ట్ లోనే ఉంటాడు, ఎవ్వరూ లెఫ్ట్ రైట్ కి వెళ్లరు. అప్పుడు అది బబుల్ సార్ట్ లాగా వరస్ట్ స్లో (O(N²)) అయిపోతుంది. దీన్ని ఆపడానికి లాస్ట్ వాడికి బదులు రాండమ్ (Random) గా ఒకడిని పట్టుకుని లీడర్ ని చేస్తారు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 62, "Phase 20", "Algorithms & Final", subtopics, contentBody, '61-c-sorting-1-bubble-selection-insertion.html', '61. Sorting 1', '63-c-dynamic-programming-basics.html', '63. Dynamic Programming');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson58();
  buildLesson59();
  buildLesson60();
  buildLesson61();
  buildLesson62();
  console.log("✅ Generated C Lessons 58 to 62 with EXTREMELY DETAILED MASSIVE Text, Deep Stories, and ONLY ONE short code!");
}
run();
