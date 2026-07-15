/**
 * expand_all_languages.js
 * Expands all remaining language tutorial articles with rich content.
 * Covers Python, JavaScript, C, C++, Go, Rust, PHP, Ruby
 */

const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');

// ─────────────────────────────────────────────────────────────────────────────
// SHARED SECTION TEMPLATES BY TOPIC
// ─────────────────────────────────────────────────────────────────────────────

function syntaxSections(lang, langUrl, helloCode, noteText, deepCode, deepLabel) {
  return `
<div class="intro-box">
  <p>Before writing any logic, you need to understand the basic syntax rules of ${lang}. This lesson covers how ${lang} programs are structured, how to write output, how comments work, and what makes ${lang}'s syntax distinctive compared to other languages.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Hello World — Your First ${lang} Program</div>
<p>Every programmer's first step is printing output. Here's how to write a basic program in ${lang}:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Hello World</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${helloCode}</code></pre></div>
${noteText}
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Comments in ${lang}</div>
<p>Comments are notes in your code that the compiler/interpreter ignores. They're essential for documentation and making code readable for others (and your future self).</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${deepLabel}</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${deepCode}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Code Structure &amp; Indentation</div>
<p>Every language has conventions for organizing code. Following them makes your code more readable and maintainable. ${lang} programs are typically organized into logical blocks — learn the conventions early to write clean code from the start.</p>
<div class="info-box"><strong>💡 Best Practice:</strong> Use consistent indentation (4 spaces or 1 tab, never mix). Name variables descriptively — <code>userAge</code> is better than <code>a</code>. Add comments to explain <em>why</em>, not just <em>what</em>.</div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> Output Functions</div>
<p>Printing to the console is the most basic debugging and communication tool. Learn the output function(s) thoroughly — you'll use them constantly while learning.</p>
<table class="tbl">
  <tr><th>Feature</th><th>Details</th></tr>
  <tr><td>Basic output</td><td>Print text, numbers, and expressions to standard output</td></tr>
  <tr><td>String formatting</td><td>Embed variable values inside strings cleanly</td></tr>
  <tr><td>Newlines</td><td>Control whether each print adds a newline at the end</td></tr>
  <tr><td>Error output</td><td>Print to standard error for debugging messages</td></tr>
</table>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: Do I need to install ${lang} to run code?</strong><br/>No — use Our Compiler to write, run, and test ${lang} code directly in your browser. No installation required.</p>
<p><strong>Q: Is ${lang} case-sensitive?</strong><br/>Yes, like most modern languages, ${lang} is case-sensitive. <code>Name</code>, <code>name</code>, and <code>NAME</code> are three different identifiers.</p>
<p><strong>Q: How do I fix syntax errors?</strong><br/>Read the error message carefully — it tells you the line number and type of issue. Common causes: missing brackets, typos in keywords, or incorrect indentation.</p>
</div>`;
}

function variablesSections(lang, langUrl, varCode, typeTable, castCode) {
  return `
<div class="intro-box">
  <p>Variables store data that your program works with. In ${lang}, understanding how variables are declared, what types they can hold, and how type conversions work is fundamental to writing correct, efficient code.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Declaring Variables</div>
<p>Variables give names to values so you can refer to them throughout your code. Here's how ${lang} handles variable declarations:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Variables</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${varCode}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Data Types Reference</div>
<p>Every value in ${lang} has a type. Understanding types prevents bugs and helps you choose the most efficient representation for your data:</p>
${typeTable}
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Type Conversion &amp; Casting</div>
<p>Converting values between types is a common operation. Some conversions happen automatically (implicit), others require explicit code:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Type Conversion</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${castCode}</code></pre></div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> Naming Conventions</div>
<ul style="color:#c9d1d9; padding-left:24px; line-height:2.2; font-size:15px;">
  <li>Use descriptive names: <code>userAge</code> not <code>a</code></li>
  <li>Use camelCase for local variables in most languages</li>
  <li>Use UPPER_CASE for constants</li>
  <li>Avoid single-letter names except for loop counters (<code>i</code>, <code>j</code>)</li>
  <li>Start names with a letter or underscore, never a digit</li>
</ul>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: What happens if I use a variable before declaring it?</strong><br/>Most compiled languages give a compile-time error. Interpreted languages may throw a runtime error. Always declare variables before using them.</p>
<p><strong>Q: Can two variables have the same name?</strong><br/>Not in the same scope. In different scopes (e.g., different functions), variables with the same name are independent and don't interfere.</p>
<p><strong>Q: Should I always initialize variables when I declare them?</strong><br/>Yes — using an uninitialized variable leads to undefined behavior or runtime errors. Always assign an initial value at declaration time.</p>
</div>`;
}

function conditionalsSections(lang, langUrl, ifCode, switchCode) {
  return `
<div class="intro-box">
  <p>Conditionals are the decision-makers of your program. They let your code take different paths based on data values — this is what makes programs intelligent rather than rigid scripts. ${lang} provides several conditional constructs, each suited for different situations.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> if / else if / else</div>
<p>The most fundamental conditional. Evaluates conditions top-to-bottom and executes the first matching branch:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — if / else</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${ifCode}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Switch / Match Statement</div>
<p>Use switch (or match in newer languages) when comparing a single value against multiple constants. Cleaner than long if-else chains:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Switch</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${switchCode}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Comparison &amp; Logical Operators</div>
<table class="tbl">
  <tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
  <tr><td><code>==</code></td><td>Equal to</td><td><code>x == 10</code></td></tr>
  <tr><td><code>!=</code></td><td>Not equal</td><td><code>x != 0</code></td></tr>
  <tr><td><code>&gt;</code>, <code>&lt;</code></td><td>Greater/Less than</td><td><code>age &gt; 18</code></td></tr>
  <tr><td><code>&amp;&amp;</code> / <code>and</code></td><td>AND — both must be true</td><td><code>a &gt; 0 &amp;&amp; b &gt; 0</code></td></tr>
  <tr><td><code>||</code> / <code>or</code></td><td>OR — at least one must be true</td><td><code>a == 0 || b == 0</code></td></tr>
  <tr><td><code>!</code> / <code>not</code></td><td>NOT — inverts the condition</td><td><code>!isReady</code></td></tr>
</table>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: How many else-if branches can I have?</strong><br/>As many as you need — but more than 4-5 branches usually indicates a switch or a data-driven approach (like a map/dictionary) would be cleaner.</p>
<p><strong>Q: Can I use a variable assignment inside an if condition?</strong><br/>Depends on the language. In C and Go, this is allowed. In Java and Python, it's not (or requires specific syntax). Avoid it for clarity unless the language specifically supports it idiomatically.</p>
<p><strong>Q: What is a ternary operator?</strong><br/>A compact one-liner alternative to if-else: <code>condition ? valueIfTrue : valueIfFalse</code>. Use it for simple assignments, not complex logic.</p>
</div>`;
}

