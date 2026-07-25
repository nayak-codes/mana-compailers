/**
 * expand_python_lessons.js
 * Expands all existing Python lesson HTML files with much more content.
 * Run: node scratch/expand_python_lessons.js
 */

const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');

// Shared header template (scripts, nav, sidebar)
function getSharedHeader(activeLesson) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${activeLesson.title} | Our Compiler</title>
  <meta name="description" content="${activeLesson.desc}" />
  <meta name="google-adsense-account" content="ca-pub-7028247458903242" />
  <link rel="icon" type="image/png" href="/logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/blog-style.css" />
  <script src="/site-nav.js" defer></script>
  <script>
    (function() {
      function restoreScroll() {
        var s = sessionStorage.getItem('scrollPos');
        if (s) { window.scrollTo(0, parseInt(s, 10)); sessionStorage.removeItem('scrollPos'); }
      }
      window.addEventListener('load', function() { restoreScroll(); setTimeout(restoreScroll, 100); setTimeout(restoreScroll, 500); });
      document.addEventListener('DOMContentLoaded', function() { setTimeout(restoreScroll, 50); });
      document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (link && link.hostname === window.location.hostname && !link.hasAttribute('download')) { sessionStorage.setItem('scrollPos', window.scrollY); }
      });
    })();
  </script>
  <script>
    (function() {
      const t = localStorage.getItem('theme') || 'dark';
      if (t === 'light') { document.documentElement.classList.add('light-theme'); document.addEventListener('DOMContentLoaded', () => { document.body.classList.add('light-theme'); }); }
      window.addEventListener('DOMContentLoaded', () => {
        const topnav = document.querySelector('.topnav');
        if (topnav) {
          const btn = document.createElement('button');
          btn.className = 'blog-theme-toggle';
          btn.style.cssText = 'margin-left:auto;flex-shrink:0;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;cursor:pointer;font-family:"Inter",sans-serif;transition:all 0.2s;white-space:nowrap;margin-right:12px;';
          const upd = () => { btn.innerHTML = document.body.classList.contains('light-theme') ? '🌙 Dark' : '☀️ Light'; };
          upd();
          btn.addEventListener('click', () => { document.body.classList.toggle('light-theme'); document.documentElement.classList.toggle('light-theme'); localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); upd(); });
          topnav.appendChild(btn);
        }
        document.querySelectorAll('.code-block').forEach(block => {
          const header = block.querySelector('.code-block-header');
          const codeEl = block.querySelector('pre code');
          if (!header || !codeEl) return;
          let ac = header.querySelector('.code-actions');
          if (!ac) { ac = document.createElement('div'); ac.className = 'code-actions'; ac.style.cssText = 'display:flex;gap:8px;align-items:center;margin-left:auto;'; const tb = header.querySelector('.try-btn'); if (tb) ac.appendChild(tb); header.appendChild(ac); }
          const cb = document.createElement('button');
          cb.innerHTML = '📋 Copy';
          cb.style.cssText = 'background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:4px 10px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s;font-family:"Inter",sans-serif;white-space:nowrap;';
          cb.addEventListener('click', () => { navigator.clipboard.writeText(codeEl.textContent).then(() => { cb.innerHTML = '✅ Copied!'; setTimeout(() => { cb.innerHTML = '📋 Copy'; }, 2000); }); });
          ac.insertBefore(cb, ac.firstChild);
          const tb = ac.querySelector('.try-btn');
          if (tb) { tb.addEventListener('click', (e) => { e.preventDefault(); const url = tb.getAttribute('href'); const langId = new URLSearchParams(url.split('?')[1]).get('lang') || 'python3'; localStorage.setItem('code_' + langId, codeEl.textContent); window.location.href = url; }); }
        });
      });
    })();
  </script>
