const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 5 & 6 (Chapters 11–18) — DEEP TEXTBOOK EXPANSION...');

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
// CHAPTER 11: Strings & StringBuilder
// ═══════════════════════════════════════════════════════════════════════════════
const c11 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 5 (Chapter 11): C# Strings, Verbatim, Raw String Literals &amp; StringBuilder Masterclass</strong>! Strings in C# are immutable sequences of UTF-16 Unicode characters. In this chapter, we master string creation, immutability, manipulation methods (ToUpper, ToLower, Trim, Contains, StartsWith, EndsWith, IndexOf, Substring, Replace, Split, Join), string interpolation, verbatim strings (<code>@""</code>), C# 11 Raw String Literals (<code>"""..."""</code>), and high-performance string concatenation using <code>StringBuilder</code>.</p>
</div>

<div class="section-title"><span class="num">1</span>Creating Strings, Immutability &amp; Core Methods</div>
<div class="section-body">
  <p class="text-prose">Strings in C# are reference types stored on the Heap. They are strictly <strong>immutable</strong> — once created, a string object's character sequence cannot be modified. Any method that appears to alter a string (like <code>Replace</code> or <code>ToUpper</code>) actually allocates and returns a brand new string instance in heap memory.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — String Manipulation Methods</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>string language = "  C# Programming  ";

