const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const csharpBlogDir = path.join(publicDir, 'blog-csharp');

// Ensure directory exists
if (!fs.existsSync(csharpBlogDir)) {
  fs.mkdirSync(csharpBlogDir, { recursive: true });
}

// C# Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-csharp/intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Constants', filename: 'blog-csharp/variables.html' },
  { slug: 'operators', num: 3, title: 'Operators & Expressions', filename: 'blog-csharp/operators.html' },
  { slug: 'conditionals', num: 4, title: 'Conditionals (if-else & switch)', filename: 'blog-csharp/conditionals.html' },
  { slug: 'loops', num: 5, title: 'Loops & Control Flow', filename: 'blog-csharp/loops.html' },
  { slug: 'arrays', num: 6, title: 'Arrays (Single & Multi)', filename: 'blog-csharp/arrays.html' },
  { slug: 'methods', num: 7, title: 'Methods & Parameters', filename: 'blog-csharp/methods.html' },
  { slug: 'oop-basics', num: 8, title: 'OOP: Classes & Objects', filename: 'blog-csharp/oop-basics.html' },
  { slug: 'oop-encapsulation', num: 9, title: 'OOP: Encapsulation & Access', filename: 'blog-csharp/oop-encapsulation.html' },
  { slug: 'oop-inheritance', num: 10, title: 'OOP: Inheritance & Overriding', filename: 'blog-csharp/oop-inheritance.html' },
  { slug: 'oop-polymorphism', num: 11, title: 'OOP: Polymorphism & Interfaces', filename: 'blog-csharp/oop-polymorphism.html' },
  { slug: 'collections', num: 12, title: 'Collections & Generics', filename: 'blog-csharp/collections.html' },
  { slug: 'linq', num: 13, title: 'LINQ (Language Integrated Query)', filename: 'blog-csharp/linq.html' },
  { slug: 'exceptions', num: 14, title: 'Exception Handling', filename: 'blog-csharp/exceptions.html' },
  { slug: 'files', num: 15, title: 'File I/O & disposable streams', filename: 'blog-csharp/files.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">C# Tutorial</div>\n`;
  html += `    <a href="/blog-csharp.html"${activeSlug === 'home' ? ' class="active"' : ''}>C# HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=csharp">▶ Try C# Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
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
    navFooter += `      <a href="/blog-csharp.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← C# Overview</span>\n`;
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
  <meta name="description" content="Learn C# — ${title} with clear explanations, unique examples, common mistakes, and interactive compiler runs." />
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
              const langId = urlParams.get('lang') || 'csharp';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-csharp">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html" class="active">C#</a>
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
      <a href="/blog-csharp.html">C#</a><span>›</span>
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
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>C# (pronounced "C-Sharp") is a modern, object-oriented, and type-safe programming language developed by Microsoft in 2000. It runs on the .NET framework and is widely used for building enterprise systems, APIs, mobile applications (via Xamarin/MAUI), and game development using the Unity engine.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> The .NET Compilation Pipeline (CLR, MSIL)</div>
  <p>C# does not compile directly to binary machine code. Instead, C# compilations utilize a managed environment:</p>
  <ul>
    <li><strong>MSIL (Microsoft Intermediate Language)</strong>: The compiler compiles your C# code into MSIL (a CPU-independent set of instructions).</li>
    <li><strong>CLR (Common Language Runtime)</strong>: The execution engine of .NET. The CLR compiles MSIL bytecode into native machine instructions on-the-fly using a Just-In-Time (JIT) compiler.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Your First Program: Console.WriteLine()</div>
  <p>Let's write a standard C# program template. In C#, every line of code must exist inside a class definition:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Hello World</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
        Console.Write("Welcome to Our C# Compiler!");
    }
}</code></pre>
  </div>

  <p>Let's analyze the statements:</p>
  <ul>
    <li><strong>using System;</strong>: Imports the System namespace containing fundamental classes like \`Console\`.</li>
    <li><strong>class Program</strong>: Declares a class wrapper enclosing our program logic.</li>
    <li><strong>static void Main()</strong>: The entry point method of every C# application. Note that \`Main\` starts with a capital letter in C#.</li>
    <li><strong>Console.WriteLine()</strong>: Prints text to the screen and automatically appends a newline character.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code in the editor above. Add statements to print your name and a welcome greeting. Ensure you run the code in the compiler to verify.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables & Constants</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>C# is a statically-typed language, meaning every variable must be declared with a specific data type beforehand. C# provides primitive numerical variables, booleans, and a high-precision decimal type.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Core Data Types & Decimal Precision</div>
  <p>Standard data types in C# include:</p>
  <ul>
    <li>\`int\` (4 bytes): Standard integer.</li>
    <li>\`double\` (8 bytes): Standard decimal float.</li>
    <li>\`float\` (4 bytes): Single-precision decimal (requires \`f\` suffix, e.g. \`3.14f\`).</li>
    <li>\`decimal\` (16 bytes): High-precision financial decimal type. **Must append \`m\` suffix** (e.g. \`19.99m\`). Offers no rounding errors, making it the industry standard for banking applications.</li>
    <li>\`bool\` (1 byte): Stores \`true\` or \`false\`.</li>
    <li>\`char\` (2 bytes): Unicode character.</li>
  </ul>
  <p><strong>Implicitly Typed Variables (\`var\`):</strong> You can use the \`var\` keyword to let the compiler determine the variable type based on the assigned value. Once declared, its type is locked and cannot change.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Variables Code</div>
  <p>Let's run a program declaring types, casting, and printing variables:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Variables & Constants</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    static void Main() {
        int age = 25;
        double pi = 3.14159;
        decimal price = 19.99m; // Financial decimal with 'm' suffix
        const double TaxRate = 0.08; // Immutable constant

        // Implicit typing
        var message = "C# is fun!";

        Console.WriteLine("Age: " + age);
        Console.WriteLine("Price: $" + price);
        Console.WriteLine("Constant Tax Rate: " + TaxRate);
        Console.WriteLine("Var Message: " + message);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program declaring a \`const\` decimal representing discount percentages. Calculate the discounted price of a product costing \`99.99m\` and output the calculated price.
  </div>
</div>
`;

