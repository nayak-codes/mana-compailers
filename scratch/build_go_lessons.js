const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const goBlogDir = path.join(publicDir, 'blog-go');

// Ensure directory exists
if (!fs.existsSync(goBlogDir)) {
  fs.mkdirSync(goBlogDir, { recursive: true });
}

// Go Curriculum
const lessons = [
  { slug: 'intro', num: 1, title: 'Welcome & Hello World', filename: 'blog-go/intro.html' },
  { slug: 'variables', num: 2, title: 'Variables & Constants', filename: 'blog-go/variables.html' },
  { slug: 'types-casting', num: 3, title: 'Data Types & Strict Casting', filename: 'blog-go/types-casting.html' },
  { slug: 'conditionals', num: 4, title: 'Conditionals (if-else & switch)', filename: 'blog-go/conditionals.html' },
  { slug: 'loops', num: 5, title: 'Loops & Control Flow', filename: 'blog-go/loops.html' },
  { slug: 'arrays-slices', num: 6, title: 'Arrays & Dynamic Slices', filename: 'blog-go/arrays-slices.html' },
  { slug: 'maps', num: 7, title: 'Maps (Key-Value Pairs)', filename: 'blog-go/maps.html' },
  { slug: 'pointers', num: 8, title: 'Pointers & Memory Addresses', filename: 'blog-go/pointers.html' },
  { slug: 'functions-defer', num: 9, title: 'Functions, Returns & Defer', filename: 'blog-go/functions-defer.html' },
  { slug: 'structs-methods', num: 10, title: 'Structs & Custom Methods', filename: 'blog-go/structs-methods.html' },
  { slug: 'encapsulation', num: 11, title: 'Encapsulation & Package Exports', filename: 'blog-go/encapsulation.html' },
  { slug: 'interfaces', num: 12, title: 'Interfaces & Implicit Duck Typing', filename: 'blog-go/interfaces.html' },
  { slug: 'goroutines', num: 13, title: 'Goroutines & Concurrency Basics', filename: 'blog-go/goroutines.html' },
  { slug: 'channels', num: 14, title: 'Channels & Select Operations', filename: 'blog-go/channels.html' },
  { slug: 'error-handling', num: 15, title: 'Error Handling (Explicit Check)', filename: 'blog-go/error-handling.html' }
];

function getSidebar(activeSlug) {
  let html = `\n    <div class="sidebar-heading">Go Tutorial</div>\n`;
  html += `    <a href="/blog-go.html"${activeSlug === 'home' ? ' class="active"' : ''}>Go HOME</a>\n`;
  
  lessons.forEach(l => {
    html += `    <a href="/${l.filename}"${activeSlug === l.slug ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
  });

  html += `\n    <div class="sidebar-heading">Reference</div>\n`;
  html += `    <a href="/blog.html">All Tutorials</a>\n`;
  html += `    <a href="/?lang=go">▶ Try Go Online</a>\n\n`;

  html += `    <div class="sidebar-heading">Other Languages</div>\n`;
  html += `    <a href="/blog-python.html">Python 3</a>\n`;
  html += `    <a href="/blog-java.html">Java</a>\n`;
  html += `    <a href="/blog-javascript.html">JavaScript</a>\n`;
  html += `    <a href="/blog-c.html">C</a>\n`;
  html += `    <a href="/blog-cpp.html">C++</a>\n`;
  html += `    <a href="/blog-csharp.html">C#</a>\n`;
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
    navFooter += `      <a href="/blog-go.html" class="nav-btn">\n`;
    navFooter += `        <span class="label">← Go Overview</span>\n`;
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
  <meta name="description" content="Learn Go — ${title} with clear explanations, concurrency tutorials, goroutine channels, and interactive compiler executions." />
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
              const langId = urlParams.get('lang') || 'go';
              localStorage.setItem('code_' + langId, codeEl.textContent);
              window.location.href = url;
            });
          }
        });
      });
    })();
  </script>
