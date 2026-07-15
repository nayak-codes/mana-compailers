const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const jsBlogDir = path.join(publicDir, 'blog-javascript');

// Ensure directory exists
if (!fs.existsSync(jsBlogDir)) {
  fs.mkdirSync(jsBlogDir, { recursive: true });
}

// JS Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-javascript/intro.html' },
  { slug: 'variables', num: 2, title: 'Variables (var, let & const)', filename: 'blog-javascript/variables.html' },
  { slug: 'operators', num: 3, title: 'Data Types & Operators', filename: 'blog-javascript/operators.html' },
  { slug: 'strings', num: 4, title: 'Strings & Template Literals', filename: 'blog-javascript/strings.html' },
  { slug: 'conditionals', num: 5, title: 'Conditionals (if-else & switch)', filename: 'blog-javascript/conditionals.html' },
  { slug: 'loops', num: 6, title: 'Loops & Control Flow', filename: 'blog-javascript/loops.html' },
  { slug: 'functions', num: 7, title: 'Functions & Arrow Syntax', filename: 'blog-javascript/functions.html' },
  { slug: 'arrays', num: 8, title: 'Arrays & Iteration Methods', filename: 'blog-javascript/arrays.html' },
  { slug: 'objects', num: 9, title: 'Objects & JSON', filename: 'blog-javascript/objects.html' },
  { slug: 'es6-features', num: 10, title: 'ES6+ Destructuring & Spread', filename: 'blog-javascript/es6-features.html' },
  { slug: 'oop', num: 11, title: 'OOP: Classes & Prototypes', filename: 'blog-javascript/oop.html' },
  { slug: 'closures', num: 12, title: 'Closures & Callback Functions', filename: 'blog-javascript/closures.html' },
  { slug: 'promises', num: 13, title: 'Promises & Async/Await', filename: 'blog-javascript/promises.html' },
  { slug: 'exceptions', num: 14, title: 'Error Handling (try-catch)', filename: 'blog-javascript/exceptions.html' },
  { slug: 'dom', num: 15, title: 'DOM Basics & Event Listeners', filename: 'blog-javascript/dom.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">JavaScript Tutorial</div>\n`;
  html += `    <a href="/blog-javascript.html"${activeSlug === 'home' ? ' class="active"' : ''}>JavaScript HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=nodejs">▶ Try JavaScript Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-c.html">C</a>\n`;
  html += `    <a href="/blog-cpp.html">C++</a>\n`;
  html += `    <a href="/blog-go.html">Go</a>\n`;
  html += `    <a href="/blog-rust.html">Rust</a>\n`;
  html += `    <a href="/blog-php.html">PHP</a>\n`;
  html += `    <a href="/blog-ruby.html">Ruby</a>\n`;
  
  return html;
}