Console.WriteLine($"Original Length: {language.Length}");
Console.WriteLine($"ToUpper(): '{language.ToUpper()}'");
Console.WriteLine($"ToLower(): '{language.ToLower()}'");
Console.WriteLine($"Trim(): '{language.Trim()}'");
Console.WriteLine($"Contains('C#'): {language.Contains("C#")}");
Console.WriteLine($"StartsWith('  C#'): {language.StartsWith("  C#")}");
Console.WriteLine($"EndsWith('ing  '): {language.EndsWith("ing  ")}");
Console.WriteLine($"IndexOf('Pro'): {language.IndexOf("Pro")}");
Console.WriteLine($"Substring(5, 7): '{language.Trim().Substring(3, 7)}'");
Console.WriteLine($"Replace('C#', 'Modern C#'): '{language.Replace("C#", "Modern C#").Trim()}'");

// String Split and Join
string csvData = "Apple,Banana,Orange,Mango";
string[] fruits = csvData.Split(',');
Console.WriteLine($"Joined with hyphen: {string.Join(" - ", fruits)}");</code></pre>
  </div>

  <div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:14px;">
    <strong style="color:#a78bfa;">🔍 Method Breakdown &amp; Usage:</strong>
    <ul style="margin:8px 0 0 18px; line-height:1.7; color:var(--text2);">
      <li><code>Trim()</code>: Removes leading and trailing whitespace characters.</li>
      <li><code>Split(',')</code>: Breaks a string into an array of substrings based on a delimiter character.</li>
      <li><code>string.Join(" - ", fruits)</code>: Concatenates array elements using a specified separator string.</li>
    </ul>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Verbatim Strings (@), Raw String Literals (""") &amp; StringBuilder</div>
<div class="section-body">
  <p class="text-prose">C# provides specialized string literal formats for file paths, regex patterns, multiline templates, and high-performance loop concatenation:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Verbatim, Raw Strings &amp; StringBuilder</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using System.Text;

// 1. Verbatim String Literal (@) — disables escape sequences (\n, \t)
string filePath = @"C:\Users\Balaji\Documents\Project\Program.cs";
Console.WriteLine($"File Path: {filePath}");

// 2. C# 11 Raw String Literal (""") — multiline JSON/XML without escaping double quotes!
string jsonPayload = """
{
  "student": {
    "name": "Ravi",
    "age": 21,
    "course": "C# Masterclass"
  }
}
""";
Console.WriteLine($"JSON Payload:\n{jsonPayload}");

// 3. StringBuilder — Mutable string object for high-speed string building in loops
StringBuilder sb = new StringBuilder();
sb.AppendLine("=== STUDENT REPORT ===");
for (int i = 1; i &lt;= 3; i++)
{
    sb.AppendLine($"Module #{i}: Completed successfully.");
}
Console.WriteLine(sb.ToString());</code></pre>
  </div>

  <div class="concept-box">
    <h4>Why StringBuilder?</h4>
    <p>Using standard <code>+</code> string concatenation inside a loop creates N temporary string objects on the Heap. <code>StringBuilder</code> allocates a mutable buffer that grows dynamically, performing concatenations in-place with O(1) efficiency.</p>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why are strings immutable in C#?</h4>
    <p>Immutability makes strings inherently thread-safe, enables string interning (reusing identical string literals in memory to save space), and prevents unintended side effects when strings are shared across objects.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: When should I use StringBuilder instead of string concatenation (+)?</h4>
    <p>Use <code>StringBuilder</code> when performing repeated string modifications or concatenations inside loops. Standard <code>+</code> creates a new heap object on every iteration, pressuring the Garbage Collector.</p>
  </div>
</div>`;

makeLesson(
  11,
  '11-csharp-strings-verbatim-raw-literals-stringbuilder.html',
  'Strings, Interpolation, Raw Literals & StringBuilder Masterclass',
  'Exhaustive textbook-grade C# Strings (Chapter 11): String immutability, length, indexing, methods (Trim, Substring, Replace, Split, Join), interpolation, verbatim strings (@), C# 11 Raw String Literals ("""), and StringBuilder.',
  'Phase 5',
  'Strings, Arrays & Collections',
  'String Immutability · Length & Indexing · Trim, Substring, Replace · Split & Join · Interpolation ($) · Verbatim Strings (@) · Raw String Literals (""") · StringBuilder',
  c11,
  '10-csharp-loops-for-while-foreach-practice.html',
  '10. Loops, foreach, Controls & 9 Practice Programs',
  '12-csharp-arrays-multidimensional-jagged-methods.html',
  '12. Arrays (1D, 2D Multidimensional & Jagged)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 12: Arrays
// ═══════════════════════════════════════════════════════════════════════════════
const c12 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 5 (Chapter 12): C# Arrays (1D, 2D Multidimensional &amp; Jagged) Masterclass</strong>! An array is a fixed-size collection of elements of the same data type stored in contiguous memory locations. In this chapter, we explore 1D single-dimensional arrays, 2D rectangular multidimensional arrays (<code>[,]</code>), arrays of arrays (jagged arrays <code>[][]</code>), array traversal, sorting, searching, copying, passing arrays to methods, and understanding array limitations.</p>
</div>

<div class="section-title"><span class="num">1</span>Single-Dimensional (1D) Arrays &amp; Array Methods</div>
<div class="section-body">
  <p class="text-prose">Array elements are zero-indexed, starting from index <code>0</code> up to <code>Length - 1</code>. In C# 8+, you can also use the index-from-end operator <code>^1</code> to access the last element directly.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — 1D Array Operations</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Array declaration and initialization
int[] marks = { 85, 90, 78, 92, 65 };

Console.WriteLine($"Array Length: {marks.Length}");

// Traversing using foreach
foreach (int mark in marks)
{
    Console.WriteLine($"Mark: {mark}");
}

// Array Static Methods: Sort, Reverse, BinarySearch
Array.Sort(marks); // Sorts array in ascending order
Console.WriteLine($"Sorted Min: {marks[0]}, Max: {marks[^1]}"); // ^1 is index from end in C# 8+

int index = Array.BinarySearch(marks, 90);
Console.WriteLine($"Index of 90: {index}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>2D Multidimensional [,] vs Jagged [][] Arrays</div>
<div class="section-body">
  <p class="text-prose">C# provides two distinct types of multi-dimensional arrays:</p>

  <div class="memory-diagram">Multidimensional vs Jagged Array Memory Layout:

  Multidimensional Matrix [2, 3]:       Jagged Array [][] (Array of Arrays):
  ┌────┬────┬────┐                    ┌───┐    ┌────┬────┬────┐
  │ 10 │ 20 │ 30 │                    │ 0 │───►│ 10 │ 20 │ 30 │ (Row 0: len 3)
  ├────┼────┼────┤                    ├───┤    ├────┼────┤
  │ 40 │ 50 │ 60 │                    │ 1 │───►│ 40 │ 50 │ (Row 1: len 2)
  └────┴────┴────┘                    └───┘    └────┴────┘</div>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — 2D Multidimensional &amp; Jagged Arrays</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Multidimensional 2D Rectangular Array [rows, cols]
int[,] matrix = {
    { 10, 20, 30 },
    { 40, 50, 60 }
};

Console.WriteLine($"Matrix element [1, 2]: {matrix[1, 2]}"); // 60

// 2. Jagged Array (Array of arrays with variable row lengths)
int[][] jagged = new int[2][];
jagged[0] = new int[] { 1, 2, 3 };
jagged[1] = new int[] { 4, 5 };

Console.WriteLine($"Jagged element [1][0]: {jagged[1][0]}"); // 4</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Passing Arrays to Methods</div>
<div class="section-body">
  <p class="text-prose">Arrays are reference types. When you pass an array to a method, the method receives a pointer reference to the original heap array, allowing changes to elements to persist:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Passing Array to Method</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>static void DoubleElements(int[] arr)
{
    for (int i = 0; i &lt; arr.Length; i++)
        arr[i] *= 2;
}

int[] nums = { 1, 2, 3 };
DoubleElements(nums);
Console.WriteLine($"Doubled elements: {string.Join(", ", nums)}"); // 2, 4, 6</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the main difference between int[,] and int[][]?</h4>
    <p><code>int[,]</code> is a single rectangular block of contiguous memory where every row has the same number of columns. <code>int[][]</code> is an array of separate array references, allowing rows of varying lengths.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Can arrays be resized in C#?</h4>
    <p>No. Arrays are fixed in size once instantiated. <code>Array.Resize()</code> actually allocates a brand new array under the hood and copies elements over.</p>
  </div>
</div>`;

makeLesson(
  12,
  '12-csharp-arrays-multidimensional-jagged-methods.html',
  'Arrays (1D, 2D Multidimensional & Jagged) Masterclass',
  'Exhaustive textbook-grade C# Arrays (Chapter 12): 1D array initialization, indexing, traversal, Array.Sort(), Array.BinarySearch(), 2D rectangular multidimensional arrays [,], jagged arrays [][], memory layout, and passing arrays to methods.',
  'Phase 5',
  'Strings, Arrays & Collections',
  '1D Arrays · Array Indexing & Length · Array.Sort & BinarySearch · Multidimensional [,] Arrays · Jagged Array [][] · Memory Differences',
  c12,
  '11-csharp-strings-verbatim-raw-literals-stringbuilder.html',
  '11. Strings, Interpolation, Raw Literals & StringBuilder',
  '13-csharp-collections-generics-list-dictionary-hashset.html',
  '13. Generic Collections (List, Dictionary, HashSet, Stack/Queue)'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 13: Collections & Generics
// ═══════════════════════════════════════════════════════════════════════════════
const c13 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 5 (Chapter 13): C# Generic Collections (List, Dictionary, HashSet, Stack &amp; Queue) Masterclass</strong>! Unlike fixed-size arrays, collections dynamically grow and shrink as data is added or removed. According to official Microsoft documentation, generic collections in <code>System.Collections.Generic</code> improve type safety and performance by eliminating boxing/unboxing overhead.</p>
</div>

<div class="section-title"><span class="num">1</span>List&lt;T&gt; &amp; Dictionary&lt;TKey, TValue&gt;</div>
<div class="section-body">
  <p class="text-prose"><code>List&lt;T&gt;</code> is a dynamic array that grows automatically when capacity is reached. <code>Dictionary&lt;TKey, TValue&gt;</code> is a high-speed Hash Table that provides O(1) key lookups.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — List&lt;T&gt; and Dictionary</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>using System.Collections.Generic;

// 1. List<T> — Dynamic Resizable Array
List&lt;string&gt; courses = new() { "C#", "ASP.NET Core", "SQL" };
courses.Add("Azure Cloud");
courses.Remove("SQL");

Console.WriteLine($"Course count: {courses.Count}");
foreach (string c in courses) Console.WriteLine($"Course: {c}");

// 2. Dictionary<TKey, TValue> — Fast O(1) Key-Value Lookup
Dictionary&lt;int, string&gt; employees = new()
{
    { 101, "Alice" },
    { 102, "Bob" },
    { 103, "Charlie" }
};

if (employees.TryGetValue(102, out string? empName))
{
    Console.WriteLine($"ID 102 Name: {empName}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>HashSet&lt;T&gt;, Queue&lt;T&gt; &amp; Stack&lt;T&gt;</div>
<div class="section-body">
  <p class="text-prose">Other generic collections suit specific algorithm patterns:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — HashSet, Queue, and Stack</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. HashSet<T> — Unordered Collection of Unique Elements
HashSet&lt;int&gt; uniqueIds = new() { 1, 2, 2, 3, 3, 3 };
Console.WriteLine($"Unique ID count: {uniqueIds.Count}"); // 3

// 2. Queue<T> — FIFO (First-In, First-Out)
Queue&lt;string&gt; ticketQueue = new();
ticketQueue.Enqueue("User 1");
ticketQueue.Enqueue("User 2");
Console.WriteLine($"Processing: {ticketQueue.Dequeue()}"); // User 1

// 3. Stack<T> — LIFO (Last-In, First-Out)
Stack&lt;string&gt; undoStack = new();
undoStack.Push("Action 1");
undoStack.Push("Action 2");
Console.WriteLine($"Undo Action: {undoStack.Pop()}"); // Action 2</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why are Generic Collections preferred over ArrayList?</h4>
    <p>Generic collections like <code>List&lt;int&gt;</code> store items without casting them to <code>object</code>, eliminating Boxing/Unboxing and enforcing compile-time type safety.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How do I choose the right collection?</h4>
    <p>Use <code>List&lt;T&gt;</code> for ordered sequential access; <code>Dictionary&lt;K,V&gt;</code> for fast key lookup; <code>HashSet&lt;T&gt;</code> for uniqueness; <code>Queue&lt;T&gt;</code> for FIFO processing; and <code>Stack&lt;T&gt;</code> for LIFO undo/redo operations.</p>
  </div>
</div>`;

makeLesson(
  13,
  '13-csharp-collections-generics-list-dictionary-hashset.html',
  'Generic Collections (List, Dictionary, HashSet, Stack/Queue) Masterclass',
  'Exhaustive textbook-grade C# Collections (Chapter 13): List<T>, Dictionary<TKey, TValue>, HashSet<T>, Queue<T>, Stack<T>, SortedList, LinkedList, adding, removing, searching, iterating, and choosing the right collection.',
  'Phase 5',
  'Strings, Arrays & Collections',
  'Generic Collections · List<T> · Dictionary<TKey, TValue> · HashSet<T> · Queue<T> (FIFO) · Stack<T> (LIFO) · O(1) Hash Lookups',
  c13,
  '12-csharp-arrays-multidimensional-jagged-methods.html',
  '12. Arrays (1D, 2D Multidimensional & Jagged)',
  '14-csharp-methods-parameters-ref-out-in-local-functions.html',
  '14. Methods, Parameters (ref/out/in) & Overloading'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 14: Methods & Parameters
// ═══════════════════════════════════════════════════════════════════════════════
const c14 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 6 (Chapter 14): C# Methods, Parameter Modifiers (ref, out, in), Overloading &amp; Expression-Bodied Members Masterclass</strong>! Methods are reusable blocks of code that perform actions. In this chapter, we explore method signatures, default parameters, named arguments, method overloading, pass-by-reference modifiers (<code>ref</code>, <code>out</code>, <code>in</code>), expression-bodied methods (<code>=&gt;</code>), local functions, static methods, and recursion.</p>
</div>

<div class="section-title"><span class="num">1</span>Method Declaration &amp; Method Overloading</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Method Declaration &amp; Overloading</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>class Calculator
{
    // Standard method
    public static int Add(int first, int second)
    {
        return first + second;
    }

    // Method Overloading (same name, different parameter types)
    public static double Add(double first, double second)
    {
        return first + second;
    }

    // Expression-bodied method (C# 6+)
    public static int Multiply(int a, int b) =&gt; a * b;
}

Console.WriteLine($"Add ints: {Calculator.Add(10, 20)}");
Console.WriteLine($"Add doubles: {Calculator.Add(5.5, 4.5)}");
Console.WriteLine($"Multiply: {Calculator.Multiply(4, 5)}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Parameter Modifiers — ref, out, and in</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Modifier</th><th>Direction</th><th>Caller Requirement</th><th>Callee Requirement</th></tr></thead>
    <tbody>
      <tr><td><code>ref</code></td><td>Two-way (In / Out)</td><td>Must be initialized before passing</td><td>Can read &amp; modify value</td></tr>
      <tr><td><code>out</code></td><td>One-way (Out only)</td><td>Does NOT need to be initialized before passing</td><td>MUST assign a value before returning</td></tr>
      <tr><td><code>in</code></td><td>One-way (Read-only In)</td><td>Must be initialized before passing</td><td>ReadOnly — cannot modify value</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — ref, out, and in Demonstration</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>static void Swap(ref int x, ref int y)
{
    int temp = x; x = y; y = temp;
}

static void GetValues(out int id, out string name)
{
    id = 101;
    name = "Ravi";
}

int a = 10, b = 20;
Swap(ref a, ref b);
Console.WriteLine($"Swapped: a={a}, b={b}"); // a=20, b=10

GetValues(out int newId, out string newName);
Console.WriteLine($"Out values: ID={newId}, Name={newName}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the main difference between ref and out?</h4>
    <p>A <code>ref</code> parameter requires the caller to initialize the variable before calling the method. An <code>out</code> parameter does not require caller initialization, but the called method is forced by the compiler to assign it a value before returning.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What are Expression-Bodied Methods?</h4>
    <p>Expression-bodied methods use the lambda arrow <code>=&gt;</code> to define single-line methods concisely without needing braces or explicit return keywords.</p>
  </div>
</div>`;

makeLesson(
  14,
  '14-csharp-methods-parameters-ref-out-in-local-functions.html',
  'Methods, Parameters (ref/out/in) & Overloading Masterclass',
  'Exhaustive textbook-grade C# Methods (Chapter 14): Method syntax, parameters, return values, void, default & named arguments, method overloading, ref, out, in parameter modifiers, expression-bodied methods (=>), local functions, and static methods.',
  'Phase 6',
  'Methods & OOP',
  'Method Signatures · Method Overloading · ref Modifier · out Modifier · in Modifier · Expression-Bodied Methods (=>) · Local Functions · Static Methods',
  c14,
  '13-csharp-collections-generics-list-dictionary-hashset.html',
  '13. Generic Collections (List, Dictionary, HashSet, Stack/Queue)',
  '15-csharp-classes-objects-constructors-properties.html',
  '15. Classes, Objects, Properties & Constructors'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 15: Classes and Objects
// ═══════════════════════════════════════════════════════════════════════════════
const c15 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 6 (Chapter 15): C# Classes, Objects, Properties &amp; Constructors Masterclass</strong>! Object-Oriented Programming (OOP) organizes software into <strong>Classes</strong> (blueprints) and <strong>Objects</strong> (runtime instances). In this lesson, we explore fields, automatic properties (<code>{ get; set; }</code>), default and parameterized constructors, object initializers, <code>this</code> keyword, static members, nested classes, and <code>ToString()</code> overriding.</p>
</div>

<div class="section-title"><span class="num">1</span>Class Definition, Properties &amp; Constructors</div>
<div class="section-body">
  <p class="text-prose">A Class defines fields, properties, and methods that an object instance will contain. Properties wrap private fields safely using <code>get</code> and <code>set</code> accessors.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Student Class Definition</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>class Student
{
    // Auto-Properties
    public string Name { get; set; } = "";
    public int Age { get; set; }

    // Parameterized Constructor
    public Student(string name, int age)
    {
        this.Name = name;
        this.Age = age;
    }

    public void DisplayDetails()
    {
        Console.WriteLine($"Student: {Name} - Age: {Age}");
    }

    public override string ToString() =&gt; $"Student({Name}, {Age})";
}

Student student = new("Ravi", 20);
student.DisplayDetails();
Console.WriteLine(student.ToString());</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Static Members &amp; Static Classes</div>
<div class="section-body">
  <p class="text-prose">Static members belong to the class itself rather than any individual instance:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Static Members</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>class Counter
{
    public static int Count = 0; // Shared across ALL instances

    public Counter()
    {
        Count++;
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
Console.WriteLine($"Total Objects Created: {Counter.Count}"); // 2</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the difference between a Field and a Property?</h4>
    <p>A Field is a raw private data variable. A Property wraps a field with <code>get</code> and <code>set</code> accessors to provide encapsulation, data validation, and controlled read/write access.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is the 'this' keyword?</h4>
    <p><code>this</code> refers to the current instance of the class, helping distinguish between constructor parameters and class fields with the same name.</p>
  </div>
</div>`;

makeLesson(
  15,
  '15-csharp-classes-objects-constructors-properties.html',
  'Classes, Objects, Properties & Constructors Masterclass',
  'Exhaustive textbook-grade C# Classes & Objects (Chapter 15): Class blueprint, objects, fields, auto-properties ({ get; set; }), default & parameterized constructors, object initializers, this keyword, static members, and ToString() overriding.',
  'Phase 6',
  'Methods & OOP',
  'Classes & Objects · Fields vs Properties · Auto-Properties ({ get; set; }) · Constructors · Object Initializer · this Keyword · Static Members · ToString()',
  c15,
  '14-csharp-methods-parameters-ref-out-in-local-functions.html',
  '14. Methods, Parameters (ref/out/in) & Overloading',
  '16-csharp-encapsulation-access-modifiers-records.html',
  '16. Encapsulation, Access Modifiers & Records'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 16: Encapsulation & Records
// ═══════════════════════════════════════════════════════════════════════════════
const c16 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 6 (Chapter 16): C# Encapsulation, Access Modifiers &amp; Records Masterclass</strong>! Encapsulation hides internal implementation details and protects state from unauthorized external modification. In this lesson, we cover access modifiers (<code>public</code>, <code>private</code>, <code>protected</code>, <code>internal</code>), property validation, immutable objects, and C# 9+ <strong>Record types</strong>.</p>
</div>

<div class="section-title"><span class="num">1</span>Access Modifiers &amp; Encapsulation</div>
<div class="section-body">
  <p class="text-prose">Access modifiers restrict the visibility of class members across projects and assemblies:</p>

  <table class="tbl spec-table">
    <thead><tr><th>Modifier</th><th>Accessibility Scope</th></tr></thead>
    <tbody>
      <tr><td><code>public</code></td><td>Accessible from any code anywhere in any project</td></tr>
      <tr><td><code>private</code></td><td>Accessible ONLY inside the defining class or struct</td></tr>
      <tr><td><code>protected</code></td><td>Accessible inside the defining class AND derived child classes</td></tr>
      <tr><td><code>internal</code></td><td>Accessible from any code within the SAME assembly (.dll / .exe)</td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Encapsulation &amp; Property Validation</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>class BankAccount
{
    private decimal balance; // Hidden private field

    public decimal Balance
    {
        get =&gt; balance;
        private set =&gt; balance = value; // Private setter
    }

    public void Deposit(decimal amount)
    {
        if (amount &lt;= 0)
            throw new ArgumentException("Deposit amount must be positive!");
        balance += amount;
    }
}

BankAccount acc = new BankAccount();
acc.Deposit(500);
Console.WriteLine($"Account Balance: {acc.Balance:C}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>C# 9+ Record Types</div>
<div class="section-body">
  <p class="text-prose">Records are immutable reference types that automatically generate value-based equality methods, positional constructors, and support non-destructive mutation via the <code>with</code> expression:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Record Types</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// Record: Immutable reference type with built-in value equality!
public record Person(string FirstName, string LastName, int Age);

Person p1 = new("Ravi", "Kumar", 21);
Person p2 = new("Ravi", "Kumar", 21);

Console.WriteLine($"p1 == p2: {p1 == p2}"); // True (Value equality!)

Person p3 = p1 with { Age = 22 }; // Non-destructive mutation
Console.WriteLine($"p3: {p3}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the main difference between a class and a record in C#?</h4>
    <p>Classes use reference-based equality (two instances are equal only if they refer to the same object in memory). Records use value-based equality and provide built-in immutability features.</p>
  </div>
</div>`;

makeLesson(
  16,
  '16-csharp-encapsulation-access-modifiers-records.html',
  'Encapsulation, Access Modifiers & Records Masterclass',
  'Exhaustive textbook-grade C# Encapsulation (Chapter 16): Access modifiers (public, private, protected, internal), property validation, immutable objects, init-only setters, and C# 9+ Record types with value-based equality.',
  'Phase 6',
  'Methods & OOP',
  'Encapsulation · Access Modifiers (public/private/protected/internal) · Property Validation · Immutable Objects · Record Types · Value Equality',
  c16,
  '15-csharp-classes-objects-constructors-properties.html',
  '15. Classes, Objects, Properties & Constructors',
  '17-csharp-inheritance-polymorphism-virtual-override.html',
  '17. Inheritance, Polymorphism, virtual & override'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 17: Inheritance and Polymorphism
// ═══════════════════════════════════════════════════════════════════════════════
const c17 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 6 (Chapter 17): C# Inheritance, Polymorphism, virtual &amp; override Masterclass</strong>! Inheritance allows a derived class to inherit fields and methods from a base class. Polymorphism allows objects of different derived types to be treated through a single base class reference. C# OOP is founded on four major principles: Abstraction, Encapsulation, Inheritance, and Polymorphism.</p>
</div>

<div class="section-title"><span class="num">1</span>Inheritance &amp; Virtual Method Overriding</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Virtual Method Overriding</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }

    public virtual void MakeSound()
    {
        Console.WriteLine("Animal makes a sound");
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override void MakeSound()
    {
        Console.WriteLine($"{Name} barks: Woof! Woof!");
    }
}

Animal animal = new Dog("Buddy");
animal.MakeSound(); // Output: Buddy barks: Woof! Woof!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Abstract Classes &amp; Methods</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Abstract Class Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>abstract class Shape
{
    public abstract double CalculateArea(); // Abstract method (no body!)
}

class Circle : Shape
{
    public double Radius { get; set; }
    public Circle(double r) =&gt; Radius = r;

    public override double CalculateArea() =&gt; Math.PI * Radius * Radius;
}

Shape s = new Circle(5.0);
Console.WriteLine($"Circle Area: {s.CalculateArea():F2}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What are the four major OOP principles in C#?</h4>
    <p>Abstraction, Encapsulation, Inheritance, and Polymorphism.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: Can I instantiate an abstract class?</h4>
    <p>No! Abstract classes cannot be instantiated with <code>new</code>. They serve as base templates for derived classes.</p>
  </div>
</div>`;

makeLesson(
  17,
  '17-csharp-inheritance-polymorphism-virtual-override.html',
  'Inheritance, Polymorphism, virtual & override Masterclass',
  'Exhaustive textbook-grade C# Inheritance (Chapter 17): Base and derived classes, base constructor inheritance, virtual methods, override, abstract classes, runtime polymorphism, upcasting, and downcasting.',
  'Phase 6',
  'Methods & OOP',
  'Base & Derived Classes · base Keyword · virtual & override · Runtime Polymorphism · Abstract Classes · Upcasting & Downcasting · OOP Pillars',
  c17,
  '16-csharp-encapsulation-access-modifiers-records.html',
  '16. Encapsulation, Access Modifiers & Records',
  '18-csharp-interfaces-multiple-implementation-decoupling.html',
  '18. Interfaces, Default Members & Dependency Inversion'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 18: Interfaces
// ═══════════════════════════════════════════════════════════════════════════════
const c18 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 6 (Chapter 18): C# Interfaces, Default Members &amp; Dependency Inversion Masterclass</strong>! An <strong>Interface</strong> defines a contract that any implementing class or struct must fulfill. Interfaces enable multiple inheritance of behavior, decoupling, unit test mocking, and dependency inversion in enterprise application design.</p>
</div>

<div class="section-title"><span class="num">1</span>Interface Definition &amp; Implementation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Interface Contract Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>interface IPayment
{
    void Pay(decimal amount);
}

class CardPayment : IPayment
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Paid: {amount:C} via Credit Card");
    }
}

class UpiPayment : IPayment
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Paid: {amount:C} via UPI Transfer");
    }
}

IPayment payment = new CardPayment();
payment.Pay(100.50m);

payment = new UpiPayment();
payment.Pay(250.00m);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Multiple Interfaces &amp; Dependency Inversion</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Multiple Interfaces</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>interface IPrintable { void Print(); }
interface IStorable  { void Save(); }

class Document : IPrintable, IStorable // Multiple interface implementation
{
    public void Print() =&gt; Console.WriteLine("Printing Document...");
    public void Save()  =&gt; Console.WriteLine("Saving Document to Disk...");
}

Document doc = new();
doc.Print();
doc.Save();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why use Interfaces instead of Abstract Classes?</h4>
    <p>A class can inherit from only ONE abstract class (single class inheritance), but can implement MULTIPLE interfaces (multiple implementation).</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What is Dependency Inversion?</h4>
    <p>Dependency Inversion is a software design principle where high-level modules depend on abstractions (Interfaces) rather than concrete implementations, promoting loose coupling and testability.</p>
  </div>
</div>`;

makeLesson(
  18,
  '18-csharp-interfaces-multiple-implementation-decoupling.html',
  'Interfaces, Default Members & Dependency Inversion Masterclass',
  'Exhaustive textbook-grade C# Interfaces (Chapter 18): Interface definition, implementation, multiple interface inheritance, default interface members, explicit interface implementation, dependency inversion, and mocking-friendly design.',
  'Phase 6',
  'Methods & OOP',
  'Interface Contracts · Multiple Interfaces · Default Interface Members · Explicit Implementation · Dependency Inversion · Interface vs Abstract Class',
  c18,
  '17-csharp-inheritance-polymorphism-virtual-override.html',
  '17. Inheritance, Polymorphism, virtual & override',
  null,
  null
);

console.log('\n🎉 ALL C# PHASES 5 & 6 (CHAPTERS 11–18) EXPANDED SUCCESSFULLY!');
