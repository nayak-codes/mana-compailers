const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cppDir = path.join(__dirname, '..', 'public', 'blog-cpp');
console.log('🚀 Generating ALL 10 Modern C++ Master Textbook Lessons...');

function makeCppLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(path.join(cppDir, file),
    wrapCppPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8');
  console.log('  ✅ ' + file);
}

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 01: Phase 1 — C++ Basics & Architecture
// ═══════════════════════════════════════════════════════════════════════════════
const l1Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 1 (Chapter 1): C++ Fundamentals, Compiler Pipeline &amp; Hello World Masterclass</strong>! C++ is a high-performance, statically typed, general-purpose compiled language created by <strong>Bjarne Stroustrup</strong> at Bell Labs in 1979 as an extension of the C language ("C with Classes"). In Modern C++, resources are managed safely using <strong>RAII</strong> and smart pointers rather than manual memory allocation. The Standard Template Library (STL) provides industry-standard containers, iterators, and algorithms.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>C++ Origins, History &amp; Real-World Uses</div>' +
'<div class="section-body">' +
'  <p class="text-prose">C++ was designed to combine the low-level hardware speed and memory control of C with high-level object-oriented abstractions. It is the language of choice for systems where performance, latency, and hardware control are non-negotiable.</p>' +
'  <div class="concept-box">' +
'    <h4>Where C++ Dominates the Industry:</h4>' +
'    <p>• <strong>AAA Game Engines:</strong> Unreal Engine, Frostbite, Unity core engine.</p>' +
'    <p>• <strong>Operating Systems & Kernels:</strong> Windows OS core, macOS, iOS kernel parts.</p>' +
'    <p>• <strong>Web Browser Engines:</strong> Google Chrome (V8 & Blink), Mozilla Firefox (Gecko).</p>' +
'    <p>• <strong>High-Frequency Trading (HFT):</strong> Low-latency financial stock exchange engines.</p>' +
'    <p>• <strong>Database Engines:</strong> MySQL, MongoDB, PostgreSQL storage engines.</p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>C vs C++ Comparison Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Feature</th><th>C Language</th><th>C++ Language</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Programming Paradigm</td><td>Procedural / Imperative</td><td>Multi-paradigm (Procedural, OOP, Generic, Functional)</td></tr>' +
'      <tr><td>Input / Output Streams</td><td><code>printf()</code> / <code>scanf()</code></td><td><code>std::cout</code> / <code>std::cin</code> (Type-safe streams)</td></tr>' +
'      <tr><td>Memory Management</td><td>Manual <code>malloc()</code> / <code>free()</code></td><td>RAII, Smart Pointers, <code>new</code> / <code>delete</code></td></tr>' +
'      <tr><td>Function Overloading</td><td>Not Supported (Unique function names)</td><td>Supported (Overload by parameter signature)</td></tr>' +
'      <tr><td>Standard Library</td><td>C Standard Library (libc)</td><td>Standard Template Library (STL: vector, map, algorithms)</td></tr>' +
'      <tr><td>Error Handling</td><td>Return status codes / <code>errno</code></td><td>Exception Handling (<code>try</code> / <code>catch</code>) &amp; RAII</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>C++ Compilation &amp; Build Pipeline</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'C++ Compilation Pipeline (GCC / Clang):\n\n' +
'  source.cpp\n' +
'      │\n' +
'      ▼  STEP 1 ─ Preprocessor (g++ -E)\n' +
'  source.ii   (Expanded headers, resolved #define macros, stripped comments)\n' +
'      │\n' +
'      ▼  STEP 2 ─ Compiler (g++ -S)\n' +
'  source.s    (Assembly code output)\n' +
'      │\n' +
'      ▼  STEP 3 ─ Assembler (g++ -c)\n' +
'  source.o    (Binary Object file with ELF/COFF machine code)\n' +
'      │\n' +
'      ▼  STEP 4 ─ Linker (g++)\n' +
'  app.exe     (Final linked executable with STL libraries)\n' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Line-by-Line Breakdown of First C++ Program</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — First Program (Hello World)</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n\n' +
'int main() {\n' +
'    std::cout &lt;&lt; "Hello, World!\\n";\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +

'  <div class="concept-box">' +
'    <h4>Detailed Line Explanation:</h4>' +
'    <p>• <code>#include &lt;iostream&gt;</code>: Preprocessor directive that includes the standard Input/Output stream header containing <code>std::cout</code> and <code>std::cin</code>.</p>' +
'    <p>• <code>int main()</code>: The mandatory entry point function of every C++ executable program. Returns an integer exit status code.</p>' +
'    <p>• <code>std::cout</code>: Character Output Stream object defined inside the <code>std</code> namespace (Standard Namespace).</p>' +
'    <p>• <code>&lt;&lt;</code>: Stream Insertion Operator. Directs the string literal into the output stream buffer.</p>' +
'    <p>• <code>"Hello, World!\\n"</code>: String literal. <code>\\n</code> is the newline character. Prefer <code>\\n</code> over <code>std::endl</code> because <code>std::endl</code> forces an expensive stream buffer flush on every line!</p>' +
'    <p>• <code>return 0;</code>: Signals to the operating system that the program completed successfully with exit code 0.</p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">5</span>C++ Standard Evolution Timeline</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Standard</th><th>Year</th><th>Key Landmark Features Introduced</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>C++98 / C++03</td><td>1998 / 2003</td><td>First official ISO standard, STL templates, RTTI, exceptions.</td></tr>' +
'      <tr><td>C++11</td><td>2011</td><td><strong>Modern C++ Revolution:</strong> <code>auto</code>, <code>nullptr</code>, Smart Pointers, Lambdas, Move Semantics, <code>constexpr</code>.</td></tr>' +
'      <tr><td>C++14</td><td>2014</td><td>Generic lambdas, relaxed <code>constexpr</code>, <code>std::make_unique</code>.</td></tr>' +
'      <tr><td>C++17</td><td>2017</td><td><code>std::string_view</code>, <code>std::optional</code>, <code>std::variant</code>, Structured Binding, <code>if constexpr</code>.</td></tr>' +
'      <tr><td>C++20</td><td>2020</td><td>Concepts, Coroutines, Modules, Ranges library, <code>std::format</code>.</td></tr>' +
'      <tr><td>C++23</td><td>2023</td><td><code>std::print</code>, <code>std::expected</code>, explicit <code>this</code> parameter.</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">6</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why should I prefer \\n over std::endl in C++?</h4><p><code>std::endl</code> outputs a newline AND forces a call to <code>std::cout.flush()</code>. In high-frequency output loops, this causes massive I/O performance penalties.</p></div>' +
'    <div class="faq-item"><h4>Q2: What is namespace std in C++?</h4><p>A namespace prevents naming collisions between your code and third-party libraries. All standard library symbols live inside <code>namespace std</code>.</p></div>' +
'    <div class="faq-item"><h4>Q3: Should I use "using namespace std;" in my programs?</h4><p>Avoid <code>using namespace std;</code> in header files or large codebases! It pollutes the global namespace and leads to subtle function signature ambiguity bugs.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is the difference between compile-time and runtime errors?</h4><p>Compile-time errors (syntax errors, type mismatches) are caught by the compiler before running. Runtime errors (divide-by-zero, segfaults) occur while the program is executing.</p></div>' +
'    <div class="faq-item"><h4>Q5: Why is C++ considered a zero-overhead abstraction language?</h4><p>Bjarne Stroustrup\'s rule: What you don\'t use, you don\'t pay for. And what you do use, you couldn\'t hand-code any better in assembly.</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(1, '01-cpp-basics-history-compiler-and-hello-world.html',
  'C++ Fundamentals, Compiler Pipeline & Hello World Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Basics (Phase 1): C++ history, C vs C++ matrix, GCC build pipeline, Hello World breakdown, std::cout, namespaces, and C++ standards timeline.',
  'Phase 01', 'C++ Basics & Architecture',
  'C++ History · C vs C++ Matrix · Compiler Pipeline · Hello World Breakdown · std::cout vs printf · \\n vs std::endl · C++ Standards Timeline',
  l1Content, null, null,
  '02-cpp-variables-data-types-constexpr-auto-and-scope.html', '2. Variables, Data Types, constexpr, auto & Scope');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 02: Phase 2 — Variables, Data Types & Scope
