const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'public');
const javaDir = path.join(baseDir, 'blog-java');

// 30 PHASES OF JAVA MASTERCLASS
const JAVA_30_PHASES = [
  {
    id: 'phase1',
    tag: 'Phase 01',
    title: 'Java Basics',
    icon: '☕',
    desc: 'What is Java?, WORA philosophy, features, industry applications, JDK/JRE/JVM architecture, compilation lifecycle, installation, IDEs, first Hello World program breakdown, program anatomy, and error types.',
    lessons: [
      { num: 1, file: '01-welcome-hello-world.html', title: '1. Welcome & Java Basics', subtopics: 'Java ante enti? · Features · Applications · JDK/JRE/JVM Architecture · Compilation Model · Setup · Hello World · Line Breakdown' },
      { num: 2, file: '02-java-setup-and-program-structure.html', title: '2. Program Structure & Errors', subtopics: 'Source File Anatomy · Class Rules · Comments (Single, Multi, Javadoc) · Naming Conventions · Syntax vs Runtime vs Logical Errors' }
    ]
  },
  {
    id: 'phase2',
    tag: 'Phase 02',
    title: 'Variables & Data Types',
    icon: '📦',
    desc: 'Variables, declaration vs initialization, 8 primitive types (int, long, float, double, char, boolean), String reference type, Stack vs Heap memory, constants (final), local vs instance vs static scope, type casting (widening & narrowing), var keyword, and naming rules.',
    lessons: [
      { num: 3, file: '03-variables-and-data-types.html', title: '3. Variables & Data Types', subtopics: 'Variables · Declaration vs Init · 8 Primitives · String · Stack vs Heap · Constants (final) · Local/Instance/Static · Widening/Narrowing · var Keyword · Naming Rules' }
    ]
  },
  {
    id: 'phase3',
    tag: 'Phase 03',
    title: 'Operators & Expressions',
    icon: '⚡',
    desc: 'Arithmetic, assignment, relational, logical (short-circuit), bitwise, unary, and ternary operators with precedence hierarchy.',
    lessons: [
      { num: 4, file: '04-operators-and-input.html', title: '4. Operators and Expressions', subtopics: 'Arithmetic · Relational · Logical & Short-Circuit · Bitwise · Compound Assignment · Precedence (BODMAS)' }
    ]
  },
  {
    id: 'phase4',
    tag: 'Phase 04',
    title: 'User Input & Scanner',
    icon: '⌨️',
    desc: 'Interactive console input using java.util.Scanner, reading primitives, reading lines, and handling newline buffer traps.',
    lessons: [
      { num: 5, file: '04-scanner-input.html', title: '5. User Input with Scanner', subtopics: 'Scanner Class · nextInt vs nextLine · Buffer Flushes · Input Validation · Interactive CLI Programs' }
    ]
  },
  {
    id: 'phase5',
    tag: 'Phase 05',
    title: 'Conditional Statements',
    icon: '🔀',
    desc: 'Decision making branching: if, if-else, nested conditions, ternary operator, classic switch, and modern Java 14+ arrow switch expressions.',
    lessons: [
      { num: 6, file: '05-conditions.html', title: '6. Conditional Branching (if & switch)', subtopics: 'if-else Chains · Ternary Expressions · Classic Switch · Java 14+ Arrow Switch · Pattern Matching' }
    ]
  },
  {
    id: 'phase6',
    tag: 'Phase 06',
    title: 'Loops and Iterations',
    icon: '🔁',
    desc: 'Iteration control: for loops, while loops, do-while loops, nested loops, infinite loops, and execution mechanics.',
    lessons: [
      { num: 7, file: '06-loops.html', title: '7. Loops & Control Flow', subtopics: 'for Loops · while Loops · do-while Loops · Nested Loop Matrices · Loop Performance' }
    ]
  },
  {
    id: 'phase7',
    tag: 'Phase 07',
    title: 'Jump Statements',
    icon: '⏭️',
    desc: 'Altering loop and method execution flow with break, continue, labeled break/continue, and return statements.',
    lessons: [
      { num: 8, file: '07-jump-statements.html', title: '8. Jump Statements (break & continue)', subtopics: 'break Keyword · continue Keyword · Labeled Jumps · Early return Patterns' }
    ]
  },
  {
    id: 'phase8',
    tag: 'Phase 08',
    title: 'Strings & StringBuilder',
    icon: '🧵',
    desc: 'String immutability, JVM String Constant Pool, .equals vs ==, string manipulation methods, StringBuilder, and StringBuffer.',
    lessons: [
      { num: 9, file: '07-strings.html', title: '9. Strings & String Pool', subtopics: 'Immutability · String Constant Pool · String Methods · StringBuilder · StringBuffer · Performance Benchmarks' }
    ]
  },
  {
    id: 'phase9',
    tag: 'Phase 09',
    title: 'Arrays (1D & Matrices)',
    icon: '📊',
    desc: 'Fixed-size contiguous memory data structures: 1D arrays, multi-dimensional 2D matrices, array traversal, and Arrays utility class.',
    lessons: [
      { num: 10, file: '08-arrays.html', title: '10. Arrays (1D & 2D Matrices)', subtopics: 'Array Allocation · Heap Memory · Traversal · 2D Matrices · Arrays Class · Copying & Sorting' }
    ]
  },
  {
    id: 'phase10',
    tag: 'Phase 10',
    title: 'Methods & Recursion',
    icon: '🧩',
    desc: 'Modular programming: method declaration, pass-by-value semantics, method overloading, variable arguments (...), and recursion call stack.',
    lessons: [
      { num: 11, file: '09-methods.html', title: '11. Methods & Parameters', subtopics: 'Method Signature · Pass-by-Value · Overloading · Varargs (...) · Call Stack & Recursion' }
    ]
  },
  {
    id: 'phase11',
    tag: 'Phase 11',
    title: 'Classes & Objects (OOP)',
    icon: '🏗️',
    desc: 'Object-Oriented Programming foundations: class blueprints, object instances, new keyword, heap memory allocation, and this keyword.',
    lessons: [
      { num: 12, file: '10-classes-and-objects.html', title: '12. Classes & Objects (OOP Core)', subtopics: 'OOP Philosophy · Class vs Object · Instantiation (new) · Heap Layout · this Keyword' }
    ]
  },
  {
    id: 'phase12',
    tag: 'Phase 12',
    title: 'Constructors',
    icon: '🛠️',
    desc: 'Object lifecycle initialization: default constructors, parameterized constructors, constructor overloading, and chaining with this().',
    lessons: [
      { num: 13, file: '11-constructors-and-encapsulation.html', title: '13. Constructors & Initialization', subtopics: 'Default vs Parameterized · Constructor Overloading · Constructor Chaining (this()) · Copy Constructors' }
    ]
  },
  {
    id: 'phase13',
    tag: 'Phase 13',
    title: 'Encapsulation & Access Modifiers',
    icon: '🔒',
    desc: 'Data hiding: public, private, protected, default package-private access modifiers, getter/setter methods, and JavaBeans standards.',
    lessons: [
      { num: 14, file: '13-encapsulation.html', title: '14. Encapsulation & Access Control', subtopics: 'Data Hiding · Access Modifiers (public/private/protected) · Getters & Setters · Immutable Objects' }
    ]
  },
  {
    id: 'phase14',
    tag: 'Phase 14',
    title: 'Inheritance & super Keyword',
    icon: '🧬',
    desc: 'Code reuse hierarchy: extends keyword, IS-A relationship, single vs multilevel inheritance, super keyword, and constructor chaining.',
    lessons: [
      { num: 15, file: '12-inheritance-and-polymorphism.html', title: '15. Inheritance & Code Reuse', subtopics: 'extends Keyword · IS-A Relationship · super Keyword · super() Constructor Call · Object Base Class' }
    ]
  },
  {
    id: 'phase15',
    tag: 'Phase 15',
    title: 'Polymorphism',
    icon: '🎭',
    desc: 'Compile-time polymorphism (Method Overloading) vs Runtime dynamic method dispatch (Method Overriding with @Override), and upcasting/downcasting.',
    lessons: [
      { num: 16, file: '15-polymorphism.html', title: '16. Polymorphism & Method Overriding', subtopics: 'Method Overriding (@Override) · Dynamic Method Dispatch · Upcasting & Downcasting · instanceof' }
    ]
  },
  {
    id: 'phase16',
    tag: 'Phase 16',
    title: 'Abstraction & Abstract Classes',
    icon: '📐',
    desc: 'Hiding implementation complexity: abstract classes, abstract methods, partial abstraction, and concrete subclass contracts.',
    lessons: [
      { num: 17, file: '13-abstraction-and-interfaces.html', title: '17. Abstraction & Abstract Classes', subtopics: 'abstract Keyword · Abstract Methods · Partial Implementation · Template Design Pattern' }
    ]
  },
  {
    id: 'phase17',
    tag: 'Phase 17',
    title: 'Interfaces',
    icon: '🔌',
    desc: '100% pure contracts: implements keyword, multiple inheritance, default methods, static methods, and private interface methods.',
    lessons: [
      { num: 18, file: '17-interfaces.html', title: '18. Interfaces & Multiple Inheritance', subtopics: 'implements Keyword · Multiple Interface Inheritance · default Methods · static Methods · Functional Interfaces' }
    ]
  },
  {
    id: 'phase18',
    tag: 'Phase 18',
    title: 'Packages & static Keyword',
    icon: '📦',
    desc: 'Modular namespaces, import statements, static variables, static methods, static blocks, and static nested classes.',
    lessons: [
      { num: 19, file: '18-packages-and-static.html', title: '19. Packages & static Keyword', subtopics: 'package & import · static Variables & Methods · static Initializer Blocks · Class Loading' }
    ]
  },
  {
    id: 'phase19',
    tag: 'Phase 19',
    title: 'Exception Handling',
    icon: '🛡️',
    desc: 'Robust error recovery: Throwable hierarchy, Checked vs Unchecked exceptions, try-catch-finally, throw, throws, and custom exceptions.',
    lessons: [
      { num: 20, file: '14-exception-handling.html', title: '20. Exception Handling & try-catch', subtopics: 'Checked vs Unchecked · try-catch-finally · throw vs throws · Custom Exceptions · Best Practices' }
    ]
  },
  {
    id: 'phase20',
    tag: 'Phase 20',
    title: 'File Handling (I/O & NIO)',
    icon: '📁',
    desc: 'Working with files and streams: FileReader, BufferedReader, FileWriter, try-with-resources, and modern java.nio.file.Files API.',
    lessons: [
      { num: 21, file: '15-file-handling.html', title: '21. File Handling (java.io & java.nio)', subtopics: 'BufferedReader & FileWriter · try-with-resources · java.nio.file.Files & Path · Serialization' }
    ]
  },
  {
    id: 'phase21',
    tag: 'Phase 21',
    title: 'Wrapper Classes & Autoboxing',
    icon: '🎁',
    desc: 'Object representation of primitives: Integer, Double, Boolean, Autoboxing, Unboxing, and parseInt/valueOf utility methods.',
    lessons: [
      { num: 22, file: '21-wrapper-classes.html', title: '22. Wrapper Classes & Autoboxing', subtopics: 'Primitive to Object · Autoboxing & Unboxing · Integer Cache Trap · Parsing Methods' }
    ]
  },
  {
    id: 'phase22',
    tag: 'Phase 22',
    title: 'Generics & Type Safety',
    icon: '🏷️',
    desc: 'Compile-time type safety: Generic classes `<T>`, Generic methods, bounded type parameters (`<T extends Number>`), and wildcards (`<?>`).',
    lessons: [
      { num: 23, file: '17-generics.html', title: '23. Generics & Type Safety', subtopics: 'Generic Classes & Methods · Bounded Types · Wildcards (?) · Type Erasure' }
    ]
  },
  {
    id: 'phase23',
    tag: 'Phase 23',
    title: 'Java Collections Framework',
    icon: '📚',
    desc: 'Comprehensive data structures: List (ArrayList, LinkedList), Set (HashSet, TreeSet), Queue/Deque, Map (HashMap, TreeMap), and Iterators.',
    lessons: [
      { num: 24, file: '16-collections.html', title: '24. Collections Framework', subtopics: 'ArrayList vs LinkedList · HashSet vs TreeSet · HashMap Internals · Iterators & Sorting' }
    ]
  },
  {
    id: 'phase24',
    tag: 'Phase 24',
    title: 'Lambda Expressions',
    icon: '⚡',
    desc: 'Functional programming in Java 8+: @FunctionalInterface, lambda syntax `(params) -> expression`, Predicate, Function, Consumer, and Method References `::`.',
    lessons: [
      { num: 25, file: '18-lambda-expressions.html', title: '25. Lambda Expressions & Functional Interfaces', subtopics: 'Lambda Syntax · @FunctionalInterface · Predicate/Function/Consumer · Method References (::)' }
    ]
  },
  {
    id: 'phase25',
    tag: 'Phase 25',
    title: 'Stream API & Pipelines',
    icon: '🌊',
    desc: 'Declarative data processing: filter, map, flatMap, reduce, collect, groupingBy, IntStream, lazy evaluation, and parallel streams.',
    lessons: [
      { num: 26, file: '19-stream-api.html', title: '26. Stream API & Data Pipelines', subtopics: 'filter · map · reduce · collect (groupingBy) · IntStream · Parallel Streams' }
    ]
  },
  {
    id: 'phase26',
    tag: 'Phase 26',
    title: 'Date and Time (java.time)',
    icon: '⏱️',
    desc: 'Modern immutable date and time: LocalDate, LocalTime, LocalDateTime, Period, Duration, ZonedDateTime, and DateTimeFormatter.',
    lessons: [
      { num: 27, file: '20-date-and-time.html', title: '27. Date & Time API (java.time)', subtopics: 'LocalDate & LocalTime · Period & Duration · ZonedDateTime · DateTimeFormatter' }
    ]
  },
  {
    id: 'phase27',
    tag: 'Phase 27',
    title: 'Multithreading & Concurrency',
    icon: '🧵',
    desc: 'Concurrent execution: Thread class, Runnable, synchronized blocks, volatile keyword, locks, and ExecutorService thread pools.',
    lessons: [
      { num: 28, file: '21-multithreading.html', title: '28. Multithreading & Concurrency', subtopics: 'Thread & Runnable · Thread Lifecycle · synchronized · volatile · ExecutorService Pools' }
    ]
  },
  {
    id: 'phase28',
    tag: 'Phase 28',
    title: 'JDBC & Database Connectivity',
    icon: '💾',
    desc: 'Relational database connectivity: DriverManager, Connection, Statement, PreparedStatement, SQL injection prevention, and ResultSet.',
    lessons: [
      { num: 29, file: '23-jdbc-and-databases.html', title: '29. JDBC & Database Connectivity', subtopics: 'DriverManager · Connection · PreparedStatement (Safe SQL) · ResultSet Processing · Transactions' }
    ]
  },
  {
    id: 'phase29',
    tag: 'Phase 29',
    title: 'Maven & Spring Boot Basics',
    icon: '🍃',
    desc: 'Enterprise ecosystems: Maven pom.xml dependency management, Spring Boot architecture, @SpringBootApplication, and @RestController APIs.',
    lessons: [
      { num: 30, file: '25-spring-boot-basics.html', title: '30. Maven & Spring Boot Basics', subtopics: 'Maven pom.xml · Spring Boot Architecture · @RestController · Dependency Injection' }
    ]
  },
  {
    id: 'phase30',
    tag: 'Phase 30',
    title: 'Projects & Interview Prep',
    icon: '🎯',
    desc: 'Real-world full-stack Java projects, Banking CLI simulation, RESTful APIs, and Top 50 Java Technical Interview Q&A with deep explanations.',
    lessons: [
      { num: 31, file: '26-java-projects.html', title: '31. Real-World Java Projects', subtopics: 'Student Management CLI · Banking System OOP Simulation · RESTful API Capstone' },
      { num: 32, file: '27-interview-preparation.html', title: '32. Java Technical Interview Q&A', subtopics: 'Top 50 Core Java Questions · Memory Model (Heap vs Stack) · Garbage Collection · Coding Problems' }
    ]
  }
];

