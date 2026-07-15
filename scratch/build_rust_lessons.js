const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const rustBlogDir = path.join(publicDir, 'blog-rust');

// Ensure directory exists
if (!fs.existsSync(rustBlogDir)) {
  fs.mkdirSync(rustBlogDir, { recursive: true });
}

// Rust Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-rust/intro.html' },
  { slug: 'variables', num: 2, title: 'Variables, Mutability & Shadowing', filename: 'blog-rust/variables.html' },
  { slug: 'types-casting', num: 3, title: 'Data Types & Casting', filename: 'blog-rust/types-casting.html' },
  { slug: 'ownership', num: 4, title: 'Ownership & Move Semantics', filename: 'blog-rust/ownership.html' },
  { slug: 'borrowing', num: 5, title: 'References & Borrowing Rules', filename: 'blog-rust/borrowing.html' },
  { slug: 'conditionals', num: 6, title: 'Conditionals (if-else & match)', filename: 'blog-rust/conditionals.html' },
  { slug: 'loops', num: 7, title: 'Loops & Iterators', filename: 'blog-rust/loops.html' },
  { slug: 'vectors', num: 8, title: 'Vectors & Dynamic Collections', filename: 'blog-rust/vectors.html' },
  { slug: 'strings', num: 9, title: 'String vs &str Slices', filename: 'blog-rust/strings.html' },
  { slug: 'structs-impl', num: 10, title: 'Structs & implementation Methods', filename: 'blog-rust/structs-impl.html' },
  { slug: 'enums', num: 11, title: 'Enums & Option Type', filename: 'blog-rust/enums.html' },
  { slug: 'traits', num: 12, title: 'Traits & Interface Contracts', filename: 'blog-rust/traits.html' },
  { slug: 'generics', num: 13, title: 'Generic Programming', filename: 'blog-rust/generics.html' },
  { slug: 'error-handling', num: 14, title: 'Error Handling (Result & ? Operator)', filename: 'blog-rust/error-handling.html' },
  { slug: 'concurrency', num: 15, title: 'Concurrency & Thread Communication', filename: 'blog-rust/concurrency.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Rust Tutorial</div>\n`;
  html += `    <a href="/blog-rust.html"${activeSlug === 'home' ? ' class="active"' : ''}>Rust HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=rust">▶ Try Rust Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-c.html">C</a>\n`;
  html += `    <a href="/blog-cpp.html">C++</a>\n`;
  html += `    <a href="/blog-csharp.html">C#</a>\n`;
  html += `    <a href="/blog-go.html">Go</a>\n`;
  html += `    <a href="/blog-ruby.html">Ruby</a>\n`;
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
    navFooter += `      <a href="/blog-rust.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Rust Overview</span>\n`;
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
  <meta name="description" content="Learn Rust — ${title} with clear explanations, borrow checks, lifetimes, traits, and interactive compiler executions." />
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
              const langId = urlParams.get('lang') || 'rust';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-rust">

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
  <a href="/blog-rust.html" class="active">Rust</a>
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
      <a href="/blog-rust.html">Rust</a><span>›</span>
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
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Rust is a modern systems programming language focused on safety, speed, and concurrency. Developed by Mozilla Research, it achieves memory safety without a garbage collector, making it a powerful replacement for C and C++.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Compiling in Rust</div>
  <p>Rust is a statically compiled language. It uses \`rustc\` to compile code down into native binary execution files. Rust is built on three core pillars: memory safety (checked at compile time), absolute zero-cost abstractions, and concurrency free of data races.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Writing Hello World: The macro println!</div>
  <p>Let's run a classic Hello World program in Rust:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Hello World</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    println!("Hello, World!");
    print!("Welcome to Our Rust Compiler!\\n");
}</code></pre>
  </div>

  <p>Let's examine components:</p>
  <ul>
    <li><strong>fn main()</strong>: The entry point function for every Rust executable.</li>
    <li><strong>println!</strong>: A Rust **macro** (indicated by the exclamation mark \`!\`) that outputs text and appends a newline. Macros expand code during compiling, enabling compile-time argument checks.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code block. Use \`println!\` with placeholders (e.g. \`println!("Value: {}", 42);\`) to print your name and class rating numbers. Run the code.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables, Mutability & Shadowing</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>In Rust, variables are immutable by default. This design choice guarantees thread safety and prevents unintended bugs.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Mutability & Variable Shadowing</div>
  <p>Rust variables support two key characteristics:</p>
  <ul>
    <li><strong>Mutability (\`let mut\`)</strong>: To allow variable values to change, you must explicitly declare mutability using the \`mut\` keyword: \`let mut score = 10;\`.</li>
    <li><strong>Variable Shadowing</strong>: You can declare a new variable with the same name as an existing variable using the \`let\` keyword. The new variable "shadows" the previous one, allowing you to change its value and even its data type while keeping the variable name.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Shadowing Code</div>
  <p>Let's run a program exploring mutability controls and variable shadowing:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Variables</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    // Immutable variable
    let x = 5;
    println!("x: {}", x);

    // Mutable variable
    let mut y = 10;
    y = 15;
    println!("y: {}", y);

    // Shadowing: redeclaring with 'let'
    let spaces = "   "; // String type
    let spaces = spaces.len(); // Shadowed variable is now an integer type
    println!("Spaces length: {}", spaces);
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Declare a variable \`let val = 100;\`. Write a statement that shadows it to hold the value \`"One Hundred"\`. Print it to verify shadowing works.
  </div>
</div>
`;

// Lesson 3
lessonContents['types-casting'] = `
<h1 class="page-title">Data Types & Casting</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Rust is statically typed. The compiler can usually infer variable types, but they must be resolved before compilation. Type casting is strictly explicit.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Scalar Types & casting with 'as'</div>
  <p>Rust primitives include booleans, chars, and numeric types (signed integers \`i8\`-\`i128\`, unsigned \`u8\`-\`u128\`, floats \`f32\` and \`f64\`).</p>
  <p><strong>Explicit Casting:</strong> Rust does not support implicit casting. You cannot add a float to an integer. You must convert values explicitly using the **\`as\`** keyword: \`let ratio = score as f64 / total as f64;\`.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Cast Operations Code</div>
  <p>Let's run a program illustrating numeric casting:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Casting</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    let int_val: i32 = 42;
    let float_val: f64 = 3.14;

    // Explicit casting using the 'as' keyword
    let result = int_val as f64 * float_val;

    println!("Result: {}", result);

    // Integer casting (truncates decimals)
    let int_price = float_val as i32;
    println!("Int Price: {}", int_price);
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Define a \`u8\` integer. Cast it to \`u16\` and then to \`f32\`. Perform division with a float variable and print the final value.
  </div>
</div>
`;

// Lesson 4
lessonContents['ownership'] = `
<h1 class="page-title">Ownership & Move Semantics</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Ownership is Rust's most unique feature. It enables memory safety without a garbage collector by managing heap resources using strict scope rules.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Ownership Rules & Move Semantics</div>
  <p>Memory allocations are managed using three core rules:</p>
  <ul>
    <li>Each value in Rust has an owner variable.</li>
    <li>There can only be one owner at a time.</li>
    <li>When the owner goes out of scope, the value is automatically dropped/deallocated.</li>
  </ul>
  <p><strong>Move Semantics:</strong> When assigning a heap-allocated variable (like a String) to another variable, ownership of the value is **moved** to the new variable. The original variable becomes invalid immediately, preventing double-free memory bugs.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Ownership Move Code</div>
  <p>Let's run a program demonstrating ownership moves and heap drops:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Ownership Move</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    // Allocating a String on the heap
    let s1 = String::from("hello");
    
    // Ownership of the heap data is moved to s2
    let s2 = s1; 

    // println!("s1: {}", s1); // This line would cause a compile-time error! s1 is invalid now.
    println!("s2: {}", s2); // s2 is the valid owner

    // Deep copy (clone) can be used to copy heap memory explicitly
    let s3 = s2.clone();
    println!("s2: {}, s3: {}", s2, s3);
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function that accepts a \`String\` variable, which moves ownership into the function. Try to access the variable in \`main()\` after calling the function, observe the compile-time error, and then fix it by passing a cloned copy instead.
  </div>
</div>
`;

// Lesson 5
lessonContents['borrowing'] = `
<h1 class="page-title">References & Borrowing Rules</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Passing ownership to functions can be inconvenient. Rust provides references to let you access values without taking ownership. This is called borrowing.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> References Borrowing Rules (Aliasing & Mutation)</div>
  <p>Borrowing references (\`&T\`) must follow strict compiler safety rules:</p>
  <ul>
    <li>You can have any number of immutable references (\`&T\`) to a resource.</li>
    <li>You can have **only one** mutable reference (\`&mut T\`) to a resource at a time.</li>
    <li>You cannot have a mutable reference if immutable references already exist.</li>
  </ul>
  <p>These rules prevent data races at compile time, guaranteeing thread safety.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Borrowing Code</div>
  <p>Let's run a program illustrating borrowing rules and reference modifiers:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Borrowing</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    let mut s1 = String::from("hello");

    // Borrowing immutably
    let r1 = &s1;
    let r2 = &s1;
    println!("Immutables: {} and {}", r1, r2);
    // r1 and r2 scopes end here

    // Borrowing mutably
    let r3 = &mut s1;
    r3.push_str(", world");
    println!("Mutable update: {}", r3);
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function that accepts an immutable reference to a string and prints its length. Write another function that accepts a mutable reference to a string and appends your name. Test both.
  </div>
</div>
`;

// Lesson 6
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & match)</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control the branch paths of execution based on boolean checks. In Rust, conditionals are expressions that can return values directly, and match blocks enforce exhaustive evaluations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> If Expressions and Match Exhaustiveness</div>
  <p>Rust conditionals provide two key features:</p>
  <ul>
    <li><strong>If Expressions</strong>: Since \`if\` is an expression, it returns a value. This allows you to assign the result of an if statement directly to a variable: \`let result = if active { 1 } else { 0 };\`. Both branches must return the same data type.</li>
    <li><strong>Exhaustive Match Pattern</strong>: The \`match\` keyword acts like switch-case statements, but **requires all possible cases to be handled**. The compiler will throw an error if any pattern is left unhandled. The placeholder pattern \`_\` acts as the default fallback case.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Conditional Codes</div>
  <p>Let's run a program evaluating if-expressions and exhaustive match blocks:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Conditionals</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    let score = 85;

    // If as an expression
    let grade = if score >= 90 {
        "A"
    } else if score >= 80 {
        "B"
    } else {
        "F"
    };
    println!("Grade: {}", grade);

    // Exhaustive Match statement
    let dice_roll = 3;
    match dice_roll {
        1 => println!("Rolled 1!"),
        3 => println!("Rolled 3!"),
        _ => println!("Rolled something else!"), // default placeholder pattern
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a match statement evaluating a character representing ratings (\'A\', \'B\', \'C\'). Print descriptive feedback for each character. Ensure you include the default pattern placeholder \`_\` to satisfy compile exhaustiveness checks.
  </div>
</div>
`;

