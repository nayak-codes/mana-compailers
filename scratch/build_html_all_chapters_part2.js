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

console.log('🚀 Generating HTML5 Masterclass Chapters 16 to 27 (Part 2)...');

// 16. Forms Basics
makePage(16, '16-forms-basics.html',
  'Forms Basics',
  'Complete HTML5 Chapter 16: Learn <form> tag, action URL, GET vs POST submission methods, <label> association, <input>, <button>, <textarea>, <select>, <option>, <fieldset>, and <legend>.',
  'Phase 07', 'Forms & Input Controls',
  '<form> Tag · action & method (GET vs POST) · <label for=""> · <input> & <button> · <textarea> · <select> & <option> · <fieldset> & <legend>',
  `<div class="intro-box">Welcome to <strong>Phase 7 (Chapter 16): Forms Basics</strong>! Master form submission protocols, action URLs, GET vs POST methods, and field grouping.</div>
  <div class="section-title"><span class="num">1</span>Form Syntax &amp; Submission Methods</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Form Syntax</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;form action="/submit" method="post"&gt;
  &lt;label for="u"&gt;Username:&lt;/label&gt;
  &lt;input id="u" name="user" type="text" required&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
    </div>
  </div>`,
  '15-page-layout-structure.html', '15. Page Layout Structure',
  '17-input-types.html', '17. Input Types'
);

// 17. Input Types
makePage(17, '17-input-types.html',
  'Input Types',
  'Complete HTML5 Chapter 17: Learn all input types text, password, email, number, tel, url, search, date, time, datetime-local, month, week, color, range, checkbox, radio, file, hidden, submit, reset, and button.',
  'Phase 07', 'Forms & Input Controls',
  'Input Types Reference · email, number, tel, url · date, time, color, range · checkbox & radio · file upload · hidden inputs',
  `<div class="intro-box">Welcome to <strong>Phase 7 (Chapter 17): Input Types</strong>! Explore native HTML5 input types for specific data formats.</div>
  <div class="section-title"><span class="num">1</span>Input Types Showcase</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Input Controls</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;input type="email" placeholder="name@domain.com"&gt;
&lt;input type="date"&gt;
&lt;input type="color" value="#f97316"&gt;
&lt;input type="range" min="0" max="100"&gt;</code></pre>
    </div>
  </div>`,
  '16-forms-basics.html', '16. Forms Basics',
  '18-form-attributes.html', '18. Form Attributes'
);

// 18. Form Attributes
makePage(18, '18-form-attributes.html',
  'Form Attributes',
  'Complete HTML5 Chapter 18: Learn form attributes name, value, placeholder, required, readonly, disabled, checked, selected, min, max, step, minlength, maxlength, pattern, autocomplete, multiple, and accept.',
  'Phase 07', 'Forms & Input Controls',
  'Form Attributes · required, readonly, disabled · min, max, step · minlength, maxlength · pattern (Regex) · autocomplete & multiple',
  `<div class="intro-box">Welcome to <strong>Phase 7 (Chapter 18): Form Attributes</strong>! Master attributes configuring validation constraints and input behaviors.</div>
  <div class="section-title"><span class="num">1</span>Attribute Constraints</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Attributes</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;input type="text" pattern="[0-9]{5}" title="5 digit zip code" required&gt;
&lt;input type="file" accept="image/*" multiple&gt;</code></pre>
    </div>
  </div>`,
  '17-input-types.html', '17. Input Types',
  '19-form-validation.html', '19. Form Validation'
);

// 19. Form Validation
makePage(19, '19-form-validation.html',
  'Form Validation',
  'Complete HTML5 Chapter 19: Learn browser native validation, required, email, pattern validation, novalidate attribute, checkValidity(), reportValidity(), validity state object, CSS :valid and :invalid, and custom JS validation.',
  'Phase 07', 'Forms & Input Controls',
  'Browser Native Validation · novalidate Attribute · Validity State Object · checkValidity() & reportValidity() · CSS :valid & :invalid · Custom JS Validation',
  `<div class="intro-box">Welcome to <strong>Phase 7 (Chapter 19): Form Validation</strong>! Validate form inputs natively with HTML5 constraints and JS ValidityState API.</div>
  <div class="section-title"><span class="num">1</span>Validation &amp; ValidityState API</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Validation</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;form novalidate&gt;
  &lt;input id="e" type="email" required&gt;
  &lt;button onclick="document.getElementById('e').reportValidity()"&gt;Validate&lt;/button&gt;
&lt;/form&gt;</code></pre>
    </div>
  </div>`,
  '18-form-attributes.html', '18. Form Attributes',
  '20-audio.html', '20. Audio'
);

