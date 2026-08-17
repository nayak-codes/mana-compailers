const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogCDir = path.join(publicDir, 'blog-c');

// List of all 20 lessons in blog-c
const cLessons = [
  { file: '01-introduction-to-c-how-compilation-works.html', num: 1, title: 'Introduction to C & How Compilation Works', desc: 'Origins of C, compiled vs interpreted languages, preprocessing, compilation, assembly, and linking stages.' },
  { file: '02-variables-data-types.html', num: 2, title: 'Variables & Data Types', desc: 'Static typing, memory sizes of int, float, double, char, format specifiers, and constants.' },
  { file: '03-operators-expressions.html', num: 3, title: 'Operators & Expressions', desc: 'Arithmetic operators, integer division rules, relational comparisons, logical operators, and pre/post increment.' },
  { file: '04-input-output-printf-and-scanf.html', num: 4, title: 'Input & Output (printf & scanf)', desc: 'Formatted output with printf, interactive terminal input using scanf, address-of operator &, and buffers.' },
  { file: '05-conditional-statements-if-else-switch.html', num: 5, title: 'Conditional Statements (if-else & switch)', desc: 'Boolean evaluation, if, else if, else branching, ternary operator, switch-case constructs, and break keywords.' },
  { file: '06-loops-for-while-do-while.html', num: 6, title: 'Loops (for, while, do-while)', desc: 'Iteration logic, for loops, while loops, do-while loops, break and continue flow controllers.' },
  { file: '07-functions-recursion.html', num: 7, title: 'Functions & Recursion', desc: 'Function prototypes, signatures, pass-by-value semantics, stack frames, base cases, and recursive execution.' },
  { file: '08-arrays.html', num: 8, title: 'Arrays (1D & Contiguous Memory)', desc: 'Zero-indexed arrays, contiguous memory allocation, array initialization, bounds safety, and traversal.' },
  { file: '09-multi-dimensional-arrays.html', num: 9, title: 'Multi-Dimensional Arrays (2D Matrices)', desc: '2D arrays, row-major memory representation, nested loops traversal, matrix addition, and multiplication.' },
  { file: '10-strings-string-h.html', num: 10, title: 'Strings & string.h Library', desc: 'Null-terminated character arrays, \\0 character, strlen, strcpy, strcat, strcmp, and safe string handling.' },
  { file: '11-pointers-basics.html', num: 11, title: 'Pointers Basics & Memory Addresses', desc: 'Memory addresses, address-of operator &, pointer declaration, dereferencing operator *, and direct memory manipulation.' },
  { file: '12-pointers-arrays.html', num: 12, title: 'Pointers & Arrays', desc: 'Array decay to pointers, pointer arithmetic with type step-sizes, and accessing elements via *(arr + i).' },
  { file: '13-pointers-functions.html', num: 13, title: 'Pointers & Functions (Pass by Reference)', desc: 'Simulating pass-by-reference using pointers, swapping variables in-place, and returning pointers safely.' },
  { file: '14-structures.html', num: 14, title: 'Structures (struct)', desc: 'Grouping heterogeneous data types, struct definition, dot operator (.), structure pointers, and arrow operator (->).' },
  { file: '15-unions-enums.html', num: 15, title: 'Unions & Enumerations (enum)', desc: 'Memory sharing with unions, union vs struct size differences, named integer constants with enums, and typedef.' },
  { file: '16-dynamic-memory-allocation.html', num: 16, title: 'Dynamic Memory Allocation (malloc & free)', desc: 'Heap memory, malloc, calloc, realloc, checking NULL pointers, memory leaks, and releasing with free().' },
  { file: '17-file-handling-in-c.html', num: 17, title: 'File Handling in C (fopen, fscanf, fprintf)', desc: 'File pointers FILE*, open modes (r, w, a), reading and writing text files, EOF handling, and fclose().' },
  { file: '18-preprocessor-directives-macros.html', num: 18, title: 'Preprocessor Directives & Macros', desc: '#include, #define constants, parameterized macros, conditional compilation (#ifdef, #ifndef), and header guards.' },
  { file: '19-storage-classes.html', num: 19, title: 'Storage Classes (auto, static, extern, register)', desc: 'Variable scope, lifetime, static local vs static global variables, extern sharing across files, and register hints.' },
  { file: '20-bitwise-operators-command-line-arguments.html', num: 20, title: 'Bitwise Operators & Command-Line Arguments', desc: 'Bitwise AND (&), OR (|), XOR (^), NOT (~), bit shifting (<<, >>), flags masking, argc, and argv parameters.' }
];

