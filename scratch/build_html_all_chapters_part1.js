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

console.log('🚀 Generating HTML5 Masterclass Chapters 1 to 15 (Part 1)...');

// 1. What is HTML5?
makePage(1, '01-what-is-html5.html',
  'What is HTML5?',
  'Complete HTML5 Chapter 1: Learn HTML definition, full form, HTML vs CSS vs JavaScript comparison, webpage role, DOM parsing, tags vs elements vs attributes, and HTML5 features.',
  'Phase 01', 'HTML Introduction',
  'HTML Definition · Full Form · HTML vs CSS vs JS · Webpage Role · DOM Parsing · Elements vs Tags · Attributes · HTML5 Features',
  `<div class="intro-box">Welcome to <strong>Phase 1 (Chapter 1): What is HTML5?</strong> HTML (HyperText Markup Language) is the standard markup language used to structure content on web pages. HTML provides structure, CSS provides visual styling, and JavaScript adds interactive behavior.</div>
  <div class="section-title"><span class="num">1</span>HTML Definition &amp; The Web Trio</div>
  <div class="section-body">
    <table class="tbl spec-table">
      <thead><tr><th>Technology</th><th>Role &amp; Responsibility</th><th>Body Analogy</th></tr></thead>
      <tbody>
        <tr><td><strong>HTML</strong></td><td>Document structure, headings, paragraphs, lists, forms.</td><td>Skeleton</td></tr>
        <tr><td><strong>CSS</strong></td><td>Colors, fonts, layouts, responsiveness, animations.</td><td>Skin &amp; Clothes</td></tr>
        <tr><td><strong>JavaScript</strong></td><td>Dynamic logic, interactive events, API data fetching.</td><td>Brain &amp; Muscles</td></tr>
      </tbody>
    </table>
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Basic Structure</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;My First HTML5 Webpage&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Welcome to HTML5&lt;/h1&gt;
  &lt;p&gt;HTML structures web content.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    </div>
  </div>`,
  null, null,
  '02-your-first-html-page.html', '2. Your First HTML Page'
);

// 2. Your First HTML Page
makePage(2, '02-your-first-html-page.html',
  'Your First HTML Page',
  'Complete HTML5 Chapter 2: Create your first .html file, <!DOCTYPE html>, <html>, <head>, <body>, <title>, <meta charset>, Live Server setup, comments, indentation, and W3C validation.',
  'Phase 01', 'HTML Introduction',
  'Creating .html File · <!DOCTYPE html> · <html> · <head> · <body> · <title> · <meta charset> · Live Server · Comments · Indentation · Validation',
  `<div class="intro-box">Welcome to <strong>Phase 1 (Chapter 2): Your First HTML Page</strong>! In this lesson, we build a complete HTML file from scratch, exploring the mandatory boilerplate tags.</div>
  <div class="section-title"><span class="num">1</span>HTML5 Boilerplate Anatomy</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Boilerplate</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- Comment --&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    </div>
  </div>`,
  '01-what-is-html5.html', '1. What is HTML5?',
  '03-elements-tags-attributes.html', '3. Elements, Tags & Attributes'
);

// 3. Elements, Tags & Attributes
makePage(3, '03-elements-tags-attributes.html',
  'Elements, Tags & Attributes',
  'Complete HTML5 Chapter 3: Learn opening and closing tags, nested elements, void elements, key-value attributes, boolean attributes, and global attributes id, class, style.',
  'Phase 02', 'Syntax & Text',
  'Opening/Closing Tags · Nested Elements · Void Elements · Attributes · Boolean Attributes · Global Attributes (id, class, style)',
  `<div class="intro-box">Welcome to <strong>Phase 2 (Chapter 3): Elements, Tags &amp; Attributes</strong>! Master the difference between tags, elements, content, and attributes.</div>
  <div class="section-title"><span class="num">1</span>Tags vs Elements vs Attributes</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Element Structure</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;p class="highlight" id="intro"&gt;Hello World&lt;/p&gt;</code></pre>
    </div>
  </div>`,
  '02-your-first-html-page.html', '2. Your First HTML Page',
  '04-headings-paragraphs.html', '4. Headings & Paragraphs'
);

// 4. Headings & Paragraphs
makePage(4, '04-headings-paragraphs.html',
  'Headings & Paragraphs',
  'Complete HTML5 Chapter 4: Learn heading hierarchy h1 to h6, paragraph p, line breaks br, horizontal rules hr, alignment, and document outline rules.',
  'Phase 02', 'Syntax & Text',
  'Headings <h1>-<h6> · Paragraph <p> · Line Breaks <br> · Horizontal Rule <hr> · Document Hierarchy',
  `<div class="intro-box">Welcome to <strong>Phase 2 (Chapter 4): Headings &amp; Paragraphs</strong>! Learn how heading levels h1 through h6 construct document outlines.</div>
  <div class="section-title"><span class="num">1</span>Headings &amp; Paragraph Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Headings &amp; Paragraphs</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;h1&gt;Main Title (H1)&lt;/h1&gt;
&lt;h2&gt;Section Subtitle (H2)&lt;/h2&gt;
&lt;p&gt;Paragraph text content.&lt;/p&gt;</code></pre>
    </div>
  </div>`,
  '03-elements-tags-attributes.html', '3. Elements, Tags & Attributes',
  '05-text-formatting.html', '5. Text Formatting'
);

