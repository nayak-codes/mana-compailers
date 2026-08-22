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
  console.log(`  ✅ Generated ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

console.log('🚀 Generating Rust Masterclass Chapters 1 to 8...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 01: What is Rust?
// ═══════════════════════════════════════════════════════════════════════════════
makePage(1, '01-what-is-rust.html',
  'What is Rust?',
  'Complete Rust Chapter 1: Learn Rust definition, why use Rust, core features, Rust vs C, Rust vs C++, Rust vs Go, Memory safety, Zero-cost abstractions, No garbage collector, Rust use cases (Systems, Backend, Embedded, WebAssembly), and Rust limitations.',
  'Phase 01', 'Rust Introduction',
  'Rust Definition · Why Use Rust · Features · Rust vs C/C++/Go Comparison · Memory Safety · Zero-Cost Abstractions · No Garbage Collector · Use Cases (Systems, Backend, Embedded, WASM) · Limitations',
  `<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 1): What is Rust?</strong> Rust is a modern systems programming language created by Mozilla and now developed by the open-source Rust Foundation. Rust focuses on memory safety, blazingly fast execution speed, and fearlessly safe concurrency. By enforcing strict ownership and borrowing rules at compile time, the Rust compiler guarantees memory safety without needing a runtime Garbage Collector (GC).
</div>

<div class="section-title"><span class="num">1</span>What is Rust &amp; Why Use Rust?</div>
<div class="section-body">
  <p>Rust is designed to solve the critical dilemma that software developers faced for decades: choosing between <strong>high performance</strong> (like C and C++, which risk memory corruption bugs, dangling pointers, and buffer overflows) or <strong>safety and productivity</strong> (like Python, Java, or Go, which rely on heavy Garbage Collectors causing unpredictable latency spikes).</p>
  <p>Rust provides <strong>both</strong>: C-level bare-metal execution performance combined with compile-time memory safety guarantee!</p>

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

<div class="section-title"><span class="num">2</span>Core Pillars of Rust Architecture</div>
<div class="section-body">
  <ol class="spec-list">
    <li><strong>Compile-Time Memory Safety:</strong> The Rust compiler (<code>rustc</code>) tracks memory allocation through an <strong>Ownership System</strong> with lifetimes. Null pointer dereferences, dangling references, double-free errors, and use-after-free vulnerabilities are eliminated before your program ever runs.</li>
    <li><strong>Zero-Cost Abstractions:</strong> High-level language features (iterators, closures, pattern matching, generics) compile down to low-level machine instructions that run just as fast as hand-written assembly code. What you don't use, you don't pay for.</li>
    <li><strong>No Garbage Collector:</strong> Memory is automatically freed the exact moment a variable goes out of scope. This produces deterministic execution speeds without GC pauses, making Rust ideal for real-time operating systems, game engines, and embedded microcontrollers.</li>
  </ol>
</div>

<div class="section-title"><span class="num">3</span>Primary Rust Use Cases</div>
<div class="section-body">
  <ul>
    <li><strong>Systems Programming &amp; Operating Systems:</strong> Building OS kernels (Linux kernel Rust modules, Redox OS), device drivers, database engines (TiKV, InfluxDB), and browser engines (Firefox Servo).</li>
    <li><strong>High-Performance Backend Infrastructure:</strong> Web services built with Actix-Web, Axum, or Rocket capable of handling millions of concurrent requests with low memory footprints.</li>
    <li><strong>Embedded Systems:</strong> Bare-metal ARM Cortex-M and RISC-V microcontrollers requiring tiny memory footprints without runtime dependencies.</li>
    <li><strong>WebAssembly (WASM):</strong> Compiling Rust code to WebAssembly to run high-performance C-speed algorithms directly inside web browsers (used by Figma, 1Password, and Cloudflare Workers).</li>
  </ul>

  <div class="callout">
    <div class="callout-title">⚠️ Rust Limitations &amp; Learning Curve</div>
    <p>Rust has a steep initial learning curve. The Rust compiler's <strong>Borrow Checker</strong> is notoriously strict and will reject code that violates safety rules. Compiling large Rust codebases can also take longer than compiling C or Go due to extensive monomorphization and compiler optimization passes.</p>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Is Rust replacing C and C++?</h4>
    <p>Rust is increasingly adopted by major tech companies (Microsoft, Google, Amazon, Linux Foundation) for new systems-level components to prevent memory vulnerabilities, which historically accounted for 70%+ of all security CVEs in C/C++ codebases.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the exclamation mark in println!?</h4>
    <p>In Rust, an exclamation mark indicates a <strong>Macro invocation</strong> (not a regular function call). <code>println!</code> expands code at compile-time to format text safely.</p>
  </div>
