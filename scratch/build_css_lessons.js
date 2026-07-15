const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const cssBlogDir = path.join(publicDir, 'blog-css');

if (!fs.existsSync(cssBlogDir)) {
  fs.mkdirSync(cssBlogDir, { recursive: true });
}

const lessons = [
  { slug: 'intro',           num: 1,  title: 'What is CSS & How It Works' },
  { slug: 'selectors',       num: 2,  title: 'Selectors & Specificity' },
  { slug: 'box-model',       num: 3,  title: 'The Box Model' },
  { slug: 'colors-units',    num: 4,  title: 'Colors, Units & Variables' },
  { slug: 'typography',      num: 5,  title: 'Typography & Google Fonts' },
  { slug: 'backgrounds',     num: 6,  title: 'Backgrounds & Gradients' },
  { slug: 'display-position',num: 7,  title: 'Display, Position & Z-Index' },
  { slug: 'flexbox',         num: 8,  title: 'Flexbox Layout' },
  { slug: 'grid',            num: 9,  title: 'CSS Grid Layout' },
  { slug: 'responsive',      num: 10, title: 'Responsive Design & Media Queries' },
  { slug: 'transitions',     num: 11, title: 'Transitions & Animations' },
  { slug: 'pseudo',          num: 12, title: 'Pseudo-Classes & Pseudo-Elements' },
  { slug: 'transforms',      num: 13, title: 'Transforms & Filters' },
  { slug: 'custom-props',    num: 14, title: 'CSS Custom Properties (Variables)' },
  { slug: 'best-practices',  num: 15, title: 'CSS Best Practices & Architecture' },
];

function filename(l) {
  return `blog-css/${l.slug}.html`;
}