</head>
<body class="lang-python">
<nav class="topnav">
  <a href="/" class="brand">🖥️ Our Compiler</a>
  <a href="/blog-python.html" class="active">Python</a>
  <a href="/blog-java.html">Java</a>
  <a href="/blog-javascript.html">JavaScript</a>
  <a href="/blog-c.html">C</a>
  <a href="/blog-cpp.html">C++</a>
  <a href="/blog-csharp.html">C#</a>
  <a href="/blog-go.html">Go</a>
  <a href="/blog-rust.html">Rust</a>
  <a href="/blog-php.html">PHP</a>
  <a href="/blog-ruby.html">Ruby</a>
  <a href="/blog-html.html">HTML</a>
  <a href="/blog-css.html">CSS</a>
  <a href="/blog-react.html">React</a>
  <a href="/blog-angular.html">Angular</a>
  <a href="/blog-vue.html">Vue.js</a>
  <a href="/blog-nextjs.html">Next.js</a>
  <a href="/blog-nodejs.html">Node.js</a>
  <a href="/blog-express.html">Express.js</a>
  <a href="/blog-django.html">Django</a>
  <a href="/blog-flask.html">Flask</a>
  <a href="/blog-spring-boot.html">Spring Boot</a>
  <a href="/blog-mysql.html">MySQL</a>
  <a href="/blog-mongodb.html">MongoDB</a>
  <a href="/blog-rest-api.html">REST API</a>
  <a href="/blog-graphql.html">GraphQL</a>
  <a href="/blog-git.html">Git &amp; GitHub</a>
</nav>
<div class="layout">
  <aside class="sidebar">
    <div class="sidebar-heading">Python 3 Tutorial</div>
    <a href="/blog-python.html">Python 3 HOME</a>
    <a href="/blog-python-intro.html"${activeLesson.slug === 'intro' ? ' class="active"' : ''}>1. Welcome &amp; Hello World</a>
    <a href="/blog-python-variables.html"${activeLesson.slug === 'variables' ? ' class="active"' : ''}>2. Variables &amp; Core Types</a>
    <a href="/blog-python-operators.html"${activeLesson.slug === 'operators' ? ' class="active"' : ''}>3. Basic Operators &amp; Math</a>
    <a href="/blog-python-strings.html"${activeLesson.slug === 'strings' ? ' class="active"' : ''}>4. String Slicing &amp; Methods</a>
    <a href="/blog-python-conditionals.html"${activeLesson.slug === 'conditionals' ? ' class="active"' : ''}>5. Conditionals (if-else)</a>
    <a href="/blog-python-loops.html"${activeLesson.slug === 'loops' ? ' class="active"' : ''}>6. Loops &amp; Ranges</a>
    <a href="/blog-python-input.html"${activeLesson.slug === 'input' ? ' class="active"' : ''}>7. Reading User Inputs</a>
    <a href="/blog-python-lists.html"${activeLesson.slug === 'lists' ? ' class="active"' : ''}>8. Lists &amp; Tuples</a>
    <a href="/blog-python-dicts.html"${activeLesson.slug === 'dicts' ? ' class="active"' : ''}>9. Dictionaries &amp; Sets</a>
    <a href="/blog-python-functions.html"${activeLesson.slug === 'functions' ? ' class="active"' : ''}>10. Functions &amp; Reusable Code</a>
    <a href="/blog-python-modules.html"${activeLesson.slug === 'modules' ? ' class="active"' : ''}>11. Modules &amp; Standard Lib</a>
    <a href="/blog-python-files.html"${activeLesson.slug === 'files' ? ' class="active"' : ''}>12. File I/O Operations</a>
    <a href="/blog-python-errors.html"${activeLesson.slug === 'errors' ? ' class="active"' : ''}>13. Exception Handling</a>
    <a href="/blog-python-oop-basics.html"${activeLesson.slug === 'oop-basics' ? ' class="active"' : ''}>14. OOP: Classes &amp; Objects</a>
    <a href="/blog-python-oop-advanced.html"${activeLesson.slug === 'oop-advanced' ? ' class="active"' : ''}>15. OOP: Inheritance &amp; Dunder</a>
    <div class="sidebar-heading">Reference</div>
    <a href="/blog.html">All Tutorials</a>
    <a href="/?lang=python3">▶ Try Python 3 Online</a>
    <div class="sidebar-heading">Other Languages</div>
    <a href="/blog-java.html">Java</a>
    <a href="/blog-javascript.html">JavaScript</a>
    <a href="/blog-c.html">C</a>
    <a href="/blog-cpp.html">C++</a>
    <a href="/blog-go.html">Go</a>
    <a href="/blog-rust.html">Rust</a>
  </aside>
  <main class="content">`;
}

function getFooter() {
  return `
  </main>
