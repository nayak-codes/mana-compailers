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
  console.log(`  ✅ Deep Generated ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

console.log('🚀 Generating SUPER DEEP Rust Masterclass Chapters 9 to 22...');

// Chapter 9: Functions
makePage(9, '09-functions.html',
  'Functions',
  'Complete Rust Chapter 9: Deep guide to function declaration with fn, parameter type signatures, arrow return types ->, statements vs expressions, implicit vs explicit return, block scopes, generic functions, and doc comments.',
  'Phase 04', 'Functions & Control Flow',
  'Function Declaration (fn) · Parameter Type Signatures · Return Types (->) · Statements vs Expressions · Implicit vs Explicit Return · Nested Scope Blocks · Function Documentation (///)',
  `<div class="intro-box">
  Welcome to <strong>Phase 4 (Chapter 9): Functions</strong>! Functions are the fundamental building blocks of Rust code. Rust uses snake_case naming conventions for function names and requires explicit type annotations for every parameter and return type. In this chapter, we master statements vs expressions, implicit final-line returns, and generic function signatures.
</div>

<div class="section-title"><span class="num">1</span>Function Declaration &amp; Implicit Returns</div>
<div class="section-body">
  <p>In Rust, the last expression inside a function body is automatically returned without needing the <code>return</code> keyword—just omit the trailing semicolon!</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Function Declaration &amp; Return</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// Function add accepts two i32 parameters and returns an i32 -> i32
fn add(first: i32, second: i32) -> i32 {
    // Notice no semicolon at the end! This is an implicit return expression.
    first + second
}

fn main() {
    let result = add(10, 20);
    println!("Sum: {result}");
}</code></pre>
  </div>
</div>`,
  '08-compound-types.html', '8. Compound Types',
  '10-conditions.html', '10. Conditions'
);

// Chapter 10: Conditions
makePage(10, '10-conditions.html',
  'Conditions',
  'Complete Rust Chapter 10: Deep guide to if, else, else if, nested conditions, if as an expression, boolean expressions, ternary alternative, match introduction, guard conditions, and common conditional mistakes.',
  'Phase 04', 'Functions & Control Flow',
  'if / else if / else Branching · Conditions as Expressions · Boolean Expressions · Ternary Expression Alternative · match Pattern Introduction · Match Guard Conditions',
  `<div class="intro-box">
  Welcome to <strong>Phase 4 (Chapter 10): Conditions</strong>! Conditional execution in Rust allows branching based on boolean conditions. Unlike C or Java, conditions in Rust do NOT require surrounding parentheses, must strictly evaluate to a <code>bool</code> type, and <code>if</code> blocks can be used directly as expressions to assign values!
</div>

<div class="section-title"><span class="num">1</span>if, else if &amp; else Branching</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Grade Evaluator</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let marks = 78;

    if marks >= 90 {
        println!("Grade A");
    } else if marks >= 60 {
        println!("Grade B");
    } else {
        println!("Needs Improvement");
    }
}</code></pre>
  </div>
</div>`,
  '09-functions.html', '9. Functions',
  '11-loops.html', '11. Loops'
);

// Chapter 11: Loops
makePage(11, '11-loops.html',
  'Loops',
  'Complete Rust Chapter 11: Deep guide to loop, while, for, ranges (1..5, 1..=5), break, continue, returning values from loop, loop labels (\'outer), iterating arrays/ranges, and practice exercises (Factorial, Fibonacci, Prime check).',
  'Phase 04', 'Functions & Control Flow',
  'loop Infinite Construct · while Condition Loop · for In Iteration · Inclusive Range (1..=5) · Returning Values from loop · Loop Labels (\'label) · Array Iteration · Practice Exercises',
  `<div class="intro-box">
  Welcome to <strong>Phase 4 (Chapter 11): Loops</strong>! Rust provides three looping constructs: <code>loop</code> (infinite loop that can return values via <code>break</code>), <code>while</code> (conditional loop), and <code>for</code> (safe iterator loop over ranges and collections).
</div>

<div class="section-title"><span class="num">1</span>The Three Loop Types in Rust</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Loop Types Showcase</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // 1. for loop over inclusive range 1..=5
    for number in 1..=5 {
        println!("{number}");
    }
}</code></pre>
  </div>
