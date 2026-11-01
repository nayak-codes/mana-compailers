const fs = require('fs');
const path = require('path');
const { LESSONS, buildPythonSidebar } = require('./python_curriculum_data.js');

console.log('=== GENERATING NEW 25-CHAPTER PYTHON MASTERCLASS INDEX ===\n');

// 1. UPDATE public/blog-python/style.css
const cssPath = path.join(__dirname, '..', 'public', 'blog-python', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace body.light-theme with .light-theme
css = css.replace(/body\.light-theme/g, '.light-theme');

// Add Noto Sans Telugu and font-family rules if missing
if (!css.includes('Noto Sans Telugu')) {
  css = `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap');\n\nbody, .sidebar, .content, .accordion-header, .page-title, .intro-box, details, summary {\n  font-family: 'Inter', 'Noto Sans Telugu', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n}\n\n` + css;
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('✅ Updated public/blog-python/style.css');

// 2. BUILD THE ROADMAP CARDS HTML FOR THE 5 PHASES
const phases = [
  {
    num: 1,
    tag: "PHASE 01",
    title: "పైథాన్ ఫండమెంటల్స్ & బేసిక్స్ (Python Basics & Core Setup)",
    icon: "⚡",
    badge: "5 In-Depth Lessons",
    desc: "పైథాన్ చరిత్ర, ఇంటర్‌ప్రీటర్ ఆర్కిటెక్చర్, వేరియబుల్స్, డేటా టైప్స్, ఇన్పుట్/అవుట్పుట్ మరియు ఆపరేటర్ల పూర్తి పునాది."
  },
  {
    num: 2,
    tag: "PHASE 02",
    title: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్ (Control Flow & Strings)",
    icon: "🔀",
    badge: "5 In-Depth Lessons",
    desc: "డెసిషన్ మేకింగ్ (if-elif-else, match-case), while & for లూప్స్, break/continue/else మరియు స్ట్రింగ్స్ & Regex మాస్టరీ."
  },
  {
    num: 3,
    tag: "PHASE 03",
    title: "డేటా స్ట్రక్చర్స్ & కలెక్షన్స్ (Data Structures & Collections)",
    icon: "📦",
    badge: "5 In-Depth Lessons",
    desc: "లిస్ట్స్, టుపుల్స్, డిక్షనరీలు, సెట్స్, కాంప్రహెన్షన్స్ మరియు ప్రొడక్షన్ కలెక్షన్స్ (Counter, deque, heapq)."
  },
  {
    num: 4,
    tag: "PHASE 04",
    title: "ఫంక్షన్స్, మాడ్యూల్స్ & ఫైల్ I/O (Functions, Modules & File I/O)",
    icon: "🧩",
    badge: "5 In-Depth Lessons",
    desc: "ఫంక్షన్స్, *args & **kwargs, LEGB స్కోప్, ల్యాంబ్డా, మాడ్యూల్స్, pip, venv మరియు ఫైల్ హ్యాండ్లింగ్ & JSON."
  },
  {
    num: 5,
    tag: "PHASE 05",
    title: "OOP, ఎక్సెప్షన్స్ & క్యాప్‌స్టోన్ ప్రాజెక్ట్ (OOP & Capstone Project)",
    icon: "🚀",
    badge: "5 In-Depth Lessons",
    desc: "ఎక్సెప్షన్ హ్యాండ్లింగ్, OOP క్లాసెస్ & ఆబ్జెక్ట్స్, ఇన్హెరిటెన్స్, డెకరేటర్లు, జెనరేటర్లు మరియు పూర్తి స్థాయి రియల్-వరల్డ్ ప్రాజెక్ట్."
  }
];

let roadmapHtml = '';

phases.forEach(p => {
  const phaseLessons = LESSONS.filter(l => l.phase === p.num);
  
  roadmapHtml += `      <!-- ${p.tag} -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap">
            <span class="phase-roadmap-icon">${p.icon}</span>
            <div>
              <div class="phase-roadmap-tag">${p.tag}</div>
              <h3 class="phase-roadmap-title">భాగం ${p.num}: ${p.title}</h3>
            </div>
          </div>
          <span class="phase-roadmap-badge">${p.badge}</span>
        </div>
        <p class="phase-roadmap-desc">${p.desc}</p>

        <div class="phase-lessons-list">\n`;

  phaseLessons.forEach(l => {
    roadmapHtml += `          <a href="/blog-python/${l.file}" class="curriculum-lesson-row">
            <div class="lesson-row-left">
              <span class="lesson-idx">${l.id}</span>
              <div class="lesson-info">
                <span class="lesson-title">${l.title}</span>
                <span class="lesson-subtopics">${l.subtopics}</span>
              </div>
            </div>
            <div class="lesson-row-right">
              <span class="lesson-btn">చదవండి <span class="arrow">→</span></span>
            </div>
          </a>\n`;
  });

  roadmapHtml += `        </div>
      </div>\n\n`;
});

// 3. GENERATE COMPLETE blog-python.html
const sidebarHtml = buildPythonSidebar(0); // 0 means home active

const htmlContent = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Python 3 Programming Master Course తెలుగులో (25 Chapters Complete Roadmap) | Our Compiler</title>
  <meta name="description" content="Python 3 Programming Master Course తెలుగులో. 25 సమగ్ర అధ్యాయాలు, బేసిక్స్ నుండి కంట్రోల్ ఫ్లో, డేటా స్ట్రక్చర్స్, ఫంక్షన్స్, OOP మరియు రియల్-వరల్డ్ క్యాప్‌స్టోన్ ప్రాజెక్ట్ వరకు పూర్తి తెలుగు గైడ్." />
  <meta name="keywords" content="python tutorial in telugu, learn python telugu, python course telugu, python 3 in telugu, python oops in telugu, python projects telugu, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-python.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-python/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Python 3 Programming Master Course తెలుగులో (25 Chapters 2026 Edition)",
    "description": "25 సమగ్ర అధ్యాయాలతో కూడిన Python 3 మాస్టర్‌కోర్సు: బేసిక్స్, వేరియబుల్స్, కంట్రోల్ ఫ్లో, డేటా స్ట్రక్చర్స్ (Lists, Tuples, Dictionaries, Sets), ఫంక్షన్స్, మాడ్యూల్స్, ఫైల్ I/O, OOP పిల్లర్స్, డెకరేటర్లు, మరియు Enterprise Capstone Project.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "inLanguage": "te",
    "isAccessibleForFree": true
  }
  </script>

  <!-- Accordion Toggle & Initial Theme Script -->
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
      const currentTheme = localStorage.getItem('tutorial_theme_v2');
      if (currentTheme !== 'dark') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
    })();
  </script>