</div>
</body>
</html>`;
}

// ─── LESSON CONTENT DEFINITIONS ───────────────────────────────────────────────

const lessons = {

  // ── Lesson 7: Reading User Inputs ──────────────────────────────────────────
  'blog-python-input.html': {
    slug: 'input',
    title: 'Python 3 Reading User Inputs',
    desc: 'Learn Python 3 input() function — read user input, convert types, validate input, build interactive programs with practical examples.',
    prev: { url: '/blog-python-loops.html', label: 'Loops &amp; Ranges' },
    next: { url: '/blog-python-lists.html', label: 'Lists &amp; Tuples' },
    lessonNum: 7,
    breadcrumb: 'Reading User Inputs',
    h1: 'Python 3 — Reading User Inputs',
    intro: 'Every interactive program needs to accept input from users. Python provides the built-in <code>input()</code> function to pause execution, display a prompt, and wait for the user to type something. This lesson covers reading inputs, converting types, validating data, and building real interactive programs.',
    content: `
<div class="section">
  <div class="section-title"><span class="num">1</span> The input() Function</div>
  <p>The <code>input()</code> function displays a prompt to the user, waits for them to type something, and returns their response as a <strong>string</strong>:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Basic input()</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Basic input - always returns a string
name = input("What is your name? ")
print(f"Hello, {name}! Welcome to Python.")

