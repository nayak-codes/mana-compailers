const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 3–6 (Chapters 7–18)...');

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
// CHAPTER 7: Operators
// ═══════════════════════════════════════════════════════════════════════════════
const c7 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 3 (Chapter 7): C# Operators Masterclass</strong>! Operators are special symbols that perform operations on one, two, or three operands. C# provides arithmetic, assignment, compound assignment, comparison, logical, increment/decrement, unary, ternary (<code>?:</code>), null-coalescing (<code>??</code>), null-conditional (<code>?.</code>), bitwise, type checking (<code>is</code>), type casting (<code>as</code>), and operator precedence rules.</p>
</div>

<div class="section-title"><span class="num">1</span>Arithmetic &amp; Assignment Operators</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Arithmetic &amp; Compound Assignment</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>int price = 100;
int discount = 20;
int finalPrice = price - discount;

Console.WriteLine($"Price: {price}, Discount: {discount}, Final Price: {finalPrice}");

// Compound Assignment Operators (+=, -=, *=, /=, %=)
int score = 50;
score += 10; // score = score + 10 (60)
score *= 2;  // score = score * 2 (120)
score %= 7;  // score = score % 7 (1)
Console.WriteLine($"Final Score: {score}");

// Increment (++) and Decrement (--) Operators
int count = 5;
Console.WriteLine($"Pre-increment: {++count}");  // 6 (increments first, then prints)
Console.WriteLine($"Post-increment: {count++}"); // 6 (prints first, then increments)
Console.WriteLine($"Value after post-increment: {count}"); // 7</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Comparison, Logical &amp; Ternary Operators</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Logical &amp; Ternary Operators</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>int age = 20;
bool hasID = true;

// Comparison Operators (==, !=, &gt;, &lt;, &gt;=, &lt;=)
bool canEnter = (age &gt;= 18) &amp;&amp; hasID; // Logical AND (&amp;&amp;)
Console.WriteLine($"Can Enter Club: {canEnter}");

bool isWeekend = true;
bool isHoliday = false;
bool canRest = isWeekend || isHoliday; // Logical OR (||)
Console.WriteLine($"Can Rest: {canRest}");

