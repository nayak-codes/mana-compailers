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
      <!-- Phase 01: HTML Introduction -->
      <button class="accordion-header ${activeNum <= 2 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🚀</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 01</span>
            <span class="phase-title">HTML Introduction</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">2 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum <= 2 ? 'open' : ''}">
        <a href="/blog-html/01-what-is-html-introduction-to-html.html" class="${activeNum === 1 ? 'active' : ''}">1. What is HTML? Introduction</a>
        <a href="/blog-html/02-your-first-html-page.html" class="${activeNum === 2 ? 'active' : ''}">2. Your First HTML Page</a>
      </div>

      <!-- Phase 02: HTML Syntax and Text -->
      <button class="accordion-header ${activeNum >= 3 && activeNum <= 5 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📝</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 02</span>
            <span class="phase-title">HTML Syntax &amp; Text</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">3 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 3 && activeNum <= 5 ? 'open' : ''}">
        <a href="/blog-html/03-html-elements-and-tags-attributes.html" class="${activeNum === 3 ? 'active' : ''}">3. Elements, Tags &amp; Attributes</a>
        <a href="/blog-html/04-html-headings-paragraphs-and-formatting.html" class="${activeNum === 4 ? 'active' : ''}">4. Headings, Paragraphs &amp; Formatting</a>
        <a href="/blog-html/05-html-code-and-technical-text-formatting.html" class="${activeNum === 5 ? 'active' : ''}">5. Code &amp; Technical Text</a>
      </div>

      <!-- Phase 03: Links and Navigation -->
      <button class="accordion-header ${activeNum >= 6 && activeNum <= 7 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔗</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 03</span>
            <span class="phase-title">Links &amp; Navigation</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">2 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 6 && activeNum <= 7 ? 'open' : ''}">
        <a href="/blog-html/06-html-links-and-anchor-elements.html" class="${activeNum === 6 ? 'active' : ''}">6. Links &amp; Anchor Elements</a>
        <a href="/blog-html/07-html-navigation-menus-and-nav-tag.html" class="${activeNum === 7 ? 'active' : ''}">7. Navigation Menus &amp; &lt;nav&gt;</a>
      </div>

      <!-- Phase 04: Lists and Tables -->
      <button class="accordion-header ${activeNum >= 8 && activeNum <= 9 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📊</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 04</span>
            <span class="phase-title">Lists &amp; Tables</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">2 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 8 && activeNum <= 9 ? 'open' : ''}">
        <a href="/blog-html/08-html-lists-unordered-ordered-description.html" class="${activeNum === 8 ? 'active' : ''}">8. Unordered, Ordered &amp; Description Lists</a>
        <a href="/blog-html/09-html-tables-structured-data-accessibility.html" class="${activeNum === 9 ? 'active' : ''}">9. Tables &amp; Structured Data</a>
      </div>

      <!-- Phase 05: Images and Graphics -->
      <button class="accordion-header ${activeNum >= 10 && activeNum <= 12 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🖼️</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 05</span>
            <span class="phase-title">Images &amp; Graphics</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">3 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 10 && activeNum <= 12 ? 'open' : ''}">
        <a href="/blog-html/10-html-images-tag-attributes-figures.html" class="${activeNum === 10 ? 'active' : ''}">10. Images, Alt Text &amp; Figures</a>
        <a href="/blog-html/11-html-responsive-images-picture-srcset.html" class="${activeNum === 11 ? 'active' : ''}">11. Responsive Images &amp; &lt;picture&gt;</a>
        <a href="/blog-html/12-html-svg-and-canvas-graphics.html" class="${activeNum === 12 ? 'active' : ''}">12. SVG &amp; Canvas Graphics</a>
      </div>

      <!-- Phase 06: Semantic HTML5 -->
      <button class="accordion-header ${activeNum >= 13 && activeNum <= 14 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🏗️</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 06</span>
            <span class="phase-title">Semantic HTML5</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">2 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 13 && activeNum <= 14 ? 'open' : ''}">
        <a href="/blog-html/13-html-semantic-elements-layout.html" class="${activeNum === 13 ? 'active' : ''}">13. Semantic Elements &amp; Layout</a>
        <a href="/blog-html/14-html-page-layout-structure-landmarks.html" class="${activeNum === 14 ? 'active' : ''}">14. Page Layout Structure &amp; Landmarks</a>
      </div>

      <!-- Phase 07: Forms -->
      <button class="accordion-header ${activeNum >= 15 && activeNum <= 18 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📋</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 07</span>
            <span class="phase-title">Forms &amp; Input Controls</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">4 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 15 && activeNum <= 18 ? 'open' : ''}">
        <a href="/blog-html/15-html-forms-basics-form-element-action-method.html" class="${activeNum === 15 ? 'active' : ''}">15. Forms Basics (action, method)</a>
        <a href="/blog-html/16-html-form-input-types-reference.html" class="${activeNum === 16 ? 'active' : ''}">16. Input Types Reference</a>
        <a href="/blog-html/17-html-form-attributes-reference.html" class="${activeNum === 17 ? 'active' : ''}">17. Form Attributes Reference</a>
        <a href="/blog-html/18-html-form-native-validation-validity-api.html" class="${activeNum === 18 ? 'active' : ''}">18. Native Validation &amp; Validity API</a>
      </div>

      <!-- Phase 08: Audio and Video -->
      <button class="accordion-header ${activeNum >= 19 && activeNum <= 21 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🎬</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 08</span>
            <span class="phase-title">Audio, Video &amp; Embeds</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">3 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 19 && activeNum <= 21 ? 'open' : ''}">
        <a href="/blog-html/19-html-audio-element-audio-api.html" class="${activeNum === 19 ? 'active' : ''}">19. Audio Element &amp; Audio API</a>
        <a href="/blog-html/20-html-video-element-track-subtitles.html" class="${activeNum === 20 ? 'active' : ''}">20. Video Element &amp; Subtitles</a>
        <a href="/blog-html/21-html-embedded-content-iframes-security.html" class="${activeNum === 21 ? 'active' : ''}">21. Embedded Content &amp; IFrames</a>
      </div>

      <!-- Phase 09: Advanced Web APIs -->
      <button class="accordion-header ${activeNum >= 22 && activeNum <= 25 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚡</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 09</span>
            <span class="phase-title">HTML5 Advanced APIs</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">4 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 22 && activeNum <= 25 ? 'open' : ''}">
        <a href="/blog-html/22-html-web-storage-localstorage-sessionstorage.html" class="${activeNum === 22 ? 'active' : ''}">22. Web Storage (localStorage, sessionStorage)</a>
        <a href="/blog-html/23-html-geolocation-api-user-location.html" class="${activeNum === 23 ? 'active' : ''}">23. Geolocation API &amp; Location</a>
        <a href="/blog-html/24-html-drag-and-drop-api-native-dnd.html" class="${activeNum === 24 ? 'active' : ''}">24. Drag &amp; Drop API</a>
        <a href="/blog-html/25-html-web-workers-service-workers-pwa-basics.html" class="${activeNum === 25 ? 'active' : ''}">25. Web Workers &amp; Service Workers</a>
      </div>

      <!-- Phase 10: Accessibility (a11y) -->
      <button class="accordion-header ${activeNum >= 26 && activeNum <= 27 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">♿</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 10</span>
            <span class="phase-title">Accessibility &amp; WAI-ARIA</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">2 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 26 && activeNum <= 27 ? 'open' : ''}">
        <a href="/blog-html/26-html-accessibility-a11y-wcag-guidelines.html" class="${activeNum === 26 ? 'active' : ''}">26. Accessibility &amp; WCAG Principles</a>
        <a href="/blog-html/27-html-wai-aria-roles-states-properties.html" class="${activeNum === 27 ? 'active' : ''}">27. WAI-ARIA Roles, States &amp; Props</a>
      </div>

      <!-- Phase 11: SEO & Metadata -->
      <button class="accordion-header ${activeNum >= 28 && activeNum <= 29 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔍</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 11</span>
            <span class="phase-title">SEO &amp; Metadata</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">2 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 28 && activeNum <= 29 ? 'open' : ''}">
        <a href="/blog-html/28-html-seo-metadata-head-tags.html" class="${activeNum === 28 ? 'active' : ''}">28. SEO Metadata &amp; Head Tags</a>
        <a href="/blog-html/29-html-open-graph-social-meta-schema-org.html" class="${activeNum === 29 ? 'active' : ''}">29. Open Graph &amp; Schema.org JSON-LD</a>
      </div>

      <!-- Phase 12: Web Components -->
      <button class="accordion-header ${activeNum >= 30 && activeNum <= 31 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🧩</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 12</span>
            <span class="phase-title">Web Components</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">2 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum >= 30 && activeNum <= 31 ? 'open' : ''}">
        <a href="/blog-html/30-html-web-components-custom-elements-shadow-dom.html" class="${activeNum === 30 ? 'active' : ''}">30. Custom Elements &amp; Shadow DOM</a>
        <a href="/blog-html/31-html-templates-slots-shadow-dom.html" class="${activeNum === 31 ? 'active' : ''}">31. HTML Templates &amp; Slots</a>
      </div>

      <!-- Phase 13: Performance -->
      <button class="accordion-header ${activeNum === 32 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🚀</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 13</span>
            <span class="phase-title">HTML Performance</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">1 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </button>
      <div class="accordion-content ${activeNum === 32 ? 'open' : ''}">
        <a href="/blog-html/32-html-performance-resource-hints-lazy-loading.html" class="${activeNum === 32 ? 'active' : ''}">32. Resource Hints &amp; Performance</a>
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
      <span class="badge">🟢 Chapter ${chNum} of 32</span>
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

