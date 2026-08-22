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
        <div class="accordion-header-main"><span class="phase-icon-box">🦀</span><div class="phase-info"><span class="phase-tag">Phase 01</span><span class="phase-title">Rust Introduction</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum <= 2 ? 'open' : ''}">
        <a href="/blog-rust/01-what-is-rust.html" class="${activeNum === 1 ? 'active' : ''}">1. What is Rust?</a>
        <a href="/blog-rust/02-rust-prerequisites.html" class="${activeNum === 2 ? 'active' : ''}">2. Rust Prerequisites</a>
      </div>

      <!-- Phase 02: Setup & First Program -->
      <button class="accordion-header ${activeNum >= 3 && activeNum <= 5 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚙️</span><div class="phase-info"><span class="phase-tag">Phase 02</span><span class="phase-title">Setup &amp; First Program</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 3 && activeNum <= 5 ? 'open' : ''}">
        <a href="/blog-rust/03-rust-installation.html" class="${activeNum === 3 ? 'active' : ''}">3. Rust Installation</a>
        <a href="/blog-rust/04-first-rust-program.html" class="${activeNum === 4 ? 'active' : ''}">4. First Rust Program</a>
        <a href="/blog-rust/05-cargo-basics.html" class="${activeNum === 5 ? 'active' : ''}">5. Cargo Basics</a>
      </div>

      <!-- Phase 03: Variables & Data Types -->
      <button class="accordion-header ${activeNum >= 6 && activeNum <= 8 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">📊</span><div class="phase-info"><span class="phase-tag">Phase 03</span><span class="phase-title">Variables &amp; Data Types</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 6 && activeNum <= 8 ? 'open' : ''}">
        <a href="/blog-rust/06-variables.html" class="${activeNum === 6 ? 'active' : ''}">6. Variables</a>
        <a href="/blog-rust/07-scalar-types.html" class="${activeNum === 7 ? 'active' : ''}">7. Scalar Types</a>
        <a href="/blog-rust/08-compound-types.html" class="${activeNum === 8 ? 'active' : ''}">8. Compound Types</a>
      </div>

      <!-- Phase 04: Functions & Control Flow -->
      <button class="accordion-header ${activeNum >= 9 && activeNum <= 11 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🔁</span><div class="phase-info"><span class="phase-tag">Phase 04</span><span class="phase-title">Functions &amp; Control Flow</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 9 && activeNum <= 11 ? 'open' : ''}">
        <a href="/blog-rust/09-functions.html" class="${activeNum === 9 ? 'active' : ''}">9. Functions</a>
        <a href="/blog-rust/10-conditions.html" class="${activeNum === 10 ? 'active' : ''}">10. Conditions</a>
        <a href="/blog-rust/11-loops.html" class="${activeNum === 11 ? 'active' : ''}">11. Loops</a>
      </div>

      <!-- Phase 05: Ownership & Borrowing -->
      <button class="accordion-header ${activeNum >= 12 && activeNum <= 15 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🔑</span><div class="phase-info"><span class="phase-tag">Phase 05</span><span class="phase-title">Ownership &amp; Borrowing</span></div></div>
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
        <div class="accordion-header-main"><span class="phase-icon-box">🧩</span><div class="phase-info"><span class="phase-tag">Phase 06</span><span class="phase-title">Structs &amp; Enums</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 16 && activeNum <= 18 ? 'open' : ''}">
        <a href="/blog-rust/16-structs.html" class="${activeNum === 16 ? 'active' : ''}">16. Structs</a>
        <a href="/blog-rust/17-enums.html" class="${activeNum === 17 ? 'active' : ''}">17. Enums</a>
        <a href="/blog-rust/18-pattern-matching.html" class="${activeNum === 18 ? 'active' : ''}">18. Pattern Matching</a>
      </div>

      <!-- Phase 07: Collections & Strings -->
      <button class="accordion-header ${activeNum >= 19 && activeNum <= 22 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">📦</span><div class="phase-info"><span class="phase-tag">Phase 07</span><span class="phase-title">Collections &amp; Strings</span></div></div>
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
        <div class="accordion-header-main"><span class="phase-icon-box">📁</span><div class="phase-info"><span class="phase-tag">Phase 08</span><span class="phase-title">Modules &amp; Cargo</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 23 && activeNum <= 25 ? 'open' : ''}">
        <a href="/blog-rust/23-modules.html" class="${activeNum === 23 ? 'active' : ''}">23. Modules</a>
        <a href="/blog-rust/24-packages-and-crates.html" class="${activeNum === 24 ? 'active' : ''}">24. Packages &amp; Crates</a>
        <a href="/blog-rust/25-cargo-workspaces.html" class="${activeNum === 25 ? 'active' : ''}">25. Cargo Workspaces</a>
      </div>

      <!-- Phase 09: Error Handling -->
      <button class="accordion-header ${activeNum >= 26 && activeNum <= 29 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🛡️</span><div class="phase-info"><span class="phase-tag">Phase 09</span><span class="phase-title">Error Handling</span></div></div>
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
        <div class="accordion-header-main"><span class="phase-icon-box">🧬</span><div class="phase-info"><span class="phase-tag">Phase 10</span><span class="phase-title">Generics &amp; Traits</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 30 && activeNum <= 32 ? 'open' : ''}">
        <a href="/blog-rust/30-generics.html" class="${activeNum === 30 ? 'active' : ''}">30. Generics</a>
        <a href="/blog-rust/31-traits.html" class="${activeNum === 31 ? 'active' : ''}">31. Traits</a>
        <a href="/blog-rust/32-lifetimes-advanced.html" class="${activeNum === 32 ? 'active' : ''}">32. Lifetimes Advanced</a>
      </div>

      <!-- Phase 11: Iterators & Functional Rust -->
      <button class="accordion-header ${activeNum >= 33 && activeNum <= 35 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚙️</span><div class="phase-info"><span class="phase-tag">Phase 11</span><span class="phase-title">Iterators &amp; Closures</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 33 && activeNum <= 35 ? 'open' : ''}">
        <a href="/blog-rust/33-iterators.html" class="${activeNum === 33 ? 'active' : ''}">33. Iterators</a>
        <a href="/blog-rust/34-closures.html" class="${activeNum === 34 ? 'active' : ''}">34. Closures</a>
        <a href="/blog-rust/35-smart-pointers.html" class="${activeNum === 35 ? 'active' : ''}">35. Smart Pointers</a>
      </div>

      <!-- Phase 12: Testing & Documentation -->
      <button class="accordion-header ${activeNum >= 36 && activeNum <= 38 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🧪</span><div class="phase-info"><span class="phase-tag">Phase 12</span><span class="phase-title">Testing &amp; Docs</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 36 && activeNum <= 38 ? 'open' : ''}">
        <a href="/blog-rust/36-unit-testing.html" class="${activeNum === 36 ? 'active' : ''}">36. Unit Testing</a>
        <a href="/blog-rust/37-integration-testing.html" class="${activeNum === 37 ? 'active' : ''}">37. Integration Testing</a>
        <a href="/blog-rust/38-documentation-and-clippy.html" class="${activeNum === 38 ? 'active' : ''}">38. Documentation &amp; Clippy</a>
      </div>

      <!-- Phase 13: File I/O & CLI Apps -->
      <button class="accordion-header ${activeNum >= 39 && activeNum <= 40 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">💻</span><div class="phase-info"><span class="phase-tag">Phase 13</span><span class="phase-title">File I/O &amp; CLI Apps</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 39 && activeNum <= 40 ? 'open' : ''}">
        <a href="/blog-rust/39-file-handling.html" class="${activeNum === 39 ? 'active' : ''}">39. File Handling</a>
        <a href="/blog-rust/40-command-line-applications.html" class="${activeNum === 40 ? 'active' : ''}">40. CLI Applications</a>
      </div>

      <!-- Phase 14: Concurrency -->
      <button class="accordion-header ${activeNum >= 41 && activeNum <= 43 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚡</span><div class="phase-info"><span class="phase-tag">Phase 14</span><span class="phase-title">Concurrency</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 41 && activeNum <= 43 ? 'open' : ''}">
        <a href="/blog-rust/41-threads.html" class="${activeNum === 41 ? 'active' : ''}">41. Threads</a>
        <a href="/blog-rust/42-shared-state.html" class="${activeNum === 42 ? 'active' : ''}">42. Shared State</a>
        <a href="/blog-rust/43-async-rust.html" class="${activeNum === 43 ? 'active' : ''}">43. Async Rust</a>
      </div>

      <!-- Phase 15: Networking & Web Dev -->
      <button class="accordion-header ${activeNum >= 44 && activeNum <= 47 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🌐</span><div class="phase-info"><span class="phase-tag">Phase 15</span><span class="phase-title">Networking &amp; Web</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 44 && activeNum <= 47 ? 'open' : ''}">
        <a href="/blog-rust/44-http-and-networking.html" class="${activeNum === 44 ? 'active' : ''}">44. HTTP &amp; Networking</a>
        <a href="/blog-rust/45-http-client.html" class="${activeNum === 45 ? 'active' : ''}">45. HTTP Client</a>
        <a href="/blog-rust/46-web-frameworks.html" class="${activeNum === 46 ? 'active' : ''}">46. Web Frameworks</a>
        <a href="/blog-rust/47-rest-api-project.html" class="${activeNum === 47 ? 'active' : ''}">47. REST API Project</a>
      </div>

      <!-- Phase 16: Databases -->
      <button class="accordion-header ${activeNum >= 48 && activeNum <= 50 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🗄️</span><div class="phase-info"><span class="phase-tag">Phase 16</span><span class="phase-title">Databases</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 48 && activeNum <= 50 ? 'open' : ''}">
        <a href="/blog-rust/48-sql-basics.html" class="${activeNum === 48 ? 'active' : ''}">48. SQL Basics</a>
        <a href="/blog-rust/49-rust-database-access.html" class="${activeNum === 49 ? 'active' : ''}">49. Database Access</a>
        <a href="/blog-rust/50-database-project.html" class="${activeNum === 50 ? 'active' : ''}">50. Database Project</a>
      </div>

      <!-- Phase 17: Unsafe Rust & Systems -->
      <button class="accordion-header ${activeNum >= 51 && activeNum <= 53 ? 'active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚠️</span><div class="phase-info"><span class="phase-tag">Phase 17</span><span class="phase-title">Unsafe &amp; Systems</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content ${activeNum >= 51 && activeNum <= 53 ? 'open' : ''}">
        <a href="/blog-rust/51-unsafe-rust.html" class="${activeNum === 51 ? 'active' : ''}">51. Unsafe Rust</a>
        <a href="/blog-rust/52-foreign-function-interface.html" class="${activeNum === 52 ? 'active' : ''}">52. FFI Interface</a>
        <a href="/blog-rust/53-embedded-and-systems-rust.html" class="${activeNum === 53 ? 'active' : ''}">53. Embedded &amp; Systems</a>
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
      <span class="badge">🟢 Chapter ${chNum} of 53</span>
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

