const fs = require('fs');
const path = require('path');
const { PHASES, LESSONS, buildSidebar } = require('./csharp_curriculum_data.js');

const sidebarHtml = buildSidebar(null);

let phasesRoadmapHtml = '';

PHASES.forEach(p => {
  const phaseLessons = LESSONS.filter(l => l.phase === p.phase);
  
  let lessonsListHtml = '';
  phaseLessons.forEach(l => {
    lessonsListHtml += `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border-bottom:1px solid var(--border); transition:background 0.2s; gap:16px;" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background='transparent'">
          <div style="flex:1;">
            <div style="font-weight:700; font-size:15px; color:var(--text); margin-bottom:4px;">
              ${l.num}. ${l.title}
            </div>
            <div style="font-size:12.5px; color:var(--text2); line-height:1.5;">
              ${l.subtopics}
            </div>
          </div>
          <a href="/blog-csharp/${l.file}" style="flex-shrink:0; display:inline-flex; align-items:center; gap:6px; padding:7px 16px; border-radius:6px; background:#10b981; color:#ffffff; text-decoration:none; font-weight:700; font-size:13px; box-shadow:0 2px 8px rgba(16,185,129,0.25); transition:transform 0.15s, background 0.15s;" onmouseover="this.style.background='#059669'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#10b981'; this.style.transform='none'">
            చదవండి →
          </a>
        </div>`;
  });

  phasesRoadmapHtml += `
      <!-- ${p.tag} Card -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:12px; margin-bottom:28px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02)); border-bottom:1px solid var(--border); padding:18px 22px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span style="font-size:12px; font-weight:800; color:#10b981; text-transform:uppercase; letter-spacing:0.8px; background:rgba(16,185,129,0.15); padding:3px 10px; border-radius:4px;">
              ${p.tag}: ${p.title.toUpperCase()}
            </span>
            <span style="font-size:12px; color:var(--text2); font-weight:600;">4 Chapters (అధ్యాయాలు)</span>
          </div>
          <h2 style="margin:10px 0 6px 0; font-size:20px; font-weight:800; color:var(--text);">
            ${p.icon} ${p.title}
          </h2>
          <p style="margin:0; font-size:13.5px; color:var(--text2); line-height:1.5;">
            ${p.desc}
          </p>
        </div>
        <div style="display:flex; flex-direction:column;">
          ${lessonsListHtml}
        </div>
      </div>`;
});