// Lesson 3
lessonContents['operators'] = `
<h1 class="page-title">Operators & Expressions</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Operators perform operations on variables and values. C# includes arithmetic, comparison, logical, and increment operators.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Arithmetic division and Operator precedence</div>
  <p>Math evaluations match standard precedence rules. Modulus (\`%\`) yields the remainder of a division. Dividing two integers yields a truncated integer: \`5 / 2\` evaluates to \`2\`. Cast one to double to retain decimals: \`(double)5 / 2\` yields \`2.5\`.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Logical Short-Circuiting</div>
  <p>C# uses logical operators: \`&&\` (AND), \`||\` (OR), and \`!\` (NOT). Short-circuiting skips evaluating the second condition if the first condition determines the outcome. Let's test these operators:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Operators</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    static void Main() {
        int a = 10;
        int b = 4;

        Console.WriteLine("Truncated Division (10/4): " + (a / b));
        Console.WriteLine("Double Cast Division: " + ((double)a / b));

        // Increment postfix vs prefix
        int x = 5;
        int y = x++; // y gets 5, then x becomes 6
        Console.WriteLine("Postfix: y=" + y + ", x=" + x);

        int p = 5;
        int q = ++p; // p becomes 6, then q gets 6
        Console.WriteLine("Prefix: q=" + q + ", p=" + p);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Initialize \`int score = 80\`. Use comparison and logical operators to check if the score is greater than 50, less than or equal to 100, and is even. Print the result.
  </div>
</div>
`;