// Lesson 7
lessonContents['loops'] = `
<h1 class="page-title">Loops & Iterators</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Rust supports loops to repeat code execution: standard <code>for</code> ranges, conditional <code>while</code> loops, and the infinite <code>loop</code> block.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Loop Expressions Returning values</div>
  <p>In Rust, **\`loop\`** declares an infinite loop. It can also act as an expression, returning a value via the \`break\` keyword: \`let value = loop { if condition { break 42; } };\`.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Loops Code</div>
  <p>Let's run a program illustrating while loops, range loops, and returning values from loops:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Loops</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    // 1. Loop expression returning value
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2; // Returns value from loop
        }
    };
    println!("Result from loop: {}", result);

    // 2. While loop
    let mut num = 3;
    print!("While loop countdown: ");
    while num > 0 {
        print!("{} ", num);
        num -= 1;
    }
    println!();

    // 3. For range loop (1..=3 includes 3)
    print!("For range loop: ");
    for x in 1..=3 {
        print!("{} ", x);
    }
    println!();
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a range loop that sums all odd numbers between 1 and 20. Skip the number 11 using the \`continue\` keyword, and print the computed sum at the end.
  </div>
</div>
`;

// Lesson 8
lessonContents['vectors'] = `
<h1 class="page-title">Vectors & Dynamic Collections</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Arrays in Rust are fixed in size and stored on the stack. Vectors are dynamically resizable arrays stored on the heap.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Vector Allocations & Iteration borrowing</div>
  <p>Slices are dynamic containers: \`let mut v: Vec&lt;i32&gt; = Vec::new();\`. Slices allocate heap space, expanding automatically as items are added. When iterating over a vector using a loop, borrow its reference (\`&amp;v\`) to prevent the loop from taking ownership of the vector and invalidating it.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Vector operations Code</div>
  <p>Let's run a program illustrating vector creations, dynamic insertions, and iterations:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Vectors</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn main() {
    // Declare vector using vec! macro shorthand
    let mut numbers = vec![10, 20, 30];

    numbers.push(40); // Add elements dynamically
    numbers.push(50);

    println!("Vector data: {:?}", numbers);

    // Iterating by borrowing references
    print!("Iterating: ");
    for num in &numbers {
        print!("{} ", num);
    }
    println!();

    // Access elements safely using .get() returning Option
    match numbers.get(10) {
        Some(val) => println!("Element at index 10: {}", val),
        None => println!("Index 10 is out of bounds!"),
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that declares a mutable vector of strings containing product names. Add three products. Remove the last product using \`pop()\` and iterate through the vector to print the remaining items.
  </div>
</div>
`;