// 20. Audio
makePage(20, '20-audio.html',
  'Audio',
  'Complete HTML5 Chapter 20: Learn <audio> tag, controls, autoplay, loop, muted, <source> formats (MP3, WAV, OGG), accessible transcripts, and Audio JavaScript API.',
  'Phase 08', 'Audio, Video & Embeds',
  '<audio> Element · controls, autoplay, loop, muted · <source> Formats (MP3, OGG, WAV) · Fallback Text · Audio JavaScript API',
  `<div class="intro-box">Welcome to <strong>Phase 8 (Chapter 20): Audio</strong>! Embed audio sound clips natively with multiple source format fallbacks.</div>
  <div class="section-title"><span class="num">1</span>Audio Player Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Audio Player</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;audio controls preload="metadata"&gt;
  &lt;source src="sound.mp3" type="audio/mpeg"&gt;
  &lt;source src="sound.ogg" type="audio/ogg"&gt;
&lt;/audio&gt;</code></pre>
    </div>
  </div>`,
  '19-form-validation.html', '19. Form Validation',
  '21-video.html', '21. Video'
);

// 21. Video
makePage(21, '21-video.html',
  'Video',
  'Complete HTML5 Chapter 21: Learn <video> tag, controls, poster, width/height, autoplay, muted, loop, <source> formats (MP4, WebM), <track> WebVTT captions, and responsive video.',
  'Phase 08', 'Audio, Video & Embeds',
  '<video> Element · poster Attribute · <source> Formats (MP4, WebM) · <track> WebVTT Captions & Subtitles · Responsive Aspect Ratio',
  `<div class="intro-box">Welcome to <strong>Phase 8 (Chapter 21): Video</strong>! Render video files natively with poster images and WebVTT closed captions.</div>
  <div class="section-title"><span class="num">1</span>Video Player Syntax</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Video Player</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;video controls poster="thumb.jpg" width="640" height="360"&gt;
  &lt;source src="video.mp4" type="video/mp4"&gt;
  &lt;track kind="subtitles" src="subs-en.vtt" srclang="en" label="English" default&gt;
&lt;/video&gt;</code></pre>
    </div>
  </div>`,
  '20-audio.html', '20. Audio',
  '22-embedded-content.html', '22. Embedded Content'
);

// 22. Embedded Content
makePage(22, '22-embedded-content.html',
  'Embedded Content',
  'Complete HTML5 Chapter 22: Learn <iframe> tag, YouTube and Maps embedding, title attribute, loading="lazy", sandbox security, allow permissions policy, clickjacking risks, and responsive iframe wrappers.',
  'Phase 08', 'Audio, Video & Embeds',
  '<iframe> Element · YouTube & Maps Embedding · title Accessibility Attribute · sandbox Security Flags · allow Permissions Policy · Clickjacking Mitigation',
  `<div class="intro-box">Welcome to <strong>Phase 8 (Chapter 22): Embedded Content</strong>! Embed external documents via &lt;iframe&gt; with lazy loading and sandboxed security.</div>
  <div class="section-title"><span class="num">1</span>IFrame Syntax &amp; Security</div>
  <div class="section-body">
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Embedded IFrame</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Tutorial Video" width="560" height="315" loading="lazy" sandbox="allow-scripts" style="border:0;"&gt;&lt;/iframe&gt;</code></pre>
    </div>
  </div>`,
  '21-video.html', '21. Video',
  '23-head-metadata.html', '23. Head Metadata'
);

