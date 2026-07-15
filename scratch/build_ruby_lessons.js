const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const rubyBlogDir = path.join(publicDir, 'blog-ruby');

// Ensure directory exists
if (!fs.existsSync(rubyBlogDir)) {
  fs.mkdirSync(rubyBlogDir, { recursive: true });
}

// Ruby Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-ruby/intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Scope', filename: 'blog-ruby/variables.html' },
  { slug: 'types-interpolation', num: 3, title: 'Data Types & Interpolation', filename: 'blog-ruby/types-interpolation.html' },
  { slug: 'conditionals', num: 4, title: 'Conditionals (if, unless & case)', filename: 'blog-ruby/conditionals.html' },
  { slug: 'loops', num: 5, title: 'Loops & Iterators', filename: 'blog-ruby/loops.html' },
  { slug: 'arrays', num: 6, title: 'Arrays & Array Methods', filename: 'blog-ruby/arrays.html' },
  { slug: 'hashes', num: 7, title: 'Hashes (Key-Value Mappings)', filename: 'blog-ruby/hashes.html' },
  { slug: 'methods', num: 8, title: 'Methods & Implicit Returns', filename: 'blog-ruby/methods.html' },
  { slug: 'blocks-lambdas', num: 9, title: 'Blocks, Procs & Lambdas', filename: 'blog-ruby/blocks-lambdas.html' },
  { slug: 'oop-basics', num: 10, title: 'OOP: Classes & Objects', filename: 'blog-ruby/oop-basics.html' },
  { slug: 'oop-attributes', num: 11, title: 'OOP: Attributes (attr_accessor)', filename: 'blog-ruby/oop-attributes.html' },
  { slug: 'oop-inheritance', num: 12, title: 'OOP: Inheritance & Super', filename: 'blog-ruby/oop-inheritance.html' },
  { slug: 'modules-mixins', num: 13, title: 'Modules & Mixins', filename: 'blog-ruby/modules-mixins.html' },
  { slug: 'exceptions', num: 14, title: 'Exception Handling (begin-rescue)', filename: 'blog-ruby/exceptions.html' },
  { slug: 'files', num: 15, title: 'File I/O & Block Closures', filename: 'blog-ruby/files.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Ruby Tutorial</div>\n`;
  html += `    <a href="/blog-ruby.html"${activeSlug === 'home' ? ' class="active"' : ''}>Ruby HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=ruby">▶ Try Ruby Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-c.html">C</a>\n`;
  html += `    <a href="/blog-cpp.html">C++</a>\n`;
  html += `    <a href="/blog-csharp.html">C#</a>\n`;
  html += `    <a href="/blog-go.html">Go</a>\n`;
  html += `    <a href="/blog-rust.html">Rust</a>\n`;
  html += `    <a href="/blog-php.html">PHP</a>\n`;
  
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
    navFooter += `      <a href="/blog-ruby.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Ruby Overview</span>\n`;
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
  <meta name="description" content="Learn Ruby — ${title} with clear explanations, custom blocks, object attributes, and interactive compiler executions." />
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
              const langId = urlParams.get('lang') || 'ruby';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-ruby">

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
  <a href="/blog-ruby.html" class="active">Ruby</a>
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
      <a href="/blog-ruby.html">Ruby</a><span>›</span>
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
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity. Created in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan, its design philosophy centers on user-friendly execution and making developers happy.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Interpretive Execution Model</div>
  <p>Ruby is a dynamically-typed, interpreted scripting language. The Ruby interpreter reads and executes source code directly, enabling fast iteration cycles. Ruby forms the backend of the powerful model-view-controller web framework **Ruby on Rails**.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing Hello World: puts vs print</div>
  <p>Let's run a classic Hello World script in Ruby. Note how simple the syntax is compared to compiled languages:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Hello World</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>puts "Hello, World!"
print "Welcome to "
print "Our Ruby Compiler!\\n"</code></pre>
  </div>

  <p>Let's examine output utilities:</p>
  <ul>
    <li><strong>puts</strong>: Outputs text and automatically appends a newline at the end.</li>
    <li><strong>print</strong>: Outputs text without appending a newline, keeping the console cursor on the same line.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code block in the editor. Use the \`p\` command to output a string (e.g. \`p "Test"\`). Observe how \`p\` prints the raw representation of objects, including surrounding quotes, which is highly useful for debugging.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables & Scope</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>In Ruby, variable scope is determined by prefix naming conventions. Type declaration keywords are not required; variable types are resolved dynamically at runtime.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Scope Prefixes & Constants</div>
  <p>Ruby manages scopes using naming prefixes:</p>
  <ul>
    <li><strong>Local Variable (\`age\`)</strong>: Declared with lowercase characters. Only accessible inside its declaring function or block.</li>
    <li><strong>Instance Variable (\`@age\`)</strong>: Prefixed with a single \`@\`. Accessible across methods inside a class instance.</li>
    <li><strong>Class Variable (\`@@count\`)</strong>: Prefixed with a double \`@@\`. Shared across all instances of a class.</li>
    <li><strong>Global Variable (\`$debug\`)</strong>: Prefixed with a \`$\`. Accessible from anywhere in the application.</li>
    <li><strong>Constants (\`PI\`)</strong>: Start with an **uppercase letter**. Ruby will warning you if you try to reassign a constant, but will still allow the program to run.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Variables Code</div>
  <p>Let's run a program declaring local variables, globals, and constants:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Variables</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code># Local variables
name = "Balaji"
age = 22

# Constant declaration (starts with capital letter)
GRAVITY = 9.8

# Global variable
$app_mode = "Production"

puts "Name: #{name}"
puts "Constant Gravity: #{GRAVITY}"
puts "Global Mode: #{$app_mode}"</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script that declares a constant. Try to reassign a new value to it and print it. Check the output in the compiler to see the warning message Ruby outputs.
  </div>
</div>
`;

// Lesson 3
lessonContents['types-interpolation'] = `
<h1 class="page-title">Data Types & Interpolation</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Ruby is a purely object-oriented language. Every data type, including primitive numbers and strings, is an object containing built-in methods.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> String Interpolation & Symbols</div>
  <p>Ruby provides unique data types:</p>
  <ul>
    <li><strong>String Interpolation (\`#{"\#{expr}"}\`)</strong>: Double-quoted strings evaluate embedded code sequences wrapped in curly braces. Single-quoted strings do not perform evaluation and treat characters as literals.</li>
    <li><strong>Symbols (\`:my_symbol\`)</strong>: Immutable, reusable string-like identifiers. Unlike strings, only one instance of a symbol exists in memory, making them excellent for hash keys.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Type Interpolation Code</div>
  <p>Let's run a program exploring double-quoted evaluations and Symbols comparison:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Data Types</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>item = "book"
price = 14.99

# Double quotes process interpolation
puts "The #{item} costs $#{price}"

# Symbols demo
status_ok = :ok
status_err = :error

puts "Symbol type: #{status_ok.class}"
puts "Comparing symbol IDs: #{:ok.object_id == :ok.object_id}"
puts "Comparing string IDs: #{"ok".object_id == "ok".object_id}"</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Declare a string in single quotes and another in double quotes, both containing a variable interpolation sequence. Print both strings to verify the difference.
  </div>
</div>
`;

// Lesson 4
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if, unless & case)</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control the branch paths of execution based on boolean checks. Ruby provides clean readability options like the unless keyword and statement modifiers.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Unless Keywords & Statement Modifiers</div>
  <p>Ruby conditionals include readability-focused enhancements:</p>
  <ul>
    <li><strong>unless Statement</strong>: The exact opposite of an \`if\` statement. Executes code blocks only if a condition evaluates to **false**: \`unless user.logged_in? { login }\`.</li>
    <li><strong>Statement Modifier Shorthand</strong>: You can append conditionals to the end of a single-line expression to write cleaner, more readable code: \`puts "Welcome" if user.admin?\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Conditional Codes</div>
  <p>Let's run a program evaluating conditions and checking unless clauses:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Conditionals</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>score = 85

# Standard if-elsif structure
if score >= 90
  puts "Grade: A"
elsif score >= 80
  puts "Grade: B"
else
  puts "Grade: F"
end

# Unless clause
is_admin = false
unless is_admin
  puts "Access restricted to admins!"
end

# Statement Modifier
is_member = true
puts "Discount Applied!" if is_member</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a script using a \`case\` statement (with \`when\` and \`else\`) that evaluates an integer rating (1-5) and outputs descriptive feedback for each score.
  </div>
</div>
`;

