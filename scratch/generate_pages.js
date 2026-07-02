const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const languages = [
  { id: 'python', name: 'Python 3', accent: '#3fb950', editorLang: 'python3', icon: '🐍' },
  { id: 'java', name: 'Java', accent: '#f0a500', editorLang: 'java', icon: '☕' },
  { id: 'c', name: 'C', accent: '#58a6ff', editorLang: 'c', icon: '🔵' },
  { id: 'cpp', name: 'C++', accent: '#e3b341', editorLang: 'cpp17', icon: '⚡' },
  { id: 'javascript', name: 'JavaScript', accent: '#f1e05a', editorLang: 'nodejs', icon: '🟡' },
  { id: 'go', name: 'Go', accent: '#00add8', editorLang: 'go', icon: '🐹' },
  { id: 'rust', name: 'Rust', accent: '#f74c00', editorLang: 'rust', icon: '🦀' },
  { id: 'php', name: 'PHP', accent: '#8892bf', editorLang: 'php', icon: '🐘' },
  { id: 'ruby', name: 'Ruby', accent: '#cc342d', editorLang: 'ruby', icon: '💎' }
];

// Rich additional information database to make each subpage extremely professional and detailed.
const richInfo = {
  python: {
    syntax: `
      <h3>Understanding Python Syntax</h3>
      <p>Python was designed for readability and has visual similarities to the English language. One of its most distinctive features is the use of indentation to define code blocks, rather than curly braces or keywords.</p>
      <div class="info-box">
        <strong>⚠️ Indentation Error:</strong> Python uses 4 spaces per indentation level. Mixing tabs and spaces will result in an <code>IndentationError</code>. Always be consistent!
      </div>
      <h3>Comments in Python</h3>
      <p>Comments start with a hash character (<code>#</code>) and extend to the end of the physical line. Python also supports multi-line comments using triple quotes (<code>"""</code>), which are commonly used as docstrings to document functions and classes.</p>
      <pre><code># This is a single-line comment
print("Hello World")

"""
This is a multi-line comment
or a docstring explaining a block of code.
"""</code></pre>
    `,
    variables: `
      <h3>Dynamic Typing in Python</h3>
      <p>Python is a dynamically-typed language. This means you do not need to state the variable type during declaration. The interpreter determines the type at runtime based on the value assigned to it.</p>
      <h3>Variable Naming Conventions</h3>
      <p>According to PEP 8 (Python's style guide), variable names should be lowercase, with words separated by underscores as necessary to improve readability (known as <code>snake_case</code>).</p>
      <table class="tbl">
        <tr><th>Rule</th><th>Correct Example</th><th>Incorrect Example</th></tr>
        <tr><td>Must start with letter or _</td><td><code>user_age = 25</code></td><td><code>2age = 25</code></td></tr>
        <tr><td>Case-sensitive</td><td><code>val = 1</code> and <code>Val = 2</code></td><td>(Different variables)</td></tr>
        <tr><td>No reserved keywords</td><td><code>my_pass = True</code></td><td><code>pass = True</code></td></tr>
      </table>
    `,
    conditionals: `
      <h3>Logical and Identity Operators</h3>
      <p>Python uses plain English words for logical operations: <code>and</code>, <code>or</code>, and <code>not</code>. It also provides identity operators like <code>is</code> and <code>is not</code> to check if two variables point to the same object in memory.</p>
      <h3>The Ternary Operator</h3>
      <p>Python supports a one-line conditional expression, which serves as a ternary operator:</p>
      <pre><code># Syntax: [on_true] if [expression] else [on_false]
status = "Adult" if age >= 18 else "Minor"</code></pre>
    `,
    loops: `
      <h3>The Loop "Else" Clause</h3>
      <p>A unique feature of Python loops is the <code>else</code> block. The <code>else</code> block executes only when the loop terminates naturally (without encountering a <code>break</code> statement).</p>
      <pre><code>for num in range(2, 10):
    if num == 11:
        break
else:
    print("Loop finished successfully without breaking!")</code></pre>
    `,
    functions: `
      <h3>Arbitrary Arguments (*args and **kwargs)</h3>
      <p>If you don't know how many arguments will be passed into your function, use <code>*args</code> for tuple positional parameters or <code>**kwargs</code> for dictionary keyword parameters.</p>
      <pre><code>def print_order(*items, **details):
    print("Items:", items)
    print("Details:", details)

print_order("Pizza", "Soda", customer="Balaji", table=5)</code></pre>
    `,
    collections: `
      <h3>List Comprehensions</h3>
      <p>List comprehensions provide a concise way to create lists. They consist of brackets containing an expression followed by a <code>for</code> clause, then zero or more <code>for</code> or <code>if</code> clauses.</p>
      <pre><code># Create list of squares for even numbers only
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares) # [0, 4, 16, 36, 64]</code></pre>
    `,
    oop: `
      <h3>The self Parameter</h3>
      <p>The <code>self</code> parameter is a reference to the current instance of the class, and is used to access variables that belong to the class. It does not have to be named <code>self</code>, but it is highly recommended to follow convention.</p>
      <h3>Inheritance & Method Overriding</h3>
      <p>Python supports single and multiple inheritance. You can override parent class methods in child classes, and use <code>super()</code> to call parent constructors or methods.</p>
    `
  },
  java: {
    syntax: `
      <h3>Understanding JVM & Java Execution</h3>
      <p>Java programs are compiled into bytecode, which is a platform-independent format that runs inside the Java Virtual Machine (JVM). This allows Java code to run seamlessly across all operating systems without modification.</p>
      <h3>Standard Structure Rules</h3>
      <p>Every Java application must be defined within a class. The entry point of any Java program is the <code>public static void main(String[] args)</code> method. Filenames must exactly match the public class name within the file (e.g., <code>Main.java</code> containing <code>public class Main</code>).</p>
    `,
    variables: `
      <h3>Primitive vs Reference Types</h3>
      <p>Java has two main categories of data types: Primitives (like <code>int</code>, <code>double</code>, <code>char</code>) which hold values directly, and Reference types (like <code>String</code>, <code>Arrays</code>, <code>Objects</code>) which hold references to memory locations in the heap.</p>
      <table class="tbl">
        <tr><th>Primitive Type</th><th>Size</th><th>Default Value</th></tr>
        <tr><td><code>int</code></td><td>4 bytes</td><td><code>0</code></td></tr>
        <tr><td><code>double</code></td><td>8 bytes</td><td><code>0.0</code></td></tr>
        <tr><td><code>boolean</code></td><td>1 bit</td><td><code>false</code></td></tr>
        <tr><td><code>char</code></td><td>2 bytes</td><td><code>'\\u0000'</code></td></tr>
      </table>
    `,
    conditionals: `
      <h3>Switch Expressions (Java 14+)</h3>
      <p>Modern Java introduces enhanced switch expressions that can return values and do not require <code>break</code> keywords, preventing fall-through bugs:</p>
      <pre><code>int day = 3;
String dayName = switch (day) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    default -> "Invalid Day";
};
System.out.println(dayName);</code></pre>
    `,
    loops: `
      <h3>Enhanced For Loop (For-Each)</h3>
      <p>The enhanced for loop is used exclusively to loop through elements in an array or collection. It is cleaner and less error-prone since it does not use index counters.</p>
      <pre><code>String[] languages = {"Java", "Python", "Go"};
for (String lang : languages) {
    System.out.println("Active: " + lang);
}</code></pre>
    `,
    functions: `
      <h3>Method Overloading</h3>
      <p>Java supports method overloading, allowing you to define multiple methods with the same name as long as their parameter signatures are different (number, type, or order of parameters).</p>
      <pre><code>public static int add(int a, int b) { return a + b; }
public static double add(double a, double b) { return a + b; }</code></pre>
    `,
    collections: `
      <h3>Arrays vs ArrayList</h3>
      <p>Standard arrays in Java have a fixed size that must be declared at initialization. If you need a resizable collection, use <code>java.util.ArrayList</code>.</p>
      <pre><code>import java.util.ArrayList;
ArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();
list.add("Java");
list.add("Rust");
System.out.println(list.get(0)); // Java</code></pre>
    `,
    oop: `
      <h3>Exceptions Handling (Try-Catch)</h3>
      <p>Exceptions in Java are objects that represent errors. Use <code>try-catch-finally</code> blocks to handle errors cleanly. Java separates exceptions into checked exceptions (verified at compile-time) and unchecked exceptions (occur at runtime).</p>
    `
  },
  c: {
    syntax: `
      <h3>Compilation Pipeline in C</h3>
      <p>C is a compiled language. The build pipeline consists of: Preprocessing (expands macros & headers), Compilation (generates assembly), Assembly (creates object code), and Linking (merges object code with libraries to produce the final executable).</p>
    `,
    variables: `
      <h3>Explicit Sizing & Sign</h3>
      <p>C variables can be signed or unsigned. Unsigned variables can store only positive values but double the maximum limit in the positive range.</p>
    `,
    conditionals: `
      <h3>Truth Values in C</h3>
      <p>Historically, C did not have a built-in Boolean type. Any non-zero numeric value is treated as <code>true</code>, while <code>0</code> is treated as <code>false</code>. In C99 and later, you can import <code>&lt;stdbool.h&gt;</code> to use <code>bool</code>, <code>true</code>, and <code>false</code>.</p>
    `,
    loops: `
      <h3>Infinite Loops & Control</h3>
      <p>C loops can run infinitely using <code>for(;;)</code> or <code>while(1)</code>. Control execution inside loops using <code>break</code> (to exit) and <code>continue</code> (to skip to the next iteration).</p>
    `,
    functions: `
      <h3>Standard Input Buffer Rules</h3>
      <p>When using <code>scanf()</code> to read user inputs, C reads from the stdin buffer. Be careful with trailing newlines (<code>\\n</code>) left in the buffer, which can cause subsequent input requests to be skipped. Use <code>fflush(stdin)</code> or blank spaces in formatting to clear buffers.</p>
    `,
    collections: `
      <h3>Pointer Arithmetic</h3>
      <p>In C, pointers and arrays are closely related. Array names act as constant pointers to their first element. You can traverse arrays using pointer additions:</p>
      <pre><code>int arr[] = {10, 20, 30};
int *ptr = arr;
printf("%d\\n", *(ptr + 1)); // Prints 20</code></pre>
    `,
    oop: `
      <h3>Manual Memory Management</h3>
      <p>C does not have garbage collection. Allocate memory on the heap manually using <code>malloc()</code> or <code>calloc()</code>, and always release it using <code>free()</code> to prevent memory leaks.</p>
      <pre><code>#include &lt;stdlib.h&gt;
int *arr = (int*) malloc(5 * sizeof(int));
// ... use array ...
free(arr); // release memory</code></pre>
    `
  },
  cpp: {
    syntax: `
      <h3>namespaces in C++</h3>
      <p>C++ introduces <code>namespaces</code> to prevent name collisions in large projects. The Standard Template Library (STL) uses the namespace <code>std</code>. Using <code>using namespace std;</code> imports everything into the global scope, though in production header files, explicit prefixes (like <code>std::cout</code>) are preferred.</p>
    `,
    variables: `
      <h3>Reference Variables</h3>
      <p>C++ introduces reference variables (<code>&amp;</code>) which act as aliases for existing variables. Unlike pointers, references cannot be null and cannot be reassigned to point to different storage locations after initialization.</p>
    `,
    conditionals: `
      <h3>Logical Relational Evaluation</h3>
      <p>Like C, C++ supports standard boolean conditional checks. It also introduces <code>constexpr if</code> in C++17, allowing compile-time branch evaluation.</p>
    `,
    loops: `
      <h3>Range-based For Loops</h3>
      <p>Introduced in C++11, range-based for loops allow iterating through containers like arrays and vectors easily, automatically handling borders:</p>
      <pre><code>int nums[] = {1, 2, 3, 4};
for (int val : nums) {
    std::cout << val << " ";
}</code></pre>
    `,
    functions: `
      <h3>Pass by Value vs Reference</h3>
      <p>By default, C++ passes arguments by value (making a copy). To modify variables directly or avoid expensive copying of large structures, pass by reference using the <code>&amp;</code> operator.</p>
      <pre><code>void update(int &value) {
    value = 100; // changes the original variable
}</code></pre>
    `,
    collections: `
      <h3>Standard Template Library (STL)</h3>
      <p>The C++ STL provides highly optimized structures like <code>std::vector</code> (dynamic array), <code>std::map</code> (key-value dictionary), and algorithms (like <code>std::sort</code>) that simplify application writing.</p>
    `,
    oop: `
      <h3>Encapsulation & Access Modifiers</h3>
      <p>C++ separates public APIs from private internal values using class access blocks: <code>public</code> (accessible from anywhere), <code>private</code> (accessible only within class methods), and <code>protected</code> (accessible in class and subclasses).</p>
    `
  },
  javascript: {
    syntax: `
      <h3>Variables Scope: var vs let vs const</h3>
      <p>Modern JavaScript (ES6+) introduces block-scoped variables using <code>let</code> and <code>const</code>. The older <code>var</code> keyword is function-scoped and undergoes hoisting, which can lead to hard-to-find execution bugs. Always default to <code>const</code> unless you explicitly need to reassign a variable.</p>
    `,
    variables: `
      <h3>Dynamic Types & Equality Checks</h3>
      <p>JavaScript has loose typing. When comparing values, always prefer strict equality (<code>===</code>) over loose equality (<code>==</code>). Loose equality performs implicit type coercion, leading to unexpected true evaluations (e.g., <code>"5" == 5</code> is true, but <code>"5" === 5</code> is false).</p>
    `,
    conditionals: `
      <h3>Short-Circuit Evaluation</h3>
      <p>Logical operators in JS perform short-circuiting. The <code>||</code> operator can be used to set default fallback values, and the nullish coalescing operator (<code>??</code>) checks specifically for <code>null</code> or <code>undefined</code>.</p>
    `,
    loops: `
      <h3>Iterating with For-Of and For-In</h3>
      <p>Use <code>for...of</code> to iterate over values in iterable objects (like arrays or strings). Use <code>for...in</code> to iterate over keys (property names) in standard objects.</p>
    `,
    functions: `
      <h3>Arrow Functions & this Lexical Scope</h3>
      <p>Arrow functions (<code>const fn = () => {}</code>) provide a shorter syntax and bind the <code>this</code> context lexically (meaning they inherit <code>this</code> from their parent scope rather than defining their own).</p>
    `,
    collections: `
      <h3>Array Manipulations</h3>
      <p>JavaScript provides powerful, chainable array methods that promote functional programming patterns:</p>
      <pre><code>const items = [1, 2, 3, 4];
const result = items
  .filter(x => x % 2 === 0)
  .map(x => x * 10);
console.log(result); // [20, 40]</code></pre>
    `,
    oop: `
      <h3>Prototypes & Classes</h3>
      <p>Under the hood, JavaScript uses prototypal inheritance. The <code>class</code> keyword introduced in ES6 is syntactical sugar over JavaScript's existing prototype-based inheritance model.</p>
    `
  },
  go: {
    syntax: `
      <h3>Go File Structure</h3>
      <p>Go files are compiled in packages. The main entry file must belong to <code>package main</code> and define <code>func main()</code>. Capitalized identifiers (variables/functions) are exported (public), while lowercase ones are package-private.</p>
    `,
    variables: `
      <h3>Strong Static Typing</h3>
      <p>Go is strongly typed. You cannot perform operations between different types (even <code>int</code> and <code>int64</code>) without explicit conversions.</p>
    `,
    conditionals: `
      <h3>Conditionals with Initial Statement</h3>
      <p>Go allows declaring variables directly within conditional headers. These variables are scoped only to the conditional block:</p>
      <pre><code>if val := calculate(); val > 10 {
    fmt.Println("High value:", val)
} // val is out of scope here</code></pre>
    `,
    loops: `
      <h3>The Single Loop Keyword: for</h3>
      <p>Go maintains language simplicity by only providing one loop keyword: <code>for</code>. You can write traditional index loops, conditional while-like loops, or range loops over maps and slices.</p>
    `,
    functions: `
      <h3>Go Error Handling Pattern</h3>
      <p>Go does not use traditional exception blocks. Instead, functions that can fail return errors as their final return value, which the caller must explicitly inspect:</p>
      <pre><code>res, err := doSomething()
if err != nil {
    log.Fatal(err)
}</code></pre>
    `,
    collections: `
      <h3>Slices vs Arrays</h3>
      <p>Go arrays have a fixed size. Slices are dynamic, resizable wrappers around arrays that are much more common in Go programming.</p>
    `,
    oop: `
      <h3>Composition over Inheritance</h3>
      <p>Go does not have classes or inheritance. Instead, structures represent data schemas, and behavior is attached using methods. Interface typing allows polymorphism.</p>
    `
  },
  rust: {
    syntax: `
      <h3>Safety and Speed</h3>
      <p>Rust is designed to offer the performance of C/C++ but with guaranteed memory safety. It enforces compile-time checks for memory allocations, eliminating common bugs like null pointers and data races.</p>
    `,
    variables: `
      <h3>Mutability by Default</h3>
      <p>Rust variables are immutable by default to encourage thread safety and predictable states. Use <code>mut</code> to make a variable mutable.</p>
    `,
    conditionals: `
      <h3>Rust Expressions</h3>
      <p>Almost everything in Rust is an expression that returns a value. This applies to <code>if</code> blocks, which can be assigned to variables:</p>
      <pre><code>let status = if score >= 50 { "Pass" } else { "Fail" };</code></pre>
    `,
    loops: `
      <h3>Loop Keyword and Labels</h3>
      <p>In addition to <code>while</code> and <code>for</code>, Rust has a dedicated <code>loop</code> keyword for infinite loops, and allows naming loop scopes to break outer loops from inner blocks.</p>
    `,
    functions: `
      <h3>Implicit Return Expression</h3>
      <p>Rust functions return the value of the final expression automatically. Do not include a semicolon (<code>;</code>) on the final line of a block if you intend to return its value.</p>
    `,
    collections: `
      <h3>Rust References & Borrowing</h3>
      <p>To access variables without taking ownership, borrow values using references (<code>&amp;</code>). Rust allows either multiple immutable references OR exactly one mutable reference at a time.</p>
    `,
    oop: `
      <h3>Enums with Associated Data</h3>
      <p>Rust enums can hold data within their variants, and are matched exhaustively using the <code>match</code> block. This is commonly used for error checking via the <code>Result</code> type.</p>
    `
  },
  php: {
    syntax: `
      <h3>PHP Execution Model</h3>
      <p>PHP is an interpreted, server-side language. PHP scripts execute on the server, generating HTML that is sent back to the client's browser. PHP code blocks start with <code>&lt;?php</code> and terminate with <code>?&gt;</code>.</p>
    `,
    variables: `
      <h3>Scope Rules in PHP</h3>
      <p>Variables in PHP are local to their context by default. To reference a global variable inside a function, declare it with the <code>global</code> keyword or use the <code>$GLOBALS</code> superglobal array.</p>
    `,
    conditionals: `
      <h3>Strict Comparisons</h3>
      <p>Like JavaScript, PHP perform implicit conversions during loose equality checks (<code>==</code>). Always use strict equality (<code>===</code>) to verify both value and type match.</p>
    `,
    loops: `
      <h3>Iterating Arrays with Foreach</h3>
      <p>PHP's <code>foreach</code> loop is the easiest way to traverse arrays, supporting both key-value association mapping:</p>
      <pre><code>$person = ["name" => "Balaji", "role" => "Admin"];
foreach ($person as $key => $value) {
    echo "$key: $value\\n";
}</code></pre>
    `,
    functions: `
      <h3>Strict Type Declarations</h3>
      <p>To enforce parameter typing and return verification at compile time, declare <code>declare(strict_types=1);</code> at the very top of your PHP files.</p>
    `,
    collections: `
      <h3>Associative Arrays</h3>
      <p>PHP arrays are ordered maps, allowing both numeric index values and string keys within the same collection. The spread operator (<code>...</code>) can be used to merge arrays.</p>
    `,
    oop: `
      <h3>Constructor Property Promotion</h3>
      <p>PHP 8+ simplifies class property initialization by allowing properties to be declared and assigned directly inside the constructor parameters, reducing boilerplate code.</p>
    `
  },
  ruby: {
    syntax: `
      <h3>Ruby Developer Happiness</h3>
      <p>Ruby was designed by Yukihiro Matsumoto ("Matz") to make developers happy. Its clean syntax reads almost like English, and it does not require semicolons or class boilerplates for script executions.</p>
    `,
    variables: `
      <h3>Variable Scope Indicators</h3>
      <p>Ruby uses simple prefix indicators to define variable scopes: lowercase letters for local variables (<code>age</code>), <code>@</code> prefix for instance variables (<code>@name</code>), <code>@@</code> for class variables (<code>@@count</code>), and capital letters for constants (<code>MAX_LIMIT</code>).</p>
    `,
    conditionals: `
      <h3>Unless Conditionals</h3>
      <p>Ruby provides the <code>unless</code> keyword, which evaluates statements only if the condition is <code>false</code>. It also supports inline conditional suffixes:</p>
      <pre><code># Inline conditional
puts "Underage" if age < 18
puts "Adult" unless age < 18</code></pre>
    `,
    loops: `
      <h3>Iterators and Blocks</h3>
      <p>Ruby promotes the use of clean iterators with code blocks (defined between <code>do/end</code> or curly braces <code>{}</code>) instead of index loops, which makes arrays traversal elegant.</p>
    `,
    functions: `
      <h3>Implicit Return Values</h3>
      <p>Ruby methods return the evaluated value of the final executed expression. An explicit <code>return</code> keyword is only required to exit a method early.</p>
    `,
    collections: `
      <h3>Arrays and Symbol Hashes</h3>
      <p>Ruby arrays are dynamic collections. Hashes store key-value structures, commonly using immutable <code>Symbols</code> as keys for faster lookups:</p>
      <pre><code># Hash with symbols
student = { name: "Balaji", gpa: 3.9 }
puts student[:name] # Prints Balaji</code></pre>
    `,
    oop: `
      <h3>Everything is an Object</h3>
      <p>In Ruby, everything is an object. Numbers, strings, arrays, and even classes themselves inherit methods and attributes, allowing unified object-oriented logic.</p>
    `
  }
};

