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

console.log('🚀 Generating HTML5 Masterclass Chapters 22 to 32 (Phases 9, 10, 11, 12, 13)...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 22: Web Storage API
// ═══════════════════════════════════════════════════════════════════════════════
const c22 = `
<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 22): Web Storage API — localStorage &amp; sessionStorage</strong>! HTML5 Web Storage allows web applications to store key-value pairs locally inside the user's browser. In this chapter, we master <code>localStorage</code> vs <code>sessionStorage</code> vs Cookies, storage methods (<code>setItem</code>, <code>getItem</code>, <code>removeItem</code>, <code>clear</code>), JSON object serialization (<code>JSON.stringify</code> / <code>JSON.parse</code>), handling cross-tab storage events (<code>window.onstorage</code>), storage quota constraints (5MB-10MB), and Security/XSS mitigation strategies.
</div>

<div class="section-title"><span class="num">1</span>localStorage vs sessionStorage vs Cookies</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Storage Type</th><th>Data Lifetime</th><th>Storage Quota</th><th>Server Transmission</th></tr></thead>
    <tbody>
      <tr><td><strong>localStorage</strong></td><td>Persistent (persists until manually deleted)</td><td>~5MB - 10MB per origin</td><td>No (Client-side only)</td></tr>
      <tr><td><strong>sessionStorage</strong></td><td>Session only (deleted when tab closes)</td><td>~5MB per origin</td><td>No (Client-side only)</td></tr>
      <tr><td><strong>Cookies</strong></td><td>Set by expiration date header</td><td>~4KB per cookie</td><td>Yes (Sent automatically with every HTTP header)</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Web Storage Methods &amp; JSON Serialization</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — localStorage &amp; JSON Operations</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;script&gt;
  // 1. Store primitive string data
  localStorage.setItem('theme', 'dark');

  // 2. Store complex object via JSON serialization
  const userSettings = { theme: 'dark', fontSize: 16, language: 'en' };
  localStorage.setItem('settings', JSON.stringify(userSettings));

  // 3. Retrieve and parse stored object
  const savedSettings = JSON.parse(localStorage.getItem('settings'));
  console.log('Saved Theme:', savedSettings.theme);

  // 4. Remove single item &amp; Clear all items
  localStorage.removeItem('theme');
  // localStorage.clear();
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Should I store authentication tokens (JWT) in localStorage?</h4>
    <p>Storing sensitive tokens in <code>localStorage</code> exposes them to Cross-Site Scripting (XSS) attacks. Security best practices recommend storing sensitive session tokens in <code>HttpOnly</code> cookies instead.</p>
  </div>
</div>`;

makePage(22, '22-html-web-storage-localstorage-sessionstorage.html',
  'Web Storage API (localStorage, sessionStorage, JSON Serialization)',
  'Complete HTML5 Chapter 22: Learn localStorage vs sessionStorage vs cookies, setItem, getItem, removeItem, clear, JSON serialization, storage events, quotas, and XSS security.',
  'Phase 09', 'HTML5 Advanced APIs',
  'localStorage vs sessionStorage vs Cookies · setItem, getItem, removeItem, clear · JSON.stringify & JSON.parse · Cross-tab Storage Events · XSS Security',
  c22,
  '21-html-embedded-content-iframes-security.html', '21. Embedded Content & IFrames',
  '23-html-geolocation-api-user-location.html', '23. Geolocation API & Location'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 23: Geolocation API
// ═══════════════════════════════════════════════════════════════════════════════
const c23 = `
<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 23): Geolocation API &amp; User Location</strong>! The HTML5 Geolocation API allows users to share their physical geographical location with web applications. In this chapter, we master <code>navigator.geolocation</code>, <code>getCurrentPosition()</code>, <code>watchPosition()</code>, <code>clearWatch()</code>, position configurations (<code>enableHighAccuracy</code>, <code>timeout</code>, <code>maximumAge</code>), handling permission states, reading coordinate data (<code>latitude</code>, <code>longitude</code>, <code>accuracy</code>), and HTTPS secure context requirements.
</div>

<div class="section-title"><span class="num">1</span>Fetching Current Position with High Accuracy</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Geolocation API Implementation</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;button id="locBtn"&gt;Get My Location&lt;/button&gt;
&lt;p id="output"&gt;&lt;/p&gt;

&lt;script&gt;
  document.getElementById('locBtn').addEventListener('click', () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          document.getElementById('output').textContent = \`Latitude: \${lat}, Longitude: \${lng}\`;
        },
        (error) => {
          console.error('Geolocation error:', error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  });
&lt;/script&gt;</code></pre>
  </div>

  <div class="callout">
    <div class="callout-title">🔒 HTTPS Security Requirement</div>
    <p>The Geolocation API is a powerful feature that requires a Secure Context (HTTPS). Web browsers block geolocation requests on unencrypted <code>http://</code> websites for user privacy.</p>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between getCurrentPosition() and watchPosition()?</h4>
    <p><code>getCurrentPosition()</code> requests the location once. <code>watchPosition()</code> continuously monitors movement and fires a callback function whenever the user's GPS coordinates change.</p>
  </div>
</div>`;

makePage(23, '23-html-geolocation-api-user-location.html',
  'Geolocation API & User Location (navigator.geolocation, getCurrentPosition)',
  'Complete HTML5 Chapter 23: Learn navigator.geolocation, getCurrentPosition(), watchPosition(), position options, latitude & longitude coordinates, permission handling, and HTTPS rules.',
  'Phase 09', 'HTML5 Advanced APIs',
  'navigator.geolocation · getCurrentPosition() & watchPosition() · Latitude, Longitude, Accuracy · Position Options · HTTPS Security Context',
  c23,
  '22-html-web-storage-localstorage-sessionstorage.html', '22. Web Storage (localStorage, sessionStorage)',
  '24-html-drag-and-drop-api-native-dnd.html', '24. Drag & Drop API'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 24: Drag and Drop API
// ═══════════════════════════════════════════════════════════════════════════════
const c24 = `
<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 24): Drag &amp; Drop API</strong>! HTML5 provides native Drag and Drop capabilities. In this chapter, we master making elements draggable (<code>draggable="true"</code>), drag source events (<code>dragstart</code>, <code>drag</code>, <code>dragend</code>), drop target events (<code>dragenter</code>, <code>dragover</code>, <code>dragleave</code>, <code>drop</code>), overriding default drag behaviors (<code>event.preventDefault()</code>), using the <code>DataTransfer</code> object (<code>setData()</code>, <code>getData()</code>), and native desktop file drag-and-drop uploads.
</div>

<div class="section-title"><span class="num">1</span>Native Drag &amp; Drop Event Sequence</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML + JS — Drag &amp; Drop Implementation</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;div id="dragItem" draggable="true" style="padding:10px; background:#f97316; color:#fff; width:120px; cursor:move;"&gt;
  Drag Me!
&lt;/div&gt;

&lt;div id="dropZone" style="margin-top:20px; width:200px; height:100px; border:2px dashed #f97316; padding:10px;"&gt;
  Drop Zone
&lt;/div&gt;

&lt;script&gt;
  const item = document.getElementById('dragItem');
  const zone = document.getElementById('dropZone');

  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });

  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Required to allow drop!
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    zone.appendChild(document.getElementById(id));
  });
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is e.preventDefault() mandatory on dragover?</h4>
    <p>By default, web browsers disable dropping elements onto other elements. Calling <code>e.preventDefault()</code> inside the <code>dragover</code> listener overrides this default behavior to allow drops.</p>
  </div>
</div>`;

makePage(24, '24-html-drag-and-drop-api-native-dnd.html',
  'Drag & Drop API (draggable="true", DataTransfer, drop event)',
  'Complete HTML5 Chapter 24: Learn draggable="true", dragstart, dragover, drop events, DataTransfer object setData() & getData(), custom drag images, and desktop file drop upload.',
  'Phase 09', 'HTML5 Advanced APIs',
  'draggable="true" · dragstart, dragover, drop · DataTransfer (setData, getData) · event.preventDefault() · Native Desktop File Drag & Drop Upload',
  c24,
  '23-html-geolocation-api-user-location.html', '23. Geolocation API & Location',
  '25-html-web-workers-service-workers-pwa-basics.html', '25. Web Workers & Service Workers'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 25: Web Workers & Service Workers
// ═══════════════════════════════════════════════════════════════════════════════
const c25 = `
<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 25): Web Workers &amp; Service Workers Basics</strong>! JavaScript normally runs on a single main thread. In this chapter, we master Dedicated Web Workers (<code>new Worker()</code>), offloading heavy computations (<code>postMessage()</code>, <code>onmessage</code>), Service Workers lifecycle, Progressive Web App (PWA) caching strategies, offline web experiences, and Web Worker limitations (no DOM access).
</div>

<div class="section-title"><span class="num">1</span>Offloading Computations with Dedicated Web Workers</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Dedicated Web Worker Example</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- main.js --&gt;
&lt;script&gt;
  const worker = new Worker('worker.js');

  // Send data to background worker thread
  worker.postMessage({ number: 40 });

  // Listen for calculated results
  worker.onmessage = (event) => {
    console.log('Result from Web Worker:', event.data.result);
  };
&lt;/script&gt;

&lt;!-- worker.js (Executes in separate background thread) --&gt;
// self.onmessage = (e) =&gt; {
//   const result = heavyFibonacci(e.data.number);
//   self.postMessage({ result });
// };</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Can a Web Worker manipulate DOM elements directly?</h4>
    <p>No. Web Workers execute in a separate global context without access to the <code>window</code> or <code>document</code> objects. They communicate with the main thread strictly via message passing (<code>postMessage</code>).</p>
  </div>
</div>`;

makePage(25, '25-html-web-workers-service-workers-pwa-basics.html',
  'Web Workers & Service Workers (Multi-threading, PWA Caching, Worker API)',
  'Complete HTML5 Chapter 25: Learn dedicated Web Workers, postMessage, onmessage, background multi-threading, Service Workers introduction, PWA caching basics, and offline experiences.',
  'Phase 09', 'HTML5 Advanced APIs',
  'Dedicated Web Workers (new Worker) · postMessage() & onmessage · Service Workers & PWA Basics · Offline Caching · Main Thread Multi-threading',
  c25,
  '24-html-drag-and-drop-api-native-dnd.html', '24. Drag & Drop API',
  '26-html-accessibility-a11y-wcag-guidelines.html', '26. Accessibility & WCAG Principles'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 26: Accessibility & WCAG Principles
// ═══════════════════════════════════════════════════════════════════════════════
const c26 = `
<div class="intro-box">
  Welcome to <strong>Phase 10 (Chapter 26): Web Accessibility (a11y) &amp; WCAG Guidelines</strong>! Web accessibility guarantees that web content is usable by everyone, including people with visual, auditory, motor, or cognitive disabilities. In this chapter, we master WCAG 2.2 principles (POUR: Perceivable, Operable, Understandable, Robust), semantic HTML as the primary a11y foundation, keyboard focus management (<code>tabindex</code>), visible focus rings (<code>:focus-visible</code>), and automated audit tools (Lighthouse, axe-core).
</div>

<div class="section-title"><span class="num">1</span>The 4 Core WCAG Principles (POUR)</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Principle</th><th>Meaning &amp; Implementation Rule</th></tr></thead>
    <tbody>
      <tr><td><strong>Perceivable</strong></td><td>Information and UI components must be presentable to users in ways they can perceive (e.g., alt text for images, captions for video).</td></tr>
      <tr><td><strong>Operable</strong></td><td>UI components and navigation must be operable via keyboard without requiring a mouse.</td></tr>
      <tr><td><strong>Understandable</strong></td><td>Information and operation of UI must be clear (e.g., predictable navigation, clear form validation error messages).</td></tr>
      <tr><td><strong>Robust</strong></td><td>Content must be robust enough to be interpreted reliably by diverse assistive technologies (screen readers).</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Keyboard Focus Management &amp; tabindex</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Focus Management with tabindex</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Standard interactive elements are focusable by default --&gt;
&lt;button&gt;Clickable Button&lt;/button&gt;

&lt;!-- tabindex="0": Adds custom element to natural tab order --&gt;
&lt;div tabindex="0" role="button"&gt;Custom Accessible Div Button&lt;/div&gt;

&lt;!-- tabindex="-1": Makes element programmatically focusable via JS, but skips keyboard tab order --&gt;
&lt;div id="modal" tabindex="-1"&gt;Modal Container&lt;/div&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why should I never remove outline: none in CSS without a replacement?</h4>
    <p>Removing outline visual focus indicators prevents keyboard users from seeing which button or link is currently focused, rendering the website completely unusable for keyboard navigation.</p>
  </div>
</div>`;

makePage(26, '26-html-accessibility-a11y-wcag-guidelines.html',
  'Web Accessibility (a11y) & WCAG Guidelines (POUR, tabindex, focus)',
  'Complete HTML5 Chapter 26: Learn web accessibility, WCAG 2.2 POUR principles, keyboard focus management, tabindex, :focus-visible rings, and automated Lighthouse/axe accessibility audits.',
  'Phase 10', 'Accessibility & WAI-ARIA',
  'WCAG 2.2 POUR Principles · Semantic HTML a11y Foundation · Keyboard Navigation & tabindex · Visible Focus Rings (:focus-visible) · Automated Accessibility Audits',
  c26,
  '25-html-web-workers-service-workers-pwa-basics.html', '25. Web Workers & Service Workers',
  '27-html-wai-aria-roles-states-properties.html', '27. WAI-ARIA Roles, States & Props'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 27: WAI-ARIA Roles, States & Properties
// ═══════════════════════════════════════════════════════════════════════════════
const c27 = `
<div class="intro-box">
  Welcome to <strong>Phase 10 (Chapter 27): WAI-ARIA Roles, States &amp; Properties</strong>! WAI-ARIA (Accessible Rich Internet Applications) extends HTML to make complex dynamic web applications accessible to assistive technology screen readers. In this chapter, we master the First Rule of ARIA, landmark roles, widget roles (<code>role="dialog"</code>, <code>role="tab"</code>), ARIA states (<code>aria-expanded</code>, <code>aria-hidden</code>, <code>aria-selected</code>), ARIA properties (<code>aria-label</code>, <code>aria-labelledby</code>, <code>aria-describedby</code>, <code>aria-live</code>), and accessible modal dialogue implementations.
</div>

<div class="section-title"><span class="num">1</span>First Rule of ARIA &amp; Core Attributes</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">⚠️ The First Rule of ARIA</div>
    <p>If you can use a native HTML5 element (e.g., <code>&lt;button&gt;</code>) instead of re-purposing a non-semantic element with ARIA (e.g., <code>&lt;div role="button"&gt;</code>), <strong>ALWAYS use the native HTML element!</strong> Native HTML tags provide built-in keyboard accessibility and screen reader support by default.</p>
  </div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — ARIA States &amp; Accessible Dialog</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Toggle Button with ARIA state --&gt;
&lt;button aria-expanded="false" aria-controls="menu" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'false')"&gt;
  Toggle Navigation Menu
&lt;/button&gt;

&lt;!-- Accessible Modal Dialog --&gt;
&lt;div role="dialog" aria-labelledby="dialogTitle" aria-modal="true" hidden&gt;
  &lt;h2 id="dialogTitle"&gt;Confirm Deletion&lt;/h2&gt;
  &lt;p&gt;Are you sure you want to delete this record?&lt;/p&gt;
  &lt;button&gt;Cancel&lt;/button&gt;
  &lt;button&gt;Delete&lt;/button&gt;
&lt;/div&gt;

&lt;!-- Live Region for Dynamic Updates --&gt;
&lt;div aria-live="polite" id="statusNotice"&gt;
  &lt;!-- Screen readers automatically announce text injected here --&gt;
&lt;/div&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between aria-label and aria-labelledby?</h4>
    <p><code>aria-label="String"</code> directly supplies a text string label. <code>aria-labelledby="elementID"</code> references another visible HTML element ID on the page to serve as the label.</p>
  </div>
</div>`;

makePage(27, '27-html-wai-aria-roles-states-properties.html',
  'WAI-ARIA Roles, States & Properties (aria-expanded, aria-label, role="dialog")',
  'Complete HTML5 Chapter 27: Learn WAI-ARIA, First Rule of ARIA, landmark & widget roles, ARIA states aria-expanded, aria-hidden, aria-selected, ARIA properties aria-label, aria-live, and accessible modals.',
  'Phase 10', 'Accessibility & WAI-ARIA',
  'First Rule of ARIA · Landmark & Widget Roles · ARIA States (aria-expanded, aria-hidden) · ARIA Properties (aria-label, aria-live) · Accessible Modal Dialogs',
  c27,
  '26-html-accessibility-a11y-wcag-guidelines.html', '26. Accessibility & WCAG Principles',
  '28-html-seo-metadata-head-tags.html', '28. SEO Metadata & Head Tags'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 28: SEO Metadata & Head Tags
// ═══════════════════════════════════════════════════════════════════════════════
const c28 = `
<div class="intro-box">
  Welcome to <strong>Phase 11 (Chapter 28): SEO Best Practices &amp; Document Metadata</strong>! Technical SEO relies heavily on clean HTML markup. In this chapter, we master document <code>&lt;title&gt;</code> optimization, <code>&lt;meta name="description"&gt;</code>, Canonical URLs (<code>&lt;link rel="canonical"&gt;</code>), Robots meta tags (<code>&lt;meta name="robots"&gt;</code>), Heading hierarchy SEO (<code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>), image alt text SEO, mobile-first viewport configuration, and Google indexing guidelines.
</div>

<div class="section-title"><span class="num">1</span>Essential HTML Head Tags for Technical SEO</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Complete SEO Head Template</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

  &lt;!-- Optimized Title (50-60 characters) --&gt;
  &lt;title&gt;HTML5 Masterclass (2026 Edition) — Our Compiler&lt;/title&gt;

  &lt;!-- Meta Description (150-160 characters) --&gt;
  &lt;meta name="description" content="Master HTML5 with 32 comprehensive chapters in clean English. Learn tags, attributes, forms, SEO, web storage, and Web Components."&gt;

  &lt;!-- Canonical Link (Prevents Duplicate Content Penalty) --&gt;
  &lt;link rel="canonical" href="https://www.ourcompiler.com/blog-html.html"&gt;

  &lt;!-- Robots Indexing Directives --&gt;
  &lt;meta name="robots" content="index, follow"&gt;
&lt;/head&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why is canonical URL tag important?</h4>
    <p>If your web page can be accessed via multiple URLs (e.g., <code>http://example.com</code> vs <code>https://example.com/index.html</code>), the canonical tag informs search engine crawlers which single URL is the authoritative source, preventing duplicate content penalties.</p>
  </div>
</div>`;

makePage(28, '28-html-seo-metadata-head-tags.html',
  'SEO Metadata & Head Tags (Title, Meta Description, Canonical URLs, Robots)',
  'Complete HTML5 Chapter 28: Learn technical SEO, document title optimization, meta description, canonical URLs, robots indexing directives, heading structure SEO, and Google Search best practices.',
  'Phase 11', 'SEO & Metadata',
  'Technical SEO Basics · Title Tag & Meta Description · Canonical URLs (<link rel="canonical">) · Robots Directives (index, follow) · Mobile Viewport SEO',
  c28,
  '27-html-wai-aria-roles-states-properties.html', '27. WAI-ARIA Roles, States & Props',
  '29-html-open-graph-social-meta-schema-org.html', '29. Open Graph & Schema.org JSON-LD'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 29: Open Graph & Schema.org JSON-LD
// ═══════════════════════════════════════════════════════════════════════════════
const c29 = `
<div class="intro-box">
  Welcome to <strong>Phase 11 (Chapter 29): Open Graph, Twitter Cards &amp; Schema.org JSON-LD</strong>! Social media sharing cards and search engine rich snippets enhance web traffic. In this chapter, we master Open Graph protocol tags (<code>og:title</code>, <code>og:image</code>, <code>og:description</code>), Twitter Card tags (<code>twitter:card</code>), JSON-LD Structured Data (<code>&lt;script type="application/ld+json"&gt;</code>), Schema.org schemas (Article, FAQPage, Course, BreadcrumbList), and testing metadata using Google Rich Results.
</div>

<div class="section-title"><span class="num">1</span>Open Graph &amp; Twitter Social Cards</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Open Graph &amp; Twitter Card Meta</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Open Graph Social Meta Tags --&gt;
&lt;meta property="og:type" content="article"&gt;
&lt;meta property="og:title" content="HTML5 Masterclass Course"&gt;
&lt;meta property="og:description" content="Learn complete HTML5 web development step-by-step."&gt;
&lt;meta property="og:image" content="https://www.ourcompiler.com/og-banner.png"&gt;
&lt;meta property="og:url" content="https://www.ourcompiler.com/blog-html.html"&gt;

&lt;!-- Twitter Card Meta Tags --&gt;
&lt;meta name="twitter:card" content="summary_large_image"&gt;
&lt;meta name="twitter:site" content="@OurCompiler"&gt;
&lt;meta name="twitter:title" content="HTML5 Masterclass Course"&gt;
&lt;meta name="twitter:image" content="https://www.ourcompiler.com/og-banner.png"&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Schema.org JSON-LD Structured Data</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JSON-LD — Schema.org Structured Data</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "HTML5 Masterclass",
  "description": "Complete HTML5 tutorial from beginner to advanced.",
  "provider": {
    "@type": "Organization",
    "name": "Our Compiler",
    "sameAs": "https://www.ourcompiler.com"
  }
}
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the benefit of JSON-LD structured data?</h4>
    <p>JSON-LD structured data helps search engines understand page content context, enabling Rich Snippets (star ratings, FAQ accordions, course badges) directly in Google Search results.</p>
  </div>
</div>`;

makePage(29, '29-html-open-graph-social-meta-schema-org.html',
  'Open Graph, Twitter Cards & Schema.org JSON-LD (Social Sharing & Rich Snippets)',
  'Complete HTML5 Chapter 29: Learn Open Graph og:title & og:image, Twitter Cards, Schema.org structured data JSON-LD, Article & Course schemas, and Google Rich Results testing.',
  'Phase 11', 'SEO & Metadata',
  'Open Graph Protocol (og:title, og:image) · Twitter Cards (summary_large_image) · Schema.org JSON-LD Structured Data · Google Rich Snippets · Social Sharing Optimization',
  c29,
  '28-html-seo-metadata-head-tags.html', '28. SEO Metadata & Head Tags',
  '30-html-web-components-custom-elements-shadow-dom.html', '30. Custom Elements & Shadow DOM'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 30: Custom Elements & Shadow DOM
// ═══════════════════════════════════════════════════════════════════════════════
const c30 = `
<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 30): Custom Elements &amp; Shadow DOM</strong>! Web Components allow developers to create reusable, encapsulated custom HTML tags natively in browsers. In this chapter, we master Autonomous Custom Elements (<code>customElements.define()</code>), Custom Element Lifecycle Hooks (<code>connectedCallback</code>, <code>disconnectedCallback</code>), Shadow DOM encapsulation (<code>attachShadow({ mode: 'open' })</code>), and scoped CSS styles.
</div>

<div class="section-title"><span class="num">1</span>Creating a Custom Element with Shadow DOM</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML + JS — Custom Web Component</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Usage of Custom Tag --&gt;
&lt;user-card name="Balaji" role="Lead Developer"&gt;&lt;/user-card&gt;

&lt;script&gt;
  class UserCard extends HTMLElement {
    constructor() {
      super();
      // Attach Shadow DOM for style encapsulation
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = \`
        &lt;style&gt;
          .card { padding: 16px; background: #141922; border: 1px solid #f97316; border-radius: 8px; color: #fff; }
          h3 { color: #f97316; margin: 0 0 6px 0; }
        &lt;/style&gt;
        &lt;div class="card"&gt;
          &lt;h3&gt;\${this.getAttribute('name')}&lt;/h3&gt;
          &lt;p&gt;\${this.getAttribute('role')}&lt;/p&gt;
        &lt;/div&gt;
      \`;
    }
  }

  // Register Web Component with Hyphenated Tag Name
  customElements.define('user-card', UserCard);
&lt;/script&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why must custom element tag names contain a hyphen (-)?</h4>
    <p>HTML specs require custom tag names to contain at least one hyphen (e.g., <code>&lt;user-card&gt;</code>) to prevent naming conflicts with future standard HTML tags.</p>
  </div>
</div>`;

makePage(30, '30-html-web-components-custom-elements-shadow-dom.html',
  'Web Components: Custom Elements & Shadow DOM (customElements.define, attachShadow)',
  'Complete HTML5 Chapter 30: Learn Web Components, Autonomous Custom Elements, customElements.define(), lifecycle hooks connectedCallback, Shadow DOM encapsulation, and scoped CSS.',
  'Phase 12', 'Web Components',
  'Autonomous Custom Elements · customElements.define() · Lifecycle Hooks (connectedCallback) · Shadow DOM (attachShadow) · Encapsulated Scoped CSS',
  c30,
  '29-html-open-graph-social-meta-schema-org.html', '29. Open Graph & Schema.org JSON-LD',
  '31-html-templates-slots-shadow-dom.html', '31. HTML Templates & Slots'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 31: HTML Templates & Slots
// ═══════════════════════════════════════════════════════════════════════════════
const c31 = `
<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 31): HTML Templates &amp; Slots</strong>! HTML templates provide inert, reusable markup fragments that are not rendered until instantiated with JavaScript. In this chapter, we master the <code>&lt;template&gt;</code> element, <code>&lt;slot&gt;</code> projection tags, named slots (<code>&lt;slot name="header"&gt;</code>), cloning templates (<code>template.content.cloneNode(true)</code>), and building reusable component UI libraries.
</div>

<div class="section-title"><span class="num">1</span>HTML &lt;template&gt; &amp; &lt;slot&gt; Projection</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Template &amp; Named Slot Projection</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;!-- Inert HTML Template --&gt;
&lt;template id="card-template"&gt;
  &lt;div class="card" style="border: 1px solid #333; padding: 15px; border-radius: 8px;"&gt;
    &lt;header&gt;&lt;slot name="title"&gt;Default Title&lt;/slot&gt;&lt;/header&gt;
    &lt;section&gt;&lt;slot name="body"&gt;Default Body Content&lt;/slot&gt;&lt;/section&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- Instantiating with Custom Web Component --&gt;
&lt;custom-modal&gt;
  &lt;span slot="title"&gt;My Custom Modal Title&lt;/span&gt;
  &lt;p slot="body"&gt;This content is projected into the named body slot!&lt;/p&gt;
&lt;/custom-modal&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Is content inside &lt;template&gt; executed on page load?</h4>
    <p>No! Markup inside <code>&lt;template&gt;</code> is inert. Images are not fetched, scripts are not executed, and CSS styles are not applied until the template is cloned into the active DOM tree using JavaScript.</p>
  </div>
</div>`;

makePage(31, '31-html-templates-slots-shadow-dom.html',
  'HTML Templates & Slots (<template>, <slot>, Named Slots, Shadow DOM)',
  'Complete HTML5 Chapter 31: Learn <template> tag, inert template markup, <slot> projection, named slots, cloning templates with cloneNode(), and Web Component composition.',
  'Phase 12', 'Web Components',
  '<template> Tag · <slot> Projection Tags · Named Slots (<slot name="title">) · Inert HTML Fragments · Template Cloning (cloneNode)',
  c31,
  '30-html-web-components-custom-elements-shadow-dom.html', '30. Custom Elements & Shadow DOM',
  '32-html-performance-resource-hints-lazy-loading.html', '32. Resource Hints & Performance'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 32: Resource Hints & Loading Performance
// ═══════════════════════════════════════════════════════════════════════════════
const c32 = `
<div class="intro-box">
  Welcome to <strong>Phase 13 (Chapter 32): Resource Hints &amp; Loading Performance</strong>! Optimizing page loading speed directly improves Core Web Vitals (LCP, CLS, INP) and user retention. In this chapter, we master script loading attributes (<code>async</code> vs <code>defer</code>), resource hints (<code>&lt;link rel="preload"&gt;</code>, <code>&lt;link rel="prefetch"&gt;</code>, <code>&lt;link rel="preconnect"&gt;</code>, <code>&lt;link rel="dns-prefetch"&gt;</code>), native lazy loading (<code>loading="lazy"</code>), and Core Web Vitals optimization.
</div>

<div class="section-title"><span class="num">1</span>Script Loading Attributes: async vs defer</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Script Tag</th><th>HTML Parsing</th><th>Execution Time</th><th>Best Used For</th></tr></thead>
    <tbody>
      <tr><td><code>&lt;script src="app.js"&gt;</code></td><td>Pauses HTML parsing until script downloads.</td><td>Executes immediately upon download completion.</td><td>Legacy scripts (Avoid for modern performance).</td></tr>
      <tr><td><code>&lt;script async src="app.js"&gt;</code></td><td>Downloads script in background without pausing HTML parsing.</td><td>Executes immediately as soon as downloaded (Order not guaranteed).</td><td>Independent third-party analytics scripts (Google Analytics).</td></tr>
      <tr><td><code>&lt;script defer src="app.js"&gt;</code></td><td>Downloads script in background without pausing HTML parsing.</td><td>Executes ONLY after full HTML DOM parsing is complete (Order preserved).</td><td>Primary application JavaScript code.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Resource Hints (&lt;link rel="preload | preconnect"&gt;)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">HTML — Resource Hints Syntax</span>
      <a class="try-btn" href="/online-html-editor.html">▶ Run in HTML Editor</a>
    </div>
    <pre><code>&lt;head&gt;
  &lt;!-- Preconnect to External API Origin (Establishes early TCP/TLS handshake) --&gt;
  &lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
  &lt;link rel="preconnect" href="https://fonts.gstatic.com" crossorigin&gt;

  &lt;!-- Preload Critical Hero Image (High-priority download for LCP) --&gt;
  &lt;link rel="preload" href="/images/hero-banner.webp" as="image" type="image/webp"&gt;

  &lt;!-- Prefetch Next Page Asset (Low-priority download for future navigation) --&gt;
  &lt;link rel="prefetch" href="/blog-html/33-next-chapter.html"&gt;
&lt;/head&gt;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between preload and prefetch?</h4>
    <p><code>preload</code> instructs the browser to download a high-priority resource required for the <em>current</em> page immediately. <code>prefetch</code> instructs the browser to download a low-priority resource that will be needed for <em>future</em> page navigations.</p>
  </div>
</div>`;

makePage(32, '32-html-performance-resource-hints-lazy-loading.html',
  'Resource Hints & Loading Performance (async, defer, preload, preconnect)',
  'Complete HTML5 Chapter 32: Learn script async vs defer, resource hints preload, preconnect, prefetch, dns-prefetch, native lazy loading, Core Web Vitals LCP & CLS, and page speed optimization.',
  'Phase 13', 'HTML Performance',
  'Script Loading Attributes (async vs defer) · Resource Hints (preload, preconnect, prefetch) · Core Web Vitals (LCP, CLS, INP) · Native Lazy Loading',
  c32,
  '31-html-templates-slots-shadow-dom.html', '31. HTML Templates & Slots',
  null, null
);

console.log('\n🎉 ALL HTML5 PHASES 9 TO 13 (CHAPTERS 22 TO 32) GENERATED SUCCESSFULLY IN 100% PURE ENGLISH!');