// 5. Text Formatting
makePage(5, '05-text-formatting.html',
  'Text Formatting',
  'Complete HTML5 Chapter 5: Learn text formatting tags <strong> vs <b>, <em> vs <i>, <mark>, <sub>, <sup>, <blockquote>, <q>, <abbr>, and <time>.',
  'Phase 02', 'Syntax & Text',
  '<strong> vs <b> · <em> vs <i> · <mark> · <sub>/<sup> · <blockquote> · <q> · <abbr> · <time>',
  `<div class="intro-box">Welcome to <strong>Phase 2 (Chapter 5): Text Formatting</strong>! Format inline text semantically with strong, em, mark, sub, sup, quotes, and abbreviations.</div>
  <div class="section-title"><span class="num">1</span>Text Formatting Tags</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Formatting</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;p&gt;&lt;strong&gt;Bold&lt;/strong&gt;, &lt;em&gt;Italics&lt;/em&gt;, H&lt;sub&gt;2&lt;/sub&gt;O, E=mc&lt;sup&gt;2&lt;/sup&gt;, &lt;mark&gt;Highlighted&lt;/mark&gt;&lt;/p&gt;</code></pre>
    </div>
  </div>`,
  '04-headings-paragraphs.html', '4. Headings & Paragraphs',
  '06-code-technical-text.html', '6. Code & Technical Text'
);

// 6. Code & Technical Text
makePage(6, '06-code-technical-text.html',
  'Code & Technical Text',
  'Complete HTML5 Chapter 6: Learn inline code <code>, preformatted blocks <pre><code>, keyboard input <kbd>, sample output <samp>, variables <var>, and HTML entity escaping.',
  'Phase 02', 'Syntax & Text',
  'Inline Code <code> · Multi-line <pre><code> · Keyboard Input <kbd> · Terminal Output <samp> · Variables <var> · HTML Entity Escaping (&lt;, &gt;, &amp;)',
  `<div class="intro-box">Welcome to <strong>Phase 2 (Chapter 6): Code &amp; Technical Text</strong>! Format source code, keyboard shortcuts, and terminal logs cleanly.</div>
  <div class="section-title"><span class="num">1</span>Code Formatting &amp; Entities</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Code &amp; Kbd</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;p&gt;Press &lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;C&lt;/kbd&gt;&lt;/p&gt;
&lt;pre&gt;&lt;code&gt;console.log("Hello");&lt;/code&gt;&lt;/pre&gt;</code></pre>
    </div>
  </div>`,
  '05-text-formatting.html', '5. Text Formatting',
  '07-links.html', '7. Links'
);

// 7. Links
makePage(7, '07-links.html',
  'Links',
  'Complete HTML5 Chapter 7: Learn anchor tags <a>, href attribute, internal vs external links, absolute vs relative URLs, mailto, tel, download links, target="_blank", rel="noopener", and fragment links.',
  'Phase 03', 'Links & Navigation',
  'Anchor Element <a> · href Attribute · Absolute vs Relative URLs · Email & Telephone Links · Download Links · target="_blank" & rel="noopener" · Fragment Anchors',
  `<div class="intro-box">Welcome to <strong>Phase 3 (Chapter 7): Links</strong>! Connect web pages using anchor tags, target attributes, protocols, and security rules.</div>
  <div class="section-title"><span class="num">1</span>Links Syntax &amp; Security</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Links</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;a href="/about.html"&gt;About Us&lt;/a&gt;
&lt;a href="https://example.com" target="_blank" rel="noopener"&gt;External Site&lt;/a&gt;</code></pre>
    </div>
  </div>`,
  '06-code-technical-text.html', '6. Code & Technical Text',
  '08-navigation-menus.html', '8. Navigation Menus'
);