function getSidebar(activeSlug) {
  let h = `\n    <div class="sidebar-heading">CSS Tutorial</div>\n`;
  h += `    <a href="/blog-css.html"${activeSlug === 'home' ? ' class="active"' : ''}>CSS HOME</a>\n`;
  lessons.forEach(l => {
    h += `    <a href="/${filename(l)}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });
  h += `\n    <div class="sidebar-heading">Reference</div>\n`;
  h += `    <a href="/blog.html">All Tutorials</a>\n\n`;
  h += `    <div class="sidebar-heading">Other Languages</div>\n`;
  h += `    <a href="/blog-html.html">HTML</a>\n`;
  h += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  h += `    <a href="/blog-python.html">Python 3</a>\n`;
  h += `    <a href="/blog-java.html">Java</a>\n`;
  h += `    <a href="/blog-c.html">C</a>\n`;
  h += `    <a href="/blog-cpp.html">C++</a>\n`;
  h += `    <a href="/blog-csharp.html">C#</a>\n`;
  h += `    <a href="/blog-go.html">Go</a>\n`;
  h += `    <a href="/blog-ruby.html">Ruby</a>\n`;
  h += `    <a href="/blog-rust.html">Rust</a>\n`;
  h += `    <a href="/blog-php.html">PHP</a>\n`;
  return h;
}

function wrapPage(slug, title, mainContent, prevLesson, nextLesson) {
  const prev = prevLesson
    ? `<a href="/${filename(prevLesson)}" class="nav-btn"><span class="label">← Previous</span><span class="title">${prevLesson.title}</span></a>`
    : `<a href="/blog-css.html" class="nav-btn"><span class="label">← CSS Overview</span><span class="title">Course Index</span></a>`;
  const next = nextLesson
    ? `<a href="/${filename(nextLesson)}" class="nav-btn" style="text-align:right;"><span class="label">Next Lesson →</span><span class="title">${nextLesson.title}</span></a>`
    : `<a href="/blog.html" class="nav-btn" style="text-align:right;"><span class="label">All Tutorials →</span><span class="title">Learning Hub</span></a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | CSS Tutorial | Our Compiler</title>
  <meta name="description" content="Learn CSS — ${title}. Clear explanations, live examples, copy-code snippets, and hands-on challenges." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <script>
    (function() {
      const t = localStorage.getItem('theme') || 'dark';
      if (t === 'light') { document.documentElement.classList.add('light-theme'); document.addEventListener('DOMContentLoaded', () => document.body.classList.add('light-theme')); }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const btn = document.createElement('button');
          btn.className = 'blog-theme-toggle';
          btn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all .2s;white-space:nowrap;margin-right:12px;';
          btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(255,255,255,.25)'; btn.style.borderColor = '#fff'; });
          btn.addEventListener('mouseleave', () => { btn.style.background = 'rgba(255,255,255,.15)'; btn.style.borderColor = 'rgba(255,255,255,.25)'; });
          const upd = () => { btn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          upd();
          btn.addEventListener('click', () => { document.body.classList.toggle('light-theme'); document.documentElement.classList.toggle('light-theme'); localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); upd(); });
          topnav.appendChild(btn);
        }
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;
          let ac = header.querySelector('.code-actions');
          if (!ac) { ac = document.createElement('div'); ac.className = 'code-actions'; ac.style.cssText = 'display:flex;gap:8px;align-items:center;margin-left:auto;'; header.appendChild(ac); }
          const cp = document.createElement('button');
          cp.className = 'copy-btn'; cp.innerHTML = '📋 Copy';
          cp.style.cssText = 'background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s;font-family:"Inter",sans-serif;white-space:nowrap;';
          cp.addEventListener('mouseenter', () => { cp.style.background = 'rgba(255,255,255,.25)'; });
          cp.addEventListener('mouseleave', () => { cp.style.background = 'rgba(255,255,255,.15)'; });
          cp.addEventListener('click', () => { navigator.clipboard.writeText(codeEl.textContent).then(() => { cp.innerHTML = '✅ Copied!'; setTimeout(() => cp.innerHTML = '📋 Copy', 2000); }); });
          ac.appendChild(cp);
        });
      });
    })();
  </script>
</head>
<body class="lang-css">
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html" class="active">CSS</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">React</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Angular</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Vue.js</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Next.js</a>
  <a href="/?lang=nodejs">Node.js</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">REST API</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">GraphQL</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Spring Boot</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Django</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Flask</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Express.js</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">PostgreSQL</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">MySQL</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">MongoDB</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">SQLite</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Redis</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Cassandra</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">AWS</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Azure</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Google Cloud</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Docker</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Kubernetes</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">CI/CD</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Data Science</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Machine Learning</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Deep Learning</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">TensorFlow</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">PyTorch</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Big Data</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Git &amp; GitHub</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Linux</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Shell Scripting</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Testing</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Agile &amp; Scrum</a>
</nav>
<div class="layout">
  <aside class="sidebar">
    ${getSidebar(slug)}
  </aside>
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-css.html">CSS</a><span>›</span>
      <span>${slug === 'home' ? 'Index' : 'Lesson ' + lessons.find(x => x.slug === slug)?.num}</span>
    </div>
    ${mainContent}
    <div class="nav-footer">
      ${prev}
      ${next}
    </div>
  </main>
</div>
</body>
</html>`;
}

// ─── LESSON CONTENTS ──────────────────────────────────────────────────────────

const contents = {};

contents['intro'] = `
<h1 class="page-title">What is CSS & How It Works</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Basics</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>CSS (Cascading Style Sheets) is the language that controls the visual presentation of HTML documents — colors, fonts, layouts, spacing, and animations. Without CSS, every webpage would look like a plain text document.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Three Ways to Add CSS</div>
  <p>CSS can be applied to HTML in three different ways:</p>
  <ul>
    <li><strong>Inline</strong> — Inside the <code>style</code> attribute of a single element. Highest specificity but hard to maintain.</li>
    <li><strong>Internal</strong> — Inside a <code>&lt;style&gt;</code> tag in the <code>&lt;head&gt;</code> section.</li>
    <li><strong>External</strong> — A separate <code>.css</code> file linked with <code>&lt;link rel="stylesheet"&gt;</code>. Best practice for real projects.</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> CSS Rule Anatomy</div>
  <p>Every CSS rule follows the same pattern: <strong>selector</strong> → <strong>property</strong> → <strong>value</strong>.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Basic Rule Syntax</span></div>
    <pre><code>/* selector { property: value; } */

h1 {
  color: #2563eb;        /* text color */
  font-size: 2rem;       /* font size  */
  font-weight: 700;      /* bold       */
}

p {
  color: #374151;
  line-height: 1.7;      /* spacing between lines */
  max-width: 65ch;       /* readable line length  */
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Linking an External Stylesheet</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Link CSS File</span></div>
    <pre><code>&lt;head&gt;
  &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> The Cascade</div>
  <p>CSS is <em>cascading</em> — when multiple rules target the same element, the browser uses three factors to decide which wins:</p>
  <ol>
    <li><strong>Specificity</strong> — More specific selectors beat less specific ones.</li>
    <li><strong>Order</strong> — Later rules override earlier ones at equal specificity.</li>
    <li><strong>Importance</strong> — <code>!important</code> overrides everything (use sparingly).</li>
  </ol>
</div>
<div class="section">
  <div class="section-title"><span class="num">5</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an <code>index.html</code> file and a linked <code>styles.css</code>. Style an <code>h1</code> with a custom color and a <code>p</code> with a larger font size. Open it in your browser and confirm the styles apply.
  </div>
</div>`;

contents['selectors'] = `
<h1 class="page-title">Selectors & Specificity</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Basics</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>Selectors are patterns that tell the browser which HTML elements to style. Mastering selectors is the single most important CSS skill — everything else builds on it.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Core Selector Types</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Selector Types</span></div>
    <pre><code>/* Element selector — targets all matching tags */
p { color: #374151; }

/* Class selector — targets class="card" */
.card { border-radius: 8px; padding: 16px; }

/* ID selector — targets id="hero" (unique per page) */
#hero { background: #1e1b4b; color: white; }

/* Attribute selector */
a[target="_blank"] { color: orange; }

/* Descendant selector — p inside .card only */
.card p { font-size: 0.9rem; }

/* Child combinator — direct children only */
.nav > a { font-weight: 600; }

/* Multiple selectors */
h1, h2, h3 { font-family: 'Inter', sans-serif; }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Specificity Scoring</div>
  <p>The browser calculates a <strong>specificity score</strong> for every rule. Higher score wins.</p>
  <table class="tbl">
    <tr><th>Selector</th><th>Score</th></tr>
    <tr><td>Inline style</td><td>1-0-0-0</td></tr>
    <tr><td>ID <code>#id</code></td><td>0-1-0-0</td></tr>
    <tr><td>Class / Attribute / Pseudo-class</td><td>0-0-1-0</td></tr>
    <tr><td>Element / Pseudo-element</td><td>0-0-0-1</td></tr>
    <tr><td>Universal <code>*</code></td><td>0-0-0-0</td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Specificity Example</span></div>
    <pre><code>p            { color: black; }   /* score: 0-0-0-1 */
.intro p     { color: gray;  }   /* score: 0-0-1-1  ← wins */
#main .intro p { color: blue; }  /* score: 0-1-1-1  ← wins */</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a stylesheet where an element selector, a class selector, and an ID selector all try to set the same property. Verify which rule wins and explain why using specificity scores.
  </div>
</div>`;

contents['box-model'] = `
<h1 class="page-title">The Box Model</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Layout</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>Every HTML element is a rectangular box. The <strong>CSS Box Model</strong> defines four layers that control how elements are sized and spaced: content → padding → border → margin.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Box Model Layers</div>
  <ul>
    <li><strong>Content</strong> — The actual text or child elements. Controlled by <code>width</code> and <code>height</code>.</li>
    <li><strong>Padding</strong> — Space between content and the border (inside the element). Inherits background color.</li>
    <li><strong>Border</strong> — A visible line around the padding area.</li>
    <li><strong>Margin</strong> — Transparent space outside the border, pushing other elements away.</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Box Model in Code</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Box Model Properties</span></div>
    <pre><code>.card {
  /* Content area */
  width: 320px;
  height: 200px;

  /* Padding — inside spacing */
  padding: 24px;              /* all sides */
  padding: 12px 24px;         /* top/bottom  left/right */
  padding-top: 12px;

  /* Border */
  border: 2px solid #6366f1;
  border-radius: 12px;

  /* Margin — outside spacing */
  margin: 0 auto;             /* center horizontally */
  margin-bottom: 16px;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> box-sizing: border-box</div>
  <p>By default, <code>width</code> applies to the <em>content only</em>, meaning padding and border make the element larger than expected. The <code>border-box</code> model includes padding and border inside the declared width — far more intuitive.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — border-box Reset (Recommended)</span></div>
    <pre><code>*, *::before, *::after {
  box-sizing: border-box;  /* include padding & border in width */
}

/* Now a 320px element stays 320px wide, even with padding */
.card {
  width: 320px;
  padding: 24px;  /* does NOT add to total width */
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create two <code>.box</code> divs, one with <code>box-sizing: content-box</code> (default) and one with <code>box-sizing: border-box</code>. Give both <code>width: 200px</code> and <code>padding: 20px</code>. Measure their rendered widths using DevTools.
  </div>
</div>`;

contents['colors-units'] = `
<h1 class="page-title">Colors, Units & Variables</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Design</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>CSS supports many color formats and measurement units. Choosing the right ones makes your layouts responsive, accessible, and easy to maintain.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Color Formats</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Color Formats</span></div>
    <pre><code>/* Named colors (limited palette) */
color: red;
color: tomato;

/* Hex — #RRGGBB or shorthand #RGB */
color: #2563eb;
color: #fff;           /* = #ffffff */

/* RGB / RGBA */
color: rgb(37, 99, 235);
color: rgba(37, 99, 235, 0.5);   /* 50% transparent */

/* HSL — Hue Saturation Lightness (most designer-friendly) */
color: hsl(220, 83%, 53%);
color: hsla(220, 83%, 53%, 0.8);

/* Modern oklch (wide-gamut, best for design systems) */
color: oklch(55% 0.2 265);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Length Units</div>
  <table class="tbl">
    <tr><th>Unit</th><th>Meaning</th><th>Use When</th></tr>
    <tr><td><code>px</code></td><td>Pixels (absolute)</td><td>Borders, shadows, icons</td></tr>
    <tr><td><code>rem</code></td><td>Root font-size multiple</td><td>Font sizes, spacing (responsive)</td></tr>
    <tr><td><code>em</code></td><td>Parent font-size multiple</td><td>Component-relative sizing</td></tr>
    <tr><td><code>%</code></td><td>Relative to parent</td><td>Widths, heights</td></tr>
    <tr><td><code>vw / vh</code></td><td>Viewport width / height</td><td>Full-screen sections</td></tr>
    <tr><td><code>ch</code></td><td>Width of "0" character</td><td>Readable line lengths</td></tr>
  </table>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> CSS Custom Properties (Variables)</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Custom Properties</span></div>
    <pre><code>:root {
  --color-primary:   #2563eb;
  --color-surface:   #1e293b;
  --color-text:      #f1f5f9;
  --radius-md:       8px;
  --spacing-lg:      24px;
}

.btn {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  color: var(--color-text);
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">5</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Define a <code>:root</code> block with at least 4 custom properties (primary color, background, text color, border radius). Use them throughout a mini card component.
  </div>
</div>`;

contents['typography'] = `
<h1 class="page-title">Typography & Google Fonts</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Design</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>Typography is arguably the most impactful design decision you make. Good typography makes content easy to read and establishes visual hierarchy. CSS gives you precise control over every typographic dimension.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Core Typography Properties</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Typography</span></div>
    <pre><code>body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;         /* base — use px here only */
  line-height: 1.6;        /* unitless multiplier is best */
  color: #1e293b;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.5rem); /* fluid scaling */
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

p {
  max-width: 70ch;         /* optimal reading length */
  margin-block: 1rem;      /* top & bottom margin   */
}

.caption {
  font-size: 0.75rem;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Loading Google Fonts</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">HTML — Import Google Fonts</span></div>
    <pre><code>&lt;link rel="preconnect" href="https://fonts.googleapis.com"&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"&gt;</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Use Loaded Fonts</span></div>
    <pre><code>body        { font-family: 'Inter', sans-serif; }
code, pre   { font-family: 'JetBrains Mono', monospace; }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Fluid Typography with clamp()</div>
  <p><code>clamp(min, preferred, max)</code> lets font sizes scale smoothly with the viewport — no media queries needed.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — clamp() Fluid Sizing</span></div>
    <pre><code>h1 { font-size: clamp(1.8rem, 4vw + 1rem, 3.5rem); }
p  { font-size: clamp(1rem, 2vw, 1.2rem); }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Import two contrasting Google Fonts — one for headings (e.g. Playfair Display) and one for body (e.g. Inter). Build a small article layout using <code>clamp()</code> for the heading size.
  </div>
</div>`;

contents['backgrounds'] = `
<h1 class="page-title">Backgrounds & Gradients</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Design</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>
<div class="intro-box">
  <p>Backgrounds transform flat rectangles into rich visual surfaces. CSS supports solid colors, images, linear gradients, radial gradients, and layered combinations of all of them.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Background Properties</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Background Basics</span></div>
    <pre><code>.hero {
  background-color: #0f172a;

  /* Image */
  background-image: url('/hero-bg.jpg');
  background-size: cover;       /* fill the container   */
  background-position: center;  /* focus on center      */
  background-repeat: no-repeat;
  background-attachment: fixed; /* parallax scroll      */
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Gradients</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Gradient Types</span></div>
    <pre><code>/* Linear gradient — direction, color stops */
.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Radial gradient — circular burst */
.glow {
  background: radial-gradient(circle at center, #7c3aed, #1e1b4b);
}

/* Conic gradient — color wheel sweep */
.wheel {
  background: conic-gradient(red, yellow, green, blue, red);
}

/* Multi-layer background */
.layered {
  background:
    linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
    url('/photo.jpg') center / cover no-repeat;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a hero section with a full-viewport height, a layered background combining a dark overlay gradient and a background image, and centered white text. Use <code>background-size: cover</code> and <code>background-position: center</code>.
  </div>
</div>`;

contents['display-position'] = `
<h1 class="page-title">Display, Position & Z-Index</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Layout</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Understanding <code>display</code> and <code>position</code> is essential for controlling exactly where elements appear on the page. These two properties form the foundation of CSS layout.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Display Values</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Display Values</span></div>
    <pre><code>display: block;         /* full-width, stacks vertically   */
display: inline;        /* flows with text, no width/height */
display: inline-block;  /* inline flow + width/height       */
display: flex;          /* flexbox container                */
display: grid;          /* grid container                   */
display: none;          /* removes from layout entirely     */</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Position Values</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Position Values</span></div>
    <pre><code>/* static — default, ignores top/left/right/bottom */
position: static;

/* relative — offset from its normal position */
position: relative;
top: 10px; left: 20px;

/* absolute — removed from flow, positioned inside nearest
   non-static ancestor */
.parent { position: relative; }
.badge  { position: absolute; top: 8px; right: 8px; }

/* fixed — stays in viewport while scrolling */
.navbar { position: fixed; top: 0; width: 100%; z-index: 100; }

/* sticky — scrolls normally until threshold, then sticks */
.sidebar { position: sticky; top: 20px; }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Z-Index & Stacking Context</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Z-Index</span></div>
    <pre><code>.modal-overlay { z-index: 1000; position: fixed; }
.modal-box     { z-index: 1001; position: relative; }
.tooltip       { z-index: 500;  position: absolute; }</code></pre>
  </div>
  <p><strong>Important:</strong> <code>z-index</code> only works on elements with a <code>position</code> other than <code>static</code>.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a card with a badge (e.g. "NEW") pinned to the top-right corner using <code>position: absolute</code> inside a <code>position: relative</code> card wrapper.
  </div>
</div>`;

contents['flexbox'] = `
<h1 class="page-title">Flexbox Layout</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Layout</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Flexbox (Flexible Box Layout) is a one-dimensional layout model that distributes space and aligns items along a single axis (row or column). It replaced most float-based hacks and is now the go-to tool for component-level layout.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Container Properties</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Flex Container</span></div>
    <pre><code>.container {
  display: flex;

  /* Main axis direction */
  flex-direction: row;           /* row | column | row-reverse | column-reverse */

  /* Wrap onto multiple lines? */
  flex-wrap: wrap;               /* wrap | nowrap */

  /* Alignment on main axis */
  justify-content: space-between;/* flex-start | center | flex-end | space-around */

  /* Alignment on cross axis */
  align-items: center;           /* flex-start | flex-end | stretch | baseline */

  /* Multi-line cross-axis alignment */
  align-content: flex-start;

  gap: 16px;                     /* space between items */
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Item Properties</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Flex Items</span></div>
    <pre><code>.item {
  flex-grow: 1;     /* absorb extra space (0 = don't grow)  */
  flex-shrink: 0;   /* don't shrink below flex-basis         */
  flex-basis: 200px;/* ideal starting size                   */
  /* shorthand: flex: grow shrink basis */
  flex: 1 0 200px;

  align-self: flex-end; /* override container's align-items */
  order: 2;             /* reorder visually (not in DOM)     */
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Common Patterns</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Flex Patterns</span></div>
    <pre><code>/* Perfect centering */
.center { display: flex; justify-content: center; align-items: center; min-height: 100vh; }

/* Navigation bar */
.navbar { display: flex; justify-content: space-between; align-items: center; gap: 24px; }

/* Auto-fill card grid */
.cards { display: flex; flex-wrap: wrap; gap: 20px; }
.card  { flex: 1 1 280px; }   /* grow, shrink, min 280px */</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a responsive card row using <code>display: flex; flex-wrap: wrap;</code>. Each card should have <code>flex: 1 1 250px</code> so they fill the row but wrap to the next line on small screens.
  </div>
</div>`;

contents['grid'] = `
<h1 class="page-title">CSS Grid Layout</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Layout</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>CSS Grid is a two-dimensional layout system — it handles both rows and columns simultaneously. While Flexbox excels at component-level layout, Grid shines for full page layouts.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Defining a Grid</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Grid Container</span></div>
    <pre><code>.layout {
  display: grid;

  /* Define columns: 3 equal columns */
  grid-template-columns: 1fr 1fr 1fr;
  /* shorthand */
  grid-template-columns: repeat(3, 1fr);

  /* Sidebar + main + sidebar */
  grid-template-columns: 240px 1fr 240px;

  /* Auto-fill responsive columns */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

  grid-template-rows: auto;
  gap: 24px;              /* row-gap and column-gap */
  column-gap: 32px;
  row-gap: 16px;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Placing Items</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Grid Item Placement</span></div>
    <pre><code>.item {
  grid-column: 1 / 3;   /* start at line 1, end at line 3 (spans 2 cols) */
  grid-row: 2 / 4;       /* spans 2 rows */
}

/* Named template areas */
.page {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 240px 1fr;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a classic page layout (header, sidebar, main, footer) using <code>grid-template-areas</code>. Make the sidebar collapse to full-width on mobile using a media query.
  </div>
</div>`;

contents['responsive'] = `
<h1 class="page-title">Responsive Design & Media Queries</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Responsive</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Responsive design ensures your website looks great on every screen size — from 320px mobile phones to 4K monitors. CSS media queries are the primary tool for adapting layouts to different viewports.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Mobile-First Approach</div>
  <p>Write base styles for mobile first, then use <code>min-width</code> media queries to progressively enhance for larger screens. This is the modern industry standard.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Mobile-First Media Queries</span></div>
    <pre><code>/* Base: mobile styles */
.container {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

/* Tablet: 768px and up */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    flex-direction: row;
  }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
  }
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Other Query Types</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Media Query Variations</span></div>
    <pre><code>/* Dark mode */
@media (prefers-color-scheme: dark) {
  body { background: #0f172a; color: #f1f5f9; }
}

/* Reduced motion (accessibility) */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}

/* Print styles */
@media print {
  .no-print { display: none; }
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a 3-column grid that collapses to 1 column on mobile and 2 columns on tablet. Use <code>repeat(auto-fill, minmax(280px, 1fr))</code> as an alternative to media queries.
  </div>
</div>`;

contents['transitions'] = `
<h1 class="page-title">Transitions & Animations</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Motion</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Motion brings interfaces to life. CSS transitions handle simple state changes smoothly, while <code>@keyframes</code> animations give you complete control over multi-step sequences.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Transitions</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Transitions</span></div>
    <pre><code>.btn {
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;

  /* transition: property duration easing delay */
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> @keyframes Animations</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Keyframe Animations</span></div>
    <pre><code>@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-text {
  animation: fadeInUp 0.6s ease-out both;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader {
  animation: spin 1s linear infinite;
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Easing Functions</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Timing Functions</span></div>
    <pre><code>transition-timing-function: ease;           /* default */
transition-timing-function: linear;         /* constant speed */
transition-timing-function: ease-in;        /* slow start */
transition-timing-function: ease-out;       /* slow end */
transition-timing-function: ease-in-out;    /* slow both ends */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); /* spring */</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a button with a smooth hover effect that lifts it with <code>translateY(-3px)</code> and adds a colored box shadow. Add a pulsing glow animation using <code>@keyframes</code>.
  </div>
</div>`;

contents['pseudo'] = `
<h1 class="page-title">Pseudo-Classes & Pseudo-Elements</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Selectors</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>Pseudo-classes target elements based on their state or position in the DOM. Pseudo-elements target virtual sub-parts of elements. Together they eliminate the need for extra markup and JavaScript for many common UI patterns.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Pseudo-Classes</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Pseudo-Classes</span></div>
    <pre><code>/* User interaction */
a:hover       { color: #2563eb; }
button:active { transform: scale(0.97); }
input:focus   { outline: 2px solid #6366f1; }

/* Form states */
input:valid   { border-color: #22c55e; }
input:invalid { border-color: #ef4444; }
input:disabled{ opacity: 0.5; cursor: not-allowed; }

/* Structural */
li:first-child     { font-weight: 700; }
li:last-child      { border-bottom: none; }
li:nth-child(even) { background: #f8fafc; }
p:not(.special)    { color: #374151; }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Pseudo-Elements</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Pseudo-Elements</span></div>
    <pre><code>/* ::before and ::after inject content */
.badge::before {
  content: "🔥 ";
}

/* Decorative underline */
h2::after {
  content: "";
  display: block;
  height: 3px;
  width: 40px;
  background: #6366f1;
  margin-top: 8px;
  border-radius: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar       { width: 8px; }
::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 4px; }

/* First letter drop cap */
p::first-letter { font-size: 3em; float: left; line-height: 1; margin-right: 4px; }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Style a nav list so the active link has a colored underline using <code>::after</code> pseudo-element. Use <code>:nth-child(odd)</code> to alternate table row backgrounds without JavaScript.
  </div>
</div>`;

contents['transforms'] = `
<h1 class="page-title">Transforms & Filters</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Visual Effects</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Intermediate</span>
</div>
<div class="intro-box">
  <p>CSS transforms move, rotate, scale, and skew elements without affecting document flow. CSS filters apply visual effects like blur and brightness directly in the browser — no image editor required.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> 2D Transforms</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Transform Functions</span></div>
    <pre><code>.card:hover {
  /* Multiple transforms on one property */
  transform: translateY(-8px) scale(1.02) rotate(1deg);
  transition: transform 0.3s ease;
}

/* Individual functions */
transform: translateX(50px);        /* move right */
transform: translateY(-20px);       /* move up    */
transform: scale(1.5);              /* 150% size  */
transform: rotate(45deg);           /* clockwise  */
transform: skewX(10deg);            /* skew angle */

/* 3D transforms */
transform: rotateY(180deg);         /* card flip  */
transform: perspective(800px) rotateX(30deg);</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> CSS Filters</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Filter Functions</span></div>
    <pre><code>img { filter: grayscale(100%); }
img:hover { filter: grayscale(0%) brightness(1.1); transition: filter 0.3s; }

.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(180%); /* glassmorphism */
}

.dark-overlay { filter: brightness(0.6) contrast(1.2); }
.shadow-img   { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5)); }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a glassmorphism card using <code>backdrop-filter: blur()</code>, a semi-transparent background, and a subtle border. Add a hover transform that lifts the card.
  </div>
</div>`;

contents['custom-props'] = `
<h1 class="page-title">CSS Custom Properties (Variables)</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Architecture</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>
<div class="intro-box">
  <p>CSS Custom Properties (also called CSS Variables) store reusable values in the stylesheet itself. They are live in the browser, can be updated at runtime with JavaScript, and are the foundation of modern design systems and theme switching.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> Defining & Using Variables</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Design System Tokens</span></div>
    <pre><code>/* Define on :root for global scope */
:root {
  /* Color palette */
  --clr-primary-400: #6366f1;
  --clr-primary-600: #4f46e5;
  --clr-surface:     #0f172a;
  --clr-text:        #f1f5f9;
  --clr-text-muted:  #94a3b8;

  /* Spacing scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-base: 1rem;
  --text-lg:   1.125rem;

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
}

/* Usage */
.btn {
  background: var(--clr-primary-400);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  box-shadow: var(--shadow-md);
}</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> Dark / Light Theme Switching</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS + JS — Theme Switch</span></div>
    <pre><code>:root { --bg: #ffffff; --text: #0f172a; }
[data-theme="dark"] { --bg: #0f172a; --text: #f1f5f9; }

body { background: var(--bg); color: var(--text); transition: background 0.3s, color 0.3s; }</code></pre>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">JavaScript — Toggle Theme</span></div>
    <pre><code>document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? '' : 'dark';</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Build a full design system <code>:root</code> block with at least 10 tokens (colors, spacing, radius). Implement a working light/dark theme toggle using <code>data-theme</code> attribute switching.
  </div>
</div>`;

contents['best-practices'] = `
<h1 class="page-title">CSS Best Practices & Architecture</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS Architecture</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>
<div class="intro-box">
  <p>Well-architected CSS is maintainable, scalable, and predictable. Poor CSS turns into an unmaintainable mess of overrides and !important. In this final lesson we cover the methodologies and patterns that professionals rely on.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">1</span> BEM Naming Convention</div>
  <p>BEM (Block__Element--Modifier) provides a predictable class naming structure that makes CSS self-documenting.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — BEM</span></div>
    <pre><code>/* Block */
.card { }

/* Element (part of Block) */
.card__header { }
.card__body   { }
.card__footer { }

/* Modifier (variant of Block or Element) */
.card--featured  { }
.card--dark      { }
.card__btn--lg   { }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">2</span> CSS Reset / Normalize</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">CSS — Modern Reset</span></div>
    <pre><code>*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }
body { -webkit-font-smoothing: antialiased; }
img, video { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }</code></pre>
  </div>
</div>
<div class="section">
  <div class="section-title"><span class="num">3</span> Performance Tips</div>
  <ul>
    <li>Prefer <code>transform</code> and <code>opacity</code> for animations — they run on the GPU compositor thread and don't trigger layout recalculation.</li>
    <li>Avoid deeply nested selectors. Each extra level increases specificity and reduces maintainability.</li>
    <li>Use <code>will-change: transform</code> sparingly on elements you know will animate.</li>
    <li>Remove unused CSS with PurgeCSS or similar tools before shipping to production.</li>
    <li>Organize with a clear layer order: <em>Reset → Tokens → Base → Layout → Components → Utilities</em>.</li>
  </ul>
</div>
<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Refactor a messy stylesheet using BEM naming, a modern CSS reset, and a <code>:root</code> design token block. Measure the reduction in selector depth and specificity conflicts.
  </div>
</div>`;

// ─── BUILD ────────────────────────────────────────────────────────────────────
console.log('Starting CSS lesson generation...');

lessons.forEach((l, idx) => {
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;
  const html = wrapPage(l.slug, l.title, contents[l.slug], prev, next);
  fs.writeFileSync(path.join(publicDir, filename(l)), html, 'utf8');
  console.log(`Generated: ${filename(l)}`);
});

// Index page
const indexContent = `
<h1 class="page-title">CSS Tutorial — Complete Guide</h1>
<div class="page-meta">
  <span class="badge">🎨 CSS</span>
  <span class="badge">🟢 Beginner to Advanced</span>
  <span class="badge">📅 July 2026</span>
</div>
<div class="intro-box">
  <p>CSS (Cascading Style Sheets) is the language that styles the web. From basic colors and fonts to complex responsive grids and fluid animations, this course takes you from zero to confident in modern CSS. You will learn every foundational concept — the box model, flexbox, grid, media queries, transitions, custom properties, and professional architecture patterns — all with hands-on code examples and challenges.</p>
</div>
<div class="section">
  <div class="section-title"><span class="num">▶</span> 15-Lesson Curriculum</div>
  <table class="tbl" style="margin-top:15px;">
    <tr><th>Lesson</th><th>Topic</th></tr>
    ${lessons.map(l => `<tr><td><strong>Lesson ${l.num}</strong></td><td><a href="/${filename(l)}">${l.title}</a></td></tr>`).join('\n    ')}
  </table>
</div>`;

const indexHtml = wrapPage('home', 'CSS Tutorial — Complete Guide', indexContent, null, lessons[0]);
fs.writeFileSync(path.join(publicDir, 'blog-css.html'), indexHtml, 'utf8');
console.log('Generated: blog-css.html');
console.log('🎉 Successfully generated all 15 CSS tutorial files inside blog-css/ folder!');
