const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const cppBlogDir = path.join(publicDir, 'blog-cpp');

// Ensure directory exists
if (!fs.existsSync(cppBlogDir)) {
  fs.mkdirSync(cppBlogDir, { recursive: true });
}

// C++ Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-cpp/intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Constants', filename: 'blog-cpp/variables.html' },
  { slug: 'input-output', num: 3, title: 'Basic Input & Output (cin/cout)', filename: 'blog-cpp/input-output.html' },
  { slug: 'operators', num: 4, title: 'Operators & Expressions', filename: 'blog-cpp/operators.html' },
  { slug: 'conditionals', num: 5, title: 'Conditionals (if-else & switch)', filename: 'blog-cpp/conditionals.html' },
  { slug: 'loops', num: 6, title: 'Loops & Control Flow', filename: 'blog-cpp/loops.html' },
  { slug: 'arrays', num: 7, title: 'Arrays & Introduction to Vectors', filename: 'blog-cpp/arrays.html' },
  { slug: 'pointers-basics', num: 8, title: 'Pointers, References & Memory', filename: 'blog-cpp/pointers-basics.html' },
  { slug: 'functions', num: 9, title: 'Functions: Value vs Reference', filename: 'blog-cpp/functions.html' },
  { slug: 'strings', num: 10, title: 'Strings & string_view', filename: 'blog-cpp/strings.html' },
  { slug: 'oop-basics', num: 11, title: 'Structures & OOP Basics', filename: 'blog-cpp/oop-basics.html' },
  { slug: 'oop-encapsulation', num: 12, title: 'OOP: Encapsulation & Constructors', filename: 'blog-cpp/oop-encapsulation.html' },
  { slug: 'oop-inheritance', num: 13, title: 'OOP: Inheritance & Overriding', filename: 'blog-cpp/oop-inheritance.html' },
  { slug: 'stl', num: 14, title: 'Standard Template Library (STL)', filename: 'blog-cpp/stl.html' },
  { slug: 'exceptions', num: 15, title: 'Exception Handling & RAII', filename: 'blog-cpp/exceptions.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">C++ Tutorial</div>\n`;
  html += `    <a href="/blog-cpp.html"${activeSlug === 'home' ? ' class="active"' : ''}>C++ HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=cpp17">▶ Try C++ Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-c.html">C</a>\n`;
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
    navFooter += `      <a href="/blog-cpp.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← C++ Overview</span>\n`;
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
  <meta name="description" content="Learn C++ Programming — ${title} with clear explanations, unique examples, common mistakes, and interactive compiler runs." />
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
              const langId = urlParams.get('lang') || 'cpp17';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-cpp">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html" class="active">C++</a>
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
      <a href="/blog-cpp.html">C++</a><span>›</span>
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
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>C++ is a high-performance, general-purpose programming language developed by Bjarne Stroustrup in 1979 at Bell Labs as an extension of the C language ("C with Classes"). In this first lesson, we will cover the core structure of a C++ program and look at compilation pipelines.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Compiling in C++</div>
  <p>Like C, C++ is a fully compiled language. It compiles directly into raw processor binaries using compilers like \`g++\`. In modern C++ (C++11, C++17, C++20), compiler optimization passes are highly sophisticated, resulting in performance that forms the engine backend of modern game frameworks, graphics engines, and real-time systems.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Hello World Syntax Analyzed</div>
  <p>Let's run a classic Hello World program in C++:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Hello World</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "Welcome to Our C++ Compiler!" << std::endl;
    return 0;
}</code></pre>
  </div>

  <p>Let's break down the keywords:</p>
  <ul>
    <li><strong>#include &lt;iostream&gt;</strong>: Preprocessor directive that includes standard Input-Output stream headers, housing output utilities like \`std::cout\`.</li>
    <li><strong>std::cout</strong>: Standard character output stream that directs text outputs to the console.</li>
    <li><strong>&lt;&lt;</strong>: Insertion operator that pushes text or parameters to the output stream.</li>
    <li><strong>std::endl</strong>: Closes the stream sequence and inserts a newline character, flushing the stream buffer.</li>
    <li><strong>return 0</strong>: Returns a success state integer to the host operating system.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code in the editor above. Add a statement using \`std::cout\` that outputs a tab (\`\\t\`) and then prints your name. Compile and run it.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables & Constants</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>C++ is a strongly and statically-typed programming language. Variables must be declared with a specific data type before they are used, allocating concrete space on stack memory frames.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Primitive Data Types & Conversions</div>
  <p>C++ contains the standard numerical data primitives:</p>
  <ul>
    <li>\`bool\` (1 byte): Stores \`true\` or \`false\`.</li>
    <li>\`char\` (1 byte): Stores single character codes.</li>
    <li>\`int\` (4 bytes): Stores standard integers.</li>
    <li>\`float\` (4 bytes): Single-precision floating point.</li>
    <li>\`double\` (8 bytes): Double-precision floating point (default decimals).</li>
  </ul>
  <p><strong>Casting:</strong> Avoid implicit casting when possible. Use C++ style **\`static_cast&lt;type&gt;(val)\`** rather than parenthetical C-style casting: \`double avg = static_cast&lt;double&gt;(score) / total;\`.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Variables & Constants Codes</div>
  <p>Let's run a program declaring types, casting, and defining constant flags:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Variables and Casting</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;

int main() {
    int age = 22;
    double price = 49.99;
    const double TAX_RATE = 0.08; // Cannot be modified later
    
    // Explicit static cast to double
    int score = 45;
    int total = 50;
    double percentage = static_cast&lt;double&gt;(score) / total * 100;

    std::cout << "Age: " << age << "\\n";
    std::cout << "Score Percentage: " << percentage << "%" << "\\n";
    std::cout << "Tax Rate: " << TAX_RATE << "\\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Declare a \`const\` float variable representing gravity (\`9.8f\`). Try to reassign its value to \`9.81f\` inside your code, compile it, observe the compiler error message, and then fix it by removing the invalid assignment statement.
  </div>
</div>
`;

// Lesson 3
lessonContents['input-output'] = `
<h1 class="page-title">Basic Input & Output (cin/cout)</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>C++ interacts with console streams using standard libraries. In this lesson, we will learn how to read variables, handle inputs safely, and format decimal outputs.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> cin Streams and the Extraction (\`&gt;&gt;\`) Operator</div>
  <p>The \`std::cin\` stream reads values from the console using the extraction operator (\`&gt;&gt;\`):</p>
  <ul>
    <li>\`std::cin &gt;&gt; age;\`: Reads inputs until it encounters whitespace or a newline.</li>
    <li><strong>iomanip</strong>: The \`&lt;iomanip&gt;\` library formatting commands let you specify output decimal precision using \`std::fixed\` and \`std::setprecision()\`.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Dynamic Scanner Input</div>
  <p>Let's run a program reading inputs and formatting floating decimal values:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Inputs & Formatting</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;iomanip&gt; // Needed for output formatting

int main() {
    int age;
    double price;

    std::cout << "Enter age: ";
    std::cin >> age;

    std::cout << "Enter price: ";
    std::cin >> price;

    // Formatting decimal output to exactly 2 decimal places
    std::cout << "Age entered: " << age << "\\n";
    std::cout << "Formatted Price: $" << std::fixed << std::setprecision(2) << price << "\\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that asks the user to input their height in meters (e.g. \`1.75\`). Output the value to the screen formatted to exactly 3 decimal places using \`setprecision\`.
  </div>
</div>
`;

// Lesson 4
lessonContents['operators'] = `
<h1 class="page-title">Operators & Expressions</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Operators perform mathematical and logical changes on values. Understanding arithmetic precedence (PEMDAS) and prefix/postfix increments is crucial.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Arithmetic Precedence & Increments</div>
  <p>Operators follow mathematical precedence. Modulus (\`%\`) yields the remainder of a division. The placement of the increment operator (\`++\`) dictates execution order:</p>
  <ul>
    <li><strong>Postfix (\`x++\`)</strong>: Evaluates \`x\` in the expression first, then increments \`x\`.</li>
    <li><strong>Prefix (\`++x\`)</strong>: Increments \`x\` first, then evaluates the expression.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Logical & Relational Operators</div>
  <p>Logical operators combine states: \`&&\` (AND), \`||\` (OR), and \`!\` (NOT) with short-circuit rules. Let's test these operators:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Operators & Precedence</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;

int main() {
    int a = 10;
    int b = 3;

    std::cout << "Integer Modulus (10 % 3): " << (a % b) << "\\n";

    // Prefix vs Postfix increment tracing
    int x = 5;
    int y = x++; // y gets 5, then x becomes 6
    std::cout << "Postfix: y=" << y << ", x=" << x << "\\n";

    int p = 5;
    int q = ++p; // p becomes 6, then q gets 6
    std::cout << "Prefix: q=" << q << ", p=" << p << "\\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Declare an integer \`val = 100\`. Print the value of \`val++\` and \`++val\` to verify the execution order. Use logical operators to check if \`val\` is both greater than 50 and divisible by 2.
  </div>
</div>
`;

// Lesson 5
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & switch)</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control code paths based on boolean evaluations. C++ supports standard if-else logic, ternary operators, and modern switch statements.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> If-else Logic & Switch Fall-through</div>
  <p>Conditionals direct flow paths. In switch-case blocks, omitting a \`break\` statement causes execution to "fall through" and execute subsequent case blocks without validation.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Conditional Codes</div>
  <p>Let's run a program evaluating conditions and checking switch fall-throughs:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Conditionals</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;

int main() {
    int score = 85;

    if (score >= 90) {
        std::cout << "Grade: A\\n";
    } else if (score >= 80) {
        std::cout << "Grade: B\\n";
    } else {
        std::cout << "Grade: F\\n";
    }

    // Ternary operator evaluation
    std::string passed = (score >= 50) ? "Yes" : "No";
    std::cout << "Passed: " << passed << "\\n";

    // Switch case with fall-through
    char grade = 'B';
    switch (grade) {
        case 'A':
            std::cout << "Perfect score!\\n";
            break;
        case 'B':
            std::cout << "Nice progress!\\n";
            // No break! Fall-through will execute case 'C' too!
        case 'C':
            std::cout << "Passed!\\n";
            break;
        default:
            std::cout << "Unknown grade\\n";
    }

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a nested conditional checking if a person is old enough to vote (age 18+). If they are, check if they have registered (a boolean flag). If both are true, print "Safe to vote!". Otherwise, print the specific reason they cannot vote.
  </div>
</div>
`;

