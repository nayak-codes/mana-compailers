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
      <span class="badge">🟢 Chapter ${chNum} of 8</span>
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
  console.log(`  ✅ Deep Generated ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

console.log('🚀 Generating SUPER DEEP Rust Masterclass Chapters 1 to 8...');

// 1. What is Rust?
makePage(1, '01-what-is-rust.html',
  'What is Rust?',
  'Complete Rust Chapter 1: Deep guide to Rust definition, why use Rust, core features, Rust vs C, Rust vs C++, Rust vs Go, Memory safety, Zero-cost abstractions, No garbage collector concept, Rust use cases (Systems, Backend, Embedded, WebAssembly), and Rust limitations.',
  'Phase 01', 'Rust Introduction',
  'Rust Definition · Why Use Rust · Features · Rust vs C/C++/Go Comparison · Memory Safety · Zero-Cost Abstractions · No Garbage Collector · Use Cases (Systems, Backend, Embedded, WASM) · Limitations',
  `<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 1): What is Rust?</strong> Rust is a systems programming language focused on memory safety, performance, and concurrency. The Rust compiler verifies ownership and borrowing rules to detect memory errors at compile time before your code ever runs.
</div>

<div class="section-title"><span class="num">1</span>What is Rust &amp; Why Use Rust?</div>
<div class="section-body">
  <p>Rust is designed to tackle systems-level problems without sacrificing memory safety. In traditional languages like C and C++, developers enjoy bare-metal speed but must manually manage memory allocation using <code>malloc</code> and <code>free</code> (or <code>new</code> and <code>delete</code>). A single missing <code>free()</code> call causes memory leaks, while a duplicate <code>free()</code> call causes <strong>double-free vulnerabilities</strong> or <strong>dangling pointers</strong> (segfaults).</p>
  
  <p>Languages like Java, Python, and Go solve memory errors using an automatic <strong>Garbage Collector (GC)</strong> that periodically pauses execution to scan and free unreferenced memory blocks. However, GC pauses introduce unpredictable latency spikes, making them unsuitable for low-level operating system kernels, real-time game engines, or embedded microcontrollers.</p>

  <p>Rust introduces a groundbreaking third approach: <strong>Compile-Time Ownership &amp; Borrow Checking</strong>. Rust provides memory safety and concurrency without a garbage collector and with zero runtime performance penalty!</p>

  <table class="tbl spec-table">
    <thead><tr><th>Language Feature</th><th>Rust</th><th>C / C++</th><th>Go / Java</th></tr></thead>
    <tbody>
      <tr><td><strong>Memory Safety Guarantee</strong></td><td>✅ Compile-Time Enforced (Borrow Checker)</td><td>❌ Manual (Prone to Segfaults &amp; Overflows)</td><td>✅ Managed Runtime (Garbage Collector)</td></tr>
      <tr><td><strong>Garbage Collection Overhead</strong></td><td>🚫 Zero GC (Deterministic Deallocation)</td><td>🚫 Zero GC</td><td>⚠️ Runtime GC Pauses</td></tr>
      <tr><td><strong>Data Race Prevention</strong></td><td>✅ Compile-Time Thread Safety</td><td>❌ Manual Locking Needed</td><td>⚠️ Mutex / Channel Conventions</td></tr>
      <tr><td><strong>Abstractions Cost</strong></td><td>🚀 Zero-Cost Abstractions</td><td>🚀 High Performance / Zero-Cost</td><td>⚠️ Interfaces &amp; Boxing Overhead</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Basic Hello World Program</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// Rust entry point function fn main()
fn main() {
    // println! is a built-in Rust macro (noted by the !)
    println!("Hello, Rust! Welcome to Memory Safety.");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Subchapters &amp; Deep Concepts</div>
<div class="section-body">
  <ul class="spec-list">
    <li><strong>Memory Safety:</strong> Rust guarantees that pointers always refer to valid memory. Null pointer dereferences and use-after-free bugs are mathematically prevented at compile time.</li>
    <li><strong>Zero-Cost Abstractions:</strong> High-level abstractions (iterators, closures, pattern matching) compile down to low-level assembly code that runs as fast as hand-written loops.</li>
    <li><strong>No Garbage Collector Concept:</strong> Memory is allocated on the heap when an owning variable comes into scope and is automatically deallocated (via <code>drop()</code>) the moment that owning variable leaves its scope block.</li>
    <li><strong>Systems Programming &amp; Backend:</strong> Build web servers with Actix-Web or Axum that process tens of thousands of requests per second with negligible RAM footprints.</li>
    <li><strong>WebAssembly (WASM):</strong> Compile Rust code into WebAssembly to execute heavy computation algorithms (image processing, CAD, cryptography) inside modern web browsers at near-native speed.</li>
  </ul>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Is Rust difficult to learn?</h4>
    <p>Rust has a steep initial learning curve because developers must learn to write code that satisfies the compiler's strict Borrow Checker rules. However, once your Rust program compiles successfully, it rarely crashes in production!</p>
  </div>
</div>`,
  null, null,
  '02-rust-prerequisites.html', '2. Rust Prerequisites'
);

// 2. Rust Prerequisites
makePage(2, '02-rust-prerequisites.html',
  'Rust Prerequisites',
  'Complete Rust Chapter 2: Deep guide to prerequisites including variables, data types, functions, control flow, arrays, strings, structs, basic memory concepts (Stack vs Heap), command-line basics, and Git version control.',
  'Phase 01', 'Rust Introduction',
  'Variables · Data Types · Functions · Control Flow · Arrays & Strings · Structs · Stack vs Heap Memory Concepts · Command-Line Terminal Basics · Git Version Control',
  `<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 2): Rust Prerequisites</strong>! Before diving into Rust's unique ownership system, we review basic building blocks: variables, data types, functions, control flow, arrays, strings, structs, Stack vs Heap memory allocation, terminal basics, and Git version control.
