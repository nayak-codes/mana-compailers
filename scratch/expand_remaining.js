/**
 * expand_remaining.js
 * Handles C++, Go, Rust, PHP, Ruby articles
 */

const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, '..', 'public');

// Shared section builders (simplified from previous script)
function makeSections(lang, langUrl, intro, code1, code1Label, code2, code2Label, table, code3, code3Label, faqItems) {
  let faqs = faqItems.map(([q, a]) => `<p><strong>Q: ${q}</strong><br/>${a}</p>`).join('\n');
  return `
<div class="intro-box">
  <p>${intro}</p>
</div>

<div class="section" id="s1">
<div class="section-title"><span class="num">1</span> ${code1Label}</div>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — ${code1Label}</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${code1}</code></pre></div>
</div>

<div class="section" id="s2">
<div class="section-title"><span class="num">2</span> ${code2Label}</div>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — ${code2Label}</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${code2}</code></pre></div>
</div>

<div class="section" id="s3">
<div class="section-title"><span class="num">3</span> Key Reference</div>
${table}
</div>

<div class="section" id="s4">
<div class="section-title"><span class="num">4</span> ${code3Label}</div>
<div class="code-block"><div class="code-block-header"><span class="lang-tag">${lang} — ${code3Label}</span><a class="try-btn" href="${langUrl}">▶ Run Code</a></div>
<pre><code>${code3}</code></pre></div>
<div class="info-box"><strong>💡 Pro Tip:</strong> Use our online ${lang} compiler to run all these examples instantly in your browser — no setup, no installation required. Experiment freely and see results immediately.</div>
</div>

<div class="section" id="s5">
<div class="section-title"><span class="num">5</span> Best Practices</div>
<ul style="color:#c9d1d9; padding-left:24px; line-height:2.2; font-size:15px;">
  <li>Write clear, descriptive variable and function names</li>
  <li>Keep functions small and focused on one task</li>
  <li>Handle errors and edge cases explicitly — don't assume inputs are valid</li>
  <li>Use comments to explain <em>why</em>, not just <em>what</em> the code does</li>
  <li>Test your code with multiple inputs, including edge cases (0, empty, negative)</li>
</ul>
</div>

<div class="section" id="faq">
<div class="section-title"><span class="num">❓</span> Frequently Asked Questions</div>
${faqs}
</div>`;
}

const articles = [
  // ── C++ ────────────────────────────────────────────────────────────────────
  {
    file: 'blog-cpp-syntax.html', langHomeUrl: '/blog-cpp.html', langName: 'C++', lesson: 'Lesson 1',
    title: 'C++ — General Structure &amp; Syntax',
    prev: 'C++ Overview', prevUrl: '/blog-cpp.html',
    next: 'Variables and Data Types', nextUrl: '/blog-cpp-variables.html',
    sections: makeSections('C++', '/?lang=cpp17',
      'C++ is a powerful, compiled language that extends C with object-oriented features, templates, and the Standard Template Library (STL). Understanding its syntax is the first step to writing high-performance applications and system software.',
      `<span class="kw">#include</span> &lt;iostream&gt;
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    cout &lt;&lt; <span class="st">"Hello from C++!"</span> &lt;&lt; endl;
    cout &lt;&lt; <span class="st">"Building with Our Compiler"</span> &lt;&lt; endl;
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      'Hello World',
      `<span class="kw">#include</span> &lt;iostream&gt;
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> a = <span class="nu">10</span>, b = <span class="nu">3</span>;
    cout &lt;&lt; <span class="st">"Sum: "</span> &lt;&lt; (a + b) &lt;&lt; endl;
    cout &lt;&lt; <span class="st">"Div: "</span> &lt;&lt; (a / b) &lt;&lt; endl;   <span class="cm">// integer division: 3</span>
    cout &lt;&lt; <span class="st">"Mod: "</span> &lt;&lt; (a % b) &lt;&lt; endl;   <span class="cm">// 1</span>
    cout &lt;&lt; <span class="st">"Flt: "</span> &lt;&lt; (<span class="kw">float</span>)a / b &lt;&lt; endl; <span class="cm">// 3.333</span>
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      'Arithmetic Operators',
      `<table class="tbl">
  <tr><th>Feature</th><th>C++</th></tr>
  <tr><td>Output</td><td><code>cout &lt;&lt; value &lt;&lt; endl;</code></td></tr>
  <tr><td>Input</td><td><code>cin &gt;&gt; variable;</code></td></tr>
  <tr><td>Comments</td><td><code>// single</code> or <code>/* multi */</code></td></tr>
  <tr><td>Header</td><td><code>#include &lt;iostream&gt;</code></td></tr>
  <tr><td>Namespace</td><td><code>using namespace std;</code></td></tr>
  <tr><td>Return 0</td><td>Signals successful program exit</td></tr>
</table>`,
      `<span class="kw">#include</span> &lt;iostream&gt;
<span class="kw">#include</span> &lt;string&gt;
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    string name;
    <span class="kw">int</span> age;
    cout &lt;&lt; <span class="st">"Enter name: "</span>;
    cin &gt;&gt; name;
    cout &lt;&lt; <span class="st">"Enter age: "</span>;
    cin &gt;&gt; age;
    cout &lt;&lt; <span class="st">"Hello, "</span> &lt;&lt; name &lt;&lt; <span class="st">"! Age: "</span> &lt;&lt; age &lt;&lt; endl;
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      'Reading Input with cin',
      [
        ['What does #include do?', '<code>#include</code> is a preprocessor directive that pulls in the contents of a header file before compilation. <code>&lt;iostream&gt;</code> provides <code>cin</code> and <code>cout</code>. <code>&lt;string&gt;</code> provides the <code>string</code> class.'],
        ['What is "using namespace std;"?', 'It tells the compiler to look in the <code>std</code> namespace by default, so you can write <code>cout</code> instead of <code>std::cout</code> everywhere. For larger projects, prefer explicit <code>std::</code> to avoid naming conflicts.'],
        ['Why return 0 from main()?', '<code>return 0</code> signals to the operating system that the program exited successfully. Non-zero return codes indicate errors and are used by shells and CI systems to detect failures.']
      ])
  },

  {
    file: 'blog-cpp-variables.html', langHomeUrl: '/blog-cpp.html', langName: 'C++', lesson: 'Lesson 2',
    title: 'C++ — Variables and Data Types',
    prev: 'General Structure &amp; Syntax', prevUrl: '/blog-cpp-syntax.html',
    next: 'Conditionals &amp; Logic', nextUrl: '/blog-cpp-conditionals.html',
    sections: makeSections('C++', '/?lang=cpp17',
      'C++ is statically typed — every variable must have a declared type. C++ offers rich type choices from low-level primitives to high-level standard library types like <code>string</code> and <code>vector</code>. Choosing the right type leads to correct, efficient code.',
      `<span class="kw">#include</span> &lt;iostream&gt;
<span class="kw">#include</span> &lt;string&gt;
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> age = <span class="nu">25</span>;
    <span class="kw">double</span> price = <span class="nu">19.99</span>;
    <span class="kw">bool</span> isOpen = <span class="kw">true</span>;
    <span class="kw">char</span> grade = <span class="st">'A'</span>;
    string name = <span class="st">"Our Compiler"</span>;
    <span class="kw">auto</span> count = <span class="nu">42</span>;  <span class="cm">// auto: type deduced by compiler</span>

    cout &lt;&lt; name &lt;&lt; <span class="st">" | Age: "</span> &lt;&lt; age &lt;&lt; endl;
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      'Declaring Variables',
      `<span class="cm">// const — cannot be changed</span>
<span class="kw">const double</span> PI = <span class="nu">3.14159</span>;
<span class="kw">const int</span> MAX = <span class="nu">100</span>;

<span class="cm">// constexpr — compile-time constant</span>
<span class="kw">constexpr int</span> GRID_SIZE = <span class="nu">64</span>;

<span class="cm">// Type casting</span>
<span class="kw">int</span> x = <span class="nu">7</span>, y = <span class="nu">2</span>;
<span class="kw">double</span> result = <span class="kw">static_cast</span>&lt;<span class="kw">double</span>&gt;(x) / y;  <span class="cm">// 3.5</span>
cout &lt;&lt; result &lt;&lt; endl;`,
      'Constants &amp; Casting',
      `<table class="tbl">
  <tr><th>Type</th><th>Size</th><th>Notes</th></tr>
  <tr><td><code>int</code></td><td>4 bytes</td><td>Most common integer type</td></tr>
  <tr><td><code>long long</code></td><td>8 bytes</td><td>For large integers</td></tr>
  <tr><td><code>double</code></td><td>8 bytes</td><td>Preferred floating-point</td></tr>
  <tr><td><code>bool</code></td><td>1 byte</td><td>true or false</td></tr>
  <tr><td><code>char</code></td><td>1 byte</td><td>Single ASCII character</td></tr>
  <tr><td><code>string</code></td><td>Variable</td><td>From &lt;string&gt; header</td></tr>
  <tr><td><code>auto</code></td><td>Variable</td><td>Compiler-inferred type (C++11+)</td></tr>
</table>`,
      `<span class="kw">auto</span> a = <span class="nu">42</span>;         <span class="cm">// int</span>
<span class="kw">auto</span> b = <span class="nu">3.14</span>;       <span class="cm">// double</span>
<span class="kw">auto</span> c = <span class="st">"hello"</span>;    <span class="cm">// const char*</span>
string s = <span class="st">"world"</span>;
<span class="kw">auto</span> d = s;           <span class="cm">// string</span>
cout &lt;&lt; a &lt;&lt; <span class="st">" "</span> &lt;&lt; b &lt;&lt; <span class="st">" "</span> &lt;&lt; c &lt;&lt; endl;`,
      'auto Keyword',
      [
        ['What is the difference between float and double?', 'Both store decimal numbers, but <code>double</code> has twice the precision (~15 significant digits vs ~7 for <code>float</code>). Always prefer <code>double</code> unless memory is critically constrained.'],
        ['What is static_cast vs C-style cast?', '<code>static_cast&lt;T&gt;(value)</code> is the C++ way to cast types explicitly. It is safer than C-style <code>(T)value</code> because it is checked by the compiler and makes intent clear in code reviews.'],
        ['What does auto do?', '<code>auto</code> lets the compiler deduce the type from the initializer. It reduces verbosity, especially with complex types like iterators. Use it when the type is obvious from context.']
      ])
  },

  {
    file: 'blog-cpp-conditionals.html', langHomeUrl: '/blog-cpp.html', langName: 'C++', lesson: 'Lesson 3',
    title: 'C++ — Conditionals &amp; Logic',
    prev: 'Variables and Data Types', prevUrl: '/blog-cpp-variables.html',
    next: 'Loops in C++', nextUrl: '/blog-cpp-loops.html',
    sections: makeSections('C++', '/?lang=cpp17',
      'Conditionals give programs the ability to make decisions. C++ supports the classic <code>if/else</code> chain, <code>switch</code> statements, and the ternary operator. Modern C++17 also introduced <code>if constexpr</code> for compile-time branching.',
      `<span class="kw">int</span> temp = <span class="nu">32</span>;
<span class="kw">if</span> (temp &gt; <span class="nu">35</span>) {
    cout &lt;&lt; <span class="st">"Very hot"</span> &lt;&lt; endl;
} <span class="kw">else if</span> (temp &gt; <span class="nu">25</span>) {
    cout &lt;&lt; <span class="st">"Warm"</span> &lt;&lt; endl;
} <span class="kw">else if</span> (temp &gt; <span class="nu">15</span>) {
    cout &lt;&lt; <span class="st">"Cool"</span> &lt;&lt; endl;
} <span class="kw">else</span> {
    cout &lt;&lt; <span class="st">"Cold"</span> &lt;&lt; endl;
}`,
      'if / else Chain',
      `<span class="kw">int</span> day = <span class="nu">3</span>;
<span class="kw">switch</span> (day) {
    <span class="kw">case</span> <span class="nu">1</span>: cout &lt;&lt; <span class="st">"Mon"</span>; <span class="kw">break</span>;
    <span class="kw">case</span> <span class="nu">2</span>: cout &lt;&lt; <span class="st">"Tue"</span>; <span class="kw">break</span>;
    <span class="kw">case</span> <span class="nu">3</span>: cout &lt;&lt; <span class="st">"Wed"</span>; <span class="kw">break</span>;
    <span class="kw">default</span>: cout &lt;&lt; <span class="st">"Other"</span>;
}

<span class="cm">// Ternary</span>
<span class="kw">int</span> score = <span class="nu">75</span>;
string result = (score &gt;= <span class="nu">60</span>) ? <span class="st">"Pass"</span> : <span class="st">"Fail"</span>;
cout &lt;&lt; result;`,
      'Switch &amp; Ternary',
      `<table class="tbl">
  <tr><th>Operator</th><th>Meaning</th></tr>
  <tr><td><code>==</code>, <code>!=</code></td><td>Equal / Not equal</td></tr>
  <tr><td><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></td><td>Comparisons</td></tr>
  <tr><td><code>&amp;&amp;</code></td><td>Logical AND</td></tr>
  <tr><td><code>||</code></td><td>Logical OR</td></tr>
  <tr><td><code>!</code></td><td>Logical NOT</td></tr>
  <tr><td><code>? :</code></td><td>Ternary (conditional expression)</td></tr>
</table>`,
      `<span class="cm">// Logical operators</span>
<span class="kw">bool</span> hasAccess = <span class="kw">true</span>;
<span class="kw">bool</span> isAdmin = <span class="kw">false</span>;

<span class="kw">if</span> (hasAccess &amp;&amp; !isAdmin) {
    cout &lt;&lt; <span class="st">"Regular user"</span> &lt;&lt; endl;
}
<span class="kw">if</span> (hasAccess || isAdmin) {
    cout &lt;&lt; <span class="st">"Can enter"</span> &lt;&lt; endl;
}`,
      'Logical Operators',
      [
        ['Can switch work with strings in C++?', 'No — C++ <code>switch</code> only works with integral types (int, char, enum). For string comparisons, use if-else chains or a <code>std::map</code> of function pointers.'],
        ['What is short-circuit evaluation?', 'In <code>&amp;&amp;</code>, if the left side is false, the right side is never evaluated. In <code>||</code>, if the left is true, the right is skipped. This prevents crashes like <code>ptr != null &amp;&amp; ptr->value == x</code>.'],
        ['What is if constexpr?', 'Available in C++17, <code>if constexpr</code> evaluates conditions at compile time. The discarded branch is never compiled, making it useful for template metaprogramming.']
      ])
  },

  {
    file: 'blog-cpp-loops.html', langHomeUrl: '/blog-cpp.html', langName: 'C++', lesson: 'Lesson 4',
    title: 'C++ — Loops and Iteration',
    prev: 'Conditionals &amp; Logic', prevUrl: '/blog-cpp-conditionals.html',
    next: 'Functions in C++', nextUrl: '/blog-cpp-functions.html',
    sections: makeSections('C++', '/?lang=cpp17',
      'Loops in C++ are highly efficient — they compile directly to native machine instructions with minimal overhead. The range-based for loop (C++11) dramatically simplifies iteration over containers. Mastering all three loop types is essential for C++ developers.',
      `<span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">0</span>; i &lt; <span class="nu">5</span>; i++) {
    cout &lt;&lt; <span class="st">"i = "</span> &lt;&lt; i &lt;&lt; endl;
}

<span class="cm">// Range-based for (C++11)</span>
vector&lt;string&gt; langs = {<span class="st">"C++"</span>, <span class="st">"Rust"</span>, <span class="st">"Go"</span>};
<span class="kw">for</span> (<span class="kw">const</span> <span class="kw">auto</span>&amp; lang : langs) {
    cout &lt;&lt; lang &lt;&lt; endl;
}`,
      'for &amp; Range-based for',
      `<span class="kw">int</span> n = <span class="nu">1</span>;
<span class="kw">while</span> (n &lt; <span class="nu">1000</span>) n *= <span class="nu">2</span>;
cout &lt;&lt; <span class="st">"First power of 2 >= 1000: "</span> &lt;&lt; n &lt;&lt; endl;

<span class="cm">// do-while (runs at least once)</span>
<span class="kw">int</span> count = <span class="nu">5</span>;
<span class="kw">do</span> {
    cout &lt;&lt; count-- &lt;&lt; <span class="st">" "</span>;
} <span class="kw">while</span> (count &gt; <span class="nu">0</span>);`,
      'while &amp; do-while',
      `<table class="tbl">
  <tr><th>Loop Type</th><th>Best Use Case</th></tr>
  <tr><td><code>for (init;cond;update)</code></td><td>Fixed-count iterations with index</td></tr>
  <tr><td><code>for (auto&amp; x : container)</code></td><td>Iterating over STL containers</td></tr>
  <tr><td><code>while (condition)</code></td><td>Unknown iteration count</td></tr>
  <tr><td><code>do { } while (cond)</code></td><td>Must run at least once</td></tr>
</table>`,
      `<span class="cm">// break and continue</span>
<span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">1</span>; i &lt;= <span class="nu">10</span>; i++) {
    <span class="kw">if</span> (i % <span class="nu">2</span> == <span class="nu">0</span>) <span class="kw">continue</span>; <span class="cm">// skip evens</span>
    <span class="kw">if</span> (i &gt; <span class="nu">7</span>) <span class="kw">break</span>;         <span class="cm">// stop after 7</span>
    cout &lt;&lt; i &lt;&lt; <span class="st">" "</span>;         <span class="cm">// 1 3 5 7</span>
}`,
      'break &amp; continue',
      [
        ['What is the difference between ++i and i++?', '<code>++i</code> (prefix) increments first, then returns the new value. <code>i++</code> (postfix) returns the current value first, then increments. In loop counters, prefer <code>++i</code> — for iterators it avoids creating a temporary copy.'],
        ['How do I loop over an array?', 'Use range-based for: <code>for (auto x : arr)</code> for copies, or <code>for (auto&amp; x : arr)</code> for references (modifies original). Or use index-based for with <code>for (int i=0; i&lt;n; i++)</code>.'],
        ['Can I have multiple variables in a for loop?', 'Yes: <code>for (int i=0, j=10; i&lt;j; i++, j--)</code> — multiple initializers and updates separated by commas.']
      ])
  },

  {
    file: 'blog-cpp-functions.html', langHomeUrl: '/blog-cpp.html', langName: 'C++', lesson: 'Lesson 5',
    title: 'C++ — Functions and Overloading',
    prev: 'Loops in C++', prevUrl: '/blog-cpp-loops.html',
    next: 'STL Collections', nextUrl: '/blog-cpp-collections.html',
    sections: makeSections('C++', '/?lang=cpp17',
      'Functions in C++ are first-class citizens of the language. C++ adds function overloading, default parameters, inline functions, and lambda expressions on top of C\'s function model. These features make C++ code both expressive and efficient.',
      `<span class="kw">#include</span> &lt;iostream&gt;
<span class="kw">using namespace</span> std;

<span class="kw">void</span> <span class="fn">greet</span>(string name, string msg = <span class="st">"Hello"</span>) {
    cout &lt;&lt; msg &lt;&lt; <span class="st">", "</span> &lt;&lt; name &lt;&lt; <span class="st">"!"</span> &lt;&lt; endl;
}

<span class="kw">int</span> <span class="fn">square</span>(<span class="kw">int</span> n) { <span class="kw">return</span> n * n; }
<span class="kw">double</span> <span class="fn">square</span>(<span class="kw">double</span> n) { <span class="kw">return</span> n * n; }  <span class="cm">// overload</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">greet</span>(<span class="st">"Alice"</span>);
    <span class="fn">greet</span>(<span class="st">"Bob"</span>, <span class="st">"Hi"</span>);
    cout &lt;&lt; <span class="fn">square</span>(<span class="nu">5</span>) &lt;&lt; endl;     <span class="cm">// calls int version</span>
    cout &lt;&lt; <span class="fn">square</span>(<span class="nu">2.5</span>) &lt;&lt; endl;   <span class="cm">// calls double version</span>
}`,
      'Function Overloading',
      `<span class="cm">// Lambda expressions (C++11)</span>
<span class="kw">auto</span> add = [](<span class="kw">int</span> a, <span class="kw">int</span> b) { <span class="kw">return</span> a + b; };
cout &lt;&lt; <span class="fn">add</span>(<span class="nu">3</span>, <span class="nu">7</span>) &lt;&lt; endl;  <span class="cm">// 10</span>

<span class="cm">// Lambda with capture</span>
<span class="kw">int</span> factor = <span class="nu">5</span>;
<span class="kw">auto</span> multiply = [factor](<span class="kw">int</span> n) { <span class="kw">return</span> n * factor; };
cout &lt;&lt; <span class="fn">multiply</span>(<span class="nu">6</span>) &lt;&lt; endl;  <span class="cm">// 30</span>`,
      'Lambda Expressions',
      `<table class="tbl">
  <tr><th>Feature</th><th>Syntax</th></tr>
  <tr><td>Pass by value</td><td><code>void f(int x)</code> — copy made</td></tr>
  <tr><td>Pass by reference</td><td><code>void f(int&amp; x)</code> — original modified</td></tr>
  <tr><td>Pass by const ref</td><td><code>void f(const string&amp; s)</code> — read-only, no copy</td></tr>
  <tr><td>Default parameters</td><td><code>void f(int x, int y = 0)</code></td></tr>
  <tr><td>Overloading</td><td>Same name, different parameter types</td></tr>
  <tr><td>Inline</td><td><code>inline int f(int x) {...}</code></td></tr>
</table>`,
      `<span class="cm">// Pass by reference — modifies original</span>
<span class="kw">void</span> <span class="fn">doubleIt</span>(<span class="kw">int</span>&amp; n) { n *= <span class="nu">2</span>; }

<span class="kw">int</span> val = <span class="nu">7</span>;
<span class="fn">doubleIt</span>(val);
cout &lt;&lt; val &lt;&lt; endl;  <span class="cm">// 14</span>`,
      'Pass by Reference',
      [
        ['What is function overloading?', 'Defining multiple functions with the same name but different parameter lists. The compiler picks the right version based on the argument types. This is unique to C++ — C does not support overloading.'],
        ['When should I pass by reference vs by value?', 'Pass primitives (int, double) by value. Pass large objects (strings, vectors, structs) by const reference to avoid expensive copies. Pass by non-const reference only when you need to modify the original.'],
        ['What is a lambda expression?', 'A lambda is an anonymous function defined inline. The <code>[]</code> is the capture clause — it specifies which variables from the surrounding scope the lambda can access.']
      ])
  },

  {
    file: 'blog-cpp-collections.html', langHomeUrl: '/blog-cpp.html', langName: 'C++', lesson: 'Lesson 6',
    title: 'C++ — STL Collections (vector, map)',
    prev: 'Functions and Overloading', prevUrl: '/blog-cpp-functions.html',
    next: null, nextUrl: null,
    sections: makeSections('C++', '/?lang=cpp17',
      'The Standard Template Library (STL) provides powerful, generic collection types. <code>vector</code> is the go-to dynamic array. <code>map</code> and <code>unordered_map</code> provide key-value storage. Understanding the STL is what separates beginner C++ from professional C++.',
      `<span class="kw">#include</span> &lt;iostream&gt;
<span class="kw">#include</span> &lt;vector&gt;
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    vector&lt;<span class="kw">int</span>&gt; scores = {<span class="nu">88</span>, <span class="nu">92</span>, <span class="nu">75</span>, <span class="nu">96</span>};
    scores.push_back(<span class="nu">83</span>);
    scores.pop_back();

    <span class="kw">for</span> (<span class="kw">const</span> <span class="kw">auto</span>&amp; s : scores) {
        cout &lt;&lt; s &lt;&lt; <span class="st">" "</span>;
    }
    cout &lt;&lt; <span class="st">"\\nSize: "</span> &lt;&lt; scores.size() &lt;&lt; endl;
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      'vector — Dynamic Array',
      `<span class="kw">#include</span> &lt;map&gt;
<span class="kw">using namespace</span> std;

<span class="kw">int</span> <span class="fn">main</span>() {
    map&lt;string, <span class="kw">int</span>&gt; scores;
    scores[<span class="st">"Alice"</span>] = <span class="nu">95</span>;
    scores[<span class="st">"Bob"</span>] = <span class="nu">87</span>;
    scores[<span class="st">"Charlie"</span>] = <span class="nu">91</span>;

    <span class="kw">for</span> (<span class="kw">const</span> <span class="kw">auto</span>&amp; [name, score] : scores) {
        cout &lt;&lt; name &lt;&lt; <span class="st">": "</span> &lt;&lt; score &lt;&lt; endl;
    }
    <span class="kw">return</span> <span class="nu">0</span>;
}`,
      'map — Key-Value Store',
      `<table class="tbl">
  <tr><th>Container</th><th>Ordered?</th><th>Lookup</th><th>Use When</th></tr>
  <tr><td><code>vector</code></td><td>Yes (insertion)</td><td>O(n) search</td><td>Dynamic arrays</td></tr>
  <tr><td><code>map</code></td><td>Yes (by key)</td><td>O(log n)</td><td>Sorted key-value pairs</td></tr>
  <tr><td><code>unordered_map</code></td><td>No</td><td>O(1) avg</td><td>Fast key lookup</td></tr>
  <tr><td><code>set</code></td><td>Yes</td><td>O(log n)</td><td>Unique sorted values</td></tr>
  <tr><td><code>stack</code></td><td>LIFO</td><td>O(1) top</td><td>DFS, undo operations</td></tr>
</table>`,
      `<span class="kw">#include</span> &lt;algorithm&gt;
vector&lt;<span class="kw">int</span>&gt; v = {<span class="nu">5</span>, <span class="nu">2</span>, <span class="nu">8</span>, <span class="nu">1</span>, <span class="nu">9</span>, <span class="nu">3</span>};
sort(v.begin(), v.end());           <span class="cm">// ascending</span>
sort(v.begin(), v.end(), greater&lt;<span class="kw">int</span>&gt;()); <span class="cm">// descending</span>
<span class="kw">auto</span> it = find(v.begin(), v.end(), <span class="nu">8</span>);
<span class="kw">if</span> (it != v.end()) cout &lt;&lt; <span class="st">"Found!"</span>;`,
      'Algorithms (sort, find)',
      [
        ['What is the difference between vector and array?', '<code>vector</code> is dynamic — it grows/shrinks automatically. C-style arrays are fixed-size. Prefer <code>vector</code> unless you know the size at compile time and performance is critical.'],
        ['When to use map vs unordered_map?', 'Use <code>map</code> when you need keys in sorted order or need guaranteed O(log n) worst-case. Use <code>unordered_map</code> for faster O(1) average lookups when order doesn\'t matter.'],
        ['What does auto& mean in range-based for?', '<code>auto&amp;</code> is a reference to each element — it avoids copying and lets you modify elements. <code>const auto&amp;</code> is a read-only reference — fastest for iteration without modification.']
      ])
  },

  // ── GO ─────────────────────────────────────────────────────────────────────
  {
    file: 'blog-go-syntax.html', langHomeUrl: '/blog-go.html', langName: 'Go', lesson: 'Lesson 1',
    title: 'Go — General Structure &amp; Syntax',
    prev: 'Go Overview', prevUrl: '/blog-go.html',
    next: 'Variables and Data Types', nextUrl: '/blog-go-variables.html',
    sections: makeSections('Go', '/?lang=go',
      'Go (Golang) is a modern, compiled language created at Google. It emphasizes simplicity, fast compilation, and built-in concurrency. Go programs are structured around packages and functions — there are no classes. Its clean syntax makes it easy to learn while being powerful enough for cloud-scale systems.',
      `<span class="kw">package</span> main

<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
    fmt.Println(<span class="st">"Hello from Go!"</span>)
    fmt.Printf(<span class="st">"Learning Go at %s\\n"</span>, <span class="st">"Our Compiler"</span>)
}`,
      'Hello World',
      `<span class="kw">package</span> main
<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="cm">// Short variable declaration</span>
    name := <span class="st">"Go Developer"</span>
    age := <span class="nu">30</span>
    fmt.Printf(<span class="st">"Name: %s, Age: %d\\n"</span>, name, age)

    <span class="cm">// Multiple assignment</span>
    x, y := <span class="nu">10</span>, <span class="nu">20</span>
    x, y = y, x  <span class="cm">// swap without temp!</span>
    fmt.Println(x, y)
}`,
      'Variables &amp; Short Declaration',
      `<table class="tbl">
  <tr><th>Feature</th><th>Go Syntax</th></tr>
  <tr><td>Package declaration</td><td><code>package main</code> (required)</td></tr>
  <tr><td>Imports</td><td><code>import "fmt"</code> or grouped import</td></tr>
  <tr><td>Entry point</td><td><code>func main()</code></td></tr>
  <tr><td>Short declaration</td><td><code>x := value</code> (type inferred)</td></tr>
  <tr><td>Explicit type</td><td><code>var x int = 5</code></td></tr>
  <tr><td>Output</td><td><code>fmt.Println()</code> or <code>fmt.Printf()</code></td></tr>
  <tr><td>Comments</td><td><code>// single</code> or <code>/* multi */</code></td></tr>
</table>`,
      `<span class="kw">package</span> main
<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">add</span>(a, b <span class="kw">int</span>) <span class="kw">int</span> {
    <span class="kw">return</span> a + b
}