</head>
<body class="lang-go">

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-go.html" class="active">Go</a>
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
      <a href="/blog-go.html">Go</a><span>›</span>
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
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 1</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Go (often called Golang) is a statically-typed, compiled programming language designed at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. Known for its simplicity, lightning-fast compilation, and first-class concurrency features, it is the backend language of choice for cloud infrastructure (Docker, Kubernetes) and microservices.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Static Compilation & Execution Model</div>
  <p>Unlike languages that require virtual machine layers (like Java's JVM) or interpreted runtimes (like Python), Go compiles directly into **a single, self-contained static binary** containing all standard libraries. This eliminates environment dependency issues on target servers and allows Go applications to start up instantly with minimal memory footprints.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Your First Go Program</div>
  <p>Let's write a standard Hello World code template in Go. Write and compile this in the editor:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Hello World</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Print("Welcome to Our Go Compiler!")
}</code></pre>
  </div>

  <p>Let's analyze the syntax components:</p>
  <ul>
    <li><strong>package main</strong>: Declares that this source file belongs to the \`main\` package, telling the Go compiler to generate an executable binary rather than a shared library.</li>
    <li><strong>import "fmt"</strong>: Injects the standard formatting package, housing output utilities like \`Println()\`.</li>
    <li><strong>func main()</strong>: The mandatory entry point function for every executable Go program.</li>
    <li><strong>fmt.Println()</strong>: Prints text to the screen and appends a trailing newline.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Edit the code in the editor above. Use \`fmt.Printf\` with the type specifier (\`\${"%T"}\`) to print the type of a string variable (e.g. \`fmt.Printf("%T\\n", "Golang")\`). Run the code to verify.
  </div>
</div>
`;

// Lesson 2
lessonContents['variables'] = `
<h1 class="page-title">Variables & Constants</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 2</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Go is a statically-typed language with dynamic type inference. Go enforces clean code, requiring that every declared variable must be used, or the compiler will throw an error.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Short Declaration Operator (:=) & Zero Values</div>
  <p>Variables in Go can be initialized in multiple ways:</p>
  <ul>
    <li><strong>Explicit Declaration</strong>: \`var score int = 95\`</li>
    <li><strong>Short Declaration Operator (\`:=\`)</strong>: \`score := 95\` (Automatically infers the type as integer. Can only be used inside function bodies).</li>
    <li><strong>Zero Values</strong>: If you declare a variable without assigning a value (e.g. \`var count int\`), Go automatically initializes it to its type's default "Zero Value" (\`0\` for integers, \`0.0\` for floats, \`false\` for booleans, and \`""\` for strings).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Variables Code</div>
  <p>Let's run a program declaring variables and verifying zero-value defaults:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Variables & Zero Values</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    // Short declaration
    message := "Golang is awesome!"
    
    // Explicit declarations showing zero values
    var age int
    var rate float64
    var active bool

    const pi = 3.14159 // Constant definition

    fmt.Println(message)
    fmt.Printf("Default Int: %d\\n", age)
    fmt.Printf("Default Float: %.2f\\n", rate)
    fmt.Printf("Default Bool: %t\\n", active)
    fmt.Printf("Constant Pi: %f\\n", pi)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program declaring three variables: a name (string), a price (float64), and a stockCount (int) using the short declaration operator. Print all three variables to the console.
  </div>
</div>
`;

// Lesson 3
lessonContents['types-casting'] = `
<h1 class="page-title">Data Types & Strict Casting</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 3</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Go enforces an extremely strict type system. Unlike languages that automatically cast numeric types, Go requires explicit casting for every single conversion.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Go Primitives & Formatting Specifiers</div>
  <p>Go primitives include boolean, numeric types (integers \`int8\`, \`int32\`, \`int64\`, unsigned \`uint\`, floats \`float32\`, \`float64\`), and string types.</p>
  <p><strong>Strict Type Conversions:</strong> Go does not perform implicit type casting. Even converting an \`int32\` to an \`int64\` requires an explicit type cast: \`var longVal int64 = int64(int32Val)\`. If you try to compile code that performs implicit conversions (like \`int + float\`), compilation will fail.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Cast Operations Code</div>
  <p>Let's run a program demonstrating casting and type formatting check specifiers:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Casting and Type Specifiers</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    intVal := 42
    floatVal := 5.5

    // Explicit casting to double float64 before math operation
    result := float64(intVal) * floatVal
    fmt.Printf("Result value: %f\\n", result)

    // Investigating type metadata (%T formats type string)
    fmt.Printf("Type of intVal: %T\\n", intVal)
    fmt.Printf("Type of floatVal: %T\\n", floatVal)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that defines an integer representing score items, and a float representing total possible items. Perform a division operation to calculate the percentage. Cast variables explicitly to avoid compilation errors and print the result.
  </div>
</div>
`;

