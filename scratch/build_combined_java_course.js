// Master Builder Script for Java Masterclass
// Generates standalone HTML tutorial chapters in public/blog-java/ and public/blog-java.html

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const javaDir = path.join(baseDir, 'blog-java');

if (!fs.existsSync(javaDir)) {
  fs.mkdirSync(javaDir, { recursive: true });
}

// Load Phase Data
const phase1 = require('./java_phase1_data.js');
const phase2 = require('./java_phase2_data.js');
const phase3 = require('./java_phase3_data.js');
const phase4 = require('./java_phase4_data.js');
const phase5 = require('./java_phase5_data.js');
const phase6 = require('./java_phase6_data.js');
const phase7 = require('./java_phase7_data.js');
const phase8 = require('./java_phase8_data.js');
const phase9 = require('./java_phase9_data.js');
const phase10 = require('./java_phase10_data.js');

const ALL_CHAPTERS = [
  ...phase1,
  ...phase2,
  ...phase3,
  ...phase4,
  ...phase5,
  ...phase6,
  ...phase7,
  ...phase8,
  ...phase9,
  ...phase10
];

console.log(`Loaded ${ALL_CHAPTERS.length} Java chapters across Phase 1 to Phase 10.`);

// Master 30-Phase Structure
const PHASES_MAP = [
  { id: 'phase1', num: '01', title: 'Java Basics & JVM', desc: 'Origins, WORA, features, JDK vs JRE vs JVM, JVM internal memory, setup, Hello World breakdown, comments, and debugging.', icon: '☕' },
  { id: 'phase2', num: '02', title: 'Variables & Data Types', desc: 'Stack vs Heap memory, 8 primitives, Unicode char, Strings, final constants, variable scopes, type casting, and var keyword.', icon: '📦' },
  { id: 'phase3', num: '03', title: 'Operators & User Input', desc: 'Arithmetic, logical, bitwise, ternary, operator precedence, Scanner input, newline trap, printf, Math, and 5 capstones.', icon: '⚡' },
  { id: 'phase4', num: '04', title: 'Conditions & Branching', desc: 'if, if-else, nested if, switch cases, modern switch expressions, and string comparisons with .equals().', icon: '🔀' },
  { id: 'phase5', num: '05', title: 'Loops & Control Flow', desc: 'for, while, do-while, nested loops, break, continue, enhanced for-each, patterns, and Fibonacci/Prime algorithms.', icon: '🔁' },
  { id: 'phase6', num: '06', title: 'Strings & StringBuilder', desc: 'String pool, immutability, methods (substring, split, replace), StringBuilder, StringBuffer, and text validators.', icon: '🧵' },
  { id: 'phase7', num: '07', title: 'Arrays & Matrices', desc: '1D arrays, 2D matrices, jagged arrays, memory layout, sorting, binary search, and Arrays utility class.', icon: '📊' },
  { id: 'phase8', num: '08', title: 'Methods & Recursion', desc: 'Method parameters, return types, pass-by-value mechanics, method overloading, recursion, and reusable libraries.', icon: '🧩' },
  { id: 'phase9', num: '09', title: 'Classes & Objects (OOP)', desc: 'OOP fundamentals, fields, methods, constructors, constructor overloading, this keyword, static members, and enums.', icon: '🏗️' },
  { id: 'phase10', num: '10', title: 'Encapsulation & Access', desc: 'private, public, protected, package-private default, getters/setters, data validation, and immutability design.', icon: '🔒' },
  { id: 'phase11', num: '11', title: 'Inheritance & Polymorphism', desc: 'extends, super keyword, method overriding, @Override, IS-A vs HAS-A, upcasting, downcasting, and instanceof.', icon: '🧬' },
  { id: 'phase12', num: '12', title: 'Abstraction & Interfaces', desc: 'abstract classes, interfaces, default/static interface methods, multiple interfaces, and loose coupling.', icon: '🔌' },
  { id: 'phase13', num: '13', title: 'Packages & Enums', desc: 'Package declarations, imports, static imports, access control, enum fields, constructors, and switch with enum.', icon: '📦' },
  { id: 'phase14', num: '14', title: 'Exception Handling', desc: 'try-catch-finally, multiple catch, throw, throws, custom exceptions, try-with-resources, and assertions.', icon: '🛡️' },
  { id: 'phase15', num: '15', title: 'Collections Framework', desc: 'List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), Queue, Deque, and Iterators.', icon: '📚' },
  { id: 'phase16', num: '16', title: 'Generics & Type Safety', desc: 'Generic classes, methods, interfaces, type parameters (T, E, K, V), bounded types, wildcards, and type erasure.', icon: '🏷️' },
  { id: 'phase17', num: '17', title: 'Wrapper Classes & Enums', desc: 'Integer, Double, Character, Boolean, Autoboxing, Unboxing, parseInt, and enum-based menus.', icon: '🎁' },
  { id: 'phase18', num: '18', title: 'Lambda Expressions', desc: 'Functional programming, lambda syntax, Predicate, Consumer, Function, Supplier, and Method References (::).', icon: '⚡' },
  { id: 'phase19', num: '19', title: 'Stream API & Pipelines', desc: 'Streams vs Collections, filter, map, sorted, distinct, reduce, collect, groupingBy, and parallel streams.', icon: '🌊' },
  { id: 'phase20', num: '20', title: 'Date & Time (java.time)', desc: 'LocalDate, LocalTime, LocalDateTime, ZonedDateTime, DateTimeFormatter, Period, and Duration.', icon: '⏱️' },
  { id: 'phase21', num: '21', title: 'File Handling & NIO', desc: 'File, Path, Files, BufferedReader/Writer, Byte streams, serialization, directory ops, and NIO.2.', icon: '📁' },
  { id: 'phase22', num: '22', title: 'Regular Expressions', desc: 'Regex patterns, Matcher, Pattern, character classes, quantifiers, groups, email/phone validation.', icon: '🔍' },
  { id: 'phase23', num: '23', title: 'Multithreading & Concurrency', desc: 'Thread, Runnable, synchronization, locks, volatile, AtomicInteger, ExecutorService, and CompletableFuture.', icon: '🧵' },
  { id: 'phase24', num: '24', title: 'Networking & HTTP', desc: 'Client/Server sockets, URL/URI, Java 11+ HttpClient, GET/POST requests, JSON parsing, and REST client.', icon: '🌐' },
  { id: 'phase25', num: '25', title: 'JDBC & Databases', desc: 'JDBC drivers, Connection, PreparedStatement, ResultSet, CRUD operations, transactions, and connection pools.', icon: '💾' },
  { id: 'phase26', num: '26', title: 'Build Tools (Maven & Gradle)', desc: 'pom.xml, build lifecycle, dependency management, plugins, Gradle build.gradle, and logging.', icon: '⚙️' },
  { id: 'phase27', num: '27', title: 'Testing (JUnit & Mockito)', desc: 'Unit testing, JUnit 5 assertions, @Test, @ParameterizedTest, Mockito mocking, debugging, and TDD.', icon: '🧪' },
  { id: 'phase28', num: '28', title: 'Clean Code & Patterns', desc: 'SOLID principles, DRY, KISS, Factory, Singleton, Builder, Strategy, Observer, Repository patterns.', icon: '💎' },
  { id: 'phase29', num: '29', title: 'Spring & Spring Boot', desc: 'IoC, Dependency Injection, Spring Boot starters, REST Controllers, Services, Spring Data JPA, and Security.', icon: '🍃' },
  { id: 'phase30', num: '30', title: 'Advanced Backend & Projects', desc: 'Microservices, JWT auth, Docker, CI/CD, and full-stack enterprise capstone projects.', icon: '🚀' }
];

