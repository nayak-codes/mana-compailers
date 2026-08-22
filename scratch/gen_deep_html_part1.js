const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'blog-html');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSidebarHTML(activeNum) {
  return `
    <div class="sidebar-heading">HTML5 Complete Course</div>
    <a href="/blog-html.html" class="sidebar-home-link">🌐 HTML Course HOME</a>
    <div class="sidebar-accordion">
      <!-- Phase 01: Introduction -->
      <button class="accordion-header ${activeNum <= 2 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🚀</span>
          <div class="phase-info"><span class="phase-tag">Phase 01</span><span class="phase-title">HTML Introduction</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum <= 2 ? 'open' : ''}">
        <a href="/blog-html/01-what-is-html5.html" class="${activeNum === 1 ? 'active' : ''}">1. What is HTML5?</a>
        <a href="/blog-html/02-your-first-html-page.html" class="${activeNum === 2 ? 'active' : ''}">2. Your First HTML Page</a>
      </div>

      <!-- Phase 02: Syntax & Text -->
      <button class="accordion-header ${activeNum >= 3 && activeNum <= 6 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📝</span>
          <div class="phase-info"><span class="phase-tag">Phase 02</span><span class="phase-title">Syntax &amp; Text</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 3 && activeNum <= 6 ? 'open' : ''}">
        <a href="/blog-html/03-elements-tags-attributes.html" class="${activeNum === 3 ? 'active' : ''}">3. Elements, Tags &amp; Attributes</a>
        <a href="/blog-html/04-headings-paragraphs.html" class="${activeNum === 4 ? 'active' : ''}">4. Headings &amp; Paragraphs</a>
        <a href="/blog-html/05-text-formatting.html" class="${activeNum === 5 ? 'active' : ''}">5. Text Formatting</a>
        <a href="/blog-html/06-code-technical-text.html" class="${activeNum === 6 ? 'active' : ''}">6. Code &amp; Technical Text</a>
      </div>

      <!-- Phase 03: Links & Navigation -->
      <button class="accordion-header ${activeNum >= 7 && activeNum <= 8 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔗</span>
          <div class="phase-info"><span class="phase-tag">Phase 03</span><span class="phase-title">Links &amp; Navigation</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 7 && activeNum <= 8 ? 'open' : ''}">
        <a href="/blog-html/07-links.html" class="${activeNum === 7 ? 'active' : ''}">7. Links</a>
        <a href="/blog-html/08-navigation-menus.html" class="${activeNum === 8 ? 'active' : ''}">8. Navigation Menus</a>
      </div>

      <!-- Phase 04: Lists & Tables -->
      <button class="accordion-header ${activeNum >= 9 && activeNum <= 10 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📊</span>
          <div class="phase-info"><span class="phase-tag">Phase 04</span><span class="phase-title">Lists &amp; Tables</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 9 && activeNum <= 10 ? 'open' : ''}">
        <a href="/blog-html/09-lists.html" class="${activeNum === 9 ? 'active' : ''}">9. Lists</a>
        <a href="/blog-html/10-tables.html" class="${activeNum === 10 ? 'active' : ''}">10. Tables</a>
      </div>

      <!-- Phase 05: Images & Graphics -->
      <button class="accordion-header ${activeNum >= 11 && activeNum <= 13 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🖼️</span>
          <div class="phase-info"><span class="phase-tag">Phase 05</span><span class="phase-title">Images &amp; Graphics</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 11 && activeNum <= 13 ? 'open' : ''}">
        <a href="/blog-html/11-images.html" class="${activeNum === 11 ? 'active' : ''}">11. Images</a>
        <a href="/blog-html/12-responsive-images.html" class="${activeNum === 12 ? 'active' : ''}">12. Responsive Images</a>
        <a href="/blog-html/13-svg-canvas.html" class="${activeNum === 13 ? 'active' : ''}">13. SVG &amp; Canvas</a>
      </div>

      <!-- Phase 06: Semantic HTML5 -->
      <button class="accordion-header ${activeNum >= 14 && activeNum <= 15 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🏗️</span>
          <div class="phase-info"><span class="phase-tag">Phase 06</span><span class="phase-title">Semantic HTML5</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 14 && activeNum <= 15 ? 'open' : ''}">
        <a href="/blog-html/14-semantic-html5.html" class="${activeNum === 14 ? 'active' : ''}">14. Semantic HTML5</a>
        <a href="/blog-html/15-page-layout-structure.html" class="${activeNum === 15 ? 'active' : ''}">15. Page Layout Structure</a>
      </div>

      <!-- Phase 07: Forms -->
      <button class="accordion-header ${activeNum >= 16 && activeNum <= 19 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📋</span>
          <div class="phase-info"><span class="phase-tag">Phase 07</span><span class="phase-title">Forms &amp; Input Controls</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 16 && activeNum <= 19 ? 'open' : ''}">
        <a href="/blog-html/16-forms-basics.html" class="${activeNum === 16 ? 'active' : ''}">16. Forms Basics</a>
        <a href="/blog-html/17-input-types.html" class="${activeNum === 17 ? 'active' : ''}">17. Input Types</a>
        <a href="/blog-html/18-form-attributes.html" class="${activeNum === 18 ? 'active' : ''}">18. Form Attributes</a>
        <a href="/blog-html/19-form-validation.html" class="${activeNum === 19 ? 'active' : ''}">19. Form Validation</a>
      </div>

      <!-- Phase 08: Audio, Video & Embeds -->
      <button class="accordion-header ${activeNum >= 20 && activeNum <= 22 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🎬</span>
          <div class="phase-info"><span class="phase-tag">Phase 08</span><span class="phase-title">Audio, Video &amp; Embeds</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 20 && activeNum <= 22 ? 'open' : ''}">
        <a href="/blog-html/20-audio.html" class="${activeNum === 20 ? 'active' : ''}">20. Audio</a>
        <a href="/blog-html/21-video.html" class="${activeNum === 21 ? 'active' : ''}">21. Video</a>
        <a href="/blog-html/22-embedded-content.html" class="${activeNum === 22 ? 'active' : ''}">22. Embedded Content</a>
      </div>

      <!-- Phase 09: Metadata & SEO -->
      <button class="accordion-header ${activeNum >= 23 && activeNum <= 24 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔍</span>
          <div class="phase-info"><span class="phase-tag">Phase 09</span><span class="phase-title">Metadata &amp; SEO</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 23 && activeNum <= 24 ? 'open' : ''}">
        <a href="/blog-html/23-head-metadata.html" class="${activeNum === 23 ? 'active' : ''}">23. Head Metadata</a>
        <a href="/blog-html/24-seo-friendly-html.html" class="${activeNum === 24 ? 'active' : ''}">24. SEO-Friendly HTML</a>
      </div>

      <!-- Phase 10: Accessibility -->
      <button class="accordion-header ${activeNum >= 25 && activeNum <= 27 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">♿</span>
          <div class="phase-info"><span class="phase-tag">Phase 10</span><span class="phase-title">Accessibility &amp; ARIA</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 25 && activeNum <= 27 ? 'open' : ''}">
        <a href="/blog-html/25-accessibility-basics.html" class="${activeNum === 25 ? 'active' : ''}">25. Accessibility Basics</a>
        <a href="/blog-html/26-aria.html" class="${activeNum === 26 ? 'active' : ''}">26. ARIA</a>
        <a href="/blog-html/27-accessibility-testing.html" class="${activeNum === 27 ? 'active' : ''}">27. Accessibility Testing</a>
      </div>

      <!-- Phase 11: HTML APIs & Features -->
      <button class="accordion-header ${activeNum >= 28 && activeNum <= 31 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚡</span>
          <div class="phase-info"><span class="phase-tag">Phase 11</span><span class="phase-title">HTML APIs &amp; Features</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 28 && activeNum <= 31 ? 'open' : ''}">
        <a href="/blog-html/28-web-storage.html" class="${activeNum === 28 ? 'active' : ''}">28. Web Storage</a>
        <a href="/blog-html/29-data-attributes.html" class="${activeNum === 29 ? 'active' : ''}">29. Data Attributes</a>
        <a href="/blog-html/30-dialogs-interactive-elements.html" class="${activeNum === 30 ? 'active' : ''}">30. Dialogs &amp; Interactive Elements</a>
        <a href="/blog-html/31-web-workers.html" class="${activeNum === 31 ? 'active' : ''}">31. Web Workers</a>
      </div>

      <!-- Phase 12: Advanced HTML5 -->
      <button class="accordion-header ${activeNum >= 32 && activeNum <= 34 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🧩</span>
          <div class="phase-info"><span class="phase-tag">Phase 12</span><span class="phase-title">Advanced HTML5</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 32 && activeNum <= 34 ? 'open' : ''}">
        <a href="/blog-html/32-templates.html" class="${activeNum === 32 ? 'active' : ''}">32. Templates</a>
        <a href="/blog-html/33-custom-elements.html" class="${activeNum === 33 ? 'active' : ''}">33. Custom Elements &amp; Web Components</a>
        <a href="/blog-html/34-internationalization.html" class="${activeNum === 34 ? 'active' : ''}">34. Internationalization</a>
      </div>

      <!-- Phase 13: Responsive & Production -->
      <button class="accordion-header ${activeNum >= 35 && activeNum <= 37 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🚀</span>
          <div class="phase-info"><span class="phase-tag">Phase 13</span><span class="phase-title">Responsive &amp; Production</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 35 && activeNum <= 37 ? 'open' : ''}">
        <a href="/blog-html/35-responsive-html.html" class="${activeNum === 35 ? 'active' : ''}">35. Responsive HTML</a>
        <a href="/blog-html/36-html-performance.html" class="${activeNum === 36 ? 'active' : ''}">36. HTML Performance</a>
        <a href="/blog-html/37-validation-debugging.html" class="${activeNum === 37 ? 'active' : ''}">37. Validation &amp; Debugging</a>
      </div>
    </div>`;
}

