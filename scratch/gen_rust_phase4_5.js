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
  console.log(`  ✅ Generated ${filename} (${(fullHtml.length / 1024).toFixed(1)}KB)`);
}

console.log('🚀 Generating Rust Masterclass Chapters 9 to 15...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 09: Functions
// ═══════════════════════════════════════════════════════════════════════════════
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
</div>

<div class="section-title"><span class="num">2</span>Statements vs Expressions in Rust</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Category</th><th>Definition</th><th>Code Example</th></tr></thead>
    <tbody>
      <tr><td><strong>Statement</strong></td><td>Instructions that perform an action and do NOT return a value. Must end with a semicolon.</td><td><code>let x = 5;</code></td></tr>
      <tr><td><strong>Expression</strong></td><td>Evaluates to a resulting value. Does NOT end with a semicolon. Block expressions return their last line.</td><td><code>first + second</code> or <code>{ let y = 3; y + 1 }</code></td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Block Expression Assignment</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Block expression evaluating to 12
    let y = {
        let x = 3;
        x * 4 // Implicit return value assigned to y
    };

    println!("Value of y: {y}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What happens if I add a semicolon to the last line of a returning function?</h4>
    <p>Adding a semicolon converts the expression into a statement, which returns the empty unit type <code>()</code>, triggering a compile error if the function expects a return type like <code>-&gt; i32</code>!</p>
  </div>
</div>`,
  '08-compound-types.html', '8. Compound Types',
  '10-conditions.html', '10. Conditions'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 10: Conditions
// ═══════════════════════════════════════════════════════════════════════════════
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
</div>

<div class="section-title"><span class="num">2</span>if as an Expression (Ternary Operator Alternative)</div>
<div class="section-body">
  <p>Rust does not have a ternary operator (<code>condition ? a : b</code>). Instead, <code>if</code> is an expression that returns a value directly:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — if Expression Assignment</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let condition = true;

    // Both branches must return the exact same data type (i32)
    let number = if condition { 5 } else { 10 };

    println!("Assigned Number: {number}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">❓</span> Frequently Asked Questions (FAQ)</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Can I use an integer as a condition like if (1) in Rust?</h4>
    <p>No! Rust requires strict boolean types for <code>if</code> conditions. Passing an integer causes a compile error: <code>mismatched types: expected bool, found integer</code>.</p>
  </div>
</div>`,
  '09-functions.html', '9. Functions',
  '11-loops.html', '11. Loops'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 11: Loops
// ═══════════════════════════════════════════════════════════════════════════════
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
    println!("--- For Loop ---");
    for number in 1..=5 {
        println!("{number}");
    }

    // 2. Returning value from loop via break
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2; // Returns 20 to result variable
        }
    };
    println!("Loop Result: {result}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Loop Labels (\'label) for Nested Loops</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Loop Labels Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    'outer: for x in 1..=3 {
        for y in 1..=3 {
            if x * y == 4 {
                println!("Breaking outer loop at x={x}, y={y}");
                break 'outer; // Breaks the outer loop cleanly!
            }
        }
    }
}</code></pre>
  </div>
</div>`,
  '10-conditions.html', '10. Conditions',
  '12-ownership.html', '12. Ownership'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 12: Ownership
// ═══════════════════════════════════════════════════════════════════════════════
makePage(12, '12-ownership.html',
  'Ownership',
  'Complete Rust Chapter 12: Deep guide to Ownership rules, Stack vs Heap allocation, variable scope, move semantics, Copy trait vs Clone trait, ownership in functions, return values, Drop trait automatic deallocation, and compiler borrow errors.',
  'Phase 05', 'Ownership & Borrowing',
  'Ownership Definition & 3 Rules · Stack vs Heap Allocation · Move Semantics · Copy vs Clone Traits · Function Ownership Transfer · Automatic Drop Trait Deallocation',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 12): Ownership</strong>! Ownership is Rust's most unique feature that guarantees memory safety without needing a garbage collector. In this chapter, we master the 3 Golden Rules of Ownership, move semantics, Copy vs Clone traits, function transfers, and automatic memory drops.
</div>

<div class="section-title"><span class="num">1</span>The 3 Golden Rules of Ownership</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">🔑 The 3 Golden Rules of Rust Ownership</div>
    <ol style="margin-left:20px; line-height:1.8;">
      <li>Each value in Rust has an owner variable.</li>
      <li>There can only be <strong>one owner at a time</strong>.</li>
      <li>When the owner variable goes out of scope, the value is automatically dropped (freed from memory).</li>
    </ol>
  </div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Move Semantics Demonstration</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Heap-allocated String
    let first = String::from("Rust");

    // Ownership of the heap data MOVES from 'first' to 'second'
    let second = first;

    println!("{second}");
    
    // println!("{first}"); ❌ COMPILE ERROR: Use of moved value: 'first'
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Move vs Copy vs Clone</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Trait / Operation</th><th>Behavior</th><th>Types Supported</th></tr></thead>
    <tbody>
      <tr><td><strong>Move Semantics</strong></td><td>Transfers ownership pointer. Previous variable becomes invalid.</td><td>Heap types like <code>String</code>, <code>Vec&lt;T&gt;</code></td></tr>
      <tr><td><strong>Copy Trait</strong></td><td>Automatically duplicates data on the stack. Both variables remain valid!</td><td>Primitive stack types (<code>i32</code>, <code>f64</code>, <code>bool</code>, <code>char</code>)</td></tr>
      <tr><td><strong>Clone Trait</strong></td><td>Explicit deep copy allocating new heap memory.</td><td>Types implementing <code>Clone</code> (e.g. <code>first.clone()</code>)</td></tr>
    </tbody>
  </table>
</div>`,
  '11-loops.html', '11. Loops',
  '13-borrowing-and-references.html', '13. Borrowing & References'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 13: Borrowing and References
