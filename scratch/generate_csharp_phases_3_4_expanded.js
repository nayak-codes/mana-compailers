const fs = require('fs');
const path = require('path');
const { wrapCSharpPage } = require('./build_csharp_master.js');

const csharpDir = path.join(__dirname, '..', 'public', 'blog-csharp');
console.log('🚀 Generating C# Masterclass Phases 3 & 4 (Chapters 7–10) — MASSIVE TEXTBOOK EDITION...');

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
// CHAPTER 7: Operators Complete Guide
// ═══════════════════════════════════════════════════════════════════════════════
const c7 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 3 (Chapter 7): C# Operators, Bitwise, Nullable &amp; Precedence Masterclass</strong>! Operators are fundamental tokens that instruct the compiler to perform specific mathematical, logical, relational, bitwise, or type operations. In this comprehensive textbook guide, we explore all C# operators: arithmetic, assignment, compound assignment, comparison, logical, increment/decrement, unary, ternary (<code>?:</code>), null-coalescing (<code>??</code>), null-conditional (<code>?.</code>), bitwise operators, type-testing operators (<code>is</code> &amp; <code>as</code>), and operator precedence rules.</p>
</div>

<div class="section-title"><span class="num">1</span>Arithmetic, Assignment &amp; Compound Assignment Operators</div>
<div class="section-body">
  <p class="text-prose">Arithmetic operators perform basic mathematical calculations. Compound assignment operators combine arithmetic with assignment to write shorter, cleaner expressions.</p>

  <table class="tbl spec-table">
    <thead><tr><th>Operator</th><th>Category</th><th>Description</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>+</code></td><td>Arithmetic</td><td>Addition (or String concatenation)</td><td><code>5 + 3 == 8</code></td></tr>
      <tr><td><code>-</code></td><td>Arithmetic</td><td>Subtraction</td><td><code>10 - 4 == 6</code></td></tr>
      <tr><td><code>*</code></td><td>Arithmetic</td><td>Multiplication</td><td><code>4 * 5 == 20</code></td></tr>
      <tr><td><code>/</code></td><td>Arithmetic</td><td>Division (integer division truncates decimal!)</td><td><code>7 / 2 == 3</code> (int) | <code>7.0 / 2 == 3.5</code></td></tr>
      <tr><td><code>%</code></td><td>Arithmetic</td><td>Modulus (remainder of division)</td><td><code>17 % 5 == 2</code></td></tr>
      <tr><td><code>+=</code></td><td>Compound</td><td>Add and Assign</td><td><code>x += 5</code> (same as <code>x = x + 5</code>)</td></tr>
      <tr><td><code>-=</code></td><td>Compound</td><td>Subtract and Assign</td><td><code>x -= 3</code></td></tr>
      <tr><td><code>*=</code></td><td>Compound</td><td>Multiply and Assign</td><td><code>x *= 2</code></td></tr>
      <tr><td><code>/=</code></td><td>Compound</td><td>Divide and Assign</td><td><code>x /= 4</code></td></tr>
      <tr><td><code>%=</code></td><td>Compound</td><td>Modulus and Assign</td><td><code>x %= 3</code></td></tr>
    </tbody>
  </table>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Arithmetic &amp; Compound Assignment Code</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int price = 100;
int discount = 20;
int finalPrice = price - discount;

Console.WriteLine($"Price: {price}, Discount: {discount}, Final Price: {finalPrice}");

// Compound assignment
int score = 50;
score += 10; // 60
score *= 2;  // 120
score %= 7;  // 1
Console.WriteLine($"Calculated Score: {score}");