// Lesson 6
lessonContents['loops'] = `
<h1 class="page-title">Loops & Control Flow</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Loops repeat code blocks as long as a condition is satisfied. C++ supports standard loops and range-based loops.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Loop Structures: while, do-while, and for</div>
  <p>C++ loops match standard layouts:</p>
  <ul>
    <li><strong>for</strong>: Best for iterating over fixed numeric ranges.</li>
    <li><strong>while</strong>: Evaluates conditions before checking execution blocks.</li>
    <li><strong>do-while</strong>: Executes execution blocks first, and then evaluates conditions.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Iterations & Loop Control (break/continue)</div>
  <p>Let's run a program illustrating loops, continue statements, and break constraints:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Loops</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;

int main() {
    std::cout << "For loop sequence: ";
    for (int i = 1; i <= 5; i++) {
        std::cout << i << " ";
    }
    std::cout << "\\n";

    // While loop with continue/break
    std::cout << "While sequence (skipping 3, breaking at 6): ";
    int count = 1;
    while (count <= 10) {
        if (count == 3) {
            count++;
            continue; // Skip the rest of this loop iteration
        }
        if (count == 6) {
            break; // Exit the loop entirely
        }
        std::cout << count << " ";
        count++;
    }
    std::cout << "\\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a loop that calculates the sum of all odd numbers between 1 and 25. Skip the number 13 using the \`continue\` keyword, and print the computed sum at the end.
  </div>
</div>
`;

