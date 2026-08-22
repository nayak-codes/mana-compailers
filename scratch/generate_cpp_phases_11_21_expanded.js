const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cppDir = path.join(__dirname, '..', 'public', 'blog-cpp');
console.log('🚀 Generating C++ Phases 11–21 — EXPANDED TEXTBOOK EDITION...');

function makeCppLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(path.join(cppDir, file),
    wrapCppPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8');
  console.log('  ✅ ' + file);
}

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 11: Inheritance & Polymorphism
// ═══════════════════════════════════════════════════════════════════════════════
const l11 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 11 (Chapter 11): C++ Inheritance, Virtual Functions &amp; Runtime Polymorphism Masterclass</strong>! Inheritance is one of the four pillars of OOP — it enables code reuse, specialization, and extensibility. Polymorphism (Greek: "many forms") allows a single interface to represent multiple underlying types at runtime using the <strong>vtable (virtual dispatch table)</strong> mechanism built into the C++ object model.</p>
</div>

<div class="section-title"><span class="num">1</span>Base Class &amp; Derived Class — Fundamentals</div>
<div class="section-body">
  <p class="text-prose">A <strong>base class</strong> (also called parent or superclass) defines shared attributes and behaviors. A <strong>derived class</strong> (child, subclass) inherits those members and can add new ones or override existing ones.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Basic Inheritance</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;

class Vehicle {
protected:
    std::string brand_;
    int year_;
    double engineCC_;
public:
    Vehicle(std::string brand, int year, double cc)
        : brand_{std::move(brand)}, year_{year}, engineCC_{cc} {
        std::cout &lt;&lt; "Vehicle constructed: " &lt;&lt; brand_ &lt;&lt; "\n";
    }
    virtual ~Vehicle() {
        std::cout &lt;&lt; "Vehicle destroyed: " &lt;&lt; brand_ &lt;&lt; "\n";
    }
    virtual void describe() const {
        std::cout &lt;&lt; year_ &lt;&lt; " " &lt;&lt; brand_ &lt;&lt; " (" &lt;&lt; engineCC_ &lt;&lt; "cc)\n";
    }
    virtual double fuelEfficiency() const { return 0.0; }
    std::string brand() const { return brand_; }
    int year() const { return year_; }
};

class Car : public Vehicle {
    int doors_;
    double kmpl_;
public:
    Car(std::string brand, int year, double cc, int doors, double kmpl)
        : Vehicle{std::move(brand), year, cc}, doors_{doors}, kmpl_{kmpl} {
        std::cout &lt;&lt; "Car constructed\n";
    }
    ~Car() override { std::cout &lt;&lt; "Car destroyed\n"; }
    void describe() const override {
        Vehicle::describe();           // call base version first
        std::cout &lt;&lt; "  Type: Car | Doors: " &lt;&lt; doors_ &lt;&lt; " | Efficiency: " &lt;&lt; kmpl_ &lt;&lt; " km/L\n";
    }
    double fuelEfficiency() const override { return kmpl_; }
};

class ElectricCar : public Car {
    int rangeKm_;
    int chargeTimeMin_;
public:
    ElectricCar(std::string brand, int year, int doors, int range, int chargeTime)
        : Car{std::move(brand), year, 0.0, doors, 0.0},
          rangeKm_{range}, chargeTimeMin_{chargeTime} {}
    void describe() const override {
        std::cout &lt;&lt; year() &lt;&lt; " " &lt;&lt; brand() &lt;&lt; " [Electric]\n";
        std::cout &lt;&lt; "  Range: " &lt;&lt; rangeKm_ &lt;&lt; " km | Charge time: " &lt;&lt; chargeTimeMin_ &lt;&lt; " min\n";
    }
    double fuelEfficiency() const override { return rangeKm_ / 100.0; }
};

class Truck : public Vehicle {
    double payloadTons_;
public:
    Truck(std::string brand, int year, double cc, double payload)
        : Vehicle{std::move(brand), year, cc}, payloadTons_{payload} {}
    void describe() const override {
        Vehicle::describe();
        std::cout &lt;&lt; "  Type: Truck | Payload: " &lt;&lt; payloadTons_ &lt;&lt; " tons\n";
    }
};