function wrapPage(slug, title, mainContent, prevFile, prevTitle, nextFile, nextTitle) {
  let navFooter = `<div class="nav-footer">\n`;
  if (prevFile) {
    navFooter += `      <a href="/${prevFile}" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Previous Lesson</span>\n`;
    navFooter += `        <span class="title">${prevTitle}</span>\n`;
    navFooter += `      </a>\n`;
  } else {
    navFooter += `      <a href="/blog-javascript.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← JS Overview</span>\n`;
    navFooter += `        <span class="title">Course Index</span>\n`;
    navFooter += `      </a>\n`;
  }

  if (nextFile) {
    navFooter += `      <a href="/${nextFile}" class="nav-btn" style="text-align:right;">\n`;
    navFooter += `        <span class="label">Next Lesson →</span>\n`;
    navFooter += `        <span class="title">${nextTitle}</span>\n`;
    navFooter += `      </a>\n`;
  } else {
    navFooter += `      <a href="/blog.html" class="nav-btn" style="text-align:right;">\n`;
    navFooter += `        <span class="label">All Tutorials →</span>\n`;
    navFooter += `        <span class="title">Learning Hub</span>\n`;
    navFooter += `      </a>\n`;
  }
  navFooter += `    </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Our Compiler</title>
  <meta name="description" content="Learn JavaScript — ${title} with clear explanations, unique examples, common mistakes, and interactive code execution." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  
  <!-- Blog Theme Switcher -->
  <script>
    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        // Theme Toggle Button
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
          toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            toggleBtn.style.borderColor = '#ffffff';
          });
          toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            toggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
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

        // Decorate Code Blocks (Copy Code & Preload Run Code)
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          // Find or create actions container inside header
          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) {
              actionsContainer.appendChild(tryBtn);
            }
            header.appendChild(actionsContainer);
          }

          // Inject Copy Button
          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.25)';
            copyBtn.style.borderColor = '#ffffff';
          });
          copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          });
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(codeEl.textContent).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => {
                copyBtn.innerHTML = '📋 Copy';
              }, 2000);
            }).catch(err => {
              console.error('Failed to copy: ', err);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          // Preload Code into Editor on Run Click
          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              const url = tryBtn.getAttribute('href');
              const urlParams = new URLSearchParams(url.split('?')[1]);
              const langId = urlParams.get('lang') || 'nodejs';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-javascript">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html" class="active">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/?lang=csharp">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">HTML</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">CSS</a>
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
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Git & GitHub</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Linux</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Shell Scripting</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Testing</a>
  <a href="#" onclick="alert('Coming Soon! This tutorial is currently being drafted by Balaji Nayak.')">Agile & Scrum</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    ${getSidebar(slug)}
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-javascript.html">JavaScript</a><span>›</span>
      <span>Lesson ${slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num}</span>
    </div>
    
    ${mainContent}
    
    ${navFooter}
  </main>
</div>
</body>
</html>`;
}

const lessonContents = {};

// Lesson 1
lessonContents['intro'] = `
<h1 class="page-title">Welcome & Hello World</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">BeginnerFriendly</span>
</div>

<div class="intro-box">
  <p>JavaScript is a high-level, lightweight, interpreted programming language with first-class functions. Best known as the scripting language for Web pages, it is also widely used in non-browser environments like Node.js, databases, and structural devices.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Compilation Model & JIT Engine</div>
  <p>Unlike languages that require compiling source code into machine blocks before running (like C++), or languages parsed fully line-by-line (like early basic scripts), modern JavaScript uses a hybrid compilation paradigm. Inside browsers (like Chrome's V8 engine), JS uses <strong>Just-In-Time (JIT) Compilation</strong>.</p>
  <p>The JIT engine reads your code, compiles it into local machine code <em>on-the-fly right as it runs</em>, optimizing loops and hot variables dynamically during execution to yield maximum performance speeds.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Your First Program: console.log()</div>
  <p>Let's print messages to our compiler console. We use the built-in \`console.log()\` utility:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Hello World</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>console.log("Hello, World!");
console.log(10 + 20); // Math expression evaluations</code></pre>
  </div>

  <p><strong>Running Environments:</strong> JavaScript runs in the browser console (accessible via right-click -> Inspect -> Console) or on servers using the **Node.js** runtime system, which runs Chrome's V8 engine standalone.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code in the editor above. Add statements using \`console.log\` to print three different items: your favorite food (string), the result of multiplying 12 by 12, and a welcome statement. Run the compiler to verify.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables (var, let & const)</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>In JavaScript, variables are containers storing data values. Modern JavaScript provides three keywords to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>. Understanding their scope and hoisting behaviors is crucial.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Scoping & Hoisting (Temporal Dead Zone)</div>
  <p>Scoping rules control where variable declarations are visible:</p>
  <ul>
    <li><strong>var</strong>: Function-scoped. If declared inside a block (like an \`if\` statement), it leaks out and is accessible outside the block. It is also **hoisted** to the top of its scope, initialized with \`undefined\`.</li>
    <li><strong>let</strong>: Block-scoped. Accessible only inside the nearest curly braces \`{}\`. It is hoisted but remains uninitialized in the <strong>Temporal Dead Zone (TDZ)</strong> until execution reaches the line of declaration, throwing a ReferenceError if accessed early.</li>
    <li><strong>const</strong>: Block-scoped like \`let\`. Must be initialized immediately on declaration, and its variable binding cannot be reassigned.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Scoping Codes Check</div>
  <p>Let's run a program showing block scoping behaviors and temporal errors:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — var, let and const Scope</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>if (true) {
    var leakedVar = "I leak outside the block!";
    let blockedLet = "I remain trapped inside.";
    const blockedConst = "I am also trapped.";
}

console.log(leakedVar); // Succeeds

try {
    console.log(blockedLet);
} catch (e) {
    console.log("let access outside block failed: " + e.message);
}

const name = "Alice";
// name = "Bob"; // 🚨 Raises TypeError: Assignment to constant variable.
console.log("Const variable: " + name);</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a block of code declaring a \`const\` object representing a product. Try modifying one of its properties (e.g. \`product.price = 99\`) and explain why changing properties is allowed on a constant declaration in JS.
  </div>
</div>
`;