// Lesson 7
lessonContents['arrays'] = `
<h1 class="page-title">Arrays & Introduction to Vectors</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>C++ supports fixed-size contiguous memory arrays, as well as dynamic STL vectors that resize automatically.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Fixed Arrays vs. Dynamic STL Vectors</div>
  <p>Standard arrays are fixed in size at compilation time, and C++ does not perform out-of-bounds safety checks. To prevent buffer overflows, C++'s Standard Template Library (STL) provides **\`std::vector\`**, which manages memory dynamically on the heap and resizes as elements are added.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Vector & Matrix operations</div>
  <p>Let's run a program defining static matrices and dynamic vectors, adding and accessing elements safely:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Arrays and Vectors</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt; // Needed for std::vector

int main() {
    // 1. Fixed-size array matrix
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    
    std::cout << "Matrix element [1][2]: " << matrix[1][2] << "\\n";

    // 2. Dynamic Vector
    std::vector&lt;int&gt; numbers;
    numbers.push_back(10); // Add elements dynamically
    numbers.push_back(20);
    numbers.push_back(30);

    std::cout << "Vector Size: " << numbers.size() << "\\n";
    std::cout << "Vector elements: ";
    for (int n : numbers) { // Modern range-based for loop
        std::cout << n << " ";
    }
    std::cout << "\\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares a \`std::vector\` of doubles. Use a loop to populate it with the squares of numbers from 1.0 to 5.0. Output the size of the vector and iterate through it to print the values.
  </div>
</div>
`;