<span class="kw">func</span> <span class="fn">divmod</span>(a, b <span class="kw">int</span>) (<span class="kw">int</span>, <span class="kw">int</span>) {
    <span class="kw">return</span> a / b, a % b
}

<span class="kw">func</span> <span class="fn">main</span>() {
    fmt.Println(<span class="fn">add</span>(<span class="nu">3</span>, <span class="nu">7</span>))
    q, r := <span class="fn">divmod</span>(<span class="nu">17</span>, <span class="nu">5</span>)
    fmt.Printf(<span class="st">"17÷5 = %d rem %d\\n"</span>, q, r)
}`,
      'Functions &amp; Multiple Return Values',
      [
        ['Why does Go use := instead of =?', '<code>:=</code> is the short variable declaration — it declares AND assigns in one step, inferring the type. <code>=</code> only assigns to an already-declared variable. Use <code>:=</code> for most local variables.'],
        ['What is a Go package?', 'Every Go file belongs to a package. The <code>main</code> package is special — it produces an executable. Other packages are libraries. <code>import</code> brings in packages you need.'],
        ['Does Go have classes?', 'No. Go uses structs with methods instead of classes. This achieves similar goals without the complexity of classical OOP hierarchies.']
      ])
  },

  {
    file: 'blog-go-variables.html', langHomeUrl: '/blog-go.html', langName: 'Go', lesson: 'Lesson 2',
    title: 'Go — Variables and Data Types',
    prev: 'General Structure &amp; Syntax', prevUrl: '/blog-go-syntax.html',
    next: 'Conditionals in Go', nextUrl: '/blog-go-conditionals.html',
    sections: makeSections('Go', '/?lang=go',
      'Go has a strong, static type system. Every variable has a type determined at compile time. Go provides basic types (int, float64, string, bool), composite types (arrays, slices, maps, structs), and interfaces. Understanding Go\'s type system is key to writing safe, efficient Go code.',
      `<span class="kw">package</span> main
<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="cm">// Short declaration (most common)</span>
    count := <span class="nu">10</span>
    name := <span class="st">"Our Compiler"</span>
    pi := <span class="nu">3.14159</span>
    active := <span class="kw">true</span>

    <span class="cm">// Explicit type declaration</span>
    <span class="kw">var</span> maxScore <span class="kw">int</span> = <span class="nu">100</span>
    <span class="kw">const</span> VERSION = <span class="st">"1.0.0"</span>

    fmt.Println(count, name, pi, active, maxScore, VERSION)
}`,
      'Variable Declarations',
      `<span class="cm">// Type conversion (explicit in Go)</span>
<span class="kw">var</span> i <span class="kw">int</span> = <span class="nu">42</span>
<span class="kw">var</span> f <span class="kw">float64</span> = <span class="kw">float64</span>(i)  <span class="cm">// must be explicit</span>
<span class="kw">var</span> u <span class="kw">uint</span> = <span class="kw">uint</span>(f)

fmt.Println(i, f, u)

<span class="cm">// String conversion</span>
<span class="kw">import</span> <span class="st">"strconv"</span>
s := strconv.Itoa(<span class="nu">42</span>)   <span class="cm">// int → string: "42"</span>
n, _ := strconv.Atoi(<span class="st">"99"</span>) <span class="cm">// string → int: 99</span>
fmt.Println(s, n)`,
      'Type Conversion',
      `<table class="tbl">
  <tr><th>Type</th><th>Zero Value</th><th>Notes</th></tr>
  <tr><td><code>int</code>, <code>int64</code></td><td><code>0</code></td><td>Platform-sized or explicit</td></tr>
  <tr><td><code>float64</code></td><td><code>0.0</code></td><td>Default floating-point type</td></tr>
  <tr><td><code>bool</code></td><td><code>false</code></td><td><code>true</code> or <code>false</code></td></tr>
  <tr><td><code>string</code></td><td><code>""</code></td><td>UTF-8 encoded, immutable</td></tr>
  <tr><td><code>byte</code></td><td><code>0</code></td><td>Alias for <code>uint8</code></td></tr>
  <tr><td><code>rune</code></td><td><code>0</code></td><td>Alias for <code>int32</code>, Unicode codepoint</td></tr>
</table>`,
      `<span class="cm">// Zero values — Go initializes automatically</span>
<span class="kw">var</span> i <span class="kw">int</span>      <span class="cm">// 0</span>
<span class="kw">var</span> s <span class="kw">string</span>   <span class="cm">// ""</span>
<span class="kw">var</span> b <span class="kw">bool</span>     <span class="cm">// false</span>
fmt.Println(i, s, b)

