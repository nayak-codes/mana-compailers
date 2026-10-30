const fs = require('fs');
const path = require('path');
const { LESSONS, PHASES, buildSidebar } = require('./html_curriculum_data.js');

const blogHtmlPath = path.join(__dirname, '../public/blog-html.html');

function buildMasterIndex() {
  const sidebarHtml = buildSidebar(null);

  let roadmapCardsHtml = '';
  PHASES.forEach(phase => {
    const phaseLessons = LESSONS.filter(l => l.phase === phase.num);

    let lessonsRows = '';
    phaseLessons.forEach(lesson => {
      lessonsRows += `
          <a href="/blog-html/${lesson.file}" class="curriculum-lesson-row">
            <div class="lesson-row-left">
              <span class="lesson-idx">${lesson.id}</span>
              <div class="lesson-info">
                <span class="lesson-title">${lesson.title}</span>
                <span class="lesson-subtopics">${lesson.subtopics}</span>
              </div>
            </div>
            <div class="lesson-row-right">
              <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
            </div>
          </a>
      `;
    });

    roadmapCardsHtml += `
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap">
            <span class="phase-roadmap-icon">${phase.icon}</span>
            <div>
              <div class="phase-roadmap-tag">${phase.tag}</div>
              <h3 class="phase-roadmap-title">${phase.title}</h3>
            </div>
          </div>
          <span class="phase-roadmap-badge">${phase.badge}</span>
        </div>
        <p class="phase-roadmap-desc">${phase.desc}</p>
        <div class="phase-lessons-list">
          ${lessonsRows}
        </div>
      </div>
    `;
  });

  const fullHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML5 Programming Master Course తెలుగులో (20 Chapters Complete Roadmap) | Our Compiler</title>
  <meta name="description" content="HTML5 Programming Master Course తెలుగులో. 20 సమగ్ర అధ్యాయాలు, బేసిక్స్ నుండి సెమాంటిక్ ట్యాగ్స్, రెస్పాన్సివ్ పిక్చర్స్, ఫారమ్స్, SEO, Accessibility మరియు పోర్ట్‌ఫోలియో ప్రాజెక్ట్ వరకు పూర్తి తెలుగు గైడ్." />
  <meta name="keywords" content="html5 tutorial in telugu, learn html5 language, html masterclass, web development, html tags, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-html.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-html/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "HTML5 Programming Master Course (తెలుగులో)",
    "description": "20 సమగ్ర అధ్యాయాల HTML5 మాస్టర్‌క్లాస్. బేసిక్స్ నుండి మోడరన్ సెమాంటిక్ ట్యాగ్స్, రెస్పాన్సివ్ మీడియా, ఫారమ్స్ వాలిడేషన్, SEO మరియు లైవ్ పోర్ట్‌ఫోలియో ప్రాజెక్ట్.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "sameAs": "https://www.ourcompiler.com"
    },
    "inLanguage": "te"
  }
  </script>

  <!-- Interactive Scripts: Accordion & Default Light Theme -->
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
      if (currentTheme === 'dark') {
        document.documentElement.classList.remove('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          if (document.body) document.body.classList.remove('light-theme');
        });
      } else {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          if (document.body) document.body.classList.add('light-theme');
        });
      }
    })();
  </script>
</head>
<body class="lang-html light-theme">

<!-- TOP NAVIGATION FALLBACK -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/online-html-editor.html" class="active">HTML/CSS/JS</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-csharp.html">C#</a>
</nav>

<div class="layout">

