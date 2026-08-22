const fs = require('fs');
const path = require('path');
const { wrapCppPage } = require('./build_cpp_10_phases_master.js');

const cppDir = path.join(__dirname, '..', 'public', 'blog-cpp');
console.log('🚀 Generating C++ Phases 17–21 — FULLY EXPANDED TEXTBOOK...');

function makeCppLesson(num, file, title, desc, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle) {
  fs.writeFileSync(path.join(cppDir, file),
    wrapCppPage(title, desc, file, num, phaseTag, phaseTitle, subtopics, content, prev, prevTitle, next, nextTitle),
    'utf8');
  const kb = Math.round(fs.statSync(path.join(cppDir, file)).size / 1024);
  console.log('  ✅ ' + file + ' (' + kb + 'KB)');
}

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 17: Smart Pointers & Memory Management
// ═══════════════════════════════════════════════════════════════════════════════
const l17 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 17 (Chapter 17): C++ Smart Pointers &amp; Memory Management Masterclass</strong>! Modern C++ eliminates manual <code>new/delete</code> through RAII-based smart pointers. <code>std::unique_ptr</code> for exclusive ownership, <code>std::shared_ptr</code> for shared reference-counted ownership, and <code>std::weak_ptr</code> for non-owning observation. Together they make memory-safe, leak-free C++ achievable without a garbage collector.</p>
</div>

<div class="section-title"><span class="num">1</span>Stack vs Heap — Memory Model</div>
<div class="section-body">
  <div class="memory-diagram">C++ Memory Layout:

  ┌──────────────────────────────────────────────────┐
  │  TEXT  (code / executable instructions)          │
  ├──────────────────────────────────────────────────┤
  │  DATA  (global/static initialized variables)     │
  ├──────────────────────────────────────────────────┤
  │  BSS   (global/static uninitialized variables)   │
  ├──────────────────────────────────────────────────┤
  │  HEAP  (dynamic allocation via new/malloc)       │
  │        grows upward  ↑                           │
  │  ...                                             │
  │        grows downward ↓                          │
  │  STACK (local variables, function frames)        │
  └──────────────────────────────────────────────────┘

  STACK:                     HEAP:
  ✅ Automatic lifetime      ❌ Manual lifetime (new/delete)
  ✅ Very fast allocation    ✅ Large, flexible allocations
  ✅ No fragmentation        ⚠️ Fragmentation possible
  ⚠️ Limited size (~8MB)    ❌ Memory leaks if forgot delete</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Raw pointer problems</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt;

// ─── Memory leak example ────────────────────────────────────────────────────
void memoryLeakExample() {
    int* p = new int(42);
    // If we throw or return early — leak! delete never called
    if (true) return;   // <-- LEAK: p is lost!
    delete p;
}

// ─── Dangling pointer example ───────────────────────────────────────────────
int* danglingPointer() {
    int local = 42;
    return &amp;local;   // DANGER: local is destroyed when function returns!
}

// ─── Double deletion example ─────────────────────────────────────────────────
void doubleDeletion() {
    int* p = new int(99);
    delete p;
    // delete p;    // CRASH: undefined behaviour!
    p = nullptr;    // Good practice: null after delete
}

// ─── Exception-unsafe raw new ────────────────────────────────────────────────
void processData() {
    int* data = new int[1000];
    // ... some code that might throw ...
    // throw std::runtime_error("error!"); // <-- LEAK: data never deleted!
    delete[] data;   // not reached if exception thrown
}

// ─── The RAII solution: smart pointers ──────────────────────────────────────
// (covered in sections below)
</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>std::unique_ptr — Exclusive Single Ownership</div>
<div class="section-body">
  <div class="concept-box">
    <h4>unique_ptr Contract:</h4>
    <p>• Exactly ONE <code>unique_ptr</code> owns the resource at any time. Cannot be copied — only <strong>moved</strong>.</p>
    <p>• Resource is automatically destroyed when the <code>unique_ptr</code> goes out of scope (RAII).</p>
    <p>• <strong>Always</strong> create with <code>std::make_unique&lt;T&gt;(args)</code> — exception-safe and avoids raw <code>new</code>.</p>
    <p>• <strong>Zero overhead</strong> — same size and cost as a raw pointer at runtime.</p>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — unique_ptr: creation, ownership, arrays</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

class File {
    std::string path_;
    bool open_;
public:
    explicit File(std::string path) : path_{std::move(path)}, open_{true} {
        std::cout &lt;&lt; "Opened: " &lt;&lt; path_ &lt;&lt; "\n";
    }
    ~File() {
        if (open_) std::cout &lt;&lt; "Closed: " &lt;&lt; path_ &lt;&lt; "\n";
    }
    void write(const std::string&amp; data) {
        if (!open_) throw std::runtime_error("File not open!");
        std::cout &lt;&lt; path_ &lt;&lt; " &lt;&lt; " &lt;&lt; data &lt;&lt; "\n";
    }
    void close() { open_ = false; std::cout &lt;&lt; "Manually closed: " &lt;&lt; path_ &lt;&lt; "\n"; }
};

// Factory function returning unique_ptr
std::unique_ptr&lt;File&gt; openFile(const std::string&amp; path) {
    return std::make_unique&lt;File&gt;(path);  // RAII from the start
}

// Function that takes ownership (sink)
void processFile(std::unique_ptr&lt;File&gt; file) {
    file-&gt;write("Processing data...");
}  // file destroyed here automatically

// Function that borrows (non-owning reference)
void readFromFile(const File&amp; file) {
    std::cout &lt;&lt; "Reading from file\n";
}

// Function that uses (non-owning raw pointer)
void updateFile(File* file) {
    if (file) file-&gt;write("Updated!");
}

int main() {
    // Create with make_unique (ALWAYS prefer this!)
    auto f1 = std::make_unique&lt;File&gt;("data.txt");
    f1-&gt;write("Hello World");

    // Borrow without transferring ownership
    readFromFile(*f1);        // pass by reference
    updateFile(f1.get());     // get() returns raw pointer — non-owning!

    // Transfer ownership (move semantics)
    auto f2 = std::move(f1);  // f2 now owns the File
    if (!f1) std::cout &lt;&lt; "f1 is now null after move\n";
    f2-&gt;write("Written via f2");

    // Sink function — takes ownership, destroys at end of function
    processFile(std::move(f2));
    if (!f2) std::cout &lt;&lt; "f2 is null after move-to-sink\n";

    // Factory function
    auto logFile = openFile("server.log");
    logFile-&gt;write("Server started");

    // unique_ptr to array
    auto buffer = std::make_unique&lt;char[]&gt;(1024);
    buffer[0] = 'H'; buffer[1] = 'i'; buffer[2] = '\0';
    std::cout &lt;&lt; "buffer: " &lt;&lt; buffer.get() &lt;&lt; "\n";

    // Vector of unique_ptrs (polymorphic collection)
    std::vector&lt;std::unique_ptr&lt;File&gt;&gt; filePool;
    for (const std::string&amp; name : {"a.txt", "b.txt", "c.txt"}) {
        filePool.push_back(std::make_unique&lt;File&gt;(name));
    }
    for (auto&amp; f : filePool) f-&gt;write("batch write");

    return 0;
}  // All files automatically closed! ✅</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>std::shared_ptr — Shared Reference-Counted Ownership</div>
<div class="section-body">
  <div class="memory-diagram">shared_ptr Internal Layout:

  ┌─────────────────────┐      ┌──────────────────────────────┐
  │  shared_ptr&lt;T&gt; p1  │──┬──►│  Control Block (heap)        │
  └─────────────────────┘  │   │  use_count  = 2              │
                           │   │  weak_count = 1              │
  ┌─────────────────────┐  │   │  deleter                     │
  │  shared_ptr&lt;T&gt; p2  │──┘   └──────────────┬───────────────┘
  └─────────────────────┘                     │
                                              ▼
                                     ┌────────────────┐
                                     │ T object (heap)│
                                     └────────────────┘
  
  When use_count reaches 0 → object destroyed
  When weak_count also 0  → control block destroyed</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — shared_ptr: reference counting, use_count</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;string&gt;

class Database {
    std::string name_;
    int queryCount_{0};
public:
    explicit Database(std::string name) : name_{std::move(name)} {
        std::cout &lt;&lt; "DB '" &lt;&lt; name_ &lt;&lt; "' connected\n";
    }
    ~Database() { std::cout &lt;&lt; "DB '" &lt;&lt; name_ &lt;&lt; "' disconnected\n"; }

    void query(const std::string&amp; sql) {
        ++queryCount_;
        std::cout &lt;&lt; name_ &lt;&lt; " query #" &lt;&lt; queryCount_ &lt;&lt; ": " &lt;&lt; sql &lt;&lt; "\n";
    }
    int queryCount() const { return queryCount_; }
};

class UserService {
    std::shared_ptr&lt;Database&gt; db_;  // shared ownership
public:
    explicit UserService(std::shared_ptr&lt;Database&gt; db) : db_{std::move(db)} {}
    void getUser(int id) { db_-&gt;query("SELECT * FROM users WHERE id=" + std::to_string(id)); }
};

class OrderService {
    std::shared_ptr&lt;Database&gt; db_;
public:
    explicit OrderService(std::shared_ptr&lt;Database&gt; db) : db_{std::move(db)} {}
    void getOrders(int userId) { db_-&gt;query("SELECT * FROM orders WHERE user_id=" + std::to_string(userId)); }
};

int main() {
    // Shared database connection
    auto db = std::make_shared&lt;Database&gt;("PostgreSQL");
    std::cout &lt;&lt; "use_count after creation: " &lt;&lt; db.use_count() &lt;&lt; "\n";  // 1

    {
        UserService  userSvc{db};   // db shared with UserService
        OrderService orderSvc{db};  // db shared with OrderService
        std::cout &lt;&lt; "use_count with 2 services: " &lt;&lt; db.use_count() &lt;&lt; "\n";  // 3

        userSvc.getUser(42);
        orderSvc.getOrders(42);

        // Copy shared_ptr — increases ref count
        auto db2 = db;
        auto db3 = db;
        std::cout &lt;&lt; "use_count with copies: " &lt;&lt; db.use_count() &lt;&lt; "\n";  // 5

        db2.reset();  // release one owner
        std::cout &lt;&lt; "after db2.reset: " &lt;&lt; db.use_count() &lt;&lt; "\n";  // 4
    }  // userSvc, orderSvc, db3 destroyed — ref count decreases
    std::cout &lt;&lt; "use_count after scope: " &lt;&lt; db.use_count() &lt;&lt; "\n";   // 1

    // Aliasing constructor — shared_ptr to a member of an object
    struct Config { int timeout = 30; std::string host = "localhost"; };
    auto config = std::make_shared&lt;Config&gt;();
    // shared_ptr to the host member — shares ownership of the whole Config!
    std::shared_ptr&lt;std::string&gt; hostPtr(config, &amp;config-&gt;host);
    std::cout &lt;&lt; "host: " &lt;&lt; *hostPtr &lt;&lt; " config use_count: " &lt;&lt; config.use_count() &lt;&lt; "\n";
    config.reset();  // Config survives because hostPtr still holds it!
    std::cout &lt;&lt; "host after config.reset: " &lt;&lt; *hostPtr &lt;&lt; "\n";

    return 0;
}  // DB disconnected here (use_count hits 0) ✅</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>std::weak_ptr — Breaking Cyclic References</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — weak_ptr: observe without owning, cycle fix</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;string&gt;
#include &lt;vector&gt;

