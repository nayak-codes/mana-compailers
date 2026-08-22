const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 9 & 10 (Chapters 25–29)...');

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
// CHAPTER 25: Exception Handling
// ═══════════════════════════════════════════════════════════════════════════════
const c25 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 9 (Chapter 25): C# Exception Handling, Custom Exceptions &amp; Filters Masterclass</strong>! Exception handling protects your application from unexpected runtime errors. In this chapter, we cover <code>try</code>, <code>catch</code>, <code>finally</code>, <code>throw</code>, creating custom exception classes, multiple catch blocks, exception filters (<code>when</code>), exception logging best practices, and avoiding common exception anti-patterns.</p>
</div>

<div class="section-title"><span class="num">1</span>Error vs Exception — What is an Exception?</div>
<div class="section-body">
  <p class="text-prose">An <strong>Exception</strong> is an object that represents an unexpected or invalid situation occurring at runtime that interrupts normal program execution. In C#, all exceptions inherit from <code>System.Exception</code>. Unlike compile-time errors, exceptions happen during program execution and can be caught and handled gracefully using structured exception handling.</p>

  <table class="tbl spec-table">
    <thead><tr><th>Built-In Exception</th><th>When It Occurs</th></tr></thead>
    <tbody>
      <tr><td><code>DivideByZeroException</code></td><td>Integer division by zero (e.g., <code>10 / 0</code>).</td></tr>
      <tr><td><code>NullReferenceException</code></td><td>Accessing a member on a <code>null</code> object reference.</td></tr>
      <tr><td><code>IndexOutOfRangeException</code></td><td>Array index outside valid bounds.</td></tr>
      <tr><td><code>InvalidCastException</code></td><td>Invalid explicit cast between incompatible types.</td></tr>
      <tr><td><code>FormatException</code></td><td><code>int.Parse()</code> fails on invalid string format.</td></tr>
      <tr><td><code>FileNotFoundException</code></td><td>Accessing a file that does not exist on disk.</td></tr>
      <tr><td><code>ArgumentNullException</code></td><td>Null argument passed to a method that disallows it.</td></tr>
      <tr><td><code>ArgumentOutOfRangeException</code></td><td>Argument value outside acceptable range.</td></tr>
      <tr><td><code>OverflowException</code></td><td>Arithmetic operation exceeds type's value range (in <code>checked</code> context).</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>try, catch, finally &amp; throw</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — try, catch, finally, throw</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>try
{
    int result = 10 / 0; // Throws DivideByZeroException!
    Console.WriteLine(result);
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"Cannot divide by zero. Details: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"Unexpected error: {ex.Message}");
}
finally
{
    // ALWAYS executes regardless of whether an exception was thrown or caught
    Console.WriteLine("Finally block: Cleanup complete (always runs).");
}</code></pre>
  </div>

  <div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:14px;">
    <strong style="color:#a78bfa;">🔍 Execution Flow Breakdown:</strong>
    <ul style="margin:8px 0 0 18px; line-height:1.7; color:var(--text2);">
      <li><strong>try block:</strong> Contains code that might throw an exception. If an exception occurs, execution immediately jumps to the matching catch block.</li>
      <li><strong>catch block:</strong> Intercepts the exception. Multiple catch blocks can handle different exception types from most-specific to most-general.</li>
      <li><strong>finally block:</strong> Executes unconditionally after try/catch, used for resource cleanup (closing files, database connections, etc.).</li>
    </ul>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Custom Exceptions &amp; Exception Filters</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Custom Exception Class</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Custom Exception — inherit from Exception base class
public class InsufficientFundsException : Exception
{
    public decimal RequiredAmount { get; }
    public decimal AvailableBalance { get; }

    public InsufficientFundsException(decimal required, decimal available)
        : base($"Insufficient funds! Required: {required:C}, Available: {available:C}")
    {
        RequiredAmount = required;
        AvailableBalance = available;
    }
}

static void WithdrawFunds(decimal amount, decimal balance)
{
    if (amount > balance)
        throw new InsufficientFundsException(amount, balance);
    Console.WriteLine($"Withdrawal of {amount:C} successful!");
}