int main() {
    Car honda{"Honda City", 2024, 1498, 4, 17.8};
    ElectricCar tesla{"Tesla Model 3", 2024, 4, 576, 40};
    Truck volvo{"Volvo FH", 2023, 12800, 25.0};

    std::cout &lt;&lt; "\n--- Fleet Inventory ---\n";
    honda.describe();
    tesla.describe();
    volvo.describe();
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Inheritance Access Specifiers in Depth</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Base Member Access</th><th>public inheritance</th><th>protected inheritance</th><th>private inheritance</th></tr></thead>
    <tbody>
      <tr><td><code>public</code> in Base</td><td>public in Derived</td><td>protected in Derived</td><td>private in Derived</td></tr>
      <tr><td><code>protected</code> in Base</td><td>protected in Derived</td><td>protected in Derived</td><td>private in Derived</td></tr>
      <tr><td><code>private</code> in Base</td><td>inaccessible</td><td>inaccessible</td><td>inaccessible</td></tr>
    </tbody>
  </table>
  <div class="concept-box">
    <h4>Inheritance Type Use Cases:</h4>
    <p>• <code>public</code> inheritance = IS-A relationship (Car IS-A Vehicle). The most common. Preserves base class interface.</p>
    <p>• <code>protected</code> inheritance = Used for shared implementation across a class hierarchy, hiding the interface from external code.</p>
    <p>• <code>private</code> inheritance = IMPLEMENTED-IN-TERMS-OF. Like composition, but allows overriding virtual functions. Rarely needed.</p>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Inheritance Types Demonstration</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;

class Base {
public:
    int publicVal = 1;
    void publicFunc() { std::cout &lt;&lt; "Base public\n"; }
protected:
    int protectedVal = 2;
    void protectedFunc() { std::cout &lt;&lt; "Base protected\n"; }
private:
    int privateVal = 3;   // NEVER accessible in derived
};

// public inheritance — interface preserved
class PublicDerived : public Base {
public:
    void test() {
        publicFunc();    // OK — still public
        protectedFunc(); // OK — accessible in derived
        // privateFunc(); // ERROR — private
        std::cout &lt;&lt; publicVal &lt;&lt; " " &lt;&lt; protectedVal &lt;&lt; "\n";
    }
};

// private inheritance — "implemented in terms of"
class PrivateDerived : private Base {
public:
    void test() {
        publicFunc();    // OK inside derived
        protectedFunc(); // OK inside derived
    }
};

int main() {
    PublicDerived pd;
    pd.publicFunc();    // OK — still accessible outside
    pd.publicVal = 10;  // OK

    PrivateDerived priv;
    // priv.publicFunc();  // ERROR! public member became private
    priv.test();           // OK — calls through derived's public API
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Inheritance Hierarchy Types</div>
<div class="section-body">
  <div class="memory-diagram">Inheritance Hierarchy Types:

  SINGLE                  MULTILEVEL              MULTIPLE
  ─────────────────       ────────────────        ─────────────────────
      Animal                  Animal                 Flyable    Swimmable
         │                      │                      │              │
       Dog                    Mammal                   └──── Duck ────┘
                                │
                              Dog

  HIERARCHICAL            DIAMOND PROBLEM         VIRTUAL INHERITANCE
  ─────────────────       ────────────────        ──────────────────────
      Animal                    A                      A (shared copy)
      ├── Dog                  / \                    / \
      ├── Cat                 B   C         B: virt  B   C : virt
      └── Bird                 \ /                    \ /
                                D                      D (one copy of A)</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Multiple Inheritance &amp; Virtual Base</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;

class Flyable {
public:
    virtual void fly() const { std::cout &lt;&lt; "Flying!\n"; }
    virtual ~Flyable() = default;
};

class Swimmable {
public:
    virtual void swim() const { std::cout &lt;&lt; "Swimming!\n"; }
    virtual ~Swimmable() = default;
};

// Multiple inheritance — Duck IS Flyable AND Swimmable
class Duck : public Flyable, public Swimmable {
    std::string name_;
public:
    explicit Duck(std::string name) : name_{std::move(name)} {}
    void fly()  const override { std::cout &lt;&lt; name_ &lt;&lt; " flaps wings!\n"; }
    void swim() const override { std::cout &lt;&lt; name_ &lt;&lt; " paddles in water!\n"; }
    void quack() const { std::cout &lt;&lt; name_ &lt;&lt; " quacks!\n"; }
};

// Virtual inheritance — solves diamond problem
class Animal { public: virtual void breathe() { std::cout &lt;&lt; "breathe\n"; } };
class Mammal  : public virtual Animal {};
class WaterAnimal : public virtual Animal {};
class Dolphin : public Mammal, public WaterAnimal {};  // one Animal copy

int main() {
    Duck donald{"Donald"};
    donald.fly();
    donald.swim();
    donald.quack();

    // Polymorphism through different base pointers
    Flyable* f = &amp;donald;
    Swimmable* s = &amp;donald;
    f-&gt;fly();
    s-&gt;swim();

    Dolphin d;
    d.breathe();  // ONE copy of Animal — no ambiguity
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Virtual Functions, vtable &amp; Runtime Polymorphism</div>
<div class="section-body">
  <p class="text-prose">When a method is declared <code>virtual</code>, the compiler creates a <strong>virtual dispatch table (vtable)</strong> for the class — a static array of function pointers. Every object of a polymorphic class carries a hidden <strong>vptr</strong> (virtual pointer) pointing to its class's vtable. At runtime, calling a virtual function dereferences vptr, looks up the function in the vtable, and calls it — enabling correct dispatch for the actual runtime type.</p>
  <div class="memory-diagram">vtable layout in memory:

  Animal class vtable:              Dog class vtable:
  ┌──────────────────────┐          ┌──────────────────────┐
  │ [0] &amp;Animal::sound() │          │ [0] &amp;Dog::sound()    │  ← OVERRIDDEN
  │ [1] &amp;Animal::name()  │          │ [1] &amp;Dog::name()     │  ← OVERRIDDEN
  │ [2] &amp;Animal::~Animal │          │ [2] &amp;Dog::~Dog()     │
  └──────────────────────┘          └──────────────────────┘

  Animal obj: [vptr] → Animal vtable
  Dog obj:    [vptr] → Dog vtable

  Animal* p = new Dog();
  p-&gt;sound();
  → dereference p-&gt;vptr → Dog vtable[0] → Dog::sound() CALLED ✅</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Virtual Functions, override, final</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;string&gt;

class Shape {
protected:
    std::string color_;
public:
    explicit Shape(std::string color) : color_{std::move(color)} {}
    virtual double area()      const = 0;   // pure virtual — Shape is abstract
    virtual double perimeter() const = 0;
    virtual std::string name() const = 0;
    virtual void describe() const {
        std::cout &lt;&lt; name() &lt;&lt; " [" &lt;&lt; color_ &lt;&lt; "]"
                  &lt;&lt; " area=" &lt;&lt; area()
                  &lt;&lt; " perimeter=" &lt;&lt; perimeter() &lt;&lt; "\n";
    }
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius_;
public:
    Circle(std::string c, double r) : Shape{std::move(c)}, radius_{r} {}
    double area()      const override { return 3.14159265 * radius_ * radius_; }
    double perimeter() const override { return 2 * 3.14159265 * radius_; }
    std::string name() const override { return "Circle(r=" + std::to_string(radius_) + ")"; }
};

class Rectangle : public Shape {
    double w_, h_;
public:
    Rectangle(std::string c, double w, double h) : Shape{std::move(c)}, w_{w}, h_{h} {}
    double area()      const override { return w_ * h_; }
    double perimeter() const override { return 2 * (w_ + h_); }
    std::string name() const override { return "Rectangle(" + std::to_string(w_) + "x" + std::to_string(h_) + ")"; }
};

class Triangle : public Shape {
    double a_, b_, c_;
public:
    Triangle(std::string col, double a, double b, double c)
        : Shape{std::move(col)}, a_{a}, b_{b}, c_{c} {}
    double perimeter() const override { return a_ + b_ + c_; }
    double area() const override {
        double s = perimeter() / 2.0;
        return std::sqrt(s*(s-a_)*(s-b_)*(s-c_));
    }
    std::string name() const override { return "Triangle"; }
};

class Square final : public Rectangle {   // final — cannot be further derived
public:
    Square(std::string c, double side) : Rectangle{std::move(c), side, side} {}
    std::string name() const override { return "Square"; }
};

void printShapeReport(const std::vector&lt;std::unique_ptr&lt;Shape&gt;&gt;&amp; shapes) {
    double totalArea = 0;
    std::cout &lt;&lt; "=== Shape Report ===\n";
    for (const auto&amp; s : shapes) {
        s-&gt;describe();
        totalArea += s-&gt;area();
    }
    std::cout &lt;&lt; "Total area: " &lt;&lt; totalArea &lt;&lt; "\n";
}

int main() {
    std::vector&lt;std::unique_ptr&lt;Shape&gt;&gt; shapes;
    shapes.push_back(std::make_unique&lt;Circle&gt;("red", 5.0));
    shapes.push_back(std::make_unique&lt;Rectangle&gt;("blue", 4.0, 6.0));
    shapes.push_back(std::make_unique&lt;Triangle&gt;("green", 3.0, 4.0, 5.0));
    shapes.push_back(std::make_unique&lt;Square&gt;("yellow", 4.0));

    printShapeReport(shapes);

    // Shape* p = new Shape("x"); // ERROR — abstract class cannot be instantiated!
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Pure Virtual Functions &amp; Abstract Classes</div>
<div class="section-body">
  <p class="text-prose">A <strong>pure virtual function</strong> is declared with <code>= 0</code>. A class with at least one pure virtual function is an <strong>abstract class</strong> — it cannot be instantiated directly. It defines an interface/contract that all concrete derived classes MUST fulfill.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Abstract Interface Pattern (ILogger)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;fstream&gt;
#include &lt;memory&gt;
#include &lt;chrono&gt;
#include &lt;ctime&gt;

// Pure abstract interface
class ILogger {
public:
    enum class Level { DEBUG, INFO, WARNING, ERROR, CRITICAL };
    virtual void log(Level level, const std::string&amp; msg) = 0;
    virtual void setMinLevel(Level level) = 0;
    virtual void flush() = 0;
    virtual ~ILogger() = default;
    static std::string levelStr(Level l) {
        switch (l) {
            case Level::DEBUG:    return "DEBUG";
            case Level::INFO:     return "INFO";
            case Level::WARNING:  return "WARNING";
            case Level::ERROR:    return "ERROR";
            case Level::CRITICAL: return "CRITICAL";
        }
        return "UNKNOWN";
    }
};

class ConsoleLogger : public ILogger {
    Level minLevel_{Level::DEBUG};
public:
    void log(Level level, const std::string&amp; msg) override {
        if (level &lt; minLevel_) return;
        std::cout &lt;&lt; "[" &lt;&lt; levelStr(level) &lt;&lt; "] " &lt;&lt; msg &lt;&lt; "\n";
    }
    void setMinLevel(Level level) override { minLevel_ = level; }
    void flush() override { std::cout.flush(); }
};

class NullLogger : public ILogger {   // for testing — discards all output
    Level minLevel_{Level::CRITICAL};
public:
    void log(Level, const std::string&amp;) override {}
    void setMinLevel(Level l) override { minLevel_ = l; }
    void flush() override {}
};

void runApp(ILogger&amp; logger) {
    logger.log(ILogger::Level::INFO,    "Application started");
    logger.log(ILogger::Level::DEBUG,   "Loading configuration...");
    logger.log(ILogger::Level::WARNING, "Config file missing, using defaults");
    logger.log(ILogger::Level::ERROR,   "Database connection failed!");
    logger.flush();
}

int main() {
    std::cout &lt;&lt; "--- Console Logger ---\n";
    ConsoleLogger clog;
    clog.setMinLevel(ILogger::Level::INFO);
    runApp(clog);

    std::cout &lt;&lt; "\n--- Null Logger (silent) ---\n";
    NullLogger nlog;
    runApp(nlog);
    std::cout &lt;&lt; "(no output from NullLogger)\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Upcasting, Downcasting &amp; dynamic_cast</div>
<div class="section-body">
  <p class="text-prose"><strong>Upcasting</strong> converts a Derived* to Base* — always safe and implicit. <strong>Downcasting</strong> converts a Base* back to Derived* — potentially dangerous. Use <code>dynamic_cast</code> for safe runtime-checked downcasting (requires RTTI).</p>
  <table class="tbl spec-table">
    <thead><tr><th>Cast</th><th>Direction</th><th>Safety</th><th>Cost</th><th>Use When</th></tr></thead>
    <tbody>
      <tr><td>Implicit (upcasting)</td><td>Derived→Base</td><td>Always safe</td><td>Zero</td><td>Default polymorphic usage</td></tr>
      <tr><td><code>static_cast</code></td><td>Base→Derived</td><td>No runtime check</td><td>Zero</td><td>You're 100% sure of type</td></tr>
      <tr><td><code>dynamic_cast</code></td><td>Base→Derived</td><td>Runtime RTTI check</td><td>Small overhead</td><td>Safe when type might be wrong</td></tr>
      <tr><td><code>reinterpret_cast</code></td><td>Any</td><td>Extremely unsafe</td><td>Zero</td><td>Low-level bit manipulation only</td></tr>
    </tbody>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — dynamic_cast, typeid, RTTI</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;typeinfo&gt;

class Animal {
public:
    virtual void speak() const = 0;
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() const override { std::cout &lt;&lt; "Woof!\n"; }
    void fetch() const { std::cout &lt;&lt; "Dog fetches ball!\n"; }
};

class Cat : public Animal {
public:
    void speak() const override { std::cout &lt;&lt; "Meow!\n"; }
    void purr() const { std::cout &lt;&lt; "Cat purrs...\n"; }
};

class GuideDog : public Dog {
public:
    void guide() const { std::cout &lt;&lt; "GuideDog leads owner!\n"; }
};

void processAnimal(Animal* animal) {
    std::cout &lt;&lt; "Runtime type: " &lt;&lt; typeid(*animal).name() &lt;&lt; "\n";
    animal-&gt;speak();

    // Safe downcast to Dog
    if (Dog* dog = dynamic_cast&lt;Dog*&gt;(animal)) {
        dog-&gt;fetch();
    }

    // Safe downcast to Cat
    if (Cat* cat = dynamic_cast&lt;Cat*&gt;(animal)) {
        cat-&gt;purr();
    }

    // Check for GuideDog specifically
    if (GuideDog* gd = dynamic_cast&lt;GuideDog*&gt;(animal)) {
        gd-&gt;guide();
    }
}

int main() {
    std::vector&lt;std::unique_ptr&lt;Animal&gt;&gt; zoo;
    zoo.push_back(std::make_unique&lt;Dog&gt;());
    zoo.push_back(std::make_unique&lt;Cat&gt;());
    zoo.push_back(std::make_unique&lt;GuideDog&gt;());

    for (auto&amp; a : zoo) {
        std::cout &lt;&lt; "--- Processing animal ---\n";
        processAnimal(a.get());
    }
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">7</span>Composition vs Inheritance — Design Guide</div>
<div class="section-body">
  <div class="concept-box">
    <h4>The Golden Rule — "Prefer Composition Over Inheritance":</h4>
    <p>• Use <strong>inheritance</strong> when a genuine IS-A relationship exists (<code>Dog IS-A Animal</code>) and you need runtime polymorphism.</p>
    <p>• Use <strong>composition</strong> when you need HAS-A (<code>Car HAS-A Engine</code>). Composition is more flexible — you can swap implementations at runtime, and it avoids tight coupling to base class internals.</p>
    <p>• Deep inheritance hierarchies (more than 2-3 levels) are a design smell. Flatten with composition or interfaces.</p>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Composition vs Inheritance comparison</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;string&gt;

// ─── Composition approach (preferred for HAS-A) ──────────────────────────────
class Engine {
    double horsepower_;
public:
    explicit Engine(double hp) : horsepower_{hp} {}
    void start() { std::cout &lt;&lt; "Engine (" &lt;&lt; horsepower_ &lt;&lt; "hp) started!\n"; }
    void stop()  { std::cout &lt;&lt; "Engine stopped.\n"; }
    double hp() const { return horsepower_; }
};

class GPS {
public:
    void navigate(const std::string&amp; dest) {
        std::cout &lt;&lt; "GPS: Navigating to " &lt;&lt; dest &lt;&lt; "\n";
    }
};

class CarByComposition {
    std::string model_;
    Engine engine_;        // HAS-A Engine
    GPS gps_;              // HAS-A GPS
public:
    CarByComposition(std::string model, double hp)
        : model_{std::move(model)}, engine_{hp} {}

    void startJourney(const std::string&amp; dest) {
        std::cout &lt;&lt; model_ &lt;&lt; ":\n";
        engine_.start();
        gps_.navigate(dest);
    }
};

// ─── Inheritance approach (IS-A) ─────────────────────────────────────────────
class Vehicle2 {
protected: std::string brand_;
public:
    explicit Vehicle2(std::string b) : brand_{std::move(b)} {}
    virtual void fuel() const { std::cout &lt;&lt; brand_ &lt;&lt; " needs petrol\n"; }
    virtual ~Vehicle2() = default;
};

class ElectricVehicle : public Vehicle2 {
public:
    explicit ElectricVehicle(std::string b) : Vehicle2{std::move(b)} {}
    void fuel() const override { std::cout &lt;&lt; brand_ &lt;&lt; " needs charging\n"; }
    void regenerativeBrake() { std::cout &lt;&lt; "Energy recovered!\n"; }
};

int main() {
    CarByComposition mycar{"Toyota Camry", 203};
    mycar.startJourney("Hyderabad");

    ElectricVehicle ev{"Tesla"};
    ev.fuel();
    ev.regenerativeBrake();
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">8</span>Virtual Destructor — Why It's Critical</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Virtual vs non-virtual destructor</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;

// BAD — non-virtual destructor
class BadBase {
public:
    ~BadBase() { std::cout &lt;&lt; "BadBase destroyed\n"; }
};

class BadDerived : public BadBase {
    int* data = new int[100];
public:
    ~BadDerived() {
        delete[] data;
        std::cout &lt;&lt; "BadDerived destroyed (data freed)\n";
    }
};

// GOOD — virtual destructor
class GoodBase {
public:
    virtual ~GoodBase() { std::cout &lt;&lt; "GoodBase destroyed\n"; }
};

class GoodDerived : public GoodBase {
    int* data = new int[100];
public:
    ~GoodDerived() override {
        delete[] data;
        std::cout &lt;&lt; "GoodDerived destroyed (data freed)\n";
    }
};

int main() {
    std::cout &lt;&lt; "=== BAD (memory leak!) ===\n";
    BadBase* b1 = new BadDerived();
    delete b1;   // Only BadBase::~BadBase() called — MEMORY LEAK!

    std::cout &lt;&lt; "\n=== GOOD (correct) ===\n";
    GoodBase* b2 = new GoodDerived();
    delete b2;   // Calls GoodDerived::~GoodDerived() then GoodBase::~GoodBase() ✅
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">9</span>Method Overriding vs Method Hiding</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — override vs hiding (shadowing)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;

class Base {
public:
    virtual void virtualFunc() { std::cout &lt;&lt; "Base::virtualFunc\n"; }
    void nonVirtualFunc()      { std::cout &lt;&lt; "Base::nonVirtualFunc\n"; }
};

class Derived : public Base {
public:
    // OVERRIDING — virtual function, correct dispatch at runtime
    void virtualFunc() override { std::cout &lt;&lt; "Derived::virtualFunc\n"; }

    // HIDING — non-virtual function, static dispatch at compile time
    void nonVirtualFunc() { std::cout &lt;&lt; "Derived::nonVirtualFunc\n"; }
};

int main() {
    Derived d;
    Base* ptr = &amp;d;

    ptr-&gt;virtualFunc();    // Derived::virtualFunc  (runtime dispatch ✅)
    ptr-&gt;nonVirtualFunc(); // Base::nonVirtualFunc  (compile-time, hidden! ⚠️)

    d.virtualFunc();       // Derived::virtualFunc
    d.nonVirtualFunc();    // Derived::nonVirtualFunc

    // Calling hidden base version explicitly
    d.Base::nonVirtualFunc();  // Base::nonVirtualFunc
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">10</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why is virtual destructor important?</h4><p>Without a virtual destructor, deleting a Derived object via a Base pointer calls only Base::~Base() — the Derived destructor is skipped, causing resource leaks and undefined behaviour. Always declare the base destructor <code>virtual</code> if the class has any virtual methods.</p></div>
    <div class="faq-item"><h4>Q2: What is the diamond problem?</h4><p>When two intermediate base classes share a common ancestor, the most-derived class inherits two copies of the common ancestor's data. Solved with <code>virtual</code> inheritance: <code>class B : virtual public A {}</code> — only one shared copy of A is maintained.</p></div>
    <div class="faq-item"><h4>Q3: Can a constructor be virtual?</h4><p>No. Constructors cannot be virtual because the vtable is set up during construction — the object's type isn't fully formed until the constructor completes. Use the Factory Method pattern as an alternative.</p></div>
    <div class="faq-item"><h4>Q4: What is vtable overhead?</h4><p>Each polymorphic class has one vtable (static, shared). Each object of that class carries one hidden vptr (8 bytes on 64-bit). Virtual calls add one pointer dereference — negligible in almost all applications.</p></div>
    <div class="faq-item"><h4>Q5: What does the final keyword do?</h4><p><code>class Square final : public Rectangle</code> prevents any further class from inheriting from Square. <code>void area() const final</code> prevents any derived class from further overriding that virtual function. Enables compiler devirtualization optimizations.</p></div>
  </div>
</div>`;

makeCppLesson(11,
  '11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html',
  'C++ Inheritance, Virtual Functions & Runtime Polymorphism Masterclass',
  'Exhaustive textbook-grade C++ Inheritance (Phase 11): base/derived classes, public/protected/private inheritance, single/multiple/multilevel/hierarchical inheritance, virtual functions, vtable, pure virtual, abstract classes, virtual destructor, upcasting, dynamic_cast, and composition vs inheritance.',
  'Phase 11', 'Inheritance & Polymorphism',
  'Base & Derived · Inheritance Types · Multiple Inheritance · Virtual Functions · vtable · Pure Virtual · Abstract Classes · Virtual Destructor · Upcasting & Downcasting · dynamic_cast · Composition vs Inheritance',
  l11,
  '10-cpp-constructors-destructors-rule-of-five-and-raii.html', '10. Constructors, Destructors, Rule of 5 & RAII',
  '12-cpp-operator-overloading-friend-functions-and-stream-operators.html', '12. Operator Overloading, Friend Functions & Streams');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 12: Operator Overloading
// ═══════════════════════════════════════════════════════════════════════════════
const l12 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 12 (Chapter 12): C++ Operator Overloading Masterclass</strong>! Operator overloading is defining the behavior of built-in operators (<code>+</code>, <code>-</code>, <code>*</code>, <code>==</code>, <code>&lt;&lt;</code>, <code>[]</code>, <code>()</code>, etc.) for user-defined types. This makes your classes feel as natural and expressive as built-in types — it's how <code>std::string</code>, <code>std::vector</code>, <code>std::complex</code>, and smart pointers work internally.</p>
</div>

<div class="section-title"><span class="num">1</span>What is Operator Overloading?</div>
<div class="section-body">
  <p class="text-prose">When you write <code>a + b</code> where <code>a</code> and <code>b</code> are objects of your class, the compiler looks for a function named <code>operator+</code> that accepts those types. You define that function to specify what <code>+</code> means for your type.</p>
  <div class="concept-box">
    <h4>Operator Overloading Rules:</h4>
    <p>• You CANNOT create new operators. Only existing C++ operators can be overloaded.</p>
    <p>• You CANNOT change operator precedence or associativity.</p>
    <p>• You CANNOT change operator arity (unary stays unary, binary stays binary).</p>
    <p>• At least one operand must be a user-defined type — you can't overload <code>int + int</code>.</p>
    <p>• These operators CANNOT be overloaded: <code>::</code> <code>.</code> <code>.*</code> <code>?:</code> <code>sizeof</code> <code>alignof</code> <code>typeid</code>.</p>
  </div>
  <table class="tbl spec-table">
    <thead><tr><th>Operator</th><th>Recommend As</th><th>Return Type</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td><code>+</code>, <code>-</code>, <code>*</code>, <code>/</code></td><td>Non-member / friend</td><td><code>T</code> (new object)</td><td>Symmetric — enables both sides to convert</td></tr>
      <tr><td><code>+=</code>, <code>-=</code>, <code>*=</code></td><td>Member</td><td><code>T&amp;</code> (self)</td><td>Modify in-place, return *this</td></tr>
      <tr><td><code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code></td><td>Non-member / friend</td><td><code>bool</code></td><td>Symmetric comparison</td></tr>
      <tr><td><code>=</code></td><td>Member ONLY</td><td><code>T&amp;</code> (self)</td><td>Copy assignment — check self-assignment!</td></tr>
      <tr><td><code>[]</code></td><td>Member ONLY</td><td><code>T&amp;</code> and <code>const T&amp;</code></td><td>Provide both const and non-const overloads</td></tr>
      <tr><td><code>()</code></td><td>Member</td><td>Anything</td><td>Function call operator — makes class callable</td></tr>
      <tr><td><code>&lt;&lt;</code>, <code>&gt;&gt;</code></td><td>Non-member friend</td><td><code>std::ostream&amp;</code></td><td>Stream operators — lhs is stream, not object</td></tr>
      <tr><td><code>++</code>, <code>--</code> prefix</td><td>Member</td><td><code>T&amp;</code></td><td>No parameters</td></tr>
      <tr><td><code>++</code>, <code>--</code> postfix</td><td>Member</td><td><code>T</code> (copy)</td><td>Dummy int parameter to distinguish</td></tr>
      <tr><td><code>-&gt;</code>, <code>*</code></td><td>Member</td><td><code>T*</code>, <code>T&amp;</code></td><td>Smart pointer semantics</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Complete Complex Number Class</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Complex Number with Full Operator Suite</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;cmath&gt;
#include &lt;string&gt;
#include &lt;sstream&gt;

class Complex {
    double real_, imag_;
public:
    Complex(double r = 0.0, double i = 0.0) : real_{r}, imag_{i} {}

    // Accessors
    double real() const { return real_; }
    double imag() const { return imag_; }
    double magnitude() const { return std::sqrt(real_*real_ + imag_*imag_); }
    double argument()  const { return std::atan2(imag_, real_); }

    // ─── Arithmetic (member) ──────────────────────────────────────────────
    Complex operator+(const Complex&amp; rhs) const {
        return {real_ + rhs.real_, imag_ + rhs.imag_};
    }
    Complex operator-(const Complex&amp; rhs) const {
        return {real_ - rhs.real_, imag_ - rhs.imag_};
    }
    Complex operator*(const Complex&amp; rhs) const {
        // (a+bi)(c+di) = (ac-bd) + (ad+bc)i
        return {real_*rhs.real_ - imag_*rhs.imag_,
                real_*rhs.imag_ + imag_*rhs.real_};
    }
    Complex operator/(const Complex&amp; rhs) const {
        double denom = rhs.real_*rhs.real_ + rhs.imag_*rhs.imag_;
        return {(real_*rhs.real_ + imag_*rhs.imag_) / denom,
                (imag_*rhs.real_ - real_*rhs.imag_) / denom};
    }

    // ─── Unary operators ──────────────────────────────────────────────────
    Complex operator-() const { return {-real_, -imag_}; }       // negation
    Complex operator+() const { return *this; }                   // unary +
    Complex conjugate() const { return {real_, -imag_}; }

    // ─── Compound assignment ──────────────────────────────────────────────
    Complex&amp; operator+=(const Complex&amp; rhs) { real_ += rhs.real_; imag_ += rhs.imag_; return *this; }
    Complex&amp; operator-=(const Complex&amp; rhs) { real_ -= rhs.real_; imag_ -= rhs.imag_; return *this; }
    Complex&amp; operator*=(const Complex&amp; rhs) { *this = *this * rhs; return *this; }

    // ─── Comparison ───────────────────────────────────────────────────────
    bool operator==(const Complex&amp; rhs) const {
        return std::abs(real_ - rhs.real_) &lt; 1e-10 &amp;&amp;
               std::abs(imag_ - rhs.imag_) &lt; 1e-10;
    }
    bool operator!=(const Complex&amp; rhs) const { return !(*this == rhs); }

    // ─── Conversion to string ─────────────────────────────────────────────
    explicit operator std::string() const {
        std::ostringstream oss;
        oss &lt;&lt; real_;
        if (imag_ &gt;= 0) oss &lt;&lt; "+";
        oss &lt;&lt; imag_ &lt;&lt; "i";
        return oss.str();
    }

    // ─── Conversion to bool (is non-zero?) ───────────────────────────────
    explicit operator bool() const { return magnitude() &gt; 1e-10; }

    // ─── Stream operators (friend — non-member) ───────────────────────────
    friend std::ostream&amp; operator&lt;&lt;(std::ostream&amp; os, const Complex&amp; c) {
        os &lt;&lt; c.real_;
        if (c.imag_ &gt;= 0) os &lt;&lt; "+";
        os &lt;&lt; c.imag_ &lt;&lt; "i";
        return os;
    }
    friend std::istream&amp; operator&gt;&gt;(std::istream&amp; is, Complex&amp; c) {
        is &gt;&gt; c.real_ &gt;&gt; c.imag_;
        return is;
    }

    // ─── Scalar multiplication (friend: both sides) ───────────────────────
    friend Complex operator*(double scalar, const Complex&amp; c) {
        return {scalar * c.real_, scalar * c.imag_};
    }
    friend Complex operator*(const Complex&amp; c, double scalar) {
        return {c.real_ * scalar, c.imag_ * scalar};
    }
};

int main() {
    Complex a{3.0, 4.0};
    Complex b{1.0, -2.0};

    std::cout &lt;&lt; "a         = " &lt;&lt; a &lt;&lt; "\n";
    std::cout &lt;&lt; "b         = " &lt;&lt; b &lt;&lt; "\n";
    std::cout &lt;&lt; "a + b     = " &lt;&lt; (a + b) &lt;&lt; "\n";
    std::cout &lt;&lt; "a - b     = " &lt;&lt; (a - b) &lt;&lt; "\n";
    std::cout &lt;&lt; "a * b     = " &lt;&lt; (a * b) &lt;&lt; "\n";
    std::cout &lt;&lt; "a / b     = " &lt;&lt; (a / b) &lt;&lt; "\n";
    std::cout &lt;&lt; "-a        = " &lt;&lt; (-a) &lt;&lt; "\n";
    std::cout &lt;&lt; "conj(a)   = " &lt;&lt; a.conjugate() &lt;&lt; "\n";
    std::cout &lt;&lt; "|a|       = " &lt;&lt; a.magnitude() &lt;&lt; "\n";
    std::cout &lt;&lt; "2.5 * a   = " &lt;&lt; (2.5 * a) &lt;&lt; "\n";
    std::cout &lt;&lt; "a == a    = " &lt;&lt; std::boolalpha &lt;&lt; (a == a) &lt;&lt; "\n";
    std::cout &lt;&lt; "a == b    = " &lt;&lt; (a == b) &lt;&lt; "\n";

    Complex c = a;
    c += b;
    std::cout &lt;&lt; "a += b    = " &lt;&lt; c &lt;&lt; "\n";

    if (a) std::cout &lt;&lt; "a is non-zero\n";
    Complex zero{0, 0};
    if (!zero) std::cout &lt;&lt; "zero is zero\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Vector2D with Prefix/Postfix Increment &amp; Index Operator</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — prefix/postfix ++/--, operator[], operator()</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;cmath&gt;

class Vector2D {
    double x_, y_;
public:
    Vector2D(double x = 0, double y = 0) : x_{x}, y_{y} {}

    // ─── Index operator (bounds-checked) ─────────────────────────────────
    double&amp; operator[](int idx) {
        if (idx == 0) return x_;
        if (idx == 1) return y_;
        throw std::out_of_range("Vector2D index must be 0 or 1");
    }
    const double&amp; operator[](int idx) const {
        if (idx == 0) return x_;
        if (idx == 1) return y_;
        throw std::out_of_range("Vector2D index must be 0 or 1");
    }

    // ─── Function call operator ───────────────────────────────────────────
    double operator()(double scale) const {
        return std::sqrt(x_*x_ + y_*y_) * scale;
    }

    // ─── Prefix ++ (increment both components, return reference) ─────────
    Vector2D&amp; operator++() { ++x_; ++y_; return *this; }
    Vector2D&amp; operator--() { --x_; --y_; return *this; }

    // ─── Postfix ++ (save copy, increment, return old copy) ──────────────
    Vector2D operator++(int) { Vector2D old = *this; ++(*this); return old; }
    Vector2D operator--(int) { Vector2D old = *this; --(*this); return old; }

    // ─── Arithmetic ───────────────────────────────────────────────────────
    Vector2D operator+(const Vector2D&amp; o) const { return {x_+o.x_, y_+o.y_}; }
    Vector2D&amp; operator+=(const Vector2D&amp; o) { x_+=o.x_; y_+=o.y_; return *this; }

    // ─── Comparison ───────────────────────────────────────────────────────
    bool operator==(const Vector2D&amp; o) const { return x_==o.x_ &amp;&amp; y_==o.y_; }
    bool operator&lt;(const Vector2D&amp; o) const {
        return (x_*x_+y_*y_) &lt; (o.x_*o.x_+o.y_*o.y_);  // compare by magnitude
    }

    double magnitude() const { return std::sqrt(x_*x_ + y_*y_); }

    friend std::ostream&amp; operator&lt;&lt;(std::ostream&amp; os, const Vector2D&amp; v) {
        return os &lt;&lt; "(" &lt;&lt; v.x_ &lt;&lt; ", " &lt;&lt; v.y_ &lt;&lt; ")";
    }
};

int main() {
    Vector2D v{3.0, 4.0};
    std::cout &lt;&lt; "v        = " &lt;&lt; v &lt;&lt; "\n";
    std::cout &lt;&lt; "v[0]     = " &lt;&lt; v[0] &lt;&lt; " (x)\n";
    std::cout &lt;&lt; "v[1]     = " &lt;&lt; v[1] &lt;&lt; " (y)\n";
    v[0] = 6.0;  // modify via index operator
    std::cout &lt;&lt; "v after v[0]=6: " &lt;&lt; v &lt;&lt; "\n";

    std::cout &lt;&lt; "v(2.0)   = " &lt;&lt; v(2.0) &lt;&lt; " (magnitude*2)\n";  // function call op

    Vector2D a{1.0, 1.0};
    std::cout &lt;&lt; "pre ++a  = " &lt;&lt; ++a &lt;&lt; "\n";  // (2,2) — incremented first
    std::cout &lt;&lt; "post a++ = " &lt;&lt; a++ &lt;&lt; "\n";  // (2,2) — old value returned
    std::cout &lt;&lt; "after a++=  " &lt;&lt; a &lt;&lt; "\n";  // (3,3)
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>C++20 Spaceship Operator &lt;=&gt;</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Spaceship operator, auto-generated comparisons</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;compare&gt;
#include &lt;string&gt;

struct Student {
    std::string name;
    double gpa;
    int rollNo;

    // C++20: ONE definition generates ALL 6 comparison operators
    // strong_ordering: == != &lt; &lt;= &gt; &gt;=
    auto operator&lt;=&gt;(const Student&amp; other) const {
        if (auto cmp = other.gpa &lt;=&gt; gpa; cmp != 0) return cmp;  // sort by gpa DESC
        return name &lt;=&gt; other.name;   // then alphabetically
    }
    bool operator==(const Student&amp; other) const = default;
};

int main() {
    Student s1{"Alice", 9.2, 101};
    Student s2{"Bob",   8.7, 102};
    Student s3{"Charlie", 9.2, 103};

    // All 6 comparison operators auto-generated!
    std::cout &lt;&lt; "s1 &gt; s2 (GPA): " &lt;&lt; std::boolalpha &lt;&lt; (s1 &gt; s2) &lt;&lt; "\n";
    std::cout &lt;&lt; "s1 &lt; s2:       " &lt;&lt; (s1 &lt; s2) &lt;&lt; "\n";
    std::cout &lt;&lt; "s1 == s3:      " &lt;&lt; (s1 == s3) &lt;&lt; "\n";
    std::cout &lt;&lt; "s1 &lt;= s3:      " &lt;&lt; (s1 &lt;= s3) &lt;&lt; "\n";  // same GPA, compare names

    // Works with std::sort, std::map keys automatically
    std::vector&lt;Student&gt; students{s2, s1, s3};
    std::sort(students.begin(), students.end());
    std::cout &lt;&lt; "\nSorted (by GPA desc, then name):\n";
    for (const auto&amp; s : students)
        std::cout &lt;&lt; "  " &lt;&lt; s.name &lt;&lt; " GPA=" &lt;&lt; s.gpa &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why should operator+ be non-member?</h4><p>If <code>operator+</code> is a member of class <code>T</code>, only objects where T is on the left side can trigger conversion. As a non-member friend, both sides can undergo implicit conversion — <code>2.0 + myComplex</code> works.</p></div>
    <div class="faq-item"><h4>Q2: What return type should operator= have?</h4><p>Always return <code>T&amp;</code> (reference to *this). This enables chained assignment: <code>a = b = c = 5;</code>. Check for self-assignment (<code>if (this == &amp;rhs) return *this;</code>) to prevent corrupting data.</p></div>
    <div class="faq-item"><h4>Q3: Why does postfix ++ take a dummy int parameter?</h4><p>C++ distinguishes prefix and postfix overloads by the parameter list: prefix has no parameters, postfix takes a dummy <code>int</code>. The compiler passes 0 for the dummy — you never use it.</p></div>
    <div class="faq-item"><h4>Q4: Can I overload the comma operator?</h4><p>Technically yes, but STRONGLY avoid it. Overloaded <code>,</code> doesn't guarantee left-to-right evaluation order with sequencing semantics — breaking code that relies on operator comma's special behavior.</p></div>
    <div class="faq-item"><h4>Q5: What is the operator() (function call operator) used for?</h4><p><code>operator()</code> makes objects callable (functors). Used for predicates in STL algorithms, policy objects, callbacks, and stateful function objects. Lambdas generate a class with <code>operator()</code> internally.</p></div>
  </div>
</div>`;

makeCppLesson(12,
  '12-cpp-operator-overloading-friend-functions-and-stream-operators.html',
  'C++ Operator Overloading, Friend Functions & Stream Operators Masterclass',
  'Exhaustive textbook-grade C++ Operator Overloading (Phase 12): arithmetic, compound assignment, comparison, stream insertion/extraction, prefix/postfix increment, index operator, function call operator, friend functions, conversion operators, and C++20 spaceship operator.',
  'Phase 12', 'Operator Overloading',
  'Operator Rules & Limitations · Complex Number Class · +/-/*// Operators · Compound Assignment · == != < > Comparison · Stream << >> Operators · prefix/postfix ++ · operator[] & () · C++20 Spaceship <=>',
  l12,
  '11-cpp-inheritance-virtual-functions-and-runtime-polymorphism.html', '11. Inheritance, Virtual Functions & Runtime Polymorphism',
  '13-cpp-templates-function-class-specialization-and-concepts.html', '13. Templates, Specialization, Variadic & Concepts');

console.log('\n✅ Phases 11-12 done. Writing phases 13-21...\n');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 13-21 — Full content (reusing expanded versions from before but bigger)
// ═══════════════════════════════════════════════════════════════════════════════
// (Reload all others from separate expanded file)
const phases13to21 = require('./generate_cpp_phases_13_21_content.js');
phases13to21.forEach(p => makeCppLesson(...p));

console.log('\n🎉 ALL PHASES 11–21 GENERATED WITH EXPANDED CONTENT!');
