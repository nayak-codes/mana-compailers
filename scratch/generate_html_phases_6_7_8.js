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

console.log('🚀 Generating HTML5 Masterclass Chapters 13 to 21 (Phases 6, 7, 8)...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 13: Semantic Elements
// ═══════════════════════════════════════════════════════════════════════════════
const c13 = `
<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 13): Semantic Elements &amp; Page Layout</strong>! Semantic HTML5 elements convey exact meaning about the structure and content of a web page to browsers, search engines, and screen reader accessibility software. In this chapter, we master <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;address&gt;</code>, <code>&lt;figure&gt;</code>, <code>&lt;details&gt;</code>, <code>&lt;summary&gt;</code>, semantic layout architectures, and SEO/accessibility benefits.
</div>

<div class="section-title"><span class="num">1</span>What is Semantic HTML5? (Semantic vs Non-Semantic)</div>
<div class="section-body">
  <p><strong>Semantic Elements:</strong> Tags that clearly describe their meaning to both developer and browser (e.g., <code>&lt;header&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code>).</p>
  <p><strong>Non-Semantic Elements:</strong> Generic containers that convey zero structural meaning about their content (e.g., <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>).</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Semantic vs Non-Semantic Comparison</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- ❌ Non-Semantic Div Soup (Obsolete Practice) --&gt;
&lt;div id="header"&gt;
  &lt;div id="nav"&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!-- ✅ Modern Semantic HTML5 Layout Structure --&gt;
&lt;header&gt;
  &lt;h1&gt;Our Compiler&lt;/h1&gt;
&lt;/header&gt;

&lt;nav aria-label="Primary"&gt;
  &lt;a href="/"&gt;Home&lt;/a&gt;
  &lt;a href="/tutorials"&gt;Tutorials&lt;/a&gt;
&lt;/nav&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;HTML5 Tutorial&lt;/h2&gt;
    &lt;p&gt;Learn HTML step by step with semantic markup.&lt;/p&gt;
  &lt;/article&gt;

  &lt;aside&gt;
    &lt;h3&gt;Related Lessons&lt;/h3&gt;
    &lt;ul&gt;
      &lt;li&gt;&lt;a href="/css"&gt;CSS3 Layouts&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/aside&gt;
&lt;/main&gt;

&lt;footer&gt;
  &lt;p&gt;&amp;copy; 2026 Our Compiler. All rights reserved.&lt;/p&gt;
&lt;/footer&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Semantic Layout Tags Reference Table</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Tag</th><th>Description &amp; Use Case</th><th>ARIA Role Equivalent</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;header&gt;</code></td><td>Represents introductory content or site branding controls.</td><td><code>role="banner"</code></td></tr>
      <tr><td><code>&lt;nav&gt;</code></td><td>Container for major navigation link lists.</td><td><code>role="navigation"</code></td></tr>
      <tr><td><code>&lt;main&gt;</code></td><td>Holds the unique dominant content of the document. Only 1 per page.</td><td><code>role="main"</code></td></tr>
      <tr><td><code>&lt;article&gt;</code></td><td>Self-contained, reusable composition (blog post, news story, comment).</td><td><code>role="article"</code></td></tr>
      <tr><td><code>&lt;section&gt;</code></td><td>Standalone thematic grouping of content, typically with a heading.</td><td><code>role="region"</code></td></tr>
      <tr><td><code>&lt;aside&gt;</code></td><td>Tangentially related sidebar content (author info, related posts, ads).</td><td><code>role="complementary"</code></td></tr>
      <tr><td><code>&lt;footer&gt;</code></td><td>Footer containing copyright, sitemap links, or contact info.</td><td><code>role="contentinfo"</code></td></tr>
      <tr><td><code>&lt;details&gt; / &lt;summary&gt;</code></td><td>Native disclosure widget to toggle expandable content accordion blocks.</td><td>Native Interactive Accordion</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>Native Accordion with &lt;details&gt; &amp; &lt;summary&gt;</div>
<div class="section-body">
  <p>HTML5 provides native expandable accordion disclosure widgets without requiring any JavaScript:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Native Expandable Accordion</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;details open&gt;
  &lt;summary&gt;&lt;strong&gt;What is Semantic HTML?&lt;/strong&gt;&lt;/summary&gt;
  &lt;p&gt;Semantic HTML introduces meaningful tags like &amp;lt;header&amp;gt;, &amp;lt;article&amp;gt;, and &amp;lt;footer&amp;gt; that inform browsers and search engines about content structure.&lt;/p&gt;
&lt;/details&gt;

&lt;details&gt;
  &lt;summary&gt;&lt;strong&gt;What are the SEO benefits?&lt;/strong&gt;&lt;/summary&gt;
  &lt;p&gt;Search engine crawlers index semantic tags more accurately, improving search rankings and rich snippet displays.&lt;/p&gt;
&lt;/details&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Should I stop using &lt;div&gt; completely?</h4>
    <p>No. Use <code>&lt;div&gt;</code> freely for pure styling containers, flexbox wrappers, or grid layout positioning where no semantic meaning is implied.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the difference between &lt;section&gt; and &lt;article&gt;?</h4>
    <p>An <code>&lt;article&gt;</code> is independent and self-contained (e.g., a blog post that makes sense on its own). A <code>&lt;section&gt;</code> is a thematic sub-grouping within a page or article (e.g., Chapter 1 inside a book).</p>
  </div>
</div>`;

makePage(13, '13-html-semantic-elements-layout.html',
  'Semantic Elements & Page Layout (<header>, <nav>, <main>, <article>, <aside>, <footer>)',
  'Complete HTML5 Chapter 13: Learn semantic HTML5, <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>, <details>, <summary>, semantic page layout, and SEO/accessibility benefits.',
  'Phase 06', 'Semantic HTML5',
  'Semantic vs Non-semantic · <header> <nav> <main> <section> <article> <aside> <footer> · <details> & <summary> · SEO & Accessibility Benefits',
  c13,
  '12-html-svg-and-canvas-graphics.html', '12. SVG & Canvas Graphics',
  '14-html-page-layout-structure-landmarks.html', '14. Page Layout Structure & Landmarks'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 14: Page Layout Structure & Landmarks
// ═══════════════════════════════════════════════════════════════════════════════
const c14 = `
<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 14): Page Layout Structure &amp; ARIA Landmarks</strong>! In this chapter, we master building real-world page layouts using HTML5 semantic elements: Blog layouts, Tutorial layouts, Admin Dashboard layouts, Documentation layouts, Course landing pages, and configuring ARIA landmark roles (<code>role="banner"</code>, <code>role="main"</code>, <code>role="navigation"</code>, <code>role="complementary"</code>, <code>role="contentinfo"</code>).
</div>

<div class="section-title"><span class="num">1</span>Real-world Blog &amp; Article Layout Architecture</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Professional Blog Page Layout</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;title&gt;Blog Article Layout&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

  &lt;header role="banner"&gt;
    &lt;div class="brand"&gt;🖥️ Tech Blog&lt;/div&gt;
    &lt;nav aria-label="Main navigation"&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="/"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/articles" aria-current="page"&gt;Articles&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/header&gt;

  &lt;div class="container" style="display: flex; gap: 20px;"&gt;
    &lt;main role="main" style="flex: 1;"&gt;
      &lt;article&gt;
        &lt;header&gt;
          &lt;h1&gt;Mastering HTML5 Semantic Layouts&lt;/h1&gt;
          &lt;p&gt;Published on &lt;time datetime="2026-08-20"&gt;August 20, 2026&lt;/time&gt;&lt;/p&gt;
        &lt;/header&gt;
        &lt;section&gt;
          &lt;h2&gt;Introduction&lt;/h2&gt;
          &lt;p&gt;Semantic HTML5 improves accessibility and search rankings...&lt;/p&gt;
        &lt;/section&gt;
      &lt;/article&gt;
    &lt;/main&gt;

    &lt;aside role="complementary" style="width: 280px;"&gt;
      &lt;h3&gt;About Author&lt;/h3&gt;
      &lt;p&gt;Technical Editorial Team at Our Compiler.&lt;/p&gt;
    &lt;/aside&gt;
  &lt;/div&gt;

  &lt;footer role="contentinfo"&gt;
    &lt;p&gt;&amp;copy; 2026 Tech Blog. All rights reserved.&lt;/p&gt;
  &lt;/footer&gt;

&lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Semantic ARIA Landmarks Reference</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>HTML5 Element</th><th>Default ARIA Landmark Role</th><th>Screen Reader Navigation Shortcut</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;header&gt;</code></td><td><code>role="banner"</code></td><td>Jump to Top Banner</td></tr>
      <tr><td><code>&lt;nav&gt;</code></td><td><code>role="navigation"</code></td><td>Jump to Navigation Menu</td></tr>
      <tr><td><code>&lt;main&gt;</code></td><td><code>role="main"</code></td><td>Jump to Main Content Block</td></tr>
      <tr><td><code>&lt;aside&gt;</code></td><td><code>role="complementary"</code></td><td>Jump to Sidebar / Complementary Data</td></tr>
      <tr><td><code>&lt;footer&gt;</code></td><td><code>role="contentinfo"</code></td><td>Jump to Footer Info</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Can I have multiple &lt;header&gt; or &lt;footer&gt; elements on one page?</h4>
    <p>Yes! You can have one top-level <code>&lt;header&gt;</code> for the page, as well as nested <code>&lt;header&gt;</code> tags inside individual <code>&lt;article&gt;</code> or <code>&lt;section&gt;</code> elements.</p>
  </div>
</div>`;

makePage(14, '14-html-page-layout-structure-landmarks.html',
  'Page Layout Structure & Landmarks (Blog, Dashboard, Documentation Layouts)',
  'Complete HTML5 Chapter 14: Learn header, navigation, main, article, sidebar, and footer layout structures, blog layouts, documentation layouts, dashboard structures, and ARIA landmarks.',
  'Phase 06', 'Semantic HTML5',
  'Blog Layout · Documentation Layout · Dashboard Structure · Course Page Layout · ARIA Landmark Roles (banner, main, navigation)',
  c14,
  '13-html-semantic-elements-layout.html', '13. Semantic Elements & Layout',
  '15-html-forms-basics-form-element-action-method.html', '15. Forms Basics (action, method)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 15: Forms Basics (action, method)
// ═══════════════════════════════════════════════════════════════════════════════
const c15 = `
<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 15): Forms Basics — Form Element, Action &amp; Method</strong>! Web forms enable users to submit data to servers. In this chapter, we master the <code>&lt;form&gt;</code> element, form submission protocols (<code>GET</code> vs <code>POST</code>), form submission <code>action</code> URLs, explicit label association (<code>&lt;label for=""&gt;</code>), basic inputs (<code>&lt;input&gt;</code>), submit buttons (<code>&lt;button type="submit"&gt;</code>), text areas (<code>&lt;textarea&gt;</code>), drop-down selects (<code>&lt;select&gt;</code>, <code>&lt;option&gt;</code>), and field grouping (<code>&lt;fieldset&gt;</code>, <code>&lt;legend&gt;</code>).
</div>

<div class="section-title"><span class="num">1</span>Form Syntax, Action &amp; Submission Methods (GET vs POST)</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Method</th><th>Data Transmission</th><th>Security &amp; Caching</th><th>Best Used For</th></tr></thead>
    <tbody>
      <tr><td><strong>GET</strong></td><td>Appends form data to the URL as query parameters (<code>/search?q=html</code>).</td><td>Insecure for sensitive data (visible in address bar/history). Cacheable.</td><td>Search forms, filters, and data queries.</td></tr>
      <tr><td><strong>POST</strong></td><td>Sends form data in the HTTP request body payload.</td><td>Secure for sensitive data (hidden from URL bar). Non-cacheable.</td><td>Login forms, registration, file uploads, payment data.</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Basic Form Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- POST Submission Form --&gt;
&lt;form action="/api/submit-user" method="post"&gt;
  &lt;label for="username"&gt;Username:&lt;/label&gt;
  &lt;input id="username" name="username" type="text" placeholder="Enter username" required&gt;

  &lt;button type="submit"&gt;Submit Form&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Form Input Controls (&lt;textarea&gt;, &lt;select&gt;, &lt;fieldset&gt;)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Form Controls &amp; Grouping</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;form action="/submit" method="post"&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;User Information&lt;/legend&gt;

    &lt;!-- Select Dropdown --&gt;
    &lt;label for="country"&gt;Country:&lt;/label&gt;
    &lt;select id="country" name="country"&gt;
      &lt;option value=""&gt;-- Select Country --&lt;/option&gt;
      &lt;option value="in" selected&gt;India&lt;/option&gt;
      &lt;option value="us"&gt;United States&lt;/option&gt;
    &lt;/select&gt;

    &lt;br&gt;&lt;br&gt;

    &lt;!-- Textarea Multi-line Input --&gt;
    &lt;label for="bio"&gt;Bio / Message:&lt;/label&gt;&lt;br&gt;
    &lt;textarea id="bio" name="bio" rows="4" cols="40" placeholder="Tell us about yourself..."&gt;&lt;/textarea&gt;
  &lt;/fieldset&gt;

  &lt;button type="submit" style="margin-top: 15px;"&gt;Save Profile&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is explicit &lt;label for="id"&gt; matching essential?</h4>
    <p>Matching <code>for</code> on <code>&lt;label&gt;</code> to the <code>id</code> of an <code>&lt;input&gt;</code> enables screen readers to announce the label when focused, and allows users to click the text label to focus the input field.</p>
  </div>
</div>`;

makePage(15, '15-html-forms-basics-form-element-action-method.html',
  'Forms Basics (<form>, action, method, GET, POST, <label>, <input>)',
  'Complete HTML5 Chapter 15: Learn <form> tag, action URL, GET vs POST submission methods, <label> association, <input>, <button>, <textarea>, <select>, <option>, <fieldset>, and <legend>.',
  'Phase 07', 'Forms & Input Controls',
  '<form> Tag · action & method (GET vs POST) · <label for=""> · <input> & <button> · <textarea> · <select> & <option> · <fieldset> & <legend>',
  c15,
  '14-html-page-layout-structure-landmarks.html', '14. Page Layout Structure & Landmarks',
  '16-html-form-input-types-reference.html', '16. Input Types Reference'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 16: Form Input Types Reference
// ═══════════════════════════════════════════════════════════════════════════════
const c16 = `
<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 16): Form Input Types Reference</strong>! HTML5 provides a rich variety of native input types designed for specific data formats. In this chapter, we master all standard and HTML5 input types: <code>text</code>, <code>password</code>, <code>email</code>, <code>number</code>, <code>tel</code>, <code>url</code>, <code>search</code>, <code>date</code>, <code>time</code>, <code>datetime-local</code>, <code>month</code>, <code>week</code>, <code>color</code>, <code>range</code>, <code>checkbox</code>, <code>radio</code>, <code>file</code>, <code>hidden</code>, <code>submit</code>, <code>reset</code>, and <code>button</code>.
</div>

<div class="section-title"><span class="num">1</span>HTML5 Input Types Reference Table</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Input Type</th><th>Description &amp; Mobile Keyboard Behavior</th><th>Example Syntax</th></tr></thead>
    <tbody>
      <tr><td><code>text</code></td><td>Standard single-line text input field.</td><td><code>&lt;input type="text"&gt;</code></td></tr>
      <tr><td><code>password</code></td><td>Masks characters on screen for security.</td><td><code>&lt;input type="password"&gt;</code></td></tr>
      <tr><td><code>email</code></td><td>Validates email format and displays <code>@</code> keyboard on mobile.</td><td><code>&lt;input type="email"&gt;</code></td></tr>
      <tr><td><code>number</code></td><td>Restricts input to numbers with spinner controls.</td><td><code>&lt;input type="number" min="1" max="100"&gt;</code></td></tr>
      <tr><td><code>tel</code></td><td>Presents numeric telephone keypad on mobile devices.</td><td><code>&lt;input type="tel"&gt;</code></td></tr>
      <tr><td><code>date / time</code></td><td>Launches native browser date/time picker widgets.</td><td><code>&lt;input type="date"&gt;</code></td></tr>
      <tr><td><code>color</code></td><td>Launches native system color picker dialog.</td><td><code>&lt;input type="color" value="#f97316"&gt;</code></td></tr>
      <tr><td><code>range</code></td><td>Renders a visual slider bar for numeric range values.</td><td><code>&lt;input type="range" min="0" max="100"&gt;</code></td></tr>
      <tr><td><code>checkbox</code></td><td>Multi-select square checkbox options.</td><td><code>&lt;input type="checkbox" name="skills"&gt;</code></td></tr>
      <tr><td><code>radio</code></td><td>Single-select round radio button options within a group.</td><td><code>&lt;input type="radio" name="gender"&gt;</code></td></tr>
      <tr><td><code>file</code></td><td>Launches system file upload browser dialog.</td><td><code>&lt;input type="file" accept="image/*"&gt;</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Interactive Inputs Showcase</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Comprehensive Input Controls</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;form action="/save" method="post"&gt;
  &lt;p&gt;&lt;label&gt;Pick Color: &lt;input type="color" value="#f97316"&gt;&lt;/label&gt;&lt;/p&gt;
  &lt;p&gt;&lt;label&gt;Volume Range: &lt;input type="range" min="0" max="100" value="75"&gt;&lt;/label&gt;&lt;/p&gt;
  &lt;p&gt;&lt;label&gt;Select Date: &lt;input type="date"&gt;&lt;/label&gt;&lt;/p&gt;
  &lt;p&gt;&lt;label&gt;Upload Resume: &lt;input type="file" accept=".pdf,.docx"&gt;&lt;/label&gt;&lt;/p&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: How do radio buttons work as a single-select group?</h4>
    <p>Radio buttons share the exact same <code>name</code> attribute value (e.g., <code>name="gender"</code>). This tells the browser that selecting one radio button automatically deselects all other buttons in that group.</p>
  </div>
</div>`;

makePage(16, '16-html-form-input-types-reference.html',
  'Form Input Types Reference (email, date, color, range, checkbox, radio, file)',
  'Complete HTML5 Chapter 16: Learn all input types text, password, email, number, tel, url, search, date, time, datetime-local, month, week, color, range, checkbox, radio, file, hidden, submit, reset, and button.',
  'Phase 07', 'Forms & Input Controls',
  'Input Types Reference · email, number, tel, url · date, time, color, range · checkbox & radio · file upload · hidden inputs',
  c16,
  '15-html-forms-basics-form-element-action-method.html', '15. Forms Basics (action, method)',
  '17-html-form-attributes-reference.html', '17. Form Attributes Reference'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 17: Form Attributes Reference
// ═══════════════════════════════════════════════════════════════════════════════
const c17 = `
<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 17): Form Attributes Reference</strong>! HTML form controls support powerful attributes that configure validation rules, default states, and submission behaviors. In this chapter, we master <code>name</code>, <code>value</code>, <code>placeholder</code>, <code>required</code>, <code>readonly</code>, <code>disabled</code>, <code>checked</code>, <code>selected</code>, <code>min</code>/<code>max</code>, <code>step</code>, <code>minlength</code>/<code>maxlength</code>, <code>pattern</code> (Regex), <code>autocomplete</code>, <code>multiple</code>, <code>accept</code>, and overrides (<code>formaction</code>, <code>formenctype</code>, <code>formmethod</code>).
</div>

<div class="section-title"><span class="num">1</span>Form Control Attributes Reference Table</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Attribute</th><th>Purpose &amp; Description</th><th>Example Syntax</th></tr></thead>
    <tbody>
      <tr><td><code>name</code></td><td>Key name under which input data is submitted to the server. (Required for submission!)</td><td><code>name="email"</code></td></tr>
      <tr><td><code>placeholder</code></td><td>Displays temporary grey helper text when input is empty.</td><td><code>placeholder="name@domain.com"</code></td></tr>
      <tr><td><code>required</code></td><td>Boolean attribute enforcing mandatory user input before form submit.</td><td><code>required</code></td></tr>
      <tr><td><code>readonly</code></td><td>Prevents user editing but allows text selection and form submission.</td><td><code>readonly</code></td></tr>
      <tr><td><code>disabled</code></td><td>Disables control completely and excludes it from form submission.</td><td><code>disabled</code></td></tr>
      <tr><td><code>pattern</code></td><td>Validates input value against a Regular Expression pattern.</td><td><code>pattern="[A-Z]{3}[0-9]{4}"</code></td></tr>
      <tr><td><code>minlength / maxlength</code></td><td>Sets minimum and maximum allowed character count limits.</td><td><code>minlength="8" maxlength="20"</code></td></tr>
      <tr><td><code>multiple</code></td><td>Allows selecting multiple files or email addresses.</td><td><code>&lt;input type="file" multiple&gt;</code></td></tr>
      <tr><td><code>accept</code></td><td>Restricts file input picker to specified MIME types.</td><td><code>accept="image/png, image/jpeg"</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Pattern Validation &amp; Constraint Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Form Attributes &amp; Pattern Validation</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;form action="/register" method="post"&gt;
  &lt;!-- Zip Code pattern matching 5 digits --&gt;
  &lt;label for="zip"&gt;US Zip Code (5 Digits):&lt;/label&gt;
  &lt;input id="zip" name="zip" type="text" pattern="[0-9]{5}" title="Enter 5 digit zip code" required&gt;

  &lt;br&gt;&lt;br&gt;

  &lt;!-- Multiple File Upload restricted to Images --&gt;
  &lt;label for="photos"&gt;Upload Photos (PNG/JPG only):&lt;/label&gt;
  &lt;input id="photos" name="photos" type="file" accept="image/png, image/jpeg" multiple&gt;

  &lt;button type="submit"&gt;Submit Data&lt;/button&gt;
&lt;/form&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between disabled and readonly?</h4>
    <p>A <code>disabled</code> field cannot be focused, clicked, or submitted to the server. A <code>readonly</code> field can be focused and its value IS submitted to the server with the form.</p>
  </div>
</div>`;

makePage(17, '17-html-form-attributes-reference.html',
  'Form Attributes Reference (required, readonly, disabled, pattern, autocomplete)',
  'Complete HTML5 Chapter 17: Learn form attributes name, value, placeholder, required, readonly, disabled, checked, selected, min, max, step, minlength, maxlength, pattern, autocomplete, multiple, and accept.',
  'Phase 07', 'Forms & Input Controls',
  'Form Attributes · required, readonly, disabled · min, max, step · minlength, maxlength · pattern (Regex) · autocomplete & multiple',
  c17,
  '16-html-form-input-types-reference.html', '16. Input Types Reference',
  '18-html-form-native-validation-validity-api.html', '18. Native Validation & Validity API'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 18: Form Native Validation & Validity API
// ═══════════════════════════════════════════════════════════════════════════════
const c18 = `
<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 18): Form Native Validation &amp; Validity API</strong>! HTML5 provides built-in client-side validation mechanisms without requiring third-party libraries. In this chapter, we master native browser validation, <code>novalidate</code> form attribute, JavaScript Validity State API (<code>checkValidity()</code>, <code>reportValidity()</code>, <code>validity</code> object properties), CSS validation pseudo-classes (<code>:valid</code>, <code>:invalid</code>), and custom accessible validation error messages.
</div>

<div class="section-title"><span class="num">1</span>HTML5 Validity State Object Properties</div>
<div class="section-body">
  <p>When validating form controls via JavaScript, <code>input.validity</code> returns an object with boolean flags:</p>
  <table class="tbl spec-table">
    <thead><tr><th>Validity Flag</th><th>Trigger Condition</th></tr></thead>
    <tbody>
      <tr><td><code>valueMissing</code></td><td>Returns <code>true</code> if a <code>required</code> input is left blank.</td></tr>
      <tr><td><code>typeMismatch</code></td><td>Returns <code>true</code> if input text fails format constraints (e.g., invalid email or URL).</td></tr>
      <tr><td><code>patternMismatch</code></td><td>Returns <code>true</code> if value fails Regex <code>pattern</code>.</td></tr>
      <tr><td><code>tooShort / tooLong</code></td><td>Returns <code>true</code> if text violates <code>minlength</code> or <code>maxlength</code>.</td></tr>
      <tr><td><code>rangeUnderflow / rangeOverflow</code></td><td>Returns <code>true</code> if number violates <code>min</code> or <code>max</code> limits.</td></tr>
      <tr><td><code>valid</code></td><td>Returns <code>true</code> if ALL validation constraints pass cleanly.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Custom Validation with JS &amp; CSS :valid / :invalid</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML + JS — Validity API &amp; Custom Messages</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;form id="myForm"&gt;
  &lt;label for="email"&gt;Email Address:&lt;/label&gt;
  &lt;input id="email" type="email" required&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

&lt;script&gt;
  const emailInput = document.getElementById('email');
  emailInput.addEventListener('input', () => {
    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity('Please enter a valid company email address!');
    } else {
      emailInput.setCustomValidity('');
    }
  });
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What does the novalidate attribute do?</h4>
    <p>Adding <code>novalidate</code> to <code>&lt;form novalidate&gt;</code> disables native browser popup validation bubbles, allowing developers to handle custom validation UX entirely with JavaScript.</p>
  </div>
</div>`;

makePage(18, '18-html-form-native-validation-validity-api.html',
  'Form Native Validation & Validity API (checkValidity, validity object, :invalid)',
  'Complete HTML5 Chapter 18: Learn browser validation, required, email, pattern validation, novalidate attribute, checkValidity(), reportValidity(), validity state object, CSS :valid and :invalid, and custom JS validation.',
  'Phase 07', 'Forms & Input Controls',
  'Browser Native Validation · novalidate Attribute · Validity State Object · checkValidity() & reportValidity() · CSS :valid & :invalid · Custom JS Validation',
  c18,
  '17-html-form-attributes-reference.html', '17. Form Attributes Reference',
  '19-html-audio-element-audio-api.html', '19. Audio Element & Audio API'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 19: Audio Element & Audio API
// ═══════════════════════════════════════════════════════════════════════════════
const c19 = `
<div class="intro-box">
  Welcome to <strong>Phase 8 (Chapter 19): Audio Element &amp; Audio API</strong>! HTML5 introduced native audio playback directly in web browsers. In this chapter, we master the <code>&lt;audio&gt;</code> element, core audio attributes (<code>controls</code>, <code>autoplay</code>, <code>loop</code>, <code>muted</code>), multiple <code>&lt;source&gt;</code> fallback formats (MP3, WAV, OGG), accessible audio text transcripts, and controlling audio playback using the HTML5 Audio JavaScript API (<code>play()</code>, <code>pause()</code>, <code>currentTime</code>).
</div>

<div class="section-title"><span class="num">1</span>The &lt;audio&gt; Element &amp; Source Fallbacks</div>
<div class="section-body">
  <p>The <code>&lt;audio&gt;</code> tag embeds sound content such as podcasts, music, or voice recordings natively without third-party plugins.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Native Audio Player</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- HTML5 Audio Player with Source Fallbacks --&gt;
&lt;audio controls preload="metadata"&gt;
  &lt;source src="audio/podcast.mp3" type="audio/mpeg"&gt;
  &lt;source src="audio/podcast.ogg" type="audio/ogg"&gt;
  Your browser does not support native HTML5 audio playback.
&lt;/audio&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Audio Attributes Reference</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>controls</code></td><td>Displays native browser audio playback controls (Play/Pause, Volume, Timeline scrubber).</td></tr>
      <tr><td><code>autoplay</code></td><td>Automatically begins audio playback upon page load (often blocked by browsers unless muted).</td></tr>
      <tr><td><code>loop</code></td><td>Automatically restarts audio playback from the beginning when finished.</td></tr>
      <tr><td><code>muted</code></td><td>Mutes audio output by default.</td></tr>
      <tr><td><code>preload</code></td><td>Specifies audio buffering behavior (<code>none</code>, <code>metadata</code>, <code>auto</code>).</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why do modern browsers block autoplay audio?</h4>
    <p>Browsers block unmuted autoplay sound to prevent intrusive background noise when users open web pages unexpectedly.</p>
  </div>
</div>`;

makePage(19, '19-html-audio-element-audio-api.html',
  'Audio Element & Audio API (<audio>, controls, <source>, play(), pause())',
  'Complete HTML5 Chapter 19: Learn <audio> tag, controls, autoplay, loop, muted, <source> formats (MP3, WAV, OGG), accessible transcripts, and Audio JavaScript API.',
  'Phase 08', 'Audio, Video & Embeds',
  '<audio> Element · controls, autoplay, loop, muted · <source> Formats (MP3, OGG, WAV) · Fallback Text · Audio JavaScript API',
  c19,
  '18-html-form-native-validation-validity-api.html', '18. Native Validation & Validity API',
  '20-html-video-element-track-subtitles.html', '20. Video Element & Subtitles'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 20: Video Element & Subtitles
// ═══════════════════════════════════════════════════════════════════════════════
const c20 = `
<div class="intro-box">
  Welcome to <strong>Phase 8 (Chapter 20): Video Element &amp; Subtitles (&lt;video&gt;, &lt;track&gt;)</strong>! HTML5 provides native high-performance video rendering. In this chapter, we master the <code>&lt;video&gt;</code> element, video attributes (<code>controls</code>, <code>poster</code>, <code>width</code>, <code>height</code>, <code>autoplay</code>, <code>muted</code>, <code>loop</code>), video formats (MP4, WebM), subtitle/caption track integration using WebVTT (<code>&lt;track&gt;</code>), video accessibility, responsive video aspect ratio wrappers, and the Video JavaScript API.
</div>

<div class="section-title"><span class="num">1</span>The &lt;video&gt; Element &amp; Subtitle &lt;track&gt; Tags</div>
<div class="section-body">
  <p>The <code>&lt;video&gt;</code> element embeds video clips natively. Adding a <code>&lt;track&gt;</code> tag attaches closed captions or subtitles formatted in WebVTT (<code>.vtt</code>):</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Native Video Player with Subtitles</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;video controls poster="images/thumbnail.jpg" width="800" height="450" preload="metadata"&gt;
  &lt;source src="video/lesson.mp4" type="video/mp4"&gt;
  &lt;source src="video/lesson.webm" type="video/webm"&gt;

  &lt;!-- Closed Captions &amp; Subtitles Track --&gt;
  &lt;track kind="subtitles" src="subtitles/lesson-en.vtt" srclang="en" label="English Subtitles" default&gt;

  Your browser does not support native HTML5 video playback.
&lt;/video&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Video Poster &amp; Responsive Aspect Ratio</div>
<div class="section-body">
  <p><strong><code>poster</code> Attribute:</strong> Specifies an image preview URL to display while the video is downloading or until the user hits play.</p>
  <p><strong>Responsive Video CSS:</strong> Set <code>max-width: 100%; height: auto;</code> or use CSS <code>aspect-ratio: 16 / 9;</code> to make video players resize fluidly across mobile and desktop screens.</p>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What format is required for video subtitles?</h4>
    <p>Subtitles and closed captions must be saved in WebVTT format (Web Video Text Tracks) with a <code>.vtt</code> extension.</p>
  </div>
</div>`;

makePage(20, '20-html-video-element-track-subtitles.html',
  'Video Element & Subtitles (<video>, poster, <track>, WebVTT)',
  'Complete HTML5 Chapter 20: Learn <video> tag, controls, poster, width/height, autoplay, muted, loop, <source> formats (MP4, WebM), <track> WebVTT captions, and responsive video.',
  'Phase 08', 'Audio, Video & Embeds',
  '<video> Element · poster Attribute · <source> Formats (MP4, WebM) · <track> WebVTT Captions & Subtitles · Responsive Aspect Ratio',
  c20,
  '19-html-audio-element-audio-api.html', '19. Audio Element & Audio API',
  '21-html-embedded-content-iframes-security.html', '21. Embedded Content & IFrames'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 21: Embedded Content & IFrames Security
// ═══════════════════════════════════════════════════════════════════════════════
const c21 = `
<div class="intro-box">
  Welcome to <strong>Phase 8 (Chapter 21): Embedded Content &amp; IFrames Security</strong>! The <code>&lt;iframe&gt;</code> (Inline Frame) element embeds another independent HTML document within the current page. In this chapter, we master YouTube video embedding, Google Maps embedding, iframe <code>title</code> accessibility attributes, <code>loading="lazy"</code>, <code>sandbox</code> security options, <code>allow</code> permissions policies, cross-origin security risks (Clickjacking, Tabnabbing), and responsive iframe wrappers.
</div>

<div class="section-title"><span class="num">1</span>The &lt;iframe&gt; Element &amp; Responsive Embedding</div>
<div class="section-body">
  <p>An <code>&lt;iframe&gt;</code> embeds external web content cleanly. Always supply a descriptive <code>title</code> attribute for screen reader accessibility.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — YouTube &amp; Map Embedded IFrames</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Embedded YouTube Video --&gt;
&lt;iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="HTML5 Tutorial Video"
  width="560"
  height="315"
  loading="lazy"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  style="border: 0;"
&gt;&lt;/iframe&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>IFrame Sandboxed Security (sandbox attribute)</div>
<div class="section-body">
  <p>The <code>sandbox</code> attribute applies strict security restrictions on third-party untrusted iframe content:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Sandbox Value</th><th>Security Permission Granted</th></tr></thead>
    <tbody>
      <tr><td><code>sandbox</code> (empty)</td><td>Applies ALL security restrictions (blocks scripts, forms, popups, and same-origin access).</td></tr>
      <tr><td><code>allow-scripts</code></td><td>Allows the embedded document to run JavaScript scripts.</td></tr>
      <tr><td><code>allow-forms</code></td><td>Allows the embedded document to submit forms.</td></tr>
      <tr><td><code>allow-same-origin</code></td><td>Allows embedded document to retain its origin domain permissions.</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Sandboxed IFrame Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Sandboxed IFrame with explicit allowed permissions --&gt;
&lt;iframe
  src="https://untrusted-third-party.com"
  title="Third-party Widget"
  sandbox="allow-scripts allow-forms"
  loading="lazy"
&gt;&lt;/iframe&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is title attribute mandatory on &lt;iframe&gt; elements?</h4>
    <p>Screen readers read the <code>title</code> attribute to inform visually impaired users what external content is embedded inside the iframe before they navigate into it.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is Clickjacking and how do I prevent it?</h4>
    <p>Clickjacking occurs when a malicious site embeds your web page inside a transparent iframe to trick users into clicking buttons. Prevent it by configuring the <code>X-Frame-Options: DENY</code> HTTP response header on your server.</p>
  </div>
</div>`;

makePage(21, '21-html-embedded-content-iframes-security.html',
  'Embedded Content & IFrames Security (<iframe>, sandbox, allow, YouTube, Maps)',
  'Complete HTML5 Chapter 21: Learn <iframe> tag, YouTube and Maps embedding, title attribute, loading="lazy", sandbox security, allow permissions policy, clickjacking risks, and responsive iframe wrappers.',
  'Phase 08', 'Audio, Video & Embeds',
  '<iframe> Element · YouTube & Maps Embedding · title Accessibility Attribute · sandbox Security Flags · allow Permissions Policy · Clickjacking Mitigation',
  c21,
  '20-html-video-element-track-subtitles.html', '20. Video Element & Subtitles',
  '22-html-web-storage-localstorage-sessionstorage.html', '22. Web Storage (localStorage, sessionStorage)'
);

console.log('\n🎉 ALL HTML5 PHASES 6 TO 8 (CHAPTERS 13 TO 21) RE-GENERATED WITH FULL 32 SIDEBAR!');