// Lesson 8
lessonContents['pointers-basics'] = `
<h1 class="page-title">Pointers, References & Memory</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>C++ provides two ways to reference memory locations directly: Pointers and References. Understanding their differences is crucial for effective memory management.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Pointers vs. References</div>
  <p>Pointers and references allow you to access values by their memory addresses:</p>
  <ul>
    <li><strong>Pointer (\`Type*\`)</strong>: A variable storing a memory address. Can point to different addresses over time and can be set to \`nullptr\`. Must be dereferenced using \`*\` to access values.</li>
    <li><strong>Reference (\`Type&\`)</strong>: An alias for an existing variable. Must be initialized when declared and cannot be reassigned to alias a different variable. Syntactically acts like a standard variable, requiring no dereferencing.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Pointers and References Code</div>
  <p>Let's run a program illustrating pointers, references, and modifying variables in memory:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Pointers and References</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;

int main() {
    int num = 42;

    // 1. Pointer declaration and dereference
    int *ptr = &num; 
    std::cout << "Address: " << ptr << ", Value via Pointer: " << *ptr << "\\n";
    *ptr = 99; // Modify value via pointer

    // 2. Reference declaration (Alias)
    int &ref = num;
    std::cout << "Value via Reference: " << ref << "\\n";
    ref = 150; // Modify value via reference (changes original num)

    std::cout << "Original num after modifications: " << num << "\\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares a float variable and both a pointer and reference to it. Modify the float's value using the pointer first, and then the reference, printing the variable after each change to verify the modifications in memory.
  </div>
</div>
`;

// Lesson 9
lessonContents['functions'] = `
<h1 class="page-title">Functions: Value vs Reference</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Functions are modular, reusable code units. In C++, parameters can be passed by value, by pointer, or by reference to optimize performance.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Pass-by-Value vs. Pass-by-Reference</div>
  <p>Choosing parameter passing patterns controls execution safety and efficiency:</p>
  <ul>
    <li><strong>Pass-by-Value</strong>: Copies the parameter value. The original variable remains unchanged.</li>
    <li><strong>Pass-by-Reference (\`Type&\`)</strong>: Passes a reference to the original variable, allowing the function to modify it directly. <em>Highly recommended for large objects (like vectors or strings) to avoid copy overhead.</em></li>
    <li><strong>Const References (\`const Type&\`)</strong>: Passes a reference to avoid copying, but marks it \`const\` to prevent the function from modifying the original value. This provides both safety and high performance.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Parameter Passing Code</div>
  <p>Let's run a program illustrating parameter passing mechanics:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Parameter Passing</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;

// Pass-by-value
void modifyVal(int x) {
    x = 100;
}

// Pass-by-reference
void modifyRef(int &x) {
    x = 100; // Modifies the original variable directly
}

int main() {
    int num = 50;

    modifyVal(num);
    std::cout << "After modifyVal: " << num << "\\n"; // Remains 50

    modifyRef(num);
    std::cout << "After modifyRef: " << num << "\\n"; // Updated to 100

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a utility function called \`swap\` that accepts two integer reference parameters and swaps their values. Test it inside \`main()\` with two initialized variables, print them before and after the swap, and confirm they swapped successfully.
  </div>
</div>
`;

// Lesson 10
lessonContents['strings'] = `
<h1 class="page-title">Strings & string_view</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>C++ provides two ways to work with text strings: the dynamic <code>std::string</code> class, and the modern C++17 memory-optimized <code>std::string_view</code>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> std::string vs. C++17 std::string_view</div>
  <p>The standard string libraries handle text dynamically:</p>
  <ul>
    <li><strong>std::string</strong>: A class that manages its own memory dynamically. Reallocates heap space when characters are appended.</li>
    <li><strong>std::string_view (C++17)</strong>: A lightweight, read-only reference window pointing to an existing string. <em>Does not allocate copy memory, making it incredibly fast for parsing operations.</em></li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> String Processing Code</div>
  <p>Let's run a program utilizing std::string functions and std::string_view references:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — String processing</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;string_view&gt; // C++17

// Pass string_view to prevent copy allocations
void printName(std::string_view sv) {
    std::cout << "Viewing name: " << sv << "\\n";
}

int main() {
    std::string greeting = "Hello, C++ Learners!";
    
    std::cout << "Length: " << greeting.length() << "\\n";
    std::cout << "Substring: " << greeting.substr(7, 3) << "\\n"; // "C++"

    // String view optimization demonstration
    printName(greeting);
    printName("Raw String Literal"); // No memory allocations occur

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that searches for the character '+' inside a \`std::string\` using the \`.find()\` method. If found, print the index of the character; otherwise, print a "Not found" statement.
  </div>
</div>
`;