// Lesson 9
lessonContents['strings'] = `
<h1 class="page-title">String vs &str Slices</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Rust has two main string types: the heap-allocated growable String class, and the read-only string slice &str.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> String (Heap) vs &str (Reference View)</div>
  <p>Understanding Rust string differences is essential:</p>
  <ul>
    <li><strong>String</strong>: A heap-allocated, growable, UTF-8 encoded string. It owns its data. Created using \`String::from()\` or \`.to_string()\`.</li>
    <li><strong>&str</strong>: A lightweight, read-only slice reference pointing to a string sequence (either in heap, stack, or binary literal data). Does not allocate copy memory.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> String Processing Code</div>
  <p>Let's run a program illustrating string manipulations and slice conversions:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Strings</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn print_view(slice: &str) {
    println!("Viewing slice: {}", slice);
}

fn main() {
    // String literal slice (&str)
    let s1: &str = "hello";

    // Heap allocated String
    let mut s2: String = String::from("hello");
    s2.push_str(", world!"); // Modify heap data

    println!("s1 slice: {}", s1);
    println!("s2 growable: {}", s2);

    // Pass string reference view without copying
    print_view(&s2);
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that slices a heap-allocated \`String\` using ranges (e.g. \`&s[0..5]\`). Pass the slice to a function accepting \`&str\` and print the slice.
  </div>
</div>
`;