// Lesson 4
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & switch)</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control the branch paths of execution based on boolean checks. In this lesson, we will look at if-else blocks, ternary operators, and modern C# switch expressions.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Modern C# Switch Expressions</div>
  <p>C# 8.0 introduced modern **Switch Expressions** which use the lambda/arrow syntax (\`=&gt;\`). They are clean, prevent fall-through bugs, and return values directly, making them superior to classic switch statements.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Conditional Codes</div>
  <p>Let's run a program evaluating conditions and checking modern switch expressions:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Conditionals</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    static void Main() {
        int score = 85;

        // If-else structure
        if (score >= 90) {
            Console.WriteLine("Grade: A");
        } else if (score >= 80) {
            Console.WriteLine("Grade: B");
        } else {
            Console.WriteLine("Grade: F");
        }

        // Modern Switch Expression (C# 8.0+)
        int dayNum = 3;
        string dayName = dayNum switch {
            1 => "Monday",
            2 => "Tuesday",
            3 => "Wednesday",
            _ => "Unknown Day" // '_' acts as the default case
        };
        
        Console.log("Selected Day: " + dayName);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a nested conditional checking if a person is eligible to rent a car. They must be age 21+ and hold a valid credit card. Print an appropriate status message for both success and failure states.
  </div>
</div>
`;

// Lesson 5
lessonContents['loops'] = `
<h1 class="page-title">Loops & Control Flow</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Loops repeat code blocks as long as a condition is satisfied. C# supports standard loops, range loops, and flow controls.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Loop Structures: while, do-while, and for</div>
  <p>C# loops match standard constructs:</p>
  <ul>
    <li><strong>for</strong>: Best for iterating over fixed numeric ranges.</li>
    <li><strong>while</strong>: Evaluates conditions before checking execution blocks.</li>
    <li><strong>do-while</strong>: Executes execution blocks first, and then evaluates conditions.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Flow Control Tracing</div>
  <p>Let's run a program illustrating loops, continue statements, and break constraints:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Loops</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    static void Main() {
        Console.Write("For loop: ");
        for (int i = 1; i <= 5; i++) {
            Console.Write(i + " ");
        }
        Console.WriteLine();

        // While loop with continue/break
        Console.Write("While sequence (skipping 3, breaking at 6): ");
        int count = 1;
        while (count <= 10) {
            if (count == 3) {
                count++;
                continue; // Skip the rest of this loop iteration
            }
            if (count == 6) {
                break; // Exit the loop entirely
            }
            Console.Write(count + " ");
            count++;
        }
        Console.WriteLine();
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a loop that sums all odd numbers between 1 and 30. Skip the number 13 using the \`continue\` keyword, and print the computed sum at the end.
  </div>
</div>
`;

// Lesson 6
lessonContents['arrays'] = `
<h1 class="page-title">Arrays (Single & Multi-Dimensional)</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Arrays allocate a contiguous block of memory to store values of a single data type. C# supports single-dimensional, multi-dimensional (rectangular), and jagged arrays.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Rectangular vs. Jagged Arrays</div>
  <p>C# distinguishes between two types of multi-dimensional arrays:</p>
  <ul>
    <li><strong>Rectangular Array (\`int[,] matrix\`)</strong>: A single block of memory representing a grid (e.g. 3x3) where every row is guaranteed to have the same length.</li>
    <li><strong>Jagged Array (\`int[][] jagged\`)</strong>: An "array of arrays" where each row can have a different length, saving memory for non-uniform data.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Array Operations</div>
  <p>Let's run a program declaring single arrays, rectangular matrices, and iterating values:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Arrays</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    static void Main() {
        // Single-dimensional array
        int[] scores = { 90, 85, 78, 92 };

        // Rectangular 2D array (Rows x Columns)
        int[,] matrix = {
            { 1, 2, 3 },
            { 4, 5, 6 }
        };

        Console.WriteLine("Iterating rectangular matrix:");
        for (int r = 0; r < matrix.GetLength(0); r++) {
            for (int c = 0; c < matrix.GetLength(1); c++) {
                Console.Write(matrix[r, c] + " ");
            }
            Console.WriteLine();
        }
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares a jagged array containing 3 rows. Initialize row 0 with 2 items, row 1 with 4 items, and row 2 with 3 items. Iterate through the array and print all values.
  </div>
</div>
`;