// ═══════════════════════════════════════════════════════════════════════════════
const l2Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 2 (Chapter 2): C++ Variables, Data Types, constexpr, auto &amp; Scope Masterclass</strong>! Variables store typed values in system memory. In Modern C++, uniform brace initialization prevents narrowing conversions, <code>constexpr</code> evaluates expressions at compile time, and <code>auto</code> enables clean, expressive type deduction.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>Fundamental C++ Data Types &amp; Memory Sizes</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Data Type</th><th>Keyword</th><th>Typical Size</th><th>Value Range</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Integer</td><td><code>int</code></td><td>4 Bytes (32 bits)</td><td>-2,147,483,648 to 2,147,483,647</td></tr>' +
'      <tr><td>Floating Point</td><td><code>float</code></td><td>4 Bytes (32 bits)</td><td>7 decimal digits precision</td></tr>' +
'      <tr><td>Double Precision</td><td><code>double</code></td><td>8 Bytes (64 bits)</td><td>15-17 decimal digits precision</td></tr>' +
'      <tr><td>Character</td><td><code>char</code></td><td>1 Byte (8 bits)</td><td>-128 to 127 (ASCII Character code)</td></tr>' +
'      <tr><td>Boolean</td><td><code>bool</code></td><td>1 Byte</td><td><code>true</code> (1) or <code>false</code> (0)</td></tr>' +
'      <tr><td>Long Integer</td><td><code>long long</code></td><td>8 Bytes (64 bits)</td><td>-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807</td></tr>' +
'      <tr><td>Unsigned Integer</td><td><code>unsigned int</code></td><td>4 Bytes (32 bits)</td><td>0 to 4,294,967,295</td></tr>' +
'      <tr><td>String</td><td><code>std::string</code></td><td>Dynamic (24B header)</td><td>Sequence of characters</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Initialization Syntaxes &amp; Narrowing Prevention</div>' +
'<div class="section-body">' +
'  <p class="text-prose">C++ supports 3 initialization styles. Modern C++ strongly recommends <strong>Uniform Brace Initialization `{}`</strong> (C++11) because it prevents implicit narrowing conversions!</p>' +
'  <div class="concept-box">' +
'    <h4>Comparing 3 Initialization Styles:</h4>' +
'    <p>• <code>int a = 5.7;</code> — Copy initialization (Narrowed silently to 5, NO WARNING!).</p>' +
'    <p>• <code>int b(5.7);</code> — Direct initialization (Narrowed silently to 5).</p>' +
'    <p>• <code>int c{5.7};</code> — <strong>Uniform Brace Initialization</strong> (COMPILE ERROR! Prevents data loss!).</p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Compile-Time Constants: const vs constexpr</div>' +
'<div class="section-body">' +
'  <p class="text-prose"><code>const</code> marks a value read-only after runtime initialization. <code>constexpr</code> (C++11) forces evaluation at <strong>compile time</strong>, placing computation results directly into constant memory with zero runtime cost!</p>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Comprehensive Code Demonstration</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — Variables, constexpr, auto & Scope</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n' +
'#include &lt;string&gt;\n' +
'#include &lt;vector&gt;\n\n' +
'// Type alias using modern "using" syntax\n' +
'using ScoreList = std::vector&lt;int&gt;;\n\n' +
'// Compile-time constant expression\n' +
'constexpr double calculateArea(double radius) {\n' +
'    return 3.1415926535 * radius * radius;\n' +
'}\n\n' +
'int main() {\n' +
'    std::string name{"Ravi Kumar"};\n' +
'    int age{21};\n' +
'    double height{5.8};\n' +
'    char grade{\'A\'};\n' +
'    bool isStudent{true};\n\n' +
'    // Modern automatic type deduction\n' +
'    auto totalMarks{94.5};\n' +
'    constexpr double circleArea = calculateArea(5.0); // Evaluated at compile time!\n\n' +
'    std::cout &lt;&lt; "Name: " &lt;&lt; name &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Age: " &lt;&lt; age &lt;&lt; " years\\n";\n' +
'    std::cout &lt;&lt; "Height: " &lt;&lt; height &lt;&lt; " ft\\n";\n' +
'    std::cout &lt;&lt; "Grade: " &lt;&lt; grade &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Is Student: " &lt;&lt; std::boolalpha &lt;&lt; isStudent &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Compile-time Area: " &lt;&lt; circleArea &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "size of double: " &lt;&lt; sizeof(double) &lt;&lt; " bytes\\n";\n\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">5</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is the difference between const and constexpr?</h4><p><code>const</code> means "read-only" (value determined at runtime). <code>constexpr</code> means "constant expression" evaluated during compilation.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why prefer "using" over "typedef" in C++11?</h4><p><code>using Alias = Type;</code> works with templates (alias templates) whereas <code>typedef</code> cannot be templated cleanly.</p></div>' +
'    <div class="faq-item"><h4>Q3: Does auto slow down C++ program execution?</h4><p>No! <code>auto</code> type deduction happens entirely at <strong>compile time</strong>. The generated machine code is identical to explicit type declaration.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do you print boolean values as true/false instead of 1/0?</h4><p>Pass the stream manipulator <code>std::cout &lt;&lt; std::boolalpha &lt;&lt; myBool;</code>.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is static_cast in C++?</h4><p><code>static_cast&lt;TargetType&gt;(value)</code> is a safe, compile-time checked type conversion operator in C++ that replaces dangerous C-style `(type)val` casts.</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(2, '02-cpp-variables-data-types-constexpr-auto-and-scope.html',
  'C++ Variables, Data Types, constexpr, auto & Scope Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Variables (Phase 2): Data types, uniform brace initialization, const vs constexpr, auto type deduction, sizeof, type casting, scope, and using aliases.',
  'Phase 02', 'Variables, Data Types & Scope',
  'Fundamental Types · Uniform Brace Initialization · const vs constexpr · auto Keyword · static_cast · Scope & Lifetime · using Type Aliases',
  l2Content,
  '01-cpp-basics-history-compiler-and-hello-world.html', '1. C++ Fundamentals, Compiler Pipeline & Hello World',
  '03-cpp-input-cin-getline-and-operators-masterclass.html', '3. cin, getline(), Operators & 6 Practice Programs');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 03: Phase 3 — Input, Operators & Practice