// Lesson 5
lessonContents['loops'] = `
<h1 class="page-title">Loops & Iterators</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Ruby provides standard loops, until loops, and block-based numerical iterators like <code>times</code>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Iterators vs. Standard Loops</div>
  <p>While Ruby supports standard \`while\` loops, idiomatic Ruby code prefers **block iterators** like \`times\`, \`upto\`, and \`step\`, which take closures to iterate safely and cleanly:</p>
  <ul>
    <li>\`until\`: Loop executes as long as a condition is **false** (opposite of while).</li>
    <li>\`times\`: Repeats a block a specific number of times: \`5.times { |i| puts i }\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Loops Code</div>
  <p>Let's run a program illustrating loops, until statements, and times iterators:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Loops</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code># 1. Until loop (runs until condition is true)
count = 1
print "Until loop: "
until count > 5
  print "#{count} "
  count += 1
end
puts

# 2. Block-based Times iterator
print "Times iterator: "
3.times do |index|
  print "Count:#{index} "
end
puts

# 3. Upto iterator
print "Upto loop: "
1.upto(4) { |num| print "#{num} " }
puts</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an iterator sequence using \`downto\` that counts down from 5 to 1 and outputs a final message.
  </div>
</div>
`;

// Lesson 6
lessonContents['arrays'] = `
<h1 class="page-title">Arrays & Array Methods</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Ruby arrays are ordered, dynamically sized collections. They are highly flexible and can store multiple different data types simultaneously.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Dynamic Lists & Array Operations</div>
  <p>Ruby arrays expand automatically and provide powerful list manipulation methods out-of-the-box: push, pop, shift, and unshift.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Array Operations Code</div>
  <p>Let's run a program managing list items and sorting values:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Arrays</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code># Declare array
items = ["Apple", "Banana", "Cherry"]

# Dynamic push
items << "Orange"
items.push("Peach")

# Array slicing [start, count]
subset = items[1, 2] # "Banana", "Cherry"

puts "Original Array: #{items.inspect}"
puts "Subset: #{subset.inspect}"
puts "Array length: #{items.length}"
puts "Sorted Array: #{items.sort.inspect}"</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares a numerical array. Use array methods to delete duplicate values, sort it in descending order, and print the modified array.
  </div>
</div>
`;