// 8. Navigation Menus
makePage(8, '08-navigation-menus.html',
  'Navigation Menus',
  'Complete HTML5 Chapter 8: Learn semantic <nav> tag, list navigation structure, active link indicators (aria-current), breadcrumbs, skip links, and dropdown menu markup.',
  'Phase 03', 'Links & Navigation',
  'Semantic <nav> Tag · List Navigation Structure · Active Link State (aria-current) · Breadcrumbs · Skip Navigation Links · Accessible Dropdown Markup',
  `<div class="intro-box">Welcome to <strong>Phase 3 (Chapter 8): Navigation Menus</strong>! Build accessible navigation menus, breadcrumbs, and skip links with &lt;nav&gt;.</div>
  <div class="section-title"><span class="num">1</span>Navigation Bar Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Navigation Bar</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;nav aria-label="Main"&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href="/" aria-current="page"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/contact"&gt;Contact&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
    </div>
  </div>`,
  '07-links.html', '7. Links',
  '09-lists.html', '9. Lists'
);

// 9. Lists
makePage(9, '09-lists.html',
  'Lists',
  'Complete HTML5 Chapter 9: Learn unordered lists <ul>, ordered lists <ol>, description lists <dl> <dt> <dd>, nested lists, list item <li>, and list attributes start, reversed, type.',
  'Phase 04', 'Lists & Tables',
  'Unordered Lists <ul> · Ordered Lists <ol> · Description Lists <dl> <dt> <dd> · Nested Lists · List Attributes (start, reversed, type) · FAQ Data Lists',
  `<div class="intro-box">Welcome to <strong>Phase 4 (Chapter 9): Lists</strong>! Create unordered, ordered, description, and nested lists cleanly.</div>
  <div class="section-title"><span class="num">1</span>List Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Lists</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;ul&gt;&lt;li&gt;Unordered Item&lt;/li&gt;&lt;/ul&gt;
&lt;ol start="1"&gt;&lt;li&gt;Ordered Item&lt;/li&gt;&lt;/ol&gt;</code></pre>
    </div>
  </div>`,
  '08-navigation-menus.html', '8. Navigation Menus',
  '10-tables.html', '10. Tables'
);

// 10. Tables
makePage(10, '10-tables.html',
  'Tables',
  'Complete HTML5 Chapter 10: Learn table tags <table>, <caption>, <thead>, <tbody>, <tfoot>, cell spanning colspan and rowspan, scope="col", responsive table wrappers, and accessible table markup.',
  'Phase 04', 'Lists & Tables',
  'Table Structure <table> <thead> <tbody> <tfoot> · <caption> · Cell Spanning (colspan, rowspan) · Header Scoping (scope="col") · Responsive Tables',
  `<div class="intro-box">Welcome to <strong>Phase 4 (Chapter 10): Tables</strong>! Present structured data with semantic HTML table elements.</div>
  <div class="section-title"><span class="num">1</span>Table Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Table</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;table border="1"&gt;
  &lt;caption&gt;Sales Data&lt;/caption&gt;
  &lt;thead&gt;&lt;tr&gt;&lt;th scope="col"&gt;Item&lt;/th&gt;&lt;th scope="col"&gt;Price&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;
  &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;Book&lt;/td&gt;&lt;td&gt;$10&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;
&lt;/table&gt;</code></pre>
    </div>
  </div>`,
  '09-lists.html', '9. Lists',
  '11-images.html', '11. Images'
);

// 11. Images
makePage(11, '11-images.html',
  'Images',
  'Complete HTML5 Chapter 11: Learn image element <img>, src and alt attributes, CLS width and height dimensions, lazy loading, <figure> and <figcaption>, and web image formats.',
  'Phase 05', 'Images & Graphics',
  'Image Element <img> · src & alt Attributes · Width & Height Dimensions · Decorative vs Meaningful Alt · Lazy Loading · <figure> & <figcaption> · Image Formats',
  `<div class="intro-box">Welcome to <strong>Phase 5 (Chapter 11): Images</strong>! Display images with accessible alt text, explicit width/height dimensions, lazy loading, and figure captions.</div>
  <div class="section-title"><span class="num">1</span>Image &amp; Figure Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Image &amp; Figure</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;figure&gt;
  &lt;img src="/logo.png" alt="Platform Logo" width="200" height="100" loading="lazy"&gt;
  &lt;figcaption&gt;Figure 1: Official Logo&lt;/figcaption&gt;
&lt;/figure&gt;</code></pre>
    </div>
  </div>`,
  '10-tables.html', '10. Tables',
  '12-responsive-images.html', '12. Responsive Images'
);

// 12. Responsive Images
makePage(12, '12-responsive-images.html',
  'Responsive Images',
  'Complete HTML5 Chapter 12: Learn responsive images, srcset width descriptors, sizes attribute, <picture> tag, <source> tags, art direction, and WebP/AVIF format fallbacks.',
  'Phase 05', 'Images & Graphics',
  'Responsive Images · srcset Width Descriptors · sizes Attribute · <picture> & <source> Tags · Art Direction · AVIF/WebP Format Fallbacks',
  `<div class="intro-box">Welcome to <strong>Phase 5 (Chapter 12): Responsive Images</strong>! Serve optimal image resolutions across devices using srcset and <picture>.</div>
  <div class="section-title"><span class="num">1</span>Responsive Image Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Responsive Picture</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;picture&gt;
  &lt;source media="(min-width: 800px)" srcset="banner-large.webp" type="image/webp"&gt;
  &lt;img src="banner-small.jpg" alt="Responsive Banner"&gt;
&lt;/picture&gt;</code></pre>
    </div>
  </div>`,
  '11-images.html', '11. Images',
  '13-svg-canvas.html', '13. SVG & Canvas'
);