# Empty prompt (no message)
value = input()
print(f"You typed: {value}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Converting Input Types</div>
  <p><strong>Critical:</strong> <code>input()</code> always returns a string, even if the user types a number. You must convert it to the correct type before doing math:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Type Conversion</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># String to Integer
age = int(input("Enter your age: "))
print(f"In 10 years, you will be {age + 10}")

# String to Float
price = float(input("Enter price: "))
tax = price * 0.18
print(f"Price with 18% tax: {price + tax:.2f}")

# Multiple inputs on one line using split()
x, y = input("Enter two numbers (space-separated): ").split()
x, y = int(x), int(y)
print(f"Sum = {x + y}, Product = {x * y}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Reading Multiple Values</div>
  <p>Python's <code>split()</code> and <code>map()</code> functions make it easy to read multiple values in one line:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Multiple Inputs</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Read a list of numbers
numbers = list(map(int, input("Enter numbers separated by spaces: ").split()))
print(f"Numbers: {numbers}")
print(f"Sum: {sum(numbers)}")
print(f"Average: {sum(numbers) / len(numbers):.2f}")
print(f"Max: {max(numbers)}, Min: {min(numbers)}")

# Read 3 values at once
a, b, c = map(float, input("Enter 3 values: ").split())
print(f"Average of {a}, {b}, {c} = {(a+b+c)/3:.2f}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Input Validation with try-except</div>
  <p>Users often type unexpected things. Use <code>try-except</code> to safely handle invalid inputs:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Input Validation</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Safe integer input with error handling
def get_integer(prompt):
    while True:
        try:
            value = int(input(prompt))
            return value
        except ValueError:
            print("❌ Invalid! Please enter a whole number.")

# age = get_integer("Enter your age: ")
# print(f"Age: {age}")

# Validate range
def get_score():
    while True:
        try:
            score = int(input("Enter score (0-100): "))
            if 0 <= score <= 100:
                return score
            else:
                print("❌ Score must be between 0 and 100!")
        except ValueError:
            print("❌ Please enter a number!")

# score = get_score()
# print(f"Valid score: {score}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Building an Interactive Calculator</div>
  <p>Let's build a complete interactive calculator using everything we've learned:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Interactive Calculator</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>print("=== Simple Calculator ===")

try:
    num1 = float(input("Enter first number: "))
    operator = input("Enter operator (+, -, *, /): ")
    num2 = float(input("Enter second number: "))

    if operator == "+":
        result = num1 + num2
    elif operator == "-":
        result = num1 - num2
    elif operator == "*":
        result = num1 * num2
    elif operator == "/":
        if num2 == 0:
            print("❌ Cannot divide by zero!")
        else:
            result = num1 / num2
    else:
        print("❌ Unknown operator!")
        result = None

    if result is not None:
        print(f"Result: {num1} {operator} {num2} = {result}")

except ValueError:
    print("❌ Please enter valid numbers!")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> input() in a Loop</div>
  <p>Combine <code>input()</code> with loops to keep asking until the user provides valid data or decides to quit:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Input in Loops</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Collect items until user types 'done'
shopping_list = []

print("Enter items (type 'done' to finish):")
while True:
    item = input("Add item: ").strip()
    if item.lower() == "done":
        break
    if item:
        shopping_list.append(item)
        print(f"✅ Added: {item}")
    else:
        print("❌ Item cannot be empty!")

print(f"\nYour shopping list ({len(shopping_list)} items):")
for i, item in enumerate(shopping_list, 1):
    print(f"  {i}. {item}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Password Input (getpass)</div>
  <p>For sensitive inputs like passwords, use <code>getpass.getpass()</code> which hides the typed characters:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — getpass</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>import getpass

# getpass hides input in terminal (appears blank while typing)
# In Our Compiler, it works like regular input()
username = input("Username: ")
password = getpass.getpass("Password: ")  # Hidden input

correct_user = "admin"
correct_pass = "python123"

if username == correct_user and password == correct_pass:
    print("✅ Login successful! Welcome, Admin.")
else:
    print("❌ Invalid credentials. Access denied.")</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ Common Input Mistakes:</strong>
  <ul>
    <li>Forgetting to convert: <code>int(input(...))</code> — without <code>int()</code>, math operations will fail or concatenate strings</li>
    <li>Not handling <code>ValueError</code> when user types text instead of a number</li>
    <li>Using <code>input()</code> in a loop without a way to exit — always have a <code>break</code> condition</li>
    <li>Forgetting <code>.strip()</code> to remove leading/trailing whitespace from input</li>
  </ul>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a <strong>Number Guessing Game</strong>:</p>
  <ul>
    <li>Set a secret number (e.g., 42)</li>
    <li>Ask the user to guess in a loop</li>
    <li>After each guess, tell them if it's "Too high", "Too low", or "Correct!"</li>
    <li>Count how many attempts it takes</li>
    <li>Print "Congratulations! You got it in X attempts!"</li>
    <li>Handle non-numeric inputs gracefully with try-except</li>
  </ul>
</div>`
  },

  // ── Lesson 8: Lists & Tuples ───────────────────────────────────────────────
  'blog-python-lists.html': {
    slug: 'lists',
    title: 'Python 3 Lists &amp; Tuples',
    desc: 'Learn Python 3 Lists and Tuples — create, index, slice, sort, modify lists, and understand when to use tuples vs lists with practical examples.',
    prev: { url: '/blog-python-input.html', label: 'Reading User Inputs' },
    next: { url: '/blog-python-dicts.html', label: 'Dictionaries &amp; Sets' },
    lessonNum: 8,
    breadcrumb: 'Lists &amp; Tuples',
    h1: 'Python 3 — Lists &amp; Tuples',
    intro: 'Lists are Python\'s most versatile data structure. They store ordered, mutable sequences of any data type. Tuples are similar but immutable — once created, they cannot change. Together, they cover almost all your sequential data storage needs.',
    content: `
<div class="section">
  <div class="section-title"><span class="num">1</span> Creating &amp; Accessing Lists</div>
  <p>Lists are created with square brackets <code>[]</code>. Items are accessed by their <strong>index</strong>, starting from <code>0</code>:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — List Basics</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Creating lists
fruits = ["apple", "banana", "cherry", "mango"]
numbers = [10, 20, 30, 40, 50]
mixed = ["Python", 3, True, 3.14, None]

# Accessing by positive index (0-based)
print(fruits[0])    # apple
print(fruits[2])    # cherry

# Negative indexing (from end)
print(fruits[-1])   # mango (last item)
print(fruits[-2])   # cherry (second from last)

# Length
print(len(fruits))  # 4

# Check membership
print("banana" in fruits)   # True
print("grape" not in fruits) # True</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> List Slicing</div>
  <p>Slicing extracts a portion of a list: <code>list[start:stop:step]</code></p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Slicing</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(nums[2:6])     # [2, 3, 4, 5] (index 2 to 5)
print(nums[:4])      # [0, 1, 2, 3] (first 4)
print(nums[6:])      # [6, 7, 8, 9] (from index 6)
print(nums[-3:])     # [7, 8, 9] (last 3)
print(nums[::2])     # [0, 2, 4, 6, 8] (every 2nd)
print(nums[::-1])    # [9, 8, 7, ..., 0] (reversed!)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Modifying Lists</div>
  <p>Lists are <strong>mutable</strong> — you can add, remove, and change items after creation:</p>
  <table class="tbl">
    <tr><th>Method</th><th>Description</th><th>Example</th></tr>
    <tr><td><code>append(x)</code></td><td>Add to end</td><td><code>list.append(5)</code></td></tr>
    <tr><td><code>insert(i, x)</code></td><td>Insert at index</td><td><code>list.insert(1, "a")</code></td></tr>
    <tr><td><code>extend(lst)</code></td><td>Add all items from another list</td><td><code>list.extend([4,5,6])</code></td></tr>
    <tr><td><code>remove(x)</code></td><td>Remove first occurrence of x</td><td><code>list.remove("a")</code></td></tr>
    <tr><td><code>pop(i)</code></td><td>Remove &amp; return item at index</td><td><code>list.pop(0)</code></td></tr>
    <tr><td><code>clear()</code></td><td>Remove all items</td><td><code>list.clear()</code></td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — List Methods</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>students = ["Alice", "Bob", "Charlie"]

students.append("Diana")          # Add to end
print(students)  # ['Alice', 'Bob', 'Charlie', 'Diana']

students.insert(1, "Eve")         # Insert at index 1
print(students)  # ['Alice', 'Eve', 'Bob', 'Charlie', 'Diana']

students.remove("Bob")            # Remove by value
print(students)  # ['Alice', 'Eve', 'Charlie', 'Diana']

last = students.pop()             # Remove last, returns it
print(f"Removed: {last}")        # Removed: Diana

students[0] = "Alex"              # Modify by index
print(students)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> Sorting &amp; Ordering</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Sorting</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>scores = [85, 42, 97, 13, 76, 55]

# sort() modifies in place
scores.sort()
print(scores)                 # [13, 42, 55, 76, 85, 97]

scores.sort(reverse=True)
print(scores)                 # [97, 85, 76, 55, 42, 13]

# sorted() returns new list, original unchanged
names = ["Charlie", "Alice", "Bob", "Diana"]
sorted_names = sorted(names)
print(sorted_names)           # ['Alice', 'Bob', 'Charlie', 'Diana']
print(names)                  # Original unchanged

# Sort by length
words = ["banana", "fig", "cherry", "apple", "kiwi"]
words.sort(key=len)
print(words)                  # ['fig', 'kiwi', 'apple', 'banana', 'cherry']

# reverse() — reverses list in place
scores.reverse()
print(scores)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Useful List Functions</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — List Functions</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>numbers = [3, 7, 1, 9, 4, 6, 2, 8, 5]

print(len(numbers))       # 9 — length
print(sum(numbers))       # 45 — total
print(min(numbers))       # 1 — minimum
print(max(numbers))       # 9 — maximum
print(numbers.count(7))   # 1 — how many times 7 appears
print(numbers.index(9))   # 3 — index of value 9

# List from range
evens = list(range(0, 11, 2))
print(evens)  # [0, 2, 4, 6, 8, 10]

# Concatenate lists
a = [1, 2, 3]
b = [4, 5, 6]
c = a + b
print(c)      # [1, 2, 3, 4, 5, 6]

# Repeat list
zeros = [0] * 5
print(zeros)  # [0, 0, 0, 0, 0]</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> Tuples — Immutable Sequences</div>
  <p>Tuples are like lists but <strong>immutable</strong> (cannot be changed after creation). Created with parentheses <code>()</code>:</p>
  <table class="tbl">
    <tr><th>Feature</th><th>List []</th><th>Tuple ()</th></tr>
    <tr><td>Mutable</td><td>✅ Yes</td><td>❌ No</td></tr>
    <tr><td>Performance</td><td>Slower</td><td>Faster</td></tr>
    <tr><td>Use case</td><td>Data that changes</td><td>Fixed data (coordinates, RGB)</td></tr>
    <tr><td>Dict key</td><td>❌ Cannot use</td><td>✅ Can use as key</td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Tuples</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Creating tuples
point = (10, 20)           # 2D coordinate
rgb_red = (255, 0, 0)      # RGB color
months = ("Jan", "Feb", "Mar", "Apr")

# Accessing (same as lists)
print(point[0])    # 10
print(months[-1])  # Apr
print(len(months)) # 4

# Tuple unpacking
x, y = point
print(f"x={x}, y={y}")  # x=10, y=20

r, g, b = rgb_red
print(f"R={r}, G={g}, B={b}")

# Single element tuple (note trailing comma!)
single = (42,)
print(type(single))  # &lt;class 'tuple'&gt;
not_tuple = (42)     # This is just int 42!
print(type(not_tuple))  # &lt;class 'int'&gt;</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Nested Lists (2D Arrays)</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Nested Lists</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># 2D matrix (list of lists)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access: matrix[row][column]
print(matrix[0][0])  # 1 (top-left)
print(matrix[1][2])  # 6 (row 1, col 2)
print(matrix[2][1])  # 8 (row 2, col 1)

# Iterate through 2D matrix
for row in matrix:
    for item in row:
        print(item, end=" ")
    print()

# Modify a cell
matrix[0][0] = 99
print(matrix[0])  # [99, 2, 3]</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Write a program that:</p>
  <ul>
    <li>Creates a list of 8 student scores</li>
    <li>Calculates and prints: total, average, highest score, lowest score</li>
    <li>Sorts the list and prints it in ascending and descending order</li>
    <li>Creates a "grade list" using a loop: A (≥90), B (≥80), C (≥70), F (otherwise)</li>
    <li>Stores (score, grade) pairs as tuples in a list</li>
    <li>Prints each student's score and grade using enumerate()</li>
  </ul>
</div>`
  },

  // ── Lesson 10: Functions ───────────────────────────────────────────────────
  'blog-python-functions.html': {
    slug: 'functions',
    title: 'Python 3 Functions &amp; Reusable Code',
    desc: 'Learn Python 3 Functions — define, call, parameters, return values, default args, *args, **kwargs, lambda, recursion and scope with examples.',
    prev: { url: '/blog-python-dicts.html', label: 'Dictionaries &amp; Sets' },
    next: { url: '/blog-python-modules.html', label: 'Modules &amp; Standard Lib' },
    lessonNum: 10,
    breadcrumb: 'Functions &amp; Reusable Code',
    h1: 'Python 3 — Functions &amp; Reusable Code',
    intro: 'Writing clean code means avoiding repetition (the DRY principle: Don\'t Repeat Yourself). Functions are reusable blocks of code that you define once and call as many times as you need. They make your programs organized, testable, and maintainable.',
    content: `
<div class="section">
  <div class="section-title"><span class="num">1</span> Defining &amp; Calling Functions</div>
  <p>Use the <code>def</code> keyword to define a function. Code inside must be indented. Call it by name followed by parentheses:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Simple Function</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Define function
def greet():
    print("Welcome back, coder!")
    print("Let's write some Python code.")

# Call the function (can call multiple times)
greet()
greet()

# Function with docstring (documentation)
def show_info():
    """Displays program information to the user."""
    print("=== Python Tutorial v1.0 ===")
    print("Developed with Our Compiler")

show_info()
print(show_info.__doc__)  # Access docstring</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">2</span> Parameters &amp; Return Values</div>
  <p>Pass data into functions using <strong>parameters</strong>. Get results back with <code>return</code>:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Parameters &amp; Return</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Function with parameters
def calculate_area(length, width):
    area = length * width
    return area

result = calculate_area(5, 10)
print(f"Area: {result}")   # Area: 50

# Multiple return values (returns a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 7, 1, 9, 4])
print(f"Min: {low}, Max: {high}")   # Min: 1, Max: 9

# Returning early
def divide(a, b):
    if b == 0:
        return None  # Early return
    return a / b

print(divide(10, 2))   # 5.0
print(divide(10, 0))   # None</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">3</span> Default Parameters</div>
  <p>Give parameters default values — if the caller doesn't provide them, the default is used:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Default Parameters</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>def greet_user(name, greeting="Hello", punctuation="!"):
    print(f"{greeting}, {name}{punctuation}")

greet_user("Balaji")               # Hello, Balaji!
greet_user("Alice", "Hi")          # Hi, Alice!
greet_user("Bob", "Hey", ".")      # Hey, Bob.

# Power function with default exponent
def power(base, exp=2):
    return base ** exp

print(power(5))       # 25 (5 squared by default)
print(power(5, 3))    # 125 (5 cubed)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">4</span> *args and **kwargs</div>
  <p>For functions that accept a variable number of arguments:</p>
  <table class="tbl">
    <tr><th>Syntax</th><th>What it does</th><th>Type received</th></tr>
    <tr><td><code>*args</code></td><td>Accepts any number of positional arguments</td><td>tuple</td></tr>
    <tr><td><code>**kwargs</code></td><td>Accepts any number of keyword arguments</td><td>dict</td></tr>
  </table>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — *args &amp; **kwargs</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># *args — variable positional arguments
def add_all(*numbers):
    print(f"Numbers received: {numbers}")  # It's a tuple
    return sum(numbers)

print(add_all(1, 2))          # 3
print(add_all(1, 2, 3, 4, 5)) # 15

# **kwargs — variable keyword arguments
def display_profile(**info):
    print(f"Profile info: {info}")   # It's a dict
    for key, value in info.items():
        print(f"  {key}: {value}")

display_profile(name="Balaji", age=25, city="Hyderabad")

# Combining all types
def full_example(required, *args, default="ok", **kwargs):
    print(f"required={required}, args={args}, default={default}, kwargs={kwargs}")</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">5</span> Local vs Global Scope</div>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Variable Scope</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code>app_name = "Our Compiler"   # Global variable

def display():
    local_msg = "Inside function"  # Local variable
    print(app_name)   # Can READ global variables
    print(local_msg)

display()
# print(local_msg)  # ❌ NameError: not accessible outside

# Modifying a global variable inside a function
counter = 0

def increment():
    global counter    # Declare intent to modify global
    counter += 1

increment()
increment()
print(f"Counter: {counter}")  # Counter: 2</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">6</span> Lambda Functions (Anonymous Functions)</div>
  <p>Lambda functions are compact one-line functions using the <code>lambda</code> keyword:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Lambda Functions</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Regular function
def square(x):
    return x ** 2

# Equivalent lambda
square = lambda x: x ** 2
print(square(5))   # 25

# Lambda with multiple parameters
add = lambda a, b: a + b
print(add(3, 7))   # 10

# Lambdas shine when used with sorted(), map(), filter()
students = [("Alice", 92), ("Bob", 78), ("Charlie", 85)]

# Sort by score (second element)
students.sort(key=lambda s: s[1])
print(students)  # Sorted by score ascending

# Filter students who scored above 80
top = list(filter(lambda s: s[1] > 80, students))
print(top)

# Double all scores
doubled = list(map(lambda s: (s[0], s[1] * 2), students))
print(doubled)</code></pre>
  </div>
</div>

<div class="section">
  <div class="section-title"><span class="num">7</span> Recursion</div>
  <p>A function that calls itself is called <strong>recursive</strong>. Always have a base case to stop recursion:</p>
  <div class="code-block">
    <div class="code-block-header"><span class="lang-tag">Python 3 — Recursion</span><a class="try-btn" href="/?lang=python3">▶ Run Code</a></div>
    <pre><code># Factorial: 5! = 5 × 4 × 3 × 2 × 1 = 120
def factorial(n):
    if n == 0 or n == 1:   # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))   # 120
print(factorial(10))  # 3628800

# Fibonacci sequence
def fib(n):
    if n <= 1:             # Base case
        return n
    return fib(n-1) + fib(n-2)  # Recursive case

for i in range(10):
    print(fib(i), end=" ")  # 0 1 1 2 3 5 8 13 21 34</code></pre>
  </div>
</div>

<div class="info-box">
  <strong>⚠️ Return vs Print:</strong>
  <p>Beginners often confuse <code>print()</code> and <code>return</code>. <code>print()</code> displays text to the terminal but doesn't pass the value back. <code>return</code> sends the value back to the caller, allowing you to store or use it in further calculations.</p>
</div>

<div class="section">
  <div class="section-title"><span class="num">8</span> Coding Challenge</div>
  <p>Build a mini math library with these functions:</p>
  <ul>
    <li><code>is_even(n)</code> — returns True if n is even</li>
    <li><code>clamp(value, min_val, max_val)</code> — restricts value to a range</li>
    <li><code>celsius_to_fahrenheit(c)</code> — converts temperature</li>
    <li><code>sum_of_digits(n)</code> — recursively sums digits of a number (e.g., 123 → 6)</li>
    <li><code>flatten(*lists)</code> — combines any number of lists into one using *args</li>
    <li>Test each function with multiple inputs</li>
  </ul>
</div>`
  },

};

// ─── WRITE FILES ───────────────────────────────────────────────────────────────

let writtenCount = 0;

for (const [filename, lesson] of Object.entries(lessons)) {
  const filePath = path.join(PUBLIC, filename);
  
  const content = getSharedHeader(lesson) + `
    <div class="breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/blog.html">Tutorials</a><span>›</span>
      <a href="/blog-python.html">Python 3</a><span>›</span>
      <span>${lesson.breadcrumb}</span>
    </div>
    <h1 class="page-title">${lesson.h1}</h1>
    <div class="page-meta">
      <span class="badge">🐍 Python 3</span>
      <span class="badge">🟢 Lesson ${lesson.lessonNum}</span>
      <span class="badge">📅 July 2026</span>
    </div>
    <div class="intro-box">
      <p>${lesson.intro}</p>
    </div>
    ${lesson.content}
    <div class="nav-footer">
      <a href="${lesson.prev.url}" class="nav-btn">
        <span class="label">← Previous Lesson</span>
        <span class="title">${lesson.prev.label}</span>
      </a>
      <a href="${lesson.next.url}" class="nav-btn" style="text-align:right;">
        <span class="label">Next Lesson →</span>
        <span class="title">${lesson.next.label}</span>
      </a>
    </div>
` + getFooter();

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Wrote: ${filename} (${(content.length/1024).toFixed(1)} KB)`);
  writtenCount++;
}

console.log(`\n🎉 Done! Expanded ${writtenCount} Python lesson files.`);