// Lesson 7
lessonContents['hashes'] = `
<h1 class="page-title">Hashes (Key-Value Mappings)</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Hashes store data in key-value pairs. In modern Ruby, symbols are preferred as keys to optimize memory efficiency.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Rocket Syntax vs. Symbol Key Shorthands</div>
  <p>Ruby hashes support two key syntaxes:</p>
  <ul>
    <li><strong>Rocket Syntax (\`=&gt;\`)</strong>: Traditional syntax. Can use any object type as keys: \`:name =&gt; "Bob"\`.</li>
    <li><strong>Symbol Shorthand Syntax</strong>: Modern syntax. Syntactically cleaner and automatically processes keys as symbols: \`name: "Bob"\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Hash Operations Code</div>
  <p>Let's run a program declaring hashes, accessing values, and deleting keys:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Hashes</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code># Modern Symbol key shorthand syntax
student = {
  name: "Alice",
  age: 21,
  gpa: 3.8
}

puts "Student Name: #{student[:name]}" # Accessed using symbol
puts "Keys in Hash: #{student.keys}"

# Fetch with default fallback
rating = student.fetch(:rating, "No Rating Available")
puts "Rating: #{rating}"

# Delete key
student.delete(:age)
puts "Updated Hash: #{student.inspect}"</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that stores product items and prices in a hash. Write a loop to iterate through the hash, printing each product name and its price.
  </div>
</div>
`;