// ═══════════════════════════════════════════════════════════════════════════════
const l3Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 3 (Chapter 3): C++ Input, cin, getline(), Operators &amp; 6 Practice Programs Masterclass</strong>! Stream input in C++ requires mastering <code>std::cin</code>, line-based reading with <code>std::getline()</code>, avoiding the newline buffer trap with <code>std::cin.ignore()</code>, and handling invalid inputs with <code>std::cerr</code>.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>The cin Newline Input Buffer Trap &amp; Solution</div>' +
'<div class="section-body">' +
'  <p class="text-prose">When mixing <code>std::cin &gt;&gt; age;</code> followed by <code>std::getline(std::cin, name);</code>, the newline character <code>\\n</code> left in the input buffer by <code>cin &gt;&gt;</code> immediately satisfies <code>getline()</code>, causing it to read an empty string!</p>' +
'  <div class="concept-box">' +
'    <h4>The Solution: std::cin.ignore()</h4>' +
'    <p>Always clear leftover newline characters before calling <code>getline()</code>:</p>' +
'    <p><code>std::cin.ignore(std::numeric_limits&lt;std::streamsize&gt;::max(), \'\\n\');</code></p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>6 Complete Practice Programs</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — 6 Interactive Practice Programs</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n' +
'#include &lt;string&gt;\n' +
'#include &lt;limits&gt;\n\n' +
'int main() {\n' +
'    // 1. Safe String & Number Input\n' +
'    std::string fullName;\n' +
'    int age;\n' +
'    double principal, rate, time;\n\n' +
'    std::cout &lt;&lt; "Enter your full name: ";\n' +
'    std::getline(std::cin, fullName);\n\n' +
'    std::cout &lt;&lt; "Enter your age: ";\n' +
'    std::cin &gt;&gt; age;\n\n' +
'    // Clear input buffer before next line input!\n' +
'    std::cin.ignore(std::numeric_limits&lt;std::streamsize&gt;::max(), \'\\n\');\n\n' +
'    // 2. Simple Interest Calculation\n' +
'    std::cout &lt;&lt; "Enter Principal, Rate(%), and Time(years): ";\n' +
'    std::cin &gt;&gt; principal &gt;&gt; rate &gt;&gt; time;\n\n' +
'    double simpleInterest = (principal * rate * time) / 100.0;\n\n' +
'    std::cout &lt;&lt; "\\n--- SUMMARY REPORT ---\\n";\n' +
'    std::cout &lt;&lt; "User: " &lt;&lt; fullName &lt;&lt; " (" &lt;&lt; age &lt;&lt; " yrs)\\n";\n' +
'    std::cout &lt;&lt; "Calculated Simple Interest: $" &lt;&lt; simpleInterest &lt;&lt; "\\n";\n\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is std::cerr used for?</h4><p><code>std::cerr</code> is the standard unbuffered error stream object used to print diagnostic error messages directly to console.</p></div>' +
'    <div class="faq-item"><h4>Q2: How do you detect if std::cin failed to read a number?</h4><p>Check <code>if (std::cin.fail())</code>. Reset state with <code>std::cin.clear()</code> and discard invalid characters with <code>std::cin.ignore()</code>.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is the difference between pre-increment (++x) and post-increment (x++)?</h4><p>Pre-increment <code>++x</code> increments first and returns modified reference. Post-increment <code>x++</code> copies old value, increments, and returns copy.</p></div>' +
'    <div class="faq-item"><h4>Q4: Why does 5 / 2 produce 2 instead of 2.5 in C++?</h4><p>Integer division truncates fractional parts! Use <code>5.0 / 2</code> or <code>static_cast&lt;double&gt;(5) / 2</code> to get 2.5.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is operator overloading introduction in C++?</h4><p>C++ allows defining custom behavior for standard operators (`+`, `-`, `&lt;&lt;`) when applied to user-defined class objects.</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(3, '03-cpp-input-cin-getline-and-operators-masterclass.html',
  'C++ Input, cin, getline(), Operators & 6 Practice Programs Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Input & Operators (Phase 3): std::cin, std::getline, buffer clearing, error streams, operators catalog, and 6 practice programs.',
  'Phase 03', 'Input, Operators & Practice',
  'std::cin & std::getline() · Buffer Clearing (cin.ignore) · Input Error Recovery · Operators & Precedence · Integer Division Traps · 6 Practice Programs',
  l3Content,
  '02-cpp-variables-data-types-constexpr-auto-and-scope.html', '2. Variables, Data Types, constexpr, auto & Scope',
  '04-cpp-conditional-branching-if-else-and-switch-case.html', '4. if-else Ladders, Logical Logic & switch-case');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 04: Phase 4 — Conditional Statements