const csharpIndexHtml = `<!DOCTYPE html>
<html class="light-theme" lang="te">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C# Programming Tutorial తెలుగులో (20 Chapters Complete Master Roadmap) | Our Compiler</title>
  <meta name="description" content="C# ప్రోగ్రామింగ్ తెలుగులో సులభంగా నేర్చుకోండి. 20 చాప్టర్లలో .NET 8 Basics, Variables, CTS Data Types, Control Flow, Loops, Methods, Strings, Generics, OOPs, LINQ, మరియు Real-world Projects తో పూర్తి గైడ్." />
  <meta name="keywords" content="csharp tutorial in telugu, learn c# language telugu, c# programming telugu, c# oop in telugu, c# linq telugu, dotnet 8 telugu, our compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-csharp.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-csharp/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "C# Programming Master Course తెలుగులో (2026 Edition)",
    "description": "20 సమగ్ర అధ్యాయాలలో C# బేసిక్స్, .NET 8, వేరియబుల్స్, కంట్రోల్ ఫ్లో, లూప్స్, మెథడ్స్, కలెక్షన్స్, ఆబ్జెక్ట్ ఓరియెంటెడ్ ప్రోగ్రామింగ్ (OOP), LINQ, మరియు రియల్-వరల్డ్ ప్రాజెక్ట్.",
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
<body class="lang-csharp light-theme">

<!-- TOP NAVIGATION FALLBACK -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html" class="active">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
${sidebarHtml}
  <!-- MAIN INDEX ROADMAP CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">C# Programming తెలుగులో</span>
    </div>

    <!-- HERO HEADER -->
    <div style="background:linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.02) 100%); border:1px solid rgba(16,185,129,0.25); border-radius:14px; padding:32px 28px; margin-bottom:32px;">
      <div style="display:inline-block; background:#10b981; color:#ffffff; font-size:12px; font-weight:800; padding:4px 12px; border-radius:20px; text-transform:uppercase; margin-bottom:12px; letter-spacing:0.5px;">
        ✨ 2026 Academic Edition
      </div>
      <h1 style="font-size:32px; font-weight:900; color:var(--text); margin-bottom:14px; line-height:1.3;">
        C# Programming Tutorial తెలుగులో (20 Chapters Masterclass)
      </h1>
      <p style="font-size:15.5px; color:var(--text2); line-height:1.7; margin-bottom:24px; max-width:850px;">
        మైక్రోసాఫ్ట్ యొక్క అత్యంత శక్తివంతమైన మోడ్రన్ ప్రోగ్రామింగ్ లాంగ్వేజ్ <strong>C# 12 & .NET 8</strong> ను పునాది నుండి అడ్వాన్స్‌డ్ స్థాయి వరకు తెలుగులో సులభంగా నేర్చుకోండి. ఎంటర్‌ప్రైజ్ సాఫ్ట్‌వేర్, వెబ్ అప్లికేషన్లు (ASP.NET Core), గేమింగ్ (Unity), మరియు క్లౌడ్ సిస్టమ్స్ నిర్మించడానికి అవసరమైన అన్ని కాన్సెప్ట్‌లు ఇందులో ఉన్నాయి.
      </p>

      <!-- Key Stats Grid -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:14px;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:14px; text-align:center;">
          <div style="font-size:24px; font-weight:900; color:#10b981;">20</div>
          <div style="font-size:12.5px; color:var(--text2); font-weight:600; margin-top:2px;">అధ్యాయాలు (5 ఫేజ్‌లు)</div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:14px; text-align:center;">
          <div style="font-size:24px; font-weight:900; color:#10b981;">.NET 8</div>
          <div style="font-size:12.5px; color:var(--text2); font-weight:600; margin-top:2px;">Modern C# 12 Standards</div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:14px; text-align:center;">
          <div style="font-size:24px; font-weight:900; color:#10b981;">100%</div>
          <div style="font-size:12.5px; color:var(--text2); font-weight:600; margin-top:2px;">ఉచితం & తెలుగు వివరణ</div>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:14px; text-align:center;">
          <div style="font-size:24px; font-weight:900; color:#10b981;">100+</div>
          <div style="font-size:12.5px; color:var(--text2); font-weight:600; margin-top:2px;">లైవ్ కోడింగ్ ఎగ్జాంపుల్స్</div>
        </div>
      </div>
    </div>

    <!-- 5 PHASES ROADMAP -->
    ${phasesRoadmapHtml}

    <!-- COMPILER CALLOUT -->
    <div style="background:linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03)); border:1px solid rgba(16,185,129,0.3); border-radius:12px; padding:28px; text-align:center; margin-top:40px;">
      <h3 style="margin:0 0 8px 0; color:var(--text); font-size:20px; font-weight:800;">
        కోడింగ్ ప్రాక్టీస్ చేయడానికి రెడీగా ఉన్నారా?
      </h3>
      <p style="margin:0 0 18px 0; font-size:14px; color:var(--text2);">
        ఎలాంటి సాఫ్ట్‌వేర్ ఇన్‌స్టాల్ చేయకుండా బ్రౌజర్‌లోనే క్లౌడ్‌లో C# కోడ్ రన్ చేసి ఫలితం చూడండి!
      </p>
      <a href="/online-csharp-compiler.html" style="display:inline-flex; align-items:center; gap:8px; padding:12px 24px; border-radius:8px; background:#10b981; color:#ffffff; text-decoration:none; font-weight:800; font-size:14px; box-shadow:0 4px 14px rgba(16,185,129,0.3);">
        ⚡ Open C# Online Compiler
      </a>
    </div>

    <!-- AUTHOR FOOTER -->
    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on .NET 8.0 SDK runtime · 2026 Academic Edition</span>
      </div>
    </div>

  </main>
</div>

<!-- SITE NAVIGATION LOADER -->
<script src="/site-nav.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../public/blog-csharp.html'), csharpIndexHtml, 'utf8');
console.log('✅ Generated public/blog-csharp.html master roadmap! (' + csharpIndexHtml.length + ' chars)');

