const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const javaDir = path.join(baseDir, 'blog-java');

function wrapJavaPage(title, desc, filename, currentNum, phaseNum, phaseTitle, subtopics, contentBody, prevFile, prevTitle, nextFile, nextTitle) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="java 21 tutorial, ${title.toLowerCase()}, learn java, java programming, java backend, spring boot" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="canonical" href="https://www.ourcompiler.com/blog-java/${filename}" />
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
    .concept-box {
      background: rgba(240, 165, 0, 0.05);
      border: 1px solid rgba(240, 165, 0, 0.25);
      border-left: 4px solid #f0a500;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 18px 0;
    }
    .concept-box h4 {
      color: #f0a500;
      margin-bottom: 8px;
      font-size: 15px;
      font-weight: 700;
    }
    .concept-box p {
      color: var(--text2);
      font-size: 14px;
      line-height: 1.65;
      margin: 0;
    }
    .memory-diagram {
      background: #12161c;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 16px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: #79c0ff;
      line-height: 1.8;
      margin: 16px 0;
    }
    .tbl th {
      background: rgba(240, 165, 0, 0.12);
      color: #f0a500;
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

    <div class="sidebar-accordion">
      <!-- Phase 18: Lambda Expressions -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚡</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 18</span>
            <span class="phase-title">Lambda Expressions</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">1 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content">
        <a href="/blog-java/49-java-lambda-expressions-and-functional-interfaces.html">49. Lambdas & Functional Interfaces</a>
      </div>

      <!-- Phase 19: Stream API & Pipelines -->
      <button class="accordion-header${filename.includes('50-') ? ' active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🌊</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 19</span>
            <span class="phase-title">Stream API & Pipelines</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">1 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content${filename.includes('50-') ? ' open' : ''}">
        <a href="/blog-java/50-java-stream-api-and-pipelines.html"${filename.includes('50-') ? ' class="active"' : ''}>50. Stream API & Pipelines</a>
      </div>

      <!-- Phase 20: Date & Time (java.time) -->
      <button class="accordion-header${filename.includes('51-') ? ' active' : ''}" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⏱️</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 20</span>
            <span class="phase-title">Date & Time (java.time)</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">1 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content${filename.includes('51-') ? ' open' : ''}">
        <a href="/blog-java/51-java-date-and-time-api.html"${filename.includes('51-') ? ' class="active"' : ''}>51. Date & Time (java.time)</a>
      </div>
    </div>

    <div class="sidebar-heading">Interactive IDE</div>
    <a href="/online-java-compiler.html" style="color:#f0a500; font-weight:700;">▶ Try Java 21 Online</a>
    <a href="/blog.html">📚 All Tutorials</a>
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
      <span class="badge">☕ Java 21 LTS</span>
      <span class="badge">🟢 Lesson ${currentNum}</span>
      <span class="badge">📂 Phase ${phaseNum}: ${phaseTitle}</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f0a500; font-weight:700;">📌 Covered in this in-depth guide:</span>
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
        <span class="label">Java Course Completed 🎉</span>
        <span class="title">Java Master Index</span>
      </a>`}
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;
}

// ── BUILD LESSON 50: Stream API & Pipelines (Phase 19 Masterclass) ─────────
function buildLesson50() {
  const title = "Java Stream API: Pipelines, Filtering, Mapping, Aggregation & Parallel Streams";
  const desc = "Master Java Stream API (Phase 19): Streams vs Collections, Creating streams, Intermediate operations (filter, map, sorted, distinct, limit, skip), Terminal operations (forEach, count, min, max, reduce, collect), Collectors.toList, groupingBy, partitioningBy, and Parallel Streams.";
  const filename = "50-java-stream-api-and-pipelines.html";
  const subtopics = "Stream ante enti? · Collection vs Stream · Intermediate (filter, map, sorted, distinct, limit, skip) · Terminal (forEach, reduce, count, min, max) · Collectors (toList, groupingBy, partitioningBy) · Parallel Streams";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 19: Java Stream API & Pipelines Masterclass</strong>! Introduced in Java 8 and continuously enhanced up to Java 21 LTS, the <strong>Stream API (<code>java.util.stream</code>)</strong> is one of the most powerful features in modern Java. A Stream is not a data structure — it does not store data. Instead, it is a <strong>declarative computational pipeline</strong> that processes data sequences from Collections, Arrays, or I/O channels with zero memory mutation, lazy evaluation, and seamless parallel multithreading capability. In this comprehensive in-depth guide, you will master every core stream method, intermediate vs terminal execution models, complex grouping aggregators, and parallel stream performance.</p>
    </div>

    <!-- 1. Stream Ante Enti? Collections vs Streams -->
    <div class="section-title"><span class="num">1</span>Stream Ante Enti? Collections vs Streams (Core Architecture)</div>
    <div class="section-body">
      <p>Java lo <strong>Stream</strong> ante data items యొక్క continuous sequence paina functional transformations (filter, transform, aggregate) perform chese computation pipeline. Dheeni valla traditional nested for-loops and mutable temporary lists completely eliminate avthayi:</p>

      <div class="concept-box">
        <h4>💡 Collections vs Streams — Architectural Differences</h4>
        <table class="tbl" style="margin-top:10px;">
          <tr><th>Feature</th><th>Java Collection (e.g. ArrayList)</th><th>Java Stream (java.util.stream)</th></tr>
          <tr><td><strong>Primary Role</strong></td><td><strong>Data Storage:</strong> Holds elements in Heap memory.</td><td><strong>Computation:</strong> Processes elements on-demand.</td></tr>
          <tr><td><strong>Iteration Model</strong></td><td><strong>External Iteration:</strong> User writes <code>for (int i...)</code> loop explicitly.</td><td><strong>Internal Iteration:</strong> Stream library manages iteration internally.</td></tr>
          <tr><td><strong>Execution Timing</strong></td><td><strong>Eager:</strong> Elements are created & stored immediately.</td><td><strong>Lazy:</strong> No work is executed until a <em>Terminal Operation</em> is invoked!</td></tr>
          <tr><td><strong>Reusability</strong></td><td>Reusable multiple times.</td><td><strong>Consumable Once:</strong> Once terminal op runs, the stream is closed!</td></tr>
          <tr><td><strong>Data Mutation</strong></td><td>Directly mutates backing collection (e.g. <code>add()</code>, <code>remove()</code>).</td><td><strong>Non-mutating:</strong> Never modifies original source data.</td></tr>
        </table>
      </div>

      <div class="memory-diagram">
        <strong>The 3-Stage Stream Pipeline Architecture:</strong><br>
        [SOURCE]              [INTERMEDIATE OPS (Lazy)]               [TERMINAL OP (Eager)]<br>
        List&lt;Integer&gt; ──► .filter(n -&gt; n % 2 == 0) ──► .map(n -&gt; n * 2) ──► .forEach(System.out::println)<br>
        (Numbers)          (Filters Odd numbers)       (Doubles evens)        (Prints & Executes Pipeline!)<br>
                           └───────────────────────────────────────┘<br>
                                 Chain of Lazy Transformations
      </div>
    </div>

    <!-- 2. Creating Streams -->
    <div class="section-title"><span class="num">2</span>How to Create Streams in Java</div>
    <div class="section-body">
      <p>Java lo streams ni multiple sources nunchi construct cheyyavachu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Stream Creation Sources</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.*;
import java.util.stream.*;

public class StreamSourcesDemo {
    public static void main(String[] args) {
        // 1. From Collection
        List&lt;String&gt; list = List.of("Java", "Spring", "Docker");
        Stream&lt;String&gt; s1 = list.stream();

        // 2. From Array
        String[] arr = {"A", "B", "C"};
        Stream&lt;String&gt; s2 = Arrays.stream(arr);

        // 3. From Static Values
        Stream&lt;Integer&gt; s3 = Stream.of(10, 20, 30);

        // 4. Primitive IntStream (Zero Autoboxing Overhead!)
        IntStream intStream = IntStream.rangeClosed(1, 5); // 1, 2, 3, 4, 5

        // 5. Infinite Streams with limit
        Stream&lt;Double&gt; randomNumbers = Stream.generate(Math::random).limit(3);
    }
}</code></pre>
      </div>
    </div>

    <!-- 3. Intermediate Operations Deep Dive -->
    <div class="section-title"><span class="num">3</span>Intermediate Operations Deep Dive (Lazy Transformers)</div>
    <div class="section-body">
      <p><strong>Intermediate Operations</strong> eppudu kotha Stream ni return chesthayi mariyu <strong>Lazy</strong> ga untayi — ante Terminal operation call ayye daka intermediate operations okkati kuda execute avvadhu:</p>

      <table class="tbl">
        <tr><th>Method</th><th>Argument</th><th>Description & Purpose</th></tr>
        <tr><td><strong><code>filter(Predicate)</code></strong></td><td><code>n -&gt; n &gt; 50</code></td><td>Selects only elements matching the boolean condition.</td></tr>
        <tr><td><strong><code>map(Function)</code></strong></td><td><code>s -&gt; s.toUpperCase()</code></td><td>Transforms each element into another object/value.</td></tr>
        <tr><td><strong><code>sorted()</code> / <code>sorted(Comparator)</code></strong></td><td><code>(a, b) -&gt; b - a</code></td><td>Sorts elements in natural or custom comparator order.</td></tr>
        <tr><td><strong><code>distinct()</code></strong></td><td>none (uses <code>.equals()</code>)</td><td>Eliminates all duplicate elements.</td></tr>
        <tr><td><strong><code>limit(n)</code></strong></td><td><code>long maxSize</code></td><td>Truncates stream to at most <code>n</code> elements.</td></tr>
        <tr><td><strong><code>skip(n)</code></strong></td><td><code>long n</code></td><td>Discards the first <code>n</code> elements (ideal for pagination!).</td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Intermediate Operations Demo</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.List;

public class IntermediateOpsDemo {
    public static void main(String[] args) {
        List&lt;Integer&gt; rawScores = List.of(85, 42, 90, 85, 30, 95, 78, 90, 60);

        System.out.println("Top 3 Unique Passing Scores (&gt;= 70):");
        rawScores.stream()
                 .filter(score -&gt; score &gt;= 70)      // Filter passing grades
                 .distinct()                        // Remove duplicates (85, 90)
                 .sorted((a, b) -&gt; b - a)           // Sort DESCENDING
                 .limit(3)                          // Pick top 3
                 .forEach(System.out::println);     // Terminal Op! (95, 90, 85)
    }
}</code></pre>
      </div>
    </div>

    <!-- 4. Terminal Operations & Reductions -->
    <div class="section-title"><span class="num">4</span>Terminal Operations: forEach, count, min, max & reduce()</div>
    <div class="section-body">
      <p><strong>Terminal Operations</strong> stream pipeline execution ni trigger chesi non-stream result ni (e.g. single number, List, Map, boolean) return chesthayi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Reductions with reduce(), count(), min() & max()</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.List;
import java.util.Optional;

public class ReductionsDemo {
    public static void main(String[] args) {
        List&lt;Integer&gt; cartPrices = List.of(1200, 450, 3000, 850, 150);

        // 1. count()
        long totalItems = cartPrices.stream().count();
        System.out.println("Total Items: " + totalItems);

        // 2. min() & max() with Optional
        Optional&lt;Integer&gt; cheapest = cartPrices.stream().min(Integer::compareTo);
        Optional&lt;Integer&gt; mostExpensive = cartPrices.stream().max(Integer::compareTo);
        System.out.println("Cheapest: Rs." + cheapest.orElse(0));
        System.out.println("Most Expensive: Rs." + mostExpensive.orElse(0));

        // 3. reduce(identity, accumulator) -> Calculate Total Sum
        int totalPrice = cartPrices.stream().reduce(0, (sum, price) -&gt; sum + price);
        System.out.println("Total Cart Value: Rs." + totalPrice);
    }
}</code></pre>
      </div>
    </div>

    <!-- 5. Advanced Collectors: toList, groupingBy & partitioningBy -->
    <div class="section-title"><span class="num">5</span>Data Aggregation with collect(): groupingBy & partitioningBy ⭐</div>
    <div class="section-body">
      <p>Enterprise applications lo database query results ni memory lo group cheyyadaniki <strong><code>Collectors.groupingBy()</code></strong> mariyu <strong><code>Collectors.partitioningBy()</code></strong> vadathamu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Grouping & Partitioning Masterclass</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.*;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String department;
    private double salary;

    public Employee(String name, String dept, double sal) {
        this.name = name;
        this.department = dept;
        this.salary = sal;
    }

    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }

    @Override
    public String toString() { return name + " (Rs." + salary + ")"; }
}

public class CollectorsGroupingDemo {
    public static void main(String[] args) {
        List&lt;Employee&gt; employees = List.of(
            new Employee("Ravi", "Engineering", 85000),
            new Employee("Sneha", "HR", 60000),
            new Employee("Kiran", "Engineering", 110000),
            new Employee("Anu", "Marketing", 75000),
            new Employee("Bhavna", "HR", 65000)
        );

        // 1. Collect to Modern Immutable List (Java 16+ Stream.toList())
        List&lt;String&gt; engNames = employees.stream()
            .filter(e -&gt; e.getDepartment().equals("Engineering"))
            .map(Employee::getName)
            .toList();
        System.out.println("Engineering Team: " + engNames);

        // 2. groupingBy: Group employees by Department
        Map&lt;String, List&lt;Employee&gt;&gt; byDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDepartment));
        System.out.println("\\nEmployees by Department: " + byDept);

        // 3. partitioningBy: Split into High Earners (>= 80k) and Regular Earners
        Map&lt;Boolean, List&lt;Employee&gt;&gt; highEarners = employees.stream()
            .collect(Collectors.partitioningBy(e -&gt; e.getSalary() &gt;= 80000));
        System.out.println("\\nHigh Earners (>=80k): " + highEarners.get(true));
    }
}</code></pre>
      </div>
    </div>

    <!-- 6. Sequential vs Parallel Streams -->
    <div class="section-title"><span class="num">6</span>Sequential vs Parallel Streams (Multi-Core Processing)</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>⚡ How Parallel Streams Work Under the Hood</h4>
        <p><code>collection.parallelStream()</code> data sequence ni multiple chunks ga divide chesi JVM యొక్క common <strong>ForkJoinPool.commonPool()</strong> worker threads meedha parallel ga concurrently process chesthundhi.<br>
        ⚠️ <strong>When to use:</strong> Large CPU-intensive datasets (&gt; 100,000 elements) with stateless independent operations.<br>
        ⚠️ <strong>When to avoid:</strong> Small datasets (thread coordination overhead makes it slower than sequential), or when operations involve shared mutable state or blocking I/O!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Parallel Stream Benchmark</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.stream.LongStream;

public class ParallelStreamDemo {
    public static void main(String[] args) {
        long limit = 10_000_000L;

        // Sequential Stream Sum
        long startSeq = System.currentTimeMillis();
        long sumSeq = LongStream.rangeClosed(1, limit).sum();
        long endSeq = System.currentTimeMillis();
        System.out.println("Sequential Sum: " + sumSeq + " (Time: " + (endSeq - startSeq) + " ms)");

        // Parallel Multi-Core Stream Sum
        long startPar = System.currentTimeMillis();
        long sumPar = LongStream.rangeClosed(1, limit).parallel().sum();
        long endPar = System.currentTimeMillis();
        System.out.println("Parallel Sum:   " + sumPar + " (Time: " + (endPar - startPar) + " ms)");
    }
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — User Curriculum Code Example</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this stream filter and transform pipeline in our online Java compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Open Java Compiler</a>
        </div>
        <pre><code>import java.util.List;

public class Main {
    public static void main(String[] args) {
        List&lt;Integer&gt; numbers = List.of(10, 15, 20, 25, 30);

        numbers.stream()
               .filter(number -&gt; number % 2 == 0)
               .map(number -&gt; number * 2)
               .forEach(System.out::println);
    }
}</code></pre>
      </div>
      <a class="run-btn" href="/online-java-compiler.html">Open in Online Java Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for Java 21 LTS (2026 Edition)</div>
    </div>
  `;

  const html = wrapJavaPage(title, desc, filename, 50, "19", "Stream API & Pipelines", subtopics, contentBody, '49-java-lambda-expressions-and-functional-interfaces.html', '49. Lambdas & Functional Interfaces', '51-java-date-and-time-api.html', '51. Date & Time (java.time)');
  fs.writeFileSync(path.join(javaDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── BUILD LESSON 51: Date and Time API (Phase 20 Masterclass) ─────────────
function buildLesson51() {
  const title = "Java Date and Time API (java.time): LocalDate, ZonedDateTime, Period & Duration";
  const desc = "Master modern Java Date and Time API (Phase 20): Limitations of legacy Date & Calendar, LocalDate, LocalTime, LocalDateTime, ZonedDateTime, DateTimeFormatter, parsing, date arithmetic (plus/minus), date comparisons, Period vs Duration, and time zone conversions.";
  const filename = "51-java-date-and-time-api.html";
  const subtopics = "Old Date class limitations · LocalDate · LocalTime · LocalDateTime · ZonedDateTime · DateTimeFormatter (Formatting & Parsing) · Date Arithmetic (+/-) · isBefore / isAfter · Period vs Duration · Time Zones (ZoneId)";

  const contentBody = `
    <div class="intro-box">
      <p>Welcome to <strong>Phase 20: Java Date and Time API (<code>java.time</code>) Masterclass</strong>! Prior to Java 8, handling dates and times in Java using legacy <code>java.util.Date</code> and <code>java.util.Calendar</code> was notoriously error-prone, mutable, and thread-unsafe. Java 8 introduced the modern <strong>JSR-310 <code>java.time</code> package</strong>, designed from the ground up to be <strong>immutable, thread-safe, domain-driven, and ISO-8601 compliant</strong>. In this comprehensive in-depth guide, you will master <code>LocalDate</code>, <code>LocalTime</code>, <code>LocalDateTime</code>, <code>ZonedDateTime</code>, <code>DateTimeFormatter</code> for formatting and parsing, date math, date comparisons, the crucial difference between <code>Period</code> and <code>Duration</code>, and global time zone conversions.</p>
    </div>

    <!-- 1. Legacy Date Limitations -->
    <div class="section-title"><span class="num">1</span>Legacy Date Limitations (Why java.util.Date was Replaced)</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">⚠️ The 4 Major Flaws of Legacy java.util.Date & Calendar:</h4>
        <p>1. <strong>Mutability (Thread-Unsafe):</strong> <code>Date</code> objects are mutable (e.g. <code>date.setTime(...)</code>). Two threads sharing a date object cause race conditions!<br>
        2. <strong>Confusing 0-Indexed Months:</strong> January is <code>0</code> and December is <code>11</code>! (Passing <code>12</code> rolled over to January next year). Years started from 1900!<br>
        3. <strong>SimpleDateFormat is NOT Thread-Safe:</strong> Using a shared <code>SimpleDateFormat</code> in multi-threaded Spring Boot backends corrupted timestamps.<br>
        4. <strong>No Domain Separation:</strong> <code>java.util.Date</code> represented both Date and Time combined, even when only a date (e.g. Birthday) was needed.</p>
      </div>

      <table class="tbl">
        <tr><th>Modern Class (<code>java.time</code>)</th><th>Domain Meaning</th><th>Contains Timezone?</th><th>Example Representation</th></tr>
        <tr><td><strong><code>LocalDate</code></strong></td><td>Date Only (Year, Month, Day)</td><td>No</td><td><code>2026-08-17</code> (Birthdays, Holidays)</td></tr>
        <tr><td><strong><code>LocalTime</code></strong></td><td>Time Only (Hour, Min, Sec, Nano)</td><td>No</td><td><code>14:30:45.123</code> (Store opening hours)</td></tr>
        <tr><td><strong><code>LocalDateTime</code></strong></td><td>Date + Time combined</td><td>No</td><td><code>2026-08-17T14:30:45</code> (Scheduled Meeting)</td></tr>
        <tr><td><strong><code>ZonedDateTime</code></strong></td><td>Date + Time + ZoneId</td><td><strong>Yes</strong></td><td><code>2026-08-17T14:30:45+05:30[Asia/Kolkata]</code></td></tr>
        <tr><td><strong><code>Instant</code></strong></td><td>Machine Timestamp (Epoch Seconds)</td><td>UTC</td><td><code>2026-08-17T09:00:45Z</code> (Database Audit Logs)</td></tr>
      </table>
    </div>

    <!-- 2. LocalDate, LocalTime & LocalDateTime Deep Dive -->
    <div class="section-title"><span class="num">2</span>LocalDate, LocalTime & LocalDateTime in Practice</div>
    <div class="section-body">
      <p>Modern date-time classes provide clear factory constructors (<code>now()</code>, <code>of()</code>) and getter methods:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Core java.time Creation & Inspection</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.Month;

public class DateTimeBasicsDemo {
    public static void main(String[] args) {
        // 1. LocalDate (Date only)
        LocalDate today = LocalDate.now();
        LocalDate independenceDay = LocalDate.of(1947, Month.AUGUST, 15);
        System.out.println("Today's Date: " + today);
        System.out.println("Year: " + today.getYear() + " | Month: " + today.getMonth() + " | Day: " + today.getDayOfMonth());

        // 2. LocalTime (Time only)
        LocalTime currentTime = LocalTime.now();
        LocalTime meetingTime = LocalTime.of(10, 30, 0); // 10:30 AM
        System.out.println("Current Time: " + currentTime);

        // 3. LocalDateTime (Date + Time)
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime newYear2027 = LocalDateTime.of(2027, 1, 1, 0, 0, 0);
        System.out.println("New Year: " + newYear2027);
    }
}</code></pre>
      </div>
    </div>

    <!-- 3. Formatting & Parsing with DateTimeFormatter -->
    <div class="section-title"><span class="num">3</span>Formatting & Parsing Dates with DateTimeFormatter (Thread-Safe!)</div>
    <div class="section-body">
      <p><code>DateTimeFormatter</code> is completely <strong>immutable and thread-safe</strong>. It converts dates to custom formatted strings and parses input strings into date objects:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Formatting & Parsing</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class FormattingAndParsingDemo {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();

        // 1. Formatting Date -> Custom String
        DateTimeFormatter customFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss a");
        String formattedOutput = now.format(customFormat);
        System.out.println("Formatted Indian Timestamp: " + formattedOutput);

        // 2. Parsing String -> LocalDate
        String userInputDate = "25/12/2026";
        DateTimeFormatter inputParser = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate parsedChristmas = LocalDate.parse(userInputDate, inputParser);
        System.out.println("Parsed Date: " + parsedChristmas + " (Day of week: " + parsedChristmas.getDayOfWeek() + ")");
    }
}</code></pre>
      </div>
    </div>

    <!-- 4. Date Arithmetic & Comparison -->
    <div class="section-title"><span class="num">4</span>Date Arithmetic (plus/minus) & Date Comparisons</div>
    <div class="section-body">
      <p>Because <code>java.time</code> objects are immutable, math operations return a <strong>new updated instance</strong> without modifying the original:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Date Arithmetic & Comparisons</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.time.LocalDate;

public class DateArithmeticDemo {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();

        // 1. Adding and Subtracting
        LocalDate nextWeek = today.plusDays(7);
        LocalDate threeMonthsAgo = today.minusMonths(3);
        LocalDate nextYear = today.plusYears(1);

        System.out.println("Today: " + today);
        System.out.println("1 Week Later: " + nextWeek);
        System.out.println("3 Months Ago: " + threeMonthsAgo);

        // 2. Comparing Dates (isBefore, isAfter, isEqual)
        LocalDate expiryDate = LocalDate.of(2026, 12, 31);
        if (today.isBefore(expiryDate)) {
            System.out.println("✅ Product license is ACTIVE.");
        } else {
            System.out.println("❌ Product license has EXPIRED.");
        }
    }
}</code></pre>
      </div>
    </div>

    <!-- 5. Period vs Duration Deep Dive -->
    <div class="section-title"><span class="num">5</span>Period vs Duration (Critical Difference ⭐)</div>
    <div class="section-body">
      <div class="concept-box">
        <h4>💡 Period vs Duration — Must-Know Interview Distinction</h4>
        <p>• <strong><code>Period</code> (Date-Based):</strong> Measures difference in <strong>Years, Months, and Days</strong> (e.g. Age calculation between two <code>LocalDate</code> instances).<br>
        • <strong><code>Duration</code> (Time-Based):</strong> Measures difference in <strong>Seconds, Milliseconds, and Nanoseconds</strong> (e.g. Measuring execution time benchmark between two <code>LocalTime</code> or <code>Instant</code> instances).</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Period & Duration in Action</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.time.Duration;

public class PeriodDurationDemo {
    public static void main(String[] args) {
        // 1. Period: Age Calculator
        LocalDate birthDate = LocalDate.of(2000, 5, 15);
        LocalDate today = LocalDate.now();
        Period age = Period.between(birthDate, today);
        System.out.println("Exact Age: " + age.getYears() + " Years, " + 
                           age.getMonths() + " Months, and " + age.getDays() + " Days.");

        // 2. Duration: Benchmark Execution Time
        LocalTime startTime = LocalTime.of(10, 15, 30);
        LocalTime endTime = LocalTime.of(12, 45, 50);
        Duration taskDuration = Duration.between(startTime, endTime);
        System.out.println("Task Duration: " + taskDuration.toHours() + " hours and " + 
                           (taskDuration.toMinutes() % 60) + " minutes (" + taskDuration.toSeconds() + " total seconds).");
    }
}</code></pre>
      </div>
    </div>

    <!-- 6. ZonedDateTime & Time Zones -->
    <div class="section-title"><span class="num">6</span>ZonedDateTime & Global Time Zone Conversions</div>
    <div class="section-body">
      <p>International applications and flight ticketing systems require exact time zone awareness via <code>ZoneId</code>:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Time Zone Conversion Engine</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.time.ZonedDateTime;
import java.time.ZoneId;

public class TimeZoneDemo {
    public static void main(String[] args) {
        // Current Time in India (IST)
        ZoneId istZone = ZoneId.of("Asia/Kolkata");
        ZonedDateTime indiaTime = ZonedDateTime.now(istZone);
        System.out.println("India Time (IST): " + indiaTime);

        // Convert Same Instant to New York (EST) & Tokyo (JST)
        ZonedDateTime newYorkTime = indiaTime.withZoneSameInstant(ZoneId.of("America/New_York"));
        ZonedDateTime tokyoTime = indiaTime.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));

        System.out.println("New York Time (EST): " + newYorkTime);
        System.out.println("Tokyo Time (JST):    " + tokyoTime);
    }
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test in Live Java 21 Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this complete date and time formatter in our online Java compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Open Java Compiler</a>
        </div>
        <pre><code>import java.time.LocalDate;
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        LocalDate start = LocalDate.of(2024, 1, 1);
        LocalDate current = LocalDate.now();

        Period period = Period.between(start, current);
        System.out.println("Time elapsed since Jan 1, 2024: " + 
            period.getYears() + " years, " + period.getMonths() + " months, " + period.getDays() + " days.");
    }
}</code></pre>
      </div>
      <a class="run-btn" href="/online-java-compiler.html">Open in Online Java Compiler →</a>
    </div>

    <div class="author">
      <div class="avatar">OC</div>
      <div>Written and reviewed by Our Compiler Technical Team · Updated for Java 21 LTS (2026 Edition)</div>
    </div>
  `;

  const html = wrapJavaPage(title, desc, filename, 51, "20", "Date & Time (java.time)", subtopics, contentBody, '50-java-stream-api-and-pipelines.html', '50. Stream API & Pipelines', null, null);
  fs.writeFileSync(path.join(javaDir, filename), html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

// ── UPDATE blog-java.html HOME & ROADMAP ───────────────────────────────────
function updateBlogJavaHome() {
  const javaHomePath = path.join(baseDir, 'blog-java.html');
  let html = fs.readFileSync(javaHomePath, 'utf8');

  // Update Phase 19 Accordion
  const targetAccordion19 = `      <!-- Phase 19: Stream API & Pipelines -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🌊</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 19</span>
            <span class="phase-title">Stream API & Pipelines</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">Upcoming</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content">
        <span style="display:block; padding:6px 12px; font-size:11.5px; color:var(--text3); font-style:italic;">Coming Soon in Next Phase</span>
      </div>`;

  const updatedAccordion19 = `      <!-- Phase 19: Stream API & Pipelines -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🌊</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 19</span>
            <span class="phase-title">Stream API & Pipelines</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">1 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content">
        <a href="/blog-java/50-java-stream-api-and-pipelines.html">50. Stream API & Pipelines</a>
      </div>`;

  if (html.includes(targetAccordion19)) {
    html = html.replace(targetAccordion19, updatedAccordion19);
  }

  // Update Phase 20 Accordion
  const targetAccordion20 = `      <!-- Phase 20: Date & Time (java.time) -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⏱️</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 20</span>
            <span class="phase-title">Date & Time (java.time)</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">Upcoming</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content">
        <span style="display:block; padding:6px 12px; font-size:11.5px; color:var(--text3); font-style:italic;">Coming Soon in Next Phase</span>
      </div>`;

  const updatedAccordion20 = `      <!-- Phase 20: Date & Time (java.time) -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⏱️</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 20</span>
            <span class="phase-title">Date & Time (java.time)</span>
          </div>
        </div>
        <div class="accordion-header-meta">
          <span class="phase-count-badge">1 Ch</span>
          <svg class="accordion-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
      <div class="accordion-content">
        <a href="/blog-java/51-java-date-and-time-api.html">51. Date & Time (java.time)</a>
      </div>`;

  if (html.includes(targetAccordion20)) {
    html = html.replace(targetAccordion20, updatedAccordion20);
  }

  // Update Roadmap Cards for Phase 19 and Phase 20
  const targetRoadmap19 = `    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">🌊</span>
          <div>
            <div class="phase-roadmap-tag">PHASE 19</div>
            <h3 class="phase-roadmap-title">Stream API & Pipelines</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">Upcoming Phase</span>
      </div>
      <p class="phase-roadmap-desc">Streams vs Collections, filter, map, sorted, distinct, reduce, collect, groupingBy, and parallel streams.</p>
      <div class="phase-lessons-list">
        <div style="padding:10px 14px; color:var(--text3); font-size:13px; font-style:italic;">Curriculum modules under active publication. Check back soon!</div>
      </div>
    </div>`;

  const updatedRoadmap19 = `    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">🌊</span>
          <div>
            <div class="phase-roadmap-tag">PHASE 19</div>
            <h3 class="phase-roadmap-title">Stream API & Pipelines</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">1 In-Depth Chapter</span>
      </div>
      <p class="phase-roadmap-desc">Stream fundamentals, Collections vs Streams, intermediate operations (filter, map, sorted, distinct, limit, skip), terminal operations (reduce, count, collect), groupingBy, partitioningBy, and Parallel Streams.</p>
      <div class="phase-lessons-list">
        <a href="/blog-java/50-java-stream-api-and-pipelines.html" class="curriculum-lesson-row">
          <div class="lesson-row-left">
            <span class="lesson-idx">50</span>
            <div class="lesson-info">
              <span class="lesson-title">50. Stream API & Pipelines</span>
              <span class="lesson-subtopics">Streams vs Collections · filter & map · sorted & distinct · limit & skip · reduce & collect · groupingBy & partitioningBy · Parallel Streams</span>
            </div>
          </div>
          <div class="lesson-row-right">
            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
          </div>
        </a>
      </div>
    </div>`;

  if (html.includes(targetRoadmap19)) {
    html = html.replace(targetRoadmap19, updatedRoadmap19);
  }

  const targetRoadmap20 = `    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">⏱️</span>
          <div>
            <div class="phase-roadmap-tag">PHASE 20</div>
            <h3 class="phase-roadmap-title">Date & Time (java.time)</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">Upcoming Phase</span>
      </div>
      <p class="phase-roadmap-desc">LocalDate, LocalTime, LocalDateTime, ZonedDateTime, DateTimeFormatter, Period, and Duration.</p>
      <div class="phase-lessons-list">
        <div style="padding:10px 14px; color:var(--text3); font-size:13px; font-style:italic;">Curriculum modules under active publication. Check back soon!</div>
      </div>
    </div>`;

  const updatedRoadmap20 = `    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">⏱️</span>
          <div>
            <div class="phase-roadmap-tag">PHASE 20</div>
            <h3 class="phase-roadmap-title">Date & Time (java.time)</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">1 In-Depth Chapter</span>
      </div>
      <p class="phase-roadmap-desc">Legacy Date limitations, LocalDate, LocalTime, LocalDateTime, ZonedDateTime, DateTimeFormatter (parsing & formatting), date arithmetic, Period vs Duration, and ZoneId.</p>
      <div class="phase-lessons-list">
        <a href="/blog-java/51-java-date-and-time-api.html" class="curriculum-lesson-row">
          <div class="lesson-row-left">
            <span class="lesson-idx">51</span>
            <div class="lesson-info">
              <span class="lesson-title">51. Date & Time (java.time)</span>
              <span class="lesson-subtopics">Legacy Date Flaws · LocalDate & LocalTime · LocalDateTime & ZonedDateTime · DateTimeFormatter · Date Arithmetic · Period vs Duration · Time Zones</span>
            </div>
          </div>
          <div class="lesson-row-right">
            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
          </div>
        </a>
      </div>
    </div>`;

  if (html.includes(targetRoadmap20)) {
    html = html.replace(targetRoadmap20, updatedRoadmap20);
  }

  fs.writeFileSync(javaHomePath, html, 'utf8');
  console.log('✅ Updated public/blog-java.html with Phase 19 and 20 details!');
}

function run() {
  console.log('🚀 Building Java Phase 19 (Stream API) and Phase 20 (Date & Time)...');
  buildLesson50();
  buildLesson51();
  updateBlogJavaHome();
  console.log('🎉 Java Phase 19 & 20 successfully created!');
}

run();