// Lesson 4
lessonContents['conditionals'] = `
<h1 class="page-title">Conditionals (if-else & switch)</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 4</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Conditionals control program branch paths using boolean checks. Go provides an initializer syntax for conditionals and prevents switch statement fall-through bugs by default.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> If Initializer Statements & Switch fallthrough rules</div>
  <p>Go supports two key conditional enhancements:</p>
  <ul>
    <li><strong>If Statements with Initializers</strong>: You can execute a short statement before the condition is evaluated. Variables declared in this statement are only visible inside the scope of the if-else block: \`if val := getVal(); val &gt; 10 {}\`.</li>
    <li><strong>No Automatic Switch Fall-through</strong>: Switch statements evaluate only the matching case and exit automatically, eliminating the need for \`break\` statements. If you explicitly want fall-through behavior, use the **\`fallthrough\`** keyword.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Conditionals Code</div>
  <p>Let's run a program executing initializer conditionals and switch structures:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Conditional Structures</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    // If with initializer (score is only visible within the if block)
    if score := 85; score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 80 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: F")
    }

    // Switch case with no break required
    dayNum := 2
    switch dayNum {
    case 1:
        fmt.Println("Monday")
    case 2:
        fmt.Println("Tuesday") // Execution exits here automatically
    case 3:
        fmt.Println("Wednesday")
    default:
        fmt.Println("Invalid Day")
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a switch statement that evaluates an integer score (1-5). Use the \`fallthrough\` keyword to print both the matching rating and the rating below it to verify the fall-through behavior.
  </div>
</div>
`;

// Lesson 5
lessonContents['loops'] = `
<h1 class="page-title">Loops & Control Flow</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 5</span>
  <span class="badge">Beginner</span>
</div>

<div class="intro-box">
  <p>Go keeps syntax clean and minimal. It features only one loop construct: the <code>for</code> loop, which is used to implement standard, while, and range loops.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> The Single Loop Construct: for</div>
  <p>Go implements all loop configurations using the \`for\` keyword:</p>
  <ul>
    <li><strong>Standard For Loop</strong>: \`for i := 0; i &lt; 5; i++ {}\`</li>
    <li><strong>While Loop representation</strong>: \`for condition {}\` (Omit initializer and increment statements).</li>
    <li><strong>Infinite Loop</strong>: \`for {}\` (Omit all parameters).</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Loop Control & range Traversal</div>
  <p>Let's run a program illustrating standard loops, while loops, and using break/continue:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — For Loops</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    // 1. Standard For Loop
    fmt.Print("Standard For: ")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    // 2. While loop representation
    fmt.Print("While representation (skipping 3, breaking at 6): ")
    count := 1
    for count <= 10 {
        if count == 3 {
            count++
            continue; // Skip the rest of this loop iteration
        }
        if count == 6 {
            break; // Exit the loop entirely
        }
        fmt.Printf("%d ", count)
        count++
    }
    fmt.Println()
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a loop that sums all odd numbers between 1 and 20. Skip the number 11 using the \`continue\` keyword, and print the computed sum at the end.
  </div>
</div>
`;

