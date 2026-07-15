const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const phpBlogDir = path.join(publicDir, 'blog-php');

// Ensure directory exists
if (!fs.existsSync(phpBlogDir)) {
  fs.mkdirSync(phpBlogDir, { recursive: true });
}

// PHP Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-php/intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Scope', filename: 'blog-php/variables.html' },
  { slug: 'types-expressions', num: 3, title: 'Data Types & Expressions', filename: 'blog-php/types-expressions.html' },
  { slug: 'conditionals', num: 4, title: 'Conditionals (if-else & switch)', filename: 'blog-php/conditionals.html' },
  { slug: 'loops', num: 5, title: 'Loops & Control Flow', filename: 'blog-php/loops.html' },
  { slug: 'arrays', num: 6, title: 'Arrays (Indexed & Associative)', filename: 'blog-php/arrays.html' },
  { slug: 'functions', num: 7, title: 'Functions & Type Hints', filename: 'blog-php/functions.html' },
  { slug: 'oop-basics', num: 8, title: 'OOP: Classes & Objects', filename: 'blog-php/oop-basics.html' },
  { slug: 'oop-inheritance', num: 9, title: 'OOP: Inheritance & Overriding', filename: 'blog-php/oop-inheritance.html' },
  { slug: 'superglobals', num: 10, title: 'HTTP Superglobals ($_GET, $_POST)', filename: 'blog-php/superglobals.html' },
  { slug: 'form-sanitization', num: 11, title: 'Form Processing & XSS Protection', filename: 'blog-php/form-sanitization.html' },
  { slug: 'sessions-cookies', num: 12, title: 'Sessions & Cookies Management', filename: 'blog-php/sessions-cookies.html' },
  { slug: 'database-pdo', num: 13, title: 'Database Security & PDO', filename: 'blog-php/database-pdo.html' },
  { slug: 'exceptions', num: 14, title: 'Exception Handling (try-catch)', filename: 'blog-php/exceptions.html' },
  { slug: 'files', num: 15, title: 'File System Operations', filename: 'blog-php/files.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">PHP Tutorial</div>\n`;
  html += `    <a href="/blog-php.html"${activeSlug === 'home' ? ' class="active"' : ''}>PHP HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=php">▶ Try PHP Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-c.html">C</a>\n`;
  html += `    <a href="/blog-cpp.html">C++</a>\n`;
  html += `    <a href="/blog-csharp.html">C#</a>\n`;
  html += `    <a href="/blog-go.html">Go</a>\n`;
  html += `    <a href="/blog-ruby.html">Ruby</a>\n`;
  html += `    <a href="/blog-rust.html">Rust</a>\n`;
  
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
    navFooter += `      <a href="/blog-php.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← PHP Overview</span>\n`;
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
  <meta name="description" content="Learn PHP — ${title} with clear explanations, associative arrays, HTTP forms handling, session cookies, and database interactions." />
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
              const langId = urlParams.get('lang') || 'php';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-php">

<!-- TOP LANGUAGE BAR -->
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
  <a href="/blog-php.html" class="active">PHP</a>
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
      <a href="/blog-php.html">PHP</a><span>›</span>
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
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>PHP (Hypertext Preprocessor) is a widely-used open source server-side scripting language designed specifically for web development. It is the language powering platforms like WordPress, Drupal, and Wikipedia, running behind the scenes of over 70% of modern websites.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Server-Side Execution Model</div>
  <p>Unlike client-side languages like JavaScript (which execute directly inside the user's browser), PHP code runs **on the web server**. The server processes the PHP code, generates a plain HTML document dynamically, and sends that HTML back to the client's browser. This allows developers to construct dynamic layouts securely.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Embedding PHP in HTML & print vs echo</div>
  <p>PHP code can be embedded directly inside HTML code using standard PHP wrappers (\`&lt;?php ... ?&gt;\`). Let's write a simple Hello World script:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Hello World</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
echo "Hello, World!\\n";
print "Welcome to Our PHP Compiler!\\n";
?&gt;</code></pre>
  </div>

  <p>Let's analyze output statements:</p>
  <ul>
    <li><strong>echo</strong>: The primary command used to output text or HTML tags. It is slightly faster than \`print\` because it does not return a value.</li>
    <li><strong>print</strong>: Similar to \`echo\`, but returns a value of \`1\`, allowing it to be used in complex expressions.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code block. Use \`echo\` to print an HTML header tag (e.g. \`&lt;h1&gt;Welcome&lt;/h1&gt;\`) to verify how HTML tags are rendered from PHP.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables & Scope</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>In PHP, all variables are declared with a leading dollar sign ($). PHP is dynamically typed, meaning you do not need to declare types before creating variables.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Dollar Prefix & Global/Static scopes</div>
  <p>PHP scope rules differ from block-scope systems:</p>
  <ul>
    <li><strong>Dollar Prefix (\`$val\`)</strong>: All variables start with \`$\`. Names are case-sensitive (\`$age\` and \`$AGE\` are different).</li>
    <li><strong>Global Keyword</strong>: Local functions cannot read variables declared outside their scope unless they explicitly declare them as global: \`global $variable;\`.</li>
    <li><strong>Static Variables</strong>: Prefixing a variable with \`static\` inside a function preserves its value across multiple function calls.</li>
    <li><strong>Constants</strong>: Created using the \`define()\` function or \`const\` keyword. They do not start with a \`$\` sign.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Variables Code</div>
  <p>Let's run a program declaring variables and testing constants:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Variables</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
$name = "Balaji";
$age = 22;

// Define a constant
define("SITE_URL", "https://ourcompiler.com");

echo "Name: " . $name . "\\n"; // '.' is used for string concatenation
echo "Age: " . $age . "\\n";
echo "Constant URL: " . SITE_URL . "\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function containing a \`static\` variable counter. Increment it and invoke the function three times, printing the result to verify the counter variable's state is preserved.
  </div>
</div>
`;

// Lesson 3
lessonContents['types-expressions'] = `
<h1 class="page-title">Data Types & Expressions</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>PHP supports standard numeric and string data types. Understanding double-quoted variable parsing and debugging tools like <code>var_dump()</code> is crucial.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Double Quote Parsing & var_dump() Debugging</div>
  <p>Data types in PHP follow standard dynamic definitions:</p>
  <ul>
    <li><strong>Double Quotes vs Single Quotes</strong>: Double quotes parse and interpolate variables embedded inside them automatically: \`"Hello $name"\`. Single-quoted strings treat text strictly as literals: \`'Hello $name'\` prints the literal string \`$name\`.</li>
    <li><strong>var_dump()</strong>: A powerful debugging function that prints the type and value of an expression, making it the primary tool for debugging variables in PHP.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Type Formatting Code</div>
  <p>Let's run a program comparing string quotes and inspecting variables using var_dump:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Data Types</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
$fruit = "Apple";
$price = 1.99;
$in_stock = true;

// Double quotes parse variables, single quotes do not
echo "Double quotes: $fruit costs $price\\n";
echo 'Single quotes: $fruit costs $price\\n';
echo "\\n";

// Debugging using var_dump()
var_dump($fruit);
var_dump($price);
var_dump($in_stock);
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Declare a null variable. Pass it to \`var_dump()\` and run the code to observe how PHP represents null values.
  </div>
</div>
`;

// Lesson 4
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & switch)</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control the branch paths of execution based on boolean checks. In this lesson, we will look at if-else blocks, ternary operators, and PHP's null coalescing operator (??).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Null Coalescing (??) & Alternative HTML colon syntax</div>
  <p>PHP conditionals support modern operators and styling alternatives:</p>
  <ul>
    <li><strong>Null Coalescing Operator (\`??\`)</strong>: Returns its first operand if it exists and is not null; otherwise, returns the second operand. Highly useful for managing fallback values: \`$name = $_GET['user'] ?? 'Guest';\`.</li>
    <li><strong>Alternative Syntax (\`if:\` / \`endif;\`)</strong>: In pure PHP files embedded within HTML pages, PHP provides colon-based blocks to make layout nesting cleaner and easier to read.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Conditionals Code</div>
  <p>Let's run a program evaluating conditions and checking null coalescing operators:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Conditionals</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
$score = 85;

if ($score >= 90) {
    echo "Grade: A\\n";
} elseif ($score >= 80) { // Note that 'elseif' is a single word in PHP
    echo "Grade: B\\n";
} else {
    echo "Grade: F\\n";
}

// Null Coalescing Operator fallback check
$username = null;
$displayName = $username ?? "Guest User";
echo "Welcome, " . $displayName . "\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a nested conditional checking if a user has admin access. Expose a boolean flag \`$logged_in\` and a string \`$role\`. Display "Access Granted" if both checks are satisfied.
  </div>
</div>
`;

// Lesson 5
lessonContents['loops'] = `
<h1 class="page-title">Loops & Control Flow</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Loops execute statements repeatedly while a condition is satisfied. PHP supports standard numeric loops and a key-value foreach iteration loop.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> foreach loops over collections</div>
  <p>While PHP supports standard \`while\` and \`for\` loops, iterating over lists is typically done using the **\`foreach\`** loop: \`foreach ($arr as $val)\` or \`foreach ($arr as $key =&gt; $val)\` for associative arrays.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Loops Code</div>
  <p>Let's run a program illustrating loops, continue statements, and break constraints:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Loops</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
echo "For loop count: ";
for ($i = 1; $i <= 5; $i++) {
    echo $i . " ";
}
echo "\\n";

// While loop with continue/break
echo "While sequence (skipping 3, breaking at 6): ";
$count = 1;
while ($count <= 10) {
    if ($count == 3) {
        $count++;
        continue; // Skip the rest of this loop iteration
    }
    if ($count == 6) {
        break; // Exit the loop entirely
    }
    echo $count . " ";
    $count++;
}
echo "\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a loop that sums all odd numbers between 1 and 25. Skip the number 13 using the \`continue\` keyword, and print the computed sum at the end.
  </div>
</div>
`;

// Lesson 6
lessonContents['arrays'] = `
<h1 class="page-title">Arrays (Indexed & Associative)</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>PHP arrays are highly flexible collections. They act as both indexed arrays and key-value associative arrays.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Indexed vs. Associative arrays</div>
  <p>PHP defines arrays using two structures:</p>
  <ul>
    <li><strong>Indexed Array</strong>: Accessed using numeric indexes: \`$fruits = ["Apple", "Banana"];\`.</li>
    <li><strong>Associative Array</strong>: Accessed using named keys, acting like hash maps: \`$user = ["name" =&gt; "Bob", "age" =&gt; 22];\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Array Operations</div>
  <p>Let's run a program declaring indexed and associative arrays, adding items dynamically, and iterating over their keys:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Arrays</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
// Indexed Array
$colors = ["Red", "Green", "Blue"];
$colors[] = "Yellow"; // Add element dynamically at end index

// Associative Array
$student = [
    "name" => "Alice",
    "gpa" => 3.8
];

echo "Second Color: " . $colors[1] . "\\n";

echo "Iterating Associative student keys:\\n";
foreach ($student as $key => $value) {
    echo $key . ": " . $value . "\\n";
}
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares an associative array mapping product names to prices. Write a foreach loop to print each product and its price.
  </div>
</div>
`;

// Lesson 7
lessonContents['functions'] = `
<h1 class="page-title">Functions & Type Hints</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Functions organize reusable logic blocks. In modern PHP, you can declare parameter and return types explicitly using type hints to enforce type safety.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Pass-by-Reference (&) and Type Hints</div>
  <p>Functions accept inputs and return values:</p>
  <ul>
    <li><strong>Pass-by-Reference (\`&amp;$x\`)</strong>: Prepending an ampersand to a parameter allows the function to modify the caller's variable directly.</li>
    <li><strong>Type Hints (PHP 7/8)</strong>: You can declare the data types of arguments and return values explicitly to prevent bugs: \`function add(int $a): int {}\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Functions Code</div>
  <p>Let's run a program illustrating functions, default arguments, and type hints:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Functions</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
// Function with type hints (PHP 7/8+)
function calculatePrice(float $price, float $taxRate = 0.08): float {
    return $price + ($price * $taxRate);
}

// Pass-by-reference using ampersand
function doubleValue(int &$number) {
    $number *= 2;
}

$total = calculatePrice(100.0);
echo "Total Price: $" . $total . "\\n";

$value = 25;
doubleValue($value);
echo "Doubled Value: " . $value . "\\n"; // Output is 50
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a method called \`divide\` with type hints that accepts two integers and returns a float. Add checks to return \`0.0\` if the divisor is zero.
  </div>
</div>
`;

// Lesson 8
lessonContents['oop-basics'] = `
<h1 class="page-title">OOP: Classes & Objects</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>PHP has a complete object-oriented programming model. In this lesson, we will look at classes, visibility modifiers, constructors, and instantiating objects.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Property Visibility & Constructors</div>
  <p>PHP classes group properties and methods. Properties can use visibility modifiers to control access: \`public\`, \`protected\`, or \`private\`. Constructors are defined using the special method name **\`__construct()\`**.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Classes Code</div>
  <p>Let's run a program declaring classes and instantiating objects:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Classes & Objects</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
class Car {
    public $model; // Public access
    private $year;  // Private access

    // Constructor
    public function __construct(string $model, int $year) {
        $this->model = $model; // '$this' references current instance (no '$' before property name)
        $this->year = $year;
    }

    public function showDetails() {
        echo "Model: " . $this->model . ", Year: " . $this->year . "\\n";
    }
}

// Instantiate object using 'new'
$myCar = new Car("Ford Mustang", 2022);
$myCar->showDetails();
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a class named \`Student\` with properties \`name\` and \`gpa\`. Add a constructor to initialize them, and a method called \`display\` to output their details.
  </div>
</div>
`;

// Lesson 9
lessonContents['oop-inheritance'] = `
<h1 class="page-title">OOP: Inheritance & Overriding</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Inheritance derives child classes from parent classes. PHP supports single inheritance and provides the parent scope resolution operator to invoke parent methods.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> parent:: Overriding & static bindings</div>
  <p>PHP subclasses inherit from parent classes using the **\`extends\`** keyword: \`class Child extends Parent\`. When overriding a parent method, you can invoke the parent class's original implementation using the scope resolution operator: **\`parent::method()\`**.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Inheritance Code</div>
  <p>Let's run a program demonstrating class inheritance, overrides, and invoking parent methods:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Inheritance</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
class Animal {
    public $name;

    public function __construct(string $name) {
        $this->name = $name;
    }

    public function makeNoise(): string {
        return "Generic animal sound";
    }
}

// Dog extends Animal
class Dog extends Animal {
    public function makeNoise(): string {
        // Call parent method
        return parent::makeNoise() . " - Woof! Woof!";
    }
}

$dog = new Dog("Buddy");
echo $dog->makeNoise() . "\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create a parent class called \`Vehicle\` and a child subclass called \`Truck\`. Override a method \`startEngine()\` in \`Truck\` that invokes parent checks first, then prints "Diesel roaring".
  </div>
</div>
`;

// Lesson 10
lessonContents['superglobals'] = `
<h1 class="page-title">HTTP Superglobals ($_GET, $_POST)</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Superglobals are built-in variables that are globally accessible in all scopes. They handle HTTP client requests and server parameters.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Query Strings ($_GET) vs. Request Payloads ($_POST)</div>
  <p>Common PHP superglobals include:</p>
  <ul>
    <li><strong>$_GET</strong>: Collects parameters sent via the URL query string (e.g. \`?id=5\`). Visible in the browser address bar.</li>
    <li><strong>$_POST</strong>: Collects parameters sent via HTTP POST requests (e.g. submitted HTML forms). Form data is hidden inside the request payload, making it secure for passwords.</li>
    <li><strong>$_SERVER</strong>: Stores server configuration parameters and headers, such as user agents and request methods.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Superglobals Code</div>
  <p>Let's look at an example illustrating superglobal properties:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Superglobals</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
// Simulating incoming HTTP context values inside arrays
$_GET['id'] = "105";
$_POST['username'] = "Balaji";

echo "GET parameter ID: " . $_GET['id'] . "\\n";
echo "POST parameter Username: " . $_POST['username'] . "\\n";
echo "Request Script Name: " . $_SERVER['SCRIPT_NAME'] . "\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script that checks if \`$_SERVER['REQUEST_METHOD']\` is equal to "POST". If it is, output the username parameter from \`$_POST\`; otherwise, print a warning message.
  </div>
</div>
`;

// Lesson 11
lessonContents['form-sanitization'] = `
<h1 class="page-title">Form Processing & XSS Protection</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Processing HTML forms is a core task in PHP. To prevent security vulnerabilities like Cross-Site Scripting (XSS), you must sanitize all user inputs before displaying them.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> XSS Attacks and htmlspecialchars() Sanitization</div>
  <p>If you output raw user input directly to an HTML page, attackers can inject malicious JavaScript code (a Cross-Site Scripting or XSS attack). To prevent this, always pass user inputs to **\`htmlspecialchars()\`**, which encodes characters like \`&lt;\` and \`&gt;\` into safe HTML entities (\`&amp;lt;\` and \`&amp;gt;\`), rendering the script harmlessly as text.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Sanitization Code</div>
  <p>Let's run a program demonstrating sanitization checks:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Sanitization</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
// Malicious script payload input by user
$userInput = "&lt;script&gt;alert('Hacked!');&lt;/script&gt;";

// Vulnerable output (executes script)
// echo "Unsafe: " . $userInput . "\\n";

// Secure output (renders harmlessly as plain text)
$safeOutput = htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');
echo "Safe: " . $safeOutput . "\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script validating if an input string is a valid email using \`filter_var()\` with the \`FILTER_VALIDATE_EMAIL\` constant. Print whether the check passed or failed.
  </div>
</div>
`;

// Lesson 12
lessonContents['sessions-cookies'] = `
<h1 class="page-title">Sessions & Cookies Management</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>HTTP is stateless. PHP uses cookies and sessions to store user data across multiple page loads.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Cookies (Client) vs. Sessions (Server)</div>
  <p>State management in PHP divides data storage between client and server:</p>
  <ul>
    <li><strong>Cookies</strong>: Data stored directly on the client's browser (e.g. tracking identifiers). Set using the \`setcookie()\` function. They are sent to the server automatically with every page request.</li>
    <li><strong>Sessions</strong>: Secure data stored on the web server (e.g. login credentials). Initiated using the **\`session_start()\`** function at the very top of the script. Values are stored inside the \`$_SESSION\` superglobal array.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Session Code</div>
  <p>Let's look at an example initializing sessions and setting cookies:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Sessions & Cookies</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
// Start the session (must be the first line of the script)
session_start();

// Store data in session
$_SESSION['user_id'] = 405;
$_SESSION['role'] = "Administrator";

echo "Session Started! User ID: " . $_SESSION['user_id'] . "\\n";

// Set a cookie (expires in 1 hour)
setcookie("theme", "dark", time() + 3600, "/");
echo "Theme Cookie initialized.\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script that checks if a session variable exists using the \`isset()\` function. If it does, print its value; otherwise, initialize it with a default value.
  </div>
</div>
`;

// Lesson 13
lessonContents['database-pdo'] = `
<h1 class="page-title">Database Security & PDO</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>PHP Data Objects (PDO) is a database access layer that provides a secure, consistent interface to communicate with databases in PHP.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Prepared Statements and SQL Injection protection</div>
  <p>Interpolating variables directly into raw SQL strings makes your database vulnerable to SQL Injection attacks. PDO prevents this using **Prepared Statements**. The database compiles the SQL query structure first, and then binds parameters separately as values, rendering SQL injection payloads completely harmless.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> PDO Code</div>
  <p>Let's look at a connection template illustrating prepared statements:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Database Access via PDO</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
// PDO Connection Template
try {
    $dsn = "mysql:host=localhost;dbname=testdb;charset=utf8";
    $pdo = new PDO($dsn, "username", "password", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // Secure Prepared Statement query execution
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => 'balaji@example.com']);
    $user = $stmt->fetch();

    echo "Query completed safely!\\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\\n";
}
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a PDO code snippet that prepares an INSERT statement to add a new product to a database. Specify placeholders (\`:name\` and \`:price\`) and bind their values.
  </div>
</div>
`;

// Lesson 14
lessonContents['exceptions'] = `
<h1 class="page-title">Exception Handling (try-catch)</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Exceptions capture runtime errors gracefully, allowing you to handle failures without crashing your application.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Try-Catch-Finally Blocks & Throwing Exceptions</div>
  <p>PHP exception handling follows standard execution flows:</p>
  <ul>
    <li><strong>try</strong>: Wraps code blocks that may fail.</li>
    <li><strong>catch</strong>: Intercepts and handles errors if they occur.</li>
    <li><strong>finally</strong>: Executes cleanup code after try/catch, regardless of whether an error was thrown.</li>
    <li><strong>throw</strong>: Manually triggers exceptions using \`throw new Exception("Message");\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Exceptions Code</div>
  <p>Let's run a program handling a division-by-zero error using try-catch blocks:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — Exception Handling</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
function checkDivisor(int $number) {
    if ($number == 0) {
        throw new Exception("Division by zero error.");
    }
    return 100 / $number;
}

try {
    echo "Result: " . checkDivisor(5) . "\\n";
    echo "Result: " . checkDivisor(0) . "\\n"; // Throws exception
} catch (Exception $e) {
    echo "Exception Intercepted: " . $e->getMessage() . "\\n";
} finally {
    echo "Finally execution block completed.\\n";
}

echo "Program continues execution smoothly...\\n";
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom function called \`checkAge\` that throws an \`InvalidArgumentException\` if age parameter is negative. Catch the exception inside a try-catch block and print its details.
  </div>
</div>
`;

// Lesson 15
lessonContents['files'] = `
<h1 class="page-title">File System Operations</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>PHP provides powerful functions to read, write, and manage files on the web server's storage drive.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Reading, Writing & Verifying File states</div>
  <p>PHP provides convenient functions to read and write files directly in a single line, making it easy to manage files on the server:</p>
  <ul>
    <li><strong>file_put_contents()</strong>: Writes a string to a file, creating the file if it does not exist.</li>
    <li><strong>file_get_contents()</strong>: Reads the entire contents of a file into a string.</li>
    <li><strong>file_exists()</strong>: Verifies if a file exists on the server before trying to read it, preventing runtime errors.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> File Operations Code</div>
  <p>Let's run a program writing text to a file, verifying its existence, and reading it back:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">PHP — File Operations</span>
      <a class="try-btn" href="/?lang=php">▶ Run Code</a>
    </div>
    <pre><code>&lt;?php
$file = "demo.txt";

// Write content to file
file_put_contents($file, "PHP File operations are simple and elegant!");

// Verify file exists before reading
if (file_exists($file)) {
    $content = file_get_contents($file);
    echo "File Content: " . $content . "\\n";
} else {
    echo "Error: File does not exist!\\n";
}
?&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script that appends a log entry to a file named \`log.txt\` using the \`FILE_APPEND\` flag inside \`file_put_contents()\`. Read and print the file to verify the entry was appended.
  </div>
</div>
`;

// Build lessons
console.log('Starting PHP lesson generation...');

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

// Generate main index page: blog-php.html
const indexContent = `
<h1 class="page-title">PHP Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">🐘 PHP</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>PHP is an exceptionally popular, dynamically-typed server-side scripting language designed for web development. Powering major content systems and global sites, PHP integrates server processing and database connections securely. In this comprehensive guide, you will master PHP variables syntax, double-quote parsing interpolation, null coalescing operators, foreach associative arrays, type hints functions, OOP constructor properties, method overrides, superglobals context, XSS form sanitization, cookies session scopes, secure PDO prepared SQL statements, try-catch exception handling, and file system write/read options.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning PHP:</p>
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
  'PHP Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-php.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-php.html');
console.log('🎉 Successfully generated all 15 PHP tutorial files inside blog-php/ folder!');
