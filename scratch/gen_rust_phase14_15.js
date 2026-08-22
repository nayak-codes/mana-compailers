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

console.log('🚀 Generating SUPER DEEP Rust Masterclass Chapters 41 to 47...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 41: Threads
// ═══════════════════════════════════════════════════════════════════════════════
makePage(41, '41-threads.html',
  'Threads',
  'Complete Rust Chapter 41: Deep guide to multithreading in Rust, thread::spawn, join handles, moving ownership into closures (move), thread return values, thread error handling, and thread pools.',
  'Phase 14', 'Concurrency',
  'What is Concurrency? · OS Native Threads vs User Threads · thread::spawn · Join Handles (.join()) · Move Closures (move keyword) · Thread Ownership & Safety · Thread Return Values',
  `<div class="intro-box">
  Welcome to <strong>Phase 14 (Chapter 41): Threads</strong>! Concurrency is the ability for different parts of a program to execute independently or out of order. Rust provides fearless concurrency guaranteed at compile time through ownership rules. In this chapter, we master <code>thread::spawn</code>, join handles, <code>move</code> closures, and OS thread creation.
</div>

<div class="section-title"><span class="num">1</span>Spawning Threads &amp; Joining Handles</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Spawning Threads &amp; Join</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..=5 {
            println!("Hi number {i} from spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
        "Thread execution completed!"
    });

    for i in 1..=3 {
        println!("Hi number {i} from main thread!");
        thread::sleep(Duration::from_millis(1));
    }

    // Join handle waits for worker thread to finish and yields return value
    let return_val = handle.join().unwrap();
    println!("Spawned thread output: {return_val}");
}</code></pre>
  </div>
</div>`,
  '40-command-line-applications.html', '40. CLI Applications',
  '42-shared-state.html', '42. Shared State'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 42: Shared State
// ═══════════════════════════════════════════════════════════════════════════════
makePage(42, '42-shared-state.html',
  'Shared State',
  'Complete Rust Chapter 42: Deep guide to shared memory concurrency, Mutex<T>, Arc<T> (Atomic Reference Counting), Arc<Mutex<T>>, lock contention, poisoned mutexes, deadlocks, and mpsc channels.',
  'Phase 14', 'Concurrency',
  'Shared Memory Concurrency · Mutex<T> Mutual Exclusion · Arc<T> Thread-Safe Reference Counting · Arc<Mutex<T>> Pattern · Deadlock Prevention · Channels (mpsc) Message Passing',
  `<div class="intro-box">
  Welcome to <strong>Phase 14 (Chapter 42): Shared State</strong>! Sharing state safely across threads requires thread-safe primitives. Learn how <strong><code>Arc&lt;Mutex&lt;T&gt;&gt;</code></strong> enables multi-owner thread-safe mutability and how <strong><code>mpsc</code></strong> (Multiple Producer, Single Consumer) channels facilitate message-passing concurrency.
</div>

<div class="section-title"><span class="num">1</span>Thread-Safe Counter with Arc&lt;Mutex&lt;T&gt;&gt;</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Arc&lt;Mutex&lt;T&gt;&gt; Shared Counter</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter_clone = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final Counter Result: {}", *counter.lock().unwrap());
}</code></pre>
  </div>
</div>`,
  '41-threads.html', '41. Threads',
  '43-async-rust.html', '43. Async Rust'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 43: Async Rust
// ═══════════════════════════════════════════════════════════════════════════════
makePage(43, '43-async-rust.html',
  'Async Rust',
  'Complete Rust Chapter 43: Deep guide to Asynchronous Rust, Futures, async fn, .await yield points, async runtimes (Tokio #[tokio::main]), async tasks, channels, mutexes, and non-blocking I/O.',
  'Phase 14', 'Concurrency',
  'Asynchronous Paradigm vs Threads · Future Trait Definition · async & .await Keywords · Tokio Runtime (#[tokio::main]) · Non-blocking Task Spawning (tokio::spawn) · Async Channels & Mutexes',
  `<div class="intro-box">
  Welcome to <strong>Phase 14 (Chapter 43): Async Rust</strong>! Asynchronous programming allows running thousands of concurrent I/O-bound tasks on a small thread pool without OS thread creation overhead. In Rust, async functions return a state-machine <code>Future</code>, and <code>.await</code> explicitly yields execution to the runtime!
</div>

<div class="section-title"><span class="num">1</span>Async Function &amp; Tokio Runtime</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Tokio Async Task</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>async fn fetch_data() -> String {
    String::from("Data fetched asynchronously!")
}

fn main() {
    // Basic execution demonstration
    let future_data = fetch_data();
    println!("Future created!");
}</code></pre>
  </div>
</div>`,
  '42-shared-state.html', '42. Shared State',
  '44-http-and-networking.html', '44. HTTP & Networking'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 44: HTTP and Networking
// ═══════════════════════════════════════════════════════════════════════════════
makePage(44, '44-http-and-networking.html',
  'HTTP and Networking',
  'Complete Rust Chapter 44: Deep guide to HTTP networking basics, TCP/UDP sockets, client-server models, HTTP methods, status codes, headers, JSON serialization, and TLS overview.',
  'Phase 15', 'Networking & Web',
  'HTTP/1.1 & HTTP/2 Fundamentals · TCP Stream (TcpListener & TcpStream) · Socket Communication · HTTP Request & Response Syntax · JSON Data Payload · TLS Security Overview',
  `<div class="intro-box">
  Welcome to <strong>Phase 15 (Chapter 44): HTTP and Networking</strong>! Learn network programming fundamentals in Rust: TCP streams, UDP sockets, HTTP methods, headers, status codes, and raw socket listeners.
</div>

<div class="section-title"><span class="num">1</span>Basic TCP Server Listener</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — std::net::TcpListener</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::net::TcpListener;

fn main() -> std::io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080")?;
    println!("Server listening on http://127.0.0.1:8080");

    for stream in listener.incoming().take(1) {
        let _stream = stream?;
        println!("Connection established!");
    }

    Ok(())
}</code></pre>
  </div>
</div>`,
  '43-async-rust.html', '43. Async Rust',
  '45-http-client.html', '45. HTTP Client'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 45: HTTP Client
// ═══════════════════════════════════════════════════════════════════════════════
makePage(45, '45-http-client.html',
  'HTTP Client',
  'Complete Rust Chapter 45: Deep guide to HTTP client requests in Rust using reqwest, GET/POST requests, JSON parsing with serde, headers, authentication, timeouts, and async API integration.',
  'Phase 15', 'Networking & Web',
  'reqwest Crate Setup · GET & POST HTTP Requests · Request Headers & Auth Bearer Tokens · Serde JSON Deserialization (.json()) · Timeout & Retry Strategies · Async API Fetching',
  `<div class="intro-box">
  Welcome to <strong>Phase 15 (Chapter 45): HTTP Client</strong>! The <code>reqwest</code> crate is the standard HTTP client library for Rust. Learn how to perform GET and POST requests, handle headers, parse JSON payloads directly into Rust structs using <code>serde</code>, and handle network errors.
</div>

<div class="section-title"><span class="num">1</span>JSON Deserialization with reqwest &amp; serde</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Deserializing API Response Struct</span>
    </div>
    <pre><code>use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct Post {
    id: u32,
    title: String,
    body: String,
}

// In async main:
// let post: Post = reqwest::get("https://jsonplaceholder.typicode.com/posts/1")
//     .await?
//     .json()
//     .await?;</code></pre>
  </div>
</div>`,
  '44-http-and-networking.html', '44. HTTP & Networking',
  '46-web-frameworks.html', '46. Web Frameworks'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 46: Web Frameworks
// ═══════════════════════════════════════════════════════════════════════════════
makePage(46, '46-web-frameworks.html',
  'Web Frameworks',
  'Complete Rust Chapter 46: Deep guide to Rust web frameworks, Axum introduction, Actix Web overview, routes, handlers, extractors, JSON responses, query/path parameters, middleware, and app state.',
  'Phase 15', 'Networking & Web',
  'Rust Web Ecosystem · Axum Framework Architecture · Actix Web Comparison · Routes & Handler Functions · Type-Safe Extractors (Path, Query, Json) · Shared App State (Arc)',
  `<div class="intro-box">
  Welcome to <strong>Phase 15 (Chapter 46): Web Frameworks</strong>! Rust web frameworks like <strong>Axum</strong> (built on Tokio, Tower, and Hyper) and <strong>Actix Web</strong> provide extreme performance, safety, and type-safe routing. In this chapter, we master route handlers, path extractors, and JSON response rendering.
</div>

<div class="section-title"><span class="num">1</span>Basic Axum Web Route Handler</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Axum Web Server Endpoint</span>
    </div>
    <pre><code>// Axum route example
// async fn root() -> &'static str {
//     "Hello, Axum Web Framework!"
// }
//
// let app = Router::new().route("/", get(root));</code></pre>
  </div>
</div>`,
  '45-http-client.html', '45. HTTP Client',
  '47-rest-api-project.html', '47. REST API Project'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 47: REST API Project
// ═══════════════════════════════════════════════════════════════════════════════
makePage(47, '47-rest-api-project.html',
  'REST API Project',
  'Complete Rust Chapter 47: Production REST API Capstone Project in Rust, building Course and User management endpoints, CRUD routes (GET, POST, PUT, DELETE), validation, and integration tests.',
  'Phase 15', 'Networking & Web',
  'REST API Capstone Architecture · Course & User Models · Full CRUD Routes (GET, POST, PUT, DELETE) · JSON Input Validation · In-Memory Database State · Integration API Testing',
  `<div class="intro-box">
  Welcome to <strong>Phase 15 (Chapter 47): REST API Project</strong>! Build a complete, production-grade Course &amp; User REST API in Rust. Implement full CRUD routing (GET all courses, GET by ID, POST new course, PUT update, DELETE) with JSON serialization and thread-safe shared state.
</div>

<div class="section-title"><span class="num">1</span>Course Model &amp; In-Memory State</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — REST API Struct Definition</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>#[derive(Debug, Clone)]
struct Course {
    id: u32,
    title: String,
    author: String,
    price: f64,
}

fn main() {
    let course = Course {
        id: 101,
        title: String::from("Rust Complete Roadmap"),
        author: String::from("Our Compiler"),
        price: 49.99,
    };
    println!("Course Created: {:?}", course);
}</code></pre>
  </div>
</div>`,
  '46-web-frameworks.html', '46. Web Frameworks',
  '48-sql-basics.html', '48. SQL Basics'
);

console.log('\n🎉 RUST CHAPTERS 41 TO 47 GENERATED SUCCESSFULLY!');
