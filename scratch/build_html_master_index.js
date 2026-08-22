const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'public', 'blog-html.html');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML5 Masterclass — Complete Course &amp; Tutorials | Our Compiler</title>
  <meta name="description" content="Master HTML5 with 37 comprehensive chapters in clean, professional English. Learn document structure, syntax, links, navigation, lists, tables, images, responsive srcset, SVG, Canvas, semantic HTML5, forms, validation, audio, video, IFrames, Head metadata, SEO, accessibility WCAG, ARIA, Web Storage, Data Attributes, Dialogs, Web Workers, Templates, Custom Elements, Internationalization, Responsive design, Performance, and Validation & Debugging." />
  <meta name="keywords" content="html tutorial, learn html5, html tags, html elements, html web development, html5 masterclass, html links, html tables, html forms, html audio, html video, html semantic, web storage, accessibility, aria, web components" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-html.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-html/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

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
      const currentTheme = localStorage.getItem('theme') || 'dark';
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
      });
    })();
  </script>
</head>
<body class="lang-html">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-html.html" class="active">HTML</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <!-- LEFT ACCORDION SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">HTML5 Complete Course</div>
    <a href="/blog-html.html" class="sidebar-home-link active">🌐 HTML Course HOME</a>

    <div class="sidebar-accordion">
      <!-- Phase 01: Introduction -->
      <button class="accordion-header active" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🚀</span>
          <div class="phase-info"><span class="phase-tag">Phase 01</span><span class="phase-title">HTML Introduction</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content open">
        <a href="/blog-html/01-what-is-html5.html">1. What is HTML5?</a>
        <a href="/blog-html/02-your-first-html-page.html">2. Your First HTML Page</a>
      </div>

      <!-- Phase 02: Syntax & Text -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📝</span>
          <div class="phase-info"><span class="phase-tag">Phase 02</span><span class="phase-title">Syntax &amp; Text</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/03-elements-tags-attributes.html">3. Elements, Tags &amp; Attributes</a>
        <a href="/blog-html/04-headings-paragraphs.html">4. Headings &amp; Paragraphs</a>
        <a href="/blog-html/05-text-formatting.html">5. Text Formatting</a>
        <a href="/blog-html/06-code-technical-text.html">6. Code &amp; Technical Text</a>
      </div>

      <!-- Phase 03: Links & Navigation -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔗</span>
          <div class="phase-info"><span class="phase-tag">Phase 03</span><span class="phase-title">Links &amp; Navigation</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/07-links.html">7. Links</a>
        <a href="/blog-html/08-navigation-menus.html">8. Navigation Menus</a>
      </div>

      <!-- Phase 04: Lists & Tables -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📊</span>
          <div class="phase-info"><span class="phase-tag">Phase 04</span><span class="phase-title">Lists &amp; Tables</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/09-lists.html">9. Lists</a>
        <a href="/blog-html/10-tables.html">10. Tables</a>
      </div>

      <!-- Phase 05: Images & Graphics -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🖼️</span>
          <div class="phase-info"><span class="phase-tag">Phase 05</span><span class="phase-title">Images &amp; Graphics</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/11-images.html">11. Images</a>
        <a href="/blog-html/12-responsive-images.html">12. Responsive Images</a>
        <a href="/blog-html/13-svg-canvas.html">13. SVG &amp; Canvas</a>
      </div>

      <!-- Phase 06: Semantic HTML5 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🏗️</span>
          <div class="phase-info"><span class="phase-tag">Phase 06</span><span class="phase-title">Semantic HTML5</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/14-semantic-html5.html">14. Semantic HTML5</a>
        <a href="/blog-html/15-page-layout-structure.html">15. Page Layout Structure</a>
      </div>

      <!-- Phase 07: Forms -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📋</span>
          <div class="phase-info"><span class="phase-tag">Phase 07</span><span class="phase-title">Forms &amp; Input Controls</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/16-forms-basics.html">16. Forms Basics</a>
        <a href="/blog-html/17-input-types.html">17. Input Types</a>
        <a href="/blog-html/18-form-attributes.html">18. Form Attributes</a>
        <a href="/blog-html/19-form-validation.html">19. Form Validation</a>
      </div>

      <!-- Phase 08: Audio, Video & Embeds -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🎬</span>
          <div class="phase-info"><span class="phase-tag">Phase 08</span><span class="phase-title">Audio, Video &amp; Embeds</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/20-audio.html">20. Audio</a>
        <a href="/blog-html/21-video.html">21. Video</a>
        <a href="/blog-html/22-embedded-content.html">22. Embedded Content</a>
      </div>

      <!-- Phase 09: Metadata & SEO -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔍</span>
          <div class="phase-info"><span class="phase-tag">Phase 09</span><span class="phase-title">Metadata &amp; SEO</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/23-head-metadata.html">23. Head Metadata</a>
        <a href="/blog-html/24-seo-friendly-html.html">24. SEO-Friendly HTML</a>
      </div>

      <!-- Phase 10: Accessibility -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">♿</span>
          <div class="phase-info"><span class="phase-tag">Phase 10</span><span class="phase-title">Accessibility &amp; ARIA</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/25-accessibility-basics.html">25. Accessibility Basics</a>
        <a href="/blog-html/26-aria.html">26. ARIA</a>
        <a href="/blog-html/27-accessibility-testing.html">27. Accessibility Testing</a>
      </div>

      <!-- Phase 11: HTML APIs & Features -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚡</span>
          <div class="phase-info"><span class="phase-tag">Phase 11</span><span class="phase-title">HTML APIs &amp; Features</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/28-web-storage.html">28. Web Storage</a>
        <a href="/blog-html/29-data-attributes.html">29. Data Attributes</a>
        <a href="/blog-html/30-dialogs-interactive-elements.html">30. Dialogs &amp; Interactive Elements</a>
        <a href="/blog-html/31-web-workers.html">31. Web Workers</a>
      </div>

      <!-- Phase 12: Advanced HTML5 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🧩</span>
          <div class="phase-info"><span class="phase-tag">Phase 12</span><span class="phase-title">Advanced HTML5</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/32-templates.html">32. Templates</a>
        <a href="/blog-html/33-custom-elements.html">33. Custom Elements &amp; Web Components</a>
        <a href="/blog-html/34-internationalization.html">34. Internationalization</a>
      </div>

      <!-- Phase 13: Responsive & Production -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🚀</span>
          <div class="phase-info"><span class="phase-tag">Phase 13</span><span class="phase-title">Responsive &amp; Production</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-html/35-responsive-html.html">35. Responsive HTML</a>
        <a href="/blog-html/36-html-performance.html">36. HTML Performance</a>
        <a href="/blog-html/37-validation-debugging.html">37. Validation &amp; Debugging</a>
      </div>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML</a><span class="sep">›</span>
      <span class="current">Master Index: HTML5 Masterclass</span>
    </div>

    <h1 class="page-title">HTML5 Masterclass (2026 Edition)</h1>

    <div class="page-meta">
      <span class="badge">🌐 HTML5</span>
      <span class="badge">🟢 37 Chapters Complete</span>
      <span class="badge">📂 Master Index: 13 Phases Complete</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">HTML Overview · Syntax · Links &amp; Nav · Lists &amp; Tables · Images &amp; Responsive srcset · SVG &amp; Canvas · Semantic HTML5 · Forms &amp; Inputs · Audio, Video &amp; IFrames · Metadata &amp; SEO · Accessibility &amp; ARIA · Web Storage · Data Attributes · Dialogs · Web Workers · Templates &amp; Web Components · Internationalization · Responsive HTML · Performance · Validation &amp; Debugging</span>
    </div>

    <div style="background: linear-gradient(135deg, rgba(249,115,22,0.12), rgba(20,24,32,0.6)); border: 1px solid rgba(249,115,22,0.3); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color:#f97316; margin-bottom: 10px; font-size:18px;">🎯 Complete 37-Chapter HTML5 Masterclass</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore core HTML basics, master forms, configure Head Metadata &amp; SEO, test ARIA accessibility, build Web Components, or run live code in our interactive editor:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-html/01-what-is-html5.html" style="background:linear-gradient(135deg, #f97316, #ea580c); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Intro →</a>
        <a href="/blog-html/23-head-metadata.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Metadata &amp; SEO →</a>
        <a href="/blog-html/25-accessibility-basics.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: Accessibility →</a>
        <a href="/blog-html/33-custom-elements.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 12: Web Components →</a>
        <a href="/online-html-editor.html" style="background:var(--bg3); border:1px solid var(--border); color:#f97316; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">▶ Try Online HTML Editor →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">

      <!-- Phase 1 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🚀</span><div><div class="phase-roadmap-tag">Phase 01</div><h3 class="phase-roadmap-title">HTML Introduction</h3></div></div>
          <span class="phase-roadmap-badge">2 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/01-what-is-html5.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">01</span><div class="lesson-info"><span class="lesson-title">1. What is HTML5?</span><span class="lesson-subtopics">HTML Definition · Web Trio · DOM Parsing · Tags vs Elements vs Attributes</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/02-your-first-html-page.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">02</span><div class="lesson-info"><span class="lesson-title">2. Your First HTML Page</span><span class="lesson-subtopics">Boilerplate · Doctype · Head &amp; Body · Live Server · Comments · Validation</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 2 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">📝</span><div><div class="phase-roadmap-tag">Phase 02</div><h3 class="phase-roadmap-title">HTML Syntax and Text</h3></div></div>
          <span class="phase-roadmap-badge">4 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/03-elements-tags-attributes.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">03</span><div class="lesson-info"><span class="lesson-title">3. Elements, Tags &amp; Attributes</span><span class="lesson-subtopics">Void Elements · Global Attributes (id, class, style)</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/04-headings-paragraphs.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">04</span><div class="lesson-info"><span class="lesson-title">4. Headings &amp; Paragraphs</span><span class="lesson-subtopics">Headings &lt;h1&gt;-&lt;h6&gt; · &lt;p&gt; · &lt;br&gt; · &lt;hr&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/05-text-formatting.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">05</span><div class="lesson-info"><span class="lesson-title">5. Text Formatting</span><span class="lesson-subtopics">&lt;strong&gt;, &lt;em&gt;, &lt;mark&gt;, &lt;sub&gt;, &lt;sup&gt;, &lt;blockquote&gt;, &lt;abbr&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/06-code-technical-text.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">06</span><div class="lesson-info"><span class="lesson-title">6. Code &amp; Technical Text</span><span class="lesson-subtopics">&lt;code&gt;, &lt;pre&gt;, &lt;kbd&gt;, &lt;samp&gt;, &lt;var&gt;, Entities</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 3 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🔗</span><div><div class="phase-roadmap-tag">Phase 03</div><h3 class="phase-roadmap-title">Links and Navigation</h3></div></div>
          <span class="phase-roadmap-badge">2 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/07-links.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">07</span><div class="lesson-info"><span class="lesson-title">7. Links</span><span class="lesson-subtopics">Anchor &lt;a&gt; · href · absolute vs relative · mailto · target="_blank" · rel="noopener"</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/08-navigation-menus.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">08</span><div class="lesson-info"><span class="lesson-title">8. Navigation Menus</span><span class="lesson-subtopics">Semantic &lt;nav&gt; · Active links · Breadcrumbs · Skip links</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 4 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">📊</span><div><div class="phase-roadmap-tag">Phase 04</div><h3 class="phase-roadmap-title">Lists and Tables</h3></div></div>
          <span class="phase-roadmap-badge">2 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/09-lists.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">09</span><div class="lesson-info"><span class="lesson-title">9. Lists</span><span class="lesson-subtopics">Unordered &lt;ul&gt; · Ordered &lt;ol&gt; · Description &lt;dl&gt; · Nested lists</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/10-tables.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">10</span><div class="lesson-info"><span class="lesson-title">10. Tables</span><span class="lesson-subtopics">&lt;table&gt;, &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;, colspan, rowspan, scope="col"</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 5 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🖼️</span><div><div class="phase-roadmap-tag">Phase 05</div><h3 class="phase-roadmap-title">Images and Graphics</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/11-images.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">11</span><div class="lesson-info"><span class="lesson-title">11. Images</span><span class="lesson-subtopics">&lt;img&gt; · alt text · width/height · lazy loading · &lt;figure&gt; &amp; &lt;figcaption&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/12-responsive-images.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">12</span><div class="lesson-info"><span class="lesson-title">12. Responsive Images</span><span class="lesson-subtopics">srcset · sizes · &lt;picture&gt; · Art Direction · WebP/AVIF</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/13-svg-canvas.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">13</span><div class="lesson-info"><span class="lesson-title">13. SVG &amp; Canvas</span><span class="lesson-subtopics">Inline SVG · 2D &lt;canvas&gt; context · SVG vs Canvas</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 6 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🏗️</span><div><div class="phase-roadmap-tag">Phase 06</div><h3 class="phase-roadmap-title">Semantic HTML5</h3></div></div>
          <span class="phase-roadmap-badge">2 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/14-semantic-html5.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">14</span><div class="lesson-info"><span class="lesson-title">14. Semantic HTML5</span><span class="lesson-subtopics">&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;section&gt;, &lt;article&gt;, &lt;aside&gt;, &lt;footer&gt;, &lt;details&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/15-page-layout-structure.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">15</span><div class="lesson-info"><span class="lesson-title">15. Page Layout Structure</span><span class="lesson-subtopics">Blog, Docs, Dashboard Layouts · ARIA Landmark roles</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 7 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">📋</span><div><div class="phase-roadmap-tag">Phase 07</div><h3 class="phase-roadmap-title">Forms and Input Controls</h3></div></div>
          <span class="phase-roadmap-badge">4 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/16-forms-basics.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">16</span><div class="lesson-info"><span class="lesson-title">16. Forms Basics</span><span class="lesson-subtopics">&lt;form&gt;, action, method (GET/POST), &lt;label&gt;, &lt;input&gt;, &lt;button&gt;, &lt;textarea&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/17-input-types.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">17</span><div class="lesson-info"><span class="lesson-title">17. Input Types</span><span class="lesson-subtopics">text, password, email, number, tel, date, color, range, checkbox, radio, file</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/18-form-attributes.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">18</span><div class="lesson-info"><span class="lesson-title">18. Form Attributes</span><span class="lesson-subtopics">required, readonly, disabled, min/max, pattern Regex, autocomplete, multiple</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/19-form-validation.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">19</span><div class="lesson-info"><span class="lesson-title">19. Form Validation</span><span class="lesson-subtopics">Native validation, novalidate, ValidityState API, checkValidity(), CSS :invalid</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 8 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🎬</span><div><div class="phase-roadmap-tag">Phase 08</div><h3 class="phase-roadmap-title">Audio, Video and Embeds</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/20-audio.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">20</span><div class="lesson-info"><span class="lesson-title">20. Audio</span><span class="lesson-subtopics">&lt;audio&gt;, controls, autoplay, loop, muted, &lt;source&gt; formats, Audio API</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/21-video.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">21</span><div class="lesson-info"><span class="lesson-title">21. Video</span><span class="lesson-subtopics">&lt;video&gt;, poster, &lt;source&gt; formats, &lt;track&gt; WebVTT subtitles, responsive aspect ratio</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/22-embedded-content.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">22</span><div class="lesson-info"><span class="lesson-title">22. Embedded Content</span><span class="lesson-subtopics">&lt;iframe&gt;, YouTube &amp; Maps embedding, title, loading="lazy", sandbox security</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 9 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🔍</span><div><div class="phase-roadmap-tag">Phase 09</div><h3 class="phase-roadmap-title">Metadata and SEO</h3></div></div>
          <span class="phase-roadmap-badge">2 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/23-head-metadata.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">23</span><div class="lesson-info"><span class="lesson-title">23. Head Metadata</span><span class="lesson-subtopics">&lt;title&gt;, charset, viewport, description, author, robots, theme-color, favicon, canonical, Open Graph</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/24-seo-friendly-html.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">24</span><div class="lesson-info"><span class="lesson-title">24. SEO-Friendly HTML</span><span class="lesson-subtopics">Semantic headings, Single H1 rule, meta description, anchor text, image alt SEO, breadcrumbs, sitemap</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 10 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">♿</span><div><div class="phase-roadmap-tag">Phase 10</div><h3 class="phase-roadmap-title">Accessibility and ARIA</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/25-accessibility-basics.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">25</span><div class="lesson-info"><span class="lesson-title">25. Accessibility Basics</span><span class="lesson-subtopics">Assistive tech, semantic HTML foundation, keyboard nav, screen readers, focus order, skip links</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/26-aria.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">26</span><div class="lesson-info"><span class="lesson-title">26. ARIA</span><span class="lesson-subtopics">ARIA roles, aria-label, aria-labelledby, aria-expanded, aria-hidden, aria-live, when NOT to use ARIA</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/27-accessibility-testing.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">27</span><div class="lesson-info"><span class="lesson-title">27. Accessibility Testing</span><span class="lesson-subtopics">Keyboard-only testing, screen reader audits, DevTools, color contrast ratios, Lighthouse audits</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 11 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">⚡</span><div><div class="phase-roadmap-tag">Phase 11</div><h3 class="phase-roadmap-title">HTML APIs and Browser Features</h3></div></div>
          <span class="phase-roadmap-badge">4 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/28-web-storage.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">28</span><div class="lesson-info"><span class="lesson-title">28. Web Storage</span><span class="lesson-subtopics">localStorage, sessionStorage, setItem(), getItem(), JSON serialization, storage events, security</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/29-data-attributes.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">29</span><div class="lesson-info"><span class="lesson-title">29. Data Attributes</span><span class="lesson-subtopics">data-* attributes, dataset API, storing IDs &amp; UI state, CSS attribute selectors</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/30-dialogs-interactive-elements.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">30</span><div class="lesson-info"><span class="lesson-title">30. Dialogs &amp; Interactive Elements</span><span class="lesson-subtopics">&lt;details&gt;, &lt;summary&gt;, &lt;dialog&gt;, showModal(), close(), &lt;meter&gt;, &lt;progress&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/31-web-workers.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">31</span><div class="lesson-info"><span class="lesson-title">31. Web Workers &amp; Offline Features</span><span class="lesson-subtopics">Web Workers multi-threading, postMessage(), Service Workers, Cache API, PWA manifest</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 12 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🧩</span><div><div class="phase-roadmap-tag">Phase 12</div><h3 class="phase-roadmap-title">Advanced HTML5</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/32-templates.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">32</span><div class="lesson-info"><span class="lesson-title">32. Templates &amp; Custom Elements</span><span class="lesson-subtopics">&lt;template&gt;, cloneNode(), Custom Elements lifecycle, Shadow DOM, &lt;slot&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/33-custom-elements.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">33</span><div class="lesson-info"><span class="lesson-title">33. Web Components</span><span class="lesson-subtopics">Custom Elements, Shadow DOM encapsulation, Templates, Slots, Web Components vs frameworks</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/34-internationalization.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">34</span><div class="lesson-info"><span class="lesson-title">34. Internationalization</span><span class="lesson-subtopics">lang attribute, dir="ltr"/"rtl", date/time markup, multi-language nav, Unicode UTF-8</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 13 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🚀</span><div><div class="phase-roadmap-tag">Phase 13</div><h3 class="phase-roadmap-title">Responsive and Production HTML</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-html/35-responsive-html.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">35</span><div class="lesson-info"><span class="lesson-title">35. Responsive HTML</span><span class="lesson-subtopics">Viewport meta, responsive images, mobile-first markup, responsive tables/forms, touch targets</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/36-html-performance.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">36</span><div class="lesson-info"><span class="lesson-title">36. HTML Performance</span><span class="lesson-subtopics">Minification, lazy loading, defer/async, preload/preconnect, reducing DOM size, Core Web Vitals</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-html/37-validation-debugging.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">37</span><div class="lesson-info"><span class="lesson-title">37. Validation &amp; Debugging</span><span class="lesson-subtopics">W3C Validation, DevTools Elements/Console, broken links, accessibility audit, production checklist</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

    </div>

    <!-- FAQ Section -->
    <div class="section-title" style="margin-top:40px;"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>

    <div class="faq-card">
      <h4><span style="background:rgba(249,115,22,0.15); color:#f97316; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> Can I create a website using only HTML?</h4>
      <p>Yes, HTML can construct a complete web page independently. However, without CSS it will appear as unstyled plain text, and without JavaScript it will lack dynamic interactivity.</p>
    </div>

    <div class="faq-card">
      <h4><span style="background:rgba(249,115,22,0.15); color:#f97316; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> What are Web Components in HTML5?</h4>
      <p>Web Components are a suite of native browser technologies (Custom Elements, Shadow DOM, HTML Templates) that allow developers to create custom, reusable HTML tags with encapsulated CSS styles without requiring frameworks like React or Vue.</p>
    </div>

    <div class="faq-card">
      <h4><span style="background:rgba(249,115,22,0.15); color:#f97316; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> What is the difference between script async and script defer?</h4>
      <p><code>async</code> downloads the script in background and executes it immediately upon download completion (interrupting HTML parsing). <code>defer</code> downloads the script in background but waits until HTML parsing is 100% complete before executing, preserving execution order.</p>
    </div>

    <div class="nav-footer">
      <a href="/blog-html.html" class="nav-btn"><span class="label">← HTML Overview</span><span class="title">Course Index</span></a>
      <a href="/blog-html/01-what-is-html5.html" class="nav-btn" style="text-align:right;"><span class="label">Start Course →</span><span class="title">1. What is HTML5?</span></a>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(targetFile, htmlContent, 'utf8');
console.log('✅ Generated public/blog-html.html master index page successfully!');