// Lesson 8
lessonContents['methods'] = `
<h1 class="page-title">Methods & Implicit Returns</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Methods modularize code blocks. Ruby methods support default parameters, named keyword arguments, and implicit return values.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Explicit vs. Implicit Returns</div>
  <p>In Ruby, **the return keyword is optional**. A method automatically returns the value of the last evaluated statement in its body. This makes Ruby code exceptionally clean and concise.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Parameter Configurations Code</div>
  <p>Let's run a program illustrating methods, default arguments, and implicit returns:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Methods</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code># Method with default arguments & implicit return (no 'return' keyword needed)
def calculate_price(price, tax_rate = 0.08)
  price + (price * tax_rate) # Last statement is returned automatically
end

# Keyword arguments
def print_user(name:, role: "Guest")
  puts "User: #{name}, Role: #{role}"
end

final_price = calculate_price(100.0)
puts "Total Price: $#{final_price}"

print_user(name: "Charlie")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a method called \`is_even?\` that accepts an integer and implicitly returns \`true\` or \`false\`. Note that idiomatic Ruby methods returning booleans end with a question mark.
  </div>
</div>
`;

// Lesson 9
lessonContents['blocks-lambdas'] = `
<h1 class="page-title">Blocks, Procs & Lambdas</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Ruby closures are implemented using Blocks, Procs, and Lambdas, allowing you to pass code snippets to methods as parameters.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> yield, Procs, and Lambdas Visibility differences</div>
  <p>Ruby provides three closure models:</p>
  <ul>
    <li><strong>Block</strong>: Passed to methods implicitly, and executed using the **\`yield\`** keyword.</li>
    <li><strong>Proc</strong>: Saved block objects. Procs do not validate parameter counts, and writing \`return\` inside a Proc exits the enclosing method immediately.</li>
    <li><strong>Lambda</strong>: Strict block objects. Lambdas validate parameter counts explicitly, and writing \`return\` inside a lambda exits only the lambda itself.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Closures Code</div>
  <p>Let's run a program demonstrating yield operations, Procs, and Lambdas:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Closures & Blocks</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code># 1. Method with yield block
def execute_block
  puts "Inside method"
  yield if block_given?
  puts "Exiting method"
end

execute_block { puts "--- Inside block ---" }

# 2. Proc vs Lambda
my_proc = Proc.new { |x, y| puts "Proc parameters: #{x}, #{y}" }
my_proc.call(10) # Ignores missing y parameter smoothly

my_lambda = ->(x, y) { puts "Lambda parameters: #{x}, #{y}" }
# my_lambda.call(10) # Throws ArgumentError! Requires exactly 2 parameters
my_lambda.call(10, 20)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a method called \`perform_math\` that yields two numbers to a block. Invoke the method with a block that multiplies the two numbers, and again with a block that adds them.
  </div>
</div>
`;

// Lesson 10
lessonContents['oop-basics'] = `
<h1 class="page-title">OOP: Classes & Objects</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Ruby is purely object-oriented: everything, including integers and string values, is an object. Classes act as templates to instantiate objects.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Instantiation and the initialize method</div>
  <p>Classes in Ruby encapsulate states and behaviors. Objects are created using the \`new\` constructor method, which automatically invokes the class's **\`initialize\`** method, acting as the constructor.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Classes Code</div>
  <p>Let's run a program declaring classes and instantiating objects:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Classes & Objects</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>class Student
  # Constructor method
  def initialize(name, age)
    @name = name # Instance variables start with '@'
    @age = age
  end

  def print_details
    puts "Student: #{@name}, Age: #{@age}"
  end
end

# Instantiate using new
s1 = Student.new("Alice", 21)
s1.print_details</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a class named \`Car\` with an constructor that accepts \`brand\` and \`year\`. Expose a method called \`drive\` that prints a message indicating the car is driving.
  </div>
</div>
`;

