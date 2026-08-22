const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cppDir = path.join(__dirname, '..', 'public', 'blog-cpp');
console.log('🚀 Generating C++ Phases 11–21 Master Textbook Lessons...');

function makeCppLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(path.join(cppDir, file),
    wrapCppPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8');
  console.log('  ✅ ' + file);
}

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 11: Inheritance & Polymorphism
// ═══════════════════════════════════════════════════════════════════════════════
const l11 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 11: Inheritance &amp; Polymorphism</strong>! Inheritance lets a derived class reuse, extend, and specialize a base class. Polymorphism (runtime dispatch through virtual functions) allows a base-class pointer/reference to call the correct overridden method at runtime — the foundation of object-oriented design in C++.</p>
</div>

<div class="section-title"><span class="num">1</span>Inheritance Basics — Base &amp; Derived Classes</div>
<div class="section-body">
  <p class="text-prose">A <strong>derived class</strong> inherits members from a <strong>base class</strong>. Access specifier in the inheritance declaration controls how base members are seen in the derived class and outside world.</p>
  <table class="tbl spec-table">
    <thead><tr><th>Inheritance Type</th><th>public in Base</th><th>protected in Base</th><th>private in Base</th></tr></thead>
    <tbody>
      <tr><td><code>public</code> inheritance</td><td>public</td><td>protected</td><td>inaccessible</td></tr>
      <tr><td><code>protected</code> inheritance</td><td>protected</td><td>protected</td><td>inaccessible</td></tr>
      <tr><td><code>private</code> inheritance</td><td>private</td><td>private</td><td>inaccessible</td></tr>
    </tbody>
  </table>
  <div class="concept-box">
    <h4>Inheritance Hierarchy Types:</h4>
    <p>• <strong>Single:</strong> One derived from one base.</p>
    <p>• <strong>Multilevel:</strong> A → B → C chain.</p>
    <p>• <strong>Multiple:</strong> Derived inherits from two or more bases.</p>
    <p>• <strong>Hierarchical:</strong> Multiple derived classes from one base.</p>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Virtual Functions &amp; Runtime Polymorphism</div>
<div class="section-body">
  <p class="text-prose">Declaring a method <code>virtual</code> in the base class tells the compiler to use the <strong>vtable (virtual dispatch table)</strong> mechanism. At runtime, the actual object type determines which override is called — this is <strong>runtime polymorphism</strong>.</p>
  <div class="concept-box">
    <h4>Key Rules:</h4>
    <p>• Always mark the destructor <code>virtual</code> in a polymorphic base class to prevent undefined behaviour on delete.</p>
    <p>• Use <code>override</code> keyword in derived classes to catch typos at compile time.</p>
    <p>• Use <code>final</code> to prevent further overriding.</p>
    <p>• A <strong>pure virtual function</strong> (<code>= 0</code>) makes the class <em>abstract</em> — it cannot be instantiated directly.</p>
  </div>
  <div class="memory-diagram">Virtual Table (vtable) mechanism:

  Animal object (base pointer)
  ┌─────────────────────────────────┐
  │  vptr ──────────────────────────┼──► Animal::vtable
  │  data members...               │         │── &amp;Animal::sound()
  └─────────────────────────────────┘         │── &amp;Animal::~Animal()

  Dog object (actual runtime type)
  ┌─────────────────────────────────┐
  │  vptr ──────────────────────────┼──► Dog::vtable
  │  data members...               │         │── &amp;Dog::sound()   ← OVERRIDE
  └─────────────────────────────────┘         │── &amp;Dog::~Dog()
  
  animal.sound() → vptr lookup → Dog::sound() called ✅</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Polymorphism, Virtual &amp; Pure Virtual</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;

class Animal {
public:
    virtual void sound() const {
        std::cout &lt;&lt; "Generic animal sound\n";
    }
    virtual std::string name() const = 0;  // pure virtual → abstract class
    virtual ~Animal() = default;           // virtual destructor ESSENTIAL!
};

class Dog : public Animal {
public:
    void sound() const override {
        std::cout &lt;&lt; "Dog: Woof! Woof!\n";
    }
    std::string name() const override { return "Dog"; }
};

class Cat : public Animal {
public:
    void sound() const override {
        std::cout &lt;&lt; "Cat: Meow!\n";
    }
    std::string name() const override { return "Cat"; }
};

class GuideDog : public Dog {        // multilevel inheritance
public:
    void guide() const {
        std::cout &lt;&lt; "GuideDog: Leading the way!\n";
    }
};