// ═══════════════════════════════════════════════════════════════════════════════
const l4Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 4 (Chapter 4): C++ Conditional Branching — if-else Ladders, Logical Operators &amp; switch-case Masterclass</strong>! Decision-making structures control execution paths. In this guide, you will master short-circuit evaluation, ternary expressions, scoped enums in <code>switch</code> statements, and grade processing logic.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>Short-Circuit Logical Evaluation</div>' +
'<div class="section-body">' +
'  <p class="text-prose">Logical operators evaluate left-to-right and stop as soon as the outcome is guaranteed:</p>' +
'  <div class="concept-box">' +
'    <h4>Short-Circuit Rules:</h4>' +
'    <p>• <code>A &amp;&amp; B</code>: If <code>A</code> is false, <code>B</code> is NEVER evaluated!</p>' +
'    <p>• <code>A || B</code>: If <code>A</code> is true, <code>B</code> is NEVER evaluated!</p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Complete C++ Grade Processor Program</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — Student Grade Classifier & Enum Switch</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n\n' +
'enum class StudentStatus { Active, Suspended, Graduated };\n\n' +
'int main() {\n' +
'    int marks;\n' +
'    std::cout &lt;&lt; "Enter student marks (0-100): ";\n' +
'    std::cin &gt;&gt; marks;\n\n' +
'    if (marks &lt; 0 || marks &gt; 100) {\n' +
'        std::cout &lt;&lt; "Invalid marks entered! Must be between 0 and 100.\\n";\n' +
'        return 1;\n' +
'    }\n\n' +
'    if (marks &gt;= 90) {\n' +
'        std::cout &lt;&lt; "Grade: A+ (Outstanding)\\n";\n' +
'    } else if (marks &gt;= 75) {\n' +
'        std::cout &lt;&lt; "Grade: A (Distinction)\\n";\n' +
'    } else if (marks &gt;= 60) {\n' +
'        std::cout &lt;&lt; "Grade: B (First Class)\\n";\n' +
'    } else if (marks &gt;= 40) {\n' +
'        std::cout &lt;&lt; "Grade: C (Pass)\\n";\n' +
'    } else {\n' +
'        std::cout &lt;&lt; "Grade: F (Fail)\\n";\n' +
'    }\n\n' +
'    StudentStatus status = StudentStatus::Active;\n' +
'    switch (status) {\n' +
'        case StudentStatus::Active:    std::cout &lt;&lt; "Status: Active Student\\n"; break;\n' +
'        case StudentStatus::Suspended: std::cout &lt;&lt; "Status: Suspended\\n"; break;\n' +
'        case StudentStatus::Graduated: std::cout &lt;&lt; "Status: Graduated Alumni\\n"; break;\n' +
'    }\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is the assignment inside if condition bug?</h4><p>Writing <code>if (x = 5)</code> assigns 5 to x (evaluates to true!) instead of comparing <code>if (x == 5)</code>. Prevent this with compiler flags `-Wall`.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why prefer scoped enum class over un-scoped enum in C++11?</h4><p><code>enum class</code> prevents name leaks into enclosing scope and prevents implicit conversion to integer.</p></div>' +
'    <div class="faq-item"><h4>Q3: Can switch statements evaluate std::string in C++?</h4><p>No! C++ `switch` only works on integral types (int, char, enum). For strings, use `if-else` chains or string hashing.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is if initializer in C++17?</h4><p>C++17 allows declaring variables scoped to the if block: <code>if (auto res = calculate(); res &gt; 0) { ... }</code>.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is switch fall-through behavior?</h4><p>If a `case` block omits `break`, execution continues sequentially into the next case. Mark intentional fall-through with `[[fallthrough]];` attribute in C++17.</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(4, '04-cpp-conditional-branching-if-else-and-switch-case.html',
  'C++ Conditional Branching — if-else Ladders & switch-case Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Decision Making (Phase 4): if-else ladders, short-circuit logical operators, ternary expressions, switch-case, and enum class branching.',
  'Phase 04', 'Conditional Statements',
  'if / else if / else · Short-Circuit Evaluation · Ternary Operator · switch-case & break · Scoped enum class · C++17 if Initializers',
  l4Content,
  '03-cpp-input-cin-getline-and-operators-masterclass.html', '3. cin, getline(), Operators & 6 Practice Programs',
  '05-cpp-loops-for-while-do-while-and-range-based-for.html', '5. for, while, Range-for & 9 Practice Programs');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 05: Phase 5 — Loops & Iterations
// ═══════════════════════════════════════════════════════════════════════════════
const l5Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 5 (Chapter 5): C++ Loops — for, while, do-while &amp; Range-Based for Masterclass</strong>! Iteration structures execute code repeatedly. In Modern C++, range-based <code>for (const auto &amp;item : collection)</code> provides safe, clean traversal of strings, vectors, and arrays.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>Loop Types Comparison Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Loop Construct</th><th>Syntax</th><th>Best Use Case</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Standard <code>for</code></td><td><code>for (int i=0; i&lt;n; i++)</code></td><td>Known iteration count, index access needed</td></tr>' +
'      <tr><td>Range-Based <code>for</code></td><td><code>for (const auto &amp;x : vec)</code></td><td>Modern traversal of containers without manual index counters</td></tr>' +
'      <tr><td><code>while</code></td><td><code>while (condition)</code></td><td>Event-driven iteration where end condition is dynamic</td></tr>' +
'      <tr><td><code>do-while</code></td><td><code>do { ... } while(cond);</code></td><td>Guaranteed at least 1 execution (e.g. Menu loops)</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>9 Practice Programs Code Demonstration</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — Prime, Fibonacci & Range-Based Loop</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n' +
'#include &lt;vector&gt;\n' +
'#include &lt;string&gt;\n\n' +
'bool isPrime(int n) {\n' +
'    if (n &lt;= 1) return false;\n' +
'    for (int i = 2; i * i &lt;= n; i++) {\n' +
'        if (n % i == 0) return false;\n' +
'    }\n' +
'    return true;\n' +
'}\n\n' +
'int main() {\n' +
'    // 1. Fibonacci Series Generation\n' +
'    int n = 7, t1 = 0, t2 = 1, nextTerm;\n' +
'    std::cout &lt;&lt; "Fibonacci Series (7 terms): ";\n' +
'    for (int i = 1; i &lt;= n; ++i) {\n' +
'        std::cout &lt;&lt; t1 &lt;&lt; " ";\n' +
'        nextTerm = t1 + t2;\n' +
'        t1 = t2;\n' +
'        t2 = nextTerm;\n' +
'    }\n' +
'    std::cout &lt;&lt; "\\n";\n\n' +
'    // 2. Prime Number Check\n' +
'    int num = 29;\n' +
'    std::cout &lt;&lt; num &lt;&lt; " is " &lt;&lt; (isPrime(num) ? "PRIME" : "NOT PRIME") &lt;&lt; "\\n";\n\n' +
'    // 3. Modern Range-Based For Loop Over Vector\n' +
'    std::vector&lt;std::string&gt; fruits{"Apple", "Banana", "Cherry"};\n' +
'    std::cout &lt;&lt; "Fruits: ";\n' +
'    for (const auto &amp;fruit : fruits) {\n' +
'        std::cout &lt;&lt; fruit &lt;&lt; " ";\n' +
'    }\n' +
'    std::cout &lt;&lt; "\\n";\n\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why pass by const auto &amp; in range-based for loops?</h4><p>Passing by <code>const auto &amp;</code> avoids making expensive copies of objects while guaranteeing the loop cannot modify elements.</p></div>' +
'    <div class="faq-item"><h4>Q2: What happens if you modify a vector inside a range-based for loop?</h4><p>Adding/removing elements invalidates iterators, leading to <strong>Undefined Behavior</strong> crashes!</p></div>' +
'    <div class="faq-item"><h4>Q3: What is the difference between break and continue?</h4><p><code>break</code> exits the loop immediately. <code>continue</code> skips the rest of the current iteration and advances to the next loop step.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do nested loops affect Big-O time complexity?</h4><p>Two nested loops of size N yield O(N²) quadratic time complexity. Avoid deep nesting for large datasets.</p></div>' +
'    <div class="faq-item"><h4>Q5: Can do-while loops be infinite?</h4><p>Yes, if the condition expression remains true continuously (e.g. `do { ... } while(true);`).</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(5, '05-cpp-loops-for-while-do-while-and-range-based-for.html',
  'C++ Loops — for, while, do-while & Range-Based for Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Iteration (Phase 5): for, while, do-while, Modern range-based for, break, continue, and 9 complete practice programs.',
  'Phase 05', 'Loops & Control Flow',
  'Standard for & while · Modern Range-Based for · break & continue · Star & Number Patterns · Vector Iteration · 9 Practice Programs',
  l5Content,
  '04-cpp-conditional-branching-if-else-and-switch-case.html', '4. if-else Ladders, Logical Logic & switch-case',
  '06-cpp-functions-prototypes-overloading-and-lambdas.html', '6. Functions, Overloading, References & Lambdas');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 06: Phase 6 — Functions & Modular Code