function loopsSections(lang, langUrl, forCode, whileCode, foreachCode) {
  return `
<div class="intro-box">
  <p>Loops are the workhorses of programming. They allow your code to repeat operations efficiently — whether processing a million data entries, generating output tables, or implementing game logic. Mastering loops is essential for every ${lang} developer.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> for Loop</div>
<p>The classic for loop repeats code a fixed number of times. It combines initialization, condition-checking, and update in one line:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — for Loop</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${forCode}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> while Loop</div>
<p>Use while loops when you don't know in advance how many iterations you need — the loop continues as long as the condition stays true:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — while Loop</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${whileCode}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Iterating Over Collections</div>
<p>Most ${lang} programs need to iterate over arrays, lists, or other collections. Here's the idiomatic way to do it:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Collection Iteration</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${foreachCode}</code></pre></div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> break &amp; continue</div>
<ul style="color:#c9d1d9; padding-left:24px; line-height:2.2; font-size:15px;">
  <li><code>break</code> — exits the loop immediately, skipping all remaining iterations</li>
  <li><code>continue</code> — skips the rest of the current iteration and moves to the next one</li>
  <li>Both work in <code>for</code> and <code>while</code> loops</li>
  <li>Avoid overusing <code>break</code> — it can make loop flow hard to follow</li>
</ul>
<div class="info-box"><strong>⚠️ Infinite Loop Warning:</strong> Always ensure your loop condition can eventually become false, or use <code>break</code> to exit. Infinite loops hang your program and require a force-quit.</div>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: Which loop type should I use?</strong><br/>Use <code>for</code> when you know the count. Use <code>while</code> when the end depends on runtime conditions. Use for-each/range-for when iterating collections.</p>
<p><strong>Q: How do I loop backwards?</strong><br/>Reverse the counter: start at the end, stop at 0, decrement. Or use built-in reverse methods if your language provides them.</p>
<p><strong>Q: Can loops be nested?</strong><br/>Yes — nested loops are common for 2D data (matrices, grids). Note that nesting increases time complexity: two nested O(n) loops give O(n²) — be mindful of performance.</p>
</div>`;
}

function functionsSections(lang, langUrl, funcCode, returnCode) {
  return `
<div class="intro-box">
  <p>Functions are the backbone of code organization. They let you name, reuse, and test blocks of logic independently. Without functions, every program would be one massive, unmaintainable block of code. Master functions in ${lang} and your code quality will improve dramatically.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Defining and Calling Functions</div>
<p>A function is a named block of code that can be called multiple times with different arguments:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Functions</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${funcCode}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Return Values</div>
<p>Functions can compute and return values using the <code>return</code> statement. The caller can store or use this value:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Return Values</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${returnCode}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Function Best Practices</div>
<ul style="color:#c9d1d9; padding-left:24px; line-height:2.2; font-size:15px;">
  <li><strong>Single responsibility:</strong> Each function should do one thing well</li>
  <li><strong>Descriptive names:</strong> <code>calculateArea()</code> is better than <code>calc()</code></li>
  <li><strong>Keep them short:</strong> If a function exceeds 20-30 lines, consider splitting it</li>
  <li><strong>Avoid global state:</strong> Functions should work with their parameters, not modify global variables</li>
  <li><strong>Document parameters:</strong> Add comments or docstrings explaining what each parameter is</li>
</ul>
<div class="info-box"><strong>💡 DRY Principle:</strong> "Don't Repeat Yourself." If you find yourself copying the same code more than twice, put it in a function. Functions eliminate duplication and centralize logic for easy maintenance.</div>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: How many parameters can a function have?</strong><br/>Technically unlimited, but more than 4-5 parameters is usually a sign the function does too much. Consider grouping parameters into a struct/object.</p>
<p><strong>Q: What is recursion?</strong><br/>Recursion is when a function calls itself. It's elegant for problems that can be broken into smaller identical subproblems (like factorial or tree traversal). Always define a base case to stop infinite recursion.</p>
<p><strong>Q: What is the difference between a parameter and an argument?</strong><br/>A parameter is the variable in the function definition. An argument is the actual value passed when calling the function. Example: <code>def greet(name):</code> — <code>name</code> is the parameter. <code>greet("Alice")</code> — <code>"Alice"</code> is the argument.</p>
</div>`;
}

function collectionsSections(lang, langUrl, listCode, mapCode) {
  return `
<div class="intro-box">
  <p>Collections let you store and organize multiple values together. Instead of creating 100 separate variables, you put them in a list, array, or map. Collections are used everywhere — from storing user records to building game boards. ${lang}'s collection types are powerful tools you'll use in every real project.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Arrays / Lists</div>
<p>The most fundamental collection — a sequence of values accessible by numeric index, starting at 0:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Arrays/Lists</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${listCode}</code></pre></div>
<div class="info-box"><strong>📌 Zero-indexed:</strong> Collections start at index 0, not 1. The first element is at index <code>[0]</code>, the second at <code>[1]</code>, etc. Accessing an out-of-range index causes an error.</div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Maps / Dictionaries / HashMaps</div>
<p>Maps store key-value pairs. Instead of using a numeric index, you look up values by a meaningful key — like looking up a word in a dictionary:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Map/Dictionary</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${mapCode}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Common Collection Operations</div>
<table class="tbl">
  <tr><th>Operation</th><th>Description</th></tr>
  <tr><td>Add element</td><td>Append to end of list or set a key in a map</td></tr>
  <tr><td>Remove element</td><td>Delete by value, index, or key</td></tr>
  <tr><td>Search/Find</td><td>Check if a value exists in the collection</td></tr>
  <tr><td>Sort</td><td>Order elements by value or custom criteria</td></tr>
  <tr><td>Slice</td><td>Extract a sub-range of elements</td></tr>
  <tr><td>Length/Size</td><td>Count the number of elements</td></tr>
</table>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: When should I use a list vs a map?</strong><br/>Use a list when order matters and you access items by position. Use a map when you need fast lookup by a meaningful key (e.g., username, ID).</p>
<p><strong>Q: Are collections passed by reference or by value?</strong><br/>In most languages, collections are passed by reference — modifying them inside a function changes the original. Be careful with this behavior to avoid unintended side effects.</p>
<p><strong>Q: How do I copy a collection without aliasing?</strong><br/>Use language-specific copy methods (e.g., Python's <code>list.copy()</code>, Java's <code>new ArrayList(original)</code>). Simple assignment creates an alias — both variables point to the same collection.</p>
</div>`;
}

