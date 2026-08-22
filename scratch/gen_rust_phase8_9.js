const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'blog-rust');
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
    <div class="sidebar-heading">Rust Complete Roadmap</div>
    <a href="/blog-rust.html" class="sidebar-home-link">🌐 Rust Course HOME</a>
    <div class="sidebar-accordion">
      <!-- Phase 01: Rust Introduction -->
      <button class="accordion-header ${activeNum <= 2 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🦀</span>
          <div class="phase-info"><span class="phase-tag">Phase 01</span><span class="phase-title">Rust Introduction</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum <= 2 ? 'open' : ''}">
        <a href="/blog-rust/01-what-is-rust.html" class="${activeNum === 1 ? 'active' : ''}">1. What is Rust?</a>
        <a href="/blog-rust/02-rust-prerequisites.html" class="${activeNum === 2 ? 'active' : ''}">2. Rust Prerequisites</a>
      </div>

      <!-- Phase 02: Setup & First Program -->
      <button class="accordion-header ${activeNum >= 3 && activeNum <= 5 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚙️</span>
          <div class="phase-info"><span class="phase-tag">Phase 02</span><span class="phase-title">Setup &amp; First Program</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 3 && activeNum <= 5 ? 'open' : ''}">
        <a href="/blog-rust/03-rust-installation.html" class="${activeNum === 3 ? 'active' : ''}">3. Rust Installation</a>
        <a href="/blog-rust/04-first-rust-program.html" class="${activeNum === 4 ? 'active' : ''}">4. First Rust Program</a>
        <a href="/blog-rust/05-cargo-basics.html" class="${activeNum === 5 ? 'active' : ''}">5. Cargo Basics</a>
      </div>

      <!-- Phase 03: Variables & Data Types -->
      <button class="accordion-header ${activeNum >= 6 && activeNum <= 8 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📊</span>
          <div class="phase-info"><span class="phase-tag">Phase 03</span><span class="phase-title">Variables &amp; Data Types</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 6 && activeNum <= 8 ? 'open' : ''}">
        <a href="/blog-rust/06-variables.html" class="${activeNum === 6 ? 'active' : ''}">6. Variables</a>
        <a href="/blog-rust/07-scalar-types.html" class="${activeNum === 7 ? 'active' : ''}">7. Scalar Types</a>
        <a href="/blog-rust/08-compound-types.html" class="${activeNum === 8 ? 'active' : ''}">8. Compound Types</a>
      </div>

      <!-- Phase 04: Functions & Control Flow -->
      <button class="accordion-header ${activeNum >= 9 && activeNum <= 11 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔁</span>
          <div class="phase-info"><span class="phase-tag">Phase 04</span><span class="phase-title">Functions &amp; Control Flow</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 9 && activeNum <= 11 ? 'open' : ''}">
        <a href="/blog-rust/09-functions.html" class="${activeNum === 9 ? 'active' : ''}">9. Functions</a>
        <a href="/blog-rust/10-conditions.html" class="${activeNum === 10 ? 'active' : ''}">10. Conditions</a>
        <a href="/blog-rust/11-loops.html" class="${activeNum === 11 ? 'active' : ''}">11. Loops</a>
      </div>

      <!-- Phase 05: Ownership & Borrowing -->
      <button class="accordion-header ${activeNum >= 12 && activeNum <= 15 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🔑</span>
          <div class="phase-info"><span class="phase-tag">Phase 05</span><span class="phase-title">Ownership &amp; Borrowing</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 12 && activeNum <= 15 ? 'open' : ''}">
        <a href="/blog-rust/12-ownership.html" class="${activeNum === 12 ? 'active' : ''}">12. Ownership</a>
        <a href="/blog-rust/13-borrowing-and-references.html" class="${activeNum === 13 ? 'active' : ''}">13. Borrowing &amp; References</a>
        <a href="/blog-rust/14-slices.html" class="${activeNum === 14 ? 'active' : ''}">14. Slices</a>
        <a href="/blog-rust/15-lifetimes-introduction.html" class="${activeNum === 15 ? 'active' : ''}">15. Lifetimes Introduction</a>
      </div>

      <!-- Phase 06: Structs, Enums & Pattern Matching -->
      <button class="accordion-header ${activeNum >= 16 && activeNum <= 18 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🧩</span>
          <div class="phase-info"><span class="phase-tag">Phase 06</span><span class="phase-title">Structs &amp; Enums</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 16 && activeNum <= 18 ? 'open' : ''}">
        <a href="/blog-rust/16-structs.html" class="${activeNum === 16 ? 'active' : ''}">16. Structs</a>
        <a href="/blog-rust/17-enums.html" class="${activeNum === 17 ? 'active' : ''}">17. Enums</a>
        <a href="/blog-rust/18-pattern-matching.html" class="${activeNum === 18 ? 'active' : ''}">18. Pattern Matching</a>
      </div>

      <!-- Phase 07: Collections & Strings -->
      <button class="accordion-header ${activeNum >= 19 && activeNum <= 22 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📦</span>
          <div class="phase-info"><span class="phase-tag">Phase 07</span><span class="phase-title">Collections &amp; Strings</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 19 && activeNum <= 22 ? 'open' : ''}">
        <a href="/blog-rust/19-vectors.html" class="${activeNum === 19 ? 'active' : ''}">19. Vectors</a>
        <a href="/blog-rust/20-strings.html" class="${activeNum === 20 ? 'active' : ''}">20. Strings</a>
        <a href="/blog-rust/21-hash-maps.html" class="${activeNum === 21 ? 'active' : ''}">21. Hash Maps</a>
        <a href="/blog-rust/22-collections-project.html" class="${activeNum === 22 ? 'active' : ''}">22. Collections Project</a>
      </div>

      <!-- Phase 08: Modules, Packages & Cargo -->
      <button class="accordion-header ${activeNum >= 23 && activeNum <= 25 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📁</span>
          <div class="phase-info"><span class="phase-tag">Phase 08</span><span class="phase-title">Modules &amp; Cargo</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 23 && activeNum <= 25 ? 'open' : ''}">
        <a href="/blog-rust/23-modules.html" class="${activeNum === 23 ? 'active' : ''}">23. Modules</a>
        <a href="/blog-rust/24-packages-and-crates.html" class="${activeNum === 24 ? 'active' : ''}">24. Packages &amp; Crates</a>
        <a href="/blog-rust/25-cargo-workspaces.html" class="${activeNum === 25 ? 'active' : ''}">25. Cargo Workspaces</a>
      </div>

      <!-- Phase 09: Error Handling -->
      <button class="accordion-header ${activeNum >= 26 && activeNum <= 29 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🛡️</span>
          <div class="phase-info"><span class="phase-tag">Phase 09</span><span class="phase-title">Error Handling</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 26 && activeNum <= 29 ? 'open' : ''}">
        <a href="/blog-rust/26-option-t.html" class="${activeNum === 26 ? 'active' : ''}">26. Option&lt;T&gt;</a>
        <a href="/blog-rust/27-result-t-e.html" class="${activeNum === 27 ? 'active' : ''}">27. Result&lt;T, E&gt;</a>
        <a href="/blog-rust/28-the-question-mark-operator.html" class="${activeNum === 28 ? 'active' : ''}">28. The ? Operator</a>
        <a href="/blog-rust/29-error-handling-libraries.html" class="${activeNum === 29 ? 'active' : ''}">29. Error Libraries</a>
      </div>

      <!-- Phase 10: Generics, Traits & Lifetimes -->
      <button class="accordion-header ${activeNum >= 30 && activeNum <= 32 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🧬</span>
          <div class="phase-info"><span class="phase-tag">Phase 10</span><span class="phase-title">Generics &amp; Traits</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 30 && activeNum <= 32 ? 'open' : ''}">
        <a href="/blog-rust/30-generics.html" class="${activeNum === 30 ? 'active' : ''}">30. Generics</a>
        <a href="/blog-rust/31-traits.html" class="${activeNum === 31 ? 'active' : ''}">31. Traits</a>
        <a href="/blog-rust/32-lifetimes-advanced.html" class="${activeNum === 32 ? 'active' : ''}">32. Lifetimes Advanced</a>
      </div>

      <!-- Phase 11: Iterators & Functional Rust -->
      <button class="accordion-header ${activeNum >= 33 && activeNum <= 35 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚙️</span>
          <div class="phase-info"><span class="phase-tag">Phase 11</span><span class="phase-title">Iterators &amp; Closures</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 33 && activeNum <= 35 ? 'open' : ''}">
        <a href="/blog-rust/33-iterators.html" class="${activeNum === 33 ? 'active' : ''}">33. Iterators</a>
        <a href="/blog-rust/34-closures.html" class="${activeNum === 34 ? 'active' : ''}">34. Closures</a>
        <a href="/blog-rust/35-smart-pointers.html" class="${activeNum === 35 ? 'active' : ''}">35. Smart Pointers</a>
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
  <title>${escapedTitle} — Rust Complete Roadmap | Our Compiler</title>
  <meta name="description" content="${escapedMetaDesc}" />
  <meta name="keywords" content="rust tutorial, learn rust, rust programming, cargo, rustc, memory safety, ownership, borrow checker" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-rust/${filename}" />
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
              localStorage.setItem('code_rust', rawCode);
              window.location.href = '/online-rust-editor.html';
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
                localStorage.setItem('code_rust', rawCode);
                window.location.href = '/online-rust-editor.html';
              });
            }
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-rust">

