const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public/python');

// Ensure the directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Curriculum array with active markers
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Core Types', filename: 'variables.html' },
  { slug: 'operators', num: 3, title: 'Basic Operators & Math', filename: 'operators.html' },
  { slug: 'strings', num: 4, title: 'String Slicing & Methods', filename: 'strings.html' },
  { slug: 'conditionals', num: 5, title: 'Conditionals (if-else)', filename: 'conditionals.html' },
  { slug: 'loops', num: 6, title: 'Loops & Ranges', filename: 'loops.html' },
  { slug: 'input', num: 7, title: 'Reading User Inputs', filename: 'input.html' },
  { slug: 'lists', num: 8, title: 'Lists & Tuples', filename: 'lists.html' },
  { slug: 'dicts', num: 9, title: 'Dictionaries & Sets', filename: 'dicts.html' },
  { slug: 'functions', num: 10, title: 'Functions & Reusable Code', filename: 'functions.html' },
  { slug: 'modules', num: 11, title: 'Modules & Standard Lib', filename: 'modules.html' },
  { slug: 'files', num: 12, title: 'File I/O Operations', filename: 'files.html' },
  { slug: 'errors', num: 13, title: 'Exception Handling', filename: 'errors.html' },
  { slug: 'oop-basics', num: 14, title: 'OOP: Classes & Objects', filename: 'oop-basics.html' },
  { slug: 'oop-advanced', num: 15, title: 'OOP: Inheritance & Dunder', filename: 'oop-advanced.html' }
];

// Helper to generate the sidebar HTML dynamically
function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Python 3 Tutorial</div>\n`;
  html += `    <a href="/blog-python.html"${activeSlug === 'home' ? ' class="active"' : ''}>Python 3 HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/python/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/python/quiz.html" style="color:#a8a3ff;font-weight:700;">🧠 Python Quiz</a>\n`;
  html += `    <a href="/?lang=python3">▶ Try Python 3 Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
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


// Wrapper template for consistency
function wrapPage(slug, title, mainContent, prevFile, prevTitle, nextFile, nextTitle) {
  let navFooter = `<div class="nav-footer">\n`;
  if (prevFile) {
    navFooter += `      <a href="/${prevFile}" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Previous Lesson</span>\n`;
    navFooter += `        <span class="title">${prevTitle}</span>\n`;
    navFooter += `      </a>\n`;
  } else {
    navFooter += `      <a href="/blog-python.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Python Overview</span>\n`;
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
  <meta name="description" content="Learn Python 3 — ${title} with clear explanations, unique examples, common mistakes, and interactive execution." />
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
              const langId = urlParams.get('lang') || 'python3';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
  <link rel="stylesheet" href="/site-nav.css" />
</head>
<body class="lang-python">

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    ${getSidebar(slug)}
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    ${mainContent}
    ${navFooter}
  </main>
</div>
  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ----------------------------------------------------
// Lesson 1: Introduction to Python & Hello World
// ----------------------------------------------------
const introContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Welcome & Hello World</span>
</div>
<h1 class="page-title">Python 3 — Welcome & Your First Hello World</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 1</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Welcome to Python! If you are learning your very first programming language, you chose the best one. Python is famous for its clean, English-like syntax, allowing you to write powerful programs in fewer lines of code compared to Java or C++. Let's kick off this boot camp by running your first Python program.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> What is Python?</div>
  <p>Python is a high-level, general-purpose, interpreted programming language created by Guido van Rossum in 1991. The name "Python" wasn't inspired by the snake; instead, Guido named it after his favorite comedy show, <em>Monty Python's Flying Circus</em>!</p>
  <p>Unlike languages that require compilation (converting code to machine language before running), Python runs line-by-line using an <strong>interpreter</strong>. This makes writing and testing code extremely fast and beginner-friendly.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Your First Program: "Hello, World!"</div>
  <p>In most programming languages, print programs require class wrappers, public voids, or imports. In Python, writing a message to the screen requires only a single line. Let's see the print command:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Hello World</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>print("Hello, World!")
