const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 7 & 8 (Chapters 19–24)...');

function makeLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(
    path.join(csharpDir, file),
    wrapCSharpPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8'
  );
  const kb = Math.round(fs.statSync(path.join(csharpDir, file)).size / 1024);
  console.log('  ✅ ' + file + ' (' + kb + 'KB)');
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 19: Structs, Enums & Records
// ═══════════════════════════════════════════════════════════════════════════════
const c19 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 7 (Chapter 19): C# Structs, Enums &amp; Records Masterclass</strong>! Choosing the right data structure directly impacts application memory consumption and performance. In this chapter, we master <code>struct</code> value-type behavior, <code>enum</code> strongly typed enumerations, <code>record</code> classes, C# 10 <code>record struct</code>, value-based equality, immutable data modeling, and guidelines for choosing between <code>class</code>, <code>struct</code>, or <code>record</code>.</p>
</div>

<div class="section-title"><span class="num">1</span>Structs &amp; Value-Type Behavior (Struct vs Class)</div>
<div class="section-body">
  <p class="text-prose">A <code>struct</code> is a light-weight <strong>Value Type</strong> stored directly on the Stack (or inside its containing object). Unlike classes, assigning a struct variable to another variable copies the entire data byte-by-byte rather than copying a heap memory reference pointer.</p>

  <table class="tbl spec-table">
    <thead><tr><th>Property</th><th>Class (Reference Type)</th><th>Struct (Value Type)</th><th>Record (Reference / Value)</th></tr></thead>
    <tbody>
      <tr><td>Memory Location</td><td>Heap (Pointer on Stack)</td><td>Stack (Direct data allocation)</td><td>Heap (Record Class) / Stack (Record Struct)</td></tr>
      <tr><td>Assignment Behavior</td><td>Reference Copy (Shares object)</td><td>Value Copy (Independent clone)</td><td>Value Copy or Reference Copy</td></tr>
      <tr><td>Equality Check</td><td>Reference Equality (by default)</td><td>Value Equality (compares fields)</td><td>Automatic Value Equality</td></tr>
      <tr><td>Inheritance</td><td>Supports Class Inheritance</td><td>No Struct Inheritance (Interfaces only)</td><td>Record Class inheritance supported</td></tr>
      <tr><td>Best Used For</td><td>Complex entities with state &amp; logic</td><td>Small lightweight value containers (&lt;16 bytes)</td><td>Immutable Data Transfer Objects (DTOs)</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Struct Definition &amp; Value Copying</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>public struct Point
{
    public int X { get; set; }
    public int Y { get; set; }

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }

    public override string ToString() =&gt; $"Point({X}, {Y})";
}

// Value Type Copy Behavior Demonstration
Point p1 = new Point(10, 20);
Point p2 = p1; // COPIES ACTUAL VALUES (Independent object on Stack!)
p2.X = 99;

Console.WriteLine($"p1: {p1}"); // Point(10, 20) — p1 remains unchanged!
Console.WriteLine($"p2: {p2}"); // Point(99, 20)</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Enums — Strongly Typed Constants</div>
<div class="section-body">
  <p class="text-prose">An <code>enum</code> (enumeration) defines a strongly typed set of named integer constants, eliminating magic numbers and magic strings across your codebase.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Enum with Switch Statement</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>enum OrderStatus
{
    Pending = 1,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}

OrderStatus status = OrderStatus.Processing;

// Enum with Switch Expression
string message = status switch
{
    OrderStatus.Pending    =&gt; "Order received and waiting for payment.",
    OrderStatus.Processing =&gt; "Order is being packed in the warehouse.",
    OrderStatus.Shipped    =&gt; "Order is out for delivery with courier.",
    OrderStatus.Delivered  =&gt; "Order delivered successfully!",
    _                      =&gt; "Order status unknown."
};