// Lesson 3
lessonContents['operators'] = `
<h1 class="page-title">Data Types & Operators</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>JavaScript is a dynamically-typed language. Variables can hold any data type and can change dynamically at runtime. The language includes primitives, objects, and implicit coercions.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Primitives vs Reference Types</div>
  <p>Variables store primitives directly in memory stacks, while referencing locations for objects on heap segments:</p>
  <ul>
    <li><strong>Primitives</strong>: \`string\`, \`number\` (both integers and decimals are double-precision floats), \`boolean\`, \`undefined\` (declared but not assigned), \`null\` (explicit emptiness), \`symbol\`, \`bigint\`.</li>
    <li><strong>Reference Types</strong>: Objects, Arrays, and Functions.</li>
  </ul>
  <p><strong>Strict Comparison:</strong> Always use the strict equality operator (\`===\`) instead of loose equality (\`==\`). Loose equality performs implicit type coercion (casting), leading to unexpected results (e.g. \`5 == "5"\` is true, but \`5 === "5"\` is false).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Dynamic Casting & Operators</div>
  <p>Let's run a program that demonstrates operators, typeof investigations, and strict comparison rules:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Types and Comparisons</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>let value = 42;
console.log("Type of 42: " + typeof value);

value = "Hello";
console.log("Type of 'Hello': " + typeof value);

// Comparisons
console.log("Loose matching (5 == '5'):", 5 == '5'); // true
console.log("Strict matching (5 === '5'):", 5 === '5'); // false

// Logical Operators
let isMember = true;
let score = 85;
let discount = (isMember && score > 80) ? "20%" : "0%";
console.log("Discount tier: " + discount);</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a comparison check testing loose and strict equality between \`null\` and \`undefined\` (e.g. \`null == undefined\` and \`null === undefined\`). Print both results and explain the difference.
  </div>
</div>
`;

// Lesson 4
lessonContents['strings'] = `
<h1 class="page-title">Strings & Template Literals</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Strings store text sequences. JavaScript provides single quotes, double quotes, and backtick string representations for formatting interpolation.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> String Pool & Template Strings</div>
  <p>Template string literals use **backticks (\`\`)** instead of standard quotes. They offer two major advantages:</p>
  <ul>
    <li><strong>Multi-line Support</strong>: You can write strings spanning multiple lines directly without using escape sequences like \`\\n\`.</li>
    <li><strong>String Interpolation (\`\${expression}\`)</strong>: You can embed variables and mathematical calculations directly inside the string without clumsy concatenation using \`+\` signs.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Core String Methods</div>
  <p>Let's run a program demonstrating slice, index searching, case transformations, and template literal substitution formatting:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — String Manipulation</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>let text = "JavaScript Programming";

// Length and slices
console.log("Length: " + text.length);
console.log("Slice (0, 10): " + text.slice(0, 10));

// Replacements & case shifts
console.log("Upper Case: " + text.toUpperCase());
console.log("Replace Java: " + text.replace("Java", "Type"));

// Template Literal formatting
let course = "JavaScript";
let rating = 5;
let summary = \`The \${course} course has a rating of \${rating}/5 stars.\`;
console.log("Summary: " + summary);</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create variables storing a product name, price, and purchase quantity. Use template literals to compute the total cost and output a dynamic statement (e.g. \`Purchased 3 Shirts for a total of $75\`).
  </div>
</div>
`;