// Flatten all lessons
const ALL_JAVA_LESSONS = [];
JAVA_30_PHASES.forEach(p => {
  p.lessons.forEach(l => {
    l.phaseId = p.id;
    l.phaseTag = p.tag;
    l.phaseTitle = p.title;
    ALL_JAVA_LESSONS.push(l);
  });
});

console.log(`Total Java Phases: ${JAVA_30_PHASES.length}, Total Lessons: ${ALL_JAVA_LESSONS.length}`);

// Generate Accordion Sidebar HTML
function generateJavaAccordionSidebar(currentFile = null) {
  let html = `    <div class="sidebar-accordion">\n`;

  JAVA_30_PHASES.forEach(phase => {
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

// ── BUILD LESSON 3: Variables & Data Types (Phase 2 Masterclass) ───────────
function buildLesson3() {
  const title = "Variables and Data Types";
  const desc = "Comprehensive guide to Java Variables and Data Types: Variables ante enti, declaration vs initialization, 8 primitives (int, long, float, double, char, boolean), String reference type, constants (final), local vs instance vs static scope, widening/narrowing type casting, var keyword, and naming rules.";
  const filename = "03-variables-and-data-types.html";

  const content = `
    <div class="breadcrumb">
      <a href="/">Home</a><span class="sep">›</span>
      <a href="/blog.html">Tutorials</a><span class="sep">›</span>
      <a href="/blog-java.html">Java</a><span class="sep">›</span>
      <span class="current">Lesson 3: Variables and Data Types</span>
    </div>

    <h1 class="page-title">Java Variables & Data Types Masterclass</h1>

    <div class="page-meta">
      <span class="badge">☕ Java 21+ LTS</span>
      <span class="badge">🟢 Lesson 3</span>
      <span class="badge">📂 Phase 02: Variables & Data Types</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <!-- Subtopics Pill Bar -->
    <div style="background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 16px; margin-bottom:24px; font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
      <span style="color:#f0a500; font-weight:700;">📌 Covered in this lesson (22 Topics):</span>
      <span>Variables · Declaration · Initialization · Difference · int · long · float · double · char · boolean · String · Primitives · Reference Types · Constants (final) · Local vs Instance vs Static · Type Casting (Widening & Narrowing) · var Keyword · Java Naming Rules</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Phase 2: Variables and Data Types</strong>! In Java, data is at the core of every algorithm and business application. Because Java is a <strong>statically-typed</strong> language, every single piece of data must have a strictly declared type before it can be stored in computer memory (RAM). In this masterclass chapter, we will break down all 22 topics covering variable mechanics, all 8 primitive types, String reference objects, memory architectures (Stack vs Heap vs Metaspace), variable scopes, type conversions, the modern <code>var</code> keyword, and industry naming standards.</p>
    </div>

    <!-- TOPIC 1 & 2 & 3 & 4: Variables, Declaration, Initialization -->
    <div class="section-title"><span class="num">1</span>Variables Ante Enti? (Declaration vs Initialization)</div>
    <div class="section-body">
      <p><strong>Variable</strong> anedhi computer memory (RAM) lo data ni store cheyyadaniki allocate chese oka <strong>Named Storage Location (Memory Container)</strong>. Program run ayye time lo ee container lo unna value ni manam change (vary) cheyagalam kabatti dheenini <em>Variable</em> antaru.</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #58a6ff; border-radius:8px; padding:16px;">
          <strong style="color:#58a6ff; font-size:14.5px;">1. Variable Declaration</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0;">Compiler ki variable peru mariyu adhi ye type data store chesthundho cheppadam. Memory space allocate avthundhi kaani value assign avvadu.</p>
          <code style="display:block; margin-top:8px;">int age; // Declared, no value yet</code>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950; font-size:14.5px;">2. Variable Initialization</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0;">Already declare chesina variable loki modatisariga value ni assign cheyyadam (using assignment operator <code>=</code>).</p>
          <code style="display:block; margin-top:8px;">age = 24; // Initialized with value 24</code>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Declaration & Initialization</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // Step 1: Declaration only
        int studentId;

        // Step 2: Initialization
        studentId = 101;

        // Combined: Declaration + Initialization in a single line
        String studentName = "Balaji Nayak";
        double gpa = 9.45;

        System.out.println("ID: " + studentId);
        System.out.println("Name: " + studentName);
        System.out.println("GPA: " + gpa);
    }
}</code></pre>
      </div>

      <div class="callout">
        <div class="callout-title">⚠️ Crucial Java Rule: Local Variable Uninitialized Error</div>
        <p>Java lo methods lopala declare chese <strong>Local Variables</strong> ki automatic default values undavu! Meeru initialize cheyyakunda print cheyyadaniki try chesthe, compiler direct ga error isthundi:</p>
        <div style="background:#0d1117; color:#ff7b72; padding:10px 14px; border-radius:6px; margin-top:6px; font-family:'JetBrains Mono',monospace; font-size:12.5px;">
          error: variable x might not have been initialized
        </div>
      </div>
    </div>

    <!-- TOPIC 5 - 11: ALL 8 PRIMITIVE DATA TYPES + STRING -->
    <div class="section-title"><span class="num">2</span>Java Primitive Data Types (int, long, float, double, char, boolean) & String</div>
    <div class="section-body">
      <p>Java lo data types ni 2 broad categories ga vibhajincharu: <strong>1. Primitive Data Types</strong> (8 types) mariyu <strong>2. Reference / Non-Primitive Data Types</strong> (String, Arrays, Classes):</p>

      <table class="tbl">
        <tr><th>Data Type</th><th>Size</th><th>Default Value</th><th>Range / Description</th><th>Code Example</th></tr>
        <tr>
          <td><code>byte</code></td>
          <td>1 Byte (8-bit)</td>
          <td><code>0</code></td>
          <td>-128 to 127</td>
          <td><code>byte b = 100;</code></td>
        </tr>
        <tr>
          <td><code>short</code></td>
          <td>2 Bytes (16-bit)</td>
          <td><code>0</code></td>
          <td>-32,768 to 32,767</td>
          <td><code>short s = 5000;</code></td>
        </tr>
        <tr>
          <td><code>int</code></td>
          <td>4 Bytes (32-bit)</td>
          <td><code>0</code></td>
          <td>-2,147,483,648 to +2,147,483,647 (Most popular integer)</td>
          <td><code>int score = 95000;</code></td>
        </tr>
        <tr>
          <td><code>long</code></td>
          <td>8 Bytes (64-bit)</td>
          <td><code>0L</code></td>
          <td>-9 quintillion to +9 quintillion (Requires <code>L</code> suffix)</td>
          <td><code>long views = 8500000000L;</code></td>
        </tr>
        <tr>
          <td><code>float</code></td>
          <td>4 Bytes (32-bit)</td>
          <td><code>0.0f</code></td>
          <td>6-7 decimal digits precision (Requires <code>f</code> or <code>F</code> suffix)</td>
          <td><code>float temp = 36.6f;</code></td>
        </tr>
        <tr>
          <td><code>double</code></td>
          <td>8 Bytes (64-bit)</td>
          <td><code>0.0d</code></td>
          <td>15-16 decimal digits precision (Default for decimals)</td>
          <td><code>double price = 99.99;</code></td>
        </tr>
        <tr>
          <td><code>char</code></td>
          <td>2 Bytes (16-bit)</td>
          <td><code>'\\u0000'</code></td>
          <td>0 to 65,535 (Unicode single character in single quotes)</td>
          <td><code>char grade = 'A';</code></td>
        </tr>
        <tr>
          <td><code>boolean</code></td>
          <td>1-bit logical</td>
          <td><code>false</code></td>
          <td>Strictly <code>true</code> or <code>false</code> (NOT 0 or 1)</td>
          <td><code>boolean isEnrolled = true;</code></td>
        </tr>
        <tr>
          <td><strong>String</strong> <em>(Reference)</em></td>
          <td>Variable Heap</td>
          <td><code>null</code></td>
          <td>Immutable character sequence in double quotes</td>
          <td><code>String city = "Hyderabad";</code></td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Data Types In Action</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // Integer types
        byte userAge = 22;
        short roomNumber = 405;
        int employeeId = 589412;
        long globalPopulation = 8045311447L; // Note the 'L' suffix

        // Floating point types
        float rating = 4.85f;               // Note the 'f' suffix
        double precisePi = 3.141592653589793;

        // Character & Boolean
        char bloodGroup = 'O';
        char teluguLetter = '\\u0C05';        // Unicode for Telugu 'అ'
        boolean isJavaAwesome = true;

        // Reference String type
        String message = "Hello from Java 21!";

        System.out.println("Employee ID: " + employeeId);
        System.out.println("Global Population: " + globalPopulation);
        System.out.println("Rating: " + rating + " | Pi: " + precisePi);
        System.out.println("Blood Group: " + bloodGroup + " | Letter: " + teluguLetter);
        System.out.println("Is Java Awesome? " + isJavaAwesome);
        System.out.println("String: " + message);
    }
}</code></pre>
      </div>

      <div style="background:var(--bg2); border:1px solid var(--border); border-radius:8px; padding:16px; margin:16px 0;">
        <strong style="color:#f0a500; font-size:14px;">💡 Pro-Tip: Number Literals with Underscores (Java 7+)</strong>
        <p style="font-size:13px; color:var(--text2); margin:6px 0 0;">Pedda numbers rasetappudu readable ga undadaniki Java lo underscores <code>_</code> vadukovachu. Compiler vatini automatically ignore chesthundi:</p>
        <code style="display:block; margin-top:6px;">int creditCard = 1234_5678_9012_3456; // Exact same as 1234567890123456</code>
      </div>
    </div>

    <!-- TOPIC 12 & 13: Primitive vs Reference Types (Stack vs Heap) -->
    <div class="section-title"><span class="num">3</span>Primitive vs Reference Data Types (Stack vs Heap Memory Model)</div>
    <div class="section-body">
      <p>Java lo data types memory lo ela store avthayo thelusukovatam chala mukhyam:</p>

      <div style="background:#0d1117; border:1px solid #30363d; border-radius:10px; padding:20px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:#f0a500; margin:18px 0; overflow-x:auto;">
┌──────────────────────────────────────┐        ┌──────────────────────────────────────┐
│             STACK MEMORY             │        │              HEAP MEMORY             │
│  (Fast, stores primitives & pointers)│        │   (Stores actual Objects & Strings)  │
├──────────────────────────────────────┤        ├──────────────────────────────────────┤
│  int age = 24;      [Direct Value]   │        │                                      │
│  double gpa = 9.45; [Direct Value]   │        │                                      │
│  boolean isPass = true;              │        │                                      │
│                                      │        │   ┌───────────────────────────────┐  │
│  String name  ──────(Reference)──────┼───────>│   │  "Balaji Nayak" (String Pool) │  │
│  int[] scores ──────(Reference)──────┼───────>│   │  [98, 95, 92] (Array Object)  │  │
│                                      │        │   └───────────────────────────────┘  │
└──────────────────────────────────────┘        └──────────────────────────────────────┘
      </div>

      <table class="tbl">
        <tr><th>Feature</th><th>Primitive Data Types</th><th>Reference Data Types</th></tr>
        <tr>
          <td><strong>Count & Types</strong></td>
          <td>Exactly 8 types (byte, short, int, long, float, double, char, boolean)</td>
          <td>Unlimited (Strings, Arrays, Classes, Interfaces, Enums)</td>
        </tr>
        <tr>
          <td><strong>Where Stored?</strong></td>
          <td>Stored directly in <strong>Stack Memory</strong> with actual values.</td>
          <td>Objects are created in <strong>Heap Memory</strong>, Stack holds the memory address.</td>
        </tr>
        <tr>
          <td><strong>Default Value</strong></td>
          <td>Fixed (0, 0.0, false, '\u0000')</td>
          <td><code>null</code> (if not pointing to any object)</td>
        </tr>
        <tr>
          <td><strong>Methods Availability</strong></td>
          <td>No methods (cannot call <code>age.toString()</code>)</td>
          <td>Has rich methods (e.g. <code>name.toUpperCase()</code>, <code>name.length()</code>)</td>
        </tr>
      </table>
    </div>

    <!-- TOPIC 14: Constants using final -->
    <div class="section-title"><span class="num">4</span>Constants in Java using final Keyword</div>
    <div class="section-body">
      <p>Oka variable yokka value ni program lo eppudu <strong>change cheyyakunda lock</strong> cheyyadaniki <code>final</code> keyword vadathamu. Final variable ni okasari initialize chesinathvaratha malli reassign cheyyalemu:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Final Constants</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        final double PI = 3.14159265359;
        final int MAX_LOGIN_ATTEMPTS = 3;
        final String APP_NAME = "Our Compiler";

        System.out.println("App: " + APP_NAME);
        System.out.println("Max Attempts: " + MAX_LOGIN_ATTEMPTS);

        // UNCOMMENTING THE LINE BELOW CAUSES A COMPILATION ERROR:
        // MAX_LOGIN_ATTEMPTS = 5; // error: cannot assign a value to final variable
    }
}</code></pre>
      </div>
    </div>

    <!-- TOPIC 15, 16, 17: Local vs Instance vs Static Variables -->
    <div class="section-title"><span class="num">5</span>Variable Scopes: Local vs Instance vs Static Variables</div>
    <div class="section-body">
      <p>Java lo variable declare chesina location ni batti 3 main scopes untayi:</p>

      <table class="tbl">
        <tr><th>Variable Type</th><th>Where is it declared?</th><th>Memory Location</th><th>Lifecycle</th><th>Default Value?</th></tr>
        <tr>
          <td><strong>1. Local Variable</strong></td>
          <td>Inside method / constructor / block <code>{ }</code></td>
          <td>Stack Memory</td>
          <td>Created on method call, destroyed on method return.</td>
          <td>❌ <strong>No</strong> (Must be initialized manually)</td>
        </tr>
        <tr>
          <td><strong>2. Instance Variable</strong></td>
          <td>Inside class, outside methods (without <code>static</code>)</td>
          <td>Heap Memory (Inside Object)</td>
          <td>Created with <code>new Object()</code>, destroyed when garbage collected.</td>
          <td>✅ <strong>Yes</strong> (0, 0.0, false, null)</td>
        </tr>
        <tr>
          <td><strong>3. Static Variable</strong></td>
          <td>Inside class with <code>static</code> keyword</td>
          <td>Metaspace / Method Area</td>
          <td>Created when Class loads, single shared copy for all objects.</td>
          <td>✅ <strong>Yes</strong> (0, 0.0, false, null)</td>
        </tr>
      </table>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Local vs Instance vs Static</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    // 1. Static variable: Shared by all students
    static String collegeName = "Hyderabad Institute of Tech";

    // 2. Instance variable: Unique copy for each object
    String studentName;
    int rollNumber;

    public void displayStudent() {
        // 3. Local variable: Exists only inside this method
        int currentYear = 2026;
        System.out.println(studentName + " (Roll " + rollNumber + ") - " + collegeName + " [" + currentYear + "]");
    }

    public static void main(String[] args) {
        Main s1 = new Main();
        s1.studentName = "Balaji";
        s1.rollNumber = 101;

        Main s2 = new Main();
        s2.studentName = "Kalyan";
        s2.rollNumber = 102;

        s1.displayStudent();
        s2.displayStudent();
    }
}</code></pre>
      </div>
    </div>

    <!-- TOPIC 18, 19, 20: Type Casting (Widening & Narrowing) -->
    <div class="section-title"><span class="num">6</span>Type Casting (Widening vs Narrowing Conversion)</div>
    <div class="section-body">
      <p>Oka data type value ni maroka compatible data type loki convert cheyyadanni <strong>Type Casting</strong> antaru. Dheenilo 2 types untayi:</p>

      <div style="background:#0d1117; border:1px solid #30363d; border-radius:10px; padding:18px; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:#3fb950; margin:16px 0; overflow-x:auto;">
Widening (Implicit - Automatic & Safe):
byte ──> short ──> int ──> long ──> float ──> double
                  (char ──> int)

Narrowing (Explicit - Manual Casting with (type) - Risk of data loss!):
double ──> float ──> long ──> int ──> short ──> byte
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950; font-size:14.5px;">1. Widening Casting (Implicit)</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0;">Chinna type nunchi pedda type loki convert avvadam. Elanti data loss jaragadu kabatti Java compiler automatically chesthundi.</p>
          <code style="display:block; margin-top:6px;">int num = 50;<br>double d = num; // d becomes 50.0</code>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:16px;">
          <strong style="color:#ff7b72; font-size:14.5px;">2. Narrowing Casting (Explicit)</strong>
          <p style="font-size:13px; color:var(--text2); margin:6px 0;">Pedda type nunchi chinna type loki convert avvadam. Decimals truncate avthayi or overflow jaruguthundi, kabatti <code>(type)</code> syntax mandatory.</p>
          <code style="display:block; margin-top:6px;">double d = 99.85;<br>int x = (int) d; // x becomes 99 (0.85 lost!)</code>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — Type Casting Demo</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // 1. Widening Conversion (int -> double)
        int marks = 95;
        double decimalMarks = marks; // Automatic
        System.out.println("Widening: " + marks + " -> " + decimalMarks);

        // 2. Narrowing Conversion (double -> int)
        double productPrice = 599.99;
        int roundedPrice = (int) productPrice; // Manual (0.99 truncated)
        System.out.println("Narrowing: " + productPrice + " -> " + roundedPrice);

        // 3. Character to ASCII integer
        char ch = 'A';
        int asciiVal = ch; // Widening (65)
        System.out.println("Character '" + ch + "' ASCII code: " + asciiVal);

        // 4. Overflow trap in Narrowing
        int bigNumber = 130;
        byte smallByte = (byte) bigNumber; // byte max is 127, overflows to -126
        System.out.println("Byte Overflow (130 -> byte): " + smallByte);
    }
}</code></pre>
      </div>
    </div>

    <!-- TOPIC 21: var Keyword (Type Inference) -->
    <div class="section-title"><span class="num">7</span>The var Keyword (Local Variable Type Inference — Java 10+)</div>
    <div class="section-body">
      <p>Java 10 nunchi <code>var</code> keyword introduce chesaru. Dheeni valana data type ni explicit ga rayakunda, compiler assign chesina value ni batti <strong>compile-time lo type ni automatically infer</strong> chesthundi:</p>

      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java — var Keyword</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // Compiler automatically infers types:
        var name = "Balaji";         // Inferred as String
        var age = 24;                // Inferred as int
        var salary = 75000.50;       // Inferred as double
        var isWorking = true;        // Inferred as boolean

        System.out.println(name + " | Age: " + age + " | Salary: Rs." + salary);

        // NOTE: Java is STILL statically typed!
        // You cannot assign a string to an integer var later:
        // age = "Twenty Four"; // COMPILATION ERROR!
    }
}</code></pre>
      </div>

      <div class="callout">
        <div class="callout-title">⚠️ Rules Where 'var' CANNOT Be Used:</div>
        <ul style="margin:8px 0 0 18px; color:var(--text2); line-height:1.7; font-size:13.5px;">
          <li>Cannot be used for <strong>class fields / instance variables</strong> (only for local variables).</li>
          <li>Cannot be used without an immediate value: <code>var x;</code> is illegal.</li>
          <li>Cannot initialize with <code>null</code>: <code>var x = null;</code> is illegal.</li>
          <li>Cannot be used as <strong>method parameters</strong> or <strong>method return types</strong>.</li>
        </ul>
      </div>
    </div>

    <!-- TOPIC 22: Java Naming Rules for Identifiers -->
    <div class="section-title"><span class="num">8</span>Java Identifier Naming Rules & Conventions</div>
    <div class="section-body">
      <p>Java lo variables, methods, and classes ki perulu pettadaniki strict grammar rules unnaayi:</p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin:16px 0;">
        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #3fb950; border-radius:8px; padding:16px;">
          <strong style="color:#3fb950;">✅ Allowed Rules:</strong>
          <ul style="margin:6px 0 0 18px; font-size:13px; color:var(--text2); line-height:1.6;">
            <li>Letters (<code>a-z</code>, <code>A-Z</code>), Digits (<code>0-9</code>), <code>$</code>, and <code>_</code> vadukovachu.</li>
            <li>Case-sensitive (<code>total</code>, <code>Total</code>, <code>TOTAL</code> are different).</li>
            <li>Variables should use <strong>camelCase</strong> (e.g. <code>studentAge</code>, <code>accountBalance</code>).</li>
          </ul>
        </div>

        <div style="background:var(--bg2); border:1px solid var(--border); border-left:4px solid #ff7b72; border-radius:8px; padding:16px;">
          <strong style="color:#ff7b72;">❌ Illegal & Forbidden:</strong>
          <ul style="margin:6px 0 0 18px; font-size:13px; color:var(--text2); line-height:1.6;">
            <li>Digit tho start avvakudadhu (e.g. <code>1stStudent</code> is illegal).</li>
            <li>Reserved keywords vadakudadhu (e.g. <code>int class = 5;</code> is illegal).</li>
            <li>Spaces or special symbols (<code>@</code>, <code>#</code>, <code>%</code>, <code>-</code>) allow cheyadhu.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- TRY IT YOURSELF: Practice Challenge -->
    <div class="try-box">
      <div class="try-title">💻 Try It Yourself — Variables & Type Casting Challenge</div>
      <p style="color:var(--text2); font-size:14px; margin-bottom:12px;">Run and inspect this complete program that calculates an employee's gross monthly salary with allowances, tax deductions, and type conversions:</p>
      
      <div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">Java Salary Calculator</span>
          <a class="try-btn" href="/online-java-compiler.html">▶ Run Code</a>
        </div>
        <pre><code>public class Main {
    public static void main(String[] args) {
        // Employee details using various data types
        final String COMPANY_NAME = "TechCorp Global";
        int employeeId = 10842;
        String employeeName = "Balaji Nayak";
        char performanceGrade = 'A';
        boolean isFullTime = true;

        // Salary components
        double basicSalary = 65000.00;
        double hraPercentage = 20.0;    // 20% HRA
        double taxPercentage = 10.0;   // 10% Tax

        // Calculations
        double hraAmount = (basicSalary * hraPercentage) / 100.0;
        double grossSalary = basicSalary + hraAmount;
        double taxDeduction = (grossSalary * taxPercentage) / 100.0;
        double netPayableSalary = grossSalary - taxDeduction;

        // Narrowing casting to integer payout rupees
        int takeHomeRupees = (int) netPayableSalary;

        System.out.println("=========================================");
        System.out.println("🏢 " + COMPANY_NAME + " - SALARY SLIP");
        System.out.println("=========================================");
        System.out.println("Employee ID: " + employeeId + " | Name: " + employeeName);
        System.out.println("Grade: " + performanceGrade + " | FullTime: " + isFullTime);
        System.out.println("Basic Pay: Rs." + basicSalary);
        System.out.println("HRA: Rs." + hraAmount);
        System.out.println("Gross Salary: Rs." + grossSalary);
        System.out.println("Tax Deduction: Rs." + taxDeduction);
        System.out.println("-----------------------------------------");
        System.out.println("Net Take-Home Pay (Exact): Rs." + netPayableSalary);
        System.out.println("Net Take-Home Pay (Rounded): Rs." + takeHomeRupees);
        System.out.println("=========================================");
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

  // Write file
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Java Tutorial | Our Compiler</title>
  <meta name="description" content="${desc}" />
  <meta name="keywords" content="java variables, java data types, primitive types, type casting, java var, java constants final, widening narrowing java" />
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

${generateJavaAccordionSidebar(filename)}

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
${content}
    <div class="nav-footer">
      <a href="02-java-setup-and-program-structure.html" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">2. Program Structure & Errors</span>
      </a>
      <a href="04-operators-and-input.html" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">4. Operators and Expressions</span>
      </a>
    </div>
  </main>
</div>

  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(javaDir, filename), fullHtml, 'utf8');
  console.log(`✅ Successfully generated Phase 2 Masterclass: ${filename}`);
}

// ── UPDATE blog-java.html HOME PAGE WITH 30 PHASES ────────────────────────
function buildBlogJavaHome30Phases() {
  const accordionSidebar = generateJavaAccordionSidebar(null);

  let roadmapCardsHtml = '';
  JAVA_30_PHASES.forEach(phase => {
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
  <meta name="description" content="Master Java from complete beginner to advanced enterprise level with our 30 in-depth phases, collapsible roadmap, live code execution, Spring Boot, and interview prep." />
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
      <span class="badge">🟢 30 Masterclass Phases</span>
      <span class="badge">📂 Collapsible Interactive Roadmap (30 Phases)</span>
      <span class="badge">📅 2026 Edition</span>
    </div>

    <div class="intro-box">
      <p>Welcome to <strong>Our Compiler's Java Master Course</strong>. Java is an exceptionally robust, class-based, object-oriented programming language designed around the philosophy of <em>"Write Once, Run Anywhere" (WORA)</em>. Built by Sun Microsystems in 1995 and maintained by Oracle, Java powers millions of enterprise backends, cloud microservices, Android mobile applications, and big data systems. Each phase in this masterclass combines interconnected topics into a thorough, hands-on learning experience with live runnable code examples.</p>
    </div>

    <!-- Quick Start Card -->
    <div style="background: linear-gradient(135deg, rgba(240, 165, 0, 0.12), rgba(20, 24, 32, 0.6)); border: 1px solid rgba(240, 165, 0, 0.3); border-radius: 12px; padding: 24px; margin: 28px 0;">
      <h3 style="color:#f0a500; margin-bottom: 10px; font-size:18px;">🎯 Ready to Start Learning Java?</h3>
      <p style="color:var(--text2); margin-bottom: 16px; font-size:14.5px;">Choose where to start: explore foundations, variables & types, control flow, object-oriented programming (OOP), collections, streams, concurrency, or enterprise Spring Boot & interview skills:</p>
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        <a href="/blog-java/01-welcome-hello-world.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 1: Basics →</a>
        <a href="/blog-java/03-variables-and-data-types.html" style="background:linear-gradient(135deg, #f0a500, #d97706); color:#121212; font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 2: Variables & Types →</a>
        <a href="/blog-java/04-operators-and-input.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 3: Operators →</a>
        <a href="/blog-java/05-conditions.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 5: Conditionals →</a>
        <a href="/blog-java/10-classes-and-objects.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 11: OOP Core →</a>
        <a href="/blog-java/14-exception-handling.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 19: Exceptions →</a>
        <a href="/blog-java/16-collections.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 23: Collections →</a>
        <a href="/blog-java/25-spring-boot-basics.html" style="background:var(--bg3); border:1px solid var(--border); color:var(--text); font-weight:700; padding:10px 16px; border-radius:8px; text-decoration:none;">Phase 29: Spring Boot →</a>
      </div>
    </div>

    <!-- Full Curriculum Roadmap Cards -->
    <div class="section-title"><span class="num">📚</span> 30-Phase Complete Java Curriculum Roadmap</div>
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
  console.log('✅ Updated public/blog-java.html with 30-Phase Roadmap');
}

// ── UPDATE ALL LESSONS SIDEBAR TO 30 PHASES ────────────────────────────────
function updateAllLessonsSidebar30Phases() {
  const files = fs.readdirSync(javaDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(javaDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace the sidebar accordion
    const accordionHtml = generateJavaAccordionSidebar(file);
    html = html.replace(/<div class="sidebar-accordion">[\s\S]*?<\/div>\s*<\/aside>/i, `${accordionHtml}\n  </aside>`);

    fs.writeFileSync(filePath, html, 'utf8');
  });
  console.log(`✅ Updated sidebar across all ${files.length} lesson files to 30-Phase Accordion!`);
}

function run() {
  console.log('🚀 Building 30-Phase Java Curriculum & Phase 2 Masterclass...');
  buildLesson3();
  buildBlogJavaHome30Phases();
  updateAllLessonsSidebar30Phases();
  console.log('🎉 Phase 2: Variables & Data Types successfully created with all 22 topics!');
}

run();