</div>`,
  null, null,
  '02-rust-prerequisites.html', '2. Rust Prerequisites'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 02: Rust Prerequisites
// ═══════════════════════════════════════════════════════════════════════════════
makePage(2, '02-rust-prerequisites.html',
  'Rust Prerequisites',
  'Complete Rust Chapter 2: Deep guide to prerequisites including variables, data types, functions, control flow, arrays, strings, structs, basic memory concepts (Stack vs Heap), command-line basics, and Git version control.',
  'Phase 01', 'Rust Introduction',
  'Variables · Data Types · Functions · Control Flow · Arrays & Strings · Structs · Stack vs Heap Memory Concepts · Command-Line Terminal Basics · Git Version Control',
  `<div class="intro-box">
  Welcome to <strong>Phase 1 (Chapter 2): Rust Prerequisites</strong>! Before diving deep into Rust's advanced ownership rules, let's review essential programming fundamentals: variables, primitive types, functions, control flow, memory allocation concepts (Stack vs Heap), command-line CLI usage, and Git version control.
</div>

<div class="section-title"><span class="num">1</span>Basic Memory Architecture (Stack vs Heap)</div>
<div class="section-body">
  <p>Understanding how computer memory works is crucial for mastering Rust:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Memory Region</th><th>Allocation Mechanism</th><th>Data Size &amp; Lifespan</th><th>Access Speed</th></tr></thead>
    <tbody>
      <tr><td><strong>Stack Memory</strong></td><td>LIFO (Last In, First Out). Fixed-size memory pushed and popped automatically during function execution.</td><td>Fixed size known at compile time (integers, booleans, fixed arrays). Automatically dropped when function exits.</td><td>⚡ Ultra-fast (cpu cache friendly)</td></tr>
      <tr><td><strong>Heap Memory</strong></td><td>Dynamic allocation. Memory allocator searches for an unallocated memory region of requested size and returns a pointer address.</td><td>Dynamic or variable size determined at runtime (resizable Strings, Vectors). Managed in Rust via Ownership.</td><td>🐢 Slower (pointer dereferencing required)</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Stack vs Heap Memory Demonstration</span>
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
</div>

<div class="section-title"><span class="num">2</span>Command-Line &amp; Git Version Control Essentials</div>
<div class="section-body">
  <p>Developing in Rust relies heavily on terminal commands. Here are essential shell commands for Windows (PowerShell) and Linux/macOS:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Essential CLI Commands</span>
    </div>
    <pre><code># Check directory content
ls            # Linux/macOS/PowerShell
dir           # Windows CMD

# Change directory
cd projects/hello-rust

# Git repository commands
git init
git add .
git commit -m "Initial Rust Project Commit"</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Do I need prior experience in C or C++ to learn Rust?</h4>
    <p>No! While C/C++ background helps understand low-level pointers, Rust's official compiler messages are friendly and act as a built-in programming tutor.</p>
  </div>
