const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// Java Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-java-intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Primitive Types', filename: 'blog-java-variables.html' },
  { slug: 'operators', num: 3, title: 'Operators & Expressions', filename: 'blog-java-operators.html' },
  { slug: 'strings', num: 4, title: 'Strings & Manipulation', filename: 'blog-java-strings.html' },
  { slug: 'conditionals', num: 5, title: 'Conditionals (if-else & switch)', filename: 'blog-java-conditionals.html' },
  { slug: 'loops', num: 6, title: 'Loops & Control Flow', filename: 'blog-java-loops.html' },
  { slug: 'arrays', num: 7, title: 'Arrays (Single & Multi)', filename: 'blog-java-arrays.html' },
  { slug: 'input', num: 8, title: 'Reading User Input (Scanner)', filename: 'blog-java-input.html' },
  { slug: 'methods', num: 9, title: 'Methods & Parameters', filename: 'blog-java-methods.html' },
  { slug: 'oop-basics', num: 10, title: 'OOP: Classes & Objects', filename: 'blog-java-oop-basics.html' },
  { slug: 'oop-encapsulation', num: 11, title: 'OOP: Encapsulation & Access', filename: 'blog-java-oop-encapsulation.html' },
  { slug: 'oop-inheritance', num: 12, title: 'OOP: Inheritance & Overriding', filename: 'blog-java-oop-inheritance.html' },
  { slug: 'oop-polymorphism', num: 13, title: 'OOP: Polymorphism & Interfaces', filename: 'blog-java-oop-polymorphism.html' },
  { slug: 'collections', num: 14, title: 'Collections Framework', filename: 'blog-java-collections.html' },
  { slug: 'exceptions', num: 15, title: 'Exception Handling', filename: 'blog-java-exceptions.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Java Tutorial</div>\n`;
  html += `    <a href="/blog-java.html"${activeSlug === 'home' ? ' class="active"' : ''}>Java HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=java">▶ Try Java Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
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
    navFooter += `      <a href="/blog-java.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Java Overview</span>\n`;
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
  <meta name="description" content="Learn Java — ${title} with clear explanations, unique examples, common mistakes, and interactive execution." />
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
              const langId = urlParams.get('lang') || 'java';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-java">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html" class="active">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
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
      <a href="/blog-java.html">Java</a><span>›</span>
      <span>Lesson ${slug === 'home' ? 'Index' : lessons.find(x => x.slug === slug).num}</span>
    </div>
    
    ${mainContent}
    
    ${navFooter}
  </main>
</div>
</body>
</html>`;
}

// Complete lesson contents
const lessonContents = {};

// Lesson 1
lessonContents['intro'] = `
<h1 class="page-title">Welcome & Hello World</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Welcome to Java! Java is a robust, class-based, object-oriented programming language used by millions of developers globally. In this first lesson, we will understand how Java works, look at its compilation model, and write our first program.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Compiling vs. Interpreting (JVM, JRE, JDK)</div>
  <p>Unlike languages that compile directly to raw machine code (like C++) or are directly interpreted line-by-line (like Python), Java utilizes a unique <strong>two-stage</strong> compilation and execution system:</p>
  <ul>
    <li><strong>JDK (Java Development Kit)</strong>: The toolkit used by developers to write and compile programs. It contains the compiler (\`javac\`).</li>
    <li><strong>JRE (Java Runtime Environment)</strong>: The environment required to run Java applications. It contains the JVM and core library classes.</li>
    <li><strong>JVM (Java Virtual Machine)</strong>: The engine that executes compiled Java bytecode. The JVM translates bytecode into local computer instruction sets.</li>
  </ul>
  <p><strong>The Workflow:</strong> You write Java source code (\`.java\`), compile it using \`javac\` into Bytecode (\`.class\`), and run it inside the JVM on any system. This is what enables <em>"Write Once, Run Anywhere" (WORA)</em>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Your First Program: Main Method Signature</div>
  <p>Let's analyze the classic "Hello, World!" program in Java. In Java, every line of executable code must exist inside a class definition:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Hello World</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.print("Welcome to Our Compiler!");
    }
}</code></pre>
  </div>

  <p>Let's break down the method signature word-by-word:</p>
  <ul>
    <li><strong>public</strong>: Visible to everyone. The JVM must access this method to run your application.</li>
    <li><strong>static</strong>: The JVM can call this method without instantiating an object of the class.</li>
    <li><strong>void</strong>: The method returns no value.</li>
    <li><strong>main</strong>: The keyword name that acts as the entry point of every Java program.</li>
    <li><strong>String[] args</strong>: An array of text strings passed as arguments to the program via command line execution.</li>
  </ul>
  <p>Note: <strong>System.out.println()</strong> writes the text and moves the cursor to a new line, whereas <strong>System.out.print()</strong> keeps the cursor on the same line.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Modify the code in the editor above to output three lines. The first line should output your name, the second your favorite programming language, and the third a welcome greeting. Ensure you use a mix of \`println()\` and \`print()\` to understand formatting.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables & Primitive Types</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Java is a strictly, statically-typed programming language. This means you must explicitly declare the data type of every variable before you store values in them, and this type cannot change later.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Primitive Data Types</div>
  <p>Java features 8 built-in primitive data types. They store raw values directly in memory (on the stack) rather than references to objects:</p>
  <table class="tbl">
    <tr><th>Type</th><th>Size</th><th>Default Value</th><th>Stores</th></tr>
    <tr><td><strong>byte</strong></td><td>1 byte (8 bits)</td><td>0</td><td>Integers from -128 to 127</td></tr>
    <tr><td><strong>short</strong></td><td>2 bytes</td><td>0</td><td>Integers from -32,768 to 32,767</td></tr>
    <tr><td><strong>int</strong></td><td>4 bytes</td><td>0</td><td>Integers from -2 Billion to 2 Billion (Standard default)</td></tr>
    <tr><td><strong>long</strong></td><td>8 bytes</td><td>0L</td><td>Massive integers (must append \`L\` suffix)</td></tr>
    <tr><td><strong>float</strong></td><td>4 bytes</td><td>0.0f</td><td>Single precision floating points (must append \`f\` suffix)</td></tr>
    <tr><td><strong>double</strong></td><td>8 bytes</td><td>0.0d</td><td>Double precision floating points (Standard default)</td></tr>
    <tr><td><strong>boolean</strong></td><td>1 bit (virtual)</td><td>false</td><td>\`true\` or \`false\` values</td></tr>
    <tr><td><strong>char</strong></td><td>2 bytes</td><td>'\\u0000'</td><td>Single UTF-16 characters (surrounded by single quotes)</td></tr>
  </table>
  <blockquote>
    <strong>⚠️ Warning:</strong> If you write a decimal number like \`3.14\`, Java treats it as a \`double\`. If you attempt to assign it directly to a \`float\` variable without the \`f\` suffix (e.g. \`float f = 3.14;\`), the compiler will throw an error due to potential loss of precision.
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Declaring and Casting Variables</div>
  <p>Let's write a program declaring different data types and exploring widening vs. narrowing conversions:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Data Types and Casting</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    public static void main(String[] args) {
        int age = 25;
        double price = 19.99;
        float pi = 3.14159f;
        long stars = 10000000000L;
        char grade = 'A';
        boolean isActive = true;

        System.out.println("Integer value: " + age);
        
        // Implicit Casting (Widening): Small to Large type
        double castedAge = age; 
        System.out.println("Implicit cast (int -> double): " + castedAge);

        // Explicit Casting (Narrowing): Large to Small type (risk of loss)
        double score = 98.76;
        int integerScore = (int) score; // Fractional part is truncated
        System.out.println("Explicit cast (double -> int): " + integerScore);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that defines an integer representation of a product price (e.g. 299) and casting it to a double. Then, create a double representation of a temperature (e.g. 36.6) and manually narrow-cast it into an integer, printing both values to verify the truncation.
  </div>
</div>
`;

// Lesson 3
lessonContents['operators'] = `
<h1 class="page-title">Operators & Expressions</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Operators are symbols used to perform operations on variables and values. Java includes standard arithmetic, assignment, relational, and logical operators.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Arithmetic & Operator Precedence (PEMDAS)</div>
  <p>Java evaluates expressions using operator precedence similar to mathematical PEMDAS rules (Parentheses, Multiplication/Division/Modulus, Addition/Subtraction). Modulus (\`%\`) yields the remainder of a division.</p>
  
  <blockquote>
    <strong>⚠️ Integer Division Caveat:</strong> Dividing two integers in Java always yields an integer. For example, \`5 / 2\` evaluates to \`2\`, not \`2.5\`. To get decimal precision, at least one operand must be a double/float: \`5.0 / 2\` evaluates to \`2.5\`.
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Increment and Decrement: Prefix vs Postfix</div>
  <p>The increment operator (\`++\`) increases a variable's value by 1. However, where it is placed changes execution behavior:</p>
  <ul>
    <li><strong>Postfix (\`x++\`)</strong>: The current value of \`x\` is evaluated in the expression <em>first</em>, and then \`x\` is incremented.</li>
    <li><strong>Prefix (\`++x\`)</strong>: \`x\` is incremented <em>first</em>, and then its new value is evaluated in the expression.</li>
  </ul>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Arithmetic & Increments</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 5;
        
        System.out.println("Basic Division: " + (a / b));
        System.out.println("Integer Division Caveat (5 / 2): " + (5 / 2));
        System.out.println("Fixed Division (5.0 / 2): " + (5.0 / 2));

        // Prefix vs Postfix Tracing
        int x = 5;
        int y = x++; // y gets 5, then x becomes 6
        System.out.println("Postfix: y=" + y + ", x=" + x);

        int p = 5;
        int q = ++p; // p becomes 6, then q gets 6
        System.out.println("Prefix: q=" + q + ", p=" + p);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Logical Operators & Short-Circuit Evaluation</div>
  <p>Logical operators combine multiple conditional states:</p>
  <ul>
    <li><strong>And (\`&&\`)</strong>: Evaluates to true if both conditions are true.</li>
    <li><strong>Or (\`||\`)</strong>: Evaluates to true if at least one condition is true.</li>
    <li><strong>Not (\`!\`)</strong>: Inverts boolean states.</li>
  </ul>
  <p><strong>Short-Circuiting:</strong> If Java evaluates the first argument of an \`&&\` operator as \`false\`, it knows the overall result will be \`false\` and skips evaluating the second argument entirely. Similarly, if the first argument of \`||\` is \`true\`, the second is skipped. This prevents unnecessary computation and potential runtime exceptions.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that initializes \`int count = 10\`. Print out the result of \`count++\` and then \`++count\`. Add a short-circuit expression checking if \`(count > 10 || (10 / 0 == 0))\` and explain why this code does not crash with an ArithmeticException.
  </div>
</div>
`;

// Lesson 4
lessonContents['strings'] = `
<h1 class="page-title">Strings & Manipulation</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Unlike primitives, strings in Java are reference objects of the <code>String</code> class. Java handles Strings in a highly optimized way via the String Pool.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> String Immutability and the String Pool</div>
  <p>Strings in Java are <strong>immutable</strong>; once created, their characters cannot be modified. Any manipulation method (like \`toUpperCase()\`) returns a brand new String object rather than editing the existing one.</p>
  <p>To save memory, JVM houses a <strong>String Constant Pool</strong>. When you initialize a String using literal syntax (e.g. \`String s1 = "Hello"\`), the JVM checks the pool. If "Hello" exists, \`s1\` references it. If you initialize using \`new String("Hello")\`, Java creates a completely separate object in the heap. Therefore:</p>
  <ul>
    <li>\`s1 == s2\` compares memory addresses (reference equality).</li>
    <li>\`s1.equals(s2)\` compares literal character values (structural equality).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Common String Methods & StringBuilder</div>
  <p>Let's run a program demonstrating core String methods and compare String concatenation with \`StringBuilder\` performance:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — String Manipulation</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    public static void main(String[] args) {
        String greeting = "  Hello, Java Learners!  ";
        
        // Basic methods
        System.out.println("Length: " + greeting.length());
        System.out.println("Trimmed: '" + greeting.trim() + "'");
        System.out.println("Substring(9, 13): " + greeting.trim().substring(7, 11));
        
        // Equality comparison
        String str1 = "Java";
        String str2 = new String("Java");
        System.out.println("Comparing addresses (==): " + (str1 == str2));
        System.out.println("Comparing content (.equals): " + str1.equals(str2));

        // StringBuilder for modifications
        StringBuilder builder = new StringBuilder("Beginning");
        builder.append(" and Middle");
        builder.insert(0, "The ");
        System.out.println("StringBuilder Result: " + builder.toString());
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create two string variables: one literal \`"Programming"\` and one using the \`new String("Programming")\` constructor. Write statements checking their equality with \`==\` and \`.equals()\`. Print out the results. Then use a \`StringBuilder\` to reverse the string and print the reversed value.
  </div>
</div>
`;

// Lesson 5
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & switch)</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control program branch paths based on boolean evaluations. Java supports standard if-else blocks, ternary evaluations, and modern switch expressions.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Compound Conditionals and Nested structures</div>
  <p>Conditional logic uses relational variables to test conditions. If-else structures can be nested inside one another to construct complex flow routes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Classic Switch vs. Modern Java 14+ Switch Expressions</div>
  <p>Traditional switch statements use the \`case\` and \`break\` syntax. If you omit a \`break\`, execution falls through to the next case. Java 14 introduced modern <strong>Switch Expressions</strong> which use the arrow (\`->\`) syntax. This syntax is clean, prevents fall-through errors, and can return values directly.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Conditionals and Switches</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    public static void main(String[] args) {
        int score = 85;

        // If-else structure
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C or below");
        }

        // Ternary operator evaluation
        String result = (score >= 50) ? "Passed" : "Failed";
        System.out.println("Exam Result: " + result);

        // Modern Switch Expression (Java 14+)
        int dayOfWeek = 3;
        String dayName = switch (dayOfWeek) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4, 5 -> "Weekend threshold";
            default -> "Invalid Day";
        };
        System.out.println("Day status: " + dayName);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a nested conditional checking if a person is old enough to drive (age 16+) and if they possess a valid license (boolean variable). If they have both, print "Safe to drive". Otherwise, specify why they cannot drive. Add a modern switch expression evaluating a character grade ('A', 'B', 'C') to output descriptive reviews (e.g. 'A' -> "Excellent").
  </div>
</div>
`;

// Lesson 6
lessonContents['loops'] = `
<h1 class="page-title">Loops & Control Flow</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Loops repeat code blocks as long as a condition remains true. Java features three primary loop constructs: <code>for</code>, <code>while</code>, and <code>do-while</code>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Loop Structures: while, do-while, and for</div>
  <p>Different loop configurations suit different tasks:</p>
  <ul>
    <li><strong>while</strong>: Evaluates its condition before checking the block. May execute 0 times.</li>
    <li><strong>do-while</strong>: Executes the block first, then evaluates the condition. <em>Guaranteed to run at least once!</em></li>
    <li><strong>for</strong>: Best when the iteration count is known beforehand. Declares initializer, condition, and step increment in one line.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Iteration Tracing & Loop Control (Break / Continue)</div>
  <p>Loop execution can be dynamically controlled:</p>
  <ul>
    <li><strong>break</strong>: Terminates the loop structure immediately.</li>
    <li><strong>continue</strong>: Skips the remaining statement blocks in the current iteration and jumps to the next condition evaluation.</li>
  </ul>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Loops and Flow Control</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    public static void main(String[] args) {
        // Standard For Loop
        System.out.print("For iteration: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // While Loop with loop control
        System.out.print("While iteration (skipping 3, breaking at 6): ");
        int count = 1;
        while (count <= 10) {
            if (count == 3) {
                count++;
                continue; // Skip printing 3
            }
            if (count == 6) {
                break; // Exit loop completely
            }
            System.out.print(count + " ");
            count++;
        }
        System.out.println();

        // Do-While loop execution guarantee
        int val = 100;
        do {
            System.out.println("Do-while block runs even though condition is false!");
        } while (val < 10);
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that uses a loop to compute the sum of all odd numbers between 1 and 20. Print the final computed sum. Extend it by adding a check inside the loop to skip the number 9 completely using the \`continue\` keyword.
  </div>
</div>
`;

// Lesson 7
lessonContents['arrays'] = `
<h1 class="page-title">Arrays (Single & Multi-Dimensional)</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Arrays are fixed-size containers that store elements of the same data type. Once initialized, their lengths cannot be changed.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Declaring, Initializing, and Array Memory</div>
  <p>In Java, arrays are objects. Memory space is allocated on the heap, and variables hold reference addresses pointing to that space. Declaring an array can be done in two ways:</p>
  <ul>
    <li>\`int[] numbers = new int[5];\` (Allocates size but contents default to 0)</li>
    <li>\`int[] numbers = {1, 2, 3, 4, 5};\` (Inline literal initialization)</li>
  </ul>
  <blockquote>
    <strong>⚠️ Warning:</strong> Accessing an index outside of \`0\` to \`length - 1\` throws an \`ArrayIndexOutOfBoundsException\`. Always guard index parameters.
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Matrix iteration & Safe Array Copies</div>
  <p>Because arrays are references, writing \`int[] copy = original;\` merely copies the address. Any change in \`copy\` alters \`original\`. To perform a true, safe copy, use \`System.arraycopy()\` or \`Arrays.copyOf()\`. Let's test single arrays, matrices, and copying:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Arrays & Matrices</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // Single-dimensional array
        int[] scores = {90, 85, 78, 92};
        System.out.println("Original array: " + Arrays.toString(scores));

        // Safe array copy
        int[] safeCopy = Arrays.copyOf(scores, scores.length);
        safeCopy[0] = 100;
        System.out.println("Modified copy: " + Arrays.toString(safeCopy));
        System.out.println("Original untouched: " + Arrays.toString(scores));

        // Multi-dimensional array (2D Matrix: Rows x Columns)
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6}
        };
        
        System.out.println("Iterating over 2D Matrix:");
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                System.out.print(matrix[r][c] + " ");
            }
            System.out.println();
        }
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an array of 6 integers. Initialize them with random scores. Write a loop to find and print the maximum value in the array. Then create a 2D array of size 2x2 representing a coordinates grid, fill it, and output all points.
  </div>
</div>
`;

// Lesson 8
lessonContents['input'] = `
<h1 class="page-title">Reading User Input (Scanner)</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>To build interactive programs, we need to read values from the console. Java provides the <code>Scanner</code> class inside the <code>java.util</code> package to capture standard input streams.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Scanner Methods & Buffer Flushing issues</div>
  <p>The \`Scanner\` class provides different methods for reading data types:</p>
  <ul>
    <li>\`nextInt()\`: Reads the next integer tokens.</li>
    <li>\`nextDouble()\`: Reads decimal tokens.</li>
    <li>\`next()\`: Reads a single word token (stops at spaces).</li>
    <li>\`nextLine()\`: Reads an entire line of text including spaces.</li>
  </ul>
  
  <blockquote>
    <strong>⚠️ Critical Gotcha: The Newline Buffer Issue</strong><br>
    When you input a number and press Enter (e.g. \`nextInt()\`), Java reads the number token but leaves the trailing newline character (\`\\n\`) sitting in the buffer. If you subsequently call \`nextLine()\`, it instantly consumes that leftover newline and returns empty text without waiting for user input. To fix this, always call a dummy \`scanner.nextLine()\` to "flush" the buffer after reading numbers before reading strings.
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Interactive Scanner Code</div>
  <p>Let's run a program that reads name, age, and details safely with proper buffer flushes:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Scanner Input</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Setup scanner reading standard input stream
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your Age: ");
        int age = scanner.nextInt();
        
        // 🚨 CRITICAL: Flush the newline character from the buffer!
        scanner.nextLine(); 
        
        System.out.print("Enter your Full Name: ");
        String name = scanner.nextLine();
        
        System.out.println("Hello, " + name + "! You are " + age + " years old.");
        
        // Good practice: Close the resource streams
        scanner.close();
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an interactive calculator program. Use Scanner to ask the user to input two numbers, and then input their choice of operator (\`+\`, \`-\`, \`*\`). Compute and print the result. Use a buffer flush appropriately if you read numbers before strings/chars.
  </div>
</div>
`;

// Lesson 9
lessonContents['methods'] = `
<h1 class="page-title">Methods & Parameters</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Methods are reusable, modular code blocks that perform specific operations. In Java, methods must reside inside classes and define return types and argument signatures.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Method Declarations & Overloading</div>
  <p>A method structure contains a visibility modifier, return type, name, and parameter list:</p>
  <ul>
    <li><strong>Method Signature</strong>: Comprises the method name and parameter types. Return types are not part of the signature.</li>
    <li><strong>Method Overloading</strong>: Defining multiple methods with the <em>same name</em> but <em>different parameter lists</em> (number, order, or type of arguments).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Pass-by-Value in Java</div>
  <p><strong>Java is strictly Pass-by-Value.</strong> When passing arguments to a method:</p>
  <ul>
    <li>For <strong>primitives</strong>, Java copies the value. Modifications inside the method do not affect the original variable.</li>
    <li>For <strong>objects</strong>, Java copies the reference pointer address. Modifying properties of the object inside the method <em>does</em> affect the original object because both reference copies point to the same memory heap location.</li>
  </ul>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Methods & Overloading</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    // Basic method returning integer
    public static int add(int x, int y) {
        return x + y;
    }

    // Overloaded method adding doubles
    public static double add(double x, double y) {
        return x + y;
    }

    // Demonstrating pass-by-value on primitive
    public static void modifyPrimitive(int val) {
        val = 100; // Altering local copy only
    }

    public static void main(String[] args) {
        int sumInt = add(5, 10);
        double sumDouble = add(2.5, 3.5);
        System.out.println("Integer Sum: " + sumInt);
        System.out.println("Overloaded Double Sum: " + sumDouble);

        int originalNum = 10;
        modifyPrimitive(originalNum);
        System.out.println("Primitive after modification call: " + originalNum); // Remains 10
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a method called \`calculateArea\` that takes a single double parameter (representing a circle's radius) and returns its computed area. Overload this method by defining another \`calculateArea\` that takes two parameters (double length, double width) to compute a rectangle's area. Call both inside \`main()\` and print results.
  </div>
</div>
`;

// Lesson 10
lessonContents['oop-basics'] = `
<h1 class="page-title">OOP: Classes & Objects</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Java is built entirely around Object-Oriented Programming (OOP). OOP organizes software around data models called objects, which are instances of structures called classes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Classes, Instances, and Constructors</div>
  <p>A **Class** is a blueprint/template. An **Object** is the concrete instance created in heap memory from that template using the \`new\` keyword. Classes contain:</p>
  <ul>
    <li><strong>Fields (Instance Variables)</strong>: The data states of the object.</li>
    <li><strong>Constructors</strong>: Special initialization methods block invoked when creating objects. Constructors match the class name exactly and have no return type.</li>
    <li><strong>Methods</strong>: Behaviors the object can execute.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Constructor Chaining using this()</div>
  <p>You can define multiple constructors (overloading). Using the keyword \`this()\` as the first line inside a constructor allows you to call another constructor inside the same class. This is called constructor chaining and reduces duplicate code. Let's inspect object construction:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — OOP Classes & Objects</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>class Car {
    String model;
    int year;

    // Parameterized Constructor
    Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    // Overloaded Constructor calling the main one (Chaining)
    Car(String model) {
        this(model, 2026); // Default year to 2026
    }

    void displayInfo() {
        System.out.println("Car model: " + model + ", Year: " + year);
    }
}

public class Main {
    public static void main(String[] args) {
        // Instantiate using parameterized constructor
        Car myCar1 = new Car("Toyota Supra", 2022);
        
        // Instantiate using chained constructor
        Car myCar2 = new Car("Tesla Model S");

        myCar1.displayInfo();
        myCar2.displayInfo();
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a class representing a \`Student\`. Give it two fields: \`String name\` and \`int gradeLevel\`. Create a main constructor that accepts both, and a default chained constructor that takes only a name and passes a default grade level of 1. Write an instance method showing student details, instantiate both students, and print details.
  </div>
</div>
`;

// Lesson 11
lessonContents['oop-encapsulation'] = `
<h1 class="page-title">OOP: Encapsulation & Access</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Encapsulation is one of the four main pillars of OOP. It refers to bundling data fields and behaviors into a single class unit and restricting direct access to prevent corruption.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Access Modifiers & Data Hiding</div>
  <p>Java supports four levels of access modifiers to control visibility:</p>
  <ul>
    <li><strong>private</strong>: Access is restricted strictly to the declaring class. Highly recommended for instance variables.</li>
    <li><strong>default (no keyword)</strong>: Package-private. Accessible only inside the same package folder.</li>
    <li><strong>protected</strong>: Accessible in the same package and by child subclasses in other packages.</li>
    <li><strong>public</strong>: Open and accessible from any package.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Getters, Setters, and Validation</div>
  <p>To expose private fields safely, we write **Getter** (retrieval) and **Setter** (modification) methods. Setters allow us to validate values before committing changes, preventing invalid data states (like negative balances or ages).</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — OOP Encapsulation</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>class BankAccount {
    private String owner;
    private double balance;

    BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        setBalance(initialBalance); // Use setter for safe validation
    }

    // Getter
    public double getBalance() {
        return this.balance;
    }

    // Setter with input guard validations
    public void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        } else {
            System.out.println("Error: Negative balances are not permitted!");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("Alice", 500.0);
        System.out.println("Initial Balance: $" + account.getBalance());
        
        // Try invalid update
        account.setBalance(-200.0);
        System.out.println("Balance remains: $" + account.getBalance());
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Design a class named \`Employee\` with private fields: \`name\` and \`salary\`. Provide a constructor, getters, and setters. Inside the \`setSalary(double salary)\` method, add a validation check that rejects any salary update below 1000. Test this validation in \`main()\` with correct and incorrect salary attempts.
  </div>
</div>
`;

// Lesson 12
lessonContents['oop-inheritance'] = `
<h1 class="page-title">OOP: Inheritance & Overriding</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Inheritance allows a new class (subclass) to inherit fields and behaviors from an existing class (superclass). This promotes reuse and establishes hierarchical relationships.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Extends & The super Keyword</div>
  <p>Inheritance uses the **extends** keyword. A subclass automatically inherits all public/protected methods and fields. To work with parent assets:</p>
  <ul>
    <li>\`super()\`: Invokes the parent class's constructor. This must be the very first line inside the subclass constructor.</li>
    <li>\`super.method()\`: Invokes a parent method that has been overridden in the child subclass.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Method Overriding & Overriding Rules</div>
  <p>**Method Overriding** occurs when a subclass provides a specific implementation for a method already defined in its parent class. Overridden methods must match the parent method name, return type, and parameters exactly. It is best practice to label them with the \`@Override\` annotation, which tells the compiler to check validation rules.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Inheritance & Super</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void makeNoise() {
        System.out.println("Some general animal sound.");
    }
}

// Subclass inheriting from Animal
class Dog extends Animal {
    Dog(String name) {
        super(name); // Calling the superclass constructor
    }

    @Override
    void makeNoise() {
        System.out.println(name + " says: Woof! Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy");
        dog.makeNoise(); // Invokes child overridden method
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create a superclass called \`Vehicle\` with a field \`brand\` and constructor. Add a method \`startEngine()\` printing "Engine started". Create a subclass \`Truck\` that extends \`Vehicle\`. Override \`startEngine()\` to print "Diesel engine roar!". Instantiate \`Truck\`, verify super calls, and print details.
  </div>
</div>
`;

// Lesson 13
lessonContents['oop-polymorphism'] = `
<h1 class="page-title">OOP: Polymorphism & Interfaces</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Polymorphism allows objects to take on many forms. It enables a parent type reference to hold a child subclass object, executing runtime dynamic method dispatch.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Abstract Classes vs Interfaces</div>
  <p>Java supports two abstraction frameworks:</p>
  <ul>
    <li><strong>Abstract Class</strong>: A class declared \`abstract\` that cannot be instantiated. Can contain constructor fields, instance states, and fully defined methods alongside abstract method signatures.</li>
    <li><strong>Interface</strong>: A contract definition. Interfaces contain no instance fields (only static final constants) and by default specify abstract signatures. Classes implement interfaces using the \`implements\` keyword. A class can implement multiple interfaces.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Polymorphism and Dynamic Method Dispatch</div>
  <p>When you reference a child object using a parent type, Java decides which method implementation to run <strong>at runtime</strong> based on the actual object type, not the reference type. Let's observe this pattern:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Abstraction and Interfaces</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>interface Drivable {
    void drive(); // Interface abstract method
}

class Car implements Drivable {
    @Override
    public void drive() {
        System.out.println("Car is driving on roads.");
    }
}

class Boat implements Drivable {
    @Override
    public void drive() {
        System.out.println("Boat is cruising on water.");
    }
}

public class Main {
    public static void main(String[] args) {
        // Polymorphism: Reference type is the interface, object is concrete child
        Drivable v1 = new Car();
        Drivable v2 = new Boat();

        // Dynamic Method Dispatch determines execution at runtime
        v1.drive();
        v2.drive();
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write an interface called \`PaymentMethod\` with an abstract method \`pay(double amount)\`. Create two classes implementing this interface: \`CreditCard\` and \`PayPal\`. Write a main simulation demonstrating polymorphic method dispatch by storing them inside an array of type \`PaymentMethod[]\` and looping through to invoke payments.
  </div>
</div>
`;

// Lesson 14
lessonContents['collections'] = `
<h1 class="page-title">Collections Framework</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Unlike raw arrays, Java Collections provide dynamic resizing frameworks. The framework includes lists, sets, and key-value maps to store objects.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Collection Architecture: List, Set, and Map</div>
  <p>The primary elements of the collection framework are:</p>
  <ul>
    <li><strong>List (ArrayList)</strong>: An ordered container that allows duplicates. Excellent for random index access.</li>
    <li><strong>Set (HashSet)</strong>: An unordered container that rejects duplicates. Quick validation checks for existence.</li>
    <li><strong>Map (HashMap)</strong>: Stores key-value pairings (e.g. usernames paired with user IDs). Keys must be unique.</li>
  </ul>
  <blockquote>
    <strong>⚠️ Wrapper Class Notice:</strong> Collections can only store Objects, not raw primitives. If you want to store integers inside an ArrayList, Java uses <strong>Auto-boxing</strong> to convert \`int\` primitives into their object wrappers automatically: \`ArrayList&lt;Integer&gt; list = new ArrayList&lt;&gt;();\`.
  </blockquote>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Collections Operations</div>
  <p>Let's run a program declaring Lists, Sets, and Maps, performing insertions and reads:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Collections Framework</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        // ArrayList: Ordered list
        ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
        list.add("Apple");
        list.add("Banana");
        list.add("Apple"); // Duplicates allowed
        System.out.println("List: " + list);

        // HashSet: Unique values
        HashSet&lt;String&gt; set = new HashSet&lt;&gt;();
        set.add("Apple");
        set.add("Banana");
        set.add("Apple"); // Duplicate ignored
        System.out.println("Set: " + set);

        // HashMap: Key-Value pairs
        HashMap&lt;String, Integer&gt; map = new HashMap&lt;&gt;();
        map.put("Alice", 95);
        map.put("Bob", 88);
        System.out.println("Map: " + map);
        System.out.println("Bob's Score: " + map.get("Bob"));
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that instantiates an \`ArrayList\` of integers, adds 5 arbitrary values, removes the value at index 2, and prints the list. Then declare a \`HashMap\` to map product names (String) to prices (Double). Add items and print price values.
  </div>
</div>
`;

// Lesson 15
lessonContents['exceptions'] = `
<h1 class="page-title">Exception Handling</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Exceptions are runtime disruptions that occur due to errors (e.g. file not found, index bounds, zero division). Proper handling prevents applications from crashing.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Checked vs. Unchecked Exceptions</div>
  <p>Java divides exceptions into two primary branches:</p>
  <ul>
    <li><strong>Unchecked Exceptions (Runtime Exceptions)</strong>: Occur due to programming logic mistakes (e.g. \`NullPointerException\`, \`ArithmeticException\`). The compiler does not force you to handle them.</li>
    <li><strong>Checked Exceptions</strong>: Checked at compilation time (e.g. \`IOException\`, \`SQLException\`). The compiler forces you to either handle them inside a \`try-catch\` block or declare them in your method signature using the \`throws\` keyword.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Try-Catch-Finally Flow Control</div>
  <p>Let's look at standard error handling flow. The \`finally\` block is guaranteed to execute regardless of whether an exception is thrown or caught, which is useful for releasing system resources:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Java — Exceptions</span>
      <a class="try-btn" href="/?lang=java">▶ Run Code</a>
    </div>
    <pre><code>public class Main {
    public static void main(String[] args) {
        try {
            int numerator = 10;
            int denominator = 0;
            int result = numerator / denominator; // 🚨 Throws ArithmeticException
            System.out.println("Result: " + result); // Will be skipped
        } catch (ArithmeticException e) {
            System.out.println("Exception caught: Cannot divide by zero!");
        } finally {
            System.out.println("Finally block executed! Resources closed.");
        }
        
        System.out.println("Program successfully continues running...");
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a method called \`verifyAge(int age)\` that throws an \`IllegalArgumentException\` if the age is negative. Call this method inside a try-catch block in \`main()\`, pass in a negative parameter value, catch the exception, and print its message.
  </div>
</div>
`;

// Now let's build the pages
console.log('Starting Java lesson generation...');

// Write individual pages
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

// Generate main index page: blog-java.html
const indexContent = `
<h1 class="page-title">Java Tutorial</h1>
<div class="page-meta">
  <span class="badge">☕ Java</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Java is an exceptionally powerful, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Java follows the "Write Once, Run Anywhere" (WORA) philosophy, which means compiled Java code can run on all platforms that support Java without the need for recompilation. In this guide, we will cover the core syntax of Java, its object-oriented nature, and how to write and run Java programs online.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Java:</p>
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
  'Free Online Java Compiler & Tutorial',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-java.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-java.html');
console.log('🎉 Successfully generated all 15 Java tutorial files!');