// Lesson 10
lessonContents['structs-impl'] = `
<h1 class="page-title">Structs & implementation Methods</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Rust structures define custom data types. Implementation blocks (impl) bind methods and associated functions to these structures.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Struct Declarations & self References</div>
  <p>Rust structures define fields. Methods are declared inside a separate **\`impl\` block**. Methods accept self references to access struct properties:</p>
  <ul>
    <li>\`&self\`: Borrows the struct immutably (read-only access).</li>
    <li>\`&mut self\`: Borrows the struct mutably (allows field modifications).</li>
    <li>\`self\`: Takes ownership of the struct (consumes the object).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Structs & Methods Code</div>
  <p>Let's run a program declaring structures and binding implementation methods:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Structs & Methods</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>struct Student {
    name: String,
    grade: f32,
}

// Implementation block binding methods to Student
impl Student {
    // Associated function (constructor, doesn't take self)
    fn new(name: &str, grade: f32) -> Student {
        Student {
            name: name.to_string(),
            grade,
        }
    }

    // Method borrowing self reference
    fn print_info(&self) {
        println!("Student: {}, Grade: {}", self.name, self.grade);
    }
}

fn main() {
    // Instantiate using constructor
    let s = Student::new("Alice", 3.8);
    s.print_info();
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a struct called \`Rectangle\` with fields \`width\` and \`height\`. Implement methods to calculate its area and check if it is a square, and test them in \`main()\`.
  </div>
</div>
`;