// Lesson 6
lessonContents['arrays-slices'] = `
<h1 class="page-title">Arrays & Dynamic Slices</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 6</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>In Go, arrays are fixed in size. Slices are dynamic, resizing windows built over arrays that form the core data container in Go.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Slices as Dynamic Windows (Length vs. Capacity)</div>
  <p>Go distinguishes between these two structures:</p>
  <ul>
    <li><strong>Array</strong>: Fixed-size container: \`var arr [5]int\`. The array size is part of its type definition, making it rigid.</li>
    <li><strong>Slice</strong>: Dynamically resizable wrapper pointing to an underlying array: \`var s []int\`. Slices track:
      <ul>
        <li><strong>Length</strong>: The number of active elements inside the slice.</li>
        <li><strong>Capacity</strong>: The maximum number of elements the slice can hold before it must reallocate memory.</li>
      </ul>
    </li>
  </ul>
  <p>Adding elements is done using the built-in **\`append()\`** function: \`slice = append(slice, 10)\`.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Slice Manipulations</div>
  <p>Let's run a program demonstrating slices, slice operators, and dynamic appends:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Slices and Operations</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    // Declare slice
    numbers := []int{10, 20, 30}
    fmt.Printf("Len: %d, Cap: %d, Data: %v\\n", len(numbers), cap(numbers), numbers)

    // Dynamic append (resizes memory internally if cap is exceeded)
    numbers = append(numbers, 40)
    fmt.Printf("After Append - Len: %d, Cap: %d, Data: %v\\n", len(numbers), cap(numbers), numbers)

    // Slice operator: slice[start:end] (excludes element at end index)
    subSlice := numbers[1:3] // references indices 1 and 2
    fmt.Println("Sub-slice: ", subSlice)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that creates a slice of strings containing product names. Use a loop to iterate through the slice and print both the index and value of each item. Use the range keyword to simplify the loop.
  </div>
</div>
`;

// Lesson 7
lessonContents['maps'] = `
<h1 class="page-title">Maps (Key-Value Pairs)</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 7</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Maps are hash-table mappings that store key-value pairs. In Go, maps require explicit initialization using the make function before you can write values to them.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Map Initialization and the Comma-OK Idiom</div>
  <p>Key map properties include:</p>
  <ul>
    <li><strong>make()</strong>: Maps must be initialized using the \`make()\` function or a map literal. Writing values to an uninitialized (nil) map causes a runtime panic.</li>
    <li><strong>Comma-OK Idiom</strong>: Accessing a non-existent key in a Go map returns its zero value without error. To verify whether a key actually exists, use the **comma-ok** assignment syntax: \`val, ok := scores["Alice"]\`. If \`ok\` is true, the key exists.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Map Operations Code</div>
  <p>Let's run a program declaring maps, inserting items, and verifying keys using the comma-ok idiom:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Maps</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    // Initialize map using make
    scores := make(map[string]int)

    scores["Alice"] = 95
    scores["Bob"] = 88

    fmt.Println("Scores Map: ", scores)

    // Comma-ok verification
    val, ok := scores["Charlie"]
    if ok {
        fmt.Printf("Charlie's score: %d\\n", val)
    } else {
        fmt.Println("Charlie's score does not exist in the map!")
    }

    // Delete key
    delete(scores, "Bob")
    fmt.Println("After deleting Bob: ", scores)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that maps product names (strings) to their prices (float64). Add three products. Update the price of one product, delete another, and print the map. Use the comma-ok idiom to verify if the deleted product was removed.
  </div>
</div>
`;

// Lesson 8
lessonContents['pointers'] = `
<h1 class="page-title">Pointers & Memory Addresses</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 8</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Pointers are variables that store the memory address of other variables. Go supports pointers to improve performance, but prevents dangerous pointer arithmetic.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Memory Addresses & Safety (No Pointer Arithmetic)</div>
  <p>Go pointers use standard operators: Address-of (\`&\`) and Dereference (\`*\`). Unlike C, **Go does not allow pointer arithmetic** (like \`ptr + 1\`). This prevents variables from pointing to unallocated memory blocks, eliminating common memory corruption and buffer overflow bugs.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Pointers Code</div>
  <p>Let's run a program declaring pointers, displaying addresses, and modifying values via dereferencing:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Pointer Basics</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func main() {
    num := 42
    ptr := &num // ptr stores address of num

    fmt.Printf("Value of num: %d\\n", num)
    fmt.Printf("Address of num: %p\\n", ptr)
    fmt.Printf("Value via Pointer: %d\\n", *ptr)

    // Modify value via pointer dereferencing
    *ptr = 100
    fmt.Printf("Updated value of num: %d\\n", num)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function called \`doubleValue\` that accepts an integer pointer parameter and doubles the value it points to in memory. Declare an integer in \`main()\`, call \`doubleValue\`, and print the result.
  </div>
</div>
`;