// ═══════════════════════════════════════════════════════════════════════════════
const l6Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 6 (Chapter 6): C++ Functions, Overloading, Pass-by-Reference &amp; Lambdas Masterclass</strong>! Functions modularize code. In Modern C++, pass-by-reference (<code>const T&amp;</code>) prevents unnecessary copying, function overloading enables polymorphic signatures, and lambda expressions (C++11) provide inline anonymous functions.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>Pass-by-Value vs Pass-by-Reference (const T&amp;)</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Passing Strategy</th><th>Syntax</th><th>Copy Overhead?</th><th>Can Modify Original?</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>Pass-by-Value</td><td><code>void f(int x)</code></td><td>Yes (Full copy made)</td><td>No (Operates on copy)</td></tr>' +
'      <tr><td>Pass-by-Reference</td><td><code>void f(int &amp;x)</code></td><td>No (Zero-copy alias)</td><td><strong>Yes</strong> (Modifies original variable)</td></tr>' +
'      <tr><td>Pass-by-Const-Reference</td><td><code>void f(const std::string &amp;s)</code></td><td><strong>No (Zero-copy alias)</strong></td><td><strong>No</strong> (Read-only protection!)</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Function Overloading &amp; Modern Lambdas</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — Overloading, References & Lambdas</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n' +
'#include &lt;string&gt;\n' +
'#include &lt;vector&gt;\n' +
'#include &lt;algorithm&gt;\n\n' +
'// Function Overloading\n' +
'int add(int a, int b) { return a + b; }\n' +
'double add(double a, double b) { return a + b; }\n\n' +
'// Pass-by-Reference to swap\n' +
'void swapValues(int &amp;a, int &amp;b) {\n' +
'    int temp = a;\n' +
'    a = b;\n' +
'    b = temp;\n' +
'}\n\n' +
'int main() {\n' +
'    std::cout &lt;&lt; "int add: " &lt;&lt; add(10, 20) &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "double add: " &lt;&lt; add(5.5, 4.3) &lt;&lt; "\\n";\n\n' +
'    int x = 100, y = 200;\n' +
'    swapValues(x, y);\n' +
'    std::cout &lt;&lt; "After swap: x=" &lt;&lt; x &lt;&lt; ", y=" &lt;&lt; y &lt;&lt; "\\n";\n\n' +
'    // C++11 Lambda Expression\n' +
'    auto square = [](int n) { return n * n; };\n' +
'    std::cout &lt;&lt; "Lambda square(6): " &lt;&lt; square(6) &lt;&lt; "\\n";\n\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: When should I pass by const T& vs pass by value?</h4><p>Pass primitive types (`int`, `double`, `char`) by value. Pass objects, strings, vectors, and custom structs by `const T&amp;` to eliminate copy overhead.</p></div>' +
'    <div class="faq-item"><h4>Q2: How does function overloading work under the hood?</h4><p>The C++ compiler uses <strong>Name Mangling</strong> to encode parameter types directly into the binary symbol name (e.g. `_Z3addii` vs `_Z3adddd`).</p></div>' +
'    <div class="faq-item"><h4>Q3: What are inline functions?</h4><p>Functions declared `inline` hint to the compiler to substitute the function body directly at call sites to eliminate call overhead.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is a lambda capture clause []?</h4><p>`[]` captures no variables. `[=]` captures surrounding variables by value. `[&amp;]` captures surrounding variables by reference.</p></div>' +
'    <div class="faq-item"><h4>Q5: Can default argument values be specified in function definitions?</h4><p>Default arguments should be specified in the <strong>function declaration (prototype)</strong> in header files, NOT repeated in the definition body.</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(6, '06-cpp-functions-prototypes-overloading-and-lambdas.html',
  'C++ Functions, Overloading, Pass-by-Reference & Lambdas Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Functions (Phase 6): Declarations, default arguments, overloading, inline functions, pass-by-reference (const T&), and C++11 Lambdas.',
  'Phase 06', 'Functions & Modular Code',
  'Function Prototypes · Pass-by-Value vs Pass-by-Reference · const T& Performance Rule · Function Overloading · inline Functions · C++11 Lambdas',
  l6Content,
  '05-cpp-loops-for-while-do-while-and-range-based-for.html', '5. for, while, Range-for & 9 Practice Programs',
  '07-cpp-arrays-std-string-string-view-and-std-vector.html', '7. Arrays, std::string, string_view & std::vector');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 07: Phase 7 — Arrays, Strings & Vectors