</div>

<div class="section-title"><span class="num">1</span>Memory Architecture (Stack vs Heap)</div>
<div class="section-body">
  <p>Understanding where data lives in memory is essential for writing efficient Rust code:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Memory Region</th><th>Allocation Mechanism</th><th>Data Size &amp; Lifespan</th><th>Access Speed</th></tr></thead>
    <tbody>
      <tr><td><strong>Stack Memory</strong></td><td>LIFO (Last In, First Out). Fixed-size memory pushed and popped automatically during function execution.</td><td>Fixed size known at compile time (integers, booleans, fixed arrays). Automatically dropped when function exits.</td><td>⚡ Ultra-fast (cpu cache friendly)</td></tr>
      <tr><td><strong>Heap Memory</strong></td><td>Dynamic allocation. Memory allocator searches for an unallocated memory region of requested size and returns a pointer address.</td><td>Dynamic or variable size determined at runtime (resizable Strings, Vectors). Managed in Rust via Ownership.</td><td>🐢 Slower (pointer dereferencing required)</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Stack vs Heap Memory Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Stack Allocation: fixed size integer (i32) stored directly on stack
    let x: i32 = 42;

    // Heap Allocation: String text allocated dynamically on the heap
    let text: String = String::from("Hello, Heap Memory!");

    println!("Stack value x = {x}");
    println!("Heap text = {text}");
}</code></pre>
  </div>
</div>`,
  '01-what-is-rust.html', '1. What is Rust?',
  '03-rust-installation.html', '3. Rust Installation'
);

// 3. Rust Installation
makePage(3, '03-rust-installation.html',
  'Rust Installation',
  'Complete Rust Chapter 3: Deep guide to installing Rust using rustup, rustc compiler, Cargo package manager, checking versions, updating toolchains, Stable vs Nightly channels, VS Code setup with rust-analyzer, online compilers, and troubleshooting errors.',
  'Phase 02', 'Setup & First Program',
  'Installing Rust · rustup Toolchain Manager · rustc Compiler · Cargo Package Manager · Checking & Updating Versions · Stable vs Nightly Channels · VS Code & rust-analyzer Setup · Installation Troubleshooting',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 3): Rust Installation</strong>! Setting up your Rust development environment is managed using <code>rustup</code>—the official Rust toolchain installer. In this chapter, we install <code>rustc</code>, <code>cargo</code>, configure release channels, and set up Visual Studio Code with the <code>rust-analyzer</code> extension.
</div>

<div class="section-title"><span class="num">1</span>Installing Rust &amp; Checking Toolchain Versions</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Installation &amp; Version Commands</span>
    </div>
    <pre><code># Install Rust on macOS/Linux/WSL:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Check Rust compiler version:
rustc --version

# Check Cargo package manager version:
cargo --version

# Update Rust to latest stable release:
rustup update</code></pre>
  </div>
</div>`,
  '02-rust-prerequisites.html', '2. Rust Prerequisites',
  '04-first-rust-program.html', '4. First Rust Program'
);

// 4. First Rust Program
makePage(4, '04-first-rust-program.html',
  'First Rust Program',
  'Complete Rust Chapter 4: Deep guide to creating a .rs source file, fn main() entry point, println! macro formatting, semicolons, comments, compiling with rustc, running executables, compiler diagnostic messages, and code formatting with rustfmt.',
  'Phase 02', 'Setup & First Program',
  'Creating .rs Files · fn main() Entry Point · println! Macro · Macro Mechanics (!) · Semicolons & Syntax Rules · Comments · Compiling with rustc · Compiler Diagnostics · Code Formatting',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 4): First Rust Program</strong>! Write, compile, and run your first standalone Rust source file using <code>rustc</code>. Explore function entry points, macro syntax, semicolons, and compiler diagnostic output.
</div>

<div class="section-title"><span class="num">1</span>Writing &amp; Executing main.rs</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — main.rs Source Code</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // println! is a macro that prints formatted text to stdout
    println!("Hello, Rust!");
}</code></pre>
  </div>