// Helper to generate the Accordion Sidebar
function generateJavaAccordionSidebar(currentSlug = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  PHASES_MAP.forEach(ph => {
    const chaptersInPhase = ALL_CHAPTERS.filter(c => c.phaseId === ph.id);
    const hasActive = chaptersInPhase.some(c => c.slug === currentSlug);
    const isOpen = hasActive || (currentSlug === null && ph.id === 'phase1');
    const activeHeaderClass = isOpen ? ' active' : '';
    const openContentClass = isOpen ? ' open' : '';
    const chapterCount = chaptersInPhase.length > 0 ? `${chaptersInPhase.length} Ch` : 'Upcoming';

    html += `      <!-- Phase ${ph.num}: ${ph.title} -->\n`;
    html += `      <button class="accordion-header${activeHeaderClass}" onclick="toggleAccordion(this)">\n`;
    html += `        <div class="accordion-header-main">\n`;
    html += `          <span class="phase-icon-box">${ph.icon}</span>\n`;
    html += `          <div class="phase-info">\n`;
    html += `            <span class="phase-tag">Phase ${ph.num}</span>\n`;
    html += `            <span class="phase-title">${ph.title}</span>\n`;
    html += `          </div>\n`;
    html += `        </div>\n`;
    html += `        <div class="accordion-header-meta">\n`;
    html += `          <span class="phase-count-badge">${chapterCount}</span>\n`;
    html += `          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">\n`;
    html += `            <polyline points="9 18 15 12 9 6"></polyline>\n`;
    html += `          </svg>\n`;
    html += `        </div>\n`;
    html += `      </button>\n`;
    html += `      <div class="accordion-content${openContentClass}">\n`;

    if (chaptersInPhase.length > 0) {
      chaptersInPhase.forEach(ch => {
        const isActive = ch.slug === currentSlug ? ' class="active"' : '';
        html += `        <a href="/blog-java/${ch.slug}.html"${isActive}>${ch.badge}</a>\n`;
      });
    } else {
      html += `        <span style="display:block; padding:6px 12px; font-size:11.5px; color:var(--text3); font-style:italic;">Coming Soon in Next Phase</span>\n`;
    }

    html += `      </div>\n\n`;
  });

  html += `    </div>\n`;
  return html;
}