// ═══════════════════════════════════════════════════════════════════════════════
const l7Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 7 (Chapter 7): C++ Arrays, std::string, string_view &amp; std::vector Masterclass</strong>! Dynamic sequence containers form the backbone of modern software. In this guide, you will master C-style arrays vs <code>std::array</code>, <code>std::string</code> API manipulation, zero-allocation <code>std::string_view</code> (C++17), and dynamic <code>std::vector</code> operations.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>Container Comparison Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Container</th><th>Memory Allocation</th><th>Size Fixed or Dynamic?</th><th>Bounds Checked (.at())?</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>C Array (<code>int arr[5]</code>)</td><td>Stack / Contiguous</td><td>Fixed at compile time</td><td>No (Danger of out-of-bounds!)</td></tr>' +
'      <tr><td><code>std::array&lt;T, N&gt;</code></td><td>Stack / Contiguous</td><td>Fixed at compile time</td><td>Yes (via <code>.at(i)</code>)</td></tr>' +
'      <tr><td><code>std::string</code></td><td>Heap (Small String Opt)</td><td>Dynamic sizing</td><td>Yes (via <code>.at(i)</code>)</td></tr>' +
'      <tr><td><code>std::string_view</code></td><td>Non-owning Pointer+Len</td><td>Fixed slice view</td><td>Yes</td></tr>' +
'      <tr><td><code>std::vector&lt;T&gt;</code></td><td>Heap / Dynamic RAM</td><td><strong>Resizable Dynamic Array</strong></td><td>Yes (via <code>.at(i)</code>)</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>std::vector &amp; std::string_view Code Demonstration</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — std::vector, std::string & string_view</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n' +
'#include &lt;vector&gt;\n' +
'#include &lt;string&gt;\n' +
'#include &lt;string_view&gt;\n\n' +
'void printView(std::string_view sv) {\n' +
'    std::cout &lt;&lt; "StringView: " &lt;&lt; sv &lt;&lt; " (length: " &lt;&lt; sv.length() &lt;&lt; ")\\n";\n' +
'}\n\n' +
'int main() {\n' +
'    // std::vector Operations\n' +
'    std::vector&lt;int&gt; marks{85, 90, 78, 92};\n' +
'    marks.push_back(88);\n' +
'    marks.push_back(95);\n\n' +
'    std::cout &lt;&lt; "Vector size: " &lt;&lt; marks.size() &lt;&lt; ", capacity: " &lt;&lt; marks.capacity() &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Marks: ";\n' +
'    for (int m : marks) {\n' +
'        std::cout &lt;&lt; m &lt;&lt; " ";\n' +
'    }\n' +
'    std::cout &lt;&lt; "\\n";\n\n' +
'    // std::string & std::string_view\n' +
'    std::string text{"Modern C++ High-Performance Computing"};\n' +
'    std::string_view slice{text.c_str() + 7, 3}; // Zero-allocation view of "C++"\n' +
'    printView(slice);\n\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is the difference between vector size() and capacity()?</h4><p><code>size()</code> is the number of elements currently stored. <code>capacity()</code> is the total memory allocated before requiring reallocation.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why use vector.reserve(n)?</h4><p>Calling <code>reserve(n)</code> pre-allocates memory for n elements, avoiding repeated memory reallocation and element copying during <code>push_back()</code>.</p></div>' +
'    <div class="faq-item"><h4>Q3: Why is std::string_view faster than const std::string&?</h4><p><code>std::string_view</code> does NOT allocate memory or copy string data — it simply wraps a pointer and length, enabling zero-allocation substrings.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is Small String Optimization (SSO)?</h4><p>Most C++ compilers store short strings (up to 15-23 characters) directly inside the <code>std::string</code> object on the stack without heap allocation.</p></div>' +
'    <div class="faq-item"><h4>Q5: Difference between [] indexing and .at() method?</h4><p><code>arr[i]</code> does zero bounds checking for speed. <code>arr.at(i)</code> throws <code>std::out_of_range</code> exception if index is invalid.</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(7, '07-cpp-arrays-std-string-string-view-and-std-vector.html',
  'C++ Arrays, std::string, string_view & std::vector Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Sequences (Phase 7): Fixed arrays vs std::array, std::string API, zero-allocation std::string_view, and std::vector operations.',
  'Phase 07', 'Arrays, Strings & Vectors',
  'Fixed Arrays vs std::array · std::string API · std::string_view (C++17) · std::vector push_back/reserve · Range-for Traversal',
  l7Content,
  '06-cpp-functions-prototypes-overloading-and-lambdas.html', '6. Functions, Overloading, References & Lambdas',
  '08-cpp-pointers-references-nullptr-and-memory-safety.html', '8. Pointers, References, nullptr & Memory Safety');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 08: Phase 8 — Pointers & Memory Safety
// ═══════════════════════════════════════════════════════════════════════════════
const l8Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 8 (Chapter 8): C++ Pointers, References, nullptr &amp; Memory Safety Masterclass</strong>! Memory management lies at the core of C++. In Modern C++, raw pointers are used <em>only for non-owning access</em>, <code>nullptr</code> replaces <code>NULL</code>, and resource ownership is managed using smart pointers or RAII.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>Modern C++ Pointer Ownership Rules</div>' +
'<div class="section-body">' +
'  <div class="concept-box">' +
'    <h4>Core Guidelines for Modern C++ Pointers:</h4>' +
'    <p>1. <strong>Use nullptr:</strong> Always initialize pointers to <code>nullptr</code> (C++11) instead of <code>NULL</code> or <code>0</code>.</p>' +
'    <p>2. <strong>Avoid raw new / delete:</strong> Use smart pointers (<code>std::unique_ptr</code>, <code>std::shared_ptr</code>) or containers for resource ownership.</p>' +
'    <p>3. <strong>Raw pointers for Non-Owning View:</strong> Raw pointers (<code>T*</code>) should only be used to inspect or pass memory owned elsewhere.</p>' +
'    <p>4. <strong>Prefer References (T&amp;):</strong> If a parameter cannot be null, pass by reference (<code>T&amp;</code>) rather than pointer (<code>T*</code>).</p>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Code Demonstration: Pointers &amp; References</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — Pointers, References & nullptr</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n\n' +
'int main() {\n' +
'    int number{42};\n' +
'    int* ptr{&amp;number};   // Pointer holding address of number\n' +
'    int&amp; ref{number};    // Reference alias for number\n\n' +
'    std::cout &lt;&lt; "Value of number: " &lt;&lt; number &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Address (&number): " &lt;&lt; &amp;number &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Pointer value (ptr): " &lt;&lt; ptr &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Dereferenced (*ptr): " &lt;&lt; *ptr &lt;&lt; "\\n";\n' +
'    std::cout &lt;&lt; "Reference (ref): " &lt;&lt; ref &lt;&lt; "\\n\\n";\n\n' +
'    // Modifying through reference\n' +
'    ref = 100;\n' +
'    std::cout &lt;&lt; "After ref = 100, number is: " &lt;&lt; number &lt;&lt; "\\n";\n\n' +
'    // C++11 nullptr check\n' +
'    int* nullPtr{nullptr};\n' +
'    if (nullPtr == nullptr) {\n' +
'        std::cout &lt;&lt; "nullPtr is safely checked against nullptr!\\n";\n' +
'    }\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is the difference between a pointer and a reference in C++?</h4><p>Pointers hold memory addresses, can be <code>nullptr</code>, and can be reassigned. References are non-null aliases that must be initialized upon declaration and cannot be reassigned.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why was nullptr introduced in C++11 to replace NULL?</h4><p><code>NULL</code> is macro constant 0 (an integer), which caused function overloading ambiguity between <code>f(int)</code> and <code>f(char*)</code>. <code>nullptr</code> is a dedicated pointer type (<code>std::nullptr_t</code>).</p></div>' +
'    <div class="faq-item"><h4>Q3: What is a dangling pointer?</h4><p>A pointer referencing memory that has already been deallocated or gone out of scope. Accessing a dangling pointer causes undefined behavior.</p></div>' +
'    <div class="faq-item"><h4>Q4: What is pointer arithmetic?</h4><p>Adding/subtracting integers to a pointer moves its address by multiples of <code>sizeof(T)</code> bytes.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is std::unique_ptr?</h4><p>A smart pointer (C++11) that owns a dynamically allocated object exclusively and automatically deallocates it when going out of scope.</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(8, '08-cpp-pointers-references-nullptr-and-memory-safety.html',
  'C++ Pointers, References, nullptr & Memory Safety Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Pointers (Phase 8): Memory addresses, dereferencing, nullptr vs NULL, references (T&), raw pointer rules, and ownership guidelines.',
  'Phase 08', 'Pointers & Memory Safety',
  'Address-of & Dereferencing · nullptr vs NULL · References vs Pointers · Pointer Arithmetic · Ownership Guidelines · Smart Pointers Intro',
  l8Content,
  '07-cpp-arrays-std-string-string-view-and-std-vector.html', '7. Arrays, std::string, string_view & std::vector',
  '09-cpp-object-oriented-programming-classes-objects-and-encapsulation.html', '9. OOP, Classes, Objects, Access Specifiers & Pillars');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 09: Phase 9 — Object-Oriented Programming (OOP)