// 23. Head Metadata (Phase 9)
makePage(23, '23-head-metadata.html',
  'Head Metadata',
  'Complete HTML5 Chapter 23: Learn <title>, charset, viewport, description, author, robots, theme-color, favicon, canonical URL, lang attribute, Open Graph overview, and social sharing metadata.',
  'Phase 09', 'Metadata & SEO',
  '<title> · meta charset & viewport · Description & Author · Robots & Theme Color · Favicon · Canonical URL · Open Graph & Social Sharing',
  `<div class="intro-box">Welcome to <strong>Phase 9 (Chapter 23): Head Metadata</strong>! Master configuring document metadata inside the <code>&lt;head&gt;</code> section for search engines and social sharing cards.</div>
  <div class="section-title"><span class="num">1</span>Subchapters Covered</div>
  <div class="section-body">
    <ul>
      <li><strong>&lt;title&gt;:</strong> Defines document title in browser tab and search results.</li>
      <li><strong>Character encoding (&lt;meta charset="UTF-8"&gt;):</strong> Ensures proper rendering of international Unicode text.</li>
      <li><strong>Viewport meta tag:</strong> Controls mobile rendering width and zoom scale.</li>
      <li><strong>Description meta tag:</strong> Supplies search engine snippet text.</li>
      <li><strong>Author &amp; Robots:</strong> Configures content authorship and search engine indexing directives.</li>
      <li><strong>Theme color &amp; Favicon:</strong> Customizes browser UI address bar colors and tab icons.</li>
      <li><strong>Canonical URL:</strong> Specifies canonical single source URL to prevent duplicate content penalties.</li>
      <li><strong>Open Graph &amp; Social sharing metadata:</strong> Configures <code>og:title</code>, <code>og:image</code>, and Twitter Cards for social media previews.</li>
    </ul>
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Complete Metadata Template</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta name="description" content="Learn HTML5 with simple examples and projects."&gt;
  &lt;meta name="author" content="Our Compiler Team"&gt;
  &lt;meta name="theme-color" content="#f97316"&gt;
  &lt;title&gt;HTML5 Tutorial | Our Compiler&lt;/title&gt;
  &lt;link rel="icon" href="/favicon.png"&gt;
  &lt;link rel="canonical" href="https://www.ourcompiler.com/blog-html.html"&gt;

  &lt;!-- Open Graph Social Sharing --&gt;
  &lt;meta property="og:title" content="HTML5 Tutorial"&gt;
  &lt;meta property="og:image" content="https://www.ourcompiler.com/og-banner.png"&gt;
&lt;/head&gt;</code></pre>
    </div>
  </div>`,
  '22-embedded-content.html', '22. Embedded Content',
  '24-seo-friendly-html.html', '24. SEO-Friendly HTML'
);

// 24. SEO-Friendly HTML (Phase 9)
makePage(24, '24-seo-friendly-html.html',
  'SEO-Friendly HTML',
  'Complete HTML5 Chapter 24: Learn semantic headings, one main heading rule, descriptive titles, meta description, meaningful link texts, image alt text SEO, canonical URLs, structured content, breadcrumbs, and sitemap overview.',
  'Phase 09', 'Metadata & SEO',
  'Semantic Headings · Single H1 Rule · Descriptive Titles & Meta · Meaningful Anchor Text · Image Alt SEO · Breadcrumbs & Internal Linking · Sitemap Overview',
  `<div class="intro-box">Welcome to <strong>Phase 9 (Chapter 24): SEO-Friendly HTML</strong>! Optimize HTML markup for search engine crawlers (Googlebot) to maximize organic search rankings.</div>
  <div class="section-title"><span class="num">1</span>Subchapters Covered</div>
  <div class="section-body">
    <ul>
      <li><strong>Semantic Headings &amp; Single H1 Rule:</strong> Maintain strict heading hierarchy (<code>&lt;h1&gt;</code> down to <code>&lt;h6&gt;</code>) with exactly one primary <code>&lt;h1&gt;</code> per document.</li>
      <li><strong>Descriptive Titles &amp; Meta Descriptions:</strong> Write enticing 50-60 character titles and 150 character summaries.</li>
      <li><strong>Meaningful Anchor Link Text:</strong> Avoid generic "click here" links; use descriptive target keywords.</li>
      <li><strong>Image Alt Text SEO:</strong> Describe images clearly for search indexing and screen readers.</li>
      <li><strong>Breadcrumbs &amp; Internal Linking:</strong> Build clear structural hierarchy links to help crawlers discover content.</li>
      <li><strong>Sitemap Overview:</strong> Maintain an XML sitemap (<code>sitemap.xml</code>) referencing clean HTML URLs.</li>
    </ul>
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — SEO-Optimized Article Markup</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;nav aria-label="Breadcrumb" class="breadcrumb"&gt;
  &lt;a href="/"&gt;Home&lt;/a&gt; &amp;rsaquo; &lt;a href="/blog-html.html"&gt;HTML&lt;/a&gt; &amp;rsaquo; &lt;span&gt;SEO Guide&lt;/span&gt;
&lt;/nav&gt;

&lt;main&gt;
  &lt;h1&gt;SEO-Friendly HTML Best Practices&lt;/h1&gt;
  &lt;p&gt;Learn how to structure web pages for maximum search visibility.&lt;/p&gt;
&lt;/main&gt;</code></pre>
    </div>
  </div>`,
  '23-head-metadata.html', '23. Head Metadata',
  '25-accessibility-basics.html', '25. Accessibility Basics'
);