// Lesson 11
lessonContents['enums'] = `
<h1 class="page-title">Enums & Option Type</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Enums in Rust are algebraic data types, allowing variants to hold associated data. Rust uses the Option enum to manage null safety explicitly.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Associated Data & Option Null Safety</div>
  <p>Rust enums are incredibly versatile. Variants can hold different data types. Rust has **no null keyword**. Instead, null safety is handled explicitly using the built-in **\`Option&lt;T&gt;\`** enum:</p>
  <ul>
    <li>\`Some(value)\`: The value exists.</li>
    <li>\`None\`: No value exists (equivalent to null).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Enums Code</div>
  <p>Let's run a program declaring enums with values and processing Option states:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Enums and Options</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>// Enum variants holding associated values
enum Message {
    Quit,
    Write(String),
}

fn main() {
    let msg = Message::Write(String::from("Hello variant"));

    match msg {
        Message::Quit => println!("Quit Variant"),
        Message::Write(text) => println!("Write Variant: {}", text),
    }

    // Option null safety check
    let score: Option<i32> = Some(95);
    let empty_score: Option<i32> = None;

    match score {
        Some(val) => println!("Score exists: {}", val),
        None => println!("No score found!"),
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function that accepts an index and returns an \`Option<String>\` from a list of user names. Use a match block to handle both success and error states.
  </div>
</div>
`;

// Lesson 12
lessonContents['traits'] = `
<h1 class="page-title">Traits & Interface Contracts</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Traits define abstract interface contracts in Rust. They describe shared behaviors that multiple different structures can implement.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Trait contracts and dynamic dispatch</div>
  <p>Traits declare method signatures: \`trait Summary { fn summarize(&amp;self) -&gt; String; }\`. Classes implement traits using the \`impl Trait for Struct\` syntax. Traits support default implementations, and can be passed polymorphically using dynamic dispatch (\`dyn Trait\`).</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Traits Code</div>
  <p>Let's run a program implementing traits on custom structs:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Traits</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>trait Speak {
    fn speak(&self) -> String;
}

struct Dog;

// Implement Speak trait for Dog
impl Speak for Dog {
    fn speak(&self) -> String {
        String::from("Woof! Woof!")
    }
}

struct Cat;

impl Speak for Cat {
    fn speak(&self) -> String {
        String::from("Meow!")
    }
}

fn main() {
    let dog = Dog;
    let cat = Cat;

    println!("Dog: {}", dog.speak());
    println!("Cat: {}", cat.speak());
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create a trait called \`Area\` containing the method \`fn area(&self) -> f64;\`. Implement the trait on a \`Circle\` struct, and test your implementation in \`main()\`.
  </div>
</div>
`;

// Lesson 13
lessonContents['generics'] = `
<h1 class="page-title">Generic Programming</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Generics allow you to write functions and structs that work with multiple data types, preventing code duplication while preserving strict type safety.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Generics Declarations & Trait Bounds</div>
  <p>Generics use placeholder type variables: \`fn swap&lt;T&gt;(x: T) {}\`. When using generics, you can restrict placeholders to only accept types that implement specific traits (known as **Trait Bounds**), allowing you to call trait methods on generic objects safely: \`&lt;T: Display&gt;\`.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Generics Code</div>
  <p>Let's run a program illustrating generic structures and trait bounds constraints:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Generics</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>use std::fmt::Display; // Needed for Display trait bound

// Generic struct representing a Coordinate point
struct Point<T> {
    x: T,
    y: T,
}

// Generic function with Display trait bound restricting placeholder types
fn print_coordinate<T: Display>(label: &str, val: T) {
    println!("{}: {}", label, val);
}

fn main() {
    let int_point = Point { x: 5, y: 10 };
    let float_point = Point { x: 1.5, y: 3.5 };

    println!("Int point x: {}", int_point.x);
    println!("Float point x: {}", float_point.x);

    print_coordinate("Integer", 42);
    print_coordinate("String Slice", "Coordinates resolved");
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a generic function called \`largest\` that accepts a slice of items and returns the largest element. Use trait bounds (\`PartialOrd\`) to ensure the types can be compared.
  </div>
</div>
`;