// Lesson 5
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & switch)</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control program execution flow using boolean assertions. JavaScript supports if-else checks, switch statements, and ternary evaluations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Truthy & Falsy Evaluations</div>
  <p>In conditional statements, JavaScript coerces non-boolean variables into boolean values. Values that evaluate to \`false\` are called **falsy**: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, and \`NaN\` (Not-a-Number). **All other values are truthy** (including empty arrays \`[]\` and empty objects \`{}\`).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Logical Flows & Switch Conditionals</div>
  <p>Let's run a program evaluating conditions and checking truthy structures:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Conditionals</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>let score = 75;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 70) {
    console.log("Grade: B");
} else {
    console.log("Grade: F");
}

// Truthy vs Falsy
let username = ""; // Falsy
if (username) {
    console.log("User is logged in.");
} else {
    console.log("Guest mode active."); // Prints because string is empty
}

// Ternary execution
let val = 10;
let classification = (val % 2 === 0) ? "Even" : "Odd";
console.log("Number is " + classification);</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a conditional statement that tests if an array is empty (e.g. checking \`array.length\`). Print out a message. Verify why checking an array directly in an \`if (arr)\` block is a trap since empty arrays are truthy in JavaScript.
  </div>
</div>
`;

// Lesson 6
lessonContents['loops'] = `
<h1 class="page-title">Loops & Control Flow</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Loops repeat code blocks as long as a condition is satisfied. JavaScript supports standard for loops, while loops, do-while loops, and collection-specific loop variants.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Loop Structures: for, while, and do-while</div>
  <p>Selecting appropriate iteration flows depends on execution requirements:</p>
  <ul>
    <li><strong>for</strong>: Best for iterating over fixed numeric ranges.</li>
    <li><strong>while</strong>: Evaluates conditions before checking execution blocks.</li>
    <li><strong>do-while</strong>: Executes execution blocks first, and then evaluates conditions.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Loop Control Tracing</div>
  <p>Let's run a program iterating loops, checking break constraints, and skipping iterations via continue:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Loops</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>console.log("For iteration:");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// Flow control with break/continue
console.log("While sequence (skipping 3, breaking at 6):");
let count = 1;
while (count <= 10) {
    if (count === 3) {
        count++;
        continue; // Skip the rest of this loop iteration
    }
    if (count === 6) {
        break; // Exit the loop entirely
    }
    console.log(count);
    count++;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a loop that sums all even numbers between 1 and 20. Skip the number 12 using the \`continue\` keyword, and print the computed sum at the end.
  </div>
</div>
`;

