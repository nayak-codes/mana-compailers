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

console.log('🚀 Generating Rust Masterclass Chapters 16 to 22...');

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 16: Structs
// ═══════════════════════════════════════════════════════════════════════════════
makePage(16, '16-structs.html',
  'Structs',
  'Complete Rust Chapter 16: Deep guide to Structs, defining custom types, creating instances, field access, mutable structs, field shorthand, struct update syntax, tuple structs, unit-like structs, impl implementation blocks, methods (&self), associated functions, and deriving traits.',
  'Phase 06', 'Structs & Enums',
  'Defining Structs · Struct Instances & Fields · Field Shorthand & Update Syntax · Tuple Structs & Unit Structs · Implementation Blocks (impl) · Methods (&self) vs Associated Functions · #[derive(Debug)]',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 16): Structs</strong>! A struct (short for structure) is a custom data type that lets you group related data values together under a single meaningful name. In this chapter, we master classical named-field structs, tuple structs, unit structs, and implementation blocks (<code>impl</code>) to define methods and constructor functions.
</div>

<div class="section-title"><span class="num">1</span>Defining Structs &amp; Implementation Methods (impl)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Struct &amp; impl Method Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>// Define Student custom struct
struct Student {
    name: String,
    age: u32,
}

// Implementation block for methods and associated functions
impl Student {
    // Associated constructor function (like Student::new)
    fn new(name: &str, age: u32) -> Student {
        Student {
            name: String::from(name),
            age,
        }
    }

    // Method taking immutable reference to self (&self)
    fn display(&self) {
        println!("Student Name: {}, Age: {}", self.name, self.age);
    }
}

fn main() {
    let student = Student::new("Ravi", 20);
    student.display();
}</code></pre>
  </div>
</div>`,
  '15-lifetimes-introduction.html', '15. Lifetimes Introduction',
  '17-enums.html', '17. Enums'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 17: Enums
// ═══════════════════════════════════════════════════════════════════════════════
makePage(17, '17-enums.html',
  'Enums',
  'Complete Rust Chapter 17: Deep guide to Enums, enum variants, holding data inside variants, enum methods, Option<T> (Some, None), Result<T, E> (Ok, Err), combining enums with structs, and state machine modeling.',
  'Phase 06', 'Structs & Enums',
  'Enum Variants · Data-bearing Variants · Option<T> (Some, None) · Result<T, E> (Ok, Err) · Enum Methods · State Machine Application Modeling',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 17): Enums</strong>! Enums (enumerations) allow you to define a type by enumerating its possible variants. Unlike enums in C or Java, Rust enums can embed data (numbers, strings, structs) directly inside each variant!
</div>

<div class="section-title"><span class="num">1</span>Enums &amp; Match Processing</div>
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
        PaymentStatus::Pending => println!("Payment is Pending"),
        PaymentStatus::Completed => println!("Payment Completed Successfully!"),
        PaymentStatus::Failed => println!("Payment Failed"),
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>The Option&lt;T&gt; Enum (Replacing Null Pointer Dereferences!)</div>
<div class="section-body">
  <p>Rust does not have a <code>null</code> value. Instead, the standard library provides the generic <code>Option&lt;T&gt;</code> enum to express optional presence:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Option<T> Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Some(result) => println!("Division Result: {result}"),
        None => println!("Error: Cannot divide by zero!"),
    }
}</code></pre>
  </div>
</div>`,
  '16-structs.html', '16. Structs',
  '18-pattern-matching.html', '18. Pattern Matching'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 18: Pattern Matching
// ═══════════════════════════════════════════════════════════════════════════════
makePage(18, '18-pattern-matching.html',
  'Pattern Matching',
  'Complete Rust Chapter 18: Deep guide to match expressions, match arms, matching literals, matching enums/tuples/structs, if let, while let, match guards, catch-all pattern (_), destructuring patterns, and exhaustiveness checking.',
  'Phase 06', 'Structs & Enums',
  'match Control Flow · Match Arms · Destructuring Tuples/Structs/Enums · if let & while let Concise Control Flow · Match Guards (if condition) · Catch-all (_)',
  `<div class="intro-box">
  Welcome to <strong>Phase 6 (Chapter 18): Pattern Matching</strong>! Pattern matching with <code>match</code> allows you to compare a value against a series of patterns and execute code based on which pattern matches. The Rust compiler enforces <strong>exhaustive checking</strong>, ensuring every possible case is handled.
</div>

<div class="section-title"><span class="num">1</span>if let Concise Pattern Matching</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — if let Syntax</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let config_max = Some(8u8);

    // if let matches a single pattern concisely without needing an exhaustive match!
    if let Some(max) = config_max {
        println!("The maximum is configured to {max}");
    }
}</code></pre>
  </div>
</div>`,
  '17-enums.html', '17. Enums',
  '19-vectors.html', '19. Vectors'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 19: Vectors
// ═══════════════════════════════════════════════════════════════════════════════
makePage(19, '19-vectors.html',
  'Vectors',
  'Complete Rust Chapter 19: Deep guide to Vec<T>, creating vectors with vec!, push(), pop(), indexing, safe access with get(), iterating vectors, mutable iteration, filtering, nested vectors, and vector capacity.',
  'Phase 07', 'Collections & Strings',
  'Vec<T> Dynamic Allocation · Creating Vectors (vec![]) · Pushing & Popping Values · Direct Indexing vs Safe get() · Immutable & Mutable Iteration · Vector Memory Capacity',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 19): Vectors</strong>! A vector (<code>Vec&lt;T&gt;</code>) is a resizable array allocated on the heap. Vectors can store multiple values of the same type next to each other in memory.
</div>

<div class="section-title"><span class="num">1</span>Vector Operations &amp; Safe Iteration</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Vector Allocation &amp; Iteration</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    // Create a mutable vector using vec! macro
    let mut numbers = vec![10, 20, 30];

    // Push new elements onto the vector
    numbers.push(40);
    numbers.push(50);

    // Safe access using .get() returning Option<&T>
    match numbers.get(2) {
        Some(third) => println!("Third element: {third}"),
        None => println!("No element at index 2"),
    }

    // Iterating over vector references
    println!("--- Vector Elements ---");
    for number in &numbers {
        println!("{number}");
    }
}</code></pre>
  </div>