// ─── Cycle with shared_ptr (MEMORY LEAK!) ────────────────────────────────────
struct BadNode {
    int val;
    std::shared_ptr&lt;BadNode&gt; next;  // strong reference
    std::shared_ptr&lt;BadNode&gt; prev;  // strong reference ← CYCLE!
    explicit BadNode(int v) : val{v} { std::cout &lt;&lt; "BadNode " &lt;&lt; v &lt;&lt; " created\n"; }
    ~BadNode() { std::cout &lt;&lt; "BadNode " &lt;&lt; val &lt;&lt; " destroyed\n"; }
};

// ─── Fix with weak_ptr (NO LEAK!) ────────────────────────────────────────────
struct GoodNode {
    int val;
    std::shared_ptr&lt;GoodNode&gt; next;   // strong — keeps next alive
    std::weak_ptr&lt;GoodNode&gt;   prev;   // weak — doesn't prevent destruction!
    explicit GoodNode(int v) : val{v} { std::cout &lt;&lt; "GoodNode " &lt;&lt; v &lt;&lt; " created\n"; }
    ~GoodNode() { std::cout &lt;&lt; "GoodNode " &lt;&lt; val &lt;&lt; " destroyed\n"; }
};

// ─── Observer pattern with weak_ptr ──────────────────────────────────────────
class EventEmitter;

class EventListener {
    std::string name_;
public:
    explicit EventListener(std::string name) : name_{std::move(name)} {}
    void onEvent(const std::string&amp; event) {
        std::cout &lt;&lt; name_ &lt;&lt; " received: " &lt;&lt; event &lt;&lt; "\n";
    }
    ~EventListener() { std::cout &lt;&lt; name_ &lt;&lt; " destroyed\n"; }
};

class EventEmitter {
    std::vector&lt;std::weak_ptr&lt;EventListener&gt;&gt; listeners_;
public:
    void subscribe(std::weak_ptr&lt;EventListener&gt; listener) {
        listeners_.push_back(std::move(listener));
    }
    void emit(const std::string&amp; event) {
        // Use lock() to safely access the listener
        auto it = listeners_.begin();
        while (it != listeners_.end()) {
            if (auto listener = it-&gt;lock()) {   // still alive?
                listener-&gt;onEvent(event);
                ++it;
            } else {
                std::cout &lt;&lt; "(removing dead listener)\n";
                it = listeners_.erase(it);      // auto-remove dead listeners!
            }
        }
    }
};