try
{
    WithdrawFunds(5000m, 1200m);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}

// Exception Filter using 'when' clause
try
{
    string? input = null;
    Console.WriteLine(input!.ToUpper()); // NullReferenceException!
}
catch (NullReferenceException ex) when (ex.Message.Contains("Object"))
{
    Console.WriteLine("Caught NullReferenceException matching 'Object' filter.");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Exception Best Practices</div>
<div class="section-body">
  <div class="concept-box">
    <h4>✅ Exception Handling Best Practices in Production C# Code:</h4>
    <p>• <strong>Never swallow exceptions silently:</strong> Empty catch blocks <code>catch (Exception) {}</code> hide bugs and make debugging impossible.</p>
    <p>• <strong>Catch specific exceptions first:</strong> Order catch blocks from most-specific to most-generic. <code>DivideByZeroException</code> before <code>Exception</code>.</p>
    <p>• <strong>Use finally for cleanup:</strong> Always close file streams, database connections, and network sockets in <code>finally</code> blocks or <code>using</code> statements.</p>
    <p>• <strong>Use custom exceptions for domain errors:</strong> Create <code>BusinessRuleException</code>, <code>ValidationException</code> for meaningful error messages.</p>
    <p>• <strong>Log exceptions:</strong> Use structured logging (Serilog, Microsoft.Extensions.Logging) to record exception details.</p>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between throw and throw ex?</h4>
    <p><code>throw;</code> re-throws the original exception preserving the original stack trace. <code>throw ex;</code> re-throws the exception but resets the stack trace to the current location, losing valuable debugging information. Always prefer bare <code>throw;</code>.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: When should I use Exception Filters (when)?</h4>
    <p>Use exception filters when you want to catch an exception only under specific conditions without the overhead of catching and re-throwing it. Filters are evaluated before the catch block executes.</p>
  </div>
</div>`;

makeLesson(
  25,
  '25-csharp-exception-handling-try-catch-custom-filters.html',
  'Exception Handling, Custom Errors & Filters Masterclass',
  'Exhaustive textbook-grade C# Exception Handling (Chapter 25): try, catch, finally, throw, built-in exceptions, custom exception classes, multiple catch blocks, exception filters (when), exception logging, and best practices.',
  'Phase 9',
  'Exceptions, Files & JSON',
  'Error vs Exception · try/catch/finally · throw · Custom Exceptions · Exception Filters (when) · Multiple Catch Blocks · Exception Logging · Best Practices',
  c25,
  '24-csharp-advanced-linq-groupby-join-deferred-execution.html',
  '24. Advanced LINQ (GroupBy, Join, Deferred Execution)',
  '26-csharp-file-handling-streamreader-streamwriter-async-io.html',
  '26. File I/O, File, Directory, Path & Streams'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 26: File Handling
// ═══════════════════════════════════════════════════════════════════════════════
const c26 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 9 (Chapter 26): C# File Handling, System.IO, StreamReader, StreamWriter &amp; Async I/O Masterclass</strong>! The <code>System.IO</code> namespace provides comprehensive APIs for file, directory, and stream operations. In this chapter, we master reading and writing text files using <code>File</code> static methods, file metadata via <code>FileInfo</code>, directory navigation with <code>Directory</code> and <code>Path</code>, low-level streaming with <code>StreamReader</code>/<code>StreamWriter</code>, and async file operations using <code>await</code>.</p>
</div>

<div class="section-title"><span class="num">1</span>File Static Methods — Read, Write &amp; Append</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — File Read, Write &amp; Append</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using System.IO;

// 1. Write all text to file (creates or overwrites file)
File.WriteAllText("notes.txt", "Learning C# file handling in 2026!\nLine 2.");

// 2. Read entire file content as string
string content = File.ReadAllText("notes.txt");
Console.WriteLine(content);

// 3. Append text to existing file without overwriting
File.AppendAllText("notes.txt", "\nAppended new line.");

// 4. Read all lines as array of strings
string[] lines = File.ReadAllLines("notes.txt");
Console.WriteLine($"Total lines: {lines.Length}");

// 5. Write array of lines to file
string[] studentNames = { "Ravi Kumar", "Alice Johnson", "Bob Smith" };
File.WriteAllLines("students.txt", studentNames);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Async File Operations (Best Practice for Production)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Async File Read &amp; Write</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Async File Write (Non-blocking — recommended in ASP.NET Core)
await File.WriteAllTextAsync("notes.txt", "Learning C# file handling");

// Async File Read
string content = await File.ReadAllTextAsync("notes.txt");
Console.WriteLine(content);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>StreamReader &amp; StreamWriter (Large File Processing)</div>
<div class="section-body">
  <p class="text-prose"><code>StreamReader</code> and <code>StreamWriter</code> provide line-by-line and character-level stream processing, ideal for large files that shouldn't be loaded entirely into RAM.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — StreamReader &amp; StreamWriter</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Write using StreamWriter (using disposes automatically)
using (StreamWriter writer = new StreamWriter("report.txt"))
{
    writer.WriteLine("=== MONTHLY REPORT ===");
    writer.WriteLine($"Generated: {DateTime.Now:yyyy-MM-dd}");
    writer.WriteLine("Total Sales: ₹45,000");
}

// Read using StreamReader
using (StreamReader reader = new StreamReader("report.txt"))
{
    string? line;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Path, Directory &amp; File Operations</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Path, Directory &amp; File Class</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Path operations (cross-platform safe!)
string filePath = Path.Combine("data", "users", "profile.json");
Console.WriteLine($"File Path: {filePath}");
Console.WriteLine($"Extension: {Path.GetExtension(filePath)}");
Console.WriteLine($"File Name: {Path.GetFileName(filePath)}");
Console.WriteLine($"Directory: {Path.GetDirectoryName(filePath)}");

// Directory creation
Directory.CreateDirectory("data/users");

// File existence check
if (File.Exists("notes.txt"))
{
    File.Copy("notes.txt", "notes_backup.txt", overwrite: true);
    Console.WriteLine("Backup created successfully.");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why use async file methods in web applications?</h4>
    <p>Synchronous file I/O blocks the calling thread while waiting for disk operations, reducing ASP.NET Core server throughput. Async I/O releases the thread back to handle other requests during disk wait time.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What does the 'using' statement do with StreamReader/StreamWriter?</h4>
    <p>The <code>using</code> statement automatically calls <code>Dispose()</code> on the stream object when the block exits (even if an exception is thrown), flushing and releasing the file handle resource.</p>
  </div>
</div>`;

makeLesson(
  26,
  '26-csharp-file-handling-streamreader-streamwriter-async-io.html',
  'File I/O, File, Directory, Path & Streams Masterclass',
  'Exhaustive textbook-grade C# File Handling (Chapter 26): System.IO, File, Directory, Path, FileInfo, reading/writing text, appending, copying, deleting, StreamReader, StreamWriter, async file operations.',
  'Phase 9',
  'Exceptions, Files & JSON',
  'System.IO · File.ReadAllText · File.WriteAllText · Async File I/O · StreamReader · StreamWriter · Path · Directory · File Metadata',
  c26,
  '25-csharp-exception-handling-try-catch-custom-filters.html',
  '25. Exception Handling, Custom Errors & Filters',
  '27-csharp-json-serialization-deserialization-system-text-json.html',
  '27. JSON Serialization & System.Text.Json'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 27: JSON Serialization
// ═══════════════════════════════════════════════════════════════════════════════
const c27 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 9 (Chapter 27): C# JSON Serialization, Deserialization &amp; System.Text.Json Masterclass</strong>! JSON (JavaScript Object Notation) is the universal standard data exchange format used in REST APIs, cloud services, and configuration files. In this chapter, we master serialization (C# object → JSON string), deserialization (JSON string → C# object), <code>JsonSerializer</code>, <code>JsonSerializerOptions</code>, nullable handling, custom converters, and modeling real API payloads.</p>
</div>

<div class="section-title"><span class="num">1</span>JSON Serialization &amp; Deserialization with JsonSerializer</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Serialize & Deserialize JSON</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using System.Text.Json;

// 1. Anonymous object serialization
var student = new
{
    Name = "Ravi",
    Age = 20,
    Course = "C# Masterclass"
};

string json = JsonSerializer.Serialize(student);
Console.WriteLine($"Serialized JSON: {json}");
// Output: {"Name":"Ravi","Age":20,"Course":"C# Masterclass"}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Deserializing Typed C# Objects from JSON</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Deserialization with Typed Classes</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>public class StudentDto
{
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string? Course { get; set; }
}

string jsonInput = """{"Name":"Alice","Age":22,"Course":"ASP.NET Core"}""";

StudentDto? deserializedStudent = JsonSerializer.Deserialize&lt;StudentDto&gt;(jsonInput);
Console.WriteLine($"Name: {deserializedStudent?.Name}, Age: {deserializedStudent?.Age}");

// Serialize with formatting options
JsonSerializerOptions options = new()
{
    WriteIndented = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};

string prettyJson = JsonSerializer.Serialize(deserializedStudent, options);
Console.WriteLine(prettyJson);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>JSON Arrays &amp; Async File JSON</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — JSON Arrays & Async Save</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>var products = new List&lt;object&gt;
{
    new { Id = 1, Name = "Laptop",  Price = 75000 },
    new { Id = 2, Name = "Mouse",   Price = 1200 },
    new { Id = 3, Name = "Keyboard", Price = 2500 }
};

string json = JsonSerializer.Serialize(products, new JsonSerializerOptions { WriteIndented = true });
await File.WriteAllTextAsync("products.json", json);
Console.WriteLine("Products saved to products.json!");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between System.Text.Json and Newtonsoft.Json?</h4>
    <p><code>System.Text.Json</code> is Microsoft's built-in high-performance JSON library included in .NET Core 3+ with zero external dependencies. <code>Newtonsoft.Json</code> (Json.NET) is a third-party NuGet package with richer feature support (custom converters, LINQ-to-JSON, etc.) and is preferred for complex legacy integration scenarios.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What does JsonNamingPolicy.CamelCase do?</h4>
    <p>It transforms C# PascalCase property names (e.g., <code>FirstName</code>) to JSON camelCase (e.g., <code>firstName</code>) automatically during serialization, matching REST API conventions.</p>
  </div>
</div>`;

makeLesson(
  27,
  '27-csharp-json-serialization-deserialization-system-text-json.html',
  'JSON Serialization & System.Text.Json Masterclass',
  'Exhaustive textbook-grade C# JSON (Chapter 27): Serialization, deserialization, System.Text.Json, JsonSerializer, JsonSerializerOptions, JSON arrays, nullable values, custom converters, API models, and async JSON file operations.',
  'Phase 9',
  'Exceptions, Files & JSON',
  'JSON Basics · Serialization · Deserialization · JsonSerializer · JsonSerializerOptions · CamelCase Policy · JSON Arrays · Async JSON · Custom Converters',
  c27,
  '26-csharp-file-handling-streamreader-streamwriter-async-io.html',
  '26. File I/O, File, Directory, Path & Streams',
  '28-csharp-async-await-task-cancellation-tokens.html',
  '28. async, await, Task<T> & CancellationToken'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 28: async and await
// ═══════════════════════════════════════════════════════════════════════════════
const c28 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 10 (Chapter 28): C# async, await, Task&lt;T&gt;, CancellationToken &amp; Parallel Async Masterclass</strong>! Asynchronous programming enables applications to remain responsive while waiting for slow I/O operations (database queries, HTTP calls, file reads). In this lesson, we master <code>Task</code>, <code>Task&lt;T&gt;</code>, <code>async</code> methods, <code>await</code>, exception handling in async, <code>CancellationToken</code>, and parallel async patterns (<code>Task.WhenAll</code>, <code>Task.WhenAny</code>).</p>
</div>

<div class="section-title"><span class="num">1</span>Synchronous vs Asynchronous — Blocking vs Non-Blocking</div>
<div class="section-body">
  <div class="memory-diagram">Synchronous Execution (Blocking Thread):

  Thread 1: ──[Start]──[HTTP Request ⏳⏳⏳⏳⏳]──[Process]──[Done]──
                             ▲ Thread is BLOCKED and waiting! Wastes CPU!

  Asynchronous Execution (Non-Blocking Thread):

  Thread 1: ──[Start]──[Await HTTP Request]──────────────────[Process]──[Done]──
                              │ Thread RELEASED back to thread pool!
                              └──[Disk I/O]──────────[Callback Resumes Thread 1]</div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Basic async &amp; await Pattern</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Async method returning Task<string>
static async Task&lt;string&gt; GetMessageAsync()
{
    // await releases the calling thread while Task.Delay runs (simulates I/O)
    await Task.Delay(1000);
    return "Data received successfully!";
}

// Main async entry point (C# 7.1+)
string message = await GetMessageAsync();
Console.WriteLine(message);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>CancellationToken &amp; Task.WhenAll</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — CancellationToken &amp; Task.WhenAll</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// CancellationToken — Cooperative cancellation mechanism
CancellationTokenSource cts = new CancellationTokenSource(timeout: TimeSpan.FromSeconds(3));

static async Task LongOperationAsync(CancellationToken token)
{
    for (int i = 1; i &lt;= 10; i++)
    {
        token.ThrowIfCancellationRequested(); // Exits cleanly if cancelled
        Console.WriteLine($"Processing step {i}...");
        await Task.Delay(500, token);
    }
}

try
{
    await LongOperationAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Operation was cancelled gracefully.");
}

// Task.WhenAll — Run multiple async tasks in PARALLEL
static async Task Main()
{
    Task&lt;string&gt; task1 = FetchDataAsync("API-1");
    Task&lt;string&gt; task2 = FetchDataAsync("API-2");
    Task&lt;string&gt; task3 = FetchDataAsync("API-3");

    string[] results = await Task.WhenAll(task1, task2, task3);
    Console.WriteLine($"All results received: {results.Length}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What happens if I don't await an async method?</h4>
    <p>If you call an async method without <code>await</code>, the returned <code>Task</code> fires and is discarded. Exceptions thrown inside that Task will be unobserved and silently swallowed (or crash the app in some environments).</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the difference between Task.WhenAll and Task.WhenAny?</h4>
    <p><code>Task.WhenAll</code> completes when ALL provided tasks finish. <code>Task.WhenAny</code> completes as soon as the FIRST task finishes (useful for timeout patterns and cancellation).</p>
  </div>
  <div class="faq-card">
    <h4>Q3: Should I use async/await everywhere?</h4>
    <p>Use async/await for I/O-bound operations (database, file, network). For CPU-bound heavy computation, use <code>Task.Run()</code> to offload to a background thread pool thread.</p>
  </div>
</div>`;

makeLesson(
  28,
  '28-csharp-async-await-task-cancellation-tokens.html',
  'async, await, Task<T> & CancellationToken Masterclass',
  'Exhaustive textbook-grade C# Async Programming (Chapter 28): Synchronous vs asynchronous, Task, Task<T>, async methods, await, async exception handling, CancellationToken, Task.WhenAll, Task.WhenAny, async HTTP requests.',
  'Phase 10',
  'Asynchronous Programming',
  'Synchronous vs Asynchronous · Task & Task<T> · async Methods · await · CancellationToken · Task.WhenAll · Task.WhenAny · Async HTTP Requests',
  c28,
  '27-csharp-json-serialization-deserialization-system-text-json.html',
  '27. JSON Serialization & System.Text.Json',
  '29-csharp-parallel-programming-parallel-for-thread-safety-locks.html',
  '29. Parallel.For, Thread Safety, Locks & Concurrent Collections'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 29: Parallel Programming
// ═══════════════════════════════════════════════════════════════════════════════
const c29 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 10 (Chapter 29): C# Parallel Programming, Parallel.For, Thread Safety &amp; Concurrent Collections Masterclass</strong>! Parallel programming exploits multi-core CPU processors by distributing independent work across multiple threads simultaneously. In this chapter, we master <code>Parallel.For</code>, <code>Parallel.ForEach</code>, Task Parallel Library (TPL), thread safety, race conditions, <code>lock</code>, <code>Monitor</code>, <code>Interlocked</code>, concurrent collections (<code>ConcurrentBag</code>, <code>ConcurrentDictionary</code>), and performance considerations.</p>
</div>

<div class="section-title"><span class="num">1</span>Parallelism Ante Enti? Async vs Parallel</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Concept</th><th>async/await</th><th>Parallel Programming</th></tr></thead>
    <tbody>
      <tr><td>Core Purpose</td><td>Handles <strong>I/O-Bound</strong> waits (network, disk) without blocking thread</td><td>Maximizes CPU usage for <strong>CPU-Bound</strong> computation across cores</td></tr>
      <tr><td>Thread Usage</td><td>Single logical thread, released during I/O wait</td><td>Multiple physical threads running simultaneously</td></tr>
      <tr><td>Best For</td><td>HTTP requests, file reads, database queries</td><td>Data processing, image rendering, number crunching</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Parallel.For &amp; Parallel.ForEach</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Parallel.For &amp; Parallel.ForEach</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using System.Threading.Tasks;

// 1. Parallel.For — Distributes loop iterations across CPU cores
Parallel.For(0, 5, i =&gt;
{
    Console.WriteLine($"Parallel task {i} on Thread {Thread.CurrentThread.ManagedThreadId}");
});

// 2. Parallel.ForEach — Parallel iteration over a collection
string[] cities = { "Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai" };

Parallel.ForEach(cities, city =&gt;
{
    Console.WriteLine($"Processing city: {city} (Thread {Thread.CurrentThread.ManagedThreadId})");
});</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Thread Safety &amp; Locks — Race Conditions</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Thread Safety with lock</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int counter = 0;
object lockObject = new object();

Parallel.For(0, 1000, _ =&gt;
{
    // lock ensures only ONE thread enters this block at a time
    lock (lockObject)
    {
        counter++;
    }
});

Console.WriteLine($"Final Counter: {counter}"); // Always 1000 (thread-safe!)

// Alternative: Interlocked.Increment (lock-free atomic increment)
int atomicCounter = 0;
Parallel.For(0, 1000, _ =&gt; Interlocked.Increment(ref atomicCounter));
Console.WriteLine($"Interlocked Counter: {atomicCounter}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is a Race Condition?</h4>
    <p>A race condition occurs when two or more threads access and modify a shared variable simultaneously without synchronization, producing unpredictable and incorrect results (e.g., counter never reaching 1000 without <code>lock</code>).</p>
  </div>
  <div class="faq-card">
    <h4>Q2: When should I use ConcurrentDictionary vs Dictionary?</h4>
    <p>Use <code>ConcurrentDictionary&lt;K,V&gt;</code> from <code>System.Collections.Concurrent</code> when multiple threads need to read and write dictionary entries simultaneously. Standard <code>Dictionary</code> is NOT thread-safe.</p>
  </div>
</div>`;

makeLesson(
  29,
  '29-csharp-parallel-programming-parallel-for-thread-safety-locks.html',
  'Parallel.For, Thread Safety, Locks & Concurrent Collections Masterclass',
  'Exhaustive textbook-grade C# Parallel Programming (Chapter 29): Parallelism vs async, Parallel.For, Parallel.ForEach, Task Parallel Library, thread safety, lock, Monitor, Interlocked, race conditions, ConcurrentDictionary, ConcurrentBag.',
  'Phase 10',
  'Asynchronous Programming',
  'Parallelism vs Async · Parallel.For · Parallel.ForEach · Thread Safety · Race Conditions · lock · Interlocked · ConcurrentDictionary',
  c29,
  '28-csharp-async-await-task-cancellation-tokens.html',
  '28. async, await, Task<T> & CancellationToken',
  '30-csharp-dotnet-platform-clr-assemblies-nuget-configuration.html',
  '30. .NET Platform, CLR, Assemblies & NuGet'
);

console.log('\n🎉 ALL C# PHASES 9 & 10 (CHAPTERS 25–29) GENERATED SUCCESSFULLY!');
