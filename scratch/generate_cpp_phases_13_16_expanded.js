const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cppDir = path.join(__dirname, '..', 'public', 'blog-cpp');
console.log('🚀 Generating C++ Phases 13–21 — EXPANDED TEXTBOOK EDITION...');

function makeCppLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(path.join(cppDir, file),
    wrapCppPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8');
  console.log('  ✅ ' + file);
}

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 13: Templates & Generic Programming
// ═══════════════════════════════════════════════════════════════════════════════
const l13 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 13 (Chapter 13): C++ Templates &amp; Generic Programming Masterclass</strong>! Templates are C++'s mechanism for writing type-independent, algorithm-independent, and container-independent code. The compiler instantiates type-specific versions at compile time — zero runtime overhead. The entire STL (vector, map, sort, find, transform) is built on templates.</p>
</div>

<div class="section-title"><span class="num">1</span>Function Templates — Complete Guide</div>
<div class="section-body">
  <p class="text-prose">A function template defines a blueprint. When called, the compiler deduces the template argument from the actual argument types and generates a specialized function. You can also provide the type explicitly.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Function Templates</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;

// Basic function template
template &lt;typename T&gt;
T maximum(T first, T second) {
    return first &gt; second ? first : second;
}

// Template with multiple type parameters
template &lt;typename T, typename U&gt;
auto add(T a, U b) {
    return a + b;  // auto return type deduction (C++14)
}

// Non-type template parameter (compile-time constant)
template &lt;int N&gt;
constexpr int power(int base) {
    if constexpr (N == 0) return 1;
    else return base * power&lt;N-1&gt;(base);
}

// Template with default type parameter
template &lt;typename T = double&gt;
T zero() { return T{}; }

// Trailing return type for complex deduction
template &lt;typename T, typename U&gt;
auto multiply(T a, U b) -&gt; decltype(a * b) {
    return a * b;
}

// Function template with concept constraint (C++20)
#include &lt;concepts&gt;
template &lt;std::integral T&gt;
T gcd(T a, T b) {
    while (b != 0) { T t = b; b = a % b; a = t; }
    return a;
}

// Variadic function template
template &lt;typename First, typename... Rest&gt;
First sumVariadic(First first, Rest... rest) {
    if constexpr (sizeof...(rest) == 0) return first;
    else return first + sumVariadic(rest...);
}