</div>`,
  '01-what-is-rust.html', '1. What is Rust?',
  '03-rust-installation.html', '3. Rust Installation'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 03: Rust Installation
// ═══════════════════════════════════════════════════════════════════════════════
makePage(3, '03-rust-installation.html',
  'Rust Installation',
  'Complete Rust Chapter 3: Deep guide to installing Rust using rustup, rustc compiler, Cargo package manager, checking versions, updating toolchains, Stable vs Nightly channels, VS Code setup with rust-analyzer, online compilers, and troubleshooting errors.',
  'Phase 02', 'Setup & First Program',
  'Installing Rust · rustup Toolchain Manager · rustc Compiler · Cargo Package Manager · Checking & Updating Versions · Stable vs Nightly Channels · VS Code & rust-analyzer Setup · Installation Troubleshooting',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 3): Rust Installation</strong>! Setting up your Rust development environment is straightforward using <code>rustup</code>—the official Rust toolchain installer and manager. In this chapter, we install <code>rustc</code>, <code>cargo</code>, configure release channels (Stable vs Nightly), and set up Visual Studio Code with the <code>rust-analyzer</code> extension.
</div>

<div class="section-title"><span class="num">1</span>Installing Rust via rustup</div>
<div class="section-body">
  <p><code>rustup</code> installs the Rust compiler (<code>rustc</code>), the Rust standard library, the Cargo package manager (<code>cargo</code>), and documentation:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Installing Rust</span>
    </div>
    <pre><code># macOS / Linux / WSL Installation Command:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows Installation:
# Download and run rustup-init.exe from https://rustup.rs
# Ensure C++ build tools (MSVC) or MinGW are installed.</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Verifying &amp; Updating Rust Installation</div>
<div class="section-body">
  <p>After installation completes, restart your terminal and execute these commands to verify installed version numbers:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Verification Commands</span>
    </div>
    <pre><code># Check compiler version
rustc --version

# Check Cargo package manager version
cargo --version

# Update Rust toolchain to latest stable release
rustup update</code></pre>
  </div>

  <table class="tbl spec-table">
    <thead><tr><th>Tool</th><th>Primary Purpose</th></tr></thead>
    <tbody>
      <tr><td><code>rustup</code></td><td>Toolchain installer and channel updater (manages Stable, Beta, Nightly releases).</td></tr>
      <tr><td><code>rustc</code></td><td>The core Rust compiler binary that transforms <code>.rs</code> source files into executable binaries.</td></tr>
      <tr><td><code>cargo</code></td><td>Rust's official build tool, dependency manager, test runner, and package publisher.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>VS Code Setup with rust-analyzer Extension</div>
<div class="section-body">
  <ol class="spec-list">
    <li>Download and install <strong>Visual Studio Code</strong>.</li>
    <li>Open VS Code Extensions tab (<code>Ctrl+Shift+X</code> or <code>Cmd+Shift+X</code>).</li>
    <li>Search for and install <strong>rust-analyzer</strong> (the official IDE extension providing real-time autocompletion, inline type hints, and instant compiler diagnostics).</li>
  </ol>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between Stable and Nightly Rust channels?</h4>
    <p><strong>Stable</strong> releases occur every 6 weeks and guarantee backward compatibility. <strong>Nightly</strong> is updated daily with experimental features requiring <code>#![feature(...)]</code> flags.</p>
  </div>
</div>`,
  '02-rust-prerequisites.html', '2. Rust Prerequisites',
  '04-first-rust-program.html', '4. First Rust Program'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 04: First Rust Program
// ═══════════════════════════════════════════════════════════════════════════════
makePage(4, '04-first-rust-program.html',
  'First Rust Program',
  'Complete Rust Chapter 4: Deep guide to creating a .rs source file, fn main() entry point, println! macro formatting, semicolons, comments, compiling with rustc, running executables, compiler diagnostic messages, and code formatting with rustfmt.',
  'Phase 02', 'Setup & First Program',
  'Creating .rs Files · fn main() Entry Point · println! Macro · Macro Mechanics (!) · Semicolons & Syntax Rules · Comments · Compiling with rustc · Compiler Diagnostics · Code Formatting',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 4): First Rust Program</strong>! In this hands-on lesson, we write, compile, and run a bare-metal Rust program using the core <code>rustc</code> compiler binary. We dissect the <code>fn main()</code> entry point, explain why <code>println!</code> is an expanded macro, review semicolon rules, write single and multi-line comments, and format code cleanly using <code>rustfmt</code>.
</div>

<div class="section-title"><span class="num">1</span>Writing &amp; Analyzing Hello World (.rs)</div>
<div class="section-body">
  <p>Create a file named <code>main.rs</code> and write the following code:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — main.rs</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// Single-line comment: Every executable Rust program must have a fn main() function
