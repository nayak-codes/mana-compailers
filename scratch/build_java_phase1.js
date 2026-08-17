const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const blogJavaDir = path.join(publicDir, 'blog-java');

// Common Header & Scripts Generator
function generateJavaHeader(title, desc, currentFile, currentNum) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Java Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="java tutorial, java basics, java hello world, learn java, jdk jre jvm, java online compiler, java errors" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/${currentFile}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <!-- Schema.org TechArticle Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${title} — Java 21+ Master Tutorial",
    "description": "${desc}",
    "articleSection": "Phase 1: Java Basics",
    "author": {
      "@type": "Organization",
      "name": "Our Compiler Technical Editorial Team",
      "url": "https://www.ourcompiler.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Our Compiler",
      "url": "https://www.ourcompiler.com"
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-08-16"
  }
  </script>

  <!-- Java Syntax Highlighter & Code Preloader Script -->
  <script>
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
        return pushToken('fn', fnName) + '(';
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
        // Theme Toggle Button
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

        // Apply Java syntax highlighting & Copy/Run actions to all code blocks
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
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Java Master Course</div>
    <a href="/blog-java.html" class="sidebar-home-link">☕ Java Course HOME</a>

    <div class="sidebar-heading">Phase 1: Java Basics</div>
    <a href="01-welcome-hello-world.html"${currentNum === 1 ? ' class="active"' : ''}>1. Welcome & Java Basics</a>
    <a href="02-java-setup-and-program-structure.html"${currentNum === 2 ? ' class="active"' : ''}>2. Program Structure & Errors</a>
    <a href="03-variables-and-data-types.html"${currentNum === 3 ? ' class="active"' : ''}>3. Variables & Data Types</a>
    <a href="04-operators-and-input.html"${currentNum === 4 ? ' class="active"' : ''}>4. Operators & User Input</a>

    <div class="sidebar-heading">Phase 2: Control Flow</div>
    <a href="05-conditions.html">5. Conditionals (if/switch)</a>
    <a href="06-loops.html">6. Loops & Control Flow</a>
    <a href="07-strings.html">7. Strings & String Pool</a>
    <a href="08-arrays.html">8. Arrays & Matrices</a>

    <div class="sidebar-heading">Phase 3: Methods & Core OOP</div>
    <a href="09-methods.html">9. Methods & Parameters</a>
    <a href="10-classes-and-objects.html">10. Classes & Objects</a>
    <a href="11-constructors-and-encapsulation.html">11. Constructors & Encapsulation</a>
    <a href="12-inheritance-and-polymorphism.html">12. Inheritance & Polymorphism</a>
    <a href="13-abstraction-and-interfaces.html">13. Abstraction & Interfaces</a>

    <div class="sidebar-heading">Phase 4: Advanced Java</div>
    <a href="14-exception-handling.html">14. Exception Handling</a>
    <a href="15-file-handling.html">15. File Handling</a>
    <a href="16-collections.html">16. Collections Framework</a>
    <a href="17-generics.html">17. Generics & Type Safety</a>
    <a href="18-lambda-expressions.html">18. Lambda & Functional</a>
    <a href="19-stream-api.html">19. Stream API</a>
    <a href="20-date-and-time.html">20. Date & Time API</a>
    <a href="21-multithreading.html">21. Multithreading</a>

    <div class="sidebar-heading">Phase 5: Enterprise & Projects</div>
    <a href="22-networking-and-apis.html">22. Networking & REST APIs</a>
    <a href="23-jdbc-and-databases.html">23. JDBC & Databases</a>
    <a href="24-maven-and-testing.html">24. Maven & JUnit Testing</a>
    <a href="25-spring-boot-basics.html">25. Spring Boot Basics</a>
    <a href="26-java-projects.html">26. Real-World Java Projects</a>
    <a href="27-interview-preparation.html">27. Java Interview Q&A</a>

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-java-compiler.html" style="color:#f0a500; font-weight:700;">▶ Try Java Online</a>
    <a href="/blog.html">📚 All Tutorials</a>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
`;
}

function generateJavaFooter(prevFile, prevTitle, nextFile, nextTitle) {
  let navFooter = `<div class="nav-footer">\n`;
  if (prevFile) {
    navFooter += `      <a href="${prevFile}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${prevTitle}</span>
      </a>\n`;
  } else {
    navFooter += `      <a href="/blog-java.html" class="nav-btn">
        <span class="label">← Java Overview</span>
        <span class="title">Course Index</span>
      </a>\n`;
  }

  if (nextFile) {
    navFooter += `      <a href="${nextFile}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${nextTitle}</span>
      </a>\n`;
  } else {
    navFooter += `      <a href="/blog-java.html" class="nav-btn" style="text-align:right;">
        <span class="label">Course Completed 🎉</span>
        <span class="title">Return to Course Index</span>
      </a>\n`;
  }
  navFooter += `    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
  return navFooter;
}

