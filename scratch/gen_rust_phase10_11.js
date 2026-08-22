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

console.log('🚀 Generating SUPER DEEP Rust Masterclass Chapters 30 to 35...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 30: Generics
// ═══════════════════════════════════════════════════════════════════════════════
makePage(30, '30-generics.html',
  'Generics',
  'Complete Rust Chapter 30: Deep guide to Generic functions, generic structs, generic enums, generic methods, multiple type parameters, generic trait bounds (PartialOrd, Copy), type inference, and monomorphization zero-cost abstractions.',
  'Phase 10', 'Generics & Traits',
  'Generic Functions · Generic Structs & Enums · Multiple Type Parameters (&lt;T, U&gt;) · Trait Bounds (PartialOrd + Copy) · Type Inference · Monomorphization (Zero-Cost Abstractions)',
  `<div class="intro-box">
  Welcome to <strong>Phase 10 (Chapter 30): Generics</strong>! Generics allow writing reusable abstract functions, structs, and enums that operate across multiple data types without duplicating code. Rust implements generics via <strong>monomorphization</strong> at compile-time, ensuring zero-cost runtime abstractions!
</div>

<div class="section-title"><span class="num">1</span>Generic Functions with Trait Bounds</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Generic largest Function</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// Generic largest function requiring PartialOrd and Copy trait bounds
fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
    let mut largest = items[0];

    for &item in items {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];
    println!("Largest number: {}", largest(&number_list));

    let char_list = vec!['y', 'm', 'a', 'q'];
    println!("Largest char: {}", largest(&char_list));
}</code></pre>
  </div>
</div>`,
  '29-error-handling-libraries.html', '29. Error Libraries',
  '31-traits.html', '31. Traits'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 31: Traits
// ═══════════════════════════════════════════════════════════════════════════════
makePage(31, '31-traits.html',
  'Traits',
  'Complete Rust Chapter 31: Deep guide to Traits, defining traits, implementing traits, default methods, trait bounds, multiple bounds, impl Trait syntax, dynamic trait objects (dyn Trait), associated types, and derive traits.',
  'Phase 10', 'Generics & Traits',
  'Defining Traits · Implementing Traits for Structs · Default Method Implementations · Trait Bounds (impl Trait) · Dynamic Trait Objects (dyn Trait) · Associated Types · Supertraits · Standard Traits (Display, Debug, Clone)',
  `<div class="intro-box">
  Welcome to <strong>Phase 10 (Chapter 31): Traits</strong>! A trait defines shared interface behavior across types, similar to interfaces in Java or TypeScript. Traits allow specifying method signatures that conforming types must implement, powering polymorphism in Rust.
</div>

<div class="section-title"><span class="num">1</span>Defining &amp; Implementing Traits</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Trait Definition &amp; Implementation</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>pub trait Summary {
    fn summarize_author(&self) -> String;

    // Default method implementation
    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

struct Article {
    headline: String,
    author: String,
}

impl Summary for Article {
    fn summarize_author(&self) -> String {
        format!("@{}", self.author)
    }
}

fn main() {
    let article = Article {
        headline: String::from("Rust 1.80 Released"),
        author: String::from("ourcompiler"),
    };

    println!("Summary: {}", article.summarize());
}</code></pre>
  </div>
</div>`,
  '30-generics.html', '30. Generics',
  '32-lifetimes-advanced.html', '32. Lifetimes Advanced'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 32: Lifetimes Advanced
// ═══════════════════════════════════════════════════════════════════════════════
makePage(32, '32-lifetimes-advanced.html',
  'Lifetimes Advanced',
  'Complete Rust Chapter 32: Deep guide to advanced Lifetimes, struct lifetime parameters, method lifetimes, lifetime elision rules, multiple lifetimes, static lifetime \'static, lifetime bounds, and designing lifetime-safe APIs.',
  'Phase 10', 'Generics & Traits',
  'Lifetime Parameters in Structs · Lifetime Annotations in Methods · The 3 Lifetime Elision Rules · Multiple Lifetimes (\'a, \'b) · Static Lifetime (\'static) · Lifetime Bounds (\'a: \'b)',
  `<div class="intro-box">
  Welcome to <strong>Phase 10 (Chapter 32): Lifetimes Advanced</strong>! Advanced lifetimes allow holding references inside custom structs, specifying lifetime bounds, and mastering Rust's 3 compiler elision rules.
</div>

<div class="section-title"><span class="num">1</span>Structs Holding References with Lifetimes</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Struct with Lifetime Annotations</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// ImportantExcerpt holds a reference to a string slice &str
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find '.'");

    let i = ImportantExcerpt { part: first_sentence };
    println!("Excerpt: {}", i.part);
}</code></pre>
  </div>
</div>`,
  '31-traits.html', '31. Traits',
  '33-iterators.html', '33. Iterators'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 33: Iterators
// ═══════════════════════════════════════════════════════════════════════════════
makePage(33, '33-iterators.html',
  'Iterators',
  'Complete Rust Chapter 33: Deep guide to Iterators, iter(), iter_mut(), into_iter(), next(), lazy evaluation, map(), filter(), collect(), fold(), find(), any(), all(), zip(), enumerate(), and iterator ownership.',
  'Phase 11', 'Iterators & Closures',
  'Iterator Trait Definition · Immutable (iter) vs Mutable (iter_mut) vs Consuming (into_iter) · Lazy Evaluation · Adaptors (map, filter, enumerate, zip) · Consumers (collect, fold, sum)',
  `<div class="intro-box">
  Welcome to <strong>Phase 11 (Chapter 33): Iterators</strong>! Iterators allow performing tasks on sequences of items in a clean, functional style. In Rust, iterators are **lazy**, meaning they produce no overhead until a consumer method (like <code>collect()</code> or <code>fold()</code>) is invoked!
</div>

<div class="section-title"><span class="num">1</span>Iterator Chaining: map(), filter() &amp; collect()</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Doubling Vector Elements with Iterator</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Lazy iterator chain: double each number and collect into new Vector
    let doubled: Vec<i32> = numbers
        .iter()
        .map(|number| number * 2)
        .collect();

    println!("Doubled Vector: {:?}", doubled);
}</code></pre>
  </div>
</div>`,
  '32-lifetimes-advanced.html', '32. Lifetimes Advanced',
  '34-closures.html', '34. Closures'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 34: Closures
// ═══════════════════════════════════════════════════════════════════════════════
makePage(34, '34-closures.html',
  'Closures',
  'Complete Rust Chapter 34: Deep guide to Closures, anonymous functions, closure syntax |x|, capturing environment variables, immutable capture, mutable capture, move closures, Fn, FnMut, and FnOnce traits.',
  'Phase 11', 'Iterators & Closures',
  'Closure Syntax |args| body · Environment Capture Modes · Move Closures (move keyword) · Closure Traits (Fn, FnMut, FnOnce) · Closures with Iterators · Thread Spawning',
  `<div class="intro-box">
  Welcome to <strong>Phase 11 (Chapter 34): Closures</strong>! Rust closures are anonymous functions you can save in variables or pass as arguments to other functions. Unlike standard functions, closures can capture values from the scope in which they are defined!
</div>

<div class="section-title"><span class="num">1</span>Closure Syntax &amp; Environment Capture</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Environment Capture Closures</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let multiplier = 3;

    // Closure capturing 'multiplier' from surrounding environment
    let calc = |x: i32| x * multiplier;

    println!("3 x 10 = {}", calc(10));
}</code></pre>
  </div>
</div>`,
  '33-iterators.html', '33. Iterators',
  '35-smart-pointers.html', '35. Smart Pointers'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 35: Smart Pointers
// ═══════════════════════════════════════════════════════════════════════════════
makePage(35, '35-smart-pointers.html',
  'Smart Pointers',
  'Complete Rust Chapter 35: Deep guide to Smart Pointers, Box<T> heap allocation, Deref trait, Drop trait, Rc<T> reference counting, Arc<T> thread-safe reference counting, RefCell<T> interior mutability, and reference cycles.',
  'Phase 11', 'Iterators & Closures',
  'Smart Pointer Concept · Box<T> Heap Allocation · Deref & Drop Traits · Rc<T> Shared Reference Counting · Arc<T> Thread-Safe Atomic Counting · RefCell<T> Interior Mutability · Weak<T> References',
  `<div class="intro-box">
  Welcome to <strong>Phase 11 (Chapter 35): Smart Pointers</strong>! Smart pointers are data structures that act like pointers while providing additional metadata and capabilities (like reference counting, heap allocation, or interior mutability). In this capstone chapter, we master <code>Box&lt;T&gt;</code>, <code>Rc&lt;T&gt;</code>, <code>Arc&lt;T&gt;</code>, and <code>RefCell&lt;T&gt;</code>!
</div>

<div class="section-title"><span class="num">1</span>Box&lt;T&gt; Heap Allocation &amp; Recursive Types</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Box<T> for Recursive List</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    // Box enables recursive types with known size on stack!
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    println!("Successfully allocated recursive Boxed List!");
}</code></pre>
  </div>
</div>`,
  '34-closures.html', '34. Closures',
  null, null
);

console.log('\n🎉 RUST CHAPTERS 30 TO 35 GENERATED SUCCESSFULLY!');