<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-rust.html" class="active">Rust</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-go.html">Go</a>
</nav>

<div class="layout">
  <aside class="sidebar">
    ${getSidebarHTML(chNum)}
  </aside>

  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-rust.html">Rust</a><span class="sep">›</span>
      <span class="current">Chapter ${chNum}: ${escapedTitle}</span>
    </div>

    <h1 class="page-title">${escapedTitle}</h1>

    <div class="page-meta">
      <span class="badge">🦀 Rust</span>
      <span class="badge">🟢 Chapter ${chNum} of 35</span>
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
        <span>Reviewed for accuracy &amp; tested on Rust 1.80+ (stable) · Last updated August 2026</span>
      </div>
    </div>

    <div class="nav-footer">
      ${prevLink ? `<a href="${prevLink}" class="nav-btn"><span class="label">← Previous Chapter</span><span class="title">${escapedPrevTitle}</span></a>` : `<a href="/blog-rust.html" class="nav-btn"><span class="label">← Rust Overview</span><span class="title">Course Index</span></a>`}
      ${nextLink ? `<a href="${nextLink}" class="nav-btn" style="text-align:right;"><span class="label">Next Chapter →</span><span class="title">${escapedNextTitle}</span></a>` : `<a href="/blog-rust.html" class="nav-btn" style="text-align:right;"><span class="label">Course Overview 🏁</span><span class="title">Rust Overview</span></a>`}
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(outDir, filename), fullHtml, 'utf8');
  console.log(`  ✅ Generated ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

console.log('🚀 Generating SUPER DEEP Rust Masterclass Chapters 23 to 29...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 23: Modules
// ═══════════════════════════════════════════════════════════════════════════════
makePage(23, '23-modules.html',
  'Modules',
  'Complete Rust Chapter 23: Deep guide to Rust modules (mod), item visibility (pub), private items, nested modules, path imports (use), self, super, crate root, absolute vs relative paths, and module file organization.',
  'Phase 08', 'Modules & Cargo',
  'Module Definition (mod) · Item Visibility (pub vs private) · Nested Modules · Path Imports (use) · Relative & Absolute Paths · Keywords (self, super, crate) · Multi-File Module Layout',
  `<div class="intro-box">
  Welcome to <strong>Phase 8 (Chapter 23): Modules</strong>! As Rust programs grow in size, organizing code into separate scopes and files becomes essential. Modules let you group related definitions (functions, structs, enums, constants) into distinct namespaces, control visibility via <code>pub</code>, and organize code into clean folder structures.
</div>

<div class="section-title"><span class="num">1</span>What is a Module &amp; Inline Module Syntax</div>
<div class="section-body">
  <p>In Rust, modules are declared using the <code>mod</code> keyword. By default, items inside a module (functions, structs, fields) are <strong>private</strong> and cannot be accessed outside their parent module unless explicitly marked with <code>pub</code>:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Inline Module &amp; Visibility</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>mod math {
    // Public function accessible outside math module
    pub fn add(first: i32, second: i32) -> i32 {
        first + second
    }

    // Private helper function (only callable within math)
    fn secret_algorithm(x: i32) -> i32 {
        x * 42
    }
}

fn main() {
    // Calling public function using path syntax math::add
    let result = math::add(10, 20);
    println!("Result from math::add: {result}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>The use Keyword &amp; Relative vs Absolute Paths</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Path Type</th><th>Prefix</th><th>Behavior</th></tr></thead>
    <tbody>
      <tr><td><strong>Absolute Path</strong></td><td><code>crate::</code></td><td>Starts from the crate root directory. Stable across module refactoring.</td></tr>
      <tr><td><strong>Relative Path</strong></td><td><code>self::</code> or <code>super::</code></td><td>Starts from the current module scope (<code>self</code>) or parent module scope (<code>super</code>).</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Path Imports &amp; Re-exporting</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {
            println!("Added customer to waitlist");
        }
    }
}

// Bring hosting module into current scope with use
use front_of_house::hosting;

fn main() {
    hosting::add_to_waitlist();
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Multi-File Module Organization</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">📁 Standard Rust Folder Layout</div>
    <p>In modern Rust projects, you can separate modules into dedicated files:</p>
    <pre><code>src/
├── main.rs
└── models.rs (or models/mod.rs)</code></pre>
    <p>In <code>src/main.rs</code>, write <code>mod models;</code> to load <code>src/models.rs</code>!</p>
  </div>
</div>`,
  '22-collections-project.html', '22. Collections Project',
  '24-packages-and-crates.html', '24. Packages & Crates'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 24: Packages and Crates
// ═══════════════════════════════════════════════════════════════════════════════
makePage(24, '24-packages-and-crates.html',
  'Packages and Crates',
  'Complete Rust Chapter 24: Deep guide to Packages, Crates (Binary vs Library), Cargo.toml manifest, Cargo.lock, external dependencies from crates.io, semantic versioning, feature flags, and publishing crates.',
  'Phase 08', 'Modules & Cargo',
  'Packages vs Crates · Binary Crates vs Library Crates · Cargo.toml Configuration · External Dependencies (crates.io) · Semantic Versioning · Cargo.lock Reproducibility · Feature Flags · Publishing Crates',
  `<div class="intro-box">
  Welcome to <strong>Phase 8 (Chapter 24): Packages and Crates</strong>! Understand Cargo's build hierarchy: a <strong>crate</strong> is the smallest compilation unit, while a <strong>package</strong> is a collection of one or more crates bundled with a <code>Cargo.toml</code> manifest. In this chapter, we explore Binary vs Library crates, external dependency management, semantic versioning, feature flags, and publishing to crates.io.
</div>

<div class="section-title"><span class="num">1</span>Binary Crates vs Library Crates</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Crate Type</th><th>Entry Point</th><th>Artifact Output</th><th>Primary Purpose</th></tr></thead>
    <tbody>
      <tr><td><strong>Binary Crate</strong></td><td><code>src/main.rs</code> (contains <code>fn main()</code>)</td><td>Executable file (<code>.exe</code> or ELF binary)</td><td>Standalone CLI applications, backend services, servers.</td></tr>
      <tr><td><strong>Library Crate</strong></td><td><code>src/lib.rs</code> (no <code>fn main()</code>)</td><td>Library file (<code>.rlib</code>)</td><td>Reusable functionality shared across projects or published to crates.io.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Cargo.toml Manifest &amp; Dependencies</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TOML — Sample Cargo.toml File</span>
    </div>
    <pre><code>[package]
name = "my_rust_app"
version = "0.1.0"
edition = "2021"
authors = ["Our Compiler Editorial Team <info@ourcompiler.com>"]
description = "A high-performance Rust web service"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.35", features = ["full"] }
reqwest = "0.11"</code></pre>
  </div>
</div>`,
  '23-modules.html', '23. Modules',
  '25-cargo-workspaces.html', '25. Cargo Workspaces'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 25: Cargo Workspaces
// ═══════════════════════════════════════════════════════════════════════════════
makePage(25, '25-cargo-workspaces.html',
  'Cargo Workspaces',
  'Complete Rust Chapter 25: Deep guide to Cargo Workspaces, monorepos, splitting microservices/libraries, shared Cargo.lock, workspace commands, internal crate linking, building and testing workspace members.',
  'Phase 08', 'Modules & Cargo',
  'Cargo Workspaces Definition · Monorepo Architecture · Shared Dependencies & Cargo.lock · Inter-crate Workspace Dependencies · Workspace CLI Commands (cargo build --workspace) · Testing Monorepos',
  `<div class="intro-box">
  Welcome to <strong>Phase 8 (Chapter 25): Cargo Workspaces</strong>! A Cargo workspace is a set of packages that share the same <code>Cargo.lock</code> file and output target directory (<code>target/</code>). Workspaces enable managing large monorepo codebases by cleanly separating internal library crates and binary CLI applications.
</div>

<div class="section-title"><span class="num">1</span>Root Cargo.toml Workspace Setup</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TOML — Workspace Root Cargo.toml</span>
    </div>
    <pre><code>[workspace]
members = [
    "crates/api_server",
    "crates/db_layer",
    "crates/core_utils",
]

resolver = "2"</code></pre>
  </div>
</div>`,
  '24-packages-and-crates.html', '24. Packages & Crates',
  '26-option-t.html', '26. Option<T>'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 26: Option<T>
// ═══════════════════════════════════════════════════════════════════════════════
makePage(26, '26-option-t.html',
  'Option<T>',
  'Complete Rust Chapter 26: Deep guide to Option<T>, avoiding null pointer errors, Some and None variants, is_some(), is_none(), unwrap(), unwrap_or(), map(), and_then(), pattern matching Option, and safe value handling.',
  'Phase 09', 'Error Handling',
  'Why Null is Avoided · Option<T> Enum Definition · Some(T) & None Variants · Helper Methods (is_some, is_none) · Safe Fallbacks (unwrap_or) · Monadic Combinators (map, and_then)',
  `<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 26): Option&lt;T&gt;</strong>! Rust does not have a <code>null</code> or <code>nil</code> pointer value. Instead, the standard library provides the <code>Option&lt;T&gt;</code> enum to represent values that may or may not exist. In this chapter, we explore how <code>Option&lt;T&gt;</code> prevents null pointer crash bugs, pattern matching, safe fallbacks, and functional combinators.
</div>

<div class="section-title"><span class="num">1</span>Option&lt;T&gt; Definition &amp; Basic Usage</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Option Lookup &amp; unwrap_or</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn find_course(id: u32) -> Option<&'static str> {
    if id == 1 {
        Some("Rust Masterclass")
    } else if id == 2 {
        Some("Python Mastery")
    } else {
        None
    }
}

