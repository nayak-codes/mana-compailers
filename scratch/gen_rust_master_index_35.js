const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'public', 'blog-rust.html');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rust Complete Roadmap — Masterclass &amp; Reference Guide | Our Compiler</title>
  <meta name="description" content="Master Rust programming with our complete roadmap covering 35 chapters across 11 phases: Rust introduction, installation, Cargo, variables, scalar/compound types, functions, control flow, loops, ownership, borrowing, slices, lifetimes, structs, enums, pattern matching, vectors, strings, hash maps, modules, packages, workspaces, Option<T>, Result<T,E>, ? operator, error libraries, generics, traits, advanced lifetimes, iterators, closures, and smart pointers." />
  <meta name="keywords" content="rust tutorial, learn rust, rust programming, cargo, rustc, memory safety, ownership, borrow checker, rust install, rust variables, rust modules, rust error handling, rust generics, rust traits, rust iterators, rust smart pointers" />
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
      <span class="badge">🟢 35 Chapters Complete</span>
      <span class="badge">📂 Phases 1 to 11 Complete</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Rust · Memory Safety · Zero-Cost Abstractions · Cargo Basics · Variables &amp; Mutability · Functions &amp; Control Flow · Ownership Rules · Borrowing &amp; References · Slices · Lifetimes · Structs &amp; impl · Enums &amp; Option&lt;T&gt; · Pattern Matching · Vectors, Strings &amp; Hash Maps · Modules &amp; Packages · Cargo Workspaces · Option&lt;T&gt; &amp; Result&lt;T,E&gt; · ? Operator · Error Libraries · Generics &amp; Traits · Advanced Lifetimes · Iterators, Closures &amp; Smart Pointers</span>
    </div>

    <div style="background: linear-gradient(135deg, rgba(183,65,14,0.15), rgba(20,24,32,0.6)); border: 1px solid rgba(183,65,14,0.3); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color:#f97316; margin-bottom: 10px; font-size:18px;">🎯 Complete Rust Masterclass Roadmap</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Master systems programming with Rust: explore memory safety pillars, install toolchains with rustup, build projects with Cargo, master ownership and borrowing rules, design custom structs and enums, organize code into modules and workspaces, handle errors gracefully, implement generic traits, and utilize functional iterators and smart pointers:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-rust/01-what-is-rust.html" style="background:linear-gradient(135deg, #b7410e, #d97706); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: What is Rust? →</a>
        <a href="/blog-rust/12-ownership.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Ownership →</a>
        <a href="/blog-rust/23-modules.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Modules →</a>
        <a href="/blog-rust/26-option-t.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Error Handling →</a>
        <a href="/blog-rust/30-generics.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 10: Generics &amp; Traits →</a>
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
          <a href="/blog-rust/01-what-is-rust.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">01</span><div class="lesson-info"><span class="lesson-title">1. What is Rust?</span><span class="lesson-subtopics">Rust Definition · Features · Rust vs C/C++/Go · Memory Safety · Zero-Cost Abstractions · No GC · Use Cases</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/02-rust-prerequisites.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">02</span><div class="lesson-info"><span class="lesson-title">2. Rust Prerequisites</span><span class="lesson-subtopics">Variables · Data Types · Functions · Control Flow · Stack vs Heap Memory · Terminal CLI · Git Basics</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 2 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">⚙️</span><div><div class="phase-roadmap-tag">Phase 02</div><h3 class="phase-roadmap-title">Setup and First Program</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/03-rust-installation.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">03</span><div class="lesson-info"><span class="lesson-title">3. Rust Installation</span><span class="lesson-subtopics">rustup · rustc · Cargo · Stable vs Nightly channels · VS Code &amp; rust-analyzer setup</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/04-first-rust-program.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">04</span><div class="lesson-info"><span class="lesson-title">4. First Rust Program</span><span class="lesson-subtopics">Creating .rs files · fn main() · println! macro · Semicolons · Compiling with rustc</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/05-cargo-basics.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">05</span><div class="lesson-info"><span class="lesson-title">5. Cargo Basics</span><span class="lesson-subtopics">What is Cargo? · cargo new · Cargo.toml · cargo run · cargo build · cargo check · cargo clippy</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 3 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">📊</span><div><div class="phase-roadmap-tag">Phase 03</div><h3 class="phase-roadmap-title">Variables and Data Types</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/06-variables.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">06</span><div class="lesson-info"><span class="lesson-title">6. Variables</span><span class="lesson-subtopics">Variable declaration (let) · Immutability · Mutability (mut) · Shadowing · Constants (const) · Scope</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/07-scalar-types.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">07</span><div class="lesson-info"><span class="lesson-title">7. Scalar Types</span><span class="lesson-subtopics">Integers (i32, u32, usize) · Floats (f64) · Booleans · Unicode characters · Type casting (as)</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/08-compound-types.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">08</span><div class="lesson-info"><span class="lesson-title">8. Compound Types</span><span class="lesson-subtopics">Tuples · Indexing &amp; Destructuring · Fixed-size Arrays · Slices (&amp;[T]) · Arrays vs Vectors</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 4 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🔁</span><div><div class="phase-roadmap-tag">Phase 04</div><h3 class="phase-roadmap-title">Functions and Control Flow</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/09-functions.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">09</span><div class="lesson-info"><span class="lesson-title">9. Functions</span><span class="lesson-subtopics">Function declaration (fn) · Parameters · Return types (-&gt;) · Statements vs Expressions · Implicit return</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/10-conditions.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">10</span><div class="lesson-info"><span class="lesson-title">10. Conditions</span><span class="lesson-subtopics">if / else if / else · Conditions as Expressions · Boolean expressions · Ternary alternative</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/11-loops.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">11</span><div class="lesson-info"><span class="lesson-title">11. Loops</span><span class="lesson-subtopics">loop · while · for · Ranges (1..5, 1..=5) · break &amp; continue · Returning values from loop · Labels</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 5 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🔑</span><div><div class="phase-roadmap-tag">Phase 05</div><h3 class="phase-roadmap-title">Ownership and Borrowing</h3></div></div>
          <span class="phase-roadmap-badge">4 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/12-ownership.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">12</span><div class="lesson-info"><span class="lesson-title">12. Ownership</span><span class="lesson-subtopics">What is Ownership? · 3 Golden Rules · Move Semantics · Copy vs Clone · Automatic Drop</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/13-borrowing-and-references.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">13</span><div class="lesson-info"><span class="lesson-title">13. Borrowing and References</span><span class="lesson-subtopics">References (&amp;) · Immutable Borrows (&amp;T) · Mutable Borrows (&amp;mut T) · Borrowing Rules · Dangling prevention</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/14-slices.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">14</span><div class="lesson-info"><span class="lesson-title">14. Slices</span><span class="lesson-subtopics">What is a Slice? · String slices (&amp;str) · Array slices (&amp;[T]) · Range indexing · Slice functions</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/15-lifetimes-introduction.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">15</span><div class="lesson-info"><span class="lesson-title">15. Lifetimes Introduction</span><span class="lesson-subtopics">What is a Lifetime? · Lifetime annotations ('a) · Elision rules · Function &amp; Struct lifetimes · 'static</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 6 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🧩</span><div><div class="phase-roadmap-tag">Phase 06</div><h3 class="phase-roadmap-title">Structs, Enums and Pattern Matching</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/16-structs.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">16</span><div class="lesson-info"><span class="lesson-title">16. Structs</span><span class="lesson-subtopics">Defining Structs · Field shorthand · Update syntax · Tuple structs · Implementation blocks (impl) · Methods</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/17-enums.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">17</span><div class="lesson-info"><span class="lesson-title">17. Enums</span><span class="lesson-subtopics">What is an Enum? · Data variants · Enum methods · Option&lt;T&gt; (Some, None) · Result&lt;T, E&gt;</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/18-pattern-matching.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">18</span><div class="lesson-info"><span class="lesson-title">18. Pattern Matching</span><span class="lesson-subtopics">match expressions · Match arms · Matching enums &amp; structs · if let &amp; while let · Catch-all (_)</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 7 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">📦</span><div><div class="phase-roadmap-tag">Phase 07</div><h3 class="phase-roadmap-title">Collections and Strings</h3></div></div>
          <span class="phase-roadmap-badge">4 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/19-vectors.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">19</span><div class="lesson-info"><span class="lesson-title">19. Vectors</span><span class="lesson-subtopics">Vec&lt;T&gt; · Creating vectors · push &amp; pop · Safe access (.get()) · Vector iteration · Capacity</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/20-strings.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">20</span><div class="lesson-info"><span class="lesson-title">20. Strings</span><span class="lesson-subtopics">String vs &amp;str · push_str · format! macro · UTF-8 encoding · Chars (.chars()) vs Bytes (.bytes())</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/21-hash-maps.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">21</span><div class="lesson-info"><span class="lesson-title">21. Hash Maps</span><span class="lesson-subtopics">HashMap&lt;K, V&gt; · Key-value pairs · Inserting &amp; reading · Entry API (.entry().or_insert()) · Frequency counter</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/22-collections-project.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">22</span><div class="lesson-info"><span class="lesson-title">22. Collections Project</span><span class="lesson-subtopics">Student Marks Manager · Inventory Tracker · Collections capstone project integration</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 8 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">📁</span><div><div class="phase-roadmap-tag">Phase 08</div><h3 class="phase-roadmap-title">Modules, Packages and Cargo</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/23-modules.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">23</span><div class="lesson-info"><span class="lesson-title">23. Modules</span><span class="lesson-subtopics">mod · Item visibility (pub) · Private items · use imports · Relative vs Absolute paths · Scope keywords</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/24-packages-and-crates.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">24</span><div class="lesson-info"><span class="lesson-title">24. Packages and Crates</span><span class="lesson-subtopics">Packages vs Crates · Binary vs Library crates · Cargo.toml · External dependencies · Semantic versioning</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/25-cargo-workspaces.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">25</span><div class="lesson-info"><span class="lesson-title">25. Cargo Workspaces</span><span class="lesson-subtopics">Monorepos · Shared dependencies · Inter-crate imports · Workspace commands · Library/Binary separation</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 9 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🛡️</span><div><div class="phase-roadmap-tag">Phase 09</div><h3 class="phase-roadmap-title">Error Handling</h3></div></div>
          <span class="phase-roadmap-badge">4 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/26-option-t.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">26</span><div class="lesson-info"><span class="lesson-title">26. Option&lt;T&gt;</span><span class="lesson-subtopics">Null safety · Some &amp; None · unwrap_or · Functional combinators (map, and_then) · Pattern matching</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/27-result-t-e.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">27</span><div class="lesson-info"><span class="lesson-title">27. Result&lt;T, E&gt;</span><span class="lesson-subtopics">Recoverable errors · Ok &amp; Err · Matching errors · Custom error enums · File I/O &amp; API error handling</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/28-the-question-mark-operator.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">28</span><div class="lesson-info"><span class="lesson-title">28. The ? Operator</span><span class="lesson-subtopics">Error propagation · Early returns · From trait conversions · Combining Result &amp; Option</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/29-error-handling-libraries.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">29</span><div class="lesson-info"><span class="lesson-title">29. Error Handling Libraries</span><span class="lesson-subtopics">thiserror for libraries · anyhow for applications · Context annotations · Error handling architecture</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 10 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">🧬</span><div><div class="phase-roadmap-tag">Phase 10</div><h3 class="phase-roadmap-title">Generics, Traits and Lifetimes</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/30-generics.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">30</span><div class="lesson-info"><span class="lesson-title">30. Generics</span><span class="lesson-subtopics">Generic functions &amp; structs · Trait bounds (PartialOrd + Copy) · Monomorphization zero-cost abstractions</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/31-traits.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">31</span><div class="lesson-info"><span class="lesson-title">31. Traits</span><span class="lesson-subtopics">Defining &amp; implementing traits · Default methods · Trait bounds · Dynamic trait objects (dyn Trait)</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/32-lifetimes-advanced.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">32</span><div class="lesson-info"><span class="lesson-title">32. Lifetimes Advanced</span><span class="lesson-subtopics">Struct reference lifetimes · Method lifetimes · Elision rules · 'static lifetime · Lifetime bounds</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
        </div>
      </div>

      <!-- Phase 11 -->
      <div class="phase-roadmap-card">
        <div class="phase-roadmap-header">
          <div class="phase-roadmap-title-wrap"><span class="phase-roadmap-icon">⚙️</span><div><div class="phase-roadmap-tag">Phase 11</div><h3 class="phase-roadmap-title">Iterators and Functional Rust</h3></div></div>
          <span class="phase-roadmap-badge">3 Lessons</span>
        </div>
        <div class="phase-lessons-list">
          <a href="/blog-rust/33-iterators.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">33</span><div class="lesson-info"><span class="lesson-title">33. Iterators</span><span class="lesson-subtopics">iter() vs iter_mut() vs into_iter() · Lazy evaluation · map, filter, collect, fold, zip, enumerate</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/34-closures.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">34</span><div class="lesson-info"><span class="lesson-title">34. Closures</span><span class="lesson-subtopics">Closure syntax |args| · Capturing scope · move closures · Fn, FnMut, FnOnce traits · Callbacks</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
          <a href="/blog-rust/35-smart-pointers.html" class="curriculum-lesson-row"><div class="lesson-row-left"><span class="lesson-idx">35</span><div class="lesson-info"><span class="lesson-title">35. Smart Pointers</span><span class="lesson-subtopics">Box&lt;T&gt; · Deref &amp; Drop traits · Rc&lt;T&gt; · Arc&lt;T&gt; thread-safe counting · RefCell&lt;T&gt; interior mutability</span></div></div><div class="lesson-row-right"><span class="lesson-btn">Read Chapter <span class="arrow">→</span></span></div></a>
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
console.log('✅ Generated public/blog-rust.html master index page successfully with all 35 chapters!');