// Lesson 11
lessonContents['oop-attributes'] = `
<h1 class="page-title">OOP: Attributes (attr_accessor)</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Instance variables inside Ruby objects are strictly private by default. In this lesson, we will look at how to expose properties using getters, setters, and attr_accessor shorthand.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Getter/Setter shorthands: attr_reader, attr_writer, attr_accessor</div>
  <p>Rather than writing verbose getter and setter methods manually, Ruby provides three clean attribute helper methods:</p>
  <ul>
    <li><strong>attr_reader</strong>: Automatically generates read-only getter methods.</li>
    <li><strong>attr_writer</strong>: Automatically generates write-only setter methods.</li>
    <li><strong>attr_accessor</strong>: Automatically generates both getter and setter methods.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Attribute Accessors Code</div>
  <p>Let's run a program declaring classes and instantiating objects using attr_accessor properties:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Attributes</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>class Account
  # Generates getter and setter for owner and balance
  attr_accessor :owner, :balance

  def initialize(owner, balance)
    @owner = owner
    @balance = balance
  end
end

acc = Account.new("Bob", 500.0)
acc.balance = 700.0 # Invokes automatic setter

puts "Owner: #{acc.owner}"
puts "Balance: $#{acc.balance}"</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an \`Employee\` class. Make \`name\` read-only (using \`attr_reader\`) and \`salary\` readable and writable (using \`attr_accessor\`). Test your design by instantiating it and trying to edit both properties.
  </div>
</div>
`;

// Lesson 12
lessonContents['oop-inheritance'] = `
<h1 class="page-title">OOP: Inheritance & Super</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Inheritance derived child subclasses from parent base classes. Ruby supports single inheritance and provides the super keyword to invoke parent methods.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Overrides & Constructor Chaining using super</div>
  <p>In Ruby, subclasses inherit from parent classes using the **\`&lt;\`** symbol: \`class Sub &lt; Parent\`. When overriding a parent method, you can invoke the parent class's original implementation by calling **\`super\`**.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Inheritance Code</div>
  <p>Let's run a program demonstrating class inheritance, overrides, and invoking parent methods with super:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Inheritance</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>class Animal
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def speak
    "Generic animal sound"
  end
end

# Dog inherits from Animal
class Dog < Animal
  def speak
    # Call parent method, append child implementation details
    super + " - Woof! Woof!"
  end
end

dog = Dog.new("Buddy")
puts dog.speak</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a parent class called \`Vehicle\` and a child subclass called \`Truck\`. Override a method \`drive\` in \`Truck\` that invokes \`super\` to print the parent message first, followed by a custom truck message.
  </div>
</div>
`;

// Lesson 13
lessonContents['modules-mixins'] = `
<h1 class="page-title">Modules & Mixins</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Ruby classes can only inherit from a single parent class. To achieve multiple inheritance, Ruby provides Modules and Mixins.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Mixins vs Namespaces (include vs extend)</div>
  <p>Modules wrap reusable methods and constants. Unlike classes, modules cannot be instantiated. They have two primary use cases:</p>
  <ul>
    <li><strong>Namespaces</strong>: Groups related classes to prevent naming collisions.</li>
    <li><strong>Mixins</strong>: Injects module methods directly into a class using the **\`include\`** keyword (methods act as instance methods) or **\`extend\`** keyword (methods act as class methods), implementing clean multiple inheritance.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Mixins Code</div>
  <p>Let's run a program defining modules and mixing their methods into classes:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Modules and Mixins</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>module Flyable
  def fly
    "I am flying high!"
  end
end

module Swimmable
  def swim
    "I am swimming fast!"
  end
end

class Duck
  # Mixin both modules to achieve multiple inheritance
  include Flyable
  include Swimmable
end

donald = Duck.new
puts donald.fly
puts donald.swim</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create a module called \`Loggable\` with a method \`log(message)\` that prints a timestamped message. Include the module in a class called \`Database\` and invoke the \`log\` method.
  </div>
</div>
`;