// Pre-increment vs Post-increment
int count = 5;
Console.WriteLine($"Pre-increment (++count): {++count}");   // Outputs 6 (increments first)
Console.WriteLine($"Post-increment (count++): {count++}");  // Outputs 6 (prints, then increments to 7)
Console.WriteLine($"Final count value: {count}");            // Outputs 7</code></pre>
  </div>

  <div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:14px;">
    <strong style="color:#a78bfa;">🔍 Code Mechanics Breakdown:</strong>
    <ul style="margin:8px 0 0 18px; line-height:1.7; color:var(--text2);">
      <li><code>price - discount</code>: Subtracts integer 20 from 100, storing 80 in <code>finalPrice</code>.</li>
      <li><code>++count</code> (Pre-increment): Modifies the variable <em>before</em> evaluating the surrounding expression.</li>
      <li><code>count++</code> (Post-increment): Evaluates the surrounding expression using the original value <em>before</em> incrementing memory.</li>
    </ul>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Comparison &amp; Logical Operators</div>
<div class="section-body">
  <p class="text-prose">Comparison operators compare two values and return a boolean (<code>true</code> or <code>false</code>). Logical operators combine multiple boolean expressions.</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Comparison &amp; Logical Operators</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int age = 20;
bool hasID = true;

// Comparison: ==, !=, &gt;, &lt;, &gt;=, &lt;=
// Logical AND (&amp;&amp;): true ONLY IF both conditions are true
bool canEnterClub = (age &gt;= 18) &amp;&amp; hasID;
Console.WriteLine($"Can enter club: {canEnterClub}");

// Logical OR (||): true IF AT LEAST ONE condition is true
bool isWeekend = true;
bool isHoliday = false;
bool canRest = isWeekend || isHoliday;
Console.WriteLine($"Can rest: {canRest}");

// Logical NOT (!): Inverts boolean value
bool isRaining = false;
Console.WriteLine($"Is clear weather: {!isRaining}");