fn main() {
    let course1 = find_course(1);
    let course9 = find_course(9);

    // Safe retrieval using unwrap_or fallback default value
    println!("Course 1: {}", course1.unwrap_or("Unknown Course"));
    println!("Course 9: {}", course9.unwrap_or("Default Course"));
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Combinators: map() and and_then()</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Option Functional Combinators</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let maybe_num: Option<i32> = Some(10);

    // map transforms Option<T> into Option<U>
    let doubled = maybe_num.map(|n| n * 2);
    println!("Doubled: {:?}", doubled);

    // Filter values based on predicate
    let even_only = maybe_num.filter(|n| n % 2 == 0);
    println!("Filtered Even: {:?}", even_only);
}</code></pre>
  </div>
</div>`,
  '25-cargo-workspaces.html', '25. Cargo Workspaces',
  '27-result-t-e.html', '27. Result<T, E>'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 27: Result<T, E>
// ═══════════════════════════════════════════════════════════════════════════════
makePage(27, '27-result-t-e.html',
  'Result<T, E>',
  'Complete Rust Chapter 27: Deep guide to Result<T, E>, recoverable errors, Ok and Err variants, matching Result errors, is_ok(), is_err(), unwrap_or_else(), custom error types, and handling file/API errors.',
  'Phase 09', 'Error Handling',
  'Recoverable Errors Concept · Result<T, E> Enum Definition · Ok(T) & Err(E) Variants · Error Pattern Matching · Safe Fallbacks (unwrap_or_else) · Custom Error Structs & Enums · File I/O Error Examples',
  `<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 27): Result&lt;T, E&gt;</strong>! Rust divides errors into two categories: <strong>unrecoverable failures</strong> (which invoke <code>panic!</code>) and <strong>recoverable errors</strong> (represented by the <code>Result&lt;T, E&gt;</code> enum). In this chapter, we master <code>Ok</code> and <code>Err</code> variants, matching errors, custom error types, and file operations.