// Lesson 7
lessonContents['functions'] = `
<h1 class="page-title">Functions & Arrow Syntax</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Functions are the core building blocks of JavaScript. JavaScript supports function declarations, function expressions, and modern arrow function syntax.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Function Declarations vs. Expressions & Arrow Functions</div>
  <p>There are multiple ways to define functions in JavaScript:</p>
  <ul>
    <li><strong>Function Declaration</strong>: Declared directly. These functions are hoisted, meaning you can call them before they are declared in your code file.</li>
    <li><strong>Function Expression</strong>: Stored inside variables. These are not hoisted and throw an error if called early.</li>
    <li><strong>Arrow Functions (\`() =&gt; {}\`)</strong>: A compact, modern syntax. Arrow functions do not bind their own \`this\` context; instead, they inherit \`this\` lexically from their parent scope.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Code Declarations</div>
  <p>Let's run a program showcasing declarations, expressions, default parameters, and arrow methods:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Functions</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>// 1. Function Declaration (Hoisted)
console.log("Add(5,10): " + add(5, 10));
function add(x, y) {
    return x + y;
}

// 2. Function Expression (Not Hoisted)
const multiply = function(x, y) {
    return x * y;
};
console.log("Multiply(5,10): " + multiply(5, 10));

// 3. Arrow Function with implicit return (Single line)
const square = x => x * x;
console.log("Square(6): " + square(6));

// 4. Default Parameters
const greet = (name = "Valued Guest") => \`Hello, \${name}!\`;
console.log(greet());
console.log(greet("Alice"));</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an arrow function called \`calculateTotal\` that takes a subtotal and an optional tax parameter (which defaults to \`0.08\` or 8%). Calculate and return the total cost. Invoke it with and without the tax parameter, printing the results.
  </div>
</div>
`;

// Lesson 8
lessonContents['arrays'] = `
<h1 class="page-title">Arrays & Iteration Methods</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Arrays are ordered, dynamically-resizable collections. JavaScript arrays store elements of any type and feature powerful built-in functional iteration methods.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Core Iteration Helpers: map, filter, & reduce</div>
  <p>Instead of using standard \`for\` loops, modern JavaScript processes arrays using functional iteration callbacks:</p>
  <ul>
    <li><strong>map()</strong>: Creates a new array by applying a modification function to every element of the original array.</li>
    <li><strong>filter()</strong>: Creates a new array containing only elements that pass a validation check.</li>
    <li><strong>reduce()</strong>: Condenses an entire array into a single accumulated value (like a sum or average).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Array Manipulations</div>
  <p>Let's run a program declaring arrays, modifying elements, and processing values with functional helpers:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Arrays and Helpers</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>let fruits = ["Apple", "Banana"];
fruits.push("Mango"); // Add to end
console.log("Fruits list: ", fruits);

let numbers = [1, 2, 3, 4, 5];

// map: Double all values
let doubled = numbers.map(x => x * 2);
console.log("Doubled: ", doubled);

// filter: Get even values
let evens = numbers.filter(x => x % 2 === 0);
console.log("Evens: ", evens);

// reduce: Sum all values
let sum = numbers.reduce((accum, curr) => accum + curr, 0);
console.log("Sum: " + sum);</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that filters an array of integers to retrieve only positive numbers, and then maps the filtered results to return their square values. Output the final array.
  </div>
</div>
`;

// Lesson 9
lessonContents['objects'] = `
<h1 class="page-title">Objects & JSON</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Objects are collection mappings storing key-value pairs. JSON (JavaScript Object Notation) is a lightweight data interchange format based on JavaScript object syntax.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Object Literals & Methods</div>
  <p>Objects map text keys to any data value (including other nested objects and functions, which act as **object methods**). Accessing properties is done via Dot notation (\`obj.key\`) or Bracket notation (\`obj["key"]\`), which allows dynamic property evaluation.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Object Manipulation & JSON Transformations</div>
  <p>Let's run a program initializing objects, running methods via the \`this\` keyword, and encoding to and from JSON strings:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Objects & JSON</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>const student = {
    name: "Alice",
    age: 21,
    skills: ["JS", "Node"],
    // Object Method
    introduce() {
        return \`Hi, I am \${this.name} and I know \${this.skills.join(", ")}.\`;
    }
};

console.log(student.introduce());

// JSON Conversions
const jsonString = JSON.stringify(student);
console.log("As JSON string: " + jsonString);

const parsedObject = JSON.parse(jsonString);
console.log("Parsed GPA (Dynamic field add):", parsedObject.name);</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an object called \`book\` with properties for title, author, and year. Write a method on the book object that returns a formatted description. Convert this book object into a JSON string and print the output.
  </div>
</div>
`;