// ── BUILD LESSON 1: Welcome & Java Basics ─────────────────────────────────
function buildLesson1() {
  const title = "Welcome & Java Basics";
  const desc = "Complete guide to Java Basics: Java ante enti, features & advantages, industry applications, JDK vs JRE vs JVM, compilation lifecycle, installation, IDEs, and deep line-by-line breakdown of the Hello World program.";
  const filename = "01-welcome-hello-world.html";

  const content = `
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 1: Welcome & Java Basics</span>
    </div>

    <h1 class="page-title">Java Introduction & Fundamentals</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 Lesson 1 of 27</span>
      <span class="badge">📂 Phase 1: Java Basics</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f0a500; font-weight:700;">📌 Covered in this lesson:</span>
      <span>Java Ante Enti? · Features & Advantages · Applications · JDK/JRE/JVM Architecture · Compilation Lifecycle · Setup & IDE · Hello World · Line-by-Line Breakdown · System.out.println()</span>
    </div>

    <div class="intro-box">
      <p>Welcome to the <strong>Complete Java Masterclass (Phase 1)</strong>! Java is one of the most powerful, battle-tested, and ubiquitous programming languages in computing history. Over <strong>60 billion active JVM instances</strong> run worldwide across cloud backends, Android smartphones, banking transaction engines, and AI data pipelines. In this lesson, we will understand what Java is, explore its architecture, and master your very first Java program with an exhaustive line-by-line breakdown.</p>
    </div>

    <!-- SECTION 1: Java Ante Enti? -->
    <div class="section-title"><span class="num">1</span>Java Ante Enti? (What is Java?)</div>
    <div class="section-body">
      <p><strong>Java</strong> anedhi oka high-level, class-based, strictly Object-Oriented programming language. Dheenini 1995 lo Sun Microsystems lo unna <strong>James Gosling</strong> mariyu athani team (Green Team) develop chesaru. 2010 lo Oracle Corporation Sun Microsystems ni acquire chesukundhi, ippudu Oracle Java ni actively maintain chesthundi.</p>
      
      <p>Java yokka pradhana lakshanam <em>"Write Once, Run Anywhere" (WORA)</em>. Ante meeru Java code ni oka computer (e.g. Windows) meedha compile chesthe, adhi Linux, macOS, Cloud Servers, or Android devices meedha elanti modifications lekunda direct ga run avthundhi.</p>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0; font-size:14px;">
        <strong style="color:#f0a500;">☕ Fun Fact (Name History):</strong>
        <p style="margin:6px 0 0; color:var(--text2);">Java ni modatlo <strong>Oak</strong> ani pilichevaru (James Gosling office bayata unna Oak tree peru meedha). Kani Oak anedhi already vere company trademark ayyi undatam valla, team members regular ga taage famous Indonesian coffee peru <strong>Java Coffee</strong> ni inspire cheskuni <strong>"Java"</strong> ani peru pettaru. Andhuke Java logo eppudu oka coffee cup la untundhi! ☕</p>
      </div>
    </div>

    <!-- SECTION 2: Java Features & Advantages -->
    <div class="section-title"><span class="num">2</span>Java Features & Advantages (Enduku Java Intha Powerful?)</div>
    <div class="section-body">
      <p>Java world's #1 enterprise language ga nilabadadaaniki unna mukhyamaina features:</p>
      
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#f0a500; font-size:15px;">🌐 1. Platform Independent (WORA)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">Java code direct machine code ga compile avvadu. Adhi <strong>Bytecode (.class)</strong> ga convert avthundhi. JVM unna ye OS meedhaina adhi run avthundhi.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#f0a500; font-size:15px;">🧩 2. Pure Object-Oriented (OOP)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">Java lo prati code class lopale untundhi. Classes, Objects, Inheritance, Encapsulation, Polymorphism, Abstraction valana code reusability and security chaala ekkuva.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#f0a500; font-size:15px;">🛡️ 3. Robust & Memory Safe</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">C/C++ laaga explicit pointers undavu, memory leaks undavu. <strong>Automatic Garbage Collector (GC)</strong> unused memory ni background lo automatically clean chesthundi.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#f0a500; font-size:15px;">🔒 4. High Security</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">Java programs JVM sandbox lopala run avthayi. Bytecode Verifier virus/malicious memory tampering ni execute avvakamundhe block chesthundi.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#f0a500; font-size:15px;">⚡ 5. High Performance (JIT Compiler)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;"><strong>JIT (Just-In-Time) Compiler</strong> frequently used bytecode ni real-time lo native CPU machine instructions ga compile chesi ultra-fast performance isthundi.</p>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px;">
          <strong style="color:#f0a500; font-size:15px;">🧵 6. Built-in Multithreading</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:6px; line-height:1.6;">Okey program lo multiple tasks parallel ga execute chese multi-threading capability Java lo built-in ga undhi. Heavy web servers and games ki idhi backbone.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 3: Java Applications -->
    <div class="section-title"><span class="num">3</span>Java Applications Ekkada Use Chestaru? (Real-World Industry Use Cases)</div>
    <div class="section-body">
      <p>Prapancham lo unna top tech companies Java ni continuous ga enduku vaduthunnaru?</p>
      
      <table class="tbl">
        <tr><th>Application Domain</th><th>Where it is used?</th><th>Real-World Examples</th></tr>
        <tr>
          <td><strong>🏦 Enterprise & Banking Software</strong></td>
          <td>90% of Fortune 500 banks & financial transaction systems run on Java due to extreme security and consistency.</td>
          <td>JPMorgan Chase, HDFC Bank, PayPal, Visa transaction gateways</td>
        </tr>
        <tr>
          <td><strong>📱 Android Mobile Apps</strong></td>
          <td>Android operating system and core app frameworks are natively built with Java & Kotlin APIs.</td>
          <td>Millions of Google Play Store applications</td>
        </tr>
        <tr>
          <td><strong>🌐 Cloud Backends & Microservices</strong></td>
          <td>Scalable REST APIs and microservices running inside Docker containers with Spring Boot.</td>
          <td>Netflix streaming engine, Amazon AWS services, Uber backend</td>
        </tr>
        <tr>
          <td><strong>📊 Big Data & Distributed Computing</strong></td>
          <td>Massive data analytics, distributed data pipelines, and search clusters are built primarily in Java.</td>
          <td>Apache Hadoop, Apache Spark, Apache Kafka, Elasticsearch</td>
        </tr>
        <tr>
          <td><strong>🎮 Game Development & Embedded IoT</strong></td>
          <td>Cross-platform graphics engines, smart cards, and IoT embedded microcontrollers.</td>
          <td>Minecraft (Java Edition), NASA Rover communication systems, Blu-Ray players</td>
        </tr>
      </table>
    </div>

    <!-- SECTION 4: JDK vs JRE vs JVM -->
    <div class="section-title"><span class="num">4</span>JDK, JRE & JVM (In-Depth Architecture & Difference)</div>
    <div class="section-body">
      <p>Java architecture lo eppudu confuse ayye 3 core components — <strong>JVM</strong>, <strong>JRE</strong>, mariyu <strong>JDK</strong>:</p>

      <div style="background:#0d1117; border:1px solid #30363d; border-radius:10px; padding:20px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:#58a6ff; margin:20px 0; overflow-x:auto;">
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           JDK (Java Development Kit)                            │
│  ┌───────────────────────────────────────────────────────────────────────────┐  │
│  │                        JRE (Java Runtime Environment)                     │  │
│  │  ┌─────────────────────────────────────────────────────────────────────┐  │  │
│  │  │                    JVM (Java Virtual Machine)                       │  │  │
│  │  │  • ClassLoader Subsystem (Loads .class bytecode files)              │  │  │
│  │  │  • Bytecode Verifier (Checks safety & security constraints)         │  │  │
│  │  │  • Execution Engine: Interpreter + JIT (Just-In-Time Compiler)      │  │  │
│  │  │  • Garbage Collector (Automatic memory management)                  │  │  │
│  │  │  • JVM Memory: Heap, Stack, Method Area, PC Registers               │  │  │
│  │  └─────────────────────────────────────────────────────────────────────┘  │  │
│  │  + Java Core Standard Libraries (java.lang, java.util, java.io, rt.jar)   │  │
│  └───────────────────────────────────────────────────────────────────────────┘  │
│  + Development Tools: javac (Compiler), jar, javadoc, jdb, jconsole             │
└─────────────────────────────────────────────────────────────────────────────────┘
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:18px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f0a500; border-radius:8px; padding:14px;">
          <strong style="color:#f0a500;">1. JVM (Java Virtual Machine)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;">Actual execution engine. Bytecode (.class) ni read chesi machine language (binary 0s and 1s) loki convert chesi run chesthundi.</p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:14px;">
          <strong style="color:#58a6ff;">2. JRE (Java Runtime Environment)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;"><strong>JRE = JVM + Core Class Libraries</strong>. Java program run avvadaniki idhi saripothundi (Developers code write cheyyakunda just software vadataniki JRE chalu).</p>
        </div>
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:14px;">
          <strong style="color:#3fb950;">3. JDK (Java Development Kit)</strong>
          <p style="font-size:13px; color:var(--text2); margin-top:4px;"><strong>JDK = JRE + Developer Tools (javac compiler, debugger)</strong>. Programmers Java code rasi compile cheyyadaniki complete JDK avasaram.</p>
        </div>
      </div>
    </div>

    <!-- SECTION 5: Compilation Lifecycle -->
    <div class="section-title"><span class="num">5</span>How Java Code Compiles and Runs (Two-Stage Execution Flow)</div>
    <div class="section-body">
      <p>Python direct ga interpret avthundhi, C/C++ direct CPU machine code ga compile avthundhi. Kani Java renditini kalipi <strong>Two-Step Execution Model</strong> vaduthundi:</p>

      <div style="background:#0d1117; border:1px solid #30363d; border-radius:10px; padding:20px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:#3fb950; margin:16px 0; overflow-x:auto;">
[Main.java Source Code] 
        │
        ▼ (Step 1: javac Compiler)
[Main.class Bytecode]  <-- Universal Platform Independent format!
        │
        ▼ (Step 2: JVM loads on any OS)
┌──────────────────────────────────────────────┐
│ JVM Execution Engine                         │
│  ├─ ClassLoader loads bytecode               │
│  ├─ Bytecode Verifier checks memory security │
│  └─ Interpreter + JIT Compiler converts code │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
       [Native Machine Code (CPU Execution)]
                       │
                       ▼
            Terminal: "Hello, World!"
      </div>

      <ol style="margin-left:20px; color:var(--text2); font-size:14.5px; line-height:1.8;">
        <li><strong>Step 1 (Compile-time):</strong> Manam rase <code>Main.java</code> file ni <code>javac Main.java</code> ane compiler <strong>Bytecode (Main.class)</strong> loki convert chesthundi.</li>
        <li><strong>Step 2 (Runtime):</strong> Mana computer lo unna JVM <code>java Main</code> command dwara aa bytecode ni load chesi, local processor (Intel, AMD, Apple Silicon, ARM) ki thagattu execute chesthundi.</li>
      </ol>
    </div>

    <!-- SECTION 6: Java Installation & IDE -->
    <div class="section-title"><span class="num">6</span>Java Installation & IDE / Online Compiler</div>
    <div class="section-body">
      <p>Java code practice cheyyadaniki 2 options unnaayi:</p>
      
      <h4 style="color:#f0a500; margin:14px 0 6px;">Option A: Zero Setup — Our Compiler Online Java IDE (Recommended)</h4>
      <p>Meeru laptop lo JDK install cheyyakunda, direct ga mana browser lo unna <a href="/online-java-compiler.html" style="color:#f0a500; font-weight:700;">Online Java Compiler</a> lo Monaco Editor (VS Code engine) and interactive terminal tho code run cheyyachu!</p>

      <h4 style="color:#58a6ff; margin:18px 0 6px;">Option B: Local Machine Installation (JDK + IDE)</h4>
      <ul>
        <li><strong>1. Download JDK:</strong> Oracle JDK or OpenJDK (Eclipse Temurin / Amazon Corretto) Java 21 LTS download chesukondi.</li>
        <li><strong>2. Environment Variables:</strong> Windows lo <code>JAVA_HOME</code> path (e.g. <code>C:\\Program Files\\Java\\jdk-21</code>) and <code>Path</code> lo <code>%JAVA_HOME%\\bin</code> add cheyyandi.</li>
        <li><strong>3. Verification:</strong> Terminal / CMD lo <code>java -version</code> and <code>javac -version</code> run chesi install aindho ledho verify chesukondi.</li>
        <li><strong>4. Popular Java IDEs:</strong>
          <ul>
            <li><strong>IntelliJ IDEA</strong> (JetBrains) — Industry standard best Java IDE.</li>
            <li><strong>Eclipse IDE</strong> — Free & widely used in enterprise legacy systems.</li>
            <li><strong>VS Code</strong> — Lightweight with Java Extension Pack.</li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- SECTION 7: First Java Program -->
    <div class="section-title"><span class="num">7</span>Your First Java Program (Hello, World!)</div>
    <div class="section-body">
      <p>Ippudu mana first Java program ni rasi compile chesi run cheddam:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Hello World</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run in Compiler</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:14px; margin-top:10px; font-size:13.5px;">
        <strong>🖥️ Program Output:</strong>
        <div style="background:#0d1117; color:#3fb950; padding:10px 14px; border-radius:6px; margin-top:8px; font-family:'JetBrains Mono',monospace;">Hello, World!</div>
      </div>
    </div>

    <!-- SECTION 8: Line-by-Line Breakdown -->
    <div class="section-title"><span class="num">8</span>Exhaustive Line-by-Line Code Breakdown</div>
    <div class="section-body">
      <p>Paina unna 5 lines code lo prati okka word ki chaala deep meaning undhi. Dheenini separate ga analyse cheddam:</p>

      <div style="display:flex; flex-direction:column; gap:16px; margin:20px 0;">
        
        <!-- 1. public class Main -->
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f0a500; border-radius:8px; padding:18px;">
          <h3 style="color:#f0a500; font-size:16px; margin-bottom:8px;">1. <code>public class Main</code></h3>
          <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
            <li><code>public</code>: Idi oka <strong>Access Modifier</strong>. Ante ee class ni JVM ekkadinunchaina (outside package kuda) access cheyyavachu.</li>
            <li><code>class</code>: Java lo class ni define cheyyadaniki vadedhi <strong>class keyword</strong>. Java lo code antha edho oka class lopale undali.</li>
            <li><code>Main</code>: Idi mana class yokka <strong>Identifier (Name)</strong>. <strong style="color:var(--text);">Crucial Rule:</strong> File peru <code>Main.java</code> aythe, public class peru kuda exact ga <code>Main</code> e undali (case-sensitive)!</li>
          </ul>
        </div>

        <!-- 2. public static void main(String[] args) -->
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:18px;">
          <h3 style="color:#58a6ff; font-size:16px; margin-bottom:8px;">2. <code>public static void main(String[] args)</code></h3>
          <p style="color:var(--text2); font-size:14px; margin-bottom:10px;">Idi Java program yokka <strong>Entry Point</strong>. JVM program execute chesetappudu mundhu ee method kosame vethukuthundhi:</p>
          <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
            <li><code>public</code>: JVM ee method ni external ga execute cheyagalagali kabatti <code>public</code> ga declare chesthamu.</li>
            <li><code>static</code>: JVM class ki object create cheyyakunda direct ga <code>Main.main()</code> ni call cheyyadaniki <code>static</code> keyword vadatham. (Memory save avthundhi).</li>
            <li><code>void</code>: Ee method JVM ki elanti value return cheyadhu (no return type).</li>
            <li><code>main</code>: Idi reserved function name. JVM execution start chese entry point idhe.</li>
            <li><code>String[] args</code>: Program run chesetappudu command line nunchi pass chese inputs (Command Line Arguments) ni store cheskune String array.</li>
          </ul>
        </div>

        <!-- 3. System.out.println() -->
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:18px;">
          <h3 style="color:#3fb950; font-size:16px; margin-bottom:8px;">3. <code>System.out.println("Hello, World!");</code></h3>
          <ul style="margin-left:18px; color:var(--text2); font-size:14px; line-height:1.7;">
            <li><code>System</code>: <code>java.lang</code> package lo unna built-in standard class. System resources tho interact avvadaniki vadatharu.</li>
            <li><code>out</code>: <code>System</code> class lo unna static variable (PrintStream object), idi standard output stream (terminal/console) ni point chesthundi.</li>
            <li><code>println()</code>: Output screen meedha text print chesi, cursor ni automatically <strong>next line (\\n)</strong> ki teesukelthundi.</li>
            <li><code>"Hello, World!"</code>: Double quotes lo unna text (String Literal).</li>
          </ul>
        </div>

        <!-- 4. Curly braces { } -->
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #a371f7; border-radius:8px; padding:18px;">
          <h3 style="color:#a371f7; font-size:16px; margin-bottom:8px;">4. Curly Braces <code>{ }</code></h3>
          <p style="color:var(--text2); font-size:14px; line-height:1.6;">Curly braces oka <strong>Code Block</strong> ni mariyu scope ni define chesthayi. Class body ekkada start aindho <code>{</code> mariyu ekkada end aindho <code>}</code> JVM ki theliyadhaaniki idhi mandatory. (Python laaga indentations tho Java scope define cheyadhu).</p>
        </div>

        <!-- 5. Semicolon ; -->
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:18px;">
          <h3 style="color:#ff7b72; font-size:16px; margin-bottom:8px;">5. Semicolon <code>;</code></h3>
          <p style="color:var(--text2); font-size:14px; line-height:1.6;">Java lo prati individual statement చివర తప్పనిసరిగా <strong>Semicolon <code>;</code></strong> undali. Idi statement terminator (full-stop laantidi). Semicolon miss aythe compiler <code>error: ';' expected</code> ani syntax error isthundi.</p>
        </div>

      </div>
    </div>

    <!-- SECTION 9: println vs print vs printf -->
    <div class="section-title"><span class="num">9</span>Printing Output: println() vs print() vs printf()</div>
    <div class="section-body">
      <p>Java lo output print cheyyadaniki 3 methods unnaayi:</p>
      
      <table class="tbl">
        <tr><th>Method</th><th>Behavior</th><th>Example</th></tr>
        <tr>
          <td><code>System.out.println()</code></td>
          <td>Text print chesi next line ki velthundi.</td>
          <td><code>System.out.println("Hello");</code></td>
        </tr>
        <tr>
          <td><code>System.out.print()</code></td>
          <td>Text print chesi adhe line lo cursor ni unchuthundhi.</td>
          <td><code>System.out.print("Hello ");</code></td>
        </tr>
        <tr>
          <td><code>System.out.printf()</code></td>
          <td>Formatted string print chesthundi (like C <code>printf</code> with %d, %s, %.2f).</td>
          <td><code>System.out.printf("Age: %d, Price: %.2f", age, price);</code></td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Output Formatting</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // 1. print() keeps output on the same line
        System.out.print("Java ");
        System.out.print("is ");
        System.out.print("Awesome! ");

        // 2. println() adds a newline at the end
        System.out.println("\\n--- Next Section ---");
        System.out.println("Student Name: Balaji");
        System.out.println("Batch: 2026");

        // 3. printf() allows precise formatting
        String subject = "Java Basics";
        int score = 98;
        double percentage = 98.756;
        System.out.printf("Subject: %s | Score: %d | Accuracy: %.2f%%\\n", subject, score, percentage);
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 10: Callout Common Pitfalls -->
    <div class="callout">
      <div class="callout-title">⚠️ Beginners Common Mistakes in Lesson 1</div>
      <ul style="margin:8px 0 0 18px; color:var(--text2); line-height:1.7; font-size:13.5px;">
        <li><strong>Case Sensitivity:</strong> <code>system.out.println()</code> ani small 's' tho raste compiler error isthundi. It must be capital <code>System</code>.</li>
        <li><strong>File Name Mismatch:</strong> <code>public class Main</code> unte file peru <code>Main.java</code> gaane undali (<code>main.java</code> or <code>Program.java</code> kudhardhu).</li>
        <li><strong>Missing Main method:</strong> <code>public static void main(String[] args)</code> lo edhaina word miss aythe program compile avthundhi kaani JVM run cheyyaledhu (<code>NoSuchMethodError</code>).</li>
      </ul>
    </div>

    <!-- SECTION 11: Try It Yourself -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Coding Challenge</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Modify the program below to display your personal Developer Portfolio Card using a combination of <code>println()</code> and formatted output:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java Challenge</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        System.out.println("=================================");
        System.out.println("🚀 DEVELOPER PROFILE CARD");
        System.out.println("=================================");
        System.out.println("Name: Balaji Nayak");
        System.out.println("Learning: Java 21+ Full Stack");
        System.out.println("Goal: Build Enterprise Web Applications");
        System.out.println("Status: Phase 1 Completed ✅");
        System.out.println("=================================");
    }
}</code></pre>
      </div>
      <a class="run-btn" href="/online-java-compiler.html">Run This in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by the Our Compiler Technical Team · Updated for Java 21+ LTS (2026)</div>
    </div>
  `;

  const html = generateJavaHeader(title, desc, filename, 1) + content + generateJavaFooter(null, null, '02-java-setup-and-program-structure.html', '2. Java Setup & Program Structure');
  fs.writeFileSync(path.join(blogJavaDir, filename), html, 'utf8');
  console.log(`✅ Successfully generated ${filename}`);
}