fn main() {
    /* 
       Multi-line comment:
       println! is a macro that prints text to standard output (stdout)
       followed by a newline character.
    */
    println!("Hello, Rust Developer!");
}</code></pre>
  </div>

  <table class="tbl spec-table">
    <thead><tr><th>Code Element</th><th>Syntax Explanation</th></tr></thead>
    <tbody>
      <tr><td><code>fn main()</code></td><td>Declares a function named <code>main</code> with no parameter arguments. <code>main()</code> is the mandatory entry point of every standalone executable Rust binary.</td></tr>
      <tr><td><code>{ ... }</code></td><td>Curly braces delimit the function body block.</td></tr>
      <tr><td><code>println!</code></td><td>Calls a built-in Rust <strong>Macro</strong>. The exclamation mark (<code>!</code>) distinguishes macro expansions from standard function calls.</td></tr>
      <tr><td><code>;</code> (Semicolon)</td><td>Terminates a statement line in Rust. Omitting a semicolon converts a line into a returned expression!</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Compiling &amp; Executing with rustc</div>
<div class="section-body">
  <p>Open your terminal in the folder containing <code>main.rs</code> and run:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Compiling with rustc</span>
    </div>
    <pre><code># 1. Compile source file into binary executable
rustc main.rs

# 2. Run the generated binary
# On Linux/macOS:
./main

# On Windows:
.\main.exe</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why does println! use an exclamation mark?</h4>
    <p>Macros in Rust can accept variable numbers of arguments and check format strings at compile-time (e.g. <code>println!("Value: {}", 42)</code>). Regular Rust functions require a fixed number of typed arguments.</p>
  </div>
</div>`,
  '03-rust-installation.html', '3. Rust Installation',
  '05-cargo-basics.html', '5. Cargo Basics'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 05: Cargo Basics
// ═══════════════════════════════════════════════════════════════════════════════
makePage(5, '05-cargo-basics.html',
  'Cargo Basics',
  'Complete Rust Chapter 5: Deep guide to Cargo package manager, creating projects with cargo new, Cargo.toml manifest, src/main.rs, Cargo.lock, cargo run, cargo build, cargo check, cargo fmt, cargo clippy, cargo clean, release builds, and managing crates dependencies.',
  'Phase 02', 'Setup & First Program',
  'Cargo Package Manager · Creating Projects (cargo new) · Cargo.toml Manifest · Cargo.lock · cargo run & cargo build · cargo check Validation · cargo clippy Linter · Release Builds (--release)',
  `<div class="intro-box">
  Welcome to <strong>Phase 2 (Chapter 5): Cargo Basics</strong>! Cargo is Rust's official build tool, package manager, and workflow driver. Cargo automates project creation, compilation, dependency management (crates.io), testing, and code linting. In this chapter, we master <code>cargo new</code>, <code>Cargo.toml</code>, <code>cargo run</code>, <code>cargo check</code>, <code>cargo clippy</code>, and production release builds.
</div>

<div class="section-title"><span class="num">1</span>Creating a Cargo Project Architecture</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Terminal — Creating a Cargo Project</span>
    </div>
    <pre><code># Create new binary binary application project
cargo new hello_cargo

# Navigate into project directory
cd hello_cargo</code></pre>
  </div>

  <p>Cargo generates the standard directory structure:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Text — Cargo Directory Structure</span>
    </div>
    <pre><code>hello_cargo/