// 25. Accessibility Basics (Phase 10)
makePage(25, '25-accessibility-basics.html',
  'Accessibility Basics',
  'Complete HTML5 Chapter 25: Learn web accessibility definition, assistive technologies, semantic HTML foundation, keyboard navigation, screen readers, focus order, accessible links/buttons/images/forms, color contrast, and skip links.',
  'Phase 10', 'Accessibility & ARIA',
  'Web Accessibility Overview · Assistive Technologies · Semantic HTML Foundation · Keyboard Navigation & Focus Order · Accessible Forms & Images · Color Contrast & Skip Links',
  `<div class="intro-box">Welcome to <strong>Phase 10 (Chapter 25): Accessibility Basics</strong>! Semantic HTML's "right element for the right job" approach provides built-in support for browsers and assistive technologies.</div>
  <div class="section-title"><span class="num">1</span>Subchapters Covered</div>
  <div class="section-body">
    <ul>
      <li><strong>What is Accessibility?:</strong> Ensuring web content is accessible to people with visual, auditory, motor, or cognitive disabilities.</li>
      <li><strong>Assistive Technologies:</strong> How screen readers (NVDA, JAWS, VoiceOver), braille displays, and switch devices interpret HTML.</li>
      <li><strong>Semantic HTML Foundation:</strong> Using native elements (<code>&lt;button&gt;</code>, <code>&lt;a&gt;</code>) instead of non-semantic clickable divs.</li>
      <li><strong>Keyboard Navigation &amp; Focus Order:</strong> Ensuring logical Tab key focus order and visible focus indicators.</li>
      <li><strong>Accessible Forms &amp; Images:</strong> Pairing explicit <code>&lt;label for=""&gt;</code> tags and meaningful <code>alt</code> attributes.</li>
      <li><strong>Skip Links:</strong> Providing top "Skip to Main Content" links for keyboard users.</li>
    </ul>
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Skip Link &amp; Accessible Form</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;!-- Skip Navigation Link --&gt;
&lt;a href="#mainContent" class="skip-link"&gt;Skip to Main Content&lt;/a&gt;

&lt;main id="mainContent"&gt;
  &lt;form&gt;
    &lt;label for="userEmail"&gt;Email Address:&lt;/label&gt;
    &lt;input id="userEmail" name="email" type="email" required&gt;
    &lt;button type="submit"&gt;Subscribe&lt;/button&gt;
  &lt;/form&gt;
&lt;/main&gt;</code></pre>
    </div>
  </div>`,
  '24-seo-friendly-html.html', '24. SEO-Friendly HTML',
  '26-aria.html', '26. ARIA'
);