</div>`,
  '03-rust-installation.html', '3. Rust Installation',
  '05-cargo-basics.html', '5. Cargo Basics'
);

// 5. Cargo Basics
makePage(5, '05-cargo-basics.html',
  'Cargo Basics',
  'Complete Rust Chapter 5: Deep guide to Cargo package manager, creating projects with cargo new, Cargo.toml manifest, src/main.rs, Cargo.lock, cargo run, cargo build, cargo check, cargo fmt, cargo clippy, cargo clean, release builds, and managing crates dependencies.',
  'Phase 02', 'Setup & First Program',
  'Cargo Package Manager · Creating Projects (cargo new) · Cargo.toml Manifest · Cargo.lock · cargo run & cargo build · cargo check Validation · cargo clippy Linter · Release Builds (--release)',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 5): Cargo Basics</strong>! Cargo is Rust's official build system and package manager. Cargo automates project creation, dependency management, compilation, testing, and production builds.
</div>

<div class="section-title"><span class="num">1</span>Creating &amp; Running a Cargo Project</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Cargo Workflow Commands</span>
    </div>
    <pre><code># Create new cargo project
cargo new hello-rust
cd hello-rust

# Compile and run project
cargo run

# Rapid syntax check without binary generation
cargo check

# Production optimized build
cargo build --release</code></pre>
  </div>
</div>`,
  '04-first-rust-program.html', '4. First Rust Program',
  '06-variables.html', '6. Variables'
);

// 6. Variables
makePage(6, '06-variables.html',
  'Variables',
  'Complete Rust Chapter 6: Deep guide to variable declaration with let, immutability by default, mutability with mut, variable shadowing, constants const, static variables, scope blocks, type annotations, type inference, and naming conventions.',
  'Phase 03', 'Variables & Data Types',
  'Variable Declaration (let) · Immutability by Default · Mutability (mut) · Variable Shadowing · Constants (const) · Static Variables (static) · Scope & Lifespan · Type Annotations vs Inference',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 6): Variables</strong>! Rust variables are <strong>immutable by default</strong>. To allow value changes, explicitly mark them with the <code>mut</code> keyword. In this chapter, we master <code>let</code>, <code>mut</code>, shadowing, <code>const</code>, <code>static</code>, and scoping.
</div>

<div class="section-title"><span class="num">1</span>Immutability &amp; Mutability Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Variables &amp; Mutability</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let language = "Rust";
    let mut score = 10;

    score += 5;

    println!("{language}");
    println!("{score}");
}</code></pre>
  </div>
</div>`,
  '05-cargo-basics.html', '5. Cargo Basics',
  '07-scalar-types.html', '7. Scalar Types'
);

// 7. Scalar Types
makePage(7, '07-scalar-types.html',
  'Scalar Types',
  'Complete Rust Chapter 7: Deep guide to scalar types: signed integers (i8, i16, i32, i64, i128, isize), unsigned integers (u8, u16, u32, u64, u128, usize), floats (f32, f64), booleans (bool), characters (char, Unicode), type casting with as, and integer overflow handling.',
  'Phase 03', 'Variables & Data Types',
  'Signed Integers (i8..i128, isize) · Unsigned Integers (u8..u128, usize) · Floating-Point (f32, f64) · Booleans (bool) · Unicode Characters (char) · Type Casting (as) · Integer Overflow Rules',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 7): Scalar Types</strong>! A scalar type represents a single value. Rust features four primary scalar types: <strong>Integers</strong>, <strong>Floating-Point Numbers</strong>, <strong>Booleans</strong>, and <strong>Characters</strong>.
</div>

<div class="section-title"><span class="num">1</span>Scalar Types Showcase</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Scalar Types Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let age: u32 = 21;
    let price: f64 = 99.99;
    let grade: char = 'A';
    let active: bool = true;

    println!("Age: {age}, Price: {price}, Grade: {grade}, Active: {active}");
}</code></pre>
  </div>
</div>`,
  '06-variables.html', '6. Variables',
  '08-compound-types.html', '8. Compound Types'
);

// 8. Compound Types
makePage(8, '08-compound-types.html',
  'Compound Types',
  'Complete Rust Chapter 8: Deep guide to compound types: Tuples, tuple indexing, tuple destructuring, fixed-size Arrays, array length, indexing, array iteration, slices (&[T]) introduction, and Arrays vs Vectors comparison.',
  'Phase 03', 'Variables & Data Types',
  'Tuples · Tuple Indexing (.0, .1) · Tuple Destructuring · Fixed-Size Arrays ([T; N]) · Array Indexing & Length · Array Iteration · Slices (&[T]) Introduction · Arrays vs Vectors',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 8): Compound Types</strong>! Compound types group multiple values into a single type. Rust features two primitive compound types: <strong>Tuples</strong> and <strong>Arrays</strong>.
</div>

<div class="section-title"><span class="num">1</span>Tuples &amp; Arrays Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Tuples &amp; Arrays Syntax</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let student: (&str, u32, char) = ("Ravi", 20, 'A');

    println!("Name: {}", student.0);
    println!("Age: {}", student.1);
    println!("Grade: {}", student.2);

    let scores: [i32; 3] = [90, 85, 95];
    println!("First Score: {}", scores[0]);
}</code></pre>
  </div>
</div>`,
  '07-scalar-types.html', '7. Scalar Types',
  null, null
);

console.log('\n🎉 SUPER DEEP RUST CHAPTERS 1 TO 8 GENERATED SUCCESSFULLY!');