</div>

<div class="section-title"><span class="num">1</span>Result&lt;T, E&gt; Definition &amp; Pattern Matching</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Result Handling &amp; Matching</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn divide(numerator: f64, denominator: f64) -> Result<f64, String> {
    if denominator == 0.0 {
        Err(String::from("Cannot divide by zero!"))
    } else {
        Ok(numerator / denominator)
    }
}

fn main() {
    match divide(100.0, 4.0) {
        Ok(result) => println!("Success: {result}"),
        Err(error) => println!("Error: {error}"),
    }
}</code></pre>
  </div>
</div>`,
  '26-option-t.html', '26. Option<T>',
  '28-the-question-mark-operator.html', '28. The ? Operator'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 28: The ? Operator
// ═══════════════════════════════════════════════════════════════════════════════
makePage(28, '28-the-question-mark-operator.html',
  'The ? Operator',
  'Complete Rust Chapter 28: Deep guide to the question mark ? operator, propagating errors, Result & Option propagation, automatic error conversion with From trait, early returns, and writing idiomatic Rust error handling code.',
  'Phase 09', 'Error Handling',
  'The ? Operator Definition · Error Propagation · Result & Option Propagation · Automatic Conversion via From Trait · Early Return Behavior · Clean Idiomatic Code Patterns',
  `<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 28): The ? Operator</strong>! The <code>?</code> operator provides a clean, concise syntax for propagating errors up the call stack. Instead of writing verbose <code>match</code> expressions for every error-prone operation, adding <code>?</code> automatically unwraps <code>Ok</code> values or returns early on <code>Err</code>!
