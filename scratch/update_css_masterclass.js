const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const cssDir = path.join(publicDir, 'blog-css');
const cssIndexFile = path.join(publicDir, 'blog-css.html');

const cssPhases = [
  {
    phaseTag: 'Phase 01', phaseTitle: 'CSS Introduction', icon: '🚀',
    chapters: [
      { num: 1, file: '01-css-ante-enti-what-is-css.html', title: '1. What is CSS?', subtopics: 'CSS Full Form · HTML vs CSS vs JS · Syntax · Rules · Properties · Values · Comments · Browser Defaults' },
      { num: 2, file: '02-css-adding-css-to-html.html', title: '2. Adding CSS to HTML', subtopics: 'Inline CSS · Internal CSS · External CSS · <link> · Multiple Stylesheets · @import · Loading Order' }
    ]
  },
  {
    phaseTag: 'Phase 02', phaseTitle: 'Selectors', icon: '🎯',
    chapters: [
      { num: 3, file: '03-css-basic-selectors.html', title: '3. Basic Selectors', subtopics: 'Universal · Element · Class · ID · Grouping · Attribute Selectors · Case Sensitivity' },
      { num: 4, file: '04-css-combinators.html', title: '4. Combinators', subtopics: 'Descendant · Child · Adjacent Sibling · General Sibling · Combining Selectors' },
      { num: 5, file: '05-css-pseudo-classes.html', title: '5. Pseudo-Classes', subtopics: ':hover · :focus · :nth-child() · :not() · :is() · :where() · :has()' },
      { num: 6, file: '06-css-pseudo-elements.html', title: '6. Pseudo-Elements', subtopics: '::before · ::after · ::first-letter · ::selection · ::placeholder · Accessibility' }
    ]
  },
  {
    phaseTag: 'Phase 03', phaseTitle: 'Cascade & Specificity', icon: '⚖️',
    chapters: [
      { num: 7, file: '07-css-cascade.html', title: '7. Cascade', subtopics: 'Source Order · Inheritance · Browser Defaults · User/Author Styles · !important · Debugging' },
      { num: 8, file: '08-css-specificity.html', title: '8. Specificity', subtopics: 'Element · Class · ID · Inline · Calculation · :where() · :is() · Refactoring' },
      { num: 9, file: '09-css-cascade-layers.html', title: '9. Cascade Layers', subtopics: '@layer · Reset · Base · Components · Utilities · Third-Party · Migration' }
    ]
  },
  {
    phaseTag: 'Phase 04', phaseTitle: 'Values, Units & Colors', icon: '🎨',
    chapters: [
      { num: 10, file: '10-css-values-and-units.html', title: '10. Values & Units', subtopics: 'px · % · em · rem · vw/vh · fr · deg · s · ms · Choosing Units' },
      { num: 11, file: '11-css-colors.html', title: '11. Colors', subtopics: 'Hex · RGB · HSL · Opacity · Contrast · Theme Colors · CSS Variables' },
      { num: 12, file: '12-css-functions.html', title: '12. CSS Functions', subtopics: 'calc() · min() · max() · clamp() · var() · linear-gradient() · radial-gradient()' }
    ]
  },
  {
    phaseTag: 'Phase 05', phaseTitle: 'Box Model', icon: '📦',
    chapters: [
      { num: 13, file: '13-css-box-model-basics.html', title: '13. Box Model Basics', subtopics: 'Content · Padding · Border · Margin · box-sizing · Margin Collapse' },
      { num: 14, file: '14-css-width-height-overflow.html', title: '14. Width, Height & Overflow', subtopics: 'min/max width/height · overflow · overflow-wrap · Scroll Containers' },
      { num: 15, file: '15-css-borders-and-shadows.html', title: '15. Borders & Shadows', subtopics: 'Border Style · border-radius · box-shadow · Outline · Focus States' }
    ]
  },
  {
    phaseTag: 'Phase 06', phaseTitle: 'Typography', icon: '✍️',
    chapters: [
      { num: 16, file: '16-css-fonts.html', title: '16. Fonts', subtopics: 'font-family · @font-face · Variable Fonts · Font Loading · Fallback · Performance' },
      { num: 17, file: '17-css-text-styling.html', title: '17. Text Styling', subtopics: 'font-size · line-height · text-align · ellipsis · Typography Scale' },
      { num: 18, file: '18-css-web-fonts-and-icons.html', title: '18. Web Fonts & Icons', subtopics: 'Google Fonts · SVG Icons · aria-hidden · Icon Buttons · Performance' }
    ]
  },
  {
    phaseTag: 'Phase 07', phaseTitle: 'Display & Positioning', icon: '📐',
    chapters: [
      { num: 19, file: '19-css-display.html', title: '19. Display', subtopics: 'block · inline · inline-block · none · visibility · opacity · Accessibility' },
      { num: 20, file: '20-css-positioning.html', title: '20. Positioning', subtopics: 'relative · absolute · fixed · sticky · z-index · Modal · Fixed Header' }
    ]
  },
  {
    phaseTag: 'Phase 08', phaseTitle: 'Flexbox', icon: '↔️',
    chapters: [
      { num: 21, file: '21-css-flexbox-basics.html', title: '21. Flexbox Basics', subtopics: 'display:flex · flex-direction · justify-content · align-items · gap' },
      { num: 22, file: '22-css-flex-items.html', title: '22. Flex Items', subtopics: 'flex-grow · flex-shrink · flex-basis · align-self · order · Centering' },
      { num: 23, file: '23-css-flexbox-projects.html', title: '23. Flexbox Projects', subtopics: 'Navbar · Pricing Cards · Modal · Footer · Media Object · Dashboard' }
    ]
  },
  {
    phaseTag: 'Phase 09', phaseTitle: 'CSS Grid', icon: '⊞',
    chapters: [
      { num: 24, file: '24-css-grid-basics.html', title: '24. Grid Basics', subtopics: 'grid-template-columns · fr · repeat() · minmax() · auto-fit' },
      { num: 25, file: '25-css-grid-placement.html', title: '25. Grid Placement', subtopics: 'grid-area · grid-template-areas · Spanning · place-items' },
      { num: 26, file: '26-css-grid-projects.html', title: '26. Grid Projects', subtopics: 'Card Grid · Gallery · Dashboard · Blog · Magazine · Admin Layout' }
    ]
  },
  {
    phaseTag: 'Phase 10', phaseTitle: 'Responsive Design', icon: '📱',
    chapters: [
      { num: 27, file: '27-css-responsive-design.html', title: '27. Responsive CSS', subtopics: 'Mobile-First · Viewport · Breakpoints · Flexible Images · Responsive Typography' },
      { num: 28, file: '28-css-media-queries.html', title: '28. Media Queries', subtopics: '@media · Dark Mode · Reduced Motion · Print · Pointer · Hover' },
      { num: 29, file: '29-css-container-queries.html', title: '29. Container Queries', subtopics: 'container-type · @container · Component Responsiveness · CQ Units' }
    ]
  },
  {
    phaseTag: 'Phase 11', phaseTitle: 'Backgrounds & Effects', icon: '🖼️',
    chapters: [
      { num: 30, file: '30-css-backgrounds.html', title: '30. Backgrounds', subtopics: 'background-size · background-position · Multiple Backgrounds · Overlays' },
      { num: 31, file: '31-css-gradients.html', title: '31. Gradients', subtopics: 'Linear · Radial · Conic · Gradient Text · Gradient Borders' },
      { num: 32, file: '32-css-filters-and-blend-modes.html', title: '32. Filters & Blend Modes', subtopics: 'blur · grayscale · mix-blend-mode · backdrop-filter · Performance' }
    ]
  },
  {
    phaseTag: 'Phase 12', phaseTitle: 'Transforms & Animations', icon: '✨',
    chapters: [
      { num: 33, file: '33-css-transforms.html', title: '33. Transforms', subtopics: 'translate · scale · rotate · 3D · perspective · Compositing' },
      { num: 34, file: '34-css-transitions.html', title: '34. Transitions', subtopics: 'transition-property · duration · timing-function · Hover · Reduced Motion' },
      { num: 35, file: '35-css-animations.html', title: '35. Animations', subtopics: '@keyframes · iteration-count · fill-mode · Loading · Entrance · Exit' }
    ]
  },
  {
    phaseTag: 'Phase 13', phaseTitle: 'Custom Properties & Themes', icon: '🌓',
    chapters: [
      { num: 36, file: '36-css-variables.html', title: '36. CSS Variables', subtopics: 'Custom Properties · var() · :root · Fallback · Inheritance · Naming' },
      { num: 37, file: '37-css-themes.html', title: '37. Themes', subtopics: 'Light/Dark · prefers-color-scheme · data-theme · Persistence · High Contrast' }
    ]
  },
  {
    phaseTag: 'Phase 14', phaseTitle: 'Forms and UI Components', icon: '📋',
    chapters: [
      { num: 38, file: '38-css-styling-forms.html', title: '38. Styling Forms', subtopics: 'Input styling · Labels · Textareas · Select · Checkboxes · Radios · Focus states · Error messages' },
      { num: 39, file: '39-css-ui-components.html', title: '39. UI Components', subtopics: 'Buttons · Cards · Alerts · Badges · Navbars · Modals · Accordions · Tooltips · Pagination · Skeletons' }
    ]
  },
  {
    phaseTag: 'Phase 15', phaseTitle: 'CSS Architecture', icon: '🏗️',
    chapters: [
      { num: 40, file: '40-css-naming-and-organization.html', title: '40. Naming & Organization', subtopics: 'BEM methodology · Folder structure · Reset styles · Base styles · Utilities · Themes' },
      { num: 41, file: '41-css-methodologies.html', title: '41. CSS Methodologies', subtopics: 'BEM · OOCSS · SMACSS · Utility-first · CSS Modules · Tailwind CSS overview' }
    ]
  },
  {
    phaseTag: 'Phase 16', phaseTitle: 'Modern CSS', icon: '⚡',
    chapters: [
      { num: 42, file: '42-css-modern-selectors.html', title: '42. Modern Selectors', subtopics: ':is() · :where() · :has() · :not() · Attribute & Relational selectors' },
      { num: 43, file: '43-css-modern-layout.html', title: '43. Modern Layout', subtopics: 'Container queries · Subgrid · aspect-ratio · object-fit · Logical properties · Intrinsic sizing' },
      { num: 44, file: '44-css-nesting-and-scope.html', title: '44. Nesting & Scope', subtopics: 'Native CSS nesting · Nested media queries · @scope · Preprocessors · Sass migration' },
      { num: 45, file: '45-css-feature-queries.html', title: '45. Feature Queries', subtopics: '@supports · Progressive enhancement · Fallback styles · Container query fallbacks' }
    ]
  },
  {
    phaseTag: 'Phase 17', phaseTitle: 'Accessibility and Performance', icon: '♿',
    chapters: [
      { num: 46, file: '46-css-accessibility.html', title: '46. CSS Accessibility', subtopics: 'Color contrast · Focus visibility · prefers-reduced-motion · Line length · Touch targets' },
      { num: 47, file: '47-css-performance.html', title: '47. CSS Performance', subtopics: 'File size · Critical CSS · Reflow vs Repaint · Compositing · Performance auditing' }
    ]
  },
  {
    phaseTag: 'Phase 18', phaseTitle: 'Debugging and Projects', icon: '🔧',
    chapters: [
      { num: 48, file: '48-css-debugging.html', title: '48. CSS Debugging', subtopics: 'DevTools · Computed styles · Flexbox/Grid inspectors · Specificity & Overflow debugging' },
      { num: 49, file: '49-css-projects.html', title: '49. CSS Projects', subtopics: 'Profile card · Responsive navbar · Pricing cards · Login page · Dashboard · Dark mode site' }
    ]
  }
];