// ═══════════════════════════════════════════════════════════════════════════════
const l9Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 9 (Chapter 9): C++ Object-Oriented Programming — Classes, Objects &amp; Encapsulation Masterclass</strong>! Object-Oriented Programming (OOP) bundles data members and member functions into cohesive class blueprints. In this guide, you will master access specifiers (<code>public</code>, <code>private</code>, <code>protected</code>), <code>const</code> member functions, <code>static</code> members, and the 4 pillars of OOP.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>The 4 Core Pillars of OOP</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Pillar</th><th>Definition</th><th>C++ Implementation</th></tr></thead>' +
'    <tbody>' +
'      <tr><td>1. Encapsulation</td><td>Bundling data and methods into a single class unit, hiding internal state.</td><td><code>private</code> data members + <code>public</code> getter/setter methods.</td></tr>' +
'      <tr><td>2. Abstraction</td><td>Hiding complex implementation details and showing only high-level interface.</td><td>Abstract classes with pure virtual functions (<code>virtual void f() = 0;</code>).</td></tr>' +
'      <tr><td>3. Inheritance</td><td>Deriving new child classes from existing parent base classes to reuse code.</td><td><code>class Derived : public Base { ... };</code></td></tr>' +
'      <tr><td>4. Polymorphism</td><td>Ability to process objects differently based on their runtime data type.</td><td>Virtual functions (<code>virtual</code>), function overriding &amp; dynamic dispatch.</td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>Complete C++ Student Class Implementation</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — Student Class with Encapsulation & const Members</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n' +
'#include &lt;string&gt;\n\n' +
'class Student {\n' +
'private:\n' +
'    std::string name;\n' +
'    int age;\n' +
'    double marks;\n' +
'    static inline int totalStudents{0}; // C++17 inline static member\n\n' +
'public:\n' +
'    // Constructor with Member Initializer List\n' +
'    Student(std::string studentName, int studentAge, double studentMarks)\n' +
'        : name(studentName), age(studentAge), marks(studentMarks) {\n' +
'        totalStudents++;\n' +
'    }\n\n' +
'    // Destructor\n' +
'    ~Student() { totalStudents--; }\n\n' +
'    // Const member function (guarantees no modification of data members)\n' +
'    void displayDetails() const {\n' +
'        std::cout &lt;&lt; "Student: " &lt;&lt; name &lt;&lt; " | Age: " &lt;&lt; age\n' +
'                  &lt;&lt; " | Marks: " &lt;&lt; marks &lt;&lt; "\\n";\n' +
'    }\n\n' +
'    // Static member function\n' +
'    static int getTotalStudents() { return totalStudents; }\n' +
'};\n\n' +
'int main() {\n' +
'    Student s1("Ravi Kumar", 20, 87.5);\n' +
'    Student s2("Anitha Roy", 21, 92.0);\n\n' +
'    s1.displayDetails();\n' +
'    s2.displayDetails();\n\n' +
'    std::cout &lt;&lt; "Total Active Students: " &lt;&lt; Student::getTotalStudents() &lt;&lt; "\\n";\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: Why mark member functions as const (e.g. void display() const)?</h4><p>Marking a method <code>const</code> promises that it will not modify any data members. Required when operating on <code>const</code> class objects or <code>const T&amp;</code> references!</p></div>' +
'    <div class="faq-item"><h4>Q2: What is the this pointer in C++?</h4><p>An implicit pointer parameter passed to all non-static member functions that points to the invoking class instance object.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is the default access specifier in a C++ class vs struct?</h4><p>Class members default to <code>private</code>. Struct members default to <code>public</code>.</p></div>' +
'    <div class="faq-item"><h4>Q4: How do static data members work in C++?</h4><p>A <code>static</code> data member is shared across ALL instances of the class (only 1 copy exists in memory).</p></div>' +
'    <div class="faq-item"><h4>Q5: What is class composition in C++?</h4><p>Building complex classes by combining simpler objects as data members ("has-a" relationship), preferred over inheritance ("is-a").</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(9, '09-cpp-object-oriented-programming-classes-objects-and-encapsulation.html',
  'C++ Object-Oriented Programming — Classes, Objects & Encapsulation Masterclass',
  'Exhaustive textbook-grade masterclass on C++ OOP (Phase 9): Classes, objects, public/private/protected, member initializer lists, const methods, static members, and 4 pillars of OOP.',
  'Phase 09', 'Object-Oriented Programming',
  'Classes vs Objects · Access Specifiers · Encapsulation · Member Initializer Lists · const Member Functions · static Members · 4 Pillars of OOP',
  l9Content,
  '08-cpp-pointers-references-nullptr-and-memory-safety.html', '8. Pointers, References, nullptr & Memory Safety',
  '10-cpp-constructors-destructors-rule-of-five-and-raii.html', '10. Constructors, Destructors, Rule of 5 & RAII');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 10: Phase 10 — Constructors, Destructors & RAII
// ═══════════════════════════════════════════════════════════════════════════════
const l10Content = '<div class="intro-box">' +
'  <p>Welcome to <strong>Phase 10 (Chapter 10): C++ Constructors, Destructors, Rule of 5 &amp; RAII Masterclass</strong>! Object lifecycle management is the core strength of C++. In this guide, you will master constructors, copy/move semantics, Rule of Zero / Three / Five, and <strong>RAII (Resource Acquisition Is Initialization)</strong>.</p>' +
'</div>' +

