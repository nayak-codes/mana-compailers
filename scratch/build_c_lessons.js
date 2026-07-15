const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// C Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-c-intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Primitive Types', filename: 'blog-c-variables.html' },
  { slug: 'operators', num: 3, title: 'Operators & Expressions', filename: 'blog-c-operators.html' },
  { slug: 'conditionals', num: 4, title: 'Conditionals (if-else & switch)', filename: 'blog-c-conditionals.html' },
  { slug: 'loops', num: 5, title: 'Loops & Control Flow', filename: 'blog-c-loops.html' },
  { slug: 'arrays', num: 6, title: 'Arrays (Single & Multi)', filename: 'blog-c-arrays.html' },
  { slug: 'pointers-basics', num: 7, title: 'Pointers: Basics & Memory', filename: 'blog-c-pointers-basics.html' },
  { slug: 'pointers-advanced', num: 8, title: 'Pointers: Arithmetic & Arrays', filename: 'blog-c-pointers-advanced.html' },
  { slug: 'functions', num: 9, title: 'Functions & Parameter Passing', filename: 'blog-c-functions.html' },
  { slug: 'strings', num: 10, title: 'Strings & String Library', filename: 'blog-c-strings.html' },
  { slug: 'structures', num: 11, title: 'Structures (struct) & Arrow', filename: 'blog-c-structures.html' },
  { slug: 'unions-enums', num: 12, title: 'Unions & Enumerations (enum)', filename: 'blog-c-unions-enums.html' },
  { slug: 'dynamic-memory', num: 13, title: 'Dynamic Memory (malloc/free)', filename: 'blog-c-dynamic-memory.html' },
  { slug: 'files', num: 14, title: 'File Input & Output (I/O)', filename: 'blog-c-files.html' },
  { slug: 'preprocessor', num: 15, title: 'Preprocessor Directives', filename: 'blog-c-preprocessor.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">C Tutorial</div>\n`;
  html += `    <a href="/blog-c.html"${activeSlug === 'home' ? ' class="active"' : ''}>C HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=c">▶ Try C Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
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
    navFooter += `      <a href="/blog-c.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← C Overview</span>\n`;
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
  <meta name="description" content="Learn C Programming — ${title} with clear explanations, code blocks, memory diagrams, pointers, and interactive compiler runs." />
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
              const langId = urlParams.get('lang') || 'c';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-c">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html" class="active">C</a>
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
      <a href="/blog-c.html">C</a><span>›</span>
      <span>Lesson ${slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num}</span>
    </div>
    
    ${mainContent}
    
    ${navFooter}
  </main>
</div>
</body>
</html>`;
}

// Complete C lesson contents
const lessonContents = {};

// Lesson 1
lessonContents['intro'] = `
<h1 class="page-title">Welcome & Hello World</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>C is a powerful, general-purpose programming language developed by Dennis Ritchie at Bell Labs in 1972. It is highly valued for its performance, direct hardware interaction, and serves as the foundation for modern operating systems (Linux, macOS, Windows) and compilation frameworks.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> How C Compiles & Runs</div>
  <p>C is a **compiled** language. Unlike Python or Java which run inside interpreters or virtual environments, your C source code is compiled directly into raw machine instructions for execution:</p>
  <p><strong>The Compilation Pipeline:</strong></p>
  <ul>
    <li><strong>Preprocessor</strong>: Parses directives starting with \`#\` (e.g. \`#include\`), substituting macro macros and source expansions.</li>
    <li><strong>Compiler</strong>: Translates clean C source files into assembly listings.</li>
    <li><strong>Assembler</strong>: Translates assembly listings into relocatable object files (\`.obj\` or \`.o\`).</li>
    <li><strong>Linker</strong>: Combines object files and systems libraries into a single final executable binary (\`.exe\` or run format).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Your First C Program</div>
  <p>Let's analyze a standard C Hello World template. Write and compile this in the editor:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Hello World</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to Our C Compiler!\\n");
    return 0;
}</code></pre>
  </div>

  <p>Let's break down the directives and statements:</p>
  <ul>
    <li><strong>#include &lt;stdio.h&gt;</strong>: A preprocessor directive instructing C to include standard input-output header declarations containing function definitions like \`printf()\`.</li>
    <li><strong>int main()</strong>: The entry function signature of every executable C program. The operating system looks for this to start execution.</li>
    <li><strong>printf()</strong>: Built-in library function used to print formatted text outputs to the console.</li>
    <li><strong>\\n</strong>: Newline escape sequence that shifts the cursor down to the next row.</li>
    <li><strong>return 0</strong>: Returns control to the operating system. Returning \`0\` signals successful, error-free program execution.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code in the editor above. Add a third statement printing out your name, and utilize a tab escape sequence (\`\\t\`) before printing it. Compile and execute to check the output.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables & Primitive Types</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>C is a statically-typed language. Every variable must have an declared data type specifying the exact layout size of memory to allocate for it on stack registers.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Core Primitive Types & Specifiers</div>
  <p>The standard primitives in C are basic numerical blocks:</p>
  <table class="tbl">
    <tr><th>Type</th><th>Typical Size</th><th>Format Specifier</th><th>Description</th></tr>
    <tr><td><strong>char</strong></td><td>1 byte</td><td>\`%c\`</td><td>Single ASCII character</td></tr>
    <tr><td><strong>int</strong></td><td>4 bytes</td><td>\`%d\` or \`%i\`</td><td>Integer numerical values</td></tr>
    <tr><td><strong>float</strong></td><td>4 bytes</td><td>\`%f\`</td><td>Single-precision floating points</td></tr>
    <tr><td><strong>double</strong></td><td>8 bytes</td><td>\`%lf\`</td><td>Double-precision floating points (default decimal representation)</td></tr>
  </table>
  <p><strong>Qualifiers:</strong> You can modify ranges using qualifiers like \`short\`, \`long\`, \`long long\`, or \`unsigned\` (which handles positive values only, doubling the positive range capacity):</p>
  <ul>
    <li>\`unsigned int score = 5000;\` (Does not store negative values)</li>
    <li>\`long long bankBalance = 99999999999LL;\` (Utilizes format specifier \`%lld\`)</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Declaration, Initialization, & Specifiers</div>
  <p>Let's run a program declaring different C types and printing them out with their matching formatting parameters:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Data Types & Specifiers</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    char grade = 'A';
    int score = 95;
    float temp = 98.6f;
    double pi = 3.1415926535;
    unsigned int id = 452291;

    // Formatting output using placeholder parameters
    printf("Grade: %c\\n", grade);
    printf("Score: %d\\n", score);
    
    // Controlling decimal precision formatting
    printf("Temperature (default): %f\\n", temp);
    printf("Temperature (2 decimals): %.2f\\n", temp);
    printf("Pi (8 decimals): %.8lf\\n", pi);
    printf("Unsigned ID: %u\\n", id);

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that calculates the area of a circle with a radius of \`5.5\`. Define radius and area as \`double\` variables, use \`3.14159\` as pi, compute the area, and print the output formatted to exactly 4 decimal places.
  </div>
</div>
`;

// Lesson 3
lessonContents['operators'] = `
<h1 class="page-title">Operators & Expressions</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Operators perform mathematical and logical changes on data variables. In C, understanding division limits and prefix vs postfix increments is essential.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Arithmetic, Relational, and Logical Operators</div>
  <p>C operators include:</p>
  <ul>
    <li><strong>Arithmetic</strong>: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulus).</li>
    <li><strong>Relational</strong>: \`==\`, \`!=\`, \`&gt;\`, \`&lt;\`, \`&gt;=\`, \`&lt;=\`.</li>
    <li><strong>Logical</strong>: \`&&\` (AND), \`||\` (OR), \`!\` (NOT) with short-circuit rules.</li>
  </ul>
  <blockquote>
    <strong>⚠️ Integer Division Trap:</strong> Just like Java, dividing two integers in C yields a truncated integer quotient. For instance, \`7 / 2\` evaluates to \`3\`. To retrieve the decimal value, use type-casting: \`(double)7 / 2\` yields \`3.5\`.
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Increment Placement Tracing</div>
  <p>The increment operator (\`++\`) increases a variable's value by 1. Placement dictates execution order:</p>
  <ul>
    <li><strong>Postfix (\`x++\`)</strong>: Yields the original value of \`x\` in the expression, then increments \`x\`.</li>
    <li><strong>Prefix (\`++x\`)</strong>: Increments \`x\` first, then evaluates the expression.</li>
  </ul>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Arithmetic and Increments</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    int val = 5;
    
    // Division types
    printf("Integer division (5 / 2): %d\\n", 5 / 2);
    printf("Cast division ((double)5 / 2): %.1lf\\n", (double)5 / 2);

    // Prefix vs Postfix execution
    int postfix = val++; // postfix gets 5, val becomes 6
    printf("Postfix assignment: postfix=%d, val=%d\\n", postfix, val);

    val = 5; // Reset
    int prefix = ++val; // val becomes 6, prefix gets 6
    printf("Prefix assignment: prefix=%d, val=%d\\n", prefix, val);

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that defines three test scores as integers (e.g. 85, 90, 78). Compute their average. Use double casting to ensure the final average retains decimal accuracy, and print it to the screen.
  </div>
</div>
`;

// Lesson 4
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & switch)</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals execute specific code pathways depending on whether boolean parameters resolve to true or false. In C, any non-zero value represents true, and zero represents false.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> True and False in C (Truthy vs Falsy)</div>
  <p>C historically does not have a native primitive boolean type (though \`&lt;stdbool.h&gt;\` was added in C99). Instead, C evaluates conditions numerically:</p>
  <ul>
    <li><strong>False</strong>: Represented by the integer value \`0\`.</li>
    <li><strong>True</strong>: Represented by **any non-zero value** (both positive and negative numbers like \`1\`, \`5\`, \`-12\`).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Logical Structures and Switch Fall-through</div>
  <p>The conditional statements use \`if\`, \`else if\`, and \`else\` keywords. In switch-case blocks, omitting a \`break\` statement causes execution to "fall through" and execute subsequent case blocks without validation. Let's test this behavior:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — If statements and Switches</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    int age = 17;
    int hasPermit = 1; // 1 is true in C

    if (age >= 18) {
        printf("Eligible for driving license.\\n");
    } else if (age >= 16 && hasPermit) {
        printf("Eligible to drive with supervision.\\n");
    } else {
        printf("Not eligible to drive.\\n");
    }

    // Switch case with break checks
    char grade = 'B';
    switch(grade) {
        case 'A':
            printf("Excellent work!\\n");
            break;
        case 'B':
            printf("Good progress!\\n");
            // No break! Fall-through will execute next case too!
        case 'C':
            printf("Passed!\\n");
            break;
        default:
            printf("Try again!\\n");
    }

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a nested conditional checking if a year is a leap year. A year is a leap year if it is divisible by 4, except for years divisible by 100 unless they are also divisible by 400. Print the leap year status for \`2026\` and \`2024\`.
  </div>
</div>
`;

// Lesson 5
lessonContents['loops'] = `
<h1 class="page-title">Loops & Control Flow</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Loops dictate iteration routines repeating blocks as long as a condition evaluates to true. C supports <code>for</code>, <code>while</code>, and <code>do-while</code> patterns.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Loop Structures & Iteration Steps</div>
  <p>Choosing the correct loop construct improves code readability:</p>
  <ul>
    <li><strong>for</strong>: Best for static iteration sizes where initializers, conditions, and increments are grouped.</li>
    <li><strong>while</strong>: Best when the boundary conditions are checked before executing statement blocks.</li>
    <li><strong>do-while</strong>: Executes statement blocks first, and then verifies boundary conditions. <em>Always executes at least one time.</em></li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Loop Control Tracing</div>
  <p>Let's run a program printing iterations and checking flow behaviors with loop control actions:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Loops & break/continue</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    // For loop demonstration
    printf("For sequence: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    // While loop with loop control bypasses
    printf("While sequence (skipping 3, stopping at 7): ");
    int count = 1;
    while (count <= 10) {
        if (count == 3) {
            count++;
            continue; // Skip rest of block, check condition again
        }
        if (count == 7) {
            break; // Terminate loop block completely
        }
        printf("%d ", count);
        count++;
    }
    printf("\\n");

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that computes the factorial of an integer (e.g. \`5\` -> factorial = 5*4*3*2*1 = 120). Implement this computation using a \`while\` loop, and print the final result.
  </div>
</div>
`;

// Lesson 6
lessonContents['arrays'] = `
<h1 class="page-title">Arrays (Single & Multi-Dimensional)</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Arrays allocate a contiguous block of memory to store values of a single data type. In C, arrays do not support dynamic boundary validation checks, making safety crucial.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Contiguous Memory & Out-Of-Bounds Risks</div>
  <p>Because C arrays store elements contiguously (one directly after another in memory), accessing index elements is very fast. However, **C does not validate array boundaries.** If you declare \`int arr[5];\` and attempt to assign \`arr[10] = 50;\`, the compiler will allow it. At runtime, this writes directly to random heap/stack memory offsets, causing data corruption, silent bugs, or crashes (Segmentation Faults).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Matrices and Array Initializations</div>
  <p>Let's run a program establishing single arrays, double matrices, and iterating values:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Arrays & Iterating Matrices</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    // Array initialization
    int scores[5] = {90, 85, 78, 92, 88};
    
    printf("First score: %d\\n", scores[0]);

    // Matrix representation (2D Array: rows x columns)
    int matrix[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };

    printf("Matrix elements:\\n");
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("%d ", matrix[r][c]);
        }
        printf("\\n");
    }

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Declare a single array containing 8 integers. Calculate the average of all the elements in the array. Print out the sum and the calculated average using formatted decimal outputs.
  </div>
</div>
`;

// Lesson 7
lessonContents['pointers-basics'] = `
<h1 class="page-title">Pointers: Basics & Memory</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Pointers are variables that store the memory address of other variables. Pointers are C's most famous and powerful feature, providing direct access to memory layouts.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Memory Addresses and Pointer Variables</div>
  <p>Every variable exists at a specific location in memory, represented by a hexadecimal address (e.g. \`0x7ffeefbff568\`). To work with addresses, we use two key operators:</p>
  <ul>
    <li><strong>Address-of Operator (\`&\`)</strong>: Retrieves the memory address of a variable.</li>
    <li><strong>Dereferencing Operator (\`*\`)</strong>: Accesses or modifies the value stored at the address a pointer is pointing to.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Declaring and Dereferencing Pointers</div>
  <p>Let's run a program declaring pointers, displaying addresses, and modifying values via dereferencing:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Pointer Basics</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    int num = 42;
    int *ptr = &num; // ptr stores the address of num

    // Print values and addresses (%p is format specifier for addresses)
    printf("Value of num: %d\\n", num);
    printf("Address of num (&num): %p\\n", (void*)&num);
    printf("Value stored in ptr (address): %p\\n", (void*)ptr);
    printf("Dereferenced ptr (*ptr): %d\\n", *ptr);

    // Modify num's value via the pointer dereference
    *ptr = 99;
    printf("New value of num after *ptr = 99: %d\\n", num);

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares a double variable \`temp = 36.6\`, a pointer pointing to it, and prints the variable's value. Then modify the temperature to \`37.2\` using dereferencing, and print the updated temperature.
  </div>
</div>
`;

// Lesson 8
lessonContents['pointers-advanced'] = `
<h1 class="page-title">Pointers: Arithmetic & Arrays</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>In C, pointers and arrays share a deep, fundamental relationship. The name of an array acts as a constant pointer to its first element.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Array Names as Constant Pointers</div>
  <p>When you declare an array like \`int arr[3] = {10, 20, 30};\`, the symbol \`arr\` evaluates directly to the address of the first element (\`&arr[0]\`). This means:</p>
  <ul>
    <li>\`*arr\` evaluates to \`arr[0]\` (the first element).</li>
    <li>\`*(arr + 1)\` evaluates to \`arr[1]\` (the second element).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Pointer Arithmetic & Memory Step Sizes</div>
  <p>When you increment a pointer (e.g. \`ptr + 1\`), C does not simply add 1 byte. Instead, it adds the **byte size of the data type** the pointer points to. For an \`int\` pointer (4 bytes), \`ptr + 1\` moves the address forward by exactly 4 bytes to point to the next integer in memory.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Pointers & Arrays</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    int arr[3] = {10, 20, 30};
    int *ptr = arr; // points to arr[0]

    // Iterate using array offsets
    printf("Iterating using pointer arithmetic:\\n");
    for (int i = 0; i < 3; i++) {
        printf("Address at element %d: %p, Value: %d\\n", i, (void*)(ptr + i), *(ptr + i));
    }

    // Traverse array by incrementing the pointer
    printf("Traversing via pointer increment:\\n");
    printf("Value: %d\\n", *ptr);
    ptr++; // Moves to next integer (4 bytes forward)
    printf("Value: %d\\n", *ptr);

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares an array of 5 floating-point numbers. Create a pointer to the array, and print all values in reverse order by starting the pointer at the last index and decrementing it.
  </div>
</div>
`;

// Lesson 9
lessonContents['functions'] = `
<h1 class="page-title">Functions & Parameter Passing</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Functions are modular, reusable code units. C evaluates parameters in a strictly top-down sequence, making function prototypes important.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Function Prototypes (Declarations)</div>
  <p>C compilers parse code files from top to bottom. If you call a function in your \`main()\` method that is defined lower down in the file, the compiler will throw an error. To prevent this, place a **Function Prototype** (a declaration of the function's name, parameters, and return type) at the top of the file before \`main()\`, and define the function body below.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Pass-by-Value vs. Pass-by-Reference (Using Pointers)</div>
  <p>C strictly executes **Pass-by-Value** for all function calls. To modify a variable's value outside the function, you must pass its address (pointer reference) instead of its value:</p>
  <ul>
    <li><strong>Pass-by-Value</strong>: Passing standard parameters copies the value. The original variable remains unchanged.</li>
    <li><strong>Pass-by-Reference (Simulated)</strong>: Passing pointer addresses allows the function to modify the original variable via dereferencing.</li>
  </ul>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Functions and Parameter Passing</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

// Function prototype declarations
void changeValueVal(int x);
void changeValueRef(int *x);

int main() {
    int score = 50;

    changeValueVal(score);
    printf("After pass-by-value: %d\\n", score); // Remains 50

    changeValueRef(&score);
    printf("After pass-by-reference: %d\\n", score); // Updated to 100

    return 0;
}

// Function definitions
void changeValueVal(int x) {
    x = 100;
}

void changeValueRef(int *x) {
    *x = 100; // Modifies the original variable via dereferencing
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a utility function called \`swap\` that accepts two integer pointers and swaps their values in memory. Declare two integers in \`main()\`, call \`swap\`, and print their values to confirm the swap succeeded.
  </div>
</div>
`;

// Lesson 10
lessonContents['strings'] = `
<h1 class="page-title">Strings & String Library</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>C does not have a native "String" data type. Instead, strings in C are character arrays terminated by a special null character.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> The Null Terminator (\\0) & Buffer Overflows</div>
  <p>Every string in C must end with the null character (**\`\\0\`**), which signals the end of the text. Because of this, a string storing "Java" (4 characters) requires an array size of at least 5 bytes to fit the trailing \`\\0\`:</p>
  <p><strong>Memory representation:</strong> \`['J', 'a', 'v', 'a', '\\0']\`</p>
  <blockquote>
    <strong>⚠️ Warning:</strong> Standard string functions (like \`strcpy\`) do not check array limits. Copying a long string into a small destination array causes a **Buffer Overflow**, which overwrites adjacent memory stack frames and creates significant security vulnerabilities.
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Core Library Functions in &lt;string.h&gt;</div>
  <p>Let's run a program demonstrating common string operations: length, copy, concatenation, and comparison:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — String Manipulations</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char greeting[20] = "Hello";
    
    // strlen: get string length (excluding '\\0')
    printf("Length of greeting: %lu\\n", strlen(greeting));

    // strcat: concatenate strings
    strcat(greeting, " User");
    printf("Concatenated: %s\\n", greeting);

    // strcmp: compare strings (returns 0 if equal)
    char pass[10] = "secret";
    if (strcmp(pass, "secret") == 0) {
        printf("Access Granted!\\n");
    } else {
        printf("Access Denied!\\n");
    }

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Declare a character array representing a name. Write a custom loop (without using \`strlen()\`) that counts the characters in the array by checking for the null terminator (\`\\0\`), and print the final count.
  </div>
</div>
`;

// Lesson 11
lessonContents['structures'] = `
<h1 class="page-title">Structures (struct) & Arrow</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Structures (<code>struct</code>) group variables of different data types under a single, unified type name. They are the foundation of custom data models in C.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Declaring Structs and Memory Layouts</div>
  <p>A struct allocates space for all of its member fields in memory sequentially. Members are accessed using the dot operator (\`.\`).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Pointers to Structures & The Arrow (-&gt;) Operator</div>
  <p>If you have a pointer to a struct, accessing members via dereferencing requires parentheses due to operator precedence rules: \`(*ptr).age\`. To make the syntax cleaner, C provides the **Arrow Operator (\`-&gt;\`)**, which is equivalent: \`ptr-&gt;age\`. Let's test this behavior:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Structs & Arrow Operators</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

// Declare the Structure model
struct Student {
    char name[30];
    int rollNumber;
    float gpa;
};

int main() {
    // Initialize structure variable
    struct Student s1 = {"Alice", 101, 3.85f};
    
    // Print details using dot operator
    printf("Student: %s, GPA: %.2f\\n", s1.name, s1.gpa);

    // Pointer to structure
    struct Student *sPtr = &s1;

    // Modify members using the Arrow operator (->)
    sPtr->gpa = 3.95f;
    printf("Updated GPA via pointer ->: %.2f\\n", s1.gpa);

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a struct called \`Point\` containing two integer fields: \`x\` and \`y\`. Declare a Point variable, assign coordinates, create a pointer to it, and print the coordinates using the arrow operator.
  </div>
</div>
`;

// Lesson 12
lessonContents['unions-enums'] = `
<h1 class="page-title">Unions & Enumerations (enum)</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Unions are memory-optimizing structures where all member fields share the same memory space. Enumerations (enums) define custom lists of named integer constants to make code more readable.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Structs vs. Unions (Shared Memory Space)</div>
  <p>While a \`struct\` allocates separate memory space for each of its fields, a **\`union\`** allocates a single shared memory block sized to match its **largest member**. Modifying one union field overwrites all other fields, meaning only one field can be actively stored at any given time. This is useful for optimizing memory-constrained systems.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Enumerations for State Flags</div>
  <p>Enums bind names to integer constants behind the scenes, defaulting to index numbers (0, 1, 2...). Let's compare unions and enums in code:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Unions and Enums</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

union Data {
    int i;
    float f;
};

// Enum defining status flags
enum Status {
    PENDING,  // gets index 0
    SUCCESS,  // gets index 1
    FAILED    // gets index 2
};

int main() {
    union Data d;
    
    d.i = 10;
    printf("Stored int: %d\\n", d.i);
    
    // Writing to float overwrites the shared memory space!
    d.f = 220.5f;
    printf("Stored float: %.2f\\n", d.f);
    printf("Int value corrupted: %d\\n", d.i); // Corrupted representation

    // Enum evaluation
    enum Status current = SUCCESS;
    if (current == SUCCESS) {
        printf("Transaction finished successfully (Status Code: %d)\\n", current);
    }

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a union called \`Number\` that can store either an \`int\` or a \`double\`. Set values for both sequentially, printing them immediately after assignment to confirm they represent the correct values before being overwritten.
  </div>
</div>
`;

// Lesson 13
lessonContents['dynamic-memory'] = `
<h1 class="page-title">Dynamic Memory (malloc/free)</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Dynamic memory allocation allows you to request memory from the system heap at runtime. Because C does not have garbage collection, you must manage and free this memory manually.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Stack vs Heap & Memory Allocations</div>
  <p>Static variables are stored on the **stack**, which is managed automatically by the compiler. Dynamic allocations exist on the **heap** and must be managed using the following standard library functions (\`&lt;stdlib.h&gt;\`):</p>
  <ul>
    <li>\`malloc(size)\`: Allocates a block of memory of the specified byte size. Leaves the allocated memory uninitialized (filled with random garbage values).</li>
    <li>\`calloc(count, size)\`: Allocates memory and automatically initializes all bytes to zero.</li>
    <li>\`free(ptr)\`: Releases the allocated memory block back to the system.</li>
  </ul>
  <blockquote>
    <strong>⚠️ Critical Safety Rules:</strong>
    <ul>
      <li><strong>Check for NULL</strong>: \`malloc\` returns \`NULL\` if the system runs out of memory. Always verify that pointers are not \`NULL\` before dereferencing.</li>
      <li><strong>Memory Leaks</strong>: Failing to call \`free()\` on heap-allocated memory causes memory leaks, which consume system resources over time.</li>
      <li><strong>Dangling Pointers</strong>: After calling \`free(ptr)\`, reset the pointer to \`NULL\` (\`ptr = NULL;\`) to prevent accidental reuse.</li>
    </ul>
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Dynamic Allocation Code</div>
  <p>Let's run a program allocating a dynamic array of integers, initializing elements, and freeing memory safely:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Dynamic Allocation</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    int n = 5;
    
    // Allocate space for 5 integers
    int *arr = (int*) malloc(n * sizeof(int));

    // Always check for allocation failure
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Initialize array values
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("Dynamic Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // Free the allocated memory to prevent leaks
    free(arr);
    arr = NULL; // Prevent dangling pointer usage

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that uses \`calloc\` to allocate memory for 3 double variables. Print the initial values to verify they are auto-initialized to \`0.0\`. Assign values to them, print them, and call \`free()\` to release the memory.
  </div>
</div>
`;

// Lesson 14
lessonContents['files'] = `
<h1 class="page-title">File Input & Output (I/O)</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>C communicates with storage drives via file streams. Files are opened, modified, and closed using standard stream declarations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> File pointers and Modes (\`FILE*\`)</div>
  <p>C represents file streams using the \`FILE\` structure pointer. Common access modes include:</p>
  <ul>
    <li>\`"r"\`: Read mode. Fails if the file does not exist.</li>
    <li>\`"w"\`: Write mode. Overwrites the file contents or creates a new file.</li>
    <li>\`"a"\`: Append mode. Appends new data to the end of the existing file.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing and Reading Files</div>
  <p>Let's run a program that writes data to a text file and then reads it back to display on the screen:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — File Handling</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

int main() {
    // Open stream in write mode
    FILE *file = fopen("example.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Write text to file stream
    fprintf(file, "Learning C File Operations!\\n");
    fclose(file); // Always close the stream

    // Open stream in read mode
    file = fopen("example.txt", "r");
    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    char buffer[100];
    // Read formatted lines from stream
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("File Content: %s", buffer);
    }
    
    fclose(file);
    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that writes three lines containing the numbers \`100\`, \`200\`, and \`300\` to a text file. Open the file in read mode, parse the integers, compute their sum, and print the final sum to the console.
  </div>
</div>
`;

// Lesson 15
lessonContents['preprocessor'] = `
<h1 class="page-title">Preprocessor Directives</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>The preprocessor is the first step in the compilation pipeline. It acts as a text substitution tool, parsing all directives starting with the pound (<code>#</code>) symbol.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Macros & Header Guards</div>
  <p>Common preprocessor directives include:</p>
  <ul>
    <li><strong>#define</strong>: Creates text substitution macros.</li>
    <li><strong>#include</strong>: Injects the content of specified header files directly into your source code.</li>
    <li><strong>Conditional Compilation (#ifndef, #define, #endif)</strong>: Prevents compiler errors caused by double function declarations. Often used as **Header Guards** in header files:
      <pre><code>#ifndef MY_HEADER_H
#define MY_HEADER_H
// declarations go here
#endif</code></pre>
    </li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Declaring Macros and Conditional Compilation</div>
  <p>Let's run a program defining macro constants, function macros, and checking conditions:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C — Preprocessor directives</span>
      <a class="try-btn" href="/?lang=c">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;stdio.h&gt;

// Macro constant
#define PI 3.14159

// Inline functional macro (parentheses prevent order of operation bugs)
#define SQUARE(x) ((x) * (x))

int main() {
    printf("Value of PI: %f\\n", PI);
    printf("Square of (5 + 1): %d\\n", SQUARE(5 + 1)); // ((5+1)*(5+1)) = 36

    // Conditional compilation checks
    #ifdef PI
        printf("PI macro is declared!\\n");
    #else
        printf("PI macro is not declared!\\n");
    #endif

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Define a function macro called \`MAX(x, y)\` using the ternary conditional operator. Write code inside \`main()\` to test it by comparing two integer values, and print out the maximum value.
  </div>
</div>
`;

// Build lessons
console.log('Starting C lesson generation...');

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

// Generate main index page: blog-c.html
const indexContent = `
<h1 class="page-title">C Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">🔵 C Programming</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>C is a highly performant, general-purpose programming language that was originally developed by Dennis Ritchie in 1972 at Bell Labs. Known as the foundation for modern operating systems and runtime environments, C offers fine-grained, direct memory management and excellent low-level efficiency. In this comprehensive guide, you will master C syntax, compilation stages, raw memory pointers, structures, dynamic allocation, and preprocessor configurations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning C:</p>
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
  'C Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-c.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-c.html');
console.log('🎉 Successfully generated all 15 C tutorial files!');