// Lesson 7
lessonContents['methods'] = `
<h1 class="page-title">Methods & Parameters</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Methods are reusable, modular code blocks. C# provides parameter modifiers like <code>ref</code>, <code>out</code>, and <code>params</code> to control how variables are passed.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Parameter Modifiers: out, ref, and params</div>
  <p>C# parameter modifiers extend standard pass-by-value behaviors:</p>
  <ul>
    <li><strong>ref</strong>: Passes a variable by reference. The variable must be initialized before it is passed to the method.</li>
    <li><strong>out</strong>: Used to return multiple values from a method. The variable does not need to be initialized before it is passed, but the method **must assign a value** to it before returning.</li>
    <li><strong>params</strong>: Allows a method to accept a variable number of arguments of the same type, bundling them into an array dynamically.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Parameter Modifiers Code</div>
  <p>Let's run a program illustrating methods, overloading, and C# parameter modifiers:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Methods</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    // 1. ref parameter (modifies the caller's variable)
    static void DoubleValue(ref int x) {
        x *= 2;
    }

    // 2. out parameter (returns output values)
    static void CalculateArea(int radius, out double area) {
        area = Math.PI * radius * radius;
    }

    // 3. params array
    static int SumValues(params int[] numbers) {
        int sum = 0;
        foreach (int n in numbers) sum += n;
        return sum;
    }

    static void Main() {
        int score = 50;
        DoubleValue(ref score);
        Console.WriteLine("After ref double: " + score);

        CalculateArea(5, out double calculatedArea);
        Console.WriteLine("Area via out: " + calculatedArea);

        Console.WriteLine("Sum via params: " + SumValues(1, 2, 3, 4, 5));
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a method called \`Divide\` that takes two integers and uses an \`out\` parameter to return the remainder of the division. Call the method and print both the quotient and the remainder.
  </div>
</div>
`;

// Lesson 8
lessonContents['oop-basics'] = `
<h1 class="page-title">OOP: Classes & Objects</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>C# is a strictly object-oriented language. In this lesson, we will look at classes, instances, constructors, and modern C# Properties.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Auto-Implemented Properties ({ get; set; })</div>
  <p>In C#, rather than writing verbose getter and setter methods, you can use **Auto-Implemented Properties**. The compiler automatically generates the private backing fields, getters, and setters for you behind the scenes, making your code significantly cleaner:</p>
  <pre><code>public string Name { get; set; } // Shorthand property</code></pre>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Classes Code</div>
  <p>Let's run a program declaring classes, constructor chaining, and shorthand properties:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Classes and Objects</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Car {
    // Auto-implemented properties
    public string Model { get; set; }
    public int Year { get; set; }

    // Constructor
    public Car(string model, int year) {
        Model = model;
        Year = year;
    }

    // Chained constructor using 'this'
    public Car(string model) : this(model, 2026) {}

    public void ShowInfo() {
        Console.WriteLine(\$"Model: {Model}, Year: {Year}");
    }
}

class Program {
    static void Main() {
        Car car1 = new Car("Ford Mustang", 2022);
        Car car2 = new Car("Tesla Model Y");

        car1.ShowInfo();
        car2.ShowInfo();
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create a class called \`Student\` with properties \`Name\` (string) and \`Gpa\` (double). Implement a constructor. Instantiate a student, assign values, and print their details.
  </div>
</div>
`;

