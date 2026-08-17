const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const javaDir = path.join(baseDir, 'blog-java');

if (!fs.existsSync(javaDir)) {
  fs.mkdirSync(javaDir, { recursive: true });
}

// REAL PHASE DEFINITIONS (Clean, grouped masterclass phases matching Python architecture)
const JAVA_CURRICULUM = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'Java Basics',
    icon: '☕',
    desc: 'Introduction to Java, WORA philosophy, features, industry applications, JDK/JRE/JVM architecture, compilation lifecycle, installation, IDEs, first Hello World breakdown, program anatomy, and error types.',
    lessons: [
      { num: 1, file: '01-welcome-hello-world.html', title: '1. Introduction & First Program', subtopics: 'Java ante enti? · WORA · Features · Applications · JDK/JRE/JVM Architecture · Compilation Model · Setup · Hello World · Line Breakdown' },
      { num: 2, file: '02-java-setup-and-program-structure.html', title: '2. Program Structure & Errors', subtopics: 'Source File Anatomy · Class Rules · Comments (Single, Multi, Javadoc) · Naming Conventions · Syntax vs Runtime vs Logical Errors' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Variables & Data Types',
    icon: '📦',
    desc: 'All 22 topics: Variables, declaration vs initialization, 8 primitive types (int, long, float, double, char, boolean), String reference type, Stack vs Heap memory, constants (final), local vs instance vs static scope, type casting (widening & narrowing), var keyword, and naming rules.',
    lessons: [
      { num: 3, file: '03-variables-declaration-and-initialization.html', title: '3. Variables: Declaration & Init', subtopics: 'Variables ante enti? · Declaration · Initialization · Difference & Local Uninitialized Error' },
      { num: 4, file: '04-primitive-data-types-numbers-boolean.html', title: '4. Primitive Types (int, float, char...)', subtopics: '8 Primitives · int vs long (L suffix) · float vs double (f suffix) · char (Unicode) · boolean' },
      { num: 5, file: '05-reference-types-and-strings.html', title: '5. Reference Types & Strings', subtopics: 'Primitive vs Reference · Stack vs Heap · String Class · String Constant Pool · .equals() vs ==' },
      { num: 6, file: '06-variable-scopes-and-constants.html', title: '6. Variable Scopes & final Constants', subtopics: 'Constants with final · Local Variables · Instance Variables · Static Class Variables · Memory Lifecycles' },
      { num: 7, file: '07-type-casting-var-and-naming-rules.html', title: '7. Type Casting, var & Naming Rules', subtopics: 'Widening (Implicit) · Narrowing (Explicit) · Overflow Traps · var Keyword · Java Identifier Naming Rules' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Operators & User Input',
    icon: '⚡',
    desc: 'Arithmetic, relational, logical (short-circuit), bitwise, assignment, and ternary operators with precedence hierarchy and java.util.Scanner console input.',
    lessons: [
      { num: 8, file: '04-operators-and-input.html', title: '8. Operators & Expressions', subtopics: 'Arithmetic · Relational · Logical & Short-Circuit · Bitwise · Compound Assignment · Precedence' },
      { num: 9, file: '04-scanner-input.html', title: '9. Interactive Input with Scanner', subtopics: 'Scanner Class · Reading Primitives · nextInt vs nextLine Buffer Gotchas · CLI Apps' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'Control Flow & Loops',
    icon: '🔀',
    desc: 'Decision making branching: if, if-else, nested conditions, ternary operator, classic switch, modern Java 14+ arrow switch, for loops, while loops, do-while, break, and continue.',
    lessons: [
      { num: 10, file: '05-conditions.html', title: '10. Conditional Statements (if & switch)', subtopics: 'if-else Chains · Ternary Expressions · Classic Switch · Modern Java 14+ Arrow Switch' },
      { num: 11, file: '06-loops.html', title: '11. Loops & Iteration Control', subtopics: 'for Loops · while Loops · do-while Loops · Nested Loop Matrices · break & continue' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Strings & Array Structures',
    icon: '📊',
    desc: 'String immutability, String Constant Pool, StringBuilder, StringBuffer, 1D arrays, and multi-dimensional 2D matrices.',
    lessons: [
      { num: 12, file: '07-strings.html', title: '12. Strings Mastery & StringBuilder', subtopics: 'Immutability · String Constant Pool · String Methods · StringBuilder · StringBuffer' },
      { num: 13, file: '08-arrays.html', title: '13. Arrays (1D & 2D Matrices)', subtopics: 'Array Allocation · Heap Memory · 2D Matrices · Arrays Class · Copying & Sorting' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Methods & Core OOP',
    icon: '🏗️',
    desc: 'Methods, pass-by-value, overloading, recursion, classes, objects, constructors, encapsulation, inheritance, polymorphism, and abstraction.',
    lessons: [
      { num: 14, file: '09-methods.html', title: '14. Methods & Parameters', subtopics: 'Method Signature · Pass-by-Value · Overloading · Varargs (...) · Recursion' },
      { num: 15, file: '10-classes-and-objects.html', title: '15. Classes & Objects (OOP Core)', subtopics: 'OOP Philosophy · Class vs Object · Instantiation (new) · Heap Layout · this Keyword' },
      { num: 16, file: '11-constructors-and-encapsulation.html', title: '16. Constructors & Encapsulation', subtopics: 'Default vs Parameterized · Constructor Chaining (this()) · Access Modifiers · Getters/Setters' },
      { num: 17, file: '12-inheritance-and-polymorphism.html', title: '17. Inheritance & Polymorphism', subtopics: 'extends Keyword · Method Overriding (@Override) · super Keyword · Dynamic Dispatch' },
      { num: 18, file: '13-abstraction-and-interfaces.html', title: '18. Abstraction & Interfaces', subtopics: 'abstract Classes · interfaces · Multiple Inheritance · default & static Methods' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Exceptions, Files & Core APIs',
    icon: '🛡️',
    desc: 'Robust exception handling, try-catch-finally, file reading/writing, and modern java.time API.',
    lessons: [
      { num: 19, file: '14-exception-handling.html', title: '19. Exception Handling', subtopics: 'Checked vs Unchecked · try-catch-finally · throw vs throws · Custom Exceptions' },
      { num: 20, file: '15-file-handling.html', title: '20. File Handling (I/O & NIO)', subtopics: 'BufferedReader & FileWriter · try-with-resources · java.nio.file.Files & Path' },
      { num: 21, file: '20-date-and-time.html', title: '21. Date & Time (java.time)', subtopics: 'LocalDate, LocalTime, LocalDateTime · Period & Duration · DateTimeFormatter' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Collections, Generics & Streams',
    icon: '🧩',
    desc: 'Dynamic collections (List, Set, Map), generics type safety, lambda expressions, and declarative Stream data pipelines.',
    lessons: [
      { num: 22, file: '16-collections.html', title: '22. Collections Framework', subtopics: 'ArrayList vs LinkedList · HashSet vs TreeSet · HashMap Internals · Iterators' },
      { num: 23, file: '17-generics.html', title: '23. Generics & Type Safety', subtopics: 'Generic Classes & Methods · Bounded Types · Wildcards (?) · Type Erasure' },
      { num: 24, file: '18-lambda-expressions.html', title: '24. Lambda & Functional Interfaces', subtopics: 'Lambda Syntax · @FunctionalInterface · Predicate/Function/Consumer · Method References (::)' },
      { num: 25, file: '19-stream-api.html', title: '25. Stream API & Data Pipelines', subtopics: 'filter · map · reduce · collect (groupingBy) · IntStream · Parallel Streams' }
    ]
  },
  {
    id: 'phase9',
    tag: 'Phase 09',
    title: 'Multithreading & Enterprise Java',
    icon: '🚀',
    desc: 'Concurrency, networking, JDBC databases, Maven, Spring Boot, full-stack projects, and top technical interview Q&A.',
    lessons: [
      { num: 26, file: '21-multithreading.html', title: '26. Multithreading & Concurrency', subtopics: 'Thread & Runnable · Lifecycle · synchronized · volatile · ExecutorService Pools' },
      { num: 27, file: '22-networking-and-apis.html', title: '27. Networking & REST APIs', subtopics: 'Modern HttpClient · HttpRequest & HttpResponse · JSON Parsing' },
      { num: 28, file: '23-jdbc-and-databases.html', title: '28. JDBC Database Connectivity', subtopics: 'DriverManager · Connection · PreparedStatement · SQL Safety · ResultSet' },
      { num: 29, file: '24-maven-and-testing.html', title: '29. Maven & JUnit 5 Testing', subtopics: 'pom.xml Structure · Dependency Management · Unit Testing with JUnit 5' },
      { num: 30, file: '25-spring-boot-basics.html', title: '30. Spring Boot Basics', subtopics: 'Spring Boot Architecture · @SpringBootApplication · @RestController APIs' },
      { num: 31, file: '26-java-projects.html', title: '31. Real-World Java Projects', subtopics: 'Student Management CLI · Banking System Simulation · RESTful API Capstone' },
      { num: 32, file: '27-interview-preparation.html', title: '32. Java Interview Preparation', subtopics: 'Top 50 Core Java Questions · Memory Model (Heap vs Stack) · Garbage Collection' }
    ]
  }
];

// Flatten all lessons
const ALL_JAVA_LESSONS = [];
JAVA_CURRICULUM.forEach(p => {
  p.lessons.forEach(l => {
    l.phaseId = p.id;
    l.phaseTag = p.tag;
    l.phaseTitle = p.title;
    ALL_JAVA_LESSONS.push(l);
  });
});

console.log(`Total Java Phases: ${JAVA_CURRICULUM.length}, Total Lessons: ${ALL_JAVA_LESSONS.length}`);

// Function to generate the accordion sidebar HTML
function generateJavaAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  JAVA_CURRICULUM.forEach(phase => {
    const hasActive = phase.lessons.some(l => l.file === currentFile);
    const isOpen = hasActive || (currentFile === null && phase.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';

    html += `      <!-- ${phase.tag}: ${phase.title} -->\n`;
    html += `      <button class="accordion-header${activeHeaderClass}" onclick="toggleAccordion(this)">\n`;
    html += `        <div class="accordion-header-main">\n`;
    html += `          <span class="phase-icon-box">${phase.icon}</span>\n`;
    html += `          <div class="phase-info">\n`;
    html += `            <span class="phase-tag">${phase.tag}</span>\n`;
    html += `            <span class="phase-title">${phase.title}</span>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `        <div class="accordion-header-meta">\n`;
    html += `          <span class="phase-count-badge">${phase.lessons.length} Ch</span>\n`;
    html += `          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n`;
    html += `            <polyline points="9 18 15 12 9 6"></polyline>\n`;
    html += `          </svg>\n`;
    html += `        </div>\n`;
    html += `      </button>\n`;
    html += `      <div class="accordion-content${openContentClass}">\n`;

    phase.lessons.forEach(l => {
      const isActive = l.file === currentFile ? ' class="active"' : '';
      html += `        <a href="/blog-java/${l.file}"${isActive}>${l.title}</a>\n`;
    });

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

// Generate Page Shell
function wrapLessonPage(title, desc, filename, currentNum, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  const accordionSidebar = generateJavaAccordionSidebar(filename);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Java Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="java tutorial, ${title.toLowerCase()}, learn java, java online compiler" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/${filename}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />
  
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    function highlightJavaCode(rawCode) {
      const tokens = [];
      const pushToken = (cls, text) => {
        const id = tokens.length;
        tokens.push(\`<span class="\${cls}">\${text}</span>\`);
        return \`___JAVA_TOK_\${id}___\`;
      };

      // 1. Comments
      let code = rawCode.replace(/(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*$)/gm, m => pushToken('cm', m));

      // 2. Strings & Characters
      code = code.replace(/("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*')/g, m => pushToken('st', m));

      // 3. Annotations (@Override, @SpringBootApplication, etc.)
      code = code.replace(/(@[A-Za-z_][A-Za-z0-9_]*)/g, m => pushToken('fn', m));

      // 4. Keywords
      const kwList = ['public','private','protected','class','interface','enum','extends','implements','static','final','abstract','void','return','new','this','super','package','import','if','else','switch','case','default','break','continue','for','while','do','try','catch','finally','throw','throws','instanceof','synchronized','volatile','transient','native','strictfp','var','record','sealed','permits','yield'];
      const kwRegex = new RegExp(\`\\\\b(\${kwList.join('|')})\\\\b\`, 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 5. Types & Built-in Classes
      const typeList = ['int','double','float','long','short','byte','char','boolean','String','System','Integer','Double','Float','Long','Short','Byte','Character','Boolean','Object','Class','Math','Scanner','Arrays','ArrayList','List','Map','HashMap','Set','HashSet','StringBuilder','StringBuffer','Thread','Runnable','Exception','RuntimeException','Throwable','PrintStream','File','FileReader','BufferedReader','FileWriter','LocalDate','LocalTime','LocalDateTime'];
      const typeRegex = new RegExp(\`\\\\b(\${typeList.join('|')})\\\\b\`, 'g');
      code = code.replace(typeRegex, m => pushToken('vr', m));

      // 6. Methods
      code = code.replace(/\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()/g, (m, fnName) => {
        if (['if','for','while','switch','catch'].includes(fnName)) return m;
        return pushToken('fn', fnName);
      });

      // 7. Numbers
      code = code.replace(/\\b(\\d+(?:\\.\\d+)?[fFdDlL]?)\\b/g, m => pushToken('nu', m));

      // 8. Restore Tokens
      code = code.replace(/___JAVA_TOK_(\\d+)___/g, (_, id) => tokens[id]);
      return code;
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
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

        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;

          const rawCode = codeEl.textContent;
          codeEl.innerHTML = highlightJavaCode(rawCode);

          let actionsContainer = header.querySelector('.code-actions');
          if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'code-actions';
            actionsContainer.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-left: auto;';
            const tryBtn = header.querySelector('.try-btn');
            if (tryBtn) actionsContainer.appendChild(tryBtn);
            header.appendChild(actionsContainer);
          }

          const copyBtn = document.createElement('button');
          copyBtn.className = 'copy-btn';
          copyBtn.innerHTML = '📋 Copy';
          copyBtn.style.cssText = 'background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: "Inter", sans-serif; white-space: nowrap;';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode).then(() => {
              copyBtn.innerHTML = '✅ Copied!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copy'; }, 2000);
            });
          });
          actionsContainer.insertBefore(copyBtn, actionsContainer.firstChild);

          const tryBtn = actionsContainer.querySelector('.try-btn');
          if (tryBtn) {
            tryBtn.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.setItem('code_java', rawCode);
              window.location.href = '/online-java-compiler.html';
            });
          }
        });

        document.querySelectorAll('.try-box').forEach(tryBox => {
          const codeEl = tryBox.querySelector('pre code');
          const runBtn = tryBox.querySelector('.run-btn');
          if (codeEl) {
            const rawCode = codeEl.textContent;
            codeEl.innerHTML = highlightJavaCode(rawCode);
            if (runBtn) {
              runBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('code_java', rawCode);
                window.location.href = '/online-java-compiler.html';
              });
            }
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
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">Java Master Course</div>
    <a href="/blog-java.html" class="sidebar-home-link">☕ Java Course HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-java-compiler.html" style="color:#f0a500; font-weight:700;">▶ Try Java Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson ${currentNum}: ${title}</span>
    </div>

    <h1 class="page-title">${title}</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 Lesson ${currentNum}</span>
      <span class="badge">📂 Phase 02: Variables & Data Types</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f0a500; font-weight:700;">📌 Covered in this lesson:</span>
      <span>${subtopics}</span>
    </div>

${contentBody}

    <div class="nav-footer">
      ${prevFile ? `
      <a href="${prevFile}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevTitle}</span>
      </a>` : `
      <a href="/blog-java.html" class="nav-btn">
        <span class="label">← Java Overview</span>
        <span class="title">Course Index</span>
      </a>`}

      ${nextFile ? `
      <a href="${nextFile}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextTitle}</span>
      </a>` : `
      <a href="/blog-java.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Phase →</span>
        <span class="title">Phase 3: Operators</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD PHASE 2 CHAPTER 1: Variables Declaration & Initialization (Topics 1 - 4) ──
function buildPhase2Chapter1() {
  const title = "Variables: Declaration & Initialization";
  const desc = "Learn what variables are in Java, variable declaration syntax, initialization, the crucial difference between them, and how to avoid the local uninitialized variable compiler error.";
  const filename = "03-variables-declaration-and-initialization.html";
  const subtopics = "Variables ante enti? · Variable Declaration · Variable Initialization · Declaration vs Initialization Difference · Uninitialized Local Error Trap";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to Chapter 1 of <strong>Phase 2: Variables & Data Types</strong>! In Java, data is at the core of every program. A <strong>variable</strong> is a named storage container in memory (RAM) used to hold and manipulate values during program execution. In this lesson, you will master variable declaration, initialization, and how Java handles uninitialized local variables.</p>
    </div>

    <!-- 1. Variables ante enti? -->
    <div class="section-title"><span class="num">1</span>Variables Ante Enti? (What is a Variable?)</div>
    <div class="section-body">
      <p><strong>Variable</strong> anedhi computer memory (RAM) lo data ni store chesukovadaniki allocate chesina oka <strong>Named Memory Location (Storage Box)</strong>. Mana program run ayye time lo ee container lo unna value ni manam change (vary) cheyyavachu kabatti dheenini <em>Variable</em> antaru.</p>
      
      <p>Real-world analogy: Meeru intlo unna oka box meedha <em>"Sugar"</em> ani label vesi lopala sugar vesinatle, computer RAM lo oka memory block ki <code>age</code> ani label vesi lopala <code>24</code> ane number ni store chesthamu.</p>
    </div>

    <!-- 2. Variable Declaration -->
    <div class="section-title"><span class="num">2</span>Variable Declaration (Syntax & Rules)</div>
    <div class="section-body">
      <p>Java is a <strong>statically-typed language</strong>. Ante prati variable ni mundhugane oka specific Data Type tho <strong>Declare</strong> cheyyali. Declaration ante compiler ki <em>"Ee variable peru idi, dheenilo ee type of data store avthundhi, andhuku thagatta memory allocate cheyyi"</em> ani cheppadam:</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:16px; margin:16px 0;">
        <strong style="color:#58a6ff;">📌 Declaration Syntax:</strong>
        <code style="display:block; margin-top:6px; font-size:14px;">dataType variableName;</code>
      </div>

      <ul style="margin-left:18px; color:var(--text2); line-height:1.7; font-size:14px;">
        <li><code>int studentAge;</code> — 4 bytes integer memory allocate avthundhi.</li>
        <li><code>double bankBalance;</code> — 8 bytes floating point memory allocate avthundhi.</li>
        <li><code>boolean isSubscribed;</code> — 1-bit boolean memory allocate avthundhi.</li>
      </ul>
    </div>

    <!-- 3. Variable Initialization -->
    <div class="section-title"><span class="num">3</span>Variable Initialization (Assigning Initial Value)</div>
    <div class="section-body">
      <p>Already declare chesina variable loki modatisariga value ni assign cheyyadanni <strong>Initialization</strong> antaru. Dheeni kosam assignment operator <code>=</code> vadathamu:</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px; margin:16px 0;">
        <strong style="color:#3fb950;">📌 Initialization Syntax:</strong>
        <code style="display:block; margin-top:6px; font-size:14px;">variableName = value;</code>
      </div>

      <p>Meeru Declaration mariyu Initialization ni single line lo combine chesi kuda rayavachu:</p>
      <code style="display:block; margin:8px 0; padding:10px 14px; background:#0d1117; border-radius:6px; color:#7ee787;">int studentAge = 22; // Combined Declaration + Initialization</code>
    </div>

    <!-- 4. Declaration vs Initialization Difference -->
    <div class="section-title"><span class="num">4</span>Declaration vs Initialization Difference</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Aspect</th><th>Variable Declaration</th><th>Variable Initialization</th></tr>
        <tr>
          <td><strong>Definition</strong></td>
          <td>Specifies the variable name and data type to the compiler.</td>
          <td>Assigns the first concrete value to the memory container.</td>
        </tr>
        <tr>
          <td><strong>Memory Action</strong></td>
          <td>Reserves typed memory space in Stack frame.</td>
          <td>Stores the actual binary data bits into that memory space.</td>
        </tr>
        <tr>
          <td><strong>Syntax</strong></td>
          <td><code>int score;</code></td>
          <td><code>score = 95;</code></td>
        </tr>
        <tr>
          <td><strong>Execution Timing</strong></td>
          <td>Recognized at compile time.</td>
          <td>Executed at runtime.</td>
        </tr>
      </table>

      <div class="callout">
        <div class="callout-title">⚠️ Crucial Trap: Local Variable Uninitialized Error</div>
        <p>Java lo method lopala declare chese <strong>Local Variables</strong> ki JVM default values ivvadu! Meeru initialize cheyyakunda read cheyyadaniki try chesthe, <code>javac</code> compilation error throw chesthundi:</p>
        <div style="background:#0d1117; color:#ff7b72; padding:10px 14px; border-radius:6px; margin-top:8px; font-family:'JetBrains Mono',monospace; font-size:13px;">
          error: variable score might not have been initialized
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Declaration & Init Demo</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // 1. Separate Declaration & Initialization
        int employeeId;
        employeeId = 10045;

        // 2. Combined Declaration & Initialization
        String employeeName = "Balaji Nayak";
        double monthlySalary = 65000.50;
        boolean isActive = true;

        // 3. Re-assigning variable value (Mutating state)
        monthlySalary = 72000.00; // Salary updated

        System.out.println("ID: " + employeeId);
        System.out.println("Name: " + employeeName);
        System.out.println("Updated Salary: Rs." + monthlySalary);
        System.out.println("Active Status: " + isActive);
    }
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Challenge</div>
      <p>Declare and initialize variables to store student details (ID, Name, Branch, GPA, IsHosteler) and print a formatted student card:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java Challenge</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        int studentId = 501;
        String studentName = "Balaji Nayak";
        String branch = "Computer Science & Engineering";
        double gpa = 9.25;
        boolean isHosteler = false;

        System.out.println("🎓 STUDENT PROFILE CARD");
        System.out.println("---------------------------------");
        System.out.println("ID: " + studentId + " | Name: " + studentName);
        System.out.println("Branch: " + branch);
        System.out.println("GPA: " + gpa + " | Hosteler: " + isHosteler);
        System.out.println("---------------------------------");
    }
}</code></pre>
      </div>
      <a class="run-btn" href="/online-java-compiler.html">Run in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for Java 21+ LTS (2026)</div>
    </div>
  `;

  const html = wrapLessonPage(title, desc, filename, 3, subtopics, contentBody, '02-java-setup-and-program-structure.html', '2. Program Structure & Errors', '04-primitive-data-types-numbers-boolean.html', '4. Primitive Types');
  fs.writeFileSync(path.join(javaDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD PHASE 2 CHAPTER 2: Primitive Types (Topics 5 - 10, 12) ───────────
function buildPhase2Chapter2() {
  const title = "Primitive Data Types (int, long, float, double, char, boolean)";
  const desc = "Master all 8 primitive data types in Java: byte, short, int, long (L suffix), float (f suffix), double, char (Unicode), and boolean with memory footprints and ranges.";
  const filename = "04-primitive-data-types-numbers-boolean.html";
  const subtopics = "8 Primitive Data Types · int · long (L suffix) · float (f suffix) · double · char (Unicode) · boolean · Memory Sizes & Ranges";

  const contentBody = `
    <div class="intro-box">
      <p>Java has <strong>8 built-in Primitive Data Types</strong>. Primitives are the most fundamental building blocks in Java — they are not objects, they store raw binary values directly inside <strong>Stack Memory</strong>, and their memory footprints are strictly fixed across all operating systems.</p>
    </div>

    <div class="section-title"><span class="num">1</span>All 8 Primitive Types Master Table</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Type</th><th>Size</th><th>Default</th><th>Range / Description</th><th>Example</th></tr>
        <tr><td><code>byte</code></td><td>1 Byte (8 bits)</td><td><code>0</code></td><td>-128 to 127</td><td><code>byte b = 100;</code></td></tr>
        <tr><td><code>short</code></td><td>2 Bytes (16 bits)</td><td><code>0</code></td><td>-32,768 to 32,767</td><td><code>short s = 30000;</code></td></tr>
        <tr><td><code>int</code></td><td>4 Bytes (32 bits)</td><td><code>0</code></td><td>-2,147,483,648 to +2,147,483,647</td><td><code>int count = 500000;</code></td></tr>
        <tr><td><code>long</code></td><td>8 Bytes (64 bits)</td><td><code>0L</code></td><td>-9 quintillion to +9 quintillion (Requires <code>L</code> suffix)</td><td><code>long views = 8000000000L;</code></td></tr>
        <tr><td><code>float</code></td><td>4 Bytes (32 bits)</td><td><code>0.0f</code></td><td>6-7 decimal precision (Requires <code>f</code> suffix)</td><td><code>float temp = 36.6f;</code></td></tr>
        <tr><td><code>double</code></td><td>8 Bytes (64 bits)</td><td><code>0.0d</code></td><td>15-16 decimal precision (Default decimal type)</td><td><code>double price = 99.99;</code></td></tr>
        <tr><td><code>char</code></td><td>2 Bytes (16 bits)</td><td><code>'\\u0000'</code></td><td>0 to 65,535 (Unicode character in single quotes)</td><td><code>char grade = 'A';</code></td></tr>
        <tr><td><code>boolean</code></td><td>1 bit logical</td><td><code>false</code></td><td>Strictly <code>true</code> or <code>false</code> (No 0 or 1)</td><td><code>boolean isPassed = true;</code></td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>Deep-Dive on Primitives & Gotchas</div>
    <div class="section-body">
      <div style="display:flex; flex-direction:column; gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f0a500; border-radius:8px; padding:14px;">
          <strong style="color:#f0a500;">1. long literal 'L' suffix requirement:</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Java lo ye whole number rラスినా default ga <code>int</code> anukuntundi. Integer range daatina pedda number rasetappudu చివర తప్పనిసరిగా <code>L</code> or <code>l</code> suffix pettali (e.g. <code>long pop = 8000000000L;</code>).</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:14px;">
          <strong style="color:#58a6ff;">2. float literal 'f' suffix requirement:</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Java lo decimals default ga <code>double</code> (8 bytes). Meeru <code>float x = 3.14;</code> ani raste compiler error isthundi. It must be <code>float x = 3.14f;</code>.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:14px;">
          <strong style="color:#3fb950;">3. char vs String:</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;"><code>char</code> single quotes <code>'A'</code> lo okate character untundhi. <code>String</code> double quotes <code>"Hello"</code> lo multiple characters untayi. <code>char</code> can also store Unicode like <code>'\\u0C05'</code> (Telugu 'అ').</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:14px;">
          <strong style="color:#ff7b72;">4. boolean cannot be integer:</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">C/C++ lo <code>0 = false, 1 = true</code> untundhi. Kani Java lo boolean strictly <code>true</code> or <code>false</code> mathrame. <code>boolean b = 1;</code> is illegal.</p>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Primitives Master Demo</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        int maxInt = Integer.MAX_VALUE;
        long globalViews = 9500000000L;
        float piFloat = 3.141592f;
        double piDouble = 3.141592653589793;
        char teluguVowel = '\\u0C05'; // 'అ'
        boolean isJavaFast = true;

        System.out.println("Max Integer: " + maxInt);
        System.out.println("Global Views: " + globalViews);
        System.out.println("Float: " + piFloat + " | Double: " + piDouble);
        System.out.println("Unicode Telugu Letter: " + teluguVowel);
        System.out.println("Is Java Fast? " + isJavaFast);
    }
}</code></pre>
      </div>
    </div>

    <div class="try-box">
      <div class="try-title">💻 Try It Yourself</div>
      <p>Print the minimum and maximum ranges of all numeric types using wrapper constants:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Byte Range: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("Short Range: " + Short.MIN_VALUE + " to " + Short.MAX_VALUE);
        System.out.println("Integer Range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("Long Range: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
    }
}</code></pre>
      </div>
      <a class="run-btn" href="/online-java-compiler.html">Run in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for Java 21+ LTS (2026)</div>
    </div>
  `;

  const html = wrapLessonPage(title, desc, filename, 4, subtopics, contentBody, '03-variables-declaration-and-initialization.html', '3. Variables: Declaration & Init', '05-reference-types-and-strings.html', '5. Reference Types & Strings');
  fs.writeFileSync(path.join(javaDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD PHASE 2 CHAPTER 3: Reference Types & Strings (Topics 11, 13) ────
function buildPhase2Chapter3() {
  const title = "Reference Data Types & String (Stack vs Heap)";
  const desc = "Understand Reference Data Types vs Primitives, String class immutability, the JVM String Constant Pool (SCP), and Stack vs Heap memory layout.";
  const filename = "05-reference-types-and-strings.html";
  const subtopics = "Primitive vs Reference Types · Stack vs Heap Memory Layout · String Class · String Immutability · String Constant Pool (SCP) · .equals() vs ==";

  const contentBody = `
    <div class="intro-box">
      <p>While primitive types hold raw values directly in Stack memory, <strong>Reference Data Types</strong> (like <code>String</code>, Arrays, and Class Objects) store memory references (pointers) to objects residing in the <strong>Heap Memory</strong>. Understanding this distinction is essential to mastering Java.</p>
    </div>

    <div class="section-title"><span class="num">1</span>Stack vs Heap Memory Model</div>
    <div class="section-body">
      <div style="background:#0d1117; border:1px solid #30363d; border-radius:10px; padding:20px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:#f0a500; margin:16px 0; overflow-x:auto;">
┌──────────────────────────────────────┐        ┌──────────────────────────────────────┐
│             STACK MEMORY             │        │              HEAP MEMORY             │
│  (Fast, stores primitives & pointers)│        │   (Stores actual Objects & Strings)  │
├──────────────────────────────────────┤        ├──────────────────────────────────────┤
│  int age = 24;      [Direct Value]   │        │                                      │
│  double gpa = 9.45; [Direct Value]   │        │                                      │
│                                      │        │   ┌───────────────────────────────┐  │
│  String name  ──────(Reference)──────┼───────>│   │  "Balaji Nayak" (String Pool) │  │
│  int[] marks  ──────(Reference)──────┼───────>│   │  [95, 98, 92] (Array Object)  │  │
│                                      │        │   └───────────────────────────────┘  │
└──────────────────────────────────────┘        └──────────────────────────────────────┘
      </div>

      <table class="tbl">
        <tr><th>Feature</th><th>Primitive Data Types</th><th>Reference Data Types</th></tr>
        <tr><td><strong>Storage</strong></td><td>Direct binary value inside <strong>Stack</strong>.</td><td>Object inside <strong>Heap</strong>, pointer in <strong>Stack</strong>.</td></tr>
        <tr><td><strong>Default Value</strong></td><td>0, 0.0, false, '\\u0000'</td><td><code>null</code> (points to no object).</td></tr>
        <tr><td><strong>Methods</strong></td><td>No methods available.</td><td>Has built-in utility methods (`.length()`, `.equals()`).</td></tr>
      </table>
    </div>

    <div class="section-title"><span class="num">2</span>The String Class & String Constant Pool (SCP)</div>
    <div class="section-body">
      <p>Java lo <code>String</code> anedhi built-in reference class. Strings are <strong>immutable</strong> (once created, cannot be changed):</p>

      <div class="callout">
        <div class="callout-title">⚠️ The String Equality Gotcha: .equals() vs ==</div>
        <p>In Java, <code>==</code> compares memory addresses (reference identity), whereas <code>.equals()</code> compares actual text characters:</p>
        <ul style="margin:6px 0 0 18px; color:var(--text2); font-size:13.5px; line-height:1.6;">
          <li><code>s1 == s2</code> — Checks if both variables point to the exact same memory address.</li>
          <li><code>s1.equals(s2)</code> — Checks if both strings contain the exact same characters.</li>
        </ul>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — String Equality Demo</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // String Literals (Reused from String Constant Pool)
        String str1 = "Java";
        String str2 = "Java";

        // Explicit new Object in Heap (Bypasses Pool sharing)
        String str3 = new String("Java");

        System.out.println("str1 == str2 (Same Pool address): " + (str1 == str2)); // true
        System.out.println("str1 == str3 (Different Heap address): " + (str1 == str3)); // false
        System.out.println("str1.equals(str3) (Content comparison): " + str1.equals(str3)); // true
    }
}</code></pre>
      </div>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for Java 21+ LTS (2026)</div>
    </div>
  `;

  const html = wrapLessonPage(title, desc, filename, 5, subtopics, contentBody, '04-primitive-data-types-numbers-boolean.html', '4. Primitive Types', '06-variable-scopes-and-constants.html', '6. Variable Scopes & final');
  fs.writeFileSync(path.join(javaDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD PHASE 2 CHAPTER 4: Scopes & Constants (Topics 14 - 17) ──────────
function buildPhase2Chapter4() {
  const title = "Variable Scopes (Local, Instance, Static) & final Constants";
  const desc = "Learn the 3 variable scopes in Java: Local variables, Instance fields, Static class variables, memory lifecycles, and defining immutable constants with final.";
  const filename = "06-variable-scopes-and-constants.html";
  const subtopics = "Constants using final · Local Variables · Instance Variables · Static Class Variables · Memory Lifecycles · Scopes Comparison Table";

  const contentBody = `
    <div class="intro-box">
      <p>Where and how a variable is declared in Java determines its <strong>Scope</strong> (accessibility) and <strong>Lifecycle</strong> (when it is allocated and destroyed in memory). In this lesson, we explore Local, Instance, and Static variables, along with the <code>final</code> keyword for immutable constants.</p>
    </div>

    <div class="section-title"><span class="num">1</span>Constants using final Keyword</div>
    <div class="section-body">
      <p>Oka variable value ni okasari assign chesaka program lo eppudu <strong>change cheyyakunda lock</strong> cheyyadaniki <code>final</code> keyword vadathamu:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — final Constants</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        final double PI = 3.14159265359;
        final int MAX_LOGIN_ATTEMPTS = 3;
        final String APP_NAME = "Our Compiler";

        System.out.println("App: " + APP_NAME + " | Max Attempts: " + MAX_LOGIN_ATTEMPTS);

        // UNCOMMENTING CAUSES COMPILER ERROR:
        // MAX_LOGIN_ATTEMPTS = 5; // error: cannot assign a value to final variable
    }
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>The 3 Variable Scopes in Java</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Type</th><th>Where Declared?</th><th>Memory Location</th><th>Lifecycle</th><th>Default Value?</th></tr>
        <tr>
          <td><strong>1. Local Variable</strong></td>
          <td>Inside method / constructor / block <code>{ }</code></td>
          <td>Stack Frame</td>
          <td>Created on method enter, destroyed on exit.</td>
          <td>❌ <strong>No</strong> (Must initialize manually)</td>
        </tr>
        <tr>
          <td><strong>2. Instance Variable</strong></td>
          <td>Inside class, outside methods (without <code>static</code>)</td>
          <td>Heap (inside object)</td>
          <td>Created on <code>new</code>, destroyed on GC.</td>
          <td>✅ <strong>Yes</strong> (0, 0.0, false, null)</td>
        </tr>
        <tr>
          <td><strong>3. Static Variable</strong></td>
          <td>Inside class with <code>static</code> keyword</td>
          <td>Metaspace / Class Area</td>
          <td>Single shared copy for entire class.</td>
          <td>✅ <strong>Yes</strong> (0, 0.0, false, null)</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Scopes Demo</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    // 1. Static Variable (Shared across all objects)
    static String bankName = "State Bank of India";

    // 2. Instance Variables (Unique per account)
    String accountHolder;
    double accountBalance;

    public void deposit(double amount) {
        // 3. Local Variable (Exists only during this method call)
        double updatedBalance = this.accountBalance + amount;
        this.accountBalance = updatedBalance;
        System.out.println(accountHolder + " deposited Rs." + amount + " | Balance: Rs." + this.accountBalance);
    }

    public static void main(String[] args) {
        Main acc1 = new Main();
        acc1.accountHolder = "Balaji";
        acc1.accountBalance = 5000.0;

        Main acc2 = new Main();
        acc2.accountHolder = "Kalyan";
        acc2.accountBalance = 10000.0;

        System.out.println("Bank: " + Main.bankName);
        acc1.deposit(2500.0);
        acc2.deposit(1000.0);
    }
}</code></pre>
      </div>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for Java 21+ LTS (2026)</div>
    </div>
  `;

  const html = wrapLessonPage(title, desc, filename, 6, subtopics, contentBody, '05-reference-types-and-strings.html', '5. Reference Types & Strings', '07-type-casting-var-and-naming-rules.html', '7. Type Casting, var & Naming Rules');
  fs.writeFileSync(path.join(javaDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD PHASE 2 CHAPTER 5: Type Casting, var & Naming (Topics 18 - 22) ──
function buildPhase2Chapter5() {
  const title = "Type Casting, var Keyword & Naming Rules";
  const desc = "Master Widening vs Narrowing type casting, handling numeric truncation and overflow traps, local-variable type inference with var, and Java identifier naming rules.";
  const filename = "07-type-casting-var-and-naming-rules.html";
  const subtopics = "Type Casting · Widening Conversion (Implicit) · Narrowing Conversion (Explicit) · Overflow Traps · var Keyword · Java Identifier Naming Rules";

  const contentBody = `
    <div class="intro-box">
      <p>In this final chapter of Phase 2, we explore <strong>Type Casting</strong> (converting between compatible data types), the modern <strong><code>var</code> keyword</strong> introduced in Java 10 for local type inference, and the strict rules governing <strong>Java Identifiers & Naming Conventions</strong>.</p>
    </div>

    <div class="section-title"><span class="num">1</span>Type Casting (Widening vs Narrowing)</div>
    <div class="section-body">
      <div style="background:#0d1117; border:1px solid #30363d; border-radius:10px; padding:18px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:#3fb950; margin:16px 0; overflow-x:auto;">
Widening (Implicit - Automatic & Safe):
byte ──> short ──> int ──> long ──> float ──> double
                  (char ──> int)

Narrowing (Explicit - Manual Casting with (type) - Risk of data loss!):
double ──> float ──> long ──> int ──> short ──> byte
      </div>

      <table class="tbl">
        <tr><th>Conversion Type</th><th>Direction</th><th>Syntax</th><th>Data Loss?</th></tr>
        <tr><td><strong>Widening Casting (Implicit)</strong></td><td>Smaller type to Larger type</td><td><code>double d = myInt;</code></td><td>✅ None (Safe)</td></tr>
        <tr><td><strong>Narrowing Casting (Explicit)</strong></td><td>Larger type to Smaller type</td><td><code>int x = (int) myDouble;</code></td><td>⚠️ Truncation / Overflow</td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Type Casting Demo</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // Widening
        int myInt = 100;
        double myDouble = myInt; // Automatic
        System.out.println("Widening (100 -> double): " + myDouble);

        // Narrowing with truncation
        double price = 499.85;
        int roundedRupees = (int) price; // Decimal .85 lost!
        System.out.println("Narrowing (499.85 -> int): " + roundedRupees);

        // Narrowing with byte overflow (-128 to 127)
        int bigVal = 130;
        byte byteVal = (byte) bigVal; // Overflows to -126
        System.out.println("Byte Overflow (130 -> byte): " + byteVal);
    }
}</code></pre>
      </div>
    </div>

    <div class="section-title"><span class="num">2</span>The var Keyword (Local Variable Type Inference)</div>
    <div class="section-body">
      <p>Java 10 nunchi <code>var</code> keyword tho local variables ki type rayalsina avasaram ledhu; compiler assign chesina value ni batti compile-time lo type ni automatically infer chesthundi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — var Keyword</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        var developerName = "Balaji Nayak"; // Inferred as String
        var yearsOfExp = 4;                 // Inferred as int
        var salary = 85000.75;              // Inferred as double
        var isAvailable = true;             // Inferred as boolean

        System.out.println(developerName + " | Exp: " + yearsOfExp + " yrs | Salary: Rs." + salary);
    }
}</code></pre>
      </div>

      <div class="callout">
        <div class="callout-title">⚠️ When is 'var' NOT Allowed?</div>
        <ul style="margin:6px 0 0 18px; color:var(--text2); font-size:13px; line-height:1.6;">
          <li>Cannot be used for <strong>class fields / instance variables</strong>.</li>
          <li>Cannot be uninitialized: <code>var x;</code> is illegal.</li>
          <li>Cannot be initialized with null: <code>var x = null;</code> is illegal.</li>
          <li>Cannot be method parameters or return types.</li>
        </ul>
      </div>
    </div>

    <div class="section-title"><span class="num">3</span>Java Identifier Naming Rules</div>
    <div class="section-body">
      <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
        <li><strong>Allowed:</strong> Letters (<code>a-z, A-Z</code>), Digits (<code>0-9</code>), <code>$</code>, <code>_</code>.</li>
        <li><strong>Forbidden:</strong> Starting with a digit (e.g. <code>1stRank</code> is illegal).</li>
        <li><strong>Forbidden:</strong> Reserved Java keywords (e.g. <code>class</code>, <code>public</code>, <code>int</code>).</li>
        <li><strong>Case-Sensitive:</strong> <code>total</code>, <code>Total</code>, <code>TOTAL</code> are 3 distinct variables.</li>
        <li><strong>Convention:</strong> Variables and methods MUST follow <strong>camelCase</strong> (e.g. <code>studentName</code>, <code>calculateTotalMarks()</code>).</li>
      </ul>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for Java 21+ LTS (2026)</div>
    </div>
  `;

  const html = wrapLessonPage(title, desc, filename, 7, subtopics, contentBody, '06-variable-scopes-and-constants.html', '6. Variable Scopes & final', '04-operators-and-input.html', 'Phase 3: Operators');
  fs.writeFileSync(path.join(javaDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD blog-java.html HOME PAGE ─────────────────────────────────────────
function buildBlogJavaHome() {
  const accordionSidebar = generateJavaAccordionSidebar(null);

  let roadmapCardsHtml = '';
  JAVA_CURRICULUM.forEach(phase => {
    roadmapCardsHtml += `
    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">${phase.icon}</span>
          <div>
            <div class="phase-roadmap-tag">${phase.tag}</div>
            <h3 class="phase-roadmap-title">${phase.title}</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">${phase.lessons.length} In-Depth Lesson${phase.lessons.length > 1 ? 's' : ''}</span>
      </div>
      <p class="phase-roadmap-desc">${phase.desc}</p>
      <div class="phase-lessons-list">
`;

    phase.lessons.forEach(l => {
      const padIdx = String(l.num).padStart(2, '0');
      roadmapCardsHtml += `        <a href="/blog-java/${l.file}" class="curriculum-lesson-row">
          <div class="lesson-row-left">
            <span class="lesson-idx">${padIdx}</span>
            <div class="lesson-info">
              <span class="lesson-title">${l.title}</span>
              <span class="lesson-subtopics">${l.subtopics}</span>
            </div>
          </div>
          <div class="lesson-row-right">
            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
          </div>
        </a>\n`;
    });

    roadmapCardsHtml += `      </div>
    </div>\n`;
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Java from complete beginner to advanced enterprise level with our in-depth combined curriculum, collapsible roadmap across 9 phases, live code execution, Spring Boot, and interview prep." />
  <meta name="keywords" content="java tutorial, java course, learn java online, java basics, java oop, java collections, java streams, multithreading, spring boot, jdbc, maven, java interview questions" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-java/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org Course Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Java Complete Programming Masterclass (2026 Edition)",
    "description": "Comprehensive 32-lesson Java course covering JVM architecture, variables, data types, OOP, Collections, Generics, Lambdas, Stream API, Multithreading, Networking, JDBC, Spring Boot, and technical interview preparation with live runnable code examples.",
    "provider": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "isAccessibleForFree": true
  }
  </script>

  <!-- Accordion Toggle & Theme Script -->
  <script>
    function toggleAccordion(btn) {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains('open');
      if (isOpen) {
        content.classList.remove('open');
        btn.classList.remove('active');
      } else {
        content.classList.add('open');
        btn.classList.add('active');
      }
    }

    (function() {
      const currentTheme = localStorage.getItem('theme') || 'dark';
      if (currentTheme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.addEventListener('DOMContentLoaded', () => {
          document.body.classList.add('light-theme');
        });
      }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const toggleBtn = document.createElement('button');
          toggleBtn.className = 'blog-theme-toggle';
          toggleBtn.style.cssText = 'margin-left: auto; flex-shrink: 0; background: rgba(255, 255, 255, 0.15); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: "Inter", sans-serif; transition: all 0.2s; white-space: nowrap; margin-right: 12px;';
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
      });
    })();
  </script>
</head>
<body class="lang-java">

<!-- TOP NAVIGATION -->
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
  <a href="/online-html-editor.html">HTML/CSS/JS</a>
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR WITH COLLAPSIBLE ACCORDION -->
  <aside class="sidebar">
    <div class="sidebar-heading">Java Master Course</div>
    <a href="/blog-java.html" class="sidebar-home-link active">☕ Java Course HOME</a>

${accordionSidebar}

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-java-compiler.html" style="color:#f0a500; font-weight:700;">▶ Try Java Online</a>
    <a href="/blog.html">📚 All Tutorials</a>

    <div class="sidebar-heading">Other Courses</div>
    <a href="/blog-python.html">Python Course (65 Lessons)</a>
    <a href="/blog-c.html">C Language (20 Lessons)</a>
    <a href="/online-html-editor.html">HTML/CSS/JS Editor</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <span class="current">Java Masterclass</span>
    </div>

    <h1 class="page-title">Java Programming Master Tutorial</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 32 In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (9 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Java Master Course</strong>. Java is an exceptionally robust, class-based, object-oriented programming language designed around the philosophy of <em>"Write Once, Run Anywhere" (WORA)</em>. Built by Sun Microsystems in 1995 and maintained by Oracle, Java powers millions of enterprise backends, cloud microservices, Android mobile applications, and big data systems. Each chapter in this masterclass combines multiple interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(240, 165, 0, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(240, 165, 0, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f0a500; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning Java?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore foundations, variables & types, control flow, object-oriented programming (OOP), collections, streams, concurrency, or enterprise Spring Boot & interview skills:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-java/01-welcome-hello-world.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-java/03-variables-declaration-and-initialization.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables & Types →</a>
        <a href="/blog-java/04-operators-and-input.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators →</a>
        <a href="/blog-java/05-conditions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 4: Control Flow →</a>
        <a href="/blog-java/10-classes-and-objects.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 6: OOP Core →</a>
        <a href="/blog-java/14-exception-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 7: Exceptions →</a>
        <a href="/blog-java/16-collections.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 8: Collections →</a>
        <a href="/blog-java/25-spring-boot-basics.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 9: Enterprise & Projects →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> Master Course Curriculum (32 Comprehensive Chapters)</div>
    <div class="curriculum-roadmap-container">
${roadmapCardsHtml}
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>
        <strong>Written by Our Compiler Technical Editorial Team</strong><br>
        <span>Reviewed for accuracy & tested on OpenJDK / Oracle JDK 21+ LTS runtime · Last updated August 2026</span>
      </div>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(baseDir, 'blog-java.html'), html, 'utf8');
  console.log('✅ Updated public/blog-java.html with Clean Grouped Roadmap');
}

// Update all sidebars
function updateAllLessonsSidebar() {
  const files = fs.readdirSync(javaDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(javaDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace the sidebar accordion
    const accordionHtml = generateJavaAccordionSidebar(file);
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, `${accordionHtml}\n  </aside>`);

    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`✅ Updated sidebar across all ${files.length} lesson files!`);
}

function run() {
  console.log('🚀 Building Phase 2 Chapters (All 22 topics)...');
  buildPhase2Chapter1();
  buildPhase2Chapter2();
  buildPhase2Chapter3();
  buildPhase2Chapter4();
  buildPhase2Chapter5();
  buildBlogJavaHome();
  updateAllLessonsSidebar();
  console.log('🎉 Phase 2 Chapters successfully built and linked!');
}

run();