languages.forEach(lang => {
  const filePath = path.join(publicDir, `blog-${lang.id}.html`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Split by <h2>[digit]. [Title]</h2>
  const parts = html.split(/<h2>(\d+)\.\s*([\s\S]*?)<\/h2>/i);
  if (parts.length < 4) {
    console.error(`Could not parse sections in ${lang.id}`);
    return;
  }

  // Extract the sidebar labels
  const sidebarRegex = /<aside class="sidebar">([\s\S]*?)<\/aside>/;
  const sidebarMatch = html.match(sidebarRegex);
  const sidebarContent = sidebarMatch ? sidebarMatch[1] : '';
  const labelMatches = [...sidebarContent.matchAll(/<a href="#(s\d|intro)"[^>]*>([\s\S]*?)<\/a>/gi)];
  const labelMap = {};
  labelMatches.forEach(m => {
    labelMap[m[1].toLowerCase()] = m[2].trim();
  });

  const getLabel = (id, fallback) => {
    return labelMap[id.toLowerCase()] || fallback;
  };

  const homeLabel = getLabel('intro', `${lang.name} HOME`);

  // Parse the sections
  const sections = [];
  for (let i = 1; i < parts.length; i += 3) {
    const num = parts[i];
    const title = parts[i+1].trim();
    let content = parts[i+2];

    // Clean footer out of the last section
    const footerIdx = content.indexOf('<div class="footer">');
    if (footerIdx !== -1) {
      content = content.substring(0, footerIdx);
    }
    content = content.replace(/<\/main>\s*<\/body>\s*<\/html>/i, '').trim();

    // Map section index to clean slug keys
    const slugs = ['syntax', 'variables', 'conditionals', 'loops', 'functions', 'collections', 'oop'];
    const key = slugs[Math.floor(i / 3)] || `lesson-${num}`;

    // Get the localized label from our parsed map or fall back
    const label = getLabel(`s${num}`, title);

    sections.push({ key, id: `s${num}`, label, title, content });
  }

  // Helper to generate sidebar HTML
  const generateSidebar = (activeKey) => {
    let sb = `\n    <div class="sidebar-heading">${lang.name} Tutorial</div>\n`;
    sb += `    <a href="/blog-${lang.id}.html"${activeKey === 'home' ? ' class="active"' : ''}>${homeLabel}</a>\n`;
    sections.forEach(s => {
      sb += `    <a href="/blog-${lang.id}-${s.key}.html"${activeKey === s.key ? ' class="active"' : ''}>${s.label}</a>\n`;
    });

    sb += `\n    <div class="sidebar-heading">Reference</div>\n`;
    sb += `    <a href="/blog.html">All Tutorials</a>\n`;
    sb += `    <a href="/?lang=${lang.editorLang}">▶ Try ${lang.name} Online</a>\n\n`;

    sb += `    <div class="sidebar-heading">Other Languages</div>\n`;
    languages.forEach(other => {
      if (other.id !== lang.id) {
        sb += `    <a href="/blog-${other.id}.html">${other.name}</a>\n`;
      }
    });
    return sb;
  };

  // Helper to write a full page
  const writeFullPage = (activeKey, filename, pageTitle, mainBodyHtml, prevLink, prevTitle, nextLink, nextTitle) => {
    let navFooter = `<div class="nav-footer">\n`;
    if (prevLink) {
      navFooter += `      <a href="${prevLink}" class="nav-btn">\n`;
      navFooter += `        <span class="label">← Previous</span>\n`;
      navFooter += `        <span class="title">${prevTitle}</span>\n`;
      navFooter += `      </a>\n`;
    } else {
      navFooter += `      <a href="/blog.html" class="nav-btn">\n`;
      navFooter += `        <span class="label">← All Tutorials</span>\n`;
      navFooter += `        <span class="title">Learning Hub</span>\n`;
      navFooter += `      </a>\n`;
    }

    if (nextLink) {
      navFooter += `      <a href="${nextLink}" class="nav-btn" style="text-align:right;">\n`;
      navFooter += `        <span class="label">Next →</span>\n`;
      navFooter += `        <span class="title">${nextTitle}</span>\n`;
      navFooter += `      </a>\n`;
    } else {
      navFooter += `      <a href="/blog.html" class="nav-btn" style="text-align:right;">\n`;
      navFooter += `        <span class="label">All Tutorials →</span>\n`;
      navFooter += `        <span class="title">Learning Hub</span>\n`;
      navFooter += `      </a>\n`;
    }
    navFooter += `    </div>`;

    const fullPageContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle} | Our Compiler</title>
  <meta name="description" content="Learn ${lang.name} — ${pageTitle.toLowerCase()} with clear explanations, examples, and execution." />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0d1117; --bg2: #161b22; --bg3: #21262d;
      --border: #30363d; --accent: ${lang.accent}; --blue: #58a6ff;
      --text: #e6edf3; --text2: #8b949e; --text3: #484f58;
      --sidebar-w: 260px;
    }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; min-height: 100vh; }

    /* TOP NAV */
    .topnav {
      position: sticky; top: 0; z-index: 100;
      background: var(--bg2); border-bottom: 1px solid var(--border);
      display: flex; align-items: center; gap: 0; height: 48px;
      overflow-x: auto; padding: 0 12px;
    }
    .topnav a {
      color: var(--text2); text-decoration: none; font-size: 13px; font-weight: 500;
      padding: 0 14px; height: 48px; display: flex; align-items: center;
      border-bottom: 3px solid transparent; white-space: nowrap; transition: color .2s;
    }
    .topnav a:hover { color: var(--text); }
    .topnav a.active { color: var(--accent); border-bottom-color: var(--accent); }
    .topnav .brand { font-weight: 700; color: var(--text); font-size: 14px; margin-right: 8px; padding-right: 12px; border-right: 1px solid var(--border); }

    /* LAYOUT */
    .layout { display: flex; min-height: calc(100vh - 48px); }

    /* SIDEBAR */
    .sidebar {
      width: var(--sidebar-w); flex-shrink: 0;
      background: var(--bg2); border-right: 1px solid var(--border);
      position: sticky; top: 48px; height: calc(100vh - 48px);
      overflow-y: auto; padding: 20px 0;
    }
    .sidebar::-webkit-scrollbar { width: 4px; }
    .sidebar::-webkit-scrollbar-thumb { background: var(--bg3); border-radius: 2px; }
    .sidebar-heading {
      font-size: 11px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; color: var(--text3);
      padding: 8px 20px 4px; margin-top: 12px;
    }
    .sidebar-heading:first-child { margin-top: 0; }
    .sidebar a {
      display: block; padding: 7px 20px; font-size: 13.5px; color: var(--text2);
      text-decoration: none; border-left: 3px solid transparent; transition: all .15s;
    }
    .sidebar a:hover { color: var(--text); background: var(--bg3); }
    .sidebar a.active { color: var(--accent); border-left-color: var(--accent); background: rgba(88,166,255,.06); font-weight: 600; }

    /* CONTENT */
    .content { flex: 1; min-width: 0; padding: 40px 48px 80px; max-width: 860px; }

    /* BREADCRUMB */
    .breadcrumb { font-size: 13px; color: var(--text2); margin-bottom: 24px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .breadcrumb a { color: var(--blue); text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .breadcrumb span { color: var(--text3); }

    /* TITLE BLOCK */
    .page-title { font-size: 36px; font-weight: 700; color: var(--text); margin-bottom: 8px; line-height: 1.2; }
    .page-meta { font-size: 13px; color: var(--text2); margin-bottom: 28px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .badge { display: inline-flex; align-items: center; gap: 5px; background: var(--bg3); border: 1px solid var(--border); border-radius: 20px; padding: 3px 12px; font-size: 12px; }

    /* INTRO BOX */
    .intro-box { background: linear-gradient(135deg, rgba(88,166,255,.1), rgba(88,166,255,.04)); border: 1px solid rgba(88,166,255,.3); border-radius: 12px; padding: 20px 24px; margin-bottom: 36px; }
    .intro-box p { margin: 0; color: #c9d1d9; font-size: 15px; line-height: 1.75; }

    /* SECTIONS */
    .section { margin-bottom: 48px; scroll-margin-top: 64px; }
    .section-title { font-size: 24px; font-weight: 700; color: var(--text); margin-bottom: 12px; padding-bottom: 10px; border-bottom: 2px solid var(--border); display: flex; align-items: center; gap: 10px; }
    .section-title .num { background: var(--accent); color: #000; font-size: 13px; font-weight: 700; border-radius: 50%; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .section p { color: #c9d1d9; font-size: 15px; margin-bottom: 16px; }

    /* CODE BLOCK */
    .code-block { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; margin: 20px 0; overflow: hidden; }
    .code-block-header { background: var(--bg3); padding: 8px 16px; font-size: 12px; color: var(--text2); display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); }
    .code-block-header .lang-tag { font-weight: 600; color: var(--accent); }
    .try-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--accent); color: #000; border: none; border-radius: 6px;
      padding: 4px 12px; font-size: 12px; font-weight: 600; cursor: pointer;
      text-decoration: none; transition: opacity .2s;
    }
    .try-btn:hover { opacity: 0.85; }
    .code-block pre { margin: 0; padding: 18px; overflow-x: auto; }
    .code-block code { font-family: 'JetBrains Mono', monospace; font-size: 13.5px; color: var(--text); line-height: 1.6; }
    .kw { color: #ff7b72; } .st { color: #a5d6ff; } .cm { color: #8b949e; font-style: italic; } .nu { color: #79c0ff; } .fn { color: #d2a8ff; }

    /* INLINE CODE */
    .content code { background: rgba(110,118,129,.15); color: #ff7b72; padding: 2px 6px; border-radius: 5px; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
    .code-block code { background: none; color: var(--text); padding: 0; }

    /* INFO BOX */
    .info-box { background: rgba(88,166,255,.07); border: 1px solid rgba(88,166,255,.25); border-radius: 8px; padding: 14px 18px; margin: 16px 0; font-size: 14px; color: #c9d1d9; }
    .info-box strong { color: var(--blue); }

    /* TABLE */
    .tbl { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
    .tbl th { background: var(--bg3); padding: 10px 14px; text-align: left; color: var(--text); font-weight: 600; border-bottom: 2px solid var(--border); }
    .tbl td { padding: 10px 14px; border-bottom: 1px solid var(--border); color: #c9d1d9; }
    .tbl tr:last-child td { border-bottom: none; }
    .tbl tr:hover td { background: var(--bg3); }

    /* NEXT / PREV */
    .nav-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--border); gap: 12px; flex-wrap: wrap; }
    .nav-btn { display: inline-flex; flex-direction: column; gap: 4px; padding: 12px 20px; border: 1px solid var(--border); border-radius: 10px; text-decoration: none; transition: all .2s; max-width: 220px; }
    .nav-btn:hover { border-color: var(--accent); background: var(--bg2); }
    .nav-btn .label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: .5px; }
    .nav-btn .title { font-size: 14px; font-weight: 600; color: var(--text); }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .content { padding: 24px 20px 60px; }
      .page-title { font-size: 26px; }
    }
  </style>
</head>
<body>

<!-- TOP LANGUAGE BAR -->
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  ${languages.map(l => `<a href="/blog-${l.id}.html"${l.id === lang.id ? ' class="active"' : ''}>${l.name}</a>`).join('\n  ')}
</nav>

<div class="layout">
  <!-- LEFT SIDEBAR -->
  <aside class="sidebar">
    ${generateSidebar(activeKey)}
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">
    ${mainBodyHtml}
    ${navFooter}
  </main>
</div>
</body>
</html>`;

    const fullPath = path.join(publicDir, filename);
    fs.writeFileSync(fullPath, fullPageContent, 'utf8');
  };

  // 1. Write the HOME Page
  const homeBreadcrumb = `<div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <span>${lang.name}</span>
    </div>`;

  // Construct the intro content for the home page (everything in parts[0] inside <main class="page">...)
  // We can extract it by finding indices
  const pageTag = '<main class="page">';
  const pageStartIdx = parts[0].indexOf(pageTag);
  let mainIntroHtml = parts[0];
  if (pageStartIdx !== -1) {
    mainIntroHtml = parts[0].substring(pageStartIdx + pageTag.length);
  }
  // Strip back-link, page title and meta from mainIntroHtml so we render them ourselves cleanly
  mainIntroHtml = mainIntroHtml.replace(/<a href="\/blog\.html"[\s\S]*?<\/a>/i, '');
  mainIntroHtml = mainIntroHtml.replace(/<h1>[\s\S]*?<\/h1>/i, '');
  mainIntroHtml = mainIntroHtml.replace(/<div class="meta">[\s\S]*?<\/div>/i, '');
  mainIntroHtml = mainIntroHtml.trim();

  let homeMainBody = `${homeBreadcrumb}
    <h1 class="page-title">${lang.name} Tutorial</h1>
    <div class="page-meta">
      <span class="badge">${lang.icon} ${lang.name}</span>
      <span class="badge">🟢 Beginner Friendly</span>
      <span class="badge">📅 July 2026</span>
    </div>
    
    <div class="intro-box">
      ${mainIntroHtml}
    </div>

    <div class="section">
      <div class="section-title"><span class="num">▶</span> Course Curriculum</div>
      <p>Choose a topic from the left sidebar or click a lesson below to start learning ${lang.name}:</p>
      <table class="tbl" style="margin-top: 15px;">
        <tr><th>Lesson</th><th>Topic</th></tr>
        ${sections.map((s, idx) => `
          <tr>
            <td><strong>Lesson ${idx + 1}</strong></td>
            <td><strong><a href="/blog-${lang.id}-${s.key}.html">${s.label}</a></strong></td>
          </tr>
        `).join('')}
      </table>
    </div>`;

  const homeNextLink = `/blog-${lang.id}-${sections[0].key}.html`;
  const homeNextTitle = sections[0].label;

  writeFullPage(
    'home',
    `blog-${lang.id}.html`,
    `${lang.name} Tutorial`,
    homeMainBody,
    null,
    '',
    homeNextLink,
    homeNextTitle
  );
  console.log(`Generated Home: blog-${lang.id}.html`);

  // 2. Write each of the section pages
  sections.forEach((sec, idx) => {
    const pageBreadcrumb = `<div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-${lang.id}.html">${lang.name}</a><span>›</span>
      <span>${sec.label}</span>
    </div>`;

    let sectionTitleHtml = `<h1 class="page-title">${lang.name} — ${sec.label}</h1>\n`;
    sectionTitleHtml += `<div class="page-meta">
      <span class="badge">🕐 8 min read</span>
      <span class="badge">🟢 Lesson ${idx + 1}</span>
      <span class="badge">📅 July 2026</span>
    </div>\n`;

    // Wrap the raw parsed content in a section class div
    let sectionBodyContent = `<div class="section" id="${sec.id}">\n`;
    
    // Remove the heading tag inside content if it exists
    let cleanedContent = sec.content;
    cleanedContent = cleanedContent.replace(/<h2>[\s\S]*?<\/h2>/i, '');
    
    // Inject custom try-it button inside code blocks!
    // E.g. replace <pre><code> with a code block header that has a Try button
    cleanedContent = cleanedContent.replace(
      /<pre><code>/gi,
      `<div class="code-block">
        <div class="code-block-header">
          <span class="lang-tag">${lang.name} Code Example</span>
          <a class="try-btn" href="/?lang=${lang.editorLang}">▶ Run Code</a>
        </div>
        <pre><code>`
    );
    cleanedContent = cleanedContent.replace(/<\/code><\/pre>/gi, '</code></pre></div>');

    sectionBodyContent += cleanedContent;

    // Append our rich detailed explanations!
    const extraContent = (richInfo[lang.id] && richInfo[lang.id][sec.key]) || '';
    if (extraContent) {
      sectionBodyContent += `\n\n<div style="margin-top: 40px; border-top: 1px solid var(--border); padding-top: 30px;">\n`;
      sectionBodyContent += `  <h2 style="font-size: 22px; color: var(--text); margin-bottom: 16px;">💡 Detailed Explanation & Deep Dive</h2>\n`;
      
      // Inject custom try-it button inside richInfo code blocks too!
      let cleanedExtraContent = extraContent.trim();
      cleanedExtraContent = cleanedExtraContent.replace(
        /<pre><code>/gi,
        `<div class="code-block">
          <div class="code-block-header">
            <span class="lang-tag">${lang.name} Reference</span>
            <a class="try-btn" href="/?lang=${lang.editorLang}">▶ Run Code</a>
          </div>
          <pre><code>`
      );
      cleanedExtraContent = cleanedExtraContent.replace(/<\/code><\/pre>/gi, '</code></pre></div>');

      sectionBodyContent += cleanedExtraContent;
      sectionBodyContent += `\n</div>\n`;
    }

    sectionBodyContent += `\n</div>`;

    const prevLink = idx === 0 ? `/blog-${lang.id}.html` : `/blog-${lang.id}-${sections[idx - 1].key}.html`;
    const prevTitle = idx === 0 ? `${lang.name} Overview` : sections[idx - 1].label;
    const nextLink = idx === sections.length - 1 ? null : `/blog-${lang.id}-${sections[idx + 1].key}.html`;
    const nextTitle = idx === sections.length - 1 ? "" : sections[idx + 1].label;

    writeFullPage(
      sec.key,
      `blog-${lang.id}-${sec.key}.html`,
      `${lang.name} ${sec.label}`,
      `${pageBreadcrumb}\n${sectionTitleHtml}\n${sectionBodyContent}`,
      prevLink,
      prevTitle,
      nextLink,
      nextTitle
    );
    console.log(`  Generated Section: blog-${lang.id}-${sec.key}.html`);
  });
});

console.log("All pages split successfully with rich text!");
