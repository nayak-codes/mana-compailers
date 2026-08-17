const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogJavaDir = path.join(publicDir, 'blog-java');

// List of all 27 lessons in blog-java
const javaLessons = [
  { file: '01-welcome-hello-world.html', num: 1, title: 'Welcome & Hello World', desc: 'Introduction to Java, WORA philosophy, JDK vs JRE vs JVM, compiler architecture, and writing your first Java program.' },
  { file: '02-java-setup-and-program-structure.html', num: 2, title: 'Java Setup and Program Structure', desc: 'Anatomy of a Java class, packages, naming conventions (PascalCase/camelCase), and handling syntax vs runtime vs logical errors.' },
  { file: '03-variables-and-data-types.html', num: 3, title: 'Variables & Data Types', desc: 'All 8 primitive types in Java (byte, short, int, long, float, double, boolean, char), memory footprints, and widening/narrowing type casting.' },
  { file: '04-operators-and-input.html', num: 4, title: 'Operators and User Input', desc: 'Arithmetic, relational, logical operators, short-circuit evaluation, and reading interactive terminal input with Scanner.' },
  { file: '05-conditions.html', num: 5, title: 'Conditional Statements (if-else & switch)', desc: 'Decision making using if, else if, else, ternary expressions, and classic switch vs modern Java 14+ arrow switch expressions.' },
  { file: '06-loops.html', num: 6, title: 'Loops & Control Flow', desc: 'Iteration structures (for, while, do-while loops), nested loops, and loop control using break and continue.' },
  { file: '07-strings.html', num: 7, title: 'Strings & String Manipulation', desc: 'String immutability, the JVM String Constant Pool, comparison with .equals() vs ==, common methods, and StringBuilder.' },
  { file: '08-arrays.html', num: 8, title: 'Arrays (1D & Multi-Dimensional)', desc: 'Array declaration, heap allocation, zero-indexed access, Arrays utility class, safe copies, and 2D matrices.' },
  { file: '09-methods.html', num: 9, title: 'Methods & Parameters', desc: 'Method definitions, parameter passing (pass-by-value semantics), return types, method overloading, and recursion.' },
  { file: '10-classes-and-objects.html', num: 10, title: 'Classes and Objects (OOP Core)', desc: 'Core Object-Oriented Programming, class blueprints, heap instance creation with new, fields, methods, and the this keyword.' },
  { file: '11-constructors-and-encapsulation.html', num: 11, title: 'Constructors & Encapsulation', desc: 'Default vs parameterized constructors, constructor chaining with this(), access modifiers (private, protected, public), and getters/setters.' },
  { file: '12-inheritance-and-polymorphism.html', num: 12, title: 'Inheritance & Polymorphism', desc: 'Class hierarchy with extends, method overriding with @Override, super keyword, dynamic method dispatch, and runtime polymorphism.' },
  { file: '13-abstraction-and-interfaces.html', num: 13, title: 'Abstraction & Interfaces', desc: 'Abstract classes vs interfaces, implements keyword, multiple interface inheritance, default methods, and loose coupling design.' },
  { file: '14-exception-handling.html', num: 14, title: 'Exception Handling', desc: 'Checked vs unchecked exceptions, try-catch-finally blocks, throw vs throws keywords, and custom user-defined exception classes.' },
  { file: '15-file-handling.html', num: 15, title: 'File Handling (java.io & java.nio)', desc: 'Reading and writing files with File, FileReader, BufferedReader, FileWriter, try-with-resources, and modern java.nio.file.Files.' },
  { file: '16-collections.html', num: 16, title: 'Collections Framework', desc: 'Dynamic data structures in Java: ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap, and iterating with Iterator / foreach.' },
  { file: '17-generics.html', num: 17, title: 'Generics & Type Safety', desc: 'Generic classes, generic methods, bounded type parameters (<T extends Number>), wildcards (<?>), and compile-time type safety.' },
  { file: '18-lambda-expressions.html', num: 18, title: 'Lambda Expressions & Functional Interfaces', desc: 'Functional interfaces (@FunctionalInterface), lambda syntax, Predicate, Function, Consumer, Supplier, and method references (::).' },
  { file: '19-stream-api.html', num: 19, title: 'Stream API & Data Pipelines', desc: 'Declarative data processing with filter, map, flatMap, reduce, collect, IntStream, groupingBy, and parallel streams.' },
  { file: '20-date-and-time.html', num: 20, title: 'Date and Time (java.time API)', desc: 'Modern date-time handling with LocalDate, LocalTime, LocalDateTime, ZonedDateTime, Duration, Period, and DateTimeFormatter.' },
  { file: '21-multithreading.html', num: 21, title: 'Multithreading & Concurrency', desc: 'Thread creation via Thread class and Runnable interface, synchronized keyword, volatile, thread lifecycle, and ExecutorService.' },
  { file: '22-networking-and-apis.html', num: 22, title: 'Networking and REST APIs', desc: 'HTTP requests with modern HttpClient, HttpRequest, HttpResponse, JSON parsing, URL connections, and building client-server sockets.' },
  { file: '23-jdbc-and-databases.html', num: 23, title: 'JDBC & Database Connectivity', desc: 'Connecting Java to relational databases, DriverManager, Connection, Statement, PreparedStatement, ResultSet, and SQL execution.' },
  { file: '24-maven-and-testing.html', num: 24, title: 'Maven Build Tool & JUnit Testing', desc: 'Project management with pom.xml, dependencies, build lifecycle, writing unit tests with JUnit 5, assertions, and test fixtures.' },
  { file: '25-spring-boot-basics.html', num: 25, title: 'Spring Boot Basics', desc: 'Spring Boot architecture, @SpringBootApplication, building RESTful web services with @RestController, @GetMapping, and dependency injection.' },
  { file: '26-java-projects.html', num: 26, title: 'Real-World Java Projects', desc: 'Hands-on projects tying all concepts together: Student Management CLI, Banking Application with OOP, and RESTful CRUD API.' },
  { file: '27-interview-preparation.html', num: 27, title: 'Java Interview Preparation & Q&A', desc: 'Top Java interview questions, core OOP concepts, memory model (Heap vs Stack), Garbage Collection, Collections intricacies, and coding challenges.' }
];

