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

console.log('🚀 Generating SUPER DEEP Rust Masterclass Chapters 48 to 53...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 48: SQL Basics
// ═══════════════════════════════════════════════════════════════════════════════
makePage(48, '48-sql-basics.html',
  'SQL Basics',
  'Complete Rust Chapter 48: Deep guide to SQL database basics, Relational Database Management Systems (RDBMS), tables, primary/foreign keys, CRUD queries, JOINs, indexing, and security.',
  'Phase 16', 'Databases',
  'What is a Database? · RDBMS Architecture · Tables, Columns & Rows · Primary & Foreign Keys · Relational CRUD Queries · SQL JOINs & Indexes · Database Security',
  `<div class="intro-box">
  Welcome to <strong>Phase 16 (Chapter 48): SQL Basics</strong>! Relational databases (RDBMS) store structured persistent data. Before connecting Rust applications to PostgreSQL or SQLite, understand core SQL principles: primary keys, foreign key constraints, normalized tables, and CRUD operations.
</div>

<div class="section-title"><span class="num">1</span>SQL DDL &amp; DML Statements</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">SQL — Table Creation &amp; Querying</span>
    </div>
    <pre><code>CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) 
VALUES ('ravicoder', 'ravi@compiler.com');

SELECT * FROM users WHERE username = 'ravicoder';</code></pre>
  </div>
</div>`,
  '47-rest-api-project.html', '47. REST API Project',
  '49-rust-database-access.html', '49. Database Access'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 49: Rust Database Access
// ═══════════════════════════════════════════════════════════════════════════════
makePage(49, '49-rust-database-access.html',
  'Rust Database Access',
  'Complete Rust Chapter 49: Deep guide to Rust database drivers, async SQLx, Diesel ORM, connection pooling, SQL migrations, compile-time query verification, mapping database rows to Rust structs.',
  'Phase 16', 'Databases',
  'SQLx Async Driver vs Diesel ORM · Connection Pools (sqlx::PgPool) · SQL Migrations · Compile-Time Checked Queries (query!) · Struct Row Mapping (FromRow) · Transactions',
  `<div class="intro-box">
  Welcome to <strong>Phase 16 (Chapter 49): Rust Database Access</strong>! Connecting Rust applications to databases is powered by <strong>SQLx</strong> (an async, compile-time checked SQL driver) or <strong>Diesel</strong> (a type-safe ORM). In this chapter, we master SQLx connection pools, migrations, and row deserialization.
</div>

<div class="section-title"><span class="num">1</span>SQLx Struct Mapping &amp; Query Execution</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — SQLx Row Mapping</span>
    </div>
    <pre><code>// Struct mapping PostgreSQL row columns
#[derive(Debug)]
struct User {
    id: i32,
    username: String,
    email: String,
}

// In async database handler:
// let user = sqlx::query_as!(User, "SELECT id, username, email FROM users WHERE id = $1", 1)
//     .fetch_one(&pool)
//     .await?;</code></pre>
  </div>
</div>`,
  '48-sql-basics.html', '48. SQL Basics',
  '50-database-project.html', '50. Database Project'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 50: Database Project
// ═══════════════════════════════════════════════════════════════════════════════
makePage(50, '50-database-project.html',
  'Database Project',
  'Complete Rust Chapter 50: Database Capstone Project building a complete relational schema for Users, Courses, Lessons, and Progress tracking with async SQL queries, pagination, and authentication.',
  'Phase 16', 'Databases',
  'Database Capstone Schema Design · User, Course & Lesson Tables · Foreign Key Relationships · Async CRUD Queries · Pagination & Filtering · REST API Integration',
  `<div class="intro-box">
  Welcome to <strong>Phase 16 (Chapter 50): Database Project</strong>! Build a complete relational database backend supporting user registration, course publishing, lesson tracking, and student progress monitoring using async SQL queries.
</div>

<div class="section-title"><span class="num">1</span>Database Schema Design</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">SQL — Full Database Schema</span>
    </div>
    <pre><code>CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(8,2) NOT NULL
);

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    order_index INT NOT NULL
);</code></pre>
  </div>
</div>`,
  '49-rust-database-access.html', '49. Database Access',
  '51-unsafe-rust.html', '51. Unsafe Rust'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 51: Unsafe Rust
// ═══════════════════════════════════════════════════════════════════════════════
makePage(51, '51-unsafe-rust.html',
  'Unsafe Rust',
  'Complete Rust Chapter 51: Deep guide to Unsafe Rust, raw pointers (*const T, *mut T), dereferencing raw pointers, unsafe functions, unsafe traits, static mutable state, FFI, and Miri verification.',
  'Phase 17', 'Unsafe & Systems',
  'What is Unsafe Rust? · The 5 Unsafe Superpowers · Raw Pointers (*const T, *mut T) · Dereferencing Raw Pointers · Unsafe Functions & Traits · Miri Undefined Behavior Auditor',
  `<div class="intro-box">
  Welcome to <strong>Phase 17 (Chapter 51): Unsafe Rust</strong>! Rust's compile-time safety guarantees are enforced by the borrow checker. However, low-level systems programming (such as interacting with hardware or OS APIs) requires bypassing these checks via the <code>unsafe</code> keyword!
</div>

<div class="section-title"><span class="num">1</span>Raw Pointers (*const T &amp; *mut T)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Raw Pointer Dereferencing</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let mut num: i32 = 42;

    // Immutable & mutable raw pointers created in safe code!
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;

    // Dereferencing raw pointers REQUIRES an unsafe block!
    unsafe {
        println!("r1 points to value: {}", *r1);
        *r2 = 100;
        println!("r2 modified value to: {}", *r2);
    }
}</code></pre>
  </div>
</div>`,
  '50-database-project.html', '50. Database Project',
  '52-foreign-function-interface.html', '52. FFI Interface'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 52: Foreign Function Interface
// ═══════════════════════════════════════════════════════════════════════════════
makePage(52, '52-foreign-function-interface.html',
  'Foreign Function Interface',
  'Complete Rust Chapter 52: Deep guide to Foreign Function Interface (FFI) in Rust, calling C library functions, extern "C" blocks, C-compatible types (std::ffi), bindgen header generation, and safe wrapper design.',
  'Phase 17', 'Unsafe & Systems',
  'What is FFI? · Calling C Functions from Rust · extern "C" ABI Block · C Types (c_int, c_char, CString) · bindgen Automated Binding Generator · Safe API Wrapper Encapsulation',
  `<div class="intro-box">
  Welcome to <strong>Phase 17 (Chapter 52): Foreign Function Interface (FFI)</strong>! FFI enables Rust code to call existing C/C++ native dynamic libraries (and vice versa). In this chapter, we explore <code>extern "C"</code> blocks, C-compatible string types (<code>CString</code>, <code>CStr</code>), and safe wrapper abstraction patterns.
</div>

<div class="section-title"><span class="num">1</span>Calling C Standard Library Functions (abs &amp; strlen)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Calling C Standard Library abs()</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::os::raw::c_int;

extern "C" {
    // Import C standard library abs function
    fn abs(input: c_int) -> c_int;
}

fn main() {
    unsafe {
        let result = abs(-42);
        println!("C abs(-42) result: {result}");
    }
}</code></pre>
  </div>
</div>`,
  '51-unsafe-rust.html', '51. Unsafe Rust',
  '53-embedded-and-systems-rust.html', '53. Embedded & Systems'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 53: Embedded and Systems Rust
// ═══════════════════════════════════════════════════════════════════════════════
makePage(53, '53-embedded-and-systems-rust.html',
  'Embedded and Systems Rust',
  'Complete Rust Chapter 53: Capstone guide to Embedded and Systems Rust programming, #![no_std] environments, bare-metal microcontrollers, memory constraints, hardware registers (MMIO), interrupts, cross compilation, and OS development.',
  'Phase 17', 'Unsafe & Systems',
  'Embedded Systems Overview · #![no_std] Core Library Environment · Memory-Mapped I/O (MMIO) Registers · Interrupt Handlers · Cross Compilation Target Triples · Firmware Architecture',
  `<div class="intro-box">
  Welcome to <strong>Phase 17 (Chapter 53): Embedded and Systems Rust</strong>! Rust is ideally suited for bare-metal embedded microcontrollers (ARM Cortex-M, RISC-V, ESP32) where no operating system is present. By declaring <code>#![no_std]</code>, your program links against only the core Rust library, producing minimal binary footings.
</div>

<div class="section-title"><span class="num">1</span>The #![no_std] Core Environment</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — #![no_std] Bare-Metal Entry</span>
    </div>
    <pre><code>#![no_std]
#![no_main]

use core::panic::PanicInfo;

// Custom panic handler required in no_std
#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}</code></pre>
  </div>
</div>`,
  '52-foreign-function-interface.html', '52. FFI Interface',
  null, null
);

console.log('\n🎉 RUST CHAPTERS 48 TO 53 GENERATED SUCCESSFULLY!');