// Lesson 10
lessonContents['es6-features'] = `
<h1 class="page-title">ES6+ Destructuring & Spread</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>ES6 (ECMAScript 2015) introduced syntax patterns that significantly reduce boilerplate code. Destructuring and the Spread/Rest operators are key features.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Destructuring and Spread (...) Operator</div>
  <p>These modern patterns simplify variable assignments:</p>
  <ul>
    <li><strong>Destructuring</strong>: Extract values from objects or arrays directly into variables in a single line.</li>
    <li><strong>Spread Operator (\`...\`)</strong>: Expands elements of an array or properties of an object. This is highly useful for creating safe copies of objects/arrays without modifying the originals.</li>
    <li><strong>Rest Parameter (\`...\`)</strong>: Bundles multiple function parameters into a single array block.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> ES6 Patterns Code</div>
  <p>Let's run a program executing object destructuring, array destructuring, and object copies using spread:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — ES6 Patterns</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>// 1. Destructuring
const user = { username: "nayak", email: "nayak@codes.com", role: "Admin" };
const { username, role } = user;
console.log(\`User: \${username}, Role: \${role}\`);

const coordinates = [10.5, 20.8];
const [x, y] = coordinates;
console.log(\`X: \${x}, Y: \${y}\`);

// 2. Spread Operator on Object copying
const baseSettings = { theme: "dark", notifications: true };
const userSettings = { ...baseSettings, notifications: false }; // Safe copy with override
console.log("User settings: ", userSettings);
console.log("Base settings (untouched): ", baseSettings);</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function called \`sumAll\` that uses rest parameters (\`...args\`) to sum any number of arguments passed to it. Test it with 3 arguments, then 6 arguments, and print the outputs.
  </div>
</div>
`;

// Lesson 11
lessonContents['oop'] = `
<h1 class="page-title">OOP: Classes & Prototypes</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>JavaScript uses prototypical inheritance. ES6 introduced class syntax as syntactical sugar over prototypes to make code structure cleaner.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Prototypes vs. ES6 Classes (extends & super)</div>
  <p>Every object in JavaScript has an internal link pointing to another object called its **Prototype**. When accessing a property or method, JS searches the object first. If not found, it traverses up the prototype chain.</p>
  <p>The modern **class** syntax makes structure layouts clean, supporting constructors, methods, and parent inheritance using the \`extends\` and \`super\` keywords.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Class Declarations</div>
  <p>Let's run a program declaring classes, inheriting methods, and overriding parent configurations:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — ES6 Classes</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>class Person {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(\`\${this.name} makes a sound.\`);
    }
}

// Inheriting from Person
class Programmer extends Person {
    constructor(name, lang) {
        super(name); // Call the parent class constructor
        this.lang = lang;
    }

    // Method Overriding
    speak() {
        console.log(\`\${this.name} writes code in \${this.lang}.\`);
    }
}

const coder = new Programmer("Alice", "JavaScript");
coder.speak(); // Invokes child overridden method</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Define a class called \`Shape\` with a constructor taking a shape name and a method \`getArea()\` returning 0. Create a subclass called \`Square\` extending Shape, which takes a side length parameter and overrides \`getArea()\` to return side * side. Instantiate \`Square\` and print its area.
  </div>
</div>
`;

// Lesson 12
lessonContents['closures'] = `
<h1 class="page-title">Closures & Callback Functions</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Closures are a powerful feature in JavaScript that enable state encapsulation. A closure is formed when a function remembers and accesses its lexical scope, even when executed outside that scope.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Closures and Encapsulating States</div>
  <p>A closure occurs when a nested inner function is returned from an outer function, preserving reference definitions of variables in the outer function's scope. This allows you to emulate private variables by restricting direct access to states.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Callback functions</div>
  <p>Callbacks are functions passed as arguments to other functions, which are executed after some event or calculation completes. Let's trace closures and callback logic:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Closures and Callbacks</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>// Closure structure encapsulating a count state
function createCounter() {
    let count = 0; // Private state variable
    return {
        increment() {
            count++;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log("Count: " + counter.increment());
console.log("Count: " + counter.increment());
// console.log(count); // 🚨 Throws ReferenceError: count is not defined!

// Callback execution
function processUser(name, callback) {
    console.log("Processing user " + name);
    callback();
}

processUser("Alice", () => {
    console.log("Processing completed!");
});</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function called \`createMultiplier(factor)\` that returns a closure function. The returned function should accept a number and return it multiplied by the factor. Initialize a \`double\` multiplier and use it to double \`5\`.
  </div>
</div>
`;