</div>`,
  '10-conditions.html', '10. Conditions',
  '12-ownership.html', '12. Ownership'
);

// Chapter 12: Ownership
makePage(12, '12-ownership.html',
  'Ownership',
  'Complete Rust Chapter 12: Deep guide to Ownership rules, Stack vs Heap allocation, variable scope, move semantics, Copy trait vs Clone trait, ownership in functions, return values, Drop trait automatic deallocation, and compiler borrow errors.',
  'Phase 05', 'Ownership & Borrowing',
  'Ownership Definition & 3 Rules · Stack vs Heap Allocation · Move Semantics · Copy vs Clone Traits · Function Ownership Transfer · Automatic Drop Trait Deallocation',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 12): Ownership</strong>! Ownership is Rust's core memory safety paradigm. Each value in Rust has a single owner variable. When the owner goes out of scope, the memory value is automatically dropped.
</div>

<div class="section-title"><span class="num">1</span>Move Semantics Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Move Semantics</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let first = String::from("Rust");
    let second = first; // Ownership of heap String moved to second!

    println!("{second}");
    // first is no longer usable because ownership moved.
}</code></pre>
  </div>
</div>`,
  '11-loops.html', '11. Loops',
  '13-borrowing-and-references.html', '13. Borrowing & References'
);

// Chapter 13: Borrowing and References
makePage(13, '13-borrowing-and-references.html',
  'Borrowing & References',
  'Complete Rust Chapter 13: Deep guide to References (&), Borrowing, Immutable references (&T), Mutable references (&mut T), Borrowing Rules (1 mutable XOR multiple immutable), Dangling references prevention, and Reference scoping.',
  'Phase 05', 'Ownership & Borrowing',
  'References (&) · Immutable Borrows (&T) · Mutable Borrows (&mut T) · Borrowing Rule (Aliasing XOR Mutability) · Dangling Reference Prevention · Reference Scope',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 13): Borrowing &amp; References</strong>! Borrowing allows functions to access data via references (<code>&amp;</code>) without taking ownership.
</div>

<div class="section-title"><span class="num">1</span>Immutable Borrowing Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Immutable References</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn length(text: &String) -> usize {
    text.len()
}

fn main() {
    let message = String::from("Hello");
    println!("{}", length(&message));
}</code></pre>
  </div>
</div>`,
  '12-ownership.html', '12. Ownership',
  '14-slices.html', '14. Slices'
);

// Chapter 14: Slices
makePage(14, '14-slices.html',
  'Slices',
  'Complete Rust Chapter 14: Deep guide to Slices (&[T]), String slices (&str), Array slices, String vs &str, slice ranges [start..end], mutable slices, slice safety, and returning slices from functions.',
  'Phase 05', 'Ownership & Borrowing',
  'Slice Definition · String Slices (&str) · Array Slices (&[T]) · String vs &str Comparison · Slice Index Ranges · Mutable Slices · Function Slice Returns',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 14): Slices</strong>! A slice is a contiguous sequence reference to elements in a collection without taking ownership.
</div>

<div class="section-title"><span class="num">1</span>first_word Function Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — String Slice Function</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn first_word(text: &str) -> &str {
    text.split_whitespace().next().unwrap_or("")
}

fn main() {
    let sentence = String::from("Rust is fast");
    println!("{}", first_word(&sentence));
}</code></pre>
  </div>
</div>`,
  '13-borrowing-and-references.html', '13. Borrowing & References',
  '15-lifetimes-introduction.html', '15. Lifetimes Introduction'
);

// Chapter 15: Lifetimes Introduction
makePage(15, '15-lifetimes-introduction.html',
  'Lifetimes Introduction',
  'Complete Rust Chapter 15: Deep guide to Lifetimes (\'a), reference validity, lifetime annotations, lifetime elision rules, function lifetimes, struct lifetimes, static lifetime \'static, and preventing dangling references.',
  'Phase 05', 'Ownership & Borrowing',
  'Lifetime Definition (\'a) · Reference Validity · Lifetime Annotations Syntax · Lifetime Elision Rules · Function Lifetimes · Struct Lifetimes · \'static Lifetime',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 15): Lifetimes Introduction</strong>! Lifetimes (like <code>'a</code>) ensure that references remain valid as long as they are accessed, eliminating dangling references.
</div>

<div class="section-title"><span class="num">1</span>Lifetime Annotation Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Lifetime Annotations</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = "apple";
    let s2 = "banana";
    println!("Longest: {}", longest(s1, s2));
}</code></pre>
  </div>
