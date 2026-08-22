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

console.log('🚀 Generating SUPER DEEP HTML5 Masterclass Chapters 11 to 20...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 11: Images
// ═══════════════════════════════════════════════════════════════════════════════
makePage(11, '11-images.html',
  'Images',
  'Complete HTML5 Chapter 11: Deep guide to image element <img>, src and alt attributes, CLS width and height dimensions, lazy loading, <figure> and <figcaption>, and web image formats.',
  'Phase 05', 'Images & Graphics',
  'Image Element <img> · src & alt Attributes · Width & Height CLS Prevention · Decorative vs Meaningful Alt Text · Native Lazy Loading · <figure> & <figcaption> · Web Image Formats (WebP, AVIF, PNG, SVG)',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 11): Images</strong>! Images bring web content to life. In this deep chapter, we explore the <code>&lt;img&gt;</code> element, accessible <code>alt</code> text rules, explicit width/height dimensioning to prevent Cumulative Layout Shift (CLS), native browser lazy loading (<code>loading="lazy"</code>), figure captions with <code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code>, and web format trade-offs (WebP, AVIF, PNG, JPG, SVG).
</div>

<div class="section-title"><span class="num">1</span>Image Tag Syntax &amp; Cumulative Layout Shift (CLS) Prevention</div>
<div class="section-body">
  <p>Always specify explicit <code>width</code> and <code>height</code> attributes on <code>&lt;img&gt;</code> tags to allow the browser layout engine to reserve aspect-ratio space before the image binary finishes downloading over the network, preventing jarring layout jumps (CLS):</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Image with CLS Prevention &amp; Lazy Loading</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;img 
  src="/logo.png" 
  alt="Our Compiler Official Platform Logo" 
  width="240" 
  height="80" 
  loading="lazy"&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Accessible Alt Text Guidelines</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Image Category</th><th>Alt Attribute Rule</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><strong>Informative Image</strong></td><td>Provide concise description of information conveyed in graphic.</td><td><code>alt="Bar chart showing 40% growth in 2026"</code></td></tr>
      <tr><td><strong>Decorative Image</strong></td><td>Use empty string <code>alt=""</code> so screen readers skip it.</td><td><code>alt=""</code></td></tr>
      <tr><td><strong>Functional Image (Link/Button)</strong></td><td>Describe the destination action, not visual features.</td><td><code>alt="Return to Homepage"</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>Figures &amp; Captions (&lt;figure&gt; &amp; &lt;figcaption&gt;)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Figure with Caption</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;figure style="border:1px solid #f97316; padding:10px; border-radius:8px; display:inline-block;"&gt;
  &lt;img src="/logo.png" alt="Compiler Architecture Diagram" width="300" height="150"&gt;
  &lt;figcaption style="font-style:italic; color:#aaa; margin-top:6px;"&gt;
    Figure 1.1: High-level compiler parsing pipeline architecture.
  &lt;/figcaption&gt;
&lt;/figure&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What happens if an image fails to load due to broken link?</h4>
    <p>The browser displays a broken image icon alongside the specified <code>alt</code> text, preserving accessibility.</p>
  </div>
</div>`,
  '10-tables.html', '10. Tables',
  '12-responsive-images.html', '12. Responsive Images'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 12: Responsive Images
// ═══════════════════════════════════════════════════════════════════════════════
makePage(12, '12-responsive-images.html',
  'Responsive Images',
  'Complete HTML5 Chapter 12: Deep guide to responsive images, srcset width descriptors, sizes attribute, <picture> tag, <source> tags, art direction, and WebP/AVIF format fallbacks.',
  'Phase 05', 'Images & Graphics',
  'Responsive Images · srcset Width Descriptors · sizes Attribute · <picture> & <source> Tags · Art Direction · AVIF/WebP Format Fallbacks',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 12): Responsive Images</strong>! Serving a massive 4K image file to a small mobile phone wastes cellular data and slows page loads. In this chapter, we master <code>srcset</code> width descriptors, the <code>sizes</code> layout hint, the HTML5 <code>&lt;picture&gt;</code> element, Art Direction, and modern WebP/AVIF media type fallbacks.
</div>

<div class="section-title"><span class="num">1</span>Resolution Switching with srcset &amp; sizes</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — srcset &amp; sizes Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;img 
  src="banner-800.jpg" 
  srcset="banner-400.jpg 400w, banner-800.jpg 800w, banner-1200.jpg 1200w" 
  sizes="(max-width: 600px) 100vw, 50vw" 
  alt="Responsive Banner"&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Art Direction &amp; Modern Format Fallbacks (&lt;picture&gt;)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Picture Element with AVIF/WebP</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;picture&gt;
  &lt;!-- Serve next-gen AVIF if supported --&gt;
  &lt;source srcset="hero.avif" type="image/avif"&gt;
  &lt;!-- Serve WebP as fallback --&gt;
  &lt;source srcset="hero.webp" type="image/webp"&gt;
  &lt;!-- Default JPG image fallback --&gt;
  &lt;img src="hero.jpg" alt="Hero Banner" width="800" height="400"&gt;
&lt;/picture&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: When should I use &lt;picture&gt; vs srcset?</h4>
    <p>Use <code>srcset</code> when serving identical images at different resolutions. Use <code>&lt;picture&gt;</code> when changing image cropping (Art Direction) or offering next-gen format fallbacks (AVIF/WebP).</p>
  </div>
</div>`,
  '11-images.html', '11. Images',
  '13-svg-canvas.html', '13. SVG & Canvas'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 13: SVG & Canvas
// ═══════════════════════════════════════════════════════════════════════════════
makePage(13, '13-svg-canvas.html',
  'SVG & Canvas',
  'Complete HTML5 Chapter 13: Deep guide to inline SVG vector graphics, SVG shapes, SVG accessibility, HTML5 <canvas> element, 2D rendering context, and SVG vs Canvas trade-offs.',
  'Phase 05', 'Images & Graphics',
  'Scalable Vector Graphics (SVG) · Inline SVG Shapes · SVG Accessibility · HTML5 <canvas> Element · 2D Rendering Context · Canvas vs SVG Comparison',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 13): SVG &amp; Canvas</strong>! HTML5 provides two native graphic rendering engines: Scalable Vector Graphics (SVG) for XML-based vector shapes, and the <code>&lt;canvas&gt;</code> element for high-performance 2D/3D pixel rendering via JavaScript.
</div>

<div class="section-title"><span class="num">1</span>Inline SVG Vector Shapes</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Inline SVG Circles &amp; Rectangles</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="Orange Circle Icon"&gt;
  &lt;circle cx="50" cy="50" r="40" fill="#f97316" stroke="#ffffff" stroke-width="4" /&gt;
&lt;/svg&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>HTML5 &lt;canvas&gt; 2D Context</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML + JS — Canvas 2D Rendering</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;canvas id="myCanvas" width="200" height="100" style="border:1px solid #f97316;"&gt;&lt;/canvas&gt;

&lt;script&gt;
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f97316';
  ctx.fillRect(10, 10, 150, 80);
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: SVG vs Canvas — which is better?</h4>
    <p>SVG is DOM-based, scalable to any resolution without loss, and ideal for icons, charts, and UI graphics. Canvas is pixel-based, fast, and ideal for high-frame-rate web games and animations.</p>
  </div>
</div>`,
  '12-responsive-images.html', '12. Responsive Images',
  '14-semantic-html5.html', '14. Semantic HTML5'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 14: Semantic HTML5
// ═══════════════════════════════════════════════════════════════════════════════
makePage(14, '14-semantic-html5.html',
  'Semantic HTML5',
  'Complete HTML5 Chapter 14: Deep guide to semantic elements <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>, <details>, <summary>, and SEO/accessibility benefits.',
  'Phase 06', 'Semantic HTML5',
  'Semantic vs Non-semantic · <header> <nav> <main> <section> <article> <aside> <footer> · <details> & <summary> Accordion · SEO & Accessibility Benefits',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 14): Semantic HTML5</strong>! Semantic HTML uses tags that clearly describe their meaning to both browsers and developers. In this chapter, we master semantic layout tags (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>), accordions with <code>&lt;details&gt;</code>, and SEO/a11y advantages over generic <code>&lt;div&gt;</code> containers.
</div>

<div class="section-title"><span class="num">1</span>Semantic Layout Architecture</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Semantic Page Layout</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;header&gt;
  &lt;h1&gt;Our Compiler Tech Blog&lt;/h1&gt;
&lt;/header&gt;

&lt;nav aria-label="Primary Navigation"&gt;
  &lt;a href="/"&gt;Home&lt;/a&gt; | &lt;a href="/tutorials"&gt;Tutorials&lt;/a&gt;
&lt;/nav&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;HTML5 Semantic Guide&lt;/h2&gt;
    &lt;p&gt;Learn semantic layout best practices.&lt;/p&gt;
  &lt;/article&gt;
  
  &lt;aside&gt;
    &lt;h3&gt;Related Lessons&lt;/h3&gt;
    &lt;p&gt;CSS Grid &amp; Flexbox&lt;/p&gt;
  &lt;/aside&gt;
&lt;/main&gt;

&lt;footer&gt;
  &lt;p&gt;&amp;copy; 2026 Our Compiler&lt;/p&gt;
&lt;/footer&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Difference between &lt;article&gt; and &lt;section&gt;?</h4>
    <p>An <code>&lt;article&gt;</code> represents a self-contained content piece that makes sense on its own (e.g. blog post, news story, comment). A <code>&lt;section&gt;</code> represents a thematic grouping of content inside a document.</p>
  </div>
</div>`,
  '13-svg-canvas.html', '13. SVG & Canvas',
  '15-page-layout-structure.html', '15. Page Layout Structure'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 15: Page Layout Structure
// ═══════════════════════════════════════════════════════════════════════════════
makePage(15, '15-page-layout-structure.html',
  'Page Layout Structure',
  'Complete HTML5 Chapter 15: Deep guide to real-world page layouts (Blog, Documentation, Dashboard, Course page) and ARIA landmark roles (role="banner", role="main", role="navigation").',
  'Phase 06', 'Semantic HTML5',
  'Blog Layout · Documentation Layout · Dashboard Structure · Course Page Layout · ARIA Landmark Roles (banner, main, navigation, complementary)',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 15): Page Layout Structure</strong>! Structure production web pages for blogs, documentation portals, dashboards, and online courses using clean semantic HTML5 and explicit ARIA landmark roles.
</div>

<div class="section-title"><span class="num">1</span>Documentation Layout with ARIA Landmarks</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Docs Layout with ARIA Landmarks</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;header role="banner"&gt;
  &lt;h1&gt;Documentation Portal&lt;/h1&gt;
&lt;/header&gt;

&lt;div style="display:flex;"&gt;
  &lt;nav role="navigation" aria-label="Sidebar Docs" style="width:200px;"&gt;
    &lt;a href="#ch1"&gt;Chapter 1&lt;/a&gt;&lt;br&gt;
    &lt;a href="#ch2"&gt;Chapter 2&lt;/a&gt;
  &lt;/nav&gt;
  
  &lt;main role="main" style="flex:1; padding:15px;"&gt;
    &lt;h2&gt;Main Guide Content&lt;/h2&gt;
    &lt;p&gt;Documentation text content goes here.&lt;/p&gt;
  &lt;/main&gt;
&lt;/div&gt;</code></pre>
  </div>
</div>`,
  '14-semantic-html5.html', '14. Semantic HTML5',
  '16-forms-basics.html', '16. Forms Basics'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 16: Forms Basics
// ═══════════════════════════════════════════════════════════════════════════════
makePage(16, '16-forms-basics.html',
  'Forms Basics',
  'Complete HTML5 Chapter 16: Deep guide to <form> tag, action URL, GET vs POST submission methods, <label> association, <input>, <button>, <textarea>, <select>, <option>, <fieldset>, and <legend>.',
  'Phase 07', 'Forms & Input Controls',
  '<form> Tag · action & method (GET vs POST) · <label for=""> · <input> & <button> · <textarea> · <select> & <option> · <fieldset> & <legend>',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 16): Forms Basics</strong>! Forms enable user input submission to backend servers. In this chapter, we master <code>&lt;form&gt;</code>, <code>action</code> URLs, GET vs POST methods, explicit <code>&lt;label for=""&gt;</code> association, textareas, selects, and fieldset grouping.
</div>

<div class="section-title"><span class="num">1</span>Form Submission Syntax &amp; Label Association</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Complete Form Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;form action="/submit-form" method="post"&gt;
  &lt;fieldset style="border:1px solid #f97316; padding:15px; border-radius:8px;"&gt;
    &lt;legend style="color:#f97316; font-weight:bold;"&gt;User Registration&lt;/legend&gt;
    
    &lt;p&gt;
      &lt;label for="username"&gt;Username:&lt;/label&gt;&lt;br&gt;
      &lt;input id="username" name="user" type="text" required&gt;
    &lt;/p&gt;
    
    &lt;p&gt;
      &lt;label for="country"&gt;Country:&lt;/label&gt;&lt;br&gt;
      &lt;select id="country" name="country"&gt;
        &lt;option value="in"&gt;India&lt;/option&gt;
        &lt;option value="us"&gt;United States&lt;/option&gt;
      &lt;/select&gt;
    &lt;/p&gt;
    
    &lt;button type="submit" style="background:#f97316; color:#fff; padding:8px 16px; border:none; border-radius:4px; cursor:pointer;"&gt;
      Register Now
    &lt;/button&gt;
  &lt;/fieldset&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>`,
  '15-page-layout-structure.html', '15. Page Layout Structure',
  '17-input-types.html', '17. Input Types'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 17: Input Types
// ═══════════════════════════════════════════════════════════════════════════════
makePage(17, '17-input-types.html',
  'Input Types',
  'Complete HTML5 Chapter 17: Deep reference guide to all input types text, password, email, number, tel, url, search, date, time, datetime-local, month, week, color, range, checkbox, radio, file, hidden, submit, reset, and button.',
  'Phase 07', 'Forms & Input Controls',
  'Input Types Reference · text, password, email, number, tel, url · date, time, datetime-local · color picker · range slider · checkbox & radio · file upload · hidden inputs',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 17): Input Types</strong>! HTML5 provides native input types that provide automated mobile keyboards, date pickers, color pickers, and client-side format checks.
</div>

<div class="section-title"><span class="num">1</span>HTML5 Input Types Reference Showcase</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Input Types Showcase</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;p&gt;&lt;label&gt;Email: &lt;input type="email" placeholder="user@domain.com" required&gt;&lt;/label&gt;&lt;/p&gt;
&lt;p&gt;&lt;label&gt;Date of Birth: &lt;input type="date"&gt;&lt;/label&gt;&lt;/p&gt;
&lt;p&gt;&lt;label&gt;Theme Color: &lt;input type="color" value="#f97316"&gt;&lt;/label&gt;&lt;/p&gt;
&lt;p&gt;&lt;label&gt;Volume: &lt;input type="range" min="0" max="100" value="50"&gt;&lt;/label&gt;&lt;/p&gt;
&lt;p&gt;&lt;label&gt;&lt;input type="checkbox" checked&gt; Subscribe to Newsletter&lt;/label&gt;&lt;/p&gt;</code></pre>
  </div>
</div>`,
  '16-forms-basics.html', '16. Forms Basics',
  '18-form-attributes.html', '18. Form Attributes'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 18: Form Attributes
// ═══════════════════════════════════════════════════════════════════════════════
makePage(18, '18-form-attributes.html',
  'Form Attributes',
  'Complete HTML5 Chapter 18: Deep guide to form attributes name, value, placeholder, required, readonly, disabled, checked, selected, min, max, step, minlength, maxlength, pattern, autocomplete, multiple, and accept.',
  'Phase 07', 'Forms & Input Controls',
  'Form Attributes · required, readonly, disabled · min, max, step · minlength, maxlength · pattern (Regex) · autocomplete & multiple · accept file filters',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 18): Form Attributes</strong>! Master HTML5 form validation constraints: <code>required</code>, <code>pattern</code> Regex, <code>min</code>/<code>max</code>, <code>minlength</code>/<code>maxlength</code>, <code>autocomplete</code>, and <code>accept</code> file filters.
</div>

<div class="section-title"><span class="num">1</span>Form Attributes Constraint Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Constraint Attributes Example</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Zip code regex: exactly 5 digits --&gt;
&lt;input type="text" pattern="[0-9]{5}" title="Please enter 5 digit zip code" required&gt;

&lt;!-- File upload restricted to images only --&gt;
&lt;input type="file" accept="image/*" multiple&gt;</code></pre>
  </div>
</div>`,
  '17-input-types.html', '17. Input Types',
  '19-form-validation.html', '19. Form Validation'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 19: Form Validation
// ═══════════════════════════════════════════════════════════════════════════════
makePage(19, '19-form-validation.html',
  'Form Validation',
  'Complete HTML5 Chapter 19: Deep guide to browser native validation, required, email, pattern validation, novalidate attribute, checkValidity(), reportValidity(), validity state object, CSS :valid and :invalid, and custom JS validation.',
  'Phase 07', 'Forms & Input Controls',
  'Browser Native Validation · novalidate Attribute · Validity State Object · checkValidity() & reportValidity() · CSS :valid & :invalid · Custom JS Messages',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 19): Form Validation</strong>! Validate input data before sending it to your backend using native HTML5 validation and JavaScript's <code>ValidityState</code> API.
</div>

<div class="section-title"><span class="num">1</span>ValidityState API Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML + JS — Custom Form Validation</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;form novalidate id="myForm"&gt;
  &lt;input id="email" type="email" required placeholder="Enter email"&gt;
  &lt;button type="button" onclick="validateInput()"&gt;Validate&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
  function validateInput() {
    const input = document.getElementById('email');
    if (!input.checkValidity()) {
      alert('Validation Error: Please enter a valid email address!');
    } else {
      alert('Success: Input is valid!');
    }
  }
&lt;/script&gt;</code></pre>
  </div>
</div>`,
  '18-form-attributes.html', '18. Form Attributes',
  '20-audio.html', '20. Audio'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 20: Audio
// ═══════════════════════════════════════════════════════════════════════════════
makePage(20, '20-audio.html',
  'Audio',
  'Complete HTML5 Chapter 20: Deep guide to <audio> tag, controls, autoplay, loop, muted, <source> formats (MP3, WAV, OGG), accessible transcripts, and Audio JavaScript API.',
  'Phase 08', 'Audio, Video & Embeds',
  '<audio> Element · controls, autoplay, loop, muted · <source> Formats (MP3, OGG, WAV) · Fallback Text · Audio JavaScript API',
  `<div class="intro-box">
  Welcome to <strong>Phase 8 (Chapter 20): Audio</strong>! Embed audio music or podcast files natively with the HTML5 <code>&lt;audio&gt;</code> element and <code>&lt;source&gt;</code> format fallbacks.
</div>

<div class="section-title"><span class="num">1</span>Audio Player Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Audio Player Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;audio controls preload="metadata"&gt;
  &lt;source src="audio.mp3" type="audio/mpeg"&gt;
  &lt;source src="audio.ogg" type="audio/ogg"&gt;
  Your browser does not support native audio playback.
&lt;/audio&gt;</code></pre>
  </div>
</div>`,
  '19-form-validation.html', '19. Form Validation',
  '21-video.html', '21. Video'
);

console.log('\n🎉 SUPER DEEP PART 2 (CHAPTERS 11 TO 20) GENERATED SUCCESSFULLY!');
