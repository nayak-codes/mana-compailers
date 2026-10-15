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
    .prose-paragraph { font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.9; color: var(--text); margin-bottom: 20px; text-align: justify; }
    .story-box { background: linear-gradient(145deg, #1e293b, #0f172a); border-radius: 12px; padding: 24px; border-left: 5px solid #3b82f6; margin: 30px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
    .story-box-title { font-family: 'Sora', sans-serif; font-size: 18px; color: #60a5fa; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
    .faq-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin: 24px 0; }
    .faq-item { background: var(--bg2); border: 1px solid var(--border); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px 22px; }
    .faq-item h4 { color: var(--text); font-size: 16px; font-weight: 700; margin-bottom: 10px; }
    .faq-item p { color: var(--text2); font-size: 15px; line-height: 1.8; margin: 0; }
    .concept-box { background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.25); border-left: 4px solid #10b981; border-radius: 8px; padding: 22px 26px; margin: 24px 0; }
    .concept-box h4 { color: #10b981; margin-bottom: 10px; font-size: 16.5px; font-weight: 700; }
    .concept-box p { color: var(--text2); font-size: 15px; line-height: 1.8; margin: 0 0 10px 0; }
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
  </script>
</head>
<body class="lang-c">
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html" class="active">C</a>
</nav>
<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">C Master Course</div>
    <a href="/blog-c.html" class="sidebar-home-link">⚡ C Course HOME</a>
${accordionSidebar}
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
      ${prevFile ? `<a href="${prevFile}" class="nav-btn"><span class="label">← Previous</span><span class="title">${prevTitle}</span></a>` : ''}
      ${nextFile ? `<a href="${nextFile}" class="nav-btn" style="text-align:right;"><span class="label">Next →</span><span class="title">${nextTitle}</span></a>` : ''}
    </div>
  </main>
</div>
</body>
</html>`;
}

// ======================= LESSON 27 =======================
function buildLesson27() {
  const title = "C Structures, Memory Layout & Padding Holes (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Structures అంటే ఏమిటి? Memory Padding Holes అంటే ఏంటి? #pragma pack(1) ఎందుకు వాడాలి? రియల్ లైఫ్ ఉదాహరణలతో డీప్ గా నేర్చుకుందాం.";
  const filename = "27-c-structures-declaration-memory-model-and-padding.html";
  const subtopics = "Structures Definition · Memory Architecture · Padding Bytes · Byte Alignment · #pragma pack(1)";

  const contentBody = `
    <div class="intro-box">
      <p>కంప్యూటర్ ప్రోగ్రామింగ్ లో డేటాని హ్యాండిల్ చేస్తున్నప్పుడు, ఒక స్టూడెంట్ గురించి లేదా ఒక ప్రొడక్ట్ గురించి వివరాలు స్టోర్ చేయాల్సి వస్తుంది. ఒక స్టూడెంట్ కి రోల్ నంబర్ (int), పేరు (string), మరియు మార్కులు (float) ఉంటాయి. ఇవన్నీ వేర్వేరు డేటా టైప్స్. వాటన్నిటినీ కలిపి ఒకే ప్యాకెట్ లాగా తయారు చేయడానికి మనకు కావాల్సిన బ్రహ్మాస్త్రమే <strong><code>struct</code> (Structures)</strong>. కానీ మీరు అనుకున్నంత సింపుల్ గా ఈ స్ట్రక్చర్స్ మెమరీలో కూర్చోవు. సిస్టమ్ స్పీడ్ ని పెంచడానికి కంపైలర్ లోపల చాలా మ్యాజిక్ జరుగుతుంది. అదే "Memory Padding". ఈ ఆర్టికల్ లో ఆ మ్యాజిక్ అంతా డీప్ గా విడమర్చి తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> అసలు Structures ఎందుకు కావాలి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మనం ఇంతకు ముందు నేర్చుకున్న <strong>Arrays (అర్రేస్)</strong> లో ఒక ప్రాబ్లెమ్ ఉంది. అందులో అన్ని వేరియబుల్స్ ఒకే టైప్ (ఉదాహరణకు అన్నీ <code>int</code> లేదా అన్నీ <code>float</code>) అయి ఉండాలి. కానీ రియల్ వరల్డ్ ప్రాజెక్ట్స్ లో అలా జరగదు కదా. ఒక ఎంప్లాయ్ డేటాబేస్ తీసుకుంటే, వయసు ఇంటిజర్ లో ఉంటుంది, జీతం ఫ్లోట్ లో ఉంటుంది, పేరు క్యారెక్టర్స్ లో ఉంటుంది. వాటన్నిటినీ ఒకే తాడుతో కట్టేసి ఒక సింగిల్ వేరియబుల్ లా మార్చడమే Structures యొక్క మెయిన్ కాన్సెప్ట్. దీన్ని "User-Defined Data Type" అని కూడా అంటారు, ఎందుకంటే ఆ టైప్ కి రూల్స్ మీరే రాస్తారు.
      </p>

      <div class="concept-box">
        <h4>📦 Structure Blueprint vs Variable:</h4>
        <p>
          మీరు <code>struct Student { ... };</code> అని రాసినప్పుడు సిస్టమ్ లో ఒక్క బైట్ మెమరీ కూడా ఖర్చు అవ్వదు. ఎందుకంటే అది కేవలం ఒక డిజైన్ (Blueprint) మాత్రమే. ఎప్పుడైతే మీరు <code>struct Student s1;</code> అని వేరియబుల్ క్రియేట్ చేస్తారో... అప్పుడు మాత్రమే RAM లో దానికి కావాల్సిన మెమరీ అలాట్ అవుతుంది. ఇల్లు కట్టకముందు పేపర్ మీద గీసిన ప్లాన్ లాంటిది స్ట్రక్చర్ డిజైన్.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> మెమరీ ప్యాడింగ్ (Memory Padding) అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక స్ట్రక్చర్ లో <code>char</code> (1 బైట్) మరియు <code>int</code> (4 బైట్స్) ఉన్నాయి అనుకోండి. మీరు దాని సైజు 5 బైట్స్ అనుకుంటారు కదా! కానీ సిస్టమ్ లో చూస్తే అది 8 బైట్స్ చూపిస్తుంది. ఆ ఎక్స్ట్రా 3 బైట్స్ ఎక్కడినుండి వచ్చాయి? అసలు కంపైలర్ ఎందుకు మన మెమరీని అలా వేస్ట్ చేస్తోంది? ఈ ప్రశ్నకి సమాధానం తెలియాలంటే కంప్యూటర్ ప్రాసెసర్ (CPU) ఎలా పనిచేస్తుందో తెలియాలి.
      </p>

      <div class="story-box">
        <div class="story-box-title">🛒 రియల్ లైఫ్ స్టోరీ: సూపర్ మార్కెట్ లో అల్మారాలు (Shelves)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక సూపర్ మార్కెట్ లో అన్నీ ఒకే సైజు ఉన్న అల్మారాలు (Shelves) ఉన్నాయి. ఒక్కో అల్మారాలో కరెక్ట్ గా 4 చిన్న సబ్బుల పెట్టెలు పడతాయి అనుకుందాం. <br><br>
          మీరు ఒక చిన్న సబ్బు (1 Byte), దాని తర్వాత ఒక పెద్ద వాటర్ బాటిల్ (4 Bytes) సర్దాలి. మీరు ముందు చిన్న సబ్బు పెట్టారు. ఆ తర్వాత ఆ అల్మారాలో 3 సబ్బుల ప్లేస్ మిగిలింది. కానీ వాటర్ బాటిల్ చాలా పెద్దది, ఆ మిగిలిన 3 ప్లేసుల్లో అది పట్టదు. <br><br>
          దీంతో మీరు ఏం చేస్తారు? సగం బాటిల్ ని ఒక అల్మారాలో, మిగతా సగాన్ని ఇంకో అల్మారాలో ఇరికించరు కదా! అందుకని ఆ మొదటి అల్మారాలో మిగిలిన 3 ప్లేసులను <strong>ఖాళీగా వదిలేసి</strong>, నెక్స్ట్ ఫ్రెష్ అల్మారాలో వాటర్ బాటిల్ పెడతారు. <br><br>
          మన కంప్యూటర్ ప్రాసెసర్ (CPU) కూడా మెమరీ ని 4-బైట్స్ (లేదా 8-బైట్స్) బ్లాక్స్ గా చదువుతుంది. దానికి ఫాస్ట్ గా చదవడం కోసం డేటాని బ్రేక్ అవ్వకుండా ఉంచాలి. అందుకే ఆ ఖాళీగా వదిలేసిన బైట్స్ నే <strong>Padding Holes (ప్యాడింగ్ బైట్స్)</strong> అంటారు.
        </p>
      </div>
      
      <p class="prose-paragraph">
        ఇలా మెమరీని ఖాళీగా వదిలేయడం వల్ల RAM వేస్ట్ అయినా కూడా, CPU స్పీడ్ (Performance) అమాంతం పెరుగుతుంది. ఎందుకంటే డేటా కరెక్ట్ గా అలైన్ (Align) అయి ఉంటుంది.
      </p>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Padding ఎలా కంట్రోల్ చేయాలి?)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కొన్ని సిచువేషన్స్ లో మనకు అసలు ఆ ప్యాడింగ్ హోల్స్ వద్దు, ఉన్న మెమరీని చాలా టైట్ గా ప్యాక్ చేయాలి అనుకుంటాం (ఉదాహరణకు USB పెన్ డ్రైవ్ లో డేటా సేవ్ చేసేటప్పుడు). అప్పుడు కంపైలర్ కి మనం స్పెషల్ కమాండ్ పాస్ చేయొచ్చు. అదే <code>#pragma pack(1)</code>. కింద కోడ్ లో దాని పవర్ చూడండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Structure Padding Demo</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// #pragma లేకపోతే సైజు 8 బైట్స్ వస్తుంది (3 ప్యాడింగ్ హోల్స్)
// ఇది వేస్ట్ చేయకుండా టైట్ గా ప్యాక్ చేయమని కంపైలర్ కి చెప్తుంది
#pragma pack(1)

struct PackedData {
    char label;  // 1 బైట్
    int price;   // 4 బైట్స్
};

int main(void) {
    // మామూలుగా అయితే 8 బైట్స్ వస్తుంది, ఇప్పుడు కరెక్ట్ గా 5 వస్తుంది!
    printf("Total Size of Structure is: %zu bytes\\n", sizeof(struct PackedData));
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>#pragma pack(1)</code> అనేది ప్రీ-ప్రాసెసర్ డైరెక్టివ్ (Preprocessor Directive). ఇది రాసిన తర్వాత కంపైలర్ కి "ఒక్క బైట్ కూడా వదలద్దు, అన్నీ టైట్ గా ప్యాక్ చెయ్" అని కమాండ్ వెళ్తుంది.</li>
        <li><code>struct PackedData</code> లో 1 బైట్ <code>char</code>, 4 బైట్స్ <code>int</code> ఉన్నాయి. </li>
        <li>మనం ప్రింట్ చేస్తున్నప్పుడు <code>sizeof()</code> ఆపరేటర్ వాడి ఆ స్ట్రక్చర్ మొత్తం సైజు ఎంత ఉందో చూస్తున్నాం. ప్యాక్ చేసాం కాబట్టి ఎగ్జాక్ట్ గా 1+4 = 5 బైట్స్ ఆన్సర్ వస్తుంది.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ప్యాడింగ్ హోల్స్ వల్ల లాభమా నష్టమా?</h4>
          <p>చాలా వరకు లాభమే! ప్యాడింగ్ వదిలేయడం వల్ల ప్రాసెసర్ డేటాని చాలా వేగంగా (High Speed) చదువుతుంది. RAM కాస్త వేస్ట్ అయినా స్పీడ్ ముఖ్యం కదా. కానీ నెట్‌వర్క్ లో ఫైల్స్ పంపేటప్పుడు మాత్రం ఆ చెత్త (Garbage) ప్యాడింగ్ డేటా వెళ్ళకుండా ఉండడానికి ప్యాక్ (pack) చేస్తారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: రెండు స్ట్రక్చర్స్ సమానంగా ఉన్నాయో లేదో చెక్ చేయడానికి <code>s1 == s2</code> అని రాయొచ్చా?</h4>
          <p>అస్సలు రాయకూడదు! C లాంగ్వేజ్ లో రెండు స్ట్రక్చర్స్ ని డైరెక్ట్ గా <code>==</code> తో పోల్చడానికి కంపైలర్ ఒప్పుకోదు. ఎందుకంటే ఆ మధ్యలో ఉన్న ప్యాడింగ్ హోల్స్ లో ఏ చెత్త వాల్యూస్ ఉంటాయో ఎవరికీ తెలీదు. కాబట్టి అందులో ఉన్న ప్రతి వేరియబుల్ ని విడివిడిగా (<code>s1.age == s2.age</code>) మాత్రమే పోల్చాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: స్ట్రక్చర్ లోపల వేరియబుల్స్ ఆర్డర్ మార్చితే సైజు మారుతుందా?</h4>
          <p>అవును మారుతుంది! పెద్ద పెద్ద డేటా టైప్స్ (ఉదా: double, int) ని పైన పెట్టి, చిన్నవి (char) ని కింద పెడితే ప్యాడింగ్ హోల్స్ చాలా వరకు తగ్గుతాయి. స్ట్రక్చర్ డిజైన్ చేసేటప్పుడు వేరియబుల్స్ ని ఎప్పుడూ పెద్ద సైజు నుండి చిన్న సైజుకి రాసుకుంటూ రావడం మంచి ప్రోగ్రామర్ లక్షణం.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 27, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '26-c-function-pointers-callbacks-and-event-systems.html', '26. Function Pointers, Callbacks & Event Systems', '28-c-structure-arrays-pointers-and-arrow-operator.html', '28. Structure Arrays, Pointers & Arrow Operator');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// ======================= LESSON 28 =======================
function buildLesson28() {
  const title = "Structure Arrays, Pointers & Arrow Operator (->) (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో వేలాది డేటాని స్టోర్ చేయడానికి Structure Arrays ఎలా వాడాలి? పాయింటర్స్ ని వాడి Arrow Operator (->) తో డేటాని సులువుగా ఎలా మార్చాలో కంప్లీట్ గైడ్.";
  const filename = "28-c-structure-arrays-pointers-and-arrow-operator.html";
  const subtopics = "Array of Structures · Nested Structures · Pointer to Struct · Arrow Operator (->) · Performance Optimization";

  const contentBody = `
    <div class="intro-box">
      <p>గత పాఠంలో మనం కేవలం ఒక్క స్టూడెంట్ గురించి స్ట్రక్చర్ ఎలా రాయాలో చూసాం. కానీ రియల్ వరల్డ్ ప్రాజెక్ట్స్ లో క్లాస్ లో 100 మంది స్టూడెంట్స్ ఉంటారు లేదా అమెజాన్ లో లక్షలాది ప్రొడక్ట్స్ ఉంటాయి. వాటన్నిటినీ స్టోర్ చేయడానికి ఒకేఒక్క సింగిల్ వేరియబుల్ సరిపోదు కదా. అక్కడే <strong>Structure Arrays</strong> వాడుతాం. అలాగే, ఒక స్ట్రక్చర్ లోపల ఇంకొక స్ట్రక్చర్ (Nested Structures) ని ఎలా పెట్టాలి? అండ్ అన్నిటికంటే ముఖ్యంగా, ఆ పెద్ద పెద్ద డేటాని ఫంక్షన్స్ కి పంపించేటప్పుడు, టైమ్ వేస్ట్ కాకుండా <strong>పాయింటర్స్ (Pointers)</strong> వాడి, డాట్ (<code>.</code>) బదులు <strong>ఆరో ఆపరేటర్ (<code>-&gt;</code>)</strong> ఎలా వాడాలో ఈ డీప్ గైడ్ లో తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Structure Arrays అండ్ Nested Structures</div>
    <div class="section-body">
      <p class="prose-paragraph">
        మీకు 100 మంది ఎంప్లాయీస్ డేటా కావాలంటే, 100 వేరు వేరు స్ట్రక్చర్స్ క్రియేట్ చేయాల్సిన పనిలేదు. ఒక మామూలు ఇంటిజర్ అర్రే (<code>int marks[100];</code>) ఎలా క్రియేట్ చేస్తామో, అదే విధంగా స్ట్రక్చర్ కి కూడా ఒక అర్రే క్రియేట్ చేయొచ్చు. ఉదాహరణకు: <code>struct Employee staff[100];</code>. దీంతో ఒకేసారి 100 ఎంప్లాయీస్ కి రామ్ లో లైన్ గా గదులు (మెమరీ) దొరుకుతాయి.
      </p>

      <p class="prose-paragraph">
        అలాగే ఒక ఎంప్లాయ్ కి ఒక అడ్రస్ ఉంటుంది. ఆ అడ్రస్ లో మళ్ళీ సిటీ, పిన్ కోడ్, డోర్ నంబర్ లాంటివి ఉంటాయి కదా. కాబట్టి <code>Address</code> అనే ఇంకొక స్ట్రక్చర్ క్రియేట్ చేసి, దాన్ని <code>Employee</code> స్ట్రక్చర్ లోపల పెట్టొచ్చు. దీన్నే <strong>Nested Structures (నేస్టెడ్ స్ట్రక్చర్స్)</strong> అంటారు.
      </p>
    </div>

    <div class="section-title"><span class="num">2</span> Pointers to Structures అండ్ Arrow Operator (->)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక పెద్ద స్ట్రక్చర్ (ఉదాహరణకు 200 బైట్స్ సైజు ఉన్నది) ని మీరు ఒక ఫంక్షన్ కి డైరెక్ట్ గా పంపిస్తే, సిస్టమ్ ఆ 200 బైట్స్ ని కాపీ (జిరాక్స్) తీయడానికి చాలా టైమ్ తీసుకుంటుంది. దాని బదులు, ఆ స్ట్రక్చర్ యొక్క అడ్రస్ ని (కేవలం 8 బైట్స్) పాయింటర్ లా పంపిస్తే సెకనులో ఫ్రాక్షన్ లో పని అయిపోతుంది. కానీ ఆ పాయింటర్ ని వాడేటప్పుడే అసలు సమస్య వస్తుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🎯 రియల్ లైఫ్ స్టోరీ: టీవీ, మీరు, మరియు రిమోట్ కంట్రోల్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక టీవీ ఆన్ లో ఉంది. మీరు వెళ్లి నేరుగా ఆ టీవీ మీద ఉన్న బటన్ ని చేత్తో నొక్కి ఛానల్ మార్చడాన్ని <strong>డాట్ (<code>.</code>) ఆపరేటర్</strong> అనుకుందాం. అంటే టీవీ (స్ట్రక్చర్) నేరుగా మీ చేతిలో ఉంది. మీరు డైరెక్ట్ గా <code>tv.channel = 5;</code> అని మార్చగలరు. <br><br>
          కానీ మీరు సోఫాలో చాలా దూరంగా కూర్చున్నారు. మీ దగ్గర కేవలం టీవీ యొక్క కంట్రోల్ <strong>రిమోట్ (Pointer / అడ్రస్)</strong> మాత్రమే ఉంది. ఇప్పుడు మీరు డైరెక్ట్ గా మీ చేత్తో (డాట్ తో) టీవీని టచ్ చేయలేరు కదా! మరి ఛానల్ ఎలా మారుస్తారు? ఆ రిమోట్ నుండి ఒక లేజర్ కిరణం (బాణం గుర్తు / Arrow) టీవీ వైపు వెళ్లి ఛానల్ ని మారుస్తుంది. <br><br>
          అందుకే మీ దగ్గర స్ట్రక్చర్ పాయింటర్ ఉన్నప్పుడు, డేటాని కంట్రోల్ చేయడానికి డాట్ (<code>.</code>) వాడకూడదు... దాని బదులు బాణం లాంటి <strong>ఆరో ఆపరేటర్ (<code>-&gt;</code>)</strong> వాడాలి! ఇది ప్రోగ్రామింగ్ లో చాలా లాజికల్ గా కనిపెట్టిన సింటాక్స్.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> ఒకే ఒక సింపుల్ కోడ్ (Arrow Operator Demo)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మొబైల్ ఫోన్ (Device) అనే ఒక స్ట్రక్చర్ క్రియేట్ చేసి, దాని అడ్రస్ ని ఒక పాయింటర్ కి ఇస్తున్నాం. ఆ తర్వాత పాయింటర్ వాడి బ్యాటరీ పర్సంటేజ్ ని (->) ఆపరేటర్ తో ఎలా చదువుతున్నామో గమనించండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Pointers & Arrow Operator</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఒక సింపుల్ స్ట్రక్చర్
struct Device {
    int battery;
    int screen_brightness;
};

int main(void) {
    // స్ట్రక్చర్ వేరియబుల్ క్రియేషన్
    struct Device mobile = {85, 50};
    
    // మొబైల్ అడ్రస్ ని పాయింటర్ లో స్టోర్ చేసాం
    struct Device *ptr = &mobile;
    
    // పాయింటర్ దగ్గర డాట్ వాడకూడదు, యారో (->) మాత్రమే వాడాలి
    printf("Mobile Battery is: %d%%\\n", ptr->battery);
    
    // పాయింటర్ తో వాల్యూ మార్చడం
    ptr->screen_brightness = 90;
    printf("New Brightness: %d\\n", ptr->screen_brightness);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">4</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li>మొదట <code>struct Device</code> ని డిజైన్ చేసి, అందులో <code>battery</code> మరియు <code>screen_brightness</code> పెట్టాం.</li>
        <li><code>mobile</code> అనే అసలు వేరియబుల్ ని క్రియేట్ చేసి వాల్యూస్ ఇచ్చాం.</li>
        <li>ఆ తర్వాత <code>ptr</code> అనే పాయింటర్ తీసుకుని, అందులో <code>&amp;mobile</code> (మొబైల్ యొక్క అడ్రస్) ని సేవ్‌ చేశాం.</li>
        <li>పాయింటర్ వాడి డేటా యాక్సెస్ చేయడానికి <code>ptr-&gt;battery</code> అని రాశాం. ఇది రిమోట్ తో టీవీ ఆపరేట్ చేసినట్టుగా పనిచేస్తుంది!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">5</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: <code>ptr-&gt;battery</code> కి మరియు <code>(*ptr).battery</code> కి అసలు తేడా ఏంటి?</h4>
          <p>ఎలాంటి తేడా లేదు, రెండూ వంద శాతం ఒక్కటే! పాయింటర్ ముందు స్టార్ (<code>*</code>) పెట్టి డాట్ (<code>.</code>) వాడే పద్ధతి చాలా గజిబిజిగా ఉంటుందని, బ్రాకెట్స్ మర్చిపోతే ఎర్రర్స్ వస్తాయని, C లాంగ్వేజ్ క్రియేటర్స్ దానికి షార్ట్ కట్ గా ఈ <code>-&gt;</code> ఆపరేటర్ ని కనిపెట్టారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: స్ట్రక్చర్ లోపల ఇంకో స్ట్రక్చర్ ఉంటే ఆరో ఆపరేటర్ ఎలా వాడాలి?</h4>
          <p>పాయింటర్ దేనికి ఉందో దానికి మాత్రమే ఆరో వాడాలి. మిగతా వాటికి డాట్ వాడాలి. ఉదాహరణకు <code>ptr-&gt;address.city</code> అని రాయాలి. ఒకవేళ లోపల ఉన్న అడ్రస్ కూడా పాయింటర్ అయితే అప్పుడు <code>ptr-&gt;address-&gt;city</code> అని రెండు సార్లు ఆరో వాడొచ్చు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: స్ట్రక్చర్ పాయింటర్ సైజు ఎంత ఉంటుంది?</h4>
          <p>మీ స్ట్రక్చర్ లో 1000 వేరియబుల్స్ ఉన్నా సరే, దాని పాయింటర్ సైజు కేవలం 4 బైట్స్ (32-bit సిస్టమ్) లేదా 8 బైట్స్ (64-bit సిస్టమ్) మాత్రమే ఉంటుంది. ఎందుకంటే పాయింటర్ కి కేవలం మెమరీ ఎక్కడ స్టార్ట్ అవుతుందో ఆ స్టార్టింగ్ అడ్రస్ తెలిస్తే చాలు!</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 28, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '27-c-structures-declaration-memory-model-and-padding.html', '27. Structures, Memory Model & Padding Holes', '29-c-self-referential-structures-file-io-and-5-projects.html', '29. Self-Referential Structs & Linked Lists');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// ======================= LESSON 29 =======================
function buildLesson29() {
  const title = "Self-Referential Structures & Linked Lists (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Self-Referential Structures అంటే ఏమిటి? ఒక స్ట్రక్చర్ లోపల అదే స్ట్రక్చర్ అడ్రస్ ఎందుకు పెట్టుకోవాలో డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం. Data Structures కి పునాది ఇదే!";
  const filename = "29-c-self-referential-structures-file-io-and-5-projects.html";
  const subtopics = "Self-Referential Structs · Nodes & Links · Data Structures Base · NULL Terminators";

  const contentBody = `
    <div class="intro-box">
      <p>C లాంగ్వేజ్ లోని అడ్వాన్స్డ్ కాన్సెప్ట్స్ లోకి, మరియు ముఖ్యంగా భవిష్యత్తులో మీరు నేర్చుకోబోయే <strong>Data Structures (డేటా స్ట్రక్చర్స్)</strong> కోర్సుకి ఇది పునాది లాంటి పాఠం! అర్రేస్ (Arrays) లో ఉన్న అతిపెద్ద సమస్య ఏంటంటే, ముందే "నాకు 100 గదులు కావాలి" అని కంపైలర్ కి చెప్పాలి. మధ్యలో 101వ డేటా వస్తే అది తీసుకోదు, ఫుల్ అయిపోతుంది. దీనికి పరిష్కారం ఏంటంటే... ఎప్పుడు కొత్త డేటా వస్తే అప్పుడు కొత్తగా ఒక మెమరీ బ్లాక్ క్రియేట్ చేసి, దాన్ని పాత బ్లాక్ కి ఒక గొలుసు (Chain) లా కనెక్ట్ చేయడమే. ఈ గొలుసు సిస్టమ్ నే "Linked Lists" అంటారు. ఆ లింక్ ని క్రియేట్ చేయడానికి వాడే టెక్నికే ఈ <strong>Self-Referential Structures (సెల్ఫ్-రిఫరెన్షియల్ స్ట్రక్చర్స్)</strong>. ఇది ఎలా పనిచేస్తుందో ఇప్పుడు డీప్ గా చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Self-Referential Structure అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక స్ట్రక్చర్ లోపల, మామూలు వేరియబుల్స్ (int, float) తో పాటుగా... తన లాంటిదే ఉన్న ఇంకొక స్ట్రక్చర్ యొక్క అడ్రస్ (Pointer) ని దాచుకోగలిగితే, దాన్నే సెల్ఫ్-రిఫరెన్షియల్ స్ట్రక్చర్ అంటారు. 
      </p>

      <div class="story-box">
        <div class="story-box-title">🚂 రియల్ లైఫ్ స్టోరీ: ట్రైన్ బోగీల చైన్ కనెక్షన్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక ట్రైన్ బోగీ (Node) లో జనాలు (Data) ఉంటారు. కానీ ఆ బోగీ వెనకాల ఇంకో బోగీని కలపడానికి ఒక పెద్ద ఇనుప చైన్ హుక్ (Link / Pointer) ఉంటుంది కదా! <br><br>
          మొదటి బోగీ ఆ ఇనుప చైన్ సహాయంతో రెండో బోగీ ఎక్కడ ఉందో పట్టుకుని లాక్కుంటూ వెళ్తుంది. రెండో బోగీ మూడో బోగీని లాగుతుంది. ఇలా ఒకదాని వెనక ఒకటి అనంతంగా లింక్ చేసుకుంటూ వెళ్లొచ్చు. ఒకవేళ ఒక బోగీకి ఆ ఇనుప చైన్ కి దేన్నీ తగిలించలేదంటే, దానికి అర్థం అదే ట్రైన్ కి లాస్ట్ బోగీ అని (అదే ప్రోగ్రామింగ్ లో <code>NULL</code> అని). <br><br>
          ప్రోగ్రామింగ్ లో ఈ చైన్ నే మనం <strong>Pointer to Next Node</strong> అని అంటాం. దీన్ని క్రియేట్ చేయాలంటే ఒక స్ట్రక్చర్ లోపల అదే స్ట్రక్చర్ టైప్ కి చెందిన పాయింటర్ రాయాలి.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Node Creation)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం ఒక బోగీ (Node) ని ఎలా క్రియేట్ చేయాలో చూద్దాం. దీనిలో డేటా తో పాటుగా <code>next</code> అనే చైన్ (పాయింటర్) ని ఎలా ఇచ్చామో జాగ్రత్తగా గమనించండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Self-Referential Struct</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// ఇది ఒక బోగీ (Node) లాంటిది
struct Node {
    int data;            // బోగీలో జనాలు (డేటా)
    
    // ఇదే Self-Referential Pointer (ఇనుప చైన్)
    struct Node *next;   
};

int main(void) {
    // రెండు బోగీలు తయారు చేశాం (రెంటికీ మొదట్లో లింక్స్ లేవు NULL)
    struct Node b1 = {10, NULL};
    struct Node b2 = {20, NULL};
    
    // ఇప్పుడు మొదటి బోగీ చైన్ (next) ని రెండో బోగీ అడ్రస్ కి లింక్ చేసాం!
    b1.next = &b2;
    
    // b1 ద్వారా b2 లో ఉన్న డేటాని యాక్సెస్ చేస్తున్నాం చూడండి
    printf("Data in second bogie via first bogie: %d\\n", b1.next->data);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>struct Node *next;</code> అనేది చాలా కీలకం. ఇది మామూలు పాయింటర్ కాదు, ఇంకొక <code>struct Node</code> ఎక్కడుందో దారి చూపే మ్యాప్ లాంటిది.</li>
        <li>మనం <code>b1</code> మరియు <code>b2</code> అనే రెండు వేరియబుల్స్ క్రియేట్ చేశాం. ఇవి రెండు విడివిడి బోగీలు.</li>
        <li><code>b1.next = &amp;b2;</code> అనడం ద్వారా, మొదటి బోగీకి రెండో బోగీ ఎక్కడుందో చెప్పేశాం (లింక్ కలిపాం).</li>
        <li>చివరగా <code>b1.next-&gt;data</code> అని వాడినప్పుడు, <code>b1</code> నుండి <code>b2</code> కి ఆరో (<code>-&gt;</code>) ద్వారా జంప్ చేసి మరీ 20 అనే వాల్యూ ని ప్రింట్ చేశాం! ఇదే మ్యాజిక్!</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: చైన్ (next) లో NULL ఎందుకు పెడతారు?</h4>
          <p>NULL అంటే ఆ ఇనుప చైన్ కి ఇంకేమీ కనెక్ట్ అయ్యి లేదు అని అర్థం. ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు, లూప్ తిరుగుతున్నప్పుడు "ఎక్కడ ఆగాలి?" అని కంప్యూటర్ కి తెలియాలంటే ఈ NULL ఏ గుర్తు. ప్రతి Linked List చివర్లో కచ్చితంగా NULL ఉండాలి, లేకపోతే కంప్యూటర్ సిస్టమ్ మెమరీ అంతా గాలిలో వెతుకుతూ ప్రోగ్రామ్ క్రాష్ (Segmentation Fault) అవుతుంది.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: స్ట్రక్చర్ లోపల పాయింటర్ కాకుండా డైరెక్ట్ గా స్ట్రక్చర్ రాయొచ్చా? (ఉదా: <code>struct Node next;</code>)</h4>
          <p>ఖచ్చితంగా రాయకూడదు! మీరు అలా రాస్తే ఏమవుతుందంటే... ఒక బాక్స్ లోపల ఇంకో బాక్స్, దాని లోపల ఇంకో బాక్స్... ఇలా అనంతంగా (Infinite) క్రియేట్ అవుతూనే ఉంటుంది. కంపైలర్ కి అసలు ఆ స్ట్రక్చర్ సైజు ఎంతో డిసైడ్ చేయడం సాధ్యం కాదు, కాబట్టి అది డైరెక్ట్ గా ఎర్రర్ ఇచ్చేస్తుంది. పాయింటర్ అయితే దాని సైజు ఎప్పుడూ 8 బైట్స్ అని ఫిక్స్ అయి ఉంటుంది కాబట్టి ప్రాబ్లెమ్ ఉండదు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: అసలు ఈ Linked Lists ని రియల్ వరల్డ్ లో ఎక్కడ వాడతారు?</h4>
          <p>మీరు బ్రౌజర్ లో "Back" బటన్ నొక్కినప్పుడు పాత పేజీకి వెళ్తారు కదా, అది లింక్డ్ లిస్ట్ తోనే అవుతుంది. మ్యూజిక్ ప్లేయర్ లో "Next Song" కొట్టినప్పుడు అది వర్క్ అవ్వాలన్నా ఇలాంటి సెల్ఫ్-రిఫరెన్షియల్ స్ట్రక్చర్స్ తో క్రియేట్ చేసిన లింక్డ్ లిస్ట్స్ అండ్ ట్రీస్ (Trees) వాడుతారు. సాఫ్ట్‌వేర్ ఇంజనీరింగ్ కి ఇవి గుండెకాయ లాంటివి.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 29, "Phase 11", "Structures & Data Packing", subtopics, contentBody, '28-c-structure-arrays-pointers-and-arrow-operator.html', '28. Structure Arrays & Arrow Operator', '30-c-unions-shared-memory-and-variant-types.html', '30. Unions & Shared Memory');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// ======================= LESSON 30 =======================
function buildLesson30() {
  const title = "Unions, Shared Memory & Variant Data Types (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Unions అంటే ఏమిటి? Structs కి మరియు Unions కి ఉన్న ప్రధాన తేడా ఏంటి? ఎంబెడెడ్ సిస్టమ్స్ లో మెమరీని షేర్ చేసుకోవడం ఎలాగో డీప్ గా తెలుసుకుందాం.";
  const filename = "30-c-unions-shared-memory-and-variant-types.html";
  const subtopics = "Unions Definition · Struct vs Union · Shared Memory Concept · Variant Types · Embedded Uses";

  const contentBody = `
    <div class="intro-box">
      <p>మనం ఇంతకుముందు <strong>Structures (స్ట్రక్చర్స్)</strong> గురించి నేర్చుకున్నాం. అందులో మనం ఎన్ని వేరియబుల్స్ పెడితే అన్నింటికీ విడివిడిగా గదులు (మెమరీ) తయారవుతాయి. అయితే రియల్ టైం అప్లికేషన్స్ లో కొన్నిసార్లు మనకు అందులో ఉన్న వేరియబుల్స్ అన్నీ ఒకేసారి అవసరం ఉండవు... ఒక టైమ్ లో కేవలం ఒకటే వాడుతాము. అలాంటప్పుడు అందరికీ వేరువేరు గదులు ఇచ్చి మెమరీ వేస్ట్ చేయడం ఎందుకు? అలాంటి సిచువేషన్స్ లో మెమరీ ని ఆదా చేయడానికే <strong>Unions (యూనియన్స్)</strong> వాడుతాం. అసలు ఈ "Shared Memory" కాన్సెప్ట్ ఎలా పనిచేస్తుందో ఈ ఆర్టికల్ లో క్లియర్ గా తెలుసుకుందాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Structs కి మరియు Unions కి తేడా ఏంటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        ఒక స్ట్రక్చర్ లో <code>int</code>, <code>char</code>, <code>float</code> ఉంటే... మూడింటికీ సపరేట్ గా మెమరీ దొరుకుతుంది. (మొత్తం 4 + 1 + 4 = 9 బైట్స్, ప్యాడింగ్ పక్కనపెడితే). అంటే మూడు వేరియబుల్స్ ని ఒకేసారి వాడొచ్చు. కానీ ఒక యూనియన్ లో మాత్రం కంపైలర్ అన్నింటికంటే అతిపెద్ద సైజు ఉన్న వేరియబుల్ ని చూసి, అంత మెమరీని మాత్రమే ఇస్తుంది. ఆ మెమరీని అందరూ షేర్ చేసుకోవాలి. 
      </p>

      <div class="story-box">
        <div class="story-box-title">🛏️ రియల్ లైఫ్ స్టోరీ: హాస్టల్ లో ఒకే మంచం (Shared Bed)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక చిన్న హాస్టల్ గదిలో ఒకే ఒక మంచం ఉంది. ఆ గదిలో డే-షిఫ్ట్ (ఉదయం పని) చేసే కుర్రాడు, నైట్-షిఫ్ట్ (రాత్రి పని) చేసే కుర్రాడు ఇద్దరు ఉన్నారు అనుకోండి. <br><br>
          ఉదయం టైమ్ లో నైట్-షిఫ్ట్ వాడు ఆ మంచం మీద పడుకుంటాడు (అప్పుడు డే-షిఫ్ట్ వాడు బయట ఉంటాడు). రాత్రి టైమ్ లో డే-షిఫ్ట్ వాడు పడుకుంటాడు. ఇద్దరూ ఒకేసారి ఆ మంచం మీద పడుకోలేరు, కానీ ఆ ఒక్క మంచాన్నే సమయం బట్టి <strong>షేర్ (Share)</strong> చేసుకుంటున్నారు. దీనివల్ల రెండు మంచాలు వేయాల్సినంత ఖర్చు, ప్లేస్ మిగిలిపోయింది కదా! <br><br>
          మన C లాంగ్వేజ్ లో <strong>Union</strong> కూడా ఎగ్జాక్ట్ గా ఇదే! అందులో అతి పెద్ద సైజు ఉన్న వేరియబుల్ కి మాత్రమే కంపైలర్ మెమరీ ఇస్తుంది. మిగతా వేరియబుల్స్ అన్నీ అదే మెమరీని షేర్ చేసుకుంటాయి. ఒకదాన్ని వాడేటప్పుడు ఇంకోదాన్ని వాడకూడదు!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Union Demo)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో <code>union Box</code> కి ఒక ఇంటిజర్ (4 బైట్స్) మరియు క్యారెక్టర్ (1 బైట్) ఇచ్చాము. కానీ దాని సైజు 5 బైట్స్ అవ్వదు, కేవలం 4 బైట్స్ ఏ అవుతుంది. కోడ్ రన్ చేసి చూస్తే మీకే అర్థమవుతుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Union Implementation</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// యూనియన్ ని డిక్లేర్ చేస్తున్నాం
union Box {
    int weight;   // 4 బైట్స్ (పెద్దది కాబట్టి ఇదే మెయిన్ సైజు అవుతుంది)
    char label;   // 1 బైట్
};

int main(void) {
    union Box b1;
    
    // ముందు బరువు అసైన్ చేశాం
    b1.weight = 500;
    printf("Weight is: %d\\n", b1.weight);
    
    // ఇప్పుడు లేబుల్ మార్చాం (దీనివల్ల పాత weight వాల్యూ చెత్తగా మారిపోతుంది)
    b1.label = 'A';
    printf("Label is: %c\\n", b1.label);
    
    // సైజు చూడండి, కేవలం 4 బైట్స్ మాత్రమే వస్తుంది!
    printf("Total Size of union is: %zu bytes\\n", sizeof(b1));
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li>మనం <code>union Box</code> తయారు చేసాం. కంపైలర్ లోపల ఉన్న వేరియబుల్స్ లో పెద్దది ఏదని చూస్తుంది. <code>int</code> సైజు 4 కాబట్టి, మొత్తం యూనియన్ కి 4 బైట్స్ మాత్రమే ఇస్తుంది.</li>
        <li><code>b1.weight = 500</code> అనగానే ఆ 4 బైట్స్ లోకి ఈ నంబర్ వెళ్లి కూర్చుంటుంది.</li>
        <li>కానీ ఎప్పుడైతే <code>b1.label = 'A'</code> అన్నామో, అదే 4 బైట్స్ లో మొదటి బైట్ లోకి ఈ అక్షరం వెళ్లి కూర్చుంటుంది. అంటే పాత నంబర్ ఓవర్ రైట్ (Overwrite) అయిపోయి పాడైపోతుంది.</li>
        <li>అందుకే ఒక యూనియన్ లో ఎప్పుడూ ఒక టైమ్ లో ఒక వేరియబుల్ ని మాత్రమే వాడాలి.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: ఒకేసారి <code>weight</code> మరియు <code>label</code> రెంటినీ ప్రింట్ చేస్తే ఏమవుతుంది?</h4>
          <p>మీరు లాస్ట్ లో దేనికైతే వాల్యూ ఇచ్చారో అది మాత్రమే కరెక్ట్ గా వస్తుంది. పాతది చెత్త (Garbage / Corrupted) డేటా లాగా మారిపోతుంది. ఎందుకంటే రెండూ ఒకే మెమరీలో (మంచం మీద) పడుకుంటున్నాయి కదా, ఒకరు వచ్చి పడుకుంటే ఇంకొకరు ఖచ్చితంగా లేచిపోవాల్సిందే!</p>
        </div>
        <div class="faq-item">
          <h4>Q2: యూనియన్స్ ని ఈ రోజుల్లో ఎవరైనా వాడుతున్నారా?</h4>
          <p>ఖచ్చితంగా! మీ దగ్గర 8 GB RAM ఉన్న కంప్యూటర్స్ లో ఇది వాడకపోవచ్చు కానీ... చాలా తక్కువ మెమరీ ఉండే ఎంబెడెడ్ సిస్టమ్స్ (వాషింగ్ మెషిన్స్, స్మార్ట్ వాచెస్ లో ఉండే మైక్రోకంట్రోలర్స్) లో ఒక్క బైట్ మెమరీ కూడా వృధా కాకూడదు. అక్కడ హార్డ్ వేర్ రిజిస్టర్స్ తో మాట్లాడేటప్పుడు యూనియన్స్ ని విపరీతంగా వాడతారు.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: Tagged Union అంటే ఏమిటి?</h4>
          <p>యూనియన్ లోపల ఉన్న వేరియబుల్స్ లో ప్రస్తుతం ఏది యాక్టివ్ గా ఉందో కంప్యూటర్ కి తెలీదు. అందుకని ఒక స్ట్రక్చర్ లోపల ఒక చిన్న ఇంటిజర్ (Tag) ని పెట్టి, దానికి తోడుగా యూనియన్ ని వాడతారు. ఆ ట్యాగ్ నంబర్ ని బట్టి లోపల ఉన్న వాల్యూ <code>int</code> ఆ లేక <code>float</code> ఆ అని ప్రోగ్రామర్ ఈజీగా గుర్తుపడతాడు.</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 30, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '29-c-self-referential-structures-file-io-and-5-projects.html', '29. Self-Referential Structs & Linked Lists', '31-c-enumerations-custom-values-and-switch-dispatch.html', '31. Enumerations (enum) & Switch');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// ======================= LESSON 31 =======================
function buildLesson31() {
  const title = "Enumerations (enum), Custom Values & Switch (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో Enums అంటే ఏమిటి? మ్యాజిక్ నంబర్స్ వాడే బదులు ఇంగ్లీష్ పేర్లను వాడి కోడ్ ని ఎలా చదవడానికి ఈజీగా (Readable) చేయాలో డీప్ ఎక్స్‌ప్లనేషన్ తో నేర్చుకుందాం.";
  const filename = "31-c-enumerations-custom-values-and-switch-dispatch.html";
  const subtopics = "Enum Definition · Auto-Incrementing Constants · Switch State Machines · Magic Numbers Elimination";

  const contentBody = `
    <div class="intro-box">
      <p>కోడ్ రాస్తున్నప్పుడు మధ్యలో 0, 1, 2 లాంటి నంబర్స్ వాడితే, రేపు పొద్దున్న అదే కోడ్ ని వేరే వాళ్ళు చూస్తే ఆ నంబర్స్ దేనికి వాడారో వాళ్లకు అస్సలు అర్థం కాదు. ఉదాహరణకు రిజల్ట్ ని స్టోర్ చేయడానికి 0 అంటే ఫెయిల్ అని, 1 అంటే పాస్ అని మీరు మీ మైండ్ లో అనుకుంటారు, కానీ వేరే ప్రోగ్రామర్ కి అది ఎలా తెలుస్తుంది? ఇలాంటి వాటినే ప్రోగ్రామింగ్ భాషలో "Magic Numbers" అంటారు. ఈ మ్యాజిక్ నంబర్స్ ని తీసేసి, వాటి ప్లేస్ లో చక్కగా ఇంగ్లీష్ పదాలు (PASS, FAIL) లాంటివి వాడడానికి C లాంగ్వేజ్ మనకి ఇచ్చిన పవర్ ఫుల్ ఫీచరే <strong>Enumerations (ఎనమ్స్)</strong>. దీనివల్ల కోడ్ చదవడం ఒక కథల పుస్తకం చదివినంత ఈజీ అయిపోతుంది.</p>
    </div>

    <div class="section-title"><span class="num">1</span> Enum అంటే ఏమిటి? (Meaning of enum)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>enum</code> అంటే మనం నంబర్స్ కి పెట్టుకునే ముద్దు పేర్లు లేదా కాన్స్టంట్స్ (Constants). మీరు <code>enum</code> ని ఒక లిస్ట్ లాగా క్రియేట్ చేస్తే కంపైలర్ ఆటోమేటిక్ గా మొదటి దానికి 0, రెండో దానికి 1, మూడో దానికి 2... ఇలా బ్యాక్ గ్రౌండ్ లో వాల్యూస్ ఇచ్చుకుంటూ వెళ్లిపోతుంది. మీరు బయట మాత్రం ఆ ఇంగ్లీష్ పేర్లనే వాడుకుంటారు.
      </p>

      <div class="story-box">
        <div class="story-box-title">🚦 రియల్ లైఫ్ స్టోరీ: ట్రాఫిక్ సిగ్నల్స్ సాఫ్ట్‌వేర్</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక రోడ్డు మీద ఉన్న ట్రాఫిక్ సిగ్నల్ మెషిన్ కి RED, YELLOW, GREEN అనే రంగులు అర్థం కావు. దానికి 0, 1, 2 లాంటి ఎలక్ట్రానిక్ సిగ్నల్స్ మాత్రమే తెలుసు. <br><br>
          మీరు సాఫ్ట్‌వేర్ రాసేటప్పుడు <code>if (light == 0)</code> అని రాసి వదిలేస్తే, ఒక ఐదేళ్ల తర్వాత ఆ కోడ్ ని మీరే చూసినప్పుడు ఆ 0 అంటే రెడ్ లైటా? గ్రీన్ లైటా? అని కన్ఫ్యూజ్ అవుతారు. <br><br>
          అదే మీరు కోడ్ పైన <code>enum { RED, YELLOW, GREEN };</code> అని క్రియేట్ చేసి... కిందికి వచ్చి <code>if (light == RED)</code> అని రాస్తే ఎంత బాగుంటుంది! అప్పుడు ఆ కోడ్ చదివేవాడికి కథ లాగా ఈజీగా అర్థమైపోతుంది కదా. బ్యాక్ గ్రౌండ్ లో అది 0 తోనే చెక్ చేసుకుంటుంది, కానీ పైకి మన కళ్ళకు మాత్రం ఇంగ్లీష్ పదం కనిపిస్తుంది. ఆ మ్యాజిక్ చేసేదే <strong>enum</strong>.
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (Enum వాడకం)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో వారం రోజులను <code>enum</code> వాడి ఎలా క్రియేట్ చేసామో చూడండి. మనం ఏ నంబర్ ఇవ్వకపోయినా కంపైలర్ ఆటోమేటిక్ గా 0 (SUNDAY), 1 (MONDAY) అని తీసుకుంటుంది.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple Enum State Machine</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// వారం రోజులు (ఆటోమేటిక్ గా 0, 1, 2 వస్తాయి)
enum Day { 
    SUNDAY, 
    MONDAY, 
    TUESDAY 
};

int main(void) {
    // ఇక్కడ మనం నేరుగా 1 ఇవ్వకుండా MONDAY అనే పదాన్ని వాడుతున్నాం
    enum Day today = MONDAY;
    
    // Switch కేసులలో enum వాడితే కోడ్ చాలా క్లీన్ గా ఉంటుంది
    switch(today) {
        case SUNDAY:
            printf("It's a Holiday! Relax.\\n");
            break;
        case MONDAY:
            printf("Oh no, Back to work!\\n");
            break;
        case TUESDAY:
            printf("Keep working.\\n");
            break;
    }
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>enum Day</code> అని ఒక లిస్ట్ క్రియేట్ చేశాం. అందులో SUNDAY కి కంపైలర్ 0 ఇస్తుంది, MONDAY కి 1 ఇస్తుంది.</li>
        <li><code>today = MONDAY;</code> అని వాల్యూ సెట్ చేశాం. ఇది చదవడానికి <code>today = 1;</code> కంటే వంద రెట్లు బాగుంది.</li>
        <li><code>switch(today)</code> వాడినప్పుడు, ప్రతి కేస్ (Case) కి నంబర్స్ కాకుండా డైరెక్ట్ గా ఆ పేర్లు (SUNDAY, MONDAY) వాడాము. దీన్నే స్టేట్ మెషిన్ (State Machine) డిజైన్ అంటారు. గేమ్ డెవలప్‌మెంట్ లో (MENU, PLAYING, GAME_OVER) లాంటివి ఇలాగే రాస్తారు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: Enum వాల్యూస్ 0 తో కాకుండా నాకు నచ్చిన నంబర్ (ఉదా: 10) తో స్టార్ట్ చేయొచ్చా?</h4>
          <p>ఖచ్చితంగా చేయొచ్చు! మీరు <code>enum { SUNDAY = 10, MONDAY, TUESDAY };</code> అని ఇస్తే, సండే 10 అవుతుంది, ఆ తర్వాత వచ్చే మన్డే ఆటోమేటిక్ గా ఒక నంబర్ పెరిగి 11 అవుతుంది, ట్యూస్డే 12 అవుతుంది. మీకు కావాలంటే ప్రతి దానికి మీరే నంబర్స్ కూడా ఇచ్చుకోవచ్చు (ఉదా: HTTP స్టేటస్ కోడ్స్ 200, 404 లాగా).</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>#define MONDAY 1</code> కి మరియు <code>enum</code> కి అసలు తేడా ఏంటి? రెండు ఒకే పని చేస్తున్నాయి కదా!</h4>
          <p><code>#define</code> వాడితే మీరు పది పదాలకు పది లైన్ల కోడ్ రాయాలి మరియు అవి ఏ గ్రూప్ కి సంబంధించినవో కంపైలర్ కి తెలీదు (అది కేవలం ఫైండ్ & రీప్లేస్ టూల్ లాంటిది). అదే <code>enum</code> వాడితే అన్నీ ఒకే బ్రాకెట్ లో ఒక గ్రూప్ గా ఉంటాయి. కోడ్ ని డీబగ్ చేసేటప్పుడు <code>#define</code> అయితే నంబర్ మాత్రమే చూపిస్తుంది, అదే <code>enum</code> అయితే ఆ పదం పేరునే డైరెక్ట్ గా చూపిస్తుంది. అందుకే ఎనమ్స్ ఎప్పుడూ బెస్ట్ ఛాయిస్!</p>
        </div>
        <div class="faq-item">
          <h4>Q3: ఒకే ప్రోగ్రామ్ లో రెండు వేర్వేరు ఎనమ్స్ లో ఒకే పేరు వాడొచ్చా?</h4>
          <p>C లాంగ్వేజ్ లో వాడకూడదు! ఉదాహరణకు <code>enum Traffic { RED, GREEN };</code> అని ఒకచోట రాసి, మళ్ళీ <code>enum Colors { BLUE, RED };</code> అని ఇంకోచోట రాస్తే ఎర్రర్ వస్తుంది. ఎందుకంటే ఆ పేర్లన్నీ (RED అనేది) గ్లోబల్ గా ఉంటాయి కాబట్టి క్లాష్ వస్తుంది. (అదే C++ లో అయితే <code>enum class</code> అని ఒక స్పెషల్ ఫీచర్ ద్వారా దీన్ని సాల్వ్ చేసారు).</p>
        </div>
      </div>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 31, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '30-c-unions-shared-memory-and-variant-types.html', '30. Unions & Shared Memory', '32-c-typedef-type-aliases-and-readable-architecture.html', '32. typedef, Type Aliases & Architecture');
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

// ======================= LESSON 32 =======================
function buildLesson32() {
  const title = "typedef, Type Aliases & Expressive Architecture (తెలుగులో)";
  const desc = "C లాంగ్వేజ్ లో typedef అంటే ఏమిటి? పెద్ద పెద్ద డేటా టైప్స్ కి ముద్దు పేర్లు (Aliases) పెట్టి కోడ్ ని ఈజీగా ఎలా చదవాలో (Readability) డీప్ ఎక్స్‌ప్లనేషన్ తో చూద్దాం. C కోర్సులో ఇది ఆఖరి పాఠం!";
  const filename = "32-c-typedef-type-aliases-and-readable-architecture.html";
  const subtopics = "typedef ఉపయోగాలు · Type Aliases · API Design · Struct aliasing";

  const contentBody = `
    <div class="intro-box">
      <p>ఇది మన <strong>C Master Course</strong> లో చివరి అండ్ ఫైనల్ పాఠం! ఒక ప్రొఫెషనల్ సాఫ్ట్‌వేర్ ఇంజనీర్ కి, ఒక మామూలు బిగినర్ కి ఉన్న తేడా కోడ్ రన్ అవ్వడంలో కాదు... ఆ కోడ్ చదవడానికి ఎంత ఈజీగా (Readable) ఉంది, దాని ఆర్కిటెక్చర్ ఎంత అందంగా ఉంది అనే దాని మీద ఆధారపడి ఉంటుంది. పదే పదే పెద్ద పెద్ద పేర్లతో, కన్ఫ్యూజ్ చేసే సింటాక్స్ తో కోడ్ రాస్తే రేపు మీరే మీ కోడ్ ని చూసుకుని భయపడిపోతారు. ఆ సమస్యను సాల్వ్ చేయడానికి, పెద్ద డేటా టైప్స్ కి ముద్దు పేర్లు పెట్టుకునే ఒక అద్భుతమైన ఫీచరే <strong><code>typedef</code> (టైప్ డెఫినిషన్)</strong>. దీన్ని ఎలా వాడి మన కోడ్ ని కవిత లాగా మార్చాలో చూద్దాం.</p>
    </div>

    <div class="section-title"><span class="num">1</span> typedef అంటే ఏమిటి?</div>
    <div class="section-body">
      <p class="prose-paragraph">
        <code>typedef</code> అంటే కేవలం ఒక డేటా "టైప్" కి కొత్త "పేరు" ఇవ్వడం (Type Alias). ఇది కొత్తగా ఏ డేటా టైప్ ని క్రియేట్ చేయదు, ఆల్రెడీ ఉన్న దానికే ఒక షార్ట్ కట్ పేరు పెడుతుంది.
      </p>

      <div class="story-box">
        <div class="story-box-title">🏷️ రియల్ లైఫ్ స్టోరీ: స్కూల్లో నిక్ నేమ్ (Nickname)</div>
        <p style="color:#e2e8f0; font-size:15px; line-height:1.8;">
          ఒక అబ్బాయి అసలు పేరు "వెంకట సత్య సాయి శ్రీనివాస్". వాడిని రోజుకో పదిసార్లు పిలవాలంటే టైమ్ మరియు ఎనర్జీ వేస్ట్ అవుతుంది కదా. అందుకే వాడి ఫ్రెండ్స్ అందరూ వాడికి <strong>"వాసు"</strong> అని ఒక నిక్ నేమ్ పెట్టారు. ఇప్పుడు "వాసు ఇటు రా" అని పిలిచినా వాడే వస్తాడు. వాడి అసలు రూపం మారలేదు, కేవలం పలికే పేరు మాత్రమే మారింది. <br><br>
          ప్రోగ్రామింగ్ లో కూడా <code>unsigned long long int</code> లాంటి పెద్ద పెద్ద పదాలు పదే పదే రాయలేము కాబట్టి, <code>typedef</code> వాడి దాన్ని సింపుల్ గా <code>ulong</code> అని చిన్న పేరుగా (Alias) మార్చేసుకుంటాం!
        </p>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span> ఒకే ఒక సింపుల్ కోడ్ (typedef Demo)</div>
    <div class="section-body">
      <p class="prose-paragraph">
        కింద కోడ్ లో మనం మామూలు ఇంటిజర్ (int) అనే పదానికి ఒక కొత్త పేరు (AGE) ని ఎలా పెడుతున్నామో చూడండి. ఇది వాడడం వల్ల కోడ్ ఎంత అర్థవంతంగా మారిందో గమనించండి.
      </p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">C — Simple typedef Alias</span>
          <a class="try-btn" href="/?lang=c">▶ Run Code</a>
        </div>
        <pre><code>#include &lt;stdio.h&gt;

// 'int' అనే పదాన్ని ఇక మీదట నేను 'AGE' అని పిలుస్తాను అని చెప్తున్నాం
typedef int AGE;

int main(void) {
    // ఇప్పుడు ప్రతిసారి int అనక్కర్లేదు, డైరెక్ట్ గా AGE వాడొచ్చు
    AGE myAge = 25;
    AGE friendAge = 26;
    
    printf("My age is: %d\\n", myAge);
    printf("Friend's age is: %d\\n", friendAge);
    
    return 0;
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span> కోడ్ లో ఏం జరుగుతోంది? (Step-by-Step)</div>
    <div class="section-body">
      <ul style="color:var(--text2); font-size:15px; line-height:1.9; margin-bottom:20px;">
        <li><code>typedef int AGE;</code> అనే సింటాక్స్ లో కంపైలర్ కి ఒక రూల్ చెప్పాం. ఎక్కడైనా AGE అనే పదం వస్తే దాన్ని <code>int</code> లాగా తీసుకో అని దాని అర్థం. (గమనిక: కొత్త పేర్లని క్యాపిటల్ లెటర్స్ లో రాయడం మంచి అలవాటు).</li>
        <li>ఆ తర్వాత మనం <code>AGE myAge = 25;</code> అని రాసాము. దీనివల్ల చదివే వాడికి ఆ వేరియబుల్ దేని కోసం క్రియేట్ చేసాడో టక్కున అర్థమైపోతుంది.</li>
        <li>మెమరీ లో మాత్రం ఇది మామూలు 4-బైట్ల ఇంటిజర్ లాగానే పనిచేస్తుంది, ఎటువంటి ఎక్స్ట్రా మ్యాజిక్ ఉండదు.</li>
      </ul>
    </div>

    <div class="section-title"><span class="num">4</span> ఇంటర్వ్యూలలో అడిగే కామన్ ప్రశ్నలు (FAQ)</div>
    <div class="section-body">
      <div class="faq-grid">
        <div class="faq-item">
          <h4>Q1: రియల్ టైం ప్రాజెక్ట్స్ లో <code>typedef</code> ఎక్కువగా ఎక్కడ వాడతారు?</h4>
          <p>దీన్ని అత్యధికంగా <strong>Structures (స్ట్రక్చర్స్)</strong> లో వాడతారు. ఒక స్ట్రక్చర్ వేరియబుల్ ని క్రియేట్ చేయాలంటే ప్రతిసారి <code>struct Student s1;</code> అని <code>struct</code> అనే పదాన్ని రాయాల్సి వస్తుంది. అలా పదే పదే రాయకుండా ఉండటానికి ముందే <code>typedef struct { ... } Student;</code> అని రాసేస్తారు. అప్పుడు డైరెక్ట్ గా <code>Student s1;</code> అని సింపుల్ గా వాడుకోవచ్చు.</p>
        </div>
        <div class="faq-item">
          <h4>Q2: <code>#define</code> కి మరియు <code>typedef</code> కి తేడా ఏంటి? నేను <code>#define AGE int</code> అనొచ్చు కదా?</h4>
          <p>అనొచ్చు, కానీ అది చాలా డేంజర్! <code>#define</code> అనేది కేవలం ఫైండ్ అండ్ రీప్లేస్ (Copy-Paste) టూల్ మాత్రమే. అది కంపైలర్ కంటే ముందే టెక్స్ట్ ని మారుస్తుంది కాబట్టి పాయింటర్స్ ని డిక్లేర్ చేసేటప్పుడు (ఉదాహరణకు <code>#define PTR int*</code> వాడితే) చాలా ఎర్రర్స్ వస్తాయి. కానీ <code>typedef</code> అనేది అఫీషియల్ గా కంపైలర్ కి తెలిసేలా పెట్టే అసలైన సిస్టమ్ నిక్ నేమ్. కాబట్టి ఎప్పుడైనా టైప్స్ కి పేర్లు పెట్టాలంటే <code>typedef</code> మాత్రమే వాడాలి.</p>
        </div>
        <div class="faq-item">
          <h4>Q3: <code>typedef</code> వాడటం వల్ల ప్రోగ్రామ్ స్పీడ్ తగ్గుతుందా?</h4>
          <p>అస్సలు తగ్గదు! 0% ఇంపాక్ట్ ఉంటుంది. ఎందుకంటే ఇదంతా కేవలం మీ కోడ్ ని కంపైల్ చేసేటప్పుడు కంపైలర్ కి మాత్రమే ఉపయోగపడుతుంది తప్ప, ప్రోగ్రామ్ రన్ అయ్యేటప్పుడు ఆ పేర్లు అన్నీ మాయమైపోయి డైరెక్ట్ గా మెషిన్ కోడ్ (0s & 1s) మాత్రమే రన్ అవుతుంది.</p>
        </div>
      </div>
    </div>
    
    <div class="concept-box" style="border-left-color:#3b82f6; background:rgba(59, 130, 246, 0.05); text-align:center;">
      <h4 style="color:#3b82f6; font-size:20px;">🎓 కోర్సు కంప్లీట్ అయింది! (Course Completed!)</h4>
      <p style="font-size:16px;">మీరు విజయవంతంగా C లాంగ్వేజ్ లోని 32 చాప్టర్స్ ని బేసిక్స్ నుండి అడ్వాన్స్డ్ పాయింటర్స్ వరకు కంప్లీట్ చేసారు. అభినందనలు! ఇక మీరు డేటా స్ట్రక్చర్స్, లేదా జావా, పైథాన్ లాంటి లాంగ్వేజెస్ నేర్చుకోవడానికి పూర్తి సిద్ధంగా ఉన్నారు.</p>
    </div>
  `;

  const html = wrapCPage(title, desc, filename, 32, "Phase 12", "Unions, Enums & Typedef", subtopics, contentBody, '31-c-enumerations-custom-values-and-switch-dispatch.html', '31. Enumerations (enum) & Switch', null, null);
  fs.writeFileSync(path.join(cDir, filename), html, 'utf8');
}

function run() {
  buildLesson27();
  buildLesson28();
  buildLesson29();
  buildLesson30();
  buildLesson31();
  buildLesson32();
  console.log("✅ Generated Lessons 27 to 32 with MASSIVE Text and ONLY ONE VERY SHORT Code Block!");
}
run();
