const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const javaDir = path.join(baseDir, 'blog-java');

function buildJavaPhase18() {
  const filename = '49-java-lambda-expressions-and-functional-interfaces.html';
  const filePath = path.join(javaDir, filename);

  const title = "Lambda Expressions & Functional Interfaces Masterclass — Java 21 Tutorial";
  const desc = "Master Java Lambda Expressions & Functional Interfaces: Functional programming in Java, lambda syntax, Predicate, Consumer, Function, Supplier, BiFunction, Method References (::), Constructor References, Collections forEach/removeIf, sorting with Comparator, and the effectively final variable capture rule.";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="java lambda expressions, functional interfaces, predicate, consumer, function, supplier, method references, constructor reference, java 21, effectively final" />
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
      <!-- Phase 17: Wrapper Classes & Enums -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">🎁</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 17</span>
            <span class="phase-title">Wrapper Classes & Enums</span>
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
        <a href="/blog-java/48-java-wrapper-classes-autoboxing-and-enums.html">48. Wrapper Classes, Autoboxing & Enums</a>
      </div>

      <!-- Phase 18: Lambda Expressions & Functional Interfaces (ACTIVE) -->
      <button class="accordion-header active" onclick="toggleAccordion(this)">
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
      <div class="accordion-content open">
        <a href="/blog-java/49-java-lambda-expressions-and-functional-interfaces.html" class="active">49. Lambdas & Functional Interfaces</a>
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
      <span class="current">Lesson 49: Lambda Expressions & Functional Interfaces</span>
    </div>

    <h1 class="page-title">Lambda Expressions & Functional Interfaces Masterclass</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21 LTS</span>
      <span class="badge">🟢 Lesson 49</span>
      <span class="badge">📂 Phase 18: Lambda Expressions & Functional Interfaces</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f0a500; font-weight:700;">📌 Covered in this in-depth guide:</span>
      <span>Functional Programming Basics · Lambda Expression Syntax · @FunctionalInterface · Predicate · Consumer · Function · Supplier · BiFunction · Method References (::) · Constructor References (::new) · Collections forEach & Sorting · Variable Capture (Effectively Final Rule)</span>
    </div>

    <div class="intro-box">
      <p>Before Java 8, Java was strictly object-oriented — to pass behavior (code) into a method, developers had to write bulky, verbose <strong>Anonymous Inner Classes</strong>. The introduction of <strong>Lambda Expressions</strong> and <strong>Functional Interfaces</strong> in Java 8 revolutionized the language, introducing <strong>Functional Programming (FP)</strong> capabilities. Lambdas allow you to treat functionality as a method argument, write clean declarative code pipelines, and power the <strong>Stream API</strong>. In this comprehensive masterclass guide, you will master functional interfaces (<code>Predicate</code>, <code>Consumer</code>, <code>Function</code>, <code>Supplier</code>, <code>BiFunction</code>), method references (<code>::</code>), collection iterations, comparator sorting pipelines, and the golden <strong>effectively final</strong> variable capture rule.</p>
    </div>

    <!-- SECTION 1: Functional Programming Basics & Lambda Syntax -->
    <div class="section-title"><span class="num">1</span>Functional Programming Basics & Lambda Syntax Anatomy</div>
    <div class="section-body">
      <p><strong>Functional Programming (FP)</strong> ante functions ni <em>First-Class Citizens</em> ga treat cheyyadam — ante functions ni arguments ga pass cheyyavachu, return cheyyavachu, mariyu variables lo store cheyyavachu. Java lo Lambda Expression ante <strong>Anonymous Function</strong> (peru leni function):</p>

      <div class="memory-diagram">
        <strong>Lambda Syntax Anatomy:</strong><br>
        (parameter1, parameter2)  -&gt;  { body / expression }<br>
        └─────────┬────────────┘  │   └──────────┬────────┘<br>
                  │               │              │<br>
             Parameters       Arrow Token     Execution Logic<br>
        <br>
        Examples:<br>
        1. Zero Params:   () -&gt; System.out.println("Hello");<br>
        2. Single Param:  name -&gt; System.out.println(name);  (Parentheses optional!)<br>
        3. Multiple:      (a, b) -&gt; a + b;                   (Implicit return!)<br>
        4. Multi-line:    (a, b) -&gt; { int sum = a + b; return sum * 2; };
      </div>

      <div class="concept-box">
        <h4>💡 Imperative vs Functional Style (Anonymous Class vs Lambda)</h4>
        <p><strong>Old Java (Anonymous Inner Class):</strong><br>
        <code>Runnable r = new Runnable() { public void run() { System.out.println("Run"); } };</code> (5 lines of boilerplate!)<br>
        <strong>Modern Java (Lambda Expression):</strong><br>
        <code>Runnable r = () -> System.out.println("Run");</code> (Clean 1-liner!)</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — User Curriculum Example</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.List;

public class Main {
    public static void main(String[] args) {
        List&lt;String&gt; names = List.of("Ravi", "Anu", "Kiran");

        // Lambda Expression passed to forEach (Consumer)
        names.forEach(name -&gt; System.out.println(name));
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 2: Functional Interfaces -->
    <div class="section-title"><span class="num">2</span>What is a Functional Interface? (@FunctionalInterface Annotation)</div>
    <div class="section-body">
      <p>A <strong>Functional Interface</strong> is an interface that contains <strong>EXACTLY ONE Single Abstract Method (SAM)</strong>. It can have any number of <code>default</code> or <code>static</code> methods with concrete implementation, but only 1 abstract method. Lambda expressions can ONLY be assigned to Functional Interfaces:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Custom Functional Interface</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>@FunctionalInterface
interface MathOperation {
    int operate(int a, int b); // The Single Abstract Method (SAM)

    // Default methods are allowed!
    default void printInfo() {
        System.out.println("Executing math operation...");
    }
}

public class FunctionalInterfaceDemo {
    public static void main(String[] args) {
        // Lambda implementing the SAM
        MathOperation addition = (a, b) -&gt; a + b;
        MathOperation multiplication = (a, b) -&gt; a * b;

        System.out.println("10 + 20 = " + addition.operate(10, 20)); // 30
        System.out.println("10 * 20 = " + multiplication.operate(10, 20)); // 200
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 3: The 5 Core Built-in Functional Interfaces -->
    <div class="section-title"><span class="num">3</span>The Core 5 Functional Interfaces in java.util.function ⭐ (Must-Know)</div>
    <div class="section-body">
      <p>Java standard library <code>java.util.function</code> package lo enterprise applications ki avasaramaina 5 core functional interfaces provide chesindi:</p>

      <table class="tbl">
        <tr><th>Interface</th><th>Abstract Method</th><th>Input $\rightarrow$ Output</th><th>Key Purpose & Real-World Use</th></tr>
        <tr>
          <td><strong><code>Predicate&lt;T&gt;</code></strong></td>
          <td><code>boolean test(T t)</code></td>
          <td><code>T</code> $\rightarrow$ <code>boolean</code></td>
          <td>Condition checking, filtering items in Streams (e.g. <code>user.getAge() &gt;= 18</code>).</td>
        </tr>
        <tr>
          <td><strong><code>Consumer&lt;T&gt;</code></strong></td>
          <td><code>void accept(T t)</code></td>
          <td><code>T</code> $\rightarrow$ <code>void</code></td>
          <td>Consuming data / side-effects (e.g. <code>System.out.println</code>, sending emails).</td>
        </tr>
        <tr>
          <td><strong><code>Function&lt;T, R&gt;</code></strong></td>
          <td><code>R apply(T t)</code></td>
          <td><code>T</code> $\rightarrow$ <code>R</code></td>
          <td>Data transformation & mapping (e.g. converting <code>String</code> to <code>Integer</code> length).</td>
        </tr>
        <tr>
          <td><strong><code>Supplier&lt;T&gt;</code></strong></td>
          <td><code>T get()</code></td>
          <td><code>none</code> $\rightarrow$ <code>T</code></td>
          <td>Factory generator, lazy loading, creating UUIDs, generating timestamps.</td>
        </tr>
        <tr>
          <td><strong><code>BiFunction&lt;T, U, R&gt;</code></strong></td>
          <td><code>R apply(T t, U u)</code></td>
          <td><code>(T, U)</code> $\rightarrow$ <code>R</code></td>
          <td>Taking 2 arguments of different types and returning a computed result <code>R</code>.</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — All 5 Core Functional Interfaces in Action</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.function.*;

public class CoreInterfacesDemo {
    public static void main(String[] args) {
        // 1. Predicate: Check if number is even
        Predicate&lt;Integer&gt; isEven = n -&gt; n % 2 == 0;
        System.out.println("Is 14 even? " + isEven.test(14)); // true

        // 2. Consumer: Print formatted string
        Consumer&lt;String&gt; greeter = name -&gt; System.out.println("Namaste, " + name + "!");
        greeter.accept("Ravi"); // Namaste, Ravi!

        // 3. Function: Convert string to character length
        Function&lt;String, Integer&gt; stringLength = str -&gt; str.length();
        System.out.println("Length of 'Java 21': " + stringLength.apply("Java 21")); // 7

        // 4. Supplier: Provide current timestamp
        Supplier&lt;Double&gt; randomSupplier = () -&gt; Math.random();
        System.out.println("Random Value: " + randomSupplier.get());

        // 5. BiFunction: Combine Name and Salary into Employee Record String
        BiFunction&lt;String, Double, String&gt; empFormatter = 
            (name, salary) -&gt; "Employee: " + name + " | Salary: Rs." + salary;
        System.out.println(empFormatter.apply("Sneha", 95000.0));
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 4: Method References & Constructor References -->
    <div class="section-title"><span class="num">4</span>Method References (::) & Constructor References (::new)</div>
    <div class="section-body">
      <p>Lambda expression kevalam existing method ni direct ga invoke chesthunte, dhaanni inka compact ga rayadaniki <strong>Method Reference (<code>::</code>)</strong> vadathamu:</p>

      <table class="tbl">
        <tr><th>Method Reference Type</th><th>Lambda Syntax</th><th>Method Reference Shorthand (<code>::</code>)</th></tr>
        <tr><td><strong>1. Static Method</strong></td><td><code>str -&gt; Integer.parseInt(str)</code></td><td><code>Integer::parseInt</code></td></tr>
        <tr><td><strong>2. Instance Method of Specific Object</strong></td><td><code>x -&gt; System.out.println(x)</code></td><td><code>System.out::println</code></td></tr>
        <tr><td><strong>3. Instance Method of Arbitrary Object</strong></td><td><code>str -&gt; str.toUpperCase()</code></td><td><code>String::toUpperCase</code></td></tr>
        <tr><td><strong>4. Constructor Reference</strong></td><td><code>() -&gt; new ArrayList&lt;&gt;()</code></td><td><code>ArrayList::new</code></td></tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Method References Demo</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.List;
import java.util.ArrayList;
import java.util.function.Function;
import java.util.function.Supplier;

public class MethodRefDemo {
    public static void main(String[] args) {
        List&lt;String&gt; cities = List.of("hyderabad", "bengaluru", "chennai");

        // 1. Instance Method Reference (String::toUpperCase)
        cities.stream().map(String::toUpperCase).forEach(System.out::println);

        // 2. Static Method Reference (Integer::parseInt)
        Function&lt;String, Integer&gt; parser = Integer::parseInt;
        System.out.println("Parsed: " + (parser.apply("500") + 100)); // 600

        // 3. Constructor Reference (ArrayList::new)
        Supplier&lt;List&lt;String&gt;&gt; listFactory = ArrayList::new;
        List&lt;String&gt; dynamicList = listFactory.get();
        dynamicList.add("Spring Boot");
        System.out.println("Created List: " + dynamicList);
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 5: Lambdas with Collections & Sorting -->
    <div class="section-title"><span class="num">5</span>Lambdas with Collections & Multi-Field Sorting (Comparator)</div>
    <div class="section-body">
      <p>Java 8+ Collections lo <code>forEach</code>, <code>removeIf</code>, <code>replaceAll</code>, mariyu <code>sort</code> methods Lambdas tho integration ayyi unnay:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Collection Sorting with Comparator Pipelines</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Developer {
    private String name;
    private int experienceYears;
    private double salary;

    public Developer(String name, int exp, double salary) {
        this.name = name;
        this.experienceYears = exp;
        this.salary = salary;
    }

    public String getName() { return name; }
    public int getExperienceYears() { return experienceYears; }
    public double getSalary() { return salary; }

    @Override
    public String toString() {
        return name + " (" + experienceYears + " yrs) - Rs." + salary;
    }
}

public class SortingDemo {
    public static void main(String[] args) {
        List&lt;Developer&gt; team = new ArrayList&lt;&gt;();
        team.add(new Developer("Ravi", 4, 75000));
        team.add(new Developer("Anu", 7, 120000));
        team.add(new Developer("Kiran", 2, 45000));
        team.add(new Developer("Bhavna", 7, 135000));

        // 1. removeIf with Predicate: Remove developers with < 3 yrs experience
        team.removeIf(dev -&gt; dev.getExperienceYears() &lt; 3);

        // 2. Multi-Level Sorting: By Experience DESC, then by Salary DESC
        team.sort(
            Comparator.comparingInt(Developer::getExperienceYears).reversed()
                      .thenComparingDouble(Developer::getSalary).reversed()
        );

        System.out.println("=== Sorted Senior Developers ===");
        team.forEach(System.out::println);
    }
}</code></pre>
      </div>
    </div>

    <!-- SECTION 6: Variable Capture & Effectively Final Rule -->
    <div class="section-title"><span class="num">6</span>Variable Capture & The "Effectively Final" Rule ⚠️</div>
    <div class="section-body">
      <div class="concept-box" style="border-left-color:#ff7b72; background:rgba(255, 123, 114, 0.06);">
        <h4 style="color:#ff7b72;">⚠️ Critical Rule: Why Captured Variables Must Be Final</h4>
        <p>Lambda expression lopala outer method lo unna local variables ni read cheyyavachu (called <strong>Variable Capture</strong>). Kaani aa variable <strong>&lt;code&gt;final&lt;/code&gt; or &lt;code&gt;effectively final&lt;/code&gt;</strong> (declare chesina tharvatha reassign cheyyakunda undali)!<br>
        <strong>Why?</strong> Local variable Stack Memory lo untundhi. Outer method execute aypoyaka stack frame destroy avthundhi, kaani Lambda Object Heap lo untundhi. So Java local variable copy ni capture chesthundhi. Synchronization conflicts avoid cheyyadaniki Java reassignments ni prohibit chesthundhi!</p>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21 — Variable Capture Demo</span>
          <div class="code-actions">
            <button class="code-action-btn" onclick="copyCodeSnippet(this)">📋 Copy</button>
            <button class="code-action-btn" onclick="runInJavaCompiler(this)" style="background:#f0a500; color:#121212; border-color:#f0a500;">▶ Run Code</button>
          </div>
        </div>
        <pre><code>public class VariableCaptureDemo {
    public static void main(String[] args) {
        String companyPrefix = "OUR_COMPILER_"; // Effectively final variable

        List&lt;String&gt; roles = List.of("DEV", "TESTER", "ARCHITECT");

        // ✅ Allowed: Reading effectively final variable
        roles.forEach(role -&gt; {
            System.out.println(companyPrefix + role);
        });

        // ❌ If you try to reassign:
        // companyPrefix = "NEW_PREFIX_"; 
        // Compilation Error: Variable used in lambda expression should be final or effectively final!
    }
}</code></pre>
      </div>
    </div>

    <!-- Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Test in Live Java 21 Compiler</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run this complete functional lambda pipeline in our online Java compiler:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java 21</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Open Java Compiler</a>
        </div>
        <pre><code>import java.util.List;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        List&lt;String&gt; languages = List.of("Java", "JavaScript", "Python", "C++", "Julia");

        Predicate&lt;String&gt; startsWithJ = lang -&gt; lang.startsWith("J");

        languages.stream()
                 .filter(startsWithJ)
                 .map(String::toUpperCase)
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
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Generated ${filename}`);
}

function updateBlogJavaHome() {
  const javaHomePath = path.join(baseDir, 'blog-java.html');
  let html = fs.readFileSync(javaHomePath, 'utf8');

  // Update Phase 18 in sidebar accordion
  const targetAccordion = `      <!-- Phase 18: Lambda Expressions -->
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-header-main">
          <span class="phase-icon-box">⚡</span>
          <div class="phase-info">
            <span class="phase-tag">Phase 18</span>
            <span class="phase-title">Lambda Expressions</span>
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

  const updatedAccordion = `      <!-- Phase 18: Lambda Expressions -->
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
      </div>`;

  if (html.includes(targetAccordion)) {
    html = html.replace(targetAccordion, updatedAccordion);
  }

  // Update Phase 18 Roadmap card
  const targetRoadmap = `    <!-- Phase 18: Lambda Expressions -->
    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">⚡</span>
          <div>
            <div class="phase-roadmap-tag">Phase 18</div>
            <h3 class="phase-roadmap-title">Lambda Expressions</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">Upcoming Module</span>
      </div>
      <p class="phase-roadmap-desc">Functional interfaces (@FunctionalInterface), lambda syntax, Predicate, Function, Consumer, Supplier, and method references (::).</p>
      <div class="phase-lessons-list">
        <div style="padding:14px 18px; color:var(--text3); font-size:13px; font-style:italic;">🚀 Chapters for this phase are being finalized and will be published in the next release cycle.</div>
      </div>
    </div>`;

  const updatedRoadmap = `    <!-- Phase 18: Lambda Expressions -->
    <div class="phase-roadmap-card">
      <div class="phase-roadmap-header">
        <div class="phase-roadmap-title-wrap">
          <span class="phase-roadmap-icon">⚡</span>
          <div>
            <div class="phase-roadmap-tag">Phase 18</div>
            <h3 class="phase-roadmap-title">Lambda Expressions</h3>
          </div>
        </div>
        <span class="phase-roadmap-badge">1 In-Depth Chapter</span>
      </div>
      <p class="phase-roadmap-desc">Functional programming in Java, lambda syntax, Predicate, Consumer, Function, Supplier, BiFunction, Method references (::), Constructor references (::new), collections integration, and effectively final variable capture.</p>
      <div class="phase-lessons-list">
        <a href="/blog-java/49-java-lambda-expressions-and-functional-interfaces.html" class="curriculum-lesson-row">
          <div class="lesson-row-left">
            <span class="lesson-idx">49</span>
            <div class="lesson-info">
              <span class="lesson-title">49. Lambda Expressions & Functional Interfaces</span>
              <span class="lesson-subtopics">Functional Programming · Lambda Syntax · @FunctionalInterface · Predicate/Consumer/Function/Supplier · Method References (::) · Constructor References · Effectively Final</span>
            </div>
          </div>
          <div class="lesson-row-right">
            <span class="lesson-btn">Read Chapter <span class="arrow">→</span></span>
          </div>
        </a>
      </div>
    </div>`;

  if (html.includes(targetRoadmap)) {
    html = html.replace(targetRoadmap, updatedRoadmap);
  }

  fs.writeFileSync(javaHomePath, html, 'utf8');
  console.log('✅ Updated public/blog-java.html with Phase 18 details!');
}

function run() {
  console.log('🚀 Building Java Phase 18: Lambda Expressions & Functional Interfaces...');
  buildJavaPhase18();
  updateBlogJavaHome();
  console.log('🎉 Java Phase 18 successfully created!');
}

run();