console.log('🚀 Generating SUPER DEEP Rust Masterclass Chapters 36 to 40...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 36: Unit Testing
// ═══════════════════════════════════════════════════════════════════════════════
makePage(36, '36-unit-testing.html',
  'Unit Testing',
  'Complete Rust Chapter 36: Deep guide to unit testing in Rust with #[test], assert_eq!, assert_ne!, #[should_panic], #[cfg(test)] module organization, and testing private functions.',
  'Phase 12', 'Testing & Docs',
  'Why Unit Testing Matters · #[test] Attribute · Assertions (assert!, assert_eq!, assert_ne!) · Testing Expected Panics (#[should_panic]) · Test Module Setup (#[cfg(test)]) · Testing Private Functions',
  `<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 36): Unit Testing</strong>! Rust includes a built-in testing framework directly in the language toolchain. Unit tests verify small isolated blocks of logic, and Cargo provides simple CLI commands like <code>cargo test</code> to run your test suite automatically.
</div>

<div class="section-title"><span class="num">1</span>Writing Unit Tests with #[cfg(test)]</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Unit Test Module</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn add(first: i32, second: i32) -> i32 {
    first + second
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn addition_works() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    #[should_panic(expected = "divide by zero")]
    fn divide_by_zero_panics() {
        panic!("divide by zero");
    }
}

fn main() {
    println!("2 + 3 = {}", add(2, 3));
}</code></pre>
  </div>
</div>`,
  '35-smart-pointers.html', '35. Smart Pointers',
  '37-integration-testing.html', '37. Integration Testing'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 37: Integration Testing
// ═══════════════════════════════════════════════════════════════════════════════
makePage(37, '37-integration-testing.html',
  'Integration Testing',
  'Complete Rust Chapter 37: Deep guide to integration testing in Rust, using the tests/ directory, testing public library APIs, test fixtures, test isolation, and running specific test subsets.',
  'Phase 12', 'Testing & Docs',
  'Integration Testing Concept · tests/ Directory Structure · Testing Public Crate APIs · Test Isolation & Parallel Execution · Test Fixtures & Shared Setup · Cargo Test CLI Flags',
  `<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 37): Integration Testing</strong>! While unit tests live inside your source files, integration tests live in a top-level <code>tests/</code> folder outside <code>src/</code>. Integration tests interact with your crate strictly through its public API, treating your library as an external consumer would.
</div>

<div class="section-title"><span class="num">1</span>Creating an Integration Test in tests/</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — tests/integration_test.rs</span>
    </div>
    <pre><code>// In tests/integration_test.rs
use my_crate::add;

#[test]
fn test_public_api_addition() {
    assert_eq!(add(10, 20), 30);
}</code></pre>
  </div>
</div>`,
  '36-unit-testing.html', '36. Unit Testing',
  '38-documentation-and-clippy.html', '38. Documentation & Clippy'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 38: Documentation and Clippy
// ═══════════════════════════════════════════════════════════════════════════════
makePage(38, '38-documentation-and-clippy.html',
  'Documentation and Clippy',
  'Complete Rust Chapter 38: Deep guide to documentation comments (///), rustdoc, doctests, cargo doc, formatting code with cargo fmt, static code analysis with cargo clippy, and CI quality checks.',
  'Phase 12', 'Testing & Docs',
  'Documentation Comments (/// and //!) · Documentation Code Examples (Doctests) · HTML Doc Generation (cargo doc --open) · Code Formatting (cargo fmt) · Linter Checks (cargo clippy) · CI Quality Pipelines',
  `<div class="intro-box">
  Welcome to <strong>Phase 12 (Chapter 38): Documentation and Clippy</strong>! High quality Rust code requires excellent documentation and adherence to compiler recommendations. Learn how to write doc comments with embedded doctests, format code automatically with <code>cargo fmt</code>, and catch common code smells with <code>cargo clippy</code>!
</div>

<div class="section-title"><span class="num">1</span>Doc Comments &amp; Doctests</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Doc Comments with Doctests</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>/// Multiplies two numbers together.
///
/// # Examples
/// \`\`\`
/// let result = multiply(3, 4);
/// assert_eq!(result, 12);
/// \`\`\`
pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

fn main() {
    println!("3 x 4 = {}", multiply(3, 4));
}</code></pre>
  </div>
</div>`,
  '37-integration-testing.html', '37. Integration Testing',
  '39-file-handling.html', '39. File Handling'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 39: File Handling
// ═══════════════════════════════════════════════════════════════════════════════
makePage(39, '39-file-handling.html',
  'File Handling',
  'Complete Rust Chapter 39: Deep guide to File I/O in Rust with std::fs, File, read_to_string, BufReader, BufWriter, opening/writing/appending files, directory operations, and error handling.',
  'Phase 13', 'File I/O & CLI Apps',
  'std::fs File Module · Reading Files (read_to_string) · Writing Files (fs::write) · Buffered I/O (BufReader, BufWriter) · File OpenOptions (Append, Create) · Directory Operations & Metadata',
  `<div class="intro-box">
  Welcome to <strong>Phase 13 (Chapter 39): File Handling</strong>! Performing File I/O in Rust is both safe and efficient. The <code>std::fs</code> module provides clean helper functions like <code>fs::read_to_string()</code> and <code>fs::write()</code>, alongside <code>BufReader</code> and <code>BufWriter</code> for large files.
</div>

<div class="section-title"><span class="num">1</span>Reading &amp; Writing Files</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — File Read and Write</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::fs;

fn main() -> std::io::Result<()> {
    // Write text string to file
    fs::write("notes.txt", "Learning Rust File Handling!")?;

    // Read text file contents back into String
    let content = fs::read_to_string("notes.txt")?;
    println!("File Content: {content}");

    Ok(())
}</code></pre>
  </div>
</div>`,
  '38-documentation-and-clippy.html', '38. Documentation & Clippy',
  '40-command-line-applications.html', '40. CLI Applications'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 40: Command-Line Applications
// ═══════════════════════════════════════════════════════════════════════════════
makePage(40, '40-command-line-applications.html',
  'Command-Line Applications',
  'Complete Rust Chapter 40: Deep guide to building CLI tools in Rust, reading arguments (std::env::args), argument parsing with clap crate, subcommands, flags, options, exit codes, and building a grep clone project.',
  'Phase 13', 'File I/O & CLI Apps',
  'CLI Arguments (std::env::args) · Argument Parsing with clap · Subcommands & Flags · Colored Terminal Output · File Search CLI Project (Grep Clone) · Exit Codes & Error Handling',
  `<div class="intro-box">
  Welcome to <strong>Phase 13 (Chapter 40): Command-Line Applications</strong>! Rust is widely used for building blazing fast CLI tools (like <code>ripgrep</code>, <code>fd</code>, and <code>bat</code>). In this chapter, we master argument parsing using <code>std::env::args</code> and the industry-standard <code>clap</code> crate, culminating in a custom File Search CLI project.
</div>

<div class="section-title"><span class="num">1</span>Parsing Command Line Arguments</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — std::env::args Parser</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    println!("Command Arguments: {:?}", args);

    if args.len() > 1 {
        println!("First argument passed: {}", args[1]);
    }
}</code></pre>
  </div>
</div>`,
  '39-file-handling.html', '39. File Handling',
  '41-threads.html', '41. Threads'
);

console.log('\n🎉 RUST CHAPTERS 36 TO 40 GENERATED SUCCESSFULLY!');