// Helper to build accordion sidebar HTML
function getCSSSidebarHTML(activeNum) {
  let sidebarAccHTML = '';
  cssPhases.forEach(phase => {
    const isPhaseActive = phase.chapters.some(c => c.num === activeNum);
    sidebarAccHTML += `
      <button class="accordion-header ${isPhaseActive ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">${phase.icon}</span>
          <div class="phase-info"><span class="phase-tag">${phase.phaseTag}</span><span class="phase-title">${phase.phaseTitle}</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">${phase.chapters.length} Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${isPhaseActive ? 'open' : ''}">
        ${phase.chapters.map(c => `<a href="/blog-css/${c.file}" class="${c.num === activeNum ? 'active' : ''}">${c.title}</a>`).join('')}
      </div>`;
  });
  return sidebarAccHTML;
}

// 1. Rebuild public/blog-css.html master index page
const allCssChaptersList = [];
cssPhases.forEach(p => p.chapters.forEach(c => allCssChaptersList.push({ ...c, phaseTag: p.phaseTag, phaseTitle: p.phaseTitle, icon: p.icon })));

const masterIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Complete Roadmap &amp; Master Tutorial (49 Chapters, 18 Phases) | Our Compiler</title>
  <meta name="description" content="Master CSS from zero to production ready with our complete 49-chapter roadmap across 18 phases: syntax, selectors, specificity, cascade layers, flexbox, grid, responsive design, animations, CSS variables, forms, UI components, BEM architecture, modern CSS (:has, nesting, container queries), accessibility, performance, and projects." />
  <meta name="keywords" content="css tutorial, learn css, css roadmap, flexbox, css grid, container queries, css architecture, bem, modern css, css projects" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-css.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-css/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) { content.classList.remove('open'); btn.classList.remove('active'); }
      else { content.classList.add('open'); btn.classList.add('active'); }
    }
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => document.body.classList.add('light-theme'));
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';
          const updateText = () => { toggleBtn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          updateText();
          toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            document.documentElement.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            updateText();
          });
          topnav.appendChild(toggleBtn);
        }
      });
    })();
  </script>