// Custom Java Syntax Highlighter Client-Side Script
const JAVA_HIGHLIGHTER_SCRIPT = `
  <script>
    function highlightJavaCode(code) {
      const tokens = [];
      let tokenIdx = 0;
      const pushToken = (cls, text) => {
        const key = '___JAVA_TOK_' + (tokenIdx++) + '___';
        tokens[key] = '<span class="' + cls + '">' + text + '</span>';
        return key;
      };

      // 1. Comments
      code = code.replace(/\\/\\/.*$/gm, m => pushToken('cm', m));
      code = code.replace(/\\/\\*[\\s\\S]*?\\*\\//g, m => pushToken('cm', m));

      // 2. Strings & Chars
      code = code.replace(/"(?:\\\\.|[^"\\\\\\r\\n])*"/g, m => pushToken('st', m));
      code = code.replace(/'(?:\\\\.|[^'\\\\\\r\\n])*'/g, m => pushToken('st', m));

      // 3. Annotations
      code = code.replace(/@[A-Za-z0-9_]+/g, m => pushToken('ann', m));

      // 4. Java Reserved Keywords & Modifiers
      const keywords = ['public','private','protected','static','final','abstract','class','interface','enum','extends','implements','void','new','return','this','super','package','import','try','catch','finally','throw','throws','if','else','switch','case','default','break','continue','for','while','do','instanceof','var','synchronized','volatile','transient','native','strictfp','assert','true','false','null'];
      const kwRegex = new RegExp('\\\\b(' + keywords.join('|') + ')\\\\b', 'g');
      code = code.replace(kwRegex, m => pushToken('kw', m));

      // 5. Primitive & Common Reference Types
      const types = ['byte','short','int','long','float','double','char','boolean','String','Integer','Double','Long','Float','Short','Byte','Character','Boolean','Object','System','Scanner','Math','Arrays','Collections','List','ArrayList','LinkedList','Set','HashSet','TreeSet','Map','HashMap','TreeMap','Queue','Deque','ArrayDeque','Thread','Runnable','Exception','RuntimeException','Throwable','Error','Override','Deprecated','SuppressWarnings'];
      const typeRegex = new RegExp('\\\\b(' + types.join('|') + ')\\\\b', 'g');
      code = code.replace(typeRegex, m => pushToken('tp', m));

      // 6. Built-in Methods
      const methods = ['println','print','printf','format','length','charAt','substring','indexOf','lastIndexOf','toUpperCase','toLowerCase','trim','replace','split','contains','startsWith','endsWith','equals','equalsIgnoreCase','toString','hashCode','compareTo','add','get','set','remove','size','clear','isEmpty','contains','put','keySet','values','entrySet','sort','binarySearch','min','max','sqrt','pow','abs','round','random','floor','ceil','hasNextInt','hasNextDouble','hasNextLine','nextInt','nextDouble','nextLong','nextFloat','next','nextLine','nextBoolean','close','out','in','err','getRuntime','maxMemory','totalMemory','freeMemory','availableProcessors','getProperty','now','getYear'];
      const fnRegex = new RegExp('\\\\b(' + methods.join('|') + ')\\\\b', 'g');
      code = code.replace(fnRegex, m => pushToken('fn', m));

      // 7. Numbers
      code = code.replace(/\\b(\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFdDlL]?|0[xX][0-9a-fA-F_]+|0[bB][01_]+)\\b/g, m => pushToken('nu', m));

      // 8. Restore Tokens
      for (const [key, val] of Object.entries(tokens)) {
        code = code.replace(new RegExp(key, 'g'), val);
      }
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
      });
    })();
  </script>
`;