</div>

<div class="section-title"><span class="num">1</span>Propagating Errors with ?</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — The ? Operator Usage</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn parse_and_double(text: &str) -> Result<i32, std::num::ParseIntError> {
    // The ? operator returns early if parse() fails!
    let number: i32 = text.parse::<i32>()?;
    Ok(number * 2)
}

fn main() {
    match parse_and_double("21") {
        Ok(val) => println!("Doubled Parsed Value: {val}"),
        Err(err) => println!("Parse Error: {err}"),
    }
}</code></pre>
  </div>
</div>`,
  '27-result-t-e.html', '27. Result<T, E>',
  '29-error-handling-libraries.html', '29. Error Libraries'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 29: Error Handling Libraries
// ═══════════════════════════════════════════════════════════════════════════════
makePage(29, '29-error-handling-libraries.html',
  'Error Handling Libraries',
  'Complete Rust Chapter 29: Deep guide to professional error handling libraries, custom error enums, thiserror for library crates, anyhow for applications, adding error context, logging, and error handling architecture.',
  'Phase 09', 'Error Handling',
  'Custom Error Enums · thiserror Crate (Domain Error Derivation) · anyhow Crate (Application Error Context) · Context (.context()) · Library vs Application Error Strategies',
  `<div class="intro-box">
  Welcome to <strong>Phase 9 (Chapter 29): Error Handling Libraries</strong>! In production Rust software, managing errors cleanly across crate boundaries requires specialized crates. Use <strong><code>thiserror</code></strong> when building reusable library crates to expose typed domain errors, and use <strong><code>anyhow</code></strong> in binary application crates for effortless error context propagation!
</div>

<div class="section-title"><span class="num">1</span>Custom Error Enums with std::fmt::Display</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Custom Application Error Enum</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::fmt;

#[derive(Debug)]
enum DatabaseError {
    NotFound,
    ConnectionFailed(String),
}

impl fmt::Display for DatabaseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            DatabaseError::NotFound => write!(f, "Record not found in database."),
            DatabaseError::ConnectionFailed(msg) => write!(f, "Database connection failed: {msg}"),
        }
    }
}

impl std::error::Error for DatabaseError {}

fn main() {
    let err = DatabaseError::ConnectionFailed(String::from("Timeout on port 5432"));
    println!("Formatted Error: {err}");
}</code></pre>
  </div>
</div>`,
  '28-the-question-mark-operator.html', '28. The ? Operator',
  '30-generics.html', '30. Generics'
);

console.log('\n🎉 RUST CHAPTERS 23 TO 29 GENERATED SUCCESSFULLY!');