// 13. SVG & Canvas
makePage(13, '13-svg-canvas.html',
  'SVG & Canvas',
  'Complete HTML5 Chapter 13: Learn inline SVG vector graphics, SVG shapes, SVG accessibility, HTML5 <canvas> element, 2D rendering context, and SVG vs Canvas trade-offs.',
  'Phase 05', 'Images & Graphics',
  'Scalable Vector Graphics (SVG) · Inline SVG Shapes · SVG Accessibility · HTML5 <canvas> Element · 2D Rendering Context · Canvas vs SVG Comparison',
  `<div class="intro-box">Welcome to <strong>Phase 5 (Chapter 13): SVG &amp; Canvas</strong>! Render vector graphics with SVG and draw 2D pixel graphics with HTML5 Canvas.</div>
  <div class="section-title"><span class="num">1</span>SVG &amp; Canvas Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — SVG &amp; Canvas</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;svg width="50" height="50"&gt;&lt;circle cx="25" cy="25" r="20" fill="#f97316" /&gt;&lt;/svg&gt;
&lt;canvas id="c" width="100" height="50" style="border:1px solid #333;"&gt;&lt;/canvas&gt;</code></pre>
    </div>
  </div>`,
  '12-responsive-images.html', '12. Responsive Images',
  '14-semantic-html5.html', '14. Semantic HTML5'
);

// 14. Semantic HTML5
makePage(14, '14-semantic-html5.html',
  'Semantic HTML5',
  'Complete HTML5 Chapter 14: Learn semantic elements <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>, <details>, <summary>, and SEO/accessibility benefits.',
  'Phase 06', 'Semantic HTML5',
  'Semantic vs Non-semantic · <header> <nav> <main> <section> <article> <aside> <footer> · <details> & <summary> · SEO & Accessibility Benefits',
  `<div class="intro-box">Welcome to <strong>Phase 6 (Chapter 14): Semantic HTML5</strong>! Build structured web pages using meaningful semantic elements instead of generic div containers.</div>
  <div class="section-title"><span class="num">1</span>Semantic Layout Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Semantic Layout</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;header&gt;&lt;h1&gt;Site Title&lt;/h1&gt;&lt;/header&gt;
&lt;nav&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/nav&gt;
&lt;main&gt;&lt;article&gt;&lt;h2&gt;Article Title&lt;/h2&gt;&lt;/article&gt;&lt;/main&gt;
&lt;footer&gt;&lt;p&gt;&amp;copy; 2026&lt;/p&gt;&lt;/footer&gt;</code></pre>
    </div>
  </div>`,
  '13-svg-canvas.html', '13. SVG & Canvas',
  '15-page-layout-structure.html', '15. Page Layout Structure'
);

// 15. Page Layout Structure
makePage(15, '15-page-layout-structure.html',
  'Page Layout Structure',
  'Complete HTML5 Chapter 15: Learn real-world page layouts (Blog, Documentation, Dashboard, Course page) and ARIA landmark roles (role="banner", role="main", role="navigation").',
  'Phase 06', 'Semantic HTML5',
  'Blog Layout · Documentation Layout · Dashboard Structure · Course Page Layout · ARIA Landmark Roles (banner, main, navigation)',
  `<div class="intro-box">Welcome to <strong>Phase 6 (Chapter 15): Page Layout Structure</strong>! Structure production layouts for blogs, documentation sites, and dashboards with ARIA landmarks.</div>
  <div class="section-title"><span class="num">1</span>Page Layout Architecture</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Layout Architecture</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;header role="banner"&gt;&lt;h1&gt;Portal&lt;/h1&gt;&lt;/header&gt;
&lt;div style="display:flex;"&gt;
  &lt;main role="main" style="flex:1;"&gt;&lt;h2&gt;Main Content&lt;/h2&gt;&lt;/main&gt;
  &lt;aside role="complementary" style="width:250px;"&gt;Sidebar&lt;/aside&gt;
&lt;/div&gt;</code></pre>
    </div>
  </div>`,
  '14-semantic-html5.html', '14. Semantic HTML5',
  '16-forms-basics.html', '16. Forms Basics'
);

console.log('\n🎉 PART 1 (CHAPTERS 1 TO 15) GENERATED SUCCESSFULLY!');
