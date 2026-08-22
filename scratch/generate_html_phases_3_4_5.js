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

console.log('🚀 Generating HTML5 Masterclass Chapters 6 to 12 (with HTML entity escaping & full 32 sidebar)...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 06: Links & Anchor Elements
// ═══════════════════════════════════════════════════════════════════════════════
const c06 = `
<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 06): Links &amp; Anchor Elements</strong>! The <code>&lt;a&gt;</code> element forms the connective backbone of the World Wide Web. In this chapter, we master anchor elements, <code>href</code> targets, internal vs external navigation, absolute vs relative paths, protocol links (<code>mailto:</code>, <code>tel:</code>, <code>download</code>), opening new tabs securely with <code>target="_blank"</code> and <code>rel="noopener"</code>, link accessibility, and fragment internal page jumps.
</div>

<div class="section-title"><span class="num">1</span>Anchor Tag Syntax &amp; Absolute vs Relative URLs</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Links Showcase</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Internal Relative Link --&gt;
&lt;a href="/about.html"&gt;About Us&lt;/a&gt;

&lt;!-- External Link in New Tab (Secure) --&gt;
&lt;a href="https://example.com" target="_blank" rel="noopener"&gt;Visit External Site&lt;/a&gt;

&lt;!-- Protocol Special Links --&gt;
&lt;a href="mailto:support@ourcompiler.com"&gt;Email Support&lt;/a&gt;
&lt;a href="tel:+18005550199"&gt;Call Toll-Free&lt;/a&gt;
&lt;a href="/docs/guide.pdf" download="HTML5-Guide.pdf"&gt;Download PDF Guide&lt;/a&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is rel="noopener" mandatory when using target="_blank"?</h4>
    <p>Opening links with <code>target="_blank"</code> without <code>rel="noopener"</code> allows the new tab to access your original window via JavaScript (<code>window.opener</code>), introducing security risks like reverse tabnabbing phishing attacks.</p>
  </div>
</div>`;

makePage(6, '06-html-links-and-anchor-elements.html',
  'Links & Anchor Elements (<a>, href, target="_blank", rel="noopener")',
  'Complete HTML5 Chapter 6: Learn anchor tags, href attribute, internal vs external links, absolute vs relative URLs, mailto, tel, download links, target="_blank", rel="noopener", and fragment links.',
  'Phase 03', 'Links & Navigation',
  'Anchor Element <a> · href Attribute · Absolute vs Relative URLs · Email & Telephone Links · Download Links · target="_blank" & rel="noopener" · Fragment Anchors',
  c06,
  '05-html-code-and-technical-text-formatting.html', '5. Code & Technical Text',
  '07-html-navigation-menus-and-nav-tag.html', '7. Navigation Menus & <nav>'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 07: Navigation Menus & <nav>
// ═══════════════════════════════════════════════════════════════════════════════
const c07 = `
<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 07): Navigation Menus &amp; &lt;nav&gt; Tag</strong>! Modern websites use structured navigation bars. In this chapter, we master semantic <code>&lt;nav&gt;</code> element wrappers, list-based navigation, marking active page links (<code>aria-current="page"</code>), breadcrumbs, skip navigation links, mobile menu structures, and accessible dropdown markup.
</div>

<div class="section-title"><span class="num">1</span>Semantic Navigation Menu Structure</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Semantic Navigation Menu</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;nav aria-label="Primary Navigation"&gt;
  &lt;ul style="display:flex; gap:15px; list-style:none;"&gt;
    &lt;li&gt;&lt;a href="/" aria-current="page"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/tutorials"&gt;Tutorials&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href="/contact"&gt;Contact&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why wrap navigation links inside an unordered list (&lt;ul&gt;)?</h4>
    <p>Wrapping links in <code>&lt;ul&gt;</code> provides screen readers with explicit structural feedback, announcing the total number of navigation items to visually impaired users.</p>
  </div>
</div>`;

makePage(7, '07-html-navigation-menus-and-nav-tag.html',
  'Navigation Menus & <nav> Tag (Breadcrumbs, Active State, Skip Links)',
  'Complete HTML5 Chapter 7: Learn semantic <nav> tag, list navigation structure, active link indicators, breadcrumbs, sidebar navigation, skip navigation links, and dropdown menu markup.',
  'Phase 03', 'Links & Navigation',
  'Semantic <nav> Tag · List Navigation Structure · Active Link State (aria-current) · Breadcrumbs · Skip Navigation Links · Accessible Dropdown Markup',
  c07,
  '06-html-links-and-anchor-elements.html', '6. Links & Anchor Elements',
  '08-html-lists-unordered-ordered-description.html', '8. Unordered, Ordered & Description Lists'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 08: Unordered, Ordered & Description Lists
// ═══════════════════════════════════════════════════════════════════════════════
const c08 = `
<div class="intro-box">
  Welcome to <strong>Phase 4 (Chapter 08): Lists</strong>! HTML lists group related items together. In this chapter, we master unordered bullet lists (<code>&lt;ul&gt;</code>), ordered numbered lists (<code>&lt;ol&gt;</code>), key-value description lists (<code>&lt;dl&gt;</code>, <code>&lt;dt&gt;</code>, <code>&lt;dd&gt;</code>), nested multi-level lists, list attributes (<code>start</code>, <code>reversed</code>, <code>type</code>), and styling lists into navigation components.
</div>

<div class="section-title"><span class="num">1</span>List Types Showcase</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Unordered, Ordered &amp; Description Lists</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Ordered List with custom start &amp; reversed --&gt;
&lt;ol start="5" reversed&gt;
  &lt;li&gt;Fifth Item&lt;/li&gt;
  &lt;li&gt;Fourth Item&lt;/li&gt;
&lt;/ol&gt;

&lt;!-- Description List for Terms &amp; Definitions --&gt;
&lt;dl&gt;
  &lt;dt&gt;&lt;strong&gt;HTML5&lt;/strong&gt;&lt;/dt&gt;
  &lt;dd&gt;The standard markup language for web document structure.&lt;/dd&gt;
  &lt;dt&gt;&lt;strong&gt;CSS3&lt;/strong&gt;&lt;/dt&gt;
  &lt;dd&gt;The stylesheet language for web page design and visual layout.&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: When should I use Description Lists (<dl>)?</h4>
    <p>Use description lists (<code>&lt;dl&gt;</code>) for dictionary definitions, metadata key-value lists, or FAQ question-answer pairs.</p>
  </div>
</div>`;

makePage(8, '08-html-lists-unordered-ordered-description.html',
  'HTML Lists (<ul>, <ol>, <dl>, Nested Lists, Attributes)',
  'Complete HTML5 Chapter 8: Learn unordered lists <ul>, ordered lists <ol>, description lists <dl> <dt> <dd>, nested lists, list item <li>, and list attributes start, reversed, type.',
  'Phase 04', 'Lists & Tables',
  'Unordered Lists <ul> · Ordered Lists <ol> · Description Lists <dl> <dt> <dd> · Nested Lists · List Attributes (start, reversed, type) · FAQ Data Lists',
  c08,
  '07-html-navigation-menus-and-nav-tag.html', '7. Navigation Menus & <nav>',
  '09-html-tables-structured-data-accessibility.html', '9. Tables & Structured Data'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 09: Tables & Structured Data
// ═══════════════════════════════════════════════════════════════════════════════
const c09 = `
<div class="intro-box">
  Welcome to <strong>Phase 4 (Chapter 09): Tables &amp; Structured Data</strong>! HTML tables display tabular data in rows and columns. In this chapter, we master semantic table construction: <code>&lt;table&gt;</code>, <code>&lt;caption&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code>, cell merging (<code>colspan</code>, <code>rowspan</code>), header scoping (<code>scope="col"</code>), accessible table markup, and responsive table wrappers.
</div>

<div class="section-title"><span class="num">1</span>Complete Semantic HTML Table Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Semantic Data Table</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;div style="overflow-x: auto;"&gt;
  &lt;table border="1" style="border-collapse: collapse; width:100%; text-align:left;"&gt;
    &lt;caption&gt;&lt;strong&gt;Monthly Sales Report 2026&lt;/strong&gt;&lt;/caption&gt;
    &lt;thead style="background:#f97316; color:#fff;"&gt;
      &lt;tr&gt;
        &lt;th scope="col"&gt;Month&lt;/th&gt;
        &lt;th scope="col"&gt;Units Sold&lt;/th&gt;
        &lt;th scope="col"&gt;Revenue ($)&lt;/th&gt;
      &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
      &lt;tr&gt;
        &lt;td&gt;January&lt;/td&gt;
        &lt;td&gt;1,200&lt;/td&gt;
        &lt;td&gt;$24,000&lt;/td&gt;
      &lt;/tr&gt;
      &lt;tr&gt;
        &lt;td&gt;February&lt;/td&gt;
        &lt;td&gt;1,500&lt;/td&gt;
        &lt;td&gt;$30,000&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/tbody&gt;
    &lt;tfoot style="font-weight:bold;"&gt;
      &lt;tr&gt;
        &lt;td&gt;Total&lt;/td&gt;
        &lt;td&gt;2,700&lt;/td&gt;
        &lt;td&gt;$54,000&lt;/td&gt;
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
    <p>The <code>scope</code> attribute explicitly tells screen readers whether a header cell applies to a column (<code>scope="col"</code>) or a row (<code>scope="row"</code>), ensuring accessibility.</p>
  </div>
</div>`;

makePage(9, '09-html-tables-structured-data-accessibility.html',
  'HTML Tables & Structured Data (<caption>, <thead>, <tbody>, <tfoot>, colspan)',
  'Complete HTML5 Chapter 9: Learn table tags <table>, <caption>, <thead>, <tbody>, <tfoot>, cell spanning colspan and rowspan, scope="col", responsive table wrappers, and accessible table markup.',
  'Phase 04', 'Lists & Tables',
  'Table Structure <table> <thead> <tbody> <tfoot> · <caption> · Cell Spanning (colspan, rowspan) · Header Scoping (scope="col") · Responsive Tables',
  c09,
  '08-html-lists-unordered-ordered-description.html', '8. Unordered, Ordered & Description Lists',
  '10-html-images-tag-attributes-figures.html', '10. Images, Alt Text & Figures'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 10: Images, Alt Text & Figures
// ═══════════════════════════════════════════════════════════════════════════════
const c10 = `
<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 10): Images, Alt Text &amp; Figures</strong>! Images make web pages engaging. In this chapter, we master the <code>&lt;img&gt;</code> tag, <code>src</code> and <code>alt</code> attributes, visual layout stability (setting explicit <code>width</code> and <code>height</code> to prevent Cumulative Layout Shift), native lazy loading (<code>loading="lazy"</code>), self-contained figure elements (<code>&lt;figure&gt;</code>, <code>&lt;figcaption&gt;</code>), image format selection (WebP, AVIF, PNG, JPG, SVG), and decorative vs informative alt text rules.
</div>

<div class="section-title"><span class="num">1</span>Image Tag &amp; Figure Caption Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Image &amp; Figure Caption</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Image with explicit dimensions &amp; lazy loading --&gt;
&lt;figure style="text-align:center; max-width:600px; margin:auto;"&gt;
  &lt;img src="/logo.png" alt="Our Compiler Platform Logo" width="300" height="150" loading="lazy" style="max-width:100%; height:auto;"&gt;
  &lt;figcaption&gt;Figure 1.1: Official logo of Our Compiler platform.&lt;/figcaption&gt;
&lt;/figure&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why should decorative images have an empty alt="" attribute?</h4>
    <p>If an image is purely decorative (e.g., a background flourish), setting <code>alt=""</code> instructs screen readers to skip reading the image completely, avoiding unnecessary noise for visually impaired users.</p>
  </div>
</div>`;

makePage(10, '10-html-images-tag-attributes-figures.html',
  'HTML Images, Alt Text & Figures (<img>, src, alt, <figure>, <figcaption>)',
  'Complete HTML5 Chapter 10: Learn image element <img>, src and alt attributes, CLS width and height dimensions, lazy loading, <figure> and <figcaption>, and web image formats.',
  'Phase 05', 'Images & Graphics',
  'Image Element <img> · src & alt Attributes · Width & Height Dimensions · Decorative vs Meaningful Alt · Lazy Loading · <figure> & <figcaption> · Image Formats',
  c10,
  '09-html-tables-structured-data-accessibility.html', '9. Tables & Structured Data',
  '11-html-responsive-images-picture-srcset.html', '11. Responsive Images & <picture>'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 11: Responsive Images & <picture>
// ═══════════════════════════════════════════════════════════════════════════════
const c11 = `
<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 11): Responsive Images &amp; &lt;picture&gt; Element</strong>! With screens ranging from mobile phones to 4K monitors, web pages must serve responsive images. In this chapter, we master responsive image techniques, resolution switching with <code>srcset</code> width descriptors and <code>sizes</code>, art direction using the <code>&lt;picture&gt;</code> element, and serving modern WebP/AVIF images with JPEG/PNG fallbacks.
</div>

<div class="section-title"><span class="num">1</span>Resolution Switching with srcset &amp; sizes</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Responsive srcset &amp; Picture</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Resolution Switching with srcset --&gt;
&lt;img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Responsive Hero Banner"
  width="800" height="400"
  loading="lazy"
&gt;

&lt;!-- Art Direction with &lt;picture&gt; --&gt;
&lt;picture&gt;
  &lt;source media="(min-width: 1024px)" srcset="banner-desktop.webp" type="image/webp"&gt;
  &lt;source media="(min-width: 640px)" srcset="banner-tablet.webp" type="image/webp"&gt;
  &lt;img src="banner-mobile.jpg" alt="Responsive Banner"&gt;
&lt;/picture&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is Art Direction in responsive images?</h4>
    <p>Art direction means serving completely different image crops or compositions based on device screen sizes (e.g., showing a wide landscape banner on desktop, but a close-up cropped square image on mobile).</p>
  </div>
</div>`;

makePage(11, '11-html-responsive-images-picture-srcset.html',
  'Responsive Images & <picture> Element (srcset, sizes, Art Direction)',
  'Complete HTML5 Chapter 11: Learn responsive images, srcset width descriptors, sizes attribute, <picture> tag, <source> tags, art direction, and WebP/AVIF format fallbacks.',
  'Phase 05', 'Images & Graphics',
  'Responsive Images · srcset Width Descriptors · sizes Attribute · <picture> & <source> Tags · Art Direction · AVIF/WebP Format Fallbacks',
  c11,
  '10-html-images-tag-attributes-figures.html', '10. Images, Alt Text & Figures',
  '12-html-svg-and-canvas-graphics.html', '12. SVG & Canvas Graphics'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 12: SVG & Canvas Graphics
// ═══════════════════════════════════════════════════════════════════════════════
const c12 = `
<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 12): SVG &amp; Canvas Graphics</strong>! Modern web applications require vector graphics and dynamic rendering. In this chapter, we master Inline SVG (Scalable Vector Graphics), drawing SVG vector shapes (<code>&lt;svg&gt;</code>, <code>&lt;circle&gt;</code>, <code>&lt;rect&gt;</code>, <code>&lt;path&gt;</code>), SVG accessibility, 2D HTML5 <code>&lt;canvas&gt;</code> graphics, drawing shapes/text with JavaScript context, and SVG vs Canvas trade-offs.
</div>

<div class="section-title"><span class="num">1</span>Inline SVG &amp; HTML5 Canvas Comparison</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML + JS — Inline SVG &amp; 2D Canvas</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Inline SVG Scalable Vector Graphic --&gt;
&lt;svg width="100" height="100" viewBox="0 0 100 100" aria-label="Orange Circle Icon" role="img"&gt;
  &lt;circle cx="50" cy="50" r="40" fill="#f97316" stroke="#ffffff" stroke-width="4" /&gt;
&lt;/svg&gt;

&lt;!-- HTML5 Canvas Element --&gt;
&lt;canvas id="myCanvas" width="200" height="100" style="border:1px solid #333;"&gt;&lt;/canvas&gt;

&lt;script&gt;
  const canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f97316';
    ctx.fillRect(10, 10, 150, 80);
  }
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: When should I choose SVG vs Canvas?</h4>
    <p>Use <strong>SVG</strong> for scalable vector icons, logos, and UI elements that require crisp scaling and DOM event listeners. Use <strong>Canvas</strong> for high-frequency pixel rendering like 2D/3D games, charts, and video manipulations.</p>
  </div>
</div>`;

makePage(12, '12-html-svg-and-canvas-graphics.html',
  'SVG & Canvas Graphics (<svg>, <canvas>, 2D Context, Vector vs Raster)',
  'Complete HTML5 Chapter 12: Learn inline SVG shapes, SVG accessibility, HTML5 <canvas> element, 2D context drawing shapes and text, and SVG vs Canvas comparison.',
  'Phase 05', 'Images & Graphics',
  'Scalable Vector Graphics (SVG) · Inline SVG Shapes · SVG Accessibility · HTML5 <canvas> Element · 2D Rendering Context · Canvas vs SVG Comparison',
  c12,
  '11-html-responsive-images-picture-srcset.html', '11. Responsive Images & <picture>',
  '13-html-semantic-elements-layout.html', '13. Semantic Elements & Layout'
);

console.log('\n🎉 ALL HTML5 PHASES 3, 4 & 5 (CHAPTERS 6 TO 12) RE-GENERATED WITH FULL 32 SIDEBAR!');