<span class="cm">// Multiple assignment</span>
a, b, c := <span class="nu">1</span>, <span class="st">"hello"</span>, <span class="kw">true</span>
fmt.Println(a, b, c)`,
      'Zero Values &amp; Multiple Assignment',
      [
        ['What is a zero value in Go?', 'Every variable in Go is automatically initialized to its zero value if not explicitly set: <code>0</code> for numbers, <code>""</code> for strings, <code>false</code> for bools, <code>nil</code> for pointers. This prevents uninitialized variable bugs.'],
        ['Does Go have implicit type conversion?', 'No — Go has no implicit type conversion. You must explicitly convert between types using the type name as a function: <code>float64(myInt)</code>. This prevents accidental precision loss.'],
        ['What is the difference between var and :=?', '<code>var x int = 5</code> is explicit and works at package level. <code>x := 5</code> is shorthand, only works inside functions. Both declare and initialize a variable.']
      ])
  },

  {
    file: 'blog-go-conditionals.html', langHomeUrl: '/blog-go.html', langName: 'Go', lesson: 'Lesson 3',
    title: 'Go — Conditionals and Control Flow',
    prev: 'Variables and Data Types', prevUrl: '/blog-go-variables.html',
    next: 'Loops in Go', nextUrl: '/blog-go-loops.html',
    sections: makeSections('Go', '/?lang=go',
      'Go\'s control flow is intentionally simple. No parentheses around conditions, and braces are mandatory. Go\'s <code>switch</code> does not fall through by default — making it safer than C/Java. Go also has a unique <code>if</code> statement that can include a short initialization statement.',
      `<span class="kw">package</span> main
<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
    score := <span class="nu">78</span>
    <span class="kw">if</span> score >= <span class="nu">90</span> {
        fmt.Println(<span class="st">"Grade: A"</span>)
    } <span class="kw">else if</span> score >= <span class="nu">80</span> {
        fmt.Println(<span class="st">"Grade: B"</span>)
    } <span class="kw">else if</span> score >= <span class="nu">70</span> {
        fmt.Println(<span class="st">"Grade: C"</span>)
    } <span class="kw">else</span> {
        fmt.Println(<span class="st">"Grade: F"</span>)
    }
}`,
      'if / else Chain',
      `<span class="cm">// Go switch — no fallthrough by default</span>