// Lesson 13
lessonContents['promises'] = `
<h1 class="page-title">Promises & Async/Await</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>JavaScript runs on a single-threaded event loop. Non-blocking asynchronous behaviors are handled using callbacks, Promises, and the modern async/await wrapper syntax.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> The Event Loop, Promises, and Async/Await</div>
  <p>JavaScript executes tasks sequentially. When an asynchronous task (like a database query or network request) starts, JS sends it to the browser/system APIs and continues running other code. When the task finishes, it triggers its callback.</p>
  <ul>
    <li><strong>Promise</strong>: An object representing the eventual completion (or failure) of an asynchronous operation, using \`resolve\` and \`reject\` states.</li>
    <li><strong>Async/Await</strong>: Syntactical sugar that allows you to write asynchronous code that reads like synchronous code, improving readability.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Async Code</div>
  <p>Let's run a program creating a simulated database query using Promises and parsing results with async/await:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Asynchronous Flow</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>// Simulated async network request
const fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id: id, name: "Alice", role: "Dev" });
            } else {
                reject(new Error("Invalid User ID"));
            }
        }, 1000);
    });
};

// Parse promise using async/await
async function runDemo() {
    console.log("Fetching user profile...");
    try {
        const user = await fetchUser(1); // Suspends execution until promise resolves
        console.log("User Loaded:", user);
    } catch (e) {
        console.log("Error loading user: " + e.message);
    }
}

runDemo();</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a simulated async function called \`fetchData\` that returns a Promise resolving to "Data Received!" after 1.5 seconds. Call this function inside an \`async\` wrapper function using the \`await\` keyword, and print the resolved message to the console.
  </div>
</div>
`;

// Lesson 14
lessonContents['exceptions'] = `
<h1 class="page-title">Error Handling (try-catch)</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Errors can halt code execution unexpectedly. Managing errors using try-catch blocks keeps your applications running robustly.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Try-Catch-Finally flow control</div>
  <p>Error statements handle exceptions safely:</p>
  <ul>
    <li><strong>try</strong>: Wraps code blocks that may throw exceptions.</li>
    <li><strong>catch</strong>: Intercepts and handles errors if they occur, preventing application crashes.</li>
    <li><strong>finally</strong>: Executes cleanup code after try/catch, regardless of whether an error was thrown.</li>
    <li><strong>throw</strong>: Manually raises custom exceptions using \`throw new Error("Message")\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Exception Interception Code</div>
  <p>Let's run a program throwing exceptions, trapping them in try-catch, and printing validation warnings:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — Exception Handling</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>function parseAge(age) {
    if (age < 0) {
        throw new Error("Age cannot be negative.");
    }
    return \`Age verified: \${age}\`;
}

try {
    console.log(parseAge(25));
    // Try passing invalid input
    console.log(parseAge(-5));
} catch (e) {
    console.log("Exception caught: " + e.message);
} finally {
    console.log("Validation checklist finished.");
}

console.log("Application continues running smoothly...");</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function that accepts a JSON string and parses it using \`JSON.parse\`. Wrap this parsing operation in a try-catch block to handle invalid JSON syntax strings gracefully, and print a custom error message if parsing fails.
  </div>
</div>
`;