Console.WriteLine($"Status: {status} (Code: {(int)status}) -&gt; {message}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Record Classes &amp; Record Structs</div>
<div class="section-body">
  <p class="text-prose">C# 9+ introduced <strong>Records</strong> to model immutable data with positional parameters, non-destructive mutation (the <code>with</code> expression), and automatic value-based equality.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Record Class vs Record Struct</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Record Class (Reference Type with Value Equality)
public record Product(int Id, string Name, decimal Price);

// 2. Record Struct (Value Type with Record features — C# 10+)
public readonly record struct GeoLocation(double Latitude, double Longitude);

Product prod1 = new(101, "Laptop", 75000.00m);
Product prod2 = new(101, "Laptop", 75000.00m);

// Value-based equality check
Console.WriteLine($"prod1 == prod2: {prod1 == prod2}"); // True!

// Non-destructive mutation using 'with'
Product updatedProd = prod1 with { Price = 69999.00m };
Console.WriteLine($"Updated Product: {updatedProd}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: When should I choose a Struct over a Class?</h4>
    <p>Choose a <code>struct</code> when data size is small (&lt;16 bytes), objects are short-lived, immutable, and created frequently inside loops to reduce Garbage Collector allocation pressure.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the underlying type of an enum?</h4>
    <p>By default, an enum's underlying type is <code>int</code> (32-bit integer). You can override this to <code>byte</code>, <code>short</code>, or <code>long</code> (e.g., <code>enum Status : byte</code>).</p>
  </div>
</div>`;

makeLesson(
  19,
  '19-csharp-structs-enums-and-records-masterclass.html',
  'Structs, Enums & Record Structs Masterclass',
  'Exhaustive textbook-grade C# Structs, Enums & Records (Chapter 19): struct definition, struct vs class, value-type stack behavior, enums, enum switch pattern, record classes, record structs (C# 10), value equality, and choosing class vs struct vs record.',
  'Phase 7',
  'Advanced C# Language',
  'struct · Struct vs Class · Stack Memory · enum · Enum Switch · record Class · record struct · Value Equality · Immutable Models',
  c19,
  '18-csharp-interfaces-multiple-implementation-decoupling.html',
  '18. Interfaces, Default Members & Dependency Inversion',
  '20-csharp-generics-type-parameters-constraints-variance.html',
  '20. Generics, Constraints, Covariance & Contravariance'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 20: Generics
// ═══════════════════════════════════════════════════════════════════════════════
const c20 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 7 (Chapter 20): C# Generics, Constraints, Covariance &amp; Contravariance Masterclass</strong>! Generics allow you to define classes, methods, interfaces, and delegates with placeholder type parameters (<code>&lt;T&gt;</code>). In this lesson, we master type-safe reusable code, generic constraints (<code>where T : class</code>, <code>new()</code>, <code>IComparable</code>), multiple type parameters, covariance (<code>out</code>), and contravariance (<code>in</code>).</p>
</div>

<div class="section-title"><span class="num">1</span>Generic Methods &amp; Generic Classes</div>
<div class="section-body">
  <p class="text-prose">Without generics, creating reusable components required using <code>object</code>, which causes runtime type cast errors and boxing performance hits. Generics enforce **compile-time type safety**.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Generic Method &amp; Class Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Generic Method
static T GetFirst&lt;T&gt;(List&lt;T&gt; items)
{
    if (items == null || items.Count == 0)
        throw new InvalidOperationException("List is empty!");
    return items[0];
}

List&lt;int&gt; numbers = new() { 10, 20, 30 };
Console.WriteLine($"First number: {GetFirst(numbers)}"); // Output: 10

List&lt;string&gt; names = new() { "Ravi", "Alice", "Bob" };
Console.WriteLine($"First name: {GetFirst(names)}");   // Output: Ravi

// Generic Class
public class DataRepository&lt;T&gt;
{
    private List&lt;T&gt; _storage = new();

    public void Add(T item) =&gt; _storage.Add(item);
    public T Get(int index) =&gt; _storage[index];
    public int Count =&gt; _storage.Count;
}

DataRepository&lt;double&gt; doubleRepo = new();
doubleRepo.Add(99.95);
Console.WriteLine($"Repo item: {doubleRepo.Get(0)}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Generic Constraints (where T : ...)</div>
<div class="section-body">
  <p class="text-prose">Generic constraints restrict the types that can be passed as arguments for type parameter <code>T</code>, allowing access to methods defined on those constrained types:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Constraint Syntax</th><th>Requirement for Type Argument T</th></tr></thead>
    <tbody>
      <tr><td><code>where T : struct</code></td><td>Must be a non-nullable Value Type (int, double, struct).</td></tr>
      <tr><td><code>where T : class</code></td><td>Must be a Reference Type (class, interface, delegate, string).</td></tr>
      <tr><td><code>where T : new()</code></td><td>Must have a public parameterless constructor.</td></tr>
      <tr><td><code>where T : BaseClass</code></td><td>Must derive from specified BaseClass.</td></tr>
      <tr><td><code>where T : ISomeInterface</code></td><td>Must implement specified Interface.</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Generic Constraints Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>public class Repository&lt;TEntity&gt; where TEntity : class, new()
{
    public TEntity CreateInstance()
    {
        return new TEntity(); // Valid because of new() constraint!
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is Covariance (out) and Contravariance (in)?</h4>
    <p>Covariance (<code>IEnumerable&lt;out T&gt;</code>) allows you to use a more derived type than originally specified. Contravariance (<code>Action&lt;in T&gt;</code>) allows you to use a more generic base type.</p>
  </div>
</div>`;

makeLesson(
  20,
  '20-csharp-generics-type-parameters-constraints-variance.html',
  'Generics, Constraints, Covariance & Contravariance Masterclass',
  'Exhaustive textbook-grade C# Generics (Chapter 20): Generic types, methods, classes, constraints (where T : class, new()), multiple type parameters, generic interfaces, covariance (out), contravariance (in), and type-safe reusable code.',
  'Phase 7',
  'Advanced C# Language',
  'Generic Types · Generic Methods · Generic Classes · Type Parameters <T> · Constraints (where) · Generic Interfaces · Covariance (out) · Contravariance (in)',
  c20,
  '19-csharp-structs-enums-and-records-masterclass.html',
  '19. Structs, Enums & Record Structs',
  '21-csharp-delegates-events-func-action-predicate.html',
  '21. Delegates, Action, Func, Predicate & Events'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 21: Delegates and Events
// ═══════════════════════════════════════════════════════════════════════════════
const c21 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 7 (Chapter 21): C# Delegates, Built-in Delegates (Func, Action, Predicate) &amp; Events Masterclass</strong>! A delegate is a type-safe function pointer reference to a method with a specific signature. In this chapter, we master custom delegates, built-in delegates (<code>Action</code>, <code>Func</code>, <code>Predicate</code>), anonymous methods, event publisher-subscriber design patterns, custom event arguments, and event unsubscribing.</p>
</div>

<div class="section-title"><span class="num">1</span>Delegate Ante Enti? Built-in Delegates (Func, Action, Predicate)</div>
<div class="section-body">
  <p class="text-prose">A delegate allows passing methods as parameters to other methods. .NET provides three built-in generic delegates to avoid declaring custom delegate types:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Delegate</th><th>Return Type</th><th>Usage Description</th><th>Example Signature</th></tr></thead>
    <tbody>
      <tr><td><code>Action&lt;T1, T2&gt;</code></td><td><code>void</code> (No return value)</td><td>Encapsulates a method that returns no result.</td><td><code>Action&lt;string&gt; log = msg =&gt; Console.WriteLine(msg);</code></td></tr>
      <tr><td><code>Func&lt;T1, T2, TResult&gt;</code></td><td><code>TResult</code> (Last parameter)</td><td>Encapsulates a method that returns a result value.</td><td><code>Func&lt;int, int, int&gt; add = (a, b) =&gt; a + b;</code></td></tr>
      <tr><td><code>Predicate&lt;T&gt;</code></td><td><code>bool</code></td><td>Encapsulates a method that tests a condition.</td><td><code>Predicate&lt;int&gt; isEven = n =&gt; n % 2 == 0;</code></td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Func, Action &amp; Predicate Code</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Func<T1, T2, TResult> — Takes two ints, returns int
Func&lt;int, int, int&gt; add = (first, second) =&gt; first + second;
Console.WriteLine($"Func Add: {add(10, 20)}"); // 30

// 2. Action<T> — Takes string, returns void
Action&lt;string&gt; printMessage = msg =&gt; Console.WriteLine($"LOG: {msg}");
printMessage("Delegates in C# are powerful!");

// 3. Predicate<T> — Takes int, returns bool
Predicate&lt;int&gt; isPositive = num =&gt; num &gt; 0;
Console.WriteLine($"Is 15 positive: {isPositive(15)}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Events &amp; Publisher-Subscriber Pattern</div>
<div class="section-body">
  <p class="text-prose">Events provide a notification system where a <strong>Publisher</strong> class triggers an event, and one or more <strong>Subscriber</strong> classes receive and handle that event asynchronously.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Event Publisher &amp; Subscriber</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>public class ProcessPublisher
{
    // Declare Event using EventHandler delegate
    public event EventHandler? ProcessCompleted;

    public void StartProcess()
    {
        Console.WriteLine("Process started...");
        System.Threading.Thread.Sleep(500); // Simulate work
        OnProcessCompleted();
    }

    protected virtual void OnProcessCompleted()
    {
        ProcessCompleted?.Invoke(this, EventArgs.Empty); // Safe event invocation
    }
}

// Subscriber Code
ProcessPublisher publisher = new();
publisher.ProcessCompleted += (sender, e) =&gt; Console.WriteLine("Subscriber received: Process Finished!");
publisher.StartProcess();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why should I unsubscribe from events (-=)?</h4>
    <p>If a subscriber does not unsubscribe from a long-lived publisher event, the publisher holds a reference pointer to the subscriber, preventing the Garbage Collector from freeing subscriber memory (causing memory leaks).</p>
  </div>
</div>`;

makeLesson(
  21,
  '21-csharp-delegates-events-func-action-predicate.html',
  'Delegates, Action, Func, Predicate & Events Masterclass',
  'Exhaustive textbook-grade C# Delegates & Events (Chapter 21): Delegate definition, method pointers, Action, Func, Predicate delegates, anonymous methods, events, publisher-subscriber design pattern, custom EventArgs, and unsubscribing.',
  'Phase 7',
  'Advanced C# Language',
  'Delegates · Func<T> · Action<T> · Predicate<T> · Anonymous Methods · Events · Publisher-Subscriber Pattern · EventArgs · Unsubscribing',
  c21,
  '20-csharp-generics-type-parameters-constraints-variance.html',
  '20. Generics, Constraints, Covariance & Contravariance',
  '22-csharp-lambda-expressions-closures-anonymous-functions.html',
  '22. Lambda Syntax, Closures & Anonymous Functions'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 22: Lambda Expressions
// ═══════════════════════════════════════════════════════════════════════════════
const c22 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 7 (Chapter 22): C# Lambda Expressions, Closures &amp; Anonymous Functions Masterclass</strong>! A lambda expression is an inline anonymous function specified using the lambda operator <code>=&gt;</code> (read as "goes to"). In this chapter, we cover expression lambdas, statement lambdas, lambda parameters, collection filtering, variable capture, and lexical closures.</p>
</div>

<div class="section-title"><span class="num">1</span>Expression Lambdas vs Statement Lambdas</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Expression &amp; Statement Lambdas</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Expression Lambda (single expression, implicit return)
Func&lt;int, int&gt; square = x =&gt; x * x;
Console.WriteLine($"Square of 6: {square(6)}"); // 36

// 2. Statement Lambda (enclosed in braces {}, requires explicit return)
Func&lt;int, int, string&gt; compare = (a, b) =&gt;
{
    if (a &gt; b) return $"{a} is greater";
    if (b &gt; a) return $"{b} is greater";
    return "Both are equal";
};
Console.WriteLine(compare(15, 20));</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Captured Variables &amp; Closures</div>
<div class="section-body">
  <p class="text-prose">A **Closure** occurs when a lambda expression captures and references an outer local variable declared outside its immediate scope.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Closure Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int factor = 10; // Outer variable

Func&lt;int, int&gt; multiplyByFactor = n =&gt; n * factor; // Captures 'factor' variable!

Console.WriteLine($"5 * 10 = {multiplyByFactor(5)}"); // 50

factor = 20; // Modifying captured variable
Console.WriteLine($"5 * 20 = {multiplyByFactor(5)}"); // 100 — Lambda sees updated value!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the syntax rule for single vs multiple parameters in lambdas?</h4>
    <p>If a lambda has exactly one parameter, parentheses are optional (e.g., <code>x =&gt; x * 2</code>). If zero or multiple parameters exist, parentheses are mandatory (e.g., <code>() =&gt; 42</code> or <code>(x, y) =&gt; x + y</code>).</p>
  </div>
</div>`;

makeLesson(
  22,
  '22-csharp-lambda-expressions-closures-anonymous-functions.html',
  'Lambda Syntax, Closures & Anonymous Functions Masterclass',
  'Exhaustive textbook-grade C# Lambda Expressions (Chapter 22): Lambda syntax (=>), expression lambdas, statement lambdas, parameters, return values, lambdas with LINQ & collections, variable capture, lexical closures, and anonymous functions.',
  'Phase 7',
  'Advanced C# Language',
  'Lambda Syntax (=>) · Expression Lambdas · Statement Lambdas · Parameters & Return · Variable Capturing · Lexical Closures · Anonymous Functions',
  c22,
  '21-csharp-delegates-events-func-action-predicate.html',
  '21. Delegates, Action, Func, Predicate & Events',
  '23-csharp-linq-basics-query-vs-method-syntax-operators.html',
  '23. LINQ Basics (Where, Select, OrderBy, FirstOrDefault)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 23: LINQ Basics
// ═══════════════════════════════════════════════════════════════════════════════
const c23 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 8 (Chapter 23): C# LINQ Basics (Language Integrated Query) Masterclass</strong>! LINQ integrates query capabilities directly into the C# language syntax. In this lesson, we cover query syntax vs method syntax, filtering (<code>Where</code>), projection (<code>Select</code>), sorting (<code>OrderBy</code>, <code>ThenBy</code>), element operators (<code>First</code>, <code>FirstOrDefault</code>, <code>Single</code>), and aggregate operators (<code>Count</code>, <code>Sum</code>, <code>Average</code>, <code>Min</code>, <code>Max</code>, <code>Any</code>, <code>All</code>).</p>
</div>

<div class="section-title"><span class="num">1</span>Method Syntax vs Query Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — LINQ Method vs Query Syntax</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>List&lt;int&gt; numbers = new() { 10, 15, 20, 25, 30 };

// 1. Method Syntax (Fluent API using Lambdas — Recommended)
var evenDoubledMethod = numbers
    .Where(number =&gt; number % 2 == 0)
    .Select(number =&gt; number * 2);

Console.WriteLine("Method Syntax Result:");
foreach (int num in evenDoubledMethod) Console.WriteLine(num);

// 2. Query Syntax (SQL-like syntax)
var evenDoubledQuery = from number in numbers
                       where number % 2 == 0
                       select number * 2;</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>LINQ Aggregates &amp; Element Operators</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — LINQ Operators Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>List&lt;int&gt; scores = new() { 85, 92, 78, 95, 60 };

Console.WriteLine($"Count: {scores.Count()}");
Console.WriteLine($"Sum: {scores.Sum()}");
Console.WriteLine($"Average: {scores.Average():F2}");
Console.WriteLine($"Max: {scores.Max()}, Min: {scores.Min()}");

bool hasTopScorer = scores.Any(s =&gt; s &gt;= 90);
Console.WriteLine($"Has 90+ score: {hasTopScorer}");

int firstPass = scores.FirstOrDefault(s =&gt; s &gt;= 80);
Console.WriteLine($"First score &gt;= 80: {firstPass}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between First() and FirstOrDefault()?</h4>
    <p><code>First()</code> throws an <code>InvalidOperationException</code> if no matching element is found. <code>FirstOrDefault()</code> returns the type's default value (e.g., <code>0</code> or <code>null</code>) safely without throwing an exception.</p>
  </div>
</div>`;

makeLesson(
  23,
  '23-csharp-linq-basics-query-vs-method-syntax-operators.html',
  'LINQ Basics (Where, Select, OrderBy, FirstOrDefault) Masterclass',
  'Exhaustive textbook-grade C# LINQ Basics (Chapter 23): LINQ introduction, Query syntax vs Method syntax, Where, Select, OrderBy, First, FirstOrDefault, Single, Any, All, Count, Sum, Average, Min, and Max operators.',
  'Phase 8',
  'LINQ & Query Pipelines',
  'LINQ Overview · Query vs Method Syntax · Where Filtering · Select Projection · OrderBy Sorting · FirstOrDefault · Aggregates (Sum, Avg, Min, Max)',
  c23,
  '22-csharp-lambda-expressions-closures-anonymous-functions.html',
  '22. Lambda Syntax, Closures & Anonymous Functions',
  '24-csharp-advanced-linq-groupby-join-deferred-execution.html',
  '24. Advanced LINQ (GroupBy, Join, Deferred Execution)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 24: Advanced LINQ
// ═══════════════════════════════════════════════════════════════════════════════
const c24 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 8 (Chapter 24): C# Advanced LINQ, GroupBy, Join &amp; Deferred Execution Masterclass</strong>! In this lesson, we explore complex query operations: <code>SelectMany</code>, <code>GroupBy</code>, <code>Join</code>, <code>GroupJoin</code>, Set operations (<code>Distinct</code>, <code>Union</code>, <code>Intersect</code>, <code>Except</code>), <code>Aggregate</code>, Deferred execution mechanics vs Immediate execution (<code>ToList</code>, <code>ToArray</code>), and LINQ performance optimization.</p>
</div>

<div class="section-title"><span class="num">1</span>Deferred Execution vs Immediate Execution</div>
<div class="section-body">
  <p class="text-prose">Most LINQ queries use **Deferred Execution** — the query logic is NOT executed when defined, but rather when you iterate through the query results (e.g., via <code>foreach</code>). Methods like <code>ToList()</code> or <code>ToArray()</code> force **Immediate Execution**.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Deferred Execution Demonstration</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>List&lt;int&gt; numbers = new() { 1, 2, 3 };

// Query defined (NOT executed yet!)
var query = numbers.Where(n =&gt; n &gt; 1);

numbers.Add(4); // Modifying underlying collection AFTER query definition

// Execution happens NOW during foreach!
foreach (var item in query)
{
    Console.WriteLine(item); // Outputs: 2, 3, 4 (includes newly added 4!)
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>GroupBy &amp; Join Operations</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — GroupBy Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>var students = new[]
{
    new { Name = "Ravi", Grade = "A" },
    new { Name = "Alice", Grade = "B" },
    new { Name = "Bob", Grade = "A" }
};

var groupedByGrade = students.GroupBy(s =&gt; s.Grade);

foreach (var group in groupedByGrade)
{
    Console.WriteLine($"Grade {group.Key} Students:");
    foreach (var student in group)
    {
        Console.WriteLine($" - {student.Name}");
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the risk of multiple enumerations in LINQ?</h4>
    <p>Re-enumerating a deferred LINQ query multiple times executes the entire database or memory filtering operation again on each iteration. Call <code>ToList()</code> to cache results in memory if reading multiple times.</p>
  </div>
</div>`;

makeLesson(
  24,
  '24-csharp-advanced-linq-groupby-join-deferred-execution.html',
  'Advanced LINQ (GroupBy, Join, Deferred Execution) Masterclass',
  'Exhaustive textbook-grade C# Advanced LINQ (Chapter 24): SelectMany, GroupBy, Join, GroupJoin, Set operations (Distinct, Union, Intersect, Except), Aggregate, Deferred vs Immediate execution (ToList, ToArray), and LINQ performance optimization.',
  'Phase 8',
  'LINQ & Query Pipelines',
  'SelectMany · GroupBy · Join · Set Operations · Deferred Execution · Immediate Execution (ToList) · LINQ Performance',
  c24,
  '23-csharp-linq-basics-query-vs-method-syntax-operators.html',
  '23. LINQ Basics (Where, Select, OrderBy, FirstOrDefault)',
  '25-csharp-exception-handling-try-catch-custom-filters.html',
  '25. Exception Handling, Custom Errors & Filters'
);

console.log('\n🎉 ALL C# PHASES 7 & 8 (CHAPTERS 19–24) GENERATED SUCCESSFULLY!');