// Lesson 9
lessonContents['oop-encapsulation'] = `
<h1 class="page-title">OOP: Encapsulation & Access</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Encapsulation hides the internal details of a class. C# provides five access modifiers to control visibility across namespaces and assemblies.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Access Modifiers & Backing Fields</div>
  <p>C# access modifiers control visibility boundaries:</p>
  <ul>
    <li><strong>private</strong>: Restricts access strictly to the declaring class.</li>
    <li><strong>public</strong>: Open and accessible from any code file.</li>
    <li><strong>protected</strong>: Accessible within the class and by child subclasses.</li>
    <li><strong>internal</strong>: Accessible within the same compiled assembly file (project DLL).</li>
  </ul>
  <p>When write custom validation logic in getters/setters, declare a private **backing field** explicitly to hold the value, preventing infinite recursion bugs.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Encapsulation Code</div>
  <p>Let's run a program utilizing encapsulation and backing field validations:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Encapsulation</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Account {
    private double _balance; // Private backing field

    // Public property with validation logic
    public double Balance {
        get { return _balance; }
        set {
            if (value >= 0) {
                _balance = value;
            } else {
                Console.WriteLine("Error: Negative balances are rejected!");
            }
        }
    }
}

class Program {
    static void Main() {
        Account acc = new Account();
        acc.Balance = 500.0; // Invokes setter
        Console.WriteLine("Balance: $" + acc.Balance); // Invokes getter

        acc.Balance = -200.0; // Rejects update
        Console.WriteLine("Balance remains: $" + acc.Balance);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a class named \`Employee\` with a private field \`salary\`. Expose a property \`Salary\` with a setter validation that rejects salary updates below \`1000\`. Test this logic in \`Main()\`.
  </div>
</div>
`;

// Lesson 10
lessonContents['oop-inheritance'] = `
<h1 class="page-title">OOP: Inheritance & Overriding</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Inheritance enables code reuse by deriving child classes from parent classes. C# uses virtual and override keywords to implement dynamic method overriding.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Virtual, Override, and Base Constructor Chaining</div>
  <p>C# enforces strict method overriding rules to prevent compile errors:</p>
  <ul>
    <li><strong>virtual</strong>: You must explicitly mark a method as \`virtual\` in the parent class to allow child classes to override it.</li>
    <li><strong>override</strong>: The child class must use the \`override\` keyword to redefine the parent method.</li>
    <li><strong>base</strong>: Used to call the parent constructor (\`: base(params)\`) or invoke parent methods (\`base.Method()\`).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Inheritance Code</div>
  <p>Let's run a program illustrating inheritance and dynamic overrides:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Inheritance</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Animal {
    public string Name { get; set; }

    public Animal(string name) {
        Name = name;
    }

    public virtual void Speak() {
        Console.WriteLine("Generic animal noise.");
    }
}

class Dog : Animal {
    // Chain constructor call to parent using 'base'
    public Dog(string name) : base(name) {}

    public override void Speak() {
        Console.WriteLine(Name + " says: Woof! Woof!");
    }
}

class Program {
    static void Main() {
        Animal dog = new Dog("Buddy");
        dog.Speak(); // Runs Dog's Speak method
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a parent class called \`Vehicle\` and a child subclass called \`Truck\`. Override a virtual method \`StartEngine()\` to print "Diesel roar!", and verify base construction chains.
  </div>
</div>
`;

// Lesson 11
lessonContents['oop-polymorphism'] = `
<h1 class="page-title">OOP: Polymorphism & Interfaces</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Polymorphism allows objects to take on many forms. C# supports abstract classes and interfaces to implement polymorphism and establish clean contracts.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Abstract Classes vs. Interfaces</div>
  <p>C# provides two abstraction frameworks:</p>
  <ul>
    <li><strong>Abstract Class</strong>: A class declared \`abstract\` that cannot be instantiated. Can contain constructor fields, instance states, and fully defined methods.</li>
    <li><strong>Interface</strong>: A contract definition. Interfaces contain no instance fields (only static final constants) and by default specify abstract signatures. Classes implement interfaces using the \`implements\` keyword. A class can implement multiple interfaces.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Polymorphism Code</div>
  <p>Let's run a program illustrating interfaces and dynamic runtime dispatch polymorphism:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Interfaces & Abstractions</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

interface IDrivable {
    void Drive(); // Interface abstract method
}

class Car : IDrivable {
    public void Drive() {
        Console.WriteLine("Car is driving on roads.");
    }
}

class Boat : IDrivable {
    public void Drive() {
        Console.WriteLine("Boat is cruising on water.");
    }
}

class Program {
    static void Main() {
        IDrivable v1 = new Car();
        IDrivable v2 = new Boat();

        v1.Drive();
        v2.Drive();
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an interface called \`IPaymentMethod\` with a method \`Pay(double amount)\`. Create classes \`CreditCard\` and \`PayPal\` implementing the interface, and write a dynamic payment simulation.
  </div>
</div>
`;