</head>
<body class="lang-css">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html" class="active">CSS</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">CSS Complete Master Course</div>
    <a href="/blog-css.html" class="sidebar-home-link active">🎨 CSS Course HOME</a>

    <div class="sidebar-accordion">
      ${getCSSSidebarHTML(0)}
    </div>

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-html-editor.html" style="color:#3b82f6;font-weight:700;">▶ Try CSS in HTML Editor</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Related Courses</div>
    <a href="/blog-html.html">HTML5 Course</a>
    <a href="/blog-javascript.html">JavaScript Course</a>
    <a href="/blog-python.html">Python 3 Course</a>
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">CSS Complete Roadmap</span>
    </div>

    <h1 class="page-title">CSS Complete Roadmap (49 Chapters, 18 Phases)</h1>

    <div class="page-meta">
      <span class="badge">🎨 CSS3+</span>
      <span class="badge">🟢 49 Complete Chapters</span>
      <span class="badge">📂 18 Complete Phases</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is CSS? · Adding CSS to HTML · Selectors &amp; Combinators · Pseudo-Classes &amp; Pseudo-Elements · Cascade &amp; Specificity · Cascade Layers (@layer) · Values &amp; Units · Colors &amp; Functions · Box Model &amp; Borders · Typography · Display &amp; Positioning · Flexbox Basics &amp; Layouts · CSS Grid &amp; Placement · Mobile-First Responsive Design · Media &amp; Container Queries · Backgrounds &amp; Gradients · Transforms, Transitions &amp; Animations · CSS Variables &amp; Themes · Form Styling &amp; UI Components · BEM Architecture &amp; Methodologies · Modern Selectors (:has, :is, :where) · Native CSS Nesting &amp; Scope · Feature Queries (@supports) · CSS Accessibility &amp; Performance · DevTools Debugging &amp; Projects</span>
    </div>

    <div style="background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(20,24,32,0.6));border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:24px;margin:28px 0;">
      <h3 style="color:#3b82f6;margin-bottom:10px;font-size:18px;">🎯 Complete CSS Masterclass Roadmap (49 Chapters)</h3>
      <p style="color:var(--text2);margin-bottom:16px;font-size:14.5px;">Master modern CSS from zero to production ready: explore selectors, layout engines (Flexbox &amp; Grid), responsive media/container queries, form styling, UI components, BEM architecture, native nesting, accessibility, performance tuning, and hands-on projects:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="/blog-css/01-css-ante-enti-what-is-css.html" style="background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 1: What is CSS? →</a>
        <a href="/blog-css/21-css-flexbox-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 8: Flexbox →</a>
        <a href="/blog-css/24-css-grid-basics.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 9: CSS Grid →</a>
        <a href="/blog-css/38-css-styling-forms.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 14: Form Styling →</a>
        <a href="/blog-css/40-css-naming-and-organization.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 15: Architecture →</a>
        <a href="/blog-css/42-css-modern-selectors.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 16: Modern CSS →</a>
        <a href="/blog-css/49-css-projects.html" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">Phase 18: Projects →</a>
        <a href="/online-html-editor.html" style="background:var(--bg3);border:1px solid var(--border);color:#3b82f6;font-weight:700;padding:10px 16px;border-radius:8px;text-decoration:none;">▶ HTML/CSS Playground →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">
      ${cssPhases.map(phase => `
        <div class="phase-roadmap-card">
          <div class="phase-roadmap-header">
            <div class="phase-roadmap-title-wrap">
              <span class="phase-roadmap-icon">${phase.icon}</span>
              <div>
                <div class="phase-roadmap-tag">${phase.phaseTag}</div>
                <h3 class="phase-roadmap-title">${phase.phaseTitle}</h3>
              </div>
            </div>
            <span class="phase-roadmap-badge">${phase.chapters.length} In-Depth Lessons</span>
          </div>
          <div class="phase-lessons-list">
            ${phase.chapters.map(ch => `
              <a href="/blog-css/${ch.file}" class="curriculum-lesson-row">
                <div class="lesson-row-left">
                  <span class="lesson-idx">${ch.num.toString().padStart(2, '0')}</span>
                  <div class="lesson-info">
                    <span class="lesson-title">${ch.title}</span>
                    <span class="lesson-subtopics">${ch.subtopics}</span>
                  </div>
                </div>
                <div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div>
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>CSS Complete Roadmap · 49 Chapters · 18 Phases · 2026 Edition</span>
      </div>
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn"><span class="label">← All Tutorials</span><span class="title">Course Hub</span></a>
      <a href="/blog-css/01-css-ante-enti-what-is-css.html" class="nav-btn" style="text-align:right;"><span class="label">Start Learning →</span><span class="title">1. What is CSS?</span></a>
    </div>
  </main>
</div>
<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(cssIndexFile, masterIndexHtml, 'utf8');
console.log('✅ Generated public/blog-css.html master index page successfully for all 49 chapters!');

// 2. Audit and update sidebar accordion HTML inside ALL 49 chapter HTML files
const chapterFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.html') && f !== 'style.css').sort();

chapterFiles.forEach((file, idx) => {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract current chapter number
  const numMatch = file.match(/^(\d+)-/);
  const chNum = numMatch ? parseInt(numMatch[1], 10) : idx + 1;

  // Build new sidebar HTML for this chapter
  const newSidebarAcc = getCSSSidebarHTML(chNum);

  // Replace existing sidebar accordion
  const accStart = content.indexOf('<div class="sidebar-accordion">');
  const accEnd = content.indexOf('</div>\n    <div class="sidebar-heading">Interactive IDE</div>');

  if (accStart !== -1 && accEnd !== -1) {
    content = content.substring(0, accStart) +
      '<div class="sidebar-accordion">' + newSidebarAcc + '\n    ' +
      content.substring(accEnd);
  }

  // Ensure try buttons point to /online-html-editor.html
  content = content.replace(/localStorage\.setItem\(['"]code_css['"]/g, "localStorage.setItem('code_html'");

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`✅ Audited & updated sidebar accordions across all ${chapterFiles.length} CSS chapter files in public/blog-css/!`);