// ── BUILD LESSON 2: Java Program Structure, Naming & Errors ───────────────
function buildLesson2() {
  const title = "Java Program Structure & Errors";
  const desc = "Master Java Program Structure, Source File anatomy, Comments (Single, Multi, Javadoc), Naming Conventions (PascalCase, camelCase), and the 3 types of Errors (Syntax, Runtime, Logical) with debugging tips.";
  const filename = "02-java-setup-and-program-structure.html";

  const content = `
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 2: Java Setup and Program Structure</span>
    </div>

    <h1 class="page-title">Program Structure, Naming & Error Handling</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 Lesson 2 of 27</span>
      <span class="badge">📂 Phase 1: Java Basics</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f0a500; font-weight:700;">📌 Covered in this lesson:</span>
      <span>Source File Structure · Class Skeleton · Comments (Single, Multi, Javadoc) · Naming Conventions · Syntax Errors · Runtime Errors · Logical Errors</span>
    </div>

    <div class="intro-box">
      <p>In this second lesson of Phase 1, we will explore the <strong>anatomical structure of a Java source file</strong>, learn professional <strong>naming conventions</strong> followed by top software engineers, master <strong>code documentation (Javadoc)</strong>, and dive deep into the <strong>3 categories of programming errors</strong> (Syntax vs Runtime vs Logical errors) with practical debugging strategies.</p>
    </div>

    <!-- SECTION 1: Source File Anatomy -->
    <div class="section-title"><span class="num">1</span>Java Source File Structure (Anatomy of a .java File)</div>
    <div class="section-body">
      <p>Prati professional Java source file lo code oka standard order lo organize cheyyabaduthundhi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Standard File Anatomy</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>// 1. Package Declaration (Optional: Namespaces & folder groupings)
package com.ourcompiler.basics;

// 2. Import Statements (Importing external utility classes)
import java.util.Scanner;
import java.time.LocalDate;

// 3. Class Declaration (The main container)
public class Main {

    // 4. Class Variables / Fields (State)
    static String platform = "Our Compiler";

    // 5. Main Method (Program entrypoint)
    public static void main(String[] args) {
        System.out.println("Welcome to " + platform);
        System.out.println("Today's Date: " + LocalDate.now());
    }

    // 6. Custom Methods / Helper Functions
    public static void greetUser(String name) {
        System.out.println("Hello, " + name + "!");
    }
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <strong style="color:#f0a500; font-size:14.5px;">🔑 Golden Java Source Rules:</strong>
        <ul style="margin:8px 0 0 18px; color:var(--text2); font-size:13.5px; line-height:1.7;">
          <li>Oka <code>.java</code> file lo <strong>okate public class</strong> undali.</li>
          <li>File peru public class peru tho exact match avvali (e.g. <code>public class Main</code> -> <code>Main.java</code>).</li>
          <li><code>package</code> statement file lo first non-comment line ga undali.</li>
          <li><code>import</code> statements package tharvatha, class kante mundhu undali.</li>
        </ul>
      </div>
    </div>

    <!-- SECTION 2: Comments in Java -->
    <div class="section-title"><span class="num">2</span>Comments in Java (Code Documentation)</div>
    <div class="section-body">
      <p>Comments manam rase logic ni explain cheyyadaniki mariyu code readability penchadaniki vadathamu. Java compiler comments ni completely ignore chesthundi:</p>

      <table class="tbl">
        <tr><th>Comment Type</th><th>Syntax</th><th>Usage</th></tr>
        <tr>
          <td><strong>1. Single-Line Comment</strong></td>
          <td><code>// Your comment here</code></td>
          <td>Short explanations on a single line.</td>
        </tr>
        <tr>
          <td><strong>2. Multi-Line Comment</strong></td>
          <td><code>/* Line 1<br>Line 2 */</code></td>
          <td>Longer explanations spanning across multiple lines.</td>
        </tr>
        <tr>
          <td><strong>3. Javadoc Documentation Comment</strong></td>
          <td><code>/** Javadoc description<br>* @param name<br>* @return result */</code></td>
          <td>Used to generate professional HTML API documentation for classes and methods using <code>javadoc</code> tool.</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Comments Example</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>/**
 * Student Grade Processing Module
 * @author Balaji Nayak
 * @version 1.0 (2026)
 */
public class Main {
    public static void main(String[] args) {
        // Single line comment: Define student score
        int studentScore = 92;

        /* Multi-line comment:
           The passing mark threshold is 40.
           Distinction threshold is 85. */
        if (studentScore >= 85) {
            System.out.println("Grade: Distinction 🌟");
        }
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3: Naming Conventions -->
    <div class="section-title"><span class="num">3</span>Java Naming Conventions (Industry Best Practices)</div>
    <div class="section-body">
      <p>Java world lo code clean ga, readable ga undadaniki standard naming conventions follow avtharu:</p>

      <table class="tbl">
        <tr><th>Element</th><th>Convention</th><th>Rules & Style</th><th>Good Example</th></tr>
        <tr>
          <td><strong>Classes & Interfaces</strong></td>
          <td><strong>PascalCase</strong> (UpperCamelCase)</td>
          <td>Prati word first letter Capital ga undali. Nouns for classes, Adjectives for interfaces.</td>
          <td><code>StudentProfile</code>, <code>BankAccount</code>, <code>Runnable</code></td>
        </tr>
        <tr>
          <td><strong>Methods & Functions</strong></td>
          <td><strong>camelCase</strong></td>
          <td>First word small letters, subsequent words start with Capital letter. Usually verbs.</td>
          <td><code>calculateGpa()</code>, <code>sendEmail()</code>, <code>getBalance()</code></td>
        </tr>
        <tr>
          <td><strong>Variables</strong></td>
          <td><strong>camelCase</strong></td>
          <td>Meaningful short descriptive names.</td>
          <td><code>studentAge</code>, <code>totalPrice</code>, <code>isActive</code></td>
        </tr>
        <tr>
          <td><strong>Constants</strong></td>
          <td><strong>UPPER_SNAKE_CASE</strong></td>
          <td>All capital letters separated by underscores. Declared with <code>static final</code>.</td>
          <td><code>MAX_USERS</code>, <code>PI_VALUE</code>, <code>DATABASE_URL</code></td>
        </tr>
        <tr>
          <td><strong>Packages</strong></td>
          <td><strong>lowercase</strong></td>
          <td>All small letters, reversed domain name.</td>
          <td><code>com.ourcompiler.utils</code></td>
        </tr>
      </table>
    </div>

    <!-- SECTION 4: The 3 Types of Errors -->
    <div class="section-title"><span class="num">4</span>The 3 Types of Errors in Java (Syntax, Runtime & Logical)</div>
    <div class="section-body">
      <p>Programming lo manaku 3 types of errors edhuravthayi. Avi enti mariyu vatini ela solve cheyyalo chuddam:</p>

      <!-- 1. Syntax Errors -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:18px; margin:16px 0;">
        <h3 style="color:#ff7b72; font-size:16px; margin-bottom:8px;">1. Compile-Time Errors / Syntax Errors</h3>
        <p style="color:var(--text2); font-size:14px; line-height:1.6;">Java grammar rules ni violate chesinappudu <code>javac</code> compiler code ni compile cheyyakunda mundhe stop chesthundi. Program run avvadam kante mundhe compiler vatini patkuntundi.</p>
        
        <div style="font-size:13px; color:var(--text); margin:8px 0;"><strong>Common Examples:</strong></div>
        <ul style="margin-left:18px; color:var(--text2); font-size:13px; line-height:1.7;">
          <li>Missing semicolon <code>;</code> at line end.</li>
          <li>Missing closing curly brace <code>}</code> or bracket <code>)</code>.</li>
          <li>Keywords typos (e.g. <code>pubic class</code> instead of <code>public class</code>).</li>
          <li>Case sensitivity mismatch (e.g. <code>system.out</code> instead of <code>System.out</code>).</li>
          <li>Type mismatch (e.g. <code>int score = "Ninety";</code>).</li>
        </ul>
      </div>

      <!-- 2. Runtime Errors -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #f0a500; border-radius:8px; padding:18px; margin:16px 0;">
        <h3 style="color:#f0a500; font-size:16px; margin-bottom:8px;">2. Runtime Errors (Exceptions)</h3>
        <p style="color:var(--text2); font-size:14px; line-height:1.6;">Program compile aipoyi <code>.class</code> file generate avthundhi. Kani execute ayye time lo illegal operation jaragatam valla JVM crash ayyi <strong>Exception</strong> ni throw chesthundi.</p>
        
        <div style="font-size:13px; color:var(--text); margin:8px 0;"><strong>Common Examples:</strong></div>
        <ul style="margin-left:18px; color:var(--text2); font-size:13px; line-height:1.7;">
          <li><code>ArithmeticException: / by zero</code> (e.g. <code>int result = 10 / 0;</code>).</li>
          <li><code>NullPointerException</code> (Calling a method on a <code>null</code> object).</li>
          <li><code>ArrayIndexOutOfBoundsException</code> (Accessing index 5 in an array of size 3).</li>
          <li><code>NumberFormatException</code> (Converting invalid text "abc" into integer).</li>
        </ul>
      </div>

      <!-- 3. Logical Errors -->
      <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:18px; margin:16px 0;">
        <h3 style="color:#3fb950; font-size:16px; margin-bottom:8px;">3. Logical Errors (Semantic Bugs)</h3>
        <p style="color:var(--text2); font-size:14px; line-height:1.6;">Program 0 compiler errors tho compile avthundhi, 0 crashes tho run avthundhi. Kani developer reasoning/formula thappu undatam valla <strong>wrong output</strong> vasthundhi! (Idhi detect cheyyadam andharikante kastam).</p>
        
        <div style="font-size:13px; color:var(--text); margin:8px 0;"><strong>Common Examples:</strong></div>
        <ul style="margin-left:18px; color:var(--text2); font-size:13px; line-height:1.7;">
          <li>Average formula: <code>int avg = a + b / 2;</code> (BODMAS valla <code>b/2</code> mundhu jaruguthundi, it should be <code>(a + b) / 2</code>).</li>
          <li>Wrong condition: <code>if (score > 40)</code> instead of <code>if (score >= 40)</code> (border student fail aypothadu).</li>
          <li>Wrong operator: <code>salary - bonus</code> instead of <code>salary + bonus</code>.</li>
        </ul>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Demonstration of Errors</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        int a = 20;
        int b = 10;

        // 1. Correct calculation
        int sum = a + b;
        System.out.println("Sum: " + sum);

        // 2. Logical Error Example:
        // Expected average of 20 and 10 is 15.
        int wrongAverage = a + b / 2;    // Evaluates to: 20 + (10/2) = 25 (BUG!)
        int correctAverage = (a + b) / 2; // Evaluates to: (20+10)/2 = 15 (CORRECT!)

        System.out.println("Wrong Average (Logical Bug): " + wrongAverage);
        System.out.println("Correct Average: " + correctAverage);
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5: Summary Comparison Table -->
    <div class="section-title"><span class="num">5</span>Error Types Comparison Summary</div>
    <div class="section-body">
      <table class="tbl">
        <tr><th>Error Type</th><th>When detected?</th><th>Who detects it?</th><th>Program Runs?</th><th>Severity</th></tr>
        <tr>
          <td><strong>Syntax Error</strong></td>
          <td>Compile-Time</td>
          <td><code>javac</code> Compiler</td>
          <td>❌ No (Compilation fails)</td>
          <td>Easy to fix (Compiler gives line number & description)</td>
        </tr>
        <tr>
          <td><strong>Runtime Error</strong></td>
          <td>During Execution</td>
          <td>JVM (Execution Engine)</td>
          <td>⚠️ Starts, but crashes mid-way</td>
          <td>Moderate (Can be handled with <code>try-catch</code>)</td>
        </tr>
        <tr>
          <td><strong>Logical Error</strong></td>
          <td>After Completion</td>
          <td>Human Developer / Test Cases</td>
          <td>✅ Runs smoothly, but output is wrong</td>
          <td>High (Hardest to find, requires thorough debugging)</td>
        </tr>
      </table>
    </div>

    <!-- SECTION 6: Try It Yourself -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Debugging Exercise</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">The program below has a logical bug in calculating the total discount on a shopping cart. Run it, observe the wrong output, and fix the formula:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java Debugging Challenge</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        int itemPrice = 500;
        int quantity = 2;
        int discountPercentage = 10; // 10% discount

        // Calculate total amount
        int totalBeforeDiscount = itemPrice * quantity; // 1000

        // BUGGY DISCOUNT CALCULATION:
        // 10% of 1000 should be 100, so final price = 900.
        int discountAmount = (totalBeforeDiscount * discountPercentage) / 100;
        int finalPayableAmount = totalBeforeDiscount - discountAmount;

        System.out.println("Cart Value: Rs." + totalBeforeDiscount);
        System.out.println("Discount: Rs." + discountAmount);
        System.out.println("Final Bill: Rs." + finalPayableAmount);
    }
}</code></pre>
      </div>
      <a class="run-btn" href="/online-java-compiler.html">Run This in Our Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by the Our Compiler Technical Team · Updated for Java 21+ LTS (2026)</div>
    </div>
  `;

  const html = generateJavaHeader(title, desc, filename, 2) + content + generateJavaFooter('01-welcome-hello-world.html', '1. Welcome & Java Basics', '03-variables-and-data-types.html', '3. Variables & Data Types');
  fs.writeFileSync(path.join(blogJavaDir, filename), html, 'utf8');
  console.log(`✅ Successfully generated ${filename}`);
}

function run() {
  console.log('🚀 Generating Phase 1: Java Basics Tutorials...');
  buildLesson1();
  buildLesson2();
  console.log('🎉 Phase 1: Java Basics successfully created and enhanced!');
}

run();