int main() {
    // CYCLE DEMO — leak
    std::cout &lt;&lt; "=== Cycle with shared_ptr (LEAK) ===\n";
    {
        auto n1 = std::make_shared&lt;BadNode&gt;(1);
        auto n2 = std::make_shared&lt;BadNode&gt;(2);
        n1-&gt;next = n2;  // n1 holds n2
        n2-&gt;prev = n1;  // n2 holds n1 ← CYCLE
        // n1 and n2 use_count = 2 each — never reaches 0!
    }  // LEAK — destructors never called!
    std::cout &lt;&lt; "(should have seen 'destroyed' — but didn't!)\n\n";

    // FIX — no leak
    std::cout &lt;&lt; "=== Fix with weak_ptr (NO LEAK) ===\n";
    {
        auto n1 = std::make_shared&lt;GoodNode&gt;(1);
        auto n2 = std::make_shared&lt;GoodNode&gt;(2);
        n1-&gt;next = n2;     // strong: n1→n2
        n2-&gt;prev = n1;     // weak: n2 observes n1 (doesn't prevent destruction)
    }  // n1 destroyed (use_count 1→0), then n2 ✅

    // Observer pattern
    std::cout &lt;&lt; "\n=== Observer Pattern ===\n";
    EventEmitter emitter;
    auto l1 = std::make_shared&lt;EventListener&gt;("Logger");
    auto l2 = std::make_shared&lt;EventListener&gt;("Analytics");
    emitter.subscribe(l1);
    emitter.subscribe(l2);
    emitter.emit("user_login");

    l2.reset();  // unsubscribe by destroying listener
    std::cout &lt;&lt; "After l2 reset:\n";
    emitter.emit("user_logout");  // Analytics auto-removed!
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Custom Deleters &amp; Smart Pointer Passing Guidelines</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Custom deleters, file/socket management</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;cstdio&gt;
#include &lt;functional&gt;

// ─── RAII file handle with custom deleter ────────────────────────────────────
struct FileDeleter {
    void operator()(FILE* f) const {
        if (f) { std::fclose(f); std::cout &lt;&lt; "FILE closed by custom deleter\n"; }
    }
};

using FileHandle = std::unique_ptr&lt;FILE, FileDeleter&gt;;

FileHandle openRawFile(const char* path, const char* mode) {
    FILE* f = std::fopen(path, mode);
    if (!f) throw std::runtime_error(std::string("Cannot open: ") + path);
    return FileHandle{f};
}

// ─── Lambda deleter ───────────────────────────────────────────────────────────
auto makeBuffer(std::size_t size) {
    return std::unique_ptr&lt;char[], std::function&lt;void(char*)&gt;&gt;(
        new char[size],
        [size](char* p) {
            std::cout &lt;&lt; "Freeing buffer of " &lt;&lt; size &lt;&lt; " bytes\n";
            delete[] p;
        }
    );
}

// ─── Passing smart pointers — guideline table ─────────────────────────────────
void borrowObject(const std::string&amp; s) {           // just borrows — raw ref
    std::cout &lt;&lt; "borrowing: " &lt;&lt; s &lt;&lt; "\n";
}
void sinkObject(std::unique_ptr&lt;std::string&gt; s) {  // takes ownership
    std::cout &lt;&lt; "sinking: " &lt;&lt; *s &lt;&lt; "\n";
}  // destroyed here
void sharedAccess(std::shared_ptr&lt;std::string&gt; s) { // shares ownership
    std::cout &lt;&lt; "shared: " &lt;&lt; *s &lt;&lt; " refcount=" &lt;&lt; s.use_count() &lt;&lt; "\n";
}
void weakAccess(std::weak_ptr&lt;std::string&gt; w) {    // optional access
    if (auto p = w.lock()) std::cout &lt;&lt; "weak: " &lt;&lt; *p &lt;&lt; "\n";
    else std::cout &lt;&lt; "object expired!\n";
}

int main() {
    // Custom deleter for FILE
    try {
        auto f = openRawFile("test_output.txt", "w");
        std::fputs("Hello from smart FILE!\n", f.get());
        // f automatically closed when scope ends
    } catch (const std::exception&amp; e) {
        std::cout &lt;&lt; "File error (OK if no permission): " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // Lambda deleter
    auto buf = makeBuffer(256);
    buf[0] = 'A'; buf[1] = '\0';
    std::cout &lt;&lt; "buf[0] = " &lt;&lt; buf[0] &lt;&lt; "\n";

    // Passing patterns
    auto up = std::make_unique&lt;std::string&gt;("Hello");
    borrowObject(*up);                   // borrow by reference
    sinkObject(std::move(up));           // transfer ownership (up becomes null)
    if (!up) std::cout &lt;&lt; "up is null after sink\n";

    auto sp = std::make_shared&lt;std::string&gt;("World");
    sharedAccess(sp);                    // share (ref count increases temporarily)
    weakAccess(sp);                      // weak access while alive
    sp.reset();
    weakAccess(std::weak_ptr&lt;std::string&gt;{}); // expired!
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Rule of Zero &amp; enable_shared_from_this</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Rule of Zero, enable_shared_from_this</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;string&gt;

// Rule of Zero: if you use smart pointers and STL containers to manage
// all resources, you don't need to write ANY of the 5 special members!
class SmartEmployee {
    std::string name_;
    std::vector&lt;std::string&gt; skills_;
    std::unique_ptr&lt;std::string&gt; biography_;  // unique resource
public:
    SmartEmployee(std::string name, std::string bio)
        : name_{std::move(name)}, biography_{std::make_unique&lt;std::string&gt;(std::move(bio))} {}

    void addSkill(std::string skill) { skills_.push_back(std::move(skill)); }
    void print() const {
        std::cout &lt;&lt; "Employee: " &lt;&lt; name_ &lt;&lt; "\n";
        std::cout &lt;&lt; "Bio: " &lt;&lt; *biography_ &lt;&lt; "\n";
        std::cout &lt;&lt; "Skills: ";
        for (const auto&amp; s : skills_) std::cout &lt;&lt; s &lt;&lt; " ";
        std::cout &lt;&lt; "\n";
    }
    // No need to write: destructor, copy/move constructors, copy/move assignment!
    // unique_ptr automatically makes this class move-only (non-copyable)
};

// enable_shared_from_this — safe shared_ptr from within the object
class Worker : public std::enable_shared_from_this&lt;Worker&gt; {
    std::string task_;
public:
    explicit Worker(std::string task) : task_{std::move(task)} {}
    std::shared_ptr&lt;Worker&gt; getSelf() {
        return shared_from_this();  // safe — returns shared_ptr to this
        // return std::shared_ptr&lt;Worker&gt;(this); // WRONG — creates separate ownership!
    }
    void run() { std::cout &lt;&lt; "Running task: " &lt;&lt; task_ &lt;&lt; "\n"; }
    ~Worker() { std::cout &lt;&lt; "Worker '" &lt;&lt; task_ &lt;&lt; "' done\n"; }
};

int main() {
    // Rule of Zero demo
    SmartEmployee emp{"Alice", "Senior developer with 10 years experience"};
    emp.addSkill("C++20");
    emp.addSkill("RAII");
    emp.addSkill("Templates");
    emp.print();

    // enable_shared_from_this
    auto w1 = std::make_shared&lt;Worker&gt;("compile");
    auto w2 = w1-&gt;getSelf();  // both point to same Worker
    w1-&gt;run();
    std::cout &lt;&lt; "Same object: " &lt;&lt; (w1.get() == w2.get()) &lt;&lt; "\n";  // true
    std::cout &lt;&lt; "use_count: " &lt;&lt; w1.use_count() &lt;&lt; "\n";             // 2
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">7</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why make_unique/make_shared instead of new?</h4><p>Exception safety: <code>f(unique_ptr&lt;T&gt;(new T), g())</code> could leak if <code>g()</code> throws between the <code>new</code> and smart pointer construction (pre-C++17). <code>make_unique&lt;T&gt;()</code> is atomic — no such risk. Also cleaner and avoids repeating the type.</p></div>
    <div class="faq-item"><h4>Q2: What is the overhead of shared_ptr vs unique_ptr?</h4><p><code>unique_ptr</code> has zero overhead — same as raw pointer. <code>shared_ptr</code> carries a second pointer (control block with ref counts) and uses atomic increments/decrements for thread safety — meaningful overhead in tight loops.</p></div>
    <div class="faq-item"><h4>Q3: What is a cyclic reference and how does weak_ptr fix it?</h4><p>When A holds <code>shared_ptr&lt;B&gt;</code> and B holds <code>shared_ptr&lt;A&gt;</code>, both ref-counts never reach 0 — memory leaked forever. Break one direction with <code>weak_ptr</code> — it observes without owning, allowing proper destruction.</p></div>
    <div class="faq-item"><h4>Q4: Is shared_ptr thread-safe?</h4><p>The ref-count management (copy/destruction of shared_ptr) is thread-safe. However, the <em>pointed-to object</em> is NOT protected — concurrent access to the object still requires a mutex.</p></div>
    <div class="faq-item"><h4>Q5: What is enable_shared_from_this?</h4><p>When a member function needs to return a <code>shared_ptr</code> to itself (<code>this</code>), it can't call <code>shared_ptr&lt;T&gt;(this)</code> — that creates a second independent ownership chain. Inheriting from <code>enable_shared_from_this&lt;T&gt;</code> and calling <code>shared_from_this()</code> safely returns a sharing copy of the existing shared_ptr.</p></div>
  </div>
</div>`;

makeCppLesson(17,
  '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html',
  'C++ Smart Pointers: unique_ptr, shared_ptr, weak_ptr & RAII Memory Complete Masterclass',
  'Exhaustive textbook-grade C++ Smart Pointers (Phase 17): memory model (stack vs heap), raw pointer problems, unique_ptr with factory/sink/borrow patterns, shared_ptr with control block, weak_ptr cycle fix, observer pattern, custom deleters, Rule of Zero, and enable_shared_from_this.',
  'Phase 17', 'Smart Pointers & Memory',
  'Stack vs Heap Layout · Raw Pointer Problems · unique_ptr & make_unique · Ownership Transfer & Move · Sink/Borrow Patterns · shared_ptr & use_count · Control Block · Aliasing Constructor · weak_ptr & Cycles · Observer Pattern · Custom Deleters · Rule of Zero · enable_shared_from_this',
  l17,
  '16-cpp-lambda-expressions-captures-std-function-and-closures.html', '16. Lambdas, Captures, std::function & Closures',
  '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html', '18. try, catch, throw, Custom Exceptions & Safety');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 18: Exception Handling
// ═══════════════════════════════════════════════════════════════════════════════
const l18 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 18 (Chapter 18): C++ Exception Handling Masterclass</strong>! Exceptions provide a structured, type-safe mechanism for error propagation. Unlike C-style error codes that can be silently ignored, exceptions are impossible to ignore — the program terminates if an exception isn't caught. Combined with RAII, exceptions enable leak-free, robust error handling across entire call stacks.</p>
</div>

<div class="section-title"><span class="num">1</span>try, catch, throw — Complete Syntax</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — try, catch, throw, re-throw</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;string&gt;

// Function that throws
double safeDivide(double a, double b) {
    if (b == 0.0)
        throw std::invalid_argument("Division by zero is undefined!");
    if (a &lt; 0 || b &lt; 0)
        throw std::domain_error("Negative operands not allowed here");
    return a / b;
}

// Re-throwing example
void processValue(double x) {
    try {
        auto result = safeDivide(100.0, x);
        std::cout &lt;&lt; "100 / " &lt;&lt; x &lt;&lt; " = " &lt;&lt; result &lt;&lt; "\n";
    } catch (const std::invalid_argument&amp; e) {
        std::cout &lt;&lt; "[processValue] caught invalid_argument, re-throwing...\n";
        throw;  // re-throw same exception (preserves original exception)
    }
}

int main() {
    // Basic try-catch
    try {
        std::cout &lt;&lt; safeDivide(10.0, 2.0) &lt;&lt; "\n";   // OK
        std::cout &lt;&lt; safeDivide(10.0, 0.0) &lt;&lt; "\n";   // throws!
    } catch (const std::invalid_argument&amp; e) {
        std::cout &lt;&lt; "Caught invalid_argument: " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // Multiple catch blocks (most specific first!)
    try {
        throw std::out_of_range("index 99 is out of range [0,10]");
    } catch (const std::out_of_range&amp; e) {     // most specific
        std::cout &lt;&lt; "out_of_range: " &lt;&lt; e.what() &lt;&lt; "\n";
    } catch (const std::logic_error&amp; e) {       // base of out_of_range
        std::cout &lt;&lt; "logic_error: " &lt;&lt; e.what() &lt;&lt; "\n";
    } catch (const std::exception&amp; e) {         // base of all std exceptions
        std::cout &lt;&lt; "exception: " &lt;&lt; e.what() &lt;&lt; "\n";
    } catch (...) {                              // catch ANYTHING
        std::cout &lt;&lt; "Unknown exception!\n";
    }

    // Re-throw chain
    try {
        processValue(0.0);
    } catch (const std::exception&amp; e) {
        std::cout &lt;&lt; "Top-level caught: " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // Throw any type (int, string, custom struct)
    try {
        throw 42;           // throw an int
    } catch (int code) {
        std::cout &lt;&lt; "Caught int code: " &lt;&lt; code &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Standard Exception Hierarchy</div>
<div class="section-body">
  <div class="memory-diagram">std::exception hierarchy:

  std::exception (base — has .what())
  ├── std::logic_error       (programming errors — detectable before runtime)
  │   ├── std::invalid_argument  (bad argument value)
  │   ├── std::domain_error      (mathematical domain violation)
  │   ├── std::length_error      (exceeds max size)
  │   └── std::out_of_range      (index/value out of range)
  └── std::runtime_error     (errors only detectable at runtime)
      ├── std::range_error       (computed value out of range)
      ├── std::overflow_error    (arithmetic overflow)
      ├── std::underflow_error   (arithmetic underflow)
      └── std::system_error (C++11) (OS/IO errors with error_code)
          └── std::ios_base::failure (I/O stream failure)
  
  std::bad_alloc            (new fails — out of memory)
  std::bad_cast             (dynamic_cast to reference fails)
  std::bad_typeid           (typeid on null pointer)
  std::bad_exception        (unexpected exception in specification)
  std::bad_variant_access   (wrong std::get on variant)</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Standard exceptions in practice</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;new&gt;

void demonstrateStdExceptions() {
    // std::out_of_range (from vector::at)
    try {
        std::vector&lt;int&gt; v{1, 2, 3};
        v.at(10);  // throws out_of_range
    } catch (const std::out_of_range&amp; e) {
        std::cout &lt;&lt; "out_of_range: " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // std::bad_alloc (out of memory)
    try {
        auto p = new int[1'000'000'000'000LL];  // try to allocate 1TB
        delete[] p;
    } catch (const std::bad_alloc&amp; e) {
        std::cout &lt;&lt; "bad_alloc: " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // std::stoi — std::invalid_argument
    try {
        int n = std::stoi("not_a_number");
    } catch (const std::invalid_argument&amp; e) {
        std::cout &lt;&lt; "stoi invalid: " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // std::stoi — std::out_of_range
    try {
        int n = std::stoi("99999999999999999");  // overflow
    } catch (const std::out_of_range&amp; e) {
        std::cout &lt;&lt; "stoi overflow: " &lt;&lt; e.what() &lt;&lt; "\n";
    }

    // std::bad_cast
    try {
        class A { public: virtual ~A() {} };
        class B : public A {};
        A a;
        B&amp; b = dynamic_cast&lt;B&amp;&gt;(a);  // throws bad_cast (reference cast)
    } catch (const std::bad_cast&amp; e) {
        std::cout &lt;&lt; "bad_cast: " &lt;&lt; e.what() &lt;&lt; "\n";
    }
}

int main() {
    demonstrateStdExceptions();
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Custom Exception Hierarchy</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Custom exception hierarchy for an app</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;stdexcept&gt;
#include &lt;string&gt;

// ─── Application Exception Hierarchy ─────────────────────────────────────────
class AppException : public std::runtime_error {
    int errorCode_;
public:
    AppException(const std::string&amp; msg, int code)
        : std::runtime_error(msg), errorCode_{code} {}
    int errorCode() const noexcept { return errorCode_; }
};

class NetworkException : public AppException {
    std::string endpoint_;
public:
    NetworkException(const std::string&amp; msg, const std::string&amp; endpoint, int code)
        : AppException(msg + " [" + endpoint + "]", code), endpoint_{endpoint} {}
    const std::string&amp; endpoint() const noexcept { return endpoint_; }
};

class ConnectionRefused : public NetworkException {
public:
    explicit ConnectionRefused(const std::string&amp; host, int port)
        : NetworkException("Connection refused",
                           host + ":" + std::to_string(port), 1001) {}
};

class Timeout : public NetworkException {
    int timeoutMs_;
public:
    Timeout(const std::string&amp; endpoint, int ms)
        : NetworkException("Request timed out after " + std::to_string(ms) + "ms",
                           endpoint, 1002),
          timeoutMs_{ms} {}
    int timeoutMs() const noexcept { return timeoutMs_; }
};

class DatabaseException : public AppException {
    std::string query_;
public:
    DatabaseException(const std::string&amp; msg, const std::string&amp; query)
        : AppException(msg, 2001), query_{query} {}
    const std::string&amp; query() const noexcept { return query_; }
};

// ─── Functions that throw ─────────────────────────────────────────────────────
void connectToServer(const std::string&amp; host, int port) {
    if (host == "badhost") throw ConnectionRefused(host, port);
    if (host == "slowhost") throw Timeout(host + ":" + std::to_string(port), 5000);
    std::cout &lt;&lt; "Connected to " &lt;&lt; host &lt;&lt; ":" &lt;&lt; port &lt;&lt; "\n";
}

void executeQuery(const std::string&amp; sql) {
    if (sql.find("DROP TABLE") != std::string::npos)
        throw DatabaseException("Dangerous operation blocked", sql);
    std::cout &lt;&lt; "Query OK: " &lt;&lt; sql &lt;&lt; "\n";
}

void runApplication(const std::string&amp; host) {
    try {
        connectToServer(host, 5432);
        executeQuery("SELECT * FROM users");
        executeQuery("DROP TABLE users");   // blocked!
    } catch (const ConnectionRefused&amp; e) {
        std::cout &lt;&lt; "[ERR " &lt;&lt; e.errorCode() &lt;&lt; "] Connection refused: " &lt;&lt; e.what() &lt;&lt; "\n";
    } catch (const Timeout&amp; e) {
        std::cout &lt;&lt; "[ERR " &lt;&lt; e.errorCode() &lt;&lt; "] Timeout (" &lt;&lt; e.timeoutMs() &lt;&lt; "ms): " &lt;&lt; e.what() &lt;&lt; "\n";
    } catch (const DatabaseException&amp; e) {
        std::cout &lt;&lt; "[ERR " &lt;&lt; e.errorCode() &lt;&lt; "] DB: " &lt;&lt; e.what() &lt;&lt; "\n";
        std::cout &lt;&lt; "  Query was: " &lt;&lt; e.query() &lt;&lt; "\n";
    } catch (const AppException&amp; e) {
        std::cout &lt;&lt; "[ERR " &lt;&lt; e.errorCode() &lt;&lt; "] App: " &lt;&lt; e.what() &lt;&lt; "\n";
    }
}

int main() {
    std::cout &lt;&lt; "=== Connecting to badhost ===\n";
    runApplication("badhost");
    std::cout &lt;&lt; "\n=== Connecting to slowhost ===\n";
    runApplication("slowhost");
    std::cout &lt;&lt; "\n=== Connecting to localhost ===\n";
    runApplication("localhost");
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>Exception Safety &amp; RAII</div>
<div class="section-body">
  <div class="concept-box">
    <h4>Exception Safety Guarantees (from weakest to strongest):</h4>
    <p>• <strong>No guarantee:</strong> Anything can happen on exception — leaks, corruption. Never write this.</p>
    <p>• <strong>Basic guarantee:</strong> No resource leaks (invariants preserved), but object may be in a valid but changed state.</p>
    <p>• <strong>Strong guarantee (commit-or-rollback):</strong> Operation either completes fully or has zero effect on state. Use copy-and-swap idiom.</p>
    <p>• <strong>No-throw guarantee (<code>noexcept</code>):</strong> Function never throws — guaranteed. Required for move constructors, destructors, and <code>swap()</code>.</p>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Exception safety, noexcept, copy-and-swap</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;stdexcept&gt;

class SafeBuffer {
    std::unique_ptr&lt;int[]&gt; data_;
    std::size_t size_;
public:
    explicit SafeBuffer(std::size_t n)
        : data_{std::make_unique&lt;int[]&gt;(n)}, size_{n} {}

    // Strong guarantee: copy-and-swap assignment
    SafeBuffer&amp; operator=(SafeBuffer other) noexcept {  // copy made, then swapped
        std::swap(data_, other.data_);
        std::swap(size_, other.size_);
        return *this;                        // if copy throws, this is unchanged!
    }

    // noexcept move (enables std::vector optimizations!)
    SafeBuffer(SafeBuffer&amp;&amp;) noexcept = default;
    SafeBuffer&amp; operator=(SafeBuffer&amp;&amp;) noexcept = default;
    SafeBuffer(const SafeBuffer&amp; other) : data_{std::make_unique&lt;int[]&gt;(other.size_)}, size_{other.size_} {
        std::copy(other.data_.get(), other.data_.get() + size_, data_.get());
    }

    int&amp;       operator[](std::size_t i)       { return data_[i]; }
    const int&amp; operator[](std::size_t i) const { return data_[i]; }
    std::size_t size() const noexcept { return size_; }

    // RAII — automatically freed by unique_ptr destructor
};

// RAII lock guard example
class MutexLock {
    bool locked_{false};
public:
    MutexLock() noexcept { locked_ = true; std::cout &lt;&lt; "Lock acquired\n"; }
    ~MutexLock() noexcept { if (locked_) std::cout &lt;&lt; "Lock released\n"; }
    MutexLock(const MutexLock&amp;) = delete;
    MutexLock&amp; operator=(const MutexLock&amp;) = delete;
};

void criticalSection() {
    MutexLock lock;          // RAII: released even if exception thrown!
    std::cout &lt;&lt; "In critical section\n";
    throw std::runtime_error("something went wrong");
    // lock destructor runs here even on exception ✅
}

int main() {
    // SafeBuffer demo
    SafeBuffer buf(5);
    for (std::size_t i = 0; i &lt; buf.size(); ++i) buf[i] = (int)(i * 10);

    // RAII exception safety
    try {
        criticalSection();
    } catch (const std::exception&amp; e) {
        std::cout &lt;&lt; "Caught: " &lt;&lt; e.what() &lt;&lt; "\n";
    }
    std::cout &lt;&lt; "Lock was properly released despite exception!\n";

    // noexcept check
    std::cout &lt;&lt; "SafeBuffer move noexcept: " &lt;&lt; std::boolalpha
              &lt;&lt; std::is_nothrow_move_constructible_v&lt;SafeBuffer&gt; &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Why catch by const reference?</h4><p>Catching by value slices derived exceptions — if a <code>ConnectionRefused</code> is thrown and caught as <code>AppException</code> by value, only the base class parts are copied. const reference preserves the full dynamic type and avoids copying the exception object.</p></div>
    <div class="faq-item"><h4>Q2: Why shouldn't destructors throw?</h4><p>If an exception is propagating and a destructor throws another exception during stack unwinding, <code>std::terminate()</code> is called immediately. C++11+ destructors are implicitly <code>noexcept</code>. Never let exceptions escape from destructors.</p></div>
    <div class="faq-item"><h4>Q3: What is the performance cost of exceptions?</h4><p>Zero-cost exception handling (ZEH): when no exception occurs, exception handling has zero runtime overhead. When an exception is thrown, there IS overhead (stack unwinding, RTTI lookup). Use exceptions for exceptional cases, not regular control flow.</p></div>
    <div class="faq-item"><h4>Q4: What is std::exception_ptr?</h4><p><code>std::exception_ptr</code> stores a reference-counted copy of an exception. Captured with <code>std::current_exception()</code>, re-thrown with <code>std::rethrow_exception()</code>. Used to propagate exceptions across threads.</p></div>
    <div class="faq-item"><h4>Q5: What does std::terminate call by default?</h4><p><code>std::abort()</code> — terminates the program immediately without stack unwinding. You can replace it with <code>std::set_terminate(handler)</code> to log a final message before aborting, which is useful in production crash reporting.</p></div>
  </div>
</div>`;

makeCppLesson(18,
  '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html',
  'C++ Exception Handling: try, catch, throw, Custom Exceptions & Safety Complete Masterclass',
  'Exhaustive textbook-grade C++ Exception Handling (Phase 18): try/catch/throw, re-throw, multiple catch blocks, full std::exception hierarchy, custom exception hierarchies, exception safety guarantees, noexcept, RAII + exceptions, copy-and-swap, exception_ptr, and std::terminate.',
  'Phase 18', 'Exception Handling',
  'try/catch/throw · Re-throw · Multiple Catch Blocks · std::exception Hierarchy · bad_alloc/bad_cast · Custom Exception Hierarchy · No-throw/Strong/Basic Guarantees · noexcept · RAII Safety · copy-and-swap · exception_ptr',
  l18,
  '17-cpp-smart-pointers-unique-ptr-shared-ptr-weak-ptr-and-raii.html', '17. unique_ptr, shared_ptr, weak_ptr & RAII Memory',
  '19-cpp-file-handling-fstream-filesystem-and-serialization.html', '19. fstream, std::filesystem, Paths & Serialization');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 19: File Handling & Filesystem
// ═══════════════════════════════════════════════════════════════════════════════
const l19 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 19 (Chapter 19): C++ File Handling &amp; Filesystem Masterclass</strong>! C++ provides <code>std::ifstream</code>, <code>std::ofstream</code>, and <code>std::fstream</code> for high-level text and binary I/O. C++17 adds the powerful <code>std::filesystem</code> library for cross-platform path manipulation, directory traversal, file metadata, copying, renaming, and deletion — all without system-specific OS calls.</p>
</div>

<div class="section-title"><span class="num">1</span>File Stream Classes &amp; Open Modes</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>Class</th><th>Direction</th><th>Default Mode</th><th>Use For</th></tr></thead>
    <tbody>
      <tr><td><code>std::ifstream</code></td><td>Read only</td><td><code>ios::in</code></td><td>Reading files</td></tr>
      <tr><td><code>std::ofstream</code></td><td>Write only</td><td><code>ios::out | ios::trunc</code></td><td>Writing (overwrites)</td></tr>
      <tr><td><code>std::fstream</code></td><td>Read &amp; Write</td><td><code>ios::in | ios::out</code></td><td>Read-modify-write</td></tr>
    </tbody>
  </table>
  <table class="tbl spec-table">
    <thead><tr><th>Mode Flag</th><th>Meaning</th><th>Combine With</th></tr></thead>
    <tbody>
      <tr><td><code>ios::in</code></td><td>Open for reading</td><td>ifstream, fstream</td></tr>
      <tr><td><code>ios::out</code></td><td>Open for writing</td><td>ofstream, fstream</td></tr>
      <tr><td><code>ios::app</code></td><td>Always write at end (append)</td><td>ofstream</td></tr>
      <tr><td><code>ios::ate</code></td><td>Seek to end after open</td><td>any</td></tr>
      <tr><td><code>ios::trunc</code></td><td>Truncate/erase existing content</td><td>ofstream</td></tr>
      <tr><td><code>ios::binary</code></td><td>Binary mode (no newline translation)</td><td>any</td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">2</span>Reading &amp; Writing Text Files</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Complete text file read/write</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;fstream&gt;
#include &lt;iostream&gt;
#include &lt;sstream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;stdexcept&gt;

// Write CSV data to file
void writeCSV(const std::string&amp; filename,
              const std::vector&lt;std::vector&lt;std::string&gt;&gt;&amp; rows) {
    std::ofstream file(filename);
    if (!file.is_open())
        throw std::runtime_error("Cannot open for writing: " + filename);
    for (const auto&amp; row : rows) {
        for (std::size_t i = 0; i &lt; row.size(); ++i) {
            if (i) file &lt;&lt; ',';
            file &lt;&lt; row[i];
        }
        file &lt;&lt; '\n';
    }
    std::cout &lt;&lt; "Written " &lt;&lt; rows.size() &lt;&lt; " rows to " &lt;&lt; filename &lt;&lt; "\n";
}  // RAII: file automatically closed here

// Read all lines
std::vector&lt;std::string&gt; readLines(const std::string&amp; filename) {
    std::ifstream file(filename);
    if (!file)
        throw std::runtime_error("Cannot open for reading: " + filename);
    std::vector&lt;std::string&gt; lines;
    std::string line;
    while (std::getline(file, line)) {
        lines.push_back(line);
    }
    return lines;
}

// Read entire file into string
std::string readAll(const std::string&amp; filename) {
    std::ifstream file(filename);
    if (!file) throw std::runtime_error("Cannot open: " + filename);
    std::ostringstream oss;
    oss &lt;&lt; file.rdbuf();   // read entire buffer
    return oss.str();
}

// Read word by word
void readWords(const std::string&amp; filename) {
    std::ifstream file(filename);
    std::string word;
    std::cout &lt;&lt; "Words: ";
    while (file &gt;&gt; word) std::cout &lt;&lt; "[" &lt;&lt; word &lt;&lt; "] ";
    std::cout &lt;&lt; "\n";
}

// Append to file
void appendLog(const std::string&amp; logFile, const std::string&amp; message) {
    std::ofstream file(logFile, std::ios::app);  // append mode
    if (!file) throw std::runtime_error("Cannot open log: " + logFile);
    file &lt;&lt; "[LOG] " &lt;&lt; message &lt;&lt; '\n';
}

// seekg/seekp — random access
void seekDemo(const std::string&amp; filename) {
    std::fstream file(filename, std::ios::in | std::ios::out);
    if (!file) return;

    file.seekg(0, std::ios::end);   // seek to end
    auto fileSize = file.tellg();   // get position = file size
    std::cout &lt;&lt; "File size: " &lt;&lt; fileSize &lt;&lt; " bytes\n";

    file.seekg(0, std::ios::beg);   // back to beginning
    std::string firstLine;
    std::getline(file, firstLine);
    std::cout &lt;&lt; "First line: " &lt;&lt; firstLine &lt;&lt; "\n";
}

int main() {
    const std::string csvFile = "students.csv";
    const std::string logFile = "app.log";

    writeCSV(csvFile, {
        {"Name", "Score", "Grade"},
        {"Alice", "95", "A"},
        {"Bob", "87", "B"},
        {"Charlie", "72", "C"},
        {"Diana", "98", "A+"}
    });

    auto lines = readLines(csvFile);
    std::cout &lt;&lt; "Read " &lt;&lt; lines.size() &lt;&lt; " lines:\n";
    for (const auto&amp; l : lines) std::cout &lt;&lt; "  " &lt;&lt; l &lt;&lt; "\n";

    appendLog(logFile, "Application started");
    appendLog(logFile, "CSV read successfully");

    std::string content = readAll(logFile);
    std::cout &lt;&lt; "Log contents:\n" &lt;&lt; content;

    seekDemo(csvFile);
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Binary File I/O</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Binary read/write, struct serialization</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;fstream&gt;
#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;cstring&gt;

#pragma pack(push, 1)  // prevent padding in struct
struct StudentRecord {
    char name[32];
    int rollNo;
    float gpa;
    int year;
};
#pragma pack(pop)

void writeBinary(const std::string&amp; filename, const std::vector&lt;StudentRecord&gt;&amp; records) {
    std::ofstream file(filename, std::ios::binary);
    if (!file) throw std::runtime_error("Cannot write binary: " + filename);

    uint32_t count = (uint32_t)records.size();
    file.write(reinterpret_cast&lt;const char*&gt;(&amp;count), sizeof(count));    // header: record count
    file.write(reinterpret_cast&lt;const char*&gt;(records.data()),             // all records at once
               (std::streamsize)(records.size() * sizeof(StudentRecord)));
    std::cout &lt;&lt; "Written " &lt;&lt; count &lt;&lt; " binary records\n";
}

std::vector&lt;StudentRecord&gt; readBinary(const std::string&amp; filename) {
    std::ifstream file(filename, std::ios::binary);
    if (!file) throw std::runtime_error("Cannot read binary: " + filename);

    uint32_t count;
    file.read(reinterpret_cast&lt;char*&gt;(&amp;count), sizeof(count));

    std::vector&lt;StudentRecord&gt; records(count);
    file.read(reinterpret_cast&lt;char*&gt;(records.data()),
              (std::streamsize)(count * sizeof(StudentRecord)));
    return records;
}

int main() {
    std::vector&lt;StudentRecord&gt; students;
    auto makeRecord = [](const char* name, int roll, float gpa, int year) {
        StudentRecord r{};
        std::strncpy(r.name, name, sizeof(r.name) - 1);
        r.rollNo = roll; r.gpa = gpa; r.year = year;
        return r;
    };
    students.push_back(makeRecord("Alice",   101, 9.2f, 2));
    students.push_back(makeRecord("Bob",     102, 8.7f, 3));
    students.push_back(makeRecord("Charlie", 103, 9.5f, 1));

    writeBinary("students.dat", students);
    auto loaded = readBinary("students.dat");

    std::cout &lt;&lt; "Loaded " &lt;&lt; loaded.size() &lt;&lt; " records:\n";
    for (const auto&amp; s : loaded) {
        std::cout &lt;&lt; "  Roll:" &lt;&lt; s.rollNo &lt;&lt; " Name:" &lt;&lt; s.name
                  &lt;&lt; " GPA:" &lt;&lt; s.gpa &lt;&lt; " Year:" &lt;&lt; s.year &lt;&lt; "\n";
    }
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>std::filesystem (C++17) — Paths, Dirs &amp; File Operations</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::filesystem complete API</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;filesystem&gt;
#include &lt;iostream&gt;
#include &lt;fstream&gt;
#include &lt;string&gt;

namespace fs = std::filesystem;

void demonstratePaths() {
    fs::path p1 = "data/logs/app.log";
    std::cout &lt;&lt; "path:        " &lt;&lt; p1 &lt;&lt; "\n";
    std::cout &lt;&lt; "filename:    " &lt;&lt; p1.filename() &lt;&lt; "\n";       // app.log
    std::cout &lt;&lt; "stem:        " &lt;&lt; p1.stem() &lt;&lt; "\n";           // app
    std::cout &lt;&lt; "extension:   " &lt;&lt; p1.extension() &lt;&lt; "\n";      // .log
    std::cout &lt;&lt; "parent_path: " &lt;&lt; p1.parent_path() &lt;&lt; "\n";    // data/logs

    fs::path p2 = "/home/user";
    fs::path p3 = p2 / "documents" / "report.pdf";  // path concatenation
    std::cout &lt;&lt; "joined:      " &lt;&lt; p3 &lt;&lt; "\n";

    // Replace extension
    fs::path p4 = "image.jpg";
    p4.replace_extension(".png");
    std::cout &lt;&lt; "replaced ext: " &lt;&lt; p4 &lt;&lt; "\n";
}

void demonstrateDirectories() {
    // Create directories (all parent dirs too)
    fs::create_directories("output/temp/data");
    std::cout &lt;&lt; "Created directories\n";

    // Write test files
    for (const char* name : {"a.txt", "b.txt", "c.cpp", "d.hpp"}) {
        std::ofstream(std::string("output/temp/") + name) &lt;&lt; "test content\n";
    }

    // Directory iteration
    std::cout &lt;&lt; "Contents of output/temp:\n";
    for (const auto&amp; entry : fs::directory_iterator("output/temp")) {
        std::cout &lt;&lt; "  "
                  &lt;&lt; (fs::is_directory(entry) ? "[DIR] " : "[FILE] ")
                  &lt;&lt; entry.path().filename()
                  &lt;&lt; " (" &lt;&lt; (fs::is_regular_file(entry) ? std::to_string(fs::file_size(entry)) + "B" : "-")
                  &lt;&lt; ")\n";
    }

    // Recursive iteration
    std::cout &lt;&lt; "\nRecursive contents:\n";
    for (const auto&amp; entry : fs::recursive_directory_iterator("output")) {
        std::cout &lt;&lt; "  " &lt;&lt; std::string(entry.depth() * 2, ' ')
                  &lt;&lt; entry.path().filename() &lt;&lt; "\n";
    }
}

void demonstrateFileOps() {
    // Copy
    fs::copy("output/temp/a.txt", "output/temp/a_backup.txt",
             fs::copy_options::overwrite_existing);
    std::cout &lt;&lt; "Copied a.txt to a_backup.txt\n";

    // Rename/move
    fs::rename("output/temp/b.txt", "output/temp/b_renamed.txt");
    std::cout &lt;&lt; "Renamed b.txt\n";

    // Remove single file
    fs::remove("output/temp/c.cpp");
    std::cout &lt;&lt; "Removed c.cpp\n";

    // File metadata
    auto p = fs::path("output/temp/a.txt");
    std::cout &lt;&lt; "a.txt exists: " &lt;&lt; std::boolalpha &lt;&lt; fs::exists(p) &lt;&lt; "\n";
    std::cout &lt;&lt; "a.txt size:   " &lt;&lt; fs::file_size(p) &lt;&lt; " bytes\n";
    std::cout &lt;&lt; "is_regular:   " &lt;&lt; fs::is_regular_file(p) &lt;&lt; "\n";

    // Space info
    auto space = fs::space(".");
    std::cout &lt;&lt; "Disk free: " &lt;&lt; space.free / 1024 / 1024 &lt;&lt; " MB\n";

    // Cleanup
    fs::remove_all("output");  // delete entire tree
    std::cout &lt;&lt; "Cleaned up output directory\n";
}

int main() {
    std::cout &lt;&lt; "=== Path Operations ===\n";
    demonstratePaths();
    std::cout &lt;&lt; "\n=== Directory Operations ===\n";
    demonstrateDirectories();
    std::cout &lt;&lt; "\n=== File Operations ===\n";
    demonstrateFileOps();
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Do I need to explicitly close() a file stream?</h4><p>No — RAII handles it. The stream destructor calls <code>close()</code> automatically when it goes out of scope. Explicit <code>close()</code> is only needed when you want to flush and reopen within the same scope, or check the close return status.</p></div>
    <div class="faq-item"><h4>Q2: How to read entire file into std::string efficiently?</h4><p>Use <code>std::ostringstream oss; oss &lt;&lt; file.rdbuf();</code> for simple cases. For large files, <code>file.seekg(0, ios::end); auto size = file.tellg(); file.seekg(0, ios::beg); string s(size, '\0'); file.read(s.data(), size);</code> avoids a copy.</p></div>
    <div class="faq-item"><h4>Q3: What is the difference between ios::app and ios::ate?</h4><p><code>ios::app</code> forces every write to the end of file (even after seeking). <code>ios::ate</code> seeks to the end on open but allows writing anywhere after that. Use <code>ios::app</code> for true append-only logs.</p></div>
    <div class="faq-item"><h4>Q4: How to traverse directories recursively?</h4><p>Use <code>std::filesystem::recursive_directory_iterator</code>: <code>for (const auto&amp; entry : fs::recursive_directory_iterator("root")) { ... }</code>. Use <code>entry.depth()</code> to get the nesting level.</p></div>
    <div class="faq-item"><h4>Q5: What is std::filesystem::path advantage over string?</h4><p><code>fs::path</code> is cross-platform (handles <code>/</code> vs <code>\</code> separators), provides decomposition methods (<code>filename()</code>, <code>extension()</code>, <code>parent_path()</code>), and supports natural path concatenation with <code>/</code> operator.</p></div>
  </div>
</div>`;

makeCppLesson(19,
  '19-cpp-file-handling-fstream-filesystem-and-serialization.html',
  'C++ File Handling: fstream, std::filesystem, Paths & Binary I/O Complete Masterclass',
  'Exhaustive textbook-grade C++ File Handling (Phase 19): ifstream/ofstream/fstream with all modes, reading lines/words/all-at-once, writing/appending, seekg/seekp, binary file I/O with struct serialization, and C++17 std::filesystem for paths, directory iteration, copy/rename/remove.',
  'Phase 19', 'File Handling & Filesystem',
  'File Stream Classes · Open Modes (in/out/app/binary) · getline & read · write & append · seekg/seekp & tellg · readAll via rdbuf · Binary I/O & struct serialization · std::filesystem paths · directory_iterator · recursive_directory_iterator · file copy/rename/remove',
  l19,
  '18-cpp-exception-handling-try-catch-throw-and-custom-exceptions.html', '18. try, catch, throw, Custom Exceptions & Safety',
  '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html', '20. constexpr, Structured Bindings, optional, variant & format');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 20: Modern C++ Features
// ═══════════════════════════════════════════════════════════════════════════════
const l20 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 20 (Chapter 20): Modern C++ Features Masterclass</strong>! C++11 through C++23 brought a revolution in expressiveness, safety, and performance. This chapter covers the most impactful modern features: <code>auto</code>, <code>constexpr</code>, structured bindings, <code>std::optional</code>, <code>std::variant</code>, <code>std::format</code>, Concepts, coroutines introduction, and Modules overview.</p>
</div>

<div class="section-title"><span class="num">1</span>C++11 Core Features</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — auto, nullptr, range-for, enum class, uniform init</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;map&gt;
#include &lt;string&gt;
#include &lt;memory&gt;

int main() {
    // auto — compile-time type deduction, zero overhead
    auto i = 42;                              // int
    auto d = 3.14;                            // double
    auto s = std::string{"hello"};            // std::string
    auto v = std::vector&lt;int&gt;{1, 2, 3, 4, 5};
    auto p = std::make_unique&lt;int&gt;(99);
    std::cout &lt;&lt; "auto types: " &lt;&lt; i &lt;&lt; " " &lt;&lt; d &lt;&lt; " " &lt;&lt; s &lt;&lt; "\n";

    // auto with references
    const auto&amp; ref = v;    // const vector&lt;int&gt;&amp;
    auto&amp; mref = v;          // vector&lt;int&gt;&amp;

    // nullptr — type-safe null (replaces NULL and 0)
    int* raw = nullptr;
    void* vp = nullptr;
    if (raw == nullptr) std::cout &lt;&lt; "raw is null\n";
    // raw == 0;  // works but unclear
    // raw == NULL;  // might cause overload ambiguity

    // Uniform brace initialization — prevents narrowing!
    int a{5};
    double db{3.14};
    // int bad{3.14};  // COMPILE ERROR — narrowing from double to int!
    std::vector&lt;int&gt; vec{10, 20, 30, 40};
    std::map&lt;std::string, int&gt; m{{"one",1}, {"two",2}, {"three",3}};

    // Range-based for (C++11)
    std::cout &lt;&lt; "vec: ";
    for (auto x : vec) std::cout &lt;&lt; x &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Range-based for with init (C++20)
    for (auto copy = vec; auto x : copy) std::cout &lt;&lt; x * 2 &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // enum class — scoped, strongly typed, no implicit int conversion
    enum class Color { Red, Green, Blue };
    enum class Direction { North, South, East, West };

    Color c = Color::Red;
    Direction d2 = Direction::North;
    // if (c == d2) {}       // COMPILE ERROR — different types!
    // if (c == 0) {}        // COMPILE ERROR — no implicit int conversion!
    if (c == Color::Red) std::cout &lt;&lt; "Red!\n";

    // Specify underlying type for enum class
    enum class Status : uint8_t { OK = 0, Error = 1, Pending = 2 };
    Status s2 = Status::OK;
    std::cout &lt;&lt; "status raw: " &lt;&lt; (int)s2 &lt;&lt; "\n";  // explicit cast OK
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>constexpr, consteval &amp; constinit</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — constexpr, consteval, constinit (C++11/17/20)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;array&gt;
#include &lt;cmath&gt;

// constexpr function — evaluated at compile time if inputs are compile-time
constexpr int factorial(int n) {
    return n &lt;= 1 ? 1 : n * factorial(n - 1);
}

constexpr double circleArea(double r) {
    return 3.14159265358979 * r * r;
}

constexpr bool isPrime(int n) {
    if (n &lt; 2) return false;
    for (int i = 2; i * i &lt;= n; ++i)
        if (n % i == 0) return false;
    return true;
}

// consteval (C++20) — MUST be compile-time only
consteval int pow2(int n) {
    return 1 &lt;&lt; n;
}

// constinit (C++20) — constant initialization of static/thread_local vars
constinit int globalVal = factorial(5);  // guaranteed compile-time init

// Compile-time array using constexpr
template &lt;int N&gt;
constexpr auto makePrimes() {
    std::array&lt;int, N&gt; primes{};
    int count = 0;
    for (int i = 2; count &lt; N; ++i) {
        if (isPrime(i)) primes[count++] = i;
    }
    return primes;
}

int main() {
    // compile-time constants
    constexpr int fact10 = factorial(10);   // 3628800 — computed at compile time!
    constexpr double area5 = circleArea(5.0);
    std::cout &lt;&lt; "10! = " &lt;&lt; fact10 &lt;&lt; "\n";
    std::cout &lt;&lt; "Area(r=5) = " &lt;&lt; area5 &lt;&lt; "\n";

    // runtime usage (also valid for constexpr functions)
    int n;
    std::cin &gt;&gt; n;
    std::cout &lt;&lt; "Runtime factorial(" &lt;&lt; n &lt;&lt; ") = " &lt;&lt; factorial(n) &lt;&lt; "\n";

    // consteval — compile-time only
    constexpr int p8 = pow2(8);     // 256 at compile time
    std::cout &lt;&lt; "2^8 = " &lt;&lt; p8 &lt;&lt; "\n";
    // int x; pow2(x);  // COMPILE ERROR — runtime value not allowed!

    // Compile-time prime table
    constexpr auto first10Primes = makePrimes&lt;10&gt;();
    std::cout &lt;&lt; "First 10 primes: ";
    for (int p : first10Primes) std::cout &lt;&lt; p &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // constinit
    std::cout &lt;&lt; "globalVal (5!) = " &lt;&lt; globalVal &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Structured Bindings, if/switch with init, &amp; decltype</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Structured bindings, if-init, decltype, auto return</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;map&gt;
#include &lt;tuple&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;optional&gt;

// Return multiple values cleanly
struct ParseResult {
    int value;
    bool success;
    std::string error;
};

ParseResult parseNumber(const std::string&amp; s) {
    try {
        return {std::stoi(s), true, ""};
    } catch (const std::exception&amp; e) {
        return {0, false, e.what()};
    }
}

// decltype — type of expression at compile time
template &lt;typename T, typename U&gt;
auto safeAdd(T a, U b) -&gt; decltype(a + b) {
    return a + b;
}

int main() {
    // ─── Structured Bindings (C++17) ─────────────────────────────────────
    // pair
    auto pair = std::make_pair(42, std::string("hello"));
    auto [num, str] = pair;
    std::cout &lt;&lt; "pair: " &lt;&lt; num &lt;&lt; " " &lt;&lt; str &lt;&lt; "\n";

    // tuple
    auto t = std::make_tuple(1, 3.14, std::string("C++20"), true);
    auto [id, pi, lang, flag] = t;
    std::cout &lt;&lt; id &lt;&lt; " " &lt;&lt; pi &lt;&lt; " " &lt;&lt; lang &lt;&lt; " " &lt;&lt; flag &lt;&lt; "\n";

    // struct decomposition
    auto [val, ok, err] = parseNumber("42");
    if (ok) std::cout &lt;&lt; "Parsed: " &lt;&lt; val &lt;&lt; "\n";
    auto [val2, ok2, err2] = parseNumber("bad");
    if (!ok2) std::cout &lt;&lt; "Parse error: " &lt;&lt; err2 &lt;&lt; "\n";

    // map iteration with structured bindings
    std::map&lt;std::string, int&gt; scores{{"Alice",95}, {"Bob",87}, {"Charlie",92}};
    for (const auto&amp; [name, score] : scores) {
        std::cout &lt;&lt; name &lt;&lt; ": " &lt;&lt; score &lt;&lt; "\n";
    }

    // Modify via reference binding
    for (auto&amp; [name, score] : scores) score += 5;  // give everyone +5

    // ─── if with initializer (C++17) ─────────────────────────────────────
    if (auto it = scores.find("Alice"); it != scores.end()) {
        std::cout &lt;&lt; "Alice's score: " &lt;&lt; it-&gt;second &lt;&lt; "\n";
        // it is scoped to this if block only!
    }

    // ─── switch with initializer (C++17) ─────────────────────────────────
    switch (auto [v, s, e] = parseNumber("100"); s ? v : -1) {
        case -1:  std::cout &lt;&lt; "Parse failed\n"; break;
        case 100: std::cout &lt;&lt; "Got 100!\n"; break;
        default:  std::cout &lt;&lt; "Got: " &lt;&lt; v &lt;&lt; "\n"; break;
    }

    // ─── decltype ─────────────────────────────────────────────────────────
    int x = 5; double y = 3.14;
    decltype(x + y) result = x + y;    // result is double
    decltype(x) copy = x;              // copy is int
    std::cout &lt;&lt; "decltype result: " &lt;&lt; result &lt;&lt; "\n";

    std::cout &lt;&lt; "safeAdd(3, 4.5) = " &lt;&lt; safeAdd(3, 4.5) &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>std::format (C++20) &amp; std::chrono</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::format, std::chrono performance timing</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;format&gt;       // C++20
#include &lt;chrono&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;cmath&gt;

// Benchmark helper using chrono
template &lt;typename Func&gt;
double measureMs(Func&amp;&amp; fn, int iterations = 1) {
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i &lt; iterations; ++i) fn();
    auto end = std::chrono::high_resolution_clock::now();
    auto dur = std::chrono::duration&lt;double, std::milli&gt;(end - start);
    return dur.count();
}

int main() {
    // ─── std::format (C++20) — type-safe, expressive formatting ──────────
    std::string s1 = std::format("Hello, {}!", "World");
    std::string s2 = std::format("Pi = {:.4f}", 3.14159265);
    std::string s3 = std::format("{:&gt;10} | {:&lt;10} | {:^10}", "right", "left", "center");
    std::string s4 = std::format("Hex: {:x} Oct: {:o} Bin: {:b}", 255, 255, 255);
    std::string s5 = std::format("Sci: {:e}", 1234567.89);
    std::string s6 = std::format("{0} {1} {0}", "echo", "this");  // positional

    std::cout &lt;&lt; s1 &lt;&lt; "\n" &lt;&lt; s2 &lt;&lt; "\n" &lt;&lt; s3 &lt;&lt; "\n"
              &lt;&lt; s4 &lt;&lt; "\n" &lt;&lt; s5 &lt;&lt; "\n" &lt;&lt; s6 &lt;&lt; "\n";

    // Table formatting
    std::cout &lt;&lt; std::format("\n{:-&lt;30}\n", "");  // separator line
    std::cout &lt;&lt; std::format("{:&lt;15} {:&gt;8} {:&gt;6}\n", "Name", "Score", "Grade");
    std::cout &lt;&lt; std::format("{:-&lt;30}\n", "");
    for (auto [name, score] : std::vector&lt;std::pair&lt;std::string, int&gt;&gt;{
            {"Alice",95}, {"Bob",87}, {"Charlie",72}}) {
        char grade = score&gt;=90?'A': score&gt;=80?'B': 'C';
        std::cout &lt;&lt; std::format("{:&lt;15} {:&gt;8} {:&gt;6}\n", name, score, grade);
    }

    // ─── std::chrono — time points, durations, clocks ────────────────────
    // High-resolution benchmark
    auto ms = measureMs([]() {
        double sum = 0;
        for (int i = 0; i &lt; 1'000'000; ++i) sum += std::sqrt(i);
        return sum;
    });
    std::cout &lt;&lt; std::format("\nBenchmark: {:.3f} ms\n", ms);

    // Duration arithmetic
    using namespace std::chrono_literals;
    auto d1 = 2h + 30min + 45s;
    std::cout &lt;&lt; "Duration: " &lt;&lt; std::chrono::duration_cast&lt;std::chrono::seconds&gt;(d1).count() &lt;&lt; " seconds\n";

    // Current time
    auto now = std::chrono::system_clock::now();
    auto time_t_now = std::chrono::system_clock::to_time_t(now);
    std::cout &lt;&lt; "Now: " &lt;&lt; std::ctime(&amp;time_t_now);

    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">5</span>Move Semantics &amp; Rvalue References</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — rvalue references, std::move, perfect forwarding</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;string&gt;
#include &lt;vector&gt;
#include &lt;utility&gt;

class BigBuffer {
    std::vector&lt;int&gt; data_;
    std::string name_;
public:
    BigBuffer(std::string name, std::size_t size)
        : data_(size, 0), name_{std::move(name)} {
        std::cout &lt;&lt; "Constructed " &lt;&lt; name_ &lt;&lt; " (" &lt;&lt; size &lt;&lt; " ints)\n";
    }

    // Copy constructor — expensive
    BigBuffer(const BigBuffer&amp; other)
        : data_{other.data_}, name_{other.name_ + "_copy"} {
        std::cout &lt;&lt; "COPY: " &lt;&lt; name_ &lt;&lt; " (copying " &lt;&lt; data_.size() &lt;&lt; " ints)\n";
    }

    // Move constructor — cheap (steals resources)
    BigBuffer(BigBuffer&amp;&amp; other) noexcept
        : data_{std::move(other.data_)}, name_{std::move(other.name_) + "_moved"} {
        std::cout &lt;&lt; "MOVE: " &lt;&lt; name_ &lt;&lt; " (zero copy!)\n";
    }

    std::size_t size() const { return data_.size(); }
    const std::string&amp; name() const { return name_; }
};

// Perfect forwarding — forward args to constructor without extra copies
template &lt;typename T, typename... Args&gt;
T createObject(Args&amp;&amp;... args) {
    return T(std::forward&lt;Args&gt;(args)...);
}

BigBuffer makeBuffer(std::string name) {
    BigBuffer local{std::move(name), 1000};
    return local;   // NRVO (Named Return Value Optimization) — likely no copy/move!
}

int main() {
    std::cout &lt;&lt; "=== Copy vs Move ===\n";
    BigBuffer b1{"original", 1000};
    BigBuffer b2{b1};                    // COPY (expensive)
    BigBuffer b3{std::move(b1)};         // MOVE (cheap!) — b1 is now empty
    std::cout &lt;&lt; "b1 size after move: " &lt;&lt; b1.size() &lt;&lt; "\n";  // 0
    std::cout &lt;&lt; "b3 size: " &lt;&lt; b3.size() &lt;&lt; "\n";              // 1000

    std::cout &lt;&lt; "\n=== Return Value Optimization ===\n";
    BigBuffer b4 = makeBuffer("factory");   // NRVO — no move needed

    std::cout &lt;&lt; "\n=== Perfect Forwarding ===\n";
    auto b5 = createObject&lt;BigBuffer&gt;(std::string("forwarded"), 500);

    std::cout &lt;&lt; "\n=== std::move with string ===\n";
    std::string s1 = "Hello World (large string with much content)";
    std::string s2 = std::move(s1);   // move: s2 gets content, s1 becomes empty
    std::cout &lt;&lt; "s1 empty: " &lt;&lt; s1.empty() &lt;&lt; "\n";
    std::cout &lt;&lt; "s2: " &lt;&lt; s2 &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">6</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: What is the difference between constexpr and consteval?</h4><p><code>constexpr</code> functions may run at compile-time OR runtime. <code>consteval</code> (C++20) mandates compile-time evaluation — calling it with a runtime value is a compile error. Use <code>consteval</code> for pure compile-time computations (lookup tables, templates).</p></div>
    <div class="faq-item"><h4>Q2: Why is std::format preferred over printf?</h4><p><code>std::format</code> is type-safe (checked at compile time), returns <code>std::string</code>, is extensible for custom types (via <code>std::formatter</code>), and doesn't use va_args. <code>printf</code> has no type-checking — <code>printf("%d", 3.14)</code> is UB.</p></div>
    <div class="faq-item"><h4>Q3: What is an rvalue reference?</h4><p><code>T&amp;&amp;</code> is an rvalue reference — it binds to temporary objects. Used in move constructors and move assignments to "steal" resources from temporaries instead of copying. <code>std::move(x)</code> casts x to an rvalue reference, enabling the move.</p></div>
    <div class="faq-item"><h4>Q4: What is perfect forwarding?</h4><p><code>std::forward&lt;T&gt;(arg)</code> in a template function forwards arguments with their original value category (lvalue stays lvalue, rvalue stays rvalue). Used in wrapper functions and factory templates to avoid unnecessary copies.</p></div>
    <div class="faq-item"><h4>Q5: What are C++20 Modules?</h4><p>Modules replace header files: <code>export module mylib;</code> declares the module, <code>import mylib;</code> uses it. Advantages: no multiple-inclusion issues, no macro leakage, significantly faster compilation (no re-parsing headers), and better encapsulation.</p></div>
  </div>
</div>`;

makeCppLesson(20,
  '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html',
  'Modern C++ Features: constexpr, Structured Bindings, optional, variant & std::format Complete Masterclass',
  'Exhaustive textbook-grade Modern C++ (Phase 20): auto/nullptr/range-for/enum class, constexpr/consteval/constinit, structured bindings, if/switch-init, decltype, std::format with tables, std::chrono timing, move semantics, rvalue references, std::move, and perfect forwarding.',
  'Phase 20', 'Modern C++ Features',
  'auto & nullptr · uniform brace init · enum class · constexpr & consteval · constinit · Structured Bindings · if/switch-init · decltype · std::format tables · std::chrono · Move Semantics · rvalue && · std::move · perfect forwarding',
  l20,
  '19-cpp-file-handling-fstream-filesystem-and-serialization.html', '19. fstream, std::filesystem, Paths & Serialization',
  '21-cpp-ranges-views-filter-transform-pipelines-and-lazy-evaluation.html', '21. Ranges, Views, Pipelines & Lazy Evaluation (C++20)');

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON 21: Ranges & Views (C++20)
// ═══════════════════════════════════════════════════════════════════════════════
const l21 = `
<div class="intro-box">
  <p>Welcome to <strong>Phase 21 (Chapter 21): C++ Ranges &amp; Views (C++20) Masterclass</strong>! The Ranges library is the biggest quality-of-life improvement in C++ since C++11. Ranges eliminate iterator pairs from algorithm calls, views enable lazy composable pipelines with the <code>|</code> operator, and the whole system is zero-cost due to lazy evaluation and compile-time composition.</p>
</div>

<div class="section-title"><span class="num">1</span>What are Ranges? The Big Picture</div>
<div class="section-body">
  <p class="text-prose">A <strong>range</strong> is any type with <code>begin()</code> and <code>end()</code>. The <code>std::ranges</code> namespace provides range-based versions of all STL algorithms that accept a single range instead of a begin/end pair — eliminating a whole class of bugs.</p>
  <div class="concept-box">
    <h4>Old STL vs Ranges:</h4>
    <p>Old: <code>std::sort(v.begin(), v.end());</code> — requires begin/end pair, can be mismatched</p>
    <p>New: <code>std::ranges::sort(v);</code> — accepts the range directly, impossible to mismatch</p>
    <p>Old: <code>std::sort(v.begin(), v.end(), pred);</code></p>
    <p>New: <code>std::ranges::sort(v, pred);</code> — cleaner, composable with projections</p>
  </div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — std::ranges algorithms (C++20)</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;algorithm&gt;
#include &lt;ranges&gt;
#include &lt;string&gt;

struct Person {
    std::string name;
    int age;
    double salary;
};

int main() {
    std::vector&lt;int&gt; nums{5, 2, 8, 1, 9, 3, 7, 4, 6};

    // Ranges algorithms — no begin/end, range-based projections!
    std::ranges::sort(nums);
    std::cout &lt;&lt; "sorted: ";
    for (int n : nums) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    std::ranges::reverse(nums);
    std::cout &lt;&lt; "reversed: ";
    for (int n : nums) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // find with predicate
    auto it = std::ranges::find(nums, 7);
    if (it != nums.end())
        std::cout &lt;&lt; "7 at index: " &lt;&lt; std::distance(nums.begin(), it) &lt;&lt; "\n";

    // count_if
    int evens = std::ranges::count_if(nums, [](int n){ return n%2==0; });
    std::cout &lt;&lt; "evens: " &lt;&lt; evens &lt;&lt; "\n";

    // ─── Projections — apply transform before comparison ──────────────────
    std::vector&lt;Person&gt; people{
        {"Charlie", 35, 90000}, {"Alice", 28, 75000},
        {"Bob", 42, 120000}, {"Diana", 31, 95000}
    };

    // Sort by age using projection (much cleaner than lambda comparator!)
    std::ranges::sort(people, {}, &amp;Person::age);
    std::cout &lt;&lt; "\nSorted by age:\n";
    for (const auto&amp; p : people)
        std::cout &lt;&lt; "  " &lt;&lt; p.name &lt;&lt; " (" &lt;&lt; p.age &lt;&lt; ")\n";

    // Sort by name length using projection
    std::ranges::sort(people, std::ranges::less{}, [](const Person&amp; p){ return p.name.size(); });
    std::cout &lt;&lt; "\nSorted by name length:\n";
    for (const auto&amp; p : people) std::cout &lt;&lt; "  " &lt;&lt; p.name &lt;&lt; "\n";

    // Find max salary using projection
    auto richest = std::ranges::max_element(people, {}, &amp;Person::salary);
    std::cout &lt;&lt; "\nHighest salary: " &lt;&lt; richest-&gt;name &lt;&lt; " ($" &lt;&lt; richest-&gt;salary &lt;&lt; ")\n";

    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">2</span>Views — Lazy Composable Pipelines</div>
<div class="section-body">
  <p class="text-prose"><strong>Views</strong> are lazy, non-owning range adapters. They compute elements on-demand — no intermediate containers, no copies. Multiple views are chained with the pipe <code>|</code> operator into composable pipelines.</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Views: filter, transform, take, drop, iota, reverse</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;ranges&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;algorithm&gt;

int main() {
    std::vector&lt;int&gt; numbers{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // ─── Basic views ──────────────────────────────────────────────────────
    // filter — keep only matching elements
    auto evens = numbers | std::views::filter([](int n){ return n%2==0; });
    std::cout &lt;&lt; "evens: ";
    for (int n : evens) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // transform — map each element
    auto squares = numbers | std::views::transform([](int n){ return n*n; });
    std::cout &lt;&lt; "squares: ";
    for (int n : squares) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // take — first N elements
    auto first5 = numbers | std::views::take(5);
    std::cout &lt;&lt; "take(5): ";
    for (int n : first5) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // drop — skip first N elements
    auto after3 = numbers | std::views::drop(3);
    std::cout &lt;&lt; "drop(3): ";
    for (int n : after3) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // take_while / drop_while
    auto lessThan6 = numbers | std::views::take_while([](int n){ return n&lt;6; });
    std::cout &lt;&lt; "take_while(&lt;6): ";
    for (int n : lessThan6) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // reverse
    auto reversed = numbers | std::views::reverse;
    std::cout &lt;&lt; "reversed: ";
    for (int n : reversed) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── Composed pipeline — chaining multiple views ───────────────────────
    auto pipeline = numbers
        | std::views::filter([](int n){ return n%2==0; })      // keep evens
        | std::views::transform([](int n){ return n*n; })       // square them
        | std::views::take(4);                                   // take first 4
    std::cout &lt;&lt; "even squares (first 4): ";
    for (int n : pipeline) std::cout &lt;&lt; n &lt;&lt; " ";              // 4 16 36 64
    std::cout &lt;&lt; "\n";

    // ─── iota — generate integer sequence ─────────────────────────────────
    // Finite: [0, 10)
    std::cout &lt;&lt; "iota(0,10): ";
    for (int n : std::views::iota(0, 10)) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Infinite iota + take (lazy — only computes what's needed!)
    auto firstNFibs = std::views::iota(1)
        | std::views::take(8)
        | std::views::transform([](int n){ return n*n; });
    std::cout &lt;&lt; "1^2 to 8^2: ";
    for (int n : firstNFibs) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── keys and values views on map ─────────────────────────────────────
    #include &lt;map&gt;
    std::map&lt;std::string, int&gt; scores{{"Alice",95},{"Bob",87},{"Charlie",92}};

    std::cout &lt;&lt; "keys: ";
    for (const auto&amp; k : scores | std::views::keys) std::cout &lt;&lt; k &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    std::cout &lt;&lt; "values: ";
    for (auto v : scores | std::views::values) std::cout &lt;&lt; v &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // ─── String views ──────────────────────────────────────────────────────
    std::vector&lt;std::string&gt; words{"hello","ranges","are","amazing","cpp20","is","great"};
    auto longUpperWords = words
        | std::views::filter([](const std::string&amp; s){ return s.length() &gt; 3; })
        | std::views::transform([](const std::string&amp; s){
              std::string upper = s;
              std::ranges::transform(upper, upper.begin(), ::toupper);
              return upper;
          });
    std::cout &lt;&lt; "Long words uppercase: ";
    for (const auto&amp; w : longUpperWords) std::cout &lt;&lt; w &lt;&lt; " ";
    std::cout &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">3</span>Materializing Views &amp; Collecting Results</div>
<div class="section-body">
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">C++ — Collecting view results into containers</span><a class="try-btn" href="/?lang=cpp17">▶ Run in Compiler</a></div>
<pre><code>#include &lt;iostream&gt;
#include &lt;ranges&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;algorithm&gt;

int main() {
    std::vector&lt;int&gt; numbers{1,2,3,4,5,6,7,8,9,10};

    // Materialize into vector using ranges::to (C++23)
    // In C++20: use ranges::copy + back_inserter
    auto evens = numbers | std::views::filter([](int n){ return n%2==0; });

    std::vector&lt;int&gt; evenVec;
    std::ranges::copy(evens, std::back_inserter(evenVec));
    std::cout &lt;&lt; "Materialized evens: ";
    for (int n : evenVec) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Collect with transform into string
    std::string result;
    for (int n : numbers | std::views::filter([](int n){ return n&gt;5; }))
        result += std::to_string(n) + " ";
    std::cout &lt;&lt; "Greater than 5: " &lt;&lt; result &lt;&lt; "\n";

    // ranges::for_each with projection
    std::vector&lt;std::string&gt; names{"charlie","alice","bob","diana"};
    std::ranges::for_each(names, [](const std::string&amp; n){
        std::cout &lt;&lt; n &lt;&lt; " ";
    });
    std::cout &lt;&lt; "\n";

    // ranges::transform with back_inserter
    std::vector&lt;std::string&gt; upperNames;
    std::ranges::transform(names, std::back_inserter(upperNames),
                           [](std::string s) {
                               std::ranges::transform(s, s.begin(), ::toupper);
                               return s;
                           });
    std::cout &lt;&lt; "Uppercase: ";
    for (const auto&amp; n : upperNames) std::cout &lt;&lt; n &lt;&lt; " ";
    std::cout &lt;&lt; "\n";

    // Check with ranges predicates
    bool allPositive = std::ranges::all_of(numbers, [](int n){ return n&gt;0; });
    bool anyOver8    = std::ranges::any_of(numbers, [](int n){ return n&gt;8; });
    bool noneNeg     = std::ranges::none_of(numbers, [](int n){ return n&lt;0; });
    std::cout &lt;&lt; std::boolalpha
              &lt;&lt; "all positive: " &lt;&lt; allPositive
              &lt;&lt; " any>8: " &lt;&lt; anyOver8
              &lt;&lt; " none negative: " &lt;&lt; noneNeg &lt;&lt; "\n";
    return 0;
}</code></pre>
  </div>
</div>

<div class="section-title"><span class="num">4</span>View Adaptors Reference Table</div>
<div class="section-body">
  <table class="tbl spec-table">
    <thead><tr><th>View Adaptor</th><th>Description</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>views::filter(pred)</code></td><td>Keep elements matching predicate</td><td><code>v | views::filter(isEven)</code></td></tr>
      <tr><td><code>views::transform(fn)</code></td><td>Map each element</td><td><code>v | views::transform(square)</code></td></tr>
      <tr><td><code>views::take(n)</code></td><td>First n elements</td><td><code>v | views::take(5)</code></td></tr>
      <tr><td><code>views::drop(n)</code></td><td>Skip first n elements</td><td><code>v | views::drop(3)</code></td></tr>
      <tr><td><code>views::take_while(pred)</code></td><td>Take while predicate holds</td><td><code>v | views::take_while(lt10)</code></td></tr>
      <tr><td><code>views::drop_while(pred)</code></td><td>Skip while predicate holds</td><td><code>v | views::drop_while(lt5)</code></td></tr>
      <tr><td><code>views::reverse</code></td><td>Reverse iteration order</td><td><code>v | views::reverse</code></td></tr>
      <tr><td><code>views::iota(a, b)</code></td><td>Sequence [a, b)</td><td><code>views::iota(1, 100)</code></td></tr>
      <tr><td><code>views::iota(a)</code></td><td>Infinite sequence from a</td><td><code>views::iota(0) | views::take(10)</code></td></tr>
      <tr><td><code>views::keys</code></td><td>Keys of pair/map range</td><td><code>myMap | views::keys</code></td></tr>
      <tr><td><code>views::values</code></td><td>Values of pair/map range</td><td><code>myMap | views::values</code></td></tr>
      <tr><td><code>views::elements&lt;N&gt;</code></td><td>Nth element of tuple range</td><td><code>v | views::elements&lt;2&gt;</code></td></tr>
      <tr><td><code>views::zip(r1, r2)</code></td><td>Zip two ranges (C++23)</td><td><code>views::zip(names, scores)</code></td></tr>
      <tr><td><code>views::enumerate</code></td><td>Index + element pairs (C++23)</td><td><code>v | views::enumerate</code></td></tr>
      <tr><td><code>views::join</code></td><td>Flatten nested ranges</td><td><code>vv | views::join</code></td></tr>
      <tr><td><code>views::split(delim)</code></td><td>Split by delimiter</td><td><code>str | views::split('/')</code></td></tr>
    </tbody>
  </table>
</div>

<div class="section-title"><span class="num">5</span>Technical FAQs</div>
<div class="section-body">
  <div class="faq-grid">
    <div class="faq-item"><h4>Q1: Are views lazy or eager?</h4><p>Views are completely <strong>lazy</strong>. No computation happens when you create a view pipeline. Elements are computed one-by-one on demand as you iterate. This means <code>views::iota(0) | views::filter(pred) | views::take(5)</code> only evaluates until 5 elements are found — even from an infinite range.</p></div>
    <div class="faq-item"><h4>Q2: Do views own their data?</h4><p>No — views are <strong>non-owning</strong>. They hold references/iterators into the original range. The original container must outlive the view. Never store a view to a local container that goes out of scope — dangling reference!</p></div>
    <div class="faq-item"><h4>Q3: What is a projection in ranges algorithms?</h4><p>Projections let you specify a transformation to apply to elements before comparison: <code>ranges::sort(people, {}, &amp;Person::age)</code> sorts by age without writing a comparator lambda. Works with member pointers and lambdas.</p></div>
    <div class="faq-item"><h4>Q4: Can I collect a view into a container?</h4><p>In C++20: <code>std::ranges::copy(view, std::back_inserter(vec));</code>. In C++23: <code>auto vec = view | std::ranges::to&lt;std::vector&gt;();</code> — much more concise. The <code>to&lt;&gt;</code> function materializes the lazy view into the target container.</p></div>
    <div class="faq-item"><h4>Q5: What is the difference between std::ranges::sort and std::sort?</h4><p><code>std::ranges::sort(v)</code> accepts a single range — impossible to pass mismatched iterators. <code>std::sort(v.begin(), v.end())</code> requires an iterator pair. Both are O(n log n). Ranges version supports projections. Both have the same underlying algorithm.</p></div>
  </div>
</div>`;

makeCppLesson(21,
  '21-cpp-ranges-views-filter-transform-pipelines-and-lazy-evaluation.html',
  'C++ Ranges & Views: filter, transform, Pipelines & Lazy Evaluation (C++20) Complete Masterclass',
  'Exhaustive textbook-grade C++ Ranges & Views (Phase 21): std::ranges algorithms with projections, views::filter/transform/take/drop/iota/reverse/keys/values, composable pipelines with |, lazy evaluation, materializing views, ranges::to (C++23), all 15+ view adaptors, and C++20 vs C++23 features.',
  'Phase 21', 'Ranges & Views (C++20)',
  'Ranges vs Iterator Pairs · Projections · std::ranges algorithms · views::filter & transform · views::take & drop · take_while & drop_while · views::iota (finite & infinite) · Pipeline Composition | · views::keys & values · Lazy Evaluation · Materializing Views · C++23 zip & enumerate',
  l21,
  '20-cpp-modern-features-constexpr-structured-bindings-optional-variant-format.html', '20. constexpr, Structured Bindings, optional, variant & format',
  null, null);

console.log('\n🎉 ALL PHASES 17–21 FULLY EXPANDED WITH TEXTBOOK-GRADE CONTENT!');