// Lesson 12
lessonContents['collections'] = `
<h1 class="page-title">Collections & Generics</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Unlike raw fixed arrays, C# generic collections dynamically resize automatically and provide type safety, avoiding expensive boxing/unboxing overhead.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Collection Architecture: List, Dictionary, and HashSet</div>
  <p>Common generic containers in the \`System.Collections.Generic\` namespace include:</p>
  <ul>
    <li><strong>List&lt;T&gt;</strong>: A dynamic, ordered list of items.</li>
    <li><strong>Dictionary&lt;TKey, TValue&gt;</strong>: Stores unique key-value pairs for quick lookups.</li>
    <li><strong>HashSet&lt;T&gt;</strong>: An unordered collection containing only unique elements.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Collections Code</div>
  <p>Let's run a program performing list inserts, unique set operations, and key-value lookups:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Generic Collections</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // 1. List
        List&lt;string&gt; list = new List&lt;string&gt;() { "Apple", "Banana" };
        list.Add("Apple"); // Duplicates allowed
        Console.WriteLine("List count: " + list.Count);

        // 2. HashSet
        HashSet&lt;string&gt; set = new HashSet&lt;string&gt;() { "Apple", "Banana" };
        set.Add("Apple"); // Duplicate ignored
        Console.WriteLine("HashSet count: " + set.Count);

        // 3. Dictionary (Key-Value)
        Dictionary&lt;string, int&gt; map = new Dictionary&lt;string, int&gt;();
        map["Alice"] = 95;
        map["Bob"] = 88;
        Console.WriteLine("Bob's score: " + map["Bob"]);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that instantiates a \`List<int>\`, adds 5 values, removes the value at index 2, and prints the remaining items. Create a \`Dictionary<string, double>\` mapping products to prices and print the price values.
  </div>
</div>
`;

// Lesson 13
lessonContents['linq'] = `
<h1 class="page-title">LINQ (Language Integrated Query)</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>LINQ (Language Integrated Query) is a powerful C# feature that allows you to query collections using a SQL-like syntax directly in your C# code.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Query Syntax vs. Method Syntax</div>
  <p>LINQ queries can be written in two ways:</p>
  <ul>
    <li><strong>Query Syntax</strong>: Reads like SQL, starting with \`from\` and ending with \`select\`.</li>
    <li><strong>Method Syntax</strong>: Uses extension methods and lambda expressions (\`Where\`, \`Select\`, \`OrderBy\`), which is more common and powerful in modern C#.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> LINQ Code</div>
  <p>Let's run a program filtering and sorting list collections using LINQ expressions:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — LINQ Queries</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;
using System.Collections.Generic;
using System.Linq; // Required for LINQ extension methods

class Program {
    static void Main() {
        List&lt;int&gt; numbers = new List&lt;int&gt;() { 1, 4, 8, 12, 15, 20 };

        // Filter numbers greater than 10 (using Method Syntax)
        var filtered = numbers.Where(n => n > 10).ToList();
        
        Console.Write("Numbers > 10: ");
        foreach (var num in filtered) {
            Console.Write(num + " ");
        }
        Console.WriteLine();

        // Sort names alphabetically
        List&lt;string&gt; names = new List&lt;string&gt;() { "Charlie", "Alice", "Bob" };
        var sortedNames = names.OrderBy(name => name).ToList();
        
        Console.WriteLine("Sorted Names: " + string.Join(", ", sortedNames));
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a LINQ query that filters an array of test scores, returning only scores that are 80 or above, sorted in descending order. Output the filtered scores.
  </div>
</div>
`;