int main() {
    // Runtime polymorphism via base-class pointer
    std::vector&lt;std::unique_ptr&lt;Animal&gt;&gt; animals;
    animals.push_back(std::make_unique&lt;Dog&gt;());
    animals.push_back(std::make_unique&lt;Cat&gt;());
    animals.push_back(std::make_unique&lt;GuideDog&gt;());

    for (const auto&amp; a : animals) {
        std::cout &lt;&lt; a-&gt;name() &lt;&lt; ": ";
        a-&gt;sound();
    }

    // dynamic_cast for safe downcasting
    Animal* ptr = new GuideDog();
    if (auto* gd = dynamic_cast&lt;GuideDog*&gt;(ptr)) {
        gd-&gt;guide();
    }
    delete ptr;
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Upcasting, Downcasting &amp; dynamic_cast</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Cast Type</th><th>Direction</th><th>Safety</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td>Upcasting</td><td>Derived → Base</td><td>Always safe (implicit)</td><td><code>Animal* a = &amp;dog;</code></td></tr>
      <tr><td>Downcasting (static)</td><td>Base → Derived</td><td>Unsafe — programmer must verify type</td><td><code>static_cast&lt;Dog*&gt;(a)</code></td></tr>
      <tr><td>Downcasting (dynamic)</td><td>Base → Derived</td><td>Runtime-checked; returns nullptr if wrong</td><td><code>dynamic_cast&lt;Dog*&gt;(a)</code></td></tr>
    </tbody>
  </table>
  <div class="concept-box">
    <h4>Composition vs Inheritance:</h4>
    <p>• <strong>Inheritance</strong> expresses an IS-A relationship (Dog IS-A Animal).</p>
    <p>• <strong>Composition</strong> expresses a HAS-A relationship (Car HAS-A Engine). Prefer composition for flexibility — it avoids deep inheritance hierarchies and fragile base-class coupling.</p>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Abstract Classes &amp; Interface-Style Design</div>
<div class="section-body">
  <p class="text-prose">In C++, an <strong>abstract class</strong> has at least one pure virtual function. It defines a contract that all derived classes must fulfill. This mimics Java/C# interfaces without a separate <code>interface</code> keyword.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Abstract Interface Pattern</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;

class ILogger {                     // Interface-style abstract base
public:
    virtual void log(const std::string&amp; msg) const = 0;
    virtual void setLevel(int level) = 0;
    virtual ~ILogger() = default;
};

class ConsoleLogger : public ILogger {
    int level_{0};
public:
    void log(const std::string&amp; msg) const override {
        std::cout &lt;&lt; "[LOG-" &lt;&lt; level_ &lt;&lt; "] " &lt;&lt; msg &lt;&lt; "\n";
    }
    void setLevel(int level) override { level_ = level; }
};

void processWithLogger(ILogger&amp; logger) {
    logger.setLevel(2);
    logger.log("System started successfully");
}

int main() {
    ConsoleLogger clog;
    processWithLogger(clog);
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why is virtual destructor important?</h4><p>Without a virtual destructor, deleting a Derived object through a Base pointer calls only the Base destructor — the Derived destructor is skipped, causing resource leaks.</p></div>
    <div class="faq-item"><h4>Q2: What is the diamond problem in multiple inheritance?</h4><p>When two base classes share a common ancestor, the derived class gets two copies of that ancestor. Solved with <code>virtual</code> inheritance: <code>class B : virtual public A</code>.</p></div>
    <div class="faq-item"><h4>Q3: Can a constructor be virtual?</h4><p>No. Constructors cannot be virtual because the vtable is set up during construction — the object type isn't fully known yet.</p></div>
    <div class="faq-item"><h4>Q4: What is the overhead of virtual functions?</h4><p>Each polymorphic object carries a hidden vptr (8 bytes on 64-bit). Each virtual call does one extra pointer dereference — negligible in almost all applications.</p></div>
    <div class="faq-item"><h4>Q5: What does override keyword do?</h4><p><code>override</code> instructs the compiler to verify the function actually overrides a virtual function in the base. It catches typos and signature mismatches at compile time.</p></div>
  </div>
</div>`;

makeCppLesson(11,
  '11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html',
  'C++ Inheritance, Virtual Functions & Runtime Polymorphism Masterclass',
  'Exhaustive C++ guide on Inheritance (Phase 11): single/multi/hierarchical inheritance, virtual functions, pure virtual, abstract classes, vtable, upcasting, dynamic_cast, and composition vs inheritance.',
  'Phase 11', 'Inheritance & Polymorphism',
  'Base & Derived Classes · public/protected/private Inheritance · Virtual Functions · vtable · Pure Virtual · Abstract Classes · virtual Destructor · dynamic_cast · Composition vs Inheritance',
  l11,
  '10-cpp-constructors-destructors-rule-of-five-and-raii.html', '10. Constructors, Destructors, Rule of 5 & RAII',
  '12-cpp-operator-overloading-friend-functions-and-stream-operators.html', '12. Operator Overloading, Friend Functions & Streams');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 12: Operator Overloading
// ═══════════════════════════════════════════════════════════════════════════════
const l12 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 12: Operator Overloading</strong>! C++ allows user-defined types to define the behavior of built-in operators (<code>+</code>, <code>-</code>, <code>==</code>, <code>&lt;&lt;</code>, <code>[]</code>, etc.) making classes feel as natural as built-in types. This is the basis for <code>std::string</code>, <code>std::vector</code>, and smart pointer syntax.</p>
</div>

<div class="section-title"><span class="num">1</span>What is Operator Overloading?</div>
<div class="section-body">
  <p class="text-prose">Operator overloading is defining a special function named <code>operator@</code> (where @ is the operator symbol) that C++ calls when the operator is used on objects of your class. It does NOT change operator precedence, associativity, or arity.</p>
  <table class="tbl spec-table">
    <thead><tr><th>Operator</th><th>Implementation</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td><code>+</code>, <code>-</code>, <code>*</code></td><td>Member or non-member</td><td>Return by value (new object)</td></tr>
      <tr><td><code>==</code>, <code>!=</code>, <code>&lt;</code></td><td>Non-member preferred</td><td>Return <code>bool</code></td></tr>
      <tr><td><code>=</code></td><td>Member only</td><td>Return <code>T&amp;</code> (self)</td></tr>
      <tr><td><code>[]</code></td><td>Member only</td><td>Return reference (r/w) and const reference (read)</td></tr>
      <tr><td><code>&lt;&lt;</code>, <code>&gt;&gt;</code></td><td>Non-member friend</td><td>Return <code>std::ostream&amp;</code></td></tr>
      <tr><td><code>++</code> prefix</td><td>Member: <code>T&amp; operator++()</code></td><td>Increment then return self</td></tr>
      <tr><td><code>++</code> postfix</td><td>Member: <code>T operator++(int)</code></td><td>Copy, increment, return old copy</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Complete Vector2D Example with Full Operator Suite</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Operator Overloading (Vector2D)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;cmath&gt;
#include &lt;stdexcept&gt;

class Vector2D {
    double x_, y_;
public:
    Vector2D(double x = 0, double y = 0) : x_{x}, y_{y} {}

    // Arithmetic operators (member)
    Vector2D operator+(const Vector2D&amp; other) const {
        return {x_ + other.x_, y_ + other.y_};
    }
    Vector2D operator-(const Vector2D&amp; other) const {
        return {x_ - other.x_, y_ - other.y_};
    }
    Vector2D operator*(double scalar) const {
        return {x_ * scalar, y_ * scalar};
    }

    // Compound assignment
    Vector2D&amp; operator+=(const Vector2D&amp; other) {
        x_ += other.x_; y_ += other.y_;
        return *this;
    }

    // Comparison
    bool operator==(const Vector2D&amp; other) const {
        return x_ == other.x_ &amp;&amp; y_ == other.y_;
    }
    bool operator!=(const Vector2D&amp; other) const {
        return !(*this == other);
    }

    // Prefix increment
    Vector2D&amp; operator++() {
        ++x_; ++y_;
        return *this;
    }

    // Postfix increment (dummy int parameter)
    Vector2D operator++(int) {
        Vector2D old = *this;
        ++(*this);
        return old;
    }

    // Index operator
    double&amp; operator[](int idx) {
        if (idx == 0) return x_;
        if (idx == 1) return y_;
        throw std::out_of_range("Vector2D: index must be 0 or 1");
    }
    const double&amp; operator[](int idx) const {
        if (idx == 0) return x_;
        if (idx == 1) return y_;
        throw std::out_of_range("Vector2D: index must be 0 or 1");
    }

    double magnitude() const { return std::sqrt(x_*x_ + y_*y_); }

    // Friend: Stream insertion (non-member accessing private data)
    friend std::ostream&amp; operator&lt;&lt;(std::ostream&amp; os, const Vector2D&amp; v) {
        return os &lt;&lt; "(" &lt;&lt; v.x_ &lt;&lt; ", " &lt;&lt; v.y_ &lt;&lt; ")";
    }

    // Friend: scalar * vector (reversed operand order)
    friend Vector2D operator*(double scalar, const Vector2D&amp; v) {
        return v * scalar;
    }
};

int main() {
    Vector2D a{3.0, 4.0}, b{1.0, 2.0};

    std::cout &lt;&lt; "a        = " &lt;&lt; a &lt;&lt; "\n";
    std::cout &lt;&lt; "b        = " &lt;&lt; b &lt;&lt; "\n";
    std::cout &lt;&lt; "a + b    = " &lt;&lt; (a + b) &lt;&lt; "\n";
    std::cout &lt;&lt; "a - b    = " &lt;&lt; (a - b) &lt;&lt; "\n";
    std::cout &lt;&lt; "a * 2    = " &lt;&lt; (a * 2.0) &lt;&lt; "\n";
    std::cout &lt;&lt; "3 * a    = " &lt;&lt; (3.0 * a) &lt;&lt; "\n";
    std::cout &lt;&lt; "|a|      = " &lt;&lt; a.magnitude() &lt;&lt; "\n";
    std::cout &lt;&lt; "a == b   = " &lt;&lt; std::boolalpha &lt;&lt; (a == b) &lt;&lt; "\n";
    std::cout &lt;&lt; "a[0]     = " &lt;&lt; a[0] &lt;&lt; "\n";

    Vector2D c = a;
    std::cout &lt;&lt; "c++ (post) = " &lt;&lt; c++ &lt;&lt; "  then c = " &lt;&lt; c &lt;&lt; "\n";
    std::cout &lt;&lt; "++c (pre)  = " &lt;&lt; ++c &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Friend Functions &amp; Rules / Limitations</div>
<div class="section-body">
  <div class="concept-box">
    <h4>When to use friend non-member operators:</h4>
    <p>• Use <code>friend</code> for symmetric operators (<code>+</code>, <code>==</code>) so both sides get equal treatment.</p>
    <p>• Use <code>friend</code> for <code>operator&lt;&lt;</code> and <code>operator&gt;&gt;</code> since <code>ostream</code> is on the left side.</p>
  </div>
  <div class="concept-box">
    <h4>Operators that CANNOT be overloaded:</h4>
    <p><code>::</code> (scope resolution) &nbsp; <code>.</code> (member access) &nbsp; <code>.*</code> (pointer-to-member) &nbsp; <code>?:</code> (ternary) &nbsp; <code>sizeof</code> &nbsp; <code>alignof</code></p>
  </div>
  <div class="concept-box">
    <h4>C++20 — Spaceship operator <code>&lt;=&gt;</code>:</h4>
    <p>Defining <code>auto operator&lt;=&gt;(const T&amp;) const = default;</code> automatically generates all 6 comparison operators (<code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>, <code>==</code>, <code>!=</code>).</p>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Should operator+ be a member or non-member?</h4><p>Prefer non-member (or friend) for symmetric binary operators like <code>+</code>. This allows implicit conversions on both operands.</p></div>
    <div class="faq-item"><h4>Q2: What is the return type of operator=?</h4><p>Always return <code>T&amp;</code> (reference to *this). This enables chaining: <code>a = b = c;</code>.</p></div>
    <div class="faq-item"><h4>Q3: Difference between prefix and postfix ++?</h4><p>Prefix <code>operator++()</code> has no parameters and returns reference to modified object. Postfix <code>operator++(int)</code> has a dummy <code>int</code> parameter, saves a copy, increments, returns old copy.</p></div>
    <div class="faq-item"><h4>Q4: Can I overload operator&& or operator||?</h4><p>Technically yes, but avoid it! Overloaded <code>&amp;&amp;</code> and <code>||</code> lose their short-circuit evaluation property — both operands are always evaluated.</p></div>
    <div class="faq-item"><h4>Q5: What is the conversion operator?</h4><p><code>operator bool() const</code> defines implicit conversion to bool, used for <code>if (myObj)</code> checks. Mark it <code>explicit</code> to prevent accidental implicit conversions.</p></div>
  </div>
</div>`;

makeCppLesson(12,
  '12-cpp-operator-overloading-friend-functions-and-stream-operators.html',
  'C++ Operator Overloading, Friend Functions & Stream Operators Masterclass',
  'Exhaustive C++ guide on Operator Overloading (Phase 12): arithmetic, comparison, assignment, stream insertion/extraction, friend functions, prefix/postfix, index operator, and C++20 spaceship operator.',
  'Phase 12', 'Operator Overloading',
  'Overloading +, -, *, == · Assignment & Compound Assignment · operator<< stream · Friend Functions · Prefix & Postfix ++ · operator[] · C++20 Spaceship <=>',
  l12,
  '11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html', '11. Inheritance, Virtual Functions & Runtime Polymorphism',
  '13-cpp-templates-function-class-specialization-and-concepts.html', '13. Templates, Specialization, Variadic & Concepts');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 13: Templates & Generic Programming
// ═══════════════════════════════════════════════════════════════════════════════
const l13 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 13: Templates &amp; Generic Programming</strong>! C++ templates let you write type-independent algorithms and data structures. The compiler generates type-specific specializations at compile time — zero runtime overhead. Templates power the entire STL (vector, map, sort, etc.).</p>
</div>

<div class="section-title"><span class="num">1</span>Function Templates</div>
<div class="section-body">
  <p class="text-prose">A <strong>function template</strong> defines a pattern. The compiler deduces the type argument from the call site, or you can specify it explicitly: <code>maximum&lt;int&gt;(3, 5)</code>.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Function Templates</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

// Single type parameter
template &lt;typename T&gt;
T maximum(T first, T second) {
    return first &gt; second ? first : second;
}

// Multiple type parameters
template &lt;typename T, typename U&gt;
auto add(T a, U b) -&gt; decltype(a + b) {
    return a + b;
}

// Non-type template parameter
template &lt;int N&gt;
constexpr int square() { return N * N; }

int main() {
    std::cout &lt;&lt; maximum(10, 20) &lt;&lt; "\n";          // T = int
    std::cout &lt;&lt; maximum(4.5, 2.3) &lt;&lt; "\n";        // T = double
    std::cout &lt;&lt; maximum&lt;std::string&gt;("apple", "mango") &lt;&lt; "\n"; // explicit T
    std::cout &lt;&lt; add(3, 4.7) &lt;&lt; "\n";              // T=int, U=double → double
    std::cout &lt;&lt; square&lt;7&gt;() &lt;&lt; "\n";              // compile-time: 49
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Class Templates</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Class Template (Generic Stack)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;stdexcept&gt;

template &lt;typename T&gt;
class Stack {
    std::vector&lt;T&gt; data_;
public:
    void push(const T&amp; item) { data_.push_back(item); }
    void pop() {
        if (data_.empty()) throw std::underflow_error("Stack underflow!");
        data_.pop_back();
    }
    const T&amp; top() const {
        if (data_.empty()) throw std::underflow_error("Stack is empty!");
        return data_.back();
    }
    bool empty() const { return data_.empty(); }
    std::size_t size() const { return data_.size(); }
};

// Template specialization for bool (memory-efficient bitset version)
template &lt;&gt;
class Stack&lt;bool&gt; {
    std::vector&lt;uint8_t&gt; data_;
public:
    void push(bool val) { data_.push_back(val ? 1 : 0); }
    bool top() const { return data_.back() != 0; }
    void pop() { data_.pop_back(); }
    bool empty() const { return data_.empty(); }
};

int main() {
    Stack&lt;int&gt; intStack;
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);
    std::cout &lt;&lt; "Top: " &lt;&lt; intStack.top() &lt;&lt; "\n";
    intStack.pop();
    std::cout &lt;&lt; "After pop top: " &lt;&lt; intStack.top() &lt;&lt; "\n";

    Stack&lt;std::string&gt; strStack;
    strStack.push("Hello");
    strStack.push("C++");
    std::cout &lt;&lt; "String top: " &lt;&lt; strStack.top() &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Variadic Templates &amp; Fold Expressions</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Variadic Templates &amp; Fold Expressions</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;

// Variadic template: accepts any number of args of any types
template &lt;typename... Args&gt;
void printAll(Args... args) {
    // C++17 fold expression over comma operator
    ((std::cout &lt;&lt; args &lt;&lt; " "), ...);
    std::cout &lt;&lt; "\n";
}

// Fold to sum
template &lt;typename... Ts&gt;
auto sumAll(Ts... values) {
    return (values + ...);  // binary fold with +
}

int main() {
    printAll(1, 2.5, "hello", 'A');    // 1 2.5 hello A
    std::cout &lt;&lt; sumAll(1, 2, 3, 4, 5) &lt;&lt; "\n";  // 15
    return 0;
}</code></pre>
  </div>
  <div class="concept-box">
    <h4>C++20 Concepts — Constraining Templates:</h4>
    <p>Concepts allow placing compile-time constraints on template parameters, improving error messages and enforcing API contracts.</p>
    <pre style="background:#0f141c;padding:12px;border-radius:6px;color:#60a5fa;font-size:13px;overflow-x:auto">#include &lt;concepts&gt;
template &lt;typename T&gt;
concept Numeric = std::integral&lt;T&gt; || std::floating_point&lt;T&gt;;

template &lt;Numeric T&gt;
T safeDiv(T a, T b) { return a / b; }

// safeDiv("hello", "world"); // ← COMPILE ERROR — string is not Numeric!</pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why are template definitions in header files?</h4><p>Templates are compiled per translation unit. The compiler needs the full template definition (not just declaration) at instantiation point — so they must be in headers.</p></div>
    <div class="faq-item"><h4>Q2: What is explicit template instantiation?</h4><p>You can force the compiler to instantiate a template for a specific type: <code>template class Stack&lt;int&gt;;</code> in a .cpp file, reducing compile time.</p></div>
    <div class="faq-item"><h4>Q3: What is SFINAE?</h4><p>Substitution Failure Is Not An Error. When template substitution fails, the compiler silently discards that overload candidate rather than emitting an error. Used with <code>std::enable_if</code>.</p></div>
    <div class="faq-item"><h4>Q4: What is the difference between typename and class in template parameters?</h4><p>They are interchangeable for type parameters. <code>class</code> is historical, <code>typename</code> is preferred in modern C++ for clarity, and is required when disambiguating dependent names.</p></div>
    <div class="faq-item"><h4>Q5: What are template template parameters?</h4><p>A template can accept another template as its parameter: <code>template&lt;template&lt;typename&gt; class Container&gt; class Adapter { ... };</code></p></div>
  </div>
</div>`;

makeCppLesson(13,
  '13-cpp-templates-function-class-specialization-and-concepts.html',
  'C++ Templates, Function & Class Templates, Specialization, Variadic & Concepts Masterclass',
  'Exhaustive C++ guide on Templates (Phase 13): function templates, class templates, non-type parameters, template specialization, variadic templates, fold expressions, and C++20 concepts.',
  'Phase 13', 'Templates & Generic Programming',
  'Function Templates · Class Templates · Non-Type Parameters · Template Specialization · Variadic Templates · Fold Expressions · C++20 Concepts · Generic Programming',
  l13,
  '12-cpp-operator-overloading-friend-functions-and-stream-operators.html', '12. Operator Overloading, Friend Functions & Streams',
  '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html', '14. STL: vector, map, set, unordered & Container Adaptors');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 14: STL Containers
// ═══════════════════════════════════════════════════════════════════════════════
const l14 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 14: STL Containers</strong>! The C++ Standard Template Library provides production-grade, generic, battle-tested data structures. Each container makes different trade-offs between time complexity, memory layout, and ordering guarantees. Choosing the right container is a key skill.</p>
</div>

<div class="section-title"><span class="num">1</span>Container Comparison Master Table</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Container</th><th>Ordered?</th><th>Access</th><th>Insert/Erase (avg)</th><th>Memory</th></tr></thead>
    <tbody>
      <tr><td><code>std::vector&lt;T&gt;</code></td><td>No (insertion)</td><td>O(1) random</td><td>O(1) back / O(n) middle</td><td>Contiguous heap</td></tr>
      <tr><td><code>std::deque&lt;T&gt;</code></td><td>No</td><td>O(1) random</td><td>O(1) front &amp; back</td><td>Chunked</td></tr>
      <tr><td><code>std::list&lt;T&gt;</code></td><td>No</td><td>O(n)</td><td>O(1) any position</td><td>Node-based</td></tr>
      <tr><td><code>std::set&lt;T&gt;</code></td><td>Sorted</td><td>O(log n)</td><td>O(log n)</td><td>Red-Black tree</td></tr>
      <tr><td><code>std::map&lt;K,V&gt;</code></td><td>Sorted by key</td><td>O(log n)</td><td>O(log n)</td><td>Red-Black tree</td></tr>
      <tr><td><code>std::unordered_set&lt;T&gt;</code></td><td>No</td><td>O(1) avg</td><td>O(1) avg</td><td>Hash table</td></tr>
      <tr><td><code>std::unordered_map&lt;K,V&gt;</code></td><td>No</td><td>O(1) avg</td><td>O(1) avg</td><td>Hash table</td></tr>
      <tr><td><code>std::stack&lt;T&gt;</code></td><td>LIFO</td><td>top only</td><td>O(1)</td><td>Adaptor over deque</td></tr>
      <tr><td><code>std::queue&lt;T&gt;</code></td><td>FIFO</td><td>front only</td><td>O(1)</td><td>Adaptor over deque</td></tr>
      <tr><td><code>std::priority_queue&lt;T&gt;</code></td><td>Max heap</td><td>top = max</td><td>O(log n)</td><td>Heap over vector</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Sequence Containers in Depth</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — vector, deque, list</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;deque&gt;
#include &lt;list&gt;
#include &lt;algorithm&gt;

int main() {
    // ─── std::vector ─────────────────────────────────────
    std::vector&lt;int&gt; vec{10, 20, 30};
    vec.reserve(10);                  // pre-allocate capacity
    vec.push_back(40);
    vec.emplace_back(50);            // construct in-place
    vec.erase(vec.begin() + 1);      // remove element at index 1
    std::cout &lt;&lt; "vector: ";
    for (int v : vec) std::cout &lt;&lt; v &lt;&lt; " ";
    std::cout &lt;&lt; "| size=" &lt;&lt; vec.size() &lt;&lt; " cap=" &lt;&lt; vec.capacity() &lt;&lt; "\n";

    // ─── std::deque ─────────────────────────────────────
    std::deque&lt;int&gt; dq{20, 30};
    dq.push_front(10);               // O(1) front insert
    dq.push_back(40);                // O(1) back insert
    std::cout &lt;&lt; "deque: ";
    for (int d : dq) std::cout &lt;&lt; d &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── std::list (doubly-linked) ───────────────────────
    std::list&lt;int&gt; lst{10, 30, 20, 40};
    lst.sort();                      // O(n log n) in-place
    lst.unique();                    // remove consecutive duplicates
    std::cout &lt;&lt; "list sorted: ";
    for (int l : lst) std::cout &lt;&lt; l &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Associative &amp; Unordered Containers</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — map, set, unordered_map</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;set&gt;
#include &lt;unordered_map&gt;
#include &lt;string&gt;

int main() {
    // ─── std::map (sorted by key, unique keys) ───────────
    std::map&lt;std::string, int&gt; scores;
    scores["Alice"] = 95;
    scores["Bob"]   = 87;
    scores.emplace("Charlie", 92);
    scores["Bob"] = 90;           // update

    std::cout &lt;&lt; "Sorted scores:\n";
    for (const auto&amp; [name, score] : scores) {  // structured binding C++17
        std::cout &lt;&lt; "  " &lt;&lt; name &lt;&lt; ": " &lt;&lt; score &lt;&lt; "\n";
    }
    auto it = scores.find("Alice");
    if (it != scores.end()) std::cout &lt;&lt; "Found Alice: " &lt;&lt; it-&gt;second &lt;&lt; "\n";

    // ─── std::set (sorted, unique elements) ─────────────
    std::set&lt;int&gt; primes{2, 3, 5, 7, 11};
    primes.insert(13);
    primes.insert(3);  // duplicate ignored
    std::cout &lt;&lt; "Primes: ";
    for (int p : primes) std::cout &lt;&lt; p &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── std::unordered_map (O(1) average) ──────────────
    std::unordered_map&lt;std::string, int&gt; wordCount;
    for (const std::string&amp; word : {"the", "cat", "sat", "the", "cat", "the"})
        wordCount[word]++;
    std::cout &lt;&lt; "Word counts:\n";
    for (const auto&amp; [w, c] : wordCount)
        std::cout &lt;&lt; "  " &lt;&lt; w &lt;&lt; ": " &lt;&lt; c &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Utility Types: pair, tuple, optional, variant</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — pair, tuple, optional, variant</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;tuple&gt;
#include &lt;optional&gt;
#include &lt;variant&gt;
#include &lt;string&gt;

// optional: a value that might not exist
std::optional&lt;int&gt; findIndex(const std::vector&lt;int&gt;&amp; v, int target) {
    for (int i = 0; i &lt; (int)v.size(); ++i)
        if (v[i] == target) return i;
    return std::nullopt;  // explicitly "no value"
}

int main() {
    // pair
    auto p = std::make_pair(42, std::string("hello"));
    std::cout &lt;&lt; p.first &lt;&lt; ", " &lt;&lt; p.second &lt;&lt; "\n";

    // tuple
    auto t = std::make_tuple(1, 3.14, std::string("C++20"));
    std::cout &lt;&lt; std::get&lt;0&gt;(t) &lt;&lt; " " &lt;&lt; std::get&lt;1&gt;(t) &lt;&lt; " " &lt;&lt; std::get&lt;2&gt;(t) &lt;&lt; "\n";

    // optional
    std::vector&lt;int&gt; nums{10, 20, 30, 40};
    if (auto idx = findIndex(nums, 30))
        std::cout &lt;&lt; "Found at index: " &lt;&lt; *idx &lt;&lt; "\n";
    else
        std::cout &lt;&lt; "Not found\n";

    // variant: type-safe union
    std::variant&lt;int, double, std::string&gt; v;
    v = 42;
    std::cout &lt;&lt; "variant int: " &lt;&lt; std::get&lt;int&gt;(v) &lt;&lt; "\n";
    v = std::string("hello variant");
    std::cout &lt;&lt; "variant str: " &lt;&lt; std::get&lt;std::string&gt;(v) &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: When to use vector vs list?</h4><p>Use <code>vector</code> by default — cache-friendly contiguous memory wins in practice. Use <code>list</code> only when you need O(1) insert/erase at arbitrary positions with stable iterators.</p></div>
    <div class="faq-item"><h4>Q2: What is emplace_back vs push_back?</h4><p><code>emplace_back(args...)</code> constructs the element in-place — avoids a copy/move. <code>push_back(obj)</code> copies or moves an already-constructed object. Prefer <code>emplace_back</code>.</p></div>
    <div class="faq-item"><h4>Q3: When does unordered_map degrade to O(n)?</h4><p>In worst-case hash collisions, all keys land in the same bucket — O(n) lookup. Prevent this with a good hash function or by using <code>reserve()</code> to avoid rehashing.</p></div>
    <div class="faq-item"><h4>Q4: What is std::optional used for?</h4><p>Return <code>std::optional&lt;T&gt;</code> from functions that may fail to produce a value — instead of using sentinel values (-1, nullptr, or throwing exceptions for ordinary "not found" cases).</p></div>
    <div class="faq-item"><h4>Q5: Difference between std::set and std::unordered_set?</h4><p><code>std::set</code> keeps elements sorted (O(log n) ops) using a Red-Black tree. <code>std::unordered_set</code> uses hashing for O(1) average ops but has no ordering guarantee.</p></div>
  </div>
</div>`;

makeCppLesson(14,
  '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html',
  'C++ STL Containers: vector, map, set, unordered_map & Adaptors Masterclass',
  'Exhaustive C++ guide on STL Containers (Phase 14): sequence containers (vector, deque, list), associative (map, set), unordered (hash-based), adaptors (stack, queue, priority_queue), and utility types (optional, variant).',
  'Phase 14', 'STL Containers',
  'vector & deque · list & forward_list · map & set · unordered_map & set · stack/queue/priority_queue · pair & tuple · optional & variant · Container Complexity',
  l14,
  '13-cpp-templates-function-class-specialization-and-concepts.html', '13. Templates, Specialization, Variadic & Concepts',
  '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html', '15. Iterators, sort, find, transform & STL Algorithms');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 15: Iterators & Algorithms
// ═══════════════════════════════════════════════════════════════════════════════
const l15 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 15: Iterators &amp; Algorithms</strong>! Iterators are the glue between containers and algorithms. The STL algorithm library provides over 100 generic algorithms (sort, find, transform, accumulate…) that work on any container via iterators — enabling powerful, reusable, and highly optimized code.</p>
</div>

<div class="section-title"><span class="num">1</span>Iterator Categories</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Category</th><th>Supports</th><th>Example Container</th></tr></thead>
    <tbody>
      <tr><td>Input Iterator</td><td>Read once, forward only</td><td><code>std::istream_iterator</code></td></tr>
      <tr><td>Output Iterator</td><td>Write once, forward only</td><td><code>std::ostream_iterator</code></td></tr>
      <tr><td>Forward Iterator</td><td>Read/Write, forward only</td><td><code>std::forward_list</code></td></tr>
      <tr><td>Bidirectional</td><td>Read/Write, forward &amp; backward</td><td><code>std::list</code>, <code>std::set</code></td></tr>
      <tr><td>Random Access</td><td>Full arithmetic (+, -, [])</td><td><code>std::vector</code>, <code>std::array</code></td></tr>
      <tr><td>Contiguous (C++20)</td><td>Random access + contiguous memory</td><td><code>std::vector</code>, <code>std::string</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Essential STL Algorithms</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — sort, find, count, transform, accumulate</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;numeric&gt;
#include &lt;string&gt;

int main() {
    std::vector&lt;int&gt; nums{5, 2, 8, 1, 9, 3, 7, 4, 6};

    // sort ascending
    std::sort(nums.begin(), nums.end());
    std::cout &lt;&lt; "sorted: ";
    for (int n : nums) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // sort descending with custom comparator
    std::sort(nums.begin(), nums.end(), std::greater&lt;int&gt;{});
    std::cout &lt;&lt; "descend: ";
    for (int n : nums) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // find
    auto it = std::find(nums.begin(), nums.end(), 7);
    if (it != nums.end())
        std::cout &lt;&lt; "found 7 at index: " &lt;&lt; std::distance(nums.begin(), it) &lt;&lt; "\n";

    // count_if
    int evenCount = std::count_if(nums.begin(), nums.end(),
                                  [](int n){ return n % 2 == 0; });
    std::cout &lt;&lt; "even count: " &lt;&lt; evenCount &lt;&lt; "\n";

    // transform: square each element into new vector
    std::vector&lt;int&gt; squares(nums.size());
    std::transform(nums.begin(), nums.end(), squares.begin(),
                   [](int n){ return n * n; });
    std::cout &lt;&lt; "squares: ";
    for (int s : squares) std::cout &lt;&lt; s &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // accumulate: sum all
    int total = std::accumulate(nums.begin(), nums.end(), 0);
    std::cout &lt;&lt; "sum: " &lt;&lt; total &lt;&lt; "\n";

    // min/max element
    auto [mn, mx] = std::minmax_element(nums.begin(), nums.end());
    std::cout &lt;&lt; "min=" &lt;&lt; *mn &lt;&lt; " max=" &lt;&lt; *mx &lt;&lt; "\n";

    // remove_if + erase idiom
    nums.erase(std::remove_if(nums.begin(), nums.end(),
                               [](int n){ return n % 2 == 0; }),
               nums.end());
    std::cout &lt;&lt; "after removing evens: ";
    for (int n : nums) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // binary search (on sorted range)
    std::vector&lt;int&gt; sorted{1,2,3,4,5,6,7,8,9};
    bool found = std::binary_search(sorted.begin(), sorted.end(), 5);
    std::cout &lt;&lt; "binary_search(5): " &lt;&lt; std::boolalpha &lt;&lt; found &lt;&lt; "\n";

    auto lb = std::lower_bound(sorted.begin(), sorted.end(), 5);
    std::cout &lt;&lt; "lower_bound(5) index: " &lt;&lt; std::distance(sorted.begin(), lb) &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>reverse, copy, fill, for_each</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — reverse, copy, fill, for_each</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;iterator&gt;

int main() {
    std::vector&lt;int&gt; v{1,2,3,4,5};

    // reverse in-place
    std::reverse(v.begin(), v.end());
    std::cout &lt;&lt; "reversed: ";
    for (int x : v) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // copy to another container
    std::vector&lt;int&gt; dest(v.size());
    std::copy(v.begin(), v.end(), dest.begin());

    // fill with a value
    std::vector&lt;int&gt; zeros(5);
    std::fill(zeros.begin(), zeros.end(), 0);

    // for_each with side effects
    std::for_each(v.begin(), v.end(), [](int&amp; x){ x *= 2; });
    std::cout &lt;&lt; "doubled: ";
    for (int x : v) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // copy to ostream
    std::cout &lt;&lt; "ostream copy: ";
    std::copy(v.begin(), v.end(), std::ostream_iterator&lt;int&gt;(std::cout, " "));
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the erase-remove idiom?</h4><p><code>std::remove_if</code> moves matching elements to the end and returns an iterator to the new logical end. Then <code>erase()</code> actually removes them. They must be combined because algorithms don't change container size.</p></div>
    <div class="faq-item"><h4>Q2: Difference between sort and stable_sort?</h4><p><code>std::sort</code> is O(n log n) but doesn't preserve relative order of equal elements. <code>std::stable_sort</code> preserves relative order of equal elements (slightly more memory and time).</p></div>
    <div class="faq-item"><h4>Q3: What does std::distance do?</h4><p><code>std::distance(first, last)</code> returns the number of hops between two iterators. For random-access iterators it's O(1), for others O(n).</p></div>
    <div class="faq-item"><h4>Q4: What is std::back_inserter?</h4><p><code>std::back_inserter(container)</code> returns an output iterator that calls <code>push_back()</code> on each assignment — used with <code>std::copy</code> to append to a container.</p></div>
    <div class="faq-item"><h4>Q5: What is std::partition?</h4><p><code>std::partition(begin, end, pred)</code> reorders elements so those satisfying pred come first. Returns iterator to the first element NOT satisfying pred.</p></div>
  </div>
</div>`;

makeCppLesson(15,
  '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html',
  'C++ Iterators, STL Algorithms: sort, find, transform, accumulate Masterclass',
  'Exhaustive C++ guide on Iterators & Algorithms (Phase 15): iterator categories, sort/find/count_if/transform/accumulate/reverse/binary_search, erase-remove idiom, custom comparators, and algorithm complexity.',
  'Phase 15', 'Iterators & Algorithms',
  'Iterator Categories · begin/end/cbegin · sort & stable_sort · find & binary_search · count_if · transform · accumulate · remove_if + erase · lower_bound · for_each',
  l15,
  '14-cpp-stl-containers-vector-map-set-unordered-and-adaptors.html', '14. STL: vector, map, set, unordered & Container Adaptors',
  '16-cpp-lambda-expressions-captures-std-function-and-closures.html', '16. Lambdas, Captures, std::function & Closures');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 16: Lambda Expressions
// ═══════════════════════════════════════════════════════════════════════════════
const l16 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 16: Lambda Expressions</strong>! Introduced in C++11, lambdas are anonymous inline function objects. They are the modern replacement for hand-written functors, enabling concise callbacks, predicates, and closures that capture surrounding variables.</p>
</div>

<div class="section-title"><span class="num">1</span>Lambda Syntax Anatomy</div>
<div class="section-body">
  <div class="memory-diagram">Lambda Anatomy:

  [capture list] (parameters) mutable -&gt; return_type { body }

  [=]     — capture all by VALUE
  [&amp;]     — capture all by REFERENCE
  [x]     — capture x by value
  [&amp;x]    — capture x by reference
  [=, &amp;y] — all by value, y by reference
  []      — capture nothing</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Lambda Syntax Variants</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;functional&gt;

int main() {
    // Basic lambda
    auto greet = [](const std::string&amp; name) {
        std::cout &lt;&lt; "Hello, " &lt;&lt; name &lt;&lt; "!\n";
    };
    greet("World");

    // Lambda with return type
    auto add = [](double a, double b) -&gt; double { return a + b; };
    std::cout &lt;&lt; "add: " &lt;&lt; add(3.5, 4.2) &lt;&lt; "\n";

    // Capture by value
    int threshold = 10;
    auto isAbove = [threshold](int x) { return x &gt; threshold; };
    std::cout &lt;&lt; "15 above threshold: " &lt;&lt; std::boolalpha &lt;&lt; isAbove(15) &lt;&lt; "\n";

    // Capture by reference (can modify outer variable)
    int counter = 0;
    auto increment = [&amp;counter]() { ++counter; };
    increment(); increment(); increment();
    std::cout &lt;&lt; "counter: " &lt;&lt; counter &lt;&lt; "\n";

    // Mutable lambda (can modify captured-by-value copy)
    int x = 5;
    auto mutLambda = [x]() mutable {
        x += 10;  // modifies the COPY, not original x
        std::cout &lt;&lt; "inside mutable: " &lt;&lt; x &lt;&lt; "\n";
    };
    mutLambda();
    std::cout &lt;&lt; "original x: " &lt;&lt; x &lt;&lt; "\n";

    // Generic lambda (C++14) — auto parameters
    auto printType = [](auto val) {
        std::cout &lt;&lt; "value: " &lt;&lt; val &lt;&lt; "\n";
    };
    printType(42);
    printType(3.14);
    printType(std::string("generic!"));

    // Immediately Invoked Lambda Expression (IIFE)
    int result = [](int a, int b){ return a * b; }(6, 7);
    std::cout &lt;&lt; "IIFE result: " &lt;&lt; result &lt;&lt; "\n";

    // Lambda with algorithms
    std::vector&lt;int&gt; nums{10, 15, 20, 25, 30};
    std::for_each(nums.begin(), nums.end(), [](int n){
        if (n % 2 == 0) std::cout &lt;&lt; n &lt;&lt; " ";
    });
    std::cout &lt;&lt; "\n";

    // sort with custom comparator lambda
    std::vector&lt;std::string&gt; words{"banana", "apple", "cherry", "date"};
    std::sort(words.begin(), words.end(), [](const std::string&amp; a, const std::string&amp; b){
        return a.length() &lt; b.length();  // sort by string length
    });
    for (const auto&amp; w : words) std::cout &lt;&lt; w &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>std::function &amp; Function Objects</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::function, callbacks, function objects</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;functional&gt;
#include &lt;vector&gt;

// Accept any callable matching (int)-&gt;bool signature
void filterAndPrint(const std::vector&lt;int&gt;&amp; v, std::function&lt;bool(int)&gt; pred) {
    for (int x : v) {
        if (pred(x)) std::cout &lt;&lt; x &lt;&lt; " ";
    }
    std::cout &lt;&lt; "\n";
}

// Functor (class with operator())
struct Multiplier {
    int factor;
    explicit Multiplier(int f) : factor{f} {}
    int operator()(int x) const { return x * factor; }
};

int main() {
    std::vector&lt;int&gt; nums{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Pass lambda to std::function parameter
    filterAndPrint(nums, [](int x){ return x % 3 == 0; });  // multiples of 3

    // Store lambda in std::function variable
    std::function&lt;int(int, int)&gt; op;
    op = [](int a, int b) { return a + b; };
    std::cout &lt;&lt; "op(3,4): " &lt;&lt; op(3, 4) &lt;&lt; "\n";
    op = [](int a, int b) { return a * b; };
    std::cout &lt;&lt; "op(3,4): " &lt;&lt; op(3, 4) &lt;&lt; "\n";

    // Functor usage
    Multiplier times3{3};
    std::cout &lt;&lt; "times3(7): " &lt;&lt; times3(7) &lt;&lt; "\n";

    // std::bind (older, lambdas preferred)
    auto addFive = std::bind(std::plus&lt;int&gt;{}, std::placeholders::_1, 5);
    std::cout &lt;&lt; "addFive(10): " &lt;&lt; addFive(10) &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the type of a lambda?</h4><p>Each lambda has a unique, compiler-generated anonymous type (closure type). You cannot name it — use <code>auto</code> to hold it, or <code>std::function</code> to store it in a type-erased container.</p></div>
    <div class="faq-item"><h4>Q2: Capture by value vs reference — when to use which?</h4><p>Capture by value (<code>[=]</code>) for short-lived lambdas or when the lambda outlives the local variables. Capture by reference (<code>[&amp;]</code>) when you need to modify outer variables or avoid copying large objects.</p></div>
    <div class="faq-item"><h4>Q3: What is a dangling reference in a lambda?</h4><p>If a lambda captures a local variable by reference, and the lambda outlives that variable (e.g., returned from function), dereferencing the captured reference is Undefined Behaviour.</p></div>
    <div class="faq-item"><h4>Q4: Performance of std::function vs auto lambda?</h4><p><code>std::function</code> has type-erasure overhead (heap allocation + virtual dispatch). Storing a lambda in <code>auto</code> gives zero-overhead inlining. Prefer <code>auto</code> when the type doesn't need to be stored polymorphically.</p></div>
    <div class="faq-item"><h4>Q5: What is a recursive lambda?</h4><p>Lambdas cannot refer to themselves by name directly. Use <code>std::function</code> or (C++23) deducing <code>this</code> parameter: <code>auto fib = [&amp;fib](int n) -&gt; int { ... };</code></p></div>
  </div>
</div>`;

makeCppLesson(16,
  '16-cpp-lambda-expressions-captures-std-function-and-closures.html',
  'C++ Lambda Expressions, Captures, std::function & Closures Masterclass',
  'Exhaustive C++ guide on Lambdas (Phase 16): lambda syntax, capture by value/reference, mutable lambdas, generic lambdas (C++14), IIFE, std::function, functors, std::bind, and performance notes.',
  'Phase 16', 'Lambda Expressions',
  'Lambda Syntax & Anatomy · Capture by Value & Reference · Mutable Lambdas · Generic Lambdas · IIFE · Lambda with Algorithms · std::function · Functors vs Lambdas',
  l16,
  '15-cpp-iterators-algorithms-sort-find-transform-and-stl.html', '15. Iterators, sort, find, transform & STL Algorithms',
  '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html', '17. unique_ptr, shared_ptr, weak_ptr & RAII Memory');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 17: Smart Pointers & Memory
// ═══════════════════════════════════════════════════════════════════════════════
const l17 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 17: Smart Pointers &amp; Memory Management</strong>! Modern C++ eliminates manual <code>new/delete</code> through RAII-based smart pointers. <code>std::unique_ptr</code> for exclusive ownership, <code>std::shared_ptr</code> for shared ownership, and <code>std::weak_ptr</code> for non-owning observation — together they make memory-safe C++ achievable without a garbage collector.</p>
</div>

<div class="section-title"><span class="num">1</span>Stack vs Heap &amp; Why Raw Ownership is Risky</div>
<div class="section-body">
  <div class="memory-diagram">Stack vs Heap:

  STACK (automatic storage)          HEAP (dynamic storage)
  ┌─────────────────────┐            ┌─────────────────────────┐
  │  int x = 5;         │            │  int* p = new int(5);   │
  │  Destroyed when     │            │  Must explicitly delete  │
  │  scope ends ✅      │            │  p; — EASY TO FORGET ❌  │
  └─────────────────────┘            └─────────────────────────┘

  Raw pointer problems:
  ✗ Memory leaks  (forget to delete)
  ✗ Double delete (delete twice → crash)
  ✗ Dangling ptr  (use after delete → UB)
  ✗ Exception safety (delete skipped on throw)</div>
</div>

<div class="section-title"><span class="num">2</span>std::unique_ptr — Exclusive Ownership</div>
<div class="section-body">
  <div class="concept-box">
    <h4>unique_ptr rules:</h4>
    <p>• Exactly one owner at all times — cannot be copied, only <strong>moved</strong>.</p>
    <p>• Automatically deletes the resource when it goes out of scope.</p>
    <p>• Always create with <code>std::make_unique&lt;T&gt;(args...)</code> (exception-safe).</p>
    <p>• Zero overhead — same size as a raw pointer.</p>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — unique_ptr</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;

class Student {
    std::string name_;
public:
    explicit Student(std::string name) : name_{std::move(name)} {
        std::cout &lt;&lt; "Student '" &lt;&lt; name_ &lt;&lt; "' created\n";
    }
    ~Student() { std::cout &lt;&lt; "Student '" &lt;&lt; name_ &lt;&lt; "' destroyed\n"; }
    void display() const { std::cout &lt;&lt; "Student: " &lt;&lt; name_ &lt;&lt; "\n"; }
};

// Function taking ownership (move semantics)
void process(std::unique_ptr&lt;Student&gt; s) {
    s-&gt;display();
}  // s destroyed here automatically

int main() {
    // Create — never use raw new!
    auto s1 = std::make_unique&lt;Student&gt;("Alice");
    s1-&gt;display();

    // Transfer ownership with std::move
    auto s2 = std::move(s1);
    // s1 is now nullptr — accessing it would crash
    if (!s1) std::cout &lt;&lt; "s1 is empty after move\n";
    s2-&gt;display();

    process(std::move(s2));  // move into function
    // s2 is now nullptr

    // unique_ptr array
    auto arr = std::make_unique&lt;int[]&gt;(5);
    for (int i = 0; i &lt; 5; ++i) arr[i] = (i + 1) * 10;
    std::cout &lt;&lt; "arr[2] = " &lt;&lt; arr[2] &lt;&lt; "\n";

    return 0;
}  // All automatically cleaned up!</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>std::shared_ptr &amp; std::weak_ptr</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — shared_ptr, weak_ptr & cyclic reference fix</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;

class Node {
public:
    int value;
    std::shared_ptr&lt;Node&gt; next;       // strong ownership
    std::weak_ptr&lt;Node&gt; prev;         // weak — breaks cycles!
    explicit Node(int v) : value{v} {}
    ~Node() { std::cout &lt;&lt; "Node " &lt;&lt; value &lt;&lt; " destroyed\n"; }
};

int main() {
    // shared_ptr — reference counted
    auto p1 = std::make_shared&lt;int&gt;(42);
    auto p2 = p1;  // both own the int
    auto p3 = p1;
    std::cout &lt;&lt; "use_count: " &lt;&lt; p1.use_count() &lt;&lt; "\n";  // 3
    p2.reset();   // release p2's ownership
    std::cout &lt;&lt; "after p2.reset use_count: " &lt;&lt; p1.use_count() &lt;&lt; "\n";  // 2

    // weak_ptr — observe without owning (doesn't increment ref count)
    std::weak_ptr&lt;int&gt; wp = p1;
    std::cout &lt;&lt; "weak expired? " &lt;&lt; std::boolalpha &lt;&lt; wp.expired() &lt;&lt; "\n";
    if (auto locked = wp.lock()) {  // safe access through lock()
        std::cout &lt;&lt; "weak locked value: " &lt;&lt; *locked &lt;&lt; "\n";
    }
    p1.reset(); p3.reset();  // all owners gone → int destroyed
    std::cout &lt;&lt; "weak expired now? " &lt;&lt; wp.expired() &lt;&lt; "\n";

    // Linked list with cycle-safe weak_ptr
    auto n1 = std::make_shared&lt;Node&gt;(1);
    auto n2 = std::make_shared&lt;Node&gt;(2);
    n1-&gt;next = n2;
    n2-&gt;prev = n1;  // weak_ptr — no cycle leak!
    std::cout &lt;&lt; "Nodes created\n";
    return 0;
}  // n1 and n2 properly destroyed</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Smart Pointer Passing Guidelines &amp; Rule of Zero</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Scenario</th><th>How to Pass</th></tr></thead>
    <tbody>
      <tr><td>Function just uses the object, doesn't store it</td><td>Pass raw pointer <code>T*</code> or <code>const T&amp;</code></td></tr>
      <tr><td>Function takes ownership</td><td>Pass <code>std::unique_ptr&lt;T&gt;</code> by value (move)</td></tr>
      <tr><td>Function shares ownership</td><td>Pass <code>std::shared_ptr&lt;T&gt;</code> by value</td></tr>
      <tr><td>Function may optionally use</td><td>Pass <code>std::weak_ptr&lt;T&gt;</code></td></tr>
    </tbody>
  </table>
  <div class="concept-box">
    <h4>Rule of Zero:</h4>
    <p>If your class uses smart pointers and STL containers to manage all resources, you don't need to write any of the 5 special members (destructor, copy/move constructor, copy/move assignment). The compiler-generated defaults work correctly — this is the <strong>Rule of Zero</strong>.</p>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why make_unique/make_shared instead of new?</h4><p>Exception safety: <code>make_unique&lt;T&gt;(args)</code> is a single operation. <code>new T(args)</code> + wrapping in unique_ptr could leak if an exception fires between the two operations in older C++ evaluation order rules.</p></div>
    <div class="faq-item"><h4>Q2: Overhead of shared_ptr vs unique_ptr?</h4><p><code>unique_ptr</code> has zero overhead — same size as a raw pointer. <code>shared_ptr</code> stores two pointers (object + control block with ref counts) and atomic ref-count increments have threading overhead.</p></div>
    <div class="faq-item"><h4>Q3: What is a cyclic reference?</h4><p>Two <code>shared_ptr</code>s pointing to each other keep each other's ref-count ≥ 1 forever — neither is ever destroyed. Break cycles by making one side a <code>weak_ptr</code>.</p></div>
    <div class="faq-item"><h4>Q4: Can I use shared_ptr in a multithreaded program?</h4><p>The ref-count operations are thread-safe. However, the pointed-to object is NOT automatically thread-safe — you still need mutexes for the data.</p></div>
    <div class="faq-item"><h4>Q5: What is a custom deleter?</h4><p><code>std::unique_ptr&lt;FILE, decltype(&amp;fclose)&gt; f(fopen("x.txt","r"), fclose);</code> — a custom deleter lets smart pointers manage non-memory resources (file handles, sockets, GPU objects).</p></div>
  </div>
</div>`;

makeCppLesson(17,
  '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html',
  'C++ Smart Pointers: unique_ptr, shared_ptr, weak_ptr & RAII Memory Masterclass',
  'Exhaustive C++ guide on Smart Pointers (Phase 17): unique_ptr exclusive ownership, shared_ptr reference counting, weak_ptr cycle breaking, make_unique/make_shared, custom deleters, Rule of Zero, and RAII design.',
  'Phase 17', 'Smart Pointers & Memory',
  'Stack vs Heap · unique_ptr & make_unique · shared_ptr & use_count · weak_ptr & lock() · Cyclic References · Custom Deleters · Smart Pointer Passing · Rule of Zero',
  l17,
  '16-cpp-lambda-expressions-captures-std-function-and-closures.html', '16. Lambdas, Captures, std::function & Closures',
  '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html', '18. try, catch, throw, Custom Exceptions & Safety');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 18: Exception Handling
// ═══════════════════════════════════════════════════════════════════════════════
const l18 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 18: Exception Handling</strong>! C++ exceptions provide a structured mechanism to separate error-detection code from error-handling code. Combined with RAII, exceptions enable robust, leak-free error propagation across call stacks — impossible with C-style error codes alone.</p>
</div>

<div class="section-title"><span class="num">1</span>try, catch, throw Fundamentals</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — try, catch, throw</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;string&gt;

double divide(double first, double second) {
    if (second == 0.0)
        throw std::invalid_argument("Division by zero is undefined!");
    return first / second;
}

int parseInt(const std::string&amp; s) {
    try {
        return std::stoi(s);
    } catch (const std::invalid_argument&amp;) {
        throw std::runtime_error("'" + s + "' is not a valid integer");
    } catch (const std::out_of_range&amp;) {
        throw std::overflow_error("'" + s + "' is out of int range");
    }
}

int main() {
    // Basic try-catch
    try {
        std::cout &lt;&lt; divide(10, 2) &lt;&lt; "\n";   // OK
        std::cout &lt;&lt; divide(10, 0) &lt;&lt; "\n";   // throws!
    } catch (const std::invalid_argument&amp; e) {
        std::cout &lt;&lt; "Invalid argument: " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // Multiple catch blocks
    try {
        std::cout &lt;&lt; parseInt("abc") &lt;&lt; "\n";
    } catch (const std::runtime_error&amp; e) {
        std::cout &lt;&lt; "Runtime error: " &lt;&lt; e.what() &lt;&lt; "\n";
    } catch (const std::exception&amp; e) {
        std::cout &lt;&lt; "Exception: " &lt;&lt; e.what() &lt;&lt; "\n";
    } catch (...) {
        std::cout &lt;&lt; "Unknown exception caught!\n";
    }
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Standard Exception Hierarchy</div>
<div class="section-body">
  <div class="memory-diagram">std::exception hierarchy:

  std::exception
  ├── std::logic_error
  │   ├── std::invalid_argument
  │   ├── std::domain_error
  │   ├── std::length_error
  │   └── std::out_of_range
  └── std::runtime_error
      ├── std::range_error
      ├── std::overflow_error
      ├── std::underflow_error
      └── std::system_error (C++11)</div>
</div>

<div class="section-title"><span class="num">3</span>Custom Exceptions &amp; Exception Safety</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Custom Exceptions</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;string&gt;

// Custom exception — inherit from std::exception
class DatabaseException : public std::runtime_error {
    int errorCode_;
public:
    DatabaseException(const std::string&amp; msg, int code)
        : std::runtime_error(msg), errorCode_{code} {}
    int errorCode() const noexcept { return errorCode_; }
};

class ConnectionRefused : public DatabaseException {
public:
    ConnectionRefused(const std::string&amp; host)
        : DatabaseException("Connection refused to: " + host, 1001) {}
};

void connectDB(const std::string&amp; host) {
    if (host.empty())
        throw std::invalid_argument("Host cannot be empty");
    if (host == "badhost")
        throw ConnectionRefused(host);
    std::cout &lt;&lt; "Connected to " &lt;&lt; host &lt;&lt; "\n";
}

int main() {
    for (const std::string&amp; host : {"localhost", "badhost", ""}) {
        try {
            connectDB(host);
        } catch (const ConnectionRefused&amp; e) {
            std::cout &lt;&lt; "Connection error [" &lt;&lt; e.errorCode() &lt;&lt; "]: " &lt;&lt; e.what() &lt;&lt; "\n";
        } catch (const DatabaseException&amp; e) {
            std::cout &lt;&lt; "DB error: " &lt;&lt; e.what() &lt;&lt; "\n";
        } catch (const std::exception&amp; e) {
            std::cout &lt;&lt; "Error: " &lt;&lt; e.what() &lt;&lt; "\n";
        }
    }
    return 0;
}</code></pre>
  </div>
  <div class="concept-box">
    <h4>Exception Safety Guarantees:</h4>
    <p>• <strong>No-throw guarantee</strong> (<code>noexcept</code>): The function never throws. Required for move constructors and swap functions.</p>
    <p>• <strong>Strong guarantee</strong>: Operation either completes fully or has no effect (transaction-like). Uses copy-and-swap idiom.</p>
    <p>• <strong>Basic guarantee</strong>: No leaks occur, objects remain in valid (but possibly changed) state.</p>
    <p>• <strong>No guarantee</strong>: Avoid writing such code!</p>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why catch by const reference?</h4><p>Catching by const reference (<code>catch (const std::exception&amp; e)</code>) avoids slicing — if a derived exception is thrown and caught by value base type, derived-specific data is lost. References preserve the dynamic type.</p></div>
    <div class="faq-item"><h4>Q2: Why shouldn't destructors throw?</h4><p>If an exception is propagating and a destructor throws another exception, <code>std::terminate()</code> is called. Always write destructors as <code>noexcept</code> (which is the default in C++11+).</p></div>
    <div class="faq-item"><h4>Q3: What does noexcept do for performance?</h4><p>Move constructors and other operations marked <code>noexcept</code> can be used by STL algorithms (like <code>vector::resize</code>) to move elements instead of copying — significant performance benefit.</p></div>
    <div class="faq-item"><h4>Q4: What is exception-safe code with RAII?</h4><p>RAII objects (smart pointers, file streams) release resources in their destructors, which run even when an exception unwinds the stack — making cleanup automatic and leak-free.</p></div>
    <div class="faq-item"><h4>Q5: What is std::terminate?</h4><p><code>std::terminate()</code> is called when an unhandled exception propagates out of main, when a noexcept function throws, or when two active exceptions exist simultaneously. It aborts the program.</p></div>
  </div>
</div>`;

makeCppLesson(18,
  '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html',
  'C++ Exception Handling: try, catch, throw, Custom Exceptions & Safety Masterclass',
  'Exhaustive C++ guide on Exception Handling (Phase 18): try/catch/throw, standard exception hierarchy, custom exceptions, multiple catch blocks, noexcept, exception safety guarantees, and RAII with exceptions.',
  'Phase 18', 'Exception Handling',
  'try / catch / throw · std::exception Hierarchy · Custom Exceptions · Multiple catch Blocks · noexcept · No-throw / Strong / Basic Guarantees · RAII & Exceptions · std::terminate',
  l18,
  '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html', '17. unique_ptr, shared_ptr, weak_ptr & RAII Memory',
  '19-cpp-file-handling-fstream-filesystem-and-serialization.html', '19. fstream, std::filesystem, Paths & Serialization');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 19: File Handling & Filesystem
// ═══════════════════════════════════════════════════════════════════════════════
const l19 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 19: File Handling &amp; Filesystem</strong>! C++ provides <code>std::ifstream</code>, <code>std::ofstream</code>, and <code>std::fstream</code> for text and binary I/O. C++17 adds the powerful <code>std::filesystem</code> library for path manipulation, directory traversal, file copying, and metadata querying — all in a type-safe, cross-platform API.</p>
</div>

<div class="section-title"><span class="num">1</span>File Streams Overview</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Class</th><th>Direction</th><th>Default Mode</th><th>Header</th></tr></thead>
    <tbody>
      <tr><td><code>std::ifstream</code></td><td>Input (read)</td><td><code>ios::in</code></td><td><code>&lt;fstream&gt;</code></td></tr>
      <tr><td><code>std::ofstream</code></td><td>Output (write)</td><td><code>ios::out | ios::trunc</code></td><td><code>&lt;fstream&gt;</code></td></tr>
      <tr><td><code>std::fstream</code></td><td>Input + Output</td><td><code>ios::in | ios::out</code></td><td><code>&lt;fstream&gt;</code></td></tr>
    </tbody>
  </table>
  <div class="concept-box">
    <h4>File Open Modes (combined with |):</h4>
    <p><code>ios::in</code> — Read &nbsp; <code>ios::out</code> — Write &nbsp; <code>ios::app</code> — Append &nbsp; <code>ios::trunc</code> — Truncate &nbsp; <code>ios::binary</code> — Binary mode &nbsp; <code>ios::ate</code> — Seek to end on open</p>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Reading &amp; Writing Text Files</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — ifstream, ofstream, fstream</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;fstream&gt;
#include &lt;iostream&gt;
#include &lt;sstream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

void writeFile(const std::string&amp; filename) {
    std::ofstream file(filename);    // opens, truncates old content
    if (!file) {
        std::cerr &lt;&lt; "Cannot open " &lt;&lt; filename &lt;&lt; " for writing\n";
        return;
    }
    file &lt;&lt; "Name,Score,Grade\n";
    file &lt;&lt; "Alice,95,A\n";
    file &lt;&lt; "Bob,87,B\n";
    file &lt;&lt; "Charlie,72,C\n";
    // file automatically closed at end of scope (RAII)
}

void readFile(const std::string&amp; filename) {
    std::ifstream file(filename);
    if (!file) {
        std::cerr &lt;&lt; "Cannot open " &lt;&lt; filename &lt;&lt; " for reading\n";
        return;
    }
    std::string line;
    while (std::getline(file, line)) {    // read line by line
        std::cout &lt;&lt; line &lt;&lt; "\n";
    }
}

void appendToFile(const std::string&amp; filename) {
    std::ofstream file(filename, std::ios::app);  // append mode
    file &lt;&lt; "Dave,91,A\n";
}

void readWordByWord(const std::string&amp; filename) {
    std::ifstream file(filename);
    std::string word;
    while (file &gt;&gt; word) {
        std::cout &lt;&lt; "[" &lt;&lt; word &lt;&lt; "] ";
    }
    std::cout &lt;&lt; "\n";
}

int main() {
    const std::string fname = "students.csv";
    writeFile(fname);
    readFile(fname);
    appendToFile(fname);
    std::cout &lt;&lt; "--- After append ---\n";
    readFile(fname);
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>std::filesystem (C++17)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::filesystem paths, dirs, file ops</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;filesystem&gt;
#include &lt;iostream&gt;
#include &lt;fstream&gt;

namespace fs = std::filesystem;

int main() {
    // Path operations
    fs::path p = "data/logs/app.log";
    std::cout &lt;&lt; "filename:  " &lt;&lt; p.filename() &lt;&lt; "\n";       // app.log
    std::cout &lt;&lt; "extension: " &lt;&lt; p.extension() &lt;&lt; "\n";      // .log
    std::cout &lt;&lt; "stem:      " &lt;&lt; p.stem() &lt;&lt; "\n";           // app
    std::cout &lt;&lt; "parent:    " &lt;&lt; p.parent_path() &lt;&lt; "\n";    // data/logs

    // Create directories
    fs::create_directories("output/temp");

    // Write a file
    std::ofstream("output/temp/hello.txt") &lt;&lt; "Hello filesystem!\n";

    // Check existence and file info
    fs::path file = "output/temp/hello.txt";
    if (fs::exists(file)) {
        std::cout &lt;&lt; "File size: " &lt;&lt; fs::file_size(file) &lt;&lt; " bytes\n";
        std::cout &lt;&lt; "Is regular file: " &lt;&lt; fs::is_regular_file(file) &lt;&lt; "\n";
    }

    // Copy file
    fs::copy("output/temp/hello.txt", "output/temp/hello_copy.txt",
             fs::copy_options::overwrite_existing);

    // Directory iteration
    std::cout &lt;&lt; "Files in output/temp:\n";
    for (const auto&amp; entry : fs::directory_iterator("output/temp")) {
        std::cout &lt;&lt; "  " &lt;&lt; entry.path().filename() &lt;&lt; "\n";
    }

    // Rename and remove
    fs::rename("output/temp/hello_copy.txt", "output/temp/renamed.txt");
    fs::remove("output/temp/renamed.txt");

    // Remove all (recursive)
    fs::remove_all("output");
    std::cout &lt;&lt; "Cleanup done\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Do I need to explicitly close() a file stream?</h4><p>No — the RAII destructor closes the file automatically when the stream goes out of scope. Explicit <code>close()</code> is only needed if you want to reopen the file mid-function or flush in specific places.</p></div>
    <div class="faq-item"><h4>Q2: How to check if file open succeeded?</h4><p>Test the stream directly: <code>if (!file) { /* failed */ }</code> or <code>file.is_open()</code>. Always check before reading/writing.</p></div>
    <div class="faq-item"><h4>Q3: How to read entire file into a string?</h4><p>Use a stringstream: <code>std::ifstream f(name); std::ostringstream ss; ss &lt;&lt; f.rdbuf(); std::string content = ss.str();</code></p></div>
    <div class="faq-item"><h4>Q4: What is seekg / seekp?</h4><p><code>seekg(offset, dir)</code> moves the read position. <code>seekp(offset, dir)</code> moves the write position. <code>dir</code> can be <code>ios::beg</code>, <code>ios::cur</code>, or <code>ios::end</code>.</p></div>
    <div class="faq-item"><h4>Q5: How to traverse directories recursively?</h4><p>Use <code>std::filesystem::recursive_directory_iterator</code>: <code>for (auto&amp; e : fs::recursive_directory_iterator(dir)) { ... }</code></p></div>
  </div>
</div>`;

makeCppLesson(19,
  '19-cpp-file-handling-fstream-filesystem-and-serialization.html',
  'C++ File Handling: fstream, std::filesystem, Paths & Serialization Masterclass',
  'Exhaustive C++ guide on File Handling (Phase 19): ifstream, ofstream, fstream, file modes, read/write/append, binary files, and C++17 std::filesystem for paths, directories, copy, rename, and deletion.',
  'Phase 19', 'File Handling & Filesystem',
  'ifstream & ofstream · fstream · File Modes (app/trunc/binary) · Read Line-by-Line · Write & Append · Binary Files · std::filesystem Paths · Directory Iteration · File Copy & Rename',
  l19,
  '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html', '18. try, catch, throw, Custom Exceptions & Safety',
  '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html', '20. constexpr, Structured Bindings, optional, variant & format');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 20: Modern C++ Features
// ═══════════════════════════════════════════════════════════════════════════════
const l20 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 20: Modern C++ Features</strong>! C++11 through C++23 introduced a wave of language features that dramatically simplify code, improve safety, and increase expressiveness. This chapter covers the most impactful modern features every C++ developer must know.</p>
</div>

<div class="section-title"><span class="num">1</span>C++11 Core Modern Features</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — auto, nullptr, uniform init, range-for, enum class</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;map&gt;

int main() {
    // auto — type deduction (resolved at compile time, zero overhead)
    auto x = 42;
    auto pi = 3.14159;
    auto name = std::string{"Modern C++"};
    auto primes = std::vector&lt;int&gt;{2, 3, 5, 7, 11};

    // nullptr — type-safe null pointer (replaces NULL / 0)
    int* raw = nullptr;
    if (raw == nullptr) std::cout &lt;&lt; "raw is null\n";

    // Uniform brace initialization — prevents narrowing conversions
    int a{5};
    std::vector&lt;int&gt; v{1, 2, 3, 4, 5};
    std::map&lt;std::string, int&gt; m{{"one", 1}, {"two", 2}};

    // Range-based for
    for (const auto&amp; item : primes) {
        std::cout &lt;&lt; item &lt;&lt; " ";
    }
    std::cout &lt;&lt; "\n";

    // enum class — scoped, strongly typed
    enum class Direction { North, South, East, West };
    Direction dir = Direction::North;
    // if (dir == 0) // ← compile error! Cannot compare with int ✅

    std::cout &lt;&lt; "x=" &lt;&lt; x &lt;&lt; " pi=" &lt;&lt; pi &lt;&lt; " name=" &lt;&lt; name &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>constexpr, consteval &amp; decltype</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — constexpr, consteval, decltype, if constexpr</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;type_traits&gt;

// constexpr: evaluated at compile time if possible, runtime otherwise
constexpr int factorial(int n) {
    return n &lt;= 1 ? 1 : n * factorial(n - 1);
}

// consteval (C++20): MUST be evaluated at compile time
consteval int compiletimeSquare(int n) {
    return n * n;
}

// decltype: type of an expression
int main() {
    constexpr int fact5 = factorial(5);     // compile-time: 120
    std::cout &lt;&lt; "5! = " &lt;&lt; fact5 &lt;&lt; "\n";

    // consteval — compile time only
    constexpr int sq7 = compiletimeSquare(7);  // 49, evaluated at compile time
    std::cout &lt;&lt; "7^2 = " &lt;&lt; sq7 &lt;&lt; "\n";

    // decltype: deduce type of expression
    int i = 5;
    double d = 3.14;
    decltype(i + d) result = i + d;    // result is double
    std::cout &lt;&lt; "decltype result: " &lt;&lt; result &lt;&lt; "\n";

    // if constexpr (C++17) — compile-time branching in templates
    auto printTypeInfo = [](auto val) {
        if constexpr (std::is_integral_v&lt;decltype(val)&gt;) {
            std::cout &lt;&lt; val &lt;&lt; " is integral\n";
        } else if constexpr (std::is_floating_point_v&lt;decltype(val)&gt;) {
            std::cout &lt;&lt; val &lt;&lt; " is floating point\n";
        } else {
            std::cout &lt;&lt; "other type\n";
        }
    };
    printTypeInfo(42);
    printTypeInfo(3.14);
    printTypeInfo(std::string("hello"));
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Structured Bindings, std::chrono &amp; std::format (C++20)</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Structured Bindings, chrono, format</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;tuple&gt;
#include &lt;chrono&gt;
#include &lt;format&gt;       // C++20

// Structured bindings (C++17) — decompose pairs, tuples, structs
struct Point { double x, y, z; };

int main() {
    // Decompose pair
    std::map&lt;std::string, int&gt; scores{{"Alice", 95}, {"Bob", 87}};
    for (const auto&amp; [name, score] : scores) {
        std::cout &lt;&lt; name &lt;&lt; ": " &lt;&lt; score &lt;&lt; "\n";
    }

    // Decompose tuple
    auto [id, label, value] = std::make_tuple(1, std::string("temp"), 98.6);
    std::cout &lt;&lt; id &lt;&lt; " " &lt;&lt; label &lt;&lt; " " &lt;&lt; value &lt;&lt; "\n";

    // Decompose struct
    Point p{1.0, 2.0, 3.0};
    auto&amp; [px, py, pz] = p;
    std::cout &lt;&lt; "Point: " &lt;&lt; px &lt;&lt; " " &lt;&lt; py &lt;&lt; " " &lt;&lt; pz &lt;&lt; "\n";

    // std::chrono — time measurement
    auto start = std::chrono::high_resolution_clock::now();
    long long sum = 0;
    for (long long i = 0; i &lt; 1'000'000; ++i) sum += i;  // digit separator
    auto end = std::chrono::high_resolution_clock::now();
    auto ms = std::chrono::duration_cast&lt;std::chrono::microseconds&gt;(end - start);
    std::cout &lt;&lt; "sum=" &lt;&lt; sum &lt;&lt; " time=" &lt;&lt; ms.count() &lt;&lt; "us\n";

    // std::format (C++20) — Python-style formatting
    std::string msg = std::format("Hello, {}! Score: {:.2f}%", "Alice", 95.678);
    std::cout &lt;&lt; msg &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the difference between constexpr and consteval?</h4><p><code>constexpr</code> may be evaluated at compile time or runtime. <code>consteval</code> (C++20) mandates compile-time evaluation — the compiler errors if it can't compute the result at compile time.</p></div>
    <div class="faq-item"><h4>Q2: What is std::format advantage over printf?</h4><p><code>std::format</code> is type-safe (checked at compile time), returns <code>std::string</code>, and is extensible for custom types — unlike <code>printf</code> which uses va_args and has no type safety.</p></div>
    <div class="faq-item"><h4>Q3: What are digit separators?</h4><p>C++14 allows <code>'</code> as a digit separator: <code>1'000'000</code> improves readability of large literals. The separator is ignored by the compiler.</p></div>
    <div class="faq-item"><h4>Q4: What is std::string_view?</h4><p><code>std::string_view</code> is a non-owning, read-only view into a string. Passing <code>string_view</code> avoids copying — it works with C strings, string literals, and substrings with zero allocation.</p></div>
    <div class="faq-item"><h4>Q5: What are Modules in C++20?</h4><p>C++20 Modules replace header files. <code>export module myLib;</code> defines a module, <code>import myLib;</code> uses it. Modules eliminate multiple-inclusion issues, speed up compilation, and have no macro leakage.</p></div>
  </div>
</div>`;

makeCppLesson(20,
  '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html',
  'Modern C++ Features: constexpr, Structured Bindings, optional, variant & format Masterclass',
  'Exhaustive C++ guide on Modern Features (Phase 20): auto, nullptr, range-for, enum class, constexpr, consteval, decltype, if constexpr, structured bindings, std::chrono, std::format, Modules, and Concepts overview.',
  'Phase 20', 'Modern C++ Features',
  'auto & nullptr · uniform init · range-for · constexpr & consteval · decltype · if constexpr · Structured Bindings · std::chrono · std::format (C++20) · Digit Separators · Modules intro',
  l20,
  '19-cpp-file-handling-fstream-filesystem-and-serialization.html', '19. fstream, std::filesystem, Paths & Serialization',
  '21-cpp-ranges-views-filter-transform-pipelines-and-lazy-evaluation.html', '21. Ranges, Views, Pipelines & Lazy Evaluation (C++20)');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 21: Ranges & Views (C++20)
// ═══════════════════════════════════════════════════════════════════════════════
const l21 = `<div class="intro-box">
  <p>Welcome to <strong>Phase 21: Ranges &amp; Views (C++20)</strong>! The Ranges library revolutionises how C++ processes collections. Instead of verbose iterator pairs, ranges allow elegant, composable, lazy pipelines using the pipe operator <code>|</code>. Views are lightweight, zero-cost non-owning windows into data that are evaluated only when iterated.</p>
</div>

<div class="section-title"><span class="num">1</span>What are Ranges?</div>
<div class="section-body">
  <p class="text-prose">A <strong>range</strong> is anything with a <code>begin()</code> and <code>end()</code>: vectors, arrays, strings, istream ranges. The <code>std::ranges</code> algorithms work directly on ranges — no need to pass <code>begin/end</code> pairs explicitly.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::ranges algorithms (C++20)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;ranges&gt;
#include &lt;string&gt;

int main() {
    std::vector&lt;int&gt; nums{5, 2, 8, 1, 9, 3, 7, 4, 6};

    // Ranges algorithms — no begin/end boilerplate!
    std::ranges::sort(nums);                        // sort entire range
    std::ranges::reverse(nums);                     // reverse entire range
    auto it = std::ranges::find(nums, 7);
    if (it != nums.end())
        std::cout &lt;&lt; "Found 7 at: " &lt;&lt; std::distance(nums.begin(), it) &lt;&lt; "\n";

    int cnt = std::ranges::count_if(nums, [](int n){ return n % 2 == 0; });
    std::cout &lt;&lt; "Even count: " &lt;&lt; cnt &lt;&lt; "\n";

    std::vector&lt;int&gt; squares;
    std::ranges::transform(nums, std::back_inserter(squares),
                           [](int n){ return n * n; });
    std::cout &lt;&lt; "First few squares: ";
    for (int s : squares | std::views::take(4)) std::cout &lt;&lt; s &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Views &amp; Lazy Pipelines</div>
<div class="section-body">
  <p class="text-prose"><strong>Views</strong> are lazy, non-owning ranges. They don't copy data — they process elements on-demand as you iterate. Multiple views are chained with <code>|</code> to form composable pipelines.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Views, filter, transform, take, drop, pipelines</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;ranges&gt;
#include &lt;vector&gt;
#include &lt;string&gt;

int main() {
    std::vector&lt;int&gt; numbers{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Filter even numbers
    auto evens = numbers | std::views::filter([](int n){ return n % 2 == 0; });
    std::cout &lt;&lt; "Evens: ";
    for (int n : evens) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Transform: square each
    auto squares = numbers | std::views::transform([](int n){ return n * n; });
    std::cout &lt;&lt; "Squares: ";
    for (int s : squares) std::cout &lt;&lt; s &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Composed pipeline: filter evens, square, take first 3
    auto pipeline = numbers
        | std::views::filter([](int n){ return n % 2 == 0; })
        | std::views::transform([](int n){ return n * n; })
        | std::views::take(3);

    std::cout &lt;&lt; "First 3 even squares: ";
    for (int v : pipeline) std::cout &lt;&lt; v &lt;&lt; " ";   // 4 16 36
    std::cout &lt;&lt; "\n";

    // drop, take_while, drop_while
    auto dropped = numbers | std::views::drop(3);     // skip first 3
    auto taken   = numbers | std::views::take_while([](int n){ return n &lt; 7; });

    std::cout &lt;&lt; "After drop(3): ";
    for (int n : dropped) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    std::cout &lt;&lt; "take_while(&lt;7): ";
    for (int n : taken) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // views::iota — generate integer sequence
    std::cout &lt;&lt; "iota 1..5: ";
    for (int n : std::views::iota(1, 6)) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // views::reverse
    std::cout &lt;&lt; "Reversed: ";
    for (int n : numbers | std::views::reverse) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // String view pipeline
    std::vector&lt;std::string&gt; words{"hello", "ranges", "are", "amazing", "cpp20"};
    auto longWords = words
        | std::views::filter([](const std::string&amp; s){ return s.length() &gt; 3; })
        | std::views::transform([](const std::string&amp; s){ return s + "!"; });

    std::cout &lt;&lt; "Long words with !: ";
    for (const auto&amp; w : longWords) std::cout &lt;&lt; w &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Range Safety &amp; Custom Views</div>
<div class="section-body">
  <div class="concept-box">
    <h4>Why Ranges are Safer than Raw Iterators:</h4>
    <p>• Range algorithms accept a single container — no begin/end mismatch possible.</p>
    <p>• <code>std::ranges::sort(v)</code> cannot accidentally sort the wrong range by passing mismatched iterators.</p>
    <p>• Views are lazy: <code>views::iota(0) | views::take(5)</code> generates an infinite sequence but only computes 5 values.</p>
  </div>
  <table class="tbl spec-table">
    <thead><tr><th>View Adaptor</th><th>Description</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>views::filter</code></td><td>Keep elements matching predicate</td><td><code>| views::filter(isEven)</code></td></tr>
      <tr><td><code>views::transform</code></td><td>Map each element</td><td><code>| views::transform(square)</code></td></tr>
      <tr><td><code>views::take(n)</code></td><td>First n elements</td><td><code>| views::take(5)</code></td></tr>
      <tr><td><code>views::drop(n)</code></td><td>Skip first n elements</td><td><code>| views::drop(3)</code></td></tr>
      <tr><td><code>views::take_while</code></td><td>Take while predicate holds</td><td><code>| views::take_while(pred)</code></td></tr>
      <tr><td><code>views::reverse</code></td><td>Reverse order</td><td><code>| views::reverse</code></td></tr>
      <tr><td><code>views::iota(a,b)</code></td><td>Integer sequence [a,b)</td><td><code>views::iota(1, 10)</code></td></tr>
      <tr><td><code>views::keys</code></td><td>Keys of map/pair range</td><td><code>myMap | views::keys</code></td></tr>
      <tr><td><code>views::values</code></td><td>Values of map/pair range</td><td><code>myMap | views::values</code></td></tr>
      <tr><td><code>views::zip</code> (C++23)</td><td>Zip multiple ranges</td><td><code>views::zip(v1, v2)</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">4</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Are views lazy or eager?</h4><p>Views are <strong>lazy</strong>. No computation happens when you create a view pipeline. Elements are computed on-demand as you iterate — making it efficient to chain many operations without intermediate copies.</p></div>
    <div class="faq-item"><h4>Q2: Do views own their data?</h4><p>No. Views are non-owning — they hold references/pointers to the original range. The original container must outlive the view, or you'll have a dangling reference.</p></div>
    <div class="faq-item"><h4>Q3: Can I store views in variables?</h4><p>Yes, with <code>auto</code>. But be careful about lifetime. If you store a view as a member variable that refers to a temporary, it's undefined behaviour.</p></div>
    <div class="faq-item"><h4>Q4: Difference between std::ranges::sort and std::sort?</h4><p><code>std::ranges::sort(v)</code> takes the whole range. <code>std::sort(v.begin(), v.end())</code> takes iterator pair. Both have the same complexity; ranges version is safer and more readable.</p></div>
    <div class="faq-item"><h4>Q5: What is views::iota for infinite sequences?</h4><p><code>std::views::iota(0)</code> (no second argument) is an infinite lazy range of integers. Combined with <code>views::take(n)</code> or <code>views::take_while(pred)</code> it becomes bounded and safe.</p></div>
  </div>
</div>`;

makeCppLesson(21,
  '21-cpp-ranges-views-filter-transform-pipelines-and-lazy-evaluation.html',
  'C++ Ranges & Views: filter, transform, Pipelines & Lazy Evaluation (C++20) Masterclass',
  'Exhaustive C++ guide on Ranges & Views (Phase 21): std::ranges algorithms, views::filter, views::transform, views::take, views::drop, views::iota, composable pipelines, lazy evaluation, range safety, and C++23 zip view.',
  'Phase 21', 'Ranges & Views (C++20)',
  'Ranges vs Iterators · std::ranges algorithms · views::filter · views::transform · views::take & drop · views::iota · Pipeline Composition with | · Lazy Evaluation · views::reverse · views::keys/values',
  l21,
  '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html', '20. constexpr, Structured Bindings, optional, variant & format',
  null, null);

console.log('\n🎉 ALL 11 MODERN C++ PHASES (11–21) GENERATED SUCCESSFULLY!');