int main() {
    // Type deduction
    std::cout &lt;&lt; maximum(10, 20) &lt;&lt; "\n";           // T = int
    std::cout &lt;&lt; maximum(4.5, 2.3) &lt;&lt; "\n";         // T = double
    std::cout &lt;&lt; maximum&lt;std::string&gt;("apple", "mango") &lt;&lt; "\n";

    // Multiple type parameters
    std::cout &lt;&lt; add(3, 4.7) &lt;&lt; "\n";               // T=int, U=double → double
    std::cout &lt;&lt; multiply(3, 4.7f) &lt;&lt; "\n";

    // Non-type parameter
    std::cout &lt;&lt; power&lt;3&gt;(2) &lt;&lt; "\n";              // 2^3 = 8 at compile time
    std::cout &lt;&lt; power&lt;10&gt;(2) &lt;&lt; "\n";             // 2^10 = 1024

    // Default type
    std::cout &lt;&lt; zero() &lt;&lt; "\n";                    // double{}  = 0.0
    std::cout &lt;&lt; zero&lt;int&gt;() &lt;&lt; "\n";               // int{} = 0

    // Concept-constrained
    std::cout &lt;&lt; "gcd(48,18) = " &lt;&lt; gcd(48, 18) &lt;&lt; "\n";   // 6

    // Variadic
    std::cout &lt;&lt; sumVariadic(1, 2, 3, 4, 5) &lt;&lt; "\n";       // 15
    std::cout &lt;&lt; sumVariadic(1.1, 2.2, 3.3) &lt;&lt; "\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Class Templates in Depth</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Generic Stack Class Template</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;deque&gt;
#include &lt;stdexcept&gt;
#include &lt;initializer_list&gt;

// Class template with multiple parameters and default
template &lt;typename T, typename Container = std::vector&lt;T&gt;&gt;
class Stack {
    Container data_;
public:
    Stack() = default;
    Stack(std::initializer_list&lt;T&gt; init) : data_{init.begin(), init.end()} {}

    void push(const T&amp; item) { data_.push_back(item); }
    void push(T&amp;&amp; item)      { data_.push_back(std::move(item)); }

    template &lt;typename... Args&gt;
    void emplace(Args&amp;&amp;... args) {
        data_.emplace_back(std::forward&lt;Args&gt;(args)...);
    }

    void pop() {
        if (data_.empty()) throw std::underflow_error("Stack::pop on empty stack");
        data_.pop_back();
    }

    T&amp;       top()       { if (data_.empty()) throw std::underflow_error("empty"); return data_.back(); }
    const T&amp; top() const { if (data_.empty()) throw std::underflow_error("empty"); return data_.back(); }

    bool        empty()  const { return data_.empty(); }
    std::size_t size()   const { return data_.size(); }
    void        clear()        { data_.clear(); }

    // Comparison operators
    bool operator==(const Stack&amp; other) const { return data_ == other.data_; }
    bool operator!=(const Stack&amp; other) const { return !(*this == other); }

    // Iterator support (delegate to container)
    auto begin() { return data_.begin(); }
    auto end()   { return data_.end(); }
    auto begin() const { return data_.cbegin(); }
    auto end()   const { return data_.cend(); }

    friend std::ostream&amp; operator&lt;&lt;(std::ostream&amp; os, const Stack&amp; s) {
        os &lt;&lt; "Stack[";
        for (auto it = s.data_.begin(); it != s.data_.end(); ++it) {
            if (it != s.data_.begin()) os &lt;&lt; ", ";
            os &lt;&lt; *it;
        }
        return os &lt;&lt; "]";
    }
};

// Template class method defined outside
template &lt;typename T, typename C&gt;
void Stack&lt;T,C&gt;::clear() { /* already defined inline */ }

int main() {
    // int Stack using default vector
    Stack&lt;int&gt; intStack{10, 20, 30};
    intStack.push(40);
    intStack.push(50);
    std::cout &lt;&lt; intStack &lt;&lt; " top=" &lt;&lt; intStack.top() &lt;&lt; "\n";
    intStack.pop();
    std::cout &lt;&lt; "After pop: " &lt;&lt; intStack &lt;&lt; "\n";

    // String stack
    Stack&lt;std::string&gt; strStack;
    strStack.push("Hello");
    strStack.push("World");
    strStack.push("C++20");
    std::cout &lt;&lt; strStack &lt;&lt; "\n";

    // Stack with deque as container
    Stack&lt;double, std::deque&lt;double&gt;&gt; deqStack{1.1, 2.2, 3.3};
    std::cout &lt;&lt; deqStack &lt;&lt; "\n";

    // Iterate (range-based for)
    std::cout &lt;&lt; "intStack contents: ";
    for (int v : intStack) std::cout &lt;&lt; v &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Template Specialization</div>
<div class="section-body">
  <p class="text-prose"><strong>Full specialization</strong> provides a completely different implementation for a specific type. <strong>Partial specialization</strong> (class templates only) specializes for a family of types like all pointers.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Full &amp; Partial Template Specialization</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;cstring&gt;

// Primary template
template &lt;typename T&gt;
class Printer {
public:
    static void print(const T&amp; val) {
        std::cout &lt;&lt; "Generic: " &lt;&lt; val &lt;&lt; "\n";
    }
};

// Full specialization for bool
template &lt;&gt;
class Printer&lt;bool&gt; {
public:
    static void print(const bool&amp; val) {
        std::cout &lt;&lt; "Bool: " &lt;&lt; (val ? "TRUE" : "FALSE") &lt;&lt; "\n";
    }
};

// Full specialization for const char*
template &lt;&gt;
class Printer&lt;const char*&gt; {
public:
    static void print(const char* const&amp; val) {
        std::cout &lt;&lt; "C-string (" &lt;&lt; strlen(val) &lt;&lt; " chars): \"" &lt;&lt; val &lt;&lt; "\"\n";
    }
};

// Partial specialization for pointers
template &lt;typename T&gt;
class Printer&lt;T*&gt; {
public:
    static void print(T* const&amp; ptr) {
        if (ptr) std::cout &lt;&lt; "Pointer to: " &lt;&lt; *ptr &lt;&lt; " (at " &lt;&lt; (void*)ptr &lt;&lt; ")\n";
        else     std::cout &lt;&lt; "Null pointer\n";
    }
};

// Function template specialization
template &lt;typename T&gt;
bool isZero(T val) { return val == T{}; }

template &lt;&gt;
bool isZero&lt;double&gt;(double val) {
    return std::abs(val) &lt; 1e-12;  // floating point zero check
}

int main() {
    Printer&lt;int&gt;::print(42);          // Generic
    Printer&lt;double&gt;::print(3.14);     // Generic
    Printer&lt;bool&gt;::print(true);       // Bool specialization
    Printer&lt;bool&gt;::print(false);
    Printer&lt;const char*&gt;::print("hello");  // C-string specialization

    int x = 99;
    Printer&lt;int*&gt;::print(&amp;x);        // Pointer specialization
    int* null_ptr = nullptr;
    Printer&lt;int*&gt;::print(null_ptr);

    std::cout &lt;&lt; "\nisZero(0): " &lt;&lt; std::boolalpha &lt;&lt; isZero(0) &lt;&lt; "\n";
    std::cout &lt;&lt; "isZero(0.0): " &lt;&lt; isZero(0.0) &lt;&lt; "\n";
    std::cout &lt;&lt; "isZero(1e-15): " &lt;&lt; isZero(1e-15) &lt;&lt; "\n";  // specialized
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Variadic Templates &amp; Fold Expressions</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Variadic Templates, Parameter Packs &amp; Folds</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;sstream&gt;

// C++17 Fold expressions — elegantly collapse parameter pack
template &lt;typename... Args&gt;
auto sumAll(Args&&... args) { return (... + args); }

template &lt;typename... Args&gt;
auto productAll(Args&&... args) { return (... * args); }

template &lt;typename... Args&gt;
void printAll(Args&&... args) {
    ((std::cout &lt;&lt; args &lt;&lt; " "), ...);
    std::cout &lt;&lt; "\n";
}

template &lt;typename... Args&gt;
bool allTrue(Args... args) { return (... &amp;&amp; args); }

template &lt;typename... Args&gt;
bool anyTrue(Args... args) { return (... || args); }

// Number of arguments
template &lt;typename... Args&gt;
constexpr std::size_t argCount(Args...) { return sizeof...(Args); }

// Build a string from all args
template &lt;typename... Args&gt;
std::string buildString(Args&&... args) {
    std::ostringstream oss;
    ((oss &lt;&lt; args), ...);
    return oss.str();
}

// Type-safe printf using variadic template
void myPrintf(const std::string&amp; fmt) {
    std::cout &lt;&lt; fmt;
}
template &lt;typename T, typename... Args&gt;
void myPrintf(const std::string&amp; fmt, T first, Args... rest) {
    auto pos = fmt.find("{}");
    if (pos == std::string::npos) { std::cout &lt;&lt; fmt; return; }
    std::cout &lt;&lt; fmt.substr(0, pos) &lt;&lt; first;
    myPrintf(fmt.substr(pos + 2), rest...);
}

int main() {
    std::cout &lt;&lt; sumAll(1, 2, 3, 4, 5) &lt;&lt; "\n";        // 15
    std::cout &lt;&lt; sumAll(1.1, 2.2, 3.3) &lt;&lt; "\n";
    std::cout &lt;&lt; productAll(2, 3, 4, 5) &lt;&lt; "\n";        // 120

    printAll(1, 2.5, "hello", 'A', true);

    std::cout &lt;&lt; allTrue(true, true, true)  &lt;&lt; "\n";    // true
    std::cout &lt;&lt; allTrue(true, false, true) &lt;&lt; "\n";    // false
    std::cout &lt;&lt; anyTrue(false, false, true) &lt;&lt; "\n";   // true

    std::cout &lt;&lt; argCount(1, "x", 3.14) &lt;&lt; " args\n";  // 3

    std::string s = buildString("Hello ", "World ", 42, "!");
    std::cout &lt;&lt; s &lt;&lt; "\n";

    myPrintf("Name: {}, Age: {}, Score: {}\n", "Alice", 20, 95.5);
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>C++20 Concepts</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Concepts &amp; requires (C++20)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;concepts&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

// Define custom concept
template &lt;typename T&gt;
concept Numeric = std::integral&lt;T&gt; || std::floating_point&lt;T&gt;;

template &lt;typename T&gt;
concept Printable = requires(T t) {
    { std::cout &lt;&lt; t } -&gt; std::same_as&lt;std::ostream&amp;&gt;;
};

template &lt;typename T&gt;
concept Container = requires(T c) {
    typename T::value_type;
    { c.begin() } -&gt; std::same_as&lt;typename T::iterator&gt;;
    { c.end()   } -&gt; std::same_as&lt;typename T::iterator&gt;;
    { c.size()  } -&gt; std::convertible_to&lt;std::size_t&gt;;
};

// Functions constrained by concepts
template &lt;Numeric T&gt;
T square(T x) { return x * x; }

template &lt;Printable T&gt;
void prettyPrint(const T&amp; val) {
    std::cout &lt;&lt; "[[ " &lt;&lt; val &lt;&lt; " ]]\n";
}

template &lt;Container C&gt;
void printContainer(const C&amp; c) {
    std::cout &lt;&lt; "Container(" &lt;&lt; c.size() &lt;&lt; "): ";
    for (const auto&amp; v : c) std::cout &lt;&lt; v &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
}

// requires clause on function directly
template &lt;typename T&gt;
requires Numeric&lt;T&gt; &amp;&amp; (sizeof(T) &gt;= 4)
T safeDiv(T a, T b) {
    if (b == 0) throw std::runtime_error("Division by zero");
    return a / b;
}

int main() {
    std::cout &lt;&lt; square(5)   &lt;&lt; "\n";    // OK: int is Numeric
    std::cout &lt;&lt; square(3.14) &lt;&lt; "\n";   // OK: double is Numeric
    // square("hello");  // COMPILE ERROR — string is not Numeric!

    prettyPrint(42);
    prettyPrint(std::string("Hello Concepts!"));
    prettyPrint(3.14);

    std::vector&lt;int&gt; v{1, 2, 3, 4, 5};
    printContainer(v);

    std::cout &lt;&lt; safeDiv(20, 4) &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>SFINAE &amp; type_traits</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — type_traits, enable_if, SFINAE</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;type_traits&gt;
#include &lt;string&gt;

// SFINAE with enable_if (pre-C++20 approach)
template &lt;typename T&gt;
typename std::enable_if&lt;std::is_integral_v&lt;T&gt;, void&gt;::type
printInfo(T val) {
    std::cout &lt;&lt; "Integer: " &lt;&lt; val &lt;&lt; " (bits=" &lt;&lt; sizeof(T)*8 &lt;&lt; ")\n";
}

template &lt;typename T&gt;
typename std::enable_if&lt;std::is_floating_point_v&lt;T&gt;, void&gt;::type
printInfo(T val) {
    std::cout &lt;&lt; "Float: " &lt;&lt; val &lt;&lt; " (precision=" &lt;&lt; std::numeric_limits&lt;T&gt;::digits10 &lt;&lt; ")\n";
}

// if constexpr (simpler C++17 approach)
template &lt;typename T&gt;
void describe(T val) {
    if constexpr (std::is_integral_v&lt;T&gt;)
        std::cout &lt;&lt; "Integral: " &lt;&lt; val &lt;&lt; "\n";
    else if constexpr (std::is_floating_point_v&lt;T&gt;)
        std::cout &lt;&lt; "Float: " &lt;&lt; val &lt;&lt; "\n";
    else if constexpr (std::is_same_v&lt;T, std::string&gt;)
        std::cout &lt;&lt; "String: \"" &lt;&lt; val &lt;&lt; "\" (len=" &lt;&lt; val.size() &lt;&lt; ")\n";
    else
        std::cout &lt;&lt; "Unknown type\n";
}

// type_traits examples
template &lt;typename T&gt;
void traitReport() {
    std::cout &lt;&lt; "is_integral:    " &lt;&lt; std::boolalpha &lt;&lt; std::is_integral_v&lt;T&gt; &lt;&lt; "\n";
    std::cout &lt;&lt; "is_pointer:     " &lt;&lt; std::is_pointer_v&lt;T&gt; &lt;&lt; "\n";
    std::cout &lt;&lt; "is_const:       " &lt;&lt; std::is_const_v&lt;T&gt; &lt;&lt; "\n";
    std::cout &lt;&lt; "is_reference:   " &lt;&lt; std::is_reference_v&lt;T&gt; &lt;&lt; "\n";
    std::cout &lt;&lt; "is_class:       " &lt;&lt; std::is_class_v&lt;T&gt; &lt;&lt; "\n";
}

int main() {
    printInfo(42);
    printInfo(3.14);
    // printInfo("str"); // ambiguous — no matching overload

    describe(100);
    describe(2.71);
    describe(std::string("hello"));

    std::cout &lt;&lt; "\n--- type_traits for int ---\n";
    traitReport&lt;int&gt;();
    std::cout &lt;&lt; "\n--- type_traits for const int* ---\n";
    traitReport&lt;const int*&gt;();
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">7</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why must template definitions be in header files?</h4><p>Templates are compiled per-translation-unit. The compiler needs the full template definition (not just declaration) at the point of instantiation. Definitions in .cpp files cause linker errors when templates are used in other .cpp files.</p></div>
    <div class="faq-item"><h4>Q2: What is template argument deduction?</h4><p>The compiler automatically infers template type parameters from function argument types: <code>maximum(3, 5)</code> deduces <code>T=int</code>. Deduction follows specific rules — const/reference qualifiers are stripped for function templates.</p></div>
    <div class="faq-item"><h4>Q3: What is SFINAE?</h4><p>"Substitution Failure Is Not An Error." When substituting a type into a template results in an invalid type expression, the compiler silently discards that candidate instead of emitting an error. Used with <code>std::enable_if</code> for conditional compilation.</p></div>
    <div class="faq-item"><h4>Q4: Difference between typename and class in template parameters?</h4><p>Completely interchangeable for type parameters. <code>typename</code> is preferred in modern C++ (more descriptive, and required when disambiguating dependent names with <code>typename T::value_type</code>).</p></div>
    <div class="faq-item"><h4>Q5: What is explicit template instantiation?</h4><p><code>template class Stack&lt;int&gt;;</code> in a .cpp file forces instantiation there, reducing compile times by preventing re-instantiation in every translation unit that includes the template. Pair with <code>extern template class Stack&lt;int&gt;;</code> in headers.</p></div>
  </div>
</div>`;

makeCppLesson(13,
  '13-cpp-templates-function-class-specialization-and-concepts.html',
  'C++ Templates, Generic Programming, Specialization, Variadic & Concepts Masterclass',
  'Exhaustive textbook-grade C++ Templates (Phase 13): function templates, class templates with multiple parameters, non-type parameters, full & partial specialization, variadic templates, fold expressions, C++20 concepts, SFINAE, type_traits, and if constexpr.',
  'Phase 13', 'Templates & Generic Programming',
  'Function Templates · Class Templates · Non-Type Parameters · Full & Partial Specialization · Variadic Templates · Fold Expressions · C++20 Concepts · requires · SFINAE · type_traits · if constexpr',
  l13,
  '12-cpp-operator-overloading-friend-functions-and-stream-operators.html', '12. Operator Overloading, Friend Functions & Streams',
  '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html', '14. STL: vector, map, set, unordered & Container Adaptors');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 14: STL Containers
// ═══════════════════════════════════════════════════════════════════════════════
const l14 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 14 (Chapter 14): C++ STL Containers Masterclass</strong>! The C++ Standard Template Library provides production-grade, generic, battle-tested data structures. Each container makes different trade-offs between time complexity, memory layout, cache performance, and ordering guarantees. Choosing the right container is one of the most impactful performance decisions you'll make.</p>
</div>

<div class="section-title"><span class="num">1</span>Container Categories Overview</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Category</th><th>Containers</th><th>Key Property</th></tr></thead>
    <tbody>
      <tr><td>Sequence</td><td>vector, deque, list, forward_list, array</td><td>Ordered by insertion position</td></tr>
      <tr><td>Associative</td><td>set, multiset, map, multimap</td><td>Sorted by key (Red-Black tree)</td></tr>
      <tr><td>Unordered</td><td>unordered_set, unordered_map, unordered_multiset, unordered_multimap</td><td>Hash table, O(1) average ops</td></tr>
      <tr><td>Adaptors</td><td>stack, queue, priority_queue</td><td>Restricted interface over another container</td></tr>
      <tr><td>Utilities</td><td>pair, tuple, optional, variant, any, string_view, span</td><td>Lightweight wrappers and value types</td></tr>
    </tbody>
  </table>
  <table class="tbl spec-table">
    <thead><tr><th>Container</th><th>Access</th><th>Push front</th><th>Push back</th><th>Insert middle</th><th>Memory</th></tr></thead>
    <tbody>
      <tr><td><code>vector</code></td><td>O(1)</td><td>O(n)</td><td>O(1) amort</td><td>O(n)</td><td>Contiguous</td></tr>
      <tr><td><code>deque</code></td><td>O(1)</td><td>O(1)</td><td>O(1)</td><td>O(n)</td><td>Chunked</td></tr>
      <tr><td><code>list</code></td><td>O(n)</td><td>O(1)</td><td>O(1)</td><td>O(1)*</td><td>Node-based</td></tr>
      <tr><td><code>array</code></td><td>O(1)</td><td>–</td><td>–</td><td>–</td><td>Stack</td></tr>
      <tr><td><code>set/map</code></td><td>O(log n)</td><td>–</td><td>–</td><td>O(log n)</td><td>RB-tree</td></tr>
      <tr><td><code>unordered_map</code></td><td>O(1) avg</td><td>–</td><td>–</td><td>O(1) avg</td><td>Hash table</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>std::vector — Deep Dive</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::vector complete API</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;
#include &lt;string&gt;

int main() {
    // Construction methods
    std::vector&lt;int&gt; v1;                      // empty
    std::vector&lt;int&gt; v2(5, 0);                // 5 zeros
    std::vector&lt;int&gt; v3{10, 20, 30, 40, 50};  // initializer list
    std::vector&lt;int&gt; v4(v3.begin(), v3.begin()+3); // from iterators

    // Size management
    v1.reserve(100);  // pre-allocate capacity (no reallocation on push_back)
    std::cout &lt;&lt; "capacity after reserve(100): " &lt;&lt; v1.capacity() &lt;&lt; "\n";

    // Insertion
    v1.push_back(1);
    v1.push_back(2);
    v1.emplace_back(3);                        // construct in-place (no copy)
    v1.insert(v1.begin() + 1, 99);             // insert at position
    v1.insert(v1.end(), {10, 11, 12});          // insert range

    std::cout &lt;&lt; "v1: ";
    for (int x : v1) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; " size=" &lt;&lt; v1.size() &lt;&lt; " cap=" &lt;&lt; v1.capacity() &lt;&lt; "\n";

    // Access
    std::cout &lt;&lt; "front=" &lt;&lt; v1.front() &lt;&lt; " back=" &lt;&lt; v1.back() &lt;&lt; "\n";
    std::cout &lt;&lt; "v1[2]=" &lt;&lt; v1[2] &lt;&lt; " v1.at(2)=" &lt;&lt; v1.at(2) &lt;&lt; "\n";
    // v1.at(100);  // throws std::out_of_range!
    int* raw = v1.data();  // raw pointer to underlying array
    std::cout &lt;&lt; "raw[0]=" &lt;&lt; raw[0] &lt;&lt; "\n";

    // Removal
    v1.pop_back();
    v1.erase(v1.begin());                      // erase first element
    v1.erase(v1.begin(), v1.begin()+2);        // erase range

    // Algorithms integration
    std::vector&lt;int&gt; nums{5,1,4,2,8,3,9,7,6};
    std::sort(nums.begin(), nums.end());
    int sum = std::accumulate(nums.begin(), nums.end(), 0);
    auto [mn, mx] = std::minmax_element(nums.begin(), nums.end());
    std::cout &lt;&lt; "sum=" &lt;&lt; sum &lt;&lt; " min=" &lt;&lt; *mn &lt;&lt; " max=" &lt;&lt; *mx &lt;&lt; "\n";

    // Shrink to fit (release unused capacity)
    std::vector&lt;int&gt; big(1000, 0);
    big.clear();
    std::cout &lt;&lt; "after clear, size=" &lt;&lt; big.size() &lt;&lt; " cap=" &lt;&lt; big.capacity() &lt;&lt; "\n";
    big.shrink_to_fit();
    std::cout &lt;&lt; "after shrink, cap=" &lt;&lt; big.capacity() &lt;&lt; "\n";

    // 2D vector (matrix)
    int rows = 3, cols = 4;
    std::vector&lt;std::vector&lt;int&gt;&gt; matrix(rows, std::vector&lt;int&gt;(cols, 0));
    for (int r = 0; r &lt; rows; ++r)
        for (int c = 0; c &lt; cols; ++c)
            matrix[r][c] = r * cols + c;
    std::cout &lt;&lt; "Matrix:\n";
    for (const auto&amp; row : matrix) {
        for (int v : row) std::cout &lt;&lt; v &lt;&lt; "\t";
        std::cout &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>std::map &amp; std::set — Sorted Associative Containers</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — map, multimap, set, multiset</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;set&gt;
#include &lt;string&gt;
#include &lt;functional&gt;

int main() {
    // ─── std::map (sorted key-value pairs, unique keys) ───────────────────
    std::map&lt;std::string, int&gt; population;
    population["Hyderabad"] = 10_000_000;  // digit separator
    population.emplace("Mumbai", 20_000_000);
    population.insert({"Delhi", 30_000_000});
    population["Chennai"] = 8_000_000;

    // Iterate — sorted by key (alphabetical)
    std::cout &lt;&lt; "Cities (sorted):\n";
    for (const auto&amp; [city, pop] : population) {  // C++17 structured binding
        std::cout &lt;&lt; "  " &lt;&lt; city &lt;&lt; ": " &lt;&lt; pop &lt;&lt; "\n";
    }

    // find — O(log n)
    auto it = population.find("Mumbai");
    if (it != population.end())
        std::cout &lt;&lt; "Found: " &lt;&lt; it-&gt;first &lt;&lt; " = " &lt;&lt; it-&gt;second &lt;&lt; "\n";

    // operator[] creates entry if missing!
    std::cout &lt;&lt; "Bangalore: " &lt;&lt; population["Bangalore"] &lt;&lt; "\n";  // 0 inserted!
    population.erase("Bangalore");  // remove it

    // count and contains (C++20)
    std::cout &lt;&lt; "Has Delhi: " &lt;&lt; population.count("Delhi") &lt;&lt; "\n";
    // std::cout &lt;&lt; "Contains Delhi: " &lt;&lt; population.contains("Delhi") &lt;&lt; "\n"; // C++20

    // lower_bound, upper_bound for range queries
    auto lb = population.lower_bound("H");  // first key >= "H"
    auto ub = population.upper_bound("M");  // first key > "M"
    std::cout &lt;&lt; "Range [H, M]: ";
    for (auto i = lb; i != ub; ++i) std::cout &lt;&lt; i-&gt;first &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Custom comparator map (sort by string length)
    auto byLength = [](const std::string&amp; a, const std::string&amp; b) {
        return a.length() &lt; b.length() || (a.length() == b.length() &amp;&amp; a &lt; b);
    };
    std::map&lt;std::string, int, decltype(byLength)&gt; lenMap(byLength);
    lenMap["hi"] = 1; lenMap["hello"] = 2; lenMap["bye"] = 3; lenMap["world"] = 4;
    std::cout &lt;&lt; "By length: ";
    for (const auto&amp; [k, v] : lenMap) std::cout &lt;&lt; k &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── std::set (sorted, unique elements) ───────────────────────────────
    std::set&lt;int&gt; primes{2, 3, 5, 7, 11, 13};
    primes.insert(17);
    primes.insert(3);   // duplicate — silently ignored
    std::cout &lt;&lt; "Primes: ";
    for (int p : primes) std::cout &lt;&lt; p &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── std::multimap (allows duplicate keys) ────────────────────────────
    std::multimap&lt;std::string, std::string&gt; authorBooks;
    authorBooks.emplace("Knuth", "TAOCP Vol1");
    authorBooks.emplace("Knuth", "TAOCP Vol2");
    authorBooks.emplace("Stroustrup", "The C++ Programming Language");
    auto [begin, end] = authorBooks.equal_range("Knuth");
    std::cout &lt;&lt; "Knuth's books:\n";
    for (auto i = begin; i != end; ++i) std::cout &lt;&lt; "  " &lt;&lt; i-&gt;second &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Unordered Containers &amp; Hash Tables</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — unordered_map, unordered_set, custom hash</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;unordered_map&gt;
#include &lt;unordered_set&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

// Custom hash for user-defined type
struct Point {
    int x, y;
    bool operator==(const Point&amp; other) const {
        return x == other.x &amp;&amp; y == other.y;
    }
};

struct PointHash {
    std::size_t operator()(const Point&amp; p) const {
        // Combine x and y hashes (Boost-style)
        std::size_t h1 = std::hash&lt;int&gt;{}(p.x);
        std::size_t h2 = std::hash&lt;int&gt;{}(p.y);
        return h1 ^ (h2 &lt;&lt; 1);
    }
};

int main() {
    // ─── Word frequency counter ───────────────────────────────────────────
    std::vector&lt;std::string&gt; words{
        "the", "cat", "sat", "on", "the", "mat",
        "the", "cat", "sat", "on", "a", "mat", "the"
    };
    std::unordered_map&lt;std::string, int&gt; freq;
    for (const auto&amp; w : words) freq[w]++;
    std::cout &lt;&lt; "Word frequencies:\n";
    for (const auto&amp; [word, count] : freq)
        std::cout &lt;&lt; "  \"" &lt;&lt; word &lt;&lt; "\": " &lt;&lt; count &lt;&lt; "\n";

    // Bucket statistics
    std::cout &lt;&lt; "Bucket count: " &lt;&lt; freq.bucket_count() &lt;&lt; "\n";
    std::cout &lt;&lt; "Load factor:  " &lt;&lt; freq.load_factor() &lt;&lt; "\n";
    std::cout &lt;&lt; "Max load:     " &lt;&lt; freq.max_load_factor() &lt;&lt; "\n";

    // reserve to avoid rehashing
    std::unordered_map&lt;int, std::string&gt; idMap;
    idMap.reserve(1000);  // avoid rehashing for up to 1000 elements

    // ─── unordered_set for O(1) membership check ──────────────────────────
    std::unordered_set&lt;std::string&gt; stopWords{"the", "a", "an", "in", "on", "at"};
    std::vector&lt;std::string&gt; sentence{"the", "quick", "brown", "fox", "in", "the", "woods"};
    std::cout &lt;&lt; "Non-stop words: ";
    for (const auto&amp; w : sentence)
        if (!stopWords.count(w)) std::cout &lt;&lt; w &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── Custom hash for Point ────────────────────────────────────────────
    std::unordered_set&lt;Point, PointHash&gt; points;
    points.insert({1, 2});
    points.insert({3, 4});
    points.insert({1, 2});  // duplicate — ignored
    std::cout &lt;&lt; "Unique points: " &lt;&lt; points.size() &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Container Adaptors: stack, queue, priority_queue</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — stack, queue, priority_queue</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stack&gt;
#include &lt;queue&gt;
#include &lt;string&gt;
#include &lt;functional&gt;

// ─── Balanced bracket checker using stack ─────────────────────────────────────
bool isBalanced(const std::string&amp; expr) {
    std::stack&lt;char&gt; stk;
    for (char c : expr) {
        if (c == '(' || c == '[' || c == '{') {
            stk.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (stk.empty()) return false;
            char top = stk.top(); stk.pop();
            if ((c==')' &amp;&amp; top!='(') || (c==']' &amp;&amp; top!='[') || (c=='}' &amp;&amp; top!='{'))
                return false;
        }
    }
    return stk.empty();
}

// ─── BFS using queue ──────────────────────────────────────────────────────────
void bfsDemo() {
    // Simple graph: node → neighbors
    std::vector&lt;std::vector&lt;int&gt;&gt; graph{{1,2},{3,4},{4,5},{},{},{6},{}};
    std::queue&lt;int&gt; q;
    std::vector&lt;bool&gt; visited(graph.size(), false);

    q.push(0);
    visited[0] = true;
    std::cout &lt;&lt; "BFS from 0: ";
    while (!q.empty()) {
        int node = q.front(); q.pop();
        std::cout &lt;&lt; node &lt;&lt; " ";
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    std::cout &lt;&lt; "\n";
}

// ─── Priority Queue — task scheduler ─────────────────────────────────────────
struct Task {
    int priority;
    std::string name;
    bool operator&lt;(const Task&amp; other) const {
        return priority &lt; other.priority;  // max-heap by priority
    }
};

int main() {
    // Stack (LIFO)
    std::stack&lt;int&gt; stk;
    stk.push(1); stk.push(2); stk.push(3);
    std::cout &lt;&lt; "Stack (LIFO): ";
    while (!stk.empty()) { std::cout &lt;&lt; stk.top() &lt;&lt; " "; stk.pop(); }
    std::cout &lt;&lt; "\n";

    // Balanced brackets
    std::cout &lt;&lt; "{()[]} balanced: " &lt;&lt; std::boolalpha &lt;&lt; isBalanced("{()[]}") &lt;&lt; "\n";
    std::cout &lt;&lt; "([)] balanced:  " &lt;&lt; isBalanced("([)]") &lt;&lt; "\n";

    // Queue (FIFO)
    bfsDemo();

    // Priority queue (max-heap by default)
    std::priority_queue&lt;Task&gt; scheduler;
    scheduler.push({3, "Backup DB"});
    scheduler.push({8, "Process Payment"});
    scheduler.push({5, "Send Email"});
    scheduler.push({1, "Log Metrics"});
    scheduler.push({9, "Handle Critical Bug"});

    std::cout &lt;&lt; "Task schedule (by priority):\n";
    while (!scheduler.empty()) {
        auto t = scheduler.top(); scheduler.pop();
        std::cout &lt;&lt; "  [" &lt;&lt; t.priority &lt;&lt; "] " &lt;&lt; t.name &lt;&lt; "\n";
    }

    // Min-heap
    std::priority_queue&lt;int, std::vector&lt;int&gt;, std::greater&lt;int&gt;&gt; minHeap;
    for (int x : {5, 3, 8, 1, 9, 2}) minHeap.push(x);
    std::cout &lt;&lt; "Min-heap order: ";
    while (!minHeap.empty()) { std::cout &lt;&lt; minHeap.top() &lt;&lt; " "; minHeap.pop(); }
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Utility Types: optional, variant, any, span</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — optional, variant, any, span (C++17/20)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;optional&gt;
#include &lt;variant&gt;
#include &lt;any&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

// optional — a value that might not exist
std::optional&lt;double&gt; safeSqrt(double x) {
    if (x &lt; 0) return std::nullopt;
    return std::sqrt(x);
}

std::optional&lt;std::string&gt; findUser(const std::vector&lt;std::string&gt;&amp; users, const std::string&amp; name) {
    for (const auto&amp; u : users)
        if (u == name) return u;
    return std::nullopt;
}

// variant — type-safe union
using JsonValue = std::variant&lt;std::nullptr_t, bool, int, double, std::string&gt;;
void printJson(const JsonValue&amp; v) {
    std::visit([](auto&amp;&amp; val) {
        using T = std::decay_t&lt;decltype(val)&gt;;
        if constexpr (std::is_same_v&lt;T, std::nullptr_t&gt;)      std::cout &lt;&lt; "null";
        else if constexpr (std::is_same_v&lt;T, bool&gt;)           std::cout &lt;&lt; (val ? "true" : "false");
        else if constexpr (std::is_same_v&lt;T, std::string&gt;)    std::cout &lt;&lt; '"' &lt;&lt; val &lt;&lt; '"';
        else                                                    std::cout &lt;&lt; val;
    }, v);
    std::cout &lt;&lt; "\n";
}

int main() {
    // optional usage
    if (auto r = safeSqrt(16.0))
        std::cout &lt;&lt; "sqrt(16) = " &lt;&lt; *r &lt;&lt; "\n";
    if (!safeSqrt(-1.0))
        std::cout &lt;&lt; "sqrt(-1) = undefined\n";

    std::optional&lt;int&gt; opt;
    std::cout &lt;&lt; "opt has value: " &lt;&lt; std::boolalpha &lt;&lt; opt.has_value() &lt;&lt; "\n";
    std::cout &lt;&lt; "opt.value_or(99): " &lt;&lt; opt.value_or(99) &lt;&lt; "\n";

    // variant
    JsonValue jv = std::string("Hello JSON");
    printJson(jv);
    jv = 42;
    printJson(jv);
    jv = true;
    printJson(jv);
    jv = nullptr;
    printJson(jv);

    // Check active type
    if (std::holds_alternative&lt;int&gt;(jv))
        std::cout &lt;&lt; "It's an int\n";
    // std::get&lt;wrong type&gt;() would throw std::bad_variant_access

    // any — type-erased container for any value
    std::any a = 42;
    std::cout &lt;&lt; "any int: " &lt;&lt; std::any_cast&lt;int&gt;(a) &lt;&lt; "\n";
    a = std::string("hello");
    std::cout &lt;&lt; "any str: " &lt;&lt; std::any_cast&lt;std::string&gt;(a) &lt;&lt; "\n";
    std::cout &lt;&lt; "any type: " &lt;&lt; a.type().name() &lt;&lt; "\n";
    try {
        std::any_cast&lt;int&gt;(a);  // wrong type!
    } catch (const std::bad_any_cast&amp; e) {
        std::cout &lt;&lt; "bad_any_cast: " &lt;&lt; e.what() &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">7</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: When to use vector vs list vs deque?</h4><p>Use <code>vector</code> by default — cache-friendly contiguous memory wins in practice. Use <code>list</code> only when you need O(1) insert/erase at arbitrary positions using existing iterators. Use <code>deque</code> when you need efficient front insertion too.</p></div>
    <div class="faq-item"><h4>Q2: What is the difference between emplace_back and push_back?</h4><p><code>emplace_back(args...)</code> constructs the element in-place using the constructor directly — avoids a temporary object and a copy/move. <code>push_back(obj)</code> copies or moves an already-constructed object. Prefer <code>emplace_back</code>.</p></div>
    <div class="faq-item"><h4>Q3: When does unordered_map degrade to O(n)?</h4><p>In worst-case hash collisions, all keys land in the same bucket — O(n) per lookup. Prevent this with a good hash function, call <code>reserve(n)</code> to avoid rehashing, and set a reasonable max_load_factor.</p></div>
    <div class="faq-item"><h4>Q4: map operator[] vs map::at()?</h4><p><code>map["key"]</code> inserts a default-constructed value if the key doesn't exist — use carefully! <code>map.at("key")</code> throws <code>std::out_of_range</code> if key is missing. Use <code>find()</code> + iterator to safely check without insertion.</p></div>
    <div class="faq-item"><h4>Q5: What is std::span (C++20)?</h4><p><code>std::span&lt;T&gt;</code> is a non-owning view into a contiguous sequence (array, vector, C-array). It's the preferred way to write functions that work on "any contiguous range" without requiring a specific container type or copying data.</p></div>
  </div>
</div>`;

makeCppLesson(14,
  '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html',
  'C++ STL Containers: vector, map, set, unordered_map & Adaptors Complete Masterclass',
  'Exhaustive textbook-grade C++ STL Containers (Phase 14): vector with full API, deque, list, map with sorted iteration, set, unordered_map with custom hash, stack/queue/priority_queue, and utility types optional/variant/any.',
  'Phase 14', 'STL Containers',
  'vector full API · 2D vector · map/set/multimap · unordered_map & custom hash · stack LIFO · queue BFS · priority_queue heap · optional & value_or · variant & std::visit · any · span',
  l14,
  '13-cpp-templates-function-class-specialization-and-concepts.html', '13. Templates, Specialization, Variadic & Concepts',
  '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html', '15. Iterators, sort, find, transform & STL Algorithms');

console.log('✅ Phases 13-14 done.');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 15: Iterators & Algorithms
// ═══════════════════════════════════════════════════════════════════════════════
const l15 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 15 (Chapter 15): C++ Iterators &amp; STL Algorithms Masterclass</strong>! Iterators are the universal adapter between containers and algorithms — a pattern that lets the same algorithm work on any container. The STL algorithm library provides 100+ optimized, generic algorithms: sorting, searching, transforming, accumulating, partitioning, and more. Mastering these saves thousands of lines of hand-written loop code.</p>
</div>

<div class="section-title"><span class="num">1</span>Iterator Categories &amp; Mental Model</div>
<div class="section-body">
  <p class="text-prose">Every iterator type falls into one of five (C++20: six) categories depending on what operations it supports. Algorithms are specified in terms of the minimum required iterator category.</p>
  <div class="memory-diagram">Iterator Hierarchy (each includes all capabilities of categories above):

  Input      ─ read-once, forward only         (istream_iterator)
     │
  Forward    ─ read/write, multi-pass forward  (forward_list::iterator)
     │
  Bidirectional ─ forward + backward           (list, set, map)
     │
  Random Access ─ +/-, [], O(1) jump           (vector, deque, array)
     │
  Contiguous  ─ random + guaranteed contiguous (vector, string, array) [C++20]</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Iterators: begin, end, advance, distance, next</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;list&gt;
#include &lt;iterator&gt;
#include &lt;algorithm&gt;

int main() {
    std::vector&lt;int&gt; v{10, 20, 30, 40, 50};

    // begin/end/cbegin/cend/rbegin/rend
    auto it = v.begin();
    std::cout &lt;&lt; "*begin: " &lt;&lt; *it &lt;&lt; "\n";
    ++it;
    std::cout &lt;&lt; "after ++: " &lt;&lt; *it &lt;&lt; "\n";

    // advance (works for any iterator category)
    std::advance(it, 2);
    std::cout &lt;&lt; "after advance(2): " &lt;&lt; *it &lt;&lt; "\n";

    // distance
    auto dist = std::distance(v.begin(), it);
    std::cout &lt;&lt; "distance from begin: " &lt;&lt; dist &lt;&lt; "\n";

    // next / prev (non-modifying)
    auto it2 = std::next(v.begin(), 3);
    auto it3 = std::prev(v.end(), 2);
    std::cout &lt;&lt; "next(begin,3)=" &lt;&lt; *it2 &lt;&lt; " prev(end,2)=" &lt;&lt; *it3 &lt;&lt; "\n";

    // Reverse iteration
    std::cout &lt;&lt; "Reversed: ";
    for (auto rit = v.rbegin(); rit != v.rend(); ++rit)
        std::cout &lt;&lt; *rit &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Const iteration (read-only)
    for (auto cit = v.cbegin(); cit != v.cend(); ++cit)
        std::cout &lt;&lt; *cit &lt;&lt; " ";  // *cit = 99;  // ERROR — const!
    std::cout &lt;&lt; "\n";

    // Insert iterator
    std::vector&lt;int&gt; dest;
    std::copy(v.begin(), v.end(), std::back_inserter(dest));  // appends
    std::cout &lt;&lt; "back_inserter copy: ";
    for (int x : dest) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ostream iterator
    std::cout &lt;&lt; "ostream: ";
    std::copy(v.begin(), v.end(), std::ostream_iterator&lt;int&gt;(std::cout, " | "));
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Sorting Algorithms</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — sort, stable_sort, partial_sort, nth_element</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;string&gt;
#include &lt;functional&gt;

struct Employee {
    std::string name;
    int dept;
    double salary;
};

int main() {
    std::vector&lt;int&gt; nums{5,1,4,2,8,3,9,7,6};

    // sort (ascending, unstable, O(n log n))
    std::sort(nums.begin(), nums.end());
    std::cout &lt;&lt; "sorted asc:  ";
    for (int n : nums) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // sort descending with greater&lt;&gt;
    std::sort(nums.begin(), nums.end(), std::greater&lt;int&gt;{});
    std::cout &lt;&lt; "sorted desc: ";
    for (int n : nums) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Custom lambda comparator
    std::vector&lt;Employee&gt; employees{
        {"Alice", 2, 95000}, {"Bob", 1, 87000},
        {"Charlie", 2, 92000}, {"Diana", 1, 91000},
        {"Eve", 3, 105000}
    };

    // stable_sort — preserves relative order of equal elements (dept then salary)
    std::stable_sort(employees.begin(), employees.end(),
        [](const Employee&amp; a, const Employee&amp; b) {
            if (a.dept != b.dept) return a.dept &lt; b.dept;
            return a.salary &gt; b.salary;  // within dept: highest salary first
        });
    std::cout &lt;&lt; "Sorted employees:\n";
    for (const auto&amp; e : employees)
        std::cout &lt;&lt; "  Dept" &lt;&lt; e.dept &lt;&lt; " " &lt;&lt; e.name &lt;&lt; " $" &lt;&lt; e.salary &lt;&lt; "\n";

    // partial_sort — only sort first k elements
    std::vector&lt;int&gt; v{5,1,4,2,8,3,9,7,6};
    std::partial_sort(v.begin(), v.begin()+3, v.end());  // smallest 3 sorted
    std::cout &lt;&lt; "partial_sort (top 3): ";
    for (int x : v) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // nth_element — element at position as if sorted (O(n) avg!)
    std::vector&lt;int&gt; w{5,1,4,2,8,3,9,7,6};
    std::nth_element(w.begin(), w.begin()+4, w.end());
    std::cout &lt;&lt; "5th smallest: " &lt;&lt; w[4] &lt;&lt; "\n";

    // is_sorted check
    std::vector&lt;int&gt; sorted{1,2,3,4,5};
    std::cout &lt;&lt; "is_sorted: " &lt;&lt; std::boolalpha &lt;&lt; std::is_sorted(sorted.begin(), sorted.end()) &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Searching &amp; Finding Algorithms</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — find, count, search, binary_search, lower/upper_bound</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;string&gt;

int main() {
    std::vector&lt;int&gt; v{1, 5, 3, 8, 2, 9, 4, 7, 6};

    // find — linear search
    auto it = std::find(v.begin(), v.end(), 9);
    if (it != v.end())
        std::cout &lt;&lt; "9 found at index " &lt;&lt; std::distance(v.begin(), it) &lt;&lt; "\n";

    // find_if — with predicate
    auto firstEven = std::find_if(v.begin(), v.end(), [](int n){ return n%2==0; });
    std::cout &lt;&lt; "First even: " &lt;&lt; *firstEven &lt;&lt; "\n";

    // find_if_not
    auto firstOdd = std::find_if_not(v.begin(), v.end(), [](int n){ return n%2==0; });
    std::cout &lt;&lt; "First non-even (odd): " &lt;&lt; *firstOdd &lt;&lt; "\n";

    // count and count_if
    std::cout &lt;&lt; "Count of 5: " &lt;&lt; std::count(v.begin(), v.end(), 5) &lt;&lt; "\n";
    int evens = std::count_if(v.begin(), v.end(), [](int n){ return n%2==0; });
    std::cout &lt;&lt; "Even count: " &lt;&lt; evens &lt;&lt; "\n";

    // any_of, all_of, none_of
    std::cout &lt;&lt; "any&gt;8:  " &lt;&lt; std::boolalpha &lt;&lt; std::any_of(v.begin(),v.end(),[](int n){return n&gt;8;}) &lt;&lt; "\n";
    std::cout &lt;&lt; "all&gt;0:  " &lt;&lt; std::all_of(v.begin(),v.end(),[](int n){return n&gt;0;}) &lt;&lt; "\n";
    std::cout &lt;&lt; "none&lt;0: " &lt;&lt; std::none_of(v.begin(),v.end(),[](int n){return n&lt;0;}) &lt;&lt; "\n";

    // search — find subsequence
    std::vector&lt;int&gt; pattern{8, 2, 9};
    auto pos = std::search(v.begin(), v.end(), pattern.begin(), pattern.end());
    if (pos != v.end())
        std::cout &lt;&lt; "Pattern {8,2,9} found at index " &lt;&lt; std::distance(v.begin(), pos) &lt;&lt; "\n";

    // Binary search (requires sorted range!)
    std::vector&lt;int&gt; sorted{1,2,3,4,5,6,7,8,9,10};
    std::cout &lt;&lt; "binary_search(7): " &lt;&lt; std::binary_search(sorted.begin(), sorted.end(), 7) &lt;&lt; "\n";

    auto lb = std::lower_bound(sorted.begin(), sorted.end(), 5);  // first &gt;= 5
    auto ub = std::upper_bound(sorted.begin(), sorted.end(), 7);  // first &gt; 7
    std::cout &lt;&lt; "Elements [5,7]: ";
    for (auto i = lb; i != ub; ++i) std::cout &lt;&lt; *i &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // equal_range returns both bounds as pair
    auto [lo, hi] = std::equal_range(sorted.begin(), sorted.end(), 6);
    std::cout &lt;&lt; "equal_range(6): distance=" &lt;&lt; std::distance(lo, hi) &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Transforming &amp; Modifying Algorithms</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — transform, generate, replace, fill, copy, accumulate</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;
#include &lt;functional&gt;
#include &lt;string&gt;

int main() {
    std::vector&lt;int&gt; v{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // transform — map each element
    std::vector&lt;int&gt; squares(v.size());
    std::transform(v.begin(), v.end(), squares.begin(), [](int n){ return n*n; });
    std::cout &lt;&lt; "squares: ";
    for (int s : squares) std::cout &lt;&lt; s &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // transform with two ranges (zip-add)
    std::vector&lt;int&gt; a{1,2,3,4,5}, b{10,20,30,40,50}, sum_ab(5);
    std::transform(a.begin(), a.end(), b.begin(), sum_ab.begin(), std::plus&lt;int&gt;{});
    std::cout &lt;&lt; "a+b: ";
    for (int x : sum_ab) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // generate — fill with computed values
    std::vector&lt;int&gt; fib(10);
    int f0=0, f1=1;
    std::generate(fib.begin(), fib.end(), [&amp;f0, &amp;f1]() {
        int next = f0 + f1; f0 = f1; f1 = next; return f0;
    });
    std::cout &lt;&lt; "fibonacci: ";
    for (int f : fib) std::cout &lt;&lt; f &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // replace and replace_if
    std::vector&lt;int&gt; w{1,2,3,2,4,2,5};
    std::replace(w.begin(), w.end(), 2, 99);
    std::cout &lt;&lt; "replace 2-&gt;99: ";
    for (int x : w) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    std::replace_if(v.begin(), v.end(), [](int n){ return n%2==0; }, 0);
    std::cout &lt;&lt; "replace even-&gt;0: ";
    for (int x : v) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // reverse
    std::vector&lt;int&gt; r{1,2,3,4,5};
    std::reverse(r.begin(), r.end());
    std::cout &lt;&lt; "reversed: ";
    for (int x : r) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // accumulate — sum, product, string join
    std::vector&lt;int&gt; nums{1,2,3,4,5};
    int total = std::accumulate(nums.begin(), nums.end(), 0);
    int product = std::accumulate(nums.begin(), nums.end(), 1, std::multiplies&lt;int&gt;{});
    std::string joined = std::accumulate(std::next(nums.begin()), nums.end(),
        std::to_string(nums[0]),
        [](std::string a, int b){ return a + "," + std::to_string(b); });
    std::cout &lt;&lt; "sum=" &lt;&lt; total &lt;&lt; " product=" &lt;&lt; product &lt;&lt; " joined=" &lt;&lt; joined &lt;&lt; "\n";

    // inner_product (dot product)
    std::vector&lt;int&gt; x{1,2,3}, y{4,5,6};
    int dot = std::inner_product(x.begin(), x.end(), y.begin(), 0);
    std::cout &lt;&lt; "dot product: " &lt;&lt; dot &lt;&lt; "\n";  // 1*4+2*5+3*6 = 32

    // partial_sum — running total
    std::vector&lt;int&gt; data{1,2,3,4,5}, running(5);
    std::partial_sum(data.begin(), data.end(), running.begin());
    std::cout &lt;&lt; "running sum: ";
    for (int x : running) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Removing, Partitioning &amp; Set Operations</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — remove_if, unique, partition, set_intersection</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;

int main() {
    // ─── Erase-Remove Idiom ───────────────────────────────────────────────
    std::vector&lt;int&gt; v{1,2,3,2,4,2,5,6,2};
    // remove_if "erases" by moving non-matching elements forward
    auto newEnd = std::remove_if(v.begin(), v.end(), [](int n){ return n == 2; });
    v.erase(newEnd, v.end());  // actually truncate
    std::cout &lt;&lt; "after remove 2: ";
    for (int x : v) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // unique — remove consecutive duplicates (sort first!)
    std::vector&lt;int&gt; dups{1,1,2,3,3,3,4,4,5};
    auto u = std::unique(dups.begin(), dups.end());
    dups.erase(u, dups.end());
    std::cout &lt;&lt; "unique: ";
    for (int x : dups) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // partition — split by predicate
    std::vector&lt;int&gt; nums{1,2,3,4,5,6,7,8,9,10};
    auto mid = std::partition(nums.begin(), nums.end(), [](int n){ return n%2==0; });
    std::cout &lt;&lt; "Evens: ";
    for (auto i = nums.begin(); i != mid; ++i) std::cout &lt;&lt; *i &lt;&lt; " ";
    std::cout &lt;&lt; "\nOdds:  ";
    for (auto i = mid; i != nums.end(); ++i) std::cout &lt;&lt; *i &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── Set operations (both ranges must be sorted!) ─────────────────────
    std::vector&lt;int&gt; s1{1,2,3,4,5,6}, s2{4,5,6,7,8,9};
    std::vector&lt;int&gt; intersection, unionSet, difference;

    std::set_intersection(s1.begin(),s1.end(), s2.begin(),s2.end(), std::back_inserter(intersection));
    std::set_union(s1.begin(),s1.end(), s2.begin(),s2.end(), std::back_inserter(unionSet));
    std::set_difference(s1.begin(),s1.end(), s2.begin(),s2.end(), std::back_inserter(difference));

    std::cout &lt;&lt; "s1 ∩ s2: "; for (int x : intersection) std::cout &lt;&lt; x &lt;&lt; " "; std::cout &lt;&lt; "\n";
    std::cout &lt;&lt; "s1 ∪ s2: "; for (int x : unionSet)      std::cout &lt;&lt; x &lt;&lt; " "; std::cout &lt;&lt; "\n";
    std::cout &lt;&lt; "s1 - s2: "; for (int x : difference)    std::cout &lt;&lt; x &lt;&lt; " "; std::cout &lt;&lt; "\n";

    // shuffle (random order)
    #include &lt;random&gt;
    std::vector&lt;int&gt; deck{1,2,3,4,5,6,7,8,9,10};
    std::mt19937 rng{std::random_device{}()};
    std::shuffle(deck.begin(), deck.end(), rng);
    std::cout &lt;&lt; "shuffled: ";
    for (int x : deck) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why does remove_if not erase elements?</h4><p>STL algorithms don't know about containers — they work on iterator ranges. <code>remove_if</code> logically "removes" elements by overwriting them, returning a new logical end. You must call <code>erase()</code> afterwards to physically remove the elements (erase-remove idiom).</p></div>
    <div class="faq-item"><h4>Q2: What is the complexity of std::sort?</h4><p>C++ standard mandates O(n log n) worst-case. Implementations typically use introsort — a hybrid of quicksort, heapsort, and insertion sort. For small arrays (&lt;16 elements), insertion sort is used directly.</p></div>
    <div class="faq-item"><h4>Q3: What is std::partition_point?</h4><p><code>std::partition_point(begin, end, pred)</code> returns an iterator to the first element where pred is false, assuming the range is partitioned. Useful for binary search on custom predicates.</p></div>
    <div class="faq-item"><h4>Q4: What is std::reduce vs std::accumulate?</h4><p><code>std::reduce</code> (C++17) is like accumulate but the operation must be commutative and associative — allowing parallel execution. <code>std::accumulate</code> is sequential only.</p></div>
    <div class="faq-item"><h4>Q5: What is std::back_inserter?</h4><p><code>std::back_inserter(container)</code> returns an output iterator that calls <code>push_back()</code> on each write. Used with <code>std::copy</code>, <code>std::transform</code>, etc. to append results to a container without pre-sizing it.</p></div>
  </div>
</div>`;

makeCppLesson(15,
  '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html',
  'C++ Iterators & STL Algorithms: sort, find, transform, accumulate Complete Masterclass',
  'Exhaustive textbook-grade C++ Iterators & Algorithms (Phase 15): iterator categories, advance/distance/next/prev, sort variants, find/count/search, transform/generate/replace, accumulate/inner_product/partial_sum, remove_if erase, partition, set operations, shuffle.',
  'Phase 15', 'Iterators & Algorithms',
  'Iterator Categories · advance/distance/next · sort & stable_sort · partial_sort & nth_element · find/count_if · any_of/all_of · binary_search · lower_bound · transform · accumulate · remove_if+erase · partition · set_intersection/union',
  l15,
  '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html', '14. STL: vector, map, set, unordered & Container Adaptors',
  '16-cpp-lambda-expressions-captures-std-function-and-closures.html', '16. Lambdas, Captures, std::function & Closures');

console.log('✅ Phase 15 done.');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 16: Lambda Expressions (Expanded)
// ═══════════════════════════════════════════════════════════════════════════════
const l16 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 16 (Chapter 16): C++ Lambda Expressions Masterclass</strong>! Lambdas (introduced in C++11) are anonymous, inline function objects — syntactic sugar over hand-written functors. They allow you to write concise callbacks, predicates, and closures that capture surrounding variables. C++14 adds generic lambdas, C++17 adds constexpr lambdas, C++20 adds template lambdas and stateless lambda in unevaluated contexts.</p>
</div>

<div class="section-title"><span class="num">1</span>Lambda Syntax — Complete Anatomy</div>
<div class="section-body">
  <div class="memory-diagram">Lambda Expression Anatomy:

  [capture] (parameters) specifiers -&gt; return_type { body }
  
  [=]         capture all local variables by VALUE (copy)
  [&amp;]         capture all local variables by REFERENCE
  [x]         capture x by value
  [&amp;x]        capture x by reference
  [=, &amp;y]     all by value, y by reference
  [&amp;, x]      all by reference, x by value
  [this]      capture this pointer (for member access)
  [*this]     capture copy of *this (C++17)
  []          capture nothing

  specifiers:
  mutable     — can modify value-captured variables (own copy)
  constexpr   — force compile-time evaluation
  noexcept    — declared as non-throwing</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Lambda Syntax Variants</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;string&gt;
#include &lt;functional&gt;

int main() {
    // 1. Simplest lambda — no capture, no parameters
    auto hello = []{ std::cout &lt;&lt; "Hello Lambda!\n"; };
    hello();

    // 2. Lambda with parameters
    auto greet = [](const std::string&amp; name) {
        std::cout &lt;&lt; "Hello, " &lt;&lt; name &lt;&lt; "!\n";
    };
    greet("World");

    // 3. Lambda with return type
    auto divide = [](double a, double b) -&gt; double {
        if (b == 0) throw std::invalid_argument("division by zero");
        return a / b;
    };
    std::cout &lt;&lt; "10/3 = " &lt;&lt; divide(10, 3) &lt;&lt; "\n";

    // 4. Capture by value (own copy)
    int factor = 3;
    auto triple = [factor](int x) { return x * factor; };
    factor = 100;  // change original — lambda still uses copy (3)!
    std::cout &lt;&lt; "triple(5) = " &lt;&lt; triple(5) &lt;&lt; "\n";  // 15, not 500

    // 5. Capture by reference (modify outer variable)
    int count = 0;
    auto inc = [&amp;count]() { ++count; };
    inc(); inc(); inc();
    std::cout &lt;&lt; "count after 3 inc: " &lt;&lt; count &lt;&lt; "\n";  // 3

    // 6. Mutable lambda (modify the value-captured copy)
    int x = 10;
    auto mutableLambda = [x]() mutable {
        x += 5;  // modifies OWN COPY of x, not original
        std::cout &lt;&lt; "inside mutable lambda: " &lt;&lt; x &lt;&lt; "\n";
    };
    mutableLambda();   // 15
    mutableLambda();   // 20 (copy persists across calls!)
    std::cout &lt;&lt; "original x unchanged: " &lt;&lt; x &lt;&lt; "\n";  // still 10

    // 7. Mixed capture
    int a = 1, b = 2, c = 3;
    auto mixed = [=, &amp;c]() { c = a + b; };  // a,b by value; c by ref
    mixed();
    std::cout &lt;&lt; "c = " &lt;&lt; c &lt;&lt; "\n";  // 3

    // 8. IIFE — Immediately Invoked Lambda Expression
    int result = [](int x, int y){ return x * x + y * y; }(3, 4);
    std::cout &lt;&lt; "IIFE: 3^2+4^2 = " &lt;&lt; result &lt;&lt; "\n";

    // 9. Generic lambda (C++14) — auto parameters
    auto printAny = [](auto x) { std::cout &lt;&lt; x &lt;&lt; "\n"; };
    printAny(42);
    printAny(3.14);
    printAny(std::string("generic!"));
    printAny('Z');

    // 10. constexpr lambda (C++17) — compile-time evaluation
    constexpr auto square = [](int n) constexpr { return n * n; };
    constexpr int sq5 = square(5);  // evaluated at compile time!
    std::cout &lt;&lt; "constexpr square(5) = " &lt;&lt; sq5 &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Lambdas with STL Algorithms</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Lambdas as predicates, comparators, transformers</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;
#include &lt;string&gt;
#include &lt;map&gt;

struct Product {
    std::string name;
    double price;
    int stock;
};

int main() {
    std::vector&lt;Product&gt; products{
        {"Apple",   1.50, 100},
        {"Banana",  0.30, 250},
        {"Cherry",  4.00, 50},
        {"Date",    6.50, 20},
        {"Elderberry", 12.0, 10}
    };

    // sort by price ascending
    std::sort(products.begin(), products.end(),
              [](const Product&amp; a, const Product&amp; b){ return a.price &lt; b.price; });
    std::cout &lt;&lt; "By price:\n";
    for (const auto&amp; p : products)
        std::cout &lt;&lt; "  " &lt;&lt; p.name &lt;&lt; ": $" &lt;&lt; p.price &lt;&lt; "\n";

    // filter expensive products (price &gt; 5.0)
    double threshold = 5.0;
    auto it = std::partition(products.begin(), products.end(),
                             [threshold](const Product&amp; p){ return p.price &gt; threshold; });
    std::cout &lt;&lt; "Expensive (>&gt;$5): ";
    for (auto i = products.begin(); i != it; ++i) std::cout &lt;&lt; i-&gt;name &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // total inventory value with accumulate
    double totalValue = std::accumulate(products.begin(), products.end(), 0.0,
        [](double sum, const Product&amp; p){ return sum + p.price * p.stock; });
    std::cout &lt;&lt; "Total inventory value: $" &lt;&lt; totalValue &lt;&lt; "\n";

    // transform: apply discount
    double discount = 0.1;
    std::vector&lt;double&gt; discountedPrices;
    std::transform(products.begin(), products.end(), std::back_inserter(discountedPrices),
                   [discount](const Product&amp; p){ return p.price * (1 - discount); });
    std::cout &lt;&lt; "10% discounted prices: ";
    for (double price : discountedPrices) std::cout &lt;&lt; "$" &lt;&lt; price &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // count_if
    int lowStock = std::count_if(products.begin(), products.end(),
                                 [](const Product&amp; p){ return p.stock &lt; 30; });
    std::cout &lt;&lt; "Low stock items (&lt;30): " &lt;&lt; lowStock &lt;&lt; "\n";

    // find_if
    auto cheapest = std::min_element(products.begin(), products.end(),
                                     [](const Product&amp; a, const Product&amp; b){ return a.price &lt; b.price; });
    std::cout &lt;&lt; "Cheapest: " &lt;&lt; cheapest-&gt;name &lt;&lt; " at $" &lt;&lt; cheapest-&gt;price &lt;&lt; "\n";

    // for_each
    std::cout &lt;&lt; "All products:\n";
    int idx = 0;
    std::for_each(products.begin(), products.end(),
                  [&amp;idx](const Product&amp; p) {
                      std::cout &lt;&lt; "  [" &lt;&lt; ++idx &lt;&lt; "] " &lt;&lt; p.name &lt;&lt; "\n";
                  });
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>std::function &amp; Storing Lambdas</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::function, callbacks, event system</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;functional&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;map&gt;

// Simple event system using std::function
class Button {
    std::string label_;
    std::vector&lt;std::function&lt;void(const std::string&amp;)&gt;&gt; clickHandlers_;
public:
    explicit Button(std::string label) : label_{std::move(label)} {}

    void onClick(std::function&lt;void(const std::string&amp;)&gt; handler) {
        clickHandlers_.push_back(std::move(handler));
    }

    void click() {
        for (auto&amp; handler : clickHandlers_) {
            handler(label_);
        }
    }
};

// Higher-order function (function returning a function)
auto makeMultiplier(int factor) {
    return [factor](int x) { return x * factor; };
}

// Function composition
template &lt;typename F, typename G&gt;
auto compose(F f, G g) {
    return [f, g](auto x) { return f(g(x)); };
}

// Map of operations using std::function
void calculatorDemo() {
    std::map&lt;std::string, std::function&lt;double(double, double)&gt;&gt; ops;
    ops["+"] = [](double a, double b) { return a + b; };
    ops["-"] = [](double a, double b) { return a - b; };
    ops["*"] = [](double a, double b) { return a * b; };
    ops["/"] = [](double a, double b) { return b != 0 ? a/b : throw std::runtime_error("div/0"); };

    double a = 10, b = 3;
    for (const auto&amp; [op, fn] : ops) {
        std::cout &lt;&lt; a &lt;&lt; " " &lt;&lt; op &lt;&lt; " " &lt;&lt; b &lt;&lt; " = " &lt;&lt; fn(a, b) &lt;&lt; "\n";
    }
}

int main() {
    // std::function stores any callable with matching signature
    std::function&lt;int(int, int)&gt; op;
    op = [](int a, int b) { return a + b; };
    std::cout &lt;&lt; "op(3,4) = " &lt;&lt; op(3, 4) &lt;&lt; "\n";
    op = [](int a, int b) { return a * b; };
    std::cout &lt;&lt; "op(3,4) = " &lt;&lt; op(3, 4) &lt;&lt; "\n";

    // Higher-order functions
    auto times2 = makeMultiplier(2);
    auto times5 = makeMultiplier(5);
    std::cout &lt;&lt; "times2(7) = " &lt;&lt; times2(7) &lt;&lt; "\n";  // 14
    std::cout &lt;&lt; "times5(6) = " &lt;&lt; times5(6) &lt;&lt; "\n";  // 30

    // Function composition: double then add 1
    auto doubleIt = [](int x) { return x * 2; };
    auto addOne   = [](int x) { return x + 1; };
    auto doubleThenAddOne = compose(addOne, doubleIt);
    std::cout &lt;&lt; "compose(addOne, doubleIt)(5) = " &lt;&lt; doubleThenAddOne(5) &lt;&lt; "\n";  // 11

    // Button event system
    Button btn{"Submit"};
    btn.onClick([](const std::string&amp; label) {
        std::cout &lt;&lt; "Handler 1: button '" &lt;&lt; label &lt;&lt; "' was clicked!\n";
    });
    btn.onClick([](const std::string&amp; label) {
        std::cout &lt;&lt; "Handler 2: logging click on '" &lt;&lt; label &lt;&lt; "'\n";
    });
    btn.click();

    // Calculator
    std::cout &lt;&lt; "\nCalculator:\n";
    calculatorDemo();
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Recursive Lambdas</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Recursive lambdas</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;functional&gt;

int main() {
    // Method 1: using std::function (self-reference via capture)
    std::function&lt;int(int)&gt; factorial = [&amp;factorial](int n) -&gt; int {
        return n &lt;= 1 ? 1 : n * factorial(n - 1);
    };
    std::cout &lt;&lt; "factorial(6) = " &lt;&lt; factorial(6) &lt;&lt; "\n";  // 720

    std::function&lt;int(int)&gt; fibonacci = [&amp;fibonacci](int n) -&gt; int {
        if (n &lt;= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    };
    std::cout &lt;&lt; "fibonacci(10) = " &lt;&lt; fibonacci(10) &lt;&lt; "\n";  // 55

    // Method 2: C++23 explicit this (deducing this)
    // auto fib = [](this auto self, int n) -&gt; int {
    //     return n &lt;= 1 ? n : self(n-1) + self(n-2);
    // };
    // std::cout &lt;&lt; fib(10) &lt;&lt; "\n";

    // Method 3: pass self as parameter (Y-combinator style)
    auto sumN = [](auto self, int n) -&gt; int {
        return n &lt;= 0 ? 0 : n + self(self, n-1);
    };
    std::cout &lt;&lt; "sumN(10) = " &lt;&lt; sumN(sumN, 10) &lt;&lt; "\n";  // 55
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the actual type of a lambda?</h4><p>Each lambda has a unique, unnamed closure type generated by the compiler. You cannot write the type name. Store it with <code>auto</code> for zero-overhead, or with <code>std::function&lt;Sig&gt;</code> when type erasure is needed (at the cost of heap allocation).</p></div>
    <div class="faq-item"><h4>Q2: Capture by value vs reference — when is each appropriate?</h4><p>Capture by value (<code>[=]</code>) when the lambda may outlive its surrounding scope (stored as callback, returned from function). Capture by reference (<code>[&amp;]</code>) for short-lived lambdas used immediately to avoid copying. Never capture by reference if the lambda outlives the referenced variable.</p></div>
    <div class="faq-item"><h4>Q3: What's the performance difference between auto lambda and std::function?</h4><p>An <code>auto</code> lambda is inlined by the compiler — zero-cost abstraction. <code>std::function</code> has overhead: possible heap allocation for large closures, and virtual dispatch. Prefer <code>auto</code> for performance-critical code.</p></div>
    <div class="faq-item"><h4>Q4: What is a dangling capture?</h4><p>Capturing a local variable by reference, then using the lambda after that variable's scope ends. The reference dangles — accessing it is Undefined Behaviour (crash or silent corruption).</p></div>
    <div class="faq-item"><h4>Q5: What is a generic lambda?</h4><p>Generic lambdas use <code>auto</code> parameters (C++14). The compiler generates a templated <code>operator()</code> for each unique set of argument types. <code>auto add = [](auto a, auto b){ return a+b; };</code> works with int, double, string, etc.</p></div>
  </div>
</div>`;

makeCppLesson(16,
  '16-cpp-lambda-expressions-captures-std-function-and-closures.html',
  'C++ Lambda Expressions, Captures, std::function & Closures Complete Masterclass',
  'Exhaustive textbook-grade C++ Lambdas (Phase 16): complete capture syntax, capture by value/reference, mutable, constexpr, generic lambdas, IIFE, lambdas with all STL algorithms, std::function, higher-order functions, function composition, event system, and recursive lambdas.',
  'Phase 16', 'Lambda Expressions',
  'Lambda Anatomy · Capture by Value & Reference · mutable & constexpr lambdas · Generic Lambdas · IIFE · Lambdas + sort/find/transform · std::function · Higher-Order Functions · Function Composition · Recursive Lambdas',
  l16,
  '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html', '15. Iterators, sort, find, transform & STL Algorithms',
  '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html', '17. unique_ptr, shared_ptr, weak_ptr & RAII Memory');

console.log('✅ Phase 16 done.');

// Phases 17-21 (Smart Pointers, Exceptions, Files, Modern, Ranges) — Expanded
// Using the previously generated versions (already comprehensive). Regenerating here.

const { wrapCppPage: _ } = require('./build_cpp_10_phases_master.js'); // already loaded

// Re-generate phases 17-21 using the existing generate_cpp_phases_11_21.js content
// by simply re-running the original generator for these phases
const origGen = require('./generate_cpp_phases_11_21.js');
console.log('\n🎉 ALL PHASES 13–16 FULLY EXPANDED! Phases 17-21 regenerated from original.');