console.log('Total Java Lessons to link:', javaLessons.length);

// 1. Generate updated public/blog-java.html
function buildBlogJavaHome() {
  let sidebarHtml = `
    <div class="sidebar-heading">Java Tutorial</div>
    <a href="/blog-java.html" class="active">Java HOME</a>
`;
  javaLessons.forEach(l => {
    sidebarHtml += `    <a href="/blog-java/${l.file}">${l.num}. ${l.title}</a>\n`;
  });

  sidebarHtml += `
    <div class="sidebar-heading">Reference</div>
    <a href="/blog.html">All Tutorials</a>
    <a href="/online-java-compiler.html">▶ Try Java Online</a>

    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-python.html">Python 3</a>
    <a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-c.html">C</a>
    <a href="/blog-cpp.html">C++</a>
    <a href="/blog-go.html">Go</a>
    <a href="/blog-rust.html">Rust</a>
    <a href="/blog-php.html">PHP</a>
    <a href="/blog-ruby.html">Ruby</a>
`;

  let tableHtml = `  <table class="tbl" style="margin-top: 15px;">\n    <tr><th>Lesson</th><th>Topic</th><th>Description</th></tr>\n`;
  javaLessons.forEach(l => {
    tableHtml += `    <tr>
      <td><strong>Lesson ${l.num}</strong></td>
      <td><strong><a href="/blog-java/${l.file}">${l.title}</a></strong></td>
      <td style="font-size: 13px; color: var(--text2);">${l.desc}</td>
    </tr>\n`;
  });
  tableHtml += `  </table>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Tutorial & Reference Guide (27 Lessons) | Our Compiler</title>
  <meta name="description" content="Master Java from scratch with our comprehensive 27-lesson interactive tutorial covering JVM architecture, OOP, Collections, Multithreading, JDBC, Spring Boot, and interview preparation with live runnable code examples." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
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

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_java', codeEl.textContent);
              window.location.href = '/online-java-compiler.html';
            });
          }
        });
      });
    })();
  </script>
  <link rel="stylesheet" href="/site-nav.css" />
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
  <a href="/?lang=nodejs">Node.js</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
${sidebarHtml}  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-java.html">Java</a><span>›</span>
      <span>Course Index</span>
    </div>
    
    <h1 class="page-title">Java Tutorial & Reference Guide</h1>
    <div class="page-meta">
      <span class="badge">☕ Java</span>
      <span class="badge">🟢 27 Interactive Lessons</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Java is an exceptionally robust, class-based, object-oriented programming language designed around the philosophy of <em>"Write Once, Run Anywhere" (WORA)</em>. Built by Sun Microsystems in 1995 and maintained by Oracle, Java powers millions of enterprise backends, cloud microservices, Android mobile applications, and big data systems. In this comprehensive 27-lesson curriculum, you will master Java from the ground up — from syntax fundamentals, memory models, and OOP principles to Collections, Lambdas, Streams, Multithreading, JDBC, Spring Boot, and interview preparation with live runnable code examples.</p>
    </div>

    <div class="section">
      <div class="section-title"><span class="num">▶</span> Course Curriculum (27 Lessons)</div>
      <p>Select any lesson from the curriculum below or choose a topic from the left sidebar to start learning Java:</p>
${tableHtml}
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn">
        <span class="label">← Tutorials Hub</span>
        <span class="title">All Languages</span>
      </a>
      <a href="/blog-java/01-welcome-hello-world.html" class="nav-btn" style="text-align:right;">
        <span class="label">Start Course →</span>
        <span class="title">1. Welcome & Hello World</span>
      </a>
    </div>
  </main>
</div>
  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, 'blog-java.html'), html, 'utf8');
  console.log('✅ Updated public/blog-java.html successfully');
}

// 2. Enhance each of the 27 files in public/blog-java/
function enhanceLessonFiles() {
  javaLessons.forEach((lesson, index) => {
    const filePath = path.join(blogJavaDir, lesson.file);
    if (!fs.existsSync(filePath)) {
      console.warn('File not found:', filePath);
      return;
    }

    const raw = fs.readFileSync(filePath, 'utf8');

    // Extract lesson main content
    let mainContent = '';
    const mainMatch = raw.match(/<main class="content">([\s\S]*?)<\/main>/i);
    if (mainMatch) {
      mainContent = mainMatch[1];
    } else {
      mainContent = raw;
    }

    // Clean up old breadcrumbs, page titles, badges, old pagenav, and old topbar
    mainContent = mainContent.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/i, '');
    mainContent = mainContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
    mainContent = mainContent.replace(/<div class="badges">[\s\S]*?<\/div>/i, '');
    mainContent = mainContent.replace(/<div class="pagenav">[\s\S]*?<\/div>/i, '');
    mainContent = mainContent.replace(/<div class="nav-footer">[\s\S]*?<\/div>/i, '');

    // Convert plain <pre><code> (if not inside .code-block or .try-box) into modern .code-block
    // Also protect try-box code blocks from being double-wrapped
    mainContent = mainContent.replace(/<div class="try-box">([\s\S]*?)<\/div>/gi, (match, inner) => {
      // Ensure run button links to online-java-compiler
      let cleanInner = inner.replace(/href="[^"]*online-java-compiler\.html[^"]*"/g, 'href="/online-java-compiler.html"');
      if (!cleanInner.includes('href="/online-java-compiler.html"')) {
        cleanInner = cleanInner.replace(/<a class="run-btn"[^>]*>[\s\S]*?<\/a>/gi, '<a class="run-btn" href="/online-java-compiler.html">Run This in Our Compiler →</a>');
      }
      return `<div class="try-box">${cleanInner}</div>`;
    });

    // Replace other standalone <pre><code> that are outside of .try-box with .code-block
    // We can do this safely:
    const parts = mainContent.split(/(<div class="try-box">[\s\S]*?<\/div>|<div class="code-block">[\s\S]*?<\/div>)/gi);
    for (let p = 0; p < parts.length; p++) {
      if (!parts[p].startsWith('<div class="try-box">') && !parts[p].startsWith('<div class="code-block">')) {
        parts[p] = parts[p].replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (m, codeText) => {
          return `<div class="code-block">
  <div class="code-block-header">
    <span class="lang-tag">Java</span>
    <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
  </div>
  <pre><code>${codeText}</code></pre>
</div>`;
        });
      }
    }
    mainContent = parts.join('');

    // Build sidebar
    let sidebarHtml = `
    <div class="sidebar-heading">Java Tutorial</div>
    <a href="/blog-java.html">Java HOME</a>
`;
    javaLessons.forEach(l => {
      const isActive = l.file === lesson.file;
      sidebarHtml += `    <a href="${l.file}"${isActive ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
    });

    sidebarHtml += `
    <div class="sidebar-heading">Reference</div>
    <a href="/blog.html">All Tutorials</a>
    <a href="/online-java-compiler.html">▶ Try Java Online</a>

    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-python.html">Python 3</a>
    <a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-c.html">C</a>
    <a href="/blog-cpp.html">C++</a>
    <a href="/blog-go.html">Go</a>
    <a href="/blog-rust.html">Rust</a>
    <a href="/blog-php.html">PHP</a>
    <a href="/blog-ruby.html">Ruby</a>
`;

    // Previous and Next buttons
    const prevLesson = index > 0 ? javaLessons[index - 1] : null;
    const nextLesson = index < javaLessons.length - 1 ? javaLessons[index + 1] : null;

    let navFooterHtml = `<div class="nav-footer">\n`;
    if (prevLesson) {
      navFooterHtml += `      <a href="${prevLesson.file}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevLesson.num}. ${prevLesson.title}</span>
      </a>\n`;
    } else {
      navFooterHtml += `      <a href="/blog-java.html" class="nav-btn">
        <span class="label">← Java Overview</span>
        <span class="title">Course Index</span>
      </a>\n`;
    }

    if (nextLesson) {
      navFooterHtml += `      <a href="${nextLesson.file}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextLesson.num}. ${nextLesson.title}</span>
      </a>\n`;
    } else {
      navFooterHtml += `      <a href="/blog-java.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Completed 🎉</span>
        <span class="title">Return to Course Index</span>
      </a>\n`;
    }
    navFooterHtml += `    </div>`;

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lesson.title} — Java Tutorial | Our Compiler</title>
  <meta name="description" content="Learn ${lesson.title} in Java with clear explanations, real code examples, common pitfalls, and hands-on exercises in our online Java compiler." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  
  <!-- Blog Theme Switcher & Code Helpers -->
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
              localStorage.setItem('code_java', codeEl.textContent);
              window.location.href = '/online-java-compiler.html';
            });
          }
        });

        // Also wire up Try-It-Yourself run buttons to preload code
        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl && runBtn) {
            runBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_java', codeEl.textContent);
              window.location.href = '/online-java-compiler.html';
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
  <a href="/?lang=nodejs">Node.js</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
${sidebarHtml}  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson ${lesson.num}: ${lesson.title}</span>
    </div>

    <h1 class="page-title">${lesson.title}</h1>

    <div class="page-meta">
      <span class="badge">☕ Java</span>
      <span class="badge">🟢 Lesson ${lesson.num} of 27</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

${mainContent.trim()}

${navFooterHtml}
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

    fs.writeFileSync(filePath, fullHtml, 'utf8');
    console.log(`✅ [${lesson.num}/27] Enhanced ${lesson.file}`);
  });
}

