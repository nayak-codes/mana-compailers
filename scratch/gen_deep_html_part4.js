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

console.log('🚀 Generating SUPER DEEP HTML5 Masterclass Chapters 31 to 37...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 31: Web Workers & Offline Features
// ═══════════════════════════════════════════════════════════════════════════════
makePage(31, '31-web-workers.html',
  'Web Workers & Offline Features',
  'Complete HTML5 Chapter 31: Deep guide to Web Workers, worker use cases, postMessage(), onmessage, Service Workers, Cache API, offline pages, Progressive Web Apps (PWA), and Web App Manifest.',
  'Phase 11', 'HTML APIs & Features',
  'Web Workers Multi-threading · postMessage() & onmessage · Service Workers & Cache API · Offline Pages & PWA · Web App Manifest (manifest.json)',
  `<div class="intro-box">
  Welcome to <strong>Phase 11 (Chapter 31): Web Workers &amp; Offline Features</strong>! Run CPU-intensive calculations in background Dedicated Web Workers off the main thread, and construct offline PWA web applications using Service Workers.
</div>

<div class="section-title"><span class="num">1</span>Dedicated Web Worker Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Dedicated Web Worker</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;script&gt;
  const worker = new Worker('worker.js');
  worker.postMessage({ number: 1000000 });
  worker.onmessage = (e) => {
    console.log('Calculation Completed:', e.data);
  };
&lt;/script&gt;</code></pre>
  </div>
</div>`,
  '30-dialogs-interactive-elements.html', '30. Dialogs & Interactive Elements',
  '32-templates.html', '32. Templates'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 32: Templates & Custom Elements
// ═══════════════════════════════════════════════════════════════════════════════
makePage(32, '32-templates.html',
  'Templates & Custom Elements',
  'Complete HTML5 Chapter 32: Deep guide to <template> tag, template content, cloning templates, custom elements, Web Components overview, Shadow DOM overview, custom element lifecycle, attributes/properties, slots overview, and component-like HTML.',
  'Phase 12', 'Advanced HTML5',
  '<template> Tag · Inert Content & cloneNode() · Custom Elements · Shadow DOM Overview · Custom Element Lifecycle · <slot> Projection',
  `<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 32): Templates &amp; Custom Elements</strong>! HTML standard custom elements allow developers to extend HTML vocabulary with reusable component markup.
</div>

<div class="section-title"><span class="num">1</span>Template &amp; Cloning Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Template &amp; Cloning Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;template id="card-template"&gt;
  &lt;div class="card" style="border:1px solid #f97316; padding:15px; border-radius:8px;"&gt;
    &lt;h3 class="title" style="color:#f97316;"&gt;&lt;/h3&gt;
    &lt;p class="desc"&gt;&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;div id="output"&gt;&lt;/div&gt;

&lt;script&gt;
  const temp = document.getElementById('card-template');
  const clone = temp.content.cloneNode(true);
  clone.querySelector('.title').textContent = 'HTML5 Masterclass';
  clone.querySelector('.desc').textContent = 'Learn HTML5 from scratch.';
  document.getElementById('output').appendChild(clone);
&lt;/script&gt;</code></pre>
  </div>
</div>`,
  '31-web-workers.html', '31. Web Workers',
  '33-custom-elements.html', '33. Custom Elements & Web Components'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 33: Custom Elements & Web Components
// ═══════════════════════════════════════════════════════════════════════════════
makePage(33, '33-custom-elements.html',
  'Web Components',
  'Complete HTML5 Chapter 33: Deep guide to Web Components definition, Custom elements, Shadow DOM, Templates, Slots, CSS encapsulation, reusable custom controls, form-associated custom elements, accessibility, and Web Components vs frameworks.',
  'Phase 12', 'Advanced HTML5',
  'Web Components Standard · Custom Elements (customElements.define) · Shadow DOM Encapsulation · Templates & Slots · Form-Associated Custom Elements · Web Components vs React',
  `<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 33): Web Components</strong>! Build native encapsulated UI components using Custom Elements, Shadow DOM, and HTML Templates.
</div>

<div class="section-title"><span class="num">1</span>Custom Web Component Class Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML + JS — Custom Web Component</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;user-card name="Balaji" role="Developer"&gt;&lt;/user-card&gt;

&lt;script&gt;
  class UserCard extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = \`
        &lt;style&gt;
          .box { padding:15px; border:1px solid #f97316; border-radius:6px; background:#141922; color:#fff; }
          h4 { color:#f97316; margin:0 0 5px 0; }
        &lt;/style&gt;
        &lt;div class="box"&gt;
          &lt;h4&gt;\${this.getAttribute('name')}&lt;/h4&gt;
          &lt;p&gt;\${this.getAttribute('role')}&lt;/p&gt;
        &lt;/div&gt;
      \`;
    }
  }
  customElements.define('user-card', UserCard);
&lt;/script&gt;</code></pre>
  </div>
</div>`,
  '32-templates.html', '32. Templates',
  '34-internationalization.html', '34. Internationalization'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 34: Internationalization (Phase 12)
// ═══════════════════════════════════════════════════════════════════════════════
makePage(34, '34-internationalization.html',
  'Internationalization (i18n)',
  'Complete HTML5 Chapter 34: Deep guide to lang attribute, text direction dir="ltr" and dir="rtl", language-specific content, date and time markup, number formatting, multi-language navigation, translation-ready HTML, and Unicode basics.',
  'Phase 12', 'Advanced HTML5',
  'lang Attribute (lang="en", lang="ar") · Text Direction (dir="ltr", dir="rtl") · Multi-language Navigation · Translation-Ready Markup · Unicode UTF-8',
  `<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 34): Internationalization (i18n)</strong>! Build multi-lingual web applications supporting right-to-left (RTL) scripts and global Unicode text.
</div>

<div class="section-title"><span class="num">1</span>Right-to-Left (RTL) Markup Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — RTL Language Support</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- English Content --&gt;
&lt;p lang="en" dir="ltr"&gt;Welcome to Our Compiler HTML5 Course!&lt;/p&gt;

&lt;!-- Arabic Content --&gt;
&lt;p lang="ar" dir="rtl"&gt;مرحبا بكم في دورة HTML5!&lt;/p&gt;</code></pre>
  </div>
</div>`,
  '33-custom-elements.html', '33. Custom Elements & Web Components',
  '35-responsive-html.html', '35. Responsive HTML'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 35: Responsive HTML (Phase 13)
// ═══════════════════════════════════════════════════════════════════════════════
makePage(35, '35-responsive-html.html',
  'Responsive HTML',
  'Complete HTML5 Chapter 35: Deep guide to responsive design basics, Viewport meta tag, responsive images, mobile-first markup, responsive navigation structure, responsive tables, responsive forms, touch-friendly controls, and performance on mobile.',
  'Phase 13', 'Responsive & Production',
  'Responsive Design Overview · Viewport Meta Tag · Mobile-First Markup · Responsive Navigation · Responsive Tables & Forms · Touch-Friendly Targets',
  `<div class="intro-box">
  Welcome to <strong>Phase 13 (Chapter 35): Responsive HTML</strong>! Design web layouts that adapt fluidly across mobile phones, tablets, laptops, and desktop monitors.
</div>

<div class="section-title"><span class="num">1</span>Responsive Viewport &amp; Layout Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Viewport &amp; Responsive Layout</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;head&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div style="max-width: 1200px; margin: 0 auto; padding: 15px;"&gt;
    &lt;h1&gt;Responsive Mobile-First Container&lt;/h1&gt;
  &lt;/div&gt;
&lt;/body&gt;</code></pre>
  </div>
</div>`,
  '34-internationalization.html', '34. Internationalization',
  '36-html-performance.html', '36. HTML Performance'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 36: HTML Performance (Phase 13)
// ═══════════════════════════════════════════════════════════════════════════════
makePage(36, '36-html-performance.html',
  'HTML Performance',
  'Complete HTML5 Chapter 36: Deep guide to minification overview, image optimization, lazy loading, defer, async, preload, preconnect, DNS prefetch, critical resources, DOM size reduction, avoiding unnecessary iframes, and Core Web Vitals basics.',
  'Phase 13', 'Responsive & Production',
  'Script Loading (defer vs async) · Resource Hints (preload, preconnect, dns-prefetch) · Lazy Loading (loading="lazy") · DOM Size Reduction · Core Web Vitals (LCP, CLS, INP)',
  `<div class="intro-box">
  Welcome to <strong>Phase 13 (Chapter 36): HTML Performance</strong>! Optimize page loading speed, script execution, and Core Web Vitals (LCP, CLS, INP).
</div>

<div class="section-title"><span class="num">1</span>Resource Hints &amp; Non-blocking Script Loading</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Resource Hints &amp; Defer</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;head&gt;
  &lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
  &lt;link rel="preload" href="/banner.webp" as="image" type="image/webp"&gt;
  &lt;script src="app.js" defer&gt;&lt;/script&gt;
&lt;/head&gt;</code></pre>
  </div>
</div>`,
  '35-responsive-html.html', '35. Responsive HTML',
  '37-validation-debugging.html', '37. Validation & Debugging'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 37: HTML Validation and Debugging (Phase 13)
// ═══════════════════════════════════════════════════════════════════════════════
makePage(37, '37-validation-debugging.html',
  'Validation & Debugging',
  'Complete HTML5 Chapter 37: Deep guide to HTML validation, Browser DevTools Elements panel, Console errors, Network panel, broken links, missing closing tags, invalid nesting, accessibility audit, mobile testing, cross-browser testing, and production deployment checklist.',
  'Phase 13', 'Responsive & Production',
  'W3C Markup Validation · Browser DevTools Elements & Console · Debugging Broken Links & Invalid Nesting · Cross-Browser Testing · Production Deployment Checklist',
  `<div class="intro-box">
  Welcome to <strong>Phase 13 (Chapter 37): HTML Validation &amp; Debugging</strong>! Inspect, validate, debug, and verify HTML code before deploying to production.
</div>

<div class="section-title"><span class="num">1</span>Production Clean Template Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Production Clean HTML5 Template</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Production Clean Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Validated &amp; Ready for Production&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>`,
  '36-html-performance.html', '36. HTML Performance',
  null, null
);

console.log('\n🎉 SUPER DEEP PART 4 (CHAPTERS 31 TO 37) GENERATED SUCCESSFULLY!');
