const fs = require('fs');
const path = require('path');
const { LESSONS, buildJavaSidebar } = require('./java_curriculum_data.js');

console.log('=== GENERATING NEW 25-CHAPTER JAVA MASTERCLASS INDEX ===\n');

// 1. BUILD THE ROADMAP CARDS HTML FOR THE 5 PHASES
const phases = [
  {
    num: 1,
    tag: "PHASE 01",
    title: "జావా ఫండమెంటల్స్ & JVM ఆర్కిటెక్చర్ (Java Basics & JVM Architecture)",
    icon: "⚡",
    badge: "5 In-Depth Lessons",
    desc: "James Gosling హిస్టరీ, WORA ప్రిన్సిపల్, JVM vs JRE vs JDK, బైట్‌కోడ్, JIT కంపైలర్, ప్రిమిటివ్ డేటా టైప్స్, వేరియబుల్స్ మరియు ఆపరేటర్ల పూర్తి పునాది."
  },
  {
    num: 2,
    tag: "PHASE 02",
    title: "కంట్రోల్ ఫ్లో, లూప్స్ & స్ట్రింగ్స్ (Control Flow, Loops & Strings)",
    icon: "🔀",
    badge: "5 In-Depth Lessons",
    desc: "డెసిషన్ మేకింగ్ (if-else, modern switch expressions), while & for లూప్స్, String Constant Pool (SCP), ఇమ్మ్యుటబిలిటీ, మరియు StringBuilder/StringBuffer."
  },
  {
    num: 3,
    tag: "PHASE 03",
    title: "అర్రేలు, మెథడ్స్ & బేసిక్ OOP (Arrays, Methods & Basic OOP)",
    icon: "📦",
    badge: "5 In-Depth Lessons",
    desc: "1D/2D అర్రేలు, జావాలో Pass-by-Value సూత్రం, Stack Frames, మెథడ్ ఓవర్‌లోడింగ్, Varargs, క్లాసెస్, ఆబ్జెక్ట్స్ మరియు కన్‌స్ట్రక్టర్ చైనింగ్."
  },
  {
    num: 4,
    tag: "PHASE 04",
    title: "కోర్ OOP పిల్లర్స్ & ఎక్సెప్షన్ హ్యాండ్లింగ్ (Core OOP & Exception Handling)",
    icon: "🧩",
    badge: "5 In-Depth Lessons",
    desc: "ఎన్‌క్యాప్సులేషన్, Access Modifiers, Records, ఇన్హెరిటెన్స్, super, Object క్లాస్, పాలిమార్ఫిజమ్, ఇంటర్‌ఫేసెస్, మరియు ట్రై-విత్-రీసోర్సెస్ ఎక్సెప్షన్ హ్యాండ్లింగ్."
  },
  {
    num: 5,
    tag: "PHASE 05",
    title: "కలెక్షన్స్ ఫ్రేమ్‌వర్క్, మోడ్రన్ జావా & క్యాప్‌స్టోన్ (Collections, Modern Java & Capstone)",
    icon: "🚀",
    badge: "5 In-Depth Lessons",
    desc: "List (ArrayList/LinkedList), Set, Map (HashMap ఇంటర్నల్స్), Generics & Wildcards, Lambdas, Stream API Pipelines, మరియు రియల్-వరల్డ్ Core Banking క్యాప్‌స్టోన్ ప్రాజెక్ట్."
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
    roadmapHtml += `          <a href="/blog-java/${l.file}" class="curriculum-lesson-row">
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

// 2. GENERATE COMPLETE blog-java.html
const sidebarHtml = buildJavaSidebar(0); // 0 means home active

const htmlContent = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Programming Master Course తెలుగులో (25 Chapters Complete Roadmap) | Our Compiler</title>
  <meta name="description" content="Java Programming Master Course తెలుగులో. 25 సమగ్ర అధ్యాయాలు, JVM ఆర్కిటెక్చర్, OOP పిల్లర్స్, ఎక్సెప్షన్ హ్యాండ్లింగ్, కలెక్షన్స్ ఫ్రేమ్‌వర్క్, Stream API మరియు ఎంటర్‌ప్రైజ్ బ్యాంకింగ్ క్యాప్‌స్టోన్ ప్రాజెక్ట్ వరకు పూర్తి తెలుగు గైడ్." />
  <meta name="keywords" content="java tutorial in telugu, learn java telugu, java course telugu, java 21 in telugu, java oops in telugu, java collections telugu, java projects telugu, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-java/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Java Programming Master Course తెలుగులో (25 Chapters 2026 Edition)",
    "description": "25 సమగ్ర అధ్యాయాలతో కూడిన Modern Java 21+ మాస్టర్‌కోర్సు: JVM ఆర్కిటెక్చర్, వేరియబుల్స్, కంట్రోల్ ఫ్లో, స్ట్రింగ్స్, అర్రేలు, OOP పిల్లర్స్ (Encapsulation, Inheritance, Polymorphism, Abstraction), ఎక్సెప్షన్స్, కలెక్షన్స్ ఫ్రేమ్‌వర్క్, Lambdas, Stream API, మరియు Enterprise Banking Engine Capstone Project.",
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
<body class="lang-java light-theme">

<!-- TOP NAVIGATION FALLBACK (Replaced seamlessly by site-nav.js) -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html" class="active">Java</a>
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
      <span class="current">Java Programming (తెలుగులో)</span>
    </div>

    <h1 class="page-title">Java Programming Master Course తెలుగులో (25 Chapters Complete Roadmap)</h1>
    
    <div class="page-meta">
      <span class="badge">☕ Modern Java (Java 21+ LTS)</span>
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
      <h4>💡 జావా ఎందుకు నేర్చుకోవాలి? (Why Learn Modern Java 21+ LTS?)</h4>
      <p style="color:var(--text, #ffffff); font-size:15px; line-height:1.8; margin-bottom:10px;">
        ప్రపంచంలో అత్యంత స్థిరమైన, నమ్మకమైన, మరియు ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్ రంగంలో దశాబ్దాలుగా అగ్రస్థానంలో కొనసాగుతున్న భాష <strong>Java</strong>. బ్యాంకింగ్ సిస్టమ్స్ (FinTech), ఇ-కామర్స్ ఆర్కిటెక్చర్లు (Amazon, Netflix), క్లౌడ్ నేటివ్ మైక్రోసర్వీసులు (Spring Boot), మరియు బిగ్ డేటా ప్లాట్‌ఫారమ్‌లలో జావాకు తిరుగులేదు.
      </p>
      <p style="color:var(--text2, #94a3b8); font-size:14.5px; line-height:1.8; margin-bottom:0;">
        <strong>"Write Once, Run Anywhere (WORA)"</strong> సూత్రంతో పనిచేసే JVM (Java Virtual Machine), ఆటోమేటిక్ గార్బేజ్ కలెక్షన్, దృఢమైన టైప్ సేఫ్టీ, మరియు మోడ్రన్ ఫీచర్లు (Records, Pattern Matching, Stream API, Virtual Threads) జావాను అత్యున్నత స్థాయికి తీసుకెళ్లాయి. ఈ <strong>25 అధ్యాయాల సమగ్ర తెలుగు మాస్టర్‌క్లాస్</strong> ద్వారా మీరు సున్నా నుండి ప్రారంభించి, JVM ఇంటర్నల్స్, OOP పిల్లర్స్, కలెక్షన్స్ ఫ్రేమ్‌వర్క్ మరియు రియల్-వరల్డ్ బ్యాంకింగ్ ఇంజిన్ వరకు స్పష్టమైన తెలుగు వివరణలతో నైపుణ్యం సాధించవచ్చు.
      </p>
    </div>

    <!-- CURRICULUM TITLE -->
    <div class="section-title" style="margin-top:32px;"><span class="num">📚</span> Java Master Course Curriculum (25 సమగ్ర అధ్యాయాలు)</div>

    <!-- ROADMAP CONTAINER (ALL 25 CHAPTERS IN 5 PHASES) -->
    <div class="curriculum-roadmap-container">
${roadmapHtml}
    </div>

    <!-- FAQ SECTION -->
    <div class="section-title" style="margin-top:40px;"><span class="num">❓</span> తరచుగా అడిగే ప్రశ్నలు (Frequently Asked Questions)</div>
    
    <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">1. జావా నేర్చుకోవడానికి నాకు ముందస్తు ప్రోగ్రామింగ్ అనుభవం అవసరమా?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ఏమాత్రం అవసరం లేదు! జావా బేసిక్స్, సింటాక్స్, JVM ఎలా పనిచేస్తుంది, వేరియబుల్స్ అంటే ఏమిటి అనే ప్రాథమిక విషయాల నుండి ఈ కోర్సు సున్నా అనుభవం ఉన్న విద్యార్థులను దృష్టిలో ఉంచుకుని రూపొందించబడింది.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">2. పాత Java 8 కాకుండా modern Java 21+ LTS ఎందుకు నేర్చుకోవాలి?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ఆధునిక పరిశ్రమ ప్రమాణాలు Java 21 LTS వైపు వేగంగా మారాయి. Records (బాయిలర్‌ప్లేట్ రహిత డేటా క్లాసులు), Pattern Matching Switch Expressions, Text Blocks ("""), మరియు Virtual Threads వంటి ఆధునిక ఫీచర్లు డెవలపర్‌ల ఉత్పాదకతను మరియు పనితీరును విపరీతంగా పెంచుతాయి.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">3. ఈ 25 అధ్యాయాలు పూర్తి చేయడానికి ఎంత సమయం పడుతుంది?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> ప్రతిరోజూ 1 నుండి 2 గంటల సమయం కేటాయిస్తూ, అధ్యాయంలోని కోడ్ ఉదాహరణలను మన ఆన్‌లైన్ కంపైలర్‌లో ఎగ్జిక్యూట్ చేస్తే 4 నుండి 6 వారాలలో మీరు కోర్ జావాలో సంపూర్ణ నైపుణ్యం సాధించవచ్చు.
        </div>
      </details>

      <details style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px 18px; cursor:pointer;">
        <summary style="font-weight:700; color:#10b981; font-size:15px;">4. జావా నేర్చుకున్న తర్వాత కెరీర్ అవకాశాలు ఎలా ఉంటాయి?</summary>
        <div style="margin-top:10px; font-size:14px; color:var(--text2); line-height:1.7;">
          <strong>సమాధానం:</strong> జావా నేర్చుకున్న తర్వాత మీరు Java Backend Developer, Spring Boot Microservices Specialist, Android Developer, Big Data Engineer (Apache Spark, Kafka), లేదా Cloud Enterprise Architect వంటి అత్యున్నత వేతనాలతో కూడిన సాఫ్ట్‌వేర్ రంగాలలో స్థిరపడవచ్చు.
        </div>
      </details>
    </div>

    <!-- QUICK CALL TO ACTION BOX -->
    <div class="try-box" style="text-align:center; padding:32px 24px; margin-top:36px;">
      <h3 style="color:#10b981; font-size:20px; margin:0 0 10px 0; font-weight:800;">జావా కోడింగ్ ప్రాక్టీస్ చేయడానికి రెడీగా ఉన్నారా?</h3>
      <p style="color:var(--text2); font-size:14.5px; margin:0 0 18px 0; max-width:650px; margin-left:auto; margin-right:auto;">
        ఎలాంటి లోకల్ సాఫ్ట్‌వేర్ లేదా JDK ఇన్‌స్టాల్ చేయకుండా బ్రౌజర్‌లోనే క్షణాల్లో Java 21 కోడ్ రన్ చేసి ఫలితం చూడండి!
      </p>
      <a href="/online-java-compiler.html" class="run-btn" style="display:inline-flex; text-decoration:none;">
        ⚡ Open Java Online Compiler
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

const outputPath = path.join(__dirname, '..', 'public', 'blog-java.html');
fs.writeFileSync(outputPath, htmlContent, 'utf8');
const subIndexPath = path.join(__dirname, '..', 'public', 'blog-java', 'index.html');
fs.writeFileSync(subIndexPath, htmlContent, 'utf8');
console.log('✅ Successfully wrote clean, new 25-chapter Java index to:');
console.log('   - public/blog-java.html');
console.log('   - public/blog-java/index.html');
console.log('Target file size:', htmlContent.length, 'characters');