// 26. ARIA (Phase 10)
makePage(26, '26-aria.html',
  'ARIA (Accessible Rich Internet Applications)',
  'Complete HTML5 Chapter 26: Learn WAI-ARIA, ARIA roles, aria-label, aria-labelledby, aria-describedby, aria-expanded, aria-hidden, aria-live, aria-current, aria-invalid, when not to use ARIA, and custom accessible widgets.',
  'Phase 10', 'Accessibility & ARIA',
  'WAI-ARIA Overview · ARIA Roles · aria-label & aria-labelledby · aria-expanded & aria-hidden · aria-live & aria-invalid · When NOT to use ARIA · Custom Accessible Widgets',
  `<div class="intro-box">Welcome to <strong>Phase 10 (Chapter 26): ARIA</strong>! WAI-ARIA attributes extend HTML markup to bridge accessibility gaps in dynamic rich internet applications.</div>
  <div class="section-title"><span class="num">1</span>Subchapters Covered</div>
  <div class="section-body">
    <ul>
      <li><strong>What is ARIA?:</strong> Accessible Rich Internet Applications spec defining attributes to communicate state and roles to assistive tools.</li>
      <li><strong>ARIA Roles:</strong> Widget roles (<code>role="dialog"</code>, <code>role="alert"</code>) and landmark roles.</li>
      <li><strong>Labels &amp; Descriptions:</strong> <code>aria-label</code>, <code>aria-labelledby</code>, and <code>aria-describedby</code>.</li>
      <li><strong>State Attributes:</strong> <code>aria-expanded</code> (accordions), <code>aria-hidden</code> (hidden items), <code>aria-current</code> (nav active state), <code>aria-invalid</code> (form errors).</li>
      <li><strong>Live Regions:</strong> <code>aria-live="polite"</code> for dynamic asynchronous updates.</li>
      <li><strong>When NOT to use ARIA:</strong> Always prefer native semantic HTML elements over custom ARIA divs whenever possible.</li>
    </ul>
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — ARIA Controls</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;!-- Toggle Button with ARIA state --&gt;
&lt;button aria-expanded="false" aria-controls="faq1" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false')"&gt;
  Toggle FAQ Answer
&lt;/button&gt;
&lt;div id="faq1" role="region" aria-label="FAQ Content"&gt;Answer content...&lt;/div&gt;</code></pre>
    </div>
  </div>`,
  '25-accessibility-basics.html', '25. Accessibility Basics',
  '27-accessibility-testing.html', '27. Accessibility Testing'
);

// 27. Accessibility Testing (Phase 10)
makePage(27, '27-accessibility-testing.html',
  'Accessibility Testing',
  'Complete HTML5 Chapter 27: Learn keyboard-only testing, screen reader testing, browser accessibility tools, heading structure checks, form label checks, color contrast checks, focus visibility, missing alt text, automated audits (Lighthouse), and accessibility checklist.',
  'Phase 10', 'Accessibility & ARIA',
  'Keyboard-Only Testing · Screen Reader Testing (NVDA/VoiceOver) · Heading & Form Checks · Color Contrast Ratios · Automated Lighthouse Audits · Accessibility Checklist',
  `<div class="intro-box">Welcome to <strong>Phase 10 (Chapter 27): Accessibility Testing</strong>! Audit and verify that web pages meet WCAG 2.2 accessibility standards.</div>
  <div class="section-title"><span class="num">1</span>Subchapters Covered</div>
  <div class="section-body">
    <ul>
      <li><strong>Keyboard-only Testing:</strong> Navigating the entire application using Tab, Shift+Tab, Enter, and Spacebar.</li>
      <li><strong>Screen Reader Testing:</strong> Testing real screen reader announcements using NVDA, VoiceOver, or Orca.</li>
      <li><strong>Browser DevTools:</strong> Inspecting accessibility trees in Chrome/Firefox DevTools.</li>
      <li><strong>Audit Checklist:</strong> Checking heading hierarchy, explicit form labels, 4.5:1 color contrast ratios, focus rings, missing alt text, and running automated Lighthouse audits.</li>
    </ul>
    <div class="code-block">
      <div class="code-block-header"><span class="lang-tag">HTML — Accessible Focus CSS Example</span><a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a></div>
      <pre><code>&lt;style&gt;
  /* Ensure focus rings are visually distinct for keyboard users */
  button:focus-visible, a:focus-visible {
    outline: 3px solid #f97316;
    outline-offset: 2px;
  }
&lt;/style&gt;
&lt;button&gt;Focusable Button&lt;/button&gt;</code></pre>
    </div>
  </div>`,
  '26-aria.html', '26. ARIA',
  '28-web-storage.html', '28. Web Storage'
);

console.log('\n🎉 PART 2 (CHAPTERS 16 TO 27) GENERATED SUCCESSFULLY!');