// Lesson 14
lessonContents['error-handling'] = `
<h1 class="page-title">Error Handling (Result & ? Operator)</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Rust does not support try-catch exceptions. Instead, errors are returned explicitly as variants of the Result enum, enabling robust error handling at compile time.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Result enum & The ? operator propagation</div>
  <p>Recoverable errors in Rust return the built-in **\`Result&lt;T, E&gt;\`** enum:</p>
  <ul>
    <li>\`Ok(value)\`: The operation succeeded, returning the value.</li>
    <li>\`Err(error)\`: The operation failed, returning the error details.</li>
  </ul>
  <p><strong>The ? Operator:</strong> Writing **\`?\`** after a Result expression automatically returns the error to the caller function if the operation fails, dramatically simplifying error propagation syntax.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Error Handling Code</div>
  <p>Let's run a program illustrating Result handling and error propagation using the ? operator:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Result error checking</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>fn divide(x: f64, y: f64) -> Result<f64, String> {
    if y == 0.0 {
        return Err(String::from("Division by zero error."));
    }
    Ok(x / y)
}

fn calculate() -> Result<f64, String> {
    // The '?' operator automatically returns the error if divide fails
    let value = divide(10.0, 0.0)?; 
    Ok(value * 2.0)
}

fn main() {
    match calculate() {
        Ok(result) => println!("Calculation Result: {}", result),
        Err(err) => println!("Error Caught: {}", err),
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a custom function called \`parse_number\` that takes a string slice and returns a \`Result<i32, String>\`. If the string cannot be parsed as an integer, return a descriptive error message.
  </div>
</div>
`;

// Lesson 15
lessonContents['concurrency'] = `
<h1 class="page-title">Concurrency & Thread Communication</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Rust guarantees safe concurrency. The compiler prevents data races at compile time, ensuring thread safety before your code ever runs.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> OS Threads, the move keyword, and mpsc Channels</div>
  <p>Rust concurrency follows strict safety rules:</p>
  <ul>
    <li><strong>thread::spawn</strong>: Spawns a native OS thread.</li>
    <li><strong>move keyword</strong>: Forces the spawned thread to take ownership of captured variables, preventing dangling references.</li>
    <li><strong>mpsc Channels</strong>: Multi-producer, single-consumer channel communication pipelines, allowing threads to send and receive data safely without shared-memory locks.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Concurrency Code</div>
  <p>Let's run a program spawning threads and sending data through mpsc channels:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Rust — Threads & Channels</span>
      <a class="try-btn" href="/?lang=rust">▶ Run Code</a>
    </div>
    <pre><code>use std::thread;
use std::sync::mpsc; // Multi-producer, single-consumer channels
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    // Spawn a thread and move ownership of tx into it
    thread::spawn(move || {
        let msg = String::from("Greetings from spawned thread!");
        thread::sleep(Duration::from_millis(50));
        tx.send(msg).unwrap(); // Send message into channel
    });

    // Receive message in main thread (blocks execution until data is sent)
    let received = rx.recv().unwrap();
    println!("Received in Main: {}", received);
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Spawn a thread that counts from 1 to 5. Sleep for 100 milliseconds between prints. Ensure you use the \`move\` keyword to pass captured thread variables.
  </div>
</div>
`;

// Build lessons
console.log('Starting Rust lesson generation...');

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

// Generate main index page: blog-rust.html
const indexContent = `
<h1 class="page-title">Rust Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">🦀 Rust</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Rust is a highly optimized systems programming language focusing on speed, memory safety, and thread concurrency. By utilizing compile-time borrow checks and ownership rules, Rust eliminates garbage collection overhead while preventing common memory allocation bugs. In this comprehensive guide, you will master Rust variable immutability, type casting, ownership moves, reference borrowing rules, match pattern exhaustiveness, loop expressions returning values, dynamic vectors, string references views, implementation methods, algebraic Option enums, generic trait bounds, Result error propagation pipelines, and OS multi-threading channels.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Rust:</p>
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
  'Rust Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-rust.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-rust.html');
console.log('🎉 Successfully generated all 15 Rust tutorial files inside blog-rust/ folder!');