</head>
<body class="lang-python light-theme">

<!-- TOP NAVIGATION FALLBACK (Replaced seamlessly by site-nav.js) -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
${sidebarHtml}

  <!-- MAIN CONTENT AREA -->
  <main class="content">

    <!-- BREADCRUMB -->
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Python Programming (తెలుగులో)</span>
    </div>

    <h1 class="page-title">Python 3 Programming Master Course తెలుగులో (25 Chapters Complete Roadmap)</h1>
    
    <div class="page-meta">
      <span class="badge">🐍 Modern Python (Python 3.12+)</span>
      <span class="badge">🟢 25 Comprehensive Chapters</span>
      <span class="badge">📂 5 Core Learning Phases</span>
      <span class="badge">📅 2026 Academic Edition</span>
    </div>

    <!-- HERO STATS BAR -->
    <div style="display:flex; gap:14px; flex-wrap:wrap; margin-bottom:28px;">
      <div class="hero-stat-card">
        <span class="hero-stat-num">25</span>
        <span class="hero-stat-label">మొత్తం చాప్టర్లు</span>
      </div>
      <div class="hero-stat-card">
        <span class="hero-stat-num">5</span>
        <span class="hero-stat-label">మాస్టర్ ఫేజ్‌లు</span>
      </div>
      <div class="hero-stat-card">
        <span class="hero-stat-num">120+</span>
        <span class="hero-stat-label">లైవ్ కోడింగ్ ఉదాహరణలు</span>
      </div>
      <div class="hero-stat-card">
        <span class="hero-stat-num">100%</span>
        <span class="hero-stat-label">ఉచిత తెలుగు కంటెంట్</span>
      </div>
    </div>

    <!-- TELUGU INTRODUCTORY GUIDE -->
    <div class="concept-box">
      <h4>💡 పైథాన్ ఎందుకు నేర్చుకోవాలి? (Why Learn Modern Python 3?)</h4>
      <p style="color:var(--text, #ffffff); font-size:15px; line-height:1.8; margin-bottom:10px;">
        ప్రపంచంలో అత్యంత ప్రజాదరణ పొందిన ప్రోగ్రామింగ్ భాషల్లో <strong>Python</strong> అగ్రస్థానంలో ఉంది. ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI), మెషిన్ లెర్నింగ్, డేటా సైన్స్, వెబ్ డెవలప్‌మెంట్ (Django/Flask), క్లౌడ్ ఆటోమేషన్ మరియు సైబర్ సెక్యూరిటీ వరకు దాదాపు ప్రతి రంగంలో పైథాన్‌ను విరివిగా ఉపయోగిస్తున్నారు.
      </p>
      <p style="color:var(--text2, #94a3b8); font-size:14.5px; line-height:1.8; margin-bottom:0;">
        పైథాన్ సింటాక్స్ ఇంగ్లీష్ మాట్లాడినంత సరళంగా ఉండటం వల్ల ప్రారంభకులకు (Beginners) ఇది అత్యుత్తమమైన మొదటి భాష. ఈ <strong>25 అధ్యాయాల సమగ్ర తెలుగు మాస్టర్‌క్లాస్</strong> లో మీరు జీరో నుండి మొదలుపెట్టి, బేసిక్స్, కంట్రోల్ ఫ్లో, డేటా స్ట్రక్చర్స్, ఫంక్షన్స్, OOP పిల్లర్స్, ఫైల్ హ్యాండ్లింగ్, మరియు రియల్-వరల్డ్ ప్రాజెక్ట్ వరకు అత్యంత స్పష్టమైన తెలుగు వివరణలతో నేర్చుకోవచ్చు.
      </p>
    </div>

    <!-- CURRICULUM TITLE -->
    <div class="section-title" style="margin-top:32px;"><span class="num">📚</span> Python 3 Master Course Curriculum (25 సమగ్ర అధ్యాయాలు)</div>

    <!-- ROADMAP CONTAINER (ALL 25 CHAPTERS IN 5 PHASES) -->
    <div class="curriculum-roadmap-container">