// Ternary Operator (condition ? expressionIfTrue : expressionIfFalse)
string status = (age &gt;= 18) ? "Adult" : "Minor";
Console.WriteLine($"Status: {status}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Null Operators — Null-Conditional (?.) &amp; Null-Coalescing (??)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Null Operators</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>string? name = null;

// 1. Null-Conditional Operator (?.) — Prevents NullReferenceException!
int? length = name?.Length; // If name is null, length becomes null instead of crashing!
Console.WriteLine($"Length: {length?.ToString() ?? "null"}");

// 2. Null-Coalescing Operator (??) — Fallback value if null
string displayName = name ?? "Guest User";
Console.WriteLine($"Welcome, {displayName}");

// 3. Null-Coalescing Assignment (??=) — Assigns ONLY if variable is null
name ??= "Default Name";
Console.WriteLine($"Name after ??=: {name}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Type Testing &amp; Casting — is &amp; as Operators</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — is and as Operators</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>object obj = "Hello C# Operators";

// 1. is operator with pattern matching (type checking + safe casting)
if (obj is string text)
{
    Console.WriteLine($"obj is string of length {text.Length}");
}

// 2. as operator (safe cast, returns null if conversion fails)
string? str = obj as string;
if (str != null)
{
    Console.WriteLine($"Safe cast string: {str.ToUpper()}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the difference between &amp;&amp; (short-circuit) and &amp; (logical)?</h4><p><code>&amp;&amp;</code> stops evaluation as soon as the result is known (if first condition is false, second is skipped). <code>&amp;</code> always evaluates both operands regardless of outcome.</p></div>
    <div class="faq-item"><h4>Q2: How does the 'as' operator differ from explicit casting (Type)obj?</h4><p>Explicit casting <code>(string)obj</code> throws an <code>InvalidCastException</code> if the type doesn't match. The <code>as</code> operator returns <code>null</code> without throwing an exception.</p></div>
  </div>
</div>`;

makeLesson(
  7,
  '07-csharp-operators-complete-guide.html',
  'C# Operators Complete Guide (Bitwise, Nullable, is/as & Precedence) Masterclass',
  'Exhaustive textbook-grade C# Operators (Chapter 7): Arithmetic, assignment, compound, comparison, logical, increment/decrement, ternary (?:), null-coalescing (??), null-conditional (?.), bitwise, is/as type operators, and precedence rules.',
  'Phase 3',
  'Operators & User Input',
  'Arithmetic · Assignment · Logical & Comparison · Ternary (?:) · Null-Coalescing (??) · Null-Conditional (?.) · is & as Operators · Bitwise · Operator Precedence',
  c7,
  '06-csharp-type-conversion-casting-parse-tryparse.html',
  '6. Type Conversion, Parse(), TryParse() & Boxing',
  '08-csharp-user-input-readline-parsing-validation.html',
  '8. User Input, Console.ReadLine() & Validation'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 8: User Input
// ═══════════════════════════════════════════════════════════════════════════════
const c8 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 3 (Chapter 8): C# User Input, Console.ReadLine(), Parsing &amp; Input Validation Masterclass</strong>! Interactive applications require capturing user input from the console terminal. In this chapter, we master <code>Console.ReadLine()</code>, reading strings, parsing numbers, handling empty/null input, building robust input validation loops, and constructing interactive CLI menus.</p>
</div>

<div class="section-title"><span class="num">1</span>Console.ReadLine() &amp; String Input</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Basic User Input</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>Console.Write("Enter your full name: ");
string? fullName = Console.ReadLine(); // Reads line of text entered by user

Console.WriteLine($"Hello, {fullName}! Welcome to C# Programming.");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Reading &amp; Parsing Numbers (TryParse Validation Pattern)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Safe Number Parsing</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>Console.Write("Enter your age: ");
string? ageInput = Console.ReadLine();

if (int.TryParse(ageInput, out int age))
{
    Console.WriteLine($"Parsed Age: {age}");
}
else
{
    Console.WriteLine("Invalid age entered!");
}

Console.Write("Enter product price: ");
if (decimal.TryParse(Console.ReadLine(), out decimal price))
{
    Console.WriteLine($"Product Price: {price:C}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Building a Robust Menu Input Loop</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Interactive Menu Input Loop</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>bool running = true;
while (running)
{
    Console.WriteLine("\n--- MAIN MENU ---");
    Console.WriteLine("1. Say Hello");
    Console.WriteLine("2. Calculate Square");
    Console.WriteLine("3. Exit");
    Console.Write("Choose an option (1-3): ");

    string? choice = Console.ReadLine();
    switch (choice)
    {
        case "1":
            Console.WriteLine("Hello User!");
            break;
        case "2":
            Console.Write("Enter a number: ");
            if (int.TryParse(Console.ReadLine(), out int num))
                Console.WriteLine($"Square of {num} is {num * num}");
            else
                Console.WriteLine("Invalid number!");
            break;
        case "3":
            running = false;
            Console.WriteLine("Exiting program. Goodbye!");
            break;
        default:
            Console.WriteLine("Invalid choice! Please enter 1, 2, or 3.");
            break;
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why does Console.ReadLine() return string? nullable?</h4><p>Because input can be empty or EOF (End Of File stream signal), <code>ReadLine()</code> returns <code>string?</code>. Always check for null or use <code>string.IsNullOrWhiteSpace()</code>.</p></div>
    <div class="faq-item"><h4>Q2: How do I read a single keypress without waiting for Enter?</h4><p>Use <code>Console.ReadKey()</code>. For example: <code>ConsoleKeyInfo key = Console.ReadKey();</code>.</p></div>
  </div>
</div>`;

makeLesson(
  8,
  '08-csharp-user-input-readline-parsing-validation.html',
  'User Input, Console.ReadLine() & Validation Masterclass',
  'Exhaustive textbook-grade C# User Input (Chapter 8): Console.ReadLine(), reading integers/decimals/chars, parsing, TryParse() fail-safe input validation loop, handling empty/null input, reading keypresses, and building interactive console menus.',
  'Phase 3',
  'Operators & User Input',
  'Console.ReadLine() · Reading Numbers & Chars · int.TryParse() Validation · Handling Empty Input · Menu-Driven Input Loop · Console.ReadKey()',
  c8,
  '07-csharp-operators-complete-guide.html',
  '7. All Operators (Bitwise, Nullable, is/as, Precedence)',
  '09-csharp-conditional-statements-switch-patterns.html',
  '9. Conditionals, Pattern Matching & Switch Expressions'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 9: Conditions & Switch Expressions
// ═══════════════════════════════════════════════════════════════════════════════
const c9 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 4 (Chapter 9): C# Conditionals, Pattern Matching &amp; Switch Expressions Masterclass</strong>! Conditional logic allows programs to make decisions based on runtime values. Modern C# provides traditional <code>if-else</code> structures alongside advanced <strong>Pattern Matching</strong>, relational patterns, property patterns, guard clauses (<code>when</code>), and elegant C# 8+ <strong>Switch Expressions</strong>.</p>
</div>

<div class="section-title"><span class="num">1</span>if, else if, else &amp; Guard Clauses</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Grade Evaluation Example</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>int marks = 78;

if (marks &gt;= 90)
{
    Console.WriteLine("Grade A");
}
else if (marks &gt;= 60)
{
    Console.WriteLine("Grade B");
}
else if (marks &gt;= 40)
{
    Console.WriteLine("Grade C");
}
else
{
    Console.WriteLine("Fail");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Modern C# Switch Expressions &amp; Pattern Matching</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — C# 8+ Switch Expression</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>int score = 85;

// Switch Expression (concise, returns a value directly!)
string grade = score switch
{
    &gt;= 90 =&gt; "A+",
    &gt;= 80 =&gt; "A",
    &gt;= 70 =&gt; "B",
    &gt;= 60 =&gt; "C",
    _     =&gt; "F"  // _ is the discard pattern (default case)
};

Console.WriteLine($"Score {score} -&gt; Grade {grade}");

// Switch with Guard Clause (when)
int age = 20;
bool hasTicket = true;

string access = (age, hasTicket) switch
{
    ( &gt;= 18, true ) =&gt; "Access Granted",
    ( &gt;= 18, false) =&gt; "Ticket Required",
    _               =&gt; "Underage"
};

Console.WriteLine($"Access Status: {access}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the advantage of switch expressions over traditional switch statements?</h4><p>Switch expressions are expression-bodied (they evaluate to a value), cleaner, immutable, and force compiler pattern exhaustiveness checks.</p></div>
    <div class="faq-item"><h4>Q2: What does the underscore '_' symbol mean in switch expressions?</h4><p>The underscore <code>_</code> is the <em>discard pattern</em> that matches any value, serving as the <code>default</code> case fallback.</p></div>
  </div>
</div>`;

makeLesson(
  9,
  '09-csharp-conditional-statements-switch-patterns.html',
  'Conditionals, Pattern Matching & Switch Expressions Masterclass',
  'Exhaustive textbook-grade C# Conditionals (Chapter 9): if/else if/else, nested conditions, ternary operator, pattern matching, switch statements, C# 8+ switch expressions, relational patterns, property patterns, and guard clauses.',
  'Phase 4',
  'Conditions & Loops',
  'if-else Ladders · Nested Conditions · Switch Statements · Switch Expressions (=>) · Discard Pattern (_) · Guard Clauses (when) · Relational Patterns',
  c9,
  '08-csharp-user-input-readline-parsing-validation.html',
  '8. User Input, Console.ReadLine() & Validation',
  '10-csharp-loops-for-while-foreach-practice.html',
  '10. Loops, foreach, Controls & 9 Practice Programs'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 10: Loops & Practice
// ═══════════════════════════════════════════════════════════════════════════════
const c10 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 4 (Chapter 10): C# Loops, foreach, Control Flow &amp; 9 Practice Programs Masterclass</strong>! Loops repeat a block of code until a specified condition is met. C# provides <code>for</code>, <code>while</code>, <code>do-while</code>, and <code>foreach</code> loops along with <code>break</code> and <code>continue</code> control statements. This chapter includes 9 essential practice programs (Factorial, Prime, Fibonacci, Star Patterns, Menu Calculator, etc.).</p>
</div>

<div class="section-title"><span class="num">1</span>Loop Types — for, while, do-while, foreach</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Loop Fundamentals</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. for loop
for (int i = 1; i &lt;= 5; i++)
{
    Console.Write($"{i} ");
}
Console.WriteLine();

// 2. while loop
int w = 1;
while (w &lt;= 3)
{
    Console.WriteLine($"while count: {w}");
    w++;
}

// 3. do-while loop (executes AT LEAST ONCE)
int d = 10;
do
{
    Console.WriteLine("Executes once even if condition is false!");
} while (d &lt; 5);

// 4. foreach loop (iterates through arrays/collections safely)
string[] languages = { "C#", "Python", "Java", "C++" };
foreach (string lang in languages)
{
    Console.WriteLine($"Language: {lang}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>9 Essential Practice Programs</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Prime, Fibonacci &amp; Star Pattern Programs</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. Even or Odd
int num = 17;
Console.WriteLine(num % 2 == 0 ? "Even" : "Odd");

// 2. Factorial of a Number
int n = 5;
long fact = 1;
for (int i = 1; i &lt;= n; i++) fact *= i;
Console.WriteLine($"Factorial of {n} = {fact}");

// 3. Fibonacci Series (first 7 terms)
int a = 0, b = 1;
Console.Write($"Fibonacci: {a} {b} ");
for (int i = 2; i &lt; 7; i++)
{
    int next = a + b;
    Console.Write($"{next} ");
    a = b;
    b = next;
}
Console.WriteLine();

// 4. Star Pattern (Pyramid)
for (int row = 1; row &lt;= 4; row++)
{
    for (int col = 1; col &lt;= row; col++)
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Can I modify an array element inside a foreach loop?</h4><p>No! The iteration variable in <code>foreach</code> is read-only. To modify array elements during iteration, use a standard <code>for</code> loop.</p></div>
    <div class="faq-item"><h4>Q2: What is the performance difference between for and foreach?</h4><p>For arrays, <code>for</code> and <code>foreach</code> have identical performance due to compiler optimizations. For collections like <code>List&lt;T&gt;</code>, <code>for</code> is slightly faster because it avoids allocating an enumerator object.</p></div>
  </div>
</div>`;

makeLesson(
  10,
  '10-csharp-loops-for-while-foreach-practice.html',
  'Loops, foreach, Controls & 9 Practice Programs Masterclass',
  'Exhaustive textbook-grade C# Loops (Chapter 10): for, while, do-while, foreach, break, continue, infinite loops, and 9 complete practice programs (Even/Odd, Factorial, Prime, Fibonacci, Multiplication table, Star Patterns, etc.).',
  'Phase 4',
  'Conditions & Loops',
  'for Loop · while Loop · do-while Loop · foreach Loop · break & continue · Factorial · Prime Number · Fibonacci Series · Star Patterns',
  c10,
  '09-csharp-conditional-statements-switch-patterns.html',
  '9. Conditionals, Pattern Matching & Switch Expressions',
  '11-csharp-strings-verbatim-raw-literals-stringbuilder.html',
  '11. Strings, Interpolation, Raw Literals & StringBuilder'
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAPTER 11: Strings & StringBuilder
// ═══════════════════════════════════════════════════════════════════════════════
const c11 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 5 (Chapter 11): C# Strings, Verbatim, Raw String Literals &amp; StringBuilder Masterclass</strong>! Strings in C# are immutable sequences of UTF-16 Unicode characters. In this chapter, we master string immutability, manipulation methods, string interpolation, verbatim strings (<code>@""</code>), C# 11 Raw String Literals (<code>"""..."""</code>), and high-performance string concatenation using <code>StringBuilder</code>.</p>
</div>

<div class="section-title"><span class="num">1</span>String Immutability &amp; Core Methods</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — String Methods Demonstration</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>string language = "  C# Programming  ";

Console.WriteLine($"Length: {language.Length}");
Console.WriteLine($"Trimmed: '{language.Trim()}'");
Console.WriteLine($"Upper: {language.Trim().ToUpper()}");
Console.WriteLine($"Contains 'C#': {language.Contains("C#")}");
Console.WriteLine($"Substring: {language.Trim().Substring(0, 2)}");

// String Split and Join
string csv = "Apple,Banana,Orange,Mango";
string[] fruits = csv.Split(',');
Console.WriteLine($"Joined with hyphen: {string.Join(" - ", fruits)}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Verbatim Strings (@) vs Raw String Literals (""") vs StringBuilder</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Modern String Features &amp; StringBuilder</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>using System.Text;

// 1. Verbatim String (@) — ignores escape sequences (\n, \t)
string path = @"C:\Users\Balaji\Documents\file.txt";
Console.WriteLine($"File Path: {path}");

// 2. C# 11 Raw String Literal (""") — multiline JSON/XML without escaping
string json = """
{
  "name": "Ravi",
  "age": 21,
  "role": "Developer"
}
""";
Console.WriteLine(json);

// 3. StringBuilder — Mutable string for fast concatenation in loops
StringBuilder sb = new StringBuilder();
for (int i = 1; i &lt;= 3; i++)
{
    sb.AppendLine($"Item #{i}: Processing...");
}
Console.WriteLine(sb.ToString());</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why are C# strings immutable?</h4><p>Immutability makes strings thread-safe, allows string interning (reusing identical string literals in memory), and prevents accidental modification when passed between methods.</p></div>
    <div class="faq-item"><h4>Q2: When should I use StringBuilder instead of + concatenation?</h4><p>Use <code>StringBuilder</code> when concatenating strings inside loops or executing more than 5-10 modifications, as repeated <code>+</code> creates temporary object allocations on the Heap.</p></div>
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
  <p>Welcome to <strong>Phase 5 (Chapter 12): C# Arrays (1D, 2D Multidimensional &amp; Jagged) Masterclass</strong>! An array is a fixed-size collection of elements of the same data type stored in contiguous memory locations. In this lesson, we explore single-dimensional arrays, 2D rectangular multidimensional arrays (<code>[,]</code>), array of arrays (jagged arrays <code>[][]</code>), array sorting, searching, and Array static methods.</p>
</div>

<div class="section-title"><span class="num">1</span>Single-Dimensional Arrays</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — 1D Array Operations</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>int[] marks = { 85, 90, 78, 92, 65 };

Console.WriteLine($"Array Length: {marks.Length}");

// Traversing array
foreach (int mark in marks)
{
    Console.WriteLine($"Mark: {mark}");
}

// Sorting and Binary Search
Array.Sort(marks);
Console.WriteLine($"Sorted Min: {marks[0]}, Max: {marks[^1]}"); // ^1 is last index in C# 8+

int searchIndex = Array.BinarySearch(marks, 90);
Console.WriteLine($"Index of 90: {searchIndex}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Multidimensional [,] vs Jagged [][] Arrays</div>
<div class="section-body">
  <div class="memory-diagram">Multidimensional vs Jagged Array Memory Layout:

  Multidimensional Matrix [2, 3]:       Jagged Array [][] (Array of Arrays):
  ┌────┬────┬────┐                    ┌───┐    ┌────┬────┬────┐
  │ 10 │ 20 │ 30 │                    │ 0 │───►│ 10 │ 20 │ 30 │ (Row 0: len 3)
  ├────┼────┼────┤                    ├───┤    ├────┼────┤
  │ 40 │ 50 │ 60 │                    │ 1 │───►│ 40 │ 50 │ (Row 1: len 2)
  └────┴────┴────┘                    └───┘    └────┴────┘</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — 2D Rectangular &amp; Jagged Arrays</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. Multidimensional 2D Array [rows, cols]
int[,] matrix = {
    { 1, 2, 3 },
    { 4, 5, 6 }
};
Console.WriteLine($"Matrix [1, 2] = {matrix[1, 2]}"); // Output: 6

// 2. Jagged Array (array of arrays with variable row lengths)
int[][] jagged = new int[2][];
jagged[0] = new int[] { 10, 20, 30 };
jagged[1] = new int[] { 40, 50 };

Console.WriteLine($"Jagged [1][0] = {jagged[1][0]}"); // Output: 40</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the main difference between multidimensional int[,] and jagged int[][] arrays?</h4><p><code>int[,]</code> is a single rectangular block of contiguous memory where every row must have identical columns. <code>int[][]</code> is an array of references to separate array objects, allowing each row to have a different length.</p></div>
    <div class="faq-item"><h4>Q2: Can arrays be resized in C#?</h4><p>No. Arrays are fixed in size once instantiated. <code>Array.Resize()</code> actually allocates a brand new array under the hood and copies elements over.</p></div>
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
  <p>Welcome to <strong>Phase 5 (Chapter 13): C# Generic Collections (List, Dictionary, HashSet, Stack &amp; Queue) Masterclass</strong>! Unlike fixed-size arrays, collections dynamically grow and shrink as data is added or removed. Generic types in the <code>System.Collections.Generic</code> namespace provide complete type safety and high performance by avoiding boxing/unboxing.</p>
</div>

<div class="section-title"><span class="num">1</span>List&lt;T&gt; &amp; Dictionary&lt;TKey, TValue&gt;</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — List&lt;T&gt; and Dictionary</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>using System.Collections.Generic;

// 1. List<T> — Dynamic Resizable Array
List&lt;string&gt; courses = new() { "C#", "ASP.NET Core", "SQL" };
courses.Add("Azure");
courses.Remove("SQL");

Console.WriteLine($"Course count: {courses.Count}");
foreach (string c in courses) Console.WriteLine($"Course: {c}");

// 2. Dictionary<TKey, TValue> — Fast O(1) Key-Value Lookup Table
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
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — HashSet, Queue, and Stack</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// 1. HashSet<T> — Unordered Unique Elements (Duplicates auto-ignored)
HashSet&lt;int&gt; uniqueIds = new() { 1, 2, 2, 3, 3, 3 };
Console.WriteLine($"Unique ID count: {uniqueIds.Count}"); // Output: 3

// 2. Queue<T> — FIFO (First In First Out)
Queue&lt;string&gt; ticketQueue = new();
ticketQueue.Enqueue("User1");
ticketQueue.Enqueue("User2");
Console.WriteLine($"Dequeued: {ticketQueue.Dequeue()}"); // User1

// 3. Stack<T> — LIFO (Last In First Out)
Stack&lt;string&gt; undoStack = new();
undoStack.Push("Action 1");
undoStack.Push("Action 2");
Console.WriteLine($"Popped: {undoStack.Pop()}"); // Action 2</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why are Generic Collections (System.Collections.Generic) better than Non-Generic Collections (ArrayList)?</h4><p>Generic collections provide compile-time type safety and eliminate performance overhead by preventing Boxing/Unboxing of value types.</p></div>
    <div class="faq-item"><h4>Q2: What is the lookup time complexity of Dictionary&lt;TKey, TValue&gt;?</h4><p>Average lookup, insertion, and deletion time complexity is O(1) constant time due to hash table indexing.</p></div>
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
  <p>Welcome to <strong>Phase 6 (Chapter 14): C# Methods, Parameter Modifiers (ref, out, in), Overloading &amp; Expression-Bodied Members Masterclass</strong>! Methods are reusable blocks of code that perform a specific action. In this chapter, we explore method signatures, default parameters, named arguments, method overloading, pass-by-reference modifiers (<code>ref</code>, <code>out</code>, <code>in</code>), expression-bodied methods (<code>=&gt;</code>), local functions, and recursion.</p>
</div>

<div class="section-title"><span class="num">1</span>Method Declaration &amp; Method Overloading</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Methods &amp; Overloading</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>class Calculator
{
    // Standard method
    public static int Add(int a, int b)
    {
        return a + b;
    }

    // Method Overloading (same name, different parameter types/counts)
    public static double Add(double a, double b)
    {
        return a + b;
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
      <tr><td><code>in</code></td><td>One-way (Read-only In)</td><td>Must be initialized before passing</td><td>ReadOnly — cannot modify (prevents copying large structs)</td></tr>
    </tbody>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — ref, out, and in Demonstration</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>static void Swap(ref int x, ref int y)
{
    int temp = x; x = y; y = temp;
}

static void GetValues(out int id, out string name)
{
    id = 101; // Mandatory assignment
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
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the main difference between ref and out?</h4><p>A <code>ref</code> variable must be initialized before passing to the method. An <code>out</code> variable does not need initialization beforehand, but the called method is required to assign it a value before returning.</p></div>
    <div class="faq-item"><h4>Q2: Why use the 'in' modifier?</h4><p>The <code>in</code> modifier passes arguments by reference without allowing modification, eliminating the memory copying cost of large <code>struct</code> objects.</p></div>
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
  <p>Welcome to <strong>Phase 6 (Chapter 15): C# Classes, Objects, Properties &amp; Constructors Masterclass</strong>! Object-Oriented Programming (OOP) organizes code into reusable <strong>Classes</strong> (blueprints) and <strong>Objects</strong> (instances). In this lesson, we explore fields, automatic properties (<code>{ get; set; }</code>), default and parameterized constructors, object initializers, <code>this</code> keyword, and static members.</p>
</div>

<div class="section-title"><span class="num">1</span>Class Definition &amp; Properties</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Student Class &amp; Auto-Properties</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>class Student
{
    // Auto-Properties with C# 9+ Target-Typed Initializers
    public string Name { get; set; } = "";
    public int Age { get; set; }
    public string Course { get; set; } = "C# Masterclass";

    // Default Constructor
    public Student() { }

    // Parameterized Constructor
    public Student(string name, int age)
    {
        this.Name = name;
        this.Age = age;
    }

    public void DisplayDetails()
    {
        Console.WriteLine($"Student: {Name}, Age: {Age}, Course: {Course}");
    }
}

// Object Instantiation & Object Initializer
Student s1 = new Student("Ravi", 20);
s1.DisplayDetails();

Student s2 = new()
{
    Name = "Alice",
    Age = 22
};
s2.DisplayDetails();</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Static Members &amp; Static Classes</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Static Members</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>class Counter
{
    public static int TotalCount = 0; // Shared across ALL instances

    public Counter()
    {
        TotalCount++;
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
Counter c3 = new Counter();

Console.WriteLine($"Total Objects Created: {Counter.TotalCount}"); // Output: 3</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the difference between a Field and a Property in C#?</h4><p>A Field is a raw private variable inside a class. A Property exposes a field safely using <code>get</code> and <code>set</code> accessors, providing encapsulation and data validation.</p></div>
    <div class="faq-item"><h4>Q2: What is the 'this' keyword used for?</h4><p><code>this</code> refers to the current instance of the class, resolving naming ambiguity between fields and parameters.</p></div>
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
  <p>Welcome to <strong>Phase 6 (Chapter 16): C# Encapsulation, Access Modifiers &amp; Records Masterclass</strong>! Encapsulation hides internal implementation details and restricts unauthorized external modification. In this lesson, we cover access modifiers (<code>public</code>, <code>private</code>, <code>protected</code>, <code>internal</code>), property validation, immutable objects, and modern C# 9+ <strong>Record types</strong>.</p>
</div>

<div class="section-title"><span class="num">1</span>Access Modifiers &amp; Property Validation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Encapsulation &amp; Property Validation</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>class BankAccount
{
    private decimal balance; // Private field (hidden)

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
Console.WriteLine($"Account Balance: {acc.Balance:C}");
// acc.Balance = 10000; // COMPILE ERROR: Private setter!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>C# 9+ Record Types — Immutable Data Containers</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Record Types</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>// Record type: Concise, value-equatable, immutable reference type
public record Person(string FirstName, string LastName, int Age);

Person p1 = new("Ravi", "Kumar", 21);
Person p2 = new("Ravi", "Kumar", 21);

// Record value-based equality!
Console.WriteLine($"p1 == p2: {p1 == p2}"); // True (value comparison!)

// Non-destructive mutation with 'with' expression
Person p3 = p1 with { Age = 22 };
Console.WriteLine($"p3: {p3}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the difference between a class and a record in C#?</h4><p>Classes use <em>reference-based equality</em> (two instances are equal only if they share the same memory pointer). Records automatically provide <em>value-based equality</em> and built-in non-destructive mutation (<code>with</code> expression).</p></div>
    <div class="faq-item"><h4>Q2: What does 'internal' access modifier mean?</h4><p><code>internal</code> restricts access to code within the same compiled assembly (DLL/EXE).</p></div>
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
  <p>Welcome to <strong>Phase 6 (Chapter 17): C# Inheritance, Runtime Polymorphism, virtual &amp; override Masterclass</strong>! Inheritance allows a derived class to inherit fields and methods from a base class. Polymorphism allows objects of different derived types to be treated through a single base class reference. In this chapter, we master <code>base</code> constructor chaining, <code>virtual</code> methods, <code>override</code>, <code>abstract</code> classes, upcasting, and downcasting.</p>
</div>

<div class="section-title"><span class="num">1</span>Inheritance &amp; Method Overriding (virtual &amp; override)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Polymorphism in Action</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }

    public virtual void MakeSound()
    {
        Console.WriteLine("Animal makes a generic sound");
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { } // base constructor chaining

    public override void MakeSound() // Overriding base virtual method
    {
        Console.WriteLine($"{Name} barks: Woof! Woof!");
    }
}

class Cat : Animal
{
    public Cat(string name) : base(name) { }

    public override void MakeSound()
    {
        Console.WriteLine($"{Name} meows: Meow!");
    }
}

// Polymorphism in action!
Animal animal1 = new Dog("Buddy");
Animal animal2 = new Cat("Whiskers");

animal1.MakeSound(); // Output: Buddy barks: Woof! Woof!
animal2.MakeSound(); // Output: Whiskers meows: Meow!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Abstract Classes &amp; Methods</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Abstract Class Example</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
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
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the four pillars of C# OOP?</h4><p>Abstraction, Encapsulation, Inheritance, and Polymorphism.</p></div>
    <div class="faq-item"><h4>Q2: Can I instantiate an abstract class?</h4><p>No! Abstract classes cannot be instantiated with <code>new</code>. They serve as base templates for derived classes.</p></div>
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
  <p>Welcome to <strong>Phase 6 (Chapter 18): C# Interfaces, Multiple Implementation &amp; Dependency Inversion Masterclass</strong>! An <strong>Interface</strong> defines a contract that any implementing class or struct must fulfill. Interfaces enable multiple inheritance of behavior, decoupling, testable architecture, and dependency inversion in enterprise .NET applications.</p>
</div>

<div class="section-title"><span class="num">1</span>Interface Definition &amp; Implementation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Interface Contract Example</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
<pre><code>interface IPayment
{
    void Pay(decimal amount); // Contract method signature
}

class CardPayment : IPayment
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Paid {amount:C} via Credit/Debit Card.");
    }
}

class UpiPayment : IPayment
{
    public void Pay(decimal amount)
    {
        Console.WriteLine($"Paid {amount:C} via Instant UPI Transfer.");
    }
}

// Loose Coupling / Dependency Inversion
IPayment paymentProcessor = new CardPayment();
paymentProcessor.Pay(1500.00m);

paymentProcessor = new UpiPayment();
paymentProcessor.Pay(250.00m);</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Multiple Interface Implementation</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C# — Multiple Interfaces</span><a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a></div>
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
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the main difference between an Abstract Class and an Interface in C#?</h4><p>A class can inherit from only ONE Abstract Class (single inheritance), but can implement MULTIPLE Interfaces (multiple implementation). Abstract classes can hold state (fields), while interfaces focus on contracts.</p></div>
    <div class="faq-item"><h4>Q2: What are Default Interface Methods in C# 8+?</h4><p>Default Interface Methods allow interfaces to provide concrete method implementations without breaking existing implementing classes.</p></div>
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

console.log('\n🎉 ALL C# PHASES 1–6 (CHAPTERS 1–18) GENERATED SUCCESSFULLY!');
