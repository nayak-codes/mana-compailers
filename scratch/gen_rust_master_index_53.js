const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'public', 'blog-rust.html');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rust Complete Roadmap — Masterclass &amp; Reference Guide | Our Compiler</title>
  <meta name="description" content="Master Rust programming with our complete roadmap covering 53 chapters across 17 phases: Rust introduction, installation, Cargo, variables, scalar/compound types, functions, control flow, loops, ownership, borrowing, slices, lifetimes, structs, enums, pattern matching, vectors, strings, hash maps, modules, packages, workspaces, Option<T>, Result<T,E>, ? operator, error libraries, generics, traits, advanced lifetimes, iterators, closures, smart pointers, testing, docs, file I/O, CLI apps, threads, shared state, async Rust, networking, reqwest HTTP client, web frameworks, REST API project, SQL basics, database access, database project, unsafe Rust, FFI, and embedded systems." />
  <meta name="keywords" content="rust tutorial, learn rust, rust programming, cargo, rustc, memory safety, ownership, borrow checker, rust install, rust variables, rust modules, rust error handling, rust generics, rust traits, rust iterators, rust smart pointers, rust async, rust web, rust database, unsafe rust, embedded rust" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-rust.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-rust/style.css" />
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
  <!-- LEFT ACCORDION SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Rust Complete Roadmap</div>
    <a href="/blog-rust.html" class="sidebar-home-link active">🌐 Rust Course HOME</a>

    <div class="sidebar-accordion">
      <!-- Phase 01 -->
      <button class="accordion-header active" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🦀</span><div class="phase-info"><span class="phase-tag">Phase 01</span><span class="phase-title">Rust Introduction</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content open">
        <a href="/blog-rust/01-what-is-rust.html">1. What is Rust?</a>
        <a href="/blog-rust/02-rust-prerequisites.html">2. Rust Prerequisites</a>
      </div>

      <!-- Phase 02 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚙️</span><div class="phase-info"><span class="phase-tag">Phase 02</span><span class="phase-title">Setup &amp; First Program</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/03-rust-installation.html">3. Rust Installation</a>
        <a href="/blog-rust/04-first-rust-program.html">4. First Rust Program</a>
        <a href="/blog-rust/05-cargo-basics.html">5. Cargo Basics</a>
      </div>

      <!-- Phase 03 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">📊</span><div class="phase-info"><span class="phase-tag">Phase 03</span><span class="phase-title">Variables &amp; Data Types</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/06-variables.html">6. Variables</a>
        <a href="/blog-rust/07-scalar-types.html">7. Scalar Types</a>
        <a href="/blog-rust/08-compound-types.html">8. Compound Types</a>
      </div>

      <!-- Phase 04 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🔁</span><div class="phase-info"><span class="phase-tag">Phase 04</span><span class="phase-title">Functions &amp; Control Flow</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/09-functions.html">9. Functions</a>
        <a href="/blog-rust/10-conditions.html">10. Conditions</a>
        <a href="/blog-rust/11-loops.html">11. Loops</a>
      </div>

      <!-- Phase 05 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🔑</span><div class="phase-info"><span class="phase-tag">Phase 05</span><span class="phase-title">Ownership &amp; Borrowing</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/12-ownership.html">12. Ownership</a>
        <a href="/blog-rust/13-borrowing-and-references.html">13. Borrowing &amp; References</a>
        <a href="/blog-rust/14-slices.html">14. Slices</a>
        <a href="/blog-rust/15-lifetimes-introduction.html">15. Lifetimes Introduction</a>
      </div>

      <!-- Phase 06 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🧩</span><div class="phase-info"><span class="phase-tag">Phase 06</span><span class="phase-title">Structs &amp; Enums</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/16-structs.html">16. Structs</a>
        <a href="/blog-rust/17-enums.html">17. Enums</a>
        <a href="/blog-rust/18-pattern-matching.html">18. Pattern Matching</a>
      </div>

      <!-- Phase 07 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">📦</span><div class="phase-info"><span class="phase-tag">Phase 07</span><span class="phase-title">Collections &amp; Strings</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/19-vectors.html">19. Vectors</a>
        <a href="/blog-rust/20-strings.html">20. Strings</a>
        <a href="/blog-rust/21-hash-maps.html">21. Hash Maps</a>
        <a href="/blog-rust/22-collections-project.html">22. Collections Project</a>
      </div>

      <!-- Phase 08 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">📁</span><div class="phase-info"><span class="phase-tag">Phase 08</span><span class="phase-title">Modules &amp; Cargo</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/23-modules.html">23. Modules</a>
        <a href="/blog-rust/24-packages-and-crates.html">24. Packages &amp; Crates</a>
        <a href="/blog-rust/25-cargo-workspaces.html">25. Cargo Workspaces</a>
      </div>

      <!-- Phase 09 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🛡️</span><div class="phase-info"><span class="phase-tag">Phase 09</span><span class="phase-title">Error Handling</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/26-option-t.html">26. Option&lt;T&gt;</a>
        <a href="/blog-rust/27-result-t-e.html">27. Result&lt;T, E&gt;</a>
        <a href="/blog-rust/28-the-question-mark-operator.html">28. The ? Operator</a>
        <a href="/blog-rust/29-error-handling-libraries.html">29. Error Libraries</a>
      </div>

      <!-- Phase 10 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🧬</span><div class="phase-info"><span class="phase-tag">Phase 10</span><span class="phase-title">Generics &amp; Traits</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/30-generics.html">30. Generics</a>
        <a href="/blog-rust/31-traits.html">31. Traits</a>
        <a href="/blog-rust/32-lifetimes-advanced.html">32. Lifetimes Advanced</a>
      </div>

      <!-- Phase 11 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚙️</span><div class="phase-info"><span class="phase-tag">Phase 11</span><span class="phase-title">Iterators &amp; Closures</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/33-iterators.html">33. Iterators</a>
        <a href="/blog-rust/34-closures.html">34. Closures</a>
        <a href="/blog-rust/35-smart-pointers.html">35. Smart Pointers</a>
      </div>

      <!-- Phase 12 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🧪</span><div class="phase-info"><span class="phase-tag">Phase 12</span><span class="phase-title">Testing &amp; Docs</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/36-unit-testing.html">36. Unit Testing</a>
        <a href="/blog-rust/37-integration-testing.html">37. Integration Testing</a>
        <a href="/blog-rust/38-documentation-and-clippy.html">38. Documentation &amp; Clippy</a>
      </div>

      <!-- Phase 13 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">💻</span><div class="phase-info"><span class="phase-tag">Phase 13</span><span class="phase-title">File I/O &amp; CLI Apps</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/39-file-handling.html">39. File Handling</a>
        <a href="/blog-rust/40-command-line-applications.html">40. CLI Applications</a>
      </div>

      <!-- Phase 14 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚡</span><div class="phase-info"><span class="phase-tag">Phase 14</span><span class="phase-title">Concurrency</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/41-threads.html">41. Threads</a>
        <a href="/blog-rust/42-shared-state.html">42. Shared State</a>
        <a href="/blog-rust/43-async-rust.html">43. Async Rust</a>
      </div>

      <!-- Phase 15 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🌐</span><div class="phase-info"><span class="phase-tag">Phase 15</span><span class="phase-title">Networking &amp; Web</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">4 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/44-http-and-networking.html">44. HTTP &amp; Networking</a>
        <a href="/blog-rust/45-http-client.html">45. HTTP Client</a>
        <a href="/blog-rust/46-web-frameworks.html">46. Web Frameworks</a>
        <a href="/blog-rust/47-rest-api-project.html">47. REST API Project</a>
      </div>

      <!-- Phase 16 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">🗄️</span><div class="phase-info"><span class="phase-tag">Phase 16</span><span class="phase-title">Databases</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/48-sql-basics.html">48. SQL Basics</a>
        <a href="/blog-rust/49-rust-database-access.html">49. Database Access</a>
        <a href="/blog-rust/50-database-project.html">50. Database Project</a>
      </div>

      <!-- Phase 17 -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main"><span class="phase-icon-box">⚠️</span><div class="phase-info"><span class="phase-tag">Phase 17</span><span class="phase-title">Unsafe &amp; Systems</span></div></div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/51-unsafe-rust.html">51. Unsafe Rust</a>
        <a href="/blog-rust/52-foreign-function-interface.html">52. FFI Interface</a>
        <a href="/blog-rust/53-embedded-and-systems-rust.html">53. Embedded &amp; Systems</a>
      </div>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-rust.html">Rust</a><span class="sep">›</span>
      <span class="current">Master Index: Rust Roadmap</span>
    </div>

    <h1 class="page-title">Rust Complete Roadmap (2026 Edition)</h1>

    <div class="page-meta">
      <span class="badge">🦀 Rust</span>
      <span class="badge">🟢 53 Chapters Complete</span>
      <span class="badge">📂 Phases 1 to 17 Complete</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Rust · Memory Safety · Zero-Cost Abstractions · Cargo Basics · Variables &amp; Mutability · Functions &amp; Control Flow · Ownership Rules · Borrowing &amp; References · Slices · Lifetimes · Structs &amp; impl · Enums &amp; Option&lt;T&gt; · Pattern Matching · Vectors, Strings &amp; Hash Maps · Modules &amp; Packages · Cargo Workspaces · Option&lt;T&gt; &amp; Result&lt;T,E&gt; · ? Operator · Error Libraries · Generics &amp; Traits · Advanced Lifetimes · Iterators, Closures &amp; Smart Pointers · Testing &amp; Docs · File I/O &amp; CLI Apps · Threads, Shared State &amp; Async Rust · HTTP &amp; Web APIs · Databases · Unsafe Rust, FFI &amp; Embedded Systems</span>
    </div>

    <div style="background: linear-gradient(135deg, rgba(183,65,14,0.15), rgba(20,24,32,0.6)); border: 1px solid rgba(183,65,14,0.3); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color:#f97316; margin-bottom: 10px; font-size:18px;">🎯 Complete Rust Masterclass Roadmap (53 Chapters)</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Master systems programming with Rust: explore memory safety pillars, install toolchains with rustup, build projects with Cargo, master ownership and borrowing rules, design custom structs and enums, organize code into modules and workspaces, handle errors gracefully, implement generic traits, utilize functional iterators and smart pointers, build async Tokio web services, access SQL databases, write unsafe code, and build embedded systems:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-rust/01-what-is-rust.html" style="background:linear-gradient(135deg, #b7410e, #d97706); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: What is Rust? →</a>
        <a href="/blog-rust/12-ownership.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Ownership →</a>
        <a href="/blog-rust/23-modules.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Modules →</a>
        <a href="/blog-rust/26-option-t.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Error Handling →</a>
        <a href="/blog-rust/30-generics.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: Generics &amp; Traits →</a>
        <a href="/blog-rust/43-async-rust.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 14: Async Rust →</a>
        <a href="/blog-rust/51-unsafe-rust.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 17: Unsafe Rust →</a>
        <a href="/online-rust-editor.html" style="background:var(--bg3); border:1px solid var(--border); color:#f97316; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">▶ Try Online Rust Editor →</a>
      </div>
    </div>

    <div class="section-title"><span class="num">📚</span> Master Course Curriculum</div>
    <div class="curriculum-roadmap-container">

      <!-- Phase 1 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🦀</span><div><div class="phase-roadmap-tag">Phase 01</div><h3 class="phase-roadmap-title">Rust Introduction</h3></div></div>
          <span class="phase-roadmap-badge">2 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/01-what-is-rust.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">01</span><div class="lesson-info"><span class="lesson-title">1. What is Rust?</span><span class="lesson-subtopics">Rust Definition · Features · Rust vs C/C++/Go · Memory Safety · Zero-Cost Abstractions · No GC</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/02-rust-prerequisites.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">02</span><div class="lesson-info"><span class="lesson-title">2. Rust Prerequisites</span><span class="lesson-subtopics">Variables · Data Types · Functions · Control Flow · Stack vs Heap Memory · Terminal CLI</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 12 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🧪</span><div><div class="phase-roadmap-tag">Phase 12</div><h3 class="phase-roadmap-title">Testing and Documentation</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/36-unit-testing.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">36</span><div class="lesson-info"><span class="lesson-title">36. Unit Testing</span><span class="lesson-subtopics">#[test] · Assertions (assert_eq!, assert_ne!) · #[should_panic] · #[cfg(test)] test modules</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/37-integration-testing.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">37</span><div class="lesson-info"><span class="lesson-title">37. Integration Testing</span><span class="lesson-subtopics">tests/ directory · Public API testing · Test isolation · Test data fixtures · cargo test CLI</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/38-documentation-and-clippy.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">38</span><div class="lesson-info"><span class="lesson-title">38. Documentation and Clippy</span><span class="lesson-subtopics">Doc comments (///) · cargo doc · Doctests · cargo fmt · cargo clippy static analysis</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 13 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">💻</span><div><div class="phase-roadmap-tag">Phase 13</div><h3 class="phase-roadmap-title">File I/O and Command-Line Apps</h3></div></div>
          <span class="phase-roadmap-badge">2 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/39-file-handling.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">39</span><div class="lesson-info"><span class="lesson-title">39. File Handling</span><span class="lesson-subtopics">std::fs · File reading/writing · BufReader &amp; BufWriter · OpenOptions append · Metadata</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/40-command-line-applications.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">40</span><div class="lesson-info"><span class="lesson-title">40. Command-Line Applications</span><span class="lesson-subtopics">std::env::args · clap crate parser · Subcommands &amp; flags · Colored output · Grep CLI project</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 14 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">⚡</span><div><div class="phase-roadmap-tag">Phase 14</div><h3 class="phase-roadmap-title">Concurrency</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/41-threads.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">41</span><div class="lesson-info"><span class="lesson-title">41. Threads</span><span class="lesson-subtopics">thread::spawn · Join handles · move closures · Thread return values · Thread safety</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/42-shared-state.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">42</span><div class="lesson-info"><span class="lesson-title">42. Shared State</span><span class="lesson-subtopics">Mutex&lt;T&gt; · Arc&lt;T&gt; · Arc&lt;Mutex&lt;T&gt;&gt; pattern · Deadlock prevention · mpsc channels</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/43-async-rust.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">43</span><div class="lesson-info"><span class="lesson-title">43. Async Rust</span><span class="lesson-subtopics">Futures · async / .await · Tokio runtime (#[tokio::main]) · Non-blocking tasks · Async I/O</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 15 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🌐</span><div><div class="phase-roadmap-tag">Phase 15</div><h3 class="phase-roadmap-title">Networking and Web Development</h3></div></div>
          <span class="phase-roadmap-badge">4 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/44-http-and-networking.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">44</span><div class="lesson-info"><span class="lesson-title">44. HTTP and Networking</span><span class="lesson-subtopics">HTTP methods &amp; headers · TCP streams · TcpListener · JSON payloads · TLS security</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/45-http-client.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">45</span><div class="lesson-info"><span class="lesson-title">45. HTTP Client</span><span class="lesson-subtopics">reqwest crate · GET &amp; POST · Headers &amp; Auth · Serde JSON deserialization · Timeouts</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/46-web-frameworks.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">46</span><div class="lesson-info"><span class="lesson-title">46. Web Frameworks</span><span class="lesson-subtopics">Axum introduction · Actix Web overview · Routes &amp; handlers · Type-safe extractors · State</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/47-rest-api-project.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">47</span><div class="lesson-info"><span class="lesson-title">47. REST API Project</span><span class="lesson-subtopics">Full CRUD REST API · Course &amp; User models · JSON validation · Shared state · API testing</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 16 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🗄️</span><div><div class="phase-roadmap-tag">Phase 16</div><h3 class="phase-roadmap-title">Databases</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/48-sql-basics.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">48</span><div class="lesson-info"><span class="lesson-title">48. SQL Basics</span><span class="lesson-subtopics">Relational databases · Primary &amp; foreign keys · CRUD operations · JOINs &amp; indexing</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/49-rust-database-access.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">49</span><div class="lesson-info"><span class="lesson-title">49. Rust Database Access</span><span class="lesson-subtopics">SQLx async driver · Diesel ORM · Connection pools · SQL migrations · Struct row mapping</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/50-database-project.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">50</span><div class="lesson-info"><span class="lesson-title">50. Database Project</span><span class="lesson-subtopics">Relational schema design · Users, Courses &amp; Progress tables · Async SQL CRUD · API integration</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 17 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">⚠️</span><div><div class="phase-roadmap-tag">Phase 17</div><h3 class="phase-roadmap-title">Unsafe Rust and Systems</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/51-unsafe-rust.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">51</span><div class="lesson-info"><span class="lesson-title">51. Unsafe Rust</span><span class="lesson-subtopics">Raw pointers (*const T, *mut T) · Dereferencing · Unsafe functions &amp; traits · Miri auditor</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/52-foreign-function-interface.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">52</span><div class="lesson-info"><span class="lesson-title">52. Foreign Function Interface</span><span class="lesson-subtopics">FFI overview · Calling C functions · extern "C" ABI · CString &amp; CStr · bindgen header tool</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/53-embedded-and-systems-rust.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">53</span><div class="lesson-info"><span class="lesson-title">53. Embedded and Systems Rust</span><span class="lesson-subtopics">Embedded Rust · #![no_std] environment · Memory-mapped I/O (MMIO) · Microcontroller firmware</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

    </div>

    <!-- FAQ Section -->
    <div class="section-title" style="margin-top:40px;"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>

    <div class="faq-card">
      <h4><span style="background:rgba(183,65,14,0.15); color:#f97316; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> Why are variables immutable by default in Rust?</h4>
      <p>Immutability ensures thread safety and prevents accidental state modifications across code blocks, eliminating data race bugs at compile time.</p>
    </div>

    <div class="faq-card">
      <h4><span style="background:rgba(183,65,14,0.15); color:#f97316; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> What is the difference between String and &amp;str in Rust?</h4>
      <p><code>String</code> is an owned, heap-allocated, growable UTF-8 string buffer. <code>&amp;str</code> is an immutable slice view borrowing sequence data from existing memory without copying.</p>
    </div>

    <div class="nav-footer">
      <a href="/blog-rust.html" class="nav-btn"><span class="label">← Rust Overview</span><span class="title">Course Index</span></a>
      <a href="/blog-rust/01-what-is-rust.html" class="nav-btn" style="text-align:right;"><span class="label">Start Course →</span><span class="title">1. What is Rust?</span></a>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(targetFile, htmlContent, 'utf8');
console.log('✅ Generated public/blog-rust.html master index page successfully with all 53 chapters!');
