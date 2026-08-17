// Phase 8: Advanced Python Data (Deep Conceptual Theory & Step-by-Step Breakdowns)
module.exports = [
  // =========================================================================
  // CHAPTER 36: ITERATORS, GENERATORS & GENERATOR EXPRESSIONS
  // =========================================================================
  {
    num: 36,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '36-python-iterators-generators-and-expressions',
    title: 'Python Iterators & Generators',
    badge: '36. Iterators & Generators',
    subtopics: 'Iterable vs Iterator Protocol · __iter__() & __next__() · yield Keyword · State Suspension · Generator Expressions · Big Data Streams',
    desc: 'Master lazy evaluation and streaming data pipelines in Python: in-depth understanding of the Iterator Protocol (__iter__ and __next__), stack-frame suspension with yield, generator expressions, and processing gigabytes of data in constant O(1) memory.',
    sections: [
      {
        title: '1. The Iterator Protocol: Iterable vs Iterator Deep Dive',
        body: `<p>In Python, iteration is one of the most powerful and fundamental language features. Under the hood, iteration is governed by the formal <strong>Iterator Protocol</strong> consisting of two distinct roles:</p>
        
        <h4 style="color:#10b981; margin:16px 0 8px;">1. What is an Iterable?</h4>
        <p>An <strong>Iterable</strong> is any Python object capable of returning its members one at a time. Examples include lists, strings, tuples, dictionaries, sets, and open file objects. An object qualifies as an iterable if it implements the <strong><code>__iter__()</code></strong> method (or <code>__getitem__()</code> with sequential integer indices).</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">2. What is an Iterator?</h4>
        <p>An <strong>Iterator</strong> is the stateful stream object that actually produces values during traversal. An iterator maintains an internal cursor in memory and must implement two methods:</p>
        <ul>
          <li><strong><code>__iter__()</code>:</strong> Returns the iterator object itself.</li>
          <li><strong><code>__next__()</code>:</strong> Returns the next item from the container. If no further items remain, it <strong>must raise the <code>StopIteration</code> exception</strong>.</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                     THE PYTHON ITERATOR PROTOCOL                       │
├────────────────────────────────────────────────────────────────────────┤
│  Iterable: data = [10, 20, 30]                                         │
│  └── Calls it = iter(data) / data.__iter__()                           │
│                                                                        │
│  Iterator Stream Object (it):                                          │
│  ├── next(it) -> 10  (Cursor advances to position 1)                   │
│  ├── next(it) -> 20  (Cursor advances to position 2)                   │
│  ├── next(it) -> 30  (Cursor advances to position 3)                   │
│  └── next(it) -> raises StopIteration! (Clean loop termination)        │
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Demonstrating the Iterator Protocol manually step-by-step:
fruits = ["Apple", "Mango", "Banana"]

# Step 1: Obtain an iterator from the iterable list:
fruit_stream = iter(fruits)
print("Iterator Type:", type(fruit_stream))

# Step 2: Fetch elements one by one via next():
print("1st Fetch:", next(fruit_stream)) # 'Apple'
print("2nd Fetch:", next(fruit_stream)) # 'Mango'
print("3rd Fetch:", next(fruit_stream)) # 'Banana'

# Step 3: Stream is now exhausted; subsequent call raises StopIteration:
try:
    next(fruit_stream)
except StopIteration:
    print("🛑 StopIteration Exception Caught: Stream fully exhausted!")`,
        codeTitle: 'Example 1: Manually Driving an Iterator with iter() and next()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Under-the-Hood: How Python "for" Loops Work:</strong>
          <p style="margin-top:6px;">When you write <code>for x in fruits:</code>, Python executes three exact C-level steps: (1) calls <code>iter(fruits)</code>, (2) enters an infinite loop repeatedly calling <code>next()</code>, and (3) catches <code>StopIteration</code> to terminate the loop cleanly without crashing!</p>
        </div>`
      },
      {
        title: '2. Generators & The "yield" Keyword (State Suspension Mechanics)',
        body: `<p>A <strong>Generator</strong> is a special function that produces a sequence of values lazily on demand. Unlike standard functions that compute everything up-front and return a complete list in RAM, generators calculate each item only when requested.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">The Crucial Difference Between return and yield:</h4>
        <ul>
          <li><strong><code>return</code>:</strong> Computes the final value, destroys the function's local execution stack frame and local variables, and returns control to the caller.</li>
          <li><strong><code>yield</code>:</strong> Pauses execution, <strong>freezes the entire execution stack frame in RAM</strong> (all local variable values, loop counters, and instruction pointers), sends the yielded value to the caller, and waits. When <code>next()</code> is called again, execution resumes immediately at the exact line after <code>yield</code>!</li>
        </ul>

        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                 STACK-FRAME SUSPENSION WITH YIELD                      │
├────────────────────────────────────────────────────────────────────────┤
│  def count_to_three():                                                 │
│      n = 1                                                             │
│      yield n  ──>[1. Yields 1] ──>[FREEZES STACK: n=1, line=3]        │
│      n += 1                                                            │
│      yield n  ──>[2. Resumes]  ──>[Yields 2] ──>[FREEZES: n=2, line=5]│
│      n += 1                                                            │
│      yield n  ──>[3. Resumes]  ──>[Yields 3] ──>[FREEZES: n=3, line=7]│
└────────────────────────────────────────────────────────────────────────┘</div>`,
        code: `# Generator function demonstrating state suspension:
def countdown_timer(start_seconds):
    """Yields countdown numbers lazily."""
    current = start_seconds
    while current > 0:
        print(f"  [Generator Internals] Yielding {current} and freezing state...")
        yield current
        current -= 1 # Resumes here on next call!
    print("  [Generator Internals] Countdown complete!")

print("--- Calling Generator Function ---")
# Calling the generator function returns a generator object instantly without executing code:
timer_gen = countdown_timer(3)
print("Generator Object Created:", timer_gen)

print("\\n--- Iterating Through Values Lazily ---")
for sec in timer_gen:
    print(f"👉 Received: {sec}s remaining")`,
        codeTitle: 'Example 2: Generator Function with yield and State Suspension',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Memory Comparison:</strong>
          <p style="margin-top:6px;">If <code>start_seconds = 100,000,000</code>, creating a list <code>list(range(100_000_000))</code> would require <strong>~800 Megabytes</strong> of RAM. The generator requires only <strong>~120 Bytes</strong> because it produces numbers one at a time on the fly.</p>
        </div>`
      },
      {
        title: '3. Generator Expressions ((expr for x in seq)) vs List Comprehensions',
        body: `<p>A <strong>Generator Expression</strong> uses the exact same syntax as a list comprehension, but replaces square brackets <code>[...]</code> with parentheses <code>(...)</code>.</p>
        
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Feature</th><th>List Comprehension <code>[...]</code></th><th>Generator Expression <code>(...)</code></th></tr>
          <tr><td><strong>Evaluation</strong></td><td><strong>Eager</strong> (Calculates all elements immediately)</td><td><strong>Lazy</strong> (Calculates elements one-by-one on demand)</td></tr>
          <tr><td><strong>Memory</strong></td><td>$O(N)$ memory (Scales linearly with dataset size)</td><td>$O(1)$ constant memory (~100 bytes regardless of size)</td></tr>
          <tr><td><strong>Access</strong></td><td>Indexed random access (<code>lst[5]</code>) and slicing</td><td>Sequential streaming access only (via <code>next()</code> or loop)</td></tr>
          <tr><td><strong>Reusability</strong></td><td>Can be iterated multiple times</td><td>Exhausted after a single iteration pass</td></tr>
        </table>`,
        code: `import sys

# 1. Eager List Comprehension (Allocates memory for 1,000,000 items in RAM):
list_squares = [x ** 2 for x in range(1_000_000)]

# 2. Lazy Generator Expression (Allocates only lightweight generator state object):
gen_squares = (x ** 2 for x in range(1_000_000))

print(f"📦 List Comprehension Memory: {sys.getsizeof(list_squares):,} bytes (~8.4 MB)")
print(f"⚡ Generator Expression Memory:  {sys.getsizeof(gen_squares):,} bytes (Constantly tiny!)")

# Passing generator expressions directly into aggregation functions:
total_sum = sum(x ** 2 for x in range(1000)) # Parentheses can be omitted inside functions!
print(f"\\nSum of squares up to 1000: {total_sum:,}")`,
        codeTitle: 'Example 3: Memory Footprint Comparison & Aggregation Functions',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Performance Best Practice:</strong>
          <p style="margin-top:6px;">When passing data into aggregation functions like <code>sum()</code>, <code>max()</code>, <code>min()</code>, or <code>any()</code>, always use a generator expression without square brackets to avoid creating unnecessary intermediate lists in RAM.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Attempting to Re-Iterate Over an Exhausted Generator',
      text: 'Generators are one-way data streams. Once an iterator reaches the end and raises StopIteration, subsequent for-loops over that instance will execute 0 times. To re-iterate, you must instantiate a fresh generator.'
    },
    tryIt: {
      desc: 'Write a generator fibonacci(limit) that yields Fibonacci numbers up to limit. Print all generated numbers in a single line.',
      code: `def fibonacci(limit):
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b

print("Fibonacci numbers up to 100:")
for num in fibonacci(100):
    print(num, end=" ")
print()`
    },
    faqs: [
      {
        q: 'What is the difference between yield and yield from in Python?',
        a: 'yield from iterable is used to delegate part of a generator\'s operations to another sub-generator or iterable, cleanly transparently forwarding values.'
      },
      {
        q: 'Can generators receive data from the caller while running?',
        a: 'Yes! You can pass values into a running generator using generator.send(value). Inside the generator, the yield expression evaluates to the received value.'
      },
      {
        q: 'Are generators thread-safe in Python?',
        a: 'Calling next() on the same generator instance simultaneously from multiple threads is not thread-safe without explicit synchronization (threading.Lock).'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 37: CLOSURES, DECORATORS & WRAPPERS
  // =========================================================================
  {
    num: 37,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '37-python-closures-decorators-and-wrappers',
    title: 'Python Closures & Decorators',
    badge: '37. Closures & Decorators',
    subtopics: 'First-Class Functions · Lexical Closures · @decorator Syntax · functools.wraps · Decorators with Arguments · Execution Timers · Role Authorization',
    desc: 'Master metaprogramming and aspect-oriented design in Python: in-depth understanding of first-class functions, lexical closures, function wrappers with @decorator syntax, preserving metadata with functools.wraps, and writing production decorators with configurable arguments.',
    sections: [
      {
        title: '1. First-Class Functions & Lexical Closures in Python',
        body: `<p>In Python, functions are <strong>First-Class Objects</strong>. This means functions can be assigned to variables, passed as arguments into other functions, stored in data structures, and returned from functions.</p>

        <h4 style="color:#10b981; margin:16px 0 8px;">What is a Lexical Closure?</h4>
        <p>A <strong>Closure</strong> is a function object that remembers values in enclosing lexical scopes even if those scopes are no longer present in memory.</p>
        <p>For a closure to occur, three criteria must be met:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li>There must be a nested function (a function inside a function).</li>
          <li>The inner nested function must reference a variable from the enclosing parent function.</li>
          <li>The enclosing parent function must return the inner function object.</li>
        </ol>`,
        code: `# Function Factory creating customizable power calculation closures:
def make_power_calculator(exponent):
    """Enclosing parent function."""
    def power(base):
        """Inner function remembering 'exponent' from parent scope."""
        return base ** exponent
    return power  # Returns the inner function object!

# Create specialized mathematical power functions:
square = make_power_calculator(2)
cube = make_power_calculator(3)

print("Square of 5:", square(5))  # 25 (remembers exponent = 2)
print("Cube of 5:  ", cube(5))    # 125 (remembers exponent = 3)
print("Square Closure cell contents:", square.__closure__[0].cell_contents)`,
        codeTitle: 'Example 1: Function Factory Closures Retaining Enclosing State',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 How Closures Work in CPython:</strong>
          <p style="margin-top:6px;">When <code>make_power_calculator</code> finishes executing, its local stack frame is destroyed. However, Python detects that the inner function references <code>exponent</code>, so it stores <code>exponent</code> in a special persistent tuple of <strong>cell objects</strong> (<code>__closure__</code>) attached to the returned function.</p>
        </div>`
      },
      {
        title: '2. Decorator Fundamentals & The Critical Role of @functools.wraps',
        body: `<p>A <strong>Decorator</strong> is a higher-order function that takes another function as an argument, extends or alters its behavior without modifying its source code, and returns the enhanced function.</p>
        
        <div class="diagram-box">┌────────────────────────────────────────────────────────────────────────┐
│                        DECORATOR SYNTACTIC SUGAR                       │
├────────────────────────────────────────────────────────────────────────┤
│  @my_decorator                                                         │
│  def calculate(): ...                                                  │
│                                                                        │
│  Is 100% equivalent to writing:                                        │
│  calculate = my_decorator(calculate)                                   │
└────────────────────────────────────────────────────────────────────────┘</div>

        <h4 style="color:#10b981; margin:16px 0 8px;">Why <code>@functools.wraps</code> is Strictly Mandatory:</h4>
        <p>When you wrap a function, the inner wrapper function replaces the original function object. Without <code>@functools.wraps(func)</code>, the original function\'s identity is erased:</p>
        <ul>
          <li><code>func.__name__</code> becomes <code>"wrapper"</code> instead of <code>"calculate"</code>.</li>
          <li><code>func.__doc__</code> is erased.</li>
          <li>Docstring inspection, unit test runners, and frameworks (like FastAPI and Sphinx) break completely!</li>
        </ul>`,
        code: `import functools
import time

def benchmark_timer(func):
    """Production execution timer decorator preserving original function metadata."""
    @functools.wraps(func)  # Crucial: Preserves __name__, __doc__, and type annotations!
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)  # Call original function with any arguments
        duration_ms = (time.perf_counter() - start) * 1000
        print(f"⏱️ [{func.__name__}] Finished in {duration_ms:.3f} ms")
        return result
    return wrapper

# Apply decorator using @ syntax:
@benchmark_timer
def process_data(limit):
    """Processes computational numbers up to limit."""
    return sum(x ** 2 for x in range(limit))

# Execute decorated function:
res = process_data(500_000)
print("Result Total:", res)
print("Original Function Name Preserved:", process_data.__name__)
print("Original Docstring Preserved:   ", process_data.__doc__)`,
        codeTitle: 'Example 2: Execution Timer Decorator with @functools.wraps',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 *args and **kwargs in Wrappers:</strong>
          <p style="margin-top:6px;">By accepting <code>*args, **kwargs</code> and unpacking them as <code>func(*args, **kwargs)</code>, your decorator becomes universally applicable to any function regardless of its argument signature.</p>
        </div>`
      },
      {
        title: '3. Advanced Decorators with Configurable Arguments (3-Level Nesting)',
        body: `<p>To pass custom configuration arguments directly into a decorator (e.g. <code>@retry(max_attempts=3, delay=1.0)</code>), you must implement a <strong>3-level nested function factory</strong>:</p>
        <ol style="line-height:1.8; margin-left:20px;">
          <li><strong>Level 1 (Outer Decorator Factory):</strong> Receives configuration parameters (e.g. <code>max_attempts</code>).</li>
          <li><strong>Level 2 (Middle Decorator):</strong> Receives the target function to be decorated.</li>
          <li><strong>Level 3 (Inner Wrapper):</strong> Receives arguments (<code>*args, **kwargs</code>) and executes the core wrapper logic.</li>
        </ol>`,
        code: `import functools

def repeat(num_times=2):
    """Decorator factory accepting custom configuration parameters."""
    def decorator_repeat(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_result = None
            for i in range(num_times):
                print(f"🔄 Execution #{i+1} of {func.__name__}():")
                last_result = func(*args, **kwargs)
            return last_result
        return wrapper
    return decorator_repeat

# Applying decorator with custom configuration:
@repeat(num_times=3)
def send_alert(message):
    print(f"   🔔 ALERT: {message}")

send_alert("Database connection threshold reached!")`,
        codeTitle: 'Example 3: 3-Level Decorator Factory with Configurable Arguments',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Industry Application:</strong>
          <p style="margin-top:6px;">This 3-level factory pattern is the exact architectural mechanism used by web frameworks like FastAPI (<code>@app.get("/users/{id}")</code>) and testing libraries like pytest (<code>@pytest.mark.parametrize(...)</code>).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Omitting Parentheses When Applying a Decorator Factory',
      text: 'If a decorator is defined as a factory with arguments def my_dec(arg=1):, you MUST apply it with parentheses @my_dec() even when using default arguments. Writing @my_dec without parentheses passes the function into the factory instead of the inner decorator!'
    },
    tryIt: {
      desc: 'Build an authorization decorator require_role(allowed_role) that checks if user["role"] matches allowed_role before allowing function execution.',
      code: `import functools

def require_role(allowed_role):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(user, *args, **kwargs):
            if user.get("role") != allowed_role:
                print(f"❌ Access Denied: User '{user.get('name')}' is not a {allowed_role}!")
                return None
            return func(user, *args, **kwargs)
        return wrapper
    return decorator

@require_role("Admin")
def purge_cache(user):
    print(f"✅ Cache purged successfully by {user['name']}!")

user1 = {"name": "Balaji", "role": "Admin"}
user2 = {"name": "Alex", "role": "Guest"}

purge_cache(user1) # Success
purge_cache(user2) # Blocked`
    },
    faqs: [
      {
        q: 'What is the order of execution when stacking multiple decorators?',
        a: 'Decorators execute from bottom to top (inside out). If you write @dec_a above @dec_b, the resulting execution is dec_a(dec_b(func)).'
      },
      {
        q: 'What is functools.lru_cache?',
        a: 'lru_cache is a built-in standard library decorator that memoizes function return values, caching results of expensive recursive or I/O calls based on argument hashes.'
      },
      {
        q: 'Can classes be used as decorators in Python?',
        a: 'Yes! Any Python class that implements the __call__() magic method can act as a decorator, which is especially useful when the decorator needs to maintain state across multiple calls.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 38: CUSTOM CONTEXT MANAGERS & CONTEXTLIB
  // =========================================================================
  {
    num: 38,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '38-python-custom-context-managers-and-contextlib',
    title: 'Python Context Managers & contextlib',
    badge: '38. Context Managers',
    subtopics: '__enter__() and __exit__() Protocol · Suppressing Exceptions · @contextmanager Generator · Database Transaction & Timer Contexts',
    desc: 'Master resource lifecycle management with Python Context Managers: building class-based context managers with __enter__ and __exit__, handling exceptions gracefully, and using the contextlib.contextmanager generator decorator for clean resource management.',
    sections: [
      {
        title: '1. The Context Manager Protocol (__enter__ and __exit__)',
        body: `<p>The Python <strong>Context Manager Protocol</strong> powers the <code>with</code> statement, guaranteeing deterministic resource acquisition and release.</p>
        <p>A class implements the protocol by defining two methods:</p>
        <ol>
          <li><strong><code>__enter__(self)</code>:</strong> Runs when entering the <code>with</code> block. Its return value is bound to the variable after <code>as</code>.</li>
          <li><strong><code>__exit__(self, exc_type, exc_val, exc_tb)</code>:</strong> Runs when exiting the <code>with</code> block. If an exception occurred inside the block, its details are passed into these arguments. Returning <code>True</code> from <code>__exit__</code> <strong>suppresses the exception</strong>; returning <code>False</code> allows it to propagate!</li>
        </ol>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  with ManagedResource() as res:                        │
│      1. __enter__() is executed (Allocates resource)   │
│      2. Body code executes                             │
│      3. __exit__() is executed (Releases resource 100%)│
└────────────────────────────────────────────────────────┘</div>`,
        code: `# Class-based Custom File / Resource Context Manager:
class ManagedFile:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        print(f"🔓 [__enter__] Opening file: {self.filename}")
        self.file = open(self.filename, self.mode, encoding="utf-8")
        return self.file # Bound to 'as f'

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"🔒 [__exit__] Closing file: {self.filename}")
        if self.file:
            self.file.close()
        # Returning False allows any exception inside the block to propagate properly
        return False

# Using custom context manager:
with ManagedFile("demo_context.txt", "w") as f:
    f.write("Hello from custom ManagedFile context manager! 🚀\\n")

print("Is file closed?", f.closed) # True!`,
        codeTitle: 'Example 1: Class-based Context Manager with __enter__ and __exit__',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Resource Safety:</strong>
          <p style="margin-top:6px;">Even if a divide-by-zero or network error occurs inside the <code>with</code> block, <code>__exit__</code> is guaranteed to execute and close the file descriptor.</p>
        </div>`
      },
      {
        title: '2. The contextlib.contextmanager Generator Decorator',
        body: `<p>Writing a full class with <code>__enter__</code> and <code>__exit__</code> for small tasks can feel verbose. The standard library <strong><code>@contextlib.contextmanager</code> decorator</strong> turns any Python generator with a single <code>yield</code> into a complete context manager!</p>
        <div class="diagram-box">1. Code before yield  ==>  Runs during __enter__
2. Value in yield     ==>  Bound to 'as variable'
3. Code after yield   ==>  Runs during __exit__ (inside finally!)</div>`,
        code: `import time
from contextlib import contextmanager

# 1. Performance Stopwatch Context Manager in 8 lines:
@contextmanager
def code_timer(label="Operation"):
    start = time.perf_counter()
    print(f"⏳ [{label}] Started...")
    try:
        yield # Body of with block executes here!
    finally:
        end = time.perf_counter()
        duration_ms = (end - start) * 1000
        print(f"⌛ [{label}] Finished in {duration_ms:.3f} ms")

# Using the generator context manager:
with code_timer("Data Processing Pipeline"):
    # Simulate data computation:
    results = [x ** 2 for x in range(300_000)]
    time.sleep(0.05)`,
        codeTitle: 'Example 2: Elegant Generator Context Manager with contextlib',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Mandatory try-finally Rule:</strong>
          <p style="margin-top:6px;">Always place the code after <code>yield</code> inside a <code>finally:</code> block to guarantee cleanup runs even if an exception occurs inside the <code>with</code> block.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Omitting try-finally in @contextlib.contextmanager Generators',
      text: 'If you write code after yield without wrapping it in a try-finally block, an exception inside the caller\'s with block will prevent your cleanup code from executing at all!'
    },
    tryIt: {
      desc: 'Build a context manager temporary_state(data_dict, key, temp_val) that sets a key to a temporary value inside the block and automatically restores the original value upon exit.',
      code: `from contextlib import contextmanager

@contextmanager
def temporary_setting(config_dict, key, temp_val):
    original_val = config_dict.get(key)
    config_dict[key] = temp_val
    try:
        yield
    finally:
        config_dict[key] = original_val

settings = {"debug": False, "env": "production"}
print("Initial Settings:", settings)

with temporary_setting(settings, "debug", True):
    print("Inside with block:", settings)

print("Outside with block:", settings)`
    },
    faqs: [
      {
        q: 'How can a context manager suppress an exception?',
        a: 'In a class-based context manager, returning True from __exit__() informs Python that the exception has been handled and should not propagate.'
      },
      {
        q: 'Can multiple context managers be combined in a single with statement?',
        a: 'Yes! You can chain multiple context managers with commas: with open("in.txt") as f_in, open("out.txt", "w") as f_out:.'
      },
      {
        q: 'What is contextlib.suppress in Python?',
        a: 'contextlib.suppress(*exceptions) is a built-in context manager that silently suppresses specified exceptions: with contextlib.suppress(FileNotFoundError): os.remove("file.tmp").'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 39: FUNCTIONAL PROGRAMMING — MAP, FILTER, REDUCE
  // =========================================================================
  {
    num: 39,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '39-python-functional-programming-map-filter-reduce',
    title: 'Python Functional Programming',
    badge: '39. Functional Programming',
    subtopics: 'Higher-Order Functions · map() · filter() · functools.reduce() · Pure Transformations · Function Pipelines',
    desc: 'Master functional programming idioms in Python: processing collections with map(), filtering datasets with filter(), aggregating values with functools.reduce(), and building declarative data transformation pipelines.',
    sections: [
      {
        title: '1. What are Higher-Order Functions? The Functional Paradigm',
        body: `<p>A <strong>Higher-Order Function</strong> is a function that takes one or more functions as arguments, or returns a function as its result. Functional programming treats computation as the evaluation of mathematical pure functions and avoids mutable shared state.</p>
        <p>Python provides three classic functional primitives: <strong><code>map()</code></strong>, <strong><code>filter()</code></strong>, and <strong><code>reduce()</code></strong>.</p>`,
        code: `# Higher-Order Function taking an operation function as an argument:
def apply_transformation(data_list, transform_func):
    return [transform_func(item) for item in data_list]

prices = [100, 250, 400]
gst_prices = apply_transformation(prices, lambda p: p * 1.18)
discounted_prices = apply_transformation(prices, lambda p: p * 0.90)

print("Original Prices:   ", prices)
print("With 18% GST:      ", gst_prices)
print("With 10% Discount: ", discounted_prices)`,
        codeTitle: 'Example 1: Higher-Order Function Transformation',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Declarative Style:</strong>
          <p style="margin-top:6px;">Instead of writing imperative for-loops with index counters, higher-order functions allow you to declare <em>what</em> transformation to perform.</p>
        </div>`
      },
      {
        title: '2. The map() & filter() Built-in Iterators',
        body: `<p>Both <code>map()</code> and <code>filter()</code> return <strong>lazy iterators</strong> in Python 3, consuming zero memory until iterated:</p>
        <ul>
          <li><code>map(func, iterable)</code>: Applies <code>func</code> to every item in the collection.</li>
          <li><code>filter(func, iterable)</code>: Keeps only elements for which <code>func(item)</code> evaluates to <strong>True</strong>.</li>
        </ul>`,
        code: `# Raw student test scores:
scores = [45, 88, 92, 35, 78, 60, 95]

# 1. filter() passing students (score >= 50):
passing_scores = list(filter(lambda s: s >= 50, scores))
print("Passing Scores (>= 50):", passing_scores)

# 2. map() converting raw scores to percentages with bonus +5:
curved_scores = list(map(lambda s: min(100, s + 5), passing_scores))
print("Curved Scores (+5 bonus):", curved_scores)`,
        codeTitle: 'Example 2: Data Pipelines with map() and filter()',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 map/filter vs List Comprehensions:</strong>
          <p style="margin-top:6px;">While <code>[s+5 for s in scores if s>=50]</code> is often preferred in modern Python for readability, <code>map</code> and <code>filter</code> shine when combining pre-existing named functions (e.g. <code>list(map(str.strip, lines))</code>).</p>
        </div>`
      },
      {
        title: '3. Cumulative Aggregations with functools.reduce()',
        body: `<p><strong><code>reduce(function, sequence, [initial])</code></strong> (from the <code>functools</code> module) applies a rolling two-argument function cumulatively across all elements from left to right, reducing the entire collection to a single scalar value:</p>
        <div class="diagram-box">Sequence: [1, 2, 3, 4] with function (a, b) -> a * b
Step 1: (1 * 2) = 2
Step 2: (2 * 3) = 6
Step 3: (6 * 4) = 24  ==> Final Reduced Value: 24</div>`,
        code: `from functools import reduce

numbers = [1, 2, 3, 4, 5]

# 1. Calculate factorial / product of all numbers:
product = reduce(lambda acc, val: acc * val, numbers)
print("Product of [1..5]:", product) # 120

# 2. Find the maximum element using reduce:
raw_vals = [42, 17, 99, 23, 85]
max_val = reduce(lambda a, b: a if a > b else b, raw_vals)
print("Max value via reduce:", max_val) # 99`,
        codeTitle: 'Example 3: Cumulative Aggregation with functools.reduce',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Initial Value Parameter:</strong>
          <p style="margin-top:6px;">You can pass an optional initial accumulator: <code>reduce(func, seq, 100)</code> starts aggregation with <code>100</code>.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Forgetting that map() and filter() Return Lazy Iterators in Python 3',
      text: 'In Python 2, map() and filter() returned lists. In Python 3, they return lazy iterators! Printing map(...) will output "<map object at 0x...>" instead of the values. Wrap with list() to inspect contents: list(map(...)).'
    },
    tryIt: {
      desc: 'Use filter() to extract all words starting with the letter "P" (case-insensitive) from a list of words, and use map() to uppercase them.',
      code: `words = ["python", "java", "Pandas", "c++", "PyTorch", "rust"]

p_words = list(map(str.upper, filter(lambda w: w.lower().startswith("p"), words)))
print("Cleaned P-words:", p_words)`
    },
    faqs: [
      {
        q: 'Why was reduce() moved from built-in scope to functools in Python 3?',
        a: 'Guido van Rossum moved reduce() to functools because explicit for-loops or dedicated built-ins like sum(), any(), and all() are almost always more readable and Pythonic for 99% of use cases.'
      },
      {
        q: 'Can map() take multiple iterable arguments simultaneously?',
        a: 'Yes! map(lambda a, b: a + b, list1, list2) adds elements from both lists pairwise in parallel, stopping when the shortest iterable exhausts.'
      },
      {
        q: 'What is the difference between list comprehensions and map() in speed?',
        a: 'When using a lambda function, list comprehensions are faster due to bytecode optimizations. When passing an existing built-in C function (like map(int, str_list)), map() is slightly faster.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 40: REGULAR EXPRESSIONS & ADVANCED SYNTAX
  // =========================================================================
  {
    num: 40,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '40-python-regular-expressions-and-pattern-matching',
    title: 'Python Regular Expressions (re) & Enums',
    badge: '40. Regular Expressions & Enums',
    subtopics: 're Module · search() vs match() vs findall() · sub() String Replacement · Named Groups · enum.Enum · Destructuring & | Operator',
    desc: 'Master textual pattern matching and modern Python syntax: regular expression processing with the re module, email and phone extraction, string sanitization with re.sub(), type-safe enumerations with enum.Enum, and extended dictionary merging.',
    sections: [
      {
        title: '1. Pattern Matching with the re Module (search, findall, sub)',
        body: `<p>A <strong>Regular Expression (RegEx)</strong> is a powerful domain-specific pattern language used to search, validate, and manipulate text strings.</p>
        <p>Python provides the built-in <strong><code>re</code> module</strong>. Always use <strong>Raw Strings (<code>r"..."</code>)</strong> for regex patterns so backslashes (like <code>\\d</code>) are not misinterpreted as Python escape characters:</p>
        <table class="tbl" style="margin-top:8px; font-size:12.5px;">
          <tr><th>Function</th><th>Behavior</th></tr>
          <tr><td><code>re.search(pattern, text)</code></td><td>Scans entire string and returns the <strong>first Match object</strong> (or <code>None</code>).</td></tr>
          <tr><td><code>re.match(pattern, text)</code></td><td>Matches pattern strictly from the <strong>very start</strong> of the string.</td></tr>
          <tr><td><code>re.findall(pattern, text)</code></td><td>Returns a <strong>list of all matching substrings</strong>.</td></tr>
          <tr><td><code>re.sub(pattern, repl, text)</code></td><td>Replaces all occurrences matching pattern with replacement text.</td></tr>
        </table>`,
        code: `import re

log_text = """
2026-08-14 10:15:02 User balaji.dev@example.com logged in from 192.168.1.45.
2026-08-14 10:18:30 User alex_smith99@domain.org failed login from 10.0.0.12.
2026-08-14 10:22:11 User chloe.davis@techcorp.io logged in from 172.16.0.5.
"""

# 1. Extract all Email addresses using findall:
email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
emails = re.findall(email_pattern, log_text)
print("📧 Extracted Email Addresses:")
for email in emails:
    print("•", email)

# 2. Extract all IPv4 Addresses using findall:
ip_pattern = r'\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'
ips = re.findall(ip_pattern, log_text)
print("\\n🌐 Extracted IP Addresses:", ips)

# 3. Anonymize/Mask emails using re.sub:
masked_log = re.sub(email_pattern, "[CONFIDENTIAL_EMAIL]", log_text)
print("\\n🛡️ Masked Security Log:")
print(masked_log.strip())`,
        codeTitle: 'Example 1: Email and IP Discovery and Sanitization with re',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Common Regex Metacharacters:</strong>
          <ul style="margin:8px 0 0 18px; line-height:1.7;">
            <li><code>\\d</code>: Any digit (0-9). <code>\\w</code>: Any alphanumeric word character.</li>
            <li><code>+</code>: 1 or more occurrences. <code>*</code>: 0 or more occurrences.</li>
            <li><code>\\b</code>: Word boundary anchor.</li>
          </ul>
        </div>`
      },
      {
        title: '2. Capture Groups & Structured Extraction',
        body: `<p>Use parentheses <code>(...)</code> to define <strong>Capture Groups</strong> to extract structured sub-components (such as date parts, phone country codes, or user credentials):</p>`,
        code: `import re

contact_str = "Support Hotline: +91-98765-43210 (Mon-Fri 9AM-6PM)"

# Named Capture Groups (?P<group_name>pattern):
phone_pattern = r'\+(?P<country_code>\d{1,3})-(?P<prefix>\d{3,5})-(?P<line_no>\d{4,6})'
match = re.search(phone_pattern, contact_str)

if match:
    print("Full Matched Number:", match.group(0))
    print("Country Code:       +", match.group("country_code"))
    print("Line Number:        ", match.group("line_no"))
    print("Named Groups Dict:  ", match.groupdict())`,
        codeTitle: 'Example 2: Named Capture Groups with re.search',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Named Groups Advantage:</strong>
          <p style="margin-top:6px;"><code>(?P<name>...)</code> allows you to extract fields as dictionary keys via <code>match.groupdict()</code>, making code immune to regex group index changes.</p>
        </div>`
      },
      {
        title: '3. Type-Safe Enumerations with enum.Enum',
        body: `<p>Instead of using raw string constants (like <code>"PENDING"</code> or <code>"COMPLETED"</code>) which are prone to typos, Python provides <strong>Type-Safe Enumerations (<code>enum.Enum</code>)</strong>:</p>`,
        code: `from enum import Enum, auto

class OrderStatus(Enum):
    PENDING = auto()    # Automatically assigns incremental values
    PROCESSING = auto()
    SHIPPED = auto()
    DELIVERED = auto()
    CANCELLED = auto()

def update_order(order_id, status: OrderStatus):
    if not isinstance(status, OrderStatus):
        raise TypeError("status must be a valid OrderStatus enum member!")
    print(f"📦 Order #{order_id} status updated to: {status.name} (Value: {status.value})")

update_order(1001, OrderStatus.PROCESSING)
update_order(1001, OrderStatus.DELIVERED)`,
        codeTitle: 'Example 3: Type-Safe Enumerations with enum.Enum',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Benefits of Enums:</strong>
          <p style="margin-top:6px;">Enums prevent invalid state bugs, provide instant IDE autocomplete, and allow safe comparison with <code>status is OrderStatus.DELIVERED</code>.</p>
        </div>`
      },
      {
        title: '4. Modern Destructuring & Dictionary Merging (| Operator)',
        body: `<p>Python 3.9+ introduced the dedicated <strong>Dictionary Merge Operator (<code>|</code>)</strong> and update operator (<code>|=</code>):</p>`,
        code: `# 1. Extended sequence destructuring:
numbers = [1, 2, 3, 4, 5, 6]
first, *middle, last = numbers
print(f"First: {first} | Middle: {middle} | Last: {last}")

# 2. Modern Dictionary Merging with | (Python 3.9+):
default_config = {"theme": "dark", "font_size": 14, "auto_save": True}
user_overrides = {"font_size": 16, "show_minimap": False}

# Merges both dictionaries, right operand values override left:
active_config = default_config | user_overrides
print("\\nMerged Active Config:")
print(active_config)`,
        codeTitle: 'Example 4: Modern Destructuring and Dictionary Merge Operator',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Clean Syntax:</strong>
          <p style="margin-top:6px;"><code>dict_a | dict_b</code> replaces clumsy legacy patterns like <code>{**dict_a, **dict_b}</code> or multi-line <code>.update()</code> calls.</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Using match() when search() was intended',
      text: 're.match() matches strictly at index 0 of the string. If the pattern appears at character 5, re.match() returns None! Always use re.search() to search anywhere across the entire text.'
    },
    tryIt: {
      desc: 'Use regex to validate whether a username is valid: alphanumeric characters and underscores only, length between 4 and 16 characters (r"^[a-zA-Z0-9_]{4,16}$").',
      code: `import re

def is_valid_username(username):
    pattern = r'^[a-zA-Z0-9_]{4,16}$'
    return bool(re.match(pattern, username))

test_users = ["balaji_dev", "a", "super_long_user_name_invalid", "alex@99", "chloe_2026"]
for u in test_users:
    print(f"'{u:28}' -> {'Valid ✅' if is_valid_username(u) else 'Invalid ❌'}")`
    },
    faqs: [
      {
        q: 'Why should I pre-compile regex patterns with re.compile()?',
        a: 'If you execute a regular expression repeatedly in a loop (e.g. over 100,000 log lines), pre-compiling with pattern = re.compile(r"...") saves compilation CPU cycles on each iteration.'
      },
      {
        q: 'What is the difference between greedy and non-greedy regex matching?',
        a: 'By default, qualifiers (*, +) are greedy, matching the longest possible string. Adding ? (*?, +?) makes them non-greedy (lazy), matching the shortest possible string.'
      },
      {
        q: 'Can enum members be compared with "is"?',
        a: 'Yes! Enum members are unique singletons in Python memory, so status is OrderStatus.PENDING is fast and safe.'
      }
    ]
  },

  // =========================================================================
  // CHAPTER 41: MEMORY MANAGEMENT, GC & PROFILING
  // =========================================================================
  {
    num: 41,
    phaseId: 'phase8',
    phaseTitle: 'Phase 8: Advanced Python',
    slug: '41-python-memory-management-gc-and-profiling',
    title: 'Python Memory, GC & Profiling',
    badge: '41. Memory, GC & Profiling',
    subtopics: 'Shallow vs Deep Copy · PyObject Anatomy · Reference Counting · Generational GC (Gen 0, 1, 2) · timeit & cProfile · EAFP vs LBYL',
    desc: 'Master the internal CPython memory architecture and performance optimization: shallow vs deep copying, PyObject structure, reference counting mechanics, cyclic garbage collection (gc module), microbenchmarks with timeit, bottlenecks with cProfile, and idiomatic Pythonic style (EAFP).',
    sections: [
      {
        title: '1. Shallow Copy vs Deep Copy (copy module)',
        body: `<p>Understanding object copying is fundamental to preventing silent data corruption:</p>
        <ul>
          <li><strong>Reference Assignment (<code>b = a</code>):</strong> Zero copying. Both names point to the <strong>exact same memory address</strong> (<code>id(a) == id(b)</code>).</li>
          <li><strong>Shallow Copy (<code>copy.copy(a)</code> or <code>a.copy()</code>):</strong> Creates a new outer container, but child elements are still references to original nested objects!</li>
          <li><strong>Deep Copy (<code>copy.deepcopy(a)</code>):</strong> Recursively clones the outer container AND all nested child lists/dictionaries into completely independent memory objects!</li>
        </ul>
        <div class="diagram-box">┌────────────────────────────────────────────────────────┐
│  Original: matrix = [[1, 2], [3, 4]]                   │
├────────────────────────────────────────────────────────┤
│  Shallow Copy: Clones outer list; inner sublists shared│
│  Deep Copy:    Recursively duplicates all inner lists  │
└────────────────────────────────────────────────────────┘</div>`,
        code: `import copy

# Nested data structure:
original = [[1, 2], [3, 4]]

shallow = copy.copy(original)
deep = copy.deepcopy(original)

# Modify nested element in original list:
original[0][0] = 999

print("Original list after mutation:   ", original) # [[999, 2], [3, 4]]
print("Shallow copy (INNER CORRUPTED!):", shallow)  # [[999, 2], [3, 4]] (Shares inner sublist!)
print("Deep copy (SAFE & ISOLATED!):    ", deep)     # [[1, 2], [3, 4]] (Completely untouched!)`,
        codeTitle: 'Example 1: Shallow Copy vs Deep Copy Demonstration',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 When to use Deep Copy:</strong>
          <p style="margin-top:6px;">Always use <code>copy.deepcopy()</code> when cloning complex nested structures (like state dictionaries, game boards, or JSON configs) to prevent unintended side effects.</p>
        </div>`
      },
      {
        title: '2. CPython Memory Management: Reference Counting & PyObject',
        body: `<p>In standard CPython, every object is represented by a C struct called <code>PyObject</code> containing:</p>
        <ol>
          <li><code>ob_refcnt</code>: The <strong>Reference Count</strong> tracking how many variables point to this object.</li>
          <li><code>ob_type</code>: Pointer to the object\'s data type descriptor.</li>
          <li>Value payload.</li>
        </ol>
        <p><strong>Immediate Deallocation:</strong> As soon as an object\'s reference count drops to <code>0</code> (e.g. when a variable goes out of scope or <code>del x</code> is executed), CPython <strong>immediately reclaims the memory on the spot</strong>!</p>`,
        code: `import sys

# 1. Create a fresh list object:
sample = [1, 2, 3]

# sys.getrefcount() returns current reference count (includes temporary call ref):
print("Reference count for 'sample':", sys.getrefcount(sample) - 1) # 1

# 2. Add another reference pointer:
alias_ptr = sample
print("After creating 'alias_ptr':  ", sys.getrefcount(sample) - 1) # 2

# 3. Delete one reference:
del alias_ptr
print("After 'del alias_ptr':       ", sys.getrefcount(sample) - 1) # 1`,
        codeTitle: 'Example 2: Inspecting CPython Reference Counting with sys.getrefcount',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 sys.getrefcount note:</strong>
          <p style="margin-top:6px;">We subtract 1 because passing <code>sample</code> as an argument to <code>sys.getrefcount()</code> temporarily increases the reference count by 1 during the function call.</p>
        </div>`
      },
      {
        title: '3. Generational Garbage Collector (Handling Cyclic References)',
        body: `<p>Reference counting alone has a major fatal flaw: <strong>Circular References</strong> (Object A points to Object B, and Object B points to Object A). Even if you delete both external variables, their reference count never drops to 0!</p>
        <p>To resolve this, CPython includes a <strong>Cyclic Generational Garbage Collector (GC)</strong> that runs in the background:</p>
        <ul>
          <li><strong>Generation 0 (Youngest):</strong> Newly allocated objects. Collected very frequently.</li>
          <li><strong>Generation 1:</strong> Objects surviving Gen 0 collections.</li>
          <li><strong>Generation 2 (Oldest):</strong> Long-lived objects surviving Gen 1. Collected rarely.</li>
        </ul>`,
        code: `import gc

# 1. Create a circular reference cycle:
class Node:
    def __init__(self, name):
        self.name = name
        self.partner = None

node1 = Node("A")
node2 = Node("B")

node1.partner = node2 # node1 points to node2
node2.partner = node1 # node2 points to node1 (CYCLE!)

# Delete external variables:
del node1
del node2

# 2. Force manual garbage collection cycle to detect and destroy isolated cycles:
unreachable_objects = gc.collect()
print(f"🧹 Garbage Collector cleaned up {unreachable_objects} circular reference objects!")`,
        codeTitle: 'Example 3: Circular Reference Cycles and the gc Module',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 Weak References:</strong>
          <p style="margin-top:6px;">To prevent circular reference leaks in trees and caches, use the standard library <code>weakref</code> module, which creates non-owning reference pointers that do not increment <code>ob_refcnt</code>.</p>
        </div>`
      },
      {
        title: '4. Performance Profiling: timeit & cProfile',
        body: `<p>Never guess where performance bottlenecks lie — profile and measure them!</p>
        <ul>
          <li><strong><code>timeit</code>:</strong> Precision micro-benchmarking tool for comparing short code snippets over thousands of runs.</li>
          <li><strong><code>cProfile</code>:</strong> Deterministic profiler that counts every function call, time per call, and cumulative bottlenecks across an entire application.</li>
        </ul>`,
        code: `import timeit

# Microbenchmark: List Comprehension vs map() for string conversion:
time_comp = timeit.timeit('[str(x) for x in range(1000)]', number=10_000)
time_map = timeit.timeit('list(map(str, range(1000)))', number=10_000)

print(f"⚡ List Comprehension (10k runs): {time_comp:.4f} seconds")
print(f"⚡ map(str, ...)       (10k runs): {time_map:.4f} seconds")

# Pythonic Design Philosophy: EAFP vs LBYL
# EAFP: "Easier to Ask for Forgiveness than Permission" (try-except) -> The Python Way!
# LBYL: "Look Before You Leap" (if-else checks)
user_profile = {"name": "Balaji"}

# The Pythonic EAFP pattern:
try:
    email = user_profile["email"]
except KeyError:
    email = "default@example.com"
print("User Email (EAFP):", email)`,
        codeTitle: 'Example 4: Performance Benchmarking and Idiomatic Pythonic Coding',
        explanation: `<div class="card" style="background:var(--bg2); padding:16px; border-radius:8px; margin-top:12px; font-size:13.5px;">
          <strong style="color:#10b981;">🔍 EAFP Advantage:</strong>
          <p style="margin-top:6px;">EAFP avoids redundant lookups (checking <code>if "email" in user_profile</code> and then accessing <code>user_profile["email"]</code> requires TWO hash lookups; EAFP performs only ONE!).</p>
        </div>`
      }
    ],
    mistake: {
      title: 'Assuming "del obj" Directly Frees Memory from the Operating System',
      text: '"del obj" merely decrements the object\'s reference count and deletes the variable name from the local namespace. If other references exist, or if CPython\'s memory allocator (PyMalloc) pools the memory, the RAM is retained for future Python allocations rather than returned to the OS.'
    },
    tryIt: {
      desc: 'Use timeit to benchmark whether checking membership in a set ("999 in my_set") is faster than in a list ("999 in my_list") with 1,000 numbers.',
      code: `import timeit

setup_code = """
my_list = list(range(1000))
my_set = set(range(1000))
"""

t_list = timeit.timeit('999 in my_list', setup=setup_code, number=100_000)
t_set = timeit.timeit('999 in my_set', setup=setup_code, number=100_000)

print(f"List 'in' check (100k runs): {t_list:.5f} sec")
print(f"Set 'in' check  (100k runs): {t_set:.5f} sec")
print(f"🚀 Set is {t_list/t_set:.1f}x FASTER due to O(1) hash lookup!")`
    },
    faqs: [
      {
        q: 'What is the Global Interpreter Lock (GIL) in CPython?',
        a: 'The GIL is a mutex lock in CPython that ensures only one native CPU thread executes Python bytecode at a time, protecting CPython\'s reference count memory management from race conditions.'
      },
      {
        q: 'What is the difference between EAFP and LBYL?',
        a: 'LBYL (Look Before You Leap) tests preconditions with if-statements before executing. EAFP (Easier to Ask for Forgiveness than Permission) assumes valid state and catches exceptions with try-except, which is faster for the common success path in Python.'
      },
      {
        q: 'Why are small integers (-5 to 256) cached in CPython memory?',
        a: 'CPython pre-allocates an internal global array for integers between -5 and 256 because they are used constantly for loop counters and indexing, saving millions of allocation CPU cycles.'
      }
    ]
  }
];