function oopSections(lang, langUrl, classCode, inheritCode) {
  return `
<div class="intro-box">
  <p>Object-Oriented Programming (OOP) organizes code around "objects" — data bundled with the functions that operate on it. OOP makes large codebases manageable, reusable, and extensible. Most real-world software (web servers, games, mobile apps) is built using OOP principles.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> Classes and Objects</div>
<p>A class is a blueprint. An object is an instance of that blueprint with its own specific data:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Class &amp; Object</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${classCode}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Inheritance</div>
<p>Inheritance lets one class extend another, reusing and specializing its behavior. This is a core OOP technique for building hierarchies of related types:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — Inheritance</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${inheritCode}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> The Four Pillars of OOP</div>
<table class="tbl">
  <tr><th>Pillar</th><th>Description</th></tr>
  <tr><td><strong>Encapsulation</strong></td><td>Bundling data and methods together, hiding internal details</td></tr>
  <tr><td><strong>Inheritance</strong></td><td>Deriving new classes from existing ones to reuse code</td></tr>
  <tr><td><strong>Polymorphism</strong></td><td>Same interface, different implementations depending on object type</td></tr>
  <tr><td><strong>Abstraction</strong></td><td>Exposing only what's necessary, hiding complexity behind simple interfaces</td></tr>
</table>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: When should I use OOP vs functional programming?</strong><br/>OOP excels for modeling real-world entities with state (users, products, vehicles). Functional programming excels for data transformations and pipelines. Many modern programs use both styles together.</p>
<p><strong>Q: What is the difference between a class method and an instance method?</strong><br/>An instance method operates on a specific object (uses <code>self</code>/<code>this</code>). A class/static method is shared across all instances and doesn't need object state.</p>
<p><strong>Q: What is method overriding?</strong><br/>When a subclass provides its own implementation of a method defined in the parent class. The subclass version replaces the parent's version when called on a subclass object.</p>
</div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE DEFINITIONS — All remaining languages
// ─────────────────────────────────────────────────────────────────────────────

const articles = [

  // ── PYTHON ─────────────────────────────────────────────────────────────────
  {
    file: 'blog-python-syntax.html', langHomeUrl: '/blog-python.html', langName: 'Python 3',
    title: 'Python 3 — Variables and Basic Data Types', lesson: 'Lesson 1',
    prev: 'Python 3 Overview', prevUrl: '/blog-python.html',
    next: 'Control Flow: Conditionals', nextUrl: '/blog-python-variables.html',
    sections: variablesSections('Python 3', '/?lang=python3',
      `<span class="cm"># Python infers types dynamically</span>
name = <span class="st">"Our Compiler"</span>
version = <span class="nu">3.0</span>
is_active = <span class="kw">True</span>
count = <span class="nu">9</span>

print(f<span class="st">"Name: {name}, Version: {version}"</span>)
print(f<span class="st">"Active: {is_active}, Languages: {count}"</span>)
print(<span class="fn">type</span>(version))  <span class="cm"># &lt;class 'float'&gt;</span>`,
      `<table class="tbl">
  <tr><th>Type</th><th>Example</th><th>Notes</th></tr>
  <tr><td><code>int</code></td><td><code>age = 25</code></td><td>Unlimited precision integers</td></tr>
  <tr><td><code>float</code></td><td><code>pi = 3.14</code></td><td>64-bit floating point</td></tr>
  <tr><td><code>str</code></td><td><code>name = "Alice"</code></td><td>Immutable Unicode text</td></tr>
  <tr><td><code>bool</code></td><td><code>ok = True</code></td><td>True or False only</td></tr>
  <tr><td><code>list</code></td><td><code>items = [1,2,3]</code></td><td>Mutable ordered sequence</td></tr>
  <tr><td><code>dict</code></td><td><code>d = {"a": 1}</code></td><td>Key-value mapping</td></tr>
  <tr><td><code>None</code></td><td><code>x = None</code></td><td>Represents absence of value</td></tr>
</table>`,
      `<span class="cm"># Type conversion in Python</span>
num_str = <span class="st">"42"</span>
num = <span class="fn">int</span>(num_str)   <span class="cm"># str → int</span>
f = <span class="fn">float</span>(num)      <span class="cm"># int → float: 42.0</span>
s = <span class="fn">str</span>(f)          <span class="cm"># float → str: "42.0"</span>
print(num, f, s)

<span class="cm"># Check type at runtime</span>
print(<span class="fn">isinstance</span>(num, <span class="fn">int</span>))  <span class="cm"># True</span>`)
  },

  {
    file: 'blog-python-variables.html', langHomeUrl: '/blog-python.html', langName: 'Python 3',
    title: 'Python 3 — Control Flow: Conditionals', lesson: 'Lesson 2',
    prev: 'Variables and Basic Data Types', prevUrl: '/blog-python-syntax.html',
    next: 'Loops and Iterations', nextUrl: '/blog-python-conditionals.html',
    sections: conditionalsSections('Python 3', '/?lang=python3',
      `score = <span class="nu">82</span>

<span class="kw">if</span> score >= <span class="nu">90</span>:
    print(<span class="st">"Grade: A"</span>)
<span class="kw">elif</span> score >= <span class="nu">80</span>:
    print(<span class="st">"Grade: B"</span>)
<span class="kw">elif</span> score >= <span class="nu">70</span>:
    print(<span class="st">"Grade: C"</span>)
<span class="kw">else</span>:
    print(<span class="st">"Grade: F"</span>)`,
      `<span class="cm"># Python 3.10+ match statement</span>
day = <span class="nu">3</span>
<span class="kw">match</span> day:
    <span class="kw">case</span> <span class="nu">1</span>: print(<span class="st">"Monday"</span>)
    <span class="kw">case</span> <span class="nu">2</span>: print(<span class="st">"Tuesday"</span>)
    <span class="kw">case</span> <span class="nu">3</span>: print(<span class="st">"Wednesday"</span>)
    <span class="kw">case</span> _: print(<span class="st">"Other day"</span>)`)
  },

  {
    file: 'blog-python-conditionals.html', langHomeUrl: '/blog-python.html', langName: 'Python 3',
    title: 'Python 3 — Loops and Iterations', lesson: 'Lesson 3',
    prev: 'Control Flow: Conditionals', prevUrl: '/blog-python-variables.html',
    next: 'Defining Functions', nextUrl: '/blog-python-loops.html',
    sections: loopsSections('Python 3', '/?lang=python3',
      `<span class="cm"># Classic range-based for loop</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="nu">1</span>, <span class="nu">6</span>):
    print(f<span class="st">"Iteration {i}"</span>)

<span class="cm"># range(start, stop, step)</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="nu">0</span>, <span class="nu">20</span>, <span class="nu">5</span>):
    print(i)  <span class="cm"># 0, 5, 10, 15</span>`,
      `<span class="kw">let</span> n = <span class="nu">1</span>;
<span class="kw">while</span> (n <= <span class="nu">64</span>) {
    n *= <span class="nu">2</span>;
}
console.log(<span class="st">"First power of 2 over 64:"</span>, n);`,
      `languages = [<span class="st">"Python"</span>, <span class="st">"Java"</span>, <span class="st">"Rust"</span>, <span class="st">"Go"</span>]
<span class="kw">for</span> lang <span class="kw">in</span> languages:
    print(f<span class="st">"Language: {lang}"</span>)

<span class="cm"># With index using enumerate()</span>
<span class="kw">for</span> i, lang <span class="kw">in</span> <span class="fn">enumerate</span>(languages):
    print(f<span class="st">"{i+1}. {lang}"</span>)`)
  },

  {
    file: 'blog-python-loops.html', langHomeUrl: '/blog-python.html', langName: 'Python 3',
    title: 'Python 3 — Defining Functions', lesson: 'Lesson 4',
    prev: 'Loops and Iterations', prevUrl: '/blog-python-conditionals.html',
    next: 'Reading Standard Input (stdin)', nextUrl: '/blog-python-functions.html',
    sections: functionsSections('Python 3', '/?lang=python3',
      `<span class="kw">def</span> <span class="fn">greet</span>(name, greeting=<span class="st">"Hello"</span>):
    <span class="st">"""Greet a person with a customizable message."""</span>
    print(f<span class="st">"{greeting}, {name}!"</span>)

greet(<span class="st">"Alice"</span>)              <span class="cm"># Hello, Alice!</span>
greet(<span class="st">"Bob"</span>, <span class="st">"Hi"</span>)         <span class="cm"># Hi, Bob!</span>
greet(greeting=<span class="st">"Hey"</span>, name=<span class="st">"Charlie"</span>)  <span class="cm"># keyword args</span>`,
      `<span class="kw">def</span> <span class="fn">add</span>(a, b):
    <span class="kw">return</span> a + b

<span class="kw">def</span> <span class="fn">min_max</span>(lst):
    <span class="kw">return</span> <span class="fn">min</span>(lst), <span class="fn">max</span>(lst)  <span class="cm"># return multiple values</span>

result = add(<span class="nu">3</span>, <span class="nu">7</span>)
print(result)          <span class="cm"># 10</span>

low, high = min_max([<span class="nu">5</span>, <span class="nu">2</span>, <span class="nu">8</span>, <span class="nu">1</span>])
print(low, high)       <span class="cm"># 1 8</span>`)
  },

  {
    file: 'blog-python-functions.html', langHomeUrl: '/blog-python.html', langName: 'Python 3',
    title: 'Python 3 — Reading Standard Input (stdin)', lesson: 'Lesson 5',
    prev: 'Defining Functions', prevUrl: '/blog-python-loops.html',
    next: 'Lists and Dictionaries', nextUrl: '/blog-python-collections.html',
    sections: `
<div class="intro-box">
  <p>Reading user input is fundamental for interactive programs. Python's built-in <code>input()</code> function reads a line from standard input. Combined with type conversion and loops, you can build powerful command-line tools and interactive applications.</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> The input() Function</div>
<p><code>input()</code> reads a line from stdin and returns it as a string. Use the prompt parameter to display a message to the user:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Python 3 — input()</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
<pre><code>name = <span class="fn">input</span>(<span class="st">"Enter your name: "</span>)
age = <span class="fn">int</span>(<span class="fn">input</span>(<span class="st">"Enter your age: "</span>))
print(f<span class="st">"Hello {name}! In 10 years you'll be {age + 10}."</span>)</code></pre></div>
<div class="info-box"><strong>⚠️ Important:</strong> <code>input()</code> always returns a string. To use numeric input in calculations, convert it: <code>int(input())</code> or <code>float(input())</code>.</div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> Reading Multiple Values on One Line</div>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Python 3 — Multiple Inputs</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
<pre><code><span class="cm"># Read 3 space-separated integers: "1 2 3"</span>
a, b, c = <span class="fn">map</span>(<span class="fn">int</span>, <span class="fn">input</span>().split())
print(a + b + c)

<span class="cm"># Read a list of numbers</span>
nums = <span class="fn">list</span>(<span class="fn">map</span>(<span class="fn">int</span>, <span class="fn">input</span>().split()))
print(<span class="st">"Sum:"</span>, <span class="fn">sum</span>(nums))</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Reading Input in a Loop</div>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Python 3 — Loop Input</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
<pre><code>n = <span class="fn">int</span>(<span class="fn">input</span>(<span class="st">"How many numbers? "</span>))
total = <span class="nu">0</span>
<span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(n):
    x = <span class="fn">int</span>(<span class="fn">input</span>())
    total += x
print(<span class="st">"Average:"</span>, total / n)</code></pre></div>
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> sys.stdin for Fast Input</div>
<p>For competitive programming or large inputs, <code>sys.stdin</code> is faster than repeated <code>input()</code> calls:</p>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">Python 3 — sys.stdin</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
<pre><code><span class="kw">import</span> sys
data = sys.stdin.read().split()
numbers = [<span class="fn">int</span>(x) <span class="kw">for</span> x <span class="kw">in</span> data]
print(<span class="st">"Sum:"</span>, <span class="fn">sum</span>(numbers))</code></pre></div>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
<p><strong>Q: How do I handle invalid input gracefully?</strong><br/>Wrap conversion in a try-except: <code>try: x = int(input()) except ValueError: print("Invalid!")</code></p>
<p><strong>Q: Can I use input() in our online compiler?</strong><br/>Yes! Enter your input in the <strong>stdin</strong> field before clicking ▶ Run. Each line you enter simulates a separate <code>input()</code> call.</p>
<p><strong>Q: What does the <code>_</code> variable mean in loops?</strong><br/><code>_</code> is a conventional name for a "throwaway" variable — one you need syntactically but don't actually use. It's common in <code>for _ in range(n):</code> loops.</p>
</div>`
  },

  {
    file: 'blog-python-collections.html', langHomeUrl: '/blog-python.html', langName: 'Python 3',
    title: 'Python 3 — Lists and Dictionaries', lesson: 'Lesson 6',
    prev: 'Reading Standard Input', prevUrl: '/blog-python-functions.html',
    next: 'Object-Oriented Programming', nextUrl: '/blog-python-oop.html',
    sections: collectionsSections('Python 3', '/?lang=python3',
      `<span class="cm"># Lists: ordered, mutable, allows duplicates</span>
fruits = [<span class="st">"apple"</span>, <span class="st">"banana"</span>, <span class="st">"cherry"</span>]
fruits.append(<span class="st">"date"</span>)        <span class="cm"># add to end</span>
fruits.insert(<span class="nu">1</span>, <span class="st">"avocado"</span>)  <span class="cm"># insert at index 1</span>
fruits.remove(<span class="st">"banana"</span>)     <span class="cm"># remove by value</span>
print(fruits[<span class="nu">0</span>])             <span class="cm"># "apple"</span>
print(<span class="fn">len</span>(fruits))           <span class="cm"># 4</span>
print(fruits[<span class="nu">1</span>:<span class="nu">3</span>])           <span class="cm"># slicing: ['avocado', 'cherry']</span>`,
      `<span class="cm"># Dictionaries: key-value pairs</span>
student = {
    <span class="st">"name"</span>: <span class="st">"Alice"</span>,
    <span class="st">"age"</span>: <span class="nu">20</span>,
    <span class="st">"grade"</span>: <span class="st">"A"</span>
}

print(student[<span class="st">"name"</span>])           <span class="cm"># "Alice"</span>
student[<span class="st">"score"</span>] = <span class="nu">95</span>            <span class="cm"># add new key</span>
print(student.get(<span class="st">"gpa"</span>, <span class="nu">0</span>))    <span class="cm"># safe get with default</span>

<span class="kw">for</span> key, value <span class="kw">in</span> student.items():
    print(f<span class="st">"{key}: {value}"</span>)`)
  },

  {
    file: 'blog-python-oop.html', langHomeUrl: '/blog-python.html', langName: 'Python 3',
    title: 'Python 3 — Object-Oriented Programming (OOP)', lesson: 'Lesson 7',
    prev: 'Lists and Dictionaries', prevUrl: '/blog-python-collections.html',
    next: null, nextUrl: null,
    sections: oopSections('Python 3', '/?lang=python3',
      `<span class="kw">class</span> <span class="fn">Dog</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, name, breed):
        self.name = name
        self.breed = breed

    <span class="kw">def</span> <span class="fn">bark</span>(self):
        print(f<span class="st">"{self.name} says: Woof!"</span>)

    <span class="kw">def</span> <span class="fn">__str__</span>(self):
        <span class="kw">return</span> f<span class="st">"{self.name} ({self.breed})"</span>

rex = Dog(<span class="st">"Rex"</span>, <span class="st">"German Shepherd"</span>)
rex.bark()
print(rex)`,
      `<span class="kw">class</span> <span class="fn">Animal</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self, name):
        self.name = name

    <span class="kw">def</span> <span class="fn">speak</span>(self):
        print(<span class="st">"..."</span>)

<span class="kw">class</span> <span class="fn">Cat</span>(<span class="fn">Animal</span>):
    <span class="kw">def</span> <span class="fn">speak</span>(self):           <span class="cm"># override</span>
        print(f<span class="st">"{self.name}: Meow!"</span>)

<span class="kw">class</span> <span class="fn">Dog</span>(<span class="fn">Animal</span>):
    <span class="kw">def</span> <span class="fn">speak</span>(self):
        print(f<span class="st">"{self.name}: Woof!"</span>)

<span class="kw">for</span> animal <span class="kw">in</span> [Cat(<span class="st">"Luna"</span>), Dog(<span class="st">"Rex"</span>)]:
    animal.speak()   <span class="cm"># polymorphism</span>`)
  },

  // ── JAVASCRIPT ─────────────────────────────────────────────────────────────
  {
    file: 'blog-javascript-syntax.html', langHomeUrl: '/blog-javascript.html', langName: 'JavaScript',
    title: 'JavaScript — Syntax &amp; Basic Structure', lesson: 'Lesson 1',
    prev: 'JavaScript Overview', prevUrl: '/blog-javascript.html',
    next: 'Variables and Data Types', nextUrl: '/blog-javascript-variables.html',
    sections: syntaxSections('JavaScript', '/?lang=nodejs',
      `<span class="cm">// JavaScript — basic structure</span>
<span class="kw">const</span> message = <span class="st">"Hello from JavaScript!"</span>;
console.log(message);

<span class="cm">// Using template literals</span>
<span class="kw">const</span> name = <span class="st">"Developer"</span>;
<span class="kw">const</span> year = <span class="kw">new</span> Date().getFullYear();
console.log(\`Welcome, \${name}! Year: \${year}\`);`,
      `<p>JavaScript runs in browsers and on servers (Node.js). It's dynamically typed — variables can hold any type of value without declaring a type. This makes it flexible but requires careful coding to avoid type errors at runtime.</p>`,
      `<span class="cm">// Single-line comment</span>
<span class="cm">/* Multi-line comment
   spans multiple lines */</span>

<span class="cm">/**
 * JSDoc comment for functions
 * @param {string} name - The user's name
 * @returns {string} A greeting message
 */</span>
<span class="kw">function</span> <span class="fn">greet</span>(name) {
    <span class="kw">return</span> \`Hello, \${name}!\`;
}
console.log(<span class="fn">greet</span>(<span class="st">"Alice"</span>));`,
      'JavaScript — Comments &amp; JSDoc')
  },

  {
    file: 'blog-javascript-variables.html', langHomeUrl: '/blog-javascript.html', langName: 'JavaScript',
    title: 'JavaScript — Variables and Data Types', lesson: 'Lesson 2',
    prev: 'Syntax &amp; Basic Structure', prevUrl: '/blog-javascript-syntax.html',
    next: 'Conditionals &amp; Operators', nextUrl: '/blog-javascript-conditionals.html',
    sections: variablesSections('JavaScript', '/?lang=nodejs',
      `<span class="kw">const</span> appName = <span class="st">"Our Compiler"</span>; <span class="cm">// constant (preferred)</span>
<span class="kw">let</span> count = <span class="nu">0</span>;              <span class="cm">// block-scoped variable</span>
<span class="kw">var</span> legacy = <span class="st">"avoid this"</span>; <span class="cm">// old-style, function-scoped</span>

count++;
console.log(\`\${appName}: \${count}\`);

<span class="cm">// Dynamic typing</span>
<span class="kw">let</span> x = <span class="nu">42</span>;
x = <span class="st">"now a string"</span>;  <span class="cm">// valid in JavaScript</span>
console.log(<span class="kw">typeof</span> x); <span class="cm">// "string"</span>`,
      `<table class="tbl">
  <tr><th>Type</th><th>Example</th><th>Notes</th></tr>
  <tr><td><code>number</code></td><td><code>42</code>, <code>3.14</code></td><td>All numbers are 64-bit floats</td></tr>
  <tr><td><code>string</code></td><td><code>"hello"</code></td><td>Use backticks for templates</td></tr>
  <tr><td><code>boolean</code></td><td><code>true</code>, <code>false</code></td><td>Lowercase only</td></tr>
  <tr><td><code>null</code></td><td><code>null</code></td><td>Intentional empty value</td></tr>
  <tr><td><code>undefined</code></td><td><code>undefined</code></td><td>Variable declared but not assigned</td></tr>
  <tr><td><code>object</code></td><td><code>{key: value}</code></td><td>Key-value map</td></tr>
  <tr><td><code>array</code></td><td><code>[1, 2, 3]</code></td><td>Ordered list (type: object)</td></tr>
  <tr><td><code>Symbol</code></td><td><code>Symbol("id")</code></td><td>Unique identifier</td></tr>
</table>`,
      `<span class="cm">// Type coercion (implicit)</span>
console.log(<span class="st">"5"</span> + <span class="nu">3</span>);    <span class="cm">// "53" (string concat!)</span>
console.log(<span class="st">"5"</span> - <span class="nu">3</span>);    <span class="cm">// 2  (numeric sub)</span>

<span class="cm">// Explicit conversion</span>
<span class="kw">const</span> n = <span class="fn">Number</span>(<span class="st">"42"</span>);   <span class="cm">// 42</span>
<span class="kw">const</span> s = <span class="fn">String</span>(<span class="nu">100</span>);    <span class="cm">// "100"</span>
<span class="kw">const</span> b = <span class="fn">Boolean</span>(<span class="nu">0</span>);    <span class="cm">// false</span>
console.log(n, s, b);`)
  },

  {
    file: 'blog-javascript-conditionals.html', langHomeUrl: '/blog-javascript.html', langName: 'JavaScript',
    title: 'JavaScript — Conditionals &amp; Operators', lesson: 'Lesson 3',
    prev: 'Variables and Data Types', prevUrl: '/blog-javascript-variables.html',
    next: 'Loops and Iteration', nextUrl: '/blog-javascript-loops.html',
    sections: conditionalsSections('JavaScript', '/?lang=nodejs',
      `<span class="kw">const</span> temp = <span class="nu">28</span>;

<span class="kw">if</span> (temp > <span class="nu">35</span>) {
    console.log(<span class="st">"Very hot"</span>);
} <span class="kw">else if</span> (temp > <span class="nu">25</span>) {
    console.log(<span class="st">"Warm"</span>);
} <span class="kw">else if</span> (temp > <span class="nu">15</span>) {
    console.log(<span class="st">"Cool"</span>);
} <span class="kw">else</span> {
    console.log(<span class="st">"Cold"</span>);
}

<span class="cm">// Ternary</span>
<span class="kw">const</span> status = temp > <span class="nu">30</span> ? <span class="st">"Hot"</span> : <span class="st">"Comfortable"</span>;`,
      `<span class="kw">const</span> fruit = <span class="st">"apple"</span>;
<span class="kw">switch</span> (fruit) {
    <span class="kw">case</span> <span class="st">"apple"</span>:
        console.log(<span class="st">"🍎 Apple selected"</span>);
        <span class="kw">break</span>;
    <span class="kw">case</span> <span class="st">"banana"</span>:
        console.log(<span class="st">"🍌 Banana selected"</span>);
        <span class="kw">break</span>;
    <span class="kw">default</span>:
        console.log(<span class="st">"Unknown fruit"</span>);
}`)
  },

  {
    file: 'blog-javascript-loops.html', langHomeUrl: '/blog-javascript.html', langName: 'JavaScript',
    title: 'JavaScript — Loops and Iteration', lesson: 'Lesson 4',
    prev: 'Conditionals &amp; Operators', prevUrl: '/blog-javascript-conditionals.html',
    next: 'Functions and Scope', nextUrl: '/blog-javascript-functions.html',
    sections: loopsSections('JavaScript', '/?lang=nodejs',
      `<span class="cm">// Classic for loop</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="nu">1</span>; i <= <span class="nu">5</span>; i++) {
    console.log(<span class="st">\`Iteration \${i}\`</span>);
}

<span class="cm">// for...of (iterates values)</span>
<span class="kw">const</span> langs = [<span class="st">"JS"</span>, <span class="st">"Python"</span>, <span class="st">"Rust"</span>];
<span class="kw">for</span> (<span class="kw">const</span> lang <span class="kw">of</span> langs) {
    console.log(lang);
}`,
      `<span class="kw">let</span> n = <span class="nu">1</span>;
<span class="kw">while</span> (n <= <span class="nu">64</span>) {
    n *= <span class="nu">2</span>;
}
console.log(<span class="st">"First power of 2 over 64:"</span>, n);`,
      `<span class="kw">const</span> scores = [<span class="nu">88</span>, <span class="nu">92</span>, <span class="nu">75</span>, <span class="nu">96</span>, <span class="nu">83</span>];
<span class="cm">// forEach</span>
scores.forEach((s, i) => console.log(<span class="st">\`Score \${i+1}: \${s}\`</span>));
<span class="cm">// map — transform each element</span>
<span class="kw">const</span> grades = scores.map(s => s >= <span class="nu">90</span> ? <span class="st">"A"</span> : <span class="st">"B"</span>);
console.log(grades);`)
  },

  {
    file: 'blog-javascript-functions.html', langHomeUrl: '/blog-javascript.html', langName: 'JavaScript',
    title: 'JavaScript — Functions and Scope', lesson: 'Lesson 5',
    prev: 'Loops and Iteration', prevUrl: '/blog-javascript-loops.html',
    next: 'Arrays and Objects', nextUrl: '/blog-javascript-collections.html',
    sections: functionsSections('JavaScript', '/?lang=nodejs',
      `<span class="cm">// Function declaration</span>
<span class="kw">function</span> <span class="fn">greet</span>(name) {
    console.log(<span class="st">\`Hello, \${name}!\`</span>);
}

<span class="cm">// Arrow function (modern)</span>
<span class="kw">const</span> add = (a, b) => a + b;

<span class="cm">// Default parameters</span>
<span class="kw">const</span> power = (base, exp = <span class="nu">2</span>) => base ** exp;

<span class="fn">greet</span>(<span class="st">"Alice"</span>);
console.log(<span class="fn">add</span>(<span class="nu">3</span>, <span class="nu">7</span>));
console.log(<span class="fn">power</span>(<span class="nu">4</span>));    <span class="cm">// 16 (uses default exp=2)</span>
console.log(<span class="fn">power</span>(<span class="nu">2</span>, <span class="nu">10</span>)); <span class="cm">// 1024</span>`,
      `<span class="cm">// Functions can return any type</span>
<span class="kw">function</span> <span class="fn">analyze</span>(nums) {
    <span class="kw">return</span> {
        sum: nums.reduce((a, b) => a + b, <span class="nu">0</span>),
        avg: nums.reduce((a, b) => a + b, <span class="nu">0</span>) / nums.length,
        max: Math.max(...nums)
    };
}

<span class="kw">const</span> result = <span class="fn">analyze</span>([<span class="nu">10</span>, <span class="nu">20</span>, <span class="nu">30</span>]);
console.log(result.sum, result.avg, result.max);`)
  },

  {
    file: 'blog-javascript-collections.html', langHomeUrl: '/blog-javascript.html', langName: 'JavaScript',
    title: 'JavaScript — Arrays and Objects', lesson: 'Lesson 6',
    prev: 'Functions and Scope', prevUrl: '/blog-javascript-functions.html',
    next: null, nextUrl: null,
    sections: collectionsSections('JavaScript', '/?lang=nodejs',
      `<span class="kw">const</span> fruits = [<span class="st">"apple"</span>, <span class="st">"banana"</span>, <span class="st">"cherry"</span>];
fruits.push(<span class="st">"date"</span>);          <span class="cm">// add to end</span>
fruits.unshift(<span class="st">"avocado"</span>);    <span class="cm">// add to front</span>
<span class="kw">const</span> removed = fruits.pop(); <span class="cm">// remove from end</span>

console.log(fruits.length);     <span class="cm">// length</span>
console.log(fruits.includes(<span class="st">"apple"</span>)); <span class="cm">// true</span>

<span class="cm">// Destructuring</span>
<span class="kw">const</span> [first, second, ...rest] = fruits;
console.log(first, second, rest);`,
      `<span class="cm">// Object literals</span>
<span class="kw">const</span> user = {
    name: <span class="st">"Alice"</span>,
    age: <span class="nu">25</span>,
    isAdmin: <span class="kw">false</span>
};

<span class="cm">// Access and modify</span>
console.log(user.name);
user.email = <span class="st">"alice@example.com"</span>;

<span class="cm">// Destructuring</span>
<span class="kw">const</span> { name, age } = user;
console.log(name, age);

<span class="cm">// Spread operator</span>
<span class="kw">const</span> updated = { ...user, age: <span class="nu">26</span> };
console.log(updated);`)
  },

  // ── C ──────────────────────────────────────────────────────────────────────
  {
    file: 'blog-c-syntax.html', langHomeUrl: '/blog-c.html', langName: 'C',
    title: 'C Programming — General Structure &amp; Syntax', lesson: 'Lesson 1',
    prev: 'C Overview', prevUrl: '/blog-c.html',
    next: 'Variables and Data Types', nextUrl: '/blog-c-variables.html',
    sections: syntaxSections('C', '/?lang=c',
      `<span class="cm">/* Standard C Hello World */</span>
<span class="kw">#include</span> &lt;stdio.h&gt;

<span class="kw">int</span> <span class="fn">main</span>() {
    printf(<span class="st">"Hello, World!\\n"</span>);
    printf(<span class="st">"Learning C at Our Compiler\\n"</span>);
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      `<p>C is a compiled, statically typed language. Every C program starts at <code>main()</code>. The <code>#include</code> directive imports header files that provide standard functions like <code>printf()</code>. C gives you direct control over memory — this is what makes it fast but also requires careful programming.</p>`,
      `<span class="cm">// Single-line comment (C99+)</span>
<span class="cm">/* Multi-line comment
   common in older C code */</span>

<span class="kw">#include</span> &lt;stdio.h&gt;

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="cm">/* printf format specifiers:
       %d = integer, %f = float
       %s = string, %c = char */</span>
    <span class="kw">int</span> x = <span class="nu">42</span>;
    printf(<span class="st">"Value: %d\\n"</span>, x);
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      'C — Comments &amp; printf')
  },

  {
    file: 'blog-c-variables.html', langHomeUrl: '/blog-c.html', langName: 'C',
    title: 'C Programming — Variables and Data Types', lesson: 'Lesson 2',
    prev: 'General Structure &amp; Syntax', prevUrl: '/blog-c-syntax.html',
    next: 'Operators &amp; Conditionals', nextUrl: '/blog-c-conditionals.html',
    sections: variablesSections('C', '/?lang=c',
      `<span class="kw">#include</span> &lt;stdio.h&gt;

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> age = <span class="nu">25</span>;
    <span class="kw">float</span> price = <span class="nu">9.99f</span>;
    <span class="kw">double</span> pi = <span class="nu">3.14159265</span>;
    <span class="kw">char</span> grade = <span class="st">'A'</span>;
    <span class="kw">char</span> name[] = <span class="st">"Our Compiler"</span>;

    printf(<span class="st">"Name: %s, Age: %d\\n"</span>, name, age);
    printf(<span class="st">"Price: %.2f, Pi: %.5f\\n"</span>, price, pi);
    printf(<span class="st">"Grade: %c\\n"</span>, grade);
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      `<table class="tbl">
  <tr><th>Type</th><th>Size</th><th>Format</th><th>Range</th></tr>
  <tr><td><code>int</code></td><td>4 bytes</td><td><code>%d</code></td><td>-2.1B to 2.1B</td></tr>
  <tr><td><code>float</code></td><td>4 bytes</td><td><code>%f</code></td><td>~7 digits</td></tr>
  <tr><td><code>double</code></td><td>8 bytes</td><td><code>%lf</code></td><td>~15 digits</td></tr>
  <tr><td><code>char</code></td><td>1 byte</td><td><code>%c</code></td><td>-128 to 127</td></tr>
  <tr><td><code>long</code></td><td>8 bytes</td><td><code>%ld</code></td><td>Very large</td></tr>
  <tr><td><code>unsigned int</code></td><td>4 bytes</td><td><code>%u</code></td><td>0 to 4.2B</td></tr>
</table>`,
      `<span class="cm">/* Explicit type casting in C */</span>
<span class="kw">int</span> a = <span class="nu">7</span>, b = <span class="nu">2</span>;
<span class="kw">float</span> result = (<span class="kw">float</span>) a / b;  <span class="cm">/* 3.5, not 3 */</span>
printf(<span class="st">"%.2f\\n"</span>, result);

<span class="kw">int</span> pi_int = (<span class="kw">int</span>) <span class="nu">3.99</span>;    <span class="cm">/* 3 — truncated */</span>
printf(<span class="st">"%d\\n"</span>, pi_int);`)
  },

  {
    file: 'blog-c-conditionals.html', langHomeUrl: '/blog-c.html', langName: 'C',
    title: 'C Programming — Operators &amp; Conditionals', lesson: 'Lesson 3',
    prev: 'Variables and Data Types', prevUrl: '/blog-c-variables.html',
    next: 'Loops (for, while)', nextUrl: '/blog-c-loops.html',
    sections: conditionalsSections('C', '/?lang=c',
      `<span class="kw">#include</span> &lt;stdio.h&gt;
<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> score = <span class="nu">78</span>;
    <span class="kw">if</span> (score >= <span class="nu">90</span>) {
        printf(<span class="st">"Grade: A\\n"</span>);
    } <span class="kw">else if</span> (score >= <span class="nu">80</span>) {
        printf(<span class="st">"Grade: B\\n"</span>);
    } <span class="kw">else</span> {
        printf(<span class="st">"Grade: C or below\\n"</span>);
    }
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      `<span class="kw">int</span> day = <span class="nu">2</span>;
<span class="kw">switch</span> (day) {
    <span class="kw">case</span> <span class="nu">1</span>: printf(<span class="st">"Monday\\n"</span>); <span class="kw">break</span>;
    <span class="kw">case</span> <span class="nu">2</span>: printf(<span class="st">"Tuesday\\n"</span>); <span class="kw">break</span>;
    <span class="kw">case</span> <span class="nu">3</span>: printf(<span class="st">"Wednesday\\n"</span>); <span class="kw">break</span>;
    <span class="kw">default</span>: printf(<span class="st">"Other day\\n"</span>);
}`)
  },

  {
    file: 'blog-c-loops.html', langHomeUrl: '/blog-c.html', langName: 'C',
    title: 'C Programming — Loops (for, while)', lesson: 'Lesson 4',
    prev: 'Operators &amp; Conditionals', prevUrl: '/blog-c-conditionals.html',
    next: 'Functions in C', nextUrl: '/blog-c-functions.html',
    sections: loopsSections('C', '/?lang=c',
      `<span class="kw">#include</span> &lt;stdio.h&gt;
<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">1</span>; i <= <span class="nu">5</span>; i++) {
        printf(<span class="st">"i = %d\\n"</span>, i);
    }
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      `<span class="kw">int</span> n = <span class="nu">1</span>;
<span class="kw">while</span> (n < <span class="nu">128</span>) {
    n *= <span class="nu">2</span>;
}
printf(<span class="st">"First power of 2 >= 128: %d\\n"</span>, n);`,
      `<span class="kw">int</span> arr[] = {<span class="nu">10</span>, <span class="nu">20</span>, <span class="nu">30</span>, <span class="nu">40</span>, <span class="nu">50</span>};
<span class="kw">int</span> len = <span class="kw">sizeof</span>(arr) / <span class="kw">sizeof</span>(arr[<span class="nu">0</span>]);
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">0</span>; i < len; i++) {
    printf(<span class="st">"%d "</span>, arr[i]);
}`)
  },

  {
    file: 'blog-c-functions.html', langHomeUrl: '/blog-c.html', langName: 'C',
    title: 'C Programming — Functions', lesson: 'Lesson 5',
    prev: 'Loops (for, while)', prevUrl: '/blog-c-loops.html',
    next: 'Arrays and Pointers', nextUrl: '/blog-c-collections.html',
    sections: functionsSections('C', '/?lang=c',
      `<span class="kw">#include</span> &lt;stdio.h&gt;

<span class="kw">void</span> <span class="fn">greet</span>(<span class="kw">char</span>* name) {
    printf(<span class="st">"Hello, %s!\\n"</span>, name);
}

<span class="kw">int</span> <span class="fn">square</span>(<span class="kw">int</span> n) {
    <span class="kw">return</span> n * n;
}

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">greet</span>(<span class="st">"Alice"</span>);
    printf(<span class="st">"5² = %d\\n"</span>, <span class="fn">square</span>(<span class="nu">5</span>));
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      `<span class="kw">int</span> <span class="fn">add</span>(<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> a + b; }
<span class="kw">double</span> <span class="fn">power</span>(<span class="kw">double</span> base, <span class="kw">int</span> exp) {
    <span class="kw">double</span> result = <span class="nu">1.0</span>;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">0</span>; i < exp; i++) result *= base;
    <span class="kw">return</span> result;
}
printf(<span class="st">"%d\\n"</span>, <span class="fn">add</span>(<span class="nu">3</span>, <span class="nu">7</span>));
printf(<span class="st">"%.0f\\n"</span>, <span class="fn">power</span>(<span class="nu">2</span>, <span class="nu">10</span>));`)
  },

  {
    file: 'blog-c-collections.html', langHomeUrl: '/blog-c.html', langName: 'C',
    title: 'C Programming — Arrays and Pointers', lesson: 'Lesson 6',
    prev: 'Functions', prevUrl: '/blog-c-functions.html',
    next: 'Structures (OOP-like)', nextUrl: '/blog-c-oop.html',
    sections: collectionsSections('C', '/?lang=c',
      `<span class="kw">#include</span> &lt;stdio.h&gt;
<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> nums[<span class="nu">5</span>] = {<span class="nu">10</span>, <span class="nu">20</span>, <span class="nu">30</span>, <span class="nu">40</span>, <span class="nu">50</span>};
    <span class="kw">int</span> sum = <span class="nu">0</span>;
    <span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">0</span>; i < <span class="nu">5</span>; i++) sum += nums[i];
    printf(<span class="st">"Sum: %d\\n"</span>, sum);

    <span class="cm">/* Pointer to first element */</span>
    <span class="kw">int</span>* ptr = nums;
    printf(<span class="st">"First: %d\\n"</span>, *ptr);
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      `<span class="kw">#include</span> &lt;string.h&gt;
<span class="cm">/* C uses struct for key-value-like storage */</span>
<span class="kw">typedef struct</span> {
    <span class="kw">char</span> key[<span class="nu">20</span>];
    <span class="kw">int</span> value;
} Entry;

Entry config[<span class="nu">3</span>] = {
    {<span class="st">"timeout"</span>, <span class="nu">30</span>},
    {<span class="st">"retries"</span>, <span class="nu">3</span>},
    {<span class="st">"port"</span>, <span class="nu">8080</span>}
};
printf(<span class="st">"%s = %d\\n"</span>, config[<span class="nu">1</span>].key, config[<span class="nu">1</span>].value);`)
  },

  {
    file: 'blog-c-oop.html', langHomeUrl: '/blog-c.html', langName: 'C',
    title: 'C Programming — Structures (struct)', lesson: 'Lesson 7',
    prev: 'Arrays and Pointers', prevUrl: '/blog-c-collections.html',
    next: null, nextUrl: null,
    sections: oopSections('C', '/?lang=c',
      `<span class="kw">#include</span> &lt;stdio.h&gt;
<span class="kw">#include</span> &lt;string.h&gt;

<span class="kw">typedef struct</span> {
    <span class="kw">char</span> name[<span class="nu">50</span>];
    <span class="kw">int</span> year;
    <span class="kw">double</span> price;
} Car;

<span class="kw">void</span> <span class="fn">printCar</span>(Car c) {
    printf(<span class="st">"%s (%d) — $%.2f\\n"</span>, c.name, c.year, c.price);
}

<span class="kw">int</span> <span class="fn">main</span>() {
    Car myCar = {<span class="st">"Toyota Corolla"</span>, <span class="nu">2023</span>, <span class="nu">22500.00</span>};
    <span class="fn">printCar</span>(myCar);
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      `<span class="cm">/* C doesn't have inheritance, but we simulate it */</span>
<span class="kw">typedef struct</span> { <span class="kw">char</span> type[<span class="nu">20</span>]; } Animal;
<span class="kw">typedef struct</span> { Animal base; <span class="kw">char</span> breed[<span class="nu">30</span>]; } Dog;

<span class="kw">void</span> <span class="fn">speak</span>(Animal* a) { printf(<span class="st">"%s speaks\\n"</span>, a->type); }

Dog d;
strcpy(d.base.type, <span class="st">"Dog"</span>);
strcpy(d.breed, <span class="st">"Labrador"</span>);
<span class="fn">speak</span>((Animal*)&d);`)
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS ARTICLES
// ─────────────────────────────────────────────────────────────────────────────

function buildNewMain(article) {
  const prevBtn = article.prevUrl
    ? `<a href="${article.prevUrl}" class="nav-btn"><span class="label">← Previous</span><span class="title">${article.prev}</span></a>`
    : `<span></span>`;
  const nextBtn = article.nextUrl
    ? `<a href="${article.nextUrl}" class="nav-btn" style="text-align:right;"><span class="label">Next →</span><span class="title">${article.next}</span></a>`
    : `<span></span>`;

  return `  <!-- MAIN CONTENT -->
  <main class="content">
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="${article.langHomeUrl}">${article.langName}</a><span>›</span>
      <span>${article.title.replace(/&amp;/g, '&')}</span>
    </div>
<h1 class="page-title">${article.title}</h1>
<div class="page-meta">
      <span class="badge">🕐 12 min read</span>
      <span class="badge">🟢 ${article.lesson}</span>
      <span class="badge">📅 July 2026</span>
    </div>
${article.sections}
    <div class="nav-footer">
      ${prevBtn}
      ${nextBtn}
    </div>
  </main>
`;
}

let processed = 0, skipped = 0;
for (const article of articles) {
  const filePath = path.join(publicDir, article.file);
  if (!fs.existsSync(filePath)) { console.warn(`⚠️  Not found: ${article.file}`); skipped++; continue; }

  let html = fs.readFileSync(filePath, 'utf8');
  const mainRegex = /<main\s+class="content">[\s\S]*?<\/main>/;
  if (!mainRegex.test(html)) { console.warn(`⚠️  No <main> in: ${article.file}`); skipped++; continue; }

  html = html.replace(mainRegex, buildNewMain(article).trimEnd());
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅  Expanded: ${article.file}`);
  processed++;
}

// Fix remaining "No ads" footer text
const allHtml = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
let footerFixed = 0;
for (const fname of allHtml) {
  const fp = path.join(publicDir, fname);
  let c = fs.readFileSync(fp, 'utf8');
  if (c.includes('No ads')) {
    c = c.replace(/Free\s*·\s*No ads\s*·\s*No sign-up/g, 'Free · Trusted by developers worldwide');
    fs.writeFileSync(fp, c, 'utf8');
    footerFixed++;
  }
}

console.log(`\n📝 Footer fixed in ${footerFixed} more files`);
console.log(`\n🎉 Done! Expanded: ${processed}, Skipped: ${skipped}`);