${sidebarHtml}

  <!-- MAIN CONTENT ROADMAP -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">HTML5 ప్రోగ్రామింగ్ (తెలుగులో)</span>
    </div>

    <h1 class="page-title">HTML5 Programming Master Course తెలుగులో (20 Chapters Complete Roadmap)</h1>
    
    <div class="page-meta">
      <span class="badge">🌐 Modern HTML5 (W3C / WHATWG)</span>
      <span class="badge">🟢 20 సమగ్ర అధ్యాయాలు</span>
      <span class="badge">📂 ఇంటరాక్టివ్ రోడ్‌మ్యాప్ (5 ఫేజ్‌లు)</span>
      <span class="badge">📅 2026 ఎడిషన్</span>
    </div>

    <!-- HERO STATS BAR -->
    <div style="display:flex; gap:14px; flex-wrap:wrap; margin-bottom:28px;">
      <div class="hero-stat-card">
        <span class="hero-stat-num">20</span>
        <span class="hero-stat-label">మొత్తం చాప్టర్లు</span>
      </div>
      <div class="hero-stat-card">
        <span class="hero-stat-num">5</span>
        <span class="hero-stat-label">మాస్టర్ ఫేజ్‌లు</span>
      </div>
      <div class="hero-stat-card">
        <span class="hero-stat-num">100+</span>
        <span class="hero-stat-label">లైవ్ ఎడిటర్ ఉదాహరణలు</span>
      </div>
      <div class="hero-stat-card">
        <span class="hero-stat-num">100%</span>
        <span class="hero-stat-label">ఉచిత తెలుగు కంటెంట్</span>
      </div>
    </div>

    <!-- TELUGU INTRODUCTORY GUIDE -->
    <div class="concept-box">
      <h4>💡 HTML5 ఎందుకు నేర్చుకోవాలి? (The Skeleton of the Entire World Wide Web)</h4>
      <p style="color:var(--text); font-size:15px; line-height:1.8; margin-bottom:10px;">
        ఇంటర్నెట్ ప్రపంచంలో ప్రతి ఒక్క వెబ్‌సైట్, వెబ్ అప్లికేషన్ మరియు మొబైల్ హైబ్రిడ్ యాప్ యొక్క మూల పునాది <strong>HTML (HyperText Markup Language)</strong>. వెబ్ బ్రౌజర్‌లో యూజర్‌కు కనిపించే ప్రతి అక్షరం, ఇమేజ్, బటన్, ఫారమ్ మరియు వీడియోను అమర్చడానికి HTML అస్థిపంజరం (Skeleton) లాంటిది.
      </p>
      <p style="color:var(--text2); font-size:14.5px; line-height:1.8; margin-bottom:0;">
        ఈ 20 అధ్యాయాల సంపూర్ణ కోర్సులో మీరు HTML5 డాక్యుమెంట్ స్ట్రక్చర్, సెమాంటిక్ ఎలిమెంట్స్, రెస్పాన్సివ్ ఇమేజెస్ (picture/srcset), యాక్సెసిబిలిటీ (a11y & ARIA), నేటివ్ ఫారమ్ వాలిడేషన్, SEO మెటాడేటా మరియు రియల్-వరల్డ్ పోర్ట్‌ఫోలియో ప్రాజెక్ట్‌ను పూర్తి తెలుగు వివరణలతో, లైవ్ ఆన్‌లైన్ ఎడిటర్ సహాయంతో ప్రాక్టీస్ చేయవచ్చు.
      </p>
    </div>

    <!-- QUICK START SECTION -->
    <div style="background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(20,24,32,0.6)); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#10b981; margin-bottom: 10px; font-size:18px;">🎯 HTML5 నేర్చుకోవడం ఎక్కడ ప్రారంభించాలి?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">మీకు నచ్చిన ఫేజ్‌ను ఎంచుకుని నేరుగా కోడింగ్ ప్రాక్టీస్ చేయండి:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-html/01-html-introduction-web-standards-and-setup.html" style="background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: పునాదులు →</a>
        <a href="/blog-html/05-html-links-anchor-tags-and-navigation.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: మీడియా & టేబుల్స్ →</a>
        <a href="/blog-html/09-html-semantic-elements-header-nav-main-footer.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: సెమాంటిక్ HTML5 →</a>
        <a href="/blog-html/13-html-forms-action-method-and-form-controls.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: ఫారమ్స్ & వాలిడేషన్ →</a>
        <a href="/blog-html/17-html-head-metadata-seo-and-open-graph.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: SEO, a11y & Project →</a>
      </div>
    </div>

    <!-- CURRICULUM TITLE -->
    <div class="section-title" style="margin-top:32px;"><span class="num">📚</span> HTML5 Master Course Curriculum (20 సమగ్ర అధ్యాయాలు)</div>

    <!-- ROADMAP CONTAINER -->
    <div class="curriculum-roadmap-container">
      ${roadmapCardsHtml}
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Curated for high school, college students & working engineers · W3C & WHATWG Standards · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
  `;

  fs.writeFileSync(blogHtmlPath, fullHtml, 'utf8');
  console.log('✅ Generated public/blog-html.html master index (20 Chapters, 5 Phases)');
}

buildMasterIndex();