// Lesson 14
lessonContents['exceptions'] = `
<h1 class="page-title">Exception Handling (begin-rescue)</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Exceptions are runtime errors. Ruby captures exceptions using begin-rescue blocks, keeping applications running smoothly when errors occur.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> begin, rescue, and ensure execution cycles</div>
  <p>Ruby exception handling uses its own naming syntax:</p>
  <ul>
    <li><strong>begin</strong>: Wraps code blocks that may fail.</li>
    <li><strong>rescue</strong>: Catches thrown errors (equivalent of catch).</li>
    <li><strong>ensure</strong>: Executes cleanup code, running regardless of whether an error was raised (equivalent of finally).</li>
    <li><strong>raise</strong>: Manually triggers exceptions.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Exceptions Code</div>
  <p>Let's run a program handling a division-by-zero error using rescue blocks:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — Exceptions</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>begin
  x = 10
  y = 0
  result = x / y # Throws ZeroDivisionError
rescue ZeroDivisionError => e
  puts "Error Intercepted: division by zero is invalid."
  puts "Details: #{e.message}"
ensure
  puts "Ensure block executed. Cleaning up streams..."
end

puts "Program execution continues smoothly..."</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom method that raises an \`ArgumentError\` if an input parameter score is outside the range 0-100. Write a begin-rescue block to call this method with an invalid argument and handle the error.
  </div>
</div>
`;

// Lesson 15
lessonContents['files'] = `
<h1 class="page-title">File I/O & Block Closures</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Ruby provides powerful tools to interact with storage drives. By combining file streams with blocks, Ruby ensures resource handles are closed automatically.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Auto-Closing Streams via blocks</div>
  <p>Failing to close file handles causes resource lock errors. When you open files in Ruby using a block: \`File.open(path, 'w') do |f| ... end\`, Ruby automatically closes and releases the file handle when the block exits, guaranteeing safety even if exceptions occur.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> File Operations Code</div>
  <p>Let's run a program writing text to a file and reading it back using block-based File streams:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Ruby — File Operations</span>
      <a class="try-btn" href="/?lang=ruby">▶ Run Code</a>
    </div>
    <pre><code>path = "demo.txt"

# Open file with block for automatic closing
File.open(path, "w") do |file|
  file.puts "Ruby File operations are simple and elegant!"
  file.puts "Block closures handle file closing automatically."
end # File handles are closed automatically here

# Read file contents
content = File.read(path)
puts "File Content:\\n#{content}"</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that writes three numbers to a file named \`numbers.txt\`. Open the file, read the numbers line-by-line, parse them as integers, and print their computed sum. Ensure you use block-based opening.
  </div>
</div>
`;

// Build lessons
console.log('Starting Ruby lesson generation...');

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

// Generate main index page: blog-ruby.html
const indexContent = `
<h1 class="page-title">Ruby Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">💎 Ruby</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Ruby is a purely object-oriented, dynamically-typed interpreted scripting language created by Yukihiro "Matz" Matsumoto. Focused on user-friendly execution and developer happiness, Ruby combines extreme readability with powerful constructs. In this comprehensive guide, you will master Ruby variable scope levels, string interpolation, symbol structures, unless checks,times loop iterators, dynamic arrays, hash symbols shortcuts, implicit return methods, yield block closures, object attribute accessors, mixin multiple inheritance modules, begin-rescue exception handlers, and auto-disposable file structures.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Ruby:</p>
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
  'Ruby Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-ruby.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-ruby.html');
console.log('🎉 Successfully generated all 15 Ruby tutorial files inside blog-ruby/ folder!');