console.log('🚀 Generating 100% Pure English HTML5 Masterclass Chapters 1 to 5 (with escaping & full 32 sidebar)...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 01: What is HTML?
// ═══════════════════════════════════════════════════════════════════════════════
const c01 = `
<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 01): What is HTML? Introduction to HTML</strong>! In this foundational lesson, you will master what HTML actually is, its full form, how HTML compares with CSS and JavaScript, how browsers parse HTML documents into the DOM (Document Object Model), HTML tags vs elements vs attributes, and HTML5 modern features.
</div>

<div class="section-title"><span class="num">1</span>HTML Definition &amp; The Web Trio</div>
<div class="section-body">
  <p><strong>HTML</strong> stands for <strong>HyperText Markup Language</strong>. It is the universal standard markup language used to structure content on web pages.</p>
  
  <table class="tbl spec-table">
    <thead><tr><th>Technology</th><th>Role &amp; Responsibility</th><th>Human Body Analogy</th></tr></thead>
    <tbody>
      <tr><td><strong>HTML</strong></td><td>Provides document structure, headings, paragraphs, forms, and semantic content.</td><td>Skeleton (Bones &amp; Structure)</td></tr>
      <tr><td><strong>CSS</strong></td><td>Controls visual styling, colors, typography, flexbox/grid layouts, and animations.</td><td>Skin, Clothes &amp; Aesthetics</td></tr>
      <tr><td><strong>JavaScript</strong></td><td>Handles interactive logic, API requests, state management, and dynamic behavior.</td><td>Muscles &amp; Brain Actions</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>How Browsers Process HTML (DOM Parsing)</div>
<div class="section-body">
  <p>When you navigate to a URL, the web browser receives raw bytes of HTML text over the network and parses it into a tree structure called the <strong>DOM (Document Object Model)</strong>:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Basic Structure</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;My First HTML Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Welcome to HTML5&lt;/h1&gt;
  &lt;p&gt;HTML structures web content.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Is HTML a programming language?</h4>
    <p>No. HTML is a <strong>markup language</strong> used to structure data and define elements on a page. Programming languages require logic control flow (loops, variables, conditionals) which are handled by JavaScript.</p>
  </div>
</div>`;

makePage(1, '01-what-is-html-introduction-to-html.html',
  'What is HTML? Introduction to HTML (Full Form, Web Trio, DOM Parsing)',
  'Complete HTML5 Chapter 1: Learn HTML full form, HTML vs CSS vs JavaScript, webpage structure role, browser DOM parsing, elements, tags, attributes, and HTML5 features.',
  'Phase 01', 'HTML Introduction',
  'HTML Definition · Full Form · HTML vs CSS vs JS · Webpage Role · DOM Parsing · Elements vs Tags · Attributes · HTML5 Features',
  c01,
  null, null,
  '02-your-first-html-page.html', '2. Your First HTML Page'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 02: Your First HTML Page
// ═══════════════════════════════════════════════════════════════════════════════
const c02 = `
<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 02): Your First HTML Page</strong>! In this lesson, we build a complete HTML file from scratch. We master the <code>&lt;!DOCTYPE html&gt;</code> declaration, root <code>&lt;html&gt;</code> element, document <code>&lt;head&gt;</code>, visible <code>&lt;body&gt;</code>, page <code>&lt;title&gt;</code>, charset metadata, opening in browsers, Live Server setup, comments, indentation conventions, and W3C validation.
</div>

<div class="section-title"><span class="num">1</span>HTML5 Standard Boilerplate Anatomy</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Complete Boilerplate</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My First HTML Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- Main Content Heading --&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
  &lt;p&gt;This is my very first webpage built with HTML5.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is &lt;!DOCTYPE html&gt; required at line 1?</h4>
    <p>The DOCTYPE declaration informs the web browser that the document is written in modern HTML5 standards, preventing the browser from switching to legacy "quirks mode".</p>
  </div>
</div>`;

makePage(2, '02-your-first-html-page.html',
  'Your First HTML Page (Boilerplate, Doctype, Head, Body, Comments)',
  'Complete HTML5 Chapter 2: Create your first .html file, learn <!DOCTYPE html>, <html>, <head>, <body>, <title>, <meta charset>, opening in browser, Live Server, comments, and W3C validation.',
  'Phase 01', 'HTML Introduction',
  'Creating .html File · <!DOCTYPE html> · <html> · <head> · <body> · <title> · <meta charset> · Live Server · Comments · Indentation · Validation',
  c02,
  '01-what-is-html-introduction-to-html.html', '1. What is HTML? Introduction',
  '03-html-elements-and-tags-attributes.html', '3. Elements, Tags & Attributes'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 03: Elements, Tags & Attributes
// ═══════════════════════════════════════════════════════════════════════════════
const c03 = `
<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 03): HTML Elements, Tags &amp; Attributes</strong>! In this lesson, we master opening and closing tags, nested parent/child relationships, void (self-closing) elements, attribute key-value pairs, boolean attributes, and universal global attributes (<code>id</code>, <code>class</code>, <code>style</code>, <code>title</code>).
</div>

<div class="section-title"><span class="num">1</span>Tags vs Elements vs Attributes</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Element Structure</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- 
  Tag: &lt;p&gt; and &lt;/p&gt;
  Attribute: class="highlight"
  Content: Hello World
  Entire Element: &lt;p class="highlight"&gt;Hello World&lt;/p&gt;
--&gt;
&lt;p class="highlight" id="intro"&gt;Hello World&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What are Void Elements?</h4>
    <p>Void elements are tags that do not contain any child text or closing tags (e.g., <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;meta&gt;</code>).</p>
  </div>
</div>`;

makePage(3, '03-html-elements-and-tags-attributes.html',
  'HTML Elements, Tags & Attributes (Nesting, Void Tags, Global Attributes)',
  'Complete HTML5 Chapter 3: Learn opening and closing tags, nested elements, void self-closing elements, attributes, boolean attributes, and global attributes id, class, style.',
  'Phase 02', 'HTML Syntax & Text',
  'Opening/Closing Tags · Nested Elements · Void Elements (img, input, br) · Attributes · Boolean Attributes · Global Attributes (id, class, style)',
  c03,
  '02-your-first-html-page.html', '2. Your First HTML Page',
  '04-html-headings-paragraphs-and-formatting.html', '4. Headings, Paragraphs & Formatting'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 04: Headings & Paragraphs
// ═══════════════════════════════════════════════════════════════════════════════
const c04 = `
<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 04): Headings, Paragraphs &amp; Text Formatting</strong>! In this lesson, we master heading hierarchy (<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>), paragraph structure (<code>&lt;p&gt;</code>), line breaks (<code>&lt;br&gt;</code>), horizontal dividers (<code>&lt;hr&gt;</code>), strong emphasis (<code>&lt;strong&gt;</code> vs <code>&lt;b&gt;</code>), italics (<code>&lt;em&gt;</code> vs <code>&lt;i&gt;</code>), highlighted text (<code>&lt;mark&gt;</code>), subscript/superscript (<code>&lt;sub&gt;</code>/<code>&lt;sup&gt;</code>), block quotes (<code>&lt;blockquote&gt;</code>), inline quotes (<code>&lt;q&gt;</code>), abbreviations (<code>&lt;abbr&gt;</code>), and semantic time tags (<code>&lt;time&gt;</code>).
</div>

<div class="section-title"><span class="num">1</span>Headings Hierarchy &amp; Text Formatting Tags</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Headings &amp; Text Formatting</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;h1&gt;Main Heading (H1)&lt;/h1&gt;
&lt;h2&gt;Subheading (H2)&lt;/h2&gt;

&lt;p&gt;This is &lt;strong&gt;important bold text&lt;/strong&gt; and &lt;em&gt;emphasized italic text&lt;/em&gt;.&lt;/p&gt;
&lt;p&gt;Water chemical formula: H&lt;sub&gt;2&lt;/sub&gt;O. Einstein equation: E = mc&lt;sup&gt;2&lt;/sup&gt;.&lt;/p&gt;
&lt;p&gt;&lt;mark&gt;Highlighted search text&lt;/mark&gt;&lt;/p&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between &lt;strong&gt; and &lt;b&gt;?</h4>
    <p><code>&lt;strong&gt;</code> conveys semantic importance to screen readers, while <code>&lt;b&gt;</code> simply applies visual bold styling without adding semantic weight.</p>
  </div>
</div>`;

makePage(4, '04-html-headings-paragraphs-and-formatting.html',
  'HTML Headings, Paragraphs & Text Formatting (<h1>-<h6>, <p>, <strong>, <em>)',
  'Complete HTML5 Chapter 4: Learn headings h1 to h6, paragraph p, line breaks br, hr, strong vs b, em vs i, mark, sub, sup, blockquote, q, abbr, and time tags.',
  'Phase 02', 'HTML Syntax & Text',
  'Headings <h1>-<h6> · <p> · <br> · <hr> · <strong> vs <b> · <em> vs <i> · <mark> · <sub>/<sup> · <blockquote> · <q> · <abbr> · <time>',
  c04,
  '03-html-elements-and-tags-attributes.html', '3. Elements, Tags & Attributes',
  '05-html-code-and-technical-text-formatting.html', '5. Code & Technical Text'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 05: Code & Technical Text
// ═══════════════════════════════════════════════════════════════════════════════
const c05 = `
<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 05): Code &amp; Technical Text Formatting</strong>! In this lesson, we master displaying technical source code cleanly: inline code (<code>&lt;code&gt;</code>), multi-line preformatted code blocks (<code>&lt;pre&gt;&lt;code&gt;</code>), keyboard input keys (<code>&lt;kbd&gt;</code>), sample terminal output (<code>&lt;samp&gt;</code>), variables (<code>&lt;var&gt;</code>), and escaping special HTML characters (<code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;amp;</code>).
</div>

<div class="section-title"><span class="num">1</span>Code Blocks &amp; Keyboard Input Formatting</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Technical Code Formatting</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;p&gt;Press &lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;C&lt;/kbd&gt; to copy.&lt;/p&gt;

&lt;!-- Preformatted Code Block --&gt;
&lt;pre&gt;&lt;code&gt;function greet(name) {
  console.log("Hello, " + name);
}&lt;/code&gt;&lt;/pre&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why must I escape &lt; and &gt; in code examples?</h4>
    <p>If you write raw <code>&lt;div&gt;</code> inside HTML prose, the browser parser will try to open a real DOM node. Escaping it as <code>&amp;lt;div&amp;gt;</code> renders literal text on screen safely.</p>
  </div>
</div>`;

makePage(5, '05-html-code-and-technical-text-formatting.html',
  'Code & Technical Text Formatting (<code>, <pre>, <kbd>, <samp>, Entities)',
  'Complete HTML5 Chapter 5: Learn inline code <code>, preformatted blocks <pre><code>, keyboard input <kbd>, sample output <samp>, variables <var>, and HTML entity escaping.',
  'Phase 02', 'HTML Syntax & Text',
  'Inline Code <code> · Multi-line <pre><code> · Keyboard Input <kbd> · Terminal Output <samp> · Variables <var> · HTML Entity Escaping (&lt;, &gt;, &amp;)',
  c05,
  '04-html-headings-paragraphs-and-formatting.html', '4. Headings, Paragraphs & Formatting',
  '06-html-links-and-anchor-elements.html', '6. Links & Anchor Elements'
);

console.log('\n🎉 ALL HTML5 PHASES 1 & 2 (CHAPTERS 1 TO 5) RE-GENERATED WITH ESCAPED TITLES & FULL 32 SIDEBAR!');