'<div class="section-title"><span class="num">1</span>The Rule of Zero, Three, and Five Matrix</div>' +
'<div class="section-body">' +
'  <table class="tbl spec-table">' +
'    <thead><tr><th>Rule Name</th><th>When It Applies</th><th>Special Member Functions to Implement</th></tr></thead>' +
'    <tbody>' +
'      <tr><td><strong>Rule of Zero</strong></td><td>Classes using RAII members (vectors, strings, smart pointers).</td><td><strong>None!</strong> Rely on compiler-generated defaults. (Preferred modern style!)</td></tr>' +
'      <tr><td>Rule of Three (C++98)</td><td>Classes managing raw heap memory or file handles.</td><td>1. Destructor<br>2. Copy Constructor<br>3. Copy Assignment Operator</td></tr>' +
'      <tr><td><strong>Rule of Five (C++11)</strong></td><td>Classes managing raw resources requiring move optimization.</td><td>1. Destructor<br>2. Copy Constructor<br>3. Copy Assignment<br>4. <strong>Move Constructor</strong><br>5. <strong>Move Assignment</strong></td></tr>' +
'    </tbody>' +
'  </table>' +
'</div>' +

'<div class="section-title"><span class="num">2</span>RAII (Resource Acquisition Is Initialization) Paradigm</div>' +
'<div class="section-body">' +
'  <div class="memory-diagram">' +
'RAII Execution Lifecycle:\n\n' +
'  Scope Entry ──► Constructor executes ──► Acquires Resource (Heap memory, File handle, Mutex lock)\n' +
'                       │\n' +
'                       ▼ [Normal Execution OR Exception Thrown]\n' +
'                       │\n' +
'  Scope Exit  ──► Destructor executes  ──► Automatically Releases Resource! (Zero Leaks!)\n' +
'  </div>' +
'  <p class="text-prose">RAII guarantees resource cleanup even if exceptions are thrown during function execution!</p>' +
'</div>' +

'<div class="section-title"><span class="num">3</span>Complete RAII Class Implementation</div>' +
'<div class="section-body">' +
'  <div class="code-block">' +
'    <div class="code-block-header"><span class="lang-tag">C++ — Exception-Safe RAII Resource Manager</span><a class="try-btn" href="/?lang=cpp17">▶ Run Code in C++ Compiler</a></div>' +
'<pre><code>#include &lt;iostream&gt;\n' +
'#include &lt;utility&gt; // for std::move\n\n' +
'class IntBuffer {\n' +
'private:\n' +
'    int* data;\n' +
'    size_t size;\n\n' +
'public:\n' +
'    // 1. Parameterized Constructor (Resource Acquisition)\n' +
'    explicit IntBuffer(size_t bufferSize)\n' +
'        : data(new int[bufferSize]{}), size(bufferSize) {\n' +
'        std::cout &lt;&lt; "[RAII] Allocated buffer of " &lt;&lt; size &lt;&lt; " ints\\n";\n' +
'    }\n\n' +
'    // 2. Destructor (Automatic Resource Release)\n' +
'    ~IntBuffer() {\n' +
'        delete[] data;\n' +
'        std::cout &lt;&lt; "[RAII] Freed buffer memory safely.\\n";\n' +
'    }\n\n' +
'    // 3. Copy Constructor (Deep Copy)\n' +
'    IntBuffer(const IntBuffer&amp; other) : data(new int[other.size]), size(other.size) {\n' +
'        for (size_t i = 0; i &lt; size; i++) data[i] = other.data[i];\n' +
'        std::cout &lt;&lt; "[Rule of 5] Deep Copy Constructor called.\\n";\n' +
'    }\n\n' +
'    // 4. Move Constructor (Resource Transfer - C++11)\n' +
'    IntBuffer(IntBuffer&amp;&amp; other) noexcept : data(other.data), size(other.size) {\n' +
'        other.data = nullptr;\n' +
'        other.size = 0;\n' +
'        std::cout &lt;&lt; "[Rule of 5] Fast Move Constructor called.\\n";\n' +
'    }\n' +
'};\n\n' +
'int main() {\n' +
'    {\n' +
'        IntBuffer buf1(100); // Resource acquired\n' +
'        IntBuffer buf2 = std::move(buf1); // Fast move, zero copy overhead!\n' +
'    } // Scope ends: Destructor automatically called, memory freed!\n\n' +
'    return 0;\n' +
'}</code></pre>' +
'  </div>' +
'</div>' +

'<div class="section-title"><span class="num">4</span>Technical FAQs</div>' +
'<div class="section-body">' +
'  <div class="faq-grid">' +
'    <div class="faq-item"><h4>Q1: What is RAII in C++?</h4><p>Resource Acquisition Is Initialization: A design pattern where resource allocation happens in the constructor and automatic deallocation happens in the destructor when the object goes out of scope.</p></div>' +
'    <div class="faq-item"><h4>Q2: Why prefer Rule of Zero in Modern C++?</h4><p>By using standard containers (`std::vector`, `std::string`, `std::unique_ptr`) as member variables, the compiler automatically generates correct copy, move, and destruction logic without custom code.</p></div>' +
'    <div class="faq-item"><h4>Q3: What is the purpose of std::move?</h4><p><code>std::move(x)</code> casts an lvalue to an rvalue reference (<code>x&amp;&amp;</code>), enabling fast move construction by stealing resources instead of making deep copies.</p></div>' +
'    <div class="faq-item"><h4>Q4: Why mark move operations noexcept?</h4><p>Standard library containers like <code>std::vector</code> will only use fast move constructors during reallocation if marked <code>noexcept</code> for exception safety guarantees.</p></div>' +
'    <div class="faq-item"><h4>Q5: What is constructor delegation?</h4><p>A constructor calling another constructor of the same class in its member initializer list to reuse initialization code (C++11).</p></div>' +
'  </div>' +
'</div>';

makeCppLesson(10, '10-cpp-constructors-destructors-rule-of-five-and-raii.html',
  'C++ Constructors, Destructors, Rule of 5 & RAII Masterclass',
  'Exhaustive textbook-grade masterclass on C++ Object Lifecycle (Phase 10): Constructors, destructors, copy/move semantics, Rule of Zero/Three/Five, and RAII resource management.',
  'Phase 10', 'Constructors, Destructors & RAII',
  'Constructors & Destructors · Member Initializer Lists · Copy vs Move Semantics · Rule of Zero / Three / Five · RAII Resource Management · std::move',
  l10Content,
  '09-cpp-object-oriented-programming-classes-objects-and-encapsulation.html', '9. OOP, Classes, Objects, Access Specifiers & Pillars',
  null, null);

console.log('\n🎉 ALL 10 MODERN C++ MASTER LESSONS GENERATED SUCCESSFULLY!');