day := <span class="nu">3</span>
<span class="kw">switch</span> day {
<span class="kw">case</span> <span class="nu">1</span>: fmt.Println(<span class="st">"Monday"</span>)
<span class="kw">case</span> <span class="nu">2</span>: fmt.Println(<span class="st">"Tuesday"</span>)
<span class="kw">case</span> <span class="nu">3</span>: fmt.Println(<span class="st">"Wednesday"</span>)
<span class="kw">case</span> <span class="nu">4</span>, <span class="nu">5</span>: fmt.Println(<span class="st">"Thu or Fri"</span>)
<span class="kw">default</span>: fmt.Println(<span class="st">"Weekend"</span>)
}`,
      'switch Statement',
      `<table class="tbl">
  <tr><th>Feature</th><th>Go Syntax</th></tr>
  <tr><td>No parens in condition</td><td><code>if x > 0 {</code> (not <code>if (x > 0)</code>)</td></tr>
  <tr><td>Braces required</td><td>Opening <code>{</code> must be on same line</td></tr>
  <tr><td>Init statement in if</td><td><code>if x := f(); x > 0 {</code></td></tr>
  <tr><td>Switch default</td><td>No fallthrough — each case is independent</td></tr>
  <tr><td>Explicit fallthrough</td><td>Use <code>fallthrough</code> keyword to fall to next case</td></tr>
  <tr><td>Switch without expr</td><td><code>switch { case x &gt; 0: ... }</code></td></tr>
</table>`,
      `<span class="cm">// if with initialization statement</span>
<span class="kw">import</span> <span class="st">"strconv"</span>
<span class="kw">if</span> n, err := strconv.Atoi(<span class="st">"42"</span>); err == <span class="kw">nil</span> {
    fmt.Println(<span class="st">"Parsed:"</span>, n)
} <span class="kw">else</span> {
    fmt.Println(<span class="st">"Error:"</span>, err)
}
<span class="cm">// n and err are only in scope within this if block</span>`,
      'if with Init Statement',
      [
        ['Why no parentheses in Go conditions?', 'Go removes the mandatory parentheses from conditions to reduce visual noise. Braces <code>{}</code> are required though, which prevents the "dangling else" bug common in C.'],
        ['What does Go\'s switch without an expression mean?', '<code>switch { case x &gt; 0: ... }</code> is equivalent to <code>switch true { case x &gt; 0: ... }</code>. It acts like an if-else chain but in switch form — cleaner for multiple boolean conditions.'],
        ['What is defer in Go?', '<code>defer</code> postpones a function call until the surrounding function returns. It\'s used for cleanup (closing files, unlocking mutexes). Deferred calls execute in LIFO order.']
      ])
  },

  {
    file: 'blog-go-loops.html', langHomeUrl: '/blog-go.html', langName: 'Go', lesson: 'Lesson 4',
    title: 'Go — Loops and Goroutines',
    prev: 'Conditionals in Go', prevUrl: '/blog-go-conditionals.html',
    next: 'Functions in Go', nextUrl: '/blog-go-functions.html',
    sections: makeSections('Go', '/?lang=go',
      'Go has only ONE loop keyword: <code>for</code>. But it\'s versatile enough to behave like all three traditional loop types. Go also features goroutines — lightweight concurrent functions — making it uniquely suited for building high-performance concurrent systems.',
      `<span class="kw">package</span> main
<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="cm">// Classic for</span>
    <span class="kw">for</span> i := <span class="nu">1</span>; i &lt;= <span class="nu">5</span>; i++ {
        fmt.Printf(<span class="st">"i = %d\\n"</span>, i)
    }

    <span class="cm">// while-style</span>
    n := <span class="nu">1</span>
    <span class="kw">for</span> n &lt; <span class="nu">100</span> { n *= <span class="nu">2</span> }
    fmt.Println(<span class="st">"n ="</span>, n)

    <span class="cm">// range over slice</span>
    langs := []<span class="kw">string</span>{<span class="st">"Go"</span>, <span class="st">"Rust"</span>, <span class="st">"Python"</span>}
    <span class="kw">for</span> i, lang := <span class="kw">range</span> langs {
        fmt.Printf(<span class="st">"%d: %s\\n"</span>, i, lang)
    }
}`,
      'All Three Loop Styles',
      `<span class="cm">// range over map</span>
scores := map[<span class="kw">string</span>]<span class="kw">int</span>{<span class="st">"Alice"</span>: <span class="nu">95</span>, <span class="st">"Bob"</span>: <span class="nu">87</span>}
<span class="kw">for</span> name, score := <span class="kw">range</span> scores {
    fmt.Printf(<span class="st">"%s: %d\\n"</span>, name, score)
}

<span class="cm">// range over string (runes)</span>
<span class="kw">for</span> i, ch := <span class="kw">range</span> <span class="st">"Hello"</span> {
    fmt.Printf(<span class="st">"%d: %c\\n"</span>, i, ch)
}`,
      'range Over Map &amp; String',
      `<table class="tbl">
  <tr><th>Pattern</th><th>Syntax</th></tr>
  <tr><td>Classic for</td><td><code>for i:=0; i&lt;n; i++</code></td></tr>
  <tr><td>While-style</td><td><code>for condition { ... }</code></td></tr>
  <tr><td>Infinite loop</td><td><code>for { ... }</code> (use break to exit)</td></tr>
  <tr><td>Range over slice</td><td><code>for i, v := range slice</code></td></tr>
  <tr><td>Range over map</td><td><code>for k, v := range m</code></td></tr>
  <tr><td>Range, ignore index</td><td><code>for _, v := range slice</code></td></tr>
</table>`,
      `<span class="cm">// break, continue, labeled break</span>
outer:
<span class="kw">for</span> i := <span class="nu">0</span>; i &lt; <span class="nu">3</span>; i++ {
    <span class="kw">for</span> j := <span class="nu">0</span>; j &lt; <span class="nu">3</span>; j++ {
        <span class="kw">if</span> i == <span class="nu">1</span> &amp;&amp; j == <span class="nu">1</span> {
            <span class="kw">break</span> outer  <span class="cm">// breaks outer loop</span>
        }
        fmt.Printf(<span class="st">"%d,%d "</span>, i, j)
    }
}`,
      'Labeled break',
      [
        ['Why does Go have only one loop keyword?', 'Simplicity is a core Go value. The <code>for</code> loop covers all three traditional patterns (for, while, do-while) with minimal syntax. This reduces the language\'s surface area and makes code more uniform.'],
        ['What does _ mean in range?', 'The blank identifier <code>_</code> discards a value you don\'t need. <code>for _, v := range slice</code> iterates values without tracking the index. It prevents "declared but not used" compile errors.'],
        ['What are goroutines?', 'Goroutines are Go\'s lightweight concurrent functions. Start one with <code>go functionName()</code>. Thousands can run simultaneously with very low overhead. They communicate via channels for safe data sharing.']
      ])
  },

  {
    file: 'blog-go-functions.html', langHomeUrl: '/blog-go.html', langName: 'Go', lesson: 'Lesson 5',
    title: 'Go — Functions and Error Handling',
    prev: 'Loops in Go', prevUrl: '/blog-go-loops.html',
    next: 'Slices and Maps', nextUrl: '/blog-go-collections.html',
    sections: makeSections('Go', '/?lang=go',
      'Go functions are first-class values — they can be stored in variables, passed as arguments, and returned from other functions. Go\'s unique approach to error handling (returning errors as values instead of throwing exceptions) leads to explicit, robust code that makes failures impossible to ignore.',
      `<span class="kw">package</span> main
<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">greet</span>(name <span class="kw">string</span>) <span class="kw">string</span> {
    <span class="kw">return</span> <span class="st">"Hello, "</span> + name + <span class="st">"!"</span>
}

<span class="kw">func</span> <span class="fn">divmod</span>(a, b <span class="kw">int</span>) (<span class="kw">int</span>, <span class="kw">int</span>) {
    <span class="kw">return</span> a / b, a % b
}

<span class="kw">func</span> <span class="fn">main</span>() {
    msg := <span class="fn">greet</span>(<span class="st">"Gopher"</span>)
    fmt.Println(msg)

    q, r := <span class="fn">divmod</span>(<span class="nu">17</span>, <span class="nu">5</span>)
    fmt.Printf(<span class="st">"17÷5 = %d remainder %d\\n"</span>, q, r)
}`,
      'Functions &amp; Multiple Return',
      `<span class="kw">import</span> (<span class="st">"errors"</span>; <span class="st">"fmt"</span>)

<span class="kw">func</span> <span class="fn">safeDivide</span>(a, b <span class="kw">float64</span>) (<span class="kw">float64</span>, error) {
    <span class="kw">if</span> b == <span class="nu">0</span> {
        <span class="kw">return</span> <span class="nu">0</span>, errors.New(<span class="st">"division by zero"</span>)
    }
    <span class="kw">return</span> a / b, <span class="kw">nil</span>
}

result, err := <span class="fn">safeDivide</span>(<span class="nu">10</span>, <span class="nu">2</span>)
<span class="kw">if</span> err != <span class="kw">nil</span> {
    fmt.Println(<span class="st">"Error:"</span>, err)
} <span class="kw">else</span> {
    fmt.Println(<span class="st">"Result:"</span>, result)
}`,
      'Error Handling Pattern',
      `<table class="tbl">
  <tr><th>Feature</th><th>Example</th></tr>
  <tr><td>Single return</td><td><code>func f() int</code></td></tr>
  <tr><td>Multiple returns</td><td><code>func f() (int, error)</code></td></tr>
  <tr><td>Named returns</td><td><code>func f() (n int, err error)</code></td></tr>
  <tr><td>Variadic</td><td><code>func sum(nums ...int) int</code></td></tr>
  <tr><td>Function value</td><td><code>fn := func(x int) int { ... }</code></td></tr>
  <tr><td>Defer</td><td><code>defer file.Close()</code></td></tr>
</table>`,
      `<span class="cm">// Variadic function</span>
<span class="kw">func</span> <span class="fn">sum</span>(nums ...<span class="kw">int</span>) <span class="kw">int</span> {
    total := <span class="nu">0</span>
    <span class="kw">for</span> _, n := <span class="kw">range</span> nums {
        total += n
    }
    <span class="kw">return</span> total
}
fmt.Println(<span class="fn">sum</span>(<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>))  <span class="cm">// 15</span>`,
      'Variadic Functions',
      [
        ['Why does Go return errors instead of throwing exceptions?', 'Go\'s philosophy: errors are values, not exceptional events. Returning errors forces the caller to handle them explicitly. This leads to more reliable code — you can\'t accidentally ignore an error.'],
        ['What is nil in Go?', '<code>nil</code> is the zero value for pointers, slices, maps, channels, functions, and interfaces. Returning <code>nil</code> as the error return value means "no error occurred."'],
        ['What is a defer statement?', '<code>defer f()</code> schedules <code>f</code> to run when the surrounding function returns. Commonly used for resource cleanup (closing files, unlocking). Arguments are evaluated immediately, but execution is deferred.']
      ])
  },

  {
    file: 'blog-go-collections.html', langHomeUrl: '/blog-go.html', langName: 'Go', lesson: 'Lesson 6',
    title: 'Go — Slices and Maps',
    prev: 'Functions in Go', prevUrl: '/blog-go-functions.html',
    next: null, nextUrl: null,
    sections: makeSections('Go', '/?lang=go',
      'Go\'s collection types are simple but powerful. Slices (dynamic arrays) and maps (hash tables) cover 90% of collection needs. Understanding their memory model — especially how slices share underlying arrays — is crucial for writing correct Go programs.',
      `<span class="kw">package</span> main
<span class="kw">import</span> <span class="st">"fmt"</span>

<span class="kw">func</span> <span class="fn">main</span>() {
    <span class="cm">// Slice literal</span>
    scores := []<span class="kw">int</span>{<span class="nu">88</span>, <span class="nu">92</span>, <span class="nu">75</span>, <span class="nu">96</span>}
    scores = append(scores, <span class="nu">83</span>)

    fmt.Println(scores)
    fmt.Println(scores[<span class="nu">1</span>:<span class="nu">3</span>])  <span class="cm">// slice of slice: [92 75]</span>
    fmt.Println(<span class="fn">len</span>(scores), <span class="fn">cap</span>(scores))
}`,
      'Slices',
      `<span class="cm">// Map declaration and usage</span>
phonebook := map[<span class="kw">string</span>]<span class="kw">string</span>{
    <span class="st">"Alice"</span>: <span class="st">"555-1234"</span>,
    <span class="st">"Bob"</span>:   <span class="st">"555-5678"</span>,
}
phonebook[<span class="st">"Charlie"</span>] = <span class="st">"555-9999"</span>

<span class="cm">// Safe lookup with ok pattern</span>
num, ok := phonebook[<span class="st">"Alice"</span>]
<span class="kw">if</span> ok {
    fmt.Println(<span class="st">"Found:"</span>, num)
}

<span class="kw">delete</span>(phonebook, <span class="st">"Bob"</span>)
fmt.Println(<span class="fn">len</span>(phonebook))`,
      'Maps',
      `<table class="tbl">
  <tr><th>Operation</th><th>Slice</th><th>Map</th></tr>
  <tr><td>Create</td><td><code>[]T{}</code> or <code>make([]T, n)</code></td><td><code>map[K]V{}</code> or <code>make(map[K]V)</code></td></tr>
  <tr><td>Add</td><td><code>append(s, val)</code></td><td><code>m[key] = val</code></td></tr>
  <tr><td>Delete</td><td>Re-slice or use <code>slices.Delete</code></td><td><code>delete(m, key)</code></td></tr>
  <tr><td>Length</td><td><code>len(s)</code></td><td><code>len(m)</code></td></tr>
  <tr><td>Iterate</td><td><code>for i, v := range s</code></td><td><code>for k, v := range m</code></td></tr>
  <tr><td>Safe access</td><td><code>s[i]</code> (panics if out of range)</td><td><code>v, ok := m[key]</code></td></tr>
</table>`,
      `<span class="cm">// make — allocate with initial capacity</span>
s := <span class="fn">make</span>([]<span class="kw">int</span>, <span class="nu">0</span>, <span class="nu">10</span>)  <span class="cm">// len=0, cap=10</span>
<span class="kw">for</span> i := <span class="nu">0</span>; i &lt; <span class="nu">10</span>; i++ {
    s = <span class="fn">append</span>(s, i*i)
}
fmt.Println(s)

<span class="cm">// 2D slice</span>
grid := [][]<span class="kw">int</span>{{<span class="nu">1</span>,<span class="nu">2</span>}, {<span class="nu">3</span>,<span class="nu">4</span>}, {<span class="nu">5</span>,<span class="nu">6</span>}}
fmt.Println(grid[<span class="nu">1</span>][<span class="nu">0</span>])  <span class="cm">// 3</span>`,
      'make &amp; 2D Slices',
      [
        ['What is the difference between a slice and an array in Go?', 'Arrays have fixed size: <code>[5]int</code>. Slices are dynamic views into an array: <code>[]int</code>. Slices have length and capacity and can grow with <code>append()</code>. Slices are used almost exclusively in Go.'],
        ['What does make() do for slices?', '<code>make([]int, length, capacity)</code> creates a slice with pre-allocated underlying array. Use it when you know the approximate size to avoid repeated reallocations as you append.'],
        ['Are maps safe for concurrent use?', 'No — standard Go maps are not concurrent-safe. If multiple goroutines read and write a map simultaneously, use <code>sync.RWMutex</code> or <code>sync.Map</code>.']
      ])
  },

  // ── RUST ───────────────────────────────────────────────────────────────────
  {
    file: 'blog-rust-syntax.html', langHomeUrl: '/blog-rust.html', langName: 'Rust', lesson: 'Lesson 1',
    title: 'Rust — General Structure &amp; Syntax',
    prev: 'Rust Overview', prevUrl: '/blog-rust.html',
    next: 'Variables and Data Types', nextUrl: '/blog-rust-variables.html',
    sections: makeSections('Rust', '/?lang=rust',
      'Rust is a systems programming language that guarantees memory safety without garbage collection. Its unique ownership system eliminates entire classes of bugs at compile time. Rust is beloved for performance, safety, and expressive type system — making it ideal for systems, WebAssembly, and high-performance services.',
      `<span class="kw">fn</span> <span class="fn">main</span>() {
    println!(<span class="st">"Hello from Rust!"</span>);
    println!(<span class="st">"Learning Rust at Our Compiler"</span>);

    <span class="kw">let</span> name = <span class="st">"Rustacean"</span>;
    println!(<span class="st">"Welcome, {}!"</span>, name);
}`,
      'Hello World',
      `<span class="cm">// Variables are immutable by default</span>
<span class="kw">let</span> x = <span class="nu">5</span>;          <span class="cm">// immutable</span>
<span class="kw">let mut</span> y = <span class="nu">10</span>;     <span class="cm">// mutable</span>
y += <span class="nu">1</span>;

<span class="cm">// Shadowing — redefine with same name</span>
<span class="kw">let</span> x = x + <span class="nu">1</span>;      <span class="cm">// shadows previous x, now 6</span>
<span class="kw">let</span> x = x * <span class="nu">2</span>;      <span class="cm">// shadows again, now 12</span>
println!(<span class="st">"x = {}, y = {}"</span>, x, y);`,
      'Variables &amp; Mutability',
      `<table class="tbl">
  <tr><th>Feature</th><th>Rust</th></tr>
  <tr><td>Immutable variable</td><td><code>let x = 5;</code></td></tr>
  <tr><td>Mutable variable</td><td><code>let mut x = 5;</code></td></tr>
  <tr><td>Constants</td><td><code>const MAX: u32 = 100;</code></td></tr>
  <tr><td>Print</td><td><code>println!("{}", value)</code></td></tr>
  <tr><td>Comments</td><td><code>// single</code> or <code>/* multi */</code></td></tr>
  <tr><td>Doc comments</td><td><code>/// shown in rustdoc</code></td></tr>
  <tr><td>Macros</td><td>End with <code>!</code>: <code>println!</code>, <code>vec!</code>, <code>assert!</code></td></tr>
</table>`,
      `<span class="kw">fn</span> <span class="fn">add</span>(a: <span class="kw">i32</span>, b: <span class="kw">i32</span>) -> <span class="kw">i32</span> {
    a + b  <span class="cm">// no semicolon = expression = return value</span>
}

<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="kw">let</span> result = <span class="fn">add</span>(<span class="nu">3</span>, <span class="nu">7</span>);
    println!(<span class="st">"3 + 7 = {result}"</span>);  <span class="cm">// {} interpolation</span>

    <span class="kw">let</span> square = |x: <span class="kw">i32</span>| x * x;   <span class="cm">// closure</span>
    println!(<span class="st">"5² = {}"</span>, square(<span class="nu">5</span>));
}`,
      'Functions &amp; Closures',
      [
        ['Why are Rust variables immutable by default?', 'Immutability is the safer default — it prevents accidental modification and makes code easier to reason about. You explicitly opt into mutability with <code>mut</code>, signaling intentional change.'],
        ['What is shadowing in Rust?', 'Shadowing lets you redeclare a variable with the same name, even changing its type. Unlike mutation, shadowing creates a new variable. It\'s useful for transformations: parsing a string input to an integer.'],
        ['What is a macro in Rust?', 'Macros (ending with <code>!</code>) are compile-time code generators. <code>println!</code> is a macro because it needs to handle formatting at compile time. Macros are more powerful than functions — they can take variable argument counts and generate code.']
      ])
  },

  {
    file: 'blog-rust-variables.html', langHomeUrl: '/blog-rust.html', langName: 'Rust', lesson: 'Lesson 2',
    title: 'Rust — Variables and Data Types',
    prev: 'General Structure &amp; Syntax', prevUrl: '/blog-rust-syntax.html',
    next: 'Conditionals in Rust', nextUrl: '/blog-rust-conditionals.html',
    sections: makeSections('Rust', '/?lang=rust',
      'Rust\'s type system is one of the most powerful in any mainstream language. Every value has a type known at compile time. Rust distinguishes between scalar types (integers, floats, bools, chars) and compound types (tuples, arrays). The type system, combined with ownership, is what gives Rust its safety guarantees.',
      `<span class="cm">// Explicit types</span>
<span class="kw">let</span> age: <span class="kw">u32</span> = <span class="nu">25</span>;
<span class="kw">let</span> price: <span class="kw">f64</span> = <span class="nu">19.99</span>;
<span class="kw">let</span> active: <span class="kw">bool</span> = <span class="kw">true</span>;
<span class="kw">let</span> grade: <span class="kw">char</span> = <span class="st">'A'</span>;

<span class="cm">// Type inference</span>
<span class="kw">let</span> count = <span class="nu">42_i32</span>;    <span class="cm">// underscore for readability</span>
<span class="kw">let</span> big = <span class="nu">1_000_000</span>;

println!(<span class="st">"{} {} {} {}"</span>, age, price, active, grade);`,
      'Scalar Types',
      `<span class="cm">// Tuple: fixed-size, mixed types</span>
<span class="kw">let</span> person: (&<span class="kw">str</span>, <span class="kw">u32</span>, <span class="kw">f64</span>) = (<span class="st">"Alice"</span>, <span class="nu">30</span>, <span class="nu">75.5</span>);
println!(<span class="st">"{} is {} years old"</span>, person.<span class="nu">0</span>, person.<span class="nu">1</span>);

<span class="cm">// Destructuring</span>
<span class="kw">let</span> (name, age, weight) = person;

<span class="cm">// Array: fixed-size, same type</span>
<span class="kw">let</span> primes: [<span class="kw">i32</span>; <span class="nu">5</span>] = [<span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">5</span>, <span class="nu">7</span>, <span class="nu">11</span>];
println!(<span class="st">"First prime: {}"</span>, primes[<span class="nu">0</span>]);`,
      'Tuples &amp; Arrays',
      `<table class="tbl">
  <tr><th>Type</th><th>Size</th><th>Range</th></tr>
  <tr><td><code>i8</code>...<code>i128</code></td><td>1–16 bytes</td><td>Signed integers</td></tr>
  <tr><td><code>u8</code>...<code>u128</code></td><td>1–16 bytes</td><td>Unsigned integers</td></tr>
  <tr><td><code>isize</code>/<code>usize</code></td><td>Platform</td><td>Pointer-sized int</td></tr>
  <tr><td><code>f32</code>/<code>f64</code></td><td>4/8 bytes</td><td>Floating-point</td></tr>
  <tr><td><code>bool</code></td><td>1 byte</td><td><code>true</code>/<code>false</code></td></tr>
  <tr><td><code>char</code></td><td>4 bytes</td><td>Unicode scalar value</td></tr>
</table>`,
      `<span class="cm">// Type conversion — explicit in Rust</span>
<span class="kw">let</span> x: <span class="kw">i32</span> = <span class="nu">42</span>;
<span class="kw">let</span> y: <span class="kw">f64</span> = x <span class="kw">as f64</span>;  <span class="cm">// as keyword</span>
<span class="kw">let</span> z: <span class="kw">u8</span> = <span class="nu">255_u8</span>;
<span class="kw">let</span> overflow = z <span class="kw">as i8</span>;  <span class="cm">// -1 (wraps)</span>
println!(<span class="st">"{} {} {}"</span>, y, z, overflow);`,
      'Type Casting with as',
      [
        ['What is the difference between i32 and u32?', '<code>i32</code> is a signed 32-bit integer (-2.1B to 2.1B). <code>u32</code> is unsigned (0 to 4.2B). Use unsigned types for values that can never be negative (array lengths, counts, IDs).'],
        ['Why does Rust have so many integer types?', 'Rust gives you precise control over memory layout. Use the smallest type that fits your data range. <code>usize</code> is the correct type for array indices and sizes — it matches the platform\'s pointer size.'],
        ['What is an f64 vs f32?', '<code>f64</code> is double-precision (preferred). <code>f32</code> is single-precision (half the memory, less precision). Use <code>f64</code> for all general numeric calculations. <code>f32</code> is mainly for graphics/SIMD.']
      ])
  },

  {
    file: 'blog-rust-conditionals.html', langHomeUrl: '/blog-rust.html', langName: 'Rust', lesson: 'Lesson 3',
    title: 'Rust — Conditionals and Pattern Matching',
    prev: 'Variables and Data Types', prevUrl: '/blog-rust-variables.html',
    next: 'Loops in Rust', nextUrl: '/blog-rust-loops.html',
    sections: makeSections('Rust', '/?lang=rust',
      'Rust\'s <code>if</code> is an expression — it returns a value. Rust\'s pattern matching with <code>match</code> is one of the most powerful features in any language — it\'s exhaustive (the compiler ensures all cases are handled) and can match complex data structures.',
      `<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="kw">let</span> temp = <span class="nu">28</span>;

    <span class="kw">if</span> temp > <span class="nu">35</span> {
        println!(<span class="st">"Hot"</span>);
    } <span class="kw">else if</span> temp > <span class="nu">20</span> {
        println!(<span class="st">"Warm"</span>);
    } <span class="kw">else</span> {
        println!(<span class="st">"Cool"</span>);
    }

    <span class="cm">// if as expression</span>
    <span class="kw">let</span> label = <span class="kw">if</span> temp > <span class="nu">25</span> { <span class="st">"warm"</span> } <span class="kw">else</span> { <span class="st">"cool"</span> };
    println!(<span class="st">"It is {label}"</span>);
}`,
      'if Expression',
      `<span class="kw">let</span> number = <span class="nu">7</span>;
<span class="kw">match</span> number {
    <span class="nu">1</span> => println!(<span class="st">"One"</span>),
    <span class="nu">2</span> | <span class="nu">3</span> => println!(<span class="st">"Two or Three"</span>),
    <span class="nu">4</span>..=<span class="nu">6</span> => println!(<span class="st">"Four to Six"</span>),
    n => println!(<span class="st">"Got {n}"</span>),  <span class="cm">// wildcard with binding</span>
}

<span class="cm">// match as expression</span>
<span class="kw">let</span> label = <span class="kw">match</span> number {
    <span class="nu">1</span>..=<span class="nu">5</span> => <span class="st">"small"</span>,
    <span class="nu">6</span>..=<span class="nu">10</span> => <span class="st">"medium"</span>,
    _ => <span class="st">"large"</span>
};`,
      'match Expression',
      `<table class="tbl">
  <tr><th>Feature</th><th>Notes</th></tr>
  <tr><td>if as expression</td><td>All branches must return the same type</td></tr>
  <tr><td>match is exhaustive</td><td>Compiler error if any variant unhandled</td></tr>
  <tr><td>Wildcard</td><td><code>_</code> matches anything, discards value</td></tr>
  <tr><td>Range patterns</td><td><code>1..=5</code> matches 1 through 5 inclusive</td></tr>
  <tr><td>Multiple patterns</td><td><code>1 | 2 | 3</code> matches any of those</td></tr>
  <tr><td>Guard conditions</td><td><code>x if x &gt; 0 => "positive"</code></td></tr>
</table>`,
      `<span class="cm">// Pattern matching on Option</span>
<span class="kw">let</span> maybe: Option&lt;<span class="kw">i32</span>&gt; = Some(<span class="nu">42</span>);
<span class="kw">match</span> maybe {
    Some(n) => println!(<span class="st">"Got: {n}"</span>),
    None => println!(<span class="st">"Nothing"</span>),
}

<span class="cm">// if let — concise option unwrap</span>
<span class="kw">if let</span> Some(value) = maybe {
    println!(<span class="st">"Value is {value}"</span>);
}`,
      'Pattern Matching Option',
      [
        ['What makes Rust match different from switch?', 'Rust\'s <code>match</code> is exhaustive — the compiler enforces that every possible case is handled. It also supports complex patterns, destructuring, range matching, and guard conditions. It\'s far more powerful than switch.'],
        ['What is Option in Rust?', '<code>Option&lt;T&gt;</code> is an enum with two variants: <code>Some(T)</code> (contains a value) and <code>None</code> (no value). It replaces null. The compiler forces you to handle both cases, preventing null pointer exceptions.'],
        ['Can if branches have different types?', 'No — all branches of an <code>if</code> expression (when used as an expression) must return the same type. If they don\'t, it\'s a compile error. This guarantees type safety.']
      ])
  },

  {
    file: 'blog-rust-loops.html', langHomeUrl: '/blog-rust.html', langName: 'Rust', lesson: 'Lesson 4',
    title: 'Rust — Loops and Iterators',
    prev: 'Conditionals', prevUrl: '/blog-rust-conditionals.html',
    next: 'Functions and Ownership', nextUrl: '/blog-rust-functions.html',
    sections: makeSections('Rust', '/?lang=rust',
      'Rust has three loop keywords — <code>loop</code>, <code>while</code>, and <code>for</code>. Rust\'s iterator system is a highlight of the language: a rich set of lazy adapters (map, filter, fold) that compose powerfully and compile to zero-overhead machine code.',
      `<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="cm">// loop — infinite, use break to exit</span>
    <span class="kw">let mut</span> count = <span class="nu">0</span>;
    <span class="kw">let</span> result = <span class="kw">loop</span> {
        count += <span class="nu">1</span>;
        <span class="kw">if</span> count == <span class="nu">10</span> { <span class="kw">break</span> count * <span class="nu">2</span>; }
    };
    println!(<span class="st">"loop result: {result}"</span>);  <span class="cm">// 20</span>

    <span class="cm">// while</span>
    <span class="kw">let mut</span> n = <span class="nu">1</span>;
    <span class="kw">while</span> n < <span class="nu">100</span> { n *= <span class="nu">2</span>; }
    println!(<span class="st">"n = {n}"</span>);
}`,
      'loop &amp; while',
      `<span class="cm">// for with range</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="nu">1</span>..<span class="nu">6</span> {
    println!(<span class="st">"i = {i}"</span>);  <span class="cm">// 1 to 5</span>
}

<span class="cm">// for over array</span>
<span class="kw">let</span> langs = [<span class="st">"Rust"</span>, <span class="st">"Go"</span>, <span class="st">"C++"</span>];
<span class="kw">for</span> lang <span class="kw">in</span> langs.iter() {
    println!(<span class="st">"{lang}"</span>);
}

<span class="cm">// Enumerate</span>
<span class="kw">for</span> (i, lang) <span class="kw">in</span> langs.iter().enumerate() {
    println!(<span class="st">"{}: {}"</span>, i+<span class="nu">1</span>, lang);
}`,
      'for Loops &amp; Iterators',
      `<table class="tbl">
  <tr><th>Iterator Method</th><th>What it does</th></tr>
  <tr><td><code>.map(|x| x*2)</code></td><td>Transform each element</td></tr>
  <tr><td><code>.filter(|x| *x &gt; 3)</code></td><td>Keep elements that match</td></tr>
  <tr><td><code>.sum()</code></td><td>Add all elements</td></tr>
  <tr><td><code>.collect()</code></td><td>Build a Vec from the iterator</td></tr>
  <tr><td><code>.enumerate()</code></td><td>Add index to each element</td></tr>
  <tr><td><code>.fold(init, |acc, x|)</code></td><td>Reduce to a single value</td></tr>
</table>`,
      `<span class="kw">let</span> numbers = vec![<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>, <span class="nu">6</span>];

<span class="kw">let</span> even_squares: Vec&lt;<span class="kw">i32</span>&gt; = numbers.iter()
    .filter(|&&x| x % <span class="nu">2</span> == <span class="nu">0</span>)
    .map(|&x| x * x)
    .collect();

println!(<span class="st">"{:?}"</span>, even_squares);  <span class="cm">// [4, 16, 36]</span>

<span class="kw">let</span> total: <span class="kw">i32</span> = numbers.iter().sum();
println!(<span class="st">"Sum: {total}"</span>);`,
      'Iterator Chaining',
      [
        ['What is the difference between 1..5 and 1..=5?', '<code>1..5</code> is an exclusive range (1, 2, 3, 4 — not 5). <code>1..=5</code> is inclusive (1, 2, 3, 4, 5). Use <code>..=</code> when you want to include the upper bound.'],
        ['Why is loop preferred over while true?', '<code>loop</code> can return a value via <code>break value</code>, making it useful as an expression. The Rust compiler also knows <code>loop</code> never terminates normally, which helps with type inference.'],
        ['Are Rust iterators lazy?', 'Yes — Rust iterators are lazy. Operations like <code>map</code> and <code>filter</code> don\'t do any work until you call a consuming adapter like <code>collect()</code>, <code>sum()</code>, or <code>for</code>. This makes chaining zero-cost.']
      ])
  },

  {
    file: 'blog-rust-functions.html', langHomeUrl: '/blog-rust.html', langName: 'Rust', lesson: 'Lesson 5',
    title: 'Rust — Functions and Ownership',
    prev: 'Loops and Iterators', prevUrl: '/blog-rust-loops.html',
    next: 'Collections (Vec, HashMap)', nextUrl: '/blog-rust-collections.html',
    sections: makeSections('Rust', '/?lang=rust',
      'Rust functions are expressive and concise — the last expression is implicitly returned. But the most distinctive aspect of Rust is its ownership system: every value has exactly one owner, and ownership transfers (moves) when passed to functions. This is what makes Rust memory-safe without garbage collection.',
      `<span class="kw">fn</span> <span class="fn">greet</span>(name: &<span class="kw">str</span>) -> String {
    format!(<span class="st">"Hello, {}!"</span>, name)
}

<span class="kw">fn</span> <span class="fn">max_of</span>(a: <span class="kw">i32</span>, b: <span class="kw">i32</span>) -> <span class="kw">i32</span> {
    <span class="kw">if</span> a > b { a } <span class="kw">else</span> { b }  <span class="cm">// expression return</span>
}

<span class="kw">fn</span> <span class="fn">main</span>() {
    println!(<span class="st">"{}"</span>, <span class="fn">greet</span>(<span class="st">"Rustacean"</span>));
    println!(<span class="st">"Max: {}"</span>, <span class="fn">max_of</span>(<span class="nu">7</span>, <span class="nu">12</span>));
}`,
      'Functions',
      `<span class="kw">fn</span> <span class="fn">takes_ownership</span>(s: String) {
    println!(<span class="st">"Got: {}"</span>, s);
}  <span class="cm">// s dropped here</span>

<span class="kw">fn</span> <span class="fn">borrow</span>(s: &String) {
    println!(<span class="st">"Borrowed: {}"</span>, s);
}  <span class="cm">// s NOT dropped — caller still owns it</span>

<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="kw">let</span> s = String::from(<span class="st">"hello"</span>);
    <span class="fn">borrow</span>(&s);                <span class="cm">// pass reference</span>
    println!(<span class="st">"Still own: {}"</span>, s);  <span class="cm">// still valid</span>
    <span class="fn">takes_ownership</span>(s);        <span class="cm">// s moved</span>
    <span class="cm">// println!("{}", s);     // ❌ s no longer valid</span>
}`,
      'Ownership &amp; Borrowing',
      `<table class="tbl">
  <tr><th>Concept</th><th>Rule</th></tr>
  <tr><td>Ownership</td><td>Each value has exactly one owner</td></tr>
  <tr><td>Drop</td><td>Value is freed when owner goes out of scope</td></tr>
  <tr><td>Move</td><td>Assignment/passing transfers ownership</td></tr>
  <tr><td>Borrow</td><td><code>&T</code> — immutable reference, many allowed</td></tr>
  <tr><td>Mut borrow</td><td><code>&mut T</code> — mutable reference, only one at a time</td></tr>
  <tr><td>Lifetime</td><td>References cannot outlive what they refer to</td></tr>
</table>`,
      `<span class="kw">fn</span> <span class="fn">add_suffix</span>(s: &<span class="kw">mut</span> String) {
    s.push_str(<span class="st">" (edited)"</span>);
}

<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="kw">let mut</span> text = String::from(<span class="st">"Rust"</span>);
    <span class="fn">add_suffix</span>(&<span class="kw">mut</span> text);
    println!(<span class="st">"{}"</span>, text);  <span class="cm">// "Rust (edited)"</span>
}`,
      'Mutable References',
      [
        ['What is the ownership system?', 'Each value in Rust has exactly one owner. When the owner goes out of scope, the value is automatically freed (no garbage collector needed). When you pass a value to a function, ownership moves to that function.'],
        ['What is borrowing?', 'Borrowing lets you use a value without taking ownership, by passing a reference (<code>&T</code>). You can have many immutable borrows at once, OR one mutable borrow — but not both simultaneously. This prevents data races at compile time.'],
        ['What is a String vs &str?', '<code>String</code> is an owned, heap-allocated, growable string. <code>&str</code> is a borrowed string slice (view into string data). Use <code>&str</code> for function parameters (more flexible), <code>String</code> when you need ownership.']
      ])
  },

  {
    file: 'blog-rust-collections.html', langHomeUrl: '/blog-rust.html', langName: 'Rust', lesson: 'Lesson 6',
    title: 'Rust — Collections (Vec, HashMap)',
    prev: 'Functions and Ownership', prevUrl: '/blog-rust-functions.html',
    next: null, nextUrl: null,
    sections: makeSections('Rust', '/?lang=rust',
      'Rust\'s standard collections — <code>Vec</code>, <code>HashMap</code>, <code>HashSet</code>, <code>VecDeque</code> — are well-designed, high-performance, and ownership-aware. <code>Vec&lt;T&gt;</code> is the most commonly used collection. All collections are on the heap and subject to Rust\'s ownership rules.',
      `<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="kw">let mut</span> scores: Vec&lt;<span class="kw">i32</span>&gt; = Vec::new();
    scores.push(<span class="nu">88</span>);
    scores.push(<span class="nu">92</span>);
    scores.push(<span class="nu">75</span>);

    <span class="cm">// Vec macro</span>
    <span class="kw">let</span> v = vec![<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>];

    println!(<span class="st">"{:?}"</span>, scores);
    println!(<span class="st">"len: {}, first: {}"</span>, v.len(), v[<span class="nu">0</span>]);

    <span class="kw">for</span> score <span class="kw">in</span> &scores {
        println!(<span class="st">"{score}"</span>);
    }
}`,
      'Vec — Dynamic Array',
      `<span class="kw">use</span> std::collections::HashMap;

<span class="kw">fn</span> <span class="fn">main</span>() {
    <span class="kw">let mut</span> map: HashMap&lt;String, <span class="kw">i32</span>&gt; = HashMap::new();
    map.insert(String::from(<span class="st">"Alice"</span>), <span class="nu">95</span>);
    map.insert(String::from(<span class="st">"Bob"</span>), <span class="nu">87</span>);

    <span class="cm">// Safe access</span>
    <span class="kw">if let</span> Some(score) = map.get(<span class="st">"Alice"</span>) {
        println!(<span class="st">"Alice: {score}"</span>);
    }

    <span class="cm">// Iterate</span>
    <span class="kw">for</span> (name, score) <span class="kw">in</span> &map {
        println!(<span class="st">"{}: {}"</span>, name, score);
    }
}`,
      'HashMap — Key-Value Store',
      `<table class="tbl">
  <tr><th>Collection</th><th>Use Case</th></tr>
  <tr><td><code>Vec&lt;T&gt;</code></td><td>Dynamic array, ordered, fast indexing</td></tr>
  <tr><td><code>HashMap&lt;K,V&gt;</code></td><td>Fast key-value lookup, O(1) average</td></tr>
  <tr><td><code>HashSet&lt;T&gt;</code></td><td>Unique values, fast membership test</td></tr>
  <tr><td><code>BTreeMap&lt;K,V&gt;</code></td><td>Sorted key-value, O(log n) lookup</td></tr>
  <tr><td><code>VecDeque&lt;T&gt;</code></td><td>Double-ended queue, fast front/back ops</td></tr>
</table>`,
      `<span class="cm">// Entry API — insert if not present</span>
<span class="kw">let mut</span> word_count: HashMap&lt;&amp;<span class="kw">str</span>, <span class="kw">u32</span>&gt; = HashMap::new();
<span class="kw">let</span> text = <span class="st">"hello world hello rust"</span>;
<span class="kw">for</span> word <span class="kw">in</span> text.split_whitespace() {
    <span class="kw">let</span> count = word_count.entry(word).or_insert(<span class="nu">0</span>);
    *count += <span class="nu">1</span>;
}
println!(<span class="st">"{:?}"</span>, word_count);`,
      'Entry API — Word Count',
      [
        ['Why use Vec over arrays?', 'Vec is dynamic — it grows/shrinks at runtime. Arrays are fixed-size known at compile time (<code>[T; N]</code>). Use Vec when size varies, arrays when it\'s fixed and you want stack allocation.'],
        ['What does {:?} mean in println!?', '<code>:?</code> is the Debug format specifier. It prints a developer-friendly representation of any type that implements the <code>Debug</code> trait. Use <code>:#?</code> for pretty-printed multi-line output.'],
        ['What is the Entry API?', 'The entry API (<code>map.entry(key).or_insert(default)</code>) provides an efficient way to insert-or-update in a HashMap without double-lookup. It\'s idiomatic Rust for counting, grouping, and building maps.']
      ])
  },

  // ── PHP ────────────────────────────────────────────────────────────────────
  {
    file: 'blog-php-syntax.html', langHomeUrl: '/blog-php.html', langName: 'PHP', lesson: 'Lesson 1',
    title: 'PHP — Syntax &amp; Basic Structure',
    prev: 'PHP Overview', prevUrl: '/blog-php.html',
    next: 'Variables and Data Types', nextUrl: '/blog-php-variables.html',
    sections: makeSections('PHP', '/?lang=php',
      'PHP is a server-side scripting language that powers over 75% of websites (including WordPress, Facebook, and Wikipedia). Understanding PHP\'s syntax, how variables work, and how to produce output is the foundation of backend web development.',
      `<span class="kw">&lt;?php</span>
<span class="cm">// PHP must be inside &lt;?php ... ?&gt; tags</span>
echo <span class="st">"Hello from PHP!\\n"</span>;

<span class="kw">$name</span> = <span class="st">"Developer"</span>;
<span class="kw">$year</span> = date(<span class="st">"Y"</span>);  <span class="cm">// built-in date function</span>
echo <span class="st">"Welcome, </span><span class="kw">$name</span><span class="st">! Year: </span><span class="kw">$year</span><span class="st">\\n"</span>;
<span class="kw">?&gt;</span>`,
      'Hello World',
      `<span class="kw">&lt;?php</span>
<span class="cm">// Single-line comment</span>
<span class="cm">/* Multi-line comment */</span>
<span class="cm">// Variables always start with $</span>
<span class="kw">$x</span> = <span class="nu">42</span>;
<span class="kw">$greeting</span> = <span class="st">"Hello, World!"</span>;

<span class="cm">// print_r for arrays, var_dump for detailed info</span>
var_dump(<span class="kw">$x</span>);      <span class="cm">// int(42)</span>
echo <span class="kw">$greeting</span> . <span class="st">"\\n"</span>;  <span class="cm">// . = concatenation</span>
<span class="kw">?&gt;</span>`,
      'Comments &amp; Output',
      `<table class="tbl">
  <tr><th>Feature</th><th>PHP Syntax</th></tr>
  <tr><td>Opening tag</td><td><code>&lt;?php</code></td></tr>
  <tr><td>Variables</td><td><code>$variableName</code></td></tr>
  <tr><td>String concat</td><td><code>$a . $b</code></td></tr>
  <tr><td>Output</td><td><code>echo</code> or <code>print</code></td></tr>
  <tr><td>String interpolation</td><td><code>"Hello $name"</code> (double quotes)</td></tr>
  <tr><td>Literal strings</td><td><code>'No interpolation'</code> (single quotes)</td></tr>
  <tr><td>Statement end</td><td><code>;</code> required on every statement</td></tr>
</table>`,
      `<span class="kw">&lt;?php</span>
<span class="kw">$name</span> = <span class="st">"Alice"</span>;
<span class="kw">$age</span> = <span class="nu">30</span>;

<span class="cm">// Double quotes interpolate variables</span>
echo <span class="st">"Name: </span><span class="kw">$name</span><span class="st">, Age: </span><span class="kw">$age</span><span class="st">\\n"</span>;

<span class="cm">// Heredoc for multi-line strings</span>
echo &lt;&lt;&lt;EOT
Hello </span><span class="kw">$name</span><span class="st">!
You are </span><span class="kw">$age</span><span class="st"> years old.
EOT;
<span class="kw">?&gt;</span>`,
      'String Output',
      [
        ['Do all PHP files need the opening tag?', 'Yes — PHP code must be within <code>&lt;?php</code> tags. If the file is purely PHP (no HTML), omit the closing <code>?&gt;</code> tag at the end — this prevents accidental whitespace output.'],
        ['What is the difference between echo and print?', 'Both output strings. <code>echo</code> is slightly faster and can take multiple arguments. <code>print</code> is an expression and returns 1, so it can be used in expressions. Use <code>echo</code> by default.'],
        ['What does var_dump() do?', '<code>var_dump($x)</code> prints the type and value of a variable — essential for debugging. It shows nested structure for arrays and objects. Use <code>print_r($arr)</code> for a more readable array display.']
      ])
  },

  {
    file: 'blog-php-variables.html', langHomeUrl: '/blog-php.html', langName: 'PHP', lesson: 'Lesson 2',
    title: 'PHP — Variables and Data Types',
    prev: 'Syntax &amp; Basic Structure', prevUrl: '/blog-php-syntax.html',
    next: 'Conditionals in PHP', nextUrl: '/blog-php-conditionals.html',
    sections: makeSections('PHP', '/?lang=php',
      'PHP is dynamically typed — a variable can hold any type and the type can change. PHP has scalar types (int, float, string, bool), compound types (array, object), and special types (null, callable). PHP 8 introduced union types and strict type declarations.',
      `<span class="kw">&lt;?php</span>
<span class="kw">$count</span> = <span class="nu">10</span>;          <span class="cm">// int</span>
<span class="kw">$price</span> = <span class="nu">9.99</span>;        <span class="cm">// float</span>
<span class="kw">$name</span> = <span class="st">"Our Compiler"</span>; <span class="cm">// string</span>
<span class="kw">$active</span> = <span class="kw">true</span>;       <span class="cm">// bool</span>
<span class="kw">$nothing</span> = <span class="kw">null</span>;      <span class="cm">// null</span>

echo gettype(<span class="kw">$count</span>) . <span class="st">"\\n"</span>;    <span class="cm">// "integer"</span>
echo gettype(<span class="kw">$price</span>) . <span class="st">"\\n"</span>;    <span class="cm">// "double"</span>
<span class="kw">?&gt;</span>`,
      'Variable Types',
      `<span class="kw">&lt;?php</span>
<span class="cm">// Type juggling (implicit)</span>
<span class="kw">$sum</span> = <span class="st">"5"</span> + <span class="nu">3</span>;     <span class="cm">// 8 (PHP converts string to int)</span>
echo <span class="kw">$sum</span>;

<span class="cm">// Type casting (explicit)</span>
<span class="kw">$str</span> = <span class="st">"42.7abc"</span>;
<span class="kw">$int</span> = (<span class="kw">int</span>) <span class="kw">$str</span>;    <span class="cm">// 42 (stops at non-numeric)</span>
<span class="kw">$flt</span> = (<span class="kw">float</span>) <span class="kw">$str</span>;  <span class="cm">// 42.7</span>
echo <span class="kw">$int</span> . <span class="st">" "</span> . <span class="kw">$flt</span>;
<span class="kw">?&gt;</span>`,
      'Type Casting',
      `<table class="tbl">
  <tr><th>Type</th><th>Example</th><th>Notes</th></tr>
  <tr><td><code>int</code></td><td><code>42</code>, <code>-7</code></td><td>Platform-sized integer</td></tr>
  <tr><td><code>float</code></td><td><code>3.14</code></td><td>Called "double" internally</td></tr>
  <tr><td><code>string</code></td><td><code>"hello"</code></td><td>UTF-8 capable</td></tr>
  <tr><td><code>bool</code></td><td><code>true</code>/<code>false</code></td><td>Case-insensitive</td></tr>
  <tr><td><code>array</code></td><td><code>[1, 2, 3]</code></td><td>Also used as maps</td></tr>
  <tr><td><code>null</code></td><td><code>null</code></td><td>Represents no value</td></tr>
</table>`,
      `<span class="kw">&lt;?php</span>
<span class="cm">// Constants</span>
define(<span class="st">"PI"</span>, <span class="nu">3.14159</span>);
<span class="kw">const</span> APP_NAME = <span class="st">"Our Compiler"</span>;

echo PI . <span class="st">"\\n"</span>;
echo APP_NAME . <span class="st">"\\n"</span>;

<span class="cm">// Variable variables (unusual)</span>
<span class="kw">$varName</span> = <span class="st">"greeting"</span>;
<span class="kw">$$varName</span> = <span class="st">"Hello!"</span>;   <span class="cm">// creates $greeting</span>
echo <span class="kw">$greeting</span>;
<span class="kw">?&gt;</span>`,
      'Constants',
      [
        ['What is type juggling in PHP?', 'PHP automatically converts types when an operation requires it. <code>"5" + 3</code> gives <code>8</code> because PHP converts the string to int. This is flexible but can lead to surprising results — use <code>===</code> for strict comparison.'],
        ['What is the difference between == and ===?', '<code>==</code> is loose comparison (types coerced): <code>0 == "a"</code> is true. <code>===</code> is strict comparison (type and value): <code>0 === "a"</code> is false. Always prefer <code>===</code> to avoid bugs.'],
        ['What is null in PHP?', 'A variable is null if it has no value set, was explicitly assigned <code>null</code>, or was unset with <code>unset()</code>. Check with <code>is_null($x)</code> or <code>$x === null</code>.']
      ])
  },

  {
    file: 'blog-php-conditionals.html', langHomeUrl: '/blog-php.html', langName: 'PHP', lesson: 'Lesson 3',
    title: 'PHP — Conditionals and Control Flow',
    prev: 'Variables and Data Types', prevUrl: '/blog-php-variables.html',
    next: 'Loops in PHP', nextUrl: '/blog-php-loops.html',
    sections: makeSections('PHP', '/?lang=php',
      'PHP\'s control flow is similar to C and JavaScript. It supports if-else, switch, and the ternary operator. PHP 8 added the match expression — a strict, expression-based alternative to switch that does no type juggling.',
      `<span class="kw">&lt;?php</span>
<span class="kw">$score</span> = <span class="nu">82</span>;

<span class="kw">if</span> (<span class="kw">$score</span> >= <span class="nu">90</span>) {
    echo <span class="st">"Grade: A\\n"</span>;
} <span class="kw">elseif</span> (<span class="kw">$score</span> >= <span class="nu">80</span>) {
    echo <span class="st">"Grade: B\\n"</span>;
} <span class="kw">elseif</span> (<span class="kw">$score</span> >= <span class="nu">70</span>) {
    echo <span class="st">"Grade: C\\n"</span>;
} <span class="kw">else</span> {
    echo <span class="st">"Grade: F\\n"</span>;
}
<span class="kw">?&gt;</span>`,
      'if / elseif / else',
      `<span class="kw">&lt;?php</span>
<span class="cm">// PHP 8 match — strict, no fallthrough</span>
<span class="kw">$status</span> = <span class="nu">404</span>;
<span class="kw">$message</span> = <span class="kw">match</span>(<span class="kw">$status</span>) {
    <span class="nu">200</span> => <span class="st">"OK"</span>,
    <span class="nu">301</span> => <span class="st">"Moved Permanently"</span>,
    <span class="nu">404</span> => <span class="st">"Not Found"</span>,
    <span class="nu">500</span> => <span class="st">"Server Error"</span>,
    <span class="kw">default</span> => <span class="st">"Unknown"</span>
};
echo <span class="kw">$message</span>;  <span class="cm">// "Not Found"</span>
<span class="kw">?&gt;</span>`,
      'match Expression (PHP 8)',
      `<table class="tbl">
  <tr><th>Feature</th><th>Notes</th></tr>
  <tr><td><code>elseif</code></td><td>PHP uses <code>elseif</code> (one word), not <code>else if</code></td></tr>
  <tr><td>Ternary</td><td><code>$x = cond ? a : b;</code></td></tr>
  <tr><td>Null coalescing</td><td><code>$x = $val ?? "default";</code> (PHP 7+)</td></tr>
  <tr><td>switch</td><td>Loose comparison (<code>==</code>), can fall through</td></tr>
  <tr><td>match</td><td>Strict comparison (<code>===</code>), no fallthrough (PHP 8)</td></tr>
  <tr><td>Spaceship operator</td><td><code>$a &lt;=&gt; $b</code> returns -1, 0, or 1</td></tr>
</table>`,
      `<span class="kw">&lt;?php</span>
<span class="cm">// Null coalescing operator</span>
<span class="kw">$username</span> = <span class="kw">$_GET</span>[<span class="st">'user'</span>] ?? <span class="st">'Guest'</span>;
echo <span class="kw">$username</span>;

<span class="cm">// Null coalescing assignment</span>
<span class="kw">$config</span> = [];
<span class="kw">$config</span>[<span class="st">'timeout'</span>] ??= <span class="nu">30</span>;  <span class="cm">// set if not already set</span>
echo <span class="kw">$config</span>[<span class="st">'timeout'</span>];
<span class="kw">?&gt;</span>`,
      'Null Coalescing Operator',
      [
        ['What is the difference between switch and match in PHP?', 'switch uses loose comparison (<code>==</code>) and can fall through between cases. match (PHP 8+) uses strict comparison (<code>===</code>), no fall-through, and must be exhaustive. Use match for cleaner, safer code.'],
        ['What is the null coalescing operator?', '<code>$x = $a ?? $b</code> returns <code>$a</code> if it exists and is not null, otherwise <code>$b</code>. It\'s a compact way to provide default values, especially for potentially-undefined array keys or variables.'],
        ['What is the spaceship operator?', '<code>$a &lt;=&gt; $b</code> returns -1 if <code>$a</code> is less than <code>$b</code>, 0 if equal, 1 if greater. It\'s primarily used with <code>usort()</code> for custom sorting.']
      ])
  },

  {
    file: 'blog-php-loops.html', langHomeUrl: '/blog-php.html', langName: 'PHP', lesson: 'Lesson 4',
    title: 'PHP — Loops and Iteration',
    prev: 'Conditionals in PHP', prevUrl: '/blog-php-conditionals.html',
    next: 'Functions in PHP', nextUrl: '/blog-php-functions.html',
    sections: makeSections('PHP', '/?lang=php',
      'PHP supports all standard loop types. The <code>foreach</code> loop is particularly powerful in PHP — it handles both indexed arrays and associative arrays elegantly. PHP also provides many array iteration functions like <code>array_map()</code> and <code>array_filter()</code>.',
      `<span class="kw">&lt;?php</span>
<span class="cm">// Classic for loop</span>
<span class="kw">for</span> (<span class="kw">$i</span> = <span class="nu">1</span>; <span class="kw">$i</span> <= <span class="nu">5</span>; <span class="kw">$i</span>++) {
    echo <span class="st">"i = </span><span class="kw">$i</span><span class="st">\\n"</span>;
}

<span class="cm">// foreach over indexed array</span>
<span class="kw">$langs</span> = [<span class="st">"PHP"</span>, <span class="st">"Python"</span>, <span class="st">"JavaScript"</span>];
<span class="kw">foreach</span> (<span class="kw">$langs</span> <span class="kw">as</span> <span class="kw">$index</span> => <span class="kw">$lang</span>) {
    echo <span class="st">"</span><span class="kw">$index</span><span class="st">: </span><span class="kw">$lang</span><span class="st">\\n"</span>;
}
<span class="kw">?&gt;</span>`,
      'for &amp; foreach',
      `<span class="kw">&lt;?php</span>
<span class="cm">// foreach over associative array</span>
<span class="kw">$student</span> = [
    <span class="st">"name"</span> => <span class="st">"Alice"</span>,
    <span class="st">"age"</span> => <span class="nu">20</span>,
    <span class="st">"grade"</span> => <span class="st">"A"</span>
];

<span class="kw">foreach</span> (<span class="kw">$student</span> <span class="kw">as</span> <span class="kw">$key</span> => <span class="kw">$value</span>) {
    echo <span class="st">"</span><span class="kw">$key</span><span class="st">: </span><span class="kw">$value</span><span class="st">\\n"</span>;
}
<span class="kw">?&gt;</span>`,
      'foreach Associative Arrays',
      `<table class="tbl">
  <tr><th>Loop</th><th>Best For</th></tr>
  <tr><td><code>for</code></td><td>Fixed count iterations with index</td></tr>
  <tr><td><code>while</code></td><td>Loop until a condition changes</td></tr>
  <tr><td><code>do-while</code></td><td>Run at least once</td></tr>
  <tr><td><code>foreach</code></td><td>Iterate arrays and objects</td></tr>
  <tr><td><code>array_map()</code></td><td>Transform array elements functionally</td></tr>
  <tr><td><code>array_filter()</code></td><td>Remove elements that don't match</td></tr>
</table>`,
      `<span class="kw">&lt;?php</span>
<span class="kw">$numbers</span> = [<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>, <span class="nu">6</span>];

<span class="cm">// array_map</span>
<span class="kw">$squared</span> = array_map(<span class="kw">fn</span>(<span class="kw">$n</span>) => <span class="kw">$n</span> ** <span class="nu">2</span>, <span class="kw">$numbers</span>);
print_r(<span class="kw">$squared</span>);  <span class="cm">// [1, 4, 9, 16, 25, 36]</span>

<span class="cm">// array_filter</span>
<span class="kw">$evens</span> = array_filter(<span class="kw">$numbers</span>, <span class="kw">fn</span>(<span class="kw">$n</span>) => <span class="kw">$n</span> % <span class="nu">2</span> === <span class="nu">0</span>);
print_r(<span class="kw">$evens</span>);  <span class="cm">// [2, 4, 6]</span>
<span class="kw">?&gt;</span>`,
      'array_map &amp; array_filter',
      [
        ['What makes foreach special in PHP?', 'PHP\'s foreach works on both indexed arrays (<code>foreach ($arr as $val)</code>) and associative arrays (<code>foreach ($arr as $key => $val)</code>). It\'s the idiomatic way to iterate PHP arrays — always prefer it over a manual index-based for loop.'],
        ['What is array_map vs foreach?', '<code>array_map</code> is functional — it returns a new array with transformed values without modifying the original. <code>foreach</code> is imperative — you loop and do arbitrary operations. Use <code>array_map</code> for pure transformations.'],
        ['How do I break out of nested loops in PHP?', 'Use <code>break 2;</code> to break out of 2 levels of loops. <code>continue 2;</code> similarly skips to the next iteration of the outer loop.']
      ])
  },

  {
    file: 'blog-php-functions.html', langHomeUrl: '/blog-php.html', langName: 'PHP', lesson: 'Lesson 5',
    title: 'PHP — Functions',
    prev: 'Loops in PHP', prevUrl: '/blog-php-loops.html',
    next: 'OOP in PHP', nextUrl: '/blog-php-oop.html',
    sections: makeSections('PHP', '/?lang=php',
      'PHP functions are flexible — they support default parameters, type declarations (PHP 7+), variable arguments, and closures. Understanding how to write and use functions well is essential for building organized, reusable PHP applications.',
      `<span class="kw">&lt;?php</span>
<span class="kw">function</span> <span class="fn">greet</span>(<span class="kw">string</span> <span class="kw">$name</span>, <span class="kw">string</span> <span class="kw">$greeting</span> = <span class="st">"Hello"</span>): <span class="kw">string</span> {
    <span class="kw">return</span> <span class="st">"</span><span class="kw">$greeting</span><span class="st">, </span><span class="kw">$name</span><span class="st">!"</span>;
}

echo <span class="fn">greet</span>(<span class="st">"Alice"</span>) . <span class="st">"\\n"</span>;
echo <span class="fn">greet</span>(<span class="st">"Bob"</span>, <span class="st">"Hi"</span>) . <span class="st">"\\n"</span>;
<span class="kw">?&gt;</span>`,
      'Function Declaration',
      `<span class="kw">&lt;?php</span>
<span class="cm">// Closures / arrow functions (PHP 7.4+)</span>
<span class="kw">$multiply</span> = <span class="kw">fn</span>(<span class="kw">$a</span>, <span class="kw">$b</span>) => <span class="kw">$a</span> * <span class="kw">$b</span>;
echo <span class="kw">$multiply</span>(<span class="nu">3</span>, <span class="nu">7</span>) . <span class="st">"\\n"</span>;

<span class="cm">// Variadic functions</span>
<span class="kw">function</span> <span class="fn">sumAll</span>(<span class="kw">int</span> ...<span class="kw">$nums</span>): <span class="kw">int</span> {
    <span class="kw">return</span> array_sum(<span class="kw">$nums</span>);
}
echo <span class="fn">sumAll</span>(<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>);  <span class="cm">// 15</span>
<span class="kw">?&gt;</span>`,
      'Closures &amp; Variadic Functions',
      `<table class="tbl">
  <tr><th>Feature</th><th>PHP 8 Syntax</th></tr>
  <tr><td>Type declarations</td><td><code>function f(int $x): string</code></td></tr>
  <tr><td>Union types</td><td><code>int|float</code></td></tr>
  <tr><td>Nullable type</td><td><code>?string</code> = string or null</td></tr>
  <tr><td>Named arguments</td><td><code>greet(name: "Alice")</code></td></tr>
  <tr><td>Default parameters</td><td><code>function f($x = 10)</code></td></tr>
  <tr><td>Return type</td><td><code>function f(): void</code></td></tr>
</table>`,
      `<span class="kw">&lt;?php</span>
<span class="cm">// Pass by reference</span>
<span class="kw">function</span> <span class="fn">increment</span>(<span class="kw">int</span> &<span class="kw">$n</span>): <span class="kw">void</span> {
    <span class="kw">$n</span>++;
}

<span class="kw">$val</span> = <span class="nu">10</span>;
<span class="fn">increment</span>(<span class="kw">$val</span>);
echo <span class="kw">$val</span>;  <span class="cm">// 11</span>
<span class="kw">?&gt;</span>`,
      'Pass by Reference',
      [
        ['What are type declarations in PHP?', 'PHP 7+ allows you to declare parameter types (<code>int</code>, <code>string</code>, <code>array</code>, class names) and return types. This catches type errors earlier. Enable strict mode with <code>declare(strict_types=1);</code> for stricter enforcement.'],
        ['What is an arrow function?', 'Arrow functions (<code>fn($x) => $x * 2</code>) are short closures introduced in PHP 7.4. They automatically capture variables from the surrounding scope — no need for <code>use</code>.'],
        ['What is pass by reference?', 'By default, PHP passes variables by value (a copy). Adding <code>&</code> before the parameter name passes by reference — the function modifies the original variable. Use sparingly as it can make code harder to understand.']
      ])
  },

  {
    file: 'blog-php-oop.html', langHomeUrl: '/blog-php.html', langName: 'PHP', lesson: 'Lesson 6',
    title: 'PHP — OOP: Classes and Objects',
    prev: 'Functions in PHP', prevUrl: '/blog-php-functions.html',
    next: 'Arrays and Collections', nextUrl: '/blog-php-collections.html',
    sections: makeSections('PHP', '/?lang=php',
      'PHP has had object-oriented features since PHP 5, and PHP 8 brought significant improvements. Modern PHP OOP includes classes, interfaces, traits, abstract classes, and enums. Understanding OOP in PHP is essential for frameworks like Laravel, Symfony, and WordPress.',
      `<span class="kw">&lt;?php</span>
<span class="kw">class</span> Car {
    <span class="kw">public string</span> <span class="kw">$brand</span>;
    <span class="kw">public int</span> <span class="kw">$year</span>;
    <span class="kw">private float</span> <span class="kw">$price</span>;

    <span class="kw">public function</span> <span class="fn">__construct</span>(<span class="kw">string</span> <span class="kw">$brand</span>, <span class="kw">int</span> <span class="kw">$year</span>, <span class="kw">float</span> <span class="kw">$price</span>) {
        <span class="kw">$this</span>->brand = <span class="kw">$brand</span>;
        <span class="kw">$this</span>->year = <span class="kw">$year</span>;
        <span class="kw">$this</span>->price = <span class="kw">$price</span>;
    }

    <span class="kw">public function</span> <span class="fn">getInfo</span>(): <span class="kw">string</span> {
        <span class="kw">return</span> <span class="st">"</span><span class="kw">{$this->brand}</span><span class="st"> (</span><span class="kw">{$this->year}</span><span class="st">) - $</span><span class="kw">{$this->price}</span><span class="st">"</span>;
    }
}

<span class="kw">$car</span> = <span class="kw">new</span> Car(<span class="st">"Toyota"</span>, <span class="nu">2023</span>, <span class="nu">25000</span>);
echo <span class="kw">$car</span>->getInfo();
<span class="kw">?&gt;</span>`,
      'Classes &amp; Objects',
      `<span class="kw">&lt;?php</span>
<span class="kw">class</span> Animal {
    <span class="kw">public function</span> <span class="fn">speak</span>(): <span class="kw">string</span> {
        <span class="kw">return</span> <span class="st">"..."</span>;
    }
}

<span class="kw">class</span> Dog <span class="kw">extends</span> Animal {
    <span class="kw">public function</span> <span class="fn">speak</span>(): <span class="kw">string</span> {
        <span class="kw">return</span> <span class="st">"Woof!"</span>;
    }
}

<span class="kw">$dog</span> = <span class="kw">new</span> Dog();
echo <span class="kw">$dog</span>->speak();  <span class="cm">// Woof!</span>
<span class="kw">?&gt;</span>`,
      'Inheritance',
      `<table class="tbl">
  <tr><th>Access Modifier</th><th>Visible From</th></tr>
  <tr><td><code>public</code></td><td>Anywhere</td></tr>
  <tr><td><code>protected</code></td><td>Class and subclasses</td></tr>
  <tr><td><code>private</code></td><td>Same class only</td></tr>
  <tr><td><code>readonly</code> (PHP 8.1)</td><td>Set once in constructor only</td></tr>
  <tr><td><code>static</code></td><td>Belongs to class, not instance</td></tr>
  <tr><td><code>abstract</code></td><td>Must be implemented by subclasses</td></tr>
</table>`,
      `<span class="kw">&lt;?php</span>
<span class="cm">// PHP 8 Constructor Promotion</span>
<span class="kw">class</span> Point {
    <span class="kw">public function</span> <span class="fn">__construct</span>(
        <span class="kw">public readonly float</span> <span class="kw">$x</span>,
        <span class="kw">public readonly float</span> <span class="kw">$y</span>
    ) {}

    <span class="kw">public function</span> <span class="fn">distanceTo</span>(Point <span class="kw">$other</span>): <span class="kw">float</span> {
        <span class="kw">return</span> sqrt((<span class="kw">$this</span>->x - <span class="kw">$other</span>->x)**<span class="nu">2</span> + (<span class="kw">$this</span>->y - <span class="kw">$other</span>->y)**<span class="nu">2</span>);
    }
}
<span class="kw">$p</span> = <span class="kw">new</span> Point(<span class="nu">3</span>, <span class="nu">4</span>);
echo <span class="kw">$p</span>->distanceTo(<span class="kw">new</span> Point(<span class="nu">0</span>, <span class="nu">0</span>));  <span class="cm">// 5</span>
<span class="kw">?&gt;</span>`,
      'Constructor Promotion (PHP 8)',
      [
        ['What is a trait in PHP?', 'Traits are reusable code blocks that can be included in multiple classes (<code>use TraitName;</code>). They solve the single-inheritance limitation — you can compose behavior from multiple traits without multiple inheritance.'],
        ['What is an interface in PHP?', 'An interface defines a contract — a set of method signatures that implementing classes must provide. A class can implement multiple interfaces, enabling polymorphism without inheritance.'],
        ['What is constructor promotion?', 'PHP 8 constructor promotion lets you declare and initialize properties directly in the constructor signature: <code>public function __construct(public string $name)</code> automatically creates <code>$this->name</code>.']
      ])
  },

  {
    file: 'blog-php-collections.html', langHomeUrl: '/blog-php.html', langName: 'PHP', lesson: 'Lesson 7',
    title: 'PHP — Arrays and Collections',
    prev: 'OOP: Classes and Objects', prevUrl: '/blog-php-oop.html',
    next: null, nextUrl: null,
    sections: makeSections('PHP', '/?lang=php',
      'PHP arrays are one of the most versatile data structures in any language — they serve as indexed lists, associative maps, stacks, queues, and trees. PHP provides 70+ array functions for sorting, searching, transforming, and combining arrays.',
      `<span class="kw">&lt;?php</span>
<span class="cm">// Indexed array</span>
<span class="kw">$fruits</span> = [<span class="st">"apple"</span>, <span class="st">"banana"</span>, <span class="st">"cherry"</span>];
<span class="kw">$fruits</span>[] = <span class="st">"date"</span>;  <span class="cm">// append</span>
echo count(<span class="kw">$fruits</span>) . <span class="st">"\\n"</span>;  <span class="cm">// 4</span>

<span class="cm">// Sort</span>
sort(<span class="kw">$fruits</span>);
print_r(<span class="kw">$fruits</span>);

<span class="cm">// Search</span>
<span class="kw">$pos</span> = array_search(<span class="st">"cherry"</span>, <span class="kw">$fruits</span>);
echo <span class="st">"cherry at index </span><span class="kw">$pos</span><span class="st">\\n"</span>;
<span class="kw">?&gt;</span>`,
      'Indexed Arrays',
      `<span class="kw">&lt;?php</span>
<span class="cm">// Associative array (key => value)</span>
<span class="kw">$config</span> = [
    <span class="st">"host"</span> => <span class="st">"localhost"</span>,
    <span class="st">"port"</span> => <span class="nu">3306</span>,
    <span class="st">"database"</span> => <span class="st">"myapp"</span>
];

echo <span class="kw">$config</span>[<span class="st">"host"</span>] . <span class="st">"\\n"</span>;
<span class="kw">$config</span>[<span class="st">"timeout"</span>] = <span class="nu">30</span>;

<span class="kw">foreach</span> (<span class="kw">$config</span> <span class="kw">as</span> <span class="kw">$key</span> => <span class="kw">$val</span>) {
    echo <span class="st">"</span><span class="kw">$key</span><span class="st">: </span><span class="kw">$val</span><span class="st">\\n"</span>;
}
<span class="kw">?&gt;</span>`,
      'Associative Arrays',
      `<table class="tbl">
  <tr><th>Function</th><th>What it does</th></tr>
  <tr><td><code>array_push($a, $v)</code></td><td>Add to end</td></tr>
  <tr><td><code>array_pop($a)</code></td><td>Remove from end</td></tr>
  <tr><td><code>array_merge($a, $b)</code></td><td>Combine two arrays</td></tr>
  <tr><td><code>array_keys($a)</code></td><td>Get all keys</td></tr>
  <tr><td><code>array_values($a)</code></td><td>Get all values (re-indexed)</td></tr>
  <tr><td><code>in_array($val, $a)</code></td><td>Check if value exists</td></tr>
  <tr><td><code>array_unique($a)</code></td><td>Remove duplicate values</td></tr>
</table>`,
      `<span class="kw">&lt;?php</span>
<span class="kw">$numbers</span> = [<span class="nu">3</span>, <span class="nu">1</span>, <span class="nu">4</span>, <span class="nu">1</span>, <span class="nu">5</span>, <span class="nu">9</span>, <span class="nu">2</span>, <span class="nu">6</span>];

<span class="cm">// array_map</span>
<span class="kw">$doubled</span> = array_map(<span class="kw">fn</span>(<span class="kw">$n</span>) => <span class="kw">$n</span> * <span class="nu">2</span>, <span class="kw">$numbers</span>);

<span class="cm">// array_filter</span>
<span class="kw">$over5</span> = array_filter(<span class="kw">$numbers</span>, <span class="kw">fn</span>(<span class="kw">$n</span>) => <span class="kw">$n</span> > <span class="nu">5</span>);

<span class="cm">// array_reduce — sum</span>
<span class="kw">$sum</span> = array_reduce(<span class="kw">$numbers</span>, <span class="kw">fn</span>(<span class="kw">$carry</span>, <span class="kw">$n</span>) => <span class="kw">$carry</span> + <span class="kw">$n</span>, <span class="nu">0</span>);
echo <span class="kw">$sum</span>;  <span class="cm">// 31</span>
<span class="kw">?&gt;</span>`,
      'Functional Array Methods',
      [
        ['How do I check if a key exists in a PHP array?', 'Use <code>array_key_exists("key", $arr)</code> (checks key existence even if value is null) or <code>isset($arr["key"])</code> (checks key exists AND value is not null).'],
        ['What is the difference between sort() and asort()?', '<code>sort()</code> sorts values and re-indexes the array. <code>asort()</code> sorts values but preserves the original keys. Use <code>asort()</code> when key-value associations matter.'],
        ['How do I convert an array to JSON in PHP?', 'Use <code>json_encode($array)</code> to convert to a JSON string. Use <code>json_decode($json, true)</code> to convert JSON back to an associative PHP array.']
      ])
  },

  // ── RUBY ───────────────────────────────────────────────────────────────────
  {
    file: 'blog-ruby-syntax.html', langHomeUrl: '/blog-ruby.html', langName: 'Ruby', lesson: 'Lesson 1',
    title: 'Ruby — Syntax &amp; Basic Structure',
    prev: 'Ruby Overview', prevUrl: '/blog-ruby.html',
    next: 'Variables and Data Types', nextUrl: '/blog-ruby-variables.html',
    sections: makeSections('Ruby', '/?lang=ruby',
      'Ruby is a dynamic, object-oriented language designed for developer happiness. Its clean, expressive syntax reads almost like English. Ruby powers Rails — one of the most productive web frameworks ever built. Everything in Ruby is an object, even primitive values like numbers and booleans.',
      `<span class="cm"># Ruby — Hello World</span>
puts <span class="st">"Hello from Ruby!"</span>

name = <span class="st">"Developer"</span>
age = <span class="nu">25</span>
puts <span class="st">"Welcome, #{name}! Age: #{age}"</span>  <span class="cm"># string interpolation</span>

<span class="cm"># Everything is an object</span>
puts <span class="nu">42</span>.class      <span class="cm"># Integer</span>
puts <span class="st">"hi"</span>.upcase   <span class="cm"># HI</span>
puts [<span class="nu">1</span>,<span class="nu">2</span>].length   <span class="cm"># 2</span>`,
      'Hello World',
      `<span class="cm"># Comments</span>
<span class="cm"># Single-line: use #</span>
=begin
Multi-line comment
Uses =begin and =end
=end

<span class="cm"># puts vs print</span>
puts <span class="st">"Adds newline"</span>
print <span class="st">"No newline"</span>
p <span class="st">"Shows type info"</span>   <span class="cm"># "Shows type info" (with quotes)</span>`,
      'Comments &amp; Output',
      `<table class="tbl">
  <tr><th>Feature</th><th>Ruby Syntax</th></tr>
  <tr><td>Output</td><td><code>puts</code>, <code>print</code>, <code>p</code></td></tr>
  <tr><td>String interpolation</td><td><code>"Hello #{name}"</code></td></tr>
  <tr><td>Comments</td><td><code>#</code> or <code>=begin...=end</code></td></tr>
  <tr><td>No semicolons needed</td><td>One statement per line</td></tr>
  <tr><td>No type declaration</td><td>Dynamically typed</td></tr>
  <tr><td>Methods</td><td><code>def method_name ... end</code></td></tr>
  <tr><td>Blocks</td><td><code>do ... end</code> or <code>{ ... }</code></td></tr>
</table>`,
      `<span class="cm"># Conditional modifiers (postfix)</span>
puts <span class="st">"Adult!"</span> <span class="kw">if</span> age >= <span class="nu">18</span>
puts <span class="st">"Retry"</span> <span class="kw">unless</span> success

<span class="cm"># Multi-line expressions</span>
result = <span class="nu">1</span> +
         <span class="nu">2</span> +
         <span class="nu">3</span>
puts result  <span class="cm"># 6</span>

<span class="cm"># Range</span>
(<span class="nu">1</span>..<span class="nu">5</span>).each { |i| print <span class="st">"#{i} "</span> }`,
      'Conditional Modifiers',
      [
        ['Is Ruby truly object-oriented?', 'Yes — everything in Ruby is an object. Integers, strings, arrays, even classes themselves are objects. You can call methods on literals: <code>-5.abs</code> returns <code>5</code>, <code>2.times { puts "hi" }</code> prints twice.'],
        ['What is string interpolation?', 'Double-quoted strings support <code>#{expression}</code> — the expression is evaluated and its result is embedded in the string. Single-quoted strings treat <code>#</code> literally with no interpolation.'],
        ['What is the difference between puts and p?', '<code>puts</code> converts to string and adds a newline. <code>p</code> shows the "inspect" representation (with type info) — useful for debugging. For arrays, <code>p [1,2,3]</code> shows <code>[1, 2, 3]</code>; <code>puts [1,2,3]</code> prints each element on a separate line.']
      ])
  },

  {
    file: 'blog-ruby-variables.html', langHomeUrl: '/blog-ruby.html', langName: 'Ruby', lesson: 'Lesson 2',
    title: 'Ruby — Variables and Data Types',
    prev: 'Syntax &amp; Basic Structure', prevUrl: '/blog-ruby-syntax.html',
    next: 'Conditionals in Ruby', nextUrl: '/blog-ruby-conditionals.html',
    sections: makeSections('Ruby', '/?lang=ruby',
      'Ruby\'s variables are dynamically typed — no type declarations needed. Ruby has four kinds of variables distinguished by naming convention: local, instance, class, and global. Understanding these conventions is essential for reading and writing idiomatic Ruby code.',
      `<span class="cm"># Local variable: lowercase/underscore</span>
name = <span class="st">"Alice"</span>
user_age = <span class="nu">30</span>
is_active = <span class="kw">true</span>

<span class="cm"># Constants: UPPERCASE (warning if reassigned)</span>
MAX_SIZE = <span class="nu">100</span>
APP_NAME = <span class="st">"Our Compiler"</span>

puts <span class="st">"#{APP_NAME} — Max: #{MAX_SIZE}"</span>
puts name.class   <span class="cm"># String</span>
puts user_age.class  <span class="cm"># Integer</span>`,
      'Variables',
      `<span class="cm"># Numeric types</span>
integer = <span class="nu">42</span>
float_num = <span class="nu">3.14</span>
big_int = <span class="nu">1_000_000</span>  <span class="cm"># underscores for readability</span>

<span class="cm"># Type conversion</span>
puts <span class="st">"42"</span>.to_i + <span class="nu">8</span>   <span class="cm"># 50 (string to int)</span>
puts <span class="nu">3</span>.to_f          <span class="cm"># 3.0 (int to float)</span>
puts <span class="nu">42</span>.to_s         <span class="cm"># "42" (int to string)</span>
puts <span class="nu">1.5</span>.to_i        <span class="cm"># 1 (truncates)</span>`,
      'Numeric Types &amp; Conversion',
      `<table class="tbl">
  <tr><th>Variable Type</th><th>Naming</th><th>Example</th></tr>
  <tr><td>Local</td><td>lowercase/snake_case</td><td><code>user_name</code></td></tr>
  <tr><td>Instance</td><td>@prefix</td><td><code>@name</code></td></tr>
  <tr><td>Class</td><td>@@prefix</td><td><code>@@count</code></td></tr>
  <tr><td>Global</td><td>$prefix</td><td><code>$app_name</code></td></tr>
  <tr><td>Constant</td><td>UPPERCASE</td><td><code>MAX_SIZE</code></td></tr>
</table>`,
      `<span class="cm"># Symbols — lightweight, immutable strings</span>
status = <span class="st">:active</span>   <span class="cm"># same object every time</span>
role = <span class="st">:admin</span>

puts status == <span class="st">:active</span>  <span class="cm"># true</span>
puts status.to_s         <span class="cm"># "active"</span>

<span class="cm"># nil — Ruby's null</span>
x = <span class="kw">nil</span>
puts x.nil?     <span class="cm"># true</span>
puts x.is_a?(NilClass)  <span class="cm"># true</span>`,
      'Symbols &amp; nil',
      [
        ['What is a Symbol in Ruby?', 'A Symbol (<code>:name</code>) is an immutable, unique name. Unlike strings, the same symbol always refers to the same object in memory — making them efficient for hash keys, method names, and status values.'],
        ['What is nil in Ruby?', '<code>nil</code> represents the absence of a value. It\'s an object (of class <code>NilClass</code>). In conditionals, <code>nil</code> is falsy (along with <code>false</code>). Everything else — 0, empty string, empty array — is truthy in Ruby.'],
        ['When should I use a Symbol vs a String as a hash key?', 'Use symbols (<code>:key</code>) for hash keys when keys are fixed identifiers. They\'re faster (single object) and more memory-efficient. Use strings for dynamic or user-provided keys.']
      ])
  },

  {
    file: 'blog-ruby-conditionals.html', langHomeUrl: '/blog-ruby.html', langName: 'Ruby', lesson: 'Lesson 3',
    title: 'Ruby — Conditionals and Control Flow',
    prev: 'Variables and Data Types', prevUrl: '/blog-ruby-variables.html',
    next: 'Loops and Iteration', nextUrl: '/blog-ruby-loops.html',
    sections: makeSections('Ruby', '/?lang=ruby',
      'Ruby\'s conditionals are expressive and flexible. Uniquely, only <code>false</code> and <code>nil</code> are falsy — everything else (including <code>0</code> and <code>""</code>) is truthy. Ruby also supports postfix conditionals and the <code>unless</code> keyword for more readable negation.',
      `score = <span class="nu">78</span>

<span class="kw">if</span> score >= <span class="nu">90</span>
  puts <span class="st">"Grade: A"</span>
<span class="kw">elsif</span> score >= <span class="nu">80</span>
  puts <span class="st">"Grade: B"</span>
<span class="kw">elsif</span> score >= <span class="nu">70</span>
  puts <span class="st">"Grade: C"</span>
<span class="kw">else</span>
  puts <span class="st">"Grade: F"</span>
<span class="kw">end</span>

<span class="cm"># Postfix if (reads like English)</span>
puts <span class="st">"Passing!"</span> <span class="kw">if</span> score >= <span class="nu">60</span>`,
      'if / elsif / else',
      `<span class="cm"># case/when — Ruby's switch</span>
grade = <span class="st">"B"</span>
<span class="kw">case</span> grade
<span class="kw">when</span> <span class="st">"A"</span>
  puts <span class="st">"Excellent!"</span>
<span class="kw">when</span> <span class="st">"B"</span>, <span class="st">"C"</span>
  puts <span class="st">"Good"</span>
<span class="kw">when</span> <span class="st">"D"</span>
  puts <span class="st">"Passing"</span>
<span class="kw">else</span>
  puts <span class="st">"Failing"</span>
<span class="kw">end</span>`,
      'case / when',
      `<table class="tbl">
  <tr><th>Feature</th><th>Ruby Syntax</th></tr>
  <tr><td>if / elsif / else</td><td>No parens needed; ends with <code>end</code></td></tr>
  <tr><td>unless</td><td><code>unless condition</code> = <code>if !condition</code></td></tr>
  <tr><td>Postfix if</td><td><code>puts "ok" if x &gt; 0</code></td></tr>
  <tr><td>Ternary</td><td><code>result = x &gt; 0 ? "pos" : "neg"</code></td></tr>
  <tr><td>Truthiness</td><td>Only false and nil are falsy</td></tr>
  <tr><td>case/when</td><td>Uses === for matching (can match ranges, regex)</td></tr>
</table>`,
      `<span class="cm"># unless — reads better than "if not"</span>
logged_in = <span class="kw">false</span>
<span class="kw">unless</span> logged_in
  puts <span class="st">"Please log in"</span>
<span class="kw">end</span>

<span class="cm"># case with ranges</span>
age = <span class="nu">25</span>
<span class="kw">case</span> age
<span class="kw">when</span> <span class="nu">0</span>..<span class="nu">12</span> then puts <span class="st">"Child"</span>
<span class="kw">when</span> <span class="nu">13</span>..<span class="nu">17</span> then puts <span class="st">"Teenager"</span>
<span class="kw">when</span> <span class="nu">18</span>..<span class="nu">64</span> then puts <span class="st">"Adult"</span>
<span class="kw">else</span> puts <span class="st">"Senior"</span>
<span class="kw">end</span>`,
      'unless &amp; Range Matching',
      [
        ['What does unless do in Ruby?', '<code>unless condition</code> is equivalent to <code>if !condition</code>. It reads more naturally: <code>unless logged_in</code> is clearer than <code>if !logged_in</code>. Use it when the negative condition is the primary concern.'],
        ['Is 0 truthy in Ruby?', 'Yes — in Ruby, only <code>false</code> and <code>nil</code> are falsy. Zero, empty string, and empty array are all truthy. This differs from JavaScript, Python, and C where zero and empty are falsy.'],
        ['How does case work with ranges?', 'Ruby\'s <code>case/when</code> uses the <code>===</code> operator for matching. For ranges, <code>18..64 === 25</code> is true (includes-check). This makes case very powerful for matching patterns, ranges, types, and regex.']
      ])
  },

  {
    file: 'blog-ruby-loops.html', langHomeUrl: '/blog-ruby.html', langName: 'Ruby', lesson: 'Lesson 4',
    title: 'Ruby — Loops and Iteration',
    prev: 'Conditionals in Ruby', prevUrl: '/blog-ruby-conditionals.html',
    next: 'Methods and Blocks', nextUrl: '/blog-ruby-functions.html',
    sections: makeSections('Ruby', '/?lang=ruby',
      'Ruby has rich iteration tools. Traditional loops exist, but idiomatic Ruby uses blocks and enumerator methods like <code>each</code>, <code>map</code>, <code>select</code>, and <code>reduce</code>. This functional style leads to expressive, readable code that clearly shows intent.',
      `<span class="cm"># times — run N times</span>
<span class="nu">5</span>.times { |i| puts <span class="st">"#{i}: Hello!"</span> }

<span class="cm"># upto / downto</span>
<span class="nu">1</span>.upto(<span class="nu">5</span>) { |i| print <span class="st">"#{i} "</span> }
<span class="nu">5</span>.downto(<span class="nu">1</span>) { |i| print <span class="st">"#{i} "</span> }

<span class="cm"># Range iteration</span>
(<span class="nu">1</span>..<span class="nu">10</span>).step(<span class="nu">2</span>) { |i| print <span class="st">"#{i} "</span> }  <span class="cm"># 1 3 5 7 9</span>`,
      'Integer Methods &amp; Ranges',
      `<span class="cm"># each — iterate array</span>
languages = [<span class="st">"Ruby"</span>, <span class="st">"Python"</span>, <span class="st">"Rust"</span>]
languages.each <span class="kw">do</span> |lang|
  puts <span class="st">"Language: #{lang}"</span>
<span class="kw">end</span>

<span class="cm"># each_with_index</span>
languages.each_with_index <span class="kw">do</span> |lang, i|
  puts <span class="st">"#{i + 1}. #{lang}"</span>
<span class="kw">end</span>`,
      'each &amp; Blocks',
      `<table class="tbl">
  <tr><th>Method</th><th>Returns</th><th>Use For</th></tr>
  <tr><td><code>each</code></td><td>Original array</td><td>Side effects (printing)</td></tr>
  <tr><td><code>map</code>/<code>collect</code></td><td>New transformed array</td><td>Transform each element</td></tr>
  <tr><td><code>select</code>/<code>filter</code></td><td>New filtered array</td><td>Keep matching elements</td></tr>
  <tr><td><code>reject</code></td><td>New filtered array</td><td>Remove matching elements</td></tr>
  <tr><td><code>reduce</code>/<code>inject</code></td><td>Single value</td><td>Aggregate (sum, product)</td></tr>
  <tr><td><code>any?</code>/<code>all?</code></td><td>Boolean</td><td>Check collection</td></tr>
</table>`,
      `<span class="cm"># map — transform</span>
nums = [<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>]
squares = nums.map { |n| n ** <span class="nu">2</span> }
puts squares.inspect  <span class="cm"># [1, 4, 9, 16, 25]</span>

<span class="cm"># select + reduce chaining</span>
total = nums.select { |n| n.even? }
            .reduce(<span class="nu">0</span>) { |sum, n| sum + n }
puts total  <span class="cm"># 6 (2 + 4)</span>`,
      'map, select, reduce Chaining',
      [
        ['What is a block in Ruby?', 'A block is an anonymous chunk of code passed to a method: <code>{ |x| x * 2 }</code> or <code>do |x| ... end</code>. Methods like <code>each</code> and <code>map</code> yield control to the block for each element. Blocks are the foundation of Ruby\'s expressive iteration.'],
        ['When should I use map vs each?', 'Use <code>map</code> when you want a new array with transformed values. Use <code>each</code> when you\'re doing side effects (printing, saving) and don\'t need a return value. <code>map</code> is pure; <code>each</code> is imperative.'],
        ['What is the difference between select and reject?', '<code>select</code> (alias: <code>filter</code>) keeps elements where the block returns true. <code>reject</code> is the opposite — it keeps elements where the block returns false. They\'re complementary.']
      ])
  },

  {
    file: 'blog-ruby-functions.html', langHomeUrl: '/blog-ruby.html', langName: 'Ruby', lesson: 'Lesson 5',
    title: 'Ruby — Methods and Blocks',
    prev: 'Loops and Iteration', prevUrl: '/blog-ruby-loops.html',
    next: 'Arrays and Hashes', nextUrl: '/blog-ruby-collections.html',
    sections: makeSections('Ruby', '/?lang=ruby',
      'Methods in Ruby are highly expressive. The last evaluated expression is implicitly returned — no need for explicit <code>return</code>. Methods ending with <code>?</code> conventionally return booleans. Methods ending with <code>!</code> modify in place or raise on failure. Blocks, procs, and lambdas give Ruby powerful functional capabilities.',
      `<span class="cm"># Method definition</span>
<span class="kw">def</span> <span class="fn">greet</span>(name, greeting: <span class="st">"Hello"</span>)
  <span class="st">"#{greeting}, #{name}!"</span>  <span class="cm"># implicit return</span>
<span class="kw">end</span>

puts greet(<span class="st">"Alice"</span>)
puts greet(<span class="st">"Bob"</span>, greeting: <span class="st">"Hi"</span>)

<span class="cm"># Predicate method (?)</span>
<span class="kw">def</span> <span class="fn">adult?</span>(age)
  age >= <span class="nu">18</span>
<span class="kw">end</span>

puts adult?(<span class="nu">20</span>)  <span class="cm"># true</span>`,
      'Method Definition',
      `<span class="cm"># Yield to a block</span>
<span class="kw">def</span> <span class="fn">repeat</span>(n)
  n.times { yield }
<span class="kw">end</span>

repeat(<span class="nu">3</span>) { puts <span class="st">"Hello!"</span> }

<span class="cm"># Lambda</span>
square = lambda { |x| x ** <span class="nu">2</span> }
double = ->(x) { x * <span class="nu">2</span> }  <span class="cm"># stabby lambda</span>
puts square.call(<span class="nu">5</span>)  <span class="cm"># 25</span>
puts double.call(<span class="nu">7</span>)  <span class="cm"># 14</span>`,
      'Yield &amp; Lambdas',
      `<table class="tbl">
  <tr><th>Convention</th><th>Meaning</th><th>Example</th></tr>
  <tr><td>Ends with <code>?</code></td><td>Returns boolean</td><td><code>empty?</code>, <code>nil?</code></td></tr>
  <tr><td>Ends with <code>!</code></td><td>Mutates in place or raises</td><td><code>sort!</code>, <code>save!</code></td></tr>
  <tr><td>snake_case</td><td>Method and variable names</td><td><code>user_name</code></td></tr>
  <tr><td>Keyword args</td><td>Named parameters</td><td><code>def f(x:, y:)</code></td></tr>
  <tr><td>Splat (*)</td><td>Variadic args</td><td><code>def f(*args)</code></td></tr>
  <tr><td>Double splat (**)</td><td>Keyword variadic</td><td><code>def f(**opts)</code></td></tr>
</table>`,
      `<span class="cm"># Default and keyword arguments</span>
<span class="kw">def</span> <span class="fn">create_user</span>(name, age: <span class="nu">18</span>, role: <span class="st">:user</span>)
  <span class="st">"#{name} (#{age}) [#{role}]"</span>
<span class="kw">end</span>

puts create_user(<span class="st">"Alice"</span>)
puts create_user(<span class="st">"Bob"</span>, age: <span class="nu">30</span>, role: <span class="st">:admin</span>)

<span class="cm"># Splat operator</span>
<span class="kw">def</span> <span class="fn">sum</span>(*nums)
  nums.reduce(<span class="nu">0</span>, :+)
<span class="kw">end</span>
puts sum(<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>)  <span class="cm"># 15</span>`,
      'Keyword Args &amp; Splat',
      [
        ['What is the difference between a Proc and a Lambda?', 'Both are callable objects. Lambdas check argument count (raises if wrong) and return normally. Procs don\'t check argument count and <code>return</code> exits the enclosing method. Use lambdas for callback-style code.'],
        ['What does yield do?', '<code>yield</code> inside a method calls the block that was passed to the method. It\'s how Ruby methods like <code>each</code>, <code>map</code>, and <code>times</code> hand control to the user\'s block.'],
        ['Why use keyword arguments?', 'Keyword arguments make method calls self-documenting: <code>create_user("Alice", role: :admin)</code> clearly shows what each argument means. They also allow you to provide arguments in any order.']
      ])
  },

  {
    file: 'blog-ruby-collections.html', langHomeUrl: '/blog-ruby.html', langName: 'Ruby', lesson: 'Lesson 6',
    title: 'Ruby — Arrays and Hashes',
    prev: 'Methods and Blocks', prevUrl: '/blog-ruby-functions.html',
    next: null, nextUrl: null,
    sections: makeSections('Ruby', '/?lang=ruby',
      'Ruby\'s Array and Hash classes are incredibly feature-rich. Arrays support dozens of built-in methods. Hashes accept any object as keys. Combined with Ruby\'s block syntax and Enumerable module, collections in Ruby are one of the most enjoyable to work with in any language.',
      `<span class="cm"># Array creation and manipulation</span>
fruits = [<span class="st">"apple"</span>, <span class="st">"banana"</span>, <span class="st">"cherry"</span>]
fruits.push(<span class="st">"date"</span>)       <span class="cm"># add to end</span>
fruits.unshift(<span class="st">"avocado"</span>) <span class="cm"># add to front</span>
removed = fruits.pop       <span class="cm"># remove from end</span>

puts fruits.length          <span class="cm"># 4</span>
puts fruits.include?(<span class="st">"banana"</span>)  <span class="cm"># true</span>
puts fruits.sort.inspect
puts fruits.reverse.inspect`,
      'Arrays',
      `<span class="cm"># Hash creation</span>
person = {
  name: <span class="st">"Alice"</span>,
  age: <span class="nu">25</span>,
  active: <span class="kw">true</span>
}

puts person[:name]         <span class="cm"># Alice</span>
person[:email] = <span class="st">"a@b.com"</span>  <span class="cm"># add key</span>
person.delete(:active)     <span class="cm"># remove key</span>

person.each <span class="kw">do</span> |key, value|
  puts <span class="st">"#{key}: #{value}"</span>
<span class="kw">end</span>`,
      'Hashes',
      `<table class="tbl">
  <tr><th>Method</th><th>What it does</th></tr>
  <tr><td><code>push</code>/<code>&lt;&lt;</code></td><td>Add to end of array</td></tr>
  <tr><td><code>pop</code>/<code>shift</code></td><td>Remove from end/front</td></tr>
  <tr><td><code>flatten</code></td><td>Flatten nested arrays</td></tr>
  <tr><td><code>compact</code></td><td>Remove nil values</td></tr>
  <tr><td><code>uniq</code></td><td>Remove duplicates</td></tr>
  <tr><td><code>zip</code></td><td>Combine two arrays element-wise</td></tr>
  <tr><td><code>hash.merge</code></td><td>Combine two hashes</td></tr>
  <tr><td><code>hash.keys</code>/<code>.values</code></td><td>Get all keys or values</td></tr>
</table>`,
      `<span class="cm"># Destructuring</span>
first, *rest = [<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>]
puts first    <span class="cm"># 1</span>
puts rest.inspect  <span class="cm"># [2, 3, 4, 5]</span>

<span class="cm"># Array set operations</span>
a = [<span class="nu">1</span>, <span class="nu">2</span>, <span class="nu">3</span>, <span class="nu">4</span>]
b = [<span class="nu">3</span>, <span class="nu">4</span>, <span class="nu">5</span>, <span class="nu">6</span>]
puts (a & b).inspect    <span class="cm"># intersection: [3, 4]</span>
puts (a | b).inspect    <span class="cm"># union: [1, 2, 3, 4, 5, 6]</span>
puts (a - b).inspect    <span class="cm"># difference: [1, 2]</span>`,
      'Destructuring &amp; Set Operations',
      [
        ['What is the Enumerable module?', 'Enumerable is a Ruby module included in Array, Hash, and other collection classes. It provides <code>map</code>, <code>select</code>, <code>reduce</code>, <code>sort_by</code>, <code>group_by</code>, and 40+ more methods. Any class that implements <code>each</code> gets all of Enumerable\'s power.'],
        ['What is the difference between hash[:key] and hash.fetch(:key)?', '<code>hash[:key]</code> returns nil for missing keys (no error). <code>hash.fetch(:key)</code> raises a KeyError if the key is missing — use it when a missing key is a programming error that should be caught immediately.'],
        ['How do I sort a hash by value?', '<code>hash.sort_by { |_, v| v }.to_h</code> sorts the hash entries by value and converts back to a hash. Ruby hashes maintain insertion order since Ruby 1.9.']
      ])
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROCESSOR
// ─────────────────────────────────────────────────────────────────────────────

function buildMain(article) {
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
for (const art of articles) {
  const fp = path.join(publicDir, art.file);
  if (!fs.existsSync(fp)) { console.warn(`⚠️  Not found: ${art.file}`); skipped++; continue; }
  let html = fs.readFileSync(fp, 'utf8');
  const re = /<main\s+class="content">[\s\S]*?<\/main>/;
  if (!re.test(html)) { console.warn(`⚠️  No <main> in: ${art.file}`); skipped++; continue; }
  html = html.replace(re, buildMain(art).trimEnd());
  fs.writeFileSync(fp, html, 'utf8');
  console.log(`✅  ${art.file}`);
  processed++;
}

console.log(`\n🎉 Done! Expanded: ${processed}, Skipped: ${skipped}`);