// 3. Update public/blog-java/style.css to support light/dark theme seamlessly
function updateBlogJavaStyle() {
  const css = `/*
 * blog-java/style.css
 * Specialized styling enhancements for Java tutorial lessons.
 */
.try-box {
  background: linear-gradient(135deg, rgba(240, 165, 0, 0.1) 0%, rgba(240, 165, 0, 0.03) 100%);
  border: 1px solid rgba(240, 165, 0, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: var(--accent, #f0a500);
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.try-box .run-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  background: #f0a500;
  color: #121212 !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(240, 165, 0, 0.25);
}

.try-box .run-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.callout {
  background: rgba(234, 179, 8, 0.08);
  border: 1px solid rgba(234, 179, 8, 0.25);
  border-left: 4px solid #f0a500;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #f0a500;
  margin-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.author {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border, #30363d);
  color: var(--text2, #8b949e);
  font-size: 13.5px;
}

.author .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f0a500, #d97706);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(240, 165, 0, 0.3);
}

body.light-theme .callout {
  background: #fff8e6;
  border-color: #f1d58a;
}
`;
  fs.writeFileSync(path.join(blogJavaDir, 'style.css'), css, 'utf8');
  console.log('✅ Updated public/blog-java/style.css');
}

// 4. Update public/sitemap.xml
function updateSitemap() {
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');

  // Generate sitemap items for blog-java lessons
  let javaSitemapUrls = '';
  javaLessons.forEach(l => {
    javaSitemapUrls += `  <url>
    <loc>https://www.ourcompiler.com/blog-java/${l.file}</loc>
    <lastmod>2026-07-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
  });

  // Remove old blog-java-*.html entries and insert new blog-java/*.html
  sitemap = sitemap.replace(/  <url>\s*<loc>https:\/\/www\.ourcompiler\.com\/blog-java-[a-z0-9-]+\.html<\/loc>[\s\S]*?<\/url>\n/g, '');

  if (!sitemap.includes('blog-java/01-welcome-hello-world.html')) {
    sitemap = sitemap.replace(
      `<loc>https://www.ourcompiler.com/blog-java.html</loc>`,
      `<loc>https://www.ourcompiler.com/blog-java.html</loc>\n  </url>\n${javaSitemapUrls}  <url>`
    );
  }

  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Updated public/sitemap.xml with all 27 Java lessons');
}

// Run all
buildBlogJavaHome();
enhanceLessonFiles();
updateBlogJavaStyle();
updateSitemap();
console.log('🎉 Successfully linked and upgraded all 27 Java lessons!');