// ═══════════════════════════════════════════════════════════════════════════════
makePage(13, '13-borrowing-and-references.html',
  'Borrowing & References',
  'Complete Rust Chapter 13: Deep guide to References (&), Borrowing, Immutable references (&T), Mutable references (&mut T), Borrowing Rules (1 mutable XOR multiple immutable), Dangling references prevention, and Reference scoping.',
  'Phase 05', 'Ownership & Borrowing',
  'References (&) · Immutable Borrows (&T) · Mutable Borrows (&mut T) · Borrowing Rule (Aliasing XOR Mutability) · Dangling Reference Prevention · Reference Scope',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 13): Borrowing &amp; References</strong>! Borrowing allows you to access data without taking ownership. By passing references (<code>&amp;</code>), functions can inspect or modify values while allowing the caller to retain original ownership.
</div>

<div class="section-title"><span class="num">1</span>Immutable References (&amp;T)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Immutable Borrowing Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn calculate_length(text: &String) -> usize {
    text.len() // Accesses String without taking ownership
}

fn main() {
    let message = String::from("Hello Rust");

    // Pass an immutable reference &message
    let len = calculate_length(&message);

    // message is still owned by main() and remains fully valid!
    println!("'{message}' has length {len}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>The Golden Borrowing Rule (Aliasing XOR Mutability)</div>
<div class="section-body">
  <div class="callout">
    <div class="callout-title">⚠️ The Golden Borrowing Rule</div>
    <p>At any given time, you can have <strong>EITHER</strong>:</p>
    <ul>
      <li>One mutable reference (<code>&amp;mut T</code>) to data, <strong>OR</strong></li>
      <li>Any number of immutable references (<code>&amp;T</code>) to data,</li>
    </ul>
    <p>...but <strong>NEVER both at the same time</strong>! This rule completely prevents Data Races at compile time.</p>
  </div>
</div>`,
  '12-ownership.html', '12. Ownership',
  '14-slices.html', '14. Slices'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 14: Slices
// ═══════════════════════════════════════════════════════════════════════════════
makePage(14, '14-slices.html',
  'Slices',
  'Complete Rust Chapter 14: Deep guide to Slices (&[T]), String slices (&str), Array slices, String vs &str, slice ranges [start..end], mutable slices, slice safety, and returning slices from functions.',
  'Phase 05', 'Ownership & Borrowing',
  'Slice Definition · String Slices (&str) · Array Slices (&[T]) · String vs &str Comparison · Slice Index Ranges · Mutable Slices · Function Slice Returns',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 14): Slices</strong>! A slice is a view into a contiguous sequence of elements in a collection without copying data. Slices store a starting memory pointer address and a length.
</div>

<div class="section-title"><span class="num">1</span>String Slices (&amp;str) &amp; first_word Function</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — String Slice Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn first_word(text: &str) -> &str {
    text.split_whitespace().next().unwrap_or("")
}

fn main() {
    let sentence = String::from("Rust is blazingly fast");

    // Borrowing a slice of the String
    let word = first_word(&sentence);

    println!("First word: {word}");
}</code></pre>
  </div>
</div>`,
  '13-borrowing-and-references.html', '13. Borrowing & References',
  '15-lifetimes-introduction.html', '15. Lifetimes Introduction'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 15: Lifetimes Introduction
// ═══════════════════════════════════════════════════════════════════════════════
makePage(15, '15-lifetimes-introduction.html',
  'Lifetimes Introduction',
  'Complete Rust Chapter 15: Deep guide to Lifetimes (\'a), reference validity, lifetime annotations, lifetime elision rules, function lifetimes, struct lifetimes, static lifetime \'static, and preventing dangling references.',
  'Phase 05', 'Ownership & Borrowing',
  'Lifetime Definition (\'a) · Reference Validity · Lifetime Annotations Syntax · Lifetime Elision Rules · Function Lifetimes · Struct Lifetimes · \'static Lifetime',
  `<div class="intro-box">
  Welcome to <strong>Phase 5 (Chapter 15): Lifetimes Introduction</strong>! Lifetimes are named scope parameters (like <code>'a</code>) that communicate to the Rust compiler how long references stay valid, preventing dangling references.
</div>

<div class="section-title"><span class="num">1</span>Lifetime Annotations in Functions</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Function Lifetime Annotation</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// 'a indicates returned reference lives as long as both input references
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let string1 = String::from("long string is long");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("Longest string: {result}");
}</code></pre>
  </div>
</div>`,
  '14-slices.html', '14. Slices',
  '16-structs.html', '16. Structs'
);

console.log('\n🎉 RUST CHAPTERS 9 TO 15 GENERATED SUCCESSFULLY!');