// Ternary Operator (condition ? valueIfTrue : valueIfFalse)
string status = (age &gt;= 18) ? "Adult" : "Minor";
Console.WriteLine($"User Status: {status}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Null Operators — Null-Conditional (?.) &amp; Null-Coalescing (??)</div>
<div class="section-body">
  <p class="text-prose">C# provides built-in operators specifically designed to handle <code>null</code> values safely without throwing dangerous <code>NullReferenceException</code> crashes:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Null Handling Operators</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>string? name = null;

// 1. Null-Conditional Operator (?.) — Safe property access
// If name is null, returns null instead of throwing NullReferenceException!
int? nameLength = name?.Length;
Console.WriteLine($"Length: {nameLength?.ToString() ?? "null"}");

// 2. Null-Coalescing Operator (??) — Fallback value if null
string displayName = name ?? "Guest User";
Console.WriteLine($"Hello, {displayName}!");

// 3. Null-Coalescing Assignment Operator (??=) — Assigns value ONLY IF variable is null
name ??= "Default Ravi";
Console.WriteLine($"Name after ??=: {name}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Type Testing &amp; Casting — is and as Operators</div>
<div class="section-body">
  <p class="text-prose">When working with object hierarchies or interface references, the <code>is</code> and <code>as</code> operators provide safe type checking and casting:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — is and as Operators</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>object data = "Hello C# Masterclass";

// 1. 'is' operator with pattern matching variable declaration
if (data is string text)
{
    Console.WriteLine($"data is a string of length {text.Length}: '{text}'");
}

// 2. 'as' operator (safe cast — returns null if conversion fails, NO EXCEPTION!)
string? strVal = data as string;
if (strVal != null)
{
    Console.WriteLine($"Safe cast string upper: {strVal.ToUpper()}");
}

object numObj = 42;
string? badCast = numObj as string; // badCast is null (does not throw exception!)
Console.WriteLine($"Bad cast result: {badCast ?? "NULL"}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Bitwise Operators</div>
<div class="section-body">
  <p class="text-prose">Bitwise operators manipulate data at the individual binary bit level (0 and 1). They are heavily used in graphics programming, low-level networking, cryptography, and flags.</p>

  <table class="tbl spec-table">
    <thead><tr><th>Operator</th><th>Name</th><th>Operation</th><th>Example (a=5 / 0101, b=3 / 0011)</th></tr></thead>
    <tbody>
      <tr><td><code>&amp;</code></td><td>Bitwise AND</td><td>1 if both bits are 1</td><td><code>5 &amp; 3 == 1</code> (0001)</td></tr>
      <tr><td><code>|</code></td><td>Bitwise OR</td><td>1 if at least one bit is 1</td><td><code>5 | 3 == 7</code> (0111)</td></tr>
      <tr><td><code>^</code></td><td>Bitwise XOR</td><td>1 if bits are different</td><td><code>5 ^ 3 == 6</code> (0110)</td></tr>
      <tr><td><code>~</code></td><td>Bitwise NOT</td><td>Inverts all bits</td><td><code>~5 == -6</code></td></tr>
      <tr><td><code>&lt;&lt;</code></td><td>Left Shift</td><td>Shifts bits left (multiplies by 2^n)</td><td><code>5 &lt;&lt; 1 == 10</code></td></tr>
      <tr><td><code>&gt;&gt;</code></td><td>Right Shift</td><td>Shifts bits right (divides by 2^n)</td><td><code>5 &gt;&gt; 1 == 2</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">6</span>Operator Precedence Table</div>
<div class="section-body">
  <p class="text-prose">When an expression contains multiple operators, operator precedence determines the order of evaluation (from highest to lowest):</p>

  <table class="tbl spec-table">
    <thead><tr><th>Precedence Rank</th><th>Category</th><th>Operators</th></tr></thead>
    <tbody>
      <tr><td>1 (Highest)</td><td>Primary / Postfix</td><td><code>x.y</code>, <code>x?.y</code>, <code>f(x)</code>, <code>a[i]</code>, <code>x++</code>, <code>x--</code>, <code>new</code></td></tr>
      <tr><td>2</td><td>Unary</td><td><code>+x</code>, <code>-x</code>, <code>!x</code>, <code>~x</code>, <code>++x</code>, <code>--x</code>, <code>(Type)x</code>, <code>await</code></td></tr>
      <tr><td>3</td><td>Multiplicative</td><td><code>*</code>, <code>/</code>, <code>%</code></td></tr>
      <tr><td>4</td><td>Additive</td><td><code>+</code>, <code>-</code></td></tr>
      <tr><td>5</td><td>Shift</td><td><code>&lt;&lt;</code>, <code>&gt;&gt;</code></td></tr>
      <tr><td>6</td><td>Relational &amp; Type</td><td><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>is</code>, <code>as</code></td></tr>
      <tr><td>7</td><td>Equality</td><td><code>==</code>, <code>!=</code></td></tr>
      <tr><td>8</td><td>Logical AND</td><td><code>&amp;</code></td></tr>
      <tr><td>9</td><td>Logical XOR</td><td><code>^</code></td></tr>
      <tr><td>10</td><td>Logical OR</td><td><code>|</code></td></tr>
      <tr><td>11</td><td>Conditional AND</td><td><code>&amp;&amp;</code></td></tr>
      <tr><td>12</td><td>Conditional OR</td><td><code>||</code></td></tr>
      <tr><td>13</td><td>Null-Coalescing</td><td><code>??</code></td></tr>
      <tr><td>14</td><td>Ternary</td><td><code>c ? t : f</code></td></tr>
      <tr><td>15 (Lowest)</td><td>Assignment</td><td><code>=</code>, <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code>, <code>??=</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">7</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is short-circuit evaluation in &amp;&amp; and || operators?</h4>
    <p>Short-circuit evaluation means the compiler stops evaluating an expression as soon as the result is determined. For <code>&amp;&amp;</code>, if the first condition is false, the second condition is completely skipped. For <code>||</code>, if the first condition is true, the second condition is skipped.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How does the 'as' operator differ from explicit casting (Type)obj?</h4>
    <p>Explicit casting <code>(string)obj</code> throws an <code>InvalidCastException</code> if the object is not of that type. The <code>as</code> operator performs a safe cast and returns <code>null</code> if the cast fails without throwing any exception.</p>
  </div>
  <div class="faq-card">
    <h4>Q3: What is the difference between ?? and ??= ?</h4>
    <p><code>a ?? b</code> returns <code>b</code> if <code>a</code> is null. <code>a ??= b</code> assigns <code>b</code> to <code>a</code> ONLY IF <code>a</code> is currently null.</p>
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
  <p>Welcome to <strong>Phase 3 (Chapter 8): C# User Input, Console.ReadLine(), Parsing &amp; Input Validation Masterclass</strong>! Capturing input from the console terminal is essential for building interactive software. In this lesson, we explore reading strings via <code>Console.ReadLine()</code>, parsing integers, decimals, and characters, handling null/empty inputs, building fail-safe validation loops with <code>int.TryParse()</code>, and constructing interactive CLI menu loops.</p>
</div>

<div class="section-title"><span class="num">1</span>Console.ReadLine() &amp; String Input</div>
<div class="section-body">
  <p class="text-prose">The <code>Console.ReadLine()</code> method pauses execution and waits for the user to type text into the terminal window and press <kbd>Enter</kbd>. It returns the entered text as a nullable string (<code>string?</code>).</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Basic User Input</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>Console.Write("Enter your name: ");
string? name = Console.ReadLine();

Console.WriteLine($"Hello, {name}! Welcome to C# Masterclass.");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Reading &amp; Parsing Numbers (TryParse Pattern)</div>
<div class="section-body">
  <p class="text-prose">Because <code>Console.ReadLine()</code> always returns a string, converting it to numbers requires parsing. Using <code>int.Parse()</code> directly on invalid user input throws a <code>FormatException</code>. The <strong><code>int.TryParse()</code> pattern</strong> is the industry standard for safe parsing without exceptions:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Safe Input Validation with TryParse</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>Console.Write("Enter your age: ");
string? ageInput = Console.ReadLine();

// int.TryParse returns true if successful and populates the out variable 'age'
if (int.TryParse(ageInput, out int age))
{
    Console.WriteLine($"Valid Age: {age}");
}
else
{
    Console.WriteLine("Invalid age entered! Please enter a valid integer.");
}

// Reading Decimals (Salary / Price)
Console.Write("Enter salary: ");
if (decimal.TryParse(Console.ReadLine(), out decimal salary))
{
    Console.WriteLine($"Entered Salary: {salary:C}");
}

// Reading Characters (Grade / Choice)
Console.Write("Enter grade (A, B, C): ");
if (char.TryParse(Console.ReadLine(), out char grade))
{
    Console.WriteLine($"Grade Character: {grade}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Handling Empty Input &amp; Input Validation Loop</div>
<div class="section-body">
  <p class="text-prose">To prevent users from entering blank strings or invalid data, wrap <code>Console.ReadLine()</code> in a validation loop:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Fail-Safe Input Validation Loop</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>string? username;

// Prompt repeatedly until user provides a non-empty name
do
{
    Console.Write("Enter a valid non-empty username: ");
    username = Console.ReadLine();
} while (string.IsNullOrWhiteSpace(username));

Console.WriteLine($"Username set to: '{username.Trim()}'");

// Number validation loop
int validAge;
Console.Write("Enter your age (1-120): ");
while (!int.TryParse(Console.ReadLine(), out validAge) || validAge &lt; 1 || validAge &gt; 120)
{
    Console.Write("Invalid age! Please enter a number between 1 and 120: ");
}

Console.WriteLine($"Confirmed Age: {validAge}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Building an Interactive Menu Input System</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Interactive Menu System</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>bool running = true;
while (running)
{
    Console.WriteLine("\n=== C# CONSOLE APPLICATION MENU ===");
    Console.WriteLine("1. Greet User");
    Console.WriteLine("2. Calculate Square of a Number");
    Console.WriteLine("3. Exit Application");
    Console.Write("Select an option (1-3): ");

    string? option = Console.ReadLine();
    switch (option)
    {
        case "1":
            Console.WriteLine("Hello! Hope you are enjoying C#!");
            break;
        case "2":
            Console.Write("Enter a number: ");
            if (int.TryParse(Console.ReadLine(), out int n))
                Console.WriteLine($"Square of {n} is {n * n}");
            else
                Console.WriteLine("Invalid number!");
            break;
        case "3":
            running = false;
            Console.WriteLine("Exiting menu... Goodbye!");
            break;
        default:
            Console.WriteLine("Invalid choice! Please select 1, 2, or 3.");
            break;
    }
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Why does Console.ReadLine() return string? nullable?</h4>
    <p>Because the input stream could reach EOF (End of File) or be cancelled, <code>Console.ReadLine()</code> returns <code>string?</code> (nullable string). Always handle potential null or empty values.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: How do I read a single keypress without requiring the user to press Enter?</h4>
    <p>Use <code>Console.ReadKey()</code>. For example: <code>ConsoleKeyInfo key = Console.ReadKey(intercept: true);</code>.</p>
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
  <p>Welcome to <strong>Phase 4 (Chapter 9): C# Conditionals, Pattern Matching &amp; Switch Expressions Masterclass</strong>! Conditional logic allows programs to branch execution dynamically based on runtime data. In this chapter, we cover <code>if</code>, <code>else if</code>, <code>else</code>, nested conditions, ternary operator, pattern matching, traditional <code>switch</code> statements, and modern C# 8+ <strong>Switch Expressions</strong> with relational patterns and guard clauses (<code>when</code>).</p>
</div>

<div class="section-title"><span class="num">1</span>if, else if, else Ladders &amp; Guard Clauses</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — if-else Ladder Example</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int marks = 78;

if (marks &gt;= 90)
{
    Console.WriteLine("Grade A - Excellent!");
}
else if (marks &gt;= 60)
{
    Console.WriteLine("Grade B - First Class");
}
else if (marks &gt;= 40)
{
    Console.WriteLine("Grade C - Pass");
}
else
{
    Console.WriteLine("Fail - Needs Improvement");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Modern C# Switch Expressions &amp; Pattern Matching</div>
<div class="section-body">
  <p class="text-prose">C# 8+ introduced <strong>Switch Expressions</strong>, which replace verbose switch statements with lightweight, expression-bodied pattern matching:</p>

  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Switch Expressions &amp; Relational Patterns</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>int score = 85;

// C# 8+ Switch Expression (returns a value directly!)
string grade = score switch
{
    &gt;= 90 =&gt; "A+",
    &gt;= 80 =&gt; "A",
    &gt;= 70 =&gt; "B",
    &gt;= 60 =&gt; "C",
    _     =&gt; "F"  // _ is the discard pattern (default case)
};

Console.WriteLine($"Score {score} -&gt; Grade: {grade}");

// Switch Expression with Tuple Pattern Matching &amp; Guard Clauses
int age = 20;
bool hasTicket = true;

string accessResult = (age, hasTicket) switch
{
    ( &gt;= 18, true ) =&gt; "Access Granted - Enjoy the event!",
    ( &gt;= 18, false) =&gt; "Access Denied - Ticket required.",
    _               =&gt; "Access Denied - Minimum age is 18."
};

Console.WriteLine($"Result: {accessResult}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: What is the discard pattern '_' in switch expressions?</h4>
    <p>The underscore <code>_</code> matches any value. It acts as the <code>default</code> fallback case in switch expressions.</p>
  </div>
  <div class="faq-card">
    <h4>Q2: What are relational patterns in C# 9+?</h4>
    <p>Relational patterns allow using relational operators like <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> directly inside switch patterns (e.g., <code>&gt;= 90 =&gt; "A"</code>).</p>
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
  <p>Welcome to <strong>Phase 4 (Chapter 10): C# Loops, foreach, Control Flow &amp; 9 Practice Programs Masterclass</strong>! Loops iterate blocks of code until a condition evaluates to false. C# provides <code>for</code>, <code>while</code>, <code>do-while</code>, and <code>foreach</code> loops along with <code>break</code> and <code>continue</code> controls. This chapter includes 9 essential practice programs (Even/Odd, Largest of 3, Factorial, Prime, Fibonacci, Multiplication table, Number reversal, Star patterns, Menu calculator).</p>
</div>

<div class="section-title"><span class="num">1</span>Loop Types — for, while, do-while, foreach</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — Loop Constructs</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. for loop
for (int number = 1; number &lt;= 5; number++)
{
    Console.WriteLine($"for count: {number}");
}

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
    Console.WriteLine("do-while executes at least once!");
} while (d &lt; 5);

// 4. foreach loop (safely iterates arrays and collections)
string[] courses = { "C#", "ASP.NET Core", "SQL", "Azure" };
foreach (string course in courses)
{
    Console.WriteLine($"Course: {course}");
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>9 Essential C# Practice Programs</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header">
      <span class="lang-tag">C# — 9 Complete Practice Solutions</span>
      <a class="try-btn" href="/online-csharp-compiler.html">▶ Run in Compiler</a>
    </div>
    <pre><code>// 1. Even or Odd
int num = 17;
Console.WriteLine($"{num} is {(num % 2 == 0 ? "Even" : "Odd")}");

// 2. Largest of Three Numbers
int x = 25, y = 42, z = 18;
int max = (x &gt; y &amp;&amp; x &gt; z) ? x : (y &gt; z ? y : z);
Console.WriteLine($"Largest of ({x}, {y}, {z}) = {max}");

// 3. Factorial of a Number (5!)
int n = 5;
long factorial = 1;
for (int i = 1; i &lt;= n; i++) factorial *= i;
Console.WriteLine($"Factorial of {n} = {factorial}");

// 4. Prime Number Check
int primeCandidate = 29;
bool isPrime = true;
for (int i = 2; i * i &lt;= primeCandidate; i++)
{
    if (primeCandidate % i == 0) { isPrime = false; break; }
}
Console.WriteLine($"{primeCandidate} is Prime: {isPrime}");

// 5. Fibonacci Series (first 8 terms)
int f1 = 0, f2 = 1;
Console.Write($"Fibonacci: {f1} {f2} ");
for (int i = 2; i &lt; 8; i++)
{
    int fNext = f1 + f2;
    Console.Write($"{fNext} ");
    f1 = f2;
    f2 = fNext;
}
Console.WriteLine();

// 6. Multiplication Table of 7
int tableNum = 7;
for (int i = 1; i &lt;= 5; i++)
{
    Console.WriteLine($"{tableNum} x {i} = {tableNum * i}");
}

// 7. Number Reversal (12345 -&gt; 54321)
int original = 12345, reversed = 0, temp = original;
while (temp &gt; 0)
{
    reversed = (reversed * 10) + (temp % 10);
    temp /= 10;
}
Console.WriteLine($"Reversed {original} -&gt; {reversed}");

// 8. Star Pyramid Pattern
for (int row = 1; row &lt;= 4; row++)
{
    for (int col = 1; col &lt;= row; col++)
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}

// 9. Menu-Driven Calculator
int num1 = 10, num2 = 5;
char op = '+';
int calcResult = op switch
{
    '+' =&gt; num1 + num2,
    '-' =&gt; num1 - num2,
    '*' =&gt; num1 * num2,
    '/' =&gt; num1 / num2,
    _   =&gt; 0
};
Console.WriteLine($"Calculator ({num1} {op} {num2}) = {calcResult}");</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-card">
    <h4>Q1: Can I modify array elements inside a foreach loop?</h4>
    <p>No! Iteration variables in <code>foreach</code> loops are read-only. To modify array values, use a standard <code>for</code> loop.</p>
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

console.log('\n🎉 ALL C# PHASES 3 & 4 (CHAPTERS 7–10) GENERATED SUCCESSFULLY!');