// Generate each standalone chapter HTML file
ALL_CHAPTERS.forEach((ch, idx) => {
  const prevChapter = idx > 0 ? ALL_CHAPTERS[idx - 1] : null;
  const nextChapter = idx < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[idx + 1] : null;

  const sidebarHtml = generateJavaAccordionSidebar(ch.slug);

  const theoryHtml = ch.theorySections.map(sec => {
    let processed = sec.content;
    // Replace fenced code blocks
    processed = processed.replace(/```(?:java)?([\s\S]*?)```/g, (match, p1) => {
      const escaped = p1.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<div class="code-block"><pre><code>${escaped}</code></pre></div>`;
    });

    // Replace markdown tables into sleek HTML tables
    processed = processed.replace(/(?:^|\n)(\|.+?\|\r?\n\|[-:\s|]+?\r?\n(?:\|.+?\|\r?\n?)+)/g, (match, tableStr) => {
      const rows = tableStr.trim().split(/\r?\n/);
      if (rows.length < 2) return match;
      const headers = rows[0].split('|').slice(1, -1).map(h => h.trim());
      const bodyRows = rows.slice(2);
      let tableHtml = '\n<div class="ref-table-wrap"><table class="ref-table"><thead><tr>';
      headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
      tableHtml += '</tr></thead><tbody>';
      bodyRows.forEach(r => {
        const cells = r.split('|').slice(1, -1).map(c => c.trim());
        if (cells.length > 0) {
          tableHtml += '<tr>';
          cells.forEach(c => { tableHtml += `<td>${c}</td>`; });
          tableHtml += '</tr>';
        }
      });
      tableHtml += '</tbody></table></div>\n';
      return tableHtml;
    });

    // Protect existing code, pre blocks, and HTML tables from italic/bold replacement
    const codeTokens = [];
    processed = processed.replace(/(<div[\s\S]*?<\/div>|<table[\s\S]*?<\/table>|<code[\s\S]*?<\/code>|<pre[\s\S]*?<\/pre>|`[^`]+`)/g, (match) => {
      const token = `@@@PROTECTEDCODE${codeTokens.length}@@@`;
      if (match.startsWith('`')) {
        codeTokens.push(`<code>${match.slice(1, -1)}</code>`);
      } else {
        codeTokens.push(match);
      }
      return token;
    });

    // Replace markdown formatting safely
    processed = processed
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/_([^_]+)_/g, '<em>$1</em>');

    // Restore protected code blocks
    codeTokens.forEach((c, i) => {
      processed = processed.replace(`@@@PROTECTEDCODE${i}@@@`, c);
    });

    // Split by double newline and wrap non-block chunks in <p>
    const paragraphs = processed.split(/\r?\n\r?\n/).map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<div') || block.startsWith('<table') || block.startsWith('<ul') || block.startsWith('<ol') || block.startsWith('<h') || block.startsWith('<pre')) {
        return block;
      }
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    }).filter(Boolean).join('\n');

    return `
    <section class="lesson-section">
      <h2>${sec.heading}</h2>
      <div class="theory-text">
        ${paragraphs}
      </div>
    </section>
  `;
  }).join('\n');

  const lineByLineHtml = ch.lineByLine.map(item => `
    <div class="explain-item">
      <code class="code-token">${item.line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
      <p>${item.explanation}</p>
    </div>
  `).join('\n');

  const commonMistakesHtml = ch.commonMistakes.map(m => `
    <li style="margin-bottom:8px; line-height:1.6;">${m.replace(/`([^`]+)`/g, '<code>$1</code>')}</li>
  `).join('\n');

  const recapHtml = ch.recap.map(r => `
    <li style="margin-bottom:6px; line-height:1.5;">${r.replace(/`([^`]+)`/g, '<code>$1</code>')}</li>
  `).join('\n');

  const faqHtml = ch.faq.map(f => `
    <div class="faq-card">
      <h4>❓ ${f.q}</h4>
      <p>${f.a}</p>
    </div>
  `).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${ch.title} — Java 21 Tutorial | Our Compiler</title>
  <meta name="description" content="${ch.intro}" />
  <meta name="keywords" content="${ch.title.toLowerCase()}, java tutorial, learn java, java 21 lts, java programming, java backend, spring boot" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/${ch.slug}.html" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <link rel="stylesheet" href="/blog-java/style.css" />
  <link rel="stylesheet" href="/site-nav.css" />

  <style>
    .code-action-btn {
      background: #21262d;
      color: #c9d1d9;
      border: 1px solid #30363d;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s;
    }
    .code-action-btn:hover {
      background: #30363d;
      color: #ffffff;
      border-color: #8b949e;
    }
    .code-output-card {
      background: #141414;
      border: 1px solid #282828;
      border-left: 3.5px solid #f0a500;
      border-radius: 8px;
      padding: 14px 16px;
      margin: -10px 0 24px 0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
    }
    .output-header {
      color: #f0a500;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .output-content {
      color: #a6accd;
      white-space: pre-wrap;
      line-height: 1.5;
    }
    .explain-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 10px;
      padding: 18px 20px;
      margin: 20px 0 28px 0;
    }
    .explain-card h3 {
      color: #f0a500;
      font-size: 15px;
      margin-bottom: 12px;
      font-weight: 700;
    }
    .explain-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .explain-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .code-token {
      background: rgba(240, 165, 0, 0.15) !important;
      color: #f0a500 !important;
      padding: 2px 8px !important;
      border-radius: 4px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      width: fit-content;
      border: 1px solid rgba(240, 165, 0, 0.3) !important;
    }
    .explain-item p {
      color: #c9d1d9;
      font-size: 13.5px;
      line-height: 1.55;
      margin: 0;
    }

    /* Light Theme Overrides */
    body.light-theme .explain-card {
      background: #ffffff;
      border-color: #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }
    body.light-theme .explain-card h3 {
      color: #d97706;
    }
    body.light-theme .code-token {
      background: #fef3c7 !important;
      color: #b45309 !important;
      border-color: #fde68a !important;
    }
    body.light-theme .explain-item p {
      color: #334155;
    }
    body.light-theme .code-output-card {
      background: #f8fafc;
      border-color: #e2e8f0;
      border-left-color: #d97706;
    }
    body.light-theme .output-header {
      color: #b45309;
    }
    body.light-theme .output-content {
      color: #1e293b;
    }
  </style>

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

    function copyCodeSnippet(btn) {
      const block = btn.closest('.code-block');
      const code = block.querySelector('pre code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerText;
        btn.innerText = '✓ Copied!';
        setTimeout(() => { btn.innerText = originalText; }, 1800);
      });
    }

    function runInJavaCompiler(btn) {
      const block = btn.closest('.code-block');
      const code = block.querySelector('pre code').innerText;
      localStorage.setItem('code_java', code);
      window.location.href = '/online-java-compiler.html';
    }
  </script>
  ${JAVA_HIGHLIGHTER_SCRIPT}
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
  <!-- LEFT ACCORDION SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Java Master Course</div>
    <a href="/blog-java.html" class="sidebar-home-link">☕ Java Course HOME</a>