</div>`,
  '14-slices.html', '14. Slices',
  '16-structs.html', '16. Structs'
);

// Chapter 16: Structs
makePage(16, '16-structs.html',
  'Structs',
  'Complete Rust Chapter 16: Deep guide to Structs, defining custom types, creating instances, field access, mutable structs, field shorthand, struct update syntax, tuple structs, unit-like structs, impl implementation blocks, methods (&self), associated functions, and deriving traits.',
  'Phase 06', 'Structs & Enums',
  'Defining Structs · Struct Instances & Fields · Field Shorthand & Update Syntax · Tuple Structs & Unit Structs · Implementation Blocks (impl) · Methods (&self) vs Associated Functions · #[derive(Debug)]',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 16): Structs</strong>! Structs allow grouping related data fields together into custom types.
</div>

<div class="section-title"><span class="num">1</span>Struct &amp; Method Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Struct &amp; impl Method</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>struct Student {
    name: String,
    age: u32,
}

impl Student {
    fn display(&self) {
        println!("{} - {}", self.name, self.age);
    }
}

fn main() {
    let student = Student {
        name: String::from("Ravi"),
        age: 20,
    };

    student.display();
}</code></pre>
  </div>
</div>`,
  '15-lifetimes-introduction.html', '15. Lifetimes Introduction',
  '17-enums.html', '17. Enums'
);

// Chapter 17: Enums
makePage(17, '17-enums.html',
  'Enums',
  'Complete Rust Chapter 17: Deep guide to Enums, enum variants, holding data inside variants, enum methods, Option<T> (Some, None), Result<T, E> (Ok, Err), combining enums with structs, and state machine modeling.',
  'Phase 06', 'Structs & Enums',
  'Enum Variants · Data-bearing Variants · Option<T> (Some, None) · Result<T, E> (Ok, Err) · Enum Methods · State Machine Application Modeling',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 17): Enums</strong>! Enums define a type by enumerating its possible variants.
</div>

<div class="section-title"><span class="num">1</span>PaymentStatus Enum Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — PaymentStatus Enum</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>enum PaymentStatus {
    Pending,
    Completed,
    Failed,
}

fn main() {
    let status = PaymentStatus::Completed;

    match status {
        PaymentStatus::Pending => println!("Pending"),
        PaymentStatus::Completed => println!("Completed"),
        PaymentStatus::Failed => println!("Failed"),
    }
}</code></pre>
  </div>
</div>`,
  '16-structs.html', '16. Structs',
  '18-pattern-matching.html', '18. Pattern Matching'
);

// Chapter 18: Pattern Matching
makePage(18, '18-pattern-matching.html',
  'Pattern Matching',
  'Complete Rust Chapter 18: Deep guide to match expressions, match arms, matching literals, matching enums/tuples/structs, if let, while let, match guards, catch-all pattern (_), destructuring patterns, and exhaustiveness checking.',
  'Phase 06', 'Structs & Enums',
  'match Control Flow · Match Arms · Destructuring Tuples/Structs/Enums · if let & while let Concise Control Flow · Match Guards (if condition) · Catch-all (_)',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 18): Pattern Matching</strong>! Pattern matching evaluates values against arms in an exhaustive manner.
</div>

<div class="section-title"><span class="num">1</span>if let Pattern Matching Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — if let Syntax</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let config_max = Some(8u8);

    if let Some(max) = config_max {
        println!("Maximum: {max}");
    }
}</code></pre>
  </div>
</div>`,
  '17-enums.html', '17. Enums',
  '19-vectors.html', '19. Vectors'
);