// Lesson 11
lessonContents['oop-basics'] = `
<h1 class="page-title">Structures & OOP Basics</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>C++ was originally named "C with Classes". Object-Oriented Programming (OOP) is a key feature of C++, organizing programs around classes and objects.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Structs vs. Classes in C++</div>
  <p>In C++, both structs and classes can contain member variables and methods. The only difference is their default access visibility:</p>
  <ul>
    <li><strong>struct</strong>: Members are **public** by default. Typically used for simple data structures containing no behaviors.</li>
    <li><strong>class</strong>: Members are **private** by default. Used for encapsulating data and logic.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Class Declarations</div>
  <p>Let's run a program declaring classes and instantiating objects:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Classes and Objects</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Student {
private:
    std::string name;
    int age;

public:
    // Constructor to initialize fields
    Student(std::string name, int age) {
        this->name = name;
        this->age = age;
    }

    void displayInfo() {
        std::cout << "Student: " << name << ", Age: " << age << "\\n";
    }
};

int main() {
    // Instantiate object using the 'new' stack allocation
    Student s1("Alice", 21);
    s1.displayInfo();

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a class named \`Car\` with private fields: \`brand\` and \`year\`. Provide a public constructor and a public method called \`drive()\` printing "Driving brand!". Instantiate it in \`main()\` and call the method.
  </div>
</div>
`;

// Lesson 12
lessonContents['oop-encapsulation'] = `
<h1 class="page-title">OOP: Encapsulation & Constructors</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Encapsulation hides the internal details of a class, exposing operations safely using getters, setters, and constructors.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Getter/Setter Validation and Constructor Initialization Lists</div>
  <p>Getter and setter methods control access to private variables, allowing validation checks. When writing constructors, C++ provides **Constructor Initialization Lists**, which initialize member variables directly before the constructor body executes, improving performance.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Encapsulation Code</div>
  <p>Let's run a program utilizing initialization list layouts and setters validation checks:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Encapsulation & Constructor Lists</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class BankAccount {
private:
    std::string owner;
    double balance;

public:
    // Constructor using initialization lists (: owner(owner)...)
    BankAccount(std::string owner, double initialBalance) 
        : owner(owner), balance(initialBalance >= 0 ? initialBalance : 0) {}

    double getBalance() const { return balance; }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            std::cout << "Invalid deposit!\\n";
        }
    }
};

int main() {
    BankAccount account("Bob", 500.0);
    account.deposit(200.0);
    std::cout << "Balance: $" << account.getBalance() << "\\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a class named \`Employee\` with fields \`name\` and \`salary\`. Use a constructor initialization list to initialize these fields. Expose a setter for \`salary\` that rejects negative salary updates.
  </div>
</div>
`;

// Lesson 13
lessonContents['oop-inheritance'] = `
<h1 class="page-title">OOP: Inheritance & Overriding</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Inheritance lets child classes inherit properties from parent classes. C++ uses the <code>virtual</code> keyword to implement runtime overrides and polymorphism.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Virtual Keywords & Dynamic Dispatch</div>
  <p>By default, C++ binds methods at compile time based on the reference type. To override a method dynamically at runtime, you must declare it as **\`virtual\`** in the parent class. If a parent reference points to a child class object, the virtual keyword ensures that the child subclass implementation executes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Inheritance and Virtual Overriding Code</div>
  <p>Let's run a program illustrating inheritance and virtual method overriding:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Inheritance and Polymorphism</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Animal {
public:
    // Declare method as virtual to allow overriding at runtime
    virtual void makeNoise() const {
        std::cout << "Generic animal sound.\\n";
    }
    virtual ~Animal() = default; // virtual destructor is required for base classes
};

class Dog : public Animal {
public:
    void makeNoise() const override { // override keyword validates signature matches parent
        std::cout << "Woof! Woof!\\n";
    }
};

int main() {
    // Polymorphic reference: parent type holding a child subclass object
    Animal *myAnimal = new Dog();
    
    // Virtual keyword triggers runtime dispatch, executing Dog's makeNoise()
    myAnimal->makeNoise(); 

    delete myAnimal;
    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an abstract base class called \`Vehicle\` with a pure virtual method \`void startEngine() = 0;\`. Create a subclass \`Truck\` that overrides this method to print "Truck engine roaring". Test your implementation.
  </div>
</div>
`;

