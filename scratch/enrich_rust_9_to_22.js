const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'blog-rust');

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
      <span class="badge">🟢 Chapter ${chNum} of 22</span>
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
  console.log(`  ✅ ENRICHED ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

console.log('🚀 Enriching Rust Masterclass Chapters 20 to 22 with SUPER DEEP content...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 20: Strings (Phase 07)
// ═══════════════════════════════════════════════════════════════════════════════
makePage(20, '20-strings.html',
  'Strings',
  'Complete Rust Chapter 20: Deep exploration of String vs &str slices, heap allocation, push_str, format! macro, UTF-8 byte encoding, indexing restrictions, iterating characters vs bytes, string slices, and text processing algorithms.',
  'Phase 07', 'Collections & Strings',
  'String vs &str Slices · Creating Heap Strings · Modifying (push_str) · Concatenation & format! · UTF-8 Internal Encoding · Chars (.chars()) vs Bytes (.bytes()) Iteration · String Slicing & Methods',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 20): Strings</strong>! String handling in Rust is unique compared to languages like Python or Java. Rust features two primary string types: the heap-allocated, growable, mutable <code>String</code> buffer and the borrowed, read-only string slice <code>&amp;str</code>. Both types are strictly guaranteed to be valid <strong>UTF-8 encoded sequences</strong>. In this masterclass, we explore memory layout, push operations, string concatenation, UTF-8 character indexing restrictions, scalar iteration, and text processing.
</div>

<div class="section-title"><span class="num">1</span>String vs &amp;str Slices Memory Architecture</div>
<div class="section-body">
  <p>To write idiomatic Rust code, you must understand how <code>String</code> and <code>&amp;str</code> differ in memory allocation:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Property</th><th><code>String</code></th><th><code>&amp;str</code> (String Slice)</th></tr></thead>
    <tbody>
      <tr><td><strong>Memory Allocation</strong></td><td>Allocated dynamically on the Heap (stores pointer, length, and capacity).</td><td>Borrowed view into existing memory (binary string literal, stack, or heap slice).</td></tr>
      <tr><td><strong>Mutability</strong></td><td>Mutable (can append text via <code>push_str()</code> or <code>push()</code>).</td><td>Immutable read-only view.</td></tr>
      <tr><td><strong>Ownership</strong></td><td>Owns its allocated byte buffer (deallocated automatically on <code>drop</code>).</td><td>Does NOT own memory; borrows data for a specific lifetime.</td></tr>
      <tr><td><strong>Idiomatic Function Argument</strong></td><td>Rarely passed as <code>&amp;String</code>. Accept <code>&amp;str</code> instead!</td><td>✅ Preferred function argument type (accepts both <code>&amp;str</code> and <code>&amp;String</code> via deref coercion).</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — String vs &amp;str Allocation &amp; Deref Coercion</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn print_greeting(name: &str) {
    println!("Hello, {name}!");
}

fn main() {
    // Hardcoded string literal stored in binary read-only memory (&str)
    let literal: &str = "Ravi";

    // Heap-allocated String
    let heap_string: String = String::from("Balaji");

    // Both can be passed directly to print_greeting!
    print_greeting(literal);
    print_greeting(&heap_string); // Automatically coerced from &String to &str!
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Modifying &amp; Concatenating Strings (push_str &amp; format!)</div>
<div class="section-body">
  <p>Rust provides multiple methods to construct and concatenate strings:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Appending &amp; Concatenation Techniques</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let mut message = String::from("Rust");

    // 1. Appending a string slice using push_str
    message.push_str(" Programming");

    // 2. Appending a single character using push
    message.push('!');

    println!("Appended: {message}");

    // 3. Concatenation using + operator (takes ownership of first string!)
    let s1 = String::from("Hello, ");
    let s2 = String::from("World!");
    let s3 = s1 + &s2; // s1 is moved here and can no longer be used!

    println!("Concatenated via +: {s3}");

    // 4. Concatenation using format! macro (does NOT take ownership!)
    let part1 = String::from("Fast");
    let part2 = String::from("Safe");
    let part3 = String::from("Concurrent");

    let combined = format!("{part1}, {part2}, {part3}");
    println!("Formatted String: {combined}");
    println!("part1 is still valid: {part1}"); // part1 remains usable!
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>UTF-8 Encoding &amp; Why Rust Disallows Direct Indexing (s[0])</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">⚠️ Why Direct Indexing s[0] Causes a Compile Error</div>
    <p>In languages like C or Python, strings allow direct index access like <code>s[0]</code> because each character is assumed to be 1 byte. However, Rust strings are encoded as variable-width <strong>UTF-8</strong> (where a single character can take between 1 and 4 bytes!). Direct indexing like <code>s[0]</code> could return an invalid byte in the middle of a multi-byte Unicode character, causing memory safety violations. Therefore, Rust prevents direct integer indexing on strings at compile-time!</p>
  </div>

  <p>To safely inspect string contents, Rust provides explicit iterators for <strong>Unicode Characters (<code>.chars()</code>)</strong> and <strong>Raw Bytes (<code>.bytes()</code>)</strong>:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Iterating Chars vs Bytes</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let crab_text = "🦀 Rust";

    println!("Byte Length: {}", crab_text.len()); // 8 bytes! (Emoji takes 4 bytes)

    println!("--- Unicode Characters (.chars()) ---");
    for ch in crab_text.chars() {
        print!("[{ch}] ");
    }
    println!();

    println!("--- Raw Bytes (.bytes()) ---");
    for b in crab_text.bytes() {
        print!("{b:02X} ");
    }
    println!();
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Text Processing Methods &amp; Utility Functions</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Common String Methods</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let raw_input = "   Rust is blazingly fast and memory-safe!   \n";

    // Trim whitespace
    let trimmed = raw_input.trim();
    println!("Trimmed: '{trimmed}'");

    // Case conversions
    println!("Uppercase: {}", trimmed.to_uppercase());
    println!("Lowercase: {}", trimmed.to_lowercase());

    // Search and Replace
    let replaced = trimmed.replace("blazingly fast", "ultra-performant");
    println!("Replaced: '{replaced}'");

    // Substring checking
    println!("Contains 'Rust'? {}", trimmed.contains("Rust"));
    println!("Starts with 'Rust'? {}", trimmed.starts_with("Rust"));

    // Splitting text into words iterator
    println!("--- Word List ---");
    for word in trimmed.split_whitespace() {
        println!("Word: {word}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Should I use &amp;String or &amp;str for function parameters?</h4>
    <p>Always use <code>&amp;str</code> as function parameter types! Because <code>&amp;String</code> automatically dereferences into <code>&amp;str</code>, an <code>&amp;str</code> parameter accepts both string literals (<code>"hello"</code>) and owned <code>String</code> references (<code>&amp;my_string</code>) without copying data.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How do I convert a &amp;str slice to an owned String?</h4>
    <p>Use <code>String::from("text")</code>, <code>"text".to_string()</code>, or <code>"text".to_owned()</code>. All three create an owned heap allocation.</p>
  </div>
</div>`,
  '19-vectors.html', '19. Vectors',
  '21-hash-maps.html', '21. Hash Maps'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 21: Hash Maps (Phase 07)
// ═══════════════════════════════════════════════════════════════════════════════
makePage(21, '21-hash-maps.html',
  'Hash Maps',
  'Complete Rust Chapter 21: Deep guide to HashMap<K, V>, key-value storage, inserting/reading values, Entry API (.entry().or_insert()), updating values, removing entries, HashMap ownership transfer rules, and frequency counting algorithms.',
  'Phase 07', 'Collections & Strings',
  'HashMap<K, V> Structure · Key-Value Pair Insertions · Reading Values with get() · Entry API (.entry().or_insert()) · Iterating Key-Value Pairs · Word Frequency Counter Example · HashMap Ownership',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 21): Hash Maps</strong>! A hash map (<code>HashMap&lt;K, V&gt;</code>) stores a mapping of keys of type <code>K</code> to values of type <code>V</code> using a hashing algorithm for \(O(1)\) average lookup time. In this chapter, we master key-value insertions, safe lookups, entry updates via <code>.entry().or_insert()</code>, ownership transfer rules, and frequency counting.
</div>

<div class="section-title"><span class="num">1</span>Creating, Inserting &amp; Reading Hash Maps</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Basic HashMap Operations</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::collections::HashMap;

fn main() {
    // Create new mutable HashMap mapping String keys to u32 values
    let mut scores: HashMap<String, u32> = HashMap::new();

    // Insert key-value pairs
    scores.insert(String::from("Blue Team"), 10);
    scores.insert(String::from("Yellow Team"), 50);

    // Reading value using .get() returning Option<&V>
    let team_name = String::from("Blue Team");
    match scores.get(&team_name) {
        Some(score) => println!("{team_name} Score: {score}"),
        None => println!("{team_name} score not found!"),
    }

    // Iterating over key-value pairs
    println!("--- All Team Scores ---");
    for (team, score) in &scores {
        println!("{team}: {score}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>The Powerful Entry API (.entry().or_insert())</div>
<div class="section-body">
  <p>The <code>.entry()</code> API checks whether a key exists in a single atomic step. If the key is missing, <code>.or_insert(default_val)</code> inserts the default value and returns a mutable reference (<code>&amp;mut V</code>) to update the entry in-place!</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Word Frequency Counter with Entry API</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::collections::HashMap;

fn main() {
    let sentence = "hello world wonderful world hello rust";
    let mut word_counts = HashMap::new();

    for word in sentence.split_whitespace() {
        // Inspects key; if missing, inserts 0, returning &mut u32 reference
        let count = word_counts.entry(word).or_insert(0);
        *count += 1; // Dereference pointer to increment score in-place!
    }

    println!("Word Frequency Results:");
    for (word, count) in &word_counts {
        println!("'{word}': {count} occurrences");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>HashMap Ownership Rules</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">🔑 HashMap Ownership Transfer</div>
    <p>For types that implement the <code>Copy</code> trait (like integers <code>i32</code>), values are copied into the hash map. For owned types like <code>String</code>, inserting values moves ownership into the map! Once inserted, the original variable can no longer be used.</p>
  </div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — HashMap Ownership Move</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::collections::HashMap;

fn main() {
    let field_name = String::from("Favorite Color");
    let field_value = String::from("Blue");

    let mut map = HashMap::new();
    map.insert(field_name, field_value);

    // field_name and field_value are moved into 'map' here!
    // println!("{field_name}"); ❌ COMPILE ERROR: Use of moved value: 'field_name'
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What hashing algorithm does Rust's std HashMap use?</h4>
    <p>By default, Rust's <code>HashMap</code> uses <strong>SipHash 1-3</strong>, an algorithm designed to provide cryptographic resistance against HashDoS (Denial of Service) attacks while maintaining fast performance.</p>
  </div>
</div>`,
  '20-strings.html', '20. Strings',
  '22-collections-project.html', '22. Collections Project'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 22: Collections Project (Phase 07)
// ═══════════════════════════════════════════════════════════════════════════════
makePage(22, '22-collections-project.html',
  'Collections Project',
  'Complete Rust Chapter 22: Hands-on Collections Capstone Project building a complete Student Marks Manager & Product Inventory CLI Application utilizing Vectors, HashMaps, Structs, Enums, and pattern matching.',
  'Phase 07', 'Collections & Strings',
  'Collections Capstone Project · Student Marks Manager · Inventory Tracker · Structs & Enums Integration · HashMap Data Lookup · Vector Records Sorting',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 22): Collections Project</strong>! Put your Rust collections knowledge into practice by building a complete Student Marks Manager CLI Application. This hands-on capstone project integrates Vectors, HashMaps, Structs, Enums, implementation methods, and pattern matching into a production-grade program.
</div>

<div class="section-title"><span class="num">1</span>Student Marks Manager Capstone Application</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Complete Student Marks Manager</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::collections::HashMap;

// Custom Grade Status Enum
enum GradeStatus {
    Pass,
    Fail,
}

// Student Record Struct
struct Student {
    id: u32,
    name: String,
    marks: HashMap<String, u32>,
}

impl Student {
    fn new(id: u32, name: &str) -> Self {
        Student {
            id,
            name: String::from(name),
            marks: HashMap::new(),
        }
    }

    fn add_mark(&mut self, subject: &str, score: u32) {
        self.marks.insert(String::from(subject), score);
    }

    fn average_score(&self) -> f64 {
        if self.marks.is_empty() { return 0.0; }
        let total: u32 = self.marks.values().sum();
        total as f64 / self.marks.len() as f64
    }

    fn grade_status(&self) -> GradeStatus {
        if self.average_score() >= 50.0 {
            GradeStatus::Pass
        } else {
            GradeStatus::Fail
        }
    }

    fn print_report(&self) {
        println!("======================================");
        println!("STUDENT REPORT: {} (ID: {})", self.name, self.id);
        println!("--------------------------------------");
        for (subject, score) in &self.marks {
            println!("{subject:18}: {score}/100");
        }
        println!("--------------------------------------");
        println!("Average Score    : {:.2}%", self.average_score());
        
        match self.grade_status() {
            GradeStatus::Pass => println!("Final Status     : ✅ PASS"),
            GradeStatus::Fail => println!("Final Status     : ❌ FAIL"),
        }
        println!("======================================");
    }
}

fn main() {
    let mut student1 = Student::new(101, "Ravi Kumar");
    student1.add_mark("Mathematics", 95);
    student1.add_mark("Physics", 88);
    student1.add_mark("Rust Programming", 100);
    student1.add_mark("Computer Networks", 92);

    student1.print_report();
}</code></pre>
  </div>
</div>`,
  '21-hash-maps.html', '21. Hash Maps',
  null, null
);

console.log('\n🎉 ENRICHMENT COMPLETE FOR RUST CHAPTERS 20 TO 22!');
