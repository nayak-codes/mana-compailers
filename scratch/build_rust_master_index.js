const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'public', 'blog-rust.html');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rust Complete Roadmap — Masterclass &amp; Tutorials | Our Compiler</title>
  <meta name="description" content="Master Rust programming with our complete roadmap covering Rust introduction, memory safety, zero-cost abstractions, prerequisites, rustup installation, first rust program, Cargo basics, variables, scalar types, and compound types." />
  <meta name="keywords" content="rust tutorial, learn rust, rust programming, cargo, rustc, memory safety, ownership, borrow checker, rust install, rust variables" />
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
      <!-- Phase 01: Rust Introduction -->
      <button class="accordion-header active" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🦀</span>
          <div class="phase-info"><span class="phase-tag">Phase 01</span><span class="phase-title">Rust Introduction</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">2 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content open">
        <a href="/blog-rust/01-what-is-rust.html">1. What is Rust?</a>
        <a href="/blog-rust/02-rust-prerequisites.html">2. Rust Prerequisites</a>
      </div>

      <!-- Phase 02: Setup & First Program -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚙️</span>
          <div class="phase-info"><span class="phase-tag">Phase 02</span><span class="phase-title">Setup &amp; First Program</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/03-rust-installation.html">3. Rust Installation</a>
        <a href="/blog-rust/04-first-rust-program.html">4. First Rust Program</a>
        <a href="/blog-rust/05-cargo-basics.html">5. Cargo Basics</a>
      </div>

      <!-- Phase 03: Variables & Data Types -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">📊</span>
          <div class="phase-info"><span class="phase-tag">Phase 03</span><span class="phase-title">Variables &amp; Data Types</span></div>
        </div>
        <div class="accordion-header-meta"><span class="phase-count-badge">3 Ch</span><svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
      </button>
      <div class="accordion-content">
        <a href="/blog-rust/06-variables.html">6. Variables</a>
        <a href="/blog-rust/07-scalar-types.html">7. Scalar Types</a>
        <a href="/blog-rust/08-compound-types.html">8. Compound Types</a>
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
      <span class="badge">🟢 8 Chapters Complete</span>
      <span class="badge">📂 Phases 1 to 3 Complete</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="topic-pill-box">
      <span class="topic-pill-label">📌 Covered in this course:</span>
      <span class="topic-pill-text">What is Rust · Memory Safety · Zero-Cost Abstractions · No Garbage Collector · rustup &amp; rustc · Cargo Basics · let &amp; mut · Shadowing · Scalar Types (i32, f64, char, bool) · Compound Types (Tuples &amp; Arrays)</span>
    </div>

    <div style="background: linear-gradient(135deg, rgba(183,65,14,0.15), rgba(20,24,32,0.6)); border: 1px solid rgba(183,65,14,0.3); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
      <h3 style="color:#f97316; margin-bottom: 10px; font-size:18px;">🎯 Complete Rust Roadmap</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Master systems programming with Rust: explore memory safety pillars, install toolchains with rustup, build projects with Cargo, manage mutability, and execute code in our online compiler editor:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-rust/01-what-is-rust.html" style="background:linear-gradient(135deg, #b7410e, #d97706); color:#fff; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: What is Rust? →</a>
        <a href="/blog-rust/03-rust-installation.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Cargo &amp; Setup →</a>
        <a href="/blog-rust/06-variables.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Variables &amp; Types →</a>
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

    </div>

    <!-- FAQ Section -->
    <div class="section-title" style="margin-top:40px;"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>

    <div class="faq-card">
      <h4><span style="background:rgba(183,65,14,0.15); color:#f97316; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> Why are variables immutable by default in Rust?</h4>
      <p>Immutability ensures thread safety and prevents accidental state modifications across code blocks, eliminating data race bugs at compile time.</p>
    </div>

    <div class="faq-card">
      <h4><span style="background:rgba(183,65,14,0.15); color:#f97316; padding:2px 8px; border-radius:4px; font-size:12px; margin-right:4px;">Q</span> What is the role of Cargo in Rust development?</h4>
      <p>Cargo is Rust's package manager and build orchestrator. It manages dependencies (crates), compiles code, runs tests, generates documentation, and builds production release binaries.</p>
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
console.log('✅ Generated public/blog-rust.html master index page successfully!');