${roadmapHtml}
    </div>

    <!-- FAQ SECTION -->
    <div class="section-title" style="margin-top:40px;"><span class="num">❓</span> తరచుగా అడిగే ప్రశ్నలు (Frequently Asked Questions)</div>
    
    <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">1. పైథాన్ నేర్చుకోవడానికి నాకు ముందస్తు ప్రోగ్రామింగ్ అనుభవం అవసరమా?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ఏమాత్రం అవసరం లేదు! పైథాన్ సింటాక్స్ అత్యంత సులభంగా, సాధారణ ఆంగ్లంలా ఉంటుంది. ఈ కోర్సు సున్నా ప్రోగ్రామింగ్ నాలెడ్జ్ ఉన్న ప్రారంభకులను కూడా దృష్టిలో ఉంచుకుని మొదటి అధ్యాయం నుండి దశలవారీగా డిజైన్ చేయబడింది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">2. ఈ కోర్సులో Python 2 నేర్పిస్తారా లేదా Python 3 నా?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> మేము సరికొత్త <strong>Python 3.12+</strong> ఆధునిక ఫీచర్లను (f-strings, pattern matching, type hints, modern OOP) బోధిస్తున్నాము. Python 2 అధికారికంగా 2020లోనే నిలిపివేయబడింది (Deprecated).
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">3. ఈ 25 అధ్యాయాలు పూర్తి చేయడానికి ఎంత సమయం పడుతుంది?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> రోజూ 1 నుండి 2 గంటలు కేటాయించి, ప్రతి అధ్యాయంలోని కోడ్ ఉదాహరణలను మన ఆన్‌లైన్ కంపైలర్‌లో ప్రాక్టీస్ చేస్తే 4 నుండి 6 వారాలలో మీరు పైథాన్‌లో పూర్తి పట్టు సాధించవచ్చు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">4. పైథాన్ నేర్చుకున్న తర్వాత కెరీర్ అవకాశాలు ఎలా ఉంటాయి?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> పైథాన్ నేర్చుకున్న తర్వాత మీరు Data Scientist, AI/ML Engineer, Python Backend Developer (Django/FastAPI), Automation/DevOps Engineer, లేదా Data Analyst వంటి అత్యధిక డిమాండ్ ఉన్న సాఫ్ట్‌వేర్ రంగాలలో అద్భుతమైన కెరీర్ ప్రారంభించవచ్చు.
        </div>
      </details>
    </div>

    <!-- QUICK CALL TO ACTION BOX -->
    <div class="try-box" style="text-align:center; padding:32px 24px; margin-top:36px;">
      <h3 style="color:#10b981; font-size:20px; margin:0 0 10px 0; font-weight:800;">పైథాన్ కోడింగ్ ప్రాక్టీస్ చేయడానికి రెడీగా ఉన్నారా?</h3>
      <p style="color:var(--text2); font-size:14.5px; margin:0 0 18px 0; max-width:650px; margin-left:auto; margin-right:auto;">
        ఎలాంటి లోకల్ సాఫ్ట్‌వేర్ ఇన్‌స్టాల్ చేయకుండా బ్రౌజర్‌లోనే క్షణాల్లో Python 3 కోడ్ రన్ చేసి ఫలితం చూడండి!
      </p>
      <a href="/online-python-compiler.html" class="run-btn" style="display:inline-flex; text-decoration:none;">
        ⚡ Open Python Online Compiler
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Curated by Our Compiler Technical Editorial Team</strong><br>
        <span>Published for 2026 Academic & Industry Reference · 100% Free & Open Access in Telugu</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

const outputPath = path.join(__dirname, '..', 'public', 'blog-python.html');
fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log('✅ Successfully wrote clean, new 25-chapter Python index to public/blog-python.html!');
console.log('Target file size:', htmlContent.length, 'characters');