// Lesson 15
lessonContents['dom'] = `
<h1 class="page-title">DOM Basics & Event Listeners</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>The Document Object Model (DOM) is a programming interface for web documents. It represents the page structure so that JavaScript can modify its styling, structure, and content dynamically.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Query Selectors & Modifying Elements</div>
  <p>JavaScript interacts with page nodes using document queries:</p>
  <ul>
    <li>\`document.getElementById(id)\`: Selects elements by their unique ID attribute.</li>
    <li>\`document.querySelector(selector)\`: Selects elements using CSS selector syntax (e.g. \`.class\`, \`#id\`, \`nav a\`).</li>
    <li>\`element.innerHTML\` / \`element.textContent\`: Gets or sets text/HTML content.</li>
    <li>\`element.style.property\`: Directly modifies inline CSS styling values.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Binding Event Listeners</div>
  <p>To make pages interactive, we bind events (like clicks, form submissions, or keystrokes) to elements using \`addEventListener()\`. Let's look at how this is structured in JavaScript:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">JavaScript — DOM Basics API</span>
      <a class="try-btn" href="/?lang=nodejs">▶ Run Code</a>
    </div>
    <pre><code>// Note: In Node.js server environments, the 'document' object is not defined.
// This example displays browser DOM modification syntax:

const btn = {
    clickEvent: null,
    addEventListener(event, callback) {
        if (event === "click") {
            this.clickEvent = callback;
        }
    },
    click() {
        if (this.clickEvent) this.clickEvent();
    }
};

// Simulation of binding element click event in JS
btn.addEventListener("click", () => {
    console.log("Button clicked! Dynamic style changes applied.");
});

btn.click(); // Trigger click event</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write the JavaScript statements needed to select a button with class \`submit-btn\`, add a click event listener to it, change its text content to "Submitted!", and update its background color style to green.
  </div>
</div>
`;

// Build lessons
console.log('Starting JavaScript lesson generation...');

lessons.forEach((l, index) => {
  const prevLesson = index > 0 ? lessons[index - 1] : null;
  const nextLesson = index < lessons.length - 1 ? lessons[index + 1] : null;
  
  const prevFile = prevLesson ? prevLesson.filename : null;
  const prevTitle = prevLesson ? prevLesson.title : null;
  const nextFile = nextLesson ? nextLesson.filename : null;
  const nextTitle = nextLesson ? nextLesson.title : null;
  
  const contentHtml = lessonContents[l.slug];
  if (!contentHtml) {
    console.error(`Missing content for lesson: ${l.slug}`);
    return;
  }
  
  const outputHtml = wrapPage(
    l.slug,
    l.title,
    contentHtml,
    prevFile,
    prevTitle,
    nextFile,
    nextTitle
  );
  
  fs.writeFileSync(path.join(publicDir, l.filename), outputHtml, 'utf8');
  console.log(`Generated: ${l.filename}`);
});

// Generate main index page: blog-javascript.html
const indexContent = `
<h1 class="page-title">JavaScript Tutorial</h1>
<div class="page-meta">
  <span class="badge">🟨 JavaScript</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>JavaScript is a versatile, lightweight, JIT-compiled programming language that powers the web. It handles everything from responsive front-end pages to scalable backend architectures using Node.js. In this comprehensive guide, you will master variable scoping rules, operator operations, functional iteration helper methods, asynchronous promises, error checks, prototypical structures, and DOM interfaces.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning JavaScript:</p>
  <table class="tbl" style="margin-top: 15px;">
    <tr><th>Lesson</th><th>Topic</th></tr>
    ${lessons.map(l => `
      <tr>
        <td><strong>Lesson ${l.num}</strong></td>
        <td><strong><a href="/${l.filename}">${l.title}</a></strong></td>
      </tr>
    `).join('')}
  </table>
</div>
`;

const outputIndexHtml = wrapPage(
  'home',
  'JavaScript Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-javascript.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-javascript.html');
console.log('🎉 Successfully generated all 15 JavaScript tutorial files inside blog-javascript/ folder!');