// Lesson 9
lessonContents['functions-defer'] = `
<h1 class="page-title">Functions, Returns & Defer</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 9</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Go functions are first-class citizens. They support multiple return values, named returns, and the defer keyword to manage resource cleanups.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Multiple Returns & The defer execution stack</div>
  <p>Go functions provide two unique capabilities:</p>
  <ul>
    <li><strong>Multiple Return Values</strong>: Functions can return multiple values, commonly used to return a result alongside an \`error\` flag.</li>
    <li><strong>defer Keyword</strong>: Postpones the execution of a statement until the enclosing function completes. Deferred calls are pushed onto a Last-In-First-Out (LIFO) stack. This is highly useful for closing files or database streams, ensuring cleanup code runs even if exceptions occur.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Function Configurations Code</div>
  <p>Let's run a program using multiple return functions and tracing deferred cleanup execution ordering:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Multiple Returns & Defer</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

// Multiple return values
func divide(x, y int) (int, bool) {
    if y == 0 {
        return 0, false // division by zero is invalid
    }
    return x / y, true
}

func main() {
    // 1. Trace defer LIFO stack (execution order: 2, then 1)
    defer fmt.Println("Deferred print 1")
    defer fmt.Println("Deferred print 2")

    fmt.Println("Main function executing...")

    // 2. Multiple returns
    res, ok := divide(10, 2)
    if ok {
        fmt.Println("Result: ", res)
    } else {
        fmt.Println("Error occurred during division!")
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function called \`getStats\` that accepts a slice of integers and returns both the sum (int) and count (int) of its elements. Test it in \`main()\` and print both values.
  </div>
</div>
`;

// Lesson 10
lessonContents['structs-methods'] = `
<h1 class="page-title">Structs & Custom Methods</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 10</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Go does not have classes or objects. Instead, custom data structures are defined using structs, and methods are bound to structs using receiver functions.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Value vs. Pointer Receivers</div>
  <p>Methods are functions declared with a **Receiver** argument, which binds the function to a specific type. There are two types of receivers:</p>
  <ul>
    <li><strong>Value Receiver</strong>: Passes a copy of the struct. Modifying struct fields inside the method does not affect the original object.</li>
    <li><strong>Pointer Receiver (\`*Type\`)</strong>: Passes a pointer to the struct. Modifying fields inside the method changes the original object directly. <em>Used to avoid copying large structures in memory.</em></li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Structs & Methods Code</div>
  <p>Let's run a program declaring structures and binding value/pointer receiver methods:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Structs & Receivers</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

struct Student {
    Name  string
    Grade float64
}

// Value Receiver (cannot modify original struct)
func (s Student) printDetails() {
    fmt.Printf("Student: %s, Grade: %.2f\\n", s.Name, s.Grade)
}

// Pointer Receiver (modifies original struct)
func (s *Student) updateGrade(newGrade float64) {
    s.Grade = newGrade
}

func main() {
    s := Student{Name: "Alice", Grade: 3.8}
    s.printDetails()

    s.updateGrade(3.95) // Automatically passes pointer reference
    s.printDetails()     // Displays updated grade
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a struct called \`Car\` with a property \`Speed\` (int). Create a pointer receiver method called \`Accelerate(amount int)\` that increases the speed. Instantiate a car, accelerate it by \`30\`, and print the updated speed.
  </div>
</div>
`;