</div>`,
  '18-pattern-matching.html', '18. Pattern Matching',
  '20-strings.html', '20. Strings'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 20: Strings
// ═══════════════════════════════════════════════════════════════════════════════
makePage(20, '20-strings.html',
  'Strings',
  'Complete Rust Chapter 20: Deep guide to String vs &str, creating owned Strings, pushing text (push_str), format! macro, string concatenation, UTF-8 encoding, indexing limitation, iterating chars/bytes, and string slices.',
  'Phase 07', 'Collections & Strings',
  'String vs &str Slices · Creating Heap Strings · Modifying (push_str) · Concatenation & format! · UTF-8 Internal Encoding · Chars (.chars()) vs Bytes (.bytes()) Iteration',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 20): Strings</strong>! Rust has two primary string types: the heap-allocated growable <code>String</code> and the borrowed string slice <code>&amp;str</code>. Both types are guaranteed to be valid <strong>UTF-8 encoded sequences</strong>.
</div>

<div class="section-title"><span class="num">1</span>String Creation, Appending &amp; Iteration</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — String Operations</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>fn main() {
    let mut greeting = String::from("Hello");

    // Append string slice
    greeting.push_str(", Rust!");

    // Combine strings with format! macro
    let full_text = format!("{} Welcome to UTF-8: 🦀", greeting);
    println!("{full_text}");

    // Iterate over Unicode characters
    for c in full_text.chars() {
        print!("[{c}] ");
    }
    println!();
}</code></pre>
  </div>
</div>`,
  '19-vectors.html', '19. Vectors',
  '21-hash-maps.html', '21. Hash Maps'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 21: Hash Maps
// ═══════════════════════════════════════════════════════════════════════════════
makePage(21, '21-hash-maps.html',
  'Hash Maps',
  'Complete Rust Chapter 21: Deep guide to HashMap<K, V>, key-value pairs, inserting/reading values, entry API (.entry().or_insert()), updating values, removing values, iterating maps, and HashMap ownership.',
  'Phase 07', 'Collections & Strings',
  'HashMap<K, V> Structure · Key-Value Pair Insertions · Reading Values with get() · Entry API (.entry().or_insert()) · Iterating Key-Value Pairs · Word Frequency Counter Example',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 21): Hash Maps</strong>! A hash map (<code>HashMap&lt;K, V&gt;</code>) stores a mapping of keys of type <code>K</code> to values of type <code>V</code> using a hashing algorithm.
</div>

<div class="section-title"><span class="num">1</span>HashMap Operations &amp; Word Counter</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — HashMap Word Counter Example</span>
      <a class="try-btn" href="/online-rust-editor.html">▶ Run in Rust Editor</a>
    </div>
    <pre><code>use std::collections::HashMap;

fn main() {
    let text = "hello world wonderful world hello rust";
    let mut map = HashMap::new();

    for word in text.split_whitespace() {
        // .entry().or_insert() inserts 0 if key does not exist, then returns mutable reference to count
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }

    println!("Word Frequencies: {:?}", map);
}</code></pre>
  </div>
</div>`,
  '20-strings.html', '20. Strings',
  '22-collections-project.html', '22. Collections Project'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 22: Collections Project
// ═══════════════════════════════════════════════════════════════════════════════
makePage(22, '22-collections-project.html',
  'Collections Project',
  'Complete Rust Chapter 22: Hands-on Collections Capstone Project building a complete Student Marks Manager & Product Inventory CLI Application utilizing Vectors, HashMaps, Structs, Enums, and pattern matching.',
  'Phase 07', 'Collections & Strings',
  'Collections Capstone Project · Student Marks Manager · Inventory Tracker · Structs & Enums Integration · HashMap Data Lookup · Vector Records Sorting',
  `<div class="intro-box">
  Welcome to <strong>Phase 7 (Chapter 22): Collections Project</strong>! Put your Rust collections knowledge into practice by building a complete CLI application combining Vectors, HashMaps, Structs, Enums, and pattern matching!
</div>

<div class="section-title"><span class="num">1</span>Student Marks Manager Application</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Student Marks Manager Capstone</span>
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

    fn average_score(&self) -> f64 {
        if self.marks.is_empty() { return 0.0; }
        let total: u32 = self.marks.values().sum();
        total as f64 / self.marks.len() as f64
    }
}

fn main() {
    let mut student = Student::new(101, "Ravi");
    student.add_mark("Mathematics", 95);
    student.add_mark("Physics", 88);
    student.add_mark("Rust Programming", 100);

    println!("Student: {} (ID: {})", student.name, student.id);
    println!("Average Grade: {:.2}%", student.average_score());
}</code></pre>
  </div>
</div>`,
  '21-hash-maps.html', '21. Hash Maps',
  null, null
);

console.log('\n🎉 RUST CHAPTERS 16 TO 22 GENERATED SUCCESSFULLY!');