console.log('Total C Lessons to link:', cLessons.length);

// 1. Generate updated public/blog-c.html
function buildBlogCHome() {
  let sidebarHtml = `
    <div class="sidebar-heading">C Tutorial</div>
    <a href="/blog-c.html" class="active">C HOME</a>
`;
  cLessons.forEach(l => {
    sidebarHtml += `    <a href="/blog-c/${l.file}">${l.num}. ${l.title}</a>\n`;
  });

  sidebarHtml += `
    <div class="sidebar-heading">Reference</div>
    <a href="/blog.html">All Tutorials</a>
    <a href="/online-c-compiler.html">▶ Try C Online</a>

    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-python.html">Python 3</a>
    <a href="/blog-java.html">Java</a>
    <a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-cpp.html">C++</a>
    <a href="/blog-go.html">Go</a>
    <a href="/blog-rust.html">Rust</a>
    <a href="/blog-php.html">PHP</a>
    <a href="/blog-ruby.html">Ruby</a>
`;

  let tableHtml = `  <table class="tbl" style="margin-top: 15px;">\n    <tr><th>Lesson</th><th>Topic</th><th>Description</th></tr>\n`;
  cLessons.forEach(l => {
    tableHtml += `    <tr>
      <td><strong>Lesson ${l.num}</strong></td>
      <td><strong><a href="/blog-c/${l.file}">${l.title}</a></strong></td>
      <td style="font-size: 13px; color: var(--text2);">${l.desc}</td>
    </tr>\n`;
  });
  tableHtml += `  </table>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>C Programming Tutorial & Reference Guide (20 Lessons) | Our Compiler</title>
  <meta name="description" content="Master C Programming from scratch with our comprehensive 20-lesson interactive tutorial covering compilation stages, memory layout, pointers, structures, dynamic allocation, and bitwise operations with live runnable code examples." />
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
      <a href="/blog-c.html">C</a><span>›</span>
      <span>Course Index</span>
    </div>
    
    <h1 class="page-title">C Programming Tutorial & Reference Guide</h1>
    <div class="page-meta">
      <span class="badge">🔵 C Programming</span>
      <span class="badge">🟢 20 Interactive Lessons</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>C is one of the most foundational and influential programming languages ever created, developed by Dennis Ritchie in 1972 at Bell Labs. Known as the language of operating systems, embedded hardware, database engines, and runtime environments, C offers fine-grained direct memory control and unmatched runtime performance. In this comprehensive 20-lesson guide, you will master C syntax, compilation stages, raw memory pointers, structures, dynamic memory allocation (malloc/free), and file I/O with live runnable code examples.</p>
    </div>

    <div class="section">
      <div class="section-title"><span class="num">▶</span> Course Curriculum (20 Lessons)</div>
      <p>Select any lesson from the curriculum below or choose a topic from the left sidebar to start learning C:</p>
${tableHtml}
    </div>

    <div class="nav-footer">
      <a href="/blog.html" class="nav-btn">
        <span class="label">← Tutorials Hub</span>
        <span class="title">All Languages</span>
      </a>
      <a href="/blog-c/01-introduction-to-c-how-compilation-works.html" class="nav-btn" style="text-align:right;">
        <span class="label">Start Course →</span>
        <span class="title">1. Introduction to C</span>
      </a>
    </div>
  </main>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, 'blog-c.html'), html, 'utf8');
  console.log('✅ Updated public/blog-c.html successfully');
}

// 2. Enhance each of the 20 files in public/blog-c/
function enhanceLessonFiles() {
  cLessons.forEach((lesson, index) => {
    const filePath = path.join(blogCDir, lesson.file);
    if (!fs.existsSync(filePath)) {
      console.warn('File not found:', filePath);
      return;
    }

    const raw = fs.readFileSync(filePath, 'utf8');

    // Extract lesson main content
    // We want the inner HTML of <main class="content">...</main>
    let mainContent = '';
    const mainMatch = raw.match(/<main class="content">([\s\S]*?)<\/main>/i);
    if (mainMatch) {
      mainContent = mainMatch[1];
    } else {
      mainContent = raw;
    }

    // Clean up old breadcrumbs, page titles, badges, and old pagenav from mainContent so we can build consistent modern ones
    mainContent = mainContent.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/i, '');
    mainContent = mainContent.replace(/<h1>[\s\S]*?<\/h1>/i, '');
    mainContent = mainContent.replace(/<div class="badges">[\s\S]*?<\/div>/i, '');
    mainContent = mainContent.replace(/<div class="pagenav">[\s\S]*?<\/div>/i, '');

    // Convert any plain <pre><code> into modern .code-block
    mainContent = mainContent.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (match, codeText) => {
      // If already inside a try-box or callout, we can leave it or enhance it
      return `<div class="code-block">
  <div class="code-block-header">
    <span class="lang-tag">C Language</span>
    <a class="try-btn" href="/online-c-compiler.html">▶ Run Code</a>
  </div>
  <pre><code>${codeText}</code></pre>
</div>`;
    });

    // Make try-box run-btn link directly to /online-c-compiler.html
    mainContent = mainContent.replace(/href="\/online-c-compiler\.html"/g, 'href="/online-c-compiler.html"');

    // Build sidebar
    let sidebarHtml = `
    <div class="sidebar-heading">C Tutorial</div>
    <a href="/blog-c.html">C HOME</a>
`;
    cLessons.forEach(l => {
      const isActive = l.file === lesson.file;
      sidebarHtml += `    <a href="${l.file}"${isActive ? ' class="active"' : ''}>${l.num}. ${l.title}</a>\n`;
    });

    sidebarHtml += `
    <div class="sidebar-heading">Reference</div>
    <a href="/blog.html">All Tutorials</a>
    <a href="/online-c-compiler.html">▶ Try C Online</a>

    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-python.html">Python 3</a>
    <a href="/blog-java.html">Java</a>
    <a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-cpp.html">C++</a>
    <a href="/blog-go.html">Go</a>
    <a href="/blog-rust.html">Rust</a>
    <a href="/blog-php.html">PHP</a>
    <a href="/blog-ruby.html">Ruby</a>
`;

    // Previous and Next buttons
    const prevLesson = index > 0 ? cLessons[index - 1] : null;
    const nextLesson = index < cLessons.length - 1 ? cLessons[index + 1] : null;

    let navFooterHtml = `<div class="nav-footer">\n`;
    if (prevLesson) {
      navFooterHtml += `      <a href="${prevLesson.file}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevLesson.num}. ${prevLesson.title}</span>
      </a>\n`;
    } else {
      navFooterHtml += `      <a href="/blog-c.html" class="nav-btn">
        <span class="label">← C Overview</span>
        <span class="title">Course Index</span>
      </a>\n`;
    }

    if (nextLesson) {
      navFooterHtml += `      <a href="${nextLesson.file}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextLesson.num}. ${nextLesson.title}</span>
      </a>\n`;
    } else {
      navFooterHtml += `      <a href="/blog-c.html" class="nav-btn" style="text-align:right;">
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
  <title>${lesson.title} — C Language Tutorial | Our Compiler</title>
  <meta name="description" content="Learn ${lesson.title} in C with beginner-friendly explanations, code examples, memory concepts, common pitfalls, and hands-on exercises in our online compiler." />
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
              localStorage.setItem('code_c', codeEl.textContent);
              window.location.href = '/online-c-compiler.html';
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
              localStorage.setItem('code_c', codeEl.textContent);
              window.location.href = '/online-c-compiler.html';
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
      <a href="/blog-c.html">C Language</a><span class="sep">›</span>
      <span class="current">Lesson ${lesson.num}: ${lesson.title}</span>
    </div>

    <h1 class="page-title">${lesson.title}</h1>

    <div class="page-meta">
      <span class="badge">⚙️ C Language</span>
      <span class="badge">🟢 Lesson ${lesson.num} of 20</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

${mainContent.trim()}

${navFooterHtml}
  </main>
</div>

</body>
</html>`;

    fs.writeFileSync(filePath, fullHtml, 'utf8');
    console.log(`✅ [${lesson.num}/20] Enhanced ${lesson.file}`);
  });
}

// 3. Update public/blog-c/style.css to support light/dark theme seamlessly
function updateBlogCStyle() {
  const css = `/*
 * blog-c/style.css
 * Specialized styling enhancements for C Language tutorial lessons.
 */
.try-box {
  background: linear-gradient(135deg, rgba(88, 166, 255, 0.1) 0%, rgba(88, 166, 255, 0.03) 100%);
  border: 1px solid rgba(88, 166, 255, 0.25);
  border-radius: var(--radius, 12px);
  padding: 24px;
  margin: 32px 0;
}

.try-box .try-title {
  font-weight: 700;
  color: var(--accent, #58a6ff);
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
  background: var(--accent, #58a6ff);
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 14px rgba(88, 166, 255, 0.25);
}

.try-box .run-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.callout {
  background: rgba(234, 179, 8, 0.08);
  border: 1px solid rgba(234, 179, 8, 0.25);
  border-left: 4px solid #eab308;
  padding: 18px 22px;
  border-radius: var(--radius, 12px);
  margin: 28px 0;
}

.callout .callout-title {
  font-weight: 700;
  color: #eab308;
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
  background: linear-gradient(135deg, #58a6ff, #1f6feb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(88, 166, 255, 0.3);
}

body.light-theme .callout {
  background: #fff8e6;
  border-color: #f1d58a;
}
`;
  fs.writeFileSync(path.join(blogCDir, 'style.css'), css, 'utf8');
  console.log('✅ Updated public/blog-c/style.css');
}

// 4. Update public/sitemap.xml
function updateSitemap() {
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');

  // Generate sitemap items for blog-c lessons
  let cSitemapUrls = '';
  cLessons.forEach(l => {
    cSitemapUrls += `  <url>
    <loc>https://www.ourcompiler.com/blog-c/${l.file}</loc>
    <lastmod>2026-07-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
  });

  // Remove old blog-c-*.html entries and insert new blog-c/*.html
  sitemap = sitemap.replace(/  <url>\s*<loc>https:\/\/www\.ourcompiler\.com\/blog-c-[a-z0-9-]+\.html<\/loc>[\s\S]*?<\/url>\n/g, '');

  if (!sitemap.includes('blog-c/01-introduction-to-c-how-compilation-works.html')) {
    sitemap = sitemap.replace(
      `<loc>https://www.ourcompiler.com/blog-c.html</loc>`,
      `<loc>https://www.ourcompiler.com/blog-c.html</loc>\n  </url>\n${cSitemapUrls}  <url>`
    );
  }

  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Updated public/sitemap.xml with all 20 C lessons');
}

// Run all
buildBlogCHome();
enhanceLessonFiles();
updateBlogCStyle();
updateSitemap();
console.log('🎉 Successfully linked and upgraded all 20 C lessons!');