// Lesson 11
lessonContents['encapsulation'] = `
<h1 class="page-title">Encapsulation & Package Exports</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 11</span>
  <span class="badge">Intermediate</span>
</div>

<div class="intro-box">
  <p>Encapsulation in Go is simple and clean. Access visibility is determined entirely by whether a variable, field, or function name starts with a capital letter.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Capitalization Visibility Rule</div>
  <p>Go does not use access modifier keywords like \`private\`, \`public\`, or \`protected\`. Instead, visibility is managed via naming conventions:</p>
  <ul>
    <li><strong>Exported (Public)</strong>: Any struct field, function, or variable starting with an **uppercase letter** is exported and visible outside its declaring package (e.g. \`fmt.Println\`).</li>
    <li><strong>Unexported (Private)</strong>: Any field or function starting with a **lowercase letter** is private and visible only within its declaring package.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Encapsulation Code</div>
  <p>Let's look at an example illustrating package structure export boundaries:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Encapsulation</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

struct BankAccount {
    Owner   string  // Exported (Public)
    balance float64 // Unexported (Private to package)
}

func main() {
    acc := BankAccount{Owner: "Alice", balance: 500.0}
    fmt.Println("Owner: ", acc.Owner)
    
    // Accessing 'balance' is allowed here because this code is in the same package (main).
    // If 'BankAccount' was imported from another package, accessing 'balance' would fail.
    fmt.Printf("Balance: %.2f\\n", acc.balance)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a struct called \`Product\`. Declare one public field \`Name\` and one private field \`cost\`. Inside the package, write a method to initialize these fields and print details. Explain what happens when external packages try to read the \`cost\` property.
  </div>
</div>
`;

// Lesson 12
lessonContents['interfaces'] = `
<h1 class="page-title">Interfaces & Implicit Duck Typing</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 12</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Interfaces define behavior contracts. C# and Java enforce explicit interface declarations, while Go implements interfaces implicitly.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Duck Typing (Implicit Implementation)</div>
  <p>Go interfaces are implemented **implicitly**. If a struct implements all the methods defined by an interface, Go automatically considers that the struct implements the interface—**no \`implements\` or \`extends\` keywords are required.** This is known as structural typing or "Duck Typing" ("if it walks like a duck and quacks like a duck, it is a duck").</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Interfaces Code</div>
  <p>Let's run a program illustrating implicit interfaces and runtime dispatch polymorphism:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Interfaces & Polymorphism</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

interface Speaker {
    Speak() string
}

struct Dog struct{}

// Dog implicitly implements Speaker because it defines Speak()
func (d Dog) Speak() string {
    return "Woof!"
}

struct Cat struct{}

func (c Cat) Speak() string {
    return "Meow!"
}

func main() {
    // Array of Speaker interfaces
    speakers := []Speaker{Dog{}, Cat{}}

    for _, s := range speakers {
        fmt.Println(s.Speak()) // Runtime dynamic dispatch
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Create an interface called \`Shape\` with a method \`Area() float64\`. Create a struct called \`Square\` that implicitly implements the interface. Instantiate \`Square\` and assign it to a \`Shape\` reference to test polymorphic assignment.
  </div>
</div>
`;

// Lesson 13
lessonContents['goroutines'] = `
<h1 class="page-title">Goroutines & Concurrency Basics</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 13</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Concurrency is built directly into the core design of Go. Goroutines are lightweight threads managed by the Go runtime, rather than the host operating system.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Goroutines vs. OS Threads (The \`go\` Keyword)</div>
  <p>While standard OS threads require megabytes of stack memory, a **Goroutine** starts with just a few kilobytes. To launch a function concurrently as a goroutine, simply prepend the statement with the **\`go\`** keyword: \`go doWork()\`. The scheduler multiplexes thousands of goroutines onto a small number of physical OS threads automatically.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Goroutines Code</div>
  <p>Let's run a program that launches functions concurrently using goroutines:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Goroutines</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import (
    "fmt"
    "time"
)

func showMessage(msg string) {
    for i := 1; i <= 3; i++ {
        fmt.Println(msg)
        time.Sleep(100 * time.Millisecond) // Yield execution thread
    }
}

func main() {
    // Launch function concurrently as a Goroutine
    go showMessage("Async Work Running!")

    // Main thread execution
    showMessage("Main thread running!")

    // Wait slightly to let the async goroutine finish before main exits
    time.Sleep(150 * time.Millisecond)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that launches two goroutines. Each goroutine should print a unique counting sequence (e.g. one prints numbers 1-5, and the other prints letters A-E), sleeping for 50 milliseconds between prints.
  </div>
</div>
`;