${sidebarHtml}

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
      <span class="current">Chapter ${ch.num}: ${ch.badge}</span>
    </div>

    <h1 class="page-title">${ch.title}</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 Chapter ${ch.num} of ${ALL_CHAPTERS.length}</span>
      <span class="badge">📂 ${ch.phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <div style="font-size:13px; font-weight:700; color:#f0a500; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">📌 Covered in this chapter:</div>
      <p style="margin:0; font-size:13.5px; color:var(--text2);">${ch.subtopics}</p>
    </div>

    <div class="theory-intro" style="margin: 24px 0; font-size:15.5px; line-height:1.75; color:var(--text);">
      <p>${ch.intro}</p>
    </div>

    <!-- Deep Conceptual Theory Sections -->
    ${theoryHtml}

    <!-- Primary Code Example -->
    <section class="lesson-section">
      <h2>Beginner Example & Code Anatomy</h2>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Main.java — Chapter ${ch.num} Core Example</span>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="try-btn" onclick="runInJavaCompiler(this)">▶ Run in Compiler</button>
          </div>
        </div>
        <pre><code>${ch.codeExample.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 Program Console Output</div>
        <div class="output-content">${ch.output.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>

      <div class="explain-card">
        <h3>🔍 Line-by-Line Code Explanation</h3>
        ${lineByLineHtml}
      </div>
    </section>

    <!-- Practical Industry Example -->
    <section class="lesson-section">
      <h2>Practical Real-World Example</h2>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ PracticalApplication.java — Industry Implementation</span>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="try-btn" onclick="runInJavaCompiler(this)">▶ Run in Compiler</button>
          </div>
        </div>
        <pre><code>${ch.practicalExample.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>

      <div class="code-output-card">
        <div class="output-header">💻 Practical Console Output</div>
        <div class="output-content">${ch.practicalOutput.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </section>

    <!-- Common Mistakes Callout -->
    <div class="callout">
      <div class="callout-title">⚠️ Common Mistakes & Professional Best Practices</div>
      <ul style="margin: 8px 0 0 18px; color: var(--text2); font-size: 14px;">
        ${commonMistakesHtml}
      </ul>
    </div>

    <!-- Coding Challenge -->
    <div class="try-box">
      <div class="try-title">🎯 Hands-on Coding Challenge</div>
      <p style="color: var(--text2); font-size: 14.5px; margin-bottom: 12px;">Test your understanding by writing the code directly in your editor or running in our online Java compiler:</p>
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">☕ Challenge.java</span>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="try-btn" onclick="runInJavaCompiler(this)">▶ Solve in Compiler</button>
          </div>
        </div>
        <pre><code>${ch.challenge.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </div>

    <!-- Mini Quiz / FAQ Section -->
    <section class="faq-section" style="margin-top: 36px;">
      <h2 style="color: #f0a500; font-size: 20px; font-weight: 700; margin-bottom: 18px;">💡 Frequently Asked Questions & Interview Insights</h2>
      ${faqHtml}
    </section>

    <!-- Quick Recap Box -->
    <div style="background: rgba(240, 165, 0, 0.08); border: 1px solid rgba(240, 165, 0, 0.25); border-radius: 10px; padding: 20px 22px; margin: 36px 0;">
      <h3 style="color: #f0a500; font-size: 16px; font-weight: 700; margin-bottom: 12px;">🚀 Quick Chapter Recap</h3>
      <ul style="margin: 0 0 0 18px; color: var(--text); font-size: 13.5px;">
        ${recapHtml}
      </ul>
    </div>

    <!-- Navigation Buttons -->
    <div style="display:flex; justify-content:space-between; gap:16px; margin-top:40px; padding-top:24px; border-top:1px solid var(--border); flex-wrap:wrap;">
      ${prevChapter ? `<a href="/blog-java/${prevChapter.slug}.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); padding:10px 18px; border-radius:8px; text-decoration:none; font-weight:700; font-size:13.5px;">← Prev: ${prevChapter.badge}</a>` : `<div></div>`}
      ${nextChapter ? `<a href="/blog-java/${nextChapter.slug}.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:700; font-size:13.5px;">Next: ${nextChapter.badge} →</a>` : `<a href="/blog-java.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:700; font-size:13.5px;">Back to Java Course Home →</a>`}
    </div>

    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Curated by Our Compiler Java Technical Editorial Team</strong><br>
        <span>Published for 2026 Academic & Enterprise Reference · 100% Free & Open Access</span>
      </div>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
<script>
  // Highlight all code blocks on load
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.code-block pre code').forEach(el => {
      el.innerHTML = highlightJavaCode(el.innerText);
    });
  });
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(javaDir, `${ch.slug}.html`), html, 'utf8');
  console.log(`✅ Generated Java Chapter ${ch.num}: public/blog-java/${ch.slug}.html`);
});