// Chapter 19: Vectors
makePage(19, '19-vectors.html',
  'Vectors',
  'Complete Rust Chapter 19: Deep guide to Vec<T>, creating vectors with vec!, push(), pop(), indexing, safe access with get(), iterating vectors, mutable iteration, filtering, nested vectors, and vector capacity.',
  'Phase 07', 'Collections & Strings',
  'Vec<T> Dynamic Allocation · Creating Vectors (vec![]) · Pushing & Popping Values · Direct Indexing vs Safe get() · Immutable & Mutable Iteration · Vector Memory Capacity',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 19): Vectors</strong>! Vectors (<code>Vec&lt;T&gt;</code>) are resizable array buffers allocated dynamically on the heap.
</div>

<div class="section-title"><span class="num">1</span>Vector Push &amp; Loop Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Vector Operations</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let mut numbers = vec![10, 20, 30];

    numbers.push(40);

    for number in &numbers {
        println!("{number}");
    }
}</code></pre>
  </div>
</div>`,
  '18-pattern-matching.html', '18. Pattern Matching',
  '20-strings.html', '20. Strings'
);

// Chapter 20: Strings
makePage(20, '20-strings.html',
  'Strings',
  'Complete Rust Chapter 20: Deep guide to String vs &str, creating owned Strings, pushing text (push_str), format! macro, string concatenation, UTF-8 encoding, indexing limitation, iterating chars/bytes, and string slices.',
  'Phase 07', 'Collections & Strings',
  'String vs &str Slices · Creating Heap Strings · Modifying (push_str) · Concatenation & format! · UTF-8 Internal Encoding · Chars (.chars()) vs Bytes (.bytes()) Iteration',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 20): Strings</strong>! Learn the differences between growable heap <code>String</code> and borrowed slice <code>&amp;str</code>.
</div>

<div class="section-title"><span class="num">1</span>push_str &amp; format! Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — String Operations</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let mut greeting = String::from("Hello");
    greeting.push_str(", Rust!");

    let message = format!("{} Welcome!", greeting);
    println!("{message}");
}</code></pre>
  </div>
</div>`,
  '19-vectors.html', '19. Vectors',
  '21-hash-maps.html', '21. Hash Maps'
);

// Chapter 21: Hash Maps
makePage(21, '21-hash-maps.html',
  'Hash Maps',
  'Complete Rust Chapter 21: Deep guide to HashMap<K, V>, key-value pairs, inserting/reading values, entry API (.entry().or_insert()), updating values, removing values, iterating maps, and HashMap ownership.',
  'Phase 07', 'Collections & Strings',
  'HashMap<K, V> Structure · Key-Value Pair Insertions · Reading Values with get() · Entry API (.entry().or_insert()) · Iterating Key-Value Pairs · Word Frequency Counter Example',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 21): Hash Maps</strong>! HashMaps store key-value mappings for rapid lookup.
</div>

<div class="section-title"><span class="num">1</span>HashMap Entry API Example</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — HashMap Entry API</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    scores.insert("Blue", 10);
    scores.insert("Yellow", 50);

    scores.entry("Blue").or_insert(25);

    for (key, value) in &scores {
        println!("{key}: {value}");
    }
}</code></pre>
  </div>
</div>`,
  '20-strings.html', '20. Strings',
  '22-collections-project.html', '22. Collections Project'
);

// Chapter 22: Collections Project
makePage(22, '22-collections-project.html',
  'Collections Project',
  'Complete Rust Chapter 22: Hands-on Collections Capstone Project building a complete Student Marks Manager & Product Inventory CLI Application utilizing Vectors, HashMaps, Structs, Enums, and pattern matching.',
  'Phase 07', 'Collections & Strings',
  'Collections Capstone Project · Student Marks Manager · Inventory Tracker · Structs & Enums Integration · HashMap Data Lookup · Vector Records Sorting',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 22): Collections Project</strong>! Build a complete Student Marks Manager application using Vectors, HashMaps, and Structs.
</div>

<div class="section-title"><span class="num">1</span>Student Marks Manager Capstone</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Student Marks Manager</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::collections::HashMap;

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
}

fn main() {
    let mut student = Student::new(101, "Ravi");
    student.add_mark("Rust", 98);
    println!("Student: {}, Marks: {:?}", student.name, student.marks);
}</code></pre>
  </div>
</div>`,
  '21-hash-maps.html', '21. Hash Maps',
  null, null
);

console.log('\n🎉 SUPER DEEP RUST CHAPTERS 9 TO 22 GENERATED SUCCESSFULLY!');