print("Welcome to Our Compiler!")</code></pre>
  </div>
  
  <p>The <code>print()</code> function is a built-in command that tells the computer to output whatever is placed inside the parentheses. The text must be surrounded by quotation marks (either single quotes <code>'</code> or double quotes <code>"</code>) to show Python that it is text (a string).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> How Python Runs Code</div>
  <p>When you click <strong>▶ Run Code</strong>, the compiler takes your code and runs it sequentially:</p>
  <table class="tbl">
    <tr><th>Step</th><th>What Happens</th><th>Result</th></tr>
    <tr><td>1. Read</td><td>Interpreter reads the first line: <code>print("Hello, World!")</code></td><td>Validates syntax</td></tr>
    <tr><td>2. Execute</td><td>Translates it to byte code and executes the instruction</td><td>Displays "Hello, World!" in output</td></tr>
    <tr><td>3. Advance</td><td>Moves to the next line: <code>print("Welcome...")</code></td><td>Displays second line and finishes</td></tr>
  </table>
</div>

<div class="info-box">
  <strong>⚠️ Common Beginner Mistakes:</strong>
  <ul>
    <li><strong>Capitalization:</strong> Python is case-sensitive! Typing <code>Print("Hello")</code> with a capital "P" will result in a <code>NameError</code> because Python only recognizes the lowercase <code>print</code>.</li>
    <li><strong>Missing Quotes:</strong> Leaving out quotes, like <code>print(Hello World)</code>, causes a <code>SyntaxError</code> because Python thinks "Hello" and "World" are variable names.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Let's write a simple program. Open the compiler, clean out the editor, and write a program that displays your name, a fun fact about you, and what programming language you want to learn next. Execute it to see the output.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 2: Variables & Core Types
// ----------------------------------------------------
const variablesContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Variables & Core Types</span>
</div>
<h1 class="page-title">Python 3 — Variables & Core Data Types</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 2</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Think of a variable as a storage box with a label stuck to it. You write a label on the box (the variable name), put something inside it (the value), and then look it up whenever you need it. Python handles variables dynamically, meaning you don't have to state what type of data goes in the box beforehand.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Creating Variables</div>
  <p>To store a value in a variable, we use the assignment operator (<code>=</code>). The variable name goes on the left, and the value goes on the right:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Variable Assignment</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Storing data in variables
username = "Balaji"
age = 25
height = 5.9
is_developer = True

# Printing the variables
print(username)
print(age)
print(height)
print(is_developer)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Core Data Types</div>
  <p>Every piece of data stored in Python belongs to a specific category. Here are the 4 fundamental types you must know:</p>
  <table class="tbl">
    <tr><th>Type</th><th>Class Name</th><th>Description</th><th>Example</th></tr>
    <tr><td>Text</td><td><code>str</code> (String)</td><td>Unicode characters wrapped in quotes</td><td><code>"Python 3"</code></td></tr>
    <tr><td>Whole Number</td><td><code>int</code> (Integer)</td><td>Positive or negative whole values</td><td><code>-42</code></td></tr>
    <tr><td>Decimal</td><td><code>float</code> (Float)</td><td>Numbers with decimal points</td><td><code>3.1415</code></td></tr>
    <tr><td>Boolean</td><td><code>bool</code> (Boolean)</td><td>Logical state representing true/false</td><td><code>True</code> or <code>False</code></td></tr>
  </table>
  <p>You can check the type of any variable using the built-in <code>type()</code> function:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Checking Types</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>score = 99
print(type(score))  # Outputs: &lt;class 'int'&gt;

is_online = False
print(type(is_online))  # Outputs: &lt;class 'bool'&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Dynamic Typing in Python</div>
  <p>In languages like Java or C++, once you declare a variable as an integer, you can never store a string inside it. Python is **dynamically typed**, meaning variables can change their type easily as you assign new values:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Dynamic Types</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>data = 100
print(type(data))  # &lt;class 'int'&gt;

data = "Now I am text!"
print(type(data))  # &lt;class 'str'&gt;</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ Variable Naming Rules:</strong>
  <ul>
    <li>Variable names can only contain letters, numbers, and underscores (e.g., <code>user_1</code>).</li>
    <li>They must **never** start with a number (e.g., <code>1user</code> is invalid).</li>
    <li>Use standard **snake_case** (all lowercase words connected by underscores) to follow clean Python guidelines (PEP 8).</li>
    <li>Do not use reserved keywords like <code>if</code>, <code>else</code>, <code>class</code>, or <code>print</code> as variable names.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Write a program that declares a variable representing a product price, discount rate, product name, and whether it is in stock. Output their values and their types to the terminal.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 3: Core Operators & Math
// ----------------------------------------------------
const operatorsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Basic Operators & Math</span>
</div>
<h1 class="page-title">Python 3 — Basic Operators & Math</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 3</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Computers excel at calculations. In this lesson, we will see how Python executes basic arithmetic, how operators interact with string text, and how to convert data from one type to another (called type casting) to avoid standard type bugs.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Arithmetic Operators</div>
  <p>Python provides simple operators for math operations. Most are standard symbols, with a few useful additions:</p>
  <table class="tbl">
    <tr><th>Operator</th><th>Operation</th><th>Example</th><th>Result</th></tr>
    <tr><td><code>+</code></td><td>Addition</td><td><code>10 + 5</code></td><td><code>15</code></td></tr>
    <tr><td><code>-</code></td><td>Subtraction</td><td><code>10 - 5</code></td><td><code>5</code></td></tr>
    <tr><td><code>*</code></td><td>Multiplication</td><td><code>10 * 5</code></td><td><code>50</code></td></tr>
    <tr><td><code>/</code></td><td>Division (always returns float)</td><td><code>10 / 4</code></td><td><code>2.5</code></td></tr>
    <tr><td><code>//</code></td><td>Floor Division (rounds down)</td><td><code>10 // 4</code></td><td><code>2</code></td></tr>
    <tr><td><code>%</code></td><td>Modulo (remainder of division)</td><td><code>10 % 3</code></td><td><code>1</code></td></tr>
    <tr><td><code>**</code></td><td>Exponentiation (power)</td><td><code>2 ** 3</code></td><td><code>8</code> (2 to power 3)</td></tr>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Math Operations</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Basic calculations
total = 15 + 4
remainder = 17 % 5
power = 3 ** 4

print(f"Total: {total}")
print(f"Remainder: {remainder}")
print(f"Power: {power}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> String Operations</div>
  <p>In Python, operators aren't just for numbers! You can use the addition operator (<code>+</code>) to merge (concatenate) strings, and the multiplication operator (<code>*</code>) to repeat text:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — String Math</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>first_name = "Balaji"
last_name = "Nayak"

# String concatenation
full_name = first_name + " " + last_name
print(full_name) # Balaji Nayak

# String repetition
divider = "-" * 30
print(divider) # Prints 30 dashes</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Type Casting (Conversions)</div>
  <p>Sometimes you have text that contains numbers (like <code>"25"</code>), but you cannot perform mathematical operations on it directly. You must explicitly convert the type using Python's casting functions:</p>
  <ul>
    <li><code>int(x)</code>: Converts <code>x</code> to a whole number.</li>
    <li><code>float(x)</code>: Converts <code>x</code> to a decimal number.</li>
    <li><code>str(x)</code>: Converts <code>x</code> to text format.</li>
  </ul>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Type Conversions</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>str_num = "100"
# This would error: result = str_num + 50

# Converting to integer first
actual_num = int(str_num)
result = actual_num + 50
print(result) # Prints 150</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ The String & Int Trap:</strong>
  <p>If you try to run <code>print("Age: " + 25)</code>, Python will throw a <code>TypeError: can only concatenate str (not "int") to str</code>. You must wrap the integer in <code>str(25)</code> or use formatted string interpolation: <code>print(f"Age: {25}")</code>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Create a program that has a variable representing hours worked and another representing hourly wage in string format (e.g., hourly_wage = "15.50"). Calculate the gross pay, convert it to float, and display the result nicely.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 4: String Slicing & Methods
// ----------------------------------------------------
const stringsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>String Slicing & Methods</span>
</div>
<h1 class="page-title">Python 3 — Strings, Indexing, Slicing & Methods</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 4</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Text is one of the most common data representations. In Python, strings are incredibly powerful. Python allows you to index individual letters, slice segments, and manipulate strings easily using built-in methods.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> String Indexing</div>
  <p>Each character in a string occupies a specific indexed position, starting from **0** on the left. Python also supports **negative indexing**, which counts backwards from the right starting at **-1**:</p>
  
  <pre><code>Text:    P   y   t   h   o   n
Index:   0   1   2   3   4   5
Neg:    -6  -5  -4  -3  -2  -1</code></pre>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Indexing</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>lang = "Python"

print(lang[0])   # P
print(lang[3])   # h
print(lang[-1])  # n (last letter)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> String Slicing</div>
  <p>To extract a substring, use slicing syntax: <code>[start:stop:step]</code>. The slice starts at the 'start' index and goes up to, but **does not include**, the 'stop' index:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Slicing</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>phrase = "Learn Python Today"

# Slice from index 6 to 12 (stops before 12)
print(phrase[6:12]) # Python

# Slice from start to index 5
print(phrase[:5])   # Learn

# Slice from index 13 to the end
print(phrase[13:])  # Today

# Reverse a string using a negative step!
print(phrase[::-1]) # yadoT nohtyP nraeL</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Essential String Methods</div>
  <p>Strings are objects that have built-in functions (methods) associated with them. Here are the most useful ones:</p>
  <table class="tbl">
    <tr><th>Method</th><th>Description</th><th>Example</th><th>Result</th></tr>
    <tr><td><code>.upper()</code></td><td>Converts to UPPERCASE</td><td><code>"hi".upper()</code></td><td><code>"HI"</code></td></tr>
    <tr><td><code>.lower()</code></td><td>Converts to lowercase</td><td><code>"HI".lower()</code></td><td><code>"hi"</code></td></tr>
    <tr><td><code>.strip()</code></td><td>Removes spaces from ends</td><td><code>" ok ".strip()</code></td><td><code>"ok"</code></td></tr>
    <tr><td><code>.replace(a, b)</code></td><td>Replaces all <code>a</code> with <code>b</code></td><td><code>"cat".replace("c", "b")</code></td><td><code>"bat"</code></td></tr>
    <tr><td><code>.split(sep)</code></td><td>Splits text into a list by separator</td><td><code>"a,b".split(",")</code></td><td><code>["a", "b"]</code></td></tr>
  </table>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — String Methods</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>msg = "   learning python is fun!   "
cleaned = msg.strip().replace("learning", "mastering")

print(cleaned.upper())  # MASTERING PYTHON IS FUN!</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ Strings are Immutable:</strong>
  <p>In Python, you cannot change a character in place. Writing <code>name = "Python"; name[0] = "J"</code> results in a <code>TypeError: 'str' object does not support item assignment</code>. To change a string, you must create a new one: <code>name = "J" + name[1:]</code>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Declare a variable containing the string <code>"123-ABC-789-XYZ"</code>. Slice the letters <code>"ABC"</code> out of the string, and print the string fully reversed.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 5: Conditionals
// ----------------------------------------------------
const conditionalsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Conditionals (if-else)</span>
</div>
<h1 class="page-title">Python 3 — Making Decisions with Conditionals</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 5</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Conditionals allow your code to make decisions. Without them, your code is just a simple recipe. By checking conditions, your program can choose to run specific code blocks while completely skipping others.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Comparison Operators</div>
  <p>Before making a decision, you must compare values. Python returns a Boolean value (<code>True</code> or <code>False</code>) after evaluations:</p>
  <table class="tbl">
    <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
    <tr><td><code>==</code></td><td>Equal to</td><td><code>5 == 5</code> (True)</td></tr>
    <tr><td><code>!=</code></td><td>Not equal to</td><td><code>5 != 3</code> (True)</td></tr>
    <tr><td><code>&gt;</code> / <code>&lt;</code></td><td>Greater/Less than</td><td><code>10 &gt; 12</code> (False)</td></tr>
    <tr><td><code>&gt;=</code> / <code>&lt;=</code></td><td>Greater/Less or equal</td><td><code>10 &gt;= 10</code> (True)</td></tr>
  </table>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> The if, elif, else Structure</div>
  <p>Python checks the conditions sequentially. The moment it finds a condition that evaluates to <code>True</code>, it runs that block of code and skips the rest:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Conditionals</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>temperature = 28

if temperature > 30:
    print("It is extremely hot outside!")
elif temperature >= 20:
    print("The weather is warm and nice.")
else:
    print("It is cold outside.")</code></pre>
  </div>
  <p>Notice the colons (<code>:</code>) at the end of each condition, and the indentation before the print functions. In Python, **indentation is mandatory** and defines which code belongs to which block.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Logical Operators</div>
  <p>You can check multiple conditions at the same time using logical operators:</p>
  <ul>
    <li><code>and</code>: Returns <code>True</code> only if **both** conditions are true.</li>
    <li><code>or</code>: Returns <code>True</code> if **at least one** condition is true.</li>
    <li><code>not</code>: Inverts the condition (turns true to false, and vice-versa).</li>
  </ul>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Logical Conditions</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>has_licence = True
age = 19

if age >= 18 and has_licence:
    print("You are cleared to drive!")
else:
    print("You cannot drive.")</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ IndentationError Warning:</strong>
  <p>In Python, failing to indent or mixing tabs with spaces causes an <code>IndentationError</code>. Always use 4 spaces for your indents. Our Compiler handles this formatting for you automatically when you press tab!</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Write a grading program: declare a variable called 'score'. If the score is 90 or more, print "Grade A". If it is 80 or more, print "Grade B". If 70 or more, print "Grade C". Otherwise, print "Grade F".</p>
</div>
`;

// ----------------------------------------------------
// Lesson 6: Loops & Ranges
// ----------------------------------------------------
const loopsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Loops & Ranges</span>
</div>
<h1 class="page-title">Python 3 — Repeating Actions with Loops</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 6</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Loops allow you to run the same block of code multiple times. Instead of copy-pasting the same instruction ten times, you can tell the computer to repeat it using a loop. Python offers two main types of loops: 'while' loops and 'for' loops.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> While Loops</div>
  <p>A <code>while</code> loop runs as long as a specified condition remains <code>True</code>. Be careful to change the variable inside the loop, or it will run forever (creating an infinite loop):</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — While Loop</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>countdown = 5

while countdown > 0:
    print(f"Countdown: {countdown}")
    countdown = countdown - 1  # Decrement variable

print("Blast off! 🚀")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> For Loops & The range() Function</div>
  <p>A <code>for</code> loop iterates over a sequence. In Python, you frequently pair it with the <code>range()</code> function to run code a specific number of times. Note that <code>range(start, stop)</code> goes up to but does not include the 'stop' value:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — For Loop & Range</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Loop from 0 to 4 (runs 5 times)
for i in range(5):
    print(f"Count: {i}")

print("-" * 20)

# Loop from 1 to 5
for num in range(1, 6):
    print(f"Number: {num}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Loop Controls: break & continue</div>
  <p>Sometimes you need to alter the loop's natural flow:</p>
  <ul>
    <li><code>break</code>: Instantly terminates the loop, jumping to code below it.</li>
    <li><code>continue</code>: Skips the rest of the current iteration and jumps back to the top to start the next iteration.</li>
  </ul>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Loop Controls</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Break example
for n in range(1, 10):
    if n == 5:
        break # Exit loop
    print(n) # Prints 1, 2, 3, 4

print("-" * 20)

# Continue example
for val in range(1, 6):
    if val == 3:
        continue # Skip 3
    print(val) # Prints 1, 2, 4, 5</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ Infinite Loop Recovery:</strong>
  <p>If you accidentally write a program with an infinite loop (e.g. <code>while True: print("Help!")</code>), the compiler output panel will lag or timeout. In Our Compiler, you can simply click the **Stop** button to kill the Docker container instantly!</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Write a program that prints only the **even** numbers between 1 and 20. Use a 'for' loop and an 'if' statement to check if the remainder of the number divided by 2 is 0 (using the modulo <code>%</code> operator).</p>
</div>
`;

// ----------------------------------------------------
// Lesson 7: Reading User Inputs
// ----------------------------------------------------
const inputContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Reading User Inputs</span>
</div>
<h1 class="page-title">Python 3 — Reading User Inputs</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 7</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>To write interactive programs (like CLI text games, quizzes, or currency calculators), your program needs to accept input from the user. Python provides a built-in function called 'input()' that pauses the program and waits for the user to type something.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> The input() Function</div>
  <p>The <code>input()</code> function prints a prompt message to the screen and saves the user's keystrokes inside a variable:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Interactive Input</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Pausing and asking user for their name
name = input("Enter your name: ")

print(f"Hello, {name}!")
print("Welcome to our interactive terminal!")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> The Input Data Type Trap</div>
  <p>Here is the most critical thing to know: **'input()' always returns a string (text)**, even if the user types a number. If you try to do math with it, your program will crash or produce bugs:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Input Type Bug</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>birth_year = input("What year were you born? ")
# This will CRASH: age = 2026 - birth_year

# Correct Way: cast the input to an integer
age = 2026 - int(birth_year)
print(f"You will turn {age} in 2026!")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Input in Our Compiler Terminal</div>
  <p>Our Compiler features a fully interactive sandboxed terminal! When you call <code>input()</code>, the compiler pauses, shows a blue input cursor in the terminal output panel, and allows you to type your response live! Just press **Enter** to submit your response to the running program.</p>
</div>

<div class="info-box">
  <strong>⚠️ ValueError Trap:</strong>
  <p>If you convert input using <code>int()</code> and the user types letters (like <code>"hello"</code>), Python will crash with a <code>ValueError: invalid literal for int()</code>. In later lessons, we will learn how to handle this gracefully using <code>try-except</code> blocks.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Create an interactive calculation program: ask the user for a distance in miles, multiply it by 1.609, and print out the distance converted to kilometers.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 8: Lists & Tuples
// ----------------------------------------------------
const listsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Lists & Tuples</span>
</div>
<h1 class="page-title">Python 3 — Managing Sequences with Lists & Tuples</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 8</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>So far, we have only stored single items in variables. But what if you have a list of user emails, a list of prices, or high scores? Python lists and tuples allow you to store multiple items in a single variable.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Python Lists (Mutable Sequences)</div>
  <p>A list is an ordered, changeable (mutable) collection of elements wrapped in square brackets (<code>[]</code>). You can add, remove, and modify items in a list:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — List Basics</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>fruits = ["Apple", "Banana", "Cherry"]

# Modifying an item
fruits[1] = "Blueberry"

# Appending a new item to the end
fruits.append("Orange")

# Removing an item
fruits.remove("Apple")

print(fruits)      # ['Blueberry', 'Cherry', 'Orange']
print(len(fruits)) # 3 (size of list)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Iterating Over Lists</div>
  <p>To loop through every item in a list, pair it with a <code>for</code> loop. This reads naturally like English:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — List Iteration</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>languages = ["Python", "Java", "Go", "Rust"]

for lang in languages:
    print(f"I can compile {lang} code!")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Tuples (Immutable Sequences)</div>
  <p>A tuple is similar to a list, but with one key difference: **once created, it can never be changed**. Tuples are written with parentheses (<code>()</code>) and are safer for data that should remain constant (like latitude/longitude coordinates):</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Tuples</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>dimensions = (1920, 1080)

# This would crash: dimensions[0] = 1280
print(dimensions[0]) # 1920</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ IndexOutOfBounds Warning:</strong>
  <p>If your list has 3 items and you try to access <code>my_list[3]</code>, Python will throw an <code>IndexError: list index out of range</code>. Remember, indexing starts at 0, so a list of size 3 only has indices 0, 1, and 2!</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Create a list containing five of your favorite songs. Append a new song to the end, print the length of the list, and use a loop to display each song title in uppercase letters.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 9: Dictionaries & Sets
// ----------------------------------------------------
const dictsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Dictionaries & Sets</span>
</div>
<h1 class="page-title">Python 3 — Key-Value Pairs with Dictionaries & Sets</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 9</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Sometimes lists aren't descriptive enough. If you want to store a user's profile information, looking up values by indices (like 'user[0]') gets confusing quickly. Dictionaries solve this by storing data in labeled Key-Value pairs, similar to a real word dictionary.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Python Dictionaries</div>
  <p>Dictionaries are written inside curly braces (<code>{}</code>). Each entry consists of a unique **key** and its corresponding **value** separated by a colon (<code>:</code>):</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Dictionaries</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>user = {
    "name": "Balaji",
    "role": "Developer",
    "is_active": True
}

# Accessing a value by its key label
print(user["name"]) # Balaji

# Adding a new key-value pair
user["location"] = "India"

# Modifying a value
user["is_active"] = False

print(user)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Iterating Over Dictionaries</div>
  <p>You can loop through a dictionary to print keys, values, or both using the <code>.items()</code> method:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Dictionary Loops</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>prices = {"Apple": 0.99, "Orange": 1.25, "Milk": 2.50}

for item, price in prices.items():
    print(f"The price of {item} is \\\${price}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Python Sets (Unique Elements)</div>
  <p>A set is an unordered collection of elements with **no duplicate values**. They are written with curly braces too, but without colons. They are extremely fast for membership checks:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Sets</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>user_ids = {101, 102, 103, 101, 102}

# Duplicates are automatically removed
print(user_ids) # {101, 102, 103}

# Check if an item exists
print(101 in user_ids) # True</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ KeyError Warning:</strong>
  <p>If you attempt to fetch a key that doesn't exist (like <code>user["phone"]</code>), Python will crash with a <code>KeyError</code>. To avoid this, use the <code>.get()</code> method, which returns <code>None</code> instead of crashing: <code>user.get("phone")</code>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Create a dictionary representing a book profile: title, author, and year published. Add a new key called 'rating', modify the publication year, and display each key-value pair on a separate line.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 10: Functions & Reusable Code
// ----------------------------------------------------
const functionsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Functions & Reusable Code</span>
</div>
<h1 class="page-title">Python 3 — Functions & Reusable Code</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 10</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Writing clean code means avoiding repetitions (the DRY principle: Don't Repeat Yourself). If you write the same calculation code multiple times, wrapping it inside a reusable code machine called a Function is the professional solution.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Defining a Function</div>
  <p>We declare functions using the <code>def</code> keyword, followed by the function name, parentheses, and a colon. Code inside the function must be indented:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Simple Function</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Defining the function
def say_hello():
    print("Welcome back, coder!")
    print("Let's write some Python code.")

# Calling the function to execute it
say_hello()
say_hello()</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Parameters & Return Values</div>
  <p>To pass data into a function, put parameter variables inside the parentheses. To send results back from the function, use the <code>return</code> keyword:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Functions with return</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Parameters: num1, num2
def calculate_area(length, width):
    area = length * width
    return area # Send value back to caller

# Calling function and capturing output
result = calculate_area(5, 10)
print(f"Area: {result}") # Area: 50</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Local vs Global Scope</div>
  <p>Variables created inside a function belong to that function's **local scope** and cannot be read from the outside. Variables declared outside functions exist in the **global scope**:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Scopes</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>global_name = "Guido"

def scope_demo():
    local_val = 100
    print(global_name) # Can read global variables

scope_demo()
# This would crash: print(local_val)</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ Return vs Print:</strong>
  <p>Beginners often confuse <code>print()</code> and <code>return</code>. Printing displays text in the output terminal panel, but doesn't pass the value back to the program. Returning passes the value back to the code, allowing you to store it or do math on it.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Define a function called 'celsius_to_fahrenheit' that accepts a temperature value, converts it using formula <code>(celsius * 9/5) + 32</code>, and returns the result. Call the function with '25' degrees and print the result.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 11: Modules & Standard Lib
// ----------------------------------------------------
const modulesContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Modules & Standard Lib</span>
</div>
<h1 class="page-title">Python 3 — Modules, Libraries & standard imports</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 11</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>You don't need to write every feature from scratch. Python comes with a massive "Standard Library" of built-in code blocks (modules) that handle math calculations, random generators, date logic, and web integrations. Let's see how to use them.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> The import Statement</div>
  <p>To use code from a module, you must import it at the top of your program. Here is how we import and use the standard <code>math</code> and <code>random</code> modules:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Importing Modules</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>import math
import random

# Using math functions
square_root = math.sqrt(64)
print(f"Square Root: {square_root}") # 8.0

# Generating a random number between 1 and 10
lucky_number = random.randint(1, 10)
print(f"Lucky Number: {lucky_number}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Importing Specific Elements</div>
  <p>If you only need a single function from a large module, you can import it specifically using the <code>from ... import</code> syntax. This allows you to call the function directly without prepending the module name:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Selective Imports</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>from datetime import datetime

# Fetching current timestamp
now = datetime.now()
print(f"Current Date/Time: {now}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Third-Party Packages (pip)</div>
  <p>If Python's standard library doesn't cover your needs, you can import libraries written by other developers. In your local terminal, you can download packages from the Python Package Index (PyPI) using pip:</p>
  <pre><code># Running in local command terminal:
pip install requests</code></pre>
  <p>Once installed, you can import it like standard modules: <code>import requests</code>.</p>
</div>

<div class="info-box">
  <strong>⚠️ Avoid Import Collisions:</strong>
  <p>Never name your script file the same name as a Python standard library module (like naming your file <code>math.py</code>). If you do, Python will import your script instead of the standard math module, causing standard math methods to fail with errors!</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Import the 'random' module, create a list of three strings representing prizes (e.g. "Car", "Bike", "Candy"), and use 'random.choice(prizes)' to print out a random prize winner.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 12: File I/O Operations
// ----------------------------------------------------
const filesContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>File I/O Operations</span>
</div>
<h1 class="page-title">Python 3 — Reading & Writing Files</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 12</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Variables only persist while your program is running. The moment the script ends, the memory is cleared. To save data permanently, you must write it to files. Python provides simple built-in file operators for reading and writing files.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Writing to Files</div>
  <p>To open a file, use the <code>open()</code> function. The first parameter is the file path, and the second is the mode: <code>"w"</code> (write) or <code>"a"</code> (append). We use the <code>with</code> block to guarantee the file is closed automatically:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — File Writing</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Writing to a new file (overwrites old file if it exists)
with open("test_file.txt", "w") as file:
    file.write("Hello from Python File writing!\\n")
    file.write("This data is saved to the disk.\\n")

print("File written successfully!")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Reading from Files</div>
  <p>To read a file, open it in read mode (<code>"r"</code>) and read the contents using '.read()' (reads entire file) or a loop to process it line-by-line:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — File Reading</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Reading the file we wrote above
with open("test_file.txt", "r") as file:
    content = file.read()
    print(content)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Appending to Files</div>
  <p>If you open a file with <code>"w"</code> mode, Python will delete the existing file content. To preserve existing data and add text to the bottom, open the file in append (<code>"a"</code>) mode:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Appending Files</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>with open("test_file.txt", "a") as file:
    file.write("Adding this new line without wiping old data!\\n")</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>💡 Always Use 'with' Statement:</strong>
  <p>Historically, files were opened and closed manually using <code>f = open(); f.close()</code>. If your code crashed before the close line, the file remained locked. Using the <code>with</code> statement handles closing for you automatically, even during crashes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Write a script that creates a file called 'notes.txt' and writes three checklist items in it. Then, reopen the file in read mode and print each line out to the console terminal.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 13: Exception Handling
// ----------------------------------------------------
const errorsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>Exception Handling</span>
</div>
<h1 class="page-title">Python 3 — Exception Handling with try-except</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 13</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Errors happen. A user might type invalid values, or your program might try to open a missing file. In professional software, a crash is unacceptable. Python provides exception handling structures to intercept errors and handle them gracefully.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> What is an Exception?</div>
  <p>An exception is a signal that an error has occurred during execution. Instead of continuing, Python halts program flow and raises a traceback detailing what went wrong. Standard exceptions include <code>ZeroDivisionError</code>, <code>ValueError</code>, and <code>FileNotFoundError</code>.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> The try-except Block</div>
  <p>To prevent errors from crashing your script, isolate risky instructions in a <code>try</code> block. If an error is raised, Python skips the remaining try code and jumps to the matching <code>except</code> block:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Exception Catching</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>try:
    number = int(input("Enter a whole number: "))
    result = 10 / number
    print(f"Result: {result}")
except ZeroDivisionError:
    print("Error: You cannot divide a number by zero!")
except ValueError:
    print("Error: That wasn't a valid whole number!")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> The finally Clause</div>
  <p>You can append an optional <code>finally</code> block at the bottom. Code inside the <code>finally</code> block is guaranteed to run **no matter what**, whether an error occurred or not. This is commonly used for resource cleanup:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — finally Block</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>try:
    print("Opening database...")
    # Simulate an error
    error_val = 10 / 0
except ZeroDivisionError:
    print("Caught division by zero!")
finally:
    print("Closing database connections safely!")</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ Avoid Blank Excepts:</strong>
  <p>Writing <code>except:</code> without specifying the exception type (like <code>except ValueError:</code>) catches *every* error, including syntax slips or exit requests. This hides bugs and makes debugging extremely difficult. Always specify the specific exception you want to handle.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Write a calculator program that divides two numbers. Wrap the inputs and division calculations inside a 'try-except' block to cleanly handle inputs that aren't numeric, and division by zero.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 14: OOP Classes & Objects
// ----------------------------------------------------
const oopBasicsContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>OOP: Classes & Objects</span>
</div>
<h1 class="page-title">Python 3 — OOP: Classes & Objects</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 14</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Object-Oriented Programming (OOP) is a design pattern that models software after real-world objects. Instead of writing disconnected variables and functions, OOP binds them together inside a single, unified capsule called a Class.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Class Blueprints vs Object Instances</div>
  <p>Think of a **Class** as a blueprint (like the architectural blueprint for a house). You can't live inside a blueprint. An **Object** is the actual house constructed from that blueprint. You can build as many houses as you want from a single blueprint!</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Defining a Class & Constructor</div>
  <p>We define classes using the <code>class</code> keyword. The <code>__init__</code> function is the constructor method that initializes an object when it's created. The <code>self</code> parameter represents the current object instance:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Class Definition</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>class Student:
    # Constructor (Blueprint Setup)
    def __init__(self, name, score):
        self.name = name   # Attribute
        self.score = score # Attribute
        
    # Class Method (Action)
    def display_info(self):
        print(f"Student: {self.name}, Score: {self.score}/100")

# Constructing object instances
student1 = Student("Alice", 92)
student2 = Student("Balaji", 98)

# Running methods on instances
student1.display_info()
student2.display_info()</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Modifying Object Attributes</div>
  <p>You can access and modify attributes directly on object instances using the dot (<code>.</code>) syntax:</p>
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Modifying Objects</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>student1.score = 95 # Modify Alice's score
student1.display_info() # Student: Alice, Score: 95/100</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>💡 Understanding 'self':</strong>
  <p>The <code>self</code> parameter is mandatory inside class methods. When you call <code>student1.display_info()</code>, Python passes the <code>student1</code> object as the first parameter (<code>self</code>) under the hood. This is how the method knows which object's attributes to display.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Coding Challenge</div>
  <p>Create a class called 'Car' with constructor attributes for 'brand', 'model', and 'year'. Add a method called 'drive()' that prints: "[brand] [model] is driving away!". Instantiate a car object and call the method.</p>
</div>
`;

// ----------------------------------------------------
// Lesson 15: OOP Inheritance & Dunder Methods
// ----------------------------------------------------
const oopAdvancedContent = `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <a href="/blog-python.html">Python 3</a><span>›</span>
  <span>OOP: Inheritance & Dunder</span>
</div>
<h1 class="page-title">Python 3 — OOP: Inheritance & Dunder Methods</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Lesson 15</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>In this final lesson, we will cover inheritance, which allows a child class to inherit attributes and methods from a parent class. We will also explore Dunder (Double-Underscore) methods, which let you customize Python's built-in behaviors on your classes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Class Inheritance</div>
  <p>Inheritance promotes code reuse. To inherit from a parent class, pass the parent class inside parentheses when declaring the child class. Use <code>super().__init__()</code> to trigger the parent class's constructor:</p>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Inheritance</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code># Parent Class
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        print(f"{self.name} makes a sound.")

# Child Class
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name) # Run parent constructor
        self.breed = breed
        
    def speak(self): # Overriding method
        print(f"{self.name} the {self.breed} barks! 🐶")

my_dog = Dog("Rex", "German Shepherd")
my_dog.speak() # Rex the German Shepherd barks!</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Dunder Methods (Special Magic Methods)</div>
  <p>Dunder methods are built-in methods starting and ending with double underscores (e.g. <code>__init__</code>). By defining them, you tell Python how to interact with your objects during common language operations like printing or checking size:</p>
  <ul>
    <li><code>__str__(self)</code>: Dictates what text is returned when the object is printed.</li>
    <li><code>__len__(self)</code>: Dictates what value is returned when <code>len(object)</code> is called.</li>
  </ul>
  
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Python 3 — Dunder Methods</span>
      <a class="try-btn" href="/?lang=python3">▶ Run Code</a>
    </div>
    <pre><code>class Playlist:
    def __init__(self, name, songs):
        self.name = name
        self.songs = songs # list of songs
        
    def __str__(self):
        return f"Playlist: {self.name}"
        
    def __len__(self):
        return len(self.songs)

my_list = Playlist("Chill Vibes", ["Song 1", "Song 2", "Song 3"])

print(my_list)      # Triggers __str__ (Prints: Playlist: Chill Vibes)
print(len(my_list)) # Triggers __len__ (Prints: 3)</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>🎓 Congratulations!</strong>
  <p>You have completed the entire Python 3 Boot Camp track! You now understand the basic building blocks (variables, math, decisions, loops), interactive terminal I/O, file storage, exception safety, and advanced classes. Start writing your own programs in the compiler above to master your skills!</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Coding Challenge</div>
  <p>Create a class 'Book' with attributes 'title' and 'author'. Add a '__str__' dunder method that returns: "'[title]' by [author]". Instantiate a book and print it to verify the dunder format.</p>
</div>
`;

// ----------------------------------------------------
// Write Python Home Page (blog-python.html)
// ----------------------------------------------------
function getHomeContent() {
  return `
<div class="breadcrumb">
  <a href="/">Home</a><span>›</span>
  <a href="/blog.html">Tutorials</a><span>›</span>
  <span>Python 3</span>
</div>
<h1 class="page-title">Python 3 Tutorial</h1>
<div class="page-meta">
  <span class="badge">🐍 Python 3</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Python is one of the most popular, high-level, interpreted programming languages in the world. It is known for its clear, clean readability, simplicity, and flexibility, making it an excellent language for beginners and professional developers alike. In this comprehensive guide, we will explore the essential elements of Python 3, from variables to classes, with practical examples you can execute directly on Our Compiler.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Python 3:</p>
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
}

// Write all pages to public/
function buildAll() {
  // Write Home Page
  const homeHtml = wrapPage('home', 'Free Online Python 3 Compiler & Tutorial', getHomeContent(), null, '', lessons[0].filename, lessons[0].title);
  fs.writeFileSync(path.join(publicDir, 'blog-python.html'), homeHtml, 'utf8');
  console.log('Generated: blog-python.html');

  // Write lessons
  const contentMap = {
    'intro': introContent,
    'variables': variablesContent,
    'operators': operatorsContent,
    'strings': stringsContent,
    'conditionals': conditionalsContent,
    'loops': loopsContent,
    'input': inputContent,
    'lists': listsContent,
    'dicts': dictsContent,
    'functions': functionsContent,
    'modules': modulesContent,
    'files': filesContent,
    'errors': errorsContent,
    'oop-basics': oopBasicsContent,
    'oop-advanced': oopAdvancedContent
  };

  lessons.forEach((l, idx) => {
    const mainContent = contentMap[l.slug];
    // Use /python/ prefix for navigation — files now live in public/python/
    const prevFile = idx === 0 ? 'blog-python.html' : `python/${lessons[idx - 1].filename}`;
    const prevTitle = idx === 0 ? 'Python 3 Overview' : lessons[idx - 1].title;
    const nextFile = idx === lessons.length - 1 ? null : `python/${lessons[idx + 1].filename}`;
    const nextTitle = idx === lessons.length - 1 ? '' : lessons[idx + 1].title;

    const fullHtml = wrapPage(
      l.slug,
      `Python 3 ${l.title}`,
      mainContent,
      prevFile,
      prevTitle,
      nextFile,
      nextTitle
    );

    fs.writeFileSync(path.join(publicDir, l.filename), fullHtml, 'utf8');
    console.log(`Generated: public/python/${l.filename}`);
  });

  // All lesson files are now inside public/python/ — clean folder structure ✅

  console.log('🎉 Successfully generated all 15 Python tutorial files!');
}

buildAll();