├── Cargo.toml      # Project manifest (metadata &amp; dependencies)
├── Cargo.lock      # Exact locked dependency version tree
└── src/
    └── main.rs     # Source code entry point</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Anatomy of Cargo.toml</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">TOML — Cargo.toml Example</span>
    </div>
    <pre><code>[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

# Dependencies from crates.io registry
[dependencies]
serde = "1.0"
rand = "0.8"</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Essential Cargo Workflow Commands</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Cargo Command</th><th>Technical Function</th></tr></thead>
    <tbody>
      <tr><td><code>cargo run</code></td><td>Compiles code and immediately runs the resulting executable binary.</td></tr>
      <tr><td><code>cargo build</code></td><td>Compiles project into <code>target/debug/hello_cargo</code> (includes debug symbols).</td></tr>
      <tr><td><code>cargo check</code></td><td>⚡ Rapidly validates code syntax and type-checks without generating binary output files (ultra-fast for development loops!).</td></tr>
      <tr><td><code>cargo build --release</code></td><td>Compiles with maximum LLVM optimizations into <code>target/release/</code> for production.</td></tr>
      <tr><td><code>cargo fmt</code></td><td>Formats all source files according to Rust style guidelines.</td></tr>
      <tr><td><code>cargo clippy</code></td><td>Runs Rust's official linter to catch common performance pitfalls and code smells.</td></tr>
      <tr><td><code>cargo clean</code></td><td>Deletes the <code>target/</code> build directory to reclaim disk space.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why should I use cargo check instead of cargo build during development?</h4>
    <p><code>cargo check</code> skips code generation and binary linking steps, running up to 5x faster than <code>cargo build</code> while displaying the exact same type-checking error messages!</p>
  </div>
</div>`,
  '04-first-rust-program.html', '4. First Rust Program',
  '06-variables.html', '6. Variables'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 06: Variables
// ═══════════════════════════════════════════════════════════════════════════════
makePage(6, '06-variables.html',
  'Variables',
  'Complete Rust Chapter 6: Deep guide to variable declaration with let, immutability by default, mutability with mut, variable shadowing, constants const, static variables, scope blocks, type annotations, type inference, and naming conventions.',
  'Phase 03', 'Variables & Data Types',
  'Variable Declaration (let) · Immutability by Default · Mutability (mut) · Variable Shadowing · Constants (const) · Static Variables (static) · Scope & Lifespan · Type Annotations vs Inference',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 6): Variables</strong>! In Rust, variables are <strong>immutable by default</strong>. This safety design choice prevents accidental state mutations across threads. In this comprehensive chapter, we explore variable declaration with <code>let</code>, mutable variables with <code>mut</code>, variable shadowing, compile-time constants (<code>const</code>), global static variables (<code>static</code>), lexical block scoping, and type inference.
</div>

<div class="section-title"><span class="num">1</span>Immutability by Default vs Mutable (mut) Variables</div>
<div class="section-body">
  <p>When a variable is declared with <code>let</code>, its assigned value cannot be changed later. Attempting to reassign an immutable variable causes a compile error!</p>
  <p>To allow value modifications, explicitly prefix the variable name with the <code>mut</code> keyword:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Immutability &amp; Mutability</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Immutable Variable (default)
    let language = "Rust";
    println!("Language: {language}");
    // language = "C++"; // ❌ COMPILE ERROR: Cannot assign twice to immutable variable

    // Mutable Variable (explicit mut keyword)
    let mut score = 10;
    println!("Initial Score: {score}");
    
    score += 5; // ✅ Permitted because score is declared with mut
    println!("Updated Score: {score}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Variable Shadowing</div>
<div class="section-body">
  <p>Rust allows you to declare a new variable with the <strong>exact same name</strong> as a previous variable. The new variable <strong>shadows</strong> the old variable:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Variable Shadowing Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let x = 5;
    
    // Shadowing x by re-declaring with let
    let x = x + 1; // x is now 6

    {
        // Shadowing x inside inner block scope
        let x = x * 2; // x is now 12 inside this block
        println!("Inner Scope x = {x}");
    }

    // Outer x remains 6
    println!("Outer Scope x = {x}");

    // Shadowing can even change variable data types!
    let spaces = "   ";           // String slice type (&str)
    let spaces = spaces.len();    // Transformed to usize integer!
    println!("Spaces count: {spaces}");
}</code></pre>
  </div>

  <table class="tbl spec-table">
    <thead><tr><th>Feature</th><th>mut Variable</th><th>Shadowing (let)</th></tr></thead>
    <tbody>
      <tr><td><strong>Reassigning Value</strong></td><td>✅ Permitted</td><td>✅ Permitted (creates a new variable)</td></tr>
      <tr><td><strong>Changing Data Type</strong></td><td>❌ COMPILE ERROR (Type is fixed)</td><td>✅ Permitted (new variable can have different type)</td></tr>
      <tr><td><strong>Re-immutability</strong></td><td>Remains mutable after assignment</td><td>New variable is immutable unless declared <code>let mut</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">3</span>Constants (const) vs Static Variables (static)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Constants &amp; Static Variables</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// Constant: Must have explicit type annotation; value computed at compile-time
const MAX_POINTS: u32 = 100_000;

// Static Variable: Fixed memory location throughout program execution
static APP_NAME: &str = "Our Compiler Rust Engine";

fn main() {
    println!("App: {APP_NAME}");
    println!("Max Points: {MAX_POINTS}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why does Rust make variables immutable by default?</h4>
    <p>Immutability ensures thread safety and makes code easier to reason about. When a variable cannot be changed unexpectedly, concurrency bugs and race conditions are eliminated at compile time.</p>
  </div>
</div>`,
  '05-cargo-basics.html', '5. Cargo Basics',
  '07-scalar-types.html', '7. Scalar Types'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 07: Scalar Types
// ═══════════════════════════════════════════════════════════════════════════════
makePage(7, '07-scalar-types.html',
  'Scalar Types',
  'Complete Rust Chapter 7: Deep guide to scalar types: signed integers (i8, i16, i32, i64, i128, isize), unsigned integers (u8, u16, u32, u64, u128, usize), floats (f32, f64), booleans (bool), characters (char, Unicode), type casting with as, and integer overflow handling.',
  'Phase 03', 'Variables & Data Types',
  'Signed Integers (i8..i128, isize) · Unsigned Integers (u8..u128, usize) · Floating-Point (f32, f64) · Booleans (bool) · Unicode Characters (char) · Type Casting (as) · Integer Overflow Rules',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 7): Scalar Types</strong>! A scalar type represents a single value. Rust features four primary scalar types: <strong>Integers</strong>, <strong>Floating-Point Numbers</strong>, <strong>Booleans</strong>, and <strong>Characters</strong>. In this chapter, we master exact bit-width integer types, architecture-dependent <code>isize</code>/<code>usize</code>, Unicode characters, type conversion using <code>as</code>, and handling integer overflow.
</div>

<div class="section-title"><span class="num">1</span>Integer Types Reference (Signed &amp; Unsigned)</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Length</th><th>Signed Type</th><th>Unsigned Type</th><th>Value Range</th></tr></thead>
    <tbody>
      <tr><td>8-bit</td><td><code>i8</code></td><td><code>u8</code></td><td><code>i8</code>: -128 to 127 | <code>u8</code>: 0 to 255</td></tr>
      <tr><td>16-bit</td><td><code>i16</code></td><td><code>u16</code></td><td><code>i16</code>: -32,768 to 32,767 | <code>u16</code>: 0 to 65,535</td></tr>
      <tr><td>32-bit (Default)</td><td><code>i32</code></td><td><code>u32</code></td><td><code>i32</code>: -2.14B to +2.14B | <code>u32</code>: 0 to 4.29B</td></tr>
      <tr><td>64-bit</td><td><code>i64</code></td><td><code>u64</code></td><td>64-bit integer numbers</td></tr>
      <tr><td>128-bit</td><td><code>i128</code></td><td><code>u128</code></td><td>128-bit ultra-large integers</td></tr>
      <tr><td>Arch-dependent</td><td><code>isize</code></td><td><code>usize</code></td><td>32-bit on 32-bit systems | 64-bit on 64-bit systems (used for array indexing)</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Scalar Types Showcase</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Integers
    let age: u32 = 21;
    let score: i32 = -50;
    let count: usize = 100; // Used for indexing collections

    // Floating-Point Numbers (f64 is default precision)
    let price: f64 = 99.99;
    let interest_rate: f32 = 0.05;

    // Booleans
    let is_active: bool = true;

    // Unicode Characters (4 bytes each, supporting Emojis!)
    let letter: char = 'A';
    let crab_emoji: char = '🦀';

    println!("Age: {age}, Price: \\\${price}");
    println!("Grade: {letter}, Emoji: {crab_emoji}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Explicit Type Conversion (as Keyword)</div>
<div class="section-body">
  <p>Rust does not perform automatic implicit type coercion between numeric types. You must perform explicit casting using the <code>as</code> operator:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Type Casting with as</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let integer_val: i32 = 100;
    
    // Explicit conversion from i32 to f64
    let float_val: f64 = integer_val as f64 + 0.5;

    let char_code: u8 = 65;
    let letter: char = char_code as char; // Converts ASCII 65 to 'A'

    println!("Float Result: {float_val}");
    println!("Converted Letter: {letter}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What happens during Integer Overflow in Rust?</h4>
    <p>In <strong>Debug mode</strong>, Rust includes integer overflow checks that panic (crash safely) at runtime. In <strong>Release mode (<code>--release</code>)</strong>, Rust wraps values using two's complement (e.g. 256 in <code>u8</code> wraps to 0).</p>
  </div>
</div>`,
  '06-variables.html', '6. Variables',
  '08-compound-types.html', '8. Compound Types'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 08: Compound Types
// ═══════════════════════════════════════════════════════════════════════════════
makePage(8, '08-compound-types.html',
  'Compound Types',
  'Complete Rust Chapter 8: Deep guide to compound types: Tuples, tuple indexing, tuple destructuring, fixed-size Arrays, array length, indexing, array iteration, slices (&[T]) introduction, and Arrays vs Vectors comparison.',
  'Phase 03', 'Variables & Data Types',
  'Tuples · Tuple Indexing (.0, .1) · Tuple Destructuring · Fixed-Size Arrays ([T; N]) · Array Indexing & Length · Array Iteration · Slices (&[T]) Introduction · Arrays vs Vectors',
  `<div class="intro-box">
  Welcome to <strong>Phase 3 (Chapter 8): Compound Types</strong>! Compound types can group multiple values into a single entity. Rust features two primitive compound types: <strong>Tuples</strong> (fixed length, heterogeneous types) and <strong>Arrays</strong> (fixed length, homogeneous same-type elements). In this chapter, we master tuples, indexing, pattern destructuring, fixed-size arrays, array slices (<code>&amp;[T]</code>), and compare arrays with dynamic vectors.
</div>

<div class="section-title"><span class="num">1</span>Tuples (Heterogeneous Fixed-Size Grouping)</div>
<div class="section-body">
  <p>A tuple groups values of <strong>different data types</strong> into a fixed-length compound structure:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Tuples Indexing &amp; Destructuring</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Declare tuple containing (&str, u32, char)
    let student: (&str, u32, char) = ("Ravi", 20, 'A');

    // Access tuple elements using dot indexing (.0, .1, .2)
    println!("Student Name: {}", student.0);
    println!("Student Age:  {}", student.1);
    println!("Student Grade: {}", student.2);

    // Destructure tuple into individual variables using pattern matching
    let (name, age, grade) = student;
    println!("Destructured: {name} is {age} years old.");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Fixed-Size Arrays ([T; N]) &amp; Slices (&amp;[T])</div>
<div class="section-body">
  <p>Unlike arrays in languages like JavaScript or Python, arrays in Rust have a <strong>fixed length known at compile time</strong>. Every element in an array must have the exact same data type:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Array Allocation &amp; Slice Slicing</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Array declaration syntax: [Type; Length]
    let numbers: [i32; 5] = [10, 20, 30, 40, 50];

    // Array initialized with repeated values: [value; count]
    let zeros: [i32; 100] = [0; 100];

    println!("First Element: {}", numbers[0]);
    println!("Array Length:  {}", numbers.len());

    // Creating a Slice (&[i32]) borrowing elements from index 1 to 3
    let slice: &[i32] = &numbers[1..4]; // Contains [20, 30, 40]
    println!("Slice length: {}, First slice item: {}", slice.len(), slice[0]);
}</code></pre>
  </div>

  <table class="tbl spec-table">
    <thead><tr><th>Collection Type</th><th>Size Flexibility</th><th>Memory Allocation</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td><strong>Array <code>[T; N]</code></strong></td><td>Fixed at compile time</td><td>Stack Memory</td><td>Fixed-size lookup buffers, months of year.</td></tr>
      <tr><td><strong>Slice <code>&amp;[T]</code></strong></td><td>View over a contiguous sequence</td><td>References existing memory</td><td>Borrowing a portion of an array or vector safely without copying.</td></tr>
      <tr><td><strong>Vector <code>Vec&lt;T&gt;</code></strong></td><td>Dynamic (can grow / shrink)</td><td>Heap Memory</td><td>Dynamic lists of items built at runtime.</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What happens if I access an out-of-bounds array index like numbers[10]?</h4>
    <p>Rust checks index bounds at runtime! Instead of allowing illegal memory access (which causes security exploits in C), Rust panics safely: <code>index out of bounds: the len is 5 but the index is 10</code>.</p>
  </div>
</div>`,
  '07-scalar-types.html', '7. Scalar Types',
  null, null
);

console.log('\n🎉 RUST CHAPTERS 1 TO 8 GENERATED SUCCESSFULLY!');