// Lesson 14
lessonContents['exceptions'] = `
<h1 class="page-title">Exception Handling</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Exceptions are runtime disruptions caused by errors. C# uses try-catch-finally blocks to handle errors gracefully, preventing application crashes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Try-Catch-Finally Flow Control</div>
  <p>Exception handling flows systematically:</p>
  <ul>
    <li><strong>try</strong>: Wraps code blocks that may throw exceptions.</li>
    <li><strong>catch</strong>: Intercepts and handles errors if they occur.</li>
    <li><strong>finally</strong>: Executes cleanup code after try/catch, regardless of whether an error was thrown.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Exception Code</div>
  <p>Let's run a program handling a division-by-zero error using try-catch blocks:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Exceptions</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;

class Program {
    static void Main() {
        try {
            int x = 10;
            int y = 0;
            int result = x / y; // Throws DivideByZeroException
        } catch (DivideByZeroException e) {
            Console.WriteLine("Exception Caught: Division by zero is invalid.");
        } finally {
            Console.WriteLine("Finally block executed. Resources released.");
        }

        Console.WriteLine("Program continues execution smoothly...");
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a method called \`CheckAge(int age)\` that throws an \`ArgumentOutOfRangeException\` if age is negative. Test it inside a try-catch block in \`Main()\` and print the caught error message.
  </div>
</div>
`;

// Lesson 15
lessonContents['files'] = `
<h1 class="page-title">File I/O & disposable streams</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>C# interacts with storage drives using file streams. C# provides the <code>using</code> keyword to automatically dispose of and close stream resources after execution.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Auto-Disposing Resources via using Declarations</div>
  <p>Failing to close file streams causes memory leaks and file lock issues. C# implements the **\`using\` declaration** (objects that implement the \`IDisposable\` interface). When execution leaves the scope of the using block, the compiler automatically calls \`Dispose()\` to close and release the resource, ensuring memory safety even if exceptions occur.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> File Operations Code</div>
  <p>Let's run a program writing text to a file and reading it back using \`StreamWriter\` and \`StreamReader\`:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — File Operations</span>
      <a class="try-btn" href="/?lang=csharp">▶ Run Code</a>
    </div>
    <pre><code>using System;
using System.IO; // Required for file operations

class Program {
    static void Main() {
        string path = "demo.txt";

        // Auto-disposing StreamWriter
        using (StreamWriter writer = new StreamWriter(path)) {
            writer.WriteLine("C# File Operations are safe and clean!");
        } // 'writer' is automatically closed and disposed of here

        // Auto-disposing StreamReader
        using (StreamReader reader = new StreamReader(path)) {
            string content = reader.ReadToEnd();
            Console.WriteLine("File Content: " + content);
        }
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that writes three numbers to a file named \`numbers.txt\`. Open the file, read the numbers line-by-line, parse them as integers, and print their computed sum. Ensure you use \`using\` declarations.
  </div>
</div>
`;

// Build lessons
console.log('Starting C# lesson generation...');

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

// Generate main index page: blog-csharp.html
const indexContent = `
<h1 class="page-title">C# Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">🔷 C# Programming</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>C# (C-Sharp) is an exceptionally powerful, modern, type-safe, object-oriented programming language designed by Microsoft. Running on the .NET compiler framework, C# utilizes the Common Language Runtime (CLR) with JIT optimization to deliver maximum performance. In this comprehensive guide, you will master C# variable types, operators, modern switch expressions, multidimensional arrays, parameter modifiers, class properties, polymorphic interface structures, generic collections, SQL-like LINQ database queries, and disposable file I/O operations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning C#:</p>
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
  'C# Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-csharp.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-csharp.html');
console.log('🎉 Successfully generated all 15 C# tutorial files inside blog-csharp/ folder!');