// Lesson 14
lessonContents['stl'] = `
<h1 class="page-title">Standard Template Library (STL)</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>The Standard Template Library (STL) provides a collection of generic algorithms and data structures (containers) to handle lists, sets, and key-value maps.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> STL Containers: vector, set, and map</div>
  <p>Common containers inside the STL library include:</p>
  <ul>
    <li><strong>std::vector</strong>: A dynamically resizing, contiguous sequence container.</li>
    <li><strong>std::set</strong>: Stores unique values sorted automatically. Excellent for validation checks.</li>
    <li><strong>std::map</strong>: Stores key-value pairings (e.g. username mapped to high scores) sorted by key.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> STL Operations Code</div>
  <p>Let's run a program utilizing vector, set, and map operations:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — STL Containers</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;set&gt;
#include &lt;map&gt;
#include &lt;string&gt;

int main() {
    // 1. Vector (List)
    std::vector&lt;std::string&gt; items = {"Apple", "Banana"};
    items.push_back("Apple"); // Duplicates allowed

    // 2. Set (Unique items only)
    std::set&lt;int&gt; uniqueNums = {10, 20, 10}; // Second 10 is ignored
    
    // 3. Map (Key-Value pairs)
    std::map&lt;std::string, int&gt; scores;
    scores["Alice"] = 95;
    scores["Bob"] = 88;

    std::cout << "Set size: " << uniqueNums.size() << "\\n";
    std::cout << "Alice's Score: " << scores["Alice"] << "\\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares a \`std::map\` mapping product names (strings) to prices (doubles). Add three items, look up the price of one item, and print the retrieved price.
  </div>
</div>
`;

// Lesson 15
lessonContents['exceptions'] = `
<h1 class="page-title">Exception Handling & RAII</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Exceptions intercept runtime errors to prevent application crashes. C++ handles errors using try-catch blocks and memory resource lifecycles (RAII).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Try-Catch Blocks & RAII (Resource Management)</div>
  <p>C++ uses try-catch blocks to catch thrown errors: \`throw std::runtime_error("Message");\`.</p>
  <p><strong>RAII (Resource Acquisition Is Initialization)</strong>: A core C++ design pattern. Resources (like heap memory or open files) are bound to the lifetime of local stack objects. When the object goes out of scope, its destructor automatically releases the resource, preventing memory leaks.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Exception Trapping Code</div>
  <p>Let's run a program illustrating exception handling and division validation safeguards:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C++ — Exception Handling</span>
      <a class="try-btn" href="/?lang=cpp17">▶ Run Code</a>
    </div>
    <pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt; // Needed for standard exceptions

double divide(double x, double y) {
    if (y == 0) {
        throw std::invalid_argument("Division by zero error.");
    }
    return x / y;
}

int main() {
    try {
        std::cout << "Result: " << divide(10, 2) << "\\n";
        // Trigger error
        std::cout << "Result: " << divide(10, 0) << "\\n";
    } catch (const std::invalid_argument &e) {
        std::cout << "Caught Exception: " << e.what() << "\\n";
    }

    std::cout << "Execution continues smoothly...\\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom function that takes a numeric argument representing an exam score. If the score is outside the range 0-100, throw a \`std::out_of_range\` exception. Catch the exception inside a try-catch block in \`main()\`, and print its descriptive error message.
  </div>
</div>
`;

// Build lessons
console.log('Starting C++ lesson generation...');

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

// Generate main index page: blog-cpp.html
const indexContent = `
<h1 class="page-title">C++ Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">⚡ C++</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>C++ is a highly optimized, statically typed, general-purpose compiled language developed by Bjarne Stroustrup in 1979 as an extension of the C language. By adding object-oriented features ("classes"), C++ has evolved into the industry standard engine for high-performance computing, graphical game engines, operating systems, and resource-constrained micro-devices. In this guide, you will master C++ basics, input-output streams, references, dynamic STL vectors, object-oriented encapsulation, inheritance overriding, polymorphism, and exception RAII concepts.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning C++:</p>
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
  'C++ Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-cpp.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-cpp.html');
console.log('🎉 Successfully generated all 15 C++ tutorial files inside blog-cpp/ folder!');