// Lesson 14
lessonContents['channels'] = `
<h1 class="page-title">Channels & Select Operations</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 14</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Channels allow goroutines to communicate and synchronize data safely, avoiding shared-memory race conditions.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Channels: Communication pipelines (ch &lt;- val)</div>
  <p>Go implements communication safety using channels: **"Do not communicate by sharing memory; instead, share memory by communicating."**</p>
  <ul>
    <li>\`ch &lt;- val\`: Sends a value into a channel.</li>
    <li>\`val := &lt;-ch\`: Receives a value from a channel.</li>
    <li><strong>Synchronization</strong>: Unbuffered channel operations block execution automatically until both sender and receiver are ready, synchronizing the threads without using locks.</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Channels Code</div>
  <p>Let's run a program communicating values between threads using channels:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Channels</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import "fmt"

func computeSum(a, b int, ch chan int) {
    sum := a + b
    ch <- sum // Send calculated sum into channel
}

func main() {
    // Initialize channel of integers using make
    ch := make(chan int)

    // Launch worker goroutine
    go computeSum(15, 25, ch)

    // Receive value from channel (blocks main thread until value is sent)
    result := <-ch
    fmt.Println("Result received from channel: ", result)
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a program that creates a string channel. Launch a goroutine that sends a message ("Greetings from worker!") into the channel. Receive the message in \`main()\` and print it.
  </div>
</div>
`;

// Lesson 15
lessonContents['error-handling'] = `
<h1 class="page-title">Error Handling (Explicit Check)</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">Lesson 15</span>
  <span class="badge">Advanced</span>
</div>

<div class="intro-box">
  <p>Go does not support try-catch exception handling. Instead, Go requires errors to be returned explicitly as return values, promoting clear, robust code design.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">1</span> Explicit Return Values & The errors Package</div>
  <p>In Go, if a function can fail, it returns an \`error\` object as its last return value. The caller must explicitly check if the returned error is not nil: \`if err != nil { // handle error }\`. While verbose, this ensures errors are handled immediately, preventing silent failures and unhandled runtime crashes.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Error Handling Code</div>
  <p>Let's run a program demonstrating division verification checks and error handling patterns:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">Go — Error Checks</span>
      <a class="try-btn" href="/?lang=go">▶ Run Code</a>
    </div>
    <pre><code>package main

import (
    "errors"
    "fmt"
)

func validateUser(age int) (string, error) {
    if age < 0 {
        return "", errors.New("age cannot be negative")
    }
    return fmt.Sprintf("User age verified: %d", age), nil
}

func main() {
    msg, err := validateUser(-5)
    
    // Explicit error check
    if err != nil {
        fmt.Println("Error caught: ", err.Error())
    } else {
        fmt.Println(msg)
    }
}</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Code Challenge</div>
  <div class="info-box">
    <strong>Challenge:</strong> Write a function called \`Sqrt\` that returns the square root of a float64. Return a custom error if the number is negative. Call the function in \`main()\` with a negative argument, check the error, and print the output.
  </div>
</div>
`;

// Build lessons
console.log('Starting Go lesson generation...');

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

// Generate main index page: blog-go.html
const indexContent = `
<h1 class="page-title">Go Programming Tutorial</h1>
<div class="page-meta">
  <span class="badge">🐹 Go Language</span>
  <span class="badge">🟢 Beginner Friendly</span>
  <span class="badge">📅 July 2026</span>
</div>

<div class="intro-box">
  <p>Go (often called Golang) is an open-source programming language developed by Google. Focused on simplicity, reliability, and extreme execution speed, Go compiles directly to static stand-alone binaries. In this comprehensive course, you will master Go syntax, dynamic type inference, strict type casting, single-loop constructs, dynamic slices, pointer parameters, receiver methods, implicit duck-typing interfaces, Goroutine concurrency, thread channel communication, and explicit error checking paradigms.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
  <p>Choose a topic from the left sidebar or click a lesson below to start learning Go:</p>
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
  'Go Programming Tutorial & Reference Guide',
  indexContent,
  null,
  null,
  lessons[0].filename,
  lessons[0].title
);

fs.writeFileSync(path.join(publicDir, 'blog-go.html'), outputIndexHtml, 'utf8');
console.log('Generated: blog-go.html');
console.log('🎉 Successfully generated all 15 Go tutorial files inside blog-go/ folder!');