function makePage(chNum, filename, pageTitle, metaDesc, phaseTag, phaseTitle, coveredText, bodyContent, prevLink, prevTitle, nextLink, nextTitle) {
  const escapedTitle = escapeHTML(pageTitle);
  const escapedMetaDesc = escapeHTML(metaDesc);
  const escapedCovered = escapeHTML(coveredText);
  const escapedPhaseTitle = escapeHTML(phaseTitle);
  const escapedPrevTitle = escapeHTML(prevTitle);
  const escapedNextTitle = escapeHTML(nextTitle);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapedTitle} — HTML5 Masterclass | Our Compiler</title>
  <meta name="description" content="${escapedMetaDesc}" />
  <meta name="keywords" content="html tutorial, learn html5, html tags, html elements, html web development" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-html/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
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

        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;

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
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_html', rawCode);
              window.location.href = '/online-html-editor.html';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl) {
            const rawCode = codeEl.textContent;
            if (runBtn) {
              runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('code_html', rawCode);
                window.location.href = '/online-html-editor.html';
              });
            }
          }
        });
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
  <aside class="sidebar">
    ${getSidebarHTML(chNum)}
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-html.html">HTML</a><span class="sep">›</span>
      <span class="current">Chapter ${chNum}: ${escapedTitle}</span>
    </div>

    <h1 class="page-title">${escapedTitle}</h1>

    <div class="page-meta">
      <span class="badge">🌐 HTML5</span>
      <span class="badge">🟢 Chapter ${chNum} of 37</span>
      <span class="badge">📂 ${phaseTag}: ${escapedPhaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this chapter:</span>
      <span class="topic-pill-text">${escapedCovered}</span>
    </div>

    ${bodyContent}

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy &amp; tested on HTML5 Standards · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevLink ? `<a href="${prevLink}" class="nav-btn"><span class="label">← Previous Chapter</span><span class="title">${escapedPrevTitle}</span></a>` : `<a href="/blog-html.html" class="nav-btn"><span class="label">← HTML Overview</span><span class="title">Course Index</span></a>`}
      ${nextLink ? `<a href="${nextLink}" class="nav-btn" style="text-align:right;"><span class="label">Next Chapter →</span><span class="title">${escapedNextTitle}</span></a>` : `<a href="/blog-html.html" class="nav-btn" style="text-align:right;"><span class="label">Course Overview 🏁</span><span class="title">HTML Overview</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, filename), fullHtml, 'utf8');
  console.log(`  ✅ Generated ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

console.log('🚀 Generating SUPER DEEP HTML5 Masterclass Chapters 1 to 10...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 01: What is HTML5?
// ═══════════════════════════════════════════════════════════════════════════════
makePage(1, '01-what-is-html5.html',
  'What is HTML5?',
  'Complete HTML5 Chapter 1: Deep guide on HTML full form, HTML vs CSS vs JavaScript comparison, webpage role, browser DOM parsing pipeline, elements vs tags vs attributes, and HTML5 features.',
  'Phase 01', 'HTML Introduction',
  'HTML Definition · Full Form · Web Trio Comparison · DOM Parsing Tree · Elements vs Tags · Attributes · HTML5 Features · W3C & WHATWG Standards',
  `<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 1): What is HTML5?</strong> HTML (HyperText Markup Language) is the core standard markup language used across the world to structure and present content on the World Wide Web. In this comprehensive chapter, we explore HTML's full history, the Web Trio architecture (HTML, CSS, JavaScript), how web browsers parse raw HTML into the Document Object Model (DOM), the structural hierarchy of elements, tags, and attributes, and modern HTML5 capabilities.
</div>

<div class="section-title"><span class="num">1</span>HTML Definition &amp; The Web Trio Architecture</div>
<div class="section-body">
  <p>Every website you visit is constructed using three core front-end technologies: <strong>HTML</strong> for structural content, <strong>CSS</strong> for visual design and layout styling, and <strong>JavaScript</strong> for dynamic behavior and application logic.</p>

  <table class="tbl spec-table">
    <thead><tr><th>Technology</th><th>Full Form</th><th>Primary Responsibility</th><th>Human Body Analogy</th></tr></thead>
    <tbody>
      <tr><td><strong>HTML</strong></td><td>HyperText Markup Language</td><td>Provides semantic structure, headings, text paragraphs, links, images, tables, and form inputs.</td><td>Skeleton (Bones &amp; Frame)</td></tr>
      <tr><td><strong>CSS</strong></td><td>Cascading Style Sheets</td><td>Controls colors, fonts, spatial positioning (Flexbox/Grid), responsive design, and transitions.</td><td>Skin, Apparel &amp; Style</td></tr>
      <tr><td><strong>JavaScript</strong></td><td>JavaScript Engine (ECMAScript)</td><td>Handles DOM manipulation, user click events, API data fetching (Fetch/AJAX), and state management.</td><td>Muscles &amp; Brain Actions</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — The Web Trio Integration Example</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Web Trio Integration Example&lt;/title&gt;
  &lt;style&gt;
    /* CSS: Visual Styling */
    .card { background: #141922; border: 1px solid #f97316; padding: 20px; border-radius: 8px; color: #ffffff; font-family: sans-serif; }
    button { background: #f97316; color: #fff; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- HTML: Semantic Structure --&gt;
  &lt;div class="card"&gt;
    &lt;h1&gt;Interactive HTML5 Card&lt;/h1&gt;
    &lt;p id="status"&gt;HTML structures this text box.&lt;/p&gt;
    &lt;button id="btn"&gt;Click Me&lt;/button&gt;
  &lt;/div&gt;

  &lt;script&gt;
    // JavaScript: Dynamic Behavior
    document.getElementById('btn').addEventListener('click', () => {
      document.getElementById('status').textContent = 'JavaScript updated this text dynamically!';
    });
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>How Web Browsers Process HTML (DOM Parsing)</div>
<div class="section-body">
  <p>When a web browser (like Chrome, Firefox, or Edge) requests a web page over HTTP/HTTPS, the web server returns raw bytes of HTML text. The browser executes a step-by-step parsing pipeline to transform text bytes into visual pixels on your monitor:</p>
  
  <ol class="spec-list">
    <li><strong>Bytes to Characters:</strong> The browser reads raw binary bytes (e.g. <code>3C 68 74 6D 6C 3E</code>) and converts them to text characters based on the specified character encoding (UTF-8).</li>
    <li><strong>Tokens to Nodes:</strong> The parser converts text characters into distinct HTML tokens (e.g. <code>StartTag: html</code>, <code>StartTag: body</code>, <code>EndTag: body</code>).</li>
    <li><strong>Nodes to DOM Tree:</strong> Tokens are turned into Objects (DOM Nodes) with defined parent-child relationships, building the <strong>DOM (Document Object Model) Tree</strong>.</li>
    <li><strong>Render Tree Construction &amp; Painting:</strong> The browser combines the DOM Tree with CSSOM (CSS Object Model) to compute layouts and paint final pixels on the screen.</li>
  </ol>
</div>

<div class="section-title"><span class="num">3</span>Elements vs Tags vs Attributes</div>
<div class="section-body">
  <p>Beginners often confuse tags, elements, and attributes. Here is the precise distinction:</p>
  <ul>
    <li><strong>Tag:</strong> The bracketed syntax used to delimit an element (e.g., <code>&lt;p&gt;</code> is the start tag, and <code>&lt;/p&gt;</code> is the end tag).</li>
    <li><strong>Element:</strong> The complete unit comprising the start tag, any attributes, inner content, and the end tag (e.g., <code>&lt;p class="text"&gt;Hello World&lt;/p&gt;</code>).</li>
    <li><strong>Attribute:</strong> Key-value modifier specified inside the opening tag providing extra properties (e.g., <code>class="text"</code> or <code>id="main"</code>).</li>
  </ul>
</div>

<div class="section-title"><span class="num">4</span>Modern HTML5 Features &amp; Standards</div>
<div class="section-body">
  <p>HTML5 is the latest major revision of the HTML standard maintained by the <strong>WHATWG (Web Hypertext Application Technology Working Group)</strong>. Key innovations introduced in HTML5 include:</p>
  <ul>
    <li><strong>Semantic Elements:</strong> Native structural tags like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code>.</li>
    <li><strong>Native Multimedia:</strong> Native <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> controls without needing Adobe Flash.</li>
    <li><strong>Graphics &amp; Canvas:</strong> Vector graphics with inline <code>&lt;svg&gt;</code> and 2D/3D hardware-accelerated drawing via <code>&lt;canvas&gt;</code>.</li>
    <li><strong>Advanced Web APIs:</strong> Web Storage (<code>localStorage</code>), Geolocation, Web Workers, and Web Components.</li>
  </ul>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Is HTML a programming language?</h4>
    <p>No. HTML is a <strong>markup language</strong>. It uses tags to annotate text and structure layout. It does not possess programming logic structures such as conditional branches, loops, or memory variable declarations (which are provided by JavaScript).</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What happens if I write invalid HTML code with missing closing tags?</h4>
    <p>Modern web browsers feature forgiving HTML parsers. If tags are left unclosed, the browser uses auto-closing algorithms to guess the missing tags, but this can cause subtle visual layout bugs or accessibility breaks.</p>
  </div>
</div>`,
  null, null,
  '02-your-first-html-page.html', '2. Your First HTML Page'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 02: Your First HTML Page
// ═══════════════════════════════════════════════════════════════════════════════
makePage(2, '02-your-first-html-page.html',
  'Your First HTML Page',
  'Complete HTML5 Chapter 2: Detailed guide to building your first .html file, <!DOCTYPE html>, <html>, <head>, <body>, <title>, <meta charset>, opening in browser, Live Server, comments, indentation, and W3C validation.',
  'Phase 01', 'HTML Introduction',
  'Creating .html File · <!DOCTYPE html> · <html> · <head> · <body> · <title> · <meta charset> · Live Server Setup · Comments & Indentation · W3C Markup Validation',
  `<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 2): Your First HTML Page</strong>! In this hands-on lesson, we construct a complete, valid HTML5 page from scratch. We break down every line of the standard HTML5 document boilerplate, explore file naming conventions, set up local development tools (VS Code &amp; Live Server), write clean comments and indentation, and validate code against W3C standards.
</div>

<div class="section-title"><span class="num">1</span>Creating an .html File &amp; File Naming Rules</div>
<div class="section-body">
  <p>To create an HTML document, create a plain text file ending with the <code>.html</code> extension (for example, <code>index.html</code>). Observe these production file naming conventions:</p>
  <ul>
    <li><strong>Use lowercase letters only:</strong> Use <code>about.html</code> instead of <code>About.html</code> (Linux web servers are case-sensitive).</li>
    <li><strong>Avoid spaces:</strong> Use hyphens instead of spaces (e.g., <code>contact-us.html</code> instead of <code>contact us.html</code>).</li>
    <li><strong>Default Home Page:</strong> Web servers automatically serve <code>index.html</code> as the home page when navigating to a directory root (e.g., <code>example.com/</code>).</li>
  </ul>
</div>

<div class="section-title"><span class="num">2</span>Line-by-Line Standard HTML5 Boilerplate Breakdown</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Production HTML5 Boilerplate</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My First HTML5 Webpage&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;!-- Main Page Content Begins Here --&gt;
  &lt;h1&gt;Welcome to My First Webpage&lt;/h1&gt;
  &lt;p&gt;This document is built using standard HTML5 markup.&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>

  <table class="tbl spec-table">
    <thead><tr><th>Tag / Line</th><th>Technical Purpose</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;!DOCTYPE html&gt;</code></td><td>Informs browser to render document using standard HTML5 mode (prevents legacy Quirks Mode).</td></tr>
      <tr><td><code>&lt;html lang="en"&gt;</code></td><td>Root element enclosing all page markup. <code>lang="en"</code> tells screen readers &amp; translation engines the primary language.</td></tr>
      <tr><td><code>&lt;head&gt;</code></td><td>Container for machine-readable document metadata (title, character encoding, CSS links, scripts) not rendered on screen.</td></tr>
      <tr><td><code>&lt;meta charset="UTF-8"&gt;</code></td><td>Sets character set encoding to UTF-8, covering all global Unicode characters and symbols.</td></tr>
      <tr><td><code>&lt;meta name="viewport"&gt;</code></td><td>Configures mobile viewport width and initial zoom scaling for responsive mobile screens.</td></tr>
      <tr><td><code>&lt;title&gt;</code></td><td>Defines document title displayed in the browser tab and search engine results.</td></tr>
      <tr><td><code>&lt;body&gt;</code></td><td>Container for all visible content rendered inside the browser window (headings, text, images, forms).</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>Opening Files in Browser &amp; Live Server Setup</div>
<div class="section-body">
  <p>To view your HTML page locally:</p>
  <ol class="spec-list">
    <li><strong>Direct File Opening:</strong> Double-click your <code>index.html</code> file to open it in your web browser (address bar will display <code>file:///C:/.../index.html</code>).</li>
    <li><strong>Live Server Extension (Recommended):</strong> In VS Code, install the <strong>Live Server</strong> extension and click <em>"Go Live"</em>. Live Server launches a local web server (e.g. <code>http://127.0.0.1:5500/index.html</code>) that automatically refreshes your browser instantly whenever you save changes.</li>
  </ol>
</div>

<div class="section-title"><span class="num">4</span>HTML Comments, Indentation &amp; W3C Validation</div>
<div class="section-body">
  <p><strong>Comments:</strong> Use <code>&lt;!-- comment text --&gt;</code> to insert notes in your code. Comments are ignored by browsers and not rendered on screen.</p>
  <p><strong>Indentation:</strong> Indent child elements by 2 spaces inside parent elements to maintain clean code readability.</p>
  <p><strong>W3C Validation:</strong> Test your HTML code at the official <a href="https://validator.w3.org" target="_blank" rel="noopener">W3C Markup Validation Service</a> to ensure zero syntax errors or unclosed tags.</p>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What happens if I omit &lt;!DOCTYPE html&gt; from line 1?</h4>
    <p>Browsers enter "Quirks Mode", emulating bugs from 1990s legacy browsers (IE6). CSS box model calculations and layout alignment will break unexpectedly.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Are HTML tag names case-sensitive?</h4>
    <p>No, HTML tags are case-insensitive (e.g. <code>&lt;BODY&gt;</code> works), but W3C standards and professional industry conventions mandate <strong>lowercase tag names</strong>.</p>
  </div>
</div>`,
  '01-what-is-html5.html', '1. What is HTML5?',
  '03-elements-tags-attributes.html', '3. Elements, Tags & Attributes'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 03: Elements, Tags & Attributes
// ═══════════════════════════════════════════════════════════════════════════════
makePage(3, '03-elements-tags-attributes.html',
  'Elements, Tags & Attributes',
  'Complete HTML5 Chapter 3: Deep exploration of opening and closing tags, nested parent/child relationships, void self-closing elements, attributes, boolean attributes, and global attributes (id, class, style, title, hidden).',
  'Phase 02', 'Syntax & Text',
  'Opening/Closing Tags · Nested Elements · Void (Self-Closing) Elements · Attribute Syntax · Boolean Attributes · Universal Global Attributes (id, class, style)',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 3): Elements, Tags &amp; Attributes</strong>! In this lesson, we dissect HTML building blocks: opening and closing tags, nested element hierarchies, void (self-closing) elements, attribute key-value formatting, boolean flags, and universal global attributes used across all HTML tags.
</div>

<div class="section-title"><span class="num">1</span>HTML Element Anatomy</div>
<div class="section-body">
  <p>An HTML element is formed by an opening tag, attributes, inner content, and a closing tag:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Element Structure Anatomy</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- 
  Opening Tag:  &lt;p class="intro" id="first-para"&gt;
  Attributes:   class="intro", id="first-para"
  Inner Text:   Welcome to HTML5 Masterclass
  Closing Tag:  &lt;/p&gt;
--&gt;
&lt;p class="intro" id="first-para"&gt;Welcome to HTML5 Masterclass&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Void (Self-Closing) Elements</div>
<div class="section-body">
  <p>Most HTML elements contain text or nested child nodes. However, <strong>Void Elements</strong> cannot contain inner text or child nodes, and therefore <strong>do not have closing tags</strong>:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Void Tag</th><th>Function</th><th>Example Syntax</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;img&gt;</code></td><td>Embeds an image graphic.</td><td><code>&lt;img src="logo.png" alt="Logo"&gt;</code></td></tr>
      <tr><td><code>&lt;input&gt;</code></td><td>Renders an interactive form input control.</td><td><code>&lt;input type="text" name="user"&gt;</code></td></tr>
      <tr><td><code>&lt;br&gt;</code></td><td>Inserts a visual line break inside text.</td><td><code>Line 1&lt;br&gt;Line 2</code></td></tr>
      <tr><td><code>&lt;hr&gt;</code></td><td>Inserts a thematic horizontal rule divider.</td><td><code>&lt;hr&gt;</code></td></tr>
      <tr><td><code>&lt;meta&gt;</code></td><td>Defines document metadata.</td><td><code>&lt;meta charset="UTF-8"&gt;</code></td></tr>
      <tr><td><code>&lt;link&gt;</code></td><td>Links external CSS stylesheets or icons.</td><td><code>&lt;link rel="stylesheet" href="style.css"&gt;</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>Standard &amp; Boolean Attributes</div>
<div class="section-body">
  <p><strong>Standard Attributes:</strong> Key-value pairs written as <code>name="value"</code> (e.g. <code>href="https://example.com"</code> or <code>type="password"</code>).</p>
  <p><strong>Boolean Attributes:</strong> Attributes whose presence implies a <code>true</code> value. You do not need to specify <code>attribute="true"</code>:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Boolean Attributes Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Correct Boolean Attribute Examples --&gt;
&lt;input type="text" required disabled&gt;
&lt;option value="in" selected&gt;India&lt;/option&gt;
&lt;audio controls autoplay muted&gt;&lt;/audio&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Universal Global Attributes Reference</div>
<div class="section-body">
  <p>Global attributes can be applied to <strong>ANY valid HTML5 element</strong>:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Global Attribute</th><th>Purpose</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>id</code></td><td>Unique identifier for single element targeted by CSS or JS.</td><td><code>id="header"</code></td></tr>
      <tr><td><code>class</code></td><td>Space-separated list of CSS styling classes.</td><td><code>class="btn primary"</code></td></tr>
      <tr><td><code>style</code></td><td>Inline CSS style rules.</td><td><code>style="color: red;"</code></td></tr>
      <tr><td><code>title</code></td><td>Advisory tooltip text shown on mouse hover.</td><td><code>title="Click to submit"</code></td></tr>
      <tr><td><code>hidden</code></td><td>Hides element from visual display and screen readers.</td><td><code>hidden</code></td></tr>
      <tr><td><code>tabindex</code></td><td>Controls keyboard focus tab order.</td><td><code>tabindex="0"</code></td></tr>
      <tr><td><code>lang</code></td><td>Sets element content language.</td><td><code>lang="en"</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Can I reuse the same id attribute on multiple elements?</h4>
    <p>No! An <code>id</code> must be unique within a single HTML document. If you need to target multiple elements with the same styles or JS, use <code>class</code> attributes instead.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Should I write trailing slashes on void tags like &lt;img /&gt;?</h4>
    <p>In HTML5, trailing slashes like <code>&lt;img /&gt;</code> are optional and ignored by browser parsers. Writing clean <code>&lt;img&gt;</code> is standard HTML5 convention.</p>
  </div>
</div>`,
  '02-your-first-html-page.html', '2. Your First HTML Page',
  '04-headings-paragraphs.html', '4. Headings & Paragraphs'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 04: Headings & Paragraphs
// ═══════════════════════════════════════════════════════════════════════════════
makePage(4, '04-headings-paragraphs.html',
  'Headings & Paragraphs',
  'Complete HTML5 Chapter 4: Deep guide to heading hierarchy h1 to h6, paragraph p, line breaks br, horizontal rules hr, alignment, and document outline rules.',
  'Phase 02', 'Syntax & Text',
  'Headings <h1> through <h6> · Paragraph <p> · Line Breaks <br> · Horizontal Rule <hr> · Document Outline Hierarchy · White Space Collapse',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 4): Headings &amp; Paragraphs</strong>! Headings and paragraphs form the structural backbone of written web content. In this chapter, we explore heading hierarchy (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>), paragraph text blocks (<code>&lt;p&gt;</code>), line breaks (<code>&lt;br&gt;</code>), horizontal rules (<code>&lt;hr&gt;</code>), white space collapsing, and document outline SEO best practices.
</div>

<div class="section-title"><span class="num">1</span>Heading Hierarchy (&lt;h1&gt; to &lt;h6&gt;)</div>
<div class="section-body">
  <p>HTML provides 6 levels of headings. <code>&lt;h1&gt;</code> represents the most important top-level page heading, while <code>&lt;h6&gt;</code> is the lowest sub-heading:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Headings Hierarchy</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;h1&gt;Heading 1 — Main Page Title&lt;/h1&gt;
&lt;h2&gt;Heading 2 — Major Section Title&lt;/h2&gt;
&lt;h3&gt;Heading 3 — Subsection Title&lt;/h3&gt;
&lt;h4&gt;Heading 4 — Sub-subsection Title&lt;/h4&gt;
&lt;h5&gt;Heading 5 — Minor Header&lt;/h5&gt;
&lt;h6&gt;Heading 6 — Lowest Level Header&lt;/h6&gt;</code></pre>
  </div>

  <div class="callout">
    <div class="callout-title">📌 Heading SEO Best Practices</div>
    <ul>
      <li><strong>Use exactly one &lt;h1&gt; per page:</strong> Reserve <code>&lt;h1&gt;</code> for the main title of your webpage.</li>
      <li><strong>Do not skip levels:</strong> Do not jump from <code>&lt;h2&gt;</code> directly to <code>&lt;h4&gt;</code>. Maintain sequential nesting.</li>
      <li><strong>Do not use headings for text sizing:</strong> Use headings for structural meaning, not to make text big or bold. Use CSS for visual styling!</li>
    </ul>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Paragraphs (&lt;p&gt;) &amp; White Space Collapsing</div>
<div class="section-body">
  <p>Paragraphs are defined using the <code>&lt;p&gt;</code> tag. Browsers automatically add vertical margin before and after every paragraph block.</p>
  <p><strong>White Space Collapsing:</strong> HTML browsers automatically collapse multiple consecutive spaces, tabs, and line breaks into a single space character:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — White Space Collapse Example</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Browser renders this with single space between words --&gt;
&lt;p&gt;
  This text has       multiple spaces
  and multi-line       breaks in code.
&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Line Breaks (&lt;br&gt;) &amp; Horizontal Rules (&lt;hr&gt;)</div>
<div class="section-body">
  <p><strong>Line Break (<code>&lt;br&gt;</code>):</strong> Forces a line break within a paragraph without starting a new paragraph block (e.g. addresses or poetry lines).</p>
  <p><strong>Horizontal Rule (<code>&lt;hr&gt;</code>):</strong> Represents a thematic break or transition between topics, rendered as a horizontal divider line.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Line Breaks &amp; Horizontal Rules</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;p&gt;
  Our Compiler HQ&lt;br&gt;
  123 Tech Park Avenue&lt;br&gt;
  San Francisco, CA
&lt;/p&gt;

&lt;hr&gt;

&lt;p&gt;Next topic begins after the horizontal rule above.&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Should I use &lt;br&gt; tags to create vertical space between paragraphs?</h4>
    <p>No! Do not stack multiple <code>&lt;br&gt;&lt;br&gt;&lt;br&gt;</code> tags to create layout spacing. Use CSS margins and padding for layout spacing instead.</p>
  </div>
</div>`,
  '03-elements-tags-attributes.html', '3. Elements, Tags & Attributes',
  '05-text-formatting.html', '5. Text Formatting'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 05: Text Formatting
// ═══════════════════════════════════════════════════════════════════════════════
makePage(5, '05-text-formatting.html',
  'Text Formatting',
  'Complete HTML5 Chapter 5: Deep exploration of text formatting tags <strong> vs <b>, <em> vs <i>, <mark>, <sub>, <sup>, <blockquote>, <q>, <abbr>, and <time>.',
  'Phase 02', 'Syntax & Text',
  '<strong> vs <b> · <em> vs <i> · <mark> Highlight · <sub> & <sup> · <blockquote> & <q> · <abbr> Abbreviations · <time> Date Formatting',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 5): Text Formatting</strong>! HTML provides rich semantic text formatting tags to highlight important terms, emphasize phrases, annotate abbreviations, format quotations, and represent mathematical subscripts or dates. In this chapter, we master semantic vs visual formatting.
</div>

<div class="section-title"><span class="num">1</span>Semantic Emphasis (&lt;strong&gt; &amp; &lt;em&gt;) vs Visual (&lt;b&gt; &amp; &lt;i&gt;)</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Semantic Tag</th><th>Visual Equivalent</th><th>Semantic Meaning &amp; Screen Reader Effect</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;strong&gt;</code></td><td><code>&lt;b&gt;</code></td><td>Indicates strong importance or urgency. Screen readers read with heightened inflection.</td></tr>
      <tr><td><code>&lt;em&gt;</code></td><td><code>&lt;i&gt;</code></td><td>Indicates stress emphasis on a word altering sentence meaning. Read with verbal emphasis.</td></tr>
      <tr><td><code>&lt;mark&gt;</code></td><td>—</td><td>Highlights text relevant to user's current context (like search match highlights).</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Emphasis &amp; Highlight Showcase</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;p&gt;Warning: Do &lt;strong&gt;NOT&lt;/strong&gt; share your password!&lt;/p&gt;
&lt;p&gt;I &lt;em&gt;really&lt;/em&gt; love coding in HTML5.&lt;/p&gt;
&lt;p&gt;Search results for &lt;mark&gt;HTML5 Masterclass&lt;/mark&gt;:&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Subscripts (&lt;sub&gt;), Superscripts (&lt;sup&gt;) &amp; Small Text (&lt;small&gt;)</div>
<div class="section-body">
  <p><strong>Subscript (<code>&lt;sub&gt;</code>):</strong> Renders smaller text below baseline (used for chemical formulas like H<sub>2</sub>O).</p>
  <p><strong>Superscript (<code>&lt;sup&gt;</code>):</strong> Renders smaller text above baseline (used for mathematical exponents like E = mc<sup>2</sup> or ordinal numbers like 1<sup>st</sup>).</p>
  <p><strong>Small (<code>&lt;small&gt;</code>):</strong> Renders fine print like copyright notices or disclaimers.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Subscripts &amp; Superscripts</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;p&gt;Chemical Formula of Water: H&lt;sub&gt;2&lt;/sub&gt;O&lt;/p&gt;
&lt;p&gt;Einstein's Mass-Energy Equivalence: E = mc&lt;sup&gt;2&lt;/sup&gt;&lt;/p&gt;
&lt;p&gt;&lt;small&gt;&amp;copy; 2026 Our Compiler. All rights reserved.&lt;/small&gt;&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Quotations (&lt;blockquote&gt; &amp; &lt;q&gt;), Abbreviations (&lt;abbr&gt;) &amp; Time (&lt;time&gt;)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Quotations, Abbr &amp; Time</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Block Quote for Multi-line Quotes --&gt;
&lt;blockquote cite="https://www.w3.org"&gt;
  "The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."
&lt;/blockquote&gt;

&lt;!-- Inline Quote --&gt;
&lt;p&gt;Tim Berners-Lee said &lt;q&gt;The Web is for everyone.&lt;/q&gt;&lt;/p&gt;

&lt;!-- Abbreviation with Hover Tooltip --&gt;
&lt;p&gt;Learn &lt;abbr title="HyperText Markup Language"&gt;HTML&lt;/abbr&gt; today.&lt;/p&gt;

&lt;!-- Machine-Readable Time --&gt;
&lt;p&gt;Published on &lt;time datetime="2026-08-20"&gt;August 20, 2026&lt;/time&gt;.&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is the datetime attribute important on &lt;time&gt; tags?</h4>
    <p>The <code>datetime="2026-08-20"</code> attribute provides ISO standard machine-readable format for search engines, calendar apps, and web crawlers, regardless of how the date is formatted visually.</p>
  </div>
</div>`,
  '04-headings-paragraphs.html', '4. Headings & Paragraphs',
  '06-code-technical-text.html', '6. Code & Technical Text'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 06: Code & Technical Text
// ═══════════════════════════════════════════════════════════════════════════════
makePage(6, '06-code-technical-text.html',
  'Code & Technical Text',
  'Complete HTML5 Chapter 6: Deep exploration of inline code <code>, preformatted blocks <pre><code>, keyboard input <kbd>, sample output <samp>, variables <var>, and HTML entity escaping.',
  'Phase 02', 'Syntax & Text',
  'Inline Code <code> · Multi-line <pre><code> · Keyboard Shortcuts <kbd> · Terminal Output <samp> · Mathematical Variables <var> · HTML Character Entity Escaping (&lt;, &gt;, &amp;, &quot;, &#39;)',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 6): Code &amp; Technical Text</strong>! When creating developer documentation, programming tutorials, or tech blogs, you must display code snippets, terminal commands, keyboard shortcuts, and mathematical variables accurately. In this chapter, we master <code>&lt;code&gt;</code>, <code>&lt;pre&gt;</code>, <code>&lt;kbd&gt;</code>, <code>&lt;samp&gt;</code>, <code>&lt;var&gt;</code>, and escaping HTML entities.
</div>

<div class="section-title"><span class="num">1</span>Inline Code (&lt;code&gt;) vs Multi-line Preformatted Code (&lt;pre&gt;&lt;code&gt;)</div>
<div class="section-body">
  <p><strong>Inline Code (<code>&lt;code&gt;</code>):</strong> Used to highlight single code keywords, function names, or file paths within a regular text paragraph.</p>
  <p><strong>Preformatted Block (<code>&lt;pre&gt;&lt;code&gt;</code>):</strong> The <code>&lt;pre&gt;</code> tag preserves exact spaces, tabs, and line breaks. Combining <code>&lt;pre&gt;</code> with <code>&lt;code&gt;</code> displays multi-line source code cleanly in monospace font.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Code &amp; Preformatted Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;p&gt;Use the &lt;code&gt;console.log()&lt;/code&gt; method in JavaScript to print output.&lt;/p&gt;

&lt;!-- Multi-line Code Block --&gt;
&lt;pre&gt;&lt;code&gt;function calculateSum(a, b) {
  // Returns sum of two numbers
  return a + b;
}&lt;/code&gt;&lt;/pre&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Keyboard Shortcuts (&lt;kbd&gt;), Terminal Output (&lt;samp&gt;) &amp; Variables (&lt;var&gt;)</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Tag</th><th>Purpose</th><th>Example Rendered Syntax</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;kbd&gt;</code></td><td>Represents keyboard key combinations pressed by user.</td><td><code>Press &lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;C&lt;/kbd&gt;</code></td></tr>
      <tr><td><code>&lt;samp&gt;</code></td><td>Represents sample output from a computer program or terminal command.</td><td><code>&lt;samp&gt;Error 404: Not Found&lt;/samp&gt;</code></td></tr>
      <tr><td><code>&lt;var&gt;</code></td><td>Represents a mathematical variable or program variable.</td><td><code>&lt;var&gt;x&lt;/var&gt; = &lt;var&gt;y&lt;/var&gt; + 2</code></td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — kbd, samp &amp; var Showcase</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;p&gt;To save your file in VS Code, press &lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;S&lt;/kbd&gt;.&lt;/p&gt;
&lt;p&gt;Terminal Output: &lt;samp&gt;Build Succeeded in 1.4s&lt;/samp&gt;&lt;/p&gt;
&lt;p&gt;Area of triangle: &lt;var&gt;A&lt;/var&gt; = ½ &amp;times; &lt;var&gt;b&lt;/var&gt; &amp;times; &lt;var&gt;h&lt;/var&gt;&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>HTML Character Entity Escaping Reference Table</div>
<div class="section-body">
  <p>In HTML, characters like <code>&lt;</code> and <code>&gt;</code> are reserved for opening and closing tags. If you want to display literal brackets on screen inside code examples, you MUST use <strong>HTML Entity Escaping</strong>:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Reserved Character</th><th>Entity Name</th><th>Entity Number</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;</code></td><td><code>&amp;lt;</code></td><td><code>&amp;#60;</code></td><td>Less than symbol</td></tr>
      <tr><td><code>&gt;</code></td><td><code>&amp;gt;</code></td><td><code>&amp;#62;</code></td><td>Greater than symbol</td></tr>
      <tr><td><code>&amp;</code></td><td><code>&amp;amp;</code></td><td><code>&amp;#38;</code></td><td>Ampersand symbol</td></tr>
      <tr><td><code>"</code></td><td><code>&amp;quot;</code></td><td><code>&amp;#34;</code></td><td>Double quotation mark</td></tr>
      <tr><td><code>'</code></td><td><code>&amp;apos;</code> or <code>&amp;#39;</code></td><td><code>&amp;#39;</code></td><td>Single quote / apostrophe</td></tr>
      <tr><td><code>&copy;</code></td><td><code>&amp;copy;</code></td><td><code>&amp;#169;</code></td><td>Copyright symbol</td></tr>
      <tr><td><code>&amp;nbsp;</code></td><td><code>&amp;nbsp;</code></td><td><code>&amp;#160;</code></td><td>Non-breaking space</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Escaped Code Snippet Example</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Notice how &lt;div&gt; is escaped as &amp;lt;div&amp;gt; --&gt;
&lt;pre&gt;&lt;code&gt;&amp;lt;div class="card"&amp;gt;
  &amp;lt;h1&amp;gt;Hello World&amp;lt;/h1&amp;gt;
&amp;lt;/div&amp;gt;&lt;/code&gt;&lt;/pre&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What happens if I forget to escape &lt;div&gt; inside a &lt;code&gt; block?</h4>
    <p>The browser will interpret <code>&lt;div&gt;</code> as a real DOM tag instead of showing source code text, breaking your layout tree!</p>
  </div>
</div>`,
  '05-text-formatting.html', '5. Text Formatting',
  '07-links.html', '7. Links'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 07: Links
// ═══════════════════════════════════════════════════════════════════════════════
makePage(7, '07-links.html',
  'Links',
  'Complete HTML5 Chapter 7: Deep exploration of anchor tags <a>, href attribute, internal vs external links, absolute vs relative URLs, mailto, tel, download links, target="_blank", rel="noopener", and fragment links.',
  'Phase 03', 'Links & Navigation',
  'Anchor Element <a> · href Attribute · Absolute vs Relative URLs · Email (mailto:) & Phone (tel:) Links · Download Attribute · target="_blank" & rel="noopener" Security · Fragment Anchors',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 7): Links</strong>! Hyperlinks are the defining feature of the World Wide Web. In this chapter, we master the anchor element (<code>&lt;a&gt;</code>), internal vs external links, relative vs absolute URLs, protocol links (<code>mailto:</code>, <code>tel:</code>), download links, secure tab opening with <code>target="_blank"</code> and <code>rel="noopener"</code>, and fragment section jumping.
</div>

<div class="section-title"><span class="num">1</span>Anchor Tag &amp; URL Types (Absolute vs Relative)</div>
<div class="section-body">
  <p><strong>Absolute URLs:</strong> Full URL including domain protocol (e.g. <code>https://www.example.com/about.html</code>). Used for external sites.</p>
  <p><strong>Relative URLs:</strong> Path relative to the current file (e.g. <code>/about.html</code> or <code>../images/logo.png</code>). Used for internal page navigation.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Absolute &amp; Relative Links</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Internal Relative Links --&gt;
&lt;a href="/about.html"&gt;About Us&lt;/a&gt;
&lt;a href="../contact.html"&gt;Contact Support&lt;/a&gt;

&lt;!-- External Absolute Link in New Tab (Secure) --&gt;
&lt;a href="https://example.com" target="_blank" rel="noopener"&gt;Visit External Website&lt;/a&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Special Protocol Links (Email, Phone &amp; File Downloads)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Email, Phone &amp; Download Links</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Email Link (Launches default mail client) --&gt;
&lt;a href="mailto:support@ourcompiler.com?subject=Inquiry"&gt;Email Support&lt;/a&gt;

&lt;!-- Telephone Link (Launches mobile phone dialer) --&gt;
&lt;a href="tel:+18005550199"&gt;Call Toll-Free +1 (800) 555-0199&lt;/a&gt;

&lt;!-- Force File Download --&gt;
&lt;a href="/files/html5-guide.pdf" download="HTML5-Complete-Guide.pdf"&gt;Download PDF Guide&lt;/a&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Fragment Anchors (Internal Page Jumping)</div>
<div class="section-body">
  <p>To link to a specific section on the same page, assign an <code>id</code> attribute to the target section and use <code>href="#target-id"</code>:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Fragment Jump Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Jump Links --&gt;
&lt;a href="#section2"&gt;Jump to Section 2&lt;/a&gt;

&lt;!-- Target Section --&gt;
&lt;h2 id="section2" style="margin-top:500px;"&gt;Section 2 Content&lt;/h2&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is rel="noopener" mandatory when target="_blank"?</h4>
    <p>Without <code>rel="noopener"</code>, the target opened tab can access your original page's <code>window.opener</code> object via JavaScript, exposing users to tabnabbing phishing exploits.</p>
  </div>
</div>`,
  '06-code-technical-text.html', '6. Code & Technical Text',
  '08-navigation-menus.html', '8. Navigation Menus'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 08: Navigation Menus
// ═══════════════════════════════════════════════════════════════════════════════
makePage(8, '08-navigation-menus.html',
  'Navigation Menus',
  'Complete HTML5 Chapter 8: Deep guide to semantic <nav> tag, list navigation structure, active link indicators (aria-current), breadcrumbs, skip navigation links, and dropdown menu markup.',
  'Phase 03', 'Links & Navigation',
  'Semantic <nav> Tag · List Navigation Structure · Active Link State (aria-current) · Breadcrumbs · Skip Navigation Links · Accessible Dropdown Markup',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 8): Navigation Menus</strong>! Professional web applications require structured navigation systems. In this chapter, we master the semantic <code>&lt;nav&gt;</code> wrapper, list-based navigation, active link state marking (<code>aria-current="page"</code>), breadcrumbs, skip navigation links, and accessible dropdown menu markup.
</div>

<div class="section-title"><span class="num">1</span>Semantic Navigation &amp; Active Link Marking</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Accessible Navigation Bar</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;nav aria-label="Main Navigation"&gt;
  &lt;ul style="display:flex; gap:15px; list-style:none; padding:0;"&gt;
    &lt;li&gt;&lt;a href="/" aria-current="page" style="color:#f97316; font-weight:bold;"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/tutorials"&gt;Tutorials&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/contact"&gt;Contact&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Breadcrumb Navigation &amp; Skip Links</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Breadcrumbs &amp; Skip Link</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Skip to Main Content Link --&gt;
&lt;a href="#main-content" class="skip-link"&gt;Skip to Main Content&lt;/a&gt;

&lt;!-- Breadcrumb Navigation --&gt;
&lt;nav aria-label="Breadcrumb" class="breadcrumb"&gt;
  &lt;a href="/"&gt;Home&lt;/a&gt; &amp;rsaquo;
  &lt;a href="/blog-html.html"&gt;HTML&lt;/a&gt; &amp;rsaquo;
  &lt;span aria-current="location"&gt;Navigation Menus&lt;/span&gt;
&lt;/nav&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why should navigation links always be placed inside an unordered list (&lt;ul&gt;)?</h4>
    <p>Enclosing links inside a <code>&lt;ul&gt;</code> allows screen readers to announce the total number of navigation items (e.g. "List of 4 items") to visually impaired users before reading.</p>
  </div>
</div>`,
  '07-links.html', '7. Links',
  '09-lists.html', '9. Lists'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 09: Lists
// ═══════════════════════════════════════════════════════════════════════════════
makePage(9, '09-lists.html',
  'Lists',
  'Complete HTML5 Chapter 9: Deep guide to unordered lists <ul>, ordered lists <ol>, description lists <dl> <dt> <dd>, nested lists, list item <li>, and list attributes start, reversed, type.',
  'Phase 04', 'Lists & Tables',
  'Unordered Lists <ul> · Ordered Lists <ol> · Description Lists <dl> <dt> <dd> · Nested Lists · List Attributes (start, reversed, type) · FAQ Question/Answer Lists',
  `<div class="intro-box">
  Welcome to <strong>Phase 4 (Chapter 9): Lists</strong>! HTML lists structure related items. In this chapter, we master unordered bullet lists (<code>&lt;ul&gt;</code>), ordered numbered lists (<code>&lt;ol&gt;</code>), key-value description lists (<code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>), nested multi-level lists, and list attributes (<code>start</code>, <code>reversed</code>, <code>type</code>).
</div>

<div class="section-title"><span class="num">1</span>Unordered (&lt;ul&gt;) vs Ordered (&lt;ol&gt;) Lists</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Unordered &amp; Ordered Lists</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Unordered List --&gt;
&lt;ul&gt;
  &lt;li&gt;HTML5 Structure&lt;/li&gt;
  &lt;li&gt;CSS3 Styling&lt;/li&gt;
  &lt;li&gt;JavaScript Logic&lt;/li&gt;
&lt;/ul&gt;

&lt;!-- Ordered List with Custom Start &amp; Reversed --&gt;
&lt;ol start="5" reversed&gt;
  &lt;li&gt;Fifth Step&lt;/li&gt;
  &lt;li&gt;Fourth Step&lt;/li&gt;
&lt;/ol&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Description Lists (&lt;dl&gt;, &lt;dt&gt;, &lt;dd&gt;) &amp; Nested Lists</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Description &amp; Nested Lists</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Description List for Terms &amp; Definitions --&gt;
&lt;dl&gt;
  &lt;dt&gt;&lt;strong&gt;HTML5&lt;/strong&gt;&lt;/dt&gt;
  &lt;dd&gt;Standard markup language for web pages.&lt;/dd&gt;
  &lt;dt&gt;&lt;strong&gt;CSS3&lt;/strong&gt;&lt;/dt&gt;
  &lt;dd&gt;Stylesheet language for visual design.&lt;/dd&gt;
&lt;/dl&gt;

&lt;!-- Nested Multi-Level List --&gt;
&lt;ul&gt;
  &lt;li&gt;Front-End
    &lt;ul&gt;
      &lt;li&gt;HTML5&lt;/li&gt;
      &lt;li&gt;CSS3&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: When should I use a Description List (&lt;dl&gt;)?</h4>
    <p>Use description lists (<code>&lt;dl&gt;</code>) for dictionary terms, key-value metadata lists, or FAQ question-and-answer pairs.</p>
  </div>
</div>`,
  '08-navigation-menus.html', '8. Navigation Menus',
  '10-tables.html', '10. Tables'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 10: Tables
// ═══════════════════════════════════════════════════════════════════════════════
makePage(10, '10-tables.html',
  'Tables',
  'Complete HTML5 Chapter 10: Deep guide to table tags <table>, <caption>, <thead>, <tbody>, <tfoot>, cell spanning colspan and rowspan, scope="col", responsive table wrappers, and accessible table markup.',
  'Phase 04', 'Lists & Tables',
  'Table Structure <table> <thead> <tbody> <tfoot> · <caption> · Cell Spanning (colspan, rowspan) · Header Scoping (scope="col") · Responsive Tables',
  `<div class="intro-box">
  Welcome to <strong>Phase 4 (Chapter 10): Tables</strong>! HTML tables display structured tabular data in rows and columns. In this chapter, we master semantic table markup: <code>&lt;table&gt;</code>, <code>&lt;caption&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code>, cell merging (<code>colspan</code>, <code>rowspan</code>), accessibility (<code>scope="col"</code>), and responsive wrappers.
</div>

<div class="section-title"><span class="num">1</span>Complete Semantic Data Table Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Semantic Data Table</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;div style="overflow-x: auto;"&gt;
  &lt;table border="1" style="border-collapse: collapse; width:100%; text-align:left;"&gt;
    &lt;caption&gt;&lt;strong&gt;Sales Report 2026&lt;/strong&gt;&lt;/caption&gt;
    &lt;thead style="background:#f97316; color:#fff;"&gt;
      &lt;tr&gt;
        &lt;th scope="col"&gt;Month&lt;/th&gt;
        &lt;th scope="col"&gt;Units Sold&lt;/th&gt;
        &lt;th scope="col"&gt;Revenue&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;
        &lt;td&gt;January&lt;/td&gt;
        &lt;td&gt;1,200&lt;/td&gt;
        &lt;td&gt;$24,000&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
    &lt;tfoot style="font-weight:bold;"&gt;
      &lt;tr&gt;
        &lt;td&gt;Total&lt;/td&gt;
        &lt;td&gt;1,200&lt;/td&gt;
        &lt;td&gt;$24,000&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tfoot&gt;
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is scope="col" important on &lt;th&gt; header cells?</h4>
    <p>The <code>scope</code> attribute explicitly informs screen readers whether a header cell applies to a column (<code>scope="col"</code>) or a row (<code>scope="row"</code>).</p>
  </div>
</div>`,
  '09-lists.html', '9. Lists',
  '11-images.html', '11. Images'
);

console.log('\n🎉 SUPER DEEP PART 1 (CHAPTERS 1 TO 10) GENERATED SUCCESSFULLY!');