// Build Master Hub public/blog-java.html
const hubSidebar = generateJavaAccordionSidebar(null);

const hubRoadmapCards = PHASES_MAP.map(ph => {
  const chaptersInPhase = ALL_CHAPTERS.filter(c => c.phaseId === ph.id);
  return `
    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">${ph.icon}</span>
          <div>
            <div class="phase-roadmap-tag">PHASE ${ph.num}</div>
            <h3 class="phase-roadmap-title">${ph.title}</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">${chaptersInPhase.length > 0 ? `${chaptersInPhase.length} In-Depth Lessons` : 'Upcoming Phase'}</span>
      </div>
      <p class="phase-roadmap-desc">${ph.desc}</p>
      <div class="phase-lessons-list">
        ${chaptersInPhase.length > 0 ? chaptersInPhase.map(c => `
          <a href="/blog-java/${c.slug}.html" class="curriculum-lesson-row">
            <div class="lesson-row-left">
              <span class="lesson-idx">${c.num < 10 ? '0' + c.num : c.num}</span>
              <div class="lesson-info">
                <span class="lesson-title">${c.title}</span>
                <span class="lesson-subtopics">${c.subtopics}</span>
              </div>
            </div>
            <div class="lesson-row-right">
              <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
            </div>
          </a>
        `).join('') : `<div style="padding:10px 14px; color:var(--text3); font-size:13px; font-style:italic;">Curriculum modules under active publication. Check back soon!</div>`}
      </div>
    </div>
  `;
}).join('\n');

const hubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Java Programming Master Tutorial & Complete Roadmap (2026 Edition) | Our Compiler</title>
  <meta name="description" content="Master Java 21 LTS from complete beginner to advanced enterprise backend developer with our 30-phase curriculum, JVM deep dives, live code execution, and interview prep." />
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
    "description": "Comprehensive 30-Phase Java course covering JVM architecture, variables, data types, OOP, Collections, Generics, Lambdas, Stream API, Multithreading, Networking, JDBC, Spring Boot, and technical interview preparation with live runnable code examples.",
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
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-heading">Java Master Course</div>
    <a href="/blog-java.html" class="sidebar-home-link active">☕ Java Course HOME</a>

${hubSidebar}

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
      <span class="badge">🟢 ${ALL_CHAPTERS.length} In-Depth Combined Chapters</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (30 Phases)</span>
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
        <a href="/blog-java/01-java-introduction-features-and-jvm-architecture.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-java/06-java-variables-declaration-and-memory-model.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables & Types →</a>
        <a href="/blog-java/10-java-operators-arithmetic-assignment-relational.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators & Input →</a>
        <a href="/blog-java/14-java-basics-and-input-capstone-projects.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Capstone Projects →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> 30-Phase Complete Java Curriculum Roadmap</div>
    <div class="curriculum-roadmap-container">
${hubRoadmapCards}
    </div>

    <div class="author" style="margin-top:40px;">
      <div class="avatar">OC</div>
      <div>
        <strong>Curated by Our Compiler Technical Editorial Team</strong><br>
        <span>Published for 2026 Academic & Industry Reference · 100% Free & Open Access</span>
      </div>
    </div>
  </main>
</div>

<script src="/site-nav.js" defer></script>
</body>
</html>`;

fs.writeFileSync(path.join(baseDir, 'blog-java.html'), hubHtml, 'utf8');
console.log(`✅ Updated public/blog-java.html and generated all ${ALL_CHAPTERS.length} chapters!`);
